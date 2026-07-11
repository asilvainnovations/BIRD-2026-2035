# 🔍 BIRD 2026–2035 — Deployment Readiness Assessment

**Date:** 2026-07-11
**Assessor:** GitHub Copilot (static code analysis)
**Fork:** `stronghold-a3/BIRD-2026-2035`

---

## Executive Summary

After a comprehensive static analysis of the BIRD 2026–2035 repository, I've identified **19 issues** ranging from **build-breaking errors** to deployment blockers and dependency conflicts. The project is **not currently deployable** on Vercel, Netlify, or Bolt without addressing the critical issues first.

| Severity | Count | Status |
|----------|-------|--------|
| 🔴 Critical (Build-breaking) | 3 | Must fix before any deployment |
| 🟠 High | 6 | Will cause runtime errors or deployment failures |
| 🟡 Medium | 6 | May cause issues depending on platform |
| 🟢 Low | 4 | Best practices, should address |

---

## 🔴 Critical Issues (Build-Breaking)

### CRIT-1: Missing Export — `AIStrategistAvatar` in `Logo.tsx`

**File:** `src/components/strategic/FloatingAIAssistant.tsx:3`
```tsx
import { AIStrategistAvatar } from '@/components/branding/Logo';
```

**File:** `src/components/branding/Logo.tsx` — only exports:
```tsx
export const StratLogo: React.FC<LogoProps> = () => { ... };
export const MTITLogo: React.FC<LogoProps> = () => { ... };
export default StratLogo;
```

**Problem:** `AIStrategistAvatar` is imported but **never exported** from `Logo.tsx`. This will cause a build error.

**Fix:** Add the `AIStrategistAvatar` export to `Logo.tsx`, or change the import in `FloatingAIAssistant.tsx` to use `StratLogo`:
```tsx
// Option A: Add export to Logo.tsx
export const AIStrategistAvatar: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  // Implementation
};

// Option B: Update FloatingAIAssistant.tsx
import { StratLogo as AIStrategistAvatar } from '@/components/branding/Logo';
```

---

### CRIT-2: Missing Export — `KPI` in `strategicPlanStore.ts`

**Files affected:**
- `src/hooks/useStrategicPlan.ts:7` — imports `KPI`
- `src/components/strategic/BalancedScorecard.tsx:27` — imports `KPI`

**File:** `src/lib/strategicPlanStore.ts` — only exports `PlanKPI`, not `KPI`:
```tsx
export interface PlanKPI { ... }  // Line 201
```

**Problem:** Both files import `KPI` from `@/lib/strategicPlanStore`, but the module only exports `PlanKPI`. The `KPI` interface in `src/data/bird/kpis.ts` is a **different type** (MEL dashboard KPI with `id: number`, `label`, `progress`, etc.) and is not the plan-level KPI type needed by these components.

**Fix:** Add a type alias:
```tsx
// Add to strategicPlanStore.ts
export type KPI = PlanKPI;
```

---

### CRIT-3: ThemeProviderProps Import Path Issue

**File:** `src/components/theme-provider.tsx:5`
```tsx
import { ThemeProviderProps } from "next-themes/dist/types"
```

**Problem:** This import path (`next-themes/dist/types`) is **fragile** and may break depending on the `next-themes` version. The `dist/types` path is an internal implementation detail and is not part of the public API.

**Fix:** Use a local type definition instead:
```tsx
// Remove: import { ThemeProviderProps } from "next-themes/dist/types"

// Add local interface:
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: "dark" | "light" | "system";
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  attribute?: string;
  value?: Record<string, string>;
  [key: string]: any;
}
```

---

## 🟠 High Severity Issues

### HIGH-1: Unused Import — `PlanTemplate` in `AppLayout.tsx`

**File:** `src/components/AppLayout.tsx:8`
```tsx
import { PlanTemplate } from '@/lib/templateData';
```

**Fix:** Remove the unused import.

---

### HIGH-2: Development-Only Error Component Should Not Be in Production

**File:** `src/components/ErrorButton.tsx`
```tsx
export const ErrorButton: React.FC = () => {
  const handleClick = () => {
    throw new Error('This is your first error!');
  };
  // ...
};
```

**Fix:** Wrap with environment check:
```tsx
export const ErrorButton: React.FC = () => {
  if (import.meta.env.PROD) return null;
  // ... rest of component
};
```

---

### HIGH-3: Netlify Function Directory Structure Problem

**Files:**
- `api/submit.js` — references `../src/lib/survey-schema`
- `app/api/cron/+server.js` — SvelteKit-style route
- `pages/api/cron.js` — Next.js-style route
- `app/api/cron/route.js` — Next.js App Router-style route

**Problem:** The repository mixes **four different API patterns** for different frameworks. This creates a **deployment conflict**. Vercel and Netlify will be confused about which framework to use.

**Fix:** Consolidate API routes. For a Vite SPA deployed to Vercel:
- Create `api/submit.js` as a proper Vercel Serverless Function
- Remove SvelteKit/Next.js-style routes
- Inline the survey schema or use a standalone validation package

