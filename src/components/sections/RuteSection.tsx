"use client";

import { useState } from "react";

const rutes = [
  {
    route: "Jakarta – Surabaya",
    via: "Via Laut Jawa",
    duration: "18–24 jam",
  },
  {
    route: "Jakarta – Semarang",
    via: "Via Laut Jawa",
    duration: "12–18 jam",
  },
  {
    route: "Jakarta – Medan",
    via: "Via Selat Malaka",
    duration: "48–60 jam",
  },
  {
    route: "Surabaya – Makassar",
    via: "Via Laut Flores",
    duration: "28–36 jam",
  },
  {
    route: "Semarang – Makassar",
    via: "Via Laut Jawa - Laut Flores",
    duration: "32–40 jam",
  },
  {
    route: "Surabaya – Medan",
    via: "Via Laut Jawa - Selat Malaka",
    duration: "56–72 jam",
  },
];

export default function RuteSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="rute" className="bg-[#0A0A12] py-24 px-6 relative overflow-hidden">
      
      {/* Background Ornamen */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1E1E2E] to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A855F7]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto w-full relative z-10">

        {/* Header */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-3xl md:text-5xl font-bold text-[#C084FC] text-center mb-4">
            Jangkauan Nusantara
          </h2>
          <p className="text-[#A0A0B0] text-center text-sm md:text-base leading-relaxed mb-12 max-w-xl mx-auto">
            Praketrio melayani rute pengiriman ke seluruh wilayah Indonesia dengan
            frekuensi keberangkatan hingga 3x seminggu di rute utama.
          </p>
        </div>

        {/* Grid Rute (tanpa accordion) - lebih simpel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rutes.map((item, index) => (
            <div
              key={item.route}
              className="bg-[#13131F] border border-[#1E1E2E] rounded-xl p-5 transition-all duration-300 hover:border-[#A855F7]/50 hover:shadow-[0_5px_20px_rgba(168,85,247,0.1)] hover:-translate-y-1 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <p className="text-white font-bold text-base transition-colors duration-300 group-hover:text-[#C084FC]">
                {item.route}
              </p>
              <p className="text-[#A0A0B0] text-xs mt-1">
                {item.via} <span className="text-[#A855F7]">·</span> {item.duration}
              </p>
              <div className="flex flex-wrap gap-3 mt-3 pt-2 border-t border-[#1E1E2E]">
                <span className="text-[#22C55E] text-xs flex items-center gap-1">✓ Frekuensi: 3x seminggu</span>
                <span className="text-[#A0A0B0] text-xs flex items-center gap-1">📦 Kapasitas: 500 TEU</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}