import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export const metadata: Metadata = {
  title: "Organization settings",
};

export default function SettingsOrganizationPage() {
  return (
    <PlaceholderPage
      title="Organization settings"
      description="Branding, SSO, and audit policy for your workspace."
    />
  );
}
