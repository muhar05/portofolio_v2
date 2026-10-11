"use client";

import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const LAYERS = [
  {
    number: "01",
    name: "CLIENT",
    items: ["Next.js App Router", "React", "TanStack Query", "Zod"],
  },
  {
    number: "02",
    name: "APPLICATION",
    items: [
      "Server Actions",
      "Business Services",
      "Validation",
      "Authorization / RBAC",
    ],
  },
  {
    number: "03",
    name: "DOMAIN FLOWS",
    items: [
      "Sales Order",
      "Fulfillment",
      "Procurement",
      "Inventory",
      "Delivery",
      "Approval",
    ],
  },
  {
    number: "04",
    name: "DATA",
    items: ["PostgreSQL", "Prisma"],
  },
  {
    number: "05",
    name: "INFRASTRUCTURE",
    items: ["Authentication", "MinIO", "Email / OTP"],
  },
];

const RELATIONSHIPS = [
  "SALES ORDER",
  "Fulfillment Decision",
  "Stock Reservation OR Procurement",
  "Goods Receipt",
  "Inventory",
  "Delivery Request",
  "Warehouse Approval",
  "Finance Approval",
];

const PRINCIPLES = [
  {
    number: "01",
    title: "BUSINESS LOGIC STAYS EXPLICIT",
    body: "Critical operational rules live in application/service boundaries instead of being scattered across UI components.",
  },
  {
    number: "02",
    title: "DATABASE AS OPERATIONAL SOURCE",
    body: "PostgreSQL maintains the relational state connecting orders, items, procurement, inventory, and delivery.",
  },
  {
    number: "03",
    title: "CONTROLLED AUTHORIZATION",
    body: "RBAC and approval boundaries determine which roles can perform each operational transition.",
  },
  {
    number: "04",
    title: "VALIDATE AT THE BOUNDARY",
    body: "Zod validation is used at application boundaries so invalid state does not silently enter the workflow.",
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

export default function WorkArchitecture() {
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
      id="architecture"
      aria-labelledby="architecture-heading"
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
          <span>05 / ARCHITECTURE</span>
          <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            SYSTEM STRUCTURE
          </span>
        </div>

        <h2
          id="architecture-heading"
          data-reveal
          className="mt-6 sm:mt-8 max-w-4xl font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12]"
        >
          The architecture follows the operation.
        </h2>

        <p
          data-reveal
          className="mt-10 sm:mt-14 max-w-3xl font-sans text-lg sm:text-xl text-zinc-200 leading-relaxed font-normal"
        >
          The system is structured around the operational boundaries that
          matter: order context, fulfillment decisions, inventory movement,
          authorization, and the departments responsible for each transition.
        </p>

        <div className="mt-16 sm:mt-24 md:mt-28">
          {LAYERS.map((layer, index) => (
            <Fragment key={layer.number}>
              <div
                data-reveal
                className="grid grid-cols-1 gap-3 border-t border-zinc-800/60 py-6 sm:grid-cols-12 sm:gap-8 sm:py-7"
              >
                <div className="flex items-baseline gap-3 sm:col-span-3">
                  <span className="font-mono text-xs font-semibold tracking-wider text-[#f97316]">
                    {layer.number}
                  </span>
                  <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-100 sm:text-sm">
                    {layer.name}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 sm:col-span-9">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-2.5 font-sans text-sm text-zinc-300 sm:text-base"
                    >
                      <span
                        className="h-1 w-1 rounded-full bg-zinc-600"
                        aria-hidden="true"
                      />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {index < LAYERS.length - 1 && (
                <div
                  className="flex justify-center py-1"
                  aria-hidden="true"
                >
                  <div className="flex flex-col items-center">
                    <div className="h-4 w-px bg-zinc-700" />
                    <DownChevron />
                  </div>
                </div>
              )}
            </Fragment>
          ))}
          <div className="h-px w-full bg-zinc-800/40" aria-hidden="true" />
        </div>

        <div className="mt-16 sm:mt-24 md:mt-28">
          <div
            data-reveal
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-zinc-500"
          >
            OPERATIONAL RELATIONSHIPS
          </div>

          <div
            data-reveal
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3"
          >
            {RELATIONSHIPS.map((relationship, index) => (
              <Fragment key={relationship}>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-200 sm:text-xs">
                  {relationship}
                </span>
                {index < RELATIONSHIPS.length - 1 && (
                  <span
                    className="font-mono text-xs text-[#f97316]"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="mt-16 sm:mt-24 md:mt-28">
          <div
            data-reveal
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-zinc-500"
          >
            ARCHITECTURE PRINCIPLES
          </div>

          <div className="mt-6 sm:mt-8">
            {PRINCIPLES.map((principle) => (
              <div key={principle.number} data-reveal className="relative">
                <div
                  className="h-px w-full bg-zinc-800/60"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 items-start gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-16 lg:gap-12">
                  <div className="flex flex-col items-start gap-2 md:col-span-5 lg:col-span-5">
                    <span className="font-mono text-3xl font-light tracking-tight text-zinc-500/80 sm:text-4xl md:text-5xl select-none">
                      {principle.number}
                    </span>
                    <h3 className="font-sans text-xl font-bold uppercase leading-snug tracking-tight text-white sm:text-2xl md:text-[26px]">
                      {principle.title}
                    </h3>
                  </div>

                  <div className="md:col-span-7 md:col-start-6 md:pt-1.5 lg:col-span-7 lg:col-start-6">
                    <p className="max-w-xl font-sans text-base font-normal leading-relaxed text-zinc-300 sm:text-lg lg:text-[18px]">
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
