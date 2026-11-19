# BIRD production-readiness remediation bundle

## Scope and evidence
This bundle is a targeted remediation based on `BIRD_DEPLOYMENT_ASSESSMENT.md` (assessment dated 2026-07-11) and current default-branch files inspected on 2026-11-19. Findings from the old assessment were rechecked rather than blindly re-applied.

## Verified as already resolved in current source
- `AIStrategistAvatar` is exported by `src/components/branding/Logo.tsx`.
- `KPI` is exported as an alias of `PlanKPI` in `src/lib/strategicPlanStore.ts`.
- `ThemeProviderProps` is locally declared; no `next-themes/dist/types` private import remains.
- `syncTimeoutRef` uses `ReturnType<typeof setTimeout>`.
- No root `app/` or `pages/` framework routes were found in the current repository tree; this is a Vite SPA with source page components under `src/pages`.
- `date-fns@3.6` and `react-day-picker@8.10` were not changed because compatibility should be verified by the repository's actual dependency tree/build rather than blindly downgrading.

## Remediations supplied in this bundle
1. `vercel.json`: switch deployment install/build commands from Yarn to npm (`npm ci`, `npm run build`), retain explicit Vite framework/output, add standard security headers and an SPA rewrite. The old CSP rule targeted `/dashboard.htmml` (typo) and was removed rather than keeping a restrictive policy known to be scoped incorrectly. Add a properly tested CSP only after auditing all inline/CDN assets and Supabase endpoints.
2. `src/lib/supabase.ts`: remove hard-coded browser anon key fallback, fail fast when required environment variables are absent, support a separately configured Edge Functions base URL, and centralize function endpoints.
3. `public/sw.js`: replace malformed `.public/...`/`./manifest.` precache paths with valid root-relative resources; use a versioned app-shell cache, network-first navigation fallback, same-origin-only handling, and do not intercept API traffic.
4. `tsconfig.json` + `tsconfig.app.json`: make the root a project-reference config and app config extend shared alias/compiler settings with strict checking.
5. `.env.example`: document browser-safe variables and explicitly prohibit exposing service-role/API secrets in `VITE_` variables.
6. `src/pwa-register.ts`: add production-only service-worker registration; wire this module from `src/main.tsx` in the final integration.

## Manual integration needed before deploying
- Add `import './pwa-register';` to `src/main.tsx` after the CSS import. This is intentionally delivered as a separate module so the entrypoint edit can be made and reviewed explicitly.
- Ensure `index.html` manifest link targets the selected canonical manifest; repository currently contains multiple manifest naming conventions (`public/manifest.json` and a linked `manifest.webmanifest.json`). Keep one canonical file and update links consistently after verifying all static microsite/PWA routes.
- The current `public/sw.js` was survey-specific; confirm offline requirements for all public static pages and all app routes before enabling as the root-scope worker.
- Review edge-function origins. Current app has at least two different Supabase project refs in source/config, so set `VITE_SUPABASE_FUNCTIONS_URL` to the actual deployed functions project and verify function CORS/auth behavior.
- Rotate the hard-coded anon/publishable key only if it was unintentionally exposed; Supabase anon keys are designed for client exposure but must be protected by strict RLS. Never expose the service-role key.

## Assessment findings intentionally not applied without evidence
- Recharts v3 downgrade: requires compile/render audit of the existing charts; downgrade omitted.
- date-fns downgrade: requires peer-dependency/build verification; omitted.
- Sentry v10 integrations: the current minimal initialization can be valid; tracing integration and browser tracing should be introduced with test coverage and a real DSN, not assumed mandatory.
- Mixed legacy API layouts: the alleged `api/submit.js`, `app/api/cron/+server.js`, `pages/api/cron.js`, and `app/api/cron/route.js` paths are absent from the current main tree; no deletion needed.
- Unused `ErrorButton.tsx`: absent at the reported path.

## Validation status
This is a source remediation bundle, not a verified release build. Network access from this execution environment prevented a clean clone/install/build; GitHub's linked connector also rejected branch creation with HTTP 403 despite repository metadata reporting push permissions. No branch or PR was created, and `main` was not modified. Run `npm ci`, `npm run lint`, `npx tsc -b`, and `npm run build` in CI or a connected development environment before merging.
