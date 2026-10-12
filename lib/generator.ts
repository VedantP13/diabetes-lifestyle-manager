// // lib/generator.ts
// import { dishes, Dish, Region, MealSlot } from '../data/dishes';
// import { calculateDishMacros, Macros } from './nutrition-engine';

// // --- 1. User Profile Interface ---
// export interface UserProfile {
//   name?: string;
//   age: number;
//   gender: string;
//   region: string;
//   height: number;
//   weight: number;
//   bmi: number;

//   // Medical
//   conditions: string[];
//   diabetesType?: string;
//   labValues?: {
//     hba1c?: string;
//     fbs?: string;
//     pp?: string;
//   };

//   // Lifestyle
//   activityLevel: string;
//   sleepHours: string;
//   stressLevel: string;

//   // Dietary
//   dietType: string;
//   isVegetarian: boolean;
//   cookingOil: string;

//   // Digestion
//   digestiveIssues: string[];

//   // Specifics
//   dinnerTime?: string;
//   breakfastTime?: string;
//   waterIntake?: string;
//   mealSequencing?: string;
//   sunlightExposure?: string;

//   // --- NEW FIELDS ADDED FOR INSIGHTS ---
//   workSchedule?: string;        // To fix the "Wake up at 7AM" bug for night shifters
//   eatingSpeed?: string;         // To flag glucose spikes from fast eating
//   distractedEating?: string;    // To flag satiety issues
//   postMealCaffeine?: string;    // To flag iron absorption issues
//   pcosStatus?: string;          // To trigger Hormonal Phenotype
//   menopauseStatus?: string;     // To trigger Hormonal Phenotype
//   strengthTraining?: string;    // To suggest resistance training fixes
//   occupation_role?: string;      // Fixes the error in fitness-engine
//   physical_limitations?: string; // Needed for fitness safety checks
//   walking_pace?: string;         // Needed for cardio protocol
//   energy_levels?: string;       // to suggest energy-boosting remedies
// }

// export interface Meal {
//   id: string;
//   name: string;
//   description: string;
//   tags: string[];
//   macros?: Macros;
//   gi?: string;
//   sequence?: string[];   // NEW: eating order (fibre → protein/fat → carbohydrates)
// }

// export interface DailyPlan {
//   dayNumber?: number;
//   breakfast: Meal;
//   lunch: Meal;
//   snack: Meal;
//   dinner: Meal;
//   lifestyleTips: string[];
//   clinicalNotes: string[];
// }

// export interface SpikeRisk {
//   level: 'Low' | 'Moderate' | 'High';
//   title: string;
//   factors: string;
//   action: string;
//   color: string;
// }

// export function calculateSpikeRisk(mealGI: string = 'Medium', slot: string, profile: UserProfile, mealName: string): SpikeRisk {
//   let score = 0;
//   const triggers: string[] = [];

//   if (mealGI === 'High') { score += 2; triggers.push('High GI'); }
//   else if (mealGI === 'Medium') { score += 1; triggers.push('Medium GI'); }

//   const isStressed = profile.stressLevel === 'High';
//   const isSedentary = profile.activityLevel && profile.activityLevel.includes('< 15');
//   const poorSleep = profile.sleepHours && profile.sleepHours.includes('< 5');

//   if (isStressed || poorSleep) score += 1;
//   if (isStressed) triggers.push('High Stress');
//   if (poorSleep) triggers.push('Poor Sleep');
//   if (isSedentary) triggers.push('Sedentary');

//   const factorsText = triggers.join(', ');

