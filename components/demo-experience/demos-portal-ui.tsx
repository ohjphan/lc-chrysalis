"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDemosAuth } from "@/components/demo-experience/demos-auth-context";
import { cn } from "@/lib/utils";

function PortalAuthActions({ className }: { className?: string }) {
  const { grantPortalAccessPreview } = useDemosAuth();
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
        className,
      )}
    >
      <Button variant="primary" className="h-10 w-full sm:w-auto" asChild>
        <Link href="/signup">Sign in</Link>
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="h-10 w-full sm:w-auto"
        onClick={() => grantPortalAccessPreview()}
      >
        I&apos;m signed in — unlock
      </Button>
    </div>
  );
}

/** Strip on landing / project pages. */
export function PortalSessionBanner() {
  const { portalAccess, hydrated, grantPortalAccessPreview, signOutDemo } =
    useDemosAuth();

  if (!hydrated) {
    return (
      <div
        className="rounded-[var(--radius-md)] border-app border-border-subtle bg-field-bg px-4 py-3 dark:bg-background"
        aria-hidden
      >
        <div className="h-5 max-w-xl animate-pulse rounded bg-muted-foreground/15" />
      </div>
    );
  }

  if (portalAccess) {
    return (
      <div className="flex flex-col gap-3 rounded-[var(--radius-md)] border-app border-border-subtle bg-sidebar px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:bg-field-bg">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Portal access on.</span>{" "}
          The header Remix shortcut copies config for this browser (preview until
          SSO is wired). Integrate tab is always available.
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="h-9 shrink-0 self-start sm:self-auto"
          onClick={() => signOutDemo()}
        >
          Sign out (preview)
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-md)] border-app border-border-subtle bg-sidebar px-4 py-3 dark:bg-field-bg">
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Guest mode.</span> Try
        every Demo and read About. The Integrate tab has full config and docs.
        Use Sign in below if you want the header Remix shortcut without the
        dialog.
      </p>
      <PortalAuthActions className="mt-3" />
    </div>
  );
}

export function RemixPortalSignInDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { grantPortalAccessPreview } = useDemosAuth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent variant="single" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in to remix config</DialogTitle>
          <DialogDescription>
            Copying remix JSON is an integration step. Sign in to the Learning
            Commons developer portal to continue, or unlock locally if you
            already authenticated in another tab.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            Not now
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => {
              grantPortalAccessPreview();
              onOpenChange(false);
            }}
          >
            I&apos;m signed in — unlock
          </Button>
          <Button variant="primary" asChild className="w-full sm:w-auto">
            <Link href="/signup">Sign in</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
