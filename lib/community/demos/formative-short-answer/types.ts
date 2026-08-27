export type SubjectTrack =
  | "science"
  | "math"
  | "ela"
  | "social_studies";

export type ShortAnswerRubricId = "constructed_response_v1";

export type ShortAnswerScores = {
  alignment_to_prompt: number;
  reasoning_quality: number;
  precision: number;
};

export type ShortAnswerResult = {
  scores: ShortAnswerScores;
  strengths: string[];
  areas_for_growth: string[];
  /** Common confusions for teacher dashboards or adaptive feedback */
  misconception_signals: string[];
  feedback_summary: string;
  confidence: number;
};

export type ShortAnswerInput = {
  itemStem: string;
  responseText: string;
  subjectTrack: SubjectTrack;
  rubricId: ShortAnswerRubricId;
  scaleMax: 4 | 5;
};
