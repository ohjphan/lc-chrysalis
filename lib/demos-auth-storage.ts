/** Persist developer-portal access preview for the standalone demos experience. */
export const DEMOS_PORTAL_ACCESS_STORAGE_KEY = "lc_demos_portal_access";

const TRUE_VALUES = new Set(["1", "true", "yes"]);

export function readDemosPortalAccess(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const v = window.localStorage.getItem(DEMOS_PORTAL_ACCESS_STORAGE_KEY);
    if (v == null) return false;
    return TRUE_VALUES.has(v.trim().toLowerCase());
  } catch {
    return false;
  }
}

export function writeDemosPortalAccess(granted: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (granted) {
      window.localStorage.setItem(DEMOS_PORTAL_ACCESS_STORAGE_KEY, "1");
    } else {
      window.localStorage.removeItem(DEMOS_PORTAL_ACCESS_STORAGE_KEY);
    }
  } catch {
    /* ignore quota / private mode */
  }
}
