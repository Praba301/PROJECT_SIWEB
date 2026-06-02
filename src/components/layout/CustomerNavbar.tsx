"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Input Barang", href: "/customer/dashboard" },
  { label: "Lacak Paket", href: "/customer/lacak" },
  { label: "Riwayat", href: "/customer/riwayat" },
];

export default function CustomerNavbar() {
  const pathname = usePathname();

  // STATE UNTUK MODAL PROFIL & DATA CRUD
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    nama: "Praba",
    email: "praba@customer.com",
    telepon: "081234567890",
    perusahaan: "PT Logistik Maju (Opsional)",
    alamat: "Jl. Sudirman No. 45, Jakarta Pusat",
  });

  // State sementara untuk menampung ketikan sebelum di-save
  const [editForm, setEditForm] = useState({ ...profileData });

  const handleProfileClick = () => {
    setEditForm({ ...profileData }); // Reset form ke data terakhir saat dibuka
    setIsProfileOpen(true);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData({ ...editForm }); // Simpan data (Update)
    setIsProfileOpen(false); // Tutup modal
  };

  return (
    <>
      <nav className="flex items-center justify-between px-10 py-5 border-b border-[#1E1E2E] bg-[#0A0A12]/90 backdrop-blur-md sticky top-0 z-40 animate-fade-in-up">
        
        {/* BAGIAN KIRI: Logo & Menu */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/customer/dashboard" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
              <Image src="/logo.png" alt="Praketrio" width={32} height={32} className="object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            </div>
            <span className="text-white font-bold text-lg font-mono tracking-wider transition-colors duration-300 group-hover:text-[#C084FC]">Praketrio</span>
          </Link>

          {/* Navigasi Horizontal */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`relative flex items-center gap-2.5 text-sm font-semibold py-2.5 px-4 rounded-xl border transition-all duration-300 active:scale-95 group ${
                      isActive
                        ? "bg-[#A855F7]/10 border-[#A855F7]/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                        : "border-transparent text-[#A0A0B0] hover:border-[#1E1E2E] hover:bg-[#13131F] hover:text-white"
                    }`}
                    style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  >
                    <span 
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive 
                          ? "bg-[#C084FC] shadow-[0_0_8px_rgba(192,132,252,0.8)] scale-125" 
                          : "bg-[#3A3A4A] group-hover:bg-[#A855F7]"
                      }`}
                    />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* BAGIAN KANAN: Profil & Keluar */}
        <div className="flex items-center gap-6">
          
          {/* Tombol Buka Profil */}
          <div 
            onClick={handleProfileClick}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="flex flex-col items-end">
              <span className="text-white font-bold text-sm transition-colors group-hover:text-[#C084FC]">{profileData.nama}</span>
              <span className="text-[#6B6B80] text-xs transition-colors group-hover:text-slate-400">Edit Profil</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1E1E2E] border border-[#A855F7]/40 flex items-center justify-center text-[#A855F7] text-sm font-bold shadow-[0_0_10px_rgba(168,85,247,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#A855F7] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              {profileData.nama.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Garis Pemisah */}
          <div className="h-8 w-px bg-[#1E1E2E] hidden md:block"></div>

          {/* Tombol Keluar */}
          <Link href="/login">
            <div className="group flex items-center justify-center gap-2 text-sm font-semibold py-2.5 px-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:text-red-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] active:scale-95 transition-all duration-300">
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Keluar
            </div>
          </Link>
        </div>
      </nav>

      {/* ================= MODAL CRUD PROFIL CUSTOMER ================= */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <form 
            onSubmit={saveProfile}
            className="bg-[#13131F] border border-[#1E1E2E] p-8 rounded-2xl w-full max-w-lg mx-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out relative"
          >
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-6 border-b border-[#1E1E2E] pb-4">
              <h3 className="text-lg font-bold text-white tracking-widest uppercase flex items-center gap-3">
                Pengaturan Profil
              </h3>
              <button 
                type="button" 
                onClick={() => setIsProfileOpen(false)} 
                className="text-[#6B6B80] hover:text-white hover:rotate-90 text-2xl transition-all duration-300"
              >
                ✕
              </button>
            </div>

            {/* Area Input Profil */}
            <div className="space-y-4 mb-8">
              {/* Nama Lengkap */}
              <div className="flex flex-col gap-2">
                <label className="text-[#C084FC] text-[10px] font-bold uppercase tracking-widest">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama"
                  value={editForm.nama}
                  onChange={handleProfileChange}
                  required
                  className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all duration-300"
                />
              </div>

              {/* Email & Telepon */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[#C084FC] text-[10px] font-bold uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleProfileChange}
                    required
                    className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#C084FC] text-[10px] font-bold uppercase tracking-widest">Nomor Telepon</label>
                  <input
                    type="tel"
                    name="telepon"
                    value={editForm.telepon}
                    onChange={handleProfileChange}
                    required
                    className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Nama Perusahaan */}
              <div className="flex flex-col gap-2">
                <label className="text-[#C084FC] text-[10px] font-bold uppercase tracking-widest">Nama Perusahaan / Organisasi</label>
                <input
                  type="text"
                  name="perusahaan"
                  value={editForm.perusahaan}
                  onChange={handleProfileChange}
                  className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all duration-300"
                />
              </div>

              {/* Alamat Default */}
              <div className="flex flex-col gap-2">
                <label className="text-[#C084FC] text-[10px] font-bold uppercase tracking-widest">Alamat Pengiriman Default</label>
                <textarea
                  name="alamat"
                  value={editForm.alamat}
                  onChange={handleProfileChange}
                  rows={2}
                  className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all duration-300 resize-none"
                />
              </div>
            </div>

            {/* Tombol Action */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#1E1E2E]">
              <button 
                type="button" 
                onClick={() => setIsProfileOpen(false)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-[#A0A0B0] hover:text-white bg-[#1A1A24] border border-[#1E1E2E] hover:border-slate-600 transition-all active:scale-95"
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#A855F7] hover:bg-[#9333EA] shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all active:scale-95"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}