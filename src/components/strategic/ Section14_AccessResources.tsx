import React from "react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  FileText,
  Video,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Heart,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data interface                                                      */
/* ------------------------------------------------------------------ */
export interface Section14Data {
  q14_1_engagement_type: string[];
  q14_2_contact_method: string;
  q14_3_timing: string;
  q14_4_role_contribution: string;
  q14_5_additional_comments: string;
}

/* ------------------------------------------------------------------ */
/* Props                                                                */
/* ------------------------------------------------------------------ */
interface Section14Props {
  data: Section14Data;
  onChange: (data: Section14Data) => void;
}

/* ------------------------------------------------------------------ */
/* GlassCard helper                                                     */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */
const RESOURCE_CHAPTERS = [
  {
    title: "Chapter 1: BARMM at a Crossroads",
    description: "Economic assessment and strategic imperative for transformation",
    url: undefined,
  },
  {
    title: "Chapter 2: Context Analysis & BEIE Framework",
    description: "The Bangsamoro Economic and Investment Ecosystem framework",
    url: undefined,
  },
  {
    title: "Chapter 3: SWOT Analysis & Systems Mapping",
    description: "Comprehensive SWOT with systems archetypes and causal loop diagrams",
    url: undefined,
  },
  {
    title: "Chapter 4: Strategic Options & Roadmap Strategy",
    description: "TOWS matrix, 7-criteria evaluation, and IEDS selection",
    url: "#BIRD_RESOURCES.ch4",
  },
  {
    title: "Chapter 5: Metrics & KPI Benchmarking Framework",
    description: "4-tier calibration architecture with cross-cluster KPIs",
    url: "#BIRD_RESOURCES.ch5",
  },
  {
    title: "Chapter 6: Balanced Scorecard",
    description: "4-perspective strategy map with causal linkages",
    url: "#BIRD_RESOURCES.ch6",
  },
  {
    title: "Chapter 7: Priority Actions & Budget",
    description: "\u20B1120-160B capital deployment plan across 3 phases",
    url: undefined,
  },
  {
    title: "Chapter 8: Institutional Architecture",
    description: "Bangsamoro Investment Command Center and coordination mechanisms",
    url: undefined,
  },
];

const RESOURCE_VIDEOS = [
  { title: "BIRD Overview", duration: "~15 min" },
  { title: "BEIE Framework", duration: "~12 min" },
  { title: "SWOT & Systems Mapping", duration: "~18 min" },
  { title: "Strategic Options", duration: "~20 min" },
];

const ENGAGEMENT_OPTIONS = [
  "Deep-dive workshop on IEDS implementation",
  "Provincial consultation in my area",
  "Sector-specific technical working group",
  "Investment opportunity briefing",
  "Policy advocacy coalition",
  "No further engagement at this time",
];

const CONTACT_METHODS = [
  { label: "Email", icon: Mail },
  { label: "Phone", icon: Phone },
  { label: "Virtual meeting", icon: Video },
  { label: "In-person", icon: Calendar },
];

const TIMING_OPTIONS = [
  "Within 1 week",
  "Within 1 month",
  "Within 3 months",
  "No preference",
];

