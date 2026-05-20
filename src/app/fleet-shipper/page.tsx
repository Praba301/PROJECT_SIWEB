"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FleetSuperintendentDashboard() {
  const [activeTab, setActiveTab] = useState('peta');

  // STATE UNTUK ARMADA 
  const [selectedArmadaShip, setSelectedArmadaShip] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  // STATE UNTUK PETA & INVESTIGASI
  const [selectedShip, setSelectedShip] = useState<any | null>(null);
  const [showInvestigasi, setShowInvestigasi] = useState(false);

  // DATA DUMMY KAPAL DI PETA (Warna disesuaikan tema Praketrio)
  const ships = [
    { id: 'VSL-8832', name: 'KM. NUSANTARA', type: 'Kapal Kargo Kontainer', lat: "05°45'12\" S", lng: "106°50'34\" E", speed: '18.4', course: '245', departed: '12:00 Z', port1: 'Pelabuhan Tanjung Priok', eta: '18:30 Z', port2: 'Pelabuhan Merak', top: '50%', left: '45%', color: '#A855F7' },
    { id: 'VSL-1021', name: 'KM. KRAKATAU', type: 'Kapal Kargo Curah', lat: "06°12'10\" S", lng: "105°30'15\" E", speed: '14.2', course: '180', departed: '08:00 Z', port1: 'Pelabuhan Bakauheni', eta: '14:00 Z', port2: 'Pelabuhan Merak', top: '65%', left: '25%', color: '#EF4444' },
    { id: 'VSL-9982', name: 'KM. JAYA', type: 'Kapal Tanker', lat: "03°10'05\" S", lng: "110°20'10\" E", speed: '16.0', course: '090', departed: '06:00 Z', port1: 'Pelabuhan Pontianak', eta: '20:00 Z', port2: 'Pelabuhan Tanjung Emas', top: '40%', left: '40%', color: '#3B82F6' }
  ];

  // STATE UNTUK TAB PERINGATAN
  const [peringatanList, setPeringatanList] = useState([
    { id: 1, nama: 'MV Jaya', desc: 'Keterlambatan estimasi 2 jam karena cuaca buruk di Laut Jawa Sulawesi', waktu: '2026-04-05 16:25:12', tingkat: 'Tinggi', colorBg: 'border-red-500/50', colorIcon: 'text-red-500', icon: '☁', bgBadge: 'bg-red-500/20', textBadge: 'text-red-400' },
    { id: 2, nama: 'MV Siliwangi', desc: 'Maintenance utama dimulai - kapal berlabuh di kepulauan Batam', waktu: '2026-04-06 12:42:26', tingkat: 'Sedang', colorBg: 'border-orange-500/50', colorIcon: 'text-orange-400', icon: '🔧', bgBadge: 'bg-orange-500/20', textBadge: 'text-orange-400' }
  ]);
  const [selesaiCount, setSelesaiCount] = useState(5);

  const handleTandaiSelesai = (id: number) => {
    setPeringatanList(prev => prev.filter(item => item.id !== id));
    setSelesaiCount(prev => prev + 1);
  };

  const handleDownloadPDF = () => {
    const element = document.createElement("a");
    const file = new Blob([
      "LAPORAN OPERASIONAL PRAKETRIO\n" +
      "----------------------------\n" +
      "Tanggal: 21 April 2026\n" +
      "Status Fleet: Optimal\n" +
      "Total Kapal Aktif: 24/28\n\n" +
      "Catatan: Laporan analisis bahan bakar dan rute perjalanan."
    ], {type: 'text/plain'});
    
    element.href = URL.createObjectURL(file);
    element.download = "Laporan_Analisis_Praketrio.pdf";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-[#0A0A12] text-white font-mono relative overflow-x-hidden selection:bg-[#A855F7]/30">
      
      {/* MODAL TRANSMISI LOG ARMADA */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all">
            <div className="bg-[#13131F] border border-[#A855F7]/50 p-8 rounded-2xl w-full max-w-lg shadow-[0_0_40px_rgba(168,85,247,0.2)] opacity-0 animate-zoom-in">
                <div className="flex justify-between items-center mb-6 border-b border-[#1E1E2E] pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3"><span className="animate-pulse-glow text-[#C084FC]">📡</span> TRANSMISI LOG</h3>
                    <button onClick={() => setSelectedLog(null)} className="text-[#6B6B80] hover:text-white text-2xl transition-colors hover:rotate-90">✕</button>
                </div>
                <div className="space-y-4 text-sm mb-8">
                    <div className="flex justify-between items-center border-b border-[#1E1E2E] pb-3">
                        <span className="text-[#6B6B80] tracking-widest text-[10px]">ARMADA ID</span>
                        <span className={`font-bold px-3 py-1 bg-[#1E1E2E] rounded ${selectedLog.color}`}>{selectedLog.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1E1E2E] pb-3">
                        <span className="text-[#6B6B80] tracking-widest text-[10px]">WAKTU TERCATAT</span>
                        <span className="text-white font-bold">{selectedLog.waktu}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#1E1E2E] pb-3">
                        <span className="text-[#6B6B80] tracking-widest text-[10px]">KOORDINAT GPS</span>
                        <span className="text-[#60A5FA] font-bold">{selectedLog.koor}</span>
                    </div>
                    <div className="bg-[#0A0A12] p-5 rounded-xl border border-[#1E1E2E] mt-6 shadow-inner">
                        <span className="text-[#6B6B80] tracking-widest text-[10px] block mb-2">STATUS KEJADIAN / LAPORAN</span>
                        <p className="text-lg text-white leading-relaxed">{selectedLog.kejadian}</p>
                        <p className={`mt-4 text-xs font-bold tracking-widest ${selectedLog.color}`}>[{selectedLog.status}]</p>
                    </div>
                </div>
                <button onClick={() => setSelectedLog(null)} className="w-full py-3.5 bg-[#A855F7] hover:bg-[#9333EA] text-white rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] tracking-widest text-sm active:scale-95">TUTUP TRANSMISI</button>
            </div>
        </div>
      )}

      {/* MODAL INVESTIGASI PETA */}
      {showInvestigasi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all">
            <div className="bg-[#13131F] border-2 border-red-500/80 p-8 rounded-2xl w-full max-w-2xl shadow-[0_0_50px_rgba(239,68,68,0.3)] opacity-0 animate-zoom-in">
                <div className="flex justify-between items-center mb-8 border-b border-[#1E1E2E] pb-4">
                    <h3 className="text-2xl font-bold text-red-500 flex items-center gap-3"><span className="animate-pulse">⚠</span> FORM INVESTIGASI INSIDEN</h3>
                    <button onClick={() => setShowInvestigasi(false)} className="text-[#6B6B80] hover:text-white text-2xl transition-colors hover:rotate-90">✕</button>
                </div>
                <div className="space-y-6 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0A0A12] p-4 rounded-xl border border-[#1E1E2E]">
                            <p className="text-[#6B6B80] text-[11px] mb-1 tracking-widest">KODE ERROR</p><p className="font-bold text-white text-lg">ERR-4029</p>
                        </div>
                        <div className="bg-[#0A0A12] p-4 rounded-xl border border-[#1E1E2E]">
                            <p className="text-[#6B6B80] text-[11px] mb-1 tracking-widest">KAPAL TERDAMPAK</p><p className="font-bold text-[#EF4444] text-lg">KM. KRAKATAU</p>
                        </div>
                    </div>
                    <div className="bg-[#0A0A12] p-6 rounded-xl border border-[#1E1E2E]">
                        <p className="text-[#6B6B80] text-[11px] mb-3 tracking-widest">DESKRIPSI SISTEM</p>
                        <p className="text-[#A0A0B0] leading-relaxed">Penurunan tekanan oli pada MESIN UTAMA terdeteksi. Tekanan saat ini <span className="text-red-400 font-bold bg-red-500/10 px-1.5 py-0.5 rounded">2.1 Bar</span> (Batas Normal: 4.5 Bar). Terdapat potensi kerusakan komponen berat jika perjalanan dilanjutkan melebihi 50 NM tanpa penanganan.</p>
                    </div>
                    <div className="bg-[#0A0A12] p-6 rounded-xl border border-[#1E1E2E]">
                        <p className="text-[#6B6B80] text-[11px] mb-3 tracking-widest">TINDAKAN DIREKOMENDASIKAN</p>
                        <ul className="list-disc pl-5 text-[#A0A0B0] space-y-2">
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
      <nav className="border-b border-[#1E1E2E] flex justify-between items-center px-8 py-5 bg-[#0A0A12]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
          <span className="text-xl font-bold tracking-widest text-white transition-colors hover:text-[#C084FC] cursor-pointer">Praketrio</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-white">Praba Supriyanto</span>
            <span className="text-[10px] text-[#A855F7] tracking-widest bg-[#A855F7]/10 px-2 py-0.5 rounded border border-[#A855F7]/30">FLEET SUPERINTENDENT</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#1E1E2E] flex items-center justify-center text-[#A855F7] font-bold border border-[#A855F7]/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            FS
          </div>
        </div>
      </nav>

      {/* SUB-NAVBAR TABS */}
      <div className="border-b border-[#1E1E2E] flex justify-between items-center px-8 py-0 bg-[#13131F] sticky top-[81px] z-30">
        
        <div className="flex gap-8 text-sm font-bold tracking-widest h-full">
          {['ARMADA', 'PETA', 'ANALISIS', 'PERINGATAN'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`py-5 transition-all duration-300 border-b-2 relative ${
                activeTab === tab.toLowerCase() 
                  ? 'text-[#C084FC] border-[#A855F7]' 
                  : 'text-[#6B6B80] border-transparent hover:text-white hover:border-[#1E1E2E]'
              }`}
            >
              {tab}
              {activeTab === tab.toLowerCase() && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#A855F7]/20 blur-md rounded-full pointer-events-none" />
              )}
            </button>
          ))}
        </div>

        <div className="py-3">
          <Link href="/login" className="px-5 py-2 rounded-lg font-bold transition-all duration-300 text-center text-xs bg-[#13131F] border border-red-500/50 hover:bg-red-500/10 text-red-400 hover:text-red-300 flex items-center gap-2 group hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            Keluar Sistem
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          </Link>
        </div>
      </div>

      {/* KONTEN UTAMA */}
      <main className="p-8">
        
        {/* ================= TAB 1: ARMADA ================= */}
        {activeTab === 'armada' && (
          <div className="space-y-8 w-full max-w-7xl mx-auto opacity-0 animate-fade-in-up">
            <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-widest">DAFTAR KAPAL</h2>
                  <p className="text-[11px] text-[#A0A0B0] mt-1">Klik pada kartu kapal untuk memfilter log perjalanan transmisi</p>
                </div>
                <div className="bg-[#0A0A12] border border-[#1E1E2E] px-5 py-2.5 rounded-xl flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse-glow"></div>
                  <div className="text-[10px] text-[#6B6B80] tracking-widest">TOTAL AKTIF<br/><span className="text-lg text-white font-bold">24 / 28</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Kapal 1 */}
                <div 
                  onClick={() => setSelectedArmadaShip(selectedArmadaShip === 'VSL-992-A' ? null : 'VSL-992-A')}
                  className={`bg-[#1A1A24] border-l-4 border-l-[#A855F7] p-6 rounded-r-2xl border-y border-r border-[#1E1E2E] transition-all duration-300 cursor-pointer ${
                    selectedArmadaShip === 'VSL-992-A' ? 'ring-1 ring-[#A855F7] shadow-[0_10px_30px_rgba(168,85,247,0.15)] -translate-y-2 z-10' : selectedArmadaShip ? 'opacity-40 scale-[0.98] hover:opacity-100' : 'hover:-translate-y-1 hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 transition-colors hover:text-[#C084FC]">KRI BIMA SAKTI</h3>
                      <p className="text-[10px] text-[#6B6B80] tracking-widest">ID: VSL-992-A // KARGO CURAH</p>
                    </div>
                    <span className="text-[9px] px-2.5 py-1 bg-[#60A5FA]/10 text-[#60A5FA] border border-[#60A5FA]/30 rounded flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#60A5FA] rounded-full animate-pulse-glow" /> BERLAYAR</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                    <div><p className="text-[#6B6B80] text-[10px] mb-1 tracking-widest">KAPTEN</p><p className="text-white font-medium">Capt. Aris Setiawan</p></div>
                    <div><p className="text-[#6B6B80] text-[10px] mb-1 tracking-widest">KECEPATAN</p><p className="text-[#C084FC] font-bold">18.4 KTS</p></div>
                  </div>
                  <div className="bg-[#0A0A12] p-4 rounded-xl flex justify-between items-center text-xs border border-[#1E1E2E]">
                    <div><p className="text-[#6B6B80] text-[10px] mb-1 tracking-widest">RUTE SAAT INI</p><p className="text-white">Priok → Singapore</p></div>
                    <p className="text-[#6B6B80] font-bold">14:30</p>
                  </div>
                </div>

                {/* Kapal 2 */}
                <div 
                  onClick={() => setSelectedArmadaShip(selectedArmadaShip === 'VSL-104-C' ? null : 'VSL-104-C')}
                  className={`bg-[#1A1A24] border-l-4 border-l-[#3B82F6] p-6 rounded-r-2xl border-y border-r border-[#1E1E2E] transition-all duration-300 cursor-pointer ${
                    selectedArmadaShip === 'VSL-104-C' ? 'ring-1 ring-[#3B82F6] shadow-[0_10px_30px_rgba(59,130,246,0.15)] -translate-y-2 z-10' : selectedArmadaShip ? 'opacity-40 scale-[0.98] hover:opacity-100' : 'hover:-translate-y-1 hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 transition-colors hover:text-[#60A5FA]">PL NUSANTARA</h3>
                      <p className="text-[10px] text-[#6B6B80] tracking-widest">ID: VSL-104-C // KONTAINER</p></div>
                    <span className="text-[9px] px-2.5 py-1 bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/30 rounded">⚓ DI PELABUHAN</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                    <div><p className="text-[#6B6B80] text-[10px] mb-1 tracking-widest">KAPTEN</p><p className="text-white font-medium">Capt. Budi Hartono</p></div>
                    <div><p className="text-[#6B6B80] text-[10px] mb-1 tracking-widest">STATUS KARGO</p><p className="text-white">Bongkar (65%)</p></div>
                  </div>
                  <div className="bg-[#0A0A12] p-4 rounded-xl flex justify-between items-center text-xs border border-[#1E1E2E]">
                    <div><p className="text-[#6B6B80] text-[10px] mb-1 tracking-widest">LOKASI</p><p className="text-white">◎ Pelabuhan Merak</p></div>
                    <p className="text-[#60A5FA] font-bold">Dermaga 4</p>
                  </div>
                </div>

                {/* Kapal 3 */}
                <div 
                  onClick={() => setSelectedArmadaShip(selectedArmadaShip === 'VSL-402-M' ? null : 'VSL-402-M')}
                  className={`bg-[#1A1A24] border-l-4 border-l-[#F59E0B] p-6 rounded-r-2xl border-y border-r border-[#1E1E2E] transition-all duration-300 cursor-pointer ${
                    selectedArmadaShip === 'VSL-402-M' ? 'ring-1 ring-[#F59E0B] shadow-[0_10px_30px_rgba(245,158,11,0.15)] -translate-y-2 z-10' : selectedArmadaShip ? 'opacity-40 scale-[0.98] hover:opacity-100' : 'hover:-translate-y-1 hover:shadow-lg'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1 transition-colors hover:text-[#FCD34D]">PL GARUDA</h3>
                      <p className="text-[10px] text-[#6B6B80] tracking-widest">ID: VSL-402-M // TANKER</p></div>
                    <span className="text-[9px] px-2.5 py-1 bg-[#F59E0B]/10 text-[#FCD34D] border border-[#F59E0B]/30 rounded">⚠ PEMELIHARAAN</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                    <div><p className="text-[#6B6B80] text-[10px] mb-1 tracking-widest">KAPTEN</p><p className="text-white font-medium">Capt. Dodi Pradipta</p></div>
                    <div><p className="text-[#6B6B80] text-[10px] mb-1 tracking-widest">ESTIMASI SELESAI</p><p className="text-[#FCD34D] font-bold">48 JAM</p></div>
                  </div>
                  <div className="bg-[#0A0A12] p-4 rounded-xl flex justify-between items-center text-xs border border-red-500/30">
                    <div><p className="text-[#6B6B80] text-[10px] mb-1 tracking-widest">ISU TEKNIS</p><p className="text-[#FCD34D]">🛠 Kalibrasi Radar</p></div>
                    <p className="text-red-500 font-bold animate-pulse">Kritis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* LOG PERJALANAN */}
            <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 shadow-xl opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-lg font-bold flex items-center gap-3"><span className="text-[#A855F7]">⏱</span> LOG PERJALANAN TERBARU</h2>
                <p className="text-[11px] text-[#6B6B80]">Klik baris log untuk membuka transmisi</p>
              </div>
              <div className="w-full text-sm text-left">
                <div className="grid grid-cols-5 text-[#6B6B80] border-b border-[#1E1E2E] pb-4 mb-3 text-[10px] font-bold tracking-widest uppercase">
                  <div className="px-4">Waktu</div><div>Armada ID</div><div>Koordinat</div><div className="col-span-2">Kejadian / Status</div>
                </div>
                <div className="space-y-2">
                  {[
                    { waktu: '2024-05-20 08:14:22', id: 'VSL-992-A', koor: "01°16'S 103°50'E", kejadian: 'Memasuki Selat Singapura', status: 'OPTIMAL', color: 'text-[#A0A0B0]' },
                    { waktu: '2024-05-20 07:45:10', id: 'VSL-104-C', koor: "05°55'S 105°59'E", kejadian: 'Sandar di Dermaga 4', status: 'SELESAI', color: 'text-[#C084FC]' },
                    { waktu: '2024-05-20 06:30:00', id: 'VSL-402-M', koor: "07°12'S 112°44'E", kejadian: 'Peringatan Sistem Radar', status: 'PERINGATAN', color: 'text-red-400', bg: 'bg-red-500/5 border border-red-500/20' },
                    { waktu: '2024-05-20 05:15:44', id: 'VSL-992-A', koor: "02°05'S 104°45'E", kejadian: 'Meninggalkan Perairan Kep. Riau', status: 'OPTIMAL', color: 'text-[#A0A0B0]' },
                  ].map((log, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedLog(log)}
                      className={`grid grid-cols-5 py-3.5 px-4 rounded-xl border border-transparent transition-all duration-300 cursor-pointer ${log.bg || ''} ${selectedArmadaShip && selectedArmadaShip !== log.id ? 'opacity-20 scale-[0.98] pointer-events-none' : 'hover:bg-[#1A1A24] hover:border-[#1E1E2E] hover:shadow-md hover:scale-[1.01]'}`}
                    >
                      <div className="text-[#A0A0B0] font-mono text-xs flex items-center">{log.waktu}</div>
                      <div className={`${log.color} font-bold flex items-center`}>{log.id}</div>
                      <div className="text-[#6B6B80] text-xs flex items-center">{log.koor}</div>
                      <div className="text-white font-sans flex items-center text-sm">{log.kejadian}</div>
                      <div className={`${log.color} text-[10px] font-bold tracking-widest flex items-center justify-end`}>{log.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PETA INTERAKTIF ================= */}
        {activeTab === 'peta' && (
          <div className="relative w-full h-[75vh] bg-[#0A0A12] border border-[#1E1E2E] rounded-2xl overflow-hidden flex items-center justify-center bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center bg-no-repeat shadow-[inset_0_0_100px_#0A0A12] opacity-0 animate-fade-in-up">
            
            <div className="absolute inset-0 bg-[#0A0A12]/40 pointer-events-none mix-blend-multiply" />

            {/* OVERLAY KIRI ATAS */}
            <div className="absolute top-6 left-6 space-y-4 z-10 pointer-events-none opacity-0 animate-slide-right" style={{ animationDelay: "0.2s" }}>
              <div className="bg-[#0A0A12]/80 border border-[#1E1E2E] p-5 rounded-2xl backdrop-blur-md w-72 shadow-lg">
                <p className="text-[10px] text-[#C084FC] font-bold mb-4 tracking-widest">STATUS OPERASIONAL GLOBAL</p>
                <div className="flex justify-between items-end mb-3 border-b border-[#1E1E2E] pb-3"><span className="text-xs text-[#A0A0B0] font-sans">Total Armada Aktif</span><span className="text-4xl text-white font-bold font-mono tracking-tighter">142</span></div>
                <div className="flex justify-between text-xs text-[#6B6B80] mb-2"><span className="font-sans">Dalam Perjalanan</span><span className="text-[#A0A0B0] font-mono font-bold">118</span></div>
                <div className="flex justify-between text-xs text-[#6B6B80]"><span className="font-sans">Sandar / Berlabuh</span><span className="text-[#A0A0B0] font-mono font-bold">24</span></div>
              </div>

              <div className="bg-[#13131F]/90 border border-red-500/40 p-5 rounded-2xl backdrop-blur-md w-72 shadow-[0_0_20px_rgba(239,68,68,0.15)] pointer-events-auto">
                <p className="text-[10px] text-red-400 mb-3 tracking-widest font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-glow" /> PERINGATAN REAL-TIME</p>
                <p className="text-[10px] text-[#A0A0B0] mb-1 font-mono">ERR-4029 • MESIN UTAMA</p>
                <p className="text-sm text-white mb-5 leading-relaxed">Penurunan tekanan oli terdeteksi pada KM. KRAKATAU.</p>
                <button onClick={() => setShowInvestigasi(true)} className="w-full bg-red-500/10 border border-red-500/50 hover:bg-red-500 text-red-400 hover:text-white text-[10px] py-3 rounded-lg transition-all font-bold tracking-widest active:scale-95">LIHAT INVESTIGASI</button>
              </div>
            </div>

            {/* RENDER TITIK KAPAL DI PETA */}
            {ships.map((ship, idx) => (
              <div 
                key={ship.id}
                onClick={() => setSelectedShip(ship)}
                className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 z-10 ${selectedShip?.id === ship.id ? 'ring-4 ring-white shadow-[0_0_20px_white] scale-125' : 'hover:scale-125'} opacity-0 animate-zoom-in`}
                style={{ top: ship.top, left: ship.left, backgroundColor: ship.color, boxShadow: `0 0 15px ${ship.color}`, animationDelay: `${0.4 + (idx * 0.1)}s` }}
              >
                {/* Animasi Ping untuk kapal */}
                <div className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ backgroundColor: ship.color }}></div>
                
                {selectedShip?.id === ship.id && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#0A0A12]/90 border px-3 py-1.5 text-[10px] rounded-md whitespace-nowrap z-20 text-white font-bold backdrop-blur-sm pointer-events-none" style={{ borderColor: ship.color}}>
                    {ship.name}
                  </div>
                )}
              </div>
            ))}

            {/* OVERLAY KANAN (DETAIL KAPAL) */}
            {selectedShip && (
              <div className="absolute top-0 right-0 h-full w-[400px] bg-[#0A0A12]/95 border-l border-[#1E1E2E] backdrop-blur-xl p-8 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-20 animate-slide-left flex flex-col overflow-y-auto">
                <div className="flex justify-between items-center mb-6 mt-2 shrink-0">
                  <span className="bg-[#1E1E2E] text-[10px] px-3 py-1.5 rounded-md text-white font-mono tracking-widest">ID: {selectedShip.id}</span>
                  <button onClick={() => setSelectedShip(null)} className="text-[#6B6B80] hover:text-white hover:rotate-90 transition-all text-xl bg-[#13131F] w-8 h-8 rounded-full flex items-center justify-center">✕</button>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-1 tracking-wide shrink-0 transition-colors" style={{ color: selectedShip.color }}>{selectedShip.name}</h2>
                <p className="text-xs text-[#A0A0B0] mb-8 font-sans shrink-0 uppercase tracking-widest">{selectedShip.type}</p>

                <div className="bg-[#13131F] border border-[#1E1E2E] p-5 rounded-2xl mb-5 shrink-0 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10 rounded-bl-full" style={{ backgroundColor: selectedShip.color }} />
                  <p className="text-[10px] text-[#6B6B80] mb-4 tracking-widest font-bold">KOORDINAT PRESISI</p>
                  <div className="flex justify-between text-sm relative z-10">
                    <div>
                      <p className="text-[#6B6B80] text-[10px] mb-1 font-bold">LATITUDE</p>
                      <p className="text-lg text-white font-mono font-light">{selectedShip.lat}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#6B6B80] text-[10px] mb-1 font-bold">LONGITUDE</p>
                      <p className="text-lg text-white font-mono font-light">{selectedShip.lng}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8 shrink-0">
                  <div className="bg-[#13131F] border border-[#1E1E2E] p-5 rounded-2xl">
                    <p className="text-[10px] text-[#6B6B80] mb-2 tracking-widest font-bold">KECEPATAN</p>
                    <p className="text-3xl font-bold text-white font-mono">{selectedShip.speed} <span className="text-[10px] text-[#6B6B80] font-sans ml-1">KTS</span></p>
                  </div>
                  <div className="bg-[#13131F] border border-[#1E1E2E] p-5 rounded-2xl">
                    <p className="text-[10px] text-[#6B6B80] mb-2 tracking-widest font-bold">HALUAN</p>
                    <p className="text-3xl font-bold text-white font-mono">{selectedShip.course}°</p>
                  </div>
                </div>

                <p className="text-[10px] text-[#6B6B80] mb-5 tracking-widest font-bold shrink-0">RUTE & ESTIMASI</p>
                <div className="relative pl-6 border-l-2 border-[#1E1E2E] space-y-8 ml-2 pb-6 shrink-0">
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 border-4 border-[#6B6B80] bg-[#0A0A12] rounded-full"></div>
                    <p className="text-[10px] text-[#A0A0B0] mb-1 font-bold tracking-widest">DEPARTED <span className="text-white bg-[#1E1E2E] px-1.5 py-0.5 rounded ml-1">{selectedShip.departed}</span></p>
                    <p className="text-sm text-white font-medium">{selectedShip.port1}</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full animate-pulse-glow" style={{ backgroundColor: selectedShip.color, boxShadow: `0 0 10px ${selectedShip.color}` }}></div>
                    <p className="text-[10px] mb-1 font-bold tracking-widest" style={{ color: selectedShip.color }}>EST. ARRIVAL <span className="text-white bg-[#1E1E2E] px-1.5 py-0.5 rounded ml-1">{selectedShip.eta}</span></p>
                    <p className="text-sm text-white font-medium">{selectedShip.port2}</p>
                  </div>
                </div>
              </div>
            )}

            {/* LEGENDA */}
            <div className="absolute bottom-6 left-6 bg-[#0A0A12]/80 border border-[#1E1E2E] p-4 rounded-xl backdrop-blur-md z-10 pointer-events-none opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <p className="text-[10px] font-bold mb-3 tracking-widest text-white">LEGENDA PETA</p>
              <div className="flex gap-4 text-[10px] text-[#A0A0B0] font-medium">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_5px_#3B82F6]"></div> Tanker</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_5px_#A855F7]"></div> Kargo</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#EF4444] shadow-[0_0_5px_#EF4444]"></div> Peringatan</div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ANALISIS ================= */}
        {activeTab === 'analisis' && (
          <div className="space-y-6 w-full max-w-7xl mx-auto opacity-0 animate-fade-in-up">
            <div className="flex justify-end mb-6">
              <button onClick={handleDownloadPDF} className="bg-[#13131F] border border-[#A855F7]/50 text-[#C084FC] px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#A855F7] hover:text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2 active:scale-95">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                UNDUH LAPORAN PDF
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'TOTAL KONSUMSI BBM', val: '2,500', unit: 'TON', badge: '+ 5%', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
                { label: 'RATA-RATA EFISIENSI', val: '0.18', unit: 'T/NM', badge: '- 3%', color: 'text-[#4ADE80] bg-[#22C55E]/10 border-[#22C55E]/20' },
                { label: 'CO2 EMISI KESELURUHAN', val: '7,800', unit: 'T CO2', badge: 'STABIL', color: 'text-[#A0A0B0] bg-[#1E1E2E] border-transparent' },
                { label: 'KONSUMSI TERATAS (KAPAL)', val: 'KRA', unit: 'Krakatau', badge: '82.6 T', color: 'text-[#C084FC] bg-[#A855F7]/10 border-[#A855F7]/20' },
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl shadow-lg hover:border-[#A855F7]/50 transition-colors opacity-0 animate-zoom-in"
                  style={{ animationDelay: `${0.1 + (idx * 0.1)}s` }}
                >
                  <div className="flex justify-between items-start mb-5">
                    <p className="text-[10px] text-[#6B6B80] tracking-widest font-bold w-2/3">{stat.label}</p>
                    <span className={`text-[9px] font-bold px-2 py-1 rounded border ${stat.color}`}>{stat.badge}</span>
                  </div>
                  <p className="text-3xl font-bold font-mono text-white">{stat.val} <span className="text-xs font-sans text-[#6B6B80] ml-1">{stat.unit}</span></p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-2 bg-[#13131F] border border-[#1E1E2E] p-8 rounded-2xl shadow-lg hover:border-[#A855F7]/30 transition-colors opacity-0 animate-slide-left" style={{ animationDelay: "0.4s" }}>
                <div className="flex justify-between items-start mb-10 border-b border-[#1E1E2E] pb-6">
                  <div>
                    <h3 className="text-lg font-bold tracking-widest text-white">KONSUMSI BAHAN BAKAR RUTE</h3>
                    <p className="text-xs text-[#A0A0B0] mt-1.5">Perbandingan antar sektor operasional utama</p>
                  </div>
                  <p className="text-[10px] font-bold tracking-widest bg-[#1E1E2E] px-3 py-1.5 rounded-lg text-[#A0A0B0]">6 SEKTOR DIPANTAU</p>
                </div>

                <div className="space-y-7">
                  <div className="group">
                    <div className="flex justify-between text-xs mb-3"><span className="font-bold text-[#A0A0B0] group-hover:text-white transition-colors tracking-widest">SELAT MALAKA</span><span className="text-[#C084FC] font-bold font-mono">1,250 Ton</span></div>
                    <div className="w-full bg-[#0A0A12] h-2.5 rounded-full overflow-hidden mb-2 border border-[#1E1E2E]"><div className="bg-gradient-to-r from-[#7C3AED] to-[#C084FC] h-full transition-all duration-1000 ease-out shadow-[0_0_10px_#A855F7]" style={{width: '85%'}}></div></div>
                    <p className="text-[10px] text-[#6B6B80] uppercase">Zona Lalu Lintas Padat</p>
                  </div>
                  <div className="group">
                    <div className="flex justify-between text-xs mb-3"><span className="font-bold text-[#A0A0B0] group-hover:text-white transition-colors tracking-widest">LAUT JAWA</span><span className="text-[#60A5FA] font-bold font-mono">820 Ton</span></div>
                    <div className="w-full bg-[#0A0A12] h-2.5 rounded-full overflow-hidden mb-2 border border-[#1E1E2E]"><div className="bg-gradient-to-r from-[#2563EB] to-[#60A5FA] h-full transition-all duration-1000 ease-out shadow-[0_0_10px_#3B82F6]" style={{width: '60%'}}></div></div>
                    <p className="text-[10px] text-[#6B6B80] uppercase">Transit Perairan Terbuka</p>
                  </div>
                  <div className="group">
                    <div className="flex justify-between text-xs mb-3"><span className="font-bold text-[#A0A0B0] group-hover:text-white transition-colors tracking-widest">SELAT BALI</span><span className="text-[#4ADE80] font-bold font-mono">430 Ton</span></div>
                    <div className="w-full bg-[#0A0A12] h-2.5 rounded-full overflow-hidden mb-2 border border-[#1E1E2E]"><div className="bg-gradient-to-r from-[#16A34A] to-[#4ADE80] h-full transition-all duration-1000 ease-out shadow-[0_0_10px_#22C55E]" style={{width: '35%'}}></div></div>
                    <p className="text-[10px] text-[#6B6B80] uppercase">Wilayah Arus Tinggi</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-[#1E1E2E] text-center">
                  <div><p className="text-[10px] text-[#6B6B80] mb-2 tracking-widest font-bold">JARAK TOTAL</p><p className="text-2xl font-bold text-white font-mono">12,450 <span className="text-[10px] font-sans text-[#6B6B80]">NM</span></p></div>
                  <div className="border-x border-[#1E1E2E]"><p className="text-[10px] text-[#6B6B80] mb-2 tracking-widest font-bold">DENSITAS RATA-RATA</p><p className="text-2xl font-bold text-white font-mono">0.85 <span className="text-[10px] font-sans text-[#6B6B80]">K/L</span></p></div>
                  <div><p className="text-[10px] text-[#6B6B80] mb-2 tracking-widest font-bold">KECEPATAN RATA-RATA</p><p className="text-2xl font-bold text-white font-mono">14.2 <span className="text-[10px] font-sans text-[#6B6B80]">KTS</span></p></div>
                </div>
              </div>

              <div className="col-span-1 space-y-6 opacity-0 animate-slide-right" style={{ animationDelay: "0.5s" }}>
                <div className="bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl shadow-lg hover:border-[#A855F7]/30 transition-colors">
                  <p className="text-[10px] font-bold tracking-widest mb-6 text-[#A0A0B0]">TREN KONSUMSI (30 HARI)</p>
                  <div className="h-32 border-b border-l border-[#1E1E2E] flex items-end relative">
                     <svg className="w-full h-full drop-shadow-[0_5px_10px_rgba(168,85,247,0.2)]" viewBox="0 0 100 50" preserveAspectRatio="none">
                       <path d="M0,45 C20,40 30,35 50,25 C70,15 80,20 100,5 L100,50 L0,50 Z" fill="rgba(168,85,247,0.1)" stroke="#C084FC" strokeWidth="1.5"></path>
                     </svg>
                     <div className="absolute right-2 top-2 bg-[#A855F7]/10 border border-[#A855F7]/30 px-2.5 py-1 rounded-md text-[10px] text-[#C084FC] font-bold font-mono">82.6 T</div>
                  </div>
                  <div className="flex justify-between text-[9px] font-bold tracking-widest text-[#6B6B80] mt-3"><span>DAY 01</span><span>DAY 15</span><span>TODAY</span></div>
                </div>

                <div className="bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl shadow-lg hover:border-[#A855F7]/30 transition-colors flex-1 flex flex-col">
                  <p className="text-[10px] font-bold tracking-widest mb-5 flex items-center gap-2 text-[#A0A0B0]"><span className="text-[#C084FC]">📄</span> CATATAN ANALISIS</p>
                  <ul className="space-y-4 text-xs text-[#A0A0B0] flex-1">
                    <li className="flex items-start gap-3"><span className="text-[#A855F7] font-bold">&gt;</span><p className="leading-relaxed">KM Krakatau mencatat konsumsi BBM tertinggi (<span className="text-red-400 font-bold bg-red-500/10 px-1 rounded">22%</span>) akibat rute jarak jauh.</p></li>
                    <li className="flex items-start gap-3"><span className="text-[#A855F7] font-bold">&gt;</span><p className="leading-relaxed">Optimalisasi rute Selat Malaka menekan konsumsi <span className="text-[#4ADE80] font-bold bg-[#22C55E]/10 px-1 rounded">8%</span>.</p></li>
                    <li className="flex items-start gap-3"><span className="text-[#A855F7] font-bold">&gt;</span><p className="leading-relaxed">Anomali RPM mesin KM Garuda terdeteksi, jadwal pemeliharaan mendesak.</p></li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-[#1E1E2E] flex justify-between items-center text-[10px] font-bold tracking-widest">
                    <div className="flex items-center gap-2 text-[#4ADE80]"><div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse-glow"></div> ANALISIS AKTIF</div>
                    <span className="text-[#6B6B80] font-mono">14:22:11 Z</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: PERINGATAN ================= */}
        {activeTab === 'peringatan' && (
          <div className="space-y-8 w-full max-w-7xl mx-auto opacity-0 animate-fade-in-up">
            <div className="flex justify-between items-end mb-8 border-b border-[#1E1E2E] pb-6">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-wide">Pusat Peringatan & Darurat</h2>
                <div className="inline-block bg-red-500/10 border border-red-500/30 px-3.5 py-1.5 mt-3 rounded-md">
                  <span className="text-xs text-red-400 font-bold tracking-widest flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse-glow"></div> {peringatanList.length} PERINGATAN AKTIF</span>
                </div>
              </div>
              <p className="text-[10px] font-bold text-[#6B6B80] tracking-widest">SISTEM STATUS: <span className="text-[#4ADE80] border border-[#22C55E]/30 bg-[#22C55E]/10 px-2 py-1 rounded ml-1">ONLINE</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#13131F] border border-red-500/50 p-6 rounded-2xl shadow-[inset_0_0_30px_rgba(239,68,68,0.05)] flex flex-col justify-between h-36 relative overflow-hidden opacity-0 animate-zoom-in" style={{ animationDelay: "0.1s" }}>
                <p className="text-[10px] font-bold tracking-widest text-red-400">PERINGATAN AKTIF / BELUM DITANGANI</p>
                <p className="text-5xl font-bold text-white font-mono">{peringatanList.length}</p>
                <div className="absolute -right-4 -bottom-4 text-red-500/10 text-8xl font-bold pointer-events-none">⚠</div>
              </div>
              <div className="bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl shadow-lg flex flex-col justify-between h-36 relative overflow-hidden opacity-0 animate-zoom-in" style={{ animationDelay: "0.2s" }}>
                <p className="text-[10px] font-bold tracking-widest text-[#6B6B80]">RESOLUSI (SELESAI HARI INI)</p>
                <p className="text-5xl font-bold text-[#4ADE80] font-mono">{selesaiCount}</p>
                <div className="absolute right-4 bottom-4 w-12 h-12 rounded-full border-[3px] border-[#22C55E]/20 flex items-center justify-center text-[#22C55E]/20 text-xl font-bold pointer-events-none">✓</div>
              </div>
              <div className="bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl shadow-lg flex flex-col justify-between h-36 relative overflow-hidden opacity-0 animate-zoom-in" style={{ animationDelay: "0.3s" }}>
                <p className="text-[10px] font-bold tracking-widest text-[#6B6B80]">TOTAL INSIDEN HARI INI</p>
                <p className="text-5xl font-bold text-white font-mono">{peringatanList.length + selesaiCount}</p>
                <div className="absolute right-4 bottom-4 w-12 h-12 rounded-full border-[3px] border-[#1E1E2E] flex items-center justify-center text-[#1E1E2E] text-xl font-serif italic pointer-events-none">i</div>
              </div>
            </div>

            <div className="space-y-4">
              {peringatanList.length === 0 ? (
                <div className="text-center py-24 bg-[#13131F] border border-dashed border-[#1E1E2E] rounded-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <div className="w-16 h-16 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-full flex items-center justify-center mx-auto mb-4 text-[#4ADE80] text-2xl">✓</div>
                    <p className="font-bold text-xl text-white mb-2">Semua Sistem Aman</p>
                    <p className="text-[#A0A0B0] text-sm">Tidak ada peringatan aktif yang membutuhkan penanganan saat ini.</p>
                </div>
              ) : (
                peringatanList.map((item, idx) => (
                  <div key={item.id} className={`bg-[#13131F] border ${item.colorBg} rounded-2xl p-6 hover:bg-[#1A1A24] transition-all duration-300 opacity-0 animate-fade-in-up hover:shadow-lg`} style={{ animationDelay: `${0.4 + (idx * 0.1)}s` }}>
                    <div className="flex flex-col md:flex-row justify-between md:items-start mb-6 gap-4">
                      <div className="flex gap-5 items-start">
                        <div className={`w-12 h-12 rounded-full ${item.bgBadge} flex items-center justify-center text-xl shrink-0 ${item.colorIcon}`}>{item.icon}</div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{item.nama}</h3>
                          <p className="text-sm text-[#A0A0B0] mt-1.5 leading-relaxed max-w-3xl">{item.desc}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 shrink-0">
                        <span className={`${item.bgBadge} ${item.textBadge} border ${item.colorBg} px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest flex items-center gap-2 uppercase`}><span className={`w-1.5 h-1.5 rounded-full ${item.bgBadge.includes('red') ? 'bg-red-400' : 'bg-orange-400'}`}></span> {item.tingkat}</span>
                        <span className="bg-[#1E1E2E] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white"></span> AKTIF</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end border-t border-[#1E1E2E] pt-5 mt-2">
                      <span className="text-[10px] text-[#6B6B80] font-bold tracking-widest font-mono border border-[#1E1E2E] px-2 py-1 rounded bg-[#0A0A12]">{item.waktu}</span>
                      <button onClick={() => handleTandaiSelesai(item.id)} className="bg-[#1E1E2E] hover:bg-[#A855F7] text-[#A0A0B0] hover:text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 active:scale-95 flex items-center gap-2">
                        Tandai Selesai <span className="text-[10px]">✓</span>
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