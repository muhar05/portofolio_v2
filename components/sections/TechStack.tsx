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
  const cardsRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    if (prefersReducedMotion) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      if (cardsRef.current) gsap.set(cardsRef.current, { opacity: 1, y: 0 });
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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".stack-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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

        <div ref={cardsRef} className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STACK_CATEGORIES.map((item) => (
            <div
              key={item.number}
              className="stack-card rounded-lg border border-zinc-800/70 bg-zinc-950/60 p-5 sm:p-6 flex flex-col justify-between transition-colors hover:border-zinc-700/80"
            >
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#f97316] font-semibold">
                  <span>{item.number}</span>
                  <span className="text-zinc-600">|</span>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-200">
                    {item.category}
                  </h3>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 font-mono text-[11px] text-zinc-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="mt-4 font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
