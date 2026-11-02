import type { MetadataRoute } from "next";
import worksData from "@/content/works.json";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...worksData.projects.map((project) => ({
      url: `${SITE_URL}/works/${project.id}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
