"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { hapusResiDatabase, editResiDatabase } from "./action"; 

export default function PengirimanClient({ 
  dataDariDatabase, 
  totalPages, 
  currentPage 
}: { 
  dataDariDatabase: any[]; 
  totalPages: number; 
  currentPage: number; 
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // === STATE UNTUK KONTROL POP-UP (MODAL) ===
  const [resiDihapus, setResiDihapus] = useState<string | null>(null);
  const [dataEdit, setDataEdit] = useState<any | null>(null);

  // === FUNGSI PENCARIAN & PAGINATION ===
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); 
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query"); 
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  // === FUNGSI AKSI (HAPUS DATA KE DATABASE) ===
  const handleKlikHapus = (resi: string) => setResiDihapus(resi);
  const handleBatalHapus = () => setResiDihapus(null);
  const handleKonfirmasiHapus = async () => {
    if (!resiDihapus) return;
    
    const result = await hapusResiDatabase(resiDihapus);
    if (result.success) {
      setResiDihapus(null); 
    } else {
      alert("Gagal menghapus data! Pastikan tidak ada data yang terkait.");
    }
  };

  // === FUNGSI AKSI (EDIT DATA KE DATABASE) ===
  const handleKlikEdit = (item: any) => setDataEdit(item);
  const handleBatalEdit = () => setDataEdit(null);
  const handleSimpanEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (!dataEdit) return;

    // Mengambil nilai dari input form berdasarkan atribut 'name'
    const formData = new FormData(e.currentTarget);
    const namaBaru = formData.get("namaPengirim") as string;
    const beratBaru = Number(formData.get("beratTotal"));
    const statusBaru = formData.get("statusKargo") as string; // Menangkap status kargo

    // Memanggil file action.ts dengan 4 parameter (termasuk status)
    const result = await editResiDatabase(dataEdit.resi, namaBaru, beratBaru, statusBaru);
    
    if (result.success) {
      setDataEdit(null); 
    } else {
      alert("Gagal menyimpan perubahan ke database!");
    }
  };

  // === MENGOLAH DATA TABEL DENGAN STATUS ASLI DARI DATABASE ===
  const data = dataDariDatabase.map((row) => {
    // Daftar warna khusus untuk masing-masing status
    const badgeColors: Record<string, string> = {
      "Berlayar": "bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20",
      "Dimuat": "bg-[#F59E0B]/10 text-[#FCD34D] border border-[#F59E0B]/20",
      "Diproses": "bg-[#6B7280]/10 text-[#9CA3AF] border border-[#6B7280]/20",
      "Terkirim": "bg-[#22C55E]/10 text-[#4ADE80] border border-[#22C55E]/20"
    };

    // MENGAMBIL STATUS ASLI dari database (jika kosong, default ke "Diproses")
    const currentStatus = row.status || "Diproses"; 
    const currentBadge = badgeColors[currentStatus] || badgeColors["Diproses"];

    const dateObj = new Date(row.tanggal_transaksi);
    const etaString = `${dateObj.getDate() + 3} ${dateObj.toLocaleString('id-ID', { month: 'long' })}`;

    return {
      resi: row.no_resi,
      pengirim: row.nama_customer,
      beratAsli: row.berat_total, 
      beratTampil: `${row.berat_total} KG`,
      eta: etaString,
      status: currentStatus, 
      badge: currentBadge
    };
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide animate-fade-in-up">Data Pengiriman</h1>
          <p className="text-[#A0A0B0] text-sm mt-1 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>Kelola dan pantau seluruh manifes pengiriman kargo.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-[#A855F7] hover:bg-[#9333EA] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] active:scale-95 w-max animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
          Buat Resi Baru
        </button>
      </div>
      
      {/* Container Tabel Utama */}
      <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-xl mt-6 animate-slide-up">
        
        {/* Header Tabel & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 relative z-10">
          <h3 className="text-white font-bold text-lg">Daftar Resi & Pengiriman</h3>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-[#6B6B80]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Cari Resi atau PT..." 
              defaultValue={searchParams.get("query")?.toString()} 
              onChange={(e) => handleSearch(e.target.value)} 
              className="bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-lg focus:ring-[#A855F7] focus:border-[#A855F7] block w-full pl-10 p-2.5 transition-colors placeholder-[#6B6B80] outline-none"
            />
          </div>
        </div>
        
        {/* Grid / Tabel Data */}
        <div className="space-y-2 overflow-x-auto">
          <div className="min-w-[850px]"> 
            <div className="flex text-xs uppercase tracking-wider text-[#6B6B80] px-4 pb-3 border-b border-[#1E1E2E] font-semibold">
              <div className="flex-1">Nomor Resi</div>
              <div className="flex-1">Nama Pengirim</div>
              <div className="w-28">Total Berat</div>
              <div className="w-32">Est. Tiba (ETA)</div>
              <div className="w-28 text-center">Status</div>
              <div className="w-24 text-center">Aksi</div>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              {data.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group flex items-center px-4 py-4 rounded-xl text-sm transition-all duration-300 border border-transparent hover:bg-[#1A1A24] hover:border-[#A855F7]/30 hover:shadow-[0_5px_15px_rgba(168,85,247,0.15)] opacity-0 animate-fade-in-up cursor-default hover:-translate-y-0.5"
                  style={{ animationDelay: `${0.1 + (idx * 0.1)}s` }}
                >
                  <div className="flex-1 text-[#C084FC] font-mono font-bold group-hover:text-[#D8B4FE] transition-colors duration-300">{item.resi}</div>
                  <div className="flex-1 text-[#A0A0B0] font-medium group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#1E1E2E] flex items-center justify-center text-[10px] group-hover:bg-[#A855F7] group-hover:text-white transition-colors duration-300 shadow-sm">🏢</div>
                    {item.pengirim}
                  </div>
                  <div className="w-28 text-[#6B6B80] font-mono group-hover:text-[#A0A0B0] transition-colors duration-300">{item.beratTampil}</div>
                  <div className="w-32 text-[#6B6B80] font-medium flex items-center gap-1.5 group-hover:text-[#A0A0B0] transition-colors duration-300">
                    <svg className="w-3.5 h-3.5 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {item.eta}
                  </div>
                  <div className="w-28 flex justify-center">
                    <span className={`px-3 py-1.5 rounded-md text-[11px] font-bold tracking-wide flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-110 ${item.badge}`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Tombol Aksi (Muncul saat di-hover) */}
                  <div className="w-24 flex justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => handleKlikEdit(item)} className="text-[#6B6B80] hover:text-[#60A5FA] transition-colors" title="Edit Data">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button onClick={() => handleKlikHapus(item.resi)} className="text-[#6B6B80] hover:text-[#EF4444] transition-colors" title="Hapus Data">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
              
              {data.length === 0 && (
                 <div className="py-10 text-center text-gray-500 font-medium">
                    Data resi atau customer tidak ditemukan.
                 </div>
              )}
            </div>
          </div>
        </div>

        {/* KONTROL PAGINATION */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#1E1E2E]">
          <button 
            disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)}
            className="px-4 py-2 text-sm font-medium text-[#A0A0B0] bg-[#1A1A24] rounded-lg border border-[#1E1E2E] hover:border-[#A855F7]/50 hover:text-white disabled:opacity-40 transition-all"
          >← Sebelumnya</button>
          <span className="text-sm text-[#6B6B80]">Halaman <span className="text-white font-bold mx-1">{currentPage}</span> dari <span className="text-white font-bold mx-1">{totalPages}</span></span>
          <button 
            disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)}
            className="px-4 py-2 text-sm font-medium text-[#A0A0B0] bg-[#1A1A24] rounded-lg border border-[#1E1E2E] hover:border-[#A855F7]/50 hover:text-white disabled:opacity-40 transition-all"
          >Selanjutnya →</button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* AREA MODAL (POP-UP) */}
      {/* ======================================================== */}
      
      {/* 1. Modal Konfirmasi Hapus */}
      {resiDihapus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 animate-zoom-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#EF4444]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Konfirmasi Hapus</h3>
              <p className="text-sm text-[#A0A0B0] mb-6">Apakah kamu yakin ingin menghapus data manifest resi <span className="text-[#C084FC] font-mono font-bold">{resiDihapus}</span>? Data tidak dapat dikembalikan.</p>
              
              <div className="flex w-full gap-3">
                <button onClick={handleBatalHapus} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#A0A0B0] bg-[#1A1A24] border border-[#1E1E2E] hover:text-white hover:border-[#6B6B80] transition-colors">Batal</button>
                <button onClick={handleKonfirmasiHapus} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]">Ya, Hapus</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Form Edit Data */}
      {dataEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-zoom-in overflow-hidden">
            <div className="bg-[#1A1A24] px-6 py-4 border-b border-[#1E1E2E] flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Edit Data Pengiriman</h3>
              <button onClick={handleBatalEdit} className="text-[#6B6B80] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleSimpanEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#A0A0B0] uppercase tracking-wider mb-2">Nomor Resi</label>
                <input type="text" value={dataEdit.resi} disabled className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-[#6B6B80] font-mono text-sm rounded-lg p-2.5 cursor-not-allowed" />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-[#A0A0B0] uppercase tracking-wider mb-2">Nama Pengirim</label>
                <input type="text" name="namaPengirim" defaultValue={dataEdit.pengirim} className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-lg focus:ring-[#A855F7] focus:border-[#A855F7] block p-2.5 outline-none transition-colors" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A0A0B0] uppercase tracking-wider mb-2">Total Berat (KG)</label>
                  <input type="number" name="beratTotal" defaultValue={dataEdit.beratAsli} className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-lg focus:ring-[#A855F7] focus:border-[#A855F7] block p-2.5 outline-none transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A0A0B0] uppercase tracking-wider mb-2">Status Kargo</label>
                  <select name="statusKargo" defaultValue={dataEdit.status} className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-lg focus:ring-[#A855F7] focus:border-[#A855F7] block p-2.5 outline-none transition-colors cursor-pointer appearance-none">
                    <option value="Diproses">Diproses</option>
                    <option value="Dimuat">Dimuat</option>
                    <option value="Berlayar">Berlayar</option>
                    <option value="Terkirim">Terkirim</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={handleBatalEdit} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#A0A0B0] bg-[#1A1A24] border border-[#1E1E2E] hover:text-white transition-colors">Batal</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#A855F7] hover:bg-[#9333EA] shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-colors">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}