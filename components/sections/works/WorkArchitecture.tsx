"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import type { Project, ArchitectureLayer } from "@/types/works";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface WorkArchitectureProps {
  project: Project;
}

const DEFAULT_LAYERS: ArchitectureLayer[] = [
  {
    number: "01",
    name: "CLIENT LAYER",
    items: ["Next.js App Router", "React 19", "TanStack Query", "Zod", "Tailwind CSS"],
  },
  {
    number: "02",
    name: "BUSINESS & DOMAIN",
    items: ["Server Actions", "Transactional State Machine", "RBAC (9 Roles)", "Audit Logging"],
  },
  {
    number: "03",
    name: "DATA & STORAGE",
    items: ["PostgreSQL", "Prisma ORM", "MinIO Object Storage", "Transactions"],
  },
];

export default function WorkArchitecture({ project }: WorkArchitectureProps) {
  const rootRef = useRef<HTMLElement>(null);
  const layers = project.architectureLayers || DEFAULT_LAYERS;

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
      id="architecture"
      aria-labelledby="architecture-heading"
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
          <span className="text-accent-ink">04 / Architecture &amp; stack</span>
          <span className="text-line-strong" aria-hidden="true">
            /
          </span>
          <span>System foundation</span>
        </div>

        <h2
          id="architecture-heading"
          data-reveal
          className="mt-6 max-w-[52rem] font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground"
        >
          Built to keep state consistent.
        </h2>

        <p
          data-reveal
          className="mt-5 max-w-[46rem] text-[15px] leading-relaxed text-ink-muted sm:mt-6 sm:text-base"
        >
          {project.overview.architecture}
        </p>

        <div className="mt-12 space-y-4 sm:mt-14">
          <div
            data-reveal
            className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted sm:text-[11px]"
          >
            Architecture tiers
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-6">
            {layers.map((layer) => (
              <div
                key={layer.number}
                data-reveal
                className="flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:bg-surface-strong/60 sm:p-6"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-semibold text-accent-ink">
                    {layer.number}
                  </span>
                  <span className="text-line-strong">|</span>
                  <h3 className="font-medium uppercase tracking-[0.14em] text-foreground">
                    {layer.name}
                  </h3>
                </div>

                <ul className="mt-4 space-y-2">
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[13px] text-ink-muted"
                    >
                      <span
                        className="h-1 w-1 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="mt-12 border-t border-line pt-8">
          <span className="mb-4 block text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
            Core production stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-background/70 px-3 py-1.5 text-[12px] font-medium text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div
          data-reveal
          className="mt-12 rounded-3xl bg-[#111c17] p-6 text-[#edf0ea] sm:p-8"
        >
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#e07a52]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c9552e]" />
            <span>Operational outcome &amp; result</span>
          </div>

          <p className="mt-4 max-w-[52rem] text-[15px] leading-relaxed text-[#edf0ea]/80 sm:text-base">
            {project.result}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-white/12 pt-6 text-[13px] text-[#edf0ea]/75 sm:grid-cols-2 sm:text-sm">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-2">
                  <span className="font-bold text-[#e07a52]">✓</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
