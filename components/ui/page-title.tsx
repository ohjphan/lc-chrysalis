import { cn } from "@/lib/utils";

const variantClass = {
  default: "font-page-title text-heading text-balance",
  /** Landing hero: JetBrains Mono, caps — matches legacy dashboard page title look */
  heroMono:
    "font-mono text-[28px] font-light uppercase leading-tight tracking-[0.04em] text-heading text-balance",
  /** Sign up / profile setup: JetBrains Mono, caps, 5% tracking */
  authBranded:
    "font-mono text-[28px] font-light uppercase leading-tight tracking-[5%] text-heading text-balance",
} as const;

export function PageTitle({
  className,
  children,
  variant = "default",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: keyof typeof variantClass;
}) {
  return (
    <h1 className={cn(variantClass[variant], className)}>{children}</h1>
  );
}
