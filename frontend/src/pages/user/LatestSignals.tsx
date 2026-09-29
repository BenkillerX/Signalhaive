import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  ChartBarIcon,
  CircleDollarSign,
  Clock3,
} from "lucide-react";
import LatestSignalsSkeleton from "./LatestSignalsSkeleton";

interface Signal {
  _id: string;
  pair: string;
  direction: "BUY" | "SELL";
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  timeframe: string;
  status: string;
  createdAt: string;
}

interface LatestSignalsProps {
  signals: Signal[];
  isLoading: boolean;
}

const LatestSignals = ({
  signals,
  isLoading,
}: LatestSignalsProps) => {
  if (isLoading) {
    return <LatestSignalsSkeleton />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">

      {/* Signals */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Latest Signals
            </h2>

            <p className="text-sm text-slate-500">
              Follow the latest setups posted by our analysts.
            </p>
          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            {signals.length} Active
          </span>
        </div>

        <div className="space-y-3">
          {signals.map((signal) => {
            const isBuy = signal.direction === "BUY";

            return (
              <div
                key={signal._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Signal Header */}
                <div className="flex flex-col gap-4 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">

                    {/* Pair */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          isBuy
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {isBuy ? (
                          <ArrowUpRight size={21} />
                        ) : (
                          <ArrowDownRight size={21} />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900">
                            {signal.pair}
                          </h3>

                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                              isBuy
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-red-50 text-red-500"
                            }`}
                          >
                            {signal.direction}
                          </span>
                        </div>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                          <Clock3 size={13} />

                          <span>
                            Uploaded{" "}
                            {new Date(
                              signal.createdAt
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {signal.status}
                    </span>
                  </div>

                  {/* Signal Details */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Entry
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {signal.entryPrice}
                      </p>
                    </div>

                    <div className="rounded-lg bg-red-50 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-red-400">
                        Stop Loss
                      </p>

                      <p className="mt-1 text-sm font-semibold text-red-600">
                        {signal.stopLoss}
                      </p>
                    </div>

                    <div className="rounded-lg bg-emerald-50 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-emerald-500">
                        Take Profit
                      </p>

                      <p className="mt-1 text-sm font-semibold text-emerald-600">
                        {signal.takeProfit}
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
                        {signal.timeframe}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-amber-600">
                      <AlertCircle size={13} />

                      <span>
                        Check price before entering
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sidebar */}
      <aside className="space-y-4">

        {/* Market Snapshot */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <ChartBarIcon size={18} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Market Snapshot
              </h3>

              <p className="text-xs text-slate-500">
                Today's market activity
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                USD Strength
              </span>

              <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                Strong
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                EUR/USD
              </span>

              <span className="text-sm font-semibold text-red-500">
                Bearish
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                GBP/USD
              </span>

              <span className="text-sm font-semibold text-red-500">
                Bearish
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                USD/JPY
              </span>

              <span className="text-sm font-semibold text-emerald-600">
                Bullish
              </span>
            </div>
          </div>
        </div>

        {/* Trading Reminder */}
        <div className="rounded-2xl bg-slate-900 p-5 text-white">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
            <CircleDollarSign size={19} />
          </div>

          <h3 className="font-semibold">
            Before you trade
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-300">
            Signals can become outdated quickly as market prices move.
            Always check the current market price and the upload time
            before opening a position.
          </p>
        </div>

        {/* Market Watch */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Market Watch
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              What is moving the market
            </p>
          </div>

          <div className="space-y-3">
            <div className="border-b border-slate-100 pb-3">
              <p className="text-xs font-medium leading-5 text-slate-700">
                USD remains supported as traders assess the latest
                Federal Reserve outlook.
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Market update
              </p>
            </div>

            <div className="border-b border-slate-100 pb-3">
              <p className="text-xs font-medium leading-5 text-slate-700">
                EUR/USD continues to trade under pressure amid dollar
                strength.
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Forex
              </p>
            </div>

            <div>
              <p className="text-xs font-medium leading-5 text-slate-700">
                Gold remains volatile as traders monitor USD strength
                and global risk factors.
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Commodities
              </p>
            </div>
          </div>
        </div>

      </aside>
    </div>
  );
};

export default LatestSignals;