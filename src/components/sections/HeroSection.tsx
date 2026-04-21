import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-[#0D0D14] flex flex-col justify-center pt-20 px-6">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Kiri: Teks */}
        <div className="flex-1">
          {/* Label kecil kanan atas */}
          <p className="text-[#A855F7] text-sm font-mono mb-6 md:text-right">
            Praketrio Fleet Monitor
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Kirim Lebih Jauh,{" "}
            <span className="text-[#C084FC]">Lebih Andal</span> via Laut
          </h1>

          <p className="text-[#A0A0B0] text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Praketrio menghadirkan layanan pengiriman barang melalui kapal laut
            dengan teknologi tracking realtime, rute luas ke seluruh kepulauan
            Indonesia, dan armada berkapasitas tinggi.
          </p>

          {/* Tombol */}
          <div className="flex items-center gap-4">
            <Link
              href="#pricing"
              className="bg-[#A855F7] hover:bg-[#7C3AED] text-white text-sm font-semibold px-6 py-3 rounded-md transition-colors duration-200"
            >
              Minta Penawaran
            </Link>
            <Link
              href="#layanan"
              className="border border-white/20 hover:border-white/60 text-white text-sm font-semibold px-6 py-3 rounded-md transition-colors duration-200"
            >
              Lihat Layanan
            </Link>
          </div>
        </div>

        {/* Kanan: Logo/Ilustrasi */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Praketrio Ship Logo"
              width={380}
              height={380}
              className="object-contain drop-shadow-[0_0_40px_rgba(168,85,247,0.3)]"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}