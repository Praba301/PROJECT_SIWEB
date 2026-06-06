import { Suspense } from "react";
import { db } from "@/lib/db";
import FleetClient from "./fleetclient"; 
import type { Metadata } from "next";

// Memenuhi syarat penugasan UAS: Menambahkan judul halaman menggunakan MetaData
export const metadata: Metadata = {
  title: "Radar Armada | Praketrio",
  description: "Superintendent Dashboard untuk memantau pergerakan armada kapal Praketrio secara real-time.",
};

export default async function FleetSuperintendentDashboardPage() {
  // PERBAIKAN: Menambahkan tipe : any[] agar TypeScript/Vercel tidak error
  let fleetRows: any[] = [];

  try {
    // KONEKSI DATABASE NEON - MENGAMBIL SELURUH DATA CRUDS (READ)
    const result = await db.query(`
      SELECT 
        kp.id as kapal_id,
        kp.nama_kapal,
        kp.kode_kapal,
        kp.jenis_kapal,
        kp.kapasitas_muatan,
        kp.status_kapal,
        tp.no_resi,
        tp.status as status_kargo,
        tp.kota_asal,
        tp.kota_tujuan,
        tp.tanggal_transaksi,
        c.nama_customer,
        dp.berat_total
      FROM kapal_pengiriman kp
      LEFT JOIN transaksi_pengiriman tp ON kp.transaksi_id = tp.id
      LEFT JOIN customers c ON tp.customer_id = c.id
      LEFT JOIN detail_pengiriman dp ON tp.id = dp.transaksi_id
      ORDER BY tp.tanggal_transaksi DESC
    `);
    
    fleetRows = result.rows;
    await new Promise((resolve) => setTimeout(resolve, 800));

  } catch (error) {
    console.error("Gagal sinkronisasi data database:", error);
  }

  // Animasi Skeleton Loading Modern
  const FleetSkeleton = () => (
    <div className="min-h-screen bg-[#0A0A12] p-8 space-y-8 animate-pulse font-mono">
      <div className="flex justify-between items-center border-b border-[#1E1E2E] pb-5">
        <div className="h-8 w-44 bg-[#1E1E2E] rounded-lg" />
        <div className="h-10 w-40 bg-[#1E1E2E] rounded-xl" />
      </div>
      <div className="w-full h-[70vh] bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-[#1A1A24] border border-[#1E1E2E] rounded-2xl p-5" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Suspense fallback={<FleetSkeleton />}>
      <FleetClient dataDariDatabase={fleetRows} />
    </Suspense>
  );
}