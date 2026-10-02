const MarketSkeleton = () => {
  return (
    <div className="animate-pulse">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="grid w-full grid-cols-2 items-center gap-5 border-b border-slate-100 px-5 py-5 last:border-b-0 sm:grid-cols-4 sm:px-6"
        >
          {/* Market */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-slate-200" />

              <div>
                <div className="h-4 w-20 rounded bg-slate-200" />
                <div className="mt-2 h-3 w-24 rounded bg-slate-100" />
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="mt-2 h-3 w-16 rounded bg-slate-100" />
          </div>

          {/* Updated */}
          <div className="hidden sm:block">
            <div className="h-4 w-20 rounded bg-slate-200" />
          </div>

          {/* Status */}
          <div className="flex justify-end">
            <div className="h-6 w-14 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default MarketSkeleton;