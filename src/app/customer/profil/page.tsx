"use client";

import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import CustomerNavbar from "@/components/layout/CustomerNavbar";
import { updateProfileAction, getUserProfile } from "./action";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CustomerProfile() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    whatsapp: "",
    perusahaan: "",
    alamat: "",
  });

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", isError: false });

  // Ambil data user saat halaman pertama kali dimuat
  useEffect(() => {
    async function loadProfile() {
      const data = await getUserProfile() as any;
      if (data) {
        setForm({
          nama: String(data.nama || ""),
          email: String(data.email || ""),
          whatsapp: String(data.no_whatsapp || ""),
          perusahaan: String(data.perusahaan || ""),
          alamat: String(data.alamat || ""),
        });
      }
      setIsLoadingData(false);
    }
    loadProfile();
  }, []);

  const showToast = (message: string, isError = false) => {
    setToast({ show: true, message, isError });
    setTimeout(() => setToast({ show: false, message: "", isError: false }), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nama.trim()) {
      showToast("Nama Pengirim (PIC) wajib diisi.", true);
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("nama", form.nama);
      formDataObj.append("whatsapp", form.whatsapp);
      formDataObj.append("perusahaan", form.perusahaan);
      formDataObj.append("alamat", form.alamat);

      const result = await updateProfileAction(formDataObj);

      if (result.error) {
        showToast(result.error, true);
      } else {
        setShowModal(true);
      }
    } catch (err) {
      showToast("Terjadi kesalahan sistem. Coba lagi nanti.", true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${poppins.className} flex flex-col min-h-screen bg-[#0A0A12] relative overflow-hidden`}>
      <CustomerNavbar />

      {/* Modal Sukses */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-[#13131F] border border-[#A855F7]/50 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-[0_0_40px_rgba(168,85,247,0.3)] flex flex-col items-center gap-5 animate-zoom-in">
            <div className="w-16 h-16 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/40 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] animate-pulse-glow">
              <svg className="w-8 h-8 text-[#C084FC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-white font-bold text-xl">Profil Diperbarui!</h2>
              <p className="text-[#A0A0B0] text-sm leading-relaxed">
                Informasi logistik Anda telah berhasil disimpan.
              </p>
            </div>
            <button
              suppressHydrationWarning={true}
              onClick={() => setShowModal(false)}
              className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)] active:scale-95"
            >
              Lanjutkan
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        <main className="flex-1 px-10 py-12 overflow-y-auto">
          
          {/* Title Header */}
          <div className="text-center mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-white font-bold text-3xl tracking-wide">Pengaturan Profil</h1>
            <p className="text-[#A0A0B0] text-sm mt-2">
              Kelola informasi kontak dan identitas logistik Anda untuk kemudahan pengiriman.
            </p>
            <div className="w-12 h-1.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] mx-auto mt-4 rounded-full" />
          </div>

          {/* Form Card */}
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 md:p-10 max-w-4xl mx-auto shadow-2xl opacity-0 animate-zoom-in relative" style={{ animationDelay: "0.3s" }}>
            {isLoadingData ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-[#1E1E2E] border-t-[#A855F7] rounded-full animate-spin"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="relative z-10">
                
                {/* Baris 1: Nama Pengirim & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Nama Pengirim (PIC)</label>
                    <input
                      suppressHydrationWarning={true}
                      type="text"
                      name="nama"
                      value={form.nama}
                      onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                      className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#A855F7] transition-all duration-300"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Alamat Email (Login)</label>
                    <input
                      suppressHydrationWarning={true}
                      type="email"
                      name="email"
                      value={form.email}
                      disabled
                      className="bg-[#0A0A12]/50 border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white/50 text-sm cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Baris 2: Nomor WhatsApp & Nama Perusahaan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Nomor WhatsApp Aktif</label>
                    <input
                      suppressHydrationWarning={true}
                      type="text"
                      name="whatsapp"
                      value={form.whatsapp}
                      onChange={handleChange}
                      placeholder="Contoh: 0812345678901"
                      className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#A855F7] transition-all duration-300"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                      Nama Perusahaan <span className="text-[#6B6B80] normal-case tracking-normal font-normal text-[10px]">(opsional)</span>
                    </label>
                    <input
                      suppressHydrationWarning={true}
                      type="text"
                      name="perusahaan"
                      value={form.perusahaan}
                      onChange={handleChange}
                      placeholder="Contoh: PT. Logistik Praketrio"
                      className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#A855F7] transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Baris 3: Alamat Penjemputan / Tagihan */}
                <div className="flex flex-col gap-2.5 mb-10">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Alamat Penjemputan / Tagihan</label>
                  <textarea
                    suppressHydrationWarning={true}
                    name="alamat"
                    value={form.alamat}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Masukkan alamat lengkap..."
                    className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#A855F7] transition-all duration-300 resize-none"
                  />
                </div>

                {/* Tombol Aksi */}
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-[#1E1E2E]">
                  <Link href="/customer/dashboard">
                    <button
                      suppressHydrationWarning={true}
                      type="button"
                      className="w-full sm:w-auto border border-[#1E1E2E] hover:border-[#A855F7]/50 hover:bg-[#1E1E2E] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-300 active:scale-95"
                    >
                      Batal & Kembali
                    </button>
                  </Link>
                  <button
                    suppressHydrationWarning={true}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#A855F7] to-[#C084FC] text-white font-bold px-10 py-3.5 rounded-xl text-sm transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? "Menyimpan..." : "Simpan Perubahan →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>

      {/* TOAST NOTIFIKASI ERROR */}
      {toast.show && (
        <div className={`fixed bottom-10 right-10 backdrop-blur-md text-white border px-8 py-4 rounded-2xl animate-in fade-in slide-in-from-bottom duration-500 flex items-center gap-3 font-bold z-[100] text-sm shadow-lg ${toast.isError ? "bg-red-900/90 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.4)]" : "bg-[#12122c]/90 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)]"}`}>
          <svg className={`w-5 h-5 animate-pulse ${toast.isError ? "text-red-400" : "text-purple-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={toast.isError ? "M6 18L18 6M6 6l12 12" : "M5 13l4 4L19 7"} />
          </svg>
          {toast.message}
        </div>
      )}
    </div>
  );
}