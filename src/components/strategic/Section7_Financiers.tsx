// src/components/strategic/Section7_Financiers.tsx
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Landmark, Shield, HandCoins, Users, AlertTriangle } from "lucide-react";

const financialInstruments = [
  { id: "banking", label: "Islamic Banking Expansion (Al-Amanah, CARD)", icon: Landmark },
  { id: "takaful", label: "Takaful (Climate/Agri Islamic Insurance)", icon: Shield },
  { id: "waqf", label: "Waqf (Community Endowments for MSME incubation)", icon: Users },
  { id: "sukuk", label: "Green Sukuk (Renewable Energy bonds)", icon: HandCoins },
  { id: "micro", label: "Islamic Microfinance for rural MSMEs", icon: HandCoins },
];

export function Section7_Financiers() {
  const form = useFormContext();

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-xl text-foreground">Section 7: Financiers Cluster</CardTitle>
            <CardDescription className="text-muted-foreground">
              Islamic Banking, Takaful, Waqf & Microfinance
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">

        {/* Elephant Context */}
        <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">🐘 The Asset Paradox:</strong> Despite RA 11439 and a population
            of 5.69M Muslims, Islamic banking assets in BARMM sit at{" "}
            <strong className="text-amber-400">&lt;₱2 Billion</strong>. This is a massive market failure.
            Simultaneously, <strong className="text-amber-400">Block Grant dependency</strong> stifles
            urgency for local revenue generation and waqf mobilization.
          </div>
        </div>

        {/* Q7.1 Criticality */}
        <FormField
          control={form.control}
          name="q7_1_criticality"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                7.1 How critical is Islamic finance development for BARMM's economic transformation?
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-5 gap-2">
                  {["1", "2", "3", "4", "5"].map((val) => (
                    <div key={val} className="flex flex-col items-center gap-1">
                      <RadioGroupItem value={val} id={`q7_1_${val}`} className="peer sr-only" />
                      <label htmlFor={`q7_1_${val}`}
                        className="flex flex-col items-center justify-center w-full h-14 rounded-lg border-2 border-muted bg-popover p-2 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all">
                        <span className="text-xl font-bold">{val}</span>
                        <span className="text-[10px] text-muted-foreground">{val === "1" ? "Low" : val === "5" ? "Critical" : ""}</span>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q7.2 Instruments */}
        <FormField
          control={form.control}
          name="q7_2_instruments"
          render={() => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                7.2 Which Islamic finance instruments should be prioritized? (Select all that apply)
              </FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {financialInstruments.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="q7_2_instruments"
                    render={({ field }) => (
                      <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                        <Checkbox
                          id={`q7_2_${item.id}`}
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) =>
                            checked
                              ? field.onChange([...(field.value || []), item.id])
                              : field.onChange((field.value || []).filter((v: string) => v !== item.id))
                          }
                        />
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                        <label htmlFor={`q7_2_${item.id}`} className="flex-1 cursor-pointer text-sm font-normal">{item.label}</label>
                      </div>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q7.3 Inclusion Target */}
        <FormField
          control={form.control}
          name="q7_3_inclusion_target"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                7.3 How realistic is the target of 25% adult financial inclusion by 2035?
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-5 gap-2">
                  {["1", "2", "3", "4", "5"].map((val) => (
                    <div key={val} className="flex flex-col items-center gap-1">
                      <RadioGroupItem value={val} id={`q7_3_${val}`} className="peer sr-only" />
                      <label htmlFor={`q7_3_${val}`}
                        className="flex flex-col items-center justify-center w-full h-14 rounded-lg border-2 border-muted bg-popover p-2 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all">
                        <span className="text-xl font-bold">{val}</span>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q7.4 Asset Paradox */}
        <FormField
          control={form.control}
          name="q7_4_asset_paradox"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                🐘 Which barrier most significantly sustains the "Growth and Underinvestment" archetype in Islamic finance (&lt;₱2B assets)?
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col gap-2">
                  {[
                    { value: "cultural", label: "Cultural preference for informal/shadow-economy finance mechanisms" },
                    { value: "regulatory", label: "Regulatory fragmentation between BSP and BARMM institutions" },
                    { value: "products", label: "Lack of Shariah-compliant products tailored for MSMEs and Agri-risk" },
                    { value: "branches", label: "Limited physical branch networks in rural/archipelagic areas" },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value={opt.value} id={`q7_4_${opt.value}`} />
                      <label htmlFor={`q7_4_${opt.value}`} className="flex-1 cursor-pointer text-sm font-normal">{opt.label}</label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q7.5 Block Grant Dependency */}
        <FormField
          control={form.control}
          name="q7_5_block_grant"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                🐘 Rate the impact of Block Grant Dependency on stifling local revenue generation and waqf mobilization (1=Low, 5=Severe):
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-2">
                  {["1", "2", "3", "4", "5"].map((val) => (
                    <div key={val} className="flex flex-col items-center gap-1">
                      <RadioGroupItem value={val} id={`q7_5_${val}`} className="peer sr-only" />
                      <label htmlFor={`q7_5_${val}`}
                        className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-muted bg-popover hover:bg-accent peer-data-[state=checked]:border-cyan-500 peer-data-[state=checked]:bg-cyan-500/10 cursor-pointer transition-all font-bold text-sm">
                        {val}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </CardContent>
    </Card>
  );
}
