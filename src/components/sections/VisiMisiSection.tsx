const misiList = [
  "Menyediakan layanan pengiriman laut yang andal, tepat waktu, dan transparan dengan teknologi tracking realtime untuk setiap kargo.",
  "Membangun ekosistem logistik terintegrasi dari pelabuhan ke pintu, mencakup armada kapal, pergudangan, dan distribusi last-mile.",
  "Mengutamakan keselamatan armada dan keamanan kargo dengan standar internasional IMO serta asuransi penuh untuk setiap pengiriman.",
  "Mendukung pertumbuhan UKM dan industri nasional melalui harga kompetitif, fleksibilitas layanan, dan kemitraan jangka panjang.",
  "Berkomitmen pada pelayaran ramah lingkungan dengan investasi berkelanjutan pada teknologi kapal hemat bahan bakar dan pengurangan emisi karbon.",
];

export default function VisiMisiSection() {
  return (
    <section id="visi-misi" className="bg-[#0A0A12] py-24 px-6">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <p className="text-[#A855F7] text-sm font-mono text-center mb-3">
          // Filosofi kami
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">
          Visi & <span className="text-[#C084FC]">Misi</span> Praketrio
        </h2>

        {/* Visi & Misi Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Visi */}
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-xl p-8 hover:border-[#A855F7]/40 transition-colors duration-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🧭</span>
              <h3 className="text-white font-bold text-xl">Visi</h3>
            </div>
            <p className="text-white font-semibold text-base leading-relaxed mb-4">
              Menjadi perusahaan logistik laut terdepan di Asia Tenggara yang
              menghubungkan setiap sudut kepulauan Indonesia dengan teknologi,
              keandalan, dan keberlanjutan.
            </p>
            <p className="text-[#A0A0B0] text-sm leading-relaxed">
              Kami percaya bahwa lautan bukan halangan, melainkan jalan raya
              bagi kemajuan ekonomi bangsa. Paketrio hadir untuk memastikan
              setiap barang, dari Sabang hingga Merauke, sampai tepat waktu dan
              dalam kondisi sempurna.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-xl p-8 hover:border-[#A855F7]/40 transition-colors duration-200">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🎯</span>
              <h3 className="text-white font-bold text-xl">Misi</h3>
            </div>
            <ol className="flex flex-col gap-4">
              {misiList.map((misi, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-[#A855F7] font-mono font-bold text-sm shrink-0">
                    0{index + 1}
                  </span>
                  <p className="text-[#A0A0B0] text-sm leading-relaxed">
                    {misi}
                  </p>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}