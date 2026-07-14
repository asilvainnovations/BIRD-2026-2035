// src/components/branding/PlatformBadge.tsx
// Circular MTIT logo badge that replaces the Bolt platform badge
// Place this in your App.tsx or layout root so it renders on all routes

import React from "react";

interface PlatformBadgeProps {
  /** Logo URL — defaults to MTIT Logo from Supabase */
  logoUrl?: string;
  /** Where to navigate when clicked */
  href?: string;
  /** Badge size in pixels */
  size?: number;
  /** Vertical position: "bottom" | "top" */
  vPosition?: "bottom" | "top";
  /** Horizontal position: "right" | "left" */
  hPosition?: "right" | "left";
  /** Offset from edges in pixels */
  offset?: number;
  /** Show tooltip on hover */
  tooltip?: string;
  /** Optional: pulse animation */
  pulse?: boolean;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  logoUrl = "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/MTIT%20Logo.png",
  href = "https://asilvainnovations.github.io/BIRD-2026-2035",
  size = 48,
  vPosition = "bottom",
  hPosition = "right",
  offset = 16,
  tooltip = "Bangsamoro Investment Roadmap 2026–2035",
  pulse = true,
}) => {
  const positionStyle: React.CSSProperties = {
    position: "fixed",
    [vPosition]: offset,
    [hPosition]: offset,
    zIndex: 9999,
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center rounded-full shadow-lg 
        border-2 border-[#C9A84C]/40 bg-[#022c22]/90 backdrop-blur-sm
        hover:scale-110 hover:border-[#C9A84C] hover:shadow-[#C9A84C]/30
        transition-all duration-300 ${pulse ? "animate-pulse" : ""}`}
      style={{
        ...positionStyle,
        width: size,
        height: size,
      }}
      title={tooltip}
    >
      <img
        src={logoUrl}
        alt="BIRD 2026–2035"
        className="w-[70%] h-[70%] object-contain rounded-full"
        loading="eager"
        onError={(e) => {
          // Fallback: show BIRD text if image fails
          const target = e.currentTarget;
          target.style.display = "none";
          const fallback = document.createElement("span");
          fallback.className = "text-[#C9A84C] font-serif font-bold text-[10px]";
          fallback.textContent = "BIRD";
          target.parentElement?.appendChild(fallback);
        }}
      />

      {/* Tooltip on hover */}
      <span
        className="absolute right-full mr-3 px-3 py-1.5 rounded-lg 
          bg-[#022c22] border border-[#C9A84C]/30 text-[#ecfdf5] text-xs 
          whitespace-nowrap opacity-0 group-hover:opacity-100 
          transition-opacity duration-200 pointer-events-none shadow-lg"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {tooltip}
      </span>
    </a>
  );
};

/** Compact variant for embeds / small screens */
export const PlatformBadgeSmall: React.FC<Omit<PlatformBadgeProps, "size">> = (props) => (
  <PlatformBadge {...props} size={32} offset={12} pulse={false} />
);

export default PlatformBadge;
