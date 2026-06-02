"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { hapusResiDatabase, editResiDatabase, tambahResiDatabase } from "./action";

interface PopupNotification {
  show: boolean;
  title: string;
  message: string;
  type: "success" | "error";
}

export default function PengirimanClient({
  dataDariDatabase,
  totalPages,
  currentPage,
}: {
  dataDariDatabase: any[];
  totalPages: number;
  currentPage: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // State Kontrol Window Modal Panel
  const [resiDihapus, setResiDihapus] = useState<string | null>(null);
  const [dataEdit, setDataEdit] = useState<any | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // State Otomatisasi Perhitungan Cerdas & Kode IMO Kapal
  const [beratInput, setBeratInput] = useState("");
  const [hargaOtomatis, setHargaOtomatis] = useState("");
  const [autoImo, setAutoImo] = useState("");

  // State Custom Error Handling Form
  const [formErrors, setFormErrors] = useState({
    namaPengirim: "",
    namaPenerima: "",
    noTelepon: "",
    tanggalKirim: "",
    beratTotal: "",
    namaKapal: "",
  });

  // State Pop-up Box Notifikasi Tengah Layar Kustom Vercel Style
  const [popupNotif, setPopupNotif] = useState<PopupNotification>({
    show: false,
    title: "",
    message: "",
    type: "success",
  });

  const triggerPopup = (title: string, message: string, type: "success" | "error") => {
    setPopupNotif({ show: true, title, message, type });
  };

  useEffect(() => {
    if (isCreateOpen) {
      setBeratInput("");
      setHargaOtomatis("");
      setAutoImo(`IMO-${Math.floor(1000000 + Math.random() * 9000000)}`);
      // Reset error saat modal dibuka
      setFormErrors({
        namaPengirim: "",
        namaPenerima: "",
        noTelepon: "",
        tanggalKirim: "",
        beratTotal: "",
        namaKapal: "",
      });
    }
  }, [isCreateOpen]);

  // ================= PENCARIAN (SEARCH) =================
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (term) params.set("query", term);
    else params.delete("query");
    
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  // ================= NAVIGASI PAGINASI ANGKA =================
  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const generatePagination = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  // ================= DATABASE MODIFICATION HANDLERS =================
  const handleKonfirmasiHapus = async () => {
    if (!resiDihapus) return;
    const result = await hapusResiDatabase(resiDihapus);
    if (result.success) {
      setResiDihapus(null);
      triggerPopup("Berhasil Dihapus", `Data resi ${resiDihapus} beserta seluruh data customer-nya telah dibersihkan total.`, "success");
      router.refresh();
    } else {
      triggerPopup("Gagal Menghapus", "Sistem mendeteksi kendala pada koneksi tabel database.", "error");
    }
  };

  const handleSimpanEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dataEdit) return;
    const formData = new FormData(e.currentTarget);
    const result = await editResiDatabase(
      dataEdit.resi,
      formData.get("namaPengirim") as string,
      Number(formData.get("beratTotal")),
      formData.get("statusKargo") as string
    );
    if (result.success) {
      setDataEdit(null);
      triggerPopup("Perubahan Disimpan", `Data manifes untuk resi ${dataEdit.resi} berhasil diperbarui.`, "success");
      router.refresh();
    } else {
      triggerPopup("Gagal Menyimpan", "Sistem gagal mengeksekusi perintah pembaruan data.", "error");
    }
  };

  const handleSimpanBaru = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Custom Error Validation
    let errors = {
      namaPengirim: "",
      namaPenerima: "",
      noTelepon: "",
      tanggalKirim: "",
      beratTotal: "",
      namaKapal: "",
    };
    let hasError = false;

    if (!formData.get("namaPengirim")) { errors.namaPengirim = "Kolom ini tidak boleh kosong."; hasError = true; }
    if (!formData.get("namaPenerima")) { errors.namaPenerima = "Kolom ini tidak boleh kosong."; hasError = true; }
    if (!formData.get("noTelepon")) { errors.noTelepon = "Kolom ini tidak boleh kosong."; hasError = true; }
    if (!formData.get("tanggalKirim")) { errors.tanggalKirim = "Pilih tanggal pengiriman."; hasError = true; }
    if (!formData.get("beratTotal")) { errors.beratTotal = "Masukkan estimasi berat kargo."; hasError = true; }
    if (!formData.get("namaKapal")) { errors.namaKapal = "Tentukan nama armada kapal."; hasError = true; }

    setFormErrors(errors);
    if (hasError) return; // Hentikan proses jika ada error

    const result = await tambahResiDatabase(formData);
    if (result.success) {
      setIsCreateOpen(false);
      triggerPopup("Resi Berhasil Dibuat", "Manifes kargo baru telah sukses didaftarkan ke dalam database.", "success");
      router.refresh();
    } else {
      triggerPopup("Gagal Menambahkan", "Terjadi error internal data structure pada database.", "error");
    }
  };

  // ================= REAL-TIME SMART CALCULATION HARGA =================
  const handleBeratChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBeratInput(val);
    setFormErrors((prev) => ({ ...prev, beratTotal: "" })); // Clear error saat ngetik
    if (val && !isNaN(Number(val))) {
      setHargaOtomatis(String(Number(val) * 25000));
    } else {
      setHargaOtomatis("");
    }
  };

  const clearError = (field: keyof typeof formErrors) => {
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // ================= MAP RENDER DATA BINDING FROM JOIN QUERY =================
  const data = (dataDariDatabase || []).map((row) => {
    const badgeColors: Record<string, string> = {
      "Berlayar": "bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20",
      "Dimuat": "bg-[#F59E0B]/10 text-[#FCD34D] border border-[#F59E0B]/20",
      "Diproses": "bg-[#6B7280]/10 text-[#9CA3AF] border border-[#6B7280]/20",
      "Terkirim": "bg-[#22C55E]/10 text-[#4ADE80] border border-[#22C55E]/20"
    };
    const currentStatus = row.status || "Diproses";
    const dateObj = new Date(row.tanggal_transaksi);
    return {
      resi: row.no_resi,
      pengirim: row.nama_customer || "Nama Tidak Tersedia",
      beratAsli: row.berat_total,
      beratTampil: `${row.berat_total} KG`,
      eta: isNaN(dateObj.getTime()) ? "TBA" : `${dateObj.getDate() + 3} ${dateObj.toLocaleString('id-ID', { month: 'long' })}`,
      status: currentStatus,
      badge: badgeColors[currentStatus] || badgeColors["Diproses"]
    };
  });

  return (
    <div className="space-y-8 pb-10 animate-fade-in relative">
      
      {/* POP-UP BOX NOTIFIKASI KUSTOM */}
      {popupNotif.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-2xl max-w-sm w-full text-center animate-scale-up">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto ${
              popupNotif.type === "success" ? "bg-[#22C55E]/10 text-[#4ADE80]" : "bg-[#EF4444]/10 text-[#F87171]"
            }`}>
              {popupNotif.type === "success" ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              )}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{popupNotif.title}</h3>
            <p className="text-sm text-[#A0A0B0] mb-6">{popupNotif.message}</p>
            <button 
              type="button"
              onClick={() => setPopupNotif((prev) => ({ ...prev, show: false }))} 
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-[#A855F7] hover:bg-[#9333EA] transition-all"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {/* HEADER COMPONENT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Data Pengiriman</h1>
          <p className="text-[#A0A0B0] text-sm mt-1">Kelola dan pantau seluruh manifes pengiriman kargo.</p>
        </div>
        <button 
          onClick={() => setIsCreateOpen(true)} 
          className="flex items-center gap-2 bg-[#A855F7] hover:bg-[#9333EA] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
          Buat Resi Baru
        </button>
      </div>

      {/* CONTAINER TABEL UTAMA */}
      <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 relative z-10">
          <h3 className="text-white font-bold text-lg">Daftar Resi & Pengiriman</h3>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-[#6B6B80]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input 
              type="text" 
              placeholder="Cari Resi atau PT..." 
              defaultValue={searchParams.get("query")?.toString()} 
              onChange={(e) => handleSearch(e.target.value)} 
              className="bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl focus:border-[#A855F7] block w-64 pl-10 p-2.5 outline-none transition-all" 
            />
          </div>
        </div>

        <div className={`transition-opacity duration-200 ${isPending ? "opacity-40" : "opacity-100"}`}>
          {/* LOGIKA PENAMBAHAN: JIKA DATA KOSONG TAMPILKAN INFO NOT FOUND */}
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-[#1E1E2E] rounded-xl bg-[#0A0A12]/50">
              <div className="w-16 h-16 rounded-full bg-[#1A1A24] flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#6B6B80]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">Data Tidak Ditemukan</h3>
              <p className="text-[#A0A0B0] text-sm max-w-sm">Maaf, kami tidak menemukan manifes atau nomor resi yang sesuai dengan pencarian <span className="text-[#C084FC] font-semibold font-sans">"{searchParams.get("query")}"</span>.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300 whitespace-nowrap">
                <thead>
                  <tr className="border-b border-[#1E1E2E] text-[#6B6B80] uppercase text-xs font-semibold tracking-wider">
                    <th className="pb-4 px-4">Nomor Resi</th>
                    <th className="pb-4 px-4">Nama Pengirim</th>
                    <th className="pb-4 px-4">Total Berat</th>
                    <th className="pb-4 px-4">Est. Tiba (ETA)</th>
                    <th className="pb-4 px-4 text-center">Status</th>
                    <th className="pb-4 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => (
                    <tr key={idx} className="border-b border-[#1E1E2E]/50 hover:bg-[#1A1A24] transition-all duration-200 group">
                      <td className="p-4 font-sans font-bold text-[#C084FC]">{item.resi}</td>
                      <td className="p-4 text-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-[#1E1E2E] flex items-center justify-center text-[10px]">🏢</span>
                          {item.pengirim}
                        </div>
                      </td>
                      <td className="p-4 text-slate-400 font-sans">{item.beratTampil}</td>
                      <td className="p-4 text-slate-400 font-medium">{item.eta}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-md text-[11px] font-bold tracking-wide ${item.badge}`}>{item.status}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                          <button onClick={() => setDataEdit(item)} className="p-1.5 rounded-lg text-slate-400 hover:text-[#60A5FA] hover:bg-[#60A5FA]/10 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                          </button>
                          <button onClick={() => setResiDihapus(item.resi)} className="p-1.5 rounded-lg text-slate-400 hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* CONTROLS PAGINATION PANEL - SEMBUNYIKAN JIKA DATA KOSONG */}
        {data.length > 0 && (
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#1E1E2E]">
            <button disabled={currentPage <= 1} onClick={() => goToPage(currentPage - 1)} className="flex items-center gap-1.5 px-4 py-2 text-sm text-[#A0A0B0] bg-[#1A1A24] rounded-xl border border-[#1E1E2E] hover:text-white transition-all disabled:opacity-30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg> Sebelumnya
            </button>
            <div className="flex items-center gap-1.5">
              {generatePagination().map((page, idx) => (
                page === "..." ? (
                  <span key={idx} className="px-3 py-1 text-slate-600">...</span>
                ) : (
                  <button
                    key={idx}
                    onClick={() => goToPage(Number(page))}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                      currentPage === page ? "bg-[#A855F7] text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]" : "bg-[#1A1A24] text-slate-400 border border-[#1E1E2E] hover:bg-[#252535] hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>
            <button disabled={currentPage >= totalPages} onClick={() => goToPage(currentPage + 1)} className="flex items-center gap-1.5 px-4 py-2 text-sm text-[#A0A0B0] bg-[#1A1A24] rounded-xl border border-[#1E1E2E] hover:text-white transition-all disabled:opacity-30">
              Selanjutnya <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        )}
      </div>

      {/* MODAL CONFIRM DELETE */}
      {resiDihapus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 animate-scale-up">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#EF4444]/10 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Hapus Manifes</h3>
              <p className="text-sm text-[#A0A0B0] mb-6">Yakin menghapus resi kargo <span className="text-[#C084FC] font-sans font-bold">{resiDihapus}</span> beserta data customer-nya sampai bersih?</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setResiDihapus(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#A0A0B0] bg-[#1A1A24] border border-[#1E1E2E] hover:text-white transition-colors">Batal</button>
                <button type="button" onClick={handleKonfirmasiHapus} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#EF4444] hover:bg-[#DC2626] transition-all shadow-lg shadow-red-500/20">Ya, Hapus</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT DATA */}
      {dataEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scale-up">
            <div className="bg-[#1A1A24] px-6 py-4 border-b border-[#1E1E2E] flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Edit Manifes Pengiriman</h3>
              <button type="button" onClick={() => setDataEdit(null)} className="text-[#6B6B80] hover:text-white transition-colors">✕</button>
            </div>
            <form onSubmit={handleSimpanEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">NOMOR RESI</label>
                <input type="text" value={dataEdit.resi} disabled className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-[#6B6B80] text-sm rounded-xl p-2.5 font-sans cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">NAMA PENGIRIM</label>
                <input type="text" name="namaPengirim" defaultValue={dataEdit.pengirim} className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 focus:border-[#A855F7] outline-none transition-all" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">BERAT (KG)</label>
                  <input type="number" name="beratTotal" defaultValue={dataEdit.beratAsli} className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 focus:border-[#A855F7] outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">STATUS KARGO</label>
                  <select name="statusKargo" defaultValue={dataEdit.status} className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 focus:border-[#A855F7] outline-none transition-all">
                    <option value="Diproses">Diproses</option>
                    <option value="Dimuat">Dimuat</option>
                    <option value="Berlayar">Berlayar</option>
                    <option value="Terkirim">Terkirim</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setDataEdit(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#A0A0B0] bg-[#1A1A24] border border-[#1E1E2E] hover:text-white transition-colors">Batal</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL CREATE RESI UTUH ================= */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-up">
            <div className="bg-[#1A1A24] px-6 py-4 border-b border-[#1E1E2E] flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Buat Resi Kargo Baru</h3>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="text-[#6B6B80] hover:text-white transition-colors">✕</button>
            </div>
            
            {/* Tambahkan noValidate agar popup browser mati */}
            <form onSubmit={handleSimpanBaru} noValidate className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Informasi Kiri */}
                <div className="space-y-4">
                  <h4 className="text-[#C084FC] font-semibold text-sm border-b border-[#1E1E2E] pb-2">Informasi Customer & Logistik</h4>
                  <div>
                    <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Nomor Resi (Bisa Disesuaikan Manual)</label>
                    <input type="text" name="noResiInput" placeholder="Contoh: SWB-20240011 (Kosongkan jika ingin otomatis urut)" className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#A855F7] transition-all font-sans" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Nama Pengirim</label>
                    <input type="text" name="namaPengirim" onChange={() => clearError("namaPengirim")} className={`w-full bg-[#0A0A12] border ${formErrors.namaPengirim ? "border-red-500" : "border-[#1E1E2E] focus:border-[#A855F7]"} text-white text-sm rounded-xl p-2.5 outline-none transition-all`} />
                    {formErrors.namaPengirim && <p className="text-red-400 text-xs mt-1.5 ml-2">{formErrors.namaPengirim}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Nama Penerima</label>
                    <input type="text" name="namaPenerima" onChange={() => clearError("namaPenerima")} className={`w-full bg-[#0A0A12] border ${formErrors.namaPenerima ? "border-red-500" : "border-[#1E1E2E] focus:border-[#A855F7]"} text-white text-sm rounded-xl p-2.5 outline-none transition-all`} />
                    {formErrors.namaPenerima && <p className="text-red-400 text-xs mt-1.5 ml-2">{formErrors.namaPenerima}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Nomor Telepon</label>
                    <input type="tel" name="noTelepon" onChange={() => clearError("noTelepon")} className={`w-full bg-[#0A0A12] border ${formErrors.noTelepon ? "border-red-500" : "border-[#1E1E2E] focus:border-[#A855F7]"} text-white text-sm rounded-xl p-2.5 outline-none transition-all`} />
                    {formErrors.noTelepon && <p className="text-red-400 text-xs mt-1.5 ml-2">{formErrors.noTelepon}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Kota Asal</label>
                      <select name="kotaAsal" className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#A855F7]">
                        <option value="Jakarta (Tanjung Priok)">Jakarta (Tanjung Priok)</option>
                        <option value="Surabaya (Tanjung Perak)">Surabaya (Tanjung Perak)</option>
                        <option value="Semarang (Tanjung Emas)">Semarang (Tanjung Emas)</option>
                        <option value="Makassar (Soekarno-Hatta)">Makassar (Soekarno-Hatta)</option>
                        <option value="Medan (Belawan)">Medan (Belawan)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Kota Tujuan</label>
                      <select name="kotaTujuan" className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#A855F7]">
                        <option value="Surabaya (Tanjung Perak)">Surabaya (Tanjung Perak)</option>
                        <option value="Jakarta (Tanjung Priok)">Jakarta (Tanjung Priok)</option>
                        <option value="Semarang (Tanjung Emas)">Semarang (Tanjung Emas)</option>
                        <option value="Sorong (Pelabuhan Sorong)">Sorong (Pelabuhan Sorong)</option>
                        <option value="Batam (Batu Ampar)">Batam (Batu Ampar)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Informasi Kanan */}
                <div className="space-y-4">
                  <h4 className="text-[#C084FC] font-semibold text-sm border-b border-[#1E1E2E] pb-2">Spesifikasi Kargo & Armada Kapal</h4>
                  <div>
                    <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Tanggal Kirim</label>
                    <input type="date" name="tanggalKirim" onChange={() => clearError("tanggalKirim")} className={`w-full bg-[#0A0A12] border ${formErrors.tanggalKirim ? "border-red-500" : "border-[#1E1E2E] focus:border-[#A855F7]"} text-white text-sm rounded-xl p-2.5 outline-none transition-all`} />
                    {formErrors.tanggalKirim && <p className="text-red-400 text-xs mt-1.5 ml-2">{formErrors.tanggalKirim}</p>}
                  </div>
                  
                  {/* AUTOMATED SMART PRICE FIELDS */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Berat Total (KG)</label>
                      <input 
                        type="number" 
                        name="beratTotal" 
                        value={beratInput}
                        onChange={handleBeratChange}
                        placeholder="Ketik berat..."
                        className={`w-full bg-[#0A0A12] border ${formErrors.beratTotal ? "border-red-500" : "border-[#1E1E2E] focus:border-[#A855F7]"} text-white text-sm rounded-xl p-2.5 outline-none transition-all font-sans`} 
                      />
                      {formErrors.beratTotal && <p className="text-red-400 text-xs mt-1.5 ml-2">{formErrors.beratTotal}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Harga Tarif (Auto)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs text-green-500 font-bold">Rp</span>
                        <input 
                          type="number" 
                          name="hargaTarif" 
                          value={hargaOtomatis}
                          readOnly 
                          placeholder="Terhitung..."
                          className="w-full bg-[#161622] border border-[#1E1E2E] text-[#4ADE80] font-bold text-sm rounded-xl pl-9 p-2.5 cursor-not-allowed font-sans outline-none" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Jenis Barang</label>
                      <select name="jenisBarang" className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#A855F7]">
                        <option value="Peralatan Rumah Tangga">Peralatan Rumah Tangga</option>
                        <option value="Hasil Bumi & Agrikultur">Hasil Bumi & Agrikultur</option>
                        <option value="Barang Elektronik">Barang Elektronik</option>
                        <option value="Kendaraan Bermotor">Kendaraan Bermotor</option>
                        <option value="Bahan Bangunan">Bahan Bangunan</option>
                      </select>
                    </div>
                    {/* DROPDOWN STATUS AWAL - MUTLAK TERKUNCI DAN DITUTUP HANYA DIPROSES */}
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Status Awal</label>
                      <div className="w-full bg-[#161622] border border-[#1E1E2E] text-gray-400 text-sm rounded-xl p-2.5 select-none font-medium">
                        Diproses
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Layanan Pengiriman</label>
                      <select name="jenisPengiriman" className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#A855F7]">
                        <option value="Biasa">Biasa (Reguler)</option>
                        <option value="Cepat">Cepat (Express)</option>
                        <option value="VVIP">VVIP (Prioritas Utama)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Nama Kapal Pengangkut</label>
                      <input type="text" name="namaKapal" onChange={() => clearError("namaKapal")} placeholder="Contoh: KM Kelud" className={`w-full bg-[#0A0A12] border ${formErrors.namaKapal ? "border-red-500" : "border-[#1E1E2E] focus:border-[#A855F7]"} text-white text-sm rounded-xl p-2.5 outline-none transition-all`} />
                      {formErrors.namaKapal && <p className="text-red-400 text-xs mt-1.5 ml-2">{formErrors.namaKapal}</p>}
                    </div>
                  </div>

                  {/* UPDATE DROPDOWN: HANYA BERISI PILIHAN KHUSUS EKSPEDISI KARGO LAUT UTAMA */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Jenis Armada Kapal</label>
                      <select name="jenisKapal" className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 outline-none">
                        <option value="Kapal Kargo Umum">Kapal Kargo Umum</option>
                        <option value="Kapal Ro-Ro">Kapal Ro-Ro</option>
                        <option value="Kapal Kontainer">Kapal Kontainer</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Kapasitas</label>
                      <select name="kapasitasMuatan" className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 outline-none">
                        <option value="100%">100% (Penuh)</option>
                        <option value="80%">80%</option>
                        <option value="50%">50%</option>
                        <option value="25%">25%</option>
                        <option value="0%">0% (Kosong)</option>
                      </select>
                    </div>
                  </div>

                  {/* KUNCI MUTLAK STATUS ARMADA KE SIAP BERLAYAR */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Kode Registrasi (IMO Auto)</label>
                      <input type="text" name="kodeKapal" value={autoImo} readOnly className="w-full bg-[#161622] border border-[#1E1E2E] text-[#6B6B80] font-sans text-sm rounded-xl p-2.5 cursor-not-allowed outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Status Kelayakan Armada</label>
                      <div className="w-full bg-[#161622] border border-[#1E1E2E] text-gray-400 text-sm rounded-xl p-2.5 select-none font-medium">
                        Siap Berlayar
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Catatan / Deskripsi (Opsional)</label>
                    <textarea name="deskripsi" rows={2} placeholder="Tambahkan deskripsi isi kargo..." className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#A855F7] custom-scrollbar"></textarea>
                  </div>
                </div>

              </div>

              {/* ACTION FOOTER BUTTONS */}
              <div className="pt-6 border-t border-[#1E1E2E] flex justify-end gap-3 bg-[#13131F]">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-[#A0A0B0] bg-[#1A1A24] border border-[#1E1E2E] hover:text-white transition-colors">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CORE CSS STYLE FRAMES FOR ANIMATIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.97); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-scale-up { animation: scaleUp 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #13131F; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #252538; border-radius: 99px; }
      `}} />
    </div>
  );
}