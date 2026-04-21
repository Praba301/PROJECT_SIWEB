const stats = [
  { value: "150+", label: "Armada Kapal" },
  { value: "34", label: "Kota Tujuan" },
  { value: "97.6%", label: "On-Time" },
  { value: "12K+", label: "Pengiriman/Bulan" },
];

export default function StatsSection() {
  return (
    <section className="bg-[#0A0A12] border-t border-b border-[#1E1E2E] py-10 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center text-center"
          >
            <span className="text-4xl md:text-5xl font-bold text-[#A855F7] font-mono">
              {stat.value}
            </span>
            <span className="text-[#A0A0B0] text-sm mt-2">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}