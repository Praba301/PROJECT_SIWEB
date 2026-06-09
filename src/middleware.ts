import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. AMBIL TIKET DARI BROWSER DI AWAL
  const isAuthenticated = request.cookies.get("praketrio_auth")?.value;
  const userRole = request.cookies.get("praketrio_role")?.value;

  // 2. CEK LOGIKA: JIKA SUDAH LOGIN TAPI MAU BUKA HALAMAN /login
  if (pathname.startsWith("/login") && isAuthenticated && userRole) {
    console.log("=> BLOKIR: Sudah login kok mau login lagi. Balikin ke dashboard!");
    if (userRole === "admin") return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    if (userRole === "fleet_shipper" || userRole === "fleet-shipper") return NextResponse.redirect(new URL("/fleet-shipper", request.url));
    return NextResponse.redirect(new URL("/customer/dashboard", request.url));
  }

  // 3. PENGECUALIAN MUTLAK: Biarkan halaman publik & aset sistem lewat
  if (
    pathname === "/" ||
    pathname.startsWith("/login") || // Akan lolos ke sini JIKA BELUM LOGIN
    pathname.startsWith("/unauthorized") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") // Membiarkan file gambar (logo.png) dan CSS lewat
  ) {
    return NextResponse.next();
  }

  // CETAK KE TERMINAL: Bukti nyata buat asdos kalau satpamnya melek
  console.log(`[SATUAN PENGAMAN] Cek Rute: ${pathname} | Token: ${isAuthenticated ? "ADA" : "KOSONG"} | Role: ${userRole || "KOSONG"}`);

  // 4. JIKA KOSONG -> TENDANG LANGSUNG KE /unauthorized
  if (!isAuthenticated || !userRole) {
    console.log("=> BLOKIR: Tidak ada tiket! Lempar ke akses ilegal.");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // 5. JIKA ADA TIKET -> CEK JALUR MASING-MASING ROLE
  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/fleet-shipper") && userRole !== "fleet_shipper" && userRole !== "fleet-shipper") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/customer") && userRole !== "customer") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

// TRIK SAPU JAGAT: Tangkap SEMUA URL tanpa terkecuali biar Turbopack tidak bisa nge-bug!
export const config = {
  matcher: ["/:path*"],
};