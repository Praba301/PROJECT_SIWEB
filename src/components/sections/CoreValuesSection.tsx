const values = [
  {
    icon: "⚓",
    title: "Integritas",
    desc: "Jujur dan bertanggung jawab dalam setiap transaksi.",
  },
  {
    icon: "🚀",
    title: "Inovasi",
    desc: "Terus berinovasi untuk solusi logistik terbaik.",
  },
  {
    icon: "🤝",
    title: "Kemitraan",
    desc: "Tumbuh bersama mitra dan pelanggan kami.",
  },
  {
    icon: "🛡️",
    title: "Keselamatan",
    desc: "Safety First di setiap pelayaran dan operasi.",
  },
  {
    icon: "🌿",
    title: "Keberlanjutan",
    desc: "Pelayaran hijau untuk generasi mendatang.",
  },
];

export default function CoreValuesSection() {
  return (
    <section className="bg-[#0A0A12] pb-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header - Masuk dengan efek Fade In Up dengan garis dekoratif */}
        <p 
          className="text-[#A855F7] text-sm font-mono text-center mb-10 tracking-widest uppercase opacity-0 animate-fade-in-up flex items-center justify-center gap-4"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#A855F7]"></span>
          Nilai Inti Perusahaan
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#A855F7]"></span>
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {values.map((value, index) => (
            <div
              key={value.title}
              // Efek pop-up membal, hover angkat ke atas, dan bayangan glow
              className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:bg-[#1A1A24] hover:border-[#A855F7]/60 hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(168,85,247,0.2)] opacity-0 animate-zoom-in cursor-default"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              {/* Ikon Container - Efek membesar dan miring saat dihover */}
              <div className="w-14 h-14 rounded-full bg-[#1E1E2E] flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#A855F7]/20 group-hover:-rotate-6">
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {value.icon}
                </span>
              </div>
              
              <h3 className="text-[#C084FC] font-semibold text-base transition-colors duration-300 group-hover:text-[#D8B4FE]">
                {value.title}
              </h3>
              
              <p className="text-[#A0A0B0] text-xs leading-relaxed transition-colors duration-300 group-hover:text-white/90">
                {value.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}