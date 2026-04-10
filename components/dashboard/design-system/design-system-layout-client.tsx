"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_CONTENT_WIDTH_CLASS } from "@/components/dashboard/page-container";
import { PageTitle } from "@/components/ui/page-title";
import { DESIGN_SYSTEM_NAV } from "@/lib/design-system-nav";
import { cn } from "@/lib/utils";

export function DesignSystemLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={cn(DASHBOARD_CONTENT_WIDTH_CLASS, "pb-12 pt-10")}>
      <PageTitle className="mb-8">Design System</PageTitle>
      <div className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-16">
        <nav
          aria-label="Design system sections"
          className="sticky top-14 z-10 shrink-0 self-start bg-background/95 pb-1 pt-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:top-0 md:w-52 md:pb-0 md:pt-3"
        >
          <div className="flex flex-col gap-4 md:gap-5">
            {DESIGN_SYSTEM_NAV.map((group) => (
              <div key={group.label} className="space-y-1.5">
                <p className="font-nav-sidebar-eyebrow uppercase text-eyebrow">
                  {group.label}
                </p>
                <ul className="flex flex-row gap-1 overflow-x-auto pb-1 md:flex-col md:gap-0 md:space-y-0.5 md:overflow-visible md:pb-0">
                  {group.items.map(({ href, label }) => {
                    const active =
                      pathname === href || pathname.startsWith(`${href}/`);
                    return (
                      <li key={href} className="shrink-0">
                        <Link
                          href={href}
                          className={cn(
                            "group flex w-full items-center rounded-md py-2 pr-2 text-sm font-normal transition-[padding-left,gap,background-color,color] duration-300 ease-in-out",
                            active
                              ? "gap-1 bg-sidebar-nav-intent pl-2 text-foreground"
                              : "gap-0 pl-0 text-nav-link-idle hover:gap-1 hover:bg-sidebar-nav-intent hover:pl-2 hover:text-foreground",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-4 shrink-0 items-center justify-center overflow-hidden",
                              active ? "w-4" : "w-0 group-hover:w-4",
                            )}
                            aria-hidden
                          >
                            {active ? (
                              <span className="size-[6px] rounded-full bg-[#1DB470]" />
                            ) : (
                              <span className="size-[6px] scale-90 rounded-full bg-border-subtle opacity-0 transition-[opacity,transform] duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 dark:bg-[#5c5c58]" />
                            )}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
