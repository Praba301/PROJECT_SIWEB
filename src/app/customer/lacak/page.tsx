"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import CustomerSidebar from "@/components/layout/CustomerSidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const statusSteps = [
  { label: "Paket Diterima", date: "18 April 2026", time: "08.00" },
  { label: "Dimuat ke Kapal", date: "18 April 2026", time: "14.30" },
  { label: "Dalam Perjalanan", date: "19 April 2026", time: "06.00" },
  { label: "Tiba di Pelabuhan", date: "", time: "" },
  { label: "Siap Ambil", date: "", time: "" },
];

const dummyResult = {
  resi: "PRKT-000001572",
  rute: "Surabaya → Lombok",
  estTiba: "23 April",
  activeStep: 2,
};

export default function LacakPaket() {
  const [noResi, setNoResi] = useState("");
  const [hasil, setHasil] = useState<typeof dummyResult | null>(null);
  const [sudahCari, setSudahCari] = useState(false);

  const handleLacak = () => {
    setSudahCari(true);
    if (noResi.trim() !== "") {
      setHasil(dummyResult);
    } else {
      setHasil(null);
    }
  };

  return (
    <div className={`${poppins.className} flex min-h-screen bg-[#0D0D2B]`}>
      <CustomerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="flex items-center justify-between px-10 py-5 border-b border-[#2D1B69] shadow-[0_1px_20px_rgba(168,85,247,0.08)]">
          <span className="text-white font-bold text-lg tracking-widest uppercase">
            Praketrio
          </span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#A855F7]/20 border border-[#A855F7]/40 flex items-center justify-center text-[#A855F7] text-xs font-bold">
              P
            </div>
            <span className="text-white/80 font-medium text-sm">Halo, Praba</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-10 py-8">

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-white font-bold text-2xl tracking-wide">
              Lacak Paket
            </h1>
            <p className="text-[#A0A0B0] text-sm mt-1">
              Masukkan nomor resi untuk melihat status pengirimanmu
            </p>
            <div className="w-10 h-1 bg-[#A855F7] mx-auto mt-3 rounded-full" />
          </div>

          {/* Search Box */}
          <div className="bg-[#13133A] border border-[#A855F7]/40 rounded-2xl p-6 max-w-3xl mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            <label className="text-[#C084FC] text-xs font-semibold uppercase tracking-widest mb-3 block">
              Nomor Resi
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={noResi}
                onChange={(e) => setNoResi(e.target.value)}
                placeholder="Contoh: PRKT-000001572"
                onKeyDown={(e) => e.key === "Enter" && handleLacak()}
                className="flex-1 bg-[#0D0D2B] border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#A855F7] focus:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all duration-200"
              />
              <button
                onClick={handleLacak}
                className="bg-[#A855F7]/10 border border-[#A855F7] hover:bg-[#A855F7]/25 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white font-semibold px-8 py-3 rounded-lg text-sm transition-all duration-200"
              >
                Lacak
              </button>
            </div>
          </div>

          {/* Hasil Lacak */}
          <div className="bg-[#13133A] border border-[#A855F7]/40 rounded-2xl p-6 max-w-3xl mx-auto min-h-48 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            {hasil ? (
              <div className="flex flex-col gap-6">

                {/* Info Resi */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#0D0D2B] border border-[#A855F7]/30 rounded-xl p-4 shadow-[0_0_12px_rgba(168,85,247,0.1)]">
                    <p className="text-[#C084FC] text-xs uppercase tracking-widest mb-2 font-semibold">
                      Resi
                    </p>
                    <p className="text-[#A855F7] text-sm font-mono font-semibold">
                      {hasil.resi}
                    </p>
                  </div>
                  <div className="bg-[#0D0D2B] border border-[#A855F7]/30 rounded-xl p-4 shadow-[0_0_12px_rgba(168,85,247,0.1)]">
                    <p className="text-[#C084FC] text-xs uppercase tracking-widest mb-2 font-semibold">
                      Rute
                    </p>
                    <p className="text-white text-sm font-medium">{hasil.rute}</p>
                  </div>
                  <div className="bg-[#0D0D2B] border border-[#A855F7]/30 rounded-xl p-4 shadow-[0_0_12px_rgba(168,85,247,0.1)]">
                    <p className="text-[#C084FC] text-xs uppercase tracking-widest mb-2 font-semibold">
                      EST. Tiba
                    </p>
                    <p className="text-[#22C55E] text-sm font-semibold">
                      {hasil.estTiba}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#A855F7]/20" />

                {/* Status Pengiriman */}
                <div>
                  <p className="text-white text-sm font-semibold text-center mb-8 tracking-wide">
                    Status Pengiriman
                  </p>

                  {/* Stepper */}
                  <div className="relative flex items-start justify-between">
                    {/* Line Background */}
                    <div className="absolute top-4 left-0 right-0 h-1 bg-[#2D1B69] z-0 rounded-full" />

                    {/* Line Active */}
                    <div
                      className="absolute top-4 left-0 h-1 bg-[#22C55E] z-0 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                      style={{
                        width: `${(hasil.activeStep / (statusSteps.length - 1)) * 100}%`,
                      }}
                    />

                    {statusSteps.map((step, index) => {
                      const isDone = index <= hasil.activeStep;
                      const isActive = index === hasil.activeStep;
                      return (
                        <div
                          key={step.label}
                          className="relative z-10 flex flex-col items-center gap-2 flex-1"
                        >
                          {/* Circle */}
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                              isDone
                                ? "bg-[#22C55E] border-[#22C55E] text-white shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                                : "bg-[#0D0D2B] border-[#4B2D8A] text-[#4B2D8A]"
                            } ${isActive ? "scale-110" : ""}`}
                          >
                            {isDone ? "✓" : ""}
                          </div>

                          {/* Label */}
                          <p className={`text-xs text-center leading-tight font-medium ${isDone ? "text-white" : "text-white/40"}`}>
                            {step.label}
                          </p>
                          {step.date && (
                            <p className="text-[#A0A0B0] text-xs text-center leading-tight">
                              {step.date}
                            </p>
                          )}
                          {step.time && (
                            <p className="text-[#A855F7] text-xs text-center font-mono">
                              {step.time}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ) : (
              sudahCari ? (
                <div className="flex flex-col items-center justify-center mt-10 gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-xl">
                    ✗
                  </div>
                  <p className="text-[#A0A0B0] text-sm text-center">
                    No resi tidak ditemukan. Coba periksa kembali.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mt-10 gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7] text-xl">
                    📦
                  </div>
                  <p className="text-[#A0A0B0] text-sm text-center">
                    Masukkan nomor resi untuk melihat status pengiriman
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