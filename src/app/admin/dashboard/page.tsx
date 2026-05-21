import { Suspense } from "react";
import DashboardClient from "./dashboardclient";
import { db } from "@/lib/db"; 

export default async function DashboardPage() {
  let dataPengiriman = [];
  
  try {
    // 1. Jalankan query SQL langsung ke Neon
    const queryResult = await db.query(`
      SELECT 
        tp.no_resi, 
        tp.kota_asal, 
        tp.kota_tujuan, 
        k.nama_kapal
      FROM transaksi_pengiriman tp
      JOIN kapal k ON tp.kapal_id = k.id
      ORDER BY tp.tanggal_transaksi DESC
      LIMIT 5
    `);
    
    // 2. Simpan hasilnya
    dataPengiriman = queryResult.rows;
  } catch (error) {
    console.error("Gagal mengambil data dari server:", error);
  }

  // 3. Bungkus dengan Suspense untuk mengaktifkan Skeleton Loading
  return (
    <Suspense fallback={<div className="text-white p-8 font-bold animate-pulse text-[#C084FC]">Memuat Data Dashboard...</div>}>
      <DashboardClient dataDariDatabase={dataPengiriman} />
    </Suspense>
  );
}