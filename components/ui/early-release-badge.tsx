import { ColorBadge } from "@/components/ui/color-badge";

export function EarlyReleaseBadge({ className }: { className?: string }) {
  return (
    <ColorBadge variant="green" className={className}>
      Early release
    </ColorBadge>
  );
}
