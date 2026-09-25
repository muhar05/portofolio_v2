"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import worksData from "@/content/works.json";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SelectedWork() {
  const project = worksData.projects[0];
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    if (prefersReducedMotion) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      if (metricsRef.current) gsap.set(metricsRef.current, { opacity: 1, y: 0 });
      if (diagramRef.current) gsap.set(diagramRef.current, { opacity: 1, y: 0 });
      if (impactRef.current) gsap.set(impactRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Header timeline
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              refreshPriority: -3,
            },
          }
        );
      }

      // Key Metrics timeline
      if (metricsRef.current) {
        const metricItems = metricsRef.current.querySelectorAll(".metric-block");
        gsap.fromTo(
          metricItems,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: metricsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              refreshPriority: -3,
            },
          }
        );
      }

      // Workflow Diagram timeline (single cohesive entrance)
      if (diagramRef.current) {
        gsap.fromTo(
          diagramRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: diagramRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              refreshPriority: -3,
            },
          }
        );
      }

      // Impact & CTA timeline
      if (impactRef.current) {
        gsap.fromTo(
          impactRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: impactRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
              refreshPriority: -3,
            },
          }
        );
      }

      ScrollTrigger.sort();
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, []);

  if (!project) return null;

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      aria-labelledby="selected-work-heading"
      className="relative w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-28 sm:py-36 md:py-44 overflow-hidden border-b border-zinc-800/40"
    >
      <div id="project" className="absolute -top-12" aria-hidden="true" />

      <div className="mx-auto w-full max-w-5xl">
        {/* =====================================================================
            01 / HEADER: HOOK & POSITIONING
        ====================================================================== */}
        <div ref={headerRef} className="max-w-3xl will-change-transform will-change-opacity">
          <div className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#f97316] font-semibold">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#f97316]"
              aria-hidden="true"
            />
            <span>05 / SELECTED WORK</span>
            <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
              FEATURED ARTIFACT
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
            <span className="text-zinc-200 font-semibold">{project.title}</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <h2
            id="selected-work-heading"
            className="mt-5 sm:mt-6 font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12]"
          >
            {project.headline}
          </h2>

          <p className="mt-4 sm:mt-6 font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* =====================================================================
            02 / KEY NUMBERS: DOCUMENTED SCALE & RIGOR
        ====================================================================== */}
        <div
          ref={metricsRef}
          className="mt-12 sm:mt-16 pt-8 pb-8 border-y border-zinc-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 will-change-transform will-change-opacity"
        >
          <div className="metric-block">
            <div className="font-mono text-3xl sm:text-4xl font-light tracking-tight text-white">
              09
            </div>
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#f97316] font-semibold mt-1">
              ROLES
            </div>
            <div className="font-sans text-xs text-zinc-400 mt-1">
              9-role transactional RBAC
            </div>
          </div>

          <div className="metric-block">
            <div className="font-mono text-3xl sm:text-4xl font-light tracking-tight text-white">
              02
            </div>
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#f97316] font-semibold mt-1">
              FULFILLMENT PATHS
            </div>
            <div className="font-sans text-xs text-zinc-400 mt-1">
              Stock reservation &amp; procurement
            </div>
          </div>

          <div className="metric-block">
            <div className="font-mono text-3xl sm:text-4xl font-light tracking-tight text-white">
              04
            </div>
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#f97316] font-semibold mt-1">
              CORE DECISIONS
            </div>
            <div className="font-sans text-xs text-zinc-400 mt-1">
              Documented architecture decisions
            </div>
          </div>

          <div className="metric-block">
            <div className="font-mono text-3xl sm:text-4xl font-light tracking-tight text-white">
              05
            </div>
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#f97316] font-semibold mt-1">
              LIFECYCLE STAGES
            </div>
            <div className="font-sans text-xs text-zinc-400 mt-1">
              Structured operational lifecycle
            </div>
          </div>
        </div>

        {/* =====================================================================
            03 / FLAT EDITORIAL ERP WORKFLOW (SIMPLIFIED FOR SCANNING)
        ====================================================================== */}
        <div
          ref={diagramRef}
          className="mt-12 sm:mt-16 will-change-transform will-change-opacity"
        >
          <div className="relative rounded-lg border border-zinc-800/80 bg-[#0c0c0e] p-5 sm:p-7 md:p-8 shadow-2xl shadow-black/50">
            {/* Diagram Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/60 pb-3 font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-[0.16em]">
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-zinc-300 font-medium">FIG.02 // ERP OPERATIONAL LIFECYCLE</span>
              </div>
              <div className="text-zinc-500 hidden sm:block">
                STATE MACHINE DIAGRAM
              </div>
            </div>

            {/* Workflow Pipeline */}
            <div className="mt-6 space-y-4 sm:space-y-5">
              {/* STAGE 1: COMMERCIAL INITIATION (SALES -> LEAD -> QUOTATION -> SALES ORDER) */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10px] uppercase text-zinc-400 tracking-wider">
                  <span className="text-zinc-300 font-medium">01 // COMMERCIAL PIPELINE</span>
                  <span className="text-zinc-500">SALES</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="rounded border border-zinc-800/70 bg-zinc-950/60 px-3 py-2.5 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-zinc-200">1. LEAD</span>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase">QUALIFIED</span>
                  </div>
                  <div className="rounded border border-zinc-800/70 bg-zinc-950/60 px-3 py-2.5 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-zinc-200">2. QUOTATION</span>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase">APPROVED</span>
                  </div>
                  <div className="rounded border border-zinc-800/70 bg-zinc-950/60 px-3 py-2.5 border-l-2 border-l-[#f97316] flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-white">3. SALES ORDER</span>
                    <span className="font-mono text-[9px] text-[#f97316] uppercase font-medium">ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* TRANSITION VECTOR */}
              <div className="flex items-center justify-center text-zinc-600 font-mono text-[9.5px] uppercase tracking-widest select-none py-0.5">
                <span>↓ PER-ITEM FULFILLMENT ROUTING</span>
              </div>

              {/* STAGE 2: DIVERGENT FULFILLMENT BRANCHES */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10px] uppercase text-zinc-400 tracking-wider">
                  <span className="text-zinc-300 font-medium">02 // BRANCHED FULFILLMENT</span>
                  <span className="text-zinc-500">PARALLEL TRACKS</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Branch A: Stock Available */}
                  <div className="rounded border border-zinc-800/70 bg-zinc-950/60 p-3.5 sm:p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[10px] font-mono border-b border-zinc-900 pb-1.5 mb-2">
                      <span className="font-semibold text-emerald-400 uppercase tracking-wider">
                        PATH A // STOCK AVAILABLE
                      </span>
                      <span className="text-zinc-500 uppercase">WAREHOUSE</span>
                    </div>
                    <div className="font-sans text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                      STOCK RESERVATION
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-400 font-sans">
                      Immediate database transaction locks physical inventory from shelves.
                    </p>
                  </div>

                  {/* Branch B: Need Procurement */}
                  <div className="rounded border border-zinc-800/70 bg-zinc-950/60 p-3.5 sm:p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[10px] font-mono border-b border-zinc-900 pb-1.5 mb-2">
                      <span className="font-semibold text-amber-400 uppercase tracking-wider">
                        PATH B // NEED PROCUREMENT
                      </span>
                      <span className="text-zinc-500 uppercase">PURCHASING</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-white">
                      <span>PURCHASE REQ</span>
                      <span className="text-zinc-600">→</span>
                      <span>PO</span>
                      <span className="text-zinc-600">→</span>
                      <span className="text-emerald-400">GOODS RECEIPT</span>
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-400 font-sans">
                      Vendor delivery received at dock directly increments inventory balance.
                    </p>
                  </div>
                </div>
              </div>

              {/* TRANSITION VECTOR */}
              <div className="flex items-center justify-center text-zinc-600 font-mono text-[9.5px] uppercase tracking-widest select-none py-0.5">
                <span>↓ BOTH PATHS CONVERGE</span>
              </div>

              {/* STAGE 3: INVENTORY RECONCILIATION */}
              <div className="rounded border border-zinc-800/70 bg-zinc-950/60 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-[#f97316]">03</span>
                  <span className="font-sans text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                    INVENTORY
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase">
                  RECONCILED FLOOR BALANCE
                </span>
              </div>

              {/* TRANSITION VECTOR */}
              <div className="flex items-center justify-center text-zinc-600 font-mono text-[9.5px] uppercase tracking-widest select-none py-0.5">
                <span>↓ DELIVERY REQUEST FILED</span>
              </div>

              {/* STAGE 4: SEQUENTIAL DUAL-GATE APPROVAL */}
              <div className="rounded border border-zinc-800/70 bg-zinc-950/60 p-3.5 sm:p-4">
                <div className="flex items-center justify-between gap-2 border-b border-zinc-900 pb-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[#f97316]">04</span>
                    <span className="font-sans text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                      SEQUENTIAL DUAL-GATE CLEARANCE
                    </span>
                  </div>
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-zinc-400 border border-zinc-800 px-1.5 py-0.5 rounded">
                    TWO-KEY PROTOCOL
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="rounded bg-zinc-900/40 border border-zinc-800/50 p-2.5">
                    <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 font-medium">
                      <span>GATE 1: WAREHOUSE APPROVAL</span>
                      <span className="text-emerald-400">PHYSICAL</span>
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-400 font-sans">
                      Physical audit: stock picked, packed, and verified on loading dock.
                    </p>
                  </div>
                  <div className="rounded bg-zinc-900/40 border border-zinc-800/50 p-2.5">
                    <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 font-medium">
                      <span>GATE 2: FINANCE APPROVAL</span>
                      <span className="text-emerald-400">FINANCIAL</span>
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-400 font-sans">
                      Credit audit: customer standing cleared and payment terms validated.
                    </p>
                  </div>
                </div>
              </div>

              {/* TRANSITION VECTOR */}
              <div className="flex items-center justify-center text-zinc-600 font-mono text-[9.5px] uppercase tracking-widest select-none py-0.5">
                <span>↓ DUAL APPROVAL LOGGED</span>
              </div>

              {/* STAGE 5: TERMINAL DISPATCH */}
              <div className="rounded border border-zinc-800/70 bg-zinc-950/60 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-[#f97316]">05</span>
                  <span className="font-sans text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                    DELIVERY ORDER &amp; DISPATCH
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase">
                  DEPT: LOGISTICS · TERMINAL STATE
                </span>
              </div>
            </div>

            {/* Technical plate footer metadata */}
            <div className="mt-6 pt-3 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
              <span>PROTOCOL: TRANSACTIONAL INTEGRITY</span>
              <span>STATE MACHINE: 5-STAGE RELATIONAL PIPELINE</span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            04 / IMPACT STATEMENT & RESTRAINED CASE STUDY ENTRY POINT
        ====================================================================== */}
        <div ref={impactRef} className="mt-12 sm:mt-16 will-change-transform will-change-opacity">
          <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/50 p-6 sm:p-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f97316] font-semibold">
              OPERATIONAL IMPACT
            </div>
            <p className="mt-2 font-sans text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
              Deterministic operational flow with line-item fulfillment tracking, physical goods receipt directly into inventory, and sequential dual approval before dispatch.
            </p>

            <div className="mt-6 pt-5 border-t border-zinc-800/60 flex items-center justify-between flex-wrap gap-4">
              <Link
                href="/works/order-operations-system"
                className="group inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-zinc-100 hover:text-white transition-colors"
              >
                <span className="border-b border-zinc-700 group-hover:border-white pb-0.5 transition-colors font-medium">
                  VIEW CASE STUDY
                </span>
                <span
                  className="text-[#f97316] transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>

              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                FULL ARCHITECTURE &amp; SCHEMA ON DETAIL PAGE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
