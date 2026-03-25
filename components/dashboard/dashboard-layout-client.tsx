"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
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
  const { resolvedTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch: resolvedTheme is undefined on server / first paint; align with defaultTheme (dark).
  const dashboardBitmapUrl =
    mounted && resolvedTheme === "light"
      ? "url('/bitmap-fade.svg')"
      : "url('/bitmap-darkmode.svg')";

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
            "relative flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden",
            isLanding
              ? "bg-white dark:bg-background"
              : "bg-background",
          )}
          style={
            !isLanding
              ? {
                  // Top-right radial + bottom linear + bottom-edge radial (full-width art) so dark/light both ease into --background.
                  backgroundImage: [
                    "radial-gradient(ellipse 125% 90% at 100% 0%, transparent 18%, color-mix(in srgb, var(--background) 45%, transparent) 42%, var(--background) 68%)",
                    "linear-gradient(to top, var(--background) 0%, var(--background) 5%, color-mix(in srgb, var(--background) 85%, transparent) 12%, color-mix(in srgb, var(--background) 52%, transparent) 28%, color-mix(in srgb, var(--background) 20%, transparent) 50%, transparent 92%)",
                    "radial-gradient(ellipse 120% 85% at 50% 100%, var(--background) 0%, color-mix(in srgb, var(--background) 90%, transparent) 18%, color-mix(in srgb, var(--background) 50%, transparent) 40%, transparent 70%)",
                    dashboardBitmapUrl,
                  ].join(", "),
                  backgroundRepeat:
                    "no-repeat, no-repeat, no-repeat, no-repeat",
                  backgroundPosition:
                    "right top, right top, right top, right top",
                  backgroundSize:
                    "100% 100%, 100% 100%, 100% 100%, 100% auto",
                }
              : undefined
          }
        >
          <div
            className={cn(
              "relative box-border flex min-h-0 min-w-0 flex-1 flex-col pb-12 pt-14 md:pt-0",
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
