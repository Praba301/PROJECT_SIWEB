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

  // Mengurutkan data agar Resi/Data yang terbaru masuk di paling atas (Descending)
  const sortedData = [...dataDariDatabase].sort((a, b) => {
    // Jika ada timestamp created_at di DB Neon kamu, gunakan itu, jika tidak urutkan no_resi Z-A
    if (a.created_at && b.created_at) {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return b.no_resi?.localeCompare(a.no_resi);
  });

  const dalamPerjalanan = statsData.Dimuat + statsData.Berlayar;

  // Ikon diganti dengan SVG profesional (tanpa Emoji AI)
  const stats = [
    { 
      label: "Total Pengiriman", value: totalPengiriman.toString(), 
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> 
    }, 
    { 
      label: "Dalam Perjalanan", value: dalamPerjalanan.toString(), 
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg> 
    },
    { 
      label: "Terkirim", value: statsData.Terkirim.toString(), 
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
    },
    { 
      label: "Armada Aktif", value: statsData.Berlayar.toString(), 
      icon: <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> 
    },
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

      {/* Kartu Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="group relative bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:border-[#A855F7]/50 opacity-0 animate-zoom-in" style={{ animationDelay: `${0.2 + (idx * 0.1)}s` }}>
            <div className="absolute top-0 right-0 p-4 opacity-10 text-[#A0A0B0] group-hover:text-[#A855F7] transition-all duration-500">
              {stat.icon}
            </div>
            <div className="relative z-10">
              <p className="text-[#A0A0B0] text-sm mb-2 font-medium">{stat.label}</p>
              <p className="text-4xl font-bold text-white font-sans group-hover:text-[#C084FC] transition-colors">{stat.value}</p>
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
              {sortedData.length > 0 ? (
                sortedData.map((row, idx) => (
                  <tr key={idx} className="border-b border-[#1E1E2E]/50 hover:bg-[#1A1A24]">
                    <td className="py-4 px-4 font-sans font-bold text-[#C084FC]">{row.no_resi}</td>
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