"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface StackCategory {
  number: string;
  category: string;
  skills: string[];
  description: string;
}

const STACK_CATEGORIES: StackCategory[] = [
  {
    number: "01",
    category: "FRONTEND & INTERFACES",
    skills: ["TypeScript", "Next.js (App Router)", "React 19", "TanStack Query", "Tailwind CSS"],
    description: "Responsive interfaces, client-side caching, robust form validation with Zod, and predictable state hydration.",
  },
  {
    number: "02",
    category: "BACKEND & DATA INTEGRITY",
    skills: ["Node.js", "PostgreSQL", "Prisma ORM", "REST APIs", "Database Transactions"],
    description: "Relational constraints, row-level concurrency locks, atomic database operations, and schema migrations.",
  },
  {
    number: "03",
    category: "SYSTEMS & ARCHITECTURE",
    skills: ["State Machines", "Role-Based Access Control", "MinIO Storage", "Docker", "Audit Logging"],
    description: "Multi-department operational lifecycles, transactional approval gates, and traceable audit trails.",
  },
];

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
      if (listRef.current) gsap.set(listRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
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
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
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
      className="relative w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 border-b border-zinc-800/40"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div ref={headerRef} className="max-w-3xl">
          <div className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#f97316] font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" aria-hidden="true" />
            <span>02 / TECHNICAL EXPERTISE</span>
            <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
              CORE PRODUCTION STACK
            </span>
          </div>

          <h2
            id="stack-heading"
            className="mt-6 sm:mt-8 font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]"
          >
            Built for reliability and scale.
          </h2>

          <p className="mt-4 sm:mt-6 font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal max-w-2xl">
            Technologies and architectural patterns I work with daily to build dependable,
            high-integrity web applications and business systems.
          </p>
        </div>

        <div ref={listRef} className="mt-12 sm:mt-16">
          {STACK_CATEGORIES.map((item) => (
            <div key={item.number} className="stack-row">
              <div className="h-px w-full bg-zinc-800/60" aria-hidden="true" />
              <div className="grid grid-cols-1 gap-5 py-8 sm:py-10 md:grid-cols-12 md:gap-10 lg:gap-12">
                <div className="flex items-baseline gap-3 md:col-span-4">
                  <span className="font-mono text-2xl sm:text-3xl font-light tracking-tight text-zinc-500/80 select-none">
                    {item.number}
                  </span>
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-white">
                    {item.category}
                  </h3>
                </div>

                <div className="md:col-span-8">
                  <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-2 font-sans text-sm text-zinc-200 sm:text-[15px]"
                      >
                        <span className="h-1 w-1 rounded-full bg-zinc-600" aria-hidden="true" />
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="h-px w-full bg-zinc-800/40" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
