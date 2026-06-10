"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// ======================================================
// 1. FUNGSI HAPUS RESI
// ======================================================
export async function hapusResiDatabase(resi: string) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

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

    await client.query(`DELETE FROM kapal_pengiriman WHERE transaksi_id = $1`, [transaksiId]);
    await client.query(`DELETE FROM detail_pengiriman WHERE transaksi_id = $1`, [transaksiId]);
    await client.query(`DELETE FROM transaksi_pengiriman WHERE id = $1`, [transaksiId]);

    if (customerId) {
      await client.query(`DELETE FROM customers WHERE id = $1`, [customerId]);
    }

    await client.query("COMMIT");

    revalidatePath("/admin/pengiriman");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/armada");
    revalidatePath("/admin/analitik");

    return { success: true };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("DELETE ERROR:", error);
    return { success: false, error: (error as Error).message };
  } finally {
    client.release();
  }
}

// ======================================================
// 2. FUNGSI EDIT RESI (ANTI DATA BENTROK / NGIKUT MASSAL)
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

    const countTx = await client.query(
      "SELECT COUNT(*) FROM transaksi_pengiriman WHERE customer_id = $1",
      [customerId]
    );
    const isShared = Number(countTx.rows[0].count || 0) > 1;

    if (isShared) {
      let newCustId;
      try {
        const newCustRes = await client.query(
          `INSERT INTO customers (nama_customer, no_telepon) VALUES ($1, $2) RETURNING id`,
          [namaPengirim, "-"]
        );
        newCustId = newCustRes.rows[0].id;
      } catch (e) {
        const maxCustResult = await client.query("SELECT MAX(id) FROM customers");
        newCustId = Number(maxCustResult.rows[0].max || 0) + 1;
        await client.query(
          `INSERT INTO customers (id, nama_customer, no_telepon) VALUES ($1, $2, $3)`,
          [newCustId, namaPengirim, "-"]
        );
      }

      await client.query(
        `UPDATE transaksi_pengiriman SET customer_id = $1 WHERE id = $2`,
        [newCustId, transaksiId]
      );
    } else {
      await client.query(
        `UPDATE customers SET nama_customer = $1 WHERE id = $2`,
        [namaPengirim, customerId]
      );
    }

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
    revalidatePath("/admin/armada");
    revalidatePath("/admin/analitik");

    return { success: true };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("EDIT ERROR:", error);
    return { success: false, error: (error as Error).message };
  } finally {
    client.release();
  }
}

