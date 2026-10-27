"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import aboutData from "@/content/about.json";
import siteData from "@/content/site.json";
import worksData from "@/content/works.json";
import { trackEvent } from "@/lib/analytics";
import RollText from "@/components/ui/RollText";

const NAV_LINKS = [
  { href: "#selected-work", label: "Work" },
  { href: "#stack", label: "Stack" },
  { href: "#thinking", label: "About" },
  { href: "#contact", label: "Contact" },
];

const HEADLINE_LINES = ["From interface", "to infrastructure"];

export default function Hero() {
  const intro = aboutData.introduction;
  const navRef = useRef<HTMLElement>(null);
  const [navIndicator, setNavIndicator] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const projectCovers = worksData.projects.flatMap((project) => {
    const cover = project.media?.images?.cover;
    if (!cover) return [];
    return [
      {
        id: project.id,
        title: project.title,
        category: project.category,
        cover,
      },
    ];
  });

  const moveIndicator = (target: HTMLAnchorElement) => {
    const parent = navRef.current;
    if (!parent) return;
    const targetRect = target.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    setNavIndicator({
      left: targetRect.left - parentRect.left,
      width: targetRect.width,
      opacity: 1,
    });
  };

  const handleEnter = (event: React.MouseEvent<HTMLAnchorElement>) =>
    moveIndicator(event.currentTarget);

  const handleFocus = (event: React.FocusEvent<HTMLAnchorElement>) =>
    moveIndicator(event.currentTarget);

  const hideIndicator = () =>
    setNavIndicator((prev) => ({ ...prev, opacity: 0 }));

  const handleBlur = (event: React.FocusEvent<HTMLAnchorElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && navRef.current?.contains(next)) return;
    hideIndicator();
  };

  return (
    <section
      id="hero"
      aria-label="Portfolio introduction"
      className="relative w-full overflow-hidden px-[var(--page-pad)] pt-28 pb-16 sm:pt-32 lg:pt-36"
    >
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/90 to-transparent px-[var(--page-pad)] py-4 md:py-5">
        <Link
          href="#hero"
          className="font-display text-lg font-semibold tracking-[-0.03em] text-foreground"
          aria-label="Muhar Ferdiansyah, back to top"
        >
          muhar<span className="text-[var(--accent)]">.</span>
        </Link>

        <nav
          ref={navRef}
          aria-label="Primary"
          onMouseLeave={hideIndicator}
          className="nav-pill hidden lg:inline-flex"
        >
          <span
            aria-hidden="true"
            className="nav-pill__indicator"
            style={{
              transform: `translate3d(${navIndicator.left}px, -50%, 0)`,
              width: `${navIndicator.width}px`,
              opacity: navIndicator.opacity,
            }}
          />
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={handleEnter}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="nav-pill__link text-[13px] font-medium"
            >
              <RollText text={link.label} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={siteData.contact.github.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("github_click", { location: "navbar" })}
            className="hidden text-[13px] font-medium text-ink-muted transition-colors hover:text-foreground sm:inline"
          >
            GitHub
          </a>
          <a
            href={`mailto:${siteData.email}`}
            onClick={() =>
              trackEvent("contact_click", {
                channel: "email",
                location: "navbar",
              })
            }
            className="btn-pill btn-ink btn-sheen px-4 text-[13px]"
          >
            <RollText text="Let's talk" gap="0.04em" />
          </a>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[54rem] flex-col items-center pt-10 text-center sm:pt-14 lg:pt-16">
        <div
          className="hero-fade inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.02em] text-ink-muted"
          style={{ animationDelay: "80ms" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-600"
            aria-hidden="true"
          />
          {intro.availability}
        </div>

        <h1 className="mt-6 font-display text-[clamp(2.5rem,5.4vw,4.25rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-foreground">
          {HEADLINE_LINES.map((line, index) => (
            <span className="mask-line" key={line}>
              <span
                className="mask-line__inner"
                style={{ animationDelay: `${140 + index * 110}ms` }}
              >
                {line}
                {index === HEADLINE_LINES.length - 1 && (
                  <span className="text-[var(--accent)]">.</span>
                )}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="hero-fade mt-6 max-w-[34rem] text-[15px] leading-relaxed text-ink-muted sm:text-base"
          style={{ animationDelay: "480ms" }}
        >
          {intro.supporting}
        </p>

        <div
          className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-2.5"
          style={{ animationDelay: "580ms" }}
        >
          <a
            href={`mailto:${siteData.email}`}
            onClick={() =>
              trackEvent("contact_click", {
                channel: "email",
                location: "hero",
              })
            }
            className="btn-pill btn-ink btn-sheen"
          >
            <RollText text="Let's talk" gap="0.04em" />
          </a>
          <a href="#selected-work" className="btn-pill btn-soft">
            View selected work
            <span aria-hidden="true" className="text-[0.85em]">
              ↓
            </span>
          </a>
        </div>

        <p
          className="hero-fade mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-ink-muted"
          style={{ animationDelay: "660ms" }}
        >
          {intro.concept}
        </p>
      </div>

      <div
        className="ticker mt-12 sm:mt-16 lg:mt-20"
        aria-label="Selected project previews"
      >
        <div className="ticker__track">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              className="flex"
              aria-hidden={setIndex === 1 ? "true" : undefined}
            >
              {projectCovers.map((project) => (
                <Link
                  key={`${setIndex}-${project.id}`}
                  href={`/works/${project.id}`}
                  tabIndex={setIndex === 1 ? -1 : undefined}
                  aria-label={
                    setIndex === 0
                      ? `View ${project.title} case study`
                      : undefined
                  }
                  className="ticker__card group aspect-[4/3]"
                >
                  <Image
                    src={project.cover}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 60vw, 22rem"
                    className="object-cover"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-3 text-left">
                    <span className="text-[11px] font-medium text-white">
                      {project.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/85"
                    >
                      {project.category}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
