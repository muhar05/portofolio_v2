import type { MetadataRoute } from "next";
import worksData from "@/content/works.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...worksData.projects.map((project) => ({
      url: `${BASE_URL}/works/${project.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
