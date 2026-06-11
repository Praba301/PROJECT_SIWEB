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
    no_telepon: string; // Ini dari action customer (nomor telepon pengirim)
    no_telepon_penerima?: string; // Tambahan properti opsional agar aman
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
    // Membuat HTML kustom untuk print agar lebih rapi di kertas
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Nota Resi - ${data.no_resi}</title>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; margin: 0; color: #333; }
              .invoice { max-width: 600px; margin: 0 auto; border: 2px solid #333; padding: 40px; border-radius: 8px; }
              .header { text-align: center; margin-bottom: 30px; border-bottom: 2px dashed #ccc; padding-bottom: 20px; }
              .title { font-size: 28px; font-weight: 800; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 2px; }
              .subtitle { font-size: 14px; color: #666; margin: 0; }
              .info-box { background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 25px; display: flex; justify-content: space-between; }
              .info-item { text-align: center; }
              .info-label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; }
              .info-value { font-size: 16px; font-weight: bold; margin-top: 5px; }
              .row { display: flex; margin-bottom: 15px; }
              .col { flex: 1; }
              .label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
              .value { font-size: 14px; font-weight: bold; }
              .total-box { background: #333; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0; }
              .total-label { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8; }
              .total-value { font-size: 24px; font-weight: bold; margin-top: 5px; }
              .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
            </style>
          </head>
          <body>
            <div class="invoice">
              <div class="header">
                <h1 class="title">PRAKETRIO</h1>
                <p class="subtitle">Manifes Pengiriman Logistik Laut</p>
              </div>

              <div class="info-box">
                <div class="info-item">
                  <div class="info-label">Tanggal</div>
                  <div class="info-value">${data.tanggal}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">No. Resi</div>
                  <div class="info-value" style="font-family: monospace;">${data.no_resi}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Tipe Paket</div>
                  <div class="info-value">${data.tipe_paket}</div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="label">Nama Pengirim</div>
                  <div class="value">${data.nama_pengirim}</div>
                </div>
                <div class="col">
                  <div class="label">Nama Penerima</div>
                  <div class="value">${data.nama_penerima}</div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="label">No. Telepon Pengirim</div>
                  <div class="value">${data.no_telepon || "-"}</div>
                </div>
                <div class="col">
                  <div class="label">No. Telepon Penerima</div>
                  <div class="value">${data.no_telepon_penerima || "-"}</div>
                </div>
              </div>

              <div style="border-top: 1px solid #eee; margin: 20px 0;"></div>

              <div class="row">
                <div class="col">
                  <div class="label">Kota Asal</div>
                  <div class="value">${data.kota_asal}</div>
                </div>
                <div class="col">
                  <div class="label">Kota Tujuan</div>
                  <div class="value">${data.kota_tujuan}</div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="label">Jenis Barang</div>
                  <div class="value">${data.jenis_barang}</div>
                </div>
                <div class="col">
                  <div class="label">Berat Total</div>
                  <div class="value">${data.berat} KG</div>
                </div>
              </div>

              <div class="total-box">
                <div class="total-label">Total Biaya Pengiriman</div>
                <div class="total-value">${formatRupiah(data.total_biaya)}</div>
              </div>

              <div style="margin-bottom: 15px;">
                <div class="label">Catatan Tambahan</div>
                <div class="value" style="font-weight: normal;">${data.catatan || "-"}</div>
              </div>

              <div class="footer">
                <p><b>PT Praketrio</b></p>
                <p>Terima Kasih Telah Mempercayai Layanan Kami</p>
                <p>Ditunggu di lokasi pengiriman</p>
              </div>
            </div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(function() { window.close(); }, 500);
              }
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
      <div className="bg-[#13131F] border border-[#A855F7]/50 rounded-2xl max-w-md w-full mx-4 shadow-2xl animate-zoom-in max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        <div ref={modalRef} className="p-6">
          {/* Header */}
          <div className="text-center border-b border-[#1E1E2E] pb-4 mb-4">
            <h2 className="text-white font-bold text-xl">Paket Berhasil Didaftarkan!</h2>
            <p className="text-[#A0A0B0] text-sm mt-1">
              Berikut Bukti pengiriman yang bisa anda serahkan ke kantor kami
            </p>
          </div>

          {/* Tanggal & Resi */}
          <div className="bg-[#0A0A12] rounded-xl p-4 mb-4 border border-[#1E1E2E]">
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
          <div className="space-y-4">
            
            {/* Row Nama */}
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

            {/* Row Telepon */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">No. Telp Pengirim</p>
                <p className="text-slate-300 font-mono text-sm">{data.no_telepon || "-"}</p>
              </div>
              <div>
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">No. Telp Penerima</p>
                <p className="text-slate-300 font-mono text-sm">{data.no_telepon_penerima || "-"}</p>
              </div>
            </div>

            <div className="w-full h-px bg-[#1E1E2E] my-2" />

            {/* Row Kota */}
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

            {/* Row Barang */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">Jenis Barang</p>
                <p className="text-white text-sm">{data.jenis_barang}</p>
              </div>
              <div>
                <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">Berat (kg)</p>
                <p className="text-white text-sm">{data.berat} KG</p>
              </div>
            </div>

            {/* Total Biaya */}
            <div className="bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-xl p-4 mt-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#A855F7]/20 rounded-bl-full blur-lg"></div>
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest">Tipe: <span className="text-white font-bold">{data.tipe_paket}</span></p>
                  <p className="text-[#C084FC] text-[10px] uppercase tracking-widest mt-1">Total Biaya</p>
                </div>
                <p className="text-[#C084FC] text-xl font-bold">{formatRupiah(data.total_biaya)}</p>
              </div>
            </div>

            {/* Catatan */}
            <div className="bg-[#0A0A12] border border-[#1E1E2E] rounded-lg p-3">
              <p className="text-[#6B6B80] text-[10px] uppercase tracking-widest mb-1">Catatan</p>
              <p className="text-white text-sm italic">{data.catatan || "Tidak ada catatan tambahan."}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#1E1E2E] mt-6 pt-4 text-center">
            <p className="text-[#6B6B80] text-[10px] font-bold tracking-widest uppercase">PT Praketrio</p>
            <p className="text-[#6B6B80] text-[10px] mt-1">Terima Kasih Telah Mempercayai Layanan Kami</p>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex gap-3 p-4 border-t border-[#1E1E2E] bg-[#1A1A24]">
          <button
            onClick={handleDownload}
            className="flex-1 bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold py-3 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Cetak / Unduh
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-[#1E1E2E] bg-[#13131F] hover:bg-[#1E1E2E] text-[#A0A0B0] hover:text-white font-bold py-3 rounded-xl text-sm transition-all duration-300"
          >
            Tutup
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-zoom-in { animation: zoomIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #252538; border-radius: 99px; }
      `}} />
    </div>
  );
}