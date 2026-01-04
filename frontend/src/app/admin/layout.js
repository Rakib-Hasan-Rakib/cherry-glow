"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push("/login");
        return;
      }

      const token = await user.getIdToken(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/check`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        router.push("/");
      }
    };

    checkAdmin();
  }, [router]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-muted/40">{children}</main>
    </div>
  );
}
