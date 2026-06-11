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

const daftarKapalSistem: Record<string, { tipe: string, maxKapasitasKg: number, kapal: string[] }> = {
  "Biasa": {
    tipe: "Kapal Kargo Umum",
    maxKapasitasKg: 10000, 
    kapal: ["KM Nusantara", "KM Bahtera Jaya", "KM Garuda", "KM Tujuh Laut", "KM Bintang Samudra"]
  },
  "Cepat": {
    tipe: "Kapal Ro-Ro Cepat",
    maxKapasitasKg: 12000, 
    kapal: ["KM Kilat Express", "KM Cepat Jaya", "KM Angin Ribut"]
  },
  "VIP": {
    tipe: "Kapal Kargo Khusus VIP",
    maxKapasitasKg: 15000, 
    kapal: ["KM Royal VIP", "KM Sultan Laut"]
  }
};

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

  const [resiDihapus, setResiDihapus] = useState<string | null>(null);
  const [dataEdit, setDataEdit] = useState<any | null>(null);
  const [dataDetail, setDataDetail] = useState<any | null>(null); 
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [beratInput, setBeratInput] = useState("");
  const [hargaOtomatis, setHargaOtomatis] = useState("");
  const [autoImo, setAutoImo] = useState("");
  const [layananTerpilih, setLayananTerpilih] = useState("Biasa");
  const [kapalTerpilih, setKapalTerpilih] = useState("");

  const [formErrors, setFormErrors] = useState({
    namaPengirim: "",
    namaPenerima: "",
    noTeleponPengirim: "", 
    noTeleponPenerima: "", 
    tanggalKirim: "",
    beratTotal: "",
    namaKapal: "",
    kotaTujuan: "",
  });

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
      setLayananTerpilih("Biasa");
      setKapalTerpilih("");
      setFormErrors({
        namaPengirim: "", namaPenerima: "", noTeleponPengirim: "", noTeleponPenerima: "", tanggalKirim: "", beratTotal: "", namaKapal: "", kotaTujuan: "",
      });
    }
  }, [isCreateOpen]);

  const handleLayananChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLayananTerpilih(e.target.value);
    setKapalTerpilih(""); 
  };

  const layananInfo = daftarKapalSistem[layananTerpilih];
  const maxKapasitas = layananInfo.maxKapasitasKg;

  let bebanSaatIni = 0;
  if (kapalTerpilih) {
    (dataDariDatabase || []).forEach(row => {
      const namaKapalDiDB = row.nama_kapal || row.kapal || row.nama_kapal_pengangkut;
      if (namaKapalDiDB === kapalTerpilih && row.status !== "Terkirim") {
        bebanSaatIni += Number(row.berat_total) || 0;
      }
    });
  }

  const inputBeratNum = Number(beratInput) || 0;
  const proyeksiBeban = bebanSaatIni + inputBeratNum;
  const loadPercentage = maxKapasitas > 0 ? (proyeksiBeban / maxKapasitas) * 100 : 0;
  const isOverload = proyeksiBeban > maxKapasitas;

  let statusKelayakan = "Tersedia (Siap Muat)";
  if (isOverload) statusKelayakan = "OVERLOAD! (Melebihi Kapasitas)";
  else if (loadPercentage >= 100) statusKelayakan = "Penuh Mutlak";
  else if (loadPercentage >= 80) statusKelayakan = "Hampir Penuh";
  else if (loadPercentage > 0) statusKelayakan = "Beroperasi (Sebagian Terisi)";
  else if (!kapalTerpilih) statusKelayakan = "-";
  else statusKelayakan = "Kosong (0% Terisi)";

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (term) params.set("query", term);
    else params.delete("query");
    startTransition(() => { router.replace(`${pathname}?${params.toString()}`); });
  };

  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    startTransition(() => { router.replace(`${pathname}?${params.toString()}`); });
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

  const handleKonfirmasiHapus = async () => {
    if (!resiDihapus) return;
    const result = await hapusResiDatabase(resiDihapus);
    if (result.success) {
      setResiDihapus(null);
      triggerPopup("Berhasil Dihapus", `Resi ${resiDihapus} dihapus. Kapasitas kapal telah dikurangi secara otomatis!`, "success");
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

    let errors = { namaPengirim: "", namaPenerima: "", noTeleponPengirim: "", noTeleponPenerima: "", tanggalKirim: "", beratTotal: "", namaKapal: "", kotaTujuan: "" };
    let hasError = false;

    if (!formData.get("namaPengirim")) { errors.namaPengirim = "Kolom ini tidak boleh kosong."; hasError = true; }
    if (!formData.get("namaPenerima")) { errors.namaPenerima = "Kolom ini tidak boleh kosong."; hasError = true; }
    if (!formData.get("noTeleponPengirim")) { errors.noTeleponPengirim = "Isi kontak pengirim."; hasError = true; }
    if (!formData.get("noTeleponPenerima")) { errors.noTeleponPenerima = "Isi kontak penerima."; hasError = true; }
    if (!formData.get("tanggalKirim")) { errors.tanggalKirim = "Pilih tanggal pengiriman."; hasError = true; }
    if (!formData.get("beratTotal")) { errors.beratTotal = "Masukkan estimasi berat kargo."; hasError = true; }
    if (!kapalTerpilih) { errors.namaKapal = "Pilih kapal untuk mengecek kapasitasnya."; hasError = true; }

    const asal = formData.get("kotaAsal");
    const tujuan = formData.get("kotaTujuan");
    
    if (asal === tujuan) {
      errors.kotaTujuan = "Kota tujuan tidak boleh sama dengan kota asal pengiriman!";
      hasError = true;
      triggerPopup("Rute Pengiriman Gagal", "Kota Asal and Kota Tujuan tidak boleh sama! Sistem logistik laut tidak melayani pengiriman antar-pelabuhan di kota yang sama.", "error");
      setFormErrors(errors);
      return;
    }

    if (isOverload) {
      errors.beratTotal = `DITOLAK! Sisa kapasitas kapal hanya ${maxKapasitas - bebanSaatIni} KG.`;
      hasError = true;
    }

    setFormErrors(errors);
    if (hasError) return;

    formData.append("jenisKapal", layananInfo.tipe);
    formData.append("kapasitasMuatan", `${loadPercentage.toFixed(1)}% (${proyeksiBeban}/${maxKapasitas} KG)`);
    formData.append("statusKapal", statusKelayakan);

    const result = await tambahResiDatabase(formData);
    if (result.success) {
      setIsCreateOpen(false);
      triggerPopup("Resi Berhasil Dibuat", `Manifes disimpan. Kapasitas ${kapalTerpilih} kini terisi ${loadPercentage.toFixed(1)}%.`, "success");
      router.refresh();
    } else {
      triggerPopup("Gagal Menambahkan", result.error || "Terjadi error internal data structure pada database.", "error");
    }
  };

  const handleBeratChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBeratInput(val);
    setFormErrors((prev) => ({ ...prev, beratTotal: "" }));
    if (val && !isNaN(Number(val))) {
      const multiplier = layananTerpilih === "VIP" ? 50000 : (layananTerpilih === "Cepat" ? 35000 : 25000);
      setHargaOtomatis(String(Number(val) * multiplier));
    } else {
      setHargaOtomatis("");
    }
  };

  const clearError = (field: keyof typeof formErrors) => {
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const data = (dataDariDatabase || []).map((row) => {
    const badgeColors: Record<string, string> = {
      "Berlayar": "bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20",
      "Dimuat": "bg-[#F59E0B]/10 text-[#FCD34D] border border-[#F59E0B]/20",
      "Diproses": "bg-[#6B7280]/10 text-[#9CA3AF] border border-[#6B7280]/20",
      "Terkirim": "bg-[#22C55E]/10 text-[#4ADE80] border border-[#22C55E]/20"
    };
    const currentStatus = row.status || "Diproses";
    return {
      resi: row.no_resi,
      pengirim: row.pengirim || "Tidak Tersedia",
      penerima: row.penerima || "Tidak Tersedia",
      telpPengirim: row.telepon_pengirim || "-",
      telpPenerima: row.telepon_penerima || "-",
      kotaAsal: row.kota_asal || "-",
      kotaTujuan: row.kota_tujuan || "-",
      beratAsli: row.berat_total,
      beratTampil: `${row.berat_total} KG`,
      status: currentStatus,
      badge: badgeColors[currentStatus] || badgeColors["Diproses"],
      namaKapal: row.nama_kapal || "Belum Ditentukan" 
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
              placeholder="Cari Resi atau Nama..." 
              defaultValue={searchParams.get("query")?.toString()} 
              onChange={(e) => handleSearch(e.target.value)} 
              className="bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl focus:border-[#A855F7] block w-64 pl-10 p-2.5 outline-none transition-all" 
            />
          </div>
        </div>

        <div className={`transition-opacity duration-200 ${isPending ? "opacity-40" : "opacity-100"}`}>
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
                    <th className="pb-4 px-4">Info Pengirim & Penerima</th>
                    <th className="pb-4 px-4">Rute Pengiriman</th>
                    <th className="pb-4 px-4">Total Berat</th>
                    <th className="pb-4 px-4 text-center">Status</th>
                    <th className="pb-4 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => (
                    <tr key={idx} className="border-b border-[#1E1E2E]/50 hover:bg-[#1A1A24] transition-all duration-200 group">
                      <td className="p-4 font-sans font-bold text-[#C084FC]">{item.resi}</td>
                      
                      <td className="p-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-[#1E1E2E] flex items-center justify-center text-[10px] text-blue-400">P</span>
                            <div>
                              <span className="text-slate-200 font-semibold">{item.pengirim}</span>
                              <span className="text-slate-500 text-xs ml-2">({item.telpPengirim})</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-[#1E1E2E] flex items-center justify-center text-[10px] text-green-400">R</span>
                            <div>
                              <span className="text-slate-200">{item.penerima}</span>
                              <span className="text-slate-500 text-xs ml-2">({item.telpPenerima})</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="text-slate-300 font-medium">{item.kotaAsal}</div>
                          <svg className="w-4 h-4 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                          <div className="text-slate-300 font-medium">{item.kotaTujuan}</div>
                        </div>
                        {/* DIUBAH: Baris div teks "Est. Tiba" resmi dihapus total dari sini */}
                      </td>

                      <td className="p-4 text-slate-400 font-sans">{item.beratTampil}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-md text-[11px] font-bold tracking-wide ${item.badge}`}>{item.status}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                          <button onClick={() => setDataDetail(item)} className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-400/10 transition-colors" title="Lihat Informasi Resi">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          </button>
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

        {/* CONTROLS PAGINATION PANEL */}
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

      {/* MODAL POP-UP DETAIL INFORMASI RESI */}
      {dataDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-scale-up">
            <div className="bg-[#1A1A24] px-6 py-4 border-b border-[#1E1E2E] flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Informasi Manifes Resi</h3>
              <button type="button" onClick={() => setDataDetail(null)} className="text-[#6B6B80] hover:text-white transition-colors">✕</button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="bg-[#0A0A12] border border-[#1E1E2E] p-4 rounded-xl space-y-2.5">
                <h4 className="text-xs font-bold text-[#A855F7] uppercase tracking-wider border-b border-[#1E1E2E] pb-1.5">Data Pengirim</h4>
                <div className="flex justify-between"><span className="text-[#6B6B80]">Nama:</span><span className="text-white font-semibold">{dataDetail.pengirim}</span></div>
                <div className="flex justify-between"><span className="text-[#6B6B80]">No. Telepon:</span><span className="text-slate-300 font-mono">{dataDetail.telpPengirim}</span></div>
              </div>

              <div className="bg-[#0A0A12] border border-[#1E1E2E] p-4 rounded-xl space-y-2.5">
                <h4 className="text-xs font-bold text-green-400 uppercase tracking-wider border-b border-[#1E1E2E] pb-1.5">Data Penerima</h4>
                <div className="flex justify-between"><span className="text-[#6B6B80]">Nama:</span><span className="text-white font-semibold">{dataDetail.penerima}</span></div>
                <div className="flex justify-between"><span className="text-[#6B6B80]">No. Telepon:</span><span className="text-slate-300 font-mono">{dataDetail.telpPenerima}</span></div>
              </div>

              <div className="bg-[#0A0A12] border border-[#1E1E2E] p-4 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider border-b border-[#1E1E2E] pb-1.5">Rute & Armada Logistik</h4>
                <div className="flex flex-col gap-1">
                  <span className="text-[#6B6B80] text-xs">Jalur Pelayaran:</span>
                  <div className="flex items-center gap-2 mt-0.5 bg-[#161622] p-2 rounded-lg border border-[#1E1E2E] justify-center">
                    <span className="text-white font-semibold text-xs">{dataDetail.kotaAsal}</span>
                    <svg className="w-3 h-3 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    <span className="text-white font-semibold text-xs">{dataDetail.kotaTujuan}</span>
                  </div>
                </div>
                <div className="flex justify-between pt-1"><span className="text-[#6B6B80]">Armada Kapal:</span><span className="text-purple-400 font-bold">{dataDetail.namaKapal}</span></div>
              </div>

              <button type="button" onClick={() => setDataDetail(null)} className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-[#A855F7] hover:bg-[#9333EA] transition-all">
                Tutup Manifes
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* MODAL CREATE RESI UTUH */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-up">
            <div className="bg-[#1A1A24] px-6 py-4 border-b border-[#1E1E2E] flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Buat Resi Kargo Baru</h3>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="text-[#6B6B80] hover:text-white transition-colors">✕</button>
            </div>
            
            <form onSubmit={handleSimpanBaru} noValidate className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
              
              <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-xl flex items-center gap-3">
                <span className="text-purple-400">⚡</span>
                <p className="text-xs text-purple-200 font-medium">Nomor Resi akan digenerate otomatis secara berurutan (Auto-Increment) oleh Database.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* KIRI: INFO CUSTOMER */}
                <div className="space-y-4">
                  <h4 className="text-[#C084FC] font-semibold text-sm border-b border-[#1E1E2E] pb-2">Informasi Customer & Logistik</h4>
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
                  
                  {/* INPUT TELEPON DIBAGI DUA */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">No. Telp Pengirim</label>
                      <input type="tel" name="noTeleponPengirim" onChange={() => clearError("noTeleponPengirim")} className={`w-full bg-[#0A0A12] border ${formErrors.noTeleponPengirim ? "border-red-500" : "border-[#1E1E2E] focus:border-[#A855F7]"} text-white text-sm rounded-xl p-2.5 outline-none transition-all`} />
                      {formErrors.noTeleponPengirim && <p className="text-red-400 text-xs mt-1.5 ml-2">{formErrors.noTeleponPengirim}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">No. Telp Penerima</label>
                      <input type="tel" name="noTeleponPenerima" onChange={() => clearError("noTeleponPenerima")} className={`w-full bg-[#0A0A12] border ${formErrors.noTeleponPenerima ? "border-red-500" : "border-[#1E1E2E] focus:border-[#A855F7]"} text-white text-sm rounded-xl p-2.5 outline-none transition-all`} />
                      {formErrors.noTeleponPenerima && <p className="text-red-400 text-xs mt-1.5 ml-2">{formErrors.noTeleponPenerima}</p>}
                    </div>
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
                      <select name="kotaTujuan" onChange={() => clearError("kotaTujuan")} className={`w-full bg-[#0A0A12] border ${formErrors.kotaTujuan ? "border-red-500 shadow-[0_0_10px_#EF4444]" : "border-[#1E1E2E] focus:border-[#A855F7]"} text-white text-sm rounded-xl p-2.5 outline-none transition-all`}>
                        <option value="Surabaya (Tanjung Perak)">Surabaya (Tanjung Perak)</option>
                        <option value="Jakarta (Tanjung Priok)">Jakarta (Tanjung Priok)</option>
                        <option value="Semarang (Tanjung Emas)">Semarang (Tanjung Emas)</option>
                        <option value="Makassar (Soekarno-Hatta)">Makassar (Soekarno-Hatta)</option>
                        <option value="Medan (Belawan)">Medan (Belawan)</option>
                      </select>
                    </div>
                  </div>
                  {formErrors.kotaTujuan && <p className="text-red-400 text-xs mt-1 font-semibold animate-pulse bg-red-900/20 p-2 rounded-lg border border-red-500/30">⚠️ {formErrors.kotaTujuan}</p>}
                </div>

                {/* KANAN: SPESIFIKASI KAPAL DINAMIS */}
                <div className="space-y-4">
                  <h4 className="text-[#C084FC] font-semibold text-sm border-b border-[#1E1E2E] pb-2">Spesifikasi Kargo & Armada Kapal</h4>
                  <div>
                    <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Tanggal Kirim</label>
                    <input type="date" name="tanggalKirim" onChange={() => clearError("tanggalKirim")} className={`w-full bg-[#0A0A12] border ${formErrors.tanggalKirim ? "border-red-500" : "border-[#1E1E2E] focus:border-[#A855F7]"} text-white text-sm rounded-xl p-2.5 outline-none transition-all`} />
                    {formErrors.tanggalKirim && <p className="text-red-400 text-xs mt-1.5 ml-2">{formErrors.tanggalKirim}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Berat Total (KG)</label>
                      <input 
                        type="number" 
                        name="beratTotal" 
                        value={beratInput}
                        onChange={handleBeratChange}
                        placeholder="Ketik berat..."
                        className={`w-full bg-[#0A0A12] border ${formErrors.beratTotal ? "border-red-500 shadow-[0_0_10px_#EF4444]" : "border-[#1E1E2E] focus:border-[#A855F7]"} text-white text-sm rounded-xl p-2.5 outline-none transition-all font-sans`} 
                      />
                      {formErrors.beratTotal && <p className="text-red-400 text-xs mt-1.5 ml-1 leading-tight font-bold animate-pulse">{formErrors.beratTotal}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Harga Tarif (Auto)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-xs text-green-500 font-bold">Rp</span>
                        <input type="number" name="hargaTarif" value={hargaOtomatis} readOnly placeholder="Terhitung..." className="w-full bg-[#161622] border border-[#1E1E2E] text-[#4ADE80] font-bold text-sm rounded-xl pl-9 p-2.5 cursor-not-allowed font-sans outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Jenis Barang</label>
                      <select name="jenisBarang" className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#A855F7]">
                        <option value="Barang Umum">Barang Umum</option>
                        <option value="Peralatan Rumah Tangga">Peralatan Rumah Tangga</option>
                        <option value="Barang Elektronik">Barang Elektronik</option>
                        <option value="Kendaraan Bermotor & Sepeda">Kendaraan Bermotor & Sepeda</option>
                        <option value="Bahan Bangunan">Bahan Bangunan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Status Awal</label>
                      <div className="w-full bg-[#161622] border border-[#1E1E2E] text-gray-400 text-sm rounded-xl p-2.5 select-none font-medium">Diproses</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Layanan Pengiriman</label>
                      <select 
                        name="jenisPengiriman" 
                        value={layananTerpilih}
                        onChange={handleLayananChange} 
                        className="w-full bg-[#0A0A12] border border-[#1E1E2E] text-white text-sm rounded-xl p-2.5 outline-none focus:border-[#A855F7]"
                      >
                        <option value="Biasa">Biasa (Reguler)</option>
                        <option value="Cepat">Cepat (Express)</option>
                        <option value="VIP">VIP (Prioritas Utama)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Pilih Armada ({layananTerpilih})</label>
                      <select 
                        name="namaKapal" 
                        value={kapalTerpilih}
                        onChange={(e) => { setKapalTerpilih(e.target.value); clearError("namaKapal"); }} 
                        className={`w-full bg-[#0A0A12] border ${formErrors.namaKapal ? "border-red-500" : "border-[#1E1E2E] focus:border-[#A855F7]"} text-white text-sm rounded-xl p-2.5 outline-none transition-all`}
                      >
                        <option value="" disabled hidden>-- Pilih Kapal --</option>
                        {layananInfo.kapal.map(k => (
                          <option key={k} value={k}>{k}</option>
                        ))}
                      </select>
                      {formErrors.namaKapal && <p className="text-red-400 text-xs mt-1.5 ml-2">{formErrors.namaKapal}</p>}
                    </div>
                  </div>

                  {kapalTerpilih && (
                    <div className="bg-[#0A0A12] border border-[#1E1E2E] p-4 rounded-xl space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-[#A0A0B0]">Kapasitas Kapal ({layananInfo.tipe})</span>
                        <span className="font-bold font-sans text-purple-400">
                          {proyeksiBeban.toLocaleString("id-ID")} / {maxKapasitas.toLocaleString("id-ID")} KG
                        </span>
                      </div>
                      
                      <div className="w-full h-2.5 bg-[#161622] rounded-full overflow-hidden border border-[#1E1E2E] relative">
                        <div className="absolute top-0 left-0 h-full bg-slate-600" style={{ width: `${(bebanSaatIni / maxKapasitas) * 100}%` }}></div>
                        <div className={`absolute top-0 h-full transition-all duration-300 ${isOverload ? 'bg-red-500' : 'bg-purple-500'}`} style={{ left: `${(bebanSaatIni / maxKapasitas) * 100}%`, width: `${(inputBeratNum / maxKapasitas) * 100}%` }}></div>
                      </div>

                      <div className="flex justify-between items-center pt-1">
                        <span className="text-[10px] text-[#6B6B80] tracking-widest uppercase">Status Kelayakan:</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${isOverload ? 'bg-red-500/20 text-red-400 border border-red-500/50' : loadPercentage >= 100 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' : 'bg-green-500/20 text-green-400 border border-green-500/50'}`}>
                          {statusKelayakan}
                        </span>
                      </div>
                    </div>
                  )}

                  {!kapalTerpilih && (
                     <div className="grid grid-cols-2 gap-3">
                       <div>
                         <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Kode Registrasi (IMO Auto)</label>
                         <input type="text" name="kodeKapal" value={autoImo} readOnly className="w-full bg-[#161622] border border-[#1E1E2E] text-[#6B6B80] font-sans text-sm rounded-xl p-2.5 cursor-not-allowed outline-none" />
                       </div>
                       <div>
                         <label className="block text-xs font-semibold text-[#A0A0B0] mb-1.5">Status Kelayakan Armada</label>
                         <div className="w-full bg-[#161622] border border-[#1E1E2E] text-gray-500 text-sm rounded-xl p-2.5 select-none font-medium">-</div>
                       </div>
                     </div>
                  )}

                </div>
              </div>

              {/* ACTION FOOTER BUTTONS */}
              <div className="pt-6 border-t border-[#1E1E2E] flex justify-end gap-3 bg-[#13131F]">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-[#A0A0B0] bg-[#1A1A24] border border-[#1E1E2E] hover:text-white transition-colors">Batal</button>
                <button type="submit" disabled={isOverload} className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all ${isOverload ? 'bg-slate-600 cursor-not-allowed opacity-50' : 'bg-purple-600 hover:bg-purple-700 shadow-[0_0_15px_rgba(168,85,247,0.4)]'}`}>
                  Simpan & Cetak Resi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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