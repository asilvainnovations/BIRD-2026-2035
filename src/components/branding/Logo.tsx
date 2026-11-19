// src/components/branding/Logo.tsx
// BIRD 2026–2035 · Brand marks
//
// ONE logo treatment everywhere: the official MTIT seal, rendered as a circle
// with a 2px gold hairline on deep green — the same as the nav logo on
// public/roadmap.html and public/dashboard.html (img.mtit-seal).
//
// The seal ships as public/assets/MTIT-logo-circle.{webp,png}: the source
// MTIT-logo.png is a square with white corners, so any surface that did not
// clip it showed a white box. The circle asset has transparent corners and is
// served from this site, not from a Supabase bucket.

import React, { useState } from 'react';

export const MTIT_SEAL_WEBP = '/assets/MTIT-logo-circle.webp';
export const MTIT_SEAL_PNG = '/assets/MTIT-logo-circle.png';

type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

/** Pixel diameters. md = 40 (app chrome), lg = 52 (matches static-page nav). */
const SEAL_PX: Record<LogoSize, number> = { sm: 32, md: 40, lg: 52, xl: 96 };

interface MTITLogoProps {
  size?: LogoSize;
  className?: string;
  /** Soft gold glow, for splash / loading screens. */
  withGlow?: boolean;
  alt?: string;
}

export const MTITLogo: React.FC<MTITLogoProps> = ({
  size = 'md',
  className = '',
  withGlow = false,
  alt = 'Ministry of Trade, Investments and Tourism – BARMM',
}) => {
  const [src, setSrc] = useState(MTIT_SEAL_WEBP);
  const [failed, setFailed] = useState(false);
  const px = SEAL_PX[size];

  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 rounded-full overflow-hidden bg-[#022c22] border-2 border-[#C9A84C]/30 ${
        withGlow ? 'shadow-lg shadow-[#C9A84C]/25' : ''
      } ${className}`}
      style={{ width: px, height: px }}
    >
      {failed ? (
        <span className="font-display font-bold text-[#C9A84C]" style={{ fontSize: Math.max(9, px * 0.26) }}>
          MTIT
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          width={px}
          height={px}
          decoding="async"
          className="w-full h-full object-contain"
          onError={() => (src === MTIT_SEAL_WEBP ? setSrc(MTIT_SEAL_PNG) : setFailed(true))}
        />
      )}
    </span>
  );
};

interface LogoProps {
  size?: LogoSize;
  variant?: 'full' | 'icon' | 'text';
  className?: string;
  withGlow?: boolean;
}

const TEXT_SIZE: Record<LogoSize, string> = { sm: 'text-xs', md: 'text-sm', lg: 'text-lg', xl: 'text-2xl' };

/**
 * Platform lockup: MTIT seal + "BIRD 2026–2035". `icon` renders the seal only.
 * Do not size the full variant with w-/h- classes — it is a row, not a square
 * (that is what made the sidebar header text overlap).
 */
export const StratLogo: React.FC<LogoProps> = ({ size = 'md', variant = 'full', className = '', withGlow = false }) => {
  if (variant === 'icon') return <MTITLogo size={size} withGlow={withGlow} className={className} />;

  const wordmark = (
    <div className={`${TEXT_SIZE[size]} font-display font-bold tracking-wide leading-tight`}>
      <div>
        <span className="text-[#ecfdf5]">BIRD </span>
        <span className="text-[#C9A84C]">2026–2035</span>
      </div>
      {variant === 'full' && (
        <div className="font-sans font-medium text-[#a3bfb3] text-[11px] tracking-normal">
          Bangsamoro Investment Roadmap
        </div>
      )}
    </div>
  );

  if (variant === 'text') return <div className={className}>{wordmark}</div>;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <MTITLogo size={size} withGlow={withGlow} />
      {wordmark}
    </div>
  );
};

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withGlow?: boolean;
}

/** BIRD AI Strategist avatar — circular, same gold hairline as the seal. */
export const AIStrategistAvatar: React.FC<AvatarProps> = ({ size = 'md', className = '', withGlow = false }) => {
  const [failed, setFailed] = useState(false);
  const sizeMap = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' };
  return (
    <span
      className={`${sizeMap[size]} ${className} inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 bg-[#022c22] border-2 border-[#C9A84C]/30 ${
        withGlow ? 'shadow-lg shadow-[#C9A84C]/25' : ''
      }`}
    >
      {failed ? (
        <span className="text-xs font-bold text-[#C9A84C]">AI</span>
      ) : (
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/ASilva%20Innovations%20Logo.png"
          alt="BIRD AI Strategist"
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
};

export default StratLogo;
