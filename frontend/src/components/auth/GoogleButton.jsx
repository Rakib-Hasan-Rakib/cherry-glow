"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function GoogleButton({ label }) {
    const handleGoogle = async () => {
      const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sync`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <button
      onClick={handleGoogle}
      className="w-full rounded-lg border py-2 font-medium hover:bg-muted"
    >
      Continue with Google
    </button>
  );
}
