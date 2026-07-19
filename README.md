# BIRD 2026–2035 · Strat Planner Pro

<div align="center">

**Strategic Planning Platform for the Bangsamoro Investment Roadmap Development (BIRD) 2026–2035**

*Ministry of Trade, Investments and Tourism (BOI-MTIT), BARMM · Developed by ASilva Innovations*

[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-022c22)](LICENSE)

<p align="center">
  <img src="https://img.shields.io/badge/Pillars-4-C9A84C" alt="4 Pillars">
  <img src="https://img.shields.io/badge/Leverage_Points-5-1B4D3E" alt="5 CLPs">
  <img src="https://img.shields.io/badge/Planning_Modules-9-022c22" alt="9 Modules">
  <img src="https://img.shields.io/badge/Framework-BEIE-065f46" alt="BEIE">
</p>

</div>

---

## Table of Contents

- [Overview](#overview)
- [The BEIE Framework](#the-beie-framework)
- [Planning Modules](#planning-modules)
- [Architecture](#architecture)
  - [Technology Stack](#technology-stack)
  - [Project Structure](#project-structure)
  - [Data Flow](#data-flow)
- [BIRD Scoring Formulas](#bird-scoring-formulas)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Backend (Supabase)](#backend-supabase)
- [Deployment](#deployment)
- [Companion Apps & Static Pages](#companion-apps--static-pages)
- [Design System](#design-system)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**BIRD 2026–2035** is the official strategic planning platform for the **Bangsamoro Investment Roadmap Development** — a ten-year roadmap to transform the Bangsamoro Autonomous Region in Muslim Mindanao (BARMM) into a competitive, ethical, and inclusive investment destination.

The platform operationalizes the roadmap through the **Strat Planner Pro** engine: a complete strategy workflow that takes planners from SWOT diagnosis, through systems-thinking analysis and TOWS strategy formulation, to Balanced Scorecard translation, PAP execution tracking, and MEL (Monitoring, Evaluation & Learning) reporting — all anchored on the **BEIE Framework** and validated by a region-wide stakeholder survey.

| | |
|---|---|
| **Owner** | BOI-MTIT, BARMM |
| **Developer** | [ASilva Innovations](https://asilvainnovations.com) |
| **Framework** | Bangsamoro Economic & Investment Ecosystem (BEIE) |
| **Horizon** | 2026–2035 (3 implementation phases) |
| **Companion app** | [BIRD Validation Survey](https://github.com/asilvainnovations/bird-validation-survey) (standalone) |

---

## The BEIE Framework

Every module in the platform maps to the BEIE Framework — anchored by **Moral Governance** and executed through **4 Strategic Pillars**:

| # | Pillar | Key Focus |
|---|--------|-----------|
| 1 | **Halal Industry & Ecosystem** | OIC/SMIIC certification, MSME capacity, halal tourism |
| 2 | **Governance & Institutional Reform** | BEGMP digital governance, BICC, moral governance |
| 3 | **Infrastructure & Connectivity** | ZBIP energy, solar mini-grids, broadband, Halal Park |
| 4 | **Islamic Finance & Inclusive Growth** | Al-Amanah Shariah financing, BIMP-EAGA, green economy |

### 5 Critical Leverage Points (CLPs)

Each feature declares which leverage point(s) it serves:

| CLP | Focus | Systems Archetype |
|-----|-------|-------------------|
| **LP1** | Halal Certification System Integrity | Fixes that Fail |
| **LP2** | Infrastructure–Energy–Connectivity Nexus | Limits to Growth |
| **LP3** | Governance–Investor Confidence Feedback | Growth and Underinvestment |
| **LP4** | Islamic Finance Ecosystem Development | Shifting the Burden |
| **LP5** | Green Economy Revenue Framework | Tragedy of the Commons |

---

## Planning Modules

The workflow is a single continuous pipeline — each module consumes the previous module's outputs:

```
SWOT ──► Systems Thinking ──► Strategy Matrix ──► Balanced Scorecard ──► PAPs ──► MEL Dashboard
 (diagnose)    (understand)        (choose)            (translate)      (execute)    (monitor)
```

| Module | What it does |
|--------|--------------|
| **MEL Dashboard** | Command-center view: 6 Pareto KPIs, CLP badges, phase progress, 3 view modes (Command / Executive / Public) |
| **SWOT Analysis** | 4-quadrant diagnostic with computed Relevance / Risk / Vulnerability indices and bulk factor import |
| **Systems Thinking** | Causal Loop Diagram editor: node/link canvas, reinforcing & balancing loop auto-detection, 9 systems archetypes, CLP linkage |
| **Strategy Matrix** | TOWS-derived strategic options (SO / WO / ST / WT) scored on the 7-criteria matrix |
| **Balanced Scorecard** | 4 perspectives (Financial → Stakeholders → Internal Process → Learning & Growth) with causal-chain visualization, objectives, KPIs, targets |
| **PAPs Management** | Programs / Activities / Projects tracking: budgets, timelines, status, responsible units |
| **Plan Export** | Full strategic-plan export (formatted document) with archetype and CLD appendices |
| **Team Collaboration** | Real-time presence, activity timeline, shared learning resources |
| **Templates Library** | Pre-built BIRD plan templates (incl. the official sample plan) for one-click plan creation |
| **AI Strategist** | Floating assistant powered by the `ai-strategy-assistant` Edge Function (Kimi/Moonshot) with confidence-scored suggestions |
| **Navigation Tutorial** | Interactive guided tour of every module |
| **Admin Dashboard** | Visit analytics, user management, platform health (`/admin`, role-gated) |

---

## Architecture

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 · TypeScript · Vite 5 (SWC) |
| Styling | Tailwind CSS 3 · shadcn/ui (Radix) · Liquid Glass aesthetic |
| State | Custom strategic-plan store + React Query (server state) |
| Charts | Recharts 3 |
| Backend | Supabase — Auth · Postgres (RLS) · Realtime presence · Edge Functions (Deno) |
| Validation | Zod |
| Toasts | sonner |
| Monitoring | Sentry (optional, via `VITE_SENTRY_DSN`) |
| Deploy | Vercel (static SPA + security headers) |

### Project Structure

```
BIRD-2026-2035/
├── index.html                          # SPA entry (SEO/OG/JSON-LD)
├── vercel.json                         # Vercel build + CSP headers
├── src/
│   ├── App.tsx                         # Routes (/…module paths /admin /share/:shareId /validation-survey→ext)
│   ├── components/
│   │   ├── AppLayout.tsx               # Shell: sidebar/topbar routing, auth, plan switching
│   │   ├── theme-provider.tsx          # dark/light/system theme (storageKey: bird-theme)
│   │   ├── auth/                       # AuthModal, UserProfileModal (Supabase Auth)
│   │   ├── branding/                   # StratLogo, PlatformBadge
│   │   ├── settings/SettingsPage.tsx
│   │   ├── strategic/                  # ── Strat Planner Pro engine ──
│   │   │   ├── MELDashboard.tsx        # KPI command center (default view)
│   │   │   ├── SWOTAnalysis.tsx        # 4-quadrant diagnostic + RI/Risk/VI scoring
│   │   │   ├── SystemsThinking.tsx     # CLD canvas + archetype detection
│   │   │   ├── StrategyMatrix.tsx      # TOWS options + 7-criteria scoring
│   │   │   ├── BalancedScorecard.tsx   # 4-perspective objectives & KPIs
│   │   │   ├── PAPsManagement.tsx      # Programs/Activities/Projects
│   │   │   ├── PlanExport.tsx          # Document export
│   │   │   ├── TeamCollaboration.tsx   # Presence, activity, resources
│   │   │   ├── TemplatesLibrary.tsx    # Plan templates
│   │   │   ├── NavigationTutorial.tsx  # Guided tour
│   │   │   ├── FloatingAIAssistant.tsx # AI strategist (edge function)
│   │   │   ├── HeroSection.tsx         # Landing page
│   │   │   ├── ActivityTimeline.tsx    # Audit log
│   │   │   ├── Sidebar.tsx / Topbar.tsx
│   │   └── ui/                         # shadcn/ui component set
│   ├── contexts/AppContext.tsx         # UI state (active view, modals, sidebar)
│   ├── data/bird/                      # BEIE datasets: kpis, phases, clds, actions
│   ├── hooks/
│   │   ├── useStrategicPlan.ts         # Plan CRUD + Supabase sync + presence
│   │   ├── useAuth.ts                  # Auth session, roles (admin)
│   │   └── useBIRDData.ts              # BEIE dataset access
│   ├── lib/
│   │   ├── strategicPlanStore.ts       # Types, store, KPI/status enums
│   │   ├── formulas.ts                 # ── Exact BIRD formulas (see below) ──
│   │   ├── templateData.ts             # Template → plan converter data
│   │   ├── bird-urls.ts                # Asset registries + external app URLs
│   │   ├── supabase.ts                 # Client + EDGE_FUNCTIONS registry
│   │   ├── api.ts / utils.ts / motion-shim.tsx
│   └── pages/                          # Index, AdminDashboard, SharedPlanView, NotFound
├── supabase/
│   ├── functions/
│   │   ├── ai-strategy-assistant/      # Kimi/Moonshot strategy AI
│   │   ├── strategic-planner-sync/     # Plan state sync (GET/POST/DELETE)
│   │   ├── email-notifications/        # Welcome & alert emails (Resend)
│   │   └── crm-dispatcher/             # CRM webhooks
│   └── migrations/                     # complete_schema, security_fix, visit_logs
└── public/                             # 30+ static pages (see Companion Apps)
```

### Data Flow

```
Strategic modules (React)
        │  plan mutations
        ▼
useStrategicPlan hook ──local──► localStorage (instant, offline-first)
        │
        ▼ sync
strategic-planner-sync Edge Function (JWT-authenticated)
        │
        ▼
Supabase Postgres (RLS: users see only their own plans)
        │
        ├──► Realtime presence ──► TeamCollaboration (who's online)
        ├──► activity_logs ──────► ActivityTimeline (audit trail)
        └──► ai-strategy-assistant ──► FloatingAIAssistant (Kimi AI)
```

---

## BIRD Scoring Formulas

The platform uses exact BIRD formulas — never approximations (`src/lib/formulas.ts`):

| Index | Quadrant | Formula | Scale |
|-------|----------|---------|-------|
| **Relevance Index (RI)** | Strengths | `(Impact × Likelihood) / 5` | 1–5 |
| **Relevance Index (RI)** | Opportunities | `√(Impact × Likelihood)` | 1–5 |
| **Risk Index** | Weaknesses | `Impact × Likelihood` | 1–25 |
| **Vulnerability Index (VI)** | Threats | `(Impact² × Likelihood) / 25` | 1–5 |

Supporting methodologies: **7-Criteria Matrix** (strategy scoring), **BSC causal linkage weighting**, **IEDS sequencing**, **R/B loop auto-detection** with the 9 systems archetypes.

---

## Getting Started

### Prerequisites

- Node.js **18.18 – 22.x**
- npm 9+

### Installation

```bash
git clone https://github.com/asilvainnovations/BIRD-2026-2035.git
cd BIRD-2026-2035
npm install
```

### Running Locally

```bash
npm run dev          # http://localhost:8080
```

### Quality Checks & Build

```bash
npm run build        # production build → dist/
npm run typecheck    # tsc --noEmit (0 errors expected)
npm run lint         # eslint (0 errors expected)
npm run preview      # serve the production build
```

---

## Environment Variables

All variables are optional — safe fallbacks are baked in for the public anon key.

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `VITE_SENTRY_DSN` | Enable Sentry error monitoring when set |
| `VITE_BRAND_LOGO_URL` | Override the MTIT logo asset |
| `VITE_PWA_EXTERNAL_URL` | Override the PWA companion URL |

> **Security note:** the anon key is public-by-design and gated by Row Level Security. Never commit service-role keys — Edge Functions read them from Supabase secrets.

---

## Backend (Supabase)

### Edge Functions

| Function | Purpose |
|----------|---------|
| `ai-strategy-assistant` | Kimi/Moonshot-powered strategy suggestions with confidence scoring |
| `strategic-planner-sync` | Plan persistence: GET full state, POST save, DELETE archive |
| `email-notifications` | Welcome emails, share notifications, KPI alerts (Resend) |
| `crm-dispatcher` | Outbound CRM webhook dispatch |

Deploy with:

```bash
supabase db push                                            # apply migrations
supabase functions deploy ai-strategy-assistant strategic-planner-sync email-notifications crm-dispatcher
```

### Database

Migrations live in `supabase/migrations/` (`complete_schema.sql`, `security_fix.sql`, `create_visit_logs_table.sql`). All user tables enforce **Row Level Security** — users can only read/write their own plans; shared plans are exposed through token-gated views (`/shared/:token`).

---

## Deployment

**Vercel** (recommended) — `vercel.json` is preconfigured:

- Build: `npm install` → `npm run build` → output `dist/`
- SPA rewrites for client-side routes
- Content-Security-Policy and security headers
- Node 18–22 (per `engines`)

Any static host (Netlify, Cloudflare Pages, GitHub Pages + SPA fallback) works identically — the app is a pure static build that talks to Supabase over HTTPS.

---

## Companion Apps & Static Pages

| Asset | URL / Path |
|-------|-----------|
| **Validation Survey** (standalone app) | [bird-validation-survey.bolt.host](https://bird-validation-survey.bolt.host/) · [repo](https://github.com/asilvainnovations/bird-validation-survey) |
| Roadmap & KPI pages | `public/roadmap.html`, `public/kpi.html`, `public/dashboard.html` |
| Strategy documents | `public/action-plan.html`, `public/options.html`, `public/strategy-map.html`, `public/bird-report.html` |
| Provincial outlooks | `public/{basilan, lanao-delsur, maguindanao-delnorte, maguindanao-delsur, sga, tawi-tawi}-outlook.html` |
| Stakeholder tools | `public/actors-value-mapping.html`, `public/feedback.html`, `public/ieb.html` |
| Guides | `public/user-manual.html`, `public/student-guide.html`, `public/resources.html`, `public/slides.html` |
| Policies (DPA 2012) | `public/privacy-policy.html`, `public/cookie-policy.html` |

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Deep Green | `#022c22` / `#011a12` | Primary surfaces, shell |
| Gold | `#C9A84C` / highlight `#E8C560` | Accents, CTAs, borders |
| Text | `#ecfdf5` on dark | Primary text |
| Muted | `#64748b` | Secondary text |
| Typography | Cinzel (headers) · DM Sans (body) | — |

The UI follows a **Liquid Glass** aesthetic: glassmorphism cards, gold hairline borders (`#C9A84C/15–30`), deep-green backdrop blur, and the MTIT logo badge (`PlatformBadge`) on every screen. Dark/light/system themes are supported via `theme-provider.tsx` (toggle in the Topbar).

---

## Documentation

| Document | Content |
|----------|---------|
| [USER_MANUAL.md](USER_MANUAL.md) | End-user guide for every module |
| [SURVEY_GUIDE.md](SURVEY_GUIDE.md) | Validation-survey methodology & question architecture |
| [CHANGELOG.md](CHANGELOG.md) | Release history |

---

## Contributing

1. Fork the repo and create a feature branch (`feat/<module>-<change>`).
2. Keep formulas **exact** — scoring changes must reference `src/lib/formulas.ts`.
3. Declare the **CLP mapping** in component annotations for any new feature.
4. Run `npm run typecheck && npm run lint && npm run build` before opening a PR.
5. Never hardcode secrets — Edge Functions use Supabase environment secrets.

---

## License

MIT © **BOI-MTIT, BARMM** · Developed by **[ASilva Innovations](https://asilvainnovations.com)**

*Anchored on Moral Governance. Built for the Bangsamoro.*
