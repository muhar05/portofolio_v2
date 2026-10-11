"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const NOTES = [
  {
    number: "01",
    title: "STOCK PATH",
    body: "Items already available can be reserved without entering procurement.",
  },
  {
    number: "02",
    title: "PROCUREMENT PATH",
    body: "Items that require purchasing move through Purchase Request → Purchase Order → Goods Receipt before entering inventory.",
  },
  {
    number: "03",
    title: "CONVERGENCE",
    body: "Both fulfillment paths reconnect at inventory before the controlled delivery process.",
  },
  {
    number: "04",
    title: "DUAL GATE",
    body: "Dispatch requires sequential Warehouse approval followed by Finance approval.",
  },
];

function DownChevron() {
  return (
    <div
      className="h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-zinc-700"
      aria-hidden="true"
    />
  );
}

function FlowArrow() {
  return (
    <div
      className="flex flex-col items-center py-3"
      aria-hidden="true"
    >
      <div className="h-6 w-px bg-zinc-700" />
      <DownChevron />
    </div>
  );
}

function FlowNode({
  label,
  dept,
  accent = false,
}: {
  label: string;
  dept?: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center gap-2.5">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            accent ? "bg-[#f97316]" : "bg-zinc-600"
          }`}
          aria-hidden="true"
        />
        <span
          className={`font-mono text-[11px] sm:text-sm uppercase tracking-[0.18em] ${
            accent ? "font-medium text-white" : "text-zinc-200"
          }`}
        >
          {label}
        </span>
      </div>
      {dept && (
        <span className="mt-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          {dept}
        </span>
      )}
    </div>
  );
}

export default function WorkFulfillment() {
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
      id="fulfillment-model"
      aria-labelledby="fulfillment-heading"
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
          <span>04 / FULFILLMENT MODEL</span>
          <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            OPERATIONAL FLOW
          </span>
        </div>

        <h2
          id="fulfillment-heading"
          data-reveal
          className="mt-6 sm:mt-8 max-w-4xl font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12]"
        >
          One order does not mean one fulfillment path.
        </h2>

        <p
          data-reveal
          className="mt-10 sm:mt-14 max-w-3xl font-sans text-lg sm:text-xl text-zinc-200 leading-relaxed font-normal"
        >
          A sales order can contain items with completely different operational
          conditions. The system resolves fulfillment at the item level, then
          brings those paths back into the same inventory and dispatch
          lifecycle.
        </p>

        <div
          data-reveal
          className="mt-16 sm:mt-24 md:mt-28 mx-auto w-full max-w-4xl"
        >
          <div className="flex flex-col items-center">
            <FlowNode label="SALES ORDER" dept="SALES" />
            <FlowArrow />
            <FlowNode label="ORDER ITEMS" dept="SALES" accent />
          </div>

          <div
            className="relative hidden h-12 w-full md:block"
            aria-hidden="true"
          >
            <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-zinc-700" />
            <div className="absolute left-1/4 right-1/4 top-4 h-px bg-zinc-700" />
            <div className="absolute left-1/4 top-4 h-8 w-px -translate-x-1/2 bg-zinc-700" />
            <div className="absolute right-1/4 top-4 h-8 w-px translate-x-1/2 bg-zinc-700" />
          </div>

          <div className="md:hidden">
            <FlowArrow />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-stretch lg:gap-16">
            <div className="flex h-full flex-col items-center">
              <span className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                STOCK PATH
              </span>
              <FlowNode label="STOCK AVAILABLE" dept="WAREHOUSE" />
              <FlowArrow />
              <FlowNode label="STOCK RESERVATION" dept="WAREHOUSE" />
              <div
                className="hidden min-h-6 w-px flex-1 bg-zinc-700 md:block"
                aria-hidden="true"
              />
            </div>

            <div className="flex h-full flex-col items-center">
              <span className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                PROCUREMENT PATH
              </span>
              <FlowNode label="NEED PROCUREMENT" dept="PURCHASING" />
              <FlowArrow />
              <FlowNode label="PURCHASE REQUEST" dept="PURCHASING" />
              <FlowArrow />
              <FlowNode label="PURCHASE ORDER" dept="PURCHASING" />
              <FlowArrow />
              <FlowNode label="GOODS RECEIPT" dept="WAREHOUSE" />
              <div
                className="hidden min-h-6 w-px flex-1 bg-zinc-700 md:block"
                aria-hidden="true"
              />
            </div>
          </div>

          <div
            className="relative hidden h-12 w-full md:block"
            aria-hidden="true"
          >
            <div className="absolute left-1/4 top-0 h-8 w-px -translate-x-1/2 bg-zinc-700" />
            <div className="absolute right-1/4 top-0 h-8 w-px translate-x-1/2 bg-zinc-700" />
            <div className="absolute left-1/4 right-1/4 top-8 h-px bg-zinc-700" />
            <div className="absolute left-1/2 top-8 flex h-4 -translate-x-1/2 flex-col items-center">
              <div className="h-3 w-px bg-zinc-700" />
              <DownChevron />
            </div>
          </div>

          <div className="md:hidden">
            <FlowArrow />
          </div>

          <div className="flex flex-col items-center">
            <FlowNode label="INVENTORY" dept="INVENTORY" accent />
            <FlowArrow />
            <FlowNode label="DELIVERY REQUEST" dept="WAREHOUSE" />
            <FlowArrow />
            <FlowNode label="WAREHOUSE APPROVAL" dept="WAREHOUSE" />
            <FlowArrow />
            <FlowNode label="FINANCE APPROVAL" dept="FINANCE" />
            <FlowArrow />
            <FlowNode label="DELIVERY ORDER" accent />
          </div>
        </div>

        <div className="mt-20 sm:mt-28 md:mt-32">
          <div
            data-reveal
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-zinc-500"
          >
            FULFILLMENT NOTES
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 sm:mt-8">
            {NOTES.map((note) => (
              <div key={note.number} data-reveal>
                <div className="border-t border-zinc-800/60 pt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-[#f97316]">
                      {note.number}
                    </span>
                    <h3 className="font-sans text-base sm:text-lg font-bold tracking-tight text-white uppercase">
                      {note.title}
                    </h3>
                  </div>
                  <p className="mt-2 font-sans text-sm sm:text-base leading-relaxed text-zinc-300">
                    {note.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
