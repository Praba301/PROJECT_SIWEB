export default function PengirimanPage() {
  const data = [
    { resi: "PRKT-000001572", pengirim: "PT. Lancar Jaya", berat: "125 KG", eta: "22 April", status: "Berlayar", badge: "bg-blue-900/50 text-blue-400" },
    { resi: "PRKT-000001573", pengirim: "PT. MajuMundur", berat: "100 KG", eta: "25 April", status: "Berlayar", badge: "bg-amber-900/50 text-amber-400" },
    { resi: "PRKT-000001574", pengirim: "PT. Batu Zamrud", berat: "120 KG", eta: "14 April", status: "Diproses", badge: "bg-slate-700 text-slate-300", active: true },
    { resi: "PRKT-000001575", pengirim: "PT. Tokopedia", berat: "200 KG", eta: "8 April", status: "Terkirim", badge: "bg-emerald-900/50 text-emerald-400" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Data Pengiriman</h1>
      
      <div className="bg-[#15162c] border border-slate-700 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-6">Volume per bulan</h3>
        
        <div className="space-y-3">
          {/* Header Tabel Buatan (Flexbox lebih mudah untuk border glow per baris) */}
          <div className="flex text-sm text-slate-500 px-4 pb-2 border-b border-slate-700">
            <div className="flex-1">Resi</div>
            <div className="flex-1">Pengirim</div>
            <div className="w-32">Berat</div>
            <div className="w-32">ETA</div>
            <div className="w-24 text-right">Status</div>
          </div>

          {/* Baris Data */}
          {data.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-center px-4 py-4 rounded-lg text-sm transition-all ${
                item.active 
                  ? "border-2 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] bg-slate-800/50" 
                  : "border border-transparent hover:bg-slate-800/30 border-b-slate-800"
              }`}
            >
              <div className="flex-1 text-cyan-400 font-sans


">{item.resi}</div>
              <div className="flex-1 text-slate-300">{item.pengirim}</div>
              <div className="w-32 text-slate-400">{item.berat}</div>
              <div className="w-32 text-slate-400">{item.eta}</div>
              <div className="w-24 text-right">
                <span className={`px-3 py-1 rounded-full text-xs ${item.badge}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}