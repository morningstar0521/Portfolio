"use client";

import { useState } from "react";
import { cases, categories, type Category } from "@/content/cases";
import { CaseCard } from "./case-card";

// Featured layout on wide screens: two large files, then a row of three, then two.
const span = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-6", "lg:col-span-6"];

export function CaseFilter() {
  const [active, setActive] = useState<Category | "ALL">("ALL");
  const shown = active === "ALL" ? cases : cases.filter((c) => c.categories.includes(active));

  return (
    <>
      <div role="group" aria-label="Filter case files by category" className="mb-8 flex flex-wrap gap-2">
        {(["ALL", ...categories] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={active === cat}
            onClick={() => setActive(cat)}
            className="label min-h-11 border border-line px-4 !text-[11px] text-paper-muted transition-colors hover:border-ash hover:text-paper aria-pressed:border-paper aria-pressed:bg-paper aria-pressed:text-paper-ink"
          >
            {cat}
          </button>
        ))}
      </div>

      <p role="status" className="label mb-6 !text-[11px] text-ash">
        {shown.length} of {cases.length} files{active !== "ALL" && ` · ${active}`}
        {active !== "ALL" && (
          <button type="button" onClick={() => setActive("ALL")} className="link-underline ml-3 text-paper">
            Clear filter
          </button>
        )}
      </p>

      {shown.length === 0 ? (
        <div className="border border-dashed border-line p-12 text-center">
          <p className="display text-4xl">No files match this filter.</p>
          <button type="button" onClick={() => setActive("ALL")} className="btn btn-ghost mt-6">
            Show all files
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {shown.map((c) => (
            <div key={c.slug} className={active === "ALL" ? span[cases.indexOf(c)] : "lg:col-span-6"}>
              <CaseCard c={c} featured={active === "ALL" && cases.indexOf(c) < 2} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
