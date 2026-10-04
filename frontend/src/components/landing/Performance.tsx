import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const Performance = () => {
  const performance = [
    {
      label: "Signal Success",
      value: "79.4%",
      change: "+4.8%",
      positive: true,
    },
    {
      label: "Signals Tracked",
      value: "1,284",
      change: "+126",
      positive: true,
    },
    {
      label: "Avg. Risk / Reward",
      value: "1 : 2.4",
      change: "+0.3",
      positive: true,
    },
    {
      label: "Markets Covered",
      value: "12",
      change: "Active",
      positive: true,
    },
  ];

  const chartData = [
    42, 48, 45, 53, 51, 58, 55, 63, 61, 68, 66, 72, 70, 77, 74, 81, 79, 86,
    84, 91,
  ];

  const points = chartData
    .map((value, index) => {
      const x = (index / (chartData.length - 1)) * 100;
      const y = 100 - ((value - 40) / 55) * 100;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section
      id="performance"
      className="bg-slate-50 px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl">

          <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
            Performance you can track.
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
            Follow historical signal outcomes, risk-to-reward metrics and
            market activity in one clear view.
          </p>
        </div>

        {/* Main performance panel */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.6fr_1fr]">
            {/* Chart */}
            <div className="border-b border-slate-200 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <TrendingUp size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Signal performance
                      </p>
                      <p className="text-xs text-slate-400">
                        Historical performance
                      </p>
                    </div>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight size={13} />
                  +18.6%
                </span>
              </div>

              {/* Chart */}
              <div className="relative mt-10 h-64">
                {/* Horizontal grid */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[1, 2, 3, 4, 5].map((line) => (
                    <div
                      key={line}
                      className="border-t border-dashed border-slate-100"
                    />
                  ))}
                </div>

                {/* Chart SVG */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="performanceGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="currentColor"
                        stopOpacity="0.16"
                      />
                      <stop
                        offset="100%"
                        stopColor="currentColor"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <polygon
                    points={`0,100 ${points} 100,100`}
                    fill="url(#performanceGradient)"
                    className="text-emerald-500"
                  />

                  <polyline
                    points={points}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    className="text-emerald-500"
                  />
                </svg>

                {/* Y labels */}
                <div className="absolute -left-1 top-0 -translate-x-full text-[10px] text-slate-400">
                  90%
                </div>
                <div className="absolute -left-1 top-1/4 -translate-x-full text-[10px] text-slate-400">
                  75%
                </div>
                <div className="absolute -left-1 top-1/2 -translate-x-full text-[10px] text-slate-400">
                  60%
                </div>
                <div className="absolute -left-1 top-3/4 -translate-x-full text-[10px] text-slate-400">
                  45%
                </div>
              </div>

              {/* X labels */}
              <div className="mt-4 flex justify-between pl-2 text-[10px] text-slate-400">
                <span>JAN</span>
                <span>MAR</span>
                <span>MAY</span>
                <span>JUL</span>
                <span>SEP</span>
              </div>

              <div className="mt-8 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-400">
                <Activity size={14} />
                <span>
                  Illustrative historical performance visualization
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={18}
                  className="text-emerald-500"
                />

                <p className="text-sm font-semibold text-slate-900">
                  Performance overview
                </p>
              </div>

              <div className="mt-8 divide-y divide-slate-100">
                {performance.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-5 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm text-slate-500">
                        {item.label}
                      </p>

                      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                        {item.value}
                      </p>
                    </div>

                    <span
                      className={`flex items-center gap-1 text-xs font-semibold ${
                        item.positive
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.positive ? (
                        <ArrowUpRight size={13} />
                      ) : (
                        <ArrowDownRight size={13} />
                      )}

                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom cards */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Winning signals
            </p>

            <div className="mt-3 flex items-end justify-between">
              <p className="text-3xl font-bold tracking-tight text-slate-950">
                1,019
              </p>

              <span className="mb-1 text-xs font-semibold text-emerald-600">
                79.4%
              </span>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[79.4%] rounded-full bg-emerald-500" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Risk / reward
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              1 : 2.4
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Average target relative to defined risk.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Market activity
            </p>

            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              24/7
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Continuous market monitoring infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Performance;