"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, TrendingUp } from "lucide-react";
import { Button } from "./ui";
import { useAuth } from "@/lib/auth-context";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#markets", label: "Markets" },
  { href: "/#pricing", label: "Pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-base-700 bg-base-950/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <TrendingUp className="h-5 w-5 text-signal" strokeWidth={2.5} />
          Signal<span className="text-signal">Desk</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink-300 hover:text-ink-100">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Button href="/dashboard" variant="outline">
              Dashboard
            </Button>
          ) : (
            <>
              <Button href="/login" variant="ghost">
                Log in
              </Button>
              <Button href="/signup">Start free trial</Button>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-base-700 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-ink-300">
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              {user ? (
                <Button href="/dashboard">Dashboard</Button>
              ) : (
                <>
                  <Button href="/login" variant="outline">
                    Log in
                  </Button>
                  <Button href="/signup">Start free trial</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
