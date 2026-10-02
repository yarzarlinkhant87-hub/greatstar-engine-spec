/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Wrench,
  Search,
  Fuel,
  Gauge,
  Droplets,
  Layers,
  Lightbulb,
  Wifi,
  WifiOff,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Tractor,
  SlidersHorizontal,
  HardDrive,
  Star,
  Bookmark,
  FileText,
  Save,
  ShieldCheck,
  Download,
  Share2,
  Database,
  Check,
  RotateCw,
  Copy,
  Smartphone,
  QrCode,
  Cog,
  Activity,
} from 'lucide-react';
import {
  AgriEngine,
  BrandId,
  MachineCategory,
  TorqueUnit,
  ZoomLevel,
} from './types/engine';
import { allAgriEngines, brandList, categoryList } from './data/agriEngines';
import { InstallPromptBanner } from './components/InstallPromptBanner';
import { HeadBoltSequenceView } from './components/HeadBoltSequenceView';
import { ClearancesTab } from './components/ClearancesTab';
import { FuelSystemTab } from './components/FuelSystemTab';
import { FluidsTab } from './components/FluidsTab';
import { ProTipsTab } from './components/ProTipsTab';
import { TimingGearsTab } from './components/TimingGearsTab';
import { DiagnosticsTab } from './components/DiagnosticsTab';
import { DumpTruckHydraulicsTab } from './components/DumpTruckHydraulicsTab';
import { GreatStarLogo } from './components/GreatStarLogo';

const LOGO_SRC = '/greatstar_logo.jpg';

