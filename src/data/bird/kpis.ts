// ─────────────────────────────────────────────────────────────────────────────
// BIRD 2026–2035 · Balanced Scorecard KPIs & Leverage Points
// Single source of truth for the scorecard catalogue, the six headline KPIs and
// the Chapter 4 supporting indicators.
//
// Codes and figures follow BIRD 2026–2035 Chapter 5 exactly: 27 objectives,
// F1–F6 · S1–S7 · P1–P7 · L1–L7 (tables B.1–E.1), and the six headline KPIs of
// Table G.1. Indicators that Chapter 5 does not carry, but Chapter 4 does, live
// in SUPPORTING_INDICATORS below, not in the scorecard.
//
// Progress = latest reading as a share of the 2035 target. Where a baseline is
// "<x" the bound x is used; where no baseline exists yet, progress is 0 and the
// card says "to be established". All values are draft planning figures pending
// data-owner verification (Chapter 5, "Baseline and target status").
//
// Data custody: Alvin Silva (developer and systems architect), co-owned with
// BOI-MTIT. `source` fields name the statistical source for each figure.
// ─────────────────────────────────────────────────────────────────────────────


export type KPIStatus = 'on-track' | 'watch' | 'behind' | 'critical';
export type RingColor = 'gold' | 'blue' | 'green' | 'teal';
export type BSCPerspective =
  | 'Financial'
  | 'Stakeholder'
  | 'Internal Process'
  | 'Learning & Growth';

export interface KPI {
  id: number;
  label: string;
  current: string;
  currentSub: string;
  target2030: string;
  target: string; // 2035 target
  progress: number;
  status: KPIStatus;
  delta: string;
  source: string;
  ringColor: RingColor;
  leveragePoint: string;
  perspective: BSCPerspective;
  bscCode: string; // e.g. F1, S2, IP3, LG4
  benchmark?: string; // OIC/ESG/PDP alignment
  /** Chapter 5 objectives a headline KPI links to (Table G.1 "BSC Link"). */
  bscLinks?: string[];
}

export interface BSCLeveragePoint {
  perspective: BSCPerspective;
  lp: string;
  action: string;
  kpi: string;
  current: string;
  target2030: string;
  target: string;
  progress: number;
  status: string;
  statusSub: string;
  color: 'gold' | 'blue' | 'teal' | 'green';
  bscCode: string;
  strategicInitiative: string;
}

// ─── BIRD Brand Color Constants ──────────────────────────────────────────────
export const BIRD_COLORS = {
  darkGreen: '#022c22',
  midGreen: '#064e3b',
  gold: '#C9A84C',
  goldLight: '#E8C560',
  goldDark: '#8B6C28',
  cream: '#ecfdf5',
  muted: '#64748b',
} as const;

/** Ring color → Tailwind CSS classes (BIRD branded) */
export const RING_COLOR_MAP: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  gold:  { bg: 'bg-[#C9A84C]/10',  text: 'text-[#E8C560]',  border: 'border-[#C9A84C]/20',  glow: 'shadow-[#C9A84C]/20' },
  blue:  { bg: 'bg-[#3b82f6]/10',  text: 'text-[#60a5fa]',  border: 'border-[#3b82f6]/20',  glow: 'shadow-[#3b82f6]/20' },
  green: { bg: 'bg-[#059669]/10',  text: 'text-[#6ee7b7]',  border: 'border-[#059669]/20',  glow: 'shadow-[#059669]/20' },
  teal:  { bg: 'bg-[#0891b2]/10',  text: 'text-[#22d3ee]',  border: 'border-[#0891b2]/20',  glow: 'shadow-[#0891b2]/20' },
};


