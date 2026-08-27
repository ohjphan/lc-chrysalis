export type CommunityProjectType = "evaluator" | "knowledge-graph" | "starter";

/** Short label for cards and UI (e.g. Evaluator vs Knowledge Graph). */
export function communityProjectTypeLabel(
  type: CommunityProjectType,
): string {
  switch (type) {
    case "evaluator":
      return "Evaluator";
    case "knowledge-graph":
      return "Knowledge Graph";
    case "starter":
      return "Starter";
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}

/** Illustration for cards and project preview — see `CommunityExampleVisual`. */
export type CommunityVisualKey =
  | "pipeline"
  | "rubric"
  | "graph-hub"
  | "graph-path"
  | "starter-stack";

export type CommunityCategoryTag =
  | "student-assessment"
  | "curriculum-alignment"
  | "personalized-learning"
  | "teacher-insights";

export type CommunityDocsLink = {
  label: string;
  href: string;
};

/** Where “Open in product” deep links for MVP; playground/explorer may ignore query params until wired. */
export type CommunityRemixTarget = "playground" | "explorer" | "none";

export type CommunityProject = {
  slug: string;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  type: CommunityProjectType;
  tags: CommunityCategoryTag[];
  metrics: string[];
  inputsOutputs: { inputs: string; outputs: string };
  featured: boolean;
  trendingScore: number;
  remixCount: number;
  author: { name: string; initials: string };
  /** Evaluator JSON, graph schema notes, or starter bundle — copied on Remix */
  remixPayload: string;
  remixTarget: CommunityRemixTarget;
  docsLinks: CommunityDocsLink[];
  /**
   * When set, About tab shows a Demo section with this copy (e.g. graph illustrations).
   * Interactive evaluators without this field use the default sandbox blurb.
   */
  aboutDemoDescription?: string;
};

export const COMMUNITY_CATEGORY_LABELS: Record<CommunityCategoryTag, string> = {
  "student-assessment": "Student assessment",
  "curriculum-alignment": "Curriculum alignment",
  "personalized-learning": "Personalized learning",
  "teacher-insights": "Teacher insights",
};
