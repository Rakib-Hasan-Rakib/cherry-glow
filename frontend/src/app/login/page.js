"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthCard from "@/components/auth/AuthCard";
import GoogleButton from "@/components/auth/GoogleButton";
import PasswordInput from "@/components/shared/PasswordInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signInWithEmailAndPassword(auth, email, password);
    const token = await res.user.getIdToken();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sync`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AuthCard title="Welcome Back">
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full rounded-lg bg-black py-2 text-white">
            Login
          </button>

          <GoogleButton label="Login with Google" />
        </form>
      </AuthCard>
    </div>
  );
}
