import Sidebar from "@/components/admin/sidebar";
import type { Metadata } from "next";

// Menambahkan MetaData sesuai instruksi tugas
export const metadata: Metadata = {
  title: "Administrator | Praketrio",
  description: "Dashboard panel admin untuk manajemen pengiriman kargo laut Praketrio.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-[#0b0c19] text-slate-200 font-sans overflow-hidden">
      {/* Top Navbar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}