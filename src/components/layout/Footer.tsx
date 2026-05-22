import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A12] border-t border-[#1E1E2E] py-16 px-6 relative overflow-hidden">

      {/* Ornamen glow halus */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#A855F7]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Top: Brand + Deskripsi full width */}
        <div className="mb-12">

          <h3 className="text-[#A855F7] font-bold text-xl font-mono tracking-widest uppercase mb-6">
            Praketrio
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Kolom 1 */}
            <p className="text-[#A0A0B0] text-base leading-relaxed">
              Praketrio adalah platform pelacakan pengiriman maritim terpercaya yang melayani
              bisnis Indonesia dan pasar global. Kami menghadirkan solusi logistik laut modern
              dengan teknologi tracking realtime, armada
              berkapasitas tinggi, dan jangkauan rute ke seluruh kepulauan Nusantara.
            </p>

            {/* Kolom 2 */}
            <p className="text-[#A0A0B0] text-base leading-relaxed">
              Didirikan dengan misi menjembatani konektivitas antar pulau, Praketrio berkomitmen
              menghadirkan pengiriman yang lebih cepat, lebih aman, dan lebih transparan untuk
              semua pelaku bisnis — dari skala UMKM hingga korporasi besar di seluruh Indonesia.
            </p>

            {/* Kolom 3 */}
            <p className="text-[#A0A0B0] text-base leading-relaxed">
              Dengan armada lebih dari 150+ kapal dan
              jaringan yang menjangkau 34 kota tujuan, kami memastikan setiap paket tiba tepat waktu
              dengan tingkat keberhasilan pengiriman 97.6% — karena kepercayaan Anda adalah
              prioritas utama kami.
            </p>

          </div>

          {/* Divider dekoratif */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] rounded-full mt-8" />
        </div>

        {/* Bottom: Copyright */}
        <div className="border-t border-[#1E1E2E] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6B6B80] text-xs">
            © {new Date().getFullYear()} Praketrio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-[#6B6B80] text-xs hover:text-white transition-colors duration-200">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="text-[#6B6B80] text-xs hover:text-white transition-colors duration-200">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