---

### HIGH-4: `recharts` v3 Breaking Changes

**File:** `package.json:63`
```json
"recharts": "^3.0.0"
```

**Problem:** Recharts v3 introduced significant breaking changes from v2.

**Fix:** Downgrade to `recharts@^2.12.0` (recommended — safer).

---

### HIGH-5: `date-fns` v3 + `react-day-picker` v8 Compatibility

**File:** `package.json`
```json
"date-fns": "^3.6.0",
"react-day-picker": "^8.10.1"
```

**Problem:** `react-day-picker` v8.x was built for `date-fns` v2.x. In `date-fns` v3, several functions changed their signatures.

**Fix:** Downgrade `date-fns` to `^2.30.0` (recommended).

---

### HIGH-6: Sentry v10 Configuration Gaps

**File:** `src/main.tsx:11-16`
```tsx
const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
  });
}
```

**Problem:** Sentry v10 has a different initialization API than v7/v8.

**Fix:** Update init:
```tsx
Sentry.init({
  dsn: sentryDsn,
  environment: import.meta.env.MODE,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.1,
});
```

---

## 🟡 Medium Severity Issues

### MED-1: Hardcoded Supabase Credentials

**File:** `src/lib/supabase.ts:11-13`

**Problem:** Supabase anon key is hardcoded as a fallback.

**Fix:** Remove hardcoded fallbacks and fail fast:
```tsx
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase] Missing env vars — auth features disabled');
}
```

---

### MED-2: No Deployment Configuration Files

**Problem:** The repository lacks deployment configuration for any platform:
- No `vercel.json` for Vercel
- No `netlify.toml` for Netlify
- No `bolt.yaml` or equivalent for Bolt

**Fix:** Add a `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "max-age=31536000, immutable" }]
    }
  ]
}
```

---

### MED-3: `useStrategicPlan.ts` — `NodeJS.Timeout` Type Not Available in Browser

**File:** `src/hooks/useStrategicPlan.ts:77`
```tsx
const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
```

**Fix:** Use `ReturnType<typeof setTimeout>` instead:
```tsx
const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
```

---

### MED-4: Duplicate `app/` and `pages/` Directories May Confuse Deployment

**Directories:** `api/`, `app/`, `pages/`, `src/`, `supabase/`

**Problem:** Vercel automatically detects framework by directory structure. Having `app/` and `pages/` at the root level may cause Vercel to think this is a Next.js project.

**Fix:** Move non-Next.js `app/` and `pages/` directories into `src/` or add `vercel.json` with explicit framework settings.

---

### MED-5: Multiple `tsconfig.json` Files with Inconsistent Settings

**Files:**
- `tsconfig.json` — `"noEmit": false`, `"strict": true`
- `tsconfig.app.json` — `"noEmit": true`, `"strict": false`

**Fix:** Consolidate to a single `tsconfig.json` or ensure `tsconfig.app.json` extends the root properly.

---

### MED-6: `normalizeRow` Function Uses `any` Type

**File:** `src/hooks/useStrategicPlan.ts:96-104`
```tsx
const normalizeRow = useCallback(<T extends Record<string, any>>(row: any): T => {
```

**Fix:** Use `unknown` instead of `any`:
```tsx
const normalizeRow = useCallback(<T extends Record<string, unknown>>(row: unknown): T => {
```

---

## 🟢 Low Severity / Best Practices

### LOW-1: Unused shadcn/ui Components
Many shadcn/ui components are present but never imported. Increases bundle size.

### LOW-2: No `.env.example` File
Required environment variables are not documented.

### LOW-3: Missing Service Worker for PWA
PWA manifest exists but no service worker is registered.

### LOW-4: `manifest.webmanifest.json` vs `manifest.json` Confusion
Two manifest files may conflict.

---

## Recommended Fix Priority

| Priority | Issue | Effort |
|----------|-------|--------|
| P0 | CRIT-1: Add `AIStrategistAvatar` export | 5 min |
| P0 | CRIT-2: Add `KPI` type alias | 5 min |
| P0 | CRIT-3: Fix `ThemeProviderProps` import | 10 min |
| P1 | HIGH-3: Consolidate API routes | 30 min |
| P1 | HIGH-4: Fix or downgrade `recharts` | 15 min |
| P1 | HIGH-5: Fix `date-fns`/`react-day-picker` | 10 min |
| P1 | MED-3: Fix `NodeJS.Timeout` type | 5 min |
| P2 | MED-2: Add `vercel.json` | 10 min |
| P2 | HIGH-1, HIGH-2: Remove unused code | 10 min |
| P2 | MED-1: Remove hardcoded credentials | 10 min |
| P3 | All remaining low/medium issues | Variable |

---

## Environment Used for Assessment

- **Analysis method:** Static code analysis (no runtime execution)
- **Node version target:** 18.18.0+ (per `package.json` engines)
- **Package manager:** npm
- **Primary deployment targets:** Vercel, Netlify, Bolt

---

*This assessment was performed on commit `HEAD` of the `main` branch as of 2026-07-11.*
