"use client";

import * as React from "react";
import { DemoPlaygroundLayout } from "@/components/demo-experience/demo-playground-layout";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { SingleSelectField } from "@/components/ui/single-select-field";
import { Textarea } from "@/components/ui/textarea";
import { evaluateWritingMock } from "@/lib/community/demos/student-writing-insight/mock-evaluate";
import type {
  GradeLevel,
  WritingInsightResult,
} from "@/lib/community/demos/student-writing-insight/types";
import { toastError } from "@/lib/toast-variants";

const SAMPLE_TEXT = `Many people believe homework helps students learn. However, research is mixed. For example, some studies show too much homework increases stress without raising scores.

First, time matters: short practice can help, but hours of busywork do not. Second, quality feedback matters more than quantity. In conclusion, schools should prioritize meaningful assignments over volume.`;

const GRADE_LEVEL_OPTIONS = [
  { value: "elementary", label: "Elementary" },
  { value: "middle_school", label: "Middle school" },
  { value: "high_school", label: "High school" },
  { value: "college", label: "College" },
] as const;

const RUBRIC_SCALE_OPTIONS = [
  { value: "4", label: "1–4 (default)" },
  { value: "5", label: "1–5" },
] as const;

const RUBRIC_ROWS = [
  {
    key: "argument_strength" as const,
    title: "Argument strength",
    hint: "Claim clarity, reasoning, counterpoints",
  },
  {
    key: "evidence_usage" as const,
    title: "Evidence use",
    hint: "Examples, data, citations, specificity",
  },
  {
    key: "organization" as const,
    title: "Organization",
    hint: "Structure, transitions, conclusion",
  },
  {
    key: "tone_voice" as const,
    title: "Tone & voice",
    hint: "Academic tone, sentence control",
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function resultPayload(result: WritingInsightResult) {
  return {
    scores: result.scores,
    strengths: result.strengths,
    areas_for_growth: result.areas_for_growth,
    feedback_summary: result.feedback_summary,
    confidence: result.confidence,
  };
}

export function StudentWritingInsightDemo() {
  const [text, setText] = React.useState(SAMPLE_TEXT);
  const [prompt, setPrompt] = React.useState(
    "Should middle schools limit nightly homework? Argue with reasons.",
  );
  const [gradeLevel, setGradeLevel] = React.useState<GradeLevel>("middle_school");
  const [scaleMax, setScaleMax] = React.useState<4 | 5>(4);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<WritingInsightResult | null>(null);
  const resultRef = React.useRef<HTMLDivElement>(null);

  const requestJson = React.useMemo(
    () =>
      JSON.stringify(
        {
          text: text.trim(),
          prompt: prompt.trim() || undefined,
          gradeLevel,
          scaleMax,
          rubricId: "argumentative_v1",
        },
        null,
        2,
      ),
    [text, prompt, gradeLevel, scaleMax],
  );

  const resultsJson = result
    ? JSON.stringify(resultPayload(result), null, 2)
    : null;

  async function runEvaluate() {
    const trimmed = text.trim();
    if (!trimmed) {
      toastError({ message: "Add some student writing to evaluate." });
      return;
    }
    setLoading(true);
    setResult(null);
    await delay(420);
    const out = evaluateWritingMock({
      text: trimmed,
      prompt: prompt.trim() || undefined,
      gradeLevel,
      rubricId: "argumentative_v1",
      scaleMax,
    });
    setResult(out);
    setLoading(false);
    queueMicrotask(() => resultRef.current?.focus());
  }

  function reset() {
    setText(SAMPLE_TEXT);
    setPrompt(
      "Should middle schools limit nightly homework? Argue with reasons.",
    );
    setGradeLevel("middle_school");
    setScaleMax(4);
    setResult(null);
  }

  return (
    <DemoPlaygroundLayout
      requestJson={requestJson}
      resultsJson={resultsJson}
      inputs={
        <>
          <Field
            id="writing-demo-prompt"
            label="Assignment / prompt"
            optional
            className="min-w-0"
          >
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Optional context shown to the student"
              className="min-h-[72px] resize-y"
            />
          </Field>
          <Field id="writing-demo-text" label="Student response" className="min-w-0">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste student writing here…"
              className="min-h-[140px] resize-y"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="writing-demo-grade" label="Grade level" className="min-w-0">
              <SingleSelectField
                value={gradeLevel}
                onValueChange={(v) => setGradeLevel(v as GradeLevel)}
                options={[...GRADE_LEVEL_OPTIONS]}
                placeholder="Select grade level"
              />
            </Field>
            <Field id="writing-demo-scale" label="Rubric scale" className="min-w-0">
              <SingleSelectField
                value={String(scaleMax)}
                onValueChange={(v) => setScaleMax(Number(v) as 4 | 5)}
                options={[...RUBRIC_SCALE_OPTIONS]}
                placeholder="Select scale"
              />
            </Field>
          </div>
          <div className="rounded-md border-app border-border-subtle bg-sidebar/60 p-3 dark:bg-background/60">
            <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
              Rubric · argumentative_v1
            </p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {RUBRIC_ROWS.map((r) => (
                <li key={r.key}>
                  <span className="font-medium text-foreground">{r.title}</span>
                  {" — "}
                  {r.hint}
                </li>
              ))}
            </ul>
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
              to see rubric scores and feedback.
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
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
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
