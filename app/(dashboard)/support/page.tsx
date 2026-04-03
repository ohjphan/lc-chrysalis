import type { Metadata } from "next";
import { PageContainer } from "@/components/dashboard/page-container";
import { SupportPanel } from "@/components/dashboard/support-panel";

export const metadata: Metadata = {
  title: "Support",
};

export default function SupportPage() {
  return (
    <PageContainer>
      <div className="flex justify-center">
        <div className="w-full max-w-[23.75rem] rounded-lg border-app border-border-subtle bg-background shadow-xl">
          <SupportPanel showCloseButton={false} />
        </div>
      </div>
    </PageContainer>
  );
}
