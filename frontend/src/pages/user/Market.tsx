import { useEffect, useState } from "react";

import { socket } from "../../services/socket";
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

<section className="w-full space-y-6">
  {/* Header */}
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-xl font-semibold text-gray-900">
        Markets
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Monitor live forex markets and price movements
      </p>
    </div>

    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2">
      <span
        className={`h-2 w-2 rounded-full ${
          isConnected ? "bg-green-500" : "bg-red-500"
        }`}
      />

      <span className="text-sm font-medium text-gray-600">
        {isConnected ? "Live Market Data" : "Disconnected"}
      </span>
    </div>
  </div>

  {/* Search + filters */}
  <div className="flex flex-col gap-3 sm:flex-row">
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="Search markets..."
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400"
      />
    </div>

    <button className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
      Forex
    </button>

    <button className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
      ⭐ Watchlist
    </button>
  </div>

  {/* Market overview */}
  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-200 px-6 py-4">
      <div>
        <h3 className="font-semibold text-gray-900">
          Market Overview
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Live prices from the market
        </p>
      </div>
    </div>

    {/* Table header */}
    <div className="hidden grid-cols-4 border-b border-gray-200 bg-gray-50 px-6 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 sm:grid">
      <span>Market</span>
      <span>Price</span>
      <span>Updated</span>
      <span className="text-right">Status</span>
    </div>

    {/* Market rows */}
    <div>
      {markets.map((market) => (
        <button
          key={market.symbol}
          className="grid w-full grid-cols-2 items-center gap-4 border-b border-gray-100 px-6 py-5 text-left transition-colors last:border-b-0 hover:bg-gray-50 sm:grid-cols-4"
        >
          {/* Market */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-lg text-gray-400">
                ☆
              </span>

              <div>
                <p className="font-semibold text-gray-900">
                  {market.symbol}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Forex market
                </p>
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="font-mono text-sm font-semibold text-gray-900">
              {market.price}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Live price
            </p>
          </div>

          {/* Updated */}
          <div className="hidden sm:block">
            <p className="text-sm text-gray-600">
              {new Date(
                market.timestamp * 1000
              ).toLocaleTimeString()}
            </p>
          </div>

          {/* Status */}
          <div className="flex justify-end">
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
              Live
            </span>
          </div>
        </button>
      ))}
    </div>
  </div>

  {/* Selected market */}
  {markets.length > 0 && (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      {/* Chart */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Selected Market
            </p>

            <div className="mt-1 flex items-center gap-3">
              <h3 className="text-xl font-semibold text-gray-900">
                {markets[0].symbol}
              </h3>

              <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                Live
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="font-mono text-xl font-semibold text-gray-900">
              {markets[0].price}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Real-time price
            </p>
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="flex h-100 items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
             
            </div>

            <h4 className="font-medium text-gray-900">
              Market Chart
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              Candlestick chart coming soon
            </p>
          </div>
        </div>

        {/* Timeframes */}
        <div className="flex gap-2 border-t border-gray-200 px-6 py-4">
          {["1m", "5m", "15m", "1H", "4H", "1D"].map(
            (timeframe) => (
              <button
                key={timeframe}
                className="rounded-lg px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                {timeframe}
              </button>
            )
          )}
        </div>
      </div>
      <div className="space-y-6">
        {/* Statistics */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">
            Market Statistics
          </h3>

          <div className="mt-5 grid grid-cols-2 gap-5">
            <div>
              <p className="text-xs text-gray-500">
                Current Price
              </p>

              <p className="mt-1 font-mono text-sm font-semibold text-gray-900">
                {markets[0].price}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Status
              </p>

              <p className="mt-1 text-sm font-semibold text-green-600">
                Live
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                High
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Coming soon
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Low
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Coming soon
              </p>
            </div>
          </div>
        </div>

        {/* Latest signal */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                Latest Signal
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Signal for {markets[0].symbol}
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
              Coming soon
            </span>
          </div>

          <div className="mt-5 rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              No signal available for this market yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )}
</section>

);
};

export default Market;
