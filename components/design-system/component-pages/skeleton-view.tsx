import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">
          Skeleton
        </h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Use skeleton placeholders to preview layout and content rhythm while
          data is loading.
        </p>
      </div>

      <div className="space-y-10">
        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Text lines
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Use varied line lengths to approximate headings and body copy.
            </p>
          </div>
          <div className="max-w-xl space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[88%]" />
            <Skeleton className="h-4 w-[72%]" />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Avatar and details
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Compact pattern for list rows, comments, or profile summaries.
            </p>
          </div>
          <div className="flex max-w-xl items-start gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="min-w-0 flex-1 space-y-3 pt-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[78%]" />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Card
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Larger placeholder treatment for cards, panels, or dashboard
              modules.
            </p>
          </div>
          <div className="max-w-xl rounded-md border-app border-border-subtle bg-background p-5">
            <div className="space-y-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-5 w-44" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[85%]" />
              </div>
              <div className="flex gap-3 pt-1">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
