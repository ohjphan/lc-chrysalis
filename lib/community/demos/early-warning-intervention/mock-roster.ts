export type EarlyWarningDemoStudent = {
  id: string;
  name: string;
  gradeLabel: string;
  initials: string;
  atRisk: boolean;
  /** Observed signals feeding the risk pattern (empty when not at risk). */
  signals: readonly string[];
  riskTitle: string;
  riskDescription: string;
  interventionTitle: string;
  interventionDescription: string;
  /** Shown in detail when `atRisk` is false instead of risk/intervention blocks. */
  notAtRiskNote?: string;
};

export const EARLY_WARNING_MOCK_ROSTER: readonly EarlyWarningDemoStudent[] = [
  {
    id: "ew-demo-aisha-p",
    name: "Aisha Patel",
    gradeLabel: "Grade 8 · Lincoln Middle School",
    initials: "AP",
    atRisk: true,
    signals: [
      "Attendance: 9 absences in 20 school days (unexcused cluster)",
      "Behavior: two office referrals for classroom disruption in 3 weeks",
      "Course grades: D in ELA, slipping from C− last progress report",
    ],
    riskTitle: "Academic and engagement compound risk",
    riskDescription:
      "Signals align with a pattern where attendance and behavior stress coincide with a measurable academic drop—common for students who disengage before a larger slide.",
    interventionTitle: "Structured check-in + targeted literacy support",
    interventionDescription:
      "MTSS Tier 2: short daily mentor check-in, counselor touchpoint with family, and a six-week structured ELA skills block with progress monitoring.",
  },
  {
    id: "ew-demo-mateo-r",
    name: "Mateo Reyes",
    gradeLabel: "Grade 10 · Washington High School",
    initials: "MR",
    atRisk: true,
    signals: [
      "Gradebook: failed two unit assessments in Algebra II with no retakes submitted",
      "Engagement: LMS shows <40% assignment completion over 14 days",
      "Course grades: F in Algebra II; other courses stable",
    ],
    riskTitle: "Course failure early warning",
    riskDescription:
      "A concentrated drop in one core course with low online engagement often predicts end-of-term failure if the pattern holds another 2–3 weeks.",
    interventionTitle: "Math lab + mandatory tutoring block",
    interventionDescription:
      "Schedule algebra recovery lab three mornings per week, pair with peer tutor, and set automated guardian notice when completion drops below 60% for a week.",
  },
  {
    id: "ew-demo-sophia-k",
    name: "Sophia Kim",
    gradeLabel: "Grade 6 · Roosevelt Elementary",
    initials: "SK",
    atRisk: true,
    signals: [
      "Behavior: pattern of office visits tied to peer conflict (3 in one month)",
      "SEL screener: elevated stress indicator relative to grade-level baseline",
      "Attendance: no chronic absence; grades mostly B range",
    ],
    riskTitle: "Social-emotional distress pattern",
    riskDescription:
      "Behavior incidents plus elevated SEL signals can indicate needing support before academic indicators move—useful for proactive MTSS routing.",
    interventionTitle: "Counselor-led group + restorative check-ins",
    interventionDescription:
      "Small-group counseling twice weekly, restorative conversation after conflicts, and a weekly homeroom pulse survey shared with the student’s team.",
  },
  {
    id: "ew-demo-jordan-l",
    name: "Jordan Lee",
    gradeLabel: "Grade 9 · Washington High School",
    initials: "JL",
    atRisk: false,
    signals: [],
    riskTitle: "",
    riskDescription: "",
    interventionTitle: "",
    interventionDescription: "",
    notAtRiskNote:
      "No converging signals crossed your district’s early-warning thresholds this period. Roster and detail views would still show full context when you connect live graph and SIS data.",
  },
  {
    id: "ew-demo-emma-w",
    name: "Emma Williams",
    gradeLabel: "Grade 7 · Lincoln Middle School",
    initials: "EW",
    atRisk: false,
    signals: [],
    riskTitle: "",
    riskDescription: "",
    interventionTitle: "",
    interventionDescription: "",
    notAtRiskNote:
      "Signals are within typical ranges. Products often keep these students visible for equity monitoring and trend charts at cohort level.",
  },
  {
    id: "ew-demo-devon-t",
    name: "Devon Taylor",
    gradeLabel: "Grade 11 · Washington High School",
    initials: "DT",
    atRisk: false,
    signals: [],
    riskTitle: "",
    riskDescription: "",
    interventionTitle: "",
    interventionDescription: "",
    notAtRiskNote:
      "Recent improvement after a prior intervention—useful for auditing whether mitigated_by relationships in your graph match real-world outcomes.",
  },
] as const;

export function earlyWarningDefaultSelectedId(
  roster: readonly EarlyWarningDemoStudent[],
): string {
  const first = roster.find((s) => s.atRisk);
  return (first ?? roster[0]).id;
}
