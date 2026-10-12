"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import type { Project, InteractiveFlowPath } from "@/types/works";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface WorkFulfillmentFlowProps {
  project: Project;
}

const DEFAULT_FLOW_PATHS: InteractiveFlowPath[] = [
  {
    id: "in-stock",
    title: "Direct Stock Path",
    badge: "In-Stock Items",
    description: "Immediate inventory reservation bypassing procurement chains entirely.",
    steps: [
      {
        name: "Sales Order Confirmed",
        department: "Sales",
        action: "Line item confirmed & live stock reservation triggered",
      },
      {
        name: "Atomic Stock Hold",
        department: "Warehouse",
        action: "Row-level hold in database transaction locks allocated quantity",
      },
      {
        name: "Dual-Gate Sign-off",
        department: "Warehouse & Finance",
        action: "Physical readiness check + financial credit terms verified",
      },
      {
        name: "Delivery Order Released",
        department: "Delivery",
        action: "Official dispatch notice created and warehouse balance debited",
      },
    ],
  },
  {
    id: "procurement",
    title: "Procurement Path",
    badge: "Backordered Items",
    description: "Automated replenishment chain connecting Purchase Requests to warehouse floor receipts.",
    steps: [
      {
        name: "Purchase Request",
        department: "Purchasing",
        action: "Backordered items branch into an internal procurement requisition",
      },
      {
        name: "Vendor Purchase Order",
        department: "Purchasing",
        action: "Formal PO dispatched to supplier with agreed lead times",
      },
      {
        name: "Goods Receipt",
        department: "Warehouse",
        action: "Physical receiving at loading dock immediately increments stock",
      },
      {
        name: "Delivery Convergence",
        department: "Warehouse",
        action: "Procured items converge with existing stock for packing",
      },
    ],
  },
  {
    id: "dual-gate",
    title: "Sequential Dual-Gate",
    badge: "Dispatch Gate",
    description: "Eliminates premature dispatches through mandatory sequential operational and financial approval.",
    steps: [
      {
        name: "Delivery Request",
        department: "Warehouse",
        action: "Initiated once all items in the sales order are ready on the floor",
      },
      {
        name: "Gate 1: Physical Check",
        department: "Warehouse",
        action: "Warehouse inspection verifies package integrity and packing slip",
      },
      {
        name: "Gate 2: Finance Clearance",
        department: "Finance",
        action: "Finance officer approves customer payment receipt or credit standing",
      },
      {
        name: "Authorized Dispatch",
        department: "Delivery",
        action: "Formal delivery order unlocked; shipment authorized for departure",
      },
    ],
  },
];

export default function WorkFulfillmentFlow({ project }: WorkFulfillmentFlowProps) {
  const rootRef = useRef<HTMLElement>(null);
  const flowPaths = project.flowPaths || DEFAULT_FLOW_PATHS;
  const [activeTabId, setActiveTabId] = useState(flowPaths[0]?.id || "in-stock");

  const currentPath =
    flowPaths.find((path) => path.id === activeTabId) || flowPaths[0];

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
      id="fulfillment-flow"
      aria-labelledby="flow-heading"
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
          <span>03 / SYSTEM FLOW &amp; DECISIONS</span>
          <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            INTERACTIVE STATE MACHINE
          </span>
        </div>

        <h2
          id="flow-heading"
          data-reveal
          className="mt-6 sm:mt-8 max-w-4xl font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]"
        >
          One order. Multiple fulfillment paths.
        </h2>

        <p
          data-reveal
          className="mt-6 sm:mt-8 max-w-3xl font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal"
        >
          Explore how the system splits each line item into independent operational
          branches while enforcing strict transactional convergence before dispatch.
        </p>

        {/* Interactive Feature Card Container */}
        <div
          data-reveal
          className="mt-10 sm:mt-12 rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-5 sm:p-7 md:p-8 shadow-2xl shadow-black/60"
        >
          {/* Path Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800/60 pb-5">
            {flowPaths.map((path) => {
              const isActive = path.id === activeTabId;
              return (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => setActiveTabId(path.id)}
                  className={`cursor-pointer rounded-md px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-[#f97316]/15 text-[#fb923c] border border-[#f97316]/40 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent"
                  }`}
                >
                  {path.title}
                </button>
              );
            })}
          </div>

          {/* Active Flow Header */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                <h3 className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight">
                  {currentPath.title}
                </h3>
              </div>
              <p className="mt-1 font-sans text-sm text-zinc-400 max-w-xl">
                {currentPath.description}
              </p>
            </div>
            <span className="self-start sm:self-auto font-mono text-[10px] uppercase tracking-widest text-zinc-400 border border-zinc-800 bg-zinc-900/60 rounded px-2.5 py-1">
              {currentPath.badge}
            </span>
          </div>

          {/* Interactive Steps Pipeline */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            {currentPath.steps.map((step, idx) => (
              <div
                key={step.name}
                className="relative rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 mb-2">
                    <span className="text-[#f97316] font-semibold">
                      STEP 0{idx + 1}
                    </span>
                    <span className="uppercase text-zinc-400">
                      {step.department}
                    </span>
                  </div>
                  <h4 className="font-sans text-sm sm:text-[15px] font-bold text-white leading-snug">
                    {step.name}
                  </h4>
                  <p className="mt-2 font-sans text-xs text-zinc-400 leading-relaxed">
                    {step.action}
                  </p>
                </div>

                {idx < currentPath.steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-zinc-600 font-mono text-xs">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Decisions & Trade-offs */}
        <div className="mt-16 sm:mt-20">
          <div
            data-reveal
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-zinc-500 mb-6"
          >
            KEY ARCHITECTURAL DECISIONS &amp; TRADE-OFFS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.decisions.map((item) => (
              <div
                key={item.number}
                data-reveal
                className="rounded-lg border border-zinc-800/60 bg-zinc-950/60 p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline gap-2.5 font-mono text-xs text-[#f97316] font-semibold">
                    <span>{item.number}</span>
                    <h3 className="font-sans text-base sm:text-lg font-bold uppercase text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-3 font-sans text-sm font-semibold text-zinc-200">
                    {item.decision}
                  </p>

                  <div className="mt-4 pt-4 border-t border-zinc-800/50 space-y-2 text-xs leading-relaxed">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block">
                        RATIONALE
                      </span>
                      <p className="mt-0.5 text-zinc-400">{item.rationale}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
