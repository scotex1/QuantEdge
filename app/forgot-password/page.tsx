"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AuthShell, Field } from "@/components/AuthShell";
import { Button } from "@/components/ui";
import { sendPasswordResetEmail } from "@/lib/firebase-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await sendPasswordResetEmail(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a link to set a new one."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-signal">
            Log in
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <CheckCircle2 className="h-10 w-10 text-bull" />
          <p className="text-sm text-ink-300">
            If an account exists for <span className="text-ink-100">{email}</span>, a reset link
            is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Field
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          {error && (
            <p className="mb-4 rounded-md border border-bear/30 bg-bear-dim px-3 py-2 text-sm text-bear">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending…" : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
