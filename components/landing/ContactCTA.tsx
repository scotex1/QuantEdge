import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-3xl font-semibold text-ink-100 md:text-4xl">
          Trade with a reason behind every signal.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-ink-500">
          10 days free, full access. No card required to start.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/signup" className="text-base">
            Start free trial <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/contact" variant="outline" className="text-base">
            Talk to us
          </Button>
        </div>
      </div>
    </section>
  );
}
