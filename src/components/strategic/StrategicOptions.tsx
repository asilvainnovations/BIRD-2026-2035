import React, { useState, useMemo, useEffect } from 'react';
import { Activity, AlertCircle, AlertTriangle, Anchor, ArrowRight, BarChart2, BookOpen, Brain, Check, ChevronDown, ChevronUp, Clock, Crosshair, Edit2, Gauge, GitBranch, Info, Layers, LayoutDashboard, Lightbulb, Link as LinkIcon, Loader2, Plus, Shield, Sparkles, Star, Target, Trash2, TrendingUp, Workflow, X, Zap } from 'lucide-react';
import { StrategicOption, StrategicPlan, SWOTItem } from '@/lib/strategicPlanStore';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

// Edge Function URLs
const AI_ASSISTANT_URL = 'https://rgvteytgkugdqdodedxq.supabase.co/functions/v1/ai-strategy-assistant';
const SYNC_URL = 'https://rgvteytgkugdqdodedxq.supabase.co/functions/v1/strategic-planner-sync';

export interface LeveragePoint { archetypeId?: string; leverageLevel: number; meadowsName: string; intervention: string; targetNodeIds: string[]; expectedImpact: 'high' | 'medium' | 'low'; timeHorizon: 'short' | 'medium' | 'long'; source: 'archetype' | 'cld-analysis'; }
export interface CLDNode { id: string; label: string; category?: string; }
export interface CLDLink { from: string; to: string; polarity: '+' | '-'; strength?: number; }

interface StrategicOptionsProps {
  plan: StrategicPlan;
  onAddOption: (option: Omit<StrategicOption, 'id'>) => void;
  onUpdateOption: (id: string, updates: Partial<StrategicOption>) => void;
  onRemoveOption: (id: string) => void;
  onBulkAdd: (options: Omit<StrategicOption, 'id'>[]) => void;
  /** Optional: enables inline SWOT re-scoring in the Matrix/Impact views. */
  onUpdateSWOTItem?: (id: string, updates: Partial<SWOTItem>) => void;
  leveragePoints?: LeveragePoint[];
  selectedArchetypeId?: string | null;
  selectedArchetypeName?: string | null;
  activeArchetypeDescription?: string | null;
  cldNodes?: CLDNode[];
  cldLinks?: CLDLink[];
}


/* ═══════════════════════════════════════════════════════════════════════════
   BIRD 2026–2035 · TOWS BASELINE & STRATEGIC OPTION VALIDATION
   ═══════════════════════════════════════════════════════════════════════════
   GEOPOLITICAL FRAME (post-2024 BARMM): five provinces — Tawi-Tawi, Basilan
   (excluding Isabela City), Maguindanao del Norte, Maguindanao del Sur, Lanao
   del Sur — plus the Special Geographic Area and Cotabato City. SULU IS NOT
   PART OF BARMM.

   SCORING WEIGHTS are read from formulas.ts (authoritative), NOT from any
   circulating persona document:
     economic impact 0.20 · feasibility 0.18 · risk/return 0.16 ·
     identity alignment 0.15 · systems leverage 0.15 · inclusivity 0.10 ·
     sustainability 0.06

   ECOSYSTEM LOGIC. BEIE clusters are SERIAL, not additive: value must pass
   Foundations → Transformers → Enablers → Connectors → Financiers, gated by
   the cross-cutting Operating System. Serial throughput is the PRODUCT of
   cluster readiness (0.115), not the mean (0.694) — a 6.1x optimism gap.
   Marginal sensitivity is near-flat across clusters (19.2–20.8%), which is the
   arithmetic case for synchronised development and therefore for IEDS.
   `feasibilityScore` below is the owning cluster's respondent READINESS, so
   quadrant feasibility reflects where the ecosystem actually binds.
   ═══════════════════════════════════════════════════════════════════════════ */

const FORMULA_WEIGHTS = {
  economicImpact: 0.20, feasibility: 0.18, riskReturn: 0.16,
  identityAlignment: 0.15, systemsLeverage: 0.15, inclusivity: 0.10, sustainability: 0.06,
} as const;

/** Cluster readiness → feasibility anchor. Survey Sections 4–9, n = 63–73. */
const CLUSTER_READINESS = {
  foundations: 3.45, transformers: 3.40, enablers: 3.33,
  connectors: 3.61, financiers: 3.55, 'cross-cutting': 3.58,
} as const;

const ECOSYSTEM_MATH = {
  meanReadiness: 0.694, serialThroughput: 0.160, withOperatingSystem: 0.115,
  optimismGap: 6.1, bindingCluster: 'Enablers', bindingReadiness: 0.667,
  sensitivityRange: '19.2–20.8%',
} as const;

/**
 * Strategic pathway evaluation — survey Section 10, scored on the same seven
 * criteria as Chapter 4 using formulas.ts weights. `respondentScore` uses only
 * the 29 respondents who differentiated their sliders: 25 of 75 left all 28
 * cells at the default of 5, so 65.5% of cells are midpoint-contaminated and
 * the full-sample means understate the spread.
 */
const PATHWAY_VALIDATION = [
  { code: 'IEDS', name: 'Integrated Ecosystem Development', respondentScore: 7.36, rank: 1,
    thesis: 'Synchronised cluster development. The only pathway consistent with serial ecosystem arithmetic — near-flat marginal sensitivity means no cluster can be safely deferred.' },
  { code: 'HEDS', name: 'Halal Economy Dominance',          respondentScore: 6.68, rank: 2,
    thesis: 'Concentrates on Transformers. Strong identity alignment, but stalls if Enablers (the binding constraint at 0.667) is not lifted in parallel.' },
  { code: 'IFES', name: 'Infrastructure-First Enabling',    respondentScore: 6.54, rank: 3,
    thesis: 'Targets the actual bottleneck, but sequentially. Defers conversion capacity, so value accumulates upstream without a Transformer to release it.' },
  { code: 'GEMS', name: 'Green Economy Monetization',       respondentScore: 6.50, rank: 4,
    thesis: 'Highest-scoring single opportunity (renewables, RI 4.14) but the thinnest institutional base — carbon and PES revenue currently stands at zero.' },
] as const;

const MATRIX_CONTAMINATION = { respondents: 75, allAtDefault: 25, pctCellsAtDefault: 65.5, differentiators: 29 } as const;

const SURVEY_FRAME = {
  n: 76, window: '3–20 August 2026',
  silentProvinces: ['Basilan', 'Tawi-Tawi'],
  note: 'Non-probability convenience sample, no weighting frame — validation signals, not population estimates. ~78% of respondents sit in the Cotabato City / Maguindanao del Norte mainland corridor, so Sequence C (BIMP-EAGA maritime, Connectors) is unvalidated.',
} as const;

/**
 * Sixteen TOWS options, four per quadrant, each traced to a scored SWOT pair.
 *   priorityScore    — survey signal of the paired SWOT factors, 1–5
 *   feasibilityScore — owning BEIE cluster's respondent readiness, 1–5
 * Readiness is the lowest universal dimension in every cluster; that is the
 * roadmap's central delivery risk, not a scaling artefact.
 */
