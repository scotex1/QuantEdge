"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Card, Button, Badge } from "@/components/ui";
import { LoadingGrid, ErrorState } from "@/components/States";
import { useAuth } from "@/lib/auth-context";
import { subscriptionApi, ApiError } from "@/lib/api";
import { useRazorpayScript } from "@/lib/use-razorpay";
import type { Plan, SubscriptionStatus } from "@/lib/types";

const proFeatures = [
  "Indian stocks: ITC, Wipro, HDFC Bank",
  "Forex: XAUUSD, EURUSD",
  "Crypto: BTCUSDT, SOLUSDT",
  "Long-term and intraday engines",
  "AI-narrated analysis on every signal",
];

export default function SubscriptionPage() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const razorpayReady = useRazorpayScript();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payingPlan, setPayingPlan] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [plansData, statusData] = await Promise.all([
        subscriptionApi.getPlans(),
        subscriptionApi.getStatus(),
      ]);
      setPlans(plansData);
      setStatus(statusData);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't load subscription details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUpgrade(plan: Plan) {
    if (!razorpayReady) return;
    setPayingPlan(plan.plan_id);
    try {
      const order = await subscriptionApi.createOrder(plan.plan_id);

      const rzp = new window.Razorpay({
        key: order.razorpay_key_id,
        amount: order.amount,
        currency: order.currency,
        name: "SignalDesk",
        description: plan.name,
        order_id: order.order_id,
        prefill: { name: user?.full_name, email: user?.email },
        theme: { color: "#F2B705" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await subscriptionApi.verifyPayment(plan.plan_id, response);
            await Promise.all([load(), refreshUser()]);
            router.push("/dashboard/payment-history");
          } catch {
            setError("Payment verification failed. If you were charged, contact support.");
          }
        },
        modal: { ondismiss: () => setPayingPlan(null) },
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't start checkout.");
    } finally {
      setPayingPlan(null);
    }
  }

  if (loading) return <LoadingGrid count={3} />;
  if (error && !status) return <ErrorState message={error} onRetry={load} />;

  return (
    <div>
      <PageHeader title="Subscription" subtitle="Manage your plan and billing." />

      <Card className="mb-8 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-signal/10">
              <ShieldCheck className="h-5 w-5 text-signal" />
            </div>
            <div>
              <p className="text-sm text-ink-500">Current plan</p>
              <p className="font-display text-lg font-semibold text-ink-100">
                {status?.is_paid_subscriber
                  ? status.plan
                  : status?.is_on_trial
                  ? "10-day free trial"
                  : "Free plan"}
              </p>
            </div>
          </div>
          <Badge tone={status?.is_active ? "bull" : "neutral"}>
            {status?.is_active ? "Active" : "Limited access"}
          </Badge>
        </div>
        {status?.subscription_expiry && (
          <p className="mt-4 text-sm text-ink-500">
            Renews / expires on{" "}
            {new Date(status.subscription_expiry).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
        {status?.is_on_trial && status.trial_expiry && (
          <p className="mt-4 text-sm text-ink-500">
            Trial ends{" "}
            {new Date(status.trial_expiry).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </Card>

      <h2 className="mb-4 font-display text-lg font-semibold text-ink-100">
        {status?.is_paid_subscriber ? "Change plan" : "Upgrade"}
      </h2>

      {error && (
        <p className="mb-4 rounded-md border border-bear/30 bg-bear-dim px-3 py-2 text-sm text-bear">
          {error}
        </p>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = status?.plan === plan.plan_id && status?.is_paid_subscriber;
          return (
            <Card key={plan.plan_id} className="flex flex-col p-6">
              <p className="eyebrow mb-1">{plan.duration_days}-day access</p>
              <h3 className="mb-4 font-display text-xl font-semibold text-ink-100">{plan.name}</h3>
              <p className="mb-6 font-display text-3xl font-semibold text-ink-100">
                ₹{plan.price_inr.toLocaleString("en-IN")}
              </p>
              <ul className="mb-6 flex-1 space-y-2.5 text-sm text-ink-300">
                {proFeatures.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="h-4 w-4 shrink-0 text-signal" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                disabled={isCurrent || payingPlan === plan.plan_id || !razorpayReady}
                onClick={() => handleUpgrade(plan)}
              >
                {isCurrent
                  ? "Current plan"
                  : payingPlan === plan.plan_id
                  ? "Opening checkout…"
                  : `Pay with Razorpay`}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
