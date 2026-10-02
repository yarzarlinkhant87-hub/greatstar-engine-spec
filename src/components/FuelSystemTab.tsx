/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FuelSystemSpec } from '../types/engine';
import { Fuel, Zap, Settings, ShieldCheck } from 'lucide-react';

interface Props {
  fuelSystem: FuelSystemSpec;
}

export const FuelSystemTab: React.FC<Props> = ({ fuelSystem }) => {
  return (
    <div className="space-y-4">
      <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
          <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
            <Fuel className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-100">
              ဒီဇယ်ဆီစနစ်၊ နိုဇယ်ပေါင် & မီးတိုင်မင် စံချိန်များ (Fuel Injection & Timing)
            </h4>
            <p className="text-xs text-slate-400">
              စက်ရုံထုတ် မူရင်း နိုဇယ်ဆီဖြန်းပေါင် (Opening Pressure) နှင့် မီးချိန်ဒီဂရီများ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Nozzle Pressure */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  နိုဇယ်ဆီဖြန်းပေါင် (Nozzle Opening Pressure)
                </span>
                <Fuel className="w-4 h-4 text-amber-400/80" />
              </div>
              <p className="text-xs text-slate-300 mb-3">
                နိုဇယ်တက်စတာ (Nozzle Tester) ဖြင့် ဖိအားစမ်းသပ်ချိန် စံသတ်မှတ်ချက်
              </p>
              
              <div className="space-y-2 font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">kgf / cm²</span>
                  <span className="text-base font-black text-amber-300">{fuelSystem.nozzlePressureKgf}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">bar</span>
                  <span className="text-base font-black text-emerald-400">{fuelSystem.nozzlePressureBar}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-xs text-slate-400">psi</span>
                  <span className="text-base font-black text-sky-400">{fuelSystem.nozzlePressurePsi}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              နိုဇယ်ခေါင်းထိန်းနပ် ဆွဲပေါင်: <strong className="text-amber-300 font-mono">{fuelSystem.nozzleHolderTorque}</strong>
            </div>
          </div>

          {/* Card 2: Injection Timing & Pump */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                  မီးချိန်ဒီဂရီ & ဆီပန့်အမျိုးအစား (Timing & Pump)
                </span>
                <Settings className="w-4 h-4 text-teal-400/80" />
              </div>
              <p className="text-xs text-slate-300 mb-3">
                ဖလိုက်ဝှီး / ပူလီပေါ်ရှိ မာ့ခ်နှင့် ဆီစတင်ဖြန်းသည့် အချိန်
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-900 border border-teal-500/30">
                  <span className="text-[10px] text-teal-300 uppercase block font-bold mb-1">
                    မီးတိုင်မင် ဒီဂရီ (Injection Timing BTDC)
                  </span>
                  <span className="text-lg font-black text-teal-300 font-mono">
                    {fuelSystem.injectionTimingBtdc}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">ဆီပန့် (Fuel Injection Pump)</span>
                  <span className="text-xs font-semibold text-slate-200">{fuelSystem.pumpType}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">မီးချိန်ညှိနည်းစနစ်</span>
                  <span className="text-xs text-slate-300">{fuelSystem.pumpTypeMm}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>အပူပေးပလပ် (Glow Plug): <strong className="text-slate-200">{fuelSystem.glowPlugSpec}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
