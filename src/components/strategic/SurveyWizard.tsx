import React, { useState, useCallback, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/lib/supabase";
import {
  Save, Send, ChevronRight, ChevronLeft, RotateCcw,
  CheckCircle2, Sparkles, BarChart3, ArrowRight, Eye, Info
} from "lucide-react";

import { Section0_Orientation } from "./Section0_Orientation";
import { Section1_BEIE } from "./Section1_BEIE";
import { Section2_MoralGov } from "./Section2_MoralGov";
import { Section3_Foundations } from "./Section3_Foundations";
import { Section4_Transformers } from "./Section4_Transformers";
import { Section5_Enablers } from "./Section5_Enablers";
import { Section6_Connectors } from "./Section6_Connectors";
import { Section7_Financiers } from "./Section7_Financiers";
import { Section8_StrategicOptions } from "./Section8_StrategicOptions";
import { Section9_BudgetTargets } from "./Section9_BudgetTargets";
import { Section10_IEDSMx } from "./Section10_IEDSMx";
import { Section11_ProvincialEquity } from "./Section11_ProvincialEquity";
import { Section12_ClimateResilience } from "./Section12_ClimateResilience";
import { Section13_PolicyGovernance } from "./Section13_PolicyGovernance";
import { Section14_Demographics } from "./Section14_Demographics";
import { Section15_CARE } from "./Section15_CARE";
import { Section16_FinalSubmission } from "./Section16_FinalSubmission";
import { ContextStrip } from "./ContextPanel";

// ═══════════════════════════════════════════════════════════════════════════════
// PILOT MODE SURVEY SCHEMA — ALL FIELDS OPTIONAL
// ═══════════════════════════════════════════════════════════════════════════════
export const surveySchema = z.object({
  q1_1: z.string().optional(), q1_2: z.string().optional(),
  q2_1: z.string().optional(), q2_2: z.string().optional(),
  q2_3_archetype: z.string().optional(), q2_4_peace: z.array(z.string()).default([]),
  q2_5_moral_governance_risk: z.string().optional(),
  q3_1_priorities: z.array(z.string()).default([]), q3_2_feasibility: z.string().optional(),
  q3_aff_base_impact: z.string().optional(), q3_aff_base_likelihood: z.string().optional(),
  q3_el_nino_impact: z.string().optional(), q3_el_nino_like: z.string().optional(),
  q3_pestalotiopsis_impact: z.string().optional(), q3_pestalotiopsis_like: z.string().optional(),
  q3_postharvest_impact: z.string().optional(), q3_postharvest_like: z.string().optional(),
  q4_1_barrier: z.string().optional(), q4_2_halal_park: z.string().optional(),
  q4_3_fixes_fail: z.string().optional(), q4_4_commodity_impact: z.string().optional(),
  q4_5_heds_ranking: z.array(z.string()).default(["Halal Certification (BHB)","Halal Park (Matanog)","UAE Export Corridor","Islamic Finance for Halal MSMEs"]),
  q5_1_infra: z.string().optional(), q5_2_sectors: z.array(z.string()).default([]),
  q5_3_broadband: z.string().optional(), q5_4_literacy: z.string().optional(),
  q5_5_stunting: z.string().optional(), q5_6_digital_divide: z.string().optional(),
  q6_1_bimpeaga: z.string().optional(), q6_2_markets: z.array(z.string()).default([]),
  q6_3_export_target: z.string().optional(), q6_4_uae_feasibility: z.string().optional(),
  q6_5_perception: z.string().optional(),
  q7_1_criticality: z.string().optional(), q7_2_instruments: z.array(z.string()).default([]),
  q7_3_inclusion_target: z.string().optional(), q7_4_asset_paradox: z.string().optional(),
  q7_5_block_grant: z.string().optional(),
  q8_1_strategy: z.string().optional(), q8_2_sequencing: z.string().optional(),
  q8_3_comments: z.string().optional(),
  q9_1_budget: z.string().optional(),
  q10_1_ambition: z.string().optional(),
  q10_matrix: z.record(z.record(z.number())).default({}),
  q11_1_affirmative: z.string().optional(), q11_2_mechanisms: z.array(z.string()).default([]),
  q12_1_green_priority: z.string().optional(), q12_2_adaptation: z.array(z.string()).default([]),
  q13_1_legislation: z.array(z.string()).default([]), q13_2_bicc: z.string().optional(),
  demo_category: z.string().optional(), demo_province: z.string().optional(),
  demo_expertise: z.array(z.string()).default([]), demo_name: z.string().optional(),
  demo_email: z.string().email().optional().or(z.literal("")),
  demo_organization: z.string().optional(),
  provincial_basilan: z.string().optional(), provincial_maguindanao: z.string().optional(),
  provincial_tawitawi: z.string().optional(), provincial_lanao: z.string().optional(),
  care_context: z.string().optional(), care_action: z.string().optional(),
  care_realtime: z.string().optional(), care_evidence: z.string().optional(),
  care_overall: z.string().optional(),
  consent_final: z.boolean().default(false),
});
export type SurveySchemaType = z.infer<typeof surveySchema>;

const STEPS = [
  { id: 1, title: "BEIE Framework Context", component: Section1_BEIE, group: "Framework & Governance" },
  { id: 2, title: "Moral Governance OS", component: Section2_MoralGov, group: "Framework & Governance" },
  { id: 3, title: "Cluster 1: Foundations", component: Section3_Foundations, group: "BEIE Clusters" },
  { id: 4, title: "Cluster 2: Transformers", component: Section4_Transformers, group: "BEIE Clusters" },
  { id: 5, title: "Cluster 3: Enablers", component: Section5_Enablers, group: "BEIE Clusters" },
  { id: 6, title: "Cluster 4: Connectors", component: Section6_Connectors, group: "BEIE Clusters" },
  { id: 7, title: "Cluster 5: Financiers", component: Section7_Financiers, group: "BEIE Clusters" },
  { id: 8, title: "Strategic Options", component: Section8_StrategicOptions, group: "Strategy & Planning" },
  { id: 9, title: "Budget & Targets", component: Section9_BudgetTargets, group: "Strategy & Planning" },
  { id: 10, title: "IEDS Matrix", component: Section10_IEDSMx, group: "Strategy & Planning" },
  { id: 11, title: "Provincial Equity", component: Section11_ProvincialEquity, group: "Equity & Resilience" },
  { id: 12, title: "Climate Resilience", component: Section12_ClimateResilience, group: "Equity & Resilience" },
  { id: 13, title: "Policy & Governance", component: Section13_PolicyGovernance, group: "Equity & Resilience" },
  { id: 14, title: "Demographics", component: Section14_Demographics, group: "Validation" },
  { id: 15, title: "C.A.R.E. Validation", component: Section15_CARE, group: "Validation" },
  { id: 16, title: "Final Submission", component: Section16_FinalSubmission, group: "Submission" },
];
const TOTAL_STEPS = STEPS.length;
const STORAGE_KEY = "bird_survey_draft_v5";

export function SurveyWizard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([1]));

  const form = useForm<SurveySchemaType>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      q2_4_peace: [], q3_1_priorities: [],
      q4_5_heds_ranking: ["Halal Certification (BHB)","Halal Park (Matanog)","UAE Export Corridor","Islamic Finance for Halal MSMEs"],
      q5_2_sectors: [], q6_2_markets: [], q7_2_instruments: [],
      q8_1_strategy: "ieds", q10_matrix: {},
      q11_2_mechanisms: [], q12_2_adaptation: [], q13_1_legislation: [],
      demo_expertise: [], consent_final: false,
    },
    mode: "onChange",
  });

  // Autosave
  useEffect(() => {
    const sub = form.watch((data) => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, currentStep })); } catch {}
    });
    return () => sub.unsubscribe();
  }, [form, currentStep]);

  // Restore draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) { const p = JSON.parse(raw); if (p.currentStep) setCurrentStep(p.currentStep); form.reset(p); }
    } catch {}
  }, [form]);

  // PILOT MODE: Free navigation — no validation blocking
  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
      setVisitedSteps(prev => new Set(prev).add(step));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const nextStep = useCallback(() => {
    setVisitedSteps(prev => new Set(prev).add(currentStep));
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const prevStep = useCallback(() => goToStep(currentStep - 1), [currentStep, goToStep]);

  const progress = (currentStep / TOTAL_STEPS) * 100;
  const CurrentComponent = STEPS[currentStep - 1]?.component;

  // Submit
  const onSubmit = useCallback(async (data: SurveySchemaType) => {
    setIsSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const payload = { id, user_id: user?.id || null, data, submitted_at: new Date().toISOString() };
      const { error } = await supabase.from("survey_responses").insert([payload]);
      if (error) throw error;
      setSubmissionId(id); setSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
      toast({ title: "Survey Submitted", description: `ID: ${id.slice(0, 8)}...` });
    } catch (err: any) {
      toast({ title: "Submission Failed", description: err.message, variant: "destructive" });
    } finally { setIsSubmitting(false); }
  }, [user, toast]);

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY); form.reset();
    setCurrentStep(1); setVisitedSteps(new Set([1]));
    setSubmitted(false); setShowResetDialog(false);
    toast({ title: "Survey Reset" });
  };

  // Success screen
  if (submitted) return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="max-w-lg w-full border-[#C9A84C]/30 bg-[#011a12]/80">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <CardTitle className="text-2xl font-serif text-[#C9A84C]">Shukran — Your Voice Is Recorded</CardTitle>
          <CardDescription className="text-[#ecfdf5]/70">Thank you for validating the BIRD 2026–2035 Investment Roadmap.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-sm text-[#ecfdf5]/60">Submission ID: <code className="text-[#E8C560] font-mono">{submissionId}</code></p>
          <div className="flex flex-col gap-3">
            <Button onClick={() => navigate("/dashboard")} className="bg-[#C9A84C] text-[#022c22] hover:bg-[#E8C560] font-bold">
              <BarChart3 className="w-4 h-4 mr-2" /> View Live Dashboard
            </Button>
            <Button variant="outline" onClick={() => { setSubmitted(false); setCurrentStep(1); }} className="border-[#C9A84C]/30 text-[#C9A84C]">
              <RotateCcw className="w-4 h-4 mr-2" /> Submit Another Response
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <FormProvider {...form}>
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* ── Sticky Header ── */}
        <div className="sticky top-0 z-40 bg-[#011a12]/95 backdrop-blur-md border border-[#C9A84C]/20 rounded-xl p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="border-[#C9A84C]/40 text-[#C9A84C] text-[10px]">BIRD 2026–2035 Validation Survey</Badge>
                <Badge variant="outline" className="border-cyan-500/40 text-cyan-400 text-[10px]">
                  <Sparkles className="w-3 h-3 mr-1" /> Pilot Mode — Navigate Freely
                </Badge>
              </div>
              <h2 className="text-lg font-serif text-[#C9A84C]">Step {currentStep} of {TOTAL_STEPS}: {STEPS[currentStep - 1]?.title}</h2>
              <p className="text-xs text-[#ecfdf5]/50">{STEPS[currentStep - 1]?.group}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowResetDialog(true)} className="text-[#ecfdf5]/40 hover:text-[#C9A84C]">
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="text-[#ecfdf5]/40 hover:text-[#C9A84C]">
                <BarChart3 className="w-3.5 h-3.5 mr-1" /> Dashboard
              </Button>
            </div>
          </div>
          <Progress value={progress} className="h-2 bg-[#022c22]" />

          {/* Step Pills — PILOT: all steps clickable */}
          <div className="flex flex-wrap gap-1.5">
            {STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => goToStep(s.id)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                  s.id === currentStep
                    ? "bg-[#C9A84C] text-[#022c22]"
                    : visitedSteps.has(s.id)
                    ? "bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/30"
                    : "bg-[#011a12]/60 text-[#ecfdf5]/30 border border-[#C9A84C]/10 hover:border-[#C9A84C]/30"
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>
        </div>

        {/* ── Context Strip ── */}
        <ContextStrip sectionId={STEPS[currentStep - 1]?.group || "general"} />

        {/* ── Main Form ── */}
        <Card className="border-[#C9A84C]/20 bg-[#011a12]/60 backdrop-blur-sm">
          <CardContent className="p-6 md:p-8">
            {CurrentComponent && <CurrentComponent />}
          </CardContent>
        </Card>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/10 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                const data = form.getValues();
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, currentStep }));
                toast({ title: "Draft Saved" });
              }}
              className="text-[#ecfdf5]/50 hover:text-[#C9A84C]"
            >
              <Save className="w-4 h-4 mr-2" /> Save Draft
            </Button>

            {currentStep < TOTAL_STEPS ? (
              <Button onClick={nextStep} className="bg-[#C9A84C] text-[#022c22] hover:bg-[#E8C560] font-bold">
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="bg-[#C9A84C] text-[#022c22] hover:bg-[#E8C560] font-bold"
              >
                {isSubmitting ? "Submitting..." : (<><Send className="w-4 h-4 mr-2" /> Submit Survey</>)}
              </Button>
            )}
          </div>
        </div>

        {/* ── Reset Dialog ── */}
        <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <DialogContent className="bg-[#011a12] border-[#C9A84C]/30 text-[#ecfdf5]">
            <DialogHeader>
              <DialogTitle className="text-[#C9A84C] font-serif">Reset Survey?</DialogTitle>
              <DialogDescription className="text-[#ecfdf5]/60">All responses will be cleared. This cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setShowResetDialog(false)} className="text-[#ecfdf5]/60">Cancel</Button>
              <Button onClick={handleReset} variant="destructive">Reset Survey</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Pilot Mode Notice ── */}
        <div className="text-center pb-4">
          <p className="text-[10px] text-[#ecfdf5]/30 font-mono">
            PILOT MODE: Navigate freely between sections. Only the final consent checkbox is required for submission.
          </p>
        </div>
      </div>
    </FormProvider>
  );
}
