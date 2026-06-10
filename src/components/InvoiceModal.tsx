"use client";

import { useRef } from "react";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload?: () => void;
  data: {
    no_resi: string;
    tanggal: string;
    nama_pengirim: string;
    nama_penerima: string;
    no_telepon: string;
    kota_asal: string;
    kota_tujuan: string;
    berat: number;
    jenis_barang: string;
    tipe_paket: string;
    total_biaya: number;
    catatan: string;
  } | null;
}

export default function InvoiceModal({ isOpen, onClose, onDownload, data }: InvoiceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !data) return null;

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const handleDownload = () => {
    const printContent = modalRef.current?.cloneNode(true) as HTMLElement;
    const printWindow = window.open("", "_blank");
    if (printWindow && printContent) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Nota Resi - ${data.no_resi}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; margin: 0; }
              .invoice { max-width: 500px; margin: 0 auto; border: 1px solid #ddd; padding: 30px; border-radius: 12px; }
              .header { text-align: center; margin-bottom: 30px; }
              .title { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
              .resi { font-size: 18px; color: #666; margin-bottom: 20px; }
              .row { display: flex; margin-bottom: 12px; }
              .label { width: 140px; font-weight: bold; color: #555; }
              .value { flex: 1; }
              .divider { border-top: 1px solid #ddd; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #999; }
            </style>
          </head>
          <body>
            <div class="invoice">
              ${printContent.innerHTML}
            </div>
            <script>
              window.print();
              setTimeout(() => window.close(), 500);
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
    if (onDownload) onDownload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300">
      <div className="bg-[#13131F] border border-[#A855F7]/50 rounded-2xl max-w-md w-full mx-4 shadow-2xl animate-zoom-in max-h-[90vh] overflow-y-auto">
        
        <div ref={modalRef} className="p-6">
          {/* Header */}
          <div className="text-center border-b border-[#1E1E2E] pb-4 mb-4">
            <h2 className="text-white font-bold text-xl">Paket Berhasil Didaftarkan!</h2>
            <p className="text-[#A0A0B0] text-sm mt-1">
              Berikut Bukti pengiriman yang bisa anda serahkan ke kantor kami
            </p>
          </div>

          {/* Tanggal & Resi */}
          <div className="bg-[#0A0A12] rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-[#6B6B80] text-xs">Tanggal</span>
              <span className="text-white text-sm font-medium">{data.tanggal}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-[#6B6B80] text-xs">No Resi</span>
              <span className="text-[#C084FC] text-sm font-mono font-bold">{data.no_resi}</span>
            </div>
          </div>

          {/* Detail Pengiriman - 2 kolom */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">Nama Pengirim</p>
                <p className="text-white text-sm font-medium">{data.nama_pengirim}</p>
              </div>
              <div>
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">Nama Penerima</p>
                <p className="text-white text-sm font-medium">{data.nama_penerima}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">Kota Asal</p>
                <p className="text-white text-sm">{data.kota_asal}</p>
              </div>
              <div>
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">Kota Tujuan</p>
                <p className="text-white text-sm">{data.kota_tujuan}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">Berat (kg)</p>
                <p className="text-white text-sm">{data.berat} KG</p>
              </div>
              <div>
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">No Telepon</p>
                <p className="text-white text-sm">{data.no_telepon}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">Jenis Barang</p>
                <p className="text-white text-sm">{data.jenis_barang}</p>
              </div>
              <div>
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">Tipe Paket</p>
                <p className="text-white text-sm font-semibold">{data.tipe_paket}</p>
              </div>
            </div>

            {/* Total Biaya */}
            <div className="bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-xl p-3 mt-2">
              <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">Total Biaya Pengiriman</p>
              <p className="text-[#C084FC] text-xl font-bold">{formatRupiah(data.total_biaya)}</p>
            </div>

            {/* Catatan */}
            <div>
              <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">Catatan</p>
              <p className="text-white text-sm">{data.catatan || "-"}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#1E1E2E] mt-4 pt-4 text-center">
            <p className="text-[#6B6B80] text-[10px]">PT Praketrio</p>
            <p className="text-[#6B6B80] text-[10px]">Terima Kasih Telah Mempercayai Layanan Kami</p>
            <p className="text-[#6B6B80] text-[10px]">Ditunggu di lokasi pengiriman</p>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex gap-3 p-4 border-t border-[#1E1E2E]">
          <button
            onClick={handleDownload}
            className="flex-1 bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold py-2.5 rounded-xl text-sm transition-all duration-300"
          >
            Unduh
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-[#1E1E2E] hover:border-[#A855F7]/50 text-[#A0A0B0] hover:text-white font-bold py-2.5 rounded-xl text-sm transition-all duration-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
