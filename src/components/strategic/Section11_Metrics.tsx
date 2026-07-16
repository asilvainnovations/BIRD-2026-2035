import React from "react";
import { cn } from "@/lib/utils";
import { BarChart3, Target, TrendingUp, ShieldCheck, Users, Zap } from "lucide-react";

// ── GlassCard helper ──────────────────────────────────────────────
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

// ── Data Interface ────────────────────────────────────────────────
export interface Section11Data {
  q11_1_calibration_appropriate: string;
  q11_2_governance_kpi_importance?: number;
  q11_3_resilience_kpi_importance?: number;
  q11_4_inclusivity_kpi_importance?: number;
  q11_5_peace_kpi_importance?: number;
  q11_6_cluster_kpi_sufficient: string;
  q11_7_benchmark_priority: string;
}

interface Props {
  data: Section11Data;
  onChange: (data: Section11Data) => void;
}

// ── Component ─────────────────────────────────────────────────────
const Section11_Metrics: React.FC<Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section11Data>(field: K, value: Section11Data[K]) =>
    onChange({ ...data, [field]: value });
  return (
    <div className="space-y-8">
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-[#022c22] text-[#C9A84C] shadow-md shrink-0">
          <BarChart3 className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#022c22]">
            Section 11: Metrics Architecture & Key Performance Indicators
          </h2>
          <p className="text-sm text-[#065f46] mt-1 max-w-3xl">
            The IEDS requires a synchronized, cross-cluster monitoring framework
            that measures not just sectoral outputs but ecosystem health. This
            section presents the 4-tier calibration architecture and key
            performance indicators across all BEIE clusters.
          </p>
        </div>
      </div>

      {/* ── BLOCK 1: KPI Calibration & Phasing Architecture ────── */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-semibold text-[#022c22]">
            KPI Calibration & Phasing Architecture
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-4">
          The calibration framework synchronizes evaluation with the IEDS
          synchronization cycle, progressing from diagnostic anchoring through
          governance activation, value-chain acceleration, and ultimately global
          integration. A long-horizon tier extends the framework to 2040 for
          energy and human-capital tracking.
        </p>

        <div className="overflow-x-auto rounded-lg border border-[#C9A84C]/20 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#022c22] text-white">
                <th className="px-4 py-3 text-left font-semibold">Tier</th>
                <th className="px-4 py-3 text-left font-semibold">Time Horizon</th>
                <th className="px-4 py-3 text-left font-semibold">Strategic Focus</th>
                <th className="px-4 py-3 text-left font-semibold">Data Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A84C]/10">
              <tr className="bg-white hover:bg-[#C9A84C]/5">
                <td className="px-4 py-3 font-semibold text-[#022c22]">Baseline</td>
                <td className="px-4 py-3 text-[#065f46]">2024-2025</td>
                <td className="px-4 py-3 text-[#065f46]">Diagnostic anchoring</td>
                <td className="px-4 py-3 text-[#065f46]">PSA-BARMM, MFBM</td>
              </tr>
              <tr className="bg-white hover:bg-[#C9A84C]/5">
                <td className="px-4 py-3 font-semibold text-[#022c22]">Interim 1</td>
                <td className="px-4 py-3 text-[#065f46]">2028</td>
                <td className="px-4 py-3 text-[#065f46]">Governance OS activation</td>
                <td className="px-4 py-3 text-[#065f46]">BEGMP dashboards, BHB audits</td>
              </tr>
              <tr className="bg-white hover:bg-[#C9A84C]/5">
                <td className="px-4 py-3 font-semibold text-[#022c22]">Interim 2</td>
                <td className="px-4 py-3 text-[#065f46]">2030</td>
                <td className="px-4 py-3 text-[#065f46]">Value-chain acceleration</td>
                <td className="px-4 py-3 text-[#065f46]">BBOI tracking, MTIT registry</td>
              </tr>
              <tr className="bg-white hover:bg-[#C9A84C]/5">
                <td className="px-4 py-3 font-semibold text-[#022c22]">Terminal</td>
                <td className="px-4 py-3 text-[#065f46]">2035</td>
                <td className="px-4 py-3 text-[#065f46]">Global integration</td>
                <td className="px-4 py-3 text-[#065f46]">PSA-BARMM GRDP, OIC reports</td>
              </tr>
              <tr className="bg-white hover:bg-[#C9A84C]/5">
                <td className="px-4 py-3 font-semibold text-[#022c22]">Long-Horizon</td>
                <td className="px-4 py-3 text-[#065f46]">2040</td>
                <td className="px-4 py-3 text-[#065f46]">Energy & human capital</td>
                <td className="px-4 py-3 text-[#065f46]">BSEMP audits, TESDA cohorts</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm font-medium text-[#022c22] mb-3">
          Is this 5-tier calibration architecture appropriate for BARMM?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {["Yes, fully appropriate", "Mostly appropriate", "Needs adjustment", "Overly complex"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q11_1_calibration_appropriate", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q11_1_calibration_appropriate === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            )
          )}
        </div>
      </GlassCard>

      {/* ── BLOCK 2: Cross-Cutting Operating Systems KPIs ──────── */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-semibold text-[#022c22]">
            Cross-Cutting Operating Systems KPIs
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-6">
          These KPIs serve as the primary synchronization signals for the four
          cross-cutting operating systems. Each target reflects the trajectory
          from current baseline to the 2035 ambition horizon.
        </p>

        {/* ── Moral Governance ── */}
        <div className="space-y-3 mb-8 pb-8 border-b border-[#C9A84C]/20">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
            <h4 className="font-semibold text-[#022c22] text-sm uppercase tracking-wide">
              Moral Governance
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
              <p className="text-xs text-[#065f46] mb-1">Public financial disclosure</p>
              <p className="text-lg font-bold text-[#022c22]">
                ~65% <span className="text-[#C9A84C] text-sm font-normal">→ 100% by 2035</span>
              </p>
            </div>
            <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
              <p className="text-xs text-[#065f46] mb-1">Investor ombudsman</p>
              <p className="text-lg font-bold text-[#022c22]">
                Not established <span className="text-[#C9A84C] text-sm font-normal">→ 8.0+/10 satisfaction</span>
              </p>
            </div>
            <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
              <p className="text-xs text-[#065f46] mb-1">Digital procurement adoption</p>
              <p className="text-lg font-bold text-[#022c22]">
                &lt;30% <span className="text-[#C9A84C] text-sm font-normal">→ 100%</span>
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-[#065f46] mb-2">Rate importance of governance KPIs (1-5)</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  onClick={() => update("q11_2_governance_kpi_importance", v)}
                  className={cn(
                    "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                    data.q11_2_governance_kpi_importance === v
                      ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                      : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Resilience ── */}
        <div className="space-y-3 mb-8 pb-8 border-b border-[#C9A84C]/20">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#C9A84C]" />
            <h4 className="font-semibold text-[#022c22] text-sm uppercase tracking-wide">
              Resilience
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
              <p className="text-xs text-[#065f46] mb-1">Climate-risk screening</p>
              <p className="text-lg font-bold text-[#022c22]">
                0% <span className="text-[#C9A84C] text-sm font-normal">→ 100%</span>
              </p>
            </div>
            <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
              <p className="text-xs text-[#065f46] mb-1">Regional resilience index</p>
              <p className="text-lg font-bold text-[#022c22]">
                Not developed <span className="text-[#C9A84C] text-sm font-normal">→ Standardized reporting</span>
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-[#065f46] mb-2">Rate importance of resilience KPIs (1-5)</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  onClick={() => update("q11_3_resilience_kpi_importance", v)}
                  className={cn(
                    "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                    data.q11_3_resilience_kpi_importance === v
                      ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                      : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Inclusivity ── */}
        <div className="space-y-3 mb-8 pb-8 border-b border-[#C9A84C]/20">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C9A84C]" />
            <h4 className="font-semibold text-[#022c22] text-sm uppercase tracking-wide">
              Inclusivity
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
              <p className="text-xs text-[#065f46] mb-1">MSME participation</p>
              <p className="text-lg font-bold text-[#022c22]">
                &lt;35% <span className="text-[#C9A84C] text-sm font-normal">→ &gt;75%</span>
              </p>
            </div>
            <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
              <p className="text-xs text-[#065f46] mb-1">Gender-balanced employment</p>
              <p className="text-lg font-bold text-[#022c22]">
                ~42% <span className="text-[#C9A84C] text-sm font-normal">→ 50%+</span>
              </p>
            </div>
            <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
              <p className="text-xs text-[#065f46] mb-1">Functional literacy</p>
              <p className="text-lg font-bold text-[#022c22]">
                59.3% <span className="text-[#C9A84C] text-sm font-normal">→ 75%+</span>
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-[#065f46] mb-2">Rate importance of inclusivity KPIs (1-5)</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  onClick={() => update("q11_4_inclusivity_kpi_importance", v)}
                  className={cn(
                    "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                    data.q11_4_inclusivity_kpi_importance === v
                      ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                      : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Peace & Security ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
            <h4 className="font-semibold text-[#022c22] text-sm uppercase tracking-wide">
              Peace &amp; Security
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
              <p className="text-xs text-[#065f46] mb-1">Combatant reintegration</p>
              <p className="text-lg font-bold text-[#022c22]">
                ~62% <span className="text-[#C9A84C] text-sm font-normal">→ Sustained &gt;95%</span>
              </p>
            </div>
            <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
              <p className="text-xs text-[#065f46] mb-1">Rido / conflict reduction</p>
              <p className="text-lg font-bold text-[#022c22]">
                Baseline <span className="text-[#C9A84C] text-sm font-normal">→ &gt;20% cumulative</span>
              </p>
            </div>
            <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
              <p className="text-xs text-[#065f46] mb-1">Investor perception</p>
              <p className="text-lg font-bold text-[#022c22]">
                Baseline <span className="text-[#C9A84C] text-sm font-normal">→ +25% improvement</span>
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-[#065f46] mb-2">Rate importance of peace &amp; security KPIs (1-5)</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  onClick={() => update("q11_5_peace_kpi_importance", v)}
                  className={cn(
                    "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                    data.q11_5_peace_kpi_importance === v
                      ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                      : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ── BLOCK 3: Cluster-Specific Performance Indicators ───── */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-semibold text-[#022c22]">
            Cluster-Specific Performance Indicators
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-4">
          Each BEIE cluster is assigned headline KPIs derived from its strategic
          action plan. These metrics serve as leading indicators of cluster-level
          performance and synchronization readiness.
        </p>

        <div className="overflow-x-auto rounded-lg border border-[#C9A84C]/20 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#022c22] text-white">
                <th className="px-4 py-3 text-left font-semibold">Cluster</th>
                <th className="px-4 py-3 text-left font-semibold">Headline KPIs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A84C]/10">
              <tr className="bg-white hover:bg-[#C9A84C]/5">
                <td className="px-4 py-3 font-semibold text-[#022c22] whitespace-nowrap">
                  Foundations
                </td>
                <td className="px-4 py-3 text-[#065f46]">
                  Priority crop yield +15%, Post-harvest loss -30%, RE mix 85%,
                  Household electrification 90%, REDD+ revenue generating
                </td>
              </tr>
              <tr className="bg-white hover:bg-[#C9A84C]/5">
                <td className="px-4 py-3 font-semibold text-[#022c22] whitespace-nowrap">
                  Transformers
                </td>
                <td className="px-4 py-3 text-[#065f46]">
                  5,000+ halal MSMEs, &#8369;5B halal exports, 3M tourists,
                  20,000+ sustained MSME ops
                </td>
              </tr>
              <tr className="bg-white hover:bg-[#C9A84C]/5">
                <td className="px-4 py-3 font-semibold text-[#022c22] whitespace-nowrap">
                  Enablers
                </td>
                <td className="px-4 py-3 text-[#065f46]">
                  100% gov broadband, 500+ trained civil servants, &gt;90% budget
                  execution, 8/10 coordination
                </td>
              </tr>
              <tr className="bg-white hover:bg-[#C9A84C]/5">
                <td className="px-4 py-3 font-semibold text-[#022c22] whitespace-nowrap">
                  Connectors
                </td>
                <td className="px-4 py-3 text-[#065f46]">
                  +50% BIMP-EAGA trade, &#8369;2B+ halal corridor, 85% digital
                  customs, 7 provincial offices
                </td>
              </tr>
              <tr className="bg-white hover:bg-[#C9A84C]/5">
                <td className="px-4 py-3 font-semibold text-[#022c22] whitespace-nowrap">
                  Financiers
                </td>
                <td className="px-4 py-3 text-[#065f46]">
                  &#8369;20B+ Islamic banking assets, 35%+ adult inclusion, 100+
                  branches, &#8369;15B+ approvals
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm font-medium text-[#022c22] mb-3">
          Are these cluster KPIs sufficient for tracking IEDS progress?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Yes",
            "Needs more leading indicators",
            "Needs more cross-cluster sync metrics",
            "Insufficient",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q11_6_cluster_kpi_sufficient", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q11_6_cluster_kpi_sufficient === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* ── BLOCK 4: Benchmark Alignment ────────────────────────── */}
      <GlassCard>
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-semibold text-[#022c22]">
            Benchmark Alignment
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-4">
          BARMM&apos;s KPI framework must align with multi-layer benchmarks spanning
          Islamic standards, global ESG frameworks, national development plans,
          and the United Nations Sustainable Development Goals. The following
          table summarizes the key alignment targets.
        </p>

        <div className="space-y-4 mb-6">
          {/* OIC/SMIIC */}
          <div className="rounded-lg border border-[#C9A84C]/20 p-4 bg-[#C9A84C]/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#022c22] text-[#C9A84C]">
                OIC / SMIIC
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#065f46]">
              <p>
                <span className="font-medium text-[#022c22]">Halal certification</span> — &le;21 days processing time
              </p>
              <p>
                <span className="font-medium text-[#022c22]">Accreditation</span> — Full OIC accreditation + MRA signed
              </p>
            </div>
          </div>

          {/* ESG */}
          <div className="rounded-lg border border-[#C9A84C]/20 p-4 bg-[#C9A84C]/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#022c22] text-[#C9A84C]">
                ESG
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-[#065f46]">
              <p>
                <span className="font-medium text-[#022c22]">Renewable energy</span> — 85%+
              </p>
              <p>
                <span className="font-medium text-[#022c22]">Poverty rate</span> — &lt;20%
              </p>
              <p>
                <span className="font-medium text-[#022c22]">Business registration</span> — 1 day (digital)
              </p>
            </div>
          </div>

          {/* PDP 2023-2028 */}
          <div className="rounded-lg border border-[#C9A84C]/20 p-4 bg-[#C9A84C]/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#022c22] text-[#C9A84C]">
                PDP 2023-2028
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-[#065f46]">
              <p>
                <span className="font-medium text-[#022c22]">GRDP growth</span> — 5-6%
              </p>
              <p>
                <span className="font-medium text-[#022c22]">MSME share</span> — 40% GDP
              </p>
              <p>
                <span className="font-medium text-[#022c22]">Investment-to-GDP</span> — 30%
              </p>
            </div>
          </div>

          {/* SDGs */}
          <div className="rounded-lg border border-[#C9A84C]/20 p-4 bg-[#C9A84C]/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#022c22] text-[#C9A84C]">
                SDGs
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-[#065f46]">
              <p>
                <span className="font-medium text-[#022c22]">Literacy</span> — 75%+ (SDG 4)
              </p>
              <p>
                <span className="font-medium text-[#022c22]">Climate resilience</span> — 100% (SDG 13)
              </p>
              <p>
                <span className="font-medium text-[#022c22]">Gender parity</span> — 50%+ (SDG 5 &amp; 8)
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which benchmark framework should BARMM prioritize?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            "OIC/SMIIC standards",
            "ESG criteria",
            "Philippine Development Plan",
            "SDGs",
            "All equally",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q11_7_benchmark_priority", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q11_7_benchmark_priority === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* ── BLOCK 5: Metrics Framework Image ────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/KPI-Framework.png"
          alt="BIRD KPI Framework - Four-tier calibration architecture"
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            The 4-tier KPI calibration architecture ensures metrics remain
            responsive to IEDS synchronization requirements. Source: Chapter 5 -
            Metrics and KPI Benchmarking Framework.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section11_Metrics;
