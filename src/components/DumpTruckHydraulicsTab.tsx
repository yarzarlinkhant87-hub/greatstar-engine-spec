import React, { useState } from 'react';
import {
  Truck,
  Wind,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Gauge,
  Sliders,
  HelpCircle,
  Wrench,
  ShieldAlert,
} from 'lucide-react';
import { AgriEngine } from '../types/engine';

interface DumpTruckHydraulicsTabProps {
  currentEngine: AgriEngine;
}

export const DumpTruckHydraulicsTab: React.FC<DumpTruckHydraulicsTabProps> = ({ currentEngine }) => {
  const [activeSubTab, setActiveSubTab] = useState<'splitter' | 'hydraulics' | 'troubleshooting'>('splitter');

  const hydraulics = currentEngine.dumpHydraulics || {
    pumpModel: 'KP1405A / KP75B Heavy Dump Gear Pump',
    systemPressureBar: '140 - 180 bar (14 - 18 MPa)',
    ptoGearboxRatio: 'Pneumatic Air-Controlled PTO (ဒန့်လေခလုတ်မောင်း)',
    valveType: 'Hyva / Directional 4-Way Proportional Tipping Valve',
    oilCapacityLiters: 45.0,
    oilGrade: 'ISO VG 46 Anti-Wear Hydraulic Oil',
    cylinderBoreStroke: 'Multi-stage Telescopic Front-end Hydraulic Ram',
    troubleshootingTips: [
      'ဒန့်မကြွခြင်း: PTO မချိတ်မိခြင်း (လေဖိအားမပြည့်၍ ကလပ်မပွင့်ခြင်း) သို့မဟုတ် Hydraulic Oil နည်းနေခြင်း',
      'ဒန့်ကြွပြီး ပြန်မကျခြင်း: Return Valve (အပြန်ဗား) တွင် အမှိုက်ပိတ်နေခြင်း သို့မဟုတ် လေခလုတ် လျှောကျမရခြင်း',
      'ဒန့်တုန်ခါပြီး တက်ခြင်း: စနစ်ထဲသို့ လေခိုနေခြင်း (Air trapped in cylinder) - လေဖျောက်နတ် ဖွင့်၍ လေထုတ်ပါ',
    ],
  };

  const splitter = currentEngine.pneumaticSplitter || {
    gearboxModel: 'Fast Gearbox (8JS85, 9JS119, 10JSD120, 12JS160T)',
    systemPressureRange: '6.5 - 8.5 bar (0.65 - 0.85 MPa)',
    doubleHValveSpec: 'Double-H Pneumatic Valve (5-Port / 4-Port Air Distribution)',
    rangeCylinderStroke: 'High/Low Range Shift Cylinder (အနှေး/အမြန် လေကွဲဆလင်ဒါ)',
    clutchInterlockValve: 'Clutch Pedal Air Interlock Valve (ကလပ်နင်းမှသာ လေကွဲရိုက်စေသော လုံခြုံရေးဗား)',
    troubleshootingAirLeaks: [
      'လေကွဲ မကျခြင်း (High မှ Low မပြောင်းခြင်း): လေဖိအား 6.5 bar မပြည့်ခြင်း သို့မဟုတ် Clutch Interlock Switch မထိခြင်း',
      'လေထိုးသံ (Hissing sound) တောက်လျှောက် ထွက်နေခြင်း: Range Cylinder အတွင်းရှိ Piston O-Ring ပျက်စီးပြီး လေကျွံနေခြင်း',
      'ဂီယာ လေကွဲဗားခေါင်း (Double-H Valve) လေပြန်ထွက်ခြင်း: လေပိုက်လိုင်း အဝင်/အထွက် မှားယွင်းတပ်ဆင်ထားခြင်း',
      'ဂီယာဝင်ရခက်ခြင်း: လေကွဲဆလင်ဒါ ချောဆီခမ်းခြောက်နေသဖြင့် အထူးဆီဖြန်းပေးပြီး O-ring အသစ်လဲပါ',
    ],
  };

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setActiveSubTab('splitter')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
            activeSubTab === 'splitter'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>"လေကွဲ" စနစ် (Fast Gearbox)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('hydraulics')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
            activeSubTab === 'hydraulics'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>ဒန့်ဟိုက်ဒရောလစ် (KP Pump & Valve)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('troubleshooting')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
            activeSubTab === 'troubleshooting'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>ဝပ်ရှော့ပ် ပြဿနာရှာဖွေဖြေရှင်းနည်း</span>
        </button>
      </div>

      {/* Subtab 1: Fast Gearbox "လေကွဲ" စနစ် */}
      {activeSubTab === 'splitter' && (
        <div className="space-y-4 animate-fade-in">
          {/* Header Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/20 border border-amber-500/30">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Fast Gearbox Pneumatic Range Shift System
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-100 mt-1">
                  တရုတ်ကားကြီးများ၏ "လေကွဲ" (High/Low Range) စနစ် လက်စွဲ
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Fast 8JS85, 9JS119, 10JSD120, 12JS160T ဂီယာဘောက်စ်များတွင် အနှေး (Low Range) နှင့် အမြန် (High Range) ကို လေဖိအားသုံး လေကွဲဆလင်ဒါ (Shift Cylinder) ဖြင့် ခွဲခြားမောင်းနှင်ပုံ။
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
                <Wind className="w-6 h-6" />
              </div>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">သတ်မှတ် လေဖိအား</span>
                <span className="text-amber-300 font-mono font-black text-sm">{splitter.systemPressureRange}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">(6.5 bar မပြည့်ပါက လေကွဲမရိုက်ရ)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">လေကွဲဗားခေါင်း စနစ်</span>
                <span className="text-sky-400 font-bold text-xs">{splitter.doubleHValveSpec}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Port 1 (အဝင်), Port 21/22 (အထွက်)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">ကလပ် လုံခြုံရေးဗား</span>
                <span className="text-emerald-400 font-bold text-xs">{splitter.clutchInterlockValve}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">ကလပ်နင်းမှသာ လေစီးဆင်းခွင့်ပြုသည်</span>
              </div>
            </div>
          </div>

          {/* Double-H Valve Diagram & Piping Logic */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-extrabold text-sm text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>လေကွဲဗား (Double-H Valve) လေပိုက် ၅ ပင် ဆင်ပုံ လမ်းညွှန်:</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-amber-300 block">၁။ Port 1 (Main Air In - လေပင်မအဝင်)</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  လေအိုး (Air Reservoir) မှ ၈ ဘား လေဖိအား တိုက်ရိုက် ရောက်ရှိသော ပင်မပိုက်လိုင်း။
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-sky-300 block">၂။ Port 21 (Low Range Out - အနှေးဂီယာ လိုင်း)</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  ဂီယာတံကို 1-4 အကွက်သို့ ရွှေ့လိုက်ပါက လေကွဲဆလင်ဒါ၏ အနောက်ဘက်သို့ လေတွန်းပို့ပေးသောလိုင်း။
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-emerald-300 block">၃။ Port 22 (High Range Out - အမြန်ဂီယာ လိုင်း)</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  ဂီယာတံကို 5-8 အကွက်သို့ ဖြတ်ကျော်လိုက်ပါက လေကွဲဆလင်ဒါ၏ အရှေ့ဘက်သို့ လေတွန်းပို့ပေးသောလိုင်း။
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="font-bold text-rose-300 block">၄။ Port 3 (Exhaust Vent - လေထွက်ပေါက်)</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  လေကွဲရိုက်ပြီးတိုင်း အဟောင်းလေကို အပြင်သို့ တစ်ချက် ရှူးခနဲ မှုတ်ထုတ်ပေးသော လေထွက်ပေါက်။
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Dump Hydraulics (KP Pump & Valve) */}
      {activeSubTab === 'hydraulics' && (
        <div className="space-y-4 animate-fade-in">
          {/* Header Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/20 border border-amber-500/30">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Heavy Dump Truck Tipping Hydraulics
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-100 mt-1">
                  ဒန့်ပန့် (KP1405 / KP75B) နှင့် ဟိုက်ဒရောလစ် ရိတ်မ စနစ်
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  မြေတင်၊ ကျောက်တင်၊ သဲတင် ဒန့်ကားကြီးများအတွက် သတ်မှတ် ဖိအား၊ PTO မောင်းဂီယာနှင့် လေခလုတ်မောင်း Tipping Valve ချိန်ညှိနည်း။
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
            </div>

            {/* Spec Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">ဒန့်ပန့်မော်ဒယ်</span>
                <span className="text-amber-300 font-bold text-xs">{hydraulics.pumpModel}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">စနစ်ဖိအား</span>
                <span className="text-sky-400 font-bold text-xs">{hydraulics.systemPressureBar}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">PTO ခလုတ်</span>
                <span className="text-emerald-400 font-bold text-xs">{hydraulics.ptoGearboxRatio}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">ဟိုက်ဒရောလစ်ဝိုင်</span>
                <span className="text-yellow-400 font-bold text-xs">{hydraulics.oilGrade}</span>
              </div>
            </div>
          </div>

          {/* Operation Stages */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-extrabold text-sm text-slate-200">
              ဒန့်ခလုတ် လေဗား (Tipping Valve) အဆင့် ၃ ဆင့် လည်ပတ်ပုံ:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>၁။ RAISE (ဒန့်ကြွမောင်း)</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  PTO ချိတ်ထားစဉ် လေခလုတ်အား အပေါ်သို့တင်ပါက ဆီလမ်းကြောင်းပွင့်ပြီး ဒန့်ပလန်ဂျာဆီသို့ 160 bar ဖြင့် ထိုးတက်စေသည်။
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Sliders className="w-4 h-4" />
                  <span>၂။ HOLD (ကြားရပ်/ထိန်းထား)</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  ခလုတ်အား အလယ်တွင် ထားပါက Check Valve မှ ဆီလမ်းကြောင်း ပိတ်ဆို့ပြီး ဒန့်ခွက်အား လိုချင်သည့် အမြင့်တွင် ရပ်တန့်ငြိမ်သက်စေသည်။
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                  <Gauge className="w-4 h-4" />
                  <span>၃။ LOWER (ဒန့်ပြန်ချမောင်း)</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  ခလုတ်အား အောက်သို့ ချလိုက်ပါက Return Valve ပွင့်သွားပြီး ဆီများ ဆီတိုင်ကီထဲသို့ ပြန်လည်စီးဝင်ကာ ဒန့်ခွက် ညင်သာစွာ ပြန်ကျစေသည်။
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Workshop Troubleshooting */}
      {activeSubTab === 'troubleshooting' && (
        <div className="space-y-4 animate-fade-in">
          {/* Splitter Troubleshooting */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-extrabold text-sm text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>"လေကွဲ" အဖြစ်များသော ပြဿနာများနှင့် ဖြေရှင်းနည်းများ:</span>
            </h4>

            <div className="space-y-2.5">
              {splitter.troubleshootingAirLeaks.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dump Hydraulics Troubleshooting */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-extrabold text-sm text-sky-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-sky-400" />
              <span>ဒန့်ဟိုက်ဒရောလစ် အဖြစ်များသော ပြဿနာများနှင့် ဖြေရှင်းနည်းများ:</span>
            </h4>

            <div className="space-y-2.5">
              {hydraulics.troubleshootingTips.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
