"use client";

import { usePathname } from "next/navigation";
import { DemoExperienceFooter } from "@/components/demo-experience/demo-experience-footer";

export function DemoExperienceFooterGate() {
  const pathname = usePathname();
  const condensed = pathname?.startsWith("/demos/projects/") ?? false;

  return <DemoExperienceFooter variant={condensed ? "condensed" : "full"} />;
}
