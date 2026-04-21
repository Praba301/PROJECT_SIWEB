import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0b0c19] text-slate-200 font-sans overflow-hidden">
      
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        <header className="h-20 flex items-center justify-end px-10 border-b border-slate-800 bg-[#0d0e1f] shrink-0">
          <h2 className="text-white font-bold tracking-widest uppercase">Administrator</h2>
        </header>
        
        
        <main className="p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}