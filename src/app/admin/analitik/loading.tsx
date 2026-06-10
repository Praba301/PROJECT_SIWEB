export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse w-full max-w-7xl mx-auto p-2">
      {/* Skeleton Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-64 bg-[#1E1E2E] rounded-lg mb-3"></div>
          <div className="h-4 w-96 bg-[#1A1A24] rounded-md"></div>
        </div>
        <div className="h-10 w-40 bg-[#1E1E2E] rounded-xl"></div>
      </div>

      {/* Skeleton Top Stats (3 Kotak) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[#13131F] border border-[#1E1E2E] p-6 rounded-2xl h-36 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="h-4 w-32 bg-[#1E1E2E] rounded"></div>
              <div className="h-8 w-8 bg-[#1A1A24] rounded-lg"></div>
            </div>
            <div className="h-8 w-48 bg-[#1E1E2E] rounded-lg"></div>
            <div className="h-3 w-24 bg-[#1A1A24] rounded"></div>
          </div>
        ))}
      </div>

      {/* Skeleton Chart */}
      <div className="bg-[#13131F] border border-[#1E1E2E] p-8 rounded-2xl h-[450px] flex flex-col">
        <div className="flex justify-between border-b border-[#1E1E2E] pb-4 mb-6">
            <div>
                <div className="h-6 w-56 bg-[#1E1E2E] rounded mb-2"></div>
                <div className="h-3 w-40 bg-[#1A1A24] rounded"></div>
            </div>
            <div className="h-6 w-24 bg-[#1E1E2E] rou
            nded-full"></div>
        </div>
        <div className="flex-1 flex items-end justify-around pl-14">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-1/6 bg-[#1E1E2E] rounded-t-lg mx-2" style={{ height: `${Math.max(20, Math.random() * 80)}%` }}></div>
            ))}
        </div>
      </div>
    </div>
  );
}