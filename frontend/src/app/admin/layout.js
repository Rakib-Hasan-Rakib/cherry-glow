"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import Sidebar from "@/components/admin/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { getAuth } from "firebase/auth";

export default function AdminLayout({ children }) {
  const{loading, user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      if (loading) return; // ⛔ wait

      if (!user || user.role !== "admin") {
        router.push("/login");
        return;
      }

      try {
        const token = await getAuth().currentUser?.getIdToken();

        // call admin API here if needed
      } catch (err) {
        console.error(err);
      }
    };

    checkAdmin();
  }, [user, loading]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
