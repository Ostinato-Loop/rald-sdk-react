// ─── Hooks ───────────────────────────────────────────────────────────────────
export { useIdentityPortal } from "./hooks/useIdentityPortal";
export { useRALDAuth }        from "./hooks/useRALDAuth";

// ─── Context / Provider ──────────────────────────────────────────────────────
export { RALDProvider, useRALDContext } from "./context/RALDContext";

// ─── Types ───────────────────────────────────────────────────────────────────
export type { IdentityAction, RALDConfig, RALDUser } from "./lib/types";
export type { UseIdentityPortalOptions, UseIdentityPortalReturn } from "./hooks/useIdentityPortal";
export type { RALDContextValue, RALDProviderProps } from "./context/RALDContext";

// ─── Utilities (URL building without navigation) ─────────────────────────────
export { buildIdentityUrl, IDENTITY_PORTAL_URL, ACTION_PATHS } from "./lib/identity";
export type { BuildIdentityUrlOptions } from "./lib/identity";
