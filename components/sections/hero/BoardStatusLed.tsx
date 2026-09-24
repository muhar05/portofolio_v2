"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";

interface BoardStatusLedProps {
  className?: string;
}

const BoardStatusLed = forwardRef<SVGSVGElement, BoardStatusLedProps>(
  function BoardStatusLed({ className = "" }, ref) {
    const internalRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
      const targetSvg = internalRef.current;
      if (!targetSvg) return;

      const ctx = gsap.context(() => {
        // Natural irregular status LED activity heartbeat
        const ledTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.9,
        });

        ledTl
          // Initial quick read/write double-pulse
          .to("#board-led-core, #board-led-hotspot", { opacity: 0.85, duration: 0.09, ease: "power1.out" })
          .to("#board-led-glow", { opacity: 0.45, duration: 0.09, ease: "power1.out" }, "<")
          .to("#board-led-core, #board-led-hotspot", { opacity: 0.25, duration: 0.12, ease: "power1.in" })
          .to("#board-led-glow", { opacity: 0.12, duration: 0.12, ease: "power1.in" }, "<")
          .to("#board-led-core, #board-led-hotspot", { opacity: 0.95, duration: 0.07, ease: "power1.out", delay: 0.08 })
          .to("#board-led-glow", { opacity: 0.55, duration: 0.07, ease: "power1.out" }, "<")
          .to("#board-led-core, #board-led-hotspot", { opacity: 0.22, duration: 0.16, ease: "power1.in" })
          .to("#board-led-glow", { opacity: 0.1, duration: 0.16, ease: "power1.in" }, "<")

          // Moderate hold in quiet standby
          .to({}, { duration: 0.7 })

          // Gentle single activity pulse
          .to("#board-led-core, #board-led-hotspot", { opacity: 0.72, duration: 0.22, ease: "power2.out" })
          .to("#board-led-glow", { opacity: 0.38, duration: 0.22, ease: "power2.out" }, "<")
          .to("#board-led-core, #board-led-hotspot", { opacity: 0.2, duration: 0.26, ease: "power2.in" })
          .to("#board-led-glow", { opacity: 0.08, duration: 0.26, ease: "power2.in" }, "<")

          // Longer natural rest before next activity cycle
          .to({}, { duration: 1.5 });
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
            PHYSICAL STATUS LED ON GREEN ELECTRONICS BOARD:
            Located directly on the surface of the green PCB board
            (x ≈ 479..581, y ≈ 375..436) at coordinate (536, 403).
            Everything else in this SVG is 100% transparent.
        ========================================================================== */}
        <g id="physical-board-led">
          {/* Subtle localized ambient glow on PCB surface */}
          <circle
            id="board-led-glow"
            cx="536"
            cy="403"
            r="2.8"
            fill="#ea580c"
            opacity="0.12"
          />

          {/* Tiny SMD 0805 component body sitting flush on the green board */}
          <rect
            x="534.6"
            y="401.6"
            width="2.8"
            height="2.8"
            rx="0.5"
            fill="#18181b"
            opacity="0.75"
          />

          {/* Warm amber LED emitter core */}
          <circle
            id="board-led-core"
            cx="536"
            cy="403"
            r="1.2"
            fill="#fb923c"
            opacity="0.25"
          />

          {/* Incandescent center hotspot */}
          <circle
            id="board-led-hotspot"
            cx="536"
            cy="403"
            r="0.6"
            fill="#fff7ed"
            opacity="0.3"
          />
        </g>
      </svg>
    );
  }
);

export default BoardStatusLed;
