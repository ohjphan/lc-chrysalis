import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommunityProjectView } from "@/components/community/community-project-view";
import {
  getCommunityProjectBySlug,
  getCommunityProjectSlugs,
} from "@/lib/community/queries";

export function generateStaticParams() {
  return getCommunityProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getCommunityProjectBySlug(slug);
  if (!project) {
    return { title: "Project" };
  }
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function DemosProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCommunityProjectBySlug(slug);
  if (!project) notFound();
  return <CommunityProjectView project={project} />;
}
