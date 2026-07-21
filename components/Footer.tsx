import Link from "next/link";
import { TrendingUp } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#markets", label: "Markets" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/refund-policy", label: "Refund Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-base-700 bg-base-950">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
              <TrendingUp className="h-5 w-5 text-signal" strokeWidth={2.5} />
              Signal<span className="text-signal">Desk</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-ink-500">
              AI-narrated trading signals for Indian stocks, forex, and crypto — long-term and
              intraday.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink-500 hover:text-ink-100">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline mt-10 flex flex-col gap-3 pt-6 text-xs text-ink-700 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} SignalDesk. All rights reserved.</p>
          <p className="max-w-2xl">
            Signals are generated for informational and educational purposes only and do not
            constitute investment advice. Trading involves risk. See our{" "}
            <Link href="/disclaimer" className="underline hover:text-ink-300">
              disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
