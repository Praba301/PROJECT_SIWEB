"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function FleetSuperintendentDashboard() {
  const [activeTab, setActiveTab] = useState('armada');

  return (
    <div className="min-h-screen bg-[#0a0813] text-[#f3f4f6] font-mono">
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
        
        {/* ================= TAB 1: ARMADA ================= */}
        {activeTab === 'armada' && (
          <div className="space-y-8 w-full max-w-7xl mx-auto animate-fade-in">
            {/* DAFTAR KAPAL */}
            <div className="bg-[#100e23] border border-[#2a244d] rounded-2xl p-8 shadow-[0_0_20px_rgba(181,98,255,0.1)] hover:border-[#b562ff]/50 transition-colors">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-gray-400 tracking-widest">DAFTAR KAPAL</h2>
                <div className="bg-[#0a0813] border border-[#2a244d] px-4 py-2 rounded-lg flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_5px_white]"></div>
                  <div className="text-xs text-gray-400">TOTAL KAPAL AKTIF<br/><span className="text-lg text-white font-bold">24 / 28</span></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {/* Kapal 1 */}
                <div className="bg-[#161230] border-l-4 border-l-[#b562ff] p-6 rounded-r-xl border-y border-r border-[#2a244d] hover:shadow-[0_0_15px_rgba(181,98,255,0.2)] transition-all">
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
                <div className="bg-[#161230] border-l-4 border-l-[#b562ff] p-6 rounded-r-xl border-y border-r border-[#2a244d] hover:shadow-[0_0_15px_rgba(181,98,255,0.2)] transition-all">
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
                <div className="bg-[#161230] border-l-4 border-l-orange-500 p-6 rounded-r-xl border-y border-r border-[#2a244d] hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all">
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
            <div className="bg-[#100e23] border border-[#2a244d] rounded-2xl p-8 shadow-[0_0_20px_rgba(181,98,255,0.1)] hover:border-[#b562ff]/50 transition-colors">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><span>⏱</span> LOG PERJALANAN TERBARU</h2>
              <div className="w-full text-sm text-left border-collapse">
                <div className="grid grid-cols-5 text-gray-500 border-b border-[#2a244d] pb-4 mb-4 text-xs tracking-widest">
                  <div>WAKTU</div><div>ARMADA ID</div><div>KOORDINAT</div><div className="col-span-2">KEJADIAN / STATUS</div>
                </div>
                <div className="space-y-2">
                  {[
                    { waktu: '2024-05-20 08:14:22', id: 'VSL-992-A', koor: "01°16'S 103°50'E", kejadian: 'Memasuki Selat Singapura', status: 'OPTIMAL', color: 'text-gray-300' },
                    { waktu: '2024-05-20 07:45:10', id: 'VSL-104-C', koor: "05°55'S 105°59'E", kejadian: 'Sandar di Dermaga 4', status: 'SELESAI', color: 'text-[#b562ff]' },
                    { waktu: '2024-05-20 06:30:00', id: 'VSL-402-M', koor: "07°12'S 112°44'E", kejadian: 'Peringatan Sistem Radar', status: 'PERINGATAN', color: 'text-orange-400', bg: 'bg-red-900/20 rounded-lg' },
                    { waktu: '2024-05-20 05:15:44', id: 'VSL-992-A', koor: "02°05'S 104°45'E", kejadian: 'Meninggalkan Perairan Kep. Riau', status: 'OPTIMAL', color: 'text-gray-300' },
                  ].map((log, idx) => (
                    <div key={idx} className={`grid grid-cols-5 py-3 px-2 border-b border-[#2a244d]/50 hover:bg-[#2a244d]/30 transition-colors cursor-pointer ${log.bg || ''}`}>
                      <div className="text-gray-400">{log.waktu}</div>
                      <div className={log.color}>{log.id}</div>
                      <div className="text-gray-400">{log.koor}</div>
                      <div className="text-gray-300">{log.kejadian}</div>
                      <div className={log.color}>{log.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PETA ================= */}
        {activeTab === 'peta' && (
          <div className="relative w-full h-[75vh] bg-[#1a1c29] border border-[#2a244d] rounded-2xl overflow-hidden flex items-center justify-center bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center bg-no-repeat opacity-90 shadow-[inset_0_0_100px_#0a0813] animate-fade-in">
            
            {/* OVERLAY KIRI ATAS (Status & Peringatan) */}
            <div className="absolute top-6 left-6 space-y-4 z-10">
              <div className="bg-[#100e23]/90 border border-[#00e5ff] p-4 rounded-xl backdrop-blur-sm w-64 shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all">
                <p className="text-xs text-gray-400 mb-4 tracking-widest">STATUS OPERASIONAL</p>
                <div className="flex justify-between items-end mb-2"><span className="text-sm">Total Aktif</span><span className="text-3xl text-[#00e5ff] font-bold">142</span></div>
                <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Dalam Perjalanan</span><span>118</span></div>
                <div className="flex justify-between text-xs text-gray-400"><span>Sandar</span><span>24</span></div>
              </div>
              <div className="bg-red-900/60 border border-red-500 p-4 rounded-xl backdrop-blur-md w-64 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all">
                <p className="text-xs text-red-400 mb-4 tracking-widest font-bold flex items-center gap-2"><span className="animate-pulse">✽</span> PERINGATAN REAL-TIME</p>
                <p className="text-[10px] text-gray-300 mb-1">ERR-4029 • MESIN UTAMA</p>
                <p className="text-sm text-white mb-4">Penurunan tekanan oli terdeteksi pada KM. KRAKATAU.</p>
                <button className="w-full bg-red-600 hover:bg-red-500 text-white text-xs py-2 rounded transition-all font-bold">INVESTIGASI</button>
              </div>
            </div>

            {/* OVERLAY KANAN (DETAIL KAPAL) */}
            <div className="absolute top-0 right-0 h-full w-80 bg-[#100e23]/95 border-l border-[#2a244d] backdrop-blur-md p-6 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-10">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-[#2a244d] text-[10px] px-2 py-1 rounded">ID: VSL-8832</span>
                <button className="text-gray-400 hover:text-white hover:rotate-90 transition-all text-xl">✕</button>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">KM. NUSANTARA</h2>
              <p className="text-xs text-gray-400 mb-8">Kapal Kargo Kontainer</p>

              <div className="bg-[#0a0813] border border-[#2a244d] p-4 rounded-xl mb-6 hover:border-[#b562ff] transition-colors">
                <p className="text-[10px] text-gray-500 mb-3 tracking-widest">KOORDINAT PRESISI</p>
                <div className="flex justify-between text-sm">
                  <div><p className="text-gray-500 text-[10px]">LAT</p><p>05°45'12" S</p></div>
                  <div><p className="text-gray-500 text-[10px]">LONG</p><p>106°50'34" E</p></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#0a0813] border border-[#2a244d] p-4 rounded-xl hover:border-[#00e5ff] transition-colors">
                  <p className="text-[10px] text-gray-500 mb-1">KECEPATAN</p>
                  <p className="text-xl font-bold">18.4 <span className="text-[10px] text-gray-400 font-normal">KNOTS</span></p>
                </div>
                <div className="bg-[#0a0813] border border-[#2a244d] p-4 rounded-xl hover:border-[#00e5ff] transition-colors">
                  <p className="text-[10px] text-gray-500 mb-1">HALUAN</p>
                  <p className="text-xl font-bold">245 <span className="text-[10px] text-gray-400 font-normal">DEG</span></p>
                </div>
              </div>

              <p className="text-[10px] text-gray-500 mb-4 tracking-widest">RUTE & ESTIMASI</p>
              <div className="relative pl-4 border-l border-gray-600 space-y-6">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 border-2 border-gray-500 bg-[#100e23] rounded-full"></div>
                  <p className="text-xs text-gray-400 mb-1">DEPARTED 12:00 Z</p>
                  <p className="text-sm">Pelabuhan Tanjung Priok</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-[#00e5ff] rounded-full shadow-[0_0_8px_#00e5ff] animate-pulse"></div>
                  <p className="text-xs text-[#00e5ff] mb-1">ETA 18:30 Z</p>
                  <p className="text-sm">Pelabuhan Merak</p>
                </div>
              </div>
            </div>

            {/* Titik Peta (Mockup) */}
            <div className="absolute top-[40%] left-[40%] w-3 h-3 bg-[#00e5ff] rounded-full shadow-[0_0_15px_#00e5ff] animate-pulse z-0"></div>
            <div className="absolute top-[50%] left-[45%] w-3 h-3 bg-[#b562ff] rounded-full shadow-[0_0_15px_#b562ff] z-0">
               <div className="absolute -bottom-8 -left-16 bg-[#100e23]/80 border border-[#b562ff] px-2 py-1 text-[10px] rounded whitespace-nowrap">KM. NUSANTARA - SELECTED</div>
            </div>
            <div className="absolute top-[65%] left-[25%] text-red-500 text-xl font-bold drop-shadow-[0_0_5px_red] z-0 animate-bounce">⚠</div>

            {/* LEGENDA KIRI BAWAH */}
            <div className="absolute bottom-6 left-6 bg-[#100e23]/90 border border-[#2a244d] p-4 rounded-xl backdrop-blur-sm z-10">
              <p className="text-xs font-bold mb-3">Keterangan</p>
              <div className="flex gap-4 text-[10px] text-gray-400">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00e5ff]"></div> Berlayar</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#b562ff]"></div> Di Pelabuhan</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Terlambat</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Maintenance</div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ANALISIS ================= */}
        {activeTab === 'analisis' && (
          <div className="space-y-6 w-full max-w-7xl mx-auto animate-fade-in">
            <div className="flex justify-end mb-4">
              <button className="bg-[#b562ff] text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-[#9b4ae0] transition-colors shadow-[0_0_15px_rgba(181,98,255,0.4)] hover:shadow-[0_0_20px_rgba(181,98,255,0.6)]">UNDUH LAPORAN</button>
            </div>

            {/* 4 Cards Atas */}
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

            {/* Area Grafik & Analisis */}
            <div className="grid grid-cols-3 gap-6">
              {/* Kolom Kiri: Progress Bars (2 Kolom) */}
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

              {/* Kolom Kanan: Line Chart & List Analisis */}
              <div className="col-span-1 space-y-6">
                <div className="bg-[#100e23] border border-[#2a244d] p-6 rounded-xl shadow-[0_0_15px_rgba(181,98,255,0.05)] hover:border-[#b562ff]/50 transition-colors">
                  <p className="text-xs font-bold tracking-widest mb-6 text-white">KONSUMSI BAHAN BAKAR</p>
                  <div className="h-32 border-b border-l border-[#2a244d] flex items-end relative">
                     {/* SVG Wave Mockup */}
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
                  <span className="text-xs text-red-400 font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_red]"></div> 3 PERINGATAN AKTIF</span>
                </div>
              </div>
              <p className="text-sm font-bold text-gray-400 tracking-widest">SISTEM STATUS: <span className="text-[#00e5ff] font-normal drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]">ONLINE</span></p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-[#100e23] border border-red-500 p-6 rounded-xl shadow-[inset_0_0_20px_rgba(239,68,68,0.1)] flex flex-col justify-between h-32 relative hover:shadow-[inset_0_0_30px_rgba(239,68,68,0.2)] transition-shadow">
                <p className="text-sm font-bold tracking-widest text-white">PERINGATAN AKTIF</p>
                <p className="text-3xl font-bold text-white">3</p>
                <div className="absolute right-6 bottom-6 text-red-500 text-4xl font-light">⚠</div>
              </div>
              <div className="bg-[#100e23] border border-[#00e5ff] p-6 rounded-xl shadow-[inset_0_0_20px_rgba(0,229,255,0.05)] flex flex-col justify-between h-32 relative hover:shadow-[inset_0_0_30px_rgba(0,229,255,0.1)] transition-shadow">
                <p className="text-sm font-bold tracking-widest text-white">SELESAI HARI INI</p>
                <p className="text-3xl font-bold text-white">5</p>
                <div className="absolute right-6 bottom-6 w-8 h-8 rounded-full border-2 border-[#00e5ff] flex items-center justify-center text-[#00e5ff] font-bold">✓</div>
              </div>
              <div className="bg-[#100e23] border border-[#1a5cff] p-6 rounded-xl shadow-[inset_0_0_20px_rgba(26,92,255,0.05)] flex flex-col justify-between h-32 relative hover:shadow-[inset_0_0_30px_rgba(26,92,255,0.1)] transition-shadow">
                <p className="text-sm font-bold tracking-widest text-white">TOTAL PERINGATAN HARI INI</p>
                <p className="text-3xl font-bold text-white">3</p>
                <div className="absolute right-6 bottom-6 w-8 h-8 rounded-full border-2 border-[#1a5cff] flex items-center justify-center text-[#1a5cff] font-serif italic">i</div>
              </div>
            </div>

            {/* List Peringatan */}
            <div className="space-y-6">
              {/* Alert 1 (Tinggi) */}
              <div className="bg-[#100e23] border border-red-500 rounded-xl p-6 shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:bg-[#161230] transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <span className="text-4xl text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">☁</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">MV Jaya</h3>
                      <p className="text-xs text-gray-300 mt-4 leading-relaxed">Keterlambatan estimasi 2 jam karena cuaca buruk di Laut Jawa Sulawesi</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-red-900/80 text-red-300 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-red-500/50"><div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_red]"></div> Tinggi</span>
                    <span className="bg-[#1a5cff]/30 text-[#66a1ff] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-[#1a5cff]/50"><div className="w-2 h-2 rounded-full bg-[#66a1ff]"></div> Aktif</span>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-[#2a244d] pt-4">
                  <span className="text-[10px] text-gray-500 font-bold">2026-04-05 16:25:12</span>
                  <button className="border border-[#2a244d] bg-[#0a0813] text-gray-300 hover:text-white hover:border-[#b562ff] hover:shadow-[0_0_10px_rgba(181,98,255,0.3)] px-6 py-2 rounded text-xs font-bold transition-all">Tandai Selesai</button>
                </div>
              </div>

              {/* Alert 2 (Sedang) */}
              <div className="bg-[#100e23] border border-[#1a5cff] rounded-xl p-6 shadow-[0_0_20px_rgba(26,92,255,0.15)] hover:bg-[#161230] transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <span className="text-4xl text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">🔧</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">MV Siliwangi</h3>
                      <p className="text-xs text-gray-300 mt-4 leading-relaxed">Maintenance utama dimulai - kapal berlabuh di kepulauan Batam</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-orange-900/60 text-orange-300 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-orange-500/50"><div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_5px_orange]"></div> Sedang</span>
                    <span className="bg-[#1a5cff]/30 text-[#66a1ff] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-[#1a5cff]/50"><div className="w-2 h-2 rounded-full bg-[#66a1ff]"></div> Aktif</span>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-[#2a244d] pt-4">
                  <span className="text-[10px] text-gray-500 font-bold">2026-04-06 12:42:26</span>
                  <button className="border border-[#2a244d] bg-[#0a0813] text-gray-300 hover:text-white hover:border-[#b562ff] hover:shadow-[0_0_10px_rgba(181,98,255,0.3)] px-6 py-2 rounded text-xs font-bold transition-all">Tandai Selesai</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}