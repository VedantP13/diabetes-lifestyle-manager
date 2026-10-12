// lib/insights-engine.ts

import { UserProfile as BaseUserProfile } from './generator'; // Renamed import
import { 
  TransformationReport, 
  LifestyleArchetype, 
  DominoInsight, 
  KitchenInsight, 
  PhysiologicalInsight, 
  FitnessInsight,
  ArchetypeID 
} from './types/report-types';

// --- TYPE FIX ---
// We extend the base profile locally to include the new fitness fields
// This resolves the "Property does not exist" errors immediately.
interface UserProfile extends BaseUserProfile {
  physical_limitations?: string;
  walking_pace?: string;
  strengthTraining?: string; // Ensuring this is typed if missing in base
}

// --- 1. ARCHETYPE LOGIC ---
function determineArchetype(profile: UserProfile): LifestyleArchetype {
  
  // A. THE TWILIGHT WARRIOR
  const isShiftWorker = profile.workSchedule?.includes('Night') || profile.workSchedule?.includes('Rotational');
  const isLateSleeper = profile.sleepHours === '< 5 hours' || profile.sleepHours === '5–6 hours';
  
  if (isShiftWorker || (isLateSleeper && profile.stressLevel.includes('High'))) {
    return {
      id: 'twilight_warrior',
      title: 'The Twilight Warrior',
      colorTheme: 'slate',
      focusTags: ['Circadian Rhythm', 'Cortisol Management', 'Sleep Hygiene'],
      narrative: `You are operating against your biological clock. Your physiology is currently in "fight or flight" mode due to irregular sleep-wake cycles. This isn't just about being tired; it means your insulin sensitivity drops significantly after sunset, making late-night meals metabolically expensive.`,
      coreStrategy: `We need to anchor your body clock using light and protein, rather than just sleep duration.`
    };
  }

  // B. THE EMOTIONAL GRAZER
  const isEmotionalEater = profile.stressLevel.includes('High') || profile.stressLevel.includes('Constant');
  
  if (isEmotionalEater && (profile.dietType !== 'Vegan' && profile.bmi > 25)) { 
    return {
      id: 'emotional_grazer',
      title: 'The Sympathetic Responded',
      colorTheme: 'rose',
      focusTags: ['Nervous System Regulation', 'Sensory Grounding', 'Dopamine Control'],
      narrative: `Your metabolism is currently driven by your nervous system. When stress (cortisol) is high, your body physically blocks fat burning to "survive" the perceived threat. Your cravings are likely a request for dopamine, not calories.`,
      coreStrategy: `Your path is not about willpower; it is about "Safety Signals." We must lower your baseline stress before aggressive dieting will work.`
    };
  }

  // C. THE OUTSOURCED EATER
  // Safe navigation for potentially undefined fields
  const cookingOil = profile.cookingOil || '';
  const waterIntake = profile.waterIntake || '';
  
  const isOutsourced = cookingOil === 'Not sure' || waterIntake === 'I don\'t track it'; 
  
  if (isOutsourced) {
    return {
      id: 'outsourced_eater',
      title: 'The Delegated Diner',
      colorTheme: 'amber',
      focusTags: ['Environment Design', 'Menu Engineering', 'Portion Control'],
      narrative: `You are the CEO of your health, but you aren't the one on the factory floor. The gap between your intent and your plate is caused by lack of direct control over preparation methods.`,
      coreStrategy: `We won't teach you to cook; we will teach you to manage your kitchen staff and navigate restaurant menus effectively.`
    };
  }

  // D. DEFAULT: METABOLIC BUILDER
  return {
    id: 'balanced_builder',
    title: 'The Metabolic Builder',
    colorTheme: 'emerald',
    focusTags: ['Consistency', 'Fiber Optimization', 'Muscle Synthesis'],
    narrative: `Your foundational habits are in place, but your metabolic efficiency can be improved. You are ready for "Optimization" rather than "Repair."`,
    coreStrategy: `Focus on precise macronutrient sequencing and increasing metabolic flexibility through movement.`
  };
}