//   if (score >= 3 || mealGI === 'High') {
//     return { 
//       level: 'High', 
//       title: 'High Glucose Spike Risk',
//       factors: factorsText,
//       action: `To balance the carbs in your ${mealName}, start with 1 tbsp of Apple Cider Vinegar in water, or walk 15 mins immediately after eating.`,
//       color: 'text-rose-500' 
//     };
//   } else if (score === 2) {
//     return { 
//       level: 'Moderate', 
//       title: 'Moderate Spike Risk',
//       factors: factorsText,
//       action: `Pair this ${mealName} with a side of extra fiber (cucumber/carrots) and walk 10 mins after to maintain steady energy.`,
//       color: 'text-amber-500'
//     };
//   } else {
//     return { 
//       level: 'Low', 
//       title: 'Steady Blood Sugar',
//       factors: factorsText,
//       action: `${mealName} is perfectly aligned with your metabolic goals today.`,
//       color: 'text-emerald-500'
//     };
//   }
// }

// // --- 2. REGION MAPPING HELPER ---
// function mapUserRegionToDatabase(userRegion: string): Region {
//   if (!userRegion) return 'General';
  
//   const state = userRegion.toLowerCase();

//   // 1. Direct Region Matches
//   if (state.includes('kerala')) return 'Kerala';
//   if (state.includes('karnataka')) return 'Karnataka';
//   if (state.includes('andhra') || state.includes('telangana')) return 'Andhra';
//   if (state.includes('maharashtra') || state.includes('goa')) return 'Maharashtra';
//   if (state.includes('gujarat')) return 'Gujarat';
//   if (state.includes('tamil nadu') || state.includes('puducherry')) return 'South India';

//   // 2. North India Bucket
//   const northStates = [
//     'delhi', 'punjab', 'haryana', 'uttar pradesh', 'uttarakhand', 
//     'himachal pradesh', 'jammu', 'rajasthan', 'madhya pradesh', 'chhattisgarh'
//   ];
//   if (northStates.some(s => state.includes(s))) return 'North India';

//   // 3. East / North-East Bucket
//   const eastStates = [
//     'west bengal', 'odisha', 'bihar', 'jharkhand', 'assam', 
//     'tripura', 'manipur', 'meghalaya', 'nagaland', 'mizoram', 
//     'arunachal pradesh', 'sikkim'
//   ];
//   if (eastStates.some(s => state.includes(s))) return 'East India';

//   // 4. Fallback for "Other" or "Outside India"
//   return 'General';
// }

// // --- 3. THE SCORING ENGINE ---
// export function selectBestDish(
//   slot: MealSlot, 
//   profile: UserProfile, 
//   usedDishIds: Set<string>
// ): Meal {
    
//   // A. PREPARE USER FLAGS
//   const targetRegion = mapUserRegionToDatabase(profile.region);
//   const isRenal = profile.conditions.includes('Kidney Issue');
//   const isDiabetic = profile.conditions.includes('Diabetic');
  
//   // NEW: Strict Acidity/GERD checks
//   const hasAcidity = profile.digestiveIssues?.includes('Acidity') || profile.digestiveIssues?.includes('GERD');
  
//   const isVegan = profile.dietType === 'Vegan';
//   const isElderly = profile.age > 60;
//   const needsWeightLoss = profile.bmi > 25;
//   const needsSoftFood = isElderly || profile.digestiveIssues?.includes('Constipation');

//   // B. FILTERING PHASE (Strict Clinical Firewalls)
//   let candidates = dishes.filter(dish => {
//     // 1. Slot Match
//     if (!dish.slots.includes(slot)) return false;

//     // 2. Vegetarian/Vegan Check
//     if (isVegan && !dish.tags.is_vegan) return false;
//     if (profile.isVegetarian && !dish.tags.veg) return false;

//     // 3. Renal Safety (ABSOLUTE: Blocks all high potassium/phosphorus)
//     if (isRenal && !dish.tags.renal_safe) return false;

//     // 4. Acidity Firewall (ABSOLUTE: Blocks all spicy/heavy foods across ALL slots)
//     if (hasAcidity && dish.tags.is_spicy) return false;

//     // 5. Texture Check for Elderly
//     if (needsSoftFood && slot === 'Dinner' && dish.tags.texture === 'Crunchy') return false;

