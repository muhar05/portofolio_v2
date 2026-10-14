"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ProjectMedia from "@/components/sections/works/ProjectMedia";
import type { Project, ProjectMedia as ProjectMediaType } from "@/types/works";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface WorkHeroProps {
  project: Project;
}

export default function WorkHero({ project }: WorkHeroProps) {
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
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
        }
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <nav aria-label="Back to work" className="mb-12 sm:mb-16" data-reveal>
          <Link
            href="/#selected-work"
            className="group inline-flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
          >
            <span className="border-b border-transparent group-hover:border-white pb-0.5 transition-colors">
              BACK TO WORK
            </span>
            <span
              className="text-[#f97316] transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </nav>

        <header>
          <div
            data-reveal
            className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#f97316] font-semibold"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#f97316]"
              aria-hidden="true"
            />
            <span>01 / PROJECT</span>
            <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
              CASE STUDY
            </span>
          </div>

          <h1
            data-reveal
            className="mt-6 sm:mt-8 font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.03]"
          >
            {project.title}
          </h1>

          <p
            data-reveal
            className="mt-6 sm:mt-8 max-w-3xl font-sans text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 leading-[1.14]"
          >
            {project.headline}
          </p>

          <div
            data-reveal
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400"
          >
            <span className="text-zinc-200 font-semibold">
              {project.category}
            </span>
            {project.role && (
              <>
                <span className="text-zinc-600" aria-hidden="true">
                  ·
                </span>
                <span>{project.role}</span>
              </>
            )}
            <span className="text-zinc-600" aria-hidden="true">
              ·
            </span>
            <span>{project.year}</span>
          </div>
        </header>

        {project.media && (
          <figure className="mt-12 sm:mt-16" data-reveal>
            <ProjectMedia
              media={project.media as ProjectMediaType}
              title={project.title}
              variant="cover"
              mode="image"
              priority
            />
            <figcaption className="mt-2.5 flex items-center justify-between text-[9.5px] font-mono text-zinc-500 uppercase tracking-widest">
              <span>PROJECT ARTIFACT</span>
              <span>PRIMARY VISUAL</span>
            </figcaption>
          </figure>
        )}

        <p
          data-reveal
          className="mt-10 sm:mt-14 max-w-2xl font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal"
        >
          {project.description}
        </p>
      </div>
    </section>
  );
}
