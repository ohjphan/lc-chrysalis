"use client";

import * as React from "react";
import { ProjectCard } from "@/components/community/project-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "@/components/ui/material-symbols";
import { getOtherCommunityProjects } from "@/lib/community/queries";
import { cn } from "@/lib/utils";

export function TryOtherDemosCarousel({
  currentSlug,
  className,
}: {
  currentSlug: string;
  className?: string;
}) {
  const projects = React.useMemo(
    () => getOtherCommunityProjects(currentSlug),
    [currentSlug],
  );
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollState = React.useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;
    const maxScrollLeft = node.scrollWidth - node.clientWidth;
    setCanScrollLeft(node.scrollLeft > 0);
    setCanScrollRight(maxScrollLeft - node.scrollLeft > 1);
  }, []);

  React.useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    updateScrollState();
    node.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(node);

    return () => {
      node.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState, projects]);

  const scrollByPage = React.useCallback((direction: -1 | 1) => {
    const node = scrollRef.current;
    if (!node) return;
    const firstCard = node.querySelector<HTMLElement>("article");
    const gap = 24;
    const step = (firstCard?.offsetWidth ?? 320) + gap;
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  if (projects.length === 0) return null;

  return (
    <section
      className={cn(
        "scroll-mt-8 space-y-4 border-t border-border-subtle pt-[18px] mt-[60px] mb-[60px]",
        className,
      )}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2
          id="try-other-demos-heading"
          className="font-page-h3 text-heading dark:text-foreground"
        >
          Try other demos
        </h2>
        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            disabled={!canScrollLeft}
            aria-label="Scroll to previous demos"
            onClick={() => scrollByPage(-1)}
          >
            <ChevronLeft aria-hidden />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            disabled={!canScrollRight}
            aria-label="Scroll to next demos"
            onClick={() => scrollByPage(1)}
          >
            <ChevronRight aria-hidden />
          </Button>
        </div>
      </div>

      <div className="relative -mx-1 px-1">
        {canScrollLeft ? (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background via-background/90 to-transparent"
            aria-hidden
          />
        ) : null}
        {canScrollRight ? (
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-background via-background/90 to-transparent"
            aria-hidden
          />
        ) : null}
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:thin]"
          aria-labelledby="try-other-demos-heading"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              dense
              className="snap-start"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
