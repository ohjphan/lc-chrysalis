"use client";

import Link from "next/link";
import { useDemoPageScrolled } from "@/components/demo-experience/use-demo-page-scrolled";
import { cn } from "@/lib/utils";

export function DemoExperienceHeader({
  className,
}: {
  className?: string;
}) {
  const isScrolled = useDemoPageScrolled();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-app-b transition-[background-color,border-color,backdrop-filter] duration-200 ease-out",
        isScrolled
          ? "border-border-subtle bg-sidebar/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar/80 dark:bg-background/95"
          : "border-transparent bg-transparent backdrop-blur-none supports-[backdrop-filter]:bg-transparent dark:bg-transparent",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-8 md:h-16 md:px-10">
        <Link
          href="/demos"
          className="flex min-w-0 items-center gap-2"
          aria-label="Learning Commons demos home"
        >
          <span className="dark:hidden">
            <img
              src="/lc-logo.svg"
              alt=""
              width={179}
              height={18}
              className="h-[18px] w-auto max-w-[140px] object-left object-contain sm:max-w-none"
            />
          </span>
          <span className="hidden dark:block">
            <img
              src="/lc-logo-white.svg"
              alt=""
              width={179}
              height={18}
              className="h-[18px] w-auto max-w-[140px] object-left object-contain sm:max-w-none"
            />
          </span>
          <span className="font-nav-eyebrow hidden text-sm font-medium uppercase tracking-[0.06em] text-muted-foreground sm:inline">
            Demos
          </span>
        </Link>
      </div>
    </header>
  );
}
