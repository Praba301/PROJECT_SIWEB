"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { label: "Tentang", href: "#tentang" },
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Layanan", href: "#layanan" },
  { label: "Rute", href: "#rute" },
  { label: "Paket", href: "#pilih-paket" },
  { label: "Tim", href: "#tim" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHoverItem = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D14]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-white font-black text-lg tracking-widest uppercase">
          PRAKETRIO
        </Link>

        {/* Kanan: Menu + Masuk */}
        <div className="flex items-center gap-3">

          {/* Tombol Menu dengan Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onMouseEnter={() => setMenuOpen(true)}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1 text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              Menu
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  menuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown List */}
            {menuOpen && (
              <div
                onMouseLeave={() => setMenuOpen(false)}
                className="absolute right-0 top-full mt-2 w-48 bg-[#13131F] border border-[#2D1B69] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => handleHoverItem(item.href)}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-3 text-white/70 hover:text-white hover:bg-[#A855F7]/10 text-sm transition-all duration-200 border-b border-white/5 last:border-none"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Tombol Masuk */}
          <Link
            href="/login"
            className="border border-[#A855F7] text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-[#A855F7]/10 transition-all duration-200"
          >
            Masuk
          </Link>
        </div>

      </div>
    </nav>
  );
}