import type { Metadata } from "next";
import { TooltipView } from "@/components/design-system/component-pages/tooltip-view";

export const metadata: Metadata = {
  title: "Tooltip",
};

export default function DesignSystemTooltipPage() {
  return <TooltipView />;
}