// --- 2. INSIGHT GENERATORS ---

function generateDominoInsights(profile: UserProfile): DominoInsight[] {
  const insights: DominoInsight[] = [];

  // Insight 1: Sleep -> Sugar Connection
  if (profile.sleepHours.includes('<') || profile.sleepHours.includes('5–6')) {
    insights.push({
      id: 'sleep_sugar_link',
      type: 'domino_effect',
      title: 'The Sleep-Sugar Axis',
      relevanceScore: 90,
      trigger: 'Short sleep duration (< 6 hours)',
      mechanism: 'Elevated Ghrelin (Hunger Hormone) and suppressed Leptin (Fullness Hormone).',
      consequence: 'Your brain creates a false demand for quick energy (sugar) around 4:00 PM.',
      microFix: 'Do not fight the craving. Instead, front-load 30g of protein at breakfast to stabilize the ghrelin response for the day.'
    });
  }

  // Insight 2: Stress -> Digestion
  if (profile.stressLevel.includes('High') && profile.digestiveIssues.includes('Bloating')) {
    insights.push({
      id: 'stress_gut_link',
      type: 'domino_effect',
      title: 'The Cortisol-Gut Block',
      relevanceScore: 85,
      trigger: 'High mental load during meals',
      mechanism: 'Sympathetic nervous activation diverts blood flow away from the stomach.',
      consequence: 'Food sits undigested, fermenting and causing bloating regardless of how "healthy" the food is.',
      microFix: 'The "4-7-8 Breathing" technique: Inhale for 4, hold for 7, exhale for 8 before your first bite. This mechanically switches your nervous system to "Rest and Digest".'
    });
  }

  return insights;
}

function generateKitchenInsights(profile: UserProfile): KitchenInsight[] {
  const insights: KitchenInsight[] = [];

  // Insight 1: Vegetable Prep Loss
  if (profile.cookingOil && profile.cookingOil.includes('Refined')) {
    insights.push({
      id: 'oil_inflammation',
      type: 'kitchen_hack',
      title: 'The Oil Upgrade',
      relevanceScore: 95,
      problem: 'Use of Refined / Mixed Vegetable Oils',
      impact: 'These oils are high in Omega-6, which promotes cellular inflammation and insulin resistance.',
      protocol: 'Buy a small bottle of "Cold-Pressed Groundnut Oil" or "Ghee". Use it for tempering. The cost difference is minimal, but the metabolic difference is massive.'
    });
  }
  
  // Insight 2: Plastic/Microwave usage
  if (profile.activityLevel.includes('< 15') && profile.gender !== 'Other') {
     insights.push({
      id: 'plastic_heat',
      type: 'kitchen_hack',
      title: 'Micro-Plastics Protocol',
      relevanceScore: 70,
      problem: 'Reheating lunch in plastic containers',
      impact: 'Heat releases endocrine disruptors from plastic that mimic estrogen and disrupt insulin.',
      protocol: 'Switch to glass or stainless steel containers for any food that will be heated.'
    });
  }

  return insights;
}

function generatePhysiologicalInsights(profile: UserProfile): PhysiologicalInsight[] {
  const insights: PhysiologicalInsight[] = [];

  // Insight 1: The Acidity-Dinner Link
  if (profile.digestiveIssues.includes('Acidity') || profile.digestiveIssues.includes('Heartburn')) {
     insights.push({
      id: 'gerd_timing',
      type: 'physiological_link',
      title: 'The Silent Reflux Loop',
      relevanceScore: 88,
      observation: 'Frequent Acidity + Late/Heavy Dinner',
      explanation: 'When you lie down with a full stomach, acid travels up. This mimics heart anxiety and disrupts deep sleep, raising next-day blood sugar.',
      adjustment: 'The "3-Hour Rule": Ensure a strict 3-hour gap between your last bite and your pillow. Gravity is your best digestion aid.'
    });
  }
  
  // Insight 2: Caffeine & Iron
  if (profile.isVegetarian) {
     insights.push({
      id: 'caffeine_anemia',
      type: 'physiological_link',
      title: 'The Iron Blockade',
      relevanceScore: 75,
      observation: 'Vegetarian Diet + Potential Tea/Coffee habit',
      explanation: 'Plant-based iron is delicate. Tannins in tea/coffee bind to it, rendering your healthy spinach meal useless.',
      adjustment: 'Keep a 45-minute "No Caffeine Zone" before and after your main meals.'
    });
  }

  return insights;
}


