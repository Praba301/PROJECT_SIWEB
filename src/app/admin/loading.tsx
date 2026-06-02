export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#0A0A12] p-8 space-y-8 animate-pulse w-full">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center border-b border-[#1E1E2E] pb-6 mb-8">
        <div className="h-10 w-64 bg-[#1A1A24] rounded-xl border border-[#1E1E2E]" />
        <div className="h-10 w-32 bg-[#1A1A24] rounded-xl border border-[#1E1E2E]" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-[#13131F] rounded-2xl border border-[#1E1E2E] p-6 flex flex-col justify-between">
            <div className="h-4 w-24 bg-[#1A1A24] rounded" />
            <div className="h-8 w-16 bg-[#1A1A24] rounded mt-4" />
          </div>
        ))}
      </div>

      {/* Table/Content Skeleton */}
      <div className="w-full h-[50vh] bg-[#13131F] rounded-2xl border border-[#1E1E2E] p-8">
        <div className="h-6 w-48 bg-[#1A1A24] rounded mb-8" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 w-full bg-[#1A1A24] rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}