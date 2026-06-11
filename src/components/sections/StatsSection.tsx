const stats = [
  { value: "8+", label: "Armada Kapal" },
  { value: "5", label: "Kota Tujuan" },
  { value: "97.6%", label: "On-Time" },
  { value: "12K+", label: "Pengiriman/Bulan" },
];

export default function StatsSection() {
  return (
    <section className="bg-[#0A0A12] border-y border-[#1E1E2E] py-12 px-6 relative overflow-hidden shadow-2xl z-20">
      
      {/* Ornamen garis cahaya tipis melintang di tengah untuk memberi dimensi */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#A855F7]/20 to-transparent -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            // Menerapkan efek pop-up membal yang sudah kita buat di globals.css (animate-zoom-in).
            // Menggunakan opacity-0 agar mulus, dan mengatur delay berdasarkan urutan index agar munculnya berurutan (staggered).
            // Juga ditambahkan efek hover melayang (-translate-y-2) dan skala membesar sedikit.
            className="group flex flex-col items-center justify-center text-center p-4 rounded-2xl transition-all duration-300 hover:bg-[#13131F] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:border hover:border-[#2D1B69] opacity-0 animate-zoom-in"
            style={{ 
              animationDelay: `${0.2 + (index * 0.15)}s`, // Kotak 1: 0.2s, Kotak 2: 0.35s, dst
              border: '1px solid transparent' // Menjaga tata letak agar tidak lompat saat border muncul pas hover
            }}
          >
            <span className="text-4xl md:text-5xl font-bold text-[#A855F7] font-mono transition-transform duration-300 group-hover:scale-110 group-hover:text-[#C084FC] group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">
              {stat.value}
            </span>
            <span className="text-[#A0A0B0] text-sm mt-3 transition-colors duration-300 group-hover:text-white font-medium tracking-wide">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}