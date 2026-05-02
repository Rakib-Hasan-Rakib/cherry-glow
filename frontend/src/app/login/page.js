"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthCard from "@/components/auth/AuthCard";
import GoogleButton from "@/components/auth/GoogleButton";
import PasswordInput from "@/components/shared/PasswordInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectPath, setRedirectPath] = useState("/");

  const router = useRouter();

  // ✅ SAFE: no useSearchParams
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const path = params.get("redirect");
      if (path) setRedirectPath(path);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔐 Firebase Login
      const res = await signInWithEmailAndPassword(auth, email, password);

      // 🎟️ Get Token
      const token = await res.user.getIdToken();

      // 🔗 Sync with Backend
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sync`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Login successful!");
      router.push(redirectPath);
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <AuthCard title="Welcome Back">
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Button */}
          <button
            disabled={loading}
            className="w-full rounded-lg bg-black py-2 text-white disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Google Login */}
          <GoogleButton label="Login with Google" />
        </form>
      </AuthCard>
    </div>
  );
}