"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const StickyTableContext = React.createContext<{
  scrollRef: React.RefObject<HTMLDivElement | null>;
} | null>(null);

export function useStickyTableScroll() {
  const ctx = React.useContext(StickyTableContext);
  return ctx?.scrollRef;
}

export function StickyTableProvider({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  return (
    <StickyTableContext.Provider value={{ scrollRef }}>
      <div
        ref={scrollRef}
        className={cn("overflow-x-auto overflow-y-visible", className)}
      >
        {children}
      </div>
    </StickyTableContext.Provider>
  );
}
