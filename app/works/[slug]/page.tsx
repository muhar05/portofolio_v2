import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import worksData from "@/content/works.json";
import ProjectMedia from "@/components/sections/works/ProjectMedia";
import type { ProjectMedia as ProjectMediaType } from "@/types/works";

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

  const hasVideo = Boolean(project.media?.video?.src?.trim());

  return (
    <article className="min-h-screen w-full bg-[#08080a] text-zinc-100 px-6 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-4xl">
        {/* Back navigation */}
        <nav aria-label="Back navigation" className="mb-10 sm:mb-14">
          <Link
            href="/#selected-work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">
              ←
            </span>
            <span className="border-b border-transparent group-hover:border-white pb-0.5 transition-colors">
              BACK TO OVERVIEW
            </span>
          </Link>
        </nav>

        {/* Header Block */}
        <header className="border-b border-zinc-800/60 pb-10 sm:pb-14">
          <div className="flex items-center gap-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#f97316] font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" aria-hidden="true" />
            <span>CASE STUDY // SYSTEM ARCHITECTURE</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
            <span className="text-zinc-200 font-semibold">{project.title}</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <h1 className="mt-6 font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]">
            {project.headline}
          </h1>

          <p className="mt-4 sm:mt-6 font-sans text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {project.description}
          </p>
        </header>

        {/* Video Demonstration (Rendered ONLY if media.video has a non-empty src) */}
        {hasVideo && project.media ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="video-heading">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#f97316] font-semibold mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" aria-hidden="true" />
              <h2 id="video-heading">PROJECT DEMONSTRATION</h2>
            </div>
            <ProjectMedia
              media={project.media as ProjectMediaType}
              title={project.title}
              mode="video"
            />
          </section>
        ) : null}

        {/* Primary Cover Visual */}
        {project.media ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="cover-heading">
            <h2 id="cover-heading" className="sr-only">Primary Project Visual</h2>
            <ProjectMedia
              media={project.media as ProjectMediaType}
              title={project.title}
              variant="cover"
              mode="image"
              priority
            />
            <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              <span>FIG.01 // SYSTEM CONSOLE</span>
              <span>PRODUCTION INTERFACE</span>
            </div>
          </section>
        ) : null}

        {/* Overview: Problem & Approach */}
        <section className="mt-16 sm:mt-24 space-y-12 sm:space-y-16" aria-labelledby="overview-heading">
          <div className="border-t border-zinc-800/60 pt-10">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#f97316] font-semibold mb-3">
              01 // THE OPERATIONAL PROBLEM
            </div>
            <h2 id="overview-heading" className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
              Fragmented Cross-Department Tracking
            </h2>
            <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed">
              {project.overview.problem}
            </p>
          </div>

          <div className="border-t border-zinc-800/60 pt-10">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#f97316] font-semibold mb-3">
              02 // ARCHITECTURAL APPROACH
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
              State Machine with Per-Item Branching
            </h2>
            <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed">
              {project.overview.approach}
            </p>
          </div>

          <div className="border-t border-zinc-800/60 pt-10">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#f97316] font-semibold mb-3">
              03 // DATABASE &amp; RELATIONAL ARCHITECTURE
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
              Transaction Isolation &amp; 9-Role RBAC
            </h2>
            <p className="font-sans text-base sm:text-lg text-zinc-300 leading-relaxed">
              {project.overview.architecture}
            </p>
          </div>
        </section>

        {/* Workflow Stages */}
        <section className="mt-16 sm:mt-24 border-t border-zinc-800/60 pt-10" aria-labelledby="workflow-heading">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#f97316] font-semibold mb-3">
            04 // OPERATIONAL LIFECYCLE
          </div>
          <h2 id="workflow-heading" className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-8">
            Five-Stage State Transition Pipeline
          </h2>

          <div className="space-y-4">
            {project.workflowStages.map((stage) => (
              <div
                key={stage.step}
                className="rounded border border-zinc-800/70 bg-zinc-950/50 p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-900 pb-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold text-[#f97316]">
                      {stage.step}
                    </span>
                    <h3 className="font-sans text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                      {stage.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded">
                    DEPT: {stage.department}
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {stage.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Architectural Decisions */}
        <section className="mt-16 sm:mt-24 border-t border-zinc-800/60 pt-10" aria-labelledby="decisions-heading">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#f97316] font-semibold mb-3">
            05 // ARCHITECTURAL DECISIONS
          </div>
          <h2 id="decisions-heading" className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-8">
            Key Technical Rationale
          </h2>

          <div className="space-y-6">
            {project.decisions.map((dec) => (
              <div
                key={dec.number}
                className="rounded border border-zinc-800/70 bg-zinc-950/40 p-5 sm:p-6"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 mb-2">
                  <span>DECISION // {dec.number}</span>
                </div>
                <h3 className="font-sans text-base sm:text-lg font-bold text-white uppercase tracking-tight mb-2">
                  {dec.title}
                </h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="font-mono text-zinc-400 font-semibold uppercase text-[10px] tracking-wider">Implementation: </span>
                    <span className="text-zinc-200 font-sans">{dec.decision}</span>
                  </div>
                  <div>
                    <span className="font-mono text-zinc-400 font-semibold uppercase text-[10px] tracking-wider">Rationale: </span>
                    <span className="text-zinc-300 font-sans">{dec.rationale}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mt-16 sm:mt-24 border-t border-zinc-800/60 pt-10" aria-labelledby="stack-heading">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#f97316] font-semibold mb-3">
            06 // ENGINEERING STACK
          </div>
          <h2 id="stack-heading" className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
            Core Production Technologies
          </h2>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 font-mono text-xs text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Result & Accountability */}
        <section className="mt-16 sm:mt-24 border-t border-zinc-800/60 pt-10" aria-labelledby="result-heading">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#f97316] font-semibold mb-3">
            07 // SYSTEM OUTCOME
          </div>
          <h2 id="result-heading" className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
            Deterministic Operational Backbone
          </h2>
          <div className="rounded border border-zinc-800/70 bg-zinc-950/60 p-6 sm:p-7">
            <p className="font-sans text-base sm:text-lg text-zinc-200 leading-relaxed">
              {project.result}
            </p>
          </div>
        </section>

        {/* Bottom Navigation */}
        <footer className="mt-16 sm:mt-24 pt-10 border-t border-zinc-800/60 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/#selected-work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-100 hover:text-white transition-colors"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">
              ←
            </span>
            <span className="border-b border-zinc-700 group-hover:border-white pb-0.5 transition-colors font-medium">
              BACK TO PORTFOLIO
            </span>
          </Link>

          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            MUHAR // SELECTED WORKS
          </span>
        </footer>
      </div>
    </article>
  );
}
