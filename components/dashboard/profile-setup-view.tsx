"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { PillToggleGroup } from "@/components/ui/pill-toggle-group";
import { SingleSelectField } from "@/components/ui/single-select-field";
import { Checkbox } from "@/components/ui/checkbox";
import { SignupFooter } from "@/components/ui/signup-footer";
import { AUTH_CARD_SHELL_UNIFORM } from "@/lib/auth-card-shell";

const SESSION_WELCOME_KEY = "lc_onboarding_welcome";

const STEP_COUNT = 5;

const ROLE_OPTIONS = [
  { value: "software_developer", label: "Software developer/Engineer" },
  { value: "product_manager", label: "Product manager" },
  { value: "data_scientist", label: "Data scientist/Data engineer" },
  { value: "content_creator", label: "Content creator/Curriculum designer" },
  { value: "education_researcher", label: "Education researcher" },
  { value: "other", label: "Something else" },
] as const;

const ORG_PROFILE_OPTIONS = [
  { value: "k12", label: "K–12 school or district" },
  { value: "higher_ed", label: "College or university" },
  { value: "edtech", label: "EdTech or education company" },
  { value: "nonprofit", label: "Non-profit or foundation" },
  { value: "government", label: "Government or agency" },
  { value: "other_org", label: "Something else" },
] as const;

type OrgProfile = (typeof ORG_PROFILE_OPTIONS)[number]["value"];

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

/** Placeholder value so no chip appears selected until the user picks one. */
const HEARD_UNSET = "unset" as const;
type HeardSelection = HeardId | typeof HEARD_UNSET;

const STEP_TITLES = [
  "To create your account, review and accept our terms",
  "Tell us about yourself",
  "Create your organization",
  "Tell us how you want to use the tools",
  "Tell us how you heard about us",
] as const;

/** Keeps the onboarding card height stable between steps; body scrolls if needed. */
const ONBOARDING_CARD_FRAME =
  "flex w-full min-w-0 max-w-[440px] h-[min(90dvh,40rem)] flex-col overflow-hidden rounded-[4px] border-app border-border-subtle bg-background shadow-none dark:bg-sidebar";

function isValidOptionalUrl(raw: string): boolean {
  const t = raw.trim();
  if (!t) return true;
  try {
    new URL(t.includes("://") ? t : `https://${t}`);
    return true;
  } catch {
    return false;
  }
}

