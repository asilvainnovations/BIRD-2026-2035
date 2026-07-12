// src/components/strategic/Section7_Financiers.tsx
// Section 7: Cluster 5 — Financiers
// Islamic Banking, Waqf, Takaful, Microfinance

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export function Section7_Financiers() {
  const form = useFormContext();
  
  return (
    <div className="space-y-8">
      <CardHeader className="p-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs border-purple-400/40 text-purple-400">Cluster 5</Badge>
        </div>
        <CardTitle className="text-2xl font-serif text-[#C9A84C] mt-2">
          7. Financiers — Islamic Banking, Waqf, Takaful, Microfinance
        </CardTitle>
        <CardDescription className="text-[#ecfdf5]/70 text-base mt-2">
          The Financiers cluster provides culturally aligned capital to sustain ecosystem growth across all BEIE clusters. Islamic finance assets currently sit below ₱2B despite a 5.69M Muslim population — a massive untapped opportunity.
        </CardDescription>
      </CardHeader>

      {/* Cluster 5 Financiers Framework Image — Enhanced Wide Format */}
      <div className="relative w-full overflow-hidden rounded-xl border border-purple-400/30 shadow-lg group">
        <img
          src="https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-context-beie-framewoek/public/38.%20Cluster%205_%20Financiers.png"
          alt="Cluster 5: Financiers Framework — Islamic Banking, Waqf, Takaful and Microfinance"
          className="w-full h-auto max-h-[500px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
          <p className="text-xs text-[#ecfdf5]/60 italic">
            Source: BIRD 2026-2035 BEIE Framework — Financiers Cluster
          </p>
        </div>
      </div>

      {/* IEDS Implementation Phases Image — Wide Format */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/20 shadow-lg group">
        <img
          src="https://rgvteytgkugdqdodedxq.databasepad.com/storage/v1/object/public/images-strategic-options-roadmap/public/6.%20The%20IEDS.png"
          alt="IEDS Three-Phase Implementation Strategy"
          className="w-full h-auto max-h-[400px] object-contain bg-[#011a12]/60 transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#022c22]/90 to-transparent p-4">
          <p className="text-xs text-[#ecfdf5]/60 italic">
            Source: BIRD 2026-2035 — IEDS Implementation Phases
          </p>
        </div>
      </div>

      {/* Section 8: Strategic Sequencing & KPI Calibration */}
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-serif text-[#C9A84C]">
          8. Strategic Sequencing & KPI Calibration for Financiers
        </CardTitle>
        <CardDescription className="text-[#ecfdf5]/70 text-base mt-2">
          Phase-based deployment of Islamic finance infrastructure aligned with IEDS implementation timeline
        </CardDescription>
      </CardHeader>

      <div className="bg-[#011a12]/60 border border-[#C9A84C]/30 rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-semibold text-[#ecfdf5]">Phase 1: Foundation Building (2026-2028)</h3>
        <div className="space-y-3">
          <p className="text-[#ecfdf5]/80 text-sm">
            <strong className="text-[#C9A84C]">Budget Allocation:</strong> ₱35-45 billion (cross-cluster)
          </p>
          <p className="text-[#ecfdf5]/80 text-sm">
            <strong className="text-[#C9A84C]">Financiers Focus:</strong> Regulatory sandbox establishment, Islamic finance legal framework operationalization, initial branch expansion
          </p>
          <ul className="list-disc list-inside text-[#ecfdf5]/80 text-sm space-y-1 ml-4">
            <li>Islamic banking branches: 15 → 40 outlets</li>
            <li>Financial inclusion rate: ~38% → 55%</li>
            <li>Islamic finance professionals trained: &lt;20 → 35</li>
            <li>Regulatory frameworks: BSP-BARMM coordination protocols established</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold text-[#ecfdf5] pt-4">Phase 2: Acceleration (2029-2032)</h3>
        <div className="space-y-3">
          <p className="text-[#ecfdf5]/80 text-sm">
            <strong className="text-[#C9A84C]">Budget Allocation:</strong> ₱50-65 billion (cross-cluster)
          </p>
          <p className="text-[#ecfdf5]/80 text-sm">
            <strong className="text-[#C9A84C]">Financiers Focus:</strong> Full provincial capital coverage, takaful & green sukuk instruments launch, MSME financing scale-up
          </p>
          <ul className="list-disc list-inside text-[#ecfdf5]/80 text-sm space-y-1 ml-4">
            <li>Islamic banking branches: 40 → 70 outlets (all provincial capitals)</li>
            <li>MSME accounts with Shariah-compliant products: 5,000 → 35,000</li>
            <li>Islamic banking assets: &lt;₱2B → ₱14B</li>
            <li>Takaful products launched: climate-risk, agricultural, MSME coverage</li>
          </ul>
        </div>

        <h3 className="text-lg font-semibold text-[#ecfdf5] pt-4">Phase 3: Consolidation & Global Integration (2033-2035)</h3>
        <div className="space-y-3">
          <p className="text-[#ecfdf5]/80 text-sm">
            <strong className="text-[#C9A84C]">Budget Allocation:</strong> ₱35-50 billion (cross-cluster)
          </p>
          <p className="text-[#ecfdf5]/80 text-sm">
            <strong className="text-[#C9A84C]">Financiers Focus:</strong> Market maturity, innovation hubs, cross-border Islamic finance integration
          </p>
          <ul className="list-disc list-inside text-[#ecfdf5]/80 text-sm space-y-1 ml-4">
            <li>Islamic banking branches: 70 → 100+ outlets</li>
            <li>Islamic banking assets: ₱14B → ₱20B+</li>
            <li>Adult financial inclusion: 55% → 70%+</li>
            <li>Waqf-managed community enterprises: 40 → 60+</li>
            <li>Cross-border BIMP-EAGA Islamic finance harmonization</li>
          </ul>
        </div>
      </div>

      {/* KPI Calibration Matrix */}
      <div className="bg-[#011a12]/60 border border-[#C9A84C]/30 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-[#ecfdf5]">KPI Calibration & Trigger Mechanisms</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-[#ecfdf5]/90">
            <thead className="border-b border-[#C9A84C]/30">
              <tr>
                <th className="text-left py-2 text-[#C9A84C]">KPI</th>
                <th className="text-left py-2 text-[#C9A84C]">Baseline</th>
                <th className="text-left py-2 text-[#C9A84C]">2030 Target</th>
                <th className="text-left py-2 text-[#C9A84C]">2035 Target</th>
                <th className="text-left py-2 text-[#C9A84C]">Trigger Threshold</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              <tr className="border-b border-[#C9A84C]/10">
                <td className="py-2">Islamic banking assets (₱B)</td>
                <td className="py-2">&lt;₱2B</td>
                <td className="py-2">₱8B</td>
                <td className="py-2">₱20B+</td>
                <td className="py-2 text-amber-400">&lt;70% of trajectory → activate capacity building</td>
              </tr>
              <tr className="border-b border-[#C9A84C]/10">
                <td className="py-2">Financial inclusion rate (%)</td>
                <td className="py-2">~38%</td>
                <td className="py-2">55%</td>
                <td className="py-2">70%+</td>
                <td className="py-2 text-amber-400">&lt;50% coverage → deploy mobile banking</td>
              </tr>
              <tr className="border-b border-[#C9A84C]/10">
                <td className="py-2">Islamic banking outlets</td>
                <td className="py-2">~15</td>
                <td className="py-2">70</td>
                <td className="py-2">100+</td>
                <td className="py-2 text-amber-400">&lt;5 provincial capitals → fast-track licensing</td>
              </tr>
              <tr className="border-b border-[#C9A84C]/10">
                <td className="py-2">MSME Shariah accounts</td>
                <td className="py-2">&lt;5,000</td>
                <td className="py-2">35,000</td>
                <td className="py-2">50,000+</td>
                <td className="py-2 text-amber-400">&lt;60% target → intensify outreach</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Adaptive Management Framework */}
      <div className="bg-[#011a12]/60 border border-[#C9A84C]/30 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold text-[#ecfdf5]">Adaptive Management Framework</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#011a12]/80 border border-[#C9A84C]/20 rounded-lg p-4">
            <h4 className="font-semibold text-[#C9A84C] mb-2">Quarterly Reviews</h4>
            <ul className="text-sm text-[#ecfdf5]/80 space-y-1">
              <li>• KPI variance analysis (&gt;15% triggers intervention)</li>
              <li>Budget utilization assessment</li>
              <li>Branch expansion progress tracking</li>
              <li>MSME financing disbursement review</li>
            </ul>
          </div>
          <div className="bg-[#011a12]/80 border border-[#C9A84C]/20 rounded-lg p-4">
            <h4 className="font-semibold text-[#C9A84C] mb-2">Semi-Annual Adjustments</h4>
            <ul className="text-sm text-[#ecfdf5]/80 space-y-1">
              <li>• Strategy map validation</li>
              <li>Cross-cluster synchronization check</li>
              <li>Regulatory framework updates</li>
              <li>Stakeholder feedback integration</li>
            </ul>
          </div>
          <div className="bg-[#011a12]/80 border border-[#C9A84C]/20 rounded-lg p-4">
            <h4 className="font-semibold text-[#C9A84C] mb-2">Annual Recalibration</h4>
            <ul className="text-sm text-[#ecfdf5]/80 space-y-1">
              <li>• Balanced Scorecard assessment</li>
              <li>Benchmark comparison (OIC/SMIIC, ESG)</li>
              <li>Phase transition readiness evaluation</li>
              <li>Budget reallocation decisions</li>
            </ul>
          </div>
          <div className="bg-[#011a12]/80 border border-[#C9A84C]/20 rounded-lg p-4">
            <h4 className="font-semibold text-[#C9A84C] mb-2">Mid-Term Review (2030)</h4>
            <ul className="text-sm text-[#ecfdf5]/80 space-y-1">
              <li>• Major strategy adjustment</li>
              <li>Phase 3 priority setting</li>
              <li>External evaluation</li>
              <li>Parliamentary oversight review</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Question 7.1 */}
      <FormField
        control={form.control}
        name="q7_1_criticality"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              7.1 How critical is Islamic finance expansion for BARMM's economic sovereignty?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {[
                  { value: "5", label: "Absolutely Critical" },
                  { value: "4", label: "Very Important" },
                  { value: "3", label: "Moderately Important" },
                  { value: "2", label: "Somewhat Important" },
                  { value: "1", label: "Not Important" }
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option.value ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option.value} id={`q7_1-${option.value}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q7_1-${option.value}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">
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

      {/* Question 7.2 */}
      <FormField
        control={form.control}
        name="q7_2_instruments"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              7.2 Which Islamic finance instruments should be prioritized? (Select all that apply)
            </FormLabel>
            <FormControl>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Murabahah (cost-plus financing)",
                  "Musharakah (partnership financing)",
                  "Mudarabah (profit-sharing)",
                  "Ijara (leasing)",
                  "Sukuk (Islamic bonds)",
                  "Takaful (Islamic insurance)",
                  "Waqf (endowment)",
                  "Qard Hasan (benevolent loans)"
                ].map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="q7_2_instruments"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item}
                          className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-lg border border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50 transition-all"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-[#ecfdf5]/90 cursor-pointer">
                            {item}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Question 7.3 */}
      <FormField
        control={form.control}
        name="q7_3_inclusion_target"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              7.3 How realistic is the 25% adult financial inclusion target by 2030?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {[
                  { value: "5", label: "Highly Realistic" },
                  { value: "4", label: "Realistic" },
                  { value: "3", label: "Moderately Realistic" },
                  { value: "2", label: "Ambitious" },
                  { value: "1", label: "Unrealistic" }
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option.value ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option.value} id={`q7_3-${option.value}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q7_3-${option.value}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">
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

      {/* Question 7.4 */}
      <FormField
        control={form.control}
        name="q7_4_asset_paradox"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              7.4 What is the PRIMARY barrier to Islamic finance asset growth (&lt;₱2B despite 5.69M Muslim population)?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-3"
              >
                {[
                  { value: "cultural", label: "Cultural preference for informal finance", desc: "Traditional lending networks dominate" },
                  { value: "regulatory", label: "Regulatory fragmentation", desc: "BSP-BARMM coordination gaps" },
                  { value: "products", label: "Limited product range", desc: "Lack of diverse Shariah-compliant offerings" },
                  { value: "branches", label: "Insufficient branch network", desc: "Physical access constraints in rural/island areas" }
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-start space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option.value ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option.value} id={`q7_4-${option.value}`} className="text-[#C9A84C] border-[#C9A84C]/50 mt-1" />
                    <div className="flex-1">
                      <FormLabel htmlFor={`q7_4-${option.value}`} className="cursor-pointer text-[#ecfdf5]/90 font-semibold block">
                        {option.label}
                      </FormLabel>
                      <p className="text-sm text-[#ecfdf5]/60 mt-1">{option.desc}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Question 7.5 */}
      <FormField
        control={form.control}
        name="q7_5_block_grant"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-[#ecfdf5] text-lg font-semibold">
              7.5 How dependent should Islamic finance be on BARMM block grants vs. private capital mobilization?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {[
                  { value: "5", label: "Primarily Private Capital" },
                  { value: "4", label: "60% Private / 40% Block Grant" },
                  { value: "3", label: "50/50 Mix" },
                  { value: "2", label: "40% Private / 60% Block Grant" },
                  { value: "1", label: "Primarily Block Grants" }
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer
                      ${field.value === option.value ? "border-[#C9A84C] bg-[#C9A84C]/10" : "border-[#C9A84C]/20 bg-[#011a12]/40 hover:border-[#C9A84C]/50"}`}
                  >
                    <RadioGroupItem value={option.value} id={`q7_5-${option.value}`} className="text-[#C9A84C] border-[#C9A84C]/50" />
                    <FormLabel htmlFor={`q7_5-${option.value}`} className="flex-1 cursor-pointer text-[#ecfdf5]/90 font-normal">
                      {option.label}
                    </FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormDescription className="text-[#ecfdf5]/60 text-sm">
              Current projection: 35% block grants, 30% ODA, 35% private/PPP/Islamic finance
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
