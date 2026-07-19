// src/components/branding/Logo.tsx
// BIRD 2026–2035 · Bangsamoro Strategic Logo & Branding

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
  withGlow?: boolean;
}

export const StratLogo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  withGlow = false,
}) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizeMap = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
    xl: 'text-2xl',
  };

  const glowClasses = withGlow
    ? 'ring-2 ring-[#C9A84C]/50 shadow-lg shadow-[#C9A84C]/25 rounded-xl'
    : '';

  if (variant === 'icon') {
    return (
      <div className={`${sizeMap[size]} ${glowClasses} ${className} flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Golden shield with teal accent */}
          <rect x="15" y="20" width="70" height="60" rx="8" fill="#C9A84C" />
          <circle cx="50" cy="50" r="28" fill="#022c22" />
          <path d="M50 30 L60 50 L50 70 L40 50 Z" fill="#C9A84C" opacity="0.8" />
        </svg>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`${textSizeMap[size]} ${className} font-serif font-bold tracking-wide`}>
        <span className="text-[#C9A84C]">BIRD</span>
        <span className="text-[#022c22] ml-1">2026–2035</span>
      </div>
    );
  }

  // Full variant: icon + text
  return (
    <div className={`${className} flex items-center gap-3`}>
      <div className={`${sizeMap[size]} ${glowClasses} flex-shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="15" y="20" width="70" height="60" rx="8" fill="#C9A84C" />
          <circle cx="50" cy="50" r="28" fill="#022c22" />
          <path d="M50 30 L60 50 L50 70 L40 50 Z" fill="#C9A84C" opacity="0.8" />
        </svg>
      </div>
      <div className={`${textSizeMap[size]} font-serif font-bold tracking-wide`}>
        <div className="text-[#C9A84C]">BIRD 2026–2035</div>
        <div className="text-[#022c22]/70 text-xs leading-tight">
          Bangsamoro Investment Roadmap
        </div>
      </div>
    </div>
  );
};

// Alternative: MTIT/BOI branding
export const MTITLogo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div
      className={`${sizeMap[size]} ${className} rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#C9A84C]/30`}
    >
      <img
        src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/MTIT%20Logo.png"
        alt="MTIT Logo"
        className="w-full h-full object-cover"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = 'none';
          const parent = el.parentElement;
          if (parent) {
            parent.style.background = '#022c22';
            parent.style.display = 'flex';
            parent.style.alignItems = 'center';
            parent.style.justifyContent = 'center';
            parent.innerHTML =
              '<span style="color:#C9A84C;font-size:0.5em;font-weight:700;font-family:Georgia,serif;">MTIT</span>';
          }
        }}
      />
    </div>
  );
};

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withGlow?: boolean;
}

export const AIStrategistAvatar: React.FC<AvatarProps> = ({
  size = 'md',
  className = '',
  withGlow = false,
}) => {
  const sizeMap = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' };
  return (
    <div
      className={`${sizeMap[size]} ${className} rounded-full overflow-hidden flex-shrink-0 ${
        withGlow ? 'ring-2 ring-fuchsia-500/50 shadow-lg shadow-fuchsia-500/20' : ''
      }`}
    >
      <img
        src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/ASilva%20Innovations%20Logo.png"
        alt="BIRD AI Strategist"
        className="w-full h-full object-cover"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = 'none';
          const parent = el.parentElement;
          if (parent) {
            parent.style.background = 'linear-gradient(135deg, #7c3aed, #06b6d4)';
            parent.style.display = 'flex';
            parent.style.alignItems = 'center';
            parent.style.justifyContent = 'center';
            parent.innerHTML = '<span style="color:white;font-size:1.1em;font-weight:800;">AI</span>';
          }
        }}
      />
    </div>
  );
};

export default StratLogo;
