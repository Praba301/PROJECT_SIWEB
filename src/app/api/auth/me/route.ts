import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET || "kunci_rahasia_praketrio_sangat_aman_12345";
const SECRET = new TextEncoder().encode(jwtSecret);

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("praketrio_auth")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Tidak terautentikasi" },
        { status: 401 }
      );
    }

    const { payload } = await jwtVerify(token, SECRET);

    return NextResponse.json({
      success: true,
      user: {
        id: payload.id,
        nama: payload.nama,
        role: payload.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Token tidak valid" },
      { status: 401 }
    );
  }
}
