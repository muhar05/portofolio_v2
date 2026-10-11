import { notFound } from "next/navigation";
import type { Metadata } from "next";
import worksData from "@/content/works.json";
import WorkHero from "@/components/sections/works/WorkHero";
import WorkProblem from "@/components/sections/works/WorkProblem";
import WorkApproach from "@/components/sections/works/WorkApproach";
import WorkFulfillment from "@/components/sections/works/WorkFulfillment";
import WorkArchitecture from "@/components/sections/works/WorkArchitecture";
import WorkDecisions from "@/components/sections/works/WorkDecisions";
import WorkWorkflow from "@/components/sections/works/WorkWorkflow";
import WorkDemo from "@/components/sections/works/WorkDemo";
import WorkResult from "@/components/sections/works/WorkResult";
import WorkStack from "@/components/sections/works/WorkStack";
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

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
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
      <WorkProblem />
      <WorkApproach />
      <WorkFulfillment />
      <WorkArchitecture />
      <WorkDecisions />
      <WorkWorkflow />
      <WorkDemo project={project as Project} />
      <WorkResult />
      <WorkStack />
      <WorkClosing />
    </main>
  );
}
