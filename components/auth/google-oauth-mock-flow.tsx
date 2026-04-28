"use client";

import * as React from "react";
import { AccountCircle, ChevronDown, Mail, User } from "lucide-react";
import { GoogleMark } from "@/components/ui/app-brand-icons";
import { cn } from "@/lib/utils";

const PAGE_BG = "#f0f2f5";
const GOOGLE_BLUE = "#1a73e8";
const GOOGLE_TEXT = "#202124";
const GOOGLE_MUTED = "#5f6368";
const GOOGLE_BORDER = "#dadce0";

export type GoogleMockAccount = {
  id: string;
  name: string;
  email: string;
  /** Two-letter or initial for placeholder avatar */
  initial: string;
  avatarClass: string;
};

const DEFAULT_ACCOUNTS: GoogleMockAccount[] = [
  {
    id: "1",
    name: "Jessica Phan",
    email: "jphan@chanzuckerberg.com",
    initial: "J",
    avatarClass: "bg-[#1a73e8]",
  },
  {
    id: "2",
    name: "Jessica Phan",
    email: "jessicakynaphan@gmail.com",
    initial: "J",
    avatarClass: "bg-[#5f6368]",
  },
];

function GooglePageFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "flex w-full max-w-5xl flex-col gap-3 px-4 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-sm sm:mx-auto sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      style={{ color: GOOGLE_MUTED }}
    >
      <button
        type="button"
        className="inline-flex w-fit items-center gap-1 rounded-sm px-1 py-0.5 text-left outline-none ring-offset-2 hover:bg-black/[0.04] focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
      >
        <span>English (United States)</span>
        <ChevronDown className="size-4 shrink-0" aria-hidden />
      </button>
      <nav className="flex flex-wrap items-center gap-6" aria-label="Google footer links">
        <a
          href="https://support.google.com/accounts?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm px-0.5 py-0.5 outline-none hover:text-[#202124] focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
        >
          Help
        </a>
        <a
          href="https://policies.google.com/privacy?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm px-0.5 py-0.5 outline-none hover:text-[#202124] focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
        >
          Privacy
        </a>
        <a
          href="https://policies.google.com/terms?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm px-0.5 py-0.5 outline-none hover:text-[#202124] focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
        >
          Terms
        </a>
      </nav>
    </footer>
  );
}

function GoogleCardHeader() {
  return (
    <div
      className="border-b px-6 py-4"
      style={{ borderColor: GOOGLE_BORDER }}
    >
      <div className="flex items-center gap-2.5">
        <GoogleMark className="size-5 shrink-0" />
        <span className="text-sm" style={{ color: "#3c4043" }}>
          Sign in with Google
        </span>
      </div>
    </div>
  );
}

function AccountAvatar({ account }: { account: GoogleMockAccount }) {
  return (
    <div
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white",
        account.avatarClass,
      )}
      aria-hidden
    >
      {account.initial}
    </div>
  );
}

type Step = "choose" | "consent";

