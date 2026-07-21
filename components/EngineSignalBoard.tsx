"use client";

import { useMemo, useState } from "react";
import { SignalCard } from "@/components/SignalCard";
import { LoadingGrid, ErrorState, EmptyState, UpgradePrompt } from "@/components/States";
import { useLiveSignals } from "@/lib/hooks";
import { isTradeSignal } from "@/lib/types";
import type { EngineType } from "@/lib/types";
import { Sparkles } from "lucide-react";

const TABS = [
  { key: "stocks", label: "Indian Stocks" },
  { key: "forex", label: "Forex" },
  { key: "crypto", label: "Crypto" },
  { key: "ai", label: "AI Analysis" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function EngineSignalBoard({ engine }: { engine: EngineType }) {
  const { signals, loading, error, statusCode, refresh } = useLiveSignals();
  const [tab, setTab] = useState<TabKey>("stocks");

  // Long-term engine also carries NIFTY50's index trend (no `engine` field on
  // IndexTrendSignal), so we include index instruments under the long-term view.
  const engineSignals = useMemo(() => {
    return signals.filter((s) => {
      if (isTradeSignal(s)) return s.engine === engine;
      return engine === "long_term" && s.asset_type === "index";
    });
  }, [signals, engine]);

  const byTab = useMemo(() => {
    return {
      stocks: engineSignals.filter((s) => s.asset_type === "stock" || s.asset_type === "index"),
      forex: engineSignals.filter((s) => s.asset_type === "forex"),
      crypto: engineSignals.filter((s) => s.asset_type === "crypto"),
      ai: engineSignals.filter((s) => Boolean(s.ai_analysis)),
    };
  }, [engineSignals]);

  const visible = byTab[tab];

  return (
    <div>
      <div className="mb-6 flex gap-1 rounded-lg border border-base-700 bg-base-850 p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              tab === t.key ? "bg-signal/15 text-signal" : "text-ink-500 hover:text-ink-100"
            }`}
          >
            {t.key === "ai" && <Sparkles className="mr-1.5 inline h-3.5 w-3.5" />}
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingGrid />
      ) : error ? (
        statusCode === 402 ? <UpgradePrompt /> : <ErrorState message={error} onRetry={refresh} />
      ) : visible.length === 0 ? (
        <EmptyState
          title="No signals in this view yet"
          body="The engine re-evaluates on a schedule. Free NIFTY 50 and XAUUSD signals are always visible under Indian Stocks and Forex."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <SignalCard key={s.instrument} signal={s} />
          ))}
        </div>
      )}
    </div>
  );
}
