import { Link } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";
import SignalHaiveLogo from '/images/SignalHaive.jpeg'
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
    <header className="w-full border-b border-gray-200 sticky top-0 z-50 bg-white">
      <nav>
        {/* MOBILE NAVBAR */}
        <div className="px-4 py-3 flex items-center justify-between md:hidden">
          <Link
        to="/"
        onClick={closeMenu}
        className="flex items-center gap-2"
      >
        <img
          src={SignalHaiveLogo}
          alt=""
          className="h-7 w-7 object-contain"
        />

        <h1 className="text-xl font-bold text-slate-900">
          Signal<span className="text-slate-600">Hive</span>
        </h1>
      </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-700"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* MOBILE SIDEBAR */}
        <div
          className={`fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm transform bg-white shadow-2xl transition-transform duration-300 md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
           <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <img
            src={SignalHaiveLogo}
            alt=""
            className="h-7 w-7 object-contain"
          />

          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Signal<span className="text-slate-600">Hive</span>
          </h2>
        </Link>

            <button
              onClick={closeMenu}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-slate-100 hover:text-slate-900"
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
                    className="flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium text-gray-700 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <span>{link.name}</span>

                    <FiChevronRight
                      size={17}
                      className="text-gray-400"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100" />

            <div className="space-y-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                Log In
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-xl bg-slate-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
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
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
          />
        )}

        {/* DESKTOP / TABLET NAVBAR */}
        <div className="hidden md:flex bg-slate-600 text-white items-center px-8 lg:px-28 py-2 justify-between w-full">
          {/* Logo */}
         <Link
  to="/"
  className="flex items-center gap-2"
      >
        <img
          src={SignalHaiveLogo}
          alt=""
          className="h-7 w-7 object-contain"
        />

        <h1 className="text-xl font-bold">
          SignalHaive
        </h1>
      </Link>
          {/* Navigation */}
          <ul className="flex gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="text-gray-300 font-medium hover:text-white transition duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex gap-3 items-center">
            <Link
              to="/login"
              className="px-4 py-1.5 border-2 border-white text-gray-300 hover:text-white text-sm rounded-lg transition"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="bg-white px-4 py-1.5 rounded-xl text-black hover:bg-gray-100 transition"
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
