import { ColorBadge } from "@/components/ui/color-badge";
import type { CommunityProjectType } from "@/lib/community/types";
import { cn } from "@/lib/utils";

function projectTypeLabel(type: CommunityProjectType): string | null {
  if (type === "evaluator") return "Evaluator";
  if (type === "knowledge-graph") return "Knowledge graph";
  return null;
}

export function CommunityUseCaseTags({
  projectType,
  className,
}: {
  /** Product type — Evaluator or Knowledge graph only. */
  projectType: CommunityProjectType;
  className?: string;
}) {
  const label = projectTypeLabel(projectType);
  if (!label) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <ColorBadge variant="gray">{label}</ColorBadge>
    </div>
  );
}