export function ProfileSetupView() {
  const router = useRouter();
  const [step, setStep] = React.useState(0);

  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [termsError, setTermsError] = React.useState(false);
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState<Role>("software_developer");
  const [otherRole, setOtherRole] = React.useState("");

  const [organizationName, setOrganizationName] = React.useState("");
  const [organizationUrl, setOrganizationUrl] = React.useState("");
  const [orgProfile, setOrgProfile] = React.useState<OrgProfile>("k12");
  const [otherOrgProfile, setOtherOrgProfile] = React.useState("");

  const [useCases, setUseCases] = React.useState<UseCaseId[]>([]);

  const [heardAbout, setHeardAbout] =
    React.useState<HeardSelection>(HEARD_UNSET);

  const progressPercent = Math.round(((step + 1) / STEP_COUNT) * 100);

  const nameOk =
    name.trim().length > 0 &&
    (role !== "other" || otherRole.trim().length > 0);

  const canContinue = (() => {
    switch (step) {
      case 0:
        return termsAccepted;
      case 1:
        return nameOk;
      case 2: {
        const otherOk =
          orgProfile !== "other_org" || otherOrgProfile.trim().length > 0;
        return (
          organizationName.trim().length > 0 &&
          otherOk &&
          isValidOptionalUrl(organizationUrl)
        );
      }
      case 3:
        return useCases.length > 0;
      case 4:
        return heardAbout !== HEARD_UNSET;
      default:
        return false;
    }
  })();

  function completeOnboarding() {
    try {
      sessionStorage.setItem(
        SESSION_WELCOME_KEY,
        JSON.stringify({
          orgName: organizationName.trim() || "your organization",
          orgUrl: organizationUrl.trim() || undefined,
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

  function toggleUseCase(id: UseCaseId) {
    setUseCases((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  if (step === 0) {
    return (
      <div className="flex min-h-[100dvh] min-w-0 flex-1 flex-col bg-sidebar dark:bg-background">
        <header className="sticky top-0 z-40 flex h-[60px] shrink-0 items-center bg-transparent px-4">
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

        <main className="flex flex-1 flex-col items-center px-6 py-6 pb-40 md:px-8 md:py-8 md:pb-44">
          <div className="mb-6 flex justify-center">
            <img
              src="/scene-person-laptop-working.svg"
              alt=""
              width={90}
              height={68}
              className="h-auto w-[90px] max-w-[90px] object-contain"
              decoding="async"
            />
          </div>

          <p className="mb-8 max-w-lg text-balance text-center font-mono text-[28px] font-light uppercase leading-tight tracking-[5%] text-heading">
            Build with Learning Commons
          </p>

          <div className={AUTH_CARD_SHELL_UNIFORM}>
            <PageTitle
              variant="onboarding"
              className="shrink-0 text-balance text-center"
            >
              {STEP_TITLES[0]}
            </PageTitle>
            <div className="mt-10">
              <div className="stack-field">
                <label
                  className="flex cursor-pointer items-start gap-3"
                  htmlFor="onboard-terms-accept"
                >
                  <Checkbox
                    id="onboard-terms-accept"
                    checked={termsAccepted}
                    onCheckedChange={(v) => {
                      setTermsAccepted(Boolean(v));
                      setTermsError(false);
                    }}
                    className="mt-1.5 shrink-0"
                    aria-invalid={termsError}
                    aria-describedby={termsError ? "onboard-terms-error" : undefined}
                  />
                  <span className="text-left text-base font-normal leading-relaxed text-foreground">
                    I have read and agree to the Learning Commons{" "}
                    <Link
                      href="/terms-of-use"
                      className="font-medium text-foreground underline underline-offset-4 hover:opacity-90"
                    >
                      Terms of Use
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="font-medium text-foreground underline underline-offset-4 hover:opacity-90"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {termsError ? (
                  <p
                    id="onboard-terms-error"
                    className="text-sm text-destructive"
                    role="alert"
                  >
                    Please check the box to accept the terms and continue.
                  </p>
                ) : null}
              </div>
              <Button
                type="button"
                variant="primary"
                className="mt-8 h-11 w-full"
                onClick={() => {
                  if (!termsAccepted) {
                    setTermsError(true);
                    return;
                  }
                  goNext();
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </main>

        <SignupFooter fixed />
      </div>
    );
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-sidebar dark:bg-background">
      <header className="sticky top-0 z-40 flex h-[60px] shrink-0 items-center bg-transparent px-4">
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

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6 md:px-8 md:py-8 pb-20">
        <div className="mx-auto my-auto flex w-full min-w-0 max-w-2xl flex-col items-center">
          <div className={ONBOARDING_CARD_FRAME}>
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

            <div className="flex min-h-0 min-w-0 flex-1 flex-col p-10">
              <PageTitle
                variant="onboarding"
                className="shrink-0 text-balance text-left"
              >
                {STEP_TITLES[step]}
              </PageTitle>

              <div className="mt-10 flex min-h-0 min-w-0 flex-1 flex-col">
                {/* Inset so focus rings / outer borders are not clipped by overflow-y */}
                <div className="min-h-0 flex-1 overflow-y-auto px-2 [scrollbar-gutter:stable]">
                  <div className="flex min-w-0 flex-col gap-8">
                  {step === 1 ? (
                    <>
                      <div className="stack-field">
                        <Label htmlFor="onboard-name" required>
                          Full name
                        </Label>
                        <Input
                          id="onboard-name"
                          value={name}
                          onChange={(e) => {
                            const v = e.target.value;
                            if (v.length <= 40) setName(v);
                          }}
                          maxLength={40}
                          autoComplete="name"
                        />
                      </div>
                      <div className="stack-field">
                        <Label id="onboard-role-label" required>
                          Role
                        </Label>
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
                      <div className="stack-field">
                        <Label htmlFor="onboard-org-name" required>
                          Organization name
                        </Label>
                        <Input
                          id="onboard-org-name"
                          value={organizationName}
                          onChange={(e) => {
                            const v = e.target.value;
                            if (v.length <= 40) setOrganizationName(v);
                          }}
                          maxLength={40}
                          placeholder="Your organization"
                          autoComplete="organization"
                        />
                      </div>
                      <div className="stack-field">
                        <Label htmlFor="onboard-org-url" optional>
                          URL
                        </Label>
                        <Input
                          id="onboard-org-url"
                          type="url"
                          inputMode="url"
                          value={organizationUrl}
                          onChange={(e) => setOrganizationUrl(e.target.value)}
                          autoComplete="url"
                          placeholder="https://"
                          aria-invalid={
                            organizationUrl.trim().length > 0 &&
                            !isValidOptionalUrl(organizationUrl)
                          }
                        />
                        {organizationUrl.trim().length > 0 &&
                        !isValidOptionalUrl(organizationUrl) ? (
                          <p
                            className="text-base font-normal text-destructive"
                            role="alert"
                          >
                            Enter a valid URL.
                          </p>
                        ) : null}
                      </div>
                      <div className="stack-field">
                        <Label htmlFor="onboard-org-profile-select" required>
                          What describes your organization?
                        </Label>
                        <SingleSelectField
                          id="onboard-org-profile-select"
                          value={orgProfile}
                          onValueChange={(v) => {
                            setOrgProfile(v as OrgProfile);
                            if (v !== "other_org") setOtherOrgProfile("");
                          }}
                          options={[...ORG_PROFILE_OPTIONS]}
                          placeholder="Select a type"
                        />
                        {orgProfile === "other_org" ? (
                          <Input
                            value={otherOrgProfile}
                            onChange={(e) => setOtherOrgProfile(e.target.value)}
                            placeholder="Describe your organization"
                            aria-label="Describe your organization"
                          />
                        ) : null}
                      </div>
                    </>
                  ) : null}

                  {step === 3 ? (
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

                  {step === 4 ? (
                    <div className="stack-field">
                      <Label id="onboard-heard-label" required>
                        Select one
                      </Label>
                      <PillToggleGroup<HeardSelection>
                        aria-labelledby="onboard-heard-label"
                        options={HEARD_OPTIONS}
                        value={heardAbout}
                        onValueChange={(v) => setHeardAbout(v)}
                      />
                    </div>
                  ) : null}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="primary"
                  className="mt-8 h-11 w-full shrink-0"
                  disabled={!canContinue}
                  onClick={goNext}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
          <p className="mt-8 w-full max-w-2xl text-center text-sm font-normal text-muted-foreground">
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
