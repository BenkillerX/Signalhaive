import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!email.trim()) {
    toast.error("Please enter your email address");
    return;
  }

  try {
    setLoading(true);

    const response = await api.post("/api/auth/forgot-password", {
      email: email.trim(),
    });

    toast.success(response.data.message);
  } catch (error) {
    console.error("Forgot password error:", error);

    toast.error(
      "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full">

          {/* Logo / Brand */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 ring-1 ring-slate-700">
              <span className="text-lg font-bold text-slate-100">
                S
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              Forgot your password?
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Enter the email address associated with your
              SignalHaive account and we'll send you a password
              reset link.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20">
            <form
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 pl-10 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Sending reset link..."
                  : "Send reset link"}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 border-t border-slate-800 pt-6">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to sign in
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-600">
            © {new Date().getFullYear()} SignalHaive. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;