"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import worksData from "@/content/works.json";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Works() {
  const { works } = worksData;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
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
      if (descriptionRef.current) gsap.set(descriptionRef.current, { opacity: 1, y: 0 });
      itemRefs.current.forEach((itemEl) => {
        if (!itemEl) return;
        const dividerEl = itemEl.querySelector(".work-divider");
        const numberEl = itemEl.querySelector(".work-number");
        const contentEl = itemEl.querySelector(".work-content");
        if (dividerEl) gsap.set(dividerEl, { scaleX: 1 });
        if (numberEl) gsap.set(numberEl, { opacity: 1, y: 0 });
        if (contentEl) gsap.set(contentEl, { opacity: 1, y: 0 });
      });
      if (bottomDividerRef.current) gsap.set(bottomDividerRef.current, { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Header timeline
      if (headerRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
            refreshPriority: -2,
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

        if (descriptionRef.current) {
          headerTl.fromTo(
            descriptionRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            "-=0.35"
          );
        }
      }

      // Area entries timeline
      itemRefs.current.forEach((itemEl, index) => {
        if (!itemEl) return;

        const dividerEl = itemEl.querySelector(".work-divider");
        const numberEl = itemEl.querySelector(".work-number");
        const contentEl = itemEl.querySelector(".work-content");
        const isLast = index === works.items.length - 1;

        const itemTl = gsap.timeline({
          scrollTrigger: {
            trigger: itemEl,
            start: "top 85%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
            refreshPriority: -2,
          },
        });

        if (dividerEl) {
          itemTl.fromTo(
            dividerEl,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.6, ease: "power2.out" }
          );
        }

        if (numberEl) {
          itemTl.fromTo(
            numberEl,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
            "-=0.35"
          );
        }

        if (contentEl) {
          itemTl.fromTo(
            contentEl,
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
      id="what-i-work-on"
      aria-labelledby="works-heading"
      className="relative w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-28 sm:py-36 md:py-44 overflow-hidden border-b border-zinc-800/40"
    >
      <div id="works" className="absolute -top-12" aria-hidden="true" />

      <div className="mx-auto w-full max-w-5xl">
        {/* Editorial Asymmetric Header Block */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
        >
          <div className="lg:col-span-7">
            <div
              ref={chapterRef}
              className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#f97316] font-semibold will-change-transform will-change-opacity"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#f97316]"
                aria-hidden="true"
              />
              <span>{works.chapter}</span>
              <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
                PROBLEM TAXONOMY
              </span>
            </div>

            <h2
              id="works-heading"
              ref={headlineRef}
              className="mt-6 sm:mt-8 font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12] will-change-transform will-change-opacity"
            >
              {works.headline}
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-1">
            <p
              ref={descriptionRef}
              className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal border-l border-zinc-800/80 pl-4 sm:pl-5 will-change-transform will-change-opacity max-w-md"
            >
              {works.description}
            </p>
          </div>
        </div>

        {/* 5 Problem Spaces / Diagnostic Sequence */}
        <div className="mt-16 sm:mt-24 md:mt-28">
          {works.items.map((item, index) => (
            <div
              key={item.number}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="group relative"
            >
              <div
                className="work-divider h-px w-full bg-zinc-800/60 will-change-transform"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 lg:gap-12 py-10 sm:py-12 md:py-14 items-start">
                <div className="work-number md:col-span-2 lg:col-span-2 will-change-transform will-change-opacity">
                  <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-zinc-500/80 select-none">
                    {item.number}
                  </span>
                </div>

                <div className="work-content md:col-span-10 lg:col-span-10 flex flex-col items-start will-change-transform will-change-opacity md:pt-1">
                  <h3 className="font-sans text-xl sm:text-2xl md:text-[24px] font-bold tracking-tight text-white uppercase leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-2xl">
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
