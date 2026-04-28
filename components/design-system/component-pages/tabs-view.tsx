import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">
          Tab Group
        </h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Animated list with bottom border, sliding active indicator, and
          keyboard-accessible triggers.
        </p>
      </div>
      <div className="space-y-10">
        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Default
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Uses a simple underline tab layout with a green active bar and
              no leading indicator.
            </p>
          </div>
          <Tabs defaultValue="one" className="max-w-md">
            <TabsList variant="underline">
              <TabsTrigger variant="underline" value="one">
                Overview
              </TabsTrigger>
              <TabsTrigger variant="underline" value="two">
                API
              </TabsTrigger>
              <TabsTrigger variant="underline" value="three">
                Events
              </TabsTrigger>
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
        </section>
      </div>
    </div>
  );
}
