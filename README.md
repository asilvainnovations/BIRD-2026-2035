# BIRD 2026-2035 Validation Survey

<div align="center">

**Comprehensive Stakeholder Validation Platform for the Bangsamoro Investment Roadmap Development (BIRD) 2026-2035**

[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-022c22)](LICENSE)

<p align="center">
  <img src="https://img.shields.io/badge/Survey-16%20Steps-C9A84C" alt="16 Steps">
  <img src="https://img.shields.io/badge/SWOT-Factors-1B4D3E" alt="SWOT Factors">
  <img src="https://img.shields.io/badge/Media-110%20Images%20|%205%20Videos-022c22" alt="Media">
  <img src="https://img.shields.io/badge/Validation-100+%20Fields-065f46" alt="100+ Fields">
</p>

</div>

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
  - [Technology Stack](#technology-stack)
  - [Component Architecture](#component-architecture)
  - [Data Flow](#data-flow)
- [Survey Structure](#survey-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [File Structure](#file-structure)
- [BIRD Score Formulas](#bird-score-formulas)
- [Component Patterns](#component-patterns)
  - [GlassCard](#glasscard)
  - [SWOT Scale](#swot-scale)
  - [Archetype Validation](#archetype-validation)
  - [Image Embed](#image-embed)
- [Deployment](#deployment)
  - [Supabase Setup](#supabase-setup)
  - [Build & Deploy](#build--deploy)
- [Contributing](#contributing)
  - [Adding a New Section](#adding-a-new-section)
  - [Code Style](#code-style)
- [Content Sources](#content-sources)
- [License](#license)

---

## Project Overview

The **BIRD 2026-2035 Validation Survey** is a comprehensive, multi-step stakeholder engagement platform designed to validate the Bangsamoro Investment Roadmap Development (BIRD) 2026-2035. Built on the **BEIE (Bangsamoro Economic and Investment Ecosystem)** framework, the survey captures structured stakeholder input across eight thematic chapters spanning macroeconomic context, SWOT analysis, strategic options, metrics architecture, balanced scorecard design, priority actions, and institutional architecture.

The platform serves as the primary interface between the BIRD technical team and a diverse stakeholder ecosystem including government agencies, private sector investors, civil society organizations, international development partners, academic institutions, and community representatives. Responses are validated, scored in real-time using a proprietary BIRD scoring methodology, and stored securely for aggregation and analysis.

The survey is structured as a **16-step wizard** with over 100 validated form fields, 110 embedded reference images, 5 video presentations, conditional validation logic, live score computation, and a review-and-submit flow. The experience is optimized for accessibility, responsive design, and session persistence via both Supabase cloud storage and localStorage fallback.

---

## Features

- **16-Step Survey Wizard** — Linear step progression with step-by-step navigation, progress indicator, and skip/jump controls
- **BEIE Framework Integration** — Embedded BEIE Systems Thinking video, framework diagrams, and conceptual primers
- **110 Embedded Reference Images** — Centralized media registry (`bird-urls.ts`) with lazy-loaded image components across all sections
- **5 Video Presentations** — Overview, BEIE Framework, Cluster Deep-Dives, Metrics Architecture, and Balanced Scorecard
- **SWOT Factor Scoring** — Interactive SWOT (Strengths, Weaknesses, Opportunities, Threats) assessment with Impact/Likelihood sliders for 100+ factors
- **Archetype Validation** — Character archetype selection (Pioneer, Builder, Guardian, Visionary) per cluster with weighted scoring
- **Live BIRD Score Computation** — Real-time score panel using 4 proprietary formulas (Strength RI, Opportunity RI, Weakness Risk, Threat VI)
- **4-Tier KPI Calibration** — Input/Output/Outcome/Impact KPI architecture with benchmark data capture
- **Balanced Scorecard** — Full 4-perspective BSC (Financial, Stakeholder, Internal Process, Learning & Growth) with strategy map
- **Capital Phasing Module** — PHP 120-160 billion capital allocation exercise with risk matrix
- **Zod Schema Validation** — 100+ field validation schema with conditional rules, cross-field dependencies, and custom error messages
- **Supabase Backend** — PostgreSQL response storage, Row Level Security, anonymous and authenticated submission modes
- **LocalStorage Fallback** — Automatic session persistence when offline or when Supabase is unavailable
- **Responsive Design** — Full mobile, tablet, and desktop support via Tailwind CSS breakpoints
- **Accessibility** — WCAG 2.1 AA compliant with keyboard navigation, ARIA labels, focus management, and screen reader support
- **shadcn/ui Components** — Professional UI primitives including Dialog, Accordion, Tabs, Slider, Checkbox, Select, and Card
- **BIRD Color System** — Consistent theming with deep green (#022c22), gold (#C9A84C), and dark green (#1B4D3E) palette
- **Review & Submit Flow** — Full completion summary with 4 final consent checkboxes and secure submission

### Validation Survey (16-Step Wizard)

The core validation instrument is a comprehensive 16-step wizard that captures structured stakeholder input across the full BIRD 2026-2035 framework:

- **Step 0: Welcome & Orientation** — Platform introduction, overview video, and 3 orientation questions
- **Step 1: Privacy & Consent** — DPA 2012-compliant consent checkboxes, data policy links, and ethics statement
- **Step 2: Demographics** — Province, sector, expertise area, and respondent profile capture
- **Step 3: Systems Thinking & BEIE Framework** — BEIE ecosystem video, systems maps, and framework primers
- **Steps 4-8: Five BEIE Clusters** — Foundations, Transformers, Enablers, Connectors, and Financiers with SWOT impact/likelihood scales and archetype validations
- **Step 9: Operating Systems — Moral Governance** — 5 OS pillars (People, Planet, Prosperity, Peace, Partnership)
- **Step 10: IEDS & Three-Phase Implementation** — Activate, Scale, and Consolidate phase planning
- **Step 11: Metrics Architecture & KPIs** — 4-tier KPI calibration (Input/Output/Outcome/Impact)
- **Step 12: Balanced Scorecard** — 4 perspectives (Financial, Stakeholder, Internal Process, Learning & Growth) with strategy map
- **Step 13: Priority Actions & Budget** — ₱120-160 billion capital phasing exercise with risk matrix
- **Step 14: Resources & Engagements** — Document library, follow-up options, workshops, and working groups
- **Step 15: Review & Submit** — Full completion summary, 4 final consent checkboxes, and secure submission
- **Real-time BIRD Score Computation Panel** — Live display of Strength RI, Opportunity RI, Weakness Risk, and Threat VI indices
- **Media Registry Integration** — 110 images and 5 videos loaded from the centralized `bird-urls.ts` registry

---

## Validation Survey Architecture

### Component Pattern

Each of the 16 survey section components follows a consistent controlled-component pattern with typed props:

```tsx
interface SectionProps {
  data: SurveyData;           // Current survey state from useReducer
  onChange: (update: Partial<SurveyData>) => void;  // Dispatch partial updates
}

export function SectionN_ComponentName({ data, onChange }: SectionProps) {
  // Local state for immediate UI feedback
  const [local, setLocal] = useState(data.sectionN);

  // Sync local changes upward
  const handleUpdate = (field: string, value: unknown) => {
    const updated = { ...local, [field]: value };
    setLocal(updated);
    onChange({ sectionN: updated });
  };

  return (
    <GlassCard title="Section Title">
      {/* Form fields, SWOT scales, archetype selectors */}
    </GlassCard>
  );
}
```

The parent `SurveyWizard.tsx` orchestrates all 16 sections via a step index and renders the `BirdScorePanel` in a sticky sidebar. On step navigation, `onChange` merges partial updates into the global `SurveyData` state, which is simultaneously validated by Zod and persisted to both localStorage and Supabase.

### BIRD Score Formulas

Four proprietary formulas compute the BIRD indices in real-time from SWOT factor ratings (Impact 1–5, Likelihood 1–5):

| Score | Name | Formula | Range |
|-------|------|---------|-------|
| **S-RI** | Strength Resilience Index | `(Impact × Likelihood) / 5` | 0.2 – 5.0 |
| **O-RI** | Opportunity Resilience Index | `√(Impact × Likelihood)` | 1.0 – 5.0 |
| **W-Risk** | Weakness Risk Score | `Impact × Likelihood` | 1 – 25 |
| **T-VI** | Threat Vulnerability Index | `(Impact² × Likelihood) / 25` | 0.04 – 5.0 |

The composite BIRD score is computed as `(S-RI + O-RI) / (W-Risk + T-VI)`, providing an overall strategic health indicator. All four scores update live as respondents adjust Impact/Likelihood sliders on any SWOT factor.

### Media Registry Usage

All embedded images and videos are imported from the centralized `bird-urls.ts` registry to ensure consistent URLs and easy content updates:

```typescript
// src/lib/bird-urls.ts
export const BIRD_IMAGES = {
  BEIE_SYSTEMS_MAP: "https://example.com/beie-systems-map.jpg",
  CLUSTER1_AGRICULTURE: "https://example.com/cluster1-agriculture.jpg",
  // ... 110 total images
} as const;

export const BIRD_VIDEOS = {
  OVERVIEW: "https://example.com/bird-overview.mp4",
  BEIE_FRAMEWORK: "https://example.com/beie-framework.mp4",
  CLUSTER_DEEP_DIVE: "https://example.com/cluster-deep-dive.mp4",
  METRICS_ARCHITECTURE: "https://example.com/metrics-architecture.mp4",
  BALANCED_SCORECARD: "https://example.com/balanced-scorecard.mp4",
} as const;

export const BIRD_SITES = {
  BARMM_GOVT: "https://www.bangsamoro.gov.ph",
  BIEDA: "https://bieda.bangsamoro.gov.ph",
  BEIE_PORTAL: "https://beie.bangsamoro.gov.ph",
  // ... 12 total external reference links
} as const;
```

### Zod Schema with Conditional Rules

The survey schema defines 100+ fields with conditional validation, cross-field dependencies, and custom error messages:

```typescript
// src/lib/survey-schema.ts
export const surveySchema = z.object({
  // Section 0: Orientation
  orientation_completed: z.boolean().refine((v) => v === true, {
    message: "Please complete the orientation before proceeding.",
  }),

  // Section 1: Privacy & Consent
  consent_data_processing: z.boolean().refine((v) => v === true, {
    message: "Consent is required to continue.",
  }),
  consent_analytics: z.boolean(),
  consent_followup: z.boolean(),
  consent_public_reporting: z.boolean(),

  // Section 2: Demographics
  province: z.string().min(1, "Province is required"),
  sector: z.enum(["government", "private", "civil_society", "academia", "international", "community"]),
  expertise_areas: z.array(z.string()).min(1, "Select at least one expertise area"),

  // Section 3: Systems Thinking & BEIE
  beie_systems_understanding: z.number().min(1).max(5),
  beie_ecosystem_rating: z.number().min(1).max(5),

  // Sections 4-8: BEIE Clusters with SWOT
  cluster1_foundations: clusterSwotSchema,
  cluster2_transformers: clusterSwotSchema,
  cluster3_enablers: clusterSwotSchema,
  cluster4_connectors: clusterSwotSchema,
  cluster5_financiers: clusterSwotSchema,

  // Archetype selections (Clusters 1, 2, and 9)
  archetype_cluster1: z.enum(["pioneer", "builder", "guardian", "visionary"]).optional(),
  archetype_cluster2: z.enum(["pioneer", "builder", "guardian", "visionary"]).optional(),
  archetype_os: z.enum(["pioneer", "builder", "guardian", "visionary"]).optional(),

  // Sections 9-15: Operating Systems through Submission
  os_moral_governance: z.number().min(1).max(5).optional(),
  ieds_phase_preference: z.enum(["activate", "scale", "consolidate"]).optional(),
  kpi_calibrations: kpiCalibrationSchema.optional(),
  bsc_perspective_ratings: bscRatingsSchema.optional(),
  capital_allocation: capitalAllocationSchema.optional(),
  priority_actions: z.array(priorityActionSchema).optional(),
  follow_up_engagements: z.array(z.string()).optional(),

  // Final submission
  consent_final: z.boolean().refine((v) => v === true, {
    message: "You must confirm final consent before submission.",
  }),
});
```

**Conditional validation rules:**
- Demographic fields are required only if `consent_data_processing` is true
- SWOT fields are validated per-cluster with cluster-specific factor counts
- Archetype selections are only required for Clusters 1, 2, and Operating Systems
- Budget allocation must sum to between ₱120B and ₱160B
- Final consent checkboxes must all be true before submission is allowed

---

## Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 18 | UI component model, hooks, context |
| **Language** | TypeScript 5.x | Type safety, interfaces, strict null checks |
| **Build Tool** | Vite 5.x | Fast dev server, optimized production builds |
| **Styling** | Tailwind CSS 3.x | Utility-first CSS, responsive design |
| **UI Components** | shadcn/ui | Accessible, customizable component primitives |
| **UI Notifications** | sonner | Toast notifications and user feedback |
| **Validation** | Zod | Runtime schema validation, type inference |
| **Backend** | Supabase | PostgreSQL database, authentication, storage |
| **State Management** | React Context + useReducer | Global survey state, step navigation |
| **Persistence** | localStorage | Session fallback, offline support |
| **Icons** | Lucide React | Consistent iconography across UI |
| **Package Manager** | npm | Dependency management |

### Component Architecture

```
App
├── SurveyWizard.tsx              # Main container: 16-step orchestration
│   ├── StepNavigation.tsx        # Progress bar, step dots, prev/next
│   ├── BirdScorePanel.tsx        # Live score display (formulas.ts)
│   ├── Section0_Welcome.tsx      # Welcome & Orientation
│   ├── Section1_Privacy.tsx      # Privacy & Consent
│   ├── Section2_Profile.tsx      # Respondent Profile
│   ├── Section3_BEIE.tsx         # Systems Thinking & BEIE
│   ├── Section4_Cluster1.tsx     # Cluster 1: Foundations
│   ├── Section5_Cluster2.tsx     # Cluster 2: Transformers
│   ├── Section6_Cluster3.tsx     # Cluster 3: Enablers
│   ├── Section7_Cluster4.tsx     # Cluster 4: Connectors
│   ├── Section8_Cluster5.tsx     # Cluster 5: Financiers
│   ├── Section9_OS.tsx           # Operating Systems
│   ├── Section10_IEDS.tsx        # IEDS & 3-Phase Plan
│   ├── Section11_Metrics.tsx     # Metrics Architecture
│   ├── Section12_BSC.tsx         # Balanced Scorecard
│   ├── Section13_Budget.tsx      # Priority Actions & Budget
│   ├── Section14_Resources.tsx   # Resources & Engagements
│   └── Section15_Review.tsx      # Review & Submit
├── src/lib/
│   ├── survey-schema.ts          # Zod validation (100+ fields)
│   ├── bird-urls.ts              # Media registry (110 images, 5 videos, 12 sites)
│   ├── formulas.ts               # BIRD score computation functions
│   └── supabase.ts               # Supabase client configuration
├── src/components/ui/            # shadcn/ui primitives
└── src/section_components/       # 16 section component files
```

### Data Flow

```
User Input (UI)
    │
    ▼
Section Component (controlled inputs)
    │
    ▼
SurveyWizard Context (useReducer state)
    │
    ├──► Zod Validation (on blur / on submit)
    │
    ├──► formulas.ts (live BIRD score computation)
    │         │
    │         ▼
    │    BirdScorePanel (real-time display)
    │
    ├──► localStorage (session persistence)
    │
    └──► Supabase (secure cloud storage)
              │
              ▼
         PostgreSQL (responses table)
```

1. **User Input** — Respondent interacts with form controls (sliders, checkboxes, selects, text inputs)
2. **Section Component** — Each section manages its own controlled inputs via local state
3. **SurveyWizard Context** — On step navigation, section data is dispatched to the global reducer
4. **Zod Validation** — Form data is validated against the schema; errors prevent progression
5. **BIRD Score Computation** — On each state change, formulas.ts recalculates all four scores
6. **Score Display** — BirdScorePanel renders the updated scores with visual indicators
7. **Persistence** — Data is simultaneously written to localStorage and Supabase (when available)
8. **Submission** — On final submit, a complete response record is inserted into the Supabase `responses` table

---

## BIRD 2026-2035 Validation Survey — Static PWA Fallback

When the application is accessed as a Progressive Web App (PWA) in offline mode or when the server is unreachable, a static fallback page displays the full 16-section survey structure. This ensures stakeholders can always reference the complete BIRD 2026-2035 validation instrument regardless of network conditions.

### Survey Sections (16 Steps)

1. **Welcome & Orientation** — Platform introduction, overview video, and 3 orientation questions
2. **Privacy & Consent** — DPA 2012-compliant consent checkboxes, data policy links, and ethics statement
3. **Your Profile** — Name, email, organization, position, province, stakeholder category, expertise areas
4. **Systems Thinking & BEIE** — BEIE framework video, systems maps, 2 framework images, 3 SWOT Strengths on systems thinking
5. **Cluster 1: Foundations** — Agriculture, energy, land reform — sectoral SWOT analysis, strategic archetype selection
6. **Cluster 2: Transformers** — Halal economy, tourism, digital transformation — sectoral SWOT and innovation archetypes
7. **Cluster 3: Enablers** — Infrastructure, governance, human capital — comprehensive SWOT across 3 sub-sectors
8. **Cluster 4: Connectors** — BIMP-EAGA integration, UAE/GCC partnerships, trade corridors — international dimension SWOT
9. **Cluster 5: Financiers** — Islamic finance, banking, financial inclusion — capital ecosystem SWOT
10. **Operating Systems** — Moral governance framework, 5 OS pillars (People, Planet, Prosperity, Peace, Partnership)
11. **IEDS & Three-Phase Implementation** — Integrated Economic Development Strategy execution engine, 4 strategic options, Activate/Scale/Consolidate phases
12. **Metrics Architecture & KPIs** — 4-tier KPI calibration (Input/Output/Outcome/Impact), cross-cutting and cluster KPIs, benchmark tables
13. **Balanced Scorecard** — 4 BSC perspectives (Financial, Stakeholder, Internal Process, Learning & Growth), strategy map, Vision 2035, mission statement
14. **Priority Actions & Budget** — ₱120-160 billion capital phasing exercise, 2035 targets, risk matrix with probability/impact grid
15. **Resources & Engagements** — Document library, follow-up options, workshops, and working groups
16. **Review & Submit** — Full completion summary across all sections, 4 final consent checkboxes, submission with confirmation

---

## Survey Structure

The survey consists of **16 sequential steps**, each corresponding to a major section of the BIRD 2026-2035 document. Every step is implemented as a dedicated React component with its own form fields, validation rules, and media embeds.

| Step | Section Name | Key Content | SWOT Factors | Archetypes | Media |
|------|-------------|-------------|--------------|------------|-------|
| **0** | Welcome & Orientation | Platform banner, overview video, 3 orientation questions | — | — | 1 video, 1 banner |
| **1** | Privacy & Consent | 4 consent checkboxes, data policy links, ethics statement | — | — | — |
| **2** | Your Profile | Name, email, organization, position, province, stakeholder category, expertise areas | — | — | — |
| **3** | Systems Thinking & BEIE | BEIE framework video, systems maps, 2 framework images, 3 SWOT Strengths on systems thinking | 3 | — | 1 video, 2 images |
| **4** | Cluster 1: Foundations | Agriculture, energy, land reform — sectoral SWOT analysis, strategic archetype selection | 4 | 2 | 6 images |
| **5** | Cluster 2: Transformers | Halal economy, tourism, digital transformation — sectoral SWOT and innovation archetypes | 5 | 2 | 5 images |
| **6** | Cluster 3: Enablers | Infrastructure, governance, human capital — comprehensive SWOT across 3 sub-sectors | 12 | — | 8 images |
| **7** | Cluster 4: Connectors | BIMP-EAGA integration, UAE/GCC partnerships, trade corridors — international dimension SWOT | 16 | — | 10 images |
| **8** | Cluster 5: Financiers | Islamic finance, banking, financial inclusion — capital ecosystem SWOT | 19 | — | 7 images |
| **9** | Operating Systems | Moral governance framework, 5 OS pillars (People, Planet, Prosperity, Peace, Partnership) | 14 | 2 | 9 images |
| **10** | IEDS & 3-Phase Plan | Integrated Economic Development Strategy execution engine, 4 strategic options, Activate/Scale/Consolidate phases | — | — | 4 images, 1 video |
| **11** | Metrics Architecture | 4-tier KPI calibration (Input/Output/Outcome/Impact), cross-cutting and cluster KPIs, benchmark tables | — | — | 6 images |
| **12** | Balanced Scorecard | 4 BSC perspectives (Financial, Stakeholder, Internal Process, Learning & Growth), strategy map, Vision 2035, mission statement | — | — | 5 images |
| **13** | Priority Actions & Budget | PHP 120-160B capital phasing exercise, 2035 targets, risk matrix with probability/impact grid | — | — | 8 images |
| **14** | Resources & Engagements | Resource library (documents, reports, links), follow-up engagement options (workshops, consultations, working groups) | — | — | — |
| **15** | Review & Submit | Full completion summary across all sections, 4 final consent checkboxes, submission with confirmation | — | — | — |

**Total:** 73 SWOT factors scored, 6 archetype selections, 76 images, 3 videos, 100+ validated fields.

---

## Getting Started

### Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | >= 18.0.0 | LTS recommended |
| npm | >= 9.0.0 | Ships with Node.js 18+ |
| Git | >= 2.40.0 | For cloning and version control |
| Supabase CLI | >= 1.150.0 | For local database development |
| A modern browser | Chrome/Firefox/Safari/Edge | Latest 2 versions |

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/bird-2026-2035-survey.git
   cd bird-2026-2035-survey
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (see next section)

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Application Configuration
VITE_APP_NAME="BIRD 2026-2035 Validation Survey"
VITE_APP_VERSION=1.0.0
VITE_SURVEY_START_DATE=2025-01-01
VITE_SURVEY_END_DATE=2025-12-31

# ── Edge Functions (project: rgvteytgkugdqdodedxq) ──────────────────────────
VITE_SYNC_API_URL=https://rgvteytgkugdqdodedxq.supabase.co/functions/v1/strategic-planner-sync
VITE_AI_ASSISTANT_URL=https://rgvteytgkugdqdodedxq.supabase.co/functions/v1/ai-strategy-assistant

# ── Survey-specific ──────────────────────────────────────────────────────────
VITE_SURVEY_TABLE=survey_responses
VITE_ENABLE_SURVEY_ANALYTICS=true

# Optional: Enable debug mode for development
VITE_DEBUG_MODE=false
```

> **Security Note:** Never commit the `.env` file to version control. Add it to `.gitignore` immediately. The Supabase anon key is safe to expose in client-side code as Row Level Security (RLS) policies protect all data access. The Edge Function URLs and survey table names are safe to expose as they are protected by Supabase RLS and function-level authentication.

### Running Locally

```bash
# Start the Vite development server with hot reload
npm run dev

# Start with specific host and port
npm run dev -- --host 0.0.0.0 --port 3000

# Type check the TypeScript codebase
npm run typecheck

# Lint the codebase
npm run lint

# Format code with Prettier
npm run format
```

### Building for Production

```bash
# Create an optimized production build
npm run build

# Preview the production build locally
npm run preview

# The build output is in the `dist/` directory
# Deploy the contents of `dist/` to your hosting platform
```

---

## File Structure

```
bird-2026-2035-survey/
├── public/
│   ├── favicon.ico
│   └── images/                    # Fallback image assets
├── src/
│   ├── components/
│   │   ├── branding/
│   │   │   ├── Logo.tsx
│   │   │   └── PlatformBadge.tsx
│   │   ├── settings/
│   │   │   └── SettingsPage.tsx
│   │   ├── strategic/
│   │   │   ├── FloatingAIAssistant.tsx
│   │   │   ├── MELDashboard.tsx
│   │   │   ├── SWOTAnalysis.tsx
│   │   │   ├── SystemsThinking.tsx
│   │   │   ├── StrategyMatrix.tsx
│   │   │   ├── BalancedScorecard.tsx
│   │   │   ├── PAPsManagement.tsx
│   │   │   ├── TemplatesLibrary.tsx
│   │   │   ├── TeamCollaboration.tsx
│   │   │   ├── PlanExport.tsx
│   │   │   ├── NavigationTutorial.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   ├── SurveyWizard.tsx          # Main 16-step wizard
│   │   │   ├── ContextPanel.tsx          # Side panel resources
│   │   │   └── section_components/      # 16 survey section components
│   │   │       ├── Section0_Orientation.tsx
│   │   │       ├── Section1_Privacy.tsx
│   │   │       ├── Section2_Demographics.tsx
│   │   │       ├── Section3_BEIE_SystemsThinking.tsx
│   │   │       ├── Section4_Foundations.tsx
│   │   │       ├── Section5_Transformers.tsx
│   │   │       ├── Section6_Enablers.tsx
│   │   │       ├── Section7_Connectors.tsx
│   │   │       ├── Section8_Financiers.tsx
│   │   │       ├── Section9_OperatingSystems.tsx
│   │   │       ├── Section10_IEDS.tsx
│   │   │       ├── Section11_Metrics.tsx
│   │   │       ├── Section12_BalancedScorecard.tsx
│   │   │       ├── Section13_PriorityActions.tsx
│   │   │       ├── Section14_AccessResources.tsx
│   │   │       └── Section15_Submission.tsx
│   │   ├── auth/
│   │   │   ├── AuthModal.tsx
│   │   │   └── UserProfileModal.tsx
│   │   └── ui/                          # shadcn/ui primitives
│   │       ├── accordion.tsx
│   │       ├── alert.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── slider.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   ├── data/
│   │   └── bird/
│   │       ├── kpis.ts
│   │       ├── actions.ts
│   │       ├── clds.ts
│   │       └── phases.ts
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useStrategicPlan.ts
│   │   ├── useAuth.ts
│   │   └── useBIRDData.ts
│   ├── lib/
│   │   ├── supabase.ts                 # Supabase client
│   │   ├── strategicPlanStore.ts       # Plan state management
│   │   ├── formulas.ts                 # BIRD score computation
│   │   ├── utils.ts                    # Utility functions
│   │   ├── bird-urls.ts                # 110 images, 5 videos, 12 sites
│   │   ├── survey-schema.ts            # Zod validation (100+ fields)
│   │   └── api.ts                      # submitSurvey() and API helpers
│   ├── pages/
│   │   ├── Index.tsx                   # AppLayout wrapper
│   │   ├── AdminDashboard.tsx
│   │   ├── SharedPlanView.tsx
│   │   └── NotFound.tsx
│   ├── contexts/
│   │   └── AppContext.tsx
│   ├── App.tsx                         # Root component
│   ├── main.tsx                        # Entry point
│   └── index.css                       # Global styles + Tailwind
├── supabase/
│   ├── migrations/
│   │   └── 001_create_responses_table.sql
│   └── policies/
│       └── responses_rls.sql
├── .env.example
├── .gitignore
├── components.json                     # shadcn/ui configuration
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## BIRD Score Formulas

The BIRD scoring system computes four distinct indices based on respondent inputs across SWOT factors. Each factor is rated on two dimensions: **Impact** (1–5) and **Likelihood** (1–5). The formulas are designed to reflect the asymmetric nature of risk and opportunity in the Bangsamoro context.

### Formula Definitions

| Score | Name | Formula | Interpretation | Range |
|-------|------|---------|----------------|-------|
| **S-RI** | Strength Resilience Index | `(Impact × Likelihood) / 5` | Measures the strength of internal advantages; linear scaling normalizes to a 1–5 range | 0.2 – 5.0 |
| **O-RI** | Opportunity Resilience Index | `√(Impact × Likelihood)` | Measures the attractiveness of external opportunities; square root dampens extreme values | 1.0 – 5.0 |
| **W-Risk** | Weakness Risk Score | `Impact × Likelihood` | Measures the severity of internal weaknesses; multiplicative to highlight compounding risks | 1 – 25 |
| **T-VI** | Threat Vulnerability Index | `(Impact² × Likelihood) / 25` | Measures exposure to external threats; squared impact reflects disproportionate damage potential | 0.04 – 5.0 |

### Implementation

```typescript
// src/lib/formulas.ts

export const calculateStrengthRI = (impact: number, likelihood: number): number => {
  return Number(((impact * likelihood) / 5).toFixed(2));
};

export const calculateOpportunityRI = (impact: number, likelihood: number): number => {
  return Number(Math.sqrt(impact * likelihood).toFixed(2));
};

export const calculateWeaknessRisk = (impact: number, likelihood: number): number => {
  return impact * likelihood;
};

export const calculateThreatVI = (impact: number, likelihood: number): number => {
  return Number(((impact ** 2 * likelihood) / 25).toFixed(2));
};

export const calculateCompositeBIRDScore = (
  strengths: Array<{ impact: number; likelihood: number }>,
  opportunities: Array<{ impact: number; likelihood: number }>,
  weaknesses: Array<{ impact: number; likelihood: number }>,
  threats: Array<{ impact: number; likelihood: number }>
): BIRDScoreSet => {
  const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  
  const sRI = avg(strengths.map(s => calculateStrengthRI(s.impact, s.likelihood)));
  const oRI = avg(opportunities.map(o => calculateOpportunityRI(o.impact, o.likelihood)));
  const wRisk = avg(weaknesses.map(w => calculateWeaknessRisk(w.impact, w.likelihood)));
  const tVI = avg(threats.map(t => calculateThreatVI(t.impact, t.likelihood)));

  return { sRI, oRI, wRisk, tVI, composite: (sRI + oRI) / (wRisk + tVI) };
};
```

### Score Display

The `BirdScorePanel` component renders the four scores with visual indicators:

- **S-RI** — Green bar (higher is better)
- **O-RI** — Gold bar (higher is better)
- **W-Risk** — Amber warning bar (lower is better)
- **T-VI** — Red bar (lower is better)

Scores update in real-time as respondents adjust Impact/Likelihood sliders on any SWOT factor.

---

## Component Patterns

### GlassCard

The `GlassCard` component provides a consistent glass-morphism card style used throughout the survey for containing related content blocks.

```tsx
import { GlassCard } from "@/components/GlassCard";

<GlassCard
  title="Section Title"
  description="Optional description text"
  icon={<Landmark className="w-5 h-5" />}
  accentColor="#C9A84C"
>
  {/* Card content */}
</GlassCard>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Card header title |
| `description` | `string` | No | Subtitle text below title |
| `icon` | `React.ReactNode` | No | Icon element displayed left of title |
| `accentColor` | `string` | No | Border accent color (default: `#C9A84C`) |
| `children` | `React.ReactNode` | Yes | Card body content |

**Style characteristics:**
- Semi-transparent background with backdrop blur
- Subtle gold border (`#C9A84C/20`)
- Hover state with elevated shadow
- Responsive padding across breakpoints

### SWOT Scale

The `SWOTScale` component renders a dual-slider control for Impact (1–5) and Likelihood (1–5) ratings on each SWOT factor.

```tsx
import { SWOTScale } from "@/components/SWOTScale";

<SWOTScale
  factorId="cluster1_agri_strength_1"
  factorLabel="High-yield agricultural potential in Liguasan Marsh"
  category="strength"
  impact={4}
  likelihood={5}
  onImpactChange={(value) => handleImpactChange(value)}
  onLikelihoodChange={(value) => handleLikelihoodChange(value)}
/>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `factorId` | `string` | Yes | Unique identifier for the factor |
| `factorLabel` | `string` | Yes | Human-readable factor description |
| `category` | `"strength" \| "weakness" \| "opportunity" \| "threat"` | Yes | SWOT category |
| `impact` | `number` | Yes | Current impact value (1–5) |
| `likelihood` | `number` | Yes | Current likelihood value (1–5) |
| `onImpactChange` | `(value: number) => void` | Yes | Impact change handler |
| `onLikelihoodChange` | `(value: number) => void` | Yes | Likelihood change handler |

**Behavior:**
- Displays factor label with category badge (color-coded)
- Two horizontal sliders: Impact (left) and Likelihood (right)
- Live BIRD score computation displayed below each slider pair
- Category colors: Strength (green), Weakness (amber), Opportunity (gold), Threat (red)

### Archetype Validation

The `ArchetypeSelector` component presents 4 character archetypes for respondent self-identification per cluster.

```tsx
import { ArchetypeSelector } from "@/components/ArchetypeSelector";

<ArchetypeSelector
  clusterId="cluster1"
  selectedArchetype="pioneer"
  archetypes={[
    { id: "pioneer", label: "Pioneer", description: "First-mover risk-taker", icon: <Compass /> },
    { id: "builder", label: "Builder", description: "Systematic implementer", icon: <Hammer /> },
    { id: "guardian", label: "Guardian", description: "Steward of community interests", icon: <Shield /> },
    { id: "visionary", label: "Visionary", description: "Strategic foresight leader", icon: <Eye /> }
  ]}
  onSelect={(archetypeId) => handleArchetypeSelect(archetypeId)}
/>
```

**Archetype Definitions:**

| Archetype | Role | Weight in Scoring |
|-----------|------|-------------------|
| **Pioneer** | First-mover, risk-taker, entrepreneur | +0.2 to S-RI |
| **Builder** | Systematic implementer, operations-focused | +0.1 to all scores |
| **Guardian** | Community steward, equity-focused | -0.2 to W-Risk |
| **Visionary** | Strategic foresight, long-term planning | +0.2 to O-RI |

### Image Embed

The `ImageEmbed` component lazy-loads images from the centralized `bird-urls.ts` registry with caption support and zoom-on-click behavior.

```tsx
import { ImageEmbed } from "@/components/ImageEmbed";
import { BIRD_IMAGES } from "@/lib/bird-urls";

<ImageEmbed
  src={BIRD_IMAGES.BEIE_SYSTEMS_MAP}
  alt="BEIE Systems Thinking Framework Map"
  caption="Figure 2.1: The BEIE Ecosystem Map showing five interconnected pillars"
  aspectRatio="16/9"
  allowZoom={true}
/>
```

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | Yes | Image URL (use `BIRD_IMAGES` registry) |
| `alt` | `string` | Yes | Accessibility description |
| `caption` | `string` | No | Caption text displayed below image |
| `aspectRatio` | `string` | No | CSS aspect ratio (default: `"16/9"`) |
| `allowZoom` | `boolean` | No | Enable click-to-zoom modal (default: `true`) |

**Media Registry Usage:**

All media assets are imported from the centralized registry to ensure consistent URLs and easy updates:

```typescript
// src/lib/bird-urls.ts
export const BIRD_IMAGES = {
  BEIE_SYSTEMS_MAP: "https://example.com/beie-systems-map.jpg",
  CLUSTER1_AGRICULTURE: "https://example.com/cluster1-agriculture.jpg",
  // ... 110 total images
} as const;

export const BIRD_VIDEOS = {
  OVERVIEW: "https://example.com/bird-overview.mp4",
  BEIE_FRAMEWORK: "https://example.com/beie-framework.mp4",
  CLUSTER_DEEP_DIVE: "https://example.com/cluster-deep-dive.mp4",
  METRICS_ARCHITECTURE: "https://example.com/metrics-architecture.mp4",
  BALANCED_SCORECARD: "https://example.com/balanced-scorecard.mp4",
} as const;

export const BIRD_SITES = {
  BARMM_GOVT: "https://www.bangsamoro.gov.ph",
    BIEDA: "https://bieda.bangsamoro.gov.ph",
  BEIE_PORTAL: "https://beie.bangsamoro.gov.ph",
  // ... 12 total external reference links
} as const;
```

---

## Deployment

### Supabase Setup

1. **Create a new Supabase project** at [https://app.supabase.com](https://app.supabase.com)

2. **Run the database migration** to create the responses table:

   ```sql
   -- supabase/migrations/001_create_responses_table.sql
   CREATE TABLE IF NOT EXISTS responses (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     created_at TIMESTAMPTZ DEFAULT now(),
     updated_at TIMESTAMPTZ DEFAULT now(),
     
     -- Section 2: Profile
     respondent_name TEXT,
     respondent_email TEXT,
     organization TEXT,
     position TEXT,
     province TEXT,
     stakeholder_category TEXT,
     expertise_areas TEXT[],
     
     -- Section 3-9: SWOT Scores (JSONB)
     swot_scores JSONB DEFAULT '{}',
     
     -- Section 4-5, 9: Archetypes
     archetype_selections JSONB DEFAULT '{}',
     
     -- Section 10: IEDS
     strategic_option_ranking JSONB DEFAULT '{}',
     phase_preferences JSONB DEFAULT '{}',
     
     -- Section 11: Metrics
     kpi_calibrations JSONB DEFAULT '{}',
     
     -- Section 12: BSC
     bsc_ratings JSONB DEFAULT '{}',
     
     -- Section 13: Budget
     capital_allocation JSONB DEFAULT '{}',
     risk_assessments JSONB DEFAULT '{}',
     
     -- Section 14: Engagements
     follow_up_options TEXT[],
     
     -- Section 15: Consent & Submission
     consent_final BOOLEAN DEFAULT false,
     submitted_at TIMESTAMPTZ,
     
     -- BIRD Scores
     bird_s_ri NUMERIC,
     bird_o_ri NUMERIC,
     bird_w_risk NUMERIC,
     bird_t_vi NUMERIC,
     bird_composite NUMERIC
   );
   
   -- Enable Row Level Security
   ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
   
   -- Create policy: allow anonymous inserts
   CREATE POLICY "Allow anonymous survey submissions"
     ON responses
     FOR INSERT
     TO anon
     WITH CHECK (true);
   
   -- Create policy: allow users to read their own responses
   CREATE POLICY "Allow users to view own responses"
     ON responses
     FOR SELECT
     TO authenticated
     USING (auth.uid() = user_id);
   ```

3. **Configure environment variables** with your Supabase project URL and anon key

4. **Enable anonymous authentication** in your Supabase project settings (Authentication > Providers > Anonymous)

### Build & Deploy

**Static Hosting (Recommended):**

```bash
# Build the production bundle
npm run build

# Deploy the dist/ folder to any static host:
# - Vercel:     vercel --prod
# - Netlify:    netlify deploy --prod --dir=dist
# - GitHub Pages: gh-pages -d dist
# - Cloudflare Pages: wrangler pages deploy dist
# - AWS S3 + CloudFront: aws s3 sync dist/ s3://your-bucket
```

**Docker Deployment:**

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

```bash
docker build -t bird-survey .
docker run -p 8080:80 bird-survey
```

**Environment-Specific Configuration:**

| Environment | Build Command | Notes |
|-------------|--------------|-------|
| Development | `npm run dev` | Hot reload, source maps, debug mode |
| Staging | `npm run build -- --mode staging` | Optimized, analytics disabled |
| Production | `npm run build` | Fully optimized, minified, with analytics |

---

## Contributing

We welcome contributions from developers, researchers, and stakeholders. Please follow these guidelines to ensure a smooth collaboration.

### Adding a New Section

To add a new section to the survey wizard:

1. **Create the section component** in `src/section_components/`:

   ```bash
   touch src/section_components/Section16_NewSection.tsx
   ```

2. **Implement the section component** with the following pattern:

   ```tsx
   // Section16_NewSection.tsx
   import { useState } from "react";
   import { GlassCard } from "@/components/GlassCard";
   import { ImageEmbed } from "@/components/ImageEmbed";
   import { BIRD_IMAGES } from "@/lib/bird-urls";
   
   interface Section16Props {
     data: SurveyData;
     onUpdate: (data: Partial<SurveyData>) => void;
   }
   
   export function Section16_NewSection({ data, onUpdate }: Section16Props) {
     const [localState, setLocalState] = useState(data.newSection || {});
     
     return (
       <div className="space-y-6">
         <GlassCard title="New Section Title" description="Section description">
           <ImageEmbed
             src={BIRD_IMAGES.NEW_SECTION_IMAGE}
             alt="New section reference image"
           />
           {/* Form fields go here */}
         </GlassCard>
       </div>
     );
   }
   ```

3. **Update the schema** in `src/lib/survey-schema.ts`:

   ```typescript
   export const surveySchema = z.object({
     // ... existing fields
     newSection: z.object({
       field1: z.string().min(1, "Field 1 is required"),
       field2: z.number().min(1).max(5),
     }).optional(),
   });
   ```

4. **Register the section** in `src/components/SurveyWizard.tsx`:

   ```tsx
   import { Section16_NewSection } from "@/section_components/Section16_NewSection";
   
   const sections = [
     // ... existing sections
     { id: 16, component: Section16_NewSection, title: "New Section" },
   ];
   ```

5. **Update state types** in `src/types/survey.ts`:

   ```typescript
   export interface SurveyData {
     // ... existing fields
     newSection?: {
       field1: string;
       field2: number;
     };
   }
   ```

6. **Add media assets** to `src/lib/bird-urls.ts`:

   ```typescript
   export const BIRD_IMAGES = {
     // ... existing images
     NEW_SECTION_IMAGE: "https://your-cdn.com/new-section-image.jpg",
   } as const;
   ```

7. **Test thoroughly** using `npm run dev` and verify validation, scoring, and persistence.

### Code Style

- **TypeScript:** Strict mode enabled. All components must have typed props and return types.
- **Naming:** PascalCase for components, camelCase for functions/variables, UPPER_SNAKE_CASE for constants.
- **Imports:** Use `@/` path alias for all internal imports. Group imports: React, external libraries, internal components, types.
- **Formatting:** Run `npm run format` before committing. Prettier configuration is in `package.json`.
- **Linting:** Run `npm run lint` before committing. ESLint configuration follows the recommended TypeScript/React rules.
- **Commits:** Use conventional commit messages (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`).

### Pull Request Process

1. Fork the repository and create a feature branch (`git checkout -b feature/new-section`)
2. Make your changes with clear, atomic commits
3. Run the full test suite (`npm run lint && npm run typecheck && npm run build`)
4. Submit a pull request with a detailed description of changes
5. Request review from at least one maintainer
6. Address review feedback promptly

---

## Content Sources

The survey content is derived from the BIRD 2026-2035 technical document, organized into eight thematic chapters:

| Chapter | Title | Survey Sections |
|---------|-------|----------------|
| **Chapter 1** | BARMM at a Crossroads | Sections 0–2 (Welcome, Privacy, Profile) |
| **Chapter 2** | Context Analysis & BEIE Framework | Section 3 (Systems Thinking & BEIE) |
| **Chapter 3** | SWOT Analysis & Systems Mapping | Sections 4–8 (Clusters 1–5) |
| **Chapter 4** | Strategic Options & IEDS | Sections 10, 13 (IEDS, Priority Actions) |
| **Chapter 5** | Metrics & KPI Benchmarking Framework | Section 11 (Metrics Architecture) |
| **Chapter 6** | Balanced Scorecard | Section 12 (Balanced Scorecard) |
| **Chapter 7** | Priority Actions & Budget | Section 13 (Priority Actions & Budget) |
| **Chapter 8** | Institutional Architecture | Section 9 (Operating Systems) |

All media assets (images and videos) are sourced from the BARMM official communications, BIEDA (Bangsamoro Investment and Economic Development Authority), and the BEIE technical team. External reference links point to official BARMM government portals and partner organization websites.

---

## License

```
MIT License

Copyright (c) 2025 Bangsamoro Investment and Economic Development Authority (BIEDA)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**Built with commitment for the Bangsamoro Autonomous Region in Muslim Mindanao**

<p>
  <sub>BIRD 2026-2035 Validation Survey · BIEDA Technical Team · BEIE Framework</sub>
</p>

<p>
  <a href="https://www.bangsamoro.gov.ph">Bangsamoro Government</a> ·
  <a href="https://bieda.bangsamoro.gov.ph">BIEDA</a> ·
  <a href="https://beie.bangsamoro.gov.ph">BEIE Portal</a>
</p>

</div>
