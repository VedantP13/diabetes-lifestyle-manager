// D:\aProgramming\AI-Diabetes_manager_Feb\diabetes-manager\data\dishes.ts

// 1. Import your freshly mapped JSON data
import mappedDishes from './dishes_mapped.json';

export type Region = 'South India' | 'North India' | 'General' | 'Kerala' | 'Karnataka' | 'Andhra' | 'Maharashtra' | 'Gujarat' | 'East India';
export type MealSlot = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
export type Texture = 'Soft' | 'Crunchy' | 'Liquid' | 'Regular';
export type GlycemicIndex = 'Low' | 'Medium' | 'High';

export interface Dish {
  id: string;
  name: string;
  food_codes: string[]; // Strict requirement for the array
  region: Region[];
  slots: MealSlot[];
  tags: {
    texture: Texture;
    gi: GlycemicIndex;
    veg: boolean;
    gluten_free: boolean;
    weight_loss_friendly: boolean;
    elderly_friendly: boolean;
    is_vegan: boolean;        
    contains_dairy: boolean;  
    is_spicy: boolean;        
    renal_safe: boolean;      
    protein_rich: boolean;    
  };
}

// 2. Export the JSON data cast as your strict Dish[] type
// This completely replaces the hundreds of lines of hardcoded arrays!
export const dishes: Dish[] = mappedDishes as Dish[];