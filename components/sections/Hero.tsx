"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "@/components/sections/Intro";

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
      if (solidBlackOverlayRef.current) gsap.set(solidBlackOverlayRef.current, { opacity: 0, display: "none" });
      if (scene2Ref.current) {
        gsap.set(scene2Ref.current, { opacity: 1, visibility: "visible", pointerEvents: "auto" });
      }
      gsap.set(".intro-interface-frame", { opacity: 1 });
      gsap.set(".intro-chapter", { opacity: 1, y: 0 });
      gsap.set(".intro-wordmark", { opacity: 1, y: 0 });
      gsap.set(".intro-statement", { opacity: 1, y: 0 });
      gsap.set(".intro-concept", { opacity: 1, scale: 1 });
      gsap.set(".intro-subheadline", { opacity: 1, y: 0 });
      gsap.set(".intro-illustration", { opacity: 1, y: 0, scale: 1 });
      gsap.set(".intro-conduit-emitter", { opacity: 1, y: 0 });
      return;
    }

    const mm = gsap.matchMedia(pinWrapperRef);

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
      if (
        !pinWrapperRef.current ||
        !scene1Ref.current ||
        !scene2Ref.current ||
        !solidBlackOverlayRef.current
      ) {
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=320%",
          pin: true,
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

      // PHASE 1: ZOOM (0.00 -> 0.65)
      tl.to(
        scene1Ref.current,
        {
          scale: 6.4,
          transformOrigin: "50% 39%",
          ease: "none",
          duration: 0.65,
        },
        0
      );

      // PHASE 2: BLACK ENTERS (0.58 -> 0.70)
      tl.to(
        solidBlackOverlayRef.current,
        {
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.12,
        },
        0.58
      );

      // Occlude Scene 01 completely by 0.70
      tl.set(
        scene1Ref.current,
        {
          visibility: "hidden",
          display: "none",
        },
        0.70
      );

      // Prepare Scene 02 behind the black veil during the hold
      tl.set(
        scene2Ref.current,
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
        solidBlackOverlayRef.current,
        {
          opacity: 0,
          ease: "power2.out",
          duration: 0.04,
        },
        0.82
      );

      // Interface perimeter frame
      tl.fromTo(
        ".intro-interface-frame",
        { opacity: 0 },
        { opacity: 1, ease: "power1.out", duration: 0.05 },
        0.83
      );

      // 1. 02 / INTRODUCTION
      tl.fromTo(
        ".intro-chapter",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.05 },
        0.84
      );

      // 2. MUHAR
      tl.fromTo(
        ".intro-wordmark",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.05 },
        0.87
      );

      // 3. Introduction Statement
      tl.fromTo(
        ".intro-statement",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.05 },
        0.90
      );

      // 4. Software x Business x People
      tl.fromTo(
        ".intro-concept",
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, ease: "back.out(1.4)", duration: 0.04 },
        0.92
      );

      // 5. Subheadline
      tl.fromTo(
        ".intro-subheadline",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.04 },
        0.93
      );

      // 6. Flat Illustration
      tl.fromTo(
        ".intro-illustration",
        { opacity: 0, y: 18, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.05 },
        0.94
      );

      // 7. Conduit Emitter
      tl.fromTo(
        ".intro-conduit-emitter",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.03 },
        0.97
      );
    });

    // 2. MOBILE & TABLET TIMELINE (max-width: 1023px)
    mm.add("(max-width: 1023px)", () => {
      if (
        !pinWrapperRef.current ||
        !scene1Ref.current ||
        !scene2Ref.current ||
        !solidBlackOverlayRef.current
      ) {
        return;
      }

      const isPortrait = window.matchMedia("(orientation: portrait)").matches;
      const mobileZoomOrigin = isPortrait ? "50% 38.5%" : "50% 39%";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=280%",
          pin: true,
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

      // PHASE 1: ZOOM into MacBook display on mobile (0.00 -> 0.65)
      tl.to(
        scene1Ref.current,
        {
          scale: 6.4,
          transformOrigin: mobileZoomOrigin,
          ease: "none",
          duration: 0.65,
        },
        0
      );

      // PHASE 2: BLACK ENTERS (0.58 -> 0.70)
      tl.to(
        solidBlackOverlayRef.current,
        {
          opacity: 1,
          ease: "power2.inOut",
          duration: 0.12,
        },
        0.58
      );

      // Occlude Scene 01 completely by 0.70
      tl.set(
        scene1Ref.current,
        {
          visibility: "hidden",
          display: "none",
        },
        0.70
      );

      // Prepare Scene 02 behind veil
      tl.set(
        scene2Ref.current,
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
        solidBlackOverlayRef.current,
        {
          opacity: 0,
          ease: "power2.out",
          duration: 0.04,
        },
        0.82
      );

      tl.fromTo(
        ".intro-interface-frame",
        { opacity: 0 },
        { opacity: 1, ease: "power1.out", duration: 0.04 },
        0.83
      );

      // 1. 02 / INTRODUCTION
      tl.fromTo(
        ".intro-chapter",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.05 },
        0.84
      );

      // 2. MUHAR
      tl.fromTo(
        ".intro-wordmark",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.05 },
        0.87
      );

      // 3. Statement
      tl.fromTo(
        ".intro-statement",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, ease: "power3.out", duration: 0.05 },
        0.90
      );

      // 4. Concept
      tl.fromTo(
        ".intro-concept",
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, ease: "back.out(1.4)", duration: 0.04 },
        0.92
      );

      // Subheadline
      tl.fromTo(
        ".intro-subheadline",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.04 },
        0.93
      );

      // 5. Illustration below typography
      tl.fromTo(
        ".intro-illustration",
        { opacity: 0, y: 16, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.05 },
        0.94
      );

      // 6. Conduit emitter
      tl.fromTo(
        ".intro-conduit-emitter",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.03 },
        0.97
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
          className="pointer-events-none absolute inset-0 z-10 flex h-full w-full items-center justify-center overflow-hidden will-change-transform"
          style={{
            opacity: 1,
            transform: "scale(1)",
            transformOrigin: "50% 39%",
          }}
        >
          <div className="relative h-full w-full min-w-full">
            <Image
              src="/hero section.jpeg"
              alt="Editorial developer workspace with MacBook"
              fill
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Cinematic Vignette */}
          <div
            ref={vignetteRef}
            className="pointer-events-none absolute inset-0 z-11 will-change-opacity"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0.76) 100%)",
            }}
          />

          {/* Subtle Film Grain */}
          <div
            ref={grainRef}
            className="pointer-events-none absolute inset-0 z-12 will-change-opacity"
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
        </div>

        {/* =========================================================================
            INITIAL MOUNT REVEAL VEIL (Scene 01 initial page load)
            Z-Index: z-20
            Fades out on mount to reveal the opening cinematic shot smoothly.
        ========================================================================== */}
        <div
          ref={blackCoverRef}
          className="pointer-events-none absolute inset-0 z-20 bg-black will-change-opacity"
          style={{ opacity: 1 }}
          aria-hidden="true"
        />

        {/* =========================================================================
            HARD FULL SOLID BLACK TRANSITION OVERLAY (#000000)
            Z-Index: z-35 (Above ALL Scene 01 layers and Scene 02; covers 100% viewport)
            No transparency, no gradient, no vignette. Holds for deliberate scrub pause.
        ========================================================================== */}
        <div
          ref={solidBlackOverlayRef}
          className="pointer-events-none absolute inset-0 z-35 bg-[#000000] opacity-0 will-change-opacity"
          aria-hidden="true"
        />

        {/* =========================================================================
            SCENE 02: PORTFOLIO INTRO CANVAS
            Z-Index: z-30 (Above Scene 01, under Black Overlay during hold)
            Full-viewport canvas with zero letterbox and no nested laptop chassis.
        ========================================================================== */}
        <div
          ref={scene2Ref}
          className="absolute inset-0 z-30 flex h-full w-full items-center justify-center overflow-hidden opacity-0 pointer-events-none"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <Intro className="h-full w-full" />
        </div>
      </section>
    </div>
  );
}
