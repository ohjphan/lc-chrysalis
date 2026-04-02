"use client";

import * as React from "react";
import { PageContainer } from "@/components/dashboard/page-container";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
  ColorBadge,
  SecondaryPaletteBadge,
} from "@/components/ui/color-badge";
import { BRAND_AVATAR_BADGES_FOR_DOCS } from "@/lib/brand-avatar-colors";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageTitle } from "@/components/ui/page-title";
import { PillToggleGroup } from "@/components/ui/pill-toggle-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogomarkLoadingAnimation } from "@/components/design-system/logomark-loading-animation";
import { ToastVariantPreview } from "@/components/design-system/toast-variant-preview";
import {
  toastError,
  toastNeutral,
  toastSuccess,
  toastWarning,
} from "@/lib/toast-variants";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2 border-app-b border-border-subtle pb-10 last:border-0">
      <h2 className="font-page-h2 text-heading dark:text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export function ComponentsGallery() {
  const [pill, setPill] = React.useState<"a" | "b" | "c">("a");
  const [sw, setSw] = React.useState(false);

  return (
    <PageContainer>
      <div className="flex flex-col gap-[8px]">
        <PageTitle>Components</PageTitle>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Internal design system primitives used across the Learning Commons
          developer portal.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        <Section title="Badges">
          <div className="flex flex-wrap gap-3">
            <ColorBadge variant="gray">Gray</ColorBadge>
            {BRAND_AVATAR_BADGES_FOR_DOCS.map((swatch) => (
              <SecondaryPaletteBadge key={swatch.hex} swatch={swatch} />
            ))}
          </div>
        </Section>

        <Section title="Loading (logomark)">
          <p className="mb-4 max-w-2xl text-base font-normal text-muted-foreground">
            Full-screen or inline loader: chevrons stay{" "}
            <code className="font-mono text-sm text-foreground">#1DB470</code>{" "}
            (same as{" "}
            <code className="font-mono text-sm text-foreground">public/lc-logo.svg</code>
            ); diamond and square use the secondary palette (see{" "}
            <code className="font-mono text-sm text-foreground">
              BRAND_SECONDARY_PALETTE_HEX
            </code>
            ). A rotating radial arc around the mark matches the current accent
            (green or morph color).
          </p>
          <LogomarkLoadingAnimation />
        </Section>

        <Section title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </Section>

        <Section title="Fields">
          <div className="grid max-w-md gap-6">
            <Field
              id="demo-name"
              label="Display name"
              description="Shown on invoices and audit logs."
            >
              <Input placeholder="Learning Commons" />
            </Field>
            <Field id="demo-notes" label="Notes" optional>
              <Textarea placeholder="Optional context…" />
            </Field>
            <div className="stack-field">
              <Label>Standalone label</Label>
              <Input placeholder="With label only" />
            </div>
          </div>
        </Section>

        <Section title="Dropdown">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="Tabs">
          <Tabs defaultValue="one" className="max-w-md">
            <TabsList>
              <TabsTrigger value="one">Overview</TabsTrigger>
              <TabsTrigger value="two">API</TabsTrigger>
              <TabsTrigger value="three">Events</TabsTrigger>
            </TabsList>
            <TabsContent value="one">
              <p className="text-base font-normal text-muted-foreground">
                Tab one content — usage metrics and health.
              </p>
            </TabsContent>
            <TabsContent value="two">
              <p className="text-base font-normal text-muted-foreground">
                Tab two — REST and GraphQL references.
              </p>
            </TabsContent>
            <TabsContent value="three">
              <p className="text-base font-normal text-muted-foreground">
                Tab three — webhook deliveries.
              </p>
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="Toggles">
          <div className="flex items-center gap-3">
            <Switch checked={sw} onCheckedChange={setSw} id="demo-switch" />
            <Label htmlFor="demo-switch">Enable beta features</Label>
          </div>
        </Section>

        <Section title="Selection (pills)">
          <PillToggleGroup
            aria-label="Demo pill group"
            value={pill}
            onValueChange={setPill}
            options={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
              { value: "c", label: "Option C" },
            ]}
          />
        </Section>

        <Section title="Callouts">
          <div className="grid max-w-xl gap-3">
            <Callout
              variant="neutral"
              headline="Neutral"
              description="General updates and context for this screen or flow."
            />
            <Callout
              variant="success"
              headline="Success"
              description="Your changes were saved and are available everywhere."
            />
            <Callout
              variant="warning"
              headline="Warning"
              description="Review the details below before you continue—this may affect billing."
            />
            <Callout
              variant="destructive"
              headline="Something went wrong"
              description="We couldn’t complete that action. Try again or contact support if it keeps happening."
            />
          </div>
        </Section>

        <Section title="Toasts">
          <p className="mb-4 max-w-2xl text-base font-normal text-muted-foreground">
            Sonner toasts with shared leading icons. Use{" "}
            <code className="font-mono text-sm text-foreground">
              toastNeutral
            </code>
            ,{" "}
            <code className="font-mono text-sm text-foreground">
              toastSuccess
            </code>
            ,{" "}
            <code className="font-mono text-sm text-foreground">
              toastWarning
            </code>
            , and{" "}
            <code className="font-mono text-sm text-foreground">toastError</code>{" "}
            from{" "}
            <code className="font-mono text-sm text-foreground">
              lib/toast-variants.tsx
            </code>
            .
          </p>
          <p className="mb-4 max-w-2xl text-base font-normal text-muted-foreground">
            Each row below matches the live toast. Click or press Enter / Space to
            show it: it animates in at the{" "}
            <span className="text-foreground">bottom-right</span> of the viewport
            (Sonner).
          </p>
          <div className="flex w-full max-w-[356px] flex-col gap-3">
            <ToastVariantPreview
              variant="neutral"
              onShow={() => toastNeutral()}
            />
            <ToastVariantPreview
              variant="success"
              onShow={() => toastSuccess()}
            />
            <ToastVariantPreview
              variant="warning"
              onShow={() => toastWarning()}
            />
            <ToastVariantPreview variant="error" onShow={() => toastError()} />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}
