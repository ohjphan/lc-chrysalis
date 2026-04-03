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
import { PillMultiToggleGroup } from "@/components/ui/pill-multi-toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { DASHBOARD_CONTENT_WIDTH_CLASS } from "@/components/dashboard/page-container";
import { cn } from "@/lib/utils";

const SESSION_WELCOME_KEY = "lc_onboarding_welcome";

const STEP_COUNT = 6;

const ROLE_OPTIONS = [
  { value: "software_developer", label: "Software Developer/Engineer" },
  { value: "product_manager", label: "Product Manager" },
  { value: "data_scientist", label: "Data Scientist/Data Engineer" },
  { value: "content_creator", label: "Content Creator/Curriculum Designer" },
  { value: "education_researcher", label: "Education Researcher" },
  { value: "other", label: "Other" },
] as const;

type Role = (typeof ROLE_OPTIONS)[number]["value"];

const USE_CASE_OPTIONS = [
  {
    value: "align_standards",
    label: "Align content to standards and learning goals",
  },
  { value: "improve_ai", label: "Improve AI-generated content" },
  { value: "evaluate_prompts", label: "Evaluate prompts or models" },
  { value: "monitor_quality", label: "Monitor output quality over time" },
  {
    value: "user_evaluations",
    label: "Allow users to run evaluations of outputs",
  },
  { value: "human_review", label: "Enable human review and evaluation" },
  { value: "use_other", label: "Other" },
] as const;

type UseCaseId = (typeof USE_CASE_OPTIONS)[number]["value"];

const HEARD_OPTIONS = [
  { value: "github", label: "GitHub" },
  { value: "dev_docs", label: "Developer documentation" },
  { value: "event", label: "Event" },
  { value: "blog", label: "Blog" },
  { value: "news", label: "News article" },
  { value: "word_of_mouth", label: "Word of mouth" },
  { value: "social", label: "Social media" },
  { value: "advertisement", label: "Advertisement" },
  { value: "search", label: "Search" },
  { value: "heard_other", label: "Other" },
] as const;

type HeardId = (typeof HEARD_OPTIONS)[number]["value"];

const STEP_TITLES = [
  "Accept our terms",
  "Tell us about yourself",
  "Let's set up your new organization",
  "Let's invite your team",
  "Tell us how you want to use the tools",
  "Tell us how you heard about us",
] as const;

function calloutClass() {
  return cn(
    "rounded-md border-app border-border-subtle bg-field-bg/80 p-4 text-base font-normal text-muted-foreground dark:bg-field-bg/40",
  );
}