// ─── Full Balanced Scorecard catalogue (Chapter 5, 27 objectives) ─────────────
export const ALL_BSC_KPIS: KPI[] = [
  // FINANCIAL PERSPECTIVE (30%) · F1–F6 ──────────────────────────────────────
  {
    id: 1,
    label: 'Annual Investment Approvals',
    current: '₱5.1B',
    currentSub: '(Jan–Apr 2026; ₱5.0B in 2025)',
    target2030: '₱10B p.a.',
    target: '₱15B+ p.a. by 2035',
    progress: 34,
    status: 'watch',
    delta: '▲ Structural shift',
    source: 'BOI-MTIT / BEZA · ⭐ LP1+LP3',
    ringColor: 'gold',
    leveragePoint: 'LP1+LP3',
    perspective: 'Financial',
    bscCode: 'F1',
    benchmark: 'NEDA PDP 2023–2028; CREATE MORE Act',
  },
  {
    id: 2,
    label: 'BARMM GRDP',
    current: '₱266.59B',
    currentSub: '(2025, five provinces)',
    target2030: '₱383B',
    target: '₱550B+ by 2035',
    progress: 48,
    status: 'watch',
    delta: '▲ 5.0% growth (2025); needs ~7.5% a year',
    source: 'PSA-RSSO BARMM · ⭐ LP1+LP2',
    ringColor: 'gold',
    leveragePoint: 'LP1+LP2',
    perspective: 'Financial',
    bscCode: 'F2',
    benchmark: 'NEDA PDP; BDP 2023–2028',
  },
  {
    id: 3,
    label: 'Total Export Value',
    current: '<₱10B',
    currentSub: '(draft; verify)',
    target2030: '₱26B',
    target: '₱40B+ by 2035',
    progress: 25,
    status: 'watch',
    delta: '~ Baseline phase',
    source: 'PSA-BARMM trade data · ⭐ LP1',
    ringColor: 'blue',
    leveragePoint: 'LP1',
    perspective: 'Financial',
    bscCode: 'F3',
    benchmark: 'BIMP-EAGA export targets',
  },
  {
    id: 4,
    label: 'Green Economy Revenue (Carbon + PES)',
    current: '₱0',
    currentSub: '(zero; pre-2026)',
    target2030: '₱100M p.a.',
    target: '₱500M p.a. by 2035',
    progress: 0,
    status: 'watch',
    delta: '~ JMC No. 2026-01 pipeline',
    source: 'MENRE / JMC No. 2026-01 · ⭐ LP5',
    ringColor: 'green',
    leveragePoint: 'LP5',
    perspective: 'Financial',
    bscCode: 'F4',
    benchmark: 'REDD+; BIMP-EAGA EGL Plan 2025–2028',
  },
  {
    id: 5,
    label: 'Islamic Banking Assets in BARMM',
    current: '<₱2B',
    currentSub: '(draft; verify)',
    target2030: '₱8B',
    target: '₱20B+ by 2035',
    progress: 10,
    status: 'watch',
    delta: '~ Al-Amanah expansion',
    source: 'BSP / MFBM · ⭐ LP4',
    ringColor: 'blue',
    leveragePoint: 'LP4',
    perspective: 'Financial',
    bscCode: 'F5',
    benchmark: 'RA 11439 (Islamic Banking Law); OIC standards',
  },
  {
    id: 6,
    label: 'FDI Approvals',
    current: 'Part of total',
    currentSub: '(not separated yet)',
    target2030: '₱2B+ p.a.',
    target: '₱3B+ p.a. by 2035',
    progress: 0,
    status: 'watch',
    delta: '~ Baseline to be established',
    source: 'BOI-MTIT / BEZA · ⭐ LP1+LP3',
    ringColor: 'gold',
    leveragePoint: 'LP1+LP3',
    perspective: 'Financial',
    bscCode: 'F6',
    benchmark: 'CREATE MORE Act; PFEZ',
  },

  // STAKEHOLDER PERSPECTIVE (25%) · S1–S7 ────────────────────────────────────
  {
    id: 7,
    label: 'Investor Satisfaction Score (1–10)',
    current: 'Not measured',
    currentSub: '(baseline to be established)',
    target2030: '7.0/10',
    target: '8.0+/10 by 2035',
    progress: 0,
    status: 'watch',
    delta: '~ BICC activates R2 loop',
    source: 'BOI-MTIT aftercare protocol · ⭐ LP3',
    ringColor: 'blue',
    leveragePoint: 'LP3',
    perspective: 'Stakeholder',
    bscCode: 'S1',
    benchmark: 'Proposed MTIT–Bureau of Investments investor-aftercare protocol',
  },
  {
    id: 8,
    label: 'Project Retention Rate',
    current: 'Not measured',
    currentSub: '(baseline to be established)',
    target2030: '80%',
    target: '85% by 2035',
    progress: 0,
    status: 'watch',
    delta: '~ One-stop shop; problem resolution',
    source: 'BOI-MTIT / BEZA · ⭐ LP3',
    ringColor: 'blue',
    leveragePoint: 'LP3',
    perspective: 'Stakeholder',
    bscCode: 'S2',
  },
  {
    id: 9,
    label: 'Halal-Certified MSMEs',
    current: '~500',
    currentSub: '(draft; verify)',
    target2030: '3,000',
    target: '5,000+ by 2035',
    progress: 10,
    status: 'watch',
    delta: '~ 3,000 by 2030',
    source: 'Bangsamoro Halal Board registry · ⭐ LP1',
    ringColor: 'gold',
    leveragePoint: 'LP1',
    perspective: 'Stakeholder',
    bscCode: 'S3',
    benchmark: 'BHIDP 2025–2030; OIC/SMIIC standards',
  },
  {
    id: 10,
    label: 'Poverty Incidence',
    current: '23.5%',
    currentSub: '(families, full-year 2023)',
    target2030: '<25% (met; recalibrate)',
    target: '<20% by 2035',
    progress: 89,
    status: 'on-track',
    delta: '▼ from 52.9% in 2018',
    source: 'PSA · ⭐ LP1+LP2',
    ringColor: 'teal',
    leveragePoint: 'LP1+LP2',
    perspective: 'Stakeholder',
    bscCode: 'S4',
    benchmark: 'PSA; SDG 1; BDP 2023–2028',
  },
  {
    id: 11,
    label: 'Adult Financial Inclusion Rate',
    current: '~38%',
    currentSub: '(definition to be harmonised)',
    target2030: '55%',
    target: '70%+ by 2035',
    progress: 54,
    status: 'watch',
    delta: '~ Islamic microfinance; fintech',
    source: 'BSP / MFBM · ⭐ LP4',
    ringColor: 'teal',
    leveragePoint: 'LP4',
    perspective: 'Stakeholder',
    bscCode: 'S5',
    benchmark: 'BSP National Strategy for Financial Inclusion',
  },
  {
    id: 12,
    label: 'Jobs Reported by Investment-Approved Firms',
    current: '2,029',
    currentSub: '(2025)',
    target2030: '10,000+',
    target: '20,000+ by 2035',
    progress: 10,
    status: 'watch',
    delta: '~ Labour-intensive sector priorities',
    source: 'BOI-MTIT / MOLE · ⭐ LP1+LP3',
    ringColor: 'teal',
    leveragePoint: 'LP1+LP3',
    perspective: 'Stakeholder',
    bscCode: 'S6',
    benchmark: 'SDG 8; BIDP 2025–2035',
  },
  {
    id: 13,
    label: 'Inter-Provincial Growth Disparity',
    current: '3.9 pp',
    currentSub: '(2024; verify)',
    target2030: '<2.5 pp',
    target: '<1.5 pp by 2035',
    progress: 38,
    status: 'watch',
    delta: '~ Affirmative infrastructure allocation',
    source: 'BPDA / MFBM · ⭐ LP2',
    ringColor: 'teal',
    leveragePoint: 'LP2',
    perspective: 'Stakeholder',
    bscCode: 'S7',
    benchmark: 'BDP 2023–2028; IEDS equity targets',
  },

  // INTERNAL PROCESS PERSPECTIVE (25%) · P1–P7 ───────────────────────────────
  {
    id: 14,
    label: 'Business Registration Time',
    current: 'Multiple days',
    currentSub: '(2024)',
    target2030: '2 days',
    target: '1 day (digital) by 2035',
    progress: 20,
    status: 'watch',
    delta: '~ BEGMP digital rollout',
    source: 'BOI-MTIT / BDTA · ⭐ LP3',
    ringColor: 'blue',
    leveragePoint: 'LP3',
    perspective: 'Internal Process',
    bscCode: 'P1',
    benchmark: 'BEGMP; Ease of Doing Business Act',
  },
  {
    id: 15,
    label: 'Permit Processing Time',
    current: 'Not measured',
    currentSub: '(baseline to be established)',
    target2030: '10 days',
    target: '7 days by 2035',
    progress: 0,
    status: 'watch',
    delta: '~ One-stop shop to all provinces',
    source: 'BOI-MTIT / LGU BPLS · ⭐ LP3',
    ringColor: 'blue',
    leveragePoint: 'LP3',
    perspective: 'Internal Process',
    bscCode: 'P2',
    benchmark: 'Ease of Doing Business Act',
  },
  {
    id: 16,
    label: 'BHB OIC/SMIIC Accreditation',
    current: 'Pending',
    currentSub: '(OIC/SMIIC accreditation)',
    target2030: 'Provisional alignment',
    target: 'Full accreditation + MRA by 2035',
    progress: 20,
    status: 'watch',
    delta: '~ Q2 2026 operationalisation',
    source: 'Bangsamoro Halal Board · ⭐ LP1',
    ringColor: 'gold',
    leveragePoint: 'LP1',
    perspective: 'Internal Process',
    bscCode: 'P3',
    benchmark: 'OIC/SMIIC standards; BHIDP 2025–2030',
  },
  {
    id: 17,
    label: 'Infrastructure Budget Execution Rate',
    current: '<80%',
    currentSub: '(2024)',
    target2030: '88%',
    target: '>90% by 2035',
    progress: 89,
    status: 'watch',
    delta: '~ ₱28B of ₱140B at risk at 80%',
    source: 'MFBM / MPW · ⭐ LP2',
    ringColor: 'green',
    leveragePoint: 'LP2',
    perspective: 'Internal Process',
    bscCode: 'P4',
    benchmark: 'BDP 2023–2028',
  },
  {
    id: 18,
    label: 'Inter-Agency Coordination Score',
    current: '~5.5/10',
    currentSub: '(2024)',
    target2030: '7.5/10',
    target: '8/10 by 2035',
    progress: 69,
    status: 'watch',
    delta: '~ Joint M&E; inter-agency MOAs',
    source: 'BPDA / Bangsamoro Corp · ⭐ LP3',
    ringColor: 'blue',
    leveragePoint: 'LP3',
    perspective: 'Internal Process',
    bscCode: 'P5',
    benchmark: 'BDP / MOA framework',
  },
  {
    id: 19,
    label: 'JMC No. 2026-01 Implementation Rate',
    current: '0%',
    currentSub: '(2026)',
    target2030: '60%',
    target: '100% by 2035',
    progress: 0,
    status: 'watch',
    delta: '~ MENRE–MILG coordination',
    source: 'MENRE / MILG · ⭐ LP5',
    ringColor: 'green',
    leveragePoint: 'LP5',
    perspective: 'Internal Process',
    bscCode: 'P6',
    benchmark: 'JMC No. 2026-01; Bangsamoro Forestry Code',
  },
  {
    id: 20,
    label: 'Climate-Risk Screening Coverage',
    current: '0%',
    currentSub: '(2024)',
    target2030: '85%',
    target: '100% of projects by 2035',
    progress: 0,
    status: 'behind',
    delta: '~ Climate-resilient design standards',
    source: 'MENRE · ⭐ LP2+LP5',
    ringColor: 'green',
    leveragePoint: 'LP2+LP5',
    perspective: 'Internal Process',
    bscCode: 'P7',
    benchmark: 'SDG 13; MENRE Climate Resilience Master Plan 2024–2035',
  },

  // LEARNING & GROWTH PERSPECTIVE (20%) · L1–L7 ──────────────────────────────
  {
    id: 21,
    label: 'Halal Certification Officers Trained',
    current: '<50',
    currentSub: '(2024)',
    target2030: '70',
    target: '100+ officers by 2035',
    progress: 50,
    status: 'watch',
    delta: '~ 70 by 2030',
    source: 'Bangsamoro Halal Board / MTIT · ⭐ LP1',
    ringColor: 'gold',
    leveragePoint: 'LP1',
    perspective: 'Learning & Growth',
    bscCode: 'L1',
    benchmark: 'BHIDP 2025–2030; SMIIC standards',
  },
  {
    id: 22,
    label: 'Islamic Finance Professionals in BARMM',
    current: '<20',
    currentSub: '(2024)',
    target2030: '35',
    target: '50+ by 2035',
    progress: 40,
    status: 'watch',
    delta: '~ BSP-aligned scholarships; IsDB training',
    source: 'BSP / MFBM · ⭐ LP4',
    ringColor: 'blue',
    leveragePoint: 'LP4',
    perspective: 'Learning & Growth',
    bscCode: 'L2',
    benchmark: 'RA 11439; IsDB',
  },
  {
    id: 23,
    label: 'IPA Staff Certified or Trained',
    current: '<50%',
    currentSub: '(2024)',
    target2030: '70%',
    target: '80% by 2035',
    progress: 62,
    status: 'watch',
    delta: '~ BOI capacity-development plan',
    source: 'BOI-MTIT · ⭐ LP3',
    ringColor: 'gold',
    leveragePoint: 'LP3',
    perspective: 'Learning & Growth',
    bscCode: 'L3',
  },
  {
    id: 24,
    label: 'Digital Services Launched (BEGMP)',
    current: '<5',
    currentSub: '(2024)',
    target2030: '15',
    target: '20+ by 2035',
    progress: 25,
    status: 'watch',
    delta: '~ BEGMP implementation',
    source: 'MICT / DICT · ⭐ LP3',
    ringColor: 'blue',
    leveragePoint: 'LP3',
    perspective: 'Learning & Growth',
    bscCode: 'L4',
    benchmark: 'BEGMP 2025–2030; SDG 9',
  },
  {
    id: 25,
    label: 'Functional Literacy Rate (ages 10–64)',
    current: '64.7%',
    currentSub: '(PSA FLEMMS 2024)',
    target2030: '72%',
    target: '75%+ by 2035',
    progress: 86,
    status: 'watch',
    delta: '▲ TVET expansion',
    source: 'PSA FLEMMS / DepEd-BARMM · ⭐ LP1',
    ringColor: 'teal',
    leveragePoint: 'LP1',
    perspective: 'Learning & Growth',
    bscCode: 'L5',
    benchmark: 'SDG 4; DepEd/TESDA alignment',
  },
  {
    id: 26,
    label: 'LGU Staff Trained on Carbon / PES',
    current: '0',
    currentSub: '(2024)',
    target2030: '120',
    target: '200+ by 2035',
    progress: 0,
    status: 'watch',
    delta: '~ MENRE–DILG training programme',
    source: 'MENRE / MILG · ⭐ LP5',
    ringColor: 'green',
    leveragePoint: 'LP5',
    perspective: 'Learning & Growth',
    bscCode: 'L6',
    benchmark: 'JMC No. 2026-01',
  },
  {
    id: 27,
    label: 'TESDA Training Regulations Developed',
    current: '0',
    currentSub: '(priority sectors)',
    target2030: '5 TRs',
    target: '15 TRs by 2035',
    progress: 0,
    status: 'watch',
    delta: '~ TESDA–industry councils',
    source: 'TESDA-BARMM · ⭐ LP1+LP3',
    ringColor: 'teal',
    leveragePoint: 'LP1+LP3',
    perspective: 'Learning & Growth',
    bscCode: 'L7',
    benchmark: 'TESDA; BIDP 2025–2035',
  },
];

