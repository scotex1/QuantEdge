import { ReactNode } from "react";
import { Lock, AlertCircle, Inbox } from "lucide-react";
import { Button } from "./ui";

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-56 animate-pulse rounded-lg border border-base-700 bg-base-850" />
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-bear/20 bg-bear-dim/30 py-14 text-center">
      <AlertCircle className="h-8 w-8 text-bear" />
      <p className="text-sm text-ink-300">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

export function EmptyState({ title, body, icon }: { title: string; body: string; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-base-700 bg-base-850 py-14 text-center">
      {icon || <Inbox className="h-8 w-8 text-ink-700" />}
      <p className="font-medium text-ink-100">{title}</p>
      <p className="max-w-sm text-sm text-ink-500">{body}</p>
    </div>
  );
}

export function UpgradePrompt({ instrument }: { instrument?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-signal/20 bg-signal/[0.04] py-14 text-center">
      <Lock className="h-8 w-8 text-signal" />
      <p className="font-medium text-ink-100">
        {instrument ? `${instrument} needs an active plan` : "This needs an active plan"}
      </p>
      <p className="max-w-sm text-sm text-ink-500">
        NIFTY 50 and XAUUSD are always free. Everything else needs a subscription, or your 10-day
        trial if you're a new user.
      </p>
      <Button href="/dashboard/subscription">View plans</Button>
    </div>
  );
}
