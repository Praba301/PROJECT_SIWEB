"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";

// Fungsi untuk mengambil data profil saat ini
export async function getUserProfile() {
  const cookieStore = await cookies();
  const rawEmail = cookieStore.get("praketrio_email")?.value;

  if (!rawEmail) return null;

  const email = decodeURIComponent(rawEmail).trim().toLowerCase();

  try {
    // Mengambil data dari tabel users dan customers
    const res = await db.query(`
      SELECT 
        u.nama, 
        u.email, 
        c.no_whatsapp, 
        c.perusahaan, 
        c.alamat 
      FROM users u
      LEFT JOIN customers c ON u.email = c.email
      WHERE u.email = $1 LIMIT 1
    `, [email]);

    if (res.rows.length > 0) {
      return res.rows[0];
    }
    return null;
  } catch (error) {
    console.error("Get Profile Error:", error);
    return null;
  }
}

// Fungsi untuk menyimpan perubahan ke database
export async function updateProfileAction(formData: FormData) {
  const nama = (formData.get("nama") as string || "").trim();
  const whatsapp = (formData.get("whatsapp") as string || "").trim();
  const perusahaan = (formData.get("perusahaan") as string || "").trim();
  const alamat = (formData.get("alamat") as string || "").trim();

  const cookieStore = await cookies();
  const rawEmail = cookieStore.get("praketrio_email")?.value;

  if (!rawEmail) {
    return { error: "Sesi tidak valid, silakan login kembali." };
  }

  const email = decodeURIComponent(rawEmail).trim().toLowerCase();

  if (!nama) {
    return { error: "Nama pengirim wajib diisi." };
  }

  try {
    // 1. Update nama di tabel users
    await db.query(
      "UPDATE users SET nama = $1 WHERE email = $2",
      [nama, email]
    );

    // 2. Update data identitas logistik di tabel customers
    // Catatan: Pastikan kolom no_whatsapp, perusahaan, dan alamat sudah kamu buat di tabel PostgreSQL-mu.
    await db.query(`
      UPDATE customers 
      SET nama_customer = $1, no_whatsapp = $2, perusahaan = $3, alamat = $4 
      WHERE email = $5
    `, [nama, whatsapp, perusahaan, alamat, email]);

    return { success: true };
  } catch (error: any) {
    console.error("Update Profile Error:", error);
    return { error: "Gagal menyimpan. Pastikan struktur tabel database (no_whatsapp, perusahaan, alamat) sudah sesuai." };
  }
}