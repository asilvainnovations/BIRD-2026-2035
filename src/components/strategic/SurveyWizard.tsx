// src/components/strategic/SurveyWizard.tsx
"use client";
import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRight, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { surveySchema, SurveySchemaType, conditionalRules } from "@/lib/survey-schema";
import { submitSurvey } from "@/lib/api";

// Import all sections
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

// Kill switch prerequisites by section
const killSwitchPrerequisites = {
  1: ["q1_1", "q1_2"], // BEIE Framework
  2: ["q2_1", "q2_2", "q2_3_archetype"], // Moral Governance
  10: ["q10_matrix"], // IEDS Matrix - must be completed
  15: ["consent_final"], // Final consent
};

export function SurveyWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [sectionValidationErrors, setSectionValidationErrors] = useState<Record<number, string[]>>({});

  const form = useForm<SurveySchemaType>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      // Section 1
      q1_1: undefined,
      q1_2: undefined,
      // Section 2
      q2_1: undefined,
      q2_2: undefined,
      q2_3_archetype: undefined,
      q2_4_peace: [],
      // Section 3
      q3_1_priorities: [],
      q3_2_feasibility: undefined,
      q3_el_nino_impact: undefined,
      q3_el_nino_like: undefined,
      q3_pestalotiopsis_impact: undefined,
      q3_pestalotiopsis_like: undefined,
      q3_postharvest_impact: undefined,
      q3_postharvest_like: undefined,
      q3_limits_growth: undefined,
      // Section 4
      q4_1_barrier: undefined,
      q4_2_halal_park: undefined,
      q4_3_fixes_fail: undefined,
      q4_4_commodity_impact: undefined,
      q4_5_heds_ranking: [],
      // Section 5
      q5_1_infra: undefined,
      q5_2_sectors: [],
      q5_3_broadband: undefined,
      q5_4_literacy: undefined,
      q5_5_stunting: undefined,
      q5_6_digital_divide: undefined,
      // Section 6
      q6_1_bimpeaga: undefined,
      q6_2_markets: [],
      q6_3_export_target: undefined,
      q6_4_uae_feasibility: undefined,
      q6_5_perception: undefined,
      // Section 7
      q7_1_criticality: undefined,
      q7_2_instruments: [],
      q7_3_inclusion_target: undefined,
      q7_4_asset_paradox: undefined,
      q7_5_block_grant: undefined,
      // Section 8
      q8_1_strategy: undefined,
      q8_2_sequencing: undefined,
      q8_3_comments: "",
      // Section 9-10
      q9_1_budget: undefined,
      q10_1_ambition: undefined,
      q10_matrix: {
        heds: {
          economic_impact: 0,
          feasibility: 0,
          identity_alignment: 0,
          systems_leverage: 0,
          risk_return: 0,
          inclusivity: 0,
          sustainability: 0,
        },
        gems: {
          economic_impact: 0,
          feasibility: 0,
          identity_alignment: 0,
          systems_leverage: 0,
          risk_return: 0,
          inclusivity: 0,
          sustainability: 0,
        },
        ifes: {
          economic_impact: 0,
          feasibility: 0,
          identity_alignment: 0,
          systems_leverage: 0,
          risk_return: 0,
          inclusivity: 0,
          sustainability: 0,
        },
        ieds: {
          economic_impact: 0,
          feasibility: 0,
          identity_alignment: 0,
          systems_leverage: 0,
          risk_return: 0,
          inclusivity: 0,
          sustainability: 0,
        },
      },
      // Section 11
      q11_1_affirmative: undefined,
      q11_2_mechanisms: [],
      // Section 12
      q12_1_green_priority: undefined,
      q12_2_adaptation: [],
      // Section 13
      q13_1_legislation: [],
      q13_2_bicc: undefined,
      // Section 14
      demo_category: "",
      demo_province: "",
      demo_expertise: [],
      demo_name: "",
      demo_email: "",
      demo_organization: "",
      // Province-specific (conditional)
      basilan_peace_questions: undefined,
      maguindanao_halal_questions: undefined,
      tawitawi_seaweed_questions: undefined,
      lanao_lake_questions: undefined,
      // Section 15
      consent_final: false as never,
      // Section 16
      care_context: undefined,
      care_action: undefined,
      care_realtime: undefined,
      care_evidence: undefined,
      care_overall: undefined,
    },
    mode: "onTouched",
  });

  // Watch form values for conditional logic
  const formValues = useWatch({ control: form.control });

  // Calculate progress
  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  // Check if current section has kill switch prerequisites
  const checkKillSwitchPrerequisites = async (): Promise<boolean> => {
    const prerequisites = killSwitchPrerequisites[currentStep as keyof typeof killSwitchPrerequisites];
    if (!prerequisites) return true;

    const values = form.getValues();
    const missingFields = prerequisites.filter((field) => {
      const value = values[field as keyof SurveySchemaType];
      if (Array.isArray(value)) return value.length === 0;
      return value === undefined || value === "" || value === false;
    });

    if (missingFields.length > 0) {
      setSectionValidationErrors({
        ...sectionValidationErrors,
        [currentStep]: missingFields,
      });
      return false;
    }

    return true;
  };

  // Determine if section should be shown based on conditional logic
  const shouldShowSection = (step: number): boolean => {
    // Always show main sections
    if (step <= 14) return true;
    
    // Conditional sections based on province
    if (step === 15) {
      // Check if province-specific questions should appear
      const province = formValues.demo_province;
      if (province === "basilan") return true;
      if (province === "maguindanao_del_norte" || province === "maguindanao_del_sur") return true;
      if (province === "tawi_tawi") return true;
      if (province === "lanao_del_sur") return true;
      return false;
    }
    
    return true;
  };

  const handleNext = async () => {
    // Validate current section
    const isValid = await form.trigger();
    
    // Check kill switch prerequisites
    const prerequisitesMet = await checkKillSwitchPrerequisites();
    
    if (isValid && prerequisitesMet) {
      // Mark section as completed
      setCompletedSections((prev) => new Set(prev).add(currentStep));
      
      // Find next visible section
      let nextStep = currentStep + 1;
      while (nextStep <= TOTAL_STEPS && !shouldShowSection(nextStep)) {
        nextStep++;
      }
      
      if (nextStep <= TOTAL_STEPS) {
        setCurrentStep(nextStep);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      const errorMsg = !prerequisitesMet 
        ? "Please complete all required fields in this section before proceeding."
        : "Please review and correct the errors before proceeding.";
      
      toast({
        title: "Validation Required",
        description: errorMsg,
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      // Find previous visible section
      let prevStep = currentStep - 1;
      while (prevStep >= 1 && !shouldShowSection(prevStep)) {
        prevStep--;
      }
      
      if (prevStep >= 1) {
        setCurrentStep(prevStep);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  async function onSubmit(data: SurveySchemaType) {
    setIsSubmitting(true);
    try {
      await submitSurvey(data);
      setIsSuccess(true);
      toast({
        title: "Validation Submitted Successfully",
        description: "Your strategic input has been recorded in the BIRD repository.",
      });
    } catch (error) {
      console.error("Submission failed:", error);
      toast({
        title: "Submission Failed",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <Card className="w-full max-w-2xl border-[#C9A84C]/30 bg-[#022c22]/70 shadow-2xl">
          <CardHeader className="items-center">
            <CheckCircle2 className="w-20 h-20 text-[#C9A84C] mb-4 animate-pulse" />
            <CardTitle className="text-3xl font-serif text-[#C9A84C]">Validation Received</CardTitle>
            <CardDescription className="text-[#ecfdf5]/80 text-lg max-w-md">
              Thank you for shaping the Emerging Bangsamoro through the C.A.R.E. principles of Khalifa stewardship.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Badge className="border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#E8C560]">
              Secure submission completed
            </Badge>
            <Button 
              onClick={() => window.open("https://strategy-ai-planner-1.deploypad.app/", "_blank")}
              className="bg-[#C9A84C] hover:bg-[#E8C560] text-[#022c22] font-bold"
            >
              Access BIRD App →
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderSection = () => {
    switch (currentStep) {
      case 1: return <Section1_BEIE />;
      case 2: return <Section2_MoralGov />;
      case 3: return <Section3_Foundations />;
      case 4: return <Section4_Transformers />;
      case 5: return <Section5_Enablers />;
      case 6: return <Section6_Connectors />;
      case 7: return <Section7_Financiers />;
      case 8: return <Section8_StrategicOptions />;
      case 9: return <Section9_BudgetTargets />;
      case 10: return <Section10_IEDSMatrix />;
      case 11: return <Section11_Equity />;
      case 12: return <Section12_Climate />;
      case 13: return <Section13_Policy />;
      case 14: return <Section14_Demographics />;
      case 15: return <Section16_CARE />;
      case 16: return <Section15_Submission isSubmitting={isSubmitting} isSuccess={false} />;
      default: return <Section1_BEIE />;
    }
  };

  // Get current section title
  const getSectionTitle = (step: number) => {
    const titles: Record<number, string> = {
      1: "BEIE Framework Context",
      2: "Moral Governance Operating System",
      3: "Cluster 1: Foundations",
      4: "Cluster 2: Transformers",
      5: "Cluster 3: Enablers",
      6: "Cluster 4: Connectors",
      7: "Cluster 5: Financiers",
      8: "Strategic Options",
      9: "Budget & Targets",
      10: "IEDS Matrix Evaluation",
      11: "Provincial Equity",
      12: "Climate Resilience",
      13: "Policy & Governance",
      14: "Demographics",
      15: "C.A.R.E. Validation",
      16: "Final Submission",
    };
    return titles[step] || `Section ${step}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge className="rounded-full border-[#C9A84C]/40 bg-[#C9A84C]/10 text-[#E8C560]">
            Step {currentStep} of {TOTAL_STEPS}
          </Badge>
          <Badge variant="outline" className="border-[#C9A84C]/30 text-[#ecfdf5]/70">
            {getSectionTitle(currentStep)}
          </Badge>
          {completedSections.size > 0 && (
            <Badge className="border-green-500/40 bg-green-500/10 text-green-400">
              {completedSections.size} sections completed
            </Badge>
          )}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif text-[#C9A84C] text-center">
          BIRD 2026–2035 Validation Survey
        </h1>
        <p className="text-[#ecfdf5]/60 text-center">
          Progressive survey: Complete one section at a time. Your progress is saved automatically.
        </p>
        
        <Progress value={progressPercentage} className="h-2 bg-[#064e3b] [&>div]:bg-[#C9A84C]" />
      </div>

      {/* Kill Switch Alert */}
      {sectionValidationErrors[currentStep] && (
        <Alert className="mb-6 border-red-500/30 bg-red-500/10 text-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Required Fields Missing</AlertTitle>
          <AlertDescription>
            This section contains critical prerequisites that must be completed before proceeding.
          </AlertDescription>
        </Alert>
      )}

      {/* Conditional Logic Alert */}
      {formValues.demo_province && currentStep === 14 && (
        <Alert className="mb-6 border-blue-500/30 bg-blue-500/10 text-blue-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Province-Specific Questions</AlertTitle>
          <AlertDescription>
            Based on your province selection, additional targeted questions will appear in the next section.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="bg-[#022c22]/60 backdrop-blur-xl border-[#C9A84C]/30 shadow-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-[#C9A84C]">
                {getSectionTitle(currentStep)}
              </CardTitle>
              <CardDescription className="text-[#ecfdf5]/70">
                {currentStep <= 10 
                  ? "Core BEIE Framework Assessment" 
                  : currentStep <= 14 
                  ? "Strategic Evaluation & Planning" 
                  : "Final Validation & Submission"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-10">
              <div className="min-h-[500px]">{renderSection()}</div>
            </CardContent>
            <div className="bg-[#011a12]/50 border-t border-[#C9A84C]/20 p-4 md:p-6 flex justify-between items-center">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack} 
                disabled={currentStep === 1}
                className="border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 disabled:opacity-30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              
              {currentStep < TOTAL_STEPS ? (
                <Button 
                  type="button" 
                  onClick={handleNext}
                  className="bg-[#C9A84C] hover:bg-[#E8C560] text-[#022c22] font-bold shadow-lg shadow-[#C9A84C]/20"
                >
                  {currentStep === TOTAL_STEPS - 1 ? "Review & Submit" : "Next Section"} 
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#C9A84C] hover:bg-[#E8C560] text-[#022c22] font-bold shadow-lg shadow-[#C9A84C]/20"
                >
                  {isSubmitting ? "Submitting..." : "Submit Validation"} 
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </Card>
        </form>
      </Form>

      {/* Progress Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((step) => (
          <div
            key={step}
            className={`p-2 rounded text-xs text-center transition-all ${
              step === currentStep
                ? "bg-[#C9A84C] text-[#022c22] font-bold"
                : completedSections.has(step)
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-[#064e3b]/30 text-[#ecfdf5]/40"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
