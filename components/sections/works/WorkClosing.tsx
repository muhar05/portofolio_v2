"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import siteData from "@/content/site.json";
import { trackEvent } from "@/lib/analytics";
import type { Project } from "@/types/works";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface WorkClosingProps {
  nextProject?: Project;
}

export default function WorkClosing({ nextProject }: WorkClosingProps) {
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

  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="h-px w-full bg-zinc-700/60" aria-hidden="true" />

        <div className="mt-14 sm:mt-20 md:mt-24">
          <div
            data-reveal
            className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#f97316] font-semibold"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#f97316]"
              aria-hidden="true"
            />
            <span>NEXT WORK</span>
          </div>

          <h2
            data-reveal
            className="mt-6 sm:mt-8 max-w-3xl font-sans text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05]"
          >
            More systems worth exploring.
          </h2>

          <p
            data-reveal
            className="mt-8 sm:mt-10 max-w-2xl font-sans text-lg sm:text-xl text-zinc-300 leading-relaxed font-normal"
          >
            Explore another project where software, business processes, and
            practical engineering meet.
          </p>

          <div
            data-reveal
            className="mt-12 flex flex-wrap items-center gap-4 sm:mt-14"
          >
            <a
              href={`mailto:${siteData.email}`}
              onClick={() =>
                trackEvent("contact_click", {
                  channel: "email",
                  location: "case_study",
                })
              }
              className="inline-flex min-h-11 items-center justify-center rounded bg-[#f97316] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition-colors hover:bg-[#fb923c]"
            >
              Discuss a similar project
            </a>

            {nextProject && (
              <Link
                href={`/works/${nextProject.id}`}
                className="group inline-flex min-h-11 items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:text-white sm:text-sm"
              >
                <span className="border-b border-zinc-700 pb-0.5 transition-colors group-hover:border-white">
                  Next case study
                </span>
                <span
                  className="text-[#f97316] transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            )}
          </div>

          <div
            data-reveal
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Link
              href="/#selected-work"
              className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-100 transition-colors hover:text-white sm:text-sm"
            >
              <span className="border-b border-zinc-700 pb-0.5 transition-colors group-hover:border-white">
                BACK TO WORKS
              </span>
              <span
                className="text-[#f97316] transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>

            <button
              type="button"
              onClick={handleBackToTop}
              className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white sm:text-sm"
            >
              <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-white">
                BACK TO TOP
              </span>
              <span
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
