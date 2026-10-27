"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import type { Project } from "@/types/works";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface WorkProblemProps {
  project: Project;
}

export default function WorkProblem({ project }: WorkProblemProps) {
  const rootRef = useRef<HTMLElement>(null);

  const problemPoints = project.problemPoints || [
    "A single sales order contains stocked items alongside items requiring external procurement.",
    "Without transactional sync, inventory is double-promised and shipments leave unverified.",
    "Fragmented departmental handoffs obscure accountability between purchasing and delivery.",
  ];

  const domains = project.domains || [
    "SALES",
    "PURCHASING",
    "WAREHOUSE",
    "INVENTORY",
    "FINANCE",
  ];

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = root.querySelectorAll("[data-reveal]");

    if (prefersReducedMotion) {
      if (targets.length > 0) gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
        }
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="problem"
      aria-labelledby="problem-heading"
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
          <span className="text-accent-ink">02 / The challenge</span>
          <span className="text-line-strong" aria-hidden="true">
            /
          </span>
          <span>Where it broke</span>
        </div>

        <h2
          id="problem-heading"
          data-reveal
          className="mt-6 max-w-[52rem] text-balance font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground"
        >
          {project.problemHeadline ?? "The process broke before the software did."}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-12">
          <div data-reveal className="flex flex-col gap-4 lg:col-span-8">
            <p className="max-w-[44rem] text-pretty text-[15px] leading-relaxed text-ink-muted sm:text-base">
              {project.problemLead ?? project.overview.problem}
            </p>
            {project.problemLead && (
              <details className="max-w-[44rem]">
                <summary className="cursor-pointer text-[13px] font-medium text-accent-ink transition-colors hover:text-foreground">
                  Read the full context
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                  {project.overview.problem}
                </p>
              </details>
            )}
          </div>

          <aside data-reveal className="lg:col-span-4">
            <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                Teams involved
              </span>
              <ul className="mt-3 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground lg:flex-col">
                {domains.map((domain) => (
                  <li key={domain} className="flex items-center gap-2">
                    <span
                      className="h-1 w-1 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{domain}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-12 sm:mt-16">
          <div
            data-reveal
            className="mb-6 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted sm:text-[11px]"
          >
            What was going wrong
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {problemPoints.map((point, index) => (
              <div
                key={point}
                data-reveal
                className="flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:bg-surface-strong/60 sm:p-6"
              >
                <span className="font-mono text-2xl font-light tracking-tight text-accent-ink">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {project.overview.approach && (
          <div
            data-reveal
            className="mt-12 border-t border-line pt-8 sm:mt-16 sm:pt-10"
          >
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent-ink sm:text-[11px]">
              The approach
            </div>
            <p className="mt-4 max-w-[46rem] text-[15px] leading-relaxed text-ink-muted sm:text-base">
              {project.overview.approach}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
