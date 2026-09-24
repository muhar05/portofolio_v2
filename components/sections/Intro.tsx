"use client";

import { memo } from "react";
import FlatIllustration from "./FlatIllustration";

interface IntroProps {
  className?: string;
}

function IntroComponent({ className = "" }: IntroProps) {
  return (
    <section
      id="intro"
      className={`relative flex h-full w-full min-h-screen flex-col justify-between overflow-hidden bg-[#08080a] text-zinc-100 p-4 sm:p-6 md:p-8 lg:p-12 select-none ${className}`}
    >
      {/* =========================================================================
          ATMOSPHERIC CANVAS: Coordinate Grid & Perimeter Crosshairs
      ========================================================================== */}
      <div className="intro-interface-frame pointer-events-none absolute inset-0 will-change-opacity">
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

        {/* Perimeter Corner Crosshairs */}
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

      {/* =========================================================================
          TOP SYSTEM BAR: Editorial Navigation & Coordinates
      ========================================================================== */}
      <header className="intro-interface-frame relative z-20 flex items-center justify-between border-b border-zinc-800/40 pb-2 sm:pb-2.5 will-change-opacity text-[9.5px] sm:text-[10.5px] font-mono text-zinc-400">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="tracking-[0.16em] sm:tracking-[0.2em] uppercase text-zinc-300 font-medium">
            SYS.ID // MUHAR.01
          </span>
          <span className="hidden sm:inline-block text-zinc-700">|</span>
          <span className="hidden sm:inline-block tracking-wider text-zinc-500">
            PORTFOLIO CANVAS
          </span>
        </div>

        {/* Top Chapter Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 tracking-[0.18em] sm:tracking-[0.2em] font-mono text-[9.5px] sm:text-[10.5px]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
          <span className="text-[#f97316] font-semibold">
            02 / INTRODUCTION
          </span>
        </div>
      </header>

      {/* =========================================================================
          MAIN STAGE: Editorial Composition (Desktop 2-Col & Mobile Stacked)
      ========================================================================== */}
      <main className="relative z-20 my-auto flex flex-1 flex-col justify-center py-2 sm:py-4 md:py-6">
        {/* -------------------------------------------------------------
            A. DESKTOP COMPOSITION (lg:grid): Asymmetrical 2-Column Spread
        -------------------------------------------------------------- */}
        <div className="hidden lg:grid w-full grid-cols-12 items-center gap-8 lg:gap-12">
          {/* Left Column: Typography */}
          <div className="flex flex-col justify-center col-span-7 will-change-transform will-change-opacity">
            {/* 1. Chapter Marker */}
            <div className="intro-chapter mb-3 flex items-center gap-2 will-change-transform will-change-opacity">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#f97316] font-semibold">
                02 / INTRODUCTION
              </span>
              <span className="h-px w-8 bg-zinc-800" />
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                DEVELOPER
              </span>
            </div>

            {/* 2. MUHAR Wordmark */}
            <h1 className="intro-wordmark font-sans text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none will-change-transform will-change-opacity">
              MUHAR FERDIANSYAH
            </h1>

            {/* 3. Introduction Statement */}
            <p className="intro-statement mt-3 font-sans text-2xl lg:text-3xl font-bold tracking-tight text-zinc-100 leading-[1.16] will-change-transform will-change-opacity">
              &quot;I build systems that make complex things easier to
              understand.&quot;
            </p>

            {/* 4. Supporting Concept Badge */}
            <div className="intro-concept mt-3 flex items-center gap-2 will-change-transform will-change-opacity">
              <span className="rounded border border-[#f97316]/40 bg-[#f97316]/10 px-2.5 py-0.5 font-mono text-xs font-semibold tracking-wider text-[#fb923c]">
                Software &times; Business &times; People
              </span>
            </div>

            {/* 5. Supporting Context */}
            <div className="intro-subheadline mt-3 will-change-transform will-change-opacity">
              <p className="max-w-xl font-sans text-base leading-relaxed text-zinc-300">
                A developer interested in the space between software, business
                workflows, and the people using them.
              </p>
            </div>
          </div>

          {/* Right Column: Flat Illustration */}
          <div className="intro-illustration flex items-center justify-center col-span-5 will-change-transform will-change-opacity">
            <div className="relative w-full max-w-[460px]">
              <div className="relative rounded-lg border border-zinc-800/60 bg-zinc-950/60 p-3 backdrop-blur-xs">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 border-t border-dashed border-zinc-700/60" />
                <FlatIllustration />
                <div className="mt-1 flex items-center justify-between px-1 text-[9px] font-mono text-zinc-500 border-t border-zinc-900/60 pt-1">
                  <span>FIG.01 // SYSTEM CONTEXT</span>
                  <span className="text-zinc-600">
                    SOFTWARE &times; BUSINESS &times; PEOPLE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            B. MOBILE COMPOSITION (lg:hidden): Intentionally Stacked & Centered
        -------------------------------------------------------------- */}
        <div className="flex lg:hidden flex-col items-center text-center w-full max-w-md mx-auto">
          {/* 1. Chapter Marker */}
          <div className="intro-chapter mb-1.5 flex items-center justify-center gap-2 will-change-transform will-change-opacity">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#f97316] font-semibold">
              02 / INTRODUCTION
            </span>
          </div>

          {/* 2. MUHAR Wordmark */}
          <h1 className="intro-wordmark font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight will-change-transform will-change-opacity">
            MUHAR
          </h1>

          {/* 3. Introduction Statement */}
          <p className="intro-statement mt-2 font-sans text-base sm:text-xl font-bold tracking-tight text-zinc-100 leading-snug px-2 will-change-transform will-change-opacity">
            &quot;I build systems that make complex things easier to
            understand.&quot;
          </p>

          {/* 4. Supporting Concept Badge */}
          <div className="intro-concept mt-2 will-change-transform will-change-opacity">
            <span className="inline-block rounded border border-[#f97316]/50 bg-[#f97316]/10 px-3 py-0.5 font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#fb923c]">
              Software &times; Business &times; People
            </span>
          </div>

          {/* 5. Supporting Context */}
          <div className="intro-subheadline mt-2 will-change-transform will-change-opacity">
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-zinc-300 px-3 max-w-sm">
              A developer interested in the space between software, business
              workflows, and the people using them.
            </p>
          </div>

          {/* 6. Flat Illustration */}
          <div className="intro-illustration mt-3 sm:mt-4 w-full max-w-[280px] sm:max-w-[340px] will-change-transform will-change-opacity">
            <div className="rounded-lg border border-zinc-800/60 bg-zinc-950/70 p-2 shadow-lg shadow-black/40">
              <div className="max-h-[140px] sm:max-h-[180px] overflow-hidden flex items-center justify-center">
                <FlatIllustration />
              </div>
              <div className="mt-1 flex items-center justify-between px-1 text-[8px] font-mono text-zinc-500 border-t border-zinc-900/60 pt-0.5">
                <span>FIG.01 // CONTEXT</span>
                <span className="text-zinc-600">
                  SOFTWARE &times; BUSINESS &times; PEOPLE
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================================
          BOTTOM SYSTEM BAR: Status Telemetry
      ========================================================================== */}
      <footer className="intro-interface-frame relative z-20 flex items-center justify-between border-t border-zinc-800/40 pb-2 sm:pb-2.5 pt-2 will-change-opacity text-[8.5px] sm:text-[9.5px] md:text-[10px] font-mono text-zinc-400">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-zinc-500">WORKSPACE:</span>
          <span className="text-zinc-300">ACTIVE</span>
        </div>

        <div className="hidden sm:block text-zinc-500 text-[9px] tracking-[0.18em] uppercase">
          [ SCROLL TO TRACE ARCHITECTURE ]
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-zinc-500">CANVAS:</span>
          <span className="text-[#f97316]">PORTFOLIO INTRO</span>
        </div>
      </footer>
    </section>
  );
}

export const Intro = memo(IntroComponent);
export default Intro;
