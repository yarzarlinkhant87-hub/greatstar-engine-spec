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
          {/* Metallic Gold Gradient */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#ca8a04" />
            <stop offset="75%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>

          {/* Chrome / Polished Steel Gradient */}
          <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#cbd5e1" />
            <stop offset="60%" stopColor="#64748b" />
            <stop offset="85%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          {/* Bronze / Copper Accent Gradient */}
          <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>

          {/* Gauge Needle Neon Amber Gradient */}
          <linearGradient id="needleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          {/* Deep Carbon Slate Radial Background */}
          <radialGradient id="slateRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="70%" stopColor="#020617" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>

          {/* Glow filter for Gold Stars & Gear */}
          <filter id="gearGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#eab308" floodOpacity="0.5" />
          </filter>

          {/* Curved Text Paths:
              1. Top curve: Runs clockwise from left to right along top (R=84).
                 Glyph baseline rests on arc, letters point UPWARDS towards outer rim.
              2. Bottom curve: Runs counter-clockwise (sweep=0) from left to right along bottom (R=96).
                 Glyph baseline rests on arc, letters point UPWARDS towards center.
                 Result: Both top and bottom text are 100% UPRIGHT and never upside-down!
          */}
          <path
            id="textPathTop"
            d="M 36,120 A 84,84 0 0,1 204,120"
            fill="none"
          />
          <path
            id="textPathBottom"
            d="M 24,120 A 96,96 0 0,0 216,120"
            fill="none"
          />
        </defs>

        {/* 1. Outer Dark Bezel Disc */}
        <circle cx="120" cy="120" r="116" fill="url(#slateRadial)" stroke="url(#goldGrad)" strokeWidth="3" />

        {/* 2. Outer Timing Gear Teeth (16 Pinion Teeth on Perimeter) */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <g key={i} transform={`rotate(${angle} 120 120)`}>
              <rect
                x="114"
                y="1.5"
                width="12"
                height="8.5"
                rx="2"
                fill="url(#goldGrad)"
                stroke="#78350f"
                strokeWidth="0.8"
              />
              <line x1="117" y1="3" x2="123" y2="3" stroke="#fef08a" strokeWidth="1" strokeLinecap="round" />
            </g>
          );
        })}

        {/* 3. Outer Precision Ring with Micrometer Tick Marks */}
        <circle cx="120" cy="120" r="105" stroke="url(#goldGrad)" strokeWidth="1.2" strokeDasharray="3 3" fill="none" opacity="0.65" />

        {/* 4. Circular Banner Track for Brand Typography */}
        <circle cx="120" cy="120" r="88" stroke="#090d16" strokeWidth="26" fill="none" />
        <circle cx="120" cy="120" r="101" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" />
        <circle cx="120" cy="120" r="75" stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" />

        {/* Side Accents in Banner Track (Stars at 9 o'clock & 3 o'clock) */}
        <polygon points="26,120 28,118 30,120 28,122" fill="#eab308" />
        <polygon points="210,120 212,118 214,120 212,122" fill="#eab308" />

        {/* 5. Top Curved Text: ★ GREATSTAR.Z.N.W ★ (Clockwise along top, upright) */}
        <text
          fill="#fde047"
          fontSize="12.5"
          fontWeight="900"
          letterSpacing="2.2"
          fontFamily="system-ui, -apple-system, sans-serif"
          filter="url(#gearGlow)"
        >
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            ★ GREATSTAR.Z.N.W ★
          </textPath>
        </text>

        {/* 6. Bottom Curved Text: ⚙ ZAW NAING WIN ⚙ (Left-to-right along bottom, 100% UPRIGHT!) */}
        <text
          fill="#38bdf8"
          fontSize="12"
          fontWeight="900"
          letterSpacing="2.4"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            ⚙ ZAW NAING WIN ⚙
          </textPath>
        </text>

        {/* 7. Inner Engine Core Hub (r = 67) */}
        <circle cx="120" cy="120" r="67" fill="url(#slateRadial)" stroke="url(#goldGrad)" strokeWidth="2" />

        {/* 8. Inner Pinion Gear Ring & Teeth (ပင်နီယံသွား) */}
        <circle cx="120" cy="120" r="63" stroke="#475569" strokeWidth="2" fill="none" strokeDasharray="6 4" opacity="0.6" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <rect
              key={i}
              x="117.5"
              y="54"
              width="5"
              height="5"
              rx="1"
              fill="url(#chromeGrad)"
              stroke="#334155"
              strokeWidth="0.5"
              transform={`rotate(${angle} 120 120)`}
            />
          );
        })}

        {/* 9. Mechanic Tool 1: Heavy-Duty Diesel Piston (ပစ္စတင်) crossing from bottom-left to top-right */}
        <g transform="translate(120, 120) rotate(-32) translate(-120, -120)">
          {/* Connecting Rod (Con-rod Shank) */}
          <path
            d="M 116 110 L 115 158 C 115 163 125 163 125 158 L 124 110 Z"
            fill="url(#chromeGrad)"
            stroke="#1e293b"
            strokeWidth="1"
          />
          {/* Con-rod I-beam groove */}
          <line x1="120" y1="115" x2="120" y2="154" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Big-end cap journal & bolts */}
          <circle cx="120" cy="158" r="7" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="1" />
          <circle cx="120" cy="158" r="3.5" fill="#020617" />
          <circle cx="114" cy="157" r="1.2" fill="#ffffff" />
          <circle cx="126" cy="157" r="1.2" fill="#ffffff" />

          {/* Small-end wrist pin boss */}
          <circle cx="120" cy="108" r="4.5" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="0.8" />
          <circle cx="120" cy="108" r="2" fill="#020617" />

          {/* Piston Body (ပစ္စတင် ကိုယ်ထည်) */}
          {/* Piston Crown & Skirt */}
          <path
            d="M 108 72 L 132 72 L 132 102 C 132 105 129 106 127 104 L 127 96 L 113 96 L 113 104 C 111 106 108 105 108 102 Z"
            fill="url(#chromeGrad)"
            stroke="url(#goldGrad)"
            strokeWidth="1.2"
          />
          {/* Piston Crown Top Chamfer / Combustion Bowl Pocket */}
          <path d="M 113 72 C 113 74 127 74 127 72" stroke="#475569" strokeWidth="1" fill="none" />
          {/* Compression & Oil Ring Grooves (၃ ဆင့် ကွင်းမြောင်းများ) */}
          <line x1="108" y1="76" x2="132" y2="76" stroke="#0f172a" strokeWidth="1.2" />
          <line x1="108" y1="80" x2="132" y2="80" stroke="#0f172a" strokeWidth="1.2" />
          <line x1="108" y1="84" x2="132" y2="84" stroke="#0f172a" strokeWidth="1.2" />
          {/* Gudgeon Pin Opening in Piston Skirt */}
          <circle cx="120" cy="91" r="3.5" fill="#020617" stroke="url(#goldGrad)" strokeWidth="0.8" />
        </g>

        {/* 10. Mechanic Tool 2: Precision Torque Wrench (ဆွဲပေါင်ရင့်ချ်) crossing from bottom-right to top-left */}
        <g transform="translate(120, 120) rotate(35) translate(-120, -120)">
          {/* Knurled Handle */}
          <rect x="117" y="105" width="6" height="52" rx="2" fill="url(#goldGrad)" stroke="#78350f" strokeWidth="0.8" />
          {/* Micrometer Torque Scale Markings */}
          <line x1="117" y1="115" x2="123" y2="115" stroke="#451a03" strokeWidth="0.8" />
          <line x1="117" y1="120" x2="123" y2="120" stroke="#451a03" strokeWidth="0.8" />
          <line x1="117" y1="125" x2="123" y2="125" stroke="#451a03" strokeWidth="0.8" />
          <line x1="117" y1="130" x2="123" y2="130" stroke="#451a03" strokeWidth="0.8" />
          <line x1="117" y1="135" x2="123" y2="135" stroke="#451a03" strokeWidth="0.8" />
          {/* Torque Lock Ring at Base */}
          <rect x="116" y="150" width="8" height="5" rx="1.5" fill="url(#chromeGrad)" stroke="#334155" strokeWidth="0.8" />

          {/* Torque Wrench Shaft */}
          <rect x="118" y="76" width="4" height="30" fill="url(#chromeGrad)" stroke="#475569" strokeWidth="0.6" />

          {/* Ratchet Head with Forward/Reverse Lever */}
          <circle cx="120" cy="74" r="8" fill="url(#chromeGrad)" stroke="url(#goldGrad)" strokeWidth="1.3" />
          <rect x="117.5" y="71.5" width="5" height="5" fill="#0f172a" rx="1" />
          <line x1="120" y1="67" x2="120" y2="70" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* 11. Centerpiece: Torque / Pressure Dial Gauge (ပေါင်ဂိတ် - Torque Dial Indicator) */}
        {/* Gauge Outer Ring Bezel */}
        <circle cx="120" cy="120" r="24" fill="#020617" stroke="url(#goldGrad)" strokeWidth="2.5" />
        <circle cx="120" cy="120" r="21" fill="url(#slateRadial)" stroke="#334155" strokeWidth="1" />

        {/* Gauge Calibrated Scale Arc: Safe (Green) -> Warning (Amber) -> Danger (Red) */}
        <path
          d="M 105 130 A 17 17 0 1 1 135 130"
          fill="none"
          stroke="#1e293b"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Green Safe Torque Zone */}
        <path
          d="M 105 130 A 17 17 0 0 1 110 106"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Amber Target Torque Zone */}
        <path
          d="M 110 106 A 17 17 0 0 1 127 106"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.5"
        />
        {/* Red Maximum Zone */}
        <path
          d="M 127 106 A 17 17 0 0 1 135 130"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Radial Measurement Graduations / Ticks on Dial */}
        {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map((deg, idx) => (
          <line
            key={idx}
            x1="120"
            y1="105"
            x2="120"
            y2={idx % 2 === 0 ? "108" : "106.5"}
            stroke={idx % 2 === 0 ? "#fef08a" : "#94a3b8"}
            strokeWidth={idx % 2 === 0 ? "1.2" : "0.7"}
            transform={`rotate(${deg} 120 120)`}
          />
        ))}

        {/* Micro Gauge Label: FT-LB / PSI */}
        <text
          x="120"
          y="114"
          textAnchor="middle"
          fontSize="4.8"
          fontWeight="900"
          fill="#38bdf8"
          letterSpacing="0.8"
          fontFamily="system-ui, sans-serif"
        >
          FT-LB
        </text>
        <text
          x="120"
          y="128"
          textAnchor="middle"
          fontSize="3.8"
          fontWeight="800"
          fill="#94a3b8"
          fontFamily="system-ui, sans-serif"
        >
          ပေါင်ဂိတ်
        </text>

        {/* Gauge Indicator Needle (Pointing precisely to target high-torque angle ~32 deg) */}
        <g transform="rotate(32 120 120)">
          {/* Needle Shadow & Body */}
          <polygon
            points="119,122 120,105 121,122 120,123.5"
            fill="url(#needleGrad)"
            filter="url(#gearGlow)"
          />
          {/* Needle Pivot Cap */}
          <circle cx="120" cy="120" r="3.2" fill="url(#goldGrad)" stroke="#451a03" strokeWidth="0.8" />
          <circle cx="120" cy="120" r="1.2" fill="#ffffff" />
        </g>

        {/* 12. GreatStar Brand Signature Star (Crown Star at 12 o'clock above gauge) */}
        <g transform="translate(120, 61) scale(0.85) translate(-120, -61)">
          {/* 5-pointed 3D Gold Star */}
          <polygon
            points="120,52 122.5,58 128.5,58 123.5,62 125.5,68 120,64 114.5,68 116.5,62 111.5,58 117.5,58"
            fill="url(#goldGrad)"
            stroke="#78350f"
            strokeWidth="0.8"
            filter="url(#gearGlow)"
          />
          <polygon points="120,52 120,64 125.5,68 123.5,62 128.5,58 122.5,58" fill="#fef08a" opacity="0.6" />
        </g>

        {/* Timing Alignment Dot (တိုင်မင်မာကင် Punch Mark Dot '1') */}
        <circle cx="120" cy="73.5" r="1.6" fill="#fde047" stroke="#000000" strokeWidth="0.6" />
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
