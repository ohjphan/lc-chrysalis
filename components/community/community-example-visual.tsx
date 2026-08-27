import type { ReactNode } from "react";
import type { CommunityProject } from "@/lib/community/types";
import { communityVisualFor } from "@/lib/community/visual-map";
import {
  brandAvatarClassesForDemosCard,
} from "@/lib/brand-avatar-colors";
import { cn } from "@/lib/utils";

/** Fixed frame heights so every variant aligns in grids and on project pages. */
const FRAME_COMPACT_H = "h-[208px]";
const FRAME_FULL_H = "min-h-[300px] h-[300px]";

/** Tileable grain — feTurbulence stitched for repeat; sits above swatch, below content. */
const DEMO_CARD_NOISE_DATA_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/** Match Knowledge Graph explorer canvas; white dots at 40% over brand swatch fills. */
const DEMO_CARD_DOT_PATTERN_CLASSES =
  "[background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:14px_14px]";

function MicroLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

function CommunityCardSwatchHero({
  project,
  className,
}: {
  project: CommunityProject;
  className?: string;
}) {
  const { bgClass, textClass } = brandAvatarClassesForDemosCard(
    project.slug,
  );
  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-col overflow-hidden rounded-[var(--radius-md)] border-app border-border-subtle",
        FRAME_COMPACT_H,
        bgClass,
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] bg-repeat opacity-[0.30] mix-blend-soft-light"
        style={{
          backgroundImage: `url("${DEMO_CARD_NOISE_DATA_URL}")`,
          backgroundSize: "128px 128px",
        }}
        aria-hidden
      />
      <div className="relative z-10 shrink-0 px-4 py-4 text-left md:px-5 md:py-5">
        <h3
          className={cn(
            "font-page-title text-balance leading-snug line-clamp-3",
            textClass,
          )}
        >
          {project.title}
        </h3>
      </div>
      <div
        className={cn(
          "relative z-10 min-h-[48px] min-w-0 flex-1",
          DEMO_CARD_DOT_PATTERN_CLASSES,
        )}
        aria-hidden
      />
    </div>
  );
}

function VisualStage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

function VisualPipeline({ compact }: { compact: boolean }) {
  const box =
    "rounded-[4px] border-app border-border-subtle px-2 py-1.5 text-center text-[11px] font-medium leading-tight text-charcoal dark:text-foreground";
  return (
    <div
      className={cn(
        "flex w-full max-w-full items-center justify-center gap-1.5",
        compact
          ? "flex-row flex-nowrap"
          : "flex-row flex-wrap gap-y-2",
      )}
    >
      <div className={cn(box, "min-w-[4rem] shrink-0 bg-field-bg")}>Input</div>
      <span className="shrink-0 text-muted-foreground" aria-hidden>
        →
      </span>
      <div
        className={cn(
          box,
          "min-w-[4.75rem] shrink-0 border-[var(--accent-green)] bg-[rgba(29,180,112,0.12)] text-[var(--accent-green)]",
        )}
      >
        Evaluator
      </div>
      <span className="shrink-0 text-muted-foreground" aria-hidden>
        →
      </span>
      <div
        className={cn(
          box,
          "min-w-[4rem] shrink-0 bg-charcoal text-white dark:bg-nav-link-active dark:text-foreground",
        )}
      >
        Output
      </div>
    </div>
  );
}

