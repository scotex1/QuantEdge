"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SignalCard } from "@/components/SignalCard";
import { LoadingGrid, ErrorState, EmptyState, UpgradePrompt } from "@/components/States";
import { useHistory } from "@/lib/hooks";
import { isTradeSignal } from "@/lib/types";

const STATUS_FILTERS = ["All", "Running", "Win", "Loss"] as const;

export default function SignalHistoryPage() {
  const { history, loading, error, statusCode, refresh } = useHistory({ limit: 100 });
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>("All");

  const filtered = useMemo(() => {
    return history.filter((s) => {
      const matchesQuery = s.instrument.toLowerCase().includes(query.toLowerCase());
      if (status === "All") return matchesQuery;
      if (!isTradeSignal(s)) return false; // index trend signals have no Win/Loss status
      return matchesQuery && s.status === status.toUpperCase();
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
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <SignalCard key={`${s.instrument}-${s.generated_at}-${i}`} signal={s} />
          ))}
        </div>
      )}
    </div>
  );
}
