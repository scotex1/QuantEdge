"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SignalCard } from "@/components/SignalCard";
import { LoadingGrid, ErrorState, EmptyState, UpgradePrompt } from "@/components/States";
import { Badge } from "@/components/ui";
import { useHistory } from "@/lib/hooks";

const STATUS_FILTERS = ["All", "Running", "Win", "Loss"] as const;

export default function SignalHistoryPage() {
  const { history, loading, error, statusCode, refresh } = useHistory({ limit: 100 });
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>("All");

  const filtered = useMemo(() => {
    return history.filter((s) => {
      const matchesQuery = s.instrument.toLowerCase().includes(query.toLowerCase());
      // Outcome tracking (Win/Loss) isn't computed by the backend yet — every
      // historical signal is treated as "Running" until that's added.
      const matchesStatus = status === "All" || status === "Running";
      return matchesQuery && matchesStatus;
    });
  }, [history, query, status]);

  const isLocked = statusCode === 402;

  return (
    <div>
      <PageHeader title="Signal History" subtitle="Every signal the engines have generated." />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-700" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search instrument…"
            className="w-full rounded-md border border-base-600 bg-base-900 py-2.5 pl-9 pr-3 text-sm text-ink-100 placeholder:text-ink-700 focus:border-signal focus:outline-none"
          />
        </div>

        <div className="flex gap-1 rounded-lg border border-base-700 bg-base-850 p-1">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              disabled={s === "Win" || s === "Loss"}
              title={s === "Win" || s === "Loss" ? "Outcome tracking coming soon" : undefined}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                status === s ? "bg-signal/15 text-signal" : "text-ink-500 hover:text-ink-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingGrid />
      ) : error ? (
        isLocked ? <UpgradePrompt /> : <ErrorState message={error} onRetry={refresh} />
      ) : filtered.length === 0 ? (
        <EmptyState title="No history yet" body="Signals will appear here as the engines run." />
      ) : (
        <>
          <p className="mb-4 flex items-center gap-2 text-xs text-ink-700">
            <Badge tone="neutral">Note</Badge>
            Win/Loss outcome tracking isn't wired up yet — all past signals show as Running.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i) => (
              <SignalCard key={`${s.instrument}-${s.generated_at}-${i}`} signal={s} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
