"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import worksData from "@/content/works.json";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Discipline {
  number: string;
  category: string;
  description: string;
  keywords: string[];
}

const DISCIPLINES: Discipline[] = [
  {
    number: "01",
    category: "LANGUAGES & RUNTIMES",
    description: "Core languages behind the work, from typed web apps to PHP services and cross-platform mobile.",
    keywords: [
      "typescript",
      "javascript",
      "php",
      "dart",
      "python",
      "node",
      "bun",
      "go",
      "rust",
      "kotlin",
      "swift",
      "java",
    ],
  },
  {
    number: "02",
    category: "FRAMEWORKS & INTERFACES",
    description: "Application frameworks and interface layers, spanning server-rendered Laravel, React and Next.js, and Flutter.",
    keywords: [
      "next",
      "react",
      "vue",
      "svelte",
      "astro",
      "laravel",
      "django",
      "flutter",
      "blade",
      "alpine",
      "tailwind",
      "tanstack",
      "provider",
      "riverpod",
      "zod",
      "express",
      "nest",
    ],
  },
  {
    number: "03",
    category: "DATA & STORAGE",
    description: "Relational databases, ORMs, object storage, and on-device persistence.",
    keywords: [
      "postgres",
      "mysql",
      "mariadb",
      "sqlite",
      "mongodb",
      "redis",
      "prisma",
      "eloquent",
      "minio",
      "s3",
      "shared_preferences",
      "storage",
    ],
  },
  {
    number: "04",
    category: "AUTH, PLATFORMS & TOOLING",
    description: "Identity and permissions, push and local notifications, data import, and the tooling around each system.",
    keywords: [
      "nextauth",
      "auth",
      "spatie",
      "permission",
      "firebase",
      "fcm",
      "messaging",
      "notification",
      "http",
      "dio",
      "excel",
      "spreadsheet",
      "docker",
      "kubernetes",
      "aws",
      "vps",
    ],
  },
];

const FALLBACK: Discipline = {
  number: "",
  category: "TOOLS & LIBRARIES",
  description: "Additional libraries pulled in by the projects above.",
  keywords: [],
};

function classify(item: string): Discipline {
  const lower = item.toLowerCase();
  let best: Discipline | null = null;
  let bestLength = 0;

  for (const discipline of DISCIPLINES) {
    for (const keyword of discipline.keywords) {
      if (lower.includes(keyword) && keyword.length > bestLength) {
        best = discipline;
        bestLength = keyword.length;
      }
    }
  }

  return best ?? FALLBACK;
}

function buildStackGroups() {
  const seen = new Set<string>();
  const buckets = new Map<string, string[]>();
  DISCIPLINES.forEach((discipline) => buckets.set(discipline.number, []));

  const fallbackItems: string[] = [];

  for (const project of worksData.projects) {
    for (const tech of project.stack ?? []) {
      if (seen.has(tech)) continue;
      seen.add(tech);

      const discipline = classify(tech);
      if (discipline === FALLBACK) {
        fallbackItems.push(tech);
      } else {
        buckets.get(discipline.number)?.push(tech);
      }
    }
  }

  const groups = DISCIPLINES.map((discipline) => ({
    ...discipline,
    items: buckets.get(discipline.number) ?? [],
  })).filter((group) => group.items.length > 0);

  if (fallbackItems.length > 0) {
    groups.push({
      ...FALLBACK,
      number: String(DISCIPLINES.length + 1).padStart(2, "0"),
      items: fallbackItems,
    });
  }

  return groups;
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
            The production stack drawn from the systems below, grouped by the layer each
            technology belongs to.
          </p>
        </div>

        <div ref={listRef} className="mt-12 sm:mt-16">
          {STACK_GROUPS.map((group) => (
            <div key={group.category} className="stack-row">
              <div className="h-px w-full bg-zinc-800/60" aria-hidden="true" />
              <div className="grid grid-cols-1 gap-5 py-8 sm:py-10 md:grid-cols-12 md:gap-10 lg:gap-12">
                <div className="flex items-baseline gap-3 md:col-span-4">
                  <span className="font-mono text-2xl sm:text-3xl font-light tracking-tight text-zinc-500/80 select-none">
                    {group.number}
                  </span>
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-white">
                    {group.category}
                  </h3>
                </div>

                <div className="md:col-span-8">
                  <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                    {group.items.map((skill) => (
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
                    {group.description}
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
