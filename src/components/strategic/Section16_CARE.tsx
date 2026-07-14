import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { CircleCheck as CheckCircle2, Target, RefreshCw, ChartBar as BarChart3 } from "lucide-react";

export function Section16_CARE() {
  const form = useFormContext();

  const carePrinciples = [
    {
      id: "context",
      letter: "C",
      title: "Context-Specific",
      desc: "Aligned with BARMM realities, Khalifa stewardship, and local cultural/religious norms.",
      icon: CheckCircle2,
      color: "text-emerald-500"
    },
    {
      id: "action",
      letter: "A",
      title: "Action-Oriented",
      desc: "Focused on identified leverage points, binding constraints, and executable interventions.",
      icon: Target,
      color: "text-blue-500"
    },
    {
      id: "realtime",
      letter: "R",
      title: "Real-time & Non-linear",
      desc: "Embracing systems thinking, adaptive management, and dynamic feedback loops (CLDs).",
      icon: RefreshCw,
      color: "text-purple-500"
    },
    {
      id: "evidence",
      letter: "E",
      title: "Evidence-Based",
      desc: "Grounded in specific quantitative indicators, PSA data, and international benchmarks.",
      icon: BarChart3,
      color: "text-amber-500"
    }
  ];

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/20">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs border-emerald-400/40 text-emerald-400">Validation</Badge>
            </div>
            <CardTitle className="text-xl mt-1">Section 16: C.A.R.E. & Khalifa Validation</CardTitle>
            <CardDescription>
              Validate the roadmap against the C.A.R.E. principles, anchored in the Islamic concept of <em>Khalifa</em> (stewardship).
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Khalifa Context Box */}
        <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-sm text-muted-foreground leading-relaxed">
          <strong className="text-emerald-400">The Khalifa Imperative:</strong> True stewardship requires explicit local partnership, faith-sensitive program design, and formal coordination with Bangsamoro institutions. This ensures no conflicts arise between moral-governance norms and humanitarian/investment principles.
        </div>

        {/* BEIE Framework Overview — Wide Format Context */}
        <div className="relative w-full overflow-hidden rounded-xl border border-emerald-400/30 shadow-lg group">
          <img
            src="https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/19.%20Bangsamoro%20BEIE%20Framework.png"
            alt="Bangsamoro BEIE Framework — The complete ethical investment ecosystem"
            className="w-full h-auto max-h-[500px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
            <p className="text-xs text-[#ecfdf5]/60 italic">
              Source: BIRD 2026-2035 — Bangsamoro BEIE Framework: Moral Governance Anchoring All Clusters
            </p>
          </div>
        </div>

        {/* C.A.R.E. Principles Validation */}
        {carePrinciples.map((principle) => {
          const Icon = principle.icon;
          return (
            <div key={principle.id} className="p-4 rounded-lg border border-border/50 bg-background/50">
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-2 rounded-lg bg-background ${principle.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-2xl font-black ${principle.color}`}>{principle.letter}</span>
                    <h4 className="font-bold text-foreground">{principle.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{principle.desc}</p>
                </div>
              </div>

              <FormField
                control={form.control}
                name={`care_${principle.id}`}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-semibold text-foreground">
                      How well does the BIRD 2026-2035 roadmap embody this principle?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-3"
                      >
                        {["Not at all", "Slightly", "Moderately", "Very Well", "Perfectly"].map((option, idx) => (
                          <div key={option} className="flex items-center space-x-2">
                            <RadioGroupItem value={String(idx + 1)} id={`care_${principle.id}_${idx}`} />
                            <label htmlFor={`care_${principle.id}_${idx}`} className="text-xs font-medium cursor-pointer text-muted-foreground">
                              {option}
                            </label>
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
        })}

        {/* Overall Alignment */}
        <FormField
          control={form.control}
          name="care_overall"
          render={({ field }) => (
            <FormItem className="space-y-3 pt-4 border-t border-border/50">
              <FormLabel className="text-base font-bold text-foreground">
                Overall, does the C.A.R.E. framework, guided by Khalifa stewardship, provide a robust foundation for the BIRD roadmap?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  {["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].map((option, idx) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={String(idx + 1)} id={`care_overall_${idx}`} />
                      <label htmlFor={`care_overall_${idx}`} className="text-sm font-medium cursor-pointer">
                        {option}
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
