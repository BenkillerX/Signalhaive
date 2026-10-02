import { useAuth } from "../../hooks/useAuth";

const Wallet = () => {
  const { currentUser } = useAuth();
   if (!currentUser) {
    return null;
  }

   const hasSubscription =
    currentUser.subscriptionStatus === "active" &&
    currentUser.subscriptionPlan !== "none";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Wallet
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your SignalHaive subscription and payments.
          </p>
        </div>

        {/* Current Subscription */}
      <section className="mb-8">
  <div className="mb-4">
    <h2 className="text-lg font-semibold text-slate-900">
      Current Subscription
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Your current SignalHaive plan.
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
    {hasSubscription ? (
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold capitalize text-slate-900">
              {currentUser.subscriptionPlan} Plan
            </h3>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-600">
              {currentUser.subscriptionStatus}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Your subscription is active until{" "}
            {currentUser.subscriptionEndDate
              ? new Date(
                  currentUser.subscriptionEndDate
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A"}
            .
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Current plan
          </p>

          <p className="mt-1 text-2xl font-bold capitalize text-slate-900">
            {currentUser.subscriptionPlan}
          </p>
        </div>

      </div>
    ) : (
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h3 className="text-xl font-bold text-slate-900">
            No Active Subscription
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            You currently don't have an active SignalHaive subscription.
          </p>
        </div>

        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
          Inactive
        </span>

      </div>
    )}
  </div>
</section>

        {/* Subscription Plans */}
        <section className="mb-8">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Subscription Plans
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose a plan that works for you.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {/* Weekly */}
<div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">

  <div className="flex items-center justify-between">
    <p className="text-sm font-semibold text-slate-500">
      Weekly
    </p>

    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
      Flexible
    </span>
  </div>

  <div className="mt-4">
    <span className="text-4xl font-bold tracking-tight text-slate-900">
      $8
    </span>

    <span className="ml-1 text-sm text-slate-500">
      / week
    </span>
  </div>

  <p className="mt-2 text-xs text-slate-400">
    Short-term access to SignalHaive
  </p>

  <div className="my-6 border-t border-slate-100" />

  <ul className="space-y-3 text-sm text-slate-600">
    <li className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-600">
        ✓
      </span>
      Access to live signals
    </li>
  </ul>

  {/* mt-auto pushes this to the bottom */}
  <button className="mt-auto pt-7">
    <span className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
      Choose Weekly
    </span>
  </button>

</div>
           {/* Monthly */}
<div className="relative flex h-full flex-col rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm">
  <span className="absolute right-5 top-5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
    Popular
  </span>

  <p className="text-sm font-semibold text-slate-500">
    Monthly
  </p>

  <div className="mt-3">
    <span className="text-3xl font-bold tracking-tight text-slate-900">
      $30
    </span>

    <span className="text-sm text-slate-500">
      {" "} / month
    </span>
  </div>

  <div className="my-6 border-t border-slate-100" />

  <ul className="space-y-3 text-sm text-slate-600">
    <li>✓ Access to live signals</li>
    <li>✓ Real-time market updates</li>
  </ul>

  <button className="mt-auto w-full pt-6">
    <span className="block w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
      Choose Monthly
    </span>
  </button>
</div>


{/* Yearly */}
<div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <p className="text-sm font-semibold text-slate-500">
    Yearly
  </p>

  <div className="mt-3">
    <span className="text-3xl font-bold tracking-tight text-slate-900">
      $600
    </span>

    <span className="text-sm text-slate-500">
      {" "} / year
    </span>
  </div>

  <div className="my-6 border-t border-slate-100" />

  <ul className="space-y-3 text-sm text-slate-600">
    <li>✓ Access to live signals</li>
    <li>✓ Real-time market updates</li>
    <li>✓ Signal history</li>
    <li>✓ Trade tracking</li>
  </ul>

  <button className="mt-auto w-full pt-6">
    <span className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
      Choose Yearly
    </span>
  </button>
</div>

          </div>
        </section>

        {/* Payment History */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Payment History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View your previous subscription payments.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-150 text-left text-sm">

                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 font-semibold text-slate-500">
                      Date
                    </th>

                    <th className="px-5 py-4 font-semibold text-slate-500">
                      Plan
                    </th>

                    <th className="px-5 py-4 font-semibold text-slate-500">
                      Amount
                    </th>

                    <th className="px-5 py-4 font-semibold text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>

                  <tr className="border-b border-slate-100">
                    <td className="px-5 py-4 text-slate-600">
                      Sep 29, 2026
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-900">
                      Monthly
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      $30
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                        Successful
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 text-slate-600">
                      Aug 29, 2026
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-900">
                      Monthly
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      $30
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                        Successful
                      </span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Wallet;