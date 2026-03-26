"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTitle } from "@/components/ui/page-title";
import { SpotlightBackground } from "@/components/landing/spotlight-background";
import { cn } from "@/lib/utils";

/** Signup footer legal pills: 10px mono, 5% tracking, #3A3A37 / #55554E */
const signupFooterLegalLinkClass =
  "inline-flex h-[22px] items-center justify-center whitespace-nowrap rounded-[4px] border-app border-[#55554E] bg-[#3A3A37] px-2 font-mono text-[10px] font-medium uppercase leading-none tracking-[5%] text-white/75 transition-[color,background-color] hover:bg-[#454542] hover:text-white/95";

/** Smooth height when email-gated fields appear (grid 0fr → 1fr). */
function AuthFormExpandSection({
  open,
  children,
}: {
  open: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "motion-reduce:duration-0",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="min-h-0 overflow-hidden" inert={!open}>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}

/** Solid LinkedIn mark (filled), inherits `currentColor`. */
function LinkedInSolidIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 shrink-0", className)}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function SignupPageClient() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState("");
  const [signUpPasswordError, setSignUpPasswordError] = useState<string | null>(
    null,
  );
  const showSignInEmailExtras = signInEmail.trim().length > 0;
  const showSignUpEmailExtras = signUpEmail.trim().length > 0;

  useEffect(() => {
    if (!showSignUpEmailExtras) {
      setSignUpPassword("");
      setSignUpPasswordConfirm("");
      setSignUpPasswordError(null);
    }
  }, [showSignUpEmailExtras]);

  return (
    <SpotlightBackground
      className="min-h-[100dvh]"
      veilClassName="bg-[#faf9f8] dark:bg-background"
      bitmapOpacity={0.5}
    >
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center bg-transparent px-4">
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

      <main className="flex flex-1 flex-col items-center px-6 py-6 md:px-8 md:py-8">
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

        <PageTitle className="mb-8 max-w-lg text-balance text-center text-[28px]">
          Build with Learning Commons
        </PageTitle>

        <div
          className="w-full max-w-[440px] rounded-[4px] border-app border-border-subtle bg-background px-5 py-6 shadow-none md:px-8 md:py-8 dark:bg-sidebar"
        >
          <Tabs defaultValue="signin" className="w-full">
            <TabsList
              aria-label="Authentication"
              className="mb-4 flex h-auto min-h-10 w-full gap-1 rounded-md bg-nav-active/50 p-1 text-muted-foreground dark:bg-nav-active/30"
            >
              <TabsTrigger value="signin" className="flex-1">
                Sign in
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">
                Create account
              </TabsTrigger>
            </TabsList>

          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="primary"
              className="h-11 w-full justify-center gap-3"
            >
              <GoogleMark />
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="primary"
              className="h-11 w-full justify-center gap-3"
            >
              <Github className="size-5 shrink-0" aria-hidden />
              Continue with GitHub
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="h-[var(--border-stroke)] flex-1 bg-border-subtle" aria-hidden />
            <span className="font-nav-eyebrow text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              or
            </span>
            <span className="h-[var(--border-stroke)] flex-1 bg-border-subtle" aria-hidden />
          </div>

            <TabsContent value="signin" className="mt-0">
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="stack-field">
                  <Label htmlFor="auth-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="auth-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@school.edu"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                  />
                </div>
                <AuthFormExpandSection open={showSignInEmailExtras}>
                  <div className="stack-field">
                    <Label htmlFor="auth-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="auth-password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="h-11 w-full"
                  >
                    Sign in
                  </Button>
                  <div className="text-center">
                    <Link
                      href="/support"
                      className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
                    >
                      Forgot password
                    </Link>
                  </div>
                </AuthFormExpandSection>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="mt-0">
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (signUpPassword !== signUpPasswordConfirm) {
                    setSignUpPasswordError("Passwords do not match");
                    return;
                  }
                  setSignUpPasswordError(null);
                }}
              >
                <div className="stack-field">
                  <Label htmlFor="signup-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@school.edu"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                  />
                </div>
                <AuthFormExpandSection open={showSignUpEmailExtras}>
                  <div className="stack-field">
                    <Label htmlFor="signup-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={signUpPassword}
                      onChange={(e) => {
                        setSignUpPassword(e.target.value);
                        setSignUpPasswordError(null);
                      }}
                      aria-invalid={signUpPasswordError ? true : undefined}
                      aria-describedby={
                        signUpPasswordError ? "signup-password-error" : undefined
                      }
                      required
                    />
                  </div>
                  <div className="stack-field">
                    <Label
                      htmlFor="signup-password-confirm"
                      className="text-sm font-medium"
                    >
                      Confirm password
                    </Label>
                    <Input
                      id="signup-password-confirm"
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={signUpPasswordConfirm}
                      onChange={(e) => {
                        setSignUpPasswordConfirm(e.target.value);
                        setSignUpPasswordError(null);
                      }}
                      aria-invalid={signUpPasswordError ? true : undefined}
                      aria-describedby={
                        signUpPasswordError ? "signup-password-error" : undefined
                      }
                      required
                    />
                  </div>
                  {signUpPasswordError ? (
                    <p
                      id="signup-password-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {signUpPasswordError}
                    </p>
                  ) : null}
                  <Button
                    type="submit"
                    variant="primary"
                    className="h-11 w-full"
                  >
                    Create account
                  </Button>
                </AuthFormExpandSection>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="mt-auto border-app-t border-[#55554E] bg-[#242423] px-[20px] py-4">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-baseline gap-x-8 gap-y-1 font-mono text-[12px] font-normal uppercase tracking-[5%] text-white/65">
            <span>© {new Date().getFullYear()} Learning Commons</span>
            <span>All rights reserved</span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-[22px] shrink-0 items-center justify-center rounded-[4px] border-app border-[#55554E] bg-[#3A3A37] text-white transition-[color,background-color] hover:bg-[#454542]"
              aria-label="Learning Commons on LinkedIn"
            >
              <LinkedInSolidIcon className="size-3.5" />
            </a>
            <nav
              className="flex flex-wrap items-center gap-4"
              aria-label="Legal and site links"
            >
              <Link href="/terms-of-use" className={signupFooterLegalLinkClass}>
                Terms of use
              </Link>
              <Link href="/privacy-policy" className={signupFooterLegalLinkClass}>
                Privacy policy
              </Link>
              <Link href="/" className={signupFooterLegalLinkClass}>
                Site map
              </Link>
              <Link href="/privacy-policy" className={signupFooterLegalLinkClass}>
                Do not sell or share my personal info
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </SpotlightBackground>
  );
}
