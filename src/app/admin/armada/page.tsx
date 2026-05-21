import { Suspense } from "react";
import ArmadaClient from "./ArmadaClient";
import { db } from "@/lib/db"; 

export default async function ArmadaPage() {
  let kapalRows = [];
  
  try {
    // Menarik seluruh isi data kapal dari Neon DB
    const result = await db.query("SELECT * FROM kapal ORDER BY id ASC");
    kapalRows = result.rows;
  } catch (error) {
    console.error("Gagal memuat data armada kapal:", error);
  }

  // Bungkus dengan Suspense untuk mengaktifkan Skeleton Loading
  return (
    <Suspense fallback={<div className="text-white p-8 font-bold animate-pulse text-[#C084FC]">Memuat Data Armada Kapal...</div>}>
      <ArmadaClient dataDariDatabase={kapalRows} />
    </Suspense>
  );
}