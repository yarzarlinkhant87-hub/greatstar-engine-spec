/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgriEngine } from '../types/engine';

export const masseyFergusonEngines: AgriEngine[] = [
  {
    id: 'mf-240-135',
    brand: 'massey_ferguson',
    brandLabel: 'MASSEY FERGUSON (မက်ဆီဖာဂူဆန် / ဖာကူဆန်)',
    category: 'tractor',
    categoryLabel: 'လယ်ယာသုံး ထွန်စက်ကြီး (Tractor)',
    name: 'Massey Ferguson MF 240 / MF 135',
    engineCode: 'Perkins AD3.152 (3-Cylinder 2.5L Diesel)',
    machineModel: 'MF 240 (50 HP) & MF 135 2WD/4WD Tractor',
    horsepower: 50,
    cylinders: 3,
    displacementCc: 2500,
    boreStrokeMm: '91.44 x 127 mm (3.6" x 5.0")',
    coolingType: 'ရေလည်စနစ် (Heavy Duty Water Cooled)',
    torqueSpecs: [
      {
        id: 'head-mf240',
        name: 'Cylinder Head Bolts & Nuts (1/2" UNF)',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင် (Perkins AD3.152 Head)',
        socketMm: '11/16" သို့မဟုတ် 18 mm / 19 mm',
        boltSize: '1/2" UNF Studs & Bolts',
        sequenceStage: 'အဆင့် ၃ ဆင့်ဖြင့် ညီမျှစွာဆွဲပါ',
        nm: 136,
        ftlb: 100,
        kgfm: 13.9,
        notes: 'Perkins မူရင်းစံ: အဆင့် ၁: 60 Nm -> အဆင့် ၂: 100 Nm -> အဆင့် ၃: 136 Nm (100 Ft-lb) အတိအကျ'
      },
      {
        id: 'conrod-mf240',
        name: 'Connecting Rod Cap Nuts (7/16" UNF)',
        burmeseName: 'ကွန်ရော့ပေါင် / ချောင်းပေါင် (Con-Rod Nuts)',
        socketMm: '11/16" သို့မဟုတ် 18 mm',
        boltSize: '7/16" UNF with locking tabs',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 68,
        ftlb: 50,
        kgfm: 6.9,
        notes: 'ဆီသုတ်ပြီး 50 Ft-lb (68 Nm) ဆွဲပါ။ Tab washer အသစ် ခေါက်သိမ်းပါ'
      },
      {
        id: 'main-mf240',
        name: 'Main Bearing Cap Bolts (5/8" UNF)',
        burmeseName: 'မရိန်းပေါင် (Crankshaft Main Bearing Bolts)',
        socketMm: '15/16" သို့မဟုတ် 24 mm',
        boltSize: '5/8" UNF Heavy Grade Bolts',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 156,
        ftlb: 115,
        kgfm: 15.9,
        notes: 'မရိန်းအိမ် ၄ ခုကို အလယ်မှစ၍ အပြင်သို့ ၁၁၅ ပေါင် အတိအကျဆွဲပါ'
      },
      {
        id: 'flywheel-mf240',
        name: 'Flywheel Bolts (1/2" UNF)',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel Bolts)',
        socketMm: '3/4" သို့မဟုတ် 19 mm',
        boltSize: '1/2" UNF High Tensile',
        sequenceStage: 'ဒေါင့်ဖြတ်အညီအမျှ',
        nm: 115,
        ftlb: 85,
        kgfm: 11.7,
        notes: 'Thread locker (ဝက်အူကော်) သုံးပြီး ဒေါင့်ဖြတ်အဆင့်ဆင့်ဆွဲပါ'
      },
      {
        id: 'crank-pulley-mf240',
        name: 'Crankshaft Pulley Dog Nut (1-1/2")',
        burmeseName: 'ရှေ့ပူလီခေါင်းကြီး / စတာတာဒေါ့ဂ်နတ် (Starter Dog Nut)',
        socketMm: '1-1/2" (38 mm)',
        sequenceStage: 'အပြည့်ဆွဲပါ',
        nm: 400,
        ftlb: 295,
        kgfm: 40.8,
        notes: 'ခရိုင်းရှပ်ရှေ့ပူလီနတ်ကြီးကို ၂၉၅-၃၀၀ ပေါင်ဖြင့် အပြည့်တင်းကျပ်စွာဆွဲပါ'
      },
      {
        id: 'rocker-mf240',
        name: 'Rocker Shaft Bracket Nuts',
        burmeseName: 'ရော့ကာရှပ်ဒေါက်ခုံနတ်များ (Rocker Pedestals)',
        socketMm: '1/2" သို့မဟုတ် 13 mm',
        sequenceStage: 'တပြိုင်နက်ညီမျှစွာ',
        nm: 40,
        ftlb: 30,
        kgfm: 4.1,
        notes: 'ဘားတွန်းတံများ အထိုင်ကျစေရန် အလယ်မှဘေးသို့ တဆင့်ချင်းဆွဲပါ'
      }
    ],
    headSequence: {
      boltCount: 18,
      layoutType: 'inline_18',
      order: [10, 4, 1, 5, 9, 14, 18, 15, 11, 7, 2, 3, 6, 8, 12, 16, 17, 13],
      stages: [
        { step: 1, description: 'အဆင့် ၁ အလယ်မှစဆွဲ', nm: 60, ftlb: 44, kgfm: 6.1 },
        { step: 2, description: 'အဆင့် ၂ ကြားခံဆွဲ', nm: 100, ftlb: 74, kgfm: 10.2 },
        { step: 3, description: 'အဆင့် ၃ မူရင်းစံချိန်ပြည့်', nm: 136, ftlb: 100, kgfm: 13.9 }
      ],
      notes: 'ဆလင်ဒါခေါင်းအလယ် (နံပါတ် ၁) မှစတင်ကာ ဘေးဝဲယာသို့ ခရုပတ်ပုံစံ အဆင့် ၃ ဆင့်ဖြင့် ညီမျှစွာဆွဲရမည်'
    },
    clearances: [
      {
        id: 'valve-in-mf240',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အင်ဂျင်အေးချိန်)',
        standardVal: '0.30 mm (0.012")',
        limitVal: '0.35 mm',
        unit: 'mm',
        checkMethod: 'ဖီးလာဂေ့ 0.30 mm (12 thou) ကပ်ညှိပါ'
      },
      {
        id: 'valve-ex-mf240',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အင်ဂျင်အေးချိန်)',
        standardVal: '0.30 mm (0.012")',
        limitVal: '0.35 mm',
        unit: 'mm',
        checkMethod: 'ဖီးလာဂေ့ 0.30 mm (12 thou) ကပ်ညှိပါ'
      },
      {
        id: 'liner-mf240',
        name: 'Cylinder Liner Protrusion',
        burmeseName: 'လိုင်နာအထိုင်အမြင့် (Block မျက်နှာပြင်ထက် အထွက်)',
        standardVal: '0.76 - 0.89 mm (0.030" - 0.035")',
        limitVal: '0.90 mm',
        unit: 'mm',
        checkMethod: 'Dial gauge သို့မဟုတ် တိုင်းတာရေးကိရိယာဖြင့် ဘလောက်မျက်နှာပြင်ထက် တိုင်းပါ'
      },
      {
        id: 'crank-endplay-mf240',
        name: 'Crankshaft End Float (Thrust Washer)',
        burmeseName: 'ခရိုင်းရှပ် ဘေးရွေ့ကင်းလွတ်ခွာ (Thrust Clearance)',
        standardVal: '0.05 - 0.38 mm (0.002" - 0.015")',
        limitVal: '0.45 mm',
        unit: 'mm',
        checkMethod: 'Thrust washer အသစ်ထည့်ချိန်တွင် ဖီးလာဂေ့ဖြင့် စစ်ဆေးပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '170 - 180 kgf/cm²',
      nozzlePressureBar: '170 - 177 bar',
      nozzlePressurePsi: '2,465 - 2,560 psi',
      injectionTimingBtdc: '24° BTDC (or 18° BTDC depending on pump code)',
      pumpType: 'Lucas CAV DPA Distributor Rotary Pump',
      pumpTypeMm: 'ဖလိုက်ဝှီးဒီဂရီ အမှတ်နှင့် CAV ပန့်အတွင်း လိုင်းမာ့ခ်တိုက်',
      glowPlugSpec: 'Thermostart Manifold Intake Preheater (12V)',
      nozzleHolderTorque: '68 Nm (50 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 6.8,
      engineOilGrade: 'SAE 15W-40 CI-4 သို့မဟုတ် SAE 20W-50 Heavy Duty',
      coolantLiters: 10.2,
      hydraulicTransmissionLiters: 36.0,
      hydraulicTransmissionGrade: 'MF CMS M1135 / M1143 / UTTO 15W-40 Universal',
      fuelTankLiters: 48.0
    },
    proTips: {
      gasketSelection: [
        'Perkins AD3.152 အင်ဂျင်တွင် မီးခိုးငွေ့လုံစေရန် စက်ရုံထုတ် သံ/ကြေးကွင်းပါသော Composite Gasket ကိုသာ သုံးပါ',
        'Head Gasket တပ်ဆင်ရာတွင် ကော်လုံးဝမသုတ်ရ၊ မျက်နှာပြင်ခြောက်သွေ့သန့်ရှင်းစွာ တပ်ဆင်ရပါမည်'
      ],
      timingGearMarks: [
        'ခရိုင်းဂီယာ (S) နှင့် အလယ်အိုင်ဒလာဂီယာ (S-S) အမှတ် တိုက်ပါ',
        'ကင်းရှပ်ဂီယာ (C) နှင့် အလယ်အိုင်ဒလာဂီယာ (C-C) အမှတ် တိုက်ပါ',
        'CAV ဆီပန့်ဂီယာ (D) နှင့် အလယ်အိုင်ဒလာဂီယာ (D-D) အမှတ် တိုက်ပါ'
      ],
      workshopWarnings: [
        'MF 240 ဆလင်ဒါခေါင်းဆွဲပေါင် 100 Ft-lb (136 Nm) ကို အင်ဂျင်အပူပေးလည်ပတ်ပြီးနောက် (Retorque) ပြန်လည်စစ်ဆေးဆွဲသင့်ပါသည်',
        'ကွန်ရော့ချောင်းနတ်များတွင် Tab washer ကို မျက်နှာပြင်ညီအောင် သေချာခေါက်ပိတ်ပါ'
      ],
      criticalSpecs: [
        'Head: 136 Nm (100 Ft-lb), Con-Rod: 68 Nm (50 Ft-lb), Main: 156 Nm (115 Ft-lb), Pulley: 400 Nm'
      ]
    }
  },
  {
    id: 'mf-385-375-290',
    brand: 'massey_ferguson',
    brandLabel: 'MASSEY FERGUSON (မက်ဆီဖာဂူဆန် / ဖာကူဆန်)',
    category: 'tractor',
    categoryLabel: 'လယ်ယာသုံး ထွန်စက်ကြီး (Tractor)',
    name: 'Massey Ferguson MF 385 / MF 375 / MF 290',
    engineCode: 'Perkins 4.248 / 4.236 (4-Cylinder 4.1L Diesel)',
    machineModel: 'MF 385 (85 HP), MF 375 (75 HP), MF 290 4WD Heavy Tractor',
    horsepower: 85,
    cylinders: 4,
    displacementCc: 4060,
    boreStrokeMm: '101 x 127 mm (3.977" x 5.0")',
    coolingType: 'ရေလည်စနစ် (Heavy Duty Tropical Radiator)',
    torqueSpecs: [
      {
        id: 'head-mf385',
        name: 'Cylinder Head Bolts & Studs (1/2" UNF)',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင် (Perkins 4.248/4.236 Head)',
        socketMm: '11/16" သို့မဟုတ် 18 mm / 19 mm',
        boltSize: '1/2" UNF Heavy Studs & Bolts (22/24 လုံး)',
        sequenceStage: 'အဆင့် ၃ ဆင့်ဖြင့် ဆွဲပါ',
        nm: 140,
        ftlb: 103,
        kgfm: 14.3,
        notes: 'Perkins မူရင်း: အဆင့် ၁: 60 Nm -> အဆင့် ၂: 100 Nm -> အဆင့် ၃: 140 Nm (103-105 Ft-lb)'
      },
      {
        id: 'conrod-mf385',
        name: 'Connecting Rod Cap Bolts & Nuts (1/2" UNF)',
        burmeseName: 'ကွန်ရော့ပေါင် / ချောင်းပေါင် (Con-Rod Heavy Duty)',
        socketMm: '3/4" သို့မဟုတ် 19 mm',
        boltSize: '1/2" UNF High Strength Bolts',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 95,
        ftlb: 70,
        kgfm: 9.7,
        notes: 'ဆီသုတ်ဆွဲပါ။ 70 Ft-lb (95 Nm) အတိအကျထားပါ'
      },
      {
        id: 'main-mf385',
        name: 'Main Bearing Cap Bolts (5/8" UNF)',
        burmeseName: 'မရိန်းပေါင် (Crankshaft Main Bearing Bolts)',
        socketMm: '15/16" သို့မဟုတ် 24 mm',
        boltSize: '5/8" UNF Heavy Grade Bolts',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 203,
        ftlb: 150,
        kgfm: 20.7,
        notes: 'မရိန်းအိမ် ၅ ခုကို အလယ်မှစ၍ အပြင်သို့ ၁၅၀ ပေါင် (203 Nm) အတိအကျဆွဲပါ'
      },
      {
        id: 'flywheel-mf385',
        name: 'Flywheel Bolts (1/2" UNF)',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel Bolts)',
        socketMm: '3/4" သို့မဟုတ် 19 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်အဆင့်ဆင့်',
        nm: 115,
        ftlb: 85,
        kgfm: 11.7,
        notes: 'Thread locker သုံးပြီး ဒေါင့်ဖြတ်ညီမျှစွာဆွဲပါ'
      },
      {
        id: 'crank-pulley-mf385',
        name: 'Crankshaft Pulley Bolt / Nut',
        burmeseName: 'ရှေ့ပူလီခရိုင်းရှပ်နတ်ကြီး (Front Pulley Nut)',
        socketMm: '38 mm / 41 mm',
        sequenceStage: 'အပြည့်ဆွဲပါ',
        nm: 400,
        ftlb: 295,
        kgfm: 40.8,
        notes: 'ရှေ့ပူလီနတ်ကြီးကို ၂၉၅ ပေါင် အပြည့်ဆွဲရမည်'
      },
      {
        id: 'balancer-mf385',
        name: 'Engine Balancer Unit Bolts',
        burmeseName: 'အင်ဂျင်ဗလန်ဆာ ဆွဲပေါင် (Balancer Unit Bolts)',
        socketMm: '17 mm / 19 mm',
        sequenceStage: 'အဆင့်ဆင့်ဆွဲပါ',
        nm: 75,
        ftlb: 55,
        kgfm: 7.6,
        notes: 'Perkins 4-cylinder အောက်ခံ Balancer ဂီယာအမှတ်တိုက်ပြီး သေချာဆွဲပါ'
      },
      {
        id: 'rocker-mf385',
        name: 'Rocker Shaft Bracket Nuts',
        burmeseName: 'ရော့ကာရှပ်ဒေါက်ခုံနတ်များ (Rocker Pedestals)',
        socketMm: '1/2" သို့မဟုတ် 13 mm',
        sequenceStage: 'တပြိုင်နက်ညီမျှစွာ',
        nm: 40,
        ftlb: 30,
        kgfm: 4.1,
        notes: 'အလယ်မှစ၍ ဘေးသို့ တဆင့်ချင်းဆွဲပါ'
      }
    ],
    headSequence: {
      boltCount: 18,
      layoutType: 'inline_18',
      order: [10, 4, 1, 5, 9, 14, 18, 15, 11, 7, 2, 3, 6, 8, 12, 16, 17, 13],
      stages: [
        { step: 1, description: 'အဆင့် ၁', nm: 60, ftlb: 44, kgfm: 6.1 },
        { step: 2, description: 'အဆင့် ၂', nm: 100, ftlb: 74, kgfm: 10.2 },
        { step: 3, description: 'အဆင့် ၃ မူရင်းစံချိန်ပြည့်', nm: 140, ftlb: 103, kgfm: 14.3 }
      ],
      notes: 'အလယ်ဗဟိုမှ စတင်ကာ ဘေးနှစ်ဖက်သို့ အဆင့် ၃ ဆင့်ဖြင့် ညီမျှစွာဆွဲပါ'
    },
    clearances: [
      {
        id: 'valve-in-mf385',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.30 mm (0.012")',
        limitVal: '0.35 mm',
        unit: 'mm',
        checkMethod: 'ဖီးလာဂေ့ 0.30 mm စံထားညှိပါ'
      },
      {
        id: 'valve-ex-mf385',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.30 mm (0.012")',
        limitVal: '0.35 mm',
        unit: 'mm',
        checkMethod: 'ဖီးလာဂေ့ 0.30 mm စံထားညှိပါ'
      },
      {
        id: 'liner-mf385',
        name: 'Cylinder Liner Protrusion',
        burmeseName: 'လိုင်နာအထိုင်အမြင့် (Cylinder Block အထက်)',
        standardVal: '0.76 - 0.89 mm (0.030" - 0.035")',
        limitVal: '0.92 mm',
        unit: 'mm',
        checkMethod: 'Block မျက်နှာပြင်ထက် Dial Indicator ဖြင့် စစ်ဆေးပါ'
      },
      {
        id: 'thrust-mf385',
        name: 'Crankshaft Thrust Clearance',
        burmeseName: 'ခရိုင်းရှပ် ဘေးရွေ့ကင်းလွတ်ခွာ (Thrust Clearance)',
        standardVal: '0.05 - 0.38 mm',
        limitVal: '0.45 mm',
        unit: 'mm',
        checkMethod: 'အလယ်မရိန်းအိမ်ရှိ Thrust Washer ဘေးခွာ စစ်ဆေးပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '180 - 190 kgf/cm²',
      nozzlePressureBar: '177 - 186 bar',
      nozzlePressurePsi: '2,560 - 2,700 psi',
      injectionTimingBtdc: '23° - 24° BTDC',
      pumpType: 'Lucas CAV Delphi DPA Rotary Pump',
      pumpTypeMm: 'ဖလိုက်ဝှီးဒီဂရီမာ့ခ် & ဆီပန့်အတွင်း အမှတ်တိုက်',
      glowPlugSpec: 'Thermostart Glow Plug 12V (Manifold Preheater)',
      nozzleHolderTorque: '68 Nm (50 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 8.5,
      engineOilGrade: 'SAE 15W-40 API CI-4 / CH-4',
      coolantLiters: 14.5,
      hydraulicTransmissionLiters: 42.0,
      hydraulicTransmissionGrade: 'MF CMS M1143 / M1145 / UTTO Tractor Fluid',
      fuelTankLiters: 108.0
    },
    proTips: {
      gasketSelection: [
        'MF 385/375 သည် စွမ်းအားကြီးမားသဖြင့် မူရင်း Perkins Genuine Head Gasket ကိုသာ အသုံးပြုပါ',
        'ဂက်စကတ်မတပ်မီ ဆလင်ဒါဘလောက်နှင့် ခေါင်းမျက်နှာပြင်ကို ကောင်းစွာ သန့်စင်စစ်ဆေးပါ'
      ],
      timingGearMarks: [
        'ခရိုင်းဂီယာ၊ အလယ်အိုင်ဒလာဂီယာ၊ ကင်းရှပ်ဂီယာနှင့် ဆီပန့်ဂီယာ အမှတ်အသားများ တိုက်ဆိုင်ပါ',
        'အင်ဂျင်အောက်ခံ Balancer Gear မာ့ခ်များကိုလည်း တိကျစွာတိုက်ဆိုင်တပ်ဆင်ရပါမည်'
      ],
      workshopWarnings: [
        'Main Bearing 150 Ft-lb (203 Nm) သည် ပေါင်ကြီးမားသဖြင့် အရည်အသွေးမြင့် 3/4" Drive Torque Wrench သုံးပါ',
        'Transmission Oil တွင် သာမန်ဟိုက်ဒရောလစ်ဆီမသုံးရ၊ Wet Brake အတွက် သီးသန့် UTTO / M1143 ဆီသာသုံးပါ'
      ],
      criticalSpecs: [
        'Head: 140 Nm (103 Ft-lb), Con-Rod: 95 Nm (70 Ft-lb), Main: 203 Nm (150 Ft-lb), Pulley: 400 Nm'
      ]
    }
  },
  {
    id: 'mf-260-turbo',
    brand: 'massey_ferguson',
    brandLabel: 'MASSEY FERGUSON (မက်ဆီဖာဂူဆန် / ဖာကူဆန်)',
    category: 'tractor',
    categoryLabel: 'လယ်ယာသုံး ထွန်စက်ကြီး (Tractor)',
    name: 'Massey Ferguson MF 260 Turbo',
    engineCode: 'Perkins T3.1524 (3-Cylinder 2.5L Turbocharged Diesel)',
    machineModel: 'MF 260 Turbo 60 HP 2WD/4WD High Efficiency Tractor',
    horsepower: 60,
    cylinders: 3,
    displacementCc: 2500,
    boreStrokeMm: '91.44 x 127 mm (Turbocharged)',
    coolingType: 'ရေလည်စနစ် + တာဘိုချာဂျာ (Turbo)',
    torqueSpecs: [
      {
        id: 'head-mf260',
        name: 'Cylinder Head Bolts & Nuts (1/2" UNF Turbo Spec)',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင် (Perkins T3.1524 Turbo)',
        socketMm: '11/16" သို့မဟုတ် 18 mm / 19 mm',
        boltSize: '1/2" UNF High Strength Turbo Bolts',
        sequenceStage: 'အဆင့် ၃ ဆင့်ဖြင့် ဆွဲပါ',
        nm: 136,
        ftlb: 100,
        kgfm: 13.9,
        notes: 'အဆင့် ၁: 60 Nm -> အဆင့် ၂: 100 Nm -> အဆင့် ၃: 136 Nm (100 Ft-lb)'
      },
      {
        id: 'conrod-mf260',
        name: 'Connecting Rod Cap Nuts (7/16" UNF)',
        burmeseName: 'ကွန်ရော့ပေါင် / ချောင်းပေါင် (Con-Rod Nuts)',
        socketMm: '11/16" သို့မဟုတ် 18 mm',
        boltSize: '7/16" UNF',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 68,
        ftlb: 50,
        kgfm: 6.9,
        notes: 'ဆီသုတ်ဆွဲပါ၊ 50 Ft-lb (68 Nm)'
      },
      {
        id: 'main-mf260',
        name: 'Main Bearing Cap Bolts (5/8" UNF)',
        burmeseName: 'မရိန်းပေါင် (Crankshaft Main Bearing Bolts)',
        socketMm: '15/16" သို့မဟုတ် 24 mm',
        boltSize: '5/8" UNF',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 156,
        ftlb: 115,
        kgfm: 15.9,
        notes: 'မရိန်းအိမ် ၄ ခုကို အလယ်မှစ၍ အပြင်သို့ ၁၁၅ ပေါင် ဆွဲပါ'
      },
      {
        id: 'flywheel-mf260',
        name: 'Flywheel Bolts',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel Bolts)',
        socketMm: '3/4" သို့မဟုတ် 19 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်အညီအမျှ',
        nm: 115,
        ftlb: 85,
        kgfm: 11.7,
        notes: 'Thread locker သုံးပြီး ဒေါင့်ဖြတ်ဆွဲပါ'
      },
      {
        id: 'turbo-manifold-mf260',
        name: 'Turbocharger & Exhaust Manifold Nuts',
        burmeseName: 'တာဘိုချာဂျာ & အိတ်ဇောမိုးနီးဖိုး ပေါင်',
        socketMm: '13 mm / 14 mm',
        sequenceStage: 'အညီအမျှဆွဲပါ',
        nm: 45,
        ftlb: 33,
        kgfm: 4.6,
        notes: 'ကြေးနီနတ်များဖြင့် အညီအမျှဆွဲပါ'
      }
    ],
    headSequence: {
      boltCount: 18,
      layoutType: 'inline_18',
      order: [10, 4, 1, 5, 9, 14, 18, 15, 11, 7, 2, 3, 6, 8, 12, 16, 17, 13],
      stages: [
        { step: 1, description: 'အဆင့် ၁', nm: 60, ftlb: 44, kgfm: 6.1 },
        { step: 2, description: 'အဆင့် ၂', nm: 100, ftlb: 74, kgfm: 10.2 },
        { step: 3, description: 'အဆင့် ၃ မူရင်းစံချိန်ပြည့်', nm: 136, ftlb: 100, kgfm: 13.9 }
      ],
      notes: 'အလယ်ဗဟိုမှ စတင်ကာ ဘေးနှစ်ဖက်သို့ အဆင့် ၃ ဆင့်ဖြင့် ညီမျှစွာဆွဲပါ'
    },
    clearances: [
      {
        id: 'valve-in-mf260',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.30 mm (0.012")',
        limitVal: '0.35 mm',
        unit: 'mm',
        checkMethod: '0.30 mm ဖီးလာဂေ့ စံထားညှိပါ'
      },
      {
        id: 'valve-ex-mf260',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.30 mm (0.012")',
        limitVal: '0.35 mm',
        unit: 'mm',
        checkMethod: '0.30 mm ဖီးလာဂေ့ စံထားညှိပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '190 - 200 kgf/cm²',
      nozzlePressureBar: '186 - 196 bar',
      nozzlePressurePsi: '2,700 - 2,850 psi',
      injectionTimingBtdc: '18° BTDC',
      pumpType: 'Lucas CAV Delphi Rotary Injection Pump with Boost Control',
      pumpTypeMm: 'ဖလိုက်ဝှီးဒီဂရီ အမှတ်နှင့် CAV ပန့်အတွင်း လိုင်းမာ့ခ်တိုက်',
      glowPlugSpec: 'Thermostart Glow Plug 12V',
      nozzleHolderTorque: '68 Nm (50 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 7.0,
      engineOilGrade: 'SAE 15W-40 CI-4 Turbo Diesel Spec',
      coolantLiters: 10.5,
      hydraulicTransmissionLiters: 36.0,
      hydraulicTransmissionGrade: 'MF CMS M1135 / M1143 / UTTO',
      fuelTankLiters: 52.0
    },
    proTips: {
      gasketSelection: [
        'Turbo အင်ဂျင်ဖြစ်၍ Boost ဖိအားခံနိုင်သော Perkins Multi-Layer Steel (MLS) သို့မဟုတ် Heavy Duty Gasket သုံးပါ'
      ],
      timingGearMarks: [
        'ခရိုင်း (S) - Idler (S-S), ကင်းရှပ် (C) - Idler (C-C), ဆီပန့် (D) - Idler (D-D) တိုက်ဆိုင်ပါ'
      ],
      workshopWarnings: [
        'တာဘိုအသစ်တပ်ဆင်ချိန်တွင် တာဘိုဝင်းရိုးထဲသို့ အင်ဂျင်ဝိုင်ကြိုတင်ထည့်သွင်း၍ ချောဆီရအောင်ပြုလုပ်ပါ'
      ],
      criticalSpecs: [
        'Head: 136 Nm (100 Ft-lb), Con-Rod: 68 Nm (50 Ft-lb), Main: 156 Nm (115 Ft-lb)'
      ]
    }
  }
];
