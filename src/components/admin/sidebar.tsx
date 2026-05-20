"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Pengiriman", href: "/admin/pengiriman" },
    { name: "Armada", href: "/admin/armada" },
    { name: "Analitik", href: "/admin/analitik" },
  ];

  return (
    <aside className="w-64 bg-[#0A0A12] border-r border-[#1E1E2E] flex flex-col justify-between h-screen p-6 shrink-0 relative overflow-hidden animate-slide-left z-50">
      
      {/* Background Glow Halus di Atas */}
      <div className="absolute top-0 left-0 w-full h-32 bg-[#A855F7]/10 blur-[50px] pointer-events-none" />

      <div className="relative z-10">
        
        {/* Logo Area */}
        <div className="flex items-center gap-3 mb-12 group cursor-pointer">
          <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Image 
              src="/logo.png" 
              alt="Praketrio Logo" 
              width={48} 
              height={48} 
              className="object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              priority 
            />
          </div>
          <h1 className="text-white font-bold text-xl tracking-wider font-mono transition-colors duration-300 group-hover:text-[#C084FC]">
            Praketrio
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-3">
          {menuItems.map((item, index) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.name} href={item.href}>
                <div
                  // Animasi masuk berurutan (fade-in-up) dan efek bergeser (translate-x) saat hover/aktif
                  className={`relative px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 opacity-0 animate-fade-in-up active:scale-95 ${
                    isActive
                      ? "bg-[#A855F7]/10 text-white border border-[#A855F7]/50 shadow-[0_0_20px_rgba(168,85,247,0.2)] translate-x-2"
                      : "bg-transparent text-[#A0A0B0] border border-transparent hover:bg-[#13131F] hover:border-[#1E1E2E] hover:text-white hover:translate-x-2"
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
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Tombol Keluar - Muncul Paling Akhir */}
      <div className="relative z-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
        <Link href="/login">
          <div className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-center font-semibold bg-[#13131F] text-red-400 border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:-translate-y-1 active:scale-95">
            {/* Ikon Logout */}
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Keluar
          </div>
        </Link>
      </div>
      
    </aside>
  );
}