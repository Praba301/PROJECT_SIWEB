"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { loginAction, registerAction } from "./action";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", isError: false });

  // State Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);

  // State Register
  const [regNama, setRegNama] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirmPass, setRegConfirmPass] = useState("");
  const [registerErrors, setRegisterErrors] = useState({ nama: "", email: "", pass: "", confirmPass: "" });
  const [registerLoading, setRegisterLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("praketrio_email");
    const savedRemember = localStorage.getItem("praketrio_remember");
    if (savedRemember === "true" && savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const showToast = (message: string, isError = false) => {
    setToast({ show: true, message, isError });
    setTimeout(() => setToast({ show: false, message: "", isError: false }), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    let errors = { email: "", password: "" };
    let hasError = false;

    if (!email) { errors.email = "Email tidak boleh kosong."; hasError = true; }
    if (!password) { errors.password = "Kata sandi tidak boleh kosong."; hasError = true; }

    setLoginErrors(errors);
    if (hasError) return;

    if (rememberMe) {
      localStorage.setItem("praketrio_email", email);
      localStorage.setItem("praketrio_remember", "true");
    } else {
      localStorage.removeItem("praketrio_email");
      localStorage.removeItem("praketrio_remember");
    }

    setLoginLoading(true);

    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);

    // PENAMBAHAN: Dibungkus try-catch agar jika server action putus koneksi, web tidak error
    try {
      const result = await loginAction(formData);

      if (result?.error) {
        showToast(result.error, true);
      }
    } catch (error) {
      console.error("Gagal memanggil fungsi server:", error);
      showToast("Koneksi ke database terputus. Pastikan file .env sudah benar.", true);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    let errors = { nama: "", email: "", pass: "", confirmPass: "" };
    let hasError = false;

    if (!regNama) { errors.nama = "Nama lengkap tidak boleh kosong."; hasError = true; }
    if (!regEmail) { errors.email = "Email tidak boleh kosong."; hasError = true; }
    if (!regPass) { errors.pass = "Kata sandi tidak boleh kosong."; hasError = true; }
    if (!regConfirmPass) {
      errors.confirmPass = "Konfirmasi kata sandi tidak boleh kosong.";
      hasError = true;
    } else if (regPass !== regConfirmPass) {
      errors.confirmPass = "Kata sandi konfirmasi tidak cocok!";
      hasError = true;
    }

    setRegisterErrors(errors);
    if (hasError) return;

    setRegisterLoading(true);

    const formData = new FormData();
    formData.set("nama", regNama);
    formData.set("email", regEmail);
    formData.set("password", regPass);

    // PENAMBAHAN: Dibungkus try-catch agar jika server action putus koneksi, web tidak error
    try {
      const result = await registerAction(formData);

      if (result?.error) {
        showToast(result.error, true);
      } else {
        showToast(`Registrasi berhasil! Halo ${regNama}, silakan masuk.`);
        setRegNama(""); setRegEmail(""); setRegPass(""); setRegConfirmPass("");
        setTimeout(() => setIsLogin(true), 3000);
      }
    } catch (error) {
      console.error("Gagal memanggil fungsi server:", error);
      showToast("Gagal menyimpan data. Pastikan Vercel berhasil membaca .env.", true);
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070712] flex items-center justify-center relative overflow-hidden px-4 select-none">
      <style jsx global>{`
        @keyframes calmFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(0.5deg); }
        }
        .animate-calm-float { animation: calmFloat 6s ease-in-out infinite; }
      `}</style>

      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse duration-700 pointer-events-none" />

      <div className="w-full max-w-6xl min-h-[85vh] bg-[#0d0d21]/60 backdrop-blur-3xl rounded-[35px] border-2 border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.25),inset_0_0_30px_rgba(59,130,246,0.1)] hover:border-purple-400 hover:shadow-[0_0_70px_rgba(168,85,247,0.45),inset_0_0_40px_rgba(59,130,246,0.15)] flex flex-col md:flex-row overflow-hidden relative z-10 transition-all duration-500 group/container">

        {/* LOGIN FORM */}
        <div className={`w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center items-center transition-all duration-700 ${isLogin ? "translate-x-0" : "md:translate-x-full md:opacity-0 pointer-events-none"}`}>
          {isLogin && (
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="text-center space-y-2">
                <h2 className="text-white text-3xl font-black tracking-[0.2em] uppercase hover:text-purple-400 hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] cursor-default transition-all duration-300" style={{ fontFamily: "var(--font-orbitron)" }}>
                  Masuk Di Sini
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              </div>

              <form onSubmit={handleLogin} className="space-y-6" noValidate>
                <div className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Email Anda"
                      className={`w-full bg-[#151530]/80 border ${loginErrors.email ? "border-red-500" : "border-white/10"} rounded-full px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-400 focus:bg-[#1a1a3a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-300 text-sm`}
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (loginErrors.email) setLoginErrors({ ...loginErrors, email: "" }); }}
                    />
                    {loginErrors.email && <p className="text-red-400 text-xs mt-2 ml-4">{loginErrors.email}</p>}
                  </div>

                  <div>
                    <input
                      type="password"
                      placeholder="Kata Sandi"
                      className={`w-full bg-[#151530]/80 border ${loginErrors.password ? "border-red-500" : "border-white/10"} rounded-full px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-400 focus:bg-[#1a1a3a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-300 text-sm`}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); if (loginErrors.password) setLoginErrors({ ...loginErrors, password: "" }); }}
                    />
                    {loginErrors.password && <p className="text-red-400 text-xs mt-2 ml-4">{loginErrors.password}</p>}
                  </div>
                </div>

                <div className="flex items-center px-2">
                  <label className="flex items-center gap-3 text-white/50 text-sm cursor-pointer hover:text-white transition-colors group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-purple-500 cursor-pointer rounded border-white/10"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">Ingat Saya</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold py-4 rounded-full shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:-translate-y-1 active:scale-95 transition-all duration-300 uppercase tracking-widest text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  {loginLoading ? "Memproses..." : "Masuk"}
                </button>
              </form>

              <div className="text-center">
                <Link href="/" className="text-white/30 hover:text-purple-400 text-sm transition-colors duration-300 hover:underline underline-offset-4">
                  ← Kembali Ke Beranda
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* CENTER PANEL */}
        <div className={`absolute inset-0 w-full md:w-1/2 h-full bg-gradient-to-b from-[#11112b] to-[#0a0a1c] border-purple-500/20 flex flex-col justify-center items-center p-12 text-center transition-all duration-700 ease-in-out z-20 shadow-[0_0_40px_rgba(0,0,0,0.5)] ${isLogin ? "md:left-1/2 md:border-l" : "md:left-0 md:border-r"}`}>
          <div className="space-y-8 animate-in zoom-in duration-1000 group/info">
            <div className="relative w-52 h-52 md:w-64 md:h-64 mx-auto animate-calm-float hover:scale-105 duration-300 transition-transform group-hover/info:drop-shadow-[0_0_45px_rgba(168,85,247,0.5)]">
              <Image src="/logo.png" alt="Praketrio Logo" fill className="object-contain drop-shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300" />
            </div>

            <div className="space-y-4">
              <p className="text-purple-400 font-extrabold tracking-[0.4em] uppercase text-xs" style={{ fontFamily: "var(--font-orbitron)" }}>Praketrio</p>
              <h2 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-purple-400 cursor-default">
                {isLogin ? "Mulailah Perjalananmu Sekarang" : "Halo Teman!"}
              </h2>
              <p className="text-white/60 max-w-sm mx-auto leading-relaxed text-sm">
                {isLogin ? "Jika Anda belum memiliki akun, mari bergabung dengan kami dan mulai pengirimanmu." : "Jika Anda sudah memiliki akun, silakan masuk ke sini dan selamat bergabung kembali."}
              </p>
            </div>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="px-12 py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/5 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 uppercase tracking-widest text-sm"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              {isLogin ? "Daftar" : "Masuk"}
            </button>
          </div>
        </div>

        {/* REGISTER FORM */}
        <div className={`w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center items-center transition-all duration-700 ${!isLogin ? "translate-x-0" : "md:-translate-x-full md:opacity-0 pointer-events-none"}`}>
          {!isLogin && (
            <div className="w-full max-w-md space-y-6 animate-in fade-in slide-in-from-right duration-700">
              <div className="text-center space-y-2">
                <h2 className="text-white text-3xl font-black tracking-[0.2em] uppercase hover:text-purple-400 hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] cursor-default transition-all duration-300" style={{ fontFamily: "var(--font-orbitron)" }}>
                  Daftar Akun
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              </div>

              <form onSubmit={handleRegister} className="space-y-4" noValidate>
                <div>
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className={`w-full bg-[#151530]/80 border ${registerErrors.nama ? "border-red-500" : "border-white/10"} rounded-full px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-400 focus:bg-[#1a1a3a] transition-all duration-300 text-sm`}
                    value={regNama}
                    onChange={(e) => { setRegNama(e.target.value); if (registerErrors.nama) setRegisterErrors({ ...registerErrors, nama: "" }); }}
                  />
                  {registerErrors.nama && <p className="text-red-400 text-xs mt-2 ml-4">{registerErrors.nama}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email Baru"
                    className={`w-full bg-[#151530]/80 border ${registerErrors.email ? "border-red-500" : "border-white/10"} rounded-full px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-400 focus:bg-[#1a1a3a] transition-all duration-300 text-sm`}
                    value={regEmail}
                    onChange={(e) => { setRegEmail(e.target.value); if (registerErrors.email) setRegisterErrors({ ...registerErrors, email: "" }); }}
                  />
                  {registerErrors.email && <p className="text-red-400 text-xs mt-2 ml-4">{registerErrors.email}</p>}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Kata Sandi"
                    className={`w-full bg-[#151530]/80 border ${registerErrors.pass ? "border-red-500" : "border-white/10"} rounded-full px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-400 focus:bg-[#1a1a3a] transition-all duration-300 text-sm`}
                    value={regPass}
                    onChange={(e) => { setRegPass(e.target.value); if (registerErrors.pass) setRegisterErrors({ ...registerErrors, pass: "" }); }}
                  />
                  {registerErrors.pass && <p className="text-red-400 text-xs mt-2 ml-4">{registerErrors.pass}</p>}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Konfirmasi Kata Sandi"
                    className={`w-full bg-[#151530]/80 border ${registerErrors.confirmPass ? "border-red-500" : "border-white/10"} rounded-full px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-400 focus:bg-[#1a1a3a] transition-all duration-300 text-sm`}
                    value={regConfirmPass}
                    onChange={(e) => { setRegConfirmPass(e.target.value); if (registerErrors.confirmPass) setRegisterErrors({ ...registerErrors, confirmPass: "" }); }}
                  />
                  {registerErrors.confirmPass && <p className="text-red-400 text-xs mt-2 ml-4">{registerErrors.confirmPass}</p>}
                </div>

                <button
                  type="submit"
                  disabled={registerLoading}
                  className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold py-4 rounded-full shadow-[0_4px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all duration-300 uppercase tracking-widest text-sm mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  {registerLoading ? "Mendaftarkan..." : "Daftar Sekarang"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* TOAST */}
      {toast.show && (
        <div className={`fixed bottom-10 right-10 backdrop-blur-md text-white border px-8 py-4 rounded-2xl animate-in fade-in slide-in-from-bottom duration-500 flex items-center gap-3 font-bold z-[100] text-sm shadow-lg ${toast.isError ? "bg-red-900/90 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.4)]" : "bg-[#12122c]/90 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)]"}`}>
          <svg className={`w-5 h-5 animate-pulse ${toast.isError ? "text-red-400" : "text-purple-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={toast.isError ? "M6 18L18 6M6 6l12 12" : "M5 13l4 4L19 7"} />
          </svg>
          {toast.message}
        </div>
      )}
    </main>
  );
}