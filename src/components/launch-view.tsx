import { launchItems } from "@/content/manual";
import { useChecklist } from "@/lib/checklist";
import { SectionTitle } from "@/components/ui-bits";

export function LaunchView() {
  const { checks, toggle, reset } = useChecklist("roadcrest-launch");
  const done = launchItems.filter((item) => checks[item.id]).length;
  const pct = Math.round((done / launchItems.length) * 100);

  let lastPhase = "";

  return (
    <div className="space-y-6">
      <SectionTitle
        kicker="Launch list"
        title="Nothing active until the filing posts"
        lede="Insurance quote and cash first. Then the entity, then FMCSA, then the cab. Check them off as they actually happen. This list stays on the phone."
      />

      <section className="bg-navy p-4 text-paper">
        <div className="flex items-end justify-between gap-3">
          <p className="font-display text-4xl leading-none tabular-nums">
            {done}
            <span className="text-2xl text-paper/70"> / {launchItems.length}</span>
          </p>
          <button type="button" onClick={reset} className="min-h-11 text-sm text-paper/80 underline">
            Reset
          </button>
        </div>
        <div className="mt-3 h-2 bg-paper/20">
          <div className="h-full bg-crest-bright" style={{ width: `${pct}%` }} />
        </div>
      </section>

      <ol className="grid gap-2">
        {launchItems.map((item, index) => {
          const showPhase = item.phase !== lastPhase;
          lastPhase = item.phase;
          const on = Boolean(checks[item.id]);
          return (
            <li key={item.id}>
              {showPhase ? (
                <p className="mt-3 mb-2 font-display text-sm tracking-widest text-crest uppercase">{item.phase}</p>
              ) : null}
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-pressed={on}
                className={`grid w-full grid-cols-[auto_1fr] gap-3 border px-3 py-3 text-left ${on ? "border-crest bg-card" : "border-line bg-card"}`}
              >
                <span className="font-display text-xl text-muted tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className={`block font-display text-xl leading-tight uppercase ${on ? "text-crest" : "text-navy"}`}>
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink">{item.text}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
