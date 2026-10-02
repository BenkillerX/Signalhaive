import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";
import SignalHaiveLogo from "/icons/icon.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Live Signals", path: "/live-signals" },
    { name: "FAQ", path: "/faq" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
      <nav>
        {/* MOBILE NAVBAR */}
        <div className="flex items-center justify-between px-4 py-3.5 md:hidden">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <img
              src={SignalHaiveLogo}
              alt="SignalHive"
              className="h-7 w-7 object-contain"
            />

            <h1 className="text-xl font-bold tracking-tight text-white">
              Signal<span className="text-slate-400">Haive</span>
            </h1>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-300 transition hover:bg-slate-800 hover:text-white"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX size={23} /> : <FiMenu size={23} />}
          </button>
        </div>

        {/* MOBILE SIDEBAR */}
        <div
          className={`fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm transform bg-white shadow-2xl transition-transform duration-300 md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-2"
            >
              <img
                src={SignalHaiveLogo}
                alt="SignalHive"
                className="h-7 w-7 object-contain"
              />

              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Signal<span className="text-slate-500">Hive</span>
              </h2>
            </Link>

            <button
              onClick={closeMenu}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
              aria-label="Close menu"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex h-[calc(100vh-81px)] flex-col px-5 py-6">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                  >
                    <span>{link.name}</span>

                    <FiChevronRight
                      size={17}
                      className="text-slate-400"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="my-6 border-t border-slate-100" />

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
                className="flex w-full items-center justify-center rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-900"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* OVERLAY */}
        {isOpen && (
          <div
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden"
          />
        )}

        {/* DESKTOP NAVBAR */}
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

            <h1 className="text-xl font-bold tracking-tight text-white">
              Signal<span className="text-slate-400">Haive</span>
            </h1>
          </Link>

          {/* Navigation */}
          <ul className="flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-sm font-medium text-slate-400 transition hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-400 hover:bg-slate-800 hover:text-white"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;