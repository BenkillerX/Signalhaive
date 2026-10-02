import {
  ArrowRight,
  BarChart3,
  Bell,
  LineChart,
  Settings,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  const sections = [
    {
      icon: BarChart3,
      title: "Markets",
      description:
        "Monitor live forex market prices and keep an eye on the pairs you're interested in.",
      link: "/markets",
    },
    {
      icon: LineChart,
      title: "Live Signals",
      description:
        "View active trading signals with the pair, direction, entry price, stop loss, take profit, and analysis.",
      link: "/live-signals",
    },
    {
      icon: Wallet,
      title: "Wallet & Subscription",
      description:
        "Manage your subscription, view your current plan, and access available payment options.",
      link: "/wallet",
    },
    {
      icon: Bell,
      title: "Notifications",
      description:
        "Stay informed about important signal updates and other activity on your SignalHive account.",
      link: "/notifications",
    },
    {
      icon: Settings,
      title: "Account Settings",
      description:
        "Update your profile, change your password, manage notifications, and manage your account.",
      link: "/settings",
    },
  ];

  return (
    <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50">
              <ShieldCheck className="h-5 w-5 text-slate-600" />
            </div>

            <span className="text-sm font-medium text-slate-600">
              SignalHive Guide
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Get Started with SignalHive
          </h1>
        </div>

        {/* Quick Start */}
        <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="font-semibold text-slate-900">
              How SignalHive works
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Follow these simple steps to get familiar with the platform.
            </p>
          </div>

          <div className="grid gap-0 divide-y divide-slate-100 md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="p-6">
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                1
              </span>

              <h3 className="font-semibold text-slate-900">
                Explore the markets
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Check live market prices and monitor the forex pairs available
                on SignalHive.
              </p>
            </div>

            <div className="p-6">
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                2
              </span>

              <h3 className="font-semibold text-slate-900">
                Check live signals
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Review available signals, including entry, stop loss, take
                profit, direction, timeframe, and analysis.
              </p>
            </div>

            <div className="p-6">
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                3
              </span>

              <h3 className="font-semibold text-slate-900">
                Track your activity
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use your portfolio and trade history to keep track of your
                activity over time.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation Guide */}
        <section>
          <div className="mb-4">
            <h2 className="font-semibold text-slate-900">
              Explore SignalHive
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Learn what each section of the application is used for.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <Link
                  key={section.title}
                  to={section.link}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 transition group-hover:bg-emerald-50">
                      <Icon className="h-5 w-5 text-slate-600 transition group-hover:text-emerald-600" />
                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-500" />
                  </div>

                  <h3 className="font-semibold text-slate-900">
                    {section.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {section.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GetStarted;