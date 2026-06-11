"use client";

import { useState, useEffect } from "react";

export default function ProfilFleet() {
  const [user, setUser] = useState<{ id: number; nama: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setUser({ id: 24, nama: "Tristo Thomas", role: "Fleet Shipper" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12 mt-8">
      <div className="border-b border-[#1E1E2E] pb-5">
        <h1 className="text-2xl font-bold text-white tracking-wide uppercase">Profil Operasional</h1>
        <p className="text-[#A0A0B0] text-sm mt-1">Informasi identitas satuan pengawas armada laut.</p>
      </div>

      <div className="bg-[#13131F] border border-[#1E1E2E] rounded-2xl p-6 md:p-10 shadow-lg relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#A855F7]/20 to-transparent"></div>
        <div className="absolute top-4 right-4 text-6xl opacity-5">⚓</div>

        {isLoading ? (
          <div className="py-10"><div className="w-8 h-8 border-4 border-[#C084FC] border-t-transparent rounded-full animate-spin"></div></div>
        ) : user && (
          <div className="w-full max-w-lg relative z-10 flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-[#0A0A12] border-4 border-[#13131F] shadow-[0_0_0_2px_#A855F7] flex items-center justify-center text-4xl font-bold text-white mb-5">
              {user.nama ? user.nama.charAt(0).toUpperCase() : "F"}
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">{user.nama}</h2>
            <span className="bg-[#A855F7]/10 text-[#C084FC] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border border-[#A855F7]/30 mb-8">
              {user.role.replace("_", " ")}
            </span>

            <div className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl overflow-hidden">
              <div className="bg-[#1A1A24] px-5 py-3 border-b border-[#1E1E2E]">
                <h3 className="text-xs font-bold text-[#A0A0B0] tracking-widest uppercase">ID Card Digital</h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-[#1E1E2E] pb-3">
                  <span className="text-[#6B6B80] text-xs font-semibold">Nomor Induk Pegawai</span>
                  <span className="text-white font-mono text-sm">FLT-{user.id.toString().padStart(5, "0")}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1E1E2E] pb-3">
                  <span className="text-[#6B6B80] text-xs font-semibold">Divisi Penugasan</span>
                  <span className="text-white text-sm font-medium">Pengawasan Armada Laut</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B6B80] text-xs font-semibold">Status Operasional</span>
                  <span className="text-green-400 text-sm font-bold">Siap Bertugas</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}} />
    </div>
  );
}