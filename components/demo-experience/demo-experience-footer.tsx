"use client";

import * as React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SUPPORT_DOCS_URL } from "@/lib/support-links";
import { cn } from "@/lib/utils";

const FOOTER_BG = "#F9F9F7";
const BORDER = "#E0E0E0";
const NEWSLETTER_CARD = "#ECECEA";
const GREEN = "#1db470";
const TEXT = "#242423";

function DotGridBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundColor: FOOTER_BG,
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.085) 1px, transparent 1px)",
        backgroundSize: "10px 10px",
      }}
      aria-hidden
    />
  );
}

function NewsletterIllustration() {
  return (
    <div
      className="relative mx-auto w-full max-w-[112px] shrink-0 md:mx-0"
      aria-hidden
    >
      <img
        src="/illustrations/spot-collaborative-dev.svg"
        alt=""
        width={84}
        height={63}
        className="h-auto w-full object-contain"
      />
    </div>
  );
}

function FootLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit max-w-full items-center border bg-white px-3 py-2.5 text-left text-[11px] font-medium uppercase leading-snug tracking-[0.06em] transition-colors hover:bg-[#f3f3f1]"
      style={{ borderColor: BORDER, color: TEXT, borderRadius: "4px" }}
    >
      {children}
    </Link>
  );
}

