"use client";
import { useState, useEffect } from "react";

export default function ArmadaClient({ dataDariDatabase }: { dataDariDatabase: any[] }) {
  const [selectedShip, setSelectedShip] = useState<any>(null);
  const [animateProgress, setAnimateProgress] = useState(false);

  // Mapping data dari hasil JOIN database terbaru
  const armadaData = dataDariDatabase.map((dbShip, index) => {
    const colors = [
      "from-[#A855F7] to-[#C084FC]",
      "from-[#3B82F6] to-[#60A5FA]",
      "from-[#F59E0B] to-[#FCD34D]",
      "from-[#22C55E] to-[#4ADE80]"
    ];

    return {
      id: dbShip.id,
      name: dbShip.nama_kapal || "Kapal Tidak Diketahui",
      type: dbShip.jenis_kapal || "Kapal Kargo Umum",
      kode: dbShip.kode_kapal || `VSL-00${index + 1}`,
      route: (dbShip.kota_asal && dbShip.kota_tujuan) ? `${dbShip.kota_asal} ➔ ${dbShip.kota_tujuan}` : "Menunggu Rute",
      muatan: dbShip.kapasitas_muatan ? parseInt(dbShip.kapasitas_muatan) : (45 + (index * 5 > 50 ? 20 : index * 5)),
      statusKapal: dbShip.status_kapal || "Siap Berlayar",
      statusKargo: dbShip.status_kargo || "Diproses",
      jenisBarang: dbShip.jenis_barang || "General Cargo",
      beratTotal: dbShip.berat_total ? `${dbShip.berat_total} KG` : "0 KG",
      barColor: colors[index % colors.length]
    };
  });

  // Mencegah background bisa di-scroll saat pop-up terbuka
  useEffect(() => {
    if (selectedShip) {
      setAnimateProgress(false);
      document.body.style.overflow = 'hidden'; 
      setTimeout(() => setAnimateProgress(true), 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedShip]);

  return (
    <div className="flex flex-col h-full gap-8 relative pb-10">
      
      {/* Header */}
      <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h1 className="text-3xl font-bold text-white tracking-wide">Data Armada Kapal</h1>
        <p className="text-[#A0A0B0] text-sm mt-1">Pantau status, rute, dan kapasitas muatan kapal secara real-time.</p>
      </div>

      {/* Grid Kartu Kapal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {armadaData.map((ship, index) => {
          return (
            <div 
              key={ship.id} 
              onClick={() => setSelectedShip(ship)}
              className="group bg-[#13131F] p-6 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden opacity-0 animate-slide-left border border-[#1E1E2E] hover:border-[#A855F7]/50 hover:bg-[#1A1A24] hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
            >
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="font-bold text-xl text-white group-hover:text-[#A855F7] transition-colors duration-300">
                    {ship.name}
                  </h3>
                  <p className="text-[#A0A0B0] text-xs font-sans uppercase tracking-wider mt-1">{ship.kode} - {ship.type}</p>
                  <p className="text-[#6B6B80] text-sm mt-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {ship.route}
                  </p>
                </div>
                <span className="px-3 py-1.5 rounded-md text-xs font-bold tracking-wide shadow-sm flex items-center gap-2 bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20">
                  <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse-glow" />
                  {ship.statusKapal}
                </span>
              </div>
              
              <div className="mt-auto relative z-10">
                <div className="flex justify-between text-xs text-[#A0A0B0] mb-2 font-medium">
                  <span>Kapasitas Muatan</span>
                  <span>{ship.muatan}%</span>
                </div>
                <div className="w-full h-2.5 bg-[#1E1E2E] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${ship.barColor} transition-all duration-1000 ease-out`} 
                    style={{ width: `${ship.muatan}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* POP-UP MODAL DETAIL KAPAL */}
      {selectedShip && (
        <>
          <style>{`
            @keyframes modalBackdropFade {
              from { opacity: 0; backdrop-filter: blur(0px); }
              to { opacity: 1; backdrop-filter: blur(4px); }
            }
            @keyframes modalContentZoom {
              from { opacity: 0; transform: scale(0.95) translateY(15px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
            .anim-modal-bg {
              animation: modalBackdropFade 0.3s ease-out forwards;
            }
            .anim-modal-box {
              animation: modalContentZoom 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}</style>

          <div 
            className="anim-modal-bg fixed inset-0 z-[100] flex items-center justify-center bg-[#070712]/80 p-4"
            onClick={() => setSelectedShip(null)} 
          >
            <div 
              className="anim-modal-box bg-[#13131F] border border-[#A855F7]/30 rounded-2xl p-6 md:p-8 relative shadow-[0_20px_50px_rgba(168,85,247,0.2)] w-full max-w-4xl overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-[#A855F7] before:to-[#C084FC]"
              onClick={(e) => e.stopPropagation()} 
            >
              
              <button 
                onClick={() => setSelectedShip(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 flex items-center justify-center rounded-full bg-[#1E1E2E] text-[#A0A0B0] hover:text-white hover:bg-red-500 hover:rotate-90 transition-all duration-300 z-10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              
              <div className="flex items-center gap-4 mb-8 pr-10">
                <div className="w-12 h-12 rounded-xl bg-[#A855F7]/10 flex items-center justify-center border border-[#A855F7]/20 shrink-0">
                  <svg className="w-6 h-6 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                </div>
                <div className="overflow-hidden">
                  <h2 className="text-[#C084FC] text-xl md:text-2xl font-bold truncate">{selectedShip.name}</h2>
                  <p className="text-[#A0A0B0] text-xs md:text-sm mt-1 truncate">Kode: {selectedShip.kode} • {selectedShip.type}</p>
                </div>
              </div>
              
              {/* Grid diubah menjadi 2 Kolom agar Kotak jauh lebih lebar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                
                {/* 1. Rute Pelayaran */}
                <div className="bg-[#0A0A12] p-4 rounded-xl border border-[#1E1E2E]">
                  <p className="text-[11px] uppercase tracking-wider text-[#6B6B80] mb-2">Rute Pelayaran</p>
                  <p className="text-white font-semibold flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> 
                    <span className="whitespace-normal leading-relaxed">{selectedShip.route}</span>
                  </p>
                </div>
                
                {/* 2. Kargo & Berat */}
                <div className="bg-[#0A0A12] p-4 rounded-xl border border-[#1E1E2E]">
                  <p className="text-[11px] uppercase tracking-wider text-[#6B6B80] mb-2">Kargo & Berat</p>
                  <p className="text-white font-semibold flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    <span className="whitespace-normal leading-relaxed">{selectedShip.jenisBarang} • {selectedShip.beratTotal}</span>
                  </p>
                </div>
                
                {/* 3. Status Operasional (Kapal & Kargo) */}
                <div className="bg-[#0A0A12] p-4 rounded-xl border border-[#1E1E2E] flex flex-col justify-center">
                  <p className="text-[11px] uppercase tracking-wider text-[#6B6B80] mb-2">Status Operasional</p>
                  <p className="text-white font-semibold flex flex-col gap-1.5 text-xs">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" /> 
                      <span className="text-[#A0A0B0]">Kapal:</span> {selectedShip.statusKapal}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#A855F7]" /> 
                      <span className="text-[#A0A0B0]">Kargo:</span> {selectedShip.statusKargo}
                    </span>
                  </p>
                </div>

                {/* 4. Kapasitas Muatan */}
                <div className="bg-[#0A0A12] p-4 rounded-xl border border-[#1E1E2E] flex flex-col justify-center">
                  <p className="text-[11px] uppercase tracking-wider text-[#6B6B80] mb-2">Kapasitas Muatan</p>
                  <div className="flex items-center gap-3">
                    <p className="text-white font-bold">{selectedShip.muatan}%</p>
                    <div className="flex-1 h-1.5 bg-[#1E1E2E] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#A855F7] to-[#C084FC] rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: animateProgress ? `${selectedShip.muatan}%` : '0%' }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}