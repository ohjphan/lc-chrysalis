import type { ReactNode } from "react";
import { DemoExperienceFooterGate } from "@/components/demo-experience/demo-experience-footer-gate";
import { DemoExperienceHeader } from "@/components/demo-experience/demo-experience-header";
import { DemoSubmitSection } from "@/components/demo-experience/demo-submit-section";
import { DASHBOARD_CONTENT_WIDTH_CLASS } from "@/components/dashboard/page-container";

export function DemoExperienceShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DemoExperienceHeader />
      <div className={`${DASHBOARD_CONTENT_WIDTH_CLASS} flex-1`}>{children}</div>
      <div className={DASHBOARD_CONTENT_WIDTH_CLASS}>
        <DemoSubmitSection />
      </div>
      <DemoExperienceFooterGate />
    </div>
  );
}
