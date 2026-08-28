import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion-shim';
import { TrendingUp, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Clock, Target, DollarSign, Users, Cog, GraduationCap, ArrowUpRight, FolderKanban, Info, X, Send, Sparkles, Globe, ChevronDown, Loader as Loader2, ExternalLink, BookOpen, GitBranch, BrainCircuit, Layers, ArrowRight, Play, Zap, Shield, Leaf, ClipboardCheck } from 'lucide-react';
import { StrategicPlan } from '@/lib/strategicPlanStore';
import { EDGE_FUNCTIONS, BRAND_ASSETS } from '@/lib/supabase';
import { openValidationSurvey } from '@/lib/bird-urls';

// ─── Import HeroSection from external file ────────────────────────────────────
import HeroSection from './HeroSection';

// ─── Asset constants (env-var backed) ────────────────────────────────────────
const BIRD_BANNER_URL =
  'https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/public/BIRD%20Banner.png';
const AI_AVATAR_URL = BRAND_ASSETS.AI_AVATAR_URL;
const AI_ENDPOINT   = EDGE_FUNCTIONS.AI_STRATEGY_ASSISTANT;

// ─── BIRD 2026-2035 Data ──────────────────────────────────────────────────────
import { PARETO_KPIS }                                     from '@/data/bird/kpis';
import { BSC_LEVERAGE_POINTS as BSC_POINTS }               from '@/data/bird/kpis';
import { ALL_BSC_KPIS }                                    from '@/data/bird/kpis';
import type { KPI, BSCPerspective }                        from '@/data/bird/kpis';
import { ACTION_PLAN_2026 as PRIORITY_ACTIONS }            from '@/data/bird/actions';
import { CAUSAL_LOOPS as FEEDBACK_LOOPS }                  from '@/data/bird/clds';
import { PHASES, TOTAL_BUDGET }                            from '@/data/bird/phases';

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDATION SURVEY & SECONDARY DATA — inlined, no external module required
// ═══════════════════════════════════════════════════════════════════════════════
// Source: Supabase `survey_responses`, BIRD_2026-2035 project.
//   76 consented responses, fielded 3–20 August 2026, mean 228.7 of ~245 fields
//   answered. Aggregates computed server-side and frozen here so this component
//   has no runtime data dependency.
//
// SAMPLING CAVEAT: non-probability convenience sample, no weighting frame.
// These are stakeholder validation signals, NOT population estimates. Basilan,
// Basilan and Tawi-Tawi returned ZERO respondents and ~78% of the sample sits in
// the Cotabato City / Maguindanao del Norte mainland corridor, so any island
// province or BIMP-EAGA (Sequence C) reading here is unvalidated.
// ─────────────────────────────────────────────────────────────────────────────

const RESPONDENTS = {
  totalResponses: 76,
  /** VERIFIED 2026-08-28 against survey_responses: consent_final = true on all 76
   *  rows, consent_quarantined = 0. A prior build of this file asserted 58; that
   *  figure is not reproducible from the table and has been retired. */
  consentedToAnonymisedUse: 76,
  fieldedFrom: '3 Aug 2026',
  fieldedTo: '20 Aug 2026',
  meanFieldsAnswered: 228.7,
  byProvince: [
    { label: 'Cotabato City',                 n: 27 },
    { label: 'Maguindanao del Norte',         n: 22 },
    { label: 'Regional / BARMM-wide',         n: 11 },
    { label: 'Special Geographic Area (SGA)', n:  7 },
    { label: 'Lanao del Sur',                 n:  3 },
    { label: 'Maguindanao del Sur',           n:  3 },
    { label: 'Unattributed (no province)',    n:  3 },
    { label: 'Basilan',                       n:  0 },
    { label: 'Tawi-Tawi',                     n:  0 },
  ],
  coverageGap:
    'Roughly 64% of the sample sits in the Cotabato City / Maguindanao del Norte mainland corridor, ' +
    'and 2 of the 5 BARMM provinces — Basilan and Tawi-Tawi — returned zero respondents. ' +
    'Sequence C (BIMP-EAGA maritime integration) and every island-province reading is therefore ' +
    'unvalidated by the constituencies it most affects. A supplementary island wave is required ' +
    'before any of this is published as regional consensus.',
} as const;

/** Confidence / readiness / urgency by BEIE cluster — survey Sections 4–9, 1–5 scale. */
const CLUSTER_SIGNALS = [
  { section: 4, label: 'Foundations',       confidence: 3.69, readiness: 3.45, urgency: 3.70, sdReadiness: 0.82, n: 73 },
  { section: 5, label: 'Transformers',      confidence: 3.60, readiness: 3.40, urgency: 3.69, sdReadiness: 0.77, n: 65 },
  { section: 6, label: 'Enablers',          confidence: 3.70, readiness: 3.33, urgency: 4.04, sdReadiness: 0.80, n: 73 },
  { section: 7, label: 'Connectors',        confidence: 3.86, readiness: 3.61, urgency: 3.94, sdReadiness: 0.76, n: 71 },
  { section: 8, label: 'Financiers',        confidence: 3.78, readiness: 3.55, urgency: 3.88, sdReadiness: 0.66, n: 67 },
  { section: 9, label: 'Operating Systems', confidence: 3.85, readiness: 3.58, urgency: 3.93, sdReadiness: 0.69, n: 71 },
] as const;

/**
 * SEQUENCING VALIDATION — survey Section 10, items q10_2 / q10_3 / q10_4, 1–5.
 * The three IEDS investment sequences, rated on priority. Verified 2026-08-28.
 *
 * Read this with the coverage gap in mind: Sequence C is the BIMP-EAGA maritime
 * corridor, and the two provinces that corridor actually runs through — Basilan
 * and Tawi-Tawi — contributed zero respondents. Its 4.00 is a mainland opinion
 * about an island programme.
 */
const SEQUENCE_SIGNALS = [
  { code: 'A', label: 'Halal & agro-industrial core',    mean: 4.20, sd: 0.79, n: 65, validation: 'partial'     as const },
  { code: 'B', label: 'Green economy & resource base',   mean: 4.09, sd: 0.69, n: 67, validation: 'partial'     as const },
  { code: 'C', label: 'BIMP-EAGA maritime integration',  mean: 4.00, sd: 0.74, n: 66, validation: 'unvalidated' as const },
] as const;

/**
 * PHASE FUNDING PREFERENCE — survey item q13_6, n=68. Verified 2026-08-28.
 * Materially important for a roadmap: respondents split almost evenly between
 * spreading the budget across all three phases (24) and front-loading Phase 1
 * (23). There is no mandate for back-loading — only 9 of 68 favoured the
 * consolidation phase, against a plan that allocates ₱35–50B to it.
 */
const PHASE_FUNDING_PREFERENCE = [
  { key: 'equal',       label: 'Spread evenly across phases', n: 24, phase: null },
  { key: 'activate',    label: 'Front-load Phase 1 (Activate)', n: 23, phase: '01' },
  { key: 'scale',       label: 'Weight Phase 2 (Scale)',        n: 12, phase: '02' },
  { key: 'consolidate', label: 'Weight Phase 3 (Consolidate)',  n:  9, phase: '03' },
] as const;

/**
 * WORKSHOP EVIDENCE DENSITY — MTIT-BARMM sector workshops 1, 2, 4 and 5.
 * Counted 2026-08-28 from the four source workbooks. A record counts as
 * substantive when at least one cell in the row carries a narrative entry of
 * >40 characters; header rows and "1.0 / 2.0 / 3.0" placeholder rows are
 * excluded. Total substantive records: 125.
 *
 * This matrix is the point of the panel, not decoration. Infrastructure carries
 * the single largest challenge inventory in the entire workshop series (27
 * records) and has NO SWOT and NO strategy sheet behind it. Tourism has a
 * strategy but no SWOT. Four of six sectors never completed the opportunity
 * translation step. Any sector strategy drawn from W4/W5 for Infrastructure or
 * Tourism is currently an analyst inference, not a stakeholder output.
 */
const WORKSHOP_EVIDENCE = {
  workshops: [
    { code: 'W1', label: 'Challenges'  },
    { code: 'W2', label: 'Opportunities' },
    { code: 'W4', label: 'Industry SWOT' },
    { code: 'W5', label: 'Industry Strategy' },
  ],
  sectors: [
    { sector: 'Agro-Industry',      W1:  9, W2: 2, W4:  2, W5:  7 },
    { sector: 'Halal',              W1:  6, W2: 4, W4:  5, W5:  6 },
    { sector: 'Infrastructure',     W1: 27, W2: 1, W4:  0, W5:  0 },
    { sector: 'Services',           W1:  3, W2: 1, W4: 17, W5: 10 },
    { sector: 'Tourism',            W1:  4, W2: 1, W4:  0, W5:  9 },
    { sector: 'Energy & Utilities', W1:  3, W2: 1, W4:  2, W5:  5 },
  ],
  totalRecords: 125,
} as const;

/**
 * Strategic option evaluation — survey Section 10, same seven weighted criteria
 * as BIRD Chapter 4. `respondentScore` uses only the 29 respondents who
 * genuinely differentiated their sliders; 25 of 75 left all 28 matrix cells at
 * the default value of 5, so `fullSampleScore` is midpoint-contaminated.
 */
const STRATEGY_SIGNALS = {
  /** Verified 2026-08-28. Of the 75 respondents who touched the 4×7 matrix, 25
   *  left every one of their 28 cells on the identical default and 50 moved at
   *  least one slider. `fullSampleScore` is therefore pulled toward 5.00 by a
   *  third of the sample; `differentiatorScore` uses only the 50 who moved. */
  defaultContamination: { respondents: 75, allCellsAtDefault: 25, differentiators: 50 },
  /** expertScore = BIRD Ch.4 weighted composite (formulas.ts weights).
   *  Respondent columns are UNWEIGHTED criterion means — the weighted respondent
   *  aggregate could not be recomputed at build time and is deliberately not
   *  asserted here. Compare ranks, not levels, across the two columns. */
  options: [
    { code: 'IEDS', name: 'Integrated Ecosystem Development', expertScore: 8.93, differentiatorScore: 6.61, fullSampleScore: 6.07, expertRank: 1, respondentRank: 1 },
    { code: 'HEDS', name: 'Halal Economy Dominance',          expertScore: 7.61, differentiatorScore: 6.37, fullSampleScore: 5.91, expertRank: 2, respondentRank: 2 },
    { code: 'IFES', name: 'Infrastructure-First Enabling',    expertScore: 7.48, differentiatorScore: 6.20, fullSampleScore: 5.80, expertRank: 3, respondentRank: 3 },
    { code: 'GEMS', name: 'Green Economy Monetization',       expertScore: 7.16, differentiatorScore: 6.15, fullSampleScore: 5.77, expertRank: 4, respondentRank: 4 },
  ],
  /** The finding that actually carries weight: the ordinal ranking is identical
   *  across the expert panel, the full sample and the differentiators-only
   *  subset. Level agreement is weak; rank agreement is total. */
  rankStable: true,
  endorsement: [
    { label: 'Yes — endorse IEDS', n: 44 },
    { label: 'Partially agree',    n: 20 },
    { label: 'No answer',          n: 11 },
    { label: 'Need more evidence', n:  1 },
  ],
} as const;

