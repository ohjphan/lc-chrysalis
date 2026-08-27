import type { ShortAnswerInput, ShortAnswerResult } from "./types";

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

function countScienceDiscourseHits(lower: string): number {
  const patterns = [
    /\b(particle|molec?ule|atom)s?\b/i,
    /\b(vibrat|motion|move faster|kinetic)\b/i,
    /\b(thermal|heat) energy\b/i,
    /\b(melt|melting|liquid|solid)\b/i,
    /\b(break apart|spread out|structure|lattice)\b/i,
  ];
  return patterns.reduce((n, re) => n + (re.test(lower) ? 1 : 0), 0);
}

function stemSuggestsPhaseChange(stem: string): boolean {
  return /particle|thermal|solid|liquid|melt|heat energy|phase/i.test(stem);
}

/**
 * Deterministic mock Evaluator for short constructed responses (exit tickets,
 * item banks). Heuristics reward science discourse when the stem or track fit.
 */
export function evaluateShortAnswerMock(
  input: ShortAnswerInput,
): ShortAnswerResult {
  const response = input.responseText.trim();
  const stem = input.itemStem.trim();
  const combined =
    response + "\0" + stem + "\0" + input.subjectTrack + "\0" + input.rubricId;
  const h = hashString(combined);
  const scaleMax = input.scaleMax;
  const lower = response.toLowerCase();

  const subjectBias: Record<ShortAnswerInput["subjectTrack"], number> = {
    science: 0.12,
    math: 0.08,
    ela: 0,
    social_studies: 0.05,
  };
  const bias = subjectBias[input.subjectTrack];

  let alignment_to_prompt = pickScore(h, 0, scaleMax, bias);
  let reasoning_quality = pickScore(h, 10, scaleMax, bias);
  let precision = pickScore(h, 20, scaleMax, bias);

  const sciHits = countScienceDiscourseHits(lower);
  const scienceContext =
    input.subjectTrack === "science" || stemSuggestsPhaseChange(stem);

  if (scienceContext) {
    if (sciHits >= 3) {
      alignment_to_prompt = clampScore(alignment_to_prompt + 1, scaleMax);
      reasoning_quality = clampScore(reasoning_quality + 1, scaleMax);
    }
    if (sciHits >= 4) {
      precision = clampScore(precision + 1, scaleMax);
    }
  }

  if (/\b(because|so that|this (?:means|shows)|therefore|thus)\b/i.test(lower)) {
    reasoning_quality = clampScore(reasoning_quality + 1, scaleMax);
  }

  const wordCount = response ? response.split(/\s+/).filter(Boolean).length : 0;
  if (wordCount < 8) {
    alignment_to_prompt = clampScore(alignment_to_prompt - 1, scaleMax);
    reasoning_quality = clampScore(reasoning_quality - 1, scaleMax);
  }
  if (wordCount < 4) {
    precision = clampScore(precision - 1, scaleMax);
  }
  if (wordCount > 18) {
    reasoning_quality = clampScore(reasoning_quality + 1, scaleMax);
  }

  const scores = {
    alignment_to_prompt,
    reasoning_quality,
    precision,
  };

  const misconception_signals: string[] = [];
  if (
    scienceContext &&
    /\b(hot|cold|warmer|cooler)\b/i.test(lower) &&
    !/\benergy\b/i.test(lower)
  ) {
    misconception_signals.push(
      "Uses temperature-only language without tying the idea to energy transfer or particle behavior",
    );
  }
  if (
    scienceContext &&
    stemSuggestsPhaseChange(stem) &&
    !/\bparticle|molec|atom|vibrat|energy/i.test(lower)
  ) {
    misconception_signals.push(
      "Stem asks for particle or energy reasoning; answer stays at a surface everyday description",
    );
  }
  if (/\b(it just does|because science|idk|i dont know)\b/i.test(lower)) {
    misconception_signals.push(
      "No causal chain—hard to justify partial credit or feed an adaptive tutor",
    );
  }

  const strengths: string[] = [];
  const areas_for_growth: string[] = [];

  if (scores.alignment_to_prompt >= scaleMax - 1) {
    strengths.push("Addresses the stem’s core idea");
  } else if (scores.alignment_to_prompt <= 2) {
    areas_for_growth.push("Tie claims more directly to what the item asks");
  }

  if (scores.reasoning_quality >= scaleMax - 1) {
    strengths.push("Shows a clear because/how chain in a short span");
  } else if (scores.reasoning_quality <= 2) {
    areas_for_growth.push(
      "Stretch the explanation one step further for partial-credit nuance",
    );
  }

  if (scores.precision >= scaleMax - 1) {
    strengths.push("Uses grade-appropriate vocabulary for the subject");
  } else if (scores.precision <= 2) {
    areas_for_growth.push(
      "Swap informal wording for discipline-specific terms where it fits",
    );
  }

  if (strengths.length === 0) {
    strengths.push(
      "On-track draft—tighten alignment and evidence in the next revision",
    );
  }
  if (areas_for_growth.length === 0) {
    areas_for_growth.push(
      "Polish for export to analytics or parent-safe summaries",
    );
  }

  const entries = Object.entries(scores) as [keyof typeof scores, number][];
  const weakest = entries.reduce((a, b) => (a[1] <= b[1] ? a : b));
  const weakestLabel =
    {
      alignment_to_prompt: "prompt alignment",
      reasoning_quality: "reasoning depth",
      precision: "precision and vocabulary",
    }[weakest[0]] ?? "overall response quality";

  const scoreVals = Object.values(scores);
  const lo = Math.min(...scoreVals);
  const hi = Math.max(...scoreVals);

  const feedback_summary = `Exit-ticket style response lands about ${lo}–${hi} on a 1–${scaleMax} short-answer rubric. Strongest lift is usually ${weakestLabel}. This mock mirrors what assessment and LMS teams ship for teacher moderation, partial credit, and item analytics before a live model is connected.`;

  const confidenceRaw =
    0.71 + ((h >>> 6) % 22) / 100 + Math.min(0.11, wordCount / 220);
  const confidence =
    Math.round(Math.min(0.96, Math.max(0.72, confidenceRaw)) * 100) / 100;

  return {
    scores,
    strengths,
    areas_for_growth,
    misconception_signals,
    feedback_summary,
    confidence,
  };
}
