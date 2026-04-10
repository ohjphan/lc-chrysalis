import type { ReactNode } from "react";
import { ColorSwatchCard } from "@/components/design-system/color-swatch-card";
import {
  colorSwatchEntryKey,
  type ColorSwatchEntry,
} from "@/components/design-system/color-swatch-entry";
import { BRAND_AVATAR_PALETTE_FOR_DOCS } from "@/lib/brand-avatar-colors";

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 border-app-b border-border-subtle pb-10 last:border-0">
      <h2 className="font-page-h2 text-heading dark:text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export function FoundationsColorView() {
  const colorPalette: {
    title: string;
    entries: ColorSwatchEntry[];
    footnote?: string;
  }[] = [
    {
      title: "White",
      entries: [
        {
          label: "White",
          varName: "--background",
          className: "bg-background",
        },
      ],
      footnote: "Background.",
    },
    {
      title: "Light beige",
      entries: [
        {
          label: "Light beige",
          varName: "--sidebar-bg",
          className: "bg-sidebar",
        },
      ],
      footnote:
        "Navigation, neutral background, dropdown menu background.",
    },
    {
      title: "Warm beige (nav active)",
      entries: [
        {
          label: "Warm beige @ 70%",
          varName: "--nav-active",
          className: "bg-nav-active",
        },
      ],
      footnote:
        "Nav background active state; nav background hover state.",
    },
    {
      title: "Gray 1",
      entries: [
        { label: "Gray 1", varName: "--gray-1", className: "bg-gray-1" },
      ],
      footnote: "Border.",
    },
    {
      title: "Gray 4",
      entries: [
        { label: "Gray 4", varName: "--gray-4", className: "bg-gray-4" },
      ],
      footnote: "Muted text, eyebrow text.",
    },
    {
      title: "Gray 5",
      entries: [
        { label: "Gray 5", varName: "--gray-5", className: "bg-gray-5" },
      ],
      footnote: "Primary body text.",
    },
    {
      title: "Charcoal",
      entries: [
        { label: "Charcoal", varName: "--charcoal", className: "bg-charcoal" },
      ],
      footnote: "Heading, primary button.",
    },
    {
      title: "Accent green",
      entries: [
        {
          label: "Accent green",
          varName: "--accent-green",
          className: "bg-accent-green",
        },
      ],
      footnote: "Primary accent color, success color.",
    },
    {
      title: "Accent yellow",
      entries: [
        {
          label: "Accent yellow",
          varName: "--accent-yellow",
          className: "bg-accent-yellow",
        },
      ],
      footnote: "Warning color.",
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
      footnote: "Destructive and error color.",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Color</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Semantic tokens and brand fills used across the Learning Commons
          developer portal. Toggle theme to compare light and dark values.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        <Section title="Color palettes">
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Colors are defined in{" "}
            <code className="font-mono text-sm text-foreground">globals.css</code>{" "}
            and exposed via <code className="font-mono text-sm">@theme inline</code>.
            Each card uses the <strong className="font-medium text-foreground">brand neutral</strong> name
            (White, Light beige, Gray 1, 4-5, Charcoal, ...). Footnotes list every
            semantic variable that shares that fill in light mode so the same hex is
            not shown twice.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colorPalette.map((group) => (
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
            assigned deterministically with{" "}
            <code className="font-mono text-sm">brandAvatarClassForId</code> so each
            id keeps the same swatch across renders and theme toggles.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {BRAND_AVATAR_PALETTE_FOR_DOCS.map((p) => (
              <ColorSwatchCard
                key={p.hex}
                title={p.label}
                swatchOnly
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
      </div>
    </div>
  );
}
