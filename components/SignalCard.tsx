import { Badge, Card } from "./ui";
import type { AnySignal } from "@/lib/types";
import { isTradeSignal } from "@/lib/types";
import { Sparkles, Clock } from "lucide-react";

function fmtNum(n: number | null | undefined) {
  if (n === null || n === undefined) return "—";
  return n.toLocaleString(undefined, { maximumFractionDigits: 5 });
}

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function SignalCard({ signal }: { signal: AnySignal }) {
  const trade = isTradeSignal(signal);
  const action = trade ? signal.signal : signal.trend;
  const tone =
    action === "BUY" || signal.trend === "Bullish"
      ? "bull"
      : action === "SELL" || signal.trend === "Bearish"
      ? "bear"
      : "neutral";

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-ink-100">{signal.instrument}</p>
          <p className="text-xs uppercase tracking-wide text-ink-500">{signal.asset_type}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Badge tone={tone as "bull" | "bear" | "neutral"}>
            {trade ? signal.signal : signal.trend}
          </Badge>
          {trade && signal.status && signal.status !== "N/A" && (
            <Badge
              tone={
                signal.status === "WIN" ? "bull" : signal.status === "LOSS" ? "bear" : "signal"
              }
            >
              {signal.status}
            </Badge>
          )}
        </div>
      </div>

      {trade && signal.signal !== "NO_TRADE" ? (
        <div className="grid grid-cols-2 gap-3 mono-num text-sm sm:grid-cols-5">
          <Metric label="Entry" value={fmtNum(signal.entry)} />
          <Metric label="Stop Loss" value={fmtNum(signal.stop_loss)} tone="bear" />
          <Metric label="TP1" value={fmtNum(signal.tp1)} tone="bull" />
          <Metric label="TP2" value={fmtNum(signal.tp2)} tone="bull" />
          <Metric label="R:R" value={signal.risk_reward ? `1:${signal.risk_reward}` : "—"} />
        </div>
      ) : trade && signal.signal === "NO_TRADE" ? (
        <p className="text-sm text-ink-500">
          No aligned entry right now — trend and timeframe confirmation are not in sync. Engine
          will re-evaluate on the next cycle.
        </p>
      ) : (
        <p className="text-sm text-ink-500">
          Direction-only signal — no entry, stop loss, or targets for index instruments.
        </p>
      )}

      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-base-800">
          <div
            className="h-full rounded-full bg-signal"
            style={{ width: `${Math.min(signal.confidence, 100)}%` }}
          />
        </div>
        <span className="mono-num text-xs text-signal">{signal.confidence}%</span>
      </div>

      {signal.ai_analysis && (
        <div className="rounded-md border border-base-700 bg-base-900/60 p-3">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-signal">
            <Sparkles className="h-3.5 w-3.5" /> AI Insight
          </p>
          <p className="text-sm leading-relaxed text-ink-300">
            {signal.ai_analysis.professional_analysis}
          </p>
        </div>
      )}

      <div className="hairline flex items-center justify-between pt-3 text-xs text-ink-700">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" /> {fmtDate(signal.generated_at)}
        </span>
        <span className="uppercase tracking-wide">
          {trade ? signal.engine.replace("_", " ") : "index trend"}
        </span>
      </div>
    </Card>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "bull" | "bear";
}) {
  const color = tone === "bull" ? "text-bull" : tone === "bear" ? "text-bear" : "text-ink-100";
  return (
    <div>
      <p className="mb-0.5 text-[10px] uppercase tracking-wide text-ink-700">{label}</p>
      <p className={`font-semibold ${color}`}>{value}</p>
    </div>
  );
}
