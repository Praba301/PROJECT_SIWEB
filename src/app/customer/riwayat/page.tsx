"use client";

import { Poppins } from "next/font/google";
import CustomerNavbar from "@/components/layout/CustomerNavbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const riwayat = [
  {
    noResi: "SWB-20240001",
    rute: "Surabaya → Makassar",
    tanggal: "18 Apr 2026",
    status: "Dalam perjalanan",
  },
  {
    noResi: "SWB-20240002",
    rute: "Jakarta → Balikpapan",
    tanggal: "18 Apr 2026",
    status: "Dimuat ke kapal",
  },
  {
    noResi: "SWB-20240003",
    rute: "Makassar → Sorong",
    tanggal: "10 Apr 2026",
    status: "Terkirim",
  },
  {
    noResi: "SWB-20240004",
    rute: "Surabaya → Kupang",
    tanggal: "11 Apr 2026",
    status: "Terkirim",
  },
  {
    noResi: "SWB-20240005",
    rute: "Surabaya → Makassar",
    tanggal: "13 Apr 2026",
    status: "Terkirim",
  },
];

const statusConfig = (status: string) => {
  if (status === "Terkirim")
    return {
      color: "text-[#22C55E]",
      bg: "bg-[#22C55E]/10",
      border: "border-[#22C55E]/30",
      dot: "bg-[#22C55E]",
    };
  if (status === "Dalam perjalanan")
    return {
      color: "text-[#60A5FA]", // Biru muda
      bg: "bg-[#3B82F6]/10",
      border: "border-[#3B82F6]/30",
      dot: "bg-[#60A5FA]",
    };
  if (status === "Dimuat ke kapal")
    return {
      color: "text-[#FCD34D]", // Amber muda
      bg: "bg-[#F59E0B]/10",
      border: "border-[#F59E0B]/30",
      dot: "bg-[#FCD34D]",
    };
  return {
    color: "text-white",
    bg: "bg-[#1E1E2E]",
    border: "border-[#1E1E2E]",
    dot: "bg-[#6B6B80]",
  };
};

export default function RiwayatPage() {
  return (
    // Tambahkan flex-col di sini
    <div className={`${poppins.className} flex flex-col min-h-screen bg-[#0A0A12] relative overflow-hidden`}>
      
      {/* Panggil Navbar di paling atas */}
      <CustomerNavbar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">

        {/* Background Glow */}
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#A855F7]/10 blur-[150px] rounded-full pointer-events-none" />

        {/* Content */}
        <main className="flex-1 px-10 py-12 overflow-y-auto">

          {/* Title */}
          <div className="text-center mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-white font-bold text-3xl tracking-wide">
              Riwayat Pengiriman
            </h1>
            <p className="text-[#A0A0B0] text-sm mt-2">
              Daftar seluruh rekam jejak paket dan pengiriman kargo Anda.
            </p>
            <div className="w-12 h-1.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] mx-auto mt-4 rounded-full" />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {/* Card 1 */}
            <div 
              className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#A855F7]/50 opacity-0 animate-zoom-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#C084FC] text-[11px] uppercase tracking-widest font-bold">
                  Total Pengiriman
                </p>
                <span className="text-2xl opacity-20 group-hover:scale-110 transition-transform">📦</span>
              </div>
              <p className="text-white font-bold text-4xl font-mono">{riwayat.length}</p>
            </div>
            
            {/* Card 2 */}
            <div 
              className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#22C55E]/50 opacity-0 animate-zoom-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#22C55E] text-[11px] uppercase tracking-widest font-bold">
                  Sukses Terkirim
                </p>
                <span className="text-2xl opacity-20 group-hover:scale-110 transition-transform">✅</span>
              </div>
              <p className="text-white font-bold text-4xl font-mono">
                {riwayat.filter((r) => r.status === "Terkirim").length}
              </p>
            </div>
            
            {/* Card 3 */}
            <div 
              className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#F59E0B]/50 opacity-0 animate-zoom-in"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#FCD34D] text-[11px] uppercase tracking-widest font-bold">
                  Sedang Diproses
                </p>
                <span className="text-2xl opacity-20 group-hover:scale-110 transition-transform">⏳</span>
              </div>
              <p className="text-white font-bold text-4xl font-mono">
                {riwayat.filter((r) => r.status !== "Terkirim").length}
              </p>
            </div>
          </div>

          {/* Table Container */}
          <div 
            className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl overflow-hidden max-w-5xl mx-auto shadow-xl opacity-0 animate-fade-in-up relative z-10"
            style={{ animationDelay: "0.6s" }}
          >
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 px-6 py-4 border-b border-[#1E1E2E] bg-[#1A1A24]">
              <p className="text-[#6B6B80] font-bold text-[11px] uppercase tracking-widest">
                No Resi
              </p>
              <p className="text-[#6B6B80] font-bold text-[11px] uppercase tracking-widest">
                Rute Pengiriman
              </p>
              <p className="text-[#6B6B80] font-bold text-[11px] uppercase tracking-widest">
                Tanggal Input
              </p>
              <p className="text-[#6B6B80] font-bold text-[11px] uppercase tracking-widest md:text-center">
                Status Saat Ini
              </p>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col divide-y divide-[#1E1E2E]">
              {riwayat.map((item, index) => {
                const s = statusConfig(item.status);
                return (
                  <div
                    key={index}
                    className="group grid grid-cols-1 md:grid-cols-4 px-6 py-5 hover:bg-[#1A1A24] transition-colors duration-200 items-center cursor-default gap-y-3 md:gap-y-0"
                  >
                    <p className="text-white text-sm font-mono font-bold group-hover:text-[#C084FC] transition-colors">
                      {item.noResi}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#A0A0B0] text-sm group-hover:text-white transition-colors">{item.rute.split(" → ")[0]}</span>
                      <span className="text-[#6B6B80] text-xs">→</span>
                      <span className="text-[#A0A0B0] text-sm group-hover:text-white transition-colors">{item.rute.split(" → ")[1]}</span>
                    </div>
                    <p className="text-[#6B6B80] text-sm font-medium group-hover:text-[#A0A0B0] transition-colors">
                      {item.tanggal}
                    </p>
                    <div className="md:text-center">
                      <span
                        className={`inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-md border shadow-sm transition-transform group-hover:scale-105 ${s.color} ${s.bg} ${s.border}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${item.status !== "Terkirim" ? "animate-pulse-glow" : ""}`} />
                        {item.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
}