"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import worksData from "@/content/works.json";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SelectedWork() {
  const { works, projects } = worksData;
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const cards = sectionEl.querySelectorAll(".project-card");

    if (prefersReducedMotion) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      if (cards.length > 0) gsap.set(cards, { opacity: 1, y: 0 });
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

      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: railRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        }
      );

      ScrollTrigger.sort();
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".project-card");
    const amount = card ? card.offsetWidth + 16 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      aria-labelledby="selected-work-heading"
      className="relative w-full overflow-hidden border-t border-line px-[var(--page-pad)] py-20 sm:py-24 lg:py-32"
    >
      <div id="project" className="absolute -top-20" aria-hidden="true" />

      <div className="mx-auto w-full max-w-[90rem]">
        <div ref={headerRef} className="mx-auto max-w-[46rem] text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
            Selected work
          </p>
          <h2
            id="selected-work-heading"
            className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground"
          >
            {works.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-[34rem] text-[15px] leading-relaxed text-ink-muted">
            {works.description}
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-muted">
            {projects.length} production systems
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollRail(-1)}
              aria-label="Scroll projects left"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:bg-surface"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => scrollRail(1)}
              aria-label="Scroll projects right"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:bg-surface"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="project-rail mt-4"
          tabIndex={0}
          role="region"
          aria-label="Project carousel"
        >
          {projects.map((project) => {
            const cover = project.media?.images?.cover;
            return (
              <article
                key={project.id}
                className="project-card flex h-full flex-col rounded-2xl bg-surface p-3"
              >
                <Link
                  href={`/works/${project.id}`}
                  aria-label={`View ${project.title} case study`}
                  className="project-card__media relative block aspect-[4/3] overflow-hidden rounded-xl bg-surface-strong"
                >
                  {cover && (
                    <Image
                      src={cover}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1023px) 82vw, 30vw"
                      className="object-cover"
                    />
                  )}
                </Link>

                <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
                  <div className="flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.16em] text-ink-muted">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="mt-3 font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground">
                    {project.headline}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-ink-muted">
                    {project.description}
                  </p>

                  {project.stack && project.stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-line px-2.5 py-1 text-[10.5px] font-medium text-ink-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/works/${project.id}`}
                    className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-[12px] font-medium text-foreground"
                  >
                    Read case study
                    <span className="project-card__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
