"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, User, Users } from "lucide-react";
import { DASHBOARD_CONTENT_WIDTH_CLASS } from "@/components/dashboard/page-container";
import { PageTitle } from "@/components/ui/page-title";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/settings/profile", label: "Profile", icon: User },
  { href: "/settings/organization", label: "Organization", icon: Building2 },
  { href: "/settings/members", label: "Members", icon: Users },
] as const;

export function SettingsLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={cn(DASHBOARD_CONTENT_WIDTH_CLASS, "pb-12 pt-10")}>
      <PageTitle className="mb-8">Settings</PageTitle>
      <div className="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-16">
        <nav
          aria-label="Settings sections"
          className="shrink-0 md:w-52"
        >
          <ul className="flex flex-row gap-1 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={href} className="shrink-0">
                  <Link
                    href={href}
                    className={cn(
                      "group flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-normal transition-colors",
                      active
                        ? "bg-sidebar-nav-intent text-foreground"
                        : "text-nav-link-idle hover:bg-sidebar-nav-intent hover:text-foreground",
                    )}
                  >
                    <span
                      className="relative size-[16px] shrink-0"
                      aria-hidden
                    >
                      <Icon
                        className={cn(
                          "absolute left-1/2 top-1/2 size-[16px] -translate-x-1/2 -translate-y-1/2 stroke-[1.5] transition-[transform,opacity] duration-200 ease-out",
                          active
                            ? "scale-0 opacity-0"
                            : "scale-100 opacity-100 text-nav-link-idle group-hover:text-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "absolute left-1/2 top-1/2 size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1DB470] transition-[transform,opacity] duration-200 ease-out",
                          active
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0",
                        )}
                      />
                    </span>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
