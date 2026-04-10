import type { Metadata } from "next";
import { ModalView } from "@/components/design-system/component-pages/modal-view";

export const metadata: Metadata = {
  title: "Modal",
};

export default function DesignSystemModalPage() {
  return <ModalView />;
}
