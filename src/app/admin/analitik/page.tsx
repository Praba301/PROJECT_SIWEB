import { db } from "@/lib/db";
import AnalitikClient from "./AnalitikClient";

export const metadata = {
  title: "Analitik | Praketrio",
};

export default async function AnalitikPage() {
  let armadaRows: any[] = [];
  let customerRows: any[] = [];
  
  // 1. Tarik Data Armada 
  try {
    const res = await db.query("SELECT * FROM armada");
    armadaRows = res.rows;
  } catch (e) {
    try {
      const res = await db.query("SELECT * FROM kapal");
      armadaRows = res.rows;
    } catch (err) { }
  }

  // 2. Tarik Data Customer 
  try {
    const res = await db.query("SELECT * FROM customers");
    customerRows = res.rows;
  } catch (e) {
    try {
      const res = await db.query("SELECT * FROM users WHERE role = 'customer'");
      customerRows = res.rows;
    } catch (err) { }
  }

  // Lempar 2 data pasti ini ke visual
  return (
    <AnalitikClient 
      armadaRows={armadaRows} 
      customerRows={customerRows} 
    />
  );
}