import React from "react";
import { cn } from "@/lib/utils";
import {
  Globe,
  AlertTriangle,
} from "lucide-react";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export interface Section7Data {
  // SWOT — Strengths
  q_s7_bimpeaga_loc_impact?: number;
  q_s7_bimpeaga_loc_likelihood?: number;
  q_s7_domestic_halal_impact?: number;
  q_s7_domestic_halal_likelihood?: number;
  q_s7_polloc_impact?: number;
  q_s7_polloc_likelihood?: number;
  q_s7_islamic_finance_impact?: number;
  q_s7_islamic_finance_likelihood?: number;
  // SWOT — Weaknesses
  q_s7_infra_deficits_impact?: number;
  q_s7_infra_deficits_likelihood?: number;
  q_s7_fragmented_policy_impact?: number;
  q_s7_fragmented_policy_likelihood?: number;
  q_s7_market_linkages_impact?: number;
  q_s7_market_linkages_likelihood?: number;
  q_s7_tech_adoption_impact?: number;
  q_s7_tech_adoption_likelihood?: number;
  // SWOT — Opportunities
  q_s7_asean_halal_impact?: number;
  q_s7_asean_halal_likelihood?: number;
  q_s7_bimpeaga_integration_impact?: number;
  q_s7_bimpeaga_integration_likelihood?: number;
  q_s7_uae_corridor_impact?: number;
  q_s7_uae_corridor_likelihood?: number;
  q_s7_tourism_potential_impact?: number;
  q_s7_tourism_potential_likelihood?: number;
  // SWOT — Threats
  q_s7_halal_competition_impact?: number;
  q_s7_halal_competition_likelihood?: number;
  q_s7_security_incidents_impact?: number;
  q_s7_security_incidents_likelihood?: number;
  q_s7_price_volatility_impact?: number;
  q_s7_price_volatility_likelihood?: number;
  q_s7_natl_coord_impact?: number;
  q_s7_natl_coord_likelihood?: number;
  // Archetypes
  q_s7_escalation: string;
  q_s7_escalation_followup: string;
  q_s7_limits_growth: string;
  q_s7_limits_followup: string;
  // Contextual
  q7_1_connectivity_priority: string;
  q7_2_integration_challenge: string;
  q7_3_priority_node: string;
  q7_4_trapped_value_province: string;
  q7_5_bridge_impact: string;
  q7_6_gateway_province: string;
  q7_7_priority_vector: string;
  q7_8_uae_feasibility?: number;
  q7_9_bimpeaga_leverage?: number;
}

interface Section7Props {
  data: Section7Data;
  onChange: (data: Section7Data) => void;
}

