import { useMemo, useState } from "react";
import { classifyWeight } from "@/lib/calc";
import { Callout, lbs, SectionTitle, SliderField } from "@/components/ui-bits";

const presets = [
  { id: "non", label: "Non-CDL max", truck: 10000, trailer: 16000 },
  { id: "safe", label: "Non-CDL with margin", truck: 10000, trailer: 15000 },
  { id: "cdl", label: "Dually + 21k", truck: 14000, trailer: 21000 },
];

export function WeightView() {
  const [truck, setTruck] = useState(10000);
  const [trailer, setTrailer] = useState(16000);
  const result = useMemo(() => classifyWeight(truck, trailer), [truck, trailer]);

  return (
    <div className="space-y-6">
      <SectionTitle
        kicker="Weight line"
        title="Two stickers decide the company"
        lede="Add the truck GVWR to the trailer GVWR. If the trailer is over 10,000 and the sum is 26,001 or more, you are Class A — even if the scale says you are light today."
      />

      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="min-h-11 border border-navy bg-card px-3 font-display text-lg text-navy uppercase"
            onClick={() => {
              setTruck(preset.truck);
              setTrailer(preset.trailer);
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <section className="space-y-5 rounded-card border border-line bg-card p-4 sm:p-5">
        <SliderField label="Truck GVWR, doorjamb" min={8000} max={19500} step={100} value={truck} display={lbs(truck)} onChange={setTruck} />
        <SliderField label="Trailer GVWR, neck" min={10000} max={30000} step={100} value={trailer} display={lbs(trailer)} onChange={setTrailer} />
      </section>

      <section className={`rounded-card p-5 ${result.cdl ? "bg-navy text-paper" : "bg-crest text-paper"}`}>
        <p className="font-display text-sm tracking-widest uppercase opacity-80">Combination rating</p>
        <p className="mt-2 font-display text-5xl leading-none tabular-nums">{lbs(result.gcwr)}</p>
        <p className="mt-3 font-display text-3xl leading-none uppercase">
          {result.cdl ? "Class A CDL" : "Stays non-CDL"}
        </p>
        <p className="mt-2 max-w-xl text-base leading-relaxed text-paper/90">
          {result.cdl
            ? `${lbs(Math.abs(result.margin))} over the 26,000 line. IRP, IFTA, and the drug consortium come with it. So does the heavier freight.`
            : result.margin === 0
              ? "Sitting on 26,000. Still non-CDL, with no margin. One pound on either sticker and this is a Class A company."
              : result.close
                ? `Only ${lbs(result.margin)} under the line. A higher trailer sticker, or a truck that is not actually 10,000, flips the whole company.`
                : `${lbs(result.margin)} under the line. Payload stays in the lighter band, and you are not in the drug pool or on IFTA for a 2-axle truck.`}
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["IRP apportioned plates", result.cdl ? "Required for interstate" : "State commercial plate"],
          ["IFTA", result.cdl ? "Quarterly, by state" : "Not required at 2 axles"],
          ["Drug & alcohol pool", result.cdl ? "Clearinghouse, before the first mile" : "Exempt"],
          ["Payload you should plan", result.cdl ? "13,000–18,500+ lbs" : "7,500–9,200 lbs"],
        ].map(([label, value]) => (
          <div key={label} className="border border-line bg-card p-4">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-1 font-display text-2xl leading-tight text-navy uppercase">{value}</p>
          </div>
        ))}
      </div>

      <Callout tone="warn" title="The scale will not save you">
        An officer reads the stickers. Derating a 1-ton is a manufacturer rating change, not a story you tell
        at the scale house. If you want to stay non-CDL, both numbers have to be chosen before the title work.
      </Callout>
    </div>
  );
}
