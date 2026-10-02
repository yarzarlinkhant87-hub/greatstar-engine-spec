/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AgriEngine } from '../types/engine';
import { Cog, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, Layers } from 'lucide-react';

interface Props {
  engine: AgriEngine;
}

export const TimingGearsTab: React.FC<Props> = ({ engine }) => {
  const [selectedGear, setSelectedGear] = useState<'all' | 'crank' | 'idler' | 'cam' | 'pump' | 'balancer'>('all');

  // Brand-specific gear marking rules
  const getBrandGearInfo = () => {
    switch (engine.brand) {
      case 'kubota':
        if (engine.category === 'single_cylinder') {
          return {
            title: 'Kubota RT / Single Cylinder Timing Marks',
            burmeseTitle: 'ကူဘိုတာ RT လက်တွန်းအင်ဂျင် တိုင်မင်ဂီယာ အမှတ်အသားများ',
            diagramType: 'single_rt',
            marks: [
              { gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)', mark: 'အစက် (၁) စက် (•)', note: 'အလယ်အမှတ်တိုက်ရန်' },
              { gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)', mark: 'အစက် (၂) စက် (••)', note: 'ခရိုင်းရှပ်၏ အစက် (•) ကို ကင်းရှပ်အစက် (••) ကြားသို့ ထည့်သွင်းတိုက်ပါ' },
              { gear: 'ဗလန်ဆာဂီယာ (1st & 2nd Balancer)', mark: 'အစက် (•) သို့မဟုတ် ဂဏန်း', note: 'အင်ဂျင်မတုန်ခါစေရန် Balancer ဝိတ်တုံးအမှတ် သေချာတိုက်ပါ' },
            ],
            backlashStandard: '0.040 - 0.110 mm',
            backlashLimit: '0.150 mm',
            idlerTorque: 'မလို (Direct Crank-to-Cam Mesh)',
            timingRule: 'RT စီးရီး လက်တွန်းအင်ဂျင်များတွင် Crankshaft ဂီယာနှင့် Camshaft ဂီယာသည် တိုက်ရိုက်ထိစပ်လည်ပတ်ပြီး၊ အစက် (•) နှင့် အစက် (••) တိုက်ဆိုင်ရန် အလွန်လွယ်ကူပါသည်။',
          };
        }
        return {
          title: 'Kubota 3 & 4-Cylinder Engine Timing Gear Train',
          burmeseTitle: 'ကူဘိုတာ (L-Series ထွန်စက် & DC ရိတ်ခြွေစက်) တိုင်မင်ဂီယာ စနစ်',
          diagramType: 'multi_kubota',
          marks: [
            { gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)', mark: 'ဂဏန်း "1"', note: 'အလယ်အိုင်ဒလာဂီယာ၏ "1-1" ကြားသို့ တိုက်ပါ' },
            { gear: 'အလယ်အိုင်ဒလာဂီယာ (Idle Gear)', mark: '"1-1", "2-2", "3-3"', note: 'ဂီယာအားလုံးကို ချိတ်ဆက်ပေးသော ပင်မအလယ်ဂီယာကြီးဖြစ်သည်' },
            { gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)', mark: 'ဂဏန်း "2"', note: 'အလယ်အိုင်ဒလာဂီယာ၏ "2-2" ကြားသို့ တိုက်ပါ' },
            { gear: 'ဆီပန့်ဂီယာ (Injection Pump Gear)', mark: 'ဂဏန်း "3"', note: 'အလယ်အိုင်ဒလာဂီယာ၏ "3-3" ကြားသို့ တိုက်ပါ' },
          ],
          backlashStandard: '0.041 - 0.115 mm',
          backlashLimit: '0.150 mm',
          idlerTorque: '40 - 45 Nm (29 - 33 Ft-lb)',
          timingRule: 'အလယ်အိုင်ဒလာဂီယာ (Idle Gear) တွင် "1-1", "2-2", "3-3" ဟူ၍ အမှတ် ၃ နေရာပါရှိပြီး၊ ခရိုင်း (1)၊ ကင်း (2)၊ ဆီပန့် (3) တို့ကို သက်ဆိုင်ရာ နှစ်ထပ်အမှတ်များကြား တိကျစွာ ထည့်သွင်းရမည်။',
        };

      case 'yanmar':
        return {
          title: 'Yanmar 4TNV / 3TNV Engine Timing Gear Train',
          burmeseTitle: 'ယန်မာ (Yanmar TNV & TF စီးရီး) တိုင်မင်ဂီယာ စနစ်',
          diagramType: 'multi_yanmar',
          marks: [
            { gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)', mark: 'အမှတ် "A" (သို့မဟုတ် "1")', note: 'အလယ်အိုင်ဒလာဂီယာ၏ "AA" ကြားသို့ တိုက်ပါ' },
            { gear: 'အလယ်အိုင်ဒလာဂီယာ (Idler Gear)', mark: '"AA", "BB", "CC"', note: 'ပင်မအလယ်ဂီယာကြီးတွင် နှစ်ထပ်အက္ခရာများ ပါရှိသည်' },
            { gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)', mark: 'အမှတ် "B" (သို့မဟုတ် "2")', note: 'အလယ်အိုင်ဒလာဂီယာ၏ "BB" ကြားသို့ တိုက်ပါ' },
            { gear: 'ဆီပန့်ဂီယာ (Fuel Injection Pump)', mark: 'အမှတ် "C" (သို့မဟုတ် "3")', note: 'အလယ်အိုင်ဒလာဂီယာ၏ "CC" ကြားသို့ တိုက်ပါ' },
          ],
          backlashStandard: '0.060 - 0.120 mm',
          backlashLimit: '0.160 mm',
          idlerTorque: '45 - 50 Nm (33 - 37 Ft-lb)',
          timingRule: 'Yanmar TNV အင်ဂျင်များတွင် A/AA, B/BB, C/CC စနစ်ဖြင့် မာ့ခ်တိုက်ရပါမည်။ ဂီယာကစားချက် (Backlash) ကို သံဖတ် (Lead wire) သို့မဟုတ် Dial Gauge ဖြင့် စစ်ဆေးပါ။',
        };

      case 'massey_ferguson':
        return {
          title: 'Massey Ferguson / Perkins Timing Gear Train',
          burmeseTitle: 'မက်ဆီဖာဂူဆန် / Perkins (AD3.152 & 4.248/4.236) တိုင်မင်ဂီယာ စနစ်',
          diagramType: 'multi_perkins',
          marks: [
            { gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)', mark: 'အက္ခရာ "S"', note: 'အလယ်အိုင်ဒလာဂီယာ၏ "S-S" ကြားသို့ တိုက်ပါ' },
            { gear: 'အလယ်အိုင်ဒလာဂီယာ (Idler Gear)', mark: '"S-S", "C-C", "D-D"', note: 'Crank, Cam, DPA Pump သုံးခုစလုံးကို တိုက်ဆိုင်ပေးသည်' },
            { gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)', mark: 'အက္ခရာ "C"', note: 'အလယ်အိုင်ဒလာဂီယာ၏ "C-C" ကြားသို့ တိုက်ပါ' },
            { gear: 'ဆီပန့်ဂီယာ (CAV DPA Pump Gear)', mark: 'အက္ခရာ "D"', note: 'အလယ်အိုင်ဒလာဂီယာ၏ "D-D" ကြားသို့ တိုက်ပါ' },
          ],
          backlashStandard: '0.063 - 0.127 mm (0.0025" - 0.005")',
          backlashLimit: '0.152 mm (0.006")',
          idlerTorque: '65 Nm (48 Ft-lb)',
          timingRule: 'Perkins အင်ဂျင်များတွင် S (Shaft) - SS, C (Cam) - CC, D (DPA Pump) - DD ဟူ၍ မူရင်းစက်ရုံထုတ် အက္ခရာများ တံဆိပ်ရိုက်နှိပ်ထားပါသည်။ MF 385 တွင် အောက်ခံ Balancer ဂီယာအမှတ်များကိုပါ တိုက်ရမည်။',
        };

      case 'ford_newholland':
        return {
          title: 'Ford 5000/6610 & New Holland Timing Train',
          burmeseTitle: 'ဖော့ဒ် / နယူးဟော်လန် တိုင်မင်ဂီယာ စနစ်',
          diagramType: 'multi_ford',
          marks: [
            { gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)', mark: 'အစက် (•) ၁ စက်', note: 'အလယ်အိုင်ဒလာဂီယာ၏ အစက် ၂ စက် (••) ကြားသို့ တိုက်ပါ' },
            { gear: 'အလယ်အိုင်ဒလာဂီယာ (Idler Gear)', mark: 'အစက် (••) ၂ စက်စီ', note: 'ခရိုင်း၊ ကင်းရှပ်နှင့် ဆီပန့်ဂီယာများနှင့် ချိတ်ဆက်ပါ' },
            { gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)', mark: 'အစက် (•) ၁ စက်', note: 'အိုင်ဒလာဂီယာနှင့် အမှတ်တိုက်ပါ' },
            { gear: 'Simms / Bosch ဆီပန့်ဂီယာ', mark: 'အစက် (•) ၁ စက်', note: 'ဆီပန့်ဒရိုက်ဗ်နှင့် အမှတ်တိုက်ပါ' },
          ],
          backlashStandard: '0.050 - 0.120 mm',
          backlashLimit: '0.160 mm',
          idlerTorque: '60 - 65 Nm (45 - 48 Ft-lb)',
          timingRule: 'Ford Diesel အင်ဂျင်များတွင် အစက်အမှတ် (Dots) များ တိကျစွာတိုက်ရမည်။ Simms ပန့်ဒရိုက်ဗ် အထိုင် flange မလွဲစေရန် အထူးဂရုပြုပါ။',
        };

      case 'sonalika_deere':
      default:
        return {
          title: 'John Deere PowerTech & Sonalika Timing System',
          burmeseTitle: 'ဂျွန်ဒီးယား & ဆိုနာလီကာ တိုင်မင်ဂီယာ စနစ်',
          diagramType: 'multi_deere',
          marks: [
            { gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)', mark: 'Timing Dot (•)', note: 'Idler gear timing teeth နှင့် တိုက်ပါ' },
            { gear: 'အလယ်အိုင်ဒလာဂီယာ (Upper & Lower Idler)', mark: 'Double Timing Dots (••)', note: 'ဂီယာသွားများကြား အမှတ်တိုက်ပါ' },
            { gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)', mark: 'Timing Dot (•)', note: 'Idler gear နှင့် တိုက်ပါ' },
            { gear: 'ဆီပန့်ဂီယာ (Fuel Injection Pump)', mark: 'Timing Dot (•)', note: 'ဆီပန့် drive gear နှင့် တိုက်ပါ' },
          ],
          backlashStandard: '0.050 - 0.115 mm',
          backlashLimit: '0.150 mm',
          idlerTorque: '70 Nm (52 Ft-lb)',
          timingRule: 'PowerTech အင်ဂျင်များတွင် Idler gear သွားများကြား သက်ဆိုင်ရာ Crank, Cam, Fuel Pump အမှတ်များ တိကျစွာတိုက်ဆိုင်တပ်ဆင်ရပါမည်။',
        };
    }
  };

  const gearData = getBrandGearInfo();

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Cog className="w-5 h-5 animate-spin-slow" />
            </span>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-100 flex items-center gap-2">
                <span>တိုင်မင်ဂီယာ အလိုင်းမင်း & မာ့ခ်တိုက်နည်း (Timing Gear Alignment)</span>
              </h4>
              <p className="text-xs text-slate-400">
                {gearData.burmeseTitle} • စက်ရုံထုတ် မူရင်းဂီယာသွား အမှတ်အသားများ
              </p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-400 font-bold">
            Backlash: {gearData.backlashStandard}
          </div>
        </div>

        {/* Visual Interactive Timing Gear Diagram */}
        <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 flex flex-col items-center justify-center my-2 relative overflow-hidden shadow-inner">
          <div className="text-[11px] text-slate-400 font-semibold mb-3 flex items-center gap-2">
            <span>⚙️ အင်ဂျင်ရှေ့ဖုံးအတွင်း ဂီယာလည်ပတ်မှု အနေအထား ပြကွက်</span>
          </div>

          {/* SVG Visual Gear Diagram */}
          <div className="w-full max-w-lg aspect-[4/3] bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-2 relative flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
              <defs>
                {/* Gear tooth pattern & glow filters */}
                <filter id="gearGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="gearGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
                <linearGradient id="gearEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="gearTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#0f766e" />
                </linearGradient>
                <linearGradient id="gearSky" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>
              </defs>

              {/* Connecting Mesh Lines */}
              <line x1="200" y1="150" x2="200" y2="245" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="200" y1="150" x2="100" y2="85" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="200" y1="150" x2="300" y2="85" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />

              {/* 1. CENTER IDLER GEAR (အလယ်အိုင်ဒလာဂီယာ) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedGear('idler')}
              >
                <circle
                  cx="200"
                  cy="150"
                  r="52"
                  fill="url(#gearGold)"
                  stroke={selectedGear === 'idler' ? '#fef08a' : '#f59e0b'}
                  strokeWidth={selectedGear === 'idler' ? '4' : '2'}
                  filter="url(#gearGlow)"
                  className="animate-spin-slow origin-[200px_150px]"
                />
                <circle cx="200" cy="150" r="22" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="200" cy="150" r="10" fill="#f59e0b" />
                <text x="200" y="145" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                  IDLER GEAR
                </text>
                <text x="200" y="160" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="900" fontFamily="monospace">
                  {engine.brand === 'kubota' ? '1-1 / 2-2 / 3-3' : engine.brand === 'massey_ferguson' ? 'SS / CC / DD' : 'AA / BB / CC'}
                </text>
              </g>

              {/* 2. BOTTOM CRANKSHAFT GEAR (ခရိုင်းရှပ်ဂီယာ) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedGear('crank')}
              >
                <circle
                  cx="200"
                  cy="245"
                  r="38"
                  fill="url(#gearEmerald)"
                  stroke={selectedGear === 'crank' ? '#a7f3d0' : '#10b981'}
                  strokeWidth={selectedGear === 'crank' ? '4' : '2'}
                />
                <circle cx="200" cy="245" r="16" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <circle cx="200" cy="245" r="7" fill="#10b981" />
                <text x="200" y="242" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                  CRANKSHAFT
                </text>
                <text x="200" y="255" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="900" fontFamily="monospace">
                  {engine.brand === 'kubota' ? 'Mark [ 1 ]' : engine.brand === 'massey_ferguson' ? 'Mark [ S ]' : 'Mark [ A ]'}
                </text>
                {/* Mesh Tag */}
                <rect x="180" y="196" width="40" height="15" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="1" />
                <text x="200" y="207" textAnchor="middle" fill="#ecfdf5" fontSize="8" fontWeight="bold">
                  MESH 1
                </text>
              </g>

              {/* 3. TOP-LEFT CAMSHAFT GEAR (ကင်းရှပ်ဂီယာ) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedGear('cam')}
              >
                <circle
                  cx="100"
                  cy="85"
                  r="45"
                  fill="url(#gearTeal)"
                  stroke={selectedGear === 'cam' ? '#99f6e4' : '#14b8a6'}
                  strokeWidth={selectedGear === 'cam' ? '4' : '2'}
                />
                <circle cx="100" cy="85" r="18" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                <circle cx="100" cy="85" r="8" fill="#14b8a6" />
                <text x="100" y="82" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                  CAMSHAFT
                </text>
                <text x="100" y="95" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="900" fontFamily="monospace">
                  {engine.brand === 'kubota' ? 'Mark [ 2 ]' : engine.brand === 'massey_ferguson' ? 'Mark [ C ]' : 'Mark [ B ]'}
                </text>
                {/* Mesh Tag */}
                <rect x="135" y="105" width="40" height="15" rx="4" fill="#115e59" stroke="#2dd4bf" strokeWidth="1" />
                <text x="155" y="116" textAnchor="middle" fill="#f0fdfa" fontSize="8" fontWeight="bold">
                  MESH 2
                </text>
              </g>

              {/* 4. TOP-RIGHT INJECTION PUMP GEAR (ဆီပန့်ဂီယာ) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedGear('pump')}
              >
                <circle
                  cx="300"
                  cy="85"
                  r="45"
                  fill="url(#gearSky)"
                  stroke={selectedGear === 'pump' ? '#bae6fd' : '#38bdf8'}
                  strokeWidth={selectedGear === 'pump' ? '4' : '2'}
                />
                <circle cx="300" cy="85" r="18" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="300" cy="85" r="8" fill="#38bdf8" />
                <text x="300" y="82" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                  INJECTION PUMP
                </text>
                <text x="300" y="95" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="900" fontFamily="monospace">
                  {engine.brand === 'kubota' ? 'Mark [ 3 ]' : engine.brand === 'massey_ferguson' ? 'Mark [ D ]' : 'Mark [ C ]'}
                </text>
                {/* Mesh Tag */}
                <rect x="225" y="105" width="40" height="15" rx="4" fill="#075985" stroke="#38bdf8" strokeWidth="1" />
                <text x="245" y="116" textAnchor="middle" fill="#f0f9ff" fontSize="8" fontWeight="bold">
                  MESH 3
                </text>
              </g>
            </svg>
          </div>

          <p className="text-[11px] text-slate-400 mt-3 text-center">
            💡 ဂီယာဝိုင်းတစ်ခုချင်းစီကို နှိပ်၍ သက်ဆိုင်ရာ မာ့ခ်တိုက်ဆိုင်ပုံနှင့် အချက်အလက်များကို အသေးစိတ်ကြည့်ရှုနိုင်ပါသည်။
          </p>
        </div>

        {/* Timing Marks Table */}
        <div className="space-y-2 mt-4">
          <h5 className="font-bold text-xs text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>တိုက်ဆိုင်ရမည့် မာ့ခ်အမှတ်အသားများ ဇယား (Timing Marks Table):</span>
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {gearData.marks.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-bold text-xs text-slate-200">{item.gear}</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-mono font-black text-xs border border-amber-400/30">
                    {item.mark}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Backlash & Idler Bolt Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">ဂီယာကစားချက် (Backlash Standard)</span>
            <span className="text-base font-black text-emerald-400 font-mono">{gearData.backlashStandard}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Limit: {gearData.backlashLimit}</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">အိုင်ဒလာဂီယာဆွဲပေါင် (Idler Bolt Torque)</span>
            <span className="text-base font-black text-amber-300 font-mono">{gearData.idlerTorque}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Thread Locker သုတ်ပြီးဆွဲပါ</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">ဘေးရွေ့ကစားချက် (Idler End Play)</span>
            <span className="text-base font-black text-sky-400 font-mono">0.050 - 0.150 mm</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Thrust collar ကင်းလွတ်ခွာ</span>
          </div>
        </div>

        {/* Important Rule Callout */}
        <div className="mt-4 p-3.5 bg-gradient-to-r from-amber-950/40 to-slate-950 rounded-xl border border-amber-500/40 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="text-amber-300">ဝပ်ရှော့ လက်တွေ့ အထူးသတိပြုရန်:</strong>
            <p className="text-slate-300 text-[11px] mt-1">
              {gearData.timingRule} တိုင်မင်ဂီယာ တပ်ဆင်ပြီးတိုင်း ခရိုင်းရှပ်ကို လက်ဖြင့် ၂ ပတ် (720°) လှည့်ကြည့်ပြီး ပစ္စတင်နှင့် ဗားလ် ထိခတ်မှု မရှိစေရန် စစ်ဆေးပြီးမှသာ အင်ဂျင်ရှေ့ဖုံး (Timing Cover) ကို ပိတ်တပ်ရပါမည်။
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
