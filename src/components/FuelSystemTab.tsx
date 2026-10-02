/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FuelSystemSpec, AgriEngine } from '../types/engine';
import {
  Fuel,
  Zap,
  Settings,
  ShieldCheck,
  Activity,
  Gauge,
  RotateCw,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Sparkles,
  Droplets,
} from 'lucide-react';

interface Props {
  fuelSystem: FuelSystemSpec;
  engine?: AgriEngine;
}

export const FuelSystemTab: React.FC<Props> = ({ fuelSystem, engine }) => {
  // Active RPM stage for interactive view
  const [activeRpmStage, setActiveRpmStage] = useState<'all' | 'idle' | 'normal' | 'high'>('all');

  // Dynamic values based on engine or fallback to standards
  const isDirectInjection =
    engine?.brand === 'chinese_truck' ||
    engine?.name.includes('4100') ||
    engine?.name.includes('4102') ||
    engine?.name.includes('4JB1') ||
    engine?.name.includes('WP10') ||
    engine?.name.includes('TNV') ||
    engine?.name.includes('4.248');

  // Specs by RPM stage
  const rpmStages = [
    {
      id: 'idle',
      name: 'စလိုး အခြေအနေ (Idle / Slow Speed)',
      rpm: fuelSystem.idleRpm || (engine?.brand === 'chinese_truck' ? '650 - 750 RPM' : '750 - 850 RPM'),
      feedPressurePsi: fuelSystem.idleFeedPressurePsi || '20 - 35 PSI (1.4 - 2.4 bar)',
      fuelDelivery: fuelSystem.idleDeliveryMm3 || '10 - 15 mm³/stroke',
      oilPressurePsi: fuelSystem.oilPressureIdlePsi || '15 - 25 PSI (0.10 - 0.17 MPa)',
      nozzleBehavior: 'နိုဇယ်ခေါင်း "ကျွိကျွိ" မြည်သံ (Chatter) ဖြင့် အမှုန်ညီညီ ဖြန်းရမည်',
      warning: 'စလိုးတွင် ဆီပေါင် ၂၀ PSI အောက်ကျပါက စက်တုန်ခါခြင်း၊ စလိုးမငြိမ်ခြင်း ဖြစ်တတ်ပါသည်',
    },
    {
      id: 'normal',
      name: 'ပုံမှန် မောင်းနှင်ချိန် (Normal Working Load)',
      rpm: fuelSystem.normalRpm || (engine?.brand === 'chinese_truck' ? '1,400 - 1,800 RPM' : '1,500 - 1,900 RPM'),
      feedPressurePsi: fuelSystem.normalFeedPressurePsi || '35 - 55 PSI (2.4 - 3.8 bar)',
      fuelDelivery: fuelSystem.normalDeliveryMm3 || '35 - 45 mm³/stroke',
      oilPressurePsi: fuelSystem.oilPressureHighPsi ? '35 - 50 PSI' : '35 - 50 PSI (0.24 - 0.35 MPa)',
      nozzleBehavior: 'ဝန်အားနှင့်အညီ ဆီမှုန် ၄ ပေါက်/၅ ပေါက် ပြည့်ဝစွာ ထိုးဖြန်းခြင်း',
      warning: 'ပုံမှန်မောင်းနှင်ချိန်တွင် ဆီဖိအား ၃၅ PSI အထက် အမြဲရှိနေရပါမည်',
    },
    {
      id: 'high',
      name: 'ဟိုက်စပိ အမြင့်ဆုံး (High Speed / Full Throttle)',
      rpm: fuelSystem.highSpeedRpm || (engine?.brand === 'chinese_truck' ? '2,200 - 2,600 RPM' : '2,400 - 2,800 RPM'),
      feedPressurePsi: fuelSystem.highSpeedPressurePsi || '50 - 75 PSI (3.5 - 5.2 bar)',
      fuelDelivery: fuelSystem.highSpeedDeliveryMm3 || '52 - 65 mm³/stroke',
      oilPressurePsi: fuelSystem.oilPressureHighPsi || '45 - 65 PSI (0.31 - 0.45 MPa)',
      nozzleBehavior: 'ပလန်ဂျာအမြင့်ဆုံးဖိအားဖြင့် ဆီဖြန်းပြီး Governor မှ လည်ပတ်နှုန်းထိန်းချုပ်သည်',
      warning: 'Governor Cut-off ကန့်သတ်ချက်ထက် မကျော်လွန်စေရန် စစ်ဆေးပါ',
    },
  ];

  return (
    <div className="space-y-4">
      {/* SECTION 1: MASTER HEADER & NOZZLE OPENING PRESSURE CARDS */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Fuel className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-100 flex items-center gap-2">
                <span>{engine?.name || 'လက်ရှိအင်ဂျင်'} • ဒီဇယ်ဆီစနစ်၊ နိုဇယ်ပေါင် & ဆီဖိအား PSI စံချိန်များ</span>
              </h3>
              <p className="text-xs text-amber-300/90 font-medium">
                စလိုး၊ ပုံမှန်၊ ဟိုက်စပိ ဆီဖိအားပေါင် (PSI)၊ နိုဇယ်ဆီဖြန်းပေါင်နှင့် မီးချိန်ဒီဂရီ အပြည့်အစုံ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
              {isDirectInjection ? 'Direct Injection (တိုက်ရိုက်ဖြန်း)' : 'Pre-Chamber (အခန်းကြိုဖြန်း)'}
            </span>
          </div>
        </div>

        {/* 3 Main Highlight Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Card 1: Nozzle Opening Pressure */}
          <div className="bg-slate-950/90 border-2 border-amber-500/40 rounded-2xl p-3.5 relative overflow-hidden group hover:border-amber-400 transition">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Fuel className="w-4 h-4" />
                <span>နိုဇယ် ဆီစတင်ဖြန်းပေါင်</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold">
                Nozzle Pop-off
              </span>
            </div>

            <div className="my-1.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300 block">
                {fuelSystem.nozzlePressurePsi}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {fuelSystem.nozzlePressureBar} ({fuelSystem.nozzlePressureKgf})
              </span>
            </div>

            <div className="text-[10px] text-slate-400 border-t border-slate-800/80 pt-2 mt-2">
              နိုဇယ်ခေါင်းထိန်းနပ် ဆွဲပေါင်: <strong className="text-amber-300 font-mono">{fuelSystem.nozzleHolderTorque}</strong>
            </div>
          </div>

          {/* Card 2: Injection Timing BTDC */}
          <div className="bg-slate-950/90 border-2 border-teal-500/40 rounded-2xl p-3.5 relative overflow-hidden group hover:border-teal-400 transition">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <Settings className="w-4 h-4" />
                <span>မီးတိုင်မင် ဒီဂရီ</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono font-bold">
                BTDC
              </span>
            </div>

            <div className="my-1.5">
              <span className="text-2xl sm:text-3xl font-black font-mono text-teal-300 block">
                {fuelSystem.injectionTimingBtdc}
              </span>
              <span className="text-xs text-slate-400">
                ဖလိုက်ဝှီး / ပူလီပေါ်ရှိ မာ့ခ်နှင့် ဆီစတင်ဖြန်းချိန်
              </span>
            </div>

            <div className="text-[10px] text-slate-400 border-t border-slate-800/80 pt-2 mt-2">
              ဆီပန့်အမျိုးအစား: <strong className="text-slate-200">{fuelSystem.pumpType}</strong>
            </div>
          </div>

          {/* Card 3: Engine Oil Pressure Standard */}
          <div className="bg-slate-950/90 border-2 border-sky-500/40 rounded-2xl p-3.5 relative overflow-hidden group hover:border-sky-400 transition">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Droplets className="w-4 h-4" />
                <span>အင်ဂျင်ဝိုင် ဖိအားပေါင်</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono font-bold">
                Oil Pressure
              </span>
            </div>

            <div className="my-1.5">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">စလိုး (Idle):</span>
                <span className="text-base font-bold font-mono text-sky-300">
                  {fuelSystem.oilPressureIdlePsi || '15 - 25 PSI'}
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xs text-slate-400">ဟိုက်စပိ (High):</span>
                <span className="text-base font-bold font-mono text-sky-300">
                  {fuelSystem.oilPressureHighPsi || '45 - 65 PSI'}
                </span>
              </div>
            </div>

            <div className="text-[10px] text-rose-400 border-t border-slate-800/80 pt-2 mt-2">
              သတိပေးမီးလင်းချိန်: <strong>&lt; 12 PSI</strong> တွင် ချက်ချင်းစက်သတ်စစ်ဆေးရန်
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: RPM STAGE FUEL PRESSURES (စလိုး၊ ပုံမှန်၊ ဟိုက်စပိ ဆီဖြန်းချိန် ဖိအားပေါင် PSI ဇယားကြီး) */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Activity className="w-5 h-5" />
            </span>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-slate-100">
                စလိုး / ပုံမှန် / ဟိုက်စပိ ဆီဖိအားပေါင် & နိုဇယ်အပြုအမူ စံနှုန်းများ
              </h4>
              <p className="text-xs text-slate-400">
                လည်ပတ်နှုန်းအဆင့်ဆင့်အလိုက် ဆီဖိအား (PSI)၊ ဆီဖြန်းပမာဏနှင့် စစ်ဆေးချက်များ
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveRpmStage('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeRpmStage === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              အားလုံးပြပါ
            </button>
            <button
              onClick={() => setActiveRpmStage('idle')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeRpmStage === 'idle'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ၁။ စလိုး (Idle)
            </button>
            <button
              onClick={() => setActiveRpmStage('normal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeRpmStage === 'normal'
                  ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ၂။ ပုံမှန် (Normal)
            </button>
            <button
              onClick={() => setActiveRpmStage('high')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeRpmStage === 'high'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ၃။ ဟိုက်စပိ (High)
            </button>
          </div>
        </div>

        {/* 3 RPM Stage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {rpmStages
            .filter((st) => activeRpmStage === 'all' || activeRpmStage === st.id)
            .map((stage, idx) => (
              <div
                key={stage.id}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-amber-300">
                      {stage.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono font-bold">
                      {stage.rpm}
                    </span>
                  </div>

                  <div className="space-y-2.5 my-3 font-mono">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-sans text-slate-400">ဆီလိုင်း/ကျွေးဖိအား:</span>
                      <span className="text-sm font-bold text-emerald-300 font-mono">
                        {stage.feedPressurePsi}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-sans text-slate-400">ဆီဖြန်းပမာဏ:</span>
                      <span className="text-sm font-bold text-amber-300 font-mono">
                        {stage.fuelDelivery}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-sans text-slate-400">အင်ဂျင်ဝိုင်ဖိအား:</span>
                      <span className="text-sm font-bold text-sky-300 font-mono">
                        {stage.oilPressurePsi}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 mb-2">
                    <strong className="text-teal-300 block mb-0.5">နိုဇယ်အပြုအမူ:</strong>
                    {stage.nozzleBehavior}
                  </div>
                </div>

                <div className="text-[10px] text-amber-400/90 flex items-start gap-1 pt-2 border-t border-slate-800">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>{stage.warning}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* SECTION 3: NOZZLE BENCH TESTER CALIBRATION GUIDE (နိုဇယ်တက်စတာဖြင့် စစ်ဆေးနည်း (၃) မျိုး) */}
      <div className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
          <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-slate-100">
              နိုဇယ်တက်စတာ စမ်းသပ်စင် စစ်ဆေးနည်း (Nozzle Tester Workshop Tests)
            </h4>
            <p className="text-xs text-slate-400">
              ဝပ်ရှော့တွင် လက်ကိုင်နိုဇယ်တက်စတာ (Hand Tester) ဖြင့် မဖြစ်မနေ စစ်ဆေးရမည့် အဆင့် ၃ ဆင့်
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Test 1: Chatter Test */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-amber-300">၁။ စလိုးဆီစမ်းသပ်မှု (Chatter Test)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                Sound Test
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              တက်စတာလက်ကိုင်ကို ဖြည်းဖြည်းချင်း နှိပ်ချိန်တွင် နိုဇယ်ခေါင်းမှ <strong>"ကျွိ...ကျွိ...ကျွိ"</strong> မြည်သံ ထွက်ပြီး ဆီမှုန်မွှားများ ကောင်းစွာ ထွက်ရပါမည်။ အသံမမြည်ဘဲ ဆီချောင်းလိုက် ယိုထွက်ပါက နိုဇယ်အပ် (Needle) စားနေပါပြီ။
            </p>
          </div>

          {/* Test 2: Drip / Leak Test */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-rose-400">၂။ ယိုစိမ့်မှု စစ်ဆေးခြင်း (Leak Test)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                10 Seconds
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              နိုဇယ်ဆီဖြန်းပေါင် မရောက်မီ (ပေါင် ၂၀ ခန့် အလိုတွင်) ဖိအားကို ၁၀ စက္ကန့်ကြာ ငြိမ်အောင် ထိန်းထားပါ။ နိုဇယ်ထိပ်ဝမှ ဆီစက် လုံးဝ မကျရပါ၊ ဆီစိုရုံသာ ခွင့်ပြုပြီး ဆီစက်လိုက် ကျပါက အသစ်လဲရပါမည်။
            </p>
          </div>

          {/* Test 3: Spray Atomization */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-sky-400">၃။ ဆီဖြန်းပုံစံ (Spray Pattern)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono">
                Atomization
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              လက်ကိုင်ကို ခပ်သွက်သွက် ဖိချချိန်တွင် နိုဇယ်ပေါက် ၄ ပေါက် (သို့မဟုတ် ၅ ပေါက်) စလုံးမှ ဆီမှုန်မွှားများ ထောင့်ညီညာစွာ ဖြန်းထွက်ရပါမည်။ ဘေးတစ်စောင်းထွက်ခြင်း၊ ဆီလုံးကြီးများ ပါခြင်း မရှိရပါ။
            </p>
          </div>
        </div>

        {/* Glow plug and adjustments */}
        <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">အပူပေးပလပ် (Glow Plug):</span>
            <strong className="text-slate-200 font-mono">{fuelSystem.glowPlugSpec}</strong>
          </div>

          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-teal-400" />
            <span className="text-slate-400">မီးချိန်ညှိနည်း:</span>
            <strong className="text-slate-200">{fuelSystem.pumpTypeMm}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
