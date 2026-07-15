# BIRD 2026–2035 — Bangsamoro Investment Roadmap Platform

> **Emerging Bangsamoro: A Hub for Resilient and Ethical Growth**

Official strategic planning platform for the **Bangsamoro Investment Roadmap Development (BIRD) 2026–2035**, developed by **ASilva Innovations** for the **Bureau of Investments – Ministry of Trade, Investments and Tourism (BOI-MTIT), BARMM**.

---

## 🌐 Live Platform
- **Home:** https://bangsamoro-investment-roadmap.asilvainnovations.com
- **Web App:** https://bird-app.asivainnovations.com
- **User Manual:** https://bird-user-manual.asilvainnovations.com
- **Validation Survey:** https://bird-survey.asilvainnovations.com
- **Developer Docs:** https://docs-strat-planner-pro.asilvainnovations.com

---

## 📋 About BIRD 2026–2035

The **Bangsamoro Investment Roadmap Development (BIRD) 2026–2035** is a 10-year blueprint for accelerating investment-led growth in the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM). It is organized around the **Bangsamoro Economic and Investment Ecosystem (BEIE) Framework** — five interconnected investment clusters anchored by Moral Governance.

| Indicator | Baseline | 2030 Target | 2035 Target |
|-----------|----------|-------------|-------------|
| GRDP | ₱299.5B (2024) | ₱400B | ₱550B+ |
| Investment Approvals | ₱5.1B (Q1 2026) | ₱8B p.a. | ₱15B p.a. |
| Poverty Incidence | 34.8% (1H 2023) | <25% | <20% |
| Halal-Certified MSMEs | ~500 | 2,000+ | 5,000+ |
| Electrification | ~75% | 90% | 100% |
| Total BIRD Budget | — | Phase 1–2: ₱85–110B | ₱120–160B |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand + React Query |
| Backend | Supabase (Auth, PostgreSQL, Realtime) |
| Edge Functions | Supabase Edge Runtime (Deno) |
| AI | OpenAI GPT-4o via ai-strategy-assistant edge function |
| Routing | React Router v6 |
| Charts | Recharts |
| Export | jsPDF + docx |

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- npm or yarn
- Supabase account (two projects configured — see Environment Variables)

### Installation

```bash
# Clone repository
git clone https://github.com/asilvainnovations/BIRD-2026-2035
cd bird-2026-2035

# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env
# → Fill in all VITE_ variables (see Environment Variables below)

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview production build locally
```

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# ── Supabase (primary data project: lydsisparsmvextskevw) ────────────────────
VITE_SUPABASE_URL=https://lydsisparsmvextskevw.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>

# ── Branding assets (public CDN) ─────────────────────────────────────────────
VITE_BRAND_LOGO_URL=https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/MTIT%20Logo.png
VITE_AI_STRATEGIST_AVATAR_URL=https://appimize.app/assets/apps/user_1097/images/2c7d825bf937_232_1097.png
VITE_BANNER_INVESTMENT_URL= https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/1.Banner.png

# ── External URLs ─────────────────────────────────────────────────────────────
VITE_BIRD_HOME_URL=https://bangsamoro-investment-roadmap.asilvainnovations.com
VITE_USER_MANUAL_URL=https://bird-app-user-manual.asilvainnovations.com
VITE_DEVELOPER_DOCS_URL=https://asilvainnovations.github.io/strat-planner-pwa/developer-doc.html
VITE_BIRD_APP_URL=https://bird-app.asilvainnovations.com

# ── Feature Flags ─────────────────────────────────────────────────────────────
VITE_ENABLE_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=true
VITE_LOG_LEVEL=info
```

> **⚠️ Supabase Secrets (Edge Functions):** The `OPENAI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` must be configured in the Supabase Secrets dashboard for the **rgvteytgkugdqdodedxq** project (the edge function host). Supabase secret names **cannot contain hyphens** — use `OPENAI_API_KEY'

---

## 📁 Project Structure

