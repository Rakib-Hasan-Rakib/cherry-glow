"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function GoogleButton({ label = "Continue with Google" }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect")?.startsWith("/")
    ? searchParams.get("redirect")
    : "/";

  const handleGoogle = async () => {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      // 🔐 Google Login
      const result = await signInWithPopup(auth, provider);

      // 🎟️ Get Firebase Token
      const token = await result.user.getIdToken();

      // 🔗 Sync with backend
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sync`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // ✅ Redirect after login
      router.push(redirectPath);
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogle}
      disabled={loading}
      className="w-full rounded-lg border py-2 font-medium hover:bg-muted disabled:opacity-50"
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