const BIRD_TOWS_BASELINE: Omit<StrategicOption, 'id'>[] = [
  // ── SO · Strengths × Opportunities ──────────────────────────────────────
  { optionType: 'SO', title: 'Bangsamoro Halal Park & agro-processing corridors', description: 'S1 Strong AFF Base x O1 Global Halal Market (RI 4.14). Converts the resource base into certified, processed export product. Workshop 2 named agro-processing plants, cold storage and industrial parks the top joint-action opportunity. Cluster: Transformers.', priorityScore: 4.14, feasibilityScore: 3.40, selected: true },
  { optionType: 'SO', title: 'Seaweed-to-carrageenan value chain (Tawi-Tawi)', description: 'S4 Seaweed Dominance x O3 BIMP-EAGA Integration. Tawi-Tawi supplies ~40% of national seaweed and exports it raw — Foundations 0.9, Transformers 0.2. The constraint was never production. Cluster: Transformers. NOTE: zero survey respondents from this province.', priorityScore: 4.08, feasibilityScore: 3.40, selected: false },
  { optionType: 'SO', title: 'Renewable energy monetisation (Lake Lanao, solar, biomass)', description: 'S2 Renewable Endowments x O1 Renewable Investments — highest-scoring opportunity in the register at RI 4.14. Pair hydro rehabilitation with the Zamboanga-Basilan Interconnection Project. Cluster: Foundations.', priorityScore: 4.14, feasibilityScore: 3.45, selected: true },
  { optionType: 'SO', title: 'Cultural & Muslim-friendly tourism circuit', description: 'S4 Cultural Heritage x O1 Tourism Recovery. Workshop 5 identified eco-, cultural and halal tourism as three focus areas. Cluster: Connectors.', priorityScore: 3.94, feasibilityScore: 3.61, selected: false },

  // ── ST · Strengths × Threats ────────────────────────────────────────────
  { optionType: 'ST', title: 'OIC/SMIIC mutual recognition & standards alignment', description: 'S1 Halal Legitimacy vs T1 Standards Recognition. BHB accreditation stands at 0% and gates the entire halal export pathway — a critical-path item, not a compliance task. Cluster: Transformers.', priorityScore: 4.06, feasibilityScore: 3.40, selected: false },
  { optionType: 'ST', title: 'Peace-conditioned infrastructure ("Peace Roads")', description: 'S2 Peace Dividend vs T3 Residual Security Incidents — highest vulnerability index in the register (VI 2.94). Workshop 1 flagged ROW and peace-and-order as the delay drivers. Cluster: Enablers.', priorityScore: 4.16, feasibilityScore: 3.33, selected: true },
  { optionType: 'ST', title: 'Climate-resilient agriculture & adaptation finance', description: 'S1 AFF Base vs T1 Climate Change (VI 2.90). AFF contracted 4.2% in 2024. Pairs with O2 Climate Adaptation Finance (I 4.15). Cluster: Foundations.', priorityScore: 4.03, feasibilityScore: 3.45, selected: false },
  { optionType: 'ST', title: 'Sukuk & macro-capital mobilisation', description: 'S1 Islamic Finance Framework vs T2 Economic Downturn. Stakeholders ranked Macro-Capital first for finance sequencing (36 of 64). Islamic banking assets ₱2B against a ₱20B target. Cluster: Financiers.', priorityScore: 3.99, feasibilityScore: 3.55, selected: false },

  // ── WO · Weaknesses × Opportunities ─────────────────────────────────────
  { optionType: 'WO', title: 'Functional literacy & TVET-industry alignment', description: 'W3 Literacy (Risk 17.76 — HIGHEST in the entire register, n=74) x O2 Digital Leapfrogging. Human capital, not infrastructure, is the binding constraint. Workshop 1 found 15 of 40+ construction qualifications offered in BARMM. Cluster: Enablers.', priorityScore: 4.21, feasibilityScore: 3.33, selected: true },
  { optionType: 'WO', title: 'Cold chain, logistics & market-linkage build-out', description: 'W2 Cold Chain (I 4.15) x O1 Global Halal Market. 20–40% post-harvest losses per Workshop 1. Stakeholders ranked market-access assets second on connectivity (24 of 73). Cluster: Enablers.', priorityScore: 4.10, feasibilityScore: 3.33, selected: true },
  { optionType: 'WO', title: 'Islamic microfinance & MSME financial inclusion', description: 'W1 Financial Penetration x O1 Islamic Ecosystem. Section 8 respondents put awareness and literacy first (20) and human capital second (16) — capability before capital. Cluster: Financiers.', priorityScore: 3.99, feasibilityScore: 3.55, selected: false },
  { optionType: 'WO', title: 'Unified halal certification & accreditation system', description: 'W1 Halal Certification x O1 Global Halal Market. Workshop 5 rated a unified regulatory and accreditation system HIGH impact / HIGH feasibility. MSME certification: 500 of a 5,000 target. Cluster: Transformers.', priorityScore: 4.10, feasibilityScore: 3.40, selected: true },

  // ── WT · Weaknesses × Threats ───────────────────────────────────────────
  { optionType: 'WT', title: 'Land tenure & CADT resolution in the SGA', description: 'W1 Land Tenure (Risk 15.31) vs T4 Political Transition. The CADT / private title / public land overlay is the binding constraint on agro-industrial park siting. No title clarity, no park. Cluster: Foundations.', priorityScore: 3.87, feasibilityScore: 3.45, selected: false },
  { optionType: 'WT', title: 'Budget execution & inter-agency coordination reform', description: 'W2 Underspending (I 4.06, L 4.03) vs T6 Fragmented Mandates. At 80% execution, ₱28B of the ₱140B envelope never converts to output; reaching 90% recovers ₱14B — cheaper than raising new capital. Transparency was the most-cited governance lever (42 of 73). Cluster: Operating Systems.', priorityScore: 4.09, feasibilityScore: 3.58, selected: true },
  { optionType: 'WT', title: 'Integrated regional data & MEL system', description: 'W7 Fragmented Data vs T2 Drifting Goals (VI 2.79). Without a single data spine, targets erode quietly rather than visibly. Cluster: Operating Systems.', priorityScore: 3.87, feasibilityScore: 3.58, selected: false },
  { optionType: 'WT', title: 'Infrastructure cost control & delivery assurance', description: 'W1 Infra Deficits vs T2 Cost Overruns — highest impact of any threat (I 4.28). Workshop 1 named ROW, accessibility and peace-and-order as delay drivers. Cluster: Enablers.', priorityScore: 4.10, feasibilityScore: 3.33, selected: true },
];


/* ═══════════════════════════════════════════════════════════════════════════
   SWOT MATRIX & IMPACT VIEWS — transferred from SystemsThinking.tsx
   ═══════════════════════════════════════════════════════════════════════════
   These views belong here. TOWS options are DERIVED FROM scored SWOT factors,
   so keeping the scored register beside the quadrants it generates removes a
   tab-switch from the core workflow. SystemsThinking retains the CLD view,
   which is its actual subject.

   Symbols are namespaced Swot* because StrategicOptions already defines its own
   ScoreButton for priority/feasibility — a different 1–5 scale with different
   semantics. The CLD "Add to node" affordance was NOT transferred: it is a
   systems-mapping action and stays with the diagram.

   Scoring model (identical to SWOTAnalysis and the survey's formulas.ts):
     strength    RI   = (I x L) / 5     opportunity RI   = sqrt(I x L)
     weakness    Risk = I x L           threat      VI   = (I^2 x L) / 25
   ═══════════════════════════════════════════════════════════════════════════ */

