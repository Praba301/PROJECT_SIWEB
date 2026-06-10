"use client";

import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import CustomerNavbar from "@/components/layout/CustomerNavbar";
import InvoiceModal from "@/components/InvoiceModal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const statusConfig = (status: string) => {
  if (status === "Terkirim" || status === "Delivered")
    return {
      color: "text-[#22C55E]",
      bg: "bg-[#22C55E]/10",
      border: "border-[#22C55E]/30",
      dot: "bg-[#22C55E]",
    };
  if (status === "Dalam perjalanan" || status === "In Transit")
    return {
      color: "text-[#60A5FA]",
      bg: "bg-[#3B82F6]/10",
      border: "border-[#3B82F6]/30",
      dot: "bg-[#60A5FA]",
    };
  if (status === "Dimuat ke kapal" || status === "Loading")
    return {
      color: "text-[#FCD34D]",
      bg: "bg-[#F59E0B]/10",
      border: "border-[#F59E0B]/30",
      dot: "bg-[#FCD34D]",
    };
  return {
    color: "text-white",
    bg: "bg-[#1E1E2E]",
    border: "border-[#1E1E2E]",
    dot: "bg-[#6B6B80]",
  };
};

interface RiwayatItem {
  no_resi: string;
  rute: string;
  tanggal: string;
  status: string;
  tipe_paket: string;
  total_biaya: number;
}

export default function RiwayatPage() {
  const [riwayat, setRiwayat] = useState<RiwayatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: "" });

  useEffect(() => {
    const fetchRiwayat = async () => {
      try {
        const response = await fetch("/api/customer/riwayat");
        const data = await response.json();

        if (data.success === false && data.error === "Tidak terautentikasi") {
          setIsAuthenticated(false);
          window.location.href = "/login";
          return;
        }

        if (data.success) {
          setRiwayat(data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil riwayat:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  // PERBAIKAN: Menggunakan API detail-paket untuk mendapatkan semua data
  const handleViewInvoice = async (noResi: string) => {
    try {
      const res = await fetch(`/api/customer/detail-paket?no_resi=${noResi}`);
      const data = await res.json();
      if (data.success) {
        setSelectedInvoice({
          no_resi: data.data.no_resi,
          tanggal: data.data.tanggal,
          nama_pengirim: data.data.nama_pengirim || "-",
          nama_penerima: data.data.nama_penerima || "-",
          no_telepon: data.data.no_telepon || "-",
          kota_asal: data.data.kota_asal,
          kota_tujuan: data.data.kota_tujuan,
          berat: data.data.berat,
          jenis_barang: data.data.jenis_barang || "-",
          tipe_paket: data.data.tipe_paket,
          total_biaya: data.data.total_biaya,
          catatan: data.data.catatan || "-",
        });
        setShowInvoice(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDownloadNota = () => {
    showToast("✅ Nota berhasil diunduh!");
  };

  if (isLoading) {
    return (
      <div className={`${poppins.className} flex flex-col min-h-screen bg-[#0A0A12]`}>
        <CustomerNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white">Memuat riwayat...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const totalPengiriman = riwayat.length;
  const suksesTerkirim = riwayat.filter(r => r.status === "Terkirim" || r.status === "Delivered").length;
  const sedangDiproses = riwayat.filter(r => r.status !== "Terkirim" && r.status !== "Delivered").length;

  return (
    <div className={`${poppins.className} flex flex-col min-h-screen bg-[#0A0A12] relative overflow-hidden`}>
      
      <CustomerNavbar />

      {/* Toast Notifikasi */}
      {toast.show && (
        <div className="fixed bottom-10 right-10 z-50 bg-[#22C55E] text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-up">
          {toast.message}
        </div>
      )}

      <div className="flex-1 flex flex-col relative z-10">
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#A855F7]/10 blur-[150px] rounded-full pointer-events-none" />

        <main className="flex-1 px-10 py-12 overflow-y-auto">

          <div className="text-center mb-10 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-white font-bold text-3xl tracking-wide">
              Riwayat Pengiriman
            </h1>
            <p className="text-[#A0A0B0] text-sm mt-2">
              Daftar seluruh rekam jejak paket dan pengiriman kargo Anda.
            </p>
            <div className="w-12 h-1.5 bg-gradient-to-r from-[#A855F7] to-[#C084FC] mx-auto mt-4 rounded-full" />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            <div className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#A855F7]/50">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#C084FC] text-[11px] uppercase tracking-widest font-bold">Total Pengiriman</p>
                <span className="text-2xl opacity-20">📦</span>
              </div>
              <p className="text-white font-bold text-4xl font-mono">{totalPengiriman}</p>
            </div>
            
            <div className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#22C55E]/50">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#22C55E] text-[11px] uppercase tracking-widest font-bold">Sukses Terkirim</p>
                <span className="text-2xl opacity-20">✅</span>
              </div>
              <p className="text-white font-bold text-4xl font-mono">{suksesTerkirim}</p>
            </div>
            
            <div className="group bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#F59E0B]/50">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#FCD34D] text-[11px] uppercase tracking-widest font-bold">Sedang Diproses</p>
                <span className="text-2xl opacity-20">⏳</span>
              </div>
              <p className="text-white font-bold text-4xl font-mono">{sedangDiproses}</p>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl overflow-hidden max-w-5xl mx-auto shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 px-6 py-4 border-b border-[#1E1E2E] bg-[#1A1A24]">
              <p className="text-[#6B6B80] font-bold text-[11px] uppercase tracking-widest">No Resi</p>
              <p className="text-[#6B6B80] font-bold text-[11px] uppercase tracking-widest">Rute Pengiriman</p>
              <p className="text-[#6B6B80] font-bold text-[11px] uppercase tracking-widest">Tanggal Input</p>
              <p className="text-[#6B6B80] font-bold text-[11px] uppercase tracking-widest md:text-center">Status Saat Ini</p>
            </div>

            <div className="flex flex-col divide-y divide-[#1E1E2E]">
              {riwayat.length === 0 ? (
                <div className="text-center py-10 text-[#A0A0B0]">
                  Belum ada riwayat pengiriman
                </div>
              ) : (
                riwayat.map((item, index) => {
                  const s = statusConfig(item.status);
                  return (
                    <div key={index} className="group grid grid-cols-1 md:grid-cols-4 px-6 py-5 hover:bg-[#1A1A24] transition-colors duration-200 items-center gap-y-3 md:gap-y-0">
                      {/* No Resi - Klik untuk lihat nota */}
                      <p 
                        onClick={() => handleViewInvoice(item.no_resi)}
                        className="text-[#C084FC] text-sm font-mono font-bold hover:text-[#A855F7] hover:underline transition-all duration-300 cursor-pointer"
                      >
                        {item.no_resi}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#A0A0B0] text-sm group-hover:text-white transition-colors">
                          {item.rute.split("→")[0]?.trim() || "-"}
                        </span>
                        <span className="text-[#6B6B80] text-xs">→</span>
                        <span className="text-[#A0A0B0] text-sm group-hover:text-white transition-colors">
                          {item.rute.split("→")[1]?.trim() || "-"}
                        </span>
                      </div>
                      <p className="text-[#6B6B80] text-sm font-medium group-hover:text-[#A0A0B0] transition-colors">
                        {item.tanggal}
                      </p>
                      <div className="md:text-center">
                        <span className={`inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-md border ${s.color} ${s.bg} ${s.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                          {item.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          
        </main>
      </div>

      {/* Modal Nota Resi */}
      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        data={selectedInvoice}
        onDownload={handleDownloadNota}
      />
    </div>
  );
}