"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import worksData from "@/content/works.json";
import ProjectMedia from "@/components/sections/works/ProjectMedia";
import type { ProjectMedia as ProjectMediaType } from "@/types/works";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SelectedWork() {
  const { works, projects } = worksData;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const rows = sectionEl.querySelectorAll(".work-project-row");

    if (prefersReducedMotion) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      if (rows.length > 0) gsap.set(rows, { opacity: 1, y: 0 });
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

      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          }
        );
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
      id="selected-work"
      aria-labelledby="selected-work-heading"
      className="relative w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 overflow-hidden border-b border-zinc-800/40"
    >
      <div id="project" className="absolute -top-12" aria-hidden="true" />

      <div className="mx-auto w-full max-w-5xl">
        <div ref={headerRef} className="max-w-3xl">
          <div className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#f97316] font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" aria-hidden="true" />
            <span>03 / FEATURED WORK</span>
            <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
              PRODUCTION ARTIFACTS
            </span>
          </div>

          <h2
            id="selected-work-heading"
            className="mt-6 sm:mt-8 font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]"
          >
            {works.headline}
          </h2>

          <p className="mt-4 sm:mt-6 max-w-2xl font-sans text-base sm:text-lg font-normal leading-relaxed text-zinc-300">
            {works.description}
          </p>
        </div>

        <div className="mt-12 sm:mt-16">
          {projects.map((project, index) => (
            <div key={project.id} className="work-project-row">
              <div className="h-px w-full bg-zinc-800/60" aria-hidden="true" />
              <div className="grid grid-cols-1 items-center gap-8 py-10 sm:py-12 md:py-14 lg:grid-cols-12 lg:gap-12">
                <div className="flex flex-col lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 sm:text-xs">
                    <span className="text-2xl font-light tracking-tight text-zinc-500/80 select-none sm:text-3xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-zinc-200">{project.title}</span>
                    <span className="text-zinc-600" aria-hidden="true">
                      ·
                    </span>
                    <span>{project.category}</span>
                    <span className="text-zinc-600" aria-hidden="true">
                      ·
                    </span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="mt-4 font-sans text-2xl font-bold tracking-tight text-white leading-[1.15] sm:text-3xl">
                    {project.headline}
                  </h3>

                  <p className="mt-3 max-w-2xl font-sans text-base font-normal leading-relaxed text-zinc-300 sm:text-lg">
                    {project.description}
                  </p>

                  {project.stack && project.stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/works/${project.id}`}
                    className="group mt-5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-100 transition-colors hover:text-white sm:text-sm"
                  >
                    <span className="border-b border-zinc-700 pb-0.5 font-medium transition-colors group-hover:border-white">
                      VIEW CASE STUDY
                    </span>
                    <span
                      className="text-[#f97316] transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>

                {project.media && (
                  <div className="lg:col-span-5">
                    <Link
                      href={`/works/${project.id}`}
                      aria-label={`View ${project.title} case study`}
                      className="block"
                    >
                      <ProjectMedia
                        media={project.media as ProjectMediaType}
                        title={project.title}
                        variant="cover"
                        mode="image"
                        priority={index < 2}
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="h-px w-full bg-zinc-800/40" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
