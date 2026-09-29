import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  Clock3,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface Signal {
  _id: string;
  pair: string;
  direction: "BUY" | "SELL";
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  timeframe: string;
  createdAt: string;
}

const AddSignal = () => {
  const [formData, setFormData] = useState({
    pair: "",
    direction: "BUY",
    entryPrice: "",
    stopLoss: "",
    takeProfit: "",
    timeframe: "15m",
  });

  const [signals, setSignals] = useState<Signal[]>([]);
  const [signalsLoading, setSignalsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const response = await api.get("/api/signal");

        setSignals(response.data.signals);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load signals.");
      } finally {
        setSignalsLoading(false);
      }
    };

    fetchSignals();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("/api/signal", {
        pair: formData.pair,
        direction: formData.direction,
        entryPrice: Number(formData.entryPrice),
        stopLoss: Number(formData.stopLoss),
        takeProfit: Number(formData.takeProfit),
        timeframe: formData.timeframe,
      });

      setSignals((current) => [
        response.data.signal,
        ...current,
      ]);

      toast.success("Signal published successfully!");

      setFormData({
        pair: "",
        direction: "BUY",
        entryPrice: "",
        stopLoss: "",
        takeProfit: "",
        timeframe: "15m",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish signal.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSignal = async (id: string) => {
    setDeletingId(id);

    try {
      await api.delete(`/api/signal/${id}`);

      setSignals((current) =>
        current.filter((signal) => signal._id !== id)
      );

      toast.success("Signal deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete signal.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="min-h-screen bg-zinc-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-400">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Signal Management
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Trading Signals
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Publish and manage trading signals for SignalHive users.
          </p>
        </div>

        {/* Add Signal */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/3"
        >
          {/* Form Header */}
          <div className="border-b border-white/10 px-5 py-5 sm:px-7">
            <h2 className="text-base font-semibold text-white">
              Add Trading Signal
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the trade details below.
            </p>
          </div>

          {/* Form Body */}
          <div className="grid grid-cols-1 gap-5 p-5 sm:p-7 md:grid-cols-2">

            {/* Trading Pair */}
            <div className="md:col-span-2">
              <label
                htmlFor="pair"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Trading Pair
              </label>

              <input
                id="pair"
                name="pair"
                type="text"
                value={formData.pair}
                onChange={handleChange}
                placeholder="EUR/USD"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Direction */}
            <div>
              <label
                htmlFor="direction"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Direction
              </label>

              <select
                id="direction"
                name="direction"
                value={formData.direction}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              >
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>

            {/* Timeframe */}
            <div>
              <label
                htmlFor="timeframe"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Timeframe
              </label>

              <select
                id="timeframe"
                name="timeframe"
                value={formData.timeframe}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              >
                <option value="1m">1 Minute</option>
                <option value="5m">5 Minutes</option>
                <option value="15m">15 Minutes</option>
                <option value="30m">30 Minutes</option>
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
                <option value="1d">1 Day</option>
              </select>
            </div>

            {/* Entry Price */}
            <div>
              <label
                htmlFor="entryPrice"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Entry Price
              </label>

              <input
                id="entryPrice"
                name="entryPrice"
                type="number"
                step="any"
                value={formData.entryPrice}
                onChange={handleChange}
                placeholder="1.1745"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Stop Loss */}
            <div>
              <label
                htmlFor="stopLoss"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Stop Loss
              </label>

              <input
                id="stopLoss"
                name="stopLoss"
                type="number"
                step="any"
                value={formData.stopLoss}
                onChange={handleChange}
                placeholder="1.1725"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
              />
            </div>

            {/* Take Profit */}
            <div className="md:col-span-2">
              <label
                htmlFor="takeProfit"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Take Profit
              </label>

              <input
                id="takeProfit"
                name="takeProfit"
                type="number"
                step="any"
                value={formData.takeProfit}
                onChange={handleChange}
                placeholder="1.1790"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-4 border-t border-white/10 bg-white/2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-xs text-slate-500">
              Publishing this signal will notify subscribed users.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Signal"}
            </button>
          </div>
        </form>

        {/* Published Signals */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/3">

          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h2 className="text-base font-semibold text-white">
                Published Signals
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage signals currently available to users.
              </p>
            </div>

            <span className="w-fit rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-400">
              {signals.length}{" "}
              {signals.length === 1 ? "Signal" : "Signals"}
            </span>
          </div>

          {/* Loading */}
          {signalsLoading ? (
            <div className="px-5 py-12 text-center">
              <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-blue-500" />

              <p className="text-sm text-slate-500">
                Loading signals...
              </p>
            </div>
          ) : signals.length === 0 ? (
            /* Empty */
            <div className="px-5 py-12 text-center">
              <p className="text-sm text-slate-500">
                No signals have been published yet.
              </p>
            </div>
          ) : (
            /* Signals */
            <div className="divide-y divide-white/10">
              {signals.map((signal) => (
                <div
                  key={signal._id}
                  className="px-5 py-5 transition hover:bg-white/2 sm:px-7"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* Signal */}
                    <div className="min-w-0 flex-1">

                      {/* Pair + badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-white">
                          {signal.pair}
                        </h3>

                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            signal.direction === "BUY"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {signal.direction === "BUY" ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}

                          {signal.direction}
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-400">
                          <Clock3 className="h-3 w-3" />
                          {signal.timeframe}
                        </span>
                      </div>

                      {/* Prices */}
                      <div className="mt-4 grid max-w-xl grid-cols-3 gap-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-600">
                            Entry
                          </p>

                          <p className="mt-1 text-sm font-medium text-white">
                            {signal.entryPrice}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-600">
                            Stop Loss
                          </p>

                          <p className="mt-1 text-sm font-medium text-red-400">
                            {signal.stopLoss}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] uppercase tracking-wide text-slate-600">
                            Take Profit
                          </p>

                          <p className="mt-1 text-sm font-medium text-emerald-400">
                            {signal.takeProfit}
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 text-xs text-slate-600">
                        Published{" "}
                        {new Date(signal.createdAt).toLocaleString()}
                      </p>
                    </div>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteSignal(signal._id)
                      }
                      disabled={deletingId === signal._id}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />

                      {deletingId === signal._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddSignal;