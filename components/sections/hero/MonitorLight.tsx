"use client";

import { forwardRef, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface MonitorLightProps {
  className?: string;
}

const MonitorLight = forwardRef<HTMLDivElement, MonitorLightProps>(
  function MonitorLight({ className = "" }, ref) {
    const internalRef = useRef<HTMLDivElement | null>(null);
    const breathingRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
      const targetEl = internalRef.current;
      if (!targetEl) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) return;

      const ctx = gsap.context(() => {
        // Natural monitor luminance breathing animation (DIM ~0.68 <-> BRIGHT 1.0 over 5.5s)
        if (breathingRef.current) {
          gsap.fromTo(
            breathingRef.current,
            { opacity: 0.68 },
            {
              opacity: 1.0,
              duration: 5.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            }
          );
        }
      }, targetEl);

      return () => {
        ctx.revert();
      };
    }, []);

    return (
      <div
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={className}
        aria-hidden="true"
      >
        <Image
          ref={breathingRef}
          src="/images/hero/monitor-light.webp"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          draggable={false}
          className="object-cover"
          style={{ mixBlendMode: "screen" }}
        />
      </div>
    );
  }
);

export default MonitorLight;
