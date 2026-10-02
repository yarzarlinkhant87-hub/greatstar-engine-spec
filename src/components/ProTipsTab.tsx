/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProTipSection } from '../types/engine';
import { Wrench, CheckCircle, AlertOctagon, Lightbulb, Compass } from 'lucide-react';

interface Props {
  proTips: ProTipSection;
}

export const ProTipsTab: React.FC<Props> = ({ proTips }) => {
  return (
    <div className="space-y-4">
      <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Wrench className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-100">
              ဝပ်ရှော့သမားများအတွက် လက်တွေ့ အထူးပြုပြင်ရေး အကြံပြုချက်များ (Workshop Pro Tips)
            </h4>
            <p className="text-xs text-slate-400">
              ဂက်စကတ် Notch ရွေးနည်း၊ တိုင်မင်မာ့ခ်တိုက်နည်းနှင့် အဓိက သတိပြုရမည့် အချက်များ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Section 1: Gasket Selection */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>ခေါင်းဂက်စကတ် အထူ/အပါး (Notch Grade) ရွေးနည်း</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {proTips.gasketSelection.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Timing Gear Alignment */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3 text-teal-400 font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>တိုင်မင်ဂီယာမာ့ခ် (1-1, 2-2, 3-3) တိုက်ဆိုင်နည်း</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {proTips.timingGearMarks.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Critical Warnings */}
          <div className="bg-slate-950/70 border border-rose-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4" />
              <span>အဖြစ်များသော အမှားများနှင့် အထူးသတိထားရမည့် အချက်များ</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {proTips.workshopWarnings.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">⚠️</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Critical Master Specs */}
          <div className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" />
              <span>အင်ဂျင်ဆင်ပြီး စစ်ဆေးရန် အဓိက စံချိန်များ (Master Checklist)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              {proTips.criticalSpecs.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
