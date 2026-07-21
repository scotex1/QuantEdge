"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, Button } from "@/components/ui";
import { useAuth } from "@/lib/auth-context";
import { sendPasswordResetEmail } from "@/lib/firebase-client";

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-medium text-ink-100">{label}</p>
        <p className="text-xs text-ink-500">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-signal" : "bg-base-700"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-base-950 transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [newSignal, setNewSignal] = useState(true);
  const [expiry, setExpiry] = useState(true);
  const [payments, setPayments] = useState(true);
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  async function handlePasswordReset() {
    if (!user?.email) return;
    setResetError(null);
    try {
      await sendPasswordResetEmail(user.email);
      setResetSent(true);
    } catch (err) {
      setResetError(err instanceof Error ? err.message : "Couldn't send reset email.");
    }
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Notifications, security, and account controls." />

      <Card className="mb-6 p-6">
        <h2 className="mb-1 font-display text-base font-semibold text-ink-100">Notifications</h2>
        <p className="mb-2 text-xs text-ink-700">
          Preferences below are stored locally in this session — persisting them needs a backend
          settings endpoint.
        </p>
        <div className="divide-y divide-base-700">
          <Toggle
            checked={newSignal}
            onChange={setNewSignal}
            label="New signal alerts"
            description="Get notified when a high-confidence signal fires"
          />
          <Toggle
            checked={expiry}
            onChange={setExpiry}
            label="Subscription expiry"
            description="Reminders before your plan or trial ends"
          />
          <Toggle
            checked={payments}
            onChange={setPayments}
            label="Payment confirmations"
            description="Receipts and payment status updates"
          />
        </div>
      </Card>

      <Card className="mb-6 p-6">
        <h2 className="mb-1 font-display text-base font-semibold text-ink-100">Security</h2>
        <p className="mb-4 text-xs text-ink-500">Reset your password via email.</p>
        {resetSent ? (
          <p className="text-sm text-bull">Reset link sent to {user?.email}.</p>
        ) : (
          <Button variant="outline" onClick={handlePasswordReset}>
            Send password reset email
          </Button>
        )}
        {resetError && <p className="mt-3 text-sm text-bear">{resetError}</p>}
      </Card>

      <Card className="border-bear/20 p-6">
        <h2 className="mb-1 font-display text-base font-semibold text-ink-100">Danger zone</h2>
        <p className="mb-4 text-xs text-ink-500">
          Account deletion is handled by support to make sure billing is settled first.
        </p>
        <Button href="/contact" variant="outline" className="text-bear">
          Request account deletion
        </Button>
      </Card>
    </div>
  );
}
