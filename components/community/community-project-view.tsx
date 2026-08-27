"use client";

import Link from "next/link";
import { useDemoPageScrolled } from "@/components/demo-experience/use-demo-page-scrolled";
import { cn } from "@/lib/utils";
import { CommunityExampleVisual } from "@/components/community/community-example-visual";
import { ClassroomObservationInsightDemo } from "@/components/community/demos/classroom-observation-insight-demo";
import { CurriculumIntelligenceGraphDemo } from "@/components/community/demos/curriculum-intelligence-graph-demo";
import { EarlyWarningInterventionGraphDemo } from "@/components/community/demos/early-warning-intervention-graph-demo";
import { PersonalizedLearningPathwayGraphDemo } from "@/components/community/demos/personalized-learning-pathway-graph-demo";
import { FormativeShortAnswerInsightDemo } from "@/components/community/demos/formative-short-answer-insight-demo";
import { StudentWritingInsightDemo } from "@/components/community/demos/student-writing-insight-demo";
import { PageContainer } from "@/components/dashboard/page-container";
import { DemoPlaygroundLayout } from "@/components/demo-experience/demo-playground-layout";
import {
  DemoProjectAboutDetails,
  DemoProjectIntegrationRail,
} from "@/components/demo-experience/demo-project-integration";
import { TryOtherDemosCarousel } from "@/components/demo-experience/try-other-demos-carousel";
import type { CommunityProject } from "@/lib/community/types";

const WRITING_INSIGHT_SLUG = "student-writing-feedback";
const OBSERVATION_INSIGHT_SLUG = "classroom-observation-coaching";
const FORMATIVE_SHORT_ANSWER_SLUG = "formative-short-answer-insight";
const EARLY_WARNING_GRAPH_SLUG = "intervention-early-warning-graph";
const PERSONALIZED_PATHWAY_GRAPH_SLUG = "personalized-learning-pathway-graph";
const CURRICULUM_INTELLIGENCE_GRAPH_SLUG = "curriculum-skills-assessment-graph";

function DemoContent({ project }: { project: CommunityProject }) {
  const integrationJson = project.remixPayload;

  switch (project.slug) {
    case WRITING_INSIGHT_SLUG:
      return <StudentWritingInsightDemo />;
    case OBSERVATION_INSIGHT_SLUG:
      return <ClassroomObservationInsightDemo />;
    case FORMATIVE_SHORT_ANSWER_SLUG:
      return <FormativeShortAnswerInsightDemo />;
    case EARLY_WARNING_GRAPH_SLUG:
      return (
        <EarlyWarningInterventionGraphDemo integrationJson={integrationJson} />
      );
    case PERSONALIZED_PATHWAY_GRAPH_SLUG:
      return (
        <PersonalizedLearningPathwayGraphDemo integrationJson={integrationJson} />
      );
    case CURRICULUM_INTELLIGENCE_GRAPH_SLUG:
      return (
        <CurriculumIntelligenceGraphDemo integrationJson={integrationJson} />
      );
    default:
      return (
        <DemoPlaygroundLayout
          requestJson={integrationJson}
          resultsJson={null}
          inputs={
            <p className="text-sm text-muted-foreground">
              Configure inputs in your integration environment.
            </p>
          }
          output={
            <CommunityExampleVisual project={project} className="w-full" />
          }
        />
      );
  }
}

function DemoProjectStickyToolbar({
  project,
  className,
}: {
  project: CommunityProject;
  className?: string;
}) {
  const isScrolled = useDemoPageScrolled();

  return (
    <div
      className={cn(
        "sticky top-14 z-30 -mx-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b px-8 pt-[9px] pb-2 transition-[border-color,background-color,backdrop-filter] duration-200 ease-out md:top-16 md:-mx-10 md:px-10",
        isScrolled
          ? "border-border-subtle bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
          : "border-transparent bg-transparent backdrop-blur-none supports-[backdrop-filter]:bg-transparent",
        className,
      )}
    >
      <Link
        href="/demos"
        className="shrink-0 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        ← Demos
      </Link>
      <DemoProjectIntegrationRail project={project} />
    </div>
  );
}

export function CommunityProjectView({ project }: { project: CommunityProject }) {
  return (
    <>
      <PageContainer className="pb-0">
        <div className="space-y-8">
          <DemoProjectStickyToolbar project={project} />
          <header className="min-w-0 space-y-3 border-b border-border-subtle pb-6">
            <h1 className="mb-3 font-page-title text-heading dark:text-foreground">
              {project.title}
            </h1>
            <DemoProjectAboutDetails
              project={project}
              description={project.shortDescription}
            />
          </header>

          <DemoContent project={project} />
        </div>
      </PageContainer>

      <PageContainer className="pt-0">
        <TryOtherDemosCarousel currentSlug={project.slug} />
      </PageContainer>
    </>
  );
}
