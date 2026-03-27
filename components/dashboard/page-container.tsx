import { cn } from "@/lib/utils";

/**
 * Single source for dashboard main-column width + horizontal padding
 * (max 1200px, `px-8` / `md:px-10`). Applied in `DashboardLayoutClient` for
 * all routes except `/`; also reuse for settings layout alignment.
 */
export const DASHBOARD_CONTENT_WIDTH_CLASS =
  "mx-auto w-full max-w-[1200px] px-8 md:px-10";

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
