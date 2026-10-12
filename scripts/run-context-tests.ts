import { calcNAQI, computeAQI, PM25_BANDS, isUnsafeOutdoors, chooseMovementMode } from '../lib/naqi';
import { generateWeeklyPlan } from '../lib/generator';

const out: [string, string, boolean][] = [];
const t = (id: string, got: string, ok: boolean) => out.push([id, got, ok]);

const a = calcNAQI(30.6, PM25_BANDS);
t('TC14', `PM2.5 30.6 -> ${a}`, a === 51);
const b = computeAQI(95, 120);
t('TC15', `PM2.5 95, PM10 120 -> ${b}`, b === 215);
const th = [isUnsafeOutdoors(36, 50), isUnsafeOutdoors(35, 200), isUnsafeOutdoors(30, 201), isUnsafeOutdoors(35.1, 100)];
t('TC16', th.join(', '), th.join() === 'true,false,true,true');
const m = [chooseMovementMode(true, true), chooseMovementMode(false, true), chooseMovementMode(false, false)];
t('TC17', m.join(' | '), m.join() === 'recovery,indoor,standard');

const prof = (diet: string, veg: boolean): any => ({
  age: 45, gender: 'Male', region: 'Maharashtra', height: 170, weight: 64, bmi: 22,
  conditions: [], activityLevel: '30+ mins', sleepHours: '7–8 hours', stressLevel: 'Low',
  dietType: diet, isVegetarian: veg, cookingOil: 'Cold-pressed', digestiveIssues: [],
});
const SL = ['breakfast', 'lunch', 'snack', 'dinner'];
const bad = (p: any, banned: RegExp) =>
  generateWeeklyPlan(p).flatMap((d: any) => SL.map(s => d[s].sequence as string[] | undefined))
    .filter(s => !s || s.length !== 3 || banned.test(s.join(' '))).length;
const nv = bad(prof('Non-Vegetarian', false), /$^/);
const ve = bad(prof('Vegetarian', true), /egg|fish|chicken/i);
const vg = bad(prof('Vegan', true), /egg|fish|chicken|curd|paneer/i);
t('TC18', `invalid sequences: non-veg ${nv}, veg ${ve}, vegan ${vg}`, nv + ve + vg === 0);

out.forEach(([id, got, ok]) => console.log(ok ? 'PASS' : 'FAIL', id, got));