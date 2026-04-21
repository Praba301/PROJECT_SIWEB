"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Input barang", href: "/customer/dashboard" },
  { label: "Lacak Paket", href: "/customer/lacak" },
  { label: "Riwayat", href: "/customer/riwayat" },
];

export default function CustomerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-52 min-h-screen bg-[#0D0D2B] border-r border-[#2D1B69] flex flex-col justify-between py-6 px-4 shrink-0">

      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 mb-10 px-2">
          <Image src="/logo.png" alt="Praketrio" width={36} height={36} className="object-contain" />
          <span className="text-white font-bold text-base">Praketrio</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full text-center text-sm font-semibold py-3 px-4 rounded-lg border transition-all duration-200 ${
                  isActive
                    ? "bg-[#A855F7]/20 border-[#A855F7] text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                    : "border-[#4B2D8A] text-white hover:border-[#A855F7] hover:bg-[#A855F7]/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Keluar */}
      <Link
        href="/"
        className="w-full text-center text-sm font-semibold py-3 px-4 rounded-lg border border-[#F97316] text-white hover:bg-[#F97316]/10 transition-all duration-200"
      >
        Keluar
      </Link>
    </aside>
  );
}