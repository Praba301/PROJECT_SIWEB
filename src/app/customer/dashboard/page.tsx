"use client";

import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import CustomerNavbar from "@/components/layout/CustomerNavbar";
import { tambahResiDatabase } from "@/app/admin/pengiriman/action";
import InvoiceModal from "@/components/InvoiceModal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const HARGA_PER_KG = 25000;

// Data untuk combobox
const daftarKota = [
  "Jakarta",
  "Surabaya",
  "Semarang",
  "Makassar",
  "Medan",
];

const daftarJenisBarang = [
  "Barang Umum",
  "Peralatan Rumah Tangga",
  "Peralatan Elektronik",
  "Kendaraan Bermotor & Sepeda",
  "Bahan Bangunan",
];

// Fungsi untuk mengambil data user yang login
async function getUserFromToken() {
  try {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    if (data.success) {
      return data.user;
    }
  } catch (error) {
    console.error("Error getting user:", error);
  }
  return null;
}

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
    tipePaket: "",
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
  const [user, setUser] = useState<{ id: number; nama: string; role: string } | null>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [showInvoice, setShowInvoice] = useState(false);

  // Ambil data user yang login dan isi nama pengirim otomatis
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserFromToken();
      if (userData) {
        setUser(userData);
        setForm(prev => ({ ...prev, namaPengirim: userData.nama }));
      }
    };
    fetchUser();
  }, []);

  // Fungsi hitung total biaya
  const hitungTotalBiaya = (berat: number, tipePaket: string) => {
    if (berat <= 0 || !tipePaket) return 0;
    
    const hargaDasar = berat * HARGA_PER_KG;
    
    if (tipePaket === "EXPRESS") {
      return hargaDasar + (hargaDasar * 0.35);
    } else if (tipePaket === "VVIP") {
      return hargaDasar + (hargaDasar * 0.75);
    }
    return hargaDasar;
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
    
    // Reset error kotaTujuan jika kota asal diubah
    if (name === "kotaAsal" && errors.kotaTujuan === "Kota asal dan kota tujuan tidak boleh sama.") {
      setErrors(prev => ({ ...prev, kotaTujuan: "" }));
    }
    // Reset error kotaTujuan jika kota tujuan diubah
    if (name === "kotaTujuan" && errors.kotaTujuan === "Kota asal dan kota tujuan tidak boleh sama.") {
      setErrors(prev => ({ ...prev, kotaTujuan: "" }));
    }
    
    setForm({ ...form, [name]: value });
    
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleReset = () => {
    setForm({
      namaPengirim: user?.nama || "",
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
    // Validasi kota asal dan tujuan tidak boleh sama
    if (form.kotaAsal && form.kotaTujuan && form.kotaAsal === form.kotaTujuan) {
      newErrors.kotaTujuan = "Kota asal dan kota tujuan tidak boleh sama.";
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
      // Ambil customer_id yang benar dari database
      const customerRes = await fetch(`/api/customer/by-user?user_id=${user?.id}`);
      const customerData = await customerRes.json();
      const customerId = customerData.customer_id;

      if (!customerId) {
        alert("Customer ID tidak ditemukan");
        setIsLoading(false);
        return;
      }

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
      formData.append("customer_id", customerId.toString());
      

      const result = await tambahResiDatabase(formData);

      if (result.success) {
        // Simpan data untuk ditampilkan di modal nota
        setInvoiceData({
          no_resi: result.no_resi,
          tanggal: new Date().toISOString().split("T")[0],
          nama_pengirim: form.namaPengirim,
          nama_penerima: form.namaPenerima,
          no_telepon: form.noTelepon,
          kota_asal: form.kotaAsal,
          kota_tujuan: form.kotaTujuan,
          berat: parseFloat(form.berat),
          jenis_barang: form.jenisBarang,
          tipe_paket: form.tipePaket === "REGULER" ? "Reguler" : form.tipePaket === "EXPRESS" ? "Express" : "VVIP",
          total_biaya: totalBiaya,
          catatan: form.catatan,
        });
        setShowInvoice(true);
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-[#13131F] border border-[#A855F7]/50 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-[0_0_40px_rgba(168,85,247,0.3)] flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/40 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#C084FC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-white font-bold text-xl">Paket Terdaftar!</h2>
              <p className="text-[#A0A0B0] text-sm mt-2">Data pengirimanmu telah kami terima.</p>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold py-3.5 rounded-xl text-sm"
            >
              Oke, Mengerti!
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col relative z-10">
        <main className="flex-1 px-10 py-12 overflow-y-auto">
          <div className="text-center mb-10">
            <h1 className="text-white font-bold text-3xl">Form Input Barang</h1>
            <p className="text-[#A0A0B0] text-sm mt-2">Isi kelengkapan data kargo Anda.</p>
            <div className="w-12 h-1.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] mx-auto mt-4 rounded-full" />
          </div>

          <form onSubmit={handleSubmit} noValidate className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[#C084FC] text-[11px] font-bold uppercase">Nama Pengirim</label>
                <input type="text" name="namaPengirim" value={form.namaPengirim} onChange={handleChange} placeholder="Masukkan nama pengirim" className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white" />
                {errors.namaPengirim && <span className="text-red-400 text-[10px]">{errors.namaPengirim}</span>}
              </div>
              <div>
                <label className="text-[#C084FC] text-[11px] font-bold uppercase">Nama Penerima</label>
                <input type="text" name="namaPenerima" value={form.namaPenerima} onChange={handleChange} placeholder="Masukkan nama penerima" className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white" />
                {errors.namaPenerima && <span className="text-red-400 text-[10px]">{errors.namaPenerima}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[#C084FC] text-[11px] font-bold uppercase">No Telepon</label>
                <input type="tel" name="noTelepon" value={form.noTelepon} onChange={handleChange} placeholder="Masukkan nomor telepon" className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white" />
                {errors.noTelepon && <span className="text-red-400 text-[10px]">{errors.noTelepon}</span>}
              </div>
              <div>
                <label className="text-[#C084FC] text-[11px] font-bold uppercase">Kota Asal</label>
                <select
                  name="kotaAsal"
                  value={form.kotaAsal}
                  onChange={handleChange}
                  className={`w-full bg-[#0A0A12] border rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-1 transition-all duration-300 ${
                    errors.kotaAsal 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
                      : "border-[#1E1E2E] focus:border-[#A855F7] focus:ring-[#A855F7] hover:border-[#A855F7]/50"
                  }`}
                >
                  <option value="">Pilih Kota Asal</option>
                  {daftarKota.map((kota) => (
                    <option key={kota} value={kota}>{kota}</option>
                  ))}
                </select>
                {errors.kotaAsal && <span className="text-red-400 text-[10px]">{errors.kotaAsal}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[#C084FC] text-[11px] font-bold uppercase">Kota Tujuan</label>
                <select
                  name="kotaTujuan"
                  value={form.kotaTujuan}
                  onChange={handleChange}
                  className={`w-full bg-[#0A0A12] border rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-1 transition-all duration-300 ${
                    errors.kotaTujuan 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
                      : "border-[#1E1E2E] focus:border-[#A855F7] focus:ring-[#A855F7] hover:border-[#A855F7]/50"
                  }`}
                >
                  <option value="">Pilih Kota Tujuan</option>
                  {daftarKota.map((kota) => (
                    <option key={kota} value={kota}>{kota}</option>
                  ))}
                </select>
                {errors.kotaTujuan && <span className="text-red-400 text-[10px]">{errors.kotaTujuan}</span>}
              </div>
              <div>
                <label className="text-[#C084FC] text-[11px] font-bold uppercase">Berat (kg)</label>
                <input type="number" name="berat" value={form.berat} onChange={handleChange} placeholder="Contoh: 150" className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white" />
                {errors.berat && <span className="text-red-400 text-[10px]">{errors.berat}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[#C084FC] text-[11px] font-bold uppercase">Jenis Barang</label>
                <select
                  name="jenisBarang"
                  value={form.jenisBarang}
                  onChange={handleChange}
                  className={`w-full bg-[#0A0A12] border rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:ring-1 transition-all duration-300 ${
                    errors.jenisBarang 
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
                      : "border-[#1E1E2E] focus:border-[#A855F7] focus:ring-[#A855F7] hover:border-[#A855F7]/50"
                  }`}
                >
                  <option value="">Pilih Jenis Barang</option>
                  {daftarJenisBarang.map((jenis) => (
                    <option key={jenis} value={jenis}>{jenis}</option>
                  ))}
                </select>
                {errors.jenisBarang && <span className="text-red-400 text-[10px]">{errors.jenisBarang}</span>}
              </div>
              <div>
                <label className="text-[#C084FC] text-[11px] font-bold uppercase">Tipe Paket *</label>
                <select name="tipePaket" value={form.tipePaket} onChange={handleChange} className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white">
                  <option value="">Pilih Tipe Paket</option>
                  <option value="REGULER">Reguler (0% tambahan)</option>
                  <option value="EXPRESS">Express (+35%)</option>
                  <option value="VVIP">VVIP (+75%)</option>
                </select>
                {errors.tipePaket && <span className="text-red-400 text-[10px]">{errors.tipePaket}</span>}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-[#C084FC] text-[11px] font-bold uppercase">Total Biaya Pengiriman</label>
              <div className="bg-gradient-to-r from-[#A855F7]/20 to-[#C084FC]/20 border border-[#A855F7]/30 rounded-xl px-4 py-3.5">
                <span className="text-2xl font-bold text-white">{totalBiaya > 0 ? formatRupiah(totalBiaya) : "Rp 0"}</span>
                <p className="text-[#A0A0B0] text-[10px] mt-1">*Harga dasar Rp{HARGA_PER_KG.toLocaleString('id-ID')}/kg</p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mb-10">
              <label className="text-[#C084FC] text-[11px] font-bold uppercase">Catatan Tambahan <span className="text-[#6B6B80]">(Opsional)</span></label>
              <textarea name="catatan" value={form.catatan} onChange={handleChange} placeholder="Tambahkan instruksi khusus" rows={3} className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3.5 text-white resize-none" />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-[#1E1E2E]">
              <button type="button" onClick={handleReset} disabled={isLoading} className="border border-[#1E1E2E] hover:border-[#A855F7]/50 text-[#A0A0B0] hover:text-white font-bold px-8 py-3.5 rounded-xl">
                Reset Form
              </button>
              <button type="submit" disabled={isLoading} className="bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold px-10 py-3.5 rounded-xl flex items-center gap-2">
                {isLoading ? "Menyimpan..." : "Daftarkan Paket"}
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* Modal Nota Resi */}
      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        data={invoiceData}
      />
    </div>
  );
}