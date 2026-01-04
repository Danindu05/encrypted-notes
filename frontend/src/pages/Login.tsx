import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

type LoginProps = {
  onRegisterClick: () => void;
};

export default function Login({ onRegisterClick }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg px-8 py-10">
        <form onSubmit={login} className="space-y-5">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-500">
              Sign in to your account
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
            className="w-full py-2.5 rounded-xl bg-blue-600
                       text-white font-semibold
                       hover:bg-blue-700
                       active:scale-[0.98]
                       transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          No account?{" "}
          <button
            type="button"
            onClick={onRegisterClick}
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
