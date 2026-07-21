import { PageHeader } from "@/components/PageHeader";
import { EngineSignalBoard } from "@/components/EngineSignalBoard";

export default function LongTermPage() {
  return (
    <div>
      <PageHeader
        title="Long-Term Signals"
        subtitle="Daily trend, EMA50/EMA200, RSI14, confirmed on the 1H chart. Includes NIFTY 50 trend direction."
      />
      <EngineSignalBoard engine="long_term" />
    </div>
  );
}
