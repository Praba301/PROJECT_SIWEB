const team = [
  {
    name: "Tristo Thomas",
    role: "CEO & Founder",
    desc: "25+ tahun pengalaman di industri pelayaran Indonesia. Mantan Kapten Kapal niaga lintas Pasifik.",
  },
  {
    name: "Kresna Praba",
    role: "CTO",
    desc: "Arsitek sistem fleet tracking dan platform digital Paketrio. Lulusan ITB Teknik Informatika.",
  },
  {
    name: "Kevin Melvern Nugroho",
    role: "Head Of Seafty",
    desc: "Sertifikasi STCW internasional. Memimpin protokol keselamatan armada dan kepatuhan IMO.",
  },
];

export default function TeamSection() {
  return (
    <section id="tim" className="bg-[#0D0D14] py-24 px-6 relative overflow-hidden">
      
      {/* Background Glow Halus di Bawah */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#A855F7]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Header - Masuk dengan animasi Fade In Up */}
        <h2 
          className="text-3xl md:text-5xl font-bold text-[#C084FC] text-center font-mono mb-16 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Orang-Orang Dibalik Praketrio
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              // Efek hover untuk kartu tim
              className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 flex flex-col gap-5 transition-all duration-500 opacity-0 animate-fade-in-up hover:bg-[#1A1A24] hover:border-[#A855F7] hover:-translate-y-3 hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.25)] cursor-default"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              {/* Avatar Placeholder - Efek terisi warna, rotasi, dan membesar */}
              <div className="w-14 h-14 rounded-full bg-[#1E1E2E] border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7] font-bold text-xl font-mono transition-all duration-500 group-hover:scale-110 group-hover:bg-[#A855F7] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:rotate-6">
                {member.name.charAt(0)}
              </div>

              {/* Name & Role */}
              <div>
                <h3 className="text-white font-bold text-lg font-mono transition-colors duration-300 group-hover:text-[#C084FC]">
                  {member.name}
                </h3>
                <p className="text-[#A855F7] text-sm mt-1 font-semibold tracking-wide">
                  {member.role}
                </p>
              </div>

              {/* Description */}
              <p className="text-[#A0A0B0] text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/90">
                {member.desc}
              </p>

              {/* Interaksi Mikro: Garis dekoratif muncul dan memanjang saat di-hover */}
              <div className="w-0 h-0.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] mt-auto transition-all duration-500 group-hover:w-16 opacity-0 group-hover:opacity-100 rounded-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}