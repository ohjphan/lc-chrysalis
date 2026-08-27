import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DemoExperienceShell } from "@/components/demo-experience/demo-experience-shell";

export const metadata: Metadata = {
  title: {
    template: "%s · LC Demos",
    default: "Demos · Learning Commons",
  },
  description:
    "Interactive Learning Commons demos—Evaluators and Knowledge Graph—so you can explore before you integrate.",
};

export default function DemoExperienceGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DemoExperienceShell>{children}</DemoExperienceShell>;
}
