import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. FITUR DEMO AMAN: Reset otomatis jika mengklik halaman Login
  if (pathname.startsWith("/login")) {
    const response = NextResponse.next();
    // Hapus sisa-sisa cookie secara paksa agar dosen selalu melihat form login kosong
    response.cookies.delete("praketrio_auth");
    response.cookies.delete("praketrio_role");
    return response;
  }

  // 2. PENGECUALIAN MUTLAK: Biarkan halaman publik & aset sistem lewat
  if (
    pathname === "/" ||
    pathname.startsWith("/unauthorized") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") // Membiarkan file gambar (logo.png) dan CSS lewat
  ) {
    return NextResponse.next();
  }

  // 3. AMBIL TIKET DARI BROWSER
  const isAuthenticated = request.cookies.get("praketrio_auth")?.value;
  const userRole = request.cookies.get("praketrio_role")?.value;

  // CETAK KE TERMINAL: Bukti untuk ditunjukkan ke dosen
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

export const config = {
  matcher: ["/:path*"],
};