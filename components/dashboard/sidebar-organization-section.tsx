"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ChevronDown, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ORGS = [
  {
    id: "magic",
    name: "Magic School",
    initial: "M",
    markClass: "bg-violet-600",
  },
  {
    id: "test",
    name: "TestOrg",
    initial: "T",
    markClass: "bg-emerald-600",
  },
] as const;

const USER_EMAIL = "jphan@magicschool.edu";

/** Light popover panel (matches reference) — stays light in dark dashboard. */
const popoverContentClass =
  "z-[60] min-w-[17.5rem] max-w-[min(calc(100vw-2rem),20rem)] rounded-lg border-app border-border-subtle bg-sidebar p-2 text-foreground shadow-lg";

const popoverSeparatorClass =
  "-mx-2 my-2 h-0 border-app-t border-border-subtle";

const popoverItemClass =
  "cursor-pointer gap-2 rounded-md px-2 py-2 text-sm font-normal text-zinc-800 focus:bg-nav-active focus:text-foreground data-[highlighted]:bg-nav-active data-[highlighted]:text-foreground";

/** Matches copyright line in org menu footer */
const orgMenuFooterCopyClass =
  "font-mono text-[10px] font-normal uppercase leading-relaxed tracking-[0.04em] text-zinc-500";

export function SidebarOrganizationSection({
  onNavigate,
  onOpenSupport,
}: {
  onNavigate?: () => void;
  onOpenSupport?: () => void;
}) {
  const [orgId, setOrgId] = React.useState<string>(ORGS[0].id);
  const current = ORGS.find((o) => o.id === orgId) ?? ORGS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors outline-none",
            "hover:bg-sidebar-nav-intent data-[state=open]:bg-sidebar-nav-intent",
            "focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
          )}
          aria-label="Organization and account menu"
        >
          <span
            className={cn(
              "flex size-[20px] shrink-0 items-center justify-center rounded-[4px] text-[9px] font-bold leading-none text-white",
              current.markClass,
            )}
            aria-hidden
          >
            {current.initial}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {current.name}
            </p>
            <p className="truncate text-xs font-normal text-muted-foreground">
              {USER_EMAIL}
            </p>
          </div>
          <ChevronDown
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="end"
        sideOffset={20}
        collisionPadding={8}
        className={popoverContentClass}
      >
        {ORGS.map((o) => {
          const selected = o.id === orgId;
          return (
            <DropdownMenuItem
              key={o.id}
              className={cn(popoverItemClass, "justify-between")}
              onSelect={() => {
                if (o.id === orgId) return;
                setOrgId(o.id);
                toast(`You have switched to ${o.name}.`, {
                  icon: (
                    <span className="grid size-[22px] shrink-0 place-items-center rounded-full leading-none bg-accent-green">
                      <Check
                        className="size-[14px] shrink-0 text-white block"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                    </span>
                  ),
                });
              }}
            >
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <span
                  className={cn(
                    "flex size-[20px] shrink-0 items-center justify-center rounded-[4px] text-[9px] font-bold leading-none text-white",
                    o.markClass,
                  )}
                  aria-hidden
                >
                  {o.initial}
                </span>
                <span className="truncate font-normal text-zinc-800">
                  {o.name}
                </span>
              </span>
              <span
                className="flex size-5 shrink-0 items-center justify-end"
                aria-hidden
              >
                {selected ? (
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-green">
                    <Check className="size-3 text-white" strokeWidth={2.5} />
                  </span>
                ) : null}
              </span>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem
          className={popoverItemClass}
          onSelect={(e) => e.preventDefault()}
        >
          <span className="flex size-[20px] shrink-0 items-center justify-center rounded-[4px] bg-sidebar text-gray-4">
            <Plus className="size-3.5" strokeWidth={2} aria-hidden />
          </span>
          <span className="font-normal text-zinc-800">New organization</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className={popoverSeparatorClass} />

        <DropdownMenuItem asChild className={cn(popoverItemClass, "p-0")}>
          <Link
            href="/settings"
            className="flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm outline-none"
            onClick={() => onNavigate?.()}
          >
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={popoverItemClass}
          onSelect={() => {
            onNavigate?.();
            onOpenSupport?.();
          }}
        >
          <span className="font-normal text-zinc-800">
            Support
          </span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className={popoverSeparatorClass} />

        <DropdownMenuItem
          className={popoverItemClass}
          onSelect={(e) => e.preventDefault()}
        >
          Sign out
        </DropdownMenuItem>

        <DropdownMenuSeparator className={popoverSeparatorClass} />

        <div className="px-2 pb-3 pt-1">
          <div
            className={cn(
              "flex flex-wrap items-center gap-x-1.5 gap-y-0.5",
              orgMenuFooterCopyClass,
            )}
          >
            <Link
              href="/terms-of-use"
              className="rounded-sm outline-none hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-1 focus-visible:ring-offset-white"
              onClick={() => onNavigate?.()}
            >
              Terms of Use
            </Link>
            <span className="select-none text-zinc-400" aria-hidden>
              ·
            </span>
            <Link
              href="/privacy-policy"
              className="rounded-sm outline-none hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-1 focus-visible:ring-offset-white"
              onClick={() => onNavigate?.()}
            >
              Privacy Policy
            </Link>
          </div>
          <p className={cn("mt-1.5", orgMenuFooterCopyClass)}>
            © {new Date().getFullYear()} Learning Commons
            <br />
            All rights reserved
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
