import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute -right-40 top-0 h-125 w-125 rounded-full bg-slate-700/20 blur-[140px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-100 w-100 rounded-full bg-slate-800/30 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* LEFT */}
        <div>
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-slate-300 shadow-[0_0_12px_rgba(203,213,225,0.7)]" />

            <p className="text-xs font-semibold tracking-[0.22em] text-slate-400 sm:text-sm">
              REAL-TIME MARKET INTELLIGENCE
            </p>
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            WE HUNT.
            <br />

            <span className="text-slate-400">
              YOU PROFIT.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Professional trading signals. Real-time alerts. Clearly defined
            levels. Stay informed when market opportunities emerge with
            precise entry levels, take-profit targets, stop-loss levels, and
            real-time trade updates.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="rounded-xl bg-white px-7 py-3.5 text-center text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Get Started
              <span className="ml-2">→</span>
            </Link>

            <Link
              to="/how-it-works"
              className="rounded-xl border border-slate-700 bg-slate-900/60 px-7 py-3.5 text-center text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
            >
              View How It Works
            </Link>
          </div>

          {/* Feature points */}
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-slate-800 pt-7">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-300">
                ✓
              </span>

              <span className="text-sm text-slate-300">
                Real-Time Alerts
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-300">
                ✓
              </span>

              <span className="text-sm text-slate-300">
                Transparent Performance
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-300">
                ✓
              </span>

              <span className="text-sm text-slate-300">
                Defined Entry & Exit Levels
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-300">
                ✓
              </span>

              <span className="text-sm text-slate-300">
                Risk-Aware Approach
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — MARKET VISUAL */}
        <div className="relative mx-auto w-full max-w-xl">
          {/* Glow */}
          <div className="absolute -inset-8 rounded-[3rem] bg-slate-600/10 blur-3xl" />

          {/* Main trading card */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl">
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  LIVE MARKET
                </p>

                <h3 className="mt-1 text-lg font-semibold text-white">
                  EUR/USD
                </h3>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />

                <span className="text-xs font-medium text-slate-300">
                  LIVE
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold tracking-tight text-white">
                  1.17482
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  +0.42%
                </p>
              </div>

              <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                5 MIN
              </span>
            </div>

            {/* Chart */}
            <div className="relative mt-8 h-48 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              {/* Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-size-[40px_40px]" />

              <svg
                viewBox="0 0 500 180"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#94a3b8"
                      stopOpacity="0.18"
                    />

                    <stop
                      offset="100%"
                      stopColor="#94a3b8"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="M0 145 C40 130 50 140 80 115 S120 125 145 100 S190 110 220 80 S260 95 290 65 S330 90 355 55 S400 65 430 35 S470 45 500 20 V180 H0 Z"
                  fill="url(#chartGradient)"
                />

                <path
                  d="M0 145 C40 130 50 140 80 115 S120 125 145 100 S190 110 220 80 S260 95 290 65 S330 90 355 55 S400 65 430 35 S470 45 500 20"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="3"
                />
              </svg>

              {/* Current price */}
              <div className="absolute right-4 top-4 rounded-md bg-slate-200 px-2 py-1 text-[10px] font-bold text-slate-900">
                1.17482
              </div>
            </div>

            {/* Signal */}
            <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-800/50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500">
                    CURRENT SIGNAL
                  </p>

                  <p className="mt-1 text-lg font-semibold text-white">
                    BUY EUR/USD
                  </p>
                </div>

                <span className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300">
                  HIGH CONFIDENCE
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[10px] text-slate-500">
                    ENTRY
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-200">
                    1.17420
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">
                    TAKE PROFIT
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-200">
                    1.17850
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">
                    STOP LOSS
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-200">
                    1.17180
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;