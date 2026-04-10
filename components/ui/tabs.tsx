"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

type IndicatorState = { left: number; width: number };
type TabsVariant = "underline" | "underlineDot" | "dark" | "surface";

function useTabIndicator(listRef: React.RefObject<HTMLDivElement | null>) {
  const [indicator, setIndicator] = React.useState<IndicatorState>({
    left: 0,
    width: 0,
  });
  /** Avoid animating from (0,0) on first paint */
  const [transitionOn, setTransitionOn] = React.useState(false);

  const updateIndicator = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>(
      '[role="tab"][data-state="active"]',
    );
    if (!active) {
      setIndicator({ left: 0, width: 0 });
      return;
    }
    const listRect = list.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    setIndicator({
      left: activeRect.left - listRect.left,
      width: activeRect.width,
    });
  }, [listRef]);

  React.useLayoutEffect(() => {
    updateIndicator();
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransitionOn(true));
    });
    return () => cancelAnimationFrame(id);
  }, [updateIndicator]);

  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ro = new ResizeObserver(() => updateIndicator());
    ro.observe(list);

    const mo = new MutationObserver(() => updateIndicator());
    mo.observe(list, {
      attributes: true,
      subtree: true,
      attributeFilter: ["data-state"],
      childList: true,
    });

    window.addEventListener("resize", updateIndicator);
    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [listRef, updateIndicator]);

  return { indicator, transitionOn };
}

/** Shared list layout with optional sliding active treatments by variant. */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: TabsVariant;
  }
>(({ className, children, variant = "underlineDot", ...props }, forwardedRef) => {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const { indicator, transitionOn } = useTabIndicator(listRef);

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef)
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
    },
    [forwardedRef],
  );

  return (
    <div className="relative w-full">
      <TabsPrimitive.List
        ref={setRefs}
        className={cn(
          variant === "underline" || variant === "underlineDot"
            ? "inline-flex h-auto min-h-0 w-full flex-wrap items-end justify-start gap-x-4 gap-y-2 border-app-b border-border-subtle bg-transparent p-0 text-muted-foreground dark:border-border-subtle"
            : variant === "dark"
              ? "inline-flex h-auto min-h-0 w-full flex-wrap items-end justify-start gap-2 border-app-b border-border-subtle bg-transparent pb-[12px] text-muted-foreground dark:border-border-subtle"
              : "inline-flex h-auto min-h-0 w-full flex-wrap items-center justify-start gap-1 rounded-md border-app border-border-subtle bg-sidebar p-1 text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
      {variant === "underline" || variant === "underlineDot" ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-px z-[1] h-[3px]",
            variant === "underline"
              ? "bg-accent-green dark:bg-accent-green"
              : "bg-charcoal dark:bg-foreground",
            transitionOn &&
              "transition-[left,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          )}
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
        />
      ) : variant === "dark" ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 bottom-[12px] z-[1] overflow-hidden rounded-md bg-charcoal",
            transitionOn &&
              "transition-[left,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          )}
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
        />
      ) : variant === "surface" ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1 bottom-1 z-[1] overflow-hidden rounded-[3px] border-app border-border-subtle bg-background",
            transitionOn &&
              "transition-[left,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          )}
          style={{
            left: indicator.left,
            width: indicator.width,
          }}
        />
      ) : null}
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: TabsVariant;
  }
>(({ className, variant = "underlineDot", children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      variant === "underline"
        ? "relative z-0 -mb-[1.5px] inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-none border-b-[3px] border-transparent bg-transparent px-4 pb-5 pt-2 text-base font-medium text-muted-foreground ring-offset-background transition-[color] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:font-bold data-[state=active]:text-foreground"
        : variant === "underlineDot"
          ? "group relative z-0 -mb-[1.5px] inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-none border-b-[3px] border-transparent bg-transparent px-4 pb-5 pt-2 text-base font-medium text-muted-foreground ring-offset-background transition-[color] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:font-bold data-[state=active]:text-charcoal dark:data-[state=active]:text-foreground"
          : variant === "dark"
            ? "relative z-[2] inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-transparent px-4 text-base font-medium text-nav-link-idle ring-offset-background transition-[color,border-color] duration-200 ease-in-out hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:font-bold data-[state=active]:text-white"
            : "relative z-[2] inline-flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-[3px] border border-transparent bg-transparent px-4 text-base font-medium text-nav-link-idle ring-offset-background transition-[background-color,color] duration-200 ease-in-out data-[state=inactive]:hover:bg-nav-active data-[state=inactive]:hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:font-bold data-[state=active]:text-foreground",
      className,
    )}
    {...props}
  >
    {variant === "underlineDot" ? (
      <span
        data-tab-indicator-content=""
        className="inline-grid grid-cols-[6px_auto_6px] items-center gap-2"
      >
        <span
          aria-hidden
          className="translate-y-px size-[6px] scale-75 rounded-full bg-gray-1 opacity-0 transition-all duration-200 ease-in-out group-data-[state=active]:scale-100 group-data-[state=active]:bg-accent-green group-data-[state=active]:opacity-100 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        />
        <span>{children}</span>
        <span aria-hidden className="size-[6px]" />
      </span>
    ) : (
      children
    )}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
