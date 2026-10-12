import masterFoodDb from '../data/master_food_database.json';

// Create a fast lookup map for O(1) performance
const foodDbMap = new Map(masterFoodDb.map((item: any) => [item.food_code, item]));

export interface Macros {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    fiber: number;
    freeSugar: number;
}

export function calculateDishMacros(foodCodes: string[] | undefined): Macros {
    const defaultMacros = { calories: 0, carbs: 0, protein: 0, fat: 0, fiber: 0, freeSugar: 0 };
    
    if (!foodCodes || foodCodes.length === 0) return defaultMacros;

    const totals = foodCodes.reduce((acc, code) => {
        const foodItem = foodDbMap.get(code);
        if (foodItem) {
            // Mapping to the standard ICMR data keys. 
            // We use Math.max to prevent any negative data artifacts
            acc.calories += Math.max(0, Number(foodItem.energy_kcal || 0));
            acc.carbs += Math.max(0, Number(foodItem.carb_g || 0)); // Net carbs
            acc.protein += Math.max(0, Number(foodItem.protein_g || 0));
            acc.fat += Math.max(0, Number(foodItem.fat_g || 0));
            acc.fiber += Math.max(0, Number(foodItem.dietary_fibre_g || 0));
            acc.freeSugar += Math.max(0, Number(foodItem.freesugar_g || 0));
        }
        return acc;
    }, { calories: 0, carbs: 0, protein: 0, fat: 0, fiber: 0, freeSugar: 0 });

    // Rounding to 1 decimal place to prevent ugly UI rendering (e.g., 45.00001g)
    return {
        calories: Math.round(totals.calories),
        carbs: Math.round(totals.carbs * 10) / 10,
        protein: Math.round(totals.protein * 10) / 10,
        fat: Math.round(totals.fat * 10) / 10,
        fiber: Math.round(totals.fiber * 10) / 10,
        freeSugar: Math.round(totals.freeSugar * 10) / 10,
    };
}