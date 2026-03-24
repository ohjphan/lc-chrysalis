import { PageContainer } from "@/components/dashboard/page-container";
import { PageTitle } from "@/components/ui/page-title";

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <PageContainer>
      <div className="flex flex-col gap-[12px]">
        <PageTitle>{title}</PageTitle>
        <p className="max-w-2xl text-base font-normal leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </PageContainer>
  );
}
