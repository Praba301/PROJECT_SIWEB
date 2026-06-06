import { Suspense } from "react";
import DashboardClient from "./dashboardclient";
import { db } from "@/lib/db"; 

export const metadata = {
  title: "Dashboard Admin | Praketrio",
};

export default async function DashboardPage() {
  // PERBAIKAN 1: Menambahkan tipe : any[]
  let dataPengiriman: any[] = [];
  let statsData = { Diproses: 0, Dimuat: 0, Berlayar: 0, Terkirim: 0 };
  let totalData = 0; 
  
  try {
    // 1. URUTKAN BERDASARKAN ID DESC AGAR RESI TERBARU PASTI MUNCUL DI DASHBOARD
    const queryResult = await db.query(`
      SELECT 
        tp.no_resi, 
        tp.kota_asal, 
        tp.kota_tujuan, 
        COALESCE(k.nama_kapal, 'MV Nusantara Logistik') as nama_kapal
      FROM transaksi_pengiriman tp
      LEFT JOIN kapal_pengiriman k ON tp.id = k.transaksi_id
      ORDER BY tp.id DESC LIMIT 5
    `);
    dataPengiriman = queryResult.rows;

    // 2. Agregasi status
    const statsResult = await db.query(`
      SELECT status, COUNT(*) as count 
      FROM transaksi_pengiriman 
      GROUP BY status
    `);
    
    // PERBAIKAN 2: Menggunakan (row: any) dan operator 'in'
    statsResult.rows.forEach((row: any) => {
      const statusKey = row.status as keyof typeof statsData;
      if (statusKey in statsData) {
        statsData[statusKey] = Number(row.count);
      }
    });

    // 3. AMBIL TOTAL REAL
    const countResult = await db.query(`SELECT COUNT(*) as total FROM transaksi_pengiriman`);
    totalData = Number(countResult.rows[0].total);

  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }

  return (
    // Membungkus Client Component dengan Suspense loading state
    <Suspense fallback={<div className="text-white p-8">Memuat Data...</div>}>
      <DashboardClient 
        dataDariDatabase={dataPengiriman} 
        totalPengiriman={totalData} 
        statsData={statsData} 
      />
    </Suspense>
  );
}