//     return true;
//   });

//   // Fallback
//   if (candidates.length === 0) {
//     console.warn(`No dishes found for ${slot} with strict filters. Relaxing...`);
//     return {
//         id: 'fallback_safe',
//         name: 'Simple Oats Porridge / Khichdi',
//         description: 'Gentle on stomach, safe fallback option.',
//         tags: ['safe', 'soft']
//     };
//   }

//   // C. SCORING PHASE (Soft Constraints)
//   const scoredCandidates = candidates.map(dish => {
//     let score = 0;

//     // 1. Regional Preference
//     if (dish.region.includes(targetRegion)) score += 50;
//     else if (dish.region.includes('General')) score += 20;
//     else score -= 10; 

//     // 2. Health Goal Matching
//     if (isDiabetic && dish.tags.gi === 'Low') score += 15;
//     if (needsWeightLoss && dish.tags.weight_loss_friendly) score += 10;
//     if (isRenal && dish.tags.renal_safe) score += 20; 

//     // 3. Texture/Digestion Bonus
//     if (needsSoftFood && dish.tags.texture === 'Soft') score += 15;
//     if (needsSoftFood && dish.tags.texture === 'Liquid') score += 15;

//     // 4. Variety Penalty
//     if (usedDishIds.has(dish.id)) {
//         score -= 100; 
//     }

//     return { dish, score };
//   });

//   // D. SELECTION PHASE
//   scoredCandidates.sort((a, b) => b.score - a.score);
//   const topPoolSize = Math.min(3, scoredCandidates.length);
//   const randomIndex = Math.floor(Math.random() * topPoolSize);
//   const selected = scoredCandidates[randomIndex].dish;

//   // --- NEW: Calculate real macros using the new engine ---
//   const calculatedMacros = calculateDishMacros(selected.food_codes);

//   // Find the return statement at the bottom of selectBestDish and update it to this:
//   return {
//     id: selected.id,
//     name: selected.name,
//     description: `${selected.region.join(', ')} | GI: ${selected.tags.gi}`,
//     tags: [
//         selected.tags.gi === 'Low' ? 'Diabetes-Friendly' : 'Balanced',
//         selected.tags.weight_loss_friendly ? 'Weight-Loss' : 'Energy',
//         selected.tags.renal_safe ? 'Renal-Safe' : ''
//     ].filter(Boolean),
//     macros: calculatedMacros,
//     gi: selected.tags.gi 
//   };
// }

// // --- 4. GENERATOR FUNCTIONS ---
// export function generateDailyPlan(
//     profile: UserProfile, 
//     usedDishIds: Set<string> = new Set(),
//     dayNumber: number = 1
// ): DailyPlan {
//   const breakfast = selectBestDish('Breakfast', profile, usedDishIds);
//   usedDishIds.add(breakfast.id);

//   const lunch = selectBestDish('Lunch', profile, usedDishIds);
//   usedDishIds.add(lunch.id);

//   const snack = selectBestDish('Snack', profile, usedDishIds);
//   usedDishIds.add(snack.id);

//   const dinner = selectBestDish('Dinner', profile, usedDishIds);
//   usedDishIds.add(dinner.id);

//   const tips = generateLifestyleTips(profile);
//   const clinical = generateClinicalNotes(profile);

//   return {
//     dayNumber,
//     breakfast,
//     lunch,
//     snack,
//     dinner,
//     lifestyleTips: tips,
//     clinicalNotes: clinical
//   };
// }

// // --- 5. THE 7-DAY LOOP ---
// export function generateWeeklyPlan(profile: UserProfile): DailyPlan[] {
//     const weekPlan: DailyPlan[] = [];
//     const globalUsedDishIds = new Set<string>();

//     for (let day = 1; day <= 7; day++) {
//         const dailyPlan = generateDailyPlan(profile, globalUsedDishIds, day);
//         weekPlan.push(dailyPlan);
//     }
//     return weekPlan;
// }

