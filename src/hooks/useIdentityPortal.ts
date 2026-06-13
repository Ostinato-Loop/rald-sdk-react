import { useCallback, useMemo } from "react";
import type { IdentityAction } from "../lib/types";
import { buildIdentityUrl, IDENTITY_PORTAL_URL } from "../lib/identity";

export interface UseIdentityPortalOptions {
  /** Your product's app_id — passed to profiles.rald.cloud as ?app_id= */
  appId?: string;
  /** Default return_to URL (defaults to window.location.href at call time) */
  returnTo?: string;
  /** Override the identity portal base URL */
  portalUrl?: string;
}

export interface UseIdentityPortalReturn {
  /** Navigate to a specific identity action */
  redirect: (action: IdentityAction, returnTo?: string) => void;
  /** Build the full URL for an identity action without navigating */
  getUrl: (action: IdentityAction, returnTo?: string) => string;
  openProfile:       () => void;
  openSecurity:      () => void;
  openPrivacy:       () => void;
  openSessions:      () => void;
  openAccount:       () => void;
  openDevices:       () => void;
  openNotifications: () => void;
  /** The base URL of the RALD identity portal (https://profiles.rald.cloud) */
  portalUrl: string;
}

/**
 * useIdentityPortal — canonical ONE RALD redirect pattern.
 *
 * Any product uses this hook to send users to the correct identity
 * management page at profiles.rald.cloud without ever hardcoding URLs.
 * Uses direct path construction — no network round-trip, instant redirect.
 *
 * @example
 * const { openSecurity, openProfile } = useIdentityPortal({ appId: "loop" });
 *
 * // In JSX:
 * <button onClick={openSecurity}>Security Settings</button>
 *
 * // Or with a custom return_to:
 * const { redirect } = useIdentityPortal({ appId: "loop" });
 * redirect("privacy", "https://loop.rald.cloud/settings");
 */
export function useIdentityPortal(
  options: UseIdentityPortalOptions = {}
): UseIdentityPortalReturn {
  const resolvedPortalUrl = options.portalUrl ?? IDENTITY_PORTAL_URL;

  const getUrl = useCallback(
    (action: IdentityAction, returnTo?: string): string =>
      buildIdentityUrl(action, {
        appId:     options.appId,
        returnTo:  returnTo ?? options.returnTo ?? (typeof window !== "undefined" ? window.location.href : undefined),
        portalUrl: resolvedPortalUrl,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options.appId, options.returnTo, resolvedPortalUrl]
  );

  const redirect = useCallback(
    (action: IdentityAction, returnTo?: string): void => {
      window.location.href = getUrl(action, returnTo);
    },
    [getUrl]
  );

  const shortcuts = useMemo(
    () => ({
      openProfile:       () => redirect("profile"),
      openSecurity:      () => redirect("security"),
      openPrivacy:       () => redirect("privacy"),
      openSessions:      () => redirect("sessions"),
      openAccount:       () => redirect("account"),
      openDevices:       () => redirect("devices"),
      openNotifications: () => redirect("notifications"),
    }),
    [redirect]
  );

  return { redirect, getUrl, portalUrl: resolvedPortalUrl, ...shortcuts };
}
