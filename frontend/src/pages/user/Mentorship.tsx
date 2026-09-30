import {
  CalendarDays,
  GraduationCap,
  MessageCircle,
  Users,
  Send, 
  ExternalLink
} from "lucide-react";
const mentorshipOptions = [
  {
    title: "Telegram Community",
    description:
      "Join the SignalHaive community and interact with other traders.",
    icon: Send,
    action: "Join Community",
    href: "https://t.me/+zQRPMdiroHwxMzU0",
  },
  {
    title: "Ask a Mentor",
    description:
      "Have a question about trading? Ask inside our community.",
    icon: MessageCircle,
    action: "Ask a Question",
    href: "https://t.me/+zQRPMdiroHwxMzU0",
  },
];
const Mentorship = () => {
  return (
<section className="w-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-7xl space-y-8">

    {/* Header */}
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
          <GraduationCap size={23} />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Mentorship
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Learn forex trading from experienced mentors.
          </p>
        </div>
      </div>
    </div>

    {/* Overview */}
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Mentorship Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your mentorship activity and available opportunities.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">

        {/* Mentors */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Mentors
            </p>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
              <Users size={18} className="text-slate-500" />
            </div>
          </div>

          <p className="mt-4 text-2xl font-semibold text-slate-900">
            12+
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Experienced mentors
          </p>
        </div>

        {/* Sessions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Sessions
            </p>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
              <CalendarDays size={18} className="text-slate-500" />
            </div>
          </div>

          <p className="mt-4 text-2xl font-semibold text-slate-900">
            3
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Upcoming sessions
          </p>
        </div>

        {/* My Mentorship */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              My Mentorship
            </p>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50">
              <GraduationCap size={18} className="text-slate-500" />
            </div>
          </div>

          <p className="mt-4 text-xl font-semibold text-slate-900">
            Not joined
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Find a mentor to get started
          </p>
        </div>

      </div>
    </div>

    {/* Main Content */}
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">

      {/* Left Content */}
      <div className="space-y-8">

        {/* Find Mentor */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Find a Mentor
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Get guidance and connect with the SignalHaive trading community.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {mentorshipOptions.map((option) => {
              const Icon = option.icon;

              return (
                <div
                  key={option.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                    <Icon
                      size={21}
                      className="text-slate-700"
                    />
                  </div>

                  <h3 className="mt-5 font-semibold text-slate-900">
                    {option.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {option.description}
                  </p>

                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    {option.action}
                    <ExternalLink size={15} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <Send
                  size={19}
                  className="text-slate-600"
                />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Mentorship Community
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Learn, ask questions, and connect with other traders.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-xl bg-slate-50 p-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Join our Telegram community
              </p>

              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
                Get mentorship, trading discussions, updates, and connect
                with the SignalHaive community.
              </p>
            </div>

            <a
              href="https://t.me/+zQRPMdiroHwxMzU0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Join Telegram
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

      </div>

      {/* Right Sidebar */}
      <aside className="space-y-6">

        {/* Upcoming Sessions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
              <CalendarDays
                size={19}
                className="text-slate-600"
              />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Upcoming Sessions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your scheduled mentorship sessions.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
            <CalendarDays
              size={24}
              className="mx-auto text-slate-400"
            />

            <p className="mt-3 text-sm font-medium text-slate-700">
              No sessions scheduled
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Join a mentorship program to see your upcoming sessions here.
            </p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900">
            How Mentorship Works
          </h2>

          <div className="mt-5 space-y-5">

            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                1
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  Find a mentor
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Explore available mentorship opportunities.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                2
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  Connect
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Connect with mentors and the trading community.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                3
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800">
                  Start learning
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Learn, ask questions, and improve your trading knowledge.
                </p>
              </div>
            </div>

          </div>
        </div>

      </aside>

    </div>

  </div>
</section>
  );
};

export default Mentorship;