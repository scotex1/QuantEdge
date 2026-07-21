import { SectionLabel } from "@/components/ui";
import { Sparkles } from "lucide-react";

export function AIAnalysisSection() {
  return (
    <section id="ai-analysis" className="border-b border-base-700 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionLabel>AI analysis</SectionLabel>
          <h2 className="max-w-md font-display text-3xl font-semibold text-ink-100">
            The engine decides. The AI explains.
          </h2>
          <p className="mt-4 max-w-md text-ink-500">
            Once the long-term or short-term engine finishes its math — trend, indicators,
            entry, stop loss, targets, confidence — that finished output, and only that output,
            is handed to the AI layer. It never reads price feeds directly, so the narration
            can&apos;t drift from what the engine actually computed.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ink-300">
            <li className="flex gap-3">
              <span className="mono-num text-signal">01</span>
              Professional analysis of the trend and setup
            </li>
            <li className="flex gap-3">
              <span className="mono-num text-signal">02</span>
              Trade summary in plain language
            </li>
            <li className="flex gap-3">
              <span className="mono-num text-signal">03</span>
              Risk summary weighed against confidence
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-base-700 bg-base-850 p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display font-semibold text-ink-100">XAUUSD</span>
            <span className="rounded border border-bull/30 bg-bull-dim px-2 py-0.5 font-mono text-xs font-semibold text-bull">
              BUY
            </span>
          </div>
          <div className="mb-4 grid grid-cols-4 gap-3 mono-num text-xs">
            <div>
              <p className="text-ink-700">Entry</p>
              <p className="text-ink-100">2,418.30</p>
            </div>
            <div>
              <p className="text-ink-700">SL</p>
              <p className="text-bear">2,401.10</p>
            </div>
            <div>
              <p className="text-ink-700">TP1</p>
              <p className="text-bull">2,435.50</p>
            </div>
            <div>
              <p className="text-ink-700">TP2</p>
              <p className="text-bull">2,452.70</p>
            </div>
          </div>
          <div className="rounded-md border border-base-700 bg-base-900/70 p-4">
            <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-signal">
              <Sparkles className="h-3.5 w-3.5" /> AI Insight
            </p>
            <p className="text-sm leading-relaxed text-ink-300">
              Gold is holding a bullish daily structure above both EMA50 and EMA200, with RSI
              confirming momentum above the midline. The 1H chart has aligned with this bias,
              triggering entry on the pullback close.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
