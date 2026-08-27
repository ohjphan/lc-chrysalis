import Link from "next/link";
import { CommunityExampleVisual } from "@/components/community/community-example-visual";
import { ColorBadge } from "@/components/ui/color-badge";
import type { CommunityProject } from "@/lib/community/types";
import { cn } from "@/lib/utils";

const projectHref = (slug: string) => `/demos/projects/${slug}`;

function projectTypeBadgeLabel(type: CommunityProject["type"]): string | null {
  if (type === "evaluator") return "Evaluator";
  if (type === "knowledge-graph") return "Knowledge graph";
  return null;
}

export function ProjectCard({
  project,
  className,
  dense = false,
}: {
  project: CommunityProject;
  className?: string;
  dense?: boolean;
}) {
  const href = projectHref(project.slug);
  const typeLabel = projectTypeBadgeLabel(project.type);

  return (
    <article
      className={cn(
        "group relative flex h-full min-h-0 cursor-pointer flex-col overflow-hidden rounded-[var(--radius-md)] border-app border-border-subtle bg-white text-left transition-colors duration-200 ease-in-out hover:bg-sidebar/40 dark:bg-field-bg dark:hover:bg-field-bg/80",
        dense ? "min-w-[17rem] max-w-[20rem] flex-none" : "min-h-0 w-full",
        className,
      )}
    >
      <Link
        href={href}
        className="absolute inset-0 z-0 rounded-[inherit] focus:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-field-bg"
        aria-label={`Open ${project.title}`}
      />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col pointer-events-none">
        <CommunityExampleVisual
          project={project}
          compact
          className="rounded-none border-0 border-b border-border-subtle"
        />
        <div className="space-y-3 px-4 py-4 md:px-5 md:py-5">
          <p className="line-clamp-3 text-base font-normal leading-relaxed text-muted-foreground">
            {project.shortDescription}
          </p>
          {typeLabel ? (
            <ColorBadge variant="gray" className="w-fit">
              {typeLabel}
            </ColorBadge>
          ) : null}
        </div>
      </div>
    </article>
  );
}
