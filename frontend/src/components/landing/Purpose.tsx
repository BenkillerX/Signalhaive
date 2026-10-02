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
      </div>
    </section>
  );
};

export default Purpose;