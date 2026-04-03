"use client";

import { ThemeToggleButton } from "@/components/dashboard/theme-toggle-button";

function sectionTitleClass() {
  return "font-page-h2 text-heading dark:text-foreground";
}

export function AppearanceSettingsView() {
  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-6">
        <h2 className={sectionTitleClass()}>Appearance</h2>
        <div className="flex flex-col gap-2 rounded-lg border-app border-border-subtle bg-field-bg/50 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 dark:bg-field-bg/30">
          <div className="min-w-0 space-y-1">
            <p className="text-base font-medium text-heading dark:text-foreground">
              Theme
            </p>
            <p className="text-sm font-normal text-muted-foreground">
              Choose light or dark for the developer portal. Your choice is saved on
              this device.
            </p>
          </div>
          <ThemeToggleButton className="focus-visible:ring-offset-background" />
        </div>
      </section>
    </div>
  );
}
