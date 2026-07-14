import React, { useState, useCallback } from "react";
import { submitSurvey } from "@/lib/api";
import { surveySchema, type SurveySchemaType } from "@/lib/survey-schema";
import { Toaster, toast } from "sonner";
import { ProgressTracker } from "@/components/ProgressTracker";
import ContextPanel, { SECTION_CATALOG } from "@/components/ContextPanel";
import FloatingAIAssistant from "@/components/FloatingAIAssistant";

// ─── Section Components ──────────────────────────────────────────────────────
import Section0_Orientation from "./sections/Section0_Orientation";
import Section1_BEIE from "./sections/Section1_BEIE";
import Section2_MoralGov from "./sections/Section2_MoralGov";
import Section3_Foundations from "./sections/Section3_Foundations";
import Section4_Transformers from "./sections/Section4_Transformers";
import Section5_Enablers from "./sections/Section5_Enablers";
import Section6_Connectors from "./sections/Section6_Connectors";
import Section7_Financiers from "./sections/Section7_Financiers";
import Section8_StrategicOptions from "./sections/Section8_StrategicOptions";
import Section9_BudgetTargets from "./sections/Section9_BudgetTargets";
import Section10_IEDSMatrix from "./sections/Section10_IEDSMatrix";
import Section11_Equity from "./sections/Section11_Equity";
import Section12_Climate from "./sections/Section12_Climate";
import Section13_Policy from "./sections/Section13_Policy";
import Section14_Demographics from "./sections/Section14_Demographics";
import Section15_Submission from "./sections/Section15_Submission";
import Section16_CARE from "./sections/Section16_CARE";

import type { Section0Data } from "./sections/Section0_Orientation";
import type { Section1Data } from "./sections/Section1_BEIE";
import type { Section2Data } from "./sections/Section2_MoralGov";
import type { Section3Data } from "./sections/Section3_Foundations";
import type { Section4Data } from "./sections/Section4_Transformers";
import type { Section5Data } from "./sections/Section5_Enablers";
import type { Section6Data } from "./sections/Section6_Connectors";
import type { Section7Data } from "./sections/Section7_Financiers";
import type { Section8Data } from "./sections/Section8_StrategicOptions";
import type { Section9Data } from "./sections/Section9_BudgetTargets";
import type { Section10Data } from "./sections/Section10_IEDSMatrix";
import type { Section11Data } from "./sections/Section11_Equity";
import type { Section12Data } from "./sections/Section12_Climate";
import type { Section13Data } from "./sections/Section13_Policy";
import type { Section14Data } from "./sections/Section14_Demographics";
import type { Section15Data } from "./sections/Section15_Submission";
import type { Section16Data } from "./sections/Section16_CARE";

// ─── Wizard Steps ────────────────────────────────────────────────────────────
const STEP_LABELS = [
  "Welcome",
  "BEIE Framework",
  "Moral Governance",
  "Foundations",
  "Transformers",
  "Enablers",
  "Connectors",
  "Financiers & Systems",
  "Strategic Options",
  "Budget Targets",
  "IEDS Matrix",
  "Provincial Equity",
  "Climate Resilience",
  "Policy & Governance",
  "Demographics",
  "Review & Submit",
  "C.A.R.E. Validation",
];

