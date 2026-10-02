/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgriEngine, BrandId, MachineCategory } from '../types/engine';
import { chineseTruckEngines } from './chineseTruckData';
import { kubotaEngines } from './kubotaData';
import { yanmarEngines } from './yanmarData';
import { masseyFergusonEngines } from './masseyFergusonData';
import { otherAgriEngines } from './otherData';

export const allAgriEngines: AgriEngine[] = [
  ...chineseTruckEngines,
  ...kubotaEngines,
  ...yanmarEngines,
  ...masseyFergusonEngines,
  ...otherAgriEngines,
];

export const brandList: { id: BrandId; label: string; count: number }[] = [
  { id: 'all', label: 'အားလုံး (All Machinery & Trucks)', count: allAgriEngines.length },
  { id: 'chinese_truck', label: 'တရုတ်ဒန့်ကား (CHINESE DUMP TRUCKS)', count: chineseTruckEngines.length },
  { id: 'kubota', label: 'KUBOTA (ကူဘိုတာ)', count: kubotaEngines.length },
  { id: 'yanmar', label: 'YANMAR (ယန်မာ)', count: yanmarEngines.length },
  { id: 'massey_ferguson', label: 'MASSEY FERGUSON (မက်ဆီဖာဂူဆန်)', count: masseyFergusonEngines.length },
  { id: 'ford_newholland', label: 'FORD / NEW HOLLAND', count: 2 },
  { id: 'sonalika_deere', label: 'JOHN DEERE / SONALIKA', count: 2 },
];

export const categoryList: { id: MachineCategory; label: string }[] = [
  { id: 'all', label: 'အားလုံး (All Types)' },
  { id: 'dump_truck', label: 'ဒန့်ကားကြီးများ (Dump Trucks)' },
  { id: 'light_truck', label: 'ဒန့်ကားငယ် (Mini Dumps)' },
  { id: 'tractor', label: 'ထွန်စက်ကြီးများ (Tractors)' },
  { id: 'harvester', label: 'ရိတ်ခြွေစက်များ (Harvesters)' },
  { id: 'single_cylinder', label: 'လက်တွန်းအင်ဂျင် (1-Cyl Diesel)' },
];
