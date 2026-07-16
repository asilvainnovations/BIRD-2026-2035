import React from "react";
import { Rocket, CheckCircle2, AlertTriangle, TrendingUp, Users, Leaf, Building2, Globe, Zap, Wifi, BarChart3, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Data Interface ──────────────────────────────────────────────
export interface Section10Data {
  q10_1_ieds_preference: string;
  q10_2_sequence_a_priority?: number;
  q10_3_sequence_b_priority?: number;
  q10_4_sequence_c_priority?: number;
  q10_5_sequencing_logic: string;
  q10_6_risk_mitigation: string;
  q10_7_outcomes_achievable?: number;
}

// ── GlassCard Helper ────────────────────────────────────────────
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

// ── Component ───────────────────────────────────────────────────
interface Section10Props {
  data: Section10Data;
  onChange: (data: Section10Data) => void;
}

const Section10_IEDS: React.FC<Section10Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section10Data>(field: K, value: Section10Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  // ── Evaluation Matrix Data ──
  const criteria = [
    { name: "Economic Impact", weight: "25%", score: 9.5, weighted: 2.38 },
    { name: "Feasibility", weight: "20%", score: 8.0, weighted: 1.60 },
    { name: "Alignment with BARMM Identity", weight: "15%", score: 9.0, weighted: 1.35 },
    { name: "Systems Leverage", weight: "15%", score: 10.0, weighted: 1.50 },
    { name: "Risk-Return Profile", weight: "10%", score: 7.5, weighted: 0.75 },
    { name: "Inclusivity", weight: "10%", score: 9.0, weighted: 0.90 },
    { name: "Sustainability", weight: "5%", score: 9.0, weighted: 0.45 },
  ];

  // ── Strategic Options Data ──
  const options = [
    {
      code: "HEDS",
      name: "Halal Economy Dominance Strategy",
      score: "7.61/10",
      grdp: "₱150–200B",
      focus: "Halal certification, export expansion, MSME clustering",
    },
    {
      code: "GEMS",
      name: "Green Economy Monetization Strategy",
      score: "7.16/10",
      grdp: "₱80–120B",
      focus: "Carbon credits, PES, biodiversity assets",
    },
    {
      code: "IFES",
      name: "Infrastructure-First Enabling Strategy",
      score: "7.48/10",
      grdp: "₱200–280B",
      focus: "Binding constraint removal, roads, power, digital",
    },
    {
      code: "IEDS",
      name: "Integrated Ecosystem Development Strategy",
      score: "8.93/10",
      grdp: "₱550B+",
      focus: "SYNCHRONIZES all clusters — Halal, Green, Infra, Finance",
      highlight: true,
    },
  ];

  // ── 2035 Outcomes Data ──
  const outcomes = [
    {
      icon: BarChart3,
      category: "Macroeconomic",
      items: ["GRDP ₱550B+", "₱15B+ annual investment approvals", "₱40B+ export value"],
    },
    {
      icon: Users,
      category: "Employment & Poverty",
      items: ["20,000+ BOI-registered jobs", "Poverty incidence <20%"],
    },
    {
      icon: Leaf,
      category: "Halal & Green Economy",
      items: ["5,000+ halal-certified MSMEs", "₱500M+ annual carbon/PES revenue"],
    },
    {
      icon: Wallet,
      category: "Financial Inclusion",
      items: ["₱20B+ Islamic banking assets", "25% adult financial penetration"],
    },
    {
      icon: Building2,
      category: "Governance & OS",
      items: ["90%+ budget execution", "8/10 inter-agency coordination", "1-day digital registration"],
    },
    {
      icon: Zap,
      category: "Infrastructure",
      items: ["100% electrification", "85% household broadband", "30% logistics cost reduction"],
    },
  ];

  return (
    <div className="space-y-8">
      {/* ═══════════════════════════════════════════ HEADER */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#022c22] flex items-center justify-center">
          <Rocket className="w-5 h-5 text-[#C9A84C]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#022c22]">
            Section 10: Integrated Ecosystem Development Strategy (IEDS)
          </h2>
          <p className="text-sm text-[#065f46]">
            The IEDS sequences three strategic options — Halal Economy Dominance (HEDS), Green Economy Monetization (GEMS), and Infrastructure-First Enabling (IFES) — into a coherent, time-bound execution plan. It is the only pathway projected to achieve the full ₱550B GRDP target by 2035.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ BLOCK 1: Execution Engine Image */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-[#022c22] mb-3">
          The Execution Engine
        </h3>
        <p className="text-sm text-[#065f46] mb-4">
          The Execution Engine presents the best pathway among four strategic options by sequencing the first three into a coherent, time-bound execution plan.
        </p>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Execution%20Engine%20-IEDS.png"
            alt="The Execution Engine: Integrated Ecosystem Development Strategy (IEDS)"
            className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Source: BIRD Strategic Options Analysis
            </p>
          </div>
        </div>
      </GlassCard>

      {/* ═══════════════════════════════════════════ BLOCK 2: Four Strategic Options Overview */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-[#022c22] mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
          Four Strategic Options Overview
        </h3>
        <p className="text-sm text-[#065f46] mb-5">
          Compare the four strategic options evaluated across seven criteria. IEDS outperforms all standalone strategies by integrating their best elements.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((opt) => (
            <div
              key={opt.code}
              className={cn(
                "rounded-xl border p-4 transition-all",
                opt.highlight
                  ? "border-[#C9A84C] bg-[#1B4D3E]/5 shadow-md"
                  : "border-[#C9A84C]/20 bg-white hover:border-[#C9A84C]/40"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-block px-2 py-0.5 rounded text-xs font-bold",
                      opt.highlight
                        ? "bg-[#1B4D3E] text-white"
                        : "bg-[#022c22] text-[#C9A84C]"
                    )}
                  >
                    {opt.code}
                  </span>
                  {opt.highlight && (
                    <CheckCircle2 className="w-4 h-4 text-[#C9A84C]" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm font-bold",
                    opt.highlight ? "text-[#1B4D3E]" : "text-[#022c22]"
                  )}
                >
                  {opt.score}
                </span>
              </div>
              <h4
                className={cn(
                  "text-sm font-semibold mb-1",
                  opt.highlight ? "text-[#1B4D3E]" : "text-[#022c22]"
                )}
              >
                {opt.name}
              </h4>
              <p className="text-xs text-[#065f46] mb-1.5">{opt.focus}</p>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span className="text-xs font-medium text-[#022c22]">
                  GRDP: {opt.grdp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* ═══════════════════════════════════════════ BLOCK 3: IEDS Evaluation Matrix */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-[#022c22] mb-2 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
          IEDS Evaluation Matrix
        </h3>
        <p className="text-sm text-[#065f46] mb-5">
          IEDS was evaluated across seven weighted criteria, scoring <strong>8.93/10</strong> — the highest of all four options.
        </p>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-2 px-3 py-2 bg-[#022c22]/5 rounded-t-lg text-xs font-semibold text-[#022c22]">
          <span className="col-span-4">Criterion</span>
          <span className="col-span-2 text-center">Weight</span>
          <span className="col-span-3 text-center">Score</span>
          <span className="col-span-3 text-center">Weighted</span>
        </div>

        {/* Table Rows */}
        <div className="space-y-1">
          {criteria.map((c) => (
            <div
              key={c.name}
              className="grid grid-cols-12 gap-2 px-3 py-2.5 bg-white rounded-lg border border-[#C9A84C]/10 items-center"
            >
              <span className="col-span-12 md:col-span-4 text-xs font-medium text-[#022c22]">
                {c.name}
              </span>
              <span className="col-span-4 md:col-span-2 text-center text-xs text-[#065f46]">
                {c.weight}
              </span>
              <span className="col-span-4 md:col-span-3 text-center text-xs font-semibold text-[#022c22]">
                {c.score}
              </span>
              <span className="col-span-4 md:col-span-3 text-center text-xs font-bold text-[#1B4D3E]">
                {c.weighted.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-3 grid grid-cols-12 gap-2 px-3 py-3 bg-[#1B4D3E]/10 rounded-lg border border-[#C9A84C]/30 items-center">
          <span className="col-span-4 text-xs font-bold text-[#022c22]">TOTAL</span>
          <span className="col-span-2 text-center text-xs font-bold text-[#022c22]">100%</span>
          <span className="col-span-3 text-center text-xs font-bold text-[#1B4D3E]">—</span>
          <span className="col-span-3 text-center text-sm font-bold text-[#1B4D3E]">8.93</span>
        </div>

        {/* Question */}
        <div className="mt-6 pt-6 border-t border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22] mb-3">
            Given the evaluation scores, do you agree that IEDS is the optimal strategy for BARMM?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["Yes", "Partially agree", "Need more evidence", "Prefer a different option"].map(
              (opt) => (
                <button
                  key={opt}
                  onClick={() => update("q10_1_ieds_preference", opt)}
                  className={cn(
                    "p-3 rounded-lg border text-sm text-left transition-all",
                    data.q10_1_ieds_preference === opt
                      ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                      : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                >
                  {opt}
                </button>
              )
            )}
          </div>
        </div>
      </GlassCard>

      {/* ═══════════════════════════════════════════ BLOCK 4: Three-Phase Implementation */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-[#022c22] mb-2 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-[#C9A84C]" />
          Three-Phase Implementation (2026–2035)
        </h3>
        <p className="text-sm text-[#065f46] mb-5">
          The IEDS unfolds across three sequential phases, each building on the prior to create a compounding growth trajectory toward ₱550B+ GRDP by 2035.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* ── Sequence A: ACTIVATE (2026-2028) ── */}
          <div className="rounded-xl border-2 border-[#1B4D3E]/40 bg-[#1B4D3E]/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#1B4D3E] flex items-center justify-center">
                <span className="text-xs font-bold text-white">A</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#022c22]">ACTIVATE</h4>
                <p className="text-xs text-[#065f46]">2026 – 2028</p>
              </div>
            </div>
            <p className="text-xs font-semibold text-[#1B4D3E] mb-2">
              Allocation: ₱35–45 billion
            </p>
            <p className="text-xs text-[#065f46] mb-3">
              <strong>Focus:</strong> Enablers, Cross-Cutting OS, Foundation &amp; Enablers (Governance)
            </p>
            <div className="bg-white rounded-lg p-3 border border-[#C9A84C]/10 mb-4">
              <p className="text-xs font-semibold text-[#022c22] mb-1.5">Key Deployments</p>
              <ul className="space-y-1">
                {[
                  "₱6.67B ZBIP",
                  "800km farm-to-market roads",
                  "Digital backbone (fiber optic, BEGMP)",
                  "BHB operationalization",
                  "Forestry Code & JMC 2026-01",
                  "Islamic finance regulatory sandbox",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-xs text-[#022c22]">
                    <CheckCircle2 className="w-3 h-3 text-[#1B4D3E] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Question */}
            <div className="mt-auto">
              <p className="text-xs font-medium text-[#022c22] mb-2">
                Rate the priority of Sequence A investments
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q10_2_sequence_a_priority", v)}
                    className={cn(
                      "w-10 h-10 rounded-lg border text-xs font-semibold transition-all",
                      data.q10_2_sequence_a_priority === v
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

          {/* ── Sequence B: SCALE (2029-2031) ── */}
          <div className="rounded-xl border-2 border-[#C9A84C]/40 bg-[#C9A84C]/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center">
                <span className="text-xs font-bold text-white">B</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#022c22]">SCALE</h4>
                <p className="text-xs text-[#065f46]">2029 – 2031</p>
              </div>
            </div>
            <p className="text-xs font-semibold text-[#C9A84C] mb-2">
              Allocation: ₱50–65 billion
            </p>
            <p className="text-xs text-[#065f46] mb-3">
              <strong>Focus:</strong> Transformers, Foundations, Green Economy, Financiers
            </p>
            <div className="bg-white rounded-lg p-3 border border-[#C9A84C]/10 mb-4">
              <p className="text-xs font-semibold text-[#022c22] mb-1.5">Key Deployments</p>
              <ul className="space-y-1">
                {[
                  "Bangsamoro Halal Park (Matanog)",
                  "10 agro-industrial corridors",
                  "Rubber/coconut/seaweed processing",
                  "REDD+ registry & MRV systems",
                  "Al-Amanah/CARD branch expansion",
                  "TESDA–industry alignment academies",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-xs text-[#022c22]">
                    <CheckCircle2 className="w-3 h-3 text-[#C9A84C] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Question */}
            <div className="mt-auto">
              <p className="text-xs font-medium text-[#022c22] mb-2">
                Rate the priority of Sequence B investments
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q10_3_sequence_b_priority", v)}
                    className={cn(
                      "w-10 h-10 rounded-lg border text-xs font-semibold transition-all",
                      data.q10_3_sequence_b_priority === v
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

          {/* ── Sequence C: CONSOLIDATE (2032-2035) ── */}
          <div className="rounded-xl border-2 border-sky-500/40 bg-sky-50/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center">
                <span className="text-xs font-bold text-white">C</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#022c22]">CONSOLIDATE</h4>
                <p className="text-xs text-[#065f46]">2032 – 2035</p>
              </div>
            </div>
            <p className="text-xs font-semibold text-sky-700 mb-2">
              Allocation: ₱35–50 billion
            </p>
            <p className="text-xs text-[#065f46] mb-3">
              <strong>Focus:</strong> Connectors, Cross-Cutting OS, Global Integration
            </p>
            <div className="bg-white rounded-lg p-3 border border-[#C9A84C]/10 mb-4">
              <p className="text-xs font-semibold text-[#022c22] mb-1.5">Key Deployments</p>
              <ul className="space-y-1">
                {[
                  "UAE/GCC halal export logistics hubs",
                  "Eco-tourism infrastructure & marine sanctuaries",
                  "Carbon credit/PES monetization (₱500M+/yr)",
                  "Innovation hubs & halal R&D",
                  "Cross-border certification MRA",
                  "Aftercare service scaling",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-xs text-[#022c22]">
                    <CheckCircle2 className="w-3 h-3 text-sky-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Question */}
            <div className="mt-auto">
              <p className="text-xs font-medium text-[#022c22] mb-2">
                Rate the priority of Sequence C investments
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q10_4_sequence_c_priority", v)}
                    className={cn(
                      "w-10 h-10 rounded-lg border text-xs font-semibold transition-all",
                      data.q10_4_sequence_c_priority === v
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
        </div>
      </GlassCard>

      {/* ═══════════════════════════════════════════ BLOCK 5: Sequencing Logic Validation */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-[#022c22] mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#C9A84C]" />
          Sequencing Logic Validation
        </h3>
        <p className="text-sm text-[#065f46] mb-5">
          The sequencing deliberately front-loads enabling infrastructure and governance (Sequence A) to prevent "Limits to Growth" constraints from derailing later phases.
        </p>

        {/* Question 5 */}
        <div className="mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22] mb-3">
            Do you agree with this sequencing logic?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["Strongly agree", "Agree", "Neutral", "Disagree"].map((opt) => (
              <button
                key={opt}
                onClick={() => update("q10_5_sequencing_logic", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q10_5_sequencing_logic === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Question 6 */}
        <div>
          <p className="text-sm font-medium text-[#022c22] mb-3">
            Which risk mitigation measure is most critical for IEDS success?
          </p>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Bangsamoro Investment Command Center",
              "Trigger-based budgeting",
              "ODA climate finance for green sequencing",
              "20% contingency reserve",
            ].map((opt) => (
              <button
                key={opt}
                onClick={() => update("q10_6_risk_mitigation", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q10_6_risk_mitigation === opt
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

      {/* ═══════════════════════════════════════════ BLOCK 6: Expected 2035 Outcomes */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-[#022c22] mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#C9A84C]" />
          Expected 2035 Outcomes
        </h3>
        <p className="text-sm text-[#065f46] mb-5">
          The following targets are projected outcomes if IEDS is fully implemented across all three sequences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {outcomes.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.category}
                className="rounded-xl border border-[#C9A84C]/20 bg-white p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-md bg-[#1B4D3E]/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#1B4D3E]" />
                  </div>
                  <h4 className="text-xs font-bold text-[#022c22]">{cat.category}</h4>
                </div>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-1.5 text-xs text-[#022c22]"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#C9A84C] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Question 7 */}
        <div className="pt-6 border-t border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22] mb-3">
            How achievable are these 2035 targets?
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  onClick={() => update("q10_7_outcomes_achievable", v)}
                  className={cn(
                    "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                    data.q10_7_outcomes_achievable === v
                      ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                      : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-[#065f46] px-1 mt-1">
              <span>Unrealistic</span>
              <span>Very achievable</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Section10_IEDS;
