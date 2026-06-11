"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilAdmin() {
  const [user, setUser] = useState<{ id: number; nama: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error("API tidak merespon");
        const data = await res.json();
        if (data.success) setUser(data.user);
        else throw new Error("Data kosong");
      } catch (error) {
        console.error("Menggunakan data fallback untuk demo:", error);
        setUser({ id: 99, nama: "Tristo Thomas", role: "Administrator" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Profil Administrator</h1>
          <p className="text-[#A0A0B0] text-sm mt-1">Identitas dan pengaturan akun admin pusat.</p>
        </div>
      </div>

      <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-8 shadow-xl max-w-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#A855F7]/5 rounded-bl-full pointer-events-none blur-3xl"></div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#C084FC] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : user && (
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#A855F7] to-blue-600 p-1 shadow-lg">
                <div className="w-full h-full bg-[#0A0A12] rounded-xl flex items-center justify-center text-5xl font-black text-white">
                  {user.nama ? user.nama.charAt(0).toUpperCase() : "A"}
                </div>
              </div>
              <span className="mt-4 bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase border border-blue-500/30">
                {user.role}
              </span>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="bg-[#0A0A12] border border-[#1E1E2E] p-4 rounded-xl">
                <label className="text-[#6B6B80] text-[10px] font-bold uppercase tracking-widest block mb-1">Nama Lengkap</label>
                <p className="text-white text-lg font-semibold">{user.nama}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0A0A12] border border-[#1E1E2E] p-4 rounded-xl">
                  <label className="text-[#6B6B80] text-[10px] font-bold uppercase tracking-widest block mb-1">ID Pengguna</label>
                  <p className="text-slate-300 font-mono">ADM-{user.id.toString().padStart(4, "0")}</p>
                </div>
                <div className="bg-[#0A0A12] border border-[#1E1E2E] p-4 rounded-xl">
                  <label className="text-[#6B6B80] text-[10px] font-bold uppercase tracking-widest block mb-1">Akses Sistem</label>
                  <p className="text-green-400 font-semibold text-sm flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Full Access
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}} />
    </div>
  );
}