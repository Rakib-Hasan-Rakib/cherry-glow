"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const avatars = {
  male: "/avatars/male.png",
  female: "/avatars/female.png",
};

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ unified redirect param
  const redirectTo = searchParams.get("redirect")?.startsWith("/")
    ? searchParams.get("redirect")
    : "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState("male");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔐 Firebase register
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      const user = userCredential.user;

      // 🧑 Update Firebase profile
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: avatars[avatar],
      });
      await user.reload();

      // 🎟️ Get token
      const token = await user.getIdToken();

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

      toast.success("Account created successfully 🎉");
      setSuccess("Account created successfully 🎉");

      // 🔄 Redirect
      router.replace(redirectTo);
    } catch (err) {
      toast.error("Registration failed. Please check your details.");
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <Image
            src="/logo.png"
            alt="Cherry Glow"
            width={48}
            height={48}
            className="mx-auto"
          />
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-sm text-muted-foreground">
            Join Cherry Glow and explore beauty
          </p>
        </CardHeader>

        <CardContent>
          {/* Success */}
          {success && (
            <div className="mb-4 rounded-lg bg-green-100 text-green-700 px-4 py-2 text-sm text-center">
              {success}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-100 text-red-600 px-4 py-2 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Avatar */}
            <div>
              <Label>Choose Avatar</Label>
              <div className="mt-2 flex justify-center gap-6">
                {Object.entries(avatars).map(([key, src]) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setAvatar(key)}
                    className={`rounded-full p-1 transition ${
                      avatar === key
                        ? "ring-2 ring-pink-500 scale-105"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={key}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <Label>Full Name</Label>
              <Input
                name="name"
                placeholder="Your name"
                required
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full rounded-xl"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </Button>

            {/* Login Redirect */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <span
                className="cursor-pointer text-pink-600 hover:underline"
                onClick={() => router.push(`/login?redirect=${redirectTo}`)}
              >
                Login
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
