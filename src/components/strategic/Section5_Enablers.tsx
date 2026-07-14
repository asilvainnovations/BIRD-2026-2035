import React from "react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { GlassCard } from "@/components/GlassCard";
import { cn } from "@/lib/utils";
import { Factory, AlertTriangle } from "lucide-react";

export interface Section4Data {
  q4_1_barrier: string;
  q4_2_halal_park: string;
  q4_3_fixes_fail: string;
  q4_4_commodity_impact: string;
  q4_5_heds_ranking: string[];
  // ── SWOT Scale: Transformers-focused ─────────────────────────────────────
  q_s4_halal_cert_impact?: number;
  q_s4_halal_cert_likelihood?: number;
  q_s4_global_halal_impact?: number;
  q_s4_global_halal_likelihood?: number;
  q_s4_competition_impact?: number;
  q_s4_competition_likelihood?: number;
  // ── Systems Mapping: Fixes that Fail ─────────────────────────────────────
  q_s4_fixes_fail: string;
}

interface Section4Props {
  data: Section4Data;
  onChange: (data: Section4Data) => void;
}

const ScaleButton: React.FC<{ value?: number; onChange: (v: number) => void }> = ({ value, onChange }) => (
  <div className="flex gap-2">
    {[1, 2, 3, 4, 5].map((val) => (
      <button key={val} onClick={() => onChange(val)}
        className={cn("w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
          value === val ? "bg-[#C9A84C] text-white border-[#C9A84C]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10")}>{val}</button>
    ))}
  </div>
);

