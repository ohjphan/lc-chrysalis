"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { OnboardingWelcomeDialog } from "@/components/dashboard/onboarding-welcome-dialog";
import { DASHBOARD_CONTENT_WIDTH_CLASS } from "@/components/dashboard/page-container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ONBOARDING_WELCOME_KEY = "lc_onboarding_welcome";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [welcomeOpen, setWelcomeOpen] = React.useState(false);
  const [welcomeOrgName, setWelcomeOrgName] = React.useState("");

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname === "/profile-setup") return;
    try {
      const raw = sessionStorage.getItem(ONBOARDING_WELCOME_KEY);
      if (!raw) return;
      sessionStorage.removeItem(ONBOARDING_WELCOME_KEY);
      const data = JSON.parse(raw) as { orgName?: string };
      setWelcomeOrgName(data.orgName ?? "");
      setWelcomeOpen(true);
    } catch {
      sessionStorage.removeItem(ONBOARDING_WELCOME_KEY);
    }
  }, [pathname]);

  const isLanding = pathname === "/";
  const isProfileSetup = pathname === "/profile-setup";
  const isFullBleed = isLanding || isProfileSetup;
  const useFlatMainSurface = isLanding || isProfileSetup;

  return (
    <div className="flex min-h-screen bg-background">
      {!isProfileSetup ? (
        <aside className="sticky top-0 z-20 hidden h-svh max-h-svh w-64 shrink-0 self-start md:block">
          <AppSidebar />
        </aside>
      ) : null}
      {mobileOpen && !isProfileSetup ? (
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
        {!isProfileSetup ? (
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
        ) : null}
        <main
          key={pathname}
          className={cn(
            // `overflow-x-hidden` pairs with `overflow-y: visible` → computed `overflow-y: auto`,
            // which breaks `position: sticky` for descendants. `clip` clips horizontally without
            // that side effect (see CSS Overflow 3).
            "relative flex min-h-0 min-w-0 flex-1 flex-col overflow-x-clip",
            isProfileSetup
              ? "bg-[#faf9f8] dark:bg-background"
              : useFlatMainSurface
                ? "bg-white dark:bg-background"
                : "bg-background",
          )}
        >
          <div
            className={cn(
              "relative box-border flex min-h-0 min-w-0 flex-1 flex-col pb-12 md:pt-0",
              isProfileSetup ? "pt-6" : "pt-14",
              isFullBleed
                ? "w-full max-w-none px-0"
                : DASHBOARD_CONTENT_WIDTH_CLASS,
            )}
          >
            {children}
          </div>
        </main>
      </div>
      {!isProfileSetup ? (
        <OnboardingWelcomeDialog
          open={welcomeOpen}
          onOpenChange={setWelcomeOpen}
          orgName={welcomeOrgName}
        />
      ) : null}
    </div>
  );
}
