"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  // State khusus untuk form register
  const [regNama, setRegNama] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  
  const router = useRouter();

  // Efek untuk memuat email yang tersimpan jika "Remember Me" dicentang sebelumnya
  useEffect(() => {
    const savedEmail = localStorage.getItem("praketrio_email");
    const savedRemember = localStorage.getItem("praketrio_remember");
    if (savedRemember === "true" && savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Logika Remember Me
    if (rememberMe) {
      localStorage.setItem("praketrio_email", email);
      localStorage.setItem("praketrio_remember", "true");
    } else {
      localStorage.removeItem("praketrio_email");
      localStorage.removeItem("praketrio_remember");
    }

    const emailBersih = email.trim().toLowerCase();
    
    if (emailBersih === "fleet@praketrio.com") {
      router.push("/fleet-shipper");
    } else if (emailBersih === "admin@praketrio.com") {
      router.push("/dashboard/admin");
    } else {
      router.push("/customer/dashboard");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
  e.preventDefault();
  setToast({ show: true, message: `Registrasi Berhasil! Halo ${regNama}, silakan masuk.` });
    setTimeout(() => {
    setToast({ show: false, message: "" });
    setIsLogin(true);
  }, 3000);
};

  return (
    <main className="min-h-screen bg-[#0D0D14] flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-3xl bg-[#2D1B69] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.2)] flex min-h-[420px]">

        {/* Panel Kiri */}
        <div
          className={`transition-all duration-500 flex flex-col justify-center items-center px-10 py-12 ${
            isLogin ? "w-1/2" : "w-1/2 bg-[#1E1256]"
          }`}
        >
          {isLogin ? (
            /* Form Login */
            <form onSubmit={handleLogin} className="w-full flex flex-col items-center gap-5">
              <h2 className="text-white font-bold text-2xl italic font-mono uppercase tracking-tight">
                Masuk di sini
              </h2>
              <input
                type="email"
                placeholder="Email Anda"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-[#A855F7] text-white placeholder-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC]"
              />
              <input
                type="password"
                placeholder="Kata Sandi"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-[#A855F7] text-white placeholder-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC]"
              />
              <div className="flex items-center gap-2 w-full">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="accent-[#A855F7] cursor-pointer" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="text-white/70 text-xs cursor-pointer">
                  Ingat Saya
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-[#A855F7] hover:bg-[#7C3AED] text-white font-semibold rounded-full py-3 text-sm transition-colors duration-200"
              >
                Masuk
              </button>
              <Link
                href="/"
                className="text-white font-bold italic text-xs hover:text-[#C084FC] transition-colors duration-200"
              >
                Kembali Ke Beranda
              </Link>
            </form>
          ) : (
            /* Panel Halo Teman (Saat di layar Register) */
            <div className="w-full flex flex-col items-center gap-6 text-center animate-fade-in">
              <Image
                src="/logo.png"
                alt="Praketrio"
                width={80}
                height={80}
                className="object-contain"
              />
              <p className="text-white font-bold text-xs tracking-widest uppercase font-mono">
                PRAKETRIO
              </p>
              <h2 className="text-white font-bold text-2xl tracking-tight">Halo Teman!</h2>
              <p className="text-white/70 text-sm leading-relaxed px-2">
                Jika Anda sudah memiliki akun, silakan masuk ke sini dan selamat bergabung kembali
              </p>
              <button
                onClick={() => setIsLogin(true)}
                className="border border-white/60 hover:border-white text-white font-semibold rounded-full px-10 py-3 text-sm transition-colors duration-200"
              >
                Masuk
              </button>
            </div>
          )}
        </div>

        {/* Panel Kanan */}
        <div
          className={`transition-all duration-500 flex flex-col justify-center items-center px-10 py-12 ${
            isLogin ? "w-1/2 bg-[#1E1256]" : "w-1/2"
          }`}
        >
          {isLogin ? (
            /* Panel Mulai Perjalanan (Saat di layar Login) */
            <div className="w-full flex flex-col items-center gap-6 text-center animate-fade-in">
              <Image
                src="/logo.png"
                alt="Praketrio"
                width={80}
                height={80}
                className="object-contain"
              />
              <p className="text-white font-bold text-xs tracking-widest uppercase font-mono">
                PRAKETRIO
              </p>
              <h2 className="text-white font-bold text-2xl tracking-tight">
                Mulai Perjalananmu Sekarang
              </h2>
              <p className="text-white/70 text-sm leading-relaxed px-2">
                Jika Anda belum memiliki akun, mari bergabung dengan kami dan mulai pengirimanmu
              </p>
              <button
                onClick={() => setIsLogin(false)}
                className="border border-white/60 hover:border-white text-white font-semibold rounded-full px-10 py-3 text-sm transition-colors duration-200"
              >
                Daftar
              </button>
            </div>
          ) : (
            /* Form Register */
            <form onSubmit={handleRegister} className="w-full flex flex-col items-center gap-4">
              <h2 className="text-white font-bold text-2xl italic font-mono uppercase tracking-tight">
                Daftar di sini
              </h2>
              <input
                type="text"
                placeholder="Nama Lengkap"
                required
                value={regNama}
                onChange={(e) => setRegNama(e.target.value)}
                className="w-full bg-transparent border border-[#A855F7] text-white placeholder-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC]"
              />
              <input
                type="email" // Menggunakan type email agar ada validasi @
                placeholder="Masukkan Email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full bg-transparent border border-[#A855F7] text-white placeholder-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC]"
              />
              <input
                type="password"
                placeholder="Masukkan Kata Sandi"
                required
                value={regPass}
                onChange={(e) => setRegPass(e.target.value)}
                className="w-full bg-transparent border border-[#A855F7] text-white placeholder-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC]"
              />
              <input
                type="password"
                placeholder="Ulangi Kata Sandi"
                required
                className="w-full bg-transparent border border-[#A855F7] text-white placeholder-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC]"
              />
              <button
                type="submit"
                className="w-full bg-[#A855F7] hover:bg-[#7C3AED] text-white font-semibold rounded-full py-3 text-sm transition-colors duration-200 mt-1"
              >
                Daftar
              </button>
            </form>
          )}
        </div>

      </div>
      {toast.show && (
  <div className="fixed bottom-10 right-10 bg-[#b562ff] text-white px-8 py-4 rounded-2xl shadow-[0_0_20px_rgba(181,98,255,0.5)] border border-white/20 animate-bounce z-[100] font-bold">
    {toast.message}
  </div>
)}
    </main>
  );
}