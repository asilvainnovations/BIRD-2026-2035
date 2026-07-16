import React from "react";
import { cn } from "@/lib/utils";
import {
  Zap,
  Wifi,
  Route,
  GraduationCap,
  HeartPulse,
  Sun,
  Plane,
  Monitor,
  Shield,
  AlertTriangle,
  TrendingUp,
  ArrowUpDown,
} from "lucide-react";

// ── Types ───────────────────────────────────────────────────────────

export interface Section6Data {
  // SWOT Scales — Strengths
  q_s6_youth_pop_impact?: number;
  q_s6_youth_pop_likelihood?: number;
  q_s6_renewable_energy_impact?: number;
  q_s6_renewable_energy_likelihood?: number;
  q_s6_polloc_impact?: number;
  q_s6_polloc_likelihood?: number;
  // SWOT Scales — Weaknesses
  q_s6_infra_deficits_impact?: number;
  q_s6_infra_deficits_likelihood?: number;
  q_s6_literacy_impact?: number;
  q_s6_literacy_likelihood?: number;
  q_s6_skills_mismatch_impact?: number;
  q_s6_skills_mismatch_likelihood?: number;
  q_s6_tech_adoption_impact?: number;
  q_s6_tech_adoption_likelihood?: number;
  // SWOT Scales — Opportunities
  q_s6_renewable_invest_impact?: number;
  q_s6_renewable_invest_likelihood?: number;
  q_s6_tourism_potential_impact?: number;
  q_s6_tourism_potential_likelihood?: number;
  // SWOT Scales — Threats
  q_s6_political_transition_impact?: number;
  q_s6_political_transition_likelihood?: number;
  q_s6_cost_overruns_impact?: number;
  q_s6_cost_overruns_likelihood?: number;
  q_s6_natl_coord_impact?: number;
  q_s6_natl_coord_likelihood?: number;
  // Archetypes
  q_s6_shifting_burden: string;
  q_s6_shifting_followup: string;
  q_s6_growth_underinvest: string;
  q_s6_growth_followup: string;
  // Contextual questions
  q6_1_halal_sector_rank: string;
  q6_2_sequencing_effectiveness?: number;
  q6_3_begmp_confidence?: number;
  q6_4_tourism_confidence?: number;
  q6_5_digital_tourism_rank: string[];
  q6_6_moral_governance_realistic: string;
}

interface Section6Props {
  data: Section6Data;
  onChange: (data: Section6Data) => void;
}

// ── GlassCard helper ────────────────────────────────────────────────

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

// ── SWOT Factor component ───────────────────────────────────────────

interface SwotFactorProps {
  label: string;
  code: string;
  description: string;
  impactField: keyof Section6Data;
  likelihoodField: keyof Section6Data;
  data: Section6Data;
  update: <K extends keyof Section6Data>(field: K, value: Section6Data[K]) => void;
}

