/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgriEngine } from '../types/engine';

export const otherAgriEngines: AgriEngine[] = [
  {
    id: 'ford-6610-5000',
    brand: 'ford_newholland',
    brandLabel: 'FORD / NEW HOLLAND',
    category: 'tractor',
    categoryLabel: 'လယ်ယာသုံး ထွန်စက်ကြီး (Tractor)',
    name: 'Ford 5000 / Ford 6610 Tractor',
    engineCode: 'Ford 256 / 268 CID Diesel (4-Cylinder)',
    machineModel: 'Ford 5000 & 6610 2WD/4WD Heavy Duty Tractor',
    horsepower: 82,
    cylinders: 4,
    displacementCc: 4390,
    boreStrokeMm: '112 x 112 mm (Square Engine)',
    coolingType: 'ရေလည်စနစ် (Heavy Duty Radiator)',
    torqueSpecs: [
      {
        id: 'head-ford6610',
        name: 'Cylinder Head Bolts (9/16" Bolts)',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင် (Head Bolts 10/14 လုံး)',
        socketMm: '13/16" သို့မဟုတ် 21 mm',
        boltSize: '9/16" UNC Heavy Bolts',
        sequenceStage: 'အဆင့် ၃ ဆင့်ဖြင့် ဆွဲပါ',
        nm: 156,
        ftlb: 115,
        kgfm: 15.9,
        notes: 'Ford မူရင်းစံနှုန်း: အဆင့် ၁: 75 Nm -> အဆင့် ၂: 115 Nm -> အဆင့် ၃: 156 Nm (115 Ft-lb)'
      },
      {
        id: 'conrod-ford6610',
        name: 'Connecting Rod Cap Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် (Con-Rod Bolts 1/2")',
        socketMm: '3/4" သို့မဟုတ် 19 mm',
        boltSize: '1/2" UNF',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 88,
        ftlb: 65,
        kgfm: 9.0,
        notes: 'ဆီသုတ်ဆွဲပါ၊ 65 Ft-lb အတိအကျထားပါ'
      },
      {
        id: 'main-ford6610',
        name: 'Main Bearing Bolts',
        burmeseName: 'မရိန်းပေါင် (Main Bearing Bolts 5/8")',
        socketMm: '15/16" သို့မဟုတ် 24 mm',
        boltSize: '5/8" UNC',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 197,
        ftlb: 145,
        kgfm: 20.0,
        notes: 'မရိန်းခွံ ၅ ခု အလယ်မှစတင်၍ ဆွဲပါ'
      },
      {
        id: 'flywheel-ford6610',
        name: 'Flywheel Bolts',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel Bolts)',
        socketMm: '3/4" သို့မဟုတ် 19 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်',
        nm: 142,
        ftlb: 105,
        kgfm: 14.5,
        notes: 'Thread locker သုံးပြီး ဒေါင့်ဖြတ်ဆွဲပါ'
      }
    ],
    headSequence: {
      boltCount: 14,
      layoutType: 'inline_14',
      order: [8, 4, 1, 5, 9, 12, 14, 10, 6, 2, 3, 7, 11, 13],
      stages: [
        { step: 1, description: 'အဆင့် ၁', nm: 75, ftlb: 55, kgfm: 7.6 },
        { step: 2, description: 'အဆင့် ၂', nm: 115, ftlb: 85, kgfm: 11.7 },
        { step: 3, description: 'အဆင့် ၃ စံချိန်ပြည့်', nm: 156, ftlb: 115, kgfm: 15.9 }
      ],
      notes: 'ဆလင်ဒါခေါင်း အလယ်မှ အပြင်သို့ အဆင့်ဆင့်ဆွဲပါ'
    },
    clearances: [
      {
        id: 'valve-in-ford',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.36 - 0.41 (0.014" - 0.016")',
        limitVal: '0.45',
        unit: 'mm',
        checkMethod: 'ဖီးလာဂေ့ 0.38 mm (0.015") စံထားညှိပါ'
      },
      {
        id: 'valve-ex-ford',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.43 - 0.48 (0.017" - 0.019")',
        limitVal: '0.52',
        unit: 'mm',
        checkMethod: 'ဖီးလာဂေ့ 0.45 mm (0.018") စံထားညှိပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '190 - 200 kgf/cm²',
      nozzlePressureBar: '186 - 196 bar',
      nozzlePressurePsi: '2,700 - 2,850 psi',
      injectionTimingBtdc: '18° - 20° BTDC',
      pumpType: 'Simms Minimec In-line / CAV DPA Rotary Pump',
      pumpTypeMm: 'ဆီပန့်အထိုင် လှည့်၍ မီးချိန်ညှိ',
      glowPlugSpec: 'Thermostart Manifold Glow Plug (12V)',
      nozzleHolderTorque: '30 Nm (22 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 10.0,
      engineOilGrade: 'SAE 15W-40 CI-4 Heavy Tractor Oil',
      coolantLiters: 14.5,
      hydraulicTransmissionLiters: 48.0,
      hydraulicTransmissionGrade: 'Ambra Multi-G 10W-30 / Universal Tractor Oil',
      fuelTankLiters: 75.0
    },
    proTips: {
      gasketSelection: ['Ford 6610 တွင် ကြေးကွင်းပါသော Heavy Duty Composite Gasket အသုံးပြုပါ'],
      timingGearMarks: ['ခရိုင်းဂီယာ၊ ကင်းရှပ်ဂီယာနှင့် ဆီပန့်ဂီယာ စက်ဝိုင်းအမှတ်များ တိုက်ပါ'],
      workshopWarnings: ['Ford အင်ဂျင်သည် ပေါင်ကြီးသဖြင့် Torque Wrench အကြီးစားဖြင့် စံချိန်ပြည့်ဆွဲရမည်'],
      criticalSpecs: ['Head: 156 Nm (115 Ft-lb), Main: 197 Nm (145 Ft-lb), Con-Rod: 88 Nm (65 Ft-lb)']
    }
  },
  {
    id: 'new-holland-tt475',
    brand: 'ford_newholland',
    brandLabel: 'FORD / NEW HOLLAND',
    category: 'tractor',
    categoryLabel: 'လယ်ယာသုံး ထွန်စက်ကြီး (Tractor)',
    name: 'New Holland TT4.75 / TT55 Tractor',
    engineCode: 'Iveco 8045.25 (3.9L Turbo) / 8035 (3-Cyl)',
    machineModel: 'New Holland TT55 & TT4.75 4WD Tractor',
    horsepower: 75,
    cylinders: 4,
    displacementCc: 3908,
    boreStrokeMm: '104 x 115 mm',
    coolingType: 'ရေလည်စနစ် + တာဘို',
    torqueSpecs: [
      {
        id: 'head-tt475',
        name: 'Cylinder Head Bolts (M14 Bolts)',
        burmeseName: 'Iveco အင်ဂျင် ဆလင်ဒါခေါင်းဆွဲပေါင်',
        socketMm: '22 mm',
        boltSize: 'M14 x 1.5',
        sequenceStage: 'အဆင့် ၃ ဆင့် + ဒီဂရီ 90°',
        nm: 140,
        ftlb: 103,
        kgfm: 14.3,
        degrees: '+ 90° ဒီဂရီ ထပ်ဆွဲရန် (Angle Torque)',
        isAngleTorque: true,
        notes: 'အဆင့် ၁: 70 Nm -> အဆင့် ၂: 140 Nm -> အဆင့် ၃: + 90° ဒီဂရီ ဆက်ဆွဲပါ'
      },
      {
        id: 'conrod-tt475',
        name: 'Connecting Rod Cap Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် (Con-Rod)',
        socketMm: '17 mm',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 78,
        ftlb: 58,
        kgfm: 8.0,
        notes: 'ဆီသုတ်ပြီး အညီအမျှဆွဲပါ'
      },
      {
        id: 'main-tt475',
        name: 'Main Bearing Cap Bolts',
        burmeseName: 'မရိန်းပေါင် (Main Bearing)',
        socketMm: '24 mm',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 160,
        ftlb: 118,
        kgfm: 16.3,
        notes: 'ခရိုင်းမရိန်းအိမ် ၅ ခုဆွဲပါ'
      },
      {
        id: 'flywheel-tt475',
        name: 'Flywheel Bolts',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel)',
        socketMm: '19 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်',
        nm: 137,
        ftlb: 101,
        kgfm: 14.0,
        notes: 'Thread locker သုံးပါ'
      }
    ],
    headSequence: {
      boltCount: 14,
      layoutType: 'inline_14',
      order: [8, 4, 1, 5, 9, 12, 14, 10, 6, 2, 3, 7, 11, 13],
      stages: [
        { step: 1, description: 'အဆင့် ၁', nm: 70, ftlb: 52, kgfm: 7.1 },
        { step: 2, description: 'အဆင့် ၂', nm: 140, ftlb: 103, kgfm: 14.3 },
        { step: 3, description: 'အဆင့် ၃ ဒီဂရီ', nm: 140, ftlb: 103, kgfm: 14.3, degree: '+90°' }
      ],
      notes: 'အလယ်မှစ၍ အပြင်သို့ဆွဲပြီး နောက်ဆုံးတွင် +90 ဒီဂရီ တစ်လုံးချင်း ဆက်ဆွဲပါ'
    },
    clearances: [
      {
        id: 'valve-in-tt475',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.25 - 0.30',
        limitVal: '0.35',
        unit: 'mm',
        checkMethod: '0.30 mm စံထားညှိပါ'
      },
      {
        id: 'valve-ex-tt475',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.25 - 0.30',
        limitVal: '0.35',
        unit: 'mm',
        checkMethod: '0.30 mm စံထားညှိပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '230 - 240 kgf/cm²',
      nozzlePressureBar: '225 - 235 bar',
      nozzlePressurePsi: '3,270 - 3,410 psi',
      injectionTimingBtdc: '14° - 16° BTDC',
      pumpType: 'Bosch VE Rotary Distributor Injection Pump',
      pumpTypeMm: 'ချိန်ညှိတိုက်ရိုက်',
      glowPlugSpec: 'Grid Heater / Intake Glow',
      nozzleHolderTorque: '35 Nm (26 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 9.0,
      engineOilGrade: 'SAE 15W-40 CI-4',
      coolantLiters: 11.5,
      hydraulicTransmissionLiters: 42.0,
      hydraulicTransmissionGrade: 'Ambra Mastertran / Multi-G 10W-30',
      fuelTankLiters: 65.0
    },
    proTips: {
      gasketSelection: ['Iveco အင်ဂျင်တွင် +90 ဒီဂရီ ပါရှိသဖြင့် Head Bolt အသစ် သုံးရန် အကြံပြုပါသည်'],
      timingGearMarks: ['ခရိုင်း၊ ကင်းရှပ်နှင့် VE ဆီပန့်ဂီယာ မာ့ခ်များ တိကျစွာတိုက်ဆိုင်ပါ'],
      workshopWarnings: ['VE ပန့်တိုင်မင် လွဲပါက စက်နှိုးခက်ပြီး မီးခိုးဖြူ အမြောက်အမြားထွက်မည်'],
      criticalSpecs: ['Head: 140 Nm + 90°, Con-Rod: 78 Nm, Main: 160 Nm']
    }
  },
  {
    id: 'john-deere-5045-5050',
    brand: 'sonalika_deere',
    brandLabel: 'SONALIKA / JOHN DEERE',
    category: 'tractor',
    categoryLabel: 'လယ်ယာသုံး ထွန်စက်ကြီး (Tractor)',
    name: 'John Deere 5045D / 5050D / 5310',
    engineCode: 'PowerTech 3029D / 3029T (3-Cylinder 2.9L)',
    machineModel: 'John Deere 5045D (45HP), 5050D (50HP), 5310 (55HP)',
    horsepower: 50,
    cylinders: 3,
    displacementCc: 2940,
    boreStrokeMm: '106.5 x 110 mm',
    coolingType: 'ရေလည်စနစ် + Wet Sleeve Liners',
    torqueSpecs: [
      {
        id: 'head-jd5050',
        name: 'Cylinder Head Bolts (Flanged M14 Bolts)',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင် (PowerTech Head Bolts)',
        socketMm: '19 mm သို့မဟုတ် E18 Torx / Hex',
        boltSize: 'M14 Flanged Bolts',
        sequenceStage: 'အဆင့် ၃ ဆင့် + ဒီဂရီ 90°',
        nm: 145,
        ftlb: 107,
        kgfm: 14.8,
        degrees: '+ 90° ဒီဂရီ ဆက်ဆွဲရန် (Angle Torque)',
        isAngleTorque: true,
        notes: 'အဆင့် ၁: 50 Nm -> အဆင့် ၂: 100 Nm -> အဆင့် ၃: 145 Nm -> ထပ်မံ၍ +90° ဆက်ဆွဲပါ'
      },
      {
        id: 'conrod-jd5050',
        name: 'Connecting Rod Cap Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် (Con-Rod Fracture Split)',
        socketMm: '15 mm',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 68,
        ftlb: 50,
        kgfm: 6.9,
        degrees: '+ 60° ဒီဂရီ',
        isAngleTorque: true,
        notes: 'ဂျွန်ဒီးယား ချောင်းခေါင်းများသည် ဂျိုက်ခွဲစနစ် (Fracture split) ဖြစ်၍ သေချာဆွဲပါ'
      },
      {
        id: 'main-jd5050',
        name: 'Main Bearing Cap Bolts',
        burmeseName: 'မရိန်းပေါင် (Main Bearing Cap)',
        socketMm: '19 mm',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 135,
        ftlb: 100,
        kgfm: 13.8,
        notes: 'မရိန်းခွံ ၄ ခု အလယ်မှ အပြင်သို့ ဆွဲပါ'
      },
      {
        id: 'flywheel-jd5050',
        name: 'Flywheel Bolts',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel)',
        socketMm: '17 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်',
        nm: 115,
        ftlb: 85,
        kgfm: 11.7,
        notes: 'Thread locker သုံးပါ'
      }
    ],
    headSequence: {
      boltCount: 14,
      layoutType: 'inline_14',
      order: [8, 4, 1, 5, 9, 12, 14, 10, 6, 2, 3, 7, 11, 13],
      stages: [
        { step: 1, description: 'အဆင့် ၁', nm: 50, ftlb: 37, kgfm: 5.1 },
        { step: 2, description: 'အဆင့် ၂', nm: 100, ftlb: 74, kgfm: 10.2 },
        { step: 3, description: 'အဆင့် ၃ ပေါင်ပြည့်', nm: 145, ftlb: 107, kgfm: 14.8 },
        { step: 4, description: 'အဆင့် ၄ ဒီဂရီ', nm: 145, ftlb: 107, kgfm: 14.8, degree: '+90°' }
      ],
      notes: 'အလယ်အမှတ် (၁) မှ စတင်ကာ ဘေးနှစ်ဖက်သို့ အစီအစဉ်အတိုင်း တဆင့်ချင်း ဆွဲရမည်။'
    },
    clearances: [
      {
        id: 'valve-in-jd',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.36 - 0.40',
        limitVal: '0.45',
        unit: 'mm',
        checkMethod: '0.38 mm (0.015") စံထားညှိပါ'
      },
      {
        id: 'valve-ex-jd',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.46 - 0.50',
        limitVal: '0.55',
        unit: 'mm',
        checkMethod: '0.48 mm (0.019") စံထားညှိပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '240 - 250 kgf/cm²',
      nozzlePressureBar: '235 - 245 bar',
      nozzlePressurePsi: '3,410 - 3,550 psi',
      injectionTimingBtdc: '13° - 15° BTDC',
      pumpType: 'Stanadyne DB2 / Bosch In-line Plunger Pump',
      pumpTypeMm: 'ဆီပန့်မီးချိန် အမှတ်အသား တိုက်ဆိုင်',
      glowPlugSpec: 'Intake Air Preheater',
      nozzleHolderTorque: '38 Nm (28 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 8.5,
      engineOilGrade: 'SAE 15W-40 Plus-50 II / CI-4',
      coolantLiters: 8.5,
      hydraulicTransmissionLiters: 38.0,
      hydraulicTransmissionGrade: 'John Deere Hy-Gard Transmission Fluid',
      fuelTankLiters: 60.0
    },
    proTips: {
      gasketSelection: ['PowerTech အင်ဂျင်တွင် Wet Liner အထိုင် 0.04~0.10mm စစ်ဆေးပြီး မူရင်းဂက်စကတ်သာသုံးပါ'],
      timingGearMarks: ['ခရိုင်း၊ ကင်းရှပ်နှင့် ဆီပန့်ဂီယာ စက်ရုံထုတ် အမှတ်တံဆိပ်များ တိကျစွာတိုက်ဆိုင်ပါ'],
      workshopWarnings: ['John Deere ၏ Hy-Gard ဆီနေရာတွင် တခြားဆီရိုးရိုးထည့်ပါက Wet Brake (ဘရိတ်ပြား) ပျက်စီးမည်'],
      criticalSpecs: ['Head: 145 Nm + 90°, Con-Rod: 68 Nm + 60°, Main: 135 Nm']
    }
  },
  {
    id: 'sonalika-di750-rx50',
    brand: 'sonalika_deere',
    brandLabel: 'SONALIKA / JOHN DEERE',
    category: 'tractor',
    categoryLabel: 'လယ်ယာသုံး ထွန်စက်ကြီး (Tractor)',
    name: 'Sonalika DI 750 III / RX 50 / Tiger 60',
    engineCode: 'Sonalika 4087cc (4-Cylinder Heavy Diesel)',
    machineModel: 'Sonalika RX 50 & DI 750 (55HP / 60HP) 4WD',
    horsepower: 55,
    cylinders: 4,
    displacementCc: 4087,
    boreStrokeMm: '105 x 118 mm',
    coolingType: 'ရေလည်စနစ် (Heavy Radiator)',
    torqueSpecs: [
      {
        id: 'head-sonalika',
        name: 'Cylinder Head Bolts (18 bolts M12)',
        burmeseName: 'ဆလင်ဒါခေါင်းဆွဲပေါင်',
        socketMm: '18 mm / 19 mm',
        boltSize: 'M12 x 1.5',
        sequenceStage: 'အဆင့် ၃ ဆင့်',
        nm: 125,
        ftlb: 92,
        kgfm: 12.7,
        notes: 'အဆင့် ၁: 45 Nm -> အဆင့် ၂: 85 Nm -> အဆင့် ၃: 125 Nm'
      },
      {
        id: 'conrod-sonalika',
        name: 'Connecting Rod Cap Bolts',
        burmeseName: 'ကွန်ရော့ပေါင် (Con-Rod)',
        socketMm: '17 mm',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 65,
        ftlb: 48,
        kgfm: 6.6,
        notes: 'ဆီသုတ်ဆွဲပါ'
      },
      {
        id: 'main-sonalika',
        name: 'Main Bearing Cap Bolts',
        burmeseName: 'မရိန်းပေါင် (Main Bearing)',
        socketMm: '22 mm',
        sequenceStage: 'အဆင့် ၂ ဆင့်',
        nm: 155,
        ftlb: 114,
        kgfm: 15.8,
        notes: 'ခရိုင်းမရိန်း ၅ ခု ဆွဲပါ'
      },
      {
        id: 'flywheel-sonalika',
        name: 'Flywheel Bolts',
        burmeseName: 'ဖလိုက်ဝှီးပေါင် (Flywheel)',
        socketMm: '19 mm',
        sequenceStage: 'ဒေါင့်ဖြတ်',
        nm: 130,
        ftlb: 96,
        kgfm: 13.2,
        notes: 'Thread locker သုံးပါ'
      }
    ],
    headSequence: {
      boltCount: 18,
      layoutType: 'inline_18',
      order: [10, 4, 1, 5, 9, 14, 18, 15, 11, 7, 2, 3, 6, 8, 12, 16, 17, 13],
      stages: [
        { step: 1, description: 'အဆင့် ၁', nm: 45, ftlb: 33, kgfm: 4.6 },
        { step: 2, description: 'အဆင့် ၂', nm: 85, ftlb: 63, kgfm: 8.7 },
        { step: 3, description: 'အဆင့် ၃ စံချိန်ပြည့်', nm: 125, ftlb: 92, kgfm: 12.7 }
      ],
      notes: 'အလယ်ဗဟိုမှ စတင်၍ အပြင်သို့ စက်ဝိုင်းပုံစံ ဆွဲပါ'
    },
    clearances: [
      {
        id: 'valve-in-sonalika',
        name: 'Intake Valve Clearance (Cold)',
        burmeseName: 'လေဝင်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.25 - 0.30',
        limitVal: '0.35',
        unit: 'mm',
        checkMethod: '0.30 mm စံထားညှိပါ'
      },
      {
        id: 'valve-ex-sonalika',
        name: 'Exhaust Valve Clearance (Cold)',
        burmeseName: 'လေထွက်ဘား ကင်းလွတ်ခွာ (အေးချိန်)',
        standardVal: '0.30 - 0.35',
        limitVal: '0.40',
        unit: 'mm',
        checkMethod: '0.35 mm စံထားညှိပါ'
      }
    ],
    fuelSystem: {
      nozzlePressureKgf: '200 - 210 kgf/cm²',
      nozzlePressureBar: '196 - 206 bar',
      nozzlePressurePsi: '2,845 - 2,987 psi',
      injectionTimingBtdc: '18° ± 1° BTDC',
      pumpType: 'Bosch In-line 4 Cylinder Plunger Pump',
      pumpTypeMm: 'ဆီချိန်ရှမ်ပြားဖြင့် ချိန်ညှိ',
      glowPlugSpec: 'Thermostart Glow Plug',
      nozzleHolderTorque: '30 Nm (22 Ft-lb)'
    },
    fluids: {
      engineOilLiters: 9.5,
      engineOilGrade: 'SAE 15W-40 CI-4 Heavy Duty',
      coolantLiters: 11.0,
      hydraulicTransmissionLiters: 45.0,
      hydraulicTransmissionGrade: 'Universal Tractor Transmission Oil (UTTO)',
      fuelTankLiters: 65.0
    },
    proTips: {
      gasketSelection: ['Sonalika အင်ဂျင်တွင် ကြေးနီကွင်းပါသော စက်ရုံထုတ် ဂက်စကတ်သာ သုံးပါ'],
      timingGearMarks: ['ခရိုင်း၊ ကင်းရှပ်နှင့် ဆီပန့်ဂီယာ မာ့ခ်များ တိကျစွာတိုက်ဆိုင်ပါ'],
      workshopWarnings: ['ခေါင်းဆွဲပေါင် 125 Nm ကို ၂ ပတ်အကြာတွင် ပြန်လည်စစ်ဆေးဆွဲသင့်ပါသည်'],
      criticalSpecs: ['Head: 125 Nm, Con-Rod: 65 Nm, Main: 155 Nm']
    }
  }
];
