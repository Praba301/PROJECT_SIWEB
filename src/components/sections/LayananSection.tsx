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
    <section id="layanan" className="bg-[#0D0D14] py-24 px-6 relative overflow-hidden">
      
      {/* Ornamen Cahaya Background Halus di Pojok Kanan Atas */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A855F7]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Header - Masuk dengan animasi Fade In Up bertahap */}
        <h2 
          className="text-3xl md:text-5xl font-bold text-white text-center mb-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Solusi <span className="text-[#C084FC]">Pengiriman</span> Lengkap
        </h2>
        <p 
          className="text-[#A0A0B0] text-center text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-16 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Kami menyediakan berbagai solusi logistik laut untuk memenuhi
          kebutuhan bisnis Anda dari skala kecil hingga industri besar.
        </p>

        {/* Grid Layanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {layanan.map((item, index) => (
            <div
              key={item.title}
              // Container Utama Kartu dengan trigger 'group' untuk anak elemennya
              className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 hover:bg-[#1A1A24] hover:border-[#A855F7] hover:-translate-y-3 hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.25)] opacity-0 animate-fade-in-up cursor-pointer"
              // Delay dinamis agar kartu muncul bergantian dari kiri ke kanan
              style={{ animationDelay: `${0.3 + index * 0.15}s` }}
            >
              {/* Kotak Ikon: Berputar sedikit dan membesar saat di-hover */}
              <div className="w-14 h-14 bg-[#1E1E2E] rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:bg-[#A855F7]/20 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-inner">
                <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  {item.icon}
                </span>
              </div>
              
              <h3 className="text-white font-semibold text-lg transition-colors duration-300 group-hover:text-[#C084FC]">
                {item.title}
              </h3>
              
              <p className="text-[#A0A0B0] text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/90">
                {item.desc}
              </p>
              
              {/* Interaksi Mikro: Teks 'Pelajari selengkapnya' muncul bergeser saat di-hover */}
              <div className="mt-auto pt-4 flex items-center text-[#A855F7] text-sm font-semibold opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                Pelajari selengkapnya 
                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}