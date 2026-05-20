"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import CustomerSidebar from "@/components/layout/CustomerSidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Data sinkron dengan riwayat/page.tsx
const dataRiwayat = [
  {
    noResi: "SWB-20240001",
    rute: "Surabaya → Makassar",
    tanggal: "18 Apr 2026",
    estTiba: "22 Apr 2026",
    status: "Dalam perjalanan",
    activeStep: 2,
  },
  {
    noResi: "SWB-20240002",
    rute: "Jakarta → Balikpapan",
    tanggal: "18 Apr 2026",
    estTiba: "23 Apr 2026",
    status: "Dimuat ke kapal",
    activeStep: 1,
  },
  {
    noResi: "SWB-20240003",
    rute: "Makassar → Sorong",
    tanggal: "10 Apr 2026",
    estTiba: "14 Apr 2026",
    status: "Terkirim",
    activeStep: 4,
  },
  {
    noResi: "SWB-20240004",
    rute: "Surabaya → Kupang",
    tanggal: "11 Apr 2026",
    estTiba: "15 Apr 2026",
    status: "Terkirim",
    activeStep: 4,
  },
  {
    noResi: "SWB-20240005",
    rute: "Surabaya → Makassar",
    tanggal: "13 Apr 2026",
    estTiba: "17 Apr 2026",
    status: "Terkirim",
    activeStep: 4,
  },
];

const statusSteps = [
  { label: "Paket Diterima" },
  { label: "Dimuat ke Kapal" },
  { label: "Dalam Perjalanan" },
  { label: "Tiba di Pelabuhan" },
  { label: "Terkirim" },
];

