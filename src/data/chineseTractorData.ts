/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgriEngine } from '../types/engine';

export const chineseTractorEngines: AgriEngine[] = [
  {
    id: 'yto-x804-x904-lr4108',
    brand: 'yto_lovol',
    brandLabel: 'YTO / LOVOL (တရုတ်ထွန်စက်ကြီးများ)',
    category: 'tractor',
    categoryLabel: 'လယ်ယာသုံး ထွန်စက်ကြီး (Tractor)',
    name: 'YTO X804 / X904 / 1004 (အရှေ့နီ ထွန်စက်ကြီး)',
    engineCode: 'Luoyang Dongfanghong LR4108 / LR4M5 (4.58L Diesel)',
    machineModel: 'YTO-X804 (80HP), YTO-X904 / 904 (90HP), YTO-1004 (100HP) 4WD',
    horsepower: 90,
    cylinders: 4,
    displacementCc: 4580,
    boreStrokeMm: '108 x 125 mm (Ricardo နည်းပညာ)',
    coolingType: 'ဖိအားပေး ရေလည်စနစ် (Heavy Radiator + Forced Pump)',
    torqueSpecs: [
      {
        id: 'head-yto-lr4108',
        name: 'Cylinder Head Bolts (M14 x 1.5 Bolts 18 လုံး)',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင် (Grade 10.9/12.9 Bolts)',
        socketMm: '22 mm',
        boltSize: 'M14 x 1.5',
        sequenceStage: 'အဆင့် ၃ ဆင့်ဖြင့် အလယ်မှစ၍ အပြင်သို့ဆွဲပါ',
        nm: 210,
        ftlb: 155,
        kgfm: 21.4,
        notes: 'စက်ရုံသတ်မှတ်ချက်: အဆင့် ၁: 70 Nm -> အဆင့် ၂: 140 Nm -> အဆင့် ၃: 200 - 220 Nm (စံချိန် ၂၁၀ Nm ထားပါ)'
      },
      {
        id: 'conrod-yto-lr4108',
        name: 'Connecting Rod Cap Bolts (M12 Bolts)',
        burmeseName: 'ကွန်ရော့ပေါင် (Con-Rod Cap 12 mm)',
        socketMm: '19 mm',
        boltSize: 'M12 x 1.25',
        sequenceStage: 'အဆင့် ၂ ဆင့် ညီညာစွာဆွဲပါ',
        nm: 115,
        ftlb: 85,
        kgfm: 11.7,
        notes: 'စက်ရုံစံချိန်: 110 - 120 Nm။ ချောင်းခေါင်းဘော့လ်များကို သန့်စင်ဆီသုတ်ပြီး အညီအမျှဆွဲပါ'
      },
      {
        id: 'main-yto-lr4108',
        name: 'Main Bearing Cap Bolts (M16 Bolts)',
        burmeseName: 'မရိန်းပေါင် (Crankshaft Main Bearing Caps)',
        socketMm: '24 mm',
        boltSize: 'M16 x 1.5',
        sequenceStage: 'အဆင့် ၃ ဆင့် အလယ်မရိန်းမှ စတင်ဆွဲပါ',
        nm: 250,
        ftlb: 184,
        kgfm: 25.5,
        notes: 'စက်ရုံစံချိန်: 240 - 260 Nm (စံချိန် ၂၅၀ Nm ထားပါ)။ မရိန်းခွံ ၅ ခုကို အလယ်မှ ဘေးနှစ်ဖက်သို့ ညီညာစွာဆွဲပါ'
      },
      {
        id: 'flywheel-yto-lr4108',
        name: 'Flywheel Bolts (M14 Bolts)',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel Bolts)',
        socketMm: '22 mm',
        sequenceStage: 'ဒေါင့်ဖြတ် ကြက်ခြေခတ်',
        nm: 145,
        ftlb: 107,
        kgfm: 14.8,
        notes: 'စက်ရုံစံချိန်: 140 - 150 Nm။ ဒေါင့်ဖြတ်ဆွဲပြီး Thread locker အပြာသုံးပါ'
      }
    ],
    headSequence: {
      boltCount: 18,
      layoutType: 'inline_18',
      order: [10, 4, 1, 5, 9, 14, 18, 15, 11, 7, 2, 3, 6, 8, 12, 16, 17, 13],
      stages: [
        { step: 1, description: 'အဆင့် ၁', nm: 70, ftlb: 52, kgfm: 7.1 },
        { step: 2, description: 'အဆင့် ၂', nm: 140, ftlb: 103, kgfm: 14.3 },
        { step: 3, description: 'အဆင့် ၃ စံချိန်ပြည့်', nm: 210, ftlb: 155, kgfm: 21.4 }
      ],
      notes: 'အလယ်ဗဟိုမှ စတင်၍ ဘေးနှစ်ဖက်သို့ စက်ဝိုင်းပုံစံ အစီအစဉ်အတိုင်း အဆင့်ဆင့်ဆွဲပါ'
    },
    clearances: [
      {
        id: 'valve-in-yto',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.30 - 0.35',
        limitVal: '0.40',
        unit: 'mm',
        checkMethod: 'ဖီးလာဂေ့ 0.30 mm စံထားညှိပါ (TDC အမှတ်တွင် ချိန်ပါ)'
      },
      {
        id: 'valve-ex-yto',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.35 - 0.40',
        limitVal: '0.45',
        unit: 'mm',
        checkMethod: 'ဖီးလာဂေ့ 0.35 mm စံထားညှိပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '200 - 210 kgf/cm²',
      nozzlePressureBar: '196 - 206 bar',
      nozzlePressurePsi: '2,845 - 2,987 psi',
      injectionTimingBtdc: '16° - 18° BTDC',
      pumpType: 'In-line 4-Cylinder Plunger Pump (BH4PM / PW စီးရီး)',
      pumpTypeMm: 'ဆီချိန်ရှမ်ပြား ထည့်/ထုတ်ခြင်းဖြင့် မီးချိန်ညှိပါ',
      glowPlugSpec: 'Intake Air Torch Flame Glow Heater (12V)',
      nozzleHolderTorque: '35 Nm (26 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 12.0,
      engineOilGrade: 'SAE 15W-40 CI-4 Heavy Diesel',
      coolantLiters: 18.0,
      hydraulicTransmissionLiters: 55.0,
      hydraulicTransmissionGrade: 'SAE 80W-90 / Universal Tractor Transmission Oil',
      fuelTankLiters: 115.0
    },
    proTips: {
      gasketSelection: [
        'YTO LR4108 အင်ဂျင်တွင် ကြေးနီကွင်းပါသော စက်ရုံထုတ် မူရင်းဂက်စကတ်သာ သုံးပါ',
        'လိုင်နာနုတ်ခမ်းအမြင့် (Liner Protrusion) 0.05 ~ 0.12 mm ရှိမရှိ သေချာစစ်ဆေးပါ'
      ],
      timingGearMarks: [
        'ခရိုင်းဂီယာ (0) နှင့် အလယ်အိုင်ဒလာဂီယာ (0) မာကင်ကိုက်ပါ',
        'ကင်းရှပ်ဂီယာ (00) နှင့် အလယ်အိုင်ဒလာဂီယာ (00) မာကင်ကိုက်ပါ',
        'အင်လိုင်းဆီပန့်ဂီယာ (000) နှင့် အလယ်အိုင်ဒလာဂီယာ (000) မာကင်ကိုက်ပါ'
      ],
      workshopWarnings: [
        'YTO ထွန်စက် အင်ဂျင်သည် ပေါင်ကြီးသဖြင့် (Head: 210 Nm, Main: 250 Nm) လက်ကိုင် Torque Wrench အကြီးစား သုံးရမည်',
        'အင်ဂျင်ဆင်ပြီး အလုပ်ချိန် ၅၀ (50 Hours) အကြာတွင် ခေါင်းဆွဲပေါင်များကို ၂၁၀ Nm ဖြင့် မဖြစ်မနေ ပြန်လည်ကျပ်ပေးရမည်'
      ],
      criticalSpecs: [
        'Head: 210 Nm (155 Ft-lb), Con-Rod: 115 Nm (85 Ft-lb), Main: 250 Nm (184 Ft-lb), Flywheel: 145 Nm'
      ]
    }
  },
  {
    id: 'lovol-td824-td904-1004',
    brand: 'yto_lovol',
    brandLabel: 'YTO / LOVOL (တရုတ်ထွန်စက်ကြီးများ)',
    category: 'tractor',
    categoryLabel: 'လယ်ယာသုံး ထွန်စက်ကြီး (Tractor)',
    name: 'Lovol TD824 / TD904 / TB504 (ဖိုတွန် လိုဗော ထွန်စက်)',
    engineCode: 'Lovol-Perkins 1004-4T / Xinchai A498BT (4-Cylinder Turbo)',
    machineModel: 'Lovol TB504 (50HP), TD824 (82HP), TD904 (90HP) 4WD Heavy Tractor',
    horsepower: 85,
    cylinders: 4,
    displacementCc: 3990,
    boreStrokeMm: '100 x 127 mm (Lovol 1004) / 98 x 105 mm (Xinchai 498)',
    coolingType: 'ရေလည်စနစ် + အင်တာကူလာ/တာဘို (Heavy Duty)',
    torqueSpecs: [
      {
        id: 'head-lovol-1004',
        name: 'Cylinder Head Bolts (Flanged Stretch Bolts)',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင် (1/2" UNF / M12 Flanged)',
        socketMm: '19 mm',
        boltSize: '1/2" UNF Flanged Bolts',
        sequenceStage: 'အဆင့် ၃ ဆင့်ဖြင့် အညီအမျှဆွဲပါ',
        nm: 150,
        ftlb: 111,
        kgfm: 15.3,
        notes: 'စက်ရုံစံချိန်: အဆင့် ၁: 60 Nm -> အဆင့် ၂: 110 Nm -> အဆင့် ၃: 150 Nm (111 Ft-lb)'
      },
      {
        id: 'conrod-lovol-1004',
        name: 'Connecting Rod Cap Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် (Con-Rod Cap Bolts)',
        socketMm: '17 mm',
        boltSize: 'M12 x 1.25',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 100,
        ftlb: 74,
        kgfm: 10.2,
        notes: 'စက်ရုံစံချိန်: 95 - 105 Nm (စံချိန် ၁၀၀ Nm ထားပါ)။ ဆီသုတ်ပြီး အညီအမျှဆွဲပါ'
      },
      {
        id: 'main-lovol-1004',
        name: 'Main Bearing Cap Bolts',
        burmeseName: 'မရိန်းပေါင် (Main Bearing Caps)',
        socketMm: '24 mm',
        boltSize: 'M14 x 1.5',
        sequenceStage: 'အဆင့် ၂ ဆင့် အလယ်မှစဆွဲပါ',
        nm: 255,
        ftlb: 188,
        kgfm: 26.0,
        notes: 'စက်ရုံစံချိန်: 245 - 265 Nm (စံချိန် ၂၅၅ Nm ထားပါ)။ မရိန်းခွံ ၅ ခုကို အလယ်မှ ဘေးသို့ ဆွဲပါ'
      },
      {
        id: 'flywheel-lovol-1004',
        name: 'Flywheel Bolts',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel Bolts)',
        socketMm: '19 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်',
        nm: 115,
        ftlb: 85,
        kgfm: 11.7,
        notes: 'စက်ရုံစံချိန်: 110 - 120 Nm။ Thread locker သုံးပြီး ဒေါင့်ဖြတ်ဆွဲပါ'
      }
    ],
    headSequence: {
      boltCount: 18,
      layoutType: 'inline_18',
      order: [10, 4, 1, 5, 9, 14, 18, 15, 11, 7, 2, 3, 6, 8, 12, 16, 17, 13],
      stages: [
        { step: 1, description: 'အဆင့် ၁', nm: 60, ftlb: 44, kgfm: 6.1 },
        { step: 2, description: 'အဆင့် ၂', nm: 110, ftlb: 81, kgfm: 11.2 },
        { step: 3, description: 'အဆင့် ၃ စံချိန်ပြည့်', nm: 150, ftlb: 111, kgfm: 15.3 }
      ],
      notes: 'အလယ်အမှတ် (၁) မှ စတင်ကာ ဘေးနှစ်ဖက်သို့ အစီအစဉ်အတိုင်း အညီအမျှ တဆင့်ချင်းဆွဲပါ'
    },
    clearances: [
      {
        id: 'valve-in-lovol',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.20 - 0.25',
        limitVal: '0.30',
        unit: 'mm',
        checkMethod: 'ဖီးလာဂေ့ 0.20 mm စံထားညှိပါ'
      },
      {
        id: 'valve-ex-lovol',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.45',
        limitVal: '0.50',
        unit: 'mm',
        checkMethod: 'ဖီးလာဂေ့ 0.45 mm စံထားညှိပါ (Perkins Phaser စံနှုန်း)'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '240 - 250 kgf/cm²',
      nozzlePressureBar: '235 - 245 bar',
      nozzlePressurePsi: '3,410 - 3,550 psi',
      injectionTimingBtdc: '14° - 16° BTDC',
      pumpType: 'Bosch / Weifu VE Rotary Distributor Pump သို့မဟုတ် In-line Pump',
      pumpTypeMm: 'ဆီပန့်မီးချိန်အမှတ် တိုက်ဆိုင်တပ်ဆင်ပါ',
      glowPlugSpec: 'Thermostart Intake Glow Heater (12V)',
      nozzleHolderTorque: '35 Nm (26 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 10.5,
      engineOilGrade: 'SAE 15W-40 CI-4 Heavy Duty',
      coolantLiters: 16.0,
      hydraulicTransmissionLiters: 52.0,
      hydraulicTransmissionGrade: 'Universal Tractor Transmission Oil (UTTO)',
      fuelTankLiters: 100.0
    },
    proTips: {
      gasketSelection: [
        'Lovol 1004 အင်ဂျင်တွင် Perkins Phaser စံနှုန်းအရ သံပြားဖိကွင်းပါသော ဂက်စကတ်သာ သုံးပါ',
        'ခေါင်းမတင်မီ ဘလောက်မျက်နှာပြင်နှင့် လိုင်နာအထိုင် ညီညာမှု စစ်ဆေးပါ'
      ],
      timingGearMarks: [
        'ခရိုင်းဂီယာ အမှတ် (1) နှင့် အလယ်အိုင်ဒလာဂီယာ အမှတ် (1) တိုက်ဆိုင်ပါ',
        'ကင်းရှပ်ဂီယာ အမှတ် (2) နှင့် အလယ်အိုင်ဒလာဂီယာ အမှတ် (2) တိုက်ဆိုင်ပါ',
        'ဆီပန့်ဂီယာ အမှတ် (3) နှင့် အလယ်အိုင်ဒလာဂီယာ အမှတ် (3) တိုက်ဆိုင်ပါ'
      ],
      workshopWarnings: [
        'Lovol 1004 သည် Perkins နည်းပညာဖြစ်သဖြင့် အိတ်ဇောဘား ကင်းလွတ်ခွာ 0.45 mm ထားရမည်ဖြစ်ပြီး လေဝင်ဘားကို 0.20 mm ထက် မကျဉ်းစေရပါ',
        'VE ဆီပန့် သုံးထားသော မော်ဒယ်များတွင် ပန့်အတွင်းပိုင်း လေခိုပါက စက်နှိုးခက်သဖြင့် ဆီပန့်မှ လေအရင်ချွတ်ပါ'
      ],
      criticalSpecs: [
        'Head: 150 Nm (111 Ft-lb), Con-Rod: 100 Nm (74 Ft-lb), Main: 255 Nm (188 Ft-lb), Flywheel: 115 Nm'
      ]
    }
  }
];
