/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Disc, AlertTriangle, CheckCircle2, ShieldCheck, Sun, HelpCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TirePressureModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<'tractor' | 'dump_light' | 'dump_heavy' | 'harvester'>('tractor');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-amber-500/50 p-4 sm:p-6 shadow-2xl text-slate-100 relative my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Disc className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-black text-sm sm:text-base text-amber-300">
                ဘီးလေပေါင် စံချိန်စံညွှန်းများ (Tire Air Pressure Guide - PSI)
              </h3>
              <p className="text-[11px] text-slate-400">
                တောဘက်လုပ်ငန်းခွင်သုံး စက်မှုလယ်ယာ & တရုတ်ဒန့်ကားကြီးများ တာယာလေဖိအား
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl p-1.5 rounded-full hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3">
          <button
            onClick={() => setActiveCategory('tractor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeCategory === 'tractor'
                ? 'bg-amber-400 text-slate-950 font-black shadow'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            ၁။ ထွန်စက်ကြီးများ (Tractors)
          </button>
          <button
            onClick={() => setActiveCategory('dump_light')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeCategory === 'dump_light'
                ? 'bg-emerald-500 text-slate-950 font-black shadow'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            ၂။ ၆ ဘီးဒန့်ကား (4100/4102)
          </button>
          <button
            onClick={() => setActiveCategory('dump_heavy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeCategory === 'dump_heavy'
                ? 'bg-sky-400 text-slate-950 font-black shadow'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            ၃။ ၁၀ ဘီး / ၁၂ ဘီး / တွဲကား
          </button>
          <button
            onClick={() => setActiveCategory('harvester')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              activeCategory === 'harvester'
                ? 'bg-teal-400 text-slate-950 font-black shadow'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            ၄။ ရိတ်ခြွေစက် ရော်ဘာပတ်
          </button>
        </div>

        {/* Content Section 1: Tractor */}
        {activeCategory === 'tractor' && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-amber-400 uppercase font-bold block">ထွန်စက် အရှေ့ဘီး (Front Tire 6.00-16 / 8-18 / 9.5-24)</span>
                <div className="text-xl font-black text-slate-100 font-mono my-1">
                  28 ~ 32 PSI
                </div>
                <p className="text-[11px] text-slate-400">
                  အရှေ့ဘက်တွင် မြေထိုးဒိုဇာခွာ (Front Dozer Blade) တပ်ဆင်ထားပါက <strong>34 ~ 36 PSI</strong> အထိ မြှင့်တင်ထိုးပေးပါ။
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">ထွန်စက် အနောက်ဘီး ရွှံ့နွံသုံး ပွင့်ကြီး (Rear Tire 12.4-24 / 13.6-28 / 16.9-34)</span>
                <div className="text-xl font-black text-slate-100 font-mono my-1">
                  14 ~ 18 PSI (လယ်ထဲ)
                </div>
                <p className="text-[11px] text-slate-400">
                  လယ်နွံထဲဆင်းချိန်တွင် တာယာပွပြီး ရွှံ့ဆွဲအားကောင်းစေရန် 14~18 PSI သာ ထိုးရပါမည်။ ကတ္တရာလမ်းပြေးလျှင် <strong>20 ~ 22 PSI</strong> ထိုးပါ။
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-[11px] leading-relaxed">
              💡 <strong>တောဘက် သတိပြုရန်:</strong> ထွန်စက် အနောက်ဘီးကို လေပေါင် 30 PSI ကျော် ထိုးထားပါက တာယာအလယ်သားသာ ထောက်မိပြီး လယ်ထဲတွင် ရွှံ့မဆွဲဘဲ ချော်နေတတ်ပါသည်။
            </div>
          </div>
        )}

        {/* Content Section 2: Light Dump Truck (4100 / 4102) */}
        {activeCategory === 'dump_light' && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block">၆ ဘီးဒန့်ကား အရှေ့ဘီး (7.50-16 / 8.25-16)</span>
                <div className="text-xl font-black text-slate-100 font-mono my-1">
                  90 ~ 95 PSI
                </div>
                <p className="text-[11px] text-slate-400">
                  ကျောက်/မြေ အပြည့်တင်မောင်းနှင်ချိန်တွင် <strong>100 PSI</strong> အထိ ထိုးနိုင်သည်။
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-amber-400 uppercase font-bold block">၆ ဘီးဒန့်ကား အနောက်ဘီးတွဲ (Dual Rear Tires)</span>
                <div className="text-xl font-black text-slate-100 font-mono my-1">
                  100 ~ 110 PSI
                </div>
                <p className="text-[11px] text-slate-400">
                  ဘီးတွဲ ၂ လုံးအကြား လေပေါင် လုံးဝတူညီရပါမည်။ (တစ်ဖက် လေနည်းနေပါက ကျန်တစ်ဖက် တာယာပေါက်တတ်သည်)။
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Content Section 3: Heavy Truck 10-W, 12-W, Trailer */}
        {activeCategory === 'dump_heavy' && (
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-sky-400 uppercase font-bold block">ကြွပ်တာယာ (10.00-20 / 11.00-20 / 12.00-20 Tube Type)</span>
                <div className="text-xl font-black text-slate-100 font-mono my-1">
                  115 ~ 125 PSI
                </div>
                <p className="text-[11px] text-slate-400">
                  တောင်တက်တောင်ဆင်းနှင့် ကျောက်ကြမ်းလမ်းသုံး ၁၀ ဘီး/၁၂ ဘီးကားကြီးများ။
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-amber-400 uppercase font-bold block">တုဗလက်တာယာ (Tubeless 12R22.5 / 295/80R22.5 / 315/80R22.5)</span>
                <div className="text-xl font-black text-slate-100 font-mono my-1">
                  120 ~ 130 PSI
                </div>
                <p className="text-[11px] text-slate-400">
                  အရှေ့ဘီး: 120 PSI ၊ အနောက်ဘီးတွဲ: 125 ~ 130 PSI ၊ တွဲမြီး: 125 PSI။
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-[11px] leading-relaxed">
              ⚠️ <strong>နွေရာသီ သတိပေးချက်:</strong> နေပူပြင်းချိန် ခရီးဝေးပြေးလာသော ကားတာယာများသည် အပူကြောင့် လေပေါင် 10~15 PSI ခန့် အလိုအလျောက် တိုးလာတတ်သည်။ ထိုအချိန်တွင် လေလျှော့မပစ်ရပါ! (အေးသွားပါက လေဟာသွားမည်)။
            </div>
          </div>
        )}

        {/* Content Section 4: Harvester Rubber Track */}
        {activeCategory === 'harvester' && (
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-teal-500/30">
              <span className="text-[10px] text-teal-400 uppercase font-bold block">ရိတ်ခြွေစက် (Kubota DC70 / DC105X / Yanmar AW70) သံပတ်/ရော်ဘာပတ် လျော့တွဲမှု စံချိန်</span>
              <div className="text-xl font-black text-teal-300 font-mono my-1">
                Track Sag: 10 ~ 15 mm
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed mt-2">
                စက်ကို ညီညာသော မြေပြင်တွင် ရပ်ပါ။ အလယ်ရိုလာ (Middle Track Roller) နှင့် ရော်ဘာပတ်ကြား လျော့တွဲကျနေသော ကွာဟချက်ကို ပေကြိုးဖြင့် တိုင်းပါ။
              </p>
              <div className="mt-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <p>• <strong>လျော့လွန်းပါက:</strong> တင်းပတ်ခေါင်းရှိ အဆီထိုးပေါက် (Grease Nipple) သို့ အဆီထိုးဂန်းဖြင့် အဆီထည့်၍ တင်းပေးပါ။</p>
                <p>• <strong>တင်းလွန်းပါက:</strong> တင်းပတ် အဆီထုတ်နတ် (Grease Discharge Valve) ကို အသာအယာ ဖြေလျှော့၍ အဆီထုတ်ပေးပါ။</p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Close Button */}
        <div className="mt-5 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs tracking-wide shadow-md transition"
          >
            နားလည်ပါပြီ (ပိတ်မည်)
          </button>
        </div>
      </div>
    </div>
  );
};
