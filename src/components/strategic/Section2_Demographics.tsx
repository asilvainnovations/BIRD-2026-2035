import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  User,
  MapPin,
  Building2,
  Mail,
  Briefcase,
  GraduationCap,
  CheckSquare,
  ChevronDown,
} from "lucide-react";

export interface Section2Data {
  demo_name: string;
  demo_email: string;
  demo_organization: string;
  demo_position: string;
  demo_province: string;
  demo_category: string;
  demo_expertise: string[];
}

interface Section2Props {
  data: Section2Data;
  onChange: (data: Section2Data) => void;
}

const PROVINCES = [
  "Lanao del Norte",
  "Lanao del Sur",
  "Maguindanao del Norte",
  "Maguindanao del Sur",
  "Basilan",
  "Sulu",
  "Tawi-Tawi",
  "Special Geographic Area (SGA)",
  "Cotabato City",
  "Regional / BARMM-wide",
];

const CATEGORIES = [
  "Bangsamoro Government Official",
  "Local Government Unit (LGU)",
  "Private Sector / Investor",
  "Civil Society Organization",
  "Academic / Researcher",
  "Development Partner / Donor",
];

const EXPERTISE_AREAS = [
  "Agriculture",
  "Halal Economy",
  "Infrastructure",
  "Islamic Finance",
  "Tourism",
  "Governance",
  "Environment / Green Economy",
  "Trade & Export",
];

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

const Section2_Demographics: React.FC<Section2Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section2Data>(field: K, value: Section2Data[K]) =>
    onChange({ ...data, [field]: value });

  const toggle = (field: keyof Section2Data, val: string) => {
    const arr = (data[field] as string[] || []);
    update(field, arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] as any);
  };

  const [provinceOpen, setProvinceOpen] = useState(false);

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-[#C9A84C]/30 bg-white text-[#022c22] text-sm placeholder:text-[#64748b] focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30 transition-all";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <User className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 2: Your Profile</h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        This helps us understand whose voice this is. Your email is used only to send you a copy of your submission and is never shared publicly.
      </p>

      {/* Banner Images */}
      <div className="space-y-4">
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/13.%20Provincial%20Endowments-Mainlands.png"
            alt="Provincial Endowments and Geographic Context"
            className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              BIRD 2026-2035 — Provincial Endowments and Geographic Context
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/18.%20Vision.png"
            alt="Strategic Vision Framework"
            className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              BIRD 2026-2035 — Strategic Vision Framework
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">Personal Information</h3>
        </div>

        <div className="space-y-4">
          {/* Q2.1 Full Name */}
          <div>
            <label className="block text-sm font-medium text-[#022c22] mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your full name"
              value={data.demo_name}
              onChange={(e) => update("demo_name", e.target.value)}
              className={inputClass}
            />
            <p className="text-xs text-[#065f46] mt-1">
              Your name helps us contact you if we need clarification on your responses.
            </p>
          </div>

          {/* Q2.2 Email Address */}
          <div>
            <label className="block text-sm font-medium text-[#022c22] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                type="email"
                placeholder="your@email.com"
                value={data.demo_email}
                onChange={(e) => update("demo_email", e.target.value)}
                className={cn(inputClass, "pl-10")}
              />
            </div>
            <p className="text-xs text-[#065f46] mt-1">
              A valid email is needed to send you a copy of your submission.
            </p>
          </div>

          {/* Q2.3 Organization */}
          <div>
            <label className="block text-sm font-medium text-[#022c22] mb-1">
              Organization / Institution / Agency / Unit
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                type="text"
                placeholder="Your organization or institution"
                value={data.demo_organization}
                onChange={(e) => update("demo_organization", e.target.value)}
                className={cn(inputClass, "pl-10")}
              />
            </div>
          </div>

          {/* Q2.4 Position */}
          <div>
            <label className="block text-sm font-medium text-[#022c22] mb-1">
              Position / Designation
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                type="text"
                placeholder="Your position or designation"
                value={data.demo_position}
                onChange={(e) => update("demo_position", e.target.value)}
                className={cn(inputClass, "pl-10")}
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Location Card */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">Location</h3>
        </div>

        {/* Q2.5 Province */}
        <div>
          <label className="block text-sm font-medium text-[#022c22] mb-2">
            Province
          </label>
          <div className="relative">
            <button
              onClick={() => setProvinceOpen(!provinceOpen)}
              className={cn(
                inputClass,
                "flex items-center justify-between text-left pr-4",
                !data.demo_province && "text-[#64748b]"
              )}
            >
              <span className={data.demo_province ? "text-[#022c22]" : "text-[#64748b]"}>
                {data.demo_province || "Select your province"}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-[#64748b] transition-transform",
                  provinceOpen && "rotate-180"
                )}
              />
            </button>
            {provinceOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-[#C9A84C]/30 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {PROVINCES.map((province) => (
                  <button
                    key={province}
                    onClick={() => {
                      update("demo_province", province);
                      setProvinceOpen(false);
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-[#ecfdf5]",
                      data.demo_province === province
                        ? "bg-[#ecfdf5] text-[#1B4D3E] font-medium"
                        : "text-[#022c22]"
                    )}
                  >
                    {province}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Stakeholder Category Card */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Which category best describes your role?
          </h3>
        </div>

        {/* Q2.6 Stakeholder Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => update("demo_category", cat)}
              className={cn(
                "p-3 rounded-lg border text-sm text-left transition-all",
                data.demo_category === cat
                  ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                  : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Areas of Expertise Card */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckSquare className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Select Your Areas of Expertise (Select all that apply)
          </h3>
        </div>
        <p className="text-xs text-[#065f46] mb-4 italic">
          Select your areas of expertise to help contextualize your responses.
        </p>

        {/* Q2.7 Expertise */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXPERTISE_AREAS.map((area) => {
            const isSelected = data.demo_expertise.includes(area);
            return (
              <button
                key={area}
                onClick={() => toggle("demo_expertise", area)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all flex items-center gap-2",
                  isSelected
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all",
                    isSelected
                      ? "bg-[#C9A84C] border-[#C9A84C]"
                      : "border-[#C9A84C]/50 bg-white"
                  )}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                {area}
              </button>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};

export default Section2_Demographics;
