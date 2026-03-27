import type { Metadata } from "next";
import Link from "next/link";
import { SpotlightBackground } from "@/components/landing/spotlight-background";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = {
  title: "Welcome",
  description:
    "Access API keys for Knowledge Graph to access education standards, learning progressions, and aligned components through our REST API.",
};

export default function HomePage() {
  return (
    <SpotlightBackground
      className="min-h-dvh w-full flex-1"
      veilClassName="bg-white dark:bg-background"
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center px-6 py-16 md:min-h-[min(100dvh,56rem)] md:px-10 md:py-20">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          <img
            src="/lc-logomark.svg"
            alt=""
            width={41}
            height={27}
            className="mb-8 h-[27px] w-[41px] shrink-0 max-w-none"
            aria-hidden
          />
          <PageTitle variant="heroMono">
            Welcome to the Learning Commons Platform
          </PageTitle>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Access API keys for Knowledge Graph to access education standards,
            learning progressions, and aligned components through our REST API.
          </p>
          <Button variant="primary" className="mt-8" asChild>
            <Link href="/api-keys">Get a key</Link>
          </Button>
        </div>
      </div>
    </SpotlightBackground>
  );
}
