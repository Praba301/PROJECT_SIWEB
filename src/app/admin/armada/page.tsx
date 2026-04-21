"use client";
import { useState } from "react";

export default function ArmadaPage() {
  const [selectedShip, setSelectedShip] = useState<any>(null);

  const armadaData = [
    { id: 1, name: "KM Nusantara", type: "Container Ship", route: "Madura → Banyuwangi → Lombok", muatan: 51, status: "Berlayar", kapten: "Kevin", bbm: "55%", awak: "22 orang", barColor: "bg-blue-400" },
    { id: 2, name: "KM Bahtera Jaya", type: "Container Ship", route: "Benoa → Lombok", muatan: 47, status: "Berlayar", kapten: "Joko Sundoro", bbm: "75%", awak: "22 orang", barColor: "bg-cyan-400" },
    { id: 3, name: "KM Garuda", type: "General Cargo", route: "Surabaya → Gilimanuk", muatan: 96, status: "Terkirim", kapten: "Tristo", bbm: "63%", awak: "29 orang", barColor: "bg-orange-500" },
    { id: 4, name: "KM Tujuh Laut", type: "General Cargo", route: "Jakarta → Balikpapan", muatan: 74, status: "Terkirim", kapten: "Hendro Emanuel", bbm: "61%", awak: "18 orang", barColor: "bg-amber-500" },
  ];

  return (
    <div className="flex flex-col h-full gap-6 relative">
      <h1 className="text-2xl font-bold text-white">Data Armada Kapal</h1>

      {/* Grid Kartu Kapal */}
      <div className="grid grid-cols-2 gap-6">
        {armadaData.map((ship) => (
          <div 
            key={ship.id} 
            onClick={() => setSelectedShip(ship)}
            className={`bg-[#15162c] border p-5 rounded-xl cursor-pointer transition-all ${
              selectedShip?.id === ship.id ? "border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "border-slate-700 hover:border-slate-500"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-bold text-lg">{ship.name}</h3>
                <p className="text-slate-500 text-xs">{ship.type}</p>
                <p className="text-slate-400 text-xs mt-2">{ship.route}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs bg-opacity-20 ${
                ship.status === "Berlayar" ? "bg-blue-500 text-blue-400" : "bg-emerald-500 text-emerald-400"
              }`}>
                {ship.status}
              </span>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Muatan</span>
                <span>{ship.muatan}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full">
                <div className={`h-full rounded-full ${ship.barColor}`} style={{ width: `${ship.muatan}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Panel Detail Kapal (Muncul jika ada kapal yang dipilih) */}
      {selectedShip && (
        <div className="bg-[#15162c] border border-slate-700 rounded-xl p-6 mt-4 relative animate-fade-in">
          <button 
            onClick={() => setSelectedShip(null)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-md bg-slate-800 text-slate-400 hover:text-white"
          >
            X
          </button>
          
          <h2 className="text-cyan-400 text-xl font-bold mb-6">{selectedShip.name}</h2>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <p className="text-xs text-slate-500 mb-1">Tipe</p>
              <p className="text-white font-medium">{selectedShip.type}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Rute</p>
              <p className="text-white font-medium">{selectedShip.route}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Status</p>
              <p className="text-white font-medium">{selectedShip.status}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Kapten</p>
              <p className="text-white font-medium">{selectedShip.kapten}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Muatan</p>
              <p className="text-white font-medium">{selectedShip.muatan}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">BBM</p>
              <p className="text-white font-medium">{selectedShip.bbm}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Awak</p>
              <p className="text-white font-medium">{selectedShip.awak}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}