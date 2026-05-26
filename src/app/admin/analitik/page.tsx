export default function AnalitikPage() {
  const dataLaporan = [
    { bulan: "Januari 2026", total: 45, terkirim: 45, onTime: "91%", onTimeColor: "text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20", muatan: "4.281 Kg" },
    { bulan: "Februari 2026", total: 51, terkirim: 51, onTime: "95%", onTimeColor: "text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20", muatan: "6.121 Kg" },
    { bulan: "Maret 2026", total: 54, terkirim: 54, onTime: "84%", onTimeColor: "text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20", muatan: "5.130 Kg" },
    { bulan: "April 2026", total: 48, terkirim: 48, onTime: "81%", onTimeColor: "text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20", muatan: "3.321 Kg" },
    { bulan: "Mei 2026", total: 56, terkirim: 56, onTime: "62%", onTimeColor: "text-amber-400 bg-amber-400/10 border border-amber-400/20", muatan: "7.212 Kg" },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Laporan Analitik</h1>
          <p className="text-[#A0A0B0] text-sm mt-1">Performa pengiriman dan muatan armada.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#A855F7]/10 text-[#C084FC] hover:bg-[#A855F7] hover:text-white border border-[#A855F7]/50 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.15)] active:scale-95">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Unduh Laporan
        </button>
      </div>

      {/* Top Stats - Efek Zoom In Berurutan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat 1 */}
        <div 
          className="group bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-[#A855F7]/50 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:-translate-y-1 opacity-0 animate-zoom-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#A855F7]/10 blur-2xl rounded-full transition-transform duration-500 group-hover:scale-150" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <p className="text-[#A0A0B0] text-sm font-medium tracking-wide">Total Muatan</p>
            <div className="w-8 h-8 rounded-lg bg-[#A855F7]/10 flex items-center justify-center text-lg shadow-inner">📦</div>
          </div>
          <p className="text-4xl font-bold text-[#A855F7] font-sans transition-transform duration-300 origin-left group-hover:scale-105 group-hover:text-[#C084FC]">8.124</p>
          <p className="text-[#6B6B80] text-xs mt-2 flex items-center gap-1">
            <span className="text-[#22C55E]">↑ 12%</span> vs bulan lalu
          </p>
        </div>

        {/* Stat 2 */}
        <div 
          className="group bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-[#A855F7]/50 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:-translate-y-1 opacity-0 animate-zoom-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#A855F7]/10 blur-2xl rounded-full transition-transform duration-500 group-hover:scale-150" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <p className="text-[#A0A0B0] text-sm font-medium tracking-wide">Persentase On-Time</p>
            <div className="w-8 h-8 rounded-lg bg-[#A855F7]/10 flex items-center justify-center text-lg shadow-inner">⏱️</div>
          </div>
          <p className="text-4xl font-bold text-[#A855F7] font-sans transition-transform duration-300 origin-left group-hover:scale-105 group-hover:text-[#C084FC]">91%</p>
          <p className="text-[#6B6B80] text-xs mt-2">Rata-rata dari total pengiriman</p>
        </div>

        {/* Stat 3 */}
        <div 
          className="group bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:border-[#A855F7]/50 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:-translate-y-1 opacity-0 animate-zoom-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#A855F7]/10 blur-2xl rounded-full transition-transform duration-500 group-hover:scale-150" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <p className="text-[#A0A0B0] text-sm font-medium tracking-wide">Rata - Rata Waktu</p>
            <div className="w-8 h-8 rounded-lg bg-[#A855F7]/10 flex items-center justify-center text-lg shadow-inner">🚢</div>
          </div>
          <p className="text-4xl font-bold text-[#A855F7] font-sans transition-transform duration-300 origin-left group-hover:scale-105 group-hover:text-[#C084FC]">4.2</p>
          <p className="text-[#6B6B80] text-xs mt-2">Hari per pengiriman rute utama</p>
        </div>
      </div>

      {/* Tabel Data Laporan - Animasi Geser Kanan */}
      <div 
        className="bg-[#13131F] border border-[#1E1E2E] p-8 rounded-2xl shadow-lg opacity-0 animate-slide-right"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-white font-bold text-lg">Laporan Data Bulanan</h3>
          <span className="text-[#A0A0B0] text-sm bg-[#1E1E2E] px-3 py-1 rounded-full">Tahun 2026</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-[#6B6B80] border-b-2 border-[#1E1E2E] uppercase tracking-wider text-xs">
                <th className="pb-4 font-semibold px-4">Bulan</th>
                <th className="pb-4 font-semibold px-4">Total Kiriman</th>
                <th className="pb-4 font-semibold px-4">Sukses Terkirim</th>
                <th className="pb-4 font-semibold px-4">Status On-Time</th>
                <th className="pb-4 font-semibold px-4">Volume Muatan</th>
              </tr>
            </thead>
            <tbody className="text-[#A0A0B0]">
              {dataLaporan.map((row, idx) => (
                <tr 
                  key={idx} 
                  className="border-b border-[#1E1E2E]/50 transition-colors duration-200 hover:bg-[#1A1A24] cursor-default group"
                >
                  <td className="py-4 px-4 text-white font-medium transition-colors duration-200 group-hover:text-[#C084FC]">
                    {row.bulan}
                  </td>
                  <td className="py-4 px-4">{row.total} Paket</td>
                  <td className="py-4 px-4">{row.terkirim} Paket</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-md shadow-sm ${row.onTimeColor}`}>
                      {row.onTime}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#A0A0B0] font-sans group-hover:text-white transition-colors duration-200">{row.muatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}