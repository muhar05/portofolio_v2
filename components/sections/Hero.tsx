"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// =========================================================================
// HERO SCROLL TIMING CONFIGURATION
// -------------------------------------------------------------------------
// 0.0 = transition starts (user starts scrolling from top of page)
// 0.5 = halfway through zoom (camera is getting close to the MacBook screen)
// 1.0 = transition ends (Scene 2 is fully visible, pin is about to release)
//
// Adjust these constants to tune the exact moment Scene 1 fades out and
// Scene 2 fades in:
// =========================================================================
export const SCENE1_FADE_START = 0.8; // When Scene 1 begins to fade out
export const SCENE1_FADE_END = 0.90; // When Scene 1 has completely disappeared

export const SCENE2_FADE_START = 0.95; // When Scene 2 / HTML screen starts fading in
export const SCENE2_FADE_END = 1.25; // When Scene 2 / HTML screen becomes fully visible

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;


export default function Hero() {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (
        !pinWrapperRef.current ||
        !scene1Ref.current ||
        !scene2Ref.current
      ) {
        return;
      }

      // Master Scroll-driven Zoom Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1, // Smooth scrub with 1s damping
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Scene 1 continuous camera zoom into the MacBook screen across the whole transition
      // Starting from wide developer desk (scale 1) and zooming directly toward
      // the laptop screen centered at (50% 39%) up to scale 5.2.
      tl.to(
        scene1Ref.current,
        {
          scale: 5.2,
          transformOrigin: "50% 39%",
          ease: "none",
          duration: 1.0,
        },
        0
      );

      // 2. Scene 1 fade-out when camera is close to the MacBook screen
      tl.to(
        scene1Ref.current,
        {
          opacity: 0,
          ease: "power1.inOut",
          duration: SCENE1_FADE_END - SCENE1_FADE_START,
        },
        SCENE1_FADE_START
      );

      // 3. Scene 2 / HTML screen fades in once camera physically enters the display
      tl.fromTo(
        scene2Ref.current,
        {
          opacity: 0,
          scale: 0.92,
          transformOrigin: "50% 50%",
        },
        {
          opacity: 1,
          scale: 1.0,
          ease: "power1.out",
          duration: SCENE2_FADE_END - SCENE2_FADE_START,
        },
        SCENE2_FADE_START
      );
    }, pinWrapperRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Mouse tracking for subtle ambient sheen on the display
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroSectionRef.current) return;
      const rect = heroSectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseLeave = () => {
      setMousePos(null);
    };

    const sectionEl = heroSectionRef.current;
    if (sectionEl) {
      sectionEl.addEventListener("mousemove", handleMouseMove);
      sectionEl.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (sectionEl) {
        sectionEl.removeEventListener("mousemove", handleMouseMove);
        sectionEl.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={pinWrapperRef} className="relative w-full bg-black">
      {/* Hidden semantic heading for screen readers & SEO without causing visual overlap */}
      <h1 className="sr-only">MUHAR — Creating systems and random chaos.</h1>

      <section
        ref={heroSectionRef}
        id="hero"
        className="relative flex h-screen h-[100dvh] w-full items-center justify-center overflow-hidden bg-black select-none text-zinc-100"
      >
        {/* =========================================================================
            SCENE 1: The Developer Desk (/public/hero section.jpeg)
            Layer: z-10 (under Scene 2, over pure solid black #000 background)
            Starts 100% visible at scale 1.
            ScrollTrigger zooms in toward MacBook display (transformOrigin: 50% 39%).
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
              alt="Developer desk with MacBook"
              fill
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* =========================================================================
            SCENE 2: The Extreme Close-Up MacBook Display (/public/hero-next-frame.jpg)
            Layer: z-20 (on top of Scene 1)
            Starts 100% HIDDEN (opacity: 0, scale: 0.92) to eliminate any refresh glitch.
            Fades in ONLY AFTER camera is sufficiently close (at SCENE2_FADE_START).
            Contains single source of typography baked inside hero-next-frame.jpg.
        ========================================================================== */}
        <div
          ref={scene2Ref}
          className="pointer-events-none absolute inset-0 z-20 flex h-full w-full items-center justify-center overflow-hidden p-2.5 sm:p-4 md:p-6 lg:p-8 will-change-transform will-change-opacity opacity-0"
          style={{
            opacity: 0,
            transform: "scale(0.92)",
            transformOrigin: "50% 50%",
          }}
        >
          {/* Close-Up MacBook Chassis Framing */}
          <div
            className="relative flex aspect-[16/10] md:aspect-[16/9] w-full max-w-[1720px] flex-col rounded-[16px] sm:rounded-[24px] md:rounded-[34px] bg-[#1e1d27] p-[8px] sm:p-[12px] md:p-[16px] lg:p-[20px] shadow-[0_20px_100px_rgba(0,0,0,0.95)] ring-1 ring-[#3d3b4d]/50"
            style={{
              maxHeight: "94vh",
            }}
          >
            {/* Top Bezel Camera Dot */}
            <div className="absolute top-[3px] sm:top-[4px] md:top-[6px] lg:top-[8px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#0c0c10] ring-1 ring-white/10" />

            {/* Inner Display Surface */}
            <div
              className="relative flex h-full w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-[10px] sm:rounded-[16px] md:rounded-[22px] bg-[#121217]"
              style={{
                boxShadow: "inset 0 0 80px 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              {/* Reference Image /hero-next-frame.jpg (Single source of typography) */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <Image
                  src="/hero-next-frame.jpg"
                  alt="MacBook screen close-up"
                  fill
                  priority
                  sizes="100vw"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Subtle Organic Glass Reflection from Reference Scene */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(72, 69, 86, 0.22) 0%, rgba(38, 36, 47, 0.08) 40%, rgba(18, 18, 23, 0.0) 80%, rgba(12, 12, 16, 0.3) 100%)",
                }}
              />

              {/* Exhibition Center Key Lighting */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 55% at 50% 46%, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.01) 45%, transparent 75%)",
                }}
              />

              {/* Interactive Screen Sheen Following Cursor */}
              {mousePos && (
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
                  style={{
                    background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.04) 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* Micro-Noise Grain Filter */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.032] mix-blend-screen"
                xmlns="http://www.w3.org/2000/svg"
              >
                <filter id="screen-display-noise-hero">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.75"
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
                  filter="url(#screen-display-noise-hero)"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