```
bird-2026-2035/
├── src/
│   ├── components/
│   │   ├── branding/                # Logo, Avatar components
│   │   │   ├── Logo.tsx    
│   │   ├── settings/                # Settings page
│   │   │   ├── SettiingsPage.tsx    
│   │   ├── strategic/               # Core feature components
│   │   │   ├── FloatingAIAssistant.tsx  # ← AI assistant (all pages)
│   │   │   ├── MELDashboard.tsx         # MEL monitoring dashboard
│   │   │   ├── SWOTAnalysis.tsx         # SWOT with RI scoring
│   │   │   ├── SystemsThinking.tsx      # CLD builder + archetypes
│   │   │   ├── StrategyMatrix.tsx       # TOWS matrix
│   │   │   ├── BalancedScorecard.tsx    # BSC (4 perspectives)
│   │   │   ├── PAPsManagement.tsx       # Programs, Activities, Projects
│   │   │   ├── TemplatesLibrary.tsx     # Pre-built plan templates
│   │   │   ├── TeamCollaboration.tsx    # Multi-user collaboration
│   │   │   ├── PlanExport.tsx           # PDF/Word/Excel export
│   │   │   ├── NavigationTutorial.tsx   # Onboarding tutorial
│   │   │   ├── HeroSection.tsx          # Landing page
│   │   │   ├── Sidebar.tsx              # Navigation sidebar
│   │   │   └── Topbar.tsx               # Top navigation bar
│   │   │   └── SurveyWizard.tsx         # Survey engine
│   │   │   └── Section 1-16 of survey   # Survey components
│   │   │   └── ContextPanel.tsx         # Survey engine
│   │   └── ui/                          #  resusable shadcn/ui primitives 
│   │   │   └── accordion.tsx             
│   │   │   └── alert-dialog.tsx 
│   │   │   └── aspect-ratio.tsx
│   │   │   └── avatar.tsx            
│   │   │   └── badge.tsx
│   │   │   └── breadcrumb.tsx
│   │   │   └── button.tsx
│   │   │   └── calendar.tsx
│   │   │   └── card.tsx         
│   │   │   └── carousel.tsx
│   │   │   └── chart.tsx
│   │   │   └── checkbox.tsx           
│   │   │   └── collapsible.tsx
│   │   │   └── command.tsx
│   │   │   └── context-menu.tsx          
│   │   │   └── dialog.tsx
│   │   │   └── drawer.tsx
│   │   │   └── dropdown-menu.tsx
│   │   │   └── form.tsx
│   │   │   └── hover-card.tsx	      
│   │   │   └── carousel.tsx
│   │   │   └── chart.tsx
│   │   │   └──icons.tsx
│   │   │   └──input-otp.tsx
│   │   │   └──input.tsx
│   │   │   └──label.tsx
│   │   │   └──menubar.tsx
│   │   │   └──navigation-menu.tsx
│   │   │   └──pagination.tsx
│   │   │   └──popover.tsx
│   │   │   └──progress.tsx
│   │   │   └──radio-group.tsx
│   │   │   └──resizable.tsx
│   │   │   └──scroll-area.tsx
│   │   │   └──select.tsx
│   │   │   └──separator.tsx
│   │   │   └──sheet.tsx
│   │   │   └──sidebar.tsx
│   │   │   └──skeleton.tsx
│   │   │   └──slider.tsx
│   │   │   └──sonner.tsx
│   │   │   └──switch.tsx
│   │   │   └──table.tsx
│   │   │   └──tabs.tsx
│   │   │   └──textarea.tsx
│   │   │   └──toast.tsx
│   │   │   └──toaster.tsx
│   │   │   └──toggle-group.tsx
│   │   │   └──toggle.tsx
│   │   │   └──tooltip.tsx
│   │   │   └──use-toast.ts
│   │   └── auth/
│   │   │   └──AuthModal.tsx
│   │   │   └──UserProfileModal.tsx
│   ├── data/
│   │   └── bird/                    # Official BIRD 2026–2035 data
│   │       ├── kpis.ts              # KPIs & BSC leverage points
│   │       ├── actions.ts           # 2026 Priority Action Plan
│   │       ├── clds.ts              # Causal loops & archetypes
│   │       └── phases.ts            # Implementation phases
│   ├── hooks/
│   │   ├── use-mobile.tsx           
│   │   ├── use-toast.ts
│   │   └── useStrategicPlan.ts      # Plan CRUD + sync
│   │   ├── useAuth.ts               # Authentication state
│   │   ├── useBIRDData.ts           # BIRD data access hook
│   ├── lib/
│   │   ├── supabase.ts              # Supabase client + edge function URLs
│   │   ├── strategicPlanStore.ts    # Plan data schema & local storage
│   │   ├── formulas.ts              # RI, risk, KPI computation formulas
│   │   └── utils.ts                 # Utility functions
│   │   └── bird-urls.ts             # List of URLs for survey visualizations and references
│   │   └── survey-schema            # Survey data schema specifically for the validation survey
│   │   ├── api.ts
│   │   ├── motion-shim.tsx
│   │   ├── templateData.ts
│   ├── pages/
│   │   ├── Index.tsx                # Root page (AppLayout wrapper)
│   │   ├── AdminDashboard.tsx       # Admin analytics
│   │   ├── SharedPlanView.tsx       # Public share view
│   │   └── NotFound.tsx             # 404 page
│   └── contexts/
│       └── AppContext.tsx           # Global app state
├── supabase/
│   └── functions/
│       └── ai-strategy-assistant/   # Edge function (Deno)
│           └── index.ts
│       └── crm-dispatcher/          # Edge function (Deno)
│           └── index.ts
│       └── email-notifications/      # Edge function (Deno)
│           └── index.ts
│       └── strategic-planner-sync/  # Edge function (Deno)
│           └── index.ts
│   └── migrations/
│           └──complete_schema_sql
│           └──securuty_fix.sql
│           └──20260711151136_create_visit_logs_table.sql
├── public/                          # Static assets
│   └── home.html                    # Landing page
│   └── roadmap.html                 # Investment roadmap model
│   └── dashboard.html               # Investment roadmap dashboard model
│   └── resources.html               # Access to various resources
│   └── validation-survey.html       # BIRD survey mimicking the react SurveyWizard as fallback
│   └── survey-dashboard.html        # BIRD survey dashboard
│   └── action-plan.html
│   └── basilan-outlook.html
│   └── beie-basics.html
│   └── contact.html
│   └── cookie-policy.html
│   └── feedback.html
│   └── ieb.html
│   └── kpi.html
│   └── lanao-delsur-outlook.html
│   └── lds-poa.html
│   └── maguindanao-delnorte-outlook.html
│   └── maguindanao-delsur-outlook.html
│   └── manifest.json
│   └── options.html
│   └── placeholder.svg
│   └── privacy-policy.html
│   └── resources.html
│   └── robots.txt
│   └── sga-outlook.html
│   └── sitemap.xml
│   └── slides.html
│   └── strategy-map.html
│   └── survey-orientation.html
│   └── sw.js
│   └── tawi-tawi-outlook.html
│   └── user-manual.html
├── .env                             # Environment variables (not committed)
├── .env.example                     # Environment template
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
└── .gitignore
└── CHANGELOG.md
└── FILES-LINKS.md
└── LICENSE
└── README.md
└── SURVEYGUIDE.md
└── USER_MANUAL.md
└── components.json
└── eslint.config.js
└── index.html
└── package-lock.json
└── package.json
└── postcss.config.js
└── tsconfig.app.json
└── tsconfig.json
└── tsconfig.node.json
└── vercel.json
└── vite-env.d.ts
└── vite.config.ts
└── yarn.lock
```

