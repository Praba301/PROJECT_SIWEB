"use client";

const plans = [
  {
    name: "Reguler",
    price: "Rp 25.000",
    unit: "/kg",
    note: "Pengiriman standar ikut jadwal kapal (3-7 hari)",
    highlight: false,
    badge: null,
    percentage: "0%",
    description: "Harga normal tanpa tambahan biaya",
    features: [
      { text: "Harga dasar Rp25.000/kg", active: true },
      { text: "Estimasi pengiriman 3-7 hari", active: true },
      { text: "Tracking via aplikasi & web", active: true },
      { text: "Notifikasi email & WhatsApp", active: true },
      { text: "Dukungan via live chat", active: true },
      { text: "Asuransi dasar (max Rp10 juta)", active: false },
      { text: "Prioritas jadwal", active: false },
    ],
  },
  {
    name: "Express",
    price: "Rp 33.750",
    unit: "/kg",
    note: "Prioritas dengan jadwal lebih cepat (2-4 hari)",
    highlight: true,
    badge: "Terpopuler",
    percentage: "+35%",
    description: "Tambahan 35% dari harga dasar",
    features: [
      { text: "Harga dasar Rp25.000/kg + 35%", active: true },
      { text: "Estimasi pengiriman 2-4 hari", active: true },
      { text: "Tracking via aplikasi & web", active: true },
      { text: "Notifikasi email & WhatsApp", active: true },
      { text: "Dukungan via live chat", active: true },
      { text: "Asuransi dasar (max Rp10 juta)", active: true },
      { text: "Prioritas jadwal keberangkatan", active: true },
    ],
  },
  {
    name: "VVIP",
    price: "Rp 43.750",
    unit: "/kg",
    note: "Pengiriman kilat dengan kapal cepat (1-2 hari)",
    highlight: false,
    badge: "Premium",
    percentage: "+75%",
    description: "Tambahan 75% dari harga dasar",
    features: [
      { text: "Harga dasar Rp25.000/kg + 75%", active: true },
      { text: "Estimasi pengiriman 1-2 hari", active: true },
      { text: "Tracking via aplikasi & web realtime", active: true },
      { text: "Notifikasi email & WhatsApp priority", active: true },
      { text: "Dedicated account manager", active: true },
      { text: "Asuransi penuh (max Rp150 juta)", active: true },
      { text: "Prioritas jadwal tertinggi", active: true },
      { text: "Laporan pengiriman detail", active: true },
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pilih-paket" className="bg-[#0D0D14] py-24 px-6 relative overflow-hidden">
      
      {/* Ornamen Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A855F7]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Header */}
        <h2 
          className="text-3xl md:text-5xl font-bold text-white text-center mb-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Pilih <span className="text-[#C084FC]">Tipe Paket</span> Sesuai Kebutuhan
        </h2>
        <div 
          className="w-12 h-1.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] mx-auto mb-6 rounded-full opacity-0 animate-fade-in-up" 
          style={{ animationDelay: "0.2s" }}
        />
        <p 
          className="text-[#A0A0B0] text-center text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-16 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          Kami menawarkan tiga pilihan tipe pengiriman laut yang fleksibel — mulai dari reguler hingga layanan premium VVIP untuk kebutuhan mendesak.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`group relative rounded-2xl p-8 flex flex-col gap-6 transition-all duration-500 opacity-0 animate-fade-in-up hover:-translate-y-3 cursor-default ${
                plan.highlight
                  ? "bg-[#1A0F2E] border-2 border-[#A855F7] shadow-[0_0_40px_rgba(168,85,247,0.25)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.4)] md:scale-105 z-10"
                  : "bg-[#13131F] border border-[#1E1E2E] hover:border-[#A855F7]/50 hover:shadow-[0_15px_35px_-5px_rgba(168,85,247,0.15)] z-0"
              }`}
              style={{ animationDelay: `${0.4 + index * 0.15}s` }}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#A855F7] to-[#C084FC] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-pulse-glow">
                  {plan.badge}
                </span>
              )}

              {/* Nama Paket */}
              <div className="text-center">
                <h3 className="text-white font-bold text-3xl transition-colors duration-300 group-hover:text-[#C084FC]">
                  {plan.name}
                </h3>
                {plan.percentage && (
                  <p className="text-[#A855F7] text-sm font-semibold mt-1">
                    Tambahan {plan.percentage}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="text-center">
                <p className="text-[#A855F7] font-bold text-4xl font-mono transition-transform duration-300 group-hover:scale-105 group-hover:text-[#C084FC]">
                  {plan.price}
                  <span className="text-[#A0A0B0] text-sm font-sans font-normal ml-1">
                    {plan.unit}
                  </span>
                </p>
                <p className="text-[#6B6B80] text-xs mt-2">{plan.note}</p>
                <p className="text-[#A0A0B0] text-xs mt-1">{plan.description}</p>
              </div>

              {/* Contoh Perhitungan */}
              <div className="bg-[#0A0A12] rounded-xl p-3 text-center">
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest mb-1">Contoh untuk 10 kg</p>
                <p className="text-white text-sm font-mono">
                  {plan.name === "Reguler" && "Rp 250.000"}
                  {plan.name === "Express" && "Rp 337.500"}
                  {plan.name === "VVIP" && "Rp 437.500"}
                </p>
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

              {/* Info Note */}
              <div className="mt-auto text-center pt-4 border-t border-[#1E1E2E]">
                <p className="text-[#6B6B80] text-[11px]">
                  {plan.name === "Reguler" && "Pilih di halaman dashboard setelah login"}
                  {plan.name === "Express" && "Pilih di halaman dashboard setelah login"}
                  {plan.name === "VVIP" && "Hubungi tim marketing untuk info lebih lanjut"}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}