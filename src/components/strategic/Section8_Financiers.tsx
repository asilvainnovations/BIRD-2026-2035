import React from "react";
import { cn } from "@/lib/utils";
import { Landmark, AlertTriangle } from "lucide-react";

export interface Section8Data {
  // SWOT — Strengths (5)
  q_s8_domestic_halal_impact?: number;
  q_s8_domestic_halal_likelihood?: number;
  q_s8_youth_pop_impact?: number;
  q_s8_youth_pop_likelihood?: number;
  q_s8_policy_recognition_impact?: number;
  q_s8_policy_recognition_likelihood?: number;
  q_s8_islamic_finance_fw_impact?: number;
  q_s8_islamic_finance_fw_likelihood?: number;
  q_s8_peace_dividend_impact?: number;
  q_s8_peace_dividend_likelihood?: number;
  // SWOT — Weaknesses (5)
  q_s8_infra_deficits_impact?: number;
  q_s8_infra_deficits_likelihood?: number;
  q_s8_literacy_impact?: number;
  q_s8_literacy_likelihood?: number;
  q_s8_financial_penetration_impact?: number;
  q_s8_financial_penetration_likelihood?: number;
  q_s8_fragmented_policy_impact?: number;
  q_s8_fragmented_policy_likelihood?: number;
  q_s8_skills_mismatch_impact?: number;
  q_s8_skills_mismatch_likelihood?: number;
  // SWOT — Opportunities (5)
  q_s8_global_halal_impact?: number;
  q_s8_global_halal_likelihood?: number;
  q_s8_renewable_invest_impact?: number;
  q_s8_renewable_invest_likelihood?: number;
  q_s8_asean_halal_impact?: number;
  q_s8_asean_halal_likelihood?: number;
  q_s8_islamic_ecosystem_impact?: number;
  q_s8_islamic_ecosystem_likelihood?: number;
  q_s8_uae_corridor_impact?: number;
  q_s8_uae_corridor_likelihood?: number;
  // SWOT — Threats (4)
  q_s8_halal_competition_impact?: number;
  q_s8_halal_competition_likelihood?: number;
  q_s8_halal_standards_impact?: number;
  q_s8_halal_standards_likelihood?: number;
  q_s8_security_incidents_impact?: number;
  q_s8_security_incidents_likelihood?: number;
  q_s8_political_transition_impact?: number;
  q_s8_political_transition_likelihood?: number;
  // Archetypes
  q_s8_big_man: string;
  q_s8_big_man_followup: string;
  q_s8_shifting_burden: string;
  q_s8_shifting_followup: string;
  // Contextual
  q8_1_finance_tier_priority: string;
  q8_2_roadmap_achievable?: number;
  q8_3_priority_action: string;
  q8_4_islamic_authority: string;
}

interface Section8Props {
  data: Section8Data;
  onChange: (data: Section8Data) => void;
}

const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={cn(
      "rounded-xl border border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm p-6",
      className
    )}
  >
    {children}
  </div>
);

