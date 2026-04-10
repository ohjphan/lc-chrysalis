"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Wrench } from "lucide-react";
import { PageContainer } from "@/components/dashboard/page-container";
import { StickyTableProvider } from "@/components/dashboard/sticky-table-provider";
import { Button } from "@/components/ui/button";
import { ColorBadge } from "@/components/ui/color-badge";
import { Input } from "@/components/ui/input";
import { PageTitle } from "@/components/ui/page-title";
import { brandAvatarClassesForId } from "@/lib/brand-avatar-colors";
import { tableHeadStickyCellClasses } from "@/lib/table-styles";
import { cn } from "@/lib/utils";

type EvaluatorRow = {
  id: string;
  providerKey: string;
  providerName: string;
  initials: string;
  evaluatorName: string;
  description: string;
  providerList: readonly string[];
  providerLabel: string;
  sdkHref: string;
  playgroundHref: string;
};

const EVALUATORS: EvaluatorRow[] = [
  {
    id: "eval-1",
    providerKey: "EL Education",
    providerName: "EL Education",
    initials: "EL",
    evaluatorName: "Literacy evaluation",
    description:
      "Review reading and writing tasks for clarity, text complexity, and alignment to instructional goals.",
    providerList: ["EL Education", "Amplify", "Newsela"],
    providerLabel: "3 providers",
    sdkHref: "/sdk",
    playgroundHref: "/playground",
  },
  {
    id: "eval-2",
    providerKey: "Illustrative Math",
    providerName: "Illustrative Mathematics",
    initials: "IM",
    evaluatorName: "Math standards alignment",
    description:
      "Check math prompts against selected standards and surface where reasoning or evidence needs strengthening.",
    providerList: ["Illustrative Mathematics", "Khan Academy", "Carnegie Learning"],
    providerLabel: "3 providers",
    sdkHref: "/sdk",
    playgroundHref: "/playground",
  },
  {
    id: "eval-3",
    providerKey: "OpenSciEd",
    providerName: "OpenSciEd",
    initials: "OS",
    evaluatorName: "Cross-curricular alignment",
    description:
      "Evaluate whether tasks connect skills and concepts across subject areas while preserving academic rigor.",
    providerList: ["OpenSciEd", "iCivics", "ACT"],
    providerLabel: "3 providers",
    sdkHref: "/sdk",
    playgroundHref: "/playground",
  },
];

const td = "border-app-b border-border-subtle px-4 py-6 align-middle";

const EVALUATORS_FROSTED_STICKY_BG =
  "bg-white/85 backdrop-blur-lg supports-[backdrop-filter]:bg-white/70 dark:bg-background/85 dark:backdrop-blur-lg dark:supports-[backdrop-filter]:bg-background/70";

const EVALUATORS_TABLE_HEAD_STICKY: Parameters<
  typeof tableHeadStickyCellClasses
>[1] = {
  stickyTopVar: "--evaluators-sticky-controls-height",
  surfaceClass: "bg-sidebar",
  zClass: "z-[15]",
};

function ProvidersList({
  providers,
  providerLabel,
}: {
  providers: readonly string[];
  providerLabel: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <ColorBadge variant="gray" className="w-fit">
        {providerLabel}
      </ColorBadge>
      <div className="flex flex-wrap gap-1.5">
        {providers.map((provider) => (
          <ColorBadge key={provider} variant="beige">
            {provider}
          </ColorBadge>
        ))}
      </div>
    </div>
  );
}

