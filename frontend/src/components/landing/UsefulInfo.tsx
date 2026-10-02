import {
  Search,
  Radio,
  BellRing,
  Eye,
  ClipboardCheck,
} from "lucide-react";

const HowItWorks = () => {
  const features = [
    {
      icon: Search,
      title: "We Hunt",
      description:
        "Our system continuously monitors the market for defined opportunities.",
    },
    {
      icon: Radio,
      title: "We Signal",
      description:
        "When a qualifying setup appears, a structured signal is published with Pair, Direction, Entry, Take Profit and Stop Loss.",
    },
    {
      icon: BellRing,
      title: "You Get Notified",
      description:
        "Receive a real-time alert when a new signal is available.",
    },
    {
      icon: Eye,
      title: "You Monitor",
      description:
        "Track the signal from entry through its final outcome.",
    },
    {
      icon: ClipboardCheck,
      title: "We Record",
      description:
        "Every completed signal contributes to transparent historical performance tracking.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
            A clear process from setup to outcome.
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-slate-200 transition duration-300 group-hover:bg-slate-800">
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <h3 className="mt-7 text-lg font-bold tracking-tight text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;