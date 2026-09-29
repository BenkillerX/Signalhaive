import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { socket } from "../../services/socket";
import LatestSignals from "./LatestSignals";

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
  const [markets, setMarkets] = useState(initialMarkets);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.connect();

    const onMarketUpdate = (data: {
      symbol: string;
      price: number;
    }) => {
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
    };

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchSignals();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Live Signals
          </h1>
        </div>

        {/* Market Overview */}
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

        {/* Latest Signals */}
        <LatestSignals
          signals={signals}
          isLoading={isLoading}
        />

        {/* Disclaimer */}
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

export default LiveSignals;