/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgriEngine } from '../types/engine';

export const yanmarEngines: AgriEngine[] = [
  {
    id: 'yanmar-tf120',
    brand: 'yanmar',
    brandLabel: 'YANMAR (ယန်မာ)',
    category: 'single_cylinder',
    categoryLabel: 'လက်တွန်းထွန်စက် အင်ဂျင် (1-Cyl)',
    name: 'Yanmar TF120-M',
    engineCode: 'TF120-DI',
    machineModel: 'လက်တွန်းထွန်စက် (Power Tiller) / စက်လှေ / ရေစုပ်စက်',
    horsepower: 12,
    cylinders: 1,
    displacementCc: 638,
    boreStrokeMm: '92 x 96 mm',
    coolingType: 'ရေတိုင်ကီ (Radiator / Hopper)',
    torqueSpecs: [
      {
        id: 'head-tf120',
        name: 'Cylinder Head Bolts (4 bolts)',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင် (Head Bolts ၄ လုံး)',
        socketMm: '19 mm',
        boltSize: 'M12 x 1.25',
        sequenceStage: 'အဆင့် ၃ ဆင့်ဖြင့် ဒေါင့်ဖြတ်ဆွဲရန်',
        nm: 93,
        ftlb: 69,
        kgfm: 9.5,
        notes: 'ဆီသုတ်ပြီး မျက်နှာချင်းဆိုင် ဒေါင့်ဖြတ် အညီအမျှဆွဲပါ'
      },
      {
        id: 'conrod-tf120',
        name: 'Connecting Rod Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် / ချောင်းပေါင် (Con-Rod)',
        socketMm: '14 mm (12-pt)',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 44,
        ftlb: 32.5,
        kgfm: 4.5,
        notes: 'ဗြာရင်မျက်နှာပြင်သန့်စင်ပြီး ဆီသုတ်ဆွဲပါ'
      },
      {
        id: 'main-tf120',
        name: 'Main Bearing Housing Bolts',
        burmeseName: 'မရိန်းပေါင် / ဘောအိမ်ပေါင် (Main Housing)',
        socketMm: '17 mm',
        sequenceStage: 'အညီအမျှ',
        nm: 78,
        ftlb: 58,
        kgfm: 8.0,
        notes: 'ဘောအိမ် ၄ လုံးကို အဆင့်ဆင့် ဆွဲကပ်ပါ'
      },
      {
        id: 'flywheel-tf120',
        name: 'Flywheel Nut',
        burmeseName: 'ဖလိုက်ဝှီး / ဘီးဒေါက်နပ်ကြီး (Flywheel)',
        socketMm: '36 mm',
        sequenceStage: 'အပြည့်ဆွဲရန်',
        nm: 275,
        ftlb: 203,
        kgfm: 28.0,
        notes: 'ကီးဝေးတည့်မတည့် သေချာစစ်ပြီးမှ ဆွဲပါ'
      }
    ],
    headSequence: {
      boltCount: 4,
      layoutType: 'single_4',
      order: [1, 4, 2, 3],
      stages: [
        { step: 1, description: 'အဆင့် ၁ ကနဦးညှပ်ဆွဲခြင်း', nm: 35, ftlb: 26, kgfm: 3.5 },
        { step: 2, description: 'အဆင့် ၂ ဆွဲအားမြှင့်တင်ခြင်း', nm: 65, ftlb: 48, kgfm: 6.6 },
        { step: 3, description: 'အဆင့် ၃ နောက်ဆုံးစံချိန်ပြည့်', nm: 93, ftlb: 69, kgfm: 9.5 }
      ],
      notes: '၄ လုံးတွဲ ခေါင်းဆွဲရာတွင် ဒေါင့်ဖြတ် X ပုံစံဖြင့် ၁ -> ၄ -> ၂ -> ၃ အစဉ်အတိုင်း ညီမျှစွာဆွဲရမည်'
    },
    clearances: [
      {
        id: 'valve-in-tf120',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.15 - 0.20',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: 'TDC အပိတ်တွင် ဖီးလာဂေ့ 0.18 mm ဖြင့် စံထားညှိပါ'
      },
      {
        id: 'valve-ex-tf120',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.15 - 0.20',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: '0.18 mm စံထားညှိပါ'
      },
      {
        id: 'ring-top-tf120',
        name: 'Top Ring End Gap',
        burmeseName: 'ထိပ်ကွင်း အစွန်းကြားဟခွာ',
        standardVal: '0.30 - 0.45',
        limitVal: '0.70',
        unit: 'mm',
        checkMethod: 'လိုင်နာအတွင်း ထည့်သွင်းတိုင်းတာပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '200 - 210 kgf/cm²',
      nozzlePressureBar: '196 - 206 bar',
      nozzlePressurePsi: '2,845 - 2,987 psi',
      injectionTimingBtdc: '16° - 18° BTDC (ဖလိုက်ဝှီး FID မာ့ခ်)',
      pumpType: 'Yanmar Deckel Single Plunger DI Pump',
      pumpTypeMm: 'ဆီချိန်ရှမ်ပြားဖြင့် ချိန်ညှိ',
      glowPlugSpec: 'Direct Injection (မပါရှိ)',
      nozzleHolderTorque: '25 Nm (18 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 2.8,
      engineOilGrade: 'SAE 15W-40 API CF-4',
      coolantLiters: 2.0,
      hydraulicTransmissionLiters: 5.5,
      hydraulicTransmissionGrade: 'SAE 90 Gear Oil',
      fuelTankLiters: 10.5
    },
    proTips: {
      gasketSelection: ['ယန်မာ TF တွင် စက်ရုံထုတ် သံကူဂက်စကတ်ကိုသာ အသုံးပြုသင့်ပါသည်'],
      timingGearMarks: ['ခရိုင်းနှင့် ကင်းရှပ်ဂီယာ (1-1)၊ ဘာလန်ဆာဂီယာ (2-2) မာ့ခ် တိကျစွာတိုက်ပါ'],
      workshopWarnings: ['TF အင်ဂျင်တွင် ဘာလန်ဆာဂီယာ မာ့ခ်လွဲပါက အင်ဂျင်အရမ်းတုန်ခါပြီး ကာတာကျိုးတတ်ပါသည်'],
      criticalSpecs: ['Head: 93 Nm, Con-Rod: 44 Nm, Flywheel: 275 Nm']
    }
  },
  {
    id: 'yanmar-tf140-160',
    brand: 'yanmar',
    brandLabel: 'YANMAR (ယန်မာ)',
    category: 'single_cylinder',
    categoryLabel: 'လက်တွန်းထွန်စက် အင်ဂျင် (1-Cyl)',
    name: 'Yanmar TF140-M / TF160-M',
    engineCode: 'TF140 / TF160-DI',
    machineModel: 'လက်တွန်းထွန်စက် အကြီးစား / ကုန်တင်ကားငယ်',
    horsepower: 16,
    cylinders: 1,
    displacementCc: 833,
    boreStrokeMm: '102 x 105 mm',
    coolingType: 'ရေတိုင်ကီ (Radiator)',
    torqueSpecs: [
      {
        id: 'head-tf160',
        name: 'Cylinder Head Bolts (4 bolts)',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင်',
        socketMm: '19 mm',
        boltSize: 'M12 x 1.25',
        sequenceStage: 'အဆင့် ၃ ဆင့်',
        nm: 105,
        ftlb: 77.5,
        kgfm: 10.7,
        notes: 'ဒေါင့်ဖြတ်အညီအမျှဆွဲပါ'
      },
      {
        id: 'conrod-tf160',
        name: 'Connecting Rod Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် (Con-Rod)',
        socketMm: '14 mm (12-pt)',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 49,
        ftlb: 36,
        kgfm: 5.0,
        notes: 'ဆီသုတ်ဆွဲပါ'
      },
      {
        id: 'flywheel-tf160',
        name: 'Flywheel Nut',
        burmeseName: 'ဖလိုက်ဝှီးနပ် (Flywheel)',
        socketMm: '38 mm',
        sequenceStage: 'အပြည့်',
        nm: 295,
        ftlb: 218,
        kgfm: 30.0,
        notes: 'ခရိုင်းထိပ်မကျိုးစေရန် ပေါင်ပြည့်အောင် သေချာဆွဲပါ'
      }
    ],
    headSequence: {
      boltCount: 4,
      layoutType: 'single_4',
      order: [1, 4, 2, 3],
      stages: [
        { step: 1, description: 'အဆင့် ၁', nm: 40, ftlb: 30, kgfm: 4.1 },
        { step: 2, description: 'အဆင့် ၂', nm: 75, ftlb: 55, kgfm: 7.6 },
        { step: 3, description: 'အဆင့် ၃ စံချိန်ပြည့်', nm: 105, ftlb: 77.5, kgfm: 10.7 }
      ],
      notes: 'ဒေါင့်ဖြတ်ဆွဲရမည်'
    },
    clearances: [
      {
        id: 'valve-in-tf160',
        name: 'Intake Valve Clearance',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ',
        standardVal: '0.15 - 0.20',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: '0.18 mm စံထားညှိပါ'
      },
      {
        id: 'valve-ex-tf160',
        name: 'Exhaust Valve Clearance',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ',
        standardVal: '0.15 - 0.20',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: '0.18 mm စံထားညှိပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '200 - 210 kgf/cm²',
      nozzlePressureBar: '196 - 206 bar',
      nozzlePressurePsi: '2,845 - 2,987 psi',
      injectionTimingBtdc: '17° ± 1° BTDC',
      pumpType: 'Yanmar Deckel DI Plunger Pump',
      pumpTypeMm: 'ဆီချိန်ရှမ်ပြားဖြင့် ချိန်ညှိ',
      glowPlugSpec: 'Direct Injection',
      nozzleHolderTorque: '25 Nm (18 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 3.2,
      engineOilGrade: 'SAE 15W-40 CI-4',
      coolantLiters: 2.4,
      hydraulicTransmissionLiters: 6.0,
      hydraulicTransmissionGrade: 'SAE 90 Gear Oil',
      fuelTankLiters: 11.5
    },
    proTips: {
      gasketSelection: ['TF160 တွင် အပူဒဏ်ခံနိုင်သော မူရင်းဂက်စကတ်သာ တပ်ဆင်ပါ'],
      timingGearMarks: ['ခရိုင်းနှင့် ကင်းရှပ် (1-1)၊ ဘာလန်ဆာ (2-2) မာ့ခ် သေချာတိုက်ပါ'],
      workshopWarnings: ['ဆီပန့်ရှမ်ပြား လျှော့ပါက မီးစောပြီး၊ ရှမ်ပြားထပ်ထည့်ပါက မီးနောက်ကျပါမည်'],
      criticalSpecs: ['Head: 105 Nm, Con-Rod: 49 Nm, Flywheel: 295 Nm']
    }
  },
  {
    id: 'yanmar-ef393t-ef494t',
    brand: 'yanmar',
    brandLabel: 'YANMAR (ယန်မာ)',
    category: 'tractor',
    categoryLabel: 'လယ်ယာသုံး ထွန်စက်ကြီး (Tractor)',
    name: 'Yanmar EF393T / EF494T Tractor',
    engineCode: '3TNV88-B / 4TNV88-B (Turbo)',
    machineModel: 'Yanmar EF393T (39HP) & EF494T (49HP) 4WD',
    horsepower: 49,
    cylinders: 4,
    displacementCc: 2189,
    boreStrokeMm: '88 x 90 mm',
    coolingType: 'ရေလည်စနစ် + တာဘို',
    torqueSpecs: [
      {
        id: 'head-ef494',
        name: 'Cylinder Head Bolts (18 bolts M10)',
        burmeseName: 'TNV88 ဆလင်ဒါခေါင်းဆွဲပေါင် (Head Bolts)',
        socketMm: '14 mm (12-pt)',
        boltSize: 'M10 x 1.25',
        sequenceStage: 'အဆင့် ၃ ဆင့်ဖြင့် ဆွဲပါ',
        nm: 88,
        ftlb: 65,
        kgfm: 9.0,
        notes: 'အလယ်ဗဟိုမှ အပြင်သို့ ခရုပတ်ပုံစံ ညီမျှစွာဆွဲရမည်'
      },
      {
        id: 'conrod-ef494',
        name: 'Connecting Rod Cap Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် (Con-Rod Cap)',
        socketMm: '12 mm (12-pt)',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 49,
        ftlb: 36,
        kgfm: 5.0,
        notes: 'ချောင်းနံပါတ် တိုက်ဆိုင်ပြီး ဆီသုတ်ဆွဲပါ'
      },
      {
        id: 'main-ef494',
        name: 'Main Bearing Cap Bolts',
        burmeseName: 'မရိန်းပေါင် (Main Bearing Bolts)',
        socketMm: '17 mm',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 98,
        ftlb: 72,
        kgfm: 10.0,
        notes: 'မရိန်းခွံ ၅ ခု အစဉ်လိုက်ဆွဲပါ'
      },
      {
        id: 'flywheel-ef494',
        name: 'Flywheel Bolts (6 bolts)',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel)',
        socketMm: '17 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်',
        nm: 85,
        ftlb: 63,
        kgfm: 8.7,
        notes: 'Thread Locker အသုံးပြုပါ'
      },
      {
        id: 'pulley-ef494',
        name: 'Crankshaft Pulley Bolt',
        burmeseName: 'ခရိုင်းပူလီပေါင် (Pulley Bolt)',
        socketMm: '27 mm',
        sequenceStage: 'အပြည့်',
        nm: 118,
        ftlb: 87,
        kgfm: 12.0,
        notes: 'ပူလီလော့မချောင်စေရန် သေချာဆွဲပါ'
      }
    ],
    headSequence: {
      boltCount: 18,
      layoutType: 'inline_18',
      order: [10, 4, 1, 5, 9, 14, 18, 15, 11, 7, 2, 3, 6, 8, 12, 16, 17, 13],
      stages: [
        { step: 1, description: 'အဆင့် ၁', nm: 35, ftlb: 26, kgfm: 3.5 },
        { step: 2, description: 'အဆင့် ၂', nm: 65, ftlb: 48, kgfm: 6.6 },
        { step: 3, description: 'အဆင့် ၃ စံချိန်ပြည့်', nm: 88, ftlb: 65, kgfm: 9.0 }
      ],
      notes: 'အလယ်အမှတ် (၁) မှ စတင်၍ အပြင်သို့ စက်ဝိုင်းပုံစံ ဆွဲပါ'
    },
    clearances: [
      {
        id: 'valve-in-ef494',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.15 - 0.25',
        limitVal: '0.30',
        unit: 'mm',
        checkMethod: '0.20 mm စံထားညှိပါ'
      },
      {
        id: 'valve-ex-ef494',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.15 - 0.25',
        limitVal: '0.30',
        unit: 'mm',
        checkMethod: '0.20 mm စံထားညှိပါ'
      },
      {
        id: 'crank-end-ef494',
        name: 'Crankshaft End Play',
        burmeseName: 'ခရိုင်းရှပ် ရှေ့နောက် လှုပ်ရှားခွင့်',
        standardVal: '0.14 - 0.28',
        limitVal: '0.40',
        unit: 'mm',
        checkMethod: 'Thrust metal တိုင်းတာပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '220 - 230 kgf/cm²',
      nozzlePressureBar: '216 - 226 bar',
      nozzlePressurePsi: '3,129 - 3,271 psi',
      injectionTimingBtdc: '15° - 17° BTDC',
      pumpType: 'Yanmar MP4 Distributor Type Injection Pump',
      pumpTypeMm: 'ဆီပန့်ကိုယ်ထည် လှည့်၍ မီးချိန်ညှိ',
      glowPlugSpec: '11V, 0.8 Ohm Quick Glow',
      nozzleHolderTorque: '44 Nm (32.5 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 7.4,
      engineOilGrade: 'SAE 15W-40 CI-4/CJ-4',
      coolantLiters: 6.8,
      hydraulicTransmissionLiters: 34.0,
      hydraulicTransmissionGrade: 'Yanmar TF500 / Super Hydro Fluid',
      fuelTankLiters: 40.0
    },
    proTips: {
      gasketSelection: ['4TNV88 တွင် ပစ်စတင်အမြင့်တိုင်းတာ၍ အထူအပါး Notch (1/2/3) မှန်ကန်စွာရွေးပါ'],
      timingGearMarks: ['ခရိုင်း (A) - အိုင်ဒလာ (A-A)၊ ကင်းရှပ် (B) - အိုင်ဒလာ (B-B)၊ MP4 ပန့် (C) - အိုင်ဒလာ (C-C)'],
      workshopWarnings: ['Yanmar MP4 ပန့်တပ်ဆင်ရာတွင် ပန့်ရှပ်ကီး မပြုတ်ကျစေရန် အထူးသတိပြုပါ'],
      criticalSpecs: ['Head: 88 Nm, Con-Rod: 49 Nm, Main: 98 Nm']
    }
  },
  {
    id: 'yanmar-aw70-aw82',
    brand: 'yanmar',
    brandLabel: 'YANMAR (ယန်မာ)',
    category: 'harvester',
    categoryLabel: 'စပါးရိတ်ခြွေစက် အင်ဂျင် (Harvester)',
    name: 'Yanmar AW70V / AW82V Harvester',
    engineCode: '4TNV98-E (Direct Injection)',
    machineModel: 'Yanmar AW70V & AW82V Combine Harvester',
    horsepower: 82,
    cylinders: 4,
    displacementCc: 3319,
    boreStrokeMm: '98 x 110 mm',
    coolingType: 'ရေလည်စနစ် (Water-cooled Heavy Duty)',
    torqueSpecs: [
      {
        id: 'head-aw82',
        name: 'Cylinder Head Bolts (18 bolts M11)',
        burmeseName: 'TNV98 ဆလင်ဒါခေါင်းဆွဲပေါင်',
        socketMm: '14 mm (12-pt)',
        boltSize: 'M11 x 1.25',
        sequenceStage: 'အဆင့် ၃ ဆင့်',
        nm: 103,
        ftlb: 76,
        kgfm: 10.5,
        notes: 'အလယ်ဗဟိုမှ စတင်၍ ခရုပတ်ပုံစံ ဆွဲပါ'
      },
      {
        id: 'conrod-aw82',
        name: 'Connecting Rod Cap Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် (Con-Rod)',
        socketMm: '14 mm (12-pt)',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 54,
        ftlb: 40,
        kgfm: 5.5,
        notes: 'ဆီသုတ်ဆွဲပါ'
      },
      {
        id: 'main-aw82',
        name: 'Main Bearing Cap Bolts',
        burmeseName: 'မရိန်းပေါင် (Main Bearing)',
        socketMm: '17 mm',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 108,
        ftlb: 80,
        kgfm: 11.0,
        notes: 'ခရိုင်းမရိန်းအိမ်ဆွဲပေါင်'
      },
      {
        id: 'flywheel-aw82',
        name: 'Flywheel Bolts',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel)',
        socketMm: '17 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်',
        nm: 103,
        ftlb: 76,
        kgfm: 10.5,
        notes: 'Thread locker သုံးပါ'
      }
    ],
    headSequence: {
      boltCount: 18,
      layoutType: 'inline_18',
      order: [10, 4, 1, 5, 9, 14, 18, 15, 11, 7, 2, 3, 6, 8, 12, 16, 17, 13],
      stages: [
        { step: 1, description: 'အဆင့် ၁', nm: 45, ftlb: 33, kgfm: 4.6 },
        { step: 2, description: 'အဆင့် ၂', nm: 75, ftlb: 55, kgfm: 7.6 },
        { step: 3, description: 'အဆင့် ၃ စံချိန်ပြည့်', nm: 103, ftlb: 76, kgfm: 10.5 }
      ],
      notes: 'အလယ်မှစ၍ အပြင်သို့ စက်ဝိုင်းပုံစံ ဆွဲပါ'
    },
    clearances: [
      {
        id: 'valve-in-aw82',
        name: 'Intake Valve Clearance',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (Cold)',
        standardVal: '0.15 - 0.25',
        limitVal: '0.30',
        unit: 'mm',
        checkMethod: '0.20 mm စံထားညှိပါ'
      },
      {
        id: 'valve-ex-aw82',
        name: 'Exhaust Valve Clearance',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (Cold)',
        standardVal: '0.15 - 0.25',
        limitVal: '0.30',
        unit: 'mm',
        checkMethod: '0.20 mm စံထားညှိပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '220 - 230 kgf/cm²',
      nozzlePressureBar: '216 - 226 bar',
      nozzlePressurePsi: '3,129 - 3,271 psi',
      injectionTimingBtdc: '15° - 17° BTDC',
      pumpType: 'Yanmar MP4 High Pressure Distributor Pump',
      pumpTypeMm: 'ချိန်ညှိတိုက်ရိုက်',
      glowPlugSpec: '11V, 0.8 Ohm',
      nozzleHolderTorque: '44 Nm (32.5 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 10.5,
      engineOilGrade: 'SAE 15W-40 CI-4 Heavy Duty Diesel',
      coolantLiters: 10.0,
      hydraulicTransmissionLiters: 36.0,
      hydraulicTransmissionGrade: 'Yanmar TF500 / HST Fluid',
      fuelTankLiters: 80.0
    },
    proTips: {
      gasketSelection: ['TNV98 တွင် စက်ရုံထုတ် Metal Head Gasket အသုံးပြုပါ'],
      timingGearMarks: ['ခရိုင်း (A)၊ ကင်းရှပ် (B)၊ ဆီပန့် (C) မာ့ခ်များ အိုင်ဒလာဂီယာနှင့် ကွက်တိတိုက်ပါ'],
      workshopWarnings: ['ရိတ်ခြွေစက် HST ဆီစစ်ဘူး ၃၀၀ နာရီပြည့်တိုင်း မဖြစ်မနေလဲလှယ်ပါ'],
      criticalSpecs: ['Head: 103 Nm, Con-Rod: 54 Nm, Main: 108 Nm']
    }
  }
];
