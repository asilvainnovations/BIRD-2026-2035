// ─────────────────────────────────────────────────────────────────────────────
// BIRD 2026–2035 · Survey-Scored SWOT Register (Chapter 3-A)
// AUTO-GENERATED — do not hand-edit. Regenerate from the BIRD data pipeline.
//
// EVIDENCE BASE
//   • Validation Survey  — 76 consented responses, 3–20 Aug 2026 (Supabase
//     `survey_responses`, project BIRD_2026-2035). Item n = 63–74.
//   • Workshop Outputs   — Workshops 1, 2, 4, 5 (MTIT-BARMM, 2025), 388 tidy
//     records across 6 sectors.
//   • Secondary Data     — Provincial Economic & Investment Outlooks (Basilan,
//     Lanao del Sur, Maguindanao del Norte/Sur, Tawi-Tawi); PSA/MFBM 2023–2025.
//
// SAMPLING CAVEAT: the survey is a non-probability convenience sample. Scores
// are stakeholder validation signals, NOT population estimates. Basilan, Sulu
// and Tawi-Tawi returned zero respondents — treat island-province readings as
// unvalidated. Generated 2026-08-22.
// ─────────────────────────────────────────────────────────────────────────────

import type { SWOTItem } from '@/lib/strategicPlanStore';

