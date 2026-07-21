"use client";

import { useState, FormEvent } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button, Card } from "@/components/ui";
import { Field } from "@/components/AuthShell";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Support request from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:support@signaldesk.app?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-display text-3xl font-semibold text-ink-100">Contact us</h1>
        <p className="mt-2 max-w-lg text-ink-500">
          Questions about a signal, your subscription, or a payment — we usually reply within one
          business day.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            <Card className="flex items-center gap-3 p-5">
              <Mail className="h-5 w-5 text-signal" />
              <div>
                <p className="text-sm font-medium text-ink-100">Email</p>
                <p className="text-sm text-ink-500">support@signaldesk.app</p>
              </div>
            </Card>
            <Card className="flex items-center gap-3 p-5">
              <MessageCircle className="h-5 w-5 text-signal" />
              <div>
                <p className="text-sm font-medium text-ink-100">Response time</p>
                <p className="text-sm text-ink-500">Within 1 business day</p>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit}>
              <Field label="Name" required value={name} onChange={(e) => setName(e.target.value)} />
              <Field
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="mb-4 block">
                <span className="mb-1.5 block text-sm font-medium text-ink-300">Message</span>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-md border border-base-600 bg-base-900 px-3.5 py-2.5 text-sm text-ink-100 placeholder:text-ink-700 focus:border-signal focus:outline-none"
                />
              </label>
              <Button type="submit" className="w-full">
                Send message
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
