"use client";

import { useState } from "react";

const rutes = [
  {
    route: "Jakarta – Surabaya",
    via: "Via Selat Madura",
    duration: "18–22 jam",
  },
  {
    route: "Surabaya – Makassar",
    via: "Laut Flores",
    duration: "28–32 jam",
  },
  {
    route: "Makassar – Manado",
    via: "Laut Sulawesi",
    duration: "36–48 jam",
  },
  {
    route: "Jakarta – Medan",
    via: "Selat Malaka",
    duration: "48–56 jam",
  },
  {
    route: "Surabaya – Sorong",
    via: "Laut Banda",
    duration: "5–6 hari",
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

        {/* Header - Masuk dengan animasi Fade In Up */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-3xl md:text-5xl font-bold text-[#C084FC] text-center mb-4">
            Jangkauan Nusantara
          </h2>
          <p className="text-[#A0A0B0] text-center text-sm md:text-base leading-relaxed mb-12 max-w-xl mx-auto">
            Praketrio melayani rute pengiriman ke seluruh wilayah Indonesia dengan
            frekuensi keberangkatan hingga 3x seminggu di rute utama.
          </p>
        </div>

        {/* Accordion Rute */}
        <div className="flex flex-col gap-4">
          {rutes.map((item, index) => (
            <div
              key={item.route}
              // Efek muncul berurutan dan hover styling
              className="group bg-[#13131F] border border-[#1E1E2E] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#A855F7]/50 hover:shadow-[0_5px_20px_rgba(168,85,247,0.1)] opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              {/* Header Accordion */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-300 hover:bg-[#1A1A24]"
              >
                <div>
                  <p className="text-white font-bold text-base transition-colors duration-300 group-hover:text-[#C084FC]">
                    {item.route}
                  </p>
                  <p className="text-[#A0A0B0] text-xs mt-1 transition-colors duration-300 group-hover:text-white/80">
                    {item.via} <span className="text-[#A855F7]">·</span> {item.duration}
                  </p>
                </div>
                
                {/* Ikon + yang berputar 45 derajat (jadi x) saat terbuka */}
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full border border-[#2D1B69] text-[#A855F7] transition-all duration-300 ${
                    openIndex === index ? "rotate-45 bg-[#A855F7] text-white border-transparent shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "group-hover:bg-[#A855F7]/10"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </button>

              {/* Body Accordion - Animasi Slide Down Mulus menggunakan Grid */}
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-2 border-t border-[#1E1E2E] mt-2">
                    <div className="grid grid-cols-2 gap-3 text-sm text-[#A0A0B0]">
                      <p className="flex items-center gap-2"><span className="text-[#22C55E]">✓</span> Frekuensi: 3x seminggu</p>
                      <p className="flex items-center gap-2"><span className="text-[#22C55E]">✓</span> Kapasitas: 500 TEU</p>
                      <p className="flex items-center gap-2"><span className="text-[#22C55E]">✓</span> Tracking realtime</p>
                      <p className="flex items-center gap-2"><span className="text-[#22C55E]">✓</span> Asuransi inklusif</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
