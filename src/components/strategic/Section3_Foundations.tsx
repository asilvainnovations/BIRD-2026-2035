import React from "react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { GlassCard } from "@/components/GlassCard";
import { cn } from "@/lib/utils";
import { Leaf, AlertTriangle } from "lucide-react";

export interface Section3Data {
  q3_1_priorities: string[];
  q3_2_feasibility?: number;
  q3_el_nino_impact?: number;
  q3_el_nino_like?: number;
  q3_pestalotiopsis_impact?: number;
  q3_pestalotiopsis_like?: number;
  q3_postharvest_impact?: number;
  q3_postharvest_like?: number;
  q3_limits_growth: string;
  // ── SWOT Scale: Climate Threat ───────────────────────────────────────────
  q_s3_climate_change_impact?: number;
  q_s3_climate_change_likelihood?: number;
  // ── Systems Mapping: Tragedy of the Commons ──────────────────────────────
  q_s3_tragedy_commons: string;
}

interface Section3Props {
  data: Section3Data;
  onChange: (data: Section3Data) => void;
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

const Section3_Foundations: React.FC<Section3Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section3Data>(field: K, value: Section3Data[K]) => onChange({ ...data, [field]: value });
  const toggle = (val: string) => update("q3_1_priorities", data.q3_1_priorities.includes(val) ? data.q3_1_priorities.filter(v => v !== val) : [...data.q3_1_priorities, val]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Leaf className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 3: Cluster 1 — Foundations</h2>
      </div>

      <p className="text-sm text-[#065f46] mb-4">
        The Foundations cluster — agriculture, fisheries, forestry, energy, and environment — sustains the Bangsamoro economy. All other clusters depend on its health.
      </p>

      {/* Cluster Image */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.cluster1Foundations.url} alt={BIRD_IMAGES.cluster1Foundations.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.cluster1Foundations.title}</p>
        </div>
      </div>

      {/* Q3.1: Priorities */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Which Foundations sub-sectors should be the highest investment priorities? (Select all)</h3>
        <div className="space-y-2">
          {["Agriculture modernization", "Fisheries & aquaculture", "Forestry & eco-tourism", "Renewable energy", "Water resource management", "Climate adaptation"].map(opt => (
            <button key={opt} onClick={() => toggle(opt)}
              className={cn("w-full p-3 rounded-lg border text-sm text-left transition-all",
                data.q3_1_priorities.includes(opt) ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Q3.2: Feasibility */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">How feasible is it for BARMM to achieve food security and agricultural self-sufficiency by 2030?</h3>
        <ScaleButton value={data.q3_2_feasibility} onChange={(v) => update("q3_2_feasibility", v)} />
        <p className="text-xs text-[#065f46] mt-2 italic">1 = Not feasible | 5 = Very feasible</p>
      </GlassCard>

      {/* SWOT Scale: Climate Change Threat */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">THREAT</span>
          <h3 className="text-base font-semibold text-[#022c22]">Climate Change Vulnerabilities</h3>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate: Impact (1 = very small damage, 5 = very large damage) × Likelihood (1 = very unlikely, 5 = very likely)
        </p>
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Climate Change.</strong> El Niño, floods, and changing rainfall patterns already caused a 4.2% drop in agriculture in 2024 and threaten food security across all provinces.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p><ScaleButton value={data.q_s3_climate_change_impact} onChange={(v) => update("q_s3_climate_change_impact", v)} /></div>
            <div><p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p><ScaleButton value={data.q_s3_climate_change_likelihood} onChange={(v) => update("q_s3_climate_change_likelihood", v)} /></div>
          </div>
        </div>
      </GlassCard>

      {/* Systems Mapping: Tragedy of the Commons */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">Resource Trap: Tragedy of the Commons</h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img src={BIRD_IMAGES.tragedyOfTheCommons.url} alt={BIRD_IMAGES.tragedyOfTheCommons.alt} className="w-full h-auto object-contain" />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          The <strong>Tragedy of the Commons</strong> archetype shows how shared resources — watersheds, fishing grounds, forests — get over-exploited when governance is fragmented. Each actor gains individually, but the collective impact depletes the resource base for all. By the time impacts are visible, irreversible thresholds may already be crossed.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">How accurately does this reflect resource management challenges in BARMM?</p>
        <div className="grid grid-cols-2 gap-3">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(opt => (
            <button key={opt} onClick={() => update("q_s3_tragedy_commons", opt)}
              className={cn("p-3 rounded-lg border text-sm text-left transition-all",
                data.q_s3_tragedy_commons === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Existing conditional questions */}
      {data.q3_1_priorities.includes("agriculture") && (
        <GlassCard className="!p-6">
          <h3 className="text-base font-semibold text-[#022c22] mb-3">El Niño impact on agriculture (2024 experience)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p><ScaleButton value={data.q3_el_nino_impact} onChange={(v) => update("q3_el_nino_impact", v)} /></div>
            <div><p className="text-xs text-[#065f46] mb-2">Likelihood of recurrence (1–5)</p><ScaleButton value={data.q3_el_nino_like} onChange={(v) => update("q3_el_nino_like", v)} /></div>
          </div>
        </GlassCard>
      )}

      {/* Basilan-specific */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Pestalotiopsis impact on rubber (Basilan-specific)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p><ScaleButton value={data.q3_pestalotiopsis_impact} onChange={(v) => update("q3_pestalotiopsis_impact", v)} /></div>
          <div><p className="text-xs text-[#065f46] mb-2">Likelihood of spread (1–5)</p><ScaleButton value={data.q3_pestalotiopsis_like} onChange={(v) => update("q3_pestalotiopsis_like", v)} /></div>
        </div>
      </GlassCard>

      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Post-harvest losses impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p><ScaleButton value={data.q3_postharvest_impact} onChange={(v) => update("q3_postharvest_impact", v)} /></div>
          <div><p className="text-xs text-[#065f46] mb-2">Likelihood of reduction (1–5)</p><ScaleButton value={data.q3_postharvest_like} onChange={(v) => update("q3_postharvest_like", v)} /></div>
        </div>
      </GlassCard>

      {/* Q3: Limits to Growth */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Which growth ceiling is most limiting for the Foundations cluster?</h3>
        <textarea value={data.q3_limits_growth} onChange={(e) => update("q3_limits_growth", e.target.value)}
          placeholder="Describe the most limiting constraint..."
          className="w-full p-4 border border-[#C9A84C]/30 rounded-lg text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 min-h-[80px] resize-y" />
      </GlassCard>
    </div>
  );
};

export default Section3_Foundations;