/** Budget priority & risk posture — survey Section 13. */
const BUDGET_SIGNALS = {
  fundingMixFair:   3.68,
  targetsRealistic: 3.80,
  clusterPriority: [
    { label: 'Foundations',       n: 29 },
    { label: 'Operating Systems', n: 15 },
    { label: 'Connectors',        n:  8 },
    { label: 'Transformers',      n:  8 },
    { label: 'Enablers',          n:  6 },
    { label: 'Financiers',        n:  5 },
  ],
} as const;

/** Scorecard alignment & KPI importance — survey Sections 11–12, 1–5 scale. */
/** Verified 2026-08-28. `perspective` keys these rows to the strategy-map layers
 *  so each BSC perspective renders with its own stakeholder alignment score. */
const BSC_ALIGNMENT = [
  { label: 'Learning & Growth alignment', value: 4.32, sd: 0.74, pct4plus: 84, n: 69, perspective: 'Learning & Growth' as const },
  { label: 'Stakeholder alignment',       value: 4.19, sd: 0.90, pct4plus: 78, n: 74, perspective: 'Stakeholder'       as const },
  { label: 'Financial alignment',         value: 4.15, sd: 0.87, pct4plus: 80, n: 71, perspective: 'Financial'         as const },
  { label: 'Internal Process alignment',  value: 4.12, sd: 0.76, pct4plus: 77, n: 74, perspective: 'Internal Process'  as const },
] as const;

/** Whole-scorecard readings — not perspective-specific. Verified 2026-08-28. */
const SCORECARD_META = [
  { label: 'Scorecard is a useful frame', value: 4.16, sd: 0.70, n: 74 },
  { label: 'Vision is clearly stated',    value: 4.05, sd: 0.81, n: 74 },
  { label: 'Vision is achievable',        value: 3.93, sd: 0.76, n: 74 },
] as const;

const KPI_IMPORTANCE = [
  { label: 'Peace & Security KPIs', value: 4.42, n: 69 },
  { label: 'Inclusivity KPIs',      value: 4.25, n: 69 },
  { label: 'Governance KPIs',       value: 4.23, n: 69 },
  { label: 'Resilience KPIs',       value: 4.23, n: 66 },
] as const;

/**
 * Regional baseline — PSA-BARMM / MFBM 2023–2025.
 *
 * GEOPOLITICAL FRAME (post-2024 BARMM). The region comprises FIVE provinces —
 * Tawi-Tawi, Basilan (excluding Isabela City), Maguindanao del Norte,
 * Maguindanao del Sur, Lanao del Sur — plus the Special Geographic Area and
 * Cotabato City. SULU IS NOT PART OF BARMM.
 *
 * All five current provinces have an Economic & Investment Outlook file
 * (₱245.77B, 2023). Only the SGA lacks a disaggregated series, so provincial
 * coverage of the CURRENT region is complete, not 84%.
 *
 * CAVEAT ON PUBLISHED SHARES: the outlook files state MdN = 28.0% and
 * LdS = 25.8% of BARMM, implying a ₱292.4B denominator. Five provinces total
 * ₱245.77B, leaving ₱46.58B — too large for 63 SGA barangays. Those shares
 * therefore predate Sulu's exit and are computed on the OLD region. Restated on
 * the current denominator every provincial share rises ~15% (MdN ≈ 32.3%,
 * LdS ≈ 29.7%). Do not quote the published shares as current.
 */
const REGIONAL_TOTALS = {
  gdp2024B: 299.5,          // ₱B — verify whether PSA has restated post-Sulu
  growth2024: 2.7,          // %
  provincesCovered: 5,      // of 5 current provinces
  coveragePct: 100,         // provincial outlook coverage of the CURRENT region
  sharesRestatementNeeded: true,
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────
interface MELDashboardProps {
  plan?: StrategicPlan;
  onNavigate?: (view: string) => void;
}
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const DashboardHeroSection: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  const features = [
    {
      icon: Target,
      title: 'Strategic MEL Dashboard',
      desc: 'Monitor 6 Pareto KPIs driving 80% of strategic impact',
      color: '#C9A84C',
      view: 'dashboard',
    },
    {
      icon: GitBranch,
      title: 'Systems Thinking',
      desc: 'Visualize causal loops and feedback dynamics',
      color: '#10b981',
      view: 'systems',
    },
    {
      icon: FolderKanban,
      title: 'Priority Action Board',
      desc: 'Track 10 critical actions for Phase 1 (2026-2028)',
      color: '#3b82f6',
      view: 'dashboard',
    },
    {
      icon: Layers,
      title: 'Implementation Roadmap',
      desc: '3-phase ₱120-160B investment pathway to 2035',
      color: '#8b5cf6',
      view: 'dashboard',
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* ════════════════════════════════════════════════════════════════════════
          HERO BANNER — Full-width immersive section
          ════════════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full" style={{ minHeight: 600 }}>
        {/* Background gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#011a12] via-[#022c22] to-[#0a1628]" />

        {/* Banner image with overlay */}
        {!bannerError ? (
          <div className="absolute inset-0">
            <img
              src={BIRD_BANNER_URL}
              alt="BIRD 2026–2035 — Bangsamoro Investment Roadmap Development"
              className={`w-full h-full object-cover object-center transition-opacity duration-700 ${bannerLoaded ? 'opacity-40' : 'opacity-0'}`}
              onLoad={() => setBannerLoaded(true)}
              onError={() => setBannerError(true)}
              loading="eager"
              decoding="async"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#011a12]/60 via-[#022c22]/70 to-[#022c22]" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0a1628]" />
        )}

        {/* Loading state */}
        {!bannerLoaded && !bannerError && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#0a1628] animate-pulse" />
        )}

        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 z-20 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

        {/* Content container */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 pt-16 pb-20">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.55)] text-[#C9A84C] px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Bangsamoro Investment Roadmap 2026–2035
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-[1.05] mb-6"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span className="bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] bg-clip-text text-transparent">
              The Emerging
            </span>
            <br />
            <span className="text-white">Bangsamoro</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#ecfdf5]/70 max-w-3xl leading-relaxed mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            A Hub for Resilient and Ethical Growth — Transforming post-conflict recovery into
            Southeast Asia's premier halal, agro-industrial, and sustainable investment destination.
          </motion.p>

          {/* Key metrics row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {[
              { icon: DollarSign, label: 'Total Roadmap', value: TOTAL_BUDGET.label, color: '#C9A84C' },
              { icon: Clock, label: 'Current Phase', value: 'Phase 1: Foundation', color: '#10b981' },
              { icon: Target, label: '2035 GRDP Target', value: '₱550B+', color: '#3b82f6' },
              { icon: Users, label: 'Jobs Target', value: '20,000+', color: '#8b5cf6' },
              { icon: ClipboardCheck, label: 'Stakeholder Validation', value: `n=${RESPONDENTS.totalResponses}`, color: '#ef4444' },
            ].map(({ icon: Icon, label, value, color }, i) => (
              <div
                key={label}
                className="bg-[rgba(2,44,34,0.6)] backdrop-blur-sm border border-[rgba(201,168,76,0.32)] rounded-xl px-5 py-4 flex items-center gap-3 hover:border-[rgba(201,168,76,0.55)] transition-all"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                  <Icon className="w-5 h-5" style={{ color }} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[0.65rem] text-[#ecfdf5]/50 uppercase tracking-wider font-bold">{label}</div>
                  <div className="text-sm font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>{value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <button
              onClick={() => onNavigate?.('dashboard')}
              className="group px-8 py-4 bg-gradient-to-r from-[#7a5c1e] via-[#c9a84c] to-[#7a5c1e] text-[#022c22] rounded-xl font-bold text-base hover:shadow-2xl hover:shadow-[#C9A84C]/40 transition-all flex items-center gap-3"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <Target className="w-5 h-5" aria-hidden="true" />
              Open MEL Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
            <button
              onClick={() => openValidationSurvey()}
              className="px-8 py-4 bg-[rgba(6,78,59,0.6)] backdrop-blur-sm border-2 border-[rgba(201,168,76,0.55)] text-[#C9A84C] rounded-xl font-bold text-base hover:bg-[rgba(201,168,76,0.15)] transition-all flex items-center gap-3"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <ClipboardCheck className="w-5 h-5" aria-hidden="true" />
              Participate in Validation Survey
            </button>
          </motion.div>

          {/* Feature cards grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {features.map(({ icon: Icon, title, desc, color, view }, i) => (
              <motion.button
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                onClick={() => onNavigate?.(view)}
                className="group bg-[rgba(2,44,34,0.5)] backdrop-blur-sm border border-[rgba(201,168,76,0.32)] rounded-xl p-6 text-left hover:-translate-y-1 hover:border-[rgba(201,168,76,0.55)] transition-all relative overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} aria-hidden="true" />

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: `${color}20` }}>
                  <Icon className="w-6 h-6" style={{ color }} aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>{title}</h3>
                <p className="text-sm text-[#ecfdf5]/60 leading-relaxed">{desc}</p>
                <div className="flex items-center gap-2 mt-4 text-xs font-bold" style={{ color }}>
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2 text-[#ecfdf5]/40">
            <span className="text-[0.65rem] uppercase tracking-widest font-bold">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Tooltip ──────────────────────────────────────────────────────────────────
const Tooltip: React.FC<{ children: React.ReactNode; content: string }> = ({ children, content }) => {
  const [vis, setVis] = useState(false);
  return (
    <div className="relative inline-flex">
      <div onMouseEnter={() => setVis(true)} onMouseLeave={() => setVis(false)} className="cursor-help">
        {children}
      </div>
      <AnimatePresence>
        {vis && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }} transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-max max-w-xs px-3 py-2 bg-[#022c22] text-white text-xs rounded-lg shadow-xl pointer-events-none"
            role="tooltip"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Circular KPI Progress Ring ───────────────────────────────────────────────
const CircularProgress: React.FC<{ progress: number; color: string }> = ({ progress, color }) => {
  const radius = 31;
  const circ   = 2 * Math.PI * radius;
  const offset = circ - (circ * Math.min(progress, 100)) / 100;
  const stroke = color === 'gold' ? '#C9A84C' : color === 'teal' ? '#0d9488' : color === 'blue' ? '#3b82f6' : '#10b981';
  return (
    <div className="relative w-[76px] h-[76px] mx-auto mb-3" aria-hidden="true">
      <svg className="transform -rotate-90" width="76" height="76" viewBox="0 0 76 76">
        <circle cx="38" cy="38" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <motion.circle
          cx="38" cy="38" r={radius} fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[#C9A84C] font-bold text-sm" style={{ fontFamily: "'Cinzel', serif" }}>{progress}%</span>
        <span className="text-[0.6rem] text-[rgba(167,243,208,0.6)]">of target</span>
      </div>
    </div>
  );
};

// ─── Priority Badge ───────────────────────────────────────────────────────────
const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  const map: Record<string, string> = {
    critical: 'bg-[rgba(239,68,68,0.12)] text-[#ef4444] border-[rgba(239,68,68,0.3)]',
    high:     'bg-[rgba(245,158,11,0.12)] text-[#f59e0b] border-[rgba(245,158,11,0.3)]',
    medium:   'bg-[rgba(59,130,246,0.12)] text-[#93c5fd] border-[rgba(59,130,246,0.3)]',
  };
  const dot = priority === 'critical' ? '🔴' : priority === 'high' ? '🟡' : '🔵';
  return (
    <span className={`inline-flex items-center gap-1 text-[0.68rem] font-bold px-2 py-0.5 rounded border ${map[priority] || map.medium}`}>
      {dot} {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const activeStatuses = ['In Progress','Drafting','Development','Pre-Dev','Scoping','On Track'];
  const isActive = activeStatuses.includes(status);
  return (
    <span className={`inline-flex items-center gap-1.5 text-[0.68rem] font-semibold px-2 py-0.5 rounded border ${
      isActive
        ? 'bg-[rgba(59,130,246,0.12)] text-[#93c5fd] border-[rgba(59,130,246,0.3)]'
        : 'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.5)] border-[rgba(255,255,255,0.1)]'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-current ${isActive ? 'animate-pulse' : ''}`} aria-hidden="true" />
      {status}
    </span>
  );
};

// ─── Signal Bar (survey Likert / tally, 1–5 or count) ─────────────────────────
const SignalBar: React.FC<{
  label: string; value: number; max: number; color?: string; suffix?: string; sub?: string;
}> = ({ label, value, max, color = '#C9A84C', suffix = '', sub }) => (
  <div className="mb-2.5">
    <div className="flex justify-between items-baseline gap-3 mb-1">
      <span className="text-xs text-[#d1fae5]/80 truncate">{label}</span>
      <span className="text-xs font-bold tabular-nums flex-shrink-0" style={{ color }}>
        {Number.isInteger(value) ? value : value.toFixed(2)}{suffix}
      </span>
    </div>
    <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.max(2, Math.min(100, (value / max) * 100))}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
    {sub && <div className="text-[0.6rem] text-[#ecfdf5]/28 mt-0.5">{sub}</div>}
  </div>
);

// ─── Validation Badge — flags evidence strength on a reading ───────────────────
const ValidationBadge: React.FC<{ level: 'validated' | 'partial' | 'unvalidated'; note?: string }> = ({ level, note }) => {
  const map = {
    validated:   { cls: 'bg-[rgba(16,185,129,0.12)] text-[#10b981] border-[rgba(16,185,129,0.3)]',  txt: 'Validated' },
    partial:     { cls: 'bg-[rgba(245,158,11,0.12)] text-[#f59e0b] border-[rgba(245,158,11,0.3)]',  txt: 'Partially validated' },
    unvalidated: { cls: 'bg-[rgba(239,68,68,0.12)] text-[#ef4444] border-[rgba(239,68,68,0.3)]',    txt: 'Not validated' },
  }[level];
  return (
    <span className={`inline-flex items-center gap-1 text-[0.65rem] font-bold px-2 py-0.5 rounded border ${map.cls}`}>
      <ClipboardCheck className="w-3 h-3" aria-hidden="true" />
      {map.txt}{note ? ` · ${note}` : ''}
    </span>
  );
};

// ─── AI Avatar ────────────────────────────────────────────────────────────────
const AIAvatar: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <div
    className="relative inline-flex items-center justify-center rounded-full overflow-hidden shadow-lg ring-2 ring-[#C9A84C]/40 flex-shrink-0"
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    <img src={AI_AVATAR_URL} alt="" className="w-full h-full object-cover" />
  </div>
);

// ─── Inline markdown renderer ─────────────────────────────────────────────────
const renderMarkdown = (content: string) =>
  content.split('\n').map((line, i) => {
    if (line.startsWith('• ') || line.startsWith('- '))
      return <li key={i} className="ml-4 list-disc text-sm leading-relaxed">{line.slice(2)}</li>;
    if (/^\*\*(.+)\*\*$/.test(line))
      return <p key={i} className="font-bold text-sm mt-2">{line.replace(/\*\*/g, '')}</p>;
    if (line === '') return <div key={i} className="h-1.5" />;
    return <p key={i} className="text-sm leading-relaxed">{line.replace(/\*\*/g, '')}</p>;
  });

