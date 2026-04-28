import Link from "next/link";
import { LinkedInSolidIcon } from "@/components/ui/app-brand-icons";
import { cn } from "@/lib/utils";

/** Signup footer legal pills: 10px mono, 5% tracking, #3A3A37 / #55554E */
const signupFooterLegalLinkClass =
  "inline-flex h-[22px] items-center justify-center whitespace-nowrap rounded-[4px] border-app border-gray-4 bg-gray-5 px-2 font-mono text-[10px] font-medium uppercase leading-none tracking-[5%] text-white/75 transition-[color,background-color] hover:bg-[#454542] hover:text-white/95";

export function SignupFooter({
  fixed = false,
  className,
}: {
  fixed?: boolean;
  className?: string;
}) {
  return (
    <footer
      className={cn(
        "z-30 border-app-t border-gray-4 bg-charcoal px-[20px] py-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
        fixed && "fixed bottom-0 left-0 right-0",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-wrap items-baseline gap-x-8 gap-y-1 font-mono text-[12px] font-normal uppercase tracking-[5%] text-white/65">
          <span>© {new Date().getFullYear()} Learning Commons</span>
          <span>All rights reserved</span>
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-[22px] shrink-0 items-center justify-center rounded-[4px] border-app border-gray-4 bg-gray-5 text-white transition-[color,background-color] hover:bg-[#454542]"
            aria-label="Learning Commons on LinkedIn"
          >
            <LinkedInSolidIcon className="size-3.5" />
          </a>
          <nav
            className="flex flex-wrap items-center gap-4"
            aria-label="Legal and site links"
          >
            <Link href="/terms-of-use" className={signupFooterLegalLinkClass}>
              Terms of use
            </Link>
            <Link href="/privacy-policy" className={signupFooterLegalLinkClass}>
              Privacy policy
            </Link>
            <Link href="/" className={signupFooterLegalLinkClass}>
              Site map
            </Link>
            <Link href="/privacy-policy" className={signupFooterLegalLinkClass}>
              Do not sell or share my personal info
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
