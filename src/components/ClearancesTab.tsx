/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClearanceItem, AgriEngine } from '../types/engine';
import {
  Gauge,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Wrench,
  Check,
  HelpCircle,
  Layers,
  Sparkles,
  Info,
  Flame,
  Wind,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  clearances: ClearanceItem[];
  engine?: AgriEngine;
}

export const ClearancesTab: React.FC<Props> = ({ clearances, engine }) => {
  // Determine cylinders count
  const cylinderCount = engine?.cylinders || 4;
  
  // State for valve adjustment mode
  const [adjustMethod, setAdjustMethod] = useState<'two_turn' | 'overlap' | 'step_by_step'>('two_turn');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedOverlapPair, setSelectedOverlapPair] = useState<number>(1);

  // Extract intake and exhaust clearance from items
  const intakeItem = clearances.find(
    (c) =>
      c.id.includes('valve_in') ||
      c.name.toLowerCase().includes('intake valve') ||
      c.burmeseName.includes('အဝင်') ||
      c.burmeseName.includes('လေဝင်')
  );

  const exhaustItem = clearances.find(
    (c) =>
      c.id.includes('valve_ex') ||
      c.name.toLowerCase().includes('exhaust valve') ||
      c.burmeseName.includes('အထွက်') ||
      c.burmeseName.includes('မီးခိုး')
  );

  // Firing orders
  const getFiringOrder = () => {
    if (cylinderCount === 1) return 'TDC (1-T အမှတ် Compression)';
    if (cylinderCount === 3) return '1 - 2 - 3';
    if (cylinderCount === 6) return '1 - 5 - 3 - 6 - 2 - 4';
    return '1 - 3 - 4 - 2'; // standard 4-cylinder
  };

  // 4-Cylinder 2-Turn Method definitions
  // Step 1: Cyl #1 TDC Compression: Adjust Cyl 1 (In, Ex), Cyl 2 (In), Cyl 3 (Ex)
  // Step 2: Cyl #4 TDC Compression (360° rotation): Adjust Cyl 4 (In, Ex), Cyl 2 (Ex), Cyl 3 (In)
  const isValveAdjustable4Cyl = (cylinder: number, valveType: 'IN' | 'EX', step: number) => {
    if (step === 1) {
      if (cylinder === 1) return true; // Cyl 1 In & Ex
      if (cylinder === 2 && valveType === 'IN') return true; // Cyl 2 In
      if (cylinder === 3 && valveType === 'EX') return true; // Cyl 3 Ex
      return false;
    } else {
      if (cylinder === 4) return true; // Cyl 4 In & Ex
      if (cylinder === 2 && valveType === 'EX') return true; // Cyl 2 Ex
      if (cylinder === 3 && valveType === 'IN') return true; // Cyl 3 In
      return false;
    }
  };

  // 6-Cylinder 2-Turn Method definitions
  // Step 1: Cyl #1 TDC Compression: Cyl 1 (In, Ex), Cyl 2 (In), Cyl 3 (Ex), Cyl 4 (In), Cyl 5 (Ex)
  // Step 2: Cyl #6 TDC Compression (360° rotation): Cyl 6 (In, Ex), Cyl 2 (Ex), Cyl 3 (In), Cyl 4 (Ex), Cyl 5 (In)
  const isValveAdjustable6Cyl = (cylinder: number, valveType: 'IN' | 'EX', step: number) => {
    if (step === 1) {
      if (cylinder === 1) return true;
      if (cylinder === 2 && valveType === 'IN') return true;
      if (cylinder === 3 && valveType === 'EX') return true;
      if (cylinder === 4 && valveType === 'IN') return true;
      if (cylinder === 5 && valveType === 'EX') return true;
      return false;
    } else {
      if (cylinder === 6) return true;
      if (cylinder === 2 && valveType === 'EX') return true;
      if (cylinder === 3 && valveType === 'IN') return true;
      if (cylinder === 4 && valveType === 'EX') return true;
      if (cylinder === 5 && valveType === 'IN') return true;
      return false;
    }
  };

  const isValveActive = (cylinder: number, valveType: 'IN' | 'EX') => {
    if (cylinderCount === 1) return true;
    if (cylinderCount === 6) {
      return isValveAdjustable6Cyl(cylinder, valveType, activeStep);
    }
    // Default 4-cylinder
    return isValveAdjustable4Cyl(cylinder, valveType, activeStep);
  };

  // 4-Cylinder Overlap pairs
  const overlapPairs4Cyl = [
    {
      id: 1,
      overlapCyl: 4,
      adjustCyl: 1,
      overlapDesc: 'စလင်ဒါ (၄) အိုဗာလက် (Exhaust ပိတ်ဆဲ + Intake စပွင့်ဆဲ လှုပ်ချိန်)',
      adjustDesc: 'စလင်ဒါ (၁) TDC Compression ရောက်နေပြီ ➜ အဝင် (IN) နှင့် အထွက် (EX) ၂ ခုစလုံး ချိန်ပါ',
      rule: 'အတွဲ ၁-၄ (စလင်ဒါ ၄ Overlap ဖြစ်လျှင် စလင်ဒါ ၁ ကို စိတ်ကြိုက်ချိန်ပါ)',
    },
    {
      id: 2,
      overlapCyl: 2,
      adjustCyl: 3,
      overlapDesc: 'စလင်ဒါ (၂) အိုဗာလက် (Exhaust ပိတ်ဆဲ + Intake စပွင့်ဆဲ လှုပ်ချိန်)',
      adjustDesc: 'စလင်ဒါ (၃) TDC Compression ရောက်နေပြီ ➜ အဝင် (IN) နှင့် အထွက် (EX) ၂ ခုစလုံး ချိန်ပါ',
      rule: 'အတွဲ ၂-၃ (စလင်ဒါ ၂ Overlap ဖြစ်လျှင် စလင်ဒါ ၃ ကို စိတ်ကြိုက်ချိန်ပါ)',
    },
    {
      id: 3,
      overlapCyl: 1,
      adjustCyl: 4,
      overlapDesc: 'စလင်ဒါ (၁) အိုဗာလက် (Exhaust ပိတ်ဆဲ + Intake စပွင့်ဆဲ လှုပ်ချိန်)',
      adjustDesc: 'စလင်ဒါ (၄) TDC Compression ရောက်နေပြီ ➜ အဝင် (IN) နှင့် အထွက် (EX) ၂ ခုစလုံး ချိန်ပါ',
      rule: 'အတွဲ ၄-၁ (စလင်ဒါ ၁ Overlap ဖြစ်လျှင် စလင်ဒါ ၄ ကို စိတ်ကြိုက်ချိန်ပါ)',
    },
    {
      id: 4,
      overlapCyl: 3,
      adjustCyl: 2,
      overlapDesc: 'စလင်ဒါ (၃) အိုဗာလက် (Exhaust ပိတ်ဆဲ + Intake စပွင့်ဆဲ လှုပ်ချိန်)',
      adjustDesc: 'စလင်ဒါ (၂) TDC Compression ရောက်နေပြီ ➜ အဝင် (IN) နှင့် အထွက် (EX) ၂ ခုစလုံး ချိန်ပါ',
      rule: 'အတွဲ ၃-၂ (စလင်ဒါ ၃ Overlap ဖြစ်လျှင် စလင်ဒါ ၂ ကို စိတ်ကြိုက်ချိန်ပါ)',
    },
  ];

  // 6-Cylinder Overlap pairs (Rule of 7: 1-6, 2-5, 3-4)
  const overlapPairs6Cyl = [
    { id: 1, overlapCyl: 6, adjustCyl: 1, overlapDesc: 'စလင်ဒါ (၆) အိုဗာလက်ဖြစ်ချိန်', adjustDesc: 'စလင်ဒါ (၁) ၏ In & Ex ဘား ၂ ခုစလုံးချိန်ပါ', rule: 'အတွဲ (၁ - ၆)' },
    { id: 2, overlapCyl: 2, adjustCyl: 5, overlapDesc: 'စလင်ဒါ (၂) အိုဗာလက်ဖြစ်ချိန်', adjustDesc: 'စလင်ဒါ (၅) ၏ In & Ex ဘား ၂ ခုစလုံးချိန်ပါ', rule: 'အတွဲ (၅ - ၂)' },
    { id: 3, overlapCyl: 4, adjustCyl: 3, overlapDesc: 'စလင်ဒါ (၄) အိုဗာလက်ဖြစ်ချိန်', adjustDesc: 'စလင်ဒါ (၃) ၏ In & Ex ဘား ၂ ခုစလုံးချိန်ပါ', rule: 'အတွဲ (၃ - ၄)' },
    { id: 4, overlapCyl: 1, adjustCyl: 6, overlapDesc: 'စလင်ဒါ (၁) အိုဗာလက်ဖြစ်ချိန်', adjustDesc: 'စလင်ဒါ (၆) ၏ In & Ex ဘား ၂ ခုစလုံးချိန်ပါ', rule: 'အတွဲ (၆ - ၁)' },
    { id: 5, overlapCyl: 5, adjustCyl: 2, overlapDesc: 'စလင်ဒါ (၅) အိုဗာလက်ဖြစ်ချိန်', adjustDesc: 'စလင်ဒါ (၂) ၏ In & Ex ဘား ၂ ခုစလုံးချိန်ပါ', rule: 'အတွဲ (၂ - ၅)' },
    { id: 6, overlapCyl: 3, adjustCyl: 4, overlapDesc: 'စလင်ဒါ (၃) အိုဗာလက်ဖြစ်ချိန်', adjustDesc: 'စလင်ဒါ (၄) ၏ In & Ex ဘား ၂ ခုစလုံးချိန်ပါ', rule: 'အတွဲ (၄ - ၃)' },
  ];

  return (
    <div className="space-y-5">
      {/* SECTION 1: MASTER VALVE CLEARANCE SPEC CARD (အဝင်ဘား / အထွက်ဘား စံချိန် မျက်မြင်ကတ်) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 border border-teal-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <Gauge className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-100 flex items-center gap-2">
                <span>{engine?.name || 'လက်ရှိအင်ဂျင်'} • ဘားချိန်နည်း & ကင်းလွတ်ခွာ (Valve Clearance Guide)</span>
              </h3>
              <p className="text-xs text-teal-300/90 font-medium">
                ဆရာများ မေ့တတ်သော Valve Firing Order နှင့် ဘားချိန်နည်း စနစ်တကျ အပြည့်အစုံ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-slate-950 border border-teal-500/30 text-teal-300 font-mono text-xs font-bold">
              စလင်ဒါ: {cylinderCount} လုံး
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
              Firing: {getFiringOrder()}
            </span>
          </div>
        </div>

        {/* 2 Valve Cards: Intake (အဝင်) & Exhaust (အထွက်) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Intake Valve Box */}
          <div className="bg-slate-950/80 border-2 border-sky-500/40 rounded-2xl p-4 relative overflow-hidden group hover:border-sky-400 transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <Wind className="w-4 h-4" />
                <span>လေဝင်ဘား (Intake Valve - Cold)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold border border-sky-500/30">
                အင်ဂျင်အေးချိန်
              </span>
            </div>

            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-sky-300">
                {intakeItem ? `${intakeItem.standardVal} ${intakeItem.unit}` : '0.20 - 0.25 mm'}
              </span>
            </div>

            <div className="text-[11px] text-slate-300 flex items-center justify-between border-t border-slate-800/80 pt-2 mt-2">
              <span className="text-slate-400">အများဆုံးကန့်သတ် (Limit):</span>
              <span className="font-mono text-amber-400 font-bold">
                Max {intakeItem?.limitVal || '0.30'} mm
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              💡 {intakeItem?.checkMethod || 'Feeler gauge ထိုးသွင်းရာတွင် အနည်းငယ်ဆွဲစီးရုံ (Light drag) ဖြစ်ရမည်'}
            </p>
          </div>

          {/* Exhaust Valve Box */}
          <div className="bg-slate-950/80 border-2 border-rose-500/40 rounded-2xl p-4 relative overflow-hidden group hover:border-rose-400 transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4" />
                <span>မီးခိုးထွက်ဘား (Exhaust Valve - Cold)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold border border-rose-500/30">
                အပူခံသတ္တုကား
              </span>
            </div>

            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-black font-mono text-rose-300">
                {exhaustItem ? `${exhaustItem.standardVal} ${exhaustItem.unit}` : '0.25 - 0.30 mm'}
              </span>
            </div>

            <div className="text-[11px] text-slate-300 flex items-center justify-between border-t border-slate-800/80 pt-2 mt-2">
              <span className="text-slate-400">အများဆုံးကန့်သတ် (Limit):</span>
              <span className="font-mono text-amber-400 font-bold">
                Max {exhaustItem?.limitVal || '0.35'} mm
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              💡 မီးခိုးဘားသည် အပူချိန်မြင့်မားသဖြင့် သတ္တုကားထွက်မှု ပိုများသောကြောင့် အဝင်ဘားထက် အမြဲ ပိုကျယ်ရပါသည်
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE VALVE ADJUSTMENT WORKSHOP METHODS (ဘားချိန်နည်း စနစ် (၃) မျိုး) */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Wrench className="w-5 h-5" />
            </span>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-100">
                ဝပ်ရှော့ လက်တွေ့ ဘားချိန်နည်းစနစ်များ (Step-by-Step Valve Adjustment)
              </h4>
              <p className="text-xs text-slate-400">
                ဆရာ့အလေ့အထအရ အဆင်ပြေဆုံး နည်းလမ်းကို ရွေးချယ် အသုံးပြုနိုင်ပါသည်
              </p>
            </div>
          </div>

          {/* Method selector pills */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
            <button
              onClick={() => setAdjustMethod('two_turn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                adjustMethod === 'two_turn'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>၁။ ၂-ပတ် အမြန်နည်း (စက်ရုံထုတ်)</span>
            </button>

            <button
              onClick={() => setAdjustMethod('overlap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                adjustMethod === 'overlap'
                  ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-400/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>၂။ အိုဗာလက် အတွဲနည်း (အလွယ်ဆုံး)</span>
            </button>

            <button
              onClick={() => setAdjustMethod('step_by_step')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                adjustMethod === 'step_by_step'
                  ? 'bg-purple-400 text-slate-950 shadow-md shadow-purple-400/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>၃။ တစ်လုံးချင်းစီ လှည့်ချိန်နည်း</span>
            </button>
          </div>
        </div>

        {/* METHOD 1: TWO-TURN METHOD (ခရိုင်းရှပ် ၂ ပတ်တည်းဖြင့် အမြန်ဘားချိန်နည်း) */}
        {adjustMethod === 'two_turn' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200">
              <strong>ခရိုင်းရှပ် (၂) ပတ် အမြန်ဘားချိန်နည်း စည်းမျဉ်း:</strong> ခရိုင်းရှပ်ကို တစ်ပတ်စီ (360°) ၂ ကြိမ်တည်း လှည့်ပြီး စလင်ဒါအားလုံး၏ ဘားများကို တိကျမြန်ဆန်စွာ အပြီးချိန်နိုင်ပါသည်။
            </div>

            {/* Step Selection Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setActiveStep(1)}
                className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
                  activeStep === 1
                    ? 'bg-gradient-to-r from-amber-500/20 to-slate-900 border-amber-400 text-slate-100 shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-300">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
                      ၁
                    </span>
                    <span>ပထမအဆင့်: စလင်ဒါ (၁) TDC Compression</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 pl-8">
                    စလင်ဒါ ၁ ပစ္စတင် အပေါ်ဆုံးရောက်၊ ရော့ကာအမ်း ၂ ခုလုံး လွတ်နေချိန်
                  </p>
                </div>
                {activeStep === 1 && <Check className="w-5 h-5 text-amber-400" />}
              </button>

              <button
                onClick={() => setActiveStep(2)}
                className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
                  activeStep === 2
                    ? 'bg-gradient-to-r from-teal-500/20 to-slate-900 border-teal-400 text-slate-100 shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-teal-300">
                    <span className="w-6 h-6 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center font-black text-xs">
                      ၂
                    </span>
                    <span>
                      ဒုတိယအဆင့်: ခရိုင်း 360° လှည့်ပြီး စလင်ဒါ ({cylinderCount === 6 ? '၆' : '၄'}) TDC
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 pl-8">
                    ခရိုင်းရှပ်ကို တစ်ပတ် အပြည့် (360°) လှည့်ပြီး ကျန်ဘားများ အပြီးချိန်ပါ
                  </p>
                </div>
                {activeStep === 2 && <Check className="w-5 h-5 text-teal-400" />}
              </button>
            </div>

            {/* Visual Valve Layout Diagram (မျက်မြင် ဘားများ ပြသမှု) */}
            <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>စိမ်းရောင် လင်းနေသော ဘားများကို ယခုအဆင့်တွင် ချိန်ပါ:</span>
                </span>
                <span className="text-slate-400 text-[11px]">
                  (အင်ဂျင်ရှေ့မှ နောက်သို့ ရှုထောင့် - Front to Rear)
                </span>
              </div>

              {/* Cylinders Row */}
              <div className={`grid grid-cols-${cylinderCount > 4 ? 6 : cylinderCount} gap-2 sm:gap-3`}>
                {Array.from({ length: cylinderCount }).map((_, idx) => {
                  const cylNum = idx + 1;
                  const inActive = isValveActive(cylNum, 'IN');
                  const exActive = isValveActive(cylNum, 'EX');

                  return (
                    <div
                      key={cylNum}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-center flex flex-col justify-between"
                    >
                      <div className="text-[11px] font-bold text-slate-400 mb-2 border-b border-slate-800 pb-1">
                        Cyl #{cylNum}
                      </div>

                      <div className="space-y-2">
                        {/* INTAKE VALVE */}
                        <div
                          className={`p-2 rounded-lg border text-center transition ${
                            inActive
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20 font-bold scale-105'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-600'
                          }`}
                        >
                          <div className="text-[10px] uppercase font-mono">IN (လေဝင်)</div>
                          <div className="text-xs font-black mt-0.5">
                            {inActive ? 'ချိန်ပါ 🟢' : 'မချိန်ရ ✕'}
                          </div>
                        </div>

                        {/* EXHAUST VALVE */}
                        <div
                          className={`p-2 rounded-lg border text-center transition ${
                            exActive
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20 font-bold scale-105'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-600'
                          }`}
                        >
                          <div className="text-[10px] uppercase font-mono">EX (မီးခိုး)</div>
                          <div className="text-xs font-black mt-0.5">
                            {exActive ? 'ချိန်ပါ 🟢' : 'မချိန်ရ ✕'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Exact instructions text */}
              <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {activeStep === 1 ? (
                  cylinderCount === 6 ? (
                    <div>
                      <strong className="text-amber-300">အဆင့် (၁) တွင် ချိန်ရမည့် ဘားများ:</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[11px] text-slate-300">
                        <li><strong>စလင်ဒါ (၁):</strong> လေဝင်ဘား (IN) + မီးခိုးဘား (EX) [၂ ခုစလုံး]</li>
                        <li><strong>စလင်ဒါ (၂):</strong> လေဝင်ဘား (IN)</li>
                        <li><strong>စလင်ဒါ (၃):</strong> မီးခိုးဘား (EX)</li>
                        <li><strong>စလင်ဒါ (၄):</strong> လေဝင်ဘား (IN)</li>
                        <li><strong>စလင်ဒါ (၅):</strong> မီးခိုးဘား (EX)</li>
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <strong className="text-amber-300">အဆင့် (၁) တွင် ချိန်ရမည့် ဘားများ:</strong>
                      <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[11px] text-slate-300">
                        <li><strong>စလင်ဒါ (၁):</strong> လေဝင်ဘား (IN) + မီးခိုးဘား (EX) [၂ ခုစလုံး]</li>
                        <li><strong>စလင်ဒါ (၂):</strong> လေဝင်ဘား (IN)</li>
                        <li><strong>စလင်ဒါ (၃):</strong> မီးခိုးဘား (EX)</li>
                      </ul>
                      <span className="text-[11px] text-amber-200/90 block mt-1">
                        (စုစုပေါင်း ဘား ၄ ခု ပြီးပါပြီ။ ပြီးပါက အဆင့် ၂ ခလုတ်ကို နှိပ်ပါ)
                      </span>
                    </div>
                  )
                ) : cylinderCount === 6 ? (
                  <div>
                    <strong className="text-teal-300">အဆင့် (၂) တွင် ချိန်ရမည့် ကျန်ဘားများ:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[11px] text-slate-300">
                      <li><strong>စလင်ဒါ (၆):</strong> လေဝင်ဘား (IN) + မီးခိုးဘား (EX) [၂ ခုစလုံး]</li>
                      <li><strong>စလင်ဒါ (၂):</strong> မီးခိုးဘား (EX)</li>
                      <li><strong>စလင်ဒါ (၃):</strong> လေဝင်ဘား (IN)</li>
                      <li><strong>စလင်ဒါ (၄):</strong> မီးခိုးဘား (EX)</li>
                      <li><strong>စလင်ဒါ (၅):</strong> လေဝင်ဘား (IN)</li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <strong className="text-teal-300">အဆင့် (၂) တွင် ချိန်ရမည့် ကျန်ဘားများ:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[11px] text-slate-300">
                      <li><strong>စလင်ဒါ (၄):</strong> လေဝင်ဘား (IN) + မီးခိုးဘား (EX) [၂ ခုစလုံး]</li>
                      <li><strong>စလင်ဒါ (၂):</strong> မီးခိုးဘား (EX)</li>
                      <li><strong>စလင်ဒါ (၃):</strong> လေဝင်ဘား (IN)</li>
                    </ul>
                    <span className="text-[11px] text-teal-200/90 block mt-1">
                      (စုစုပေါင်း ဘား ၄ ခု ထပ်မံချိန်ပြီးပါက အင်ဂျင်၏ ဘား ၈ ခုစလုံး အပြီးစီး ချိန်ညှိပြီးပါပြီ!)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* METHOD 2: COMPANION CYLINDER / OVERLAP METHOD (အိုဗာလက် အတွဲနည်း - ဆရာသမားများ မေ့မရသော စည်းမျဉ်း) */}
        {adjustMethod === 'overlap' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/30 text-xs text-teal-200 leading-relaxed">
              <strong className="text-teal-300">အိုဗာလက် (Overlap Method) ဆိုတာ ဘာလဲ?</strong>
              <p className="mt-1 text-[11px] text-slate-300">
                မီးခိုးဘား (Exhaust) ပိတ်လုဆဲဆဲနှင့် လေဝင်ဘား (Intake) စတင်ပွင့်လုဆဲဆဲ (Rocking point) ဖြစ်နေသော အခြေအနေကို Overlap ဟု ခေါ်ပါသည်။ စလင်ဒါတစ်လုံး Overlap ဖြစ်နေချိန်တွင် ၎င်းနှင့် တွဲလျက်ဖြစ်သော အခြားစလင်ဒါသည် TDC Compression (မီးပွင့်အထွတ်အထိပ်) သို့ အတိအကျ ရောက်ရှိနေပြီဖြစ်၍ <strong>ထိုစလင်ဒါ၏ IN နှင့် EX ဘား ၂ ခုစလုံးကို စိတ်ချလက်ချ အေးဆေး ချိန်နိုင်ပါသည်!</strong>
              </p>
            </div>

            {/* Overlap Pairs Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(cylinderCount === 6 ? overlapPairs6Cyl : overlapPairs4Cyl).map((pair) => (
                <div
                  key={pair.id}
                  onClick={() => setSelectedOverlapPair(pair.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                    selectedOverlapPair === pair.id
                      ? 'bg-slate-900 border-teal-400 shadow-md ring-1 ring-teal-400'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {pair.rule}
                    </span>
                    <span className="text-[11px] text-amber-400 font-bold">
                      Cyl #{pair.adjustCyl} ချိန်မည်
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-slate-400 flex items-start gap-1.5">
                      <RotateCw className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span>{pair.overlapDesc}</span>
                    </div>
                    <div className="text-slate-200 font-medium flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-emerald-300">{pair.adjustDesc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Memory Cheat Sheet */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/40 text-xs flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-bold">ဆရာကြီးများ မှတ်ဉာဏ် သော့ချက် (Quick Memory Trick):</strong>
                <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                  • ၄ လုံးထိုး အင်ဂျင်များတွင် အတွဲသည် <strong>(၁ နှင့် ၄)</strong>၊ <strong>(၂ နှင့် ၃)</strong> ဖြစ်ပါသည်။ ပစ္စတင် အတူတက်သော်လည်း တစ်လုံး မီးပွင့်ချိန် အခြားတစ်လုံး အိုဗာလက် ဖြစ်ပါသည်။ ထို့ကြောင့် <strong>၄ လှုပ်လျှင် ၁ ချိန်၊ ၁ လှုပ်လျှင် ၄ ချိန်၊ ၂ လှုပ်လျှင် ၃ ချိန်၊ ၃ လှုပ်လျှင် ၂ ချိန်ပါ!</strong> မည်သည့်အခါမျှ မမှားနိုင်တော့ပါ!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* METHOD 3: STEP-BY-STEP CYLINDER ROTATION (တစ်လုံးချင်း TDC လှည့်ချိန်နည်း) */}
        {adjustMethod === 'step_by_step' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 leading-relaxed">
              <strong className="text-purple-300">တစ်လုံးချင်းစီ Firing Order အတိုင်း လှည့်ချိန်နည်း:</strong>
              <p className="mt-1 text-[11px] text-slate-300">
                အင်ဂျင်ကို Firing Order အတိုင်း တစ်လုံးချင်း TDC (Compression Stroke) သို့ ရောက်အောင် ခရိုင်းကို လက်ဖြင့် လှည့်ကာ သက်ဆိုင်ရာ စလင်ဒါ၏ အဝင် (IN) နှင့် အထွက် (EX) ကို အေးဆေး စိတ်ချလက်ချ ချိန်ညှိသည့် နည်းလမ်းဖြစ်ပါသည်။
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {(cylinderCount === 6
                ? [1, 5, 3, 6, 2, 4]
                : cylinderCount === 3
                ? [1, 2, 3]
                : cylinderCount === 1
                ? [1]
                : [1, 3, 4, 2]
              ).map((cylNum, stepIdx) => (
                <div key={cylNum} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center font-bold text-xs">
                      {stepIdx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-200">စလင်ဒါ #{cylNum}</span>
                  </div>

                  <p className="text-[11px] text-slate-400 mb-2">
                    ပစ္စတင် #{cylNum} ကို TDC Compression အထွတ်သို့ ရောက်အောင် ခရိုင်းရှပ်လှည့်ပါ
                  </p>

                  <div className="bg-slate-900/90 p-2 rounded-lg text-[10px] text-emerald-300 font-mono flex items-center justify-between">
                    <span>IN & EX ဘား ၂ ခုစလုံး</span>
                    <span className="font-bold">ချိန်ပါ 🟢</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: WORKSHOP FEELER GAUGE PRO TIPS (ဖီးလာဂေ့ သုံးစွဲနည်းနှင့် ရောဂါလက္ခဏာများ) */}
      <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-100">
              ဝပ်ရှော့ လက်တွေ့ အရေးကြီး သတိပေးချက်များ (Feeler Gauge Pro Rules)
            </h4>
            <p className="text-xs text-slate-400">
              ဘားချိန် လွဲမှားပါက ဖြစ်ပေါ်လာနိုင်သော အင်ဂျင်ရောဂါများနှင့် ကာကွယ်နည်းများ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: How to feel */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <h5 className="font-bold text-xs text-amber-300 flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ဖီးလာဂေ့ သံဖတ် အထိအတွေ့ (Light Drag):</span>
            </h5>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              ဖီးလာဂေ့ သံပြားကို ဘားထိပ်နှင့် ရော့ကာအမ်းကြား ထိုးသွင်းဆွဲယူရာတွင် ချောမွေ့စွာ ချောင်လွန်းခြင်းမရှိ၊ ကြပ်လွန်းခြင်းမရှိဘဲ <strong>အနည်းငယ် ဆွဲစီးစီး (Slight drag)</strong> ခံစားရပါက စံချိန်ကိုက်ပြီ ဖြစ်ပါသည်။
            </p>
          </div>

          {/* Card 2: Tight Valve danger */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <h5 className="font-bold text-xs text-rose-400 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>ဘားကြပ်လွန်းခြင်း (Tight Valve) အန္တရာယ်:</span>
            </h5>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              ဘားကင်းလွတ်ခွာ နည်းလွန်း/ကြပ်လွန်းပါက အင်ဂျင်ပူလာချိန်တွင် ဘားလုံးဝ မပိတ်တော့ဘဲ <strong>ကွန်ပရက်ရှင်ကျခြင်း၊ စက်နှိုးခက်ခြင်းနှင့် ဘားလောင်ကျွမ်းပျက်စီးခြင်း (Burnt Valve)</strong> ဖြစ်ပေါ်စေပါသည်။
            </p>
          </div>

          {/* Card 3: Loose Valve danger */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <h5 className="font-bold text-xs text-sky-400 flex items-center gap-1.5 mb-2">
              <Info className="w-4 h-4 text-sky-400" />
              <span>ဘားချောင်လွန်းခြင်း (Loose Valve) အန္တရာယ်:</span>
            </h5>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              ဘားဟလွန်းပါက အင်ဂျင်လည်ပတ်စဉ် <strong>တက်တက် တက်တက် ဆူညံသံ (Tappet noise)</strong> ကျယ်လောင်စွာ ထွက်ခြင်း၊ လေဝင်အား/မီးခိုးထွက်အား နည်းသဖြင့် အဆွဲအရုန်းပါဝါကျဆင်းခြင်း ဖြစ်စေပါသည်။
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 4: FULL CLEARANCES TABLE (အင်ဂျင်တွင်း တိုင်းတာစစ်ဆေးရမည့် ကင်းလွတ်ခွာ စံချိန်များ အပြည့်အစုံ) */}
      <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
          <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
            <Gauge className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-100">
              အင်ဂျင်တွင်း အခြားအစိတ်အပိုင်း ကင်းလွတ်ခွာ စံချိန်များ (Piston, Ring & Bearing Clearances)
            </h4>
            <p className="text-xs text-slate-400">
              ပစ္စတင်၊ ရင်းဂ်ကွာဟချက်၊ ခရိုင်းရှပ်ကစားချက် စံချိန်များနှင့် ကန့်သတ်ချက်များ
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
      </div>
    </div>
  );
};
