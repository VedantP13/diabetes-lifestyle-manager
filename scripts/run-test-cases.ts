import { determinePhenotype, generateDailyRoutine } from '../lib/insights';
import { generateTransformationReport } from '../lib/insights-engine';
import { generateFitnessPlan } from '../lib/fitness-engine';
import { generateWeeklyPlan } from '../lib/generator';
import dishes from '../data/dishes_mapped.json'; // adjust path

const byId = new Map<string, any>((dishes as any[]).map(d => [d.id, d]));
const base: any = {
  age: 45, gender: 'Male', region: 'Maharashtra', height: 170, weight: 64, bmi: 22,
  conditions: [], activityLevel: '30+ mins', sleepHours: '7–8 hours', stressLevel: 'Low',
  dietType: 'Vegetarian', isVegetarian: true, cookingOil: 'Cold-pressed', digestiveIssues: [],
  dinnerTime: '8:00 PM', sunlightExposure: 'Good', workSchedule: 'Day',
  waterIntake: '2–3 litres', pcosStatus: 'No', physical_limitations: 'None',
};
const P = (o: any) => ({ ...base, ...o });
const SL = ['breakfast', 'lunch', 'snack', 'dinner'];
const meals = (p: any) => generateWeeklyPlan(p).flatMap((d: any) => SL.map(s => byId.get(d[s].id)));
const out: [string, string, boolean][] = [];
const t = (id: string, got: string, ok: boolean) => out.push([id, got, ok]);

let ph = determinePhenotype(P({ gender: 'Female', pcosStatus: 'Yes' })).type;
t('TC1', ph, ph.includes('PCOS'));
ph = determinePhenotype(P({ stressLevel: 'High / Constant', sleepHours: '< 5 hours' })).type;
t('TC2', ph, ph.startsWith('Cortisol'));
const nightP = P({ workSchedule: 'Night shift' });
ph = determinePhenotype(nightP).type;
const arch3 = (generateTransformationReport(nightP) as any).archetype.id;
const night = JSON.stringify(generateDailyRoutine(nightP, 'night'));
t('TC3', `${ph} | ${arch3} | night routine has 4:00 PM: ${night.includes('4:00 PM')}`,
  ph.startsWith('Circadian') && arch3 === 'twilight_warrior' && night.includes('4:00 PM'));
ph = determinePhenotype(P({ activityLevel: '< 15 mins', cookingOil: 'Refined sunflower oil' })).type;
t('TC4', ph, ph.startsWith('Inflammatory'));
ph = determinePhenotype(P({ conditions: ['Diabetic'], bmi: 29 })).type;
t('TC5', ph, ph.startsWith('Classic'));
ph = determinePhenotype(base).type;
const arch6 = (generateTransformationReport(base) as any).archetype.id;
t('TC6', `${ph} | ${arch6}`, ph.startsWith('Metabolically') && arch6 === 'balanced_builder');
t('TC7', 'all renal_safe', meals(P({ conditions: ['Diabetic', 'Kidney Issue'] })).every(d => d?.tags.renal_safe));
t('TC8', 'no spicy', meals(P({ digestiveIssues: ['Acidity'] })).every(d => d && !d.tags.is_spicy));
t('TC9', 'all vegan', meals(P({ dietType: 'Vegan' })).every(d => d?.tags.is_vegan));
const fit = JSON.stringify(generateFitnessPlan(P({ physical_limitations: 'Knee or joint pain' })));
t('TC10', `seated leg extensions: ${fit.includes('Seated Leg Extensions')}`, fit.includes('Seated Leg Extensions'));

out.forEach(([id, got, ok]) => console.log(ok ? 'PASS' : 'FAIL', id, got));