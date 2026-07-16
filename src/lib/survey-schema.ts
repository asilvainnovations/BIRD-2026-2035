// src/lib/survey-schema.ts
// BIRD 2026–2035 · Validation Survey Zod Schema
// Updated: 2026-07-16 — Sections 0–5 rebuilt with new content, SWOT scales, archetypes

import { z } from "zod";

// ── Reusable field validators ───────────────────────────────────────────────
const requiredString = z.string().min(1, "This field is required");
const optionalString = z.string().optional();
const requiredNumber = z.number().min(1, "Required").max(5, "Max 5");
const optionalNumber = z.number().min(1).max(5).optional();
const requiredBoolean = z.boolean();
const requiredArray = <T extends z.ZodTypeAny>(schema: T) => z.array(schema).min(1, "Select at least one option");

// ── IEDS Matrix sub-schema ──────────────────────────────────────────────────
const matrixRowSchema = z.object({
  economic_impact: z.number().min(0).max(10).default(5),
  feasibility: z.number().min(0).max(10).default(5),
  identity_alignment: z.number().min(0).max(10).default(5),
  systems_leverage: z.number().min(0).max(10).default(5),
  risk_return: z.number().min(0).max(10).default(5),
  inclusivity: z.number().min(0).max(10).default(5),
  sustainability: z.number().min(0).max(10).default(5),
});

const iedsMatrixSchema = z.object({
  heds: matrixRowSchema,
  gems: matrixRowSchema,
  ifes: matrixRowSchema,
  ieds: matrixRowSchema,
});

// ── Conditional rules type ──────────────────────────────────────────────────
export type ConditionalRules = Record<string, (values: Record<string, unknown>) => boolean>;

