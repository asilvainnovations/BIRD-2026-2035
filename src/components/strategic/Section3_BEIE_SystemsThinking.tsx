import React from "react";
import { Network } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Section3Data {
  q3_1_beie_collaboration: string;
  q3_2_beie_understanding: string;
  q3_3_beie_relevance: string;
  q3_4_cluster_position: string;
  q_s1_halal_legitimacy_impact?: number;
  q_s1_halal_legitimacy_likelihood?: number;
  q_s1_bimpeaga_impact?: number;
  q_s1_bimpeaga_likelihood?: number;
  q_s1_aff_base_impact?: number;
  q_s1_aff_base_likelihood?: number;
}

interface Section3Props {
  data: Section3Data;
  onChange: (data: Section3Data) => void;
}

const GlassCard: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={cn("rounded-xl border border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm p-6", className)} {...props}>
    {children}
  </div>
);

const Section3_BEIE_SystemsThinking: React.FC<Section3Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section3Data>(field: K, value: Section3Data[K]) =>
    onChange({ ...data, [field]: value });

  const understandingOptions = [
    "Very well — I see the interconnected value",
    "Somewhat — I grasp the concept but need clarity on linkages",
    "Familiar with sector-based only — ecosystems are new to me",
    "Not familiar with either approach",
  ];

  const relevanceOptions = [
    "Highly relevant",
    "Moderately relevant",
    "Somewhat relevant",
    "Not relevant",
  ];

  const clusterOptions = [
    "Foundations",
    "Transformers",
    "Enablers",
    "Connectors",
    "Financiers",
    "Multiple clusters",
    "Observer / External partner",
  ];

  const strengthFactors = [
    {
      label: "Halal Legitimacy & Cultural Credibility",
      description:
        "BARMM's authentic Muslim-majority identity provides unmatched credibility for halal branding and global market access.",
      impactField: "q_s1_halal_legitimacy_impact" as keyof Section3Data,
      likelihoodField: "q_s1_halal_legitimacy_likelihood" as keyof Section3Data,
    },
    {
      label: "Strategic BIMP-EAGA Location",
      description:
        "BARMM is close to Sabah and ASEAN trade routes, making it a natural gateway for regional trade.",
      impactField: "q_s1_bimpeaga_impact" as keyof Section3Data,
      likelihoodField: "q_s1_bimpeaga_likelihood" as keyof Section3Data,
    },
    {
      label: "Strong Agriculture, Fisheries, Forestry Base",
      description:
        "Strong resources in rubber, coconut, seaweed, fisheries, halal farm products, and rice.",
      impactField: "q_s1_aff_base_impact" as keyof Section3Data,
      likelihoodField: "q_s1_aff_base_likelihood" as keyof Section3Data,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <Network className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 3: Systems Thinking & BEIE Framework</h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        Before evaluating specific clusters, let's establish the conceptual foundation. The BEIE framework
        shifts from siloed sector planning to an interconnected ecosystem approach.
      </p>

      {/* 1. Video Card */}
      <GlassCard className="!p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-[#022c22]">
            Systems Thinking: Moving from Checklists to Interconnected Investment Ecosystem
          </h3>
          <span className="px-2 py-1 rounded text-xs font-semibold bg-[#C9A84C]/10 text-[#C9A84C]">~4 mins</span>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg aspect-video">
          <iframe
            src="https://www.youtube.com/embed/VBAHk0WYz_c"
            title="Systems Thinking: Moving from Checklists to Interconnected Investment Ecosystem"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="text-sm text-[#065f46] mt-4">
          Discover how BIRD turns fragmented efforts into a unified engine of growth through Systems Thinking,
          Feedback Loops, Causal Loop Diagrams, and Leverage Strategies.
        </p>
      </GlassCard>

      {/* 2. Image: From Sector-Based Planning to BEIE Approach */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          From Sector-Based Planning to BEIE Approach
        </h3>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/From%20Sector-Based%20Planning%20to%20BEIE%20Approach.png"
            alt="From Sector-Based Planning to BEIE Approach"
            className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">From Sector-Based Planning to BEIE Approach</p>
          </div>
        </div>
        <p className="text-sm text-[#065f46] mt-4">
          The image illustrates a mental model shift—from siloed development to an interconnected ecosystem.
          On the left, sector-based planning is reactive and fragmented. On the right, the BEIE approach
          integrates systems thinking: infrastructure is primed first, equity extends across island provinces,
          financing is synchronized through Shariah-compliant instruments, and market access connects to global
          halal and green economies.
        </p>
      </GlassCard>

      {/* 3. BEIE Paradigm Question */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Q3.1 How can stakeholders across government, business, and civil society work together to make
          the BEIE ecosystem approach more actionable in real investment planning?
        </h3>
        <textarea
          value={data.q3_1_beie_collaboration || ""}
          onChange={(e) => update("q3_1_beie_collaboration", e.target.value)}
          placeholder="Write your answer in one to two sentences..."
          rows={3}
          className="w-full rounded-lg border border-[#C9A84C]/30 bg-white px-4 py-3 text-sm text-[#022c22] placeholder:text-[#065f46]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent resize-none"
        />
      </GlassCard>

      {/* 4. BEIE Framework Image */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-3">
          Bangsamoro Economic and Investment Ecosystem (BEIE)
        </h3>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/BEIE%20Framework%20-1%20.png"
            alt="Bangsamoro Economic and Investment Ecosystem (BEIE)"
            className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">Bangsamoro Economic and Investment Ecosystem (BEIE)</p>
          </div>
        </div>
        <p className="text-sm text-[#065f46] mt-4">
          The BEIE presents a circular system powered by Moral Governance at its center. Five interconnected
          components surround it: Foundations (agriculture, forestry, energy), Transformers (industries, halal
          manufacturing), Financiers (Islamic banking, waqf, sukuk), Connectors (trade, tourism, BIMP-EAGA),
          and Enablers (infrastructure, health, education). Together they form a cohesive ecosystem.
        </p>
      </GlassCard>

      {/* 5. BEIE Validation Questions */}
      <GlassCard className="!p-6 space-y-6">
        {/* Q3.2 */}
        <div>
          <h3 className="text-base font-semibold text-[#022c22] mb-3">
            Q3.2 How well do you understand the BEIE ecosystem approach compared to traditional sector-based
            planning?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {understandingOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update("q3_2_beie_understanding", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q3_2_beie_understanding === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Q3.3 */}
        <div>
          <h3 className="text-base font-semibold text-[#022c22] mb-3">
            Q3.3 How relevant is the BEIE framework to real-world investment planning in your province or
            organization?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {relevanceOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => update("q3_3_beie_relevance", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q3_3_beie_relevance === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Q3.4 */}
        <div>
          <h3 className="text-base font-semibold text-[#022c22] mb-3">
            Q3.4 Where does your organization belong in the economic and investment ecosystem?
          </h3>
          <select
            value={data.q3_4_cluster_position || ""}
            onChange={(e) => update("q3_4_cluster_position", e.target.value)}
            className={cn(
              "w-full rounded-lg border bg-white px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent",
              data.q3_4_cluster_position
                ? "border-[#1B4D3E] text-[#022c22]"
                : "border-[#C9A84C]/30 text-[#065f46]/50"
            )}
          >
            <option value="" disabled>
              Select your cluster position...
            </option>
            {clusterOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </GlassCard>

      {/* 6. SWOT Scale: Key Strengths */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
            STRENGTH
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small effect, 5 = very large effect) × Likelihood (1 = very
          unlikely, 5 = very likely)
        </p>
        <div className="space-y-6">
          {strengthFactors.map((factor, idx) => (
            <div
              key={factor.label}
              className={cn(
                "space-y-3",
                idx < strengthFactors.length - 1 && "pb-6 border-b border-[#C9A84C]/20"
              )}
            >
              <p className="text-sm font-medium text-[#022c22]">
                <strong>S{idx + 1}: {factor.label}.</strong> {factor.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        onClick={() => update(factor.impactField, v)}
                        className={cn(
                          "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                          data[factor.impactField] === v
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
                        onClick={() => update(factor.likelihoodField, v)}
                        className={cn(
                          "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                          data[factor.likelihoodField] === v
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
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Section3_BEIE_SystemsThinking;
