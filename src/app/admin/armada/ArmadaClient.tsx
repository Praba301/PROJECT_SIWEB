"use client";
import { useState, useEffect } from "react";

export default function ArmadaClient({ dataDariDatabase }: { dataDariDatabase: any[] }) {
  const [selectedShip, setSelectedShip] = useState<any>(null);
  const [animateProgress, setAnimateProgress] = useState(false);

  // Kita olah data dari database agar cocok dengan animasi card kamu
  const armadaData = dataDariDatabase.map((dbShip, index) => {
    // Array warna untuk mempercantik progress bar (berulang otomatis)
    const colors = [
      "from-[#A855F7] to-[#C084FC]",
      "from-[#3B82F6] to-[#60A5FA]",
      "from-[#F59E0B] to-[#FCD34D]",
      "from-[#22C55E] to-[#4ADE80]"
    ];

    return {
      id: dbShip.id,
      name: dbShip.nama_kapal,
      type: dbShip.tipe_kapal,
      kode: dbShip.kode_kapal,
      // Data dummy di bawah ini digunakan agar animasi UI-mu tetap hidup 
      // karena di database asdos tidak ada kolom untuk data kapten/bbm
      route: "Rute Standar Logistik",
      muatan: 45 + (index * 5 > 50 ? 20 : index * 5), // Angka random persentase
      status: "Berlayar",
      kapten: `Kapten ${dbShip.nama_kapal.split(' ')[1] || 'Senior'}`, 
      bbm: `${60 + (index * 2)}%`,
      awak: `${18 + index} orang`,
      barColor: colors[index % colors.length]
    };
  });

  useEffect(() => {
    if (selectedShip) {
      setAnimateProgress(false);
      setTimeout(() => setAnimateProgress(true), 100);
    }
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
          const isSelected = selectedShip?.id === ship.id;
          
          return (
            <div 
              key={ship.id} 
              onClick={() => setSelectedShip(ship)}
              className={`group bg-[#13131F] p-6 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden opacity-0 animate-slide-left ${
                isSelected 
                  ? "border-2 border-[#A855F7] shadow-[0_10px_30px_rgba(168,85,247,0.2)] -translate-y-1 bg-[#1A1A24]" 
                  : "border border-[#1E1E2E] hover:border-[#A855F7]/50 hover:bg-[#1A1A24] hover:-translate-y-1 hover:shadow-lg"
              }`}
              style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/10 blur-3xl rounded-full pointer-events-none" />
              )}

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className={`font-bold text-xl transition-colors duration-300 ${isSelected ? "text-[#C084FC]" : "text-white group-hover:text-[#A855F7]"}`}>
                    {ship.name}
                  </h3>
                  <p className="text-[#A0A0B0] text-xs font-mono uppercase tracking-wider mt-1">{ship.kode} - {ship.type}</p>
                  <p className="text-[#6B6B80] text-sm mt-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {ship.route}
                  </p>
                </div>
                <span className={`px-3 py-1.5 rounded-md text-xs font-bold tracking-wide shadow-sm flex items-center gap-2 bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20`}>
                  <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse-glow" />
                  {ship.status}
                </span>
              </div>
              
              <div className="mt-auto relative z-10">
                <div className="flex justify-between text-xs text-[#A0A0B0] mb-2 font-medium">
                  <span>Kapasitas Muatan</span>
                  <span className={isSelected ? "text-white font-bold" : ""}>{ship.muatan}%</span>
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

      {/* Panel Detail Kapal */}
      {selectedShip && (
        <div className="bg-[#13131F] border border-[#A855F7]/30 rounded-2xl p-8 mt-4 relative shadow-[0_20px_50px_-10px_rgba(168,85,247,0.15)] opacity-0 animate-slide-right before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-gradient-to-b before:from-[#A855F7] before:to-[#C084FC] before:rounded-l-2xl">
          
          <button 
            onClick={() => setSelectedShip(null)}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-[#1E1E2E] text-[#A0A0B0] hover:text-white hover:bg-red-500 hover:rotate-90 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#A855F7]/10 flex items-center justify-center text-2xl border border-[#A855F7]/20">🚢</div>
            <div>
              <h2 className="text-[#C084FC] text-2xl font-bold">{selectedShip.name}</h2>
              <p className="text-[#A0A0B0] text-sm mt-1">Kode: {selectedShip.kode} • {selectedShip.type}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            <div className="bg-[#0A0A12] p-4 rounded-xl border border-[#1E1E2E]">
              <p className="text-[11px] uppercase tracking-wider text-[#6B6B80] mb-1">Kapten</p>
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-[#A855F7]">👨‍✈️</span> {selectedShip.kapten}
              </p>
            </div>
            
            <div className="bg-[#0A0A12] p-4 rounded-xl border border-[#1E1E2E]">
              <p className="text-[11px] uppercase tracking-wider text-[#6B6B80] mb-1">Jumlah Awak</p>
              <p className="text-white font-semibold flex items-center gap-2">
                <span className="text-[#A855F7]">👥</span> {selectedShip.awak}
              </p>
            </div>
            
            <div className="bg-[#0A0A12] p-4 rounded-xl border border-[#1E1E2E]">
              <p className="text-[11px] uppercase tracking-wider text-[#6B6B80] mb-2">Bahan Bakar (BBM)</p>
              <div className="flex items-center gap-3">
                <p className="text-white font-bold">{selectedShip.bbm}</p>
                <div className="flex-1 h-1.5 bg-[#1E1E2E] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#3B82F6] rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: animateProgress ? selectedShip.bbm : '0%' }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A12] p-4 rounded-xl border border-[#1E1E2E]">
              <p className="text-[11px] uppercase tracking-wider text-[#6B6B80] mb-2">Muatan Kargo</p>
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
      )}
    </div>
  );
}