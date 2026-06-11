import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Tidak terautentikasi" },
        { status: 401 }
      );
    }

    // Ambil data customer utama berdasarkan user_id yang sedang login
    const customerResult = await db.query(
      "SELECT id, nama_customer, no_telepon FROM customers WHERE user_id = $1",
      [user.id]
    );

    if (customerResult.rows.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const customerId = customerResult.rows[0].id;
    // Ambil nama dari database, atau fallback ke nama dari session login
    const customerName = customerResult.rows[0].nama_customer || user.nama;

    // KUNCI PERBAIKAN: 
    // Tarik resi jika memenuhi salah satu syarat ini:
    // 1. Dibuat langsung oleh akun ini (customer_id = $1)
    // 2. Admin mengetik namanya sebagai Pengirim (c.nama_customer ILIKE $2)
    // 3. Admin mengetik namanya sebagai Penerima (tp.nama_penerima ILIKE $2)
    const result = await db.query(
      `SELECT 
        tp.no_resi,
        tp.kota_asal || ' → ' || tp.kota_tujuan as rute,
        TO_CHAR(tp.tanggal_transaksi, 'DD Mon YYYY') as tanggal,
        tp.status,
        COALESCE(tp.tipe_paket, 'REGULER') as tipe_paket,
        COALESCE(dp.total_biaya, 0) as total_biaya
      FROM transaksi_pengiriman tp
      LEFT JOIN detail_pengiriman dp ON tp.id = dp.transaksi_id
      LEFT JOIN customers c ON tp.customer_id = c.id
      WHERE tp.customer_id = $1 
         OR c.nama_customer ILIKE $2
         OR tp.nama_penerima ILIKE $2
      ORDER BY tp.id DESC`,
      [customerId, customerName]
    );

    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}