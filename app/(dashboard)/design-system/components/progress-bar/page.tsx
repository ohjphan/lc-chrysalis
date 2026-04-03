import type { Metadata } from "next";
import { ProgressBarView } from "@/components/design-system/component-pages/progress-bar-view";

export const metadata: Metadata = {
  title: "Progress bar",
};

export default function DesignSystemProgressBarPage() {
  return <ProgressBarView />;
}