// ======================================================
// 3. FUNGSI TAMBAH RESI (KEMBALI KE AUTO-INCREMENT CERDAS)
// ======================================================
export async function tambahResiDatabase(formData: FormData) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // KEMBALI KE LOGIKA CERDAS TRISTO: Ambil nomor resi terakhir dari DB agar anti-bentrok duplikat
    const lastResiQuery = await client.query("SELECT no_resi FROM transaksi_pengiriman ORDER BY id DESC LIMIT 1");
    let nomorBerikutnya = 1;
    
    if (lastResiQuery.rows.length > 0) {
      const lastResi = lastResiQuery.rows[0].no_resi; 
      const lastNum = parseInt(lastResi.replace("SWB-2024", ""), 10);
      if (!isNaN(lastNum)) {
        nomorBerikutnya = lastNum + 1;
      }
    }
    const noResiBaru = `SWB-2024${String(nomorBerikutnya).padStart(4, "0")}`;

    const data = {
      tanggalKirim: formData.get("tanggalKirim") as string,
      pengirim: formData.get("namaPengirim") as string,
      penerima: formData.get("namaPenerima") as string,
      teleponPengirim: (formData.get("noTeleponPengirim") as string) || (formData.get("noTelepon") as string) || "-",
      teleponPenerima: (formData.get("noTeleponPenerima") as string) || (formData.get("noTelepon") as string) || "-",
      kotaAsal: formData.get("kotaAsal") as string,
      kotaTujuan: formData.get("kotaTujuan") as string,
      jenisBarang: formData.get("jenisBarang") as string,
      berat: Number(formData.get("beratTotal")),
      harga: Number(formData.get("hargaTarif")),
      jenisPengiriman: formData.get("jenisPengiriman") as string,
      statusKargo: "Diproses",
      deskripsi: (formData.get("deskripsi") as string) || "",
      namaKapal: formData.get("namaKapal") as string,
      jenisKapal: (formData.get("jenisKapal") as string) || "Kapal Kargo Umum",
      kodeKapal: (formData.get("kodeKapal") as string) || `IMO-${Math.floor(1000000 + Math.random() * 9000000)}`,
      kapasitas: (formData.get("kapasitasMuatan") as string) || "100%",
      statusKapal: (formData.get("statusKapal") as string) || "Siap Berlayar",
      tipePaket: (formData.get("tipePaket") as string) || (formData.get("jenisPengiriman") as string),
      totalBiaya: Number(formData.get("totalBiaya")) || Number(formData.get("hargaTarif")),
    };

    let customerIdInt: number;
    const customerIdFromForm = formData.get("customer_id") as string;

    if (customerIdFromForm && customerIdFromForm !== "" && customerIdFromForm !== "null" && customerIdFromForm !== "undefined") {
      customerIdInt = parseInt(customerIdFromForm);
      await client.query(
        `UPDATE customers SET no_telepon = $1 WHERE id = $2`,
        [data.teleponPengirim, customerIdInt]
      );
    } else {
      try {
        const newCustomerResult = await client.query(
          `INSERT INTO customers (nama_customer, no_telepon) VALUES ($1, $2) RETURNING id`,
          [data.pengirim, data.teleponPengirim]
        );
        customerIdInt = newCustomerResult.rows[0].id;
      } catch (err) {
        const maxCustResult = await client.query("SELECT MAX(id) FROM customers");
        const nextCustId = Number(maxCustResult.rows[0].max || 0) + 1;

        await client.query(
          `INSERT INTO customers (id, nama_customer, no_telepon) VALUES ($1, $2, $3)`,
          [nextCustId, data.pengirim, data.teleponPengirim]
        );
        customerIdInt = nextCustId;
      }
    }

    // INSERT ke transaksi_pengiriman
    const transaksiResult = await client.query(
      `INSERT INTO transaksi_pengiriman (no_resi, customer_id, tanggal_transaksi, status, jenis_pengiriman, kota_asal, kota_tujuan, tipe_paket, nama_penerima)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [noResiBaru, customerIdInt, data.tanggalKirim, data.statusKargo, data.jenisPengiriman, data.kotaAsal, data.kotaTujuan, data.tipePaket, data.penerima]
    );
    const transaksiId = transaksiResult.rows[0].id;

    // INSERT ke detail_pengiriman dengan penanganan dinamis struktur kolom temanmu
    try {
      await client.query(
        `INSERT INTO detail_pengiriman (transaksi_id, berat_total, jenis_barang, harga_tarif, deskripsi, biaya, total_biaya, telepon_pengirim, telepon_penerima)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [transaksiId, data.berat, data.jenisBarang, data.harga, data.deskripsi, data.harga, data.totalBiaya, data.teleponPengirim, data.teleponPenerima]
      );
    } catch (err1) {
      try {
        await client.query(
          `INSERT INTO detail_pengiriman (transaksi_id, berat_total, jenis_barang, harga_tarif, deskripsi, total_biaya, telepon_pengirim, telepon_penerima)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [transaksiId, data.berat, data.jenisBarang, data.harga, data.deskripsi, data.totalBiaya, data.teleponPengirim, data.teleponPenerima]
        );
      } catch (err2) {
        try {
          await client.query(
            `INSERT INTO detail_pengiriman (transaksi_id, berat_total, jenis_barang, harga_tarif, deskripsi, total_biaya)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [transaksiId, data.berat, data.jenisBarang, data.harga, data.deskripsi, data.totalBiaya]
          );
        } catch (err3) {
          await client.query(
            `INSERT INTO detail_pengiriman (transaksi_id, berat_total, jenis_barang, harga_tarif, deskripsi, biaya, total_biaya)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [transaksiId, data.berat, data.jenisBarang, data.harga, data.deskripsi, data.harga, data.totalBiaya]
          );
        }
      }
    }

    // INSERT ke kapal_pengiriman
    await client.query(
      `INSERT INTO kapal_pengiriman (transaksi_id, nama_kapal, jenis_kapal, kode_kapal, kapasitas_muatan, status_kapal)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [transaksiId, data.namaKapal, data.jenisKapal, data.kodeKapal, data.kapasitas, data.statusKapal]
    );

    await client.query("COMMIT");

    revalidatePath("/admin/pengiriman");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/armada");
    revalidatePath("/admin/analitik");
    revalidatePath("/customer/riwayat");

    return { success: true, no_resi: noResiBaru };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("CREATE ERROR:", error);
    return { success: false, error: (error as Error).message };
  } finally {
    client.release();
  }
}