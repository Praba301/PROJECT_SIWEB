"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

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

    if (user.role === "admin") redirectPath = "/admin/dashboard";
    else if (user.role === "fleet_shipper") redirectPath = "/fleet-shipper";
    else redirectPath = "/customer/dashboard";

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return { error: "Terjadi kesalahan server, coba lagi." };
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

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return { error: "Terjadi kesalahan server, coba lagi." };
  }
}