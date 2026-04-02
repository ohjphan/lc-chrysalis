"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

type IndicatorState = { left: number; width: number };

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

/** One continuous bottom hairline; green indicator slides under the active tab. */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, forwardedRef) => {
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
          "inline-flex h-auto min-h-0 w-full flex-wrap items-end justify-start gap-x-4 gap-y-2 border-app-b border-[#CCC9C6] bg-transparent p-0 text-muted-foreground dark:border-border-subtle",
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-px z-[1] h-[3px] bg-accent-green dark:bg-accent-green",
          transitionOn &&
            "transition-[left,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        )}
        style={{
          left: indicator.left,
          width: indicator.width,
        }}
      />
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative z-0 -mb-[1.5px] inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-none border-b-[3px] border-transparent bg-transparent px-4 pb-5 pt-2 text-base font-normal text-muted-foreground ring-offset-background transition-[color] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
      className,
    )}
    {...props}
  />
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
