import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-950 bg-grid-fade px-6 py-16">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 font-display text-lg font-semibold"
        >
          <TrendingUp className="h-5 w-5 text-signal" strokeWidth={2.5} />
          Signal<span className="text-signal">Desk</span>
        </Link>

        <div className="rounded-lg border border-base-700 bg-base-850 p-8">
          <h1 className="mb-1 font-display text-2xl font-semibold text-ink-100">{title}</h1>
          <p className="mb-6 text-sm text-ink-500">{subtitle}</p>
          {children}
        </div>

        {footer && <p className="mt-6 text-center text-sm text-ink-500">{footer}</p>}
      </div>
    </div>
  );
}

export function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-sm font-medium text-ink-300">{label}</span>
      <input
        {...props}
        className="w-full rounded-md border border-base-600 bg-base-900 px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-700 focus:border-signal focus:outline-none"
      />
    </label>
  );
}