/** Per-item respondent counts and dispersion, keyed by survey field id. */
export const SWOT_EVIDENCE: Record<string, { n: number; field: string; section: number; metric: number }> = {
  'bird-q4-s1-aff-base': { n: 72, field: 'q4_s1_aff_base', section: 4, metric: 3.61 },
  'bird-q4-s2-renewable-energy': { n: 66, field: 'q4_s2_renewable_energy', section: 4, metric: 3.08 },
  'bird-q4-s3-lake-lanao': { n: 72, field: 'q4_s3_lake_lanao', section: 4, metric: 3.1 },
  'bird-q4-s4-seaweed-dominance': { n: 66, field: 'q4_s4_seaweed_dominance', section: 4, metric: 3.66 },
  'bird-q4-w1-land-tenure': { n: 65, field: 'q4_w1_land_tenure', section: 4, metric: 15.31 },
  'bird-q4-o1-renewable-invest': { n: 64, field: 'q4_o1_renewable_invest', section: 4, metric: 4.14 },
  'bird-q4-o2-carbon-markets': { n: 65, field: 'q4_o2_carbon_markets', section: 4, metric: 3.68 },
  'bird-q4-o3-pes': { n: 66, field: 'q4_o3_pes', section: 4, metric: 3.99 },
  'bird-q4-o4-forestry-code': { n: 70, field: 'q4_o4_forestry_code', section: 4, metric: 3.97 },
  'bird-q4-t1-pestalotiopsis': { n: 70, field: 'q4_t1_pestalotiopsis', section: 4, metric: 2.3 },
  'bird-q5-s1-halal-legitimacy': { n: 69, field: 'q5_s1_halal_legitimacy', section: 5, metric: 3.19 },
  'bird-q5-s2-domestic-demand': { n: 69, field: 'q5_s2_domestic_demand', section: 5, metric: 3.28 },
  'bird-q5-s3-polloc-freeport': { n: 69, field: 'q5_s3_polloc_freeport', section: 5, metric: 3.31 },
  'bird-q5-s4-cultural-heritage': { n: 69, field: 'q5_s4_cultural_heritage', section: 5, metric: 3.49 },
  'bird-q5-w1-halal-cert': { n: 69, field: 'q5_w1_halal_cert', section: 5, metric: 15.15 },
  'bird-q5-w2-cold-chain': { n: 65, field: 'q5_w2_cold_chain', section: 5, metric: 15.92 },
  'bird-q5-w3-market-linkages': { n: 63, field: 'q5_w3_market_linkages', section: 5, metric: 15.81 },
  'bird-q5-t1-standards-recognition': { n: 67, field: 'q5_t1_standards_recognition', section: 5, metric: 2.47 },
  'bird-q6-s1-youth-pop': { n: 74, field: 'q6_s1_youth_pop', section: 6, metric: 3.29 },
  'bird-q6-s2-lanao-growth': { n: 74, field: 'q6_s2_lanao_growth', section: 6, metric: 3.02 },
  'bird-q6-w1-infra-deficits': { n: 74, field: 'q6_w1_infra_deficits', section: 6, metric: 16.91 },
  'bird-q6-w2-poverty': { n: 74, field: 'q6_w2_poverty', section: 6, metric: 16.48 },
  'bird-q6-w3-literacy': { n: 74, field: 'q6_w3_literacy', section: 6, metric: 17.76 },
  'bird-q6-w4-malnutrition': { n: 74, field: 'q6_w4_malnutrition', section: 6, metric: 17.25 },
  'bird-q6-w5-skills-mismatch': { n: 74, field: 'q6_w5_skills_mismatch', section: 6, metric: 16.43 },
  'bird-q6-w6-tech-adoption': { n: 74, field: 'q6_w6_tech_adoption', section: 6, metric: 16.05 },
  'bird-q6-w7-fragmented-data': { n: 73, field: 'q6_w7_fragmented_data', section: 6, metric: 14.98 },
  'bird-q6-o1-tourism-recovery': { n: 72, field: 'q6_o1_tourism_recovery', section: 6, metric: 3.92 },
  'bird-q6-o2-digital-leapfrog': { n: 72, field: 'q6_o2_digital_leapfrog', section: 6, metric: 4.11 },
  'bird-q6-t1-cyber-insecurity': { n: 72, field: 'q6_t1_cyber_insecurity', section: 6, metric: 2.56 },
  'bird-q6-t2-infra-cost-overruns': { n: 72, field: 'q6_t2_infra_cost_overruns', section: 6, metric: 2.86 },
  'bird-q7-s1-bimpeaga-location': { n: 72, field: 'q7_s1_bimpeaga_location', section: 7, metric: 3.4 },
  'bird-q7-o1-global-halal': { n: 72, field: 'q7_o1_global_halal', section: 7, metric: 4.14 },
  'bird-q7-o2-asean-halal': { n: 72, field: 'q7_o2_asean_halal', section: 7, metric: 4.06 },
  'bird-q7-o3-bimpeaga-integration': { n: 72, field: 'q7_o3_bimpeaga_integration', section: 7, metric: 4.08 },
  'bird-q7-o4-uae-corridor': { n: 72, field: 'q7_o4_uae_corridor', section: 7, metric: 3.92 },
  'bird-q7-o5-landbridge': { n: 72, field: 'q7_o5_landbridge', section: 7, metric: 4.02 },
  'bird-q7-t1-halal-competition': { n: 72, field: 'q7_t1_halal_competition', section: 7, metric: 2.64 },
  'bird-q7-t2-economic-downturn': { n: 72, field: 'q7_t2_economic_downturn', section: 7, metric: 2.63 },
  'bird-q7-t3-price-volatility': { n: 72, field: 'q7_t3_price_volatility', section: 7, metric: 2.89 },
  'bird-q8-s1-islamic-finance-framework': { n: 68, field: 'q8_s1_islamic_finance_framework', section: 8, metric: 3.16 },
  'bird-q8-w1-financial-penetration': { n: 68, field: 'q8_w1_financial_penetration', section: 8, metric: 15.19 },
  'bird-q8-o1-islamic-ecosystem': { n: 68, field: 'q8_o1_islamic_ecosystem', section: 8, metric: 4.0 },
  'bird-q9-s1-policy-recognition': { n: 73, field: 'q9_s1_policy_recognition', section: 9, metric: 3.34 },
  'bird-q9-s2-peace-dividend': { n: 73, field: 'q9_s2_peace_dividend', section: 9, metric: 3.41 },
  'bird-q9-w1-fragmented-policy': { n: 70, field: 'q9_w1_fragmented_policy', section: 9, metric: 15.02 },
  'bird-q9-w2-underspending': { n: 71, field: 'q9_w2_underspending', section: 9, metric: 16.34 },
  'bird-q9-o1-postconflict': { n: 72, field: 'q9_o1_postconflict', section: 9, metric: 3.9 },
  'bird-q9-o2-climate-adaptation-finance': { n: 72, field: 'q9_o2_climate_adaptation_finance', section: 9, metric: 4.04 },
  'bird-q9-t1-climate-change': { n: 72, field: 'q9_t1_climate_change', section: 9, metric: 2.9 },
  'bird-q9-t2-drifting-goals': { n: 70, field: 'q9_t2_drifting_goals', section: 9, metric: 2.79 },
  'bird-q9-t3-security-incidents': { n: 72, field: 'q9_t3_security_incidents', section: 9, metric: 2.94 },
  'bird-q9-t4-political-transition': { n: 72, field: 'q9_t4_political_transition', section: 9, metric: 2.6 },
  'bird-q9-t5-natl-coordination': { n: 72, field: 'q9_t5_natl_coordination', section: 9, metric: 2.6 },
  'bird-q9-t6-fragmented-mandates': { n: 72, field: 'q9_t6_fragmented_mandates', section: 9, metric: 2.38 },
};

