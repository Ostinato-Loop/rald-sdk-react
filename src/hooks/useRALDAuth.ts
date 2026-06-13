import { useRALDContext } from "../context/RALDContext";

/**
 * useRALDAuth — access the current RALD session user and auth helpers.
 *
 * Must be used inside <RALDProvider>.
 *
 * @example
 * const { user, authenticated, loading, signOut } = useRALDAuth();
 * if (loading) return <Spinner />;
 * if (!authenticated) return <LoginPrompt />;
 */
export function useRALDAuth() {
  const { user, loading, authenticated, signOut } = useRALDContext();
  return { user, loading, authenticated, signOut };
}