---

## 🧠 Features

### 1. MEL Dashboard
Real-time monitoring of BIRD 2026–2035 KPIs across all 4 BSC perspectives. Displays Phase Progress Tracker, Pareto Vital Few KPIs, Priority Action Plan status, and Feedback Loop Health Monitor.

### 2. SWOT Analysis
Structured SWOT with the BIRD Resilience Index (RI) scoring methodology:
- **Strengths RI** = (Impact × Likelihood) / 5
- **Opportunities RI** = √(Impact × Likelihood)
AI-assisted SWOT generation via BIRD AI.

### 3. Systems Thinking
Interactive Causal Loop Diagram (CLD) builder with:
- Drag-and-drop node/link editor
- Automatic loop detection (Reinforcing R / Balancing B)
- 7 BARMM-specific Systems Archetypes library
- Meadows Leverage Point analysis (L1–L12)

### 4. Strategy Matrix (TOWS)
Auto-derive SO, ST, WO, WT strategic options from SWOT data. Each option links to a specific leverage point, BEIE cluster, and BIRD phase.

### 5. Balanced Scorecard
Full BSC implementation with 4 perspectives (Financial, Stakeholder, Internal Process, Learning & Growth), KPI tracking, and causal strategy maps.

### 6. PAPs Management
Track Programs, Activities, and Projects with:
- Budget tracking (₱PHP values)
- BEIE cluster and BSC perspective linkage
- BIRD phase assignment
- Status tracking with Kanban-style view

### 7. BIRD AI Strategy Assistant
Floating AI consultant available on every page. Powered by GPT-4o with deep BARMM investment context:
- Context-aware suggestions per active workspace
- Conversational strategy advice
- AI-generated SWOT, strategies, KPIs, PAPs, and insights
- BIMP-EAGA, halal industry, Islamic finance expertise