export const BIRD_SWOT_ITEMS: SWOTItem[] = [
  {
    id: 'bird-q4-s1-aff-base',
    category: 'strength',
    description: 'Strong AFF Base — BARMM has strong resources in rubber, coconut, seaweed, fisheries, halal farm products, and rice.',
    impactScore: 4.38,      // survey mean, n=72
    likelihoodScore: 4.13,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP5',
    beieCluster: 'foundations',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q4-s2-renewable-energy',
    category: 'strength',
    description: 'Renewable Energy Endowments — BARMM has untapped hydro (Lake Lanao), solar, and biomass energy potential.',
    impactScore: 4.0,      // survey mean, n=66
    likelihoodScore: 3.84,  // survey mean, n=66
    aiGenerated: false,
    leveragePoint: 'LP5',
    beieCluster: 'foundations',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q4-s3-lake-lanao',
    category: 'strength',
    description: 'Lake Lanao — Multi-purpose resource for freshwater supply, hydroelectric power, and eco-tourism opportunities in Lanao del Sur.',
    impactScore: 3.94,      // survey mean, n=72
    likelihoodScore: 3.93,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP5',
    beieCluster: 'foundations',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q4-s4-seaweed-dominance',
    category: 'strength',
    description: 'Tawi-Tawi\'s Global Seaweed Dominance — Tawi-Tawi produces 40% of the Philippines\' seaweed output, providing a massive, ready-made resource base for industrial carrageenan processing.',
    impactScore: 4.36,      // survey mean, n=66
    likelihoodScore: 4.19,  // survey mean, n=66
    aiGenerated: false,
    leveragePoint: 'LP5',
    beieCluster: 'foundations',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q4-w1-land-tenure',
    category: 'weakness',
    description: 'Complex Land Tenure (SGA) — The Special Geographic Area faces a difficult overlay of Ancestral Domain (CADT), private titles, and public land, creating friction for large-scale agro-industrial parks.',
    impactScore: 3.95,      // survey mean, n=65
    likelihoodScore: 3.87,  // survey mean, n=65
    aiGenerated: false,
    leveragePoint: 'LP5',
    beieCluster: 'foundations',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q4-o1-renewable-invest',
    category: 'opportunity',
    description: 'Renewable Energy Investments — Growing interest in solar farms, hydro rehabilitation, and biomass projects aligning with BARMM\'s clean energy potential.',
    impactScore: 4.16,      // survey mean, n=64
    likelihoodScore: 4.13,  // survey mean, n=64
    aiGenerated: false,
    leveragePoint: 'LP5',
    beieCluster: 'foundations',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q4-o2-carbon-markets',
    category: 'opportunity',
    description: 'Carbon Markets & REDD+ — BARMM\'s forests and carbon stocks can be monetized through carbon credits, creating new revenue for communities and LGUs.',
    impactScore: 3.77,      // survey mean, n=65
    likelihoodScore: 3.59,  // survey mean, n=65
    aiGenerated: false,
    leveragePoint: 'LP5',
    beieCluster: 'foundations',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q4-o3-pes',
    category: 'opportunity',
    description: 'Payment for Ecosystem Services (PES) — LGUs can earn income by protecting watersheds, coastlines, and mangroves — turning conservation into a revenue source.',
    impactScore: 4.09,      // survey mean, n=66
    likelihoodScore: 3.89,  // survey mean, n=66
    aiGenerated: false,
    leveragePoint: 'LP5',
    beieCluster: 'foundations',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q4-o4-forestry-code',
    category: 'opportunity',
    description: 'Bangsamoro Forestry Code — Pending legislation could open sustainable timber, non-timber forest products (NTFPs), and forest nursery investments.',
    impactScore: 4.0,      // survey mean, n=70
    likelihoodScore: 3.94,  // survey mean, n=70
    aiGenerated: false,
    leveragePoint: 'LP5',
    beieCluster: 'foundations',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q4-t1-pestalotiopsis',
    category: 'threat',
    description: 'Rubber Pestalotiopsis Disease — A fungal disease is attacking rubber plantations in Basilan and could spread to other rubber-producing areas, threatening farmer livelihoods.',
    impactScore: 3.89,      // survey mean, n=70
    likelihoodScore: 3.81,  // survey mean, n=70
    aiGenerated: false,
    leveragePoint: 'LP5',
    beieCluster: 'foundations',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q5-s1-halal-legitimacy',
    category: 'strength',
    description: 'Halal Legitimacy & Cultural Credibility — Authentic Muslim-majority identity providing unmatched authenticity for halal branding.',
    impactScore: 4.01,      // survey mean, n=69
    likelihoodScore: 3.97,  // survey mean, n=69
    aiGenerated: false,
    leveragePoint: 'LP1',
    beieCluster: 'transformers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q5-s2-domestic-demand',
    category: 'strength',
    description: 'Domestic Halal Demand — 5.69M Muslim consumer base driving local market absorption.',
    impactScore: 4.07,      // survey mean, n=69
    likelihoodScore: 4.03,  // survey mean, n=69
    aiGenerated: false,
    leveragePoint: 'LP1',
    beieCluster: 'transformers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q5-s3-polloc-freeport',
    category: 'strength',
    description: 'Polloc Freeport & Economic Zone — Strategic logistics hub and trade gateway in Maguindanao del Norte.',
    impactScore: 4.22,      // survey mean, n=69
    likelihoodScore: 3.93,  // survey mean, n=69
    aiGenerated: false,
    leveragePoint: 'LP1',
    beieCluster: 'transformers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q5-s4-cultural-heritage',
    category: 'strength',
    description: 'Rich Cultural Heritage — Maranao, Yakan, and Tausug heritage as assets for creative/tourism industries.',
    impactScore: 4.23,      // survey mean, n=69
    likelihoodScore: 4.13,  // survey mean, n=69
    aiGenerated: false,
    leveragePoint: 'LP1',
    beieCluster: 'transformers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q5-w1-halal-cert',
    category: 'weakness',
    description: 'Weak Halal Certification System — Resource-constrained BHB with limited international recognition.',
    impactScore: 3.96,      // survey mean, n=69
    likelihoodScore: 3.83,  // survey mean, n=69
    aiGenerated: false,
    leveragePoint: 'LP1',
    beieCluster: 'transformers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q5-w2-cold-chain',
    category: 'weakness',
    description: 'Limited Agro-Processing/Cold Chain — High post-harvest losses (20–40%) constraining value addition.',
    impactScore: 4.15,      // survey mean, n=65
    likelihoodScore: 3.83,  // survey mean, n=65
    aiGenerated: false,
    leveragePoint: 'LP1',
    beieCluster: 'transformers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q5-w3-market-linkages',
    category: 'weakness',
    description: 'Weak Market Linkages — Limited access to buyers and price information for producers.',
    impactScore: 4.06,      // survey mean, n=63
    likelihoodScore: 3.89,  // survey mean, n=63
    aiGenerated: false,
    leveragePoint: 'LP1',
    beieCluster: 'transformers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q5-t1-standards-recognition',
    category: 'threat',
    description: 'Standards Recognition Risk — BARMM certifications not yet aligned with OIC/SMIIC international standards.',
    impactScore: 3.97,      // survey mean, n=67
    likelihoodScore: 3.92,  // survey mean, n=67
    aiGenerated: false,
    leveragePoint: 'LP1',
    beieCluster: 'transformers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-s1-youth-pop',
    category: 'strength',
    description: 'Young, Growing Population — Demographic dividend with 3.43% annual growth (highest in PH).',
    impactScore: 4.11,      // survey mean, n=74
    likelihoodScore: 4.0,  // survey mean, n=74
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-s2-lanao-growth',
    category: 'strength',
    description: 'Lanao del Sur\'s Growth Momentum — Currently BARMM\'s fastest-growing provincial economy (5.02% in 2023).',
    impactScore: 3.93,      // survey mean, n=74
    likelihoodScore: 3.84,  // survey mean, n=74
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-w1-infra-deficits',
    category: 'weakness',
    description: 'Critical Infrastructure Deficits — Energy, transport, digital, and water gaps.',
    impactScore: 4.26,      // survey mean, n=74
    likelihoodScore: 3.97,  // survey mean, n=74
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-w2-poverty',
    category: 'weakness',
    description: 'Highest Poverty Incidence — 34.8% limiting domestic market depth and purchasing power.',
    impactScore: 4.15,      // survey mean, n=74
    likelihoodScore: 3.97,  // survey mean, n=74
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-w3-literacy',
    category: 'weakness',
    description: 'Lowest Functional Literacy Rate — 59.3%, creating a severe human capital constraint.',
    impactScore: 4.31,      // survey mean, n=74
    likelihoodScore: 4.12,  // survey mean, n=74
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-w4-malnutrition',
    category: 'weakness',
    description: 'Severe Child Malnutrition — 45% stunting rate among children under five.',
    impactScore: 4.28,      // survey mean, n=74
    likelihoodScore: 4.03,  // survey mean, n=74
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-w5-skills-mismatch',
    category: 'weakness',
    description: 'Skills Mismatch — TVIs not fully aligned with emerging industry needs (e.g., halal manufacturing).',
    impactScore: 4.15,      // survey mean, n=74
    likelihoodScore: 3.96,  // survey mean, n=74
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-w6-tech-adoption',
    category: 'weakness',
    description: 'Low Technology Adoption — Slow uptake of modern farming and processing technologies.',
    impactScore: 4.05,      // survey mean, n=74
    likelihoodScore: 3.96,  // survey mean, n=74
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-w7-fragmented-data',
    category: 'weakness',
    description: 'Fragmented Data Systems — Agencies often use incompatible databases, leading to a siloed view that causes delayed procurement and slow certification cycles.',
    impactScore: 3.92,      // survey mean, n=73
    likelihoodScore: 3.82,  // survey mean, n=73
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-o1-tourism-recovery',
    category: 'opportunity',
    description: 'Tourism Recovery — Isabela City Tourism Champion (2024) and Lake Lanao eco-tourism potential.',
    impactScore: 3.92,      // survey mean, n=72
    likelihoodScore: 3.93,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-o2-digital-leapfrog',
    category: 'opportunity',
    description: 'Digital Leapfrogging (BIFOSS) — Implementing the Bangsamoro Investment Facilitation One-Stop Shop for 1-day business registration.',
    impactScore: 4.17,      // survey mean, n=72
    likelihoodScore: 4.05,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-t1-cyber-insecurity',
    category: 'threat',
    description: 'Cyber Insecurity & AI Risks — Emerging threats from misinformation, cyberattacks, and adverse AI outcomes disrupting digital governance.',
    impactScore: 4.07,      // survey mean, n=72
    likelihoodScore: 3.86,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q6-t2-infra-cost-overruns',
    category: 'threat',
    description: 'Infrastructure Cost Overruns — Delays and budget escalations in critical infrastructure projects can discourage investors and slow the build-out of roads, power, and ports.',
    impactScore: 4.28,      // survey mean, n=72
    likelihoodScore: 3.9,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'enablers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q7-s1-bimpeaga-location',
    category: 'strength',
    description: 'Strategic Location (BIMP-EAGA) — Proximity to Sabah and ASEAN trade corridors.',
    impactScore: 4.19,      // survey mean, n=72
    likelihoodScore: 4.05,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'connectors',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q7-o1-global-halal',
    category: 'opportunity',
    description: 'Global Halal Market — USD 2.3 trillion market with growing demand.',
    impactScore: 4.19,      // survey mean, n=72
    likelihoodScore: 4.08,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'connectors',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q7-o2-asean-halal',
    category: 'opportunity',
    description: 'ASEAN Halal Economy — USD 1.38 trillion addressable market; target to capture 30% share.',
    impactScore: 4.18,      // survey mean, n=72
    likelihoodScore: 3.94,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'connectors',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q7-o3-bimpeaga-integration',
    category: 'opportunity',
    description: 'BIMP-EAGA Regional Integration — Cross-border trade facilitation and eco-corridors.',
    impactScore: 4.12,      // survey mean, n=72
    likelihoodScore: 4.04,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'connectors',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q7-o4-uae-corridor',
    category: 'opportunity',
    description: 'UAE/GCC Halal Export Corridor — MAFAR-Prime Group partnership opening Middle Eastern markets.',
    impactScore: 4.08,      // survey mean, n=72
    likelihoodScore: 3.77,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'connectors',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q7-o5-landbridge',
    category: 'opportunity',
    description: 'Mindanao Central Logistics Land-Bridge — SGA serves as the primary land bridge connecting Polloc Freeport to General Santos and Davao export gateways.',
    impactScore: 4.11,      // survey mean, n=72
    likelihoodScore: 3.93,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'connectors',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q7-t1-halal-competition',
    category: 'threat',
    description: 'Competition from Halal Hubs — Malaysia, Indonesia, and Thailand holding established market share.',
    impactScore: 4.11,      // survey mean, n=72
    likelihoodScore: 3.9,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'connectors',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q7-t2-economic-downturn',
    category: 'threat',
    description: 'Global Economic Downturn — Perceived as a top global risk, weakening demand for BARMM\'s key exports like Halal and rubber.',
    impactScore: 4.08,      // survey mean, n=72
    likelihoodScore: 3.94,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'connectors',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q7-t3-price-volatility',
    category: 'threat',
    description: 'Market Price Volatility — Global commodity fluctuations for rubber, coconut, and seaweed.',
    impactScore: 4.21,      // survey mean, n=72
    likelihoodScore: 4.09,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP2',
    beieCluster: 'connectors',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q8-s1-islamic-finance-framework',
    category: 'strength',
    description: 'Islamic Finance Legal Framework — RA 11439 enabling Shariah-compliant capital mobilization.',
    impactScore: 4.01,      // survey mean, n=68
    likelihoodScore: 3.94,  // survey mean, n=68
    aiGenerated: false,
    leveragePoint: 'LP4',
    beieCluster: 'financiers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q8-w1-financial-penetration',
    category: 'weakness',
    description: 'Minimal Formal Financial Penetration — Capital access barriers for MSMEs, especially in rural/island areas.',
    impactScore: 3.94,      // survey mean, n=68
    likelihoodScore: 3.85,  // survey mean, n=68
    aiGenerated: false,
    leveragePoint: 'LP4',
    beieCluster: 'financiers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q8-o1-islamic-ecosystem',
    category: 'opportunity',
    description: 'Islamic Finance Ecosystem — Growing global Shariah-compliant capital pool seeking ethical investments.',
    impactScore: 4.04,      // survey mean, n=68
    likelihoodScore: 3.96,  // survey mean, n=68
    aiGenerated: false,
    leveragePoint: 'LP4',
    beieCluster: 'financiers',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q9-s1-policy-recognition',
    category: 'strength',
    description: 'Growing Policy Recognition — Institutional mandates via BOL, BIC, SIPP, and BHIDP.',
    impactScore: 4.18,      // survey mean, n=73
    likelihoodScore: 4.0,  // survey mean, n=73
    aiGenerated: false,
    leveragePoint: 'LP3',
    beieCluster: 'cross-cutting',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q9-s2-peace-dividend',
    category: 'strength',
    description: 'Peace Dividend Momentum — Basilan ASG-free declaration (2024) and stabilized security in select zones.',
    impactScore: 4.25,      // survey mean, n=73
    likelihoodScore: 4.01,  // survey mean, n=73
    aiGenerated: false,
    leveragePoint: 'LP3',
    beieCluster: 'cross-cutting',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q9-w1-fragmented-policy',
    category: 'weakness',
    description: 'Fragmented Policy Frameworks — Governance coordination gaps and underspending in budget execution.',
    impactScore: 3.93,      // survey mean, n=70
    likelihoodScore: 3.82,  // survey mean, n=70
    aiGenerated: false,
    leveragePoint: 'LP3',
    beieCluster: 'cross-cutting',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q9-w2-underspending',
    category: 'weakness',
    description: 'Underspending in Budget Execution — Delays in development program rollout; absorptive capacity challenge. (Moved here from Enablers — official BEIE Attribution is OS: Moral Governance, not Enablers.)',
    impactScore: 4.06,      // survey mean, n=71
    likelihoodScore: 4.03,  // survey mean, n=71
    aiGenerated: false,
    leveragePoint: 'LP3',
    beieCluster: 'cross-cutting',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q9-o1-postconflict',
    category: 'opportunity',
    description: 'Post-Conflict Reconstruction — Marawi MAA commercial redevelopment and normalization.',
    impactScore: 3.93,      // survey mean, n=72
    likelihoodScore: 3.86,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP3',
    beieCluster: 'cross-cutting',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q9-o2-climate-adaptation-finance',
    category: 'opportunity',
    description: 'Climate Adaptation Finance — Tawi-Tawi can leverage a $10 million Adaptation Fund synergy to boost the climate resiliency of coastal communities.',
    impactScore: 4.15,      // survey mean, n=72
    likelihoodScore: 3.93,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP3',
    beieCluster: 'cross-cutting',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q9-t1-climate-change',
    category: 'threat',
    description: 'Climate Change Vulnerabilities — El Niño, flooding, and shifting rainfall patterns (4.2% AFF contraction in 2024).',
    impactScore: 4.25,      // survey mean, n=72
    likelihoodScore: 4.01,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP3',
    beieCluster: 'cross-cutting',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q9-t2-drifting-goals',
    category: 'threat',
    description: '"Drifting Goals" Syndrome — Political/institutional pressure leading to lowering standards rather than fixing root infrastructure problems.',
    impactScore: 4.13,      // survey mean, n=70
    likelihoodScore: 4.08,  // survey mean, n=70
    aiGenerated: false,
    leveragePoint: 'LP3',
    beieCluster: 'cross-cutting',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q9-t3-security-incidents',
    category: 'threat',
    description: 'Residual Security Incidents — Rido, remnant armed groups, and investor perception risks.',
    impactScore: 4.22,      // survey mean, n=72
    likelihoodScore: 4.12,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP3',
    beieCluster: 'cross-cutting',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q9-t4-political-transition',
    category: 'threat',
    description: 'Political Transition Uncertainties — First parliamentary elections and governance continuity risks.',
    impactScore: 4.04,      // survey mean, n=72
    likelihoodScore: 3.99,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP3',
    beieCluster: 'cross-cutting',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q9-t5-natl-coordination',
    category: 'threat',
    description: 'Limited National Coordination — Gaps in BARMM-specific infrastructure funding from the national government.',
    impactScore: 4.08,      // survey mean, n=72
    likelihoodScore: 3.9,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP3',
    beieCluster: 'cross-cutting',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
  {
    id: 'bird-q9-t6-fragmented-mandates',
    category: 'threat',
    description: 'Risk of Fragmented Mandates — Islamic banking, halal certification, and trade agencies operating in silos.',
    impactScore: 4.0,      // survey mean, n=72
    likelihoodScore: 3.71,  // survey mean, n=72
    aiGenerated: false,
    leveragePoint: 'LP3',
    beieCluster: 'cross-cutting',
    createdByName: 'BIRD Validation Survey (n=76)',
    createdAt: '2026-08-20T00:00:00Z',
  },
];
