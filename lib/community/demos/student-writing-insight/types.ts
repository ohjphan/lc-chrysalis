export type GradeLevel =
  | "elementary"
  | "middle_school"
  | "high_school"
  | "college";

export type WritingInsightRubricId = "argumentative_v1";

export type WritingInsightScores = {
  argument_strength: number;
  evidence_usage: number;
  organization: number;
  tone_voice: number;
};

export type WritingInsightResult = {
  scores: WritingInsightScores;
  strengths: string[];
  areas_for_growth: string[];
  feedback_summary: string;
  confidence: number;
};

export type WritingInsightInput = {
  text: string;
  prompt?: string;
  gradeLevel: GradeLevel;
  rubricId: WritingInsightRubricId;
  scaleMax: 4 | 5;
};
