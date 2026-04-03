"use client";

import * as React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function FieldsView() {
  const [copied, setCopied] = React.useState(false);

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
          id="demo-api-key"
          label="API key"
          description="Example of an embedded copy action inside the field."
        >
          <div className="flex h-10 w-full items-center gap-2 rounded-md border-app border-border-subtle bg-field-bg pl-3 pr-1 focus-within:ring-2 focus-within:ring-border-subtle focus-within:ring-offset-2 focus-within:ring-offset-background">
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
