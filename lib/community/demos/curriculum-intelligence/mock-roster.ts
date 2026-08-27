export type CurriculumIntelInsightLevel = "gaps" | "on_track" | "strong";

/** Lesson → Skill ← Assessment; caption describes Student–Skill mastered_by. */
export type CurriculumIntelMiniGraph = {
  strip: readonly [
    { kind: "lesson"; label: string },
    { kind: "skill"; label: string },
    { kind: "assessment"; label: string },
  ];
  masteryCaption: string;
};

export type CurriculumIntelDemoStudent = {
  id: string;
  name: string;
  gradeLabel: string;
  initials: string;
  insightLevel: CurriculumIntelInsightLevel;
  rosterHint: string;
  /** Evidence-style lines; empty when not struggling in this mock. */
  strugglingSkills: readonly string[];
  targetLessons: readonly { title: string; skillFocus: string }[];
  assessmentBlurb?: string;
  miniGraph: CurriculumIntelMiniGraph;
  /** Shown when `strugglingSkills` is empty instead of gap-focused lesson copy. */
  noGapNote?: string;
};

export const CURRICULUM_INTEL_MOCK_ROSTER: readonly CurriculumIntelDemoStudent[] =
  [
    {
      id: "ci-demo-river-t",
      name: "River Thompson",
      gradeLabel: "Grade 7 · Meridian Middle",
      initials: "RT",
      insightLevel: "gaps",
      rosterHint: "Multiple skill gaps in number sense",
      strugglingSkills: [
        "Rational number operations: 62% on last three warm-ups vs class median 81%",
        "Proportional reasoning: two multi-step items missed on Unit 4 exit ticket",
      ],
      targetLessons: [
        {
          title: "Number line strategies for signed numbers",
          skillFocus: "Rational number operations",
        },
        {
          title: "Tape diagrams for ratio problems",
          skillFocus: "Proportional reasoning",
        },
      ],
      assessmentBlurb:
        "Short formative “Unit 4 checkpoint” assesses both skills via assesses edges; item-level results flow back to the same Skill nodes.",
      miniGraph: {
        strip: [
          { kind: "lesson", label: "Tape diagrams lab" },
          { kind: "skill", label: "Proportional reasoning" },
          { kind: "assessment", label: "Unit 4 checkpoint" },
        ],
        masteryCaption:
          "Partial mastered_by signals on the skill node explain why traversal surfaces struggle before recommending lessons.",
      },
    },
    {
      id: "ci-demo-jordan-k",
      name: "Jordan Kim",
      gradeLabel: "Grade 9 · Central High",
      initials: "JK",
      insightLevel: "gaps",
      rosterHint: "Single focus: linear models",
      strugglingSkills: [
        "Interpreting slope in context: misreads units on two recent items",
      ],
      targetLessons: [
        {
          title: "Slope as rate of change (cafeteria pricing context)",
          skillFocus: "Interpreting slope in context",
        },
      ],
      assessmentBlurb:
        "Weekly exit card assesses this skill; the graph links the same Assessment entity to items tagged under the skill.",
      miniGraph: {
        strip: [
          { kind: "lesson", label: "Slope from two points" },
          { kind: "skill", label: "Interpreting slope in context" },
          { kind: "assessment", label: "Friday exit card" },
        ],
        masteryCaption:
          "A weak mastered_by strength on this skill keeps the learner in the “struggling” cohort for insight jobs.",
      },
    },
    {
      id: "ci-demo-alex-p",
      name: "Alex Petrova",
      gradeLabel: "Grade 8 · Meridian Middle",
      initials: "AP",
      insightLevel: "on_track",
      rosterHint: "Skills aligned with pacing",
      strugglingSkills: [],
      targetLessons: [
        {
          title: "Functions from tables and graphs",
          skillFocus: "Evaluating functions at a point",
        },
      ],
      noGapNote:
        "No acute gaps in this mock window—queries return enrichment lessons aligned to the next teaches edge from the pacing graph.",
      miniGraph: {
        strip: [
          { kind: "lesson", label: "Function machine intro" },
          { kind: "skill", label: "Evaluating functions at a point" },
          { kind: "assessment", label: "Short quiz 6a" },
        ],
        masteryCaption:
          "Positive mastered_by evidence on this skill lets the engine prioritize forward content instead of remediation.",
      },
    },
    {
      id: "ci-demo-sam-l",
      name: "Sam Okoro",
      gradeLabel: "Grade 11 · Northfield STEM",
      initials: "SO",
      insightLevel: "strong",
      rosterHint: "Strong across sampled skills",
      strugglingSkills: [],
      targetLessons: [],
      noGapNote:
        "Aggregate performance is high in this slice; curriculum tools might shift to related_to clusters or dual-enrollment pathways instead of deficit lessons.",
      assessmentBlurb:
        "Recent summative items still map through assesses for auditability even when no remediation fires.",
      miniGraph: {
        strip: [
          { kind: "lesson", label: "Exponential regression intro" },
          { kind: "skill", label: "Exponential growth and decay" },
          { kind: "assessment", label: "Unit summative" },
        ],
        masteryCaption:
          "Stable mastered_by edges make “struggling skills” traversals empty for this learner in the current scope.",
      },
    },
    {
      id: "ci-demo-morgan-w",
      name: "Morgan Wu",
      gradeLabel: "Grade 6 · Oak Valley Elementary",
      initials: "MW",
      insightLevel: "gaps",
      rosterHint: "Reading for evidence gap",
      strugglingSkills: [
        "Citing textual evidence: short responses below rubric threshold on two passages",
      ],
      targetLessons: [
        {
          title: "ACE paragraph frames with nonfiction",
          skillFocus: "Citing textual evidence",
        },
        {
          title: "Highlight-to-claim workflow",
          skillFocus: "Citing textual evidence",
        },
      ],
      assessmentBlurb:
        "District interim clusters items under one Skill node; assesses relationships make “which skills hurt the score?” deterministic.",
      miniGraph: {
        strip: [
          { kind: "lesson", label: "ACE frame workshop" },
          { kind: "skill", label: "Citing textual evidence" },
          { kind: "assessment", label: "ELA interim (Q2)" },
        ],
        masteryCaption:
          "The graph ties interim items to this skill; weakened mastery triggers lesson matches.",
      },
    },
    {
      id: "ci-demo-casey-d",
      name: "Casey Diaz",
      gradeLabel: "Grade 10 · Central High",
      initials: "CD",
      insightLevel: "on_track",
      rosterHint: "Geometry unit — stable",
      strugglingSkills: [],
      targetLessons: [
        {
          title: "Proofs with parallel lines",
          skillFocus: "Two-column proofs",
        },
      ],
      noGapNote:
        "Skills in this unit track expectations; the sample still shows how lessons and assessments anchor to shared Skill nodes.",
      miniGraph: {
        strip: [
          { kind: "lesson", label: "Parallel line proofs" },
          { kind: "skill", label: "Two-column proofs" },
          { kind: "assessment", label: "Proof quiz" },
        ],
        masteryCaption:
          "mastered_by confidence meets the bar set by your product policy—no remediation lesson ranked first.",
      },
    },
  ] as const;

export function curriculumIntelDefaultSelectedId(
  roster: readonly CurriculumIntelDemoStudent[],
): string {
  const withGaps = roster.find((s) => s.strugglingSkills.length > 0);
  return (withGaps ?? roster[0])?.id ?? "";
}
