"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
import { GoogleMark } from "@/components/ui/app-brand-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignupFooter } from "@/components/ui/signup-footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTitle } from "@/components/ui/page-title";
import { GoogleOAuthMockFlow } from "@/components/auth/google-oauth-mock-flow";
import { AUTH_CARD_SHELL } from "@/lib/auth-card-shell";
import { cn } from "@/lib/utils";

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

export function SignupPageClient() {
  const router = useRouter();
  const [signInEmail, setSignInEmail] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpPasswordConfirm, setSignUpPasswordConfirm] = useState("");
  const [signUpPasswordError, setSignUpPasswordError] = useState<string | null>(
    null,
  );
  const [showGoogleOAuth, setShowGoogleOAuth] = useState(false);
  const showSignInEmailExtras = signInEmail.trim().length > 0;
  const showSignUpEmailExtras = signUpEmail.trim().length > 0;

  useEffect(() => {
    if (!showSignUpEmailExtras) {
      setSignUpPassword("");
      setSignUpPasswordConfirm("");
      setSignUpPasswordError(null);
    }
  }, [showSignUpEmailExtras]);

  if (showGoogleOAuth) {
    return (
      <GoogleOAuthMockFlow
        onClose={() => setShowGoogleOAuth(false)}
        onSuccess={() => {
          setShowGoogleOAuth(false);
          router.push("/profile-setup");
        }}
      />
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-sidebar dark:bg-background">
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

        <PageTitle
          variant="authBranded"
          className="mb-8 max-w-lg text-center"
        >
          Build with Learning Commons
        </PageTitle>

        <div className={AUTH_CARD_SHELL}>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList
              aria-label="Authentication"
              className="flex h-auto min-h-10 w-full gap-1 text-muted-foreground"
            >
              <TabsTrigger value="signin" className="flex-1 font-[550]">
                Sign in
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex-1 font-[550]">
                Create account
              </TabsTrigger>
            </TabsList>

          <div className="mt-[30px] flex flex-col gap-3">
            <Button
              type="button"
              variant="secondary"
              className="h-11 w-full justify-center gap-3"
              onClick={() => setShowGoogleOAuth(true)}
            >
              <GoogleMark />
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="secondary"
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
                  <Label htmlFor="auth-email" className="text-sm font-[500]">
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
                    <Label htmlFor="auth-password" className="text-sm font-[500]">
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
                  router.push("/profile-setup");
                }}
              >
                <div className="stack-field">
                  <Label htmlFor="signup-email" className="text-sm font-[500]">
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
                    <Label htmlFor="signup-password" className="text-sm font-[500]">
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
                      className="text-sm font-[500]"
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

      <SignupFooter fixed />
    </div>
  );
}
