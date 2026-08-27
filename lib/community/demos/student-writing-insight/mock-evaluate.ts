import type {
  WritingInsightInput,
  WritingInsightResult,
} from "@/lib/community/demos/student-writing-insight/types";

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 65599);
  }
  return h >>> 0;
}

function clampScore(n: number, max: number): number {
  return Math.min(max, Math.max(1, Math.round(n)));
}

function pickScore(
  h: number,
  shift: number,
  scaleMax: number,
  bias: number,
): number {
  const bucket = (h >>> shift) % 256;
  const normalized = bucket / 255;
  const raw = 1 + normalized * (scaleMax - 1) + bias;
  return clampScore(raw, scaleMax);
}

export function evaluateWritingMock(
  input: WritingInsightInput,
): WritingInsightResult {
  const t = input.text.trim();
  const combined =
    t +
    "\0" +
    input.gradeLevel +
    "\0" +
    input.rubricId +
    "\0" +
    String(input.scaleMax) +
    "\0" +
    (input.prompt ?? "");

  const h = hashString(combined);
  const lower = t.toLowerCase();
  const scaleMax = input.scaleMax;

  const gradeBias: Record<WritingInsightInput["gradeLevel"], number> = {
    elementary: -0.35,
    middle_school: 0,
    high_school: 0.15,
    college: 0.25,
  };
  const bias = gradeBias[input.gradeLevel];

  let argument_strength = pickScore(h, 0, scaleMax, bias);
  let evidence_usage = pickScore(h, 8, scaleMax, bias);
  let organization = pickScore(h, 16, scaleMax, bias);
  let tone_voice = pickScore(h, 24, scaleMax, bias);

  if (/\b(however|although|therefore|thus)\b/i.test(t)) {
    argument_strength = clampScore(argument_strength + 1, scaleMax);
  }
  if (/\b(because|since|for example|such as|study|evidence)\b/i.test(t)) {
    evidence_usage = clampScore(evidence_usage + 1, scaleMax);
  }
  if (/\b(first|second|finally|in conclusion|overall)\b/i.test(t)) {
    organization = clampScore(organization + 1, scaleMax);
  }
  if (t.length > 120 && /[.!?]\s+[A-Z]/.test(t)) {
    tone_voice = clampScore(tone_voice + 1, scaleMax);
  }

  const wordCount = t ? t.split(/\s+/).filter(Boolean).length : 0;
  if (wordCount < 35) {
    argument_strength = clampScore(argument_strength - 1, scaleMax);
    evidence_usage = clampScore(evidence_usage - 1, scaleMax);
    organization = clampScore(organization - 1, scaleMax);
  }
  if (wordCount < 15) {
    tone_voice = clampScore(tone_voice - 1, scaleMax);
  }

  const scores = {
    argument_strength,
    evidence_usage,
    organization,
    tone_voice,
  };

  const strengths: string[] = [];
  const areas_for_growth: string[] = [];

  if (scores.argument_strength >= scaleMax - 1) {
    strengths.push("Strong argumentative framing");
  } else if (scores.argument_strength <= 2) {
    areas_for_growth.push("Sharpen the main claim and counterpoints");
  }

  if (scores.evidence_usage >= scaleMax - 1) {
    strengths.push("Uses concrete reasoning or examples");
  } else if (scores.evidence_usage <= 2) {
    areas_for_growth.push("Add more specific evidence or examples");
  }

  if (scores.organization >= scaleMax - 1) {
    strengths.push("Clear structure and progression");
  } else if (scores.organization <= 2) {
    areas_for_growth.push("Tighten paragraph flow and transitions");
  }

  if (scores.tone_voice >= scaleMax - 1) {
    strengths.push("Consistent academic tone");
  } else if (scores.tone_voice <= 2) {
    areas_for_growth.push("Refine tone and sentence variety");
  }

  if (strengths.length === 0) {
    strengths.push("Draft shows effort—room to deepen each rubric row");
  }
  if (areas_for_growth.length === 0) {
    areas_for_growth.push("Fine-tune wording for publication-ready polish");
  }

  const entries = Object.entries(scores) as [keyof typeof scores, number][];
  const weakest = entries.reduce((a, b) => (a[1] <= b[1] ? a : b));
  const weakestLabel =
    {
      argument_strength: "argument strength",
      evidence_usage: "evidence use",
      organization: "organization",
      tone_voice: "tone and voice",
    }[weakest[0]] ?? "overall clarity";

  const scoreVals = Object.values(scores);
  const lo = Math.min(...scoreVals);
  const hi = Math.max(...scoreVals);

  const feedback_summary = `Overall the piece lands roughly ${lo}–${hi} on a 1–${scaleMax} rubric. The strongest leverage is improving ${weakestLabel}; this mock returns stable JSON so you can wire dashboards, teacher views, or student nudges without waiting on a live model.`;

  const confidenceRaw =
    0.72 + ((h >>> 4) % 24) / 100 + Math.min(0.12, wordCount / 2500);
  const confidenceRounded =
    Math.round(Math.min(0.97, Math.max(0.74, confidenceRaw)) * 100) / 100;

  return {
    scores,
    strengths,
    areas_for_growth,
    feedback_summary,
    confidence: confidenceRounded,
  };
}
