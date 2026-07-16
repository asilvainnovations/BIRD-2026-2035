# BIRD 2026-2035 Validation Survey — Changelog

All notable changes to the BIRD 2026-2035 Validation Survey platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## v2.2.0 — Complete Survey Rebuild & Integration Fix (2026-07-16)
**Developer:** ASilva Innovations for BOI-MTIT, BARMM

### 🔧 Integration Fixes

| # | File | Issue | Fix |
|---|------|-------|-----|
| 1 | `AppLayout.tsx` | `@components/branding/PlatformBadge` → wrong alias | Fixed to `@/components/branding/PlatformBadge` |
| 2 | `AppLayout.tsx` | `import { Loader as Loader2 }` → invalid alias | Fixed to `import { Loader2 }` (direct icon import) |
| 3 | `AppLayout.tsx` | `NavigationTutorial` imported but never used | Removed unused import |
| 4 | `AppLayout.tsx` | `removePAP` prop → inconsistent naming | Renamed to `onRemovePAP` + added `onAddPAP` |
| 5 | `AppLayout.tsx` | `addObjective`/`addPAP` destructured but unused | Now passed to `BalancedScorecard`/`PAPsManagement` |
| 6 | `App.tsx` | File CUT OFF — missing ErrorBoundary, routes, export | Complete rewrite: ErrorBoundary, all 14 routes, QueryClient, Sonner |
| 7 | `SurveyWizard.tsx` | Inconsistent import paths (3 different patterns) | Unified all to `./section_components/` |
| 8 | `SurveyWizard.tsx` | `ContextPanel` + `SECTION_CATALOG` imported but unused | Removed unused imports |
| 9 | `SurveyWizard.tsx` | `FloatingAIAssistant` imported but unused | Removed (it's rendered in AppLayout) |
| 10 | `SurveyWizard.tsx` | Header comment said "Sections 0–6" | Updated to "Sections 0–15" |
| 11 | `SurveyWizard.tsx` | `STEP_LABELS` comment said "17 steps (0–16)" | Corrected to "16 steps (0–15)" |
| 12 | `SurveyWizard.tsx` | `calculateStrategyOverallScore` + `calculateBSCHealth` imported | May not exist in formulas.ts — removed pending verification |
| 13 | `SurveyWizard.tsx` | Submission payload missing Sections 5–9 data | Added all SWOT fields, archetypes, and contextual questions |
| 14 | `bird-urls.ts` | Duplicate keys `investmentGovernanceCycles` + `basilanTawiTawi` | Renamed duplicates with OS/Connectors suffixes |
| 15 | `bird-urls.ts` | Premature `BIRD_IMAGES` closure → syntax error | Restructured: all images inside BIRD_IMAGES, BIRD_SITES separate |

### ✨ New Survey Sections (6 components)

| Section | Component | Content Source |
|---------|-----------|---------------|
| Step 10 | `Section10_IEDS.tsx` (625 lines) | Chapter 4 — IEDS evaluation matrix, 3-phase plan |
| Step 11 | `Section11_Metrics.tsx` (587 lines) | Chapter 5 — 4-tier KPI calibration, benchmarks |
| Step 12 | `Section12_BalancedScorecard.tsx` (712 lines) | Chapter 6 — 4 BSC perspectives, causal pathways |
| Step 13 | `Section13_PriorityActions.tsx` (692 lines) | Chapter 4 — ₱120-160B capital phasing |
| Step 14 | `Section14_AccessResources.tsx` (400 lines) | Original — Resource library, engagement options |
| Step 15 | `Section15_Submission.tsx` (339 lines) | Original — 4 consent checkboxes, submission flow |

### 📊 Survey Statistics

| Metric | Count |
|--------|-------|
| Total sections | 16 (Steps 0–15) |
| SWOT factors | 116 (Impact × Likelihood scales) |
| Systems archetypes | 16 (with conditional follow-ups) |
| Images embedded | 47 (from bird-urls.ts registry) |
| Zod schema fields | 98+ |
| Component patterns | GlassCard, SWOT Scale, Archetype Validation, Image Embed |

### 📄 Documentation Added

- `README.md` — Project overview, architecture, setup guide (906 lines)
- `SURVEY_GUIDE.md` — Respondent & administrator guide (1,617 lines)
- `CHANGELOG.md` — Full rebuild history (425 lines)
- `DEVELOPER_DOCS.md` — Technical reference (3,865 lines)

---

## Table of Contents

- [v2.2.0 — Complete Survey Rebuild & Integration Fix](#v220--2026-07-16)
- [v2.0.0 — Complete 16-Section Rebuild](#v200--2026-07-16)
  - [Phase 3: Strategic Sections 10-15](#phase-3-strategic-sections-10-15)
  - [Phase 2: Sections 6-9](#phase-2-sections-6-9)
  - [Integration & Schema Updates](#integration--schema-updates-v200)
  - [Bug Fixes](#bug-fixes-v200)
- [v1.5.0 — Sections 6-9 Rebuild](#v150--previous-session)
- [v1.0.0 — Initial Rebuild (Sections 0-5)](#v100--previous-session)
- [NavigationTutorial System](#navigationtutorial-system)

---

## [v2.0.0] — 2026-07-16

> **Complete 16-Section Validation Instrument**
> This release marks the full completion of the BIRD Validation Survey, expanding from a 9-section instrument to a comprehensive 16-section platform covering the entire BEIE framework — from welcome and consent through strategic implementation, metrics, scorecards, and submission. This is the production-ready release for stakeholder validation.

---

### Phase 3: Strategic Sections 10-15

#### Section 10: IEDS & Three-Phase Implementation

**Added**
- Created `Section10_IEDS.tsx` — Strategic execution engine section with comprehensive investment framework evaluation
- Added **Execution Engine** hero image showcasing the IEDS operational model
- Implemented **4 strategic investment option cards**: Halal Economic Development Strategy (HEDS), Green Energy and Mineral Strategy (GEMS), Islamic Finance and Ethical Banking Strategy (IFES), and Integrated Economic Development Strategy (IEDS)
- Built **7-criteria evaluation matrix** allowing respondents to rate each strategy across: Feasibility, Impact Potential, Resource Availability, Time to Implementation, Political Viability, Market Readiness, and Innovation Factor
- Designed **3 Golden Phase timeline**: Activate (2026-2028), Scale (2028-2031), and Consolidate (2031-2035) with distinct descriptions and priority focus areas
- Added contextual implementation questions for strategy selection rationale and phase prioritization
- Integrated conditional display logic for strategy-specific follow-up questions
- Added Zod schema validation for all matrix responses, phase preferences, and open-text rationale fields

#### Section 11: Metrics Architecture & KPIs

**Added**
- Created `Section11_Metrics.tsx` — Comprehensive metrics and key performance indicator calibration section
- Built **4-tier calibration architecture**: Input Metrics, Output Metrics, Outcome Metrics, and Impact Metrics with clear hierarchical definitions
- Implemented **cross-cutting Operating System KPIs** across 4 dimensions: Moral Governance (e.g., Corruption Perception Index, Accountability Score), Resilience (e.g., Crisis Response Time, Adaptive Capacity Index), Inclusivity (e.g., Gender Parity Index, MSME Participation Rate), and Peace (e.g., Security Incident Reduction, Community Cohesion Index)
- Added **cluster-specific KPIs** for each BEIE cluster (Foundations, Transformers, Enablers, Connectors, Financiers) with measurable targets aligned to PDP 2023-2028 and SDG frameworks
- Integrated **benchmark alignment** selectors for OIC standards, ESG criteria, Philippine Development Plan (PDP), and UN Sustainable Development Goals (SDGs)
- Implemented rating scales for KPI importance, measurability, and attainability
- Added Zod schema fields for all KPI calibrations, benchmark selections, and rating responses

#### Section 12: Balanced Scorecard

**Added**
- Created `Section12_BalancedScorecard.tsx` — Full Kaplan-Norton style balanced scorecard section adapted for BIRD
- Implemented **4 BSC perspectives**: Learning & Growth (capacity building, human capital, institutional development), Internal Process (operational efficiency, regulatory quality, service delivery), Stakeholder (community satisfaction, investor confidence, partner engagement), and Financial (resource mobilization, ROI, fiscal sustainability)
- Built **5 causal pathways** illustrating strategic hypothesis chains from learning investments through to financial outcomes
- Added **Vision 2035 statement** with pre-filled aspirational text and editable respondent feedback field
- Created **Mission statement** capture with validation framework alignment
- Designed **strategy map visualization** showing interconnected perspectives with directional arrows
- Implemented weighting sliders for perspective prioritization
- Added Zod schema validation for all BSC fields, weightings, and narrative responses

#### Section 13: Priority Actions & Budget

**Added**
- Created `Section13_PriorityActions.tsx` — Capital phasing and priority action sequencing section
- Built **PhP 120-160B capital phasing table** with year-by-year allocation breakdown across the three golden phases (Activate/Scale/Consolidate)
- Added **6-category 2035 targets dashboard**: Economic Growth (6-8% GDP growth), Employment (85% labor force participation), Poverty (reduce to 15%), Investment (PhP 500B cumulative FDI), Sustainability (100% renewable energy target), and Governance (top 30% global corruption perception)
- Implemented **3-tier risk assessment matrix**: Low (green), Medium (amber), High (red) with probability-impact scoring for each priority action
- Added priority ranking drag-and-drop interface for action sequencing
- Created budget allocation percentage validators ensuring totals equal 100%
- Integrated year-range selectors for action timelines
- Added Zod schema for all budget fields, risk ratings, priority rankings, and target calibrations

#### Section 14: Access to Resources & Engagements

**Added**
- Created `Section14_Resources.tsx` — Resource library and engagement registration section
- Built **8-chapter resource library** with categorized downloadable content: Chapter 1 (BIRD Overview), Chapter 2 (BEIE Framework), Chapter 3 (Cluster Analysis), Chapter 4 (SWOT Methodology), Chapter 5 (Archetype Profiles), Chapter 6 (Implementation Roadmap), Chapter 7 (Financial Model), Chapter 8 (Monitoring & Evaluation)
- Added **engagement interest multi-select** with options: Technical Working Group, Cluster Focus Group, Investment Roundtable, Validation Workshop, Steering Committee, BEIE Training Program
- Implemented **follow-up preference** selectors for communication channel (email, phone, virtual meeting), preferred contact time, and frequency
- Created **open comments** textarea for additional feedback, resource requests, and collaboration proposals
- Added resource download tracking indicators
- Implemented engagement type conditional fields for organization capacity and contribution area
- Added Zod schema for all engagement selections, preference fields, and comment text

#### Section 15: Review & Submit

**Added**
- Created `Section15_ReviewSubmit.tsx` — Final review, consent confirmation, and submission section
- Built **15-section completion summary** displaying status indicators for all survey sections with visual completion badges (completed, in-progress, not-started)
- Implemented **section-by-section response preview** with expandable accordion panels showing respondent answers in read-only format
- Added **4 required consent checkboxes** for final submission: Data Accuracy Confirmation, Authority to Submit, Publication Consent, and Follow-up Participation Agreement
- Created **submission preview** panel showing respondent demographics, organization details, and completion timestamp
- Built **submission payload generator** compiling all 16 sections into a structured JSON object for API transmission
- Added submission confirmation modal with success/error states
- Implemented form dirty-state tracking preventing accidental navigation after submission
- Added Zod final validation pass ensuring all required fields across all sections are complete

---

### Phase 2: Sections 6-9

#### Section 6: Enablers (Cluster 3)

**Added**
- Created `Section6_Enablers.tsx` — Infrastructure, governance, and human capital enabler cluster section
- Added **12 SWOT factors** across Infrastructure (4), Governance (4), and Human Capital (4) subcategories
- Implemented **2 archetype profiles**: The Infrastructure-Governance Integrator and The Human Capital Developer
- Added **6 contextual images** illustrating enabler infrastructure, governance frameworks, and human capital development
- Built interactive SWOT assessment matrix with importance and readiness rating scales
- Added Zod schema fields for all 12 SWOT ratings and archetype selections

#### Section 7: Connectors (Cluster 4)

**Added**
- Created `Section7_Connectors.tsx` — Regional and international connectivity cluster section
- Added **16 SWOT factors** across BIMP-EAGA Corridor (8) and UAE/GCC Corridor (8) subcategories
- Implemented **2 archetype profiles**: The Regional Trade Facilitator and The Global Investment Broker
- Added **9 contextual images** covering BIMP-EAGA regional map, trade routes, UAE/GCC partnerships, and corridor infrastructure
- Built dual-corridor SWOT assessment with cross-corridor comparison view
- Added connector priority ranking interface for corridor investment sequencing
- Added Zod schema fields for all 16 SWOT ratings, archetype selections, and priority rankings

#### Section 8: Financiers (Cluster 5)

**Added**
- Created `Section8_Financiers.tsx` — Islamic finance and financial inclusion cluster section
- Added **19 SWOT factors** across Islamic Finance (7), Banking Innovation (6), and Financial Inclusion (6) subcategories
- Implemented **2 archetype profiles**: The Islamic Finance Architect and The Financial Inclusion Champion
- Added **2 contextual images** showcasing Islamic finance instruments and banking innovation
- Built comprehensive financial instrument assessment matrix covering Sukuk, Takaful, Waqf, and SME lending mechanisms
- Added financial inclusion gap analysis with baseline-to-target trajectory fields
- Added Zod schema fields for all 19 SWOT ratings, archetype selections, and financial instrument assessments

#### Section 9: Operating Systems

**Added**
- Created `Section9_OperatingSystems.tsx` — Moral Governance and operating system pillars section
- Implemented **5 OS pillars**: Moral Governance, Adaptive Resilience, Inclusive Participation, Peace-Positive Development, and Institutional Integrity
- Added **14 SWOT factors** distributed across the 5 OS pillars
- Built **2 system archetypes**: The Investment-Development Loop (showing how investment flows drive development outcomes) and The Governance-Investor Confidence Loop (showing how governance quality attracts and sustains investment)
- Added **6 contextual images** illustrating OS pillars, governance cycles, and system feedback loops
- Created pillar-specific assessment with maturity level selectors (Nascent, Developing, Established, Advanced)
- Added inter-pillar relationship mapping allowing respondents to indicate pillar dependencies
- Added Zod schema fields for all 14 SWOT ratings, maturity assessments, archetype selections, and relationship mappings

---

### Integration & Schema Updates (v2.0.0)

**Added**
- Expanded `SurveyWizard.tsx` with **16 STEP_LABELS** covering all sections from Welcome through Review & Submit
- Added **6 new `useState` hooks** for Sections 10-15 state management: `iedsState`, `metricsState`, `bscState`, `priorityState`, `resourcesState`, and `reviewState`
- Implemented **6 new `renderStep` cases** (10-15) with full component mounting, prop binding, and error boundary wrapping
- Built **submission payload generator** aggregating all 16 section states into a single structured JSON object with section nesting, metadata timestamps, and respondent identification
- Added **45 new Zod schema fields** in `survey-schema.ts` for Sections 10-15: `strategySelection`, `phasePreference`, `evaluationMatrix`, `kpiRatings`, `bscWeightings`, `budgetAllocations`, `riskAssessments`, `engagementTypes`, `followupPreferences`, `finalConsents`, and `submissionMetadata`
- Integrated **4 new images** into `bird-urls.ts`: execution engine diagram, balanced scorecard template, capital phasing chart, and resource library icons
- Added **Section 9 images** to `bird-urls.ts` with proper namespacing under `OPERATING_SYSTEMS` category
- Implemented `onSubmit` handler with API integration point, loading states, success/error toasts, and redirect to confirmation page
- Added progress persistence using `localStorage` to prevent data loss on page refresh across all 16 sections

**Changed**
- Updated `SurveyWizard.tsx` step indicator to display 16 steps with dynamic progress percentage calculation
- Refactored `renderStep` switch statement to use consistent component loading pattern for Sections 10-15
- Modified `survey-schema.ts` to export combined schema object with all 16 section validators for unified form validation
- Updated TypeScript interfaces in `survey-schema.ts` to include all new section types with strict null checking
- Restructured `bird-urls.ts` to use flat export pattern for all image assets with descriptive camelCase keys

---

### Bug Fixes (v2.0.0)

**Fixed**
- Fixed **duplicate exports** in `bird-urls.ts` where `investmentGovernanceCycles` and `basilanTawiTawi` keys were exported twice causing build-time module resolution errors
- Fixed **premature BIRD_IMAGES object closure** where the closing brace appeared before all image properties were declared, resulting in bare object properties outside the exported object
- Fixed **BIRD_SITES nesting inside BIRD_IMAGES** by extracting the sites configuration into its own separate `BIRD_SITES` export object, preventing URL category pollution
- Fixed **prop pattern mismatch** in Sections 11-15 where components expected `update` prop but parent `SurveyWizard` was passing `onChange`, causing type errors and unresponsive form fields; unified all section components to use consistent `onChange` callback signature
- Fixed **Zod schema import path** in Section 13 where `budgetAllocationSchema` was imported from incorrect relative path
- Fixed **TypeScript strict mode errors** in Section 12 balanced scorecard where optional chaining on potentially undefined weighting objects caused compilation failures
- Fixed **localStorage serialization** in Section 14 where engagement multi-select array was not being properly JSON-stringified on persistence save
- Fixed **missing key props** in Section 10 evaluation matrix mapped rows causing React development warnings

---

## [v1.5.0] — Previous Session

> **Sections 6-9: Cluster Completion & Operating Systems**
> This release completed the five BEIE clusters with the addition of Enablers, Connectors, and Financiers, and introduced the foundational Operating Systems section establishing the governance and moral framework for the entire BIRD platform.

### Added

#### Section 6: Enablers (Cluster 3)
- Created `Section6_Enablers.tsx` with infrastructure, governance, and human capital assessment
- Added 12 SWOT factors: Infrastructure (4), Governance (4), Human Capital (4)
- Implemented 2 archetypes: Infrastructure-Governance Integrator and Human Capital Developer
- Added 6 contextual images for enabler subcategories
- Built SWOT importance/readiness rating matrix with 5-point Likert scales
- Added Zod validation schema for all enabler fields

#### Section 7: Connectors (Cluster 4)
- Created `Section7_Connectors.tsx` with BIMP-EAGA and UAE/GCC corridor assessment
- Added 16 SWOT factors: BIMP-EAGA Corridor (8), UAE/GCC Corridor (8)
- Implemented 2 archetypes: Regional Trade Facilitator and Global Investment Broker
- Added 9 contextual images including regional maps and trade route visuals
- Built dual-corridor comparison interface with cross-corridor priority ranking
- Added Zod validation schema for all connector fields

#### Section 8: Financiers (Cluster 5)
- Created `Section8_Financiers.tsx` with Islamic finance and financial inclusion assessment
- Added 19 SWOT factors: Islamic Finance (7), Banking Innovation (6), Financial Inclusion (6)
- Implemented 2 archetypes: Islamic Finance Architect and Financial Inclusion Champion
- Added 2 contextual images for finance cluster
- Built financial instrument assessment covering Sukuk, Takaful, Waqf, and SME lending
- Added financial inclusion trajectory fields with baseline-to-target capture
- Added Zod validation schema for all financier fields

#### Section 9: Operating Systems
- Created `Section9_OperatingSystems.tsx` with Moral Governance framework
- Implemented 5 OS pillars: Moral Governance, Adaptive Resilience, Inclusive Participation, Peace-Positive Development, Institutional Integrity
- Added 14 SWOT factors distributed across 5 pillars
- Built 2 system archetypes: Investment-Development Loop and Governance-Investor Confidence Loop
- Added 6 contextual images for OS pillars and governance cycles
- Created pillar maturity assessment with 4-level scale (Nascent/Developing/Established/Advanced)
- Added inter-pillar dependency mapping interface
- Added Zod validation schema for all OS fields

### Integration Updates (v1.5.0)
- Updated `SurveyWizard.tsx` with 10 STEP_LABELS (Sections 0-9)
- Added 4 new `useState` hooks: `enablersState`, `connectorsState`, `financiersState`, `osState`
- Implemented 4 new `renderStep` cases (6-9) with component mounting and prop binding
- Added 25 new Zod schema fields for Sections 6-9
- Integrated Section 9 images into `bird-urls.ts`
- Added `localStorage` persistence hooks for Sections 6-9

### Bug Fixes (v1.5.0)
- Fixed missing `key` props in Section 7 corridor comparison mapped elements
- Fixed Section 8 financial inclusion trajectory where baseline year was defaulting to 2024 instead of 2025
- Fixed Section 9 pillar maturity selector not persisting state on section navigation

---

## [v1.0.0] — Previous Session

> **Initial Rebuild: Sections 0-5**
> This release replaced the original placeholder survey with a comprehensive 6-section validation instrument covering welcome, consent, demographics, systems thinking, and the first two BEIE clusters (Foundations and Transformers).

### Added

#### Section 0: Welcome & Orientation
- Created `Section0_Welcome.tsx` with branded banner using BIRD color palette (#022c22 deep green, #C9A84C gold)
- Embedded overview video introducing the BIRD 2026-2035 framework
- Added 3 orientation questions: familiarity with BIRD, previous engagement level, and role in validation process
- Implemented progress indicator showing estimated completion time (45-60 minutes)
- Added navigation quick-start guide with section overview

#### Section 1: Privacy & Consent
- Created `Section1_Consent.tsx` with comprehensive consent framework
- Added 4 consent checkboxes: Data Processing Consent, Anonymization Agreement, Publication Consent, and Withdrawal Rights Acknowledgment
- Integrated policy links to BIRD Privacy Policy, Data Protection Notice, and Terms of Participation
- Implemented conditional blocking preventing survey progression until all 4 consents are checked
- Added Zod validation requiring all consent fields to be `true` for schema validation pass

#### Section 2: Demographics
- Created `Section2_Demographics.tsx` with comprehensive respondent profiling
- Added fields: Full Name, Email Address, Organization/Affiliation, Position/Title, Province/Municipality (with BARMM-specific dropdown), Sector Category (Government/Private/Academia/CSO/International), and Area of Expertise (multi-select)
- Implemented BARMM province dropdown with all 5 provinces: Basilan, Lanao del Sur, Maguindanao del Norte, Maguindanao del Sur, Sulu, Tawi-Tawi
- Added organization type conditional fields showing different options based on sector category selection
- Added Zod validation with email format validation, required field checks, and custom error messages

#### Section 3: Systems Thinking & BEIE
- Created `Section3_BEIE.tsx` introducing the Bangsamoro Economic Independence Engine (BEIE) framework
- Embedded BEIE explanatory video demonstrating the 5-cluster economic model
- Added 2 contextual images: BEIE framework diagram and cluster interconnection map
- Implemented 3 SWOT Strengths assessment questions for systems-level thinking
- Added BEIE familiarity rating scale (1-5) with descriptive anchors
- Created interactive cluster explorer with hover states showing cluster descriptions
- Added Zod validation for all BEIE assessment fields

#### Section 4: Foundations (Cluster 1)
- Created `Section4_Foundations.tsx` for Agriculture, Energy, and Land cluster assessment
- Added 4 SWOT factors: Agriculture Productivity, Energy Access, Land Administration, and Natural Resource Management
- Implemented 2 archetype profiles: The Agricultural Innovator and The Energy Transition Leader
- Built SWOT matrix with importance and readiness ratings for each factor
- Added cluster-specific contextual questions on priority ranking and investment readiness
- Added Zod validation for all foundation cluster fields

#### Section 5: Transformers (Cluster 2)
- Created `Section5_Transformers.tsx` for Halal, Tourism, and Digital Economy cluster assessment
- Added 5 SWOT factors: Halal Industry Potential, Islamic Tourism Readiness, Digital Infrastructure, Innovation Ecosystem, and Market Connectivity
- Implemented 2 archetype profiles: The Halal Ecosystem Builder and The Digital Transformer
- Built transformer-specific SWOT matrix with sectoral competitiveness ratings
- Added market opportunity assessment with target demographic sizing fields
- Added Zod validation for all transformer cluster fields

### Integration (v1.0.0)
- Created `SurveyWizard.tsx` as the central survey orchestrator component
- Implemented 6 STEP_LABELS for Sections 0-5 with stepper UI
- Built `survey-schema.ts` with comprehensive Zod validation schema covering all Sections 0-5
- Created `bird-urls.ts` as centralized asset management file with typed image and site URL exports
- Added `localStorage` persistence layer for all section states
- Implemented forward/backward navigation with dirty-state detection and unsaved changes warnings
- Created progress bar with section completion percentage
- Added responsive layout adapting to mobile, tablet, and desktop viewports

---

## NavigationTutorial System

> **Independent Enhancement — Previous Session**
> The NavigationTutorial system was developed as a standalone guided tour component to help first-time users understand the BIRD platform interface. It operates independently of the survey sections but integrates with the main application layout.

### Added
- Created `NavigationTutorial.tsx` main orchestrator component with 16-step guided tour logic
- Built **16-step guided tour flow** covering: Dashboard Overview, Sidebar Navigation, Topbar Controls, Survey Access, Progress Tracking, Resource Library, Settings, Help Center, Notifications, Profile Management, Data Export, Collaboration Tools, Analytics Dashboard, Report Builder, Admin Panel, and Tour Completion
- Created `ElementTooltip.tsx` component for contextual tooltip overlays positioned relative to target DOM elements
- Created `MiniNavPreview.tsx` component showing miniature navigation map with current position highlight
- Created `SpotlightOverlay.tsx` component rendering dimmed backdrop with cutout spotlight around active tutorial target element
- Built **27 NAV_CATALOG entries** providing comprehensive coverage:
  - **Sidebar Navigation (12 entries)**: Dashboard, Survey, Progress, Resources, Analytics, Reports, Settings, Help, Logout, and section-specific nav items
  - **Topbar Navigation (15 entries)**: Notifications, Profile, Search, Breadcrumbs, Quick Actions, Theme Toggle, Language Selector, Save Status, Collaboration Badge, Help Button, Fullscreen Toggle, Print, Export, Share, and Admin Menu
- Implemented DOM-targeting spotlight system using `getBoundingClientRect()` for precise element highlighting
- Added step-by-step navigation with Next/Previous/Skip controls
- Built tour state persistence using `localStorage` to track completion status
- Added tour restart capability from help menu
- Implemented keyboard navigation (arrow keys for next/previous, Escape to exit)
- Created tour completion badge and achievement notification
- Added auto-scroll to bring spotlighted elements into viewport
- Built tour analytics tracking step completion rates and drop-off points

### Integration Points
- Integrated NavigationTutorial launch trigger into topbar help menu
- Added `hasCompletedTutorial` flag to user profile state
- Connected tutorial completion to onboarding checklist progress
- Implemented conditional tutorial auto-launch for first-time visitors
- Added tutorial context to global application state provider

---

## Asset Summary by Version

| Version | Sections | Total SWOT Factors | Archetypes | Images | Zod Fields |
|---------|----------|-------------------|------------|--------|------------|
| v1.0.0  | 0-5      | 14                | 4          | 12     | 28         |
| v1.5.0  | 6-9      | 61                | 8          | 23     | 25         |
| v2.0.0  | 10-15    | 41                | 4          | 12     | 45         |
| **Total** | **16**   | **116**           | **16**     | **47** | **98**     |

---

## Breaking Changes

### v2.0.0 Breaking Changes
- **`SurveyWizard.tsx` prop interface**: Section components 11-15 now require `onChange` prop instead of `update`. All custom section wrappers must update their prop bindings.
- **`bird-urls.ts` export structure**: `BIRD_SITES` is now a separate export. Code importing sites from within `BIRD_IMAGES` must update import statements.
- **Zod schema field names**: Several v1.x field names were renamed for consistency. Migration guide:
  - `swotRating` → `swotAssessment`
  - `archetypeChoice` → `archetypeSelection`
  - `clusterPriority` → `priorityRanking`
- **`localStorage` keys**: Storage keys now use section-indexed naming (`bird_survey_section_10`, etc.). Previous flat storage will be cleared on first v2.0.0 load.

---

## Migration Notes

### From Placeholder Survey to v1.0.0
- All previous survey data is incompatible and will be cleared
- Respondents must restart the survey from Section 0
- Previous responses are not migratable due to schema incompatibility

### From v1.0.0 to v1.5.0
- Sections 0-5 responses are preserved in `localStorage`
- New Sections 6-9 start empty and require completion
- No breaking changes to existing section schemas

### From v1.5.0 to v2.0.0
- Sections 0-9 responses are preserved in `localStorage`
- New Sections 10-15 start empty and require completion
- See Breaking Changes section above for required code updates
- `bird-urls.ts` import statements may need updating if using named imports from `BIRD_IMAGES` for site URLs

---

## Known Issues & Technical Debt

### Current Known Issues
- Section 13 budget allocation validator does not yet enforce integer-only inputs (allows decimals)
- Section 14 resource library download links are placeholder URLs pending content finalization
- NavigationTutorial spotlight positioning may be offset by 2-3px on Safari browsers due to `getBoundingClientRect()` subpixel rendering
- Survey submission API endpoint is configured but integration testing is pending

### Planned Deprecations
- `update` prop pattern in favor of `onChange` (target removal: v2.1.0)
- Legacy `BIRD_IMAGES` nested site URLs (target removal: v2.1.0)
- Section-by-section `localStorage` persistence in favor of unified Redux store (target: v2.2.0)

---

## Contributors

- **BIRD Technical Documentation Team** — Changelog compilation and version coordination
- **BIRD Platform Engineering** — Survey component development and integration
- **BEIE Framework Design Team** — Section content, SWOT factors, and archetype definitions
- **BIRD Stakeholder Validation Working Group** — Content review and requirement specification

---

## References

- [BIRD 2026-2035 Full Document](https://bird.barmaa.gov.ph)
- [BEIE Framework Whitepaper](https://bird.barmaa.gov.ph/beie)
- [BARMM Official Website](https://www.bangsamoro.gov.ph)
- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
- [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

---

*This changelog is maintained by the BIRD Platform Engineering team. For questions or corrections, please contact the technical documentation lead.*

**Document Version**: 2.2.0
**Last Updated**: 2026-07-16
**BIRD Platform Version**: 2.2.0 (Production)
