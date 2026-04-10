"use client";

import * as React from "react";
import { Check, ImageUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toastSuccess } from "@/lib/toast-variants";
import { VerifySecondaryEmailDialog } from "@/components/dashboard/settings/verify-secondary-email-dialog";

function sectionTitleClass() {
  return "font-page-h2 text-heading dark:text-foreground";
}

export function ProfileSettingsView() {
  const [displayName, setDisplayName] = React.useState("Jessica Phan");
  const [email, setEmail] = React.useState("jessica@example.com");
  const [secondaryEmail, setSecondaryEmail] = React.useState("");
  const [hasAvatar, setHasAvatar] = React.useState(false);

  const [saved, setSaved] = React.useState({
    displayName: "Jessica Phan",
    email: "jessica@example.com",
    secondaryEmail: "",
    hasAvatar: false,
  });

  const [secondaryEmailVerified, setSecondaryEmailVerified] =
    React.useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = React.useState(false);

  const dirty =
    displayName !== saved.displayName ||
    hasAvatar !== saved.hasAvatar ||
    secondaryEmail.trim() !== saved.secondaryEmail;

  const savedSecondaryNonEmpty = saved.secondaryEmail !== "";
  const draftMatchesSavedSecondary =
    secondaryEmail.trim() === saved.secondaryEmail;
  const showVerifiedStatus =
    savedSecondaryNonEmpty &&
    secondaryEmailVerified &&
    draftMatchesSavedSecondary;
  const showUnverifiedButton =
    savedSecondaryNonEmpty && !showVerifiedStatus;

  function save() {
    const prevSecondary = saved.secondaryEmail;
    const nextSecondary = secondaryEmail.trim();

    setSaved({
      displayName,
      email,
      hasAvatar,
      secondaryEmail: nextSecondary,
    });
    setSecondaryEmail(nextSecondary);

    if (nextSecondary === "") {
      setSecondaryEmailVerified(false);
    } else if (nextSecondary !== prevSecondary) {
      setSecondaryEmailVerified(false);
    }
  }

  return (
    <div className="space-y-10">
      <h2 className={sectionTitleClass()}>Profile</h2>
      <section className="flex flex-col gap-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_min(240px,100%)] lg:items-start">
          <div className="max-w-2xl space-y-6">
            <Field id="profile-display-name" label="Display name">
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="name"
              />
            </Field>
            <div className="stack-field">
              <Label htmlFor="profile-email">Email</Label>
              <div className="flex h-10 w-full items-center gap-2 rounded-md border-0 bg-transparent pl-0 pr-0 dark:bg-transparent">
                <input
                  id="profile-email"
                  type="email"
                  readOnly
                  value={email}
                  autoComplete="email"
                  className="min-w-0 flex-1 cursor-default border-0 bg-transparent py-2 text-base font-normal text-foreground outline-none read-only:focus:outline-none dark:text-zinc-100"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled
                  className="h-8 shrink-0 gap-1.5 border-0 bg-transparent px-2.5 text-muted-foreground shadow-none hover:bg-transparent disabled:opacity-100 dark:bg-transparent dark:hover:bg-transparent"
                  aria-label="Primary email verified"
                >
                  <Check
                    className="size-3.5 shrink-0 text-accent-green"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  Verified
                </Button>
              </div>
            </div>
            <div className="stack-field">
              <Label htmlFor="profile-secondary-email">Secondary email</Label>
              {showVerifiedStatus ? (
                <div className="flex h-10 w-full items-center gap-2 rounded-md border-0 bg-transparent pl-0 pr-0 dark:bg-transparent">
                  <input
                    id="profile-secondary-email"
                    type="email"
                    readOnly
                    value={secondaryEmail}
                    autoComplete="email"
                    className="min-w-0 flex-1 cursor-default border-0 bg-transparent py-2 text-base font-normal text-foreground outline-none read-only:focus:outline-none dark:text-zinc-100"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled
                    className="h-8 shrink-0 gap-1.5 border-0 bg-transparent px-2.5 text-muted-foreground shadow-none hover:bg-transparent disabled:opacity-100 dark:bg-transparent dark:hover:bg-transparent"
                    aria-label="Secondary email verified"
                  >
                    <Check
                      className="size-3.5 shrink-0 text-accent-green"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    Verified
                  </Button>
                </div>
              ) : showUnverifiedButton ? (
                <div
                  className={cn(
                    "flex h-[length:var(--control-height)] w-full items-center gap-2 rounded-md border-app border-border-subtle bg-field-bg pl-3.5 pr-1.5 transition-colors",
                    "focus-within:outline-none focus-within:ring-2 focus-within:ring-border-subtle focus-within:ring-offset-2 focus-within:ring-offset-background",
                    "dark:border-zinc-600 dark:bg-zinc-950/80",
                  )}
                >
                  <input
                    id="profile-secondary-email"
                    type="email"
                    value={secondaryEmail}
                    onChange={(e) => setSecondaryEmail(e.target.value)}
                    autoComplete="email"
                    className="min-w-0 flex-1 border-0 bg-transparent py-2 text-base font-normal text-foreground outline-none placeholder:text-muted-foreground focus:outline-none focus-visible:ring-0 dark:text-zinc-100"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-8 shrink-0 px-2.5 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                    onClick={() => setVerifyModalOpen(true)}
                  >
                    Unverified
                  </Button>
                </div>
              ) : (
                <Input
                  id="profile-secondary-email"
                  type="email"
                  value={secondaryEmail}
                  onChange={(e) => setSecondaryEmail(e.target.value)}
                  autoComplete="email"
                />
              )}
            </div>
          </div>
          <div className="stack-field">
            <span className="text-base font-medium text-heading dark:text-foreground">
              Profile photo
            </span>
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-lg border-app border-dashed border-border-subtle bg-field-bg/50 px-4 py-8 text-center",
              )}
            >
              <ImageUp className="size-8 text-muted-foreground" aria-hidden />
              <p className="text-sm text-muted-foreground">
                JPG, PNG, or GIF. Max 5MB
              </p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setHasAvatar(true)}
              >
                Upload
              </Button>
              {hasAvatar ? (
                <button
                  type="button"
                  className="text-sm font-normal text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  onClick={() => setHasAvatar(false)}
                >
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <Button
          type="button"
          variant="primary"
          className="w-fit"
          disabled={!dirty}
          onClick={save}
        >
          Save
        </Button>
      </section>

      <VerifySecondaryEmailDialog
        open={verifyModalOpen}
        onOpenChange={setVerifyModalOpen}
        email={saved.secondaryEmail}
        onVerified={() => {
          setSecondaryEmailVerified(true);
          toastSuccess({
            message: "Secondary email verified",
            description: `${saved.secondaryEmail} is now confirmed.`,
          });
        }}
      />
    </div>
  );
}
