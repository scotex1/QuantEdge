"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionLabel } from "@/components/ui";

const faqs = [
  {
    q: "Is this SEBI-registered investment advice?",
    a: "No. SignalDesk is a technical analysis and signal-generation tool for informational and educational purposes only. It is not a registered investment advisor, and nothing here is a recommendation to buy or sell any security. See our disclaimer for full details.",
  },
  {
    q: "How is a signal actually generated?",
    a: "A rules-based engine reads trend on a higher timeframe (Daily for long-term, 4H for intraday) using EMA and RSI, then confirms entry timing on a lower timeframe before producing a BUY, SELL, or NO_TRADE result with an ATR-based stop loss and two targets.",
  },
  {
    q: "What's free forever?",
    a: "NIFTY 50 trend direction and XAUUSD (Gold) BUY/SELL signals are free for every registered user, no subscription required.",
  },
  {
    q: "What happens after my 10-day trial?",
    a: "You keep free access to NIFTY 50 and XAUUSD. Every other instrument — Indian stocks, EURUSD, and crypto — requires an active subscription.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Subscriptions don't auto-lock you in beyond the plan period you purchased. See our refund policy for details on eligibility.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-base-700 py-20">
      <div className="mx-auto max-w-3xl px-6">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="mb-10 font-display text-3xl font-semibold text-ink-100">
          Questions, answered plainly.
        </h2>

        <div className="divide-y divide-base-700 border-y border-base-700">
          {faqs.map((item, i) => (
            <div key={item.q}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-ink-100">{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-ink-500 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <p className="pb-5 text-sm leading-relaxed text-ink-500">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
