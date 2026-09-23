"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";

interface WorkspaceDecorationsProps {
  className?: string;
}

const WorkspaceDecorations = forwardRef<SVGSVGElement, WorkspaceDecorationsProps>(
  function WorkspaceDecorations({ className = "" }, ref) {
    const internalRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
      const targetSvg = internalRef.current;
      if (!targetSvg) return;

      const ctx = gsap.context(() => {
        // 1. Upper-left mark: subtle vertical breathing drift
        gsap.to("#ws-mark-left", {
          y: "+=4",
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Slow rotation on the dashed calibration ring
        gsap.to("#ws-ring-left", {
          rotation: 360,
          transformOrigin: "50% 50%",
          duration: 36,
          repeat: -1,
          ease: "none",
        });

        // Gentle pulse on the status dot
        gsap.to("#ws-dot-left", {
          opacity: 0.35,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // 2. Upper-right mark: gentle out-of-phase floating drift
        gsap.to("#ws-mark-right", {
          y: "-=3.5",
          duration: 5.4,
          delay: 1.0,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Subtle scale breathing on the precision diamond
        gsap.to("#ws-diamond-right", {
          scale: 1.1,
          transformOrigin: "50% 50%",
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Gentle amber pulse
        gsap.to("#ws-dot-right", {
          opacity: 0.35,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
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
        viewBox="0 0 1664 897"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* =========================================================================
            ELEMENT 1: Upper-Left Desk Area (x = 350, y = 160)
            Positioned in the empty wooden desk space above the Raspberry Pi,
            well clear of the MacBook (x: 644..1020, y: 230..471).
        ========================================================================== */}
        <g id="ws-mark-left" transform="translate(350, 160)">
          {/* Slow-rotating dashed calibration ring */}
          <circle
            id="ws-ring-left"
            cx="0"
            cy="0"
            r="15"
            stroke="#d4d4d8"
            strokeWidth="0.65"
            strokeDasharray="2 3"
            opacity="0.32"
          />

          {/* Precision Crosshair */}
          <line x1="-7" y1="0" x2="7" y2="0" stroke="#e4e4e7" strokeWidth="0.75" opacity="0.45" />
          <line x1="0" y1="-7" x2="0" y2="7" stroke="#e4e4e7" strokeWidth="0.75" opacity="0.45" />

          {/* Tiny Center Pulsing Indicator */}
          <circle id="ws-dot-left" cx="0" cy="0" r="1.5" fill="#f97316" opacity="0.85" />

          {/* Minimal Editorial Monospace Tag */}
          <text
            x="22"
            y="3"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
            fontSize="7"
            fill="#a1a1aa"
            opacity="0.42"
            letterSpacing="0.16em"
          >
            SYS // 01
          </text>
        </g>

        {/* =========================================================================
            ELEMENT 2: Upper-Right Area (x = 1130, y = 185)
            Positioned in the negative space between the MacBook right lid
            and the wireframe papers, completely outside the laptop.
        ========================================================================== */}
        <g id="ws-mark-right" transform="translate(1130, 185)">
          {/* Subtle Horizontal Hairline Guide */}
          <line
            x1="-22"
            y1="0"
            x2="22"
            y2="0"
            stroke="#71717a"
            strokeWidth="0.5"
            strokeDasharray="2 3"
            opacity="0.3"
          />

          {/* Geometric Diamond Mark */}
          <rect
            id="ws-diamond-right"
            x="-6"
            y="-6"
            width="12"
            height="12"
            transform="rotate(45)"
            stroke="#e4e4e7"
            strokeWidth="0.65"
            opacity="0.4"
          />

          {/* Center Amber Accent Dot */}
          <circle id="ws-dot-right" cx="0" cy="0" r="1.5" fill="#f97316" opacity="0.8" />

          {/* Minimal Editorial Coordinate Tag */}
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
            fontSize="6.5"
            fill="#a1a1aa"
            opacity="0.4"
            letterSpacing="0.18em"
          >
            [ REF.02 ]
          </text>
        </g>
      </svg>
    );
  }
);

export default WorkspaceDecorations;
