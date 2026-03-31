"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Key, LayoutGrid, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const iconWrapClass =
  "flex size-10 shrink-0 items-center justify-center rounded-md bg-accent-green/15 text-accent-green";

function NextStepRow({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className={iconWrapClass}>{icon}</div>
      <div className="min-w-0">
        <p className="font-parabolica text-base font-[550] text-foreground">
          {title}
        </p>
        <p className="mt-1 text-base font-normal text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export function OnboardingWelcomeDialog({
  open,
  onOpenChange,
  orgName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orgName: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-6 px-9 pb-8 pt-6 sm:max-w-lg">
        <DialogHeader className="px-0 pb-2 pt-0">
          <DialogTitle className="font-page-title text-2xl font-normal tracking-[0.005em] text-heading">
            You&apos;re all set!
          </DialogTitle>
        </DialogHeader>
        <p className="text-base font-normal text-muted-foreground">
          Your organization{" "}
          <span className="font-parabolica font-[550] text-foreground">
            {orgName || "your organization"}
          </span>{" "}
          has been created.
        </p>
        <div className="space-y-6 border-app-t border-border-subtle pt-2">
          <p className="font-parabolica text-base font-[550] text-foreground">
            Next steps…
          </p>
          <ul className="space-y-5">
            <li>
              <NextStepRow
                icon={<Key className="size-5" strokeWidth={2} aria-hidden />}
                title="Create an API key"
                description="Generate your first API key to start accessing datasets."
              />
            </li>
            <li>
              <NextStepRow
                icon={
                  <LayoutGrid className="size-5" strokeWidth={2} aria-hidden />
                }
                title="Browse datasets"
                description="Explore available datasets and request access to gated ones."
              />
            </li>
            <li>
              <NextStepRow
                icon={
                  <UserPlus className="size-5" strokeWidth={2} aria-hidden />
                }
                title="Invite team members"
                description="Add colleagues to collaborate on your organization."
              />
            </li>
          </ul>
        </div>
        <Button variant="primary" size="lg" className="w-full" asChild>
          <Link href="/" onClick={() => onOpenChange(false)}>
            Go to dashboard
          </Link>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
