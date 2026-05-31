import { Suspense } from "react";
import PengirimanClient from "./PengirimanClient";
import { db } from "@/lib/db"; 

export default async function PengirimanPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  
  const itemsPerPage = 5; 
  const offset = (currentPage - 1) * itemsPerPage;

  let pengirimanRows = [];
  let totalPages = 1;

  let queryClean = `%${query}%`;

  try {
    // Menghitung total data dengan 4 kriteria pencarian menggunakan LEFT JOIN agar sinkron
    const countResult = await db.query(`
      SELECT COUNT(*)
      FROM transaksi_pengiriman tp
      LEFT JOIN customers c ON tp.customer_id = c.id
      LEFT JOIN detail_pengiriman dp ON tp.id = dp.transaksi_id
      WHERE tp.no_resi ILIKE $1 
         OR c.nama_customer ILIKE $1
         OR c.nama_penerima ILIKE $1
         OR dp.jenis_barang ILIKE $1
    `, [queryClean]);
    
    const totalItems = Number(countResult.rows[0]?.count || 0);
    totalPages = Math.ceil(totalItems / itemsPerPage) || 1; 

    // MENAMPILKAN DATA DENGAN ID DESC AGAR DATA TERBARU MUNCUL DI HALAMAN 1 PALING ATAS
    const result = await db.query(`
      SELECT 
        tp.no_resi, 
        c.nama_customer, 
        dp.berat_total,
        tp.tanggal_transaksi,
        tp.status
      FROM transaksi_pengiriman tp
      LEFT JOIN customers c ON tp.customer_id = c.id
      LEFT JOIN detail_pengiriman dp ON tp.id = dp.transaksi_id
      WHERE tp.no_resi ILIKE $1 
         OR c.nama_customer ILIKE $1
         OR c.nama_penerima ILIKE $1
         OR dp.jenis_barang ILIKE $1
      ORDER BY tp.id DESC
      LIMIT $2 OFFSET $3
    `, [queryClean, itemsPerPage, offset]);
    
    pengirimanRows = result.rows;

    await new Promise((resolve) => setTimeout(resolve, 1000));

  } catch (error) {
    console.error("Gagal memuat data transaksi pengiriman:", error);
  }

  // Desain Skeleton (Kerangka Kotak-kotak Abu-abu Berkedip)
  const SkeletonTable = () => (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <div className="h-8 w-64 bg-[#1E1E2E] rounded-lg animate-pulse" />
          <div className="h-4 w-96 bg-[#1E1E2E] rounded-lg animate-pulse" />
        </div>
        <div className="h-10 w-36 bg-[#1E1E2E] rounded-xl animate-pulse" />
      </div>

      <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 shadow-xl mt-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-48 bg-[#1E1E2E] rounded animate-pulse" />
          <div className="h-10 w-64 bg-[#1A1A24] rounded-lg animate-pulse" />
        </div>
        
        <div className="space-y-4 mt-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 w-full bg-[#1A1A24] rounded-xl animate-pulse flex items-center px-4 gap-4">
              <div className="h-4 w-1/5 bg-[#1E1E2E] rounded" />
              <div className="h-4 w-1/5 bg-[#1E1E2E] rounded" />
              <div className="h-4 w-1/5 bg-[#1E1E2E] rounded" />
              <div className="h-4 w-1/5 bg-[#1E1E2E] rounded" />
              <div className="h-4 w-1/5 bg-[#1E1E2E] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Suspense fallback={<SkeletonTable />}>
      <PengirimanClient 
        dataDariDatabase={pengirimanRows} 
        totalPages={totalPages} 
        currentPage={currentPage} 
      />
    </Suspense>
  );
}