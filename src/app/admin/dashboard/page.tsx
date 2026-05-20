"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  // State untuk trigger animasi growth (batang grafik & progress bar)
  const [animateGrowth, setAnimateGrowth] = useState(false);

  useEffect(() => {
    // Delay sedikit agar animasi pertumbuhannya terlihat setelah elemen muncul
    setTimeout(() => setAnimateGrowth(true), 400);
  }, []);

  const stats = [
    { label: "Total Pengiriman", value: "52", icon: "📦" },
    { label: "Dalam Perjalanan", value: "12", icon: "🚢" },
    { label: "Terkirim", value: "28", icon: "✅" },
    { label: "Armada Aktif", value: "8", icon: "⚓" },
  ];

  const tableData = [
    { resi: "SWB-20240001", rute: "Madura → Banyuwangi", kapal: "KM Nusantara", status: "Berlayar", badge: "bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20" },
    { resi: "SWB-20240002", rute: "Banyuwangi → Lombok", kapal: "KM Bahtera Jaya", status: "Dimuat", badge: "bg-[#F59E0B]/10 text-[#FCD34D] border border-[#F59E0B]/20" },
    { resi: "SWB-20240003", rute: "Benoa → Lombok", kapal: "KM Nusantara", status: "Terkirim", badge: "bg-[#22C55E]/10 text-[#4ADE80] border border-[#22C55E]/20" },
    { resi: "SWB-20240004", rute: "Madura → Benoa", kapal: "KM Garuda", status: "Berlayar", badge: "bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20" },
    { resi: "SWB-20240005", rute: "Gilimanuk → Benoa", kapal: "KM Tujuh Laut", status: "Dimuat", badge: "bg-[#F59E0B]/10 text-[#FCD34D] border border-[#F59E0B]/20" },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div className="flex items-center justify-between opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Dashboard Monitor</h1>
          <p className="text-[#A0A0B0] text-sm mt-1">Ringkasan aktivitas dan metrik pengiriman hari ini.</p>
        </div>
        <div className="bg-[#13131F] border border-[#1E1E2E] px-4 py-2 rounded-lg flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse-glow" />
          <span className="text-sm text-white font-medium">Sistem Online</span>
        </div>
      </div>

      {/* Kartu Statistik Atas - Animasi Zoom In Staggered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="group relative bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#A855F7]/50 hover:shadow-[0_15px_30px_rgba(168,85,247,0.15)] opacity-0 animate-zoom-in"
            style={{ animationDelay: `${0.2 + (idx * 0.1)}s` }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:text-[#A855F7] transition-all duration-500 pointer-events-none">
              {stat.icon}
            </div>
            <div className="relative z-10">
              <p className="text-[#A0A0B0] text-sm mb-2 font-medium">{stat.label}</p>
              <p className="text-4xl font-bold text-white font-mono group-hover:text-[#C084FC] transition-colors duration-300">{stat.value}</p>
            </div>
            {/* Garis Bawah Dekoratif */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#A855F7] to-[#C084FC] w-0 group-hover:w-full transition-all duration-500" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Grafik Volume per Bulan - Geser Kiri */}
        <div 
          className="bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl flex flex-col relative overflow-hidden transition-all duration-300 hover:border-[#A855F7]/30 opacity-0 animate-slide-left shadow-lg"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#A855F7]/5 blur-3xl rounded-full pointer-events-none" />
          
          <h3 className="text-white font-bold text-lg mb-6 relative z-10">Volume Pengiriman (Ribuan)</h3>
          
          <div className="flex items-end justify-between h-48 gap-3 mt-auto relative z-10 px-2">
            {[
              { m: "Jan", val: 42, h: "40%" },
              { m: "Feb", val: 50, h: "60%" },
              { m: "Mar", val: 44, h: "50%" },
              { m: "Apr", val: 51, h: "65%" },
              { m: "Mei", val: 53, h: "80%" },
            ].map((bar, idx) => (
              <div key={bar.m} className="group flex flex-col items-center flex-1 h-full justify-end cursor-default">
                {/* Tooltip Angka Muncul saat Hover */}
                <span className="text-xs font-bold text-[#C084FC] mb-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {bar.val}k
                </span>
                {/* Batang Grafik Tumbuh */}
                <div 
                  className="w-full max-w-[40px] bg-gradient-to-t from-[#7C3AED] to-[#C084FC] rounded-t-md transition-all duration-1000 ease-out group-hover:shadow-[0_0_15px_rgba(168,85,247,0.6)]" 
                  style={{ height: animateGrowth ? bar.h : '0%' }}
                />
                <span className="text-[11px] uppercase tracking-wider text-[#6B6B80] mt-3 group-hover:text-white transition-colors duration-300">{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Saat Ini - Geser Kanan */}
        <div 
          className="bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl opacity-0 animate-slide-right shadow-lg transition-all duration-300 hover:border-[#A855F7]/30"
          style={{ animationDelay: "0.5s" }}
        >
          <h3 className="text-white font-bold text-lg mb-8">Distribusi Status</h3>
          <div className="space-y-5">
            {[
              { label: "Terkirim", val: 28, color: "bg-gradient-to-r from-[#22C55E] to-[#4ADE80]", w: "80%" },
              { label: "Dalam Perjalanan", val: 12, color: "bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]", w: "40%" },
              { label: "Dimuat di Pelabuhan", val: 7, color: "bg-gradient-to-r from-[#F59E0B] to-[#FCD34D]", w: "25%" },
              { label: "Diproses Admin", val: 5, color: "bg-gradient-to-r from-[#6B7280] to-[#9CA3AF]", w: "15%" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 group cursor-default">
                <span className="w-32 text-sm text-[#A0A0B0] group-hover:text-white transition-colors duration-300">{stat.label}</span>
                <div className="flex-1 h-2.5 bg-[#1E1E2E] rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${stat.color} rounded-full transition-all duration-1000 ease-out group-hover:brightness-125`} 
                    style={{ width: animateGrowth ? stat.w : '0%' }}
                  />
                </div>
                <span className="w-8 text-right text-sm font-bold font-mono text-[#C084FC] group-hover:scale-110 transition-transform duration-300">
                  {stat.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabel Pengiriman Terkini - Masuk dari Bawah */}
      <div 
        className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 mt-6 shadow-lg opacity-0 animate-fade-in-up"
        style={{ animationDelay: "0.7s" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-bold text-lg">Pengiriman Terkini</h3>
          <button className="text-sm text-[#A855F7] hover:text-[#C084FC] hover:underline font-medium transition-colors">Lihat Semua →</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 whitespace-nowrap">
            <thead>
              <tr className="border-b-2 border-[#1E1E2E] text-[#6B6B80] uppercase tracking-wider text-xs">
                <th className="pb-4 font-semibold px-4">Nomor Resi</th>
                <th className="pb-4 font-semibold px-4">Rute Pengiriman</th>
                <th className="pb-4 font-semibold px-4">Armada Kapal</th>
                <th className="pb-4 font-semibold px-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-[#A0A0B0]">
              {tableData.map((row, idx) => (
                <tr key={idx} className="border-b border-[#1E1E2E]/50 transition-colors duration-200 hover:bg-[#1A1A24] cursor-default group">
                  <td className="py-4 px-4 font-mono font-bold text-white group-hover:text-[#A855F7] transition-colors duration-200">
                    {row.resi}
                  </td>
                  <td className="py-4 px-4 flex items-center gap-2">
                    <span className="text-white font-medium">{row.rute.split(" → ")[0]}</span>
                    <span className="text-[#6B6B80]">→</span>
                    <span className="text-white font-medium">{row.rute.split(" → ")[1]}</span>
                  </td>
                  <td className="py-4 px-4 group-hover:text-white transition-colors duration-200">{row.kapal}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1.5 rounded-md text-xs font-bold tracking-wide shadow-sm flex items-center gap-2 w-max ${row.badge}`}>
                      {/* Titik indikator khusus status berlayar */}
                      {row.status === "Berlayar" && <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-pulse-glow" />}
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}