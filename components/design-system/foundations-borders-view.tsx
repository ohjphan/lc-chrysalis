import type { ReactNode } from "react";

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

export function FoundationsBordersView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Borders</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Border stroke and radius tokens used across inputs, cards, dialogs, and
          supporting surfaces.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        <Section title="Border styles">
          <p className="max-w-2xl text-base font-normal text-muted-foreground">
            Stroke width is{" "}
            <code className="font-mono text-sm">--border-stroke</code> (1.5px). Use{" "}
            <code className="font-mono text-sm">border-app</code> with a color such
            as <code className="font-mono text-sm">border-border-subtle</code> for
            the default hairline.
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
            now scale from <strong className="font-medium text-foreground">2px</strong>{" "}
            through <strong className="font-medium text-foreground">6px</strong>.
            Use <code className="font-mono text-sm">rounded-sm</code> for embedded
            controls like the button that sits inside a field, then step up through{" "}
            <code className="font-mono text-sm">--radius-md</code> to{" "}
            <code className="font-mono text-sm">--radius-lg</code>.
          </p>
          <div className="mt-6 flex flex-wrap items-end gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="size-16 rounded-sm border-app border-border-subtle bg-field-bg" />
              <span className="font-mono text-xs text-muted-foreground">
                rounded-sm (2px)
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="size-16 rounded-md border-app border-border-subtle bg-field-bg" />
              <span className="font-mono text-xs text-muted-foreground">
                rounded-md (4px)
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="size-16 rounded-lg border-app border-border-subtle bg-field-bg" />
              <span className="font-mono text-xs text-muted-foreground">
                rounded-lg (6px)
              </span>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
