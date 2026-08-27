"use client";

import * as React from "react";
import { PageContainer } from "@/components/dashboard/page-container";
import { ProjectCard } from "@/components/community/project-card";
import { SpotlightBackground } from "@/components/landing/spotlight-background";
import { PageTitle } from "@/components/ui/page-title";
import type { CommunityProject } from "@/lib/community/types";
import { cn } from "@/lib/utils";

function Section({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  const hasHeading = Boolean(title ?? description);
  return (
    <section id={id} className="scroll-mt-8 space-y-4">
      {hasHeading ? (
        <div className="flex flex-col gap-1">
          {title ? (
            <h2 className="font-page-h3 text-heading dark:text-foreground">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

function IntegrationSteps() {
  const steps = [
    {
      step: "1",
      title: "Run a sample demo",
      detail: "Try inputs and outputs in the browser—no API key required.",
    },
    {
      step: "2",
      title: "Copy starter config",
      detail: "Use the integration rail on each project page for request JSON.",
    },
    {
      step: "3",
      title: "Open docs and API keys",
      detail: "Wire the same shapes in your app with Learning Commons credentials.",
    },
  ] as const;

  return (
    <ol className="grid overflow-hidden rounded-md border-app border-border-subtle bg-sidebar/50 sm:grid-cols-3 dark:bg-background/50">
      {steps.map((s, index) => (
        <li
          key={s.step}
          className={cn(
            "px-6 py-5",
            index > 0 &&
              "border-t border-border-subtle sm:border-t-0 sm:border-l",
          )}
        >
          <span
            className="flex size-8 items-center justify-center rounded-full bg-accent-green text-sm font-semibold text-white"
            aria-hidden
          >
            {s.step}
          </span>
          <p className="mt-3 text-base font-medium text-foreground">{s.title}</p>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {s.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

function ProjectGrid({ projects }: { projects: CommunityProject[] }) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No demos in this section yet.</p>
    );
  }
  return (
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}

export function CommunityLandingView({
  featured,
}: {
  featured: CommunityProject[];
}) {
  const evaluators = React.useMemo(
    () => featured.filter((p) => p.type === "evaluator"),
    [featured],
  );
  const knowledgeGraph = React.useMemo(
    () => featured.filter((p) => p.type === "knowledge-graph"),
    [featured],
  );

  return (
    <PageContainer className="pt-0">
      <div className="relative left-1/2 z-0 mb-12 w-[100vw] max-w-[100vw] -translate-x-1/2 md:mb-16">
        <SpotlightBackground
          className="w-full"
          veilClassName="bg-white dark:bg-background"
        >
          <div className="flex w-full flex-col items-center px-6 pb-14 pt-8 md:px-10 md:pb-16 md:pt-10">
            <div className="flex w-full max-w-2xl flex-col items-center text-center">
              <img
                src="/lc-logomark.svg"
                alt=""
                width={41}
                height={27}
                className="mb-5 h-[27px] w-[41px] shrink-0 max-w-none md:mb-6"
                aria-hidden
              />
              <PageTitle variant="heroMono">
                Smarter education products start here
              </PageTitle>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:mt-7 md:text-lg">
                Score and coach with{" "}
                <span className="font-medium text-foreground">Evaluators</span>.
                Traverse curriculum and learner graphs with the{" "}
                <span className="font-medium text-foreground">Knowledge Graph</span>.
                Run sample demos, copy starter configs, then integrate with docs and API keys.
              </p>
            </div>
          </div>
        </SpotlightBackground>
      </div>

      <div className="mb-10 space-y-4">
        <h2 className="mb-6 font-page-h3 text-heading dark:text-foreground">
          Get started
        </h2>
        <IntegrationSteps />
      </div>

      <section id="showcases" className="scroll-mt-8 space-y-12">
        <Section
          title="Evaluators"
          description="Rubric scoring, formative items, and coaching signals from unstructured inputs."
        >
          <ProjectGrid projects={evaluators} />
        </Section>
        <Section
          title="Knowledge Graph"
          description="Graph traversals over curriculum, pathways, and early-warning signals."
        >
          <ProjectGrid projects={knowledgeGraph} />
        </Section>
      </section>
    </PageContainer>
  );
}
