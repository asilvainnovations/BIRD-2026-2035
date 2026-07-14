import React from "react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { cn } from "@/lib/utils";
import { Globe, AlertTriangle } from "lucide-react";

export interface Section6Data {
  q6_1_bimpeaga?: number;
  q6_2_markets: string[];
  q6_3_export_target?: number;
  q6_4_uae_feasibility?: number;
  q6_5_perception: string;
  // ── SWOT Scale: Opportunity ──────────────────────────────────────────────
  q_s6_asean_halal_impact?: number;
  q_s6_asean_halal_likelihood?: number;
  // ── Systems Mapping: Success to the Successful ───────────────────────────
  q_s6_successful: string;
}

interface Section6Props {
  data: Section6Data;
  onChange: (data: Section6Data) => void;
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

const Section6_Connectors: React.FC<Section6Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section6Data>(field: K, value: Section6Data[K]) => onChange({ ...data, [field]: value });
  const toggle = (val: string) => update("q6_2_markets", data.q6_2_markets.includes(val) ? data.q6_2_markets.filter(v => v !== val) : [...data.q6_2_markets, val]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Globe className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 6: Cluster 4 — Connectors</h2>
      </div>

      <p className="text-sm text-[#065f46] mb-4">
        The Connectors cluster integrates BARMM into regional and global markets through BIMP-EAGA corridors, maritime trade, digital linkages, and halal export channels.
      </p>

      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.cluster4Connectors.url} alt={BIRD_IMAGES.cluster4Connectors.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.cluster4Connectors.title}</p>
        </div>
      </div>

      {/* Q6.1: BIMP-EAGA */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">How important is BIMP-EAGA integration to BARMM's economic future?</h3>
        <ScaleButton value={data.q6_1_bimpeaga} onChange={(v) => update("q6_1_bimpeaga", v)} />
        <p className="text-xs text-[#065f46] mt-2 italic">1 = Not important | 5 = Critical</p>
      </GlassCard>

      {/* SWOT Scale: ASEAN Halal Opportunity */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">OPPORTUNITY</span>
          <h3 className="text-base font-semibold text-[#022c22]">ASEAN Halal Market Access</h3>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate: Impact (1–5) × Likelihood (1–5)
        </p>
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>ASEAN Halal Economy.</strong> The ASEAN halal market is worth USD 1.38 trillion. BARMM can target a share through BIMP-EAGA corridors and halal parks — especially Maguindanao del Norte and Tawi-Tawi.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p><ScaleButton value={data.q_s6_asean_halal_impact} onChange={(v) => update("q_s6_asean_halal_impact", v)} /></div>
            <div><p className="text-xs text-[#065f46] mb-2">Likelihood BARMM captures share (1–5)</p><ScaleButton value={data.q_s6_asean_halal_likelihood} onChange={(v) => update("q_s6_asean_halal_likelihood", v)} /></div>
          </div>
        </div>
      </GlassCard>

      {/* Systems Mapping: Success to the Successful */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">Equity Trap: Success to the Successful</h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img src={BIRD_IMAGES.successToTheSuccessful.url} alt={BIRD_IMAGES.successToTheSuccessful.alt} className="w-full h-auto object-contain" />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Mainland provinces (Maguindanao del Norte, Lanao del Sur) attract most resources due to larger economies and stronger infrastructure. Island provinces (Tawi-Tawi, Sulu, Basilan) — despite producing 40% of national seaweed and holding direct BIMP-EAGA access — suffer chronic underinvestment. <strong>Success breeds more success</strong>, regardless of merit or need.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">How accurately does this reflect the imbalance between mainland and island provinces?</p>
        <div className="grid grid-cols-2 gap-3">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(opt => (
            <button key={opt} onClick={() => update("q_s6_successful", opt)}
              className={cn("p-3 rounded-lg border text-sm text-left transition-all",
                data.q_s6_successful === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Q6.2: Markets */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Which export markets should BARMM prioritize? (Select all)</h3>
        <div className="space-y-2">
          {["Malaysia (BIMP-EAGA)", "Indonesia (ASEAN)", "UAE/GCC (halal corridor)", "China (BRI linkage)", "Domestic (Philippines)", "Japan/Korea (premium halal)"].map(opt => (
            <button key={opt} onClick={() => toggle(opt)}
              className={cn("w-full p-3 rounded-lg border text-sm text-left transition-all",
                data.q6_2_markets.includes(opt) ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Q6.3: Export Target */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">How realistic is the ₱40 billion export target by 2035?</h3>
        <ScaleButton value={data.q6_3_export_target} onChange={(v) => update("q6_3_export_target", v)} />
        <p className="text-xs text-[#065f46] mt-2 italic">1 = Unrealistic | 5 = Very realistic</p>
      </GlassCard>

      {/* Q6.4: UAE Feasibility */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">How feasible is the UAE-GCC halal corridor partnership?</h3>
        <ScaleButton value={data.q6_4_uae_feasibility} onChange={(v) => update("q6_4_uae_feasibility", v)} />
        <p className="text-xs text-[#065f46] mt-2 italic">1 = Not feasible | 5 = Very feasible</p>
      </GlassCard>

      {/* Q6.5: Perception */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">What is the biggest perception barrier BARMM faces with external investors?</h3>
        <div className="grid grid-cols-2 gap-3">
          {["Security concerns", "Lack of awareness", "Competition from other regions", "Regulatory uncertainty", "Infrastructure gaps", "Cultural misunderstanding"].map(opt => (
            <button key={opt} onClick={() => update("q6_5_perception", opt)}
              className={cn("p-3 rounded-lg border text-sm text-left transition-all",
                data.q6_5_perception === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Section6_Connectors;