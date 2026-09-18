"use client";

import { useEffect, useState } from "react";
import FlatIllustration from "./FlatIllustration";

interface DigitalWorldProps {
  className?: string;
}

const SYSTEM_TOKENS = [
  { id: "systems", label: "SYS_01: ARCHITECTURE" },
  { id: "chaos", label: "SYS_02: RANDOM_CHAOS" },
  { id: "experiments", label: "SYS_03: EXPERIMENTS" },
  { id: "anomaly", label: "SYS_04: GENERATIVE" },
] as const;

export default function DigitalWorld({ className = "" }: DigitalWorldProps) {
  const [activeToken, setActiveToken] = useState<string | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[DigitalWorld] Component mounted successfully in DOM inside Scene 2");
    }
  }, []);

  return (
    <div
      className={`absolute inset-0 z-10 flex flex-col justify-between overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10 text-zinc-100 ${className}`}
    >
      {/* =========================================================================
          ATMOSPHERIC CANVAS: Subtle Architectural Grid & Corner Crosshairs
      ========================================================================== */}
      <div className="dw-interface-frame pointer-events-none absolute inset-0 will-change-opacity">
        {/* Subtle Background Coordinate Grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Perimeter Corner Crosshairs */}
        <div className="absolute top-3 left-3 text-[10px] font-mono text-zinc-600 select-none">
          +
        </div>
        <div className="absolute top-3 right-3 text-[10px] font-mono text-zinc-600 select-none">
          +
        </div>
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-zinc-600 select-none">
          +
        </div>
        <div className="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-600 select-none">
          +
        </div>
      </div>

      {/* =========================================================================
          TOP SYSTEM BAR: Editorial Metadata & Interface Registration
      ========================================================================== */}
      <header className="dw-interface-frame relative z-20 flex items-center justify-between border-b border-zinc-800/40 pb-2 sm:pb-3 will-change-opacity text-[10px] sm:text-[11px] font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="tracking-[0.2em] uppercase text-zinc-400">
            SYS.ID // MUHAR.01
          </span>
          <span className="hidden md:inline-block text-zinc-700">|</span>
          <span className="hidden md:inline-block tracking-wider text-zinc-500">
            RUNTIME: ACTIVE
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-zinc-500 tracking-[0.18em]">
          <span>INDEX:</span>
          <span className="text-zinc-300">DIGITAL_CANVAS</span>
        </div>

        <div className="flex items-center gap-2 tracking-[0.2em] text-zinc-400">
          <span>PHASE 02</span>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-500">[ONLINE]</span>
        </div>
      </header>

      {/* =========================================================================
          MAIN STAGE: Asymmetrical Editorial Grid (Typography + Flat Illustration)
      ========================================================================== */}
      <main className="relative z-20 my-auto flex flex-1 flex-col justify-center py-3 sm:py-6">
        <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* -------------------------------------------------------------
              LEFT COLUMN: Typography & Intentional Manifesto (Columns 1-6)
          -------------------------------------------------------------- */}
          <div className="flex flex-col justify-center md:col-span-6 lg:col-span-7">
            {/* Editorial Category Tag */}
            <div className="dw-content-item mb-2 sm:mb-3 flex items-center gap-2 will-change-transform will-change-opacity">
              <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-zinc-500">
                [ 01 // IDENTITY ]
              </span>
              <span className="h-px w-8 bg-zinc-800/80" />
            </div>

            {/* Primary Architectural Wordmark */}
            <h1 className="dw-content-item font-sans text-3xl font-bold tracking-[-0.04em] text-[#fafafa] sm:text-4xl md:text-5xl lg:text-6xl will-change-transform will-change-opacity">
              MUHAR
            </h1>

            {/* Primary Statement */}
            <p className="dw-content-item mt-2 sm:mt-3 font-sans text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-tight text-zinc-200 will-change-transform will-change-opacity">
              Creating systems and random chaos.
            </p>

            {/* Editorial Context & Philosophy */}
            <p className="dw-content-item mt-3 sm:mt-4 max-w-md font-mono text-[11px] sm:text-xs leading-relaxed text-zinc-400 will-change-transform will-change-opacity">
              A developer workspace bridging structured architecture, algorithmic
              logic, and intentional anomalies.
            </p>

            {/* Interactive System Tokens */}
            <div className="dw-content-item pointer-events-auto mt-5 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2 will-change-transform will-change-opacity">
              {SYSTEM_TOKENS.map((token) => {
                const isActive = activeToken === token.id;
                return (
                  <button
                    key={token.id}
                    type="button"
                    onClick={() =>
                      setActiveToken(isActive ? null : token.id)
                    }
                    onMouseEnter={() => setActiveToken(token.id)}
                    onMouseLeave={() => setActiveToken(null)}
                    className={`group relative inline-flex items-center gap-1.5 rounded-sm border px-2 sm:px-2.5 py-1 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer select-none ${
                      isActive
                        ? "border-[#f97316] bg-[#f97316]/10 text-[#fb923c] shadow-[0_0_12px_rgba(249,115,22,0.25)]"
                        : "border-zinc-800/80 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    <span
                      className={`h-1 w-1 rounded-full transition-colors duration-200 ${
                        isActive ? "bg-[#f97316]" : "bg-zinc-600 group-hover:bg-zinc-400"
                      }`}
                    />
                    <span>{token.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------------
              RIGHT COLUMN: Bespoke Flat Illustration (Columns 7-12)
          -------------------------------------------------------------- */}
          <div className="flex items-center justify-center md:col-span-6 lg:col-span-5">
            <div className="dw-illustration relative w-full max-w-[420px] lg:max-w-[460px] will-change-transform will-change-opacity">
              {/* Editorial Frame Border with Subtle Registration Marks */}
              <div className="relative rounded-lg border border-zinc-800/40 bg-zinc-950/40 p-2 sm:p-3 backdrop-blur-[1px]">
                {/* Visual Connector from Typography to Illustration */}
                <div className="hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2 w-6 border-t border-dashed border-zinc-700/60" />

                {/* Flat Illustration Component */}
                <FlatIllustration activeToken={activeToken} />

                {/* Micro Meta Stamp on Illustration Frame */}
                <div className="mt-1 flex items-center justify-between px-1 text-[9px] font-mono text-zinc-600">
                  <span>FIG.02 // DUALITY</span>
                  <span className="text-zinc-500">SYSTEM ✕ CHAOS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================================
          BOTTOM SYSTEM BAR: Status & Interaction Hints
      ========================================================================== */}
      <footer className="dw-interface-frame relative z-20 flex items-center justify-between border-t border-zinc-800/40 pt-2 sm:pt-3 will-change-opacity text-[10px] sm:text-[11px] font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="text-zinc-600">WORKSPACE:</span>
          <span className="text-zinc-300">ESTABLISHED</span>
        </div>

        <div className="hidden sm:block text-zinc-600 text-[10px] tracking-[0.2em] uppercase">
          [ SCROLL TO EXPLORE ARCHIVE ]
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-600">STATE:</span>
          <span className="text-[#fb923c]">INTERACTIVE</span>
        </div>
      </footer>
    </div>
  );
}
