"use client";

import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import CustomerNavbar from "@/components/layout/CustomerNavbar";
import { tambahResiDatabase } from "@/app/admin/pengiriman/action";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HARGA_PER_KG = 25000;

export default function CustomerDashboard() {
  const [form, setForm] = useState({
    namaPengirim: "",
    namaPenerima: "",
    noTelepon: "",
    kotaAsal: "",
    kotaTujuan: "",
    berat: "",
    jenisBarang: "",
    catatan: "",
    tipePaket: "", // REGULER, EXPRESS, VVIP
  });

  const [errors, setErrors] = useState({
    namaPengirim: "",
    namaPenerima: "",
    noTelepon: "",
    kotaAsal: "",
    kotaTujuan: "",
    berat: "",
    jenisBarang: "",
    tipePaket: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [totalBiaya, setTotalBiaya] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi hitung total biaya
  const hitungTotalBiaya = (berat: number, tipePaket: string) => {
    if (berat <= 0 || !tipePaket) return 0;
    
    const hargaDasar = berat * HARGA_PER_KG;
    
    if (tipePaket === "EXPRESS") {
      return hargaDasar + (hargaDasar * 0.35);
    } else if (tipePaket === "VVIP") {
      return hargaDasar + (hargaDasar * 0.75);
    }
    return hargaDasar; // REGULER
  };

  // Update total biaya setiap berat atau tipePaket berubah
  useEffect(() => {
    const beratNum = parseFloat(form.berat);
    if (!isNaN(beratNum) && form.tipePaket) {
      const total = hitungTotalBiaya(beratNum, form.tipePaket);
      setTotalBiaya(total);
    } else {
      setTotalBiaya(0);
    }
  }, [form.berat, form.tipePaket]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleReset = () => {
    setForm({
      namaPengirim: "",
      namaPenerima: "",
      noTelepon: "",
      kotaAsal: "",
      kotaTujuan: "",
      berat: "",
      jenisBarang: "",
      catatan: "",
      tipePaket: "",
    });
    setErrors({
      namaPengirim: "",
      namaPenerima: "",
      noTelepon: "",
      kotaAsal: "",
      kotaTujuan: "",
      berat: "",
      jenisBarang: "",
      tipePaket: "",
    });
    setTotalBiaya(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    let newErrors = { ...errors };

    if (!form.namaPengirim.trim()) {
      newErrors.namaPengirim = "Nama pengirim wajib diisi.";
      isValid = false;
    }
    if (!form.namaPenerima.trim()) {
      newErrors.namaPenerima = "Nama penerima wajib diisi.";
      isValid = false;
    }
    if (!form.noTelepon.trim()) {
      newErrors.noTelepon = "Nomor telepon wajib diisi.";
      isValid = false;
    }
    if (!form.kotaAsal.trim()) {
      newErrors.kotaAsal = "Kota asal keberangkatan wajib diisi.";
      isValid = false;
    }
    if (!form.kotaTujuan.trim()) {
      newErrors.kotaTujuan = "Kota tujuan pengiriman wajib diisi.";
      isValid = false;
    }
    if (!form.berat || parseFloat(form.berat) <= 0) {
      newErrors.berat = "Berat barang harus diisi dengan angka yang valid.";
      isValid = false;
    }
    if (!form.jenisBarang.trim()) {
      newErrors.jenisBarang = "Jenis barang wajib diisi.";
      isValid = false;
    }
    if (!form.tipePaket) {
      newErrors.tipePaket = "Tipe paket wajib dipilih.";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Siapkan FormData untuk dikirim ke server action
      const formData = new FormData();
      formData.append("namaPengirim", form.namaPengirim);
      formData.append("namaPenerima", form.namaPenerima);
      formData.append("noTelepon", form.noTelepon);
      formData.append("kotaAsal", form.kotaAsal);
      formData.append("kotaTujuan", form.kotaTujuan);
      formData.append("beratTotal", form.berat);
      formData.append("jenisBarang", form.jenisBarang);
      formData.append("deskripsi", form.catatan);
      formData.append("tipePaket", form.tipePaket);
      formData.append("totalBiaya", totalBiaya.toString());
      formData.append("tanggalKirim", new Date().toISOString().split("T")[0]);
      formData.append("hargaTarif", (parseFloat(form.berat) * HARGA_PER_KG).toString());
      formData.append("jenisPengiriman", form.tipePaket === "EXPRESS" ? "Ekspres" : "Reguler");
      formData.append("namaKapal", "Kapal Kargo Umum");
      formData.append("jenisKapal", "Kapal Kargo Umum");
      formData.append("kodeKapal", "KCU-001");
      formData.append("kapasitasMuatan", "100");
      formData.append("noResiInput", "");

      const result = await tambahResiDatabase(formData);

      if (result.success) {
        setShowModal(true);
        handleReset();
      } else {
        alert("Gagal menyimpan data: " + (result.error || "Terjadi kesalahan"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className={`${poppins.className} flex flex-col min-h-screen bg-[#0A0A12] relative overflow-hidden`}>
      
      <CustomerNavbar />

      {/* Custom Modal Sukses */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-[#13131F] border border-[#A855F7]/50 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-[0_0_40px_rgba(168,85,247,0.3)] flex flex-col items-center gap-5 opacity-0 animate-zoom-in">
            <div className="w-16 h-16 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/40 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] animate-pulse-glow">
              <svg className="w-8 h-8 text-[#C084FC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-white font-bold text-xl">Paket Terdaftar!</h2>
              <p className="text-[#A0A0B0] text-sm leading-relaxed">
                Data pengirimanmu telah kami terima dan akan segera diproses oleh tim operasional.
              </p>
            </div>
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

        <main className="flex-1 px-10 py-12 overflow-y-auto">

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

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            noValidate 
            className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 md:p-10 max-w-3xl mx-auto shadow-2xl opacity-0 animate-zoom-in relative"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#A855F7]/10 to-transparent rounded-tl-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Row 1: Nama Pengirim + Nama Penerima */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Nama Pengirim</label>
                  <input
                    type="text"
                    name="namaPengirim"
                    value={form.namaPengirim}
                    onChange={handleChange}
                    placeholder="Masukkan nama pengirim"
                    className={`bg-[#0A0A12] border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:ring-1 transition-all duration-300 ${
                      errors.namaPengirim 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
                        : "border-[#1E1E2E] focus:border-[#A855F7] focus:ring-[#A855F7] hover:border-[#A855F7]/50"
                    }`}
                  />
                  {errors.namaPengirim && <span className="text-red-400 text-[10px] italic animate-fade-in-up mt-1">{errors.namaPengirim}</span>}
                </div>
                
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Nama Penerima</label>
                  <input
                    type="text"
                    name="namaPenerima"
                    value={form.namaPenerima}
                    onChange={handleChange}
                    placeholder="Masukkan nama penerima"
                    className={`bg-[#0A0A12] border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:ring-1 transition-all duration-300 ${
                      errors.namaPenerima 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
                        : "border-[#1E1E2E] focus:border-[#A855F7] focus:ring-[#A855F7] hover:border-[#A855F7]/50"
                    }`}
                  />
                  {errors.namaPenerima && <span className="text-red-400 text-[10px] italic animate-fade-in-up mt-1">{errors.namaPenerima}</span>}
                </div>
              </div>

              {/* Row 2: No Telepon + Kota Asal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">No Telepon</label>
                  <input
                    type="tel"
                    name="noTelepon"
                    value={form.noTelepon}
                    onChange={handleChange}
                    placeholder="Masukkan nomor telepon"
                    className={`bg-[#0A0A12] border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:ring-1 transition-all duration-300 ${
                      errors.noTelepon 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
                        : "border-[#1E1E2E] focus:border-[#A855F7] focus:ring-[#A855F7] hover:border-[#A855F7]/50"
                    }`}
                  />
                  {errors.noTelepon && <span className="text-red-400 text-[10px] italic animate-fade-in-up mt-1">{errors.noTelepon}</span>}
                </div>
                
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Kota Asal</label>
                  <input
                    type="text"
                    name="kotaAsal"
                    value={form.kotaAsal}
                    onChange={handleChange}
                    placeholder="Masukkan kota asal"
                    className={`bg-[#0A0A12] border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:ring-1 transition-all duration-300 ${
                      errors.kotaAsal 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
                        : "border-[#1E1E2E] focus:border-[#A855F7] focus:ring-[#A855F7] hover:border-[#A855F7]/50"
                    }`}
                  />
                  {errors.kotaAsal && <span className="text-red-400 text-[10px] italic animate-fade-in-up mt-1">{errors.kotaAsal}</span>}
                </div>
              </div>

              {/* Row 3: Kota Tujuan + Berat */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Kota Tujuan</label>
                  <input
                    type="text"
                    name="kotaTujuan"
                    value={form.kotaTujuan}
                    onChange={handleChange}
                    placeholder="Masukkan kota tujuan"
                    className={`bg-[#0A0A12] border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:ring-1 transition-all duration-300 ${
                      errors.kotaTujuan 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
                        : "border-[#1E1E2E] focus:border-[#A855F7] focus:ring-[#A855F7] hover:border-[#A855F7]/50"
                    }`}
                  />
                  {errors.kotaTujuan && <span className="text-red-400 text-[10px] italic animate-fade-in-up mt-1">{errors.kotaTujuan}</span>}
                </div>
                
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Berat (kg)</label>
                  <input
                    type="number"
                    name="berat"
                    value={form.berat}
                    onChange={handleChange}
                    placeholder="Contoh: 150"
                    className={`bg-[#0A0A12] border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:ring-1 transition-all duration-300 font-mono ${
                      errors.berat 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
                        : "border-[#1E1E2E] focus:border-[#A855F7] focus:ring-[#A855F7] hover:border-[#A855F7]/50"
                    }`}
                  />
                  {errors.berat && <span className="text-red-400 text-[10px] italic animate-fade-in-up mt-1">{errors.berat}</span>}
                </div>
              </div>

              {/* Row 4: Jenis Barang + Tipe Paket */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Jenis Barang</label>
                  <input
                    type="text"
                    name="jenisBarang"
                    value={form.jenisBarang}
                    onChange={handleChange}
                    placeholder="Contoh: Elektronik / Garment"
                    className={`bg-[#0A0A12] border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-[#6B6B80] focus:outline-none focus:ring-1 transition-all duration-300 ${
                      errors.jenisBarang 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
                        : "border-[#1E1E2E] focus:border-[#A855F7] focus:ring-[#A855F7] hover:border-[#A855F7]/50"
                    }`}
                  />
                  {errors.jenisBarang && <span className="text-red-400 text-[10px] italic animate-fade-in-up mt-1">{errors.jenisBarang}</span>}
                </div>
                
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">
                    Tipe Paket <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="tipePaket"
                    value={form.tipePaket}
                    onChange={handleChange}
                    className={`bg-[#0A0A12] border rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-1 transition-all duration-300 ${
                      errors.tipePaket 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
                        : "border-[#1E1E2E] focus:border-[#A855F7] focus:ring-[#A855F7] hover:border-[#A855F7]/50"
                    }`}
                  >
                    <option value="">Pilih Tipe Paket</option>
                    <option value="REGULER">Reguler (0% tambahan)</option>
                    <option value="EXPRESS">Express (+35%)</option>
                    <option value="VVIP">VVIP (+75%)</option>
                  </select>
                  {errors.tipePaket && <span className="text-red-400 text-[10px] italic animate-fade-in-up mt-1">{errors.tipePaket}</span>}
                </div>
              </div>

              {/* Row 5: Total Biaya (Full width) */}
              <div className="mb-6">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest">Total Biaya Pengiriman</label>
                  <div className="bg-gradient-to-r from-[#A855F7]/20 to-[#C084FC]/20 border border-[#A855F7]/30 rounded-xl px-4 py-3.5">
                    <span className="text-2xl font-bold text-white">
                      {totalBiaya > 0 ? formatRupiah(totalBiaya) : "Rp 0"}
                    </span>
                    <p className="text-[#A0A0B0] text-[10px] mt-1">
                      *Harga dasar Rp{HARGA_PER_KG.toLocaleString()}/kg
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 6: Catatan Tambahan */}
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
                  disabled={isLoading}
                  className="border border-[#1E1E2E] hover:border-[#A855F7]/50 hover:bg-[#1E1E2E] text-[#A0A0B0] hover:text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold px-10 py-3.5 rounded-xl text-sm transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Menyimpan..." : "Daftarkan Paket"}
                  {!isLoading && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}