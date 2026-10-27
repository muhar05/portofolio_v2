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
    category: "Languages & runtimes",
    description:
      "Core languages behind the work, from typed web apps to PHP services and cross-platform mobile.",
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
    category: "Frameworks & interfaces",
    description:
      "Application frameworks and interface layers, spanning server-rendered Laravel, React and Next.js, and Flutter.",
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
    category: "Data & storage",
    description:
      "Relational databases, ORMs, object storage, and on-device persistence.",
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
    category: "Auth, platforms & tooling",
    description:
      "Identity and permissions, notifications, data import, and the tooling around each system.",
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
  category: "Tools & libraries",
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
            I grouped the technologies from the systems above by layer.
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
