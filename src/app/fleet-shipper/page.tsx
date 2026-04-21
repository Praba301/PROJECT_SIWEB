"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function FleetSuperintendentDashboard() {
  const [activeTab, setActiveTab] = useState('armada');

  // STATE UNTUK ARMADA (INTERAKTIF BARU)
  const [selectedArmadaShip, setSelectedArmadaShip] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  // STATE UNTUK PETA & INVESTIGASI
  const [selectedShip, setSelectedShip] = useState<any | null>(null);
  const [showInvestigasi, setShowInvestigasi] = useState(false);

  // DATA DUMMY KAPAL DI PETA
  const ships = [
    { id: 'VSL-8832', name: 'KM. NUSANTARA', type: 'Kapal Kargo Kontainer', lat: "05°45'12\" S", lng: "106°50'34\" E", speed: '18.4', course: '245', departed: '12:00 Z', port1: 'Pelabuhan Tanjung Priok', eta: '18:30 Z', port2: 'Pelabuhan Merak', top: '50%', left: '45%', color: '#b562ff' },
    { id: 'VSL-1021', name: 'KM. KRAKATAU', type: 'Kapal Kargo Curah', lat: "06°12'10\" S", lng: "105°30'15\" E", speed: '14.2', course: '180', departed: '08:00 Z', port1: 'Pelabuhan Bakauheni', eta: '14:00 Z', port2: 'Pelabuhan Merak', top: '65%', left: '25%', color: '#ef4444' },
    { id: 'VSL-9982', name: 'KM. JAYA', type: 'Kapal Tanker', lat: "03°10'05\" S", lng: "110°20'10\" E", speed: '16.0', course: '090', departed: '06:00 Z', port1: 'Pelabuhan Pontianak', eta: '20:00 Z', port2: 'Pelabuhan Tanjung Emas', top: '40%', left: '40%', color: '#00e5ff' }
  ];

  // STATE UNTUK TAB PERINGATAN
  const [peringatanList, setPeringatanList] = useState([
    { id: 1, nama: 'MV Jaya', desc: 'Keterlambatan estimasi 2 jam karena cuaca buruk di Laut Jawa Sulawesi', waktu: '2026-04-05 16:25:12', tingkat: 'Tinggi', colorBg: 'border-red-500', colorIcon: 'text-red-500', icon: '☁', bgBadge: 'bg-red-900/80', textBadge: 'text-red-300' },
    { id: 2, nama: 'MV Siliwangi', desc: 'Maintenance utama dimulai - kapal berlabuh di kepulauan Batam', waktu: '2026-04-06 12:42:26', tingkat: 'Sedang', colorBg: 'border-[#1a5cff]', colorIcon: 'text-orange-400', icon: '🔧', bgBadge: 'bg-orange-900/60', textBadge: 'text-orange-300' }
  ]);
  const [selesaiCount, setSelesaiCount] = useState(5);

  // FUNGSI TANDAI SELESAI
  const handleTandaiSelesai = (id: number) => {
    setPeringatanList(prev => prev.filter(item => item.id !== id));
    setSelesaiCount(prev => prev + 1);
  };

  // FUNGSI DOWNLOAD PDF MOCKUP
  const handleDownloadPDF = () => {
    const isConfirmed = window.confirm("Mempersiapkan Laporan PDF. Lanjutkan pengunduhan?");
    if (isConfirmed) {
      const element = document.createElement("a");
      const file = new Blob(["Laporan Analisis Fleet Praketrio\n\nTanggal: 21 April 2026\nData performa kapal dan konsumsi bahan bakar..."], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "Laporan_Analisis_Praketrio.pdf";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0813] text-[#f3f4f6] font-mono relative">
      
      {/* MODAL TRANSMISI LOG ARMADA (BARU) */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#100e23] border border-[#b562ff] p-8 rounded-2xl w-full max-w-lg shadow-[0_0_40px_rgba(181,98,255,0.3)]">
                <div className="flex justify-between items-center mb-6 border-b border-[#2a244d] pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2"><span className="animate-pulse">📡</span> TRANSMISI LOG ARMADA</h3>
                    <button onClick={() => setSelectedLog(null)} className="text-gray-400 hover:text-white text-2xl transition-colors">✕</button>
                </div>
                <div className="space-y-4 text-sm mb-8">
                    <div className="flex justify-between items-center border-b border-[#2a244d] pb-3">
                        <span className="text-gray-500 tracking-widest text-[10px]">ARMADA ID</span>
                        <span className={`font-bold px-3 py-1 bg-[#2a244d]/50 rounded ${selectedLog.color}`}>{selectedLog.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#2a244d] pb-3">
                        <span className="text-gray-500 tracking-widest text-[10px]">WAKTU TERCATAT</span>
                        <span className="text-white font-bold">{selectedLog.waktu}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#2a244d] pb-3">
                        <span className="text-gray-500 tracking-widest text-[10px]">KOORDINAT GPS</span>
                        <span className="text-[#00e5ff] font-bold">{selectedLog.koor}</span>
                    </div>
                    <div className="bg-[#0a0813] p-5 rounded-xl border border-[#2a244d] mt-6 shadow-[inset_0_0_10px_#000]">
                        <span className="text-gray-500 tracking-widest text-[10px] block mb-2">STATUS KEJADIAN / LAPORAN</span>
                        <p className="text-lg text-white leading-relaxed">{selectedLog.kejadian}</p>
                        <p className={`mt-4 text-xs font-bold tracking-widest ${selectedLog.color}`}>[{selectedLog.status}]</p>
                    </div>
                </div>
                <button onClick={() => setSelectedLog(null)} className="w-full py-3 bg-[#b562ff] hover:bg-[#9b4ae0] text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(181,98,255,0.4)] tracking-widest text-sm">TUTUP TRANSMISI</button>
            </div>
        </div>
      )}

      {/* MODAL INVESTIGASI PETA */}
      {showInvestigasi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#100e23] border-2 border-red-500 p-8 rounded-2xl w-full max-w-2xl shadow-[0_0_50px_rgba(239,68,68,0.4)]">
                <div className="flex justify-between items-center mb-8 border-b border-[#2a244d] pb-4">
                    <h3 className="text-2xl font-bold text-red-500 flex items-center gap-3"><span className="animate-pulse">⚠</span> FORM INVESTIGASI INSIDEN</h3>
                    <button onClick={() => setShowInvestigasi(false)} className="text-gray-400 hover:text-white text-2xl transition-colors">✕</button>
                </div>
                <div className="space-y-6 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0a0813] p-4 rounded-xl border border-[#2a244d]">
                            <p className="text-gray-500 text-xs mb-1">KODE ERROR</p><p className="font-bold text-white text-lg">ERR-4029</p>
                        </div>
                        <div className="bg-[#0a0813] p-4 rounded-xl border border-[#2a244d]">
                            <p className="text-gray-500 text-xs mb-1">KAPAL TERDAMPAK</p><p className="font-bold text-white text-lg">KM. KRAKATAU</p>
                        </div>
                    </div>
                    <div className="bg-[#0a0813] p-6 rounded-xl border border-[#2a244d]">
                        <p className="text-gray-500 text-xs mb-3">DESKRIPSI SISTEM</p>
                        <p className="text-gray-300 leading-relaxed">Penurunan tekanan oli pada MESIN UTAMA terdeteksi. Tekanan saat ini <span className="text-red-400 font-bold">2.1 Bar</span> (Batas Normal: 4.5 Bar). Terdapat potensi kerusakan komponen berat jika perjalanan dilanjutkan melebihi 50 NM tanpa penanganan.</p>
                    </div>
                    <div className="bg-[#0a0813] p-6 rounded-xl border border-[#2a244d]">
                        <p className="text-gray-500 text-xs mb-3">TINDAKAN DIREKOMENDASIKAN</p>
                        <ul className="list-disc pl-5 text-gray-300 space-y-2">
                            <li>Kurangi kecepatan hingga 50% (Slow Ahead).</li>
                            <li>Hubungi KKM (Kepala Kamar Mesin) untuk inspeksi visual area pompa oli.</li>
                            <li>Siapkan kapal tunda (Tugboat) di Pelabuhan Merak sebagai langkah antisipasi.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* NAVBAR ATAS */}
      <nav className="border-b border-[#2a244d] flex justify-between items-center px-8 py-4 bg-[#0a0813]">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-10" />
          <span className="text-xl font-bold tracking-widest text-white">Praketrio</span>
        </div>
        <div className="text-lg font-bold">Fleet Superintendent</div>
      </nav>

      {/* SUB-NAVBAR TABS */}
      <div className="border-b border-[#2a244d] flex justify-between items-center px-8 py-4 bg-[#100e23]">
        <div className="text-2xl font-bold text-[#b562ff] drop-shadow-[0_0_10px_rgba(181,98,255,0.5)]">
          Praketrio Fleet
        </div>
        
        <div className="flex gap-8 text-lg font-bold">
          {['ARMADA', 'PETA', 'ANALISIS', 'PERINGATAN'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`transition-all duration-300 ${activeTab === tab.toLowerCase() ? 'text-[#00e5ff] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] border-b-2 border-[#00e5ff] pb-1' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <Link href="/login" className="px-6 py-2 rounded-xl font-bold transition-all duration-300 text-center bg-transparent border-2 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.9)] text-white">
          Keluar
        </Link>
      </div>

      {/* KONTEN UTAMA */}
      <main className="p-8">
        
        {/* ================= TAB 1: ARMADA (INTERAKTIF) ================= */}
        {activeTab === 'armada' && (
          <div className="space-y-8 w-full max-w-7xl mx-auto animate-fade-in">
            {/* DAFTAR KAPAL */}
            <div className="bg-[#100e23] border border-[#2a244d] rounded-2xl p-8 shadow-[0_0_20px_rgba(181,98,255,0.1)] hover:border-[#b562ff]/30 transition-colors">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl text-gray-400 tracking-widest">DAFTAR KAPAL</h2>
                  <p className="text-[10px] text-gray-500 mt-1">Klik pada kartu kapal untuk memfilter log perjalanan</p>
                </div>
                <div className="bg-[#0a0813] border border-[#2a244d] px-4 py-2 rounded-lg flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_5px_white]"></div>
                  <div className="text-xs text-gray-400">TOTAL KAPAL AKTIF<br/><span className="text-lg text-white font-bold">24 / 28</span></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Kapal 1 */}
                <div 
                  onClick={() => setSelectedArmadaShip(selectedArmadaShip === 'VSL-992-A' ? null : 'VSL-992-A')}
                  className={`bg-[#161230] border-l-4 border-l-[#b562ff] p-6 rounded-r-xl border-y border-r border-[#2a244d] transition-all cursor-pointer ${selectedArmadaShip === 'VSL-992-A' ? 'ring-2 ring-[#b562ff] shadow-[0_0_30px_rgba(181,98,255,0.3)] scale-105 z-10' : selectedArmadaShip ? 'opacity-30 scale-95 hover:opacity-100' : 'hover:shadow-[0_0_15px_rgba(181,98,255,0.2)]'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#b562ff] mb-1">KRI BIMA SAKTI</h3>
                      <p className="text-[10px] text-gray-400">ID: VSL-992-A // KARGO CURAH</p>
                    </div>
                    <span className="text-[10px] px-3 py-1 bg-[#1a5cff]/20 text-[#66a1ff] border border-[#1a5cff] rounded">● BERLAYAR</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                    <div><p className="text-gray-500 mb-1">KAPTEN</p><p>Capt. Aris Setiawan</p></div>
                    <div><p className="text-gray-500 mb-1">KECEPATAN</p><p>18.4 KTS</p></div>
                  </div>
                  <div className="bg-[#0a0813] p-4 rounded-lg flex justify-between items-center text-xs border border-[#2a244d]">
                    <div><p className="text-gray-500 mb-1">RUTE SAAT INI</p><p>Tanjung Priok → Singapore</p></div>
                    <p className="text-gray-500">ETA: 14:30</p>
                  </div>
                </div>

                {/* Kapal 2 */}
                <div 
                  onClick={() => setSelectedArmadaShip(selectedArmadaShip === 'VSL-104-C' ? null : 'VSL-104-C')}
                  className={`bg-[#161230] border-l-4 border-l-[#b562ff] p-6 rounded-r-xl border-y border-r border-[#2a244d] transition-all cursor-pointer ${selectedArmadaShip === 'VSL-104-C' ? 'ring-2 ring-[#b562ff] shadow-[0_0_30px_rgba(181,98,255,0.3)] scale-105 z-10' : selectedArmadaShip ? 'opacity-30 scale-95 hover:opacity-100' : 'hover:shadow-[0_0_15px_rgba(181,98,255,0.2)]'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#b562ff] mb-1">PL NUSANTARA</h3>
                      <p className="text-[10px] text-gray-400">ID: VSL-104-C // KONTAINER</p></div>
                    <span className="text-[10px] px-3 py-1 bg-[#b562ff]/20 text-[#b562ff] border border-[#b562ff] rounded">⚓ DI PELABUHAN</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                    <div><p className="text-gray-500 mb-1">KAPTEN</p><p>Capt. Budi Hartono</p></div>
                    <div><p className="text-gray-500 mb-1">STATUS KARGO</p><p>Bongkar (65%)</p></div>
                  </div>
                  <div className="bg-[#0a0813] p-4 rounded-lg flex justify-between items-center text-xs border border-[#2a244d]">
                    <div><p className="text-gray-500 mb-1">LOKASI</p><p>◎ Pelabuhan Merak</p></div>
                    <p className="text-[#b562ff]">Dermaga 4</p>
                  </div>
                </div>

                {/* Kapal 3 */}
                <div 
                  onClick={() => setSelectedArmadaShip(selectedArmadaShip === 'VSL-402-M' ? null : 'VSL-402-M')}
                  className={`bg-[#161230] border-l-4 border-l-orange-500 p-6 rounded-r-xl border-y border-r border-[#2a244d] transition-all cursor-pointer ${selectedArmadaShip === 'VSL-402-M' ? 'ring-2 ring-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.3)] scale-105 z-10' : selectedArmadaShip ? 'opacity-30 scale-95 hover:opacity-100' : 'hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-orange-400 mb-1">PL GARUDA</h3>
                      <p className="text-[10px] text-gray-400">ID: VSL-402-M // TANKER</p></div>
                    <span className="text-[10px] px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500 rounded">⚠ PEMELIHARAAN</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                    <div><p className="text-gray-500 mb-1">KAPTEN</p><p>Capt. Dodi Pradipta</p></div>
                    <div><p className="text-gray-500 mb-1">ESTIMASI SELESAI</p><p className="text-orange-400">48 JAM</p></div>
                  </div>
                  <div className="bg-[#0a0813] p-4 rounded-lg flex justify-between items-center text-xs border border-red-900/50">
                    <div><p className="text-gray-500 mb-1">ISU TEKNIS</p><p className="text-orange-300">🛠 Kalibrasi Navigasi Radar</p></div>
                    <p className="text-red-500">Kritis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* LOG PERJALANAN TERBARU */}
            <div className="bg-[#100e23] border border-[#2a244d] rounded-2xl p-8 shadow-[0_0_20px_rgba(181,98,255,0.1)] hover:border-[#b562ff]/30 transition-colors">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2"><span>⏱</span> LOG PERJALANAN TERBARU</h2>
                <p className="text-[10px] text-gray-500">Klik baris log untuk membuka transmisi detail</p>
              </div>
              <div className="w-full text-sm text-left border-collapse">
                <div className="grid grid-cols-5 text-gray-500 border-b border-[#2a244d] pb-4 mb-4 text-[10px] tracking-widest uppercase">
                  <div>Waktu</div><div>Armada ID</div><div>Koordinat</div><div className="col-span-2">Kejadian / Status</div>
                </div>
                <div className="space-y-3">
                  {[
                    { waktu: '2024-05-20 08:14:22', id: 'VSL-992-A', koor: "01°16'S 103°50'E", kejadian: 'Memasuki Selat Singapura', status: 'OPTIMAL', color: 'text-gray-300' },
                    { waktu: '2024-05-20 07:45:10', id: 'VSL-104-C', koor: "05°55'S 105°59'E", kejadian: 'Sandar di Dermaga 4', status: 'SELESAI', color: 'text-[#b562ff]' },
                    { waktu: '2024-05-20 06:30:00', id: 'VSL-402-M', koor: "07°12'S 112°44'E", kejadian: 'Peringatan Sistem Radar', status: 'PERINGATAN', color: 'text-orange-400', bg: 'bg-red-900/20 border border-red-900/50 rounded-lg' },
                    { waktu: '2024-05-20 05:15:44', id: 'VSL-992-A', koor: "02°05'S 104°45'E", kejadian: 'Meninggalkan Perairan Kep. Riau', status: 'OPTIMAL', color: 'text-gray-300' },
                  ].map((log, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedLog(log)}
                      className={`grid grid-cols-5 py-4 px-4 border border-transparent border-b-[#2a244d]/50 transition-all duration-300 cursor-pointer ${log.bg || ''} ${selectedArmadaShip && selectedArmadaShip !== log.id ? 'opacity-20 grayscale scale-95 pointer-events-none' : 'hover:scale-[1.01] hover:bg-[#161230] hover:border-[#b562ff]/50 hover:shadow-[0_0_15px_rgba(181,98,255,0.1)] rounded-lg'}`}
                    >
                      <div className="text-gray-400">{log.waktu}</div>
                      <div className={`${log.color} font-bold`}>{log.id}</div>
                      <div className="text-gray-400 text-xs">{log.koor}</div>
                      <div className="text-gray-300 font-sans">{log.kejadian}</div>
                      <div className={`${log.color} text-xs tracking-widest`}>{log.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PETA INTERAKTIF ================= */}
        {activeTab === 'peta' && (
          <div className="relative w-full h-[75vh] bg-[#1a1c29] border border-[#2a244d] rounded-2xl overflow-hidden flex items-center justify-center bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center bg-no-repeat opacity-90 shadow-[inset_0_0_100px_#0a0813] animate-fade-in">
            
            {/* OVERLAY KIRI ATAS */}
            <div className="absolute top-6 left-6 space-y-4 z-10 pointer-events-none">
              <div className="bg-[#100e23]/90 border border-[#00e5ff] p-4 rounded-xl backdrop-blur-sm w-64 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <p className="text-xs text-gray-400 mb-4 tracking-widest">STATUS OPERASIONAL</p>
                <div className="flex justify-between items-end mb-2"><span className="text-sm">Total Aktif</span><span className="text-3xl text-[#00e5ff] font-bold">142</span></div>
                <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Dalam Perjalanan</span><span>118</span></div>
                <div className="flex justify-between text-xs text-gray-400"><span>Sandar</span><span>24</span></div>
              </div>
              <div className="bg-red-900/60 border border-red-500 p-4 rounded-xl backdrop-blur-md w-64 shadow-[0_0_15px_rgba(239,68,68,0.3)] pointer-events-auto">
                <p className="text-xs text-red-400 mb-4 tracking-widest font-bold flex items-center gap-2"><span className="animate-pulse">✽</span> PERINGATAN REAL-TIME</p>
                <p className="text-[10px] text-gray-300 mb-1">ERR-4029 • MESIN UTAMA</p>
                <p className="text-sm text-white mb-4">Penurunan tekanan oli terdeteksi pada KM. KRAKATAU.</p>
                <button onClick={() => setShowInvestigasi(true)} className="w-full bg-red-600 hover:bg-red-500 text-white text-xs py-3 rounded transition-all font-bold tracking-widest shadow-[0_0_10px_red]">LIHAT DETAIL</button>
              </div>
            </div>

            {/* RENDER TITIK KAPAL DI PETA */}
            {ships.map((ship) => (
              <div 
                key={ship.id}
                onClick={() => setSelectedShip(ship)}
                className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 z-0 ${selectedShip?.id === ship.id ? 'ring-4 ring-white shadow-[0_0_20px_white] scale-125' : ''} ${ship.color === '#ef4444' ? 'animate-bounce' : 'animate-pulse'}`}
                style={{ top: ship.top, left: ship.left, backgroundColor: ship.color, boxShadow: `0 0 15px ${ship.color}` }}
              >
                {selectedShip?.id === ship.id && (
                  <div className="absolute -bottom-8 -left-16 bg-[#100e23]/90 border px-2 py-1 text-[10px] rounded whitespace-nowrap z-20 text-white font-bold" style={{ borderColor: ship.color}}>
                    {ship.name} - SELECTED
                  </div>
                )}
              </div>
            ))}

            {/* OVERLAY KANAN (DETAIL KAPAL) */}
            {selectedShip && (
              <div className="absolute top-0 right-0 h-full w-96 bg-[#0f0b1f]/95 border-l border-[#2a244d] backdrop-blur-md p-6 shadow-[-10px_0_30px_rgba(0,0,0,0.6)] z-10 animate-fade-in flex flex-col overflow-y-auto">
                <div className="flex justify-between items-center mb-6 mt-2 shrink-0">
                  <span className="bg-[#2a244d] text-[10px] px-3 py-1.5 rounded text-gray-300 font-bold">ID: {selectedShip.id}</span>
                  <button onClick={() => setSelectedShip(null)} className="text-gray-400 hover:text-white hover:rotate-90 transition-all text-2xl">✕</button>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2 tracking-wide shrink-0">{selectedShip.name}</h2>
                <p className="text-sm text-gray-400 mb-8 font-sans shrink-0">{selectedShip.type}</p>

                <div className="bg-[#161230] border border-[#2a244d] p-5 rounded-2xl mb-4 shrink-0">
                  <p className="text-[11px] text-gray-500 mb-4 tracking-widest">KOORDINAT PRESISI</p>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-500 text-[11px] mb-1">LAT</p>
                      <p className="text-lg text-white font-bold">{selectedShip.lat}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[11px] mb-1">LONG</p>
                      <p className="text-lg text-white font-bold">{selectedShip.lng}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8 shrink-0">
                  <div className="bg-[#161230] border border-[#2a244d] p-5 rounded-2xl">
                    <p className="text-[11px] text-gray-500 mb-2 tracking-widest">KECEPATAN</p>
                    <p className="text-3xl font-bold text-white">{selectedShip.speed} <span className="text-[11px] text-gray-500 font-normal ml-1">KNOTS</span></p>
                  </div>
                  <div className="bg-[#161230] border border-[#2a244d] p-5 rounded-2xl">
                    <p className="text-[11px] text-gray-500 mb-2 tracking-widest">HALUAN</p>
                    <p className="text-3xl font-bold text-white">{selectedShip.course} <span className="text-[11px] text-gray-500 font-normal ml-1">DEG</span></p>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 mb-4 tracking-widest shrink-0">RUTE & ESTIMASI</p>
                <div className="relative pl-5 border-l border-[#2a244d] space-y-6 ml-2 pb-6 shrink-0">
                  <div className="relative">
                    <div className="absolute -left-[27px] top-1 w-3 h-3 border-[3px] border-gray-500 bg-[#0f0b1f] rounded-full"></div>
                    <p className="text-xs text-gray-400 mb-1 font-bold">DEPARTED {selectedShip.departed}</p>
                    <p className="text-base text-white">{selectedShip.port1}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[27px] top-1 w-3 h-3 bg-[#00e5ff] rounded-full shadow-[0_0_10px_#00e5ff]"></div>
                    <p className="text-xs text-[#00e5ff] mb-1 font-bold">ETA {selectedShip.eta}</p>
                    <p className="text-base text-white">{selectedShip.port2}</p>
                  </div>
                </div>
              </div>
            )}

            {/* LEGENDA KIRI BAWAH */}
            <div className="absolute bottom-6 left-6 bg-[#100e23]/90 border border-[#2a244d] p-4 rounded-xl backdrop-blur-sm z-10 pointer-events-none">
              <p className="text-xs font-bold mb-3">Keterangan Peta</p>
              <div className="flex gap-4 text-[10px] text-gray-400">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00e5ff]"></div> Normal</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#b562ff]"></div> Kargo</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Darurat / Peringatan</div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ANALISIS ================= */}
        {activeTab === 'analisis' && (
          <div className="space-y-6 w-full max-w-7xl mx-auto animate-fade-in">
            <div className="flex justify-end mb-4">
              <button onClick={handleDownloadPDF} className="bg-[#b562ff] text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#9b4ae0] transition-all shadow-[0_0_15px_rgba(181,98,255,0.4)] flex items-center gap-2">
                <span>⬇</span> UNDUH LAPORAN PDF
              </button>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'TOTAL KONSUMSI BAHAN BAKAR', val: '2,500', unit: 'TON', badge: '+ 5%', color: 'text-red-400 bg-red-900/30 border-red-500/30' },
                { label: 'RATA - RATA EFISIENSI BAHAN BAKAR', val: '0.18', unit: 'T/NM', badge: '- 3%', color: 'text-[#00e5ff] bg-[#00e5ff]/20 border-[#00e5ff]/30' },
                { label: 'CO2 EMISI', val: '7,800', unit: 'T CO2', badge: '---', color: 'text-gray-500 border-gray-600/30' },
                { label: 'KAPAL DENGAN KONSUMSI TERATAS', val: 'MV', unit: 'Prasetya', badge: '82.6 T', color: 'text-[#b562ff] bg-[#b562ff]/20 border-[#b562ff]/30' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#100e23] border border-[#2a244d] p-6 rounded-xl shadow-[0_0_15px_rgba(181,98,255,0.05)] hover:border-[#b562ff]/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] text-gray-500 tracking-widest leading-relaxed">{stat.label}</p>
                    <span className={`text-[10px] px-2 py-1 rounded border ${stat.color}`}>{stat.badge}</span>
                  </div>
                  <p className="text-3xl font-bold">{stat.val} <span className="text-sm font-normal text-gray-400">{stat.unit}</span></p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-[#100e23] border border-[#2a244d] p-8 rounded-xl shadow-[0_0_15px_rgba(181,98,255,0.05)] hover:border-[#b562ff]/50 transition-colors">
                <div className="flex justify-between mb-8">
                  <div><h3 className="text-lg font-bold tracking-widest text-white">KONSUMSI BAHAN BAKAR<br/>DALAM RUTE</h3><p className="text-xs text-gray-500 mt-1">Perbandingan antar sektor operasional utama</p></div>
                  <p className="text-xs text-gray-400">6 sektor yang dipantau</p>
                </div>

                <div className="space-y-8">
                  <div className="group">
                    <div className="flex justify-between text-sm mb-2"><span className="font-bold text-gray-300 group-hover:text-white transition-colors">SELAT MALAKA</span><span className="text-[#b562ff] font-bold">1,250 Ton</span></div>
                    <div className="w-full bg-[#0a0813] h-2.5 rounded-full overflow-hidden mb-1 border border-[#2a244d]"><div className="bg-[#b562ff] h-full shadow-[0_0_10px_#b562ff]" style={{width: '85%'}}></div></div>
                    <p className="text-[10px] text-gray-500 uppercase">Zona Lalu Lintas Padat</p>
                  </div>
                  <div className="group">
                    <div className="flex justify-between text-sm mb-2"><span className="font-bold text-gray-300 group-hover:text-white transition-colors">LAUT JAWA</span><span className="text-[#b562ff] font-bold">820 Ton</span></div>
                    <div className="w-full bg-[#0a0813] h-2.5 rounded-full overflow-hidden mb-1 border border-[#2a244d]"><div className="bg-[#b562ff] h-full shadow-[0_0_10px_#b562ff]" style={{width: '60%'}}></div></div>
                    <p className="text-[10px] text-gray-500 uppercase">Transit Perairan Terbuka</p>
                  </div>
                  <div className="group">
                    <div className="flex justify-between text-sm mb-2"><span className="font-bold text-gray-300 group-hover:text-white transition-colors">SELAT BALI</span><span className="text-[#1a5cff] font-bold">430 Ton</span></div>
                    <div className="w-full bg-[#0a0813] h-2.5 rounded-full overflow-hidden mb-1 border border-[#2a244d]"><div className="bg-[#1a5cff] h-full shadow-[0_0_10px_#1a5cff]" style={{width: '35%'}}></div></div>
                    <p className="text-[10px] text-gray-500 uppercase">Wilayah Arus Tinggi</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-[#2a244d] text-center">
                  <div><p className="text-[10px] text-gray-500 mb-1 tracking-widest">JARAK TOTAL</p><p className="text-xl font-bold text-white">12,450 <span className="text-[10px] text-gray-500">NM</span></p></div>
                  <div className="border-x border-[#2a244d]"><p className="text-[10px] text-gray-500 mb-1 tracking-widest">BAHAN BAKAR DENSITAS</p><p className="text-xl font-bold text-white">0.85 <span className="text-[10px] text-gray-500">K/L</span></p></div>
                  <div><p className="text-[10px] text-gray-500 mb-1 tracking-widest">KECEPATAN RATA - RATA</p><p className="text-xl font-bold text-white">14.2 <span className="text-[10px] text-gray-500">KN</span></p></div>
                </div>
              </div>

              <div className="col-span-1 space-y-6">
                <div className="bg-[#100e23] border border-[#2a244d] p-6 rounded-xl shadow-[0_0_15px_rgba(181,98,255,0.05)] hover:border-[#b562ff]/50 transition-colors">
                  <p className="text-xs font-bold tracking-widest mb-6 text-white">KONSUMSI BAHAN BAKAR</p>
                  <div className="h-32 border-b border-l border-[#2a244d] flex items-end relative">
                     <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(181,98,255,0.5)]" viewBox="0 0 100 50" preserveAspectRatio="none">
                       <path d="M0,40 C20,35 30,45 50,40 C70,35 80,10 90,30 L100,50 L0,50 Z" fill="rgba(181,98,255,0.15)" stroke="#b562ff" strokeWidth="2"></path>
                     </svg>
                     <div className="absolute right-4 top-4 bg-[#161230] border border-[#2a244d] px-2 py-1 rounded text-[10px] text-[#b562ff] shadow-[0_0_10px_rgba(181,98,255,0.2)]">82.6 T</div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 mt-2"><span>DAY 01</span><span>DAY 15</span><span>TODAY</span></div>
                </div>

                <div className="bg-[#100e23] border border-[#2a244d] p-6 rounded-xl shadow-[0_0_15px_rgba(181,98,255,0.05)] hover:border-[#b562ff]/50 transition-colors">
                  <p className="text-xs font-bold tracking-widest mb-6 flex items-center gap-2 text-white"><span>📄</span> ANALISIS BAHAN BAKAR</p>
                  <ul className="space-y-4 text-xs text-gray-400">
                    <li className="flex items-start gap-2"><span>&gt;</span><p>MV Garuda mencatat konsumsi bahan bakar tertinggi (<span className="text-red-400 font-bold">22%</span>) akibat rute jarak jauh.</p></li>
                    <li className="flex items-start gap-2"><span>&gt;</span><p>Optimalisasi rute di Selat Malaka dapat menekan konsumsi hingga <span className="text-[#00e5ff] font-bold">8%</span>.</p></li>
                    <li className="flex items-start gap-2"><span>&gt;</span><p>Anomali pembakaran mesin pada MV Wisnu terdeteksi, jadwal pemeliharaan <span className="text-red-400 font-bold">mendesak</span>.</p></li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-[#2a244d] flex justify-between items-center text-[10px]">
                    <div className="flex items-center gap-2 text-[#1a5cff] font-bold"><div className="w-2 h-2 bg-[#1a5cff] rounded-full shadow-[0_0_5px_#1a5cff] animate-pulse"></div> SISTEM MENYALA</div>
                    <span className="text-gray-500">14:22:11</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: PERINGATAN ================= */}
        {activeTab === 'peringatan' && (
          <div className="space-y-8 w-full max-w-7xl mx-auto animate-fade-in">
            <div className="flex justify-between items-end mb-6 border-b border-[#2a244d] pb-4">
              <div>
                <h2 className="text-3xl font-bold text-[#b562ff] drop-shadow-[0_0_10px_rgba(181,98,255,0.3)]">Pusat Peringatan & Darurat</h2>
                <div className="inline-block bg-red-900/40 border border-red-900 px-3 py-1 mt-2 rounded">
                  <span className="text-xs text-red-400 font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_red]"></div> {peringatanList.length} PERINGATAN AKTIF</span>
                </div>
              </div>
              <p className="text-sm font-bold text-gray-400 tracking-widest">SISTEM STATUS: <span className="text-[#00e5ff] font-normal drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]">ONLINE</span></p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-[#100e23] border border-red-500 p-6 rounded-xl shadow-[inset_0_0_20px_rgba(239,68,68,0.1)] flex flex-col justify-between h-32 relative">
                <p className="text-sm font-bold tracking-widest text-white">PERINGATAN AKTIF</p>
                <p className="text-3xl font-bold text-white transition-all">{peringatanList.length}</p>
                <div className="absolute right-6 bottom-6 text-red-500 text-4xl font-light">⚠</div>
              </div>
              <div className="bg-[#100e23] border border-[#00e5ff] p-6 rounded-xl shadow-[inset_0_0_20px_rgba(0,229,255,0.05)] flex flex-col justify-between h-32 relative">
                <p className="text-sm font-bold tracking-widest text-white">SELESAI HARI INI</p>
                <p className="text-3xl font-bold text-[#00e5ff] transition-all">{selesaiCount}</p>
                <div className="absolute right-6 bottom-6 w-8 h-8 rounded-full border-2 border-[#00e5ff] flex items-center justify-center text-[#00e5ff] font-bold">✓</div>
              </div>
              <div className="bg-[#100e23] border border-[#1a5cff] p-6 rounded-xl shadow-[inset_0_0_20px_rgba(26,92,255,0.05)] flex flex-col justify-between h-32 relative">
                <p className="text-sm font-bold tracking-widest text-white">TOTAL PERINGATAN HARI INI</p>
                <p className="text-3xl font-bold text-white transition-all">{peringatanList.length + selesaiCount}</p>
                <div className="absolute right-6 bottom-6 w-8 h-8 rounded-full border-2 border-[#1a5cff] flex items-center justify-center text-[#1a5cff] font-serif italic">i</div>
              </div>
            </div>

            <div className="space-y-6">
              {peringatanList.length === 0 ? (
                <div className="text-center py-20 text-gray-500 border border-dashed border-[#2a244d] rounded-2xl">
                    <span className="text-5xl block mb-4">👍</span>
                    <p className="font-bold text-lg text-white">Semua Aman!</p>
                    <p>Tidak ada peringatan aktif saat ini.</p>
                </div>
              ) : (
                peringatanList.map((item) => (
                  <div key={item.id} className={`bg-[#100e23] border ${item.colorBg} rounded-xl p-6 hover:bg-[#161230] transition-colors animate-fade-in`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-4">
                        <span className={`text-4xl ${item.colorIcon}`}>{item.icon}</span>
                        <div>
                          <h3 className="text-lg font-bold text-white">{item.nama}</h3>
                          <p className="text-xs text-gray-300 mt-4 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className={`${item.bgBadge} ${item.textBadge} px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2`}><div className={`w-2 h-2 rounded-full ${item.bgBadge.includes('red') ? 'bg-red-500' : 'bg-orange-400'}`}></div> {item.tingkat}</span>
                        <span className="bg-[#1a5cff]/30 text-[#66a1ff] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#66a1ff]"></div> Aktif</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end border-t border-[#2a244d] pt-4">
                      <span className="text-[10px] text-gray-500 font-bold">{item.waktu}</span>
                      <button onClick={() => handleTandaiSelesai(item.id)} className="border border-[#2a244d] bg-[#0a0813] text-gray-300 hover:text-white hover:border-[#b562ff] hover:shadow-[0_0_15px_rgba(181,98,255,0.4)] px-8 py-3 rounded-lg text-xs font-bold transition-all">
                        Tandai Selesai
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