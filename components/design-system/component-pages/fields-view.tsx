"use client";

import * as React from "react";
import { ChevronDown, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelectField } from "@/components/ui/multi-select-field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function selectClassName() {
  return cn(
    "box-border flex h-[length:var(--control-height)] w-full rounded-md border-app border-border-subtle bg-field-bg px-3.5 py-2.5 text-base font-normal text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );
}

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
          label="Display name"
          description="Shown on invoices and audit logs."
        >
          <Input placeholder="Learning Commons" />
        </Field>
        <Field id="demo-notes" label="Notes" optional>
          <Textarea placeholder="Optional context…" />
        </Field>
        <Field
          id="demo-scope"
          label="Dataset scope"
          description="Example of a selectable field using the same field shell."
        >
          <div className="relative">
            <select
              id="demo-scope"
              className={cn(
                selectClassName(),
                "cursor-pointer appearance-none pr-10",
                !datasetScope && "text-muted-foreground",
              )}
              value={datasetScope}
              onChange={(e) => setDatasetScope(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="district">District-wide</option>
              <option value="school">School-wide</option>
              <option value="classroom">Classroom pilot</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
          </div>
        </Field>
        <Field
          id="demo-audience-groups"
          label="Audience groups"
          description="Example of a multiselect field with chips embedded inside the control."
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
          label="API key"
          description="Example of an embedded copy action inside the field."
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
              <Copy className="size-3.5" aria-hidden />
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
