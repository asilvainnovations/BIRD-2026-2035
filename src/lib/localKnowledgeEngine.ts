/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * BIRD LOCAL KNOWLEDGE ENGINE
 * ═══════════════════════════════════════════════════════════════════════════════
 * Systems-architect refactor of the FloatingAIAssistant intelligence layer.
 * Replaces external AI Edge Functions with embedded domain knowledge extracted
 * from:
 *   • public/user-manual.html  (17 sections, 50+ features)
 *   • README.md                (BEIE Framework, Architecture, Formulas)
 *   • src/lib/utils.ts         (BIRD mathematical formulas)
 *   • src/lib/strategicPlanStore.ts  (Type definitions & enums)
 *
 * DESIGN PRINCIPLES
 *   1. Zero external network calls — 100% offline-capable
 *   2. Deterministic responses — same query + context = same answer
 *   3. Formula-accurate — delegates to src/lib/formulas.ts for all math
 *   4. View-aware — tailors responses to active strategic module
 *   5. Plan-aware — enriches answers with current plan data when available
 *
 * @module localKnowledgeEngine
 * @author  ASilva Innovations · Systems Architecture Refactor
 * @license MIT
 */

import {
  calculateStrengthRI,
  calculateOpportunityRI,
  calculateWeaknessRisk,
  calculateThreatVI,
} from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface KnowledgeEntry {
  id: string;
  category: KnowledgeCategory;
  triggers: string[];           // weighted keyword triggers (lowercase)
  triggerPhrases?: string[];    // exact multi-word phrases for high-confidence match
  response: string | ((ctx: ResponseContext) => string);
  weight?: number;              // base relevance weight (1–10)
}

export interface ResponseContext {
  query: string;
  activeView: string;
  plan?: any;                   // StrategicPlan snapshot
  history: { role: string; content: string }[];
}

export type KnowledgeCategory =
  | 'overview'
  | 'swot'
  | 'systems'
  | 'strategy'
  | 'scorecard'
  | 'paps'
  | 'mel'
  | 'formulas'
  | 'barmm'
  | 'navigation'
  | 'troubleshooting'
  | 'collaboration'
  | 'templates'
  | 'export';

// ─── Helper: normalize query ─────────────────────────────────────────────────
const normalize = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

// ─── Helper: score a query against triggers ──────────────────────────────────
function scoreEntry(query: string, entry: KnowledgeEntry, view: string): number {
  const q = normalize(query);
  let score = 0;

  // Keyword overlap
  for (const t of entry.triggers) {
    if (q.includes(t)) score += t.split(' ').length * 2;
  }

  // Exact phrase matches (high confidence)
  if (entry.triggerPhrases) {
    for (const phrase of entry.triggerPhrases) {
      if (q.includes(phrase)) score += phrase.split(' ').length * 5;
    }
  }

  // View-context boost
  const viewMap: Record<string, KnowledgeCategory[]> = {
    dashboard:  ['mel', 'overview', 'barmm'],
    swot:       ['swot', 'formulas', 'strategy'],
    systems:    ['systems', 'strategy'],
    scorecard:  ['scorecard', 'mel', 'barmm'],
    paps:       ['paps', 'mel', 'barmm'],
    strategy:   ['strategy', 'systems', 'swot'],
    templates:  ['templates', 'navigation'],
    default:    ['overview', 'barmm', 'navigation'],
  };
  const relevantCats = viewMap[view] || viewMap.default;
  if (relevantCats.includes(entry.category)) score *= 1.4;

  // Base weight
  score *= entry.weight ?? 5;

  return score;
}

// ═══════════════════════════════════════════════════════════════════════════════
// KNOWLEDGE BASE — extracted from user-manual.html, README.md, and utils.ts
// ═══════════════════════════════════════════════════════════════════════════════

