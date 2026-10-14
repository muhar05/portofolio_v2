import { notFound } from "next/navigation";
import type { Metadata } from "next";
import worksData from "@/content/works.json";
import WorkHero from "@/components/sections/works/WorkHero";
import WorkProblem from "@/components/sections/works/WorkProblem";
import WorkFulfillmentFlow from "@/components/sections/works/WorkFulfillmentFlow";
import WorkArchitecture from "@/components/sections/works/WorkArchitecture";
import WorkClosing from "@/components/sections/works/WorkClosing";
import type { Project } from "@/types/works";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return worksData.projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = worksData.projects.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const cover = project.media?.images?.cover;

  return {
    title: `${project.title}: Case Study`,
    description: project.description,
    alternates: { canonical: `/works/${project.id}` },
    openGraph: {
      type: "article",
      title: `${project.title}: Case Study`,
      description: project.description,
      ...(cover ? { images: [{ url: cover, alt: project.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title}: Case Study`,
      description: project.description,
      ...(cover ? { images: [cover] } : {}),
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = worksData.projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1">
      <WorkHero project={project as Project} />
      <WorkProblem project={project as Project} />
      <WorkFulfillmentFlow project={project as Project} />
      <WorkArchitecture project={project as Project} />
      <WorkClosing />
    </main>
  );
}
