"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const GROUPS = [
  {
    number: "01",
    name: "APPLICATION",
    items: ["Next.js", "React", "TypeScript"],
  },
  {
    number: "02",
    name: "DATA",
    items: ["PostgreSQL", "Prisma"],
  },
  {
    number: "03",
    name: "STATE & VALIDATION",
    items: ["TanStack Query", "Zod"],
  },
  {
    number: "04",
    name: "AUTH & ACCESS",
    items: ["NextAuth", "RBAC"],
  },
  {
    number: "05",
    name: "STORAGE & SERVICES",
    items: ["MinIO", "Nodemailer"],
  },
  {
    number: "06",
    name: "UI",
    items: ["Tailwind CSS", "shadcn/ui", "Radix UI"],
  },
];

export default function WorkStack() {
  const rootRef = useRef<HTMLElement>(null);

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
          duration: 0.6,
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
      id="stack"
      aria-labelledby="stack-heading"
      className="relative w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-24 sm:py-32 md:py-40"
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
          <span>10 / STACK</span>
          <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            TECHNOLOGY
          </span>
        </div>

        <h2
          id="stack-heading"
          data-reveal
          className="mt-6 sm:mt-8 max-w-4xl font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12]"
        >
          Built with a practical stack.
        </h2>

        <p
          data-reveal
          className="mt-10 sm:mt-14 max-w-3xl font-sans text-lg sm:text-xl text-zinc-200 leading-relaxed font-normal"
        >
          The technology choices support the operational model without adding
          unnecessary infrastructure or architectural complexity.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((group) => (
            <div key={group.number} data-reveal>
              <div className="border-t border-zinc-800/60 pt-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-[#f97316]">
                    {group.number}
                  </span>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-100 sm:text-xs">
                    {group.name}
                  </h3>
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-sans text-sm text-zinc-300 sm:text-[15px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
