"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { PillToggleGroup } from "@/components/ui/pill-toggle-group";
import { DASHBOARD_CONTENT_WIDTH_CLASS } from "@/components/dashboard/page-container";
import { cn } from "@/lib/utils";

const ROLE_OPTIONS = [
  { value: "software_developer", label: "Software Developer/Engineer" },
  { value: "product_manager", label: "Product Manager" },
  { value: "data_scientist", label: "Data Scientist/Data Engineer" },
  { value: "content_creator", label: "Content Creator/Curriculum Designer" },
  { value: "education_researcher", label: "Education Researcher" },
  { value: "other", label: "Other" },
] as const;

type Role = (typeof ROLE_OPTIONS)[number]["value"];

const STEPS = 4;
const ACTIVE_STEP_INDEX = 1;

const progressPercent = Math.round(
  ((ACTIVE_STEP_INDEX + 1) / STEPS) * 100,
);

export function ProfileSetupView() {
  const router = useRouter();
  const [company, setCompany] = React.useState("");
  const [role, setRole] = React.useState<Role>("software_developer");
  const [otherRole, setOtherRole] = React.useState("");
  const [illustrationSrc, setIllustrationSrc] = React.useState(
    "/scene-person-profession.svg",
  );

  const companyOk = company.trim().length > 0;
  const otherOk = role !== "other" || otherRole.trim().length > 0;
  const canContinue = companyOk && otherOk;

  function finish() {
    router.push("/");
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center bg-[#faf9f8] px-4 dark:bg-background">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf9f8] dark:focus-visible:ring-offset-background"
        >
          <span className="min-w-0 flex-1 dark:hidden">
            <img
              src="/lc-logo.svg"
              alt="Learning Commons"
              width={229}
              height={23}
              className="h-[22px] w-auto max-w-full object-left object-contain"
            />
          </span>
          <span className="hidden min-w-0 flex-1 dark:block">
            <img
              src="/lc-logo-white.svg"
              alt="Learning Commons"
              width={229}
              height={23}
              className="h-[22px] w-auto max-w-full object-left object-contain"
            />
          </span>
        </Link>
      </header>

      <div
        className={cn(
          DASHBOARD_CONTENT_WIDTH_CLASS,
          "flex min-h-0 flex-1 flex-col overflow-y-auto py-8 pb-16",
        )}
      >
        <div className="my-auto flex w-full flex-col gap-10">
          <div className="mx-auto flex w-full min-w-0 max-w-full flex-col gap-0 overflow-hidden rounded-[4px] border-app border-border-subtle bg-background shadow-none md:w-[80%] dark:bg-sidebar">
            <div
              className="h-1 w-full shrink-0 bg-nav-active dark:bg-zinc-800"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Step ${ACTIVE_STEP_INDEX + 1} of ${STEPS}`}
            >
              <div
                className="h-full bg-accent-green transition-[width] duration-300 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="min-w-0 p-12">
              <PageTitle variant="authBranded">
                Tell us about your company and role
              </PageTitle>

              <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
                <div className="flex min-w-0 flex-col gap-8">
                  <Field id="profile-company" label="Company or organization name">
                    <Input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder=""
                      autoComplete="organization"
                    />
                  </Field>

                  <div className="stack-field">
                    <Label id="profile-role-label">Your role</Label>
                    <PillToggleGroup
                      aria-labelledby="profile-role-label"
                      options={ROLE_OPTIONS}
                      value={role}
                      onValueChange={(v) => {
                        setRole(v);
                        if (v !== "other") setOtherRole("");
                      }}
                    />
                    {role === "other" ? (
                      <Input
                        value={otherRole}
                        onChange={(e) => setOtherRole(e.target.value)}
                        placeholder="Describe your role"
                        aria-label="Describe your role"
                      />
                    ) : null}
                  </div>

                  <div className="mt-12 flex flex-col gap-6">
                    <div className="flex flex-row flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        onClick={() => router.back()}
                      >
                        <ArrowLeft />
                        Back
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        disabled={!canContinue}
                        onClick={finish}
                      >
                        Continue
                      </Button>
                    </div>

                    <Link
                      href="/"
                      className="w-fit text-sm font-normal text-foreground underline underline-offset-4 hover:opacity-90"
                    >
                      Skip for now
                    </Link>
                  </div>
                </div>

                <div className="flex h-full min-h-0 w-full items-center justify-center">
                  <img
                    src={illustrationSrc}
                    alt=""
                    width={432}
                    height={324}
                    className="w-[70%] max-w-full object-contain"
                    decoding="async"
                    onError={() => {
                      setIllustrationSrc("/scene-person-laptop-working.svg");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="mx-auto max-w-2xl text-center text-sm font-normal text-muted-foreground">
            This information helps us manage your account and improve our tools.
            <br />
            Learn more in our{" "}
            <Link
              href="/privacy-policy"
              className="font-medium text-foreground underline underline-offset-4 hover:opacity-90"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
