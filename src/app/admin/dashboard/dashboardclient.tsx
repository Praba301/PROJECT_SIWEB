"use client";
import { useEffect, useState } from "react";

export default function DashboardClient({ 
  dataDariDatabase, 
  totalPengiriman,
  statsData 
}: { 
  dataDariDatabase: any[], 
  totalPengiriman: number,
  statsData: { Diproses: number, Dimuat: number, Berlayar: number, Terkirim: number }
}) {
  const [animateGrowth, setAnimateGrowth] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateGrowth(true), 400);
  }, []);

  // Angka Dinamis
  const dalamPerjalanan = statsData.Dimuat + statsData.Berlayar;

  const stats = [
    { label: "Total Pengiriman", value: totalPengiriman.toString(), icon: "📦" }, 
    { label: "Dalam Perjalanan", value: dalamPerjalanan.toString(), icon: "🚢" },
    { label: "Terkirim", value: statsData.Terkirim.toString(), icon: "✅" },
    { label: "Armada Aktif", value: statsData.Berlayar.toString(), icon: "⚓" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Dashboard Monitor</h1>
          <p className="text-[#A0A0B0] text-sm mt-1">Ringkasan data real-time dari database.</p>
        </div>
      </div>

      {/* Kartu Statistik - Otomatis Terupdate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="group relative bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:border-[#A855F7]/50 opacity-0 animate-zoom-in" style={{ animationDelay: `${0.2 + (idx * 0.1)}s` }}>
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:text-[#A855F7] transition-all duration-500">{stat.icon}</div>
            <div className="relative z-10">
              <p className="text-[#A0A0B0] text-sm mb-2 font-medium">{stat.label}</p>
              <p className="text-4xl font-bold text-white font-mono group-hover:text-[#C084FC] transition-colors">{stat.value}</p>
            </div>
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#A855F7] to-[#C084FC] w-0 group-hover:w-full transition-all duration-500" />
          </div>
        ))}
      </div>

      {/* Tabel Data Dinamis */}
      <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 mt-6 shadow-lg">
        <h3 className="text-white font-bold text-lg mb-6">Pengiriman Terkini</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead>
              <tr className="border-b border-[#1E1E2E] text-[#6B6B80] uppercase text-xs">
                <th className="pb-4 px-4">Resi</th>
                <th className="pb-4 px-4">Asal</th>
                <th className="pb-4 px-4">Tujuan</th>
                <th className="pb-4 px-4">Kapal</th>
              </tr>
            </thead>
            <tbody>
              {dataDariDatabase.length > 0 ? (
                dataDariDatabase.map((row, idx) => (
                  <tr key={idx} className="border-b border-[#1E1E2E]/50 hover:bg-[#1A1A24]">
                    <td className="py-4 px-4 font-mono font-bold text-[#C084FC]">{row.no_resi}</td>
                    <td className="py-4 px-4">{row.kota_asal}</td>
                    <td className="py-4 px-4">{row.kota_tujuan}</td>
                    <td className="py-4 px-4">{row.nama_kapal || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="py-6 text-center text-gray-500">Belum ada data.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}