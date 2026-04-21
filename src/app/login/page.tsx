"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  // Tambahan state untuk menangkap input email
  const [email, setEmail] = useState(""); 
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bersihkan email dari spasi berlebih dan ubah ke huruf kecil semua
    const emailBersih = email.trim().toLowerCase();
    
    if (emailBersih === "fleet@praketrio.com") {
      router.push("/fleet-shipper");
    } else if (emailBersih === "admin@praketrio.com") {
      router.push("/admin/dashboard");
    } else {
      router.push("/customer/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-[#0D0D14] flex items-center justify-center px-4">
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
              <h2 className="text-white font-bold text-2xl italic font-mono">
                Login here
              </h2>
              <input
                type="email"
                placeholder="Email Anda"
                required
                value={email} // Hubungkan ke state email
                onChange={(e) => setEmail(e.target.value)} // Tangkap ketikan user
                className="w-full bg-transparent border border-[#A855F7] text-white placeholder-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC]"
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full bg-transparent border border-[#A855F7] text-white placeholder-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC]"
              />
              <div className="flex items-center gap-2 w-full">
                <input type="checkbox" id="remember" className="accent-[#A855F7]" />
                <label htmlFor="remember" className="text-white/70 text-xs">
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-[#A855F7] hover:bg-[#7C3AED] text-white font-semibold rounded-full py-3 text-sm transition-colors duration-200"
              >
                Login
              </button>
              <Link
                href="/"
                className="text-white font-bold italic text-xs hover:text-[#C084FC] transition-colors duration-200"
              >
                Kembali Ke Beranda
              </Link>
            </form>
          ) : (
            /* Panel Hello Friends */
            <div className="w-full flex flex-col items-center gap-6 text-center">
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
              <h2 className="text-white font-bold text-2xl">Hello Friends</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                If you already have an account, login here and have fun
              </p>
              <button
                onClick={() => setIsLogin(true)}
                className="border border-white/60 hover:border-white text-white font-semibold rounded-full px-10 py-3 text-sm transition-colors duration-200"
              >
                Login
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
            /* Panel Start Your Journey */
            <div className="w-full flex flex-col items-center gap-6 text-center">
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
              <h2 className="text-white font-bold text-2xl">
                Start Your Journey Now
              </h2>
              <p className="text-white/70 text-sm leading-relaxed">
                If you dont have an account yet join us and start your journey
              </p>
              <button
                onClick={() => setIsLogin(false)}
                className="border border-white/60 hover:border-white text-white font-semibold rounded-full px-10 py-3 text-sm transition-colors duration-200"
              >
                Register
              </button>
            </div>
          ) : (
            /* Form Register */
            <div className="w-full flex flex-col items-center gap-4">
              <h2 className="text-white font-bold text-2xl italic font-mono">
                Register here
              </h2>
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full bg-transparent border border-[#A855F7] text-white placeholder-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC]"
              />
              <input
                type="email"
                placeholder="Masukkan Email"
                className="w-full bg-transparent border border-[#A855F7] text-white placeholder-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC]"
              />
              <input
                type="password"
                placeholder="Masukkan Password"
                className="w-full bg-transparent border border-[#A855F7] text-white placeholder-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC]"
              />
              <input
                type="password"
                placeholder="Ulangi Password"
                className="w-full bg-transparent border border-[#A855F7] text-white placeholder-white/60 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#C084FC]"
              />
              <button
                type="submit"
                className="w-full bg-[#A855F7] hover:bg-[#7C3AED] text-white font-semibold rounded-full py-3 text-sm transition-colors duration-200 mt-1"
              >
                Register
              </button>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}