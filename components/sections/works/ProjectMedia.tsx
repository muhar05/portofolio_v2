"use client";

import Image from "next/image";
import type { ProjectMedia as ProjectMediaType } from "@/types/works";

export interface ProjectMediaProps {
  media: ProjectMediaType;
  title: string;
  variant?: "cover" | "overview" | "architecture";
  mode?: "image" | "video";
  display?: "card" | "hero";
  className?: string;
  priority?: boolean;
}

export default function ProjectMedia({
  media,
  title,
  variant = "cover",
  mode = "image",
  display = "hero",
  className = "",
  priority = false,
}: ProjectMediaProps) {
  const { images, video } = media;

  // VIDEO MODE: Only render if explicitly requested and video.src is non-empty
  if (mode === "video") {
    const videoSrc = video?.src?.trim();

    // If video src is empty or missing, hide completely (do not render container)
    if (!video || !videoSrc) {
      return null;
    }

    if (video.type === "youtube") {
      const embedUrl = videoSrc.includes("embed")
        ? videoSrc
        : videoSrc.includes("watch?v=")
        ? videoSrc.replace("watch?v=", "embed/")
        : `https://www.youtube.com/embed/${videoSrc}`;

      return (
        <div
          className={`relative aspect-video w-full overflow-hidden rounded border border-zinc-800/80 bg-zinc-950 ${className}`}
        >
          <iframe
            src={embedUrl}
            title={`${title} video demonstration`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      );
    }

    if (video.type === "local") {
      return (
        <div
          className={`relative aspect-video w-full overflow-hidden rounded border border-zinc-800/80 bg-zinc-950 ${className}`}
        >
          <video
            src={videoSrc}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          >
            Your browser does not support HTML5 video.
          </video>
        </div>
      );
    }

    return null;
  }

  // IMAGE MODE: Render project image only (no video fallback or container)
  const imageSrc = images[variant] || images.cover;
  const isPortrait = images.portrait === true;
  const frameClassName = isPortrait
    ? display === "card"
      ? "aspect-[4/5]"
      : "aspect-[9/16] max-w-[420px] mx-auto"
    : "aspect-video";
  const sizes = isPortrait
    ? display === "card"
      ? "(max-width: 1024px) 100vw, 400px"
      : "(max-width: 768px) 100vw, 420px"
    : "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px";

  return (
    <div
      className={`relative ${frameClassName} w-full overflow-hidden rounded border border-zinc-800/80 bg-zinc-950 ${className}`}
    >
      <Image
        src={imageSrc}
        alt={`${title} - ${variant} visual`}
        fill
        priority={priority}
        sizes={sizes}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
