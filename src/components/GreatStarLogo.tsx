import React from 'react';

interface GreatStarLogoProps {
  size?: number | string;
  className?: string;
  showSubtitle?: boolean;
}

export const GreatStarLogo: React.FC<GreatStarLogoProps> = ({
  size = 64,
  className = '',
  showSubtitle = false,
}) => {
  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_16px_rgba(234,179,8,0.35)]"
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#eab308" />
            <stop offset="50%" stopColor="#ca8a04" />
            <stop offset="75%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>

          {/* Chrome Silver Gradient */}
          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#cbd5e1" />
            <stop offset="65%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          {/* Deep Carbon Slate Background */}
          <radialGradient id="slateRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="70%" stopColor="#020617" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="gearGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#eab308" floodOpacity="0.4" />
          </filter>

          {/* Curved Text Paths */}
          {/* Top curve for GreatStar.z.n.w */}
          <path
            id="textPathTop"
            d="M 32,120 A 88,88 0 0,1 208,120"
            fill="none"
          />
          {/* Bottom curve for ZAW NAING WIN */}
          <path
            id="textPathBottom"
            d="M 208,120 A 88,88 0 0,1 32,120"
            fill="none"
          />
        </defs>

        {/* Outer Titanium Hex/Gear Rim */}
        <circle cx="120" cy="120" r="116" fill="url(#slateRadial)" stroke="url(#goldGrad)" strokeWidth="3" />

        {/* 16 Gear Teeth on Outer Edge */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <rect
              key={i}
              x="114"
              y="2"
              width="12"
              height="8"
              rx="2"
              fill="url(#goldGrad)"
              transform={`rotate(${angle} 120 120)`}
            />
          );
        })}

        {/* Inner Ring with Tick Marks */}
        <circle cx="120" cy="120" r="106" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.7" />

        {/* Ring background for text banner */}
        <circle cx="120" cy="120" r="88" stroke="#1e293b" strokeWidth="26" fill="none" />
        <circle cx="120" cy="120" r="101" stroke="url(#goldGrad)" strokeWidth="1.2" fill="none" />
        <circle cx="120" cy="120" r="75" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" />

        {/* Top Text: GreatStar.z.n.w */}
        <text
          fill="#fde047"
          fontSize="13.5"
          fontWeight="900"
          letterSpacing="2.2"
          fontFamily="system-ui, -apple-system, sans-serif"
          filter="url(#gearGlow)"
        >
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            ★ GREATSTAR.Z.N.W ★
          </textPath>
        </text>

        {/* Bottom Text: ZAW NAING WIN */}
        <text
          fill="#38bdf8"
          fontSize="13"
          fontWeight="900"
          letterSpacing="2.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            ⚙ ZAW NAING WIN ⚙
          </textPath>
        </text>

        {/* Center Engine Core Hub */}
        <circle cx="120" cy="120" r="66" fill="url(#slateRadial)" stroke="url(#goldGrad)" strokeWidth="2.5" />

        {/* Inner Timing Gear Spokes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1="120"
            y1="120"
            x2="120"
            y2="60"
            stroke="url(#chromeGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            transform={`rotate(${i * 60} 120 120)`}
          />
        ))}

        {/* Crossed Torque Wrench & Spanner */}
        <g transform="translate(120, 120) rotate(45) translate(-120, -120)">
          {/* Torque Wrench Handle */}
          <rect x="116" y="70" width="8" height="100" rx="3" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="0.8" />
          {/* Torque Scale Lines */}
          <line x1="116" y1="110" x2="124" y2="110" stroke="#451a03" strokeWidth="1" />
          <line x1="116" y1="115" x2="124" y2="115" stroke="#451a03" strokeWidth="1" />
          <line x1="116" y1="120" x2="124" y2="120" stroke="#451a03" strokeWidth="1" />
          <line x1="116" y1="125" x2="124" y2="125" stroke="#451a03" strokeWidth="1" />
          {/* Ratchet Head */}
          <circle cx="120" cy="68" r="9" fill="url(#chromeGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" />
          <rect x="117" y="65" width="6" height="6" fill="#0f172a" rx="1" />
        </g>

        <g transform="translate(120, 120) rotate(-45) translate(-120, -120)">
          {/* Open Spanner */}
          <rect x="117" y="72" width="6" height="96" rx="2" fill="url(#chromeGrad)" stroke="#475569" strokeWidth="0.8" />
          {/* Open jaw top */}
          <path d="M 112 70 A 9 9 0 0 1 128 70 L 125 76 L 115 76 Z" fill="url(#chromeGrad)" stroke="url(#goldGrad)" strokeWidth="1.2" />
        </g>

        {/* Center Heavy Hex Nut */}
        <polygon
          points="120,105 133,112 133,128 120,135 107,128 107,112"
          fill="url(#goldGrad)"
          stroke="#451a03"
          strokeWidth="1.5"
        />
        <circle cx="120" cy="120" r="7" fill="#020617" stroke="url(#chromeGrad)" strokeWidth="1" />

        {/* Center Micro Spark / Star */}
        <polygon
          points="120,116 121.5,119 124,120 121.5,121 120,124 118.5,121 116,120 118.5,119"
          fill="#ffffff"
        />
      </svg>

      {showSubtitle && (
        <div className="text-center mt-2">
          <div className="text-amber-400 font-extrabold text-sm tracking-wider uppercase drop-shadow">
            GreatStar.z.n.w
          </div>
          <div className="text-sky-400 font-bold text-xs tracking-widest uppercase">
            Zaw Naing Win
          </div>
        </div>
      )}
    </div>
  );
};
