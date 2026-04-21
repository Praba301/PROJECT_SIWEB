"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Tentang", href: "#tentang" },
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Layanan", href: "#layanan" },
  { label: "Rute", href: "#rute" },
  { label: "Tim", href: "#tim" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0D0D14]/90 backdrop-blur-md border-b border-[#1E1E2E]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white font-bold text-xl tracking-widest uppercase font-mono">
          PRAKETRIO
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[#A0A0B0] hover:text-white text-sm transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tombol Masuk */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className="border border-[#A855F7] text-white text-sm px-5 py-2 rounded-md hover:bg-[#A855F7] transition-colors duration-200"
          >
            Masuk
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-2xl">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#13131F] border-t border-[#1E1E2E] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#A0A0B0] hover:text-white text-sm transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="border border-[#A855F7] text-white text-sm px-5 py-2 rounded-md text-center hover:bg-[#A855F7] transition-colors duration-200"
          >
            Masuk
          </Link>
        </div>
      )}
    </nav>
  );
}