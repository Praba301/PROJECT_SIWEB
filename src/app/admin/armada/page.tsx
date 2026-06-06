import { Suspense } from "react";
import ArmadaClient from "./ArmadaClient";
import { db } from "@/lib/db"; 

export const metadata = {
  title: "Data Armada | Praketrio",
};

export default async function ArmadaPage() {
  // Perbaikan: Memberikan tipe data 'any[]' agar TypeScript tidak komplain
  let kapalRows: any[] = [];
  
  try {
    // Menarik seluruh data kapal dari tabel kapal_pengiriman yang aktif
    const result = await db.query(`
      SELECT 
        kp.id,
        kp.nama_kapal,
        kp.jenis_kapal,
        kp.kode_kapal,
        kp.kapasitas_muatan,
        kp.status_kapal,
        tp.kota_asal,
        tp.kota_tujuan,
        tp.status as status_kargo,
        dp.jenis_barang,
        dp.berat_total
      FROM kapal_pengiriman kp
      LEFT JOIN transaksi_pengiriman tp ON kp.transaksi_id = tp.id
      LEFT JOIN detail_pengiriman dp ON tp.id = dp.transaksi_id
      ORDER BY kp.id DESC
    `);
    
    kapalRows = result.rows;
  } catch (error) {
    console.error("Gagal memuat data armada kapal:", error);
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen text-white p-8 font-bold animate-pulse text-[#C084FC]">
        Memuat Data Armada Kapal...
      </div>
    }>
      <ArmadaClient dataDariDatabase={kapalRows} />
    </Suspense>
  );
}