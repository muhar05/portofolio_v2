"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import FlatIllustration from "./FlatIllustration";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const SCENE_URL =
  process.env.NEXT_PUBLIC_SPLINE_SCENE ??
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

const LOAD_TIMEOUT_MS = 9000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type SceneStatus = "loading" | "ready" | "error";

export default function HeroScene() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<SceneStatus>("loading");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setVisible(width > 0 && height > 0);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (status !== "loading") return;
    const timer = setTimeout(() => setStatus("error"), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [status]);

  if (reduceMotion || status === "error") {
    return <FlatIllustration />;
  }

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-500 ${
          status === "ready" ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#f97316] motion-safe:animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600">
          Loading scene
        </span>
      </div>

      {visible && (
        <Spline
          scene={SCENE_URL}
          onLoad={() => setStatus("ready")}
          className="h-full w-full"
        />
      )}
    </div>
  );
}
