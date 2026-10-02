/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Wind, ShieldAlert, CheckCircle2, AlertTriangle, Disc, Gauge, ArrowRight } from 'lucide-react';

export const AirBrakeTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'components' | 'spring_chamber' | 'trailer' | 'troubleshoot'>('overview');

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/40 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-3">
          <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Wind className="w-6 h-6" />
          </span>
          <div>
            <h3 className="font-black text-base sm:text-lg text-slate-100 flex items-center gap-2">
              <span>တရုတ် ၁၀ ဘီး၊ ၁၂ ဘီး & ၆ ဘီးဒန့်ကား လေဘရိတ်စနစ် (Dual Air Brake System)</span>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-mono border border-rose-500/40">
                Safety Spec
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              တောလမ်း/တောင်ဆင်းလမ်း လုပ်ငန်းခွင်သုံး လေဖိအားထိန်းချုပ်မှု၊ စပရင်ချမ်ဘာဖြုတ်နည်းနှင့် လေလိုင်းလက်စွဲ
            </p>
          </div>
        </div>

        {/* Quick Nav Sub-tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveSection('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeSection === 'overview'
                ? 'bg-rose-500 text-white shadow'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            ၁။ လေဖိအား စံချိန် (Pressure Spec)
          </button>
          <button
            onClick={() => setActiveSection('components')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeSection === 'components'
                ? 'bg-rose-500 text-white shadow'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            ၂။ ၄ လမ်းခွဲ & Relay Valve
          </button>
          <button
            onClick={() => setActiveSection('spring_chamber')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeSection === 'spring_chamber'
                ? 'bg-rose-500 text-white shadow'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            ၃။ စပရင်ချမ်ဘာ & ဘရိတ်လွှတ်နည်း
          </button>
          <button
            onClick={() => setActiveSection('trailer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeSection === 'trailer'
                ? 'bg-rose-500 text-white shadow'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            ၄။ တွဲကား လေဘရိတ်လိုင်း
          </button>
          <button
            onClick={() => setActiveSection('troubleshoot')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeSection === 'troubleshoot'
                ? 'bg-amber-400 text-slate-950 font-black shadow'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            ၅။ လေမပြည့်/ဘရိတ်ကပ် ရောဂါရှာ
          </button>
        </div>
      </div>

      {/* SECTION 1: OVERVIEW & PRESSURE SPECS */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <span className="text-[10px] text-slate-400 uppercase block font-bold">စက်ရုံထုတ် စံချိန်တင် လေဖိအား</span>
            <div className="text-2xl font-black text-emerald-400 font-mono my-1">
              7.5 ~ 8.5 bar
            </div>
            <div className="text-xs text-slate-300 font-mono">
              (108 ~ 123 PSI / 0.75 ~ 0.85 MPa)
            </div>
            <p className="text-[11px] text-slate-400 mt-2 border-t border-slate-800 pt-2">
              Unloader Valve (လေထုတ်ဗား) က 8.5 bar တွင် လေဖောက်ထုတ်ပြီး 7.0 bar အောက်ရောက်ပါက လေပြန်ဖြည့်သည်။
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <span className="text-[10px] text-slate-400 uppercase block font-bold">အရေးပေါ် လုံခြုံရေး လေပေါင်</span>
            <div className="text-2xl font-black text-rose-400 font-mono my-1">
              &lt; 5.5 bar
            </div>
            <div className="text-xs text-slate-300 font-mono">
              (&lt; 80 PSI / 0.55 MPa)
            </div>
            <p className="text-[11px] text-slate-400 mt-2 border-t border-slate-800 pt-2">
              လေဖိအား 5.5 bar အောက်ကျပါက လေဘရိတ် အချက်ပေးအသံမြည်ပြီး စပရင်ချမ်ဘာက ဘရိတ်အလိုအလျောက် သေစေပါမည် (ကားရပ်သွားမည်)။
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <span className="text-[10px] text-slate-400 uppercase block font-bold">Air Dryer (အခြောက်ခံဘူး) စစ်ထုတ်ချိန်</span>
            <div className="text-2xl font-black text-amber-300 font-mono my-1">
              ၆ လ ~ ၁ နှစ်
            </div>
            <div className="text-xs text-slate-300">
              (သို့မဟုတ် ကီလို ၅၀,၀၀၀)
            </div>
            <p className="text-[11px] text-slate-400 mt-2 border-t border-slate-800 pt-2">
              အောက်ခြေ လေအိုးဆီဗားကို ဖွင့်ကြည့်၍ ရေထွက်လာပါက Dryer cartridge ကျောက် အသစ်ချက်ချင်းလဲရပါမည်။
            </p>
          </div>
        </div>
      )}

      {/* SECTION 2: COMPONENTS & DUAL-CIRCUIT RELAY */}
      {activeSection === 'components' && (
        <div className="space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <h4 className="font-bold text-sm text-teal-300 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>၄ လမ်းခွဲ ကာကွယ်မှုဗား (Four-Circuit Protection Valve) အလုပ်လုပ်ပုံ</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              ပင်မ လေအိုးမှ လေလိုင်းကို (၄) လိုင်း သီးခြားခွဲထားပေးသည်:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <strong className="text-amber-300 block font-mono">Port 21: အရှေ့ဘရိတ် လေလိုင်း (Circuit 1)</strong>
                <span className="text-slate-400 text-[11px]">ရှေ့ဘီးချမ်ဘာများနှင့် ခြေနင်းဘရိတ်အထက်ပိုင်း</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <strong className="text-amber-300 block font-mono">Port 22: အနောက်ဘရိတ် လေလိုင်း (Circuit 2)</strong>
                <span className="text-slate-400 text-[11px]">အနောက်ဘီးတွဲ စပရင်ချမ်ဘာများနှင့် Relay Valve</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <strong className="text-emerald-300 block font-mono">Port 23: လက်ဘရိတ် & တွဲကားလိုင်း (Circuit 3)</strong>
                <span className="text-slate-400 text-[11px]">Hand Brake Valve နှင့် Trailer Emergency Line</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <strong className="text-sky-300 block font-mono">Port 24: အထွေထွေ အရန်လေလိုင်း (Circuit 4)</strong>
                <span className="text-slate-400 text-[11px]">လေကွဲ (Air Splitter)၊ ကလပ်ဘူစတာ၊ လေဟွန်း၊ တံခါးစနစ်</span>
              </div>
            </div>
            <div className="mt-3 p-2 rounded-xl bg-teal-950/40 border border-teal-500/30 text-teal-200 text-xs font-semibold">
              💡 အကျိုးကျေးဇူး: လိုင်းတစ်ခု ပေါက်ပြဲသွားသော်လည်း ကျန်လိုင်း ၃ ခုတွင် လေဖိအား 4.5 bar အထက် ဆက်ရှိနေသဖြင့် ကားဘရိတ် ဆက်ဖမ်းနိုင်ပါသည်။
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <h4 className="font-bold text-sm text-amber-300 mb-2">
              အနောက်ဘရိတ် ရီလေးဗား (Relay Valve) အဘယ်ကြောင့် လိုအပ်သနည်း?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              ၁၀ ဘီး/တွဲကားကြီးများတွင် ရှေ့ခန်းမှ ခြေနင်းလိုက်သည့်လေသည် အနောက်ဘီးဆီ ရောက်ရန် အချိန်နှောင့်နှေးနိုင်ပါသည်။ ထို့ကြောင့် ခြေနင်းဘရိတ်မှ <strong>အချက်ပြလေ (Signal Air)</strong> သာ ရီလေးဗားထံ သွားပြီး၊ ရီလေးဗားက အနောက်လေအိုးကြီးထဲမှ လေဖိအားအပြည့်ကို ဘီးချမ်ဘာများဆီ <strong>စက္ကန့်ပိုင်းအတွင်း ချက်ချင်း တွန်းပို့ပေးပါသည်</strong>။
            </p>
          </div>
        </div>
      )}

      {/* SECTION 3: SPRING BRAKE CHAMBER 24/30 & CAGING BOLT */}
      {activeSection === 'spring_chamber' && (
        <div className="space-y-3">
          <div className="bg-slate-900/90 border border-rose-500/40 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>စပရင်ချမ်ဘာ (Spring Brake Chamber Type 24/30) အလွန်အရေးကြီးသော လုံခြုံရေး</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              အနောက်ဘီး ချမ်ဘာကြီးများအတွင်းတွင် တန်နှင့်ချီ၍ တွန်းအားပြင်းသော <strong>အကြီးစား စပရင် (Heavy Duty Coil Spring)</strong> ပါဝင်သည်။ ဤစပရင်သည် လေကုန်ချိန်တွင် ဘရိတ်ကို အလိုအလျောက် သေအောင် တွန်းကန်ထားခြင်း ဖြစ်သည်။
            </p>

            <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-rose-500/30 space-y-2">
              <strong className="text-amber-300 text-xs block">
                🚨 လေကုန်နေသော ကားအား အရေးပေါ် ဆွဲရွှေ့ရန် ဘရိတ်လွှတ်နည်း (Caging Bolt Manual Release):
              </strong>
              <ol className="text-xs text-slate-300 list-decimal list-inside space-y-1.5 leading-relaxed">
                <li>ချမ်ဘာနောက်ဘက်ရှိ <strong>Caging Bolt (ရစ်တံမူလီရှည်)</strong> ကို ချွတ်ယူပါ။</li>
                <li>ချမ်ဘာ အလယ်ဗဟို အပေါက်ထဲသို့ ထိုးထည့်ပြီး အတွင်းခံပြားနှင့် သော့ချိတ် (90 ဒီဂရီ) လှည့်ချိတ်ပါ။</li>
                <li><strong>19mm ဂွ</strong> ဖြင့် နတ်ခေါင်းကို နာရီလက်တံအတိုင်း စပရင်ကျုံ့သွားသည်အထိ တင်းတင်းရစ်သွင်းပါ။</li>
                <li>စပရင်နောက်ဆုတ်သွားပါက ဘီးလွတ်သွားပြီး ကားကို အရေးပေါ် ဆွဲရွှေ့နိုင်ပါပြီ။</li>
              </ol>
              <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-200 text-[11px] font-bold mt-2">
                ⚠️ သတိပြုရန်: ချမ်ဘာအတွင်းပိုင်းအား သာမန်ဝပ်ရှော့တွင် လက်ဖြင့် ဖြုတ်ခွာခြင်း (Disassemble) လုံးဝ မပြုလုပ်ရပါ! စပရင်ကန်ထွက်ပြီး အသက်အန္တရာယ် ဖြစ်စေနိုင်သည်။
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: TRAILER BRAKES */}
      {activeSection === 'trailer' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
          <h4 className="font-bold text-sm text-sky-300 flex items-center gap-2">
            <Disc className="w-4 h-4 text-sky-400" />
            <span>တွဲကား လေဘရိတ်လိုင်း ချိတ်ဆက်ပုံ (Trailer Spiral Air Hoses)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40">
              <strong className="text-rose-400 block font-mono text-sm mb-1">အနီရောင် ပိုက်ခေါင်း (Red - Supply Line / Emergency)</strong>
              <p className="text-slate-300 text-[11px]">
                တွဲခေါင်းမှ တွဲမြီးလေအိုးများဆီ လေဖိအား အဆက်မပြတ် ဖြည့်ပေးသောလိုင်း။ ဤပိုက် ပြုတ်ထွက်/ပေါက်သွားပါက တွဲမြီး Relay Valve မှ တွဲမြီးဘရိတ်ကို ချက်ချင်း အလိုအလျောက် သေစေပါမည်။
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40">
              <strong className="text-amber-400 block font-mono text-sm mb-1">အဝါရောင် ပိုက်ခေါင်း (Yellow - Service / Control Line)</strong>
              <p className="text-slate-300 text-[11px]">
                ဒရိုင်ဘာ ခြေနင်းဘရိတ် (သို့မဟုတ်) တွဲဘရိတ်လက်မောင်း ဆွဲလိုက်မှသာ တွဲမြီးဘရိတ် ဖမ်းရန် အချက်ပြလေဖိအား သွားသောလိုင်း။
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: TROUBLESHOOTING */}
      {activeSection === 'troubleshoot' && (
        <div className="space-y-2.5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-lg">
            <span className="text-xs font-black text-rose-400">၁။ လေဖိအား တက်နှေးခြင်း (သို့မဟုတ်) ၆ bar ထက် မကျော်ခြင်း:</span>
            <p className="text-xs text-slate-300 mt-1">
              • Compressor ၏ Head Valve Plate (ဗားပြား) အိုးမဲခိုနေခြင်း သို့မဟုတ် ပစ္စတင်ရိန်း ချောင်နေခြင်း။<br/>
              • Unloader Valve တွင် အမှိုက်ခံနေ၍ လေတောက်လျှောက် ဖောက်ထုတ်နေခြင်း။<br/>
              • ပင်မ လေအခြောက်ခံဘူး (Air Dryer) အောက်ခြေ အိတ်ဇောမှ လေထွက်ကျနေခြင်း။
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-lg">
            <span className="text-xs font-black text-amber-300">၂။ ဘရိတ်နင်းပြီး ပြန်လွှတ်သော်လည်း ဘရိတ်ကပ်နေခြင်း (Brake Dragging):</span>
            <p className="text-xs text-slate-300 mt-1">
              • Quick Release Valve (သို့မဟုတ်) Relay Valve အောက်ခြေ လေပြန်ထုတ်ပေါက် ပိတ်နေခြင်း။<br/>
              • Brake S-Cam (ဘရိတ်ကမ်တံ) ချောဆီခမ်းပြီး ဂျမ်းဖြစ်နေခြင်း (Grease အဆီထိုးပေးပါ)။<br/>
              • ဘရိတ်ဖိနပ်ခွာ ပြန်ဆွဲစပရင် (Brake Shoe Return Spring) ကျိုးနေခြင်း သို့မဟုတ် ပျော့နေခြင်း။
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-lg">
            <span className="text-xs font-black text-teal-300">၃။ လေအိုးထဲ အင်ဂျင်ဝိုင်ဆီနှင့် ရေ အမြောက်အမြား တင်နေခြင်း:</span>
            <p className="text-xs text-slate-300 mt-1">
              • Compressor အင်ဂျင်ဝိုင် စားနေခြင်း (ကွန်ပရက်ဆာ ရိန်းလဲရမည်)။<br/>
              • လေအခြောက်ခံဘူး (Air Dryer) ကျောက် သက်တမ်းကုန်နေသဖြင့် အစိုဓာတ် မစစ်နိုင်တော့ခြင်း (Dryer Cartridge အသစ်ချက်ချင်းလဲပါ)။
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
