import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from '@/lib/motion-shim';
import {
  Shield,
  AlertCircle,
  Lightbulb,
  Zap,
  Plus,
  Trash2,
  Sparkles,
  Loader2,
  ChevronDown,
  ChevronUp,
  Edit2,
  Check,
  X,
  Info,
  Link2,
  BrainCircuit,
  Network,
  ArrowRight,
  Target,
} from 'lucide-react';
import { SWOTItem, StrategicPlan } from '@/lib/strategicPlanStore';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface SWOTAnalysisProps {
  plan: StrategicPlan;
  onAddItem: (item: Omit<SWOTItem, 'id'>) => void;
  onUpdateItem: (id: string, updates: Partial<SWOTItem>) => void;
  onRemoveItem: (id: string) => void;
  onBulkAdd: (items: Omit<SWOTItem, 'id'>[]) => void;
  onNavigate?: (view: string) => void;
}

// ============================================================================
// CUSTOM TOOLTIP COMPONENT WITH FRAMER-MOTION
// ============================================================================

const Tooltip: React.FC<{ 
  children: React.ReactNode; 
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}> = ({ children, content, side = 'top', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <motion.div
        onMouseEnter={() => setTimeout(() => setIsVisible(true), delay * 100)}
        onMouseLeave={() => setIsVisible(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute z-50 px-3 py-2.5 bg-[#022c22] text-white text-xs rounded-lg shadow-2xl backdrop-blur-sm max-w-sm",
              side === 'top' ? "bottom-full left-1/2 transform -translate-x-1/2 mb-2" : "",
              side === 'bottom' ? "top-full left-1/2 transform -translate-x-1/2 mt-2" : "",
              side === 'left' ? "right-full top-1/2 transform translate-y-1/2 mr-2" : "",
              side === 'right' ? "left-full top-1/2 transform -translate-y-1/2 ml-2" : ""
            )}
          >
            {content}
            
            {/* Tooltip arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`absolute ${side === 'top' ? "top-full" : side === 'bottom' ? "bottom-full" : side === 'left' ? "right-full" : "left-full"} left-1/2 transform -translate-x-1/2`}
            >
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-b-4 border-transparent"
                style={
                  side === 'top' ? { borderTopColor: '#0f172a', marginTop: '-4px' } :
                  side === 'bottom' ? { borderBottomColor: '#0f172a', marginBottom: '-4px' } :
                  side === 'left' ? { borderRightColor: '#0f172a', marginRight: '-4px' } :
                  { borderLeftColor: '#0f172a', marginLeft: '-4px' }
                }
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// SCORE DESCRIPTIONS & INSTRUCTIONS
// ============================================================================


// ═══════════════════════════════════════════════════════════════════════════════
// BIRD 2026–2035 · SURVEY-SCORED SWOT BASELINE
// ═══════════════════════════════════════════════════════════════════════════════
// 55 SWOT factors carrying REAL respondent means, not placeholder scores.
//
// Source: Supabase `survey_responses` (BIRD_2026-2035). 76 consented responses,
// fielded 3–20 August 2026. Each factor was rated on Impact (1–5) and
// Likelihood (1–5); the values below are per-item means, item n = 63–74.
// These feed the existing calculateMetrics() engine unchanged:
//   strength    → Resilience Index    RI   = (I × L) / 5
//   opportunity → Resilience Index    RI   = sqrt(I × L)
//   weakness    → Risk Score          Risk = I × L
//   threat      → Vulnerability Index VI   = (I^2 × L) / 25
//
// SAMPLING CAVEAT: non-probability convenience sample, no weighting frame.
// Validation signals, NOT population estimates. Basilan, Sulu and Tawi-Tawi
// returned ZERO respondents; ~78% of the sample sits in the Cotabato City /
// Maguindanao del Norte corridor. Island-province factors are unvalidated.
// ─────────────────────────────────────────────────────────────────────────────

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

/** Provenance strip shown above the quadrants whenever the baseline is in use. */
const SURVEY_PROVENANCE = {
  n: 76,
  window: '3-20 August 2026',
  itemRange: '63-74',
  silentProvinces: ['Basilan', 'Sulu', 'Tawi-Tawi'],
  note:
    'Non-probability convenience sample with no weighting frame - stakeholder validation signals, ' +
    'not population estimates. Around 78% of respondents are based in the Cotabato City / Maguindanao ' +
    'del Norte mainland corridor.',
} as const;

const SCORE_DESCRIPTIONS = {
  1: {
    impact: 'Minimal effect on strategic goals',
    likelihood: 'Rarely will occur (<20% probability)',
  },
  2: {
    impact: 'Minor effect on strategic goals',
    likelihood: 'Unlikely (20-40% probability)',
  },
  3: {
    impact: 'Moderate effect on strategic goals',
    likelihood: 'Possible (40-60% probability)',
  },
  4: {
    impact: 'Significant effect on strategic goals',
    likelihood: 'Likely (60-80% probability)',
  },
  5: {
    impact: 'Major effect on strategic goals',
    likelihood: 'Almost certain (>80% probability)',
  },
};

// Impact vs Likelihood Matrix Guide
const IMPACT_LIKELIHOOD_GUIDE = {
  low: {
    label: 'Low Priority',
    description: 'Monitor but no immediate action required',
    color: 'bg-[#064e3b]/20 dark:bg-[#022c22]/60 text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]',
  },
  medium: {
    label: 'Medium Priority',
    description: 'Track and prepare contingency plans',
    color: 'bg-amber-500/100/10 text-amber-400',
  },
  high: {
    label: 'High Priority',
    description: 'Requires active management and resource allocation',
    color: 'bg-red-500/100/10 text-red-400',
  },
};

// Rating Instructions Component
const RatingInstructions: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-4 p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-[#C9A84C]/20 rounded-xl"
  >
    <div className="flex items-center gap-2 mb-3">
      <Info className="w-5 h-5 text-[#C9A84C]" />
      <h3 className="font-semibold text-[#C9A84C]">How to Rate Your SWOT Variables</h3>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Impact Column */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#34d399]" />
          <span className="font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90">Impact Score (1-5)</span>
        </div>
        <p className="text-sm text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] italic">
          How much will this factor affect your organization's ability to achieve its strategic goals?
        </p>
        <ul className="text-xs space-y-1 pl-6">
          {Object.entries(SCORE_DESCRIPTIONS).map(([num, desc]) => (
            <li key={num} className="flex gap-2">
              <span className="font-bold text-[#34d399] w-4">{num}.</span>
              <span className="text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">{desc.impact}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Likelihood Column */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-400" />
          <span className="font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90">Likelihood Score (1-5)</span>
        </div>
        <p className="text-sm text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] italic">
          How probable is it that this factor will occur within your planning timeframe?
        </p>
        <ul className="text-xs space-y-1 pl-6">
          {Object.entries(SCORE_DESCRIPTIONS).map(([num, desc]) => (
            <li key={num} className="flex gap-2">
              <span className="font-bold text-amber-400 w-4">{num}.</span>
              <span className="text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">{desc.likelihood}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Matrix Result */}
    <div className="mt-4 pt-3 border-t border-[#C9A84C]/20">
      <p className="text-sm font-medium text-[#C9A84C] mb-2">Priority Guidance:</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {Object.entries(IMPACT_LIKELIHOOD_GUIDE).map(([key, value]) => (
          <span key={key} className={`px-2 py-1 rounded-full ${value.color}`}>
            {value.label}: {value.description}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// ============================================================================
// INTERDEPENDENCY DETECTION COMPONENT
// ============================================================================

interface SWOTInterdependency {
  item1: SWOTItem;
  item2: SWOTItem;
  relationship: string;
  confidence: number;
  type: 'enables' | 'threatens' | 'mitigates' | 'exacerbates';
}

const InterdependencyPanel: React.FC<{
  swotItems: SWOTItem[];
  onSelectRelationship?: (relationship: SWOTInterdependency) => void;
  onNavigate?: (view: string) => void;
}> = ({ swotItems, onSelectRelationship, onNavigate }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [relationships, setRelationships] = useState<SWOTInterdependency[]>([]);

  const detectInterdependencies = async () => {
    setIsDetecting(true);
    
    // Simulate AI detection (in real implementation, call API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const detected: SWOTInterdependency[] = [];
    
    // Generate sample relationships based on categories
    strengthsForDetection(swotItems).forEach(strength => {
      opportunitiesForDetection(swotItems).forEach(opportunity => {
        if (Math.random() > 0.6) {
          detected.push({
            item1: strength,
            item2: opportunity,
            relationship: `${strength.description.substring(0, 20)}... enables...`,
            confidence: Math.floor(Math.random() * 20) + 70,
            type: 'enables',
          });
        }
      });
    });

    threatsForDetection(swotItems).forEach(threat => {
      weaknessesForDetection(swotItems).forEach(weakness => {
        if (Math.random() > 0.6) {
          detected.push({
            item1: weakness,
            item2: threat,
            relationship: `${weakness.description.substring(0, 20)}... exacerbates...`,
            confidence: Math.floor(Math.random() * 20) + 65,
            type: 'exacerbates',
          });
        }
      });
    });

    setRelationships(detected);
    setIsDetecting(false);
  };

  const clearRelationships = () => setRelationships([]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-500/20 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Network className="w-6 h-6 text-purple-400" />
            <h3 className="font-semibold text-purple-800">SWOT Interdependency Detection</h3>
          </div>
          {relationships.length > 0 && (
            <button
              onClick={clearRelationships}
              className="text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] hover:text-[#E8C560]/90 dark:text-[#ecfdf5]/90 underline"
            >
              Clear
            </button>
          )}
        </div>

        <p className="text-sm text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] mb-4">
          This tool analyzes potential causal relationships between your SWOT factors to help you build a <span className="font-medium text-purple-400">Cause-Cause Diagram (CCD)</span> or identify <span className="font-medium text-purple-400">Systems Archetypes</span>.
        </p>

        <motion.button
          onClick={detectInterdependencies}
          disabled={isDetecting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all",
            isDetecting
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30"
          )}
        >
          {isDetecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Relationships...
            </>
          ) : relationships.length > 0 ? (
            <>
              <BrainCircuit className="w-5 h-5" />
              Detect New Relationships
            </>
          ) : (
            <>
              <Link2 className="w-5 h-5" />
              Find Interdependencies
            </>
          )}
        </motion.button>

        {relationships.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 space-y-3"
          >
            <p className="text-sm font-medium text-purple-400">
              Detected {relationships.length} Relationship(s)
            </p>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {relationships.map((rel, idx) => (
                <motion.div
                  key={`${rel.item1.id}-${rel.item2.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 bg-white dark:bg-[#022c22]/60/60 rounded-lg border border-purple-500/20 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex items-center gap-1 flex-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#059669]/10 text-[#34d399]">
                        {rel.item1.category.toUpperCase()}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#64748b]/80 dark:text-[#64748b]" />
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#C9A84C]/10 text-[#C9A84C]">
                        {rel.item2.category.toUpperCase()}
                      </span>
                    </div>
                    
                    <Tooltip
                      content={
                        <div className="space-y-1">
                          <p className="font-semibold text-purple-400">{rel.relationship}</p>
                          <p className="text-xs text-[#64748b]/80 dark:text-[#64748b]">Confidence: {rel.confidence}%</p>
                        </div>
                      }
                    >
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium cursor-help",
                        rel.type === 'enables' ? "bg-[#059669]/10 text-[#34d399]" :
                        rel.type === 'threatens' ? "bg-red-500/100/10 text-red-400" :
                        rel.type === 'mitigates' ? "bg-amber-500/100/10 text-amber-400" :
                        "bg-orange-500/10 text-orange-400"
                      )}>
                        {rel.type.charAt(0).toUpperCase() + rel.type.slice(1)}
                      </span>
                    </Tooltip>
                  </div>
                  
                  <p className="text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] mt-2 line-clamp-2">
                    <span className="font-medium">From:</span> {rel.item1.description}
                  </p>
                  <p className="text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] line-clamp-2">
                    <span className="font-medium">To:</span> {rel.item2.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CCD & Systems Archetype Export - WIRED TO onNavigate */}
            <div className="pt-4 border-t border-purple-500/20 flex gap-2">
              <button
                onClick={() => onNavigate?.('systems')}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-[#C9A84C] to-[#B8942E] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Network className="w-4 h-4" />
                Open CCD Builder
              </button>
              <button
                onClick={() => onNavigate?.('systems')}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <BrainCircuit className="w-4 h-4" />
                View Archetypes
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Helper functions for mock relationships
const strengthsForDetection = (items: SWOTItem[]): SWOTItem[] => 
  items.filter(i => i.category === 'strength');
const weaknessesForDetection = (items: SWOTItem[]): SWOTItem[] => 
  items.filter(i => i.category === 'weakness');
const opportunitiesForDetection = (items: SWOTItem[]): SWOTItem[] => 
  items.filter(i => i.category === 'opportunity');
const threatsForDetection = (items: SWOTItem[]): SWOTItem[] => 
  items.filter(i => i.category === 'threat');

// ============================================================================
// SCORE BUTTON COMPONENT
// ============================================================================

const ScoreButton: React.FC<{
  value: number;
  selectedValue: number;
  onSelect: (value: number) => void;
  type: 'impact' | 'likelihood';
}> = ({ value, selectedValue, onSelect, type }) => {
  return (
    <Tooltip
      content={
        <div className="space-y-1.5">
          <p className="font-semibold text-[#C9A84C]">
            {type === 'impact' ? 'Impact Level' : 'Likelihood Level'} {value}
          </p>
          <p className="text-xs text-[#64748b]/80 dark:text-[#64748b]">
            {type === 'impact' 
              ? SCORE_DESCRIPTIONS[value as keyof typeof SCORE_DESCRIPTIONS].impact
              : SCORE_DESCRIPTIONS[value as keyof typeof SCORE_DESCRIPTIONS].likelihood
            }
          </p>
        </div>
      }
    >
      <motion.button
        onClick={() => onSelect(value)}
        className={cn(
          "w-6 h-6 rounded-full border-2 transition-all duration-200",
          value <= selectedValue
            ? "bg-gradient-to-br from-[#C9A84C] to-[#C9A84C] border-transparent shadow-md scale-110"
            : "border-[#C9A84C]/30 dark:border-[#C9A84C]/20 hover:border-[#C9A84C]/30 hover:bg-[#064e3b]/20 dark:bg-[#022c22]/60",
          type === 'impact' ? "cursor-pointer" : "cursor-pointer"
        )}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Select ${type} score of ${value}`}
      >
        {value <= selectedValue && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-xs text-white font-bold leading-none block text-center"
          >
            ✓
          </motion.span>
        )}
      </motion.button>
    </Tooltip>
  );
};

// ============================================================================
// SWOT CARD COMPONENT
// ============================================================================

const SWOTCard: React.FC<{
  item: SWOTItem;
  config: any;
  onUpdate: (updates: Partial<SWOTItem>) => void;
  onRemove: () => void;
  index: number;
}> = ({ item, config, onUpdate, onRemove, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.description);

  const priority = useMemo(() => {
    const impact = item.impactScore || 3;
    const likelihood = item.likelihoodScore || 3;
    if (impact >= 4 && likelihood >= 4) return IMPACT_LIKELIHOOD_GUIDE.high;
    if (impact >= 3 || likelihood >= 3) return IMPACT_LIKELIHOOD_GUIDE.medium;
    return IMPACT_LIKELIHOOD_GUIDE.low;
  }, [item.impactScore, item.likelihoodScore]);

  const handleSave = () => {
    onUpdate({ description: editText });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(item.description);
    setIsEditing(false);
  };

  // ✅ NEW: Resilience/Risk/Vulnerability Scoring Engine
  const calculateMetrics = () => {
    const imp = item.impactScore || 3;
    const lik = item.likelihoodScore || 3;
    
    switch (item.category) {
      case 'strength':
        return { value: (imp * lik) / 5, scale: 5, label: 'Resilience Index', type: 'resilience' as const };
      case 'opportunity':
        return { value: Math.sqrt(imp * lik), scale: 5, label: 'Resilience Index', type: 'resilience' as const };
      case 'weakness':
        return { value: imp * lik, scale: 25, label: 'Risk Score', type: 'risk' as const };
      case 'threat':
        return { value: (Math.pow(imp, 2) * lik) / 25, scale: 5, label: 'Vulnerability Index', type: 'vulnerability' as const };
      default:
        return { value: 0, scale: 5, label: 'Score', type: 'neutral' as const };
    }
  };

  const metrics = useMemo(() => calculateMetrics(), [item.impactScore, item.likelihoodScore, item.category]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
      className={cn(
        "rounded-xl border-2 p-4 transition-all duration-300",
        config.bgColor.replace('50', '50'),
        config.borderColor.replace('-200', '-300')
      )}
    >
      {isEditing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="flex justify-between items-start gap-2">
            <label className="text-xs font-medium text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">Description</label>
            <Tooltip content="Cancel editing changes">
              <motion.button
                onClick={handleCancel}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 text-[#64748b]/80 dark:text-[#64748b] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </Tooltip>
          </div>
          <motion.textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 text-sm border border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] resize-none bg-white dark:bg-[#022c22]/60/60"
            rows={3}
            autoFocus
            placeholder="Describe the SWOT factor..."
          />
          <motion.div 
            className="flex justify-end gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-xs font-medium text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] bg-white dark:bg-[#022c22]/60/60 border border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg hover:bg-[#064e3b]/10 dark:bg-[#022c22] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-[#C9A84C] to-[#B8942E] rounded-lg hover:shadow-md transition-all"
            >
              Save Changes
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <p className={cn("text-sm font-medium flex-1", config.textColor)}>
              {item.description}
            </p>
            <motion.div 
              className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <Tooltip content="Edit description">
                <motion.button
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 text-[#64748b]/80 dark:text-[#64748b] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </motion.button>
              </Tooltip>
              
              <Tooltip content="Remove this item from analysis">
                <motion.button
                  onClick={onRemove}
                  whileHover={{ scale: 1.15, backgroundColor: "#fee2e2" }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 text-red-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </Tooltip>
            </motion.div>
          </div>

          {/* Priority Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priority.color}`}>
              {priority.label}
            </span>
            {item.aiGenerated && (
              <Tooltip content="This item was generated by AI based on your organization context">
                <span className="ml-auto text-xs bg-purple-500/100/10 text-purple-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Generated
                </span>
              </Tooltip>
            )}
          </div>

          <div className="flex items-center gap-4 pt-3 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/20/50">
            {/* Impact Score */}
            <Tooltip
              content={
                <div className="space-y-1">
                  <p className="font-semibold text-[#34d399]">Impact Score Guide</p>
                  <p className="text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">Rate how much this factor affects your strategic goals.</p>
                  <ul className="text-xs space-y-0.5">
                    {Object.entries(SCORE_DESCRIPTIONS).map(([num, desc]) => (
                      <li key={num} className="flex gap-1">
                        <span className={cn("font-bold w-3", num <= String(item.impactScore) ? "text-[#059669]" : "text-[#64748b]/80 dark:text-[#64748b]")}>
                          {num}.
                        </span>
                        <span>{desc.impact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Info className="w-3 h-3 text-[#64748b]/80 dark:text-[#64748b]" />
                  <span className="text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] font-medium">Impact:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <ScoreButton
                        key={n}
                        value={n}
                        selectedValue={item.impactScore || 3}
                        onSelect={(val) => onUpdate({ impactScore: val })}
                        type="impact"
                      />
                    ))}
                  </div>
                </div>
                <motion.span 
                  className={cn("text-sm font-bold w-8 text-center transition-colors", config.textColor)}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  {item.impactScore || 3}
                </motion.span>
              </div>
            </Tooltip>

            {/* Likelihood Score */}
            <Tooltip
              content={
                <div className="space-y-1">
                  <p className="font-semibold text-amber-400">Likelihood Score Guide</p>
                  <p className="text-xs text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]">Rate the probability of this factor occurring.</p>
                  <ul className="text-xs space-y-0.5">
                    {Object.entries(SCORE_DESCRIPTIONS).map(([num, desc]) => (
                      <li key={num} className="flex gap-1">
                        <span className={cn("font-bold w-3", num <= String(item.likelihoodScore) ? "text-amber-500" : "text-[#64748b]/80 dark:text-[#64748b]")}>
                          {num}.
                        </span>
                        <span>{desc.likelihood}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Info className="w-3 h-3 text-[#64748b]/80 dark:text-[#64748b]" />
                  <span className="text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b] font-medium">Likelihood:</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <ScoreButton
                        key={n}
                        value={n}
                        selectedValue={item.likelihoodScore || 3}
                        onSelect={(val) => onUpdate({ likelihoodScore: val })}
                        type="likelihood"
                      />
                    ))}
                  </div>
                </div>
                <motion.span 
                  className={cn("text-sm font-bold w-8 text-center transition-colors", config.textColor)}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                >
                  {item.likelihoodScore || 3}
                </motion.span>
              </div>
            </Tooltip>
          </div>

          {/* ✅ NEW: Dynamic Metric Badge (Resilience/Risk/Vulnerability) */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.4 }}
            className="mt-3 pt-3 border-t border-slate-100 dark:border-[#C9A84C]/20/60"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">{metrics.label}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-[#064e3b]/20 dark:bg-[#022c22]/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((metrics.value / metrics.scale) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={cn(
                      "h-full rounded-full",
                      metrics.type === 'risk' 
                        ? metrics.value >= 16 ? "bg-red-500/100" : metrics.value >= 10 ? "bg-amber-500/100" : "bg-[#059669]"
                        : metrics.value >= 4 ? "bg-[#059669]" : metrics.value >= 2.5 ? "bg-amber-500/100" : "bg-slate-400"
                    )}
                  />
                </div>
                <span className={cn(
                  "font-bold",
                  metrics.type === 'risk' 
                    ? metrics.value >= 16 ? "text-red-400" : metrics.value >= 10 ? "text-amber-400" : "text-[#ecfdf5]/80"
                    : metrics.value >= 4 ? "text-[#34d399]" : metrics.value >= 2.5 ? "text-amber-400" : "text-[#ecfdf5]/80"
                )}>
                  {metrics.value.toFixed(1)}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-[#64748b]/80 dark:text-[#64748b] mt-1">
              Scale: 1-{metrics.scale} • {metrics.type === 'risk' ? 'Higher = More Risk' : 'Higher = More Resilience'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

// ============================================================================
// MAIN SWOT ANALYSIS COMPONENT
// ============================================================================

const SWOTAnalysis: React.FC<SWOTAnalysisProps> = ({
  plan,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onBulkAdd,
  onNavigate,
}) => {
  const categoryConfig = {
    strength: {
      label: 'Strengths',
      icon: Shield,
      color: 'emerald',
      bgColor: 'bg-[#059669]/10',
      borderColor: 'border-[#059669]/20',
      textColor: 'text-[#34d399]',
      iconBg: 'bg-[#059669]',
      description: 'Internal positive attributes and resources',
    },
    weakness: {
      label: 'Weaknesses',
      icon: AlertCircle,
      color: 'red',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      textColor: 'text-red-400',
      iconBg: 'bg-red-500/100',
      description: 'Internal areas needing improvement',
    },
    opportunity: {
      label: 'Opportunities',
      icon: Lightbulb,
      color: 'blue',
      bgColor: 'bg-[#C9A84C]/10',
      borderColor: 'border-[#C9A84C]/20',
      textColor: 'text-[#C9A84C]',
      iconBg: 'bg-[#C9A84C]',
      description: 'External factors to leverage',
    },
    threat: {
      label: 'Threats',
      icon: Zap,
      color: 'amber',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      textColor: 'text-amber-400',
      iconBg: 'bg-amber-500/100',
      description: 'External risks to mitigate',
    },
  };

  const [newItems, setNewItems] = useState<Record<string, string>>({
    strength: '',
    weakness: '',
    opportunity: '',
    threat: '',
  });

  const [aiContext, setAiContext] = useState({
    organization: plan.organization,
    industry: '',
    strategicIntent: plan.strategicIntent,
    context: '',
  });

  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showInterdependencyPanel, setShowInterdependencyPanel] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAddItem = (category: SWOTItem['category']) => {
    if (!newItems[category].trim()) return;
    // ✅ FIX: Immediately add with default scores & trigger re-render
    onAddItem({
      category,
      description: newItems[category].trim(),
      impactScore: 3,
      likelihoodScore: 3,
      aiGenerated: false,
    });
    setNewItems((prev) => ({ ...prev, [category]: '' }));
  };

  // ✅ WIRED TO ai-strategy-assistant Edge Function
  const generateAISWOT = async () => {
    setIsGeneratingAI(true);
    setAiError(null);
    
    try {
      // Build SWOT context for AI prompt
      const strengths = (swotItems || [])
        .filter(i => i.category === 'strength')
        .map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      
      const weaknesses = (swotItems || [])
        .filter(i => i.category === 'weakness')
        .map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      
      const opportunities = (swotItems || [])
        .filter(i => i.category === 'opportunity')
        .map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      
      const threats = (swotItems || [])
        .filter(i => i.category === 'threat')
        .map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));

      // Invoke the dedicated AI Strategist Edge Function
      const { data, error } = await supabase.functions.invoke('ai-strategy-assistant', {
        body: {
          action: 'ai_generate_swot',
          data: {
            // SWOT factors with scores
            strengths,
            weaknesses,
            opportunities,
            threats,
            // Strategic context
            organization: aiContext.organization,
            industry: aiContext.industry,
            strategicIntent: aiContext.strategicIntent,
            additionalContext: aiContext.context,
            // Scoring model hint for resilience/risk calculations
            scoringModel: {
              strengths: 'RI = (Impact × Likelihood) / 5',
              opportunities: 'RI = √(Impact × Likelihood)',
              weaknesses: 'Risk = Impact × Likelihood',
              threats: 'VI = (Impact² × Likelihood) / 25'
            }
          }
        }
      });

      if (error) throw new Error(error.message || 'Failed to generate SWOT analysis');
      if (!data?.success || !data?.data) throw new Error('Invalid response from AI service');

      // Parse and add generated SWOT items
      const generatedItems: Omit<SWOTItem, 'id'>[] = [];
      
      ['strength', 'weakness', 'opportunity', 'threat'].forEach(category => {
        const items = data.data[category] || [];
        items.forEach((item: any) => {
          generatedItems.push({
            category: category as SWOTItem['category'],
            description: item.description || item.title || 'Generated item',
            impactScore: item.impactScore || 3,
            likelihoodScore: item.likelihoodScore || 3,
            aiGenerated: true
          });
        });
      });

      if (generatedItems.length > 0) {
        onBulkAdd(generatedItems);
        setShowAIPanel(false);
      } else {
        setAiError('No SWOT items were generated. Please try again with more context.');
      }

    } catch (err) {
      console.error('AI SWOT generation error:', err);
      setAiError(err instanceof Error ? err.message : 'An unexpected error occurred during AI generation');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Fall back to the survey-scored baseline when the plan carries no SWOT items
  // of its own, so the quadrants open populated with real evidence rather than
  // an empty state. A user's own items always take precedence.
  const usingBaseline = !plan.swotItems?.length;
  const swotItems = useMemo<SWOTItem[]>(
    () => (plan.swotItems?.length ? plan.swotItems : BIRD_SWOT_BASELINE),
    [plan.swotItems],
  );

  const getItemsByCategory = (category: SWOTItem['category']) =>
    swotItems.filter((item) => item.category === category);

  const allSWOTItems = useMemo(() => swotItems, [swotItems]);

  // Ranked readings straight off the existing scoring engine.
  const topFactors = useMemo(() => {
    const metric = (i: SWOTItem) => {
      const imp = i.impactScore || 3;
      const lik = i.likelihoodScore || 3;
      switch (i.category) {
        case 'strength':    return (imp * lik) / 5;
        case 'opportunity': return Math.sqrt(imp * lik);
        case 'weakness':    return imp * lik;
        case 'threat':      return (Math.pow(imp, 2) * lik) / 25;
        default:            return 0;
      }
    };
    const pick = (c: SWOTItem['category'], n = 4) =>
      swotItems.filter(i => i.category === c)
        .map(i => ({ item: i, metric: metric(i) }))
        .sort((a, b) => b.metric - a.metric)
        .slice(0, n);
    return {
      strength:    pick('strength'),
      weakness:    pick('weakness'),
      opportunity: pick('opportunity'),
      threat:      pick('threat'),
    };
  }, [swotItems]);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#E8C560] dark:text-[#ecfdf5]">SWOT Analysis</h1>
          <p className="text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">Structured diagnostics for comprehensive environmental analysis</p>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setShowInterdependencyPanel(!showInterdependencyPanel)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              showInterdependencyPanel
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                : "bg-[#064e3b]/20 dark:bg-[#022c22]/60 text-[#E8C560]/90 dark:text-[#ecfdf5]/90 hover:bg-slate-200"
            )}
          >
            <Link2 className="w-4 h-4" />
            Find Relationships
            {showInterdependencyPanel ? (
              <motion.div animate={{ rotate: 180 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </motion.button>

          <motion.button
            onClick={() => setShowAIPanel(!showAIPanel)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#065f46] to-[#4c1d95] text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            AI Generator
            {showAIPanel ? (
              <motion.div animate={{ rotate: 180 }}>
                <ChevronUp className="w-4 h-4" />
              </motion.div>
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* ── Survey Evidence Strip ─────────────────────────────────────────── */}
      {usingBaseline && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-xl border border-[#C9A84C]/30 bg-[#064e3b]/10 dark:bg-[#022c22]/60 p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">
                Validation Survey · Chapter 3-A
              </span>
              <h2 className="text-base font-bold text-[#E8C560] dark:text-[#ecfdf5]">
                {swotItems.length} factors scored by {SURVEY_PROVENANCE.n} stakeholders
              </h2>
            </div>
            <span className="text-xs text-[#64748b] dark:text-[#a7f3d0]/70 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-3 py-1">
              {SURVEY_PROVENANCE.window} · item n = {SURVEY_PROVENANCE.itemRange}
            </span>
          </div>

          {/* Coverage warning — the most consequential limitation in this dataset */}
          <div className="flex items-start gap-2 rounded-lg border border-red-500/35 bg-red-500/10 px-3 py-2 mb-4">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
            <p className="text-[0.72rem] leading-relaxed text-red-600 dark:text-red-300">
              <strong>Zero respondents from {SURVEY_PROVENANCE.silentProvinces.join(', ')}.</strong>{' '}
              {SURVEY_PROVENANCE.note}
            </p>
          </div>

          {/* Top-ranked factors per quadrant, using the existing scoring engine */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
            {([
              { key: 'weakness',    label: 'Highest Risk',          formula: 'Risk = I × L',      scale: 25, color: '#ef4444' },
              { key: 'threat',      label: 'Highest Vulnerability', formula: 'VI = (I² × L)/25',  scale: 5,  color: '#f59e0b' },
              { key: 'opportunity', label: 'Highest Resilience',    formula: 'RI = √(I × L)',     scale: 5,  color: '#10b981' },
              { key: 'strength',    label: 'Strongest Assets',      formula: 'RI = (I × L)/5',    scale: 5,  color: '#C9A84C' },
            ] as const).map(({ key, label, formula, scale, color }) => (
              <div key={key}>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color }}>{label}</h3>
                  <span className="text-[0.6rem] text-[#64748b] dark:text-[#ecfdf5]/30">{formula}</span>
                </div>
                {topFactors[key].map(({ item, metric }) => (
                  <div key={item.id} className="mb-2.5">
                    <div className="flex justify-between items-baseline gap-2 mb-1">
                      <span className="text-xs text-[#334155] dark:text-[#d1fae5]/80 truncate">
                        {item.description.split(' — ')[0]}
                      </span>
                      <span className="text-xs font-bold tabular-nums flex-shrink-0" style={{ color }}>
                        {metric.toFixed(2)}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#e2e8f0] dark:bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(2, Math.min(100, (metric / scale) * 100))}%` }}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                    <div className="text-[0.6rem] text-[#94a3b8] dark:text-[#ecfdf5]/28 mt-0.5">
                      I {(item.impactScore || 0).toFixed(2)} · L {(item.likelihoodScore || 0).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-[#475569] dark:text-[#ecfdf5]/55 leading-relaxed">
            <strong>Read this first:</strong> human capital, not infrastructure, tops the risk register.
            Functional literacy (17.76) and child malnutrition (17.25) outrank infrastructure deficits (16.91).
            Editing any card below recalculates these rankings live.
          </p>
        </motion.div>
      )}

      <AnimatePresence>
        {showAIPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-500/20 rounded-xl p-6">
              <h3 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI-Powered SWOT Generation
              </h3>
              <p className="text-sm text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b] mb-4">
                Let AI analyze your organizational context and generate relevant SWOT factors automatically.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Organization Name</label>
                  <input
                    type="text"
                    value={aiContext.organization}
                    onChange={(e) => setAiContext((prev) => ({ ...prev, organization: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., TechForward Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Industry/Sector</label>
                  <input
                    type="text"
                    value={aiContext.industry}
                    onChange={(e) => setAiContext((prev) => ({ ...prev, industry: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Technology Consulting"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Strategic Intent</label>
                  <input
                    type="text"
                    value={aiContext.strategicIntent}
                    onChange={(e) => setAiContext((prev) => ({ ...prev, strategicIntent: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Achieve market leadership in digital transformation"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90 mb-1">Additional Context</label>
                  <textarea
                    value={aiContext.context}
                    onChange={(e) => setAiContext((prev) => ({ ...prev, context: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#C9A84C]/30 dark:border-[#C9A84C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows={3}
                    placeholder="Any additional context about your organization, market position, recent changes, etc."
                  />
                </div>
              </div>
              <motion.button
                onClick={generateAISWOT}
                disabled={isGeneratingAI}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isGeneratingAI ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Analysis...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate SWOT Analysis
                  </>
                )}
              </motion.button>
              {aiError && <p className="text-red-400 text-xs mt-2 text-center">{aiError}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating Instructions */}
      <RatingInstructions />

      {/* Interdependency Panel */}
      <AnimatePresence>
        {showInterdependencyPanel && (
          <InterdependencyPanel swotItems={allSWOTItems} onNavigate={onNavigate} />
        )}
      </AnimatePresence>

      {/* SWOT Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(Object.entries(categoryConfig) as [SWOTItem['category'], typeof categoryConfig.strength][]).map(
          ([category, config], index) => {
            const Icon = config.icon;
            const items = getItemsByCategory(category);

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={cn(
                  "bg-white dark:bg-[#022c22]/60/60 rounded-xl border overflow-hidden",
                  config.borderColor.replace('-200', '-300')
                )}
              >
                <div className={cn(config.bgColor, "px-4 py-3 flex items-center gap-3 border-b", config.borderColor)}>
                  <div className={cn(config.iconBg, "p-2 rounded-lg")}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={cn("font-semibold", config.textColor)}>{config.label}</h3>
                    <p className="text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">{config.description}</p>
                  </div>
                  <motion.span 
                    className={cn(config.bgColor, config.textColor, "px-2 py-1 rounded-full text-sm font-medium")}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {items.length}
                  </motion.span>
                </div>

                <div className="p-4 space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
                  {items.map((item, itemIndex) => (
                    <SWOTCard
                      key={item.id}
                      item={item}
                      config={config}
                      onUpdate={(updates) => onUpdateItem(item.id, updates)}
                      onRemove={() => onRemoveItem(item.id)}
                      index={itemIndex}
                    />
                  ))}

                  {/* Add New Item */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={newItems[category]}
                      onChange={(e) => setNewItems((prev) => ({ ...prev, [category]: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddItem(category)}
                      placeholder={`Add ${config.label.toLowerCase().slice(0, -1)}...`}
                      className="flex-1 px-3 py-2 text-sm border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                    />
                    <motion.button
                      onClick={() => handleAddItem(category)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={!newItems[category].trim()}
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        config.iconBg,
                        "text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            );
          }
        )}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-[#C9A84C]/20 dark:border-[#C9A84C]/20"
      >
        <h3 className="font-semibold text-[#E8C560] dark:text-[#ecfdf5] mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]" />
          Analysis Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.entries(categoryConfig) as [SWOTItem['category'], typeof categoryConfig.strength][]).map(
            ([category, config]) => {
              const items = getItemsByCategory(category);
              const avgImpact = items.length > 0
                ? items.reduce((sum, i) => sum + (i.impactScore || 0), 0) / items.length
                : 0;
              const avgLikelihood = items.length > 0
                ? items.reduce((sum, i) => sum + (i.likelihoodScore || 0), 0) / items.length
                : 0;

              return (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white dark:bg-[#022c22]/60/60 rounded-lg p-4 border border-[#C9A84C]/20 dark:border-[#C9A84C]/20 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn(config.iconBg, "p-1.5 rounded")}>
                      <config.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#E8C560]/90 dark:text-[#ecfdf5]/90">{config.label}</span>
                  </div>
                  <motion.p 
                    className="text-2xl font-bold text-[#E8C560] dark:text-[#ecfdf5]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                  >
                    {items.length}
                  </motion.p>
                  <p className="text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]">
                    Avg. Impact: <span className="font-medium">{avgImpact.toFixed(1)}</span> · 
                    Likelihood: <span className="font-medium">{avgLikelihood.toFixed(1)}</span>
                  </p>
                </motion.div>
              );
            }
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SWOTAnalysis;