// ------------------------------------------------------------------
// GlassCard helper
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
// Reusable 1-5 scale buttons
// ------------------------------------------------------------------
const ScaleButtons: React.FC<{
  value: number | undefined;
  onChange: (v: number) => void;
  label: string;
}> = ({ value, onChange, label }) => (
  <div>
    <p className="text-xs text-[#065f46] mb-2">{label}</p>
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={cn(
            "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
            value === v
              ? "bg-[#C9A84C] text-white border-[#C9A84C]"
              : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
          )}
        >
          {v}
        </button>
      ))}
    </div>
  </div>
);

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
const Section7_Connectors: React.FC<Section7Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section7Data>(
    field: K,
    value: Section7Data[K]
  ) => onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      {/* ============================================================ */}
      {/* HEADER                                                       */}
      {/* ============================================================ */}
      <div className="flex items-center gap-3 mb-4">
        <Globe className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 7: Cluster 4 — Connectors: Linking Local Value to Global Demand
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        The Connectors cluster maps how Bangsamoro connects its halal and cultural assets to international markets through BIMP-EAGA and UAE/GCC trade corridors.
      </p>

      {/* ============================================================ */}
      {/* 1. CLUSTER IMAGE                                             */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%204_%20Connectors.png"
          alt="Cluster 4 | Connectors"
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            Cluster 4 | Connectors — Linking Local Value to Global Demand
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. CONTEXT CARD                                              */}
      {/* ============================================================ */}
      <GlassCard>
        <p className="text-sm text-[#022c22]">
          Two major international trade routes: <strong>Target Vector 1 — BIMP-EAGA Corridor</strong> (capturing 3% share of ASEAN halal market through cross-border trade), <strong>Target Vector 2 — UAE &amp; GCC</strong> (building halal export linkages). Cultural Tourism (BTDP 2024–2033) invests ₱161.97B to develop Ligawasan Marsh and Lake Lanao as Muslim-friendly eco-tourism hubs.
        </p>
      </GlassCard>

      {/* ============================================================ */}
      {/* 3. SWOT — STRENGTHS                                          */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
            STRENGTH
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
        </p>

        {/* S2 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Strategic BIMP-EAGA Location.</strong> BARMM is close to Sabah and ASEAN trade routes, making it a natural gateway for regional trade.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_bimpeaga_loc_impact}
              onChange={(v) => update("q_s7_bimpeaga_loc_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_bimpeaga_loc_likelihood}
              onChange={(v) => update("q_s7_bimpeaga_loc_likelihood", v)}
            />
          </div>
        </div>

        {/* S4 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Large Domestic Halal Market.</strong> 5.69 million Muslim consumers create strong built-in local demand for halal products and services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_domestic_halal_impact}
              onChange={(v) => update("q_s7_domestic_halal_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_domestic_halal_likelihood}
              onChange={(v) => update("q_s7_domestic_halal_likelihood", v)}
            />
          </div>
        </div>

        {/* S6 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Polloc Freeport &amp; Economic Zone.</strong> Strategic logistics and trade hub serving as a gateway for goods entering and leaving BARMM.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_polloc_impact}
              onChange={(v) => update("q_s7_polloc_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_polloc_likelihood}
              onChange={(v) => update("q_s7_polloc_likelihood", v)}
            />
          </div>
        </div>

        {/* S9 */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Islamic Finance Legal Framework.</strong> RA 11439 enables Shariah-compliant banking and finance for trade capital mobilization.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_islamic_finance_impact}
              onChange={(v) => update("q_s7_islamic_finance_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_islamic_finance_likelihood}
              onChange={(v) => update("q_s7_islamic_finance_likelihood", v)}
            />
          </div>
        </div>
      </GlassCard>

      {/* ============================================================ */}
      {/* SWOT — WEAKNESSES                                            */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700">
            WEAKNESS
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
        </p>

        {/* W1 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Critical Infrastructure Deficits.</strong> Gaps in energy, roads, digital connectivity, and water supply — especially in island provinces.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_infra_deficits_impact}
              onChange={(v) => update("q_s7_infra_deficits_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_infra_deficits_likelihood}
              onChange={(v) => update("q_s7_infra_deficits_likelihood", v)}
            />
          </div>
        </div>

        {/* W6 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Fragmented Policy Frameworks.</strong> Different ministries lack coordination, causing delays and underspending.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_fragmented_policy_impact}
              onChange={(v) => update("q_s7_fragmented_policy_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_fragmented_policy_likelihood}
              onChange={(v) => update("q_s7_fragmented_policy_likelihood", v)}
            />
          </div>
        </div>

        {/* W9 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Weak Market Linkages.</strong> Farmers and producers struggle to find buyers and get fair price information.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_market_linkages_impact}
              onChange={(v) => update("q_s7_market_linkages_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_market_linkages_likelihood}
              onChange={(v) => update("q_s7_market_linkages_likelihood", v)}
            />
          </div>
        </div>

        {/* W10 */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Low Technology Adoption.</strong> Slow uptake of modern tools for farming, processing, and online selling.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_tech_adoption_impact}
              onChange={(v) => update("q_s7_tech_adoption_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_tech_adoption_likelihood}
              onChange={(v) => update("q_s7_tech_adoption_likelihood", v)}
            />
          </div>
        </div>
      </GlassCard>

      {/* ============================================================ */}
      {/* SWOT — OPPORTUNITIES                                         */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
            OPPORTUNITY
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
        </p>

        {/* O3 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>ASEAN Halal Economy.</strong> USD 1.38 trillion market. BARMM can target a share through BIMP-EAGA corridor and halal parks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_asean_halal_impact}
              onChange={(v) => update("q_s7_asean_halal_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_asean_halal_likelihood}
              onChange={(v) => update("q_s7_asean_halal_likelihood", v)}
            />
          </div>
        </div>

        {/* O5 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>BIMP-EAGA Regional Integration.</strong> Cross-border trade agreements and eco-corridors with Sabah can open new markets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_bimpeaga_integration_impact}
              onChange={(v) => update("q_s7_bimpeaga_integration_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_bimpeaga_integration_likelihood}
              onChange={(v) => update("q_s7_bimpeaga_integration_likelihood", v)}
            />
          </div>
        </div>

        {/* O6 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>UAE/GCC Halal Export Corridor.</strong> Partnerships like MAFAR-Prime Group connect BARMM producers directly to Middle East buyers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_uae_corridor_impact}
              onChange={(v) => update("q_s7_uae_corridor_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_uae_corridor_likelihood}
              onChange={(v) => update("q_s7_uae_corridor_likelihood", v)}
            />
          </div>
        </div>

        {/* O11 */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Tourism Recovery Potential.</strong> Isabela City named Tourism Champion 2024; Lake Lanao has untapped eco-tourism potential.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_tourism_potential_impact}
              onChange={(v) => update("q_s7_tourism_potential_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_tourism_potential_likelihood}
              onChange={(v) => update("q_s7_tourism_potential_likelihood", v)}
            />
          </div>
        </div>
      </GlassCard>

      {/* ============================================================ */}
      {/* SWOT — THREATS                                               */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
            THREAT
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
        </p>

        {/* T2 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Competition from Established Halal Hubs.</strong> Malaysia, Indonesia, and Thailand already dominate the halal market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_halal_competition_impact}
              onChange={(v) => update("q_s7_halal_competition_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_halal_competition_likelihood}
              onChange={(v) => update("q_s7_halal_competition_likelihood", v)}
            />
          </div>
        </div>

        {/* T4 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Residual Security Incidents.</strong> Clan conflicts and armed groups create fear among investors and tourists.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_security_incidents_impact}
              onChange={(v) => update("q_s7_security_incidents_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_security_incidents_likelihood}
              onChange={(v) => update("q_s7_security_incidents_likelihood", v)}
            />
          </div>
        </div>

        {/* T7 */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Global Market Price Volatility.</strong> World prices for rubber, coconut, and seaweed fluctuate often.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_price_volatility_impact}
              onChange={(v) => update("q_s7_price_volatility_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_price_volatility_likelihood}
              onChange={(v) => update("q_s7_price_volatility_likelihood", v)}
            />
          </div>
        </div>

        {/* T8 */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Limited National Government Coordination.</strong> Gaps in funding and alignment with national programs leave BARMM behind.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScaleButtons
              label="Impact (1–5)"
              value={data.q_s7_natl_coord_impact}
              onChange={(v) => update("q_s7_natl_coord_impact", v)}
            />
            <ScaleButtons
              label="Likelihood (1–5)"
              value={data.q_s7_natl_coord_likelihood}
              onChange={(v) => update("q_s7_natl_coord_likelihood", v)}
            />
          </div>
        </div>
      </GlassCard>

      {/* ============================================================ */}
      {/* 4. SYSTEMS ARCHETYPE: ESCALATION                             */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Archetype: Escalation
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Cycles%20of%20Exclusion%20and%20Retaliation.png"
            alt="Escalation Archetype"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          When one group perceives a threat, it mobilizes to protect its interests — triggering counter-mobilization. The result is a reinforcing cycle of competitive spirals that diverts resources from productive development to contestation.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How accurately does the &quot;Escalation&quot; archetype reflect competitive dynamics among clans, provinces, or agencies competing for trade corridors and connectivity investments in BARMM?
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s7_escalation", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s7_escalation === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            )
          )}
        </div>
        <p className="text-sm font-medium text-[#022c22] mb-2">
          In which domain do you see this most clearly — clan rivalries, inter-provincial competition, inter-agency rivalry, or external market competition?
        </p>
        <textarea
          rows={2}
          value={data.q_s7_escalation_followup || ""}
          onChange={(e) => update("q_s7_escalation_followup", e.target.value)}
          placeholder="Describe where you see escalation dynamics most clearly..."
          className="w-full p-3 rounded-lg border border-[#C9A84C]/30 text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 bg-white resize-none"
        />
      </GlassCard>

      {/* ============================================================ */}
      {/* 5. SYSTEMS ARCHETYPE: LIMITS TO GROWTH                       */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Archetype: Limits to Growth
          </h3>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Trade and connectivity growth encounters balancing loops — infrastructure gaps, security concerns, and funding limits slow progress despite initial gains from BIMP-EAGA and UAE partnerships.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How accurately does &quot;Limits to Growth&quot; describe the barriers facing BARMM&apos;s trade corridor expansion and connectivity build-out?
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q_s7_limits_growth", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q_s7_limits_growth === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            )
          )}
        </div>
        <p className="text-sm font-medium text-[#022c22] mb-2">
          Which bottleneck is most limiting — port capacity, road quality, digital connectivity, or customs/border procedures?
        </p>
        <textarea
          rows={2}
          value={data.q_s7_limits_followup || ""}
          onChange={(e) => update("q_s7_limits_followup", e.target.value)}
          placeholder="Describe the most limiting bottleneck..."
          className="w-full p-3 rounded-lg border border-[#C9A84C]/30 text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 bg-white resize-none"
        />
      </GlassCard>

      {/* ============================================================ */}
      {/* 6. CONNECTIVITY CAPITAL                                      */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Connectivity%20Capital%20.png"
            alt="The Connectivity Capital Matrix"
            className="w-full h-auto max-h-[500px] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">The Connectivity Capital Matrix</p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Three pillars: <strong>Physical Pipelines</strong> (₱627M MPW projects, 1,000km farm-to-market roads), <strong>Digital Backbones</strong> (fiber-optic, e-governance, 1-day business registration by 2028), <strong>Market-Access Assets</strong> (cold-chain in Tawi-Tawi, 10 provincial port upgrades).
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which connectivity pillar should receive the highest priority investment?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Physical pipelines (roads, ports)",
            "Digital backbones (broadband, e-gov)",
            "Market-access assets (cold-chain, logistics)",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q7_1_connectivity_priority", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q7_1_connectivity_priority === opt
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
      {/* 7. INTEGRATING ZONES                                         */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Critical%20Test%20-%20Integrating%20Zones%20and%20Scaling%20Capiral%20-%20Think%20of%20one%20challenge%20%20we%20must%20overcome%20to%20achieve%20this%20vision.png"
            alt="The Critical Test: Integrating Zones & Scaling Capital"
            className="w-full h-auto max-h-[500px] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              The Critical Test: Integrating Zones &amp; Scaling Capital
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Connectivity Map (Basilan-Zamboanga Bridge, Polloc Freeport, UAE Halal Export Corridors) and the Ethical Bloodstream Pyramid (Islamic Banking &amp; Sukuk, Takaful, Microfinance &amp; Waqf) — showing that true integration requires both physical and financial connectivity.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          What is the single biggest challenge to integrating BARMM&apos;s economic zones with global trade corridors?
        </p>
        <textarea
          rows={2}
          value={data.q7_2_integration_challenge || ""}
          onChange={(e) => update("q7_2_integration_challenge", e.target.value)}
          placeholder="Describe the biggest integration challenge..."
          className="w-full p-3 rounded-lg border border-[#C9A84C]/30 text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 bg-white resize-none"
        />
      </GlassCard>

      {/* ============================================================ */}
      {/* 8. PROVINCIAL SPECIALIZED NODES                              */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%201%20-%20Provincial%20-%20Geopolitical%20Specialized%20Nodes.png"
            alt="Layer 1 — Geopolitical Specialized Nodes"
            className="w-full h-auto max-h-[500px] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Layer 1 — Geopolitical Specialized Nodes
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Six provincial hubs: <strong>Mainland</strong> (Maguindanao del Norte &amp; Cotabato — Admin/Halal Hub, Maguindanao del Sur — Agri-Industrial Breadbasket, Lanao del Sur — Clean Energy &amp; Agro-Hub, SGA — Agro-Industrial Corridor) and <strong>Archipelagic</strong> (Basilan — Logistics Gateway, Tawi-Tawi — Maritime Gateway).
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which provincial node should be the highest priority for connectivity investment?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Maguindanao del Norte (Polloc/Halal Hub)",
            "Maguindanao del Sur (Agro-Industrial)",
            "Lanao del Sur (Energy/Agro)",
            "Basilan (Logistics Gateway)",
            "Tawi-Tawi (Maritime Gateway)",
            "SGA (Mindanao Bridge)",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q7_3_priority_node", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q7_3_priority_node === opt
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
      {/* 9. TRAPPED VALUE                                             */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/The%20Trapped%20Value.png"
            alt="The Geographic Reality: Trapped Value"
            className="w-full h-auto max-h-[500px] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              The Geographic Reality: Trapped Value
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Shows how limited connectivity traps economic potential — Basilan&apos;s 48,386ha rubber and Tawi-Tawi&apos;s 40% of national seaweed output isolated from global trade. The Law of Sequencing highlights the Zamboanga-Basilan Interconnection and digital backbones as essential unlock steps.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which trapped-value province would benefit most from immediate connectivity investment?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Basilan (rubber, aquaculture)",
            "Tawi-Tawi (seaweed, BIMP-EAGA)",
            "Sulu (fisheries, tourism)",
            "Lanao del Sur (energy, agriculture)",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q7_4_trapped_value_province", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q7_4_trapped_value_province === opt
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
      {/* 10. SHATTERING GEOGRAPHIC ISOLATION                          */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Shattering%20Geographical%20Isolation.png"
            alt="The Archipelagic Bridge: Shattering Geographic Isolation"
            className="w-full h-auto max-h-[500px] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              The Archipelagic Bridge: Shattering Geographic Isolation
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Three key initiatives: <strong>Zamboanga–Basilan Interconnection</strong> (₱6.67B, 69kV transmission), <strong>Basilan–Zamboanga Bridge</strong> (31km corridor by 2030), <strong>Bongao Bridge Tawi-Tawi</strong> (541m span). Systemic interventions improving market access and labor mobility.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which bridge/interconnection project will have the most transformative impact on Bangsamoro&apos;s economy?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Zamboanga-Basilan Interconnection (energy)",
            "Basilan-Zamboanga Bridge (transport)",
            "Bongao Bridge Tawi-Tawi (intra-provincial)",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q7_5_bridge_impact", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q7_5_bridge_impact === opt
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
      {/* 11. BASILAN AND TAWI-TAWI                                    */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Basilan%20and%20tawi-Tawi.png"
            alt="Basilan and Tawi-Tawi: Provincial Endowments & Strategic Leverages"
            className="w-full h-auto max-h-[500px] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Basilan and Tawi-Tawi: Provincial Endowments &amp; Strategic Leverages
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          <strong>Basilan — The Archipelagic Catalyst:</strong> 48,366ha rubber, coastal aquaculture, ZBIP power project, Basilan-Zamboanga Bridge. <strong>Tawi-Tawi — The Maritime &amp; Eco-Tourism Hub:</strong> BIMP-EAGA location, marine biodiversity, maritime gateway for trade and blue economy.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which province — Basilan or Tawi-Tawi — has greater potential to become Bangsamoro&apos;s primary maritime trade gateway?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Basilan (rubber, ZBIP, closer to Mindanao)",
            "Tawi-Tawi (seaweed, BIMP-EAGA, direct Sabah route)",
            "Both equally — they serve different corridors",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q7_6_gateway_province", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q7_6_gateway_province === opt
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
      {/* 12. GLOBAL INTEGRATION                                       */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Global%20Integration%20Vectors.png"
            alt="Layer 3: Global Integration Vectors"
            className="w-full h-auto max-h-[500px] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">Layer 3: Global Integration Vectors</p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          <strong>Vector 1 — BIMP-EAGA Corridor:</strong> proximity-based maritime trade, 3% of ASEAN halal market via Tawi-Tawi. <strong>Vector 2 — UAE &amp; GCC Corridor:</strong> standards-based air/sea logistics, $2.3T global halal market via Polloc Freeport and OIC/SMIIC accreditation.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Which global integration vector should Bangsamoro prioritize?
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            "BIMP-EAGA (regional, proximity-based, lower barriers)",
            "UAE/GCC (global, higher value, standards-based)",
            "Both simultaneously — they complement each other",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q7_7_priority_vector", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q7_7_priority_vector === opt
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
      {/* 13. UAE-GCC CONNECTIVITY                                     */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/UAE%20&%20GCC.png"
            alt="BARMM Connectivity vis-à-vis UAE & GCC"
            className="w-full h-auto max-h-[500px] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              BARMM Connectivity vis-à-vis UAE &amp; GCC
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Three hubs linked to $2.3T global halal market: <strong>Basilan</strong> (₱23.15B GDP, Archipelagic Logistics Gateway, ZBIP), <strong>Maguindanao del Norte</strong> (₱81.91B GDP, Admin &amp; Halal Hub, Polloc), <strong>Maguindanao del Sur</strong> (₱39.54B GDP, Agri-Industrial Breadbasket).
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How realistic is BARMM&apos;s goal of capturing a meaningful share of the UAE/GCC halal market by 2030?
        </p>
        <p className="text-xs text-[#065f46] mb-2">1 = Not realistic, 5 = Very realistic</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => update("q7_8_uae_feasibility", v)}
              className={cn(
                "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                data.q7_8_uae_feasibility === v
                  ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* ============================================================ */}
      {/* 14. BIMP-EAGA CONNECTIVITY                                   */}
      {/* ============================================================ */}
      <GlassCard className="!p-6">
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BARMM%20Connectivity-BIMP-EAGA.png"
            alt="BARMM Strategic Connectivity Map"
            className="w-full h-auto max-h-[500px] object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              BARMM Strategic Connectivity Map
            </p>
          </div>
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Tawi-Tawi and Basilan as maritime gateways feeding BIMP-EAGA. Maguindanao del Norte and Polloc Freeport as halal export centers to UAE/GCC. Maguindanao del Sur and Lanao del Sur as inland production zones.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          On a scale of 1–5, how effectively is Bangsamoro leveraging the BIMP-EAGA corridor for regional trade?
        </p>
        <p className="text-xs text-[#065f46] mb-2">1 = Not effectively, 5 = Very effectively</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => update("q7_9_bimpeaga_leverage", v)}
              className={cn(
                "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                data.q7_9_bimpeaga_leverage === v
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

export default Section7_Connectors;
