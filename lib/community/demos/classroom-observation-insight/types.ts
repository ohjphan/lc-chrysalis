export type EngagementLevel = "low" | "moderate" | "high";

export type ObservationFrameworkId = "default" | "danielson" | "custom";

export type ObservationInsightResult = {
  engagement_level: EngagementLevel;
  instructional_practices: string[];
  student_behaviors: string[];
  missed_opportunities: string[];
  recommended_focus: string;
};

export type ObservationInsightInput = {
  notes: string;
  frameworkId: ObservationFrameworkId;
};
