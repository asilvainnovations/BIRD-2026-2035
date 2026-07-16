import React from "react";
import { Leaf, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export interface Section4Data {
  q4_1_priorities: string[];
  q4_2_maguindanao_logistics: string;
  q4_3_feasibility?: number;
  // SWOT Threats
  q_s4_climate_impact?: number;
  q_s4_climate_likelihood?: number;
  q_s4_pestalotiopsis_impact?: number;
  q_s4_pestalotiopsis_likelihood?: number;
  q_s4_postharvest_impact?: number;
  q_s4_postharvest_likelihood?: number;
  q_s4_poverty_impact?: number;
  q_s4_poverty_likelihood?: number;
  // Archetypes
  q_s4_tragedy_commons: string;
  q_s4_tragedy_followup: string;
  q_s4_limits_growth: string;
}

interface Section4Props {
  data: Section4Data;
  onChange: (data: Section4Data) => void;
}

// ------------------------------------------------------------------
// GlassCard sub-component
// ------------------------------------------------------------------
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

// ------------------------------------------------------------------
// Main component
// ------------------------------------------------------------------
const Section4_Foundations: React.FC<Section4Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section4Data>(
    field: K,
    value: Section4Data[K]
  ) => onChange({ ...data, [field]: value });

  const toggle = (field: keyof Section4Data, val: string) => {
    const arr = (data[field] as string[] | undefined) || [];
    update(
      field,
      (arr.includes(val)
        ? arr.filter((v) => v !== val)
        : [...arr, val]) as Section4Data[typeof field]
    );
  };

  // Archetype "agree" responses
  const tragedyAgree =
    data.q_s4_tragedy_commons === "Very accurately" ||
    data.q_s4_tragedy_commons === "Somewhat accurately";

  return (
    <div className="space-y-6">
      {/* ============================================================ */}
      {/* HEADER                                                       */}
      {/* ============================================================ */}
      <div className="flex items-center gap-3 mb-4">
        <Leaf className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 4: Cluster 1 — Foundations: The Resource Base
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        The Foundations cluster sustains the Bangsamoro economy. Agriculture
        contributes 32.4% of GRDP (₱97.2B). All other clusters depend on its
        health.
      </p>

      {/* ============================================================ */}
      {/* 1. Cluster Image                                             */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%201-Foundations.png"
          alt="Cluster 1 Foundations"
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            Source: Cluster 1 | Foundations: The Infrastructure-First Resource Base
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. Context Card                                              */}
      {/* ============================================================ */}
      <GlassCard>
        <p className="text-sm text-[#065f46]">
          Highlights four sectors: Agri-Fisheries (32.4% of GRDP, ₱97.2B),
          Energy (75.86% renewable mix), Forestry (untapped carbon potential),
          and Environment (green economy as revenue generator).
        </p>
      </GlassCard>

      {/* ============================================================ */}
      {/* 3. Priority Question (Q4.1)                                  */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Q4.1: Which Foundations sub-sectors should be the highest
          investment priorities? (Select all)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Agriculture modernization",
            "Fisheries & aquaculture",
            "Forestry & eco-tourism",
            "Renewable energy",
            "Water resource management",
            "Climate adaptation",
          ].map((opt) => {
            const selected = (data.q4_1_priorities || []).includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggle("q4_1_priorities", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all flex items-center gap-2",
                  selected
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                <span
                  className={cn(
                    "w-4 h-4 rounded-sm border flex items-center justify-center text-[10px]",
                    selected
                      ? "bg-[#C9A84C] border-[#C9A84C]"
                      : "border-[#C9A84C]/50"
                  )}
                >
                  {selected && "✓"}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* ============================================================ */}
      {/* 4. SWOT Scale Questions — THREAT                             */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
            THREAT
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood
          (1 = very unlikely, 5 = very likely)
        </p>

        {/* T1 — Climate Change Vulnerabilities */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>T1: Climate Change Vulnerabilities.</strong> El Niño, floods,
            and changing rainfall patterns already caused a 4.2% drop in
            agriculture in 2024 and threaten food security.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s4_climate_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_climate_impact === v
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
                    onClick={() => update("q_s4_climate_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_climate_likelihood === v
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

        {/* T10 — Rubber Pestalotiopsis Disease */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>T10: Rubber Pestalotiopsis Disease.</strong> A fungal disease
            attacking rubber plantations in Basilan that could spread to other
            areas, threatening farmer livelihoods.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s4_pestalotiopsis_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_pestalotiopsis_impact === v
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
                    onClick={() => update("q_s4_pestalotiopsis_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_pestalotiopsis_likelihood === v
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

        {/* W7 — Limited Agro-Processing and Cold Chain */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>W7: Limited Agro-Processing and Cold Chain.</strong> Without
            proper storage, 20–40% of farm produce is lost after harvest, cutting
            farmer income.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s4_postharvest_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_postharvest_impact === v
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
                    onClick={() => update("q_s4_postharvest_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_postharvest_likelihood === v
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

        {/* W2 — Highest Poverty Incidence */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>W2: Highest Poverty Incidence.</strong> At 34.8%, poverty
            limits domestic market size and consumer purchasing power.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s4_poverty_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_poverty_impact === v
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
                    onClick={() => update("q_s4_poverty_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s4_poverty_likelihood === v
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

      {/* ============================================================ */}
      {/* 5. Systems Archetype: Tragedy of the Commons                 */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Archetype: Tragedy of the Commons
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tragedy%20of%20the%20Commons%20Archetype.png"
            alt="Tragedy of the Commons Archetype"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Shared resources get over-exploited when governance is fragmented. Each
          actor gains individually, but collective impact depletes the resource
          base.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How accurately does the &quot;Tragedy of the Commons&quot; reflect resource
          management challenges in BARMM&apos;s agriculture, fisheries, and forestry
          sectors?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s4_tragedy_commons", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s4_tragedy_commons === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            )
          )}
        </div>

        {/* Follow-up (conditional) */}
        {tragedyAgree && (
          <div className="mt-4 pt-4 border-t border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22] mb-3">
              Which shared resource is most at risk — watersheds, fishing
              grounds, forest reserves, or agricultural land?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["Watersheds", "Fishing grounds", "Forest reserves", "Agricultural land"].map(
                (opt) => (
                  <button
                    key={opt}
                    onClick={() => update("q_s4_tragedy_followup", opt)}
                    className={cn(
                      "p-3 rounded-lg border text-sm text-left transition-all",
                      data.q_s4_tragedy_followup === opt
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
        )}
      </GlassCard>

      {/* ============================================================ */}
      {/* 6. Systems Archetype: Limits to Growth                       */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Archetype: Limits to Growth
          </h3>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Growth encounters balancing loops — infrastructure gaps, climate
          shocks, and funding limits slow progress despite initial gains.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How accurately does &quot;Limits to Growth&quot; describe the barriers facing
          BARMM&apos;s agricultural and energy expansion?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s4_limits_growth", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s4_limits_growth === opt
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

      {/* ============================================================ */}
      {/* 7. Provincial Profile: Maguindanao del Sur                    */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Provincial Profile: Maguindanao del Sur
        </h3>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Maguidano-del-Sur.png"
            alt="Maguindanao del Sur Provincial Profile"
            className="w-full h-auto max-h-[400px] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <p className="text-xs italic text-white/70">
              Source: Maguindanao del Sur: The Agro-Industrial Breadbasket
            </p>
          </div>
        </div>
        <p className="text-sm text-[#065f46] mb-4">
          Shows three layers: Raw Inputs (Pulangi River basin), Modern Processing
          (VCO, desiccated coconut, corn starch, premium rice), Logistics Grid
          (farm-to-market roads, solar-dryer warehousing).
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Do you agree that improving processing and logistics infrastructure in
          Maguindanao del Sur will significantly increase the value of its
          agricultural output?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            "Strongly agree",
            "Agree",
            "Neutral",
            "Disagree",
            "Strongly disagree",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q4_2_maguindanao_logistics", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q4_2_maguindanao_logistics === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* ============================================================ */}
      {/* 8. Feasibility Question (Q4.3)                               */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Q4.3: How feasible is it for BARMM to achieve food security and
          agricultural self-sufficiency by 2030?
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-[#065f46]">1 = Not feasible</span>
          <div className="flex-1 h-px bg-[#C9A84C]/20" />
          <span className="text-xs text-[#065f46]">5 = Very feasible</span>
        </div>
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => update("q4_3_feasibility", v)}
              className={cn(
                "w-14 h-14 rounded-lg border text-lg font-semibold transition-all",
                data.q4_3_feasibility === v
                  ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Section4_Foundations;
