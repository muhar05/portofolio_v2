"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutData from "@/content/about.json";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function About() {
  const { thinking } = aboutData;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomDividerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    if (prefersReducedMotion) {
      if (chapterRef.current) gsap.set(chapterRef.current, { opacity: 1, y: 0 });
      if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1, y: 0 });
      itemRefs.current.forEach((itemEl) => {
        if (!itemEl) return;
        const dividerEl = itemEl.querySelector(".principle-divider");
        const anchorEl = itemEl.querySelector(".principle-anchor");
        const bodyEl = itemEl.querySelector(".principle-body");
        if (dividerEl) gsap.set(dividerEl, { scaleX: 1 });
        if (anchorEl) gsap.set(anchorEl, { opacity: 1, y: 0 });
        if (bodyEl) gsap.set(bodyEl, { opacity: 1, y: 0 });
      });
      if (bottomDividerRef.current) gsap.set(bottomDividerRef.current, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        });

        if (chapterRef.current) {
          headerTl.fromTo(
            chapterRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        }

        if (headlineRef.current) {
          headerTl.fromTo(
            headlineRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          );
        }
      }

      // Principle rows animation
      itemRefs.current.forEach((itemEl, index) => {
        if (!itemEl) return;

        const dividerEl = itemEl.querySelector(".principle-divider");
        const anchorEl = itemEl.querySelector(".principle-anchor");
        const bodyEl = itemEl.querySelector(".principle-body");
        const isLast = index === thinking.principles.length - 1;

        const itemTl = gsap.timeline({
          scrollTrigger: {
            trigger: itemEl,
            start: "top 85%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        });

        if (dividerEl) {
          itemTl.fromTo(
            dividerEl,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.6, ease: "power2.out" }
          );
        }

        if (anchorEl) {
          itemTl.fromTo(
            anchorEl,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            "-=0.35"
          );
        }

        if (bodyEl) {
          itemTl.fromTo(
            bodyEl,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            "-=0.4"
          );
        }

        if (isLast && bottomDividerRef.current) {
          itemTl.fromTo(
            bottomDividerRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          );
        }
      });

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
      className="relative w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-28 sm:py-36 md:py-44 overflow-hidden border-b border-zinc-800/40"
    >
      <div id="about" className="absolute -top-12" aria-hidden="true" />

      <div className="mx-auto w-full max-w-5xl">
        <div ref={headerRef} className="max-w-3xl">
          <div
            ref={chapterRef}
            className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#f97316] font-semibold will-change-transform will-change-opacity"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#f97316]"
              aria-hidden="true"
            />
            <span>{thinking.chapter}</span>
            <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
              METHODOLOGY
            </span>
          </div>

          <h2
            id="thinking-heading"
            ref={headlineRef}
            className="mt-6 sm:mt-8 font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.14] will-change-transform will-change-opacity"
          >
            {thinking.headline}
          </h2>
        </div>

        <div className="mt-16 sm:mt-24 md:mt-28">
          {thinking.principles.map((item, index) => (
            <div
              key={item.number}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="group relative"
            >
              <div
                className="principle-divider h-px w-full bg-zinc-800/60 will-change-transform"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 py-12 sm:py-16 md:py-20 items-start">
                <div className="principle-anchor md:col-span-5 lg:col-span-5 flex flex-col items-start gap-2 will-change-transform will-change-opacity">
                  <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-zinc-500/80 select-none">
                    {item.number}
                  </span>
                  <h3 className="font-sans text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-white uppercase leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="principle-body md:col-span-7 lg:col-span-7 md:col-start-6 lg:col-start-6 will-change-transform will-change-opacity md:pt-1.5">
                  <p className="font-sans text-base sm:text-lg lg:text-[18px] leading-relaxed text-zinc-300 font-normal max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div
            ref={bottomDividerRef}
            className="h-px w-full bg-zinc-800/40 will-change-transform"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
