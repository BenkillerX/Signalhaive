import {
  ArrowUpRight,
  Clock3,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const PublicSignal = () => {
  return (
    <section
      id="live-signals"
      className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">
            See the signal. Know the levels.
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-500 sm:text-lg">
            Get a clear view of every signal, including entry, stop loss,
            take profit and timeframe.
          </p>
        </div>

        {/* Signal Card */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 p-4 sm:p-5">
              {/* Signal Header */}
              <div className="flex items-start justify-between gap-3">
                {/* Pair */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ArrowUpRight size={21} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">
                        EUR/USD
                      </h3>

                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                        BUY
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock3 size={13} />
                      <span>Uploaded just now</span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  ACTIVE
                </span>
              </div>

              {/* Signal Details */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Entry
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    1.17340
                  </p>
                </div>

                <div className="rounded-lg bg-red-50 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-red-400">
                    Stop Loss
                  </p>

                  <p className="mt-1 text-sm font-semibold text-red-600">
                    1.17180
                  </p>
                </div>

                <div className="rounded-lg bg-emerald-50 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-emerald-500">
                    Take Profit
                  </p>

                  <p className="mt-1 text-sm font-semibold text-emerald-600">
                    1.17650
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    Timeframe:
                  </span>

                  <span className="text-xs font-semibold text-slate-700">
                    15m
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-amber-600">
                  <AlertCircle size={13} />
                  <span>Check price before entering</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-7 text-center">
            <Link
              to="/live-signals"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View Live Signals
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicSignal;