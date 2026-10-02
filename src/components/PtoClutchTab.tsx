/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Cog, Disc, Droplets, AlertTriangle, CheckCircle2, ShieldCheck, Wrench } from 'lucide-react';

export const PtoClutchTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'dump_pto' | 'tractor_pto' | 'clutch_booster' | 'clutch_finger'>('dump_pto');

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-3">
          <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Cog className="w-6 h-6" />
          </span>
          <div>
            <h3 className="font-black text-base sm:text-lg text-slate-100 flex items-center gap-2">
              <span>PTO (ပါဝါထိုးဂီယာ) & ကလပ် (Clutch) ပိုင်း စနစ်စုံ</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/40">
                Workshop Field Manual
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              တရုတ်ဒန့်ကား PTO၊ လယ်ထွန်စက် PTO၊ လေကူကလပ်ဘူစတာ၊ ကလပ်လေထုတ်နည်းနှင့် လက်သည်းချိန်ညှိမှု
            </p>
          </div>
        </div>

        {/* Section Navigation Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveSection('dump_pto')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeSection === 'dump_pto'
                ? 'bg-amber-400 text-slate-950 font-black shadow'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            ၁။ တရုတ်ဒန့်ကား PTO (Air Solenoid)
          </button>
          <button
            onClick={() => setActiveSection('tractor_pto')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeSection === 'tractor_pto'
                ? 'bg-amber-400 text-slate-950 font-black shadow'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            ၂။ ထွန်စက် PTO (540/1000 RPM)
          </button>
          <button
            onClick={() => setActiveSection('clutch_booster')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeSection === 'clutch_booster'
                ? 'bg-emerald-500 text-slate-950 font-black shadow'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            ၃။ ကလပ်ဘူစတာ & လေထုတ်နည်း
          </button>
          <button
            onClick={() => setActiveSection('clutch_finger')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeSection === 'clutch_finger'
                ? 'bg-amber-400 text-slate-950 font-black shadow'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            ၄။ ကလပ်လက်သည်း & ၂ ဆင့်ကလပ်
          </button>
        </div>
      </div>

      {/* 1. DUMP TRUCK PTO */}
      {activeSection === 'dump_pto' && (
        <div className="space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <h4 className="font-bold text-sm text-amber-300 mb-2">
              ဒန့်ကား PTO (Power Take-Off) အလုပ်လုပ်ပုံ & သွားကြိတ်ဝါးခြင်း ကာကွယ်နည်း
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              ဒန့်ကားများတွင် ဟိုက်ဒရောလစ်ဆီပန့်ကို မောင်းနှင်ရန် ပင်မဂီယာဘောက်စ်၏ ဘေးဘက် (သို့မဟုတ်) အနောက်ဘက်တွင် PTO Box တပ်ဆင်ထားပြီး ကားခေါင်းခန်းမှ <strong>လေခလုတ် (Air Solenoid Switch)</strong> ဖြင့် ထိုးရသည်။
            </p>

            <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-2">
              <strong className="text-amber-300 text-xs block">
                ⚠️ တောဘက်တွင် အမြဲမှားယွင်းတတ်သော PTO ထိုးနည်း အမှားနှင့် သတိပေးချက်:
              </strong>
              <div className="text-xs text-slate-200 space-y-1.5">
                <p>
                  <strong>• အရေးကြီးဆုံး စည်းကမ်း:</strong> ကလပ်ခြေနင်းကို ကြမ်းပြင်ထိအောင် အဆုံးနင်းပြီး <strong>အနည်းဆုံး ၃ စက္ကန့် စောင့်ပါ</strong> (ဂီယာဘောက်စ် အတွင်းရှိ ဂီယာများ အရှိန်လုံးဝရပ်သွားစေရန်)။ ထို့နောက်မှ PTO ခလုတ်ကို ဆွဲထိုးပါ!
                </p>
                <p className="text-rose-300">
                  <strong>• အမှား:</strong> ကလပ်နင်းပြီး ချက်ချင်း PTO ဆွဲပါက ဂီယာအရှိန်မသေသေးသဖြင့် 'ဂျရစ်... ဂျရစ်' ဟူသော သွားကြိတ်သံမြည်ပြီး PTO ဂီယာသွားများ ကျိုးပဲ့ကုန်တတ်သည်။
                </p>
                <p>
                  <strong>• လေဖိအား:</strong> လေအိုးဖိအား အနည်းဆုံး <strong>6.5 bar</strong> ပြည့်မှသာ PTO ပစ္စတင် လေတွန်းကန်အား ကောင်းမွန်စွာ ဝင်ရောက်နိုင်မည်။
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TRACTOR PTO */}
      {activeSection === 'tractor_pto' && (
        <div className="space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <h4 className="font-bold text-sm text-emerald-300 mb-2">
              စက်မှုလယ်ယာ ထွန်စက်ကြီးများ (Kubota / Yanmar / New Holland) PTO ပတ်နှုန်းများ
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-amber-400 font-mono font-bold block text-sm">PTO 540 RPM (စံချိန်တင် ပုံမှန်ပတ်နှုန်း)</span>
                <p className="text-slate-300 text-[11px] mt-1">
                  အင်ဂျင်ပတ်နှုန်း 2,000 ~ 2,200 RPM တွင် ရိုတာဗေတာ (Rotavator) ထွန်ယက်ခြင်း၊ ရေစုပ်စက်မောင်းခြင်း၊ မျိုးစေ့ချစက်များတွင် အသုံးပြုသည်။
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-emerald-400 font-mono font-bold block text-sm">PTO 750 / 1000 RPM (အမြန်ပတ်နှုန်း)</span>
                <p className="text-slate-300 text-[11px] mt-1">
                  ကောက်ရိတ်စက်ခေါင်း၊ မြက်ရိတ်စက်၊ သီးနှံကြိတ်စက်များ မောင်းနှင်ရာတွင် အင်ဂျင်ကို အမြန်နှုန်းနိမ့် (1,600 RPM) ဖြင့် ဆီချွေတာမောင်းနှင်ရန် သုံးသည်။
                </p>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-emerald-500/30">
              <strong className="text-emerald-300 text-xs block mb-1">
                🛡️ PTO Slip Clutch (ဘေးကင်းလုံခြုံရေး ကလပ်):
              </strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                ရိုတာဗေတာ ထွန်သွားသည် လယ်ကွက်အတွင်းရှိ သစ်ငုတ်၊ ကျောက်တုံးနှင့် တိုက်မိပါက ဂီယာဘောက်စ် မကွဲစေရန် Slip Clutch စပရင်နတ်များကို သတ်မှတ်အလျော့အတင်းအတိုင်း ချိန်ထားရမည်။ (လုံးဝ သေနေအောင် အတင်းကြပ်မထားရပါ)။
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. CLUTCH BOOSTER & BLEEDING */}
      {activeSection === 'clutch_booster' && (
        <div className="space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
            <h4 className="font-bold text-sm text-sky-300 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-400" />
              <span>တရုတ်ကားသုံး လေကူကလပ်ဘူစတာ (Clutch Booster) နှင့် လေထုတ်နည်း (Bleeding Steps)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              ခြေနင်းဆီဖိအားနှင့် လေဖိအား (Air Pressure 7.5 bar) ပူးတွဲတွန်းပေးသဖြင့် ကလပ်နင်းရသည်မှာ အလွန်ပေါ့ပါးသည်။ သို့သော် လေခိုပါက ဂီယာထိုးမရတော့ပေ။
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-sky-500/40">
              <strong className="text-amber-300 text-xs block mb-2">
                🔧 ကလပ်ဝိုင် လေထုတ်နည်း (Clutch Bleeding) အဆင့် ၅ ဆင့်:
              </strong>
              <ol className="text-xs text-slate-300 list-decimal list-inside space-y-1.5 leading-relaxed">
                <li>ကလပ်ဆီဘူး (Clutch Master Cylinder Reservoir) ထဲတွင် DOT 3 / DOT 4 ဘရိတ်ဝိုင် အပြည့်ဖြည့်ပါ။</li>
                <li>ကားစက်နှိုး၍ လေဖိအား အနည်းဆုံး <strong>6.5 bar အထက်</strong> ရောက်အောင် စောင့်ပါ။</li>
                <li>တစ်ယောက်က ကလပ်ခြေနင်းကို ၄ ကြိမ် ~ ၅ ကြိမ် ဆက်တိုက်နင်းပြီး <strong>အဆုံးထိ တင်းတင်းနင်းထားပါ</strong>။</li>
                <li>နောက်တစ်ယောက်က ဘူစတာပေါ်ရှိ <strong>Bleeder Screw (လေဖျောက်နတ်)</strong> ကို 10mm ဂွဖြင့် ဖွင့်လိုက်ပါ (ဆီနှင့် လေပူဖောင်းများ ပန်းထွက်လာမည်)။</li>
                <li>ဆီမပန်းတော့မီ နတ်ကို ပြန်ကြပ်ပါ။ ဤနည်းအတိုင်း ဆီသန့်သန့်သာ ပန်းထွက်သည်အထိ ၃ ကြိမ်ခန့် ထပ်လုပ်ပါ။</li>
              </ol>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-rose-400 font-bold block mb-1">🚨 ဘူစတာပျက်စီးခြင်း လက္ခဏာ:</span>
              <span className="text-slate-300 text-[11px]">
                ဘူစတာ အိတ်ဇောခေါင်းမှ ဘရိတ်ဝိုင်များ လိုက်ထွက်ကျနေပါက ဘူစတာအတွင်းရှိ Hydraulic Piston Seal ပေါက်ပြဲနေပြီဖြစ်၍ Repair Kit အသစ်လဲရမည်။
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. CLUTCH FINGER & 2-STAGE CLUTCH */}
      {activeSection === 'clutch_finger' && (
        <div className="space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
            <h4 className="font-bold text-sm text-teal-300 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-teal-400" />
              <span>ကလပ်လက်သည်း (Clutch Release Fingers) ညီညာစွာ ချိန်နည်း</span>
            </h4>
            <div className="text-xs text-slate-300 space-y-2">
              <p>
                <strong>• လက်သည်း ၃ ချောင်း အမြင့်ညီမှု:</strong> ဖိပြား (Pressure Plate) ပေါ်ရှိ လက်သည်း ၃ ချောင်း၏ အဖျားအမြင့်သည် အချင်းချင်း <strong>0.20 mm ထက် ပိုမကွာရပါ</strong>။ မညီပါက ကလပ်နင်းချိန်တွင် ဖိပြားစောင်းပြီး ကားတုန်ခါခြင်း (Clutch Shudder) ဖြစ်စေသည်။
              </p>
              <p>
                <strong>• ကလပ်ခြေနင်း ကင်းလွတ်ခွာ (Pedal Free Play):</strong> ခြေနင်းကို လက်ဖြင့် အသာဖိကြည့်ပါက <strong>15 ~ 25 mm</strong> လွတ်လွတ်လပ်လပ် ဆင်းသွားရပါမည် (Release Bearing အမြဲတိုက်စားမနေစေရန်)။
              </p>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-teal-500/30">
              <strong className="text-teal-300 text-xs block mb-1">
                🚜 ထွန်စက်သုံး ၂ ဆင့်ကလပ် (Double Stage Clutch) ချိန်နည်း:
              </strong>
              <p className="text-xs text-slate-300 text-[11px] leading-relaxed">
                ထွန်စက်များတွင် ခြေနင်းတစ်ဝက်နင်းပါက ကားရပ်သည် (ခရီးသွားကလပ်လွတ်သည်)။ အဆုံးထိနင်းမှသာ PTO ရပ်သည်။ ထို ၂ ဆင့်ကွာဟချက် မမှန်ပါက ဖိပြားဘေးရှိ Adjusting Bolts (ချိန်ညှိမူလီ ၃ ချောင်း) ဖြင့် 1.5 ~ 2.0 mm ကင်းလွတ်ခွာ ချိန်ပေးရသည်။
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
