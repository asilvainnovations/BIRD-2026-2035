# BIRD 2026–2035 · Change Log
**Build date:** June 2026 · **Version:** 2.1.0  
**Developer:** ASilva Innovations for BOI-MTIT, BARMM

---

## Files Modified (16 source files + 3 new documents)

### 🗄️ Data Layer — `src/data/bird/`
| File | Change |
|------|--------|
| `phases.ts` | **Full rewrite.** Budget corrected to ₱35–45B / ₱50–65B / ₱35–50B (₱120–160B total) from incorrect ₱15B/₱20B/₱20B. Added `budgetMin`, `budgetMax`, `budgetValue` fields. 6 milestones per phase with status. Added `TOTAL_BUDGET` aggregate. |
| `kpis.ts` | **Full rewrite.** Expanded from 6 to 20 KPIs across all 4 BSC perspectives. Added `ALL_BSC_KPIS[]`, `BSC_LEVERAGE_POINTS[]` with 9 detailed entries. All values verified against BIRD Ch. 6. Added `bscCode`, `leveragePoint`, `benchmark`, `perspective` fields. |
| `clds.ts` | **Full rewrite.** Expanded 4 loops → 8 causal loops (R1–R4, B1–B4). Added full 7-archetype `SYSTEMS_ARCHETYPES[]` with BARMM-specific `birdContext`, `intervention`, and `leverageInterventions`. Added `BEIE_CLUSTERS[]` and `LEVERAGE_POINTS[]` reference arrays. |
| `actions.ts` | **Full rewrite.** Expanded from 5 → 10 Priority Actions. All aligned to BIRD Ch. 7. Added `beieCluster`, `birdPhase`, `bscCode`, `sdgAlignment`, `budgetValue` (numeric). Added `ACTION_SUMMARY` aggregate. |

### 🪝 Hooks — `src/hooks/`
| File | Change |
|------|--------|
| `useBIRDData.ts` | **Full rewrite.** Strongly typed return interface `BIRDDataState`. 15+ computed metrics (KPI status counts, action budget totals, loop counts, milestone progress). Added `BARMMContext` object with verified regional data. |
| `useStrategicPlan.ts` | **Bug fix.** `SYNC_API_URL` changed from wrong project (`paibpwwszlfpsyytdnal`) to correct edge function host (`rgvteytgkugdqdodedxq`). Now uses env var with fallback. |
| `useAuth.ts` | Verified correct. No changes needed. |

### 📚 Library — `src/lib/`
| File | Change |
|------|--------|
| `supabase.ts` | **Full rewrite.** Uses `import.meta.env` VITE_ vars. Exports `BRAND_ASSETS`, `EXTERNAL_URLS`, `EDGE_FUNCTIONS` constants. Typed `fetchPlannerState()`, `saveFullState()`, `saveSinglePlan()`, `archivePlan()`, `triggerEmailNotification()` service functions. |
| `formulas.ts` | **Full rewrite.** BIRD RI formulas per official methodology (Strength RI = I×L/5, Opportunity RI = √(I×L)). Added `estimateInvestmentROI()`, `calculateLeveragePriority()`, `PHASE1_BUDGET_ALLOCATION[]`. |
| `strategicPlanStore.ts` | **Full rewrite.** New union types: `BEIECluster`, `BIRDPhase`, `LeveragePoint`. Renamed `KPI` → `PlanKPI` to avoid collision with data-layer type. Added `beieCluster`, `birdPhase`, `leveragePoint` to `BSCObjective`, `PAP`, `StrategicOption`. Sample plan updated with 20 SWOT items, 11 strategic options, 4 BSC objectives, 5 PAPs — all BIRD-verified. Added `computePlanCompletion()`. |

