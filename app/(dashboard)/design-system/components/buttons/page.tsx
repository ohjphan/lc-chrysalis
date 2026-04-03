import type { Metadata } from "next";
import { ButtonsView } from "@/components/design-system/component-pages/buttons-view";

export const metadata: Metadata = {
  title: "Buttons",
};

export default function DesignSystemButtonsPage() {
  return <ButtonsView />;
}
