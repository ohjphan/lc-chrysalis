import { DATASET_COLLECTION_MOCK } from "@/lib/dataset/collection-mock";
import {
  CollectionGatedPill,
  CollectionProductPill,
  CollectionProviderAvatar,
  MetaPill,
} from "@/components/dataset/explorations/collection-presentational";
import { DatasetExplorationShell } from "@/components/dataset/explorations/exploration-shell";

export function DatasetGridExplorationView() {
  return (
    <DatasetExplorationShell directionLabel="Grid">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DATASET_COLLECTION_MOCK.map((c) => (
          <article
            key={c.id}
            className="flex h-full flex-col rounded-[var(--radius-md)] border-app border-border-subtle bg-sidebar p-4 dark:bg-field-bg md:p-5"
          >
            <div className="flex items-start gap-3">
              <CollectionProviderAvatar collection={c} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-muted-foreground">
                  {c.providerName}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <h2 className="font-page-h3 text-pretty text-base font-semibold text-heading dark:text-foreground">
                    {c.collectionName}
                  </h2>
                  {c.gated ? <CollectionGatedPill /> : null}
                </div>
              </div>
            </div>
            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {c.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-app-t border-border-subtle pt-4">
              <CollectionProductPill product={c.product} />
              <MetaPill>{c.gradeRange}</MetaPill>
              <MetaPill className="tabular-nums">
                {c.datasetCount} sets
              </MetaPill>
            </div>
          </article>
        ))}
      </div>
    </DatasetExplorationShell>
  );
}
