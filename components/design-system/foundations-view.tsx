import Link from "next/link";
import { ColorSwatchCard } from "@/components/design-system/color-swatch-card";
import {
  colorSwatchEntryKey,
  type ColorSwatchEntry,
} from "@/components/design-system/color-swatch-entry";
import { BRAND_AVATAR_PALETTE_FOR_DOCS } from "@/lib/brand-avatar-colors";
import { PageContainer } from "@/components/dashboard/page-container";
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

function TypographyRow({
  title,
  token,
  children,
}: {
  title: string;
  token: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 border-app-b border-border-subtle py-6 first:pt-0 last:border-0 last:pb-0 md:grid-cols-[minmax(11rem,14rem)_1fr] md:items-start md:gap-10">
      <div className="shrink-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 font-mono text-xs leading-snug text-muted-foreground">
          {token}
        </p>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function FoundationsView() {
  /* Card order: light-mode luminance (surfaces → text ramp → modal) then semantic accents. */
  const colorGroups: {
    title: string;
    entries: ColorSwatchEntry[];
    footnote?: string;
  }[] = [
    {
      title: "Background",
      entries: [
        { label: "Background", varName: "--background", className: "bg-background" },
      ],
    },
    {
      title: "Warm neutral",
      entries: [
        { label: "Field", varName: "--field-bg", className: "bg-field-bg" },
        { label: "Sidebar", varName: "--sidebar-bg", className: "bg-sidebar" },
        { label: "Surface", varName: "--surface", className: "bg-surface" },
      ],
      footnote:
        "In light mode field, sidebar, and surface match (#FAF9F8). In dark mode they diverge; swatch follows --field-bg.",
    },
    {
      title: "Nav active",
      entries: [
        { label: "Nav active", varName: "--nav-active", className: "bg-nav-active" },
      ],
    },
    {
      title: "Border / stroke",
      entries: [
        {
          label: "Border subtle",
          varName: "--border-subtle",
          className: "bg-border-subtle",
        },
        {
          label: "Modal border",
          varName: "--modal-border",
          className: "bg-modal-border",
        },
      ],
    },
    {
      title: "Muted foreground",
      entries: [
        {
          label: "Muted foreground",
          varName: "--muted-foreground",
          className: "bg-muted-foreground",
        },
      ],
    },
    {
      title: "Nav link idle",
      entries: [
        {
          label: "Nav link idle",
          varName: "--nav-link-idle",
          className: "bg-nav-link-idle",
        },
      ],
      footnote: "Light mode #55554E; dark mode #a3a3a3.",
    },
    {
      title: "Foreground / heading",
      entries: [
        { label: "Foreground", varName: "--foreground", className: "bg-foreground" },
        { label: "Heading", varName: "--heading", className: "bg-heading" },
      ],
      footnote:
        "In light mode these match (#242423). In dark mode they diverge (--foreground #fafafa, --heading #ffffff); swatch follows --foreground.",
    },
    {
      title: "Modal background",
      entries: [
        {
          label: "Modal background",
          varName: "--modal-bg",
          className: "bg-modal-bg",
        },
      ],
    },
    {
      title: "Accent",
      entries: [
        {
          label: "Accent green",
          varName: "--accent-green",
          className: "bg-accent-green",
        },
        {
          label: "Nav active icon",
          varName: "--nav-active-icon",
          className: "bg-nav-active-icon",
        },
      ],
      footnote:
        "These match in light and dark (#1DB470); the swatch follows --accent-green.",
    },
    {
      title: "Accent green muted",
      entries: [
        {
          label: "Accent green muted",
          varName: "--accent-green-muted",
          className: "bg-accent-green-muted",
        },
      ],
    },
    {
      title: "Destructive",
      entries: [
        {
          label: "Destructive",
          varName: "--destructive",
          className: "bg-destructive",
        },
      ],
    },
    {
      title: "Destructive muted",
      entries: [
        {
          label: "Destructive muted",
          varName: "--destructive-muted",
          className: "bg-destructive-muted",
        },
      ],
    },
  ];

  return (
    <PageContainer>
      <div className="flex flex-col gap-[8px]">
        <PageTitle>Foundations</PageTitle>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Semantic tokens and typography used across the Learning Commons developer
          portal. Toggle light/dark under{" "}
          <Link
            href="/settings/appearance"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Settings → Appearance
          </Link>{" "}
          to compare values. For interactive UI primitives, see{" "}
          <Link
            href="/components"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Components
          </Link>
          .
        </p>
      </div>

      <div className="mt-10 space-y-12">
        <Section title="Typography">
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
            (same stack, 18px weight 550, 0.5% tracking, sentence case); often paired
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
              token='PageTitle variant="heroMono" · JetBrains Mono · 28px light · uppercase · tracking-[0.04em]'
            >
              <PageTitle variant="heroMono">
                Welcome to the Learning Commons Platform
              </PageTitle>
            </TypographyRow>
            <TypographyRow
              title="Page title"
              token="font-page-title · PageTitle · text-heading text-balance"
            >
              <PageTitle>Evaluators playground</PageTitle>
            </TypographyRow>
            <TypographyRow
              title="Section heading"
              token="font-page-h2 · text-heading dark:text-foreground"
            >
              <span className="font-page-h2 text-heading dark:text-foreground">
                Standards alignment overview
              </span>
            </TypographyRow>
            <TypographyRow title="Body" token="text-base · foreground / muted-foreground">
              <p className="text-base font-normal text-foreground">
                Primary body text uses the default foreground color.
              </p>
              <p className="mt-2 text-base font-normal text-muted-foreground">
                Supporting copy uses muted foreground for hierarchy.
              </p>
            </TypographyRow>
            <TypographyRow title="Eyebrows" token="font-nav-sidebar-eyebrow">
              <p className="font-nav-sidebar-eyebrow uppercase text-muted-foreground">
                Workspace
              </p>
            </TypographyRow>
            <TypographyRow
              title="Labels"
              token="Label · font-parabolica · text-base font-medium · #242423 / dark:foreground (components/ui/label.tsx)"
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

        <Section title="Color palettes">
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Colors are defined as CSS variables in{" "}
            <code className="font-mono text-sm text-foreground">globals.css</code>{" "}
            (<code className="font-mono text-sm">:root</code> and{" "}
            <code className="font-mono text-sm">.dark</code>) and exposed to Tailwind
            via <code className="font-mono text-sm">@theme inline</code>. Cards group
            tokens that share the same fill in the current theme where it helps;
            hex matches the swatch. Some groups note when values diverge between light
            and dark or between aliases.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colorGroups.map((group) => (
              <ColorSwatchCard
                key={group.entries.map(colorSwatchEntryKey).join("-")}
                title={group.title}
                entries={group.entries}
                footnote={group.footnote}
              />
            ))}
          </div>
        </Section>

        <Section title="Secondary colors">
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Opaque brand fills for provider and user initials avatars. Colors are
            defined in{" "}
            <code className="font-mono text-sm text-foreground">
              lib/brand-avatar-colors.ts
            </code>{" "}
            and assigned deterministically with{" "}
            <code className="font-mono text-sm">brandAvatarClassForId</code> so each
            id keeps the same swatch across renders and theme toggles.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {BRAND_AVATAR_PALETTE_FOR_DOCS.map((p) => (
              <ColorSwatchCard
                key={p.hex}
                title={p.label}
                entries={[
                  {
                    label: "Fill",
                    className: p.bgClass,
                    reference: p.hex,
                  },
                ]}
              />
            ))}
          </div>
        </Section>

        <Section title="Borders">
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Stroke width is <code className="font-mono text-sm">--border-stroke</code>{" "}
            (1.5px). Use <code className="font-mono text-sm">border-app</code> with a
            color such as <code className="font-mono text-sm">border-border-subtle</code>{" "}
            for the default hairline.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-lg border-app border-border-subtle bg-field-bg px-4 py-3 text-sm text-foreground">
              border-app + border-border-subtle
            </div>
            <div className="rounded-lg border-app-t border-border-subtle bg-field-bg px-4 py-3 text-sm text-foreground">
              border-app-t only
            </div>
            <div className="rounded-lg border-app-b border-border-subtle bg-field-bg px-4 py-3 text-sm text-foreground">
              border-app-b only
            </div>
          </div>
        </Section>

        <Section title="Border radius">
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Radius tokens in <code className="font-mono text-sm">@theme inline</code>{" "}
            cluster around <strong className="font-medium text-foreground">4px</strong>{" "}
            and <strong className="font-medium text-foreground">6px</strong> (see{" "}
            <code className="font-mono text-sm">--radius-sm</code> through{" "}
            <code className="font-mono text-sm">--radius-lg</code>).
          </p>
          <div className="mt-6 flex flex-wrap items-end gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="size-16 rounded-sm bg-field-bg border-app border-border-subtle" />
              <span className="font-mono text-xs text-muted-foreground">rounded-sm (4px)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="size-16 rounded-md bg-field-bg border-app border-border-subtle" />
              <span className="font-mono text-xs text-muted-foreground">rounded-md (4px)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="size-16 rounded-lg bg-field-bg border-app border-border-subtle" />
              <span className="font-mono text-xs text-muted-foreground">rounded-lg (6px)</span>
            </div>
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}
