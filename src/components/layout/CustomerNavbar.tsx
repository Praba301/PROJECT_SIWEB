"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Input Barang", href: "/customer/dashboard" },
  { label: "Lacak Paket", href: "/customer/lacak" },
  { label: "Riwayat", href: "/customer/riwayat" },
];

export default function CustomerNavbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-10 py-5 border-b border-[#1E1E2E] bg-[#0A0A12]/90 backdrop-blur-md sticky top-0 z-50 animate-fade-in-up">
      
      {/* BAGIAN KIRI: Logo & Menu */}
      <div className="flex items-center gap-12">
        
        {/* Logo */}
        <Link href="/customer/dashboard" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Image src="/logo.png" alt="Praketrio" width={32} height={32} className="object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
          </div>
          <span className="text-white font-bold text-lg font-mono tracking-wider transition-colors duration-300 group-hover:text-[#C084FC]">Praketrio</span>
        </Link>

        {/* Navigasi Horizontal */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`relative flex items-center gap-2.5 text-sm font-semibold py-2.5 px-4 rounded-xl border transition-all duration-300 active:scale-95 group ${
                    isActive
                      ? "bg-[#A855F7]/10 border-[#A855F7]/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                      : "border-transparent text-[#A0A0B0] hover:border-[#1E1E2E] hover:bg-[#13131F] hover:text-white"
                  }`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  {/* Indikator Titik (Sesuai Desain Asli) */}
                  <span 
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive 
                        ? "bg-[#C084FC] shadow-[0_0_8px_rgba(192,132,252,0.8)] scale-125" 
                        : "bg-[#3A3A4A] group-hover:bg-[#A855F7]"
                    }`}
                  />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* BAGIAN KANAN: Profil & Keluar */}
      <div className="flex items-center gap-6">
        
        {/* Profil Customer (Dipindah dari Header lama) */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="flex flex-col items-end">
            <span className="text-white font-bold text-sm transition-colors group-hover:text-[#C084FC]">Praba</span>
            <span className="text-[#6B6B80] text-xs">Customer</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#1E1E2E] border border-[#A855F7]/40 flex items-center justify-center text-[#A855F7] text-sm font-bold shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-transform duration-300 group-hover:scale-110">
            P
          </div>
        </div>

        {/* Garis Pemisah */}
        <div className="h-8 w-px bg-[#1E1E2E] hidden md:block"></div>

        {/* Tombol Keluar (Diperkecil & Disesuaikan dengan Navbar) */}
        <Link href="/login">
          <div className="group flex items-center justify-center gap-2 text-sm font-semibold py-2.5 px-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:text-red-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] active:scale-95 transition-all duration-300">
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Keluar
          </div>
        </Link>
      </div>

    </nav>
  );
}