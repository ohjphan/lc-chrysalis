import type { Metadata } from "next";
import { TeamMembersView } from "@/components/dashboard/team-members-view";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  return <TeamMembersView />;
}