export function GoogleOAuthMockFlow({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = React.useState<Step>("choose");
  const [account, setAccount] = React.useState<GoogleMockAccount | null>(null);

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  function selectAccount(a: GoogleMockAccount) {
    setAccount(a);
    setStep("consent");
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex min-h-0 flex-col overflow-hidden [font-family:var(--font-inter),ui-sans-serif,system-ui,sans-serif]"
      style={{ backgroundColor: PAGE_BG }}
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[960px] flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
        <div
          className="w-full max-w-[900px] overflow-hidden rounded-[24px] bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)]"
          style={{ color: GOOGLE_TEXT }}
        >
          <GoogleCardHeader />

          {step === "choose" ? (
            <div className="flex flex-col gap-0 p-6 sm:flex-row sm:items-start sm:gap-10 sm:p-8 md:gap-16">
              <div className="min-w-0 sm:max-w-[min(100%,22rem)] sm:pt-1">
                <h1
                  className="text-2xl font-normal leading-tight sm:text-[1.5rem]"
                  style={{ color: GOOGLE_TEXT }}
                >
                  Choose an account
                </h1>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: GOOGLE_MUTED }}>
                  to continue to{" "}
                  <a
                    href="#"
                    className="font-medium"
                    style={{ color: GOOGLE_BLUE }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Learning Commons Platform
                  </a>
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 text-sm font-medium outline-none hover:underline"
                  style={{ color: GOOGLE_MUTED }}
                >
                  Back
                </button>
              </div>
              <div
                className="min-w-0 flex-1 border-t border-b border-[#dadce0] pt-2 divide-y divide-[#dadce0] sm:pt-0"
                role="list"
              >
                {DEFAULT_ACCOUNTS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    role="listitem"
                    onClick={() => selectAccount(a)}
                    className="flex w-full items-center gap-4 py-3.5 text-left transition-colors hover:bg-[#f8f9fa] sm:py-4"
                  >
                    <AccountAvatar account={a} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium" style={{ color: GOOGLE_TEXT }}>
                        {a.name}
                      </div>
                      <div className="truncate text-sm" style={{ color: GOOGLE_MUTED }}>
                        {a.email}
                      </div>
                    </div>
                  </button>
                ))}
                <button
                  type="button"
                  role="listitem"
                  onClick={() => selectAccount(DEFAULT_ACCOUNTS[1]!)}
                  className="flex w-full items-center gap-4 py-3.5 text-left transition-colors hover:bg-[#f8f9fa] sm:py-4"
                >
                  <AccountCircle
                    className="size-8 shrink-0 text-[#5f6368]"
                    aria-hidden
                  />
                  <span className="text-sm" style={{ color: GOOGLE_MUTED }}>
                    Use another account
                  </span>
                </button>
              </div>
            </div>
          ) : account ? (
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
                <div className="min-w-0 lg:max-w-[20rem] lg:shrink-0">
                  <h1
                    className="text-2xl font-normal leading-snug sm:text-[1.375rem]"
                    style={{ color: GOOGLE_TEXT }}
                  >
                    Sign in to Learning Commons Platform
                  </h1>
                  <button
                    type="button"
                    className="mt-5 flex w-full max-w-full items-center gap-2 rounded-full border py-1.5 pl-2 pr-1.5 text-left text-sm transition-colors hover:bg-[#f8f9fa]"
                    style={{ borderColor: GOOGLE_BORDER, color: "#3c4043" }}
                    onClick={() => setStep("choose")}
                    aria-label="Change account"
                  >
                    <AccountAvatar account={account} />
                    <span className="min-w-0 flex-1 truncate font-normal">{account.email}</span>
                    <ChevronDown className="size-4 shrink-0 text-[#5f6368]" aria-hidden />
                  </button>
                </div>
                <div className="min-w-0 flex-1 space-y-4 text-sm leading-relaxed">
                  <p className="font-medium" style={{ color: GOOGLE_TEXT }}>
                    Google will allow Learning Commons Platform to access this info about you
                  </p>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <User
                        className="mt-0.5 size-5 shrink-0 text-[#5f6368]"
                        aria-hidden
                      />
                      <div>
                        <div className="font-medium" style={{ color: GOOGLE_TEXT }}>
                          {account.name}
                        </div>
                        <div className="text-[13px]" style={{ color: GOOGLE_MUTED }}>
                          Name and profile picture
                        </div>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <Mail
                        className="mt-0.5 size-5 shrink-0 text-[#5f6368]"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <div>
                        <div className="font-medium" style={{ color: GOOGLE_TEXT }}>
                          {account.email}
                        </div>
                        <div className="text-[13px]" style={{ color: GOOGLE_MUTED }}>
                          Email address
                        </div>
                      </div>
                    </li>
                  </ul>
                  <p className="pt-1 text-sm" style={{ color: GOOGLE_MUTED }}>
                    Review Learning Commons Platform’s{" "}
                    <a href="/privacy-policy" className="font-medium" style={{ color: GOOGLE_BLUE }}>
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="/terms-of-use" className="font-medium" style={{ color: GOOGLE_BLUE }}>
                      Terms of Service
                    </a>{" "}
                    to understand how Learning Commons Platform will process and protect your
                    data.
                  </p>
                  <p className="text-sm" style={{ color: GOOGLE_MUTED }}>
                    To make changes at any time, go to your{" "}
                    <a
                      href="https://myaccount.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium"
                      style={{ color: GOOGLE_BLUE }}
                    >
                      Google Account
                    </a>
                    .
                  </p>
                  <p className="text-sm" style={{ color: GOOGLE_MUTED }}>
                    Learn more about{" "}
                    <a
                      href="https://support.google.com/accounts/answer/112496?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium"
                      style={{ color: GOOGLE_BLUE }}
                    >
                      Sign in with Google
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t pt-6 sm:mt-10 sm:pt-8" style={{ borderColor: GOOGLE_BORDER }}>
                <button
                  type="button"
                  onClick={() => setStep("choose")}
                  className="rounded-full border-2 bg-white px-6 py-2 text-sm font-medium transition-colors hover:bg-[#f8f9fa]"
                  style={{ borderColor: GOOGLE_BLUE, color: GOOGLE_BLUE }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSuccess}
                  className="rounded-full border-2 bg-white px-6 py-2 text-sm font-medium transition-colors hover:bg-[#f8f9fa]"
                  style={{ borderColor: GOOGLE_BLUE, color: GOOGLE_BLUE }}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <GooglePageFooter className="shrink-0" />
    </div>
  );
}
