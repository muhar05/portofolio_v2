"use client";

import type { Project } from "@/types/works";
import { useWorksReveal } from "./useWorksReveal";

interface WorkEngineeringProps {
  project: Project;
}

export default function WorkEngineering({ project }: WorkEngineeringProps) {
  const rootRef = useWorksReveal<HTMLElement>();
  const engineering = project.engineering;

  if (!engineering) return null;

  const items = [
    { label: "Deployment", value: engineering.deployment },
    { label: "Database", value: engineering.database },
    { label: "Auth", value: engineering.auth },
    { label: "Testing", value: engineering.testing },
    { label: "CI/CD", value: engineering.ci },
  ];

  return (
    <section
      ref={rootRef}
      id="engineering"
      aria-labelledby="engineering-heading"
      className="relative w-full border-t border-line px-[var(--page-pad)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[80rem]">
        <div
          data-reveal
          className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          <span className="text-accent-ink">06 / How it is built</span>
          <span className="text-line-strong" aria-hidden="true">
            /
          </span>
          <span>Only what exists</span>
        </div>

        <h2
          id="engineering-heading"
          data-reveal
          className="mt-6 max-w-[52rem] font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground"
        >
          Deployment, data, and access.
        </h2>

        <p
          data-reveal
          className="mt-5 max-w-[46rem] text-[15px] leading-relaxed text-ink-muted"
        >
          This lists the engineering facts I can verify. Missing pieces are
          shown as missing, not filled in later.
        </p>

        <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.label}
              data-reveal
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-muted">
                {item.label}
              </dt>
              <dd className="mt-2 text-[13px] leading-relaxed text-foreground">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