### 8. Plan Export
Generate professional exports:
- PDF (print-ready reports)
- Word Document (.docx)
- Excel Spreadsheet (.xlsx)

### 9. Team Collaboration
Multi-user plans with:
- Real-time presence indicators
- Role-based access (Owner, Admin, Editor, Viewer)
- Comments and activity log
- Shareable links

---

## 🗄️ Database Schema (Supabase)

Key tables on `lydsisparsmvextskevw.supabase.co`:

```sql
-- User profiles
user_profiles (id, email, full_name, organization, job_title, phone, avatar_url, notification_preferences)

-- Strategic plans (primary data store)
strategic_plans (id, user_id, organization_id, name, data jsonb, version, is_public, created_at, updated_at)

-- Shared plan links
share_links (share_id, plan_id, owner_id, plan_data jsonb, public_access, revoked, created_at)

-- Admin users
admins (email, created_at)

-- Visit analytics
visit_logs (id, user_id, email, page, device, location, created_at)

-- AI interaction audit trail
ai_interaction_logs (id, plan_id, action, input_data jsonb, output_data jsonb, created_at)
```

---

# BIRD 2026–2035 Validation Survey — Static PWA Fallback

This is the rebuilt, complete, offline-capable version of `survey.html`, plus its
companion `survey-dashboard.html`, `manifest.webmanifest`, and `sw.js`. Deploy the
four files together, side by side, in the same folder — no build step required.

## What was actually wrong with the uploaded `survey.html`

The uploaded file was **not a working survey** — it was markup only, truncated at
section 14 of 16 (cut off mid-`<select>`, no closing tags), and it had **zero
JavaScript**. `x-data="surveyWizard()"` was referenced but `surveyWizard()` was
never defined anywhere. The `BIRD-2026-2035.zip` mentioned in the original request
(which was supposed to contain `SurveyWizard.tsx`) was never actually uploaded.

This rebuild reconstructs all 16 sections faithfully to the original visual style
(dark emerald/gold, Georgia serif headers, glass-morphism cards) and — using
`BIRD_Survey_Data_Map.xlsx` as the authoritative field spec — writes the complete
Alpine.js engine that was missing: state, validation, kill switches, conditional
logic, scoring, autosave, and submission.

## Files

| File | Purpose |
|---|---|
| `survey.html` | The 16-section validation survey (Alpine.js + Tailwind CDN + ECharts) |
| `survey-dashboard.html` | Live results dashboard (Chart.js), now with offline fallback |
| `manifest.webmanifest` | PWA manifest — installable on mobile home screens |
| `sw.js` | Service worker — caches the app shell + CDN libraries for full offline use |

## What's live vs. what's stubbed

**Live (already wired to a real backend):**
- `survey.html` submits directly to the same Supabase project already hardcoded
  into the uploaded `survey-dashboard.html` (`lydsisparsmvextskevw.supabase.co`),
  inserting into a `survey_responses` table with columns
  `data, timestamp, category, province, organization` — the exact shape the
  dashboard already expects.
- **Verify Row-Level Security is configured** on `survey_responses` before going
  live: anon key should be able to `INSERT` only, never `SELECT/UPDATE/DELETE`.
  The dashboard's anon key currently has read access (`SELECT`) — confirm that's
  intentional for a public dashboard, or gate it behind auth if not.

**Always-on regardless of Supabase reachability:**
- Every submission is written to `localStorage` first
  (`bird_survey_responses_v1`), so the survey and dashboard both work fully
  offline, on a single device, with zero backend. If Supabase is unreachable,
  the dashboard automatically falls back to on-device data and shows a banner
  saying so.
- Auto-save to `localStorage` every ~1 second (debounced) while filling the
  survey, with a draft-restore prompt on return visits.

**Stubbed (clearly marked, easy to wire up later):**
- `AI_STRATEGY_ASSISTANT` Edge Function — `CONFIG.AI_ASSISTANT_ENABLED = false`
  by default. Without it, a local heuristic (same weighting logic as
  `formulas.ts`) picks a recommended strategy from your IEDS matrix scores
  instantly, offline. Flip the flag and set `AI_ASSISTANT_URL` once you have a
  real Edge Function.
- Auth — the survey is intentionally public/anonymous, matching your own spec's
  "public survey preview" exception. No login wall.

## The 16 sections (per `BIRD_Survey_Data_Map.xlsx`)

