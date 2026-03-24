"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggleButton({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const dark = mounted && (resolvedTheme === "dark" || theme === "dark");

  if (!mounted) {
    return (
      <div
        className="h-8 w-14 shrink-0 rounded-full border-app border-border-subtle bg-nav-active"
        aria-hidden
      />
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn(
        "relative flex h-8 w-14 shrink-0 items-center rounded-full border-app border-border-subtle p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        dark ? "bg-accent-green" : "bg-nav-active",
        className,
      )}
    >
      <span
        className={cn(
          "relative z-10 flex size-7 items-center justify-center rounded-full bg-surface shadow-sm transition-transform duration-200 ease-out",
          dark ? "translate-x-6" : "translate-x-0",
        )}
      >
        {dark ? (
          <Moon
            className="size-3.5 shrink-0 text-foreground"
            strokeWidth={2}
            aria-hidden
          />
        ) : (
          <Sun
            className="size-3.5 shrink-0 text-foreground"
            strokeWidth={2}
            aria-hidden
          />
        )}
      </span>
    </button>
  );
}