function VisualRubric({ compact }: { compact: boolean }) {
  const rows = [
    { label: "Claim", w: "w-[78%]" },
    { label: "Evidence", w: "w-[62%]" },
    { label: "Mechanics", w: "w-[88%]" },
  ];
  return (
    <div
      className={cn("w-full space-y-1.5", compact ? "max-w-[200px]" : "max-w-[220px]")}
    >
      {rows.map((r) => (
        <div key={r.label} className="space-y-0.5">
          <div className="flex justify-between text-[10px] font-medium text-charcoal dark:text-foreground">
            <span>{r.label}</span>
            <span className="text-muted-foreground">1–4</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-nav-active dark:bg-nav-link-active">
            <div
              className={cn(
                "h-full rounded-full bg-[var(--accent-green)]",
                r.w,
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function VisualGraphHub() {
  const node =
    "absolute flex items-center justify-center rounded-[4px] border-app text-[9px] font-medium leading-none";
  return (
    <div className="relative mx-auto h-full min-h-[96px] w-full max-w-[240px] text-charcoal dark:text-foreground">
      <svg
        className="absolute inset-0 size-full text-[var(--gray-1)] dark:text-border-subtle"
        aria-hidden
      >
        <line
          x1="50%"
          y1="18%"
          x2="26%"
          y2="55%"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="50%"
          y1="18%"
          x2="74%"
          y2="55%"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="26%"
          y1="55%"
          x2="50%"
          y2="88%"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="74%"
          y1="55%"
          x2="50%"
          y2="88%"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <div
        className={cn(
          node,
          "left-1/2 top-[8%] h-7 w-14 -translate-x-1/2 border-[var(--accent-green)] bg-[rgba(29,180,112,0.14)] text-[var(--accent-green)]",
        )}
      >
        Standard
      </div>
      <div
        className={cn(
          node,
          "left-[18%] top-[48%] h-6 w-12 border-border-subtle bg-sidebar dark:bg-field-bg",
        )}
      >
        Unit
      </div>
      <div
        className={cn(
          node,
          "right-[18%] top-[48%] h-6 w-12 border-border-subtle bg-sidebar dark:bg-field-bg",
        )}
      >
        Skill
      </div>
      <div
        className={cn(
          node,
          "bottom-[6%] left-1/2 h-6 w-16 -translate-x-1/2 border-border-subtle bg-field-bg",
        )}
      >
        Outcome
      </div>
    </div>
  );
}

function VisualGraphPath({ compact }: { compact: boolean }) {
  const steps = ["A", "B", "C", "D"];
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-0.5 sm:gap-1",
        compact ? "max-w-[252px]" : "max-w-md",
      )}
    >
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-0.5 sm:gap-1">
          <div
            className={cn(
              "flex size-[1.75rem] shrink-0 items-center justify-center rounded-[4px] border-app text-[10px] font-[550] sm:size-8 sm:text-[11px]",
              i === 1 || i === 2
                ? "border-[var(--accent-yellow)] bg-[rgba(253,209,81,0.2)] text-charcoal dark:text-foreground"
                : "border-border-subtle bg-sidebar dark:bg-field-bg",
            )}
          >
            {s}
          </div>
          {i < steps.length - 1 ? (
            <span className="text-muted-foreground" aria-hidden>
              —
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function VisualStarterStack({ compact }: { compact: boolean }) {
  const card =
    "flex h-[4.5rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-[4px] border-app px-1.5 py-1.5 text-center sm:h-[5rem] sm:px-2 sm:py-2";
  return (
    <div
      className={cn(
        "flex w-full max-w-[280px] items-stretch justify-center gap-1.5 sm:gap-2",
        !compact && "max-w-md",
      )}
    >
      <div className={cn(card, "border-border-subtle bg-sidebar dark:bg-field-bg")}>
        <MicroLabel>Keys</MicroLabel>
        <span className="text-[11px] font-medium text-charcoal dark:text-foreground">
          API
        </span>
      </div>
      <div
        className={cn(
          card,
          "border-[var(--accent-yellow)] bg-[rgba(253,209,81,0.12)]",
        )}
      >
        <MicroLabel>Remix</MicroLabel>
        <span className="text-[11px] font-medium text-charcoal dark:text-foreground">
          Config
        </span>
      </div>
      <div
        className={cn(
          card,
          "border-[var(--accent-green)] bg-[rgba(29,180,112,0.1)]",
        )}
      >
        <MicroLabel>Run</MicroLabel>
        <span className="text-[11px] font-medium text-[var(--accent-green)]">
          Product
        </span>
      </div>
    </div>
  );
}

export function CommunityExampleVisual({
  project,
  compact = false,
  className,
}: {
  project: CommunityProject;
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return <CommunityCardSwatchHero project={project} className={className} />;
  }

  const key = communityVisualFor(project);
  return (
    <div
      className={cn(
        "flex flex-col rounded-[var(--radius-md)] border-app border-border-subtle bg-sidebar dark:bg-field-bg",
        compact ? cn("px-3 py-3", FRAME_COMPACT_H) : cn("px-5 py-5", FRAME_FULL_H),
        className,
      )}
    >
      <MicroLabel className="mb-2 block w-full shrink-0 text-center">
        {key === "pipeline" && "Data flow"}
        {key === "rubric" && "Scoring model"}
        {key === "graph-hub" && "Graph shape"}
        {key === "graph-path" && "Path / sequence"}
        {key === "starter-stack" && "Getting started"}
      </MicroLabel>
      <VisualStage>
        {key === "pipeline" ? <VisualPipeline compact={compact} /> : null}
        {key === "rubric" ? <VisualRubric compact={compact} /> : null}
        {key === "graph-hub" ? <VisualGraphHub /> : null}
        {key === "graph-path" ? <VisualGraphPath compact={compact} /> : null}
        {key === "starter-stack" ? <VisualStarterStack compact={compact} /> : null}
      </VisualStage>
      {!compact ? (
        <p className="mt-3 line-clamp-3 shrink-0 text-center text-xs leading-snug text-muted-foreground">
          <span className="font-medium text-foreground">In: </span>
          {project.inputsOutputs.inputs}
          <span className="mx-1.5 text-border-subtle">|</span>
          <span className="font-medium text-foreground">Out: </span>
          {project.inputsOutputs.outputs}
        </p>
      ) : null}
    </div>
  );
}
