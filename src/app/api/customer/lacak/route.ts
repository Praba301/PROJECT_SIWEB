import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const noResi = searchParams.get("no_resi");

    if (!noResi) {
      return NextResponse.json(
        { success: false, error: "Nomor resi tidak ditemukan" },
        { status: 400 }
      );
    }

    const result = await db.query(
      `SELECT 
        tp.no_resi,
        tp.kota_asal || ' → ' || tp.kota_tujuan as rute,
        TO_CHAR(tp.tanggal_transaksi, 'DD Mon YYYY') as tanggal,
        tp.status,
        COALESCE(tp.tipe_paket, 'REGULER') as tipe_paket,
        COALESCE(dp.total_biaya, 0) as total_biaya,
        tp.kota_asal,
        tp.kota_tujuan
      FROM transaksi_pengiriman tp
      LEFT JOIN detail_pengiriman dp ON tp.id = dp.transaksi_id
      WHERE tp.no_resi = $1`,
      [noResi]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Resi tidak ditemukan" },
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
