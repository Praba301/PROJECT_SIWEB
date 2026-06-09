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

    const customerResult = await db.query(
      "SELECT id FROM customers WHERE user_id = $1",
      [user.id]
    );

    if (customerResult.rows.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    const customerId = customerResult.rows[0].id;

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
      WHERE tp.customer_id = $1
      ORDER BY tp.id DESC`,
      [customerId]
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
