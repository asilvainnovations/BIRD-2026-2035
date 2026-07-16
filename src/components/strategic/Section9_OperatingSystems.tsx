import React from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck, AlertTriangle, HandCoins, Landmark, FileText, TreePine, Leaf } from "lucide-react";

// ── GlassCard helper ─────────────────────────────────────────────────────────
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

// ── Types ────────────────────────────────────────────────────────────────────
export interface Section9Data {
  // SWOT — Strengths
  q_s9_policy_recognition_impact?: number;
  q_s9_policy_recognition_likelihood?: number;
  q_s9_islamic_finance_impact?: number;
  q_s9_islamic_finance_likelihood?: number;
  q_s9_cultural_heritage_impact?: number;
  q_s9_cultural_heritage_likelihood?: number;
  q_s9_peace_dividend_impact?: number;
  q_s9_peace_dividend_likelihood?: number;
  // SWOT — Weaknesses
  q_s9_literacy_impact?: number;
  q_s9_literacy_likelihood?: number;
  q_s9_fragmented_policy_impact?: number;
  q_s9_fragmented_policy_likelihood?: number;
  q_s9_underspending_impact?: number;
  q_s9_underspending_likelihood?: number;
  // SWOT — Opportunities
  q_s9_carbon_markets_impact?: number;
  q_s9_carbon_markets_likelihood?: number;
  q_s9_pes_impact?: number;
  q_s9_pes_likelihood?: number;
  q_s9_postconflict_impact?: number;
  q_s9_postconflict_likelihood?: number;
  q_s9_forestry_code_impact?: number;
  q_s9_forestry_code_likelihood?: number;
  // SWOT — Threats
  q_s9_security_incidents_impact?: number;
  q_s9_security_incidents_likelihood?: number;
  q_s9_political_transition_impact?: number;
  q_s9_political_transition_likelihood?: number;
  q_s9_fragmented_agency_impact?: number;
  q_s9_fragmented_agency_likelihood?: number;
  // Archetypes
  q_s9_investment_loop: string;
  q_s9_investment_loop_followup: string;
  q_s9_governance_loop: string;
  q_s9_governance_loop_followup: string;
  // Contextual questions
  q9_1_moral_governance_derisk?: number;
  q9_2_critical_loop: string;
  q9_3_regulatory_priority: string;
  q9_4_revenue_channel: string;
  q9_5_stakeholder_alignment: string;
  q9_6_reform_priority: string;
}

interface Section9Props {
  data: Section9Data;
  onChange: (data: Section9Data) => void;
}

