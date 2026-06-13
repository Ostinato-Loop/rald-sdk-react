/**
 * RALD identity actions — maps to pages on profiles.rald.cloud
 */
export type IdentityAction =
  | "profile"
  | "account"
  | "security"
  | "privacy"
  | "sessions"
  | "devices"
  | "username"
  | "verification"
  | "notifications";

export interface RALDConfig {
  /** Your product's app_id (passed to identity portal as ?app_id=) */
  appId: string;
  /** Override the identity portal base URL (default: https://profiles.rald.cloud) */
  identityPortalUrl?: string;
  /** Override the auth API base URL (default: https://auth.rald.cloud) */
  authApiUrl?: string;
}

export interface RALDUser {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  avatarUrl?: string;
  verified: boolean;
}
