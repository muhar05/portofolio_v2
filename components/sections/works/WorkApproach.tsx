"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const PRINCIPLES = [
  {
    number: "01",
    title: "ORDER AS THE BACKBONE",
    body: "The sales order remains the source context for downstream operations. Fulfillment activities stay traceable to the original order instead of becoming disconnected departmental transactions.",
  },
  {
    number: "02",
    title: "FULFILLMENT PER ITEM",
    body: "Each order item can determine its own fulfillment path. Available stock can be reserved directly, while unavailable items can enter the procurement flow.",
  },
  {
    number: "03",
    title: "EXPLICIT STATE TRANSITIONS",
    body: "Operational progress is represented through explicit states and controlled transitions rather than relying on informal assumptions between departments.",
  },
  {
    number: "04",
    title: "DEPARTMENT BOUNDARIES",
    body: "Sales, purchasing, warehouse, inventory, and finance operate within defined responsibilities while remaining connected through the same operational lifecycle.",
  },
  {
    number: "05",
    title: "PHYSICAL STATE FIRST",
    body: "Goods receipt represents a physical inventory event. Inventory should reflect what has actually entered the warehouse, not merely what has been ordered.",
  },
];

export default function WorkApproach() {
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
      id="approach"
      aria-labelledby="approach-heading"
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
          <span>03 / THE APPROACH</span>
          <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            FULFILLMENT MODEL
          </span>
        </div>

        <h2
          id="approach-heading"
          data-reveal
          className="mt-6 sm:mt-8 max-w-4xl font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12]"
        >
          One order.
          <br />
          Different paths.
          <br />
          One operational backbone.
        </h2>

        <p
          data-reveal
          className="mt-10 sm:mt-14 max-w-3xl font-sans text-lg sm:text-xl text-zinc-200 leading-relaxed font-normal"
        >
          Instead of forcing every item through the same fulfillment process,
          the system treats the sales order as the operational backbone while
          allowing each item to follow the path its condition requires.
        </p>

        <div className="mt-16 sm:mt-24 md:mt-28">
          <div
            data-reveal
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-zinc-500"
          >
            APPROACH PRINCIPLES
          </div>

          <div className="mt-6 sm:mt-8">
            {PRINCIPLES.map((principle) => (
              <div key={principle.number} data-reveal className="relative">
                <div
                  className="h-px w-full bg-zinc-800/60"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 py-10 sm:py-12 md:py-16 items-start">
                  <div className="md:col-span-5 lg:col-span-5 flex flex-col items-start gap-2">
                    <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-zinc-500/80 select-none">
                      {principle.number}
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-white uppercase leading-snug">
                      {principle.title}
                    </h3>
                  </div>

                  <div className="md:col-span-7 lg:col-span-7 md:col-start-6 lg:col-start-6 md:pt-1.5">
                    <p className="font-sans text-base sm:text-lg lg:text-[18px] leading-relaxed text-zinc-300 font-normal max-w-xl">
                      {principle.body}
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
