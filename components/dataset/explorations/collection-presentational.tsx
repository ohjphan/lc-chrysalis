import type { ReactNode } from "react";
import { Lock } from "lucide-react";
import type { DatasetRequestTarget } from "@/components/dataset/request-access-modal";
import { ColorBadge } from "@/components/ui/color-badge";
import { brandAvatarClassesForId } from "@/lib/brand-avatar-colors";
import type {
  CollectionChildDataset,
  DatasetCollection,
  DatasetProduct,
} from "@/lib/dataset/collection-mock";
import { cn } from "@/lib/utils";

export function datasetProductLabel(product: DatasetProduct): string {
  return product === "knowledge-graph" ? "Knowledge Graph" : "Evaluators";
}

export function childToRequestTarget(
  collection: DatasetCollection,
  child: CollectionChildDataset,
): DatasetRequestTarget {
  const license =
    child.gated || child.action === "request"
      ? "Gated"
      : (collection.license ?? "CC BY 4.0");
  return {
    id: `${collection.id}:${child.id}`,
    providerKey: collection.providerKey,
    datasetName: `${collection.collectionName}: ${child.title}`,
    license,
    initials: collection.providerInitials,
  };
}

export function collectionToRequestTarget(
  collection: DatasetCollection,
): DatasetRequestTarget {
  const license =
    collection.license ??
    (collection.gated ? "Gated" : "CC BY 4.0");
  return {
    id: collection.id,
    providerKey: collection.providerKey,
    datasetName: collection.collectionName,
    license,
    initials: collection.providerInitials,
  };
}

export function CollectionProviderAvatar({
  collection,
  className,
}: {
  collection: DatasetCollection;
  className?: string;
}) {
  const { bgClass, textClass } = brandAvatarClassesForId(collection.id);
  return (
    <span
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        bgClass,
        textClass,
        className,
      )}
      aria-hidden
    >
      {collection.providerInitials}
    </span>
  );
}

export function CollectionProductPill({ product }: { product: DatasetProduct }) {
  return (
    <ColorBadge variant="gray" className="normal-case">
      {datasetProductLabel(product)}
    </ColorBadge>
  );
}

export function CollectionGatedPill() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border-app border-border-subtle bg-field-bg px-2 py-0.5 font-nav-eyebrow text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
      <Lock className="size-3 shrink-0" aria-hidden />
      Gated
    </span>
  );
}

export function MetaPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border-app border-border-subtle bg-sidebar px-2 py-0.5 font-nav-eyebrow text-[10px] font-medium uppercase tracking-wide text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
