// src/App.tsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

import { auth } from "./firebase/firebase";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"login" | "register">("login");

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading auth…</p>;

  if (!user) {
    return mode === "login" ? (
      <Login onRegisterClick={() => setMode("register")} />
    ) : (
      <Register onLoginClick={() => setMode("login")} />
    );
  }

  return (
    <ErrorBoundary>
      <Notes />
    </ErrorBoundary>
  );
}