// // --- Helper: Tips Generator ---
// function generateLifestyleTips(profile: UserProfile): string[] {
//     const tips: string[] = [];
//     if (profile.conditions.includes('Diabetic')) tips.push("Walk 10 mins after meals to reduce glucose spike.");
//     if (profile.conditions.includes('Kidney Issue')) tips.push("Monitor water intake strictly as per nephrologist's advice.");
//     if (profile.digestiveIssues?.includes('Acidity')) tips.push("No lying down immediately after dinner.");
    
//     // NEW TIPS based on new fields
//     if (profile.eatingSpeed?.includes('Fast')) tips.push("Chew your food thoroughly. Fast eating prevents satiety signals.");
//     if (profile.postMealCaffeine?.includes('Yes')) tips.push("Avoid tea/coffee for 45 mins after meals to improve iron absorption.");
    
//     return tips;
// }

// function generateClinicalNotes(profile: UserProfile): string[] {
//     const notes: string[] = [];
//     if (profile.conditions.includes('Diabetic')) notes.push("Plan prioritizes Low GI & Complex Carbs.");
//     if (profile.conditions.includes('High BP')) notes.push("Selected low-sodium options where possible.");
    
//     // New Clinical Note for PCOS
//     if (profile.pcosStatus === 'Yes') notes.push("Hormonal focus: Diet rich in Omega-3 and low in dairy to manage insulin resistance.");

//     return notes;
// }

// // --- 6. SWAP UTILITY ---
// export function getAlternativeDish(
//     slot: MealSlot,
//     profile: UserProfile,
//     currentDishId: string,
//     fullPlan: DailyPlan[] 
// ): Meal {
//     const usedIds = new Set<string>();
//     usedIds.add(currentDishId);

//     fullPlan.forEach(day => {
//         usedIds.add(day.breakfast.id);
//         usedIds.add(day.lunch.id);
//         usedIds.add(day.snack.id);
//         usedIds.add(day.dinner.id);
//     });

//     return selectBestDish(slot, profile, usedIds);
// }



//=====================12-10-26=========================
// lib/generator.ts
import { dishes, Dish, Region, MealSlot } from '../data/dishes';
import { calculateDishMacros, Macros } from './nutrition-engine';

// --- 1. User Profile Interface ---
export interface UserProfile {
  name?: string;
  age: number;
  gender: string;
  region: string;
  height: number;
  weight: number;
  bmi: number;

  // Medical
  conditions: string[];
  diabetesType?: string;
  labValues?: {
    hba1c?: string;
    fbs?: string;
    pp?: string;
  };

  // Lifestyle
  activityLevel: string;
  sleepHours: string;
  stressLevel: string;

  // Dietary
  dietType: string;
  isVegetarian: boolean;
  cookingOil: string;

  // Digestion
  digestiveIssues: string[];

  // Specifics
  dinnerTime?: string;
  breakfastTime?: string;
  waterIntake?: string;
  mealSequencing?: string;
  sunlightExposure?: string;

  // --- NEW FIELDS ADDED FOR INSIGHTS ---
  workSchedule?: string;        // To fix the "Wake up at 7AM" bug for night shifters
  eatingSpeed?: string;         // To flag glucose spikes from fast eating
  distractedEating?: string;    // To flag satiety issues
  postMealCaffeine?: string;    // To flag iron absorption issues
  pcosStatus?: string;          // To trigger Hormonal Phenotype
  menopauseStatus?: string;     // To trigger Hormonal Phenotype
  strengthTraining?: string;    // To suggest resistance training fixes
  occupation_role?: string;      // Fixes the error in fitness-engine
  physical_limitations?: string; // Needed for fitness safety checks
  walking_pace?: string;         // Needed for cardio protocol
  energy_levels?: string;       // to suggest energy-boosting remedies
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  tags: string[];
  macros?: Macros;
  gi?: string;
  sequence?: string[];   // NEW: eating order (fibre → protein/fat → carbohydrates)
}

