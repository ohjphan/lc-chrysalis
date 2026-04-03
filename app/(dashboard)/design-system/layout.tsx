import { DesignSystemLayoutClient } from "@/components/dashboard/design-system/design-system-layout-client";

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DesignSystemLayoutClient>{children}</DesignSystemLayoutClient>;
}
