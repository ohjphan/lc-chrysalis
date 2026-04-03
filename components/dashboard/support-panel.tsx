"use client";

import * as React from "react";
import { Copy, ExternalLink, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SUPPORT_DOCS_LABEL,
  SUPPORT_DOCS_URL,
  SUPPORT_EMAIL,
} from "@/lib/support-links";
import { cn } from "@/lib/utils";

const supportRowClass =
  "flex items-center gap-3 rounded-md border-app border-border-subtle bg-field-bg px-3 py-2";

const supportIconWrapClass =
  "flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-accent-green/10 text-accent-green";

function SupportActionRow({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className={supportRowClass}>
      <div className={supportIconWrapClass}>{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="font-parabolica text-base font-[550] text-foreground">
          {title}
        </p>
        <p className="truncate text-xs font-normal text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="shrink-0">{action}</div>
    </div>
  );
}

export function SupportPanel({
  onClose,
  showCloseButton = true,
  className,
}: {
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={cn("px-5 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-7", className)}>
      <div className="flex flex-col text-left">
        <h2 className="font-page-h2 text-heading">Support</h2>
        <p className="text-base font-normal text-muted-foreground">
          Have a question?
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <SupportActionRow
          icon={<Mail className="size-4" aria-hidden />}
          title="Email us"
          description={SUPPORT_EMAIL}
          action={
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="h-8 px-3"
              onClick={copyEmail}
            >
              <Copy className="size-3.5" aria-hidden />
              {copied ? "Copied" : "Copy"}
            </Button>
          }
        />
        <SupportActionRow
          icon={<FileText className="size-4" aria-hidden />}
          title="Visit our docs"
          description={SUPPORT_DOCS_LABEL}
          action={
            <Button variant="secondary" size="sm" className="h-8 px-3" asChild>
              <a
                href={SUPPORT_DOCS_URL}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink className="size-3.5" aria-hidden />
                Visit
              </a>
            </Button>
          }
        />
      </div>

      {showCloseButton ? (
        <div className="mt-6 flex justify-end">
          <Button type="button" variant="primary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      ) : null}
    </div>
  );
}
