"use client";

import * as React from "react";
import {
  readDemosPortalAccess,
  writeDemosPortalAccess,
} from "@/lib/demos-auth-storage";

export type DemosAuthContextValue = {
  /** After sign-in (or preview unlock); unlocks Integrate + Remix copy. */
  portalAccess: boolean;
  hydrated: boolean;
  /** Preview: use after returning from portal until real SSO wires here. */
  grantPortalAccessPreview: () => void;
  signOutDemo: () => void;
};

const DemosAuthContext = React.createContext<DemosAuthContextValue | null>(
  null,
);

export function DemosAuthProvider({ children }: { children: React.ReactNode }) {
  const [portalAccess, setPortalAccess] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setPortalAccess(readDemosPortalAccess());
    setHydrated(true);
  }, []);

  const grantPortalAccessPreview = React.useCallback(() => {
    writeDemosPortalAccess(true);
    setPortalAccess(true);
  }, []);

  const signOutDemo = React.useCallback(() => {
    writeDemosPortalAccess(false);
    setPortalAccess(false);
  }, []);

  const value = React.useMemo(
    () => ({
      portalAccess,
      hydrated,
      grantPortalAccessPreview,
      signOutDemo,
    }),
    [portalAccess, hydrated, grantPortalAccessPreview, signOutDemo],
  );

  return (
    <DemosAuthContext.Provider value={value}>
      {children}
    </DemosAuthContext.Provider>
  );
}

export function useDemosAuth(): DemosAuthContextValue {
  const ctx = React.useContext(DemosAuthContext);
  if (!ctx) {
    throw new Error(
      "useDemosAuth must be used within DemosAuthProvider (demos routes only).",
    );
  }
  return ctx;
}
