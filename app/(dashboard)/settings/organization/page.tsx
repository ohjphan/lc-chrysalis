import type { Metadata } from "next";
import { OrganizationSettingsView } from "@/components/dashboard/settings/organization-settings-view";

export const metadata: Metadata = {
  title: "Organization settings",
};

export default function SettingsOrganizationPage() {
  return <OrganizationSettingsView />;
}