const swotCategoryConfig = {
  strength:    { label: 'Strength',    icon: Shield,      color: 'emerald', bgColor: 'bg-[#059669]', lightBg: 'bg-[#059669]/10',  textColor: 'text-[#34d399]', borderColor: 'border-[#059669]/20', defaultCLDPolarity: '+' as '+' | '-' },
  weakness:    { label: 'Weakness',    icon: AlertCircle, color: 'red',     bgColor: 'bg-red-500/100',     lightBg: 'bg-red-500/10',      textColor: 'text-red-400',     borderColor: 'border-red-500/20',     defaultCLDPolarity: '-' as '+' | '-' },
  opportunity: { label: 'Opportunity', icon: Lightbulb,   color: 'blue',    bgColor: 'bg-[#C9A84C]',    lightBg: 'bg-[#C9A84C]/10',     textColor: 'text-[#C9A84C]',    borderColor: 'border-[#C9A84C]/20',    defaultCLDPolarity: '+' as '+' | '-' },
  threat:      { label: 'Threat',      icon: Zap,         color: 'amber',   bgColor: 'bg-amber-500/100',   lightBg: 'bg-amber-500/10',    textColor: 'text-amber-400',   borderColor: 'border-amber-500/20',   defaultCLDPolarity: '-' as '+' | '-' },
};

// ─── SCORE BUTTON ─────────────────────────────────────────────────────────────

const SwotScoreButton: React.FC<{
  value: number; selectedValue: number; onSelect: (v: number) => void;
  type: 'impact' | 'likelihood'; category: keyof typeof swotCategoryConfig;
}> = ({ value, selectedValue, onSelect, type, category }) => {
  const config = swotCategoryConfig[category];
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

const SwotScoreRow: React.FC<{
  label: string; score: number; onChange: (v: number) => void;
  type: 'impact' | 'likelihood'; category: keyof typeof swotCategoryConfig;
  readOnly?: boolean; labelColor?: string;
}> = ({ label, score, onChange, type, category, readOnly, labelColor }) => (
  <div className='flex items-center gap-2 flex-wrap'>
    <span className={cn('text-xs font-semibold w-16 shrink-0', labelColor || 'text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]')}>{label}</span>
    <div className='flex gap-1'>
      {[1, 2, 3, 4, 5].map(n => (
        <SwotScoreButton key={n} value={n} selectedValue={score} onSelect={readOnly ? () => {} : onChange} type={type} category={category} />
      ))}
    </div>
    <span className={cn('text-xs font-bold tabular-nums', labelColor || 'text-[#ecfdf5]/80 dark:text-[#64748b]/80 dark:text-[#64748b]')}>{score}/5</span>
  </div>
);

const SwotPriorityBadge: React.FC<{ totalScore: number; category: keyof typeof swotCategoryConfig }> = ({ totalScore, category }) => {
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

const SwotCard: React.FC<{
  item: SWOTItem; config: typeof swotCategoryConfig.strength;
  onUpdate?: (id: string, updates: Partial<SWOTItem>) => void; compact?: boolean;
}> = ({ item, config, onUpdate, compact }) => {
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
            <SwotPriorityBadge totalScore={total} category={item.category} />
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
        <SwotScoreRow label='Impact' score={imp} onChange={v => onUpdate?.(item.id, { impactScore: v })} type='impact' category={item.category} labelColor={config.textColor} />
        <SwotScoreRow label='Likelihood' score={lik} onChange={v => onUpdate?.(item.id, { likelihoodScore: v })} type='likelihood' category={item.category} />
        <div className='flex items-center justify-between pt-1 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/20/40'>
          <span className='text-xs text-[#64748b] dark:text-[#64748b]/80 dark:text-[#64748b]'>Impact × Likelihood</span>
          <div className='flex items-center gap-2'>
            <SwotPriorityBadge totalScore={total} category={item.category} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SWOT QUADRANT ────────────────────────────────────────────────────────────

const SwotQuadrant: React.FC<{
  title: string; count: number; icon: React.ElementType; items: SWOTItem[];
  config: typeof swotCategoryConfig.strength;
  onUpdate?: (id: string, updates: Partial<SWOTItem>) => void;
}> = ({ title, count, icon: Icon, items, config, onUpdate }) => {
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
            : items.map(item => <SwotCard key={item.id} item={item} config={config} onUpdate={onUpdate} compact />)
          }
        </div>
      )}
    </div>
  );
};
const QUADRANT_TYPES = ['SO', 'ST', 'WO', 'WT'] as const;
type QuadrantType = typeof QUADRANT_TYPES[number];

const quadrantConfig = {
  SO: { label: 'SO Strategies', subtitle: 'Strengths + Opportunities', description: 'Use strengths to capitalize on opportunities', color: 'emerald', bgGradient: 'from-emerald-500 to-teal-600', lightBg: 'bg-[#059669]/10', border: 'border-[#059669]/20', textColor: 'text-[#34d399]', icons: [Shield, Lightbulb], leverageLevels: [7, 4, 8], leverageRationale: 'Amplify reinforcing growth loops & self-organizing capabilities' },
  ST: { label: 'ST Strategies', subtitle: 'Strengths + Threats', description: 'Use strengths to mitigate threats', color: 'blue', bgGradient: 'from-blue-500 to-indigo-600', lightBg: 'bg-[#C9A84C]/10', border: 'border-[#C9A84C]/20', textColor: 'text-[#C9A84C]', icons: [Shield, Zap], leverageLevels: [8, 5, 6], leverageRationale: 'Strengthen balancing loops, governance rules & information access' },
  WO: { label: 'WO Strategies', subtitle: 'Weaknesses + Opportunities', description: 'Overcome weaknesses by pursuing opportunities', color: 'purple', bgGradient: 'from-purple-500 to-violet-600', lightBg: 'bg-purple-500/10', border: 'border-purple-500/20', textColor: 'text-purple-400', icons: [AlertCircle, Lightbulb], leverageLevels: [3, 6, 9], leverageRationale: 'Redefine goals, expose information gaps & reduce structural delays' },
  WT: { label: 'WT Strategies', subtitle: 'Weaknesses + Threats', description: 'Minimize weaknesses and avoid threats', color: 'amber', bgGradient: 'from-amber-500 to-orange-600', lightBg: 'bg-amber-500/10', border: 'border-amber-500/20', textColor: 'text-amber-400', icons: [AlertCircle, Zap], leverageLevels: [2, 5, 10], leverageRationale: 'Challenge paradigms, restructure stock-flow & establish defensive rules' },
};

const MEADOWS_ICONS: Record<number, React.ElementType> = { 12: Gauge, 11: Anchor, 10: Workflow, 9: Clock, 8: Activity, 7: TrendingUp, 6: BarChart2, 5: BookOpen, 4: Sparkles, 3: Target, 2: Brain, 1: Crosshair };
const MEADOWS_LEVEL_COLORS: Record<string, string> = { high: 'bg-violet-600 text-white', mid: 'bg-red-500/100 text-white', feedback: 'bg-amber-500/100 text-white', params: 'bg-slate-400 text-white' };
const getMeadowsBadgeColor = (level: number) => { if (level <= 3) return MEADOWS_LEVEL_COLORS.high; if (level <= 6) return MEADOWS_LEVEL_COLORS.mid; if (level <= 9) return MEADOWS_LEVEL_COLORS.feedback; return MEADOWS_LEVEL_COLORS.params; };