const byCode = (code: string): KPI => {
  const k = ALL_BSC_KPIS.find(x => x.bscCode === code);
  if (!k) throw new Error(`kpis.ts: no objective ${code}`);
  return k;
};

// ─── Panel A · Six headline KPIs (Chapter 5, Table G.1) ───────────────────────
// "Pareto-style" names a compact management shortlist only. Chapter 5 is explicit
// that it is NOT a claim that these six account for 80% of impact.
// Rows 1–4 are scorecard objectives; rows 5–6 are headline-only measures that
// link to S7 and F2 (Table G.1 "BSC Link") and so carry `bscLinks`.
export const PARETO_KPIS: KPI[] = [
  byCode('F1'),
  byCode('F2'),
  byCode('F3'),
  byCode('S3'),
  {
    id: 101,
    label: 'Household Electrification (EC areas)',
    current: '~39–40%',
    currentSub: '(NEA; one metric to be adopted, Table 7.6)',
    target2030: 'Proposed; confirm after baseline',
    target: '90% by 2035 (100% by 2040)',
    progress: 44,
    status: 'watch',
    delta: '~ One agreed metric needed (Table 7.6)',
    source: 'MENRE / DOE / NEA · ⭐ LP2',
    ringColor: 'green',
    leveragePoint: 'LP2',
    perspective: 'Stakeholder',
    bscCode: 'G1-5',
    benchmark: 'BSEMP; SDG 7',
    bscLinks: ['S7', 'F2'],
  },
  {
    id: 102,
    label: 'Broadband Connectivity',
    current: '<30%',
    currentSub: '(draft; verify)',
    target2030: '60%',
    target: '85% by 2035',
    progress: 35,
    status: 'on-track',
    delta: '▲ 60% by 2030',
    source: 'MICT / DICT · ⭐ LP2',
    ringColor: 'green',
    leveragePoint: 'LP2',
    perspective: 'Stakeholder',
    bscCode: 'G1-6',
    benchmark: 'BEGMP 2025–2030; SDG 9',
    bscLinks: ['S7', 'F2'],
  },
];

