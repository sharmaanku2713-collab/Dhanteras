import React from 'react';

interface DiyaProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glow?: boolean;
}

export const Diya: React.FC<DiyaProps> = ({ size = 'md', className = '', glow = true }) => {
  const sizeMap = {
    sm: 'w-12 h-10',
    md: 'w-20 h-16',
    lg: 'w-28 h-22',
    xl: 'w-40 h-32',
  };

  return (
    <div className={`relative inline-block select-none ${sizeMap[size]} ${className}`}>
      {/* Dynamic Golden Ambient Glow */}
      {glow && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-radial from-[#FFD166]/60 via-[#FF8A00]/25 to-transparent blur-xl rounded-full animate-pulse-glow pointer-events-none" />
      )}

      <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible">
        <defs>
          {/* Flame outer gradient */}
          <linearGradient id="flameOuter" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#FF6A00" stop-opacity="0.9" />
            <stop offset="40%" stop-color="#FF8A00" />
            <stop offset="80%" stop-color="#FFD166" />
            <stop offset="100%" stop-color="#FFF8E7" />
          </linearGradient>

          {/* Flame core white-hot gradient */}
          <linearGradient id="flameInner" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#FFD166" />
            <stop offset="60%" stop-color="#FFFFFF" />
            <stop offset="100%" stop-color="#FFFDF5" />
          </linearGradient>

          {/* Diya Clay Bowl Gradient */}
          <radialGradient id="clayGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#E27329" />
            <stop offset="60%" stop-color="#9C3A0A" />
            <stop offset="100%" stop-color="#551D04" />
          </radialGradient>

          {/* Diya Gold Rim Accent */}
          <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#B8860B" />
            <stop offset="50%" stop-color="#FFD700" />
            <stop offset="100%" stop-color="#B8860B" />
          </linearGradient>

          {/* Oil Surface Gradient */}
          <ellipse id="oilGlow" cx="60" cy="50" rx="38" ry="12" />
        </defs>

        {/* Diya Clay Base Shadow */}
        <ellipse cx="60" cy="80" rx="42" ry="7" fill="#000000" opacity="0.4" />

        {/* Terracotta Clay Body */}
        <path
          d="M 15 50 C 15 78, 105 78, 105 50 C 105 54, 15 54, 15 50 Z"
          fill="url(#clayGrad)"
          stroke="#421402"
          strokeWidth="1.5"
        />

        {/* Diya Rim Upper Oval */}
        <ellipse cx="60" cy="50" rx="45" ry="14" fill="#6A2406" stroke="url(#goldRim)" strokeWidth="2" />

        {/* Traditional carved patterns on Diya rim */}
        <ellipse cx="60" cy="50" rx="41" ry="11" fill="#8B330C" />
        <ellipse cx="60" cy="51" rx="36" ry="8" fill="#521A04" />

        {/* Golden Ghee / Oil Reflection */}
        <ellipse cx="60" cy="52" rx="30" ry="6" fill="#D97706" opacity="0.85" />
        <ellipse cx="58" cy="52" rx="20" ry="3.5" fill="#FBBF24" opacity="0.6" />

        {/* Cotton Wick tip */}
        <path d="M 58 52 Q 60 42 60 36" stroke="#2B1810" strokeWidth="2.5" strokeLinecap="round" />

        {/* Flickering Flame Group */}
        <g className="animate-diya-flicker origin-bottom" style={{ transformOrigin: '60px 40px' }}>
          {/* Flame Halo Glow */}
          <circle cx="60" cy="24" r="22" fill="#FFAA00" opacity="0.25" filter="blur(4px)" />

          {/* Outer Orange Flame */}
          <path
            d="M 60 38 
               C 52 38, 48 26, 60 5 
               C 72 26, 68 38, 60 38 Z"
            fill="url(#flameOuter)"
          />

          {/* Inner Bright Golden/White Core */}
          <path
            d="M 60 37 
               C 55 37, 53 28, 60 14 
               C 67 28, 65 37, 60 37 Z"
            fill="url(#flameInner)"
            opacity="0.95"
          />

          {/* Floating tiny sparks above flame */}
          <circle cx="59" cy="2" r="1.2" fill="#FFE29F" opacity="0.8" className="animate-ping" />
        </g>
      </svg>
    </div>
  );
};
