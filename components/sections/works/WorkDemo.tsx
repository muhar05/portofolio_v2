"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ProjectMedia from "@/components/sections/works/ProjectMedia";
import type { Project, ProjectMedia as ProjectMediaType } from "@/types/works";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface WorkDemoProps {
  project: Project;
}

export default function WorkDemo({ project }: WorkDemoProps) {
  const rootRef = useRef<HTMLElement>(null);

  const hasVideo = Boolean(project.media?.video?.src?.trim());

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
      id="demo"
      aria-labelledby="demo-heading"
      className="relative w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-24 sm:py-32 md:py-40"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div
          data-reveal
          className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#f97316] font-semibold"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#f97316]"
            aria-hidden="true"
          />
          <span>08 / DEMO</span>
          <span className="h-px w-6 sm:w-8 bg-zinc-800" aria-hidden="true" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
            WALKTHROUGH
          </span>
        </div>

        <h2
          id="demo-heading"
          data-reveal
          className="mt-6 sm:mt-8 max-w-4xl font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.12]"
        >
          See the system in motion.
        </h2>

        <p
          data-reveal
          className="mt-10 sm:mt-14 max-w-3xl font-sans text-lg sm:text-xl text-zinc-200 leading-relaxed font-normal"
        >
          A short walkthrough of the operational flow, from order creation
          through fulfillment, inventory, approval, and dispatch.
        </p>

        {hasVideo && project.media && (
          <figure className="mt-12 sm:mt-16" data-reveal>
            <ProjectMedia
              media={project.media as ProjectMediaType}
              title={project.title}
              mode="video"
            />
            <figcaption className="mt-2.5 flex items-center justify-between text-[9.5px] font-mono text-zinc-500 uppercase tracking-widest">
              <span>OPERATIONAL WALKTHROUGH</span>
              <span>RECORDED DEMO</span>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
