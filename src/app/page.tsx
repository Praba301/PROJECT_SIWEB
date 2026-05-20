"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Import semua komponen asli milikmu
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import VisiMisiSection from "@/components/sections/VisiMisiSection";
import CoreValuesSection from "@/components/sections/CoreValuesSection";
import LayananSection from "@/components/sections/LayananSection";
import RuteSection from "@/components/sections/RuteSection";
import PricingSection from "@/components/sections/PricingSection";
import TeamSection from "@/components/sections/TeamSection";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("beranda");

  return (
    <main className="min-h-screen w-full flex flex-col bg-[#0D0D14] font-sans">
      
      {/* NAVBAR INTERAKTIF */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-[#2D1B69] bg-[#0D0D14] z-50 sticky top-0 shadow-lg backdrop-blur-md bg-opacity-95">
        
        {/* Logo Kiri - SEKARANG SUDAH AKTIF ANIMASINYA */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab("beranda")}>
          <Image 
            src="/logo.png" 
            alt="Praketrio" 
            width={40} 
            height={40} 
            className="object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" 
          />
          <div className="text-[#A855F7] font-bold text-xl tracking-widest uppercase font-mono transition-colors duration-300 group-hover:text-[#C084FC]">
            Praketrio
          </div>
        </div>
        
        {/* Bagian Kanan */}
        <div className="flex items-center gap-6">
          
          {/* CONTAINER DROPDOWN */}
          <div className="relative group">
            <button className="flex items-center gap-2 text-white font-bold hover:text-[#C084FC] transition-colors py-2 active:scale-95">
              Menu <span className="text-[10px] transition-transform duration-300 group-hover:rotate-180">▼</span>
            </button>
            
            {/* Sub-menu Dropdown dengan efek geser halus */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#1E1256] border border-[#A855F7] rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top flex flex-col overflow-hidden z-50">
              <button onClick={() => setActiveTab("beranda")} className={`text-left px-6 py-3 text-sm transition-all duration-200 ${activeTab === 'beranda' ? 'bg-[#A855F7] text-white font-bold' : 'text-white/80 hover:bg-[#2D1B69] hover:text-white hover:translate-x-2'}`}>Beranda</button>
              <button onClick={() => setActiveTab("tentang")} className={`text-left px-6 py-3 text-sm transition-all duration-200 ${activeTab === 'tentang' ? 'bg-[#A855F7] text-white font-bold' : 'text-white/80 hover:bg-[#2D1B69] hover:text-white hover:translate-x-2'}`}>Tentang</button>
              <button onClick={() => setActiveTab("visi")} className={`text-left px-6 py-3 text-sm transition-all duration-200 ${activeTab === 'visi' ? 'bg-[#A855F7] text-white font-bold' : 'text-white/80 hover:bg-[#2D1B69] hover:text-white hover:translate-x-2'}`}>Visi & Misi</button>
              <button onClick={() => setActiveTab("layanan")} className={`text-left px-6 py-3 text-sm transition-all duration-200 ${activeTab === 'layanan' ? 'bg-[#A855F7] text-white font-bold' : 'text-white/80 hover:bg-[#2D1B69] hover:text-white hover:translate-x-2'}`}>Layanan</button>
              <button onClick={() => setActiveTab("paket")} className={`text-left px-6 py-3 text-sm transition-all duration-200 ${activeTab === 'paket' ? 'bg-[#A855F7] text-white font-bold' : 'text-white/80 hover:bg-[#2D1B69] hover:text-white hover:translate-x-2'}`}>Paket</button>
              <button onClick={() => setActiveTab("rute")} className={`text-left px-6 py-3 text-sm transition-all duration-200 ${activeTab === 'rute' ? 'bg-[#A855F7] text-white font-bold' : 'text-white/80 hover:bg-[#2D1B69] hover:text-white hover:translate-x-2'}`}>Rute</button>
              <button onClick={() => setActiveTab("tim")} className={`text-left px-6 py-3 text-sm transition-all duration-200 ${activeTab === 'tim' ? 'bg-[#A855F7] text-white font-bold' : 'text-white/80 hover:bg-[#2D1B69] hover:text-white hover:translate-x-2'}`}>Tim</button>
            </div>
          </div>

          {/* Tombol Masuk dengan Efek Glow & Melayang */}
          <Link href="/login" className="border-2 border-[#A855F7] text-white font-bold px-8 py-2 rounded-full hover:bg-[#A855F7] hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300">
            Masuk
          </Link>
        </div>
      </nav>

      {/* AREA KONTEN */}
      <div className="flex-grow flex flex-col">
        
        {activeTab === "beranda" && (
          <div className="animate-fade-in flex flex-col">
            <div className="mt-[-60px] md:mt-[-150px] lg:mt-[-180px]">
              <HeroSection />
            </div>
            
            <div className="mt-[-40px] md:mt-[-100px] lg:mt-[-120px] relative z-10">
              <StatsSection />
            </div>
          </div>
        )}

        {activeTab === "tentang" && (
          <div className="animate-fade-in">
            <AboutSection />
          </div>
        )}

        {activeTab === "visi" && (
          <div className="animate-fade-in">
            <VisiMisiSection />
            <CoreValuesSection />
          </div>
        )}

        {activeTab === "layanan" && (
          <div className="animate-fade-in">
            <LayananSection />
          </div>
        )}

        {activeTab === "paket" && (
          <div className="animate-fade-in">
            <PricingSection />
          </div>
        )}

        {activeTab === "rute" && (
          <div className="animate-fade-in">
            <RuteSection />
          </div>
        )}

        {activeTab === "tim" && (
          <div className="animate-fade-in">
            <TeamSection />
          </div>
        )}

      </div>

      <Footer />

    </main>
  );
}