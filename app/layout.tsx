import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "SignalDesk — Long-Term & Intraday Trading Signals",
  description:
    "AI-narrated BUY/SELL signals for Indian stocks, forex, and crypto — long-term and intraday, with entry, stop loss, and targets.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-base-950 text-ink-100 font-body antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

