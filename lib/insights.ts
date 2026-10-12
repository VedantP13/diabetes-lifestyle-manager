// lib/insights.ts

import { UserProfile } from './generator';

// --- Types ---
export interface PhenotypeResult {
  type: string;
  description: string;
  strategy: string;
  color: string; // 'red' | 'orange' | 'blue' | 'green'
}

export interface RoutineItem {
  time: string;
  icon: string; // Changed to string ID instead of emoji
  activity: string;
  note: string;
}

export interface AuditItem {
  category: string;
  status: 'Good' | 'Warning' | 'Critical';
  message: string;
  fix?: string;
}

// --- 1. PHENOTYPE ENGINE (The "Why") ---
export function determinePhenotype(profile: UserProfile): PhenotypeResult {
  
  // A. Check for "Hormonal Imbalance" (PCOS specific)
  // Logic: Female + diagnosed PCOS
  if (profile.gender === 'Female' && (profile.pcosStatus === 'Yes' || profile.pcosStatus === 'Not sure')) {
     return {
       type: "Hormonal-Metabolic Imbalance (PCOS)",
       description: "Your insulin resistance is likely driven by hormonal fluctuations (Androgens/Cortisol) rather than just diet.",
       strategy: "Prioritize Strength Training, Seed Cycling, and Inositol rich foods.",
       color: "red"
     };
  }

  // B. Check for "Cortisol Dominant" (Stress + Sleep issues)
  if (
    (profile.stressLevel === 'High / Constant' || profile.stressLevel === 'Very stressful') &&
    (profile.sleepHours === '< 5 hours' || profile.sleepHours === '5–6 hours')
  ) {
    return {
      type: "Cortisol-Dominant Metabolism",
      description: "Your high stress and poor sleep are spiking cortisol. This causes your liver to dump sugar into your blood even when you haven't eaten.",
      strategy: "Focus on Sleep Hygiene & Stress Management before Diet.",
      color: "orange"
    };
  }

  // C. Check for "Circadian Mismatch" (Late Dinner + Low Sun + Shift Work)
  const isLateDinner = profile.dinnerTime?.toLowerCase().includes('10') || 
                       profile.dinnerTime?.toLowerCase().includes('11');
  const isLowSun = profile.sunlightExposure === 'Low';
  const isShiftWork = profile.workSchedule?.includes('Night') || profile.workSchedule?.includes('Rotational');

  if (isShiftWork || isLateDinner || (isLowSun && profile.sleepHours.includes('<'))) {
    return {
      type: "Circadian-Mismatched Metabolism",
      description: "Your body clock is out of sync. Irregular timings make your insulin weaker.",
      strategy: "Create a strict 'Artificial Day/Night' cycle using light exposure and meal timing.",
      color: "blue"
    };
  }

  // D. Check for "Inflammatory" (Refined Oil + Sedentary + Pain/BP)
  const isSedentary = profile.activityLevel.includes('< 15');
  const hasRefinedOil = profile.cookingOil?.includes('Refined');
  
  if (isSedentary && hasRefinedOil) {
    return {
      type: "Inflammatory Metabolism",
      description: "Sedentary lifestyle combined with inflammatory oils is blocking your cells from accepting insulin.",
      strategy: "Switch to Cold-Pressed Oils & start 'Non-Exercise Activity' (NEAT).",
      color: "red"
    };
  }

  // E. Default: "Insulin Resistant" (Standard Type 2 Profile)
  if (profile.conditions.includes('Diabetic') || profile.bmi > 25) {
    return {
      type: "Classic Insulin Resistance",
      description: "Your cells are struggling to process carbohydrates efficiently.",
      strategy: "Focus on Meal Sequencing (Fiber First) and Carbohydrate reduction.",
      color: "red"
    };
  }

  // F. The Healthy User
  return {
    type: "Metabolically Balanced",
    description: "Your markers look stable. Focus on maintenance and longevity.",
    strategy: "Maintain muscle mass and nutrient density.",
    color: "green"
  };
}

// --- 2. KITCHEN & HABIT AUDIT (The "How") ---
export function generateHabitAudit(profile: UserProfile): AuditItem[] {
  const audit: AuditItem[] = [];

  // 1. Oil Check
  if (profile.cookingOil?.includes('Refined')) {
    audit.push({
      category: 'Cooking Fat',
      status: 'Critical',
      message: 'Refined oils are highly inflammatory.',
      fix: 'Switch to Cold-Pressed Groundnut, Sesame, or Mustard Oil.'
    });
  } else {
    audit.push({
      category: 'Cooking Fat',
      status: 'Good',
      message: 'Great choice using filtered/traditional oils.'
    });
  }

  // 2. Hydration Check
  if (profile.waterIntake?.includes('Low')) {
    audit.push({
      category: 'Hydration',
      status: 'Warning',
      message: 'Low water intake concentrates blood sugar.',
      fix: 'Target 2.5 - 3 Liters daily.'
    });
  } else {
    audit.push({
      category: 'Hydration',
      status: 'Good',
      message: 'You are well hydrated.'
    });
  }

  // 3. Meal Sequencing
  if (profile.mealSequencing?.includes('mix') || profile.mealSequencing?.includes('starchy')) {
    audit.push({
      category: 'Eating Pattern',
      status: 'Warning',
      message: 'Eating carbs first spikes insulin rapidly.',
      fix: 'Eat Salad/Veggies FIRST, Protein SECOND, Carbs LAST.'
    });
  }

  // 4. Eating Speed Audit (NEW)
  if (profile.eatingSpeed === 'Very Fast (Under 10 mins)') {
    audit.push({
        category: 'Glucose Spike Risk',
        status: 'Critical',
        message: 'Eating too fast spikes sugar before insulin can catch up.',
        fix: 'Chew every mouthful 20 times. Put your spoon down between bites.'
    });
  }

  // 5. Screen Time Audit (NEW)
  if (profile.distractedEating === 'Yes, almost every meal') {
    audit.push({
        category: 'Mindful Eating',
        status: 'Warning',
        message: 'Screen-time eating blocks satiety signals to the brain.',
        fix: 'No-phone rule for 15 mins during main meals.'
    });
  }

  // 6. Caffeine Audit (NEW)
  if (profile.postMealCaffeine === 'Yes, it\'s a habit') {
    audit.push({
        category: 'Nutrient Absorption',
        status: 'Warning',
        message: 'Tea/Coffee with meals blocks Iron & Calcium absorption.',
        fix: 'Maintain a 45-minute gap between meals and caffeine.'
    });
  }

  return audit;
}

