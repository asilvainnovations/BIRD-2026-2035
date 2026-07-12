// src/components/strategic/Section6_Connectors.tsx
// Section 6: Cluster 4 — Connectors
// Trade, BIMP-EAGA Integration & Export Corridors

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Globe, Ship, Plane, AlertTriangle } from "lucide-react";

const exportMarkets = [
  { id: "gcc", label: "UAE / GCC (Middle East — 10.5M consumers)", icon: Plane },
  { id: "asean", label: "Other ASEAN Markets", icon: Globe },
  { id: "malaysia", label: "Malaysia (BIMP-EAGA)", icon: Ship },
  { id: "indonesia", label: "Indonesia (BIMP-EAGA)", icon: Ship },
];

export function Section6_Connectors() {
  const form = useFormContext();

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs border-emerald-400/40 text-emerald-400">Cluster 4</Badge>
            </div>
            <CardTitle className="text-xl text-foreground mt-1">Section 6: Connectors Cluster</CardTitle>
            <CardDescription className="text-muted-foreground">
              Trade, BIMP-EAGA Integration & Export Corridors
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">

        {/* Elephant Context */}
        <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">🐘 Elephants in the Room:</strong> (1) The{" "}
            <strong className="text-amber-400">"Ghost of Conflict Past"</strong> — international investor
            perception lags 5-10 years behind ground reality. (2) The highly lucrative{" "}
            <strong className="text-amber-400">informal cross-border barter trade</strong> in Tawi-Tawi
            and Sulu remains unformalized, preventing capture in BIMP-EAGA GDP metrics.
          </div>
        </div>

        {/* Cluster 4 Connectors Framework Image — Wide Format Full View */}
        <div className="relative w-full overflow-hidden rounded-xl border border-emerald-400/30 shadow-lg group">
          <img
            src="https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/33.%20Cluster%204_%20Connectors.png"
            alt="Cluster 4: Connectors Framework — Trade, BIMP-EAGA Integration and Export Corridors"
            className="w-full h-auto max-h-[500px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
            <p className="text-xs text-[#ecfdf5]/60 italic">
              Source: BIRD 2026-2035 BEIE Framework — Connectors Cluster
            </p>
          </div>
        </div>

        {/* BIMP-EAGA Connectivity Map — Wide Format */}
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/20 shadow-lg group">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BARMM%20Connectivity%20%20.png"
            alt="BARMM Strategic Connectivity vis-à-vis BIMP-EAGA"
            className="w-full h-auto max-h-[400px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
            <p className="text-xs text-[#ecfdf5]/60 italic">
              Source: BIRD 2026-2035 — BARMM Strategic Connectivity Map
            </p>
          </div>
        </div>

        {/* Q6.1 BIMP-EAGA */}
        <FormField
          control={form.control}
          name="q6_1_bimpeaga"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                6.1 How critical is BIMP-EAGA integration for BARMM's trade competitiveness?
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-5 gap-2">
                  {["1", "2", "3", "4", "5"].map((val) => (
                    <div key={val} className="flex flex-col items-center gap-1">
                      <RadioGroupItem value={val} id={`q6_1_${val}`} className="peer sr-only" />
                      <label htmlFor={`q6_1_${val}`}
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

        {/* Q6.2 Export Markets */}
        <FormField
          control={form.control}
          name="q6_2_markets"
          render={() => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                6.2 Which export markets should be prioritized for halal products? (Select all that apply)
              </FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exportMarkets.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="q6_2_markets"
                    render={({ field }) => (
                      <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                        <Checkbox
                          id={`q6_2_${item.id}`}
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) =>
                            checked
                              ? field.onChange([...(field.value || []), item.id])
                              : field.onChange((field.value || []).filter((v: string) => v !== item.id))
                          }
                        />
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                        <label htmlFor={`q6_2_${item.id}`} className="flex-1 cursor-pointer text-sm font-normal">{item.label}</label>
                      </div>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q6.3 Export Target Realism */}
        <FormField
          control={form.control}
          name="q6_3_export_target"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                6.3 How realistic is the ₱40B+ export target by 2035?
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-5 gap-2">
                  {["1", "2", "3", "4", "5"].map((val) => (
                    <div key={val} className="flex flex-col items-center gap-1">
                      <RadioGroupItem value={val} id={`q6_3_${val}`} className="peer sr-only" />
                      <label htmlFor={`q6_3_${val}`}
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

        {/* Q6.4 UAE/GCC Feasibility (Tawi-Tawi context) */}
        <FormField
          control={form.control}
          name="q6_4_uae_feasibility"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                🐘 The MAFAR-Prime Group partnership targets the UAE/GCC Halal Corridor. How feasible is this by 2028, given Tawi-Tawi's seaweed dominance (40% national share) and Sulu's informal trade networks?
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col gap-2">
                  {["Highly Unrealistic", "Unrealistic", "Feasible with major adjustments", "Realistic", "Highly Realistic"].map((opt, i) => (
                    <div key={opt} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value={String(i + 1)} id={`q6_4_${i}`} />
                      <label htmlFor={`q6_4_${i}`} className="flex-1 cursor-pointer text-sm font-normal">{opt}</label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q6.5 Ghost of Conflict Past */}
        <FormField
          control={form.control}
          name="q6_5_perception"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                🐘 Which variable most severely triggers the "Security-Investment Tensions" balancing loop, deterring Connectors cluster investment?
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col gap-2">
                  {[
                    { value: "informal_trade", label: "Informal cross-border barter trade in Tawi-Tawi/Sulu" },
                    { value: "rido", label: "Residual rido/clan conflicts in mainland provinces" },
                    { value: "halal_hospitality", label: "Lack of Halal-certified hospitality infrastructure (Lake Lanao)" },
                    { value: "logistics", label: "High logistics costs due to farm-to-market road deficits" },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value={opt.value} id={`q6_5_${opt.value}`} />
                      <label htmlFor={`q6_5_${opt.value}`} className="flex-1 cursor-pointer text-sm font-normal">{opt.label}</label>
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
