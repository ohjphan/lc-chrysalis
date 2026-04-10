import type { Metadata } from "next";
import { CheckboxView } from "@/components/design-system/component-pages/checkbox-view";

export const metadata: Metadata = {
  title: "Checkbox",
};

export default function DesignSystemCheckboxPage() {
  return <CheckboxView />;
}
