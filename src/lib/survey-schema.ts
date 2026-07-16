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

  // ═══ Section 6: Cluster 3 — Enablers (retained) ═══
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

  // ═══ Section 9: Budget & Targets (retained) ═══
  q9_1_budget: requiredNumber,

  // ═══ Section 10: IEDS Matrix (retained) ═══
  q10_1_ambition: requiredNumber,
  q10_matrix: iedsMatrixSchema,

  // ═══ Section 11: Provincial Equity (retained) ═══
  q11_1_affirmative: requiredString,
  q11_2_mechanisms: z.array(z.string()).default([]),
  q_s11_poverty_impact: optionalNumber,
  q_s11_poverty_likelihood: optionalNumber,
  q_s11_successful: optionalString,

  // ═══ Section 12: Climate Resilience (retained) ═══
  q12_1_green_priority: requiredNumber,
  q12_2_adaptation: z.array(z.string()).min(1, "Select at least one adaptation measure"),

  // ═══ Section 13: Policy & Governance (retained) ═══
  q13_1_legislation: z.array(z.string()).min(1, "Select at least one legislation priority"),
  q13_2_bicc: requiredNumber,
  q_s13_shifting_burden: optionalString,
  q_s13_drifting_goals: optionalString,

  // ═══ Section 14: Final Consent (retained) ═══
  consent_final: z.literal(true, { errorMap: () => ({ message: "You must consent to submit" }) }),

  // ═══ Section 15: C.A.R.E. Validation (retained) ═══
  care_context: requiredNumber,
  care_action: requiredNumber,
  care_realtime: requiredNumber,
  care_evidence: requiredNumber,
  care_overall: requiredNumber,
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
