import Link from "next/link";

const plans = [
  {
    target: "Untuk UKM & Perorangan",
    name: "Starter",
    price: "Rp 850K",
    unit: "/pengiriman",
    note: "Untuk kargo hingga 500 kg atau 2 CBM",
    highlight: false,
    badge: null,
    features: [
      { text: "LCL (Less Container Load)", active: true },
      { text: "Tracking via aplikasi & web", active: true },
      { text: "Asuransi dasar (max Rp 10 juta)", active: true },
      { text: "Notifikasi email & WhatsApp", active: true },
      { text: "Dukungan via live chat", active: true },
      { text: "Dedicated account manager", active: false },
      { text: "Reefer / cold chain", active: false },
    ],
    cta: "Mulai Sekarang",
    ctaHref: "#",
  },
  {
    target: "Untuk Bisnis Menengah",
    name: "Business",
    price: "Rp 3.5 Jt",
    unit: "/pengiriman",
    note: "Untuk kargo 500 kg – 5 ton atau 1 TEU",
    highlight: true,
    badge: "Terpopuler",
    features: [
      { text: "FCL 20ft container", active: true },
      { text: "Realtime GPS tracking dashboard", active: true },
      { text: "Asuransi penuh (max Rp 150 juta)", active: true },
      { text: "Dedicated account manager", active: true },
      { text: "Prioritas jadwal keberangkatan", active: true },
      { text: "Laporan pengiriman bulanan", active: true },
      { text: "Reefer / cold chain", active: false },
    ],
    cta: "Pilih Paket Ini →",
    ctaHref: "#",
  },
  {
    target: "Untuk Korporasi & Industri",
    name: "Enterprise",
    price: "Custom",
    unit: "",
    note: "Penawaran khusus sesuai volume & kontrak",
    highlight: false,
    badge: null,
    features: [
      { text: "FCL 40ft / multi-container", active: true },
      { text: "Charter kapal penuh (bareboat/voyage)", active: true },
      { text: "Asuransi tanpa batas nilai kargo", active: true },
      { text: "API integration ke sistem klien", active: true },
      { text: "SLA & kontrak tahunan", active: true },
      { text: "Tim operasional on-site 24/7", active: true },
    ],
    cta: "Hubungi Sales",
    ctaHref: "#",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#0D0D14] py-24 px-6">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
          Pilih <span className="text-[#C084FC]">Paket</span> Sesuai Kebutuhan
        </h2>
        <div className="w-10 h-1 bg-[#A855F7] mx-auto mb-6 rounded-full" />
        <p className="text-[#A0A0B0] text-center text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-16">
          Kami menawarkan tiga pilihan paket pengiriman laut yang fleksibel —
          dari UKM hingga korporasi besar, semua terlayani dengan standar
          terbaik.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-7 flex flex-col gap-5 border transition-colors duration-200 ${
                plan.highlight
                  ? "bg-[#1A0F2E] border-[#A855F7] shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                  : "bg-[#13131F] border-[#1E1E2E] hover:border-[#A855F7]/40"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A855F7] text-white text-xs font-semibold px-4 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}

              {/* Target & Name */}
              <div>
                <p className="text-[#A0A0B0] text-xs uppercase tracking-widest mb-2">
                  {plan.target}
                </p>
                <h3 className="text-white font-bold text-2xl">{plan.name}</h3>
              </div>

              {/* Price */}
              <div>
                <p className="text-[#A855F7] font-bold text-3xl font-mono">
                  {plan.price}
                  <span className="text-[#A0A0B0] text-sm font-normal ml-1">
                    {plan.unit}
                  </span>
                </p>
                <p className="text-[#6B6B80] text-xs mt-1">{plan.note}</p>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className={`flex items-center gap-2 text-sm ${
                      feature.active ? "text-[#A0A0B0]" : "text-[#3A3A4A] line-through"
                    }`}
                  >
                    <span className={feature.active ? "text-[#22C55E]" : "text-[#3A3A4A]"}>
                      {feature.active ? "✓" : "✗"}
                    </span>
                    {feature.text}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.ctaHref}
                className={`w-full text-center text-sm font-semibold py-3 rounded-md transition-colors duration-200 ${
                  plan.highlight
                    ? "bg-[#A855F7] hover:bg-[#7C3AED] text-white"
                    : "border border-[#1E1E2E] hover:border-[#A855F7] text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}