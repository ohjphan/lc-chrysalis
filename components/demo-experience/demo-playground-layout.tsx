"use client";

import type { ReactNode } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toastError, toastSuccess } from "@/lib/toast-variants";
import { cn } from "@/lib/utils";

function JsonCodePanel({
  title,
  footnote,
  json,
  emptyLabel,
  className,
}: {
  title: string;
  footnote?: string;
  json: string | null;
  emptyLabel: string;
  className?: string;
}) {
  async function copy() {
    if (!json) return;
    try {
      await navigator.clipboard.writeText(json);
      toastSuccess({ message: `${title} copied.` });
    } catch {
      toastError({ message: "Could not copy." });
    }
  }

  return (
    <section
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-md border-app border-border-subtle bg-charcoal text-white dark:bg-charcoal",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
        <div className="min-w-0">
          <h3 className="text-sm font-medium">{title}</h3>
          {footnote ? (
            <p className="mt-0.5 text-[10px] font-normal leading-snug text-white/55">
              {footnote}
            </p>
          ) : null}
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={!json}
          className="h-7 shrink-0 gap-1.5 border-0 bg-white/10 px-2 text-xs text-white hover:bg-white/20 disabled:opacity-40"
          onClick={() => void copy()}
        >
          <Copy className="size-3.5 shrink-0" aria-hidden />
          Copy
        </Button>
      </div>
      <div className="min-h-[10rem] flex-1 overflow-auto p-3">
        {json ? (
          <pre className="font-mono text-[11px] leading-relaxed text-white/95">
            {json}
          </pre>
        ) : (
          <p className="text-xs text-white/60">{emptyLabel}</p>
        )}
      </div>
    </section>
  );
}

export function DemoPlaygroundLayout({
  inputs,
  output,
  requestJson,
  resultsJson,
  className,
}: {
  inputs: ReactNode;
  output: ReactNode;
  requestJson: string;
  resultsJson: string | null;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-7">
        <div className="space-y-6">{inputs}</div>
        <section className="min-h-0 flex-1">
          <p className="font-nav-eyebrow mb-2 text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
            Output
          </p>
          <div className="rounded-md border-app border-border-subtle bg-sidebar/40 p-4 dark:bg-background/50">
            {output}
          </div>
        </section>
      </div>

      <div className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-[124px] lg:max-h-[calc(100vh-8.75rem)] lg:self-start">
        <JsonCodePanel
          title="Request JSON"
          footnote="Illustrative request shape for integration planning."
          json={requestJson}
          emptyLabel="Request body appears when the form has values."
          className="min-h-[12rem] flex-1 lg:max-h-[45%]"
        />
        <JsonCodePanel
          title="Results JSON"
          json={resultsJson}
          emptyLabel="Run the demo to populate results."
          className="min-h-[12rem] flex-1 lg:max-h-[55%]"
        />
      </div>
    </div>
  );
}
