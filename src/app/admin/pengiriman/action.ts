"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// 1. FUNGSI MENGHAPUS
export async function hapusResiDatabase(resi: string) {
  try {
    await db.query("DELETE FROM transaksi_pengiriman WHERE no_resi = $1", [resi]);
    revalidatePath("/admin/pengiriman"); 
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus:", error);
    return { success: false };
  }
}

// 2. FUNGSI EDIT (Sekarang Menerima Status Kargo)
export async function editResiDatabase(resi: string, namaPengirim: string, berat: number, statusKargo: string) {
  try {
    const getIds = await db.query(
      "SELECT id, customer_id FROM transaksi_pengiriman WHERE no_resi = $1", 
      [resi]
    );
    
    if (getIds.rows.length === 0) return { success: false };
    
    const transaksiId = getIds.rows[0].id;
    const customerId = getIds.rows[0].customer_id;

    // Update data Customer dan Berat
    await db.query("UPDATE customers SET nama_customer = $1 WHERE id = $2", [namaPengirim, customerId]);
    await db.query("UPDATE detail_pengiriman SET berat_total = $1 WHERE transaksi_id = $2", [berat, transaksiId]);

    // UPDATE STATUS: Menyimpan status kargo ke tabel database
    await db.query("UPDATE transaksi_pengiriman SET status = $1 WHERE id = $2", [statusKargo, transaksiId]);

    revalidatePath("/admin/pengiriman");
    return { success: true };
  } catch (error) {
    console.error("Gagal mengedit:", error);
    return { success: false };
  }
}