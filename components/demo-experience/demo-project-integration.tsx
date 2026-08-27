"use client";

import Link from "next/link";
import { Copy, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CommunityDocsLink, CommunityProject } from "@/lib/community/types";
import { toastError, toastSuccess } from "@/lib/toast-variants";

function IntegrationDocsLinks({ links }: { links: readonly CommunityDocsLink[] }) {
  if (links.length === 0) return null;

  return (
    <nav
      className="flex min-w-0 flex-wrap items-center gap-2"
      aria-label="Documentation"
    >
      {links.map((link) => (
        <Button key={link.href} variant="ghost" size="sm" asChild>
          <a href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        </Button>
      ))}
    </nav>
  );
}

export function DemoProjectIntegrationRail({
  project,
}: {
  project: CommunityProject;
}) {
  async function copyStarterConfig() {
    try {
      await navigator.clipboard.writeText(project.remixPayload);
      toastSuccess({ message: "Starter config copied to clipboard." });
    } catch {
      toastError({ message: "Could not copy — select the JSON in Request panel." });
    }
  }

  return (
    <div
      className="flex min-w-0 flex-wrap items-center justify-end gap-2 sm:gap-3"
      aria-label="Integration"
    >
      <IntegrationDocsLinks links={project.docsLinks} />
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" size="sm" asChild>
          <Link href="/api-keys">Get API keys</Link>
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="gap-2"
          onClick={() => void copyStarterConfig()}
        >
          <Copy className="size-4 shrink-0" aria-hidden />
          Copy starter config
        </Button>
      </div>
    </div>
  );
}

export function DemoProjectAboutDetails({
  project,
  description,
}: {
  project: CommunityProject;
  description: string;
}) {
  return (
    <details className="group max-w-3xl">
      <summary className="flex cursor-pointer list-none flex-col items-start gap-1 text-[14px] text-muted-foreground [&::-webkit-details-marker]:hidden">
        {description}
        <span className="inline-flex items-center gap-1">
          <span className="inline-grid [&>*]:col-start-1 [&>*]:row-start-1 font-medium underline-offset-4 hover:text-foreground hover:underline">
            <span className="invisible" aria-hidden>
              View less
            </span>
            <span className="group-open:hidden">View more</span>
            <span className="hidden group-open:block">View less</span>
          </span>
          <ChevronDown
            className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
            aria-hidden
          />
        </span>
      </summary>
      <dl className="mt-4 grid gap-4 text-sm">
        <div>
          <dt className="font-medium text-foreground">Inputs</dt>
          <dd className="mt-1 text-base text-muted-foreground">
            {project.inputsOutputs.inputs}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Outputs</dt>
          <dd className="mt-1 text-base text-muted-foreground">
            {project.inputsOutputs.outputs}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Metrics</dt>
          <dd className="mt-1 text-base text-muted-foreground">
            {project.metrics.join(" · ")}
          </dd>
        </div>
      </dl>
    </details>
  );
}

