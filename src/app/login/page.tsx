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
      router.push("/admin/dashboard");
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
    <main className="min-h-screen bg-[#0D0D14] flex items-center justify-center px-4 font-sans relative overflow-hidden">
      
      {/* Background Ornamen tambahan untuk mempercantik (opsional, halus) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#A855F7]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2D1B69]/30 blur-[120px] rounded-full pointer-events-none" />

      {/* Kontainer Utama dengan efek hover bayangan yang lebih tajam */}
      <div className="w-full max-w-3xl bg-[#2D1B69] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)] hover:shadow-[0_0_80px_rgba(168,85,247,0.3)] transition-shadow duration-500 flex min-h-[450px] relative z-10">

        {/* Panel Kiri */}
        <div
          className={`transition-all duration-700 ease-in-out flex flex-col justify-center items-center px-10 py-12 relative ${
            isLogin ? "w-1/2 opacity-100 translate-x-0" : "w-1/2 bg-[#1E1256] opacity-90"
          }`}
        >
          {isLogin ? (
            /* Form Login */
            <form onSubmit={handleLogin} className="w-full flex flex-col items-center gap-5 animate-fade-in">
              <h2 className="text-white font-bold text-2xl italic font-mono uppercase tracking-tight mb-2">
                Masuk di sini
              </h2>
              
              {/* Input Email - Efek Glow dan Transisi */}
              <div className="w-full relative group">
                <input
                  type="email"
                  placeholder="Email Anda"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1E1256]/50 border border-[#A855F7]/50 text-white placeholder-white/50 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC] focus:bg-[#1E1256] focus:ring-2 focus:ring-[#C084FC]/30 transition-all duration-300 hover:border-[#A855F7]"
                />
              </div>

              {/* Input Password - Efek Glow dan Transisi */}
              <div className="w-full relative group">
                <input
                  type="password"
                  placeholder="Kata Sandi"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1E1256]/50 border border-[#A855F7]/50 text-white placeholder-white/50 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC] focus:bg-[#1E1256] focus:ring-2 focus:ring-[#C084FC]/30 transition-all duration-300 hover:border-[#A855F7]"
                />
              </div>

              <div className="flex items-center gap-2 w-full px-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 accent-[#A855F7] cursor-pointer rounded border-gray-300 focus:ring-[#A855F7] transition-all" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="text-white/70 text-xs cursor-pointer hover:text-white transition-colors select-none">
                  Ingat Saya
                </label>
              </div>

              {/* Tombol Masuk - Efek Membal (active) dan Glow */}
              <button
                type="submit"
                className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold rounded-full py-3 text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:-translate-y-1 active:scale-95 mt-2"
              >
                Masuk
              </button>

              <Link
                href="/"
                className="text-white/60 font-bold italic text-xs hover:text-[#C084FC] transition-colors duration-200 mt-2 hover:underline underline-offset-4"
              >
                Kembali Ke Beranda
              </Link>
            </form>
          ) : (
            /* Panel Halo Teman (Saat di layar Register) */
            <div className="w-full flex flex-col items-center gap-6 text-center animate-fade-in">
              <div className="transform transition-transform duration-500 hover:scale-110 hover:rotate-3 cursor-pointer">
                <Image src="/logo.png" alt="Praketrio" width={80} height={80} className="object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              </div>
              <p className="text-[#C084FC] font-bold text-xs tracking-widest uppercase font-mono">
                PRAKETRIO
              </p>
              <h2 className="text-white font-bold text-2xl tracking-tight">Halo Teman!</h2>
              <p className="text-white/70 text-sm leading-relaxed px-2">
                Jika Anda sudah memiliki akun, silakan masuk ke sini dan selamat bergabung kembali.
              </p>
              <button
                onClick={() => setIsLogin(true)}
                className="border-2 border-white/40 hover:border-white text-white font-semibold rounded-full px-10 py-3 text-sm transition-all duration-300 hover:bg-white/5 active:scale-95"
              >
                Masuk
              </button>
            </div>
          )}
        </div>

        {/* Panel Kanan */}
        <div
          className={`transition-all duration-700 ease-in-out flex flex-col justify-center items-center px-10 py-12 relative ${
            isLogin ? "w-1/2 bg-[#1E1256] opacity-90" : "w-1/2 opacity-100"
          }`}
        >
          {isLogin ? (
            /* Panel Mulai Perjalanan (Saat di layar Login) */
            <div className="w-full flex flex-col items-center gap-6 text-center animate-fade-in">
              <div className="transform transition-transform duration-500 hover:scale-110 hover:-rotate-3 cursor-pointer">
                <Image src="/logo.png" alt="Praketrio" width={80} height={80} className="object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              </div>
              <p className="text-[#C084FC] font-bold text-xs tracking-widest uppercase font-mono">
                PRAKETRIO
              </p>
              <h2 className="text-white font-bold text-2xl tracking-tight leading-tight">
                Mulai Perjalananmu<br/>Sekarang
              </h2>
              <p className="text-white/70 text-sm leading-relaxed px-2">
                Jika Anda belum memiliki akun, mari bergabung dengan kami dan mulai pengirimanmu.
              </p>
              <button
                onClick={() => setIsLogin(false)}
                className="border-2 border-white/40 hover:border-white text-white font-semibold rounded-full px-10 py-3 text-sm transition-all duration-300 hover:bg-white/5 active:scale-95"
              >
                Daftar
              </button>
            </div>
          ) : (
            /* Form Register */
            <form onSubmit={handleRegister} className="w-full flex flex-col items-center gap-4 animate-fade-in">
              <h2 className="text-white font-bold text-2xl italic font-mono uppercase tracking-tight mb-1">
                Daftar di sini
              </h2>
              
              <input
                type="text"
                placeholder="Nama Lengkap"
                required
                value={regNama}
                onChange={(e) => setRegNama(e.target.value)}
                className="w-full bg-[#1E1256]/50 border border-[#A855F7]/50 text-white placeholder-white/50 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC] focus:bg-[#1E1256] focus:ring-2 focus:ring-[#C084FC]/30 transition-all duration-300 hover:border-[#A855F7]"
              />
              <input
                type="email"
                placeholder="Masukkan Email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="w-full bg-[#1E1256]/50 border border-[#A855F7]/50 text-white placeholder-white/50 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC] focus:bg-[#1E1256] focus:ring-2 focus:ring-[#C084FC]/30 transition-all duration-300 hover:border-[#A855F7]"
              />
              <input
                type="password"
                placeholder="Masukkan Kata Sandi"
                required
                value={regPass}
                onChange={(e) => setRegPass(e.target.value)}
                className="w-full bg-[#1E1256]/50 border border-[#A855F7]/50 text-white placeholder-white/50 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC] focus:bg-[#1E1256] focus:ring-2 focus:ring-[#C084FC]/30 transition-all duration-300 hover:border-[#A855F7]"
              />
              <input
                type="password"
                placeholder="Ulangi Kata Sandi"
                required
                className="w-full bg-[#1E1256]/50 border border-[#A855F7]/50 text-white placeholder-white/50 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC] focus:bg-[#1E1256] focus:ring-2 focus:ring-[#C084FC]/30 transition-all duration-300 hover:border-[#A855F7]"
              />
              
              <button
                type="submit"
                className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white font-bold rounded-full py-3 text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:-translate-y-1 active:scale-95 mt-2"
              >
                Daftar
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Toast Notification (Sudah bagus, saya rapikan transisinya sedikit) */}
      {toast.show && (
        <div className="fixed bottom-10 right-10 bg-[#9333EA] text-white px-8 py-4 rounded-xl shadow-[0_10px_40px_rgba(168,85,247,0.6)] border border-white/20 animate-fade-in z-[100] font-bold flex items-center gap-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {toast.message}
        </div>
      )}
    </main>
  );
}