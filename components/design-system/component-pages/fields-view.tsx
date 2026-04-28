"use client";

import * as React from "react";
import { ChevronDown, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelectField } from "@/components/ui/multi-select-field";
import { SingleSelectField } from "@/components/ui/single-select-field";
import { Textarea } from "@/components/ui/textarea";

const AUDIENCE_GROUP_OPTIONS = [
  { value: "family", label: "Family" },
  { value: "family-in-law", label: "Family in law" },
  { value: "coworkers", label: "Co-workers" },
  { value: "friends", label: "Friends" },
  { value: "basketball-club", label: "Basketball Club" },
] as const;

export function FieldsView() {
  const [copied, setCopied] = React.useState(false);
  const [datasetScope, setDatasetScope] = React.useState("");
  const [audienceGroups, setAudienceGroups] = React.useState<string[]>([
    "family",
    "coworkers",
  ]);

  async function copyFieldValue() {
    try {
      await navigator.clipboard.writeText("lc_demo_sk_live_1234567890");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Fields</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Use <code className="font-mono text-sm text-foreground">Field</code> for
          label, optional description, and validation messaging; pair with{" "}
          <code className="font-mono text-sm text-foreground">Input</code> or{" "}
          <code className="font-mono text-sm text-foreground">Textarea</code>.
        </p>
      </div>
      <div className="grid max-w-md gap-6">
        <Field
          id="demo-name"
          label="Field with helper text"
          description="Use helper text to clarify purpose, expected input, or where the value appears."
        >
          <Input placeholder="Learning Commons" />
        </Field>
        <Field id="demo-notes" label="Long-form text field" optional>
          <Textarea placeholder="Optional context…" />
        </Field>
        <Field
          id="demo-scope"
          label="Select field"
          description="Single-select dropdown field using radio-style selection in the menu."
        >
          <SingleSelectField
            id="demo-scope"
            value={datasetScope}
            onValueChange={setDatasetScope}
            options={[
              { value: "district", label: "District-wide" },
              { value: "school", label: "School-wide" },
              { value: "classroom", label: "Classroom pilot" },
            ]}
            placeholder="Select an option"
          />
        </Field>
        <Field
          id="demo-audience-groups"
          label="Multiselect field"
          description="Multiple selection with chips embedded inside the field."
        >
          <MultiSelectField
            id="demo-audience-groups"
            value={audienceGroups}
            onValueChange={setAudienceGroups}
            options={AUDIENCE_GROUP_OPTIONS.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            placeholder="Select groups"
          />
        </Field>
        <Field
          id="demo-api-key"
          label="Field with embedded action"
          description="Read-only field with an inline action button."
        >
          <div className="flex h-[length:var(--control-height)] w-full items-center gap-2 rounded-md border-app border-border-subtle bg-field-bg pl-3.5 pr-1.5 focus-within:ring-2 focus-within:ring-border-subtle focus-within:ring-offset-2 focus-within:ring-offset-background">
            <input
              id="demo-api-key"
              readOnly
              value="lc_demo_sk_live_1234567890"
              aria-label="Demo API key"
              className="min-w-0 flex-1 border-0 bg-transparent font-mono text-sm font-normal text-foreground outline-none focus:outline-none"
            />
            <Button
              type="button"
              variant="secondary"
              size="embed"
              className="shrink-0"
              onClick={copyFieldValue}
            >
              <Copy className="size-4" aria-hidden />
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </Field>
        <div className="stack-field">
          <Label>Standalone label</Label>
          <Input placeholder="With label only" />
        </div>
      </div>
    </div>
  );
}
