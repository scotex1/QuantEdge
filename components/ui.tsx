import { ReactNode } from "react";
import Link from "next/link";

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  onClick,
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-signal text-base-950 hover:bg-signal-light",
    outline: "border border-base-600 text-ink-100 hover:border-signal hover:text-signal",
    ghost: "text-ink-300 hover:text-ink-100",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "bull" | "bear" | "neutral" | "signal";
}) {
  const tones = {
    bull: "bg-bull-dim text-bull border-bull/30",
    bear: "bg-bear-dim text-bear border-bear/30",
    neutral: "bg-base-800 text-ink-500 border-base-600",
    signal: "bg-signal/10 text-signal border-signal/30",
  };
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-base-700 bg-base-850 ${className}`}>{children}</div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-3">{children}</p>;
}
