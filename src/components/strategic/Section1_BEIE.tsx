import React from "react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Section1Data {
  // ── Retained original questions ──────────────────────────────────────────
  q1_1: string;
  q1_2: string;
  q1_3_cluster_contribution: string;
  q1_4_beie_actionable: string;
  // ── SWOT Scale: Strengths (distributed) ─────────────────────────────────
  q_s1_halal_legitimacy_impact?: number;
  q_s1_halal_legitimacy_likelihood?: number;
  q_s1_bimpeaga_impact?: number;
  q_s1_bimpeaga_likelihood?: number;
  q_s1_domestic_demand_impact?: number;
  q_s1_domestic_demand_likelihood?: number;
}

interface Section1Props {
  data: Section1Data;
  onChange: (data: Section1Data) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const ScaleButton: React.FC<{
  value: number | undefined;
  onChange: (v: number) => void;
}> = ({ value, onChange }) => (
  <div className="flex gap-2">
    {[1, 2, 3, 4, 5].map((val) => (
      <button
        key={val}
        onClick={() => onChange(val)}
        className={cn(
          "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
          value === val
            ? "bg-[#C9A84C] text-white border-[#C9A84C]"
            : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10"
        )}
      >
        {val}
      </button>
    ))}
  </div>
);

// ─── Component ───────────────────────────────────────────────────────────────
const Section1_BEIE: React.FC<Section1Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section1Data>(field: K, value: Section1Data[K]) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 1: BEIE Framework</h2>
      </div>

      <p className="text-sm text-[#065f46] mb-4">
        The BEIE Framework organizes Bangsamoro's economy into five interconnected clusters.
        Your responses help validate this ecosystem approach against traditional sector-based planning.
      </p>

      {/* ── Image 1: Sector to Ecosystem ──────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.sectorToEcosystem.url}
          alt={BIRD_IMAGES.sectorToEcosystem.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.sectorToEcosystem.title}</p>
        </div>
      </div>

      {/* ── Q1.1 ──────────────────────────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          How well do you understand the BEIE ecosystem approach compared to traditional
          sector-based planning?
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            "Very well — I see the interconnected value",
            "Somewhat — I grasp the concept but need clarity on linkages",
            "Familiar with sector-based only — ecosystems are new to me",
            "Not familiar with either approach",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q1_1", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q1_1 === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* ── Q1.2 ──────────────────────────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          How relevant is the BEIE framework to real-world investment planning in your
          province or organization?
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {["Highly relevant", "Moderately relevant", "Somewhat relevant", "Not relevant"].map(
            (opt) => (
              <button
                key={opt}
                onClick={() => update("q1_2", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q1_2 === opt
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

      {/* ── SWOT Scale Questions: Key Strengths ───────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">STRENGTHS</span>
          <h3 className="text-base font-semibold text-[#022c22]">
            How much do these internal strengths help BARMM grow — and how likely are they to continue?
          </h3>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small effect, 5 = very large effect) × Likelihood (1 = very unlikely, 5 = very likely)
        </p>

        {/* S1: Halal Legitimacy */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Halal Legitimacy & Cultural Credibility.</strong> BARMM's authentic Muslim-majority identity provides unmatched credibility for halal branding and global market access.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <ScaleButton value={data.q_s1_halal_legitimacy_impact} onChange={(v) => update("q_s1_halal_legitimacy_impact", v)} />
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <ScaleButton value={data.q_s1_halal_legitimacy_likelihood} onChange={(v) => update("q_s1_halal_legitimacy_likelihood", v)} />
            </div>
          </div>
        </div>

        {/* S2: BIMP-EAGA Location */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Strategic BIMP-EAGA Location.</strong> BARMM's proximity to Sabah and ASEAN trade corridors makes it a natural gateway for regional trade with 70M+ consumers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <ScaleButton value={data.q_s1_bimpeaga_impact} onChange={(v) => update("q_s1_bimpeaga_impact", v)} />
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <ScaleButton value={data.q_s1_bimpeaga_likelihood} onChange={(v) => update("q_s1_bimpeaga_likelihood", v)} />
            </div>
          </div>
        </div>

        {/* S4: Domestic Halal Demand */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Domestic Halal Demand.</strong> With 5.69 million Muslim consumers, BARMM has strong built-in local demand that absorbs halal products and services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
              <ScaleButton value={data.q_s1_domestic_demand_impact} onChange={(v) => update("q_s1_domestic_demand_impact", v)} />
            </div>
            <div>
              <p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p>
              <ScaleButton value={data.q_s1_domestic_demand_likelihood} onChange={(v) => update("q_s1_domestic_demand_likelihood", v)} />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ── Image 2: BEIE v2 ──────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.beieFrameworkV2.url}
          alt={BIRD_IMAGES.beieFrameworkV2.alt}
          className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.beieFrameworkV2.title}</p>
        </div>
      </div>

      {/* ── Q1.3: Cluster Contribution (Retained) ─────────────────────────── */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          In which cluster — Foundations, Transformers, Enablers, Connectors, or Financiers — does
          your organization believe it can contribute most meaningfully?
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {["Foundations", "Transformers", "Enablers", "Connectors", "Financiers"].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q1_3_cluster_contribution", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q1_3_cluster_contribution === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* ── Image 3: BEIE v3 ──────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.beieFrameworkV3.url}
          alt={BIRD_IMAGES.beieFrameworkV3.alt}
          className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.beieFrameworkV3.title}</p>
        </div>
      </div>

      {/* ── Q1.4: BEIE Actionable (Retained) ──────────────────────────────── */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          How can stakeholders across government, business, and civil society work together to make
          the BEIE ecosystem approach more actionable in real investment planning?
        </h3>
        <textarea
          value={data.q1_4_beie_actionable}
          onChange={(e) => update("q1_4_beie_actionable", e.target.value)}
          placeholder="Share your thoughts in one to two sentences..."
          className="w-full p-4 border border-[#C9A84C]/30 rounded-lg text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 min-h-[100px] resize-y"
        />
      </GlassCard>
    </div>
  );
};

export default Section1_BEIE;