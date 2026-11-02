"use client";

import type { Project } from "@/types/works";
import { useWorksReveal } from "./useWorksReveal";

interface WorkChallengeProps {
  project: Project;
}

export default function WorkChallenge({ project }: WorkChallengeProps) {
  const rootRef = useWorksReveal<HTMLElement>();
  const challenge = project.hardestChallenge;

  if (!challenge) return null;

  return (
    <section
      ref={rootRef}
      id="challenge"
      aria-labelledby="challenge-heading"
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
          <span className="text-accent-ink">04 / Hardest challenge</span>
          <span className="text-line-strong" aria-hidden="true">
            /
          </span>
          <span>What made it difficult</span>
        </div>

        <h2
          id="challenge-heading"
          data-reveal
          className="mt-6 max-w-[52rem] text-balance font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground"
        >
          {challenge.title}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
          <div
            data-reveal
            className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
              The problem
            </span>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
              {challenge.problem}
            </p>
          </div>

          <div
            data-reveal
            className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent-ink">
              The solution
            </span>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
              {challenge.solution}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
