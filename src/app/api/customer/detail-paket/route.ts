import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const noResi = searchParams.get("no_resi");

    if (!noResi) {
      return NextResponse.json(
        { success: false, error: "no_resi tidak ditemukan" },
        { status: 400 }
      );
    }

    const result = await db.query(
      `SELECT 
        tp.no_resi,
        TO_CHAR(tp.tanggal_transaksi, 'DD Mon YYYY') as tanggal,
        tp.kota_asal,
        tp.kota_tujuan,
        tp.status,
        tp.tipe_paket,
        tp.nama_penerima,
        c.nama_customer as nama_pengirim,
        c.no_telepon,
        dp.berat_total as berat,
        dp.jenis_barang,
        COALESCE(dp.deskripsi, '-') as catatan,
        dp.total_biaya
      FROM transaksi_pengiriman tp
      LEFT JOIN customers c ON tp.customer_id = c.id
      LEFT JOIN detail_pengiriman dp ON tp.id = dp.transaksi_id
      WHERE tp.no_resi = $1`,
      [noResi]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}
