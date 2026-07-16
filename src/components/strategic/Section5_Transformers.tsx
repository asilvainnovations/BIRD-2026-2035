import React from "react";
import { Factory, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Section5Data {
  // Contextual questions
  q5_1_cold_chain: string;
  q5_2_economic_zones: string;
  q5_3_barrier: string;
  q5_4_halal_park: string;
  // SWOT
  q_s5_halal_cert_impact?: number;
  q_s5_halal_cert_likelihood?: number;
  q_s5_skills_mismatch_impact?: number;
  q_s5_skills_mismatch_likelihood?: number;
  q_s5_global_halal_impact?: number;
  q_s5_global_halal_likelihood?: number;
  q_s5_uae_corridor_impact?: number;
  q_s5_uae_corridor_likelihood?: number;
  q_s5_competition_impact?: number;
  q_s5_competition_likelihood?: number;
  // Archetypes
  q_s5_fixes_fail: string;
  q_s5_fixes_followup: string;
  q_s5_successful: string;
  q_s5_successful_followup: string;
}

interface Section5Props {
  data: Section5Data;
  onChange: (data: Section5Data) => void;
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

const Section5_Transformers: React.FC<Section5Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section5Data>(
    field: K,
    value: Section5Data[K]
  ) => onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Factory className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 5: Cluster 2 — Transformers: Engines of Value Creation
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        The Transformers cluster converts raw materials into higher-value halal products.
        This is where cultural authenticity becomes economic advantage.
      </p>

      {/* 1. Cluster Image */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%202%20_%20Transformers.png"
          alt="Cluster 2 — Transformers: Engines of Value Creation"
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            Cluster 2 | Transformers: Engines of Value Creation
          </p>
        </div>
      </div>

      {/* 2. Context Card */}
      <GlassCard>
        <p className="text-sm text-[#022c22] leading-relaxed">
          <strong>Three-stage progression:</strong> Raw Material (basic agro-processing),
          High-Value Processing (halal-certified MSMEs, WOW Matnog SEZ), Premium Export
          (halal pharmaceuticals, cosmetics, premium foods targeting the USD 2.3 trillion
          ASEAN halal market).
        </p>
      </GlassCard>

      {/* 3. SWOT Scale Questions */}
      <GlassCard className="!p-6">
        {/* WEAKNESS badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700">
            WEAKNESS
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very
          unlikely, 5 = very likely)
        </p>

        {/* W3: Weak Halal Certification System */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>W3: Weak Halal Certification System.</strong> BHB lacks resources and
            international recognition. 45–60 days vs Malaysia&apos;s 15-day benchmark.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s5_halal_cert_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s5_halal_cert_impact === v
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
                    onClick={() => update("q_s5_halal_cert_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s5_halal_cert_likelihood === v
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

        {/* W8: Skills Mismatch */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>W8: Skills Mismatch.</strong> TVIs not aligned with industry needs in
            halal manufacturing and modern agriculture.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s5_skills_mismatch_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s5_skills_mismatch_impact === v
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
                    onClick={() => update("q_s5_skills_mismatch_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s5_skills_mismatch_likelihood === v
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

        {/* OPPORTUNITY badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
            OPPORTUNITY
          </span>
        </div>

        {/* O1: Global Halal Market Growth */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>O1: Global Halal Market Growth.</strong> USD 2.3 trillion and growing.
            Massive export demand for BARMM&apos;s authentic halal products.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s5_global_halal_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s5_global_halal_impact === v
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
                    onClick={() => update("q_s5_global_halal_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s5_global_halal_likelihood === v
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

        {/* O6: UAE/GCC Halal Export Corridor */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>O6: UAE/GCC Halal Export Corridor.</strong> Partnerships like
            MAFAR-Prime Group connect BARMM producers to Middle East buyers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s5_uae_corridor_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s5_uae_corridor_impact === v
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
                    onClick={() => update("q_s5_uae_corridor_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s5_uae_corridor_likelihood === v
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

        {/* THREAT badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
            THREAT
          </span>
        </div>

        {/* T2: Competition from Established Halal Hubs */}
        <div className="space-y-3 mb-6">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>T2: Competition from Established Halal Hubs.</strong> Malaysia,
            Indonesia, Thailand dominate the halal market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => update("q_s5_competition_impact", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s5_competition_impact === v
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
                    onClick={() => update("q_s5_competition_likelihood", v)}
                    className={cn(
                      "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                      data.q_s5_competition_likelihood === v
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

      {/* 4. Systems Archetype: Fixes that Fail */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Archetype: Fixes that Fail
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Fixes%20that%20Fail%20Archetype.png"
            alt="Fixes that Fail Archetype"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Short-term tax incentives and fragmented subsidies create the illusion of
          progress but erode institutional capacity over time. Investors exit once
          incentives expire.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How accurately does &quot;Fixes that Fail&quot; capture the unintended consequences of
          short-term industrial policy in BARMM?
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s5_fixes_fail", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s5_fixes_fail === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            )
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-[#022c22] mb-2">
            Which sectors best fit this archetype? Which have avoided this trap?
          </p>
          <textarea
            value={data.q_s5_fixes_followup}
            onChange={(e) => update("q_s5_fixes_followup", e.target.value)}
            placeholder="Type your response here..."
            rows={3}
            className="w-full p-3 rounded-lg border border-[#C9A84C]/30 bg-white text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 resize-y"
          />
        </div>
      </GlassCard>

      {/* 5. Systems Archetype: Success to the Successful */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Archetype: Success to the Successful
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Success%20to%20the%20Successful%20Aarchetype.png"
            alt="Success to the Successful Archetype"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Mainland provinces attract bulk of resources while island provinces with high
          potential are left behind. Tawi-Tawi produces ~40% of national seaweed but gets
          minimal investment.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How accurately does &quot;Success to the Successful&quot; reflect the imbalance between
          mainland and island provinces?
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s5_successful", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s5_successful === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            )
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-[#022c22] mb-2">
            Which island province has the greatest untapped potential, and what investment
            would unlock it?
          </p>
          <textarea
            value={data.q_s5_successful_followup}
            onChange={(e) => update("q_s5_successful_followup", e.target.value)}
            placeholder="Type your response here..."
            rows={3}
            className="w-full p-3 rounded-lg border border-[#C9A84C]/30 bg-white text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 resize-y"
          />
        </div>
      </GlassCard>

      {/* 6. Halal Pipeline Image */}
      <GlassCard className="!p-6">
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Transformers-Farm-to-Market%20Pipeline%20.png"
            alt="MAFAR Halal Farm-to-Market Pipeline"
            className="w-full h-auto max-h-[500px] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <p className="text-xs italic text-white/70">
              MAFAR Halal Farm-to-Market Pipeline
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          <strong>Four stages:</strong> Input Supply (hatcheries, feed mills), Cold Chain &amp;
          Logistics (roads, ice plants, cold storage), Processing (halal livestock, poultry,
          seaweed), Market Linkage (halal pasalubong centers, BIMP-EAGA export).
        </p>
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Do you think improving cold-chain and logistics will significantly strengthen
          Bangsamoro&apos;s halal farm-to-market pipeline?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q5_1_cold_chain", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-center transition-all",
                  data.q5_1_cold_chain === opt
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

      {/* 7. Industrial Zones Image */}
      <GlassCard className="!p-6">
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Industrial%20and%20Economic%20Zones.png"
            alt="Industrial and Economic Zones"
            className="w-full h-auto max-h-[500px] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <p className="text-xs italic text-white/70">Industrial &amp; Economic Zones</p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          <strong>Polloc Freeport &amp; EcoZone</strong> (119-hectare agro-industrial hub in
          Parang, ADB-funded) and <strong>WOW Matanog Special Economic Zone</strong> (upcoming
          Bangsamoro Halal Park for halal-compliant manufacturing).
        </p>
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Will developing economic zones like Polloc Freeport and WOW Matanog significantly
          boost industrial and halal trade capacity?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q5_2_economic_zones", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-center transition-all",
                  data.q5_2_economic_zones === opt
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

      {/* 8. Barrier Question (Q5.3) */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          What is the single biggest barrier to growing the Transformers cluster?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Halal certification delays",
            "Lack of processing facilities",
            "Weak market linkages",
            "Skills mismatch",
            "Competition from Malaysia/Indonesia",
            "Limited cold chain",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q5_3_barrier", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q5_3_barrier === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* 9. Halal Park Question (Q5.4) */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Should BARMM prioritize a dedicated Halal Industrial Park?
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Yes — essential for competitiveness",
            "Yes — but after certification reform",
            "No — focus on distributed MSMEs",
            "No — too resource-intensive",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q5_4_halal_park", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q5_4_halal_park === opt
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

export default Section5_Transformers;
