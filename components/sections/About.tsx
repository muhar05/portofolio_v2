"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutData from "@/content/about.json";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function LayerDiagram() {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-auto w-full max-w-[20rem]"
    >
      <rect
        x="24"
        y="28"
        width="272"
        height="184"
        rx="34"
        stroke="var(--line)"
      />
      <rect
        x="56"
        y="56"
        width="208"
        height="128"
        rx="24"
        fill="var(--surface)"
      />
      <rect
        x="88"
        y="84"
        width="144"
        height="72"
        rx="16"
        fill="var(--background)"
        stroke="var(--line)"
      />
      <circle cx="112" cy="108" r="6" fill="var(--accent)" />
      <rect x="128" y="104" width="72" height="6" rx="3" fill="var(--ink-muted)" opacity="0.5" />
      <rect x="104" y="126" width="112" height="6" rx="3" fill="var(--ink-muted)" opacity="0.3" />
      <path d="M24 180H296" stroke="var(--line)" strokeDasharray="4 6" />
      <circle cx="56" cy="180" r="5" fill="var(--foreground)" />
      <circle cx="160" cy="180" r="5" fill="var(--surface-strong)" />
      <circle cx="264" cy="180" r="5" fill="var(--foreground)" />
    </svg>
  );
}

export default function About() {
  const { thinking } = aboutData;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    if (prefersReducedMotion) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      if (listRef.current) {
        gsap.set(listRef.current.querySelectorAll(".principle-card"), {
          opacity: 1,
          y: 0,
        });
      }
      return;
    }

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (listRef.current) {
        const cards = listRef.current.querySelectorAll(".principle-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
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

  return (
    <section
      ref={sectionRef}
      id="thinking"
      aria-labelledby="thinking-heading"
      className="relative w-full border-t border-line px-[var(--page-pad)] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-[80rem] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div ref={headerRef} className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
              {thinking.chapter}
            </p>
            <h2
              id="thinking-heading"
              className="mt-4 font-display text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground"
            >
              {thinking.headline}
            </h2>
            <p className="mt-5 max-w-[30rem] text-[15px] leading-relaxed text-ink-muted">
              Three principles I use to keep existing systems stable while they
              change.
            </p>
            <div className="mt-10 hidden lg:block">
              <LayerDiagram />
            </div>
          </div>
        </div>

        <div ref={listRef} className="flex flex-col gap-4 lg:col-span-7">
          {thinking.principles.map((item) => (
            <article
              key={item.number}
              className="principle-card rounded-3xl border border-line bg-surface p-7 transition-colors hover:bg-surface-strong/60 sm:p-9 lg:p-10"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[11px] text-ink-muted">
                  {item.number}
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[36rem] text-[14.5px] leading-relaxed text-ink-muted">
                {item.description}
              </p>
            </article>
          ))}

          <div className="mt-4 flex items-center justify-between gap-4 rounded-3xl border border-line px-7 py-6 sm:px-9">
            <p className="max-w-[22rem] text-[14.5px] leading-relaxed text-ink-muted">
              Have a system that needs this kind of work?
            </p>
            <a href="#contact" className="btn-pill btn-ink shrink-0">
              Let&apos;s talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
