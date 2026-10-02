import {
  Users,
  Bell,
  Activity,
} from "lucide-react";

const Purpose = () => {
  const signalUsers = [
    {
      icon: Users,
      value: "100,000+",
      subValue: "Subscriber-ready infrastructure",
    },
    {
      icon: Bell,
      value: "Real-Time",
      subValue: "Signal notifications",
    },
    {
      icon: Activity,
      value: "24/7",
      subValue: "Market monitoring infrastructure",
    },
  ];
  const steps = [
    {
        title:"we hunt",
        des:"Our system continuously monitors the market for defined opportunities."
    },
    {
        title:"We Signal",
        des:"When a qualifying setup appears, a structured signal is published with Pair, Direction, Entry, Take Profit and Stop Loss."
    },
    {
        title:"You Get Notified",
        des:"Receive a real-time alert when a new signal is available."
    },
    {
        title:"You Monitor",
        des:"Track the signal from entry through its final outcome."
    },
    {
        title:"We Record",
        des:"Every completed signal contributes to transparent historical performance tracking."
    },
  ]

  return (
    <section className="bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto ">
        {/* Heading */}
        <div className="">

          <h1 className="text-4xl text-center font-bold tracking-[-0.03em] text-slate-950 sm:text-5xl lg:text-4xl">
            BUILT FOR TRADERS WHO VALUE CLARITY.
          </h1>

          <p className="mt-6 text-center text-base leading-7 text-slate-500 sm:text-lg">
            Whether you're monitoring the market throughout the day or
            checking signals on the move, get the information you need
            without unnecessary complexity.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {signalUsers.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.value}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-7 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-slate-200 transition group-hover:bg-slate-800">
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                {/* Value */}
                <p className="mt-7 text-3xl font-bold tracking-tight text-slate-950">
                  {item.value}
                </p>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.subValue}
                </p>
              </div>
            );
          })}
        </div>
      {/* From market to signal */}
    <div className="mt-24" id="how-it-works">
  <div className="mb-12">

    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
      A clear process from setup to outcome.
    </h2>
  </div>

  <div className="relative">
    {/* Connecting line - desktop */}
    <div className="absolute left-0 right-0 top-6 hidden h-px bg-slate-200 md:block" />

    <div className="grid gap-10 md:grid-cols-5 md:gap-5">
      {steps.map((step, index) => (
        <div key={step.title} className="relative">
          {/* Step number */}
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-900 shadow-sm">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold capitalize tracking-tight text-slate-950">
              {step.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {step.des}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
      </div>
    </section>
  );
};

export default Purpose;