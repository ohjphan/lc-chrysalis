"use client";

import * as React from "react";
import { ImageUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function sectionTitleClass() {
  return "font-page-h2 text-heading dark:text-foreground";
}

export function ProfileSettingsView() {
  const [displayName, setDisplayName] = React.useState("Jessica Phan");
  const [email, setEmail] = React.useState("jessica@example.com");
  const [hasAvatar, setHasAvatar] = React.useState(false);

  const [saved, setSaved] = React.useState({
    displayName: "Jessica Phan",
    email: "jessica@example.com",
    hasAvatar: false,
  });

  const dirty =
    displayName !== saved.displayName ||
    email !== saved.email ||
    hasAvatar !== saved.hasAvatar;

  function save() {
    setSaved({ displayName, email, hasAvatar });
  }

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <h2 className={sectionTitleClass()}>Profile</h2>
        <div className="grid gap-8 lg:grid-cols-[1fr_min(240px,100%)] lg:items-start">
          <div className="space-y-6">
            <Field id="profile-display-name" label="Display name">
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="name"
              />
            </Field>
            <Field
              id="profile-email"
              label="Email"
              description="Used for sign-in and notifications in this demo."
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </Field>
          </div>
          <div className="stack-field">
            <span className="text-base font-medium text-[#242423] dark:text-foreground">
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
          disabled={!dirty}
          onClick={save}
        >
          Save
        </Button>
      </section>
    </div>
  );
}
