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
    <aside className="w-64 bg-[#0d0e1f] border-r border-slate-800 flex flex-col justify-between h-full p-6 shrink-0">
      <div>
        
        <div className="flex items-center gap-3 mb-12">
          
          <div className="w-12 h-12 flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Praketrio Logo" 
              width={48} 
              height={48} 
              className="object-contain"
              priority 
            />
          </div>
          <h1 className="text-white font-bold text-xl tracking-wider">Praketrio</h1>
        </div>

       
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`px-6 py-3 rounded-xl text-center font-semibold transition-all duration-300 border-2 ${
                    isActive
                      ? "bg-[#1e40af]/20 text-white border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5),inset_0_0_10px_rgba(34,211,238,0.2)]"
                      : "bg-[#14152c] text-slate-400 border-[#2a2b4a] hover:border-cyan-400/50 hover:text-white"
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Tombol Keluar */}
      <Link href="/login">
        <div className="px-6 py-3 rounded-xl text-center font-semibold bg-[#14152c] text-white border-2 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5),inset_0_0_10px_rgba(220,38,38,0.2)] hover:bg-red-900/30 transition-all">
          Keluar
        </div>
      </Link>
    </aside>
  );
}