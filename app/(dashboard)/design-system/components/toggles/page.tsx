import type { Metadata } from "next";
import { TogglesView } from "@/components/design-system/component-pages/toggles-view";

export const metadata: Metadata = {
  title: "Toggles",
};

export default function DesignSystemTogglesPage() {
  return <TogglesView />;
}
