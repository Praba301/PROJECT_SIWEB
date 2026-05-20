"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import CustomerSidebar from "@/components/layout/CustomerSidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function CustomerDashboard() {
  const [form, setForm] = useState({
    namaPengirim: "",
    namaPenerima: "",
    kotaAsal: "",
    kotaTujuan: "",
    berat: "",
    jenisBarang: "",
    catatan: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setForm({
      namaPengirim: "",
      namaPenerima: "",
      kotaAsal: "",
      kotaTujuan: "",
      berat: "",
      jenisBarang: "",
      catatan: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    handleReset();
  };

  return (
    <div className={`${poppins.className} flex min-h-screen bg-[#0A0A12] relative overflow-hidden`}>
      <CustomerSidebar />

      {/* Custom Modal - Animasi Zoom In Membal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-[#13131F] border border-[#A855F7]/50 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-[0_0_40px_rgba(168,85,247,0.3)] flex flex-col items-center gap-5 opacity-0 animate-zoom-in">

            {/* Icon dengan efek Pulse Glow */}
            <div className="w-16 h-16 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/40 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] animate-pulse-glow">
              <svg className="w-8 h-8 text-[#C084FC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Text */}
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-white font-bold text-xl">Paket Terdaftar!</h2>
              <p className="text-[#A0A0B0] text-sm leading-relaxed">
                Data pengirimanmu telah kami terima dan akan segera diproses oleh tim operasional.
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] active:scale-95"
            >
              Oke, Mengerti!
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A855F7]/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Header - Masuk dari bawah */}
        <header className="flex items-center justify-between px-10 py-6 border-b border-[#1E1E2E] bg-[#0A0A12]/80 backdrop-blur-md sticky top-0 z-20 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <span className="text-[#A855F7] font-bold text-lg tracking-widest uppercase font-mono">
            Dashboard
          </span>
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex flex-col items-end">
              <span className="text-white font-bold text-sm transition-colors group-hover:text-[#C084FC]">Praba</span>
              <span className="text-[#6B6B80] text-xs">Customer</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1E1E2E] border border-[#A855F7]/40 flex items-center justify-center text-[#A855F7] text-sm font-bold shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-transform duration-300 group-hover:scale-110">
              P
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-10 py-10 overflow-y-auto">

          {/* Title */}
          <div className="text-center mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-white font-bold text-3xl tracking-wide">
              Form Input Barang
            </h1>
            <p className="text-[#A0A0B0] text-sm mt-2">
              Isi kelengkapan data kargo Anda untuk mulai membuat nomor resi pelacakan.
            </p>
            <div className="w-12 h-1.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] mx-auto mt-4 rounded-full" />
          </div>

          {/* Form Card - Animasi Membal */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 md:p-10 max-w-3xl mx-auto shadow-2xl opacity-0 animate-zoom-in relative"
            style={{ animationDelay: "0.3s" }}
          >
            {/* Dekorasi Sudut Form */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#A855F7]/10 to-transparent rounded-tl-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Nama Pengirim</label>
                  <input
                    type="text"
                    name="namaPengirim"
                    value={form.namaPengirim}
                    onChange={handleChange}
                    placeholder="Masukkan nama pengirim"
                    required
                    className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:border-[#A855F7]/50"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Nama Penerima</label>
                  <input
                    type="text"
                    name="namaPenerima"
                    value={form.namaPenerima}
                    onChange={handleChange}
                    placeholder="Masukkan nama penerima"
                    required
                    className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:border-[#A855F7]/50"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Kota Asal</label>
                  <input
                    type="text"
                    name="kotaAsal"
                    value={form.kotaAsal}
                    onChange={handleChange}
                    placeholder="Masukkan kota asal"
                    required
                    className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:border-[#A855F7]/50"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Kota Tujuan</label>
                  <input
                    type="text"
                    name="kotaTujuan"
                    value={form.kotaTujuan}
                    onChange={handleChange}
                    placeholder="Masukkan kota tujuan"
                    required
                    className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:border-[#A855F7]/50"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Berat (kg)</label>
                  <input
                    type="number"
                    name="berat"
                    value={form.berat}
                    onChange={handleChange}
                    placeholder="Contoh: 150"
                    required
                    className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:border-[#A855F7]/50 font-mono"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Jenis Barang</label>
                  <input
                    type="text"
                    name="jenisBarang"
                    value={form.jenisBarang}
                    onChange={handleChange}
                    placeholder="Contoh: Elektronik / Garment"
                    required
                    className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:border-[#A855F7]/50"
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex flex-col gap-2.5 mb-10">
                <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                  Catatan Tambahan <span className="text-[#6B6B80] normal-case tracking-normal font-normal bg-[#1E1E2E] px-2 py-0.5 rounded-full text-[10px]">Opsional</span>
                </label>
                <textarea
                  name="catatan"
                  value={form.catatan}
                  onChange={handleChange}
                  placeholder="Tambahkan instruksi khusus untuk penanganan paket (contoh: Jangan dibanting)"
                  rows={3}
                  className="bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 hover:border-[#A855F7]/50 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-[#1E1E2E]">
                <button
                  type="button"
                  onClick={handleReset}
                  className="border border-[#1E1E2E] hover:border-[#A855F7]/50 hover:bg-[#1E1E2E] text-[#A0A0B0] hover:text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-300 active:scale-95"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold px-10 py-3.5 rounded-xl text-sm transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95 flex items-center justify-center gap-2"
                >
                  Daftarkan Paket
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}