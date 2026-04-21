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
    alert("Paket berhasil didaftarkan!");
    handleReset();
  };

  return (
    <div className={`${poppins.className} flex min-h-screen bg-[#0D0D2B]`}>
      <CustomerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="flex items-center justify-between px-10 py-5 border-b border-[#2D1B69] shadow-[0_1px_20px_rgba(168,85,247,0.08)]">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-lg tracking-widest uppercase">
              Praketrio
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#A855F7]/20 border border-[#A855F7]/40 flex items-center justify-center text-[#A855F7] text-xs font-bold">
              P
            </div>
            <span className="text-white/80 font-medium text-sm">Halo, Praba</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-10 py-8">

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-white font-bold text-2xl tracking-wide">
              Form Input Barang
            </h1>
            <p className="text-[#A0A0B0] text-sm mt-1">
              Isi data pengiriman kamu dengan lengkap
            </p>
            <div className="w-10 h-1 bg-[#A855F7] mx-auto mt-3 rounded-full" />
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#13133A] border border-[#A855F7]/40 rounded-2xl p-8 max-w-3xl mx-auto shadow-[0_0_30px_rgba(168,85,247,0.15)]"
          >

            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#C084FC] text-xs font-semibold uppercase tracking-widest">
                  Nama Pengirim
                </label>
                <input
                  type="text"
                  name="namaPengirim"
                  value={form.namaPengirim}
                  onChange={handleChange}
                  placeholder="Masukkan nama pengirim"
                  className="bg-[#0D0D2B] border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#A855F7] focus:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all duration-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#C084FC] text-xs font-semibold uppercase tracking-widest">
                  Nama Penerima
                </label>
                <input
                  type="text"
                  name="namaPenerima"
                  value={form.namaPenerima}
                  onChange={handleChange}
                  placeholder="Masukkan nama penerima"
                  className="bg-[#0D0D2B] border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#A855F7] focus:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all duration-200"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#C084FC] text-xs font-semibold uppercase tracking-widest">
                  Kota Asal
                </label>
                <input
                  type="text"
                  name="kotaAsal"
                  value={form.kotaAsal}
                  onChange={handleChange}
                  placeholder="Masukkan kota asal"
                  className="bg-[#0D0D2B] border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#A855F7] focus:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all duration-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#C084FC] text-xs font-semibold uppercase tracking-widest">
                  Kota Tujuan
                </label>
                <input
                  type="text"
                  name="kotaTujuan"
                  value={form.kotaTujuan}
                  onChange={handleChange}
                  placeholder="Masukkan kota tujuan"
                  className="bg-[#0D0D2B] border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#A855F7] focus:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all duration-200"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-[#C084FC] text-xs font-semibold uppercase tracking-widest">
                  Berat (kg)
                </label>
                <input
                  type="number"
                  name="berat"
                  value={form.berat}
                  onChange={handleChange}
                  placeholder="Contoh: 10"
                  className="bg-[#0D0D2B] border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#A855F7] focus:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all duration-200"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#C084FC] text-xs font-semibold uppercase tracking-widest">
                  Jenis Barang
                </label>
                <input
                  type="text"
                  name="jenisBarang"
                  value={form.jenisBarang}
                  onChange={handleChange}
                  placeholder="Contoh: Elektronik"
                  className="bg-[#0D0D2B] border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#A855F7] focus:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all duration-200"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col gap-2 mb-8">
              <label className="text-[#C084FC] text-xs font-semibold uppercase tracking-widest">
                Catatan{" "}
                <span className="text-white/30 normal-case tracking-normal font-normal">
                  (opsional)
                </span>
              </label>
              <input
                type="text"
                name="catatan"
                value={form.catatan}
                onChange={handleChange}
                placeholder="Tambahkan catatan jika diperlukan"
                className="bg-[#0D0D2B] border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#A855F7] focus:shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all duration-200"
              />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#A855F7]/20 mb-8" />

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="border border-[#4B2D8A] hover:border-[#A855F7] hover:shadow-[0_0_12px_rgba(168,85,247,0.2)] text-white/70 hover:text-white font-semibold px-10 py-3 rounded-lg text-sm transition-all duration-200"
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-[#A855F7]/10 border border-[#A855F7] hover:bg-[#A855F7]/25 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white font-semibold px-10 py-3 rounded-lg text-sm transition-all duration-200"
              >
                Daftarkan Paket
              </button>
            </div>

          </form>
        </main>
      </div>
    </div>
  );
}