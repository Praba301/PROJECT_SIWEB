import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET || "kunci_rahasia_praketrio_sangat_aman_12345";
const SECRET = new TextEncoder().encode(jwtSecret);

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("praketrio_auth")?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, SECRET);
    return {
      id: payload.id as number,
      nama: payload.nama as string,
      role: payload.role as string,
    };
  } catch (error) {
    return null;
  }
}
