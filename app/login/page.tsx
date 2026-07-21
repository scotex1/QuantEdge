"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { AuthShell, Field } from "@/components/AuthShell";
import { Button } from "@/components/ui";
import { useAuth } from "@/lib/auth-context";
import { ApiError } from "@/lib/api";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Log in"
      subtitle="Welcome back — check today's signals."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-signal">
            Start free trial
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <Field
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Field
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <div className="mb-5 flex justify-end">
          <Link href="/forgot-password" className="text-sm text-ink-500 hover:text-signal">
            Forgot password?
          </Link>
        </div>

        {error && (
          <p className="mb-4 rounded-md border border-bear/30 bg-bear-dim px-3 py-2 text-sm text-bear">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </Button>
      </form>
    </AuthShell>
  );
}
