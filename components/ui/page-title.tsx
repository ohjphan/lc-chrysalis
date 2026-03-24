import { cn } from "@/lib/utils";

export function PageTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h1
      className={cn(
        "font-mono text-[24px] font-light uppercase leading-tight tracking-[0.04em] text-heading",
        className,
      )}
    >
      {children}
    </h1>
  );
}
