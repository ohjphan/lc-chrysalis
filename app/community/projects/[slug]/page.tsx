import { CommunityProjectRedirect } from "@/components/community/community-project-redirect";
import { getCommunityProjectSlugs } from "@/lib/community/queries";

export function generateStaticParams() {
  return getCommunityProjectSlugs().map((slug) => ({ slug }));
}

export default async function CommunityProjectRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CommunityProjectRedirect slug={slug} />;
}
