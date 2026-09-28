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
      "Join the SignalHive community and interact with other traders.",
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
    <section className="w-full space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
            <GraduationCap size={22} />
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

      {/* Overview cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Mentors
            </p>

            <Users size={19} className="text-slate-400" />
          </div>

          <p className="mt-3 text-2xl font-semibold text-slate-900">
            12+
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Experienced mentors
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Sessions
            </p>

            <CalendarDays size={19} className="text-slate-400" />
          </div>

          <p className="mt-3 text-2xl font-semibold text-slate-900">
            3
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Upcoming sessions
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              My Mentorship
            </p>

            <GraduationCap size={19} className="text-slate-400" />
          </div>

          <p className="mt-3 text-2xl font-semibold text-slate-900">
            Not joined
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Find a mentor to get started
          </p>
        </div>
      </div>

      {/* Find a mentor */}
     <div>
  <div className="mb-4">
    <h2 className="text-lg font-semibold text-slate-900">
      Find a Mentor
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Get guidance and connect with the SignalHive trading community.
    </p>
  </div>

  <div className="grid gap-4 md:grid-cols-2">
    {mentorshipOptions.map((option) => {
      const Icon = option.icon;

      return (
        <div
          key={option.title}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
            <Icon size={21} className="text-slate-700" />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            {option.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {option.description}
          </p>

          <a
            href={option.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            {option.action}
            <ExternalLink size={15} />
          </a>
        </div>
      );
    })}
  </div>
</div>

      {/* Upcoming sessions */}
     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="font-semibold text-slate-900">
        Mentorship Community
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Learn, ask questions, and connect with other traders.
      </p>
    </div>

    <Send size={20} className="text-slate-400" />
  </div>

  <div className="mt-5 rounded-xl bg-slate-50 p-5 text-center">
    <Send
      size={25}
      className="mx-auto text-slate-400"
    />

    <p className="mt-3 text-sm font-medium text-slate-700">
      Join our Telegram community
    </p>

    <p className="mt-1 text-xs leading-5 text-slate-500">
      Get mentorship, trading discussions, updates, and
      connect with the SignalHive community.
    </p>

    <a
      href="https://t.me/+zQRPMdiroHwxMzU0"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
    >
      Join Telegram
      <ExternalLink size={15} />
    </a>
  </div>
</div>
    </section>
  );
};

export default Mentorship;