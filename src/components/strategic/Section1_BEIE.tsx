import React from "react";
import { useFormContext } from "react-hook-form";
import type { SurveySchemaType } from "./SurveyWizard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play, BookOpen, Sparkles } from "lucide-react";

export function Section1_BEIE() {
  const { register, formState: { errors } } = useFormContext<SurveySchemaType>();

  return (
    <div className="space-y-8">
      {/* ── Validation Survey Banner ── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Validation%20Survey%20Banner.png"
          alt="BIRD 2026-2035 Validation Survey Banner"
          className="w-full h-auto object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#011a12]/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <Badge className="bg-[#C9A84C]/20 text-[#E8C560] border-[#C9A84C]/40 text-[10px]">
            <Sparkles className="w-3 h-3 mr-1" /> Stakeholder Validation Portal
          </Badge>
        </div>
      </div>

      {/* ── Welcome & Context ── */}
      <Card className="border-[#C9A84C]/20 bg-[#022c22]/40">
        <CardHeader>
          <CardTitle className="text-xl font-serif text-[#C9A84C]">Welcome, Stakeholder</CardTitle>
          <CardDescription className="text-[#ecfdf5]/70">
            Your expertise shapes the Bangsamoro Investment Roadmap. This is not a test — there are no wrong answers.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#ecfdf5]/80 leading-relaxed">
            The <strong className="text-[#E8C560]">BEIE Framework</strong> (Bangsamoro Economic and Investment Ecosystem)
            groups BARMM's economy into 5 connected clusters — Foundations, Transformers, Enablers, Connectors,
            and Financiers — all under <strong className="text-[#E8C560]">Moral Governance</strong>. Your honest,
            experience-backed input will directly shape a <strong className="text-[#E8C560]">PhP 120–160 billion</strong> investment roadmap.
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-[#ecfdf5]/50">
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#C9A84C]" /> Works offline</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#C9A84C]" /> Autosaves progress</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#C9A84C]" /> 15–25 minutes</span>
          </div>
        </CardContent>
      </Card>

      {/* ── BEIE Video Embed ── */}
      <Card className="border-[#C9A84C]/20 bg-[#022c22]/40 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-serif text-[#C9A84C] flex items-center gap-2">
            <Play className="w-5 h-5" /> Understanding the BEIE Framework
          </CardTitle>
          <CardDescription className="text-[#ecfdf5]/60">
            Watch this 5-minute overview before you begin. It explains how the 5 clusters interconnect under Moral Governance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-lg border border-[#C9A84C]/20" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/0J491Vqya_4"
              title="Context Analysis and the BEIE Framework"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          <p className="text-xs text-[#ecfdf5]/40 text-center">
            New to the BEIE Framework? This video covers the 5 clusters, causal loop thinking, and how Moral Governance underpins everything.
          </p>
        </CardContent>
      </Card>

      {/* ── Student Guide CTA ── */}
      <Card className="border-[#C9A84C]/20 bg-gradient-to-r from-[#022c22]/60 to-[#064e3b]/30">
        <CardContent className="p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h4 className="font-serif text-[#C9A84C] text-sm font-bold mb-1">Want a deeper dive?</h4>
            <p className="text-xs text-[#ecfdf5]/60">
              The BEIE Student Guide provides detailed explanations of each cluster, the systems thinking approach,
              and how your input feeds into the investment roadmap.
            </p>
          </div>
          <a
            href="https://asilvainnovations.github.io/BIRD-2026-2035/public/student-guide.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 whitespace-nowrap">
              <BookOpen className="w-4 h-4 mr-2" /> Open BEIE Student Guide
            </Button>
          </a>
        </CardContent>
      </Card>

      <Separator className="bg-[#C9A84C]/20" />

      {/* ── Question 1 ── */}
      <div className="space-y-3">
        <Label className="text-[#E8C560] font-semibold text-base">
          Understanding of BEIE Framework <span className="text-red-400 text-xs font-normal">(Recommended)</span>
        </Label>
        <p className="text-xs text-[#ecfdf5]/50">How well do you understand the 5-cluster BEIE framework? No wrong answer — this helps us calibrate.</p>
        <RadioGroup {...register("q1_1")} className="space-y-2">
          {[
            { value: "expert", label: "Expert — Deep understanding of all clusters" },
            { value: "advanced", label: "Advanced — Strong grasp of framework" },
            { value: "intermediate", label: "Intermediate — Familiar with core concepts" },
            { value: "basic", label: "Basic — Limited exposure" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-3 p-2.5 rounded-lg border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 transition-all cursor-pointer">
              <RadioGroupItem value={opt.value} id={`q1_1_${opt.value}`} className="border-[#C9A84C]/50 text-[#C9A84C]" />
              <Label htmlFor={`q1_1_${opt.value}`} className="text-sm text-[#ecfdf5]/80 cursor-pointer flex-1">{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* ── Question 2 ── */}
      <div className="space-y-3">
        <Label className="text-[#E8C560] font-semibold text-base">
          Relevance of BEIE to BARMM <span className="text-red-400 text-xs font-normal">(Recommended)</span>
        </Label>
        <p className="text-xs text-[#ecfdf5]/50">How relevant is the BEIE framework to BARMM's actual economic conditions?</p>
        <RadioGroup {...register("q1_2")} className="space-y-2">
          {[
            { value: "critical", label: "Critical — Essential for transformation" },
            { value: "high", label: "High — Very relevant to context" },
            { value: "moderate", label: "Moderate — Somewhat relevant" },
            { value: "low", label: "Low — Limited applicability" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-3 p-2.5 rounded-lg border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5 transition-all cursor-pointer">
              <RadioGroupItem value={opt.value} id={`q1_2_${opt.value}`} className="border-[#C9A84C]/50 text-[#C9A84C]" />
              <Label htmlFor={`q1_2_${opt.value}`} className="text-sm text-[#ecfdf5]/80 cursor-pointer flex-1">{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
