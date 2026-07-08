// src/lib/survey-schema.ts
// ═════════════════════════════════════════════════════════════════════════════
// MAIN SURVEY SCHEMA
// ═════════════════════════════════════════════════════════════════════════════
import { z } from "zod";
export const surveySchema = z.object({
const scale1to5 = z.enum(["1", "2", "3", "4", "5"]);
const optionalText = z.string().optional();

export const provinces = z.enum([
  "lanao_del_sur", "maguindanao_del_norte", "maguindanao_del_sur", 
  "basilan", "sulu", "tawi_tawi", "sga", "cotabato_city"
]);

const iedsCriteria = z.object({
  economic_impact: z.coerce.number().min(1).max(10),
  feasibility: z.coerce.number().min(1).max(10),
  identity_alignment: z.coerce.number().min(1).max(10),
  systems_leverage: z.coerce.number().min(1).max(10),
  risk_return: z.coerce.number().min(1).max(10),
  inclusivity: z.coerce.number().min(1).max(10),
  sustainability: z.coerce.number().min(1).max(10),
});

export const surveySchema = z.object({
  // --- SECTION 1-6: Standard Fields ---
  q1_1: scale1to5,
  q1_2: scale1to5,
  q2_1: scale1to5,
  q2_2: scale1to5,
  q3_el_nino_impact: scale1to5,
  q3_pestalotiopsis_impact: scale1to5,

// ─── IEDS Matrix Sub-Schema (7 criteria × 4 options) ────────────────────────
const iedsCriteria = z.object({
  economic_impact: z.coerce.number().min(1).max(10),
  feasibility: z.coerce.number().min(1).max(10),
  identity_alignment: z.coerce.number().min(1).max(10),
  systems_leverage: z.coerce.number().min(1).max(10),
  risk_return: z.coerce.number().min(1).max(10),
  inclusivity: z.coerce.number().min(1).max(10),
  sustainability: z.coerce.number().min(1).max(10),
});

  // ── SECTION 1: BEIE Framework ──────────────────────────────────────────────
  q1_1: scale1to5, // Understanding
  q1_2: scale1to5, // Relevance

  // ── SECTION 2: Moral Governance (Cross-Cutting) ────────────────────────────
  q2_1: scale1to5, // Moral Governance importance
  q2_2: scale1to5, // Implementation effectiveness
  // Elephant: Shifting the Burden archetype agreement
  q2_3_archetype: scale1to5, // "Fragmented BMOA coordination triggers Shifting the Burden"
  // Elephant: Peace Dividend milestones
  q2_4_peace: checkboxArray, // Which milestones validate peace dividend

 const surveySchema = z.object({
  // --- SECTION 1-6: Standard Fields ---
  q1_1: scale1to5,
  q1_2: scale1to5,
  q2_1: scale1to5,
  q2_2: scale1to5,
  q3_el_nino_impact: scale1to5,
  q3_pestalotiopsis_impact: scale1to5,

  // ── SECTION 7: Cluster 5 – Financiers ──────────────────────────────────────
  q7_1_criticality: scale1to5,    // Islamic finance criticality
  q7_2_instruments: checkboxArray, // Financial instruments to prioritize
  q7_3_inclusion_target: scale1to5,
  // Elephant: Growth and Underinvestment archetype
  q7_4_asset_paradox: z.enum(["cultural", "regulatory", "products", "branches"]),
  // Elephant: Block Grant Dependency
  q7_5_block_grant: scale1to5,

  // --- SECTION 8: Strategic Options (Kill Switch Trigger) ---
  q8_1_strategy: z.enum(["heds", "gems", "ifes", "ieds"]),
  q8_2_sequencing: z.enum(["highly_logical", "mostly_logical", "needs_adjustment", "flawed"]),
  q8_3_comments: optionalText,

  // ── SECTION 9: Budget & Targets ────────────────────────────────────────────
  q9_1_budget: z.enum(["realistic", "underestimated", "overestimated", "unable"]),
  q10_1_ambition: z.enum(["appropriately_ambitious", "too_conservative", "too_ambitious", "mixed"]),

 // --- SECTION 10: IEDS Matrix (Interactive Sliders) ---
  q10_matrix: z.object({
    heds: iedsCriteria, gems: iedsCriteria, ifes: iedsCriteria, ieds: iedsCriteria,
  
    // ── SECTION 11: Provincial Equity ──────────────────────────────────────────
  q11_1_affirmative: scale1to5,
  q11_2_mechanisms: checkboxArray,

  // ── SECTION 12: Climate Resilience ─────────────────────────────────────────
  q12_1_green_priority: scale1to5,
  q12_2_adaptation: checkboxArray,

  // ── SECTION 13: Policy & Governance ────────────────────────────────────────
  q13_1_legislation: z.array(z.string()).min(1).max(2, "Select no more than 2."),
  q13_2_bicc: scale1to5,

  // --- SECTION 14: Demographics (Triggers Conditional Logic) ---
  demo_province: provinces,
  demo_category: z.string().min(1),

// --- SECTION 15: Consent ---
  consent_final: z.literal(true, { errorMap: () => ({ message: "You must consent to submit." }) }),
})
// 🐘 KILL SWITCH VALIDATION: If IEDS is chosen, Sequencing cannot be 'flawed'
.superRefine((data, ctx) => {
  if (data.q8_1_strategy === "ieds" && data.q8_2_sequencing === "flawed") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "⚠️ Kill Switch: You selected IEDS but rated its sequencing as 'Flawed'. The BIRD framework relies on coherent sequencing. Please adjust your assessment.",
      path: ["q8_2_sequencing"],
    });
  }
});

export type SurveySchemaType = z.infer<typeof surveySchema>;
