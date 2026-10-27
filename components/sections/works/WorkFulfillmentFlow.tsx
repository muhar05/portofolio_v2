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
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
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
      className="relative w-full border-t border-line px-[var(--page-pad)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[80rem]">
        <div
          data-reveal
          className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          <span className="text-accent-ink">03 / System flow &amp; decisions</span>
          <span className="text-line-strong" aria-hidden="true">
            /
          </span>
          <span>Interactive state machine</span>
        </div>

        <h2
          id="flow-heading"
          data-reveal
          className="mt-6 max-w-[52rem] text-balance font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground"
        >
          {project.flowHeadline ?? "How the system holds the process together."}
        </h2>

        <p
          data-reveal
          className="mt-5 max-w-[46rem] text-[15px] leading-relaxed text-ink-muted sm:mt-6 sm:text-base"
        >
          {project.overview.workflow ??
            "Select a path below to inspect the steps the system enforces."}
        </p>

        <div
          data-reveal
          className="mt-10 rounded-3xl border border-line bg-surface p-5 sm:mt-12 sm:p-7 md:p-8"
        >
          <div className="flex flex-wrap items-center gap-2 border-b border-line pb-5">
            {flowPaths.map((path) => {
              const isActive = path.id === activeTabId;
              return (
                <button
                  key={path.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTabId(path.id)}
                  className={`cursor-pointer rounded-full px-3.5 py-2 text-[12px] font-medium transition-colors ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-ink-muted hover:bg-background/60 hover:text-foreground"
                  }`}
                >
                  {path.title}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
                  {currentPath.title}
                </h3>
              </div>
              <p className="mt-1 max-w-xl text-[13.5px] text-ink-muted">
                {currentPath.description}
              </p>
            </div>
            <span className="self-start rounded-full border border-line bg-background/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-ink-muted sm:self-auto">
              {currentPath.badge}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            {currentPath.steps.map((step, idx) => (
              <div
                key={step.name}
                className="relative flex flex-col justify-between rounded-2xl border border-line bg-background/70 p-4 transition-colors hover:border-line-strong"
              >
                <div>
                  <div className="mb-2 flex items-center justify-between gap-2 text-[10px] text-ink-muted">
                    <span className="font-semibold text-accent-ink">
                      Step 0{idx + 1}
                    </span>
                    <span className="uppercase">{step.department}</span>
                  </div>
                  <h4 className="text-[14px] font-semibold leading-snug text-foreground">
                    {step.name}
                  </h4>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-muted">
                    {step.action}
                  </p>
                </div>

                {idx < currentPath.steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xs text-line-strong md:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <div
            data-reveal
            className="mb-6 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted sm:text-[11px]"
          >
            Key architectural decisions &amp; trade-offs
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6">
            {project.decisions.map((item) => (
              <div
                key={item.number}
                data-reveal
                className="flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:bg-surface-strong/60 sm:p-6"
              >
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xs font-semibold text-accent-ink">
                    {item.number}
                  </span>
                  <h3 className="font-display text-base font-semibold uppercase tracking-[-0.01em] text-foreground sm:text-lg">
                    {item.title}
                  </h3>
                </div>

                <p className="mt-3 text-[14px] font-medium text-foreground">
                  {item.decision}
                </p>

                <div className="mt-4 border-t border-line pt-4">
                  <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-ink-muted">
                    Rationale
                  </span>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">
                    {item.rationale}
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
