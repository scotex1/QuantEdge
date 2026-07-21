import { Button } from "@/components/ui";
import { SignalTicker, TickerItem } from "@/components/SignalTicker";
import { ArrowRight } from "lucide-react";

const tickerItems: TickerItem[] = [
  { instrument: "XAUUSD", action: "BUY", value: "2418.30", confidence: 82 },
  { instrument: "EURUSD", action: "SELL", value: "1.0842", confidence: 71 },
  { instrument: "BTCUSDT", action: "BUY", value: "64,120", confidence: 76 },
  { instrument: "SOLUSDT", action: "SELL", value: "142.80", confidence: 68 },
  { instrument: "NIFTY50", action: "TREND", value: "Bullish", confidence: 74 },
  { instrument: "ITC", action: "BUY", value: "438.20", confidence: 79 },
  { instrument: "WIPRO", action: "SELL", value: "512.60", confidence: 65 },
  { instrument: "HDFCBANK", action: "BUY", value: "1,642", confidence: 83 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-base-700 bg-grid-fade">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pt-28">
        <p className="eyebrow mb-5">Long-term + intraday · Indian stocks, forex, crypto</p>
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-100 md:text-6xl">
          Every signal comes with a reason, not just an arrow.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-300">
          SignalDesk runs a rules-based engine on EMA, RSI, and multi-timeframe trend
          confirmation — then an AI layer explains the setup in plain language. Entry, stop loss,
          targets, and confidence, every time.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/signup" className="text-base">
            Start your 10-day free trial <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/#markets" variant="outline" className="text-base">
            See live markets
          </Button>
        </div>
        <p className="mt-4 text-xs text-ink-700">
          No card required · NIFTY 50 and Gold (XAUUSD) signals are always free
        </p>
      </div>
      <SignalTicker items={tickerItems} />
    </section>
  );
}
