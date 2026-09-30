import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const { register, loading, error } = useAuth();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
 async function handleRegister(e: React.FormEvent<HTMLFormElement>) {

  e.preventDefault();

  if (!terms) {
    toast.error('You must chext all terms and conditions')
    return;
  }

  try {
    await register({
      firstname,
      lastname,
      email,
      password,
    });

    navigate("/verify-email", {
      state: { email },
    });
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
              Create your SignalHaive account
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Get started with your trading workspace.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20">
            <form className="space-y-5" onSubmit={handleRegister}>
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstname"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  First Name
                </label>

                <input
                  id="firstname"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20"
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastname"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Last name
                </label>

                <input
                  id="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Enter your lastname"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20"
                />
              </div>

              {/* Password */}
              <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Use at least 8 characters.
          </p>
        </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-950 accent-slate-500"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-slate-400"
                >
                  I agree to the SignalHaive{" "}
                  <Link
                    to="/terms"
                    className="text-slate-200 underline underline-offset-2 hover:text-white"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-slate-200 underline underline-offset-2 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
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
                disabled={loading}
                className="w-full rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            {/* Login */}
            <div className="mt-6 border-t border-slate-800 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have an account?{" "}
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

export default Register;
