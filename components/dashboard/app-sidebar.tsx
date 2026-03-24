"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Github, HelpCircle } from "lucide-react";
import { navGroups } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarOrganizationSection } from "@/components/dashboard/sidebar-organization-section";
import { ThemeToggleButton } from "@/components/dashboard/theme-toggle-button";

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="flex h-full min-h-0 flex-col border-app-r border-border-subtle bg-sidebar">
      <div className="flex h-14 items-center pl-5 pr-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex min-w-0 flex-1 items-center gap-2"
        >
          <span className="min-w-0 flex-1 dark:hidden">
            <img
              src="/lc-logo.svg"
              alt="Learning Commons"
              width={179}
              height={18}
              className="h-[calc(15.4px*1.12)] w-auto max-w-full object-left object-contain"
            />
          </span>
          <span className="hidden min-w-0 flex-1 dark:block">
            <img
              src="/lc-logo-white.svg"
              alt="Learning Commons"
              width={179}
              height={18}
              className="h-[calc(15.4px*1.12)] w-auto max-w-full object-left object-contain"
            />
          </span>
        </Link>
      </div>

      <nav className="min-h-0 flex-1 space-y-8 overflow-y-auto overflow-x-hidden p-3">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-1.5 px-2 font-nav-sidebar-eyebrow uppercase text-muted-foreground">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-md px-2 py-2 text-sm font-normal transition-colors",
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
                              : "scale-100 opacity-100 text-muted-foreground group-hover:text-foreground",
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
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-app-t border-border-subtle">
        <div className="flex items-center justify-between gap-2 px-3 py-3">
          <div className="flex h-9 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-9 hover:bg-sidebar-nav-intent"
              asChild
            >
              <Link href="/support" aria-label="Documentation">
                <FileText className="size-[16px] text-muted-foreground" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 hover:bg-sidebar-nav-intent"
              asChild
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github className="size-[16px] text-muted-foreground" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 hover:bg-sidebar-nav-intent"
              asChild
            >
              <Link href="/support" aria-label="Support" onClick={onNavigate}>
                <HelpCircle className="size-[16px] text-muted-foreground" />
              </Link>
            </Button>
          </div>
          <div className="flex h-9 shrink-0 items-center justify-end">
            <ThemeToggleButton className="focus-visible:ring-offset-sidebar" />
          </div>
        </div>
        <div
          className="shrink-0 border-app-t border-border-subtle"
          aria-hidden
        />
        <div className="px-3 pb-3 pt-3">
          <SidebarOrganizationSection onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