const SCORE_DESCRIPTIONS = {
  1: { priority: 'Lowest priority', feasibility: 'Very difficult' },
  2: { priority: 'Low priority', feasibility: 'Difficult' },
  3: { priority: 'Medium priority', feasibility: 'Moderate' },
  4: { priority: 'High priority', feasibility: 'Easy' },
  5: { priority: 'Highest priority', feasibility: 'Very easy' },
};

const TOTAL_SCORE_GUIDE = [
  { range: '9-10', color: 'text-[#34d399]', bg: 'bg-[#059669]/10', label: 'Excellent' },
  { range: '7-8', color: 'text-[#C9A84C]', bg: 'bg-[#C9A84C]/10', label: 'Good' },
  { range: '5-6', color: 'text-amber-400', bg: 'bg-amber-500/100/10', label: 'Fair' },
  { range: '<5', color: 'text-[#ecfdf5]/80', bg: 'bg-[#064e3b]/20', label: 'Low' },
];

const getTotalScoreTier = (total: number) => TOTAL_SCORE_GUIDE.find(t => { if (t.range.includes('<')) return total < parseInt(t.range.substring(1)); const [min, max] = t.range.split('-').map(Number); return total >= min && total <= max; }) ?? TOTAL_SCORE_GUIDE[3];

const getLeveragePointsForQuadrant = (leveragePoints: LeveragePoint[], quadrant: QuadrantType): LeveragePoint[] => {
  const affinityLevels = quadrantConfig[quadrant].leverageLevels;
  const exact = leveragePoints.filter(lp => affinityLevels.includes(lp.leverageLevel));
  const highImp = leveragePoints.filter(lp => !affinityLevels.includes(lp.leverageLevel) && lp.expectedImpact === 'high');
  return [...exact, ...highImp].slice(0, 3);
};

const buildSystemsContext = (leveragePoints: LeveragePoint[], archetypeName: string | null | undefined, archetypeDescription: string | null | undefined, cldNodes: CLDNode[], cldLinks: CLDLink[]): string => {
  const lines: string[] = [];
  if (archetypeName) { lines.push(`ACTIVE SYSTEMS ARCHETYPE: "${archetypeName}"`); if (archetypeDescription) lines.push(`  Description: ${archetypeDescription}`); lines.push(''); }
  if (cldNodes.length > 0) {
    lines.push('CAUSAL LOOP DIAGRAM (CLD) VARIABLES:');
    cldNodes.forEach(n => lines.push(`  - ${n.label}${n.category ? ` [${n.category}]` : ''}`));
    lines.push('');
    if (cldLinks.length > 0) {
      lines.push('CLD CAUSAL RELATIONSHIPS:');
      cldLinks.forEach(l => {
        const fromNode = cldNodes.find(n => n.id === l.from)?.label ?? l.from;
        const toNode = cldNodes.find(n => n.id === l.to)?.label ?? l.to;
        lines.push(`  ${fromNode} ${l.polarity === '+' ? '→(+)' : '→(−)'} ${toNode}${(l.strength ?? 0) >= 4 ? ' [HIGH GAIN]' : ''}`);
      });
    }
  }
  if (leveragePoints.length > 0) {
    lines.push('MEADOWS LEVERAGE POINTS:');
    [...leveragePoints].sort((a, b) => a.leverageLevel - b.leverageLevel).forEach(lp => lines.push(`  [L${lp.leverageLevel} — ${lp.meadowsName}] (${lp.expectedImpact} impact / ${lp.timeHorizon}-term) → ${lp.intervention}`));
  }
  return lines.join('\n');
};

const ScoreButton: React.FC<{ value: number; selectedValue: number; onSelect: (value: number) => void; type: 'priority' | 'feasibility'; Icon?: React.ElementType; }> = ({ value, selectedValue, onSelect, type, Icon = Check }) => {
  const description = SCORE_DESCRIPTIONS[value as keyof typeof SCORE_DESCRIPTIONS];
  return (
    <TooltipProvider><Tooltip><TooltipTrigger asChild>
      <button onClick={() => onSelect(value)} className="transition-all transform hover:scale-110 active:scale-95">
        {Icon === Star ? <Star className={cn('w-4 h-4 transition-colors', value <= selectedValue ? 'text-amber-400 fill-current' : 'text-[#64748b]')} /> : <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center', value <= selectedValue ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-[#C9A84C]/30 hover:border-[#C9A84C]/30')}>{value <= selectedValue && <Check className="w-3 h-3 text-white" />}</div>}
      </button>
    </TooltipTrigger><TooltipContent side="top" className="max-w-[200px] z-50"><p className="font-semibold text-[#C9A84C]">{type} Level {value}</p><p className="text-xs text-[#ecfdf5]/80">{type === 'priority' ? description.priority : description.feasibility}</p></TooltipContent></Tooltip></TooltipProvider>
  );
};

const LeverageBadge: React.FC<{ lp: LeveragePoint }> = ({ lp }) => {
  const Icon = MEADOWS_ICONS[lp.leverageLevel] ?? Target;
  return (
    <TooltipProvider><Tooltip><TooltipTrigger asChild>
      <div className={cn('flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold cursor-help', getMeadowsBadgeColor(lp.leverageLevel))}><Icon className="w-3 h-3" /> L{lp.leverageLevel}</div>
    </TooltipTrigger><TooltipContent side="bottom" className="max-w-[260px] z-50 space-y-1"><p className="font-semibold text-violet-700">[L{lp.leverageLevel}] {lp.meadowsName}</p><p className="text-xs text-[#ecfdf5]/80">{lp.intervention}</p></TooltipContent></Tooltip></TooltipProvider>
  );
};

const StrategyCard: React.FC<{ option: StrategicOption; config: typeof quadrantConfig.SO; onUpdate: (updates: Partial<StrategicOption>) => void; onRemove: () => void; }> = ({ option, config, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(option.title);
  const [editDesc, setEditDesc] = useState(option.description);
  const handleSave = () => { onUpdate({ title: editTitle, description: editDesc }); setIsEditing(false); };
  const total = (option.priorityScore || 3) + (option.feasibilityScore || 3);
  const scoreTier = getTotalScoreTier(total);

  return (
    <div className={cn(`${config.lightBg} ${config.border} border rounded-xl p-4 group hover:shadow-md transition-all`, option.selected && 'ring-2 ring-[#C9A84C] ring-offset-2')}>
      {isEditing ? (
        <div className="space-y-3">
          <input type="text" value={editTitle} autoFocus onChange={e => setEditTitle(e.target.value)} className="w-full px-3 py-2 text-sm font-medium border border-[#C9A84C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]" />
          <textarea value={editDesc} rows={3} onChange={e => setEditDesc(e.target.value)} className="w-full px-3 py-2 text-sm border text-foreground bg-background border-[#C9A84C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] resize-none" />
          <div className="flex justify-end gap-2">
            <button onClick={() => { setEditTitle(option.title); setEditDesc(option.description); setIsEditing(false); }} className="px-3 py-1.5 text-sm text-[#ecfdf5]/80 rounded-lg">Cancel</button>
            <button onClick={handleSave} className="px-3 py-1.5 text-sm bg-[#C9A84C] text-white rounded-lg">Save</button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <button onClick={() => onUpdate({ selected: !option.selected })} className={cn('w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0', option.selected ? 'bg-[#C9A84C] border-[#C9A84C] text-white' : 'border-[#C9A84C]/30 hover:border-[#C9A84C]')}>{option.selected && <Check className="w-3 h-3" />}</button>
              <h4 className="font-semibold text-[#E8C560] truncate">{option.title}</h4>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setIsEditing(true)} className="p-1.5 text-[#64748b]/80 hover:text-[#ecfdf5]/80 rounded-full hover:bg-[#064e3b]/20"><Edit2 className="w-3.5 h-3.5" /></button>
              <button onClick={onRemove} className="p-1.5 text-red-400 hover:text-red-400 rounded-full hover:bg-red-500/10"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <p className="text-sm text-[#ecfdf5]/80 mb-3 line-clamp-2">{option.description}</p>
          <div className="flex items-center justify-between pt-3 border-t border-[#C9A84C]/20/50 flex-wrap gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-[#ecfdf5]/80">Priority:</span>
                <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(n => <ScoreButton key={n} value={n} selectedValue={option.priorityScore || 3} onSelect={val => onUpdate({ priorityScore: val })} type="priority" Icon={Star} />)}</div>
                <span className={cn('text-xs font-semibold w-5 text-center', (option.priorityScore || 3) >= 4 ? 'text-amber-400' : 'text-[#64748b]')}>{option.priorityScore || 3}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-[#ecfdf5]/80">Feasibility:</span>
                <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(n => <ScoreButton key={n} value={n} selectedValue={option.feasibilityScore || 3} onSelect={val => onUpdate({ feasibilityScore: val })} type="feasibility" />)}</div>
                <span className={cn('text-xs font-semibold w-5 text-center', (option.feasibilityScore || 3) >= 4 ? 'text-[#C9A84C]' : 'text-[#64748b]')}>{option.feasibilityScore || 3}</span>
              </div>
            </div>
            <div className={cn('px-3 py-1.5 rounded-full text-xs font-bold', scoreTier.bg, scoreTier.color)}>Score: {total}/10</div>
          </div>
        </>
      )}
    </div>
  );
};

