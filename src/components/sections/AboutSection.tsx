const features = [
  {
    title: "Lacak Paket Real Time",
    desc: "Pantau posisi paket Anda setiap saat dengan update lokasi langsung dari kurir di lapangan.",
  },
  {
    title: "Full Container",
    desc: "Layanan FCL dan LCL untuk kebutuhan kargo besar maupun kecil.",
  },
  {
    title: "Asuransi Kargo",
    desc: "Perlindungan penuh untuk setiap pengiriman barang Anda.",
  },
  {
    title: "Express Shipment",
    desc: "Layanan prioritas untuk pengiriman dengan tenggat waktu ketat.",
  },
];

export default function AboutSection() {
  return (
    <section id="tentang" className="bg-[#0D0D14] py-24 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#A855F7]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 items-center">

        {/* Kiri: Teks & Fitur - Tetap Sama */}
        <div className="flex-1 opacity-0 animate-slide-left">
          <p className="text-[#A855F7] text-sm font-mono mb-3 uppercase tracking-widest flex items-center gap-2">
            <span className="w-8 h-px bg-[#A855F7]"></span> Tentang Kami
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            Pengiriman Laut <br />
            <span className="text-[#C084FC]">Terpercaya</span>
          </h2>
          <p className="text-[#A0A0B0] text-base leading-relaxed mb-10 max-w-lg">
            Praketrio berdiri sejak 2011 sebagai mitra logistik laut terpercaya
            di Indonesia. Kami menghubungkan lebih dari 5 kota pelabuhan dengan armada modern, sistem tracking
            realtime, dan tim operasional berpengalaman.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-[#13131F] border border-[#1E1E2E] rounded-xl p-5 transition-all duration-300 hover:bg-[#1A1A24] hover:border-[#A855F7]/60 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(168,85,247,0.15)] cursor-default"
                style={{ animationDelay: `${0.4 + index * 0.15}s` }}
              >
                <h3 className="text-white font-semibold text-sm mb-2 transition-colors duration-300 group-hover:text-[#C084FC] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3A3A4A] group-hover:bg-[#A855F7] transition-colors duration-300" />
                  {feature.title}
                </h3>
                <p className="text-[#A0A0B0] text-xs leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Kanan: Company Impact & Milestones - Disesuaikan untuk "About Us" */}
        <div className="flex-1 flex flex-col gap-5 opacity-0 animate-slide-right w-full lg:max-w-lg" style={{ animationDelay: "0.2s" }}>
          
          {/* Widget 1: Jejak Pertumbuhan */}
          <div className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-[#A855F7]/50 hover:shadow-[0_15px_30px_rgba(168,85,247,0.15)]">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#A855F7]/20 blur-3xl rounded-full transition-transform duration-500 group-hover:scale-150"></div>
             
             <div className="flex justify-between items-center mb-6 relative z-10">
               <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C084FC] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A855F7]"></span>
                  </span>
                  <span className="text-white font-bold text-sm tracking-wide">Milestone Perusahaan</span>
               </div>
               <span className="text-[#C084FC] text-xs font-bold px-3 py-1 bg-[#A855F7]/10 border border-[#A855F7]/20 rounded-full">Sejak 2011</span>
             </div>
             
             <div className="relative z-10 space-y-4">
                {/* Timeline Item 1 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#A855F7]"></div>
                    <div className="w-px h-10 bg-[#1E1E2E]"></div>
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">Berdiri di Yogyakarta</h4>
                    <p className="text-[#A0A0B0] text-xs mt-1">Memulai dengan 2 kapal kargo perintis.</p>
                  </div>
                </div>
                {/* Timeline Item 2 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C084FC]"></div>
                    <div className="w-px h-10 bg-[#1E1E2E]"></div>
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold">Ekspansi Seluruh Indonesia </h4>
                    <p className="text-[#A0A0B0] text-xs mt-1">Membuka rute reguler ke Sabang & Merauke.</p>
                  </div>
                </div>
                {/* Timeline Item 3 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full border-2 border-[#A855F7] bg-[#13131F] shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                  </div>
                  <div>
                    <p className="text-white/80 text-xs mt-1">Digitalisasi tracking dan manajemen pelabuhan.</p>
                  </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
              {/* Widget 2: Ekosistem Hijau */}
              <div className="flex-1 bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-[#22C55E]/40 hover:-translate-y-1 group">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center text-xl shadow-inner border border-[#22C55E]/20 group-hover:rotate-12 transition-transform">🌱</div>
                    <div>
                       <p className="text-white text-sm font-semibold">Green Logistics</p>
                       <p className="text-[#A0A0B0] text-[10px] uppercase tracking-wider">Komitmen Kami</p>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-[#A0A0B0]">Reduksi Emisi</span>
                       <span className="text-[#22C55E] font-semibold text-xs bg-[#22C55E]/10 px-2 py-1 rounded">-15% YoY</span>
                    </div>
                    <p className="text-xs text-[#6B6B80] leading-snug">Menuju standar pelayaran nol karbon pada tahun 2040.</p>
                 </div>
              </div>

              {/* Widget 3: Jaringan Klien */}
              <div className="flex-1 bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-[#3B82F6]/40 hover:-translate-y-1 group">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center text-xl shadow-inner border border-[#3B82F6]/20 group-hover:scale-110 transition-transform">🤝</div>
                    <div>
                       <p className="text-white text-sm font-semibold">Kepercayaan Klien</p>
                       <p className="text-[#A0A0B0] text-[10px] uppercase tracking-wider">Kemitraan</p>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-[#A0A0B0]">Total Mitra</span>
                       <span className="text-[#3B82F6] font-bold text-sm bg-[#3B82F6]/10 px-2 py-1 rounded">2.500+</span>
                    </div>
                    <p className="text-xs text-[#6B6B80] leading-snug">Melayani dari UKM lokal hingga korporasi multinasional.</p>
                 </div>
              </div>
          </div>

        </div>

      </div>
    </section>
  );
}