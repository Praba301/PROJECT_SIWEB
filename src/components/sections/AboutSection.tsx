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
    <section id="tentang" className="bg-[#0D0D14] py-24 px-6">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-16 items-start">

        {/* Kiri: Teks & Fitur */}
        <div className="flex-1">
          <p className="text-[#A855F7] text-sm font-mono mb-3">// Tentang kami</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            Pengiriman Laut <br />
            <span className="text-[#C084FC]">Terpercaya</span>
          </h2>
          <p className="text-[#A0A0B0] text-base leading-relaxed mb-10 max-w-lg">
            Paketrio berdiri sejak 2011 sebagai mitra logistik laut terpercaya
            di Indonesia. Kami menghubungkan lebih dari 34 kota pelabuhan dari
            Sabang hingga Merauke dengan armada modern, sistem tracking
            realtime, dan tim operasional berpengalaman.
          </p>

          {/* Grid Fitur */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-[#13131F] border border-[#1E1E2E] rounded-xl p-5 hover:border-[#A855F7]/40 transition-colors duration-200"
              >
                <h3 className="text-white font-semibold text-sm mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#A0A0B0] text-xs leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Kanan: Terminal Card */}
        <div className="flex-1 flex flex-col gap-4 font-mono text-sm">
          {/* Terminal 1 */}
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-xl p-5">
            <p className="text-[#6B6B80] mb-3">$./ track --ship KRI-NUSANTARA-07</p>
            <p className="text-white">
              ✓ Status:{" "}
              <span className="text-[#A855F7]">AKTIF – Laut Jawa</span>
            </p>
            <p className="text-white">✓ Kecepatan: 14.2 knot</p>
            <p className="text-white">
              ✓ Muatan:{" "}
              <span className="text-[#A855F7]">87% kapasitas</span>
            </p>
            <p className="text-white">✓ ETA Surabaya: 18 Apr 06:30</p>
          </div>

          {/* Terminal 2 */}
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-xl p-5">
            <p className="text-[#6B6B80] mb-3">$./ weather --route JKT-SBY</p>
            <p className="text-white">✓ Kondisi: Cerah Berawan</p>
            <p className="text-white">
              ✓ Gelombang: 0.8m –{" "}
              <span className="text-[#22C55E]">AMAN</span>
            </p>
            <p className="text-white">
              ⚠{" "}
              <span className="text-[#F97316]">
                Angin Timur 22 km/h di Selat Madura
              </span>
            </p>
          </div>

          {/* Terminal 3 */}
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-xl p-5">
            <p className="text-[#6B6B80] mb-3">$./ fleet --status summary</p>
            <p className="text-white">✓ Kapal Aktif: 142/150</p>
            <p className="text-white">✓ Dalam Perbaikan: 8</p>
            <p className="text-white">
              ✓ Uptime Sistem:{" "}
              <span className="text-[#A855F7]">99.97%</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}