import type { Metadata } from "next";
import { TeamMembersView } from "@/components/dashboard/team-members-view";

export const metadata: Metadata = {
  title: "Members",
};

export default function SettingsMembersPage() {
  return <TeamMembersView />;
}
