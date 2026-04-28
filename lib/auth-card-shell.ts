const AUTH_CARD_BASE =
  "w-full max-w-[440px] rounded-[4px] border-app border-border-subtle bg-background shadow-none dark:bg-sidebar";

/** Sign in / create account: matches tab + OAuth layout (tighter top, extra bottom). */
export const AUTH_CARD_SHELL = `${AUTH_CARD_BASE} px-[40px] pb-[30px] pt-[20px]`;

/** Profile-setup terms step: 40px padding on all sides. */
export const AUTH_CARD_SHELL_UNIFORM = `${AUTH_CARD_BASE} p-[40px]`;
