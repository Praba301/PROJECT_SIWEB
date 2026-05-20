const misiList = [
  "Menyediakan layanan pengiriman laut yang andal, tepat waktu, dan transparan dengan teknologi tracking realtime untuk setiap kargo.",
  "Membangun ekosistem logistik terintegrasi dari pelabuhan ke pintu, mencakup armada kapal, pergudangan, dan distribusi last-mile.",
  "Mengutamakan keselamatan armada dan keamanan kargo dengan standar internasional IMO serta asuransi penuh untuk setiap pengiriman.",
  "Mendukung pertumbuhan UKM dan industri nasional melalui harga kompetitif, fleksibilitas layanan, dan kemitraan jangka panjang.",
  "Berkomitmen pada pelayaran ramah lingkungan dengan investasi berkelanjutan pada teknologi kapal hemat bahan bakar dan pengurangan emisi karbon.",
];

export default function VisiMisiSection() {
  return (
    <section id="visi-misi" className="bg-[#0A0A12] py-24 px-6 relative overflow-hidden">
      
      {/* Background Ornamen Halus */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A855F7]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Header - Masuk dari bawah */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-[#A855F7] text-sm font-mono text-center mb-3 uppercase tracking-widest flex justify-center items-center gap-2">
            <span className="w-6 h-px bg-[#A855F7]"></span> Filosofi Kami <span className="w-6 h-px bg-[#A855F7]"></span>
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">
            Visi & <span className="text-[#C084FC]">Misi</span> Praketrio
          </h2>
        </div>

        {/* Visi & Misi Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          {/* Kotak Visi - Meluncur dari Kiri */}
          <div 
            className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-10 transition-all duration-500 hover:bg-[#1A1A24] hover:border-[#A855F7]/60 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(168,85,247,0.15)] opacity-0 animate-slide-left cursor-default"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#1E1E2E] flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-[#A855F7]/20">
                🧭
              </div>
              <h3 className="text-white font-bold text-2xl tracking-wide group-hover:text-[#C084FC] transition-colors duration-300">Visi</h3>
            </div>
            
            <p className="text-white font-semibold text-lg leading-relaxed mb-6 group-hover:text-[#D1D1E0] transition-colors duration-300">
              Menjadi perusahaan logistik laut terdepan di Asia Tenggara yang
              menghubungkan setiap sudut kepulauan Indonesia dengan teknologi,
              keandalan, dan keberlanjutan.
            </p>
            <p className="text-[#A0A0B0] text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
              Kami percaya bahwa lautan bukan halangan, melainkan jalan raya
              bagi kemajuan ekonomi bangsa. Paketrio hadir untuk memastikan
              setiap barang, dari Sabang hingga Merauke, sampai tepat waktu dan
              dalam kondisi sempurna.
            </p>
          </div>

          {/* Kotak Misi - Meluncur dari Kanan */}
          <div 
            className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-10 transition-all duration-500 hover:bg-[#1A1A24] hover:border-[#A855F7]/60 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(168,85,247,0.15)] opacity-0 animate-slide-right cursor-default"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#1E1E2E] flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12 group-hover:bg-[#A855F7]/20">
                🎯
              </div>
              <h3 className="text-white font-bold text-2xl tracking-wide group-hover:text-[#C084FC] transition-colors duration-300">Misi</h3>
            </div>
            
            <ul className="flex flex-col gap-5">
              {misiList.map((misi, index) => (
                // group/item digunakan agar hover pada satu list hanya mempengaruhi elemen di dalam list tersebut
                <li key={index} className="group/item flex gap-4 p-2 -mx-2 rounded-lg transition-colors duration-200 hover:bg-[#1E1E2E]/50">
                  <span className="text-[#A855F7] font-mono font-bold text-sm shrink-0 mt-0.5 transition-all duration-300 group-hover/item:scale-125 group-hover/item:text-[#C084FC]">
                    0{index + 1}
                  </span>
                  <p className="text-[#A0A0B0] text-sm leading-relaxed transition-colors duration-300 group-hover/item:text-white/90">
                    {misi}
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}