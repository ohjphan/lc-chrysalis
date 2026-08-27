import type { CommunityProject, CommunityVisualKey } from "@/lib/community/types";

/** Per-slug art direction; falls back to type defaults. */
const bySlug: Partial<Record<string, CommunityVisualKey>> = {
  "student-writing-feedback": "rubric",
  "formative-short-answer-insight": "rubric",
  "classroom-observation-coaching": "pipeline",
  "curriculum-skills-assessment-graph": "graph-hub",
  "personalized-learning-pathway-graph": "graph-path",
  "intervention-early-warning-graph": "graph-hub",
};

const byType: Record<CommunityProject["type"], CommunityVisualKey> = {
  evaluator: "pipeline",
  "knowledge-graph": "graph-hub",
  starter: "starter-stack",
};

export function communityVisualFor(
  project: CommunityProject,
): CommunityVisualKey {
  return bySlug[project.slug] ?? byType[project.type];
}
