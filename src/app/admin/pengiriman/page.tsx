"use client";

export default function PengirimanPage() {
  const data = [
    { resi: "SWB-20240001", pengirim: "PT. Lancar Jaya", berat: "125 KG", eta: "22 April", status: "Berlayar", badge: "bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20" },
    { resi: "SWB-20240002", pengirim: "PT. MajuMundur", berat: "100 KG", eta: "25 April", status: "Dimuat", badge: "bg-[#F59E0B]/10 text-[#FCD34D] border border-[#F59E0B]/20" },
    { resi: "SWB-20240003", pengirim: "PT. Batu Zamrud", berat: "120 KG", eta: "14 April", status: "Diproses", badge: "bg-[#6B7280]/10 text-[#9CA3AF] border border-[#6B7280]/20" },
    { resi: "SWB-20240004", pengirim: "PT. Tokopedia", berat: "200 KG", eta: "8 April", status: "Terkirim", badge: "bg-[#22C55E]/10 text-[#4ADE80] border border-[#22C55E]/20" },
    { resi: "SWB-20240005", pengirim: "PT. Barokah", berat: "150 KG", eta: "10 April", status: "Diproses", badge: "bg-[#6B7280]/10 text-[#9CA3AF] border border-[#6B7280]/20" },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header Halaman - Animasi Fade In Up */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Data Pengiriman</h1>
          <p className="text-[#A0A0B0] text-sm mt-1">Kelola dan pantau seluruh manifes pengiriman kargo.</p>
        </div>
        
        {/* Tombol Aksi */}
        <button className="flex items-center gap-2 bg-[#A855F7] hover:bg-[#9333EA] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] active:scale-95 w-max">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
          Buat Resi Baru
        </button>
      </div>
      
      {/* Container Tabel Utama */}
      <div 
        className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-xl opacity-0 animate-slide-up"
        style={{ animationDelay: "0.2s" }}
      >
        
        {/* Header Tabel & Search Bar Dummy */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 relative z-10">
          <h3 className="text-white font-bold text-lg">Daftar Resi & Pengiriman</h3>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-[#6B6B80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Cari nomor resi..." 
              className="bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-lg focus:ring-[#A855F7] focus:border-[#A855F7] block w-full pl-10 p-2.5 transition-colors placeholder-[#6B6B80] outline-none"
            />
          </div>
        </div>
        
        {/* Grid / Tabel Data */}
        <div className="space-y-2">
          {/* Header Grid */}
          <div className="flex text-xs uppercase tracking-wider text-[#6B6B80] px-4 pb-3 border-b border-[#1E1E2E] font-semibold">
            <div className="flex-1">Nomor Resi</div>
            <div className="flex-1">Nama Pengirim</div>
            <div className="w-32">Total Berat</div>
            <div className="w-32">Est. Tiba (ETA)</div>
            <div className="w-32 text-center">Status</div>
          </div>

          {/* Baris Data - Diberi efek hover dan animasi bertahap */}
          <div className="flex flex-col gap-1.5 mt-2">
            {data.map((item, idx) => (
              <div 
                key={idx} 
                className="group flex items-center px-4 py-4 rounded-xl text-sm transition-all duration-300 border border-transparent hover:bg-[#1A1A24] hover:border-[#A855F7]/30 hover:shadow-[0_5px_15px_rgba(168,85,247,0.05)] opacity-0 animate-fade-in-up cursor-default"
                style={{ animationDelay: `${0.3 + (idx * 0.1)}s` }}
              >
                <div className="flex-1 text-[#C084FC] font-mono font-bold group-hover:text-[#D8B4FE] transition-colors duration-300">
                  {item.resi}
                </div>
                <div className="flex-1 text-[#A0A0B0] font-medium group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#1E1E2E] flex items-center justify-center text-[10px] group-hover:bg-[#A855F7] group-hover:text-white transition-colors duration-300">
                    🏢
                  </div>
                  {item.pengirim}
                </div>
                <div className="w-32 text-[#6B6B80] font-mono group-hover:text-[#A0A0B0] transition-colors duration-300">
                  {item.berat}
                </div>
                <div className="w-32 text-[#6B6B80] font-medium flex items-center gap-1.5 group-hover:text-[#A0A0B0] transition-colors duration-300">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  {item.eta}
                </div>
                <div className="w-32 flex justify-center">
                  <span className={`px-3 py-1.5 rounded-md text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-sm transition-transform duration-300 group-hover:scale-105 ${item.badge}`}>
                    {/* Indikator Animasi jika status sedang Berlayar atau Diproses */}
                    {item.status === "Berlayar" && <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] animate-pulse-glow" />}
                    {item.status === "Diproses" && <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] animate-pulse" />}
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      
    </div>
  );
}