1. BEIE Framework Context · 2. Moral Governance Operating System ·
3. Cluster 1: Foundations · 4. Cluster 2: Transformers · 5. Cluster 3: Enablers ·
6. Cluster 4: Connectors · 7. Cluster 5: Financiers · 8. Strategic Options ·
9. Budget & Targets · 10. IEDS Matrix Evaluation · 11. Provincial Equity ·
12. Climate Resilience · 13. Policy & Governance · 14. Demographics ·
15. C.A.R.E. Validation · 16. Final Submission

Conditional/provincial logic is wired for **Basilan** (Pestalotiopsis + ZBIP
alerts), **Maguindanao del Norte/Sur** (Halal Park follow-up), **Tawi-Tawi**
(seaweed value chain), and **Lanao del Sur** (Lake Lanao), per the Conditional
Logic Map sheet.

Kill switches (hard stops) are enforced on Sections 1, 2, 10, 15, and 16, per the
Validation & Kill Switches sheet — you cannot advance past these without
completing every required field.

## Real-time scoring formulas (mirrors `formulas.ts`)

- Threat/Vulnerability Index: `(Impact² × Likelihood) / 25` — used for El Niño,
  Pestalotiopsis, and post-harvest-loss risk scoring in Section 3.
- IEDS Matrix: 4 strategies (HEDS/GEMS/IFES/IEDS) × 7 dimensions (0–10 each),
  visualized live via an ECharts bar chart, with a mobile card layout that
  replaces the wide table below the `md:` breakpoint.
- C.A.R.E. average and indicative ROI estimate (clearly labeled as illustrative,
  not a forecast) shown live in the sidebar and on the success screen.

## Plain-language / visual context (per your requirement)

Every section shows, above the form: a one-line plain-English explainer, plus
any relevant images, a video (opens in an inline lightbox), and a "Learn more"
link — all pulled from your `bird-urls.ts` registry (BEIE cluster diagrams,
systems archetypes, provincial diagnostics, etc.), so no question is asked
without visual/contextual grounding.

## Mobile-first specifics

- Sticky bottom nav bar (Back/Next) always visible, thumb-reachable.
- 44px+ tap targets on all checkboxes/radios; 16px input font size (prevents
  iOS auto-zoom on focus).
- IEDS matrix (section 10) renders as scrollable per-strategy cards on phones
  instead of a 9-column table.
- Step-dot quick nav lets you jump back to any completed section.

## Known gaps / next steps

- No automated accessibility audit was run (WCAG 2.1 AA target stated in your
  spec) — visible focus rings, label associations, and color contrast were
  applied by hand but not machine-verified.
- Rate limiting (5 submissions/hour/user) requires server-side enforcement
  (Supabase Edge Function or RLS policy) — not something a static HTML file can
  enforce on its own; flagging so it isn't assumed to be covered.


## 🔧 Troubleshooting

### AI Assistant not responding
1. Check that `OPENAI_API_KEY` is set in Supabase Secrets for project `rgvteytgkugdqdodedxq`
2. Verify the edge function is deployed: `supabase functions deploy ai-strategy-assistant`
3. Check browser console for CORS errors — the edge function must return `Access-Control-Allow-Origin: *`

### Plans not syncing
1. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`
2. Check Supabase Row Level Security (RLS) policies on `strategic_plans` table
3. Inspect Network tab for 401/403 responses from the sync edge function

### Authentication issues
1. Verify Supabase Auth is enabled for the project
2. Check email confirmation settings (may need to disable for development)
3. Magic link redirects require the site URL to be whitelisted in Supabase Auth settings

### Build errors
```bash
npm run type-check    # Check TypeScript errors
npm run lint          # Check ESLint issues
```

---

## 🔐 Security Notes

- Never commit `.env` to version control — it contains API keys
- The `SUPABASE_SERVICE_ROLE_KEY` is server-side only — never expose to the browser
- RLS policies must be enabled on all Supabase tables
- The OpenAI API key should be rotated periodically

---

## 📞 Support & Contact

**Bureau of Investments — Ministry of Trade, Investments and Tourism (BOI-MTIT), BARMM**
- Telephone: (064) 557 2819
- Mobile: 0917.834.333
- Email: boi@bangsamoro.gov.ph

**Developer: ASilva Innovations**
- Platform: https://asilvainnovations.com

---

## 📄 License

© 2026 Bureau of Investments – Ministry of Trade, Industry and Tourism (BOI-MTIT), BARMM.  
Licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/).
