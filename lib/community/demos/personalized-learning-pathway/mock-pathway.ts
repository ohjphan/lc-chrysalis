export type PathwayDemoGraphNodeKind = "skill" | "resource";

export type PathwayDemoGraphStep = {
  nodeLabel: string;
  kind: PathwayDemoGraphNodeKind;
};

export type PathwayDemoGraphEdgeKind = "prerequisite_of" | "next_best_step";

export type PathwayDemoLearner = {
  id: string;
  name: string;
  gradeLabel: string;
  initials: string;
  pathStatus: "in_progress" | "current" | "complete";
  /** One line under the name on the roster. */
  rosterHint: string;
  missingPrerequisite: {
    skillLabel: string;
    explanation: string;
  } | null;
  nextSkillLabel: string;
  nextResourceLabel: string;
  nextStepDetail?: string;
  /** Shown when `pathStatus` is `complete` instead of a live next-step pitch. */
  completeNote?: string;
  miniGraph: {
    steps: readonly PathwayDemoGraphStep[];
    edges: readonly PathwayDemoGraphEdgeKind[];
  };
};

export const PATHWAY_MOCK_ROSTER: readonly PathwayDemoLearner[] = [
  {
    id: "path-demo-lena-k",
    name: "Lena Kim",
    gradeLabel: "Grade 8 · Oak Valley Middle",
    initials: "LK",
    pathStatus: "in_progress",
    rosterHint: "Blocked before Linear equations",
    missingPrerequisite: {
      skillLabel: "Integer operations",
      explanation:
        "Diagnostics show inconsistent fluency with signed numbers and order of operations. The pathway graph will not advance to Linear equations until prerequisite_of edges from Integer operations are satisfied in mastery data.",
    },
    nextSkillLabel: "Integer operations",
    nextResourceLabel: "Number line & operations studio (5 lessons)",
    nextStepDetail:
      "Recommendation engine ranks this resource first because it closes the detected graph gap with the shortest expected path to the next skill.",
    miniGraph: {
      steps: [
        { nodeLabel: "Integer operations", kind: "skill" },
        { nodeLabel: "Linear equations", kind: "skill" },
        { nodeLabel: "Slope-intercept walkthrough", kind: "resource" },
      ],
      edges: ["prerequisite_of", "next_best_step"],
    },
  },
  {
    id: "path-demo-noah-m",
    name: "Noah Martinez",
    gradeLabel: "Grade 9 · Central High",
    initials: "NM",
    pathStatus: "current",
    rosterHint: "Next: Quadratic factoring",
    missingPrerequisite: null,
    nextSkillLabel: "Quadratic factoring (a = 1)",
    nextResourceLabel: "Factoring trinomials — guided examples",
    nextStepDetail:
      "All prerequisite_of checks pass; next_best_step points to the resource learners with similar mastery profiles completed most often before assessments.",
    miniGraph: {
      steps: [
        { nodeLabel: "Polynomial operations", kind: "skill" },
        { nodeLabel: "Quadratic factoring (a = 1)", kind: "skill" },
        { nodeLabel: "Guided practice set", kind: "resource" },
      ],
      edges: ["prerequisite_of", "next_best_step"],
    },
  },
  {
    id: "path-demo-sara-v",
    name: "Sara Vance",
    gradeLabel: "Grade 10 · Central High",
    initials: "SV",
    pathStatus: "complete",
    rosterHint: "Unit pathway complete",
    missingPrerequisite: null,
    nextSkillLabel: "Rational expressions",
    nextResourceLabel: "Extension: bridge to Algebra II prep",
    nextStepDetail: undefined,
    completeNote:
      "All required skills in this Algebra I scope show mastered_by links in the graph. Adaptive products often surface optional related_to enrichment or an adjacent unit—here, a voluntary rational-expressions bridge.",
    miniGraph: {
      steps: [
        { nodeLabel: "Linear systems", kind: "skill" },
        { nodeLabel: "Quadratic graphs", kind: "skill" },
        { nodeLabel: "Unit culminating project", kind: "resource" },
      ],
      edges: ["prerequisite_of", "next_best_step"],
    },
  },
  {
    id: "path-demo-james-w",
    name: "James Wright",
    gradeLabel: "Grade 7 · Oak Valley Middle",
    initials: "JW",
    pathStatus: "in_progress",
    rosterHint: "Gap: ratios before functions intro",
    missingPrerequisite: {
      skillLabel: "Representing ratios",
      explanation:
        "The next curated resource for Functions assumes comfort with part-to-part and part-to-whole relationships. Progression logic halts until ratio fluency is recorded on the prerequisite_of chain.",
    },
    nextSkillLabel: "Representing ratios",
    nextResourceLabel: "Ratio tables interactive module",
    nextStepDetail:
      "Dependency resolution returns this prerequisite before any next_best_step toward Functions because the intermediate edge is missing in the learner slice.",
    miniGraph: {
      steps: [
        { nodeLabel: "Representing ratios", kind: "skill" },
        { nodeLabel: "Functions intro", kind: "skill" },
        { nodeLabel: "Mini lessons playlist", kind: "resource" },
      ],
      edges: ["prerequisite_of", "next_best_step"],
    },
  },
  {
    id: "path-demo-mei-c",
    name: "Mei Chen",
    gradeLabel: "Grade 11 · Northfield STEM",
    initials: "MC",
    pathStatus: "current",
    rosterHint: "Next: Exponential models",
    missingPrerequisite: null,
    nextSkillLabel: "Exponential growth and decay",
    nextResourceLabel: "Real-world patterns lab (spreadsheet + prompts)",
    nextStepDetail:
      "With prerequisites satisfied, the graph surfaces a resource that balances new skill exposure and your district’s pacing tags.",
    miniGraph: {
      steps: [
        { nodeLabel: "Linear models", kind: "skill" },
        { nodeLabel: "Exponential growth and decay", kind: "skill" },
        { nodeLabel: "Patterns lab", kind: "resource" },
      ],
      edges: ["prerequisite_of", "next_best_step"],
    },
  },
] as const;

export function pathwayDefaultSelectedId(
  roster: readonly PathwayDemoLearner[],
): string {
  const withGap = roster.find((l) => l.missingPrerequisite != null);
  return (withGap ?? roster[0])?.id ?? "";
}