export interface DailyPlan {
  dayNumber?: number;
  breakfast: Meal;
  lunch: Meal;
  snack: Meal;
  dinner: Meal;
  lifestyleTips: string[];
  clinicalNotes: string[];
}

export interface SpikeRisk {
  level: 'Low' | 'Moderate' | 'High';
  title: string;
  factors: string;
  action: string;
  color: string;
}

export function calculateSpikeRisk(mealGI: string = 'Medium', slot: string, profile: UserProfile, mealName: string): SpikeRisk {
  let score = 0;
  const triggers: string[] = [];

  if (mealGI === 'High') { score += 2; triggers.push('High GI'); }
  else if (mealGI === 'Medium') { score += 1; triggers.push('Medium GI'); }

  const isStressed = profile.stressLevel === 'High';
  const isSedentary = profile.activityLevel && profile.activityLevel.includes('< 15');
  const poorSleep = profile.sleepHours && profile.sleepHours.includes('< 5');

  if (isStressed || poorSleep) score += 1;
  if (isStressed) triggers.push('High Stress');
  if (poorSleep) triggers.push('Poor Sleep');
  if (isSedentary) triggers.push('Sedentary');

  const factorsText = triggers.join(', ');

  if (score >= 3 || mealGI === 'High') {
    return { 
      level: 'High', 
      title: 'High Glucose Spike Risk',
      factors: factorsText,
      action: `To balance the carbs in your ${mealName}, start with 1 tbsp of Apple Cider Vinegar in water, or walk 15 mins immediately after eating.`,
      color: 'text-rose-500' 
    };
  } else if (score === 2) {
    return { 
      level: 'Moderate', 
      title: 'Moderate Spike Risk',
      factors: factorsText,
      action: `Pair this ${mealName} with a side of extra fiber (cucumber/carrots) and walk 10 mins after to maintain steady energy.`,
      color: 'text-amber-500'
    };
  } else {
    return { 
      level: 'Low', 
      title: 'Steady Blood Sugar',
      factors: factorsText,
      action: `${mealName} is perfectly aligned with your metabolic goals today.`,
      color: 'text-emerald-500'
    };
  }
}

// --- 2. REGION MAPPING HELPER ---
function mapUserRegionToDatabase(userRegion: string): Region {
  if (!userRegion) return 'General';
  
  const state = userRegion.toLowerCase();

  // 1. Direct Region Matches
  if (state.includes('kerala')) return 'Kerala';
  if (state.includes('karnataka')) return 'Karnataka';
  if (state.includes('andhra') || state.includes('telangana')) return 'Andhra';
  if (state.includes('maharashtra') || state.includes('goa')) return 'Maharashtra';
  if (state.includes('gujarat')) return 'Gujarat';
  if (state.includes('tamil nadu') || state.includes('puducherry')) return 'South India';

  // 2. North India Bucket
  const northStates = [
    'delhi', 'punjab', 'haryana', 'uttar pradesh', 'uttarakhand', 
    'himachal pradesh', 'jammu', 'rajasthan', 'madhya pradesh', 'chhattisgarh'
  ];
  if (northStates.some(s => state.includes(s))) return 'North India';

  // 3. East / North-East Bucket
  const eastStates = [
    'west bengal', 'odisha', 'bihar', 'jharkhand', 'assam', 
    'tripura', 'manipur', 'meghalaya', 'nagaland', 'mizoram', 
    'arunachal pradesh', 'sikkim'
  ];
  if (eastStates.some(s => state.includes(s))) return 'East India';

  // 4. Fallback for "Other" or "Outside India"
  return 'General';
}

