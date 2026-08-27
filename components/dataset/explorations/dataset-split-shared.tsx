"use client";

import type { ReactNode } from "react";
import { ExternalLink, FileText } from "lucide-react";
import type { CollectionSidebarMeta, RelatedDatasetCard } from "@/lib/dataset/collection-mock";
import { brandAvatarClassesForId } from "@/lib/brand-avatar-colors";
import { cn } from "@/lib/utils";

type SidebarMeta = CollectionSidebarMeta;

export function RelatedDatasetCardTile({ card }: { card: RelatedDatasetCard }) {
  const { bgClass, textClass } = brandAvatarClassesForId(card.refId);
  return (
    <div className="flex min-w-0 max-w-sm gap-3 rounded-[var(--radius-md)] border-app border-border-subtle bg-field-bg px-4 py-3 dark:bg-background">
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          bgClass,
          textClass,
        )}
        aria-hidden
      >
        {card.providerInitials}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{card.providerName}</p>
        <p className="mt-0.5 font-medium text-foreground">{card.title}</p>
      </div>
    </div>
  );
}

export function CollectionSidebar({
  meta,
  className,
}: {
  meta: SidebarMeta;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-[var(--radius-md)] border-app border-border-subtle bg-sidebar p-5 dark:bg-field-bg md:p-6",
        className,
      )}
    >
      <SidebarBlock title="Categories">
        <div className="flex flex-wrap gap-2">
          {meta.categories.map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full border-app border-border-subtle bg-field-bg px-2.5 py-1 text-xs font-normal text-foreground dark:bg-background"
            >
              {tag}
            </span>
          ))}
        </div>
      </SidebarBlock>

      <SidebarBlock title="Provider" className="mt-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {meta.providerAbout}
        </p>
      </SidebarBlock>

      <SidebarBlock title="License" className="mt-8">
        <p className="text-sm text-muted-foreground">{meta.licenseNote}</p>
      </SidebarBlock>

      <SidebarBlock title="Formats" className="mt-8">
        <ul className="flex flex-wrap gap-2">
          {meta.formats.map((fmt) => (
            <li key={fmt}>
              <span className="inline-flex items-center gap-1.5 rounded-full border-app border-border-subtle bg-field-bg px-2.5 py-1 text-xs font-normal text-foreground dark:bg-background">
                <FileText className="size-3.5 shrink-0 opacity-70" aria-hidden />
                {fmt}
              </span>
            </li>
          ))}
        </ul>
      </SidebarBlock>

      <SidebarBlock title="Documentation" className="mt-8">
        <a
          href={meta.documentationHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
        >
          {meta.documentationLabel}
          <ExternalLink className="size-3.5 shrink-0 opacity-80" aria-hidden />
        </a>
      </SidebarBlock>
    </aside>
  );
}

function SidebarBlock({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <h4 className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
        {title}
      </h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}
