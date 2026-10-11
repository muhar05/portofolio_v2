"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const PROBLEM_POINTS = [
  "Different items can follow different fulfillment paths.",
  "Stock availability and procurement must coexist within one order.",
  "Inventory must reflect physical goods receipt.",
  "Dispatch requires sequential warehouse and finance approval.",
  "Each department needs clear boundaries without breaking the overall order lifecycle.",
];

const DOMAINS = ["SALES", "PURCHASING", "WAREHOUSE", "INVENTORY", "FINANCE"];

export default function WorkProblem() {
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
      id="problem"
      aria-labelledby="problem-heading"
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
          <span>02 / THE PROBLEM</span>
          <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            CONTEXT
          </span>
        </div>

        <h2
          id="problem-heading"
          data-reveal
          className="mt-6 sm:mt-8 max-w-4xl font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12]"
        >
          Orders were simple on paper.
          <br />
          Fulfillment was not.
        </h2>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div data-reveal className="lg:col-span-7 flex flex-col gap-5">
            <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              A single sales order could contain items that were already
              available in stock and items that still needed to be procured.
            </p>
            <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              That meant one order could split into different operational paths
              across sales, purchasing, warehouse, inventory, and finance.
            </p>
            <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              The system needed to make those paths explicit without losing the
              relationship between the original order, its items, inventory
              movement, and final dispatch.
            </p>
          </div>

          <aside data-reveal className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-zinc-800/60 pt-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                OPERATIONAL DOMAINS
              </span>
              <ul className="mt-4 flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                {DOMAINS.map((domain) => (
                  <li key={domain} className="flex items-center gap-2.5">
                    <span
                      className="h-px w-3 bg-zinc-700"
                      aria-hidden="true"
                    />
                    {domain}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-16 sm:mt-24 md:mt-28">
          <div
            data-reveal
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-zinc-500"
          >
            KEY PROBLEM POINTS
          </div>

          <div className="mt-6 sm:mt-8">
            {PROBLEM_POINTS.map((point, index) => (
              <div key={point} data-reveal className="relative">
                <div
                  className="h-px w-full bg-zinc-800/60"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 lg:gap-12 py-10 sm:py-12 md:py-14 items-start">
                  <div className="md:col-span-2 lg:col-span-2">
                    <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-zinc-500/80 select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-10 lg:col-span-10 md:pt-1.5">
                    <p className="font-sans text-base sm:text-lg lg:text-[18px] leading-relaxed text-zinc-300 font-normal max-w-2xl">
                      {point}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="h-px w-full bg-zinc-800/40" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
