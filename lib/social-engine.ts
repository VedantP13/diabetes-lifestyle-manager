import { UserProfile } from './generator';

export interface RestaurantGuide {
  cuisineName: string;
  greenList: string[]; // "Order This"
  redList: string[];   // "Avoid This"
  smartSwap: string;   // "Instead of X, ask for Y"
}

export interface SocialProtocol {
  restaurant: RestaurantGuide;
  alcoholStrategy: string;
  travelHack: string;
}

export function generateSocialProtocol(profile: UserProfile): SocialProtocol {
  
  // 1. REGIONAL RESTAURANT LOGIC
  // We infer the likely cuisine based on their State/Region
  let guide: RestaurantGuide = {
    cuisineName: "General Dining",
    greenList: ["Clear Soups", "Grilled Paneer/Chicken", "Tandoori Roti"],
    redList: ["Creamy Soups", "Fried Starters", "Naan / Rumali Roti"],
    smartSwap: "Ask for 'Tandoori Roti' instead of Naan. It's whole wheat vs refined flour."
  };

  const region = profile.region || '';

  if (region.includes('South') || region.includes('Tamil') || region.includes('Kerala') || region.includes('Karnataka')) {
    guide = {
      cuisineName: "South Indian Dining",
      greenList: ["Idli (limit 2)", "Appam (No coconut milk)", "Rasam", "Vegetable Poriyal"],
      redList: ["Parotta (Pure Maida)", "Poori", "Fried Vadas", "Ghee Roast"],
      smartSwap: "Order 'Set Dosa' (softer, less oil) instead of 'Ghee Roast'. Eat the Chutney, skip the Sambar (often high sugar)."
    };
  } else if (region.includes('North') || region.includes('Delhi') || region.includes('Punjab')) {
    guide = {
      cuisineName: "North Indian Dining",
      greenList: ["Tandoori Roti", "Yellow Dal Tadka", "Baingan Bharta", "Tikka (Dry)"],
      redList: ["Butter Naan", "Dal Makhani (Cream heavy)", "Malai Kofta", "Fried Rice"],
      smartSwap: "Swap 'Dal Makhani' for 'Yellow Dal'. Makhani has cream/sugar; Yellow Dal has fiber."
    };
  } else if (region.includes('West') || region.includes('Maharashtra') || region.includes('Guj')) {
    guide = {
      cuisineName: "West Indian / Thali",
      greenList: ["Jowar/Bajra Bhakri", "Usal (Sprouted Curry)", "Kadi"],
      redList: ["Fried Farsan", "Shrikhand/Basundi", "Potato Bhaji"],
      smartSwap: "In a Thali, eat the Bhakri and Sprouts first. Treat the sweet/fried item as a '1-bite taster' only."
    };
  } else if (region.includes('East') || region.includes('Bengal')) {
    guide = {
      cuisineName: "East Indian Dining",
      greenList: ["Steamed Fish/Machher Jhol", "Shukto (Bitter gourd mix)", "Plain Rice (Portion controlled)"],
      redList: ["Luchi (Deep fried)", "Mishti (Sweets)", "Fried Brinjal"],
      smartSwap: "Start with 'Shukto' (bitter). The bitters prime your liver and lower the glucose spike from the rice."
    };
  }

  // 2. ALCOHOL / PARTY STRATEGY
  // If they didn't answer alcohol, we give a generic "Social Drink" tip
  let alcoholTip = "If you drink: Stick to clear spirits (Vodka/Gin) with water/soda. Beer and Wine are high in sugar/carbs.";
  if (profile.conditions.includes('Diabetic')) {
    alcoholTip = "Mocktail Hack: Ask for 'Soda water with fresh lime and salt'. It looks like a drink, keeps you hydrated, and has Zero sugar.";
  }

  // 3. TRAVEL / OFFICE HACK
  let travelTip = "The 'Emergency Kit': Keep 50g of Roasted Chana (Chickpeas) in your bag. Eat it 15 mins before any office party snack.";
  if (profile.workSchedule?.includes('Night') || profile.workSchedule?.includes('Rotational')) {
    travelTip = "Night Shift Rule: Your digestion shuts down at 2 AM. If you must eat, stick to liquids (Buttermilk/Soup). No solid meals between 2 AM - 5 AM.";
  }

  return {
    restaurant: guide,
    alcoholStrategy: alcoholTip,
    travelHack: travelTip
  };
}