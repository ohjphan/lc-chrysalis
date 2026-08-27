import type { ReactNode } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { PageTitle } from "@/components/ui/page-title";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 border-app-b border-border-subtle pb-10 last:border-0">
      <h2 className="font-page-h2 text-heading dark:text-foreground">{title}</h2>
      {children}
    </section>
  );
}

/** Specs aligned with `globals.css`, `PageTitle`, and `Label` sources. */
type TypeRampSpec = {
  family: string;
  familyVar?: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  /** Tailwind / utility class reference */
  token?: string;
  /** e.g. text transform, color role */
  notes?: string;
};

function TypographySpecGrid({ spec }: { spec: TypeRampSpec }) {
  const rows: { label: string; value: ReactNode }[] = [
    { label: "Family", value: spec.family },
    ...(spec.familyVar
      ? [
          {
            label: "CSS",
            value: (
              <code className="font-mono text-[11px] text-foreground">
                {spec.familyVar}
              </code>
            ),
          },
        ]
      : []),
    { label: "Size", value: spec.fontSize },
    { label: "Weight", value: spec.fontWeight },
    { label: "Line height", value: spec.lineHeight },
    { label: "Letter spacing", value: spec.letterSpacing },
    ...(spec.notes
      ? [{ label: "Notes", value: spec.notes }]
      : []),
  ];

  return (
    <div className="mt-2 space-y-1.5 text-xs">
      {rows.map(({ label, value }) => (
        <div
          key={label}
          className="grid grid-cols-1 gap-x-3 gap-y-0.5 sm:grid-cols-[7rem_1fr] sm:items-baseline"
        >
          <span className="text-muted-foreground">{label}</span>
          <span className="min-w-0 text-foreground">{value}</span>
        </div>
      ))}
    </div>
  );
}

