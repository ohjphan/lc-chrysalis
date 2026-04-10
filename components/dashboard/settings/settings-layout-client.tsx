"use client";

import { usePathname, useRouter } from "next/navigation";
import { DASHBOARD_CONTENT_WIDTH_CLASS } from "@/components/dashboard/page-container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTitle } from "@/components/ui/page-title";
import { SETTINGS_NAV } from "@/lib/settings-nav";
import { cn } from "@/lib/utils";

export function SettingsLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const activeSection = SETTINGS_NAV.find(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`),
  );

  return (
    <div className={cn(DASHBOARD_CONTENT_WIDTH_CLASS, "pb-12 pt-10")}>
      <PageTitle className="mb-8">Settings</PageTitle>
      <Tabs
        value={activeSection?.href ?? SETTINGS_NAV[0]?.href}
        onValueChange={(href) => router.push(href)}
        className="min-w-0"
      >
        <TabsList className="w-full">
          {SETTINGS_NAV.map((item) => (
            <TabsTrigger key={item.href} value={item.href}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="mt-8 min-w-0">{children}</div>
    </div>
  );
}
