import type { Metadata } from "next";
import { IconsView } from "@/components/design-system/component-pages/icons-view";

export const metadata: Metadata = {
  title: "Icons",
};

export default function DesignSystemIconsPage() {
  return <IconsView />;
}