// ── Component ────────────────────────────────────────────────────────────────
const Section9_OperatingSystems: React.FC<Section9Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section9Data>(field: K, value: Section9Data[K]) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      {/* ====== HEADER ====== */}
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 9: Operating Systems — Moral Governance, Resilience, Inclusivity & Peace
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        Moral Governance serves as the central operating system of the Bangsamoro ecosystem —
        ensuring justice, transparency, accountability, and Islamic ethics (khalifa stewardship).
        Peace provides stability, Resilience enables climate-smart planning, and Inclusivity
        broadens participation.
      </p>

      {/* ====== 1. OPERATING SYSTEMS IMAGE ====== */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/OS.png"
          alt="Moral Governance as the Central Operating System of the Bangsamoro Ecosystem"
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            Source: Moral Governance as the Central Operating System of the Bangsamoro Ecosystem
          </p>
        </div>
      </div>

      {/* ====== 2. CONTEXT CARD ====== */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-4">
          Three Foundational Pillars
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <h4 className="text-sm font-bold text-[#022c22]">Peace</h4>
            </div>
            <p className="text-xs text-[#065f46]">
              Provides long-term stability for investment
            </p>
          </div>
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <TreePine className="w-5 h-5 text-amber-700" />
              <h4 className="text-sm font-bold text-[#022c22]">Resilience</h4>
            </div>
            <p className="text-xs text-[#065f46]">
              Promotes adaptive, climate-smart planning to withstand external shocks
            </p>
          </div>
          <div className="p-4 rounded-lg bg-sky-50 border border-sky-200">
            <div className="flex items-center gap-2 mb-2">
              <HandCoins className="w-5 h-5 text-sky-700" />
              <h4 className="text-sm font-bold text-[#022c22]">Inclusivity</h4>
            </div>
            <p className="text-xs text-[#065f46]">
              Broadens participation so marginalized communities share in value creation
            </p>
          </div>
        </div>
      </GlassCard>

      {/* ====== 3. SWOT SCALE QUESTIONS ====== */}

      {/* ── STRENGTHS ── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
            STRENGTH
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very
          unlikely, 5 = very likely)
        </p>

        {/* S7 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>S7: Growing Policy Recognition.</strong> BOL, BIC, and SIPP creating a
            stronger investment climate and governance framework.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_policy_recognition_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_policy_recognition_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_policy_recognition_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_policy_recognition_likelihood === v
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

        {/* S9 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>S9: Islamic Finance Legal Framework.</strong> RA 11439 enables
            Shariah-compliant banking and finance, opening ethical capital pathways.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_islamic_finance_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_islamic_finance_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_islamic_finance_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_islamic_finance_likelihood === v
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

        {/* S10 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>S10: Rich Cultural Heritage.</strong> Maranao, Yakan, Tausug traditions
            power creative industries, tourism, and cultural branding.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_cultural_heritage_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_cultural_heritage_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_cultural_heritage_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_cultural_heritage_likelihood === v
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

        {/* S12 */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>S12: Peace Dividend Momentum.</strong> Basilan declared ASG-free in 2024;
            improved security creates space for investment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_peace_dividend_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_peace_dividend_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_peace_dividend_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_peace_dividend_likelihood === v
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

      {/* ── WEAKNESSES ── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700">
            WEAKNESS
          </span>
        </div>

        {/* W4 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>W4: Low Functional Literacy Rate.</strong> 59.3% — lowest in the
            Philippines — limits skilled workforce and financial literacy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_literacy_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_literacy_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_literacy_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_literacy_likelihood === v
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

        {/* W6 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>W6: Fragmented Policy Frameworks.</strong> Ministries lack coordination
            causing delays, confusion, and underspending.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_fragmented_policy_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_fragmented_policy_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_fragmented_policy_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_fragmented_policy_likelihood === v
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

        {/* W11 */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>W11: Underspending in Budget Execution.</strong> Agencies fail to spend
            full budgets on time, delaying development programs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_underspending_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_underspending_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_underspending_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_underspending_likelihood === v
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

      {/* ── OPPORTUNITIES ── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
            OPPORTUNITY
          </span>
        </div>

        {/* O7 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>O7: Carbon Markets & REDD+ Programs.</strong> BARMM&apos;s forests and
            carbon stocks can be monetized through carbon credits.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_carbon_markets_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_carbon_markets_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_carbon_markets_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_carbon_markets_likelihood === v
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

        {/* O8 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>O8: Payment for Ecosystem Services (PES).</strong> LGUs earn income
            protecting watersheds, coastlines, and mangroves.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_pes_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_pes_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_pes_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_pes_likelihood === v
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

        {/* O9 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>O9: Post-Conflict Reconstruction.</strong> Marawi MAA redevelopment and
            normalization unlock new commercial zones.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_postconflict_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_postconflict_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_postconflict_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_postconflict_likelihood === v
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

        {/* O10 */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>O10: Bangsamoro Forestry Code.</strong> Pending legislation opens
            sustainable timber, NTFPs, and forest nursery investments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_forestry_code_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_forestry_code_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_forestry_code_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_forestry_code_likelihood === v
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

      {/* ── THREATS ── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
            THREAT
          </span>
        </div>

        {/* T4 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>T4: Residual Security Incidents.</strong> Clan conflicts (rido), remnant
            armed groups create fear among investors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_security_incidents_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_security_incidents_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_security_incidents_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_security_incidents_likelihood === v
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

        {/* T5 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>T5: Political Transition Uncertainties.</strong> First parliamentary
            elections create uncertainty about governance continuity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_political_transition_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_political_transition_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_political_transition_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_political_transition_likelihood === v
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

        {/* T9 */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>T9: Risk of Fragmented Agency Mandates.</strong> Islamic banking, halal
            certification, and trade agencies operate in silos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_fragmented_agency_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_fragmented_agency_impact === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s9_fragmented_agency_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s9_fragmented_agency_likelihood === v
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

      {/* ====== 4. SYSTEMS ARCHETYPE: INVESTMENT-DEVELOPMENT LOOP ====== */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Archetype: Investment-Development Loop
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Investment%20and%20Governance%20Cycles.png"
            alt="Investment-Development Loop"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Investments create jobs and expand markets, attracting more investors and
          strengthening business viability. This reinforcing loop shows how capital inflows
          drive employment, consumption, and further investment attraction.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How accurately does the Investment-Development Loop reflect the growth dynamics in
          BARMM&apos;s emerging investment ecosystem?
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s9_investment_loop", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s9_investment_loop === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            )
          )}
        </div>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which sector — agro-industry, halal manufacturing, renewable energy, or tourism —
          shows the strongest investment-development reinforcing cycle?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {["Agro-industry", "Halal manufacturing", "Renewable energy", "Tourism"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s9_investment_loop_followup", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s9_investment_loop_followup === opt
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

      {/* ====== 5. SYSTEMS ARCHETYPE: GOVERNANCE-INVESTOR CONFIDENCE LOOP ====== */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <Landmark className="w-5 h-5 text-emerald-700" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Archetype: Governance-Investor Confidence Loop
          </h3>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Transparent governance builds investor trust, expands the tax base, and increases
          public funding — which further improves governance capacity. This creates a
          self-reinforcing cycle where moral governance and investment confidence amplify
          each other.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How accurately does the Governance-Investor Confidence Loop capture the
          relationship between moral governance and capital attraction in BARMM?
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s9_governance_loop", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s9_governance_loop === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            )
          )}
        </div>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which governance reform — transparency, accountability, Islamic ethics integration,
          or anti-corruption — would most strengthen this loop?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {["Transparency", "Accountability", "Islamic ethics integration", "Anti-corruption"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s9_governance_loop_followup", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s9_governance_loop_followup === opt
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

      {/* ====== 6. MORAL GOVERNANCE DE-RISKS CAPITAL ====== */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Moral Governance De-Risks Capital
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4 shadow-lg group">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/How%20moral%20Governance%20De-Risks%20Capital.png"
            alt="How Moral Governance De-Risks Capital"
            className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Source: How Moral Governance De-Risks Capital
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          The reinforcing feedback loop: Moral Governance → Institutional Transparency →
          Lower Bureaucratic Friction (BIFOSS) → Investor Confidence → Increased FDI →
          Regional Revenue → Stronger Governance Capacity → Moral Governance. A
          self-reinforcing system of growth and stability.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          On a scale of 1–5, how effective is moral governance at de-risking capital
          investment in BARMM compared to traditional governance approaches?
        </p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => update("q9_1_moral_governance_derisk", v)}
              className={cn(
                "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                data.q9_1_moral_governance_derisk === v
                  ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {v}
            </button>
          ))}
        </div>
        <p className="text-xs text-[#065f46] mt-2">1 = not effective, 5 = very effective</p>
      </GlassCard>

      {/* ====== 7. INVESTMENT & GOVERNANCE CYCLES ====== */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <Landmark className="w-5 h-5 text-emerald-700" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Investment-Development and Governance-Investor Confidence Loops
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4 shadow-lg group">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Investment%20and%20Governance%20Cycles.png"
            alt="Investment-Development and Governance-Investor Confidence Loops"
            className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Source: Investment-Development and Governance-Investor Confidence Loops
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Loop R1 — Investment-Development: investments create jobs, expand markets, attract
          more investors. Loop R2 — Governance-Investor Confidence: transparent governance
          builds trust, expands tax base, increases public funding, improves governance. Two
          synchronized reinforcing loops.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which reinforcing loop is more critical to activate first in BARMM —
          Investment-Development (R1) or Governance-Investor Confidence (R2)?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "R1 — activate investment first to create jobs",
            "R2 — fix governance first to build trust",
            "Both simultaneously — they reinforce each other",
            "Neither — address infrastructure first",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q9_2_critical_loop", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q9_2_critical_loop === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* ====== 8. REGULATORY ARCHITECTURE ====== */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">
            The Regulatory Architecture Securing Capital
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4 shadow-lg group">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Regulatory%20Architecture.png"
            alt="The Regulatory Architecture Securing Capital"
            className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Source: The Regulatory Architecture Securing Capital
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Five pillars around RA 11054 (constitutional mandate): 2nd BDP &amp; SIPP (strategic
          priorities), BHIDP (halal ecosystem/OIC-SMIIC), BSEMP (75.86% clean energy), RA
          11439 &amp; CREATE MORE (Islamic banking/tax incentives), Pending Forestry Code
          (carbon credits/PES).
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which regulatory pillar is most urgently needed to secure capital investment in
          BARMM?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Bangsamoro Investment Code (BIC) implementation",
            "BHIDP halal ecosystem standardization",
            "BSEMP renewable energy framework",
            "Islamic banking expansion (RA 11439)",
            "Forestry Code (carbon credits/PES)",
            "SIPP alignment with national programs",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q9_3_regulatory_priority", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q9_3_regulatory_priority === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* ====== 9. DRAFT JMC 2026-01 ====== */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Draft JMC 2026-01: Conservation as Municipal Revenue
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4 shadow-lg group">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Draft%20JMC%202026-01.png"
            alt="Draft JMC 2026-01: Conservation as Municipal Revenue"
            className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Source: Draft JMC 2026-01: Conservation as Municipal Revenue
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Three channels — Carbon Credits, Payment for Ecosystem Services (PES), and
          Eco-Tourism User Fees — merge into a Revenue River feeding LGUs for capacity
          building, sustainable livelihoods, and infrastructure maintenance.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which revenue channel — Carbon Credits, PES, or Eco-Tourism Fees — offers the
          greatest potential for BARMM&apos;s LGUs?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Carbon Credits (REDD+, forest carbon)",
            "Payment for Ecosystem Services (watersheds, mangroves)",
            "Eco-Tourism User Fees (Lake Lanao, Ligawasan Marsh)",
            "All three — integrated green revenue system",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q9_4_revenue_channel", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q9_4_revenue_channel === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* ====== 10. POLICY RECOMMENDATIONS: STAKEHOLDERS ====== */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <Landmark className="w-5 h-5 text-emerald-700" />
          <h3 className="text-base font-semibold text-[#022c22]">
            A Synchronized Mandate: Policymakers, Planners, and Investors
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4 shadow-lg group">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Policy%20Recommendations-Policy%20Makers-Planners-Investors.png"
            alt="A Synchronized Mandate: Policymakers, Planners, and Investors"
            className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Source: A Synchronized Mandate: Policymakers, Planners, and Investors
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Collaborative governance: Policymakers (enact Forestry Code, Investment Code,
          Investment Command Center, fast-track BHIDP), Development Planners (apply BEIE,
          sequence infrastructure, provincial BBOI offices), Investors (target agro/halal/rubber,
          carbon/green finance, Islamic fintech/renewables).
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which stakeholder group — Policymakers, Planners, or Investors — currently has the
          greatest alignment with the BIRD roadmap?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Policymakers (BOL, BARMM agencies)",
            "Development Planners (MPW, MAFAR, MTIT)",
            "Private Investors (local and foreign)",
            "All equally aligned",
            "None are fully aligned yet",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q9_5_stakeholder_alignment", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q9_5_stakeholder_alignment === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* ====== 11. POLICY RECOMMENDATIONS: ACTIVATING THE FRAMEWORK ====== */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Policy Recommendations: Activating the Framework
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4 shadow-lg group">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Policy%20recommendations-Institutional-Fiscal-Regulatory.png"
            alt="Policy Recommendations: Activating the Framework"
            className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Source: Policy Recommendations: Activating the Framework
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Three integrated reforms: Institutional (deploy BIF-Net for inter-agency
          coordination), Fiscal (harmonize SIPP &amp; CREATE MORE Act for tax incentives),
          Regulatory (institutionalize BEIE to synchronize ministry budgets and master plans).
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which reform area — Institutional, Fiscal, or Regulatory — should be prioritized to
          activate the BIRD framework?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Institutional (BIF-Net, inter-agency coordination)",
            "Fiscal (SIPP/CREATE MORE harmonization)",
            "Regulatory (BEIE institutionalization)",
            "All three — integrated approach",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q9_6_reform_priority", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q9_6_reform_priority === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Section9_OperatingSystems;
