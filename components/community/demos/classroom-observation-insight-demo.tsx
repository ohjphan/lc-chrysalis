"use client";

import * as React from "react";
import { DemoPlaygroundLayout } from "@/components/demo-experience/demo-playground-layout";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { SingleSelectField } from "@/components/ui/single-select-field";
import { Textarea } from "@/components/ui/textarea";
import { analyzeObservationMock } from "@/lib/community/demos/classroom-observation-insight/mock-analyze";
import type {
  ObservationFrameworkId,
  ObservationInsightResult,
} from "@/lib/community/demos/classroom-observation-insight/types";
import { toastError } from "@/lib/toast-variants";

const SAMPLE_NOTES = `Period 3 ELA, 28 students. Teacher opened with a 12-minute lecture on thesis statements, then released students to a worksheet.

Most students worked quietly; a few talked at side tables. I saw one student on a phone until redirected.

No turn-and-talk or peer review during the segment I observed. Exit ticket mentioned on slide but not collected before the bell.`;

const FRAMEWORK_OPTIONS = [
  { value: "default", label: "Default (instructional-coaching-v1)" },
  { value: "danielson", label: "Danielson-aligned" },
  { value: "custom", label: "Custom district playbook" },
] as const;

const ENGAGEMENT_LABELS: Record<
  ObservationInsightResult["engagement_level"],
  string
> = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
};

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function resultPayload(result: ObservationInsightResult) {
  return {
    engagement_level: result.engagement_level,
    instructional_practices: result.instructional_practices,
    student_behaviors: result.student_behaviors,
    missed_opportunities: result.missed_opportunities,
    recommended_focus: result.recommended_focus,
  };
}

export function ClassroomObservationInsightDemo() {
  const [notes, setNotes] = React.useState(SAMPLE_NOTES);
  const [frameworkId, setFrameworkId] =
    React.useState<ObservationFrameworkId>("default");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<ObservationInsightResult | null>(
    null,
  );
  const resultRef = React.useRef<HTMLDivElement>(null);

  const requestJson = React.useMemo(
    () =>
      JSON.stringify(
        {
          notes: notes.trim(),
          frameworkId,
        },
        null,
        2,
      ),
    [notes, frameworkId],
  );

  const resultsJson = result
    ? JSON.stringify(resultPayload(result), null, 2)
    : null;

  async function runAnalyze() {
    const trimmed = notes.trim();
    if (!trimmed) {
      toastError({ message: "Add observation notes to analyze." });
      return;
    }
    setLoading(true);
    setResult(null);
    await delay(420);
    const out = analyzeObservationMock({ notes: trimmed, frameworkId });
    setResult(out);
    setLoading(false);
    queueMicrotask(() => resultRef.current?.focus());
  }

  function reset() {
    setNotes(SAMPLE_NOTES);
    setFrameworkId("default");
    setResult(null);
  }

  return (
    <DemoPlaygroundLayout
      requestJson={requestJson}
      resultsJson={resultsJson}
      inputs={
        <>
          <Field id="observation-demo-notes" label="Observation notes" className="min-w-0">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste unstructured observation notes…"
              className="min-h-[160px] resize-y"
            />
          </Field>
          <div className="space-y-1.5">
            <Field
              id="observation-demo-framework"
              label="Framework alignment"
              className="min-w-0"
            >
              <SingleSelectField
                value={frameworkId}
                onValueChange={(v) =>
                  setFrameworkId(v as ObservationFrameworkId)
                }
                options={[...FRAMEWORK_OPTIONS]}
                placeholder="Select framework"
              />
            </Field>
            <p className="text-xs text-muted-foreground">
              Framework selection updates request config and coaching focus in
              this sample; live API alignment comes with your integration.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="primary"
              className="h-9"
              disabled={loading}
              onClick={() => void runAnalyze()}
            >
              {loading ? "Running sample…" : "Run sample analysis"}
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
                Run sample analysis
              </span>{" "}
              to see engagement, practices, behaviors, and coaching focus.
            </p>
          ) : null}
          {loading ? (
            <p className="text-sm text-muted-foreground">Running evaluator…</p>
          ) : null}
          {result ? (
            <div className="space-y-4">
              <div>
                <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                  Engagement level
                </p>
                <p className="mt-1.5 text-sm font-medium text-foreground">
                  {ENGAGEMENT_LABELS[result.engagement_level]}
                </p>
              </div>
              <div>
                <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                  Instructional practices
                </p>
                <ul className="mt-1.5 list-inside list-disc text-sm text-muted-foreground">
                  {result.instructional_practices.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                  Student behaviors
                </p>
                <ul className="mt-1.5 list-inside list-disc text-sm text-muted-foreground">
                  {result.student_behaviors.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                  Missed opportunities
                </p>
                <ul className="mt-1.5 list-inside list-disc text-sm text-muted-foreground">
                  {result.missed_opportunities.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm font-medium leading-relaxed text-foreground">
                Recommended focus: {result.recommended_focus}
              </p>
            </div>
          ) : null}
        </div>
      }
    />
  );
}
