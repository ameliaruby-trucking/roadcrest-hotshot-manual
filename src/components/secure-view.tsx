import { useMemo, useState } from "react";
import { gearItems } from "@/content/manual";
import { CHAIN_WLL, STRAP_WLL, strengthCount, tieDownCount } from "@/lib/calc";
import { useChecklist } from "@/lib/checklist";
import { Check } from "lucide-react";
import { Callout, lbs, SectionTitle, SliderField } from "@/components/ui-bits";

export function SecureView() {
  const [length, setLength] = useState(22);
  const [weight, setWeight] = useState(8500);
  const [machinery, setMachinery] = useState(false);
  const { checks, toggle, reset } = useChecklist("roadcrest-gear");

  const count = useMemo(() => tieDownCount(length, weight, machinery), [length, weight, machinery]);
  const straps = Math.max(count, strengthCount(weight, STRAP_WLL));
  const chains = Math.max(count, strengthCount(weight, CHAIN_WLL));
  const aggregate = weight * 0.5;
  const done = gearItems.filter((item) => checks[item.id]).length;

  let rule = "Two tie-downs. Between 5 and 10 feet, weight does not reduce the count.";
  if (length <= 5 && weight <= 1100) rule = "One tie-down. Short, and 1,100 lbs or under.";
  else if (length <= 5) rule = "Two tie-downs. Short, but over 1,100 lbs.";
  else if (length > 10) {
    rule = `Two for the first 10 feet, plus one for every extra 10 feet or part of 10. That is ${count} from length alone.`;
  }
  if (machinery && weight > 10000) {
    rule += " A wheeled machine over 10,000 lbs also needs four separate chains, front and rear, each on its own point.";
  }

  return (
    <div className="space-y-8">
      <SectionTitle
        kicker="Securement"
        title="Count before you throw the bar"
        lede="Minimum number of tie-downs, then enough working load limit to cover half the freight. Whichever number is higher is what you carry."
      />

      <section className="space-y-4 rounded-card border border-line bg-card p-4 sm:p-5">
        <SliderField label="Length of the article" min={2} max={40} step={1} value={length} display={`${length} ft`} onChange={setLength} />
        <SliderField label="Weight" min={200} max={20000} step={100} value={weight} display={lbs(weight)} onChange={setWeight} />
        <button
          type="button"
          onClick={() => setMachinery((value) => !value)}
          className={`min-h-11 w-full px-3 text-left font-display text-lg uppercase sm:w-auto ${machinery ? "bg-navy text-paper" : "border border-line text-navy"}`}
          aria-pressed={machinery}
        >
          {machinery ? "Wheeled machine over 10,000 lb" : "Not a wheeled machine"}
        </button>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Result label="Tie-downs" value={String(count)} note="Count rule" />
        <Result label="4-inch straps" value={String(straps)} note={`${STRAP_WLL.toLocaleString("en-US")} lb WLL`} />
        <Result label="Grade 70 chains" value={String(chains)} note={`${CHAIN_WLL.toLocaleString("en-US")} lb WLL`} />
      </section>

      <Callout tone="rule" title="Why this count">
        {rule} Aggregate working load limit required: {lbs(aggregate)}, half the cargo. Direct chains on a
        machine are not one chain looped through two points, and a boom or bucket wants its own extra
        tie-down.
      </Callout>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-sm tracking-widest text-crest uppercase">Toolbox</p>
            <h3 className="font-display text-3xl leading-none text-navy uppercase">
              {done} of {gearItems.length} on the trailer
            </h3>
          </div>
          <button type="button" onClick={reset} className="min-h-11 text-sm text-muted underline">
            Clear
          </button>
        </div>
        <p className="text-base text-ink">Budget $2,500–$3,800 before you book anything. Saved on this phone.</p>
        <ul className="grid gap-2">
          {gearItems.map((item) => {
            const on = Boolean(checks[item.id]);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-pressed={on}
                  className={`grid w-full grid-cols-[auto_1fr] gap-3 border px-3 py-3 text-left ${on ? "border-crest bg-card" : "border-line bg-card"}`}
                >
                  <span
                    className={`mt-1 grid size-6 place-items-center border ${on ? "border-crest bg-crest text-paper" : "border-line text-transparent"}`}
                    aria-hidden="true"
                  >
                    <Check className="size-4" strokeWidth={2.5} />
                  </span>
                  <span>
                    <span className="block font-display text-xl leading-tight text-navy uppercase">{item.name}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink">{item.spec}</span>
                    <span className="mt-1 block text-sm text-muted">{item.note}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Result({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="bg-navy p-4 text-paper">
      <p className="font-display text-sm tracking-widest uppercase text-paper/70">{label}</p>
      <p className="mt-1 font-display text-5xl leading-none tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-paper/75">{note}</p>
    </div>
  );
}
