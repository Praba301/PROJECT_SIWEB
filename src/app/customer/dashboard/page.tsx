"use client";

import { useState } from "react";
import CustomerSidebar from "@/components/layout/CustomerSidebar";

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
    <div className="flex min-h-screen bg-[#0D0D2B]">
      <CustomerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="flex items-center justify-between px-10 py-5 border-b border-[#2D1B69]">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-lg">Praketrio</span>
          </div>
          <span className="text-white font-semibold text-sm">Halo, Praba</span>
        </header>

        {/* Content */}
        <main className="flex-1 px-10 py-8">
          <h1 className="text-white font-bold text-2xl text-center mb-8 font-mono">
            Form input barang
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-[#13133A] border border-[#2D1B69] rounded-xl p-8 max-w-3xl mx-auto"
          >
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-white text-xs font-semibold">Nama pengirim</label>
                <input
                  type="text"
                  name="namaPengirim"
                  value={form.namaPengirim}
                  onChange={handleChange}
                  className="bg-transparent border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white text-xs font-semibold">Nama penerima</label>
                <input
                  type="text"
                  name="namaPenerima"
                  value={form.namaPenerima}
                  onChange={handleChange}
                  className="bg-transparent border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-white text-xs font-semibold">Kota asal</label>
                <input
                  type="text"
                  name="kotaAsal"
                  value={form.kotaAsal}
                  onChange={handleChange}
                  className="bg-transparent border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white text-xs font-semibold">Kota tujuan</label>
                <input
                  type="text"
                  name="kotaTujuan"
                  value={form.kotaTujuan}
                  onChange={handleChange}
                  className="bg-transparent border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-white text-xs font-semibold">Berat (kg)</label>
                <input
                  type="number"
                  name="berat"
                  value={form.berat}
                  onChange={handleChange}
                  className="bg-transparent border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white text-xs font-semibold">Jenis barang</label>
                <input
                  type="text"
                  name="jenisBarang"
                  value={form.jenisBarang}
                  onChange={handleChange}
                  className="bg-transparent border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col gap-2 mb-8">
              <label className="text-white text-xs font-semibold">Catatan (opsional)</label>
              <input
                type="text"
                name="catatan"
                value={form.catatan}
                onChange={handleChange}
                className="bg-transparent border border-[#4B2D8A] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7]"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-6">
              <button
                type="button"
                onClick={handleReset}
                className="border border-[#4B2D8A] hover:border-[#A855F7] text-white font-semibold px-10 py-3 rounded-lg text-sm transition-all duration-200"
              >
                Reset
              </button>
              <button
                type="submit"
                className="border border-[#A855F7] hover:bg-[#A855F7]/20 text-white font-semibold px-10 py-3 rounded-lg text-sm transition-all duration-200"
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