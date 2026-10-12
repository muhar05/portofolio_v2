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
      id="architecture"
      aria-labelledby="architecture-heading"
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
          <span>04 / ARCHITECTURE &amp; STACK</span>
          <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            SYSTEM FOUNDATION
          </span>
        </div>

        <h2
          id="architecture-heading"
          data-reveal
          className="mt-6 sm:mt-8 max-w-4xl font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]"
        >
          Engineered for relational integrity.
        </h2>

        <p
          data-reveal
          className="mt-6 sm:mt-8 max-w-3xl font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal"
        >
          {project.overview.architecture}
        </p>

        {/* Layer Breakdown */}
        <div className="mt-12 sm:mt-14 space-y-4">
          <div
            data-reveal
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-zinc-500 mb-3"
          >
            ARCHITECTURE TIERS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {layers.map((layer) => (
              <div
                key={layer.number}
                data-reveal
                className="rounded-lg border border-zinc-800/70 bg-zinc-950/60 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-[#f97316] font-semibold">{layer.number}</span>
                    <span className="text-zinc-500">|</span>
                    <h3 className="uppercase tracking-widest text-zinc-200 font-medium">
                      {layer.name}
                    </h3>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {layer.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 font-sans text-xs sm:text-sm text-zinc-300"
                      >
                        <span className="h-1 w-1 rounded-full bg-zinc-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Production Stack Badges */}
        <div data-reveal className="mt-12 pt-8 border-t border-zinc-800/60">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 block mb-4">
            CORE PRODUCTION STACK
          </span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-zinc-800 bg-zinc-900/60 px-3 py-1 font-mono text-xs text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Operational Outcome Card */}
        <div
          data-reveal
          className="mt-12 rounded-xl border border-zinc-800/80 bg-zinc-950/90 p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 font-mono text-xs text-[#f97316] uppercase tracking-wider font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            <span>OPERATIONAL OUTCOME &amp; RESULT</span>
          </div>

          <p className="mt-4 font-sans text-base sm:text-lg text-zinc-200 leading-relaxed">
            {project.result}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <div className="mt-6 pt-6 border-t border-zinc-800/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-300 font-sans">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-2">
                  <span className="text-[#f97316] font-bold">✓</span>
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
