import React from "react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { GlassCard } from "@/components/GlassCard";
import { cn } from "@/lib/utils";
import { Landmark, AlertTriangle, Lightbulb, MessageSquare } from "lucide-react";

export interface Section7Data {
  q7_1_criticality?: number;
  q7_2_instruments: string[];
  q7_3_inclusion_target?: number;
  q7_4_asset_paradox: string;
  q7_5_block_grant: string;
  // ── SWOT Scale: Islamic Finance Opportunity ──────────────────────────────
  q_s7_islamic_finance_impact?: number;
  q_s7_islamic_finance_likelihood?: number;
  // ── Systems Mapping: All Archetypes ──────────────────────────────────────
  q_s7_capacity_traps: string;
  q_s7_shifting_burden: string;
  q_s7_tragedy_commons: string;
  // ── Word Cloud ───────────────────────────────────────────────────────────
  q_s7_wordcloud: string;
}

interface Section7Props {
  data: Section7Data;
  onChange: (data: Section7Data) => void;
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

const ArchetypeButton: React.FC<{ selected: boolean; label: string; onClick: () => void }> = ({ selected, label, onClick }) => (
  <button onClick={onClick}
    className={cn("p-3 rounded-lg border text-sm text-left transition-all",
      selected ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{label}</button>
);

const Section7_Financiers: React.FC<Section7Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section7Data>(field: K, value: Section7Data[K]) => onChange({ ...data, [field]: value });
  const toggle = (val: string) => update("q7_2_instruments", data.q7_2_instruments.includes(val) ? data.q7_2_instruments.filter(v => v !== val) : [...data.q7_2_instruments, val]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Landmark className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 7: Cluster 5 — Financiers &amp; Systems Archetypes</h2>
      </div>

      <p className="text-sm text-[#065f46] mb-4">
        The Financiers cluster mobilizes capital through Islamic finance, development funding, and public-private partnerships. This section also presents the complete systems archetypes gallery — identifying traps and leverage points across the entire ecosystem.
      </p>

      {/* Cluster Image */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.cluster5Financiers.url} alt={BIRD_IMAGES.cluster5Financiers.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: {BIRD_IMAGES.cluster5Financiers.title}</p>
        </div>
      </div>

      {/* Q7.1: Criticality */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">How critical is Islamic finance to BARMM's capital ecosystem?</h3>
        <ScaleButton value={data.q7_1_criticality} onChange={(v) => update("q7_1_criticality", v)} />
        <p className="text-xs text-[#065f46] mt-2 italic">1 = Not critical | 5 = Essential</p>
      </GlassCard>

      {/* SWOT Scale: Islamic Finance Opportunity */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">OPPORTUNITY</span>
          <h3 className="text-base font-semibold text-[#022c22]">Islamic Finance Ecosystem Growth</h3>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate: Impact (1–5) × Likelihood (1–5)
        </p>
        <div className="space-y-3">
          <p className="text-sm font-medium text-[#022c22]">
            <strong>Islamic Finance Ecosystem.</strong> Global Shariah-compliant investment funds are growing and seeking ethical destinations. RA 11439 enables Shariah-compliant banking through Al-Amanah and CARD Islamic — opening new paths for capital mobilization.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p><ScaleButton value={data.q_s7_islamic_finance_impact} onChange={(v) => update("q_s7_islamic_finance_impact", v)} /></div>
            <div><p className="text-xs text-[#065f46] mb-2">Likelihood BARMM captures flow (1–5)</p><ScaleButton value={data.q_s7_islamic_finance_likelihood} onChange={(v) => update("q_s7_islamic_finance_likelihood", v)} /></div>
          </div>
        </div>
      </GlassCard>

      {/* Q7.2: Instruments */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">Which financial instruments should be prioritized? (Select all)</h3>
        <div className="space-y-2">
          {["Sukuk (Islamic bonds)", "Takaful (Islamic insurance)", "Waqf (endowment funds)", "Zakat-based microfinance", "Green bonds", "Conventional blended finance"].map(opt => (
            <button key={opt} onClick={() => toggle(opt)}
              className={cn("w-full p-3 rounded-lg border text-sm text-left transition-all",
                data.q7_2_instruments.includes(opt) ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>

      {/* Q7.3: Inclusion Target */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">How realistic is achieving 60% financial inclusion by 2030?</h3>
        <ScaleButton value={data.q7_3_inclusion_target} onChange={(v) => update("q7_3_inclusion_target", v)} />
        <p className="text-xs text-[#065f46] mt-2 italic">1 = Unrealistic | 5 = Very realistic</p>
      </GlassCard>

      {/* ── Systems Archetypes Gallery ────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-[#022c22]">Systems Archetypes: Traps &amp; Leverage Points</h3>
        </div>
        <p className="text-sm text-[#065f46] mb-6">
          Systems archetypes are recurring patterns of behavior that trap systems in unintended outcomes. For each archetype below, rate how accurately it reflects dynamics in BARMM.
        </p>

        {/* Capacity Traps */}
        <div className="mb-8 pb-8 border-b border-[#C9A84C]/20">
          <h4 className="text-sm font-bold text-[#022c22] mb-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-700">CAPACITY</span>
            Limits to Growth &amp; Growth and Underinvestment
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative rounded-lg overflow-hidden border border-[#C9A84C]/20">
              <img src={BIRD_IMAGES.limitsToGrowthArchetype.url} alt={BIRD_IMAGES.limitsToGrowthArchetype.alt} className="w-full h-auto object-contain" />
            </div>
            <div className="relative rounded-lg overflow-hidden border border-[#C9A84C]/20">
              <img src={BIRD_IMAGES.growthUnderinvestment.url} alt={BIRD_IMAGES.growthUnderinvestment.alt} className="w-full h-auto object-contain" />
            </div>
          </div>
          <p className="text-sm text-[#022c22] mb-3">
            Investment hits infrastructure ceilings (power, literacy, bandwidth) while demand outpaces institutional capacity — creating a stagnation cycle.
          </p>
          <p className="text-xs font-medium text-[#022c22] mb-2">How well do these reflect BARMM's capacity constraints?</p>
          <div className="grid grid-cols-2 gap-2">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(opt => (
              <ArchetypeButton key={opt} label={opt} selected={data.q_s7_capacity_traps === opt} onClick={() => update("q_s7_capacity_traps", opt)} />
            ))}
          </div>
        </div>

        {/* Governance Traps */}
        <div className="mb-8 pb-8 border-b border-[#C9A84C]/20">
          <h4 className="text-sm font-bold text-[#022c22] mb-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-700">GOVERNANCE</span>
            Shifting the Burden &amp; Fixes that Fail
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative rounded-lg overflow-hidden border border-[#C9A84C]/20">
              <img src={BIRD_IMAGES.shiftingTheBurden.url} alt={BIRD_IMAGES.shiftingTheBurden.alt} className="w-full h-auto object-contain" />
            </div>
            <div className="relative rounded-lg overflow-hidden border border-[#C9A84C]/20">
              <img src={BIRD_IMAGES.fixesThatFail.url} alt={BIRD_IMAGES.fixesThatFail.alt} className="w-full h-auto object-contain" />
            </div>
          </div>
          <p className="text-sm text-[#022c22] mb-3">
            Short-term fixes (tax incentives, emergency programs) replace structural reforms. Each cycle erodes capacity and deepens dependency on external support.
          </p>
          <p className="text-xs font-medium text-[#022c22] mb-2">How accurately does Shifting the Burden reflect BARMM?</p>
          <div className="grid grid-cols-2 gap-2">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(opt => (
              <ArchetypeButton key={opt} label={opt} selected={data.q_s7_shifting_burden === opt} onClick={() => update("q_s7_shifting_burden", opt)} />
            ))}
          </div>
        </div>

        {/* Resource & Equity Traps */}
        <div className="mb-8 pb-8 border-b border-[#C9A84C]/20">
          <h4 className="text-sm font-bold text-[#022c22] mb-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-100 text-purple-700">EQUITY</span>
            Success to the Successful &amp; Tragedy of the Commons
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative rounded-lg overflow-hidden border border-[#C9A84C]/20">
              <img src={BIRD_IMAGES.successToTheSuccessful.url} alt={BIRD_IMAGES.successToTheSuccessful.alt} className="w-full h-auto object-contain" />
            </div>
            <div className="relative rounded-lg overflow-hidden border border-[#C9A84C]/20">
              <img src={BIRD_IMAGES.tragedyOfTheCommons.url} alt={BIRD_IMAGES.tragedyOfTheCommons.alt} className="w-full h-auto object-contain" />
            </div>
          </div>
          <p className="text-sm text-[#022c22] mb-3">
            Initial advantages create self-reinforcing inequality (mainland vs. island provinces), while shared resources get over-exploited when governance is fragmented.
          </p>
          <p className="text-xs font-medium text-[#022c22] mb-2">How accurately does Tragedy of the Commons reflect BARMM?</p>
          <div className="grid grid-cols-2 gap-2">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(opt => (
              <ArchetypeButton key={opt} label={opt} selected={data.q_s7_tragedy_commons === opt} onClick={() => update("q_s7_tragedy_commons", opt)} />
            ))}
          </div>
        </div>

        {/* Instability Traps */}
        <div>
          <h4 className="text-sm font-bold text-[#022c22] mb-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-orange-100 text-orange-700">INSTABILITY</span>
            Escalation &amp; The Big Man
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative rounded-lg overflow-hidden border border-[#C9A84C]/20">
              <img src={BIRD_IMAGES.escalation.url} alt={BIRD_IMAGES.escalation.alt} className="w-full h-auto object-contain" />
            </div>
            <div className="relative rounded-lg overflow-hidden border border-[#C9A84C]/20">
              <img src={BIRD_IMAGES.bigManArchetype.url} alt={BIRD_IMAGES.bigManArchetype.alt} className="w-full h-auto object-contain" />
            </div>
          </div>
          <p className="text-sm text-[#022c22] mb-3">
            Competitive spirals between clans/provinces divert resources from development, while concentration of power around dominant leaders creates perpetual instability through patronage, exclusion, and drained resources.
          </p>
        </div>
      </GlassCard>

      {/* Leverage Points */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-bold text-[#022c22]">Leverage Points</h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img src={BIRD_IMAGES.strategicLeveragePoints.url} alt={BIRD_IMAGES.strategicLeveragePoints.alt} className="w-full h-auto object-contain" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative rounded-lg overflow-hidden border border-[#C9A84C]/20">
            <img src={BIRD_IMAGES.howToIdentifyLeveragePoints.url} alt={BIRD_IMAGES.howToIdentifyLeveragePoints.alt} className="w-full h-auto object-contain" />
          </div>
          <div className="relative rounded-lg overflow-hidden border border-[#C9A84C]/20">
            <img src={BIRD_IMAGES.activatingLeveragePoints.url} alt={BIRD_IMAGES.activatingLeveragePoints.alt} className="w-full h-auto object-contain" />
          </div>
        </div>
      </GlassCard>

      {/* Word Cloud Question */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">Why Synchronization Matters — In Your Words</h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img src={BIRD_IMAGES.whySynchronizationMatters.url} alt={BIRD_IMAGES.whySynchronizationMatters.alt} className="w-full h-auto object-contain" />
        </div>
        <p className="text-sm text-[#022c22] mb-3">
          Synchronization — aligning governance, infrastructure, investment, and community readiness — is what separates fragmented effort from transformative change. Share <strong>2–3 phrases</strong> that capture why synchronized development matters for Bangsamoro.
        </p>
        <textarea
          value={data.q_s7_wordcloud}
          onChange={(e) => update("q_s7_wordcloud", e.target.value)}
          placeholder="e.g., 'No road without a destination', 'Build trust before buildings', 'Invest in people first'"
          className="w-full p-4 border border-[#C9A84C]/30 rounded-lg text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 min-h-[100px] resize-y"
        />
        <p className="text-xs text-[#065f46] mt-2 italic">Your phrases will contribute to a live word cloud visualization.</p>
      </GlassCard>

      {/* Q7.4: Asset Paradox */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">How should BARMM resolve the asset paradox — rich in natural resources but poor in financial capital?</h3>
        <textarea value={data.q7_4_asset_paradox} onChange={(e) => update("q7_4_asset_paradox", e.target.value)}
          placeholder="Share your perspective..."
          className="w-full p-4 border border-[#C9A84C]/30 rounded-lg text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 min-h-[80px] resize-y" />
      </GlassCard>

      {/* Q7.5: Block Grant */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">How effectively is the National Government Block Grant being utilized?</h3>
        <div className="grid grid-cols-2 gap-3">
          {["Very effectively", "Somewhat effectively", "Inefficiently", "Cannot assess"].map(opt => (
            <button key={opt} onClick={() => update("q7_5_block_grant", opt)}
              className={cn("p-3 rounded-lg border text-sm text-left transition-all",
                data.q7_5_block_grant === opt ? "bg-[#1B4D3E] text-white border-[#1B4D3E]" : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]")}>{opt}</button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Section7_Financiers;
