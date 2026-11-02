"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import worksData from "@/content/works.json";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const DAILY_STACK = ["TypeScript", "PHP", "Laravel"];
const DAILY_STACK_KEYS = new Set(DAILY_STACK.map((item) => item.toLowerCase()));

function buildStackGroups() {
  const seen = new Set<string>();
  const daily: string[] = [];
  const working: string[] = [];

  for (const project of worksData.projects) {
    for (const tech of project.stack ?? []) {
      const key = tech.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);

      if (DAILY_STACK_KEYS.has(key)) {
        daily.push(tech);
      } else {
        working.push(tech);
      }
    }
  }

  return [
    {
      number: "01",
      category: "Daily use",
      description:
        "The tools I reach for first: TypeScript for typed web work, PHP and Laravel for server-rendered operations systems.",
      items: daily,
    },
    {
      number: "02",
      category: "Working knowledge",
      description:
        "Tools I have used in the case studies above. Depth varies by project.",
      items: working,
    },
  ].filter((group) => group.items.length > 0);
}

const STACK_GROUPS = buildStackGroups();

export default function TechStack() {
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
        gsap.set(listRef.current.querySelectorAll(".stack-row"), {
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
        const rows = listRef.current.querySelectorAll(".stack-row");
        gsap.fromTo(
          rows,
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
      id="stack"
      aria-labelledby="stack-heading"
      className="relative w-full border-t border-line px-[var(--page-pad)] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[80rem]">
        <div ref={headerRef} className="mx-auto max-w-[46rem] text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
            Stack
          </p>
          <h2
            id="stack-heading"
            className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground"
          >
            The stack behind the work.
          </h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[15px] leading-relaxed text-ink-muted">
            I grouped the stack by how often I use it, not by logo count.
            Daily use means the tools I reach for first. Working knowledge
            means I have used them in the case studies above.
          </p>
        </div>

        <div
          ref={listRef}
          className="mt-12 overflow-hidden rounded-3xl border border-line bg-surface sm:mt-16"
        >
          {STACK_GROUPS.map((group) => (
            <div
              key={group.category}
              className="stack-row grid grid-cols-1 gap-5 border-b border-line p-6 transition-colors last:border-b-0 hover:bg-background/40 sm:p-8 md:grid-cols-12 md:gap-10 lg:p-10"
            >
              <div className="md:col-span-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-ink-muted">
                    {group.number}
                  </span>
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-foreground sm:text-xl">
                    {group.category}
                  </h3>
                </div>
                <p className="mt-3 max-w-[24rem] text-[13.5px] leading-relaxed text-ink-muted">
                  {group.description}
                </p>
              </div>

              <div className="md:col-span-8">
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-line bg-background/70 px-3 py-1.5 text-[12px] font-medium text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
