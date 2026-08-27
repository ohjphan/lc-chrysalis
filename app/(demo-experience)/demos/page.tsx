import type { Metadata } from "next";
import { CommunityLandingView } from "@/components/community/community-landing-view";
import { getFeaturedCommunityProjects } from "@/lib/community/queries";

export const metadata: Metadata = {
  title: "Demos",
  description:
    "Try interactive Learning Commons demos in your browser—explore real inputs and outputs, then continue with integration docs, starter configs, Playground, or Explorer.",
};

export default function DemosPage() {
  return (
    <CommunityLandingView featured={getFeaturedCommunityProjects("all")} />
  );
}