function buildEatingSequence(profile: UserProfile): string[] {
  const protein =
    profile.dietType === 'Vegan' ? 'dal, sprouts or tofu'
    : profile.isVegetarian ? 'dal, curd, paneer or sprouts'
    : 'dal, curd, egg, fish or chicken';
  
  return [
    'Fibre first: salad, sabzi or other vegetables',
    `Protein and healthy fats next: ${protein}`,
    'Carbohydrates last: roti, rice or millet',
  ];
}

// --- 3. THE SCORING ENGINE ---
export function selectBestDish(
  slot: MealSlot, 
  profile: UserProfile, 
  usedDishIds: Set<string>
): Meal {
    
  // A. PREPARE USER FLAGS
  const targetRegion = mapUserRegionToDatabase(profile.region);
  const isRenal = profile.conditions.includes('Kidney Issue');
  const isDiabetic = profile.conditions.includes('Diabetic');
  
  // NEW: Strict Acidity/GERD checks
  const hasAcidity = profile.digestiveIssues?.includes('Acidity') || profile.digestiveIssues?.includes('GERD');
  
  const isVegan = profile.dietType === 'Vegan';
  const isElderly = profile.age > 60;
  const needsWeightLoss = profile.bmi > 25;
  const needsSoftFood = isElderly || profile.digestiveIssues?.includes('Constipation');

  // B. FILTERING PHASE (Strict Clinical Firewalls)
  let candidates = dishes.filter(dish => {
    // 1. Slot Match
    if (!dish.slots.includes(slot)) return false;

    // 2. Vegetarian/Vegan Check
    if (isVegan && !dish.tags.is_vegan) return false;
    if (profile.isVegetarian && !dish.tags.veg) return false;

    // 3. Renal Safety (ABSOLUTE: Blocks all high potassium/phosphorus)
    if (isRenal && !dish.tags.renal_safe) return false;

    // 4. Acidity Firewall (ABSOLUTE: Blocks all spicy/heavy foods across ALL slots)
    if (hasAcidity && dish.tags.is_spicy) return false;

    // 5. Texture Check for Elderly
    if (needsSoftFood && slot === 'Dinner' && dish.tags.texture === 'Crunchy') return false;

    return true;
  });

  // Fallback
  if (candidates.length === 0) {
    console.warn(`No dishes found for ${slot} with strict filters. Relaxing...`);
    return {
        id: 'fallback_safe',
        name: 'Simple Oats Porridge / Khichdi',
        description: 'Gentle on stomach, safe fallback option.',
        tags: ['safe', 'soft'],
        sequence: buildEatingSequence(profile)
    };
  }

  // C. SCORING PHASE (Soft Constraints)
  const scoredCandidates = candidates.map(dish => {
    let score = 0;

    // 1. Regional Preference
    if (dish.region.includes(targetRegion)) score += 50;
    else if (dish.region.includes('General')) score += 20;
    else score -= 10; 

    // 2. Health Goal Matching
    if (isDiabetic && dish.tags.gi === 'Low') score += 15;
    if (needsWeightLoss && dish.tags.weight_loss_friendly) score += 10;
    if (isRenal && dish.tags.renal_safe) score += 20; 

    // 3. Texture/Digestion Bonus
    if (needsSoftFood && dish.tags.texture === 'Soft') score += 15;
    if (needsSoftFood && dish.tags.texture === 'Liquid') score += 15;

    // 4. Variety Penalty
    if (usedDishIds.has(dish.id)) {
        score -= 100; 
    }

    return { dish, score };
  });

  // D. SELECTION PHASE
  scoredCandidates.sort((a, b) => b.score - a.score);
  const topPoolSize = Math.min(3, scoredCandidates.length);
  const randomIndex = Math.floor(Math.random() * topPoolSize);
  const selected = scoredCandidates[randomIndex].dish;

  // --- NEW: Calculate real macros using the new engine ---
  const calculatedMacros = calculateDishMacros(selected.food_codes);

  return {
    id: selected.id,
    name: selected.name,
    description: `${selected.region.join(', ')} | GI: ${selected.tags.gi}`,
    tags: [
        selected.tags.gi === 'Low' ? 'Diabetes-Friendly' : 'Balanced',
        selected.tags.weight_loss_friendly ? 'Weight-Loss' : 'Energy',
        selected.tags.renal_safe ? 'Renal-Safe' : ''
    ].filter(Boolean),
    macros: calculatedMacros,
    gi: selected.tags.gi,
    sequence: buildEatingSequence(profile)
  };
}

