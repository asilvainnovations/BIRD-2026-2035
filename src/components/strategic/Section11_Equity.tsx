import React from "react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { cn } from "@/lib/utils";
import { Scale, AlertTriangle } from "lucide-react";

export interface Section11Data {
  q11_1_affirmative: string;
  q11_2_mechanisms: string[];
  // ── SWOT Scale: Equity-focused ───────────────────────────────────────────
  q_s11_poverty_impact?: number;
  q_s11_poverty_likelihood?: number;
  // ── Systems Mapping: Success to the Successful ───────────────────────────
  q_s11_successful: string;
}

interface Section11Props {
  data: Section11Data;
  onChange: (data: Section11Data) => void;
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

const Section11_Equity: React.FC<Section11Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section11Data>(field: K, value: Section11Data[K]) => onChange({ ...data, [field]: value });
  const toggle = (val: string) => update("q11_2_mechanisms", data.q11_2_mechanisms.includes(val) ? data.q11_2_mechanisms.filter(v => v !== val) : [...data.q11_2_mechanisms, val]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Scale className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 11: Provincial Equity &amp; Policy</h2>
      </div>

      <p className="text-sm text-[#065f46] mb-4">
        Inclusive development requires deliberate mechanisms to address historical inequities, geographic disadvantages, and conflict legacies across all seven BARMM provinces.
      </p>

      {/* Policy Recommendations Image */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.policyRecommendations.url} alt={BIRD_IMAGES.policyRecommendations.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.policyRecommendations.title}</p>
        </div>
      </div>

      {/* SWOT Scale: Poverty */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700">WEAKNESS</span>
          <h3 className="text-base font-semibold text-[#022c22]">Poverty Incidence as Equity Constraint</h3>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate: Impact (1–5) × Likelihood (1–5)
        </p>
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Highest Poverty Incidence.</strong> At 34.8%, poverty limits domestic market depth, shrinks consumer demand, and constrains the very tax base needed to fund development — highest in Sulu (39.5%) and Basilan (33.7%).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><p className="text-xs text-[#065f46] mb-2">Impact on equity (1–5)</p><ScaleButton value={data.q_s11_poverty_impact} onChange={(v) => update("q_s11_poverty_impact", v)} /></div>
            <div><p className="text-xs text-[#065f46] mb-2">Likelihood to persist (1–5)</p><ScaleButton value={data.q_s11_poverty_likelihood} onChange={(v) => update("q_s11_poverty_likelihood", v)} /></div>
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
          Mainland provinces attract the bulk of resources due to larger economies and stronger infrastructure. Island provinces — despite significant comparative advantages — suffer chronic underinvestment, widening regional inequality and undermining inclusive development.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">How accurately does this reflect investment distribution in BARMM?</p>
        <div className="grid grid-cols-2 gap-3">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(opt => (
            <button key={opt} onClick={() => update("q_s11_successful", opt)}
              className={cn("p-3 rounded-lg border text-sm text-left transition-all",
                data.q_s11_successful === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Q11.1: Affirmative */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Should BARMM adopt affirmative investment quotas for lagging provinces?</h3>
        <div className="grid grid-cols-2 gap-3">
          {["Yes — essential for equity", "Yes — but flexible targets", "No — merit-based only", "No — market forces suffice"].map(opt => (
            <button key={opt} onClick={() => update("q11_1_affirmative", opt)}
              className={cn("p-3 rounded-lg border text-sm text-left transition-all",
                data.q11_1_affirmative === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Q11.2: Mechanisms */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Which equity mechanisms should be prioritized? (Select all)</h3>
        <div className="space-y-2">
          {["Provincial development funds", "Inter-provincial revenue sharing", "Conflict-sensitive investment screening", "Gender-responsive budgeting", "Youth employment quotas", "MSME set-asides for island provinces"].map(opt => (
            <button key={opt} onClick={() => toggle(opt)}
              className={cn("w-full p-3 rounded-lg border text-sm text-left transition-all",
                data.q11_2_mechanisms.includes(opt) ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Regulatory Architecture */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.regulatoryArchitecture.url} alt={BIRD_IMAGES.regulatoryArchitecture.alt}
          className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.regulatoryArchitecture.title}</p>
        </div>
      </div>

      {/* Draft JMC */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.draftJMC.url} alt={BIRD_IMAGES.draftJMC.alt}
          className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.draftJMC.title}</p>
        </div>
      </div>

      {/* Core Policy Mandates */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.corePolicyMandates.url} alt={BIRD_IMAGES.corePolicyMandates.alt}
          className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.corePolicyMandates.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Section11_Equity;