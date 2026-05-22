"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FleetClient({ dataDariDatabase }: { dataDariDatabase: any[] }) {
  const [activeTab, setActiveTab] = useState('peta');

  // STATE MANAGEMENT CONTROL
  const [selectedArmadaShip, setSelectedArmadaShip] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);
  const [selectedShip, setSelectedShip] = useState<any | null>(null);
  const [showInvestigasi, setShowInvestigasi] = useState(false);

  // DATA PARSING & GENERASI RADAR OTOMATIS BERDASARKAN DATABASE NEON
  const capitanoFallback = ["Capt. Aris Setiawan", "Capt. Budi Hartono", "Capt. Dodi Pradipta", "Capt. Hendi Pratama", "Capt. Yusuf Mansur"];
  
  const ships = (dataDariDatabase || []).map((row, idx) => {
    // Algoritma sebaran titik koordinat estetik di atas kanvas peta Indonesia
    const topPositions = ["48%", "58%", "42%", "64%", "52%"];
    const leftPositions = ["35%", "28%", "48%", "56%", "40%"];
    const speeds = row.status_kargo === "Berlayar" ? "17.2" : row.status_kargo === "Terkirim" ? "0.0" : "12.4";
    const courses = ["245", "180", "090", "320", "115"];
    const colors = ["#A855F7", "#3B82F6", "#F59E0B", "#EF4444", "#10B981"];

    const dateObj = new Date(row.tanggal_transaksi);
    const waktuTercatat = isNaN(dateObj.getTime()) ? "12:00 Z" : `${dateObj.getHours()}:${dateObj.getMinutes()} Z`;

    return {
      id: row.kode_kapal || `IMO-928012${idx}`,
      name: row.nama_kapal || "Manifes Tanpa Kapal",
      type: row.jenis_kapal || "Kapal Kargo Umum",
      lat: row.status_kargo === "Terkirim" ? "07°12'S" : "05°45'S",
      lng: row.status_kargo === "Terkirim" ? "112°44'E" : "106°50'E",
      speed: speeds,
      course: courses[idx % courses.length],
      departed: waktuTercatat,
      port1: row.kota_asal || "Jakarta",
      eta: "Rampung",
      port2: row.kota_tujuan || "Surabaya",
      top: topPositions[idx % topPositions.length],
      left: leftPositions[idx % leftPositions.length],
      color: colors[idx % colors.length],
      statusKargo: row.status_kargo || "Diproses",
      resi: row.no_resi || "SWB-INTERNAL",
      pengirim: row.nama_customer || "Umum",
      berat: `${row.berat_total || 0} KG`
    };
  });

  // FILTER LOG PERJALANAN DIGITAL BERDASARKAN MANIFES ASLI DB
  const logs = ships.map((ship, idx) => {
    const statusColors: Record<string, string> = {
      "Berlayar": "text-[#60A5FA]",
      "Dimuat": "text-[#FCD34D]",
      "Diproses": "text-[#9CA3AF]",
      "Terkirim": "text-[#4ADE80]"
    };
    return {
      waktu: `2026-05-22 08:${30 + idx}:12`,
      id: ship.id,
      koor: `${ship.lat} ${ship.lng}`,
      kejadian: ship.statusKargo === "Berlayar" ? `Armada sedang memproses rute pelayaran resi ${ship.resi}` : `Kapal bersiap/sandar memuat muatan kargo milik ${ship.pengirim}`,
      status: ship.statusKargo.toUpperCase(),
      color: statusColors[ship.statusKargo] || "text-white"
    };
  });

  // STATE UNTUK TAB PERINGATAN (Otomatis mendeteksi kargo bermasalah/perlu perhatian)
  const alertShips = ships.filter(s => s.statusKargo === "Diproses" || s.statusKargo === "Dimuat");

  const [peringatanList, setPeringatanList] = useState<any[]>([]);
  const [selesaiCount, setSelesaiCount] = useState(4);

  useEffect(() => {
    const list = alertShips.map((ship, idx) => ({
      id: idx + 1,
      nama: ship.name,
      desc: `Manifes Kargo nomor resi ${ship.resi} saat ini tertahan di area ${ship.port1} dengan status operasional awal [${ship.statusKargo}]. Butuh kalibrasi manifes logistik.`,
      waktu: '2026-05-22 14:15:00',
      tingkat: ship.statusKargo === 'Diproses' ? 'Tinggi' : 'Sedang',
      colorBg: ship.statusKargo === 'Diproses' ? 'border-red-500/50' : 'border-orange-500/50',
      colorIcon: ship.statusKargo === 'Diproses' ? 'text-red-500' : 'text-orange-400',
      icon: ship.statusKargo === 'Diproses' ? '⚠' : '🔧',
      bgBadge: ship.statusKargo === 'Diproses' ? 'bg-red-500/20' : 'bg-orange-500/20',
      textBadge: ship.statusKargo === 'Diproses' ? 'text-red-400' : 'text-orange-400'
    }));
    setPeringatanList(list);
  }, [dataDariDatabase]);

  const handleTandaiSelesai = (id: number) => {
    setPeringatanList(prev => prev.filter(item => item.id !== id));
    setSelesaiCount(prev => prev + 1);
  };

  const handleDownloadPDF = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `LAPORAN MONITORING FLEET SHIPPER NEON\n` +
      `----------------------------------------\n` +
      `Total Manifes Kapal Terdata: ${ships.length}\n` +
      `Status Alur Operasional: Terkoneksi Sinkron dengan Data Admin`
    ], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Laporan_Sistem_Fleet.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-[#0A0A12] text-white font-mono relative overflow-x-hidden selection:bg-[#A855F7]/30">
      
      {/* MODAL TRANSMISI LOG ARMADA */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div className="bg-[#13131F] border border-[#A855F7]/50 p-8 rounded-2xl w-full max-w-lg shadow-[0_0_40px_rgba(168,85,247,0.2)] animate-scale-up">
                <div className="flex justify-between items-center mb-6 border-b border-[#1E1E2E] pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3"><span className="animate-pulse text-[#C084FC]">📡</span> TRANSMISI LOG</h3>
                    <button onClick={() => setSelectedLog(null)} className="text-[#6B6B80] hover:text-white text-2xl transition-colors">✕</button>
                </div>
                <div className="space-y-4 text-sm mb-8">
                    <div className="flex justify-between items-center border-b border-[#1E1E2E] pb-3">
                        <span className="text-[#6B6B80] tracking-widest text-[10px]">IMO REGISTRASI</span>
                        <span className={`font-bold px-3 py-1 bg-[#0A0A12] rounded border border-[#1E1E2E] ${selectedLog.color}`}>{selectedLog.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1E1E2E] pb-3">
                        <span className="text-[#6B6B80] tracking-widest text-[10px]">WAKTU TRACKING</span>
                        <span className="text-white font-bold">{selectedLog.waktu}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1E1E2E] pb-3">
                        <span className="text-[#6B6B80] tracking-widest text-[10px]">ZONA KOORDINAT</span>
                        <span className="text-[#60A5FA] font-bold">{selectedLog.koor}</span>
                    </div>
                    <div className="bg-[#0A0A12] p-5 rounded-xl border border-[#1E1E2E] mt-6 shadow-inner">
                        <span className="text-[#6B6B80] tracking-widest text-[10px] block mb-2">AKTIVITAS MANIFES LOGISTIK</span>
                        <p className="text-sm text-slate-300 leading-relaxed">{selectedLog.kejadian}</p>
                        <p className={`mt-4 text-xs font-bold tracking-widest ${selectedLog.color}`}>[{selectedLog.status}]</p>
                    </div>
                </div>
                <button onClick={() => setSelectedLog(null)} className="w-full py-3 bg-[#A855F7] hover:bg-[#9333EA] text-white rounded-xl font-bold transition-all">TUTUP TRANSMISI</button>
            </div>
        </div>
      )}

      {/* MODAL INVESTIGASI PETA */}
      {showInvestigasi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div className="bg-[#13131F] border border-red-500/50 p-8 rounded-2xl w-full max-w-2xl shadow-[0_0_50px_rgba(239,68,68,0.2)] animate-scale-up">
                <div className="flex justify-between items-center mb-8 border-b border-[#1E1E2E] pb-4">
                    <h3 className="text-2xl font-bold text-red-500 flex items-center gap-3">⚠ FORM INVESTIGASI RADAR ARMADA</h3>
                    <button onClick={() => setShowInvestigasi(false)} className="text-[#6B6B80] hover:text-white text-2xl transition-colors">✕</button>
                </div>
                <div className="space-y-6 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0A0A12] p-4 rounded-xl border border-[#1E1E2E]">
                            <p className="text-[#6B6B80] text-[11px] mb-1 tracking-widest">STATUS TOTAL PERINGATAN</p>
                            <p className="font-bold text-white text-lg">{peringatanList.length} Unit Aktif</p>
                        </div>
                        <div className="bg-[#0A0A12] p-4 rounded-xl border border-[#1E1E2E]">
                            <p className="text-[#6B6B80] text-[11px] mb-1 tracking-widest">KAPAL DALAM ANTRIAN</p>
                            <p className="font-bold text-[#F59E0B] text-lg">{alertShips[0]?.name || "Tidak ada"}</p>
                        </div>
                    </div>
                    <div className="bg-[#0A0A12] p-6 rounded-xl border border-[#1E1E2E]">
                        <p className="text-[#6B6B80] text-[11px] mb-3 tracking-widest">DESKRIPSI INTEGRASI MANIFES</p>
                        <p className="text-[#A0A0B0] leading-relaxed">Sistem mendeteksi kapal berstatus <span className="text-yellow-400 font-bold">Diproses/Dimuat</span> di panel admin memerlukan tindakan penugasan rute pelayaran agar titik koordinat di radar satelit bergerak ke status Optimal.</p>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* NAVBAR ATAS */}
      <nav className="border-b border-[#1E1E2E] flex justify-between items-center px-8 py-5 bg-[#0A0A12]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-widest text-purple-400 cursor-pointer">PRAKETRIO FLEET</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-white">Praba Supriyanto</span>
            <span className="text-[10px] text-[#A855F7] tracking-widest bg-[#A855F7]/10 px-2 py-0.5 rounded border border-[#A855F7]/30">FLEET SUPERINTENDENT</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#1E1E2E] flex items-center justify-center text-[#A855F7] font-bold border border-[#A855F7]/50">FS</div>
        </div>
      </nav>

      {/* SUB-NAVBAR TABS */}
      <div className="border-b border-[#1E1E2E] flex justify-between items-center px-8 py-0 bg-[#13131F] sticky top-[81px] z-30">
        <div className="flex gap-8 text-sm font-bold tracking-widest h-full">
          {['PETA', 'ARMADA', 'ANALISIS', 'PERINGATAN'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`py-5 transition-all duration-300 border-b-2 ${
                activeTab === tab.toLowerCase() ? 'text-[#C084FC] border-[#A855F7]' : 'text-[#6B6B80] border-transparent hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="py-3">
          <Link href="/admin/pengiriman" className="px-5 py-2 rounded-lg font-bold transition-all text-center text-xs bg-[#1A1A24] border border-[#1E1E2E] text-slate-300 hover:text-white">
            ← Panel Admin
          </Link>
        </div>
      </div>

      {/* KONTEN UTAMA */}
      <main className="p-8">
        
        {/* ================= TAB 1: PETA INTERAKTIF ================= */}
        {activeTab === 'peta' && (
          <div className="relative w-full h-[75vh] bg-[#0A0A12] border border-[#1E1E2E] rounded-2xl overflow-hidden flex items-center justify-center bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center bg-no-repeat shadow-[inset_0_0_100px_#0A0A12] animate-fade-in">
            <div className="absolute inset-0 bg-[#0A0A12]/60 pointer-events-none mix-blend-multiply" />

            <div className="absolute top-6 left-6 space-y-4 z-10">
              <div className="bg-[#0A0A12]/80 border border-[#1E1E2E] p-5 rounded-2xl backdrop-blur-md w-72 shadow-lg">
                <p className="text-[10px] text-[#C084FC] font-bold mb-4 tracking-widest">STATUS SATELIT GLOBAL</p>
                <div className="flex justify-between items-end mb-3 border-b border-[#1E1E2E] pb-3">
                  <span className="text-xs text-[#A0A0B0]">Total Armada Terkoneksi</span>
                  <span className="text-4xl text-white font-bold font-mono tracking-tighter">{ships.length}</span>
                </div>
              </div>

              {peringatanList.length > 0 && (
                <div className="bg-[#13131F]/90 border border-red-500/40 p-5 rounded-2xl backdrop-blur-md w-72 shadow-lg pointer-events-auto">
                  <p className="text-[10px] text-red-400 mb-3 tracking-widest font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> REAL-TIME PERINGATAN
                  </p>
                  <p className="text-sm text-white mb-5 leading-relaxed">Sistem mendeteksi {peringatanList.length} manifes memerlukan penanganan rute.</p>
                  <button onClick={() => setShowInvestigasi(true)} className="w-full bg-red-500/10 border border-red-500/50 hover:bg-red-500 text-red-400 hover:text-white text-[10px] py-2.5 rounded-lg font-bold tracking-widest transition-all">LIHAT INVESTIGASI</button>
                </div>
              )}
            </div>

            {/* RENDER TITIK RADAR KAPAL DARI NEON DATABASE */}
            {ships.map((ship, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedShip(ship)}
                className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 z-10 ${selectedShip?.id === ship.id ? 'ring-4 ring-white scale-125' : 'hover:scale-125'}`}
                style={{ top: ship.top, left: ship.left, backgroundColor: ship.color, boxShadow: `0 0 15px ${ship.color}` }}
              >
                <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ backgroundColor: ship.color }} />
                {selectedShip?.id === ship.id && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#0A0A12] border px-3 py-1 text-[10px] rounded-md text-white font-bold z-20 whitespace-nowrap" style={{ borderColor: ship.color }}>
                    {ship.name}
                  </div>
                )}
              </div>
            ))}

            {/* OVERLAY PANEL KANAN (DETAIL TITIK KAPAL) */}
            {selectedShip && (
              <div className="absolute top-0 right-0 h-full w-[400px] bg-[#0A0A12]/95 border-l border-[#1E1E2E] backdrop-blur-xl p-8 shadow-2xl z-20 animate-slide-left flex flex-col overflow-y-auto">
                <div className="flex justify-between items-center mb-6 shrink-0">
                  <span className="bg-[#1E1E2E] text-[10px] px-3 py-1.5 rounded-md text-white font-mono tracking-widest">{selectedShip.id}</span>
                  <button onClick={() => setSelectedShip(null)} className="text-[#6B6B80] hover:text-white hover:rotate-90 transition-all text-xl">✕</button>
                </div>
                
                <h2 className="text-2xl font-bold mb-1 tracking-wide" style={{ color: selectedShip.color }}>{selectedShip.name}</h2>
                <p className="text-xs text-[#A0A0B0] mb-6 uppercase tracking-widest">{selectedShip.type}</p>

                <div className="bg-[#13131F] border border-[#1E1E2E] p-4 rounded-xl mb-4">
                  <p className="text-[10px] text-[#6B6B80] mb-2 tracking-widest font-bold">INFO MANIFES AKTIF</p>
                  <p className="text-xs text-slate-300 mb-1">No. Resi: <span className="font-mono text-purple-400 font-bold">{selectedShip.resi}</span></p>
                  <p className="text-xs text-slate-300 mb-1">Pengirim: <span className="text-white font-medium">{selectedShip.pengirim}</span></p>
                  <p className="text-xs text-slate-300">Total Berat: <span className="text-white font-medium">{selectedShip.berat}</span></p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-[#13131F] border border-[#1E1E2E] p-4 rounded-xl">
                    <p className="text-[10px] text-[#6B6B80] mb-1 tracking-widest font-bold">STATUS KARGO</p>
                    <p className="text-sm font-bold text-white font-mono">{selectedShip.statusKargo}</p>
                  </div>
                  <div className="bg-[#13131F] border border-[#1E1E2E] p-4 rounded-xl">
                    <p className="text-[10px] text-[#6B6B80] mb-1 tracking-widest font-bold">HALUAN RADAR</p>
                    <p className="text-sm font-bold text-white font-mono">{selectedShip.course}° NORTH</p>
                  </div>
                </div>

                <p className="text-[10px] text-[#6B6B80] mb-4 tracking-widest font-bold">RUTE LOGISTIK</p>
                <div className="relative pl-6 border-l-2 border-[#1E1E2E] space-y-6 ml-2">
                  <div>
                    <p className="text-[10px] text-[#A0A0B0] mb-1 font-bold tracking-widest">ASAL MANIFES</p>
                    <p className="text-sm text-white font-medium">{selectedShip.port1}</p>
                  </div>
                  <div>
                    <p className="text-[10px] mb-1 font-bold tracking-widest" style={{ color: selectedShip.color }}>TUJUAN BONGKAR</p>
                    <p className="text-sm text-white font-medium">{selectedShip.port2}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: ARMADA (DYNAMIC CARDS) ================= */}
        {activeTab === 'armada' && (
          <div className="space-y-8 w-full max-w-7xl mx-auto animate-fade-in">
            <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-widest">MONITORING ARMADA REAL-TIME</h2>
                  <p className="text-[11px] text-[#A0A0B0] mt-1">Daftar kapal aktif terikat dengan manifes kargo database admin</p>
                </div>
                <div className="bg-[#0A0A12] border border-[#1E1E2E] px-5 py-2.5 rounded-xl flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse"></div>
                  <div className="text-[10px] text-[#6B6B80] tracking-widest">TOTAL TERCATAT<br/><span className="text-lg text-white font-bold">{ships.length} Unit</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ships.map((ship, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedArmadaShip(selectedArmadaShip === ship.id ? null : ship.id)}
                    className={`bg-[#1A1A24] border-l-4 p-6 rounded-r-2xl border-y border-r border-[#1E1E2E] transition-all duration-300 cursor-pointer ${
                      selectedArmadaShip === ship.id ? 'ring-1 ring-purple-500 shadow-xl' : 'hover:bg-[#1f1f2e]'
                    }`}
                    style={{ borderLeftColor: ship.color }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-0.5">{ship.name}</h3>
                        <p className="text-[10px] text-[#6B6B80] tracking-widest">{ship.id} // {ship.type}</p>
                      </div>
                      <span className="text-[9px] px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded font-bold uppercase">{ship.statusKargo}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                      <div>
                        <p className="text-[#6B6B80] text-[10px] mb-0.5 tracking-widest">PENANGGUNG JAWAB</p>
                        <p className="text-white font-medium">{capitanoFallback[idx % capitanoFallback.length]}</p>
                      </div>
                      <div>
                        <p className="text-[#6B6B80] text-[10px] mb-0.5 tracking-widest">RESI LOGISTIK</p>
                        <p className="text-purple-400 font-bold font-mono">{ship.resi}</p>
                      </div>
                    </div>
                    <div className="bg-[#0A0A12] p-3 rounded-xl flex justify-between items-center text-xs border border-[#1E1E2E]">
                      <div>
                        <p className="text-[#6B6B80] text-[10px] mb-0.5 tracking-widest">RUTE MANIFES</p>
                        <p className="text-slate-300 text-[11px] font-sans">{ship.port1} → {ship.port2}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TABEL LOG PERJALANAN DIGITAL */}
            <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 shadow-xl">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-lg font-bold flex items-center gap-3"><span className="text-[#A855F7]">⏱</span> MANIFES TRANSMISI RADAR GLOBAL</h2>
                <p className="text-[11px] text-[#6B6B80]">Klik baris log untuk membuka rincian enkripsi satelit</p>
              </div>
              <div className="w-full text-sm text-left">
                <div className="grid grid-cols-5 text-[#6B6B80] border-b border-[#1E1E2E] pb-4 mb-3 text-[10px] font-bold tracking-widest uppercase">
                  <div className="px-4">Waktu Transmisi</div><div>Registrasi IMO</div><div>Koordinat</div><div className="col-span-2">Aktivitas Operasional Manifes</div>
                </div>
                <div className="space-y-2">
                  {logs.map((log, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedLog(log)}
                      className={`grid grid-cols-5 py-3.5 px-4 rounded-xl border border-transparent bg-[#1A1A24] transition-all hover:border-purple-500/30 cursor-pointer ${selectedArmadaShip && selectedArmadaShip !== log.id ? 'opacity-20' : ''}`}
                    >
                      <div className="text-[#A0A0B0] font-mono text-xs flex items-center">{log.waktu}</div>
                      <div className="text-purple-400 font-bold font-mono flex items-center">{log.id}</div>
                      <div className="text-[#6B6B80] text-xs flex items-center">{log.koor}</div>
                      <div className="text-white text-xs col-span-2 flex items-center justify-between">
                        <span className="font-sans">{log.kejadian}</span>
                        <span className={`text-[10px] font-bold tracking-widest mr-2 ${log.color}`}>[{log.status}]</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ANALISIS METRIKS ================= */}
        {activeTab === 'analisis' && (
          <div className="space-y-6 w-full max-w-7xl mx-auto animate-fade-in">
            <div className="flex justify-end mb-4">
              <button onClick={handleDownloadPDF} className="bg-[#13131F] border border-[#A855F7]/50 text-[#C084FC] px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#A855F7] hover:text-white transition-all">
                UNDUH MANIFES REKAPITULASI (.TXT)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'TOTAL ARMADA TERDATA', val: ships.length, unit: 'UNIT', badge: 'STABIL', color: 'text-purple-400 bg-purple-500/10' },
                { label: 'STATUS READY BERLAYAR', val: ships.filter(s => s.statusKargo === "Berlayar").length, unit: 'ARMADA', badge: 'AKTIF', color: 'text-blue-400 bg-blue-500/10' },
                { label: 'ANTRIAN LOGISTIK (PROSES)', val: alertShips.length, unit: 'MANIFES', badge: 'PENDING', color: 'text-yellow-400 bg-yellow-500/10' },
                { label: 'SUKSES TERBONGKAR (ETA)', val: ships.filter(s => s.statusKargo === "Terkirim").length, unit: 'KARGO', badge: 'SELESAI', color: 'text-green-400 bg-green-500/10' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] text-[#6B6B80] tracking-widest font-bold w-2/3">{stat.label}</p>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border border-transparent ${stat.color}`}>{stat.badge}</span>
                  </div>
                  <p className="text-3xl font-bold font-mono text-white">{stat.val} <span className="text-xs font-sans text-[#6B6B80] ml-1">{stat.unit}</span></p>
                </div>
              ))}
            </div>

            <div className="bg-[#13131F] border border-[#1E1E2E] p-8 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold tracking-widest text-white mb-6">SEBARAN VOLUME OPERASIONAL</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-bold text-[#A0A0B0] tracking-widest">RUTE SELESAI / TERKIRIM</span>
                    <span className="text-green-400 font-bold font-mono">{ships.length > 0 ? Math.round((ships.filter(s => s.statusKargo === "Terkirim").length / ships.length) * 100) : 0}%</span>
                  </div>
                  <div className="w-full bg-[#0A0A12] h-2.5 rounded-full overflow-hidden border border-[#1E1E2E]">
                    <div className="bg-green-500 h-full transition-all duration-1000" style={{ width: `${ships.length > 0 ? (ships.filter(s => s.statusKargo === "Terkirim").length / ships.length) * 100 : 0}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-bold text-[#A0A0B0] tracking-widest">RUTE AKTIF BERLAYAR</span>
                    <span className="text-blue-400 font-bold font-mono">{ships.length > 0 ? Math.round((ships.filter(s => s.statusKargo === "Berlayar").length / ships.length) * 100) : 0}%</span>
                  </div>
                  <div className="w-full bg-[#0A0A12] h-2.5 rounded-full overflow-hidden border border-[#1E1E2E]">
                    <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${ships.length > 0 ? (ships.filter(s => s.statusKargo === "Berlayar").length / ships.length) * 100 : 0}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: PERINGATAN LOGISTIK ================= */}
        {activeTab === 'peringatan' && (
          <div className="space-y-8 w-full max-w-7xl mx-auto animate-fade-in">
            <div className="flex justify-between items-end mb-6 border-b border-[#1E1E2E] pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-wide">Pusat Resolusi Manifes Kargo</h2>
                <div className="inline-block bg-red-500/10 border border-red-500/30 px-3.5 py-1.5 mt-2 rounded-md">
                  <span className="text-xs text-red-400 font-bold tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> {peringatanList.length} ATENSI AKTIF
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {peringatanList.length === 0 ? (
                <div className="text-center py-20 bg-[#13131F] border border-dashed border-[#1E1E2E] rounded-2xl">
                    <p className="font-bold text-xl text-white mb-1">Semua Manifes Optimal</p>
                    <p className="text-[#A0A0B0] text-sm">Seluruh kargo di database admin telah berjalan sesuai jalurnya.</p>
                </div>
              ) : (
                peringatanList.map((item) => (
                  <div key={item.id} className={`bg-[#13131F] border ${item.colorBg} rounded-2xl p-6 hover:bg-[#1A1A24] transition-all`}>
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                      <div className="flex gap-4 items-start">
                        <div className={`w-10 h-10 rounded-full ${item.bgBadge} flex items-center justify-center text-lg shrink-0 ${item.colorIcon}`}>{item.icon}</div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{item.nama}</h3>
                          <p className="text-xs text-[#A0A0B0] mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                      <span className={`${item.bgBadge} ${item.textBadge} border ${item.colorBg} px-3 py-1 rounded-md text-[10px] font-bold tracking-widest shrink-0 uppercase`}>{item.tingkat}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-[#1E1E2E] pt-4 mt-2">
                      <span className="text-[10px] text-[#6B6B80] font-mono border border-[#1E1E2E] px-2 py-0.5 rounded bg-[#0A0A12]">{item.waktu}</span>
                      <button onClick={() => handleTandaiSelesai(item.id)} className="bg-[#1E1E2E] hover:bg-[#A855F7] text-[#A0A0B0] hover:text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-all">
                        Sembunyikan Notifikasi ✓
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}