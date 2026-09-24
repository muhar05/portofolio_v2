"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";

interface MonitorLightProps {
  className?: string;
}

const MonitorLight = forwardRef<SVGSVGElement, MonitorLightProps>(
  function MonitorLight({ className = "" }, ref) {
    const internalRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
      const targetSvg = internalRef.current;
      if (!targetSvg) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) return;

      const ctx = gsap.context(() => {
        // Natural monitor luminance breathing animation (DIM ~0.68 <-> BRIGHT 1.0 over 5.5s)
        gsap.fromTo(
          "#monitor-light-breathing",
          { opacity: 0.68 },
          {
            opacity: 1.0,
            duration: 5.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      }, targetSvg);

      return () => {
        ctx.revert();
      };
    }, []);

    return (
      <svg
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        viewBox="0 0 2752 1536"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <defs>
          {/* =========================================================================
              EXACT MONITOR DISPLAY POLYGON:
              Calculated down to the pixel on hero-section.jpeg (2752x1536).
              P1 (Top-left): (2102, 0)
              P2 (Top screen exit): (2393, 0)
              P3 (Top-right inner bezel): (2752, 109)
              P4 (Bottom-right inner bezel): (2752, 647)
              P5 (Bottom-left inner bezel corner): (2071, 414)
              Strictly excludes bezels, stand, wall, and desk.
          ========================================================================== */}
          <clipPath id="monitor-display-clip">
            <polygon points="2102,0 2393,0 2752,109 2752,647 2071,414" />
          </clipPath>

          {/* =========================================================================
              PHYSICAL DESK SPILL BOUNDARY:
              Starts along the bottom bezel seam of the monitor (2071,414 -> 2752,647),
              extending downward/forward across the desk.
              Excludes the wall behind the monitor and stops well before the MacBook.
          ========================================================================== */}
          <clipPath id="monitor-desk-clip">
            <polygon points="2071,414 2752,647 2752,1536 1500,1536 1500,414" />
          </clipPath>

          {/* =========================================================================
              SCREEN LUMINANCE:
              Subtle warm/neutral screen-light layer making existing code/dashboard feel
              organically emissive and powered on without washing out or redrawing UI.
          ========================================================================== */}
          <linearGradient
            id="monitor-screen-lum"
            x1="2100"
            y1="150"
            x2="2752"
            y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.34" />
            <stop offset="50%" stopColor="#f1f5f9" stopOpacity="0.30" />
            <stop offset="85%" stopColor="#fef3c7" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#fde68a" stopOpacity="0.22" />
          </linearGradient>

          {/* Subtle ambient screen center lift */}
          <radialGradient
            id="monitor-screen-ambient"
            cx="2420"
            cy="280"
            r="420"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#e2e8f0" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0" />
          </radialGradient>

          {/* =========================================================================
              PRIMARY DESK LIGHT SPILL:
              Directional perspective light casting from the display outward/downward
              onto the wooden desk, nearby cables, and sketch papers.
          ========================================================================== */}
          <radialGradient
            id="monitor-desk-spill-primary"
            cx="2400"
            cy="560"
            rx="520"
            ry="300"
            fx="2460"
            fy="520"
            gradientTransform="rotate(16, 2400, 560)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.48" />
            <stop offset="25%" stopColor="#bae6fd" stopOpacity="0.30" />
            <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.14" />
            <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>

          {/* =========================================================================
              WARM DESK BOUNCE SPILL:
              Natural warm reflection off the wooden desk grain, cables, and paper edges.
          ========================================================================== */}
          <radialGradient
            id="monitor-desk-spill-warm"
            cx="2300"
            cy="570"
            rx="380"
            ry="220"
            fx="2360"
            fy="530"
            gradientTransform="rotate(14, 2300, 570)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.34" />
            <stop offset="35%" stopColor="#fdba74" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#fb923c" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
          </radialGradient>

          {/* Immediate bezel-edge soft spill strip under monitor */}
          <linearGradient
            id="monitor-desk-immediate-sheen"
            x1="2071"
            y1="414"
            x2="2752"
            y2="647"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#bae6fd" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.20" />
          </linearGradient>
        </defs>

        {/* Breathing Group: naturally fluctuates monitor intensity (1.0 -> 0.88 -> 1.0) */}
        <g id="monitor-light-breathing" opacity="1.0">
          {/* LAYER 1: Active Monitor Screen Glow */}
          <g
            id="monitor-screen-light"
            clipPath="url(#monitor-display-clip)"
            style={{ mixBlendMode: "screen" }}
          >
            <rect
              x="2070"
              y="0"
              width="682"
              height="650"
              fill="url(#monitor-screen-lum)"
            />
            <rect
              x="2070"
              y="0"
              width="682"
              height="650"
              fill="url(#monitor-screen-ambient)"
            />
          </g>

          {/* LAYER 2: Light Spill onto Desk, Stand, Cables, and Papers */}
          <g
            id="monitor-light-spill"
            clipPath="url(#monitor-desk-clip)"
            style={{ mixBlendMode: "screen" }}
          >
            {/* Primary directional display cast */}
            <ellipse
              cx="2400"
              cy="560"
              rx="520"
              ry="300"
              fill="url(#monitor-desk-spill-primary)"
            />
            {/* Warm wood reflection */}
            <ellipse
              cx="2300"
              cy="570"
              rx="380"
              ry="220"
              fill="url(#monitor-desk-spill-warm)"
            />
            {/* Soft proximity sheen directly below bottom bezel */}
            <polygon
              points="2071,414 2752,647 2752,675 2071,442"
              fill="url(#monitor-desk-immediate-sheen)"
              opacity="0.35"
            />
          </g>
        </g>
      </svg>
    );
  }
);

export default MonitorLight;
