// lib/generator.ts

import { dishes, Dish, Region, MealSlot } from '../data/dishes';

// --- 1. Comprehensive User Profile Interface ---
export interface UserProfile {
  // Basic
  name?: string;
  age: number;
  gender: string;
  region: string;
  height: number; // cm
  weight: number; // kg
  bmi: number;
  
  // Medical
  conditions: string[]; // e.g., ['Diabetic', 'High BP', 'Kidney Issue', 'High Cholesterol', 'Sleep Apnea Risk']
  diabetesType?: string; // 'Type 2', 'Type 1', etc.
  labValues?: {
    hba1c?: string;
    fbs?: string; // Fasting
    pp?: string;  // Post-prandial
  };

  // Lifestyle
  activityLevel: string; // e.g. '< 15 mins', '30-45 mins'
  sleepHours: string;
  stressLevel: string;
  
  // Dietary
  dietType: string; // 'Vegetarian', 'Non-Vegetarian', etc.
  isVegetarian: boolean;
  cookingOil: string;
  
  // Digestion
  digestiveIssues: string[]; // e.g. ['Bloating', 'Constipation', 'Acidity']

  // NEW: Advanced Fields from Questionnaire
  dinnerTime?: string;
  breakfastTime?: string;
  waterIntake?: string; // e.g., 'Low (< 6 glasses...)'
  mealSequencing?: string; // e.g., 'I eat salad first'
  sunlightExposure?: string; // e.g., 'Rarely'
}

export interface Meal {
  name: string;
  calories?: number;
  description?: string;
  tags?: string[]; // e.g. ['high-fiber', 'low-sodium', 'renal-safe', 'soft-texture']
}

export interface DailyPlan {
  breakfast: Meal;
  lunch: Meal;
  snack: Meal;
  dinner: Meal;
  lifestyleTips: string[];
  clinicalNotes: string[];
}

