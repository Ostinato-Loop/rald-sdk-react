import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { RALDConfig, RALDUser } from "../lib/types";

export interface RALDContextValue {
  config: RALDConfig;
  user: RALDUser | null;
  loading: boolean;
  authenticated: boolean;
  signOut: () => Promise<void>;
}

const RALDContext = createContext<RALDContextValue | null>(null);

export interface RALDProviderProps {
  config: RALDConfig;
  /** Override auth API base URL — default uses config.authApiUrl or https://auth.rald.cloud */
  authApiUrl?: string;
  children: ReactNode;
}

/**
 * RALDProvider — wraps your app and exposes the RALD session context.
 *
 * @example
 * <RALDProvider config={{ appId: "my-product" }}>
 *   <App />
 * </RALDProvider>
 */
export function RALDProvider({ config, authApiUrl, children }: RALDProviderProps) {
  const [user, setUser]       = useState<RALDUser | null>(null);
  const [loading, setLoading] = useState(true);
  const apiBase = authApiUrl ?? config.authApiUrl ?? "https://auth.rald.cloud";

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const r = await fetch(`${apiBase}/auth/me`, { credentials: "include" });
        if (!cancelled && r.ok) {
          // API may return { user: RALDUser } or RALDUser directly
          const raw = (await r.json()) as Record<string, unknown>;
          const resolved: RALDUser | null =
            raw.user != null
              ? (raw.user as RALDUser)
              : raw.id != null
              ? (raw as unknown as RALDUser)
              : null;
          setUser(resolved);
        }
      } catch {
        // network error — stay logged out
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [apiBase]);

  const signOut = useCallback(async () => {
    await fetch(`${apiBase}/auth/logout`, { method: "POST", credentials: "include" });
    setUser(null);
  }, [apiBase]);

  return (
    <RALDContext.Provider value={{ config, user, loading, authenticated: user !== null, signOut }}>
      {children}
    </RALDContext.Provider>
  );
}

export function useRALDContext(): RALDContextValue {
  const ctx = useContext(RALDContext);
  if (!ctx) throw new Error("[rald/react] useRALDContext must be used inside <RALDProvider>");
  return ctx;
}
