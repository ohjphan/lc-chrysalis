import { Button } from "@/components/ui/button";

export function ButtonsView() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-page-h2 text-heading dark:text-foreground">Buttons</h2>
        <p className="max-w-2xl text-base font-normal text-muted-foreground">
          Action styles for primary tasks, secondary actions, low-emphasis tertiary
          controls, and destructive flows.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Default</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Tertiary</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Disabled</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" disabled>
              Primary
            </Button>
            <Button variant="secondary" disabled>
              Secondary
            </Button>
            <Button variant="ghost" disabled>
              Tertiary
            </Button>
            <Button variant="destructive" disabled>
              Destructive
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
