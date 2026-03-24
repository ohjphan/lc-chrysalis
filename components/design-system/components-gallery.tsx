"use client";

import * as React from "react";
import { PageContainer } from "@/components/dashboard/page-container";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-2 border-app-b border-border-subtle pb-10 last:border-0">
      <h2 className="font-page-h2">{title}</h2>
      {children}
    </section>
  );
}

export function ComponentsGallery() {
  const [pill, setPill] = React.useState<"a" | "b" | "c">("a");
  const [sw, setSw] = React.useState(false);

  return (
    <PageContainer>
      <div className="flex flex-col gap-[12px]">
        <PageTitle>Components</PageTitle>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Internal design system primitives used across the Learning Commons
          developer portal.
        </p>
      </div>

      <div className="mt-10 space-y-12">
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
            <Callout>Default callout for neutral context.</Callout>
            <Callout variant="warning">
              Warning — action may affect billing.
            </Callout>
            <Callout variant="destructive">
              Destructive — this cannot be undone.
            </Callout>
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}
