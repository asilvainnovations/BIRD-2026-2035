// src/components/strategic/Section10_IEDSMatrix.tsx
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext, useFieldArray } from "react-hook-form";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function Section10_IEDSMatrix() {
  const form = useFormContext();

  const evaluationCriteria = [
    {
      key: "economic_impact",
      label: "Economic Impact",
      weight: "25%",
      description: "Contribution to GRDP growth (₱550B), job creation (20,000+), poverty reduction (&lt;20%), export revenue (₱40B+)"
    },
    {
      key: "feasibility",
      label: "Feasibility",
      weight: "20%",
      description: "Technical feasibility, institutional capacity, fiscal sustainability, timeline realism"
    },
    {
      key: "identity_alignment",
      label: "Alignment with BARMM Identity",
      weight: "15%",
      description: "Consistency with Islamic values, cultural authenticity, halal identity, moral governance"
    },
    {
      key: "systems_leverage",
      label: "Systems Leverage",
      weight: "15%",
      description: "Ability to activate high-leverage points (L1-L6) and address multiple systems archetypes"
    },
    {
      key: "risk_return",
      label: "Risk-Return Profile",
      weight: "10%",
      description: "Balance between expected returns and exposure to threats (climate, standards, political)"
    },
    {
      key: "inclusivity",
      label: "Inclusivity & Equity",
      weight: "10%",
      description: "Distribution across provinces, MSMEs, women, youth, IDPs, marginalized communities"
    },
    {
      key: "sustainability",
      label: "Sustainability",
      weight: "5%",
      description: "Environmental, fiscal, and institutional sustainability beyond 2035"
    }
  ];

  const strategies = [
    { key: "heds", name: "HEDS", rank: "2nd", score: 7.61, recommended: false },
    { key: "gems", name: "GEMS", rank: "4th", score: 7.16, recommended: false },
    { key: "ifes", name: "IFES", rank: "3rd", score: 7.48, recommended: false },
    { key: "ieds", name: "IEDS", rank: "1st", score: 8.93, recommended: true }
  ];

  // Sample scores from the BIRD document
  const sampleScores = {
    heds: { economic_impact: 8.0, feasibility: 7.0, identity_alignment: 9.5, systems_leverage: 7.0, risk_return: 6.5, inclusivity: 7.0, sustainability: 7.5 },
    gems: { economic_impact: 6.5, feasibility: 6.0, identity_alignment: 8.0, systems_leverage: 8.5, risk_return: 6.0, inclusivity: 8.0, sustainability: 9.0 },
    ifes: { economic_impact: 7.5, feasibility: 6.5, identity_alignment: 7.0, systems_leverage: 9.0, risk_return: 7.0, inclusivity: 8.5, sustainability: 7.0 },
    ieds: { economic_impact: 9.5, feasibility: 8.0, identity_alignment: 9.0, systems_leverage: 10.0, risk_return: 7.5, inclusivity: 9.0, sustainability: 9.0 }
  };

  return (
    <div className="space-y-8">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-serif text-[#C9A84C]">
          10. IEDS Multi-Criteria Evaluation Matrix
        </CardTitle>
        <CardDescription className="text-[#ecfdf5]/70 text-base mt-2">
          Weighted scoring matrix evaluating four strategic options against seven criteria aligned with BARMM's development mandate.
        </CardDescription>
      </CardHeader>

      {/* Evaluation Matrix Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[900px] p-6 rounded-lg border border-[#C9A84C]/20 bg-[#011a12]/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#C9A84C]/30">
                <th className="text-left py-3 px-4 text-[#ecfdf5] font-semibold">Criterion (Weight)</th>
                {strategies.map((strategy) => (
                  <th key={strategy.key} className="text-center py-3 px-4">
                    <div className="flex flex-col items-center">
                      <span className={`font-bold ${strategy.recommended ? "text-[#C9A84C]" : "text-[#ecfdf5]"}`}>
                        {strategy.name}
                      </span>
                      {strategy.recommended && (
                        <Badge className="mt-1 text-xs bg-[#C9A84C] text-black">RECOMMENDED</Badge>
                      )}
                      <span className="text-xs text-[#ecfdf5]/60 mt-1">Rank: {strategy.rank}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evaluationCriteria.map((criterion) => (
                <tr key={criterion.key} className="border-b border-[#C9A84C]/10">
                  <td className="py-4 px-4">
                    <div className="font-semibold text-[#ecfdf5]">{criterion.label}</div>
                    <div className="text-xs text-[#ecfdf5]/60">{criterion.description}</div>
                    <Badge variant="outline" className="mt-1 text-xs">Weight: {criterion.weight}</Badge>
                  </td>
                  {strategies.map((strategy) => {
                    const score = sampleScores[strategy.key as keyof typeof sampleScores][criterion.key as keyof typeof sampleScores.heds];
                    const weighted = score * parseFloat(criterion.weight) / 100;
                    return (
                      <td key={strategy.key} className="text-center py-4 px-4">
                        <div className="text-2xl font-bold text-[#ecfdf5]">{score.toFixed(1)}</div>
                        <div className="text-xs text-[#ecfdf5]/60">Weighted: {weighted.toFixed(2)}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="bg-[#C9A84C]/10">
                <td className="py-4 px-4 font-bold text-[#C9A84C]">TOTAL WEIGHTED SCORE</td>
                {strategies.map((strategy) => (
                  <td key={strategy.key} className="text-center py-4 px-4">
                    <div className={`text-3xl font-bold ${strategy.recommended ? "text-[#C9A84C]" : "text-[#ecfdf5]"}`}>
                      {strategy.score.toFixed(2)}
                    </div>
                    <div className="text-xs text-[#ecfdf5]/60">{strategy.rank} Place</div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Question 10.1 - Ambition Assessment */}
      <FormField
        control={form.control}
        name="q10_1_ambition"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-semibold text-[#ecfdf5]">
                10.1 Target Ambition Assessment
              </CardTitle>
              <CardDescription className="text-[#ecfdf5]/70 text-sm">
                The IEDS targets ₱550B GRDP, ₱15B annual investments, &lt;20% poverty by 2035. How would you assess these targets?
              </CardDescription>
            </CardHeader>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {[
                  { value: "appropriately_ambitious", label: "Appropriately Ambitious", desc: "Challenging yet achievable" },
                  { value: "too_conservative", label: "Too Conservative", desc: "Could aim higher" },
                  { value: "too_ambitious", label: "Too Ambitious", desc: "May be unrealistic" },
                  { value: "mixed", label: "Mixed Assessment", desc: "Some targets realistic, others not" }
                ].map((option) => (
                  <div
                    key={option.value}
                    onClick={() => field.onChange(option.value)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      field.value === option.value
                        ? "border-[#C9A84C] bg-[#C9A84C]/10"
                        : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"
                    }`}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`q10_1-${option.value}`}
                      className="text-[#C9A84C] border-[#C9A84C]/50 mb-2"
                    />
                    <FormLabel htmlFor={`q10_1-${option.value}`} className="cursor-pointer">
                      <div className="font-semibold text-[#ecfdf5]">{option.label}</div>
                      <div className="text-sm text-[#ecfdf5]/60">{option.desc}</div>
                    </FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Question 10.2 - IEDS Matrix Scoring */}
      <FormField
        control={form.control}
        name="q10_matrix"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-semibold text-[#ecfdf5]">
                10.2 Validate IEDS Evaluation Scores
              </CardTitle>
              <CardDescription className="text-[#ecfdf5]/70 text-sm">
                Review and validate the scoring for each strategic option across the seven evaluation criteria (1-10 scale).
              </CardDescription>
            </CardHeader>
            <FormControl>
              <div className="space-y-6">
                {strategies.map((strategy) => (
                  <div key={strategy.key} className="p-4 rounded-lg border border-[#C9A84C]/20 bg-[#011a12]/40">
                    <h4 className="font-bold text-[#ecfdf5] mb-3 flex items-center gap-2">
                      {strategy.name}
                      {strategy.recommended && <Badge className="bg-[#C9A84C] text-black text-xs">RECOMMENDED</Badge>}
                      <span className="text-sm text-[#ecfdf5]/60">(Current Total: {strategy.score})</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {evaluationCriteria.map((criterion) => (
                        <div key={criterion.key}>
                          <label className="text-xs text-[#ecfdf5]/60 block mb-1">
                            {criterion.label} ({criterion.weight})
                          </label>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            step="0.1"
                            value={field.value?.[strategy.key]?.[criterion.key] || sampleScores[strategy.key as keyof typeof sampleScores][criterion.key as keyof typeof sampleScores.heds]}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              field.onChange({
                                ...field.value,
                                [strategy.key]: {
                                  ...field.value?.[strategy.key],
                                  [criterion.key]: newValue
                                }
                              });
                            }}
                            className="bg-[#011a12]/60 border-[#C9A84C]/30 text-[#ecfdf5] text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormDescription className="text-[#ecfdf5]/60 text-sm">
              Adjust scores based on your assessment. The system will automatically recalculate weighted totals.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
