// lib/types/report-types.ts

import { UserProfile } from '../generator'; // Importing existing profile type

// --- 1. The Core Identity (Replaces "Phenotype") ---
// This defines the "Persona" of the user.
export type ArchetypeID = 'twilight_warrior' | 'emotional_grazer' | 'outsourced_eater' | 'metabolic_conservative' | 'balanced_builder';

export interface LifestyleArchetype {
  id: ArchetypeID;
  title: string;          // e.g., "The Twilight Warrior"
  colorTheme: 'slate' | 'blue' | 'amber' | 'emerald' | 'rose'; // UI theme mapping (No hardcoded hex codes)
  narrative: string;      // The deep "Why" paragraph
  coreStrategy: string;   // The "Big Picture" fix
  focusTags: string[];    // e.g., ["Circadian Rhythm", "Protein Timing"]
}

// --- 2. The Insight Modules (The "Blocks" of the Report) ---
// We use a "Discriminated Union" here. This is the key to modularity.
// It allows the UI to render different layouts based on the 'type' field automatically.

export type InsightType = 'domino_effect' | 'kitchen_hack' | 'physiological_link' | 'fitness_protocol';

export interface BaseInsight {
  id: string;
  type: InsightType;
  title: string;
  relevanceScore: number; // 1-100, allows us to sort insights by importance later
}

// A. "The Domino Effect" (Connecting two unrelated inputs)
export interface DominoInsight extends BaseInsight {
  type: 'domino_effect';
  trigger: string;        // e.g., "Because you sleep < 6 hours..."
  consequence: string;    // e.g., "...your 4 PM sugar cravings are 40% stronger."
  mechanism: string;      // The specific hormone/biological reason (e.g., "Ghrelin spike")
  microFix: string;       // The specific small action
}

// B. "Kitchen Reality Check" (Logistics & Environment)
export interface KitchenInsight extends BaseInsight {
  type: 'kitchen_hack';
  problem: string;        // e.g., "Maid cuts veggies in the morning"
  impact: string;         // e.g., "Nutrient oxidation loss"
  protocol: string;       // Specific instruction for the maid/cook
}

// C. "Physiological Link" (Medical/Body context without clinical jargon)
export interface PhysiologicalInsight extends BaseInsight {
  type: 'physiological_link';
  observation: string;    // e.g., "Late dinner + Acidity"
  explanation: string;    // The narrative explanation
  adjustment: string;     // The lifestyle adjustment
}

// D. NEW: Fitness Protocol Interface
export interface FitnessInsight extends BaseInsight {
  type: 'fitness_protocol';
  strategy: string;       // e.g., "The Glucose Sink"
  science: string;        // The metabolic explanation (e.g., "Muscle absorbs sugar without insulin")
  dailyAction: string;    // The specific micro-habit (e.g., "10 Squats before dinner")
  intensity: 'Low' | 'Moderate' | 'High'; // For UI tagging
}

// --- 3. The Master Report Container ---
// This object will be what the generator function returns to the UI.
export interface TransformationReport {
  userProfile: UserProfile; // Keep reference to original data
  archetype: LifestyleArchetype;
  
  // We keep insights in a generic array. The UI will loop through this.
  // This means we can have 1 insight or 10, and the UI won't break.
  insights: (DominoInsight | KitchenInsight | PhysiologicalInsight | FitnessInsight)[];
  
  generatedAt: number;
}