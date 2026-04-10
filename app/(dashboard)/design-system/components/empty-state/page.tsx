import type { Metadata } from "next";
import { EmptyStateView } from "@/components/design-system/component-pages/empty-state-view";

export const metadata: Metadata = {
  title: "Empty state",
};

export default function DesignSystemEmptyStatePage() {
  return <EmptyStateView />;
}
