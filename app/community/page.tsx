"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Client redirect — next.config redirects are unsupported with `output: "export"`. */
export default function CommunityRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/demos");
  }, [router]);

  return (
    <main className="flex min-h-[40vh] items-center justify-center px-6 text-sm text-[color:var(--muted-foreground,#55554e)]">
      Redirecting to demos…
    </main>
  );
}
