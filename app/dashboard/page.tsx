"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { SignalCard } from "@/components/SignalCard";
import { LoadingGrid, ErrorState, EmptyState } from "@/components/States";
import { Card, Badge, Button } from "@/components/ui";
import { useAuth } from "@/lib/auth-context";
import { useLiveSignals } from "@/lib/hooks";
import { subscriptionApi } from "@/lib/api";
import type { SubscriptionStatus } from "@/lib/types";
import { TrendingUp, Zap, Sparkles } from "lucide-react";

function daysLeft(iso: string | null): number | null {
  if (!iso) return null;
  const diff = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function DashboardHomePage() {
  const { user } = useAuth();
  const { signals, loading, error, refresh } = useLiveSignals();
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);

  useEffect(() => {
    subscriptionApi.getStatus().then(setStatus).catch(() => {});
  }, []);

  const firstName = user?.full_name?.split(" ")[0] || "there";
  const trialDays = status?.is_on_trial ? daysLeft(status.trial_expiry) : null;

  return (
    <div>
      <PageHeader title={`Welcome back, ${firstName}`} subtitle="Here's what's live right now." />

      {status && !status.is_paid_subscriber && (
        <Card className="mb-8 flex flex-wrap items-center justify-between gap-4 border-signal/30 bg-signal/[0.04] p-5">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-signal" />
            <div>
              <p className="text-sm font-medium text-ink-100">
                {status.is_on_trial
                  ? `Your free trial ends in ${trialDays} day${trialDays === 1 ? "" : "s"}`
                  : "You're on the free plan"}
              </p>
              <p className="text-xs text-ink-500">
                NIFTY 50 and XAUUSD are always free. Upgrade for full market access.
              </p>
            </div>
          </div>
          <Button href="/dashboard/subscription">View plans</Button>
        </Card>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <TrendingUp className="mb-2 h-5 w-5 text-signal" />
          <p className="font-display text-2xl font-semibold text-ink-100">
            {signals.filter((s) => "engine" in s && s.engine === "long_term").length}
          </p>
          <p className="text-sm text-ink-500">Long-term signals live</p>
        </Card>
        <Card className="p-5">
          <Zap className="mb-2 h-5 w-5 text-signal" />
          <p className="font-display text-2xl font-semibold text-ink-100">
            {signals.filter((s) => "engine" in s && s.engine === "short_term").length}
          </p>
          <p className="text-sm text-ink-500">Intraday signals live</p>
        </Card>
        <Card className="p-5">
          <Badge tone="signal">Status</Badge>
          <p className="mt-2 font-display text-2xl font-semibold text-ink-100">
            {status?.is_active ? "Active" : "Free"}
          </p>
          <p className="text-sm text-ink-500">{status?.plan || "Free access"}</p>
        </Card>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink-100">Live signals</h2>
        <div className="flex gap-2">
          <Button href="/dashboard/long-term" variant="ghost">
            Long-term →
          </Button>
          <Button href="/dashboard/short-term" variant="ghost">
            Intraday →
          </Button>
        </div>
      </div>

      {loading ? (
        <LoadingGrid />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : signals.length === 0 ? (
        <EmptyState
          title="No live signals yet"
          body="The engines refresh on a schedule — check back shortly, or explore the free NIFTY 50 and XAUUSD signals."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {signals.slice(0, 6).map((s) => (
            <SignalCard key={s.instrument} signal={s} />
          ))}
        </div>
      )}
    </div>
  );
}
