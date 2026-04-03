import type { Metadata } from "next";
import { PillsView } from "@/components/design-system/component-pages/pills-view";

export const metadata: Metadata = {
  title: "Pills",
};

export default function DesignSystemPillsPage() {
  return <PillsView />;
}