// ─── Chapter 4 supporting indicators (not Chapter 5 scorecard objectives) ─────
// Placement by analysis of Chapter 4:
//   • Gender-balanced employment — C.3 Inclusivity operating-system metric
//     (also the SDG 5 & 8 benchmark in Section E). Informs S6.
//   • Renewable energy share — Section E ESG benchmark; D.1 Foundations cluster
//     indicator (definition still to be verified there). Informs P6 / P7.
//   • MSME share of GDP — Section E PDP benchmark. Informs S3.
//   • Halal certification processing time — Section E OIC/SMIIC benchmark; the
//     throughput measure behind P3.
export type SupportingFrame =
  | 'Operating system · Inclusivity'
  | 'Benchmark · ESG'
  | 'Benchmark · PDP'
  | 'Benchmark · OIC/SMIIC';

export interface SupportingIndicator {
  id: string;
  label: string;
  frame: SupportingFrame;
  chapter4Ref: string;
  informs: string[];       // Chapter 5 objective codes this indicator informs
  current: string;
  currentSub: string;
  gate2028?: string;
  target2030: string;
  target: string;
  progress: number;
  status: KPIStatus;
  source: string;
  benchmark?: string;
}

export const SUPPORTING_INDICATORS: SupportingIndicator[] = [
  {
    id: 'C3-gender',
    label: 'Gender-Balanced Employment in Registered Firms',
    frame: 'Operating system · Inclusivity',
    chapter4Ref: 'Chapter 4, C.3 (Inclusivity KPIs); Section E (SDGs)',
    informs: ['S6'],
    current: '~42%',
    currentSub: '(2024)',
    gate2028: '48%',
    target2030: '50%',
    target: '50%+ by 2035',
    progress: 84,
    status: 'watch',
    source: 'MOLE / BWC',
    benchmark: 'SDG 5 & 8; BIDP 2025–2035',
  },
  {
    id: 'E-re-share',
    label: 'Renewable Energy Share',
    frame: 'Benchmark · ESG',
    chapter4Ref: 'Chapter 4, Section E (ESG); D.1 Foundations cluster',
    informs: ['P6', 'P7'],
    current: '75.86%',
    currentSub: '(BSEMP baseline; definition to verify)',
    target2030: '82%',
    target: '85%+ by 2035',
    progress: 89,
    status: 'on-track',
    source: 'MENRE BSEMP',
    benchmark: 'BSEMP 2025–2035; TCFD disclosure; SDG 7',
  },
  {
    id: 'E-msme-share',
    label: 'MSME Share of GDP',
    frame: 'Benchmark · PDP',
    chapter4Ref: 'Chapter 4, Section E (Philippine Development Plan)',
    informs: ['S3'],
    current: '~36%',
    currentSub: '(2024 est.)',
    target2030: '38%',
    target: '40% by 2035',
    progress: 90,
    status: 'watch',
    source: 'DTI-MSMED / PSA',
    benchmark: 'PDP 2023–2028 MSME target',
  },
  {
    id: 'E-halal-time',
    label: 'Halal Certification Processing Time',
    frame: 'Benchmark · OIC/SMIIC',
    chapter4Ref: 'Chapter 4, Section E (OIC/SMIIC)',
    informs: ['P3'],
    current: '45–60 days',
    currentSub: '(2024)',
    target2030: '30 days',
    target: '≤21 days by 2035',
    progress: 35,
    status: 'watch',
    source: 'Bangsamoro Halal Board',
    benchmark: 'SMIIC Strategic Plan 2021–2030; BHIDP',
  },
];

