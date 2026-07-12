// src/components/strategic/Section5_Enablers.tsx
// Section 5: Cluster 3 — Enablers
// Infrastructure, Human Capital, Digital & Health Systems

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Building2, Wifi, GraduationCap, HeartPulse } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const enablerSectors = [
  { id: "roads", label: "Farm-to-market roads & logistics", icon: Building2 },
  { id: "digital", label: "Digital broadband infrastructure", icon: Wifi },
  { id: "education", label: "Education & TVET alignment", icon: GraduationCap },
  { id: "health", label: "Healthcare & nutrition", icon: HeartPulse },
];

const humanCapitalItems = [
  { name: "q5_4_literacy", label: "Functional Literacy Rate (59.3% — lowest nationally)", desc: "Severe human capital constraint on industrial investment viability." },
  { name: "q5_5_stunting", label: "Child Stunting Prevalence (45% — highest nationally)", desc: "Long-term cognitive and productivity deficit requiring urgent intervention." },
];

export function Section5_Enablers() {
  const form = useFormContext();

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs border-blue-400/40 text-blue-400">Cluster 3</Badge>
            </div>
            <CardTitle className="text-xl text-foreground mt-1">Section 5: Enablers Cluster</CardTitle>
            <CardDescription className="text-muted-foreground">
              Infrastructure, Human Capital, Digital & Health Systems
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">

        {/* Context: Elephant in the Room */}
        <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground">🐘 Elephant in the Room:</strong> BARMM has the{" "}
            <strong className="text-amber-400">lowest functional literacy in the Philippines (59.3%)</strong> and{" "}
            <strong className="text-amber-400">highest child stunting rate (45%)</strong>.
            Narrative: <em>You cannot build a premier global halal hub with a stunted, illiterate workforce.</em>
            This is the primary "Limits to Growth" constraint.
          </div>
        </div>

        {/* Cluster 3 Enablers Framework Image — Wide Format Full View */}
        <div className="relative w-full overflow-hidden rounded-xl border border-blue-400/30 shadow-lg group">
          <img
            src="https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/28.%20Cluster%203%20_%20Enablers.png"
            alt="Cluster 3: Enablers Framework — Infrastructure, Human Capital, Digital and Health Systems"
            className="w-full h-auto max-h-[500px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
            <p className="text-xs text-[#ecfdf5]/60 italic">
              Source: BIRD 2026-2035 BEIE Framework — Enablers Cluster
            </p>
          </div>
        </div>

        {/* Q5.1 Infrastructure Rating */}
        <FormField
          control={form.control}
          name="q5_1_infra"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                5.1 How would you rate the current state of infrastructure in BARMM?
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-5 gap-2">
                  {["1", "2", "3", "4", "5"].map((val) => (
                    <div key={val} className="flex flex-col items-center gap-1">
                      <RadioGroupItem value={val} id={`q5_1_${val}`} className="peer sr-only" />
                      <label htmlFor={`q5_1_${val}`}
                        className="flex flex-col items-center justify-center w-full h-14 rounded-lg border-2 border-muted bg-popover p-2 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all">
                        <span className="text-xl font-bold">{val}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {val === "1" ? "Very Poor" : val === "5" ? "Excellent" : ""}
                        </span>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q5.2 Enabler Sectors (Checkboxes) */}
        <FormField
          control={form.control}
          name="q5_2_sectors"
          render={() => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                5.2 Which enabler sectors need the most investment? (Select all that apply)
              </FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {enablerSectors.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="q5_2_sectors"
                    render={({ field }) => (
                      <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                        <Checkbox
                          id={`q5_2_${item.id}`}
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) =>
                            checked
                              ? field.onChange([...(field.value || []), item.id])
                              : field.onChange((field.value || []).filter((v: string) => v !== item.id))
                          }
                        />
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                        <label htmlFor={`q5_2_${item.id}`} className="flex-1 cursor-pointer text-sm font-normal">
                          {item.label}
                        </label>
                      </div>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q5.3 Broadband Realism */}
        <FormField
          control={form.control}
          name="q5_3_broadband"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                5.3 How realistic is the target of 85% broadband penetration by 2035? (Currently &lt;30% in rural/island areas)
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-5 gap-2">
                  {["1", "2", "3", "4", "5"].map((val) => (
                    <div key={val} className="flex flex-col items-center gap-1">
                      <RadioGroupItem value={val} id={`q5_3_${val}`} className="peer sr-only" />
                      <label htmlFor={`q5_3_${val}`}
                        className="flex flex-col items-center justify-center w-full h-14 rounded-lg border-2 border-muted bg-popover p-2 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-all">
                        <span className="text-xl font-bold">{val}</span>
                        <span className="text-[10px] text-muted-foreground text-center">
                          {val === "1" ? "Unrealistic" : val === "5" ? "Highly Realistic" : ""}
                        </span>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q5.4–5.5 Human Capital Crisis (Elephant severity ratings) */}
        <div className="space-y-4">
          <FormLabel className="text-base font-semibold text-foreground">
            🐘 Rate the severity of these human capital deficits as binding constraints on FDI (1=Low, 5=Severe):
          </FormLabel>
          {humanCapitalItems.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <FormLabel className="text-sm font-bold text-foreground">{item.label}</FormLabel>
                  <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-2">
                      {["1", "2", "3", "4", "5"].map((val) => (
                        <div key={val} className="flex flex-col items-center gap-1">
                          <RadioGroupItem value={val} id={`${item.name}_${val}`} className="peer sr-only" />
                          <label htmlFor={`${item.name}_${val}`}
                            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-muted bg-popover hover:bg-accent peer-data-[state=checked]:border-amber-500 peer-data-[state=checked]:bg-amber-500/10 cursor-pointer transition-all font-bold text-sm">
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
          ))}
        </div>

        {/* Q5.6 Digital Divide */}
        <FormField
          control={form.control}
          name="q5_6_digital_divide"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold text-foreground">
                🐘 To what extent does the Digital Divide in archipelagic provinces (Sulu, Tawi-Tawi, Basilan) constrain BIMP-EAGA trade formalization?
              </FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col gap-2">
                  {["No Constraint", "Minor Constraint", "Moderate Constraint", "Major Constraint", "Severe Constraint"].map((opt, i) => (
                    <div key={opt} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value={String(i + 1)} id={`q5_6_${i}`} />
                      <label htmlFor={`q5_6_${i}`} className="flex-1 cursor-pointer text-sm font-normal">{opt}</label>
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
