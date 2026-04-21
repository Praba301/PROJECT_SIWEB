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
    <section className="bg-[#0A0A12] pb-24 px-6">
      <div className="max-w-7xl mx-auto w-full">

        {/* Header */}
        <p className="text-[#A855F7] text-sm font-mono text-center mb-10 tracking-widest uppercase">
          Nilai Inti Perusahaan
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-[#13131F] border border-[#1E1E2E] rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#A855F7]/40 transition-colors duration-200"
            >
              <span className="text-3xl">{value.icon}</span>
              <h3 className="text-[#C084FC] font-semibold text-sm">
                {value.title}
              </h3>
              <p className="text-[#A0A0B0] text-xs leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}