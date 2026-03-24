"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DASHBOARD_CONTENT_WIDTH_CLASS } from "@/components/dashboard/page-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isLanding = pathname === "/";

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 z-20 hidden h-svh max-h-svh w-64 shrink-0 self-start md:block">
        <AppSidebar />
      </aside>
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-64 max-w-[85vw] flex-col bg-sidebar shadow-xl">
            <div className="flex shrink-0 justify-end border-app-b border-border-subtle p-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setMobileOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <AppSidebar onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
      <div className="relative flex min-h-screen min-w-0 flex-1 flex-col">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="fixed left-4 top-[max(1rem,env(safe-area-inset-top,0px))] z-30 md:hidden"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="size-5" />
        </Button>
        <main
          key={pathname}
          className={cn(
            "flex min-h-0 min-w-0 flex-1 flex-col",
            isLanding
              ? "bg-white dark:bg-background"
              : "bg-background",
          )}
        >
          <div
            className={cn(
              "box-border flex min-h-0 min-w-0 flex-1 flex-col pb-12 pt-14 md:pt-0",
              isLanding
                ? "w-full max-w-none px-0"
                : DASHBOARD_CONTENT_WIDTH_CLASS,
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