// ─── Panel B · Balanced Scorecard Critical Leverage Points ───────────────────
export const BSC_LEVERAGE_POINTS: BSCLeveragePoint[] = [
  // FINANCIAL ─────────────────────────────────────────────────────────────────
  {
    perspective: 'Financial',
    lp: '⭐ LP1 + LP3',
    action: 'Increase FDI & domestic investment inflows',
    kpi: 'Annual Investment Approvals',
    current: '₱5.1B (Jan–Apr 2026)',
    target2030: '₱10B p.a.',
    target: '₱15B p.a. by 2035',
    progress: 34,
    status: 'In Progress',
    statusSub: '34% of 2035 goal',
    color: 'gold',
    bscCode: 'F1',
    strategicInitiative: 'Investment promotion roadshows; BIMP-EAGA missions; investor aftercare services',
  },
  {
    perspective: 'Financial',
    lp: '⭐ LP1 + LP2',
    action: 'Grow Bangsamoro regional economy',
    kpi: 'BARMM GRDP',
    current: '₱266.59B (2025, five provinces)',
    target2030: '₱383B',
    target: '₱550B+ by 2035',
    progress: 48,
    status: 'Building Foundations',
    statusSub: 'BEIE synchronization',
    color: 'gold',
    bscCode: 'F2',
    strategicInitiative: 'BEIE ecosystem synchronization; PPP frameworks; value chain development',
  },
  {
    perspective: 'Financial',
    lp: '⭐ LP1',
    action: 'Expand halal & agro-industrial exports',
    kpi: 'Total Export Value',
    current: '<₱10B',
    target2030: '₱26B',
    target: '₱40B+ by 2035',
    progress: 25,
    status: 'Building Corridors',
    statusSub: 'UAE/GCC focus',
    color: 'blue',
    bscCode: 'F3',
    strategicInitiative: 'UAE halal corridor; BIMP-EAGA trade facilitation; export readiness programs',
  },
  {
    perspective: 'Financial',
    lp: '⭐ LP5',
    action: 'Activate green economy revenue streams',
    kpi: 'Carbon Credit + PES Revenue',
    current: '₱0 (pre-2026)',
    target2030: '₱100M p.a.',
    target: '₱500M p.a. by 2035',
    progress: 0,
    status: 'Policy Pipeline',
    statusSub: 'JMC 2026-01 activation',
    color: 'green',
    bscCode: 'F4',
    strategicInitiative: 'REDD+ program registration; JMC No. 2026-01 implementation; carbon market access',
  },

  // STAKEHOLDER ────────────────────────────────────────────────────────────────
  {
    perspective: 'Stakeholder',
    lp: '⭐ LP1 + LP2',
    action: 'Reduce poverty through investment-led growth',
    kpi: 'Poverty Incidence',
    current: '23.5% (full-year 2023)',
    target2030: '<25% (met on full-year basis; recalibrate)',
    target: '<20% by 2035',
    progress: 89,
    status: 'Progress Made',
    statusSub: '▼ from 52.9% in 2018',
    color: 'teal',
    bscCode: 'S4',
    strategicInitiative: 'MSME-focused investment; livelihood programs; inclusive value chains',
  },
  {
    perspective: 'Stakeholder',
    lp: '⭐ LP3',
    action: 'Enhance investor satisfaction & retention',
    kpi: 'Investor Satisfaction Score (1–10)',
    current: 'Not measured',
    target2030: '7.0/10',
    target: '8.0+/10 by 2035',
    progress: 0,
    status: 'Measuring',
    statusSub: 'BICC activates R2 loop',
    color: 'blue',
    bscCode: 'S1',
    strategicInitiative: 'Aftercare service improvement; investor ombudsman; regulatory stability (BOI-MTIT aftercare protocol)',
  },

  // INTERNAL PROCESS ────────────────────────────────────────────────────────────
  {
    perspective: 'Internal Process',
    lp: '⭐ LP1 Critical',
    action: 'Achieve OIC/SMIIC international accreditation',
    kpi: 'BHB International Accreditation Status',
    current: 'Pending',
    target2030: 'Provisional alignment',
    target: 'Full accreditation + MRA by 2035',
    progress: 20,
    status: 'Q2 2026 operationalisation',
    statusSub: '',
    color: 'gold',
    bscCode: 'P3',
    strategicInitiative: 'BHB capacity building; SMIIC technical assistance; OIC market linkages',
  },
  {
    perspective: 'Stakeholder',
    lp: '⭐ LP2',
    action: 'Achieve full electrification across BARMM',
    kpi: 'Household Electrification (EC areas)',
    current: '~39–40% (EC areas)',
    target2030: 'Proposed',
    target: '90% by 2035 (100% by 2040)',
    progress: 44,
    status: 'Watch',
    statusSub: 'ZBIP key milestone',
    color: 'green',
    bscCode: 'G1-5', // headline KPI (Table G.1), links S7 / F2
    strategicInitiative: 'ZBIP construction; mini-grid solutions; solar energy programs',
  },

  // LEARNING & GROWTH ───────────────────────────────────────────────────────────
  {
    perspective: 'Learning & Growth',
    lp: '⭐ LP1 Enabler',
    action: 'Develop technical halal expertise',
    kpi: 'Halal Certification Officers Trained',
    current: '<50',
    target2030: '70',
    target: '100+ officers by 2035',
    progress: 10,
    status: '50 target for 2026',
    statusSub: '',
    color: 'teal',
    bscCode: 'L1',
    strategicInitiative: 'TESDA-BHB partnership; OIC/SMIIC training programs; international exposure',
  },
  {
    perspective: 'Learning & Growth',
    lp: '⭐ LP1 Enabler',
    action: 'Raise functional literacy and TVET participation',
    kpi: 'Functional Literacy Rate',
    current: '64.7% (2024)',
    target2030: '72%',
    target: '75%+ by 2035',
    progress: 86,
    status: 'TVET Scaling',
    statusSub: 'Industry alignment needed',
    color: 'teal',
    bscCode: 'L5',
    strategicInitiative: 'TESDA-industry alignment; community learning centers; MSME training',
  },
];
