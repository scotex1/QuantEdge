import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl font-semibold text-ink-100">{title}</h1>
        {updated && <p className="mt-2 text-sm text-ink-700">Last updated: {updated}</p>}
        <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-ink-300">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 font-display text-lg font-semibold text-ink-100">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
