import { notFound } from "next/navigation";
import type { Metadata } from "next";
import worksData from "@/content/works.json";
import WorkHero from "@/components/sections/works/WorkHero";
import WorkProblem from "@/components/sections/works/WorkProblem";
import WorkFulfillmentFlow from "@/components/sections/works/WorkFulfillmentFlow";
import WorkArchitecture from "@/components/sections/works/WorkArchitecture";
import WorkClosing from "@/components/sections/works/WorkClosing";
import ProjectViewTracker from "@/components/analytics/ProjectViewTracker";
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

  return {
    title: `${project.title}: Case Study`,
    description: project.description,
    alternates: { canonical: `/works/${project.id}` },
    openGraph: {
      type: "article",
      url: `/works/${project.id}`,
      siteName: "Muhar Ferdiansyah",
      title: `${project.title}: Case Study`,
      description: project.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title}: Case Study`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = worksData.projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = worksData.projects.findIndex(
    (item) => item.id === project.id
  );
  const nextProject =
    worksData.projects.length > 1
      ? worksData.projects[(currentIndex + 1) % worksData.projects.length]
      : undefined;

  return (
    <main className="flex-1">
      <ProjectViewTracker
        slug={project.id}
        title={project.title}
        category={project.category}
      />
      <WorkHero project={project as Project} />
      <WorkProblem project={project as Project} />
      <WorkFulfillmentFlow project={project as Project} />
      <WorkArchitecture project={project as Project} />
      <WorkClosing nextProject={nextProject as Project | undefined} />
    </main>
  );
}
