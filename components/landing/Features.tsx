import { SectionLabel } from "@/components/ui";
import { LineChart, ShieldCheck, Sparkles, Timer } from "lucide-react";

const features = [
  {
    icon: LineChart,
    title: "Two engines, two horizons",
    body:
      "A long-term engine reads daily trend with EMA50/EMA200 and RSI, confirmed on the 1H chart. A short-term engine reads the 4H EMA stack, confirms on 1H RSI, and times entry on the 15M chart.",
  },
  {
    icon: ShieldCheck,
    title: "Entry, stop loss, two targets",
    body:
      "Every trade signal ships with an ATR-based stop loss and two take-profit levels, so risk is defined before you're in the trade — never a bare arrow.",
  },
  {
    icon: Sparkles,
    title: "AI reads the setup, not the tape",
    body:
      "The AI layer only ever sees the engine's finished output — trend, indicators, confidence — and narrates why, in plain language. It never touches raw market data directly.",
  },
  {
    icon: Timer,
    title: "Confidence, scored",
    body:
      "Every signal carries a 0–100 confidence score built from indicator alignment strength, so you can size conviction, not just direction.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-base-700 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>How it works</SectionLabel>
        <h2 className="max-w-lg font-display text-3xl font-semibold text-ink-100">
          A disciplined engine, explained in plain words.
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-base-700 bg-base-700 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="bg-base-900 p-7">
              <f.icon className="mb-4 h-5 w-5 text-signal" strokeWidth={1.75} />
              <h3 className="mb-2 font-display text-lg font-semibold text-ink-100">{f.title}</h3>
              <p className="text-sm leading-relaxed text-ink-500">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
