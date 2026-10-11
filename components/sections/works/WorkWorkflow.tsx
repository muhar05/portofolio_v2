"use client";

import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const STAGES = [
  {
    number: "01",
    name: "SALES",
    department: "SALES",
    steps: ["SALES", "LEAD", "QUOTATION", "SALES ORDER"],
  },
  {
    number: "02",
    name: "FULFILLMENT",
    department: "PURCHASING · WAREHOUSE",
    steps: [
      "SALES ORDER",
      "ORDER ITEM FULFILLMENT",
      "STOCK RESERVATION",
      "OR",
      "PURCHASE REQUEST",
      "PURCHASE ORDER",
      "GOODS RECEIPT",
    ],
  },
  {
    number: "03",
    name: "INVENTORY",
    department: "INVENTORY",
    steps: ["GOODS RECEIPT / STOCK RESERVATION", "INVENTORY"],
  },
  {
    number: "04",
    name: "DELIVERY CONTROL",
    department: "WAREHOUSE · FINANCE",
    steps: [
      "INVENTORY",
      "DELIVERY REQUEST",
      "WAREHOUSE APPROVAL",
      "FINANCE APPROVAL",
    ],
  },
  {
    number: "05",
    name: "DISPATCH",
    department: "WAREHOUSE · FINANCE",
    steps: ["FINANCE APPROVAL", "DELIVERY ORDER"],
  },
];

const NOTES = [
  {
    number: "01",
    title: "COMMERCIAL",
    body: "Sales creates the commercial context that becomes the Sales Order.",
  },
  {
    number: "02",
    title: "FULFILLMENT",
    body: "Each order item follows the operational path required by its availability.",
  },
  {
    number: "03",
    title: "INVENTORY",
    body: "Stock reservation and received goods converge into the inventory state.",
  },
  {
    number: "04",
    title: "CONTROL",
    body: "Warehouse confirms physical readiness before Finance provides the second approval gate.",
  },
  {
    number: "05",
    title: "DISPATCH",
    body: "Only after the required approvals can the Delivery Order proceed.",
  },
];

function StepChain({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
      {steps.map((step, index) => {
        const isOr = step === "OR";
        const previous = steps[index - 1];
        const showArrow = index > 0 && !isOr && previous !== "OR";

        return (
          <Fragment key={`${step}-${index}`}>
            {showArrow && (
              <span
                className="font-mono text-xs text-[#f97316]"
                aria-hidden="true"
              >
                →
              </span>
            )}
            {isOr ? (
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                OR
              </span>
            ) : (
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-200 sm:text-xs">
                {step}
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

export default function WorkWorkflow() {
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
      id="operational-workflow"
      aria-labelledby="workflow-heading"
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
          <span>07 / OPERATIONAL WORKFLOW</span>
          <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            LIFECYCLE
          </span>
        </div>

        <h2
          id="workflow-heading"
          data-reveal
          className="mt-6 sm:mt-8 max-w-4xl font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12]"
        >
          From sales intent to physical dispatch.
        </h2>

        <p
          data-reveal
          className="mt-10 sm:mt-14 max-w-3xl font-sans text-lg sm:text-xl text-zinc-200 leading-relaxed font-normal"
        >
          The system connects commercial activity, fulfillment, inventory, and
          approval into one traceable operational lifecycle.
        </p>

        <div className="mt-16 sm:mt-24 md:mt-28">
          {STAGES.map((stage) => (
            <div key={stage.number} data-reveal className="relative">
              <div className="h-px w-full bg-zinc-800/60" aria-hidden="true" />
              <div className="grid grid-cols-1 gap-6 py-10 sm:py-12 md:grid-cols-12 md:gap-10 md:py-14 lg:gap-12">
                <div className="flex items-start gap-4 md:col-span-4">
                  <span className="font-mono text-3xl font-light tracking-tight text-zinc-500/80 sm:text-4xl md:text-5xl select-none">
                    {stage.number}
                  </span>
                  <div className="flex flex-col gap-1.5 pt-0.5 md:pt-1">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-white sm:text-sm">
                      {stage.name}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f97316]">
                      {stage.department}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-8">
                  <StepChain steps={stage.steps} />
                </div>
              </div>
            </div>
          ))}
          <div className="h-px w-full bg-zinc-800/40" aria-hidden="true" />
        </div>

        <div className="mt-20 sm:mt-28 md:mt-32">
          <div
            data-reveal
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-zinc-500"
          >
            LIFECYCLE NOTES
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-10 sm:mt-8 md:grid-cols-2">
            {NOTES.map((note) => (
              <div key={note.number} data-reveal>
                <div className="border-t border-zinc-800/60 pt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-[#f97316]">
                      {note.number}
                    </span>
                    <h3 className="font-sans text-base font-bold uppercase tracking-tight text-white sm:text-lg">
                      {note.title}
                    </h3>
                  </div>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-zinc-300 sm:text-base">
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
