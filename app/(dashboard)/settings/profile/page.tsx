import type { Metadata } from "next";
import { ProfileSettingsView } from "@/components/dashboard/settings/profile-settings-view";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfileSettingsPage() {
  return <ProfileSettingsView />;
}