function FooterNewsletter() {
  const [highlights, setHighlights] = React.useState(true);
  const [productUpdates, setProductUpdates] = React.useState(false);
  const [email, setEmail] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div
      className="overflow-hidden rounded-[24px] border"
      style={{ borderColor: BORDER, backgroundColor: NEWSLETTER_CARD }}
    >
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:gap-8 md:p-10">
          <NewsletterIllustration />
          <div className="min-w-0 text-center md:text-left">
            <h2
              className="text-balance text-2xl font-bold leading-tight tracking-tight md:text-[1.75rem]"
              style={{ color: TEXT }}
            >
              Stay Connected with Learning Commons
            </h2>
            <p
              className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed"
              style={{ color: "#55554e" }}
            >
              Get updates on product releases, education insights, and community
              news delivered to your inbox.
            </p>
          </div>
        </div>
        <div
          className="flex flex-col justify-center gap-5 border-t p-8 md:border-l md:border-t-0 md:p-10"
          style={{ borderColor: BORDER }}
        >
          <form className="space-y-4" onSubmit={onSubmit}>
            <label className="flex cursor-pointer items-start gap-3 text-left">
              <input
                type="checkbox"
                checked={highlights}
                onChange={(e) => setHighlights(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 cursor-pointer rounded-sm border bg-white"
                style={{ borderColor: BORDER, accentColor: GREEN }}
              />
              <span
                className="font-mono text-[10px] font-medium uppercase leading-snug tracking-[0.08em]"
                style={{ color: TEXT }}
              >
                Learning Commons quarterly highlights
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-left">
              <input
                type="checkbox"
                checked={productUpdates}
                onChange={(e) => setProductUpdates(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 cursor-pointer rounded-sm border bg-white"
                style={{ borderColor: BORDER, accentColor: GREEN }}
              />
              <span
                className="font-mono text-[10px] font-medium uppercase leading-snug tracking-[0.08em]"
                style={{ color: TEXT }}
              >
                Monthly product updates &amp; releases
              </span>
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <Input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Work Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 flex-1 rounded-[4px] border bg-white text-[15px]"
                style={{ borderColor: BORDER }}
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-[4px] border bg-white px-6 text-[14px] font-medium transition-colors hover:bg-[#f3f3f1]"
                style={{ borderColor: BORDER, color: TEXT }}
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-[11px] leading-relaxed" style={{ color: "#55554e" }}>
            By subscribing you agree to receive marketing emails and accept our{" "}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-2 hover:opacity-80"
              style={{ color: TEXT }}
            >
              Privacy Policy
            </Link>
            . You can unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

function LogoMark() {
  return (
    <div className="mb-2 shrink-0 md:mb-0">
      <img
        src="/lc-logomark.svg"
        alt="Learning Commons"
        width={41}
        height={27}
        className="h-[27px] w-[41px] max-w-none shrink-0 object-contain"
      />
    </div>
  );
}

const LINK_COLUMNS: { heading: string; links: { href: string; label: string }[] }[] =
  [
    {
      heading: "Product",
      links: [
        { href: "/explorer", label: "Knowledge Graph" },
        { href: "/evaluators", label: "Evaluators" },
        { href: "/csync", label: "Curriculum Sync" },
      ],
    },
    {
      heading: "Company",
      links: [
        { href: "/", label: "Overview" },
        { href: "/team", label: "About Us" },
        { href: "/components", label: "Our Tools" },
        { href: "/support", label: "Partner" },
        { href: "/support", label: "News" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { href: "/terms-of-use", label: "Community Guidelines" },
        { href: "/support", label: "Responsible AI Practices" },
      ],
    },
    {
      heading: "Support",
      links: [
        { href: "/support", label: "Get in Touch" },
        { href: "/support", label: "Careers" },
        { href: SUPPORT_DOCS_URL, label: "Documentation" },
        {
          href: "https://github.com",
          label: "GitHub",
        },
        { href: "/support", label: "Media Kit" },
      ],
    },
  ];

function LinkedInIcon() {
  return (
    <a
      href="https://www.linkedin.com"
      target="_blank"
      rel="noreferrer"
      className="inline-flex size-8 items-center justify-center rounded-[4px] bg-[#242423] text-white transition-opacity hover:opacity-85"
      aria-label="LinkedIn"
    >
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </a>
  );
}

function LegalPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center border bg-white px-2.5 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.06em] transition-colors hover:bg-[#f3f3f1]"
      style={{ borderColor: BORDER, color: TEXT, borderRadius: "4px" }}
    >
      {children}
    </Link>
  );
}

export function DemoExperienceFooter({
  variant = "full",
}: {
  variant?: "full" | "condensed";
}) {
  if (variant === "condensed") {
    return (
      <footer
        className="relative mt-auto w-full overflow-hidden border-t"
        style={{ borderColor: BORDER, backgroundColor: FOOTER_BG }}
      >
        <div
          className="relative z-10 mx-auto w-full max-w-[1200px] px-8 py-8 md:px-10 md:py-9"
          style={{ color: TEXT }}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
            <p className="shrink-0 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[#55554e]">
              © {new Date().getFullYear()} learning commons all rights reserved
            </p>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <LegalPill href="/terms-of-use">Terms of use</LegalPill>
              <LegalPill href="/privacy-policy">Privacy policy</LegalPill>
              <LegalPill href="#">Site map</LegalPill>
              <LegalPill href="#">
                Do not sell or share my personal info
              </LegalPill>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative mt-auto w-full overflow-hidden">
      <DotGridBackground />
      <div
        className="relative z-10 mx-auto w-full max-w-[1200px] px-8 py-14 md:px-10 md:py-16"
        style={{ color: TEXT }}
      >
        <div className="space-y-14 md:space-y-16">
          <FooterNewsletter />

          <div className="flex flex-col gap-10 md:flex-row md:gap-12 lg:gap-16">
            <LogoMark />
            <div className="grid flex-1 grid-cols-2 gap-8 lg:grid-cols-4">
              {LINK_COLUMNS.map((col) => (
                <div key={col.heading} className="space-y-3">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[#55554e]">
                    {col.heading}
                  </p>
                  <div className="flex flex-col items-start gap-2">
                    {col.links.map((item) =>
                      item.href.startsWith("http") ? (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-fit max-w-full items-center border bg-white px-3 py-2.5 text-left text-[11px] font-medium uppercase leading-snug tracking-[0.06em] transition-colors hover:bg-[#f3f3f1]"
                          style={{
                            borderColor: BORDER,
                            color: TEXT,
                            borderRadius: "4px",
                          }}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <FootLink key={item.label} href={item.href}>
                          {item.label}
                        </FootLink>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex flex-col gap-6 border-t pt-8 md:flex-row md:items-center md:justify-between md:gap-8 md:pt-10"
            style={{ borderColor: BORDER }}
          >
            <p
              className="shrink-0 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-[#55554e]"
            >
              © {new Date().getFullYear()} learning commons all rights reserved
            </p>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <LinkedInIcon />
              <div className="flex flex-wrap gap-2 md:ml-1">
                <LegalPill href="/terms-of-use">Terms of use</LegalPill>
                <LegalPill href="/privacy-policy">Privacy policy</LegalPill>
                <LegalPill href="#">Site map</LegalPill>
                <LegalPill href="#">
                  Do not sell or share my personal info
                </LegalPill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
