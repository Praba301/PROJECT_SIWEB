"use client";

import { useState } from "react";
import CustomerSidebar from "@/components/layout/CustomerSidebar";

const statusSteps = [
  { label: "Paket Diterima", date: "18 April 2026", time: "08.00" },
  { label: "Dimuat ke Kapal", date: "18 April 2026", time: "14.30" },
  { label: "Dalam Perjalanan", date: "19 April 2026", time: "06.00" },
  { label: "Tiba dipelabuhan", date: "", time: "" },
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
    <div className="flex min-h-screen bg-[#0D0D2B]">
      <CustomerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="flex items-center justify-between px-10 py-5 border-b border-[#2D1B69]">
          <span className="text-white font-bold text-lg">Praketrio</span>
          <span className="text-white font-semibold text-sm">Halo, Praba</span>
        </header>

        {/* Content */}
        <main className="flex-1 px-10 py-8">
          <h1 className="text-white font-bold text-2xl text-center mb-8 font-mono">
            Lacak Paket
          </h1>

          {/* Search Box */}
          <div className="bg-[#13133A] border border-[#2D1B69] rounded-xl p-6 max-w-3xl mx-auto mb-6">
            <label className="text-white text-sm font-semibold mb-3 block">
              Masukkan No Resi
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={noResi}
                onChange={(e) => setNoResi(e.target.value)}
                placeholder=""
                className="flex-1 bg-transparent border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]"
              />
              <button
                onClick={handleLacak}
                className="border border-[#4B2D8A] hover:border-[#A855F7] hover:bg-[#A855F7]/10 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-all duration-200"
              >
                Lacak
              </button>
            </div>
          </div>

          {/* Hasil Lacak */}
          <div className="bg-[#13133A] border border-[#2D1B69] rounded-xl p-6 max-w-3xl mx-auto min-h-48">
            {hasil ? (
              <div className="flex flex-col gap-6">

                {/* Info Resi */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[#A0A0B0] text-xs mb-1">Resi</p>
                    <p className="text-[#A855F7] text-sm font-mono font-semibold">
                      {hasil.resi}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#A0A0B0] text-xs mb-1">Rute</p>
                    <p className="text-white text-sm">{hasil.rute}</p>
                  </div>
                  <div>
                    <p className="text-[#A0A0B0] text-xs mb-1">EST. Tiba</p>
                    <p className="text-[#22C55E] text-sm font-semibold">
                      {hasil.estTiba}
                    </p>
                  </div>
                </div>

                {/* Status Pengiriman */}
                <div>
                  <p className="text-white text-sm font-semibold text-center mb-6">
                    Status Pengiriman
                  </p>

                  {/* Stepper */}
                  <div className="relative flex items-start justify-between">
                    {/* Line Background */}
                    <div className="absolute top-4 left-0 right-0 h-1 bg-[#2D1B69] z-0" />

                    {/* Line Active */}
                    <div
                      className="absolute top-4 left-0 h-1 bg-[#22C55E] z-0 transition-all duration-500"
                      style={{
                        width: `${(hasil.activeStep / (statusSteps.length - 1)) * 100}%`,
                      }}
                    />

                    {statusSteps.map((step, index) => {
                      const isDone = index <= hasil.activeStep;
                      return (
                        <div
                          key={step.label}
                          className="relative z-10 flex flex-col items-center gap-2 flex-1"
                        >
                          {/* Circle */}
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                              isDone
                                ? "bg-[#22C55E] border-[#22C55E] text-white"
                                : "bg-[#0D0D2B] border-[#4B2D8A] text-[#4B2D8A]"
                            }`}
                          >
                            {isDone ? "✓" : ""}
                          </div>

                          {/* Label */}
                          <p className="text-white text-xs text-center leading-tight">
                            {step.label}
                          </p>
                          {step.date && (
                            <p className="text-[#A0A0B0] text-xs text-center leading-tight">
                              {step.date}
                            </p>
                          )}
                          {step.time && (
                            <p className="text-[#A0A0B0] text-xs text-center">
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
              sudahCari && (
                <p className="text-[#A0A0B0] text-sm text-center mt-10">
                  No resi tidak ditemukan. Coba periksa kembali.
                </p>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
}