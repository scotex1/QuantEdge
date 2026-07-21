"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  TrendingUp as Logo,
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

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-base-700 bg-base-900 md:flex">
      <Link href="/" className="flex items-center gap-2 border-b border-base-700 px-6 py-5 font-display text-lg font-semibold">
        <Logo className="h-5 w-5 text-signal" strokeWidth={2.5} />
        Signal<span className="text-signal">Desk</span>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-signal/10 text-signal font-semibold"
                      : "text-ink-300 hover:bg-base-800 hover:text-ink-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-base-700 p-4">
        <div className="mb-3 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-signal/15 text-xs font-semibold text-signal">
            {user?.full_name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink-100">{user?.full_name || "User"}</p>
            <p className="truncate text-xs text-ink-700">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-ink-500 hover:bg-base-800 hover:text-bear"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
