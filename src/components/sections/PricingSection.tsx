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
    <section id="pilih-paket" className="bg-[#0D0D14] py-24 px-6 relative overflow-hidden">
      
      {/* Ornamen Glow Halus di Background Tengah */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A855F7]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Header - Masuk dengan animasi Fade In Up */}
        <h2 
          className="text-3xl md:text-5xl font-bold text-white text-center mb-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Pilih <span className="text-[#C084FC]">Paket</span> Sesuai Kebutuhan
        </h2>
        <div 
          className="w-12 h-1.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] mx-auto mb-6 rounded-full opacity-0 animate-fade-in-up" 
          style={{ animationDelay: "0.2s" }}
        />
        <p 
          className="text-[#A0A0B0] text-center text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-16 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          Kami menawarkan tiga pilihan paket pengiriman laut yang fleksibel —
          dari UKM hingga korporasi besar, semua terlayani dengan standar
          terbaik.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              // Efek hover, pop-up, dan perbesaran khusus untuk paket highlight
              className={`group relative rounded-2xl p-8 flex flex-col gap-6 transition-all duration-500 opacity-0 animate-fade-in-up hover:-translate-y-3 cursor-default ${
                plan.highlight
                  ? "bg-[#1A0F2E] border-2 border-[#A855F7] shadow-[0_0_40px_rgba(168,85,247,0.25)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.4)] md:scale-105 z-10"
                  : "bg-[#13131F] border border-[#1E1E2E] hover:border-[#A855F7]/50 hover:shadow-[0_15px_35px_-5px_rgba(168,85,247,0.15)] z-0"
              }`}
              style={{ animationDelay: `${0.4 + index * 0.15}s` }}
            >
              {/* Badge dengan animasi Pulse Glow */}
              {plan.badge && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#A855F7] to-[#C084FC] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-pulse-glow">
                  {plan.badge}
                </span>
              )}

              {/* Target & Name */}
              <div>
                <p className="text-[#A0A0B0] text-xs uppercase tracking-widest mb-2 transition-colors duration-300 group-hover:text-white/80">
                  {plan.target}
                </p>
                <h3 className="text-white font-bold text-2xl transition-colors duration-300 group-hover:text-[#C084FC]">
                  {plan.name}
                </h3>
              </div>

              {/* Price - Teks Harga sedikit membesar saat di-hover */}
              <div>
                <p className="text-[#A855F7] font-bold text-4xl font-mono transition-transform duration-300 group-hover:scale-105 group-hover:text-[#C084FC] origin-left">
                  {plan.price}
                  <span className="text-[#A0A0B0] text-sm font-sans font-normal ml-1">
                    {plan.unit}
                  </span>
                </p>
                <p className="text-[#6B6B80] text-xs mt-2">{plan.note}</p>
              </div>

              {/* Features List */}
              <ul className="flex flex-col gap-3 my-2">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
                      feature.active ? "text-[#D1D1E0] group-hover:text-white" : "text-[#3A3A4A] line-through"
                    }`}
                  >
                    <span className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full ${feature.active ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#3A3A4A]/20 text-[#3A3A4A]"}`}>
                      {feature.active ? (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                      )}
                    </span>
                    {feature.text}
                  </li>
                ))}
              </ul>

              {/* CTA Button - Diubah jadi membal (active) dan membulat */}
              <Link
                href={plan.ctaHref}
                className={`mt-auto w-full text-center text-sm font-bold py-3.5 rounded-full transition-all duration-300 hover:-translate-y-1 active:scale-95 ${
                  plan.highlight
                    ? "bg-[#A855F7] hover:bg-[#9333EA] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]"
                    : "border border-[#2D1B69] hover:border-[#A855F7] hover:bg-[#A855F7]/10 text-white"
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