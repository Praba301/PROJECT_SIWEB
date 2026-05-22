"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ======================================================
// 1. FUNGSI HAPUS RESI (BERSIH TOTAL SAMPAI KE AKAR TABEL CUSTOMERS)
// ======================================================
export async function hapusResiDatabase(resi: string) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Ambil data id transaksi dan customer_id sebelum data utamanya dihapus
    const transaksi = await client.query(
      `SELECT id, customer_id FROM transaksi_pengiriman WHERE no_resi = $1`,
      [resi]
    );

    if (transaksi.rows.length === 0) {
      await client.query("ROLLBACK");
      return { success: false, error: "Resi tidak ditemukan" };
    }

    const transaksiId = transaksi.rows[0].id;
    const customerId = transaksi.rows[0].customer_id;

    // Hapus relasi anak-anak tabel terlebih dahulu demi foreign key constraint
    await client.query(`DELETE FROM kapal_pengiriman WHERE transaksi_id = $1`, [transaksiId]);
    await client.query(`DELETE FROM detail_pengiriman WHERE transaksi_id = $1`, [transaksiId]);
    await client.query(`DELETE FROM transaksi_pengiriman WHERE id = $1`, [transaksiId]);

    // Hapus akar data pada tabel customers agar tidak ada data sampah tersisa
    if (customerId) {
      await client.query(`DELETE FROM customers WHERE id = $1`, [customerId]);
    }

    await client.query("COMMIT");

    revalidatePath("/admin/pengiriman");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("DELETE ERROR:", error);
    return { success: false };
  } finally {
    client.release();
  }
}

// ======================================================
// 2. FUNGSI EDIT RESI
// ======================================================
export async function editResiDatabase(
  resi: string,
  namaPengirim: string,
  berat: number,
  statusKargo: string
) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const getData = await client.query(
      `SELECT id, customer_id FROM transaksi_pengiriman WHERE no_resi = $1`,
      [resi]
    );

    if (getData.rows.length === 0) {
      await client.query("ROLLBACK");
      return { success: false };
    }

    const transaksiId = getData.rows[0].id;
    const customerId = getData.rows[0].customer_id;

    await client.query(
      `UPDATE customers SET nama_customer = $1 WHERE id = $2`,
      [namaPengirim, customerId]
    );

    await client.query(
      `UPDATE detail_pengiriman SET berat_total = $1 WHERE transaksi_id = $2`,
      [berat, transaksiId]
    );

    await client.query(
      `UPDATE transaksi_pengiriman SET status = $1 WHERE id = $2`,
      [statusKargo, transaksiId]
    );

    await client.query("COMMIT");

    revalidatePath("/admin/pengiriman");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("EDIT ERROR:", error);
    return { success: false };
  } finally {
    client.release();
  }
}

// ======================================================
// 3. FUNGSI TAMBAH RESI (OTOMATIS LANJUTKAN FORMAT SWB-20240011)
// ======================================================
export async function tambahResiDatabase(formData: FormData) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // HITUNG URUTAN CERDAS: Ambil total baris saat ini untuk menentukan nomor berikutnya
    const countResult = await client.query("SELECT COUNT(*) FROM transaksi_pengiriman");
    const nomorBerikutnya = Number(countResult.rows[0].count || 0) + 1;

    // Mengunci format resi otomatis mengikuti kelanjutan database Anda (Contoh: SWB-20240011)
    const resiFormInput = formData.get("noResiInput") as string;
    const noResiBaru = resiFormInput ? resiFormInput.trim() : `SWB-2024${String(nomorBerikutnya).padStart(4, "0")}`;

    const data = {
      tanggalKirim: formData.get("tanggalKirim") as string,
      pengirim: formData.get("namaPengirim") as string,
      penerima: formData.get("namaPenerima") as string,
      telepon: formData.get("noTelepon") as string,
      kotaAsal: formData.get("kotaAsal") as string,
      kotaTujuan: formData.get("kotaTujuan") as string,
      jenisBarang: formData.get("jenisBarang") as string,
      berat: Number(formData.get("beratTotal")),
      harga: Number(formData.get("hargaTarif")),
      jenisPengiriman: formData.get("jenisPengiriman") as string,
      statusKargo: "Diproses", 
      deskripsi: formData.get("deskripsi") as string,
      namaKapal: formData.get("namaKapal") as string,
      jenisKapal: (formData.get("jenisKapal") as string) || "Kapal Kargo Umum", // Menerima pilihan dinamis dari client
      kodeKapal: formData.get("kodeKapal") as string,
      kapasitas: formData.get("kapasitasMuatan") as string,
      statusKapal: "Siap Berlayar", // Otomatis tersimpan sebagai Siap Berlayar
    };

    // 1. INSERT TABEL CUSTOMERS
    const customerResult = await client.query(
      `INSERT INTO customers (nama_customer, nama_penerima, no_telepon, kota_asal, kota_tujuan)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [data.pengirim, data.penerima, data.telepon, data.kotaAsal, data.kotaTujuan]
    );
    const customerId = customerResult.rows[0].id;

    // 2. INSERT TABEL TRANSAKSI_PENGIRIMAN
    const transaksiResult = await client.query(
      `INSERT INTO transaksi_pengiriman (no_resi, customer_id, tanggal_transaksi, status, jenis_pengiriman, kota_asal, kota_tujuan)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [noResiBaru, customerId, data.tanggalKirim, data.statusKargo, data.jenisPengiriman, data.kotaAsal, data.kotaTujuan]
    );
    const transaksiId = transaksiResult.rows[0].id;

    // 3. INSERT TABEL DETAIL_PENGIRIMAN
    await client.query(
      `INSERT INTO detail_pengiriman (transaksi_id, berat_total, jenis_barang, harga_tarif, deskripsi, biaya)
       VALUES ($1, $2, $3, $4, $5, $4)`,
      [transaksiId, data.berat, data.jenisBarang, data.harga, data.deskripsi]
    );

    // 4. INSERT TABEL KAPAL_PENGIRIMAN
    await client.query(
      `INSERT INTO kapal_pengiriman (transaksi_id, nama_kapal, jenis_kapal, kode_kapal, kapasitas_muatan, status_kapal)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [transaksiId, data.namaKapal, data.jenisKapal, data.kodeKapal, data.kapasitas, data.statusKapal]
    );

    await client.query("COMMIT");

    revalidatePath("/admin/pengiriman");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("CREATE ERROR:", error);
    return { success: false, error: "Database Error" };
  } finally {
    client.release();
  }
}