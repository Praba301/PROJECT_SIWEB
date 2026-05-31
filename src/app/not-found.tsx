import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan | Praketrio",
  description: "Halaman atau data yang Anda cari tidak tersedia.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070712] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Efek Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* 404 Text */}
        <h1 
          className="text-8xl md:text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#A855F7] via-[#C084FC] to-[#3B82F6] drop-shadow-[0_0_40px_rgba(168,85,247,0.3)] tracking-widest"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          404
        </h1>
        
        <div className="space-y-2">
          <h2 
            className="text-2xl md:text-3xl font-bold text-white tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-[#A0A0B0] max-w-md mx-auto text-sm md:text-base leading-relaxed">
            Maaf, halaman atau data yang Anda cari tidak tersedia, telah dihapus, atau Anda salah memasukkan URL.
          </p>
        </div>

        <div className="pt-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#13131F] border border-[#1E1E2E] text-white font-bold text-sm tracking-widest uppercase rounded-full hover:border-[#A855F7] hover:bg-[#1A1A24] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-1 active:scale-95 transition-all duration-300 group"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <svg className="w-5 h-5 text-[#A855F7] group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}