// --- 2. THE LOGIC ENGINE ---
// --- 2. THE LOGIC ENGINE ---
export function generateDailyPlan(profile: UserProfile): DailyPlan {
  // 1. Determine Broad Region for Database Filtering
  // We map the user's specific state answer to our broader Database Regions
  let broadRegion: Region = 'General';
  
  if (profile.region === 'Tamil Nadu') broadRegion = 'South India';
  else if (profile.region === 'Kerala') broadRegion = 'Kerala';
  else if (profile.region === 'Karnataka') broadRegion = 'Karnataka';
  else if (profile.region === 'Andhra Pradesh / Telangana') broadRegion = 'Andhra';
  else if (profile.region === 'Maharashtra') broadRegion = 'Maharashtra';
  else if (profile.region === 'Gujarat') broadRegion = 'Gujarat';
  else if (profile.region === 'West Bengal / East India') broadRegion = 'East India';
  else if (profile.region === 'North India (Delhi / Punjab / UP)') broadRegion = 'North India';
  else if (profile.region === 'Other (General Indian Diet)') broadRegion = 'General';
  else if (['Karnataka', 'Andhra Pradesh / Telangana', 'Andhra Pradesh', 'Telangana'].includes(profile.region)) broadRegion = 'South India'; // Placeholder
  else if (['Delhi / NCR', 'Punjab', 'UP', 'North India (Delhi / Punjab / UP)'].includes(profile.region)) broadRegion = 'North India';
  else if (['Maharashtra', 'Gujarat', 'West Bengal / East India'].includes(profile.region)) broadRegion = 'General'; // Placeholder
  else broadRegion = 'General';

  // 2. Risk Flags
  const isDiabetic = profile.conditions.includes('Diabetic');
  const hasKidneyIssue = profile.conditions.includes('Kidney Issue');
  const hasBP = profile.conditions.includes('High BP');
  const hasCholesterol = profile.conditions.includes('High Cholesterol');
  const isSenior = profile.age > 60;
  const isConstipated = profile.digestiveIssues?.includes('Constipation');

  // --- 3. DATABASE FILTERING HELPER ---
  const getMealsForSlot = (slot: MealSlot): Meal[] => {
    return dishes.filter((dish) => {

      // A. Region Match (Match specific region OR General items)
      // If broadRegion is South India, we want South India dishes + General dishes.
      // If broadRegion is Kerala, we want Kerala dishes + General dishes.
      const regionMatch = dish.region.includes(broadRegion) || dish.region.includes('General');
      
      // B. Slot Match
      const slotMatch = dish.slots.includes(slot);

      // C. Diet Preference (Veg/Non-Veg)
      // If user is Veg, dish MUST be Veg. If user is Non-Veg, they can eat Veg too.
      const vegMatch = profile.isVegetarian ? dish.tags.veg === true : true;

      return regionMatch && slotMatch && vegMatch;
    }).map(dish => ({
        // Map database Dish to generator Meal interface
        name: dish.name,
        description: `GI: ${dish.tags.gi} | Texture: ${dish.tags.texture}`,
        tags: [
            dish.tags.gi === 'Low' ? 'diabetic' : 'balanced',
            dish.tags.texture === 'Soft' || dish.tags.texture === 'Liquid' ? 'soft-texture' : 'regular',
            dish.tags.weight_loss_friendly ? 'weight-loss' : 'energy-dense'
        ]
    }));
  };

  // --- 4. SELECTION LOGIC (Refined) ---
  const selectMeal = (options: Meal[]) => {
    // Safety check if database returns empty
    if (options.length === 0) return { name: "Balanced Home Cooked Meal", description: "Vegetables + Protein + Fiber" };

    // Priority 1: Renal Issues
    if (hasKidneyIssue) {
      // In a real app, you'd filter for low-potassium tags here
      return { 
        name: "Leached Vegetable Curry + Small portion Rice/Roti", 
        description: "Renal Diet: Vegetables leached to remove potassium. Low protein.",
        tags: ["renal-safe"]
      };
    }

    // Priority 2: Digestion/Age (Soft foods)
    if (isSenior || isConstipated || profile.digestiveIssues.includes('Acidity')) {
        const softMeal = options.find(m => m.tags?.includes('soft-texture'));
        if (softMeal) return softMeal;
    }

    // Priority 3: Diabetes Management
    if (isDiabetic) {
        // Find Low GI meals first
        const diabeticMeal = options.find(m => m.tags?.includes('diabetic')); // We mapped Low GI to 'diabetic' tag above
        if (diabeticMeal) return diabeticMeal;
    }

    // Default: Pick a random one from the valid list to add variety
    return options[Math.floor(Math.random() * options.length)];
  };

  // --- 5. GENERATE PLAN ---
  // Get valid options from database
  const breakfastOptions = getMealsForSlot('Breakfast');
  const lunchOptions = getMealsForSlot('Lunch');
  const dinnerOptions = getMealsForSlot('Dinner');
  const snackOptions = getMealsForSlot('Snack');

  // Select the best fit
  const selectedBreakfast = selectMeal(breakfastOptions);
  const selectedLunch = selectMeal(lunchOptions);
  const selectedDinner = selectMeal(dinnerOptions);
  
  // Custom Logic for Snacks (Override if Diabetic specific logic is needed beyond database)
  let selectedSnack = selectMeal(snackOptions);
  if (isDiabetic && !selectedSnack.name.includes('Nuts') && !selectedSnack.name.includes('Sundal')) {
      // Fallback if DB doesn't have enough diabetic snacks
      selectedSnack = { name: "Roasted Makhana or Handful of Walnuts", description: "Low GI, Healthy Fats" };
  }

  // --- 6. INSIGHT GENERATION ---
  const tips: string[] = [];
  const clinical: string[] = [];

  // Medical Tips
  if (isDiabetic) {
    clinical.push("Focus: Glycemic Control. Selected foods prioritize Low Glycemic Index.");
    tips.push("Walk for 15 minutes after every meal to naturally lower blood sugar.");
    tips.push("Eat your salad/vegetables FIRST, then protein, then carbs. This reduces sugar spikes by 30%.");
  }
  
  if (hasBP) {
    clinical.push("Focus: Low Sodium (DASH approach).");
    tips.push("Avoid pickles, papads, and processed snacks entirely due to hidden salt.");
  }

  if (hasCholesterol) {
    clinical.push("Focus: Lipid Management.");
    tips.push("Switch to cold-pressed oils. Avoid palm oil and vanaspati completely.");
  }

  if (profile.conditions.includes('Sleep Apnea Risk')) {
      clinical.push("⚠️ Sleep Apnea Risk: Your history suggests Obstructive Sleep Apnea (OSA). This causes cortisol spikes at night, keeping fasting sugar high. Please consult a pulmonologist.");
  }

  // Lifestyle Tips
  if (profile.dinnerTime) {
      const timeStr = profile.dinnerTime.toLowerCase();
      if (timeStr.includes('pm') && (timeStr.includes('10:') || timeStr.includes('11:') || (timeStr.includes('9:') && parseInt(timeStr.split(':')[1]) > 30))) {
         tips.push("⚠️ Late Dinner Risk: Eating late spikes fasting sugar. Try to finish dinner by 8:00 PM.");
      }
  }

  if (profile.waterIntake && profile.waterIntake.includes('Low')) {
      tips.push("⚠️ Hydration Alert: Low water intake strains kidneys and concentrates sugar. Aim for 2.5L daily.");
  }

  if (profile.mealSequencing && (profile.mealSequencing.includes('starchy') || profile.mealSequencing.includes('mix'))) {
      tips.push("📉 Glucose Hack: Eat Salad/Veggies FIRST, then Protein, then Rice/Roti.");
  }
  
  // FIX: Simplified Sunlight Check
  if (profile.sunlightExposure === 'Low') {
      clinical.push("Vitamin D Deficiency Risk: Lack of sun exposure affects insulin sensitivity. Consider a D3 supplement.");
  }

  if (profile.stressLevel === 'High / Constant' || profile.stressLevel === 'Very stressful') {
    tips.push("Stress raises cortisol. Try 'Box Breathing' (4-4-4-4) for 2 mins before meals.");
  }

  if (profile.digestiveIssues?.includes('Acidity')) {
      tips.push("🔥 Acidity Control: Avoid spicy foods at dinner. Ensure a 3-hour gap between dinner and sleep.");
  }

  if (profile.cookingOil?.includes('Refined')) {
    tips.push("⚠️ Switch Risk: Refined oils are inflammatory. Switch to filtered/cold-pressed Groundnut or Sesame oil.");
  }

  return {
    breakfast: selectedBreakfast,
    lunch: selectedLunch,
    snack: selectedSnack,
    dinner: selectedDinner,
    lifestyleTips: tips,
    clinicalNotes: clinical
  };
}