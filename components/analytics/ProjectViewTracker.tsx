"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

interface ProjectViewTrackerProps {
  slug: string;
  title: string;
  category: string;
}

export default function ProjectViewTracker({
  slug,
  title,
  category,
}: ProjectViewTrackerProps) {
  const lastTrackedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (lastTrackedSlug.current === slug) return;

    lastTrackedSlug.current = slug;
    trackEvent("project_view", {
      project_slug: slug,
      project_title: title,
      project_category: category,
    });
  }, [slug, title, category]);

  return null;
}
