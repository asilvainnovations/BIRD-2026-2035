import React from "react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { cn } from "@/lib/utils";
import { Gavel, AlertTriangle } from "lucide-react";

export interface Section13Data {
  q13_1_legislation: string[];
  q13_2_bicc?: number;
  // ── Systems Mapping: Governance Traps ────────────────────────────────────
  q_s13_shifting_burden: string;
  q_s13_drifting_goals: string;
}

interface Section13Props {
  data: Section13Data;
  onChange: (data: Section13Data) => void;
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

const Section13_Policy: React.FC<Section13Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section13Data>(field: K, value: Section13Data[K]) => onChange({ ...data, [field]: value });
  const toggle = (val: string) => update("q13_1_legislation", data.q13_1_legislation.includes(val) ? data.q13_1_legislation.filter(v => v !== val) : [...data.q13_1_legislation, val]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Gavel className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 13: Policy &amp; Governance Architecture</h2>
      </div>

      <p className="text-sm text-[#065f46] mb-4">
        Effective policy architecture is what separates plans from results. This section validates the regulatory framework and identifies governance traps that undermine implementation.
      </p>

      {/* Q13.1: Legislation */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Which legislative priorities should be fast-tracked? (Select all)</h3>
        <div className="space-y-2">
          {["Bangsamoro Investment Code", "Islamic Banking Act expansion", "Carbon credit framework", "Data privacy & cybersecurity", "Public-private partnership law", "Special economic zone authority"].map(opt => (
            <button key={opt} onClick={() => toggle(opt)}
              className={cn("w-full p-3 rounded-lg border text-sm text-left transition-all",
                data.q13_1_legislation.includes(opt) ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Q13.2: BICC */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">How important is a Bangsamoro Investment Coordinating Council (BICC) for streamlining approvals?</h3>
        <ScaleButton value={data.q13_2_bicc} onChange={(v) => update("q13_2_bicc", v)} />
        <p className="text-xs text-[#065f46] mt-2 italic">1 = Not important | 5 = Essential</p>
      </GlassCard>

      {/* Systems Mapping: Shifting the Burden */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">Governance Trap: Shifting the Burden</h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img src={BIRD_IMAGES.shiftingTheBurden.url} alt={BIRD_IMAGES.shiftingTheBurden.alt} className="w-full h-auto object-contain" />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          Short-term interventions (emergency relief, ad hoc incentives, one-off projects) replace deeper reforms rather than support them. Each quick fix temporarily reduces visible problems, easing pressure for long-term reform. Root causes remain, symptoms reappear, and dependency on external support deepens.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">How accurately does this reflect BARMM's approach to governance challenges?</p>
        <div className="grid grid-cols-2 gap-3">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(opt => (
            <button key={opt} onClick={() => update("q_s13_shifting_burden", opt)}
              className={cn("p-3 rounded-lg border text-sm text-left transition-all",
                data.q_s13_shifting_burden === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Systems Mapping: Drifting Goals */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">Governance Trap: Drifting Goals</h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img src={BIRD_IMAGES.driftingGoals.url} alt={BIRD_IMAGES.driftingGoals.alt} className="w-full h-auto object-contain" />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          When performance consistently falls below targets, the temptation is to lower the targets rather than address root causes. Over time, goals drift downward — investment targets shrink, poverty reduction benchmarks relax, and the entire system accommodates underperformance rather than confronting it.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">How accurately does this reflect goal-setting dynamics in BARMM?</p>
        <div className="grid grid-cols-2 gap-3">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(opt => (
            <button key={opt} onClick={() => update("q_s13_drifting_goals", opt)}
              className={cn("p-3 rounded-lg border text-sm text-left transition-all",
                data.q_s13_drifting_goals === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Section13_Policy;