### 🎨 Components — `src/components/`
| File | Change |
|------|--------|
| `AppLayout.tsx` | **Integration.** Lazy-imports and renders `FloatingAIAssistant` globally — now present on all authenticated views. |
| `auth/AuthModal.tsx` | **Full redesign.** Accessible, modular sub-components (`Field`, `PasswordField`, `AlertBanner`, `SubmitButton`). 4 views: login, signup, forgot-password, check-email. Magic link support. `focus-visible` outlines. ESC-to-close. Body scroll lock. Dark-on-dark design aligned with BIRD palette. |
| `branding/Logo.tsx` | **Updated.** Sources URLs from `BRAND_ASSETS` (env var-backed). Added `BIRDWordmark` component. |
| `strategic/FloatingAIAssistant.tsx` | **Fully enhanced.** 5-view contextual suggestion sets (dashboard, swot, systems, scorecard, paps). Comprehensive `BIRD_SYSTEM_CONTEXT` with all verified data. Loading dots, graceful error state. Minimizable panel. Accessible ARIA roles. |
| `strategic/Topbar.tsx` | **Updated.** Brand URL from `EXTERNAL_URLS.PWA`. User Manual link in account menu. Search uses typed `NAV_TARGETS[]`. No hardcoded URLs. |
| `strategic/HeroSection.tsx` | **Branding fix.** Hero heading updated to BIRD vision statement. CTA text corrected. Footer updated. |
| `strategic/NavigationTutorial.tsx` | **Updated.** Welcome step updated with BIRD 2026–2035 name, BEIE phase descriptions. MEL Dashboard step updated with 5 accurate panel descriptions. |
| `settings/SettingsPage.tsx` | **Branding fix.** "Strat Planner Pro" → "BIRD 2026–2035". |
| `strategic/TeamCollaboration.tsx` | **Branding fix.** User Manual link title corrected. |
| `pages/SharedPlanView.tsx` | **Branding fix.** Footer credit updated. |

### ⚡ Edge Function — `supabase/functions/ai-strategy-assistant/`
| File | Change |
|------|--------|
| `index.ts` | **Major enhancement.** Fixed critical `OPEN_AI_API_KEY` env var name bug (now resolves `OPENAI_API_KEY`, `OPEN_AI_API_KEY`, or `OPEN_AI_BIRD_2026_2035_PROJECT_API_KEY` in order). Expanded `BIRD_CONTEXT` with all 20 BSC KPIs, provincial profiles, 5 LPs, 3 phases, 7 archetypes, regulatory anchors. All 12 action builders enhanced with BIRD-specific field references. Non-blocking AI interaction logging. TypeScript strict types throughout. |

### 📄 Root Files
| File | Change |
|------|--------|
| `index.html` | **Fixed.** All OG tags updated: "Strat Planner Pro" → "BIRD 2026–2035". Correct banner image URL. Added PWA meta tags, locale, keywords. Removed stale Bing image URLs. |
| `README.md` | **Written from scratch.** Comprehensive: tech stack, environment variables, project structure, feature descriptions, database schema, troubleshooting, security notes. |
| `USER_MANUAL.md` | **New file.** 16-chapter user manual covering every feature with step-by-step instructions, keyboard shortcuts, quick reference card. |
| `.env.example` | **New file.** Template with all required variables documented. Clarifies which secrets go in Supabase dashboard vs. `.env`. |

---

## Critical Bugs Fixed

| # | Bug | Fix |
|---|-----|-----|
| 1 | Edge function uses `OPEN_AI_API_KEY` but secret is named `OPENAI_API_KEY` — AI never works in production | Multi-fallback env var resolution; documented correct Supabase secret name |
| 2 | `useStrategicPlan.ts` pointed to wrong Supabase project for sync API | Fixed to `rgvteytgkugdqdodedxq` edge function host |
| 3 | Phase budgets completely wrong (₱15B/₱20B/₱20B instead of ₱35–45B/₱50–65B/₱35–50B) | Corrected from BIRD Ch. 7 |
| 4 | `FloatingAIAssistant` not rendered on any page | Added to `AppLayout` as global overlay |
| 5 | `KPI` type exported from both `kpis.ts` and `strategicPlanStore.ts` causing collision | Renamed store type to `PlanKPI` |
| 6 | `index.html` OG tags still said "Strat Planner Pro" | Fixed to BIRD 2026–2035 |
| 7 | Electrification baseline in sample plan said 39% (incorrect) | Corrected to ~75% per BIRD Ch. 3 |
| 8 | No `.env.example` — devs had no guidance on required secrets | Created comprehensive template |

---

*Generated by ASilva Innovations · BIRD 2026–2035 Platform v2.1.0*
