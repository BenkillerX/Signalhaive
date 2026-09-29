import { Link } from "react-router-dom"
const HelpAndSupport = () => {
    const helpTopics = [
  {
    title: "Getting Started",
    description:
      "Learn how to use SignalHive and navigate your dashboard.",
    icon: "→",
    path: "/help/getting-started",
  },
  {
    title: "Trading Signals",
    description:
      "Understand signals, entries, stop loss, take profit, and updates.",
    icon: "↗",
    path: "/live-signals",
  },
  {
    title: "Markets",
    description:
      "Learn how to monitor live market prices and market data.",
    icon: "◌",
    path: "/markets",
  },
  {
    title: "Subscriptions",
    description:
      "Get help with plans, payments, and your subscription.",
    icon: "◇",
    path: "/wallet",
  },
  {
    title: "Notifications",
    description:
      "Learn about signal alerts and browser notifications.",
    icon: "◉",
    path: "/notifications",
  },
  {
    title: "Account & Security",
    description:
      "Manage your profile, password, and account settings.",
    icon: "□",
    path: "/settings",
  },
]

  return (
    <section className="min-h-screen w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Help & Support
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Find answers, get help, and learn more about using SignalHive.
          </p>
        </div>

        {/* Search */}

<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-lg font-semibold text-slate-900">
      How can we help?
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Search our help resources or contact the SignalHive team.
    </p>

    <div className="mx-auto mt-5 flex max-w-xl flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
        />
      </div>

      <button
        type="button"
        className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-[0.98]"
      >
        Search
      </button>
    </div>
  </div>
</div>


        {/* Quick Help */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Quick Help
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Get help with common SignalHive topics.
            </p>
          </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
  {helpTopics.map((item) => (
    <Link
      key={item.title}
      to={item.path}
      className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg font-semibold text-slate-600">
        {item.icon}
      </div>

      <h3 className="mt-5 font-semibold text-slate-900">
        {item.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {item.description}
      </p>

      <span className="mt-5 inline-block text-sm font-medium text-slate-700 transition group-hover:translate-x-1">
        Learn more →
      </span>
    </Link>
  ))}
</div>
        </section>

        {/* Contact Support */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-lg font-semibold text-slate-600">
                ?
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-900">
                Still need help?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                If you can't find what you're looking for, contact our support
                team and we'll help you with your issue.
              </p>
            </div>

            <button
              type="button"
              className="w-fit rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Contact Support
            </button>
          </div>
        </section>

        {/* Support Information */}
        <section className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Support Email
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-900">
              support@signalhive.com
            </p>

            <p className="mt-2 text-xs text-slate-500">
              We typically respond within 24 hours.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Support Hours
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-900">
              Monday – Friday
            </p>

            <p className="mt-2 text-xs text-slate-500">
              9:00 AM – 5:00 PM
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="rounded-xl border border-slate-200 bg-slate-100 px-5 py-4">
          <p className="text-xs leading-5 text-slate-600">
            SignalHive provides market information and trading signals for
            educational and informational purposes. Trading financial markets
            involves risk. Always make your own trading decisions and manage
            your risk carefully.
          </p>
        </div>

      </div>
    </section>
  )
}

export default HelpAndSupport