export default function DashboardPage() {
  const stats = [
    { label: "Total Pengiriman", value: "52" },
    { label: "Dalam Perjalanan", value: "12" },
    { label: "Terkirim", value: "28" },
    { label: "Armada Aktif", value: "8" },
  ];

  // Data resi sudah diperbarui sesuai format SWB dan berjumlah 5
  const tableData = [
    { resi: "SWB-20240001", rute: "Madura → Banyuwangi", kapal: "KM Nusantara", status: "Berlayar", badge: "bg-blue-900/50 text-blue-400" },
    { resi: "SWB-20240002", rute: "Banyuwangi → Lombok", kapal: "KM Bahtera Jaya", status: "Dimuat", badge: "bg-amber-900/50 text-amber-400" },
    { resi: "SWB-20240003", rute: "Benoa → Lombok", kapal: "KM Nusantara", status: "Terkirim", badge: "bg-emerald-900/50 text-emerald-400" },
    { resi: "SWB-20240004", rute: "Madura → Benoa", kapal: "KM Garuda", status: "Berlayar", badge: "bg-blue-900/50 text-blue-400" },
    { resi: "SWB-20240005", rute: "Gilimanuk → Benoa", kapal: "KM Tujuh Laut", status: "Dimuat", badge: "bg-amber-900/50 text-amber-400" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard Monitor</h1>

      {/* Kartu Statistik Atas */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#15162c] border border-slate-700 p-6 rounded-xl shadow-lg">
            <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Grafik Volume per Bulan */}
        <div className="bg-[#15162c] border border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.15)] p-6 rounded-xl flex flex-col">
          <h3 className="text-white font-semibold mb-2">Volume per bulan</h3>
          <div className="flex items-end justify-between h-48 gap-4 mt-auto">
            {[
              { m: "Januari", val: 42, h: "40%" },
              { m: "Februari", val: 50, h: "60%" },
              { m: "Maret", val: 44, h: "50%" },
              { m: "April", val: 51, h: "65%" },
              { m: "Mei", val: 53, h: "80%" },
            ].map((bar) => (
              <div key={bar.m} className="flex flex-col items-center flex-1 h-full justify-end">
                <span className="text-xs text-slate-400 mb-2">{bar.val}</span>
                <div className="w-full bg-[#3b82f6] rounded-t-md" style={{ height: bar.h }}></div>
                <span className="text-xs text-slate-400 mt-2">{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Saat Ini */}
        <div className="bg-[#15162c] border border-slate-700 p-6 rounded-xl">
          <h3 className="text-white font-semibold mb-6">Status saat ini</h3>
          <div className="space-y-4">
            {[
              { label: "Terkirim", val: 28, color: "bg-emerald-400", w: "80%" },
              { label: "Perjalanan", val: 12, color: "bg-blue-400", w: "40%" },
              { label: "Dimuat", val: 7, color: "bg-amber-400", w: "25%" },
              { label: "Diproses", val: 5, color: "bg-slate-300", w: "15%" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <span className="w-24 text-sm text-slate-400">{stat.label}</span>
                <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${stat.color}`} style={{ width: stat.w }}></div>
                </div>
                <span className="text-sm font-mono text-cyan-400">{stat.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabel Volume per Bulan */}
      <div className="bg-[#15162c] border border-slate-700 rounded-xl p-6 mt-6">
        <h3 className="text-white font-semibold mb-6">Volume per bulan</h3>
        <table className="w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-700 text-slate-500">
              <th className="pb-3 font-medium">Resi</th>
              <th className="pb-3 font-medium">Rute</th>
              <th className="pb-3 font-medium">Kapal</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="py-4 text-cyan-400 font-mono">{row.resi}</td>
                <td className="py-4">{row.rute}</td>
                <td className="py-4 text-slate-400">{row.kapal}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.badge}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}