"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutData from "@/content/about.json";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function AboutMe() {
  const about = aboutData.about;
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
        gsap.set(listRef.current.querySelectorAll(".about-card"), {
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
        const cards = listRef.current.querySelectorAll(".about-card");
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
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full border-t border-line px-[var(--page-pad)] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[80rem]">
        <div ref={headerRef} className="max-w-[52rem]">
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="text-accent-ink">{about.chapter}</span>
            <span className="text-line-strong" aria-hidden="true">
              /
            </span>
            <span>{about.sublabel}</span>
          </div>

          <h2
            id="about-heading"
            className="mt-6 max-w-[42rem] text-balance font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground"
          >
            {about.headline}
          </h2>

          <p className="mt-5 max-w-[46rem] text-[15px] leading-relaxed text-ink-muted sm:text-base">
            {about.bio}
          </p>
          <p className="mt-3 text-[12px] leading-relaxed text-ink-muted">
            Client references can be shared on request.
          </p>
        </div>

        <div
          ref={listRef}
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {about.experience.items.map((item) => (
            <article
              key={item.title}
              className="about-card flex flex-col rounded-3xl border border-line bg-surface p-7 transition-colors hover:bg-surface-strong/60 sm:p-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent-ink">
                  {about.experience.label}
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
                {item.period && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
                    {item.period}
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-display text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                {item.description}
              </p>
            </article>
          ))}

          {about.education.items.map((item) => (
            <article
              key={item.institution}
              className="about-card flex flex-col rounded-3xl border border-line bg-surface p-7 transition-colors hover:bg-surface-strong/60 sm:p-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent-ink">
                  {about.education.label}
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-[clamp(1.35rem,2.2vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                {item.institution}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
                {item.degree}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
                {item.status}
              </p>
              {item.program && (
                <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
                  {item.program}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
