"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const RESULTS = [
  {
    number: "01",
    title: "TRACEABLE FULFILLMENT",
    body: "Each order item can be tracked through its own fulfillment path while remaining connected to the original Sales Order.",
  },
  {
    number: "02",
    title: "INVENTORY REFLECTS PHYSICAL MOVEMENT",
    body: "Goods Receipt feeds the inventory state directly, keeping physical warehouse movement connected to the operational record.",
  },
  {
    number: "03",
    title: "CONTROLLED DISPATCH",
    body: "Warehouse and Finance approvals form a sequential gate before Delivery Order and dispatch.",
  },
  {
    number: "04",
    title: "CLEAR RESPONSIBILITY",
    body: "Department boundaries are explicit across Sales, Purchasing, Warehouse, Inventory, and Finance.",
  },
  {
    number: "05",
    title: "DETERMINISTIC FLOW",
    body: "The operational lifecycle is represented through explicit states and controlled transitions instead of relying on informal handoffs.",
  },
];

export default function WorkResult() {
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
      id="result"
      aria-labelledby="result-heading"
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
          <span>09 / RESULT</span>
          <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            OUTCOME
          </span>
        </div>

        <h2
          id="result-heading"
          data-reveal
          className="mt-6 sm:mt-8 max-w-4xl font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12]"
        >
          A clearer operational backbone.
        </h2>

        <p
          data-reveal
          className="mt-10 sm:mt-14 max-w-3xl font-sans text-lg sm:text-xl text-zinc-200 leading-relaxed font-normal"
        >
          The result is not a new interface for its own sake. It is a more
          deterministic operational flow where each department can see its
          responsibility and each fulfillment path remains connected to the
          original order.
        </p>

        <div className="mt-16 sm:mt-24 md:mt-28">
          {RESULTS.map((item) => (
            <div key={item.number} data-reveal className="relative">
              <div className="h-px w-full bg-zinc-800/60" aria-hidden="true" />
              <div className="grid grid-cols-1 items-start gap-6 py-10 sm:py-12 md:grid-cols-12 md:gap-10 md:py-14 lg:gap-12">
                <div className="flex items-start gap-4 md:col-span-5">
                  <span className="font-mono text-3xl font-light tracking-tight text-zinc-500/80 sm:text-4xl md:text-5xl select-none">
                    {item.number}
                  </span>
                  <h3 className="pt-0.5 font-sans text-lg font-bold uppercase leading-snug tracking-tight text-white sm:text-xl md:pt-1 md:text-2xl">
                    {item.title}
                  </h3>
                </div>

                <div className="md:col-span-7 md:col-start-6">
                  <p className="max-w-xl font-sans text-base font-normal leading-relaxed text-zinc-300 sm:text-lg lg:text-[18px]">
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="h-px w-full bg-zinc-800/40" aria-hidden="true" />
        </div>

        <div
          data-reveal
          className="mt-20 border-t border-zinc-800/60 pt-10 sm:mt-28 sm:pt-14 md:mt-32"
        >
          <p className="max-w-4xl font-sans text-2xl font-bold leading-[1.18] tracking-tight text-white sm:text-3xl md:text-4xl">
            The system turns a complex multi-department order process into a
            traceable sequence of operational decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
