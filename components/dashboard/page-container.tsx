import { cn } from "@/lib/utils";

/**
 * Single source for dashboard main-column width + horizontal padding.
 * Applied in `DashboardLayoutClient` so page body aligns to one column.
 */
export const DASHBOARD_CONTENT_WIDTH_CLASS =
  "mx-auto w-full max-w-6xl px-6 md:px-8";

export function PageContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("py-10", className)}>
      {children}
    </div>
  );
}
