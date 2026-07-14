import React from "react";
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-urls";
import { cn } from "@/lib/utils";
import { Play, Shield, TrendingUp, AlertTriangle } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Section2Data {
  q2_1?: number;
  q2_2?: number;
  q2_3_archetype: string;
  q2_4_peace: string[];
  // ── Systems Mapping: Governance Loops ────────────────────────────────────
  q_s2_governance_loops: string;
  // ── SWOT Scale: Threats ──────────────────────────────────────────────────
  q_s2_security_incidents_impact?: number;
  q_s2_security_incidents_likelihood?: number;
  q_s2_political_transition_impact?: number;
  q_s2_political_transition_likelihood?: number;
  // ── Systems Mapping: Instability Traps ───────────────────────────────────
  q_s2_escalation: string;
  q_s2_bigman: string;
}

interface Section2Props {
  data: Section2Data;
  onChange: (data: Section2Data) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const ScaleButton: React.FC<{ value?: number; onChange: (v: number) => void }> = ({ value, onChange }) => (
  <div className="flex gap-2">
    {[1, 2, 3, 4, 5].map((val) => (
      <button
        key={val}
        onClick={() => onChange(val)}
        className={cn(
          "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
          value === val ? "bg-[#C9A84C] text-white border-[#C9A84C]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10"
        )}
      >{val}</button>
    ))}
  </div>
);

const ArchetypeButton: React.FC<{ selected: boolean; label: string; onClick: () => void }> = ({ selected, label, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "p-3 rounded-lg border text-sm text-left transition-all",
      selected ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
    )}
  >{label}</button>
);

