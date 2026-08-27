import type {
  EngagementLevel,
  ObservationInsightInput,
  ObservationInsightResult,
} from "@/lib/community/demos/classroom-observation-insight/types";

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 65599);
  }
  return h >>> 0;
}

function uniquePush(arr: string[], value: string, max: number): void {
  if (arr.includes(value) || arr.length >= max) return;
  arr.push(value);
}

function engagementFromHash(h: number, lower: string): EngagementLevel {
  if (/\b(quiet|disengaged|off[\s-]?task|cell phone|disrupt)\b/i.test(lower)) {
    return "low";
  }
  if (/\b(highly engaged|energized|active discussion|all hands)\b/i.test(lower)) {
    return "high";
  }
  const bucket = (h >>> 0) % 3;
  if (bucket === 0) return "low";
  if (bucket === 1) return "moderate";
  return "high";
}

export function analyzeObservationMock(
  input: ObservationInsightInput,
): ObservationInsightResult {
  const notes = input.notes.trim();
  const combined = notes + "\0" + input.frameworkId;
  const h = hashString(combined);
  const lower = notes.toLowerCase();

  const instructional_practices: string[] = [];
  const student_behaviors: string[] = [];
  const missed_opportunities: string[] = [];

  if (/\b(lecture|lecturing|direct instruction|explained|model)\b/i.test(lower)) {
    uniquePush(instructional_practices, "direct instruction", 4);
  }
  if (/\b(question|questioning|cold call|wait time)\b/i.test(lower)) {
    uniquePush(instructional_practices, "questioning strategies", 4);
  }
  if (/\b(group|small group|pair|turn[\s-]?and[\s-]?talk|collaborat)\b/i.test(
    lower,
  )) {
    uniquePush(instructional_practices, "collaborative structures", 4);
  }
  if (/\b(discuss|discussion|debate|socratic)\b/i.test(lower)) {
    uniquePush(instructional_practices, "facilitated discussion", 4);
  }
  if (/\b(worksheet|packet|independent work|silent)\b/i.test(lower)) {
    uniquePush(instructional_practices, "independent practice", 4);
  }
  if (instructional_practices.length === 0) {
    uniquePush(
      instructional_practices,
      h % 2 === 0 ? "direct instruction" : "whole-group facilitation",
      4,
    );
  }

  if (/\b(passive|listening|heads down|quiet)\b/i.test(lower)) {
    uniquePush(student_behaviors, "passive listening", 4);
  }
  if (/\b(participat|hands|discuss|share|volunteer)\b/i.test(lower)) {
    uniquePush(student_behaviors, "active participation", 4);
  }
  if (/\b(off[\s-]?task|distract|phone|side convers)\b/i.test(lower)) {
    uniquePush(student_behaviors, "off-task behavior", 4);
  }
  if (/\b(annotate|note|writing|solve at board)\b/i.test(lower)) {
    uniquePush(student_behaviors, "productive written work", 4);
  }
  if (student_behaviors.length === 0) {
    const fallback =
      h % 3 === 0
        ? "passive listening"
        : h % 3 === 1
          ? "active participation"
          : "mixed engagement";
    uniquePush(student_behaviors, fallback, 4);
  }

  if (
    instructional_practices.includes("direct instruction") &&
    !/\b(discuss|discussion|peer|group|turn)\b/i.test(lower)
  ) {
    uniquePush(missed_opportunities, "peer discourse", 4);
  }
  if (!/\b(exit|ticket|formative|check[\s-]?for|understand)\b/i.test(lower)) {
    uniquePush(missed_opportunities, "formative check for understanding", 4);
  }
  if (!/\b(differentiat|small group|scaffold|extension)\b/i.test(lower)) {
    uniquePush(missed_opportunities, "differentiated support", 4);
  }
  if (!/\b(reflect|metacogn|self[\s-]?assess)\b/i.test(lower)) {
    uniquePush(missed_opportunities, "student reflection", 4);
  }
  if (missed_opportunities.length === 0) {
    uniquePush(missed_opportunities, "peer discussion", 4);
  }
  while (missed_opportunities.length < 2) {
    const fallbacks = [
      "strategic questioning",
      "student-to-student talk",
    ] as const;
    uniquePush(missed_opportunities, fallbacks[missed_opportunities.length % 2], 4);
  }

  const engagement_level = engagementFromHash(h, lower);

  let recommended_focus =
    missed_opportunities[0] === "peer discourse" ||
    missed_opportunities.includes("peer discussion")
      ? "Increase student discourse and accountable talk"
      : `Strengthen ${missed_opportunities[0].replace(/^\w/, (c) => c.toUpperCase())}`;

  if (input.frameworkId === "danielson") {
    recommended_focus =
      engagement_level === "low"
        ? "Danielson 3c: Engaging students in learning (activate participation)"
        : "Danielson 3b: Using questioning and discussion techniques";
  } else if (input.frameworkId === "custom") {
    recommended_focus = `District playbook: prioritize ${missed_opportunities.slice(0, 2).join(" and ")}`;
  }

  return {
    engagement_level,
    instructional_practices: instructional_practices.slice(0, 4),
    student_behaviors: student_behaviors.slice(0, 4),
    missed_opportunities: missed_opportunities.slice(0, 4),
    recommended_focus,
  };
}