const statusConfig = (status: string) => {
  if (status === "Terkirim")
    return { color: "text-[#22C55E]", bg: "bg-[#22C55E]/10", border: "border-[#22C55E]/30", dot: "bg-[#22C55E]" };
  if (status === "Dalam perjalanan")
    return { color: "text-[#60A5FA]", bg: "bg-[#3B82F6]/10", border: "border-[#3B82F6]/30", dot: "bg-[#60A5FA]" };
  if (status === "Dimuat ke kapal")
    return { color: "text-[#FCD34D]", bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]/30", dot: "bg-[#FCD34D]" };
  return { color: "text-white", bg: "bg-white/10", border: "border-white/20", dot: "bg-white" };
};

export default function LacakPaket() {
  const [noResi, setNoResi] = useState("");
  const [hasil, setHasil] = useState<(typeof dataRiwayat)[0] | null>(null);
  const [sudahCari, setSudahCari] = useState(false);
  // State khusus untuk menunda animasi progress bar
  const [animateProgress, setAnimateProgress] = useState(false);

  const handleLacak = () => {
    setSudahCari(true);
    setAnimateProgress(false); // Reset animasi
    const found = dataRiwayat.find(
      (item) => item.noResi.toLowerCase() === noResi.trim().toLowerCase()
    );
    setHasil(found ?? null);

    if (found) {
      setTimeout(() => setAnimateProgress(true), 100);
    }
  };

  return (
    <div className={`${poppins.className} flex min-h-screen bg-[#0A0A12] relative overflow-hidden`}>
      <CustomerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        
        {/* Background Glow */}
        <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-[#A855F7]/10 blur-[150px] rounded-full pointer-events-none" />

        {/* Header - Masuk dari bawah */}
        <header className="flex items-center justify-between px-10 py-6 border-b border-[#1E1E2E] bg-[#0A0A12]/80 backdrop-blur-md sticky top-0 z-20 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <span className="text-[#A855F7] font-bold text-lg tracking-widest uppercase font-mono">
            Praketrio
          </span>
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex flex-col items-end">
              <span className="text-white font-bold text-sm transition-colors group-hover:text-[#C084FC]">Praba</span>
              <span className="text-[#6B6B80] text-xs">Customer</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1E1E2E] border border-[#A855F7]/40 flex items-center justify-center text-[#A855F7] text-sm font-bold shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-transform duration-300 group-hover:scale-110">
              P
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-10 py-10 overflow-y-auto">

          {/* Title */}
          <div className="text-center mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-white font-bold text-3xl tracking-wide">
              Lacak Paket
            </h1>
            <p className="text-[#A0A0B0] text-sm mt-2">
              Masukkan nomor resi untuk melihat status pengirimanmu secara real-time.
            </p>
            <div className="w-12 h-1.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] mx-auto mt-4 rounded-full" />
          </div>

          {/* Search Box - Animasi Masuk */}
          <div 
            className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 max-w-3xl mx-auto mb-6 shadow-xl opacity-0 animate-fade-in-up relative z-20"
            style={{ animationDelay: "0.3s" }}
          >
            <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest mb-3 block">
              Nomor Resi Pengiriman
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-[#6B6B80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={noResi}
                  onChange={(e) => {
                    setNoResi(e.target.value);
                    setSudahCari(false);
                    setHasil(null);
                  }}
                  placeholder="Contoh: SWB-20240001"
                  onKeyDown={(e) => e.key === "Enter" && handleLacak()}
                  className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl pl-12 pr-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 uppercase"
                />
              </div>
              <button
                onClick={handleLacak}
                className="bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold px-10 py-3.5 rounded-xl text-sm transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95 flex items-center justify-center gap-2"
              >
                Lacak
              </button>
            </div>
          </div>

          {/* Hasil Lacak */}
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 md:p-10 max-w-3xl mx-auto min-h-64 shadow-xl relative opacity-0 animate-fade-in-up flex flex-col justify-center" style={{ animationDelay: "0.4s" }}>
            {hasil ? (
              <div className="flex flex-col gap-8 opacity-0 animate-zoom-in">

                {/* Info Resi Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="group bg-[#0A0A12] border border-[#1E1E2E] hover:border-[#A855F7]/50 rounded-xl p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(168,85,247,0.1)]">
                    <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest mb-1.5 font-bold group-hover:text-[#A0A0B0] transition-colors">Resi</p>
                    <p className="text-[#C084FC] text-sm font-mono font-bold">{hasil.noResi}</p>
                  </div>
                  <div className="group bg-[#0A0A12] border border-[#1E1E2E] hover:border-[#A855F7]/50 rounded-xl p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(168,85,247,0.1)]">
                    <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest mb-1.5 font-bold group-hover:text-[#A0A0B0] transition-colors">Rute</p>
                    <p className="text-white text-sm font-semibold">{hasil.rute}</p>
                  </div>
                  <div className="group bg-[#0A0A12] border border-[#1E1E2E] hover:border-[#22C55E]/50 rounded-xl p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(34,197,94,0.1)]">
                    <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest mb-1.5 font-bold group-hover:text-[#A0A0B0] transition-colors">EST. Tiba</p>
                    <p className="text-[#22C55E] text-sm font-bold">{hasil.estTiba}</p>
                  </div>
                  <div className="group bg-[#0A0A12] border border-[#1E1E2E] rounded-xl p-4 shadow-sm transition-all duration-300 hover:-translate-y-1">
                    <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest mb-1.5 font-bold">Status</p>
                    <div className="mt-0.5">
                      {(() => {
                        const s = statusConfig(hasil.status);
                        return (
                          <span className={`inline-flex items-center gap-2 text-xs font-bold px-2.5 py-1 rounded-md border ${s.color} ${s.bg} ${s.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${hasil.status !== "Terkirim" ? "animate-pulse-glow" : ""}`} />
                            {hasil.status}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#1E1E2E]" />

                {/* Status Pengiriman (Stepper) */}
                <div>
                  <p className="text-white text-sm font-bold text-center mb-10 tracking-wide uppercase">
                    Jejak Pengiriman
                  </p>

                  <div className="relative flex items-start justify-between px-2 md:px-6">
                    {/* Line Background */}
                    <div className="absolute top-4 left-6 right-6 md:left-12 md:right-12 h-1.5 bg-[#1E1E2E] z-0 rounded-full" />

                    {/* Line Active - Animasi merambat */}
                    <div
                      className="absolute top-4 left-6 md:left-12 h-1.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] z-0 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                      style={{
                        width: animateProgress ? `calc(${(hasil.activeStep / (statusSteps.length - 1)) * 100}% - 3rem)` : "0%",
                      }}
                    />

                    {statusSteps.map((step, index) => {
                      const isDone = index <= hasil.activeStep;
                      const isActive = index === hasil.activeStep;
                      return (
                        <div
                          key={step.label}
                          className="relative z-10 flex flex-col items-center gap-3 flex-1"
                        >
                          {/* Circle */}
                          <div
                            className={`w-9 h-9 rounded-full border-[3px] flex items-center justify-center text-sm font-bold transition-all duration-700 delay-${index * 100} ${
                              isDone
                                ? "bg-[#A855F7] border-[#C084FC] text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]"
                                : "bg-[#0A0A12] border-[#1E1E2E] text-transparent"
                            } ${isActive ? "scale-125 ring-4 ring-[#A855F7]/20" : ""}`}
                          >
                            {isDone ? "✓" : ""}
                          </div>

                          {/* Label */}
                          <p className={`text-[11px] md:text-xs text-center leading-tight font-semibold mt-2 transition-colors duration-500 max-w-[80px] ${isDone ? "text-white" : "text-[#6B6B80]"}`}>
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ) : (
              sudahCari ? (
                // State: Not Found
                <div className="flex flex-col items-center justify-center gap-4 opacity-0 animate-zoom-in">
                  <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-2xl animate-pulse">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">Resi Tidak Ditemukan</p>
                    <p className="text-[#A0A0B0] text-sm mt-1">Periksa kembali nomor resi yang Anda masukkan.</p>
                  </div>
                </div>
              ) : (
                // State: Initial / Empty
                <div className="flex flex-col items-center justify-center gap-4 opacity-0 animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7] text-3xl animate-float">
                    📦
                  </div>
                  <p className="text-[#A0A0B0] text-sm text-center font-medium">
                    Masukkan nomor resi di atas untuk melacak posisi paket Anda.
                  </p>
                </div>
              )
            )}
          </div>

        </main>
      </div>
    </div>
  );
}