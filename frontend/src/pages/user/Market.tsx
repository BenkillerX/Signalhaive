import { useEffect, useState } from "react";

import { socket } from "../../services/socket";
import MarketSkeleton from "./MarketSkeleton";
type Market = {
  symbol: string;
  price: number;
  timestamp: number;
};

const Market = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [markets, setMarkets] = useState<Market[]>([]);
useEffect(() => {
  console.log("Hello World");

  socket.connect();

  function onMarketUpdate(data: Market) {
    console.log("Market received:", data);

    setMarkets((prevMarkets) => {
      const existingMarket = prevMarkets.find(
        (market) => market.symbol === data.symbol
      );

      if (existingMarket) {
        return prevMarkets.map((market) =>
          market.symbol === data.symbol ? data : market
        );
      }

      return [...prevMarkets, data];
    });
  }

  function onConnect() {
    console.log("Socket.IO connected:", socket.id);
    setIsConnected(true);
  }

  function onDisconnect() {
    console.log("Socket.IO disconnected");
    setIsConnected(false);
  }

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.on("market_update", onMarketUpdate);

  return () => {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.off("market_update", onMarketUpdate);
  };
}, []);
  return (
<section className="w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-7xl space-y-8">

    {/* =========================
        HEADER
    ========================== */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Markets
        </h1>

        <p className="mt-1.5 text-sm text-slate-500">
          Monitor live forex markets and price movements.
        </p>
      </div>

      <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
        <span
          className={`h-2 w-2 rounded-full ${
            isConnected ? "bg-emerald-500" : "bg-red-500"
          }`}
        />

        <span className="text-sm font-medium text-slate-600">
          {isConnected ? "Live Market Data" : "Disconnected"}
        </span>
      </div>
    </div>


    {/* =========================
        SEARCH + FILTERS
    ========================== */}
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row">

        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search markets..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
          />
        </div>

        <button className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
          Forex
        </button>

        <button className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
          ⭐ Watchlist
        </button>

      </div>
    </div>


    {/* =========================
        MARKET OVERVIEW
    ========================== */}
    <section>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Market Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Live prices from the market.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Table header */}
        <div className="hidden grid-cols-4 border-b border-slate-200 bg-slate-50 px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid">
          <span>Market</span>
          <span>Price</span>
          <span>Updated</span>
          <span className="text-right">Status</span>
        </div>

        {/* Market rows */}
        <div>
  {markets.length === 0 ? (
    <MarketSkeleton />
  ) : (
    markets.map((market) => (
      <button
        key={market.symbol}
        className="grid w-full grid-cols-2 items-center gap-5 border-b border-slate-100 px-5 py-5 text-left transition-colors last:border-b-0 hover:bg-slate-50 sm:grid-cols-4 sm:px-6"
      >
        {/* Market */}
        <div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-lg text-slate-400 transition hover:text-slate-700"
            >
              ☆
            </button>

            <div>
              <p className="font-semibold text-slate-900">
                {market.symbol}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Forex market
              </p>
            </div>
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="font-mono text-sm font-semibold text-slate-900">
            {market.price}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Live price
          </p>
        </div>

        {/* Updated */}
        <div className="hidden sm:block">
          <p className="text-sm text-slate-600">
            {new Date(
              market.timestamp * 1000
            ).toLocaleTimeString()}
          </p>
        </div>

        {/* Status */}
        <div className="flex justify-end">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            Live
          </span>
        </div>
      </button>
    ))
  )}
</div>

      </div>
    </section>


    {/* =========================
        SELECTED MARKET
    ========================== */}
    {markets.length > 0 && (
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">
            Market Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Detailed information for the selected market.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* =========================
              CHART
          ========================== */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Chart Header */}
            <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Selected Market
                </p>

                <div className="mt-2 flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {markets[0].symbol}
                  </h3>

                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    Live
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="font-mono text-xl font-semibold text-slate-900">
                  {markets[0].price}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Real-time price
                </p>
              </div>

            </div>


            {/* Chart */}
            <div className="flex h-100 items-center justify-center bg-slate-50">
              <div className="text-center">

                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
                  {/* Chart icon */}
                </div>

                <h4 className="font-medium text-slate-900">
                  Market Chart
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Candlestick chart coming soon.
                </p>

              </div>
            </div>


            {/* Timeframes */}
            <div className="flex flex-wrap gap-2 border-t border-slate-200 px-6 py-4">

              {["1m", "5m", "15m", "1H", "4H", "1D"].map(
                (timeframe) => (
                  <button
                    key={timeframe}
                    className="rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    {timeframe}
                  </button>
                )
              )}

            </div>

          </div>


          {/* =========================
              SIDEBAR
          ========================== */}
          <aside className="space-y-6">

            {/* Statistics */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div>
                <h3 className="font-semibold text-slate-900">
                  Market Statistics
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Current market information.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">

                <div>
                  <p className="text-xs text-slate-500">
                    Current Price
                  </p>

                  <p className="mt-1.5 font-mono text-sm font-semibold text-slate-900">
                    {markets[0].price}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Status
                  </p>

                  <p className="mt-1.5 text-sm font-semibold text-emerald-600">
                    Live
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    High
                  </p>

                  <p className="mt-1.5 text-sm text-slate-400">
                    Coming soon
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Low
                  </p>

                  <p className="mt-1.5 text-sm text-slate-400">
                    Coming soon
                  </p>
                </div>

              </div>

            </div>


            {/* Latest Signal */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between gap-3">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Latest Signal
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Signal for {markets[0].symbol}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  Coming soon
                </span>

              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-5">
                <p className="text-sm leading-6 text-slate-500">
                  No signal available for this market yet.
                </p>
              </div>

            </div>

          </aside>

        </div>
      </section>
    )}

  </div>
</section>

);
};

export default Market;
