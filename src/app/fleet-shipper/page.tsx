import { Suspense } from "react";
import { db } from "@/lib/db";
import FleetClient from "./fleetclient";

export default async function FleetSuperintendentDashboardPage() {
  let fleetRows = [];

  try {
    // Menarik manifest kargo lengkap berelasi langsung dari database Neon
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

    // Loading simulasi 1 detik agar efek animasi Skeleton berkedip terlihat halus
    await new Promise((resolve) => setTimeout(resolve, 1000));

  } catch (error) {
    console.error("Gagal sinkronisasi database Fleet Shipper:", error);
  }

  // DESAIN SKELETON KUSTOM UNTUK HALAMAN FLEET SHIPPER (Dark Mode Pulse)
  const FleetSkeleton = () => (
    <div className="min-h-screen bg-[#0A0A12] p-8 space-y-8 animate-pulse">
      {/* Skeleton Navbar */}
      <div className="flex justify-between items-center border-b border-[#1E1E2E] pb-5">
        <div className="h-8 w-44 bg-[#1E1E2E] rounded-lg" />
        <div className="flex items-center gap-3">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-[#1E1E2E] rounded" />
            <div className="h-3 w-40 bg-[#1E1E2E] rounded" />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#1E1E2E]" />
        </div>
      </div>

      {/* Skeleton Konten Radar Peta / Dashboard */}
      <div className="w-full h-[70vh] bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 relative flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="space-y-3">
            <div className="h-6 w-56 bg-[#1A1A24] rounded-lg" />
            <div className="h-4 w-96 bg-[#1A1A24] rounded-md" />
          </div>
          <div className="h-12 w-40 bg-[#1A1A24] rounded-xl" />
        </div>
        
        {/* Cerita Kotak Loading Radar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-[#1A1A24] border border-[#1E1E2E] rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="space-y-2 w-2/3">
                  <div className="h-5 bg-[#1E1E2E] rounded w-full" />
                  <div className="h-3 bg-[#1E1E2E] rounded w-1/2" />
                </div>
                <div className="h-6 w-16 bg-[#1E1E2E] rounded" />
              </div>
              <div className="h-8 bg-[#0A0A12] rounded-xl w-full" />
            </div>
          ))}
        </div>

        {/* Footer Skeleton Line */}
        <div className="h-10 w-full bg-[#1A1A24] rounded-xl" />
      </div>
    </div>
  );

  return (
    // Membungkus Client Component menggunakan Kerangka Dashboard Skeleton
    <Suspense fallback={<FleetSkeleton />}>
      <FleetClient dataDariDatabase={fleetRows} />
    </Suspense>
  );
}