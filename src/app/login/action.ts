"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// PENAMBAHAN: Memberikan nilai rahasia default jika .env gagal terbaca
const jwtSecret = process.env.JWT_SECRET || "kunci_rahasia_praketrio_sangat_aman_12345";
const SECRET = new TextEncoder().encode(jwtSecret);

export async function loginAction(formData: FormData) {
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;

  let redirectPath = "/login";

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return { error: "Email atau kata sandi salah" };
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password_hash as string);
    if (!isValid) {
      return { error: "Email atau kata sandi salah" };
    }

    const token = await new SignJWT({
      id: user.id,
      role: user.role,
      nama: user.nama,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(SECRET);

    const cookieStore = await cookies();

    cookieStore.set("praketrio_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400,
      path: "/",
    });

    cookieStore.set("praketrio_role", user.role as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400,
      path: "/",
    });

    // Menangani perbedaan penulisan strip/underscore pada role fleet shipper
    if (user.role === "admin") redirectPath = "/admin/dashboard";
    else if (user.role === "fleet_shipper" || user.role === "fleet-shipper") redirectPath = "/fleet-shipper";
    else redirectPath = "/customer/dashboard";

  } catch (err: any) {
    console.error("LOGIN ERROR:", err);
    // TAMPILKAN ERROR ASLI KE WEB AGAR KITA TAHU KENAPA
    return { error: `Sistem Error: ${err.message || "Gagal menghubungi database Neon."}` };
  }

  redirect(redirectPath);
}

export async function registerAction(formData: FormData) {
  const nama = (formData.get("nama") as string).trim();
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;

  try {
    const existing = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return { error: "Email sudah terdaftar, silakan gunakan email lain." };
    }

    const password_hash = await bcrypt.hash(password, 10);

    const userResult = await db.query(
      "INSERT INTO users (nama, email, password_hash, role) VALUES ($1, $2, $3, 'customer') RETURNING id",
      [nama, email, password_hash]
    );

    await db.query(
      "INSERT INTO customers (user_id, nama_customer, email) VALUES ($1, $2, $3)",
      [userResult.rows[0].id, nama, email]
    );

    return { success: true };

  } catch (err: any) {
    console.error("REGISTER ERROR:", err);
    return { error: `Sistem Error: ${err.message || "Gagal mendaftarkan akun."}` };
  }
}

// PERBAIKAN FINAL: Menghapus cookie di semua lini rute/path agar tidak jebol lagi
export async function logoutAction() {
  const cookieStore = await cookies();
  
  // 1. Perintah standar hapus cookie dari Next.js
  cookieStore.delete("praketrio_auth");
  cookieStore.delete("praketrio_role");

  // 2. Paksa tiban umur cookie jadi 0 detik di rute utama (Root)
  cookieStore.set("praketrio_auth", "", { path: "/", maxAge: 0 });
  cookieStore.set("praketrio_role", "", { path: "/", maxAge: 0 });

  // 3. Nuke/Hancurkan cookie duplikat yang bersembunyi khusus di dalam jalur /customer
  cookieStore.set("praketrio_auth", "", { path: "/customer", maxAge: 0 });
  cookieStore.set("praketrio_role", "", { path: "/customer", maxAge: 0 });
  
  // 4. Jaga-jaga untuk jalur fleet-shipper juga
  cookieStore.set("praketrio_auth", "", { path: "/fleet-shipper", maxAge: 0 });
  cookieStore.set("praketrio_role", "", { path: "/fleet-shipper", maxAge: 0 });
}