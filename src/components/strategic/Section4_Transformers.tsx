// src/components/strategic/Section4_Transformers.tsx
import {
  FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function Section4_Transformers() {
  const form = useFormContext();

  return (
    <div className="space-y-8">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-serif text-[#C9A84C]">
          4. Cluster 2: Transformers
        </CardTitle>
        <CardDescription className="text-[#ecfdf5]/70 text-base mt-2">
          Industry, Manufacturing, Logistics, and Halal Processing. The global halal market is USD 2.3T, but BHB certification currently takes 45-60 days vs. the 15-day benchmark.
        </CardDescription>
      </CardHeader>

      {/* Question 4.1 */}
      <FormField
        control={form.control}
        name="q4_1"
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
                  "Slow certification process (45-60 days)",
                  "Lack of OIC/SMIIC international recognition",
                  "Limited processing infrastructure",
                  "Skills gap in halal standards compliance"
                ].map((option) => (
                  <div
                    key={option}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option} id={`q4_1-${option}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q4_1-${option}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">
                      {option}
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
        name="q4_2"
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
                  "Highly Effective - Clustering creates competitive advantage",
                  "Moderately Effective - Depends on infrastructure quality",
                  "Limited Effectiveness - Other factors dominate location",
                  "Ineffective - Zones alone cannot overcome constraints"
                ].map((option) => (
                  <div
                    key={option}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option} id={`q4_2-${option}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q4_2-${option}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">
                      {option}
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
