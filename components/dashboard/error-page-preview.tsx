import { SpotlightBackground } from "@/components/landing/spotlight-background";
import { PageTitle } from "@/components/ui/page-title";

export function ErrorPagePreview() {
  return (
    <SpotlightBackground
      className="min-h-dvh w-full flex-1"
      veilClassName="bg-white dark:bg-background"
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center px-6 py-16 md:min-h-[min(100dvh,56rem)] md:px-10 md:py-20">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <img
            src="/404-page.svg"
            alt=""
            width={271}
            height={157}
            className="mb-8 h-auto w-[30%] max-w-[271px] shrink-0"
            aria-hidden
          />
          <PageTitle variant="heroMono">
            We can&apos;t find this page right now.
          </PageTitle>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            It may have wandered off or just needs a refresh.
          </p>
        </div>
      </div>
    </SpotlightBackground>
  );
}
