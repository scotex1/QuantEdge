"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Zap,
  History,
  CreditCard,
  Receipt,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/dashboard/long-term", label: "Long-Term Signals", icon: TrendingUp },
  { href: "/dashboard/short-term", label: "Intraday Signals", icon: Zap },
  { href: "/dashboard/history", label: "Signal History", icon: History },
  { href: "/dashboard/subscription", label: "Subscription", icon: CreditCard },
  { href: "/dashboard/payment-history", label: "Payment History", icon: Receipt },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function MobileTopbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-base-700 bg-base-900 px-4 py-3 md:hidden">
      <Link href="/" className="font-display text-base font-semibold">
        Signal<span className="text-signal">Desk</span>
      </Link>
      <button onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-base-950/95">
          <div className="flex items-center justify-between border-b border-base-700 px-4 py-3">
            <span className="font-display text-base font-semibold">Menu</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="px-3 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm ${
                        active ? "bg-signal/10 text-signal font-semibold" : "text-ink-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-bear"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
