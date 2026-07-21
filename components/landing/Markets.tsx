import { SectionLabel, Badge } from "@/components/ui";

const markets = [
  {
    group: "Indian Stocks",
    note: "Angel One SmartAPI",
    items: ["ITC", "WIPRO", "HDFCBANK"],
    free: [],
  },
  {
    group: "Index",
    note: "Trend direction only",
    items: ["NIFTY 50"],
    free: ["NIFTY 50"],
  },
  {
    group: "Forex",
    note: "Twelve Data",
    items: ["XAU/USD", "EUR/USD"],
    free: ["XAU/USD"],
  },
  {
    group: "Crypto",
    note: "CoinGecko",
    items: ["BTC/USDT", "SOL/USDT"],
    free: [],
  },
];

export function Markets() {
  return (
    <section id="markets" className="border-b border-base-700 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>Covered markets</SectionLabel>
        <h2 className="max-w-lg font-display text-3xl font-semibold text-ink-100">
          A focused set of instruments, tracked properly.
        </h2>
        <p className="mt-4 max-w-xl text-ink-500">
          Rather than spreading thin, SignalDesk tracks a fixed, deliberate instrument list —
          quality of signal over breadth of ticker.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {markets.map((m) => (
            <div key={m.group} className="rounded-lg border border-base-700 bg-base-850 p-6">
              <p className="eyebrow mb-1">{m.note}</p>
              <h3 className="mb-4 font-display text-lg font-semibold text-ink-100">{m.group}</h3>
              <ul className="space-y-2">
                {m.items.map((item) => (
                  <li key={item} className="flex items-center justify-between text-sm">
                    <span className="mono-num text-ink-300">{item}</span>
                    {m.free.includes(item) && <Badge tone="signal">Free</Badge>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
