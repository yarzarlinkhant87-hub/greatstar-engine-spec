/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CylinderHeadBoltSequence, TorqueUnit } from '../types/engine';
import { Layers, HelpCircle, CheckCircle } from 'lucide-react';

interface Props {
  sequence: CylinderHeadBoltSequence;
  currentUnit: TorqueUnit;
}

export const HeadBoltSequenceView: React.FC<Props> = ({ sequence, currentUnit }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(sequence.stages.length - 1);
  const [highlightedBolt, setHighlightedBolt] = useState<number | null>(null);

  const getTorqueDisplay = (stage: CylinderHeadBoltSequence['stages'][0]) => {
    let val = '';
    if (currentUnit === 'nm') val = `${stage.nm} Nm`;
    else if (currentUnit === 'ftlb') val = `${stage.ftlb} Ft-lb`;
    else val = `${stage.kgfm} kgf·m`;

    if (stage.degree) {
      val += ` (${stage.degree})`;
    }
    return val;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Layers className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-100">
              ဆလင်ဒါခေါင်းဆွဲ အစီအစဉ် ဇယား (Cylinder Head Bolt Tightening Sequence)
            </h4>
            <p className="text-xs text-slate-400">
              စုစုပေါင်း မူလီခေါင်း ({sequence.boltCount}) လုံး တပ်ဆင်ထားသည့် အနေအထား
            </p>
          </div>
        </div>

        {/* Stages selector pills */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {sequence.stages.map((st, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStageIndex(idx)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                activeStageIndex === idx
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Step {st.step}
            </button>
          ))}
        </div>
      </div>

      {/* Active stage info card */}
      <div className="bg-gradient-to-r from-emerald-950/60 to-slate-950 border border-emerald-500/40 rounded-xl p-3 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            လက်ရှိရွေးထားသော အဆင့် (Active Stage)
          </span>
          <p className="font-semibold text-sm text-slate-200">
            အဆင့် ({sequence.stages[activeStageIndex]?.step}): {sequence.stages[activeStageIndex]?.description}
          </p>
        </div>
        <div className="bg-slate-900 border border-emerald-500/50 px-3.5 py-1.5 rounded-xl shadow-inner text-right">
          <span className="text-[10px] text-slate-400 uppercase block">ဆွဲရမည့် ပေါင်ချိန်</span>
          <span className="text-base sm:text-lg font-black text-amber-300 tracking-wide font-mono">
            {getTorqueDisplay(sequence.stages[activeStageIndex])}
          </span>
        </div>
      </div>

      {/* Bolt Grid Diagram */}
      <div className="bg-slate-950 rounded-xl p-4 sm:p-6 border border-slate-800 flex flex-col items-center justify-center my-2 relative overflow-hidden">
        <div className="text-[11px] text-slate-400 font-semibold mb-3 tracking-wider flex items-center gap-2">
          <span>← ရေတိုင်ကီဘက် (Front / Radiator)</span>
          <span className="h-1 w-8 bg-slate-700 rounded-full" />
          <span>ဖလိုက်ဝှီးဘက် (Rear / Flywheel) →</span>
        </div>

        {/* Single Cylinder 4-Bolt Pattern */}
        {sequence.boltCount === 4 && (
          <div className="grid grid-cols-2 gap-8 sm:gap-12 p-4 bg-slate-900/60 rounded-2xl border border-slate-700/60 shadow-inner">
            {[1, 2, 4, 3].map((bNum) => {
              const seqPosition = sequence.order.indexOf(bNum) + 1;
              const isHl = highlightedBolt === bNum;
              return (
                <button
                  key={bNum}
                  onClick={() => setHighlightedBolt(bNum === highlightedBolt ? null : bNum)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center border-2 transition transform active:scale-90 ${
                    isHl
                      ? 'bg-amber-500 text-slate-950 border-amber-300 scale-105 shadow-lg shadow-amber-500/30'
                      : 'bg-slate-800 text-white border-emerald-500/60 hover:border-emerald-400 hover:bg-slate-750'
                  }`}
                >
                  <span className="text-[10px] font-bold opacity-70">Order</span>
                  <span className="text-lg font-black font-mono">#{seqPosition}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Multi-Cylinder 14-Bolt or 18-Bolt Pattern */}
        {sequence.boltCount > 4 && (
          <div className="w-full overflow-x-auto pb-2 flex justify-center">
            <div className="min-w-[340px] max-w-full bg-slate-900/70 p-4 rounded-2xl border border-slate-800 shadow-inner">
              {/* Row 1 - Top Intake Side */}
              <div className="flex justify-between items-center gap-2 sm:gap-4 mb-5">
                <span className="text-[10px] text-slate-500 font-bold uppercase rotate-[-90deg] sm:rotate-0">
                  Exhaust
                </span>
                <div className="flex gap-2 sm:gap-3 flex-1 justify-around">
                  {sequence.order.slice(0, Math.ceil(sequence.boltCount / 2)).map((boltNum, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHighlightedBolt(boltNum === highlightedBolt ? null : boltNum)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex flex-col items-center justify-center border transition ${
                        highlightedBolt === boltNum
                          ? 'bg-amber-400 text-slate-950 border-amber-300 scale-110 shadow-lg'
                          : idx === 0 || idx === 1
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                          : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-slate-500'
                      }`}
                    >
                      <span className="text-[9px] opacity-70">#{idx + 1}</span>
                      <span className="text-xs sm:text-sm font-black font-mono">B{boltNum}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2 - Bottom Intake Side */}
              <div className="flex justify-between items-center gap-2 sm:gap-4">
                <span className="text-[10px] text-slate-500 font-bold uppercase rotate-[-90deg] sm:rotate-0">
                  Intake
                </span>
                <div className="flex gap-2 sm:gap-3 flex-1 justify-around">
                  {sequence.order.slice(Math.ceil(sequence.boltCount / 2)).map((boltNum, idx) => {
                    const actualStep = Math.ceil(sequence.boltCount / 2) + idx + 1;
                    return (
                      <button
                        key={idx}
                        onClick={() => setHighlightedBolt(boltNum === highlightedBolt ? null : boltNum)}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex flex-col items-center justify-center border transition ${
                          highlightedBolt === boltNum
                            ? 'bg-amber-400 text-slate-950 border-amber-300 scale-110 shadow-lg'
                            : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:border-slate-500'
                        }`}
                      >
                        <span className="text-[9px] opacity-70">#{actualStep}</span>
                        <span className="text-xs sm:text-sm font-black font-mono">B{boltNum}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-[11px] text-slate-400 mt-3 text-center">
          💡 အလယ်ဗဟိုမှ စတင်၍ ဘေးနှစ်ဖက်သို့ အစီအစဉ်နံပါတ် (#1, #2, #3...) အတိုင်း ညီမျှစွာဆွဲရမည်။
        </p>
      </div>

      {/* Workshop rule note */}
      <div className="mt-3 bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-emerald-300">ဆွဲနည်းစနစ် မှတ်ချက်: </span>
          <span>{sequence.notes}</span>
        </div>
      </div>
    </div>
  );
};
