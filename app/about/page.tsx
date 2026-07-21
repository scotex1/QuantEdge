import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export default function AboutPage() {
  return (
    <LegalLayout title="About SignalDesk">
      <LegalSection heading="What we build">
        <p>
          SignalDesk runs a rules-based signal engine across Indian stocks, forex, and crypto —
          split into a long-term engine (daily trend, 1H entry) and a short-term intraday engine
          (4H trend, 15M entry). Every signal carries an entry, stop loss, two targets, and a
          confidence score, narrated in plain language by an AI layer that only ever reads the
          engine's finished output.
        </p>
      </LegalSection>
      <LegalSection heading="Our approach">
        <p>
          We favour a small, deliberate instrument list over broad coverage — currently ITC,
          Wipro, HDFC Bank, and NIFTY 50 in Indian markets; Gold and EUR/USD in forex; and
          BTC/USDT and SOL/USDT in crypto. Depth over breadth.
        </p>
      </LegalSection>
      <LegalSection heading="Not investment advice">
        <p>
          SignalDesk is a technical-analysis and educational tool. We are not a SEBI-registered
          investment advisor or research analyst. Please read our{" "}
          <a href="/disclaimer" className="text-signal underline">
            disclaimer
          </a>{" "}
          before trading on any signal.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
