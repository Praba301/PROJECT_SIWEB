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
    <section id="rute" className="bg-[#0A0A12] py-24 px-6">
      <div className="max-w-3xl mx-auto w-full">

        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-bold text-[#C084FC] text-center mb-4">
          Jangkauan Nusantara
        </h2>
        <p className="text-[#A0A0B0] text-center text-sm md:text-base leading-relaxed mb-12">
          Paketrio melayani rute pengiriman ke seluruh wilayah Indonesia dengan
          frekuensi keberangkatan hingga 3x seminggu di rute utama.
        </p>

        {/* Accordion Rute */}
        <div className="flex flex-col gap-3">
          {rutes.map((item, index) => (
            <div
              key={item.route}
              className="bg-[#13131F] border border-[#1E1E2E] rounded-xl overflow-hidden hover:border-[#A855F7]/40 transition-colors duration-200"
            >
              {/* Header Accordion */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <div>
                  <p className="text-white font-semibold text-base">
                    {item.route}
                  </p>
                  <p className="text-[#A0A0B0] text-xs mt-1">
                    {item.via} · {item.duration}
                  </p>
                </div>
                <span className="text-[#A855F7] text-xl font-bold">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* Body Accordion */}
              {openIndex === index && (
                <div className="px-6 pb-5 border-t border-[#1E1E2E]">
                  <div className="pt-4 flex flex-col gap-2 text-sm text-[#A0A0B0]">
                    <p>✓ Frekuensi: 3x seminggu</p>
                    <p>✓ Kapasitas: hingga 500 TEU</p>
                    <p>✓ Tracking realtime tersedia</p>
                    <p>✓ Asuransi kargo inklusif</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}