const Section8_Financiers: React.FC<Section8Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section8Data>(
    field: K,
    value: Section8Data[K]
  ) => onChange({ ...data, [field]: value });

  const renderScaleButton = (
    val: number,
    selected: number | undefined,
    onClick: () => void
  ) => (
    <button
      key={val}
      onClick={onClick}
      className={cn(
        "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
        selected === val
          ? "bg-[#C9A84C] text-white border-[#C9A84C]"
          : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
      )}
    >
      {val}
    </button>
  );

  const renderSwotFactor = (
    label: string,
    description: string,
    impactField: keyof Section8Data,
    likelihoodField: keyof Section8Data
  ) => (
    <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20 last:border-0 last:pb-0 last:mb-0">
      <p className="text-sm font-medium text-[#022c22]">
        <strong>{label}.</strong> {description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) =>
              renderScaleButton(v, data[impactField] as number | undefined, () =>
                update(impactField, v as any)
              )
            )}
          </div>
        </div>
        <div>
          <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) =>
              renderScaleButton(
                v,
                data[likelihoodField] as number | undefined,
                () => update(likelihoodField, v as any)
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Landmark className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Cluster 5 — Financiers: Powering the Bloodstream of the Economy
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        The Financiers cluster shows how Islamic finance underpins Bangsamoro's
        economic system through ethical and faith-aligned capital mechanisms —
        from Shariah banking to microfinance.
      </p>

      {/* 1. Cluster Image */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/38.%20Cluster%205_%20Financiers.png"
          alt="Cluster 5 — Financiers"
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            Source: Cluster 5 | Financiers — Powering the Bloodstream of the
            Economy
          </p>
        </div>
      </div>

      {/* 2. Context Card */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Cluster Context
        </h3>
        <p className="text-sm text-[#022c22]">
          Two interconnected loops: Ethical Capital Supply and Cultural Trust,
          joined by Financial Inclusion at the center. Key highlights: Systemic
          Advantage (Islamic banking promotes risk-sharing and asset-backed
          financing), Landmark Integration (RA 11439 legal framework for
          post-conflict enterprises), Capital Mechanisms (Shariah-compliant
          banking, Waqf endowments, Takaful insurance, Microfinance for MSMEs).
        </p>
      </GlassCard>

      {/* 3. SWOT Scale Questions */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
            STRENGTH
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood
          (1 = very unlikely, 5 = very likely)
        </p>
        {renderSwotFactor(
          "S4 — Large Domestic Halal Market",
          "5.69 million Muslim consumers create strong built-in demand for Shariah-compliant financial products.",
          "q_s8_domestic_halal_impact",
          "q_s8_domestic_halal_likelihood"
        )}
        {renderSwotFactor(
          "S5 — Young and Growing Population",
          "3.43% annual growth creates a large future workforce and consumer base needing financial services.",
          "q_s8_youth_pop_impact",
          "q_s8_youth_pop_likelihood"
        )}
        {renderSwotFactor(
          "S7 — Growing Policy Recognition",
          "BOL, BIC, and SIPP creating stronger investment climate for Islamic finance.",
          "q_s8_policy_recognition_impact",
          "q_s8_policy_recognition_likelihood"
        )}
        {renderSwotFactor(
          "S9 — Islamic Finance Legal Framework",
          "RA 11439 allows Shariah-compliant banking and finance through Al-Amanah and CARD Islamic.",
          "q_s8_islamic_finance_fw_impact",
          "q_s8_islamic_finance_fw_likelihood"
        )}
        {renderSwotFactor(
          "S12 — Peace Dividend Momentum",
          "Improved security in select zones creates space for financial institutions to expand.",
          "q_s8_peace_dividend_impact",
          "q_s8_peace_dividend_likelihood"
        )}
      </GlassCard>

      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700">
            WEAKNESS
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood
          (1 = very unlikely, 5 = very likely)
        </p>
        {renderSwotFactor(
          "W1 — Critical Infrastructure Deficits",
          "Limited digital connectivity restricts mobile banking and fintech reach in island provinces.",
          "q_s8_infra_deficits_impact",
          "q_s8_infra_deficits_likelihood"
        )}
        {renderSwotFactor(
          "W4 — Low Functional Literacy Rate",
          "59.3% literacy rate limits financial literacy and capacity to use formal banking services.",
          "q_s8_literacy_impact",
          "q_s8_literacy_likelihood"
        )}
        {renderSwotFactor(
          "W5 — Low Financial System Penetration",
          "Many people and MSMEs cannot access formal banking or credit services.",
          "q_s8_financial_penetration_impact",
          "q_s8_financial_penetration_likelihood"
        )}
        {renderSwotFactor(
          "W6 — Fragmented Policy Frameworks",
          "Islamic banking, halal certification, and trade agencies operate in silos.",
          "q_s8_fragmented_policy_impact",
          "q_s8_fragmented_policy_likelihood"
        )}
        {renderSwotFactor(
          "W8 — Skills Mismatch",
          "TVIs not aligned with Islamic finance and fintech industry needs.",
          "q_s8_skills_mismatch_impact",
          "q_s8_skills_mismatch_likelihood"
        )}
      </GlassCard>

      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
            OPPORTUNITY
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood
          (1 = very unlikely, 5 = very likely)
        </p>
        {renderSwotFactor(
          "O1 — Global Halal Market Growth",
          "USD 2.3 trillion market creating demand for Shariah-compliant trade finance and investment products.",
          "q_s8_global_halal_impact",
          "q_s8_global_halal_likelihood"
        )}
        {renderSwotFactor(
          "O2 — Renewable Energy Investment Opportunities",
          "Growing interest in solar, hydro, and biomass projects needing Islamic project finance.",
          "q_s8_renewable_invest_impact",
          "q_s8_renewable_invest_likelihood"
        )}
        {renderSwotFactor(
          "O3 — ASEAN Halal Economy",
          "USD 1.38 trillion market. BARMM can position as an Islamic finance hub for BIMP-EAGA.",
          "q_s8_asean_halal_impact",
          "q_s8_asean_halal_likelihood"
        )}
        {renderSwotFactor(
          "O4 — Islamic Finance Ecosystem Growth",
          "Global Shariah-compliant funds seeking ethical destinations — BARMM can be a hub.",
          "q_s8_islamic_ecosystem_impact",
          "q_s8_islamic_ecosystem_likelihood"
        )}
        {renderSwotFactor(
          "O6 — UAE/GCC Halal Export Corridor",
          "Partnerships connecting BARMM to Middle Eastern Islamic finance centers.",
          "q_s8_uae_corridor_impact",
          "q_s8_uae_corridor_likelihood"
        )}
      </GlassCard>

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
        {renderSwotFactor(
          "T2 — Competition from Established Halal Hubs",
          "Malaysia's Islamic finance ecosystem is decades ahead — BARMM must differentiate.",
          "q_s8_halal_competition_impact",
          "q_s8_halal_competition_likelihood"
        )}
        {renderSwotFactor(
          "T3 — Halal Standards Recognition Risk",
          "BARMM's Islamic finance products not yet aligned with OIC/SMIIC international standards.",
          "q_s8_halal_standards_impact",
          "q_s8_halal_standards_likelihood"
        )}
        {renderSwotFactor(
          "T4 — Residual Security Incidents",
          "Security concerns limit willingness of financial institutions to establish presence in remote areas.",
          "q_s8_security_incidents_impact",
          "q_s8_security_incidents_likelihood"
        )}
        {renderSwotFactor(
          "T5 — Political Transition Uncertainties",
          "Elections and leadership changes may disrupt Islamic finance policy continuity.",
          "q_s8_political_transition_impact",
          "q_s8_political_transition_likelihood"
        )}
      </GlassCard>

      {/* 4. Systems Archetype: The Big Man */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Archetype: The Big Man
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Big%20Man%20Archetype.png"
            alt="The Big Man Archetype"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Concentration of power around dominant leaders creates a patronage
          system where financial resources flow through political networks rather
          than merit-based allocation. Public budgets are consumed by
          administrative bloat rather than productive investment.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How accurately does the "Big Man" archetype reflect the political and
          clan dynamics affecting access to capital and financial services in
          BARMM?
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s8_big_man", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s8_big_man === opt
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
          Which of the three reinforcing loops is most active — patronage eroding
          governance, exclusion fueling conflict, or patronage draining
          development resources?
        </p>
        <textarea
          value={data.q_s8_big_man_followup || ""}
          onChange={(e) => update("q_s8_big_man_followup", e.target.value)}
          className="w-full p-3 rounded-lg border border-[#C9A84C]/30 bg-white text-[#022c22] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] min-h-[80px] resize-y"
          placeholder="Describe the most active reinforcing loop..."
        />
      </GlassCard>

      {/* 5. Systems Archetype: Shifting the Burden */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Archetype: Shifting the Burden
          </h3>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Short-term capital injections and emergency funding replace deeper
          financial system reforms. The system becomes dependent on external
          capital while local institutional capacity for financial
          intermediation weakens.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How accurately does "Shifting the Burden" reflect how BARMM addresses
          capital access and financial inclusion challenges?
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s8_shifting_burden", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s8_shifting_burden === opt
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
          Describe a case where a short-term capital fix either led to long-term
          reform or failed and the problem returned.
        </p>
        <textarea
          value={data.q_s8_shifting_followup || ""}
          onChange={(e) => update("q_s8_shifting_followup", e.target.value)}
          className="w-full p-3 rounded-lg border border-[#C9A84C]/30 bg-white text-[#022c22] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] min-h-[80px] resize-y"
          placeholder="Describe a case of short-term capital fix..."
        />
      </GlassCard>

      {/* 6. Capital Bloodstream Image */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          The Capital Bloodstream: Scaling Shariah-Compliant Finance
        </h3>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4 shadow-lg">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Financiers.png"
            alt="The Capital Bloodstream"
            className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Source: The Capital Bloodstream — Scaling Shariah-Compliant Finance
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Three-tier pyramid: Macro-Capital (Islamic Banking & Sukuk for
          infrastructure), Risk Mitigation (Takaful for agriculture/climate
          shocks), Micro-Access (Islamic Microfinance & Waqf for farmers/MSMEs).
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which tier of Shariah-compliant finance should be the highest priority
          for BARMM?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Macro-Capital (Sukuk, infrastructure banking)",
            "Risk Mitigation (Takaful, insurance)",
            "Micro-Access (Microfinance, Waqf for MSMEs)",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q8_1_finance_tier_priority", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q8_1_finance_tier_priority === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* 7. Islamic Finance Roadmap Image */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Islamic Finance Roadmap (2024–2028)
        </h3>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4 shadow-lg">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Islamic%20Finance%20Roadmap.png"
            alt="Islamic Finance Roadmap 2024–2028"
            className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Source: Islamic Finance Roadmap (2024–2028)
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Six progressive layers: Strengthen Islamic Banking, Enhance
          Microfinance & Waqf, Establish Takaful, Facilitate Sukuk Capital Market,
          Harness Fintech, Develop Human Capital. Timeline: 2024–2025
          (Foundation), Mid-Term (Takaful), 2028 Goal (Functional System & Tax
          Neutrality).
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          On a scale of 1–5, how achievable is the 2028 goal of a functional
          Islamic finance system with tax neutrality in BARMM?
        </p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((v) =>
            renderScaleButton(v, data.q8_2_roadmap_achievable, () =>
              update("q8_2_roadmap_achievable", v)
            )
          )}
        </div>
        <p className="text-xs text-[#065f46] mt-2 italic">
          1 = Not achievable, 5 = Very achievable
        </p>
      </GlassCard>

      {/* 8. Priority Actions Card */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Priority Actions for Islamic Finance
        </h3>

        <p className="text-sm font-medium text-[#022c22] mb-3">
          What is the single most important action to accelerate Islamic finance
          adoption in BARMM?
        </p>
        <div className="grid grid-cols-1 gap-3 mb-6">
          {[
            "Strengthen regulatory framework (tax neutrality, Shariah governance)",
            "Build human capital (Islamic finance education, training)",
            "Expand digital infrastructure (fintech, mobile banking)",
            "Promote awareness (financial literacy, community outreach)",
            "Attract foreign Islamic banks (incentives, partnerships)",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q8_3_priority_action", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q8_3_priority_action === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>

        <p className="text-sm font-medium text-[#022c22] mb-3">
          Should BARMM establish a dedicated Islamic Finance Authority (similar
          to Malaysia's Bank Negara Islamic branch)?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Yes — essential for coordination and governance",
            "Yes — but only after basic banking is strengthened",
            "No — existing agencies can handle it",
            "No — too resource-intensive at this stage",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q8_4_islamic_authority", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q8_4_islamic_authority === opt
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

export default Section8_Financiers;
