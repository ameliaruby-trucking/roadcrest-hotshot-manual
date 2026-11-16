import type { ReactNode } from "react";

export function money(n: number, digits = 0) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function rpm(n: number) {
  return `$${n.toFixed(2)}`;
}

export function lbs(n: number) {
  return `${Math.round(n).toLocaleString("en-US")} lb`;
}

export function Callout({
  tone,
  title,
  children,
}: {
  tone: "rule" | "warn" | "go";
  title: string;
  children: ReactNode;
}) {
  const toneClass =
    tone === "warn"
      ? "border-warn bg-warn-bg"
      : tone === "go"
        ? "border-crest bg-card"
        : "border-navy bg-card";
  const titleClass = tone === "warn" ? "text-warn" : tone === "go" ? "text-crest" : "text-navy";
  return (
    <aside className={`border-l-4 px-4 py-3 ${toneClass}`}>
      <p className={`font-display text-lg tracking-wide uppercase ${titleClass}`}>{title}</p>
      <div className="mt-1 text-base leading-relaxed text-ink">{children}</div>
    </aside>
  );
}

export function SliderField({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (next: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-muted">{label}</span>
        <span className="font-display text-2xl leading-none tabular-nums text-navy">{display}</span>
      </span>
      <input
        className="field-range mt-1"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function SectionTitle({ kicker, title, lede }: { kicker: string; title: string; lede?: string }) {
  return (
    <header className="max-w-2xl">
      <p className="font-display text-sm tracking-widest text-crest uppercase">{kicker}</p>
      <h2 className="mt-1 font-display text-4xl leading-none font-semibold text-navy uppercase">{title}</h2>
      {lede ? <p className="mt-3 text-base leading-relaxed text-ink">{lede}</p> : null}
    </header>
  );
}
