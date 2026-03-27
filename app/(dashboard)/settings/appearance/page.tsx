import type { Metadata } from "next";
import { AppearanceSettingsView } from "@/components/dashboard/settings/appearance-settings-view";

export const metadata: Metadata = {
  title: "Appearance",
};

export default function AppearanceSettingsPage() {
  return <AppearanceSettingsView />;
}
