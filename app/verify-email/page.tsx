"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/ui";
import { useAuth } from "@/lib/auth-context";

export default function VerifyEmailPage() {
  const { user } = useAuth();
  const [resent, setResent] = useState(false);

  return (
    <AuthShell title="Check your inbox" subtitle="One more step to secure your account.">
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-signal/10">
          <MailCheck className="h-7 w-7 text-signal" />
        </div>
        <p className="text-sm text-ink-300">
          We've sent a verification link to{" "}
          <span className="text-ink-100">{user?.email || "your email"}</span>. Click it to
          confirm your account.
        </p>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => setResent(true)}
          disabled={resent}
        >
          {resent ? "Email resent" : "Resend email"}
        </Button>

        <Button href="/dashboard" className="w-full">
          Continue to dashboard
        </Button>

        <p className="text-xs text-ink-700">
          You can explore your dashboard while unverified — some actions may ask you to verify
          first.
        </p>
      </div>
    </AuthShell>
  );
}
