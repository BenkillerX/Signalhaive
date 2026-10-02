import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const UserSubcription = () => {
  const { currentUser } = useAuth();

  const plan = currentUser?.subscriptionPlan ?? "none";
  const status = currentUser?.subscriptionStatus ?? "inactive";

  const planName =
    plan === "weekly"
      ? "Weekly Plan"
      : plan === "monthly"
      ? "Monthly Plan"
      : plan === "yearly"
      ? "Yearly Plan"
      : "No Subscription";

  const statusLabel =
    status.charAt(0).toUpperCase() + status.slice(1);

  const formattedEndDate = currentUser?.subscriptionEndDate
    ? new Date(currentUser.subscriptionEndDate).toLocaleDateString()
    : null;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="font-semibold text-slate-900">
          Subscription
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your SignalHive subscription.
        </p>
      </div>

      <div className="flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-900">
              {planName}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                status === "active"
                  ? "bg-emerald-50 text-emerald-700"
                  : status === "expired"
                  ? "bg-red-50 text-red-700"
                  : status === "cancelled"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {statusLabel}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {status === "active"
              ? formattedEndDate
                ? `Your subscription is active until ${formattedEndDate}.`
                : "Your subscription is currently active."
              : "You don't currently have an active subscription."}
          </p>
        </div>

        <Link
          to="/wallet"
          className="w-fit rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Manage Subscription
        </Link>
      </div>
    </section>
  );
};

export default UserSubcription;