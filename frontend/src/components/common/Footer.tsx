import {
  ArrowUpRight,
  Mail,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const Footer = () => {
  const productLinks = [
    { name: "Live Signals", href: "/live-signals" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Performance", href: "/#performance" },
    { name: "FAQ", href: "/#faq" },
  ];

  const companyLinks = [
    { name: "About", href: "/#purpose" },
    { name: "Contact", href: "mailto:support@signalhive.com" },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        {/* Top */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-950">
                <TrendingUp size={20} strokeWidth={2.2} />
              </div>

              <span className="text-xl font-bold tracking-tight">
                SignalHive
              </span>
            </a>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              Clear, structured forex signals and market information designed
              to help traders monitor opportunities with confidence.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={15} />
              <span>Built with transparency in mind</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white">Platform</h3>

            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>

            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">Get in touch</h3>

            <a
              href="mailto:support@signalhive.com"
              className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
            >
              <Mail size={16} />
              support@signalhive.com
            </a>

            <a
              href="/live-signals"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Explore Signals
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-5 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} SignalHive. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5 text-xs text-slate-500">
            <a
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Risk disclaimer */}
        <div className="mt-6 border-t border-slate-900 pt-6">
          <p className="text-[11px] leading-5 text-slate-600">
            Trading foreign exchange involves substantial risk and may not be
            suitable for every trader. SignalHive provides market information
            and trading signals and does not guarantee profits or trading
            results. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;