/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2, Share, HelpCircle, RotateCw } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const InstallPromptBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleForceReload = async () => {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
    }
    window.location.href = window.location.origin + '/?r=' + Date.now();
  };

  if (isInstalled || dismissed) {
    return null;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 border-b border-emerald-500/30 px-3 py-2 text-white shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Smartphone className="w-4 h-4 animate-bounce" />
            </span>
            <div>
              <p className="font-semibold text-emerald-200">
                ဖုန်းထဲသို့ အက်ပ်သွင်းယူရန် (Install App)
              </p>
              <p className="text-[11px] text-emerald-400/90 hidden sm:block">
                လိုင်းဖွင့်စရာမလိုဘဲ အင်တာနက် Offline ဖြင့် အချိန်မရွေး ဒိုင်းခနဲ တန်းပွင့်နိုင်ပါသည်
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setShowAndroidGuide(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition active:scale-95"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Chrome Reload & Logo ပြင်နည်း</span>
            </button>

            {isInstallable && (
              <button
                onClick={install}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ထည့်သွင်းမည် (Install)</span>
              </button>
            )}

            {isIOS && (
              <button
                onClick={() => setShowIOSGuide(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition"
              >
                <Share className="w-3.5 h-3.5" />
                <span>iOS သွင်းနည်း</span>
              </button>
            )}

            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="ပိတ်မည်"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Android & Chrome Reload Guide Modal */}
      {showAndroidGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-emerald-500/50 p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30">
                  <RotateCw className="w-4 h-4 animate-spin-slow" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-amber-300">
                    Chrome Reload & Logo ပြင်ဆင်နည်း
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    အဆင့် ၃ ဆင့်ဖြင့် ရွှေရောင် Logo အစစ် ဖုန်းပေါ်တင်ပါ
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAndroidGuide(false)}
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300 mb-5">
              {/* Quick Action: Force Reload & Clear Cache Button */}
              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-400/50 text-amber-200 shadow-inner">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-xs flex items-center gap-1.5 text-amber-300">
                    <RotateCw className="w-4 h-4 text-amber-400" />
                    Chrome Auto-Reload ခလုတ်:
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono">
                    အလွယ်ဆုံး
                  </span>
                </div>
                <p className="text-[11px] text-amber-200/90 leading-relaxed mb-3">
                  အောက်ပါခလုတ်ကို နှိပ်လိုက်ပါက Chrome Cache အဟောင်းများကို အလိုအလျောက် ရှင်းထုတ်ပြီး စာမျက်နှာကို အသစ်စက်စက် ချက်ချင်း Reload လုပ်ပေးပါမည်။
                </p>
                <button
                  onClick={handleForceReload}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs transition shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <RotateCw className="w-4 h-4 animate-spin-slow" />
                  <span>🔄 ယခုချက်ချင်း Cache ရှင်းပြီး Reload လုပ်မည်</span>
                </button>
              </div>

              {/* Step 1: Hand Reload in Chrome */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-slate-100 font-bold">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ၁
                  </span>
                  <span>Chrome တွင် လက်ဖြင့် Reload ပြုလုပ်နည်း (၂ မျိုး):</span>
                </div>
                <ul className="pl-7 space-y-1.5 text-[11px] text-slate-300 list-disc">
                  <li>
                    <strong>ဆွဲချပြီး Reload လုပ်ခြင်း:</strong> ဖုန်းမျက်နှာပြင် အပေါ်ဆုံးသို့ ရောက်အောင်သွားပြီး လက်ဖြင့် အောက်ဘက်သို့ အသာဆွဲချလိုက်ပါ (Pull down)။ အပေါ်တွင် လည်နေသော မြှားဝိုင်း (🔄) ပေါ်လာပြီး reload ဖြစ်သွားပါမည်။
                  </li>
                  <li>
                    <strong>ခလုတ်ဖြင့် Reload လုပ်ခြင်း:</strong> Chrome ညာဘက်အပေါ်ထောင့်ရှိ <strong>အစက် ၃ စက် (⋮)</strong> ကို နှိပ်ပါ ➔ အပေါ်ဆုံးရှိ <strong>မြှားဝိုင်း သင်္ကေတ (🔄)</strong> ကို နှိပ်ပါ။
                  </li>
                </ul>
              </div>

              {/* Step 2: Delete Old 'R' Icon */}
              <div className="p-3 rounded-2xl bg-red-950/30 border border-red-500/40 space-y-2 text-red-200">
                <div className="flex items-center gap-2 font-bold text-red-300">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ၂
                  </span>
                  <span>ဖုန်း Screen ပေါ်ရှိ 'R' တံဆိပ် အဟောင်းကို အရင်ဖျက်ပါ:</span>
                </div>
                <p className="pl-7 text-[11px] text-red-200/90 leading-relaxed">
                  ဖုန်းမျက်နှာပြင် (Home screen) ပေါ်ရှိ 'R' တံဆိပ်အဟောင်းကို လက်ဖြင့် ၂ စက္ကန့် ဖိနှိပ်ထားပါ ➔ <strong>"Remove"</strong> သို့မဟုတ် အမှိုက်ပုံးထဲသို့ ဆွဲထည့်ပြီး အဟောင်းကို အရင်ဆုံး ဖျက်ထုတ်ပေးရပါမည်။ (အဟောင်းမဖျက်ပါက ဖုန်းက အသစ်ကို နေရာမပေးတတ်ပါ)
                </p>
              </div>

              {/* Step 3: Install App with Golden Logo */}
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 text-emerald-200">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ၃
                  </span>
                  <span>ရွှေရောင် Logo အစစ်ဖြင့် အသစ်ထည့်သွင်းပါ:</span>
                </div>
                <p className="pl-7 text-[11px] text-emerald-200/90 leading-relaxed">
                  Chrome သို့ ပြန်သွားပြီး ညာဘက်ထိပ် <strong>အစက် ၃ စက် (⋮)</strong> ကို နှိပ်ပါ ➔ <strong>"Install app" (အက်ပ် ထည့်သွင်းပါ)</strong> သို့မဟုတ် <strong>"Add to Home screen" (ပင်မစခရင်သို့ ထည့်ရန်)</strong> ကို ရွေးနှိပ်ပါ။ ထိုအခါ <strong>ရွှေရောင်စက်မှုလယ်ယာ Logo</strong> ဖြင့် ဖုန်းစခရင်ပေါ်သို့ တန်းရောက်သွားပါမည်။
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAndroidGuide(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
            >
              နားလည်ပါပြီ (Close)
            </button>
          </div>
        </div>
      )}

      {/* iOS Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-emerald-500/40 p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                iPhone / iPad တွင် ထည့်သွင်းနည်း
              </h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ol className="space-y-3 text-xs text-slate-300 mb-6">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">1</span>
                <span>Safari Browser ၏ အောက်ဘားရှိ <strong>Share (မျှဝေရန်)</strong> ခလုတ်ကို နှိပ်ပါ။</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">2</span>
                <span>အောက်သို့ အနည်းငယ်ဆွဲချပြီး <strong>"Add to Home Screen" (ပင်မမျက်နှာပြင်သို့ ထည့်ရန်)</strong> ကို ရွေးပါ။</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">3</span>
                <span>အပေါ်ညာဘက်ရှိ <strong>Add</strong> ကို နှိပ်လိုက်ပါက ဖုန်းမျက်နှာပြင်ပေါ်သို့ အက်ပ်အိုင်ကွန် ရောက်ရှိသွားပါမည်။</span>
              </li>
            </ol>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
            >
              နားလည်ပါပြီ (Close)
            </button>
          </div>
        </div>
      )}
    </>
  );
};
