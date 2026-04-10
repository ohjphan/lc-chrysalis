"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationButtonGroupProps = {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(1, page), Math.max(1, totalPages));
}

function getVisiblePages(page: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-right", totalPages] as const;
  }

  if (page >= totalPages - 3) {
    return [
      1,
      "ellipsis-left",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ] as const;
  }

  return [
    1,
    "ellipsis-left",
    page - 1,
    page,
    page + 1,
    "ellipsis-right",
    totalPages,
  ] as const;
}

function PaginationButton({
  children,
  active = false,
  disabled = false,
  className,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center px-3 text-sm font-medium leading-none text-muted-foreground transition-colors",
        "border-app-r border-border-subtle last:border-r-0",
        "hover:bg-nav-active hover:text-foreground",
        "disabled:pointer-events-none disabled:text-muted-foreground/50",
        active && "bg-sidebar-nav-intent text-foreground",
        className,
      )}
    >
      <span className="-translate-y-px">{children}</span>
    </button>
  );
}

export function PaginationButtonGroup({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationButtonGroupProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const currentPage = clampPage(page, safeTotalPages);
  const pages = getVisiblePages(currentPage, safeTotalPages);

  function goToPage(nextPage: number) {
    onPageChange?.(clampPage(nextPage, safeTotalPages));
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "inline-flex items-center overflow-hidden rounded-md border-app border-border-subtle bg-background",
        className,
      )}
    >
      <PaginationButton
        disabled={currentPage <= 1}
        ariaLabel="Go to previous page"
        onClick={() => goToPage(currentPage - 1)}
      >
        <ChevronLeft className="size-4" aria-hidden />
      </PaginationButton>

      {pages.map((item, index) =>
        typeof item === "number" ? (
          <PaginationButton
            key={item}
            active={item === currentPage}
            ariaLabel={`Go to page ${item}`}
            onClick={() => goToPage(item)}
          >
            {item}
          </PaginationButton>
        ) : (
          <span
            key={`${item}-${index}`}
            aria-hidden
            className="inline-flex h-9 min-w-9 items-center justify-center border-app-r border-border-subtle px-2 text-muted-foreground last:border-r-0"
          >
            <MoreHorizontal className="size-4" />
          </span>
        ),
      )}

      <PaginationButton
        disabled={currentPage >= totalPages}
        ariaLabel="Go to next page"
        onClick={() => goToPage(currentPage + 1)}
      >
        <ChevronRight className="size-4" aria-hidden />
      </PaginationButton>
    </nav>
  );
}
