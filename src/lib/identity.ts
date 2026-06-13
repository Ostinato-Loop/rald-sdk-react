import type { IdentityAction } from "./types";

/** Canonical identity portal for all RALD products */
export const IDENTITY_PORTAL_URL = "https://profiles.rald.cloud";

/**
 * Stable path map — products NEVER handle identity actions locally.
 * Source of truth: ONE RALD identity spec.
 */
export const ACTION_PATHS: Record<IdentityAction, string> = {
  profile:       "/account",
  account:       "/account",
  security:      "/security",
  privacy:       "/privacy",
  sessions:      "/sessions",
  devices:       "/devices",
  username:      "/account",
  verification:  "/account/verify",
  notifications: "/notifications",
};

export interface BuildIdentityUrlOptions {
  appId?: string;
  returnTo?: string;
  portalUrl?: string;
}

/**
 * Build the full URL for an identity action.
 * Uses direct path construction (no network round-trip) — instant redirect.
 */
export function buildIdentityUrl(
  action: IdentityAction,
  options: BuildIdentityUrlOptions = {}
): string {
  const base = options.portalUrl ?? IDENTITY_PORTAL_URL;
  const path = ACTION_PATHS[action];
  const params = new URLSearchParams();
  if (options.appId)    params.set("app_id",    options.appId);
  if (options.returnTo) params.set("return_to", options.returnTo);
  const query = params.toString();
  return `${base}${path}${query ? `?${query}` : ""}`;
}
