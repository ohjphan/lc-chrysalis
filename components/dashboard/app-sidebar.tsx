"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Github, HelpCircle } from "lucide-react";
import { navGroups } from "@/lib/nav-config";
import { SUPPORT_DOCS_URL } from "@/lib/support-links";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarOrganizationSection } from "@/components/dashboard/sidebar-organization-section";

export function AppSidebar({
  onNavigate,
  onOpenSupport,
}: {
  onNavigate?: () => void;
  onOpenSupport?: () => void;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function navItemClass(active: boolean) {
    return cn(
      "group flex w-full items-center rounded-md py-2 pr-2 text-sm font-normal transition-[padding-left,gap,background-color,color] duration-300 ease-in-out",
      active
        ? "gap-1 bg-sidebar-nav-intent pl-2 text-foreground"
        : "gap-0 pl-0 text-nav-link-idle hover:gap-1 hover:bg-sidebar-nav-intent hover:pl-2 hover:text-foreground",
    );
  }

  function renderNavLink(item: { href: string; label: string }) {
    const active = isActive(item.href);

    return (
      <li key={item.href}>
        <Link
          href={item.href}
          onClick={onNavigate}
          className={navItemClass(active)}
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
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
        </Link>
      </li>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col border-app-r border-border-subtle bg-sidebar">
      <div className="flex h-16 items-start pl-5 pr-3 pt-6">
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
              className="h-[18px] w-auto max-w-full object-left object-contain"
            />
          </span>
          <span className="hidden min-w-0 flex-1 dark:block">
            <img
              src="/lc-logo-white.svg"
              alt="Learning Commons"
              width={179}
              height={18}
              className="h-[18px] w-auto max-w-full object-left object-contain"
            />
          </span>
        </Link>
      </div>

      <nav className="min-h-0 flex-1 space-y-8 overflow-y-auto overflow-x-hidden py-3 px-5">
        {navGroups.map((group, index) => (
          <div
            key={group.label ?? group.items[0]?.href ?? `nav-${index}`}
          >
            {group.label ? (
              <p className="mb-1.5 pl-0 pr-2 font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.04em] text-eyebrow dark:text-nav-link-idle">
                {group.label}
              </p>
            ) : null}
            <ul className="space-y-0.5">
              {group.items.map(renderNavLink)}
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
              <a
                href={SUPPORT_DOCS_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Documentation"
              >
                <FileText className="size-[16px] text-muted-foreground" />
              </a>
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
              onClick={() => {
                onNavigate?.();
                onOpenSupport?.();
              }}
              aria-label="Support"
            >
              <HelpCircle className="size-[16px] text-muted-foreground" />
            </Button>
          </div>
        </div>
        <div
          className="shrink-0 border-app-t border-border-subtle"
          aria-hidden
        />
        <div className="px-3 pb-3 pt-3">
          <SidebarOrganizationSection
            onNavigate={onNavigate}
            onOpenSupport={onOpenSupport}
          />
        </div>
      </div>
    </div>
  );
}
