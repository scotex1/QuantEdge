"use client";

export interface TickerItem {
  instrument: string;
  action: "BUY" | "SELL" | "TREND";
  value: string;
  confidence: number;
}

function TickerCard({ item }: { item: TickerItem }) {
  const tone =
    item.action === "BUY"
      ? "text-bull border-bull/30"
      : item.action === "SELL"
      ? "text-bear border-bear/30"
      : "text-signal border-signal/30";

  return (
    <div
      className={`flex shrink-0 items-center gap-3 rounded border bg-base-900/80 px-4 py-2.5 font-mono text-xs ${tone}`}
    >
      <span className="font-semibold text-ink-100">{item.instrument}</span>
      <span className={`font-bold ${tone.split(" ")[0]}`}>{item.action}</span>
      <span className="text-ink-500">{item.value}</span>
      <span className="text-ink-700">·</span>
      <span>{item.confidence}%</span>
    </div>
  );
}

export function SignalTicker({ items }: { items: TickerItem[] }) {
  const loop = [...items, ...items];
  return (
    <div className="scrollbar-thin overflow-hidden border-y border-base-700 bg-base-900/50 py-3">
      <div className="flex w-max animate-[ticker_32s_linear_infinite] gap-3 px-3 hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <TickerCard key={`${item.instrument}-${i}`} item={item} />
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
