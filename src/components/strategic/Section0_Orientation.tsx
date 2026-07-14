// src/components/strategic/Section0_Orientation.tsx
// Section 0: Orientation & Respondent Onboarding
// Welcomes the respondent, collects consent, sets context for the validation survey.
// Aligned with BIRD 2026-2035 BEIE Framework — DARK mode design system.

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  BookOpen,
  Globe,
  Users,
  Sparkles,
  AlertTriangle,
  PlayCircle,
} from "lucide-react";
import {
  BIRD_SITES,
  BIRD_IMAGES,
} from "@/lib/bird-urls";

export function Section0_Orientation() {
  const form = useFormContext();

  return (
    <div className="space-y-8">
      {/* ── Hero Banner ── */}
      <CardHeader className="p-0">
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="outline"
            className="text-xs border-[#C9A84C]/40 text-[#C9A84C]"
          >
            Welcome
          </Badge>
          <Badge
            variant="outline"
            className="text-xs border-cyan-500/40 text-cyan-400"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Pilot Mode
          </Badge>
        </div>
        <CardTitle className="text-2xl font-serif text-[#C9A84C]">
          BIRD 2026–2035 Validation Survey
        </CardTitle>
        <CardDescription className="text-[#ecfdf5]/70 text-base mt-2">
          Welcome to the Bangsamoro Investment Roadmap validation instrument.
          Your insights will directly shape a ₱120–160 billion investment
          strategy across the Bangsamoro Autonomous Region in Muslim Mindanao
          (BARMM).
        </CardDescription>
      </CardHeader>

      {/* ── Validation Survey Banner — Wide Format ── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Validation%20Survey%20Banner.png"
          alt="BIRD 2026–2035 Validation Survey Banner"
          className="w-full h-auto max-h-[400px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
          <p className="text-xs text-[#ecfdf5]/60 italic">
            Source: BIRD 2026–2035 — Validation Survey Official Banner
          </p>
        </div>
      </div>

      {/* ── Orientation Video ── */}
      <div className="p-6 rounded-xl border border-[#C9A84C]/20 bg-[#011a12]/60 space-y-4">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-semibold text-[#ecfdf5]">
            Survey Orientation
          </h3>
        </div>
        <p className="text-sm text-[#ecfdf5]/70">
          Watch this 3-minute orientation video to understand the BEIE Framework,
          the 5 investment clusters, and how your responses will be used to
          validate the ₱120–160B investment roadmap.
        </p>
        <div className="aspect-video rounded-lg overflow-hidden border border-[#C9A84C]/20">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/0J491Vqya_4"
            title="BIRD 2026–2035 Orientation"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>

      {/* ── What to Expect ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            icon: BookOpen,
            title: "16 Sections",
            desc: "Covering all 5 BEIE clusters, strategic options, budget targets, and validation frameworks.",
          },
          {
            icon: Shield,
            title: "Anonymous by Default",
            desc: "Your individual responses are anonymized. Only aggregated data is published.",
          },
          {
            icon: Users,
            title: "Stakeholder-Specific",
            desc: "Questions adapt based on your role — government, private sector, academe, or civil society.",
          },
          {
            icon: Globe,
            title: "Shaping ₱120–160B",
            desc: "Your input directly validates the investment roadmap for the Bangsamoro.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 rounded-lg border border-[#C9A84C]/20 bg-[#011a12]/40"
          >
            <div className="p-2 rounded-lg bg-[#C9A84C]/10 shrink-0">
              <item.icon className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#ecfdf5]">
                {item.title}
                </h4>
              <p className="text-xs text-[#ecfdf5]/60 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="bg-[#C9A84C]/20" />

      {/* ── Respondent Profile Questions ── */}
      <div>
        <h3 className="text-lg font-semibold text-[#C9A84C] mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" /> Respondent Profile
        </h3>
        <p className="text-sm text-[#ecfdf5]/70 mb-4">
          This helps us ensure all sectors of the BEIE are proportionally
          represented. Data is anonymized in reporting.
        </p>

        <div className="space-y-4">
          {/* Category */}
          <FormField
            control={form.control}
            name="demo_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#ecfdf5]">
                  Which category best describes your role?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#011a12]/40 border-[#C9A84C]/30 text-[#ecfdf5]">
                      <SelectValue placeholder="Select your category…" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#022c22] border-[#C9A84C]/30 text-[#ecfdf5]">
                    <SelectItem value="gov">
                      Bangsamoro Government Official
                    </SelectItem>
                    <SelectItem value="lgu">
                      Local Government Unit (LGU)
                    </SelectItem>
                    <SelectItem value="private">
                      Private Sector / Investor
                    </SelectItem>
                    <SelectItem value="cs">
                      Civil Society Organization
                    </SelectItem>
                    <SelectItem value="academe">
                      Academic / Researcher
                    </SelectItem>
                    <SelectItem value="dev">
                      Development Partner / Donor
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Province */}
          <FormField
            control={form.control}
            name="demo_province"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#ecfdf5]">
                  Which province/area do you primarily represent?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#011a12]/40 border-[#C9A84C]/30 text-[#ecfdf5]">
                      <SelectValue placeholder="Select Province…" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#022c22] border-[#C9A84C]/30 text-[#ecfdf5]">
                    <SelectItem value="ldn">Lanao del Norte</SelectItem>
                    <SelectItem value="lds">Lanao del Sur</SelectItem>
                    <SelectItem value="mdn">
                      Maguindanao del Norte
                    </SelectItem>
                    <SelectItem value="mds">
                      Maguindanao del Sur
                    </SelectItem>
                    <SelectItem value="bas">Basilan</SelectItem>
                    <SelectItem value="sul">Sulu</SelectItem>
                    <SelectItem value="taw">Tawi-Tawi</SelectItem>
                    <SelectItem value="sga">
                      Special Geographic Area (SGA)
                    </SelectItem>
                    <SelectItem value="cot">Cotabato City</SelectItem>
                    <SelectItem value="reg">Regional / BARMM-wide</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expertise */}
          <FormField
            control={form.control}
            name="demo_expertise"
            render={() => (
              <FormItem>
                <FormLabel className="text-[#ecfdf5]">
                  What is your primary area of expertise? (Select up to 3)
                </FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: "aff", label: "Agriculture/Fisheries/Forestry" },
                    { id: "halal", label: "Halal Industry / Manufacturing" },
                    { id: "infra", label: "Infrastructure / Energy" },
                    { id: "finance", label: "Islamic Finance / Banking" },
                    { id: "trade", label: "Trade / BIMP-EAGA" },
                    { id: "gov", label: "Governance / Policy" },
                  ].map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="demo_expertise"
                      render={({ field }) => (
                        <div
                          className={`flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer ${
                            field.value?.includes(item.id)
                              ? "border-[#C9A84C] bg-[#C9A84C]/10"
                              : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"
                          }`}
                        >
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) =>
                              checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (v: string) => v !== item.id
                                    )
                                  )
                            }
                            className="border-[#C9A84C]/50 data-[state=checked]:bg-[#C9A84C] data-[state=checked]:border-[#C9A84C]"
                          />
                          <FormLabel className="text-[#ecfdf5]/90 font-normal cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </div>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator className="bg-[#C9A84C]/20" />

      {/* ── Student Guide CTA ── */}
      <a
        href={BIRD_SITES.surveyOrientation.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 rounded-xl border border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/5 transition-all group"
      >
        <div className="p-3 rounded-lg bg-[#C9A84C]/10 group-hover:bg-[#C9A84C]/20 transition-colors">
          <BookOpen className="w-6 h-6 text-[#C9A84C]" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-[#E8C560]">
            {BIRD_SITES.surveyOrientation.title}
          </h4>
          <p className="text-xs text-[#ecfdf5]/60">
            {BIRD_SITES.surveyOrientation.description}
          </p>
        </div>
        <Globe className="w-4 h-4 text-[#ecfdf5]/30 group-hover:text-[#C9A84C] transition-colors" />
      </a>

      {/* ── DPA 2012 Notice ── */}
      <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-sm text-[#ecfdf5]/70">
          <strong className="text-amber-400">Data Privacy Notice:</strong> This
          survey complies with the{" "}
          <strong className="text-amber-400">
            Data Privacy Act of 2012
          </strong>
          . Your responses are anonymized by default. Read our{" "}
          <a
            href="https://asilvainnovations.github.io/BIRD-2026-2035/public/privacy-policy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C9A84C] hover:underline"
          >
            Privacy Policy
          </a>{" "}
          for details.
        </div>
      </div>
    </div>
  );
}
