"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import { logoutAction } from "@/app/login/action";

// KOMPONEN CUSTOM SCROLL REVEAL (Animasi Elegan)
const ScrollRevealBox = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ================= KORDINAT PETA ANTI-NUMPUK =================
const safeRedCoords = [
    { top: '65%', left: '45%' }, 
    { top: '75%', left: '60%' }  
];

const safeBlueCoords = [
    { top: '55%', left: '75%' }, 
    { top: '58%', left: '42%' }, 
    { top: '56%', left: '35%' }, 
    { top: '26%', left: '56%' }, 
    { top: '68%', left: '48%' }, 
    { top: '60%', left: '38%' }, 
    { top: '75%', left: '50%' }  
];

const safeGreenCoords = [
    { top: '15%', left: '38%' }, 
    { top: '55%', left: '45%' }, 
    { top: '50%', left: '65%' }, 
    { top: '20%', left: '55%' }, 
    { top: '15%', left: '55%' }, 
    { top: '16%', left: '68%' }, 
    { top: '75%', left: '35%' }, 
    { top: '15%', left: '25%' }  
];

export default function FleetClient({ dataDariDatabase }: { dataDariDatabase: any[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('peta');
  const [isTabChanging, setIsTabChanging] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  // STATE MANAGEMENT CONTROL
  const [selectedArmadaShip, setSelectedArmadaShip] = useState<string | null>(null);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);
  const [selectedShip, setSelectedShip] = useState<any | null>(null);
  const [showInvestigasi, setShowInvestigasi] = useState(false);
  
  // Waktu Jogja & Statistik
  const [waktuJogja, setWaktuJogja] = useState("");
  const [tanggalJogja, setTanggalJogja] = useState("");
  const [peringatanList, setPeringatanList] = useState<any[]>([]);
  const [peringatanSelesaiHariIni, setPeringatanSelesaiHariIni] = useState(0);
  const [dynamicShips, setDynamicShips] = useState<any[]>([]);

  // =====================================================================
  // FUNGSI LOGOUT YANG MENGHANCURKAN COOKIES
  // =====================================================================
  const handleLogout = async () => {
    await logoutAction();
  };

  useEffect(() => {
    const titles: Record<string, string> = {
      'peta': 'Radar Armada | Praketrio',
      'armada': 'Data Armada | Praketrio',
      'analitik': 'Analitik Operasional | Praketrio',
      'peringatan': 'Pusat Peringatan | Praketrio'
    };
    
    document.title = titles[activeTab] || 'Fleet Shipper | Praketrio';
  }, [activeTab]);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const handleTabChange = (tab: string) => {
    if (activeTab === tab) return;
    setIsTabChanging(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsTabChanging(false);
    }, 400); 
  };

  // 1. DATA PARSING & SINKRONISASI LOGIKA
  let countHijau = 0;
  let countBiru = 0;
  let countMerah = 0;

    const shipsData = (dataDariDatabase || []).map((row, idx) => {
      let finalStatus = "BERLAYAR";
      let shipColor = "#10B981";
      let speedData = "18.4";
      let isTrouble = false;
      let finalCoord = { top: '50%', left: '50%' };

    if (row.status_kargo === "Diproses" || row.status_kargo === "Dimuat") {
        if (countMerah < 2) {
            finalStatus = "GANGGUAN TEKNIS";
            shipColor = "#EF4444"; 
            speedData = "2.1";
            isTrouble = true;
            finalCoord = safeRedCoords[countMerah % safeRedCoords.length];
            countMerah++;
        } else {
            finalStatus = "BERLAYAR";
            shipColor = "#10B981"; 
            speedData = "18.4";
            isTrouble = false; 
            finalCoord = safeGreenCoords[countHijau % safeGreenCoords.length];
            countHijau++;
        }
    } else if (row.status_kargo === "Terkirim") {
        finalStatus = "SELESAI";
        shipColor = "#3B82F6"; 
        speedData = "0.0";
        isTrouble = false;
        finalCoord = safeBlueCoords[countBiru % safeBlueCoords.length];
        countBiru++;
    } else {
        finalStatus = "BERLAYAR";
        shipColor = "#10B981"; 
        speedData = "18.4";
        isTrouble = false;
        finalCoord = safeGreenCoords[countHijau % safeGreenCoords.length];
        countHijau++;
    }

    const dateObj = new Date(row.tanggal_transaksi);
    const waktuTercatat = isNaN(dateObj.getTime()) ? "12:00 Z" : `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')} Z`;

    return {
      id: row.kode_kapal || `IMO-928012${idx}`,
      name: row.nama_kapal || "Kargo Ekspedisi",
      type: row.jenis_kapal || "Kapal Kargo Umum",
      lat: finalCoord.top.replace('%', '°S'), 
      lng: finalCoord.left.replace('%', '°E'),
      speed: speedData,
      course: "245",
      departed: waktuTercatat,
      port1: row.kota_asal || "Jakarta",
      port2: row.kota_tujuan || "Surabaya",
      top: finalCoord.top,
      left: finalCoord.left,
      color: shipColor,
      statusKargo: finalStatus,
      isTrouble: isTrouble, 
      resi: row.no_resi || "SWB-INTERNAL", 
      pengirim: row.nama_customer || "Data Tidak Tersedia",
      berat: `${row.berat_total || 0} KG`
    };
  });

  const alertShips = dynamicShips.filter(s => s.isTrouble);

  // ================= INIT SHIPS =================
  useEffect(() => {
    setDynamicShips(shipsData);
  }, [dataDariDatabase]);

  // ================= GERAK REALTIME =================
  useEffect(() => {
    if (dynamicShips.length === 0) return;

    const interval = setInterval(() => {
      setDynamicShips(prevShips =>
        prevShips.map(ship => {
          const moveAmount = ship.isTrouble ? 0.38: 0.55;
          let currentTop = parseFloat(ship.top);
          let currentLeft = parseFloat(ship.left);

          currentTop += (Math.random() - 0.5) * moveAmount;
          currentLeft += (Math.random() - 0.5) * moveAmount;

          // PEMBATASAN AREA PETA (Batas Kiri diubah ke 32 agar kapal tidak masuk ke UI kiri)
          currentTop = Math.max(10, Math.min(85, currentTop));
          currentLeft = Math.max(32, Math.min(90, currentLeft));

          return {
            ...ship,
            top: `${currentTop}%`,
            left: `${currentLeft}%`
          };
        })
      );
    }, 200);

    return () => clearInterval(interval);
  }, [dynamicShips.length]);

  // 2. LOG KAPAL REAL-TIME
  const logs = dynamicShips.map((ship, idx) => {
    let kejadianTeks = `Armada bersandar dan beroperasi optimal di pesisir ${ship.port1}.`;
    if (ship.statusKargo === "BERLAYAR") kejadianTeks = `Pelayaran laut berjalan optimal menuju ${ship.port2}. Resi: ${ship.resi}`;
    if (ship.isTrouble) kejadianTeks = `Anomali cuaca/teknis terdeteksi di laut. Kecepatan direduksi ke ${ship.speed} Knots.`;

    return {
      waktu: `2026-05-25 08:${(30 + idx).toString().padStart(2,'0')}:12`,
      id: ship.id,
      koor: `${ship.lat} ${ship.lng}`,
      kejadian: kejadianTeks,
      status: ship.statusKargo,
      color: ship.color
    };
  });

  // 3. EFFECT WAKTU JOGJA & DAFTAR PERINGATAN 
  useEffect(() => {
    const updateDateTime = () => {
        const now = new Date();
        const timeFormatter = new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Jakarta' });
        setWaktuJogja(timeFormatter.format(now) + " WIB");

        const dateFormatter = new Intl.DateTimeFormat('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' });
        setTanggalJogja(dateFormatter.format(now));
    };

    updateDateTime();
    const timerId = setInterval(updateDateTime, 1000);

    const list = alertShips.map((ship) => ({
      id: ship.id, 
      nama: ship.name,
      resi: ship.resi,
      desc: `Terdeteksi anomali pergerakan. Rute ${ship.port1} menuju ${ship.port2} tertunda.`,
      waktuPicu: 'Terdeteksi Sistem',
      tingkat: 'KRITIS',
      colorBg: 'border-red-500/50',
      colorText: 'text-red-400'
    }));
    
    setPeringatanList(list);

    return () => clearInterval(timerId);
  }, [dynamicShips]); 

  const handleTandaiSelesai = (id: string) => {
    setPeringatanList(prev => prev.filter(item => item.id !== id));
    setPeringatanSelesaiHariIni(prev => prev + 1);
  };

  // =====================================================================
  // FUNGSI UNDUH LAPORAN CSV (REAL BERDASARKAN DATABASE)
  // =====================================================================
  const handleDownloadCSV = () => {
    if (dynamicShips.length === 0) {
      alert("Data armada masih kosong, belum bisa diunduh.");
      return;
    }

    // Header CSV
    const headers = "No Resi,Nama Kapal,Kota Asal,Kota Tujuan,Status Operasional,Kecepatan (Knots),Berat\n";
    
    // Konversi Data
    const csvRows = dynamicShips.map(ship => 
      `${ship.resi},${ship.name},${ship.port1},${ship.port2},${ship.statusKargo},${ship.speed},${ship.berat}`
    ).join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + headers + csvRows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_Analitik_Fleet_${new Date().getTime()}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen bg-[#0A0A12] text-white font-sans relative overflow-x-hidden selection:bg-[#A855F7]/30 transition-opacity duration-1000 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* ================= MODAL LOG ARMADA ================= */}
      {selectedLog && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-[#13131F] border border-[#1E1E2E] p-8 rounded-2xl w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 ease-out">
                <div className="flex justify-between items-center mb-6 border-b border-[#1E1E2E] pb-4">
                    <h3 className="text-lg font-bold text-white tracking-widest uppercase flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span> Detail Log Perjalanan
                    </h3>
                    <button onClick={() => setSelectedLog(null)} className="text-[#6B6B80] hover:text-white hover:rotate-90 text-2xl transition-all duration-300">✕</button>
                </div>
                <div className="space-y-4 text-sm mb-8">
                    <div className="flex justify-between items-center border-b border-[#1E1E2E] pb-3 hover:bg-[#1A1A24] p-2 rounded transition-all duration-300 hover:pl-4">
                        <span className="text-[#6B6B80] tracking-widest text-[10px]">REGISTRASI IMO</span>
                        <span className={`font-bold font-sans px-3 py-1 bg-[#0A0A12] rounded border border-[#1E1E2E] shadow-inner ${selectedLog.color}`}>{selectedLog.id}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#1E1E2E] pb-3 hover:bg-[#1A1A24] p-2 rounded transition-all duration-300 hover:pl-4">
                        <span className="text-[#6B6B80] tracking-widest text-[10px]">WAKTU TERCATAT</span>
                        <span className="text-white font-bold">{selectedLog.waktu}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#1E1E2E] pb-3 hover:bg-[#1A1A24] p-2 rounded transition-all duration-300 hover:pl-4">
                        <span className="text-[#6B6B80] tracking-widest text-[10px]">KOORDINAT MAP</span>
                        <span className="text-blue-400 font-bold font-sans">{selectedLog.koor}</span>
                    </div>
                    <div className="bg-[#0A0A12] p-5 rounded-xl border border-[#1E1E2E] mt-6 shadow-inner transition-colors hover:border-slate-700">
                        <span className="text-[#6B6B80] tracking-widest text-[10px] block mb-2 uppercase">Catatan Aktivitas Operasional</span>
                        <p className="text-sm text-slate-300 leading-relaxed font-sans">{selectedLog.kejadian}</p>
                        <p className={`mt-4 text-[10px] font-bold tracking-widest uppercase border border-current px-2 py-1 inline-block rounded ${selectedLog.color}`}>{selectedLog.status}</p>
                    </div>
                </div>
                <button onClick={() => setSelectedLog(null)} className="w-full py-3.5 bg-[#1A1A24] hover:bg-[#202030] border border-[#1E1E2E] text-slate-300 hover:text-white rounded-xl font-bold transition-all duration-300 text-xs tracking-widest uppercase hover:-translate-y-1 hover:shadow-lg active:scale-95">Tutup Jendela Panel</button>
            </div>
        </div>
      )}

      {/* ================= MODAL INVESTIGASI TITIK MERAH ================= */}
      {showInvestigasi && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-[#13131F] border border-red-500/30 p-8 rounded-2xl w-full max-w-2xl shadow-[0_0_50px_rgba(239,68,68,0.1)] animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 ease-out">
                <div className="flex justify-between items-center mb-8 border-b border-[#1E1E2E] pb-4">
                    <h3 className="text-xl font-bold text-red-500 tracking-widest uppercase flex items-center gap-3">
                        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_#EF4444]"></span> Investigasi Titik Peringatan
                    </h3>
                    <button onClick={() => setShowInvestigasi(false)} className="text-[#6B6B80] hover:text-white hover:rotate-90 text-2xl transition-all duration-300">✕</button>
                </div>
                <div className="space-y-6 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0A0A12] p-5 rounded-xl border border-[#1E1E2E] transition-colors hover:border-slate-700">
                            <p className="text-[#6B6B80] text-[10px] mb-1 tracking-widest uppercase">Total Gangguan Terdeteksi</p>
                            <p className="font-bold text-white text-2xl font-sans">{peringatanList.length} <span className="text-sm text-slate-500 font-sans font-normal">Kapal</span></p>
                        </div>
                        <div className="bg-[#0A0A12] p-5 rounded-xl border border-[#1E1E2E] transition-colors hover:border-slate-700">
                            <p className="text-[#6B6B80] text-[10px] mb-1 tracking-widest uppercase">Prioritas Utama</p>
                            <p className="font-bold text-red-400 text-lg truncate">{peringatanList[0]?.nama || "Aman Terkendali"}</p>
                        </div>
                    </div>
                    <div className="bg-[#0A0A12] p-6 rounded-xl border border-[#1E1E2E] transition-colors hover:border-slate-700">
                        <p className="text-[#6B6B80] text-[10px] mb-3 tracking-widest uppercase">Deskripsi Pemantauan</p>
                        <p className="text-slate-300 leading-relaxed font-sans text-xs">Sistem radar satelit mendeteksi beberapa armada yang terindikasi mengalami penundaan operasional. Silakan masuk ke tab Peringatan untuk melihat daftar resi yang terdampak.</p>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* ================= NAVBAR & HEADER ================= */}
      <nav className="border-b border-[#1E1E2E] flex justify-between items-center px-8 py-5 bg-[#0A0A12]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Image 
              src="/logo.png" 
              alt="Praketrio Logo" 
              width={40} 
              height={40} 
              className="object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              priority 
            />
          </div>
          <span className="text-xl font-bold tracking-widest text-white uppercase drop-shadow-md group-hover:text-[#C084FC] transition-colors duration-500">Praketrio Radar</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-white">Superintendent Dashboard</span>
            <span className="text-[10px] text-[#A855F7] tracking-widest bg-[#A855F7]/10 px-2 py-0.5 rounded border border-[#A855F7]/30 uppercase">Fleet Shipper</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#1E1E2E] flex items-center justify-center text-[#A855F7] font-bold border border-[#A855F7]/50 text-sm shadow-inner transition-transform duration-300 hover:scale-110 cursor-pointer">FS</div>
        </div>
      </nav>

      <div className="border-b border-[#1E1E2E] flex justify-between items-center pl-8 pr-6 py-0 bg-[#13131F] sticky top-[81px] z-30 shadow-md">
        <div className="flex gap-8 text-sm font-bold tracking-widest h-full">
          {['PETA', 'ARMADA', 'ANALITIK', 'PERINGATAN'].map((tab) => (
            <button 
              key={tab}
              onClick={() => handleTabChange(tab.toLowerCase())}
              className={`py-5 transition-all duration-300 border-b-2 relative overflow-hidden ${
                activeTab === tab.toLowerCase() ? 'text-[#C084FC] border-[#A855F7]' : 'text-[#6B6B80] border-transparent hover:text-white hover:border-slate-700 hover:bg-[#1A1A24]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-6 py-3">
          <div className="flex flex-col text-right border-r border-[#1E1E2E] pr-6 hidden md:flex transition-opacity hover:opacity-80">
             <span className="text-sm font-bold text-white tracking-widest">{waktuJogja}</span>
             <span className="text-[10px] text-slate-500 font-sans">{tanggalJogja}</span>
          </div>
          
          {/* TOMBOL LOGOUT AMAN (Hancurkan Cookie) */}
          <button 
            onClick={handleLogout} 
            className="px-5 py-2.5 rounded-lg font-bold transition-all duration-300 text-center text-xs bg-red-950/20 border border-red-900/50 text-red-400 hover:text-white hover:bg-red-600 uppercase tracking-widest hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] active:scale-95"
          >
            Keluar Sistem
          </button>
        </div>
      </div>

      {/* ================= KONTEN UTAMA ================= */}
      <main className={`p-8 transition-all duration-500 ease-in-out transform ${isTabChanging ? 'opacity-0 translate-y-10 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
        
        {/* ================= TAB 1: PETA INDONESIA ================= */}
        {activeTab === 'peta' && (
          <ScrollRevealBox>
            <div className="relative w-full h-[75vh] bg-[#0A0A12] border border-[#1E1E2E] rounded-2xl overflow-hidden flex items-center justify-center shadow-[inset_0_0_100px_#0A0A12] group transition-colors duration-700 hover:border-slate-800">
              <img 
                src="/download.png" 
                alt="Peta Indonesia" 
                className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none transition-all duration-1000 group-hover:opacity-50 group-hover:scale-105"
              />
              
              <div className="absolute top-6 left-6 space-y-4 z-40 pointer-events-none">
                <div className="bg-[#0A0A12]/80 border border-[#1E1E2E] p-5 rounded-2xl backdrop-blur-md w-72 shadow-lg transition-all duration-300 hover:border-slate-700 hover:-translate-y-1 pointer-events-auto">
                  <p className="text-[10px] text-[#C084FC] font-bold mb-4 tracking-widest uppercase">Status Satelit Navigasi</p>
                  <div className="flex justify-between items-end mb-3 border-b border-[#1E1E2E] pb-3">
                    <span className="text-xs text-[#A0A0B0] font-sans">Total Titik Terkoneksi</span>
                    <span className="text-4xl text-white font-bold font-sans tracking-tighter">{dynamicShips.length}</span>
                  </div>
                </div>

                {peringatanList.length > 0 && (
                  <div className="bg-[#13131F]/90 border border-red-500/40 p-5 rounded-2xl backdrop-blur-md w-72 shadow-lg transition-all duration-300 hover:border-red-500/80 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] animate-in slide-in-from-left-4 pointer-events-auto">
                    <p className="text-[10px] text-red-400 mb-3 tracking-widest font-bold flex items-center gap-2 uppercase">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> Peringatan Terdeteksi
                    </p>
                    <p className="text-xs text-slate-300 mb-5 font-sans">{peringatanList.length} kapal mengalami masalah.</p>
                    <button onClick={() => setShowInvestigasi(true)} className="w-full bg-red-950/30 border border-red-500/50 hover:bg-red-600 text-red-400 hover:text-white text-[10px] py-2.5 rounded-lg font-bold tracking-widest transition-all duration-300 uppercase active:scale-95">Pantau Titik</button>
                  </div>
                )}
              </div>

              {/* RENDER TITIK KAPAL & NAMA (SELALU TAMPIL) */}
              {dynamicShips.map((ship, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedShip(ship)}
                  className="absolute z-10 flex flex-col items-center justify-center cursor-pointer group/ship transition-all duration-[1200ms] ease-linear hover:z-30"
                  style={{ top: ship.top, left: ship.left }}
                >
                  <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${selectedShip?.id === ship.id ? 'ring-4 ring-white scale-125' : 'group-hover/ship:scale-125'}`}
                       style={{ backgroundColor: ship.color, boxShadow: `0 0 15px ${ship.color}` }}>
                      {(ship.color === "#10B981" || ship.color === "#EF4444") && (
                          <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ backgroundColor: ship.color }} />
                      )}
                  </div>
                  <div className={`mt-2 bg-[#0A0A12]/90 backdrop-blur-md border px-2.5 py-1 text-[9px] rounded-md font-bold font-sans whitespace-nowrap shadow-xl transition-all duration-300 ${selectedShip?.id === ship.id ? 'scale-110 border-white text-white' : 'border-[#1E1E2E] text-slate-300 group-hover/ship:border-slate-500 group-hover/ship:text-white group-hover/ship:-translate-y-1'}`}>
                      {ship.name}
                  </div>
                </div>
              ))}

              {/* PANEL KANAN: DETAIL KAPAL */}
              {selectedShip && (
                  <div className="absolute top-0 right-0 h-full w-[350px] bg-[#0A0A12]/95 border-l border-[#1E1E2E] backdrop-blur-xl p-8 shadow-2xl z-50 animate-in slide-in-from-right duration-500 flex flex-col overflow-y-auto">
                      <div className="flex justify-between items-center mb-6 shrink-0">
                          <span className="bg-[#1E1E2E] text-[10px] px-3 py-1.5 rounded-md text-white font-sans tracking-widest border border-slate-700">{selectedShip.id}</span>
                          <button onClick={() => setSelectedShip(null)} className="text-[#6B6B80] hover:text-white hover:rotate-90 transition-all text-xl">✕</button>
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-1 tracking-wide" style={{ color: selectedShip.color }}>{selectedShip.name}</h2>
                      <p className="text-xs text-[#A0A0B0] mb-6 uppercase tracking-widest">{selectedShip.type}</p>

                      <div className="bg-[#13131F] border border-[#1E1E2E] p-4 rounded-xl mb-4 transition-colors hover:border-slate-700">
                          <p className="text-[10px] text-[#6B6B80] mb-2 tracking-widest font-bold">INFO LOGISTIK</p>
                          <p className="text-xs text-slate-300 mb-1">No. Resi: <span className="font-sans text-purple-400 font-bold">{selectedShip.resi}</span></p>
                          <p className="text-xs text-slate-300 mb-1">Pengirim: <span className="text-white font-medium">{selectedShip.pengirim}</span></p>
                          <p className="text-xs text-slate-300">Total Berat: <span className="text-white font-medium">{selectedShip.berat}</span></p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="bg-[#13131F] border border-[#1E1E2E] p-4 rounded-xl">
                              <p className="text-[10px] text-[#6B6B80] mb-1 tracking-widest font-bold">STATUS KARGO</p>
                              <p className="text-xs font-bold text-white font-sans">{selectedShip.statusKargo}</p>
                          </div>
                          <div className="bg-[#13131F] border border-[#1E1E2E] p-4 rounded-xl">
                              <p className="text-[10px] text-[#6B6B80] mb-1 tracking-widest font-bold">KECEPATAN</p>
                              <p className="text-sm font-bold text-white font-sans">{selectedShip.speed} KTS</p>
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

                      {selectedShip.isTrouble && (
                          <div className="mt-8 p-5 border border-red-500/50 bg-red-500/10 rounded-xl animate-pulse">
                              <p className="text-xs text-red-400 font-bold mb-2 uppercase flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> PERINGATAN GANGGUAN</p>
                              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">Kapal ini terindikasi mengalami penundaan operasional di jalur laut. Mohon segera periksa logistik terkait resi <span className="font-bold text-white">{selectedShip.resi}</span>.</p>
                          </div>
                      )}
                  </div>
              )}

              <div className="absolute bottom-6 right-6 bg-[#0A0A12]/90 border border-[#1E1E2E] p-5 rounded-2xl backdrop-blur-sm z-40 shadow-xl w-64 transition-all duration-500 hover:border-slate-700 hover:-translate-y-1">
                  <p className="text-[11px] text-slate-400 font-bold mb-4 tracking-widest border-b border-[#1E1E2E] pb-2 uppercase">Keterangan Radar</p>
                  <div className="space-y-4 text-xs text-slate-300 font-sans">
                      <div className="flex items-center gap-3 group/leg"><div className="w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981] transition-transform duration-300 group-hover/leg:scale-150"></div><span className="transition-colors group-hover/leg:text-white">Berlayar (Di Laut)</span></div>
                      <div className="flex items-center gap-3 group/leg"><div className="w-3 h-3 rounded-full bg-[#3B82F6] shadow-[0_0_10px_#3B82F6] transition-transform duration-300 group-hover/leg:scale-150"></div><span className="transition-colors group-hover/leg:text-white">Selesai (Di Pesisir)</span></div>
                      <div className="flex items-center gap-3 group/leg"><div className="w-3 h-3 rounded-full bg-[#EF4444] shadow-[0_0_10px_#EF4444] transition-transform duration-300 group-hover/leg:scale-150 animate-pulse"></div><span className="transition-colors group-hover/leg:text-white">Peringatan (Gangguan)</span></div>
                  </div>
              </div>
            </div>
          </ScrollRevealBox>
        )}

        {/* ================= TAB 2: ARMADA ================= */}
        {activeTab === 'armada' && (
          <div className="space-y-8 w-full max-w-7xl mx-auto">
            <ScrollRevealBox delay={100}>
              <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 shadow-xl transition-colors duration-500 hover:border-slate-800">
                <div className="flex justify-between items-center mb-8 border-b border-[#1E1E2E] pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Monitoring Armada Aktif</h2>
                  </div>
                  <div className="text-right transition-transform hover:scale-105 cursor-default">
                      <p className="text-3xl font-bold text-white font-sans">{dynamicShips.length}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Kapal Terdata</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dynamicShips.map((ship, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setSelectedArmadaShip(ship.id);
                        const targetLog = logs.find(l => l.id === ship.id);
                        if (targetLog) setSelectedLog(targetLog);
                      }}
                      className="bg-[#1A1A24] border-l-4 p-6 rounded-r-2xl border-y border-r border-[#1E1E2E] transition-all duration-300 ease-out cursor-pointer group hover:bg-[#20202d] hover:-translate-y-2 hover:shadow-xl"
                      style={{ borderLeftColor: ship.color }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-0.5 truncate max-w-[150px] group-hover:text-purple-400 transition-colors">{ship.name}</h3>
                          <p className="text-[10px] text-[#6B6B80] tracking-widest font-sans">{ship.id}</p>
                        </div>
                        <span className="text-[9px] px-2.5 py-1 rounded font-bold uppercase border transition-transform group-hover:scale-105" style={{ color: ship.color, backgroundColor: `${ship.color}15`, borderColor: `${ship.color}30`}}>
                          {ship.statusKargo}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs mb-4 border-t border-[#1E1E2E] pt-4">
                        <div>
                          <p className="text-[#6B6B80] text-[10px] mb-0.5 tracking-widest">CUSTOMER</p>
                          <p className="text-white font-medium text-[11px] truncate font-sans">{ship.pengirim}</p>
                        </div>
                        <div>
                          <p className="text-[#6B6B80] text-[10px] mb-0.5 tracking-widest">NO RESI</p>
                          <p className="text-purple-400 font-bold font-sans text-[11px] truncate">{ship.resi}</p>
                        </div>
                      </div>
                      <div className="bg-[#0A0A12] p-3 rounded-xl flex justify-between items-center text-xs border border-[#1E1E2E] transition-colors group-hover:border-slate-700">
                        <div>
                          <p className="text-[#6B6B80] text-[10px] mb-0.5 tracking-widest">RUTE LINTASAN</p>
                          <p className="text-slate-300 text-[11px] font-sans truncate">{ship.port1} → {ship.port2}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[#6B6B80] text-[10px] mb-0.5 tracking-widest">BERAT</p>
                           <p className="text-white font-bold text-[11px] font-sans">{ship.berat}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollRevealBox>

            <ScrollRevealBox delay={300}>
              <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 shadow-xl hover:border-slate-800 transition-colors">
                <div className="flex justify-between items-end mb-6">
                  <h2 className="text-lg font-bold tracking-widest text-white uppercase">Tabel Log Kapal</h2>
                  <p className="text-[11px] text-[#6B6B80] font-sans">Data transmisi radar otomatis</p>
                </div>
                <div className="w-full text-sm text-left">
                  <div className="grid grid-cols-5 text-[#6B6B80] border-b border-[#1E1E2E] pb-4 mb-3 text-[10px] font-bold tracking-widest uppercase bg-[#1A1A24] p-4 rounded-t-xl">
                    <div className="px-2">Waktu Catat</div><div>ID Kapal</div><div>Koordinat Map</div><div className="col-span-2">Aktivitas Operasional</div>
                  </div>
                  <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {logs.map((log, idx) => (
                      <div key={idx} onClick={() => setSelectedLog(log)} className="grid grid-cols-5 py-3.5 px-6 rounded-xl bg-[#1A1A24] transition-all duration-300 cursor-pointer items-center hover:-translate-y-0.5 hover:bg-[#202030] hover:shadow-lg border border-transparent hover:border-slate-700">
                        <div className="text-[#A0A0B0] font-sans text-[11px] flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${log.color === 'text-[#EF4444]' ? 'bg-red-500 animate-pulse' : log.color === 'text-[#10B981]' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                          {log.waktu}
                        </div>
                        <div className="text-slate-300 font-bold font-sans text-[11px]">{log.id}</div>
                        <div className="text-[#6B6B80] text-[11px] font-sans">{log.koor}</div>
                        <div className="text-white text-xs col-span-2 flex justify-between gap-4">
                          <span className="font-sans truncate text-slate-300">{log.kejadian}</span>
                          <span className={`text-[9px] font-bold tracking-widest whitespace-nowrap px-2 py-0.5 rounded border ${log.color.replace('text-','bg-')}/10 ${log.color.replace('text-','border-')}/30 ${log.color}`}>{log.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollRevealBox>
          </div>
        )}

        {/* ================= TAB 3: ANALITIK (NAMA BARU & DIAGRAM BATANG) ================= */}
        {activeTab === 'analitik' && (
          <div className="space-y-8 w-full max-w-7xl mx-auto font-sans">
            <ScrollRevealBox delay={100}>
                <div className="flex justify-between items-center bg-[#13131F] p-6 rounded-2xl border border-[#1E1E2E] shadow-lg transition-colors duration-500 hover:border-slate-800">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Ringkasan Eksekutif Operasional</h2>
                        <p className="text-sm text-[#A0A0B0] mt-1">Kompilasi metrik utama performa armada saat ini</p>
                    </div>
                    {/* TOMBOL UNDUH CSV YANG BERFUNGSI */}
                    <button 
                      onClick={handleDownloadCSV} 
                      className="bg-[#1A1A24] border border-[#1E1E2E] hover:border-purple-500/50 text-slate-300 hover:text-white px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 uppercase tracking-widest shadow-lg hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(168,85,247,0.2)] active:scale-95"
                    >
                        Unduh Data Laporan
                    </button>
                </div>
            </ScrollRevealBox>

            <ScrollRevealBox delay={200}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
                {[
                    { label: 'TOTAL ARMADA AKTIF', val: dynamicShips.length, tag: 'OPS', color: 'text-slate-100 border-slate-700/50 bg-[#1A1A24]' },
                    { label: 'KAPAL SEDANG BERLAYAR', val: dynamicShips.filter(s => s.statusKargo === "BERLAYAR").length, tag: 'NAV', color: 'text-green-400 border-green-500/30 bg-green-950/10' },
                    { label: 'PERLU TINDAKAN (LAUT)', val: alertShips.length, tag: 'SOS', color: 'text-red-400 border-red-500/30 bg-red-950/10' },
                    { label: 'STATUS DI PELABUHAN', val: dynamicShips.filter(s => s.statusKargo === "SELESAI").length, tag: 'PRT', color: 'text-blue-400 border-blue-500/30 bg-blue-950/10' },
                ].map((stat, idx) => (
                    <div key={idx} className={`border p-6 rounded-2xl shadow-xl relative overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${stat.color}`}>
                    <div className="absolute right-4 top-4 text-3xl font-black opacity-5 tracking-tighter group-hover:scale-125 transition-all">{stat.tag}</div>
                    <div className="relative z-10 space-y-3">
                        <p className="text-[10px] text-[#A0A0B0] tracking-widest font-bold uppercase">{stat.label}</p>
                        <p className="text-5xl font-extrabold tracking-tight">{stat.val.toString().padStart(2,'0')}</p>
                    </div>
                    </div>
                ))}
                </div>
            </ScrollRevealBox>

            <ScrollRevealBox delay={400}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
                    <div className="lg:col-span-2 bg-[#13131F] border border-[#1E1E2E] p-8 rounded-2xl shadow-lg transition-colors duration-500 hover:border-slate-800 flex flex-col">
                        <h3 className="text-sm font-bold tracking-widest text-slate-300 uppercase border-b border-[#1E1E2E] pb-4">Distribusi Status Operasional (Visual Radar)</h3>
                        
                        {/* CHART BAR VERTIKAL KEREN PENGGANTI BAR HORIZONTAL LAMA */}
                        <div className="flex-1 mt-8 mb-4">
                           <div className="flex justify-around items-end h-64 border-b border-l border-[#1E1E2E] p-4 relative w-full">
                               {/* Garis Latar Y-Axis */}
                               <div className="absolute top-0 left-0 w-full border-t border-[#1E1E2E]/50 border-dashed"></div>
                               <div className="absolute top-1/3 left-0 w-full border-t border-[#1E1E2E]/50 border-dashed"></div>
                               <div className="absolute top-2/3 left-0 w-full border-t border-[#1E1E2E]/50 border-dashed"></div>

                               {[
                                   { label: 'BERLAYAR', count: dynamicShips.filter(s => s.statusKargo === "BERLAYAR").length, color: 'bg-[#10B981]', shadow: 'shadow-[0_0_20px_#10B981]' },
                                   { label: 'SELESAI', count: dynamicShips.filter(s => s.statusKargo === "SELESAI").length, color: 'bg-[#3B82F6]', shadow: 'shadow-[0_0_20px_#3B82F6]' },
                                   { label: 'GANGGUAN', count: alertShips.length, color: 'bg-[#EF4444]', shadow: 'shadow-[0_0_20px_#EF4444]' },
                               ].map((item, i) => {
                                   const percentage = dynamicShips.length > 0 ? Math.round((item.count / dynamicShips.length) * 100) : 0;
                                   return (
                                       <div key={i} className="flex flex-col items-center group w-1/4 z-10 h-full justify-end">
                                           <span className="text-white font-bold text-lg mb-2 opacity-50 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:-translate-y-1">{item.count}</span>
                                           <div className="w-full bg-[#0A0A12] rounded-t-lg overflow-hidden border border-[#1E1E2E] flex items-end relative" style={{ height: `${Math.max(percentage, 5)}%` }}>
                                                {/* Batang Chart dengan Animasi */}
                                                <div className={`w-full ${item.color} rounded-t-lg transition-all duration-1000 ease-out opacity-80 group-hover:opacity-100 group-hover:${item.shadow} h-full`}></div>
                                           </div>
                                           <span className="text-[10px] text-[#A0A0B0] font-bold tracking-widest mt-4 group-hover:text-white transition-colors">{item.label} ({percentage}%)</span>
                                       </div>
                                   )
                               })}
                           </div>
                        </div>
                    </div>
                    
                    {/* PANEL KAPASITAS UTILISASI */}
                    <div className="bg-[#13131F] border border-[#1E1E2E] p-8 rounded-2xl shadow-lg flex flex-col justify-between transition-colors duration-500 hover:border-slate-800 group">
                        <div>
                            <h3 className="text-sm font-bold tracking-widest text-slate-300 mb-6 border-b border-[#1E1E2E] pb-4 uppercase">Efisiensi Utilisasi Armada</h3>
                            <p className="text-6xl font-extrabold text-purple-400 tracking-tighter transition-transform duration-500 ease-out origin-left group-hover:scale-105">87<span className="text-2xl text-slate-500">%</span></p>
                            <p className="text-xs text-slate-400 mt-4 leading-relaxed font-sans">Tingkat efisiensi kapasitas muatan berdasarkan pergerakan rute logistik saat ini.</p>
                        </div>
                        
                        <div className="mt-8 space-y-3 font-sans">
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>Target Utilisasi</span>
                                <span className="text-white font-bold">85%</span>
                            </div>
                            <div className="w-full bg-[#0A0A12] h-1.5 rounded-full overflow-hidden border border-[#1E1E2E]">
                                <div className="bg-purple-500 h-full rounded-full w-[87%] transition-all duration-1000 ease-out shadow-[0_0_8px_#A855F7]"></div>
                            </div>
                        </div>

                        <button 
                          onClick={() => handleTabChange('peta')} 
                          className="w-full mt-6 py-3.5 bg-[#1A1A24] border border-[#1E1E2E] hover:border-purple-500/50 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all duration-300 uppercase tracking-widest hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(168,85,247,0.15)] active:scale-95"
                        >
                          Lihat Detail Rute Peta
                        </button>
                    </div>
                </div>
            </ScrollRevealBox>
          </div>
        )}

        {/* ================= TAB 4: PERINGATAN ================= */}
        {activeTab === 'peringatan' && (
          <div className="space-y-8 w-full max-w-7xl mx-auto font-sans">
            <ScrollRevealBox delay={100}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#13131F] p-7 rounded-2xl border border-[#1E1E2E] shadow-lg gap-4 transition-colors duration-500 hover:border-slate-800">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Pusat Resolusi Masalah Laut</h2>
                    <p className="text-sm text-[#A0A0B0] mt-1">Daftar armada yang mengalami kendala teknis atau rute saat berlayar.</p>
                </div>
                </div>
            </ScrollRevealBox>

            <ScrollRevealBox delay={200}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
                    {[
                        { label: 'PERINGATAN AKTIF SAAT INI', val: peringatanList.length, color: 'border-red-500/30 bg-red-950/20', textColor: 'text-red-400' },
                        { label: 'TERSELESAIKAN HARI INI', val: peringatanSelesaiHariIni, color: 'border-green-500/30 bg-green-950/20', textColor: 'text-green-400' },
                    ].map((card, i) => (
                        <div key={i} className={`border p-6 rounded-2xl shadow-xl flex items-center justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${card.color}`}>
                            <div>
                                <p className="text-[10px] text-[#A0A0B0] tracking-widest font-bold uppercase mb-2">{card.label}</p>
                                <p className={`text-5xl font-extrabold tracking-tight ${card.textColor}`}>{card.val.toString().padStart(2,'0')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollRevealBox>

            <ScrollRevealBox delay={400}>
                <div className="space-y-5">
                {peringatanList.length === 0 ? (
                    <div className="text-center py-24 bg-[#13131F] border border-dashed border-[#1E1E2E] rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-green-500/50 hover:bg-[#151520] hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                        <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_15px_#10B981] animate-pulse"></div>
                        <p className="font-bold text-xl text-white mt-2">Perairan Aman Terkendali</p>
                        <p className="text-[#A0A0B0] text-sm max-w-md leading-relaxed">Tidak ada peringatan aktif saat ini. Seluruh armada beroperasi sesuai jadwal tanpa kendala alam maupun teknis.</p>
                    </div>
                ) : (
                    peringatanList.map((item) => (
                    <div key={item.id} className="bg-[#13131F] border border-red-500/50 rounded-2xl p-6 transition-all duration-300 hover:bg-[#1A1A24] flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative overflow-hidden hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:-translate-y-1">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                        <div className="flex gap-5 items-center flex-1 pr-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#EF4444]"></div>
                                <h3 className="text-lg font-bold text-white tracking-tight">{item.nama}</h3>
                                <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase">{item.tingkat}</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-3xl">{item.desc}</p>
                            <p className="text-[10px] text-[#6B6B80] font-sans pt-2">Deteksi: {item.waktuPicu} | Info Resi: <span className="text-slate-300 font-bold">{item.resi}</span></p>
                        </div>
                        </div>
                        <div className="shrink-0 w-full md:w-auto border-t md:border-t-0 border-[#1E1E2E] pt-4 md:pt-0">
                        <button onClick={() => handleTandaiSelesai(item.id)} className="w-full md:w-auto bg-[#1A1A24] hover:bg-green-900/30 border border-[#1E1E2E] hover:border-green-500/50 text-slate-400 hover:text-green-400 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:-translate-y-1">
                            Tandai Selesai
                        </button>
                        </div>
                    </div>
                    ))
                )}
                </div>
            </ScrollRevealBox>
          </div>
        )}
      </main>
    </div>
  );
}