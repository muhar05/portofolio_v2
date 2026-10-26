import type { MetadataRoute } from "next";
import worksData from "@/content/works.json";

export const dynamic = "force-static";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://muharferdiansyah.my.id"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...worksData.projects.map((project) => ({
      url: `${BASE_URL}/works/${project.id}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
