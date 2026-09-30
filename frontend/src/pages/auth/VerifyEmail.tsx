import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


const VerifyEmail = () => {
  const { verifyEmail, loading, error } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [code, setCode] = useState("");

  // Email can be passed from the registration page
  const email = location.state?.email || "";

async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (code.length !== 6) {
    return;
  }

  try {
    await verifyEmail(email, code);

    navigate("/live-signals");
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full">
          {/* Logo / Brand */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 ring-1 ring-slate-700">
              <span className="text-lg font-bold text-slate-100">S</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              Verify your email
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              We sent a verification code to{" "}
              <span className="font-medium text-slate-200">
                {email || "your email address"}
              </span>
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20">
            <form className="space-y-5" onSubmit={handleVerify}>
              {/* Verification Code */}
              <div>
                <label
                  htmlFor="code"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Verification code
                </label>

                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter 6-digit code"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-center text-lg tracking-[0.35em] text-slate-100 outline-none transition placeholder:text-slate-500 placeholder:tracking-normal focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Enter the 6-digit code sent to your email.
                </p>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm text-red-400">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="w-full rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify email"}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 border-t border-slate-800 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Already verified?{" "}
                <Link
                  to="/login"
                  className="font-medium text-slate-200 hover:text-white"
                >
                  Sign in
                </Link>
              </p>
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

export default VerifyEmail;
