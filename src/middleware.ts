import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Ambil token auth dan role dari cookies
  const isAuthenticated = request.cookies.get("praketrio_auth")?.value;
  const userRole = request.cookies.get("praketrio_role")?.value;

  // 1. JIKA tidak login sama sekali, langsung lempar ke /unauthorized
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // 2. JIKA sudah login, periksa apakah role mereka berhak mengakses halaman tersebut
  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/fleet-shipper") && userRole !== "fleet-shipper") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/customer") && userRole !== "customer") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

// Hanya jalankan middleware pada rute terproteksi
export const config = {
  matcher: [
    "/admin/:path*", 
    "/customer/:path*", 
    "/fleet-shipper/:path*"
  ],
};