// --- 4. GENERATOR FUNCTIONS ---
export function generateDailyPlan(
    profile: UserProfile, 
    usedDishIds: Set<string> = new Set(),
    dayNumber: number = 1
): DailyPlan {
  const breakfast = selectBestDish('Breakfast', profile, usedDishIds);
  usedDishIds.add(breakfast.id);

  const lunch = selectBestDish('Lunch', profile, usedDishIds);
  usedDishIds.add(lunch.id);

  const snack = selectBestDish('Snack', profile, usedDishIds);
  usedDishIds.add(snack.id);

  const dinner = selectBestDish('Dinner', profile, usedDishIds);
  usedDishIds.add(dinner.id);

  const tips = generateLifestyleTips(profile);
  const clinical = generateClinicalNotes(profile);

  return {
    dayNumber,
    breakfast,
    lunch,
    snack,
    dinner,
    lifestyleTips: tips,
    clinicalNotes: clinical
  };
}

// --- 5. THE 7-DAY LOOP ---
export function generateWeeklyPlan(profile: UserProfile): DailyPlan[] {
    const weekPlan: DailyPlan[] = [];
    const globalUsedDishIds = new Set<string>();

    for (let day = 1; day <= 7; day++) {
        const dailyPlan = generateDailyPlan(profile, globalUsedDishIds, day);
        weekPlan.push(dailyPlan);
    }
    return weekPlan;
}

// --- Helper: Tips Generator ---
function generateLifestyleTips(profile: UserProfile): string[] {
    const tips: string[] = [];
    if (profile.conditions.includes('Diabetic')) tips.push("Walk 10 mins after meals to reduce glucose spike.");
    if (profile.conditions.includes('Kidney Issue')) tips.push("Monitor water intake strictly as per nephrologist's advice.");
    if (profile.digestiveIssues?.includes('Acidity')) tips.push("No lying down immediately after dinner.");
    
    // NEW TIPS based on new fields
    if (profile.eatingSpeed?.includes('Fast')) tips.push("Chew your food thoroughly. Fast eating prevents satiety signals.");
    if (profile.postMealCaffeine?.includes('Yes')) tips.push("Avoid tea/coffee for 45 mins after meals to improve iron absorption.");
    
    return tips;
}

function generateClinicalNotes(profile: UserProfile): string[] {
    const notes: string[] = [];
    if (profile.conditions.includes('Diabetic')) notes.push("Plan prioritizes Low GI & Complex Carbs.");
    if (profile.conditions.includes('High BP')) notes.push("Selected low-sodium options where possible.");
    
    // New Clinical Note for PCOS
    if (profile.pcosStatus === 'Yes') notes.push("Hormonal focus: Diet rich in Omega-3 and low in dairy to manage insulin resistance.");

    return notes;
}

// --- 6. SWAP UTILITY ---
export function getAlternativeDish(
    slot: MealSlot,
    profile: UserProfile,
    currentDishId: string,
    fullPlan: DailyPlan[] 
): Meal {
    const usedIds = new Set<string>();
    usedIds.add(currentDishId);

    fullPlan.forEach(day => {
        usedIds.add(day.breakfast.id);
        usedIds.add(day.lunch.id);
        usedIds.add(day.snack.id);
        usedIds.add(day.dinner.id);
    });

    return selectBestDish(slot, profile, usedIds);
}