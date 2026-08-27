"use client";

import * as React from "react";
import { DemoPlaygroundLayout } from "@/components/demo-experience/demo-playground-layout";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { SingleSelectField } from "@/components/ui/single-select-field";
import { Textarea } from "@/components/ui/textarea";
import { evaluateShortAnswerMock } from "@/lib/community/demos/formative-short-answer/mock-evaluate";
import type {
  ShortAnswerResult,
  SubjectTrack,
} from "@/lib/community/demos/formative-short-answer/types";
import { toastError } from "@/lib/toast-variants";

const SAMPLE_STEM = `In two to four sentences, explain how adding thermal energy can cause a solid to become a liquid. Use particle motion in your answer.`;

const SAMPLE_RESPONSE = `When you heat a solid, the particles move more. They get more energy and start vibrating faster. Eventually they break out of their fixed pattern so the solid can melt into a liquid.`;

const SUBJECT_OPTIONS = [
  { value: "science", label: "Science" },
  { value: "math", label: "Math" },
  { value: "ela", label: "ELA" },
  { value: "social_studies", label: "Social studies" },
] as const;

const RUBRIC_SCALE_OPTIONS = [
  { value: "4", label: "1–4 (default)" },
  { value: "5", label: "1–5" },
] as const;

const RUBRIC_ROWS = [
  {
    key: "alignment_to_prompt" as const,
    title: "Alignment to prompt",
    hint: "Addresses the exact construct the item measures",
  },
  {
    key: "reasoning_quality" as const,
    title: "Reasoning quality",
    hint: "Because/how chain; partial-credit nuance",
  },
  {
    key: "precision" as const,
    title: "Precision",
    hint: "Discipline-appropriate vocabulary and correctness",
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function resultPayload(result: ShortAnswerResult) {
  return {
    scores: result.scores,
    strengths: result.strengths,
    areas_for_growth: result.areas_for_growth,
    misconception_signals: result.misconception_signals,
    feedback_summary: result.feedback_summary,
    confidence: result.confidence,
  };
}

export function FormativeShortAnswerInsightDemo() {
  const [itemStem, setItemStem] = React.useState(SAMPLE_STEM);
  const [responseText, setResponseText] = React.useState(SAMPLE_RESPONSE);
  const [subjectTrack, setSubjectTrack] =
    React.useState<SubjectTrack>("science");
  const [scaleMax, setScaleMax] = React.useState<4 | 5>(4);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<ShortAnswerResult | null>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);

  const requestJson = React.useMemo(
    () =>
      JSON.stringify(
        {
          itemStem: itemStem.trim(),
          responseText: responseText.trim(),
          subjectTrack,
          scaleMax,
          rubricId: "constructed_response_v1",
        },
        null,
        2,
      ),
    [itemStem, responseText, subjectTrack, scaleMax],
  );

  const resultsJson = result
    ? JSON.stringify(resultPayload(result), null, 2)
    : null;

  async function runEvaluate() {
    const trimmed = responseText.trim();
    if (!trimmed) {
      toastError({ message: "Add a student response to evaluate." });
      return;
    }
    setLoading(true);
    setResult(null);
    await delay(420);
    const out = evaluateShortAnswerMock({
      itemStem: itemStem.trim(),
      responseText: trimmed,
      subjectTrack,
      rubricId: "constructed_response_v1",
      scaleMax,
    });
    setResult(out);
    setLoading(false);
    queueMicrotask(() => resultRef.current?.focus());
  }

  function reset() {
    setItemStem(SAMPLE_STEM);
    setResponseText(SAMPLE_RESPONSE);
    setSubjectTrack("science");
    setScaleMax(4);
    setResult(null);
  }

  return (
    <DemoPlaygroundLayout
      requestJson={requestJson}
      resultsJson={resultsJson}
      inputs={
        <>
          <Field id="short-answer-stem" label="Item stem" className="min-w-0">
            <Textarea
              value={itemStem}
              onChange={(e) => setItemStem(e.target.value)}
              placeholder="Paste the exit-ticket or item-bank prompt…"
              className="min-h-[80px] resize-y"
            />
          </Field>
          <Field
            id="short-answer-response"
            label="Student response"
            className="min-w-0"
          >
            <Textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Paste the student’s short answer…"
              className="min-h-[120px] resize-y"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="short-answer-subject" label="Subject track" className="min-w-0">
              <SingleSelectField
                value={subjectTrack}
                onValueChange={(v) => setSubjectTrack(v as SubjectTrack)}
                options={[...SUBJECT_OPTIONS]}
                placeholder="Subject"
              />
            </Field>
            <Field id="short-answer-scale" label="Rubric scale" className="min-w-0">
              <SingleSelectField
                value={String(scaleMax)}
                onValueChange={(v) => setScaleMax(Number(v) as 4 | 5)}
                options={[...RUBRIC_SCALE_OPTIONS]}
                placeholder="Scale"
              />
            </Field>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="primary"
              className="h-9"
              disabled={loading}
              onClick={() => void runEvaluate()}
            >
              {loading ? "Running sample…" : "Run sample evaluation"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="h-9"
              disabled={loading}
              onClick={reset}
            >
              Reset
            </Button>
          </div>
        </>
      }
      output={
        <div
          ref={resultRef}
          tabIndex={-1}
          aria-live="polite"
          aria-busy={loading}
          className="outline-none"
        >
          {!result && !loading ? (
            <p className="text-sm text-muted-foreground">
              Run{" "}
              <span className="font-medium text-foreground">
                Run sample evaluation
              </span>{" "}
              to see rubric scores and misconception signals.
            </p>
          ) : null}
          {loading ? (
            <p className="text-sm text-muted-foreground">Running evaluator…</p>
          ) : null}
          {result ? (
            <div className="space-y-4">
              <div>
                <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                  Scores (1–{scaleMax})
                </p>
                <ul className="mt-2 grid gap-2">
                  {RUBRIC_ROWS.map((r) => (
                    <li
                      key={r.key}
                      className="flex items-center justify-between gap-2 rounded-[4px] border-app border-border-subtle bg-white px-3 py-2 text-sm dark:bg-field-bg"
                    >
                      <span className="text-muted-foreground">{r.title}</span>
                      <span className="tabular-nums font-medium text-foreground">
                        {result.scores[r.key]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                  Strengths
                </p>
                <ul className="mt-1.5 list-inside list-disc text-sm text-muted-foreground">
                  {result.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                  Areas for growth
                </p>
                <ul className="mt-1.5 list-inside list-disc text-sm text-muted-foreground">
                  {result.areas_for_growth.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              {result.misconception_signals.length > 0 ? (
                <div>
                  <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                    Misconception signals
                  </p>
                  <ul className="mt-1.5 list-inside list-disc text-sm text-muted-foreground">
                    {result.misconception_signals.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <p className="text-sm leading-relaxed text-foreground">
                {result.feedback_summary}
              </p>
              <p className="text-xs text-muted-foreground">
                Confidence{" "}
                <span className="font-medium tabular-nums text-foreground">
                  {result.confidence.toFixed(2)}
                </span>
              </p>
            </div>
          ) : null}
        </div>
      }
    />
  );
}
