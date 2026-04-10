import type { Metadata } from "next";
import { RadioButtonsView } from "@/components/design-system/component-pages/radio-buttons-view";

export const metadata: Metadata = {
  title: "Radio buttons",
};

export default function DesignSystemRadioButtonsPage() {
  return <RadioButtonsView />;
}
