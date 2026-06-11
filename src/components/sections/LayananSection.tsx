const layanan = [
  {
    icon: "📦",
    title: "Reguler",
    desc: "Pengiriman standar dengan estimasi 3-7 hari. Cocok untuk pengiriman rutin dengan volume kecil hingga menengah. Harga dasar Rp25.000/kg.",
  },
  {
    icon: "🚀",
    title: "Express",
    desc: "Pengiriman prioritas dengan estimasi 2-4 hari. Tambahan 35% dari harga dasar. Dilengkapi tracking realtime dan prioritas jadwal.",
  },
  {
    icon: "💎",
    title: "VVIP",
    desc: "Pengiriman premium tercepat dengan estimasi 1-2 hari. Tambahan 75% dari harga dasar. Dedicated account manager & asuransi penuh.",
  },
  {
    icon: "📊",
    title: "Tracking Real-time",
    desc: "Pantau posisi paket Anda secara live melalui dashboard. Notifikasi otomatis via email dan WhatsApp setiap ada update status.",
  },
  {
    icon: "🛡️",
    title: "Asuransi Pengiriman",
    desc: "Perlindungan asuransi untuk setiap paket. Reguler (max Rp10 juta), Express (max Rp50 juta), VVIP (max Rp150 juta).",
  },
  {
    icon: "🏢",
    title: "Dukungan 24/7",
    desc: "Tim customer service siap membantu Anda melalui live chat, email, atau telepon. Dukungan prioritas untuk pelanggan VVIP.",
  },
];

export default function LayananSection() {
  return (
    <section id="layanan" className="bg-[#0D0D14] py-24 px-6 relative overflow-hidden">
      
      {/* Ornamen Cahaya Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A855F7]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Header */}
        <h2 
          className="text-3xl md:text-5xl font-bold text-white text-center mb-4 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Layanan <span className="text-[#C084FC]">Pengiriman</span> Kami
        </h2>
        <p 
          className="text-[#A0A0B0] text-center text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-16 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Pilih tipe pengiriman yang sesuai dengan kebutuhan dan budget Anda.
        </p>

        {/* Grid Layanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {layanan.map((item, index) => (
            <div
              key={item.title}
              className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 hover:bg-[#1A1A24] hover:border-[#A855F7] hover:-translate-y-3 hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.25)] opacity-0 animate-fade-in-up cursor-default"
              style={{ animationDelay: `${0.3 + index * 0.15}s` }}
            >
              {/* Kotak Ikon */}
              <div className="w-14 h-14 bg-[#1E1E2E] rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:bg-[#A855F7]/20 group-hover:scale-110 group-hover:-rotate-6">
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
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}