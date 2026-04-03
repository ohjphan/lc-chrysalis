import type { Metadata } from "next";
import { TabsView } from "@/components/design-system/component-pages/tabs-view";

export const metadata: Metadata = {
  title: "Tabs",
};

export default function DesignSystemTabsPage() {
  return <TabsView />;
}
