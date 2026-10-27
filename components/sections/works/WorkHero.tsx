"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ProjectMedia from "@/components/sections/works/ProjectMedia";
import Logo from "@/components/ui/Logo";
import RollText from "@/components/ui/RollText";
import siteData from "@/content/site.json";
import { trackEvent } from "@/lib/analytics";
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
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
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
      className="relative w-full overflow-hidden px-[var(--page-pad)] pb-16 pt-4 sm:pb-24"
    >
      <div className="mx-auto w-full max-w-[80rem]">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground"
            aria-label="Muhar Ferdiansyah, back to homepage"
          >
            <Logo className="h-6 w-6" />
            <span className="font-display text-lg font-semibold tracking-[-0.03em]">
              muhar
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/#selected-work"
              className="hidden text-[13px] font-medium text-ink-muted transition-colors hover:text-foreground sm:inline"
            >
              All work
            </Link>
            <a
              href={`mailto:${siteData.email}?subject=Portfolio%20inquiry`}
              onClick={() =>
                trackEvent("contact_click", {
                  channel: "email",
                  location: "case_study_nav",
                })
              }
              className="btn-pill btn-ink btn-sheen px-4 text-[13px]"
            >
              <RollText text="Let's talk" gap="0.04em" />
            </a>
          </div>
        </div>

        <div className="mt-12 w-full max-w-[64rem] sm:mt-16">
          <div
            data-reveal
            className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="text-accent-ink">Case study</span>
            <span className="text-line-strong" aria-hidden="true">
              /
            </span>
            <span>{project.category}</span>
            <span className="text-line-strong" aria-hidden="true">
              /
            </span>
            <span>{project.year}</span>
          </div>

          <h1
            data-reveal
            className="mt-6 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground"
          >
            {project.title}
          </h1>

          <p
            data-reveal
            className="mt-5 max-w-[46rem] font-display text-[clamp(1.35rem,2.6vw,2.15rem)] font-medium leading-[1.15] tracking-[-0.025em] text-ink-muted"
          >
            {project.headline}
          </p>

          <div
            data-reveal
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-muted"
          >
            <span className="font-semibold text-foreground">
              {project.category}
            </span>
            {project.role && (
              <>
                <span className="text-line-strong" aria-hidden="true">
                  ·
                </span>
                <span>{project.role}</span>
              </>
            )}
            <span className="text-line-strong" aria-hidden="true">
              ·
            </span>
            <span>{project.year}</span>
          </div>

          {project.summary && (
            <div
              data-reveal
              className="mt-8 max-w-[44rem] border-l-2 border-accent pl-4 sm:pl-5"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent-ink">
                In short
              </p>
              <p className="mt-2 text-[16px] leading-relaxed text-foreground/85 sm:text-[17px]">
                {project.summary}
              </p>
            </div>
          )}

          {project.atAGlance && project.atAGlance.length > 0 && (
            <div data-reveal className="mt-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                At a glance
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.atAGlance.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-2xl border border-line bg-surface p-4"
                  >
                    <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-semibold tracking-[-0.02em] text-foreground">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {project.impact && project.impact.length > 0 && (
            <div
              data-reveal
              className="mt-8 rounded-3xl bg-[#111c17] p-6 text-[#edf0ea] sm:p-8"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#e07a52]">
                Impact
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {project.impact.map((item) => (
                  <div key={item.label}>
                    <dd className="font-display text-3xl font-semibold tracking-[-0.02em]">
                      {item.value}
                    </dd>
                    <dt className="mt-1 text-[11px] leading-snug text-[#edf0ea]/60">
                      {item.label}
                    </dt>
                    {item.note && (
                      <p className="mt-1 text-[10px] leading-snug text-[#edf0ea]/45">
                        {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {project.media && (
          <figure className="mt-10 sm:mt-14" data-reveal>
            <ProjectMedia
              media={project.media as ProjectMediaType}
              title={project.title}
              variant="cover"
              mode="image"
              priority
            />
            <figcaption className="mt-2.5 flex items-center justify-between text-[9.5px] font-medium uppercase tracking-[0.18em] text-ink-muted">
              <span>Project preview</span>
              <span>Main visual</span>
            </figcaption>
          </figure>
        )}

        <p
          data-reveal
          className="mt-10 max-w-[42rem] text-[15px] leading-relaxed text-ink-muted sm:mt-14 sm:text-base"
        >
          {project.description}
        </p>
      </div>
    </section>
  );
}
