import { PageHeader } from "@/components/PageHeader";
import { EngineSignalBoard } from "@/components/EngineSignalBoard";

export default function ShortTermPage() {
  return (
    <div>
      <PageHeader
        title="Intraday Signals"
        subtitle="4H EMA5/10/20/30 trend, 1H RSI confirmation, entry timed on the 15M chart."
      />
      <EngineSignalBoard engine="short_term" />
    </div>
  );
}
