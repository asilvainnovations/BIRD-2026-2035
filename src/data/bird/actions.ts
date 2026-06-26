// ─────────────────────────────────────────────────────────────────────────────
// BIRD 2026–2035 · Priority Action Plan — Foundation Phase (2026–2028)
// Single source of truth for Panel C of the MEL Dashboard.
// Source: BIRD 2026–2035 Chapter 7 — Implementation, Action and Annual Investment Plan
// ─────────────────────────────────────────────────────────────────────────────

export type ActionPriority = 'critical' | 'high' | 'medium';
export type ActionStatus =
  | 'In Progress'
  | 'Drafting'
  | 'Development'
  | 'Not Started'
  | 'Completed'
  | 'On Track';

export interface ActionPlan {
  id: number;
  objective: string;
  desc: string;
  lp: string;                 // Leverage Point reference
  cluster: string;            // BEIE cluster
  action: string;
  actionDesc: string;
  priority: ActionPriority;
  due: string;
  status: ActionStatus;
  budget: string;
  budgetValue: number;        // numeric PHP for aggregation
  lead: string;
  support: string;
  bscCode: string;            // Balanced Scorecard perspective code
  sdgAlignment?: string;      // SDG alignment
}

export const ACTION_PLAN_2026: ActionPlan[] = [
  {
    id: 1,
    objective: 'Halal Certification System Integrity',
    desc: 'Breaking "Fixes that Fail" archetype — shifting from reactive certification to proactive standard-setting',
    lp: 'LP1',
    cluster: 'Transformers: Halal Processing',
    action: 'BHB Operationalisation & OIC/SMIIC Alignment',
    actionDesc:
      'Operationalise Bangsamoro Halal Board with OIC/SMIIC-aligned certification processes. Establish audit protocols, quality management systems, and initial certification of 50 enterprises. Commence roadmap toward full OIC international recognition.',
    priority: 'critical',
    due: 'Q2 2026',
    status: 'In Progress',
    budget: '₱200M',
    budgetValue: 200_000_000,
    lead: 'BHB / MTIT',
    support: 'OIC/SMIIC (Technical Assistance), TESDA',
    bscCode: 'IP2 / LG2',
    sdgAlignment: 'SDG 8, SDG 17',
  },
  {
    id: 2,
    objective: 'Green Economy Revenue Framework',
    desc: 'Monetizing environmental assets and creating LGU revenue streams from carbon credits and PES',
    lp: 'LP5',
    cluster: 'Foundations: Environment',
    action: 'Bangsamoro Forestry Code Enactment & JMC 2026-01 Signing',
    actionDesc:
      'Enact Bangsamoro Forestry Code (currently before ENRE Committee, MP Tawakkal Midtimbang, chair). Sign MENRE-MILG JMC No. 2026-01 establishing Carbon Credit Programs, Payment for Ecosystem Services (PES), and Eco-Tourism User Fees as concrete revenue mechanisms for LGUs and communities.',
    priority: 'critical',
    due: 'Q2 2026',
    status: 'Drafting',
    budget: '₱50M',
    budgetValue: 50_000_000,
    lead: 'MENRE / Parliament',
    support: 'MILG, MENRE-BARMM, LGUs',
    bscCode: 'F4 / IP7',
    sdgAlignment: 'SDG 13, SDG 15, SDG 17',
  },
  {
    id: 3,
    objective: 'Digital Governance & Investor Facilitation',
    desc: 'Activating R2 (Governance-Investor Confidence) feedback loop through digital transformation',
    lp: 'LP3',
    cluster: 'Enablers: Infrastructure',
    action: 'BEGMP Digital Rollout & 1-Day Business Registration',
    actionDesc:
      'Complete deployment of the Bangsamoro e-Governance Master Plan (BEGMP). Achieve 1-day digital business registration via BBOI platform. Deploy BICC (Bangsamoro Investment Command Center) dashboard for real-time investment tracking and investor aftercare.',
    priority: 'high',
    due: 'Q3 2026',
    status: 'Development',
    budget: '₱150M',
    budgetValue: 150_000_000,
    lead: 'BDTA / MICT',
    support: 'BBOI, MTIT, PSA-BARMM',
    bscCode: 'IP4 / S2',
    sdgAlignment: 'SDG 8, SDG 9, SDG 17',
  },
  {
    id: 4,
    objective: 'Halal Industrial Zone Development',
    desc: 'Raising B1 growth ceiling through dedicated halal processing infrastructure',
    lp: 'LP2',
    cluster: 'Transformers: Industry, Manufacturing',
    action: 'Bangsamoro Halal Park Groundbreaking (Matanog, Maguindanao del Norte)',
    actionDesc:
      'Groundbreaking of Bangsamoro Halal Park at Matanog site, Maguindanao del Norte. Master-planned site development with utility infrastructure. Anchor tenant pre-qualification commenced. Target: 20+ tenants operational by 2028, ₱2B+ investments committed.',
    priority: 'critical',
    due: 'Q4 2026',
    status: 'Development',
    budget: '₱500M',
    budgetValue: 500_000_000,
    lead: 'MTIT / BBOI',
    support: 'BEZA, SPDA, MPW',
    bscCode: 'F1 / IP1',
    sdgAlignment: 'SDG 8, SDG 9',
  },
  {
    id: 5,
    objective: 'Energy Infrastructure Nexus',
    desc: 'Raising the B1 growth ceiling — energy as investment prerequisite',
    lp: 'LP2',
    cluster: 'Foundations: Energy',
    action: 'ZBIP Construction Commencement & Solar Mini-Grid Deployment',
    actionDesc:
      'Commence ₱6.67B Zamboanga-Basilan Interconnection Project (ZBIP) to expand Mindanao grid to Basilan. Simultaneously deploy solar mini-grid systems for remote island communities in Tawi-Tawi and Sulu (25–30% without access). Target: 80% electrification across BARMM by 2028.',
    priority: 'critical',
    due: 'Q2 2026 (commence)',
    status: 'In Progress',
    budget: '₱6,670M',
    budgetValue: 6_670_000_000,
    lead: 'DOE / MPW',
    support: 'MENRE-BARMM, NEA, LGUs',
    bscCode: 'IP5 / LG3',
    sdgAlignment: 'SDG 7, SDG 9',
  },
  {
    id: 6,
    objective: 'Islamic Finance Ecosystem Development',
    desc: 'Expanding Shariah-compliant financing to unlock halal MSME investment',
    lp: 'LP4',
    cluster: 'Financiers: Islamic Banking',
    action: 'Al-Amanah Islamic Bank Expansion & Islamic Finance Literacy Program',
    actionDesc:
      'Expand Al-Amanah Islamic Investment Bank presence to all 7 BARMM provincial capitals. Launch Islamic finance literacy program for 10,000 MSMEs. Pilot Islamic fintech platform for MSME financing. Partner with IsDB and BSP to operationalise takaful (Islamic insurance) products.',
    priority: 'high',
    due: 'Q4 2026',
    status: 'Not Started',
    budget: '₱300M',
    budgetValue: 300_000_000,
    lead: 'MFBM / Al-Amanah',
    support: 'BSP, IsDB, MTIT-ETD',
    bscCode: 'F5 / LG4',
    sdgAlignment: 'SDG 8, SDG 10, SDG 17',
  },
  {
    id: 7,
    objective: 'BIMP-EAGA Trade & Tourism Integration',
    desc: 'Positioning BARMM as BIMP-EAGA connector and halal tourism destination',
    lp: 'LP1 + LP3',
    cluster: 'Connectors: Tourism, Trade, BIMP-EAGA',
    action: 'BIMP-EAGA Investment Mission & Halal Tourism Circuit Launch',
    actionDesc:
      'Lead BARMM delegation to BIMP-EAGA EGL Sub-Committee meetings. Launch Bangsamoro Halal Tourism Circuit linking Maranao heritage sites, Yakan cultural centers, Tawi-Tawi marine sanctuaries, and Basilan eco-parks. Target: 500,000 domestic + regional tourists by 2028.',
    priority: 'high',
    due: 'Q3 2026',
    status: 'Development',
    budget: '₱200M',
    budgetValue: 200_000_000,
    lead: 'MTIT-BTI',
    support: 'BIMP-EAGA Secretariat, DOT, LGUs',
    bscCode: 'F3 / S3',
    sdgAlignment: 'SDG 8, SDG 11, SDG 17',
  },
  {
    id: 8,
    objective: 'Agricultural Value Chain Upgrading',
    desc: 'Breaking commodity-export trap; shifting to halal-certified, value-added processing',
    lp: 'LP1 + LP5',
    cluster: 'Foundations: Agriculture, Fisheries',
    action: 'Integrated Agro-Industrial Corridor Development & Post-Harvest Facilities',
    actionDesc:
      'Develop integrated agro-industrial corridors co-managed by MAFAR, SPDA, MTIT, MPW, and MENRE. Establish cold chain logistics hubs in Cotabato City, Marawi, and Bongao. Deploy post-harvest facilities to reduce 20–40% post-harvest losses. Target: 30% reduction in post-harvest losses by 2028.',
    priority: 'high',
    due: 'Q4 2026',
    status: 'Development',
    budget: '₱800M',
    budgetValue: 800_000_000,
    lead: 'MAFAR / SPDA',
    support: 'MTIT, MPW, MENRE, DA',
    bscCode: 'F2 / IP1',
    sdgAlignment: 'SDG 2, SDG 8, SDG 12',
  },
  {
    id: 9,
    objective: 'Human Capital & TVET-Industry Alignment',
    desc: 'Addressing L&G perspective gap — skills supply to match investment demand',
    lp: 'LP2',
    cluster: 'Enablers: Social Services',
    action: 'TESDA-Industry Alignment Program & BHB Halal Officer Training',
    actionDesc:
      'Align TESDA curriculum with halal industry, agro-industrial, and digital economy demand. Train 50 BHB halal certification officers in 2026 (100+ by 2035). Establish community learning centers in underserved municipalities. Launch BARMM Inclusive Development Plan (BIDP) livelihood programs.',
    priority: 'high',
    due: 'Q3 2026',
    status: 'Development',
    budget: '₱250M',
    budgetValue: 250_000_000,
    lead: 'TESDA / MOLE',
    support: 'BHB, MTIT, DepEd-BARMM',
    bscCode: 'LG1 / LG2',
    sdgAlignment: 'SDG 4, SDG 8',
  },
  {
    id: 10,
    objective: 'Monitoring, Evaluation & Learning Infrastructure',
    desc: 'Institutionalizing adaptive management through real-time data systems',
    lp: 'LP3',
    cluster: 'Cross-Cutting: Moral Governance',
    action: 'BICC & MEL Dashboard Deployment',
    actionDesc:
      'Establish the Bangsamoro Investment Command Center (BICC) as central coordination hub for investment facilitation, monitoring, and adaptive management. Deploy MEL (Monitoring, Evaluation, and Learning) dashboard integrating PSA-BARMM databases, BHB certification logs, and BBOI approval tracking for real-time KPI visualization.',
    priority: 'high',
    due: 'Q3 2026',
    status: 'Development',
    budget: '₱80M',
    budgetValue: 80_000_000,
    lead: 'MTIT / BBOI',
    support: 'BDTA, PSA-BARMM, MFBM',
    bscCode: 'IP4 / S2',
    sdgAlignment: 'SDG 16, SDG 17',
  },
];

// ─── Summary Aggregates ────────────────────────────────────────────────────
export const ACTION_SUMMARY = {
  totalActions: ACTION_PLAN_2026.length,
  criticalActions: ACTION_PLAN_2026.filter((a) => a.priority === 'critical').length,
  highActions:     ACTION_PLAN_2026.filter((a) => a.priority === 'high').length,
  mediumActions:   ACTION_PLAN_2026.filter((a) => a.priority === 'medium').length,
  inProgress:      ACTION_PLAN_2026.filter((a) => a.status === 'In Progress').length,
  totalBudget:     ACTION_PLAN_2026.reduce((s, a) => s + a.budgetValue, 0),
  totalBudgetLabel: '₱9.2B', // Foundation Phase Year-1 priority budget allocation
  q1Priorities:    ACTION_PLAN_2026.filter((a) => a.due.includes('Q1')).length,
  q2Priorities:    ACTION_PLAN_2026.filter((a) => a.due.includes('Q2')).length,
  q3Priorities:    ACTION_PLAN_2026.filter((a) => a.due.includes('Q3')).length,
  q4Priorities:    ACTION_PLAN_2026.filter((a) => a.due.includes('Q4')).length,
};
