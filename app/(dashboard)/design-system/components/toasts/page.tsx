import type { Metadata } from "next";
import { ToastsView } from "@/components/design-system/component-pages/toasts-view";

export const metadata: Metadata = {
  title: "Toast Notification",
};

export default function DesignSystemToastsPage() {
  return <ToastsView />;
}
