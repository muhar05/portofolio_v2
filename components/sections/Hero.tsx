"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DigitalWorld from "@/components/digital-world/DigitalWorld";

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
export const SCENE1_FADE_END = 0.9; // When Scene 1 has completely disappeared

export const SCENE2_FADE_START = 0.95; // When Scene 2 / HTML screen starts fading in
export const SCENE2_FADE_END = 1.25; // When Scene 2 / HTML screen becomes fully visible

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Hero() {
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const blackCoverRef = useRef<HTMLDivElement>(null);

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

      if (process.env.NODE_ENV === "development") {
        console.log("[Hero GSAP] Context mounted. Checking DigitalWorld elements in DOM:", {
          frames: pinWrapperRef.current.querySelectorAll(".dw-interface-frame").length,
          illustration: pinWrapperRef.current.querySelectorAll(".dw-illustration").length,
          contentItems: pinWrapperRef.current.querySelectorAll(".dw-content-item").length,
        });
      }

      // Cinematic Initial Load Reveal for Scene 01
      // Fades the solid #000000 black veil from opacity 1 to 0 over 1.0s with power2.out,
      // revealing Scene 01 smoothly without interfering with ScrollTrigger initialization.
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const isScrolled =
        typeof window !== "undefined" && window.scrollY > 20;

      if (blackCoverRef.current) {
        if (prefersReducedMotion || isScrolled) {
          gsap.set(blackCoverRef.current, { opacity: 0, display: "none" });
        } else {
          gsap.to(blackCoverRef.current, {
            opacity: 0,
            duration: 1.0,
            ease: "power2.out",
            onComplete: () => {
              if (blackCoverRef.current) {
                blackCoverRef.current.style.display = "none";
              }
            },
          });
        }
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
          onUpdate: (self) => {
            if (process.env.NODE_ENV === "development") {
              if (self.progress >= 0.75 && self.progress <= 1.0) {
                console.log(
                  "[Hero GSAP] MacBook screen active, scroll progress:",
                  self.progress.toFixed(3)
                );
              }
            }
          },
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

      // 2. Exhibition Label: fades out quickly as user begins scrolling (0.0 -> 0.25)
      if (labelRef.current) {
        tl.to(
          labelRef.current,
          {
            opacity: 0,
            y: -10,
            ease: "power1.out",
            duration: 0.25,
          },
          0
        );
      }

      // 3. Cinematic Vignette: gradually dissolves as camera moves forward (0.05 -> 0.45)
      if (vignetteRef.current) {
        tl.to(
          vignetteRef.current,
          {
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.4,
          },
          0.05
        );
      }

      // 4. Subtle Film Grain: dissolves alongside vignette before close-up (0.05 -> 0.45)
      if (grainRef.current) {
        tl.to(
          grainRef.current,
          {
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.4,
          },
          0.05
        );
      }

      // 5. Scene 1 fade-out when camera is close to the MacBook screen
      tl.to(
        scene1Ref.current,
        {
          opacity: 0,
          ease: "power1.inOut",
          duration: SCENE1_FADE_END - SCENE1_FADE_START,
        },
        SCENE1_FADE_START
      );

      // 6. Scene 2 / HTML screen fades in once camera physically enters the display
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

      // 7. Digital World Entrance inside Scene 2:
      // Choreographed sequence starting right as Scene 2 fades in (0.96 -> 1.25)
      // Step 1: Digital interface stabilizes (perimeter frame & coordinate boundaries)
      tl.fromTo(
        ".dw-interface-frame",
        { opacity: 0 },
        { opacity: 1, ease: "power1.out", duration: 0.16 },
        0.96
      );

      // Step 2 & 3: Flat illustration appears and settles into position
      tl.fromTo(
        ".dw-illustration",
        {
          opacity: 0,
          y: 22,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          duration: 0.2,
        },
        1.02
      );

      // Step 3b: Chaos energy particles bloom within illustration
      tl.fromTo(
        ".dw-illustration-chaos",
        {
          opacity: 0,
          scale: 0.8,
          transformOrigin: "50% 50%",
        },
        {
          opacity: 1,
          scale: 1,
          ease: "back.out(1.4)",
          duration: 0.16,
        },
        1.06
      );

      // Step 4: Main digital content becomes readable (staggered cascade)
      tl.fromTo(
        ".dw-content-item",
        {
          opacity: 0,
          y: 14,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.18,
          stagger: 0.02,
        },
        1.05
      );
    }, pinWrapperRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Mouse tracking for subtle ambient sheen on the display in Scene 2
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
      <h1 className="sr-only">MUHAR: Creating systems and random chaos.</h1>

      <section
        ref={heroSectionRef}
        id="hero"
        className="relative flex h-screen h-[100dvh] w-full items-center justify-center overflow-hidden bg-black select-none text-zinc-100"
      >
        {/* =========================================================================
            LAYER 1: Scene 1 JPEG (/public/hero section.jpeg)
            Z-Index: z-10
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
            LAYER 2: Cinematic Vignette (Scene 1 only)
            Z-Index: z-11 (above Scene 1 JPEG, below Grain, Label & Scene 2)
            Pure CSS radial darkening toward edges; center/MacBook completely clear.
        ========================================================================== */}
        <div
          ref={vignetteRef}
          className="pointer-events-none absolute inset-0 z-11 will-change-opacity"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0.76) 100%)",
          }}
        />

        {/* =========================================================================
            LAYER 3: Subtle Film Grain (Scene 1 only)
            Z-Index: z-12 (above Vignette, below Label & Scene 2)
            Static micro-texture; dissolves before close-up.
        ========================================================================== */}
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

        {/* =========================================================================
            LAYER 4: Exhibition Label (Scene 1 only)
            Z-Index: z-13 (above Grain, below Scene 2)
            Minimal, monochrome, positioned at bottom-left corner away from MacBook.
        ========================================================================== */}
        <div
          ref={labelRef}
          className="pointer-events-none absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-13 flex flex-col gap-1 select-none will-change-transform will-change-opacity"
        >
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            SCENE 01
          </span>
          <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-zinc-300">
            WORKSPACE
          </span>
        </div>

        {/* =========================================================================
            CINEMATIC INITIAL REVEAL LAYER (Scene 1 initial load)
            Z-Index: z-15 (above Scene 1 JPEG, vignette, grain & label; below Scene 2)
            Solid #000000 black veil ensuring deterministic initial state without JPEG flash.
            Fades out smoothly on mount (opacity 1 -> 0, power2.out) to reveal Scene 01.
        ========================================================================== */}
        <div
          ref={blackCoverRef}
          className="pointer-events-none absolute inset-0 z-15 bg-black will-change-opacity"
          style={{ opacity: 1 }}
          aria-hidden="true"
        />

        {/* =========================================================================
            LAYER 5: Scene 2 MacBook Display (/public/hero-next-frame.jpg)
            Z-Index: z-20 (on top of all Scene 1 layers)
            Unaffected by Scene 1 vignette, grain, or label.
            Starts 100% HIDDEN (opacity: 0, scale: 0.92).
            Fades in at SCENE2_FADE_START.
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
              {/* Clean MacBook Screen Surface Texture */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <Image
                  src="/macbook-screen-texture.jpg"
                  alt="MacBook screen surface texture"
                  fill
                  priority
                  sizes="100vw"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Digital World Interface Layer */}
              <DigitalWorld className="absolute inset-0 z-10" />

              {/* Subtle Organic Glass Reflection from Reference Scene */}
              <div
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(72, 69, 86, 0.16) 0%, rgba(38, 36, 47, 0.05) 40%, rgba(18, 18, 23, 0.0) 80%, rgba(12, 12, 16, 0.2) 100%)",
                }}
              />

              {/* Exhibition Center Key Lighting */}
              <div
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 55% at 50% 46%, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.008) 45%, transparent 75%)",
                }}
              />

              {/* Interactive Screen Sheen Following Cursor */}
              {mousePos && (
                <div
                  className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ease-out"
                  style={{
                    background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.035) 0%, transparent 70%)`,
                  }}
                />
              )}

              {/* Micro-Noise Grain Filter */}
              <svg
                className="pointer-events-none absolute inset-0 z-20 h-full w-full opacity-[0.028] mix-blend-screen"
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
