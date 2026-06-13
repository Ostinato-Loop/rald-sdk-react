# @rald/react

**RALD React SDK** — hooks and providers for any product in the ONE RALD ecosystem.

```
npm install @rald/react
```

> Peer deps: React ≥ 18

---

## useIdentityPortal

The canonical ONE RALD redirect hook. Any product uses this instead of hardcoding URLs to send users to identity management at [profiles.rald.cloud](https://profiles.rald.cloud).

```tsx
import { useIdentityPortal } from "@rald/react";

function SettingsPage() {
  const { openSecurity, openProfile, openPrivacy } = useIdentityPortal({
    appId: "my-product",
  });

  return (
    <>
      <button onClick={openProfile}>Edit Profile</button>
      <button onClick={openSecurity}>Security Settings</button>
      <button onClick={openPrivacy}>Privacy Settings</button>
    </>
  );
}
```

### Options

| Prop | Type | Description |
|------|------|-------------|
| `appId` | `string` | Your product's `app_id` — appended as `?app_id=` |
| `returnTo` | `string` | Default return URL after identity action (defaults to `window.location.href`) |
| `portalUrl` | `string` | Override identity portal URL (default: `https://profiles.rald.cloud`) |

### Methods

| Method | Description |
|--------|-------------|
| `redirect(action, returnTo?)` | Navigate to any `IdentityAction` |
| `getUrl(action, returnTo?)` | Get URL without navigating |
| `openProfile()` | → /account |
| `openSecurity()` | → /security |
| `openPrivacy()` | → /privacy |
| `openSessions()` | → /sessions |
| `openAccount()` | → /account |
| `openDevices()` | → /devices |
| `openNotifications()` | → /notifications |

---

## RALDProvider + useRALDAuth

```tsx
import { RALDProvider, useRALDAuth } from "@rald/react";

// Wrap your app:
<RALDProvider config={{ appId: "my-product" }}>
  <App />
</RALDProvider>

// In any component:
function Header() {
  const { user, authenticated, loading, signOut } = useRALDAuth();
  if (loading) return <Spinner />;
  if (!authenticated) return <LoginButton />;
  return <span>Hello, {user.displayName}</span>;
}
```

---

## Identity Actions

`type IdentityAction = "profile" | "account" | "security" | "privacy" | "sessions" | "devices" | "username" | "verification" | "notifications"`

All actions resolve to `https://profiles.rald.cloud/<path>?app_id=...&return_to=...`.

---

## Brand

Primary: `#FBBF24` (Amber Gold) · Background: `#1C1500`