function TypographyRow({
  title,
  spec,
  children,
}: {
  title: string;
  spec: TypeRampSpec;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 border-app-b border-border-subtle py-6 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[minmax(14rem,18rem)_1fr] md:items-start md:gap-10">
      <div className="min-w-0 shrink-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <TypographySpecGrid spec={spec} />
        {spec.token ? (
          <p className="mt-2 font-mono text-[11px] leading-snug text-muted-foreground">
            {spec.token}
          </p>
        ) : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function FoundationsView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Typography</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Typography styles and text tokens used across the Learning Commons
          developer portal. Toggle light/dark under{" "}
          <Link
            href="/settings/appearance"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Settings → Appearance
          </Link>{" "}
          to compare values. For interactive UI primitives, see{" "}
          <Link
            href="/design-system/components/badges"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Components
          </Link>
          . Color tokens and border guidance now live in their own Foundations
          pages.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        <Section title="Type scale">
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Root <code className="font-mono text-sm text-foreground">html</code>{" "}
            font size is <strong className="font-medium text-foreground">14px</strong>
            , so <code className="font-mono text-sm">1rem</code> in{" "}
            <code className="font-mono text-sm">globals.css</code> matches 14px.
            Body uses the app sans stack with line-height 1.5. Dashboard and other
            in-app page titles use{" "}
            <code className="font-mono text-sm text-foreground">PageTitle</code>{" "}
            with the Parabolica stack (
            <code className="font-mono text-sm text-foreground">
              --font-parabolica-stack
            </code>
            ), 28px regular, 0.5% letter-spacing, and sentence case (
            <code className="font-mono text-sm text-foreground">font-page-title</code>
            ). Section headings use{" "}
            <code className="font-mono text-sm text-foreground">font-page-h2</code>{" "}
            (same stack, 20px weight 500, 0.5% tracking, sentence case); often paired
            with{" "}
            <code className="font-mono text-sm text-foreground">text-heading</code>{" "}
            and{" "}
            <code className="font-mono text-sm text-foreground">
              dark:text-foreground
            </code>{" "}
            on dashboard surfaces.
          </p>
          <div className="mt-6 rounded-lg border-app border-border-subtle bg-surface px-4 py-8 md:px-6 md:py-10">
            <TypographyRow
              title="Landing hero (home)"
              spec={{
                family: "JetBrains Mono",
                familyVar: "var(--font-jetbrains-mono)",
                fontSize: "28px",
                fontWeight: "300 (Light)",
                lineHeight: "~1.25 (Tailwind leading-tight)",
                letterSpacing: "0.04em",
                token:
                  'PageTitle variant="heroMono" · font-mono text-[28px] font-light uppercase leading-tight tracking-[0.04em] text-heading text-balance',
                notes: "Uppercase · color role: text-heading",
              }}
            >
              <PageTitle variant="heroMono">
                Welcome to the Learning Commons Platform
              </PageTitle>
            </TypographyRow>
            <TypographyRow
              title="Demo card title"
              spec={{
                family: "Parabolica",
                familyVar: "var(--font-parabolica-stack)",
                fontSize: "28px",
                fontWeight: "400 (Regular)",
                lineHeight: "1.12",
                letterSpacing: "0.5%",
                token:
                  "font-page-title · text-left · text-balance · text-heading (neutral preview); Demos tiles pair swatch contrast instead of text-heading",
                notes:
                  "Sentence case · left-aligned · same scale as PageTitle; Demos project cards on brand swatches",
              }}
            >
              <p className="max-w-sm text-left font-page-title text-balance text-heading">
                Student writing feedback loop
              </p>
            </TypographyRow>
            <TypographyRow
              title="Page title"
              spec={{
                family: "Parabolica",
                familyVar: "var(--font-parabolica-stack)",
                fontSize: "28px",
                fontWeight: "400 (Regular)",
                lineHeight: "1.12",
                letterSpacing: "0.5%",
                token: "font-page-title · PageTitle · text-heading text-balance",
                notes: "Sentence case",
              }}
            >
              <PageTitle>Evaluators playground</PageTitle>
            </TypographyRow>
            <TypographyRow
              title="Section heading"
              spec={{
                family: "Parabolica",
                familyVar: "var(--font-parabolica-stack)",
                fontSize: "20px",
                fontWeight: "500 (Medium)",
                lineHeight: "1.12",
                letterSpacing: "0.5%",
                token: "font-page-h2 · text-heading",
                notes:
                  "Sentence case · margin-bottom 6px · light: Charcoal via text-heading",
              }}
            >
              <span className="font-page-h2 text-heading">
                Standards alignment overview
              </span>
            </TypographyRow>
            <TypographyRow
              title="Subsection heading (H3)"
              spec={{
                family: "Parabolica",
                familyVar: "var(--font-parabolica-stack)",
                fontSize: "16px",
                fontWeight: "500 (Medium)",
                lineHeight: "1.12",
                letterSpacing: "0.5%",
                token: "font-page-h3 · text-heading",
                notes: "Sentence case",
              }}
            >
              <h3 className="font-page-h3 text-heading dark:text-foreground">
                Option 1: Borders
              </h3>
            </TypographyRow>
            <TypographyRow
              title="Body"
              spec={{
                family: "Parabolica Text",
                familyVar: "var(--font-sans-app)",
                fontSize: "14px (1rem; html root 14px)",
                fontWeight: "400 (Regular)",
                lineHeight: "1.5 (body, globals.css)",
                letterSpacing: "normal",
                token:
                  "text-base font-normal · text-foreground / text-muted-foreground",
                notes:
                  "Light: #3A3A37 (`--foreground`) · #55554E muted (`--muted-foreground`)",
              }}
            >
              <p className="text-base font-normal text-foreground">
                Primary body text uses the default foreground color.
              </p>
              <p className="mt-2 text-base font-normal text-muted-foreground">
                Supporting copy uses muted foreground for hierarchy.
              </p>
            </TypographyRow>
            <TypographyRow
              title="Eyebrows"
              spec={{
                family: "JetBrains Mono",
                familyVar: "var(--font-jetbrains-mono)",
                fontSize: "12px",
                fontWeight: "500 (Medium)",
                lineHeight: "normal (default)",
                letterSpacing: "0.04em (4%)",
                token:
                  "font-nav-sidebar-eyebrow uppercase text-eyebrow",
                notes:
                  "Sidebar section labels — `--text-eyebrow` → Gray 4 (#55554E) in light; distinct from body (Gray 5)",
              }}
            >
              <p className="font-nav-sidebar-eyebrow uppercase text-eyebrow">
                Workspace
              </p>
            </TypographyRow>
            <TypographyRow
              title="Labels"
              spec={{
                family: "Parabolica Text",
                familyVar: "font-parabolica-text → var(--font-sans-app)",
                fontSize: "14px (text-base)",
                fontWeight: "500",
                lineHeight: "1.5 (inherited from body)",
                letterSpacing: "normal",
                token:
                  "Label · font-parabolica-text text-base font-[500] · components/ui/label.tsx",
                notes: "Light: text-heading (Charcoal) · dark: text-foreground",
              }}
            >
              <div className="space-y-3">
                <div>
                  <input
                    id="foundations-label-example"
                    className="sr-only"
                    tabIndex={-1}
                    readOnly
                    aria-hidden="true"
                  />
                  <Label htmlFor="foundations-label-example">
                    Email address
                  </Label>
                </div>
                <div>
                  <input
                    id="foundations-label-optional"
                    className="sr-only"
                    tabIndex={-1}
                    readOnly
                    aria-hidden="true"
                  />
                  <Label htmlFor="foundations-label-optional" optional>
                    Display name
                  </Label>
                </div>
              </div>
            </TypographyRow>
          </div>
        </Section>
      </div>
    </div>
  );
}
