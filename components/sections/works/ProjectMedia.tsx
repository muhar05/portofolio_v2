"use client";

import Image from "next/image";
import type { ProjectMedia as ProjectMediaType } from "@/types/works";

interface ProjectMediaProps {
  media: ProjectMediaType;
  title: string;
  variant?: "cover" | "overview" | "architecture";
  className?: string;
  priority?: boolean;
}

export default function ProjectMedia({
  media,
  title,
  variant = "cover",
  className = "",
  priority = false,
}: ProjectMediaProps) {
  const { images, video } = media;
  const imageSrc = images[variant] || images.cover;

  // If a video source is specified, render the appropriate player
  if (video?.src) {
    if (video.type === "youtube") {
      // Helper to format or sanitize YouTube embed URL if needed
      const embedUrl = video.src.includes("embed")
        ? video.src
        : `https://www.youtube.com/embed/${video.src}`;

      return (
        <div className={`relative aspect-video w-full overflow-hidden rounded border border-zinc-800/80 bg-zinc-950 ${className}`}>
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
        <div className={`relative aspect-video w-full overflow-hidden rounded border border-zinc-800/80 bg-zinc-950 ${className}`}>
          <video
            src={video.src}
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
  }

  // Default to static image placeholder from project data
  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded border border-zinc-800/80 bg-zinc-950 ${className}`}>
      <Image
        src={imageSrc}
        alt={`${title} - ${variant} visual`}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
