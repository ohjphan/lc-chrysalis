"use client";

import * as React from "react";

const DEFAULT_SCROLL_THRESHOLD_PX = 10;

function readScrollY(): number {
  if (typeof window === "undefined") return 0;
  return (
    window.scrollY ||
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    0
  );
}

export function useDemoPageScrolled(
  thresholdPx = DEFAULT_SCROLL_THRESHOLD_PX,
): boolean {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    function onScroll() {
      setIsScrolled(readScrollY() > thresholdPx);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPx]);

  return isScrolled;
}
