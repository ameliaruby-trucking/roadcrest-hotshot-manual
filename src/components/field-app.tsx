import { BookOpen, Calculator, ClipboardCheck, Link2, Scale } from "lucide-react";
import type { Desk } from "@/content/manual";
import { deskMeta, desks } from "@/content/manual";
import { LaunchView } from "@/components/launch-view";
import { ManualView } from "@/components/manual-view";
import { RateView } from "@/components/rate-view";
import { SecureView } from "@/components/secure-view";
import { WeightView } from "@/components/weight-view";

const icons = {
  manual: BookOpen,
  rates: Calculator,
  weight: Scale,
  secure: Link2,
  launch: ClipboardCheck,
} as const;

export function FieldApp({ desk, onOpen }: { desk: Desk; onOpen: (desk: Desk) => void }) {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2">
          <button type="button" onClick={() => onOpen("manual")} className="min-h-11 text-left">
            <span className="block font-display text-3xl leading-none font-semibold tracking-wide">
              <span className="text-navy">ROAD</span>
              <span className="text-crest-bright">CREST</span>
            </span>
            <span className="block font-display text-xs tracking-widest text-ink">LOGISTICS</span>
          </button>
          <p className="hidden font-display text-sm tracking-widest text-navy uppercase sm:block">Field manual</p>
        </div>
        <nav aria-label="Desks" className="mx-auto hidden max-w-5xl gap-1 px-4 pb-3 md:flex">
          {desks.map((id) => (
            <DeskButton key={id} id={id} active={desk === id} onOpen={onOpen} />
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 pt-6 pb-28 md:pb-16">
        {desk === "manual" ? <ManualView onOpen={onOpen} /> : null}
        {desk === "rates" ? <RateView /> : null}
        {desk === "weight" ? <WeightView /> : null}
        {desk === "secure" ? <SecureView /> : null}
        {desk === "launch" ? <LaunchView /> : null}
      </main>

      <nav
        aria-label="Desks"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card md:hidden"
      >
        <ul className="grid grid-cols-5">
          {desks.map((id) => {
            const Icon = icons[id];
            const active = desk === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onOpen(id)}
                  className={`flex min-h-16 w-full flex-col items-center justify-center gap-1 ${active ? "text-navy" : "text-muted"}`}
                >
                  <Icon className="size-5" strokeWidth={active ? 2.4 : 1.8} aria-hidden="true" />
                  <span className="font-display text-xs tracking-wide uppercase">{deskMeta[id].short}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function DeskButton({ id, active, onOpen }: { id: Desk; active: boolean; onOpen: (desk: Desk) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(id)}
      className={`min-h-11 px-3 font-display text-lg tracking-wide uppercase ${active ? "bg-navy text-paper" : "text-muted"}`}
    >
      {deskMeta[id].label}
    </button>
  );
}