const Section4_Transformers: React.FC<Section4Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section4Data>(field: K, value: Section4Data[K]) => onChange({ ...data, [field]: value });
  const toggle = (val: string) => update("q4_5_heds_ranking", data.q4_5_heds_ranking.includes(val) ? data.q4_5_heds_ranking.filter(v => v !== val) : [...data.q4_5_heds_ranking, val]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Factory className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 4: Cluster 2 — Transformers</h2>
      </div>

      <p className="text-sm text-[#065f46] mb-4">
        The Transformers cluster — halal industry and agro-industrial processing — converts BARMM's raw materials into higher-value products. This is where cultural authenticity becomes economic advantage.
      </p>

      {/* Cluster Image */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.cluster2Transformers.url} alt={BIRD_IMAGES.cluster2Transformers.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.cluster2Transformers.title}</p>
        </div>
      </div>

      {/* Q4.1: Barrier */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">What is the single biggest barrier to growing the Transformers cluster?</h3>
        <div className="grid grid-cols-2 gap-3">
          {["Halal certification delays", "Lack of processing facilities", "Weak market linkages", "Skills mismatch", "Competition from Malaysia/Indonesia", "Limited cold chain"].map(opt => (
            <button key={opt} onClick={() => update("q4_1_barrier", opt)}
              className={cn("p-3 rounded-lg border text-sm text-left transition-all",
                data.q4_1_barrier === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Q4.2: Halal Park */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Should BARMM prioritize a dedicated Halal Industrial Park?</h3>
        <div className="grid grid-cols-2 gap-3">
          {["Yes — essential for competitiveness", "Yes — but after certification reform", "No — focus on distributed MSMEs", "No — too resource-intensive"].map(opt => (
            <button key={opt} onClick={() => update("q4_2_halal_park", opt)}
              className={cn("p-3 rounded-lg border text-sm text-left transition-all",
                data.q4_2_halal_park === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* SWOT Scale: Halal-focused */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700">WEAKNESS</span>
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">OPPORTUNITY</span>
          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">THREAT</span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1–5) × Likelihood (1–5). These three factors together cover the core halal competitiveness challenge.
        </p>

        {/* W3: Weak Halal Certification */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Weak Halal Certification System.</strong> The Bangsamoro Halal Board lacks resources and international recognition, making it hard for local producers to export halal goods (45–60 days vs. Malaysia's 15-day benchmark).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p><ScaleButton value={data.q_s4_halal_cert_impact} onChange={(v) => update("q_s4_halal_cert_impact", v)} /></div>
            <div><p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p><ScaleButton value={data.q_s4_halal_cert_likelihood} onChange={(v) => update("q_s4_halal_cert_likelihood", v)} /></div>
          </div>
        </div>

        {/* O1: Global Halal Market */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Global Halal Market Growth.</strong> The worldwide halal market is valued at USD 2.3 trillion and growing, creating massive export demand for BARMM's authentic halal products.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p><ScaleButton value={data.q_s4_global_halal_impact} onChange={(v) => update("q_s4_global_halal_impact", v)} /></div>
            <div><p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p><ScaleButton value={data.q_s4_global_halal_likelihood} onChange={(v) => update("q_s4_global_halal_likelihood", v)} /></div>
          </div>
        </div>

        {/* T2: Competition from Halal Hubs */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Competition from Established Halal Hubs.</strong> Malaysia, Indonesia, and Thailand already dominate the halal market, making it hard for BARMM to break in without first-mover advantages.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p><ScaleButton value={data.q_s4_competition_impact} onChange={(v) => update("q_s4_competition_impact", v)} /></div>
            <div><p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p><ScaleButton value={data.q_s4_competition_likelihood} onChange={(v) => update("q_s4_competition_likelihood", v)} /></div>
          </div>
        </div>
      </GlassCard>

      {/* Systems Mapping: Fixes that Fail */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">Governance Trap: Fixes that Fail</h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img src={BIRD_IMAGES.fixesThatFail.url} alt={BIRD_IMAGES.fixesThatFail.alt} className="w-full h-auto object-contain" />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          The <strong>Fixes that Fail</strong> archetype captures how short-term tax incentives, fragmented subsidies, and piecemeal projects create the illusion of progress — but erode institutional capacity over time. Investors exit once incentives expire; subsidies without post-harvest infrastructure fail to create sustainable value.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">How accurately does this reflect industrial policy challenges in BARMM?</p>
        <div className="grid grid-cols-2 gap-3">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(opt => (
            <button key={opt} onClick={() => update("q_s4_fixes_fail", opt)}
              className={cn("p-3 rounded-lg border text-sm text-left transition-all",
                data.q_s4_fixes_fail === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Farm-to-Market Pipeline */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.farmToMarketPipeline.url} alt={BIRD_IMAGES.farmToMarketPipeline.alt}
          className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.farmToMarketPipeline.title}</p>
        </div>
      </div>

      {/* Industrial Zones */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.transformersIndustrialZones.url} alt={BIRD_IMAGES.transformersIndustrialZones.alt}
          className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.transformersIndustrialZones.title}</p>
        </div>
      </div>

      {/* Capitalizing Cultural Advantage */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.capitalizingCulturalAdvantage.url} alt={BIRD_IMAGES.capitalizingCulturalAdvantage.alt}
          className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.capitalizingCulturalAdvantage.title}</p>
        </div>
      </div>

      {/* Q4.3: Fixes that Fail */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Which "quick fix" in the Transformers cluster is most likely to fail without systemic reform?</h3>
        <div className="grid grid-cols-2 gap-3">
          {["Tax incentives alone", "One-off training programs", "Facility construction without O&amp;M", "Export promotion without certification", "Subsidy without market linkage", "Technology donation without support"].map(opt => (
            <button key={opt} onClick={() => update("q4_3_fixes_fail", opt)}
              className={cn("p-3 rounded-lg border text-sm text-left transition-all",
                data.q4_3_fixes_fail === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Q4.4: Commodity Impact */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Which commodity is most vulnerable to global price volatility?</h3>
        <div className="grid grid-cols-3 gap-3">
          {["Rubber", "Coconut", "Seaweed", "Rice", "Corn", "Fish"].map(opt => (
            <button key={opt} onClick={() => update("q4_4_commodity_impact", opt)}
              className={cn("p-3 rounded-lg border text-sm text-center transition-all",
                data.q4_4_commodity_impact === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Q4.5: HEDS Ranking */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Which HEDS value-chain segment needs the most urgent investment? (Select top 3)</h3>
        <div className="space-y-2">
          {["Halal certification", "Cold chain infrastructure", "Processing facilities", "Market linkages", "Skills training", "Brand development"].map(opt => (
            <button key={opt} onClick={() => toggle(opt)}
              className={cn("w-full p-3 rounded-lg border text-sm text-left transition-all",
                data.q4_5_heds_ranking.includes(opt) ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Section4_Transformers;