const SwotFactor: React.FC<SwotFactorProps> = ({
  label,
  code,
  description,
  impactField,
  likelihoodField,
  data,
  update,
}) => (
  <div className="space-y-3 mb-6 pb-6 border-b border-[#C9A84C]/20 last:mb-0 last:pb-0 last:border-b-0">
    <p className="text-sm font-medium text-[#022c22]">
      <strong>
        {code}: {label}.
      </strong>{" "}
      {description}
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-xs text-[#065f46] mb-2">Impact (1–5)</p>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => update(impactField, v as any)}
              className={cn(
                "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                data[impactField] === v
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
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => update(likelihoodField, v as any)}
              className={cn(
                "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                data[likelihoodField] === v
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
);

// ── Archetype component ─────────────────────────────────────────────

interface ArchetypeProps {
  icon: React.ReactNode;
  name: string;
  imageUrl?: string;
  imageAlt?: string;
  description: string;
  question: string;
  field: keyof Section6Data;
  followupField: keyof Section6Data;
  followupPrompt: string;
  data: Section6Data;
  update: <K extends keyof Section6Data>(field: K, value: Section6Data[K]) => void;
}

const ArchetypeCard: React.FC<ArchetypeProps> = ({
  icon,
  name,
  imageUrl,
  imageAlt,
  description,
  question,
  field,
  followupField,
  followupPrompt,
  data,
  update,
}) => {
  const selected = data[field] as string;
  const showFollowup = selected === "Very accurately" || selected === "Somewhat accurately";

  return (
    <GlassCard className="!p-6">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-base font-semibold text-[#022c22]">Archetype: {name}</h3>
      </div>
      {imageUrl && (
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
          <img
            src={imageUrl}
            alt={imageAlt || name}
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
      )}
      <p className="text-sm text-[#022c22] mb-4">{description}</p>
      <p className="text-sm font-medium text-[#022c22] mb-3">{question}</p>
      <div className="grid grid-cols-2 gap-3">
        {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map(
          (opt) => (
            <button
              key={opt}
              onClick={() => update(field, opt as any)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                selected === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          )
        )}
      </div>
      {showFollowup && (
        <div className="mt-4">
          <p className="text-sm font-medium text-[#022c22] mb-2">{followupPrompt}</p>
          <textarea
            value={(data[followupField] as string) || ""}
            onChange={(e) => update(followupField, e.target.value as any)}
            className="w-full rounded-lg border border-[#C9A84C]/30 bg-white p-3 text-sm text-[#022c22] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] min-h-[80px] resize-y"
            placeholder="Type your response here..."
          />
        </div>
      )}
    </GlassCard>
  );
};

// ── Image Card component ────────────────────────────────────────────

interface ImageCardProps {
  imageUrl: string;
  caption: string;
  description: string;
  children?: React.ReactNode;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, caption, description, children }) => (
  <GlassCard className="!p-6">
    <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4 group">
      <img
        src={imageUrl}
        alt={caption}
        className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
        <p className="text-xs italic text-white/70">{caption}</p>
      </div>
    </div>
    <p className="text-sm text-[#022c22] mb-4">{description}</p>
    {children}
  </GlassCard>
);

// ── Main Component ──────────────────────────────────────────────────

const Section6_Enablers: React.FC<Section6Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section6Data>(field: K, value: Section6Data[K]) =>
    onChange({ ...data, [field]: value });

  const toggle = (field: keyof Section6Data, val: string) => {
    const arr = (data[field] as string[] | undefined) || [];
    update(field, arr.includes(val)
      ? arr.filter((v) => v !== val)
      : [...arr, val]
    );
  };

  // ── Enablers context data ────────────────────────────────────────
  const enablers = [
    {
      icon: <Wifi className="w-5 h-5 text-[#C9A84C]" />,
      title: "Digital Connectivity",
      desc: "Expanding broadband, e-governance, and cybersecurity to accelerate investment facilitation",
    },
    {
      icon: <Route className="w-5 h-5 text-[#C9A84C]" />,
      title: "Physical Infrastructure",
      desc: "Improving ports, airports, and cold-chain logistics to reduce post-harvest losses and support halal integrity",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-[#C9A84C]" />,
      title: "Education & Skills",
      desc: "Aligning TESDA programs with industry needs to close the 59.3% literacy and skills gap",
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-[#C9A84C]" />,
      title: "Health & Social Protection",
      desc: "Ensuring workforce resilience through accessible healthcare and social safety nets",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Cluster 3 — Enablers: Constructing the Support Architecture
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        The Enablers cluster forms the backbone that supports industrialization and inclusive growth
        across Bangsamoro — from broadband to cold-chain logistics.
      </p>

      {/* ── Cluster Image ─────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%203%20Enablers.png"
          alt="Cluster 3 Enablers"
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            Cluster 3 | Enablers: Constructing the Support Architecture
          </p>
        </div>
      </div>

      {/* ── Context Card ──────────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <h3 className="text-base font-semibold text-[#022c22] mb-4">
          Four Enablers for Bangsamoro Development
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enablers.map((e) => (
            <div
              key={e.title}
              className="flex items-start gap-3 p-4 rounded-lg border border-[#C9A84C]/20 bg-white/60"
            >
              <div className="mt-0.5 shrink-0">{e.icon}</div>
              <div>
                <p className="text-sm font-semibold text-[#022c22]">{e.title}</p>
                <p className="text-xs text-[#065f46]">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* ── SWOT: Strengths ───────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
            STRENGTH
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely,
          5 = very likely)
        </p>
        <SwotFactor
          label="Young and Growing Population"
          code="S5"
          description="BARMM's population grows at 3.43% per year (highest in PH), creating a large future workforce and consumer base."
          impactField="q_s6_youth_pop_impact"
          likelihoodField="q_s6_youth_pop_likelihood"
          data={data}
          update={update}
        />
        <SwotFactor
          label="Renewable Energy Potential"
          code="S8"
          description="Untapped hydro (Lake Lanao), solar, and biomass resources can attract clean energy investments."
          impactField="q_s6_renewable_energy_impact"
          likelihoodField="q_s6_renewable_energy_likelihood"
          data={data}
          update={update}
        />
        <SwotFactor
          label="Polloc Freeport & Economic Zone"
          code="S6"
          description="Strategic logistics and trade hub in Maguindanao del Norte serving as a gateway for goods entering and leaving BARMM."
          impactField="q_s6_polloc_impact"
          likelihoodField="q_s6_polloc_likelihood"
          data={data}
          update={update}
        />
      </GlassCard>

      {/* ── SWOT: Weaknesses ──────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700">
            WEAKNESS
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely,
          5 = very likely)
        </p>
        <SwotFactor
          label="Critical Infrastructure Deficits"
          code="W1"
          description="Gaps in energy, roads, digital connectivity, and water supply make it hard for businesses to operate, especially in island provinces."
          impactField="q_s6_infra_deficits_impact"
          likelihoodField="q_s6_infra_deficits_likelihood"
          data={data}
          update={update}
        />
        <SwotFactor
          label="Low Functional Literacy Rate"
          code="W4"
          description="At 59.3%, BARMM has the lowest literacy rate in the country, creating a serious shortage of skilled workers."
          impactField="q_s6_literacy_impact"
          likelihoodField="q_s6_literacy_likelihood"
          data={data}
          update={update}
        />
        <SwotFactor
          label="Skills Mismatch"
          code="W8"
          description="TVIs not aligned with industry needs — especially in halal manufacturing and modern agriculture."
          impactField="q_s6_skills_mismatch_impact"
          likelihoodField="q_s6_skills_mismatch_likelihood"
          data={data}
          update={update}
        />
        <SwotFactor
          label="Low Technology Adoption"
          code="W10"
          description="Many farms and businesses still use old methods, with slow uptake of modern tools."
          impactField="q_s6_tech_adoption_impact"
          likelihoodField="q_s6_tech_adoption_likelihood"
          data={data}
          update={update}
        />
      </GlassCard>

      {/* ── SWOT: Opportunities ───────────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
            OPPORTUNITY
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely,
          5 = very likely)
        </p>
        <SwotFactor
          label="Renewable Energy Investment Opportunities"
          code="O2"
          description="Growing interest in solar farms, hydro rehab, and biomass projects aligning with clean energy potential."
          impactField="q_s6_renewable_invest_impact"
          likelihoodField="q_s6_renewable_invest_likelihood"
          data={data}
          update={update}
        />
        <SwotFactor
          label="Tourism Recovery Potential"
          code="O11"
          description="Isabela City named Tourism Champion 2024; Lake Lanao has untapped eco-tourism potential."
          impactField="q_s6_tourism_potential_impact"
          likelihoodField="q_s6_tourism_potential_likelihood"
          data={data}
          update={update}
        />
      </GlassCard>

      {/* ── SWOT: Threats ─────────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
            THREAT
          </span>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely,
          5 = very likely)
        </p>
        <SwotFactor
          label="Political Transition Uncertainties"
          code="T5"
          description="First parliamentary elections and possible leadership changes create uncertainty about governance continuity."
          impactField="q_s6_political_transition_impact"
          likelihoodField="q_s6_political_transition_likelihood"
          data={data}
          update={update}
        />
        <SwotFactor
          label="Infrastructure Cost Overruns"
          code="T6"
          description="Delays and budget increases in major projects discourage investors and slow build-out."
          impactField="q_s6_cost_overruns_impact"
          likelihoodField="q_s6_cost_overruns_likelihood"
          data={data}
          update={update}
        />
        <SwotFactor
          label="Limited National Government Coordination"
          code="T8"
          description="Gaps in funding and alignment with national programs leave BARMM provinces behind."
          impactField="q_s6_natl_coord_impact"
          likelihoodField="q_s6_natl_coord_likelihood"
          data={data}
          update={update}
        />
      </GlassCard>

      {/* ── Archetype: Shifting the Burden ────────────────────────── */}
      <ArchetypeCard
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        name="Shifting the Burden"
        imageUrl="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Shifting%20the%20Burden%20Archetype.png"
        imageAlt="Shifting the Burden Archetype"
        description="Short-term interventions like emergency relief and ad hoc incentives replace deeper structural reforms. The system becomes dependent on external fixes while local institutional capacity weakens."
        question="How accurately does 'Shifting the Burden' reflect how BARMM addresses infrastructure, education, and digital connectivity challenges?"
        field="q_s6_shifting_burden"
        followupField="q_s6_shifting_followup"
        followupPrompt="Describe a case where a short-term fix either led to reform or failed and the problem returned."
        data={data}
        update={update}
      />

      {/* ── Archetype: Growth and Underinvestment ─────────────────── */}
      <ArchetypeCard
        icon={<TrendingUp className="w-5 h-5 text-amber-600" />}
        name="Growth and Underinvestment"
        description="Growth in investment and population increases demand for education, infrastructure, and services. But chronic underinvestment creates bottlenecks that slow further growth — a classic capacity trap."
        question="How accurately does 'Growth and Underinvestment' describe the gap between BARMM's growing economy and its lagging education and infrastructure systems?"
        field="q_s6_growth_underinvest"
        followupField="q_s6_growth_followup"
        followupPrompt="Which sector — education, energy, or digital — suffers most from chronic underinvestment?"
        data={data}
        update={update}
      />

      {/* ── Capitalizing Cultural Advantage ───────────────────────── */}
      <ImageCard
        imageUrl="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Capitalizing%20Cultural%20Advantage%20-%20Halal%20Industry%20Adv.png"
        caption="The Halal Industry Advantage"
        description="Three key sectors: Halal Food & Beverage (coconut-based by-products), Halal Cosmetics (beauty for Muslim consumers), Halal Pharmaceuticals (compliant medicine). The BIMP-EAGA trade corridor connects Bangsamoro to a large regional Muslim population."
      >
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Rank which halal sector offers the greatest growth potential for Bangsamoro&apos;s ASEAN market
          integration.
        </p>
        <div className="grid grid-cols-1 gap-2">
          {["Halal Food & Beverage", "Halal Cosmetics", "Halal Pharmaceuticals"].map(
            (opt, idx) => (
              <button
                key={opt}
                onClick={() => update("q6_1_halal_sector_rank", opt)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border text-sm text-left transition-all",
                  data.q6_1_halal_sector_rank === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0",
                    data.q6_1_halal_sector_rank === opt
                      ? "bg-white/20 text-white"
                      : "bg-[#C9A84C]/10 text-[#C9A84C]"
                  )}
                >
                  {idx + 1}
                </span>
                {opt}
              </button>
            )
          )}
        </div>
      </ImageCard>

      {/* ── The Enabling Grid ─────────────────────────────────────── */}
      <ImageCard
        imageUrl="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%202%20-%20The%20Enabling%20Grid%20and%20Lawof%20Sequencing.png"
        caption="The Enabling Grid & The Law of Sequencing"
        description="Four sequential stages: Energy Priming (connecting islands to Mindanao grid), Physical Mobility (bridges and transport), Logistics Integrity (cold-storage and warehousing), Industrial Scaling (agro-industrial expansion). Infrastructure readiness must precede industrial scaling."
      >
        <p className="text-sm font-medium text-[#022c22] mb-3">
          On a scale of 1 to 5, how effectively does Bangsamoro&apos;s current infrastructure sequencing
          support future industrial expansion?
        </p>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => update("q6_2_sequencing_effectiveness", v)}
              className={cn(
                "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                data.q6_2_sequencing_effectiveness === v
                  ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </ImageCard>

      {/* ── Digital Transformation Plan ───────────────────────────── */}
      <ImageCard
        imageUrl="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Digital%20Transformation%20Master%20Plan.png"
        caption="Digital Transformation (BEGMP)"
        description="Roadmap bridging the digital divide: Broadband & Connectivity (data centers, last-mile hubs), Smart Cities (public safety, command centers), E-Government (digital identities, shared services), Cybersecurity (data protection, secure transactions)."
      >
        <p className="text-sm font-medium text-[#022c22] mb-3">
          On a scale of 1 to 5, how confident are you that the BEGMP roadmap will effectively bridge
          Bangsamoro&apos;s digital divide?
        </p>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => update("q6_3_begmp_confidence", v)}
              className={cn(
                "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                data.q6_3_begmp_confidence === v
                  ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </ImageCard>

      {/* ── Tourism Master Plan ───────────────────────────────────── */}
      <ImageCard
        imageUrl="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20Master%20Plan.png"
        caption="Tourism Master Plan (BTDP 2024–2033)"
        description="Three phases: Organizing (2025–2026), Stabilizing (2027–2028), Institutionalizing (2029–2033). ₱161.97B funded with 93% allocated to physical access and connectivity."
      >
        <p className="text-sm font-medium text-[#022c22] mb-3">
          On a scale of 1 to 5, how confident are you that prioritizing infrastructure will make
          Bangsamoro globally competitive in tourism by 2033?
        </p>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              onClick={() => update("q6_4_tourism_confidence", v)}
              className={cn(
                "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                data.q6_4_tourism_confidence === v
                  ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </ImageCard>

      {/* ── Tourism and Digital Connectivity ──────────────────────── */}
      <ImageCard
        imageUrl="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20and%20Digital%20Connectivity.png"
        caption="Reinforcing Loop II: Digital Infrastructure & Smart Tourism"
        description="Digital infrastructure enables tourism (₱161.97B BTDP investment), which fuels broader economic development. The BEGMP digital backbone (broadband, smart cities, e-government, cybersecurity) supports tourism and regional growth."
      >
        <p className="text-sm font-medium text-[#022c22] mb-3">
          Rank these components by importance to tourism. Select in order of priority (click to
          toggle):
        </p>
        <div className="grid grid-cols-1 gap-2">
          {["Broadband", "Smart Cities", "E-Government", "Cybersecurity"].map((opt) => {
            const idx = data.q6_5_digital_tourism_rank.indexOf(opt);
            const isSelected = idx !== -1;
            return (
              <button
                key={opt}
                onClick={() => toggle("q6_5_digital_tourism_rank", opt)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border text-sm text-left transition-all",
                  isSelected
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {isSelected && (
                  <span className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold bg-white/20 text-white shrink-0">
                    {idx + 1}
                  </span>
                )}
                {!isSelected && (
                  <ArrowUpDown className="w-5 h-5 text-[#C9A84C] shrink-0" />
                )}
                {opt}
              </button>
            );
          })}
        </div>
        {data.q6_5_digital_tourism_rank.length > 0 && (
          <p className="text-xs text-[#065f46] mt-2 italic">
            Selected order: {data.q6_5_digital_tourism_rank.join(" → ")}
          </p>
        )}
      </ImageCard>

      {/* ── Activating the Enablers ───────────────────────────────── */}
      <ImageCard
        imageUrl="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Activating%20the%20Enablers%20-%20Infra%20Primed%20by%20Moral%20Governance.png"
        caption="Activating the Enablers: Infrastructure Primed by Moral Governance"
        description="Moral Governance as the operating system powering physical development: Transparency, Accountability, Stability form the governance core. Physical backbones: 100% Electrification through renewables, 85% Broadband by 2035, 30% Logistics Cost Reduction via improved inter-island routes."
      >
        <p className="text-sm font-medium text-[#022c22] mb-3">
          How realistic is it that Moral Governance can effectively deliver these physical enablers
          in BARMM?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Very realistic",
            "Somewhat realistic",
            "Needs stronger institutional support",
            "Not realistic",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => update("q6_6_moral_governance_realistic", opt)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.q6_6_moral_governance_realistic === opt
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </ImageCard>
    </div>
  );
};

export default Section6_Enablers;
