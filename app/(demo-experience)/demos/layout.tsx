import type { ReactNode } from "react";
import { DemosAuthProvider } from "@/components/demo-experience/demos-auth-context";

export default function DemosNestedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DemosAuthProvider>{children}</DemosAuthProvider>;
}
