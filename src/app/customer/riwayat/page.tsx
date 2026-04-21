import CustomerSidebar from "@/components/layout/CustomerSidebar";

const riwayat = [
  {
    noResi: "SWB-20240001",
    rute: "Surabaya → Makassar",
    tanggal: "18 Apr 2026",
    status: "Dalam perjalanan",
  },
  {
    noResi: "SWB-20240001",
    rute: "Jakarta → Balikpapan",
    tanggal: "18 Apr 2026",
    status: "Dimuat ke kapal",
  },
  {
    noResi: "SWB-20240001",
    rute: "Makassar → Sorong",
    tanggal: "10 Apr 2026",
    status: "Terkirim",
  },
  {
    noResi: "SWB-20240001",
    rute: "Surabaya → Kupang",
    tanggal: "11 Apr 2026",
    status: "Terkirim",
  },
  {
    noResi: "SWB-20240001",
    rute: "Surabaya → Makassar",
    tanggal: "13 Apr 2026",
    status: "Terkirim",
  },
];

const statusColor = (status: string) => {
  if (status === "Terkirim") return "text-[#22C55E]";
  if (status === "Dalam perjalanan") return "text-[#A855F7]";
  if (status === "Dimuat ke kapal") return "text-[#F97316]";
  return "text-white";
};

export default function RiwayatPage() {
  return (
    <div className="flex min-h-screen bg-[#0D0D2B]">
      <CustomerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <header className="flex items-center justify-between px-10 py-5 border-b border-[#2D1B69]">
          <span className="text-white font-bold text-lg">Praketrio</span>
          <span className="text-white font-semibold text-sm">Halo, Praba</span>
        </header>

        {/* Content */}
        <main className="flex-1 px-10 py-8">
          <h1 className="text-white font-bold text-2xl text-center mb-8 font-mono">
            Riwayat
          </h1>

          {/* Table */}
          <div className="bg-[#13133A] border border-[#2D1B69] rounded-xl overflow-hidden max-w-4xl mx-auto">

            {/* Table Header */}
            <div className="grid grid-cols-4 px-6 py-4 border-b border-[#2D1B69]">
              <p className="text-white font-semibold text-sm">No Resi</p>
              <p className="text-white font-semibold text-sm">Rute</p>
              <p className="text-white font-semibold text-sm">Tanggal</p>
              <p className="text-white font-semibold text-sm">Status</p>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col divide-y divide-[#2D1B69]">
              {riwayat.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 px-6 py-4 hover:bg-[#A855F7]/5 transition-colors duration-200"
                >
                  <p className="text-white text-sm font-mono">{item.noResi}</p>
                  <p className="text-white text-sm">{item.rute}</p>
                  <p className="text-white text-sm">{item.tanggal}</p>
                  <p className={`text-sm font-semibold ${statusColor(item.status)}`}>
                    {item.status}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}