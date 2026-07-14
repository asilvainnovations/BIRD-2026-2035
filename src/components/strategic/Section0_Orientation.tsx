import React from "react";
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-urls";
import { GlassCard } from "@/components/GlassCard";
import { Sparkles, Play, ArrowRight, BookOpen, BarChart3, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Section0Data {
  ready_to_begin: string;
  ecosystem_understanding: string;
  systems_thinking_value: string;
}

interface Section0Props {
  data: Section0Data;
  onChange: (data: Section0Data) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
const Section0_Orientation: React.FC<Section0Props> = ({ data, onChange }) => {
  const update = (field: keyof Section0Data, value: string) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.validationBanner.url}
          alt={BIRD_IMAGES.validationBanner.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            Source: {BIRD_IMAGES.validationBanner.title}
          </p>
        </div>
      </div>

      {/* ── Welcome Copy ──────────────────────────────────────────────────── */}
      <GlassCard className="!p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#1B4D3E] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#022c22] mb-2">
              Welcome to the BIRD 2026–2035 Validation Survey
            </h2>
            <p className="text-sm text-[#065f46]">
              Your voice shapes the future of the Bangsamoro Autonomous Region
            </p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-[#022c22]/80 leading-relaxed space-y-4">
          <p>
            The <strong>Bangsamoro Investment Roadmap Development (BIRD) 2026–2035</strong> is not just
            another planning document. It is a living, breathing strategic framework built on the
            principle that sustainable development emerges from understanding how everything connects.
            Before you lies an opportunity to validate, refine, and strengthen the investment roadmap
            that will guide BARMM through its most transformative decade.
          </p>

          <p>
            This survey is grounded in <strong>systems thinking</strong> — the discipline of seeing
            wholes rather than parts, patterns of change rather than static snapshots. Rather than
            asking you to evaluate isolated projects or sectors, we invite you to examine the
            <strong> interconnected ecosystem</strong> of governance, infrastructure, enterprise,
            connectivity, and finance that together determine whether Bangsamoro thrives.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-[#C9A84C]/10 rounded-xl p-4 border border-[#C9A84C]/20">
              <BarChart3 className="w-6 h-6 text-[#C9A84C] mb-2" />
              <h4 className="font-semibold text-[#022c22] text-sm mb-1">Data-Driven</h4>
              <p className="text-xs text-[#065f46]">
                Every response feeds into real-time analytics that shape policy decisions and
                investment priorities.
              </p>
            </div>
            <div className="bg-[#1B4D3E]/10 rounded-xl p-4 border border-[#1B4D3E]/20">
              <Users className="w-6 h-6 text-[#1B4D3E] mb-2" />
              <h4 className="font-semibold text-[#022c22] text-sm mb-1">Inclusive</h4>
              <p className="text-xs text-[#065f46]">
                Designed for government, business, academe, civil society, and development partners
                — every perspective matters.
              </p>
            </div>
            <div className="bg-[#C9A84C]/10 rounded-xl p-4 border border-[#C9A84C]/20">
              <BookOpen className="w-6 h-6 text-[#C9A84C] mb-2" />
              <h4 className="font-semibold text-[#022c22] text-sm mb-1">Systems-Based</h4>
              <p className="text-xs text-[#065f46]">
                Moving beyond checklists to understand feedback loops, archetypes, and leverage
                points that drive lasting change.
              </p>
            </div>
          </div>

          <p>
            Your participation helps answer one critical question:
            <em className="text-[#1B4D3E] font-medium">
              {" "}
              How do we turn fragmented efforts into a unified engine of inclusive growth?
            </em>
            Through your insights on SWOT factors, systems archetypes, strategic options, and
            provincial equity, you become a co-creator of Bangsamoro's economic future.
          </p>

          <p className="text-sm">
            <strong>What to expect:</strong> The survey is organized into 12 thematic sections covering
            the BEIE framework, five investment clusters, systems archetypes, strategic options, budget
            targets, and equity considerations. Most questions use simple 1–5 rating scales with clear
            explanations. All fields are optional — answer what you know, skip what you don't. The
            entire survey takes approximately <strong>20–30 minutes</strong> to complete.
          </p>
        </div>
      </GlassCard>

      {/* ── Systems Thinking Video ────────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-3 mb-4">
          <Play className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-bold text-[#022c22]">
            {BIRD_VIDEOS.systemsThinking.title}
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-4">
          {BIRD_VIDEOS.systemsThinking.description}
        </p>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg aspect-video">
          <iframe
            src={BIRD_VIDEOS.systemsThinking.embedUrl}
            title={BIRD_VIDEOS.systemsThinking.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="text-xs text-[#065f46]/70 mt-3 italic">
          Watch this 5-minute overview to understand the systems thinking approach powering BIRD
          2026–2035 before you begin the survey.
        </p>
      </GlassCard>

      {/* ── Quick-Start Questions ─────────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-lg font-bold text-[#022c22]">Before You Begin</h3>
        </div>

        <div className="space-y-6">
          {/* Q0.1 */}
          <div>
            <p className="text-sm font-medium text-[#022c22] mb-3">
              How ready do you feel to contribute to shaping BARMM's investment future?
            </p>
            <div className="flex flex-wrap gap-2">
              {["Very ready", "Somewhat ready", "Curious but unsure", "Just exploring"].map(
                (opt) => (
                  <button
                    key={opt}
                    onClick={() => update("ready_to_begin", opt)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm border transition-all",
                      data.ready_to_begin === opt
                        ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#C9A84C]/5"
                    )}
                  >
                    {opt}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Q0.2 */}
          <div>
            <p className="text-sm font-medium text-[#022c22] mb-3">
              How would you describe your understanding of an "investment ecosystem" versus
              traditional sector-based planning?
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "I clearly see the difference — ecosystems are interconnected",
                "I somewhat understand — ecosystems involve more moving parts",
                "I mainly know sector-based planning — ecosystems are new to me",
                "I'm not familiar with either concept",
              ].map((opt) => (
                <button
                  key={opt}
                  onClick={() => update("ecosystem_understanding", opt)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm border transition-all text-left",
                    data.ecosystem_understanding === opt
                      ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                      : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#C9A84C]/5"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Q0.3 */}
          <div>
            <p className="text-sm font-medium text-[#022c22] mb-3">
              After watching the video (or based on your existing knowledge), how valuable do you
              think systems thinking is for investment planning in BARMM?
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => update("systems_thinking_value", String(val))}
                  className={cn(
                    "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                    data.systems_thinking_value === String(val)
                      ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                      : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10"
                  )}
                >
                  {val}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#065f46] mt-2 italic">
              1 = Not valuable at all | 5 = Absolutely essential
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Section0_Orientation;
