import { useState } from "react";
import { register } from "../firebase/auth";

type RegisterProps = {
  onLoginClick: () => void;
};

export default function Register({ onLoginClick }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg px-8 py-10">
        <form onSubmit={submit} className="space-y-5">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-slate-900">
              Create Account
            </h1>
            <p className="text-sm text-slate-500">
              Sign up to get started
            </p>
          </div>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200
                       text-sm outline-none
                       focus:border-blue-600
                       focus:ring-4 focus:ring-blue-100"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200
                       text-sm outline-none
                       focus:border-blue-600
                       focus:ring-4 focus:ring-blue-100"
          />

          {error && (
            <p className="text-sm text-red-600 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-blue-600
                       text-white font-semibold
                       hover:bg-blue-700
                       active:scale-[0.98]
                       transition
                       disabled:opacity-60
                       disabled:cursor-not-allowed"
          >
            {loading ? "Creating account…" : "Register"}
          </button>
        </form>

        {/* Back to Login */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onLoginClick}
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