export type ShiftMode = 'auto' | 'standard' | 'late' | 'night';

// --- 3. DYNAMIC ROUTINE GENERATOR (The "When") ---
export function generateDailyRoutine(profile: UserProfile, shiftMode: ShiftMode = 'auto'): RoutineItem[] {
  const routine: RoutineItem[] = [];

  // Determine current shift based on auto-profile or manual override
  let isNightShift = profile.workSchedule?.includes('Night') || profile.workSchedule?.includes('Graveyard') || profile.workSchedule?.includes('Rotational');
  let isLateStart = false;

  if (shiftMode === 'night') {
    isNightShift = true;
    isLateStart = false;
  } else if (shiftMode === 'late') {
    isNightShift = false;
    isLateStart = true;
  } else if (shiftMode === 'standard') {
    isNightShift = false;
    isLateStart = false;
  }

  // --- TIMING LOGIC ---
  let wakeTime = '7:00 AM';
  let sunTime = '7:15 AM';
  let breakfastTime = '8:30 AM';
  let lunchTime = '1:00 PM';
  let sugarWalkTime = '1:30 PM';
  let snackTime = '4:30 PM';
  let dinnerTime = profile.dinnerTime || '8:00 PM';
  let windDownTime = '10:00 PM';

  if (isNightShift) {
    wakeTime = '4:00 PM';
    sunTime = '4:15 PM';
    breakfastTime = '5:30 PM';
    lunchTime = '10:00 PM';
    sugarWalkTime = '10:30 PM';
    snackTime = '2:00 AM';
    dinnerTime = '5:00 AM';
    windDownTime = '7:00 AM';
  } else if (isLateStart) {
    wakeTime = '10:00 AM';
    sunTime = '10:15 AM';
    breakfastTime = '11:30 AM';
    lunchTime = '3:00 PM';
    sugarWalkTime = '3:30 PM';
    snackTime = '6:30 PM';
    dinnerTime = '9:30 PM';
    windDownTime = '11:30 PM';
  }

  // 1. Wake Up
  routine.push({ 
    time: wakeTime, 
    icon: 'WakeUp', 
    activity: 'Wake Up & Hydrate', 
    note: isNightShift 
        ? 'Drink water. Turn on bright lights immediately to wake up your body clock.' 
        : 'Drink 2 glasses of plain or warm water.' 
  });
  
  // 2. Sun/Light Exposure
  if (profile.sunlightExposure === 'Low' || isNightShift || isLateStart) {
    routine.push({ 
        time: sunTime, 
        icon: 'Sun', 
        activity: isNightShift ? 'Light Exposure' : 'Morning Sunlight', 
        note: isNightShift 
            ? 'Stay in brightly lit areas to signal to your brain that your day has started.' 
            : 'Get 10 minutes of direct sunlight to reset your sleep cycle.' 
    });
  }

  // 3. Breakfast
  routine.push({ 
    time: breakfastTime, 
    icon: 'Breakfast', 
    activity: 'First Meal', 
    note: 'Eat a meal high in protein and fiber to keep blood sugar stable.' 
  });

  // 4. Lunch
  routine.push({ 
    time: lunchTime, 
    icon: 'Lunch', 
    activity: 'Main Meal', 
    note: 'Keep half your plate for vegetables, a quarter for protein, and a quarter for carbs.' 
  });
  
  // 5. Sugar Walk
  if (profile.activityLevel.includes('< 15') || profile.conditions.includes('Diabetic')) {
    routine.push({ 
        time: sugarWalkTime, 
        icon: 'Walk', 
        activity: 'Post-Meal Walk', 
        note: 'Walk for 10 minutes right after eating to lower your blood sugar spike.' 
    });
  }

  // 6. Snack
  routine.push({ 
    time: snackTime, 
    icon: 'Snack', 
    activity: 'Evening Snack', 
    note: 'Have a light snack like nuts or buttermilk so you don’t overeat at dinner.' 
  });

  // 7. Dinner
  routine.push({ 
    time: dinnerTime, 
    icon: 'Dinner', 
    activity: 'Last Meal', 
    note: 'Keep this meal light. Avoid heavy grains.' 
  });

  // 8. Acidity Check
  if (profile.digestiveIssues?.includes('Acidity')) {
    routine.push({ 
        time: 'After Dinner', 
        icon: 'Upright', 
        activity: 'Digestion Time', 
        note: 'Sit upright or walk for 2 hours before lying down to prevent acidity.' 
    });
  }

  // 9. Wind Down
  if (profile.stressLevel.includes('High') || isNightShift) {
     routine.push({ 
        time: windDownTime, 
        icon: 'Moon', 
        activity: 'Prepare for Sleep', 
        note: isNightShift 
            ? 'Use blackout curtains to block all daylight. Total darkness improves sleep quality.' 
            : 'Put away screens and take 5 deep breaths to relax your body.' 
     });
  }

  return routine;
}