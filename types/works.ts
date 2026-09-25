export interface ProjectImages {
  cover: string;
  overview: string;
  architecture: string;
}

export interface ProjectVideo {
  type: "youtube" | "local";
  src: string;
}

export interface ProjectMedia {
  images: ProjectImages;
  video: ProjectVideo;
}

export interface ProjectOverview {
  problem: string;
  approach: string;
  architecture: string;
  workflow: string;
}

export interface WorkflowStage {
  step: string;
  name: string;
  department: string;
  detail: string;
}

export interface ProjectDecision {
  number: string;
  title: string;
  decision: string;
  rationale: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  featured: boolean;
  headline: string;
  description: string;
  media?: ProjectMedia;
  overview: ProjectOverview;
  workflowStages: WorkflowStage[];
  decisions: ProjectDecision[];
  highlights: string[];
  stack: string[];
  result: string;
}

export interface WorksSection {
  chapter: string;
  headline: string;
  description: string;
  items: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}

export interface WorksData {
  works: WorksSection;
  projects: Project[];
}
