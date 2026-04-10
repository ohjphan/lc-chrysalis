import type { Metadata } from "next";
import { BadgesView } from "@/components/design-system/component-pages/badges-view";

export const metadata: Metadata = {
  title: "Tags",
};

export default function DesignSystemBadgesPage() {
  return <BadgesView />;
}