function parseInviteEmails(raw: string): string[] {
  return raw
    .split(/[;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
}

export function ProfileSetupView() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);

  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [role, setRole] = React.useState<Role>("software_developer");
  const [otherRole, setOtherRole] = React.useState("");

  const [organizationName, setOrganizationName] = React.useState("");

  const [inviteEmailsRaw, setInviteEmailsRaw] = React.useState("");

  const [useCases, setUseCases] = React.useState<UseCaseId[]>([]);

  const [heardAbout, setHeardAbout] = React.useState<HeardId[]>([]);

  const [illustrationSrc, setIllustrationSrc] = React.useState(
    "/scene-person-profession.svg",
  );

  const progressPercent = Math.round(((step + 1) / STEP_COUNT) * 100);

  const nameOk =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    (role !== "other" || otherRole.trim().length > 0);

  const canContinue = (() => {
    switch (step) {
      case 0:
        return termsAccepted;
      case 1:
        return nameOk;
      case 2:
        return organizationName.trim().length > 0;
      case 3:
        return true;
      case 4:
        return useCases.length > 0;
      case 5:
        return heardAbout.length > 0;
      default:
        return false;
    }
  })();

  function skipToHome() {
    router.push("/");
  }

  function completeOnboarding() {
    try {
      sessionStorage.setItem(
        SESSION_WELCOME_KEY,
        JSON.stringify({
          orgName: organizationName.trim() || "your organization",
        }),
      );
    } catch {
      /* ignore */
    }
    router.push("/");
  }

  function goNext() {
    if (step < STEP_COUNT - 1) {
      setStep((s) => s + 1);
    } else {
      completeOnboarding();
    }
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1);
    else router.back();
  }

  function toggleUseCase(id: UseCaseId) {
    setUseCases((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="sticky top-0 z-40 flex h-[60px] shrink-0 items-center bg-sidebar px-4 dark:bg-background">
        <Link
          href="/"
          className="flex min-h-0 min-w-0 flex-1 items-center gap-2 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar dark:focus-visible:ring-offset-background"
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
              aria-label={`Step ${step + 1} of ${STEP_COUNT}`}
            >
              <div
                className="h-full bg-accent-green transition-[width] duration-300 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="min-w-0 p-12">
              <PageTitle variant="onboarding">{STEP_TITLES[step]}</PageTitle>

              <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
                <div className="flex min-w-0 flex-col gap-8">
                  {step === 0 ? (
                    <>
                      <div className="stack-field">
                        <p className="text-base font-normal text-muted-foreground">
                          Please read and accept our terms to continue setting up
                          your account.
                        </p>
                        <label className="flex cursor-pointer gap-3 pt-1">
                          <Checkbox
                            checked={termsAccepted}
                            onCheckedChange={(v) =>
                              setTermsAccepted(Boolean(v))
                            }
                            className="mt-1"
                          />
                          <span className="text-base font-normal leading-snug text-foreground">
                            I agree to the{" "}
                            <Link
                              href="/terms-of-use"
                              className="font-medium underline underline-offset-4 hover:opacity-90"
                            >
                              Terms of use
                            </Link>
                            .
                          </span>
                        </label>
                      </div>
                    </>
                  ) : null}

                  {step === 1 ? (
                    <>
                      <Field id="onboard-first-name" label="First name">
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          autoComplete="given-name"
                        />
                      </Field>
                      <Field
                        id="onboard-last-name"
                        label="Last name"
                        description={undefined}
                      >
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          autoComplete="family-name"
                        />
                      </Field>
                      <div className="stack-field">
                        <Label id="onboard-role-label">Your role</Label>
                        <PillToggleGroup
                          aria-labelledby="onboard-role-label"
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
                    </>
                  ) : null}

                  {step === 2 ? (
                    <>
                      <Field id="onboard-org-name" label="Organization name">
                        <Input
                          value={organizationName}
                          onChange={(e) => setOrganizationName(e.target.value)}
                          placeholder="Your organization"
                          autoComplete="organization"
                        />
                      </Field>
                      <div className={calloutClass()}>
                        <p className="font-medium text-foreground">
                          As an Admin of this organization, you&apos;ll have…
                        </p>
                        <ul className="mt-3 list-disc space-y-2 pl-5">
                          <li>Access to open datasets immediately</li>
                          <li>Ability to request access to gated datasets</li>
                          <li>
                            Organization-scoped API keys for secure access
                          </li>
                          <li>Ability to invite and manage team members</li>
                        </ul>
                      </div>
                    </>
                  ) : null}

                  {step === 3 ? (
                    <>
                      <div className="stack-field">
                        <Label htmlFor="onboard-invite-emails">
                          Team member emails
                        </Label>
                        <p className="text-base font-normal text-muted-foreground">
                          Enter one or more email addresses, separated by
                          semicolons.
                        </p>
                        <Textarea
                          id="onboard-invite-emails"
                          className="min-h-[120px]"
                          placeholder="e.g., john@company.com; jane@company.com"
                          value={inviteEmailsRaw}
                          onChange={(e) => setInviteEmailsRaw(e.target.value)}
                        />
                        {inviteEmailsRaw.trim() ? (
                          <p className="text-sm text-muted-foreground">
                            {parseInviteEmails(inviteEmailsRaw).length} valid
                            address
                            {parseInviteEmails(inviteEmailsRaw).length === 1
                              ? ""
                              : "es"}{" "}
                            detected
                          </p>
                        ) : null}
                      </div>
                      <div className={calloutClass()}>
                        <p>
                          <span className="font-medium text-foreground">
                            Note:
                          </span>{" "}
                          Invited members will be added as Members by default.
                          You can change their role to Admin on the Team Members
                          settings.
                        </p>
                      </div>
                    </>
                  ) : null}

                  {step === 4 ? (
                    <div className="stack-field">
                      <Label id="onboard-use-cases-label">
                        Select all that apply
                      </Label>
                      <ul
                        className="space-y-4"
                        aria-labelledby="onboard-use-cases-label"
                      >
                        {USE_CASE_OPTIONS.map((opt) => (
                          <li key={opt.value}>
                            <label className="flex cursor-pointer gap-3">
                              <Checkbox
                                checked={useCases.includes(opt.value)}
                                onCheckedChange={() =>
                                  toggleUseCase(opt.value)
                                }
                                className="mt-0.5"
                              />
                              <span className="text-base font-normal leading-snug text-foreground">
                                {opt.label}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {step === 5 ? (
                    <div className="stack-field">
                      <Label id="onboard-heard-label">
                        How did you hear about us?
                      </Label>
                      <p className="text-base font-normal text-muted-foreground">
                        Select any that apply.
                      </p>
                      <PillMultiToggleGroup<HeardId>
                        aria-labelledby="onboard-heard-label"
                        options={HEARD_OPTIONS}
                        value={heardAbout}
                        onValueChange={setHeardAbout}
                      />
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-col gap-6">
                    <div className="flex flex-row flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        onClick={goBack}
                      >
                        <ArrowLeft />
                        Back
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        disabled={!canContinue}
                        onClick={goNext}
                      >
                        Continue
                      </Button>
                    </div>

                    {step !== 0 ? (
                      <button
                        type="button"
                        onClick={skipToHome}
                        className="w-fit text-sm font-normal text-foreground underline underline-offset-4 hover:opacity-90"
                      >
                        Skip for now
                      </button>
                    ) : null}
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
