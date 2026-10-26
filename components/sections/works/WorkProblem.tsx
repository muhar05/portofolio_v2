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
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
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
      className="relative w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div
          data-reveal
          className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#f97316] font-semibold"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#f97316]"
            aria-hidden="true"
          />
          <span>02 / THE CHALLENGE</span>
          <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            CONTEXT &amp; BOTTLENECKS
          </span>
        </div>

        <h2
          id="problem-heading"
          data-reveal
          className="mt-6 sm:mt-8 max-w-4xl text-balance font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]"
        >
          {project.problemHeadline ?? "The process broke before the software did."}
        </h2>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div data-reveal className="lg:col-span-8 flex flex-col gap-4">
            <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              {project.overview.problem}
            </p>
          </div>

          <aside data-reveal className="lg:col-span-4">
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/70 p-4 sm:p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                OPERATIONAL DOMAINS
              </span>
              <ul className="mt-3 flex flex-wrap lg:flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-300">
                {domains.map((domain) => (
                  <li key={domain} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#f97316]" aria-hidden="true" />
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
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-zinc-500 mb-6"
          >
            KEY FAILURE MODES ADDRESSED
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {problemPoints.map((point, index) => (
              <div
                key={point}
                data-reveal
                className="relative rounded-lg border border-zinc-800/60 bg-zinc-950/50 p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-light tracking-tight text-[#f97316] select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-sans text-sm sm:text-[15px] leading-relaxed text-zinc-300">
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {project.overview.approach && (
          <div
            data-reveal
            className="mt-12 sm:mt-16 border-t border-zinc-800/60 pt-8 sm:pt-10"
          >
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#f97316]">
              THE APPROACH
            </div>
            <p className="mt-4 max-w-3xl font-sans text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
              {project.overview.approach}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
