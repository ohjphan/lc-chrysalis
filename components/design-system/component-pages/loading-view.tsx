import { SimpleRingLoader } from "@/components/ui/loading-indicators";

export function LoadingView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">
          Loading Indicator
        </h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Use the simple ring loading indicator for product loading states that
          need a lightweight, neutral treatment.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-[2px]">
          <h3 className="font-page-h3 text-heading dark:text-foreground">
            Default
          </h3>
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            A simple circular ring with an{" "}
            <code className="font-mono text-sm text-foreground">
              accent-green
            </code>{" "}
            arc moving around a neutral track.
          </p>
        </div>
        <div className="flex min-h-24 items-center">
          <SimpleRingLoader size="lg" />
        </div>
      </section>
    </div>
  );
}
