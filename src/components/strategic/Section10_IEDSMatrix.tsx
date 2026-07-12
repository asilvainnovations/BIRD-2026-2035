// src/components/strategic/Section10_IEDSMatrix.tsx
// Section 10: Strategic Options Evaluation Matrix

import { useFormContext, useWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Info, TrendingUp, Target, Shield, Users, Leaf, Award } from "lucide-react";

const criteriaConfig = [
  { key: 'economic_impact', label: 'Economic Impact', weight: 25, icon: TrendingUp, desc: 'Contribution to ₱550B GRDP & job creation.' },
  { key: 'feasibility', label: 'Feasibility', weight: 20, icon: Target, desc: 'Technical capacity & fiscal realism.' },
  { key: 'identity_alignment', label: 'BARMM Identity', weight: 15, icon: Shield, desc: 'Halal legitimacy & Moral Governance.' },
  { key: 'systems_leverage', label: 'Systems Leverage', weight: 15, icon: Award, desc: 'Resolving archetypes (e.g., Limits to Growth).' },
  { key: 'risk_return', label: 'Risk-Return', weight: 10, icon: TrendingUp, desc: 'Climate & standards vulnerability.' },
  { key: 'inclusivity', label: 'Inclusivity', weight: 10, icon: Users, desc: 'Provincial equity & MSME focus.' },
  { key: 'sustainability', label: 'Sustainability', weight: 5, icon: Leaf, desc: 'Environmental & fiscal longevity.' },
];

const strategies = [
  { key: 'heds', name: 'HEDS', color: 'text-blue-400 border-blue-500/30 bg-blue-950/20' },
  { key: 'gems', name: 'GEMS', color: 'text-green-400 border-green-500/30 bg-green-950/20' },
  { key: 'ifes', name: 'IFES', color: 'text-orange-400 border-orange-500/30 bg-orange-950/20' },
  { key: 'ieds', name: 'IEDS (Recommended)', color: 'text-[#C9A84C] border-[#C9A84C]/50 bg-[#C9A84C]/10' },
];

export function Section10_IEDSMatrix() {
  const form = useFormContext();
  const matrixValues = useWatch({ control: form.control, name: "q10_matrix" });

  const calculateScore = (strategyKey: string) => {
    if (!matrixValues || !matrixValues[strategyKey]) return 0;
    let total = 0;
    criteriaConfig.forEach(c => {
      total += (matrixValues[strategyKey][c.key] || 0) * (c.weight / 100);
    });
    return total.toFixed(2);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs border-purple-400/40 text-purple-400">Evaluation</Badge>
          </div>
          <h2 className="text-2xl font-serif text-[#C9A84C] mb-2">10. Strategic Options Evaluation Matrix</h2>
          <p className="text-[#ecfdf5]/70">
            Adjust the sliders (1-10) to validate the BIRD framework's weighted scoring. The system calculates the composite score in real-time.
          </p>
        </div>

        {/* Meadows Leverage Points — Wide Format Context Image */}
        <div className="relative w-full overflow-hidden rounded-xl border border-purple-400/30 shadow-lg group">
          <img
            src="https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-swot-systems-maps/public/24.%20Meadows%20Hierarchy%20of%20Leverage%20Points.png"
            alt="Meadows Hierarchy of Leverage Points — Systems intervention levels"
            className="w-full h-auto max-h-[400px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
            <p className="text-xs text-[#ecfdf5]/60 italic">
              Source: BIRD 2026-2035 — Meadows Hierarchy of Leverage Points (Context for Scoring)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategies.map((strat) => {
            const score = calculateScore(strat.key);
            const percentage = (parseFloat(score) / 10) * 100;
            
            return (
              <Card key={strat.key} className={`border ${strat.color} backdrop-blur-sm`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold text-[#ecfdf5]">{strat.name}</CardTitle>
                    <Badge variant="outline" className="border-[#C9A84C]/50 text-[#C9A84C] font-mono">
                      Score: {score}
                    </Badge>
                  </div>
                  <Progress value={percentage} className="h-1.5 bg-[#064e3b] [&>div]:bg-[#C9A84C]" />
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  {criteriaConfig.map((crit) => {
                    const Icon = crit.icon;
                    return (
                      <FormField
                        key={`${strat.key}-${crit.key}`}
                        control={form.control}
                        name={`q10_matrix.${strat.key}.${crit.key}`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <Icon className="w-3.5 h-3.5 text-[#C9A84C]/80" />
                                <FormLabel className="text-xs font-medium text-[#ecfdf5]/80">
                                  {crit.label} <span className="text-[#C9A84C]/60">({crit.weight}%)</span>
                                </FormLabel>
                              </div>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-3.5 h-3.5 text-[#ecfdf5]/40 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#011a12] border-[#C9A84C]/30 text-[#ecfdf5] max-w-xs">
                                  <p>{crit.desc}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <div className="flex items-center gap-3">
                              <FormControl>
                                <Slider
                                  min={1} max={10} step={1}
                                  value={[field.value || 5]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                  className="flex-1 [&>span:first-child]:bg-[#064e3b] [&>span:first-child]>span:last-child]:bg-[#C9A84C]"
                                />
                              </FormControl>
                              <span className="text-sm font-mono text-[#C9A84C] w-6 text-right">{field.value || 5}</span>
                            </div>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Separator className="bg-[#C9A84C]/20" />
        
        <Card className="bg-[#011a12]/60 border-[#C9A84C]/20 p-4">
          <p className="text-xs text-[#ecfdf5]/60 italic">
            <strong className="text-[#C9A84C]">Methodology Note:</strong> Total Score = Σ (Criterion Score × Weight). 
            The BIRD framework recommends IEDS (Target: 8.93) due to its perfect Systems Leverage (10.0), which resolves the "Limits to Growth" archetype.
          </p>
        </Card>
      </div>
    </TooltipProvider>
  );
}
