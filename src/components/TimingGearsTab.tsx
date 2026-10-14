/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AgriEngine } from '../types/engine';
import {
  Cog,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Flame,
  Gauge,
  Wrench,
  BookOpen,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Eye,
  EyeOff,
  Move,
  Hand,
  Layers,
  Sparkles
} from 'lucide-react';

interface Props {
  engine: AgriEngine;
}

export const TimingGearsTab: React.FC<Props> = ({ engine }) => {
  const [selectedGear, setSelectedGear] = useState<string>('all');
  const isKubota = engine.brand === 'kubota';
  const isYanmar = engine.brand === 'yanmar';
  const isMassey = engine.brand === 'massey_ferguson';
  const isSonalika = engine.id.includes('sonalika');
  const isJohnDeere = engine.id.includes('john-deere') || engine.name.toLowerCase().includes('john deere');
  const isNewHolland = engine.brand === 'ford_newholland' || engine.id.includes('holland') || engine.id.includes('ford');
  const isYto = engine.id.includes('yto') || engine.name.toLowerCase().includes('yto');
  const isLovol = engine.id.includes('lovol') || engine.name.toLowerCase().includes('lovol');
  const isChineseTractor = engine.brand === 'yto_lovol' || isYto || isLovol;

  // Chinese Dump Truck & Heavy Commercial Families
  const isWeichai = engine.id.includes('weichai') || engine.name.toLowerCase().includes('weichai') || engine.name.toLowerCase().includes('wp10') || engine.name.toLowerCase().includes('wp12');
  const isCummins = engine.id.includes('cummins') || engine.name.toLowerCase().includes('cummins') || engine.name.toLowerCase().includes('6bt') || engine.name.toLowerCase().includes('6ct');
  const isYuchai = engine.id.includes('yuchai') || engine.name.toLowerCase().includes('yuchai') || engine.name.toLowerCase().includes('yc6');
  const isYunneiTruck = engine.id.includes('yunnei') || engine.id.includes('4jb1') || engine.name.toLowerCase().includes('yunnei') || (engine.brand === 'chinese_truck' && !isWeichai && !isCummins && !isYuchai);

  const hasFactoryManual = isKubota || isYanmar || isMassey || isSonalika || isJohnDeere || isNewHolland || isChineseTractor || isWeichai || isCummins || isYuchai || isYunneiTruck;
  const [viewMode, setViewMode] = useState<'factory_manual' | 'blueprint' | 'interactive'>(
    hasFactoryManual ? 'factory_manual' : 'interactive'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalScale, setModalScale] = useState(1);
  const [activeModalImg, setActiveModalImg] = useState<string>('');
  const [activeModalTitle, setActiveModalTitle] = useState<string>('');
  const [isControlsHidden, setIsControlsHidden] = useState(false);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Touch & Drag refs for pinch zoom & panning
  const touchStartRef = React.useRef<{ dist: number; scale: number; x: number; y: number; lastTap: number }>({
    dist: 0,
    scale: 1,
    x: 0,
    y: 0,
    lastTap: 0,
  });
  const isDraggingRef = React.useRef(false);
  const dragStartRef = React.useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // 2 fingers pinch
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartRef.current.dist = dist;
      touchStartRef.current.scale = modalScale;
    } else if (e.touches.length === 1) {
      // 1 finger double-tap detection
      const now = Date.now();
      if (now - touchStartRef.current.lastTap < 300) {
        setModalScale((prev) => (prev > 1.2 ? 1 : 2.2));
        setPanOffset({ x: 0, y: 0 });
        touchStartRef.current.lastTap = 0;
        return;
      }
      touchStartRef.current.lastTap = now;

      if (modalScale > 1) {
        isDraggingRef.current = true;
        dragStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          panX: panOffset.x,
          panY: panOffset.y,
        };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartRef.current.dist > 0) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartRef.current.dist;
      const nextScale = Math.min(4.5, Math.max(0.6, Number((touchStartRef.current.scale * factor).toFixed(2))));
      setModalScale(nextScale);
    } else if (e.touches.length === 1 && isDraggingRef.current && modalScale > 1) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      setPanOffset({
        x: dragStartRef.current.panX + dx,
        y: dragStartRef.current.panY + dy,
      });
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current.dist = 0;
    isDraggingRef.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalScale > 1) {
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        panX: panOffset.x,
        panY: panOffset.y,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current && modalScale > 1) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPanOffset({
        x: dragStartRef.current.panX + dx,
        y: dragStartRef.current.panY + dy,
      });
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const resetModalZoom = () => {
    setModalScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  React.useEffect(() => {
    if (hasFactoryManual) {
      setViewMode('factory_manual');
    } else {
      setViewMode('interactive');
    }
  }, [engine.id, hasFactoryManual]);

  // Kubota Genuine Factory Workshop Manual (WSM) Images
  const kubotaMultiCylinderManualImg = '/src/assets/images/kubota_gear_train_1791877950744.jpg';
  const kubotaBlueprintImg = '/src/assets/images/kubota_timing_manual_1791877951833.jpg';
  const kubotaSingleCylinderManualImg = '/src/assets/images/kubota_rt_manual_1791877974606.jpg';

  // Yanmar Genuine Factory Service Manual Images
  const yanmarMultiCylinderManualImg = '/src/assets/images/yanmar_gear_train_1791879793529.jpg';
  const yanmarBlueprintImg = '/src/assets/images/yanmar_timing_blueprint_1791879795442.jpg';
  const yanmarSingleCylinderManualImg = '/src/assets/images/yanmar_tf_manual_1791879793845.jpg';

  // Massey Ferguson Perkins Genuine Service Manual & Blueprint Images
  const mfPerkinsManualImg = '/src/assets/images/mf_perkins_gear_train_1791880863059.jpg';
  const mfPerkinsBlueprintImg = '/src/assets/images/mf_perkins_blueprint_1791880864125.jpg';

  // Sonalika ITL Genuine Service Manual Image
  const sonalikaManualImg = '/src/assets/images/sonalika_gear_train_1791880863455.jpg';

  // John Deere Genuine Factory Service Manual & Blueprint Images
  const jdManualImg = '/src/assets/images/jd_gear_train_1791886594049.jpg';
  const jdBlueprintImg = '/src/assets/images/jd_gear_blueprint_1791886619537.jpg';

  // New Holland & Ford Genuine Service Manual & Blueprint Images
  const newHollandManualImg = '/src/assets/images/new_holland_gear_train_1791882026762.jpg';
  const newHollandBlueprintImg = '/src/assets/images/new_holland_blueprint_1791882027906.jpg';

  // YTO (Dongfanghong) & Lovol Genuine Service Manual & Blueprint Images
  const ytoManualImg = '/src/assets/images/yto_gear_train_1791883754373.jpg';
  const ytoBlueprintImg = '/src/assets/images/yto_gear_blueprint_1791883794449.jpg';
  const lovolManualImg = '/src/assets/images/lovol_gear_train_1791883770901.jpg';

  // Chinese Dump Truck Genuine Service Manual & Blueprint Images
  const weichaiManualImg = '/src/assets/images/weichai_wp10_geartrain_1791891333340.jpg';
  const cumminsManualImg = '/src/assets/images/cummins_geartrain_1791891361340.jpg';
  const yuchaiManualImg = '/src/assets/images/yuchai_geartrain_1791891412447.jpg';
  const yunneiManualImg = '/src/assets/images/yunnei_4100_geartrain_1791891385366.jpg';

  const factoryManualImgSrc = isKubota
    ? (engine.category === 'single_cylinder' ? kubotaSingleCylinderManualImg : kubotaMultiCylinderManualImg)
    : isYanmar
    ? (engine.category === 'single_cylinder' ? yanmarSingleCylinderManualImg : yanmarMultiCylinderManualImg)
    : isMassey
    ? mfPerkinsManualImg
    : isJohnDeere
    ? jdManualImg
    : isSonalika
    ? sonalikaManualImg
    : isNewHolland
    ? newHollandManualImg
    : isYto
    ? ytoManualImg
    : isLovol
    ? lovolManualImg
    : isWeichai
    ? weichaiManualImg
    : isCummins
    ? cumminsManualImg
    : isYuchai
    ? yuchaiManualImg
    : isYunneiTruck
    ? yunneiManualImg
    : '';

  const factoryBlueprintImgSrc = isKubota
    ? kubotaBlueprintImg
    : isYanmar
    ? yanmarBlueprintImg
    : isMassey
    ? mfPerkinsBlueprintImg
    : isJohnDeere
    ? jdBlueprintImg
    : isNewHolland
    ? newHollandBlueprintImg
    : (isYto || isLovol)
    ? ytoBlueprintImg
    : isWeichai
    ? weichaiManualImg
    : isCummins
    ? cumminsManualImg
    : isYuchai
    ? yuchaiManualImg
    : isYunneiTruck
    ? yunneiManualImg
    : '';

  // Determine specific diagram type based on brand and machine category
  const getDiagramKind = (): 
    | 'single_cylinder'
    | 'kubota_harvester'
    | 'kubota_tractor'
    | 'yanmar_harvester'
    | 'yanmar_tractor'
    | 'massey_perkins'
    | 'ford_newholland'
    | 'john_deere'
    | 'yto_tractor'
    | 'lovol_tractor'
    | 'chinese_truck' => {
    if (engine.brand === 'chinese_truck') return 'chinese_truck';
    if (engine.category === 'single_cylinder') return 'single_cylinder';

    if (engine.brand === 'kubota') {
      return engine.category === 'harvester' ? 'kubota_harvester' : 'kubota_tractor';
    }
    if (engine.brand === 'yanmar') {
      return engine.category === 'harvester' ? 'yanmar_harvester' : 'yanmar_tractor';
    }
    if (engine.brand === 'massey_ferguson') return 'massey_perkins';
    if (engine.brand === 'ford_newholland') return 'ford_newholland';
    if (isYto) return 'yto_tractor';
    if (isLovol) return 'lovol_tractor';
    return 'john_deere';
  };

  const diagramKind = getDiagramKind();

  // Engine & Category specific Timing Data
  const getTimingData = () => {
    switch (diagramKind) {
      case 'single_cylinder': {
        const isKubota = engine.brand === 'kubota';
        return {
          categoryBadge: 'လက်တွန်းအင်ဂျင် သီးသန့် တိုက်ရိုက်တိုင်မင် (Single-Cylinder Direct Mesh)',
          burmeseTitle: `${engine.brandLabel} လက်တွန်းထွန်စက် တိုင်မင် & ဘာလန်ဆာဂီယာ စနစ်`,
          subtitle: `${engine.name} (${engine.engineCode}) • အိုင်ဒလာဂီယာ မပါရှိဘဲ Crank & Cam တိုက်ရိုက်ထိစပ်လည်ပတ်သည်`,
          marks: [
            {
              gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)',
              mark: isKubota ? 'အစက် (၁) စက် [ • ]' : 'အမှတ် [ 1 ] (သို့မဟုတ် •)',
              note: 'ကင်းရှပ်ဂီယာ၏ အစက် ၂ စက်ကြား အလယ်တည့်တည့် တိုက်ဆိုင်ထည့်သွင်းပါ',
            },
            {
              gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)',
              mark: isKubota ? 'အစက် (၂) စက် [ • • ]' : 'အမှတ် [ 1-1 ]',
              note: 'ခရိုင်းရှပ်ဂီယာ အစက်ကို ကင်းရှပ်အစက် ၂ စက်ကြား သေချာညှပ်တိုက်ပါ',
            },
            {
              gear: 'ပထမ ဘာလန်ဆာ (1st Balancer Gear)',
              mark: isKubota ? 'ဂဏန်း [ 1 ] သို့မဟုတ် [ • ]' : 'အမှတ် [ 2 ]',
              note: 'အင်ဂျင်တုန်ခါမှု ထိန်းညှိပေးသော အပေါ်ဝိတ်တုံးဂီယာ အမှတ်ကို ကရိုင်းနှင့် တိုက်ပါ',
            },
            {
              gear: 'ဒုတိယ ဘာလန်ဆာ (2nd Balancer Gear)',
              mark: isKubota ? 'ဂဏန်း [ 2 ] သို့မဟုတ် [ •• ]' : 'အမှတ် [ 2-2 ]',
              note: 'အောက်ဝိတ်တုံးဂီယာ အမှတ်ကို ကရိုင်းဂီယာသွားကြား သေချာတိုက်ပါ',
            },
          ],
          backlashStandard: '0.040 - 0.110 mm',
          backlashLimit: '0.150 mm',
          flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
          idlerTorque: 'မလို (Direct Crank-to-Cam Mesh)',
          timingRule: 'လက်တွန်းအင်ဂျင်များတွင် အိုင်ဒလာဂီယာ မပါရှိပါ။ ခရိုင်းနှင့် ကင်းရှပ် (• နှင့် ••) ကို တိုက်ရိုက်ထိစပ်တပ်ဆင်ရပြီး၊ Balancer (ဝိတ်တုံးဂီယာ) မာ့ခ်လွဲပါက အင်ဂျင်တစ်စက်လုံး မခံမရပ်နိုင်အောင် တုန်ခါပြီး ဘီးဒေါက်နပ်နှင့် ခရိုင်းထိပ်ကျိုးတတ်ပါသည်။',
        };
      }

      case 'kubota_harvester': {
        return {
          categoryBadge: '🌾 စပါးရိတ်ခြွေစက် သီးသန့် တာဘိုဒီဇယ် တိုင်မင် (Combine Harvester Turbo Timing)',
          burmeseTitle: `ကူဘိုတာ စပါးရိတ်ခြွေစက် (DC60 / DC70 / DC93 / DC105X) တိုင်မင်ဂီယာ စနစ်`,
          subtitle: `${engine.name} (${engine.engineCode} Turbo) • စပါးရိတ်ခြွေစက် သီးသန့် အလယ်အိုင်ဒလာဂီယာ & Aneroid ဆီပန့်ဂီယာ`,
          marks: [
            {
              gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)',
              mark: 'ဂဏန်း "1"',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ "1-1" နှစ်ထပ်သွားကြားသို့ ထည့်သွင်းတိုက်ဆိုင်ပါ',
            },
            {
              gear: 'အလယ်အိုင်ဒလာဂီယာ (Idle Gear)',
              mark: '"1-1", "2-2", "3-3"',
              note: 'ဂီယာအားလုံးကို ထိန်းညှိမောင်းနှင်ပေးသော ဗဟိုအိုင်ဒလာဂီယာကြီးဖြစ်သည်',
            },
            {
              gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)',
              mark: 'ဂဏန်း "2"',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ "2-2" နှစ်ထပ်သွားကြားသို့ တိုက်ဆိုင်ပါ',
            },
            {
              gear: 'ဆီပန့်ဂီယာ (Turbo Injection Pump Gear)',
              mark: 'ဂဏန်း "3"',
              note: 'တာဘို Boost Compensator ပါဝင်သော ဆီပန့်ဂီယာကို အိုင်ဒလာ "3-3" ကြား တိုက်ပါ',
            },
            {
              gear: 'အင်ဂျင်ဝိုင်ပန့်ဂီယာ (Oil Pump Drive Gear)',
              mark: 'Direct Mesh',
              note: 'ခရိုင်းရှပ်အောက်ခြေရှိ အင်ဂျင်ဝိုင်ပန့်ကို အလိုအလျောက် မောင်းနှင်သည်',
            },
          ],
          backlashStandard: '0.041 - 0.115 mm',
          backlashLimit: '0.150 mm',
          flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
          idlerTorque: '40 - 45 Nm (29 - 33 Ft-lb)',
          timingRule: 'စပါးရိတ်ခြွေစက် (DC70/DC105X) သည် တာဘိုအင်ဂျင်ဖြစ်ပြီး ဝန်အပြည့် (2,400~2,600 RPM) အချိန် ဆက်တိုက်လည်ပတ်ရသဖြင့် ဆီပန့်တိုင်မင် မာ့ခ် (3 - 3-3) မလွဲစေရန် အထူးသတိပြုပါ။ မီးနောက်ကျပါက မီးခိုးမည်းထွက်ပြီး တာဘိုနီရဲကာ ဆွဲအားကျဆင်းပါမည်။ ဖလိုင်းဝှီး 15° - 17° BTDC တွင် နံပါတ် ၁ ဆလင်ဒါ ဆီစတင်ဖြန်းမှုကို အတိအကျ စစ်ဆေးပါ။',
        };
      }

      case 'kubota_tractor': {
        return {
          categoryBadge: '🚜 လေးဘီးထွန်စက်ကြီးများ သီးသန့် တိုင်မင် (4WD Agricultural Tractor Timing)',
          burmeseTitle: `ကူဘိုတာ ထွန်စက်ကြီးများ (L3408 / L4508 / L5018 / M7040) တိုင်မင်ဂီယာ စနစ်`,
          subtitle: `${engine.name} (${engine.engineCode}) • လယ်ယာသုံး ၄ ဘီးယက်ထွန်စက်များအတွက် ဟိုက်ဒရောလစ်ဒရိုက်ဗ်ပါဝင်သော ဂီယာစနစ်`,
          marks: [
            {
              gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)',
              mark: 'ဂဏန်း "1"',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ "1-1" သွားကြားသို့ တိုက်ပါ',
            },
            {
              gear: 'အလယ်အိုင်ဒလာဂီယာ (Center Idle Gear)',
              mark: '"1-1", "2-2", "3-3"',
              note: 'ခရိုင်း (1)၊ ကင်း (2)၊ ဆီပန့် (3) သုံးခုစလုံးကို တိုက်ဆိုင်ပေးသော ပင်မဂီယာ',
            },
            {
              gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)',
              mark: 'ဂဏန်း "2"',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ "2-2" သွားကြားသို့ တိုက်ပါ',
            },
            {
              gear: 'ဆီပန့်ဂီယာ (In-line Injection Pump Gear)',
              mark: 'ဂဏန်း "3"',
              note: 'Bosch MD In-line ပန့်ဂီယာကို အိုင်ဒလာ "3-3" သွားကြား တိုက်ပါ',
            },
            {
              gear: 'ထွန်စက် ဟိုက်ဒရောလစ်ပန့်ဂီယာ (Hydraulic Pump Drive)',
              mark: 'External Mesh',
              note: 'ထွန်စက်နောက်ချိတ်ဆွဲ ဟိုက်ဒရောလစ်ပန့်ကို ကင်းရှပ်ဘေးမှ မောင်းနှင်သည်',
            },
          ],
          backlashStandard: '0.041 - 0.115 mm',
          backlashLimit: '0.150 mm',
          flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
          idlerTorque: '40 - 45 Nm (29 - 33 Ft-lb)',
          timingRule: 'ကူဘိုတာ ထွန်စက်ကြီးများ (L-Series & M-Series) တွင် အလယ်အိုင်ဒလာဂီယာ၏ 1-1, 2-2, 3-3 မာ့ခ်များ တိကျစွာတိုက်ဆိုင်ပြီးပါက အိုင်ဒလာဘော့လ်ကို 45 Nm ဆွဲပါ။ ဆီချိန်ရှမ်ပြား ထူ/ပါးဖြင့် ဖလိုင်းဝှီး 17° - 19° BTDC မီးချိန်ကို သေချာကိုက်ညီစေရမည်။',
        };
      }

      case 'yanmar_harvester': {
        return {
          categoryBadge: '🌾 ယန်မာ စပါးရိတ်ခြွေစက် သီးသန့် တိုင်မင် (Yanmar Harvester 4TNV98 Timing)',
          burmeseTitle: `ယန်မာ စပါးရိတ်ခြွေစက် (AW70V / AW82V / YH850) တိုင်မင်ဂီယာ စနစ်`,
          subtitle: `${engine.name} (${engine.engineCode}) • ရိတ်ခြွေစက် သီးသန့် Heavy Duty TNV98 အင်ဂျင် A/B/C တိုင်မင်စနစ်`,
          marks: [
            {
              gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)',
              mark: 'အမှတ် [ A ]',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ [ A-A ] နှစ်ထပ်အမှတ်ကြားသို့ တိုက်ဆိုင်ပါ',
            },
            {
              gear: 'အလယ်အိုင်ဒလာဂီယာ (Main Idler Gear)',
              mark: '[ A-A ], [ B-B ], [ C-C ]',
              note: 'Yanmar မူရင်း စက်ရုံထုတ် အက္ခရာနှစ်ထပ် မာ့ခ် ၃ စုံ ပါရှိသည်',
            },
            {
              gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)',
              mark: 'အမှတ် [ B ]',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ [ B-B ] နှစ်ထပ်အမှတ်ကြားသို့ တိုက်ဆိုင်ပါ',
            },
            {
              gear: 'ဆီပန့်ဂီယာ (MP4 Injection Pump Gear)',
              mark: 'အမှတ် [ C ]',
              note: 'Yanmar MP4 Rotary Injection ပန့်ဂီယာကို အိုင်ဒလာ [ C-C ] ကြား တိုက်ပါ',
            },
            {
              gear: 'ရိတ်ခြွေစက် အရန်ဒရိုက်ဗ်ဂီယာ (Aux / Feed Drive)',
              mark: 'Direct Mesh',
              note: 'ဆီပန့်အနောက်ဘက် Feed pump နှင့် အပိုပစ္စည်းမောင်းနှင်သောဂီယာ',
            },
          ],
          backlashStandard: '0.060 - 0.120 mm',
          backlashLimit: '0.160 mm',
          flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
          idlerTorque: '45 - 50 Nm (33 - 37 Ft-lb)',
          timingRule: 'Yanmar 4TNV98 ရိတ်ခြွေစက် အင်ဂျင်တွင် A-AA, B-BB, C-CC အက္ခရာစနစ်ဖြင့် မာ့ခ်တိုက်ရပါမည်။ MP4 ပန့်ဂီယာတပ်ဆင်ရာတွင် ပန့်ရှပ်ကီး (Woodruff Key) အထိုင်မလွဲစေရန် အထူးဂရုပြုပါ။ ဖလိုင်းဝှီး 15° - 17° BTDC တွင် နိုဇယ်ဆီစတင်တွန်းကန်မှု သေချာစစ်ဆေးပါ။',
        };
      }

      case 'yanmar_tractor': {
        return {
          categoryBadge: '🚜 ယန်မာ လေးဘီးထွန်စက်ကြီးများ သီးသန့် တိုင်မင် (Yanmar Tractor TNV88 Timing)',
          burmeseTitle: `ယန်မာ ထွန်စက်ကြီးများ (EF393T / EF494T / YT5101) တိုင်မင်ဂီယာ စနစ်`,
          subtitle: `${engine.name} (${engine.engineCode}) • လယ်ယာသုံး ထွန်စက်များအတွက် TNV88 တာဘို အင်ဂျင် တိုင်မင်စနစ်`,
          marks: [
            {
              gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)',
              mark: 'အမှတ် [ A ]',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ [ A-A ] ကြား တိုက်ပါ',
            },
            {
              gear: 'အလယ်အိုင်ဒလာဂီယာ (Idler Gear)',
              mark: '[ A-A ], [ B-B ], [ C-C ]',
              note: 'ခရိုင်း (A)၊ ကင်း (B)၊ ဆီပန့် (C) သုံးခုစလုံးကို ချိတ်ဆက်ပေးသည်',
            },
            {
              gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)',
              mark: 'အမှတ် [ B ]',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ [ B-B ] ကြား တိုက်ပါ',
            },
            {
              gear: 'ဆီပန့်ဂီယာ (Fuel Injection Pump Gear)',
              mark: 'အမှတ် [ C ]',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ [ C-C ] ကြား တိုက်ပါ',
            },
            {
              gear: 'ထွန်စက် ဟိုက်ဒရောလစ်ပန့်ဂီယာ (Hydraulic Pump)',
              mark: 'Direct Drive',
              note: 'အရှေ့ဘက် ပါဝါစတီယာရင်နှင့် ဟိုက်ဒရောလစ်ပန့် မောင်းဂီယာ',
            },
          ],
          backlashStandard: '0.060 - 0.120 mm',
          backlashLimit: '0.160 mm',
          flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
          idlerTorque: '45 - 50 Nm (33 - 37 Ft-lb)',
          timingRule: 'Yanmar 4TNV88 ထွန်စက်အင်ဂျင်တွင် A-AA, B-BB, C-CC စနစ်ဖြင့် မာ့ခ်တိုက်ပြီးပါက အိုင်ဒလာဂီယာဘော့လ်ကို 48 Nm ဆွဲပါ။ ဆီပန့်ကိုယ်ထည် flange ကို လှည့်၍ ဖလိုင်းဝှီးပေါ်ရှိ 15° - 17° BTDC သို့ မီးချိန်ညှိရပါမည်။',
        };
      }

      case 'massey_perkins': {
        return {
          categoryBadge: '🚜 မက်ဆီဖာဂူဆန် / Perkins တိုင်မင် (Perkins Diesel Timing Train)',
          burmeseTitle: `မက်ဆီဖာဂူဆန် / Perkins (MF 135 / 240 / 385) တိုင်မင်ဂီယာ စနစ်`,
          subtitle: `${engine.name} (${engine.engineCode}) • Perkins AD3.152 & 4.248 မူရင်း S / C / D အက္ခရာ မာ့ခ်စနစ်`,
          marks: [
            {
              gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)',
              mark: 'အက္ခရာ [ S ]',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ [ S-S ] ကြား တိုက်ဆိုင်ပါ',
            },
            {
              gear: 'အလယ်အိုင်ဒလာဂီယာ (Idler Gear)',
              mark: '[ S-S ], [ C-C ], [ D-D ]',
              note: 'Crank (S), Cam (C), CAV DPA Pump (D) သုံးခုစလုံးကို တိုက်ဆိုင်ပေးသည်',
            },
            {
              gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)',
              mark: 'အက္ခရာ [ C ]',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ [ C-C ] ကြား တိုက်ဆိုင်ပါ',
            },
            {
              gear: 'ဆီပန့်ဂီယာ (CAV DPA Injection Pump Gear)',
              mark: 'အက္ခရာ [ D ]',
              note: 'CAV DPA Rotary ပန့်ဂီယာကို အိုင်ဒလာ [ D-D ] ကြား တိုက်ဆိုင်ပါ',
            },
            {
              gear: 'အောက်ခံ ဘာလန်ဆာဂီယာ (MF 385 Balancer Unit)',
              mark: 'Dots (• •)',
              note: 'MF 385 တွင် အင်ဂျင်အောက်ခြေ ဝိတ်တုံးယူနစ် မာ့ခ်ကိုပါ သေချာတိုက်ရမည်',
            },
          ],
          backlashStandard: '0.063 - 0.127 mm (0.0025" - 0.005")',
          backlashLimit: '0.152 mm (0.006")',
          flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
          idlerTorque: '65 Nm (48 Ft-lb)',
          timingRule: 'Perkins အင်ဂျင်များတွင် S (Shaft) - SS, C (Cam) - CC, D (DPA Pump) - DD ဟူ၍ မူရင်းစက်ရုံထုတ် အက္ခရာများ တံဆိပ်ရိုက်နှိပ်ထားပါသည်။ CAV DPA ပန့်ဒရိုက်ဗ် hub ကို ဖြုတ်ပါက timing letter တည့်မတည့် သေချာစစ်ပါ။',
        };
      }

      case 'ford_newholland': {
        return {
          categoryBadge: '🚜 ဖော့ဒ် / နယူးဟော်လန် တိုင်မင် (Ford Heavy Diesel Timing)',
          burmeseTitle: `Ford 5000 / 6610 & New Holland တိုင်မင်ဂီယာ စနစ်`,
          subtitle: `${engine.name} (${engine.engineCode}) • Ford 256 / 268 စီးရီး အစက်အမှတ် (Dots) မာ့ခ်စနစ်`,
          marks: [
            {
              gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)',
              mark: 'အစက် (၁) စက် [ • ]',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ အစက် (၂) စက် [ •• ] ကြားသို့ တိုက်ပါ',
            },
            {
              gear: 'အလယ်အိုင်ဒလာဂီယာ (Idler Gear)',
              mark: 'အစက် (၂) စက်တွဲ [ •• ]',
              note: 'ခရိုင်း၊ ကင်းရှပ်နှင့် ဆီပန့်ဂီယာများနှင့် ချိတ်ဆက်ပါ',
            },
            {
              gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)',
              mark: 'အစက် (၁) စက် [ • ]',
              note: 'အိုင်ဒလာဂီယာ၏ နှစ်စက်ကြား တိုက်ဆိုင်ပါ',
            },
            {
              gear: 'ဆီပန့်ဂီယာ (Simms / Minimec Pump Gear)',
              mark: 'အစက် (၁) စက် [ • ]',
              note: 'Simms In-line ပန့်ဒရိုက်ဗ်နှင့် အမှတ်တိုက်ဆိုင်ပါ',
            },
          ],
          backlashStandard: '0.050 - 0.120 mm',
          backlashLimit: '0.160 mm',
          flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
          idlerTorque: '60 - 65 Nm (45 - 48 Ft-lb)',
          timingRule: 'Ford Diesel အင်ဂျင်များတွင် အစက်အမှတ် (Dots) များ တိကျစွာတိုက်ရမည်။ Simms ပန့်ဒရိုက်ဗ် အထိုင် flange မလွဲစေရန် အထူးဂရုပြုပါ။',
        };
      }

      case 'chinese_truck': {
        if (isWeichai) {
          return {
            categoryBadge: '🚛 ဝေချိုင်း (Weichai WP10 / WP12 / WD615) ၁၀ ဘီး၊ ၁၂ ဘီး ဟိုဝို/ရှက်မန်း ဒန့်ကားကြီးများ တိုင်မင်',
            burmeseTitle: `Weichai WP10 / WP12 / WD615 တိုင်မင်ဂီယာ & မာကင် စနစ်`,
            subtitle: `${engine.name} (${engine.engineCode}) • Sinotruk Howo 371/380, Shacman F3000 တရုတ်ဒန့်ကားကြီးများအတွက် စက်ရုံထုတ် 0, 1, 2 ဂီယာမာကင်`,
            marks: [
              {
                gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear - 64T)',
                mark: 'ဂဏန်း "0"',
                note: 'အလယ်အိုင်ဒလာဂီယာ၏ အောက်ခြေအမှတ် "0" (သို့မဟုတ် 0-0) နှင့် ကွက်တိတိုက်ဆိုင်ပါ (Cylinder #1 TDC)',
              },
              {
                gear: 'အလယ်ဗဟို အိုင်ဒလာဂီယာ (Main Idler Gear - 90T)',
                mark: '"0", "1", "2"',
                note: 'ခရိုင်း (0)၊ ကင်းရှပ် (1) နှင့် ဆီပန့် (2) သုံးခုစလုံးကို ဗဟိုမှ အတိအကျ ဆက်စပ်ပေးသော ပင်မဂီယာကြီး (ဆွဲပေါင်: 160-180 N·m)',
              },
              {
                gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear - 48T)',
                mark: 'ဂဏန်း "1"',
                note: 'အလယ်အိုင်ဒလာဂီယာ၏ အမှတ် "1" (သို့မဟုတ် 1-1) နှင့် တိကျစွာတိုက်ဆိုင်ပါ (ဘားတိုင်မင် အဖွင့်/အပိတ်)',
              },
              {
                gear: 'ဆီပန့်ဂီယာ (Bosch HPCR CP3 / Inline Pump Gear - 48T)',
                mark: 'ဂဏန်း "2"',
                note: 'ဆီပန့်ဒရိုက်ဗ်ဂီယာကို အိုင်ဒလာဂီယာ အမှတ် "2" (သို့မဟုတ် 2-2) နှင့် တိုက်ပါ (နံပါတ် ၁ ဆလင်ဒါ မီးချိန် 14°~16° BTDC)',
              },
              {
                gear: 'လေကွန်ပရက်ဆာဂီယာ (Air Compressor Gear - 26T)',
                mark: 'Idler Driven (26T)',
                note: '၁၀ ဘီး၊ ၁၂ ဘီး လေဘရိတ်နှင့် လေစနစ်တစ်ခုလုံးအတွက် ၂ ဆလင်ဒါ လေကွန်ပရက်ဆာ မောင်းနှင်သည့်ဂီယာ',
              },
              {
                gear: 'ပါဝါစတီယာရင် & ဒန့်ဟိုက်ဒရောလစ်ပန့်ဂီယာ (Hydraulic Steering Pump - 18T)',
                mark: 'Direct Drive (18T)',
                note: 'ကားပါဝါစတီယာရင်နှင့် ဒန့်မ ရန်အတွက် ဟိုက်ဒရောလစ်ဆီတွန်းကန်ပေးသောဂီယာ',
              },
            ],
            backlashStandard: '0.100 - 0.250 mm',
            backlashLimit: '0.350 mm',
            flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
            idlerTorque: '160 - 180 N·m (M14) / 110 - 120 N·m (M12)',
            timingRule: 'Weichai WP10 / WP12 အင်ဂျင်များတွင် ဖလိုင်းဝှီး OT (0° TDC) ကို ချိန်ညှိပြီးနောက် အလယ်အိုင်ဒလာဂီယာ၏ 0, 1, 2 မာကင်များကို ခရိုင်း (0)၊ ကင်းရှပ် (1)၊ ဆီပန့် (2) တို့နှင့် အတိအကျ တိုက်ဆိုင်ရပါမည်။ အိုင်ဒလာ hub bolt များကို Thread Locker သုတ်၍ သတ်မှတ်ဆွဲပေါင် အပြည့်ဆွဲပါ။ Backlash ကစားချက် 0.10 - 0.25 mm အတွင်း Dial Gauge ဖြင့် စစ်ဆေးပြီးမှ အရှေ့တိုင်မင်ဖုံး တပ်ဆင်ရပါမည်။',
          };
        }

        if (isCummins) {
          return {
            categoryBadge: '🚛 ကမင် (Cummins 6BT / 6CT / ISDe) ဒေါင်းဖန်း (Dongfeng) ၁၀ ဘီး၊ ၁၂ ဘီး တိုင်မင်',
            burmeseTitle: `Cummins 6BT 5.9 / 6CT 8.3 တိုင်မင်ဂီယာ & Timing Pin စနစ်`,
            subtitle: `${engine.name} (${engine.engineCode}) • Dongfeng Kinland, Foton Auman ဒန့်ကားကြီးများအတွက် စက်ရုံထုတ် တိုင်မင်စနစ်`,
            marks: [
              {
                gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)',
                mark: 'အစက် [ • ] (Single Dot)',
                note: 'ကင်းရှပ်ဂီယာ (သို့မဟုတ် အိုင်ဒလာဂီယာ) ၏ နှစ်စက်ကြားသို့ အတိအကျ တိုက်ဆိုင်ပါ (TDC Cyl #1)',
              },
              {
                gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)',
                mark: 'အစက် (၂) စက် [ • • ] (Double Dots)',
                note: 'ခရိုင်းရှပ်ဂီယာ၏ အစက် [ • ] ကို ကင်းရှပ်အစက် [ • • ] နှစ်စက်ကြား သေချာညှပ်တိုက်ပါ',
              },
              {
                gear: 'ဆီပန့်ဂီယာ (Bosch P7100 / Bosch VE Pump Gear)',
                mark: 'Timing Pin Lock + Tooth Dot',
                note: 'Bosch P7100 အင်လိုင်းပန့်ရှပ်ကို Timing Pin Lock ချပြီး ကင်းရှပ်အမှတ်နှင့် တိုက်ဆိုင်ဆွဲကျပ်ပါ (ဆီပန့်နပ်ဆွဲပေါင် 165-175 N·m)',
              },
              {
                gear: 'အင်ဂျင်ဝိုင်ပန့်ဂီယာ (Lube Oil Pump Drive Gear)',
                mark: 'Direct Crank Mesh',
                note: 'ခရိုင်းရှပ်ဂီယာမှတစ်ဆင့် အင်ဂျင်အောက်ခြေ ဝိုင်ပန့်ကို တိုက်ရိုက်လည်ပတ်စေသည်',
              },
              {
                gear: 'လေကွန်ပရက်ဆာဂီယာ (Air Compressor / Accessory Gear)',
                mark: 'Accessory Drive',
                note: 'ကားလေစနစ်အတွက် ကွန်ပရက်ဆာနှင့် ပါဝါစတီယာရင်ပန့် မောင်းနှင်သည့်ဂီယာ',
              },
            ],
            backlashStandard: '0.080 - 0.230 mm',
            backlashLimit: '0.330 mm',
            flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
            idlerTorque: '65 - 75 N·m (Accessory Hub)',
            timingRule: 'Cummins 6BT/6CT အင်ဂျင်များတွင် ကမ်ရှပ်အနောက်ဘက်ရှိ Engine Timing Pin ကို တွန်းသွင်း၍ No.1 TDC သော့ချိန်ပြီးမှ ဂီယာအမှတ်များ တိုက်ရပါမည်။ Bosch P7100 ပန့် တပ်ဆင်ရာတွင် ပန့်ထိပ် Nut ကို 170 N·m အပြည့်ဆွဲပြီးပါက Timing Pin ကို မမေ့မလျော့ ပြန်ဖြုတ်ရပါမည်။ Pin မဖြုတ်ဘဲ အင်ဂျင်လှည့်ပါက Timing Pin ကျိုးထွက်တတ်ပါသည်။',
          };
        }

        if (isYuchai) {
          return {
            categoryBadge: '🚛 ယုချိုင်း (Yuchai YC6L / YC6M / YC6A) ဒန့်ကား & ကုန်တင်ကားကြီးများ တိုင်မင်',
            burmeseTitle: `Yuchai YC6L / YC6M Heavy Duty တိုင်မင်ဂီယာ စနစ်`,
            subtitle: `${engine.name} (${engine.engineCode}) • Dongfeng, Chenglong, CAMC ဒန့်ကားကြီးများအတွက် အဆင့်မြင့် ၆ လုံးတွဲ ဂီယာစနစ်`,
            marks: [
              {
                gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear - Gear 1)',
                mark: 'အစက် (၂) စက် [ • • ] (သို့ 1)',
                note: 'အလယ်အိုင်ဒလာဂီယာ၏ အစက် [ • ] ကို ခရိုင်းအစက် [ • • ] နှစ်စက်ကြား သေချာညှပ်တိုက်ပါ',
              },
              {
                gear: 'အလယ်ဗဟို အိုင်ဒလာဂီယာ (Intermediate Idler Gear - Gear 2)',
                mark: 'စက်ရုံထုတ် Dots Alignment (Detail A & B)',
                note: 'ခရိုင်း၊ ကင်းရှပ်နှင့် ဆီပန့်ဂီယာ ၃ စုံစလုံးကို အပြန်အလှန် ဆက်စပ်ပေးသော ဂီယာ (ဆွဲပေါင် 110-120 N·m)',
              },
              {
                gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear - Gear 3)',
                mark: 'အစက် [ • ] (Single Dot - Detail B)',
                note: 'အလယ်အိုင်ဒလာဂီယာ၏ နှစ်စက်အမှတ် [ • • ] ကြားသို့ ကင်းရှပ်အစက် [ • ] ကို တိုက်ဆိုင်ပါ',
              },
              {
                gear: 'ဆီပန့်ဂီယာ (HPCR Common Rail High Pressure Pump - Gear 4)',
                mark: 'Direct Idler Mesh (Gear 4)',
                note: 'Bosch CP3.3 Common Rail ပန့်ဂီယာကို အိုင်ဒလာဂီယာနှင့် ချိတ်ဆက်တပ်ဆင်ပါ',
              },
              {
                gear: 'လေကွန်ပရက်ဆာဂီယာ (Air Compressor Drive Gear - Gear 5)',
                mark: 'Auxiliary Gear 5',
                note: 'ကားလေဘရိတ်အတွက် လေဖိအားဖြည့်ပေးသော ၂ ဆလင်ဒါ ကွန်ပရက်ဆာဂီယာ',
              },
              {
                gear: 'ပါဝါစတီယာရင်ပန့်ဂီယာ (Steering Pump Drive Gear - Gear 6)',
                mark: 'Auxiliary Gear 6',
                note: 'ကားစတီယာရင်အတွက် ဟိုက်ဒရောလစ်ပန့် မောင်းနှင်သည့်ဂီယာ',
              },
            ],
            backlashStandard: '0.100 - 0.250 mm',
            backlashLimit: '0.350 mm',
            flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
            idlerTorque: '110 - 125 N·m (81 - 92 Ft-lb)',
            timingRule: 'Yuchai YC6L / YC6M အင်ဂျင်များတွင် Crank (1), Idler (2), Cam (3) တို့၏ စက်ရုံထုတ် အစက်အမှတ် (Detail A & B Dots) များကို အတိအကျ တိုက်ဆိုင်ရပါမည်။ အိုင်ဒလာဂီယာ ဘော့လ်များကို သတ်မှတ်ဆွဲပေါင် ၁၁၀-၁၂၅ N·m ဖြင့် တင်းကျပ်ပြီး ဂီယာသွားများ ကစားချက် (Backlash 0.10 ~ 0.25 mm) စစ်ဆေးရပါမည်။',
          };
        }

        // Default to Yunnei 4100 / 4102 and Isuzu 4JB1 4-cylinder dump trucks
        return {
          categoryBadge: '🚚 တရုတ်ဒန့်ကား (Yunnei 4100 / 4102 & Isuzu Clone 2.8) တိုင်မင်',
          burmeseTitle: `တရုတ် ၆ ဘီးဒန့်ကား / တောင်ပြို (Yunnei 4100 / 4102) တိုင်မင်ဂီယာ စနစ်`,
          subtitle: `${engine.name} (${engine.engineCode}) • လေကွန်ပရက်ဆာဂီယာနှင့် ဒန့်ဟိုက်ဒရောလစ်ပန့်ဂီယာ ပါဝင်သော စက်ရုံထုတ် 0, 1, 2 ဂီယာစနစ်`,
          marks: [
            {
              gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear - G1)',
              mark: 'ဂဏန်း "0"',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ "0-0" (သို့မဟုတ် 00) နှစ်ထပ်သွားကြားသို့ တိုက်ဆိုင်ပါ',
            },
            {
              gear: 'အလယ်ပင်မ အိုင်ဒလာဂီယာ (Intermediate Idler Gear - G2)',
              mark: '"0-0", "1-1", "2-2" (စက်ရုံထုတ် မာကင်များ)',
              note: 'ခရိုင်း (0)၊ ကင်းရှပ် (1) နှင့် ဆီပန့် (2) ၃ ခုစလုံးကို ဆုံပေးသော ဂီယာကြီး (ဆွဲပေါင် 80-90 N·m)',
            },
            {
              gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear - G3)',
              mark: 'ဂဏန်း "1"',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ "1-1" (သို့ 11) သွားကြားသို့ တိုက်ဆိုင်ပါ (ဘားတိုင်မင်)',
            },
            {
              gear: 'ဆီပန့်ဂီယာ (Inline Fuel Injection Pump - G4)',
              mark: 'ဂဏန်း "2"',
              note: 'BQ / BH In-line ပန့်ဂီယာကို အိုင်ဒလာ "2-2" (သို့ 22) ကြား တိုက်ပါ (မီးတိုင်မင် 16°~18° BTDC)',
            },
            {
              gear: 'လေကွန်ပရက်ဆာဂီယာ (Air Compressor Drive Gear - G5)',
              mark: 'Direct Idler Drive',
              note: 'ကားလေဘရိတ်အတွက် လေဖိအားဖြည့်ပေးသော ကွန်ပရက်ဆာဂီယာ',
            },
            {
              gear: 'ဟိုက်ဒရောလစ် / ပါဝါစတီယာရင်ပန့်ဂီယာ (Hydraulic Steering Pump - G6)',
              mark: 'PTO / Aux Drive',
              note: 'ဒန့်မပြီး ကားစတီယာရင်လှည့်ရန် ဟိုက်ဒရောလစ်ဆီတွန်းကန်ပေးသောဂီယာ',
            },
          ],
          backlashStandard: '0.070 - 0.140 mm',
          backlashLimit: '0.200 mm',
          flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
          idlerTorque: '80 - 90 N·m (59 - 66 Ft-lb)',
          timingRule: 'တရုတ် 4100 / 4102 ဒန့်ကားများတွင် အလယ်အိုင်ဒလာဂီယာ၏ 0-0, 1-1, 2-2 မာ့ခ်များ တိကျစွာတိုက်ရမည်။ လေကွန်ပရက်ဆာနှင့် ဒန့်ဟိုက်ဒရောလစ်ပန့် drive ဂီယာများ ချောမွေ့စွာ လည်ပတ်မှု ရှိ/မရှိ စစ်ဆေးပြီးမှသာ အင်ဂျင်ရှေ့ဖုံး ပိတ်တပ်ရပါမည်။',
        };
      }

      case 'yto_tractor': {
        return {
          categoryBadge: '🇨🇳 YTO (အရှေ့နီ DFH) ၄ ဘီးယက် ထွန်စက်ကြီး တိုင်မင် (Luoyang Ricardo Tech)',
          burmeseTitle: `YTO Dongfanghong (DFH LR4108 / LR4M5) တိုင်မင်ဂီယာ စနစ်`,
          subtitle: `${engine.name} (${engine.engineCode}) • ခရိုင်း၊ ကင်းရှပ်၊ အလယ်အိုင်ဒလာနှင့် အင်လိုင်းဆီပန့် ၄ လုံးတွဲ စက်ရုံထုတ် ဂဏန်း/အမှတ် မာကင်စနစ်`,
          marks: [
            {
              gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)',
              mark: 'အမှတ် "0" (သို့မဟုတ် 1)',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ "0" (သို့မဟုတ် 1) သွားခွကြားသို့ တိုက်ဆိုင်ပါ',
            },
            {
              gear: 'အလယ်အိုင်ဒလာဂီယာ (Timing Idler Gear)',
              mark: '"0", "00", "000" (စက်ရုံထုတ် မာကင်များ)',
              note: 'ခရိုင်း (0)၊ ကင်းရှပ် (00) နှင့် ဆီပန့် (000) တို့ကို ဗဟိုမှ အတိအကျ ဆက်စပ်ပေးသော ပင်မဂီယာကြီး',
            },
            {
              gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)',
              mark: 'အမှတ် "00" (သို့မဟုတ် 2)',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ "00" သွားကြားသို့ တိုက်ဆိုင်ပါ (ဘားတိုင်မင် အဖွင့်/အပိတ်)',
            },
            {
              gear: 'ဆီပန့်ဂီယာ (Fuel Injection Pump Gear)',
              mark: 'အမှတ် "000" (သို့မဟုတ် 3)',
              note: 'BH4PM အင်လိုင်းပန့်ဂီယာကို အိုင်ဒလာဂီယာ "000" နှင့် တိုက်ပါ (ဆလင်ဒါ ၁ မီးချိန် 16°~18° BTDC)',
            },
            {
              gear: 'ကင်းရှပ်တွန်းပြား (Thrust Plate Bolts)',
              mark: 'Torque: 60 - 70 Nm',
              note: 'ကင်းရှပ်ရှေ့ပြား ဘော့လ်များကို 60-70 Nm ကျပ်ပြီး လော့ပြားခေါက်ပါ',
            },
          ],
          backlashStandard: '0.100 - 0.250 mm',
          backlashLimit: '0.350 mm',
          flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
          idlerTorque: '90 - 110 Nm (66 - 81 Ft-lb)',
          timingRule: 'YTO Dongfanghong အင်ဂျင်များတွင် အလယ်အိုင်ဒလာဂီယာ၏ 0, 00, 000 မာ့ခ်များ တိကျစွာတိုက်ရပါမည်။ ဂီယာကင်းလွတ်ခွာ (Backlash) ကို Dial Gauge ဖြင့် တိုင်းတာရာတွင် 0.10 ~ 0.25 mm အတွင်း ရှိရပါမည်။ Idler hub အထိုင်ဆီပေါက် (Oil Hole) အင်ဂျင်ဘလောက်နှင့် ချိန်တပ်ရန် အထူးအရေးကြီးပါသည်။',
        };
      }

      case 'lovol_tractor': {
        return {
          categoryBadge: '🇨🇳 LOVOL (ဖိုတွန် လိုဗော) ၄ ဘီးယက် ထွန်စက်ကြီး တိုင်မင် (Lovol 1004 / Xinchai 498)',
          burmeseTitle: `Lovol TD824 / TD904 & TB504 တိုင်မင်ဂီယာ စနစ်`,
          subtitle: `${engine.name} (${engine.engineCode}) • Crank, Cam, Fuel Pump သွားအမှတ် (1, 2, 3) စက်ရုံထုတ် တိုင်မင်စနစ်`,
          marks: [
            {
              gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)',
              mark: 'Timing Mark "1" (သို့မဟုတ် •)',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ အမှတ် "1" သွားကြားသို့ တိုက်ဆိုင်ပါ',
            },
            {
              gear: 'အလယ်အိုင်ဒလာဂီယာ (Main Idler Gear)',
              mark: 'Timing Marks "1", "2", "3"',
              note: 'Crank (1), Camshaft (2), Fuel Injection Pump (3) အမှတ်များကို အတိအကျ ဆက်စပ်ပေးသည်',
            },
            {
              gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)',
              mark: 'Timing Mark "2" (သို့မဟုတ် ••)',
              note: 'အလယ်အိုင်ဒလာဂီယာ၏ အမှတ် "2" နှင့် တိုက်ဆိုင်ပါ',
            },
            {
              gear: 'ဆီပန့်ဂီယာ (Fuel Injection Pump Gear)',
              mark: 'Timing Mark "3" (သို့မဟုတ် •••)',
              note: 'Bosch VE / Weifu ပန့်ဂီယာကို အလယ်အိုင်ဒလာဂီယာ အမှတ် "3" နှင့် တိုက်ဆိုင်ပါ',
            },
          ],
          backlashStandard: '0.080 - 0.180 mm',
          backlashLimit: '0.250 mm',
          flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
          idlerTorque: '80 - 95 Nm (59 - 70 Ft-lb)',
          timingRule: 'Lovol TD / TB စီးရီးများတွင် Crank (1), Cam (2), Fuel Pump (3) အမှတ်များ တိကျစွာတိုက်ရပါမည်။ Perkins / Xinchai စံနှုန်းအရ အိုင်ဒလာဂီယာဘော့လ်ကို ၈၀-၉၅ Nm တင်းကျပ်ပြီး ဂီယာများ ချောမွေ့စွာလည်ပတ်မှု ရှိ/မရှိ လက်ဖြင့် ၂ ပတ် လှည့်စစ်ဆေးပါမည်။',
        };
      }

      case 'john_deere':
      default: {
        if (isJohnDeere) {
          return {
            categoryBadge: '🚜 ဂျွန်ဒီးယား (John Deere PowerTech 3029) တိုင်မင်ဂီယာ စနစ်',
            burmeseTitle: `John Deere 5045D / 5050D / 5310 တိုင်မင်ဂီယာ စနစ်`,
            subtitle: `${engine.name} (${engine.engineCode}) • Crank (1), Cam (2), Fuel Pump (3) စက်ရုံထုတ် တိုင်မင်စနစ်`,
            marks: [
              {
                gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear)',
                mark: 'Timing Mark "1"',
                note: 'အလယ်အိုင်ဒလာဂီယာ၏ အမှတ် "1" သွားကြားသို့ တိုက်ဆိုင်ပါ (TDC Cyl #1)',
              },
              {
                gear: 'အလယ်အိုင်ဒလာဂီယာ (Upper Idler Gear)',
                mark: 'Timing Marks "1", "2", "3"',
                note: 'Crank (1), Camshaft (2), Fuel Injection Pump (3) အမှတ်များကို အတိအကျ ဆက်စပ်ပေးသည်',
              },
              {
                gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)',
                mark: 'Timing Mark "2"',
                note: 'အလယ်အိုင်ဒလာဂီယာ၏ အမှတ် "2" နှင့် တိုက်ဆိုင်ပါ (ဘားတိုင်မင်)',
              },
              {
                gear: 'ဆီပန့်ဂီယာ (Fuel Injection Pump Drive Gear)',
                mark: 'Timing Mark "3"',
                note: 'Stanadyne DB2 / Lucas Rotary ပန့်ဂီယာကို အလယ်အိုင်ဒလာဂီယာ အမှတ် "3" နှင့် တိုက်ပါ',
              },
              {
                gear: 'ဟိုက်ဒရောလစ်ပန့်ဂီယာ (Hydraulic Pump Drive Gear)',
                mark: 'Timing Mark မလိုပါ',
                note: 'ကင်းရှပ်ဂီယာမှတစ်ဆင့် တိုက်ရိုက်မောင်းနှင်ပါသည်',
              },
            ],
            backlashStandard: '0.080 - 0.220 mm',
            backlashLimit: '0.300 mm',
            flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
            idlerTorque: '60 Nm (44 Ft-lb)',
            timingRule: 'John Deere PowerTech 3029 စီးရီးများတွင် Crank (1), Cam (2), Injection Pump (3) အမှတ်များကို အလယ် Upper Idler Gear နှင့် တိကျစွာတိုက်ရပါမည်။ Idler bolt ကို 60 Nm (44 Ft-lb) ဖြင့် ဆွဲကျပ်ပြီး Camshaft Thrust Plate ကို 25 Nm ဆွဲပါ။ Backlash ဂီယာကစားချက် 0.08 - 0.22 mm အတွင်း စစ်ဆေးပါမည်။',
          };
        }
        return {
          categoryBadge: '🚜 ဆိုနာလီကာ တိုင်မင် (Sonalika ITL Heavy Timing)',
          burmeseTitle: `Sonalika DI 750 / RX 50 တိုင်မင်ဂီယာ စနစ်`,
          subtitle: `${engine.name} (${engine.engineCode}) • Central Idler နှင့် Single/Double Dots တိုင်မင်စနစ်`,
          marks: [
            {
              gear: 'ခရိုင်းရှပ်ဂီယာ (Crankshaft Pinion)',
              mark: 'Single Dot [ • ]',
              note: 'အလယ်အိုင်ဒလာဂီယာ အမှတ်နှင့် တိုက်ပါ (Torque: 200 Nm)',
            },
            {
              gear: 'အလယ်အိုင်ဒလာဂီယာ (Central Idler)',
              mark: 'Single [ • ] & Double [ •• ]',
              note: 'Crank သို့ Single Dot, Cam နှင့် FIP သို့ Double Dots တိုက်ပါ',
            },
            {
              gear: 'ကင်းရှပ်ဂီယာ (Camshaft Gear)',
              mark: 'Double Dots [ •• ]',
              note: 'အလယ်အိုင်ဒလာဂီယာ Double Dots နှင့် တိုက်ပါ (Torque: 120 Nm)',
            },
            {
              gear: 'ဆီပန့်ဂီယာ (FIP Drive Gear)',
              mark: 'Double Dots [ •• ]',
              note: 'အလယ်အိုင်ဒလာဂီယာ Double Dots နှင့် တိုက်ပါ (Torque: 80 Nm)',
            },
          ],
          backlashStandard: '0.080 - 0.180 mm',
          backlashLimit: '0.250 mm',
          flywheelTiming: engine.fuelSystem.injectionTimingBtdc,
          idlerTorque: '70 Nm (52 Ft-lb)',
          timingRule: 'Sonalika ITL အင်ဂျင်များတွင် Crank (•), Cam (••), FIP (••) အစက်အမှတ်များကို Central Idler နှင့် တိကျစွာတိုက်ဆိုင်တပ်ဆင်ရပါမည်။',
        };
      }
    }
  };

  const timingInfo = getTimingData();

  // Authentic Manufacturer Company Brand Badge SVG
  const renderBrandBadge = () => {
    switch (engine.brand) {
      case 'yto_lovol':
        if (engine.id.includes('yto') || engine.name.toLowerCase().includes('yto')) {
          return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-red-500/50 shadow-md">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-amber-300 text-xs border border-amber-400 shadow">
                YTO
              </div>
              <div>
                <span className="font-black text-xs text-red-200 tracking-widest block">YTO • DONGFANGHONG (အရှေ့နီ)</span>
                <span className="text-[9px] text-amber-400 font-semibold uppercase">China First Tractor Group • LR4108 Diesel</span>
              </div>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-950 via-slate-900 to-blue-950 border border-sky-500/50 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center font-black text-white text-xs border border-sky-300 shadow">
              LV
            </div>
            <div>
              <span className="font-black text-xs text-sky-200 tracking-widest block">LOVOL • FOTON HEAVY AGRI</span>
              <span className="text-[9px] text-sky-400 font-semibold uppercase">Lovol-Perkins 1004 / Xinchai Power</span>
            </div>
          </div>
        );

      case 'kubota':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border border-emerald-500/50 shadow-md">
            {/* Kubota Stylized Crest */}
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-white text-xs border border-emerald-300 shadow">
              K
            </div>
            <div>
              <span className="font-black text-xs text-white tracking-widest block">KUBOTA</span>
              <span className="text-[9px] text-emerald-400 font-semibold uppercase">
                {engine.category === 'harvester' ? 'Combine Harvester Division' : engine.category === 'tractor' ? 'Tractor Division' : 'Power Tiller Diesel'}
              </span>
            </div>
          </div>
        );

      case 'yanmar':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-red-500/50 shadow-md">
            {/* Yanmar Ribbon Crest */}
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-xs border border-red-300 shadow">
              Y
            </div>
            <div>
              <span className="font-black text-xs text-red-200 tracking-widest block">YANMAR</span>
              <span className="text-[9px] text-red-400 font-semibold uppercase">
                {engine.category === 'harvester' ? 'Combine Agri Harvester' : 'Agricultural Machinery'}
              </span>
            </div>
          </div>
        );

      case 'massey_ferguson':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 border border-red-500/50 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-red-700 flex items-center justify-center font-black text-white text-xs border border-red-300 shadow">
              MF
            </div>
            <div>
              <span className="font-black text-xs text-slate-100 tracking-widest block">MASSEY FERGUSON</span>
              <span className="text-[9px] text-red-400 font-semibold uppercase">Perkins Diesel Division</span>
            </div>
          </div>
        );

      case 'ford_newholland':
        if (engine.id.includes('holland') || engine.name.toLowerCase().includes('holland')) {
          return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950 border border-blue-500/50 shadow-md">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center font-black text-amber-300 text-xs border border-blue-400 shadow">
                NH
              </div>
              <div>
                <span className="font-black text-xs text-blue-200 tracking-widest block">NEW HOLLAND AGRICULTURE</span>
                <span className="text-[9px] text-amber-400 font-semibold uppercase">TT Series & Iveco FPT Diesel</span>
              </div>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-blue-500/50 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center font-black text-white text-xs border border-blue-300 shadow">
              F
            </div>
            <div>
              <span className="font-black text-xs text-blue-200 tracking-widest block">FORD TRACTOR</span>
              <span className="text-[9px] text-blue-400 font-semibold uppercase">Heavy Agricultural Power</span>
            </div>
          </div>
        );

      case 'chinese_truck':
        if (isWeichai) {
          return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border border-red-500/50 shadow-md">
              <div className="w-8 h-8 rounded-lg bg-red-700 flex items-center justify-center font-black text-white text-xs border border-red-300 shadow">
                WC
              </div>
              <div>
                <span className="font-black text-xs text-red-200 tracking-widest block">WEICHAI POWER (ဝေချိုင်း)</span>
                <span className="text-[9px] text-amber-400 font-semibold uppercase">WP10 / WP12 / WD615 Heavy Dump</span>
              </div>
            </div>
          );
        }
        if (isCummins) {
          return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 border border-red-500/50 shadow-md">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-xs border border-red-300 shadow">
                C
              </div>
              <div>
                <span className="font-black text-xs text-slate-100 tracking-widest block">CUMMINS DIESEL (ကမင်)</span>
                <span className="text-[9px] text-red-400 font-semibold uppercase">6BT 5.9 / 6CT 8.3 Dongfeng Commercial</span>
              </div>
            </div>
          );
        }
        if (isYuchai) {
          return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-blue-500/50 shadow-md">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center font-black text-white text-xs border border-blue-300 shadow">
                YC
              </div>
              <div>
                <span className="font-black text-xs text-blue-200 tracking-widest block">YUCHAI POWER (ယုချိုင်း)</span>
                <span className="text-[9px] text-sky-400 font-semibold uppercase">YC6L / YC6M Heavy Duty Diesel</span>
              </div>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/50 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center font-black text-slate-950 text-xs border border-amber-300 shadow">
              YN
            </div>
            <div>
              <span className="font-black text-xs text-amber-300 tracking-widest block">YUNNEI POWER (ယွန်းနေး)</span>
              <span className="text-[9px] text-amber-400 font-semibold uppercase">4100 / 4102 / 2.8 Commercial Dump</span>
            </div>
          </div>
        );

      case 'sonalika_deere':
      default:
        if (engine.id.includes('sonalika')) {
          return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950 border border-blue-500/50 shadow-md">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs border border-blue-300 shadow">
                S
              </div>
              <div>
                <span className="font-black text-xs text-blue-200 tracking-widest block">SONALIKA ITL</span>
                <span className="text-[9px] text-amber-400 font-semibold uppercase">Heavy Duty Tractor Engine</span>
              </div>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950 via-slate-900 to-yellow-950 border border-yellow-500/50 shadow-md">
            <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center font-black text-slate-950 text-xs border border-yellow-300 shadow">
              JD
            </div>
            <div>
              <span className="font-black text-xs text-yellow-300 tracking-widest block">JOHN DEERE / POWERTECH</span>
              <span className="text-[9px] text-emerald-400 font-semibold uppercase">Agricultural Heavy Engine</span>
            </div>
          </div>
        );
    }
  };

  // Render Engine-Specific Specialized SVG Diagram
  const renderSpecializedDiagram = () => {
    // 1. Single Cylinder Direct Mesh Layout (RT120 / RT140 / TF120 / Sifang - NO IDLER)
    if (diagramKind === 'single_cylinder') {
      const isKubota = engine.brand === 'kubota';
      return (
        <svg viewBox="0 0 460 320" className="w-full h-full drop-shadow-2xl">
          <defs>
            <filter id="gearGlowSingle" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="crankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="camGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="balGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>

          {/* Direct Mesh Contact Lines */}
          <line x1="230" y1="160" x2="110" y2="160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="230" y1="160" x2="330" y2="80" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="230" y1="160" x2="330" y2="240" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />

          {/* 1. CENTER CRANKSHAFT GEAR */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGear('crank')}
          >
            <circle
              cx="230"
              cy="160"
              r="48"
              fill="url(#crankGrad)"
              stroke={selectedGear === 'crank' ? '#a7f3d0' : '#10b981'}
              strokeWidth={selectedGear === 'crank' ? '4' : '2'}
              filter="url(#gearGlowSingle)"
            />
            <circle cx="230" cy="160" r="20" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <circle cx="230" cy="160" r="8" fill="#10b981" />
            <text x="230" y="156" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
              CRANKSHAFT
            </text>
            <text x="230" y="172" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontWeight="900" fontFamily="monospace">
              {isKubota ? 'Mark [ • ]' : 'Mark [ 1 ]'}
            </text>

            {/* Direct Mesh Callout Tag */}
            <rect x="150" y="148" width="46" height="18" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
            <text x="173" y="161" textAnchor="middle" fill="#ecfdf5" fontSize="8" fontWeight="bold">
              MESH 1
            </text>
          </g>

          {/* 2. LEFT CAMSHAFT GEAR (2X Diameter of Crank) */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGear('cam')}
          >
            <circle
              cx="110"
              cy="160"
              r="68"
              fill="url(#camGrad)"
              stroke={selectedGear === 'cam' ? '#fef08a' : '#f59e0b'}
              strokeWidth={selectedGear === 'cam' ? '4' : '2'}
            />
            <circle cx="110" cy="160" r="24" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="110" cy="160" r="10" fill="#f59e0b" />
            <text x="110" y="155" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
              CAMSHAFT
            </text>
            <text x="110" y="172" textAnchor="middle" fill="#fef08a" fontSize="13" fontWeight="900" fontFamily="monospace">
              {isKubota ? 'Mark [ • • ]' : 'Mark [ 1-1 ]'}
            </text>
            <text x="110" y="186" textAnchor="middle" fill="#cbd5e1" fontSize="8">
              (2x Ratio • တိုက်ရိုက်ထိစပ်)
            </text>
          </g>

          {/* 3. TOP-RIGHT 1ST BALANCER GEAR */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGear('balancer1')}
          >
            <circle
              cx="330"
              cy="80"
              r="38"
              fill="url(#balGrad)"
              stroke={selectedGear === 'balancer1' ? '#bae6fd' : '#38bdf8'}
              strokeWidth={selectedGear === 'balancer1' ? '4' : '2'}
            />
            <circle cx="330" cy="80" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <text x="330" y="77" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
              1ST BALANCER
            </text>
            <text x="330" y="90" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="900" fontFamily="monospace">
              {isKubota ? 'Mark [ 1 / • ]' : 'Mark [ 2 ]'}
            </text>

            <rect x="268" y="105" width="46" height="16" rx="4" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1" />
            <text x="291" y="117" textAnchor="middle" fill="#e0f2fe" fontSize="7" fontWeight="bold">
              အပေါ်ဝိတ်
            </text>
          </g>

          {/* 4. BOTTOM-RIGHT 2ND BALANCER GEAR */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGear('balancer2')}
          >
            <circle
              cx="330"
              cy="240"
              r="38"
              fill="url(#balGrad)"
              stroke={selectedGear === 'balancer2' ? '#bae6fd' : '#38bdf8'}
              strokeWidth={selectedGear === 'balancer2' ? '4' : '2'}
            />
            <circle cx="330" cy="240" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <text x="330" y="237" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
              2ND BALANCER
            </text>
            <text x="330" y="250" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="900" fontFamily="monospace">
              {isKubota ? 'Mark [ 2 / •• ]' : 'Mark [ 2-2 ]'}
            </text>

            <rect x="268" y="195" width="46" height="16" rx="4" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1" />
            <text x="291" y="207" textAnchor="middle" fill="#e0f2fe" fontSize="7" fontWeight="bold">
              အောက်ဝိတ်
            </text>
          </g>

          {/* Banner inside diagram */}
          <rect x="80" y="260" width="180" height="26" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <text x="170" y="277" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">
            ⚡ အိုင်ဒလာဂီယာ မပါရှိ (Direct Mesh Only)
          </text>
        </svg>
      );
    }

    // 2. Combine Harvester Layout (Kubota DC70 / DC105X Turbo OR Yanmar AW70V / AW82V)
    if (diagramKind === 'kubota_harvester' || diagramKind === 'yanmar_harvester') {
      const isKubota = diagramKind === 'kubota_harvester';
      return (
        <svg viewBox="0 0 460 320" className="w-full h-full drop-shadow-2xl">
          <defs>
            <filter id="gearGlowHarvester" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="goldHarvester" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="pumpHarvester" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>

          {/* Connecting Mesh Lines */}
          <line x1="230" y1="160" x2="230" y2="255" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
          <line x1="230" y1="160" x2="120" y2="90" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
          <line x1="230" y1="160" x2="340" y2="90" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3,3" />
          <line x1="230" y1="255" x2="330" y2="255" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />

          {/* 1. CENTER MAIN IDLER GEAR */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGear('idler')}
          >
            <circle
              cx="230"
              cy="160"
              r="54"
              fill="url(#goldHarvester)"
              stroke={selectedGear === 'idler' ? '#fef08a' : '#f59e0b'}
              strokeWidth={selectedGear === 'idler' ? '4' : '2'}
              filter="url(#gearGlowHarvester)"
            />
            <circle cx="230" cy="160" r="22" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="230" cy="160" r="9" fill="#f59e0b" />
            <text x="230" y="154" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
              MAIN IDLER
            </text>
            <text x="230" y="170" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="900" fontFamily="monospace">
              {isKubota ? '1-1 / 2-2 / 3-3' : 'AA / BB / CC'}
            </text>
          </g>

          {/* 2. BOTTOM CRANKSHAFT GEAR */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGear('crank')}
          >
            <circle
              cx="230"
              cy="255"
              r="38"
              fill="#065f46"
              stroke={selectedGear === 'crank' ? '#a7f3d0' : '#10b981'}
              strokeWidth={selectedGear === 'crank' ? '4' : '2'}
            />
            <circle cx="230" cy="255" r="16" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="230" y="252" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
              CRANKSHAFT
            </text>
            <text x="230" y="266" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="900" fontFamily="monospace">
              {isKubota ? 'Mark [ 1 ]' : 'Mark [ A ]'}
            </text>

            {/* Mesh 1 Tag */}
            <rect x="210" y="206" width="40" height="15" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1" />
            <text x="230" y="217" textAnchor="middle" fill="#ecfdf5" fontSize="8" fontWeight="bold">
              {isKubota ? '1 - 1-1' : 'A - AA'}
            </text>
          </g>

          {/* 3. TOP-LEFT CAMSHAFT GEAR */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGear('cam')}
          >
            <circle
              cx="120"
              cy="90"
              r="46"
              fill="#115e59"
              stroke={selectedGear === 'cam' ? '#99f6e4' : '#14b8a6'}
              strokeWidth={selectedGear === 'cam' ? '4' : '2'}
            />
            <circle cx="120" cy="90" r="18" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
            <text x="120" y="87" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
              CAMSHAFT
            </text>
            <text x="120" y="101" textAnchor="middle" fill="#5eead4" fontSize="11" fontWeight="900" fontFamily="monospace">
              {isKubota ? 'Mark [ 2 ]' : 'Mark [ B ]'}
            </text>

            {/* Mesh 2 Tag */}
            <rect x="156" y="112" width="40" height="15" rx="4" fill="#134e4a" stroke="#2dd4bf" strokeWidth="1" />
            <text x="176" y="123" textAnchor="middle" fill="#f0fdfa" fontSize="8" fontWeight="bold">
              {isKubota ? '2 - 2-2' : 'B - BB'}
            </text>
          </g>

          {/* 4. TOP-RIGHT HARVESTER TURBO INJECTION PUMP GEAR */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGear('pump')}
          >
            <circle
              cx="340"
              cy="90"
              r="48"
              fill="url(#pumpHarvester)"
              stroke={selectedGear === 'pump' ? '#fca5a5' : '#ef4444'}
              strokeWidth={selectedGear === 'pump' ? '4' : '2'}
            />
            <circle cx="340" cy="90" r="20" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
            <text x="340" y="84" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
              {isKubota ? 'TURBO PUMP (ANEROID)' : 'MP4 HARVESTER PUMP'}
            </text>
            <text x="340" y="99" textAnchor="middle" fill="#fecaca" fontSize="12" fontWeight="900" fontFamily="monospace">
              {isKubota ? 'Mark [ 3 ]' : 'Mark [ C ]'}
            </text>
            <text x="340" y="112" textAnchor="middle" fill="#fef08a" fontSize="7" fontWeight="bold">
              {isKubota ? '15°-17° BTDC' : '15°-17° BTDC'}
            </text>

            {/* Mesh 3 Tag */}
            <rect x="264" y="112" width="44" height="15" rx="4" fill="#7f1d1d" stroke="#f87171" strokeWidth="1" />
            <text x="286" y="123" textAnchor="middle" fill="#fef2f2" fontSize="8" fontWeight="bold">
              {isKubota ? '3 - 3-3' : 'C - CC'}
            </text>
          </g>

          {/* 5. BOTTOM-RIGHT OIL PUMP / GOVERNOR DRIVE GEAR */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedGear('oil')}
          >
            <circle
              cx="330"
              cy="255"
              r="28"
              fill="#1e293b"
              stroke="#64748b"
              strokeWidth="2"
            />
            <text x="330" y="253" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
              OIL PUMP
            </text>
            <text x="330" y="264" textAnchor="middle" fill="#94a3b8" fontSize="8">
              (Direct Mesh)
            </text>
          </g>

          {/* Callout box for combine harvester */}
          <rect x="20" y="20" width="180" height="24" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
          <text x="110" y="36" textAnchor="middle" fill="#c7d2fe" fontSize="8" fontWeight="bold">
            🌾 စပါးရိတ်ခြွေစက် တာဘိုဒီဇယ် သီးသန့် အလိုင်းမင်း
          </text>
        </svg>
      );
    }

    // 3. Chinese Dump Trucks (4100 / 4102 with Compressor & Dump Pump Gears)
    if (diagramKind === 'chinese_truck') {
      return (
        <svg viewBox="0 0 460 320" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="goldTruck" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="airGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>
          </defs>

          {/* Connections */}
          <line x1="220" y1="160" x2="220" y2="250" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="220" y1="160" x2="110" y2="100" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="220" y1="160" x2="330" y2="100" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="330" y1="100" x2="390" y2="180" stroke="#0284c7" strokeWidth="2" strokeDasharray="3,3" />

          {/* CENTER IDLER */}
          <circle cx="220" cy="160" r="50" fill="url(#goldTruck)" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="220" cy="160" r="20" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
          <text x="220" y="156" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            MAIN IDLER
          </text>
          <text x="220" y="170" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="900" fontFamily="monospace">
            0-0 / 1-1 / 2-2
          </text>

          {/* CRANKSHAFT */}
          <circle cx="220" cy="250" r="38" fill="#065f46" stroke="#10b981" strokeWidth="2" />
          <text x="220" y="248" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">CRANK</text>
          <text x="220" y="260" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="900">Mark [ 0 ]</text>

          {/* CAMSHAFT */}
          <circle cx="110" cy="100" r="44" fill="#115e59" stroke="#14b8a6" strokeWidth="2" />
          <text x="110" y="98" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">CAMSHAFT</text>
          <text x="110" y="110" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="900">Mark [ 1 ]</text>

          {/* INJECTION PUMP */}
          <circle cx="330" cy="100" r="44" fill="#831843" stroke="#f43f5e" strokeWidth="2" />
          <text x="330" y="98" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">INJ PUMP</text>
          <text x="330" y="110" textAnchor="middle" fill="#fda4af" fontSize="10" fontWeight="900">Mark [ 2 ]</text>

          {/* AIR COMPRESSOR GEAR */}
          <circle cx="390" cy="180" r="30" fill="url(#airGrad)" stroke="#38bdf8" strokeWidth="2" />
          <text x="390" y="177" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">AIR COMPRESSOR</text>
          <text x="390" y="188" textAnchor="middle" fill="#bae6fd" fontSize="7">လေကွန်ပရက်ဆာ</text>

          {/* Tag */}
          <rect x="20" y="20" width="190" height="24" rx="6" fill="#451a03" stroke="#d97706" strokeWidth="1" />
          <text x="115" y="36" textAnchor="middle" fill="#fde68a" fontSize="8" fontWeight="bold">
            🚚 တရုတ်ဒန့်ကား (Yunnei 4100 / 4102) ဂီယာစနစ်
          </text>
        </svg>
      );
    }

    // 4. Standard Multi-Cylinder Tractor Layout (Kubota Tractors, Yanmar Tractors, Massey, Ford, John Deere)
    const isMassey = diagramKind === 'massey_perkins';
    const isFord = diagramKind === 'ford_newholland';
    return (
      <svg viewBox="0 0 460 320" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="goldStd" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        <line x1="230" y1="160" x2="230" y2="255" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
        <line x1="230" y1="160" x2="120" y2="90" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
        <line x1="230" y1="160" x2="340" y2="90" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
        <line x1="120" y1="90" x2="50" y2="160" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3,3" />

        {/* 1. CENTER IDLER */}
        <circle cx="230" cy="160" r="52" fill="url(#goldStd)" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="230" cy="160" r="22" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
        <text x="230" y="154" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
          IDLER GEAR
        </text>
        <text x="230" y="170" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="900" fontFamily="monospace">
          {isMassey ? 'SS / CC / DD' : isFord ? '•• / •• / ••' : '1-1 / 2-2 / 3-3'}
        </text>

        {/* 2. CRANKSHAFT */}
        <circle cx="230" cy="255" r="38" fill="#065f46" stroke="#10b981" strokeWidth="2" />
        <text x="230" y="252" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">CRANKSHAFT</text>
        <text x="230" y="266" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="900" fontFamily="monospace">
          {isMassey ? 'Mark [ S ]' : isFord ? 'Mark [ • ]' : 'Mark [ 1 ]'}
        </text>

        {/* 3. CAMSHAFT */}
        <circle cx="120" cy="90" r="46" fill="#115e59" stroke="#14b8a6" strokeWidth="2" />
        <text x="120" y="87" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">CAMSHAFT</text>
        <text x="120" y="101" textAnchor="middle" fill="#5eead4" fontSize="11" fontWeight="900" fontFamily="monospace">
          {isMassey ? 'Mark [ C ]' : isFord ? 'Mark [ • ]' : 'Mark [ 2 ]'}
        </text>

        {/* 4. INJECTION PUMP */}
        <circle cx="340" cy="90" r="46" fill="#075985" stroke="#38bdf8" strokeWidth="2" />
        <text x="340" y="87" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
          {isMassey ? 'CAV DPA PUMP' : isFord ? 'SIMMS PUMP' : 'INJ PUMP'}
        </text>
        <text x="340" y="101" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="900" fontFamily="monospace">
          {isMassey ? 'Mark [ D ]' : isFord ? 'Mark [ • ]' : 'Mark [ 3 ]'}
        </text>

        {/* 5. TRACTOR HYDRAULIC PUMP DRIVE */}
        <circle cx="50" cy="160" r="26" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" />
        <text x="50" y="157" textAnchor="middle" fill="#ffffff" fontSize="6" fontWeight="bold">HYDRAULIC</text>
        <text x="50" y="167" textAnchor="middle" fill="#2dd4bf" fontSize="7">ဟိုက်ဒရောလစ်</text>

        <rect x="20" y="20" width="180" height="24" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
        <text x="110" y="36" textAnchor="middle" fill="#d1fae5" fontSize="8" fontWeight="bold">
          🚜 လေးဘီးထွန်စက်ကြီးများ တိုင်မင်ဂီယာ စနစ်
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Cog className="w-5 h-5 animate-spin-slow" />
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase">
                  {timingInfo.categoryBadge}
                </span>
              </div>
              <h4 className="font-bold text-sm sm:text-base text-slate-100 flex items-center gap-2">
                <span>{timingInfo.burmeseTitle}</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {timingInfo.subtitle}
              </p>
            </div>
          </div>

          {/* Authentic Brand Badge */}
          {renderBrandBadge()}
        </div>

        {/* Mechanic Clarification for Kubota: Why do Kubota L-Series Tractor & DC-Series Harvester share identical timing marks? */}
        {isKubota && engine.category !== 'single_cylinder' && (
          <div className="w-full mb-3 p-3.5 rounded-xl bg-gradient-to-r from-blue-950/70 via-slate-900 to-emerald-950/70 border border-blue-500/40 shadow-lg">
            <div className="flex items-start gap-2.5">
              <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </span>
              <div className="text-xs space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h5 className="font-bold text-sky-200 flex items-center gap-1.5">
                    <span>💡 အင်ဂျင်နှင့် တိုင်မင်ဂီယာ ကိုက်ညီမှု စစ်ဆေးချက်- ထွန်စက် (L-Series) နှင့် ရိတ်ခြွေစက် (DC-Series) အဘယ်ကြောင့် မာကင်ပုံ တူညီနေသနည်း?</span>
                  </h5>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-200 border border-blue-600 font-mono font-bold">
                    Kubota V2403 Family
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  အဖြေမှာ <strong className="text-emerald-300">၁၀၀% ကိုက်ညီပြီး စက်ရုံထုတ် မူရင်းဒီဇိုင်းအရ တူညီနေခြင်းသည် လုံးဝမှန်ကန်ပါသည်</strong>။ အဘယ်ကြောင့်ဆိုသော် ကူဘိုတာ ထွန်စက်ကြီးများ (<strong className="text-emerald-300">L4508 / L5018</strong>) နှင့် စပါးရိတ်ခြွေစက်များ (<strong className="text-emerald-300">DC60 / DC70 / DC70G</strong>) နှစ်မျိုးလုံးသည် တူညီသော <strong className="text-amber-300">Kubota 03/03-M Series (V2203 / V2403)</strong> အင်ဂျင်အုပ်စု ဘလောက်တစ်ခုတည်းကို သုံးထားသောကြောင့် စက်ရုံထုတ် ဂီယာမာကင်များ (<strong className="text-emerald-300">1, 1-1, 2, 2-2, 3, 3-3</strong>) သည် လုံးဝတစ်ထပ်တည်း ဖြစ်နေခြင်း ဖြစ်ပါသည်။
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-amber-400 font-bold block mb-0.5">🚜 ထွန်စက် (L-Series Tractor):</span>
                    <span className="text-slate-400 leading-normal block">
                      အင်ဂျင် V2403-DI (ရိုးရိုးလေစုပ်) • ဆီဖြန်းချိန် <strong>16°~18° BTDC</strong> • နောက်ယက်ထယ် မ ရန်အတွက် ဟိုက်ဒရောလစ်ပန့် မောင်းနှင်သည့် ဂီယာပါရှိသည်။
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-0.5">🌾 စပါးရိတ်ခြွေစက် (DC-Series Harvester):</span>
                    <span className="text-slate-400 leading-normal block">
                      အင်ဂျင် V2403-M-DI-TE (တာဘို) • ဆီဖြန်းချိန် <strong>15°~17° BTDC</strong> • တာဘိုလေဖိအားနှင့် အချိုးကျဆီဖြည့်သော Boost Compensator ဆီပန့်ဖြစ်ပါသည်။
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mechanic Clarification for Yanmar: Why do Yanmar EF-Series Tractor & AW-Series Harvester share identical timing marks? */}
        {isYanmar && engine.category !== 'single_cylinder' && (
          <div className="w-full mb-3 p-3.5 rounded-xl bg-gradient-to-r from-red-950/70 via-slate-900 to-amber-950/70 border border-red-500/40 shadow-lg">
            <div className="flex items-start gap-2.5">
              <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </span>
              <div className="text-xs space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h5 className="font-bold text-amber-200 flex items-center gap-1.5">
                    <span>💡 ယန်မာ အင်ဂျင်နှင့် တိုင်မင်ဂီယာ ကိုက်ညီမှု စစ်ဆေးချက်- ထွန်စက် (EF-Series) နှင့် ရိတ်ခြွေစက် (AW-Series) မာကင်ပုံ တူညီနေခြင်း</span>
                  </h5>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-900/80 text-red-200 border border-red-600 font-mono font-bold">
                    Yanmar TNV Engine Family
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  ယန်မာ ထွန်စက်ကြီးများ (<strong className="text-amber-300">EF393T / EF494T</strong>) နှင့် စပါးရိတ်ခြွေစက်များ (<strong className="text-red-300">AW70V / AW82V</strong>) တို့သည် ကမ္ဘာကျော် <strong className="text-red-400">Yanmar TNV Series (3TNV88 / 4TNV88 / 4TNV98)</strong> မော်ဂျူလာ ဒီဇိုင်းကို အသုံးပြုထားသောကြောင့် စက်ရုံထုတ် တိုင်မင်ဂီယာအိမ်နှင့် မာကင်စနစ် (<strong className="text-emerald-300">A - AA, B - BB, C - CC</strong>) သည် <strong className="text-emerald-300">၁၀၀% တစ်ထပ်တည်း ကိုက်ညီနေခြင်းဖြစ်ပါသည်</strong>။
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-amber-400 font-bold block mb-0.5">🚜 ယန်မာ ထွန်စက် (EF-Series Tractor):</span>
                    <span className="text-slate-400 leading-normal block">
                      အင်ဂျင် 4TNV88-B • ဆီဖြန်းချိန် <strong>15°~17° BTDC</strong> • ထွန်စက်နောက်ချိတ်ဆွဲ မ ရန်အတွက် အရှေ့ဘက် ဟိုက်ဒရောလစ်ပန့် မောင်းနှင်သည့် ဂီယာပါရှိသည်။
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-red-400 font-bold block mb-0.5">🌾 ယန်မာ စပါးရိတ်ခြွေစက် (AW-Series Harvester):</span>
                    <span className="text-slate-400 leading-normal block">
                      အင်ဂျင် 4TNV98-E Heavy Duty • ဆီဖြန်းချိန် <strong>15°~17° BTDC</strong> • Yanmar MP4 High Pressure Distributor Injection Pump နှင့် ရိတ်ခြွေစက်ဝန်အပြည့်အတွက် အထူးဒီဇိုင်းဖြစ်ပါသည်။
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mechanic Clarification for Massey Ferguson: Why do MF 240 / 135 and MF 385 / 375 share Perkins S-SS / C-CC / D-DD timing marks? */}
        {isMassey && (
          <div className="w-full mb-3 p-3.5 rounded-xl bg-gradient-to-r from-red-950/80 via-slate-900 to-amber-950/70 border border-red-500/40 shadow-lg">
            <div className="flex items-start gap-2.5">
              <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </span>
              <div className="text-xs space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h5 className="font-bold text-amber-200 flex items-center gap-1.5">
                    <span>💡 မက်ဆီဖာဂူဆန် / Perkins အင်ဂျင်နှင့် တိုင်မင်ဂီယာ ကိုက်ညီမှု- MF 240 (3-ဆလင်ဒါ) နှင့် MF 385 (4-ဆလင်ဒါ) မာကင်စနစ်</span>
                  </h5>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-900/80 text-red-200 border border-red-600 font-mono font-bold">
                    Perkins Diesel Engine Family
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  မက်ဆီဖာဂူဆန် ထွန်စက်ကြီးများ (<strong className="text-red-400">MF 135 / MF 240</strong> တွင် Perkins AD3.152 အင်ဂျင် နှင့် <strong className="text-amber-400">MF 385 / MF 375 / MF 290</strong> တွင် Perkins 4.248 / 4.236 အင်ဂျင်) တို့သည် ကမ္ဘာကျော် <strong className="text-emerald-300">Perkins Timing Train (S, C, D)</strong> အက္ခရာစနစ်ကို အသုံးပြုထားသောကြောင့် အိုင်ဒလာဂီယာနှင့် Crank, Cam, CAV DPA ပန့် တိုင်မင်မာ့ခ်များ (<strong className="text-emerald-300">S-SS, C-CC, D-DD</strong>) သည် <strong className="text-emerald-300">၁၀၀% တူညီကိုက်ညီပါသည်</strong>။
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-red-400 font-bold block mb-0.5">🚜 MF 240 / MF 135 (Perkins AD3.152):</span>
                    <span className="text-slate-400 leading-normal block">
                      ၃-ဆလင်ဒါ ရိုးရိုးလေစုပ် • ဆီဖြန်းချိန် <strong>24° BTDC</strong> (သို့ 18°) • အိုင်ဒလာ hub bolt ကို <strong>65 Nm (48 Ft-lb)</strong> ဆွဲရပါမည်။
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-amber-400 font-bold block mb-0.5">🚜 MF 385 / MF 375 (Perkins 4.248):</span>
                    <span className="text-slate-400 leading-normal block">
                      ၄-ဆလင်ဒါ စွမ်းအားမြင့် • အောက်ခြေတွင် <strong>Engine Balancer Unit</strong> ပါဝင်ပြီး ဝိတ်တုံး drive gear dots (B) ကို ခရိုင်းရှပ်ဂီယာနှင့် ကွက်တိတိုက်ရပါမည်။
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mechanic Clarification for John Deere: 5045D / 5050D / 5310 PowerTech 3029 Gear Train */}
        {isJohnDeere && (
          <div className="w-full mb-3 p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-amber-950/70 border border-emerald-500/40 shadow-lg">
            <div className="flex items-start gap-2.5">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-emerald-300" />
              </span>
              <div className="text-xs space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h5 className="font-bold text-emerald-200 flex items-center gap-1.5">
                    <span>💡 ဂျွန်ဒီးယား (John Deere 5045D / 5050D / 5310) PowerTech 3029 အင်ဂျင်နှင့် တိုင်မင်ဂီယာ ကိုက်ညီမှု စစ်ဆေးချက်</span>
                  </h5>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-600 font-mono font-bold">
                    PowerTech 3029D / 3029T (2.9L)
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  မြန်မာပြည်တွင် အသုံးများသော <strong className="text-emerald-300">John Deere 5045D (45HP), 5050D (50HP), 5310 (55HP)</strong> ထွန်စက်ကြီးများတွင် တပ်ဆင်ထားသည့် <strong className="text-amber-300">PowerTech 3029 3-Cylinder Turbo / Natural</strong> အင်ဂျင်သည် ရှေ့ဘက်ဗဟို အိုင်ဒလာဂီယာ (Upper Idler Gear) ကို ကြားခံ၍ ခရိုင်းရှပ်ဂီယာ (Mark 1)၊ ကင်းရှပ်ဂီယာ (Mark 2)၊ Stanadyne / Lucas In-line ဆီပန့်ဂီယာ (Mark 3) နှင့် ဟိုက်ဒရောလစ်ပန့်ဂီယာ (Hydraulic Pump Drive Gear) တို့ကို <strong className="text-yellow-300">Punch Marks (1, 2, 3)</strong> စနစ်ဖြင့် အတိအကျ မောင်းနှင်ပါသည်။
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-0.5">⚙️ ဂီယာသွား မာကင် တိုက်ဆိုင်နည်း:</span>
                    <span className="text-slate-400 leading-normal block">
                      ခရိုင်းရှပ် (Mark 1) ကို အိုင်ဒလာ (Mark 1) နှင့်လည်းကောင်း၊ ကင်းရှပ် (Mark 2) ကို အိုင်ဒလာ (Mark 2) နှင့်လည်းကောင်း၊ ဆီပန့်ဂီယာ (Mark 3) ကို အိုင်ဒလာ (Mark 3) နှင့်လည်းကောင်း တိုက်ရပါမည်။
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-amber-400 font-bold block mb-0.5">🔧 အဓိက ဆွဲပေါင် & Backlash စံနှုန်းများ:</span>
                    <span className="text-slate-400 leading-normal block">
                      Idler Gear Retaining Bolt: <strong>60 Nm (44 Ft-lb)</strong> • Camshaft Thrust Plate: <strong>25 Nm</strong> • Gear Backlash ကစားချက်: <strong>0.08 - 0.22 mm</strong> (Limit 0.30 mm)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mechanic Clarification for Sonalika: Sonalika DI 750 / RX 50 Gear Train */}
        {isSonalika && (
          <div className="w-full mb-3 p-3.5 rounded-xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-amber-950/70 border border-blue-500/40 shadow-lg">
            <div className="flex items-start gap-2.5">
              <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </span>
              <div className="text-xs space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h5 className="font-bold text-sky-200 flex items-center gap-1.5">
                    <span>💡 ဆိုနာလီကာ (Sonalika DI 750 / RX 50 / Tiger) အင်ဂျင်နှင့် တိုင်မင်ဂီယာ ကိုက်ညီမှု စစ်ဆေးချက်</span>
                  </h5>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-200 border border-blue-600 font-mono font-bold">
                    Sonalika 4087cc Heavy Diesel
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  ဆိုနာလီကာ ထွန်စက်ကြီးများ (<strong className="text-sky-300">DI 750 III / RX 50 / Tiger 60</strong>) တွင် အသုံးပြုထားသော 4-Cylinder 4087cc Heavy Duty အင်ဂျင်သည် ခရိုင်းရှပ်ဂီယာ (18 သွား) မှ အလယ်အိုင်ဒလာဂီယာဆင့်၍ ကင်းရှပ် (36 သွား) နှင့် ဆီပန့် (36 သွား) ကို <strong className="text-emerald-300">1:2 အချိုးကျ မောင်းနှင်သော အစက်အမှတ် (Single & Double Dots)</strong> စနစ်ဖြင့် အတိအကျ စီမံထားပါသည်။
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-sky-400 font-bold block mb-0.5">⚙️ ဂီယာသွား မာကင်စနစ်:</span>
                    <span className="text-slate-400 leading-normal block">
                      Crankshaft Pinion နှင့် Idler အကြား <strong>Single Dot (•)</strong> တိုက်ဆိုင်ပြီး၊ Idler မှ Camshaft နှင့် FIP ဆီပန့်ဂီယာများသို့ <strong>Double Dots (••)</strong> တိုက်ဆိုင်ရပါမည်။
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-amber-400 font-bold block mb-0.5">🔧 အဓိက ဆွဲပေါင်စံနှုန်းများ:</span>
                    <span className="text-slate-400 leading-normal block">
                      Crankshaft Retaining Bolt: <strong>200 Nm</strong> • Camshaft Nut: <strong>120 Nm</strong> • FIP Nut: <strong>80 Nm</strong> • Backlash: <strong>0.08~0.18 mm</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mechanic Clarification for New Holland & Ford: TT4.75 / TT55 & Ford 5000/6610 Gear Train */}
        {isNewHolland && (
          <div className="w-full mb-3 p-3.5 rounded-xl bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/70 border border-blue-500/40 shadow-lg">
            <div className="flex items-start gap-2.5">
              <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </span>
              <div className="text-xs space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h5 className="font-bold text-sky-200 flex items-center gap-1.5">
                    <span>💡 နယူးဟော်လန် (New Holland TT4.75 / TT55 & Ford) အင်ဂျင်နှင့် တိုင်မင်ဂီယာ ကိုက်ညီမှု စစ်ဆေးချက်</span>
                  </h5>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-200 border border-blue-600 font-mono font-bold">
                    CNH / Iveco 8000 & Ford Diesel
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  နယူးဟော်လန် ထွန်စက်ကြီးများ (<strong className="text-sky-300">New Holland TT4.75 / TT55</strong> တွင် Iveco 8045.25 / 8035 Turbo အင်ဂျင် နှင့် <strong className="text-blue-300">Ford 5000 / Ford 6610</strong> တွင် Ford 256/268 CID အင်ဂျင်) တို့သည် ခရိုင်းရှပ်ဂီယာ (Crankshaft Pinion) မှ အလယ်ဗဟိုအိုင်ဒလာဂီယာဆင့်၍ ကင်းရှပ်ဂီယာ (Camshaft) နှင့် ဘော့ရှ် VE / Simms ဆီပန့်ဂီယာ (Injection Pump Drive) တို့ကို <strong className="text-emerald-300">တိကျသော စက်ရုံထုတ် တိုင်မင်မာ့ခ် (Timing Punch Marks • / ••)</strong> စနစ်ဖြင့် မောင်းနှင်ပါသည်။
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-sky-400 font-bold block mb-0.5">⚙️ New Holland TT4.75 / TT55 (Iveco Engine):</span>
                    <span className="text-slate-400 leading-normal block">
                      Bosch VE Rotary ဆီပန့်ဒရိုက်ဗ်ကို <strong>TDC Cyl #1 Timing Lock Pin</strong> ဖြင့် lock ချပြီး အိုင်ဒလာဂီယာနှင့် punch marks များ တိုက်ဆိုင်တပ်ဆင်ရမည်။ Backlash ကစားချက် <strong>0.10 - 0.20 mm</strong> စစ်ဆေးပါ။
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-amber-400 font-bold block mb-0.5">🚜 Ford 5000 / Ford 6610 (Ford Heavy Diesel):</span>
                    <span className="text-slate-400 leading-normal block">
                      ခရိုင်းရှပ်ဂီယာ (Single Dot •) ကို အိုင်ဒလာဂီယာ (Double Dots ••) ကြား တိုက်ဆိုင်ပြီး၊ Simms Minimec In-line ဆီပန့် drive gear မာ့ခ်နှင့် ကင်းရှပ်မာ့ခ်များ တိကျစွာတိုက်ဆိုင်ရပါမည်။
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mechanic Clarification for YTO & Lovol: LR4108 / Lovol 1004 / Xinchai 498 Gear Train */}
        {isChineseTractor && (
          <div className="w-full mb-3 p-3.5 rounded-xl bg-gradient-to-r from-red-950/90 via-slate-900 to-amber-950/70 border border-red-500/40 shadow-lg">
            <div className="flex items-start gap-2.5">
              <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </span>
              <div className="text-xs space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h5 className="font-bold text-amber-200 flex items-center gap-1.5">
                    <span>💡 တရုတ်ထုတ် ထွန်စက်ကြီးများ (YTO အရှေ့နီ & Lovol ဖိုတွန်) အင်ဂျင်နှင့် တိုင်မင်ဂီယာ ကိုက်ညီမှု စစ်ဆေးချက်</span>
                  </h5>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-900/80 text-amber-200 border border-red-600 font-mono font-bold">
                    YTO DFH LR4108 & Lovol 1004
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  မြန်မာပြည်တွင် အသုံးအများဆုံး တရုတ်ထွန်စက်ကြီးများဖြစ်သော <strong className="text-red-300">YTO (DFH-X804/X904/1004)</strong> တွင် Ricardo အခြေခံ <strong className="text-amber-300">LR4108 / LR4M5</strong> အင်ဂျင် နှင့် <strong className="text-sky-300">Lovol (TD824/TD904/TB504)</strong> တွင် <strong className="text-cyan-300">Lovol-Perkins 1004 / Xinchai A498</strong> အင်ဂျင်တို့သည် ၄ လုံးတွဲ ရှေ့တိုင်မင်ဂီယာစနစ်ကို စက်ရုံထုတ် ဂဏန်း/အမှတ်အသားများဖြင့် တိကျစွာ မောင်းနှင်ပါသည်။
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-red-400 font-bold block mb-0.5">🇨🇳 YTO အရှေ့နီ LR4108 တိုင်မင်စနစ်:</span>
                    <span className="text-slate-400 leading-normal block">
                      ခရိုင်းဂီယာ (0)၊ ကင်းရှပ်ဂီယာ (00)၊ BH4PM ဆီပန့်ဂီယာ (000) တို့ကို အလယ်အိုင်ဒလာဂီယာ၏ 0, 00, 000 မာကင်များနှင့် တိုက်ရမည်။ Backlash ကစားချက် <strong>0.10 - 0.25 mm</strong> ထားပါ။
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-sky-400 font-bold block mb-0.5">🚜 Lovol ဖိုတွန် (Perkins/Xinchai စနစ်):</span>
                    <span className="text-slate-400 leading-normal block">
                      Crankshaft Gear (1)၊ Camshaft Gear (2)၊ Bosch/Weifu Fuel Pump Gear (3) အမှတ်များကို အလယ်အိုင်ဒလာဂီယာနှင့် ကွက်တိကျအောင် တပ်ဆင်ရပါမည်။
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mechanic Clarification for Chinese Dump Trucks: Weichai WP10/12, Cummins 6BT, Yuchai YC6L, Yunnei 4100 */}
        {engine.brand === 'chinese_truck' && (
          <div className="w-full mb-3 p-3.5 rounded-xl bg-gradient-to-r from-amber-950/90 via-slate-900 to-red-950/70 border border-amber-500/40 shadow-lg">
            <div className="flex items-start gap-2.5">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </span>
              <div className="text-xs space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h5 className="font-bold text-amber-200 flex items-center gap-1.5">
                    <span>💡 တရုတ်ဒန့်ကား & ကုန်တင်ကားကြီးများ (၁၀ ဘီး၊ ၁၂ ဘီး၊ ၆ ဘီး) တိုင်မင်ဂီယာ စက်ရုံထုတ် စံနှုန်း စစ်ဆေးချက်</span>
                  </h5>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-900/80 text-amber-200 border border-amber-600 font-mono font-bold">
                    {isWeichai ? 'Weichai WP10/WP12 Heavy' : isCummins ? 'Cummins 6BT/6CT Dongfeng' : isYuchai ? 'Yuchai YC6L/YC6M Heavy' : 'Yunnei YN4100/4102 Series'}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  မြန်မာနိုင်ငံတွင် ပြေးဆွဲနေသော တရုတ်ဒန့်ကားကြီးများ (<strong className="text-amber-300">Howo 371/380, Shacman F3000, Dongfeng, FAW, Forland</strong>) တွင် ကားနာမည် ကွဲပြားသော်လည်း အတွင်းပိုင်း အင်ဂျင်မိသားစုကြီး (၄) ခုသာ အဓိက သုံးထားပါသည်။ ထို့ကြောင့် အင်ဂျင်အုပ်စုအလိုက် စက်ရုံထုတ် ဂီယာမာကင် (Timing Marks) များသည် <strong className="text-emerald-300">၁၀၀% တူညီကိုက်ညီပြီး တိကျသော စံချိန်စံညွှန်းအတိုင်း</strong> အောက်ပါအတိုင်း တည်ဆောက်ထားပါသည်:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-red-400 font-bold block mb-0.5">🚛 Weichai (ဝေချိုင်း WP10 / WP12 / WD615 - ၁၀/၁၂ ဘီး):</span>
                    <span className="text-slate-400 leading-normal block">
                      အလယ်ပင်မ အိုင်ဒလာဂီယာ (90T) တွင် <strong>0, 1, 2</strong> မာကင်များ ပါရှိပြီး ခရိုင်း (0), ကင်းရှပ် (1), ဆီပန့် (2) နှင့် တိုက်ရပါမည်။ Idler bolts: <strong>160-180 N·m</strong> • Backlash: <strong>0.10 - 0.25 mm</strong>
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-sky-400 font-bold block mb-0.5">🚚 Yunnei & 4JB1 (ယွန်းနေး 4100 / 4102 - ၆ ဘီးဒန့်ကား):</span>
                    <span className="text-slate-400 leading-normal block">
                      အလယ်အိုင်ဒလာဂီယာတွင် <strong>00, 11, 22</strong> မာကင်များ ပါရှိပြီး ခရိုင်း (0), ကင်းရှပ် (1), In-line ဆီပန့် (2) တိုက်ရမည်။ လေကွန်ပရက်ဆာနှင့် ဒန့်ဟိုက်ဒရောလစ်ပန့်ဂီယာများ ပါဝင်ပါသည်။
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-amber-400 font-bold block mb-0.5">⚡ Cummins (ကမင် 6BT 5.9 / 6CT 8.3 - ဒေါင်းဖန်း):</span>
                    <span className="text-slate-400 leading-normal block">
                      ကမ်ရှပ်အနောက်ရှိ <strong>Timing Pin Lock</strong> ဖြင့် TDC ချိန်ပြီး Crank dot (•) နှင့် Cam dots (••) တိုက်ဆိုင်ရမည်။ Bosch P7100 ပန့်နပ်ဆွဲပေါင်: <strong>170 N·m</strong> (မောင်းနှင်မီ Pin ပြန်ဖြုတ်ပါ)။
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-blue-400 font-bold block mb-0.5">🛠️ Yuchai (ယုချိုင်း YC6L / YC6M - အကြီးစား ဒန့်ကား):</span>
                    <span className="text-slate-400 leading-normal block">
                      Crankshaft Gear (1) နှင့် Camshaft Gear (3) အကြား အလယ်အိုင်ဒလာ (2) ၏ <strong>Detail A & B Dots</strong> ကို တိကျစွာတိုက်ဆိုင်ရပါမည်။ Idler bolt: <strong>110-125 N·m</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Factory Manual & Diagram Switcher (When engine has factory workshop manual) */}
        {hasFactoryManual && (
          <div className={`w-full flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/90 border mb-3 shadow-md ${
            isKubota || isJohnDeere
              ? 'border-emerald-500/40'
              : isYanmar || isMassey || isYto
              ? 'border-red-500/40'
              : isLovol
              ? 'border-sky-500/40'
              : 'border-blue-500/40'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                isKubota || isJohnDeere
                  ? 'bg-emerald-400'
                  : isYanmar || isMassey || isYto
                  ? 'bg-red-400'
                  : isLovol
                  ? 'bg-sky-400'
                  : 'bg-blue-400'
              }`}></span>
              <span className={`text-xs font-bold ${
                isKubota || isJohnDeere
                  ? 'text-emerald-300'
                  : isYanmar || isMassey || isYto
                  ? 'text-red-300'
                  : isLovol
                  ? 'text-sky-300'
                  : 'text-blue-300'
              }`}>
                {isKubota
                  ? 'ကူဘိုတာ စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ် မာကင်ပြပုံများ (Genuine Kubota WSM):'
                  : isYanmar
                  ? 'ယန်မာ စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ် မာကင်ပြပုံများ (Genuine Yanmar Service Manual):'
                  : isMassey
                  ? 'မက်ဆီဖာဂူဆန် / Perkins စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ် မာကင်ပြပုံများ (Genuine MF/Perkins Manual):'
                  : isJohnDeere
                  ? 'ဂျွန်ဒီးယား စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ် မာကင်ပြပုံများ (Genuine John Deere CTM Manual):'
                  : isNewHolland
                  ? 'နယူးဟော်လန် / Ford စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ် မာကင်ပြပုံများ (Genuine New Holland Manual):'
                  : isYto
                  ? 'YTO (အရှေ့နီ DFH) စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ် မာကင်ပြပုံများ (Genuine YTO DFH Manual):'
                  : isLovol
                  ? 'Lovol (ဖိုတွန် လိုဗော) စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ် မာကင်ပြပုံများ (Genuine Lovol Service Manual):'
                  : 'ဆိုနာလီကာ စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ် မာကင်ပြပုံများ (Genuine Sonalika ITL Manual):'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setViewMode('factory_manual')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'factory_manual'
                    ? isKubota || isJohnDeere
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950 border border-emerald-300'
                      : isYanmar || isYto
                      ? 'bg-red-600 text-white shadow-md shadow-red-950 border border-red-300'
                      : isMassey
                      ? 'bg-red-700 text-white shadow-md shadow-red-950 border border-red-300'
                      : isLovol
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-950 border border-sky-300'
                      : 'bg-blue-600 text-white shadow-md shadow-blue-950 border border-blue-300'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                <BookOpen className={`w-3.5 h-3.5 ${
                  isKubota || isJohnDeere ? 'text-emerald-200' : isYanmar || isMassey || isYto ? 'text-red-200' : isLovol ? 'text-sky-200' : 'text-blue-200'
                }`} />
                <span>📖 စက်ရုံထုတ် မူရင်းစာအုပ်ပုံ</span>
              </button>

              {((isKubota && engine.category !== 'single_cylinder') ||
                (isYanmar && engine.category !== 'single_cylinder') ||
                isMassey ||
                isJohnDeere ||
                isNewHolland ||
                isYto ||
                isLovol ||
                isWeichai ||
                isCummins ||
                isYuchai ||
                isYunneiTruck) && (
                <button
                  type="button"
                  onClick={() => setViewMode('blueprint')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'blueprint'
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-950 border border-sky-300'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-sky-200" />
                  <span>📐 အင်ဂျင်နီယာ ပုံကြမ်း</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setViewMode('interactive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'interactive'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-950 border border-amber-300'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                <Cog className="w-3.5 h-3.5 text-amber-200" />
                <span>⚙️ ဒိုင်ယာဂရမ်</span>
              </button>
            </div>
          </div>
        )}

        {/* Visual Interactive Timing Gear Diagram / Factory Manual View */}
        <div className="bg-slate-950 rounded-2xl p-3 sm:p-5 border border-slate-800 flex flex-col items-center justify-center my-2 relative overflow-hidden shadow-inner">
          <div className="w-full flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-2 px-1">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Cog className="w-4 h-4" />
              <span>
                {hasFactoryManual && viewMode === 'factory_manual'
                  ? isKubota
                    ? 'ကူဘိုတာ စက်ရုံထုတ် အလုပ်ရုံလက်စွဲစာအုပ်ပါ မာကင်အစစ်ပြပုံ (Kubota Factory Workshop Manual)'
                    : isYanmar
                    ? 'ယန်မာ စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ မာကင်အစစ်ပြပုံ (Yanmar Factory Service Manual)'
                    : isMassey
                    ? 'မက်ဆီဖာဂူဆန် / Perkins စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ မာကင်အစစ်ပြပုံ (Perkins Workshop Manual)'
                    : isJohnDeere
                    ? 'ဂျွန်ဒီးယား စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ မာကင်အစစ်ပြပုံ (John Deere CTM Workshop Manual)'
                    : isNewHolland
                    ? 'နယူးဟော်လန် / Ford စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ မာကင်အစစ်ပြပုံ (New Holland Service Manual)'
                    : isYto
                    ? 'YTO (အရှေ့နီ DFH) စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ မာကင်အစစ်ပြပုံ (YTO LR4108 Service Manual)'
                    : isLovol
                    ? 'Lovol (ဖိုတွန် လိုဗော) စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ မာကင်အစစ်ပြပုံ (Lovol Workshop Manual)'
                    : isWeichai
                    ? 'Weichai (ဝေချိုင်း WP10 / WP12) စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ မာကင်အစစ်ပြပုံ (Weichai Workshop Manual)'
                    : isCummins
                    ? 'Cummins (ကမင် 6BT / 6CT) စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ မာကင်အစစ်ပြပုံ (Cummins Service Manual)'
                    : isYuchai
                    ? 'Yuchai (ယုချိုင်း YC6L / YC6M) စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ မာကင်အစစ်ပြပုံ (Yuchai Service Manual)'
                    : isYunneiTruck
                    ? 'Yunnei (ယွန်းနေး 4100 / 4102) စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ မာကင်အစစ်ပြပုံ (Yunnei Workshop Manual)'
                    : 'ဆိုနာလီကာ စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ မာကင်အစစ်ပြပုံ (Sonalika Workshop Manual)'
                  : hasFactoryManual && viewMode === 'blueprint'
                  ? isKubota
                    ? 'ကူဘိုတာ နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Kubota Technical Blueprint Schematic)'
                    : isYanmar
                    ? 'ယန်မာ နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Yanmar Technical Blueprint Schematic)'
                    : isMassey
                    ? 'မက်ဆီဖာဂူဆန် / Perkins နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Perkins Technical Blueprint Schematic)'
                    : isJohnDeere
                    ? 'ဂျွန်ဒီးယား နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (John Deere PowerTech Blueprint Schematic)'
                    : isNewHolland
                    ? 'နယူးဟော်လန် နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (New Holland TT Blueprint Schematic)'
                    : isYto || isLovol
                    ? 'YTO Dongfanghong နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (YTO DFH LR4108 Blueprint)'
                    : isWeichai
                    ? 'Weichai WP10 / WD615 နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Weichai Power CAD Blueprint)'
                    : isCummins
                    ? 'Cummins 6BT / 6CT နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Cummins Diesel CAD Blueprint)'
                    : isYuchai
                    ? 'Yuchai YC6L / YC6M နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Yuchai Heavy CAD Blueprint)'
                    : 'Yunnei YN4100 / YN4102 နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Yunnei Power Blueprint)'
                  : 'ဂီယာသွား တိုက်ဆိုင်ပုံ သရုပ်ပြပုံစံ (Engine Gear Alignment Diagram)'}
              </span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-mono font-bold">
              BTDC Timing: {timingInfo.flywheelTiming}
            </span>
          </div>

          {/* 1. FACTORY WORKSHOP MANUAL IMAGE DISPLAY (Kubota, Yanmar, Massey Ferguson, Sonalika, New Holland, YTO, Lovol, John Deere, Weichai, Cummins, Yuchai, Yunnei) */}
          {hasFactoryManual && viewMode === 'factory_manual' && (
            <div className="w-full flex flex-col items-center max-w-2xl">
              {/* Header Bar */}
              <div className="w-full flex items-center justify-between bg-slate-900 px-3.5 py-2.5 rounded-t-xl border border-b-0 border-slate-700/80">
                <div className="flex items-center gap-2">
                  <BookOpen className={`w-4 h-4 ${
                    isKubota || isJohnDeere ? 'text-emerald-400' : isYanmar || isMassey || isYto || isWeichai || isCummins ? 'text-red-400' : isLovol || isYuchai ? 'text-sky-400' : 'text-blue-400'
                  }`} />
                  <span className="text-xs font-bold text-slate-100">
                    {isKubota
                      ? engine.category === 'single_cylinder'
                        ? 'KUBOTA WORKSHOP MANUAL • RT / ZT SERIES TIMING ALIGNMENT'
                        : 'KUBOTA WORKSHOP MANUAL SECTION 2 • GEAR TRAIN TIMING MARKS'
                      : isYanmar
                      ? engine.category === 'single_cylinder'
                        ? 'YANMAR SERVICE MANUAL • TF120 / TF140 / TF160 TIMING GEAR ALIGNMENT'
                        : 'YANMAR SERVICE MANUAL SECTION 3 • 4TNV88 / 4TNV98 TIMING GEAR TRAIN'
                      : isMassey
                      ? 'MASSEY FERGUSON / PERKINS MANUAL • TIMING GEAR TRAIN (AD3.152 & 4.236)'
                      : isJohnDeere
                      ? 'JOHN DEERE COMPONENT TECHNICAL MANUAL • POWERTECH 3029 TIMING GEARS'
                      : isNewHolland
                      ? 'NEW HOLLAND & FORD SERVICE MANUAL • TIMING GEAR TRAIN (TT / IVECO & FORD DIESEL)'
                      : isYto
                      ? 'YTO DONGFANGHONG MANUAL • LR4108 / LR4M5 TIMING GEAR TRAIN SCHEMATIC'
                      : isLovol
                      ? 'LOVOL FOTON WORKSHOP MANUAL • TD824 / TD904 & XINCHAI A498 TIMING GEAR TRAIN'
                      : isWeichai
                      ? 'WEICHAI POWER SERVICE MANUAL • WP10 / WD615 GEAR TRAIN TIMING MARKS'
                      : isCummins
                      ? 'CUMMINS DIESEL SERVICE MANUAL • 6BT 5.9 / 6CT 8.3 GEAR TRAIN ALIGNMENT'
                      : isYuchai
                      ? 'YUCHAI POWER SERVICE MANUAL • YC6L / YC6M GEAR TRAIN SCHEMATIC'
                      : isYunneiTruck
                      ? 'YUNNEI POWER SERVICE MANUAL • YN4100 / YN4102 GEAR TRAIN MARKS'
                      : 'SONALIKA ITL SERVICE MANUAL • DI 750 / RX 50 TIMING GEAR TRAIN'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalImg(factoryManualImgSrc);
                    setActiveModalTitle(
                      isKubota
                        ? engine.category === 'single_cylinder'
                          ? 'Kubota RT / ZT စက်ရုံထုတ် အလုပ်ရုံလက်စွဲစာအုပ်ပါ တိုင်မင်မာကင်အစစ်ပုံ (Factory Manual)'
                          : 'Kubota စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory WSM)'
                        : isYanmar
                        ? engine.category === 'single_cylinder'
                          ? 'Yanmar TF120 / TF140 / TF160 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ တိုင်မင်မာကင်အစစ်ပုံ (Factory Manual)'
                          : 'Yanmar 4TNV88 / 4TNV98 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Service Manual)'
                        : isMassey
                        ? 'Massey Ferguson / Perkins စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Manual)'
                        : isJohnDeere
                        ? 'John Deere PowerTech 3029 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory CTM Manual)'
                        : isNewHolland
                        ? 'New Holland TT / Ford စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Manual)'
                        : isYto
                        ? 'YTO (အရှေ့နီ DFH) စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Service Manual)'
                        : isLovol
                        ? 'Lovol TD824/TD904 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Workshop Manual)'
                        : isWeichai
                        ? 'Weichai WP10 / WD615 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Manual)'
                        : isCummins
                        ? 'Cummins 6BT 5.9 / 6CT 8.3 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Manual)'
                        : isYuchai
                        ? 'Yuchai YC6L / YC6M စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Manual)'
                        : isYunneiTruck
                        ? 'Yunnei 4100 / 4102 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Manual)'
                        : 'Sonalika DI 750 / RX 50 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Service Manual)'
                    );
                    setModalScale(1);
                    setIsModalOpen(true);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isKubota || isJohnDeere
                      ? 'bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40'
                      : isYanmar || isMassey || isYto
                      ? 'bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40'
                      : isLovol
                      ? 'bg-sky-600/30 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/40'
                      : 'bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40'
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>ပုံကြီးချဲ့ကြည့်ရန် (Fullscreen)</span>
                </button>
              </div>

              {/* Genuine Manual Image Frame */}
              <div
                onClick={() => {
                  setActiveModalImg(factoryManualImgSrc);
                  setActiveModalTitle(
                    isKubota
                      ? engine.category === 'single_cylinder'
                        ? 'Kubota RT / ZT စက်ရုံထုတ် အလုပ်ရုံလက်စွဲစာအုပ်ပါ တိုင်မင်မာကင်အစစ်ပုံ (Factory Manual)'
                        : 'Kubota စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory WSM)'
                      : isYanmar
                      ? engine.category === 'single_cylinder'
                        ? 'Yanmar TF120 / TF140 / TF160 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ တိုင်မင်မာကင်အစစ်ပုံ (Factory Manual)'
                        : 'Yanmar 4TNV88 / 4TNV98 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Service Manual)'
                      : isMassey
                      ? 'Massey Ferguson / Perkins စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Manual)'
                      : isJohnDeere
                      ? 'John Deere PowerTech 3029 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory CTM Manual)'
                      : isNewHolland
                      ? 'New Holland TT / Ford စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Manual)'
                      : isYto
                      ? 'YTO (အရှေ့နီ DFH) စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Service Manual)'
                      : isLovol
                      ? 'Lovol TD824/TD904 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Workshop Manual)'
                      : 'Sonalika DI 750 / RX 50 စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ ဂီယာတိုင်မင်မာကင်အစစ်ပုံ (Factory Service Manual)'
                  );
                  setModalScale(1);
                  setIsModalOpen(true);
                }}
                className="relative w-full group cursor-pointer overflow-hidden rounded-b-xl border border-slate-700/80 shadow-2xl bg-white"
              >
                <img
                  src={factoryManualImgSrc}
                  alt={
                    isKubota
                      ? 'Kubota Genuine Factory Workshop Manual Timing Marks'
                      : isYanmar
                      ? 'Yanmar Genuine Factory Service Manual Timing Marks'
                      : isMassey
                      ? 'Massey Ferguson Perkins Genuine Workshop Manual Timing Marks'
                      : isJohnDeere
                      ? 'John Deere PowerTech 3029 Genuine Workshop Manual Timing Marks'
                      : isNewHolland
                      ? 'New Holland Ford Genuine Workshop Manual Timing Marks'
                      : isYto
                      ? 'YTO Dongfanghong LR4108 Genuine Workshop Manual Timing Marks'
                      : isLovol
                      ? 'Lovol Foton Genuine Workshop Manual Timing Marks'
                      : 'Sonalika ITL Genuine Service Manual Timing Marks'
                  }
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none ${
                  isKubota
                    ? 'bg-emerald-950/20'
                    : isYanmar || isMassey || isYto
                    ? 'bg-red-950/20'
                    : isLovol
                    ? 'bg-sky-950/20'
                    : 'bg-blue-950/20'
                }`}>
                  <span className={`bg-slate-950/90 border px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2 ${
                    isKubota
                      ? 'text-emerald-300 border-emerald-500/50'
                      : isYanmar || isMassey || isYto
                      ? 'text-red-300 border-red-500/50'
                      : isLovol
                      ? 'text-sky-300 border-sky-500/50'
                      : 'text-blue-300 border-blue-500/50'
                  }`}>
                    <Maximize2 className={`w-4 h-4 ${
                      isKubota ? 'text-emerald-400' : isYanmar || isMassey || isYto ? 'text-red-400' : isLovol ? 'text-sky-400' : 'text-blue-400'
                    }`} />
                    <span>မျက်နှာပြင်ပြည့် ချဲ့ကြည့်ရန် နှိပ်ပါ (Click to Inspect)</span>
                  </span>
                </div>
              </div>

              {/* Factory Mark Reference Guide Under Image */}
              <div className={`w-full mt-3 p-3.5 bg-slate-900/90 rounded-xl border text-left ${
                isKubota
                  ? 'border-emerald-500/30'
                  : isYanmar || isMassey || isYto
                  ? 'border-red-500/30'
                  : isLovol
                  ? 'border-sky-500/30'
                  : 'border-blue-500/30'
              }`}>
                <div className={`flex items-center gap-2 mb-2 text-xs font-bold ${
                  isKubota
                    ? 'text-emerald-400'
                    : isYanmar || isMassey || isYto
                    ? 'text-red-400'
                    : isLovol
                    ? 'text-sky-400'
                    : 'text-blue-400'
                }`}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>စက်ရုံထုတ် လက်စွဲစာအုပ်ပါ မူရင်း မာကင်တိုက်ဆိုင်နည်း အချက်အလက်များ:</span>
                </div>
                {isKubota ? (
                  engine.category === 'single_cylinder' ? (
                    <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                      <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear):</strong> စက်ရုံထုတ် အစက်အမှတ် [ • ] (1 Dot) ပါရှိသည်။</li>
                      <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (Camshaft Gear):</strong> စက်ရုံထုတ် အစက်အမှတ် [ • • ] (2 Dots) ပါရှိပြီး ခရိုင်းရှပ်အစက် [ • ] ကို ကင်းရှပ်အစက်နှစ်ခုကြား သေချာညှပ်တိုက်ရမည်။</li>
                      <li><strong className="text-sky-300">ဘာလန်ဆာ ဝိတ်တုံးဂီယာများ (Upper & Lower Balancers):</strong> ဝိတ်တုံးဂီယာများရှိ အစက်အမှတ် [ • ] များကို သက်ဆိုင်ရာ ကင်းရှပ်ဂီယာအမှတ်များနှင့် တိကျစွာတိုက်ဆိုင်ရပါမည်။ မာ့ခ်လွဲပါက အင်ဂျင်အလွန်အမင်းတုန်ခါပါမည်။</li>
                    </ul>
                  ) : (
                    <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                      <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (Crankshaft A - Mark 1):</strong> အလယ်အိုင်ဒလာဂီယာ၏ အမှတ် [ 1 ] (သို့မဟုတ် 1-1) သွားကြားသို့ ထည့်သွင်းတိုက်ဆိုင်ရပါမည်။</li>
                      <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (Camshaft C - Mark 2):</strong> အလယ်အိုင်ဒလာဂီယာ၏ နှစ်ထပ်အမှတ် [ 2 - 2 ] သွားကြားသို့ ထည့်သွင်းတိုက်ဆိုင်ရပါမည်။</li>
                      <li><strong className="text-red-300">ဆီပန့်ဂီယာ (Fuel Injection Pump F - Mark 3):</strong> အလယ်အိုင်ဒလာဂီယာ၏ နှစ်ထပ်အမှတ် [ 3 - 3 ] သွားကြားသို့ တိုက်ဆိုင်ရပါမည် (မီးတိုင်မင် အတိအကျဖြစ်စေရန်)။</li>
                      <li><strong className="text-sky-300">ဗဟို အိုင်ဒလာဂီယာ (Idler Gear):</strong> မာ့ခ် 1, 2-2, 3-3 သုံးစုံစလုံးကို အခြားဂီယာများနှင့် တစ်ပြိုင်နက်တည်း အပြည့်အဝတိုက်ဆိုင်ပြီးမှ အလယ်ဗဟိုနပ်ကို ဆွဲပေါင် 40-45 Nm တင်းကျပ်ရပါမည်။</li>
                    </ul>
                  )
                ) : isYanmar ? (
                  engine.category === 'single_cylinder' ? (
                    <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                      <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear):</strong> စက်ရုံထုတ် အစက် [ • ] (သို့မဟုတ် Mark 1) ပါရှိပြီး ကင်းရှပ်အစက်နှစ်စက်ကြား တိုက်ဆိုင်ရမည်။</li>
                      <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (Camshaft Gear):</strong> စက်ရုံထုတ် အစက်အမှတ် [ • • ] (သို့မဟုတ် Mark 1-1) ပါရှိသည်။</li>
                      <li><strong className="text-sky-300">အပေါ်/အောက် ဘာလန်ဆာဂီယာများ (Upper & Lower Balancer Shaft Gears):</strong> ပုံတွင်ပြထားသည့်အတိုင်း Alignment Dots [ • ] နှင့် မာ့ခ် [ 2 - 2 ] များကို တိကျစွာတိုက်ဆိုင်ရမည်။ ဘာလန်ဆာလွဲပါက အင်ဂျင်အရမ်းတုန်ခါပြီး ကာတာကျိုးတတ်ပါသည်။</li>
                    </ul>
                  ) : (
                    <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                      <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (1 - Crankshaft Gear - Mark A):</strong> အလယ်အိုင်ဒလာဂီယာ၏ နှစ်ထပ်အက္ခရာအမှတ် [ Mark AA ] သွားကြားသို့ ထည့်သွင်းတိုက်ဆိုင်ရပါမည်။</li>
                      <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (3 - Camshaft Gear - Mark B):</strong> အလယ်အိုင်ဒလာဂီယာ၏ နှစ်ထပ်အက္ခရာအမှတ် [ Mark BB ] သွားကြားသို့ တိုက်ဆိုင်ရပါမည်။</li>
                      <li><strong className="text-red-300">ဆီပန့်ဂီယာ (4 - Fuel Injection Pump Gear - Mark C):</strong> Yanmar MP4 Distributor Type ပန့်ဂီယာအမှတ် [ Mark C ] ကို အိုင်ဒလာဂီယာ၏ [ Mark CC ] ကြား သေချာတိုက်ဆိုင်ရပါမည်။</li>
                      <li><strong className="text-sky-300">အလယ်အိုင်ဒလာဂီယာ (2 - Idle Gear):</strong> Mark AA, Mark BB, Mark CC မာ့ခ် ၃ စုံစလုံး ကွက်တိကျပြီးမှ အိုင်ဒလာရှပ်ဘော့လ် (Idle Gear Shaft Torque Bolt) ကို 45 - 50 Nm (M8 ဘော့လ်ဖြစ်ပါက 25 Nm) ဖြင့် ဆွဲရပါမည်။ Backlash ဂီယာကစားချက် 0.06 - 0.12 mm အတွင်း စစ်ဆေးပါ။</li>
                      <li><strong className="text-slate-400">အင်ဂျင်ဝိုင်ပန့်ဂီယာ (5 - Lubrication Oil Pump Gear):</strong> ခရိုင်းရှပ်အောက်ခြေ အင်ဂျင်ဝိုင်ပန့်ကို တိုက်ရိုက် မောင်းနှင်လည်ပတ်ပါသည်။</li>
                    </ul>
                  )
                ) : isJohnDeere ? (
                  /* John Deere PowerTech 3029 Specs */
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                    <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear - Mark 1):</strong> Crankshaft timing punch mark [ 1 ] ကို အလယ်အိုင်ဒလာဂီယာပေါ်ရှိ အမှတ် [ 1 ] နှင့် ကွက်တိကျအောင် တိုက်ဆိုင်ရမည် (TDC Cylinder #1)။</li>
                    <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (Camshaft Gear - Mark 2):</strong> Camshaft timing punch mark [ 2 ] ကို အလယ်အိုင်ဒလာဂီယာပေါ်ရှိ အမှတ် [ 2 ] နှင့် တိကျစွာတိုက်ဆိုင်ရမည် (Camshaft end play: 0.05 - 0.15 mm)။</li>
                    <li><strong className="text-red-300">ဆီပန့်ဂီယာ (Fuel Injection Pump Drive Gear - Mark 3):</strong> FIP drive gear timing mark [ 3 ] ကို အလယ်အိုင်ဒလာဂီယာပေါ်ရှိ အမှတ် [ 3 ] နှင့် တိုက်ဆိုင်ရမည် (Stanadyne/Lucas Rotary Pump Timing 13° - 15° BTDC)။</li>
                    <li><strong className="text-sky-300">ဗဟိုအိုင်ဒလာဂီယာ (Upper Idler Gear):</strong> မာ့ခ် 1, 2, 3 အားလုံး တစ်ပြိုင်နက်တည်း ကွက်တိကျပြီးမှ Idler Gear Retaining Bolt ကို သတ်မှတ်ဆွဲပေါင် <strong>60 Nm (44 Ft-lb)</strong> ဖြင့် တင်းကျပ်ရပါမည်။</li>
                    <li><strong className="text-yellow-300">Gear Backlash (ဂီယာကစားချက်):</strong> Dial Indicator ဖြင့် တိုင်းတာရာတွင် <strong>0.08 - 0.22 mm</strong> (အမြင့်ဆုံး Limit 0.30 mm) အတွင်း ရှိစေရပါမည်။</li>
                    <li><strong className="text-cyan-300">ဟိုက်ဒရောလစ်ပန့်ဂီယာ (Hydraulic Pump Drive Gear):</strong> ကင်းရှပ်ဂီယာမှတစ်ဆင့် တိုက်ရိုက်မောင်းနှင်ပြီး timing mark မလိုအပ်ပါ။</li>
                  </ul>
                ) : isMassey ? (
                  /* Massey Ferguson / Perkins Specs */
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                    <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear - Mark S):</strong> အလယ်အိုင်ဒလာဂီယာ၏ နှစ်ထပ်အက္ခရာအမှတ် [ S - S ] သွားကြားသို့ ထည့်သွင်းတိုက်ဆိုင်ရပါမည်။</li>
                    <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (Camshaft Gear - Mark C):</strong> အလယ်အိုင်ဒလာဂီယာ၏ နှစ်ထပ်အက္ခရာအမှတ် [ C - C ] သွားကြားသို့ တိကျစွာတိုက်ဆိုင်ရပါမည်။</li>
                    <li><strong className="text-red-300">ဆီပန့်ဂီယာ (CAV DPA Fuel Injection Pump Drive Gear - Mark D):</strong> CAV DPA Rotary ပန့်ဂီယာအမှတ် [ Mark D ] ကို အိုင်ဒလာဂီယာ၏ [ D - D ] ကြား သေချာတိုက်ဆိုင်ရပါမည်။</li>
                    <li><strong className="text-sky-300">ဗဟိုအိုင်ဒလာဂီယာ (Idler Gear - S-S, C-C, D-D):</strong> မာ့ခ် ၃ မျိုးစလုံး (S-SS, C-CC, D-DD) တစ်ပြိုင်နက်တည်း ကွက်တိကျပြီးမှ အိုင်ဒလာ hub retaining bolts ကို 65 Nm (48 Ft-lb) ဆွဲပါ။ Backlash ဂီယာကစားချက် 0.003" - 0.007" (0.076 - 0.178 mm) ကို Dial Indicator ဖြင့် စစ်ဆေးပါ။</li>
                    <li><strong className="text-slate-400">အင်ဂျင်ဝိုင်ပန့်ဂီယာ (Oil Pump Drive Gear):</strong> ခရိုင်းရှပ်အောက်ဘက် အင်ဂျင်ဝိုင်ပန့်ဂီယာကို တိုက်ရိုက်ထိစပ် မောင်းနှင်သည်။</li>
                    <li><strong className="text-yellow-300">MF 385 အင်ဂျင်ဗလန်ဆာဂီယာ (Engine Balancer Unit - 4.248 Engine):</strong> အင်ဂျင်အောက်ခြေ ဗလန်ဆာဂီယာပေါ်ရှိ အစက်အမှတ် [ B ] ကို ခရိုင်းရှပ်ဂီယာ အစက်အမှတ်များနှင့် တိကျစွာတိုက်ရပါမည်။</li>
                  </ul>
                ) : isNewHolland ? (
                  /* New Holland & Ford Specs */
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                    <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear):</strong> စက်ရုံထုတ် Single Timing Punch Mark [ • ] ပါရှိပြီး အိုင်ဒလာဂီယာ၏ နှစ်စက်အမှတ် [ •• ] ကြားသို့ တိုက်ဆိုင်ရပါမည်။</li>
                    <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (Camshaft Gear):</strong> စက်ရုံထုတ် Timing Punch Marks alignment အမှတ်ပါရှိပြီး အိုင်ဒလာဂီယာနှင့် တိကျစွာတိုက်ဆိုင်ရပါမည် (Camshaft thrust end play: 0.05 - 0.15 mm)။</li>
                    <li><strong className="text-red-300">ဆီပန့်ဂီယာ (Bosch VE / Simms Fuel Injection Pump Gear):</strong> စက်ရုံထုတ် timing alignment marks ပါရှိပြီး အိုင်ဒလာဂီယာနှင့် တိုက်ဆိုင်ရမည်။ နံပါတ် ၁ ဆလင်ဒါ TDC အနေအထားတွင် Bosch VE Timing Lock Pin Tool ဖြင့် အတိအကျ lock ချတပ်ဆင်ရမည်။</li>
                    <li><strong className="text-sky-300">ဗဟိုအိုင်ဒလာဂီယာ (Intermediate Idler Gear):</strong> ခရိုင်း၊ ကင်းရှပ်နှင့် ဆီပန့်ဂီယာ ၃ စုံစလုံး၏ timing punch marks များ ကွက်တိကျပြီးမှ Spindle Hub bolt ကို သတ်မှတ်ဆွဲပေါင် 60 - 65 Nm ဖြင့် တင်းကျပ်ရမည်။</li>
                    <li><strong className="text-cyan-300">Gear Backlash (ဂီယာကစားချက်):</strong> Dial Test Indicator ဖြင့် တိုင်းတာစစ်ဆေးရာတွင် 0.10 - 0.20 mm (Ford 0.05 - 0.12 mm) အတွင်း ရှိစေရပါမည်။</li>
                  </ul>
                ) : isYto ? (
                  /* YTO Dongfanghong DFH LR4108 Specs */
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                    <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear 2 - Mark 0):</strong> အလယ်အိုင်ဒလာဂီယာပေါ်ရှိ အမှတ် [ 0 ] နှင့် ကွက်တိတိုက်ဆိုင်ရပါမည်။</li>
                    <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (Camshaft Gear 3 - Mark 00):</strong> အလယ်အိုင်ဒလာဂီယာပေါ်ရှိ နှစ်ထပ်အမှတ် [ 00 ] နှင့် တိကျစွာတိုက်ဆိုင်ရပါမည်။</li>
                    <li><strong className="text-red-300">ဆီပန့်ဂီယာ (BH4PM In-line Fuel Pump Gear 5 - Mark 000):</strong> အလယ်အိုင်ဒလာဂီယာပေါ်ရှိ သုံးထပ်အမှတ် [ 000 ] နှင့် တိုက်ဆိုင်ရပါမည် (ဆလင်ဒါ ၁ မီးတိုင်မင် 16°~18° BTDC)။</li>
                    <li><strong className="text-sky-300">ဗဟိုအိုင်ဒလာဂီယာ (Timing Idler Gear 4):</strong> 0, 00, 000 မာ့ခ် ၃ စုံစလုံး ကွက်တိကျပြီးမှ အိုင်ဒလာ hub bolt ကို ဆွဲပေါင် 90 - 110 Nm တင်းကျပ်ရမည်။ Bushing ဆီပေါက် အင်ဂျင်ဘလောက်နှင့် ချိန်တပ်ပါ။</li>
                    <li><strong className="text-yellow-300">Gear Backlash (ဂီယာကစားချက်):</strong> Dial Indicator ဖြင့် တိုင်းတာရာတွင် 0.10 - 0.25 mm (အမြင့်ဆုံး Limit 0.35 mm) ရှိစေရပါမည်။</li>
                    <li><strong className="text-cyan-300">ကင်းရှပ်တွန်းပြား (Camshaft Thrust Plate):</strong> ဘော့လ်များကို 60 - 70 Nm ကျပ်ပြီး လော့ပြားခေါက်ရပါမည်။</li>
                  </ul>
                ) : isLovol ? (
                  /* Lovol Foton TD824/TD904 Specs */
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                    <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (1 - Crankshaft Gear):</strong> Timing Mark 1 ကို အလယ်အိုင်ဒလာဂီယာ Timing Mark 1 နှင့် တိုက်ဆိုင်ပါ (Cylinder #1 TDC အနေအထား)။</li>
                    <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (2 - Camshaft Gear):</strong> Timing Mark 2 ကို အလယ်အိုင်ဒလာဂီယာ Timing Mark 2 နှင့် တိုက်ဆိုင်ပါ (ဘားတိုင်မင်)။</li>
                    <li><strong className="text-red-300">ဆီပန့်ဂီယာ (4 - Fuel Injection Pump Gear):</strong> Timing Mark 3 ကို အလယ်အိုင်ဒလာဂီယာ Timing Mark 3 နှင့် တိုက်ဆိုင်ပါ (မီးတိုင်မင် 14°~16° BTDC)။</li>
                    <li><strong className="text-sky-300">ဗဟိုအိုင်ဒလာဂီယာ (Idler Gear):</strong> မာ့ခ် 1, 2, 3 အားလုံး တိကျစွာတိုက်ဆိုင်ပြီးမှ Idler Spindle bolt ကို 80 - 95 Nm တင်းကျပ်ပါ။</li>
                    <li><strong className="text-cyan-300">Gear Backlash (ဂီယာကစားချက်):</strong> 0.08 - 0.18 mm အတွင်း ရှိစေရပါမည်။</li>
                  </ul>
                ) : isWeichai ? (
                  /* Weichai WP10 / WP12 Specs */
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                    <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear 64T - Mark 0):</strong> အလယ်အိုင်ဒလာဂီယာပေါ်ရှိ အောက်ခြေအမှတ် [ 0 ] (သို့ 0-0) နှင့် ကွက်တိကျအောင် တိုက်ဆိုင်ပါ (TDC OT မာကင် ချိန်ပြီးမှ)။</li>
                    <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (Camshaft Gear 48T - Mark 1):</strong> အလယ်အိုင်ဒလာဂီယာပေါ်ရှိ အမှတ် [ 1 ] (သို့ 1-1) နှင့် တိကျစွာတိုက်ဆိုင်ပါ (ဘားတိုင်မင် အဖွင့်/အပိတ်)။</li>
                    <li><strong className="text-red-300">ဆီပန့်ဂီယာ (HPCR CP3 Pump Gear 48T - Mark 2):</strong> အလယ်အိုင်ဒလာဂီယာပေါ်ရှိ အမှတ် [ 2 ] (သို့ 2-2) နှင့် တိုက်ဆိုင်ပါ (မီးတိုင်မင် 14°~16° BTDC)။</li>
                    <li><strong className="text-sky-300">ဗဟိုပင်မ အိုင်ဒလာဂီယာ (Main Idler Gear 90T):</strong> 0, 1, 2 မာကင် ၃ စုံစလုံး ကွက်တိကျပြီးမှ Idler Spindle Bolt (M14) ကို 160 - 180 N·m တင်းကျပ်ရမည်။</li>
                    <li><strong className="text-yellow-300">Gear Backlash (ဂီယာကစားချက်):</strong> Dial Gauge ဖြင့် တိုင်းတာရာတွင် 0.10 - 0.25 mm (အမြင့်ဆုံး Limit 0.35 mm) အတွင်း ရှိစေရပါမည်။</li>
                    <li><strong className="text-cyan-300">လေကွန်ပရက်ဆာ (26T) & ပါဝါစတီယာရင်ပန့် (18T):</strong> အလယ်အိုင်ဒလာဂီယာမှတစ်ဆင့် တိုက်ရိုက်မောင်းနှင်လည်ပတ်ပါသည်။</li>
                  </ul>
                ) : isCummins ? (
                  /* Cummins 6BT / 6CT Specs */
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                    <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear - Single Dot •):</strong> ကင်းရှပ်ဂီယာပေါ်ရှိ Double Dots [ •• ] နှစ်စက်ကြား သေချာညှပ်တိုက်ရမည် (TDC Cylinder #1)။</li>
                    <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (Camshaft Gear - Double Dots ••):</strong> ကမ်ရှပ်အနောက်ဘက်ရှိ Engine Timing Pin ကို တွန်းသွင်း၍ သော့ထိုးချိန်ညှိပါ (မောင်းနှင်မီ Pin ပြန်ဖြုတ်ရန် မမေ့ပါနှင့်)။</li>
                    <li><strong className="text-red-300">ဆီပန့်ဂီယာ (Bosch P7100 / Bosch VE Pump Gear):</strong> Timing Pin lock ချပြီး တပ်ဆင်ပါ။ Bosch P7100 Drive Gear Nut ကို သတ်မှတ်ဆွဲပေါင် <strong>170 N·m (125 Ft-lb)</strong> တင်းကျပ်ရပါမည်။</li>
                    <li><strong className="text-yellow-300">Gear Backlash (ဂီယာကစားချက်):</strong> 0.08 - 0.23 mm (Limit 0.33 mm) အတွင်း စစ်ဆေးပါ။</li>
                    <li><strong className="text-sky-300">အင်ဂျင်ဝိုင်ပန့် & လေကွန်ပရက်ဆာ:</strong> ကရိုင်းရှပ်မှတစ်ဆင့် တိုက်ရိုက်မောင်းနှင်ပါသည်။</li>
                  </ul>
                ) : isYuchai ? (
                  /* Yuchai YC6L / YC6M Specs */
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                    <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear 1):</strong> အလယ်အိုင်ဒလာဂီယာပေါ်ရှိ အစက် [ • ] ကို ခရိုင်းရှပ်ဂီယာ၏ နှစ်စက်အမှတ် [ • • ] ကြားသို့ တိုက်ဆိုင်ပါ (Detail A)။</li>
                    <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (Camshaft Gear 3):</strong> အလယ်အိုင်ဒလာဂီယာပေါ်ရှိ နှစ်စက်အမှတ် [ • • ] ကြားသို့ ကင်းရှပ်ဂီယာအစက် [ • ] ကို တိုက်ဆိုင်ပါ (Detail B)။</li>
                    <li><strong className="text-sky-300">ဗဟိုအိုင်ဒလာဂီယာ (Intermediate Idler Gear 2):</strong> Detail A & B Dots ကွက်တိကျပြီးမှ Spindle Hub bolt ကို <strong>110 - 125 N·m</strong> ဆွဲပါ။</li>
                    <li><strong className="text-red-300">ဆီပန့်ဂီယာ (Gear 4) & ကွန်ပရက်ဆာ (Gear 5):</strong> အလယ်အိုင်ဒလာမှတစ်ဆင့် ဘော့ရှ် CP3 Common Rail ပန့်နှင့် လေကွန်ပရက်ဆာကို တိုက်ရိုက်မောင်းနှင်သည်။</li>
                    <li><strong className="text-yellow-300">Gear Backlash (ဂီယာကစားချက်):</strong> 0.10 - 0.25 mm အတွင်း ရှိစေရပါမည်။</li>
                  </ul>
                ) : isYunneiTruck ? (
                  /* Yunnei 4100 / 4102 Specs */
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                    <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (Crankshaft Gear G1 - Mark 0):</strong> အလယ်အိုင်ဒလာဂီယာ G2 ပေါ်ရှိ အမှတ် [ 00 ] ကြားသို့ အတိအကျ တိုက်ဆိုင်ပါ (TDC Cyl #1)။</li>
                    <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (Camshaft Gear G3 - Mark 1):</strong> အလယ်အိုင်ဒလာဂီယာ G2 ပေါ်ရှိ အမှတ် [ 11 ] ကြားသို့ တိကျစွာတိုက်ဆိုင်ပါ (ဘားတိုင်မင်)။</li>
                    <li><strong className="text-red-300">ဆီပန့်ဂီယာ (Inline Fuel Injection Pump G4 - Mark 2):</strong> အလယ်အိုင်ဒလာဂီယာ G2 ပေါ်ရှိ အမှတ် [ 22 ] ကြားသို့ တိုက်ဆိုင်ပါ (မီးတိုင်မင် 16°~18° BTDC)။</li>
                    <li><strong className="text-sky-300">ဗဟိုအိုင်ဒလာဂီယာ (Intermediate Idler Gear G2):</strong> 00, 11, 22 မာကင်များ ကွက်တိကျပြီးမှ Idler bolt ကို <strong>80 - 90 N·m</strong> ဖြင့် တင်းကျပ်ပါ။</li>
                    <li><strong className="text-cyan-300">လေကွန်ပရက်ဆာ (G5) & ဟိုက်ဒရောလစ်ပန့် (G6):</strong> အလယ်အိုင်ဒလာဂီယာမှတစ်ဆင့် ကားလေဘရိတ်နှင့် စတီယာရင်/ဒန့်မ ပန့်ကို မောင်းနှင်ပါသည်။</li>
                    <li><strong className="text-yellow-300">Gear Backlash (ဂီယာကစားချက်):</strong> 0.07 - 0.14 mm အတွင်း ရှိစေရပါမည်။</li>
                  </ul>
                ) : (
                  /* Sonalika ITL Specs */
                  <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc pl-4">
                    <li><strong className="text-emerald-300">ခရိုင်းရှပ်ဂီယာ (Crankshaft Pinion Gear - 18 Teeth):</strong> စက်ရုံထုတ် အစက်အမှတ် Single Dot [ • ] ပါရှိပြီး အိုင်ဒလာဂီယာနှင့် တိုက်ဆိုင်ရမည် (Crankshaft bolt torque: 200 Nm)။</li>
                    <li><strong className="text-amber-300">ကင်းရှပ်ဂီယာ (Camshaft Gear - 36 Teeth):</strong> စက်ရုံထုတ် နှစ်စက်အမှတ် Double Dots [ •• ] ပါရှိပြီး အိုင်ဒလာဂီယာနှင့် တိုက်ဆိုင်ရမည် (Camshaft nut torque: 120 Nm)။</li>
                    <li><strong className="text-red-300">ဆီပန့်ဂီယာ (Fuel Injection Pump FIP Drive Gear - 36 Teeth):</strong> နှစ်စက်အမှတ် Double Dots [ •• ] ပါရှိပြီး အိုင်ဒလာဂီယာနှင့် တိုက်ဆိုင်ရမည် (FIP drive gear nut torque: 80 Nm)။</li>
                    <li><strong className="text-sky-300">ဗဟိုအိုင်ဒလာဂီယာ (Central Idler Gear):</strong> Single Dot ကို ခရိုင်းရှပ်နှင့်လည်းကောင်း၊ Double Dots များကို ကင်းရှပ်နှင့် ဆီပန့်ဂီယာများကြားသို့လည်းကောင်း တိကျစွာတိုက်ဆိုင်တပ်ဆင်ရပါမည်။</li>
                    <li><strong className="text-amber-400">Gear Backlash (ဂီယာကစားချက်):</strong> 0.08 - 0.18 mm အတွင်း ရှိစေရပါမည်။</li>
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* 2. TECHNICAL BLUEPRINT DISPLAY (Kubota, Yanmar, Massey Ferguson, New Holland, YTO/Lovol, John Deere) */}
          {hasFactoryManual && viewMode === 'blueprint' && (
            <div className="w-full flex flex-col items-center max-w-2xl">
              <div className="w-full flex items-center justify-between bg-slate-900 px-3.5 py-2.5 rounded-t-xl border border-b-0 border-slate-700/80">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold text-slate-100">
                    {isKubota
                      ? 'KUBOTA TECHNICAL BLUEPRINT • TIMING GEAR TRAIN CAD SCHEMATIC'
                      : isYanmar
                      ? 'YANMAR TECHNICAL BLUEPRINT • TIMING GEAR TRAIN & BACKLASH INSPECTION'
                      : isMassey
                      ? 'PERKINS ENGINES LTD. • FRONT TIMING GEAR TRAIN ASSY 4.248 CAD BLUEPRINT'
                      : isJohnDeere
                      ? 'JOHN DEERE POWERTECH 3029 • FRONT TIMING GEAR TRAIN ASSEMBLY & SERVICE BLUEPRINT'
                      : isNewHolland
                      ? 'NEW HOLLAND AGRICULTURE • TT SERIES TRACTOR FRONT TIMING GEAR TRAIN ASSEMBLY BLUEPRINT'
                      : isYto || isLovol
                      ? 'YTO DONGFANGHONG • DFH LR4108 FRONT TIMING GEAR TRAIN CAD BLUEPRINT'
                      : isWeichai
                      ? 'WEICHAI POWER WP10 / WD615 • FRONT TIMING GEAR TRAIN CAD SCHEMATIC BLUEPRINT'
                      : isCummins
                      ? 'CUMMINS 6BT / 6CT DIESEL • FRONT TIMING GEAR TRAIN SCHEMATIC BLUEPRINT'
                      : isYuchai
                      ? 'YUCHAI YC6L / YC6M DIESEL • FRONT TIMING GEAR TRAIN SCHEMATIC BLUEPRINT'
                      : 'YUNNEI YN4100 / YN4102 • FRONT TIMING GEAR TRAIN BLUEPRINT'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalImg(factoryBlueprintImgSrc);
                    setActiveModalTitle(
                      isKubota
                        ? 'Kubota နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Technical Blueprint)'
                        : isYanmar
                        ? 'Yanmar နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Service Manual Blueprint)'
                        : isMassey
                        ? 'Massey Ferguson / Perkins နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Technical Blueprint MF-240/385)'
                        : isJohnDeere
                        ? 'John Deere PowerTech 3029 နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Technical Blueprint Schematic)'
                        : isNewHolland
                        ? 'New Holland TT Series နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Technical Blueprint TT4.75 / TT55)'
                        : isYto || isLovol
                        ? 'YTO Dongfanghong DFH LR4108 နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Technical Blueprint LR4108)'
                        : isWeichai
                        ? 'Weichai WP10 / WD615 နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (CAD Blueprint)'
                        : isCummins
                        ? 'Cummins 6BT 5.9 / 6CT 8.3 နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (CAD Blueprint)'
                        : isYuchai
                        ? 'Yuchai YC6L / YC6M နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (CAD Blueprint)'
                        : 'Yunnei YN4100 / 4102 နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (CAD Blueprint)'
                    );
                    setModalScale(1);
                    setIsModalOpen(true);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-sky-600/30 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>ပုံကြီးချဲ့ကြည့်ရန် (Fullscreen)</span>
                </button>
              </div>

              <div
                onClick={() => {
                  setActiveModalImg(factoryBlueprintImgSrc);
                  setActiveModalTitle(
                    isKubota
                      ? 'Kubota နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Technical Blueprint)'
                      : isYanmar
                      ? 'Yanmar နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Service Manual Blueprint)'
                      : isMassey
                      ? 'Massey Ferguson / Perkins နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Technical Blueprint MF-240/385)'
                      : isJohnDeere
                      ? 'John Deere PowerTech 3029 နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Technical Blueprint Schematic)'
                      : isNewHolland
                      ? 'New Holland TT Series နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Technical Blueprint TT4.75 / TT55)'
                      : isYto || isLovol
                      ? 'YTO Dongfanghong DFH LR4108 နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (Technical Blueprint LR4108)'
                      : isWeichai
                      ? 'Weichai WP10 / WD615 နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (CAD Blueprint)'
                      : isCummins
                      ? 'Cummins 6BT 5.9 / 6CT 8.3 နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (CAD Blueprint)'
                      : isYuchai
                      ? 'Yuchai YC6L / YC6M နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (CAD Blueprint)'
                      : 'Yunnei YN4100 / 4102 နည်းပညာ အင်ဂျင်နီယာ ပုံကြမ်း (CAD Blueprint)'
                  );
                  setModalScale(1);
                  setIsModalOpen(true);
                }}
                className="relative w-full group cursor-pointer overflow-hidden rounded-b-xl border border-slate-700/80 shadow-2xl bg-white"
              >
                <img
                  src={factoryBlueprintImgSrc}
                  alt={
                    isKubota
                      ? 'Kubota Engine Timing Blueprint'
                      : isYanmar
                      ? 'Yanmar Engine Timing Blueprint'
                      : isMassey
                      ? 'Massey Ferguson Perkins Engine Timing Blueprint'
                      : isJohnDeere
                      ? 'John Deere PowerTech 3029 Timing Gear Blueprint'
                      : isNewHolland
                      ? 'New Holland TT Tractor Timing Gear Blueprint'
                      : 'YTO Dongfanghong DFH LR4108 Timing Gear Blueprint'
                  }
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="bg-slate-950/90 text-sky-300 border border-sky-500/50 px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-sky-400" />
                    <span>မျက်နှာပြင်ပြည့် ချဲ့ကြည့်ရန် နှိပ်ပါ (Click to Inspect)</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3. INTERACTIVE SVG GEAR TRAIN (For interactive mode or non-manual engines) */}
          {(!hasFactoryManual || viewMode === 'interactive') && (
            <>
              <div className="w-full max-w-xl aspect-[4/3] bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-2 relative flex items-center justify-center overflow-hidden">
                {renderSpecializedDiagram()}
              </div>

              <p className="text-[11px] text-slate-400 mt-3 text-center">
                💡 ဂီယာဝိုင်းတစ်ခုချင်းစီကို နှိပ်၍ သက်ဆိုင်ရာ စက်ရုံထုတ် မာ့ခ်တိုက်ဆိုင်ပုံနှင့် အချက်အလက်များကို ကြည့်ရှုနိုင်ပါသည်။
              </p>
            </>
          )}
        </div>

        {/* Timing Marks Table */}
        <div className="space-y-2 mt-4">
          <h5 className="font-bold text-xs text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>တိုက်ဆိုင်ရမည့် မာ့ခ်အမှတ်အသားများ ဇယား (Timing Marks Table):</span>
          </h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {timingInfo.marks.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-bold text-xs text-slate-200">{item.gear}</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-mono font-black text-xs border border-amber-400/30">
                    {item.mark}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Backlash & Idler Bolt Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">ဂီယာကစားချက် (Backlash Standard)</span>
            <span className="text-base font-black text-emerald-400 font-mono">{timingInfo.backlashStandard}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Limit: {timingInfo.backlashLimit}</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">အိုင်ဒလာဂီယာဆွဲပေါင် (Idler Bolt Torque)</span>
            <span className="text-base font-black text-amber-300 font-mono">{timingInfo.idlerTorque}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Thread Locker သုတ်ပြီးဆွဲပါ</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">ဖလိုင်းဝှီး မီးချိန်ပေါင် (BTDC Timing)</span>
            <span className="text-base font-black text-sky-400 font-mono">{timingInfo.flywheelTiming}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">No.1 Cyl Spill Cut-off Point</span>
          </div>
        </div>

        {/* Important Rule Callout */}
        <div className="mt-4 p-3.5 bg-gradient-to-r from-amber-950/40 to-slate-950 rounded-xl border border-amber-500/40 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="text-amber-300">ဝပ်ရှော့ လက်တွေ့ အထူးသတိပြုရန်:</strong>
            <p className="text-slate-300 text-[11px] mt-1">
              {timingInfo.timingRule}
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Inspection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-1.5 sm:p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl h-[95vh] bg-slate-950 border border-slate-700/80 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-100 flex-shrink-0 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <BookOpen className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <h3 className="font-bold text-xs sm:text-sm md:text-base text-slate-100 truncate">
                  {activeModalTitle}
                </h3>
              </div>

              {/* Zoom Controls & Close Bar */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                {!isControlsHidden ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setModalScale((prev) => Math.max(0.6, Number((prev - 0.2).toFixed(1))))}
                      className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs flex items-center gap-1 cursor-pointer transition active:scale-95 shadow-sm"
                      title="Zoom Out (-)"
                    >
                      <ZoomOut className="w-4 h-4 text-amber-400" />
                      <span className="hidden sm:inline font-bold">-</span>
                    </button>
                    <span className="text-xs font-mono font-bold px-2 py-1 bg-slate-900 rounded-lg border border-slate-800 text-amber-300">
                      {Math.round(modalScale * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setModalScale((prev) => Math.min(4.5, Number((prev + 0.2).toFixed(1))))}
                      className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs flex items-center gap-1 cursor-pointer transition active:scale-95 shadow-sm"
                      title="Zoom In (+)"
                    >
                      <ZoomIn className="w-4 h-4 text-amber-400" />
                      <span className="hidden sm:inline font-bold">+</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetModalZoom}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs flex items-center gap-1 cursor-pointer transition"
                      title="Reset (မူလအရွယ်အစား ပြန်ထားရန်)"
                    >
                      <RotateCcw className="w-4 h-4 text-sky-400" />
                    </button>
                    {/* Hide Controls Button to prevent obscuring view */}
                    <button
                      type="button"
                      onClick={() => setIsControlsHidden(true)}
                      className="px-2 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs flex items-center gap-1 cursor-pointer transition"
                      title="ခလုတ်များ ဖျောက်ထားရန် (ရှေ့မကွယ်စေရန်)"
                    >
                      <EyeOff className="w-4 h-4 text-amber-400" />
                      <span className="text-[11px] font-bold">ဖျောက်မည်</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsControlsHidden(false)}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 text-xs flex items-center gap-1.5 cursor-pointer font-bold shadow-md animate-pulse"
                    title="+ / - ခလုတ်များ ပြန်ဖော်ရန်"
                  >
                    <Eye className="w-4 h-4 text-emerald-400" />
                    <span>+ / - ပြန်ဖော်ရန်</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetModalZoom();
                  }}
                  className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white border border-red-500 text-xs flex items-center gap-1 cursor-pointer ml-1 shadow-md"
                  title="ပိတ်ရန် (Close)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body / Scrollable Zoom Viewer with Touch Gestures */}
            <div
              className={`relative flex-1 overflow-hidden p-2 sm:p-4 flex items-center justify-center bg-slate-900/90 select-none ${
                modalScale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
              }`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Floating button when controls are hidden so it never blocks what's underneath */}
              {isControlsHidden && (
                <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsControlsHidden(false)}
                    className="px-3 py-1.5 rounded-full bg-slate-900/85 hover:bg-slate-800 text-amber-300 border border-amber-500/60 backdrop-blur-md shadow-2xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition hover:scale-105 active:scale-95"
                    title="+ / - ခလုတ်များ ပြန်ဖွင့်ရန်"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>+ / - ပြရန်</span>
                  </button>
                </div>
              )}

              {/* Hint badge on top left */}
              <div className="absolute top-3 left-3 z-20 pointer-events-none opacity-75 hover:opacity-100 transition">
                <span className="px-2.5 py-1 rounded-full bg-slate-950/70 border border-slate-800 text-[10px] text-slate-300 backdrop-blur flex items-center gap-1.5">
                  <Hand className="w-3 h-3 text-emerald-400" />
                  <span>လက်ချောင်း ၂ ချောင်းဖြင့် ဆွဲချဲ့နိုင်ပါသည် (Pinch to Zoom)</span>
                </span>
              </div>

              {/* Scalable & Pannable Image Container */}
              <div
                className="transition-transform duration-75 origin-center flex items-center justify-center max-w-full max-h-full"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${modalScale})`,
                }}
              >
                <img
                  src={activeModalImg}
                  alt={activeModalTitle}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl bg-white pointer-events-none"
                  referrerPolicy="no-referrer"
                  draggable={false}
                />
              </div>
            </div>

            {/* Modal Footer Callout */}
            <div className="px-3 sm:px-4 py-2 bg-slate-900/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px] sm:text-xs">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>စက်ရုံထုတ် မူရင်းလက်စွဲစာအုပ်ပါ မာကင်အမှတ်များအတိုင်း အတိအကျ တိုက်ဆိုင်ပါ</span>
              </span>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400">
                <span>(နှစ်ချက်ပုတ်ပါက Zoom ချဲ့နိုင်ပြီး '+ / -' ခလုတ်များကို ရှေ့မကွယ်စေရန် ဖျောက်ထားနိုင်ပါသည်)</span>
                {modalScale > 1 && (
                  <button
                    type="button"
                    onClick={resetModalZoom}
                    className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                  >
                    မူလအရွယ်ပြန်ထားရန်
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
