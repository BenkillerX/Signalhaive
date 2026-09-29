const LatestSignalsSkeleton = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">

      {/* Signals */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />

                  <div>
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                    <div className="mt-2 h-3 w-32 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>

                <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200" />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {[1, 2, 3].map((price) => (
                  <div
                    key={price}
                    className="rounded-lg bg-slate-100 p-3"
                  >
                    <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
                    <div className="mt-2 h-4 w-16 animate-pulse rounded bg-slate-200" />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-36 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sidebar */}
      <aside className="space-y-4">

        {/* Market Snapshot */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-200" />

            <div>
              <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
              <div className="mt-2 h-3 w-28 animate-pulse rounded bg-slate-200" />
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between"
              >
                <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-16 animate-pulse rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Trading Reminder */}
        <div className="rounded-2xl bg-slate-200 p-5">
          <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-300" />

          <div className="mt-4 h-4 w-32 animate-pulse rounded bg-slate-300" />

          <div className="mt-3 space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-slate-300" />
            <div className="h-3 w-full animate-pulse rounded bg-slate-300" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-slate-300" />
          </div>
        </div>

        {/* Market Watch */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-3 w-36 animate-pulse rounded bg-slate-200" />

          <div className="mt-5 space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-3 w-20 animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>

      </aside>
    </div>
  );
};

export default LatestSignalsSkeleton;