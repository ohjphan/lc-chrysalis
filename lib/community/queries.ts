import { seedCommunityProjects } from "@/lib/community/seed-projects";
import type { CommunityCategoryTag, CommunityProject } from "@/lib/community/types";

export function getAllCommunityProjects(): CommunityProject[] {
  return seedCommunityProjects;
}

export function getCommunityProjectBySlug(
  slug: string,
): CommunityProject | undefined {
  return seedCommunityProjects.find((p) => p.slug === slug);
}

export function getCommunityProjectSlugs(): string[] {
  return seedCommunityProjects.map((p) => p.slug);
}

export function getFeaturedCommunityProjects(
  tag: CommunityCategoryTag | "all" = "all",
): CommunityProject[] {
  return seedCommunityProjects.filter((p) => {
    if (!p.featured) return false;
    if (tag === "all") return true;
    return p.tags.includes(tag);
  });
}

export function getCommunityProjectsByType(
  type: CommunityProject["type"],
): CommunityProject[] {
  return seedCommunityProjects.filter((p) => p.type === type);
}

export function getTrendingCommunityProjects(limit = 6): CommunityProject[] {
  return [...seedCommunityProjects]
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, limit);
}

export function getOtherCommunityProjects(
  currentSlug: string,
): CommunityProject[] {
  return seedCommunityProjects.filter((p) => p.slug !== currentSlug);
}
