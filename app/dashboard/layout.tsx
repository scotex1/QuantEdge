"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Sidebar } from "@/components/Sidebar";
import { MobileTopbar } from "@/components/MobileTopbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-950">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-base-700 border-t-signal" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-base-950">
      <Sidebar />
      <MobileTopbar />
      <main className="md:pl-64">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">{children}</div>
      </main>
    </div>
  );
}