// ─── Component ───────────────────────────────────────────────────────────────
const Section2_MoralGov: React.FC<Section2Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section2Data>(field: K, value: Section2Data[K]) => onChange({ ...data, [field]: value });

  const togglePeace = (val: string) => {
    const arr = data.q2_4_peace.includes(val)
      ? data.q2_4_peace.filter((v) => v !== val)
      : [...data.q2_4_peace, val];
    update("q2_4_peace", arr);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 2: Moral Governance Operating System</h2>
      </div>

      <p className="text-sm text-[#065f46] mb-4">
        Moral Governance is the operating system that powers BARMM's investment ecosystem.
        Transparency, accountability, and stability build the trust that attracts and retains capital.
      </p>

      {/* ── Moral Governance Image ────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.operatingSystems.url} alt={BIRD_IMAGES.operatingSystems.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.operatingSystems.title}</p>
        </div>
      </div>

      {/* ── Q2.1: Importance ──────────────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          How important is moral governance (transparency, accountability, stability) to attracting investment in BARMM?
        </h3>
        <ScaleButton value={data.q2_1} onChange={(v) => update("q2_1", v)} />
        <p className="text-xs text-[#065f46] mt-2 italic">1 = Not important at all | 5 = Absolutely critical</p>
      </GlassCard>

      {/* ── Q2.2: Implementation ──────────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          How ready are BARMM institutions to implement moral governance at scale?
        </h3>
        <ScaleButton value={data.q2_2} onChange={(v) => update("q2_2", v)} />
        <p className="text-xs text-[#065f46] mt-2 italic">1 = Not ready | 5 = Fully ready</p>
      </GlassCard>

      {/* ── Systems Mapping: R1 & R2 Loops ────────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">Investment & Governance Reinforcing Loops</h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg mb-4">
          <img src={BIRD_IMAGES.investmentGovernanceCycles.url} alt={BIRD_IMAGES.investmentGovernanceCycles.alt}
            className="w-full h-auto object-contain" />
        </div>
        <p className="text-sm text-[#022c22] mb-4">
          <strong>Loop R1 — Investment–Development:</strong> Investments create jobs and expand markets, attracting more investors.
          <br /><strong>Loop R2 — Governance–Confidence:</strong> Transparent governance builds investor trust, expanding the tax base and improving governance further.
        </p>
        <p className="text-sm font-medium text-[#022c22] mb-3">
          To what extent do these loops accurately reflect how investment and governance reinforce each other in BARMM?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
            <ArchetypeButton key={opt} label={opt} selected={data.q_s2_governance_loops === opt} onClick={() => update("q_s2_governance_loops", opt)} />
          ))}
        </div>
      </GlassCard>

      {/* ── SWOT Scale: Security Threat ───────────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">THREAT</span>
          <h3 className="text-base font-semibold text-[#022c22]">Security & Political Stability Risks</h3>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each threat: Impact (1 = very small damage, 5 = very large damage) × Likelihood (1 = very unlikely, 5 = very likely)
        </p>

        {/* T4: Residual Security Incidents */}
        <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Residual Security Incidents.</strong> Clan conflicts (rido), remnant armed groups, and investor perception risks in some areas deter investment and tourism.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p><ScaleButton value={data.q_s2_security_incidents_impact} onChange={(v) => update("q_s2_security_incidents_impact", v)} /></div>
            <div><p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p><ScaleButton value={data.q_s2_security_incidents_likelihood} onChange={(v) => update("q_s2_security_incidents_likelihood", v)} /></div>
          </div>
        </div>

        {/* T5: Political Transition */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Political Transition Uncertainties.</strong> The first parliamentary elections and possible leadership changes create uncertainty about governance continuity and policy stability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p><ScaleButton value={data.q_s2_political_transition_impact} onChange={(v) => update("q_s2_political_transition_impact", v)} /></div>
            <div><p className="text-xs text-[#065f46] mb-2">Likelihood (1–5)</p><ScaleButton value={data.q_s2_political_transition_likelihood} onChange={(v) => update("q_s2_political_transition_likelihood", v)} /></div>
          </div>
        </div>
      </GlassCard>

      {/* ── Systems Mapping: Instability Traps ────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-semibold text-[#022c22]">Instability Traps</h3>
        </div>

        {/* Escalation */}
        <div className="mb-6 pb-6 border-b border-[#C9A84C]/20">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
            <img src={BIRD_IMAGES.escalation.url} alt={BIRD_IMAGES.escalation.alt} className="w-full h-auto object-contain" />
          </div>
          <p className="text-sm text-[#022c22] mb-3">
            The <strong>Escalation</strong> archetype shows how competitive spirals — between clans, provinces, or agencies — divert resources from development to contestation, degrading the investment climate. Both sides end up worse off, but neither can de-escalate without appearing weak.
          </p>
          <p className="text-sm font-medium text-[#022c22] mb-3">How accurately does this reflect competitive dynamics in BARMM?</p>
          <div className="grid grid-cols-2 gap-3">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
              <ArchetypeButton key={opt} label={opt} selected={data.q_s2_escalation === opt} onClick={() => update("q_s2_escalation", opt)} />
            ))}
          </div>
        </div>

        {/* Big Man */}
        <div>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
            <img src={BIRD_IMAGES.bigManArchetype.url} alt={BIRD_IMAGES.bigManArchetype.alt} className="w-full h-auto object-contain" />
          </div>
          <p className="text-sm text-[#022c22] mb-3">
            The <strong>"Big Man"</strong> archetype reveals how concentration of power around dominant leaders creates three reinforcing loops: patronage eroding governance, exclusion fueling conflict, and patronage draining development resources — trapping the region in perpetual instability.
          </p>
          <p className="text-sm font-medium text-[#022c22] mb-3">How accurately does this reflect political and clan dynamics in BARMM?</p>
          <div className="grid grid-cols-2 gap-3">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
              <ArchetypeButton key={opt} label={opt} selected={data.q_s2_bigman === opt} onClick={() => update("q_s2_bigman", opt)} />
            ))}
          </div>
        </div>
      </GlassCard>

      {/* ── Q2.3: Archetype ───────────────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Which systems archetype most threatens BARMM's governance stability?
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {["Shifting the Burden", "Fixes that Fail", "Success to the Successful", "Tragedy of the Commons", "Escalation", "The Big Man"].map((opt) => (
            <ArchetypeButton key={opt} label={opt} selected={data.q2_3_archetype === opt} onClick={() => update("q2_3_archetype", opt)} />
          ))}
        </div>
      </GlassCard>

      {/* ── Q2.4: Peace Milestones ────────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Which peace and normalization milestones have most improved investor confidence? (Select all)
        </h3>
        <div className="space-y-2">
          {["ASG-free Basilan (2024)", "Marawi MAA recovery", "BOL implementation", "MILF transition to governance", "Inter-clan peace compacts", "BIMP-EAGA normalization"].map((opt) => (
            <button key={opt} onClick={() => togglePeace(opt)}
              className={cn("w-full p-3 rounded-lg border text-sm text-left transition-all",
                data.q2_4_peace.includes(opt) ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>
              {opt}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* ── How Moral Governance De-Risks Capital ─────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.moralGovernanceDeRisks.url} alt={BIRD_IMAGES.moralGovernanceDeRisks.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.moralGovernanceDeRisks.title}</p>
        </div>
      </div>

      {/* ── Video: SWOT & Systems Mapping ─────────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-3 mb-4">
          <Play className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-bold text-[#022c22]">{BIRD_VIDEOS.swotSystemsMapping.title}</h3>
        </div>
        <p className="text-sm text-[#065f46] mb-4">{BIRD_VIDEOS.swotSystemsMapping.description}</p>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg aspect-video">
          <iframe src={BIRD_VIDEOS.swotSystemsMapping.embedUrl} title={BIRD_VIDEOS.swotSystemsMapping.title}
            className="w-full h-full" allowFullScreen />
        </div>
      </GlassCard>

      {/* ── Five Clusters ─────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.fiveClusters.url} alt={BIRD_IMAGES.fiveClusters.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.fiveClusters.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Section2_MoralGov;