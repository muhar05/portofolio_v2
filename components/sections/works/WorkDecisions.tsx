"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const DECISIONS = [
  {
    number: "01",
    title: "PER-ITEM FULFILLMENT SPLIT",
    decision: "Fulfillment is determined at the order-item level.",
    why: "A single sales order can contain both stocked and non-stocked items. Treating the entire order as one fulfillment path would force unrelated items through the same process.",
    result:
      "Each item can independently enter stock reservation or procurement while remaining connected to the original sales order.",
  },
  {
    number: "02",
    title: "DIRECT GOODS RECEIPT → INVENTORY",
    decision:
      "A completed Goods Receipt creates the corresponding inventory movement directly.",
    why: "Goods Receipt represents the physical arrival of goods. Inventory should therefore reflect the physical state of the warehouse rather than requiring a disconnected manual reconciliation step.",
    result:
      "Procurement and inventory remain connected through an explicit operational event.",
  },
  {
    number: "03",
    title: "SEQUENTIAL DUAL-ROLE DISPATCH APPROVAL",
    decision: "Dispatch requires Warehouse approval followed by Finance approval.",
    why: "Physical readiness and financial clearance are separate operational concerns. Neither should silently replace the other.",
    result: "A Delivery Order cannot proceed by bypassing either approval boundary.",
  },
  {
    number: "04",
    title: "TRANSACTIONAL ROLE BOUNDARIES",
    decision:
      "Each department operates only within the transitions it is responsible for.",
    why: "Sales, Purchasing, Warehouse, Inventory, and Finance have different responsibilities within the same lifecycle.",
    result:
      "Authorization becomes part of the operational model instead of being treated as a UI-level restriction.",
  },
];

export default function WorkDecisions() {
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
      id="key-decisions"
      aria-labelledby="decisions-heading"
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
          <span>06 / KEY DECISIONS</span>
          <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            RATIONALE
          </span>
        </div>

        <h2
          id="decisions-heading"
          data-reveal
          className="mt-6 sm:mt-8 max-w-4xl font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12]"
        >
          Four decisions shaped the system.
        </h2>

        <p
          data-reveal
          className="mt-10 sm:mt-14 max-w-3xl font-sans text-lg sm:text-xl text-zinc-200 leading-relaxed font-normal"
        >
          The important decisions were not about using the newest technology.
          They were about making the operational rules explicit, traceable, and
          difficult to bypass.
        </p>

        <div className="mt-16 sm:mt-24 md:mt-28">
          {DECISIONS.map((item) => (
            <div key={item.number} data-reveal className="relative">
              <div className="h-px w-full bg-zinc-800/60" aria-hidden="true" />
              <div className="grid grid-cols-1 items-start gap-8 py-12 sm:py-14 md:grid-cols-12 md:gap-10 md:py-20 lg:gap-12">
                <div className="flex flex-col items-start gap-3 md:col-span-4">
                  <span className="font-mono text-3xl font-light tracking-tight text-zinc-500/80 sm:text-4xl md:text-5xl select-none">
                    {item.number}
                  </span>
                  <h3 className="font-sans text-lg font-bold uppercase leading-snug tracking-tight text-white sm:text-xl md:text-2xl">
                    {item.title}
                  </h3>
                </div>

                <div className="md:col-span-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#f97316] sm:text-[11px]">
                    DECISION
                  </span>
                  <p className="mt-2.5 max-w-2xl font-sans text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl md:text-[28px]">
                    {item.decision}
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-[11px]">
                        WHY
                      </span>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-zinc-300 sm:text-base">
                        {item.why}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 sm:text-[11px]">
                        RESULT
                      </span>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-zinc-300 sm:text-base">
                        {item.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="h-px w-full bg-zinc-800/40" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
