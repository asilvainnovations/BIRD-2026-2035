// src/components/strategic/Section3_Foundations.tsx
import {
  FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function Section3_Foundations() {
  const form = useFormContext();

  return (
    <div className="space-y-8">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-serif text-[#C9A84C]">
          3. Cluster 1: Foundations
        </CardTitle>
        <CardDescription className="text-[#ecfdf5]/70 text-base mt-2">
          Agriculture, Fisheries, Forestry, and Energy. AFF contributes 32.4% of GRDP but faces 20-40% post-harvest losses and climate vulnerability.
        </CardDescription>
      </CardHeader>

      {/* Question 3.1 (Checkboxes) */}
      <FormField
        control={form.control}
        name="q3_1_priorities"
        render={() => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              3.1 Which agricultural interventions should receive highest priority? (Select all that apply)
            </FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { id: "fmr", label: "Farm-to-market roads" },
                { id: "cold", label: "Cold chain & warehousing" },
                { id: "agro", label: "Agro-processing facilities" },
                { id: "climate", label: "Climate-smart agriculture" },
                { id: "irrigation", label: "Irrigation modernization" },
                { id: "coop", label: "Farmer cooperative strengthening" },
              ].map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="q3_1_priorities"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className={`flex flex-row items-start space-x-3 space-y-0 p-4 rounded-lg border transition-all cursor-pointer
                          ${field.value?.includes(item.id) ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: string) => value !== item.id
                                    )
                                  );
                            }}
                            className="border-[#C9A84C]/50 data-[state=checked]:bg-[#C9A84C] data-[state=checked]:border-[#C9A84C]"
                          />
                        </FormControl>
                        <FormLabel className="text-[#ecfdf5]/90 font-normal cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Question 3.2 */}
      <FormField
        control={form.control}
        name="q3_2_feasibility"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              3.2 How feasible is the target of 30% post-harvest loss reduction by 2030?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col gap-3"
              >
                {[
                  { value: "5", label: "Highly Feasible with current programs" },
                  { value: "4", label: "Feasible with increased investment" },
                  { value: "3", label: "Challenging but achievable" },
                  { value: "1", label: "Unrealistic given infrastructure gaps" }
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option.value ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option.value} id={`q3_2-${option.value}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q3_2-${option.value}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">
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
