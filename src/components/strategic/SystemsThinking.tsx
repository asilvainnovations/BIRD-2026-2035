import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Shield,
  AlertCircle,
  Lightbulb,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Info,
  ChevronRight,
  Check,
  HelpCircle,
  GitBranch,
  Plus,
  Circle,
  ExternalLink,
  X,
  Link as LinkIcon,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Layers,
  Wand2,
  LayoutDashboard,
  PlayCircle,
  BookOpen,
  RefreshCw,
  MousePointerClick,
  Target,
  Crosshair,
  Gauge,
  Workflow,
  Brain,
  Anchor,
  Clock,
  Activity,
  BarChart2,
  Save,
  Download,
  Upload,
  FileText,
  Printer,
  Copy,
  Trash2,
  Eye,
  Bot,
} from 'lucide-react';

// Import your actual hook
import { useStrategicPlan } from '@/hooks/useStrategicPlan';

import { StrategicPlan, SWOTItem, CLDNode, CLDLink, CLDSnapshot } from '@/lib/strategicPlanStore';
import { cn } from '@/lib/utils';
import { BIRD_VIDEOS, BIRD_IMAGES, getImagesForSection, getVideosForSection } from '@/lib/bird-urls';
import { AIStrategistAvatar } from '@/components/branding/Logo';
import FloatingAIAssistant from './FloatingAIAssistant';


// ═══════════════════════════════════════════════════════════════════════════════
// BIRD 2026-2035 · VALIDATION SURVEY EVIDENCE (inlined, no external module)
// ═══════════════════════════════════════════════════════════════════════════════
// Source: Supabase `survey_responses` (BIRD_2026-2035). 76 consented responses,
// fielded 3-20 August 2026.
//
// SAMPLING CAVEAT: non-probability convenience sample, no weighting frame.
// Validation signals, NOT population estimates. Basilan, Sulu and Tawi-Tawi
// returned ZERO respondents; ~78% of the sample sits in the Cotabato City /
// Maguindanao del Norte mainland corridor.
// -----------------------------------------------------------------------------

/**
 * Archetype validation — survey Sections 3-11. Respondents were shown each
 * archetype as it appears in this component and asked how accurately it
 * describes BARMM. Ordinal answers scored: Very accurately 4, Accurately 3,
 * Somewhat accurately 2, Needs revision 1, Not accurate 0.
 *
 * `archetypeId` maps to the SYSTEM_ARCHETYPES ids already defined below.
 * Entries with a null archetypeId are the two standalone CLDs from Chapter 3-B.
 */
const ARCHETYPE_VALIDATION: Array<{
  archetypeId: string | null;
  field: string;
  label: string;
  meanScore: number;   // 0-4
  pctAccurate: number; // % answering "Accurately" or better
  pctRevision: number; // % answering "Needs revision" or worse
  n: number;
}> = [
  { archetypeId: null,  field: 'q3_cld1_investment_development', label: 'R1 Investment-Development Cycle', meanScore: 3.28, pctAccurate: 65.6, pctRevision: 3.1, n: 64 },
  { archetypeId: null,  field: 'q9_arch_big_man',                label: 'Big Man / Patronage Dynamic',      meanScore: 3.22, pctAccurate: 62.3, pctRevision: 1.4, n: 69 },
  { archetypeId: 'toc', field: 'q4_arch_tragedy_commons',        label: 'Tragedy of the Commons',           meanScore: 3.08, pctAccurate: 54.9, pctRevision: 1.4, n: 71 },
  { archetypeId: null,  field: 'q3_cld2_governance_confidence',  label: 'R2 Governance-Investor Confidence', meanScore: 3.00, pctAccurate: 55.2, pctRevision: 9.0, n: 67 },
  { archetypeId: null,  field: 'q5_arch_growth_underinvest',     label: 'Growth and Underinvestment',       meanScore: 2.97, pctAccurate: 50.8, pctRevision: 4.8, n: 63 },
  { archetypeId: null,  field: 'q11_arch_drifting_goals',        label: 'Drifting Goals',                   meanScore: 2.92, pctAccurate: 46.5, pctRevision: 1.4, n: 71 },
  { archetypeId: 'ltg', field: 'q6_arch_limits_growth',          label: 'Limits to Success',                meanScore: 2.91, pctAccurate: 45.9, pctRevision: 1.4, n: 74 },
  { archetypeId: 'esc', field: 'q9_arch_escalation',             label: 'Escalation',                       meanScore: 2.88, pctAccurate: 46.6, pctRevision: 4.1, n: 73 },
  { archetypeId: 'sts', field: 'q7_arch_success_successful',     label: 'Success to the Successful',        meanScore: 2.75, pctAccurate: 38.9, pctRevision: 1.4, n: 72 },
  { archetypeId: 'ftf', field: 'q9_arch_fixes_fail',             label: 'Fixes that Fail',                  meanScore: 2.68, pctAccurate: 37.0, pctRevision: 4.1, n: 73 },
  { archetypeId: 'stb', field: 'q8_arch_shifting_burden',        label: 'Shifting the Burden',              meanScore: 2.50, pctAccurate: 27.9, pctRevision: 4.4, n: 68 },
];

/** Where stakeholders located each dynamic — survey follow-up questions. */
const SYSTEMS_SIGNALS = {
  moralGovernanceLever: [
    { label: 'Transparency',   n: 42 },
    { label: 'Islamic ethics', n: 18 },
    { label: 'Accountability', n:  7 },
    { label: 'Efficiency',     n:  6 },
  ],
  connectivityPriority: [
    { label: 'Physical pipelines (roads, ports)',        n: 43 },
    { label: 'Market-access assets (cold chain, logistics)', n: 24 },
    { label: 'Digital backbones (broadband, e-gov)',     n:  6 },
  ],
  clusterReadiness: [
    { label: 'Foundations',       confidence: 3.69, readiness: 3.45, urgency: 3.70, n: 73 },
    { label: 'Transformers',      confidence: 3.60, readiness: 3.40, urgency: 3.69, n: 65 },
    { label: 'Enablers',          confidence: 3.70, readiness: 3.33, urgency: 4.04, n: 73 },
    { label: 'Connectors',        confidence: 3.86, readiness: 3.61, urgency: 3.94, n: 71 },
    { label: 'Financiers',        confidence: 3.78, readiness: 3.55, urgency: 3.88, n: 67 },
    { label: 'Operating Systems', confidence: 3.85, readiness: 3.58, urgency: 3.93, n: 71 },
  ],
  n: 76,
  window: '3-20 August 2026',
  silentProvinces: ['Basilan', 'Sulu', 'Tawi-Tawi'],
} as const;

/**
 * 55 SWOT factors carrying REAL respondent means (item n = 63-74). Used when
 * the plan carries no SWOT items of its own, so the scoring, archetype
 * recommendation and CLD-seeding logic below operate on real evidence.
 */
