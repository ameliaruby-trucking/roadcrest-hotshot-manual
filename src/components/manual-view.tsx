import { useState } from "react";
import {
  FACEBOOK_CAPTION,
  chapters,
  type Block,
  type Desk,
} from "@/content/manual";
import { Callout } from "@/components/ui-bits";

export function ManualView({ onOpen }: { onOpen: (desk: Desk) => void }) {
  const [copied, setCopied] = useState(false);

  async function copyCaption() {
    const url = window.location.origin + window.location.pathname;
    const text = `${FACEBOOK_CAPTION}\n\n${url}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-card border border-line bg-card">
        <div className="px-5 pt-6 sm:px-8">
          <img
            src="/roadcrest-logo.png"
            alt="Roadcrest Logistics"
            className="mx-auto h-auto w-full max-w-md"
          />
        </div>
        <div className="mt-2 bg-navy px-5 py-6 text-paper sm:px-8 sm:py-8">
          <p className="font-display text-sm tracking-widest text-paper/70 uppercase">
            Owner-operator field manual
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-5xl leading-none font-semibold uppercase sm:text-6xl">
            Read this before the first load
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/90">
            Posted for the people following Roadcrest Logistics, and for the driver about to buy a
            gooseneck. Hotshot fails in year one from the wrong stickers, the insurance, the clock,
            and freight priced under cost — not from a lack of loads.
          </p>
        </div>
        <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
          {[
            ["$1.56", "Worked all-in floor"],
            ["26,001", "Pounds that flip CDL"],
            ["8", "Filings, in order"],
            ["$15–25k", "Cash before you roll"],
          ].map(([value, label]) => (
            <div key={label} className="border-line px-4 py-3 sm:border-l sm:first:border-l-0">
              <dt className="font-display text-3xl leading-none text-navy tabular-nums">{value}</dt>
              <dd className="mt-1 text-sm text-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <nav aria-label="Chapters" className="flex gap-2 overflow-x-auto pb-1">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            type="button"
            className="shrink-0 border border-line bg-card px-3 py-2 text-left"
            onClick={() => document.getElementById(chapter.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
          >
            <span className="block font-display text-xs tracking-widest text-crest">{chapter.numeral}</span>
            <span className="block max-w-40 font-display text-lg leading-tight text-navy uppercase">
              {chapter.title}
            </span>
          </button>
        ))}
      </nav>

      {chapters.map((chapter) => (
        <article key={chapter.id} id={chapter.id} className="scroll-mt-24 border-t border-line pt-8">
          <p className="font-display text-sm tracking-widest text-crest">{chapter.numeral}</p>
          <h2 className="mt-1 max-w-3xl font-display text-4xl leading-none font-semibold text-navy uppercase">
            {chapter.title}
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink">{chapter.lede}</p>
          <div className="mt-5 space-y-4">
            {chapter.blocks.map((block, index) => (
              <BlockView key={`${chapter.id}-${index}`} block={block} onOpen={onOpen} />
            ))}
          </div>
        </article>
      ))}

      <section className="rounded-card border border-line bg-card p-5 sm:p-6">
        <p className="font-display text-sm tracking-widest text-crest uppercase">For the Facebook page</p>
        <h2 className="mt-1 font-display text-3xl leading-none font-semibold text-navy uppercase">
          Caption, ready to paste
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink">
          Copy this with the link to the manual. Post it for followers and for the drivers who have
          not bought the truck yet.
        </p>
        <pre className="mt-4 overflow-x-auto bg-paper p-4 text-sm leading-relaxed whitespace-pre-wrap text-ink">
          {FACEBOOK_CAPTION}
        </pre>
        <button
          type="button"
          onClick={copyCaption}
          className="mt-4 min-h-11 bg-navy px-4 py-2 font-display text-lg tracking-wide text-paper uppercase"
        >
          {copied ? "Copied with the link" : "Copy caption and link"}
        </button>
      </section>

      <p className="text-sm leading-relaxed text-muted">
        Field notes for drivers, not legal advice. Doorjamb GVWR, current FMCSA rules, and your state
        filings control. Confirm them before you spend money. Roadcrest Logistics is not your attorney,
        your insurer, or your compliance officer.
      </p>
    </div>
  );
}

function BlockView({ block, onOpen }: { block: Block; onOpen: (desk: Desk) => void }) {
  if (block.type === "p") {
    return <p className="max-w-3xl text-base leading-relaxed text-ink">{block.text}</p>;
  }
  if (block.type === "callout") {
    return (
      <Callout tone={block.tone} title={block.title}>
        {block.text}
      </Callout>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="grid gap-3">
        {block.items.map((item) => (
          <li key={item.title} className="border border-line bg-card px-4 py-3">
            <p className="font-display text-xl leading-tight text-navy uppercase">{item.title}</p>
            <p className="mt-1 text-base leading-relaxed text-ink">{item.text}</p>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "steps") {
    return (
      <ol className="grid gap-3">
        {block.items.map((item, index) => (
          <li key={item.title} className="grid grid-cols-[auto_1fr] gap-3 border border-line bg-card px-4 py-3">
            <span className="font-display text-2xl leading-none text-crest tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-display text-xl leading-tight text-navy uppercase">{item.title}</p>
              <p className="mt-1 text-base leading-relaxed text-ink">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }
  if (block.type === "compare") {
    return (
      <div className="grid gap-3">
        {block.rows.map((row) => (
          <div key={row.factor} className="border border-line bg-card p-4">
            <p className="font-display text-xl text-navy uppercase">{row.factor}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="bg-paper p-3">
                <p className="font-display text-sm tracking-widest text-crest uppercase">Non-CDL</p>
                <p className="mt-1 text-sm leading-relaxed text-ink">{row.non}</p>
              </div>
              <div className="bg-navy p-3 text-paper">
                <p className="font-display text-sm tracking-widest text-crest-bright uppercase">Class A</p>
                <p className="mt-1 text-sm leading-relaxed text-paper/90">{row.cdl}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (block.type === "table") {
    return (
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead className="bg-navy text-paper">
            <tr>
              {block.headers.map((header) => (
                <th key={header} className="px-3 py-2 font-display text-base font-medium tracking-wide uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row[0]} className="border-t border-line bg-card">
                {row.map((cell, cellIndex) => (
                  <td key={`${row[0]}-${cellIndex}`} className="px-3 py-3 align-top leading-relaxed text-ink">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onOpen(block.desk)}
      className="min-h-11 bg-crest px-4 py-2 font-display text-lg tracking-wide text-paper uppercase"
    >
      {block.label}
    </button>
  );
}
