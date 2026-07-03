// src/components/strategic/SurveyWizard.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

import { surveySchema, SurveySchemaType } from "@/lib/survey-schema";
import { submitSurvey } from "@/lib/api";

import { Section1_BEIE } from "./Section1_BEIE";
import { Section2_MoralGov } from "./Section2_MoralGov";
import { Section3_Foundations } from "./Section3_Foundations";
import { Section4_Transformers } from "./Section4_Transformers";
import { Section5_Enablers } from "./Section5_Enablers";
import { Section6_Connectors } from "./Section6_Connectors";
import { Section7_Financiers } from "./Section7_Financiers";
import { Section8_StrategicOptions } from "./Section8_StrategicOptions";
import { Section9_BudgetTargets } from "./Section9_BudgetTargets";
import { Section10_IEDSMatrix } from "./Section10_IEDSMatrix";
import { Section11_Equity } from "./Section11_Equity";
import { Section12_Climate } from "./Section12_Climate";
import { Section13_Policy } from "./Section13_Policy";
import { Section14_Demographics } from "./Section14_Demographics";
import { Section15_Submission } from "./Section15_Submission";
import { Section16_CARE } from "./Section16_CARE";

const TOTAL_STEPS = 16;

const emptyIeds = {
  economic_impact: 0, feasibility: 0, identity_alignment: 0,
  systems_leverage: 0, risk_return: 0, inclusivity: 0, sustainability: 0,
};

export function SurveyWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<SurveySchemaType>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      // Section 1
      q1_1: "", q1_2: "",
      // Section 2
      q2_1: "", q2_2: "", q2_3_archetype: "", q2_4_peace: [],
      // Section 3
      q3_1_priorities: [], q3_2_feasibility: "",
      q3_el_nino_impact: "", q3_el_nino_like: "",
      q3_pestalotiopsis_impact: "", q3_pestalotiopsis_like: "",
      q3_postharvest_impact: "", q3_postharvest_like: "",
      q3_limits_growth: "",
      // Section 4
      q4_1_barrier: "", q4_2_halal_park: "",
      q4_3_fixes_fail: "", q4_4_commodity_impact: "", q4_5_heds_ranking: [],
      // Section 5
      q5_1_infra: "", q5_2_sectors: [], q5_3_broadband: "",
      q5_4_literacy: "", q5_5_stunting: "", q5_6_digital_divide: "",
      // Section 6
      q6_1_bimpeaga: "", q6_2_markets: [], q6_3_export_target: "",
      q6_4_uae_feasibility: "", q6_5_perception: "",
      // Section 7
      q7_1_criticality: "", q7_2_instruments: [], q7_3_inclusion_target: "",
      q7_4_asset_paradox: "", q7_5_block_grant: "",
      // Section 8
      q8_1_strategy: "", q8_2_sequencing: "", q8_3_comments: "",
      // Section 9-10
      q9_1_budget: "", q10_1_ambition: "",
      q10_matrix: { heds: { ...emptyIeds }, gems: { ...emptyIeds }, ifes: { ...emptyIeds }, ieds: { ...emptyIeds } },
      // Section 11
      q11_1_affirmative: "", q11_2_mechanisms: [],
      // Section 12
      q12_1_green_priority: "", q12_2_adaptation: [],
      // Section 13
      q13_1_legislation: [], q13_2_bicc: "",
      // Section 14
      demo_category: "", demo_province: "", demo_expertise: [],
      demo_name: "", demo_email: "", demo_organization: "",
      // Section 15
      consent_final: false as never,
      // Section 16
      care_context: "", care_action: "", care_realtime: "", care_evidence: "", care_overall: "",
    },
    mode: "onTouched",
  });

  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (!isValid) {
      toast({ title: "Validation Required", description: "Please complete all required fields.", variant: "destructive" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  async function onSubmit(data: SurveySchemaType) {
    setIsSubmitting(true);
    try {
      await submitSurvey(data);
      setIsSuccess(true);
      toast({ title: "Success!", description: "Your validation has been securely recorded in the BIRD repository." });
    } catch (error) {
      console.error("Submission failed:", error);
      toast({ title: "Submission Failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <CheckCircle2 className="w-20 h-20 text-[#C9A84C] mb-6 animate-pulse" />
        <h2 className="text-3xl font-serif text-[#C9A84C] mb-4">Validation Received</h2>
        <p className="text-[#ecfdf5]/80 text-lg max-w-md mb-6">
          Thank you for shaping the Emerging Bangsamoro through the C.A.R.E. principles of Khalifa stewardship.
        </p>
        <Button onClick={() => window.open("https://strategy-ai-planner-1.deploypad.app/", "_blank")}
          className="bg-[#C9A84C] hover:bg-[#E8C560] text-[#022c22] font-bold">
          Access BIRD App →
        </Button>
      </div>
    );
  }

  const renderSection = () => {
    switch (currentStep) {
      case 1:  return <Section1_BEIE />;
      case 2:  return <Section2_MoralGov />;
      case 3:  return <Section3_Foundations />;
      case 4:  return <Section4_Transformers />;
      case 5:  return <Section5_Enablers />;
      case 6:  return <Section6_Connectors />;
      case 7:  return <Section7_Financiers />;
      case 8:  return <Section8_StrategicOptions />;
      case 9:  return <Section9_BudgetTargets />;
      case 10: return <Section10_IEDSMatrix />;
      case 11: return <Section11_Equity />;
      case 12: return <Section12_Climate />;
      case 13: return <Section13_Policy />;
      case 14: return <Section14_Demographics />;
      case 15: return <Section16_CARE />;  // CARE before final consent
      case 16: return <Section15_Submission isSubmitting={isSubmitting} isSuccess={false} />;
      default: return <Section1_BEIE />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-[#C9A84C] text-center mb-2">BIRD 2026–2035 Validation</h1>
        <p className="text-[#ecfdf5]/60 text-center mb-6">Step {currentStep} of {TOTAL_STEPS}</p>
        <Progress value={progressPercentage} className="h-2 bg-[#064e3b] [&>div]:bg-[#C9A84C]" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="bg-[#022c22]/60 backdrop-blur-xl border-[#C9A84C]/30 shadow-2xl overflow-hidden">
            <CardContent className="p-6 md:p-10">
              <div className="min-h-[500px]">{renderSection()}</div>
            </CardContent>
            <div className="bg-[#011a12]/50 border-t border-[#C9A84C]/20 p-4 md:p-6 flex justify-between items-center">
              <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1}
                className="border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 disabled:opacity-30">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              {currentStep < TOTAL_STEPS ? (
                <Button type="button" onClick={handleNext}
                  className="bg-[#C9A84C] hover:bg-[#E8C560] text-[#022c22] font-bold shadow-lg shadow-[#C9A84C]/20">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}
                  className="bg-[#C9A84C] hover:bg-[#E8C560] text-[#022c22] font-bold shadow-lg shadow-[#C9A84C]/20">
                  {isSubmitting ? "Securing Data..." : "Submit Validation"} <Send className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
