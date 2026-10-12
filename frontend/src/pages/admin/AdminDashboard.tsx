import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {

  const [users, setUsers] = useState<number>(0)
  const [activeSignals, setActiveSignals] = useState<number>(0)
  useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await api.get("/api/admin/stats");

      setUsers(response.data.users);
      setActiveSignals(response.data.activeSignals);
    } catch (error) {
      console.error("Failed to fetch admin stats:", error);
    }
  };

  fetchStats();
}, []);
  return (
   
<section className="min-h-screen bg-zinc-950 px-4 py-6 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-5xl space-y-8">

    {/* Header */}
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-400">
        <span className="h-2 w-2 rounded-full bg-blue-500" />
        Admin Overview
      </div>

      <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Dashboard
      </h1>

      <p className="mt-2 text-sm text-slate-400">
        Overview of your platform activity.
      </p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

      {/* Total Users */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.05] sm:p-6">
        <p className="text-sm font-medium text-slate-400">
          Total Users
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          {users}
        </h2>

        <p className="mt-2 text-xs text-slate-500">
          Registered users
        </p>
      </div>

      {/* Active Signals */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.05] sm:p-6">
        <p className="text-sm font-medium text-slate-400">
          Active Signals
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          {activeSignals}
        </h2>

        <p className="mt-2 text-xs text-slate-500">
          Currently active
        </p>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

      {/* Recent Signals */}
      <section className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-white">
              Recent Signals
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Latest trading signals
            </p>
          </div>

          <button
            type="button"
            className="w-fit rounded-lg px-3 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/10 hover:text-blue-300"
          >
            View all
          </button>
        </div>

        <div className="flex min-h-32 items-center justify-center px-5 py-8">
          <p className="text-center text-sm text-slate-500">
            No signals available yet.
          </p>
        </div>
      </section>

      {/* Recent Users */}
      <section className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-white">
              Recent Users
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Recently registered users
            </p>
          </div>

          <button
            type="button"
            className="w-fit rounded-lg px-3 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/10 hover:text-blue-300"
          >
            View all
          </button>
        </div>

        <div className="flex min-h-32 items-center justify-center px-5 py-8">
          <p className="text-center text-sm text-slate-500">
            No users available yet.
          </p>
        </div>
      </section>
    </div>

    {/* Market Overview */}
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

      {/* Section Header */}
      <div className="border-b border-white/10 px-5 py-5 sm:px-6">
        <h2 className="text-base font-semibold text-white">
          Market Overview
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Current market prices
        </p>
      </div>

      {/* Market Prices */}
      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6">

        {/* EUR/USD */}
        <div className="rounded-xl border border-white/10 bg-black/20 p-5 transition-colors hover:border-white/20">
          <p className="text-sm font-medium text-slate-400">
            EUR/USD
          </p>

          <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
            —
          </p>

          <span className="mt-2 inline-block text-xs text-slate-500">
            Live price
          </span>
        </div>

        {/* XAU/USD */}
        <div className="rounded-xl border border-white/10 bg-black/20 p-5 transition-colors hover:border-white/20">
          <p className="text-sm font-medium text-slate-400">
            XAU/USD
          </p>

          <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
            —
          </p>

          <span className="mt-2 inline-block text-xs text-slate-500">
            Live price
          </span>
        </div>
      </div>
    </section>

  </div>
</section>

  );
};

export default AdminDashboard;