import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import SignalHaiveLogo from "/icons/icon.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

const navLinks = [
  { name: "Home", path: "/#home" },
  { name: "How It Works", path: "/#how-it-works" },
  { name: "Live Signals", path: "/#live-signals" },
  { name: "Performance", path: "/#performance" },
  { name: "FAQ", path: "/#faq" },
];

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
        <nav className="mx-auto w-full">
          {/* ================= MOBILE NAVBAR ================= */}
          <div className="flex h-16items-center justify-between px-4 md:hidden">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-2"
            >
              <img
                src={SignalHaiveLogo}
                alt="SignalHive"
                className="h-8 w-8 object-contain"
              />

              <span className="text-xl font-bold tracking-tight text-white">
                Signal<span className="text-slate-400">Haive</span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition hover:bg-slate-800 hover:text-white"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X size={23} />
              ) : (
                <Menu size={23} />
              )}
            </button>
          </div>

          {/* ================= DESKTOP NAVBAR ================= */}
          <div className="hidden h-17 items-center justify-between px-8 md:flex lg:px-20 xl:px-28">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5"
            >
              <img
                src={SignalHaiveLogo}
                alt="SignalHive"
                className="h-8 w-8 object-contain"
              />

              <span className="text-xl font-bold tracking-tight text-white">
                Signal<span className="text-slate-400">Haive</span>
              </span>
            </Link>

            {/* Navigation */}
            <ul className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="relative py-2 text-sm font-medium text-slate-400 transition hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-800 hover:text-white"
              >
                Log In
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-60 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`fixed right-0 top-0 z-70 flex h-dvh w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <img
              src={SignalHaiveLogo}
              alt="SignalHive"
              className="h-8 w-8 object-contain"
            />

            <span className="text-xl font-bold tracking-tight text-slate-900">
              Signal<span className="text-slate-500">Haive</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Body */}
        <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
          {/* Navigation */}
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  <span>{link.name}</span>

                  <ChevronRight
                    size={17}
                    className="text-slate-400"
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-6 border-t border-slate-100" />

          {/* Auth buttons */}
          <div className="space-y-3">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Log In
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;