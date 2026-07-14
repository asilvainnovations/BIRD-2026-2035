// src/components/strategic/Section4_Transformers.tsx
// Section 4: Cluster 2 — Transformers
// Industry, Manufacturing, Logistics & Halal Processing

import {
  FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Section4_Transformers() {
  const form = useFormContext();

  return (
    <div className="space-y-8">
      <CardHeader className="p-0">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs border-[#C9A84C]/40 text-[#C9A84C]">Cluster 2</Badge>
        </div>
        <CardTitle className="text-2xl font-serif text-[#C9A84C] mt-2">
          4. Transformers: Industry, Manufacturing, Logistics & Halal Processing
        </CardTitle>
        <CardDescription className="text-[#ecfdf5]/70 text-base mt-2">
          The global halal market exceeds USD 2.3 trillion, yet BHB certification currently takes 45-60 days versus the 15-day international benchmark. This cluster transforms BARMM's industrial base into an OIC-compliant halal powerhouse.
        </CardDescription>
      </CardHeader>

      {/* Cluster 2 Transformers Framework Image — Wide Format Full View */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/26.%20Cluster%202%20_%20Transformers.png"
          alt="Cluster 2: Transformers Framework — Industry, Manufacturing, Logistics and Halal Processing"
          className="w-full h-auto max-h-[500px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
          <p className="text-xs text-[#ecfdf5]/60 italic">
            Source: BIRD 2026-2035 BEIE Framework — Transformers Cluster
          </p>
        </div>
      </div>

      {/* Transformers De-risking Question — New */}
      <FormField
        control={form.control}
        name="q4_transformers_confidence"
        render={({ field }) => (
          <FormItem className="space-y-4 p-6 rounded-xl border border-[#C9A84C]/20 bg-gradient-to-br from-[#011a12]/60 to-[#022c22]/40">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold flex items-center gap-2">
              <span className="text-[#C9A84C]">&#9670;</span>
              4.0 How confident are you that Transformers can de-risk capital for industrial investment within 5 years?
            </FormLabel>
            <p className="text-sm text-[#ecfdf5]/60 -mt-3">
              Consider: Bangsamoro Halal Park (Matanog), BHB certification streamlining, cold chain infrastructure, and OIC/SMIIC compliance trajectory.
            </p>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {[
                  { value: "5", label: "Very Confident", desc: "Industrial transformation is achievable with current momentum" },
                  { value: "4", label: "Moderately Confident", desc: "Requires acceleration in key enablers" },
                  { value: "3", label: "Neutral", desc: "Uncertain — depends on external factors" },
                  { value: "2", label: "Slightly Doubtful", desc: "Significant gaps remain in infrastructure and policy" },
                  { value: "1", label: "Not Confident", desc: "Structural barriers are too high for 5-year horizon" }
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-start space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option.value ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option.value} id={`q4_0-${option.value}`} className="text-[#C9A84C] border-[#C9A84C]/50 mt-1" />
                    <div className="flex-1">
                      <FormLabel htmlFor={`q4_0-${option.value}`} className="cursor-pointer text-[#ecfdf5]/90 font-semibold block">
                        {option.label}
                      </FormLabel>
                      <p className="text-xs text-[#ecfdf5]/60 mt-1">{option.desc}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Question 4.1 */}
      <FormField
        control={form.control}
        name="q4_1_barrier"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              4.1 What is the most critical barrier to BARMM's competitiveness in the global halal market?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col gap-3"
              >
                {[
                  { value: "cert", label: "Slow certification process (45-60 days)" },
                  { value: "recognition", label: "Lack of OIC/SMIIC international recognition" },
                  { value: "infra", label: "Limited processing infrastructure" },
                  { value: "skills", label: "Skills gap in halal standards compliance" }
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option.value ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option.value} id={`q4_1-${option.value}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q4_1-${option.value}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">
                      {option.label}
                    </FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Question 4.2 */}
      <FormField
        control={form.control}
        name="q4_2_halal_park"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              4.2 How effective will the Bangsamoro Halal Park (Matanog) be in attracting manufacturing investment?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col gap-3"
              >
                {[
                  { value: "5", label: "Highly Effective — Clustering creates competitive advantage" },
                  { value: "4", label: "Moderately Effective — Depends on infrastructure quality" },
                  { value: "2", label: "Limited Effectiveness — Other factors dominate location choice" },
                  { value: "1", label: "Ineffective — Zones alone cannot overcome constraints" }
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option.value ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option.value} id={`q4_2-${option.value}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q4_2-${option.value}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">
                      {option.label}
                    </FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
