/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClearanceItem } from '../types/engine';
import { Gauge, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Props {
  clearances: ClearanceItem[];
}

export const ClearancesTab: React.FC<Props> = ({ clearances }) => {
  return (
    <div className="space-y-4">
      <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
          <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
            <Gauge className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-100">
              အင်ဂျင်တွင်း တိုင်းတာစစ်ဆေးရမည့် ကင်းလွတ်ခွာ စံချိန်များ (Engine Clearances & Tolerances)
            </h4>
            <p className="text-xs text-slate-400">
              ဖီးလာဂေ့ (Feeler Gauge) နှင့် မိုက်ခရိုမီတာ (Micrometer) ဖြင့် စံချိန်တိုင်းတာရန်
            </p>
          </div>
        </div>

        {/* Clearances Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-950/60">
                <th className="py-2.5 px-3">အစိတ်အပိုင်း / တိုင်းတာချက်</th>
                <th className="py-2.5 px-3 text-center">စံချိန်သတ်မှတ်ချက် (Standard)</th>
                <th className="py-2.5 px-3 text-center">ကန့်သတ်ချက် (Allowable Limit)</th>
                <th className="py-2.5 px-3">တိုင်းတာနည်း & စစ်ဆေးပုံ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {clearances.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3">
                    <div className="font-sans font-bold text-slate-100 text-sm">{c.burmeseName}</div>
                    <div className="text-[11px] text-slate-400">{c.name}</div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-sm">
                      {c.standardVal} {c.unit}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-500/30 text-rose-300 font-semibold text-xs">
                      Max {c.limitVal} {c.unit}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-sans text-xs text-slate-300">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                      <span>{c.checkMethod}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Warning note */}
        <div className="mt-4 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200/90 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong>ဝပ်ရှော့သတိပေးချက်:</strong> ကင်းလွတ်ခွာတိုင်းတာချက်များသည် အင်ဂျင်အေးချိန် (Cold Engine) တွင်သာ တိုင်းတာရပါမည်။ Limit သတ်မှတ်ချက်ထက် ပိုမိုဟနေပါက အသစ်လဲလှယ်ရပါမည်။
          </div>
        </div>
      </div>
    </div>
  );
};
