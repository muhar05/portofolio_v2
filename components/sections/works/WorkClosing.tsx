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
      className="relative w-full border-t border-line px-[var(--page-pad)] py-20 sm:py-24 lg:py-28"
    >
      <div
        data-reveal
        className="mx-auto w-full max-w-[80rem] overflow-hidden rounded-[2rem] bg-[#111c17] px-6 py-14 text-[#edf0ea] sm:px-10 sm:py-20 lg:px-16"
      >
        <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#e07a52]">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#c9552e]"
            aria-hidden="true"
          />
          <span>Next work</span>
        </div>

        <h2 className="mt-6 max-w-[42rem] font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
          More systems worth exploring.
        </h2>

        <p className="mt-5 max-w-[34rem] text-[15px] leading-relaxed text-[#edf0ea]/65">
          Open another case study to see the problem, the decisions, and what
          changed.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${siteData.email}?subject=Similar%20project`}
            aria-label={`Email ${siteData.email} about a similar project`}
            onClick={() =>
              trackEvent("contact_click", {
                channel: "email",
                location: "case_study",
              })
            }
            className="btn-pill bg-[#edf0ea] text-[#111c17] transition-colors hover:bg-white"
          >
            Email about a similar project
          </a>

          {nextProject && (
            <Link
              href={`/works/${nextProject.id}`}
              className="btn-pill border border-white/20 text-[#edf0ea] transition-colors hover:bg-white/10"
            >
              Next: {nextProject.title}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-[#edf0ea]/50">
          Opens your mail app. The address is {siteData.email}.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/12 pt-6 text-[12px] font-medium text-[#edf0ea]/60">
          <Link
            href="/#selected-work"
            className="transition-colors hover:text-[#edf0ea]"
          >
            Back to works
          </Link>
          <button
            type="button"
            onClick={handleBackToTop}
            className="transition-colors hover:text-[#edf0ea]"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </section>
  );
}