// --- NEW FUNCTION: FITNESS GENERATOR ---
function generateFitnessInsights(profile: UserProfile): FitnessInsight[] {
  const insights: FitnessInsight[] = [];

  // Insight 1: "The Glucose Sponge" (Strength Training Gap)
  if (
    profile.conditions.includes('Diabetic') && 
    (profile.strengthTraining === 'No, never' || !profile.strengthTraining)
  ) {
    insights.push({
      id: 'glucose_sponge',
      type: 'fitness_protocol',
      title: 'The Muscle-Sponge Effect',
      relevanceScore: 92,
      strategy: 'Contraction-Mediated Uptake',
      science: 'Your muscles have a "back door" for sugar. When you contract them against resistance, they suck up glucose from your blood WITHOUT needing insulin.',
      dailyAction: 'The "Kitchen Counter Pushup": Do 10 incline pushups against your kitchen counter while your coffee/tea brews. No gym required.',
      intensity: 'Moderate'
    });
  }

  // Insight 2: "The Soleus Pump" (Sedentary / Pain Adjustment)
  // FIXED: Now uses the extended type definition
  const hasPain = profile.physical_limitations && profile.physical_limitations.includes('Pain'); 
  const isSedentary = profile.activityLevel.includes('< 15');

  if (hasPain || isSedentary) {
    insights.push({
      id: 'soleus_pump',
      type: 'fitness_protocol',
      title: 'The Soleus Pushup',
      relevanceScore: 80,
      strategy: 'Seated Metabolism',
      science: 'The soleus muscle in your calf is unique—it burns blood sugar for fuel but never gets tired. You can activate it while sitting.',
      dailyAction: 'While sitting at your desk/couch, keep toes planted and raise your heels up and down continuously for 15 mins. drops blood sugar by up to 50%.',
      intensity: 'Low'
    });
  }

  // Insight 3: "Brisk Intervals" (Walking Quality)
  // FIXED: Now uses the extended type definition
  if (profile.walking_pace && profile.walking_pace.includes('Casual')) {
    insights.push({
      id: 'interval_pace',
      type: 'fitness_protocol',
      title: 'Variable Pace Walking',
      relevanceScore: 78,
      strategy: 'Heart Rate Variation',
      science: 'Casual walking burns calories, but "Brisk" walking improves insulin sensitivity. Your heart rate needs to spike briefly to signal your cells to open up.',
      dailyAction: 'The "Telephone Pole" Game: Walk normally between two poles, then walk as fast as possible to the next one. Repeat for 10 mins.',
      intensity: 'Moderate'
    });
  }

  return insights;
}

// --- 3. MASTER EXPORT ---

export function generateTransformationReport(profile: BaseUserProfile): TransformationReport {
  // Cast the input profile to our extended type to satisfy internal functions
  const extendedProfile = profile as UserProfile;

  const archetype = determineArchetype(extendedProfile);
  
  const dominos = generateDominoInsights(extendedProfile);
  const kitchens = generateKitchenInsights(extendedProfile);
  const physiologicals = generatePhysiologicalInsights(extendedProfile);
  const fitness = generateFitnessInsights(extendedProfile); 
  
  // Combine and sort
  const allInsights = [...dominos, ...kitchens, ...physiologicals, ...fitness]
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 4); 

  return {
    userProfile: extendedProfile,
    archetype,
    insights: allInsights,
    generatedAt: Date.now()
  };
}