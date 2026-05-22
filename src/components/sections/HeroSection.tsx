"use client";
import Image from "next/image";

// Menerima prop onTabChange dari page.tsx
export default function HeroSection({ onTabChange }: { onTabChange: (tab: string) => void }) {
  return (
    <section className="min-h-screen bg-[#0D0D14] flex flex-col justify-center pt-20 px-6 relative overflow-hidden">
      
      {/* Background Ornamen */}
      <div className="absolute top-[30%] left-[-10%] w-[300px] h-[300px] bg-[#A855F7]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Kiri: Teks */}
        <div className="flex-1">
          {/* Label: Muncul pertama (Delay 0.1s) */}
          <p 
            className="text-[#A855F7] text-sm font-mono mb-6 md:text-right opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Praketrio Fleet Monitor
          </p>

          {/* Judul: Muncul kedua (Delay 0.3s) */}
          <h1 
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Kirim Lebih Jauh,{" "}
            <span className="text-[#C084FC]">
              Lebih Andal
            </span> via Laut
          </h1>

          {/* Deskripsi: Muncul ketiga (Delay 0.5s) */}
          <p 
            className="text-[#A0A0B0] text-base md:text-lg leading-relaxed mb-8 max-w-lg opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            Praketrio menghadirkan layanan pengiriman barang melalui kapal laut
            dengan teknologi tracking realtime, rute luas ke seluruh kepulauan
            Indonesia, dan armada berkapasitas tinggi.
          </p>

          {/* Tombol: Muncul keempat (Delay 0.7s) */}
          <div 
            className="flex items-center gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.7s" }}
          >
            {/* Tombol Lihat Paket → pindah ke tab "paket" */}
            <button
              onClick={() => onTabChange("paket")}
              className="bg-[#A855F7] hover:bg-[#9333EA] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:-translate-y-1 active:scale-95 active:translate-y-0"
            >
              Lihat Paket
            </button>

            {/* Tombol Lihat Layanan → pindah ke tab "layanan" */}
            <button
              onClick={() => onTabChange("layanan")}
              className="border border-white/20 hover:border-white/80 hover:bg-white/5 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-1 active:scale-95 active:translate-y-0"
            >
              Lihat Layanan
            </button>
          </div>
        </div>

        {/* Kanan: Logo/Ilustrasi - Muncul belakangan (Delay 0.9s) */}
        <div 
          className="flex-1 flex justify-center items-center opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.9s" }}
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-[#A855F7]/20 blur-[60px] rounded-full scale-50 group-hover:scale-110 transition-transform duration-700 ease-in-out"></div>
            
            <Image
              src="/logo.png"
              alt="Praketrio Ship Logo"
              width={380}
              height={380}
              className="object-contain drop-shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-4 group-hover:rotate-2 group-hover:drop-shadow-[0_0_60px_rgba(168,85,247,0.6)] relative z-10"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
