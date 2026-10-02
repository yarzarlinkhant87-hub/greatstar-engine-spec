/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AgriEngine } from '../types/engine';
import {
  Wrench,
  Fuel,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Sliders,
  Droplets,
  Flame,
  Gauge,
  Activity,
  Layers,
} from 'lucide-react';

interface Props {
  engine: AgriEngine;
}

export const DiagnosticsTab: React.FC<Props> = ({ engine }) => {
  const [activeSubTab, setActiveSubTab] = useState<'smoke' | 'nostart' | 'bleeding' | 'hydraulic' | 'clutch'>('smoke');

  return (
    <div className="space-y-4">
      {/* Sub-navigation bar inside Diagnostics */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shadow-lg">
        <button
          onClick={() => setActiveSubTab('smoke')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === 'smoke'
              ? 'bg-amber-400 text-slate-950 shadow'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>၁။ မီးခိုးအရောင် စစ်ဆေးခြင်း</span>
        </button>

        <button
          onClick={() => setActiveSubTab('nostart')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === 'nostart'
              ? 'bg-red-400 text-slate-950 shadow'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>၂။ စက်နှိုးမရခြင်း (No-Start)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('bleeding')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === 'bleeding'
              ? 'bg-emerald-400 text-slate-950 shadow'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Fuel className="w-3.5 h-3.5" />
          <span>၃။ ဆီလိုင်းလေဖောက်နည်း</span>
        </button>

        <button
          onClick={() => setActiveSubTab('hydraulic')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === 'hydraulic'
              ? 'bg-teal-400 text-slate-950 shadow'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>၄။ ဟိုက်ဒရောလစ် & ထွန်ချိတ်</span>
        </button>

        <button
          onClick={() => setActiveSubTab('clutch')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeSubTab === 'clutch'
              ? 'bg-sky-400 text-slate-950 shadow'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>၅။ ကလပ်ပြား & PTO</span>
        </button>
      </div>

      {/* SUB-TAB 1: SMOKE COLOR DIAGNOSIS */}
      {activeSubTab === 'smoke' && (
        <div className="space-y-3.5">
          {/* Black Smoke */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-slate-100 font-bold">
              <span className="w-3 h-3 rounded-full bg-slate-400 border border-slate-200" />
              <h4 className="text-sm sm:text-base text-slate-100">
                💨 မီးခိုးနက်ထွက်ခြင်း (Black Smoke) - ဆီများပြီး လေမလုံလောက်ခြင်း
              </h4>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              လောင်စာဆီ အလွန်အကျွံဝင်ပြီး အောက်ဆီဂျင် လေမလုံလောက်သဖြင့် လောင်ကျွမ်းမှု မပြည့်ဝသောအခါ ကာဗွန်မီးခိုးနက် ထွက်လာခြင်း ဖြစ်သည်။
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <strong className="text-amber-400 block mb-1">ဖြစ်နိုင်သော အကြောင်းရင်းများ:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                  <li>လေစစ်အိုး (Air Filter) ဖုန်ပိတ်ဆို့နေခြင်း</li>
                  <li>နော်ဇယ်ဆီပေါက် ချေးတင်ခြင်း သို့မဟုတ် နော်ဇယ်ဆီဖြန်းပေါင် (Opening Pressure) ကျနေခြင်း</li>
                  <li>ဆီပန့်မီးလောလွန်းခြင်း (Injection Timing Over-Advanced)</li>
                  <li>တာဘိုပါသော အင်ဂျင်များတွင် Boost Pressure လေဖိအားကျနေခြင်း</li>
                  <li>ထွန်စက်/ရိတ်ခြွေစက် ဝန်လွန်ကဲစွာ မောင်းနှင်နေရခြင်း (Engine Overloading)</li>
                </ul>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <strong className="text-emerald-400 block mb-1">စစ်ဆေးပြုပြင်နည်း အဆင့်ဆင့်:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                  <li>လေစစ်အိုးကို လေမှုတ်သန့်စင်ပါ (လိုအပ်ပါက အသစ်လဲပါ)</li>
                  <li>နော်ဇယ် ဖြုတ်စစ်ပြီး စက်ရုံထုတ်ပေါင်ချိန်အတိုင်း Nozzle Tester ဖြင့် ပြန်ချိန်ပါ</li>
                  <li>ဆီပန့်မီးချိန် ဒီဂရီကို စက်ရုံထုတ်အမှတ်အတိုင်း ပြန်လည်တိုက်ဆိုင်ပါ</li>
                  <li>အင်တာကူလာနှင့် လေပိုက်လိုင်းများ လေယိုစိမ့်မှု မရှိစေရန် စစ်ဆေးပါ</li>
                </ul>
              </div>
            </div>
          </div>

          {/* White Smoke */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-slate-100 font-bold">
              <span className="w-3 h-3 rounded-full bg-white shadow-sm" />
              <h4 className="text-sm sm:text-base text-slate-100">
                ☁️ မီးခိုးဖြူထွက်ခြင်း (White Smoke) - ဆီမလောင်ခြင်း သို့မဟုတ် ရေငွေ့ပါခြင်း
              </h4>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              ဒီဇယ်ဆီ လုံးဝမလောင်ဘဲ အငွေ့ပျံထွက်လာခြင်း သို့မဟုတ် ရေတိုင်ကီရေ ဆလင်ဒါထဲသို့ စိမ့်ဝင်လောင်ကျွမ်းခြင်း ဖြစ်သည်။
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <strong className="text-amber-400 block mb-1">ဖြစ်နိုင်သော အကြောင်းရင်းများ:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                  <li>ဆီပန့်မီးချိန် နောက်ကျလွန်းခြင်း (Timing Retarded)</li>
                  <li>ဆလင်ဒါခေါင်း ဂက်စကတ် (Head Gasket) ကျွံ၍ ရေတိုင်ကီရေ ဆလင်ဒါထဲဝင်ခြင်း</li>
                  <li>ဆလင်ဒါအပူချိန် အလွန်အေးနေခြင်း (စက်နှိုးစ အချိန်)</li>
                  <li>မီးပလပ် (Glow Plug / Intake Heater) အပူမပေးနိုင်ခြင်း</li>
                  <li>ဖိသိပ်အား (Compression Pressure) အလွန်အမင်း ကျဆင်းနေခြင်း</li>
                </ul>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <strong className="text-emerald-400 block mb-1">စစ်ဆေးပြုပြင်နည်း အဆင့်ဆင့်:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                  <li>ရေတိုင်ကီရေလျော့မလျော့ နှင့် ရေတိုင်ကီအဖုံးဖွင့်ပြီး လေပူဖောင်းထွက်မထွက် စစ်ဆေးပါ</li>
                  <li>ဆီပန့်ချိန်ညှိ ရှမ်ပြား (Shims) ဖြင့် မီးချိန်ဒီဂရီ ပြန်ချိန်ပါ</li>
                  <li>မီးပလပ် (Glow Plug) တစ်ချောင်းချင်းစီ၏ မီတာ Ohm နှင့် 12V ရောက်မရောက် စစ်ဆေးပါ</li>
                  <li>ခေါင်းဂက်စကတ် ကျွံပါက ဆလင်ဒါခေါင်းဆွဲပေါင် စံချိန်အတိုင်း ဂက်စကတ်အသစ်ဖြင့် အစားထိုးပါ</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Blue Smoke */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-slate-100 font-bold">
              <span className="w-3 h-3 rounded-full bg-sky-400 shadow-sm" />
              <h4 className="text-sm sm:text-base text-slate-100">
                🌫️ မီးခိုးပြာထွက်ခြင်း (Blue Smoke) - အင်ဂျင်ဝိုင် လောင်ကျွမ်းခြင်း
              </h4>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              အင်ဂျင်ဝိုင် (Engine Oil) သည် ဆလင်ဒါလောင်ခန်းထဲသို့ ဝင်ရောက်ပြီး ဒီဇယ်ဆီနှင့်အတူ လောင်ကျွမ်းနေခြင်း ဖြစ်သည်။
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <strong className="text-amber-400 block mb-1">ဖြစ်နိုင်သော အကြောင်းရင်းများ:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                  <li>ပစ္စတင်ကွင်း (Piston Oil Rings) စားခြင်း၊ ဂျိုးကပ်ခြင်း သို့မဟုတ် ပြတ်ခြင်း</li>
                  <li>ဆလင်ဒါလိုင်နာ (Liner / Sleeve) အတွင်းသား ခြစ်ရာထင်ပြီး ပါးသွားခြင်း</li>
                  <li>ဘားဆီးလ် (Valve Stem Oil Seal) မာကြောပေါက်ပြဲ၍ အပေါ်မှ ဝိုင်ကျခြင်း</li>
                  <li>တာဘိုအင်ဂျင်များတွင် Turbo Shaft Seal ပေါက်၍ တာဘိုမှတစ်ဆင့် ဝိုင်ဝင်ခြင်း</li>
                  <li>အင်ဂျင်ဝိုင် ပမာဏ အလွန်အကျွံ များနေခြင်း</li>
                </ul>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <strong className="text-emerald-400 block mb-1">စစ်ဆေးပြုပြင်နည်း အဆင့်ဆင့်:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                  <li>ဒီပစတစ် (Dipstick) ဖြင့် ဝိုင်ပမာဏ F အမှတ်ထက် မကျော်အောင် စစ်ဆေးပါ</li>
                  <li>ဆလင်ဒါခေါင်းဖြုတ်ပြီး Valve Guide နှင့် Valve Stem Seal အသစ် လဲလှယ်ပါ</li>
                  <li>ကွန်ပရက်ရှင် ဖိအားစစ်ဆေးပြီး လိုအပ်ပါက ပစ္စတင်ကွင်းနှင့် လိုင်နာ အသစ်လဲပါ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CRANK BUT WON'T START */}
      {activeSubTab === 'nostart' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <span className="p-2 rounded-xl bg-red-500/20 text-red-400">
              <AlertCircle className="w-5 h-5" />
            </span>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-100">
                စက်နှိုးမရခြင်း စစ်ဆေးနည်း (Crank but No Start Diagnostic Flow)
              </h4>
              <p className="text-xs text-slate-400">
                စတာတာမော်တာလည်ပြီး စက်လုံးဝနှိုးမရသည့်အခါ စစ်ဆေးရမည့် အဆင့် (၄) ဆင့်
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                ၁
              </span>
              <div className="space-y-1 text-xs">
                <strong className="text-slate-100 block">ဆီဖြတ် Solenoid Valve စစ်ဆေးပါ:</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  သော့ဖွင့်ချိန်တွင် ဆီပန့်ပေါ်ရှိ Stop Solenoid မှ "ကလစ်" အသံမြည်မမြည် စစ်ဆေးပါ။ Solenoid ပျက်နေပါက သို့မဟုတ် မီးမရောက်ပါက ဆီလမ်းကြောင်းပိတ်နေသဖြင့် စက်လုံးဝနှိုးမည် မဟုတ်ပါ။
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                ၂
              </span>
              <div className="space-y-1 text-xs">
                <strong className="text-slate-100 block">ဆီလိုင်းအတွင်း လေခိုနေခြင်း ရှိမရှိ စစ်ဆေးပါ:</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  ဆီကုန်သွားပြီးမှ ဆီပြန်ဖြည့်ထားခြင်း သို့မဟုတ် ဆီစစ်ဗူးလဲထားပါက လေခိုနေတတ်ပါသည်။ ဆီစစ်ဗူးနှင့် ဆီပန့်ပေါ်ရှိ လေထုတ်ဝက်အူ (Bleed Screw) ကို လျှော့ပြီး လက်ညှစ်ပန့်ဖြင့် ဆီကြည်ထွက်လာသည်အထိ လေဖောက်ပေးပါ။
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                ၃
              </span>
              <div className="space-y-1 text-xs">
                <strong className="text-slate-100 block">နော်ဇယ်ပိုက်ထိပ် ဆီတက်အား စစ်ဆေးပါ:</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  နော်ဇယ်ဆီပိုက်ခေါင်း (17mm Nut) ကို အနည်းငယ် လျှော့ထားပြီး စက်နှိုးခလုတ်ကို လှည့်ကြည့်ပါ။ ဆီသည် ပန်းထွက်သည့် အားပြင်းပြင်းဖြင့် ထွက်မထွက် စစ်ဆေးပါ။ ဆီမတက်ပါက ဆီပန့်ပလန်ဂျာ သို့မဟုတ် Feed pump စစ်ဆေးရမည်။
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                ၄
              </span>
              <div className="space-y-1 text-xs">
                <strong className="text-slate-100 block">ဘားကင်းလွတ်ခွာ (Valve Clearance) စစ်ဆေးပါ:</strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  ဘားများ ကပ်နေပါက (Valve tight) ဖိသိပ်အား (Compression) လျော့နည်းပြီး စက်နှိုးခက်တတ်ပါသည်။ အင်ဂျင်အေးချိန်တွင် စက်ရုံထုတ် ဘားကင်းလွတ်ခွာ စံချိန် (0.20 ~ 0.30 mm) အတိုင်း ပြန်လည်ညှိပေးပါ။
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: FUEL BLEEDING MANUAL */}
      {activeSubTab === 'bleeding' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Fuel className="w-5 h-5" />
            </span>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-100">
                ဆီလိုင်းလေဖောက်နည်း စနစ်များ (Fuel Bleeding Procedures)
              </h4>
              <p className="text-xs text-slate-400">
                မော်ဒယ်အလိုက် စက်ရုံထုတ် မူရင်းလေထုတ်စနစ် အသေးစိတ်
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kubota & Yanmar Method */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-xs text-amber-300 block">
                🚜 Kubota (L-Series/DC) & Yanmar စနစ်:
              </span>
              <ol className="list-decimal pl-4 space-y-1.5 text-[11px] text-slate-300 leading-relaxed">
                <li>ဆီတိုင်ကီတွင် ဒီဇယ်ဆီ အပြည့်နီးပါး ထည့်သွင်းထားပါ။</li>
                <li>ဆီစစ်ဗူးအပေါ်ရှိ လေထုတ်ခလုတ် (Cock) သို့မဟုတ် Bleed screw ကို ဖွင့်ပါ။</li>
                <li>ဆီဖိပန့် (Hand Primer Pump) ကို လက်ဖြင့် ညှစ်ပေးပြီး ပူဖောင်းမပါဘဲ ဆီကြည်ထွက်လာပါက ပြန်ပိတ်ပါ။</li>
                <li>ဆီပန့်ထိပ်ရှိ လေထုတ်ဝက်အူကို ဖွင့်ပြီး ဆီထပ်မံညှစ်ပါ။</li>
                <li>နောက်ဆုံးအဆင့်အဖြစ် နော်ဇယ်ဆီပိုက်ခေါင်း (17mm) များကို လျှော့ထားကာ စက်ကို ၅ စက္ကန့်ခန့် နှိုးလည်ပြီး ပြန်ကျပ်ပါ။</li>
              </ol>
            </div>

            {/* Massey Ferguson Perkins CAV DPA Method */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-xs text-emerald-300 block">
                🚜 Massey Ferguson (Lucas CAV DPA Pump) စနစ်:
              </span>
              <ol className="list-decimal pl-4 space-y-1.5 text-[11px] text-slate-300 leading-relaxed">
                <li>CAV DPA ဆီပန့်ပေါ်တွင် အောက်ခြေ Bleed Screw (8mm/5/16") နှင့် အပေါ်ခေါင်း Bleed Screw ၂ နေရာ ပါရှိပါသည်။</li>
                <li>ပထမဆုံး ဆီစစ်ခွက် (Fuel Filter) ထိပ်ရှိ လေထုတ်ဝက်အူကို အရင်ဆုံး လေဖောက်ပါ။</li>
                <li>ထို့နောက် CAV ဆီပန့် အောက်ခြေဝက်အူကို ဖွင့်ပြီး Lift pump လက်မောင်းဖြင့် ညှစ်ကာ ဆီကြည်ထွက်လျှင် ပြန်ပိတ်ပါ။</li>
                <li>ဒုတိယအဆင့်အဖြစ် ဆီပန့် အပေါ်ခေါင်းရှိ ဝက်အူကို ဆက်လက်လေဖောက်ပါ။</li>
                <li>နောက်ဆုံးတွင် နော်ဇယ်ခေါင်း ၂ လုံးကို လျှော့ပြီး စက်နှိုးလည်ကာ ဆီပန်းထွက်လာချိန် ပြန်ကျပ်ပါ။</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: HYDRAULIC & 3-POINT HITCH */}
      {activeSubTab === 'hydraulic' && (
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
                <Activity className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-slate-100">
                  ဟိုက်ဒရောလစ် မိန်းပန့် အလုပ်လုပ်ပုံ & Relief Valve ဖိအားချိန်နည်း
                </h4>
                <p className="text-xs text-slate-400">
                  Main Hydraulic Pump & Relief Valve Pressure Adjustment System
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono text-xs font-bold hidden sm:inline-block">
              175 - 200 bar (2,500 - 2,900 psi)
            </span>
          </div>

          {/* Quick Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">ပင်မဖိအား (Relief Valve Pressure)</span>
              <span className="text-base font-black text-amber-300 font-mono">175 - 195 bar</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">2,500 - 2,830 psi</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">ဟိုက်ဒရောလစ်ဆီ စံချိန် (Oil Spec)</span>
              <span className="text-base font-black text-emerald-400 font-mono">UTTO / Super UDT</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Wet Brake အတွက် သီးသန့်ဆီ</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">ဆီစစ်ဇကာ သန့်စင်ရန်ကာလ</span>
              <span className="text-base font-black text-sky-400 font-mono">နာရီ ၃၀၀ - ၄၀၀</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Suction Filter & Magnet</span>
            </div>
          </div>

          {/* Part 1: How the Hydraulic Main Pump Works (အလုပ်လုပ်ပုံ) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
            <h5 className="font-bold text-xs text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>၁။ ဟိုက်ဒရောလစ်မိန်းပန့် အလုပ်လုပ်ပုံ (How Main Pump Works):</span>
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80">
                <strong className="text-teal-300 block mb-1">၁။ ဆီစုပ်တင်ခြင်း (Suction):</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  အင်ဂျင်လည်တာနဲ့ တပြိုင်နက် Timing Gear မှ မောင်းနှင်သော Hydraulic Gear Pump သည် ဂီယာဘောက်အောက်ခြေမှ ဆီကို ဆီစစ်ဇကာ (Suction Filter) မှတစ်ဆင့် စုပ်တင်ပါသည်။
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80">
                <strong className="text-teal-300 block mb-1">၂။ ဖိအားဖြစ်ပေါ်ခြင်း (Pressure):</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  ဂီယာသွား ၂ ခု ကြားမှ ဆီကို အဆက်မပြတ် တွန်းပို့ပါသည်။ ထွန်ချိတ်ဆလင်ဒါ သို့မဟုတ် ပါဝါစတီယာရင် ဝန်နှင့် တွေ့သောအခါ ဖိအားမြင့်တက်ပြီး ဝန်ကို မတင်ပေးပါသည်။
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80">
                <strong className="text-teal-300 block mb-1">၃။ Relief Valve ထိန်းညှိခြင်း:</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  ထွန်အဆုံးထိ ရောက်ချိန် သို့မဟုတ် ဝန်လွန်ကဲချိန်တွင် ပိုက်လိုင်းနှင့် ပန့်မကွဲစေရန် သတ်မှတ်ဖိအား (185 bar) ရောက်သည်နှင့် ပိုလျှံဆီကို ဂီယာဘောက်ထဲသို့ ဘေးကင်းစွာ ပြန်လွှဲပေး (Bypass) ပါသည်။
                </p>
              </div>
            </div>
          </div>

          {/* Part 2: Main Relief Valve Adjustment Methods (ချိန်ညှိနည်း ၂ မျိုး) */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h5 className="font-bold text-xs text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>၂။ Relief Valve ဖိအား ချိန်ညှိနည်း နည်းလမ်း (၂) မျိုး (Pressure Adjusting):</span>
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Method A: Shim Adjusting Type */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-teal-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-teal-300">
                    နည်းလမ်း (က) - ရှမ်ပြား ထည့်/ထုတ် ညှိနည်း (Shim Type)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
                    Kubota / Yanmar / DC
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Relief Valve အဖုံးဝက်အူကို ဖြုတ်လိုက်ပါက အတွင်းတွင် ပင်အပ်ဗားလ် (Poppet) နှင့် <strong>ဖိအားထိန်း စပရင် (Spring)</strong> ရှိပါသည်။
                </p>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-300">
                  <li>
                    <strong>ဖိအားတိုးလိုပါက:</strong> စပရင်အောက်တွင် <strong>ရှမ်ပြား (Shim 0.1mm, 0.2mm, 0.4mm)</strong> ထပ်ဖြည့်ပါ (စပရင်တင်းပြီး ဖိအားတက်လာသည်)။
                  </li>
                  <li>
                    <strong>စံနှုန်းအချိုး:</strong> ရှမ်ပြား <strong>0.1 mm</strong> ထည့်တိုင်း ဖိအား <strong>~4.5 to 5.0 bar (65 ~ 72 psi)</strong> ခန့် တက်လာပါသည်။
                  </li>
                  <li>
                    <strong>ဖိအားလျှော့လိုပါက:</strong> ရှမ်ပြားကို ထုတ်ပေးရပါမည်။
                  </li>
                </ul>
              </div>

              {/* Method B: Screw & Lock Nut Type */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-300">
                    နည်းလမ်း (ခ) - ဝက်အူ အဖွင့်/အပိတ် ညှိနည်း (Screw Type)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    Ford / MF / John Deere
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Relief Valve ထိပ်တွင် <strong>Lock Nut (ထိန်းနတ်)</strong> နှင့် အလယ်တွင် <strong>Adjusting Screw (အလယ်ဝက်အူ)</strong> ပါရှိပါသည်။
                </p>
                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-300">
                  <li>
                    ပြင်ပ Lock Nut ကို အရင်လျှော့ပါ။
                  </li>
                  <li>
                    <strong>ဖိအားတိုးလိုပါက:</strong> အလယ်ဝက်အူကို <strong>လက်ယာရစ် (Clockwise / ကျပ်သွင်း)</strong> လှည့်ပါ။ (ဝက်အူ ၁ ပတ်လှည့်လျှင် ဖိအား ~15 to 20 bar ခန့် တက်တတ်သည်)။
                  </li>
                  <li>
                    <strong>ဖိအားလျှော့လိုပါက:</strong> အလယ်ဝက်အူကို <strong>လက်ဝဲရစ် (Counter-clockwise / ပြေထုတ်)</strong> လှည့်ပါ။
                  </li>
                  <li>
                    ချိန်ညှိပြီးပါက မူလဖိအားမပြေးစေရန် Lock Nut ကို ပြန်လည်တင်းကျပ်ပါ။
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Part 3: Pressure Gauge Testing Step-by-Step */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="font-bold text-xs text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <span>၃။ Pressure Gauge ဖိအားတိုင်းဂေ့ တပ်ဆင် စစ်ဆေးနည်း (Testing Procedure):</span>
            </h5>
            <ol className="list-decimal pl-4 space-y-1.5 text-[11px] text-slate-300 leading-relaxed">
              <li>
                ဖိအားတိုင်းဂေ့ <strong>(0 ~ 250 bar / 0 ~ 3,500 psi)</strong> ကို ထွန်စက်အနောက်ဘက် Hydraulic Quick Coupler (သို့မဟုတ် Lift Cylinder Test Port) တွင် တပ်ဆင်ပါ။
              </li>
              <li>
                အင်ဂျင်ကို အပူချိန် ပုံမှန်ရောက်သည်အထိ နှိုးထားပါ (ဟိုက်ဒရောလစ်ဆီ အပူချိန် 45°C ~ 55°C ရှိရပါမည်)။
              </li>
              <li>
                အင်ဂျင်လည်နှုန်း (Engine RPM) ကို <strong>စက်ရုံထုတ် Rated Speed (2,000 ~ 2,200 RPM)</strong> သို့ တင်ပါ။
              </li>
              <li>
                ထွန်ချိတ်မောင်းတံ (Hydraulic Lever) ကို အပေါ်ဆုံး (Lift Up) သို့ ဆွဲတင်ထားပြီး Relief Valve စတင်ပွင့်အလုပ်လုပ်ချိန်တွင် Gauge ပေါ်မှ ဖိအား Bar / PSI ကို ဖတ်ရှုပါ။
              </li>
            </ol>
          </div>

          {/* Part 4: Brand-Specific Relief Pressure Specs Table */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h5 className="font-bold text-xs text-sky-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>၄။ မော်ဒယ်အလိုက် စက်ရုံထုတ် ဟိုက်ဒရောလစ် ဖိအားစံနှုန်းများ (Specs Table):</span>
            </h5>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-2 px-3">အင်ဂျင် / ထွန်စက် မော်ဒယ်</th>
                    <th className="py-2 px-3">ပင်မဖိအား (Bar)</th>
                    <th className="py-2 px-3">ပင်မဖိအား (PSI)</th>
                    <th className="py-2 px-3">ချိန်ညှိမှု စနစ်</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2 px-3 font-sans text-slate-200 font-bold">Kubota L3408 / L4508 / L5018</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">175 - 185 bar</td>
                    <td className="py-2 px-3 text-slate-300">2,540 - 2,680 psi</td>
                    <td className="py-2 px-3 font-sans text-amber-300">Shim Type (ရှမ်ပြား)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2 px-3 font-sans text-slate-200 font-bold">Kubota DC60 / DC70 Harvester</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">180 - 190 bar</td>
                    <td className="py-2 px-3 text-slate-300">2,610 - 2,755 psi</td>
                    <td className="py-2 px-3 font-sans text-amber-300">Shim Type (ရှမ်ပြား)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2 px-3 font-sans text-slate-200 font-bold">Yanmar EF494T / EF393</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">175 - 185 bar</td>
                    <td className="py-2 px-3 text-slate-300">2,540 - 2,680 psi</td>
                    <td className="py-2 px-3 font-sans text-amber-300">Shim Type (ရှမ်ပြား)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2 px-3 font-sans text-slate-200 font-bold">Massey Ferguson MF 240 / MF 385</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">190 - 210 bar</td>
                    <td className="py-2 px-3 text-slate-300">2,755 - 3,045 psi</td>
                    <td className="py-2 px-3 font-sans text-teal-300">Adjusting Screw (ဝက်အူ)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="py-2 px-3 font-sans text-slate-200 font-bold">Ford 5000 / 6610</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">175 - 190 bar</td>
                    <td className="py-2 px-3 text-slate-300">2,500 - 2,755 psi</td>
                    <td className="py-2 px-3 font-sans text-teal-300">Adjusting Screw (ဝက်အူ)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Part 5: Diagnostic Solutions for Common Hydraulic Faults */}
          <div className="space-y-2.5 text-xs text-slate-300">
            <h5 className="font-bold text-xs text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>၅။ ဟိုက်ဒရောလစ် အဖြစ်များသော ပြဿနာများနှင့် လက်တွေ့ပြုပြင်နည်း:</span>
            </h5>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-teal-300 block">ထွန်ချိတ် မတက်ခြင်း သို့မဟုတ် တုန်ခါခြင်း (Slow/Jerking Lift):</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                ဟိုက်ဒရောလစ် ဆီစစ်ဇကာ (Suction Filter) တွင် အမှိုက်နှင့် သံမှုန့်များ ပိတ်ဆို့နေခြင်း သို့မဟုတ် ဟိုက်ဒရောလစ် ပန့်အဝင်လိုင်းတွင် လေစိမ့်ဝင်နေခြင်းကြောင့် ဖြစ်တတ်ပါသည်။ ဆီစစ်ဇကာကို ဒီဇယ်ဆီဖြင့် ဆေးကြောပြီး Magnet သံလိုက်ပေါ်ရှိ သံမှုန့်များကို သန့်စင်ပါ။
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-teal-300 block">ထွန်တင်ထားပြီးနောက် အောက်သို့ ပြန်ကျခြင်း (Hitch Settles Down):</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                ထွန်ချိတ်ဆလင်ဒါအတွင်းရှိ Piston Seal (O-Ring / Back-up ring) စားနေခြင်း သို့မဟုတ် Control Valve Spool တွင် အမှိုက်ညပ်၍ ဆီပြန်ယိုစိမ့်နေခြင်း ဖြစ်ပါသည်။ ဆလင်ဒါခေါင်းဖြုတ်၍ Hydraulic Piston Seal အသစ် လဲလှယ်ပါ။
              </p>
            </div>
          </div>

          {/* Golden Warning Notice */}
          <div className="p-3.5 bg-gradient-to-r from-red-950/40 via-amber-950/30 to-slate-950 rounded-xl border border-red-500/40 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="text-red-300">စက်ပြင်ဆရာများ အထူးသတိပြုရန် ရွှေရောင်စည်းကမ်း:</strong>
              <p className="text-slate-300 text-[11px] mt-1">
                Pressure Gauge (ဖိအားတိုင်းဂေ့) မတပ်ဆင်ဘဲ မှန်းခြေဖြင့် Relief Valve ကို လုံးဝမချိန်ရပါ။ ဖိအားကို စက်ရုံထုတ်စံနှုန်းထက် လွန်ကဲအောင် တင်းကျပ်မိပါက <strong>Hydraulic Gear Pump ကိုယ်ထည် ကွဲအက်ထွက်ခြင်း သို့မဟုတ် ပိုက်လိုင်း O-Ring ဆီးလ်များ ပေါက်ပြဲခြင်း</strong> အကြီးအကျယ် ဖြစ်ပေါ်တတ်ပါသည်။
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: CLUTCH & PTO */}
      {activeSubTab === 'clutch' && (
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <span className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
              <Sliders className="w-5 h-5" />
            </span>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-100">
                ကလပ်ပြား၊ ခြေထောက်ကစားချက် & PTO စံချိန်များ (Clutch & PTO Specs)
              </h4>
              <p className="text-xs text-slate-400">
                Single & Dual Clutch လက်တံချိန်ညှိမှုနှင့် ဖရီးကစားချက် စံချိန်များ
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-xs text-sky-300 block">
                ကလပ်ခြေနင်း ဖရီးကစားချက် (Clutch Pedal Free Play):
              </span>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono flex items-center justify-between">
                <span className="text-xs text-slate-400">စံချိန်စံညွှန်း (Standard)</span>
                <span className="text-sm font-bold text-emerald-400">20 - 30 mm (0.8" - 1.2")</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                ကလပ်ဖရီး မရှိပါက Release Bearing (ကလပ်ဘောစိ) သည် ကလပ်လက်တံများကို အမြဲဖိမိနေပြီး ကလပ်ပြား ချော်ခြင်းနှင့် ဘောစိပူကျက်ခြင်း ဖြစ်စေပါသည်။
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-xs text-amber-300 block">
                Dual Stage Clutch (ခြေထောက်နှစ်ဆင့် ကလပ် ချိန်နည်း):
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                ပထမအဆင့်နင်းလျှင် ဂီယာရပ်ပြီး၊ ဆက်လက်နင်းမှသာ PTO ရှပ် ရပ်တန့်ရပါမည်။ Primary Finger နှင့် Secondary PTO Release Bolts ကြား ကင်းလွတ်ခွာကို <strong>1.5 ~ 2.0 mm</strong> စံထား ချိန်ညှိရပါမည်။
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