const ROLE_CONTRIBUTIONS = [
  "Technical expertise",
  "Funding",
  "Policy advocacy",
  "Community outreach",
  "Research",
  "Monitoring & evaluation",
  "Other",
];

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */
const Section14_AccessResources: React.FC<Section14Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section14Data>(field: K, value: Section14Data[K]) =>
    onChange({ ...data, [field]: value });
  return (
    <div className="space-y-8">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/30 shrink-0">
          <BookOpen className="w-6 h-6 text-[#C9A84C]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#022c22]">
            Section 14: Access to Resources &amp; Optional Engagements
          </h2>
          <p className="text-sm text-[#065f46] mt-2 leading-relaxed">
            Explore the complete BIRD resource library and indicate your interest in follow-up
            engagements. Your participation shapes the Emerging Bangsamoro.
          </p>
        </div>
      </div>

      {/* ── Block 1: Resource Library ─────────────────────────── */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-5">
          <FileText className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-semibold text-[#022c22]">Resource Library</h3>
        </div>

        {/* Chapters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {RESOURCE_CHAPTERS.map((chapter) => (
            <div
              key={chapter.title}
              className="rounded-lg border border-[#C9A84C]/20 bg-white p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-[#1B4D3E]/10 shrink-0">
                  <FileText className="w-4 h-4 text-[#1B4D3E]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#022c22] leading-snug">
                    {chapter.title}
                  </p>
                  <p className="text-xs text-[#065f46] mt-1 leading-relaxed">
                    {chapter.description}
                  </p>
                  <button
                    onClick={() => {
                      if (chapter.url) {
                        window.open(chapter.url, "_blank");
                      }
                    }}
                    className={cn(
                      "mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                      chapter.url
                        ? "bg-[#1B4D3E] text-white hover:bg-[#022c22] cursor-pointer"
                        : "bg-[#C9A84C]/10 text-[#C9A84C] cursor-default"
                    )}
                  >
                    <BookOpen className="w-3 h-3" />
                    {chapter.url ? "View Resource" : "Coming Soon"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Videos */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-3">
            <Video className="w-4 h-4 text-[#C9A84C]" />
            <p className="text-sm font-semibold text-[#022c22]">Video Resources</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RESOURCE_VIDEOS.map((video) => (
              <div
                key={video.title}
                className="flex items-center gap-3 rounded-lg border border-[#C9A84C]/20 bg-white p-3 hover:shadow-sm transition-shadow"
              >
                <div className="p-2 rounded-md bg-[#C9A84C]/10 shrink-0">
                  <Video className="w-4 h-4 text-[#C9A84C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#022c22]">{video.title}</p>
                  <p className="text-xs text-[#065f46]">{video.duration}</p>
                </div>
                <button
                  className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#C9A84C]/10 text-[#C9A84C] cursor-default shrink-0"
                >
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* ── Block 2: Engagement Interest ──────────────────────── */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-5">
          <MessageSquare className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-semibold text-[#022c22]">Engagement Interest</h3>
        </div>

        <p className="text-sm font-medium text-[#022c22] mb-4">
          What type of follow-up engagement interests you?{" "}
          <span className="text-[#065f46] font-normal">(Select all that apply)</span>
        </p>

        <div className="space-y-2">
          {ENGAGEMENT_OPTIONS.map((opt) => (
            <label
              key={opt}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                data.q14_1_engagement_type.includes(opt)
                  ? "border-[#1B4D3E] bg-[#1B4D3E]/5"
                  : "border-[#C9A84C]/20 hover:bg-[#C9A84C]/5"
              )}
            >
              <input
                type="checkbox"
                checked={data.q14_1_engagement_type.includes(opt)}
                onChange={(e) => {
                  const current = data.q14_1_engagement_type;
                  update(
                    "q14_1_engagement_type",
                    e.target.checked
                      ? [...current, opt]
                      : current.filter((x) => x !== opt)
                  );
                }}
                className="w-4 h-4 rounded border-[#C9A84C] text-[#1B4D3E] accent-[#1B4D3E] shrink-0"
              />
              <span className="text-sm text-[#022c22]">{opt}</span>
            </label>
          ))}
        </div>
      </GlassCard>

      {/* ── Block 3: Follow-up Preferences ────────────────────── */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-5">
          <Calendar className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-semibold text-[#022c22]">Follow-up Preferences</h3>
        </div>

        {/* Contact method */}
        <div className="mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22] mb-3">
            Preferred method for follow-up:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {CONTACT_METHODS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => update("q14_2_contact_method", label)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border text-sm text-left transition-all",
                  data.q14_2_contact_method === label
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Timing */}
        <div className="mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22] mb-3">Preferred timing:</p>
          <div className="grid grid-cols-2 gap-3">
            {TIMING_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => update("q14_3_timing", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q14_3_timing === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Role contribution */}
        <div>
          <p className="text-sm font-medium text-[#022c22] mb-3">
            How would you like to contribute?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {ROLE_CONTRIBUTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => update("q14_4_role_contribution", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.q14_4_role_contribution === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* ── Block 4: Additional Comments ──────────────────────── */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-5">
          <MessageSquare className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-semibold text-[#022c22]">Additional Comments</h3>
        </div>

        <p className="text-sm text-[#022c22] mb-3">
          We welcome any additional thoughts, recommendations, or questions you may have.
        </p>

        <textarea
          value={data.q14_5_additional_comments}
          onChange={(e) => update("q14_5_additional_comments", e.target.value)}
          placeholder="Share any additional thoughts, recommendations, or questions..."
          className="w-full min-h-[120px] p-4 rounded-lg border border-[#C9A84C]/20 text-sm text-[#022c22] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#C9A84C] resize-y"
        />
      </GlassCard>

      {/* ── Block 5: Thank You Card ───────────────────────────── */}
      <div className="rounded-xl border border-[#C9A84C]/30 bg-gradient-to-br from-[#022c22] to-[#1B4D3E] p-8 text-center shadow-lg">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-[#C9A84C]/20 mb-5">
          <Heart className="w-8 h-8 text-[#C9A84C]" />
        </div>

        <h3 className="text-xl font-bold text-white mb-4">
          Thank You for Your Contribution
        </h3>

        <p className="text-sm text-white/80 leading-relaxed max-w-2xl mx-auto">
          Thank you for your valuable contribution to the Bangsamoro Investment Roadmap
          2026&ndash;2035. Your insights directly shape the Emerging Bangsamoro — Southeast
          Asia&apos;s premier ethical and sustainable investment destination. Together, we build
          dignified prosperity for every Bangsamoro.
        </p>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-[#C9A84C] tracking-widest uppercase">
            Bangsamoro Investment Roadmap &middot; 2026&ndash;2035
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section14_AccessResources;
