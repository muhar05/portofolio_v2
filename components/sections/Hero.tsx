"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import aboutData from "@/content/about.json";
import siteData from "@/content/site.json";
import HeroScene from "./HeroScene";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function AvailabilityBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded border border-zinc-800/80 bg-zinc-950/60 px-2 py-1 font-mono text-[8.5px] leading-tight text-zinc-300 sm:gap-2 sm:px-2.5 sm:text-[10px]">
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
        aria-hidden="true"
      />
      <span className="tracking-[0.02em] sm:tracking-[0.06em]">{text}</span>
    </span>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const intro = aboutData.introduction;

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".hero-system-bar", {
        opacity: 0,
        y: -6,
        duration: 0.45,
      })
        .from(
          ".hero-main-content",
          {
            opacity: 0,
            y: 14,
            duration: 0.55,
          },
          "-=0.2",
        )
        .from(
          ".hero-illustration",
          {
            opacity: 0,
            scale: 0.96,
            y: 12,
            duration: 0.55,
          },
          "-=0.3",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Portfolio Introduction"
      className="relative flex min-h-screen min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#08080a] text-zinc-100 p-4 sm:p-6 md:p-8 lg:p-12 select-none"
    >
      <div id="intro" className="sr-only" aria-hidden="true" />

      {/* Background coordinate grid and corner crosshairs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.06] sm:opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
          }}
        />

        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 text-[9px] sm:text-[10px] font-mono text-zinc-600 select-none">
          +
        </div>
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 text-[9px] sm:text-[10px] font-mono text-zinc-600 select-none">
          +
        </div>
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 text-[9px] sm:text-[10px] font-mono text-zinc-600 select-none">
          +
        </div>
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 text-[9px] sm:text-[10px] font-mono text-zinc-600 select-none">
          +
        </div>
      </div>

      {/* Top system bar with system telemetry and navigation */}
      <header className="hero-system-bar relative z-20 flex items-center justify-between border-b border-zinc-800/40 pb-2 sm:pb-2.5 text-[9.5px] sm:text-[10.5px] font-mono text-zinc-400">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="tracking-[0.16em] sm:tracking-[0.2em] uppercase text-zinc-300 font-medium">
            MUHAR.01
          </span>
          <span className="hidden sm:inline-block text-zinc-700">|</span>
          <span className="hidden sm:inline-block tracking-wider text-zinc-500">
            FULL STACK ENGINEER
          </span>
        </div>

        <nav
          aria-label="Hero navigation"
          className="hidden md:flex items-center gap-5 text-[10px] tracking-[0.2em] uppercase"
        >
          <a href="#stack" className="text-zinc-400 hover:text-white transition-colors">
            STACK
          </a>
          <a href="#selected-work" className="text-zinc-400 hover:text-white transition-colors">
            WORK
          </a>
          <a href="#thinking" className="text-zinc-400 hover:text-white transition-colors">
            ABOUT
          </a>
          <a href="#contact" className="text-zinc-400 hover:text-white transition-colors">
            CONTACT
          </a>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 tracking-[0.18em] sm:tracking-[0.2em] font-mono text-[9.5px] sm:text-[10.5px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
          <span className="text-[#f97316] font-semibold">{intro.chapter}</span>
        </div>
      </header>

      {/* Main stage: asymmetric 2-column desktop and stacked mobile composition */}
      <main className="relative z-20 my-auto flex flex-1 flex-col justify-center py-4 sm:py-6 md:py-8">
        {/* Desktop composition (lg:grid) */}
        <div className="hidden lg:grid w-full grid-cols-12 items-center gap-8 lg:gap-12">
          <div className="hero-main-content flex flex-col justify-center col-span-7">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#f97316] font-semibold">
                {intro.chapter}
              </span>
              <span className="h-px w-8 bg-zinc-800" />
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                SYSTEMS &amp; ARCHITECTURE
              </span>
            </div>

            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none">
              {intro.name}
            </h1>

            <p className="mt-3 font-sans text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100 leading-[1.16]">
              &ldquo;{intro.headline}&rdquo;
            </p>

            <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-zinc-200 lg:text-[15px]">
              {intro.supporting}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#fb923c] uppercase">
                {intro.concept}
              </span>
              <span className="h-px w-6 bg-zinc-800" aria-hidden="true" />
              <AvailabilityBadge text={intro.availability} />
            </div>

            <div className="mt-4 max-w-xl space-y-3">
              <p className="font-sans text-sm lg:text-[15px] leading-relaxed text-zinc-300">
                {intro.description}
              </p>
              <p className="font-mono text-xs sm:text-[13px] tracking-wide text-zinc-400 border-l border-zinc-800 pl-3">
                {intro.closing}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider">
              <a
                href={`mailto:${siteData.email}`}
                className="inline-flex min-h-11 items-center justify-center rounded bg-[#f97316] px-4 py-2 text-[11px] font-semibold text-zinc-950 transition-colors hover:bg-[#fb923c]"
              >
                LET&apos;S TALK
              </a>
              <a
                href="#selected-work"
                className="inline-flex min-h-11 items-center justify-center rounded border border-zinc-700/80 px-4 py-2 text-[11px] font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
              >
                VIEW SELECTED WORK ↓
              </a>
            </div>
          </div>

          <div className="hero-illustration flex items-center justify-center col-span-5">
            <div className="relative w-full max-w-[460px]">
              <div className="relative rounded-lg border border-zinc-800/60 bg-zinc-950/60 p-3">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 border-t border-dashed border-zinc-700/60" />
                <div className="h-[300px] w-full sm:h-[340px] lg:h-[380px]">
                  <HeroScene />
                </div>
                <div className="mt-1 flex items-center justify-between px-1 text-[9px] font-mono text-zinc-500 border-t border-zinc-900/60 pt-1">
                  <span>FIG.01 // SYSTEM CONTEXT</span>
                  <span className="text-zinc-600">{intro.concept}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile composition (lg:hidden) */}
        <div className="flex lg:hidden flex-col items-center text-center w-full max-w-md mx-auto">
          <div className="hero-main-content w-full flex flex-col items-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#f97316] font-semibold">
                {intro.chapter}
              </span>
            </div>

            <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              {intro.name}
            </h1>

            <p className="mt-2 font-sans text-base sm:text-xl font-bold tracking-tight text-zinc-100 leading-snug px-2">
              &ldquo;{intro.headline}&rdquo;
            </p>

            <p className="mt-2.5 max-w-sm px-2 font-sans text-sm leading-relaxed text-zinc-200 sm:text-[15px]">
              {intro.supporting}
            </p>

            <div className="mt-2.5 flex flex-col items-center gap-2">
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#fb923c] uppercase">
                {intro.concept}
              </span>
              <AvailabilityBadge text={intro.availability} />
            </div>

            <div className="mt-3 px-2 max-w-sm space-y-2">
              <p className="font-sans text-xs sm:text-sm leading-relaxed text-zinc-300">
                {intro.description}
              </p>
              <p className="font-mono text-[10px] sm:text-[11px] tracking-wide text-zinc-400">
                {intro.closing}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 font-mono text-[10px] uppercase tracking-wider">
              <a
                href={`mailto:${siteData.email}`}
                className="inline-flex min-h-11 items-center justify-center rounded bg-[#f97316] px-3.5 py-2 font-semibold text-zinc-950"
              >
                LET&apos;S TALK
              </a>
              <a
                href="#selected-work"
                className="inline-flex min-h-11 items-center justify-center rounded border border-zinc-700/80 px-3.5 py-2 text-zinc-300"
              >
                VIEW SELECTED WORK ↓
              </a>
            </div>
          </div>

          <div className="hero-illustration mt-4 sm:mt-5 w-full max-w-[340px] sm:max-w-[400px]">
            <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/70 p-2 shadow-lg shadow-black/40">
              <div className="h-[240px] w-full sm:h-[280px]">
                <HeroScene />
              </div>
              <div className="mt-1 flex items-center justify-between px-1 text-[8px] font-mono text-zinc-500 border-t border-zinc-900/60 pt-0.5">
                <span>FIG.01 // CONTEXT</span>
                <span className="text-zinc-600">{intro.concept}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom system bar with status telemetry */}
      <footer className="hero-system-bar relative z-20 flex items-center justify-between border-t border-zinc-800/40 pb-2 sm:pb-2.5 pt-2 text-[8.5px] sm:text-[9.5px] md:text-[10px] font-mono text-zinc-400">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-zinc-500">WORKSPACE:</span>
          <span className="text-zinc-300">ACTIVE</span>
        </div>

        <a
          href="#stack"
          className="hidden sm:inline-block text-zinc-500 hover:text-zinc-300 transition-colors text-[9px] tracking-[0.18em] uppercase cursor-pointer"
        >
          [ SCROLL TO STACK &amp; WORK ↓ ]
        </a>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-zinc-500">CANVAS:</span>
          <span className="text-[#f97316]">PORTFOLIO INTRO</span>
        </div>
      </footer>
    </section>
  );
}
