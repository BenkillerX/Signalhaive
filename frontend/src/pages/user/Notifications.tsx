import {
  Bell,
  CheckCheck,
  CircleDollarSign,
  Info,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { registerPushNotifications } from "../../services/pushNotifications";
import api from "../../services/api";


const Notifications = () => {
 const handleEnableNotifications = async () => {
    try {
      const subscription = await registerPushNotifications();

      console.log("Push subscription:", subscription);

      await api.post("/api/notifications/subscribe", {
        subscription,
      });

      console.log("Subscription saved on backend");
    } catch (error) {
      console.error("Push notification setup failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
<button onClick={handleEnableNotifications}>
  Enable Notifications
</button>
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
                <Bell size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  Notifications
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Stay updated with your SignalHive activity.
                </p>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900">
            <CheckCheck size={15} />
            Mark all as read
          </button>
        </div>

        {/* Notification Summary */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              All notifications
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              8
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Unread
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              3
            </p>
          </div>

          <div className="hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:block">
            <p className="text-xs font-medium text-slate-500">
              Today
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              4
            </p>
          </div>

        </div>

        {/* Notifications */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* New notification */}
          <div className="border-b border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 md:p-5">
            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      New EUR/USD signal
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      A new BUY signal has been posted for EUR/USD.
                    </p>
                  </div>

                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  5 minutes ago
                </p>
              </div>

            </div>
          </div>

          {/* New notification */}
          <div className="border-b border-slate-100 bg-slate-50/70 p-4 transition hover:bg-slate-50 md:p-5">
            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      XAU/USD signal updated
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      The take profit level for the XAU/USD signal has been updated.
                    </p>
                  </div>

                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  18 minutes ago
                </p>
              </div>

            </div>
          </div>

          {/* Read notification */}
          <div className="border-b border-slate-100 p-4 transition hover:bg-slate-50 md:p-5">
            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <CircleDollarSign size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-slate-900">
                  Subscription payment successful
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Your monthly SignalHive subscription has been renewed successfully.
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  2 hours ago
                </p>
              </div>

            </div>
          </div>

          {/* Read notification */}
          <div className="border-b border-slate-100 p-4 transition hover:bg-slate-50 md:p-5">
            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Info size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-slate-900">
                  Market update
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  The market is experiencing increased volatility. Trade carefully.
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  Yesterday
                </p>
              </div>

            </div>
          </div>

          {/* Read notification */}
          <div className="p-4 transition hover:bg-slate-50 md:p-5">
            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <XCircle size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-slate-900">
                  Signal closed
                </h3>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  The GBP/USD signal has been closed.
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  Yesterday
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Empty / Load more area */}
        <div className="mt-6 flex justify-center">
          <button className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900">
            Load more
          </button>
        </div>

      </div>
    </div>
  );
};

export default Notifications;