const BIRD_SWOT_BASELINE: SWOTItem[] = [
  { id: 'bird-q4-s4-seaweed-dominance', category: 'strength', description: 'Tawi-Tawi\'s Global Seaweed Dominance — Tawi-Tawi produces 40% of the Philippines\' seaweed output, providing a massive, ready-made resource base for industrial carrageenan processing.', impactScore: 4.36, likelihoodScore: 4.19, aiGenerated: false, leveragePoint: 'LP5', beieCluster: 'foundations' },
  { id: 'bird-q4-s1-aff-base', category: 'strength', description: 'Strong AFF Base — BARMM has strong resources in rubber, coconut, seaweed, fisheries, halal farm products, and rice.', impactScore: 4.38, likelihoodScore: 4.13, aiGenerated: false, leveragePoint: 'LP5', beieCluster: 'foundations' },
  { id: 'bird-q5-s4-cultural-heritage', category: 'strength', description: 'Rich Cultural Heritage — Maranao, Yakan, and Tausug heritage as assets for creative/tourism industries.', impactScore: 4.23, likelihoodScore: 4.13, aiGenerated: false, leveragePoint: 'LP1', beieCluster: 'transformers' },
  { id: 'bird-q9-s2-peace-dividend', category: 'strength', description: 'Peace Dividend Momentum — Basilan ASG-free declaration (2024) and stabilized security in select zones.', impactScore: 4.25, likelihoodScore: 4.01, aiGenerated: false, leveragePoint: 'LP3', beieCluster: 'cross-cutting' },
  { id: 'bird-q7-s1-bimpeaga-location', category: 'strength', description: 'Strategic Location (BIMP-EAGA) — Proximity to Sabah and ASEAN trade corridors.', impactScore: 4.19, likelihoodScore: 4.05, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'connectors' },
  { id: 'bird-q9-s1-policy-recognition', category: 'strength', description: 'Growing Policy Recognition — Institutional mandates via BOL, BIC, SIPP, and BHIDP.', impactScore: 4.18, likelihoodScore: 4.0, aiGenerated: false, leveragePoint: 'LP3', beieCluster: 'cross-cutting' },
  { id: 'bird-q5-s3-polloc-freeport', category: 'strength', description: 'Polloc Freeport & Economic Zone — Strategic logistics hub and trade gateway in Maguindanao del Norte.', impactScore: 4.22, likelihoodScore: 3.93, aiGenerated: false, leveragePoint: 'LP1', beieCluster: 'transformers' },
  { id: 'bird-q6-s1-youth-pop', category: 'strength', description: 'Young, Growing Population — Demographic dividend with 3.43% annual growth (highest in PH).', impactScore: 4.11, likelihoodScore: 4.0, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q5-s2-domestic-demand', category: 'strength', description: 'Domestic Halal Demand — 5.69M Muslim consumer base driving local market absorption.', impactScore: 4.07, likelihoodScore: 4.03, aiGenerated: false, leveragePoint: 'LP1', beieCluster: 'transformers' },
  { id: 'bird-q5-s1-halal-legitimacy', category: 'strength', description: 'Halal Legitimacy & Cultural Credibility — Authentic Muslim-majority identity providing unmatched authenticity for halal branding.', impactScore: 4.01, likelihoodScore: 3.97, aiGenerated: false, leveragePoint: 'LP1', beieCluster: 'transformers' },
  { id: 'bird-q8-s1-islamic-finance-framework', category: 'strength', description: 'Islamic Finance Legal Framework — RA 11439 enabling Shariah-compliant capital mobilization.', impactScore: 4.01, likelihoodScore: 3.94, aiGenerated: false, leveragePoint: 'LP4', beieCluster: 'financiers' },
  { id: 'bird-q4-s3-lake-lanao', category: 'strength', description: 'Lake Lanao — Multi-purpose resource for freshwater supply, hydroelectric power, and eco-tourism opportunities in Lanao del Sur.', impactScore: 3.94, likelihoodScore: 3.93, aiGenerated: false, leveragePoint: 'LP5', beieCluster: 'foundations' },
  { id: 'bird-q4-s2-renewable-energy', category: 'strength', description: 'Renewable Energy Endowments — BARMM has untapped hydro (Lake Lanao), solar, and biomass energy potential.', impactScore: 4.0, likelihoodScore: 3.84, aiGenerated: false, leveragePoint: 'LP5', beieCluster: 'foundations' },
  { id: 'bird-q6-s2-lanao-growth', category: 'strength', description: 'Lanao del Sur\'s Growth Momentum — Currently BARMM\'s fastest-growing provincial economy (5.02% in 2023).', impactScore: 3.93, likelihoodScore: 3.84, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q6-w3-literacy', category: 'weakness', description: 'Lowest Functional Literacy Rate — 59.3%, creating a severe human capital constraint.', impactScore: 4.31, likelihoodScore: 4.12, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q6-w4-malnutrition', category: 'weakness', description: 'Severe Child Malnutrition — 45% stunting rate among children under five.', impactScore: 4.28, likelihoodScore: 4.03, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q6-w1-infra-deficits', category: 'weakness', description: 'Critical Infrastructure Deficits — Energy, transport, digital, and water gaps.', impactScore: 4.26, likelihoodScore: 3.97, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q6-w2-poverty', category: 'weakness', description: 'Highest Poverty Incidence — 34.8% limiting domestic market depth and purchasing power.', impactScore: 4.15, likelihoodScore: 3.97, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q6-w5-skills-mismatch', category: 'weakness', description: 'Skills Mismatch — TVIs not fully aligned with emerging industry needs (e.g., halal manufacturing).', impactScore: 4.15, likelihoodScore: 3.96, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q9-w2-underspending', category: 'weakness', description: 'Underspending in Budget Execution — Delays in development program rollout; absorptive capacity challenge. (Moved here from Enablers — official BEIE Attribution is OS: Moral Governance, not Enablers.)', impactScore: 4.06, likelihoodScore: 4.03, aiGenerated: false, leveragePoint: 'LP3', beieCluster: 'cross-cutting' },
  { id: 'bird-q6-w6-tech-adoption', category: 'weakness', description: 'Low Technology Adoption — Slow uptake of modern farming and processing technologies.', impactScore: 4.05, likelihoodScore: 3.96, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q5-w2-cold-chain', category: 'weakness', description: 'Limited Agro-Processing/Cold Chain — High post-harvest losses (20–40%) constraining value addition.', impactScore: 4.15, likelihoodScore: 3.83, aiGenerated: false, leveragePoint: 'LP1', beieCluster: 'transformers' },
  { id: 'bird-q5-w3-market-linkages', category: 'weakness', description: 'Weak Market Linkages — Limited access to buyers and price information for producers.', impactScore: 4.06, likelihoodScore: 3.89, aiGenerated: false, leveragePoint: 'LP1', beieCluster: 'transformers' },
  { id: 'bird-q4-w1-land-tenure', category: 'weakness', description: 'Complex Land Tenure (SGA) — The Special Geographic Area faces a difficult overlay of Ancestral Domain (CADT), private titles, and public land, creating friction for large-scale agro-industrial parks.', impactScore: 3.95, likelihoodScore: 3.87, aiGenerated: false, leveragePoint: 'LP5', beieCluster: 'foundations' },
  { id: 'bird-q8-w1-financial-penetration', category: 'weakness', description: 'Minimal Formal Financial Penetration — Capital access barriers for MSMEs, especially in rural/island areas.', impactScore: 3.94, likelihoodScore: 3.85, aiGenerated: false, leveragePoint: 'LP4', beieCluster: 'financiers' },
  { id: 'bird-q5-w1-halal-cert', category: 'weakness', description: 'Weak Halal Certification System — Resource-constrained BHB with limited international recognition.', impactScore: 3.96, likelihoodScore: 3.83, aiGenerated: false, leveragePoint: 'LP1', beieCluster: 'transformers' },
  { id: 'bird-q9-w1-fragmented-policy', category: 'weakness', description: 'Fragmented Policy Frameworks — Governance coordination gaps and underspending in budget execution.', impactScore: 3.93, likelihoodScore: 3.82, aiGenerated: false, leveragePoint: 'LP3', beieCluster: 'cross-cutting' },
  { id: 'bird-q6-w7-fragmented-data', category: 'weakness', description: 'Fragmented Data Systems — Agencies often use incompatible databases, leading to a siloed view that causes delayed procurement and slow certification cycles.', impactScore: 3.92, likelihoodScore: 3.82, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q4-o1-renewable-invest', category: 'opportunity', description: 'Renewable Energy Investments — Growing interest in solar farms, hydro rehabilitation, and biomass projects aligning with BARMM\'s clean energy potential.', impactScore: 4.16, likelihoodScore: 4.13, aiGenerated: false, leveragePoint: 'LP5', beieCluster: 'foundations' },
  { id: 'bird-q7-o1-global-halal', category: 'opportunity', description: 'Global Halal Market — USD 2.3 trillion market with growing demand.', impactScore: 4.19, likelihoodScore: 4.08, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'connectors' },
  { id: 'bird-q6-o2-digital-leapfrog', category: 'opportunity', description: 'Digital Leapfrogging (BIFOSS) — Implementing the Bangsamoro Investment Facilitation One-Stop Shop for 1-day business registration.', impactScore: 4.17, likelihoodScore: 4.05, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q7-o3-bimpeaga-integration', category: 'opportunity', description: 'BIMP-EAGA Regional Integration — Cross-border trade facilitation and eco-corridors.', impactScore: 4.12, likelihoodScore: 4.04, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'connectors' },
  { id: 'bird-q7-o2-asean-halal', category: 'opportunity', description: 'ASEAN Halal Economy — USD 1.38 trillion addressable market; target to capture 30% share.', impactScore: 4.18, likelihoodScore: 3.94, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'connectors' },
  { id: 'bird-q9-o2-climate-adaptation-finance', category: 'opportunity', description: 'Climate Adaptation Finance — Tawi-Tawi can leverage a $10 million Adaptation Fund synergy to boost the climate resiliency of coastal communities.', impactScore: 4.15, likelihoodScore: 3.93, aiGenerated: false, leveragePoint: 'LP3', beieCluster: 'cross-cutting' },
  { id: 'bird-q7-o5-landbridge', category: 'opportunity', description: 'Mindanao Central Logistics Land-Bridge — SGA serves as the primary land bridge connecting Polloc Freeport to General Santos and Davao export gateways.', impactScore: 4.11, likelihoodScore: 3.93, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'connectors' },
  { id: 'bird-q8-o1-islamic-ecosystem', category: 'opportunity', description: 'Islamic Finance Ecosystem — Growing global Shariah-compliant capital pool seeking ethical investments.', impactScore: 4.04, likelihoodScore: 3.96, aiGenerated: false, leveragePoint: 'LP4', beieCluster: 'financiers' },
  { id: 'bird-q4-o3-pes', category: 'opportunity', description: 'Payment for Ecosystem Services (PES) — LGUs can earn income by protecting watersheds, coastlines, and mangroves — turning conservation into a revenue source.', impactScore: 4.09, likelihoodScore: 3.89, aiGenerated: false, leveragePoint: 'LP5', beieCluster: 'foundations' },
  { id: 'bird-q4-o4-forestry-code', category: 'opportunity', description: 'Bangsamoro Forestry Code — Pending legislation could open sustainable timber, non-timber forest products (NTFPs), and forest nursery investments.', impactScore: 4.0, likelihoodScore: 3.94, aiGenerated: false, leveragePoint: 'LP5', beieCluster: 'foundations' },
  { id: 'bird-q6-o1-tourism-recovery', category: 'opportunity', description: 'Tourism Recovery — Isabela City Tourism Champion (2024) and Lake Lanao eco-tourism potential.', impactScore: 3.92, likelihoodScore: 3.93, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q7-o4-uae-corridor', category: 'opportunity', description: 'UAE/GCC Halal Export Corridor — MAFAR-Prime Group partnership opening Middle Eastern markets.', impactScore: 4.08, likelihoodScore: 3.77, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'connectors' },
  { id: 'bird-q9-o1-postconflict', category: 'opportunity', description: 'Post-Conflict Reconstruction — Marawi MAA commercial redevelopment and normalization.', impactScore: 3.93, likelihoodScore: 3.86, aiGenerated: false, leveragePoint: 'LP3', beieCluster: 'cross-cutting' },
  { id: 'bird-q4-o2-carbon-markets', category: 'opportunity', description: 'Carbon Markets & REDD+ — BARMM\'s forests and carbon stocks can be monetized through carbon credits, creating new revenue for communities and LGUs.', impactScore: 3.77, likelihoodScore: 3.59, aiGenerated: false, leveragePoint: 'LP5', beieCluster: 'foundations' },
  { id: 'bird-q9-t3-security-incidents', category: 'threat', description: 'Residual Security Incidents — Rido, remnant armed groups, and investor perception risks.', impactScore: 4.22, likelihoodScore: 4.12, aiGenerated: false, leveragePoint: 'LP3', beieCluster: 'cross-cutting' },
  { id: 'bird-q9-t1-climate-change', category: 'threat', description: 'Climate Change Vulnerabilities — El Niño, flooding, and shifting rainfall patterns (4.2% AFF contraction in 2024).', impactScore: 4.25, likelihoodScore: 4.01, aiGenerated: false, leveragePoint: 'LP3', beieCluster: 'cross-cutting' },
  { id: 'bird-q7-t3-price-volatility', category: 'threat', description: 'Market Price Volatility — Global commodity fluctuations for rubber, coconut, and seaweed.', impactScore: 4.21, likelihoodScore: 4.09, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'connectors' },
  { id: 'bird-q6-t2-infra-cost-overruns', category: 'threat', description: 'Infrastructure Cost Overruns — Delays and budget escalations in critical infrastructure projects can discourage investors and slow the build-out of roads, power, and ports.', impactScore: 4.28, likelihoodScore: 3.9, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q9-t2-drifting-goals', category: 'threat', description: '"Drifting Goals" Syndrome — Political/institutional pressure leading to lowering standards rather than fixing root infrastructure problems.', impactScore: 4.13, likelihoodScore: 4.08, aiGenerated: false, leveragePoint: 'LP3', beieCluster: 'cross-cutting' },
  { id: 'bird-q7-t1-halal-competition', category: 'threat', description: 'Competition from Halal Hubs — Malaysia, Indonesia, and Thailand holding established market share.', impactScore: 4.11, likelihoodScore: 3.9, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'connectors' },
  { id: 'bird-q7-t2-economic-downturn', category: 'threat', description: 'Global Economic Downturn — Perceived as a top global risk, weakening demand for BARMM\'s key exports like Halal and rubber.', impactScore: 4.08, likelihoodScore: 3.94, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'connectors' },
  { id: 'bird-q9-t4-political-transition', category: 'threat', description: 'Political Transition Uncertainties — First parliamentary elections and governance continuity risks.', impactScore: 4.04, likelihoodScore: 3.99, aiGenerated: false, leveragePoint: 'LP3', beieCluster: 'cross-cutting' },
  { id: 'bird-q9-t5-natl-coordination', category: 'threat', description: 'Limited National Coordination — Gaps in BARMM-specific infrastructure funding from the national government.', impactScore: 4.08, likelihoodScore: 3.9, aiGenerated: false, leveragePoint: 'LP3', beieCluster: 'cross-cutting' },
  { id: 'bird-q6-t1-cyber-insecurity', category: 'threat', description: 'Cyber Insecurity & AI Risks — Emerging threats from misinformation, cyberattacks, and adverse AI outcomes disrupting digital governance.', impactScore: 4.07, likelihoodScore: 3.86, aiGenerated: false, leveragePoint: 'LP2', beieCluster: 'enablers' },
  { id: 'bird-q5-t1-standards-recognition', category: 'threat', description: 'Standards Recognition Risk — BARMM certifications not yet aligned with OIC/SMIIC international standards.', impactScore: 3.97, likelihoodScore: 3.92, aiGenerated: false, leveragePoint: 'LP1', beieCluster: 'transformers' },
  { id: 'bird-q9-t6-fragmented-mandates', category: 'threat', description: 'Risk of Fragmented Mandates — Islamic banking, halal certification, and trade agencies operating in silos.', impactScore: 4.0, likelihoodScore: 3.71, aiGenerated: false, leveragePoint: 'LP3', beieCluster: 'cross-cutting' },
  { id: 'bird-q4-t1-pestalotiopsis', category: 'threat', description: 'Rubber Pestalotiopsis Disease — A fungal disease is attacking rubber plantations in Basilan and could spread to other rubber-producing areas, threatening farmer livelihoods.', impactScore: 3.89, likelihoodScore: 3.81, aiGenerated: false, leveragePoint: 'LP5', beieCluster: 'foundations' },
];

interface SystemsThinkingProps {
  plan: StrategicPlan;
  onUpdateItem?: (id: string, updates: Partial<SWOTItem>) => void;
  planId?: string;
}

// ─── EXTENDED TYPES ───────────────────────────────────────────────────────────

interface ExtendedCLDNode extends CLDNode {
  nodeType?: 'stock' | 'flow' | 'converter' | 'goal' | 'paradigm' | 'default';
  leverageLevel?: number;
}

interface ExtendedCLDLink extends Omit<CLDLink, 'delay' | 'strength'> {
  /** Delay in periods (0 = no delay); store layer persists boolean — converted at load */
  delay?: number;
  /** Numeric link strength 1–5; store layer persists 'strong'|'moderate'|'weak' — converted at load */
  strength?: number;
}

interface LeveragePoint {
  archetypeId?: string;
  leverageLevel: number;
  meadowsName: string;
  intervention: string;
  targetNodeIds: string[];
  expectedImpact: 'high' | 'medium' | 'low';
  timeHorizon: 'short' | 'medium' | 'long';
  source: 'archetype' | 'cld-analysis';
}

interface DetectedLoop {
  nodeIds: string[];
  type: 'R' | 'B';
  name: string;
  strength: number;
}

// ─── AI ANALYSIS RESPONSE TYPES ────────────────────────────────────────────────

interface AIAnalysisResponse {
  detected_loops: DetectedLoop[];
  dominant_archetypes: Array<{
    archetypeId: string;
    archetypeName: string;
    confidence: number;
    matchedNodes: string[];
  }>;
  ranked_leverage_points: Array<Omit<LeveragePoint, 'source'>>;
  recommendations?: string[];
}

// ─── MEADOWS LEVELS ───────────────────────────────────────────────────────────

const MEADOWS_LEVELS: Record<number, { name: string; icon: React.ElementType; color: string; desc: string }> = {
  12: { name: 'Constants & Parameters',   icon: Gauge,      color: 'text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]',    desc: 'Numbers, subsidies, taxes, standards' },
  11: { name: 'Buffer Sizes',             icon: Anchor,     color: 'text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]',    desc: 'Sizes of stabilizing stocks' },
  10: { name: 'Stock-Flow Structure',     icon: Workflow,   color: 'text-[#C9A84C]',     desc: 'Physical arrangement of stocks and flows' },
  9:  { name: 'Delay Lengths',            icon: Clock,      color: 'text-[#C9A84C]',     desc: 'Length of time relative to rates of change' },
  8:  { name: 'Negative Feedback',        icon: Activity,   color: 'text-[#C9A84C]',     desc: 'Strength of balancing feedback loops' },
  7:  { name: 'Positive Feedback Gain',   icon: TrendingUp, color: 'text-[#34d399]',  desc: 'Gain around driving reinforcing loops' },
  6:  { name: 'Information Flows',        icon: BarChart2,  color: 'text-yellow-600',   desc: 'Structure of who does and does not have access to information' },
  5:  { name: 'Rules',                    icon: BookOpen,   color: 'text-orange-400',   desc: 'Incentives, punishments, constraints' },
  4:  { name: 'Self-Organization',        icon: Sparkles,   color: 'text-red-500',      desc: 'Power to change, evolve, or self-organize system structure' },
  3:  { name: 'Goals',                    icon: Target,     color: 'text-red-400',      desc: 'Purpose or function of the system' },
  2:  { name: 'Mindset / Paradigm',       icon: Brain,      color: 'text-purple-400',   desc: 'Shared idea from which the system arises' },
  1:  { name: 'Transcend Paradigms',      icon: Crosshair,  color: 'text-violet-700',   desc: 'Ability to rise above paradigms' },
};

// ─── LOOP DETECTION ───────────────────────────────────────────────────────────

const findLoops = (nodes: ExtendedCLDNode[], links: ExtendedCLDLink[]): DetectedLoop[] => {
  const loops: DetectedLoop[] = [];
  const visited = new Set<string>();

  const dfs = (startId: string, currentId: string, path: string[], depth: number) => {
    if (depth > 8) return;
    const outgoing = links.filter(l => l.from === currentId);
    for (const link of outgoing) {
      if (link.to === startId && path.length >= 2) {
        const loopKey = [...path].sort().join('-');
        if (!visited.has(loopKey)) {
          visited.add(loopKey);
          const loopLinks = path.map((nodeId, i) => {
            const nextId = i < path.length - 1 ? path[i + 1] : startId;
            return links.find(l => l.from === nodeId && l.to === nextId);
          }).filter(Boolean) as ExtendedCLDLink[];

          const negCount = loopLinks.filter(l => l.polarity === '-').length;
          const type: 'R' | 'B' = negCount % 2 === 0 ? 'R' : 'B';
          const avgStrength = loopLinks.reduce((s, l) => s + (l.strength || 3), 0) / Math.max(loopLinks.length, 1);
          const nodeLabels = path.map(id => nodes.find(n => n.id === id)?.label || id);

          loops.push({
            nodeIds: [...path],
            type,
            name: `${type}${loops.filter(l => l.type === type).length + 1}: ${nodeLabels[0]} → … → ${nodeLabels[nodeLabels.length - 1]}`,
            strength: Math.round(avgStrength),
          });
        }
      } else if (!path.includes(link.to)) {
        dfs(startId, link.to, [...path, link.to], depth + 1);
      }
    }
  };

  for (const node of nodes) {
    dfs(node.id, node.id, [node.id], 0);
  }

  return loops;
};

// ─── ARCHETYPE CONFIG ──────────────────────────────────────────────────────────

interface SystemArchetype {
  id: string;
  name: string;
  category: string;
  color: string;
  desc: string;
  use: string;
  swotHint: string;
  nodeLabels: string[];
  loops: Array<{ from: string; to: string; polarity: '+' | '-'; label?: string }>;
  loopTypes: string[];
  imageUrl?: string;
}

const systemArchetypes: SystemArchetype[] = [
  {
    id: 'ltg', name: 'Limits to Success', category: 'Reinforcing + Balancing',
    color: 'from-emerald-500 to-teal-600',
    imageUrl: 'https://paibpwwszlfpsyytdnal.supabase.co/storage/v1/object/public/systems-archetypes/public/Limits-to-Success1.png',
    desc: 'A reinforcing growth process is slowed by a balancing constraint.',
    use: 'Use when growth initiatives stall despite strong investment.',
    swotHint: 'Strength-driven opportunities facing constraint threats.',
    nodeLabels: ['Growing Action', 'Performance', 'Limiting Condition', 'Constraining Action'],
    loops: [
      { from: 'Growing Action',      to: 'Performance',         polarity: '+', label: 'R' },
      { from: 'Performance',         to: 'Growing Action',      polarity: '+', label: 'R' },
      { from: 'Performance',         to: 'Limiting Condition',  polarity: '+', label: 'B' },
      { from: 'Limiting Condition',  to: 'Constraining Action', polarity: '+', label: 'B' },
      { from: 'Constraining Action', to: 'Performance',         polarity: '-', label: 'B' },
    ],
    loopTypes: ['R: Virtuous growth cycle', 'B: Capacity constraint feedback'],
  },
  {
    id: 'stb', name: 'Shifting the Burden', category: 'Balancing + Reinforcing (undermining)',
    color: 'from-amber-500 to-orange-600',
    imageUrl: 'https://paibpwwszlfpsyytdnal.supabase.co/storage/v1/object/public/systems-archetypes/public/Shifting-the-Burden2.png',
    desc: 'A symptomatic solution relieves pressure but erodes capacity to address fundamental problem.',
    use: 'Use when recurring fixes do not solve root problems.',
    swotHint: 'Repeated weaknesses despite tactical interventions.',
    nodeLabels: ['Problem Symptom', 'Symptomatic Fix', 'Fundamental Solution', 'Side Effect'],
    loops: [
      { from: 'Problem Symptom',     to: 'Symptomatic Fix',      polarity: '+', label: 'B1' },
      { from: 'Symptomatic Fix',     to: 'Problem Symptom',      polarity: '-', label: 'B1' },
      { from: 'Problem Symptom',     to: 'Fundamental Solution', polarity: '+', label: 'B2' },
      { from: 'Fundamental Solution',to: 'Problem Symptom',      polarity: '-', label: 'B2' },
    ],
    loopTypes: ['B1: Symptomatic relief', 'B2: Fundamental solution'],
  },
  {
    id: 'dg', name: 'Drifting Goals', category: 'Two Balancing Loops',
    color: 'from-blue-500 to-indigo-600',
    imageUrl: 'https://paibpwwszlfpsyytdnal.supabase.co/storage/v1/object/public/systems-archetypes/public/Drifting-Goals2.png',
    desc: 'When performance gaps are uncomfortable, standard is lowered rather than corrective action taken.',
    use: 'Use when targets are consistently missed and expectations erode.',
    swotHint: 'Weaknesses that persist without remediation.',
    nodeLabels: ['Goal / Target', 'Gap', 'Corrective Action', 'Actual Performance'],
    loops: [
      { from: 'Gap',               to: 'Corrective Action',   polarity: '+', label: 'B1' },
      { from: 'Corrective Action', to: 'Actual Performance',  polarity: '+', label: 'B1' },
      { from: 'Actual Performance',to: 'Gap',                 polarity: '-', label: 'B1' },
      { from: 'Goal / Target',     to: 'Gap',                 polarity: '+', label: '' },
    ],
    loopTypes: ['B1: Corrective action closes gap'],
  },
  {
    id: 'esc', name: 'Escalation', category: 'Two Reinforcing Loops',
    color: 'from-red-500 to-rose-600',
    imageUrl: 'https://paibpwwszlfpsyytdnal.supabase.co/storage/v1/object/public/systems-archetypes/public/Escalation1.png',
    desc: 'Two parties perceive each other as threats and match escalating actions.',
    use: 'Use in competitive, adversarial dynamics where counter-responses spiral.',
    swotHint: 'Multiple external threats from competing entities.',
    nodeLabels: ['Our Relative Advantage', 'Their Actions', 'Their Relative Advantage', 'Our Actions'],
    loops: [
      { from: 'Their Actions',           to: 'Our Relative Advantage',   polarity: '-', label: 'R1' },
      { from: 'Our Relative Advantage',  to: 'Our Actions',              polarity: '+', label: 'R1' },
      { from: 'Our Actions',             to: 'Their Relative Advantage', polarity: '-', label: 'R2' },
    ],
    loopTypes: ['R1: Our escalation', 'R2: Their escalation'],
  },
  {
    id: 'sts', name: 'Success to the Successful', category: 'Two Reinforcing Loops',
    color: 'from-purple-500 to-violet-600',
    imageUrl: 'https://paibpwwszlfpsyytdnal.supabase.co/storage/v1/object/public/systems-archetypes/public/Success-to-the-Successful1.png',
    desc: 'Two competing activities draw from shared resource pool. Winners keep winning.',
    use: 'Use when winners keep winning regardless of merit.',
    swotHint: 'Dominant strengths concentrating strategic resources.',
    nodeLabels: ['Resources to A', 'Success of A', 'Resources to B', 'Success of B'],
    loops: [
      { from: 'Resources to A', to: 'Success of A',   polarity: '+', label: 'R1' },
      { from: 'Success of A',   to: 'Resources to A', polarity: '+', label: 'R1' },
      { from: 'Resources to B', to: 'Success of B',   polarity: '+', label: 'R2' },
      { from: 'Success of B',   to: 'Resources to B', polarity: '+', label: 'R2' },
    ],
    loopTypes: ['R1: Winner advantage', 'R2: Loser starvation'],
  },
  {
    id: 'toc', name: 'Tragedy of the Commons', category: 'Reinforcing + Multiple Balancing',
    color: 'from-[#C9A84C] to-sky-600',
    imageUrl: 'https://paibpwwszlfpsyytdnal.supabase.co/storage/v1/object/public/systems-archetypes/public/Tragedy-of-the-Commons1.png',
    desc: 'Individual actors rationally exploit shared resources, collectively depleting them.',
    use: 'Use when shared assets deteriorate despite rational individual behavior.',
    swotHint: 'Shared market opportunities being over-exploited.',
    nodeLabels: ['Individual Activity', 'Total Shared Activity', 'Commons Capacity', 'Net Gain per User'],
    loops: [
      { from: 'Net Gain per User',     to: 'Individual Activity',    polarity: '+', label: 'R' },
      { from: 'Individual Activity',   to: 'Total Shared Activity',  polarity: '+', label: '' },
      { from: 'Total Shared Activity', to: 'Commons Capacity',       polarity: '-', label: 'B' },
    ],
    loopTypes: ['R: Individual gain attraction', 'B: Overuse degrades commons'],
  },
  {
    id: 'ftf', name: 'Fixes that Fail', category: 'Balancing + Reinforcing (delayed)',
    color: 'from-orange-500 to-red-500',
    imageUrl: 'https://paibpwwszlfpsyytdnal.supabase.co/storage/v1/object/public/systems-archetypes/public/Fixes-That-Fail2.png',
    desc: 'A fix that alleviates a problem creates unintended consequences that worsen original problem.',
    use: 'Use when solutions create new problems or short-term fixes repeatedly fail.',
    swotHint: 'Repeated tactical fixes not resolving core weaknesses.',
    nodeLabels: ['Problem', 'Fix / Solution', 'Unintended Consequence', 'Delay'],
    loops: [
      { from: 'Problem',         to: 'Fix / Solution',          polarity: '+', label: 'B' },
      { from: 'Fix / Solution',  to: 'Problem',                 polarity: '-', label: 'B' },
      { from: 'Fix / Solution',  to: 'Unintended Consequence',  polarity: '+', label: 'R' },
    ],
    loopTypes: ['B: Short-term fix loop', 'R: Unintended consequence'],
  },
  {
    id: 'gui', name: 'Growth and Underinvestment', category: 'Reinforcing + Multiple Balancing',
    color: 'from-slate-500 to-slate-700',
    imageUrl: 'https://paibpwwszlfpsyytdnal.supabase.co/storage/v1/object/public/systems-archetypes/public/Growth-and-Underinvestment2.png',
    desc: 'Growth drives demand that strains capacity. Standards are lowered rather than investing to expand.',
    use: 'Use when high-growth initiatives plateau as infrastructure cannot keep pace.',
    swotHint: 'Opportunity growth limited by capacity weaknesses.',
    nodeLabels: ['Growth Engine', 'Demand', 'Capacity Gap', 'Investment', 'Performance Standard'],
    loops: [
      { from: 'Growth Engine', to: 'Demand',        polarity: '+', label: 'R' },
      { from: 'Demand',        to: 'Growth Engine', polarity: '+', label: 'R' },
      { from: 'Demand',        to: 'Capacity Gap',  polarity: '+', label: 'B' },
      { from: 'Capacity Gap',  to: 'Investment',    polarity: '+', label: 'B' },
    ],
    loopTypes: ['R: Self-reinforcing growth', 'B: Capacity investment needed'],
  },
  {
    id: 'aa', name: 'Accidental Adversaries', category: 'Two Reinforcing Loops (degrading)',
    color: 'from-pink-500 to-rose-600',
    desc: 'Two parties working toward compatible goals take actions that inadvertently undermine each other.',
    use: 'Use in partnership contexts where self-interest damages relationships.',
    swotHint: 'Partnership strengths eroding through misalignment.',
    nodeLabels: ['Our Success', 'Our Actions', 'Their Success', 'Their Actions'],
    loops: [
      { from: 'Our Actions',   to: 'Our Success',   polarity: '+', label: 'R1' },
      { from: 'Our Actions',   to: 'Their Success', polarity: '-', label: 'R2' },
      { from: 'Their Success', to: 'Their Actions', polarity: '+', label: 'R2' },
      { from: 'Their Actions', to: 'Our Success',   polarity: '-', label: 'R2' },
    ],
    loopTypes: ['R1: Individual success reinforcement', 'R2: Mutual undermining'],
  },
  {
    id: 'ap', name: 'Attractiveness Principle', category: 'Reinforcing + Balancing',
    color: 'from-violet-500 to-purple-700',
    desc: 'As system attracts more participants due to appeal, congestion reduces quality, eroding attractiveness.',
    use: 'Use when growth from popularity degrades the thing that made it popular.',
    swotHint: 'Rapidly growing opportunities attracting competitors.',
    nodeLabels: ['Attractiveness', 'New Entrants / Demand', 'Congestion / Load', 'Quality / Performance'],
    loops: [
      { from: 'Attractiveness',        to: 'New Entrants / Demand', polarity: '+', label: 'R' },
      { from: 'New Entrants / Demand', to: 'Quality / Performance', polarity: '-', label: 'B' },
      { from: 'Quality / Performance', to: 'Attractiveness',        polarity: '+', label: 'B' },
    ],
    loopTypes: ['R: Growth-from-attractiveness', 'B: Congestion degrades quality'],
  },
];

// ─── CATEGORY CONFIG ──────────────────────────────────────────────────────────

const categoryConfig = {
  strength:    { label: 'Strength',    icon: Shield,      color: 'emerald', bgColor: 'bg-[#059669]', lightBg: 'bg-[#059669]/10',  textColor: 'text-[#34d399]', borderColor: 'border-[#059669]/20', defaultCLDPolarity: '+' as '+' | '-' },
  weakness:    { label: 'Weakness',    icon: AlertCircle, color: 'red',     bgColor: 'bg-red-500/100',     lightBg: 'bg-red-500/10',      textColor: 'text-red-400',     borderColor: 'border-red-500/20',     defaultCLDPolarity: '-' as '+' | '-' },
  opportunity: { label: 'Opportunity', icon: Lightbulb,   color: 'blue',    bgColor: 'bg-[#C9A84C]',    lightBg: 'bg-[#C9A84C]/10',     textColor: 'text-[#C9A84C]',    borderColor: 'border-[#C9A84C]/20',    defaultCLDPolarity: '+' as '+' | '-' },
  threat:      { label: 'Threat',      icon: Zap,         color: 'amber',   bgColor: 'bg-amber-500/100',   lightBg: 'bg-amber-500/10',    textColor: 'text-amber-400',   borderColor: 'border-amber-500/20',   defaultCLDPolarity: '-' as '+' | '-' },
};

// ─── SCORE BUTTON ─────────────────────────────────────────────────────────────

const ScoreButton: React.FC<{
  value: number; selectedValue: number; onSelect: (v: number) => void;
  type: 'impact' | 'likelihood'; category: keyof typeof categoryConfig;
}> = ({ value, selectedValue, onSelect, type, category }) => {
  const config = categoryConfig[category];
  const isSelected = value <= selectedValue;
  return (
    <button onClick={() => onSelect(value)}
      className={cn('w-7 h-7 rounded-full border-2 transition-all duration-150 flex items-center justify-center',
        isSelected
          ? type === 'impact'
            ? config.defaultCLDPolarity === '+' ? 'border-[#059669] bg-[#059669]' : 'border-red-500 bg-red-500/100'
            : 'border-[#C9A84C] bg-[#C9A84C]'
          : 'border-[#C9A84C]/30 dark:border-[#C9A84C]/20 hover:border-slate-400 hover:bg-[#064e3b]/10 dark:bg-[#022c22]'
      )} aria-label={`${type} score ${value}`}>
      {isSelected && <Check className='w-3.5 h-3.5 text-white' />}
    </button>
  );
};

const ScoreRow: React.FC<{
  label: string; score: number; onChange: (v: number) => void;
  type: 'impact' | 'likelihood'; category: keyof typeof categoryConfig;
  readOnly?: boolean; labelColor?: string;
}> = ({ label, score, onChange, type, category, readOnly, labelColor }) => (
  <div className='flex items-center gap-2 flex-wrap'>
    <span className={cn('text-xs font-semibold w-16 shrink-0', labelColor || 'text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]')}>{label}</span>
    <div className='flex gap-1'>
      {[1, 2, 3, 4, 5].map(n => (
        <ScoreButton key={n} value={n} selectedValue={score} onSelect={readOnly ? () => {} : onChange} type={type} category={category} />
      ))}
    </div>
    <span className={cn('text-xs font-bold tabular-nums', labelColor || 'text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]')}>{score}/5</span>
  </div>
);

const PriorityBadge: React.FC<{ totalScore: number; category: keyof typeof categoryConfig }> = ({ totalScore, category }) => {
  const PRIORITY_GUIDE = [
    { level: 'Low',      range: '1–9',   color: 'text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]', bg: 'bg-[#064e3b]/20 dark:bg-[#022c22]/60', border: 'border-[#C9A84C]/20 dark:border-[#C9A84C]/20' },
    { level: 'Medium',   range: '10–15', color: 'text-[#C9A84C]',  bg: 'bg-[#C9A84C]/10',  border: 'border-[#C9A84C]/20' },
    { level: 'High',     range: '16–20', color: 'text-amber-400', bg: 'bg-amber-500/100/10', border: 'border-amber-500/20' },
    { level: 'Critical', range: '21–25', color: 'text-red-400',   bg: 'bg-red-500/100/10',   border: 'border-red-500/20' },
  ];

  const getPriorityInfo = (score: number) => {
    if (score <= 9)  return PRIORITY_GUIDE[0];
    if (score <= 15) return PRIORITY_GUIDE[1];
    if (score <= 20) return PRIORITY_GUIDE[2];
    return PRIORITY_GUIDE[3];
  };

  const priority = getPriorityInfo(totalScore);
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-xs font-bold border', priority.bg, priority.color, priority.border)}>
      {priority.level} · {totalScore}
    </span>
  );
};

// ─── SWOT CARD ────────────────────────────────────────────────────────────────

const SWOTCard: React.FC<{
  item: SWOTItem; config: typeof categoryConfig.strength;
  onUpdate?: (id: string, updates: Partial<SWOTItem>) => void;
  onAddToCLD?: (item: SWOTItem) => void; compact?: boolean;
}> = ({ item, config, onUpdate, onAddToCLD, compact }) => {
  const imp = item.impactScore || 3;
  const lik = item.likelihoodScore || 3;
  const total = imp * lik;
  if (compact) {
    return (
      <div className={cn('rounded-lg p-3 border transition-all', config.lightBg, config.borderColor)}>
        <p className={cn('text-sm font-medium mb-2 leading-snug', config.textColor)}>{item.description}</p>
        <div className='flex items-center justify-between flex-wrap gap-2'>
          <div className='flex gap-3 text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]'>
            <span>Impact <span className={cn('font-bold', config.textColor)}>{imp}</span></span>
            <span>Likelihood <span className='font-bold text-[#C9A84C]'>{lik}</span></span>
          </div>
          <div className='flex items-center gap-2'>
            <PriorityBadge totalScore={total} category={item.category} />
            {onAddToCLD && (
              <button onClick={() => onAddToCLD(item)} title='Add to CLD'
                className='p-1 rounded bg-[#C9A84C]/10 text-[#C9A84C] hover:bg-blue-200 transition-colors'>
                <Plus className='w-3 h-3' />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={cn('rounded-xl p-4 border transition-all', config.lightBg, config.borderColor)}>
      <div className='flex items-start justify-between gap-2 mb-3'>
        <p className={cn('text-sm font-medium leading-relaxed', config.textColor)}>{item.description}</p>
        <span className={cn('px-2 py-0.5 rounded text-xs font-bold text-white shrink-0', config.bgColor)}>
          {config.defaultCLDPolarity === '+' ? '+' : '−'}{total}
        </span>
      </div>
      <div className='space-y-2 pt-3 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/20/60'>
        <ScoreRow label='Impact' score={imp} onChange={v => onUpdate?.(item.id, { impactScore: v })} type='impact' category={item.category} labelColor={config.textColor} />
        <ScoreRow label='Likelihood' score={lik} onChange={v => onUpdate?.(item.id, { likelihoodScore: v })} type='likelihood' category={item.category} />
        <div className='flex items-center justify-between pt-1 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/20/40'>
          <span className='text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]'>Impact × Likelihood</span>
          <div className='flex items-center gap-2'>
            <PriorityBadge totalScore={total} category={item.category} />
            {onAddToCLD && (
              <button onClick={() => onAddToCLD(item)}
                className='flex items-center gap-1 text-xs px-2 py-1 rounded bg-[#C9A84C]/10 text-[#C9A84C] hover:bg-blue-200 transition-colors font-medium'>
                <GitBranch className='w-3 h-3' /> Add to CLD
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SWOT QUADRANT ────────────────────────────────────────────────────────────

const SWOTQuadrant: React.FC<{
  title: string; count: number; icon: React.ElementType; items: SWOTItem[];
  config: typeof categoryConfig.strength;
  onUpdate?: (id: string, updates: Partial<SWOTItem>) => void;
  onAddToCLD?: (item: SWOTItem) => void;
}> = ({ title, count, icon: Icon, items, config, onUpdate, onAddToCLD }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={cn('rounded-xl border overflow-hidden', config.borderColor)}>
      <button onClick={() => setOpen(v => !v)} className={cn('w-full flex items-center justify-between px-4 py-3', config.lightBg)}>
        <div className='flex items-center gap-2'>
          <Icon className={cn('w-4 h-4', config.textColor)} />
          <h4 className={cn('font-semibold text-sm', config.textColor)}>{title}</h4>
          <span className={cn('text-xs px-1.5 py-0.5 rounded-full font-medium', config.bgColor, 'text-white')}>{count}</span>
        </div>
        {open ? <ChevronUp className='w-4 h-4 text-[#64748b]/80 dark:text-[#64748b]' /> : <ChevronDown className='w-4 h-4 text-[#64748b]/80 dark:text-[#64748b]' />}
      </button>
      {open && (
        <div className='p-3 space-y-2 bg-white dark:bg-[#022c22]/60/60/60'>
          {items.length === 0
            ? <p className='text-xs text-[#64748b]/80 dark:text-[#64748b] text-center py-4'>No items yet</p>
            : items.map(item => <SWOTCard key={item.id} item={item} config={config} onUpdate={onUpdate} onAddToCLD={onAddToCLD} compact />)
          }
        </div>
      )}
    </div>
  );
};

// ─── EDUCATIONAL RESOURCES ────────────────────────────────────────────────────

const EducationalResources: React.FC = () => {
  const systemsVideos = Object.values(BIRD_VIDEOS).filter(v => v.section === 'section2');
  const systemsImages = Object.values(BIRD_IMAGES).filter(img => img.category === 'systems' || img.category === 'archetype');

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 rounded-xl border border-[#C9A84C]/20 dark:border-blue-800 p-4 space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-4 h-4 text-[#C9A84C]" />
        <h3 className="text-sm font-semibold text-blue-800 dark:text-[#E8C560]">BIRD Learning Resources</h3>
      </div>

      {/* Video Resources from bird-urls.ts */}
      {systemsVideos.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#ecfdf5]/80 dark:text-[#64748b]/80 uppercase tracking-wider">Video Guides</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {systemsVideos.map(v => (
              <a key={v.url} href={v.url} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-3 rounded-lg bg-white dark:bg-[#022c22]/60/60 border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 hover:border-blue-400 hover:shadow-md transition-all">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <PlayCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#E8C560] dark:text-[#ecfdf5] group-hover:text-[#C9A84C] transition-colors truncate">{v.title}</p>
                  <p className="text-xs text-[#64748b] dark:text-[#64748b]/80">{v.duration} · {v.section}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#64748b]/80 group-hover:text-[#C9A84C] transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Image Resources from bird-urls.ts */}
      {systemsImages.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#ecfdf5]/80 dark:text-[#64748b]/80 uppercase tracking-wider">Visual References</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {systemsImages.slice(0, 6).map(img => (
              <a key={img.url} href={img.url} target="_blank" rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 hover:border-blue-400 hover:shadow-md transition-all bg-white dark:bg-[#022c22]/60/60">
                <img src={img.url} alt={img.alt} className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <div className="px-3 py-2">
                  <p className="text-[11px] font-semibold text-[#E8C560]/90 dark:text-[#ecfdf5]/90 truncate group-hover:text-[#C9A84C] transition-colors">{img.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Framework Overview Links */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-[#ecfdf5]/80 dark:text-[#64748b]/80 uppercase tracking-wider">Framework Guides</p>
        <div className="flex flex-wrap gap-2">
          {[
            { title: 'BEIE Framework', url: 'https://rgvteytgkugdqdodedxq.supabase.co/storage/v1/object/public/images-context-beie-framewoek/public/19.%20Bangsamoro%20BEIE%20Framework.png', icon: Layers },
            { title: 'Meadows Leverage', url: 'https://rgvteytgkugdqdodedxq.supabase.co/storage/v1/object/public/images-swot-systems-maps/public/24.%20Meadows%20Hierarchy%20of%20Leverage%20Points.png', icon: Target },
            { title: 'Investment Cycles', url: 'https://rgvteytgkugdqdodedxq.supabase.co/storage/v1/object/public/images-swot-systems-maps/public/15.%20Investment%20and%20Governance%20Cycles.png', icon: RefreshCw },
            { title: 'Virtuous Cycle', url: 'https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/14.%20Investment-Development%20Virtuous%20Cycle.png', icon: TrendingUp },
          ].map(r => (
            <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-[#022c22]/60/60 border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 hover:border-blue-400 hover:shadow-sm transition-all text-xs font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90">
              <r.icon className="w-3.5 h-3.5 text-[#C9A84C]" />
              {r.title}
              <ExternalLink className="w-3 h-3 text-[#64748b]/80" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── ARCHETYPE IMAGE TOOLTIP ──────────────────────────────────────────────────

const ArchetypeImageTooltip: React.FC<{ imageUrl: string; archetypeName: string }> = ({
  imageUrl,
  archetypeName,
}) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos]         = useState<{ top: number; left: number } | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError]   = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hideTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHide = () => { if (hideTimer.current) clearTimeout(hideTimer.current); };

  const show = () => {
    clearHide();
    if (triggerRef.current) {
      const rect         = triggerRef.current.getBoundingClientRect();
      const spaceBelow   = window.innerHeight - rect.bottom;
      const spaceRight   = window.innerWidth  - rect.right;
      const tooltipW     = 268;
      const tooltipH     = 260;
      setPos({
        top:  spaceBelow > tooltipH + 12 ? rect.bottom + 6 : rect.top - tooltipH - 6,
        left: spaceRight > tooltipW + 8  ? rect.left       : Math.max(8, rect.right - tooltipW),
      });
    }
    setVisible(true);
  };

  const hide = () => {
    hideTimer.current = setTimeout(() => setVisible(false), 120);
  };

  // Clean up timer on unmount
  useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={e => {
          e.stopPropagation();
          if (visible) {
            setVisible(false);
          } else {
            show();
          }
        }}
        className={cn(
          'shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150',
          visible
            ? 'bg-[#C9A84C] text-white shadow-md scale-110'
            : 'bg-[#064e3b]/20 dark:bg-[#022c22]/60 hover:bg-[#C9A84C]/10 text-[#64748b]/80 dark:text-[#64748b] hover:text-[#C9A84C] hover:scale-110',
        )}
        title={`Preview ${archetypeName} diagram`}
        aria-label={`Preview ${archetypeName} diagram`}
      >
        <Eye className="w-3.5 h-3.5" />
      </button>

      {visible && pos && !imgError && (
        <div
          className="fixed z-50 rounded-xl shadow-2xl border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 bg-white dark:bg-[#022c22]/60/60 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          style={{ top: pos.top, left: pos.left, width: 268 }}
          onMouseEnter={() => { clearHide(); setVisible(true); }}
          onMouseLeave={hide}
        >
          {/* Tooltip header */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-[#C9A84C]/20 dark:border-[#C9A84C]/20">
            <GitBranch className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
            <span className="text-xs font-semibold text-[#E8C560]/90 dark:text-[#ecfdf5]/90 truncate">{archetypeName}</span>
            <span className="ml-auto text-[9px] text-[#64748b]/80 dark:text-[#64748b] shrink-0">archetype diagram</span>
          </div>

          {/* Image area */}
          <div className="relative bg-[#064e3b]/10 dark:bg-[#022c22]" style={{ minHeight: 180 }}>
            {/* Skeleton loader */}
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-2 w-full px-6">
                  <div className="h-3 bg-slate-200 rounded animate-pulse w-3/4 mx-auto" />
                  <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2 mx-auto" />
                  <div className="h-24 bg-slate-200 rounded-lg animate-pulse mt-3" />
                </div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={`${archetypeName} systems archetype diagram`}
              className={cn(
                'w-full object-contain p-2 transition-opacity duration-300',
                imgLoaded ? 'opacity-100' : 'opacity-0',
              )}
              style={{ maxHeight: 220 }}
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setVisible(false); }}
            />
          </div>

          {/* Footer hint */}
          <div className="px-3 py-1.5 bg-[#064e3b]/10 dark:bg-[#022c22] border-t border-slate-100 dark:border-[#C9A84C]/20/60">
            <p className="text-[9px] text-[#64748b]/80 dark:text-[#64748b] text-center">Hover to keep open · click eye to pin</p>
          </div>
        </div>
      )}
    </>
  );
};

// ─── LEVERAGE POINTS PANEL ────────────────────────────────────────────────────

const impactColors = {
  high:   { badge: 'bg-red-500/100/10 text-red-400 border-red-500/20',       dot: 'bg-red-500/100'    },
  medium: { badge: 'bg-amber-500/100/10 text-amber-400 border-amber-500/20', dot: 'bg-amber-500/100'  },
  low:    { badge: 'bg-[#064e3b]/20 dark:bg-[#022c22]/60 text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] border-[#C9A84C]/20 dark:border-[#C9A84C]/20', dot: 'bg-slate-400'  },
};

const horizonColors = {
  short:  'text-[#34d399] bg-[#059669]/10 border-[#059669]/20',
  medium: 'text-[#C9A84C] bg-[#C9A84C]/10 border-[#C9A84C]/20',
  long:   'text-purple-400 bg-purple-500/10 border-purple-500/20',
};

const LeveragePointsPanel: React.FC<{
  nodes: ExtendedCLDNode[];
  links: ExtendedCLDLink[];
  selectedArchId: string | null;
  highlightedNodeIds: string[];
  onHighlightNodes: (ids: string[]) => void;
}> = ({ nodes, links, selectedArchId, highlightedNodeIds, onHighlightNodes }) => {

  const generateArchetypeLeveragePoints = (archetypeId: string, nodes: ExtendedCLDNode[], links: ExtendedCLDLink[]): LeveragePoint[] => {
    const base: (Omit<LeveragePoint, 'targetNodeIds'> & { targetFilter: (label: string) => boolean })[] = [];

    const push = (
      leverageLevel: number,
      intervention: string,
      expectedImpact: 'high' | 'medium' | 'low',
      timeHorizon: 'short' | 'medium' | 'long',
      targetFilter: (label: string) => boolean,
    ) => base.push({ archetypeId, leverageLevel, meadowsName: MEADOWS_LEVELS[leverageLevel]?.name || '', intervention, expectedImpact, timeHorizon, source: 'archetype', targetFilter });

    switch (archetypeId) {
      case 'ltg':
        push(10, 'Remove structural constraint: invest in capacity expansion before growth stalls', 'high',   'medium', l => /limit|constrain|capacit/i.test(l));
        push(7,  'Strengthen growth engine: accelerate virtuous cycle while constraint is still loose', 'high', 'short',  l => /growing|growth|perform/i.test(l));
        push(8,  'Increase balancing feedback sensitivity to identify bottlenecks earlier', 'medium', 'medium', l => /constrain|limit/i.test(l));
        break;
      case 'stb':
        push(5,  'Change incentive rules: make symptomatic fixes more costly; reward root-cause solutions', 'high', 'medium', l => /symptom|fix/i.test(l));
        push(8,  'Strengthen B2 loop: resource fundamental solutions, reduce symptomatic fix dependency', 'high', 'long',   l => /fundamental/i.test(l));
        push(6,  'Improve information flow: make root causes more visible to decision-makers', 'medium', 'short', l => /problem|symptom/i.test(l));
        break;
      case 'dg':
        push(3,  'Hold goal firm: make goal-setting process independent of performance pressure', 'high',   'medium', l => /goal|target/i.test(l));
        push(8,  'Strengthen corrective action loop: reduce response time to performance gaps', 'medium', 'short',  l => /corrective|action/i.test(l));
        push(6,  'Improve performance visibility: make gap transparent and undeniable', 'high',   'short',  l => /gap|perform/i.test(l));
        break;
      case 'esc':
        push(2,  'Paradigm shift: reframe from zero-sum to mutual-gain; seek win-win agreements', 'high',   'long',   _ => true);
        push(7,  'Reduce gain: unilateral de-escalation to break the reinforcing cycle', 'medium', 'short',  l => /actions|advantage/i.test(l));
        push(5,  'Establish rules: mutual escalation caps or third-party arbitration', 'high',   'medium', _ => true);
        break;
      case 'sts':
        push(7,  'Reduce positive feedback gain: diversify resource allocation away from winner', 'high',   'medium', l => /resource/i.test(l));
        push(5,  'Level playing field: create rules that redistribute advantage periodically', 'high',   'long',   _ => true);
        push(6,  'Improve information flow: make resource concentration visible and measurable', 'medium', 'short',  l => /success/i.test(l));
        break;
      case 'toc':
        push(5,  'Establish shared governance rules: quotas, agreements, mutual restraint', 'high',   'medium', _ => true);
        push(4,  'Enable self-organization: allow actors to collectively set and enforce limits', 'high',   'long',   l => /commons|shared/i.test(l));
        push(6,  'Add information flows: make total usage and depletion rate visible to all actors', 'high', 'short',  l => /total|commons/i.test(l));
        break;
      case 'ftf':
        push(9,  'Shorten delay: make unintended consequences visible faster', 'medium', 'short',  l => /delay|unintended/i.test(l));
        push(6,  'Add feedback: create early warning system for side effects before they compound', 'high', 'medium', l => /unintended|consequence/i.test(l));
        push(3,  'Redefine success metrics to include long-term side effects', 'high',   'long',   l => /problem|fix/i.test(l));
        break;
      case 'gui':
        push(10, 'Invest ahead of demand: build capacity infrastructure before gap widens', 'high',   'medium', l => /capacit|invest/i.test(l));
        push(3,  'Hold performance standards firm: resist lowering goals when capacity lags', 'high',   'medium', l => /standard|perform/i.test(l));
        push(7,  'Moderate growth engine temporarily to allow capacity to catch up', 'medium', 'short',  l => /growth|demand/i.test(l));
        break;
      case 'aa':
        push(2,  'Paradigm shift: make partnership goals explicit and align incentive structures', 'high',   'long',   _ => true);
        push(6,  'Create shared information flows: transparent reporting on mutual impacts', 'high',   'medium', l => /success|action/i.test(l));
        push(5,  'Establish coordination rules: joint decision-making for actions with cross-impact', 'high', 'medium', _ => true);
        break;
      case 'ap':
        push(10, 'Expand capacity infrastructure to absorb new entrants without quality loss', 'high',   'medium', l => /congestion|load/i.test(l));
        push(8,  'Strengthen quality feedback: make congestion impact on attractiveness more responsive', 'medium', 'short', l => /quality|perform/i.test(l));
        push(5,  'Manage entry rules: metered access, waitlists, or capacity-linked growth', 'high',   'medium', l => /entrant|demand/i.test(l));
        break;
      default:
        break;
    }

    return base.map(b => ({ ...b, targetNodeIds: nodes.filter(n => b.targetFilter(n.label)).map(n => n.id) }));
  };

  const generateCLDLeveragePoints = (nodes: ExtendedCLDNode[], links: ExtendedCLDLink[]): LeveragePoint[] => {
    const pts: LeveragePoint[] = [];
    const loops = findLoops(nodes, links);

    loops.filter(l => l.type === 'R' && l.strength >= 4).forEach(loop => {
      pts.push({
        leverageLevel: 7, meadowsName: MEADOWS_LEVELS[7].name,
        intervention: `Slow positive feedback in "${loop.name}" — high gain risks runaway dynamics`,
        targetNodeIds: loop.nodeIds, expectedImpact: 'high', timeHorizon: 'short', source: 'cld-analysis',
      });
    });

    loops.filter(l => l.type === 'B' && l.strength < 3).forEach(loop => {
      pts.push({
        leverageLevel: 8, meadowsName: MEADOWS_LEVELS[8].name,
        intervention: `Strengthen balancing loop "${loop.name}" — weak feedback leaves system uncontrolled`,
        targetNodeIds: loop.nodeIds, expectedImpact: 'medium', timeHorizon: 'medium', source: 'cld-analysis',
      });
    });

    return pts;
  };

  const leveragePoints = useMemo(() => {
    const pts: LeveragePoint[] = [];
    if (selectedArchId) pts.push(...generateArchetypeLeveragePoints(selectedArchId, nodes, links));
    pts.push(...generateCLDLeveragePoints(nodes, links));
    const seen = new Set<string>();
    return pts
      .filter(p => { const k = `${p.leverageLevel}-${p.intervention.slice(0, 40)}`; if (seen.has(k)) return false; seen.add(k); return true; })
      .sort((a, b) => a.leverageLevel - b.leverageLevel);
  }, [nodes, links, selectedArchId]);

  if (leveragePoints.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#C9A84C]/30 dark:border-[#C9A84C]/20 p-6 text-center">
        <Target className="w-8 h-8 text-[#64748b] mx-auto mb-2" />
        <p className="text-sm font-medium text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">No leverage points yet</p>
        <p className="text-xs text-[#64748b]/80 dark:text-[#64748b] mt-1">Apply an archetype or build a CLD to generate Meadows-based interventions</p>
      </div>
    );
  }

  const archPts = leveragePoints.filter(p => p.source === 'archetype');
  const cldPts  = leveragePoints.filter(p => p.source === 'cld-analysis');

  const renderGroup = (pts: LeveragePoint[], title: string, subtitle: string, headerClass: string) => {
    if (pts.length === 0) return null;
    return (
      <div className="space-y-2">
        <div className={cn('rounded-lg px-3 py-2 flex items-center gap-2', headerClass)}>
          <span className="text-[10px] opacity-70 ml-auto">{subtitle}</span>
        </div>
        {pts.map((point, idx) => {
          const meadow     = MEADOWS_LEVELS[point.leverageLevel];
          const MeadowIcon = meadow?.icon || Target;
          const ic         = impactColors[point.expectedImpact];
          const isHighlighted = point.targetNodeIds.length > 0 && point.targetNodeIds.every(id => highlightedNodeIds.includes(id));
          return (
            <div key={idx}
              className={cn(
                'rounded-xl border p-3 transition-all cursor-pointer group',
                isHighlighted ? 'border-violet-400 bg-violet-50 shadow-md' : 'border-[#C9A84C]/20 dark:border-[#C9A84C]/20 bg-white dark:bg-[#022c22]/60/60 hover:border-violet-300 hover:shadow-sm',
              )}
              onClick={() => onHighlightNodes(isHighlighted ? [] : point.targetNodeIds)}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                    point.leverageLevel <= 3 ? 'bg-violet-100' : point.leverageLevel <= 6 ? 'bg-red-500/100/10' : point.leverageLevel <= 9 ? 'bg-amber-500/100/10' : 'bg-[#064e3b]/20 dark:bg-[#022c22]/60')}>
                    <MeadowIcon className={cn('w-3.5 h-3.5', meadow?.color || 'text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]')} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={cn('text-[10px] font-black tabular-nums px-1.5 py-0.5 rounded',
                        point.leverageLevel <= 3 ? 'bg-violet-600 text-white' :
                        point.leverageLevel <= 6 ? 'bg-red-500/100 text-white' :
                        point.leverageLevel <= 9 ? 'bg-amber-500/100 text-white' : 'bg-slate-400 text-white')}>
                        L{point.leverageLevel}
                      </span>
                      <span className="text-[10px] font-semibold text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">{meadow?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-semibold border', ic.badge)}>{point.expectedImpact}</span>
                  <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-semibold border', horizonColors[point.timeHorizon])}>{point.timeHorizon}</span>
                </div>
              </div>
              <p className="text-xs font-medium text-[#E8C560] dark:text-[#ecfdf5] leading-relaxed mb-1.5">{point.intervention}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#64748b]/80 dark:text-[#64748b]">{point.targetNodeIds.length} target node{point.targetNodeIds.length !== 1 ? 's' : ''}</span>
                {point.targetNodeIds.length > 0 && (
                  <span className={cn('text-[10px] font-medium', isHighlighted ? 'text-violet-600' : 'text-[#64748b]/80 dark:text-[#64748b] group-hover:text-violet-500')}>
                    {isHighlighted ? '✓ highlighted' : 'click to highlight'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 p-3">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-3.5 h-3.5 text-violet-600" />
          <span className="text-xs font-semibold text-violet-800">Meadows' Leverage Hierarchy</span>
          <span className="text-[10px] text-violet-500 ml-auto">lower level = more leverage</span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-medium">
          {['L1–3\nParadigm', 'L4–6\nInformation', 'L7–9\nFeedback', 'L10–12\nParameters'].map((label, i) => {
            const colors = ['bg-violet-600 text-white', 'bg-red-500/100 text-white', 'bg-amber-500/100 text-white', 'bg-slate-400 text-white'];
            return (
              <div key={i} className={cn('flex-1 rounded px-1.5 py-1 text-center leading-tight', colors[i])}>
                {label.split('\n').map((l, j) => <div key={j}>{l}</div>)}
              </div>
            );
          })}
          <div className="ml-1 text-[#64748b]/80 dark:text-[#64748b] self-center">→ least</div>
        </div>
      </div>

      {renderGroup(archPts, 'Archetype Interventions', 'from selected template', 'bg-violet-100 text-violet-800')}
      {renderGroup(cldPts,  'CLD-Derived Points',      'from diagram analysis',  'bg-[#C9A84C]/10 text-blue-800')}

      <p className="text-[10px] text-[#64748b]/80 dark:text-[#64748b] text-center leading-relaxed">
        Based on Donella Meadows' <em>Thinking in Systems</em> (2008). Click a card to highlight target nodes in the CLD.
      </p>
    </div>
  );
};

// ─── CLD CANVAS ───────────────────────────────────────────────────────────────

const CLDCanvas: React.FC<{
  nodes: ExtendedCLDNode[];
  links: ExtendedCLDLink[];
  highlightedNodeIds?: string[];
  onUpdateNodes?: (n: ExtendedCLDNode[]) => void;
  onUpdateLinks?: (l: ExtendedCLDLink[]) => void;
}> = ({ nodes, links, highlightedNodeIds = [], onUpdateNodes, onUpdateLinks }) => {
  const svgRef   = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // ── Interaction state ────────────────────────────────────────────────────
  const [editingNodeId,  setEditingNodeId]  = useState<string | null>(null);
  const [hoveredNodeId,  setHoveredNodeId]  = useState<string | null>(null);
  const [hoveredLinkKey, setHoveredLinkKey] = useState<string | null>(null);
  const [showHelp,       setShowHelp]       = useState(false);

  // Arrow-drawing state: dragging from a node to draw a new link
  const [arrowDraw, setArrowDraw] = useState<{
    fromId: string; fromX: number; fromY: number;
    curX: number; curY: number; active: boolean;
  } | null>(null);

  // Node-dragging state
  const [draggingNode, setDraggingNode] = useState<{
    id: string; startMouseX: number; startMouseY: number;
    startNodeX: number; startNodeY: number;
  } | null>(null);

  // Link polarity edit dialog
  const [linkDialog, setLinkDialog] = useState<{
    from: string; to: string; polarity: '+' | '-'; strength: number; isNew: boolean;
  } | null>(null);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const getSVGPoint = (e: React.MouseEvent | MouseEvent): { x: number; y: number } => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    };
  };

  const getNodeAt = (x: number, y: number): ExtendedCLDNode | undefined =>
    nodes.find(n => Math.hypot(Number(n.x) - x, Number(n.y) - y) < 6);

  // ── Node management ─────────────────────────────────────────────────────
  const addNode = useCallback(() => {
    // Place new nodes in a spiral to avoid collisions
    const angle = nodes.length * 137.5 * (Math.PI / 180);
    const r     = 12 + nodes.length * 4;
    const n: ExtendedCLDNode = {
      id: `node-${Date.now()}`, label: 'New Variable',
      x: 50 + Math.cos(angle) * Math.min(r, 35),
      y: 50 + Math.sin(angle) * Math.min(r, 30),
      nodeType: 'default',
    };
    onUpdateNodes?.([...nodes, n]);
    setEditingNodeId(n.id);
  }, [nodes, onUpdateNodes]);

  const deleteNode = useCallback((id: string) => {
    onUpdateNodes?.(nodes.filter(n => n.id !== id));
    onUpdateLinks?.(links.filter(l => l.from !== id && l.to !== id));
  }, [nodes, links, onUpdateNodes, onUpdateLinks]);

  const updateLabel = useCallback((id: string, label: string) =>
    onUpdateNodes?.(nodes.map(n => n.id === id ? { ...n, label } : n)), [nodes, onUpdateNodes]);

  // ── Link management ─────────────────────────────────────────────────────
  const confirmLink = useCallback(() => {
    if (!linkDialog?.to || !linkDialog?.from) return;
    const exists = links.find(l => l.from === linkDialog.from && l.to === linkDialog.to);
    if (exists) {
      // Update existing link polarity/strength
      onUpdateLinks?.(links.map(l =>
        l.from === linkDialog.from && l.to === linkDialog.to
          ? { ...l, polarity: linkDialog.polarity, strength: linkDialog.strength } : l));
    } else {
      onUpdateLinks?.([...links, {
        from: linkDialog.from, to: linkDialog.to,
        polarity: linkDialog.polarity, strength: linkDialog.strength,
      }]);
    }
    setLinkDialog(null);
  }, [linkDialog, links, onUpdateLinks]);

  const deleteLink = useCallback((from: string, to: string) =>
    onUpdateLinks?.(links.filter(l => !(l.from === from && l.to === to))),
  [links, onUpdateLinks]);

  const editLink = useCallback((from: string, to: string) => {
    const lnk = links.find(l => l.from === from && l.to === to);
    if (lnk) setLinkDialog({ from, to, polarity: lnk.polarity, strength: lnk.strength || 3, isNew: false });
  }, [links]);

  // ── Arrow path calculation ────────────────────────────────────────────────
  // Uses cubic bezier with perpendicular offset for curved arrows (CLD convention)
  const getArrowPath = useCallback((
    fx: number, fy: number, tx: number, ty: number, offset = 8
  ) => {
    const dx   = tx - fx, dy = ty - fy;
    const len  = Math.sqrt(dx * dx + dy * dy) || 1;
    const cx   = (fx + tx) / 2 - (dy / len) * offset;
    const cy   = (fy + ty) / 2 + (dx / len) * offset;
    // Shorten endpoint so arrow doesn't overlap circle
    const nx = tx - (dx / len) * 5.5;
    const ny = ty - (dy / len) * 5.5;
    return { d: `M ${fx} ${fy} Q ${cx} ${cy} ${nx} ${ny}`, mx: cx, my: cy };
  }, []);

  // ── Mouse event handlers ─────────────────────────────────────────────────

  // Start dragging a node OR start drawing an arrow (shift+drag)
  const handleNodeMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (editingNodeId) return;
    const pt = getSVGPoint(e);

    if (e.shiftKey || e.altKey) {
      // Shift/Alt+drag = draw arrow FROM this node
      setArrowDraw({ fromId: nodeId, fromX: pt.x, fromY: pt.y, curX: pt.x, curY: pt.y, active: true });
    } else {
      const node = nodes.find(n => n.id === nodeId);
      if (!node) return;
      setDraggingNode({
        id: nodeId,
        startMouseX: pt.x, startMouseY: pt.y,
        startNodeX: Number(node.x), startNodeY: Number(node.y),
      });
    }
  }, [editingNodeId, nodes]);

  const handleSVGMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const pt = getSVGPoint(e);

    if (arrowDraw?.active) {
      setArrowDraw(prev => prev ? { ...prev, curX: pt.x, curY: pt.y } : null);
    }

    if (draggingNode) {
      const dx = pt.x - draggingNode.startMouseX;
      const dy = pt.y - draggingNode.startMouseY;
      onUpdateNodes?.(nodes.map(n =>
        n.id === draggingNode.id
          ? { ...n,
              x: Math.max(5, Math.min(95, draggingNode.startNodeX + dx)),
              y: Math.max(5, Math.min(90, draggingNode.startNodeY + dy)) }
          : n));
    }
  }, [arrowDraw, draggingNode, nodes, onUpdateNodes]);

  const handleSVGMouseUp = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (arrowDraw?.active) {
      const pt = getSVGPoint(e);
      const targetNode = getNodeAt(pt.x, pt.y);
      if (targetNode && targetNode.id !== arrowDraw.fromId) {
        // Check if link already exists
        const existing = links.find(l => l.from === arrowDraw.fromId && l.to === targetNode.id);
        setLinkDialog({
          from: arrowDraw.fromId, to: targetNode.id,
          polarity: existing?.polarity || '+',
          strength: existing?.strength || 3,
          isNew: !existing,
        });
      }
      setArrowDraw(null);
    }
    setDraggingNode(null);
  }, [arrowDraw, links, getNodeAt]);

  // ── Render helpers ───────────────────────────────────────────────────────
  const isEmpty = nodes.length === 0;

  const nodeColorClass = (node: ExtendedCLDNode) => {
    if (node.category) return categoryConfig[node.category]?.bgColor || 'bg-[#064e3b]/100';
    return 'bg-gradient-to-br from-slate-500 to-slate-700';
  };

  // Loop labels derived from findLoops for display
  const detectedLoops = useMemo(() => findLoops(nodes, links), [nodes, links]);

  return (
    <div
      ref={canvasRef}
      className="relative rounded-xl cld-canvas-bg overflow-hidden"
      style={{ minHeight: 500, userSelect: draggingNode ? 'none' : 'auto' }}
    >
      {/* Dot-grid background */}
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* ── SVG layer (links + arrow-draw preview) ─────────────────────── */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 2, cursor: arrowDraw?.active ? 'crosshair' : draggingNode ? 'grabbing' : 'default' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        onMouseMove={handleSVGMouseMove}
        onMouseUp={handleSVGMouseUp}
        onMouseLeave={handleSVGMouseUp}
      >
        <defs>
          {/* Arrow markers — four variants: pos/neg × normal/highlighted */}
          {[
            { id: 'arrow-pos',      fill: '#059669' },
            { id: 'arrow-neg',      fill: '#dc2626' },
            { id: 'arrow-pos-hl',   fill: '#7c3aed' },
            { id: 'arrow-neg-hl',   fill: '#db2777' },
            { id: 'arrow-preview',  fill: '#6366f1' },
          ].map(({ id, fill }) => (
            <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={fill} />
            </marker>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Render links */}
        {links.map((link) => {
          const f = nodes.find(n => n.id === link.from);
          const t = nodes.find(n => n.id === link.to);
          if (!f || !t) return null;
          const key   = `${link.from}-${link.to}`;
          const isHL  = highlightedNodeIds.includes(link.from) && highlightedNodeIds.includes(link.to);
          const isHov = hoveredLinkKey === key;
          const color = isHL ? (link.polarity === '+' ? '#7c3aed' : '#db2777') :
                        link.polarity === '+' ? '#059669' : '#dc2626';
          const markerId = isHL ? (link.polarity === '+' ? 'arrow-pos-hl' : 'arrow-neg-hl') :
                                  (link.polarity === '+' ? 'arrow-pos'    : 'arrow-neg');

          const { d, mx, my } = getArrowPath(Number(f.x), Number(f.y), Number(t.x), Number(t.y));

          return (
            <g key={key}
              onMouseEnter={() => setHoveredLinkKey(key)}
              onMouseLeave={() => setHoveredLinkKey(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Invisible wider hit zone */}
              <path d={d} stroke="transparent" strokeWidth="4" fill="none"
                vectorEffect="non-scaling-stroke" />
              {/* Visible link */}
              <path d={d} stroke={color} strokeWidth={isHov || isHL ? "1.2" : "0.7"} fill="none"
                strokeLinecap="round" vectorEffect="non-scaling-stroke"
                markerEnd={`url(#${markerId})`}
                style={{ filter: isHL ? 'url(#glow)' : 'none', opacity: isHov ? 1 : 0.85, transition: 'all 0.15s' }}
              />
              {/* Polarity badge on midpoint */}
              <g onClick={() => editLink(link.from, link.to)}>
                <circle cx={`${mx}`} cy={`${my}`} r="3.2" fill={color} vectorEffect="non-scaling-stroke"
                  style={{ transition: 'r 0.15s' }} />
                <text x={`${mx}`} y={`${my}`} textAnchor="middle" dominantBaseline="central"
                  fill="white" fontSize="3.5" fontWeight="bold" style={{ userSelect: 'none', pointerEvents: 'none' }}>
                  {link.polarity}
                </text>
              </g>
              {/* Delay indicator */}
              {(link as ExtendedCLDLink).delay ? (
                <g transform={`translate(${mx + 2}, ${my - 2})`}>
                  <circle r="2" fill="#f59e0b" vectorEffect="non-scaling-stroke" />
                  <text textAnchor="middle" dominantBaseline="central" fill="white" fontSize="2.5"
                    style={{ userSelect: 'none', pointerEvents: 'none' }}>‖</text>
                </g>
              ) : null}
              {/* Delete hit area on hover */}
              {isHov && (
                <g transform={`translate(${mx - 6}, ${my - 4})`}
                  onClick={(e) => { e.stopPropagation(); deleteLink(link.from, link.to); }}
                  style={{ cursor: 'pointer' }}>
                  <circle cx="4" cy="4" r="3.5" fill="#ef4444" vectorEffect="non-scaling-stroke" />
                  <text x="4" y="4" textAnchor="middle" dominantBaseline="central"
                    fill="white" fontSize="4" style={{ userSelect: 'none' }}>×</text>
                </g>
              )}
            </g>
          );
        })}

        {/* Arrow-draw preview line */}
        {arrowDraw?.active && (() => {
          const f = nodes.find(n => n.id === arrowDraw.fromId);
          if (!f) return null;
          const { d } = getArrowPath(Number(f.x), Number(f.y), arrowDraw.curX, arrowDraw.curY, 4);
          return (
            <path d={d} stroke="#6366f1" strokeWidth="0.8" strokeDasharray="2 1"
              fill="none" markerEnd="url(#arrow-preview)"
              vectorEffect="non-scaling-stroke" style={{ opacity: 0.8 }} />
          );
        })()}

        {/* Loop labels (R1, B1, etc.) — render near detected loops */}
        {detectedLoops.slice(0, 4).map((loop, idx) => {
          const loopNodes = loop.nodeIds.map(id => nodes.find(n => n.id === id)).filter(Boolean) as ExtendedCLDNode[];
          if (loopNodes.length === 0) return null;
          const cx = loopNodes.reduce((s, n) => s + Number(n.x), 0) / loopNodes.length;
          const cy = loopNodes.reduce((s, n) => s + Number(n.y), 0) / loopNodes.length;
          const fill = loop.type === 'R' ? '#059669' : '#d97706';
          return (
            <g key={`loop-${idx}`}>
              <circle cx={cx} cy={cy} r="3" fill={fill} opacity="0.15" vectorEffect="non-scaling-stroke" />
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
                fill={fill} fontSize="2.8" fontWeight="bold"
                style={{ userSelect: 'none', pointerEvents: 'none' }}>
                {loop.type}{idx + 1}
              </text>
            </g>
          );
        })}
      </svg>

      {/* ── Node layer (HTML absolutely positioned) ─────────────────────── */}
      {nodes.map((node, idx) => {
        const isHL   = highlightedNodeIds.includes(node.id);
        const isHov  = hoveredNodeId === node.id;
        const isEdit = editingNodeId === node.id;
        const isDrg  = draggingNode?.id === node.id;
        const isArrowSrc = arrowDraw?.fromId === node.id;

        return (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{
              left: `${node.x}%`, top: `${node.y}%`, zIndex: isDrg ? 20 : 10,
              animation: isDrg ? 'none' : `cldNodeIn 0.35s ease-out ${Math.min(idx * 0.04, 0.4)}s both`,
            }}
            onMouseEnter={() => setHoveredNodeId(node.id)}
            onMouseLeave={() => setHoveredNodeId(null)}
          >
            {/* Main node pill */}
            <div
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
              onClick={() => !draggingNode && setEditingNodeId(node.id)}
              title={
                isEdit ? '' :
                'Click to edit label • Shift+drag to draw arrow • Drag to move'
              }
              className={cn(
                'min-w-[72px] max-w-[120px] rounded-full px-3 py-2 shadow-md border-2',
                'flex items-center justify-center text-white text-[11px] font-semibold text-center',
                'transition-all duration-150 select-none',
                isDrg ? 'cursor-grabbing scale-105 shadow-xl' : 'cursor-grab hover:scale-105 hover:shadow-lg',
                isHL
                  ? 'border-violet-400 ring-4 ring-violet-300/50 ring-offset-1 scale-110'
                  : isArrowSrc
                  ? 'border-indigo-400 ring-2 ring-indigo-300'
                  : 'border-white/70',
                node.category
                  ? categoryConfig[node.category]?.bgColor
                  : 'bg-gradient-to-br from-slate-500 to-slate-700',
              )}
            >
              {isEdit ? (
                <input
                  autoFocus
                  value={node.label}
                  onChange={e => updateLabel(node.id, e.target.value)}
                  onBlur={() => setEditingNodeId(null)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') setEditingNodeId(null); }}
                  className="bg-white text-slate-900 rounded px-1 py-0.5 text-[11px] text-center w-full outline-none ring-2 ring-[#C9A84C]"
                  onClick={e => e.stopPropagation()}
                  style={{ minWidth: 60, maxWidth: 100 }}
                />
              ) : (
                <span className="leading-tight break-words hyphens-auto">{node.label}</span>
              )}
            </div>

            {/* Leverage badge */}
            {isHL && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
                <span className="text-[9px] font-bold bg-violet-600 text-white px-1.5 py-0.5 rounded-full shadow">⚡ leverage</span>
              </div>
            )}

            {/* Hover action bar — draw arrow, delete */}
            {isHov && !isEdit && !isDrg && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-1 items-center animate-in fade-in duration-100">
                <button
                  onMouseDown={e => {
                    e.stopPropagation();
                    const pt = getSVGPoint(e);
                    setArrowDraw({ fromId: node.id, fromX: Number(node.x), fromY: Number(node.y), curX: Number(node.x), curY: Number(node.y), active: true });
                  }}
                  className="w-6 h-6 bg-indigo-500 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform text-[10px] font-bold"
                  title="Draw arrow (or Shift+drag)"
                >→</button>
                <button
                  onClick={e => { e.stopPropagation(); deleteNode(node.id); }}
                  className="w-6 h-6 bg-red-500/100 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  title="Delete node"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* ── Empty state ──────────────────────────────────────────────────── */}
      {isEmpty && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none" style={{ zIndex: 1 }}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center mb-3 animate-pulse">
            <GitBranch className="w-8 h-8 text-[#C9A84C]" />
          </div>
          <h4 className="font-semibold text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Map your causal system</h4>
          <p className="text-xs text-[#64748b] dark:text-[#64748b]/80 max-w-xs leading-relaxed mb-2">
            Click <strong className="text-[#C9A84C]">Build from SWOT</strong> to auto-generate, apply an archetype, or <strong className="text-[#C9A84C]">Add Node</strong> to start from scratch.
          </p>
          <p className="text-[11px] text-[#64748b]/80 dark:text-[#64748b] max-w-xs">
            <span className="font-semibold">Shift+drag</span> a node to draw an arrow. <span className="font-semibold">Drag</span> to reposition. Click the <span className="font-semibold text-[#34d399]">+</span> / <span className="font-semibold text-red-400">−</span> badge to edit polarity.
          </p>
        </div>
      )}

      {/* ── Toolbar: top-left ────────────────────────────────────────────── */}
      <div className="absolute top-3 left-3 flex gap-2 flex-wrap" style={{ zIndex: 15 }}>
        <button onClick={() => setShowHelp(v => !v)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/90 dark:bg-[#022c22]/60/90 backdrop-blur border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 text-[#ecfdf5]/80 dark:text-[#64748b] text-xs font-medium hover:bg-white dark:hover:bg-[#022c22]/40 hover:shadow-md transition-all">
          <BookOpen className="w-3.5 h-3.5 text-[#C9A84C]" />
          {showHelp ? 'Hide guide' : 'How to use'}
        </button>
        {detectedLoops.length > 0 && (
          <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#059669]/10 dark:bg-emerald-900/30 border border-[#059669]/20 dark:border-emerald-700 text-[#34d399] dark:text-[#6ee7b7] text-xs font-medium">
            <GitBranch className="w-3 h-3" />
            {detectedLoops.filter(l => l.type === 'R').length}R · {detectedLoops.filter(l => l.type === 'B').length}B loops
          </span>
        )}
      </div>

      {/* ── Help panel ──────────────────────────────────────────────────── */}
      {showHelp && (
        <div className="absolute top-14 left-3 right-3 md:right-auto md:max-w-[340px] bg-white/97 dark:bg-[#022c22]/60/97 backdrop-blur rounded-xl shadow-xl border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 p-4 z-20 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-semibold text-sm text-[#E8C560] dark:text-[#ecfdf5] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#C9A84C]" /> CLD Builder Guide
            </h4>
            <button onClick={() => setShowHelp(false)} className="text-[#64748b]/80 hover:text-[#ecfdf5]/80"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-2 text-xs text-[#ecfdf5]/80 dark:text-[#64748b]">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#064e3b]/10 dark:bg-[#022c22]/40/50 rounded-lg p-2">
                <p className="font-bold text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Adding nodes</p>
                <p>Click <strong>"Add Node"</strong> (bottom-right) or <strong>"Build from SWOT"</strong> to auto-populate.</p>
              </div>
              <div className="bg-[#064e3b]/10 dark:bg-[#022c22]/40/50 rounded-lg p-2">
                <p className="font-bold text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Drawing arrows</p>
                <p><strong>Shift+drag</strong> from a node, or hover → click the <span className="text-indigo-400 font-bold">→</span> button.</p>
              </div>
              <div className="bg-[#064e3b]/10 dark:bg-[#022c22]/40/50 rounded-lg p-2">
                <p className="font-bold text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Moving nodes</p>
                <p>Just <strong>drag</strong> any node to reposition it freely on the canvas.</p>
              </div>
              <div className="bg-[#064e3b]/10 dark:bg-[#022c22]/40/50 rounded-lg p-2">
                <p className="font-bold text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Editing arrows</p>
                <p>Click the <span className="text-[#34d399] font-bold">+</span>/<span className="text-red-500 font-bold">−</span> badge to toggle polarity or change strength. Hover → <span className="text-red-500">×</span> to delete.</p>
              </div>
            </div>
            <div className="bg-[#C9A84C]/10 dark:bg-blue-900/20 rounded-lg p-2 border border-blue-100 dark:border-blue-800">
              <p className="font-semibold text-[#C9A84C] dark:text-[#E8C560] mb-0.5">CLD conventions</p>
              <p><span className="text-[#34d399] font-bold">+ (reinforcing)</span> — A↑ causes B↑. <span className="text-red-500 font-bold">− (balancing)</span> — A↑ causes B↓. Even number of (−) in a loop = <strong>Reinforcing loop (R)</strong>. Odd = <strong>Balancing loop (B)</strong>.</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-[#64748b] dark:text-[#64748b]/80 pt-1">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#059669] rounded inline-block"/><span className="w-0 h-0 border-l-2 border-r-0 border-t-2 border-b-2 border-transparent border-l-emerald-500 inline-block -ml-0.5 mr-1"/>Reinforcing (+)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-500/100 rounded inline-block"/><span className="w-0 h-0 border-l-2 border-r-0 border-t-2 border-b-2 border-transparent border-l-red-500 inline-block -ml-0.5 mr-1"/>Balancing (−)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500/100 inline-block"/>Delay</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Legend: bottom-left ──────────────────────────────────────────── */}
      <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-[#022c22]/60/90 backdrop-blur rounded-lg px-3 py-2 text-xs text-[#ecfdf5]/80 dark:text-[#64748b] flex flex-wrap gap-3 shadow-md border border-[#C9A84C]/20 dark:border-[#C9A84C]/20" style={{ zIndex: 15 }}>
        <span className="flex items-center gap-1.5 font-medium"><span className="w-3 h-0.5 bg-[#059669] rounded" />Reinforcing (+)</span>
        <span className="flex items-center gap-1.5 font-medium"><span className="w-3 h-0.5 bg-red-500/100 rounded" />Balancing (−)</span>
        {highlightedNodeIds.length > 0 && (
          <span className="flex items-center gap-1.5 font-medium text-violet-600 dark:text-violet-400">
            <Circle className="w-2.5 h-2.5 fill-violet-500 text-violet-500" />Leverage target
          </span>
        )}
        {arrowDraw?.active && (
          <span className="flex items-center gap-1.5 font-medium text-indigo-600 dark:text-indigo-400 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />Drawing arrow…
          </span>
        )}
      </div>

      {/* ── Add node button: bottom-right ───────────────────────────────── */}
      <button
        onClick={addNode}
        className="absolute bottom-3 right-3 px-3 py-2 rounded-lg bg-gradient-to-r from-[#064e3b] to-[#1e3a5f] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        style={{ zIndex: 15 }}
      >
        <Plus className="w-3.5 h-3.5" /> Add Node
      </button>

      {/* ── Link dialog ──────────────────────────────────────────────────── */}
      {linkDialog && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#022c22]/30 dark:bg-[#022c22]/50 backdrop-blur-sm" style={{ zIndex: 30 }}>
          <div className="bg-white dark:bg-[#022c22]/60 rounded-2xl shadow-2xl p-5 border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 w-full max-w-xs mx-3 animate-in zoom-in-95 duration-200">
            <h3 className="font-semibold text-[#E8C560] dark:text-[#ecfdf5] mb-1 flex items-center gap-2 text-sm">
              <LinkIcon className="w-4 h-4 text-[#C9A84C]" />
              {linkDialog.isNew ? 'Create Relationship' : 'Edit Relationship'}
            </h3>
            <p className="text-[11px] text-[#64748b] dark:text-[#64748b]/80 mb-4">
              <strong>{nodes.find(n => n.id === linkDialog.from)?.label}</strong>
              {' → '}
              <strong>{nodes.find(n => n.id === linkDialog.to)?.label}</strong>
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#ecfdf5]/80 dark:text-[#64748b] block mb-1.5">
                  Polarity — how does the cause affect the effect?
                </label>
                <div className="flex gap-2">
                  {(['+', '-'] as const).map(p => (
                    <button key={p}
                      onClick={() => setLinkDialog({ ...linkDialog, polarity: p })}
                      className={cn('flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all',
                        linkDialog.polarity === p
                          ? p === '+' ? 'bg-[#059669] text-white shadow-md' : 'bg-red-500/100 text-white shadow-md'
                          : 'bg-[#064e3b]/20 dark:bg-[#022c22]/40 text-[#ecfdf5]/80 dark:text-[#64748b] hover:bg-slate-200 dark:hover:bg-slate-600'
                      )}>
                      {p === '+' ? '+ Reinforcing (same direction)' : '− Balancing (opposite direction)'}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-[#64748b]/80 dark:text-[#64748b] mt-1">
                  {linkDialog.polarity === '+'
                    ? 'When cause increases, effect also increases (and vice versa).'
                    : 'When cause increases, effect decreases (and vice versa).'}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#ecfdf5]/80 dark:text-[#64748b] block mb-1.5">
                  Link Strength (1 = weak, 5 = strong)
                </label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(v => (
                    <button key={v}
                      onClick={() => setLinkDialog({ ...linkDialog, strength: v })}
                      className={cn('flex-1 py-1.5 rounded text-xs font-bold transition-all border',
                        v <= linkDialog.strength
                          ? 'bg-indigo-500 text-white border-indigo-600'
                          : 'bg-[#064e3b]/20 dark:bg-[#022c22]/40 text-[#64748b]/80 border-[#C9A84C]/20 dark:border-[#C9A84C]/20'
                      )}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={confirmLink}
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#064e3b] to-[#1e3a5f] text-white text-sm font-semibold hover:shadow-lg transition-all">
                  {linkDialog.isNew ? 'Add Arrow' : 'Update'}
                </button>
                {!linkDialog.isNew && (
                  <button onClick={() => { deleteLink(linkDialog.from, linkDialog.to); setLinkDialog(null); }}
                    className="px-3 py-2 rounded-lg bg-red-500/10 dark:bg-red-900/30 hover:bg-red-500/100/10 dark:hover:bg-red-900/50 text-red-400 dark:text-red-400 text-sm font-medium transition-colors">
                    Delete
                  </button>
                )}
                <button onClick={() => setLinkDialog(null)}
                  className="px-3 py-2 rounded-lg bg-[#064e3b]/20 dark:bg-[#022c22]/40 hover:bg-slate-200 dark:hover:bg-slate-600 text-[#ecfdf5]/80 dark:text-[#64748b] text-sm font-medium transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes cldNodeIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
};

const SnapshotsPanel: React.FC<{
  snapshots: CLDSnapshot[];
  activeSnapshotId: string | undefined;
  onSaveSnapshot: (name: string) => void;
  onLoadSnapshot: (id: string) => void;
  onDeleteSnapshot: (id: string) => void;
  renameSnapshot?: (id: string, newName: string) => void;
}> = ({ snapshots, activeSnapshotId, onSaveSnapshot, onLoadSnapshot, onDeleteSnapshot, renameSnapshot }) => {
  const [showSaveDialog,   setShowSaveDialog]   = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState<string | null>(null);
  const [newSnapshotName,  setNewSnapshotName]  = useState('');

  const handleSave = useCallback(() => {
    if (newSnapshotName.trim()) {
      onSaveSnapshot(newSnapshotName.trim());
      setNewSnapshotName('');
      setShowSaveDialog(false);
    }
  }, [newSnapshotName, onSaveSnapshot]);

  const handleRename = useCallback(() => {
    if (showRenameDialog && newSnapshotName.trim()) {
      renameSnapshot?.(showRenameDialog, newSnapshotName.trim());
      setNewSnapshotName('');
      setShowRenameDialog(null);
    }
  }, [showRenameDialog, newSnapshotName, renameSnapshot]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button onClick={() => setShowSaveDialog(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#C9A84C] hover:bg-blue-600 text-white text-xs font-semibold transition-colors shadow-sm">
          <Save className="w-3.5 h-3.5" /> Save Snapshot
        </button>

        <div className="relative">
          <select value="" onChange={(e) => { if (e.target.value) { onLoadSnapshot(e.target.value); e.target.value = ''; } }}
            className="appearance-none flex items-center gap-1.5 px-3 pr-8 py-2 rounded-lg bg-[#064e3b]/20 dark:bg-[#022c22]/60 hover:bg-slate-200 text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] text-xs font-medium transition-colors cursor-pointer border border-[#C9A84C]/20 dark:border-[#C9A84C]/20">
            <option value="">Load Snapshot...</option>
            {snapshots.map(snap => (
              <option key={snap.id} value={snap.id}>
                {snap.id === activeSnapshotId ? '• ' : ''}{snap.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#64748b]/80 dark:text-[#64748b] pointer-events-none" />
        </div>
      </div>

      {snapshots.length > 0 && (
        <div className="border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-lg bg-[#064e3b]/10 dark:bg-[#022c22] p-2 max-h-32 overflow-y-auto">
          {snapshots.map(snap => (
            <div key={snap.id} className="flex items-center justify-between px-2 py-1 text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">
              <span className={cn('truncate flex-1', snap.id === activeSnapshotId && 'text-[#C9A84C] font-semibold')}
                title={snap.id === activeSnapshotId ? 'Active' : ''}>
                {snap.id === activeSnapshotId ? '✓ ' : ''}{snap.label}
              </span>
              {snap.id !== activeSnapshotId && (
                <div className="flex items-center gap-1">
                  <button onClick={() => { setShowRenameDialog(snap.id); setNewSnapshotName(snap.label); }}
                    className="text-[#64748b]/80 dark:text-[#64748b] hover:text-[#C9A84C]" title="Rename">
                    <FileText className="w-3 h-3" />
                  </button>
                  <button onClick={() => onDeleteSnapshot(snap.id)}
                    className="text-[#64748b]/80 dark:text-[#64748b] hover:text-red-500" title="Delete">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showSaveDialog && (
        <div className="fixed inset-0 bg-[#022c22]/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#022c22]/60/60 rounded-2xl shadow-2xl p-5 border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 w-full max-w-sm mx-3 animate-in zoom-in-95 duration-200">
            <h3 className="font-semibold text-[#E8C560] dark:text-[#ecfdf5] mb-4 flex items-center gap-2"><Save className="w-5 h-5 text-[#C9A84C]" /> Save CLD Snapshot</h3>
            <input autoFocus value={newSnapshotName} onChange={e => setNewSnapshotName(e.target.value)}
              placeholder="Enter snapshot name..."
              className="w-full px-3 py-2 border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setShowSaveDialog(false); }} />
            <div className="flex gap-2">
              <button onClick={handleSave} disabled={!newSnapshotName.trim()} className="flex-1 py-2 rounded-lg bg-[#C9A84C] text-white text-sm font-semibold disabled:opacity-50">Save</button>
              <button onClick={() => setShowSaveDialog(false)} className="px-4 py-2 rounded-lg bg-[#064e3b]/20 dark:bg-[#022c22]/60 hover:bg-slate-200 text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showRenameDialog && (
        <div className="fixed inset-0 bg-[#022c22]/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#022c22]/60/60 rounded-2xl shadow-2xl p-5 border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 w-full max-w-sm mx-3 animate-in zoom-in-95 duration-200">
            <h3 className="font-semibold text-[#E8C560] dark:text-[#ecfdf5] mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-[#C9A84C]" /> Rename Snapshot</h3>
            <input autoFocus value={newSnapshotName} onChange={e => setNewSnapshotName(e.target.value)}
              placeholder="Enter new name..."
              className="w-full px-3 py-2 border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              onKeyDown={e => { if (e.key === 'Enter') handleRename(); if (e.key === 'Escape') setShowRenameDialog(null); }} />
            <div className="flex gap-2">
              <button onClick={handleRename} disabled={!newSnapshotName.trim()} className="flex-1 py-2 rounded-lg bg-[#C9A84C] text-white text-sm font-semibold disabled:opacity-50">Rename</button>
              <button onClick={() => setShowRenameDialog(null)} className="px-4 py-2 rounded-lg bg-[#064e3b]/20 dark:bg-[#022c22]/60 hover:bg-slate-200 text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── AI ANALYSIS SIDE PANEL ────────────────────────────────────────────────────

interface AnalysisSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: ExtendedCLDNode[];
  links: ExtendedCLDLink[];
  selectedStrategies: string[];
  onExecute: (nodes: ExtendedCLDNode[], links: ExtendedCLDLink[], strategies: string[]) => Promise<AIAnalysisResponse>;
}

const AnalysisSidePanel: React.FC<AnalysisSidePanelProps> = ({
  isOpen, onClose, nodes, links, selectedStrategies, onExecute,
}) => {
  const [analysisData, setAnalysisData] = useState<AIAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) { setAnalysisData(null); setLoading(false); setError(null); }
  }, [isOpen]);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await onExecute(nodes, links, selectedStrategies);
      setAnalysisData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-white dark:bg-[#022c22]/60/60 shadow-2xl border-l border-[#C9A84C]/20 dark:border-[#C9A84C]/20 z-50 flex flex-col">
      <div className="p-4 border-b border-[#C9A84C]/20 dark:border-[#C9A84C]/20 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="font-semibold text-[#E8C560] dark:text-[#ecfdf5]">AI Strategy Assistant</h3>
        </div>
        <button onClick={onClose} className="text-[#64748b]/80 dark:text-[#64748b] hover:text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]"><X className="w-5 h-5" /></button>
      </div>

      {!analysisData && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Brain className="w-12 h-12 text-[#64748b] mb-3" />
          <h4 className="font-semibold text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-2">Ready to Analyze</h4>
          <p className="text-sm text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] mb-4">Build your CLD, select strategies, then click "Analyze Loops"</p>
          <button onClick={handleAnalyze} disabled={nodes.length < 2} className="px-4 py-2 bg-[#C9A84C] text-white rounded-lg font-medium disabled:opacity-50">
            Analyze Loops
          </button>
        </div>
      )}

      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <RefreshCw className="w-8 h-8 text-[#C9A84C] animate-spin mb-3" />
          <p className="text-sm text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">Analyzing your strategy model...</p>
        </div>
      )}

      {error && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mb-3" />
          <p className="text-sm text-red-400 font-medium mb-2">Analysis Failed</p>
          <p className="text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] mb-4">{error}</p>
          <button onClick={handleAnalyze} className="px-4 py-2 bg-[#C9A84C] text-white rounded-lg text-sm font-medium">Try Again</button>
        </div>
      )}

      {analysisData && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <section>
            <h4 className="font-semibold text-sm text-[#E8C560] dark:text-[#ecfdf5] mb-3 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#C9A84C]" /> Detected Loops ({analysisData.detected_loops.length})
            </h4>
            <div className="space-y-2">
              {analysisData.detected_loops.map((loop, idx) => (
                <div key={idx} className="rounded-lg border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 bg-[#064e3b]/10 dark:bg-[#022c22] p-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${loop.type === 'R' ? 'bg-[#059669]/10 text-[#34d399]' : 'bg-amber-500/100/10 text-amber-400'}`}>
                      {loop.type}
                    </span>
                    <span className="text-xs text-[#E8C560]/90 dark:text-[#ecfdf5]/90 truncate flex-1">{loop.name}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">
                    <span>Strength: {loop.strength}/5</span>
                    <span>{loop.nodeIds.length} nodes</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="font-semibold text-sm text-[#E8C560] dark:text-[#ecfdf5] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-500" /> Dominant Archetypes ({analysisData.dominant_archetypes.length})
            </h4>
            <div className="space-y-2">
              {analysisData.dominant_archetypes.map((arch, idx) => (
                <div key={idx} className="rounded-lg border border-violet-200 bg-violet-50 p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-violet-800">{arch.archetypeName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-200 text-violet-700">{Math.round(arch.confidence * 100)}%</span>
                  </div>
                  <p className="text-[10px] text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] mt-1">Matched nodes: {arch.matchedNodes.length}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="font-semibold text-sm text-[#E8C560] dark:text-[#ecfdf5] mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-red-500" /> Ranked Leverage Points ({analysisData.ranked_leverage_points.length})
            </h4>
            <div className="space-y-2">
              {analysisData.ranked_leverage_points.slice(0, 5).map((point, idx) => (
                <div key={idx} className="rounded-lg border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 bg-white dark:bg-[#022c22]/60/60 p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-red-500/100 text-white">L{point.leverageLevel}</span>
                    <span className="text-[10px] text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">{MEADOWS_LEVELS[point.leverageLevel]?.name || ''}</span>
                  </div>
                  <p className="text-xs text-[#E8C560]/90 dark:text-[#ecfdf5]/90 leading-relaxed">{point.intervention}</p>
                </div>
              ))}
            </div>
          </section>

          {analysisData.recommendations && analysisData.recommendations.length > 0 && (
            <section>
              <h4 className="font-semibold text-sm text-[#E8C560] dark:text-[#ecfdf5] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> AI Recommendations
              </h4>
              <ul className="space-y-2">
                {analysisData.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] flex items-start gap-2">
                    <ArrowRight className="w-3 h-3 text-[#C9A84C] shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const SystemsThinking: React.FC<SystemsThinkingProps> = ({ plan, onUpdateItem, planId }) => {
  const {
    saveCLDSnapshot,
    loadCLDSnapshot,
    renameCLDSnapshot,
    deleteCLDSnapshot,
    toggleArchetype,
  } = useStrategicPlan();

  const [viewMode,           setViewMode]           = useState<'matrix' | 'impact' | 'cld'>('matrix');
  const [showGuide,          setShowGuide]          = useState(false);
  const [selectedArchId,     setSelectedArchId]     = useState<string | null>(null);
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<string[]>([]);
  const [cldSubView,         setCldSubView]         = useState<'diagram' | 'leverage'>('diagram');
  const [analysisPanelOpen,  setAnalysisPanelOpen]  = useState(false);

  const [localCldNodes, setLocalCldNodes] = useState<ExtendedCLDNode[]>([]);
  const [localCldLinks, setLocalCldLinks] = useState<ExtendedCLDLink[]>([]);

  useEffect(() => {
    if (plan.cldNodes && plan.cldNodes.length > 0) setLocalCldNodes(plan.cldNodes);
    if (plan.cldLinks && plan.cldLinks.length > 0) {
      // Convert store representation (boolean delay, categorical strength) to
      // the canvas editor's numeric representation.
      setLocalCldLinks(plan.cldLinks.map((l) => ({
        ...l,
        delay: l.delay ? 1 : 0,
        strength: l.strength === 'strong' ? 5 : l.strength === 'weak' ? 1 : 3,
      })));
    }
  }, [plan.cldNodes, plan.cldLinks, planId]);

  const buildFromSWOT = useCallback(() => {
    const allItems = plan.swotItems || [];
    const colCount = Math.min(3, allItems.length);
    const nodes = allItems.map((item, i) => ({
      id: `swot-${item.id}`,
      label: item.description.length > 28 ? item.description.slice(0, 28) + '…' : item.description,
      x: 15 + (i % colCount) * (70 / Math.max(colCount - 1, 1)),
      y: 15 + Math.floor(i / colCount) * 30,
      category: item.category,
      nodeType: 'default' as const,
    }));

    const links: ExtendedCLDLink[] = [];
    const s = nodes.filter(n => n.category === 'strength');
    const w = nodes.filter(n => n.category === 'weakness');
    const o = nodes.filter(n => n.category === 'opportunity');
    const t = nodes.filter(n => n.category === 'threat');
    s.slice(0, 2).forEach((sn, i) => { const opp = o[i % Math.max(o.length, 1)]; if (opp) links.push({ from: sn.id, to: opp.id, polarity: '+', strength: 3 }); });
    w.slice(0, 2).forEach((wn, i) => { const th  = t[i % Math.max(t.length, 1)];  if (th)  links.push({ from: wn.id, to: th.id,  polarity: '+', strength: 3 }); });
    t.slice(0, 1).forEach(tn => { const sn = s[0]; if (sn) links.push({ from: tn.id, to: sn.id, polarity: '-', strength: 2 }); });
    o.slice(0, 1).forEach(on => { const wn = w[0]; if (wn) links.push({ from: on.id, to: wn.id, polarity: '-', strength: 2 }); });

    setLocalCldNodes(nodes);
    setLocalCldLinks(links);
    setViewMode('cld');
  }, [plan.swotItems]);

  const applyArchetype = useCallback((archId: string) => {
    const arch = systemArchetypes.find(a => a.id === archId);
    if (!arch) return;
    const nodes: ExtendedCLDNode[] = arch.nodeLabels.map((label, i) => ({
      id: `arch-${arch.id}-${i}`, label,
      x: 15 + (i % 3) * 35, y: 20 + Math.floor(i / 3) * 35, nodeType: 'default' as const,
    }));
    const nodeMap = Object.fromEntries(arch.nodeLabels.map((l, i) => [l, nodes[i].id]));
    const links: ExtendedCLDLink[] = arch.loops
      .filter(l => nodeMap[l.from] && nodeMap[l.to])
      .map(l => ({ from: nodeMap[l.from], to: nodeMap[l.to], polarity: l.polarity, strength: 3 }));
    setLocalCldNodes(nodes);
    setLocalCldLinks(links);
    setSelectedArchId(archId);
    setHighlightedNodeIds([]);
  }, []);

  // Leverage point generators (mirrored for leverageCount badge)
  const generateArchetypeLeveragePoints = (archetypeId: string, nodes: ExtendedCLDNode[], links: ExtendedCLDLink[]): LeveragePoint[] => {
    const base: (Omit<LeveragePoint, 'targetNodeIds'> & { targetFilter: (label: string) => boolean })[] = [];
    const push = (leverageLevel: number, intervention: string, expectedImpact: 'high' | 'medium' | 'low', timeHorizon: 'short' | 'medium' | 'long', targetFilter: (label: string) => boolean) =>
      base.push({ archetypeId, leverageLevel, meadowsName: MEADOWS_LEVELS[leverageLevel]?.name || '', intervention, expectedImpact, timeHorizon, source: 'archetype', targetFilter });

    switch (archetypeId) {
      case 'ltg': push(10,'Remove structural constraint: invest in capacity expansion before growth stalls','high','medium',l=>/limit|constrain|capacit/i.test(l)); push(7,'Strengthen growth engine: accelerate virtuous cycle while constraint is still loose','high','short',l=>/growing|growth|perform/i.test(l)); push(8,'Increase balancing feedback sensitivity to identify bottlenecks earlier','medium','medium',l=>/constrain|limit/i.test(l)); break;
      case 'stb': push(5,'Change incentive rules: make symptomatic fixes more costly; reward root-cause solutions','high','medium',l=>/symptom|fix/i.test(l)); push(8,'Strengthen B2 loop: resource fundamental solutions, reduce symptomatic fix dependency','high','long',l=>/fundamental/i.test(l)); push(6,'Improve information flow: make root causes more visible to decision-makers','medium','short',l=>/problem|symptom/i.test(l)); break;
      case 'dg':  push(3,'Hold goal firm: make goal-setting process independent of performance pressure','high','medium',l=>/goal|target/i.test(l)); push(8,'Strengthen corrective action loop: reduce response time to performance gaps','medium','short',l=>/corrective|action/i.test(l)); push(6,'Improve performance visibility: make gap transparent and undeniable','high','short',l=>/gap|perform/i.test(l)); break;
      case 'esc': push(2,'Paradigm shift: reframe from zero-sum to mutual-gain; seek win-win agreements','high','long',_=>true); push(7,'Reduce gain: unilateral de-escalation to break the reinforcing cycle','medium','short',l=>/actions|advantage/i.test(l)); push(5,'Establish rules: mutual escalation caps or third-party arbitration','high','medium',_=>true); break;
      case 'sts': push(7,'Reduce positive feedback gain: diversify resource allocation away from winner','high','medium',l=>/resource/i.test(l)); push(5,'Level playing field: create rules that redistribute advantage periodically','high','long',_=>true); push(6,'Improve information flow: make resource concentration visible and measurable','medium','short',l=>/success/i.test(l)); break;
      case 'toc': push(5,'Establish shared governance rules: quotas, agreements, mutual restraint','high','medium',_=>true); push(4,'Enable self-organization: allow actors to collectively set and enforce limits','high','long',l=>/commons|shared/i.test(l)); push(6,'Add information flows: make total usage and depletion rate visible to all actors','high','short',l=>/total|commons/i.test(l)); break;
      case 'ftf': push(9,'Shorten delay: make unintended consequences visible faster','medium','short',l=>/delay|unintended/i.test(l)); push(6,'Add feedback: create early warning system for side effects before they compound','high','medium',l=>/unintended|consequence/i.test(l)); push(3,'Redefine success metrics to include long-term side effects','high','long',l=>/problem|fix/i.test(l)); break;
      case 'gui': push(10,'Invest ahead of demand: build capacity infrastructure before gap widens','high','medium',l=>/capacit|invest/i.test(l)); push(3,'Hold performance standards firm: resist lowering goals when capacity lags','high','medium',l=>/standard|perform/i.test(l)); push(7,'Moderate growth engine temporarily to allow capacity to catch up','medium','short',l=>/growth|demand/i.test(l)); break;
      case 'aa':  push(2,'Paradigm shift: make partnership goals explicit and align incentive structures','high','long',_=>true); push(6,'Create shared information flows: transparent reporting on mutual impacts','high','medium',l=>/success|action/i.test(l)); push(5,'Establish coordination rules: joint decision-making for actions with cross-impact','high','medium',_=>true); break;
      case 'ap':  push(10,'Expand capacity infrastructure to absorb new entrants without quality loss','high','medium',l=>/congestion|load/i.test(l)); push(8,'Strengthen quality feedback: make congestion impact on attractiveness more responsive','medium','short',l=>/quality|perform/i.test(l)); push(5,'Manage entry rules: metered access, waitlists, or capacity-linked growth','high','medium',l=>/entrant|demand/i.test(l)); break;
      default: break;
    }
    return base.map(b => ({ ...b, targetNodeIds: nodes.filter(n => b.targetFilter(n.label)).map(n => n.id) }));
  };

  const generateCLDLeveragePoints = (nodes: ExtendedCLDNode[], links: ExtendedCLDLink[]): LeveragePoint[] => {
    const pts: LeveragePoint[] = [];
    const loops = findLoops(nodes, links);
    loops.filter(l => l.type === 'R' && l.strength >= 4).forEach(loop => {
      pts.push({ leverageLevel: 7, meadowsName: MEADOWS_LEVELS[7].name, intervention: `Slow positive feedback in "${loop.name}" — high gain risks runaway dynamics`, targetNodeIds: loop.nodeIds, expectedImpact: 'high', timeHorizon: 'short', source: 'cld-analysis' });
    });
    loops.filter(l => l.type === 'B' && l.strength < 3).forEach(loop => {
      pts.push({ leverageLevel: 8, meadowsName: MEADOWS_LEVELS[8].name, intervention: `Strengthen balancing loop "${loop.name}" — weak feedback leaves system uncontrolled`, targetNodeIds: loop.nodeIds, expectedImpact: 'medium', timeHorizon: 'medium', source: 'cld-analysis' });
    });
    const isolated = nodes.filter(n => !links.some(l => l.to === n.id) && !links.some(l => l.from === n.id));
    if (isolated.length > 0) pts.push({ leverageLevel: 6, meadowsName: MEADOWS_LEVELS[6].name, intervention: `Add information flows to ${isolated.length} unconnected variable(s)`, targetNodeIds: isolated.map(n => n.id), expectedImpact: 'high', timeHorizon: 'short', source: 'cld-analysis' });
    const delayedLinks = links.filter(l => l.delay && l.delay > 0);
    if (delayedLinks.length > 0) {
      const delayedNodeIds = [...new Set(delayedLinks.flatMap(l => [l.from, l.to]))];
      pts.push({ leverageLevel: 9, meadowsName: MEADOWS_LEVELS[9].name, intervention: `Reduce ${delayedLinks.length} link delay(s)`, targetNodeIds: delayedNodeIds, expectedImpact: 'medium', timeHorizon: 'medium', source: 'cld-analysis' });
    }
    return pts;
  };

  const handleUpdateNodes = useCallback((newNodes: ExtendedCLDNode[]) => setLocalCldNodes(newNodes), []);
  const handleUpdateLinks = useCallback((newLinks: ExtendedCLDLink[]) => setLocalCldLinks(newLinks), []);

  // ── AI Analysis via Kimi Edge Function ─────────────────────────────────────
  const AI_STRATEGY_URL = 'https://lydsisparsmvextskevw.supabase.co/functions/v1/ai-strategy-assistant';

  const executeAIAnalysis = useCallback(async (
    nodes: ExtendedCLDNode[], links: ExtendedCLDLink[], strategies: string[],
  ): Promise<AIAnalysisResponse> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const response = await fetch(AI_STRATEGY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          action: 'analyze_loops',
          data: { nodes, links, selectedStrategies: strategies },
        }),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => 'unknown');
        throw new Error(`Kimi AI error ${response.status}: ${errText.slice(0, 200)}`);
      }

      const result = await response.json();
      if (!result.success) throw new Error(result.error || 'AI analysis failed');
      return (result.data || result) as AIAnalysisResponse;
    } catch (err) {
      console.error('AI analysis error:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to analyze loops');
    }
  }, []);

  // Fall back to the survey-scored baseline when the plan has no SWOT items, so
  // scoring, archetype recommendation and CLD seeding run on real evidence.
  const usingBaseline = !plan.swotItems?.length;
  const evidenceItems = useMemo<SWOTItem[]>(
    () => (plan.swotItems?.length ? plan.swotItems : BIRD_SWOT_BASELINE),
    [plan.swotItems],
  );

  const swot = useMemo(() => ({
    strengths:     evidenceItems.filter(i => i.category === 'strength'),
    weaknesses:    evidenceItems.filter(i => i.category === 'weakness'),
    opportunities: evidenceItems.filter(i => i.category === 'opportunity'),
    threats:       evidenceItems.filter(i => i.category === 'threat'),
  }), [evidenceItems]);

  const allItems = evidenceItems;

  const sortedImpact = useMemo(() =>
    allItems.map(item => ({ ...item, total: (item.impactScore || 3) * (item.likelihoodScore || 3) }))
      .sort((a, b) => b.total - a.total),
  [allItems]);

  const recommendArchetypes = useMemo(() => {
    const s = allItems.filter(i => i.category === 'strength');
    const w = allItems.filter(i => i.category === 'weakness');
    const o = allItems.filter(i => i.category === 'opportunity');
    const t = allItems.filter(i => i.category === 'threat');
    const recs: Array<{ archetypeId: string; reason: string; confidence: 'high' | 'medium' | 'low'; matchedCategories: string[] }> = [];
    if (o.length > 0 && (w.length > 0 || t.length > 0)) recs.push({ archetypeId: 'ltg', confidence: 'high',   matchedCategories: ['opportunity', 'weakness'], reason: `${o.length} growth opportunities constrained by ${w.length + t.length} limiting factors.` });
    if (w.length >= 2)                                   recs.push({ archetypeId: 'stb', confidence: w.length >= 3 ? 'high' : 'medium', matchedCategories: ['weakness'],            reason: `${w.length} recurring weaknesses may mask root causes.` });
    if (t.length >= 2)                                   recs.push({ archetypeId: 'esc', confidence: 'medium', matchedCategories: ['threat'],               reason: `${t.length} competing threats suggest adversarial dynamics.` });
    if (s.filter(x => (x.impactScore || 3) >= 4).length >= 2) recs.push({ archetypeId: 'sts', confidence: 'medium', matchedCategories: ['strength'],        reason: `Multiple high-impact strengths may concentrate resources.` });
    if (w.length >= 2 && t.length >= 1)                  recs.push({ archetypeId: 'ftf', confidence: 'medium', matchedCategories: ['weakness', 'threat'],   reason: `Persisting weaknesses alongside threats suggests problematic fixes.` });
    return recs.slice(0, 4);
  }, [allItems]);

  const addItemToCLD = useCallback((item: SWOTItem) => {
    if (localCldNodes.find(n => n.id === `swot-${item.id}`)) return;
    const newNode: ExtendedCLDNode = {
      id: `swot-${item.id}`,
      label: item.description.length > 28 ? item.description.slice(0, 28) + '…' : item.description,
      x: 20 + (localCldNodes.length % 4) * 20,
      y: 25 + Math.floor(localCldNodes.length / 4) * 30,
      category: item.category, nodeType: 'default',
    };
    setLocalCldNodes(prev => [...prev, newNode]);
    setViewMode('cld');
  }, [localCldNodes]);

  const leverageCount = useMemo(() => {
    const pts: LeveragePoint[] = [];
    if (selectedArchId) pts.push(...generateArchetypeLeveragePoints(selectedArchId, localCldNodes, localCldLinks));
    pts.push(...generateCLDLeveragePoints(localCldNodes, localCldLinks));
    const seen = new Set<string>();
    return pts.filter(p => { const k = `${p.leverageLevel}-${p.intervention.slice(0, 40)}`; if (seen.has(k)) return false; seen.add(k); return true; }).length;
  }, [localCldNodes, localCldLinks, selectedArchId]);

  return (
    <div className="space-y-5 max-w-5xl mx-auto relative">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#E8C560] dark:text-[#ecfdf5]">Systems Thinking</h1>
        <p className="text-sm text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">Score SWOT factors, map causal loops, and apply systems archetypes</p>
      </div>

      {/* ── Archetype Validation (Survey n=76) ────────────────────────────── */}
      {usingBaseline && (
        <div className="rounded-xl border border-[#C9A84C]/30 bg-[#064e3b]/10 dark:bg-[#022c22]/60 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">
                Validation Survey · Sections 3–11
              </span>
              <h2 className="text-base font-bold text-[#E8C560] dark:text-[#ecfdf5]">
                How Accurately Do These Archetypes Describe BARMM?
              </h2>
            </div>
            <span className="text-xs text-[#64748b] dark:text-[#a7f3d0]/70 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-3 py-1">
              n = {SYSTEMS_SIGNALS.n} · {SYSTEMS_SIGNALS.window}
            </span>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-red-500/35 bg-red-500/10 px-3 py-2 mb-4">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
            <p className="text-[0.72rem] leading-relaxed text-red-600 dark:text-red-300">
              <strong>Zero respondents from {SYSTEMS_SIGNALS.silentProvinces.join(', ')}.</strong> Non-probability
              convenience sample — validation signals, not population estimates. Loops that depend on maritime or
              island-province dynamics are unvalidated.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-1">
            {ARCHETYPE_VALIDATION.map(a => {
              const strong = a.meanScore >= 3.0;
              const weak   = a.meanScore < 2.75;
              const color  = strong ? '#10b981' : weak ? '#ef4444' : '#C9A84C';
              return (
                <div key={a.field} className="mb-2.5">
                  <div className="flex justify-between items-baseline gap-2 mb-1">
                    <span className="text-xs text-[#334155] dark:text-[#d1fae5]/85 truncate">
                      {a.label}
                      {a.archetypeId && (
                        <span className="ml-1.5 text-[0.6rem] uppercase tracking-wider text-[#94a3b8] dark:text-[#ecfdf5]/30">
                          {a.archetypeId}
                        </span>
                      )}
                    </span>
                    <span className="text-xs font-bold tabular-nums flex-shrink-0" style={{ color }}>
                      {a.meanScore.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#e2e8f0] dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(2, (a.meanScore / 4) * 100)}%`, background: color }}
                    />
                  </div>
                  <div className="text-[0.6rem] text-[#94a3b8] dark:text-[#ecfdf5]/28 mt-0.5">
                    {a.pctAccurate}% rated it accurate or better · {a.pctRevision}% want revision · n={a.n}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] mb-2">
                Critical moral-governance lever
              </h3>
              {SYSTEMS_SIGNALS.moralGovernanceLever.map(m => (
                <div key={m.label} className="mb-2">
                  <div className="flex justify-between items-baseline gap-2 mb-1">
                    <span className="text-xs text-[#334155] dark:text-[#d1fae5]/80 truncate">{m.label}</span>
                    <span className="text-xs font-bold tabular-nums text-[#3b82f6]">{m.n}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#e2e8f0] dark:bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-[#3b82f6]" style={{ width: `${(m.n / 42) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#10b981] mb-2">
                Readiness by BEIE cluster (1–5)
              </h3>
              {SYSTEMS_SIGNALS.clusterReadiness.map(c => (
                <div key={c.label} className="mb-2">
                  <div className="flex justify-between items-baseline gap-2 mb-1">
                    <span className="text-xs text-[#334155] dark:text-[#d1fae5]/80 truncate">{c.label}</span>
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{ color: c.readiness < 3.45 ? '#ef4444' : '#10b981' }}
                    >
                      {c.readiness.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#e2e8f0] dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(c.readiness / 5) * 100}%`,
                        background: c.readiness < 3.45 ? '#ef4444' : '#10b981',
                      }}
                    />
                  </div>
                  <div className="text-[0.6rem] text-[#94a3b8] dark:text-[#ecfdf5]/28 mt-0.5">
                    urgency {c.urgency.toFixed(2)} · gap +{(c.urgency - c.readiness).toFixed(2)} · n={c.n}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs text-[#475569] dark:text-[#ecfdf5]/55 leading-relaxed">
            <strong>Two readings worth noting.</strong> The <em>Big Man / patronage</em> dynamic scores 3.22 —
            among the highest-validated of any archetype, and respondents named <em>transparency</em> the critical
            lever by a margin larger than the other three options combined. Conversely,{' '}
            <em>Shifting the Burden</em> is the weakest at 2.50, with only 27.9% rating it accurate: the
            dependency framing does not yet resonate and may need reworking before publication.
          </p>
        </div>
      )}

      <div className="flex items-center gap-1 bg-[#064e3b]/20 dark:bg-[#022c22]/60 rounded-xl p-1 overflow-x-auto">
        {[
          { id: 'matrix', label: 'Matrix', Icon: LayoutDashboard },
          { id: 'impact', label: 'Impact', Icon: AlertTriangle },
          { id: 'cld',    label: 'CLD',    Icon: GitBranch },
        ].map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setViewMode(id as typeof viewMode)}
            className={cn('flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-1 justify-center',
              viewMode === id ? 'bg-white dark:bg-[#022c22]/60/60 shadow-sm text-[#E8C560] dark:text-[#ecfdf5]' : 'text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] hover:text-[#E8C560]/90 dark:text-[#ecfdf5]/90')}>
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Guide Toggle */}
      <button onClick={() => setShowGuide(v => !v)} className="flex items-center gap-1.5 text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] hover:text-[#E8C560]/90 dark:text-[#ecfdf5]/90 transition-colors">
        <HelpCircle className="w-3.5 h-3.5" />
        {showGuide ? 'Hide' : 'Show'} Scoring Guide
        {showGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {showGuide && (
        <div className="bg-[#064e3b]/10 dark:bg-[#022c22] border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-xl p-4 space-y-3">
          <h4 className="font-semibold text-[#E8C560] dark:text-[#ecfdf5] flex items-center gap-2 text-sm"><HelpCircle className="w-4 h-4 text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]" /> Scoring Guide</h4>
          <div className="text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] space-y-1.5">
            <p><span className="font-semibold text-[#34d399]">Strengths / Opportunities</span> — higher score = more valuable</p>
            <p><span className="font-semibold text-red-400">Weaknesses / Threats</span> — higher score = more harmful</p>
          </div>
        </div>
      )}

      {/* ── MATRIX VIEW ── */}
      {viewMode === 'matrix' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SWOTQuadrant title="Strengths"     count={swot.strengths.length}     icon={Shield}      items={swot.strengths}     config={categoryConfig.strength}    onUpdate={onUpdateItem} onAddToCLD={addItemToCLD} />
            <SWOTQuadrant title="Weaknesses"    count={swot.weaknesses.length}    icon={AlertCircle} items={swot.weaknesses}    config={categoryConfig.weakness}    onUpdate={onUpdateItem} onAddToCLD={addItemToCLD} />
            <SWOTQuadrant title="Opportunities" count={swot.opportunities.length} icon={Lightbulb}   items={swot.opportunities} config={categoryConfig.opportunity} onUpdate={onUpdateItem} onAddToCLD={addItemToCLD} />
            <SWOTQuadrant title="Threats"       count={swot.threats.length}       icon={Zap}         items={swot.threats}       config={categoryConfig.threat}      onUpdate={onUpdateItem} onAddToCLD={addItemToCLD} />
          </div>
        </div>
      )}

      {/* ── IMPACT VIEW ── */}
      {viewMode === 'impact' && (
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-[#E8C560]/90 dark:text-[#ecfdf5]/90 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" /> Ranked by Priority Score</h3>
          {sortedImpact.length === 0 ? (
            <p className="text-sm text-[#64748b]/80 dark:text-[#64748b] text-center py-8">No SWOT items to display yet.</p>
          ) : sortedImpact.map((item, idx) => {
            const cfg  = categoryConfig[item.category];
            const Icon = cfg.icon;
            return (
              <div key={item.id} className="bg-white dark:bg-[#022c22]/60/60 rounded-xl border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-[#64748b]/80 dark:text-[#64748b] w-6 shrink-0 mt-0.5">#{idx + 1}</span>
                  <div className={cn('p-1.5 rounded-lg shrink-0', cfg.bgColor)}><Icon className="w-3.5 h-3.5 text-white" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                      <span className={cn('text-xs font-semibold', cfg.textColor)}>{cfg.label}</span>
                      <PriorityBadge totalScore={item.total} category={item.category} />
                    </div>
                    <p className="text-sm text-[#E8C560]/90 dark:text-[#ecfdf5]/90">{item.description}</p>
                  </div>
                </div>
                <div className="pl-9 space-y-2">
                  <ScoreRow label="Impact"     score={item.impactScore     || 3} onChange={v => onUpdateItem?.(item.id, { impactScore: v })}     type="impact"     category={item.category} labelColor={cfg.textColor} />
                  <ScoreRow label="Likelihood" score={item.likelihoodScore || 3} onChange={v => onUpdateItem?.(item.id, { likelihoodScore: v })} type="likelihood" category={item.category} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── CLD VIEW ── */}
      {viewMode === 'cld' && (
        <div className="space-y-4">
          {/* Build Actions */}
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={buildFromSWOT}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors shadow-sm">
              <Wand2 className="w-3.5 h-3.5" /> Build from SWOT
            </button>
            <button onClick={() => { setLocalCldNodes([]); setLocalCldLinks([]); setHighlightedNodeIds([]); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#064e3b]/20 dark:bg-[#022c22]/60 hover:bg-slate-200 text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] text-xs font-medium transition-colors">
              <X className="w-3.5 h-3.5" /> Clear Canvas
            </button>

            <div className="hidden sm:block">
              <SnapshotsPanel
                snapshots={plan.cldSnapshots || []}
                activeSnapshotId={plan.activeCLDSnapshotId}
                onSaveSnapshot={saveCLDSnapshot}
                onLoadSnapshot={loadCLDSnapshot}
                onDeleteSnapshot={deleteCLDSnapshot}
                renameSnapshot={renameCLDSnapshot}
              />
            </div>

            <button onClick={() => setAnalysisPanelOpen(true)} disabled={localCldNodes.length < 2}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white text-xs font-semibold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ml-auto">
              <Bot className="w-3.5 h-3.5" /> Analyze Loops
            </button>
          </div>

          {/* Mobile Snapshots */}
          <div className="sm:hidden">
            <SnapshotsPanel
              snapshots={plan.cldSnapshots || []}
              activeSnapshotId={plan.activeCLDSnapshotId}
              onSaveSnapshot={saveCLDSnapshot}
              onLoadSnapshot={loadCLDSnapshot}
              onDeleteSnapshot={deleteCLDSnapshot}
              renameSnapshot={renameCLDSnapshot}
            />
          </div>

          {/* Suggested Archetypes */}
          {recommendArchetypes.length > 0 && (
            <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 space-y-3">
              <h4 className="text-sm font-semibold text-violet-800 flex items-center gap-2"><Sparkles className="w-4 h-4" /> Suggested Archetypes</h4>
              <div className="space-y-2">
                {recommendArchetypes.map(rec => {
                  const arch = systemArchetypes.find(a => a.id === rec.archetypeId);
                  if (!arch) return null;
                  return (
                    <div key={rec.archetypeId} className="bg-white dark:bg-[#022c22]/60/60 rounded-lg p-3 border border-violet-200/60">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold text-xs text-[#E8C560] dark:text-[#ecfdf5]">{arch.name}</span>
                            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-[#059669]/10 text-[#34d399]">{rec.confidence} match</span>
                          </div>
                          <p className="text-[11px] text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] leading-relaxed">{rec.reason}</p>
                        </div>
                        <button onClick={() => applyArchetype(rec.archetypeId)}
                          className="shrink-0 px-2.5 py-1.5 rounded-lg bg-violet-500 text-white text-xs font-medium hover:bg-violet-600 transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Educational Resources */}
          <EducationalResources />

          {/* CLD Sub-nav */}
          <div className="flex items-center gap-1 bg-[#064e3b]/20 dark:bg-[#022c22]/60 rounded-xl p-1">
            <button onClick={() => setCldSubView('diagram')}
              className={cn('flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-1 justify-center',
                cldSubView === 'diagram' ? 'bg-white dark:bg-[#022c22]/60/60 shadow-sm text-[#E8C560] dark:text-[#ecfdf5]' : 'text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] hover:text-[#E8C560]/90 dark:text-[#ecfdf5]/90')}>
              <GitBranch className="w-3.5 h-3.5" /> CLD Diagram
            </button>
            <button onClick={() => setCldSubView('leverage')}
              className={cn('flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-1 justify-center relative',
                cldSubView === 'leverage' ? 'bg-white dark:bg-[#022c22]/60/60 shadow-sm text-[#E8C560] dark:text-[#ecfdf5]' : 'text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] hover:text-[#E8C560]/90 dark:text-[#ecfdf5]/90')}>
              <Target className="w-3.5 h-3.5" /> Leverage Points
              {leverageCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500/100 text-white text-[9px] font-black flex items-center justify-center">
                  {leverageCount > 9 ? '9+' : leverageCount}
                </span>
              )}
            </button>
          </div>

          {cldSubView === 'diagram' && (
            <div>
              <h3 className="text-sm font-semibold text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-2 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#C9A84C]" /> Causal Loop Diagram
              </h3>
              <CLDCanvas
                nodes={localCldNodes}
                links={localCldLinks}
                highlightedNodeIds={highlightedNodeIds}
                onUpdateNodes={handleUpdateNodes}
                onUpdateLinks={handleUpdateLinks}
              />
              <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/20">
                <p className="text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] mb-2">
                  <strong>Active CLD Snapshot:</strong>{' '}
                  {plan.activeCLDSnapshotId
                    ? `Loaded from "${(plan.cldSnapshots || []).find(s => s.id === plan.activeCLDSnapshotId)?.label}" (${new Date((plan.cldSnapshots || []).find(s => s.id === plan.activeCLDSnapshotId)?.createdAt || '').toLocaleDateString()})`
                    : 'Current canvas state (not saved as snapshot)'
                  }
                </p>
              </div>
            </div>
          )}

          {cldSubView === 'leverage' && (
            <div>
              <h3 className="text-sm font-semibold text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" /> Generated Leverage Points
                <span className="text-xs font-normal text-[#64748b]/80 dark:text-[#64748b]">— Meadows' framework</span>
              </h3>
              <LeveragePointsPanel
                nodes={localCldNodes}
                links={localCldLinks}
                selectedArchId={selectedArchId}
                highlightedNodeIds={highlightedNodeIds}
                onHighlightNodes={ids => { setHighlightedNodeIds(ids); if (ids.length > 0) setCldSubView('diagram'); }}
              />
            </div>
          )}

          {/* ── ARCHETYPES LIBRARY ── */}
          <div>
            <h3 className="text-sm font-semibold text-[#E8C560]/90 dark:text-[#ecfdf5]/90 flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]" /> Systems Archetypes
              <span className="text-xs font-normal text-[#64748b]/80 dark:text-[#64748b]">{systemArchetypes.length} templates</span>
            </h3>
            <div className="space-y-2">
              {systemArchetypes.map(arch => (
                <div key={arch.id}
                  className={cn('rounded-xl border-2 transition-all cursor-pointer',
                    selectedArchId === arch.id ? 'border-[#C9A84C] bg-[#C9A84C]/10' : 'border-[#C9A84C]/20 dark:border-[#C9A84C]/20 bg-white dark:bg-[#022c22]/60/60 hover:border-blue-300')}>

                  {/* ── Card header row ── */}
                  <div
                    className="flex items-center gap-3 p-3"
                    onClick={() => setSelectedArchId(s => s === arch.id ? null : arch.id)}
                  >
                    {/* Colour chip */}
                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black shrink-0 bg-gradient-to-br', arch.color)}>
                      {arch.id.slice(0, 2).toUpperCase()}
                    </div>

                    {/* Name + category */}
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-sm text-slate-900 leading-tight">{arch.name}</h4>
                      <p className="text-[10px] text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] mt-0.5">{arch.category}</p>
                    </div>

                    {/* 👁 Image tooltip — only for archetypes that have a diagram URL */}
                    {arch.imageUrl && (
                      <ArchetypeImageTooltip
                        imageUrl={arch.imageUrl}
                        archetypeName={arch.name}
                      />
                    )}

                    {/* Expand chevron */}
                    <ChevronDown className={cn('w-4 h-4 text-[#64748b]/80 dark:text-[#64748b] shrink-0 transition-transform', selectedArchId === arch.id && 'rotate-180')} />
                  </div>

                  {/* ── Expanded body ── */}
                  {selectedArchId === arch.id && (
                    <div className="px-4 pb-4 space-y-3 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/20/60 pt-3">
                      {/* Diagram preview inside expanded panel */}
                      {arch.imageUrl && (
                        <div className="rounded-xl overflow-hidden border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 bg-[#064e3b]/10 dark:bg-[#022c22]">
                          <div className="flex items-center gap-2 px-3 py-2 bg-[#064e3b]/20 dark:bg-[#022c22]/60 border-b border-[#C9A84C]/20 dark:border-[#C9A84C]/20">
                            <GitBranch className="w-3.5 h-3.5 text-[#C9A84C]" />
                            <span className="text-[10px] font-semibold text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">Archetype Diagram</span>
                          </div>
                          <img
                            src={arch.imageUrl}
                            alt={`${arch.name} archetype diagram`}
                            className="w-full object-contain p-3"
                            style={{ maxHeight: 240 }}
                            onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
                          />
                        </div>
                      )}

                      <p className="text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] leading-relaxed">{arch.desc}</p>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748b]/80 dark:text-[#64748b] mb-1">When to apply</p>
                        <p className="text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] leading-relaxed">{arch.use}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={e => { e.stopPropagation(); applyArchetype(arch.id); }}
                          className="flex-1 py-2 rounded-lg bg-[#C9A84C] hover:bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                          <Wand2 className="w-3.5 h-3.5" /> Apply Template to CLD
                        </button>
                        <button onClick={e => { e.stopPropagation(); applyArchetype(arch.id); setCldSubView('leverage'); }}
                          className="px-3 py-2 rounded-lg bg-violet-100 hover:bg-violet-200 text-violet-700 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                          <Target className="w-3.5 h-3.5" /> Leverage
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analysis Side Panel */}
      <AnalysisSidePanel
        isOpen={analysisPanelOpen}
        onClose={() => setAnalysisPanelOpen(false)}
        nodes={localCldNodes}
        links={localCldLinks}
        selectedStrategies={[]}
        onExecute={executeAIAnalysis}
      />

      {/* Floating AI Assistant — Systems Thinking Context */}
      <FloatingAIAssistant plan={plan} activeView="systems" />

      {/* Kimi AI Quick Actions — Systems Thinking */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
        <button
          onClick={() => setAnalysisPanelOpen(true)}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#C9A84C] via-[#B8942E] to-[#E8C560] text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          title="AI Loop Analysis"
        >
          <AIStrategistAvatar size="sm" />
          <span className="text-xs font-semibold">Kimi AI · Analyze Loops</span>
        </button>
      </div>

      {/* Info Strip */}
      {viewMode !== 'cld' && (
        <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-xl p-3 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
          <p className="text-xs text-[#C9A84C] leading-relaxed">
            Use <strong>Impact × Likelihood</strong> (1–25) to score each factor. Switch to <strong>CLD Builder</strong> to map causal relationships and generate Meadows leverage points. Click the <strong>Kimi AI</strong> button for AI-powered loop analysis.
          </p>
        </div>
      )}
    </div>
  );
};

export default SystemsThinking;