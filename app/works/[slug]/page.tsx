import { notFound } from "next/navigation";
import type { Metadata } from "next";
import worksData from "@/content/works.json";
import WorkHero from "@/components/sections/works/WorkHero";
import WorkProblem from "@/components/sections/works/WorkProblem";
import WorkFulfillmentFlow from "@/components/sections/works/WorkFulfillmentFlow";
import WorkChallenge from "@/components/sections/works/WorkChallenge";
import WorkArchitecture from "@/components/sections/works/WorkArchitecture";
import WorkEngineering from "@/components/sections/works/WorkEngineering";
import WorkOutcome from "@/components/sections/works/WorkOutcome";
import WorkClosing from "@/components/sections/works/WorkClosing";
import ProjectViewTracker from "@/components/analytics/ProjectViewTracker";
import { SITE_URL } from "@/lib/site";
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
    alternates: { canonical: `/works/${project.id}/` },
    openGraph: {
      type: "article",
      url: `/works/${project.id}/`,
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

  const projectUrl = `${SITE_URL}/works/${project.id}/`;
  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.headline,
    description: project.description,
    url: projectUrl,
    image: `${projectUrl}opengraph-image`,
    genre: project.category,
    keywords: project.stack.join(", "),
    about: project.domains ?? [],
    inLanguage: "en",
    creator: {
      "@type": "Person",
      name: "Muhar Ferdiansyah",
      url: SITE_URL,
    },
    author: {
      "@type": "Person",
      name: "Muhar Ferdiansyah",
      url: SITE_URL,
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Muhar Ferdiansyah Portfolio",
      url: `${SITE_URL}/`,
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${SITE_URL}/#selected-work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  return (
    <main id="main-content" tabIndex={-1} className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectViewTracker
        slug={project.id}
        title={project.title}
        category={project.category}
      />
      <WorkHero project={project as Project} />
      <WorkProblem project={project as Project} />
      <WorkFulfillmentFlow project={project as Project} />
      <WorkChallenge project={project as Project} />
      <WorkArchitecture project={project as Project} />
      <WorkEngineering project={project as Project} />
      <WorkOutcome project={project as Project} />
      <WorkClosing nextProject={nextProject as Project | undefined} />
    </main>
  );
}
