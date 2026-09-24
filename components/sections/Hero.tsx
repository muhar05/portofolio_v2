"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "@/components/sections/Intro";
import BoardStatusLed from "./hero/BoardStatusLed";
import MonitorLight from "./hero/MonitorLight";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Hero() {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const blackCoverRef = useRef<HTMLDivElement>(null);
  const solidBlackOverlayRef = useRef<HTMLDivElement>(null);
  const boardLedRef = useRef<SVGSVGElement>(null);
  const monitorLightRef = useRef<SVGSVGElement>(null);
  const scene1LabelRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isScrolled =
      typeof window !== "undefined" && window.scrollY > 20;

    // Initial load cinematic reveal (fades black veil to reveal opening visual)
    if (blackCoverRef.current) {
      if (prefersReducedMotion || isScrolled) {
        gsap.set(blackCoverRef.current, { opacity: 0, display: "none" });
      } else {
        gsap.to(blackCoverRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            if (blackCoverRef.current) {
              blackCoverRef.current.style.display = "none";
            }
          },
        });
      }
    }

    // Reduced motion: bypass camera zoom and display the readable Intro canvas immediately
    if (prefersReducedMotion) {
      if (scene1Ref.current) gsap.set(scene1Ref.current, { opacity: 0, display: "none" });
      if (scene1LabelRef.current) gsap.set(scene1LabelRef.current, { opacity: 0, display: "none" });
      if (solidBlackOverlayRef.current) gsap.set(solidBlackOverlayRef.current, { opacity: 0, display: "none" });
      if (scene2Ref.current) {
        gsap.set(scene2Ref.current, { opacity: 1, visibility: "visible", pointerEvents: "auto" });
        const allIntro = scene2Ref.current.querySelectorAll(
          ".intro-interface-frame, .intro-chapter, .intro-wordmark, .intro-statement, .intro-concept, .intro-subheadline, .intro-illustration, .intro-conduit-emitter"
        );
        gsap.set(allIntro, { opacity: 1, y: 0, scale: 1 });
      }
      return;
    }

    // Initialize MatchMedia without invalid scope object
    const mm = gsap.matchMedia();

    // =========================================================================
    // RESPONSIVE MASTER TIMELINES (Desktop & Mobile)
    // Structured across the exact 4 required scroll phases:
    // PHASE 1: ZOOM (0.00 -> 0.65): Workspace zooms aggressively into MacBook screen
    // PHASE 2: BLACK ENTERS (0.58 -> 0.70): Solid black fades 0 -> 1; Scene 1 hidden
    // PHASE 3: BLACK HOLD (0.70 -> 0.82): Full solid black stillness (noticeable hold)
    // PHASE 4: INTRODUCTION REVEAL (0.82 -> 1.00): Progressive staggered text reveal
    // =========================================================================

    // 1. DESKTOP TIMELINE (min-width: 1024px)
    mm.add("(min-width: 1024px)", () => {
      const pinEl = pinWrapperRef.current;
      const s1El = scene1Ref.current;
      const s2El = scene2Ref.current;
      const blackEl = solidBlackOverlayRef.current;

      if (!pinEl || !s1El || !s2El || !blackEl) {
        return;
      }

      // Query actual DOM elements directly from Scene 02 to prevent any selector scoping failures
      const frameEls = Array.from(s2El.querySelectorAll(".intro-interface-frame"));
      const chapterEls = Array.from(s2El.querySelectorAll(".intro-chapter"));
      const wordmarkEls = Array.from(s2El.querySelectorAll(".intro-wordmark"));
      const statementEls = Array.from(s2El.querySelectorAll(".intro-statement"));
      const conceptEls = Array.from(s2El.querySelectorAll(".intro-concept"));
      const subheadlineEls = Array.from(s2El.querySelectorAll(".intro-subheadline"));
      const illustrationEls = Array.from(s2El.querySelectorAll(".intro-illustration"));

      // Pre-initialize intro elements to opacity 0 so fromTo from-states are guaranteed
      const introEls = [
        ...frameEls,
        ...chapterEls,
        ...wordmarkEls,
        ...statementEls,
        ...conceptEls,
        ...subheadlineEls,
        ...illustrationEls,
      ];
      if (introEls.length > 0) gsap.set(introEls, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "+=320%",
          pin: true,
          pinSpacing: "margin",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Vignette & Film grain dissolve early during camera approach
      if (vignetteRef.current) {
        tl.to(vignetteRef.current, { opacity: 0, ease: "power1.inOut", duration: 0.25 }, 0);
      }
      if (grainRef.current) {
        tl.to(grainRef.current, { opacity: 0, ease: "power1.inOut", duration: 0.25 }, 0);
      }
      if (boardLedRef.current) {
        tl.to(boardLedRef.current, { opacity: 0, ease: "power1.out", duration: 0.20 }, 0);
      }
      if (monitorLightRef.current) {
        tl.to(monitorLightRef.current, { opacity: 0, ease: "power1.out", duration: 0.20 }, 0);
      }
      if (scene1LabelRef.current) {
        tl.to(
          scene1LabelRef.current,
          { opacity: 0, y: -8, ease: "power1.out", duration: 0.18 },
          0
        );
      }

      // PHASE 1: ZOOM (0.00 -> 0.65)
      tl.to(
        s1El,
        {
          scale: 6.4,
          transformOrigin: "50% 35%",
          ease: "none",
          duration: 0.65,
        },
        0
      );

      // PHASE 2: BLACK ENTERS (0.58 -> 0.70)
      tl.to(
        blackEl,
        {
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.12,
        },
        0.58
      );

      // Prepare Scene 02 behind the black veil during the hold
      tl.set(
        s2El,
        {
          visibility: "visible",
          opacity: 1,
          pointerEvents: "auto",
        },
        0.76
      );

      // PHASE 3: BLACK HOLD (0.70 -> 0.82)
      // Dedicated scroll pause in 100% solid black stillness
      tl.to({}, { duration: 0.12 }, 0.70);

      // PHASE 4: INTRODUCTION REVEAL (0.82 -> 1.00)
      // Solid black veil lifts away
      tl.to(
        blackEl,
        {
          opacity: 0,
          ease: "power2.out",
          duration: 0.04,
        },
        0.82
      );

      // Interface perimeter frame
      tl.fromTo(
        frameEls,
        { opacity: 0 },
        { opacity: 1, ease: "power1.out", duration: 0.05 },
        0.83
      );

      // 1. 02 / INTRODUCTION
      tl.fromTo(
        chapterEls,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.05 },
        0.84
      );

      // 2. MUHAR
      tl.fromTo(
        wordmarkEls,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.05 },
        0.87
      );

      // 3. Introduction Statement
      tl.fromTo(
        statementEls,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.05 },
        0.90
      );

      // 4. Software x Business x People
      tl.fromTo(
        conceptEls,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, ease: "back.out(1.4)", duration: 0.04 },
        0.92
      );

      // 5. Subheadline
      tl.fromTo(
        subheadlineEls,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.04 },
        0.93
      );

      // 6. Flat Illustration
      tl.fromTo(
        illustrationEls,
        { opacity: 0, y: 18, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.05 },
        0.94
      );
    });

    // 2. MOBILE & TABLET TIMELINE (max-width: 1023px)
    mm.add("(max-width: 1023px)", () => {
      const pinEl = pinWrapperRef.current;
      const s1El = scene1Ref.current;
      const s2El = scene2Ref.current;
      const blackEl = solidBlackOverlayRef.current;

      if (!pinEl || !s1El || !s2El || !blackEl) {
        return;
      }

      // Query actual DOM elements directly from Scene 02 to prevent any selector scoping failures
      const frameEls = Array.from(s2El.querySelectorAll(".intro-interface-frame"));
      const chapterEls = Array.from(s2El.querySelectorAll(".intro-chapter"));
      const wordmarkEls = Array.from(s2El.querySelectorAll(".intro-wordmark"));
      const statementEls = Array.from(s2El.querySelectorAll(".intro-statement"));
      const conceptEls = Array.from(s2El.querySelectorAll(".intro-concept"));
      const subheadlineEls = Array.from(s2El.querySelectorAll(".intro-subheadline"));
      const illustrationEls = Array.from(s2El.querySelectorAll(".intro-illustration"));

      // Pre-initialize intro elements to opacity 0 so fromTo from-states are guaranteed
      const introEls = [
        ...frameEls,
        ...chapterEls,
        ...wordmarkEls,
        ...statementEls,
        ...conceptEls,
        ...subheadlineEls,
        ...illustrationEls,
      ];
      if (introEls.length > 0) gsap.set(introEls, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "+=280%",
          pin: true,
          pinSpacing: "margin",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Vignette & Film grain dissolve
      if (vignetteRef.current) {
        tl.to(vignetteRef.current, { opacity: 0, ease: "power1.inOut", duration: 0.22 }, 0);
      }
      if (grainRef.current) {
        tl.to(grainRef.current, { opacity: 0, ease: "power1.inOut", duration: 0.22 }, 0);
      }
      if (boardLedRef.current) {
        tl.to(boardLedRef.current, { opacity: 0, ease: "power1.out", duration: 0.18 }, 0);
      }
      if (monitorLightRef.current) {
        tl.to(monitorLightRef.current, { opacity: 0, ease: "power1.out", duration: 0.18 }, 0);
      }
      if (scene1LabelRef.current) {
        tl.to(
          scene1LabelRef.current,
          { opacity: 0, y: -8, ease: "power1.out", duration: 0.16 },
          0
        );
      }

      // PHASE 1: ZOOM into workspace on mobile (0.00 -> 0.65)
      tl.to(
        s1El,
        {
          scale: 6.4,
          transformOrigin: "50% 50%",
          ease: "none",
          duration: 0.65,
        },
        0
      );

      // PHASE 2: BLACK ENTERS (0.58 -> 0.70)
      tl.to(
        blackEl,
        {
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.12,
        },
        0.58
      );

      // Prepare Scene 02 behind veil
      tl.set(
        s2El,
        {
          visibility: "visible",
          opacity: 1,
          pointerEvents: "auto",
        },
        0.76
      );

      // PHASE 3: BLACK HOLD (0.70 -> 0.82)
      tl.to({}, { duration: 0.12 }, 0.70);

      // PHASE 4: INTRODUCTION REVEAL ON MOBILE (0.82 -> 1.00)
      tl.to(
        blackEl,
        {
          opacity: 0,
          ease: "power2.out",
          duration: 0.04,
        },
        0.82
      );

      tl.fromTo(
        frameEls,
        { opacity: 0 },
        { opacity: 1, ease: "power1.out", duration: 0.04 },
        0.83
      );

      // 1. 02 / INTRODUCTION
      tl.fromTo(
        chapterEls,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.05 },
        0.84
      );

      // 2. MUHAR
      tl.fromTo(
        wordmarkEls,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.05 },
        0.87
      );

      // 3. Statement
      tl.fromTo(
        statementEls,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.05 },
        0.90
      );

      // 4. Concept
      tl.fromTo(
        conceptEls,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, ease: "back.out(1.4)", duration: 0.04 },
        0.92
      );

      // Subheadline
      tl.fromTo(
        subheadlineEls,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.04 },
        0.93
      );

      // 5. Illustration below typography
      tl.fromTo(
        illustrationEls,
        { opacity: 0, y: 16, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.05 },
        0.94
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={pinWrapperRef} className="relative w-full bg-black">
      {/* Hidden semantic heading for screen readers & SEO */}
      <h1 className="sr-only">MUHAR: Creating systems and random chaos.</h1>

      <section
        ref={heroSectionRef}
        id="hero"
        className="relative flex h-screen h-[100dvh] w-full items-center justify-center overflow-hidden bg-black select-none text-zinc-100"
      >
        {/* =========================================================================
            SCENE 01: PURE VISUAL OPENING SHOT (Desk + MacBook + Lighting)
            Z-Index: z-10
            No HTML text overlays, no labels, no coordinate tags.
        ========================================================================== */}
        <div
          ref={scene1Ref}
          className="pointer-events-none absolute inset-0 z-10 flex h-full w-full items-center justify-center overflow-hidden will-change-transform transition-none"
          style={{
            opacity: 1,
            transform: "scale(1)",
            transformOrigin: "50% 50%",
            transition: "none",
          }}
        >
          <div className="relative h-full w-full min-w-full">
            <Image
              src="/hero-section.jpeg"
              alt="Editorial developer workspace with MacBook"
              fill
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-center"
              style={{ filter: "brightness(0.60)" }}
            />
            <BoardStatusLed
              ref={boardLedRef}
              className="pointer-events-none absolute inset-0 h-full w-full will-change-opacity transition-none"
            />
            <MonitorLight
              ref={monitorLightRef}
              className="pointer-events-none absolute inset-0 h-full w-full will-change-opacity transition-none"
            />
          </div>

          {/* Cinematic Vignette */}
          <div
            ref={vignetteRef}
            className="pointer-events-none absolute inset-0 z-11 will-change-opacity transition-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0.76) 100%)",
              transition: "none",
            }}
          />
        </div>

        {/* Subtle Film Grain (Positioned over Scene 01, decoupled from scaled Scene1 layer) */}
        <div
          ref={grainRef}
          className="pointer-events-none absolute inset-0 z-12 will-change-opacity transition-none"
          style={{ transition: "none" }}
        >
          <svg
            className="h-full w-full opacity-[0.035] mix-blend-screen"
            xmlns="http://www.w3.org/2000/svg"
          >
            <filter id="scene1-film-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
              />
            </filter>
            <rect
              width="100%"
              height="100%"
              filter="url(#scene1-film-grain)"
            />
          </svg>
        </div>

        {/* =========================================================================
            SCENE 01 EDITORIAL MICRO-LABEL
            Z-Index: z-15
            Exhibition annotation: 01 / WORKSPACE, SYSTEMS IN PROGRESS
        ========================================================================== */}
        <div
          ref={scene1LabelRef}
          className="pointer-events-none absolute top-[100px] left-[24px] sm:left-[60px] md:top-[115px] md:left-[85px] lg:top-[120px] lg:left-[90px] z-15 flex flex-col font-mono select-none will-change-transform will-change-opacity"
          style={{ opacity: 0.72 }}
          aria-hidden="true"
        >
          <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-zinc-300 uppercase">
            01 / WORKSPACE
          </span>
          <div className="my-1.5 h-px w-full bg-zinc-400/40" />
          <span className="text-[9px] md:text-[9.5px] font-normal tracking-[0.18em] text-zinc-400 uppercase">
            SYSTEMS IN PROGRESS
          </span>
        </div>

        {/* =========================================================================
            INITIAL MOUNT REVEAL VEIL (Scene 01 initial page load)
            Z-Index: z-20
            Fades out on mount to reveal the opening cinematic shot smoothly.
        ========================================================================== */}
        <div
          ref={blackCoverRef}
          className="pointer-events-none absolute inset-0 z-20 bg-black will-change-opacity transition-none"
          style={{ opacity: 1, transition: "none" }}
          aria-hidden="true"
        />

        {/* =========================================================================
            HARD FULL SOLID BLACK TRANSITION OVERLAY (#000000)
            Z-Index: z-35 (Above ALL Scene 01 layers and Scene 02; covers 100% viewport)
            No transparency, no gradient, no vignette. Holds for deliberate scrub pause.
        ========================================================================== */}
        <div
          ref={solidBlackOverlayRef}
          className="pointer-events-none absolute inset-0 z-35 bg-[#000000] opacity-0 will-change-opacity transition-none"
          style={{ transition: "none" }}
          aria-hidden="true"
        />

        {/* =========================================================================
            SCENE 02: PORTFOLIO INTRO CANVAS
            Z-Index: z-25 (Underneath the Black Overlay during hold, revealed when black lifts)
            Zero letterboxing, fills 100% of viewport on both desktop and mobile.
        ========================================================================== */}
        <div
          ref={scene2Ref}
          className="absolute inset-0 z-25 flex h-full w-full items-center justify-center overflow-hidden pointer-events-none transition-none"
          style={{ opacity: 0, visibility: "hidden", transition: "none" }}
        >
          <Intro className="h-full w-full" />
        </div>
      </section>
    </div>
  );
}