const SystemsContextPanel: React.FC<{ leveragePoints: LeveragePoint[]; archetypeName?: string | null; archetypeDescription?: string | null; cldNodes: CLDNode[]; cldLinks: CLDLink[]; }> = ({ leveragePoints, archetypeName, archetypeDescription, cldNodes, cldLinks }) => {
  const [expanded, setExpanded] = useState(true);
  const highLPs = leveragePoints.filter(lp => lp.leverageLevel <= 4);
  const midLPs = leveragePoints.filter(lp => lp.leverageLevel >= 5 && lp.leverageLevel <= 7);
  const lowLPs = leveragePoints.filter(lp => lp.leverageLevel >= 8);

  return (
    <div className="rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 overflow-hidden">
      <button onClick={() => setExpanded(v => !v)} className="w-full flex items-center justify-between px-4 py-3 text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center"><GitBranch className="w-4 h-4 text-white" /></div>
          <div>
            <h3 className="font-semibold text-violet-900 text-sm">Systems Thinking Context</h3>
            <p className="text-[11px] text-violet-600">{archetypeName ? `Archetype: ${archetypeName}` : 'No archetype active'} · {leveragePoints.length} LPs · {cldNodes.length} CLD variables</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-violet-500" /> : <ChevronDown className="w-4 h-4 text-violet-500" />}
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-violet-200/60">
          {archetypeName && <div className="flex items-start gap-3 pt-3"><div className="w-6 h-6 rounded bg-violet-200 flex items-center justify-center shrink-0 mt-0.5"><Layers className="w-3.5 h-3.5 text-violet-700" /></div><div><p className="text-xs font-semibold text-violet-800">{archetypeName}</p>{archetypeDescription && <p className="text-[11px] text-violet-600 leading-relaxed mt-0.5">{archetypeDescription}</p>}</div></div>}
          {leveragePoints.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-violet-500">Identified Leverage Points</p>
              <div className="flex flex-wrap gap-1.5 text-[9px] font-bold">
                <span className="px-2 py-0.5 rounded bg-violet-600 text-white">L1–3: Paradigm</span>
                <span className="px-2 py-0.5 rounded bg-red-500/100 text-white">L4–6: Info/Rules</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/100 text-white">L7–9: Feedback</span>
                <span className="px-2 py-0.5 rounded bg-slate-400 text-white">L10–12: Params</span>
              </div>
              {[{ label: 'High Leverage', lps: highLPs }, { label: 'Mid Leverage', lps: midLPs }, { label: 'Lower Leverage', lps: lowLPs }].map(({ label, lps }) => lps.length > 0 && (
                <div key={label}>
                  <p className="text-[10px] text-[#64748b] font-medium mb-1.5">{label}</p>
                  <div className="space-y-1.5">
                    {lps.map((lp, i) => {
                      const Icon = MEADOWS_ICONS[lp.leverageLevel] ?? Target;
                      return (
                        <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/70 border border-violet-100">
                          <span className={cn('shrink-0 text-[10px] font-black px-1.5 py-0.5 rounded mt-0.5', getMeadowsBadgeColor(lp.leverageLevel))}>L{lp.leverageLevel}</span>
                          <div className="flex-1 min-w-0"><p className="text-[11px] font-semibold text-[#E8C560]/90 truncate">{lp.meadowsName}</p><p className="text-[10px] text-[#64748b] leading-relaxed line-clamp-2">{lp.intervention}</p></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const StrategicOptions: React.FC<StrategicOptionsProps> = ({ plan, onAddOption, onUpdateOption, onRemoveOption, onBulkAdd, onUpdateSWOTItem, leveragePoints = [], selectedArchetypeId = null, selectedArchetypeName = null, activeArchetypeDescription = null, cldNodes = [], cldLinks = [] }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [newStrategy, setNewStrategy] = useState<{ quadrant: QuadrantType | null; title: string; description: string; }>({ quadrant: null, title: '', description: '' });

  const hasSystemsContext = leveragePoints.length > 0 || cldNodes.length > 0 || !!selectedArchetypeName;

  // Auto-sync plan to cloud
  useEffect(() => {
    const syncPlan = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) return;
        await fetch(SYNC_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
          body: JSON.stringify({ plan }),
        });
      } catch (error) { console.error('Failed to sync plan to cloud:', error); }
    };
    const timer = setTimeout(syncPlan, 2000);
    return () => clearTimeout(timer);
  }, [plan]);

  const handleGenerateStrategies = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error('Not authenticated');

      const strengths = (plan.swotItems || []).filter(i => i.category === 'strength').map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      const weaknesses = (plan.swotItems || []).filter(i => i.category === 'weakness').map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      const opportunities = (plan.swotItems || []).filter(i => i.category === 'opportunity').map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));
      const threats = (plan.swotItems || []).filter(i => i.category === 'threat').map(i => ({ description: i.description, impactScore: i.impactScore || 3, likelihoodScore: i.likelihoodScore || 3 }));

      const systemsContext = hasSystemsContext ? buildSystemsContext(leveragePoints, selectedArchetypeName, activeArchetypeDescription, cldNodes, cldLinks) : null;
      const quadrantLeverageGuide = QUADRANT_TYPES.reduce<Record<string, any>>((acc, q) => {
        const qLPs = getLeveragePointsForQuadrant(leveragePoints, q);
        acc[q] = { leverageRationale: quadrantConfig[q].leverageRationale, relevantLeveragePoints: qLPs.map(lp => ({ level: lp.leverageLevel, meadowsName: lp.meadowsName, intervention: lp.intervention, expectedImpact: lp.expectedImpact, timeHorizon: lp.timeHorizon })) };
        return acc;
      }, {} as Record<string, any>);

      const response = await fetch(AI_ASSISTANT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
        body: JSON.stringify({
          action: 'generate_strategies',
          data: {
            strengths, weaknesses, opportunities, threats,
            strategicIntent: plan.strategicIntent,
            systemsContext,
            activeArchetype: selectedArchetypeName ? { id: selectedArchetypeId, name: selectedArchetypeName, description: activeArchetypeDescription } : null,
            leveragePoints: leveragePoints.map(lp => ({ level: lp.leverageLevel, meadowsName: lp.meadowsName, intervention: lp.intervention, impact: lp.expectedImpact, horizon: lp.timeHorizon, source: lp.source })),
            cldVariables: cldNodes.map(n => ({ label: n.label, category: n.category })),
            cldRelationships: cldLinks.map(l => ({ from: cldNodes.find(n => n.id === l.from)?.label ?? l.from, to: cldNodes.find(n => n.id === l.to)?.label ?? l.to, polarity: l.polarity, strength: l.strength })),
            quadrantLeverageGuide,
            generationInstructions: buildGenerationInstructions(strengths.map(s => s.description), weaknesses.map(w => w.description), opportunities.map(o => o.description), threats.map(t => t.description), plan.strategicIntent, systemsContext, selectedArchetypeName, leveragePoints, quadrantLeverageGuide),
          },
          plan: plan,
        }),
      });

      const result = await response.json();
      if (!result.success || !result.data) throw new Error('Invalid response from AI service');

      const options: Omit<StrategicOption, 'id'>[] = [];
      QUADRANT_TYPES.forEach(type => {
        const strategies = result.data[type] || [];
        strategies.forEach((s: any) => {
          options.push({ optionType: type, title: s.title || 'Strategy', description: s.description || '', priorityScore: s.priority_score || 3, feasibilityScore: s.feasibility_score || 3, selected: false });
        });
      });

      if (options.length > 0) onBulkAdd(options);
      else setGenerationError('No strategies were generated.');
    } catch (error) {
      console.error('Failed to generate strategies:', error);
      setGenerationError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddStrategy = () => {
    if (!newStrategy.quadrant || !newStrategy.title.trim()) return;
    onAddOption({ optionType: newStrategy.quadrant, title: newStrategy.title.trim(), description: newStrategy.description.trim(), priorityScore: 3, feasibilityScore: 3, selected: false });
    setNewStrategy({ quadrant: null, title: '', description: '' });
  };

  // Fall back to the survey-scored TOWS baseline when the plan has no options of
  // its own, so the quadrants open populated with traceable evidence rather than
  // four empty boxes. A user's own options always take precedence.
  // TOWS | Matrix | Impact — Matrix and Impact transferred from SystemsThinking.
  const [swotView, setSwotView] = useState<'tows' | 'matrix' | 'impact'>('tows');

  const swotGroups = useMemo(() => {
    const all = plan.swotItems || [];
    return {
      strengths:     all.filter(i => i.category === 'strength'),
      weaknesses:    all.filter(i => i.category === 'weakness'),
      opportunities: all.filter(i => i.category === 'opportunity'),
      threats:       all.filter(i => i.category === 'threat'),
    };
  }, [plan.swotItems]);

  /** Ranked by the category-appropriate metric, not a flat I x L for everything. */
  const sortedImpact = useMemo(() => (plan.swotItems || []).map(item => {
    const imp = item.impactScore || 3;
    const lik = item.likelihoodScore || 3;
    const total = item.category === 'strength'    ? (imp * lik) / 5
                : item.category === 'opportunity' ? Math.sqrt(imp * lik)
                : item.category === 'weakness'    ? imp * lik
                :                                   (imp * imp * lik) / 25;
    return { ...item, total };
  }).sort((a, b) => b.total - a.total), [plan.swotItems]);

  const usingBaseline = !(plan.strategicOptions || []).length;
  const matrixOptions = useMemo<StrategicOption[]>(
    () => (plan.strategicOptions?.length
      ? plan.strategicOptions
      : BIRD_TOWS_BASELINE.map((o, i) => ({ ...o, id: `bird-tows-${String(i + 1).padStart(2, '0')}` }))),
    [plan.strategicOptions],
  );

  const getOptionsByType = (type: QuadrantType) => matrixOptions.filter(opt => opt.optionType === type);
  const selectedCount = matrixOptions.filter(opt => opt.selected).length;

  // Quadrant-level ecosystem reading: mean priority vs mean feasibility.
  const quadrantStats = useMemo(() => QUADRANT_TYPES.map(t => {
    const os = matrixOptions.filter(o => o.optionType === t);
    const n = os.length || 1;
    const pri = os.reduce((a, o) => a + (o.priorityScore || 3), 0) / n;
    const fea = os.reduce((a, o) => a + (o.feasibilityScore || 3), 0) / n;
    return { type: t, count: os.length, priority: pri, feasibility: fea, gap: pri - fea };
  }), [matrixOptions]);
  const swotCounts = useMemo(() => ({ strengths: (plan.swotItems || []).filter(i => i.category === 'strength').length, weaknesses: (plan.swotItems || []).filter(i => i.category === 'weakness').length, opportunities: (plan.swotItems || []).filter(i => i.category === 'opportunity').length, threats: (plan.swotItems || []).filter(i => i.category === 'threat').length }), [plan.swotItems]);
  const canGenerate = swotCounts.strengths > 0 && swotCounts.weaknesses > 0 && swotCounts.opportunities > 0 && swotCounts.threats > 0;

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#E8C560]">Strategic Options</h1>
            <p className="text-[#64748b]">Generate and prioritize SO/ST/WO/WT strategic options{hasSystemsContext ? ' · systems-informed' : ''}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-[#ecfdf5]/80"><span className="font-medium text-[#C9A84C]">{selectedCount}</span> selected</div>
            <button onClick={handleGenerateStrategies} disabled={isGenerating || !canGenerate} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#065f46] to-[#4c1d95] text-white rounded-xl text-sm font-medium hover:shadow-lg disabled:opacity-50 transition-all">
              {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <><Sparkles className="w-4 h-4" /> AI Generate{hasSystemsContext ? ' (Systems-Aware)' : ''}</>}
            </button>
          </div>
        </div>

        {hasSystemsContext && <SystemsContextPanel leveragePoints={leveragePoints} archetypeName={selectedArchetypeName} archetypeDescription={activeArchetypeDescription} cldNodes={cldNodes} cldLinks={cldLinks} />}
        {/* ── View switcher: TOWS | Matrix | Impact ─────────────────────── */}
        <div className="flex items-center gap-1 bg-[#064e3b]/20 dark:bg-[#022c22]/60 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'tows',   label: 'TOWS Strategies', Icon: Target },
            { id: 'matrix', label: 'SWOT Matrix',     Icon: LayoutDashboard },
            { id: 'impact', label: 'Impact Ranking',  Icon: AlertTriangle },
          ].map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setSwotView(id as typeof swotView)}
              className={cn('flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-1 justify-center',
                swotView === id ? 'bg-white dark:bg-[#022c22]/60 shadow-sm text-[#E8C560] dark:text-[#ecfdf5]' : 'text-[#64748b] hover:text-[#E8C560]/90')}>
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* ── SWOT MATRIX VIEW (transferred from SystemsThinking) ────────── */}
        {swotView === 'matrix' && (
          <div className="space-y-3">
            <p className="text-xs text-[#64748b] leading-relaxed">
              The scored register the TOWS quadrants are derived from. Editing a score here re-ranks Impact and
              changes which pairings the matrix should generate.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SwotQuadrant title="Strengths"     count={swotGroups.strengths.length}     icon={Shield}      items={swotGroups.strengths}     config={swotCategoryConfig.strength}    onUpdate={onUpdateSWOTItem} />
              <SwotQuadrant title="Weaknesses"    count={swotGroups.weaknesses.length}    icon={AlertCircle} items={swotGroups.weaknesses}    config={swotCategoryConfig.weakness}    onUpdate={onUpdateSWOTItem} />
              <SwotQuadrant title="Opportunities" count={swotGroups.opportunities.length} icon={Lightbulb}   items={swotGroups.opportunities} config={swotCategoryConfig.opportunity} onUpdate={onUpdateSWOTItem} />
              <SwotQuadrant title="Threats"       count={swotGroups.threats.length}       icon={Zap}         items={swotGroups.threats}       config={swotCategoryConfig.threat}      onUpdate={onUpdateSWOTItem} />
            </div>
          </div>
        )}

        {/* ── IMPACT RANKING VIEW (transferred from SystemsThinking) ─────── */}
        {swotView === 'impact' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-[#E8C560]/90 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Ranked by category-appropriate metric
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Strengths and opportunities use the Resilience Index; weaknesses use Risk; threats use the
              Vulnerability Index. A flat Impact x Likelihood ranking would over-weight weaknesses, whose Risk scale
              runs to 25 while the others cap at 5.
            </p>
            {sortedImpact.length === 0 ? (
              <p className="text-sm text-[#64748b]/80 text-center py-8">
                No SWOT items scored yet — complete the SWOT Analysis to populate this view.
              </p>
            ) : sortedImpact.map((item, idx) => {
              const cfg  = swotCategoryConfig[item.category];
              const Icon = cfg.icon;
              return (
                <div key={item.id} className="bg-white dark:bg-[#022c22]/60 rounded-xl border border-[#C9A84C]/20 p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold text-[#64748b]/80 w-6 shrink-0 mt-0.5">#{idx + 1}</span>
                    <div className={cn('p-1.5 rounded-lg shrink-0', cfg.bgColor)}><Icon className="w-3.5 h-3.5 text-white" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                        <span className={cn('text-xs font-semibold', cfg.textColor)}>{cfg.label}</span>
                        <SwotPriorityBadge totalScore={item.total} category={item.category} />
                      </div>
                      <p className="text-sm text-[#E8C560]/90">{item.description}</p>
                    </div>
                  </div>
                  <div className="pl-9 space-y-2">
                    <SwotScoreRow label="Impact"     score={item.impactScore     || 3} onChange={v => onUpdateSWOTItem?.(item.id, { impactScore: v })}     type="impact"     category={item.category} labelColor={cfg.textColor} />
                    <SwotScoreRow label="Likelihood" score={item.likelihoodScore || 3} onChange={v => onUpdateSWOTItem?.(item.id, { likelihoodScore: v })} type="likelihood" category={item.category} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {swotView === 'tows' && (<>
        {usingBaseline && (
          <div className="bg-[#064e3b]/10 dark:bg-[#022c22]/60 border border-[#C9A84C]/30 rounded-xl p-5 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">
                  Validation Survey · Section 10 · formulas.ts weights
                </span>
                <h3 className="text-base font-bold text-[#E8C560]">Strategic Pathway Evaluation</h3>
              </div>
              <span className="text-xs text-[#64748b] dark:text-[#a7f3d0]/70 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-3 py-1">
                n = {SURVEY_FRAME.n} · {MATRIX_CONTAMINATION.differentiators} differentiating
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PATHWAY_VALIDATION.map(o => (
                <div key={o.code} className={cn('rounded-lg border p-3', o.rank === 1 ? 'border-[#059669]/40 bg-[#059669]/[0.07]' : 'border-[#C9A84C]/20 bg-white/[0.02]')}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-[#E8C560]">{o.code}</span>
                    <span className="text-[0.68rem] text-[#64748b]">{o.name}</span>
                    <span className={cn('ml-auto text-sm font-bold tabular-nums', o.rank === 1 ? 'text-[#34d399]' : 'text-[#C9A84C]')}>{o.respondentScore.toFixed(2)}</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/10 overflow-hidden mb-2">
                    <div className={cn('h-full rounded-full', o.rank === 1 ? 'bg-[#059669]' : 'bg-[#C9A84C]/60')} style={{ width: `${(o.respondentScore / 10) * 100}%` }} />
                  </div>
                  <p className="text-[0.68rem] text-[#64748b] leading-relaxed">{o.thesis}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-[#C9A84C]/25 bg-white/[0.02] p-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] mb-1.5">Why IEDS, as arithmetic</h4>
              <p className="text-[0.72rem] text-[#64748b] leading-relaxed">
                BEIE clusters are <strong className="text-[#E8C560]/80">serial, not additive</strong>. Averaging cluster
                readiness gives {(ECOSYSTEM_MATH.meanReadiness * 100).toFixed(0)}%; multiplying gives{' '}
                {(ECOSYSTEM_MATH.serialThroughput * 100).toFixed(1)}%, and {(ECOSYSTEM_MATH.withOperatingSystem * 100).toFixed(1)}%
                once the Operating System gate is applied — a {ECOSYSTEM_MATH.optimismGap}x optimism gap. The binding
                constraint is <strong className="text-red-400">{ECOSYSTEM_MATH.bindingCluster}</strong> at{' '}
                {ECOSYSTEM_MATH.bindingReadiness}. Marginal sensitivity is near-flat across clusters
                ({ECOSYSTEM_MATH.sensitivityRange}): in a serial system every node constrains the whole, so no cluster
                can be safely deferred. That is the case against sequencing capital by sector and for synchronised
                development.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A84C] mb-2">Quadrant priority vs feasibility</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {quadrantStats.map(q => (
                  <div key={q.type} className="rounded-lg border border-[#C9A84C]/20 bg-white/[0.02] p-2.5">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-xs font-bold text-[#E8C560]">{q.type}</span>
                      <span className="text-[0.6rem] text-[#64748b]">{q.count} options</span>
                    </div>
                    <div className="text-[0.62rem] text-[#64748b]">priority <span className="text-[#C9A84C] font-semibold">{q.priority.toFixed(2)}</span></div>
                    <div className="text-[0.62rem] text-[#64748b]">feasibility <span className={cn('font-semibold', q.feasibility < 3.45 ? 'text-red-400' : 'text-[#34d399]')}>{q.feasibility.toFixed(2)}</span></div>
                    <div className="text-[0.62rem] text-amber-400 mt-0.5">gap +{q.gap.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <p className="text-[0.68rem] text-[#64748b] mt-2 leading-relaxed">
                Every quadrant shows priority above feasibility. Ambition is not the constraint — delivery readiness is.
                Feasibility here is the owning cluster&rsquo;s respondent readiness, so quadrants weighted toward
                Enablers score lowest by construction.
              </p>
            </div>

            <div className="rounded-lg border border-amber-500/35 bg-amber-500/[0.08] p-3">
              <p className="text-[0.72rem] text-amber-700 dark:text-amber-300 leading-relaxed">
                <strong>Default contamination.</strong> {MATRIX_CONTAMINATION.allAtDefault} of{' '}
                {MATRIX_CONTAMINATION.respondents} respondents left all 28 scoring cells at the slider default;{' '}
                {MATRIX_CONTAMINATION.pctCellsAtDefault}% of cells are midpoint-contaminated. Scores above use the{' '}
                {MATRIX_CONTAMINATION.differentiators}-respondent differentiator subset only. Fix the slider defaults
                before the next wave.
              </p>
            </div>

            <p className="text-[0.68rem] text-[#64748b]/80 leading-relaxed">
              {SURVEY_FRAME.note} Zero respondents from {SURVEY_FRAME.silentProvinces.join(' and ')}. Post-2024 BARMM
              comprises five provinces plus the SGA and Cotabato City; Sulu is not part of the region.
            </p>
          </div>
        )}

        {!canGenerate && <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center gap-3"><AlertCircle className="w-5 h-5 text-amber-400" /><div><p className="text-sm font-medium text-amber-800">Complete SWOT Analysis First</p><p className="text-xs text-amber-400">Current: {swotCounts.strengths}S, {swotCounts.weaknesses}W, {swotCounts.opportunities}O, {swotCounts.threats}T</p></div></div>}
        {generationError && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3"><AlertTriangle className="w-5 h-5 text-red-400" /><p className="text-sm font-medium text-red-800">{generationError}</p></div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {QUADRANT_TYPES.map(type => {
            const config = quadrantConfig[type];
            const options = getOptionsByType(type);
            const [Icon1, Icon2] = config.icons;
            return (
              <div key={type} className="bg-white rounded-xl border border-[#C9A84C]/20 overflow-hidden shadow-sm">
                <div className={`bg-gradient-to-r ${config.bgGradient} px-4 py-3`}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1"><Icon1 className="w-5 h-5 text-white/80" /><ArrowRight className="w-4 h-4 text-white/60" /><Icon2 className="w-5 h-5 text-white/80" /></div>
                    <div><h3 className="font-semibold text-white">{config.label}</h3><p className="text-xs text-white/70">{config.description}</p></div>
                    <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-sm text-white">{options.length}</span>
                  </div>
                </div>
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {options.map(option => <StrategyCard key={option.id} option={option} config={config} onUpdate={updates => onUpdateOption(option.id, updates)} onRemove={() => onRemoveOption(option.id)} />)}
                  {newStrategy.quadrant === type ? (
                    <div className={cn(`${config.lightBg} ${config.border} border rounded-xl p-4 space-y-3`)}>
                      <input type="text" autoFocus value={newStrategy.title} onChange={e => setNewStrategy(p => ({ ...p, title: e.target.value }))} className="w-full px-3 py-2 text-sm font-medium border border-[#C9A84C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]" placeholder="Strategy title" />
                      <textarea value={newStrategy.description} rows={2} onChange={e => setNewStrategy(p => ({ ...p, description: e.target.value }))} className="w-full px-3 py-2 text-sm border text-foreground bg-background border-[#C9A84C]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C] resize-none" placeholder="Strategy description" />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setNewStrategy({ quadrant: null, title: '', description: '' })} className="px-3 py-1.5 text-sm text-[#ecfdf5]/80 rounded-lg">Cancel</button>
                        <button onClick={handleAddStrategy} disabled={!newStrategy.title.trim()} className="px-3 py-1.5 text-sm bg-[#C9A84C] text-white rounded-lg disabled:opacity-50">Add Strategy</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setNewStrategy({ quadrant: type, title: '', description: '' })} className={cn('w-full py-3 border-2 border-dashed rounded-xl text-sm font-medium text-[#64748b] hover:text-[#E8C560]/90 hover:border-slate-400 transition-colors flex items-center justify-center gap-2', config.lightBg)}><Plus className="w-4 h-4" /> Add {type} Strategy</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {selectedCount > 0 && (
          <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-xl p-6">
            <h3 className="font-semibold text-[#C9A84C] mb-4 flex items-center gap-2"><Check className="w-5 h-5" /> Selected Strategic Options ({selectedCount})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {matrixOptions.filter(opt => opt.selected).sort((a, b) => ((b.priorityScore || 3) + (b.feasibilityScore || 3)) - ((a.priorityScore || 3) + (a.feasibilityScore || 3))).map(opt => {
                const total = (opt.priorityScore || 3) + (opt.feasibilityScore || 3);
                const tier = getTotalScoreTier(total);
                return (
                  <div key={opt.id} className="bg-white rounded-lg p-3 border border-[#C9A84C]/20 flex items-start gap-3 hover:shadow-sm transition-shadow">
                    <span className={cn('px-2 py-1 rounded text-xs font-bold text-white shrink-0', opt.optionType === 'SO' ? 'bg-[#059669]' : opt.optionType === 'ST' ? 'bg-[#C9A84C]' : opt.optionType === 'WO' ? 'bg-purple-500/100' : 'bg-amber-500/100')}>{opt.optionType}</span>
                    <div className="flex-1 min-w-0"><p className="font-medium text-[#E8C560] text-sm truncate">{opt.title}</p><p className={cn('text-xs font-semibold', tier.color)}>Score: {total}/10</p></div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        </>)}
      </div>
    </TooltipProvider>
  );
};

function buildGenerationInstructions(strengths: string[], weaknesses: string[], opportunities: string[], threats: string[], strategicIntent: string | undefined, systemsContext: string | null, archetypeName: string | null | undefined, leveragePoints: LeveragePoint[], quadrantLeverageGuide: Record<string, any>): string {
  const lines: string[] = [];
  lines.push('=== STRATEGY GENERATION TASK ===');
  lines.push('Generate 2–3 CONCRETE, ACTIONABLE strategic options for each TOWS quadrant.');
  lines.push('CRITICAL REQUIREMENTS:');
  lines.push('  1. Each strategy MUST directly reference at least one strength/weakness AND one opportunity/threat.');
  lines.push('  2. Assign priority_score (1–5) and feasibility_score (1–5).');
  lines.push('  3. DO NOT produce generic strategies — every option must be traceable to specific SWOT items.');
  if (strategicIntent) { lines.push(`STRATEGIC INTENT: "${strategicIntent}"`); lines.push(''); }
  lines.push('─── SWOT INVENTORY ───');
  if (strengths.length > 0) { lines.push('STRENGTHS:'); strengths.forEach((s, i) => lines.push(`  S${i + 1}: ${s}`)); }
  if (weaknesses.length > 0) { lines.push('WEAKNESSES:'); weaknesses.forEach((w, i) => lines.push(`  W${i + 1}: ${w}`)); }
  if (opportunities.length > 0) { lines.push('OPPORTUNITIES:'); opportunities.forEach((o, i) => lines.push(`  O${i + 1}: ${o}`)); }
  if (threats.length > 0) { lines.push('THREATS:'); threats.forEach((t, i) => lines.push(`  T${i + 1}: ${t}`)); }
  if (systemsContext) { lines.push('─── SYSTEMS THINKING CONTEXT ───'); lines.push(systemsContext); }
  lines.push('─── OUTPUT FORMAT ───');
  lines.push('Return a JSON object with keys "SO", "ST", "WO", "WT". Each key maps to an array of strategy objects:');
  lines.push('{ "SO": [{ "title": "...", "description": "...", "priority_score": 4, "feasibility_score": 3 }], ... }');
  return lines.join('\n');
}

export default StrategicOptions;