import { useFormContext } from "react-hook-form";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export function Section12_Climate() {
  const form = useFormContext();

  return (
    <div className="space-y-8">
      <CardHeader className="p-0">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs border-green-400/40 text-green-400">Climate</Badge>
        </div>
        <CardTitle className="text-2xl font-serif text-[#C9A84C]">12. Climate Resilience & Green Economy</CardTitle>
        <CardDescription className="text-[#ecfdf5]/70 text-base mt-2">
          Climate change poses the highest vulnerability (VI=5.0). El Niño caused ₱346M crop losses in 2024. BARMM can monetize its forests via REDD+ and Payment for Ecosystem Services (PES) under the pending Forestry Code.
        </CardDescription>
      </CardHeader>

      {/* Iceberg Paradigm — Systems Thinking for Climate — Wide Format */}
      <div className="relative w-full overflow-hidden rounded-xl border border-green-400/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/5-Paradigm.png"
          alt="Iceberg Paradigm — Understanding deep structural causes of climate vulnerability"
          className="w-full h-auto max-h-[400px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
          <p className="text-xs text-[#ecfdf5]/60 italic">
            Source: BIRD 2026-2035 — Systems Thinking Iceberg Paradigm (Applied to Climate Resilience)
          </p>
        </div>
      </div>

      {/* Investment-Development Virtuous Cycle — Green Economy Context — Wide Format */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/20 shadow-lg group">
        <img
          src="https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-swot-systems-maps/public/15.%20Investment%20and%20Governance%20Cycles.png"
          alt="Investment and Governance Cycles — Climate-smart investment feedback loops"
          className="w-full h-auto max-h-[400px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
          <p className="text-xs text-[#ecfdf5]/60 italic">
            Source: BIRD 2026-2035 — Investment and Governance Cycles
          </p>
        </div>
      </div>

      <FormField
        control={form.control}
        name="q12_1"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              12.1 How should BARMM prioritize Green Economy development (Carbon markets, PES)?
            </FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col gap-3">
                {[
                  "Top Priority (Transform environmental stewardship into revenue)",
                  "High Priority (Important co-benefit to industrial growth)",
                  "Moderate Priority (Balance with immediate economic needs)",
                  "Low Priority (Focus on traditional sectors first)"
                ].map((option) => (
                  <div key={option} className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${field.value === option ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}>
                    <RadioGroupItem value={option} id={`q12_1-${option}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q12_1-${option}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">{option}</FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="q12_2"
        render={() => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              12.2 Which climate adaptation mechanisms are most urgent? (Select all that apply)
            </FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { id: "drought_crops", label: "Drought-resistant crop varieties (El Niño mitigation)" },
                { id: "early_warning", label: "Real-time pest/disease early warning systems" },
                { id: "irrigation", label: "Solar-powered irrigation modernization" },
                { id: "mangrove", label: "Mangrove restoration for coastal storm surge defense" }
              ].map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="q12_2"
                  render={({ field }) => (
                    <FormItem key={item.id} className={`flex flex-row items-start space-x-3 space-y-0 p-4 rounded-lg border transition-all cursor-pointer ${field.value?.includes(item.id) ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}>
                      <FormControl>
                        <Checkbox checked={field.value?.includes(item.id)} onCheckedChange={(checked) => checked ? field.onChange([...field.value, item.id]) : field.onChange(field.value?.filter((value: string) => value !== item.id))} className="border-[#C9A84C]/50 data-[state=checked]:bg-[#C9A84C] data-[state=checked]:border-[#C9A84C]" />
                      </FormControl>
                      <FormLabel className="text-[#ecfdf5]/90 font-normal cursor-pointer">{item.label}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
