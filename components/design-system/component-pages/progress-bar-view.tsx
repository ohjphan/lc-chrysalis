import { ProgressBar } from "@/components/ui/progress-bar";

export function ProgressBarView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">
          Progress bar
        </h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Used on Evaluators (Standards alignment overview) for score-as-progress: track uses{" "}
          <code className="font-mono text-sm text-foreground">bg-nav-active</code>. The fill blends from{" "}
          <code className="font-mono text-sm text-foreground">accent-yellow</code> toward{" "}
          <code className="font-mono text-sm text-foreground">accent-green</code> as completion increases (
          <code className="font-mono text-sm text-foreground">color-mix</code>); at 100% completion the fill is
          solid green. The optional label shows the rounded percentage of{" "}
          <code className="font-mono text-sm text-foreground">value / max</code>.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Default
          </h3>
          <p className="text-base font-normal text-muted-foreground">
            Uses the current track treatment without an added outline.
          </p>
        </div>
        <div className="w-full space-y-6">
          <ProgressBar
            value={0}
            max={4}
            className="w-full"
            labelClassName="font-nav-sidebar-eyebrow text-eyebrow"
          />
          <ProgressBar
            value={1}
            max={4}
            className="w-full"
            labelClassName="font-nav-sidebar-eyebrow text-eyebrow"
          />
          <ProgressBar
            value={1}
            max={2}
            className="w-full"
            labelClassName="font-nav-sidebar-eyebrow text-eyebrow"
          />
          <ProgressBar
            value={3}
            max={4}
            className="w-full"
            labelClassName="font-nav-sidebar-eyebrow text-eyebrow"
          />
          <ProgressBar
            value={2}
            max={2}
            className="w-full"
            labelClassName="font-nav-sidebar-eyebrow text-eyebrow"
          />
        </div>
      </section>
    </div>
  );
}
