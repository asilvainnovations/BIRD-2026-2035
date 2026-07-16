import React from "react";
import { useFormContext } from "react-hook-form";
import type { SurveySchemaType } from "./SurveyWizard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp } from "lucide-react";

export function Section2_MoralGov() {
  const { register, watch } = useFormContext<SurveySchemaType>();
  const selectedPeace = watch("q2_4_peace") || [];

  return (
    <div className="space-y-8">
      {/* ── Context Card ── */}
      <Card className="border-[#C9A84C]/20 bg-[#022c22]/40">
        <CardHeader>
          <CardTitle className="text-xl font-serif text-[#C9A84C] flex items-center gap-2">
            <Shield className="w-5 h-5" /> Moral Governance Operating System
          </CardTitle>
          <CardDescription className="text-[#ecfdf5]/70">
            Moral Governance means transparency, accountability, and Islamic ethics guiding how investment decisions are made —
            the "operating system" that determines whether all other clusters function well.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* ── Operating Systems Image ── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/3.%20MG.png"
          alt="Operating Systems: Moral Governance at the Core"
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#011a12]/90 via-[#011a12]/50 to-transparent p-4">
          <p className="text-xs text-[#ecfdf5]/60 font-medium">
            Moral Governance sits at the center of the BEIE Framework — it is the operating system that determines
            whether Foundations, Transformers, Enablers, Connectors, and Financiers function as an integrated ecosystem.
          </p>
        </div>
      </div>

      {/* ── Q1: Importance ── */}
      <div className="space-y-3">
        <Label className="text-[#E8C560] font-semibold text-base">
          Importance of Moral Governance <span className="text-[#ecfdf5]/40 text-xs font-normal">(Recommended)</span>
        </Label>
        <p className="text-xs text-[#ecfdf5]/50">Rate how important moral governance is for BARMM's investment climate.</p>
        <RadioGroup {...register("q2_1")} className="space-y-2">
          {[
            { value: "1", label: "1 — Not important" },
            { value: "2", label: "2 — Somewhat important" },
            { value: "3", label: "3 — Important" },
            { value: "4", label: "4 — Very important" },
            { value: "5", label: "5 — Critical" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-3 p-2.5 rounded-lg border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 transition-all cursor-pointer">
              <RadioGroupItem value={opt.value} id={`q2_1_${opt.value}`} className="border-[#C9A84C]/50 text-[#C9A84C]" />
              <Label htmlFor={`q2_1_${opt.value}`} className="text-sm text-[#ecfdf5]/80 cursor-pointer flex-1">{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* ── Q2: Implementation Readiness ── */}
      <div className="space-y-3">
        <Label className="text-[#E8C560] font-semibold text-base">
          Implementation Readiness <span className="text-[#ecfdf5]/40 text-xs font-normal">(Recommended)</span>
        </Label>
        <p className="text-xs text-[#ecfdf5]/50">How ready is BARMM to implement moral governance principles at scale?</p>
        <RadioGroup {...register("q2_2")} className="space-y-2">
          {[
            { value: "1", label: "1 — Not ready" },
            { value: "2", label: "2 — Barely ready" },
            { value: "3", label: "3 — Moderately ready" },
            { value: "4", label: "4 — Mostly ready" },
            { value: "5", label: "5 — Fully ready" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-3 p-2.5 rounded-lg border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 transition-all cursor-pointer">
              <RadioGroupItem value={opt.value} id={`q2_2_${opt.value}`} className="border-[#C9A84C]/50 text-[#C9A84C]" />
              <Label htmlFor={`q2_2_${opt.value}`} className="text-sm text-[#ecfdf5]/80 cursor-pointer flex-1">{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* ── Q3: Peace Milestones ── */}
      <div className="space-y-3">
        <Label className="text-[#E8C560] font-semibold text-base">
          Peace Milestones <span className="text-[#ecfdf5]/40 text-xs font-normal">(Optional — check all that apply)</span>
        </Label>
        <p className="text-xs text-[#ecfdf5]/50">Which peace milestones have you observed or participated in?</p>
        <div className="space-y-2">
          {[
            { value: "basilan_asg_free", label: "Basilan ASG-Free Declaration (2024)" },
            { value: "marawi_rehab", label: "Marawi Rehabilitation Progress" },
            { value: "normalization", label: "Normalization Program Implementation" },
            { value: "cab_anniversary", label: "CAB Anniversary Commemorations" },
            { value: "bta_elections", label: "BTA Election Preparations" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-3 p-2.5 rounded-lg border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 transition-all cursor-pointer">
              <Checkbox
                id={`q2_4_${opt.value}`}
                {...register("q2_4_peace")}
                value={opt.value}
                checked={selectedPeace.includes(opt.value)}
                className="border-[#C9A84C]/50 data-[state=checked]:bg-[#C9A84C] data-[state=checked]:border-[#C9A84C]"
              />
              <Label htmlFor={`q2_4_${opt.value}`} className="text-sm text-[#ecfdf5]/80 cursor-pointer flex-1">{opt.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-[#C9A84C]/20" />

      {/* ── NEW: Moral Governance De-Risking Question ── */}
      <Card className="border-[#C9A84C]/20 bg-gradient-to-br from-[#022c22]/60 to-[#064e3b]/20 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-serif text-[#C9A84C] flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> How Moral Governance De-Risks Capital
          </CardTitle>
          <CardDescription className="text-[#ecfdf5]/60">
            The diagram shows how moral governance creates a positive cycle that reduces risks for investors.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* De-risking image */}
          <div className="relative w-full overflow-hidden rounded-lg border border-[#C9A84C]/20 group">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/12.%20How%20moral%20Governance%20De-Risks%20Capital.png"
              alt="How Moral Governance De-Risks Capital — Positive feedback cycle"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>

          <p className="text-xs text-[#ecfdf5]/60 leading-relaxed">
            Strong governance and transparency <strong className="text-[#E8C560]">lower bureaucratic friction</strong>,
            which <strong className="text-[#E8C560]">builds investor confidence</strong>, which
            <strong className="text-[#E8C560]"> attracts foreign direct investment (FDI)</strong>, which
            <strong className="text-[#E8C560]"> increases regional revenues</strong>. Each element reinforces the others,
            making private investments safer and more sustainable.
          </p>

          {/* De-risking agreement question */}
          <div className="space-y-3 pt-2">
            <Label className="text-[#E8C560] font-semibold">
              How strongly do you agree that moral governance reduces risks and encourages private investment in BARMM?
              <span className="text-[#ecfdf5]/40 text-xs font-normal ml-1">(Recommended)</span>
            </Label>
            <RadioGroup {...register("q2_5_moral_governance_risk")} className="space-y-2">
              {[
                { value: "strongly_agree", label: "Strongly Agree" },
                { value: "agree", label: "Agree" },
                { value: "neutral", label: "Neutral" },
                { value: "disagree", label: "Disagree" },
                { value: "strongly_disagree", label: "Strongly Disagree" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center space-x-3 p-2.5 rounded-lg border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 transition-all cursor-pointer">
                  <RadioGroupItem value={opt.value} id={`q2_5_${opt.value}`} className="border-[#C9A84C]/50 text-[#C9A84C]" />
                  <Label htmlFor={`q2_5_${opt.value}`} className="text-sm text-[#ecfdf5]/80 cursor-pointer flex-1">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
