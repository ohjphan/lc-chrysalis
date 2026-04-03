import { cn } from "@/lib/utils";

export type ProgressBarProps = {
  /** Current value (e.g. score earned). */
  value: number;
  /** Maximum value (e.g. max score). */
  max: number;
  /** Show a neutral outline around the base track. */
  bordered?: boolean;
  /** Show `NN%` on the right (same as Playground score column). */
  showLabel?: boolean;
  labelClassName?: string;
  className?: string;
};

/**
 * Horizontal progress indicator: 2px radius track (`bg-nav-active`), fill width to
 * `value/max`. Fill color blends from `accent-yellow` toward `accent-green` as
 * completion rises (`color-mix`); at full completion the fill uses solid
 * `accent-green`.
 */
export function ProgressBar({
  value,
  max,
  bordered = false,
  showLabel = true,
  labelClassName,
  className,
}: ProgressBarProps) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const pct = Math.round(ratio * 100);
  const complete = max > 0 && value >= max;

  const fillStyle =
    complete || ratio >= 1
      ? undefined
      : {
          backgroundColor: `color-mix(in srgb, var(--accent-green) ${ratio * 100}%, var(--accent-yellow))`,
        };

  const trackStyle = bordered
    ? { boxShadow: "0 0 0 var(--border-stroke) var(--border-subtle)" }
    : undefined;

  return (
    <div
      className={cn("flex min-w-[120px] items-center gap-3", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={showLabel ? undefined : `Progress: ${pct} percent`}
    >
      <div
        className={cn(
          "relative h-2 min-w-0 flex-1 overflow-visible rounded-[2px]",
          bordered && "rounded-[1px]",
        )}
        style={trackStyle}
      >
        <div
          className={cn(
            "absolute inset-0 overflow-hidden rounded-[2px] bg-nav-active",
            bordered && "rounded-[1px]",
          )}
        >
          <div
            className={cn(
              "absolute inset-y-0 left-0 rounded-[2px] transition-[width,background-color] duration-300 ease-out",
              bordered && "rounded-[1px]",
              complete || ratio >= 1 ? "bg-accent-green" : undefined,
            )}
            style={{
              width: `${pct}%`,
              ...fillStyle,
            }}
          />
        </div>
      </div>
      {showLabel ? (
        <span
          className={cn(
            "inline-flex w-[3rem] shrink-0 justify-end tabular-nums text-sm font-medium text-foreground",
            labelClassName,
          )}
        >
          {pct}%
        </span>
      ) : null}
    </div>
  );
}
