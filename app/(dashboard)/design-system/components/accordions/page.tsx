import type { Metadata } from "next";
import { AccordionsView } from "@/components/design-system/component-pages/accordions-view";

export const metadata: Metadata = {
  title: "Accordions",
};

export default function DesignSystemAccordionsPage() {
  return <AccordionsView />;
}
