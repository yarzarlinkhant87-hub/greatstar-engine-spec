/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BrandId =
  | 'all'
  | 'chinese_truck'
  | 'kubota'
  | 'yanmar'
  | 'massey_ferguson'
  | 'ford_newholland'
  | 'sonalika_deere';

export type MachineCategory =
  | 'all'
  | 'dump_truck'
  | 'tractor'
  | 'harvester'
  | 'single_cylinder'
  | 'light_truck';

export type TorqueUnit = 'nm' | 'ftlb' | 'kgfm';
export type ZoomLevel = 'normal' | 'large' | 'extralarge';

export interface TorqueSpecItem {
  id: string;
  name: string;
  burmeseName: string;
  socketMm: string;
  boltSize?: string;
  sequenceStage: string;
  nm: number;
  ftlb: number;
  kgfm: number;
  degrees?: string;
  isAngleTorque?: boolean;
  notes?: string;
}

export interface CylinderHeadBoltSequence {
  boltCount: number;
  layoutType: 'single_4' | 'inline_8' | 'inline_14' | 'inline_18' | 'ford_10' | 'weichai_individual_4';
  order: number[];
  stages: {
    step: number;
    description: string;
    nm: number;
    ftlb: number;
    kgfm: number;
    degree?: string;
  }[];
  notes: string;
}

export interface ClearanceItem {
  id: string;
  name: string;
  burmeseName: string;
  standardVal: string;
  limitVal: string;
  unit: string;
  checkMethod: string;
}

export interface FuelSystemSpec {
  nozzlePressureKgf: string;
  nozzlePressureBar: string;
  nozzlePressurePsi: string;
  injectionTimingBtdc: string;
  pumpType: string;
  pumpTypeMm: string;
  glowPlugSpec: string;
  nozzleHolderTorque: string;
  // RPM-stage pressures (Idle, Normal, High-Speed)
  idleRpm?: string;
  idleFeedPressurePsi?: string;
  idleDeliveryMm3?: string;
  normalRpm?: string;
  normalFeedPressurePsi?: string;
  normalDeliveryMm3?: string;
  highSpeedRpm?: string;
  highSpeedPressurePsi?: string;
  highSpeedDeliveryMm3?: string;
  // Oil Pressure
  oilPressureIdlePsi?: string;
  oilPressureHighPsi?: string;
  // Test Bench & Plunger specs
  plungerPeakPressureBar?: string;
}

export interface DumpHydraulicSpec {
  pumpModel: string; // e.g. KP1405A / KP75B
  systemPressureBar: string; // e.g. 140 - 170 bar (14 - 17 MPa)
  ptoGearboxRatio: string; // e.g. Left/Right side PTO air-actuated
  valveType: string; // e.g. Pneumatic 3-way/4-way tipping valve
  oilCapacityLiters: number;
  oilGrade: string; // e.g. ISO VG 46 / 68 Anti-wear Hydraulic Oil
  cylinderBoreStroke: string; // Telescopic Multi-stage cylinder
  troubleshootingTips: string[];
}

export interface PneumaticSplitterSpec {
  gearboxModel: string; // e.g. Fast 8JS85, 9JS119, 12JS160T
  systemPressureRange: string; // e.g. 6.5 - 8.5 bar (0.65 - 0.85 MPa)
  doubleHValveSpec: string; // 5-port air valve operation
  rangeCylinderStroke: string; // High/Low range shift cylinder
  clutchInterlockValve: string; // Safety lock protection
  troubleshootingAirLeaks: string[];
}

export interface FluidSpecs {
  engineOilLiters: number;
  engineOilGrade: string;
  coolantLiters: number;
  hydraulicTransmissionLiters: number;
  hydraulicTransmissionGrade: string;
  fuelTankLiters: number;
}

export interface ProTipSection {
  gasketSelection: string[];
  timingGearMarks: string[];
  workshopWarnings: string[];
  criticalSpecs: string[];
}

export interface AgriEngine {
  id: string;
  brand: BrandId;
  brandLabel: string;
  category: MachineCategory;
  categoryLabel: string;
  name: string;
  engineCode: string;
  machineModel: string;
  horsepower: number;
  cylinders: number;
  displacementCc: number;
  boreStrokeMm: string;
  coolingType: string;
  torqueSpecs: TorqueSpecItem[];
  headSequence: CylinderHeadBoltSequence;
  clearances: ClearanceItem[];
  fuelSystem: FuelSystemSpec;
  fluids: FluidSpecs;
  proTips: ProTipSection;
  dumpHydraulics?: DumpHydraulicSpec;
  pneumaticSplitter?: PneumaticSplitterSpec;
}