// ─── Survey Wizard Component ─────────────────────────────────────────────────
const SurveyWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // ── Section 0: Orientation ────────────────────────────────────────────────
  const [s0, setS0] = useState<Section0Data>({
    ready_to_begin: "",
    ecosystem_understanding: "",
    systems_thinking_value: "",
  });

  // ── Section 1: BEIE ───────────────────────────────────────────────────────
  const [s1, setS1] = useState<Section1Data>({
    q1_1: "",
    q1_2: "",
    q1_3_cluster_contribution: "",
    q1_4_beie_actionable: "",
    q_s1_halal_legitimacy_impact: undefined,
    q_s1_halal_legitimacy_likelihood: undefined,
    q_s1_bimpeaga_impact: undefined,
    q_s1_bimpeaga_likelihood: undefined,
    q_s1_domestic_demand_impact: undefined,
    q_s1_domestic_demand_likelihood: undefined,
  });

  // ── Section 2: Moral Governance ───────────────────────────────────────────
  const [s2, setS2] = useState<Section2Data>({
    q2_1: undefined,
    q2_2: undefined,
    q2_3_archetype: "",
    q2_4_peace: [],
    q_s2_governance_loops: "",
    q_s2_security_incidents_impact: undefined,
    q_s2_security_incidents_likelihood: undefined,
    q_s2_escalation: "",
    q_s2_bigman: "",
    q_s2_political_transition_impact: undefined,
    q_s2_political_transition_likelihood: undefined,
  });

  // ── Section 3: Foundations ────────────────────────────────────────────────
  const [s3, setS3] = useState<Section3Data>({
    q3_1_priorities: [],
    q3_2_feasibility: undefined,
    q3_el_nino_impact: undefined,
    q3_el_nino_like: undefined,
    q3_pestalotiopsis_impact: undefined,
    q3_pestalotiopsis_like: undefined,
    q3_postharvest_impact: undefined,
    q3_postharvest_like: undefined,
    q3_limits_growth: "",
    q_s3_climate_change_impact: undefined,
    q_s3_climate_change_likelihood: undefined,
    q_s3_tragedy_commons: "",
  });

  // ── Section 4: Transformers ───────────────────────────────────────────────
  const [s4, setS4] = useState<Section4Data>({
    q4_1_barrier: "",
    q4_2_halal_park: "",
    q4_3_fixes_fail: "",
    q4_4_commodity_impact: "",
    q4_5_heds_ranking: [],
    q_s4_halal_cert_impact: undefined,
    q_s4_halal_cert_likelihood: undefined,
    q_s4_global_halal_impact: undefined,
    q_s4_global_halal_likelihood: undefined,
    q_s4_competition_impact: undefined,
    q_s4_competition_likelihood: undefined,
    q_s4_fixes_fail: "",
  });

  // ── Section 5: Enablers ───────────────────────────────────────────────────
  const [s5, setS5] = useState<Section5Data>({
    q5_1_infra: undefined,
    q5_2_sectors: [],
    q5_3_broadband: undefined,
    q5_4_literacy: undefined,
    q5_5_stunting: undefined,
    q5_6_digital_divide: "",
    q_s5_infra_deficit_impact: undefined,
    q_s5_infra_deficit_likelihood: undefined,
    q_s5_poverty_impact: undefined,
    q_s5_poverty_likelihood: undefined,
    q_s5_literacy_impact: undefined,
    q_s5_literacy_likelihood: undefined,
    q_s5_limits_growth: "",
    q_s5_growth_underinvestment: "",
    q_s5_youth_population_impact: undefined,
    q_s5_youth_population_likelihood: undefined,
    q_s5_moral_governance_enablers: "",
  });

  // ── Section 6: Connectors ─────────────────────────────────────────────────
  const [s6, setS6] = useState<Section6Data>({
    q6_1_bimpeaga: undefined,
    q6_2_markets: [],
    q6_3_export_target: undefined,
    q6_4_uae_feasibility: undefined,
    q6_5_perception: "",
    q_s6_asean_halal_impact: undefined,
    q_s6_asean_halal_likelihood: undefined,
    q_s6_successful: "",
  });

  // ── Section 7: Financiers ─────────────────────────────────────────────────
  const [s7, setS7] = useState<Section7Data>({
    q7_1_criticality: undefined,
    q7_2_instruments: [],
    q7_3_inclusion_target: undefined,
    q7_4_asset_paradox: "",
    q7_5_block_grant: "",
    q_s7_islamic_finance_impact: undefined,
    q_s7_islamic_finance_likelihood: undefined,
    q_s7_capacity_traps: "",
    q_s7_shifting_burden: "",
    q_s7_tragedy_commons: "",
    q_s7_wordcloud: "",
  });

  // ── Section 8: Strategic Options ──────────────────────────────────────────
  const [s8, setS8] = useState<Section8Data>({
    q8_1_strategy: "",
    q8_2_sequencing: "",
    q8_3_comments: "",
  });

  // ── Section 9: Budget Targets ─────────────────────────────────────────────
  const [s9, setS9] = useState<Section9Data>({
    q9_1_budget: undefined,
  });

  // ── Section 10: IEDS Matrix ───────────────────────────────────────────────
  const [s10, setS10] = useState<Section10Data>({
    q10_1_ambition: undefined,
    q10_matrix: {
      heds: { economic_impact: 5, feasibility: 5, identity_alignment: 5, systems_leverage: 5, risk_return: 5, inclusivity: 5, sustainability: 5 },
      gems: { economic_impact: 5, feasibility: 5, identity_alignment: 5, systems_leverage: 5, risk_return: 5, inclusivity: 5, sustainability: 5 },
      ifes: { economic_impact: 5, feasibility: 5, identity_alignment: 5, systems_leverage: 5, risk_return: 5, inclusivity: 5, sustainability: 5 },
      ieds: { economic_impact: 5, feasibility: 5, identity_alignment: 5, systems_leverage: 5, risk_return: 5, inclusivity: 5, sustainability: 5 },
    },
  });

  // ── Section 11: Provincial Equity ─────────────────────────────────────────
  const [s11, setS11] = useState<Section11Data>({
    q11_1_affirmative: "",
    q11_2_mechanisms: [],
    q_s11_successful: "",
    q_s11_poverty_impact: undefined,
    q_s11_poverty_likelihood: undefined,
  });

  // ── Section 12: Climate ───────────────────────────────────────────────────
  const [s12, setS12] = useState<Section12Data>({
    q12_1_green_priority: undefined,
    q12_2_adaptation: [],
  });

  // ── Section 13: Policy ────────────────────────────────────────────────────
  const [s13, setS13] = useState<Section13Data>({
    q13_1_legislation: [],
    q13_2_bicc: undefined,
    q_s13_shifting_burden: "",
    q_s13_drifting_goals: "",
  });

  // ── Section 14: Demographics ──────────────────────────────────────────────
  const [s14, setS14] = useState<Section14Data>({
    demo_category: "",
    demo_province: "",
    demo_expertise: [],
    demo_name: "",
    demo_email: "",
    demo_organization: "",
  });

  // ── Section 15: Review ────────────────────────────────────────────────────
  const [s15, setS15] = useState<Section15Data>({
    consent_final: false,
  });

  // ── Section 16: C.A.R.E. ──────────────────────────────────────────────────
  const [s16, setS16] = useState<Section16Data>({
    care_context: undefined,
    care_action: undefined,
    care_realtime: undefined,
    care_evidence: undefined,
    care_overall: undefined,
  });

  // ─── Step Renderer ─────────────────────────────────────────────────────────
  const renderStep = () => {
    switch (step) {
      case 0:
        return <Section0_Orientation data={s0} onChange={setS0} />;
      case 1:
        return <Section1_BEIE data={s1} onChange={setS1} />;
      case 2:
        return <Section2_MoralGov data={s2} onChange={setS2} />;
      case 3:
        return <Section3_Foundations data={s3} onChange={setS3} />;
      case 4:
        return <Section4_Transformers data={s4} onChange={setS4} />;
      case 5:
        return <Section5_Enablers data={s5} onChange={setS5} />;
      case 6:
        return <Section6_Connectors data={s6} onChange={setS6} />;
      case 7:
        return <Section7_Financiers data={s7} onChange={setS7} />;
      case 8:
        return <Section8_StrategicOptions data={s8} onChange={setS8} />;
      case 9:
        return <Section9_BudgetTargets data={s9} onChange={setS9} />;
      case 10:
        return <Section10_IEDSMatrix data={s10} onChange={setS10} />;
      case 11:
        return <Section11_Equity data={s11} onChange={setS11} />;
      case 12:
        return <Section12_Climate data={s12} onChange={setS12} />;
      case 13:
        return <Section13_Policy data={s13} onChange={setS13} />;
      case 14:
        return <Section14_Demographics data={s14} onChange={setS14} />;
      case 15:
        return <Section15_Submission data={s15} onChange={setS15} />;
      case 16:
        return <Section16_CARE data={s16} onChange={setS16} />;
      default:
        return null;
    }
  };

  // ─── Validation ────────────────────────────────────────────────────────────
  const validateStep = useCallback((): boolean => {
    // Pilot mode: minimal validation, only check consent on final step
    if (step === 15 && !s15.consent_final) {
      toast.error("Please confirm your consent to proceed.");
      return false;
    }
    if (step === 16) {
      const careFields = [s16.care_context, s16.care_action, s16.care_realtime, s16.care_evidence, s16.care_overall];
      const allFilled = careFields.every((v) => v !== undefined && v >= 1);
      if (!allFilled) {
        toast.error("Please complete all C.A.R.E. validation ratings.");
        return false;
      }
    }
    return true;
  }, [step, s15, s16]);

  // ─── Navigation ────────────────────────────────────────────────────────────
  const nextStep = () => {
    if (!validateStep()) return;
    if (step < STEP_LABELS.length - 1) setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Submission ────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload: Partial<SurveySchemaType> = {
        q1_1: s1.q1_1,
        q1_2: s1.q1_2,
        q2_1: s2.q2_1,
        q2_2: s2.q2_2,
        q2_3_archetype: s2.q2_3_archetype,
        q2_4_peace: s2.q2_4_peace,
        q3_1_priorities: s3.q3_1_priorities,
        q3_2_feasibility: s3.q3_2_feasibility,
        q3_el_nino_impact: s3.q3_el_nino_impact,
        q3_el_nino_like: s3.q3_el_nino_like,
        q3_pestalotiopsis_impact: s3.q3_pestalotiopsis_impact,
        q3_pestalotiopsis_like: s3.q3_pestalotiopsis_like,
        q3_postharvest_impact: s3.q3_postharvest_impact,
        q3_postharvest_like: s3.q3_postharvest_like,
        q3_limits_growth: s3.q3_limits_growth,
        q4_1_barrier: s4.q4_1_barrier,
        q4_2_halal_park: s4.q4_2_halal_park,
        q4_3_fixes_fail: s4.q4_3_fixes_fail,
        q4_4_commodity_impact: s4.q4_4_commodity_impact,
        q4_5_heds_ranking: s4.q4_5_heds_ranking,
        q5_1_infra: s5.q5_1_infra,
        q5_2_sectors: s5.q5_2_sectors,
        q5_3_broadband: s5.q5_3_broadband,
        q5_4_literacy: s5.q5_4_literacy,
        q5_5_stunting: s5.q5_5_stunting,
        q5_6_digital_divide: s5.q5_6_digital_divide,
        q6_1_bimpeaga: s6.q6_1_bimpeaga,
        q6_2_markets: s6.q6_2_markets,
        q6_3_export_target: s6.q6_3_export_target,
        q6_4_uae_feasibility: s6.q6_4_uae_feasibility,
        q6_5_perception: s6.q6_5_perception,
        q7_1_criticality: s7.q7_1_criticality,
        q7_2_instruments: s7.q7_2_instruments,
        q7_3_inclusion_target: s7.q7_3_inclusion_target,
        q7_4_asset_paradox: s7.q7_4_asset_paradox,
        q7_5_block_grant: s7.q7_5_block_grant,
        q8_1_strategy: s8.q8_1_strategy,
        q8_2_sequencing: s8.q8_2_sequencing,
        q8_3_comments: s8.q8_3_comments,
        q9_1_budget: s9.q9_1_budget,
        q10_1_ambition: s10.q10_1_ambition,
        q10_matrix: s10.q10_matrix,
        q11_1_affirmative: s11.q11_1_affirmative,
        q11_2_mechanisms: s11.q11_2_mechanisms,
        q12_1_green_priority: s12.q12_1_green_priority,
        q12_2_adaptation: s12.q12_2_adaptation,
        q13_1_legislation: s13.q13_1_legislation,
        q13_2_bicc: s13.q13_2_bicc,
        demo_category: s14.demo_category,
        demo_province: s14.demo_province,
        demo_expertise: s14.demo_expertise,
        demo_name: s14.demo_name,
        demo_email: s14.demo_email,
        demo_organization: s14.demo_organization,
        consent_final: s15.consent_final,
        care_context: s16.care_context,
        care_action: s16.care_action,
        care_realtime: s16.care_realtime,
        care_evidence: s16.care_evidence,
        care_overall: s16.care_overall,
      };

      const result = await submitSurvey(payload as SurveySchemaType);
      toast.success(result.message || "Survey submitted successfully!");
      setStep(STEP_LABELS.length - 1);
    } catch (err: any) {
      toast.error(err.message || "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Progress ──────────────────────────────────────────────────────────────
  const progress = ((step + 1) / STEP_LABELS.length) * 100;

  // ─── AI Assistant visibility: show in alternating sections ─────────────────
  const showAIAssistant = step % 2 === 1 && step > 0;

  // ─── Get current section's activeView for AI suggestions ───────────────────
  const getActiveView = (): string => {
    const viewMap: Record<number, string> = {
      0: "default",
      1: "strategy",
      2: "systems",
      3: "paps",
      4: "strategy",
      5: "paps",
      6: "strategy",
      7: "systems",
      8: "strategy",
      9: "paps",
      10: "scorecard",
      11: "paps",
      12: "paps",
      13: "systems",
      14: "default",
      15: "default",
      16: "default",
    };
    return viewMap[step] || "default";
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#065f46]">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#022c22]/95 backdrop-blur-sm border-b border-[#C9A84C]/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/bird-images/public/MTIT%20Logo.webp"
              alt="MTIT Logo"
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-base font-bold text-[#C9A84C] leading-tight">
                BIRD 2026–2035
              </h1>
              <p className="text-[10px] text-[#C9A84C]/70">Validation Survey</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-[#C9A84C]">
              Step {step + 1} of {STEP_LABELS.length}
            </p>
            <p className="text-xs text-[#C9A84C]/70">{STEP_LABELS[step]}</p>
          </div>
        </div>
        <div className="h-1 bg-[#C9A84C]/20">
          <div
            className="h-full bg-gradient-to-r from-[#C9A84C] to-[#1B4D3E] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Survey Questions */}
          <div className="lg:col-span-2 space-y-6">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={prevStep}
                disabled={step === 0}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  step === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-[#022c22] border border-[#C9A84C]/30 hover:bg-[#C9A84C]/10"
                }`}
              >
                ← Previous
              </button>

              {step === STEP_LABELS.length - 1 ? (
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#C9A84C] text-white hover:bg-[#b8943c] transition-all"
                >
                  Start New Survey
                </button>
              ) : step === 15 ? (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#C9A84C] to-[#1B4D3E] text-white hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Survey →"}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#1B4D3E] to-[#065f46] text-white hover:opacity-90 transition-all"
                >
                  Next →
                </button>
              )}
            </div>
          </div>

          {/* Right: Context Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ContextPanel sectionIndex={step} />
            </div>
          </div>
        </div>
      </main>

      {/* Floating AI Assistant */}
      {showAIAssistant && (
        <FloatingAIAssistant activeView={getActiveView()} />
      )}
    </div>
  );
};

export default SurveyWizard;