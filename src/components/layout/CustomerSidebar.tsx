"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Input Barang", href: "/customer/dashboard" },
  { label: "Lacak Paket", href: "/customer/lacak" },
  { label: "Riwayat", href: "/customer/riwayat" },
];

export default function CustomerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#0A0A12] border-r border-[#1E1E2E] flex flex-col justify-between py-6 px-6 shrink-0 relative overflow-hidden animate-slide-left z-50">

      {/* Background Glow Halus di Atas */}
      <div className="absolute top-0 left-0 w-full h-32 bg-[#A855F7]/10 blur-[50px] pointer-events-none" />

      <div className="relative z-10">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12 px-1 group cursor-pointer">
          <div className="w-10 h-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Image src="/logo.png" alt="Praketrio" width={40} height={40} className="object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
          </div>
          <span className="text-white font-bold text-lg font-mono tracking-wider transition-colors duration-300 group-hover:text-[#C084FC]">Praketrio</span>
        </div>

        {/* Navigasi */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
              >
                <div
                  // Efek animasi masuk dan bergeser ke kanan saat hover/aktif
                  className={`relative w-full flex items-center gap-3 text-sm font-semibold py-3.5 px-4 rounded-xl border transition-all duration-300 opacity-0 animate-fade-in-up active:scale-95 ${
                    isActive
                      ? "bg-[#A855F7]/10 border-[#A855F7]/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)] translate-x-2"
                      : "border-transparent text-[#A0A0B0] hover:border-[#1E1E2E] hover:bg-[#13131F] hover:text-white hover:translate-x-2"
                  }`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  {/* Indikator Titik */}
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
        </nav>
      </div>

      {/* Tombol Keluar */}
      <div className="relative z-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <Link href="/login">
          <div className="group flex items-center justify-center gap-2 w-full text-center text-sm font-semibold py-3.5 px-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:text-red-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] active:scale-95 transition-all duration-300">
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Keluar
          </div>
        </Link>
      </div>
      
    </aside>
  );
}