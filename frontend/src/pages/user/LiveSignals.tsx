import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  // TrendingDown,
  // TrendingUp,
  CircleDollarSign,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { socket } from "../../services/socket";

type Signal = {
  _id: string;
  pair: string;
  direction: "BUY" | "SELL";
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  timeframe: string;
  analysis?: string;
  status: "ACTIVE" | "HIT_TP" | "HIT_SL" | "CLOSED";
  createdAt: string;
};
const initialMarkets = [
  {
    symbol: "EUR/USD",
    price: 0,
  },
  {
    symbol: "GBP/USD",
    price: 0,
  },
  {
    symbol: "USD/JPY",
    price: 0,
  },
  {
    symbol: "XAU/USD",
    price: 0,
  },
];
const LiveSignals = () => {
  
const [markets, setMarkets] = useState(initialMarkets)
const [signals, setSignals] = useState<Signal[]>([]);
useEffect(() => {
  socket.connect();

  function onMarketUpdate(data: {
    symbol: string;
    price: number;
  }) {
    setMarkets((currentMarkets) =>
      currentMarkets.map((market) =>
        market.symbol === data.symbol
          ? {
              ...market,
              price: data.price,
            }
          : market
      )
    );
  }

  socket.on("market_update", onMarketUpdate);

  return () => {
    socket.off("market_update", onMarketUpdate);
  };
}, []);

useEffect(() => {
  const fetchSignals = async () => {
    try {
      const response = await api.get("/api/signal");

      setSignals(response.data.signals);
    } catch (error) {
      console.error("Failed to fetch signals:", error);
    }
  };

  fetchSignals();
}, []);


  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            PAGE HEADER
        ========================== */}
        <div className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {/* <div className="mb-2 flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />

                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  Market Live
                </span>
              </div> */}

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Live Signals
              </h1>
            </div>
          </div>
        </div>

        {/* =========================
            MARKET OVERVIEW
        ========================== */}
        <section className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Market Overview
              </h2>

              <p className="text-xs text-slate-500">
                Current prices across major markets
              </p>
            </div>

            <span className="hidden text-xs text-slate-400 sm:block">
              Live prices
            </span>
          </div>

       <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
  {markets.map((market) => (
    <div
      key={market.symbol}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <span className="text-xs font-semibold text-slate-500">
        {market.symbol}
      </span>

      <p className="mt-3 text-lg font-bold tracking-tight text-slate-900">
        {market.price}
      </p>

      <p className="mt-1 text-xs text-emerald-600">
        Live
      </p>
    </div>
  ))}
</div>
        </section>

        {/* =========================
            SIGNALS + SIDEBAR
        ========================== */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

          {/* =========================
              SIGNALS
          ========================== */}
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
                    {new Date(signal.createdAt).toLocaleString()}
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

          {/* =========================
              MARKET SIDEBAR
          ========================== */}
          <aside className="space-y-4">

            {/* Market Sentiment */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <ChartIcon />
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

            {/* Market News */}
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

        {/* =========================
            DISCLAIMER
        ========================== */}
        <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">
          <div className="flex gap-3">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-amber-600"
            />

            <p className="text-xs leading-5 text-amber-800">
              Trading signals are provided for informational purposes only.
              Market conditions can change rapidly. Always verify the current
              price and signal timestamp before taking any position.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Small inline icon so we don't need another dependency */
const ChartIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 17 9 11 13 15 21 7" />
  </svg>
);

export default LiveSignals;
