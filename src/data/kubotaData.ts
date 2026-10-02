/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgriEngine } from '../types/engine';

export const kubotaEngines: AgriEngine[] = [
  {
    id: 'kubota-rt120',
    brand: 'kubota',
    brandLabel: 'KUBOTA (ကူဘိုတာ)',
    category: 'single_cylinder',
    categoryLabel: 'လက်တွန်းထွန်စက် အင်ဂျင် (1-Cyl)',
    name: 'Kubota RT120 Plus',
    engineCode: 'RT120-DI',
    machineModel: 'လက်တွန်းထွန်စက် (Power Tiller) / ရေစုပ်စက်',
    horsepower: 12,
    cylinders: 1,
    displacementCc: 676,
    boreStrokeMm: '94 x 90 mm',
    coolingType: 'ရေတိုင်ကီ (Radiator / Hopper)',
    torqueSpecs: [
      {
        id: 'head-rt120',
        name: 'Cylinder Head Bolts',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင် (Head Bolts)',
        socketMm: '19 mm',
        boltSize: 'M12 x 1.25',
        sequenceStage: 'အဆင့် (၃) ဆင့်ဖြင့် ညီမျှစွာဆွဲရန်',
        nm: 98,
        ftlb: 72,
        kgfm: 10.0,
        degrees: 'မလို (Torque wrench တိုက်ရိုက်)',
        notes: 'ဆီသုတ်ပြီး ခေါင်း ၄ လုံးကို မျက်နှာချင်းဆိုင် ဒေါင့်ဖြတ် အဆင့် ၃ ဆင့်ဖြင့် ဆွဲပါ'
      },
      {
        id: 'conrod-rt120',
        name: 'Connecting Rod Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် / ချောင်းပေါင် (Con-Rod)',
        socketMm: '14 mm (12-pt)',
        boltSize: 'M10 x 1.0',
        sequenceStage: 'အဆင့် (၂) ဆင့်',
        nm: 49,
        ftlb: 36,
        kgfm: 5.0,
        notes: 'ဝပ်ရှော့သုံး အင်ဂျင်ဝိုင်သုတ်ဆွဲပါ။ ကွန်ရော့အပေါက် မျက်နှာမူ မှန်ကန်စေရန် စစ်ပါ'
      },
      {
        id: 'main-rt120',
        name: 'Main Bearing Housing Bolts',
        burmeseName: 'မရိန်းပေါင် / ခရိုင်းအိမ်ပေါင် (Main Housing)',
        socketMm: '17 mm',
        sequenceStage: 'အဆင့် (၂) ဆင့်',
        nm: 78,
        ftlb: 58,
        kgfm: 8.0,
        notes: 'ဘောစေ့/ရိုလာ ဗြာရင်အထိုင်ကို အညီအမျှ ဆွဲကပ်ပါ'
      },
      {
        id: 'flywheel-rt120',
        name: 'Flywheel Nut / Bolt',
        burmeseName: 'ဖလိုက်ဝှီး / ဘီးဒေါက်နပ်ကြီး (Flywheel)',
        socketMm: '36 mm',
        sequenceStage: 'အဆင့် (၁) ဆင့် အပြည့်',
        nm: 294,
        ftlb: 217,
        kgfm: 30.0,
        notes: 'ကီးဝေး (Keyway) သေချာထိုင်မှ ဆွဲပါ။ Thread Locker အပြာ သုံးနိုင်သည်'
      },
      {
        id: 'injector-rt120',
        name: 'Injector Holder Nut',
        burmeseName: 'နိုဇယ်ခေါင်းထိန်းနပ် (Nozzle Holder)',
        socketMm: '17 mm',
        sequenceStage: 'အညီအမျှ ညှပ်ဆွဲရန်',
        nm: 25,
        ftlb: 18,
        kgfm: 2.5,
        notes: 'ကြေးဝါရှာ (Copper washer) အသစ်လဲပြီးမှ ဆွဲပါ'
      }
    ],
    headSequence: {
      boltCount: 4,
      layoutType: 'single_4',
      order: [1, 4, 2, 3],
      stages: [
        { step: 1, description: 'ကနဦး ပေါ့ပေါ့ပါးပါး ညှပ်ဆွဲခြင်း', nm: 35, ftlb: 26, kgfm: 3.5 },
        { step: 2, description: 'ဒုတိယအဆင့် ဆွဲအားမြှင့်ခြင်း', nm: 70, ftlb: 52, kgfm: 7.1 },
        { step: 3, description: 'နောက်ဆုံး စံချိန်ပြည့်ဆွဲခြင်း', nm: 98, ftlb: 72, kgfm: 10.0 }
      ],
      notes: '၄ လုံးတွဲ ခေါင်းဆွဲရာတွင် ဒေါင့်ဖြတ် X ပုံစံဖြင့် ၁ -> ၄ -> ၂ -> ၃ အစဉ်အတိုင်း ညီမျှစွာဆွဲရမည်'
    },
    clearances: [
      {
        id: 'valve-in-rt120',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အင်ဂျင်အေးချိန်)',
        standardVal: '0.18 - 0.22',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: 'TDC (Top Dead Center) အပိတ်ချိန်တွင် ဖီးလာဂေ့ဖြင့် တိုင်းရန်'
      },
      {
        id: 'valve-ex-rt120',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အင်ဂျင်အေးချိန်)',
        standardVal: '0.18 - 0.22',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: 'ဖီးလာဂေ့ 0.20 mm ချောချောမွေ့မွေ့ ဝင်ထွက်နိုင်ရမည်'
      },
      {
        id: 'ring-gap-top-rt120',
        name: 'Top Compression Ring End Gap',
        burmeseName: 'ထိပ်ဆုံးကွင်း အစွန်းနှစ်ဖက်ကြားဟခွာ (Top Ring Gap)',
        standardVal: '0.30 - 0.45',
        limitVal: '0.70',
        unit: 'mm',
        checkMethod: 'ပစ်စတင်ဖြင့် လိုင်နာအတွင်း ၁၅ မီလီမီတာ တွန်းထည့်၍ တိုင်းပါ'
      },
      {
        id: 'ring-gap-2nd-rt120',
        name: '2nd Compression Ring Gap',
        burmeseName: 'ဒုတိယဆီကွင်း အစွန်းကြားဟခွာ',
        standardVal: '0.30 - 0.45',
        limitVal: '0.70',
        unit: 'mm',
        checkMethod: 'စံချိန်ထက် ပိုဟနေပါက မီးခိုးဖြူထွက်ပြီး ဆီစားမည်'
      },
      {
        id: 'piston-liner-rt120',
        name: 'Piston to Cylinder Liner Gap',
        burmeseName: 'ပစ်စတင်နှင့် လိုင်နာကြား ကွာဟချက်',
        standardVal: '0.045 - 0.085',
        limitVal: '0.20',
        unit: 'mm',
        checkMethod: 'ပစ်စတင်စကတ်အောက်နား 90 ဒီဂရီတွင် မိုက်ခရိုမီတာဖြင့် တိုင်းပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '200 - 210 kgf/cm²',
      nozzlePressureBar: '196 - 206 bar',
      nozzlePressurePsi: '2,845 - 2,987 psi',
      injectionTimingBtdc: '17° - 19° BTDC (ဖလိုင်းဝှီး မာ့ခ် 18°)',
      pumpType: 'Kubota Bosch K-Type Single Plunger',
      pumpTypeMm: 'ရှမ်ပြား (Shims) ထူ/ပါးဖြင့် မီးချိန်ညှိရသည်',
      glowPlugSpec: 'မပါရှိ (Direct Injection အလွယ်တကူ နှိုးနိုင်သောစနစ်)',
      nozzleHolderTorque: '25 Nm (18 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 2.8,
      engineOilGrade: 'SAE 15W-40 API CF-4/CH-4',
      coolantLiters: 2.1,
      hydraulicTransmissionLiters: 5.5,
      hydraulicTransmissionGrade: 'SAE 90 / 80W-90 Gear Oil',
      fuelTankLiters: 11.0
    },
    proTips: {
      gasketSelection: [
        'ခေါင်းဂက်စကတ် မူရင်းကြေးနီ သို့မဟုတ် သံကူဂက်စကတ်ကိုသာ သုံးပါ',
        'ဂက်စကတ်တပ်ဆင်ရာတွင် အင်ဂျင်ဝိုင် မသုတ်ဘဲ သန့်ရှင်းခြောက်သွေ့စွာ တပ်ဆင်ရမည်'
      ],
      timingGearMarks: [
        'ခရိုင်းဂီယာ မာ့ခ် (1) နှင့် ကင်းရှပ်ဂီယာ မာ့ခ် (1-1) တိုက်ပါ',
        'ဘာလန်ဆာရှပ် (Balancer Gear) မာ့ခ် (2) နှင့် (2-2) ကို ကွက်တိတိုက်ရမည် (မတိုက်ပါက စက်အရမ်းတုန်မည်)'
      ],
      workshopWarnings: [
        'ခရိုင်းဝိတ်နှင့် ဖလိုက်ဝှီး တပ်ဆင်ရာတွင် ကီးဝေးမလွဲစေရန် အထူးသတိပြုပါ',
        'နိုဇယ်ခေါင်း ဆီမဖြန်းမီ လေခိုနေပါက ပိုက်ခေါင်းကို အနည်းငယ်လျော့၍ လေထုတ်ပါ'
      ],
      criticalSpecs: [
        'ကွန်ရော့ပေါင် 49 Nm ထက် မကျော်ရ၊ မလျော့ရ',
        'ဆလင်ဒါခေါင်းဆွဲပေါင် 98 Nm ကို စက်ဆင်ပြီး ၂ ပတ်အကြာတွင် ပြန်လည်စစ်ဆေးဆွဲသင့်ပါသည်'
      ]
    }
  },
  {
    id: 'kubota-rt140-160',
    brand: 'kubota',
    brandLabel: 'KUBOTA (ကူဘိုတာ)',
    category: 'single_cylinder',
    categoryLabel: 'လက်တွန်းထွန်စက် အင်ဂျင် (1-Cyl)',
    name: 'Kubota RT140 Plus / RT160 Thunder',
    engineCode: 'RT140 / RT160-DI',
    machineModel: 'လက်တွန်းထွန်စက် အကြီးစား / ရေတင်စက်ကြီး',
    horsepower: 14,
    cylinders: 1,
    displacementCc: 709,
    boreStrokeMm: '97 x 96 mm',
    coolingType: 'ရေတိုင်ကီ (Radiator Plus)',
    torqueSpecs: [
      {
        id: 'head-rt140',
        name: 'Cylinder Head Bolts',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင် (Head Bolts)',
        socketMm: '19 mm',
        boltSize: 'M12 x 1.25',
        sequenceStage: 'အဆင့် (၃) ဆင့်',
        nm: 108,
        ftlb: 80,
        kgfm: 11.0,
        notes: 'အဆင့် ၁: 40 Nm -> အဆင့် ၂: 75 Nm -> အဆင့် ၃: 108 Nm'
      },
      {
        id: 'conrod-rt140',
        name: 'Connecting Rod Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် (Con-Rod Cap)',
        socketMm: '14 mm (12-pt)',
        boltSize: 'M10 x 1.0',
        sequenceStage: 'အဆင့် (၂) ဆင့်',
        nm: 54,
        ftlb: 40,
        kgfm: 5.5,
        notes: 'ဗြာရင်အထိုင်ကို ဆီသုတ်ပြီး အညီဆွဲပါ'
      },
      {
        id: 'main-rt140',
        name: 'Main Bearing Housing Bolts',
        burmeseName: 'မရိန်းပေါင် / ခရိုင်းအိမ် (Main Bearing)',
        socketMm: '17 mm',
        sequenceStage: 'အဆင့် (၂) ဆင့်',
        nm: 85,
        ftlb: 63,
        kgfm: 8.7,
        notes: 'Housing Bolt ၄ လုံး ညီညာစွာဆွဲပါ'
      },
      {
        id: 'flywheel-rt140',
        name: 'Flywheel Nut',
        burmeseName: 'ဖလိုက်ဝှီးနပ်ကြီး (Flywheel Nut)',
        socketMm: '38 mm / 41 mm',
        sequenceStage: 'အပြည့်ဆွဲရန်',
        nm: 314,
        ftlb: 232,
        kgfm: 32.0,
        notes: 'လုံခြုံရေး လော့ကင်းဝါရှာ (Lock Washer) ကို သေချာခေါက်တင်ပါ'
      }
    ],
    headSequence: {
      boltCount: 4,
      layoutType: 'single_4',
      order: [1, 4, 2, 3],
      stages: [
        { step: 1, description: 'ကနဦး ညှပ်ဆွဲခြင်း', nm: 40, ftlb: 30, kgfm: 4.1 },
        { step: 2, description: 'အလယ်အလတ် ဆွဲအား', nm: 75, ftlb: 55, kgfm: 7.6 },
        { step: 3, description: 'နောက်ဆုံး စံချိန်ပြည့်ဆွဲခြင်း', nm: 108, ftlb: 80, kgfm: 11.0 }
      ],
      notes: 'ဒေါင့်ဖြတ် အပြန်အလှန်ဆွဲရမည်။'
    },
    clearances: [
      {
        id: 'valve-in-rt140',
        name: 'Intake Valve Clearance',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ',
        standardVal: '0.18 - 0.22',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: 'အင်ဂျင်အေးချိန် TDC တွင်တိုင်းပါ'
      },
      {
        id: 'valve-ex-rt140',
        name: 'Exhaust Valve Clearance',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ',
        standardVal: '0.18 - 0.22',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: 'အင်ဂျင်အေးချိန် TDC တွင်တိုင်းပါ'
      },
      {
        id: 'ring-gap-top-rt140',
        name: 'Top Ring End Gap',
        burmeseName: 'ထိပ်ကွင်း အစွန်းဟခွာ',
        standardVal: '0.35 - 0.50',
        limitVal: '0.75',
        unit: 'mm',
        checkMethod: 'လိုင်နာအသစ်ထည့်တိုင်း သေချာတိုင်းဆစ်ပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '200 - 210 kgf/cm²',
      nozzlePressureBar: '196 - 206 bar',
      nozzlePressurePsi: '2,845 - 2,987 psi',
      injectionTimingBtdc: '18° ± 1° BTDC',
      pumpType: 'Kubota Direct Injection Plunger Pump',
      pumpTypeMm: 'ဆီချိန်ရှမ်ပြား 0.15mm, 0.20mm ဖြင့် မီးချိန်ညှိ',
      glowPlugSpec: 'Direct Injection (မပါရှိ)',
      nozzleHolderTorque: '25 Nm (18 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 3.0,
      engineOilGrade: 'SAE 15W-40 CI-4',
      coolantLiters: 2.3,
      hydraulicTransmissionLiters: 6.0,
      hydraulicTransmissionGrade: 'SAE 90 Gear Oil',
      fuelTankLiters: 11.5
    },
    proTips: {
      gasketSelection: ['RT140 နှင့် RT160 တို့တွင် လိုင်နာအထိုင် 0.05~0.10mm မြင့်မားမှုရှိမရှိ တိုင်းပါ'],
      timingGearMarks: ['ခရိုင်းနှင့် ကင်းရှပ် (1-1)၊ ဘာလန်ဆာဂီယာ (2-2) မာ့ခ် မလွဲစေရ'],
      workshopWarnings: ['ဘီးဒေါက်နပ် မတင်းပါက ခရိုင်းထိပ်ဖျားကျိုးတတ်ပါသည်'],
      criticalSpecs: ['Head Bolt: 108 Nm, Con-Rod: 54 Nm']
    }
  },
  {
    id: 'kubota-l3408',
    brand: 'kubota',
    brandLabel: 'KUBOTA (ကူဘိုတာ)',
    category: 'tractor',
    categoryLabel: 'လယ်ယာသုံး ထွန်စက်ကြီး (Tractor)',
    name: 'Kubota L3408 Tractor',
    engineCode: 'D1703-M (3-Cylinder)',
    machineModel: 'Kubota 34HP Tractor 4WD',
    horsepower: 34,
    cylinders: 3,
    displacementCc: 1647,
    boreStrokeMm: '87 x 92.4 mm',
    coolingType: 'ရေလည်စနစ် (Water-cooled + Fan)',
    torqueSpecs: [
      {
        id: 'head-l3408',
        name: 'Cylinder Head Bolts (14 bolts)',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင် (Head Bolts)',
        socketMm: '14 mm (Bi-Hex 12-pt)',
        boltSize: 'M11 x 1.25',
        sequenceStage: 'အဆင့် ၃ ဆင့်ဖြင့် ဆွဲပါ',
        nm: 98,
        ftlb: 72,
        kgfm: 10.0,
        degrees: 'သတ်မှတ်ပေါင်ပြည့်ပါက ထပ်မံဆွဲရန်မလို',
        notes: 'အလယ်ဗဟိုမှ စတင်၍ ခရုပတ်ပုံစံ (Spiral Sequence) အပြင်သို့ အဆင့် ၃ ဆင့်ဖြင့် ဆွဲပါ'
      },
      {
        id: 'conrod-l3408',
        name: 'Connecting Rod Cap Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် / ချောင်းပေါင် (Con-Rod)',
        socketMm: '14 mm (12-pt)',
        boltSize: 'M9 x 1.0',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 44,
        ftlb: 32.5,
        kgfm: 4.5,
        notes: 'ချောင်းအမှတ်စဉ် ၁၊ ၂၊ ၃ အမှတ်မမှားစေရန်နှင့် oil hole မျက်နှာမူ တိုက်ပါ'
      },
      {
        id: 'main-l3408',
        name: 'Main Bearing Case Bolts',
        burmeseName: 'မရိန်းပေါင် (Main Bearing Case)',
        socketMm: '17 mm',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 73,
        ftlb: 54,
        kgfm: 7.4,
        notes: 'Case 1 နှင့် Case 2 မရိန်းခွံများကို အစဉ်လိုက် ဆွဲပါ'
      },
      {
        id: 'flywheel-l3408',
        name: 'Flywheel Bolts (6 bolts)',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel Bolts)',
        socketMm: '17 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်အညီအမျှ',
        nm: 103,
        ftlb: 76,
        kgfm: 10.5,
        notes: 'Thread locker သုတ်ပြီး ဒေါင့်ဖြတ်အပြန်အလှန် ဆွဲရမည်'
      },
      {
        id: 'pulley-l3408',
        name: 'Crankshaft Pulley Bolt',
        burmeseName: 'ခရိုင်းပူလီပေါင် (Crankshaft Pulley)',
        socketMm: '27 mm',
        sequenceStage: 'တစ်ကြိမ်တည်း အပြည့်',
        nm: 157,
        ftlb: 116,
        kgfm: 16.0,
        notes: 'ပူလီလော့ကီး မကျိုးစေရန် ပေါင်ပြည့်အောင် ဆွဲပါ'
      },
      {
        id: 'injector-l3408',
        name: 'Injector Nozzle Holder',
        burmeseName: 'နိုဇယ်ခေါင်းပေါင် (Injector)',
        socketMm: '21 mm Deep Socket',
        sequenceStage: 'တိုက်ရိုက်',
        nm: 54,
        ftlb: 40,
        kgfm: 5.5,
        notes: 'ကြေးဝါရှာအသစ်လဲပါ'
      }
    ],
    headSequence: {
      boltCount: 14,
      layoutType: 'inline_14',
      order: [8, 4, 1, 5, 9, 12, 14, 10, 6, 2, 3, 7, 11, 13],
      stages: [
        { step: 1, description: 'အဆင့် (၁) ကနဦးဆွဲအား', nm: 40, ftlb: 29.5, kgfm: 4.1 },
        { step: 2, description: 'အဆင့် (၂) အလယ်အလတ်', nm: 70, ftlb: 51.6, kgfm: 7.1 },
        { step: 3, description: 'အဆင့် (၃) နောက်ဆုံးစံချိန်', nm: 98, ftlb: 72.3, kgfm: 10.0 }
      ],
      notes: 'ဆလင်ဒါခေါင်း အလယ်ဗဟိုမှ စတင်ကာ ဘေးနှစ်ဖက်သို့ အစီအစဉ်အတိုင်း တဆင့်ချင်း ဆွဲရမည်။'
    },
    clearances: [
      {
        id: 'valve-in-l3408',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.18 - 0.22',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: 'Piston TDC အပိတ်ချိန်တွင် ဖီးလာဂေ့ဖြင့် ညှိပါ'
      },
      {
        id: 'valve-ex-l3408',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.18 - 0.22',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: '0.20 mm စံထားညှိပါ'
      },
      {
        id: 'ring-top-l3408',
        name: 'Top Ring End Gap',
        burmeseName: 'ထိပ်ကွင်း အစွန်းဟခွာ',
        standardVal: '0.25 - 0.40',
        limitVal: '0.70',
        unit: 'mm',
        checkMethod: 'လိုင်နာထိပ်ပိုင်းအောက် ၂၀ မီလီမီတာတွင် တိုင်းပါ'
      },
      {
        id: 'crank-end-l3408',
        name: 'Crankshaft End Play',
        burmeseName: 'ခရိုင်းရှပ် ရှေ့နောက် လှုပ်ရှားခွင့် (Thrust)',
        standardVal: '0.15 - 0.31',
        limitVal: '0.50',
        unit: 'mm',
        checkMethod: 'ဒိုင်ခွက်ဂေ့ (Dial gauge) ဖြင့် ရှေ့နောက်တွန်းတိုင်းပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '140 - 150 kgf/cm²',
      nozzlePressureBar: '137 - 147 bar',
      nozzlePressurePsi: '1,991 - 2,133 psi',
      injectionTimingBtdc: '17° - 19° BTDC',
      pumpType: 'Bosch MD Mini In-line Pump',
      pumpTypeMm: 'ဂက်စကတ်ရှမ်ပြား ထူ/ပါးဖြင့် မီးချိန်ညှိ',
      glowPlugSpec: '11V, 0.9 - 1.1 Ohm (အပူပေးပလပ်)',
      nozzleHolderTorque: '54 Nm (40 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 5.7,
      engineOilGrade: 'SAE 15W-40 CI-4/CH-4',
      coolantLiters: 5.5,
      hydraulicTransmissionLiters: 27.5,
      hydraulicTransmissionGrade: 'Kubota Super UDT / UDT Hydraulic Fluid',
      fuelTankLiters: 34.0
    },
    proTips: {
      gasketSelection: [
        'ပစ်စတင်ထိပ်ထွက်မှု (Piston Protrusion) ကို ဒိုင်ခွက်ဂေ့ဖြင့် တိုင်းပါ',
        '0.55 ~ 0.70mm ရှိပါက Notch 1 (1.15mm)၊ 0.71 ~ 0.85mm ရှိပါက Notch 2 (1.25mm) ရွေးပါ'
      ],
      timingGearMarks: [
        'Crank Gear (1) နှင့် Idle Gear (1-1) တိုက်ပါ',
        'Cam Gear (2) နှင့် Idle Gear (2-2) တိုက်ပါ',
        'Injection Pump Gear (3) နှင့် Idle Gear (3-3) တိုက်ပါ'
      ],
      workshopWarnings: [
        'ဂီယာနှင့် ဟိုက်ဒရောလစ်ဆီတွင် ကားသုံးအင်ဂျင်ဝိုင် လုံးဝ မထည့်ရ (Super UDT သာ သုံးရန်)',
        'ခေါင်းဆွဲပေါင် 98 Nm ထက် မကျော်ရ'
      ],
      criticalSpecs: [
        'Head: 98 Nm, Con-Rod: 44 Nm, Main: 73 Nm, Flywheel: 103 Nm'
      ]
    }
  },
  {
    id: 'kubota-l4508-l5018',
    brand: 'kubota',
    brandLabel: 'KUBOTA (ကူဘိုတာ)',
    category: 'tractor',
    categoryLabel: 'လယ်ယာသုံး ထွန်စက်ကြီး (Tractor)',
    name: 'Kubota L4508 / L5018 Tractor',
    engineCode: 'V2203-M / V2403-M-DI (4-Cylinder)',
    machineModel: 'Kubota L4508 (45HP) & L5018 (50HP) 4WD',
    horsepower: 50,
    cylinders: 4,
    displacementCc: 2434,
    boreStrokeMm: '87 x 102.4 mm',
    coolingType: 'ရေလည်စနစ် (Water-cooled)',
    torqueSpecs: [
      {
        id: 'head-l5018',
        name: 'Cylinder Head Bolts (18 bolts)',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင် (Head Bolts 18 လုံး)',
        socketMm: '14 mm (Bi-Hex 12-pt)',
        boltSize: 'M11 x 1.25',
        sequenceStage: 'အဆင့် ၃ ဆင့်ဖြင့် ဆွဲပါ',
        nm: 103,
        ftlb: 76,
        kgfm: 10.5,
        degrees: 'သတ်မှတ်ပေါင်အပြည့်',
        notes: 'အလယ်မှစ၍ အပြင်သို့ စက်ဝိုင်းပုံစံ ဆွဲရမည်။ အသစ်ဆင်ပါက အင်ဂျင်ဝိုင်ပါးပါးသုတ်ပါ'
      },
      {
        id: 'conrod-l5018',
        name: 'Connecting Rod Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် (Con-Rod Cap)',
        socketMm: '14 mm (12-pt)',
        boltSize: 'M9 x 1.0',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 44,
        ftlb: 32.5,
        kgfm: 4.5,
        notes: 'ဆွဲအား 44 Nm စံသတ်မှတ်ချက်အတိအကျဆွဲပါ'
      },
      {
        id: 'main-l5018',
        name: 'Main Bearing Case Bolts',
        burmeseName: 'မရိန်းပေါင် (Main Bearing Case)',
        socketMm: '17 mm',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 73,
        ftlb: 54,
        kgfm: 7.4,
        notes: 'ခရိုင်းမရိန်းအိမ် ၅ လုံးကို အညီအမျှဆွဲပါ'
      },
      {
        id: 'flywheel-l5018',
        name: 'Flywheel Bolts (6 bolts)',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel)',
        socketMm: '17 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်',
        nm: 103,
        ftlb: 76,
        kgfm: 10.5,
        notes: 'Locktite Thread Locker အသုံးပြုပါ'
      },
      {
        id: 'pulley-l5018',
        name: 'Crankshaft Pulley Bolt',
        burmeseName: 'ခရိုင်းပူလီပေါင် (Pulley Bolt)',
        socketMm: '27 mm',
        sequenceStage: 'အပြည့်',
        nm: 157,
        ftlb: 116,
        kgfm: 16.0,
        notes: 'မချောင်စေရန် သေချာဆွဲပါ'
      },
      {
        id: 'injector-l5018',
        name: 'Injector Clamp Bolt',
        burmeseName: 'နိုဇယ်ညှပ်ပေါင် (Nozzle Clamp)',
        socketMm: '12 mm',
        sequenceStage: 'တိုက်ရိုက်',
        nm: 26,
        ftlb: 19,
        kgfm: 2.6,
        notes: 'ကြေးရှာအသစ်လဲပါ'
      }
    ],
    headSequence: {
      boltCount: 18,
      layoutType: 'inline_18',
      order: [10, 4, 1, 5, 9, 14, 18, 15, 11, 7, 2, 3, 6, 8, 12, 16, 17, 13],
      stages: [
        { step: 1, description: 'အဆင့် (၁) ကနဦးဆွဲခြင်း', nm: 45, ftlb: 33, kgfm: 4.6 },
        { step: 2, description: 'အဆင့် (၂) အလယ်အလတ်ဆွဲခြင်း', nm: 75, ftlb: 55, kgfm: 7.6 },
        { step: 3, description: 'အဆင့် (၃) နောက်ဆုံးစံချိန်ပြည့်', nm: 103, ftlb: 76, kgfm: 10.5 }
      ],
      notes: 'အလယ်အမှတ် (၁) မှစတင်ကာ နှစ်ဖက်အစွန် (၁၇၊ ၁၈) သို့ အစီအစဉ်အတိုင်း ဆွဲရမည်။'
    },
    clearances: [
      {
        id: 'valve-in-l5018',
        name: 'Intake Valve Clearance',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (Cold)',
        standardVal: '0.18 - 0.22',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: '0.20 mm စံထားညှိပါ'
      },
      {
        id: 'valve-ex-l5018',
        name: 'Exhaust Valve Clearance',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (Cold)',
        standardVal: '0.18 - 0.22',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: '0.20 mm စံထားညှိပါ'
      },
      {
        id: 'ring-top-l5018',
        name: 'Top Compression Ring Gap',
        burmeseName: 'ထိပ်ကွင်း အစွန်းဟခွာ',
        standardVal: '0.25 - 0.40',
        limitVal: '0.70',
        unit: 'mm',
        checkMethod: 'လိုင်နာအသစ်ထည့်တိုင်း ဖီးလာဂေ့ဖြင့်တိုင်းပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '140 - 150 kgf/cm²',
      nozzlePressureBar: '137 - 147 bar',
      nozzlePressurePsi: '1,991 - 2,133 psi',
      injectionTimingBtdc: '16° - 18° BTDC',
      pumpType: 'Bosch MD In-line 4 Plunger Pump',
      pumpTypeMm: 'ဆီချိန်ရှမ်ပြားဖြင့် ချိန်ညှိ',
      glowPlugSpec: '11V, 0.9 - 1.1 Ohm',
      nozzleHolderTorque: '26 Nm (19 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 7.6,
      engineOilGrade: 'SAE 15W-40 CI-4',
      coolantLiters: 7.2,
      hydraulicTransmissionLiters: 40.0,
      hydraulicTransmissionGrade: 'Kubota Super UDT-2 Fluid',
      fuelTankLiters: 48.0
    },
    proTips: {
      gasketSelection: [
        'V2403 Direct Injection ဖြစ်သဖြင့် Head Gasket အထူအပါး Notch အမှတ်အလွန်အရေးကြီးပါသည်',
        'Notch 1 (1.15mm), Notch 2 (1.20mm), Notch 3 (1.25mm)'
      ],
      timingGearMarks: [
        'Crank Gear (1) နှင့် Idle Gear (1-1) တိုက်ပါ',
        'Cam Gear (2) နှင့် Idle Gear (2-2) တိုက်ပါ',
        'Injection Pump Gear (3) နှင့် Idle Gear (3-3) တိုက်ပါ'
      ],
      workshopWarnings: [
        'L5018 တွင် ဆီပန့်တိုင်မင် မလွဲပါစေနှင့်၊ မီးစောပါက အင်ဂျင်သံဒေါက်ဒေါက်မြည်ပြီး ခရိုင်းဗြာရင်ပွန်းပါမည်'
      ],
      criticalSpecs: ['Head: 103 Nm, Con-Rod: 44 Nm, Main: 73 Nm']
    }
  },
  {
    id: 'kubota-dc60-dc70',
    brand: 'kubota',
    brandLabel: 'KUBOTA (ကူဘိုတာ)',
    category: 'harvester',
    categoryLabel: 'စပါးရိတ်ခြွေစက် အင်ဂျင် (Harvester)',
    name: 'Kubota DC60 / DC70 / DC70G Harvester',
    engineCode: 'V2403-M-DI-TE (Turbo)',
    machineModel: 'Kubota DC70 / DC70G Combine Harvester',
    horsepower: 70,
    cylinders: 4,
    displacementCc: 2434,
    boreStrokeMm: '87 x 102.4 mm',
    coolingType: 'ရေလည်စနစ် + တာဘို (Turbocharged)',
    torqueSpecs: [
      {
        id: 'head-dc70',
        name: 'Cylinder Head Bolts (18 bolts)',
        burmeseName: 'တာဘိုအင်ဂျင် ဆလင်ဒါခေါင်းဆွဲပေါင်',
        socketMm: '14 mm (12-pt)',
        boltSize: 'M11 x 1.25',
        sequenceStage: 'အဆင့် ၃ ဆင့်',
        nm: 103,
        ftlb: 76,
        kgfm: 10.5,
        notes: 'တာဘိုအင်ဂျင်ဖြစ်၍ ဆွဲပေါင်စံချိန်မပြည့်ပါက အပူလွန်ပြီး ဂက်စကတ်ပေါက်တတ်သည်'
      },
      {
        id: 'conrod-dc70',
        name: 'Connecting Rod Cap Bolts',
        burmeseName: 'တာဘို ကွန်ရော့ပေါင် (Con-Rod)',
        socketMm: '14 mm (12-pt)',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 44,
        ftlb: 32.5,
        kgfm: 4.5,
        notes: 'ဗြာရင်အသစ်ဆင်ပါက ဆီပေါက်လမ်းကြောင်း တည့်မတည့် သေချာစစ်ပါ'
      },
      {
        id: 'main-dc70',
        name: 'Main Bearing Case Bolts',
        burmeseName: 'မရိန်းပေါင် (Main Bearing Case)',
        socketMm: '17 mm',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 73,
        ftlb: 54,
        kgfm: 7.4,
        notes: 'Case bolts အားလုံး အညီအမျှဆွဲပါ'
      },
      {
        id: 'flywheel-dc70',
        name: 'Flywheel Bolts',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel)',
        socketMm: '17 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်',
        nm: 103,
        ftlb: 76,
        kgfm: 10.5,
        notes: 'Thread locker မဖြစ်မနေသုံးပါ'
      },
      {
        id: 'turbo-dc70',
        name: 'Turbocharger Mounting Nuts',
        burmeseName: 'တာဘိုတပ်ဆင်နပ်များ (Turbo Mount)',
        socketMm: '13 mm / 14 mm',
        sequenceStage: 'တိုက်ရိုက်',
        nm: 35,
        ftlb: 26,
        kgfm: 3.6,
        notes: 'အပူခံ ကြေးဝါ/သံမဏိနပ် အသစ်သုံးပါ'
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
      notes: 'အလယ်မှစ၍ အပြင်သို့ ခရုပတ်ပုံစံ ဆွဲပါ'
    },
    clearances: [
      {
        id: 'valve-in-dc70',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ',
        standardVal: '0.18 - 0.22',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: '0.20 mm စံထားညှိပါ'
      },
      {
        id: 'valve-ex-dc70',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ',
        standardVal: '0.18 - 0.22',
        limitVal: '0.25',
        unit: 'mm',
        checkMethod: 'တာဘိုအိတ်ဇော အပူချိန်မြင့်သဖြင့် 0.20 mm အတိအကျထားပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '140 - 150 kgf/cm²',
      nozzlePressureBar: '137 - 147 bar',
      nozzlePressurePsi: '1,991 - 2,133 psi',
      injectionTimingBtdc: '15° - 17° BTDC',
      pumpType: 'Bosch In-line 4 Plunger Pump with Boost Compensator',
      pumpTypeMm: 'ဆီချိန်ရှမ်ပြားဖြင့် ညှိပါ',
      glowPlugSpec: '11V, 1.0 Ohm',
      nozzleHolderTorque: '26 Nm (19 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 8.5,
      engineOilGrade: 'SAE 15W-40 CI-4 Turbo Diesel Special',
      coolantLiters: 9.0,
      hydraulicTransmissionLiters: 32.0,
      hydraulicTransmissionGrade: 'Kubota Super UDT-2 / HST Fluid',
      fuelTankLiters: 60.0
    },
    proTips: {
      gasketSelection: [
        'DC70 ရိတ်ခြွေစက်သည် ဝန်အရမ်းထမ်းရသဖြင့် စက်ရုံထုတ် မူရင်း Metal Gasket သာ သုံးပါ'
      ],
      timingGearMarks: [
        'ခရိုင်း (1) - အိုင်ဒလာ (1-1)၊ ကင်းရှပ် (2) - အိုင်ဒလာ (2-2)၊ ဆီပန့် (3) - အိုင်ဒလာ (3-3)'
      ],
      workshopWarnings: [
        'HST (Hydrostatic Transmission) ဆီစစ်ဘူးနှင့် ဆီကို အချိန်မှန်မလဲပါက စက်မရွေ့တော့ဘဲ ပန့်ပျက်တတ်သည်',
        'တာဘိုအဝင် ဆီပိုက် မပိတ်စေရန် သတိပြုပါ'
      ],
      criticalSpecs: ['Head: 103 Nm, Con-Rod: 44 Nm, Main: 73 Nm']
    }
  },
  {
    id: 'kubota-dc95-dc105',
    brand: 'kubota',
    brandLabel: 'KUBOTA (ကူဘိုတာ)',
    category: 'harvester',
    categoryLabel: 'စပါးရိတ်ခြွေစက် အင်ဂျင်ကြီး (Harvester)',
    name: 'Kubota DC95 / DC105X Harvester',
    engineCode: 'V3800-DI-TI (Turbo Intercooler)',
    machineModel: 'Kubota DC95 / DC105X Combine Harvester',
    horsepower: 105,
    cylinders: 4,
    displacementCc: 3769,
    boreStrokeMm: '100 x 120 mm',
    coolingType: 'ရေလည်စနစ် + Turbo Intercooler',
    torqueSpecs: [
      {
        id: 'head-dc105',
        name: 'Cylinder Head Bolts (18 bolts M12)',
        burmeseName: 'V3800 ဆလင်ဒါခေါင်းဆွဲပေါင်',
        socketMm: '17 mm (Bi-Hex 12-pt)',
        boltSize: 'M12 x 1.5',
        sequenceStage: 'အဆင့် ၄ ဆင့်',
        nm: 118,
        ftlb: 87,
        kgfm: 12.0,
        notes: 'အဆင့် ၁: 40 Nm -> အဆင့် ၂: 80 Nm -> အဆင့် ၃: 118 Nm'
      },
      {
        id: 'conrod-dc105',
        name: 'Connecting Rod Bolts (M10)',
        burmeseName: 'ကွန်ရော့ပေါင် (Con-Rod)',
        socketMm: '14 mm (12-pt)',
        boltSize: 'M10 x 1.25',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 54,
        ftlb: 40,
        kgfm: 5.5,
        notes: 'အသစ်ဆင်ပါက ဆီသုတ်ဆွဲပါ'
      },
      {
        id: 'main-dc105',
        name: 'Main Bearing Case Bolts',
        burmeseName: 'မရိန်းပေါင် (Main Bearing)',
        socketMm: '19 mm',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 98,
        ftlb: 72,
        kgfm: 10.0,
        notes: 'ခရိုင်းမရိန်းအိမ်ဆွဲပေါင်'
      },
      {
        id: 'flywheel-dc105',
        name: 'Flywheel Bolts (8 bolts)',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel)',
        socketMm: '19 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်',
        nm: 127,
        ftlb: 94,
        kgfm: 13.0,
        notes: 'Thread locker သုံးပါ'
      }
    ],
    headSequence: {
      boltCount: 18,
      layoutType: 'inline_18',
      order: [10, 4, 1, 5, 9, 14, 18, 15, 11, 7, 2, 3, 6, 8, 12, 16, 17, 13],
      stages: [
        { step: 1, description: 'အဆင့် ၁', nm: 40, ftlb: 30, kgfm: 4.1 },
        { step: 2, description: 'အဆင့် ၂', nm: 80, ftlb: 59, kgfm: 8.2 },
        { step: 3, description: 'အဆင့် ၃ စံချိန်ပြည့်', nm: 118, ftlb: 87, kgfm: 12.0 }
      ],
      notes: 'အလယ်မှစ၍ အပြင်သို့ စက်ဝိုင်းပုံစံ ဆွဲပါ'
    },
    clearances: [
      {
        id: 'valve-in-dc105',
        name: 'Intake Valve Clearance',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (Cold)',
        standardVal: '0.23 - 0.27',
        limitVal: '0.30',
        unit: 'mm',
        checkMethod: '0.25 mm စံထားညှိပါ'
      },
      {
        id: 'valve-ex-dc105',
        name: 'Exhaust Valve Clearance',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (Cold)',
        standardVal: '0.23 - 0.27',
        limitVal: '0.30',
        unit: 'mm',
        checkMethod: '0.25 mm စံထားညှိပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '190 - 200 kgf/cm²',
      nozzlePressureBar: '186 - 196 bar',
      nozzlePressurePsi: '2,702 - 2,845 psi',
      injectionTimingBtdc: '14° - 16° BTDC',
      pumpType: 'Bosch In-line Governor Type with Aneroid',
      pumpTypeMm: 'ဆီချိန်ရှမ်ပြားဖြင့် ချိန်ညှိ',
      glowPlugSpec: '11V, 0.9 Ohm',
      nozzleHolderTorque: '30 Nm (22 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 11.5,
      engineOilGrade: 'SAE 15W-40 CI-4 Turbo Diesel',
      coolantLiters: 12.0,
      hydraulicTransmissionLiters: 38.0,
      hydraulicTransmissionGrade: 'Kubota Super UDT-2 Fluid',
      fuelTankLiters: 85.0
    },
    proTips: {
      gasketSelection: ['V3800 အင်ဂျင်သည် အပူချိန်မြင့်မားသဖြင့် ပစ်စတင်အမြင့်တိုင်းတာ၍ Gasket အထူမှန်ကန်စွာရွေးပါ'],
      timingGearMarks: ['ခရိုင်း၊ ကင်းရှပ်၊ ဆီပန့်နှင့် အိုင်ဒလာဂီယာ မာ့ခ်များ တိကျစွာတိုက်ဆိုင်ပါ'],
      workshopWarnings: ['အင်တာကူလာပိုက်များ လေလုံမှုမရှိပါက အင်ဂျင်ဆွဲအားကျပြီး အခိုးမည်းထွက်မည်'],
      criticalSpecs: ['Head: 118 Nm, Con-Rod: 54 Nm, Main: 98 Nm, Flywheel: 127 Nm']
    }
  }
];
