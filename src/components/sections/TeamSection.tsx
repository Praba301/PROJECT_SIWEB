const team = [
  {
    name: "Capt. Tristo Thomas",
    role: "CEO & Founder",
    desc: "25+ tahun pengalaman di industri pelayaran Indonesia. Mantan Kapten Kapal niaga lintas Pasifik.",
  },
  {
    name: "Kresna Praba",
    role: "CTO",
    desc: "Arsitek sistem fleet tracking dan platform digital Paketrio. Lulusan ITB Teknik Informatika.",
  },
  {
    name: "Kevin Melvern",
    role: "Head Of Seafty",
    desc: "Sertifikasi STCW internasional. Memimpin protokol keselamatan armada dan kepatuhan IMO.",
  },
];

export default function TeamSection() {
  return (
    <section id="tim" className="bg-[#0D0D14] py-24 px-6">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-bold text-[#C084FC] text-center font-mono mb-16">
          Orang-Orang Dibalik Praketrio
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-[#13131F] border border-[#1E1E2E] rounded-xl p-8 flex flex-col gap-4 hover:border-[#A855F7]/40 transition-colors duration-200"
            >
              {/* Avatar Placeholder */}
              <div className="w-12 h-12 rounded-full bg-[#1E1E2E] border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7] font-bold text-lg font-mono">
                {member.name.charAt(0)}
              </div>

              {/* Name & Role */}
              <div>
                <h3 className="text-white font-bold text-base font-mono">
                  {member.name}
                </h3>
                <p className="text-[#A855F7] text-sm mt-1">{member.role}</p>
              </div>

              {/* Description */}
              <p className="text-[#A0A0B0] text-sm leading-relaxed">
                {member.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}