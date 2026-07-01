// src/components/strategic/Section2_MoralGov.tsx
import {
  FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function Section2_MoralGov() {
  const form = useFormContext();

  return (
    <div className="space-y-8">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-serif text-[#C9A84C]">
          2. Cross-Cutting Operating Systems
        </CardTitle>
        <CardDescription className="text-[#ecfdf5]/70 text-base mt-2">
          Moral Governance, Resilience, Inclusivity, and Peace serve as the "operating system" determining whether all economic clusters function effectively.
        </CardDescription>
      </CardHeader>

      {/* Question 2.1 */}
      <FormField
        control={form.control}
        name="q2_1"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              2.1 How critical is Moral Governance as a prerequisite for investment climate improvement?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col gap-3"
              >
                {[
                  "Critical - Must precede investments",
                  "Important - Develop alongside investments",
                  "Moderate - Can be addressed after economic gains",
                  "Low Priority - Economic growth drives governance"
                ].map((option) => (
                  <div
                    key={option}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option} id={`q2_1-${option}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q2_1-${option}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">
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

      {/* Question 2.2 */}
      <FormField
        control={form.control}
        name="q2_2"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              2.2 Rate the sustainability of the current peace dividend as a foundation for long-term investment.
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col gap-3"
              >
                {[
                  "Highly Sustainable - Structural peace framework is solid",
                  "Moderately Sustainable - Requires continued vigilance",
                  "Uncertain - Depends on political transition outcomes",
                  "Fragile - Significant security risks remain"
                ].map((option) => (
                  <div
                    key={option}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option} id={`q2_2-${option}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q2_2-${option}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">
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
