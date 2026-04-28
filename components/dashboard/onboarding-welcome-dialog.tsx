"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  Key,
  LayoutGrid,
  UserPlus,
} from "@/components/ui/material-symbols";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const iconWrapClass =
  "flex size-10 shrink-0 items-center justify-center rounded-md bg-accent-green/10 text-accent-green";

function NextStepRow({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={iconWrapClass}>{icon}</div>
      <p className="min-w-0 font-parabolica text-base font-[550] text-foreground">
        {title}
      </p>
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
      <DialogContent className="max-w-lg gap-0 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>You&apos;re all set!</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-3 pr-10 text-base font-normal leading-relaxed text-muted-foreground dark:text-zinc-400">
              <p className="m-0">
                Your organization{" "}
                <span className="font-parabolica font-[550] text-foreground">
                  {orgName || "your organization"}
                </span>{" "}
                has been created.
              </p>
              <p className="m-0">Now you can:</p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="px-9 pb-6">
          <ul className="space-y-5">
            <li>
                <NextStepRow
                icon={
                  <Key
                    className="size-5"
                    weight={300}
                    aria-hidden
                  />
                }
                  title="Create an API key"
                />
              </li>
              <li>
                <NextStepRow
                icon={
                  <LayoutGrid
                    className="size-5"
                    weight={300}
                    aria-hidden
                  />
                }
                  title="Browse datasets"
                />
              </li>
              <li>
                <NextStepRow
                icon={
                  <UserPlus
                    className="size-5"
                    weight={300}
                    aria-hidden
                  />
                }
                  title="Invite team members"
                />
              </li>
          </ul>
        </div>

        <DialogFooter className="mt-0 flex w-full flex-col sm:flex sm:flex-col sm:items-stretch">
          <Button variant="primary" size="lg" className="w-full" asChild>
            <Link href="/" onClick={() => onOpenChange(false)}>
              Got it
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
