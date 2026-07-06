// src/components/strategic/Section9_BudgetTargets.tsx
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Target } from "lucide-react";

export function Section9_BudgetTargets() {
  const form = useFormContext();

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-serif text-primary">9. Investment Priorities & KPI Targets</CardTitle>
        <CardDescription>
          The BIRD roadmap requires a coordinated capital deployment of <strong>₱120–160 billion</strong> (2026–2035) to achieve the terminal vision of <strong>₱550B+ GRDP</strong>, <strong>₱15B annual approvals</strong>, and <strong>&lt;20% poverty incidence</strong>.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="bg-primary/5 border-primary/20">
          <Target className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">2035 Terminal Targets</AlertTitle>
          <AlertDescription className="text-muted-foreground text-sm">
            GRDP: ₱550B+ | Investment Approvals: ₱15B p.a. | Exports: ₱40B+ | Islamic Assets: ₱20B+ | Poverty: &lt;20%
          </AlertDescription>
        </Alert>

        {/* Q9.1: Budget Realism */}
        <FormField
          control={form.control}
          name="q9_1_budget"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold">9.1 Is the estimated ₱120-160B total investment requirement realistic for achieving the 2035 targets?</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { value: 'realistic', label: 'Realistic & Well-calibrated' },
                    { value: 'underestimated', label: 'Likely Underestimated (Will require more)' },
                    { value: 'overestimated', label: 'Likely Overestimated (Can achieve with less)' },
                    { value: 'unable', label: 'Unable to Assess' },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 rounded-md border p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value={option.value} id={`budget-${option.value}`} />
                      <FormLabel htmlFor={`budget-${option.value}`} className="flex-1 cursor-pointer font-normal">
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

        {/* Q10.1: Target Ambition */}
        <FormField
          control={form.control}
          name="q10_1_ambition"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold">10.1 How would you characterize the overall ambition level of the 2035 macroeconomic targets?</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { value: 'appropriately_ambitious', label: 'Appropriately Ambitious (Stretch but achievable)' },
                    { value: 'too_conservative', label: 'Too Conservative (BARMM can achieve more)' },
                    { value: 'too_ambitious', label: 'Too Ambitious / Unrealistic' },
                    { value: 'mixed', label: 'Mixed (Some realistic, some not)' },
                  ].map((option) => (
                    <div key={option.value} className="flex items-center space-x-3 rounded-md border p-3 hover:bg-accent/50 transition-colors cursor-pointer">
                      <RadioGroupItem value={option.value} id={`ambition-${option.value}`} />
                      <FormLabel htmlFor={`ambition-${option.value}`} className="flex-1 cursor-pointer font-normal">
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
      </CardContent>
    </Card>
  );
}
