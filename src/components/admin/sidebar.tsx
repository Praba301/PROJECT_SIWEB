"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { logoutAction } from "@/app/login/action";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Pengiriman", href: "/admin/pengiriman" },
    { name: "Armada", href: "/admin/armada" },
    { name: "Analitik", href: "/admin/analitik" },
  ];

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <nav className="w-full h-20 bg-[#0A0A12] border-b border-[#1E1E2E] flex items-center justify-between px-6 md:px-10 shrink-0 relative z-50">
      
      {/* Background Glow Halus di Tengah */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-[#A855F7]/10 blur-[50px] pointer-events-none" />

      {/* Logo Area (Kiri) */}
      <div className="relative z-10 flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          <Image 
            src="/logo.png" 
            alt="Praketrio Logo" 
            width={40} 
            height={40} 
            className="object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            priority 
          />
        </div>
        <h1 className="hidden md:block text-xl font-bold tracking-widest text-white uppercase drop-shadow-md transition-colors duration-500 group-hover:text-[#C084FC]">
          Praketrio
        </h1>
      </div>

      {/* Navigation Menu (Tengah) */}
      <div className="relative z-10 flex items-center gap-1 md:gap-3">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center text-sm md:text-base active:scale-95 ${
                  isActive
                    ? "bg-[#A855F7]/10 text-white border border-[#A855F7]/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    : "bg-transparent text-[#A0A0B0] border border-transparent hover:bg-[#13131F] hover:border-[#1E1E2E] hover:text-white"
                }`}
              >
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Status Admin & Tombol Keluar (Kanan) */}
      <div className="relative z-10 flex items-center gap-6">
        <span className="hidden lg:block text-[#6B6B80] font-bold tracking-widest uppercase text-xs border-r border-[#1E1E2E] pr-6">
          Administrator
        </span>
        
        {/* Tombol Logout Eksekusi Langsung */}
        <button 
          onClick={handleLogout} 
          className="group flex items-center justify-center gap-2 px-4 md:px-5 py-2 rounded-xl text-sm font-semibold bg-[#13131F] text-red-400 border border-red-500/30 hover:border-red-500 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] active:scale-95"
        >
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span className="hidden md:block">Keluar</span>
        </button>
      </div>
      
    </nav>
  );
}