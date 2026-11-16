import { useMemo, useState } from "react";
import { handbookFloor, stackExample } from "@/content/manual";
import { floorCost, rateVerdict, trueRate } from "@/lib/calc";
import { Callout, money, rpm, SectionTitle, SliderField } from "@/components/ui-bits";

type PartialLoad = { id: string; label: string; pay: number };

export function RateView() {
  const [fixed, setFixed] = useState(handbookFloor.fixed);
  const [miles, setMiles] = useState(handbookFloor.miles);
  const [fuel, setFuel] = useState(handbookFloor.fuel);
  const [maint, setMaint] = useState(handbookFloor.maint);
  const [wage, setWage] = useState(handbookFloor.wage);
  const [pay, setPay] = useState(handbookFloor.pay);
  const [loaded, setLoaded] = useState(handbookFloor.loaded);
  const [deadhead, setDeadhead] = useState(handbookFloor.deadhead);
  const [partials, setPartials] = useState<PartialLoad[]>(stackExample);
  const [useStack, setUseStack] = useState(false);

  const floor = useMemo(
    () => floorCost({ fixed, miles, fuel, maint, wage }),
    [fixed, miles, fuel, maint, wage],
  );

  const stackPay = partials.reduce((sum, item) => sum + item.pay, 0);
  const linehaul = useStack ? stackPay : pay;
  const rate = trueRate(linehaul, loaded, deadhead);
  const verdict = rateVerdict(rate, floor.total);
  const hub = loaded + deadhead;
  const left = linehaul - floor.total * hub;

  const parts = [
    { label: "Fixed", value: floor.fixedPer, className: "bg-navy" },
    { label: "Fuel", value: fuel, className: "bg-navy-2" },
    { label: "Upkeep", value: maint, className: "bg-crest" },
    { label: "Wage", value: wage, className: "bg-crest-bright" },
  ];
  const partSum = parts.reduce((sum, part) => sum + part.value, 0) || 1;

  function loadExample() {
    setFixed(handbookFloor.fixed);
    setMiles(handbookFloor.miles);
    setFuel(handbookFloor.fuel);
    setMaint(handbookFloor.maint);
    setWage(handbookFloor.wage);
    setPay(handbookFloor.pay);
    setLoaded(handbookFloor.loaded);
    setDeadhead(handbookFloor.deadhead);
    setPartials(stackExample);
    setUseStack(false);
  }

  const verdictCopy =
    verdict === "clear"
      ? "Clears the floor with room to be wrong."
      : verdict === "thin"
        ? "Covers cost. Almost nothing left if a tire goes."
        : "Under the floor. Turning the wheels does not make this a yes.";

  const verdictClass =
    verdict === "clear" ? "bg-crest text-paper" : verdict === "thin" ? "bg-warn-bg text-warn" : "bg-navy text-paper";

  return (
    <div className="space-y-6">
      <SectionTitle
        kicker="Rate desk"
        title="Price the hub, not the board"
        lede="Fixed costs spread over the month, then fuel, upkeep, and your wage. A load is judged on loaded miles plus the empty miles it took to reach it."
      />

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={loadExample} className="min-h-11 border border-navy px-3 font-display text-lg text-navy uppercase">
          Handbook example
        </button>
        <button
          type="button"
          onClick={() => setUseStack(false)}
          className={`min-h-11 px-3 font-display text-lg uppercase ${useStack ? "border border-line bg-card text-muted" : "bg-navy text-paper"}`}
        >
          One load
        </button>
        <button
          type="button"
          onClick={() => setUseStack(true)}
          className={`min-h-11 px-3 font-display text-lg uppercase ${useStack ? "bg-navy text-paper" : "border border-line bg-card text-muted"}`}
        >
          Stacked partials
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="space-y-4 rounded-card border border-line bg-card p-4 sm:p-5">
          <h3 className="font-display text-2xl text-navy uppercase">Monthly floor</h3>
          <SliderField label="Fixed costs" min={1800} max={6000} step={50} value={fixed} display={money(fixed)} onChange={setFixed} />
          <SliderField label="Miles you expect" min={4000} max={14000} step={100} value={miles} display={miles.toLocaleString("en-US")} onChange={setMiles} />
          <SliderField label="Fuel per mile" min={0.25} max={0.7} step={0.01} value={fuel} display={rpm(fuel)} onChange={setFuel} />
          <SliderField label="Maintenance per mile" min={0.08} max={0.35} step={0.01} value={maint} display={rpm(maint)} onChange={setMaint} />
          <SliderField label="Your wage per mile" min={0} max={1} step={0.01} value={wage} display={rpm(wage)} onChange={setWage} />
          <div>
            <div className="flex h-3 overflow-hidden rounded-full bg-line">
              {parts.map((part) => (
                <div key={part.label} className={part.className} style={{ width: `${(part.value / partSum) * 100}%` }} />
              ))}
            </div>
            <ul className="mt-2 grid grid-cols-2 gap-1 text-sm text-muted">
              {parts.map((part) => (
                <li key={part.label} className="tabular-nums">
                  {part.label} {rpm(part.value)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-4 rounded-card border border-line bg-card p-4 sm:p-5">
          <h3 className="font-display text-2xl text-navy uppercase">{useStack ? "Partials on one run" : "This load"}</h3>
          {useStack ? (
            <div className="space-y-3">
              {partials.map((item) => (
                <label key={item.id} className="block">
                  <span className="text-sm text-muted">{item.label}</span>
                  <input
                    className="mt-1 w-full border border-line bg-paper px-3 py-2 text-lg tabular-nums text-ink"
                    inputMode="decimal"
                    value={item.pay}
                    onChange={(event) => {
                      const payValue = Number(event.target.value);
                      setPartials((current) =>
                        current.map((row) => (row.id === item.id ? { ...row, pay: Number.isFinite(payValue) ? payValue : 0 } : row)),
                      );
                    }}
                  />
                </label>
              ))}
              <p className="text-sm text-muted">
                Combined linehaul {money(stackPay)}. Same miles for every piece — that is the point of a stack.
              </p>
            </div>
          ) : (
            <SliderField label="What the load pays" min={200} max={4000} step={25} value={pay} display={money(pay)} onChange={setPay} />
          )}
          <SliderField label="Loaded miles" min={50} max={1200} step={10} value={loaded} display={`${loaded.toLocaleString("en-US")} mi`} onChange={setLoaded} />
          <SliderField label="Deadhead to the pickup" min={0} max={600} step={10} value={deadhead} display={`${deadhead.toLocaleString("en-US")} mi`} onChange={setDeadhead} />
        </section>
      </div>

      <section className={`rounded-card p-5 ${verdictClass}`}>
        <p className="font-display text-sm tracking-widest uppercase opacity-80">All-in result</p>
        <div className="mt-2 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="font-display text-5xl leading-none tabular-nums">{rpm(floor.total)}</p>
            <p className="mt-1 text-sm opacity-80">Your floor per mile</p>
          </div>
          <div>
            <p className="font-display text-5xl leading-none tabular-nums">{rpm(rate)}</p>
            <p className="mt-1 text-sm opacity-80">
              {money(linehaul, 0)} ÷ {hub.toLocaleString("en-US")} hub miles
            </p>
          </div>
          <div>
            <p className="font-display text-5xl leading-none tabular-nums">{money(left, 0)}</p>
            <p className="mt-1 text-sm opacity-80">Left after the floor, this trip</p>
          </div>
        </div>
        <p className="mt-4 text-lg leading-snug">{verdictCopy}</p>
      </section>

      <Callout tone="rule" title="How the handbook gets to $1.56">
        $3,200 fixed ÷ 9,000 miles is $0.36. Add $0.42 fuel, $0.18 upkeep, $0.60 wage. The $900 / 450-mile
        load with 150 empty miles is $1.50. It looks like two dollars on the board. It is not.
      </Callout>
    </div>
  );
}