export const conditionalRules: ConditionalRules = {
  showTragedyFollowup: (v) => v.q_s4_tragedy_commons === "Very accurately" || v.q_s4_tragedy_commons === "Somewhat accurately",
  showFixesFollowup: (v) => v.q_s5_fixes_fail === "Very accurately" || v.q_s5_fixes_fail === "Somewhat accurately",
  showSuccessfulFollowup: (v) => v.q_s5_successful === "Very accurately" || v.q_s5_successful === "Somewhat accurately",
  showShiftingBurdenFollowup: (v) => v.q_s6_shifting_burden === "Very accurately" || v.q_s6_shifting_burden === "Somewhat accurately",
  showGrowthUnderinvestFollowup: (v) => v.q_s6_growth_underinvest === "Very accurately" || v.q_s6_growth_underinvest === "Somewhat accurately",
  showEscalationFollowup: (v) => v.q_s7_escalation === "Very accurately" || v.q_s7_escalation === "Somewhat accurately",
  showLimitsGrowthFollowup: (v) => v.q_s7_limits_growth === "Very accurately" || v.q_s7_limits_growth === "Somewhat accurately",
  showBigManFollowup: (v) => v.q_s8_big_man === "Very accurately" || v.q_s8_big_man === "Somewhat accurately",
  showShiftingBurdenS8Followup: (v) => v.q_s8_shifting_burden === "Very accurately" || v.q_s8_shifting_burden === "Somewhat accurately",
  showInvestmentLoopFollowup: (v) => v.q_s9_investment_loop === "Very accurately" || v.q_s9_investment_loop === "Somewhat accurately",
  showGovernanceLoopFollowup: (v) => v.q_s9_governance_loop === "Very accurately" || v.q_s9_governance_loop === "Somewhat accurately",
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN SURVEY SCHEMA — 17 Steps (0–16)
// ═══════════════════════════════════════════════════════════════════════════════

export const surveySchema = z.object({

  // ═══ Section 0: Welcome & Orientation ═══
  q0_1_ready: optionalString.describe("Readiness to begin"),
  q0_2_ecosystem_understanding: optionalString.describe("Ecosystem understanding level"),
  q0_3_systems_thinking_value: optionalString.describe("Systems thinking perceived value"),

  // ═══ Section 1: Privacy, Consent & Confidentiality ═══
  q1_1_consent_participate: z.boolean().default(false).describe("Consent to participate"),
  q1_2_consent_anonymize: z.boolean().default(false).describe("Consent to anonymize"),
  q1_3_consent_email_copy: z.boolean().default(false).describe("Consent to email copy"),
  q1_4_consent_voluntary: z.boolean().default(false).describe("Consent voluntary participation"),

  // ═══ Section 2: Demographics (Your Profile) ═══
  demo_name: requiredString.describe("Full name"),
  demo_email: z.string().email("Valid email required").describe("Email address"),
  demo_organization: optionalString.describe("Organization/Institution"),
  demo_position: optionalString.describe("Position/Designation"),
  demo_province: requiredString.describe("Province"),
  demo_category: requiredString.describe("Stakeholder category"),
  demo_expertise: z.array(z.string()).min(1, "Select at least one").describe("Areas of expertise"),

  // ═══ Section 3: Systems Thinking & BEIE Framework ═══
  q3_1_beie_collaboration: optionalString.describe("BEIE collaboration question"),
  q3_2_beie_understanding: optionalString.describe("BEIE understanding level"),
  q3_3_beie_relevance: optionalString.describe("BEIE relevance"),
  q3_4_cluster_position: optionalString.describe("Cluster position in ecosystem"),
  // ── SWOT Scale: Strengths (Section A) ──
  q_s1_halal_legitimacy_impact: optionalNumber,
  q_s1_halal_legitimacy_likelihood: optionalNumber,
  q_s1_bimpeaga_impact: optionalNumber,
  q_s1_bimpeaga_likelihood: optionalNumber,
  q_s1_aff_base_impact: optionalNumber,
  q_s1_aff_base_likelihood: optionalNumber,

  // ═══ Section 4: Cluster 1 — Foundations ═══
  q4_1_priorities: z.array(z.string()).min(1, "Select at least one priority"),
  q4_2_maguindanao_logistics: optionalString.describe("Maguindanao logistics agreement"),
  q4_3_feasibility: optionalNumber.describe("Food security feasibility"),
  // ── SWOT Scale: Threats & Weaknesses ──
  q_s4_climate_impact: optionalNumber,
  q_s4_climate_likelihood: optionalNumber,
  q_s4_pestalotiopsis_impact: optionalNumber,
  q_s4_pestalotiopsis_likelihood: optionalNumber,
  q_s4_postharvest_impact: optionalNumber,
  q_s4_postharvest_likelihood: optionalNumber,
  q_s4_poverty_impact: optionalNumber,
  q_s4_poverty_likelihood: optionalNumber,
  // ── Systems Mapping: Archetypes ──
  q_s4_tragedy_commons: optionalString.describe("Tragedy of the Commons validation"),
  q_s4_tragedy_followup: optionalString.describe("Most at-risk resource"),
  q_s4_limits_growth: optionalString.describe("Limits to Growth validation"),

  // ═══ Section 5: Cluster 2 — Transformers ═══
  q5_1_cold_chain: optionalString.describe("Cold chain agreement"),
  q5_2_economic_zones: optionalString.describe("Economic zones agreement"),
  q5_3_barrier: optionalString.describe("Biggest barrier"),
  q5_4_halal_park: optionalString.describe("Halal park priority"),
  // ── SWOT Scale: Weaknesses, Opportunities, Threats ──
  q_s5_halal_cert_impact: optionalNumber,
  q_s5_halal_cert_likelihood: optionalNumber,
  q_s5_skills_mismatch_impact: optionalNumber,
  q_s5_skills_mismatch_likelihood: optionalNumber,
  q_s5_global_halal_impact: optionalNumber,
  q_s5_global_halal_likelihood: optionalNumber,
  q_s5_uae_corridor_impact: optionalNumber,
  q_s5_uae_corridor_likelihood: optionalNumber,
  q_s5_competition_impact: optionalNumber,
  q_s5_competition_likelihood: optionalNumber,
  // ── Systems Mapping: Archetypes ──
  q_s5_fixes_fail: optionalString.describe("Fixes that Fail validation"),
  q_s5_fixes_followup: optionalString.describe("Sectors fitting Fixes that Fail"),
  q_s5_successful: optionalString.describe("Success to the Successful validation"),
  q_s5_successful_followup: optionalString.describe("Untapped island province potential"),

  // ═══ Section 6: Cluster 3 — Enablers (REBUILT) ═══
  // SWOT Scales — Strengths
  q_s6_youth_pop_impact: optionalNumber,
  q_s6_youth_pop_likelihood: optionalNumber,
  q_s6_renewable_energy_impact: optionalNumber,
  q_s6_renewable_energy_likelihood: optionalNumber,
  q_s6_polloc_impact: optionalNumber,
  q_s6_polloc_likelihood: optionalNumber,
  // SWOT Scales — Weaknesses
  q_s6_infra_deficits_impact: optionalNumber,
  q_s6_infra_deficits_likelihood: optionalNumber,
  q_s6_literacy_impact: optionalNumber,
  q_s6_literacy_likelihood: optionalNumber,
  q_s6_skills_mismatch_impact: optionalNumber,
  q_s6_skills_mismatch_likelihood: optionalNumber,
  q_s6_tech_adoption_impact: optionalNumber,
  q_s6_tech_adoption_likelihood: optionalNumber,
  // SWOT Scales — Opportunities
  q_s6_renewable_invest_impact: optionalNumber,
  q_s6_renewable_invest_likelihood: optionalNumber,
  q_s6_tourism_potential_impact: optionalNumber,
  q_s6_tourism_potential_likelihood: optionalNumber,
  // SWOT Scales — Threats
  q_s6_political_transition_impact: optionalNumber,
  q_s6_political_transition_likelihood: optionalNumber,
  q_s6_cost_overruns_impact: optionalNumber,
  q_s6_cost_overruns_likelihood: optionalNumber,
  q_s6_natl_coord_impact: optionalNumber,
  q_s6_natl_coord_likelihood: optionalNumber,
  // Systems Mapping Archetypes
  q_s6_shifting_burden: optionalString.describe("Shifting the Burden validation"),
  q_s6_shifting_followup: optionalString.describe("Short-term fix example"),
  q_s6_growth_underinvest: optionalString.describe("Growth and Underinvestment validation"),
  q_s6_growth_followup: optionalString.describe("Most underinvested sector"),
  // Contextual questions
  q6_1_halal_sector_rank: optionalString.describe("Halal sector ranking"),
  q6_2_sequencing_effectiveness: optionalNumber.describe("Infrastructure sequencing effectiveness"),
  q6_3_begmp_confidence: optionalNumber.describe("BEGMP confidence"),
  q6_4_tourism_confidence: optionalNumber.describe("Tourism competitiveness confidence"),
  q6_5_digital_tourism_rank: z.array(z.string()).default([]).describe("Digital components for tourism ranking"),
  q6_6_moral_governance_realistic: optionalString.describe("Moral Governance realism"),

  // ═══ Section 7: Cluster 4 — Connectors (retained) ═══
  q6_1_bimpeaga: requiredNumber,
  q6_2_markets: z.array(z.string()).min(1, "Select at least one market"),
  q6_3_export_target: requiredNumber,
  q6_4_uae_feasibility: requiredNumber,
  q6_5_perception: requiredString,
  q_s6_asean_halal_impact: optionalNumber,
  q_s6_asean_halal_likelihood: optionalNumber,
  q_s6_successful: optionalString,

  // ═══ Section 7: Cluster 4 — Connectors (retained) ═══
  q7_1_criticality: requiredNumber,
  q7_2_instruments: z.array(z.string()).min(1, "Select at least one instrument"),
  q7_3_inclusion_target: requiredNumber,
  q7_4_asset_paradox: requiredString,
  q7_5_block_grant: requiredString,
  q_s7_islamic_finance_impact: optionalNumber,
  q_s7_islamic_finance_likelihood: optionalNumber,
  q_s7_capacity_traps: optionalString,
  q_s7_shifting_burden: optionalString,
  q_s7_tragedy_commons: optionalString,
  q_s7_wordcloud: optionalString,

  // ═══ Section 8: Strategic Options (retained) ═══
  q8_1_strategy: requiredString,
  q8_2_sequencing: requiredString,
  q8_3_comments: z.string().default(""),

  // ═══ Section 7: Cluster 4 — Connectors (REBUILT) ═══
  // SWOT Scales — Strengths
  q_s7_bimpeaga_loc_impact: optionalNumber,
  q_s7_bimpeaga_loc_likelihood: optionalNumber,
  q_s7_domestic_halal_impact: optionalNumber,
  q_s7_domestic_halal_likelihood: optionalNumber,
  q_s7_polloc_impact: optionalNumber,
  q_s7_polloc_likelihood: optionalNumber,
  q_s7_islamic_finance_impact: optionalNumber,
  q_s7_islamic_finance_likelihood: optionalNumber,
  // SWOT Scales — Weaknesses
  q_s7_infra_deficits_impact: optionalNumber,
  q_s7_infra_deficits_likelihood: optionalNumber,
  q_s7_fragmented_policy_impact: optionalNumber,
  q_s7_fragmented_policy_likelihood: optionalNumber,
  q_s7_market_linkages_impact: optionalNumber,
  q_s7_market_linkages_likelihood: optionalNumber,
  q_s7_tech_adoption_impact: optionalNumber,
  q_s7_tech_adoption_likelihood: optionalNumber,
  // SWOT Scales — Opportunities
  q_s7_asean_halal_impact: optionalNumber,
  q_s7_asean_halal_likelihood: optionalNumber,
  q_s7_bimpeaga_integration_impact: optionalNumber,
  q_s7_bimpeaga_integration_likelihood: optionalNumber,
  q_s7_uae_corridor_impact: optionalNumber,
  q_s7_uae_corridor_likelihood: optionalNumber,
  q_s7_tourism_potential_impact: optionalNumber,
  q_s7_tourism_potential_likelihood: optionalNumber,
  // SWOT Scales — Threats
  q_s7_halal_competition_impact: optionalNumber,
  q_s7_halal_competition_likelihood: optionalNumber,
  q_s7_security_incidents_impact: optionalNumber,
  q_s7_security_incidents_likelihood: optionalNumber,
  q_s7_price_volatility_impact: optionalNumber,
  q_s7_price_volatility_likelihood: optionalNumber,
  q_s7_natl_coord_impact: optionalNumber,
  q_s7_natl_coord_likelihood: optionalNumber,
  // Systems Mapping Archetypes
  q_s7_escalation: optionalString.describe("Escalation archetype validation"),
  q_s7_escalation_followup: optionalString.describe("Escalation domain"),
  q_s7_limits_growth: optionalString.describe("Limits to Growth validation"),
  q_s7_limits_followup: optionalString.describe("Most limiting bottleneck"),
  // Contextual questions
  q7_1_connectivity_priority: optionalString.describe("Connectivity pillar priority"),
  q7_2_integration_challenge: optionalString.describe("Zone integration challenge"),
  q7_3_priority_node: optionalString.describe("Priority provincial node"),
  q7_4_trapped_value_province: optionalString.describe("Trapped value province"),
  q7_5_bridge_impact: optionalString.describe("Most transformative bridge"),
  q7_6_gateway_province: optionalString.describe("Primary maritime gateway"),
  q7_7_priority_vector: optionalString.describe("Priority global integration vector"),
  q7_8_uae_feasibility: optionalNumber.describe("UAE/GCC market feasibility"),
  q7_9_bimpeaga_leverage: optionalNumber.describe("BIMP-EAGA leverage effectiveness"),

  // ═══ Section 8: Cluster 5 — Financiers (REBUILT) ═══
  // SWOT Scales — Strengths
  q_s8_domestic_halal_impact: optionalNumber,
  q_s8_domestic_halal_likelihood: optionalNumber,
  q_s8_youth_pop_impact: optionalNumber,
  q_s8_youth_pop_likelihood: optionalNumber,
  q_s8_policy_recognition_impact: optionalNumber,
  q_s8_policy_recognition_likelihood: optionalNumber,
  q_s8_islamic_finance_fw_impact: optionalNumber,
  q_s8_islamic_finance_fw_likelihood: optionalNumber,
  q_s8_peace_dividend_impact: optionalNumber,
  q_s8_peace_dividend_likelihood: optionalNumber,
  // SWOT Scales — Weaknesses
  q_s8_infra_deficits_impact: optionalNumber,
  q_s8_infra_deficits_likelihood: optionalNumber,
  q_s8_literacy_impact: optionalNumber,
  q_s8_literacy_likelihood: optionalNumber,
  q_s8_financial_penetration_impact: optionalNumber,
  q_s8_financial_penetration_likelihood: optionalNumber,
  q_s8_fragmented_policy_impact: optionalNumber,
  q_s8_fragmented_policy_likelihood: optionalNumber,
  q_s8_skills_mismatch_impact: optionalNumber,
  q_s8_skills_mismatch_likelihood: optionalNumber,
  // SWOT Scales — Opportunities
  q_s8_global_halal_impact: optionalNumber,
  q_s8_global_halal_likelihood: optionalNumber,
  q_s8_renewable_invest_impact: optionalNumber,
  q_s8_renewable_invest_likelihood: optionalNumber,
  q_s8_asean_halal_impact: optionalNumber,
  q_s8_asean_halal_likelihood: optionalNumber,
  q_s8_islamic_ecosystem_impact: optionalNumber,
  q_s8_islamic_ecosystem_likelihood: optionalNumber,
  q_s8_uae_corridor_impact: optionalNumber,
  q_s8_uae_corridor_likelihood: optionalNumber,
  // SWOT Scales — Threats
  q_s8_halal_competition_impact: optionalNumber,
  q_s8_halal_competition_likelihood: optionalNumber,
  q_s8_halal_standards_impact: optionalNumber,
  q_s8_halal_standards_likelihood: optionalNumber,
  q_s8_security_incidents_impact: optionalNumber,
  q_s8_security_incidents_likelihood: optionalNumber,
  q_s8_political_transition_impact: optionalNumber,
  q_s8_political_transition_likelihood: optionalNumber,
  // Systems Mapping Archetypes
  q_s8_big_man: optionalString.describe("Big Man archetype validation"),
  q_s8_big_man_followup: optionalString.describe("Most active reinforcing loop"),
  q_s8_shifting_burden: optionalString.describe("Shifting the Burden validation"),
  q_s8_shifting_followup: optionalString.describe("Capital fix case example"),
  // Contextual questions
  q8_1_finance_tier_priority: optionalString.describe("Finance tier priority"),
  q8_2_roadmap_achievable: optionalNumber.describe("Islamic finance roadmap achievability"),
  q8_3_priority_action: optionalString.describe("Priority action for Islamic finance"),
  q8_4_islamic_authority: optionalString.describe("Islamic Finance Authority opinion"),

  // ═══ Section 9: Budget & Targets (retained) ═══
  q9_1_budget: requiredNumber,

  // ═══ Section 9: Operating Systems — Moral Governance (REBUILT) ═══
  // SWOT Scales — Strengths
  q_s9_policy_recognition_impact: optionalNumber,
  q_s9_policy_recognition_likelihood: optionalNumber,
  q_s9_islamic_finance_impact: optionalNumber,
  q_s9_islamic_finance_likelihood: optionalNumber,
  q_s9_cultural_heritage_impact: optionalNumber,
  q_s9_cultural_heritage_likelihood: optionalNumber,
  q_s9_peace_dividend_impact: optionalNumber,
  q_s9_peace_dividend_likelihood: optionalNumber,
  // SWOT Scales — Weaknesses
  q_s9_literacy_impact: optionalNumber,
  q_s9_literacy_likelihood: optionalNumber,
  q_s9_fragmented_policy_impact: optionalNumber,
  q_s9_fragmented_policy_likelihood: optionalNumber,
  q_s9_underspending_impact: optionalNumber,
  q_s9_underspending_likelihood: optionalNumber,
  // SWOT Scales — Opportunities
  q_s9_carbon_markets_impact: optionalNumber,
  q_s9_carbon_markets_likelihood: optionalNumber,
  q_s9_pes_impact: optionalNumber,
  q_s9_pes_likelihood: optionalNumber,
  q_s9_postconflict_impact: optionalNumber,
  q_s9_postconflict_likelihood: optionalNumber,
  q_s9_forestry_code_impact: optionalNumber,
  q_s9_forestry_code_likelihood: optionalNumber,
  // SWOT Scales — Threats
  q_s9_security_incidents_impact: optionalNumber,
  q_s9_security_incidents_likelihood: optionalNumber,
  q_s9_political_transition_impact: optionalNumber,
  q_s9_political_transition_likelihood: optionalNumber,
  q_s9_fragmented_agency_impact: optionalNumber,
  q_s9_fragmented_agency_likelihood: optionalNumber,
  // Systems Mapping Archetypes
  q_s9_investment_loop: optionalString.describe("Investment-Development Loop validation"),
  q_s9_investment_loop_followup: optionalString.describe("Strongest sector cycle"),
  q_s9_governance_loop: optionalString.describe("Governance-Investor Confidence Loop validation"),
  q_s9_governance_loop_followup: optionalString.describe("Key governance reform"),
  // Contextual questions
  q9_1_moral_governance_derisk: optionalNumber.describe("Moral governance de-risking effectiveness"),
  q9_2_critical_loop: optionalString.describe("Critical reinforcing loop"),
  q9_3_regulatory_priority: optionalString.describe("Priority regulatory pillar"),
  q9_4_revenue_channel: optionalString.describe("Priority revenue channel"),
  q9_5_stakeholder_alignment: optionalString.describe("Most aligned stakeholder group"),
  q9_6_reform_priority: optionalString.describe("Priority reform area"),

  // ═══ Section 10: IEDS & Three-Phase Implementation (NEW) ═══
  q10_1_ieds_preference: optionalString.describe("IEDS preference"),
  q10_2_sequence_a_priority: optionalNumber.describe("Sequence A priority rating"),
  q10_3_sequence_b_priority: optionalNumber.describe("Sequence B priority rating"),
  q10_4_sequence_c_priority: optionalNumber.describe("Sequence C priority rating"),
  q10_5_sequencing_logic: optionalString.describe("Sequencing logic agreement"),
  q10_6_risk_mitigation: optionalString.describe("Risk mitigation priority"),
  q10_7_outcomes_achievable: optionalNumber.describe("2035 outcomes achievability"),

  // ═══ Section 11: Metrics Architecture & KPIs (NEW) ═══
  q11_1_calibration_appropriate: optionalString.describe("Calibration appropriateness"),
  q11_2_governance_kpi_importance: optionalNumber.describe("Governance KPI importance"),
  q11_3_resilience_kpi_importance: optionalNumber.describe("Resilience KPI importance"),
  q11_4_inclusivity_kpi_importance: optionalNumber.describe("Inclusivity KPI importance"),
  q11_5_peace_kpi_importance: optionalNumber.describe("Peace KPI importance"),
  q11_6_cluster_kpi_sufficient: optionalString.describe("Cluster KPI sufficiency"),
  q11_7_benchmark_priority: optionalString.describe("Benchmark priority"),

  // ═══ Section 12: Balanced Scorecard (NEW) ═══
  q12_1_learning_growth_alignment: optionalNumber.describe("Learning & Growth alignment"),
  q12_2_internal_process_alignment: optionalNumber.describe("Internal Process alignment"),
  q12_3_stakeholder_alignment: optionalNumber.describe("Stakeholder alignment"),
  q12_4_financial_alignment: optionalNumber.describe("Financial alignment"),
  q12_5_strongest_pathway: optionalString.describe("Strongest causal pathway"),
  q12_6_vision_clarity: optionalNumber.describe("Vision clarity rating"),
  q12_7_vision_achievable: optionalNumber.describe("Vision achievability"),
  q12_8_mission_alignment: optionalNumber.describe("Mission alignment"),
  q12_9_bsc_useful: optionalNumber.describe("BSC usefulness"),
  q12_10_adaptive_frequency: optionalString.describe("BSC review frequency"),

  // ═══ Section 13: Priority Actions & Budget (NEW) ═══
  q13_1_funding_mix_fair: optionalNumber.describe("Funding mix fairness"),
  q13_2_targets_realistic: optionalNumber.describe("Targets realism"),
  q13_3_high_risk_concern: optionalNumber.describe("High risk concern"),
  q13_4_medium_risk_concern: optionalNumber.describe("Medium risk concern"),
  q13_5_low_risk_concern: optionalNumber.describe("Low risk concern"),
  q13_6_budget_priority_phase: optionalString.describe("Budget priority phase"),
  q13_7_budget_priority_cluster: optionalString.describe("Budget priority cluster"),
  q13_8_blended_finance_opinion: optionalString.describe("Blended finance opinion"),

  // ═══ Section 14: Resources & Engagements (NEW) ═══
  q14_1_engagement_type: z.array(z.string()).default([]).describe("Engagement type interest"),
  q14_2_contact_method: optionalString.describe("Preferred contact method"),
  q14_3_timing: optionalString.describe("Follow-up timing preference"),
  q14_4_role_contribution: optionalString.describe("Role contribution"),
  q14_5_additional_comments: optionalString.describe("Additional comments"),

  // ═══ Section 15: Review & Submit (NEW) ═══
  q15_1_confirm_accurate: z.boolean().default(false).describe("Confirm responses accurate"),
  q15_2_consent_anonymous_use: z.boolean().default(false).describe("Consent to anonymous use"),
  q15_3_consent_voluntary: z.boolean().default(false).describe("Consent voluntary participation"),
  q15_4_ready_to_submit: z.boolean().default(false).describe("Ready to submit"),
});

export type SurveySchemaType = z.infer<typeof surveySchema>;

// ═══════════════════════════════════════════════════════════════════════════════
// BIRD SCORE COMPUTATION — Derived from survey responses
// ═══════════════════════════════════════════════════════════════════════════════

export interface BIRDScores {
  /** Resilience Index for Strengths */
  strengthRI: number;
  /** Risk score for Weaknesses */
  weaknessRisk: number;
  /** Resilience Index for Opportunities */
  opportunityRI: number;
  /** Vulnerability Index for Threats */
  threatVI: number;
  /** Overall BIRD Health Score (0-100) */
  overallHealth: number;
  /** Priority band: low | moderate | elevated | critical */
  priorityBand: string;
}

/** Compute aggregate BIRD scores from validated survey data */
export function computeBIRDScores(data: SurveySchemaType): Partial<BIRDScores> {
  // This function is called server-side by the Edge Function
  // Client-side computation happens in SurveyWizard.tsx via formulas.ts
  return {
    overallHealth: 0,
    priorityBand: "uncomputed",
  };
}
