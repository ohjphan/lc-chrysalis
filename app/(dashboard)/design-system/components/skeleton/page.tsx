import type { Metadata } from "next";
import { SkeletonView } from "@/components/design-system/component-pages/skeleton-view";

export const metadata: Metadata = {
  title: "Skeleton",
};

export default function DesignSystemSkeletonPage() {
  return <SkeletonView />;
}
