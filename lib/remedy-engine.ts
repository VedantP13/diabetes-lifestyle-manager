import { UserProfile } from './generator';

export interface Remedy {
  id: string;
  title: string;
  timing: 'Morning' | 'With Meal' | 'Pre-Sleep' | 'Anytime';
  ingredients: string[];
  preparation: string;
  benefits: string;
  caution?: string; // e.g., "Skip if you have ulcers"
  tags: string[];
}

export function generateKitchenPharmacy(profile: UserProfile): Remedy[] {
  const remedies: Remedy[] = [];
  
  // Flags for Safety Checks
  const hasAcidity = profile.digestiveIssues?.includes('Acidity') || profile.digestiveIssues?.includes('Heartburn');
  const hasBloating = profile.digestiveIssues?.includes('Bloating');
  const hasConstipation = profile.digestiveIssues?.includes('Constipation');
  const hasPCOS = profile.pcosStatus === 'Yes';
  const hasBP = profile.conditions.includes('High BP');
  const hasDiabetes = profile.conditions.includes('Diabetic');
  const lowEnergy = profile.energy_levels?.includes('Crash') || profile.energy_levels?.includes('Tired');

  // --- 1. MORNING ELIXIR (The Wake-Up Drink) ---
  
  // Scenario A: The Diabetic Standard (But SAFE for Acidity)
  if (hasDiabetes) {
    if (hasAcidity) {
      // Methi is safe, Lemon/ACV is NOT
      remedies.push({
        id: 'methi_water',
        title: 'Fenugreek (Methi) Soaked Water',
        timing: 'Morning',
        ingredients: ['1 tsp Fenugreek Seeds', '1 glass Warm Water'],
        preparation: 'Soak seeds overnight. Drink water first thing in morning. Chew the seeds if possible.',
        benefits: 'Improves insulin sensitivity and lowers fasting blood sugar without irritating the stomach lining.',
        tags: ['Sugar Control', 'Gut Safe']
      });
    } else {
      // ACV is powerful for non-acidic Diabetics
      remedies.push({
        id: 'acv_drink',
        title: 'Apple Cider Vinegar Kickstarter',
        timing: 'Morning',
        ingredients: ['1 tbsp Organic ACV (with mother)', '1 glass Water'],
        preparation: 'Mix and drink with a straw (to protect teeth).',
        benefits: 'Lowers insulin response to breakfast by up to 30%.',
        caution: 'Stop immediately if you feel burning sensation.',
        tags: ['Metabolism', 'Insulin']
      });
    }
  } 
  // Scenario B: PCOS / Hormonal Balance
  else if (hasPCOS) {
    remedies.push({
      id: 'cinnamon_water',
      title: 'Ceylon Cinnamon Infusion',
      timing: 'Morning',
      ingredients: ['1 inch Ceylon Cinnamon stick', 'Hot Water'],
      preparation: 'Steep cinnamon in boiling water for 10 mins.',
      benefits: 'Mimics insulin to reduce blood sugar and regulates menstrual cycles.',
      tags: ['Hormones', 'PCOS']
    });
  }
  // Scenario C: General Detox (Default)
  else {
    remedies.push({
      id: 'lemon_salt',
      title: 'Adrenal Cocktail',
      timing: 'Morning',
      ingredients: ['1/2 Lemon', 'Pinch of Himalayan Salt', 'Warm Water'],
      preparation: 'Squeeze lemon and salt into warm water.',
      benefits: 'Replenishes electrolytes lost during sleep and supports adrenal function.',
      tags: ['Energy', 'Hydration']
    });
  }

  // --- 2. DIGESTIVE AID (Post-Meal) ---
  
  if (hasBloating) {
    remedies.push({
      id: 'ccf_tea',
      title: 'CCF Tea (Cumin, Coriander, Fennel)',
      timing: 'With Meal',
      ingredients: ['1/2 tsp Jeera', '1/2 tsp Dhaniya seeds', '1/2 tsp Saunf'],
      preparation: 'Boil all seeds in water for 5 mins. Strain and sip warm.',
      benefits: 'The gold standard Ayurvedic remedy for bloating and gas.',
      tags: ['Anti-Bloat', 'Ayurveda']
    });
  } else if (hasAcidity) {
    remedies.push({
      id: 'fennel_chew',
      title: 'Raw Fennel (Saunf) Chew',
      timing: 'With Meal',
      ingredients: ['1 tsp Raw Fennel Seeds', 'Optional: Rock Sugar (Mishri)'],
      preparation: 'Chew slowly after lunch and dinner.',
      benefits: 'Fennel oils relax the stomach muscles and neutralize acid naturally.',
      tags: ['Cooling', 'Acidity']
    });
  }

  // --- 3. ENERGY BOOSTER (The 4 PM Slump) ---
  
  if (lowEnergy || hasBP) {
    // Beetroot is great for energy and BP, unless diabetic (sugar concern - use moderation)
    // Hibiscus is better for BP
    if (hasBP) {
      remedies.push({
        id: 'hibiscus_tea',
        title: 'Ruby Hibiscus Tea',
        timing: 'Anytime',
        ingredients: ['Dried Hibiscus Petals', 'Hot Water'],
        preparation: 'Steep for 5 mins. Drink warm or iced.',
        benefits: 'Clinically proven to lower systolic blood pressure (natural ACE inhibitor).',
        tags: ['Heart Health', 'Antioxidant']
      });
    } else {
      // Spearmint for PCOS or Green Tea for others
      remedies.push({
        id: 'green_tea_lemon',
        title: 'Matcha or Green Tea',
        timing: 'Anytime',
        ingredients: ['Green Tea Bag', 'Lemon Juice'],
        preparation: 'Brew tea, add lemon (Vitamin C helps absorb the antioxidants).',
        benefits: 'Provides L-Theanine for focused energy without the coffee jitters.',
        tags: ['Focus', 'Metabolism']
      });
    }
  }

  // --- 4. BEDTIME RITUAL (Sleep & Repair) ---
  
  if (hasConstipation) {
    remedies.push({
      id: 'triphala',
      title: 'Triphala Warm Water',
      timing: 'Pre-Sleep',
      ingredients: ['1/2 tsp Triphala Powder', 'Warm Water'],
      preparation: 'Mix and drink 30 mins before bed.',
      benefits: 'Non-habit forming gut regulator. Cleanses the colon overnight.',
      tags: ['Gut Health', 'Detox']
    });
  } else if (profile.sleepHours.includes('<') || profile.stressLevel.includes('High')) {
    remedies.push({
      id: 'nutmeg_milk',
      title: 'Nutmeg (Jaiphal) Moon Milk',
      timing: 'Pre-Sleep',
      ingredients: ['Pinch of Nutmeg powder', '1/2 cup Warm Milk (or Almond Milk)'],
      preparation: 'Whisk nutmeg into warm milk.',
      benefits: 'Nutmeg contains trimyristin, a natural compound that induces sleep and relaxes muscles.',
      tags: ['Deep Sleep', 'Relaxation']
    });
  } else {
    remedies.push({
      id: 'chamomile',
      title: 'Chamomile Steep',
      timing: 'Pre-Sleep',
      ingredients: ['Chamomile Flowers/Bag', 'Hot Water'],
      preparation: 'Steep covered for 10 mins to trap essential oils.',
      benefits: 'Mild sedative effect to prepare the nervous system for rest.',
      tags: ['Calm', 'Sleep']
    });
  }

  return remedies;
}