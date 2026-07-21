"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button, SectionLabel } from "@/components/ui";
import { subscriptionApi } from "@/lib/api";
import type { Plan } from "@/lib/types";

const FALLBACK_PLANS: Plan[] = [
  { plan_id: "monthly", name: "Monthly Plan", price_inr: 999, duration_days: 30 },
  { plan_id: "quarterly", name: "Quarterly Plan", price_inr: 2499, duration_days: 90 },
  { plan_id: "yearly", name: "Yearly Plan", price_inr: 8999, duration_days: 365 },
];

const proFeatures = [
  "Full access to Indian stocks, forex & crypto signals",
  "Long-term and intraday engines",
  "AI-narrated analysis on every signal",
  "Full signal history & tracking",
];

export function Pricing() {
  const [plans, setPlans] = useState<Plan[]>(FALLBACK_PLANS);

  useEffect(() => {
    subscriptionApi
      .getPlans()
      .then((data) => data.length && setPlans(data))
      .catch(() => setPlans(FALLBACK_PLANS));
  }, []);

  return (
    <section id="pricing" className="border-b border-base-700 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel>Pricing</SectionLabel>
        <h2 className="max-w-lg font-display text-3xl font-semibold text-ink-100">
          Start free. Upgrade when you're ready to trade everything.
        </h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {/* Free tier — informational, not a backend "plan" */}
          <div className="rounded-lg border border-base-700 bg-base-850 p-6">
            <p className="eyebrow mb-1">Always free</p>
            <h3 className="mb-1 font-display text-xl font-semibold text-ink-100">Free Plan</h3>
            <p className="mb-5 text-sm text-ink-500">
              NIFTY 50 trend + XAUUSD signals, no card needed
            </p>
            <p className="mb-6 font-display text-3xl font-semibold text-ink-100">₹0</p>
            <ul className="mb-6 space-y-2.5 text-sm text-ink-300">
              <li className="flex gap-2">
                <Check className="h-4 w-4 shrink-0 text-signal" /> NIFTY 50 trend signal
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 shrink-0 text-signal" /> XAUUSD BUY/SELL signal
              </li>
              <li className="flex gap-2">
                <Check className="h-4 w-4 shrink-0 text-signal" /> 10-day full trial on signup
              </li>
            </ul>
            <Button href="/signup" variant="outline" className="w-full">
              Get started
            </Button>
          </div>

          {plans.map((plan, i) => (
            <div
              key={plan.plan_id}
              className={`rounded-lg border p-6 ${
                i === 0
                  ? "border-signal/50 bg-signal/[0.04]"
                  : "border-base-700 bg-base-850"
              }`}
            >
              <p className="eyebrow mb-1">{plan.duration_days}-day access</p>
              <h3 className="mb-1 font-display text-xl font-semibold text-ink-100">{plan.name}</h3>
              <p className="mb-5 text-sm text-ink-500">Every market, both engines</p>
              <p className="mb-6 font-display text-3xl font-semibold text-ink-100">
                ₹{plan.price_inr.toLocaleString("en-IN")}
              </p>
              <ul className="mb-6 space-y-2.5 text-sm text-ink-300">
                {proFeatures.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="h-4 w-4 shrink-0 text-signal" /> {f}
                  </li>
                ))}
              </ul>
              <Button href={`/signup?plan=${plan.plan_id}`} className="w-full">
                Choose {plan.name.split(" ")[0]}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
