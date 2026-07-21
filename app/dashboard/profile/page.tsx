"use client";

import { useEffect, useState } from "react";
import { Camera, LogOut } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Card, Button, Badge } from "@/components/ui";
import { Field } from "@/components/AuthShell";
import { useAuth } from "@/lib/auth-context";
import { subscriptionApi } from "@/lib/api";
import type { SubscriptionStatus } from "@/lib/types";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);

  useEffect(() => {
    subscriptionApi.getStatus().then(setStatus).catch(() => {});
  }, []);

  return (
    <div>
      <PageHeader title="Profile" subtitle="Your account details." />

      <Card className="mb-6 p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-signal/15 font-display text-2xl font-semibold text-signal">
              {user?.full_name?.[0]?.toUpperCase() || "U"}
            </div>
            <button
              title="Photo upload isn't connected yet"
              disabled
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-base-700 bg-base-900 text-ink-500 opacity-60"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-ink-100">{user?.full_name}</p>
            <p className="text-sm text-ink-500">{user?.email}</p>
          </div>
        </div>
      </Card>

      <Card className="mb-6 p-6">
        <h2 className="mb-4 font-display text-base font-semibold text-ink-100">
          Account information
        </h2>
        <Field label="Full name" value={user?.full_name || ""} disabled />
        <Field label="Email" value={user?.email || ""} disabled />
        <p className="text-xs text-ink-700">
          Name and email are managed via your account provider. Contact support to change them.
        </p>
      </Card>

      <Card className="mb-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="font-display text-base font-semibold text-ink-100">Subscription</h2>
          <p className="mt-1 text-sm text-ink-500">
            {status?.is_paid_subscriber
              ? `${status.plan} — active`
              : status?.is_on_trial
              ? "10-day free trial active"
              : "Free plan — NIFTY 50 & XAUUSD only"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge tone={status?.is_active ? "bull" : "neutral"}>
            {status?.is_active ? "Active" : "Limited"}
          </Badge>
          <Button href="/dashboard/subscription" variant="outline">
            Renew plan
          </Button>
        </div>
      </Card>

      <Button variant="outline" onClick={logout} className="text-bear">
        <LogOut className="h-4 w-4" /> Logout
      </Button>
    </div>
  );
}
