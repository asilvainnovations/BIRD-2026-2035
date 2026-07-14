// src/lib/survey-schema.ts
// BIRD 2026–2035 · Validation Survey Zod Schema
// Single source of truth for all 17 survey sections (including Section 0)

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

// ── Conditional rules type (for UI logic, not validation) ───────────────────
export type ConditionalRules = Record<string, (values: Record<string, unknown>) => boolean>;

export const conditionalRules: ConditionalRules = {
  showBasilanAlert: (v) => v.demo_province === "basilan",
  showElNino: (v) => Array.isArray(v.q3_1_priorities) && v.q3_1_priorities.includes("agriculture"),
  showCommodityImpact: (v) => v.q4_2_halal_park === "yes",
};

// ── Main Survey Schema ──────────────────────────────────────────────────────
export const surveySchema = z.object({
  // ═══ Section 0: Welcome & Orientation ═══
  q0_1_ready: optionalString.describe("Readiness to begin"),
  q0_2_ecosystem_understanding: optionalString.describe("Ecosystem understanding level"),
  q0_3_systems_thinking_value: optionalString.describe("Systems thinking perceived value"),

  // ═══ Section 1: BEIE Framework Context ═══
  q1_1: requiredString.describe("Understanding of BEIE Framework"),
  q1_2: requiredString.describe("Relevance of BEIE to BARMM"),
  q1_3_cluster_contribution: optionalString.describe("Cluster contribution"),
  q1_4_beie_actionable: optionalString.describe("BEIE actionable input"),
  // ── SWOT Scale: Strengths ────────────────────────────────────────────────
  q_s1_halal_legitimacy_impact: optionalNumber,
  q_s1_halal_legitimacy_likelihood: optionalNumber,
  q_s1_bimpeaga_impact: optionalNumber,
  q_s1_bimpeaga_likelihood: optionalNumber,
  q_s1_domestic_demand_impact: optionalNumber,
  q_s1_domestic_demand_likelihood: optionalNumber,

  // ═══ Section 2: Moral Governance Operating System ═══
  q2_1: requiredNumber.describe("Importance of Moral Governance"),
  q2_2: requiredNumber.describe("Implementation readiness"),
  q2_3_archetype: requiredString.describe("Dominant systems archetype"),
  q2_4_peace: z.array(z.string()).default([]).describe("Peace milestones"),
  // ── Systems Mapping: Governance Loops ────────────────────────────────────
  q_s2_governance_loops: optionalString,
  // ── SWOT Scale: Threats ──────────────────────────────────────────────────
  q_s2_security_incidents_impact: optionalNumber,
  q_s2_security_incidents_likelihood: optionalNumber,
  q_s2_political_transition_impact: optionalNumber,
  q_s2_political_transition_likelihood: optionalNumber,
  // ── Systems Mapping: Instability Traps ───────────────────────────────────
  q_s2_escalation: optionalString,
  q_s2_bigman: optionalString,

  // ═══ Section 3: Cluster 1 — Foundations ═══
  q3_1_priorities: z.array(z.string()).min(1, "Select at least one priority"),
  q3_2_feasibility: requiredNumber,
  q3_el_nino_impact: optionalNumber,
  q3_el_nino_like: optionalNumber,
  q3_pestalotiopsis_impact: optionalNumber,
  q3_pestalotiopsis_like: optionalNumber,
  q3_postharvest_impact: optionalNumber,
  q3_postharvest_like: optionalNumber,
  q3_limits_growth: optionalString,
  // ── SWOT Scale: Climate Threat ───────────────────────────────────────────
  q_s3_climate_change_impact: optionalNumber,
  q_s3_climate_change_likelihood: optionalNumber,
  // ── Systems Mapping: Tragedy of the Commons ──────────────────────────────
  q_s3_tragedy_commons: optionalString,

  // ═══ Section 4: Cluster 2 — Transformers ═══
  q4_1_barrier: requiredString,
  q4_2_halal_park: requiredString,
  q4_3_fixes_fail: requiredString,
  q4_4_commodity_impact: optionalString,
  q4_5_heds_ranking: z.array(z.string()).default([]),
  // ── SWOT Scale: Transformers ─────────────────────────────────────────────
  q_s4_halal_cert_impact: optionalNumber,
  q_s4_halal_cert_likelihood: optionalNumber,
  q_s4_global_halal_impact: optionalNumber,
  q_s4_global_halal_likelihood: optionalNumber,
  q_s4_competition_impact: optionalNumber,
  q_s4_competition_likelihood: optionalNumber,
  // ── Systems Mapping: Fixes that Fail ─────────────────────────────────────
  q_s4_fixes_fail: optionalString,

  // ═══ Section 5: Cluster 3 — Enablers ═══
  q5_1_infra: requiredNumber,
  q5_2_sectors: z.array(z.string()).min(1, "Select at least one sector"),
  q5_3_broadband: requiredNumber,
  q5_4_literacy: requiredNumber,
  q5_5_stunting: requiredNumber,
  q5_6_digital_divide: requiredString,
  // ── SWOT Scale: Weaknesses ───────────────────────────────────────────────
  q_s5_infra_deficit_impact: optionalNumber,
  q_s5_infra_deficit_likelihood: optionalNumber,
  q_s5_poverty_impact: optionalNumber,
  q_s5_poverty_likelihood: optionalNumber,
  q_s5_literacy_impact: optionalNumber,
  q_s5_literacy_likelihood: optionalNumber,
  q_s5_youth_population_impact: optionalNumber,
  q_s5_youth_population_likelihood: optionalNumber,
  // ── Systems Mapping: Capacity Traps ──────────────────────────────────────
  q_s5_limits_growth: optionalString,
  q_s5_growth_underinvestment: optionalString,
  // ── Moral Governance Enablers ────────────────────────────────────────────
  q_s5_moral_governance_enablers: optionalString,

  // ═══ Section 6: Cluster 4 — Connectors ═══
  q6_1_bimpeaga: requiredNumber,
  q6_2_markets: z.array(z.string()).min(1, "Select at least one market"),
  q6_3_export_target: requiredNumber,
  q6_4_uae_feasibility: requiredNumber,
  q6_5_perception: requiredString,
  // ── SWOT Scale: Opportunity ──────────────────────────────────────────────
  q_s6_asean_halal_impact: optionalNumber,
  q_s6_asean_halal_likelihood: optionalNumber,
  // ── Systems Mapping: Success to the Successful ───────────────────────────
  q_s6_successful: optionalString,

  // ═══ Section 7: Cluster 5 — Financiers & Systems Archetypes ═══
  q7_1_criticality: requiredNumber,
  q7_2_instruments: z.array(z.string()).min(1, "Select at least one instrument"),
  q7_3_inclusion_target: requiredNumber,
  q7_4_asset_paradox: requiredString,
  q7_5_block_grant: requiredString,
  // ── SWOT Scale: Islamic Finance ──────────────────────────────────────────
  q_s7_islamic_finance_impact: optionalNumber,
  q_s7_islamic_finance_likelihood: optionalNumber,
  // ── Systems Mapping: All Archetypes ──────────────────────────────────────
  q_s7_capacity_traps: optionalString,
  q_s7_shifting_burden: optionalString,
  q_s7_tragedy_commons: optionalString,
  // ── Word Cloud ───────────────────────────────────────────────────────────
  q_s7_wordcloud: optionalString,

  // ═══ Section 8: Strategic Options ═══
  q8_1_strategy: requiredString,
  q8_2_sequencing: requiredString,
  q8_3_comments: z.string().default(""),

  // ═══ Section 9: Budget & Targets ═══
  q9_1_budget: requiredNumber,

  // ═══ Section 10: IEDS Matrix Evaluation ═══
  q10_1_ambition: requiredNumber,
  q10_matrix: iedsMatrixSchema,

  // ═══ Section 11: Provincial Equity & Policy ═══
  q11_1_affirmative: requiredString,
  q11_2_mechanisms: z.array(z.string()).default([]),
  // ── SWOT Scale: Poverty ──────────────────────────────────────────────────
  q_s11_poverty_impact: optionalNumber,
  q_s11_poverty_likelihood: optionalNumber,
  // ── Systems Mapping: Success to the Successful ───────────────────────────
  q_s11_successful: optionalString,

  // ═══ Section 12: Climate Resilience ═══
  q12_1_green_priority: requiredNumber,
  q12_2_adaptation: z.array(z.string()).min(1, "Select at least one adaptation measure"),

  // ═══ Section 13: Policy & Governance ═══
  q13_1_legislation: z.array(z.string()).min(1, "Select at least one legislation priority"),
  q13_2_bicc: requiredNumber,
  // ── Systems Mapping: Governance Traps ────────────────────────────────────
  q_s13_shifting_burden: optionalString,
  q_s13_drifting_goals: optionalString,

  // ═══ Section 14: Demographics ═══
  demo_category: requiredString,
  demo_province: requiredString,
  demo_expertise: z.array(z.string()).min(1, "Select at least one area of expertise"),
  demo_name: requiredString,
  demo_email: z.string().email("Valid email required"),
  demo_organization: optionalString,

  // ═══ Province-specific conditional fields ═══
  basilan_peace_questions: z.string().optional(),
  maguindanao_halal_questions: z.string().optional(),
  tawitawi_seaweed_questions: z.string().optional(),
  lanao_lake_questions: z.string().optional(),

  // ═══ Section 15: Final Consent ═══
  consent_final: z.literal(true, {
    errorMap: () => ({ message: "You must consent to submit" }),
  }),

  // ═══ Section 16: C.A.R.E. Validation ═══
  care_context: requiredNumber,
  care_action: requiredNumber,
  care_realtime: requiredNumber,
  care_evidence: requiredNumber,
  care_overall: requiredNumber,
});

export type SurveySchemaType = z.infer<typeof surveySchema>;
