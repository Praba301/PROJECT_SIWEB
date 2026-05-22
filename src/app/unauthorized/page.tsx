"use client";

import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen bg-[#050508] flex items-center justify-center relative overflow-hidden select-none"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      {/* 1. Cyber Grid & Scanline Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14141f_1px,transparent_1px),linear-gradient(to_bottom,#14141f_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_50%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] pointer-events-none" />

      {/* Extreme Neon Glow Flares */}
      <div className="absolute top-[20%] left-[15%] w-[40%] h-[40%] bg-[#A855F7]/20 blur-[130px] rounded-full pointer-events-none animate-pulse duration-[4s]" />
      <div className="absolute bottom-[15%] right-[15%] w-[45%] h-[45%] bg-[#DC2626]/10 blur-[150px] rounded-full pointer-events-none animate-pulse duration-[6s]" />

      {/* 2. Tactical UI Cyber Container */}
      <div 
        className="flex flex-col items-center text-center relative z-10 px-8 py-14 mx-4 rounded-tr-[40px] rounded-bl-[40px] bg-gradient-to-b from-[#0b0b12]/90 to-[#07070c]/95 border-2 border-[#A855F7]/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(168,85,247,0.15)] max-w-lg w-full transition-all duration-300 hover:border-[#EF4444]/50 group"
        style={{ gap: "3vh" }}
      >
        {/* Tactical Corner Brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-purple-500/40 transition-colors group-hover:border-red-500/60" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-purple-500/40 transition-colors group-hover:border-red-500/60" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-purple-500/40 transition-colors group-hover:border-red-500/60" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-purple-500/40 transition-colors group-hover:border-red-500/60" />

        {/* Top Mini Warning Badge */}
        <div className="text-[10px] tracking-[0.3em] font-bold text-red-400 uppercase px-3 py-1 bg-red-950/40 border border-red-500/40 rounded-md inline-block animate-pulse">
          ⚡ Error ⚡
        </div>

        {/* 3. Aggressive Neon Lock Icon */}
        <div
          className="flex items-center justify-center rounded-xl bg-gradient-to-b from-[#1c1236] to-[#0d071f] border-2 border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.4)] transform group-hover:scale-105 transition-transform duration-300"
          style={{ width: "90px", height: "90px" }}
        >
          <svg
            fill="none"
            stroke="url(#gaharGlow)"
            viewBox="0 0 24 24"
            strokeWidth="2"
            className="w-10 h-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]"
          >
            <defs>
              <linearGradient id="gaharGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="60%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* 4. Heavy Typography dengan Glitch Effect pada Hover */}
        <div className="space-y-3">
          <h1
            className="text-white font-black tracking-tight uppercase transition-all duration-200"
            style={{
              fontFamily: "var(--font-orbitron)",
              fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
              lineHeight: "0.95",
            }}
          >
            AKSES <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)] group-hover:animate-pulse">
              ILEGAL!
            </span>
          </h1>

          {/* Decorative Divider Line */}
          <div className="w-24 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto my-2" />

          <p
            className="text-gray-400 font-medium tracking-wide text-balance"
            style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)", maxWidth: "360px" }}
          >
            Identitas dekripsi gagal divalidasi oleh sistem. Silakan kembali untuk otentikasi ulang.
          </p>
        </div>

        {/* 5. High-Tech Cyber Buttons */}
        <div className="flex flex-col gap-3 w-full mt-2">
          {/* Main Button: Neon Block */}
          <button
            onClick={() => router.push("/login")}
            className="group/btn relative w-full overflow-hidden bg-transparent border-2 border-red-500 text-white font-black uppercase tracking-widest rounded-none py-4 transition-all duration-300 hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] active:scale-[0.98]"
            style={{
              fontSize: "clamp(0.85rem, 0.9vw, 0.95rem)",
              fontFamily: "var(--font-orbitron)",
            }}
          >
            {/* Slide Background Effect */}
            <span className="absolute inset-0 w-full h-full bg-red-500 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out z-0" />
            
            <span className="relative z-10 group-hover/btn:text-black flex items-center justify-center gap-2">
              <span>Login</span>
            </span>
          </button>

          {/* Secondary Button: Clean Outlined */}
          <button
            onClick={() => router.push("/")}
            className="w-full bg-white/[0.02] hover:bg-white/[0.07] border border-white/10 hover:border-red-500/30 text-gray-400 hover:text-white font-bold uppercase tracking-widest rounded-none py-3.5 transition-all duration-300"
            style={{
              fontSize: "clamp(0.8rem, 0.85vw, 0.9rem)",
              fontFamily: "var(--font-orbitron)",
            }}
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </main>
  );
}