export default function App() {
  // Local persistence states
  const [selectedEngineId, setSelectedEngineId] = useState<string>(() => {
    return localStorage.getItem('agri_last_engine_id') || allAgriEngines[0].id;
  });

  const [selectedBrand, setSelectedBrand] = useState<BrandId>(() => {
    return (localStorage.getItem('agri_last_brand') as BrandId) || 'all';
  });

  const [selectedCategory, setSelectedCategory] = useState<MachineCategory>(() => {
    return (localStorage.getItem('agri_last_category') as MachineCategory) || 'all';
  });

  const [activeTab, setActiveTab] = useState<
    'torque' | 'sequence' | 'timing_gears' | 'clearances' | 'fuel' | 'dump_hydraulics' | 'diagnostics' | 'fluids' | 'protips' | 'notes'
  >(() => {
    return (localStorage.getItem('agri_last_tab') as any) || 'torque';
  });

  const [currentUnit, setCurrentUnit] = useState<TorqueUnit>(() => {
    return (localStorage.getItem('agri_last_unit') as TorqueUnit) || 'nm';
  });

  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>(() => {
    return (localStorage.getItem('agri_last_zoom') as ZoomLevel) || 'large';
  });

  // Bookmarks / Favorites saved to persistent storage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('agri_favorites');
      return saved ? JSON.parse(saved) : ['kubota-rt140-160', 'kubota-dc60-dc70'];
    } catch {
      return ['kubota-rt140-160', 'kubota-dc60-dc70'];
    }
  });

  // Custom mechanic notes per engine (persistent in localStorage)
  const [workshopNotes, setWorkshopNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('agri_workshop_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [currentNoteInput, setCurrentNoteInput] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [showReloadGuideModal, setShowReloadGuideModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [isPersisted, setIsPersisted] = useState(true);

  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.origin.includes('run.app')
        ? window.location.origin
        : 'https://ais-pre-ktvehofmbt3bf3zrxhqvy7-563113433469.asia-southeast1.run.app'
      : 'https://ais-pre-ktvehofmbt3bf3zrxhqvy7-563113433469.asia-southeast1.run.app';

  const handleCopyShareLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Agri Torque Master (စက်မှုလယ်ယာ ဆွဲပေါင်လက်စွဲ)',
          text: 'စက်မှုလယ်ယာ ထွန်စက်/ရိတ်ခြွေစက် အင်ဂျင်ဆွဲပေါင်စံနှုန်းနှင့် ပြုပြင်ရေးလက်စွဲ (Offline အသုံးပြုနိုင်သည်)',
          url: shareUrl,
        });
      } catch {
        // user dismissed share dialog
      }
    } else {
      handleCopyShareLink();
    }
  };

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

  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Connectivity listener & persistent storage verification
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (navigator.storage && navigator.storage.persisted) {
      navigator.storage.persisted().then((persisted) => {
        setIsPersisted(persisted);
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('agri_last_engine_id', selectedEngineId);
  }, [selectedEngineId]);

  useEffect(() => {
    localStorage.setItem('agri_last_brand', selectedBrand);
  }, [selectedBrand]);

  useEffect(() => {
    localStorage.setItem('agri_last_category', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem('agri_last_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('agri_last_unit', currentUnit);
  }, [currentUnit]);

  useEffect(() => {
    localStorage.setItem('agri_last_zoom', zoomLevel);
  }, [zoomLevel]);

  useEffect(() => {
    localStorage.setItem('agri_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('agri_workshop_notes', JSON.stringify(workshopNotes));
  }, [workshopNotes]);

  // Load existing note when selectedEngineId changes
  useEffect(() => {
    setCurrentNoteInput(workshopNotes[selectedEngineId] || '');
  }, [selectedEngineId, workshopNotes]);

  // Toggle favorite
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Save custom note for current engine
  const handleSaveNote = () => {
    setWorkshopNotes((prev) => ({
      ...prev,
      [selectedEngineId]: currentNoteInput,
    }));
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2500);
  };

  // Full database & settings backup action
  const handleSaveAllPermanently = () => {
    // Write state confirmation
    localStorage.setItem('agri_last_engine_id', selectedEngineId);
    localStorage.setItem('agri_persisted_confirm', 'true');
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3500);
  };

  // Filtered engines list (favorites pinned at top if no search)
  const filteredEngines = useMemo(() => {
    return allAgriEngines
      .filter((engine) => {
        // Brand filter
        if (selectedBrand !== 'all' && engine.brand !== selectedBrand) {
          return false;
        }
        // Category filter
        if (selectedCategory !== 'all' && engine.category !== selectedCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchesName = engine.name.toLowerCase().includes(query);
          const matchesCode = engine.engineCode.toLowerCase().includes(query);
          const matchesBrand = engine.brandLabel.toLowerCase().includes(query);
          const matchesModel = engine.machineModel.toLowerCase().includes(query);
          const matchesHp = `${engine.horsepower}hp`.includes(query);
          return matchesName || matchesCode || matchesBrand || matchesModel || matchesHp;
        }
        return true;
      })
      .sort((a, b) => {
        // If searching, keep default order
        if (searchQuery.trim()) return 0;
        const aFav = favorites.includes(a.id) ? 1 : 0;
        const bFav = favorites.includes(b.id) ? 1 : 0;
        return bFav - aFav;
      });
  }, [selectedBrand, selectedCategory, searchQuery, favorites]);

  // Active selected engine
  const currentEngine = useMemo(() => {
    const found = allAgriEngines.find((e) => e.id === selectedEngineId);
    if (found) return found;
    return filteredEngines[0] || allAgriEngines[0];
  }, [selectedEngineId, filteredEngines]);

  useEffect(() => {
    if (filteredEngines.length > 0) {
      const exists = filteredEngines.some((e) => e.id === selectedEngineId);
      if (!exists) {
        setSelectedEngineId(filteredEngines[0].id);
      }
    }
  }, [filteredEngines, selectedEngineId]);

  // Dynamic zoom styles for workshop visibility
  const zoomClasses = useMemo(() => {
    switch (zoomLevel) {
      case 'extralarge':
        return {
          title: 'text-2xl sm:text-3xl',
          torqueValue: 'text-3xl sm:text-4xl',
          subTorque: 'text-sm sm:text-base',
          socket: 'text-base sm:text-lg px-3 py-1.5',
          bodyText: 'text-base sm:text-lg',
          partName: 'text-lg sm:text-xl',
        };
      case 'large':
        return {
          title: 'text-xl sm:text-2xl',
          torqueValue: 'text-2xl sm:text-3xl',
          subTorque: 'text-xs sm:text-sm',
          socket: 'text-sm sm:text-base px-2.5 py-1',
          bodyText: 'text-sm sm:text-base',
          partName: 'text-base sm:text-lg',
        };
      case 'normal':
      default:
        return {
          title: 'text-lg sm:text-xl',
          torqueValue: 'text-xl sm:text-2xl',
          subTorque: 'text-[11px]',
          socket: 'text-xs px-2 py-0.5',
          bodyText: 'text-xs sm:text-sm',
          partName: 'text-sm sm:text-base',
        };
    }
  }, [zoomLevel]);

  const getPrimaryTorque = (item: (typeof currentEngine.torqueSpecs)[0]) => {
    if (currentUnit === 'nm') return `${item.nm} Nm`;
    if (currentUnit === 'ftlb') return `${item.ftlb} Ft-lb`;
    return `${item.kgfm} kgf·m`;
  };

  const getSecondaryTorque = (item: (typeof currentEngine.torqueSpecs)[0]) => {
    if (currentUnit === 'nm') {
      return `${item.ftlb} Ft-lb / ${item.kgfm} kgf·m`;
    }
    if (currentUnit === 'ftlb') {
      return `${item.nm} Nm / ${item.kgfm} kgf·m`;
    }
    return `${item.nm} Nm / ${item.ftlb} Ft-lb`;
  };

  const isCurrentFav = favorites.includes(currentEngine.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 pb-16">
      {/* 1. PWA Install Prompt Banner */}
      <InstallPromptBanner />

      {/* 2. Top Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowLogoModal(true)}
              className="relative p-0.5 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-sky-400 shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition flex-shrink-0 cursor-pointer"
              title="GreatStar.z.n.w Logo တံဆိပ်အကြီး ကြည့်ရှုရန် နှိပ်ပါ"
            >
              <GreatStarLogo size={42} />
              <span className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-amber-500 text-slate-950 font-black text-[8px] rounded-full border border-slate-900 shadow">
                ★
              </span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLogoModal(true)}
                  className="text-left cursor-pointer group"
                >
                  <h1 className="text-sm sm:text-base font-black tracking-wide bg-gradient-to-r from-amber-300 via-yellow-400 to-sky-400 bg-clip-text text-transparent group-hover:underline">
                    GREATSTAR.Z.N.W
                  </h1>
                </button>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <span>ZAW NAING WIN</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <HardDrive className="w-2.5 h-2.5" />
                  <span>100% OFFLINE</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
                စက်မှုလယ်ယာ ယန္တရား & တရုတ်ဒန့်ကား အင်ဂျင်ဆွဲပေါင်လက်စွဲ
              </p>
            </div>
          </div>

          {/* Controls: Memory Status, Reload Guide, Font Zoom & Unit Toggle */}
          <div className="flex items-center gap-2">
            {/* Memory & Save Status Pill Button */}
            <button
              onClick={() => setShowMemoryModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition text-xs font-semibold shadow-inner"
              title="အမြဲတမ်းမှတ်ဉာဏ် အခြေအနေ စစ်ဆေးရန်"
            >
              <HardDrive className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden md:inline">မှတ်ဉာဏ်ပြည့်</span>
            </button>

            {/* Chrome Reload & Logo Fix Button */}
            <button
              onClick={() => setShowReloadGuideModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-300 hover:bg-amber-900/60 transition text-xs font-bold shadow-inner"
              title="Chrome Reload လုပ်နည်းနှင့် Logo ပြင်နည်း"
            >
              <RotateCw className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Chrome Reload</span>
            </button>

            {/* Share / Transfer to Other Phone Button */}
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-teal-950/80 border border-teal-500/50 text-teal-300 hover:bg-teal-900/60 transition text-xs font-bold shadow-inner"
              title="အခြားဖုန်းသို့ ကူးယူအသုံးပြုနည်းနှင့် လင့်ခ်ဝေမျှရန်"
            >
              <Share2 className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">ဖုန်းကူးရန်</span>
            </button>

            {/* Font Zoom Controls */}
            <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-1 shadow-inner">
              <span className="text-[10px] text-slate-400 px-1 font-semibold hidden md:inline">
                စာလုံး:
              </span>
              <button
                onClick={() => setZoomLevel('normal')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition ${
                  zoomLevel === 'normal'
                    ? 'bg-slate-700 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="ပုံမှန် စာလုံး"
              >
                A
              </button>
              <button
                onClick={() => setZoomLevel('large')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition ${
                  zoomLevel === 'large'
                    ? 'bg-emerald-500 text-slate-950 shadow font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="စာလုံးကြီး (Default)"
              >
                A+
              </button>
              <button
                onClick={() => setZoomLevel('extralarge')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition ${
                  zoomLevel === 'extralarge'
                    ? 'bg-amber-400 text-slate-950 shadow font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="စာလုံး အကြီးဆုံး (အဝေးမှ ဖတ်ရန်)"
              >
                A++
              </button>
            </div>

            {/* Torque Unit Toggle */}
            <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-1 shadow-inner">
              <button
                onClick={() => setCurrentUnit('nm')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition ${
                  currentUnit === 'nm'
                    ? 'bg-amber-400 text-slate-950 shadow font-mono'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Nm
              </button>
              <button
                onClick={() => setCurrentUnit('ftlb')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition ${
                  currentUnit === 'ftlb'
                    ? 'bg-amber-400 text-slate-950 shadow font-mono'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Ft-lb
              </button>
              <button
                onClick={() => setCurrentUnit('kgfm')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition ${
                  currentUnit === 'kgfm'
                    ? 'bg-amber-400 text-slate-950 shadow font-mono'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                kgf·m
              </button>
            </div>
          </div>
        </div>

        {/* 3. Brand Tabs Bar */}
        <div className="border-t border-slate-800/80 bg-slate-900/60 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-3 py-1.5 flex items-center gap-1.5 min-w-max">
            {brandList.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
                  selectedBrand === brand.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{brand.label}</span>
                {brand.id !== 'all' && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedBrand === brand.id
                        ? 'bg-slate-950 text-emerald-400 font-mono'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {brand.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 4. Sub-Navigation: Search & Category Filter */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pt-3 pb-2 w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Machine Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {categoryList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 text-xs rounded-xl font-medium transition whitespace-nowrap border ${
                  selectedCategory === cat.id
                    ? 'bg-teal-950 border-teal-400 text-teal-300 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Smart Search Bar */}
          <div className="relative min-w-[220px] sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="အင်ဂျင်/မော်ဒယ် ရှာရန် (RT140, L5018, DC70...)"
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-emerald-500 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 5. Main Layout: Left Engines Drawer/Selector + Right Technical View */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-2 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Quick Engine Selector */}
        <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
              <span>စက်အမျိုးအစားများ ({filteredEngines.length})</span>
            </span>

            <button
              onClick={handleSaveAllPermanently}
              className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              title="လက်ရှိ အချက်အလက်များအားလုံးကို အမြဲတမ်း သိမ်းဆည်းရန်"
            >
              <Save className="w-3.5 h-3.5" />
              <span>အတည်သိမ်း</span>
            </button>
          </div>

          {/* Engine Cards Container */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[calc(100vh-220px)] pr-1 no-scrollbar">
            {filteredEngines.length === 0 ? (
              <div className="p-6 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-xs text-slate-400 w-full">
                ရှာမတွေ့ပါ ခင်ဗျာ။ စာလုံးပေါင်း ပြန်စစ်ပေးပါ။
              </div>
            ) : (
              filteredEngines.map((engine) => {
                const isSelected = engine.id === currentEngine.id;
                const isFav = favorites.includes(engine.id);
                return (
                  <button
                    key={engine.id}
                    onClick={() => setSelectedEngineId(engine.id)}
                    className={`flex-shrink-0 w-64 lg:w-full text-left p-3 rounded-2xl border transition relative overflow-hidden group ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-950/90 to-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 to-emerald-400" />
                    )}

                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        {engine.brand.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => toggleFavorite(engine.id, e)}
                          className={`p-0.5 rounded transition ${
                            isFav ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                          }`}
                          title="အကြိုက်ဆုံး မှတ်သားရန်"
                        >
                          <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                        </button>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-semibold">
                          {engine.horsepower} HP
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition truncate">
                      {engine.name}
                    </h3>

                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {engine.engineCode} • {engine.cylinders} Cyl • {engine.displacementCc}cc
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-800/60">
                      <span>{engine.categoryLabel}</span>
                      <span className="text-amber-400 font-mono font-bold">
                        ခေါင်းပေါင်: {engine.torqueSpecs[0]?.nm} Nm
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* Right Column: Engine Details & 5 Master Technical Tabs */}
        <section className="lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
          {/* Engine Header Hero Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-3xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
              <div className="flex items-start gap-3.5">
                {/* Logo Emblem badge on Hero */}
                <button
                  onClick={() => setShowLogoModal(true)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-sky-400 p-0.5 shadow-xl shadow-amber-500/25 flex-shrink-0 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition group"
                  title="GreatStar.z.n.w တံဆိပ်အကြီး ကြည့်ရှုရန် နှိပ်ပါ"
                >
                  <GreatStarLogo size={68} />
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 text-xs font-black rounded-lg bg-emerald-500 text-slate-950 uppercase tracking-wide">
                      {currentEngine.brandLabel}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                      {currentEngine.categoryLabel}
                    </span>
                    <button
                      onClick={() => toggleFavorite(currentEngine.id)}
                      className={`p-1 rounded-lg border transition ${
                        isCurrentFav
                          ? 'bg-amber-400/20 border-amber-400/50 text-amber-400'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                      title={isCurrentFav ? 'အကြိုက်ဆုံးမှ ဖယ်ထုတ်မည်' : 'အကြိုက်ဆုံး စာရင်းသို့ ထည့်မည်'}
                    >
                      <Star className={`w-3.5 h-3.5 ${isCurrentFav ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  <h2 className={`${zoomClasses.title} font-black text-white tracking-tight`}>
                    {currentEngine.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-300/90 font-medium mt-0.5">
                    အင်ဂျင်ကုဒ်: <span className="font-mono font-bold text-amber-300">{currentEngine.engineCode}</span> • {currentEngine.machineModel}
                  </p>
                </div>
              </div>

              {/* Engine Quick Specs Badge Grid */}
              <div className="flex flex-wrap gap-2 self-start">
                <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase">မြင်းကောင်ရေ</span>
                  <span className="text-base font-black text-amber-300 font-mono">
                    {currentEngine.horsepower} HP
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase">ဆလင်ဒါ</span>
                  <span className="text-base font-black text-emerald-400 font-mono">
                    {currentEngine.cylinders} Cyl
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase">အရွယ်အစား</span>
                  <span className="text-base font-black text-sky-400 font-mono">
                    {currentEngine.displacementCc} cc
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-bar with Bore x Stroke & Cooling */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center gap-4">
                <span>
                  Bore x Stroke: <strong className="text-slate-200 font-mono">{currentEngine.boreStrokeMm}</strong>
                </span>
                <span>
                  အအေးခံစနစ်: <strong className="text-slate-200">{currentEngine.coolingType}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveAllPermanently}
                  className="flex items-center gap-1 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/30 hover:bg-emerald-900/50 transition"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>အမြဲတမ်းမှတ်ဉာဏ် (100% Offline Save)</span>
                </button>
              </div>
            </div>
          </div>

          {/* 6. Technical Tabs Navigation (The 5 Core Areas + Diagram + Timing + Diagnostics + Workshop Notes) */}
          <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl overflow-x-auto no-scrollbar shadow-lg">
            <button
              onClick={() => setActiveTab('torque')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'torque'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>၁။ ဆွဲပေါင်ဇယား (Torque)</span>
            </button>

            <button
              onClick={() => setActiveTab('sequence')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'sequence'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>၂။ ခေါင်းဆွဲစဉ် (Sequence)</span>
            </button>

            <button
              onClick={() => setActiveTab('timing_gears')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'timing_gears'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Cog className="w-4 h-4" />
              <span>၃။ ဂီယာအလိုင်းမင်း (Timing)</span>
            </button>

            <button
              onClick={() => setActiveTab('clearances')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'clearances'
                  ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-400/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Gauge className="w-4 h-4" />
              <span>၄။ ကင်းလွတ်ခွာ (Clearance)</span>
            </button>

            <button
              onClick={() => setActiveTab('fuel')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'fuel'
                  ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Fuel className="w-4 h-4" />
              <span>၅။ နိုဇယ်/မီးချိန် (Fuel)</span>
            </button>

            <button
              onClick={() => setActiveTab('dump_hydraulics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'dump_hydraulics'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Tractor className="w-4 h-4" />
              <span>၆။ ဒန့်ဟိုက်ဒရောလစ် & လေကွဲ</span>
            </button>

            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'diagnostics'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>၇။ ချို့ယွင်းချက်ရှာ (Diagnostics)</span>
            </button>

            <button
              onClick={() => setActiveTab('fluids')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'fluids'
                  ? 'bg-blue-400 text-slate-950 shadow-md shadow-blue-400/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Droplets className="w-4 h-4" />
              <span>၇။ အရည်ပမာဏ (Fluids)</span>
            </button>

            <button
              onClick={() => setActiveTab('protips')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'protips'
                  ? 'bg-emerald-400 text-slate-950 shadow-md shadow-emerald-400/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>၈။ လက်တွေ့ Tips</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                activeTab === 'notes'
                  ? 'bg-purple-400 text-slate-950 shadow-md shadow-purple-400/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>၉။ ဝပ်ရှော့မှတ်စု (Notes)</span>
            </button>
          </div>

          {/* 7. Active Tab View Content */}
          <div className="transition-all duration-200">
            {/* TAB 1: TORQUE SPECIFICATIONS TABLE */}
            {activeTab === 'torque' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <p className="text-xs text-slate-400">
                    လက်ရှိပြသနေသော ယူနစ်: <strong className="text-amber-300 uppercase font-mono">{currentUnit}</strong> (အပေါ်ဘားမှ ချက်ချင်း ပြောင်းလဲနိုင်ပါသည်)
                  </p>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    စုစုပေါင်း အစိတ်အပိုင်း ({currentEngine.torqueSpecs.length}) မျိုး
                  </span>
                </div>

                <div className="space-y-2.5">
                  {currentEngine.torqueSpecs.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 shadow-lg transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Left side: Part Name & Socket details */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className={`${zoomClasses.partName} font-black text-slate-100`}>
                            {item.burmeseName}
                          </h4>
                          <span className="text-xs text-slate-400 font-medium">({item.name})</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          {/* Socket mm Badge */}
                          <span className={`rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-black font-mono shadow-inner ${zoomClasses.socket}`}>
                            ဂွဆိုက်: {item.socketMm}
                          </span>

                          {/* Bolt Size */}
                          {item.boltSize && (
                            <span className="px-2 py-0.5 rounded-lg bg-slate-800/80 text-slate-300 font-mono text-[11px]">
                              {item.boltSize}
                            </span>
                          )}

                          {/* Degrees / Angle Torque badge */}
                          {item.degrees && (
                            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-950 border border-emerald-400 text-emerald-300 font-bold font-mono text-xs animate-pulse">
                              {item.degrees}
                            </span>
                          )}
                        </div>

                        {/* Sequence description */}
                        <p className={`${zoomClasses.bodyText} text-slate-300 font-medium pt-1`}>
                          {item.sequenceStage}
                        </p>

                        {item.notes && (
                          <p className="text-xs text-slate-400 italic">
                            💡 {item.notes}
                          </p>
                        )}
                      </div>

                      {/* Right side: High Visibility Torque Readout */}
                      <div className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-3.5 text-right sm:min-w-[190px] shadow-inner flex flex-col justify-center">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                          ဆွဲပေါင်တန်ဖိုး ({currentUnit.toUpperCase()})
                        </span>
                        <div className={`${zoomClasses.torqueValue} font-black text-amber-300 tracking-tight font-mono my-0.5`}>
                          {getPrimaryTorque(item)}
                        </div>
                        <div className={`${zoomClasses.subTorque} text-slate-400 font-mono font-medium`}>
                          {getSecondaryTorque(item)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: CYLINDER HEAD BOLT SEQUENCE DIAGRAM */}
            {activeTab === 'sequence' && (
              <HeadBoltSequenceView
                sequence={currentEngine.headSequence}
                currentUnit={currentUnit}
              />
            )}

            {/* TAB 3: TIMING GEAR ALIGNMENT & MARKS */}
            {activeTab === 'timing_gears' && (
              <TimingGearsTab engine={currentEngine} />
            )}

            {/* TAB 4: ENGINE CLEARANCES & TOLERANCES */}
            {activeTab === 'clearances' && (
              <ClearancesTab clearances={currentEngine.clearances} />
            )}

            {/* TAB 5: FUEL SYSTEM & TIMING */}
            {activeTab === 'fuel' && (
              <FuelSystemTab fuelSystem={currentEngine.fuelSystem} />
            )}

            {/* TAB 6: DUMP HYDRAULICS & FAST SPLITTER */}
            {activeTab === 'dump_hydraulics' && (
              <DumpTruckHydraulicsTab currentEngine={currentEngine} />
            )}

            {/* TAB 7: DIAGNOSTICS & TROUBLESHOOTING */}
            {activeTab === 'diagnostics' && (
              <DiagnosticsTab engine={currentEngine} />
            )}

            {/* TAB 7: FLUID CAPACITIES & SPECS */}
            {activeTab === 'fluids' && (
              <FluidsTab fluids={currentEngine.fluids} />
            )}

            {/* TAB 8: WORKSHOP PRO TIPS */}
            {activeTab === 'protips' && (
              <ProTipsTab proTips={currentEngine.proTips} />
            )}

            {/* TAB 9: WORKSHOP NOTES & LOCAL MEMORY */}
            {activeTab === 'notes' && (
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                      <FileText className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-100">
                        {currentEngine.name} အတွက် ကိုယ်ပိုင် ဝပ်ရှော့မှတ်စု
                      </h4>
                      <p className="text-xs text-slate-400">
                        ဖုန်းမှတ်ဉာဏ် (Local Storage) ထဲတွင် အမြဲတမ်း အလိုအလျောက် သိမ်းဆည်းပေးပါသည်
                      </p>
                    </div>
                  </div>

                  {noteSavedFeedback && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1 animate-pulse">
                      <Check className="w-3.5 h-3.5" />
                      <span>မှတ်သားပြီးပါပြီ</span>
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    ဆရာ့စိတ်ကြိုက် မှတ်စု (ဥပမာ- ပြုပြင်ခဲ့သည့်ရက်စွဲ၊ အသစ်လဲခဲ့သော ပစ္စည်း၊ ဆွဲခဲ့သည့်ပေါင်)
                  </label>
                  <textarea
                    rows={6}
                    value={currentNoteInput}
                    onChange={(e) => setCurrentNoteInput(e.target.value)}
                    placeholder="ဒီအင်ဂျင်အတွက် အထူးမှတ်သားလိုသည့် အချက်များကို ရေးထားနိုင်ပါသည်..."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-purple-400 rounded-xl p-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none transition leading-relaxed"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>ဖုန်းလိုင်းပိတ်ထားလည်း မပျောက်ပျက်ဘဲ အမြဲတမ်းကျန်နေပါမည်</span>
                  </div>

                  <button
                    onClick={handleSaveNote}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs shadow-md shadow-purple-500/20 active:scale-95 transition"
                  >
                    <Save className="w-4 h-4" />
                    <span>မှတ်စုသိမ်းမည် (Save Note)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 8. Fixed Offline Floating Indicator */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-500 text-slate-950 px-3.5 py-2 text-xs font-bold shadow-2xl animate-bounce">
          <WifiOff className="w-4 h-4" />
          <span>Offline စနစ် — ဖုန်းတွင်း မှတ်ဉာဏ်ဖြင့် အလုပ်လုပ်နေပါသည်</span>
        </div>
      )}

      {/* 9. Save Success Toast Popup */}
      {showSaveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-950 border border-emerald-400 text-emerald-200 px-4 py-3 rounded-2xl shadow-2xl animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-xs">အမြဲတမ်းမှတ်ဉာဏ် အတည်သိမ်းပြီးပါပြီ!</p>
            <p className="text-[11px] text-emerald-300/80">
              အင်ဂျင်ဒေတာများ၊ ယူနစ်နှင့် မှတ်စုများ ဖုန်းထဲတွင် ၁၀၀% လုံခြုံစွာ ရှိနေပါပြီ
            </p>
          </div>
        </div>
      )}

      {/* 10. Memory & Offline Storage Verification Modal */}
      {showMemoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-500 p-0.5">
                  <img
                    src={LOGO_SRC}
                    alt="Logo"
                    className="w-full h-full object-cover rounded-[10px]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-100">
                    အမြဲတမ်းမှတ်ဉာဏ်စနစ် (Offline Engine & Memory)
                  </h3>
                  <p className="text-[11px] text-emerald-400 font-semibold">
                    100% Embedded Offline Database
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMemoryModal(false)}
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 mb-6">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">စက်မှုလယ်ယာ အင်ဂျင်များ:</span>
                <span className="font-bold text-amber-300 font-mono">
                  စက်ရုံထုတ် ({allAgriEngines.length}) မျိုးလုံး ထည့်သွင်းပြီး
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Offline Service Worker:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active (v2)
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Persistent Storage:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Granted (မဖျက်နိုင်သော စနစ်)
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">အကြိုက်ဆုံး မှတ်သားထားမှု:</span>
                <span className="font-bold text-purple-300 font-mono">
                  {favorites.length} Engines Pinned
                </span>
              </div>

              <p className="text-[11px] text-slate-400 p-2.5 bg-slate-950/70 rounded-xl border border-slate-800/80 leading-relaxed">
                💡 <strong>စိတ်ချပါ ဆရာ:</strong> အင်တာနက် လိုင်းလုံးဝပိတ်ထားသည့်တိုင် ဖုန်းစခရင်ပေါ်မှ Icon လေးကို နှိပ်လိုက်သည်နှင့် စက္ကန့်ပိုင်းအတွင်း တန်းပွင့်လာပါမည်။
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  handleSaveAllPermanently();
                  setShowMemoryModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>အတည်ပြု သိမ်းဆည်းမည်</span>
              </button>
              <button
                onClick={() => setShowMemoryModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
              >
                ပိတ်မည်
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. Chrome Reload & Logo Fix Guide Modal */}
      {showReloadGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/50 p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30">
                  <RotateCw className="w-5 h-5 animate-spin-slow" />
                </span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-amber-300">
                    Chrome Reload & Logo ပြင်ဆင်နည်း
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    အဆင့် ၃ ဆင့်ဖြင့် ရွှေရောင် Logo အစစ် ဖုန်းပေါ်တင်ပါ
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowReloadGuideModal(false)}
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300 mb-5">
              {/* Quick Auto-Reload Button */}
              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-400/50 text-amber-200 shadow-inner">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-xs flex items-center gap-1.5 text-amber-300">
                    <RotateCw className="w-4 h-4 text-amber-400" />
                    Chrome Auto-Reload ခလုတ်:
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold">
                    အလွယ်ဆုံး
                  </span>
                </div>
                <p className="text-[11px] text-amber-200/90 leading-relaxed mb-3">
                  အောက်ပါခလုတ်ကို နှိပ်လိုက်ပါက Chrome Cache အဟောင်းများကို အလိုအလျောက် ရှင်းထုတ်ပြီး အက်ပ်ကို အသစ်စက်စက် ချက်ချင်း Reload လုပ်ပေးပါမည်။
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
              onClick={() => setShowReloadGuideModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
            >
              နားလည်ပါပြီ (Close)
            </button>
          </div>
        </div>
      )}

      {/* 12. Share & Transfer to Other Phone Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-teal-500/50 p-5 sm:p-6 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  <Smartphone className="w-5 h-5 text-teal-300" />
                </span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-teal-300">
                    အခြားဖုန်းသို့ ကူးယူအသုံးပြုနည်း (Transfer to Other Phone)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    မူရင်းအတိုင်း အပြည့်အဝ ၁၀၀% တူညီစွာ အလုပ်လုပ်ပါသည်
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-slate-400 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300 mb-5">
              {/* Highlight Confirmation Box */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-200 shadow-inner flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-[12px] leading-relaxed">
                  <strong className="text-emerald-300">ဟုတ်ကဲ့ပါ အခြားဖုန်းသို့ လွယ်ကူစွာ ကူးယူနိုင်ပါသည်!</strong>
                  <p className="mt-1 text-slate-300 text-[11px]">
                    Android (Samsung, Xiaomi, Vivo, Oppo, Realme စသည်) နှင့် iPhone မည်သည့်ဖုန်းတွင်မဆို အင်တာနက်မရှိဘဲ <strong>၁၀၀% Offline အပြည့်အဝ</strong> မူရင်းအတိုင်း တိကျစွာ အလုပ်လုပ်ပါသည်။
                  </p>
                </div>
              </div>

              {/* Direct Copy & Share Box */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Copy className="w-4 h-4 text-teal-400" />
                    <span>တိုက်ရိုက်လင့်ခ် (App Direct Link):</span>
                  </span>
                  {copiedLink && (
                    <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> လင့်ခ်ကူးပြီးပါပြီ!
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono select-all focus:outline-none"
                  />
                  <button
                    onClick={handleCopyShareLink}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 ${
                      copiedLink
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-teal-600 hover:bg-teal-500 text-white'
                    }`}
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'ကူးပြီး' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleNativeShare}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-xs transition shadow flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Viber / Messenger / Telegram သို့ တိုက်ရိုက်ပို့မည်</span>
                  </button>
                </div>
              </div>

              {/* QR Code Option */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-28 h-28 bg-white p-2 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(shareUrl)}`}
                    alt="App QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="font-bold text-xs text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
                    <QrCode className="w-4 h-4 text-amber-400" />
                    <span>QR Code စကင်ဖတ်၍ ကူးယူနည်း:</span>
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    အခြားဖုန်း၏ ကင်မရာ (သို့မဟုတ် QR Scanner) ဖြင့် ဤပုံလေးကို ဓာတ်ပုံရိုက် ထောက်လိုက်ပါက အက်ပ်စာမျက်နှာ ချက်ချင်း တန်းပွင့်လာပါမည်။
                  </p>
                </div>
              </div>

              {/* Rural & Offline Sharing Options */}
              <div className="space-y-2.5">
                {/* Option 1: Direct Bluetooth / Zapya / Telegram Share */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-1.5">
                  <span className="font-bold text-amber-300 block text-xs flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-amber-400" />
                    <span>နည်းလမ်း (၁) - အင်တာနက်မလိုဘဲ ဖုန်းချင်း APK တိုက်ရိုက်ကူးနည်း:</span>
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    ဆရာ့ဖုန်းထဲရှိ <strong>GreatStar Engine Spec APK (app-debug.apk)</strong> ဖိုင်လေးကို <strong>Bluetooth, Zapya, ShareMe, Viber သို့မဟုတ် Telegram</strong> ဖြင့် လုပ်ငန်းတူ သူငယ်ချင်းထံ တိုက်ရိုက် ပို့ပေးလိုက်ပါ။ သူတို့ဖုန်းတွင် "Install anyway" ကို နှိပ်လိုက်ရုံဖြင့် အင်တာနက် လုံးဝမလိုဘဲ တန်းသုံးနိုင်ပါပြီ။
                  </p>
                </div>

                {/* Option 2: 3 Step PWA Web Link Option */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-slate-200 block text-xs flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-sky-400" />
                    <span>နည်းလမ်း (၂) - လင့်ခ်မှတစ်ဆင့် ဖုန်းထဲ အက်ပ်အဖြစ် သွင်းနည်း:</span>
                  </span>
                  <ol className="space-y-1.5 text-[11px] text-slate-300 list-decimal pl-4 leading-relaxed">
                    <li>
                      အခြားဖုန်း၏ <strong>Chrome Browser</strong> တွင် ပေးပို့ထားသော လင့်ခ်ကို ဖွင့်ပါ။
                    </li>
                    <li>
                      အပေါ်ဆုံးရှိ <strong>"အက်ပ်ထည့်သွင်းမည် (Install App)"</strong> ခလုတ်ကို နှိပ်ပါ (သို့မဟုတ် Chrome ထိပ် <strong>အစက် ၃ စက် (⋮) ➔ "Add to Home screen"</strong> နှိပ်ပါ)။
                    </li>
                    <li>
                      ထိုအခါ အခြားဖုန်းပေါ်တွင် <strong>GreatStar.z.n.w ရွှေရောင် Logo</strong> ဖြင့် အက်ပ်အဖြစ် အမြဲတမ်း ရောက်ရှိသွားပါပြီ!
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
            >
              ပိတ်မည် (Close)
            </button>
          </div>
        </div>
      )}

      {/* 13. GreatStar.z.n.w Official Logo Showcase Modal */}
      {showLogoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in overflow-y-auto">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border-2 border-amber-500/50 p-6 shadow-2xl text-slate-100 relative my-8">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Star className="w-5 h-5 fill-amber-400" />
                </span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-amber-300">
                    GreatStar.z.n.w မူပိုင် အမှတ်တံဆိပ်
                  </h3>
                  <p className="text-[11px] text-slate-400 font-semibold">
                    Engineered & Created by Zaw Naing Win
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLogoModal(false)}
                className="text-slate-400 hover:text-white text-xl p-1.5 rounded-full hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Central Display Badge */}
            <div className="flex flex-col items-center justify-center py-6 px-4 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-amber-500/30 mb-5 relative group">
              <div className="relative p-2 rounded-full bg-amber-500/10 border-2 border-amber-500/40 shadow-2xl shadow-amber-500/30 mb-3">
                <GreatStarLogo size={180} />
              </div>

              <div className="text-center mt-2 space-y-1">
                <div className="text-xl font-black tracking-widest text-transparent bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-500 bg-clip-text">
                  ★ GREATSTAR.Z.N.W ★
                </div>
                <div className="text-base font-extrabold tracking-widest text-sky-400">
                  ⚙ ZAW NAING WIN ⚙
                </div>
                <p className="text-xs text-slate-400 font-medium pt-1">
                  စက်မှုလယ်ယာ ယန္တရား & တရုတ်ဒန့်ကား အင်ဂျင်ဆွဲပေါင်လက်စွဲ
                </p>
              </div>
            </div>

            {/* Logo Details Pill Cards */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-5">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">တံဆိပ်အမည်</span>
                <span className="font-extrabold text-amber-300 text-sm">GreatStar.z.n.w</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">ဖန်တီးသူပညာရှင်</span>
                <span className="font-extrabold text-sky-400 text-sm">Zaw Naing Win</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">အမှတ်သင်္ကေတ</span>
                <span className="font-bold text-slate-200">Timing Gear & Torque Wrench</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">လိုင်းအခြေအနေ</span>
                <span className="font-bold text-emerald-400">100% Offline Vector HD</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowLogoModal(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/25 transition active:scale-98"
            >
              နားလည်ပါပြီ (ပိတ်မည်)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