export function EvaluatorsView() {
  const [query, setQuery] = React.useState("");
  const stickySentinelRef = React.useRef<HTMLDivElement>(null);
  const stickyControlsRef = React.useRef<HTMLDivElement>(null);
  const [stickyControlsHeight, setStickyControlsHeight] = React.useState(0);
  const [stickyBarStuck, setStickyBarStuck] = React.useState(false);

  const rows = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return EVALUATORS.filter((row) => {
      if (!q) return true;
      return (
        row.evaluatorName.toLowerCase().includes(q) ||
        row.description.toLowerCase().includes(q) ||
        row.providerList.some((provider) => provider.toLowerCase().includes(q))
      );
    });
  }, [query]);

  React.useLayoutEffect(() => {
    const el = stickyControlsRef.current;
    if (!el) return;
    const measure = () => setStickyControlsHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const el = stickySentinelRef.current;
    if (!el) return;
    function updateStuck() {
      const node = stickySentinelRef.current;
      if (!node) return;
      setStickyBarStuck(node.getBoundingClientRect().top < 0);
    }
    updateStuck();
    window.addEventListener("scroll", updateStuck, { passive: true });
    window.addEventListener("resize", updateStuck);
    return () => {
      window.removeEventListener("scroll", updateStuck);
      window.removeEventListener("resize", updateStuck);
    };
  }, []);

  return (
    <PageContainer>
      <div className="flex flex-col gap-[8px]">
        <PageTitle>Evaluator</PageTitle>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Explore evaluator types, see who provides them, and jump into
          integration or hands-on testing.
        </p>
      </div>

      <div
        style={
          {
            "--evaluators-sticky-controls-height": `${stickyControlsHeight}px`,
          } as React.CSSProperties
        }
      >
        <div className="mt-8">
          <div
            ref={stickySentinelRef}
            className="pointer-events-none h-px w-full shrink-0"
            aria-hidden
          />
          <div ref={stickyControlsRef} className="sticky top-0 z-20 -mx-6 md:-mx-8">
            <div
              className={cn(
                "border-app-b px-8 pb-4 pt-3 transition-[border-color] duration-300 ease-out md:px-10 md:pt-4",
                stickyBarStuck ? "border-border-subtle" : "border-b-transparent",
                EVALUATORS_FROSTED_STICKY_BG,
              )}
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex flex-col gap-1">
                  <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.04em] text-muted-foreground">
                    Evaluator types
                  </p>
                  <p className="text-base text-muted-foreground">
                    {rows.length} available
                  </p>
                </div>
              </div>

              <div className="relative mt-4 max-w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-11 border-app border-border-subtle pl-9"
                  placeholder="Search evaluators or providers..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search evaluators"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden">
            <StickyTableProvider>
              <table className="w-full min-w-[980px] border-collapse text-base">
                <caption className="sr-only">Evaluator catalog</caption>
                <thead>
                  <tr>
                    <th
                      className={tableHeadStickyCellClasses(
                        "min-w-[360px]",
                        EVALUATORS_TABLE_HEAD_STICKY,
                      )}
                    >
                      Evaluator
                    </th>
                    <th
                      className={tableHeadStickyCellClasses(
                        "min-w-[280px]",
                        EVALUATORS_TABLE_HEAD_STICKY,
                      )}
                    >
                      Providers
                    </th>
                    <th
                      className={tableHeadStickyCellClasses(
                        "min-w-[260px]",
                        EVALUATORS_TABLE_HEAD_STICKY,
                      )}
                    >
                      Description
                    </th>
                    <th
                      className={tableHeadStickyCellClasses(
                        "text-right",
                        EVALUATORS_TABLE_HEAD_STICKY,
                      )}
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const { bgClass, textClass } = brandAvatarClassesForId(row.id);
                    return (
                      <tr
                        key={row.id}
                        className="border-app-b border-border-subtle [&>td]:align-middle"
                      >
                        <td className={cn(td, "max-w-md")}>
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-md text-xs font-semibold",
                                bgClass,
                                textClass,
                              )}
                            >
                              {row.initials}
                            </div>
                            <div className="min-w-0">
                              <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.04em] text-muted-foreground">
                                {row.providerName}
                              </p>
                              <p className="mt-1 text-base font-[550] text-foreground">
                                {row.evaluatorName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className={td}>
                          <ProvidersList
                            providers={row.providerList}
                            providerLabel={row.providerLabel}
                          />
                        </td>
                        <td className={cn(td, "text-muted-foreground")}>
                          {row.description}
                        </td>
                        <td className={cn(td, "text-right")}>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="primary"
                              size="sm"
                              className="h-9 gap-1.5 [&_svg]:size-3.5"
                              asChild
                            >
                              <Link href={row.sdkHref}>
                                <Wrench className="size-3.5" />
                                Integrate via SDK
                              </Link>
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-9 gap-1.5 [&_svg]:size-3.5"
                              asChild
                            >
                              <Link href={row.playgroundHref}>
                                Play in Playground
                                <ArrowUpRight className="size-3.5" />
                              </Link>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </StickyTableProvider>
          </div>

          {rows.length === 0 ? (
            <p className="mt-6 text-center text-base font-normal text-muted-foreground">
              No evaluators match your search.
            </p>
          ) : null}
        </div>
      </div>
    </PageContainer>
  );
}
