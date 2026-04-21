export default function AnalitikPage() {
  const dataLaporan = [
    { bulan: "Januari 2026", total: 45, terkirim: 45, onTime: "91%", onTimeColor: "text-emerald-400 bg-emerald-900/30", muatan: "4.281 Kg" },
    { bulan: "Februari 2026", total: 51, terkirim: 51, onTime: "95%", onTimeColor: "text-emerald-400 bg-emerald-900/30", muatan: "6.121 Kg" },
    { bulan: "Maret 2026", total: 54, terkirim: 54, onTime: "84%", onTimeColor: "text-emerald-400 bg-emerald-900/30", muatan: "5.130 Kg" },
    { bulan: "April 2026", total: 48, terkirim: 48, onTime: "81%", onTimeColor: "text-emerald-400 bg-emerald-900/30", muatan: "3.321 Kg" },
    { bulan: "Mei 2026", total: 56, terkirim: 56, onTime: "62%", onTimeColor: "text-amber-400 bg-amber-900/30", muatan: "7.212 Kg" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Laporan Analitik</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#15162c] border border-slate-700 p-6 rounded-xl">
          <p className="text-slate-400 text-sm mb-2">Total Muatan</p>
          <p className="text-4xl font-bold text-cyan-400">8.124</p>
          <p className="text-slate-500 text-xs mt-2">Kg Bulan ini</p>
        </div>
        <div className="bg-[#15162c] border border-slate-700 p-6 rounded-xl">
          <p className="text-slate-400 text-sm mb-2">Persentase On-Time</p>
          <p className="text-4xl font-bold text-cyan-400">91%</p>
          <p className="text-slate-500 text-xs mt-2">Dari Total Pengiriman</p>
        </div>
        <div className="bg-[#15162c] border border-slate-700 p-6 rounded-xl">
          <p className="text-slate-400 text-sm mb-2">Rata - Rata Waktu</p>
          <p className="text-4xl font-bold text-cyan-400">4.2</p>
          <p className="text-slate-500 text-xs mt-2">Hari Per Pengiriman</p>
        </div>
      </div>

      {/* Tabel Data Laporan */}
      <div className="bg-[#15162c] border border-slate-700 p-6 rounded-xl">
        <h3 className="text-white font-semibold mb-6">Laporan Data Pengiriman</h3>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-500 border-b border-slate-700">
              <th className="pb-4 font-medium">Bulan</th>
              <th className="pb-4 font-medium">Total</th>
              <th className="pb-4 font-medium">Terkirim</th>
              <th className="pb-4 font-medium">On-Time</th>
              <th className="pb-4 font-medium">Muatan</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {dataLaporan.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-800/50">
                <td className="py-4 text-cyan-400 font-medium">{row.bulan}</td>
                <td className="py-4">{row.total}</td>
                <td className="py-4">{row.terkirim}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 text-xs rounded-md ${row.onTimeColor}`}>
                    {row.onTime}
                  </span>
                </td>
                <td className="py-4 text-slate-400">{row.muatan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}