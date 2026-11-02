"use client";

import type { Project } from "@/types/works";
import { useWorksReveal } from "./useWorksReveal";

interface WorkOutcomeProps {
  project: Project;
}

export default function WorkOutcome({ project }: WorkOutcomeProps) {
  const rootRef = useWorksReveal<HTMLElement>();
  const nextSteps = project.nextSteps ?? [];

  return (
    <section
      ref={rootRef}
      id="outcome"
      aria-labelledby="outcome-heading"
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
          <span className="text-accent-ink">07 / Outcome</span>
          <span className="text-line-strong" aria-hidden="true">
            /
          </span>
          <span>What it handles</span>
        </div>

        <h2
          id="outcome-heading"
          data-reveal
          className="mt-6 max-w-[52rem] text-balance font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground"
        >
          What the system now handles.
        </h2>

        <p
          data-reveal
          className="mt-5 max-w-[46rem] text-[15px] leading-relaxed text-ink-muted sm:text-base"
        >
          {project.result}
        </p>

        {project.highlights.length > 0 && (
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                data-reveal
                className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-[13px] leading-relaxed text-ink-muted"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {project.impact && project.impact.length > 0 ? (
          <dl
            data-reveal
            className="mt-10 grid grid-cols-2 gap-6 rounded-3xl bg-[var(--panel)] p-6 text-[var(--panel-foreground)] sm:grid-cols-4 sm:p-8"
          >
            {project.impact.map((item) => (
              <div key={item.label}>
                <dd className="font-display text-3xl font-semibold tracking-[-0.02em]">
                  {item.value}
                </dd>
                <dt className="mt-1 text-[11px] leading-snug text-[var(--panel-muted)]">
                  {item.label}
                </dt>
                {item.note && (
                  <p className="mt-1 text-[10px] leading-snug text-[var(--panel-muted)]">
                    {item.note}
                  </p>
                )}
              </div>
            ))}
          </dl>
        ) : (
          <p
            data-reveal
            className="mt-10 rounded-2xl border border-dashed border-line-strong p-5 text-[13px] leading-relaxed text-ink-muted"
          >
            Outcome metrics have not been measured yet. I have not recorded
            before-and-after numbers for this project.
          </p>
        )}

        <div data-reveal className="mt-10 border-t border-line pt-8">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
            What I would improve next
          </span>
          {nextSteps.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {nextSteps.map((step) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-[14px] leading-relaxed text-ink-muted"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 max-w-[46rem] text-[14px] leading-relaxed text-ink-muted">
              No planned changes yet. The next step is to collect usage data
              before choosing what to improve.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
