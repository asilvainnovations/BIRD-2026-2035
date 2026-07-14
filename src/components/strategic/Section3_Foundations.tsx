import React from "react";
import { useFormContext } from "react-hook-form";
import type { SurveySchemaType } from "./SurveyWizard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Sprout, CloudRain } from "lucide-react";

export function Section3_Foundations() {
  const { register, watch } = useFormContext<SurveySchemaType>();
  const province = watch("demo_province");

  return (
    <div className="space-y-8">
      {/* ── Context Card ── */}
      <Card className="border-[#C9A84C]/20 bg-[#022c22]/40">
        <CardHeader>
          <CardTitle className="text-xl font-serif text-[#C9A84C] flex items-center gap-2">
            <Sprout className="w-5 h-5" /> Cluster 1: Foundations
          </CardTitle>
          <CardDescription className="text-[#ecfdf5]/70">
            Foundations are the raw-material base of BARMM's economy: Agriculture, Fisheries, Forestry, and Energy.
            Everything else is built on top of these.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* ── Cluster 1 Foundations Image ── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/10.%20Cluster%201.png"
          alt="Cluster 1: Foundations — Agriculture, Fisheries, Forestry, and Energy"
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#011a12]/90 via-[#011a12]/50 to-transparent p-4">
          <p className="text-xs text-[#ecfdf5]/60 font-medium">
            BARMM's Foundations cluster encompasses agriculture (rice, corn, coconut, rubber), fisheries
            (tuna, seaweed), forestry (mangroves, timber), and energy (geothermal, solar potential).
          </p>
        </div>
      </div>

      {/* ── Provincial Context Alert (Basilan) ── */}
      {province === "basilan" && (
        <Card className="border-amber-500/30 bg-amber-500/10">
          <CardContent className="p-4 flex items-start gap-3">
            <CloudRain className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-400">Provincial Context: Basilan</p>
              <p className="text-xs text-[#ecfdf5]/70 mt-1">
                As a Basilan stakeholder, please pay special attention to the
                <strong className="text-[#E8C560]"> Pestalotiopsis fungal disease</strong> impact on
                rubber plantations and the <strong className="text-[#E8C560]">ZBIP</strong> (Zamboanga-Basilan
                Interconnection Project) energy link in your assessment.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── NEW: AFF Base Strength Question ── */}
      <Card className="border-[#C9A84C]/20 bg-gradient-to-br from-[#022c22]/60 to-[#064e3b]/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-serif text-[#C9A84C]">BARMM's AFF Base Strength</CardTitle>
          <CardDescription className="text-[#ecfdf5]/60">
            Rate the strength of BARMM's Agriculture, Fisheries, and Forestry (AFF) base as a foundation
            for investment and economic growth.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-[#E8C560] font-semibold">
              Impact: How strong is BARMM's AFF base as an economic foundation?
              <span className="text-[#ecfdf5]/40 text-xs font-normal ml-1">(Recommended)</span>
            </Label>
            <RadioGroup {...register("q3_aff_base_impact")} className="space-y-2">
              {[
                { value: "1", label: "1 — Very weak base, major gaps" },
                { value: "2", label: "2 — Weak, significant improvements needed" },
                { value: "3", label: "3 — Moderate, some strengths exist" },
                { value: "4", label: "4 — Strong, good foundation" },
                { value: "5", label: "5 — Very strong, excellent foundation" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center space-x-3 p-2.5 rounded-lg border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 transition-all cursor-pointer">
                  <RadioGroupItem value={opt.value} id={`q3_aff_i_${opt.value}`} className="border-[#C9A84C]/50 text-[#C9A84C]" />
                  <Label htmlFor={`q3_aff_i_${opt.value}`} className="text-sm text-[#ecfdf5]/80 cursor-pointer flex-1">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-[#E8C560] font-semibold">
              Likelihood: How likely is the AFF base to sustain investment growth over 2026–2035?
              <span className="text-[#ecfdf5]/40 text-xs font-normal ml-1">(Recommended)</span>
            </Label>
            <RadioGroup {...register("q3_aff_base_likelihood")} className="space-y-2">
              {[
                { value: "1", label: "1 — Very unlikely" },
                { value: "2", label: "2 — Unlikely" },
                { value: "3", label: "3 — Possible with support" },
                { value: "4", label: "4 — Likely" },
                { value: "5", label: "5 — Very likely" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center space-x-3 p-2.5 rounded-lg border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 transition-all cursor-pointer">
                  <RadioGroupItem value={opt.value} id={`q3_aff_l_${opt.value}`} className="border-[#C9A84C]/50 text-[#C9A84C]" />
                  <Label htmlFor={`q3_aff_l_${opt.value}`} className="text-sm text-[#ecfdf5]/80 cursor-pointer flex-1">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Separator className="bg-[#C9A84C]/20" />

      {/* ── Feasibility ── */}
      <div className="space-y-3">
        <Label className="text-[#E8C560] font-semibold text-base">
          Overall Feasibility of Foundations Cluster <span className="text-[#ecfdf5]/40 text-xs font-normal">(Recommended)</span>
        </Label>
        <p className="text-xs text-[#ecfdf5]/50">Rate the overall feasibility of developing BARMM's Foundations cluster.</p>
        <RadioGroup {...register("q3_2_feasibility")} className="space-y-2">
          {[
            { value: "1", label: "1 — Low feasibility" },
            { value: "2", label: "2 — Below average" },
            { value: "3", label: "3 — Moderate" },
            { value: "4", label: "4 — High" },
            { value: "5", label: "5 — Very high" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-3 p-2.5 rounded-lg border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 transition-all cursor-pointer">
              <RadioGroupItem value={opt.value} id={`q3_2_${opt.value}`} className="border-[#C9A84C]/50 text-[#C9A84C]" />
              <Label htmlFor={`q3_2_${opt.value}`} className="text-sm text-[#ecfdf5]/80 cursor-pointer flex-1">{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* ── Climate Risk: El Niño ── */}
      <Card className="border-[#C9A84C]/20 bg-[#022c22]/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-serif text-[#C9A84C] flex items-center gap-2">
            <CloudRain className="w-4 h-4" /> Climate Risk: El Niño
          </CardTitle>
          <CardDescription className="text-[#ecfdf5]/50 text-xs">
            El Niño drought caused &#8369;346 million in crop losses in Maguindanao del Sur in 2024.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-[#E8C560]">Impact of El Niño</Label>
              <input type="range" min="1" max="5" {...register("q3_el_nino_impact")} className="w-full accent-[#C9A84C]" />
              <div className="flex justify-between text-[10px] text-[#ecfdf5]/40"><span>Low</span><span>High</span></div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-[#E8C560]">Likelihood of Recurrence</Label>
              <input type="range" min="1" max="5" {...register("q3_el_nino_like")} className="w-full accent-[#C9A84C]" />
              <div className="flex justify-between text-[10px] text-[#ecfdf5]/40"><span>Low</span><span>High</span></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
