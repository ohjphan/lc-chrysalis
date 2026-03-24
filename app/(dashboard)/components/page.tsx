import type { Metadata } from "next";
import { ComponentsGallery } from "@/components/design-system/components-gallery";

export const metadata: Metadata = {
  title: "Components",
};

export default function ComponentsPage() {
  return <ComponentsGallery />;
}
