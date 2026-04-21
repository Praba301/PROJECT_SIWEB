"use client";

import { Poppins } from "next/font/google";
import CustomerSidebar from "@/components/layout/CustomerSidebar";

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
      color: "text-[#A855F7]",
      bg: "bg-[#A855F7]/10",
      border: "border-[#A855F7]/30",
      dot: "bg-[#A855F7]",
    };
  if (status === "Dimuat ke kapal")
    return {
      color: "text-[#F97316]",
      bg: "bg-[#F97316]/10",
      border: "border-[#F97316]/30",
      dot: "bg-[#F97316]",
    };
  return {
    color: "text-white",
    bg: "bg-white/10",
    border: "border-white/20",
    dot: "bg-white",
  };
};

export default function RiwayatPage() {
  return (
    <div className={`${poppins.className} flex min-h-screen bg-[#0D0D2B]`}>
      <CustomerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="flex items-center justify-between px-10 py-5 border-b border-[#2D1B69] shadow-[0_1px_20px_rgba(168,85,247,0.08)]">
          <span className="text-white font-bold text-lg tracking-widest uppercase">
            Praketrio
          </span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#A855F7]/20 border border-[#A855F7]/40 flex items-center justify-center text-[#A855F7] text-xs font-bold">
              P
            </div>
            <span className="text-white/80 font-medium text-sm">Halo, Praba</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-10 py-8">

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-white font-bold text-2xl tracking-wide">
              Riwayat Pengiriman
            </h1>
            <p className="text-[#A0A0B0] text-sm mt-1">
              Daftar seluruh pengiriman yang pernah kamu lakukan
            </p>
            <div className="w-10 h-1 bg-[#A855F7] mx-auto mt-3 rounded-full" />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
            <div className="bg-[#13133A] border border-[#A855F7]/40 rounded-xl p-4 shadow-[0_0_20px_rgba(168,85,247,0.1)] flex flex-col gap-1">
              <p className="text-[#C084FC] text-xs uppercase tracking-widest font-semibold">
                Total Pengiriman
              </p>
              <p className="text-white font-bold text-2xl">{riwayat.length}</p>
            </div>
            <div className="bg-[#13133A] border border-[#22C55E]/40 rounded-xl p-4 shadow-[0_0_20px_rgba(34,197,94,0.1)] flex flex-col gap-1">
              <p className="text-[#22C55E] text-xs uppercase tracking-widest font-semibold">
                Terkirim
              </p>
              <p className="text-white font-bold text-2xl">
                {riwayat.filter((r) => r.status === "Terkirim").length}
              </p>
            </div>
            <div className="bg-[#13133A] border border-[#F97316]/40 rounded-xl p-4 shadow-[0_0_20px_rgba(249,115,22,0.1)] flex flex-col gap-1">
              <p className="text-[#F97316] text-xs uppercase tracking-widest font-semibold">
                Dalam Proses
              </p>
              <p className="text-white font-bold text-2xl">
                {riwayat.filter((r) => r.status !== "Terkirim").length}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#13133A] border border-[#A855F7]/40 rounded-2xl overflow-hidden max-w-4xl mx-auto shadow-[0_0_30px_rgba(168,85,247,0.15)]">

            {/* Table Header */}
            <div className="grid grid-cols-4 px-6 py-4 border-b border-[#A855F7]/20 bg-[#A855F7]/5">
              <p className="text-[#C084FC] font-semibold text-xs uppercase tracking-widest">
                No Resi
              </p>
              <p className="text-[#C084FC] font-semibold text-xs uppercase tracking-widest">
                Rute
              </p>
              <p className="text-[#C084FC] font-semibold text-xs uppercase tracking-widest">
                Tanggal
              </p>
              <p className="text-[#C084FC] font-semibold text-xs uppercase tracking-widest">
                Status
              </p>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col divide-y divide-[#A855F7]/10">
              {riwayat.map((item, index) => {
                const s = statusConfig(item.status);
                return (
                  <div
                    key={index}
                    className="grid grid-cols-4 px-6 py-4 hover:bg-[#A855F7]/5 transition-colors duration-200 items-center"
                  >
                    <p className="text-white text-sm font-mono">{item.noResi}</p>
                    <p className="text-white/80 text-sm">{item.rute}</p>
                    <p className="text-white/60 text-sm">{item.tanggal}</p>
                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${s.color} ${s.bg} ${s.border}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
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