// ─── AI Strategist Sidebar Chat ───────────────────────────────────────────────
const AIStrategistChat: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '0', role: 'assistant', timestamp: new Date(),
    content: `As-salamu alaykum! I'm BIRD AI — your embedded strategy consultant for the Bangsamoro Investment Roadmap 2026–2035.\n\nI bring expertise in:\n\n**Systems Thinking & Causal Analysis**\n• Feedback loop detection (R1/R2/B1-B4)\n• Meadows Leverage Points (LP1–LP5)\n• 7 BARMM Systems Archetypes\n\n**Investment & Strategy**\n• Panel A: 6 Pareto KPIs · Panel B: BSC Leverage Points\n• Panel C: Priority Action Board 2026\n• Panel E: Phase Progress (₱120–160B Roadmap)\n\n**Current Phase:** Foundation Building (2026–2028)\n**Active Focus:** BHB Operationalisation & Forestry Code\n\nWhat would you like to explore?`,
  }]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);
  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 80); }, []);

  const SUGGESTIONS = [
    'Analyze the B1 Growth-Resource Constraints feedback loop',
    'Explain how LP1 Halal Certification addresses "Fixes that Fail"',
    'What is the Phase 1 ₱35–45B budget allocation breakdown?',
    'How does the R2 Governance–Investor Confidence loop work?',
    'What are the most critical Q2 2026 actions for BHB?',
  ];

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;

    const history = messages.slice(-14).map(({ role, content }) => ({ role, content }));
    setMessages(p => [...p, { id: Date.now().toString(), role: 'user', content: q, timestamp: new Date() }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(AI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          data: {
            message: q,
            activeView: 'dashboard',
            messages: history,
            birdContext: { phase: 'Phase 1: Foundation Building (2026-2028)' },
          },
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = data?.data?.reply || data?.data?.markdown || 'I received your question but had trouble generating a response. Please try again.';

      setMessages(p => [...p, { id: (Date.now()+1).toString(), role: 'assistant', content: reply, timestamp: new Date() }]);
    } catch {
      setMessages(p => [...p, {
        id: (Date.now()+1).toString(), role: 'assistant', timestamp: new Date(),
        content: 'I encountered a connection issue. Please check your internet connection and try again. The AI service requires the Supabase edge function to be deployed and the OPENAI_API_KEY secret to be configured.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.97 }} transition={{ type: 'spring', damping: 24, stiffness: 260 }}
      className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col shadow-2xl bg-[#022c22] border-l border-[rgba(201,168,76,0.32)]"
      role="dialog" aria-modal="true" aria-label="BIRD AI Strategy Assistant"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(201,168,76,0.32)] bg-[rgba(6,78,59,0.5)] flex-shrink-0">
        <AIAvatar size={36} />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#ecfdf5] text-sm" style={{ fontFamily: "'Cinzel', serif" }}>BIRD AI Strategist</p>
          <p className="text-xs text-[#C9A84C] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" aria-hidden="true" />
            BIRD 2026–2035 · MEL Dashboard
          </p>
        </div>
        <button
          onClick={onClose} aria-label="Close AI assistant"
          className="p-1.5 rounded-lg hover:bg-white/10 text-[#ecfdf5]/60 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[rgba(2,44,34,0.5)]"
        role="log" aria-live="polite" aria-label="Chat messages"
        style={{ scrollbarWidth: 'thin' }}
      >
        {messages.map(msg => (
          <motion.div
            key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && <AIAvatar size={28} />}
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
              msg.role === 'user'
                ? 'bg-gradient-to-br from-[#C9A84C] to-[#8B6C28] text-[#022c22] rounded-br-sm ml-2'
                : 'bg-[rgba(6,78,59,0.6)] text-[#ecfdf5] border border-[rgba(201,168,76,0.32)] rounded-bl-sm ml-2'
            }`}>
              {msg.role === 'assistant'
                ? <div className="space-y-0.5">{renderMarkdown(msg.content)}</div>
                : <p>{msg.content}</p>
              }
              <p className={`text-[10px] mt-2 opacity-50`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex items-center gap-2">
            <AIAvatar size={28} />
            <div className="bg-[rgba(6,78,59,0.6)] border border-[rgba(201,168,76,0.32)] rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 text-[#C9A84C] animate-spin" />
              <span className="text-xs text-[#ecfdf5]/60">Analyzing BIRD data…</span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions (first message only) */}
      {messages.length === 1 && (
        <div className="px-4 pb-3 bg-[rgba(2,44,34,0.5)] flex-shrink-0">
          <p className="text-[10px] text-[#C9A84C] mb-2 font-semibold uppercase tracking-wider">Suggested questions</p>
          <div className="flex flex-col gap-1.5">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i} onClick={() => send(s)}
                className="text-left text-xs px-3 py-2 rounded-xl bg-[rgba(6,78,59,0.6)] border border-[rgba(201,168,76,0.32)] text-[#ecfdf5]/80 hover:bg-[rgba(201,168,76,0.15)] hover:text-[#C9A84C] transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-[rgba(201,168,76,0.32)] bg-[#022c22] flex-shrink-0">
        <div className="flex gap-2 items-end bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-2xl px-4 py-3 focus-within:border-[#C9A84C] transition">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask about systems thinking, BARMM investment…"
            rows={1}
            aria-label="Message BIRD AI"
            className="flex-1 bg-transparent text-sm text-[#ecfdf5] placeholder-[#ecfdf5]/40 resize-none focus:outline-none leading-relaxed"
            style={{ maxHeight: 100 }}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="p-1.5 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#8B6C28] text-[#022c22] disabled:opacity-40 hover:shadow-lg hover:shadow-[#C9A84C]/30 transition flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-center text-[10px] text-[#ecfdf5]/20 mt-2">BIRD AI · BOI-MTIT, BARMM · Powered by GPT-4o</p>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// STRATEGY MAP — Balanced Scorecard rendered as a causal roadmap
// ═══════════════════════════════════════════════════════════════════════════════
//
// A strategy map is not a grid of tiles; it is a causal claim read BOTTOM-UP:
// capabilities (Learning & Growth) enable processes (Internal Process), which
// produce outcomes for people (Stakeholder), which produce economic results
// (Financial). Panel B previously rendered BSC_LEVERAGE_POINTS.slice(0, 8) as a
// flat grid — 8 of the 20 objectives in the catalogue, in arbitrary order, with
// the causal logic invisible. That is a scorecard fragment, not a map.
//
// This rebuild renders ALL_BSC_KPIS — the 20-objective canonical catalogue that
// already existed in kpis.ts but was imported nowhere — as four collapsible
// layers in causal order, enriched on `bscCode` by BSC_LEVERAGE_POINTS for
// leverage-point and initiative narrative. Where an objective has no enrichment
// row it renders a provenance flag rather than silently appearing complete.
// ─────────────────────────────────────────────────────────────────────────────

/** Perspective layers, ordered bottom-up as the causal chain actually reads. */
const MAP_LAYERS: ReadonlyArray<{
  perspective: BSCPerspective;
  tier: number;
  role: string;
  because: string;
  accent: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}> = [
  {
    perspective: 'Learning & Growth', tier: 1, accent: '#0891b2', icon: GraduationCap,
    role: 'Capabilities we must build',
    because: 'Literacy, halal technical depth and MSME capacity are the binding constraints. Nothing above this layer moves without them.',
  },
  {
    perspective: 'Internal Process', tier: 2, accent: '#3b82f6', icon: Cog,
    role: 'Processes we must run well',
    because: 'Certification integrity, registration speed and infrastructure delivery convert capability into a functioning investment environment.',
  },
  {
    perspective: 'Stakeholder', tier: 3, accent: '#10b981', icon: Users,
    role: 'Outcomes for Bangsamoro people & investors',
    because: 'Poverty, jobs, gender parity and investor retention are what the processes are for. This is the moral test of the roadmap.',
  },
  {
    perspective: 'Financial', tier: 4, accent: '#C9A84C', icon: DollarSign,
    role: 'Economic results by 2035',
    because: 'GRDP, investment approvals, exports and green revenue are lagging indicators — consequences of the three layers beneath, never inputs.',
  },
];

/** One objective inside a layer — collapsed to a strip, expanded to full detail. */
const ObjectiveCard: React.FC<{
  kpi: KPI;
  accent: string;
  enrichment?: typeof BSC_POINTS[number];
  linkedActions: typeof PRIORITY_ACTIONS;
}> = ({ kpi, accent, enrichment, linkedActions }) => {
  const [open, setOpen] = useState(false);
  const panelId = `obj-panel-${kpi.bscCode}`;

  return (
    <div className="bg-[rgba(2,44,34,0.55)] border border-[rgba(201,168,76,0.22)] rounded-xl overflow-hidden hover:border-[rgba(201,168,76,0.45)] transition-colors">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full text-left px-4 py-3 flex items-center gap-3"
      >
        <span
          className="text-[0.6rem] font-black tracking-wider px-1.5 py-0.5 rounded flex-shrink-0"
          style={{ background: `${accent}22`, color: accent }}
        >
          {kpi.bscCode}
        </span>

        <span className="flex-1 min-w-0">
          <span className="block text-sm font-semibold text-white truncate">{kpi.label}</span>
          <span className="block text-[0.68rem] text-[#ecfdf5]/45 truncate">
            {kpi.current} {kpi.currentSub} → {kpi.target}
          </span>
        </span>

        {/* Compact progress read, always visible so a layer scans without expanding */}
        <span className="hidden sm:flex items-center gap-2 flex-shrink-0 w-28">
          <span className="flex-1 h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
            <motion.span
              className="block h-full rounded-full"
              style={{ background: accent }}
              initial={{ width: 0 }}
              whileInView={{ width: `${kpi.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            />
          </span>
          <span className="text-[0.7rem] font-bold tabular-nums" style={{ color: accent }}>
            {kpi.progress}%
          </span>
        </span>

        <ChevronDown
          className={`w-4 h-4 text-[#ecfdf5]/40 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-[rgba(201,168,76,0.15)] space-y-3">
              {/* Milestone ladder: baseline → 2030 → 2035 */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[
                  { t: 'Baseline',    v: kpi.current,    s: kpi.currentSub },
                  { t: '2030 target', v: kpi.target2030, s: 'interim'      },
                  { t: '2035 target', v: kpi.target,     s: 'roadmap end'  },
                ].map(m => (
                  <div key={m.t} className="bg-[rgba(6,78,59,0.35)] rounded-lg px-2.5 py-2">
                    <div className="text-[0.58rem] uppercase tracking-wider text-[#ecfdf5]/40 font-bold">{m.t}</div>
                    <div className="text-[0.8rem] font-bold text-white leading-tight mt-0.5">{m.v}</div>
                    <div className="text-[0.58rem] text-[#ecfdf5]/30">{m.s}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="text-[0.62rem] font-bold px-2 py-0.5 rounded border border-[rgba(201,168,76,0.3)] text-[#C9A84C]">
                  {kpi.leveragePoint}
                </span>
                {kpi.benchmark && (
                  <span className="text-[0.62rem] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.12)] text-[#ecfdf5]/50">
                    {kpi.benchmark}
                  </span>
                )}
              </div>

              {enrichment ? (
                <div>
                  <div className="text-[0.6rem] uppercase tracking-wider text-[#ecfdf5]/40 font-bold mb-1">
                    Strategic initiative
                  </div>
                  <p className="text-xs text-[#d1fae5]/75 leading-relaxed">{enrichment.strategicInitiative}</p>
                </div>
              ) : (
                <div className="text-[0.68rem] text-[#f59e0b] bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.25)] rounded-lg px-2.5 py-1.5">
                  No strategic initiative defined. This objective exists in the KPI catalogue but has no
                  matching row in BSC_LEVERAGE_POINTS — it is measured, but not yet resourced.
                </div>
              )}

              {linkedActions.length > 0 ? (
                <div>
                  <div className="text-[0.6rem] uppercase tracking-wider text-[#ecfdf5]/40 font-bold mb-1.5">
                    Linked 2026 actions ({linkedActions.length})
                  </div>
                  <ul className="space-y-1">
                    {linkedActions.map(a => (
                      <li key={a.id} className="flex items-start gap-2 text-xs text-[#d1fae5]/70">
                        <span className="text-[#C9A84C] mt-0.5" aria-hidden="true">▸</span>
                        <span className="flex-1">
                          {a.action}
                          <span className="text-[#ecfdf5]/35"> · {a.due} · {a.budget} · {a.lead}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-[0.68rem] text-[#ecfdf5]/40">
                  No 2026 action traces to this objective — delivery in Phase 1 is unfunded.
                </div>
              )}

              <div className="text-[0.6rem] text-[#ecfdf5]/30 pt-1">Source: {kpi.source}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/** One collapsible perspective layer of the strategy map. */
const PerspectiveLayer: React.FC<{
  layer: typeof MAP_LAYERS[number];
  kpis: KPI[];
  alignment?: typeof BSC_ALIGNMENT[number];
  enrichmentFor: (code: string) => typeof BSC_POINTS[number] | undefined;
  actionsFor: (code: string) => typeof PRIORITY_ACTIONS;
  defaultOpen: boolean;
}> = ({ layer, kpis, alignment, enrichmentFor, actionsFor, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = layer.icon;
  const meanProgress = kpis.length
    ? Math.round(kpis.reduce((s, k) => s + k.progress, 0) / kpis.length)
    : 0;
  const unresourced = kpis.filter(k => !enrichmentFor(k.bscCode)).length;
  const panelId = `layer-${layer.tier}`;

  return (
    <div className="relative">
      {/* Causal connector — what makes this a map rather than a list */}
      {layer.tier < 4 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-[22px] flex flex-col items-center z-10"
          aria-hidden="true"
        >
          <ArrowUpRight className="w-4 h-4 -rotate-45" style={{ color: layer.accent }} />
        </div>
      )}

      <div
        className="border rounded-2xl overflow-hidden"
        style={{ borderColor: `${layer.accent}44`, background: `${layer.accent}0A` }}
      >
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full text-left px-5 py-4 flex items-center gap-4"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${layer.accent}1F` }}
          >
            <Icon className="w-5 h-5" style={{ color: layer.accent }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                {layer.perspective}
              </h3>
              <span className="text-[0.62rem] uppercase tracking-wider font-bold" style={{ color: layer.accent }}>
                Tier {layer.tier} · {layer.role}
              </span>
            </div>
            <p className="text-[0.72rem] text-[#ecfdf5]/45 leading-snug mt-0.5 pr-4">{layer.because}</p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-[0.62rem] text-[#ecfdf5]/40">
              {kpis.length} objective{kpis.length === 1 ? '' : 's'} · {meanProgress}% mean
            </span>
            {alignment && (
              <span className="text-[0.62rem] text-[#ecfdf5]/40">
                Alignment{' '}
                <span className="font-bold" style={{ color: layer.accent }}>
                  {alignment.value.toFixed(2)}
                </span>
                /5 · n={alignment.n}
              </span>
            )}
            {unresourced > 0 && (
              <span className="text-[0.62rem] text-[#f59e0b]">{unresourced} unresourced</span>
            )}
          </div>

          <ChevronDown
            className={`w-5 h-5 text-[#ecfdf5]/40 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                {kpis.map(k => (
                  <ObjectiveCard
                    key={k.bscCode}
                    kpi={k}
                    accent={layer.accent}
                    enrichment={enrichmentFor(k.bscCode)}
                    linkedActions={actionsFor(k.bscCode)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MEL DASHBOARD (Main Component)
// ═══════════════════════════════════════════════════════════════════════════════
const MELDashboard: React.FC<MELDashboardProps> = ({ onNavigate }) => {
  const [showAIChat,    setShowAIChat]    = useState(false);
  const [actionFilter,  setActionFilter]  = useState('all');

  const filteredActions = useMemo(() => PRIORITY_ACTIONS.filter(a => {
    if (actionFilter === 'all')      return true;
    if (actionFilter === 'q2')       return a.due.includes('Q2');
    if (actionFilter === 'q3')       return a.due.includes('Q3');
    if (actionFilter === 'q4')       return a.due.includes('Q4');
    return a.priority === actionFilter;
  }), [actionFilter]);

  const counts = useMemo(() => ({
    critical: PRIORITY_ACTIONS.filter(a => a.priority === 'critical').length,
    high:     PRIORITY_ACTIONS.filter(a => a.priority === 'high').length,
    q2:       PRIORITY_ACTIONS.filter(a => a.due.includes('Q2')).length,
    inProg:   PRIORITY_ACTIONS.filter(a => a.status === 'In Progress').length,
  }), []);

  // ─── Strategy map reconciliation (Panel B) ──────────────────────────────────
  // Joins three independently-maintained structures on `bscCode`:
  //   ALL_BSC_KPIS        — 20-objective measurement catalogue (spine)
  //   BSC_LEVERAGE_POINTS — 10 rows of initiative / leverage narrative
  //   ACTION_PLAN_2026    — 11 funded Phase-1 actions, bscCode is a "A / B" list
  // The gaps this join exposes are the finding, so they are surfaced, not hidden.
  const strategyMap = useMemo(() => {
    const enrichmentIndex = new Map(BSC_POINTS.map(p => [p.bscCode, p]));

    // An action's bscCode may name several objectives, e.g. 'IP2 / LG2'.
    const actionIndex = new Map<string, typeof PRIORITY_ACTIONS>();
    PRIORITY_ACTIONS.forEach(a => {
      String(a.bscCode).split('/').map(c => c.trim()).filter(Boolean).forEach(code => {
        actionIndex.set(code, [...(actionIndex.get(code) ?? []), a]);
      });
    });

    const enrichmentFor = (code: string) => enrichmentIndex.get(code);
    const actionsFor    = (code: string) => actionIndex.get(code) ?? [];

    const layers = MAP_LAYERS.map(layer => ({
      layer,
      kpis: ALL_BSC_KPIS.filter(k => k.perspective === layer.perspective),
      alignment: BSC_ALIGNMENT.find(a => a.perspective === layer.perspective),
    }));

    const totalObjectives = ALL_BSC_KPIS.length;
    const unresourced     = ALL_BSC_KPIS.filter(k => !enrichmentIndex.has(k.bscCode));
    const unactioned      = ALL_BSC_KPIS.filter(k => actionsFor(k.bscCode).length === 0);

    return {
      layers, enrichmentFor, actionsFor, totalObjectives,
      renderedBefore: 8, // BSC_POINTS.slice(0, 8) — what Panel B used to show
      unresourcedCount: unresourced.length,
      unactionedCount:  unactioned.length,
      unactionedCodes:  unactioned.map(k => k.bscCode),
    };
  }, []);

  // ─── Validation-survey derived metrics (Panel D) ────────────────────────────
  const validation = useMemo(() => {
    const weakest = [...CLUSTER_SIGNALS].sort(
      (a, b) => (a.urgency - a.readiness) - (b.urgency - b.readiness),
    ).reverse()[0];
    const meanReadiness  = CLUSTER_SIGNALS.reduce((s, c) => s + c.readiness,  0) / CLUSTER_SIGNALS.length;
    const meanConfidence = CLUSTER_SIGNALS.reduce((s, c) => s + c.confidence, 0) / CLUSTER_SIGNALS.length;
    const meanUrgency    = CLUSTER_SIGNALS.reduce((s, c) => s + c.urgency,    0) / CLUSTER_SIGNALS.length;
    const endorsed       = STRATEGY_SIGNALS.endorsement.find(e => e.label.startsWith('Yes'))?.n ?? 0;
    const silentProvinces = RESPONDENTS.byProvince.filter(p => p.n === 0);
    return {
      weakest, meanReadiness, meanConfidence, meanUrgency, endorsed, silentProvinces,
      endorsedPct: Math.round((endorsed / RESPONDENTS.totalResponses) * 100),
      // Readiness converted to a 0–100 ring value so it reads like every other
      // progress figure on this dashboard.
      readinessRing: Math.round((meanReadiness / 5) * 100),
      topCluster: [...BUDGET_SIGNALS.clusterPriority].sort((a, b) => b.n - a.n)[0],
    };
  }, []);

  useEffect(() => {
    const styleId = 'hide-bolt-badge';
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      [class*="bolt"], [id*="bolt"], .bolt-badge,
      [data-testid*="bolt"], a[href*="bolt.new"],
      img[alt*="Bolt"], div[class*="fixed"] a[href*="bolt"] {
        display: none !important; visibility: hidden !important;
        opacity: 0 !important; pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  const reinforcing = FEEDBACK_LOOPS.filter(l => l.type === 'reinforcing').length;
  const balancing   = FEEDBACK_LOOPS.filter(l => l.type === 'balancing').length;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#011a12] via-[#022c22] to-[#0a1628] text-[#ecfdf5]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      {/* ════════════════════════════════════════════════════════════════════════
          HERO SECTION — Full-width immersive landing
          ════════════════════════════════════════════════════════════════════════ */}
      <DashboardHeroSection onNavigate={onNavigate} />

      {/* ════════════════════════════════════════════════════════════════════════
          DASHBOARD HEADER
          ════════════════════════════════════════════════════════════════════════ */}
      <header className="max-w-[1400px] mx-auto px-4 pt-8 pb-6 relative">
        <div className="inline-block bg-[rgba(201,168,76,0.10)] border border-[rgba(201,168,76,0.55)] text-[#C9A84C] px-4 py-1 rounded-full text-[0.68rem] font-bold tracking-widest uppercase mb-4">
          Strategic MEL Dashboard · Phase 1: Foundation Building
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] bg-clip-text text-transparent leading-tight mb-2"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Monitoring, Evaluation &amp; Learning
        </h1>
        <p className="text-[#ecfdf5]/60 max-w-2xl leading-relaxed text-sm md:text-base">
          2026 Priority Actions &amp; 2035 Investment Targets.
          Applying the <strong className="text-[#C9A84C]">Pareto Principle</strong> to surface the vital few metrics
          that drive 80% of strategic impact, aligned with the BIRD 2026–2035 Roadmap.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-6">
          <div className="text-xs text-[#ecfdf5]/45 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <time dateTime={new Date().toISOString().split('T')[0]}>
              Live MEL · {new Date().toLocaleDateString('en-PH', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
            </time>
          </div>
          <div className="text-xs bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.32)] rounded px-3 py-1.5 text-[#C9A84C] flex items-center gap-1.5">
            <Target className="w-3 h-3" aria-hidden="true" />
            Pareto Focus: 6 Critical KPIs · 10 Priority Actions · {TOTAL_BUDGET.label} Total Roadmap Budget · Validated by {RESPONDENTS.totalResponses} stakeholders
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 pb-24 flex flex-col gap-10">

        {/* MEL Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex flex-wrap gap-4 p-4 bg-[rgba(2,44,34,0.4)] border border-[rgba(201,168,76,0.32)] rounded-lg"
          role="note" aria-label="MEL status legend"
        >
          {[
            { color: '#10b981', label: 'On Track' },
            { color: '#C9A84C', label: 'Building / In Progress' },
            { color: '#3b82f6', label: 'Watch / Early Stage' },
            { color: '#f59e0b', label: 'At Risk' },
            { color: '#ef4444', label: 'Critical / Behind' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs text-[#d1fae5]/70">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} aria-hidden="true" />
              {label}
            </div>
          ))}
          <div className="ml-auto text-[0.7rem] text-[#ecfdf5]/35">
            Baselines: 2024 PSA / BBOI / MTIT. Targets: BIRD 2026-2035. Validation: survey n={RESPONDENTS.totalResponses} (Aug 2026).
          </div>
        </motion.div>

        {/* ── PANEL A: Pareto Vital Few KPIs ─────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[rgba(6,78,59,0.15)] border border-[rgba(201,168,76,0.32)] rounded-2xl p-6 md:p-8 relative overflow-hidden"
          aria-labelledby="panel-a-title"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e]" aria-hidden="true" />
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">Panel A · Pareto Vital Few</span>
              <h2 id="panel-a-title" className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                Key Investment Targets — 2035 Vision
              </h2>
              <div className="w-10 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] rounded-full mt-2" aria-hidden="true" />
            </div>
            <span className="text-xs text-[#a7f3d0]/70 bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-full px-3 py-1">
              6 headline KPIs · Phase 1 progress
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {PARETO_KPIS.map((kpi, i) => (
              <motion.article
                key={kpi.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[rgba(2,44,34,0.6)] border border-[rgba(201,168,76,0.32)] rounded-xl p-5 text-center hover:-translate-y-1 hover:border-[rgba(201,168,76,0.55)] transition-all duration-300 relative overflow-hidden"
                aria-label={`${kpi.label}: ${kpi.current}, target ${kpi.target}`}
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${kpi.status === 'on-track' ? 'bg-gradient-to-r from-[#10b981] to-[#6ee7b7]' : 'bg-gradient-to-r from-[#3b82f6] to-[#93c5fd]'}`} aria-hidden="true" />
                <CircularProgress progress={kpi.progress} color={kpi.ringColor} />
                <div className="text-xs font-bold text-white mb-1 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>{kpi.label}</div>
                <div className="text-xs text-[#6ee7b7] font-semibold mb-0.5">
                  {kpi.current} <span className="text-[0.65rem] opacity-60">{kpi.currentSub}</span>
                </div>
                <div className="text-[0.68rem] text-[#ecfdf5]/40 leading-tight">Target: {kpi.target}</div>
                <span className={`inline-flex items-center gap-1 text-[0.65rem] font-bold px-2 py-0.5 rounded-full mt-2 ${kpi.delta.includes('▲') ? 'bg-[rgba(16,185,129,0.15)] text-[#10b981]' : 'bg-[rgba(245,158,11,0.15)] text-[#f59e0b]'}`}>
                  {kpi.delta}
                </span>
                <div className="text-[0.6rem] text-[#ecfdf5]/28 mt-2">{kpi.source}</div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* ── PANEL B: Strategy Map (Balanced Scorecard as roadmap) ───────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[rgba(6,78,59,0.15)] border border-[rgba(201,168,76,0.32)] rounded-2xl p-6 md:p-8 relative overflow-hidden"
          aria-labelledby="panel-b-title"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e]" aria-hidden="true" />

          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">
                Panel B · Strategy Map
              </span>
              <h2 id="panel-b-title" className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                The Balanced Scorecard as a Roadmap
              </h2>
              <div className="w-10 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] rounded-full mt-2" aria-hidden="true" />
              <p className="text-xs text-[#ecfdf5]/50 mt-3 max-w-2xl leading-relaxed">
                Read this bottom-up. Each layer is a causal precondition for the one above it:
                capabilities enable processes, processes produce stakeholder outcomes, stakeholder
                outcomes produce financial results. Expand a layer to see its objectives; expand an
                objective to see its 2030/2035 milestone ladder, strategic initiative and funded
                2026 actions.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs text-[#a7f3d0]/70 bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-full px-3 py-1">
                {strategyMap.totalObjectives} objectives · 4 perspectives
              </span>
              <span className="text-[0.62rem] text-[#ecfdf5]/35 text-right max-w-[14rem] leading-snug">
                Previous build surfaced {strategyMap.renderedBefore} of {strategyMap.totalObjectives}.
              </span>
            </div>
          </div>

          {/* Coverage strip — the join result, stated before the map is read */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              {
                icon: Layers, color: '#10b981',
                v: `${strategyMap.totalObjectives}`,
                l: 'Objectives now mapped',
                s: 'Full ALL_BSC_KPIS catalogue, grouped by causal tier',
              },
              {
                icon: AlertTriangle, color: '#f59e0b',
                v: `${strategyMap.unresourcedCount}`,
                l: 'Measured but not resourced',
                s: 'No strategic initiative row in BSC_LEVERAGE_POINTS',
              },
              {
                icon: FolderKanban, color: '#ef4444',
                v: `${strategyMap.unactionedCount}`,
                l: 'No funded 2026 action',
                s: `Unlinked: ${strategyMap.unactionedCodes.join(', ')}`,
              },
            ].map(({ icon: Icon, color, v, l, s }) => (
              <div key={l} className="bg-[rgba(2,44,34,0.5)] border border-[rgba(201,168,76,0.2)] rounded-xl px-4 py-3 flex items-start gap-3">
                <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} aria-hidden="true" />
                <div className="min-w-0">
                  <div className="text-lg font-bold leading-none" style={{ color, fontFamily: "'Cinzel', serif" }}>{v}</div>
                  <div className="text-[0.7rem] text-white font-semibold mt-1">{l}</div>
                  <div className="text-[0.6rem] text-[#ecfdf5]/35 leading-snug mt-0.5 break-words">{s}</div>
                </div>
              </div>
            ))}
          </div>

          {/* The map itself — rendered top-down (Financial first) so the page reads
              as a roadmap toward 2035, while the tier labels and connectors carry
              the bottom-up causal direction. */}
          <div className="space-y-8">
            {[...strategyMap.layers].reverse().map(({ layer, kpis, alignment }) => (
              <PerspectiveLayer
                key={layer.perspective}
                layer={layer}
                kpis={kpis}
                alignment={alignment}
                enrichmentFor={strategyMap.enrichmentFor}
                actionsFor={strategyMap.actionsFor}
                defaultOpen={layer.tier === 4}
              />
            ))}
          </div>

          <p className="text-[0.62rem] text-[#ecfdf5]/30 mt-6 leading-relaxed">
            Objectives and targets: BIRD 2026–2035 Chapters 5–6 via <code>ALL_BSC_KPIS</code>.
            Initiatives: <code>BSC_LEVERAGE_POINTS</code>. Actions: <code>ACTION_PLAN_2026</code>,
            joined on <code>bscCode</code>. Per-layer alignment scores are stakeholder validation
            means (survey §12, 1–5), not delivery measures — a high alignment score on a layer with
            low progress means stakeholders endorse an objective that is not yet being delivered.
          </p>
        </motion.section>


        {/* ── PANEL C: Priority Action Board ──────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[rgba(6,78,59,0.15)] border border-[rgba(201,168,76,0.32)] rounded-2xl p-6 md:p-8 relative overflow-hidden"
          aria-labelledby="panel-c-title"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e]" aria-hidden="true" />
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">Panel C · Priority Action Plan 2026</span>
              <h2 id="panel-c-title" className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                Urgent &amp; Priority Actions — Foundation Phase
              </h2>
              <div className="w-10 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] rounded-full mt-2" aria-hidden="true" />
            </div>
            <span className="text-xs text-[#a7f3d0]/70 bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-full px-3 py-1">
              {counts.critical} Critical · {counts.high} High · 10 total actions
            </span>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { color: '#ef4444', val: counts.critical, lbl: 'Critical Actions' },
              { color: '#f59e0b', val: counts.high,     lbl: 'High Priority'    },
              { color: '#10b981', val: counts.q2,       lbl: 'Due Q2 2026'     },
              { color: '#C9A84C', val: counts.inProg,   lbl: 'In Progress'     },
            ].map(({ color, val, lbl }) => (
              <div key={lbl} className="bg-[rgba(2,44,34,0.5)] border border-[rgba(201,168,76,0.32)] rounded-lg p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} aria-hidden="true" />
                <div className="text-2xl font-bold" style={{ color, fontFamily: "'Cinzel', serif" }}>{val}</div>
                <div className="text-[0.7rem] text-[#a7f3d0]/70 uppercase tracking-wider">{lbl}</div>
              </div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Filter actions">
            {[
              { key: 'all',      label: 'All Actions' },
              { key: 'critical', label: '🔴 Critical'  },
              { key: 'high',     label: '🟡 High'      },
              { key: 'q2',       label: '📅 Due Q2'    },
              { key: 'q3',       label: '📅 Due Q3'    },
              { key: 'q4',       label: '📅 Due Q4'    },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActionFilter(key)}
                aria-pressed={actionFilter === key}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                  actionFilter === key
                    ? 'bg-gradient-to-r from-[#7a5c1e] via-[#c9a84c] to-[#7a5c1e] text-[#022c22] border-[#C9A84C] font-bold'
                    : 'bg-[rgba(2,44,34,0.6)] border-[rgba(201,168,76,0.32)] text-[#a7f3d0]/80 hover:border-[rgba(201,168,76,0.55)] hover:text-[#C9A84C]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-[rgba(201,168,76,0.32)]">
            <table className="w-full text-sm min-w-[800px]" aria-label="Priority Action Plan 2026">
              <thead>
                <tr className="bg-[rgba(201,168,76,0.1)] border-b-2 border-[rgba(201,168,76,0.32)]">
                  {['Strategic Objective','Programme / Action','Priority','Due','MEL Status','Budget','Lead Unit'].map(h => (
                    <th key={h} className="p-3 text-left text-[#C9A84C] font-bold text-xs tracking-wider" style={{ fontFamily: "'Cinzel', serif" }} scope="col">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredActions.map(action => (
                    <motion.tr
                      key={action.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="border-b border-[rgba(201,168,76,0.08)] hover:bg-[rgba(201,168,76,0.05)] transition-colors"
                    >
                      <td className="p-4 align-top">
                        <span className="inline-block bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.32)] rounded px-1.5 py-0.5 text-[0.65rem] text-[#C9A84C] font-bold">{action.lp}</span>
                        <div className="font-semibold text-white mt-1">{action.objective}</div>
                        <div className="text-xs text-[#d1fae5]/65 mt-1 max-w-xs">{action.desc}</div>
                      </td>
                      <td className="p-4 align-top max-w-xs">
                        <div className="font-bold text-white">{action.action}</div>
                        <div className="text-xs text-[#d1fae5]/65 mt-1 line-clamp-3">{action.actionDesc}</div>
                      </td>
                      <td className="p-4 align-top text-center"><PriorityBadge priority={action.priority} /></td>
                      <td className="p-4 align-top text-center text-xs text-[#6ee7b7] font-semibold whitespace-nowrap">{action.due}</td>
                      <td className="p-4 align-top"><StatusBadge status={action.status} /></td>
                      <td className="p-4 align-top text-right font-bold text-[#C9A84C] whitespace-nowrap" style={{ fontFamily: "'Cinzel', serif" }}>{action.budget}</td>
                      <td className="p-4 align-top">
                        <div className="text-xs font-bold text-white">{action.lead}</div>
                        <div className="text-xs text-[#a7f3d0]/80">{action.support}</div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filteredActions.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-[#ecfdf5]/40 text-sm">No actions match this filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* ── PANEL D: Stakeholder Validation ─────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[rgba(6,78,59,0.15)] border border-[rgba(201,168,76,0.32)] rounded-2xl p-6 md:p-8 relative overflow-hidden"
          aria-labelledby="panel-d-title"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e]" aria-hidden="true" />
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">Panel D · Stakeholder Validation</span>
              <h2 id="panel-d-title" className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                Evidence Base &mdash; Validation Survey Results
              </h2>
              <div className="w-10 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] rounded-full mt-2" aria-hidden="true" />
            </div>
            <span className="text-xs text-[#a7f3d0]/70 bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-full px-3 py-1">
              n = {RESPONDENTS.totalResponses} &middot; {RESPONDENTS.fieldedFrom} to {RESPONDENTS.fieldedTo}
            </span>
          </div>

          {/* Coverage warning — the roadmap's most consequential evidence gap */}
          <div className="flex items-start gap-3 rounded-lg border border-[rgba(239,68,68,0.35)] bg-[rgba(239,68,68,0.08)] px-4 py-3 mb-6">
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#ef4444]" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold text-[#ef4444] mb-0.5">
                Coverage gap &mdash; {validation.silentProvinces.map(p => p.label).join(', ')} returned zero respondents
              </p>
              <p className="text-[0.7rem] text-[#ecfdf5]/55 leading-relaxed">{RESPONDENTS.coverageGap}</p>
            </div>
          </div>

          {/* Summary tiles — mirrors Panel C's summary card pattern */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { color: '#10b981', val: RESPONDENTS.totalResponses,       lbl: 'Consented Responses' },
              { color: '#C9A84C', val: `${validation.endorsedPct}%`,     lbl: 'Endorse IEDS Outright' },
              { color: '#ef4444', val: validation.meanReadiness.toFixed(2), lbl: 'Mean Readiness (1–5)' },
              { color: '#3b82f6', val: validation.silentProvinces.length, lbl: 'Provinces With No Voice' },
            ].map(({ color, val, lbl }) => (
              <div key={lbl} className="bg-[rgba(2,44,34,0.5)] border border-[rgba(201,168,76,0.32)] rounded-lg p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} aria-hidden="true" />
                <div className="text-2xl font-bold" style={{ color, fontFamily: "'Cinzel', serif" }}>{val}</div>
                <div className="text-[0.7rem] text-[#a7f3d0]/70 uppercase tracking-wider">{lbl}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* D-1 · The readiness gap, by BEIE cluster */}
            <div className="bg-[rgba(2,44,34,0.55)] border border-[rgba(201,168,76,0.32)] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <Cog className="w-4 h-4 text-[#C9A84C]" aria-hidden="true" />
                <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>The Readiness Gap</h3>
              </div>
              <p className="text-[0.68rem] text-[#ecfdf5]/45 mb-4 leading-relaxed">
                Every cluster rates readiness below both confidence and urgency. Widest gap:{' '}
                <strong className="text-[#ef4444]">{validation.weakest.label}</strong>{' '}
                (+{(validation.weakest.urgency - validation.weakest.readiness).toFixed(2)}).
              </p>
              {CLUSTER_SIGNALS.map(c => (
                <SignalBar
                  key={c.section}
                  label={c.label}
                  value={c.readiness}
                  max={5}
                  color={c.readiness < 3.45 ? '#ef4444' : '#C9A84C'}
                  sub={`confidence ${c.confidence.toFixed(2)} · urgency ${c.urgency.toFixed(2)} · n=${c.n}`}
                />
              ))}
              <div className="mt-3 pt-3 border-t border-[rgba(201,168,76,0.15)] flex items-center justify-between">
                <span className="text-[0.68rem] text-[#ecfdf5]/40">Region-wide readiness</span>
                <span className="text-sm font-bold text-[#ef4444]" style={{ fontFamily: "'Cinzel', serif" }}>
                  {validation.meanReadiness.toFixed(2)} / 5
                </span>
              </div>
            </div>

            {/* D-2 · Strategic option validation */}
            <div className="bg-[rgba(2,44,34,0.55)] border border-[rgba(201,168,76,0.32)] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-[#C9A84C]" aria-hidden="true" />
                <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>Strategy Validation</h3>
              </div>
              <p className="text-[0.68rem] text-[#ecfdf5]/45 mb-4 leading-relaxed">
                Stakeholders reproduce the consultant rank order exactly, at lower conviction. Scores below use only
                the {STRATEGY_SIGNALS.defaultContamination.differentiators} respondents who differentiated their sliders.
              </p>
              {STRATEGY_SIGNALS.options.map(o => (
                <SignalBar
                  key={o.code}
                  label={`${o.code} — ${o.name.replace(' Strategy', '')}`}
                  value={o.differentiatorScore}
                  max={10}
                  color={o.code === 'IEDS' ? '#10b981' : '#3b82f6'}
                  sub={`expert matrix ${o.expertScore.toFixed(2)} · rank ${o.expertRank}/${o.respondentRank}`}
                />
              ))}
              <div className="mt-3 pt-3 border-t border-[rgba(201,168,76,0.15)]">
                <ValidationBadge level="validated" note={`IEDS, ${validation.endorsed}/${RESPONDENTS.totalResponses}`} />
                <p className="text-[0.62rem] text-[#ecfdf5]/28 mt-2 leading-relaxed">
                  {STRATEGY_SIGNALS.defaultContamination.allCellsAtDefault} of {STRATEGY_SIGNALS.defaultContamination.respondents} respondents
                  left all 28 matrix cells on the identical default; bars above use only the
                  {' '}{STRATEGY_SIGNALS.defaultContamination.differentiators} who moved at least one slider.
                  Full-sample IEDS score is {STRATEGY_SIGNALS.options[0].fullSampleScore.toFixed(2)}.
                  Ranking is identical across expert, full-sample and differentiator sets — rank
                  agreement is total even though level agreement is weak.
                </p>
              </div>
            </div>

            {/* D-3 · Where stakeholders want the money */}
            <div className="bg-[rgba(2,44,34,0.55)] border border-[rgba(201,168,76,0.32)] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-[#C9A84C]" aria-hidden="true" />
                <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>Budget Priority Signal</h3>
              </div>
              <p className="text-[0.68rem] text-[#ecfdf5]/45 mb-4 leading-relaxed">
                Asked where the {TOTAL_BUDGET.label} roadmap should concentrate, respondents chose{' '}
                <strong className="text-[#10b981]">{validation.topCluster.label}</strong> first.
              </p>
              {BUDGET_SIGNALS.clusterPriority.map(c => (
                <SignalBar
                  key={c.label}
                  label={c.label}
                  value={c.n}
                  max={Math.max(...BUDGET_SIGNALS.clusterPriority.map(x => x.n))}
                  color={c.label === validation.topCluster.label ? '#10b981' : '#3b82f6'}
                />
              ))}
              <div className="mt-3 pt-3 border-t border-[rgba(201,168,76,0.15)] rounded-lg">
                <p className="text-[0.68rem] text-[#f59e0b] leading-relaxed">
                  <strong>Contradicts the roadmap.</strong> Transformers rank fifth-equal (8) in stakeholder priority,
                  yet Sequence B front-loads them. Funding-mix fairness scores {BUDGET_SIGNALS.fundingMixFair} and
                  target realism {BUDGET_SIGNALS.targetsRealistic} &mdash; the two lowest ratings in the instrument.
                </p>
              </div>
            </div>
          </div>

          {/* D-4 · Scorecard alignment strip — ties Panel D back to Panel B */}
          <div className="mt-6 pt-6 border-t border-[rgba(201,168,76,0.2)]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Cinzel', serif" }}>
                <Layers className="w-4 h-4 text-[#C9A84C]" aria-hidden="true" />
                Scorecard &amp; KPI Alignment
                <span className="text-[0.65rem] font-normal text-[#ecfdf5]/35">(validates Panel B)</span>
              </h3>
              <span className="text-[0.68rem] text-[#ecfdf5]/35">Sections 11–12 · 1–5 agreement scale</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div>
                {BSC_ALIGNMENT.slice(0, 4).map(r => (
                  <SignalBar key={r.label} label={r.label} value={r.value} max={5} color="#C9A84C" sub={`n=${r.n}`} />
                ))}
              </div>
              <div>
                {KPI_IMPORTANCE.map(r => (
                  <SignalBar key={r.label} label={r.label} value={r.value} max={5} color="#10b981" sub={`n=${r.n}`} />
                ))}
              </div>
            </div>
            <p className="text-[0.68rem] text-[#ecfdf5]/40 mt-3 leading-relaxed">
              Stakeholders endorse the <em>framework</em> more readily than the <em>target levels</em>: vision
              achievability is the lowest-rated item in the section at{' '}
              {SCORECARD_META.find(b => b.label === 'Vision is achievable')?.value ?? '—'}.
            </p>
          </div>

          {/* Provenance */}
          <p className="mt-6 flex items-start gap-2 text-[0.66rem] leading-relaxed text-[#ecfdf5]/32">
            <Info className="w-3 h-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <span>
              {RESPONDENTS.totalResponses} consented responses, mean {RESPONDENTS.meanFieldsAnswered} of ~245 fields
              answered. Non-probability convenience sample with no weighting frame &mdash; these are stakeholder
              validation signals, not population estimates. Regional baseline: &#8369;{REGIONAL_TOTALS.gdp2024B}B GRDP
              (2024), {REGIONAL_TOTALS.growth2024}% growth; provincial outlook files cover {REGIONAL_TOTALS.coveragePct}%
              of regional GDP.
            </span>
          </p>
        </motion.section>

        {/* ── PANEL F: Evidence Provenance ────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[rgba(6,78,59,0.15)] border border-[rgba(201,168,76,0.32)] rounded-2xl p-6 md:p-8 relative overflow-hidden"
          aria-labelledby="panel-f-title"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e]" aria-hidden="true" />

          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">
                Panel F · Evidence Provenance
              </span>
              <h2 id="panel-f-title" className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                What the Evidence Actually Covers
              </h2>
              <div className="w-10 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] rounded-full mt-2" aria-hidden="true" />
              <p className="text-xs text-[#ecfdf5]/50 mt-3 max-w-2xl leading-relaxed">
                A MEL dashboard that reports only findings is half a dashboard. This panel reports
                the shape of the evidence base itself — where stakeholder input exists, and where a
                confident-looking number is standing on nothing.
              </p>
            </div>
            <span className="text-xs text-[#a7f3d0]/70 bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-full px-3 py-1">
              {WORKSHOP_EVIDENCE.totalRecords} workshop records · n={RESPONDENTS.totalResponses} survey
            </span>
          </div>

          {/* F-1 · Workshop coverage matrix */}
          <div className="bg-[rgba(2,44,34,0.5)] border border-[rgba(201,168,76,0.2)] rounded-xl p-5 mb-4">
            <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
              Workshop Coverage by Sector
            </h3>
            <p className="text-[0.68rem] text-[#ecfdf5]/40 mb-4">
              Substantive records per sector per workshop. Empty cells are not low signal — they are
              no signal.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <caption className="sr-only">
                  Count of substantive workshop records by sector and workshop stage
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="text-left text-[0.62rem] uppercase tracking-wider text-[#ecfdf5]/40 font-bold pb-2 pr-3">
                      Sector
                    </th>
                    {WORKSHOP_EVIDENCE.workshops.map(w => (
                      <th key={w.code} scope="col" className="text-center text-[0.62rem] uppercase tracking-wider text-[#ecfdf5]/40 font-bold pb-2 px-2">
                        {w.code}
                        <span className="block font-normal normal-case tracking-normal text-[0.58rem] text-[#ecfdf5]/25">
                          {w.label}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {WORKSHOP_EVIDENCE.sectors.map(row => (
                    <tr key={row.sector} className="border-t border-[rgba(255,255,255,0.06)]">
                      <th scope="row" className="text-left text-[0.72rem] text-white font-semibold py-2 pr-3 whitespace-nowrap">
                        {row.sector}
                      </th>
                      {(['W1', 'W2', 'W4', 'W5'] as const).map(code => {
                        const v = row[code];
                        // Intensity scaled against 12; 27 saturates deliberately.
                        const a = v === 0 ? 0 : Math.min(0.85, 0.15 + (v / 12) * 0.7);
                        return (
                          <td key={code} className="text-center py-2 px-2">
                            <span
                              className="inline-flex items-center justify-center w-9 h-7 rounded-md text-[0.72rem] font-bold tabular-nums"
                              style={
                                v === 0
                                  ? { background: 'rgba(239,68,68,0.10)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.35)' }
                                  : { background: `rgba(16,185,129,${a})`, color: a > 0.5 ? '#022c22' : '#6ee7b7' }
                              }
                              title={`${row.sector} · ${code}: ${v} record${v === 1 ? '' : 's'}`}
                            >
                              {v}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-[0.7rem] text-[#f59e0b] bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.25)] rounded-lg px-3 py-2 leading-relaxed">
              <strong>Infrastructure carries the largest challenge inventory in the series (27
              records) and has no SWOT and no strategy sheet behind it.</strong> Tourism has a
              strategy with no SWOT beneath it. Four of six sectors never completed the opportunity
              translation step (W2 ≤ 2). Any Infrastructure or Tourism strategy content in this
              platform is analyst inference, not a stakeholder output, and should not be presented
              to BOI-MTIT as validated.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* F-2 · Sequencing validation */}
            <div className="bg-[rgba(2,44,34,0.5)] border border-[rgba(201,168,76,0.2)] rounded-xl p-5">
              <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                IEDS Sequencing — Priority &amp; Standing
              </h3>
              <p className="text-[0.68rem] text-[#ecfdf5]/40 mb-4">Survey §10 · 1–5 priority scale</p>

              {SEQUENCE_SIGNALS.map(s => (
                <div key={s.code} className="mb-3 last:mb-0">
                  <SignalBar
                    label={`Sequence ${s.code} — ${s.label}`}
                    value={s.mean}
                    max={5}
                    color={s.validation === 'unvalidated' ? '#ef4444' : '#10b981'}
                    sub={`n=${s.n} · SD ${s.sd.toFixed(2)}`}
                  />
                  {s.validation === 'unvalidated' && (
                    <div className="mt-1">
                      <ValidationBadge level="unvalidated" note="zero island respondents" />
                    </div>
                  )}
                </div>
              ))}

              <p className="text-[0.68rem] text-[#ecfdf5]/45 leading-relaxed mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                The three sequences are separated by 0.20 of a scale point against SDs near 0.75 —
                statistically these are one undifferentiated block, not a ranked order. Sequence C is
                the BIMP-EAGA maritime corridor, and Basilan and Tawi-Tawi returned zero respondents.
                Its 4.00 is a mainland opinion about an island programme.
              </p>
            </div>

            {/* F-3 · Phase funding preference vs plan */}
            <div className="bg-[rgba(2,44,34,0.5)] border border-[rgba(201,168,76,0.2)] rounded-xl p-5">
              <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                Phase Funding Preference vs. Plan
              </h3>
              <p className="text-[0.68rem] text-[#ecfdf5]/40 mb-4">Survey §13 · q13_6 · n=68</p>

              {PHASE_FUNDING_PREFERENCE.map(p => {
                const planned = p.phase ? PHASES.find(ph => ph.num === p.phase) : undefined;
                return (
                  <SignalBar
                    key={p.key}
                    label={p.label}
                    value={p.n}
                    max={30}
                    color={p.phase === '03' ? '#ef4444' : '#C9A84C'}
                    suffix=" resp."
                    sub={planned ? `plan allocates ${planned.budget}` : 'no single-phase weighting'}
                  />
                );
              })}

              <p className="text-[0.68rem] text-[#ecfdf5]/45 leading-relaxed mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                No mandate exists for back-loading. Only 9 of 68 respondents favoured weighting the
                consolidation phase, against a plan that allocates {PHASES[2].budget} to it. The
                modal preference — even spread (24) — is also the one the current three-phase profile
                does not deliver.
              </p>
            </div>
          </div>

          {/* F-4 · Survey geographic coverage */}
          <div className="bg-[rgba(2,44,34,0.5)] border border-[rgba(201,168,76,0.2)] rounded-xl p-5 mt-4">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
              <h3 className="text-sm font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                Survey Coverage — Who Actually Answered
              </h3>
              <ValidationBadge level="partial" note={`${validation.silentProvinces.length} provinces silent`} />
            </div>
            <p className="text-[0.68rem] text-[#ecfdf5]/40 mb-4">
              All {RESPONDENTS.totalResponses} responses carry final consent; none quarantined.
              Fielded {RESPONDENTS.fieldedFrom} – {RESPONDENTS.fieldedTo}.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {RESPONDENTS.byProvince.map(p => (
                <div
                  key={p.label}
                  className="rounded-lg px-3 py-2 border"
                  style={
                    p.n === 0
                      ? { background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.35)' }
                      : { background: 'rgba(6,78,59,0.35)', borderColor: 'rgba(201,168,76,0.2)' }
                  }
                >
                  <div
                    className="text-base font-bold leading-none tabular-nums"
                    style={{ color: p.n === 0 ? '#ef4444' : '#C9A84C', fontFamily: "'Cinzel', serif" }}
                  >
                    {p.n}
                  </div>
                  <div className="text-[0.65rem] text-[#ecfdf5]/55 leading-snug mt-1">{p.label}</div>
                </div>
              ))}
            </div>

            <p className="text-[0.68rem] text-[#ecfdf5]/45 leading-relaxed mt-4">
              {RESPONDENTS.coverageGap}
            </p>
            <p className="text-[0.62rem] text-[#ecfdf5]/30 leading-relaxed mt-2">
              Non-probability convenience sample with no weighting frame. Every figure in Panels D
              and F is a stakeholder validation signal, not a population estimate for BARMM.
            </p>
          </div>
        </motion.section>


        {/* ── PANEL E: Phase Progress Tracker ─────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-[rgba(6,78,59,0.15)] border border-[rgba(201,168,76,0.32)] rounded-2xl p-6 md:p-8 relative overflow-hidden"
          aria-labelledby="panel-e-title"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e]" aria-hidden="true" />
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <span className="text-[0.68rem] font-bold tracking-widest uppercase text-[#C9A84C] block mb-1">Panel E · Implementation Roadmap</span>
              <h2 id="panel-e-title" className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                Phase Progress Tracker — 2026–2035
              </h2>
              <div className="w-10 h-1 bg-gradient-to-r from-[#7a5c1e] via-[#E8C560] to-[#7a5c1e] rounded-full mt-2" aria-hidden="true" />
            </div>
            <span className="text-xs text-[#a7f3d0]/70 bg-[rgba(6,78,59,0.4)] border border-[rgba(201,168,76,0.32)] rounded-full px-3 py-1">
              {TOTAL_BUDGET.label} total · 3 phases
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PHASES.map((phase, i) => (
              <motion.article
                key={phase.num}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="bg-[rgba(2,44,34,0.55)] border border-[rgba(201,168,76,0.32)] rounded-xl p-5 relative overflow-hidden"
              >
                <div
                  className="text-4xl font-black text-[#C9A84C] opacity-20 absolute top-4 right-5 select-none"
                  style={{ fontFamily: "'Cinzel', serif" }} aria-hidden="true"
                >
                  {phase.num}
                </div>
                <div className="text-sm font-bold text-white mb-0.5" style={{ fontFamily: "'Cinzel', serif" }}>{phase.title}</div>
                <div className="text-xs text-[#6ee7b7] font-medium mb-3">{phase.years}</div>
                <div className="text-lg font-bold text-[#C9A84C] mb-1" style={{ fontFamily: "'Cinzel', serif" }}>{phase.budget}</div>
                <div className="text-[0.65rem] text-[#ecfdf5]/35 mb-3">{phase.focus}</div>
                <StatusBadge status={phase.statusClass === 'in-progress' ? 'In Progress' : phase.statusClass === 'upcoming' ? 'Planned' : 'Pre-Dev'} />

                <div
                  className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden my-3"
                  role="progressbar" aria-valuenow={phase.progress} aria-valuemin={0} aria-valuemax={100}
                  aria-label={`Phase ${phase.num} progress: ${phase.progress}%`}
                >
                  <motion.div
                    className={`h-full rounded-full ${
                      phase.num === '01' ? 'bg-gradient-to-r from-[#10b981] to-[#6ee7b7]'  :
                      phase.num === '02' ? 'bg-gradient-to-r from-[#3b82f6] to-[#93c5fd]'  :
                                           'bg-gradient-to-r from-[#8b5cf6] to-[#c4b5fd]'
                    }`}
                    initial={{ width: 0 }} whileInView={{ width: `${phase.progress}%` }} viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
                <div className="text-xs text-[#ecfdf5]/40 text-right mb-4">{phase.progress}% complete</div>

                <ul className="flex flex-col gap-1.5">
                  {phase.milestones.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#d1fae5]/75">
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 mt-0.5 ${
                          m.status === 'active' ? 'bg-[#C9A84C] animate-pulse' :
                          m.status === 'done'   ? 'bg-[#10b981]' : 'bg-[#ecfdf5]/20'
                        }`}
                        aria-hidden="true"
                      />
                      <span className={m.status === 'done' ? 'text-[#d1fae5]/40 line-through' : ''}>
                        {m.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-[rgba(201,168,76,0.32)] mt-8">
        <p className="text-xs text-[#ecfdf5]/30">
          © 2026 BARMM · Ministry of Trade, Investments and Tourism ·{' '}
          <span className="text-[#C9A84C]">The Emerging Bangsamoro</span> · Investment Roadmap 2026–2035
        </p>
        <p className="text-[0.68rem] text-[#ecfdf5]/20 mt-1">
          Data sources: PSA, BBOI, BEZA, MTIT, MENRE (2024 baselines) · Provincial Economic &amp; Investment Outlooks · Workshops 1/2/4/5 (2025) · Validation Survey n={RESPONDENTS.totalResponses} (Aug 2026). Targets per BIRD 2026–2035 &amp; BDP 2023–2028.
        </p>
      </footer>

      {/* AI Chat slide-in */}
      <AnimatePresence>
        {showAIChat && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowAIChat(false)}
              aria-hidden="true"
            />
            <AIStrategistChat onClose={() => setShowAIChat(false)} />
          </>
        )}
      </AnimatePresence>

      {/* AI FAB */}
      <AnimatePresence>
        {!showAIChat && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowAIChat(true)}
            aria-label="Open BIRD AI Strategy Assistant"
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#022c22]/90 backdrop-blur shadow-xl shadow-[#C9A84C]/40 flex items-center justify-center border-2 border-[#C9A84C]/50 hover:border-[#C9A84C] transition"
          >
            <AIAvatar size={48} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MELDashboard;