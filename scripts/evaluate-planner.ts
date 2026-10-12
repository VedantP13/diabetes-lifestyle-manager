import { generateWeeklyPlan, UserProfile } from '../lib/generator';
import dishes from '../data/dishes_mapped.json'; // adjust path

const byId = new Map<string, any>((dishes as any[]).map(d => [d.id, d]));
let seed = 42;
const rnd = () => (seed = (seed * 1664525 + 1013904223) % 2 ** 32) / 2 ** 32;
const pick = <T,>(a: T[]) => a[Math.floor(rnd() * a.length)];
const regions = ['Maharashtra','Tamil Nadu','Kerala','Karnataka','Telangana','Gujarat','Punjab','West Bengal','Assam'];
const SLOTS = ['breakfast','lunch','snack','dinner'] as const;
const N = 500;

const c = { meals: 0, slot: 0, diet: 0, renal: 0, renalN: 0, spice: 0, spiceN: 0, repeat: 0, fallback: 0 };
let ms = 0;

for (let i = 0; i < N; i++) {
  const diet = pick(['Non-Vegetarian','Vegetarian','Vegan']);
  const kidney = rnd() < 0.3, acidity = rnd() < 0.3;
  const bmi = 18 + rnd() * 20;
  const p: UserProfile = {
    age: 25 + Math.floor(rnd() * 55), gender: pick(['Male','Female']), region: pick(regions),
    height: 165, weight: 60, bmi,
    conditions: ['Diabetic', ...(kidney ? ['Kidney Issue'] : [])],
    activityLevel: '< 15 mins', sleepHours: '6–7 hours', stressLevel: 'Moderate',
    dietType: diet, isVegetarian: diet !== 'Non-Vegetarian', cookingOil: 'Refined',
    digestiveIssues: acidity ? ['Acidity'] : [],
  } as UserProfile;

  const t0 = performance.now();
  const plan = generateWeeklyPlan(p);
  ms += performance.now() - t0;

  const used = new Set<string>();
  plan.forEach(day => SLOTS.forEach(s => {
    const meal: any = (day as any)[s];
    const d = byId.get(meal.id);
    c.meals++;
    if (!d) { c.fallback++; return; }
    if (!d.slots.map((x: string) => x.toLowerCase()).includes(s)) c.slot++;
    if (diet === 'Vegan' && !d.tags.is_vegan) c.diet++;
    else if (p.isVegetarian && !d.tags.veg) c.diet++;
    if (kidney) { c.renalN++; if (!d.tags.renal_safe) c.renal++; }
    if (acidity) { c.spiceN++; if (d.tags.is_spicy) c.spice++; }
    if (used.has(d.id)) c.repeat++; used.add(d.id);
  }));
}
console.log({ profiles: N, ...c, meanMsPerWeeklyPlan: (ms / N).toFixed(2) });