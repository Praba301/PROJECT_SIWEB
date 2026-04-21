const layanan = [
  {
    icon: "📦",
    title: "Full Container Load",
    desc: "Sewa kontainer penuh untuk pengiriman masif. Ideal untuk eksportir, importir, dan perusahaan manufaktur dengan volume besar.",
  },
  {
    icon: "🌐",
    title: "Less Container Load",
    desc: "Gabungkan kargo Anda dengan pengirim lain untuk efisiensi biaya. Cocok untuk UKM dan pengiriman regular bervolume kecil-menengah.",
  },
  {
    icon: "🚢",
    title: "Express Sea Freight",
    desc: "Pengiriman prioritas dengan jadwal keberangkatan tetap dan jaminan waktu tiba. Untuk kebutuhan kargo mendesak dengan deadline ketat.",
  },
  {
    icon: "❄️",
    title: "Reefer Cargo",
    desc: "Pengiriman kargo berpendingin untuk produk segar, farmasi, dan bahan kimia sensitif suhu dengan monitoring temperatur realtime.",
  },
  {
    icon: "🔔",
    title: "Project Cargo",
    desc: "Solusi pengiriman khusus untuk barang oversized, alat berat, dan infrastruktur industri yang membutuhkan penanganan ekstra.",
  },
  {
    icon: "🛰️",
    title: "Warehousing & Logistik",
    desc: "Layanan pergudangan terintegrasi di 12 pelabuhan utama dengan sistem manajemen inventaris dan distribusi last-mile.",
  },
];

export default function LayananSection() {
  return (
    <section id="layanan" className="bg-[#0D0D14] py-24 px-6">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
          Solusi <span className="text-[#C084FC]">Pengiriman</span> Lengkap
        </h2>
        <p className="text-[#A0A0B0] text-center text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-16">
          Kami menyediakan berbagai solusi logistik laut untuk memenuhi
          kebutuhan bisnis Anda dari skala kecil hingga industri besar.
        </p>

        {/* Grid Layanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {layanan.map((item) => (
            <div
              key={item.title}
              className="bg-[#13131F] border border-[#1E1E2E] rounded-xl p-6 flex flex-col gap-4 hover:border-[#A855F7]/40 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-[#1E1E2E] rounded-lg flex items-center justify-center text-xl">
                {item.icon}
              </div>
              <h3 className="text-white font-semibold text-base">
                {item.title}
              </h3>
              <p className="text-[#A0A0B0] text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}