import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("user_id");

    console.log("userId received:", userId);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "user_id tidak ditemukan" },
        { status: 400 }
      );
    }

    const result = await db.query(
      "SELECT id FROM customers WHERE user_id = $1",
      [parseInt(userId)]
    );

    console.log("Query result:", result.rows);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Customer tidak ditemukan untuk user_id: " + userId },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      customer_id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error in /api/customer/by-user:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data: " + (error as Error).message },
      { status: 500 }
    );
  }
}
