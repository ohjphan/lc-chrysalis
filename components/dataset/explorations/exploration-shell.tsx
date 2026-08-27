import type { ReactNode } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/dashboard/page-container";
import { PageTitle } from "@/components/ui/page-title";

export function DatasetExplorationShell({
  directionLabel,
  children,
}: {
  directionLabel: string;
  children: ReactNode;
}) {
  return (
    <PageContainer>
      <div className="mb-8 space-y-2">
        <p className="font-nav-eyebrow text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
          Layout exploration · {directionLabel}
        </p>
        <PageTitle>Dataset collections</PageTitle>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Compare how grouped Knowledge Graph and Evaluator datasets read in this
          layout. Mock data only. Production listing:{" "}
          <Link
            href="/dataset"
            className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
          >
            /dataset
          </Link>
          .
        </p>
      </div>
      {children}
    </PageContainer>
  );
}
