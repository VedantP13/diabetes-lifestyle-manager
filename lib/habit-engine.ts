export type HabitLevel = 'easiest' | 'target' | 'challenge';

export interface ScaledHabit {
  originalText: string;
  currentText: string;
  level: HabitLevel;
  isScaledDown: boolean;
  isScaledUp: boolean;
}

// SIMPLIFIED, FUNCTIONAL LANGUAGE
const HABIT_TIERS: Record<string, { easiest: string; target: string; challenge: string }> = {
  'oil': {
    easiest: 'Use less oil for just one meal today.',
    target: 'Use cold-pressed oil instead of refined oil.',
    challenge: 'Cook all meals using only cold-pressed oil or ghee.'
  },
  'hydration': {
    easiest: 'Drink one glass of water right now.',
    target: 'Drink 2.5 to 3 liters of water today.',
    challenge: 'Drink more than 3 liters of water today.'
  },
  'sequencing': {
    easiest: 'Eat a few bites of vegetables before eating your rice or roti.',
    target: 'Eat vegetables first, protein second, and carbs last.',
    challenge: 'Wait 10 minutes between eating your vegetables and your carbs.'
  },
  'walking': {
    easiest: 'Walk for 5 minutes after dinner.',
    target: 'Walk for 30 minutes today.',
    challenge: 'Walk 10,000 steps and walk 15 minutes after heavy meals.'
  },
  'sleep': {
    easiest: 'Put your phone away 10 minutes before sleeping.',
    target: 'Avoid using screens 1 hour before sleep.',
    challenge: 'Avoid screens 2 hours before sleep and read a book.'
  }
};

export function getElasticHabit(originalText: string, consecutiveMisses: number, currentStreak: number): ScaledHabit {
  const lowerText = originalText.toLowerCase();
  
  let key = 'general';
  if (lowerText.includes('oil') || lowerText.includes('refined')) key = 'oil';
  else if (lowerText.includes('liter') || lowerText.includes('water')) key = 'hydration';
  else if (lowerText.includes('first') || lowerText.includes('second') || lowerText.includes('sequence')) key = 'sequencing';
  else if (lowerText.includes('walk') || lowerText.includes('step')) key = 'walking';
  else if (lowerText.includes('screen') || lowerText.includes('sleep') || lowerText.includes('bed')) key = 'sleep';

  const tiers = HABIT_TIERS[key];

  if (!tiers) {
    return { originalText, currentText: originalText, level: 'target', isScaledDown: false, isScaledUp: false };
  }

  if (consecutiveMisses >= 3) {
    return { originalText, currentText: tiers.easiest, level: 'easiest', isScaledDown: true, isScaledUp: false };
  }
  
  if (currentStreak >= 7) {
    return { originalText, currentText: tiers.challenge, level: 'challenge', isScaledDown: false, isScaledUp: true };
  }

  return { originalText, currentText: tiers.target, level: 'target', isScaledDown: false, isScaledUp: false };
}