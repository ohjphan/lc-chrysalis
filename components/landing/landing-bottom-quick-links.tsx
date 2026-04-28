import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  FileText,
  Github,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SUPPORT_DOCS_URL, SUPPORT_GITHUB_URL } from "@/lib/support-links";
import { cn } from "@/lib/utils";

const linkShellClass =
  "group block min-w-0 flex-1 rounded-[4px] no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-w-[10.5rem]";

const cardClass =
  "h-full transition-[background-color,box-shadow] hover:bg-nav-active dark:hover:bg-nav-link-active";

const contentClass =
  "flex items-center gap-4 px-6 py-5 sm:px-7 sm:py-5";

const iconClass = "size-[18px] shrink-0 text-accent-green";

const chevronClass =
  "size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground";

export function LandingBottomQuickLinks() {
  return (
    <nav
      aria-label="Quick links"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 md:left-64 md:right-0"
    >
      <div className="pointer-events-auto flex w-full max-w-5xl flex-col gap-3 sm:flex-row sm:gap-4">
        <a
          href={SUPPORT_DOCS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkShellClass}
        >
          <Card className={cardClass}>
            <CardContent className={cn(contentClass, "p-0")}>
              <FileText className={iconClass} aria-hidden />
              <span className="min-w-0 flex-1 text-left text-base font-normal text-foreground">
                API reference
              </span>
              <ArrowUpRight className={chevronClass} aria-hidden />
            </CardContent>
          </Card>
        </a>
        <a
          href={SUPPORT_GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={linkShellClass}
        >
          <Card className={cardClass}>
            <CardContent className={cn(contentClass, "p-0")}>
              <Github className={iconClass} aria-hidden />
              <span className="min-w-0 flex-1 text-left text-base font-normal text-foreground">
                GitHub
              </span>
              <ArrowUpRight className={chevronClass} aria-hidden />
            </CardContent>
          </Card>
        </a>
        <Link href="/support" className={linkShellClass}>
          <Card className={cardClass}>
            <CardContent className={cn(contentClass, "p-0")}>
              <HelpCircle className={iconClass} aria-hidden />
              <span className="min-w-0 flex-1 text-left text-base font-normal text-foreground">
                Support
              </span>
              <ChevronRight className={chevronClass} aria-hidden />
            </CardContent>
          </Card>
        </Link>
      </div>
    </nav>
  );
}
