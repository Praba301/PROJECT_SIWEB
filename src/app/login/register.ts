"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function registerAction(formData: FormData) {
  const nama = formData.get("nama") as string;
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;

  // Cek apakah email sudah terdaftar
  const existing = await db.query(
    `SELECT id FROM users WHERE email = $1`,
    [email]
  );
  if (existing.rows.length > 0) {
    return { error: "Email sudah terdaftar" };
  }

  // Hash password
  const password_hash = await bcrypt.hash(password, 10);

  // Insert ke tabel users dengan role default customer
  const userResult = await db.query(
    `INSERT INTO users (nama, email, password_hash, role)
     VALUES ($1, $2, $3, 'customer') RETURNING id`,
    [nama, email, password_hash]
  );

  // Buat entry di tabel customers
  await db.query(
    `INSERT INTO customers (user_id, nama_customer, email)
     VALUES ($1, $2, $3)`,
    [userResult.rows[0].id, nama, email]
  );

  return { success: true };
}