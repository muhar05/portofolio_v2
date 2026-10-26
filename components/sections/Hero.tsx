"use client";

import aboutData from "@/content/about.json";
import siteData from "@/content/site.json";
import { trackEvent } from "@/lib/analytics";

function AvailabilityBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex max-w-full items-center gap-1.5 rounded border border-zinc-800/80 bg-zinc-950/60 px-2 py-1 font-mono text-[8.5px] uppercase leading-tight text-zinc-300 sm:gap-2 sm:px-2.5 sm:text-[10px]">
      <span
        className="hero-status-dot h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
        aria-hidden="true"
      />
      <span className="tracking-[0.02em] sm:tracking-[0.06em]">{text}</span>
    </span>
  );
}

export default function Hero() {
  const intro = aboutData.introduction;

  return (
    <section
      id="hero"
      aria-label="Portfolio Introduction"
      className="relative flex min-h-screen min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#08080a] p-4 text-zinc-100 sm:p-6 md:p-8 lg:p-12"
    >
      <div id="intro" className="sr-only" aria-hidden="true" />

      <div
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden="true"
      >
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

        <div className="absolute top-2.5 left-2.5 text-[9px] font-mono text-zinc-600 sm:top-3 sm:left-3 sm:text-[10px]">
          +
        </div>
        <div className="absolute top-2.5 right-2.5 text-[9px] font-mono text-zinc-600 sm:top-3 sm:right-3 sm:text-[10px]">
          +
        </div>
        <div className="absolute bottom-2.5 left-2.5 text-[9px] font-mono text-zinc-600 sm:bottom-3 sm:left-3 sm:text-[10px]">
          +
        </div>
        <div className="absolute bottom-2.5 right-2.5 text-[9px] font-mono text-zinc-600 sm:bottom-3 sm:right-3 sm:text-[10px]">
          +
        </div>
      </div>

      <div
        className="hero-art-layer hero-reveal-art"
        style={{ animationDelay: "220ms" }}
        aria-hidden="true"
      >
        <div className="hero-art">
          <div className="hero-art__slab-main" />
          <div className="hero-art__slab-secondary" />
          <div className="hero-art__void" />
          <div className="hero-art__edge" />
          <div className="hero-art__edge-secondary" />
        </div>
        <div className="hero-art__scrim" />
      </div>

      <header className="hero-system-bar relative z-20 flex items-center justify-between border-b border-zinc-800/40 pb-2 text-[9.5px] font-mono text-zinc-400 sm:pb-2.5 sm:text-[10.5px]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="font-medium uppercase tracking-[0.16em] text-zinc-300 sm:tracking-[0.2em]">
            MUHAR.01
          </span>
          <span className="hidden text-zinc-700 sm:inline-block">|</span>
          <span className="hidden tracking-wider text-zinc-500 sm:inline-block">
            FULL STACK DEVELOPER
          </span>
        </div>

        <nav
          aria-label="Hero navigation"
          className="hidden items-center gap-5 text-[10px] uppercase tracking-[0.2em] md:flex"
        >
          <a href="#stack" className="text-zinc-400 transition-colors hover:text-white">
            STACK
          </a>
          <a href="#selected-work" className="text-zinc-400 transition-colors hover:text-white">
            WORK
          </a>
          <a href="#thinking" className="text-zinc-400 transition-colors hover:text-white">
            ABOUT
          </a>
          <a href="#contact" className="text-zinc-400 transition-colors hover:text-white">
            CONTACT
          </a>
        </nav>

        <div className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.18em] sm:gap-2 sm:text-[10.5px] sm:tracking-[0.2em]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
          <span className="font-semibold text-[#f97316]">{intro.chapter}</span>
        </div>
      </header>

      <main className="relative z-20 my-auto flex flex-1 flex-col justify-center py-8 sm:py-10 md:py-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="hero-main-content max-w-4xl lg:max-w-none">
            <div
              className="hero-reveal-label flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-400"
              style={{ animationDelay: "60ms" }}
            >
              <span className="text-zinc-200">{intro.name}</span>
              <span
                className="hidden h-px w-8 bg-zinc-800 sm:block"
                aria-hidden="true"
              />
              <span className="hidden text-zinc-500 sm:inline">
                FULL STACK DEVELOPER
              </span>
            </div>

            <div
              className="hero-reveal-label mt-3 sm:mt-4"
              style={{ animationDelay: "100ms" }}
            >
              <AvailabilityBadge text={intro.availability} />
            </div>

            <h1
              aria-label={intro.headline}
              className="hero-reveal-headline mt-6 max-w-5xl font-sans text-[clamp(2.1rem,9.2vw,3.5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white sm:mt-8 md:text-[clamp(3.5rem,7vw,5rem)] lg:mt-10 lg:text-[clamp(3.75rem,6vw,6.5rem)]"
              style={{ animationDelay: "180ms" }}
            >
              <span className="block md:inline">From</span>{" "}
              <span>interface</span>{" "}
              <span className="hidden md:block" aria-hidden="true" />
              <span>to</span>{" "}
              <span className="block md:hidden" aria-hidden="true" />
              <span>
                infrastructure<span className="text-[#f97316]">.</span>
              </span>
            </h1>

            <p
              className="hero-reveal-copy mt-6 max-w-xl font-sans text-base leading-relaxed text-zinc-300 sm:text-lg"
              style={{ animationDelay: "300ms" }}
            >
              {intro.supporting}
            </p>

            <div
              className="hero-reveal-copy mt-4 flex items-center gap-2"
              style={{ animationDelay: "340ms" }}
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fb923c] sm:text-[11px]">
                {intro.concept}
              </span>
            </div>

            <div
              className="hero-reveal-cta mt-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ animationDelay: "400ms" }}
            >
              <a
                href="#selected-work"
                className="inline-flex min-h-11 items-center justify-center rounded bg-[#f97316] px-4 py-2 font-semibold text-zinc-950 transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:bg-[#fb923c]"
              >
                View Selected Work
                <span className="ml-1.5" aria-hidden="true">
                  ↓
                </span>
              </a>
              <a
                href="#thinking"
                className="inline-flex min-h-11 items-center justify-center rounded border border-zinc-700/80 px-4 py-2 font-medium text-zinc-300 transition-colors duration-200 hover:border-zinc-500 hover:text-white"
              >
                About My Approach
              </a>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={siteData.contact.cv}
                  download
                  onClick={() =>
                    trackEvent("resume_click", {
                      source: "hero",
                      action: "download",
                    })
                  }
                  aria-label="Download Muhar Ferdiansyah CV as PDF"
                  className="inline-flex min-h-11 items-center justify-center text-[10px] tracking-[0.18em] text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-zinc-300"
                >
                  Download CV
                </a>
                <a
                  href={`mailto:${siteData.email}`}
                  onClick={() =>
                    trackEvent("contact_click", {
                      channel: "email",
                      location: "hero",
                    })
                  }
                  className="inline-flex min-h-11 items-center justify-center text-[10px] tracking-[0.18em] text-zinc-400 underline decoration-zinc-700 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-zinc-300"
                >
                  Let&apos;s Talk
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="hero-system-bar relative z-20 flex items-center justify-between border-t border-zinc-800/40 pb-2 pt-2 text-[8.5px] font-mono text-zinc-400 sm:pb-2.5 sm:text-[9.5px] md:text-[10px]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-zinc-500">WORKSPACE:</span>
          <span className="text-zinc-300">ACTIVE</span>
        </div>

        <a
          href="#stack"
          className="hidden cursor-pointer text-[9px] uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-zinc-300 sm:inline-block"
        >
          [ SCROLL TO STACK &amp; WORK ↓ ]
        </a>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-zinc-500">CANVAS:</span>
          <span className="text-[#f97316]">MONOLITH / 01</span>
        </div>
      </footer>
    </section>
  );
}