const KB: KnowledgeEntry[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. OVERVIEW & BEIE FRAMEWORK
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'bird-what',
    category: 'overview',
    triggers: ['what is bird', 'bird platform', 'strategic planning platform', 'bangsamoro investment roadmap', 'purpose of bird'],
    triggerPhrases: ['what is bird', 'what is the bird', 'bird 2026', 'bird 2026-2035', 'bangsamoro investment roadmap development'],
    weight: 10,
    response: `BIRD 2026–2035 is the official strategic planning platform for the **Bangsamoro Investment Roadmap Development** — a 10-year blueprint to transform BARMM into a competitive, ethical, and inclusive investment destination.

It is built on the **BEIE Framework** (Bangsamoro Economic & Investment Ecosystem) and operationalizes planning through the **Strat Planner Pro** engine:

**Workflow Pipeline:**
SWOT Diagnosis → Systems Thinking → TOWS Strategy Matrix → Balanced Scorecard → PAPs Execution → MEL Dashboard

**Key Capabilities:**
• Real-time KPI monitoring across the Bangsamoro Balanced Scorecard
• Locally-intelligent SWOT analysis with Resilience Index scoring
• Causal Loop Diagram builder with 9 systems archetypes
• TOWS strategy formulation (SO / ST / WO / WT)
• Program/Activity/Project tracking with budget management
• Print-ready strategic plan export (PDF, Word, Excel)
• Team collaboration with real-time presence

**Owner:** BOI-MTIT, BARMM  
**Developer:** ASilva Innovations`,
  },
  {
    id: 'beie-framework',
    category: 'overview',
    triggers: ['beie', 'bangsamoro economic investment ecosystem', 'framework', '4 pillars', 'four pillars', 'strategic pillars'],
    triggerPhrases: ['beie framework', 'what is beie', 'four pillars', '4 pillars', 'strategic pillars'],
    weight: 10,
    response: `The **BEIE Framework** (Bangsamoro Economic & Investment Ecosystem) anchors every module in BIRD. It is governed by **Moral Governance** and executed through **4 Strategic Pillars**:

| # | Pillar | Key Focus |
|---|--------|-----------|
| 1 | **Halal Industry & Ecosystem** | OIC/SMIIC certification, MSME capacity, halal tourism |
| 2 | **Governance & Institutional Reform** | BEGMP digital governance, BICC, moral governance |
| 3 | **Infrastructure & Connectivity** | ZBIP energy, solar mini-grids, broadband, Halal Park |
| 4 | **Islamic Finance & Inclusive Growth** | Al-Amanah Shariah financing, BIMP-EAGA, green economy |

**5 Critical Leverage Points (CLPs):**
• **LP1** — Halal Certification System Integrity (*Fixes that Fail*)
• **LP2** — Infrastructure–Energy–Connectivity Nexus (*Limits to Growth*)
• **LP3** — Governance–Investor Confidence Feedback (*Growth and Underinvestment*)
• **LP4** — Islamic Finance Ecosystem Development (*Shifting the Burden*)
• **LP5** — Green Economy Revenue Framework (*Tragedy of the Commons*)`,
  },
  {
    id: 'bird-phases',
    category: 'overview',
    triggers: ['phases', 'implementation phases', 'foundation', 'acceleration', 'transformation', 'timeline', 'budget'],
    triggerPhrases: ['three phases', '3 phases', 'implementation phase', 'phase 1', 'phase 2', 'phase 3'],
    weight: 9,
    response: `BIRD 2026–2035 is implemented across **3 phases** with a total budget of **₱120–160B**:

| Phase | Period | Name | Budget | Focus |
|-------|--------|------|--------|-------|
| **1** | 2026–2028 | Foundation Building | ₱35–45B | Governance, halal certification, energy baseline, ZBIP |
| **2** | 2029–2031 | Acceleration | ₱50–65B | Scale halal exports, Islamic finance, BIMP-EAGA integration |
| **3** | 2032–2035 | Transformation | ₱35–50B | Green economy leadership, innovation hub, self-sustaining BARMM |

**Current Phase (2026):** Foundation Building — the most time-critical window for establishing halal certification integrity (LP1) and energy infrastructure (LP2).`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. BARMM ECONOMIC CONTEXT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'barmm-economy',
    category: 'barmm',
    triggers: ['barmm economy', 'economic indicators', 'grdp', 'gdp', 'growth rate', 'population', 'poverty', 'province'],
    triggerPhrases: ['barmm grdp', 'economic context', 'barang economy', 'province growth', 'poverty incidence'],
    weight: 9,
    response: `**BARMM Key Economic Indicators (2024–2026):**

• **Population:** 5.69M (PSA 2025)
• **GRDP:** ₱299.5B (2024); growth 2.7%
• **Sectoral split:** Services 42% | AFF 32.4% | Industry 25.6%
• **Poverty incidence:** 34.8% (1H 2023), down from 55.9% in 2018
• **Investment approvals:** ₱5.1B (Q1 2026)

**Provincial Growth Disparity:**
• **Fastest growing:** Maguindanao del Norte (4.1%), Lanao del Sur (4.0%)
• **Underinvested islands:** Tawi-Tawi (1.1%), Sulu (1.13%), Basilan (1.6%)

**Infrastructure Gaps:**
• Electrification: ~75% (target 100% by 2035)
• Broadband penetration: <30% (target 85% by 2035)
• **ZBIP (Zamboanga-Basilan Integrated Power):** ₱6.67B — strategically critical

**Halal Economy:**
• Halal-certified firms: ~500 (2024)
• Target: 5,000+ by 2035
• Export target: ₱40B via OIC/SMIIC accreditation`,
  },
  {
    id: 'halal-sector',
    category: 'barmm',
    triggers: ['halal', 'halal certification', 'oic', 'smiic', 'halal tourism', 'halal park', 'halal industry'],
    triggerPhrases: ['halal certification', 'oic smiic', 'halal sector', 'halal economy', 'halal park'],
    weight: 9,
    response: `**Halal Industry & Ecosystem — BEIE Pillar 1**

Halal is BARMM's **highest-leverage economic differentiator** (LP1). The sector spans:
• **Food & Beverage** — OIC/SMIIC-compliant processing
• **Tourism** — Halal-friendly destinations, Islamic heritage circuits
• **Cosmetics & Pharma** — Shariah-compliant personal care
• **Finance** — Takaful, Waqf, Murabaha (Pillar 4 overlap)

**Certification Roadmap:**
• Current: ~500 certified firms (2024)
• Target: 5,000+ by 2035
• Accreditation: OIC/SMIIC standards (not just local BHB)
• **Critical constraint:** Certification backlog and auditor capacity

**Strategic Projects:**
• **Bangsamoro Halal Park** — integrated halal manufacturing & logistics hub
• **Halal Tourism Circuits** — Marawi, Tawi-Tawi marine heritage, Sulu pearl routes
• **MSME Capacity Building** — technical assistance for certification readiness

**Why it matters:** OIC/SMIIC accreditation unlocks the ₱40B export target and BIMP-EAGA halal trade corridor. Without LP1 integrity, downstream pillars cannot scale.`,
  },
  {
    id: 'islamic-finance',
    category: 'barmm',
    triggers: ['islamic finance', 'shariah', 'takaful', 'waqf', 'murabaha', 'al-amanah', 'green bond', 'carbon'],
    triggerPhrases: ['islamic finance', 'shariah financing', 'al amanah', 'green economy revenue'],
    weight: 8,
    response: `**Islamic Finance & Inclusive Growth — BEIE Pillar 4**

BARMM is positioned to become the **Philippine gateway for Islamic finance**, leveraging:
• **RA 11439** (Islamic Banking Law) — enabling Shariah-compliant banking
• **Al-Amanah Islamic Investment Bank** — Bangsamoro's dedicated Islamic bank
• **Takaful** — Islamic insurance for MSME risk coverage
• **Waqf** — endowment-based social infrastructure financing
• **Green Sukuk** — Shariah-compliant green bonds for climate projects

**Green Economy Revenue (F4 Objective):**
• REDD+ (Reducing Emissions from Deforestation)
• Payment for Ecosystem Services (PES)
• Carbon credit markets via JMC 2026-01 & Forestry Code
• Target: Activate new revenue streams by Phase 2 (2029–2031)

**BIMP-EAGA Integration:**
• Brunei-Indonesia-Malaysia-Philippines East ASEAN Growth Area
• BARMM as the Philippine halal & Islamic finance gateway
• Cross-border investment facilitation via BICC (Bangsamoro Investment Climate Committee)`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. SWOT ANALYSIS & FORMULAS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'swot-overview',
    category: 'swot',
    triggers: ['swot', 'strength weakness opportunity threat', 'environmental analysis', 'diagnostic'],
    triggerPhrases: ['what is swot', 'swot analysis', 'how to use swot', 'swot module'],
    weight: 10,
    response: `**SWOT Analysis Module — Phase 1 Diagnostics**

The SWOT module provides a 4-quadrant environmental diagnostic with **BIRD's official Resilience Index scoring**:

**Quadrants:**
• **Strengths** — Internal positive factors (RI: Resilience Index)
• **Weaknesses** — Internal negative factors (Risk Score)
• **Opportunities** — External positive factors (RI)
• **Threats** — External negative factors (VI: Vulnerability Index)

**How to use it:**
1. Navigate to **SWOT Analysis** from the sidebar
2. Select a quadrant tab (Strengths / Weaknesses / Opportunities / Threats)
3. Click **+ Add Item** and enter a description
4. Rate **Impact (1–5)** and **Likelihood (1–5)**
5. The platform auto-computes the index score

**Bulk Import:** You can import multiple SWOT factors at once via CSV or the bulk-entry panel.

**Local-Intelligent Generation:** Click **✨ Generate** to receive contextually relevant SWOT items based on BARMM's sectoral data and your plan's strategic intent.`,
  },
  {
    id: 'bird-formulas',
    category: 'formulas',
    triggers: ['formula', 'resilience index', 'ri formula', 'risk index', 'vulnerability index', 'vi formula', 'calculate', 'score', 'math'],
    triggerPhrases: ['resilience index formula', 'risk index formula', 'vulnerability index formula', 'how to calculate ri', 'bird scoring', 'swot formula'],
    weight: 10,
    response(ctx) {
      const nums = ctx.query.match(/\b([1-5])\b/g)?.map(Number);
      if (nums && nums.length >= 2) {
        const [impact, likelihood] = [nums[0], nums[1]];
        const sRI = calculateStrengthRI(impact, likelihood);
        const oRI = calculateOpportunityRI(impact, likelihood);
        const wRisk = calculateWeaknessRisk(impact, likelihood);
        const tVI = calculateThreatVI(impact, likelihood);
        return `**BIRD Scoring Calculation** (Impact=${impact}, Likelihood=${likelihood}):

| Factor | Formula | Result |
|--------|---------|--------|
| **Strength RI** | (Impact × Likelihood) / 5 | **${sRI}** (scale 1–5) |
| **Opportunity RI** | √(Impact × Likelihood) | **${oRI}** (scale 1–5) |
| **Weakness Risk** | Impact × Likelihood | **${wRisk}** (scale 1–25) |
| **Threat VI** | (Impact² × Likelihood) / 25 | **${tVI}** (scale 1–5) |

**Interpretation:**
• RI 4–5 = High resilience / strong opportunity
• Risk 20–25 = Critical internal weakness requiring immediate PAP
• VI 4–5 = High external vulnerability — consider WT or ST strategies`;
      }
      return `**BIRD Official Scoring Formulas** (from src/lib/formulas.ts):

| Index | Quadrant | Formula | Scale |
|-------|----------|---------|-------|
| **Relevance Index (RI)** | Strengths | (Impact × Likelihood) / 5 | 1–5 |
| **Relevance Index (RI)** | Opportunities | √(Impact × Likelihood) | 1–5 |
| **Risk Index** | Weaknesses | Impact × Likelihood | 1–25 |
| **Vulnerability Index (VI)** | Threats | (Impact² × Likelihood) / 25 | 1–5 |

**Auto-Color Coding:**
• Critical items (highest scores) appear at the top
• Color bands: Green (low) → Amber (medium) → Red (high)

**Tip:** Give me two numbers (e.g., *"calculate impact 4 likelihood 3"*) and I'll run the formulas for you.`;
    },
  },
  {
    id: 'swot-ai-generate',
    category: 'swot',
    triggers: ['generate swot', 'draft swot', 'swot suggestions', 'swot items', 'strengths examples', 'weaknesses examples', 'threats barmm'],
    triggerPhrases: ['generate swot', 'draft strengths', 'swot examples', 'barmm strengths', 'barmm weaknesses'],
    weight: 9,
    response: `**Sample BARMM SWOT Items (from BIRD Knowledge Base):**

**Strengths:**
• Rich halal heritage and Islamic governance tradition (Moral Governance)
• Young demographic (median age ~20) = demographic dividend
• BIMP-EAGA geographic gateway position
• Natural resources: fisheries, agriculture, marine biodiversity
• Peace dividend from BOL implementation

**Weaknesses:**
• Low electrification (~75%) and broadband (<30%)
• Certification bottleneck: only ~500 halal-certified firms
• Fragmented land titling and property rights
• Skills mismatch: TVET not aligned with halal industry needs
• Weak intra-regional transport connectivity

**Opportunities:**
• Global halal market: $2.3T+ and growing 6.2% CAGR
• OIC/SMIIC accreditation = passport to 57-country market
• Green sukuk and carbon credit markets (REDD+, PES)
• Philippine CREATE MORE Act incentives for BARMM
• Digital governance leapfrogging via BEGMP

**Threats:**
• Malaysia and Indonesia consolidating halal hub dominance
• Climate change: rising sea levels affecting island provinces
• Aid dependency creating "Shifting the Burden" dynamics
• Political fragmentation affecting long-term planning continuity
• Global economic volatility affecting FDI flows`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. SYSTEMS THINKING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'systems-overview',
    category: 'systems',
    triggers: ['systems thinking', 'causal loop', 'cld', 'feedback loop', 'reinforcing loop', 'balancing loop'],
    triggerPhrases: ['systems thinking', 'causal loop diagram', 'what is cld', 'feedback loop'],
    weight: 10,
    response: `**Systems Thinking Module — Understanding Root Causes**

This module moves beyond listing problems to mapping the **causal structures** that generate them.

**Causal Loop Diagram (CLD) Builder:**
1. **Add Nodes** — Click "+ Add Node" or double-click canvas. Name variables (e.g., "Investment Approvals", "BHB Certification Quality").
2. **Create Links** — Drag from one node to another. Set polarity:
   • **+ (same direction)** — A↑ → B↑ (reinforcing)
   • **– (opposite direction)** — A↑ → B↓ (balancing)
3. **Detect Loops** — Auto-detection of:
   • **R-loops** (Reinforcing / virtuous or vicious cycles)
   • **B-loops** (Balancing / stabilizing or goal-seeking)

**9 Systems Archetypes in BIRD:**
1. **Fixes that Fail** — Quick fixes create delayed worse problems
2. **Shifting the Burden** — Symptomatic solutions erode fundamental capacity
3. **Success to the Successful** — Winners get more resources; losers starve
4. **Growth & Underinvestment** — Growth outpaces supporting capacity
5. **Escalation** — Competitive dynamics spiral
6. **Big Man** — Patronage undermines institutional effectiveness
7. **Tragedy of the Commons** — Shared resources depleted by uncoordinated use
8. **Limits to Growth** — Growth hits invisible ceiling
9. **Eroding Goals** — Standards lowered to match poor performance

**Leverage Point Analysis:** After building your CLD, click **Analyze Leverage Points** to rank interventions using Meadows' L1–L12 framework.`,
  },
  {
    id: 'archetypes-detail',
    category: 'systems',
    triggers: ['archetype', 'fixes that fail', 'shifting the burden', 'success to the successful', 'growth underinvestment', 'big man', 'tragedy commons', 'escalation'],
    triggerPhrases: ['fixes that fail', 'shifting the burden', 'big man archetype', 'tragedy of the commons', 'growth and underinvestment'],
    weight: 9,
    response: `**BIRD Systems Archetypes — BARMM Context:**

| Archetype | BARMM Context | CLP Mapping |
|-----------|---------------|-------------|
| **Fixes that Fail** | Agricultural subsidy dependency suppresses market signals | LP1 |
| **Shifting the Burden** | Donor dependency undermines autonomous revenue generation | LP4 |
| **Success to the Successful** | Mainland vs. island province development disparity | LP2 |
| **Growth & Underinvestment** | Investment surge outpaces energy/skills/digital capacity | LP2 |
| **Escalation** | Rido/clan dynamics vs inter-provincial competition | LP3 |
| **Big Man** | Patronage politics undermines governance effectiveness | LP3 |
| **Tragedy of the Commons** | Fragmented watershed/fishery governance depletes resources | LP5 |

**How to apply:** Click **Apply Archetype** in the Systems Thinking module to load a template CLD. Rename nodes and adjust link delays to match your specific context.`,
  },
  {
    id: 'leverage-points',
    category: 'systems',
    triggers: ['leverage point', 'meadows', 'l1 l2', 'intervention', 'system intervention', 'transformative'],
    triggerPhrases: ['meadows leverage', 'leverage point', 'highest leverage', 'system intervention'],
    weight: 9,
    response: `**Meadows' 12 Leverage Points — BIRD Mapping**

Donella Meadows ranked interventions by transformative power (L1 = highest):

**L1–L3: Paradigm & Goals (Highest Leverage · Transformative)**
• L1 — Transcend paradigms: Shift from aid dependency to investment sovereignty
• L2 — Change mindset: From "poor region" to "halal gateway to ASEAN"
• L3 — Set system goals: Moral Governance as the organizing principle

**L4–L6: Information & Rules (Medium-High · Systemic)**
• L4 — Self-organization: MSME cluster development, innovation hubs
• L5 — Rules of the system: OIC/SMIIC standards, JMC 2026-01, CREATE MORE
• L6 — Information flows: BEGMP digital governance, open investment data

**L7–L12: Feedback & Parameters (Lower Leverage · Incremental)**
• L7–L9 — Feedback delays, buffers, stock-and-flow: Budget release cycles, inventory
• L10–L12 — Constants, parameters, numbers: Tax rates, subsidy levels, quotas

**BIRD Priority:** LP1 (Halal Certification) operates at L2–L3 (paradigm shift + goal change), which is why it is designated **Critical** leverage.`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. STRATEGY MATRIX (TOWS)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'tows-overview',
    category: 'strategy',
    triggers: ['tows', 'strategy matrix', 'so strategy', 'st strategy', 'wo strategy', 'wt strategy', 'strategic options'],
    triggerPhrases: ['tows matrix', 'strategy matrix', 'so strategy', 'st strategy', 'wo strategy', 'wt strategy'],
    weight: 10,
    response: `**Strategy Matrix — TOWS Framework**

The TOWS Matrix cross-references **Strengths/Weaknesses** with **Opportunities/Threats** to generate four strategy types:

| Quadrant | Meaning | Action Logic |
|----------|---------|--------------|
| **SO** | Strengths + Opportunities | *Use strengths to exploit opportunities* |
| **ST** | Strengths + Threats | *Use strengths to mitigate threats* |
| **WO** | Weaknesses + Opportunities | *Overcome weaknesses via opportunities* |
| **WT** | Weaknesses + Threats | *Minimize weaknesses and avoid threats* |

**7-Criteria Scoring:**
Each strategy is scored on:
1. Strategic fit
2. Resource feasibility
3. Time horizon
4. Risk level
5. Stakeholder impact
6. BEIE pillar alignment
7. CLP contribution

**How to generate strategies:**
1. Ensure SWOT is populated (min. 2 items per quadrant)
2. Click **+ Add Strategy** manually, or
3. Click **✨ Generate Strategies** to receive locally-curated options based on your SWOT data
4. Check ✓ to select strategies for BSC translation`,
  },
  {
    id: 'tows-examples',
    category: 'strategy',
    triggers: ['example strategy', 'strategy examples', 'halal tourism strategy', 'poverty strategy', 'bimp eaga strategy'],
    triggerPhrases: ['suggest so strategy', 'suggest st strategy', 'suggest wo strategy', 'suggest wt strategy', 'strategy example'],
    weight: 8,
    response: `**Sample TOWS Strategies for BARMM:**

**SO — Strengths + Opportunities**
• Leverage Islamic governance tradition + global halal demand → Establish BARMM as ASEAN halal certification hub
• Use BIMP-EAGA position + OIC market → Create cross-border halal trade corridor
• Young demographic + digital governance → Launch halal-tech startup incubator

**ST — Strengths + Threats**
• Rich marine biodiversity + climate change → Build climate-resilient aquaculture parks
• Moral governance tradition + political fragmentation → Institutionalize multi-party planning continuity agreements
• Natural resources + aid dependency → Shift from grant-funded projects to revenue-generating PPPs

**WO — Weaknesses + Opportunities**
• Low certification capacity + $2.3T halal market → Fast-track OIC/SMIIC auditor training (BSEMP)
• Weak connectivity + digital governance leapfrogging → Satellite broadband + e-governance for island provinces
• Skills mismatch + green sukuk demand → TVET-green finance dual certification programs

**WT — Weaknesses + Threats**
• Energy gap + climate vulnerability → Solar mini-grids + climate adaptation fund
• Fragmented land titling + investor caution → One-stop digital land registry (BEGMP)
• Low electrification + Malaysia competition → ZBIP acceleration + halal park captive power`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. BALANCED SCORECARD
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'bsc-overview',
    category: 'scorecard',
    triggers: ['balanced scorecard', 'bsc', 'four perspectives', 'objective', 'kpi', 'perspective', 'financial perspective', 'stakeholder perspective'],
    triggerPhrases: ['balanced scorecard', 'four perspectives', 'bsc perspective', 'what is bsc', 'bsc objective'],
    weight: 10,
    response: `**Balanced Scorecard — 4 Perspectives**

The BSC translates vision into measurable objectives. In BIRD, the perspectives are:

**1. 💰 Financial — "How do we look to funders and investors?"**
• F1: Investment approvals (target: ₱5B+ annually)
• F2: GRDP growth (target: 5%+ by 2030)
• F3: Export revenue (target: ₱40B via halal)
• F4: Green economy revenue (REDD+, PES, carbon)

**2. 👥 Stakeholder — "How do communities and investors see us?"**
• S1: Poverty reduction (34.8% → <20% by 2035)
• S2: Investor satisfaction index
• S3: MSME empowerment (5,000+ halal-certified)
• S4: Job creation (target: 200,000+ new jobs)

**3. ⚙️ Internal Process — "What processes must we excel at?"**
• P1: Business registration time (target: <3 days)
• P2: Halal certification turnaround (target: <30 days)
• P3: Infrastructure delivery rate
• P4: BICC dispute resolution time

**4. 🌱 Learning & Growth — "How can we sustain improvement?"**
• L1: Functional literacy rate
• L2: Halal expertise pool (auditors, chemists, Shariah scholars)
• L3: Digital innovation index
• L4: IPA (Investment Promotion Agency) capacity score

**Causal Chain:** Learning & Growth → Internal Process → Stakeholder → Financial`,
  },
  {
    id: 'kpi-status',
    category: 'scorecard',
    triggers: ['kpi status', 'on track', 'at risk', 'delayed', 'status badge', 'kpi alert', 'track progress'],
    triggerPhrases: ['kpi status', 'on track', 'at risk', 'delayed kpi', 'status definitions'],
    weight: 8,
    response: `**KPI Status Definitions & Automated Alerts**

| Status | Threshold | Color | Action |
|--------|-----------|-------|--------|
| **On Track** | ≥70% progress | 🟢 Green | Continue monitoring |
| **At Risk** | 40–69% progress | 🟡 Amber | Review resources & timeline |
| **Delayed** | <40% progress | 🔴 Red | Escalate to leadership; revise PAP |
| **Completed** | 100%+ target | 🔵 Blue | Archive; lessons learned capture |

**Alert Triggers:**
• KPI drops from On Track → At Risk (email + in-app)
• KPI in Delayed for 2 consecutive reporting periods
• Budget utilization >90% with <50% physical progress
• PAP status "Delayed" with no update for 30 days

**View Modes:**
• **Command View** — Full detail for plan owners
• **Executive View** — Pareto vital few only (top 6 KPIs)
• **Public View** — Sanitized, citizen-facing progress`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. PAPs MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'paps-overview',
    category: 'paps',
    triggers: ['pap', 'program activity project', 'execution', 'budget tracking', 'kanban', 'beie cluster'],
    triggerPhrases: ['paps management', 'program activity project', 'how to add pap', 'beie cluster'],
    weight: 10,
    response: `**PAPs Management — Strategic Execution Layer**

PAPs = **Programs, Activities, Projects** — the operational engine of BIRD.

**How to add a PAP:**
1. Navigate to **PAPs Management**
2. Click **+ Add PAP** (top-right)
3. Fill: Name, Type (Program / Activity / Project), Description
4. Link to a **BSC Objective** (creates causal traceability)
5. Set: Budget estimate (₱PHP), Duration (months)
6. Assign **BEIE Cluster**:
   • **Foundations** — Governance, certification, baseline data
   • **Transformers** — Halal industry, Islamic finance, green economy
   • **Enablers** — Skills, R&D, digital infrastructure
   • **Connectors** — Transport, energy, broadband, BIMP-EAGA
   • **Financiers** — Investment promotion, capital markets, PPP
7. Set **BIRD Phase** (1, 2, or 3)
8. Assign Lead & Support Agencies → Save

**Kanban Status:** Planned → In Progress → Completed → Delayed

**Budget Summary (Auto-computed):**
• By PAP type | By BEIE cluster | By BIRD phase
• Green bar: <90% utilization
• Amber bar: 90–100%
• Red glow: >100% (over budget)`,
  },
  {
    id: 'zbip',
    category: 'paps',
    triggers: ['zbip', 'zamboanga basilan', 'power', 'energy', 'electrification', 'solar', 'mini grid'],
    triggerPhrases: ['what is zbip', 'zamboanga basilan integrated power', 'energy project'],
    weight: 8,
    response: `**ZBIP — Zamboanga-Basilan Integrated Power Project**

• **Budget:** ₱6.67B
• **Strategic Criticality:** HIGH — addresses LP2 (Infrastructure–Energy–Connectivity Nexus)
• **Objective:** Close the electrification gap (~75% → 100% by 2035)
• **Components:**
  – Baseload power generation for Basilan and adjacent islands
  – Grid interconnection to mainland Mindanao
  – Anchor for Bangsamoro Halal Park (captive power)

**Why ZBIP is a leverage point:**
Without reliable energy, halal certification labs cannot operate 24/7, cold chains for halal food exports fail, and digital governance (BEGMP) cannot function. ZBIP is the **enabling precondition** for Pillar 1 (Halal) and Pillar 2 (Governance).`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. MEL DASHBOARD
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'mel-overview',
    category: 'mel',
    triggers: ['mel', 'monitoring evaluation learning', 'dashboard', 'command center', 'kpi dashboard', 'pareto'],
    triggerPhrases: ['mel dashboard', 'monitoring evaluation', 'command center', 'kpi dashboard'],
    weight: 10,
    response: `**MEL Dashboard — Your Real-Time Command Center**

The MEL (Monitoring, Evaluation & Learning) Dashboard is the **default landing view** for every strategic plan workspace.

**Panel A — Pareto Vital Few KPIs:**
• 6 headline KPIs from the BIRD BSC
• Ring progress charts: current vs. target
• Status badges: On Track 🟢 | Watch 🔵 | Behind 🟡 | Critical 🔴

**Panel B — BSC Leverage Points:**
• LP1–LP5 across 4 BSC perspectives
• Animated progress bars + status badges

**Panel C — Priority Action Plan:**
• 10 priority actions for 2026 (Foundation Phase)
• Filters: Priority (Critical / High / Medium), Status, Quarter (Q1–Q4)

**Panel D — Phase Progress Tracker:**
• Timeline view of all 3 BIRD phases
• Budget allocation visualization

**Hero Banner:**
• Headline metrics (total budget, current phase, 2035 targets)
• Gold **"Participate in Validation Survey"** button → opens survey portal

**3 View Modes:**
1. **Command** — Full detail for plan owners & admins
2. **Executive** — Pareto vital few only (board-ready)
3. **Public** — Sanitized, citizen-facing progress`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. NAVIGATION & PLATFORM
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'navigation-help',
    category: 'navigation',
    triggers: ['how to', 'sidebar', 'topbar', 'menu', 'navigate', 'where is', 'find', 'search', 'settings', 'theme'],
    triggerPhrases: ['how to navigate', 'where is', 'how do i', 'how to use', 'platform layout'],
    weight: 8,
    response: `**Platform Navigation Quick Guide**

**Sidebar (left):**
• MEL Dashboard — Default view, KPI command center
• SWOT Analysis — 4-quadrant diagnostic
• Systems Thinking — CLD builder & archetypes
• Strategy Matrix — TOWS formulation
• Balanced Scorecard — Objectives & KPIs
• PAPs Management — Execution tracking
• Templates Library — Pre-built plan structures
• Team Collaboration — Invite members, share plans
• Plan Generator — Export reports
• Settings — Profile, theme, notifications, data management

**Top Bar:**
• 📁 Plan Selector — Switch plans or create new
• 🔎 Search — Find SWOT items, strategies, KPIs, PAPs
• ✅ Survey Button (gold) — Opens Validation Survey
• ☀️/🌙 Theme Toggle — Dark / Light / System
• ☁️ Sync Status — Green = synced; Amber = offline (local save active)
• 👤 Account — Profile, admin dashboard, sign out

**Keyboard Shortcuts:**
• Collapse sidebar: ← button (desktop)
• Mobile menu: ≡ hamburger
• Print manual: Ctrl+P (on user-manual.html)`,
  },
  {
    id: 'validation-survey',
    category: 'navigation',
    triggers: ['validation survey', 'stakeholder survey', 'survey', 'participate', 'feedback', 'have your say'],
    triggerPhrases: ['validation survey', 'stakeholder survey', 'participate in survey', 'bird survey'],
    weight: 9,
    response: `**BIRD Validation Survey — Have Your Say**

The Validation Survey is a **standalone portal** where stakeholders review and validate the draft roadmap before finalization.

**Who should participate:**
• Government agencies | Private sector | Academe | Civil society | Development partners

**How to access:**
1. Sidebar — Gold **Validation Survey** button (with NEW badge)
2. Top Bar — Gold **Survey** button (clipboard icon)
3. MEL Dashboard — **"Participate in Validation Survey"** hero banner
4. Direct: bird-validation-survey.bolt.host

**What you'll do (15–20 minutes):**
• Pick your stakeholder group (survey adapts questions)
• Rate statements on 1–5 scales
• Rank programs and leverage points
• Allocate priority points
• Share open feedback

**Privacy:** Anonymous by default. DPA 2012 compliant. Only the consent checkbox is required.`,
  },
  {
    id: 'export-formats',
    category: 'export',
    triggers: ['export', 'pdf', 'word', 'excel', 'download plan', 'print plan', 'report'],
    triggerPhrases: ['export plan', 'download pdf', 'export word', 'export excel', 'generate report'],
    weight: 8,
    response: `**Plan Export — Professional Document Generation**

Navigate to **Plan Generator** (Export) to generate board-ready strategic plans.

| Format | Best For | Extension |
|--------|----------|-----------|
| **PDF** | Board presentations, formal distribution | .pdf |
| **Word** | Collaborative editing, stakeholder review | .docx |
| **Excel** | Data analysis, budget tracking, KPI tables | .xlsx |

**How to export:**
1. Go to Plan Generator → Select format
2. Choose sections to include (SWOT, CLDs, Strategies, BSC, PAPs, Archetypes)
3. Click **Generate** — download starts automatically

**JSON Backup (Settings → Data Management):**
• Export all plan data as JSON for backup/restore
• Import previously exported JSON to recover a plan`,
  },
  {
    id: 'templates-library',
    category: 'templates',
    triggers: ['template', 'pre built', 'plan template', 'sample plan', 'official sample', 'reuse'],
    triggerPhrases: ['templates library', 'plan template', 'sample plan', 'use template'],
    weight: 7,
    response: `**Templates Library — Start Faster**

Browse pre-built strategic frameworks by category:
• **Investment Plan** — Full BIRD-aligned investment roadmap
• **Sector Plan** — Halal, Islamic finance, infrastructure, green economy
• **Monitoring Framework** — MEL-only template for tracking existing plans

**How to use:**
1. Navigate to Templates Library
2. Click a template card to preview (SWOT, strategies, objectives, PAPs)
3. Click **"Use Template"** — applies structure to a new plan
4. Customize content for your specific context

**Creating Custom Templates (Admin/Owner only):**
• Save current plan as template
• Visibility: Private / Organization / Public (subject to approval)`,
  },
  {
    id: 'collaboration-roles',
    category: 'collaboration',
    triggers: ['team', 'collaborate', 'invite', 'role', 'permission', 'share plan', 'viewer', 'editor', 'admin'],
    triggerPhrases: ['team collaboration', 'share plan', 'invite member', 'role permission', 'viewer editor'],
    weight: 7,
    response: `**Team Collaboration — Roles & Permissions**

| Role | Create | Edit | Invite | Delete |
|------|--------|------|--------|--------|
| **Owner** | ✓ | ✓ | ✓ | ✓ |
| **Admin** | ✓ | ✓ | ✓ | — |
| **Editor** | — | ✓ | — | — |
| **Viewer** | — | — | — | — |

**Sharing a Plan (Public View):**
1. Open Share Dialog from plan workspace
2. Click **Generate Share Link** — creates unique URL
3. Copy and send — recipients view without an account
4. Click **Revoke Link** to cancel access

**Real-Time Features:**
• Presence indicators (who's online)
• Activity timeline / audit log
• Shared learning resources`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 10. TROUBLESHOOTING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'troubleshoot-loading',
    category: 'troubleshooting',
    triggers: ["won't load", 'not loading', 'blank screen', 'platform broken', 'cache', 'browser'],
    triggerPhrases: ["platform won't load", 'not loading', 'blank page', 'white screen'],
    weight: 7,
    response: `**Troubleshooting: Platform Won't Load**

1. **Clear browser cache** — Ctrl+Shift+Del (Windows) or Cmd+Shift+Delete (Mac)
2. **Try a different browser** — Chrome 100+, Firefox 100+, Safari 16+, Edge 100+
3. **Check internet connection** — Required for cloud sync & validation survey
4. **Disable extensions** — Especially ad blockers (may block Supabase realtime)
5. **Hard refresh** — Ctrl+F5 or Cmd+Shift+R

**Minimum Requirements:**
• Screen: 1024×768 (1280×800+ recommended)
• Mobile: iOS 15+ / Android 10+ (PWA installable)`,
  },
  {
    id: 'troubleshoot-signin',
    category: 'troubleshooting',
    triggers: ["can't sign in", 'login failed', 'forgot password', 'session expired', 'verify email', 'magic link'],
    triggerPhrases: ["can't sign in", 'login failed', 'session expired', 'forgot password'],
    weight: 7,
    response: `**Troubleshooting: Sign-In Issues**

1. **Check email verification** — Look for verification link in inbox/spam
2. **Reset password** — Click "Forgot password?" on sign-in form
3. **Magic Link** — Enter email → "Send magic link to my email" (password-free)
4. **Session expired** — Re-authenticate; your data is preserved locally
5. **Account locked** — Contact BOI-MTIT at boi@bangsamoro.gov.ph

**Note:** If offline, changes are saved to localStorage and sync when you reconnect.`,
  },
  {
    id: 'troubleshoot-sync',
    category: 'troubleshooting',
    triggers: ['not saving', 'sync issue', 'offline', 'cloud connected', 'force sync', 'data lost'],
    triggerPhrases: ['plans not saving', 'sync issues', 'offline mode', 'force sync'],
    weight: 7,
    response: `**Troubleshooting: Sync & Data Issues**

1. **Check sync status** — Topbar indicator: Green = synced | Amber = offline
2. **Offline mode** — Changes save to localStorage automatically; sync on reconnect
3. **Force Sync** — Settings → Data Management → Force Sync
4. **Export backup** — Settings → Data Management → Export Plan Data (JSON)
5. **Import restore** — Settings → Data Management → Import Plan Data

**Your data is never lost** — The app uses offline-first architecture. Even if the Supabase backend is unreachable, all plan mutations persist in browser localStorage and sync when connectivity returns.`,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 11. FALLBACK / GREETING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'greeting',
    category: 'overview',
    triggers: ['hello', 'hi', 'hey', 'salam', 'as salamu', 'welcome', 'who are you'],
    triggerPhrases: ['hello', 'hi there', 'who are you', 'what can you do'],
    weight: 5,
    response: `As-salamu alaykum! I'm the **BIRD Local Intelligence Engine** — your offline-capable strategy consultant for the Bangsamoro Investment Roadmap 2026–2035.

I can help you with:
• **Strategic Analysis** — SWOT scoring, TOWS formulation, BSC design
• **Systems Thinking** — Causal loops, archetypes, leverage points
• **BARMM Context** — Economic data, provincial profiles, halal sector insights
• **Platform Guidance** — How to use every module, export plans, manage teams
• **Formula Calculations** — Compute RI, Risk, VI instantly
• **Troubleshooting** — Sync issues, sign-in problems, export failures

What would you like to explore? Try asking about:
• "What is the BEIE Framework?"
• "Calculate RI for impact 4, likelihood 3"
• "Explain the Fixes that Fail archetype"
• "How do I export my plan to PDF?"`,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// RESPONSE ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

const FALLBACK_RESPONSE = `I'm not sure I understood that perfectly. Here are some things I can help with:

• Explain the BEIE Framework, 4 Pillars, or 5 Critical Leverage Points
• Calculate BIRD scores (Resilience Index, Risk, Vulnerability Index)
• Guide you through SWOT, TOWS, BSC, or PAPs modules
• Describe Systems Archetypes and Causal Loop Diagrams
• Share BARMM economic data and provincial profiles
• Help with platform navigation, export, or troubleshooting

What would you like to know?`;

export function generateLocalResponse(ctx: ResponseContext): string {
  const { query, activeView } = ctx;
  if (!query.trim()) return '';

  // Score all entries
  const scored = KB.map((entry) => ({
    entry,
    score: scoreEntry(query, entry, activeView),
  }));

  // Sort descending
  scored.sort((a, b) => b.score - a.score);

  // If top score is too low, return fallback
  if (scored[0].score < 8) {
    return FALLBACK_RESPONSE;
  }

  // Take top match (or blend top 2 if scores are close)
  const top = scored[0];
  const runnerUp = scored[1];
  let response: string;

  if (runnerUp && runnerUp.score > top.score * 0.85 && runnerUp.entry.category !== top.entry.category) {
    const r1 = typeof top.entry.response === 'function' ? top.entry.response(ctx) : top.entry.response;
    const r2 = typeof runnerUp.entry.response === 'function' ? runnerUp.entry.response(ctx) : runnerUp.entry.response;
    response = `${r1}\n\n**Also relevant:**\n${r2}`;
  } else {
    response = typeof top.entry.response === 'function' ? top.entry.response(ctx) : top.entry.response;
  }

  // Append plan context if available
  if (ctx.plan) {
    const p = ctx.plan;
    const planCtx = `\n\n—\n*Context: You're working on **${p.name}** (${p.organization}) — ${p.planningPeriodStart?.slice(0,4) || '2026'}–${p.planningPeriodEnd?.slice(0,4) || '2035'}.*`;
    response += planCtx;
  }

  return response;
}

/** Synchronous check to determine if a query is a calculation request */
export function isCalculationQuery(query: string): boolean {
  const q = normalize(query);
  return (
    /\b(calculate|compute|what is|find)\b/.test(q) &&
    /\b(impact|likelihood|ri|risk|vi|score|index)\b/.test(q) &&
    /\b[1-5]\b/.test(q)
  );
}

/** Export the knowledge base for inspection / extension */
export { KB as knowledgeBase };
export type { KnowledgeEntry, ResponseContext, KnowledgeCategory };