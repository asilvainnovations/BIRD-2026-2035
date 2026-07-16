import React from "react";
import {
  Wallet,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  PieChart,
  Target,
  TrendingUp,
  Users,
  Leaf,
  Building2,
  Landmark,
  Zap,
  Wifi,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Section13Data {
  q13_1_funding_mix_fair?: number;
  q13_2_targets_realistic?: number;
  q13_3_high_risk_concern?: number;
  q13_4_medium_risk_concern?: number;
  q13_5_low_risk_concern?: number;
  q13_6_budget_priority_phase: string;
  q13_7_budget_priority_cluster: string;
  q13_8_blended_finance_opinion: string;
}

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "rounded-xl border border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm p-6",
      className
    )}
  >
    {children}
  </div>
);

interface Section13Props {
  data: Section13Data;
  onChange: (data: Section13Data) => void;
}

const Section13_PriorityActions: React.FC<Section13Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section13Data>(field: K, value: Section13Data[K]) =>
    onChange({ ...data, [field]: value });
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-[#022c22] text-[#C9A84C]">
          <Wallet size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#022c22]">
            Section 13: Priority Actions & Budget Deployment
          </h2>
          <p className="text-sm text-[#065f46] mt-2 max-w-3xl">
            The IEDS requires ₱120-160 billion in coordinated capital deployment
            (2026-2035), structured around coherent sequencing logic to manage
            fiscal flow, mitigate implementation risk, and ensure cluster
            synchronization.
          </p>
        </div>
      </div>

      {/* BLOCK 1: Total Capital Deployment Image */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Total%20Capital%20Deployment.png"
          alt="Total Capital Deployment: ₱120-160B across three phases"
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-sm font-medium text-white">
            Total Capital Deployment across Activate (₱35-45B), Scale
            (₱50-65B), and Consolidate (₱35-50B) phases.
          </p>
          <p className="text-xs italic text-white/70">
            Source: Chapter 4 - Strategic Options
          </p>
        </div>
      </div>

      {/* BLOCK 2: Capital Phasing Table */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <PieChart size={22} className="text-[#C9A84C]" />
          <h3 className="text-lg font-bold text-[#022c22]">
            Capital Phasing Breakdown
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-4">
          The three-phase capital deployment structure allocates ₱120-160 billion
          across Activate, Scale, and Consolidate periods, with each phase targeting
          specific investment clusters and flagship deployments.
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#022c22] text-white">
                <th className="p-3 text-left font-semibold rounded-tl-lg">
                  Phase
                </th>
                <th className="p-3 text-left font-semibold">Period</th>
                <th className="p-3 text-left font-semibold">Allocation</th>
                <th className="p-3 text-left font-semibold">
                  Focus Clusters
                </th>
                <th className="p-3 text-left font-semibold rounded-tr-lg">
                  Key Deployments
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#C9A84C]/20 bg-white hover:bg-[#C9A84C]/5 transition-colors">
                <td className="p-3 font-bold text-[#022c22]">ACTIVATE</td>
                <td className="p-3 text-[#022c22]">2026-2028</td>
                <td className="p-3 font-semibold text-[#1B4D3E]">
                  ₱35-45B
                </td>
                <td className="p-3 text-[#065f46]">Enablers, OS</td>
                <td className="p-3 text-[#065f46]">
                  ZBIP (₱6.67B), 800km roads, digital backbone, BHB, Forestry
                  Code, Islamic finance sandbox
                </td>
              </tr>
              <tr className="border-b border-[#C9A84C]/20 bg-white hover:bg-[#C9A84C]/5 transition-colors">
                <td className="p-3 font-bold text-[#022c22]">SCALE</td>
                <td className="p-3 text-[#022c22]">2029-2031</td>
                <td className="p-3 font-semibold text-[#1B4D3E]">
                  ₱50-65B
                </td>
                <td className="p-3 text-[#065f46]">
                  Transformers, Foundations, Financiers
                </td>
                <td className="p-3 text-[#065f46]">
                  Halal Park, 10 agro-corridors, REDD+ registry, branch
                  expansion, TESDA academies
                </td>
              </tr>
              <tr className="bg-white hover:bg-[#C9A84C]/5 transition-colors">
                <td className="p-3 font-bold text-[#022c22] rounded-bl-lg">
                  CONSOLIDATE
                </td>
                <td className="p-3 text-[#022c22]">2032-2035</td>
                <td className="p-3 font-semibold text-[#1B4D3E]">
                  ₱35-50B
                </td>
                <td className="p-3 text-[#065f46]">
                  Connectors, OS
                </td>
                <td className="p-3 text-[#065f46] rounded-br-lg">
                  UAE/GCC hubs, eco-tourism, carbon monetization, innovation
                  hubs, MRA, aftercare
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-[#1B4D3E] text-white">
                <td colSpan={2} className="p-3 font-bold rounded-bl-lg">
                  TOTAL
                </td>
                <td colSpan={3} className="p-3 font-bold rounded-br-lg">
                  ₱120-160 billion
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/30 p-4 mb-4">
          <p className="text-sm font-semibold text-[#022c22] mb-2">
            Funding Mix
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1B4D3E]" />
              <span className="text-sm text-[#022c22]">
                35% BARMM block grants
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#C9A84C]" />
              <span className="text-sm text-[#022c22]">
                30% ODA / climate finance
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#065f46]" />
              <span className="text-sm text-[#022c22]">
                35% Private capital / PPP / Islamic finance
              </span>
            </div>
          </div>
        </div>

        {/* q13_1_funding_mix_fair */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            Is this funding mix realistic?{" "}
            <span className="text-[#065f46]">(1 = unrealistic, 5 = very realistic)</span>
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => update("q13_1_funding_mix_fair", v)}
                className={cn(
                  "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                  data.q13_1_funding_mix_fair === v
                    ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* BLOCK 3: 2035 Targets Dashboard */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <Target size={22} className="text-[#C9A84C]" />
          <h3 className="text-lg font-bold text-[#022c22]">
            2035 Targets Dashboard
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-6">
          These targets represent the intended outcomes of the full 10-year IEDS
          implementation, spanning macroeconomic growth, employment, halal &amp;
          green economy, financial inclusion, governance, and infrastructure.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Macroeconomic */}
          <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={18} className="text-[#C9A84C]" />
              <p className="text-sm font-bold text-[#022c22]">Macroeconomic</p>
            </div>
            <ul className="space-y-2 text-sm text-[#022c22]">
              <li className="flex justify-between">
                <span className="text-[#065f46]">GRDP</span>
                <span className="font-semibold">₱550B+</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#065f46]">Annual investment approvals</span>
                <span className="font-semibold">₱15B+</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#065f46]">Export value</span>
                <span className="font-semibold">₱40B+</span>
              </li>
            </ul>
          </div>

          {/* Employment & Poverty */}
          <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users size={18} className="text-[#C9A84C]" />
              <p className="text-sm font-bold text-[#022c22]">
                Employment &amp; Poverty
              </p>
            </div>
            <ul className="space-y-2 text-sm text-[#022c22]">
              <li className="flex justify-between">
                <span className="text-[#065f46]">BOI-registered jobs</span>
                <span className="font-semibold">20,000+</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#065f46]">Poverty incidence</span>
                <span className="font-semibold">&lt;20%</span>
              </li>
            </ul>
          </div>

          {/* Halal & Green Economy */}
          <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Leaf size={18} className="text-[#C9A84C]" />
              <p className="text-sm font-bold text-[#022c22]">
                Halal &amp; Green Economy
              </p>
            </div>
            <ul className="space-y-2 text-sm text-[#022c22]">
              <li className="flex justify-between">
                <span className="text-[#065f46]">Halal-certified MSMEs</span>
                <span className="font-semibold">5,000+</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#065f46]">Carbon/PES revenue</span>
                <span className="font-semibold">₱500M+/yr</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#065f46]">Carbon credits</span>
                <span className="font-semibold">1M+ tCO2e/yr</span>
              </li>
            </ul>
          </div>

          {/* Financial Inclusion */}
          <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Building2 size={18} className="text-[#C9A84C]" />
              <p className="text-sm font-bold text-[#022c22]">
                Financial Inclusion
              </p>
            </div>
            <ul className="space-y-2 text-sm text-[#022c22]">
              <li className="flex justify-between">
                <span className="text-[#065f46]">Islamic banking assets</span>
                <span className="font-semibold">₱20B+</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#065f46]">Adult financial penetration</span>
                <span className="font-semibold">25%</span>
              </li>
            </ul>
          </div>

          {/* Governance & OS */}
          <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Landmark size={18} className="text-[#C9A84C]" />
              <p className="text-sm font-bold text-[#022c22]">
                Governance &amp; OS
              </p>
            </div>
            <ul className="space-y-2 text-sm text-[#022c22]">
              <li className="flex justify-between">
                <span className="text-[#065f46]">Budget execution</span>
                <span className="font-semibold">90%+</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#065f46]">Inter-agency coordination</span>
                <span className="font-semibold">8/10</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#065f46]">Digital registration</span>
                <span className="font-semibold">1 day</span>
              </li>
            </ul>
          </div>

          {/* Infrastructure */}
          <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-white p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className="text-[#C9A84C]" />
              <p className="text-sm font-bold text-[#022c22]">Infrastructure</p>
            </div>
            <ul className="space-y-2 text-sm text-[#022c22]">
              <li className="flex justify-between">
                <span className="text-[#065f46]">Electrification</span>
                <span className="font-semibold">100%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#065f46]">Broadband households</span>
                <span className="font-semibold">85%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-[#065f46]">Logistics cost reduction</span>
                <span className="font-semibold">30%</span>
              </li>
            </ul>
          </div>
        </div>

        {/* q13_2_targets_realistic */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            How realistic are these 2035 targets overall?{" "}
            <span className="text-[#065f46]">
              (1 = unrealistic, 5 = fully realistic)
            </span>
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => update("q13_2_targets_realistic", v)}
                className={cn(
                  "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                  data.q13_2_targets_realistic === v
                    ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* BLOCK 4: Risk Assessment */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={22} className="text-[#C9A84C]" />
          <h3 className="text-lg font-bold text-[#022c22]">
            Risk Assessment Matrix
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-6">
          The IEDS implementation carries risks across three tiers. Each risk is
          paired with a proposed mitigation mechanism. Please rate your level of
          concern for each risk category.
        </p>

        {/* HIGH RISKS */}
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-red-600" />
            <p className="text-sm font-bold text-red-700 uppercase tracking-wide">
              High Risks
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-red-500" />
              <div>
                <p className="text-sm font-semibold text-[#022c22]">
                  Inter-agency coordination complexity
                </p>
                <p className="text-xs text-[#065f46]">
                  Mitigation: Bangsamoro Investment Command Center
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-red-500" />
              <div>
                <p className="text-sm font-semibold text-[#022c22]">
                  Fiscal mobilization &amp; sequencing slippage
                </p>
                <p className="text-xs text-[#065f46]">
                  Mitigation: Trigger-based budgeting, 20% contingency
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* q13_3_high_risk_concern */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            How concerned are you about HIGH risks?{" "}
            <span className="text-[#065f46]">
              (1 = not concerned, 5 = very concerned)
            </span>
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => update("q13_3_high_risk_concern", v)}
                className={cn(
                  "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                  data.q13_3_high_risk_concern === v
                    ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* MEDIUM RISKS */}
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={18} className="text-amber-600" />
            <p className="text-sm font-bold text-amber-700 uppercase tracking-wide">
              Medium Risks
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-amber-500" />
              <div>
                <p className="text-sm font-semibold text-[#022c22]">
                  Standards recognition &amp; market access
                </p>
                <p className="text-xs text-[#065f46]">
                  Mitigation: Early SMIIC engagement, digital traceability
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-amber-500" />
              <div>
                <p className="text-sm font-semibold text-[#022c22]">
                  Climate &amp; security shocks
                </p>
                <p className="text-xs text-[#065f46]">
                  Mitigation: Climate-resilient design, takaful products
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* q13_4_medium_risk_concern */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            How concerned are you about MEDIUM risks?{" "}
            <span className="text-[#065f46]">
              (1 = not concerned, 5 = very concerned)
            </span>
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => update("q13_4_medium_risk_concern", v)}
                className={cn(
                  "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                  data.q13_4_medium_risk_concern === v
                    ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* LOW RISKS */}
        <div className="rounded-lg border border-green-300 bg-green-50 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={18} className="text-green-600" />
            <p className="text-sm font-bold text-green-700 uppercase tracking-wide">
              Low Risks
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-green-500" />
              <div>
                <p className="text-sm font-semibold text-[#022c22]">
                  Cultural identity misalignment
                </p>
                <p className="text-xs text-[#065f46]">
                  Mitigation: Khalifa stewardship, community benefit-sharing
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* q13_5_low_risk_concern */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            How concerned are you about LOW risks?{" "}
            <span className="text-[#065f46]">
              (1 = not concerned, 5 = very concerned)
            </span>
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => update("q13_5_low_risk_concern", v)}
                className={cn(
                  "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                  data.q13_5_low_risk_concern === v
                    ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* BLOCK 5: Respondent Budget Priority */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <PieChart size={22} className="text-[#C9A84C]" />
          <h3 className="text-lg font-bold text-[#022c22]">
            Your Budget Priorities
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-6">
          Given the ₱120-160 billion total capital envelope, share your views on
          where the largest share should be directed and how the funding should
          be structured.
        </p>

        {/* q13_6_budget_priority_phase */}
        <div className="mb-6">
          <p className="text-sm font-medium text-[#022c22] mb-3">
            Which phase deserves the HIGHEST budget priority?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              { label: "Sequence A (Activate)", value: "activate" },
              { label: "Sequence B (Scale)", value: "scale" },
              { label: "Sequence C (Consolidate)", value: "consolidate" },
              { label: "Equal across all", value: "equal" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  update("q13_6_budget_priority_phase", opt.value)
                }
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q13_6_budget_priority_phase === opt.value
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* q13_7_budget_priority_cluster */}
        <div className="mb-6">
          <p className="text-sm font-medium text-[#022c22] mb-3">
            Which cluster deserves the LARGEST share?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {[
              "Foundations",
              "Transformers",
              "Enablers",
              "Connectors",
              "Financiers",
              "Operating Systems",
            ].map((opt) => (
              <button
                key={opt}
                onClick={() => update("q13_7_budget_priority_cluster", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-center transition-all",
                  data.q13_7_budget_priority_cluster === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* q13_8_blended_finance_opinion */}
        <div>
          <p className="text-sm font-medium text-[#022c22] mb-3">
            Should BARMM increase reliance on blended finance (ODA + private
            capital)?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["Strongly agree", "Agree", "Neutral", "Disagree"].map((opt) => (
              <button
                key={opt}
                onClick={() =>
                  update("q13_8_blended_finance_opinion", opt)
                }
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q13_8_blended_finance_opinion === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Section13_PriorityActions;
