import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Tabs</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Animated list with bottom border, sliding active indicator, and
          keyboard-accessible triggers.
        </p>
      </div>
      <div className="space-y-10">
        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 1: Green Underline
            </h3>
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

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 2: Dark
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Uses a charcoal selected state for the active tab.
            </p>
          </div>
          <Tabs defaultValue="one" className="max-w-md">
            <TabsList variant="dark">
              <TabsTrigger variant="dark" value="one">
                Overview
              </TabsTrigger>
              <TabsTrigger variant="dark" value="two">
                API
              </TabsTrigger>
              <TabsTrigger variant="dark" value="three">
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

        <section className="space-y-4">
          <div className="flex flex-col gap-[2px]">
            <h3 className="font-page-h3 text-heading dark:text-foreground">
              Option 3: Surface
            </h3>
            <p className="max-w-2xl text-base font-normal text-muted-foreground">
              Uses a beige tab container with one gray border and a white active tab.
            </p>
          </div>
          <Tabs defaultValue="one" className="max-w-md">
            <TabsList variant="surface">
              <TabsTrigger variant="surface" value="one">
                Overview
              </TabsTrigger>
              <TabsTrigger variant="surface" value="two">
                API
              </TabsTrigger>
              <TabsTrigger variant="surface" value="three">
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
