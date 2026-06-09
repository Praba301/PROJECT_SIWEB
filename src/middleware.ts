import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. PENGECUALIAN MUTLAK: Biarkan halaman publik lewat agar web tidak error/nge-blank
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/unauthorized") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") // Membiarkan file gambar (logo.png) dan CSS lewat
  ) {
    return NextResponse.next();
  }

  // 2. AMBIL TIKET DARI BROWSER
  const isAuthenticated = request.cookies.get("praketrio_auth")?.value;
  const userRole = request.cookies.get("praketrio_role")?.value;

  // CETAK KE TERMINAL: Bukti nyata buat asdos kalau satpamnya melek
  console.log(`[SATUAN PENGAMAN] Cek Rute: ${pathname} | Token: ${isAuthenticated ? "ADA" : "KOSONG"} | Role: ${userRole || "KOSONG"}`);

  // 3. JIKA KOSONG -> TENDANG LANGSUNG KE /unauthorized
  if (!isAuthenticated || !userRole) {
    console.log("=> BLOKIR: Tidak ada tiket! Lempar ke akses ilegal.");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // 4. JIKA ADA TIKET -> CEK JALUR MASING-MASING ROLE
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