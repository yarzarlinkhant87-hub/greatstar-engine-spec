/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FluidSpecs } from '../types/engine';
import { Droplets, Thermometer, Disc, Fuel, Check } from 'lucide-react';

interface Props {
  fluids: FluidSpecs;
}

export const FluidsTab: React.FC<Props> = ({ fluids }) => {
  return (
    <div className="space-y-4">
      <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
          <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
            <Droplets className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-100">
              အရည်ပမာဏ & အသုံးပြုရမည့် စံချိန်မီ ဂရိတ်များ (Fluid Specs & Capacities)
            </h4>
            <p className="text-xs text-slate-400">
              အင်ဂျင်ဝိုင်၊ အအေးခံရေ၊ ဟိုက်ဒရောလစ်ဂီယာဝိုင်နှင့် ဒီဇယ်ဆီတိုင်ကီ ဆံ့ပမာဏ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Engine Oil */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-blue-500/40 transition">
            <div>
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                အင်ဂျင်ဝိုင် ပမာဏ
              </span>
              <div className="text-2xl font-black text-amber-300 font-mono my-1">
                {fluids.engineOilLiters} <span className="text-sm font-sans font-medium text-slate-400">Liters</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                သုံးစွဲရန် ဂရိတ်:
              </p>
              <div className="mt-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-300 font-bold">
                {fluids.engineOilGrade}
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
              နာရီ ၂၅၀ ပြည့်တိုင်း အသစ်လဲပါ
            </div>
          </div>

          {/* Card 2: Coolant */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/40 transition">
            <div>
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Thermometer className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                ရေတိုင်ကီ ရေပမာဏ
              </span>
              <div className="text-2xl font-black text-emerald-400 font-mono my-1">
                {fluids.coolantLiters} <span className="text-sm font-sans font-medium text-slate-400">Liters</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                အအေးခံရည် အမျိုးအစား:
              </p>
              <div className="mt-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-300 font-semibold">
                Long Life Coolant (50/50)
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
              တွင်းရေသန့်/အအေးခံရည် ရောစပ်ပါ
            </div>
          </div>

          {/* Card 3: Transmission / Hydraulic */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-purple-500/40 transition">
            <div>
              <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                <Disc className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                ဂီယာ & ဟိုက်ဒရောလစ်
              </span>
              <div className="text-2xl font-black text-purple-300 font-mono my-1">
                {fluids.hydraulicTransmissionLiters} <span className="text-sm font-sans font-medium text-slate-400">Liters</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                သုံးစွဲရန် ဂရိတ်:
              </p>
              <div className="mt-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-purple-200 font-bold truncate">
                {fluids.hydraulicTransmissionGrade}
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
              စစ်ဘူး/ဇကာ ၅၀၀ နာရီတိုင်းလဲပါ
            </div>
          </div>

          {/* Card 4: Fuel Tank */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-sky-500/40 transition">
            <div>
              <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
                <Fuel className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                ဒီဇယ်ဆီတိုင်ကီ ဆံ့ဝင်မှု
              </span>
              <div className="text-2xl font-black text-sky-300 font-mono my-1">
                {fluids.fuelTankLiters} <span className="text-sm font-sans font-medium text-slate-400">Liters</span>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                ဒီဇယ်လောင်စာ:
              </p>
              <div className="mt-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-sky-200 font-semibold">
                သန့်စင်ပြီး High Speed Diesel
              </div>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
              ရေစစ်ဘူးကို ပုံမှန်ရေဖောက်ထုတ်ပါ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
