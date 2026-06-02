export default function CustomerLoading() {
  return (
    <div className="min-h-screen bg-[#0A0A12] p-10 flex flex-col items-center animate-pulse">
      {/* Title Skeleton */}
      <div className="h-10 w-64 bg-[#1A1A24] rounded-xl mb-4 border border-[#1E1E2E]" />
      <div className="h-4 w-96 bg-[#13131F] rounded-lg mb-12" />

      {/* Form/Card Skeleton */}
      <div className="w-full max-w-4xl bg-[#13131F] rounded-2xl border border-[#1E1E2E] p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 w-32 bg-[#1A1A24] rounded" />
              <div className="h-14 w-full bg-[#1A1A24] rounded-xl border border-[#1E1E2E]" />
            </div>
          ))}
        </div>
        
        {/* Textarea Skeleton */}
        <div className="space-y-3 mb-8">
          <div className="h-4 w-40 bg-[#1A1A24] rounded" />
          <div className="h-32 w-full bg-[#1A1A24] rounded-xl border border-[#1E1E2E]" />
        </div>

        {/* Button Skeleton */}
        <div className="h-14 w-full bg-[#1A1A24] rounded-xl border border-[#1E1E2E]" />
      </div>
    </div>
  );
}