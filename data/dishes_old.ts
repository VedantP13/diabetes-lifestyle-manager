// data/dishes.ts

export type Region = 
  'South India' | 'North India' | 'General' | 'Kerala' | 'Karnataka' | 'Andhra' | 'Maharashtra' | 'Gujarat' | 'East India';
export type MealSlot = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
export type Texture = 'Soft' | 'Crunchy' | 'Liquid' | 'Regular';
export type GlycemicIndex = 'Low' | 'Medium' | 'High';

export interface Dish {
  id: string;
  name: string; 
  food_code?: string;
  region: Region[];
  slots: MealSlot[];
  tags: {
    // Existing tags
    texture: Texture;
    gi: GlycemicIndex;
    veg: boolean;
    gluten_free: boolean;
    weight_loss_friendly: boolean;
    elderly_friendly: boolean;
    
    // --- NEW GRANULAR FLAGS ---
    is_vegan: boolean;        // True if NO animal products (milk, ghee, curd, honey)
    contains_dairy: boolean;  // True if it has milk, curd, ghee, paneer, butter
    is_spicy: boolean;        // True if it typically has chillies/spices that trigger acidity
    renal_safe: boolean;      // True if low in potassium/sodium (e.g., leached veggies, no spinach/banana)
    protein_rich: boolean;    // True if main component is protein (Dal, Paneer, Egg, Chicken)
  };
}

export const dishes: Dish[] = [
  // ==========================================
  // EXISTING ENTRIES
  // ==========================================
  // --- BREAKFAST (South India) ---
  {
    id: 'si_bf_1',
    name: 'Idli with Sambar (No Coconut Chutney)',
    region: ['South India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'si_bf_2',
    name: 'Ragi Idli',
    region: ['South India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'si_bf_3',
    name: 'Godhuma (Wheat) Rava Upma with Veggies',
    region: ['South India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,         // Usually made with oil
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'si_bf_4',
    name: 'Pesarattu (Green Gram Dosa)',
    region: ['South India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,        // Ginger is used, but not "spicy" heat
        renal_safe: true,       // Green gram is safer than other legumes
        protein_rich: true
    }
  },
  {
    id: 'si_bf_5',
    name: 'Millet Pongal',
    region: ['South India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Contains Ghee/Milk typically
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },

  // --- LUNCH (South India) ---
  {
    id: 'si_ln_1',
    name: 'Brown Rice + Sambar + Cabbage Poriyal',
    region: ['South India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Cabbage is low potassium
        protein_rich: false
    }
  },
  {
    id: 'si_ln_2',
    name: 'Curd Rice with Pomegranate',
    region: ['South India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Curd is dairy
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'si_ln_3',
    name: 'Foxtail Millet Rice + Keerai (Spinach) Kootu',
    region: ['South India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,         // Assuming coconut base
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Spinach is High Potassium (Danger)
        protein_rich: true
    }
  },
  {
    id: 'si_ln_4',
    name: 'Chapati (2) + Chickpea Curry (Chana)',
    region: ['South India', 'North India'],
    slots: ['Lunch', 'Dinner'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Chana Masala is usually spicy
        renal_safe: false,      // Chickpeas are High Potassium
        protein_rich: true
    }
  },
  {
    id: 'si_ln_5',
    name: 'Vegetable Biryani (Less Rice, More Veggies)',
    region: ['South India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: false,        // Often uses Curd/Ghee
        contains_dairy: true,
        is_spicy: true,         // Biryani spices trigger acidity
        renal_safe: true,
        protein_rich: false
    }
  },

  // --- DINNER (Light / Elderly Friendly) ---
  {
    id: 'si_dn_1',
    name: 'Snake Gourd Kootu + 1 Phulka',
    region: ['South India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Snake gourd is excellent for renal
        protein_rich: false
    }
  },
  {
    id: 'si_dn_2',
    name: 'Bottle Gourd Soup + Grilled Paneer',
    region: ['General'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Paneer is dairy
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },

  // --- SNACKS (General) ---
  {
    id: 'sn_1',
    name: 'Soaked Almonds (5) & Walnuts (2)',
    region: ['General'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Nuts are high in Phosphorus/Potassium
        protein_rich: true
    }
  },
  {
    id: 'sn_2',
    name: 'Sundal (Boiled Chickpeas)',
    region: ['South India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Whole chickpeas are high Potassium
        protein_rich: true
    }
  },

  // ==========================================
  // NEW ADDITIONS: TAMIL NADU REGIONAL DATABASE
  // ==========================================

  // 1. BREAKFAST (TN Variety)
  {
    id: 'tn_bf_1',
    name: 'Kambu (Pearl Millet) Koozh with Small Onions',
    region: ['South India'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Traditional Koozh is mixed with buttermilk
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,       // Millets are moderate; buttermilk is generally okay if low salt
        protein_rich: false
    }
  },
  {
    id: 'tn_bf_2',
    name: 'Thinai (Foxtail Millet) Pongal',
    region: ['South India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Pongal requires Ghee
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'tn_bf_3',
    name: 'Adai (Lentil Dosa) with Avial',
    region: ['South India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: false,        // Avial uses Curd
        contains_dairy: true,
        is_spicy: false,
        renal_safe: false,      // Adai is heavy lentil (high potassium); Avial has coconut
        protein_rich: true
    }
  },
  {
    id: 'tn_bf_4',
    name: 'Idiyappam with Vegetable Stew (Sodhi)',
    region: ['South India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,         // Stew uses Coconut Milk (Vegan)
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'tn_bf_5',
    name: 'Varagu (Kodo Millet) Arisi Upma',
    region: ['South India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'tn_bf_6',
    name: 'Ragi Semiya (Vermicelli) Upma',
    region: ['South India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'tn_bf_7',
    name: 'Kal Dosa (Soft Sponge Dosa) with Mint Chutney',
    region: ['South India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },

  // 2. LUNCH (TN Variety)
  {
    id: 'tn_ln_1',
    name: 'Samai (Little Millet) Curd Rice + Pomegranate',
    region: ['South India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Curd is dairy
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'tn_ln_2',
    name: 'Brown Rice + Drumstick Sambar + Plantain Stem Poriyal',
    region: ['South India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Plantain stem is excellent for renal/kidney stones
        protein_rich: false
    }
  },
  {
    id: 'tn_ln_3',
    name: 'Keerai (Spinach) Masiyal + Rice + Roasted Yam',
    region: ['South India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Spinach + Yam = Very High Potassium (Double Danger)
        protein_rich: false
    }
  },
  {
    id: 'tn_ln_4',
    name: 'Karakuzhambu (Turkey Berry) + Rice + Cabbage Kootu',
    region: ['South India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Karakuzhambu is typically spicy and tangy
        renal_safe: true,       // Turkey berry is okay; Cabbage is safe
        protein_rich: false
    }
  },
  {
    id: 'tn_ln_5',
    name: 'Lemon Rice (Made with Broken Wheat) + Pan-fried Vazhakkai',
    region: ['South India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Raw/Pan-fried banana is high potassium
        protein_rich: false
    }
  },
  {
    id: 'tn_ln_6',
    name: 'Paruppu Usili (Lentil crumble) + Rasam Sadam',
    region: ['South India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Usili is concentrated Dal (high protein/potassium mix)
        protein_rich: true
    }
  },
  {
    id: 'tn_ln_7',
    name: 'Vegetable Biryani (Seeraga Samba) + Raita',
    region: ['South India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: false,        // Raita is dairy
        contains_dairy: true,
        is_spicy: true,         // Biryani spices
        renal_safe: true,
        protein_rich: false
    }
  },

  // 3. DINNER (TN - Lighter Options)
  {
    id: 'tn_dn_1',
    name: 'Chapati (2) + Bottle Gourd (Sorakkai) Kootu',
    region: ['South India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Kootu often has milk/ghee finish
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,       // Bottle gourd is the best renal vegetable
        protein_rich: false
    }
  },
  {
    id: 'tn_dn_2',
    name: 'Godhuma (Wheat) Dosa with Tomato Thokku',
    region: ['South India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Thokku is spicy/concentrated
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'tn_dn_3',
    name: 'Appam (No coconut milk center) + Veg Kurma',
    region: ['South India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,         // Kurma uses coconut paste usually
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'tn_dn_4',
    name: 'Broken Wheat (Dalia) Kichadi with Vegetables',
    region: ['South India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'tn_dn_5',
    name: 'Panakam (Jaggery Water) + 2 Idli',
    region: ['South India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'tn_dn_6',
    name: 'Rava Upma with Green Peas and Carrots',
    region: ['South India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: false, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },

  // 4. SNACKS (TN - Healthy)
  {
    id: 'tn_sn_1',
    name: 'Konda Kadalai (Black Chana) Sundal',
    region: ['South India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // High Potassium
        protein_rich: true
    }
  },
  {
    id: 'tn_sn_2',
    name: 'Spiced Neer Mor (Buttermilk)',
    region: ['South India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true      // Good source of protein
    }
  },
  {
    id: 'tn_sn_3',
    name: 'Masala Pori (Puffed Rice with Veggies)',
    region: ['South India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Masala implies spice
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'tn_sn_4',
    name: 'Pattani (Green Peas) Sundal',
    region: ['South India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'tn_sn_5',
    name: 'Vazhaithandu (Plantain Stem) Soup',
    region: ['South India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Excellent for renal
        protein_rich: false
    }
  },
  {
    id: 'tn_sn_6',
    name: 'Ellu Urundai (Sesame Ball - Small portion)',
    region: ['South India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Sesame is extremely high Phosphorus
        protein_rich: true
    }
  },


  // ==========================================
  // REGION 2: KERALA DATABASE
  // ==========================================

  // 1. BREAKFAST (Kerala)
  {
    id: 'kl_bf_1',
    name: 'Puttu (Ragi/Wheat) with Kadala Curry',
    region: ['Kerala'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,         // Kadala curry usually coconut milk/oil based
        contains_dairy: false,
        is_spicy: true,         // Kadala curry is often spiced
        renal_safe: false,      // Black chickpeas are High Potassium
        protein_rich: true
    }
  },
  {
    id: 'kl_bf_2',
    name: 'Appam (Fermented) with Vegetable Stew',
    region: ['Kerala'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,         // Coconut milk stew
        contains_dairy: false,
        is_spicy: false,        // Stew is mild
        renal_safe: true,       // Veggies in stew (carrots/beans) are generally okay
        protein_rich: false
    }
  },
  {
    id: 'kl_bf_3',
    name: 'Idiyappam (String Hoppers) with Egg Roast / Chickpea Curry',
    region: ['Kerala'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: false,             // Egg Roast implies Non-Veg
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Egg
        contains_dairy: false,
        is_spicy: true,         // Roasts are spicy
        renal_safe: true,       // Eggs are better protein source for renal than chickpeas
        protein_rich: true
    }
  },
  {
    id: 'kl_bf_4',
    name: 'Gothambu (Broken Wheat) Kanji with Payar (Green Gram)',
    region: ['Kerala'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Green gram is safer than Black Chana
        protein_rich: true
    }
  },
  {
    id: 'kl_bf_5',
    name: 'Dosa with Chammanthi (Roasted Coconut Chutney)',
    region: ['Kerala'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Chammanthi is spicy
        renal_safe: false,      // Coconut chutney is high Potassium
        protein_rich: false
    }
  },
  // NEW ADDITION: High Protein Non-Veg Breakfast
  {
    id: 'kl_bf_6',
    name: 'Mutta (Egg) Surka/Roast with 2 Whole Wheat Chapatis',
    region: ['Kerala'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: false, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: true,
        protein_rich: true
    }
  },

  // 2. LUNCH (Kerala)
  {
    id: 'kl_ln_1',
    name: 'Matta Rice (Portion Controlled) + Moru Curry + Thoran',
    region: ['Kerala'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Moru is dairy
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'kl_ln_2',
    name: 'Olan (Ash Gourd & Cowpeas) + Red Rice',
    region: ['Kerala'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,         // Coconut milk based
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Ash Gourd is excellent for kidneys
        protein_rich: false
    }
  },
  {
    id: 'kl_ln_3',
    name: 'Avial (Mixed Veggies) + Rice + Unakkalari (Payasam rice - small cup)',
    region: ['Kerala'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Avial uses Curd
        contains_dairy: true,
        is_spicy: false,
        renal_safe: false,      // High coconut + Potassium rich veggies
        protein_rich: false
    }
  },
  {
    id: 'kl_ln_4',
    name: 'Kappa (Tapioca) - Boiled & Drained + Fish Curry (Meen Curry)',
    region: ['Kerala'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: false, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: true,       // Fish is good; Boiled & Drained tapioca reduces potassium
        protein_rich: true
    }
  },
  {
    id: 'kl_ln_5',
    name: 'Vegetable Thoran (Cabbage/Beans) + Curd Rice',
    region: ['Kerala'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  // NEW ADDITION: Diabetic Superfood (Kudampuli Fish)
  {
    id: 'kl_ln_6',
    name: 'Meen Mulakittathu (Fish in Red Chilli/Kudampuli) + Matta Rice',
    region: ['Kerala'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: false, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,
        contains_dairy: false,
        is_spicy: true,         // Mulakittathu means Chilli
        renal_safe: true,       // Kudampuli (Pot Tamarind) is better than Tomato for renal
        protein_rich: true
    }
  },

  // 3. DINNER (Kerala - Light)
  {
    id: 'kl_dn_1',
    name: 'Kanji (Rice Gruel) + Payar (Green Gram) + Pickle',
    region: ['Kerala'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,        // Pickle is spicy but side dish
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'kl_dn_2',
    name: 'Chembu (Taro Root) Asthram + 1 Chapati',
    region: ['Kerala'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Asthram uses Curd
        contains_dairy: true,
        is_spicy: false,
        renal_safe: false,      // Taro is High Potassium
        protein_rich: false
    }
  },
  {
    id: 'kl_dn_3',
    name: 'Pathiri (Rice Roti) + Veg Kurma',
    region: ['Kerala'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'High',             // Rice flour
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,         // Coconut milk kurma
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Coconut overload
        protein_rich: false
    }
  },
  {
    id: 'kl_dn_4',
    name: 'Oats Upma with Curry Leaves',
    region: ['Kerala'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  // NEW ADDITION: Standard Wheat Dosa
  {
    id: 'kl_dn_5',
    name: 'Godhuma (Wheat) Dosa + Onion Chutney',
    region: ['Kerala'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Onion chutney is spicy
        renal_safe: true,
        protein_rich: false
    }
  },

  // 4. SNACKS (Kerala)
  {
    id: 'kl_sn_1',
    name: 'Ada (Steamed Rice Parcel) with Jaggery (Small Piece)',
    region: ['Kerala'],
    slots: ['Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'kl_sn_2',
    name: 'Nendran Banana (Steamed) - 1/2 Piece',
    region: ['Kerala'],
    slots: ['Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Banana = High Potassium
        protein_rich: false
    }
  },
  {
    id: 'kl_sn_3',
    name: 'Aval Vilayichathu (Beaten Rice with Jaggery) - Small Bowl',
    region: ['Kerala'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'High', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'kl_sn_4',
    name: 'Kappa Chips (Baked/Air Fried)',
    region: ['Kerala'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'High', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },


  // ==========================================
  // REGION 3: KARNATAKA DATABASE (7-Day Variety)
  // ==========================================

  // 1. BREAKFAST (Karnataka)
  {
    id: 'ka_bf_1',
    name: 'Ragi Mudde with Soppu Saaru (Green Leafy Stew)',
    region: ['Karnataka'],
    slots: ['Breakfast', 'Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // "Soppu" (Greens) = Very High Potassium
        protein_rich: false
    }
  },
  {
    id: 'ka_bf_2',
    name: 'Akki Roti (Dill Leaf & Cucumber - Portion Controlled)',
    region: ['Karnataka'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ka_bf_3',
    name: 'Jolada (Jowar) Roti with Enneayi (Brinjal Curry)',
    region: ['Karnataka'],
    slots: ['Breakfast', 'Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Enneayi is traditionally spicy & oily
        renal_safe: true,       // Brinjal is low potassium
        protein_rich: false
    }
  },
  {
    id: 'ka_bf_4',
    name: 'Bisi Bele Bath (Made with Foxtail Millet/Navane)',
    region: ['Karnataka'],
    slots: ['Breakfast', 'Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Authentic BBB requires Ghee
        contains_dairy: true,
        is_spicy: true,         // Masala heavy
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'ka_bf_5',
    name: 'Set Dosa (Sponge Dosa) with Saagu',
    region: ['Karnataka'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ka_bf_6',
    name: 'Neer Dosa with Spiced Grated Coconut',
    region: ['Karnataka'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Fresh coconut = High Potassium
        protein_rich: false
    }
  },

  // 2. LUNCH (Karnataka)
  {
    id: 'ka_ln_1',
    name: 'Jolada Ganji (Sorghum Porridge) + Buttermilk',
    region: ['Karnataka'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Buttermilk
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ka_ln_2',
    name: 'Brown Rice + Bassaru (Drained Greens Broth) + Palya',
    region: ['Karnataka'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Bassaru is concentrated greens extract (High K)
        protein_rich: true
    }
  },
  {
    id: 'ka_ln_3',
    name: 'Huli Anna (Sambar Rice) with Pumpkin & Beans',
    region: ['Karnataka'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ka_ln_4',
    name: 'Sajje (Bajra) Roti + Garlic Chutney + Mixed Veg Palya',
    region: ['Karnataka'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Garlic chutney is spicy
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ka_ln_5',
    name: 'Menthe (Fenugreek) Pulao with Brown Rice + Raita',
    region: ['Karnataka'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Raita
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  // NEW ADDITION: Non-Veg Classic
  {
    id: 'ka_ln_6',
    name: 'Ragi Mudde + Koli Saaru (Country Chicken Curry)',
    region: ['Karnataka'],
    slots: ['Lunch', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: false, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: true,
        protein_rich: true
    }
  },

  // 3. DINNER (Karnataka - Light)
  {
    id: 'ka_dn_1',
    name: 'Wheat Rava (Dalia) Kitchadi with Beans and Carrots',
    region: ['Karnataka'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ka_dn_2',
    name: 'Majjige Huli (Buttermilk Kadhi) with 1 Roti',
    region: ['Karnataka'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Buttermilk
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true      // Yogurt protein
    }
  },
  {
    id: 'ka_dn_3',
    name: 'Ragi Ambari (Savory Ragi Malt)',
    region: ['Karnataka'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Often mixed with buttermilk
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },

  // 4. SNACKS (Karnataka)
  {
    id: 'ka_sn_1',
    name: 'Heerekayi (Ridge Gourd) Peel Chutney with 1 Idli',
    region: ['Karnataka'],
    slots: ['Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Chutney is spicy
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ka_sn_2',
    name: 'Avalakki (Poha) with Sprouts',
    region: ['Karnataka'],
    slots: ['Snack'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'ka_sn_3',
    name: 'Girmit (North Karnataka style Puffed Rice - Low Oil)',
    region: ['Karnataka'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Girmit is spicy
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ka_sn_4',
    name: 'Roasted Groundnuts (Small portion)',
    region: ['Karnataka'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Peanuts = High Potassium/Phosphorus
        protein_rich: true
    }
  },
  // NEW ADDITION: High Protein Snack
  {
    id: 'ka_sn_5',
    name: 'Kosambari (Moong Dal Salad)',
    region: ['Karnataka'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },

  // ==========================================
  // REGION 4: ANDHRA PRADESH & TELANGANA (7-Day Variety)
  // ==========================================

  // 1. BREAKFAST (Andhra/Telangana)
  {
    id: 'ap_bf_1',
    name: 'Pesarattu (Whole Green Moong Dosa) with Allam (Ginger) Chutney',
    region: ['Andhra'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Ginger chutney is zesty
        renal_safe: true,       // Green Moong is safer than black dal
        protein_rich: true
    }
  },
  {
    id: 'ap_bf_2',
    name: 'Dibba Rotti (Minapa Rotti - Slow Cooked)',
    region: ['Andhra'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true      // Urad dal heavy
    }
  },
  {
    id: 'ap_bf_3',
    name: 'Jonna (Jowar) Pelala Pelu (Sorghum Flakes Upma)',
    region: ['Andhra'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ap_bf_4',
    name: 'Uggani (Spiced Puffed Rice) with Roasted Chana Powder',
    region: ['Andhra'],
    slots: ['Breakfast', 'Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Green chillies usually used
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ap_bf_5',
    name: 'Upma Pesarattu (MLA Pesarattu - Small Portion Upma)',
    region: ['Andhra'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: false, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: false,        // Upma inside usually has Ghee
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },

  // 2. LUNCH (Andhra/Telangana)
  {
    id: 'ap_ln_1',
    name: 'Gongura Pappu (Sorrel Leaves Dal) + Brown Rice + Dondakaya Fry',
    region: ['Andhra'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Andhra Dal is spicy
        renal_safe: false,      // Gongura is Very High Potassium/Oxalate
        protein_rich: true
    }
  },
  {
    id: 'ap_ln_2',
    name: 'Jonna Jonnalu (Whole Jowar Grain Rice) + Tomato Charu',
    region: ['Andhra'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Charu implies spice/pepper
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ap_ln_3',
    name: 'Muddapappu (Thick Dal) + Avakaya (Small portion) + Rice + Ghee',
    region: ['Andhra'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Ghee
        contains_dairy: true,
        is_spicy: true,         // Avakaya is very spicy
        renal_safe: false,      // Avakaya (Salt) + Dal (Potassium)
        protein_rich: true
    }
  },
  {
    id: 'ap_ln_4',
    name: 'Pachi Pulusu (Raw Tamarind Stew) + Sajje (Bajra) Sankati',
    region: ['Andhra'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Green chillies/Onions
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ap_ln_5',
    name: 'Menthi Akura Pappu (Fenugreek Leaf Dal) + 1 Multigrain Roti',
    region: ['Andhra'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Fenugreek leaves = High Potassium
        protein_rich: true
    }
  },
  // NEW ADDITION: Non-Veg Specialty
  {
    id: 'ap_ln_6',
    name: 'Natukodi Pulusu (Country Chicken Curry) + Jonna Sankati',
    region: ['Andhra'],
    slots: ['Lunch', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: false, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,
        contains_dairy: false,
        is_spicy: true,         // Very Spicy usually
        renal_safe: true,
        protein_rich: true
    }
  },

  // 3. DINNER (Andhra/Telangana - Light)
  {
    id: 'ap_dn_1',
    name: 'Korralu (Foxtail Millet) Kichadi with Ginger & Veggies',
    region: ['Andhra'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ap_dn_2',
    name: 'Oats Idli with Karappodi (Spice Powder)',
    region: ['Andhra'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Karappodi is spicy
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ap_dn_3',
    name: 'Aratikaaya (Raw Banana) Soup + 1 Phulka',
    region: ['Andhra'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Raw Banana = High Potassium
        protein_rich: false
    }
  },

  // 4. SNACKS (Andhra/Telangana)
  {
    id: 'ap_sn_1',
    name: 'Guggillu (Spiced Boiled Black Chickpeas/Chana)',
    region: ['Andhra'],
    slots: ['Snack'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: false,      // Black Chana = High Potassium
        protein_rich: true
    }
  },
  {
    id: 'ap_sn_2',
    name: 'Pappu Chekkalu (Baked version - 2 pieces)',
    region: ['Andhra'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ap_sn_3',
    name: 'Spiced Corn (Mokkajonna) - Roasted',
    region: ['Andhra'],
    slots: ['Snack'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ap_sn_4',
    name: 'Tender Coconut Water with Pulp',
    region: ['Andhra', 'General'],
    slots: ['Snack'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // WARNING: Extremely High Potassium
        protein_rich: false
    }
  },
  // NEW ADDITION: Fish Snack
  {
    id: 'ap_sn_5',
    name: 'Chepala Vepudu (Shallow Fried Fish) - 1 Piece',
    region: ['Andhra'],
    slots: ['Snack'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: false, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: true,
        protein_rich: true
    }
  },


  // ==========================================
  // REGION 5: MAHARASHTRA DATABASE (7-Day Variety)
  // ==========================================

  // 1. BREAKFAST (Maharashtra)
  {
    id: 'mh_bf_1',
    name: 'Thalipeeth (Multigrain Pancake) with White Butter/Curd',
    region: ['Maharashtra'],
    slots: ['Breakfast', 'Snack'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Butter/Curd
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,       // Grains are generally okay
        protein_rich: false
    }
  },
  {
    id: 'mh_bf_2',
    name: 'Kanda Poha with Sprouted Moong',
    region: ['Maharashtra'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true      // Sprouts add protein
    }
  },
  {
    id: 'mh_bf_3',
    name: 'Moong Dal Idli / Amboli with Coconut-Garlic Chutney',
    region: ['Maharashtra'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Garlic chutney can be spicy
        renal_safe: false,      // Coconut chutney = High Potassium
        protein_rich: true
    }
  },
  {
    id: 'mh_bf_4',
    name: 'Upma (Sajgura - Bajra Rava) with Mixed Vegetables',
    region: ['Maharashtra'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'mh_bf_5',
    name: 'Dashmi (Spiced Whole Wheat & Gram Flour Roti) + Curd',
    region: ['Maharashtra'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Milk often used in dough + Curd side
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  // NEW ADDITION: High Protein Breakfast
  {
    id: 'mh_bf_6',
    name: 'Misal Pav (Sprouted Moth Beans) - Low Oil/Spice Version',
    region: ['Maharashtra'],
    slots: ['Breakfast', 'Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: false,     // Pav implies wheat/maida
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Even low spice Misal has heat
        renal_safe: true,
        protein_rich: true
    }
  },

  // 2. LUNCH (Maharashtra)
  {
    id: 'mh_ln_1',
    name: 'Jowar Bhakri + Methi Chi Patal Bhaji (Spinach/Fenugreek Stew)',
    region: ['Maharashtra'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Leafy Greens = Very High Potassium
        protein_rich: false
    }
  },
  {
    id: 'mh_ln_2',
    name: 'Bajra Bhakri + Matki Usal (Sprouted Moth Beans)',
    region: ['Maharashtra'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Goda masala is spicy
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'mh_ln_3',
    name: 'Varun-Bhaat (Brown Rice) + Toor Dal + Dodka (Ridge Gourd) Bhaji',
    region: ['Maharashtra'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Ghee on Varun Bhaat is standard
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'mh_ln_4',
    name: 'Pithla (Gram Flour Stew) + Small portion Bhakri + Thecha (Green Chilli)',
    region: ['Maharashtra'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Thecha is EXTREMELY spicy
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'mh_ln_5',
    name: 'Masale Bhaat (Using Brown Rice / Dalia) + Mixed Veggies',
    region: ['Maharashtra'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: true,
        protein_rich: false
    }
  },
  // NEW ADDITION: Malvani Non-Veg
  {
    id: 'mh_ln_6',
    name: 'Malvani Chicken Curry (Spicy) + Jowar Bhakri',
    region: ['Maharashtra'],
    slots: ['Lunch', 'Dinner'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: false, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,
        contains_dairy: false,
        is_spicy: true,         // Very spicy
        renal_safe: false,      // Coconut base usually used in Malvani curry
        protein_rich: true
    }
  },

  // 3. DINNER (Maharashtra - Light)
  {
    id: 'mh_dn_1',
    name: 'Moong Dal Khichdi (Plain/Vegetable) + Roasted Papad',
    region: ['Maharashtra'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Ghee is essential for Khichdi digestion
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'mh_dn_2',
    name: 'Multigrain Chapati + Bharli Vangi (Stuffed Eggplant - Low Oil)',
    region: ['Maharashtra'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Goda masala makes it spicy
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'mh_dn_3',
    name: 'Kadhi (Buttermilk based) + 1 Multigrain Phulka',
    region: ['Maharashtra'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Buttermilk
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },

  // 4. SNACKS (Maharashtra)
  {
    id: 'mh_sn_1',
    name: 'Koshimbir (Cucumber & Peanut Salad)',
    region: ['Maharashtra'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Peanuts = High Potassium
        protein_rich: true
    }
  },
  {
    id: 'mh_sn_2',
    name: 'Bhajani Chakli (Air Fried / Baked - 2 pieces)',
    region: ['Maharashtra'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: false, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Spicy dough
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'mh_sn_3',
    name: 'Roasted Rajgira (Amaranth) Ladoo (No Sugar - Jaggery used)',
    region: ['Maharashtra'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'mh_sn_4',
    name: 'Sol Kadhi (Kokum & Coconut Milk Drink)',
    region: ['Maharashtra', 'General'],
    slots: ['Snack'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Green chilli/garlic paste used
        renal_safe: false,      // Coconut Milk = High Potassium
        protein_rich: false
    }
  },


  // ==========================================
  // REGION 6: GUJARAT DATABASE (7-Day Variety)
  // ==========================================

  // 1. BREAKFAST (Gujarat)
  {
    id: 'gj_bf_1',
    name: 'Methi Thepla (Multigrain) with Plain Curd',
    region: ['Gujarat'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Curd side dish
        contains_dairy: true,
        is_spicy: false,
        renal_safe: false,      // Methi (Fenugreek leaves) = High Potassium
        protein_rich: false
    }
  },
  {
    id: 'gj_bf_2',
    name: 'Khaman Dhokla (Steamed Besan) - No Sugar Tadka',
    region: ['Gujarat'],
    slots: ['Breakfast', 'Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,         // Khaman is usually Besan + Citric Acid (Lemon)
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Besan is moderate, steamed is good
        protein_rich: true      // Chickpea flour
    }
  },
  {
    id: 'gj_bf_3',
    name: 'Mixed Dal Handvo (Baked Savory Cake) with Veggies',
    region: ['Gujarat'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Fermented with Curd usually
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true      // Mixed Dals
    }
  },
  {
    id: 'gj_bf_4',
    name: 'Fafda (Baked version) with Papaya Sambharo',
    region: ['Gujarat'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Sambharo has chillies/mustard
        renal_safe: true,
        protein_rich: true      // Besan
    }
  },
  {
    id: 'gj_bf_5',
    name: 'Bajra Na Rotla with Garlic Chutney',
    region: ['Gujarat'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Garlic chutney is hot
        renal_safe: false,      // Bajra (Pearl Millet) is high Phosphorus
        protein_rich: false
    }
  },

  // 2. LUNCH (Gujarat)
  {
    id: 'gj_ln_1',
    name: 'Gujarati Dal (No Sugar) + Brown Rice + Bhindi Sambhariya',
    region: ['Gujarat'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Bhindi is low potassium (if seeds removed or moderate)
        protein_rich: true
    }
  },
  {
    id: 'gj_ln_2',
    name: 'Vagharelo Bajra Rotlo (Crumbled Pearl Millet with Curd)',
    region: ['Gujarat'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Curd
        contains_dairy: true,
        is_spicy: false,
        renal_safe: false,      // Bajra
        protein_rich: true
    }
  },
  {
    id: 'gj_ln_3',
    name: 'Sev Tameta Nu Shaak (Low Salt) + 1 Multigrain Phulka',
    region: ['Gujarat'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Spicy/Tangy
        renal_safe: false,      // Tomatoes = Very High Potassium
        protein_rich: false
    }
  },
  {
    id: 'gj_ln_4',
    name: 'Panchmel Dal + Brown Rice + Ringan No Oro (Baingan Bharta)',
    region: ['Gujarat'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // 5 Dals = Heavy protein/potassium load
        protein_rich: true
    }
  },
  {
    id: 'gj_ln_5',
    name: 'Undhiyu (Steamed - Low Oil) - No Tals/Sugar',
    region: ['Gujarat'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Yam/Potato/Beans = High Potassium cocktail
        protein_rich: false
    }
  },
  // NEW ADDITION: High Protein Veg Curry
  {
    id: 'gj_ln_6',
    name: 'Soya Chunk & Peas Curry (Gujarati Style) + 2 Phulka',
    region: ['Gujarat'],
    slots: ['Lunch', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: true,
        protein_rich: true      // Soya is high protein
    }
  },

  // 3. DINNER (Gujarat - Light)
  {
    id: 'gj_dn_1',
    name: 'Vaghareli Khichdi (Moong Dal & Vegetables)',
    region: ['Gujarat'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Ghee tadka essential
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'gj_dn_2',
    name: 'Doodhi Nu Shaak (Bottle Gourd) + 1 Bajra Phulka',
    region: ['Gujarat'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Bottle gourd is safest renal veg
        protein_rich: false
    }
  },
  {
    id: 'gj_dn_3',
    name: 'Kadhi (Gujarati Style - Spicy/Sour) + 1 Thepla',
    region: ['Gujarat'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Buttermilk base
        contains_dairy: true,
        is_spicy: true,         // Green chillies/Ginger
        renal_safe: true,
        protein_rich: false
    }
  },

  // 4. SNACKS (Gujarat)
  {
    id: 'gj_sn_1',
    name: 'Khakhra (Whole Wheat/Millet) - Roasted',
    region: ['Gujarat'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'gj_sn_2',
    name: 'Steamed Muthiya (Bottle Gourd & Fenugreek)',
    region: ['Gujarat'],
    slots: ['Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Fenugreek (Methi) = High Potassium
        protein_rich: false
    }
  },
  {
    id: 'gj_sn_3',
    name: 'Masala Chaas (Spiced Buttermilk)',
    region: ['Gujarat', 'General'],
    slots: ['Snack'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Dairy
        contains_dairy: true,
        is_spicy: true,         // Spiced
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'gj_sn_4',
    name: 'Roasted Chana (Mamra)',
    region: ['Gujarat', 'General'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Whole Chana = High Potassium
        protein_rich: true
    }
  },
  // NEW ADDITION: Leafy Snack
  {
    id: 'gj_sn_5',
    name: 'Patra (Colocasia Leaves) - Steamed & Tempered (Low Oil)',
    region: ['Gujarat'],
    slots: ['Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false,     // Besan batter
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: false,      // Colocasia (Arbi) leaves = High Potassium
        protein_rich: false
    }
  },

  // ==========================================
  // REGION 7: WEST BENGAL & EAST INDIA (7-Day Variety)
  // ==========================================

  // 1. BREAKFAST (East India)
  {
    id: 'ei_bf_1',
    name: 'Chirer Poha (Flattened Rice) with Veggies & Peanuts',
    region: ['East India'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Peanuts = High Potassium
        protein_rich: true      // Peanuts
    }
  },
  {
    id: 'ei_bf_2',
    name: 'Dalia Khichuri with Mixed Vegetables',
    region: ['East India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Ghee tadka
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'ei_bf_3',
    name: 'Sattu Ka Paratha (Baked/Dry) with Baingan Bharta',
    region: ['East India'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Bharta is spicy
        renal_safe: true,
        protein_rich: true      // Sattu is high protein
    }
  },
  {
    id: 'ei_bf_4',
    name: 'Koraishutir (Peas) Kochuri - Baked version',
    region: ['East India'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: false, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Ginger/Green chilli filling
        renal_safe: true,
        protein_rich: true      // Peas
    }
  },
  {
    id: 'ei_bf_5',
    name: 'Muri (Puffed Rice) with Sprouted Moong & Coconut',
    region: ['East India'],
    slots: ['Breakfast', 'Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Coconut + Sprouts = High Potassium
        protein_rich: true
    }
  },

  // 2. LUNCH (East India)
  {
    id: 'ei_ln_1',
    name: 'Brown Rice + Machher Jhol (Light Fish Stew with Veggies)',
    region: ['East India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: false, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Light stew is good
        protein_rich: true
    }
  },
  {
    id: 'ei_ln_2',
    name: 'Dalia + Dalma (Odisha style Lentils with Vegetables)',
    region: ['East India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Ghee/Coconut often added
        contains_dairy: true,
        is_spicy: false,
        renal_safe: false,      // Dalma uses Raw Banana/Yam/Papaya (High K mix)
        protein_rich: true
    }
  },
  {
    id: 'ei_ln_3',
    name: 'Lau Ghonto (Bottle Gourd) + Rice + Musur Dal',
    region: ['East India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Bottle gourd is excellent
        protein_rich: true
    }
  },
  {
    id: 'ei_ln_4',
    name: 'Shukto (Bitter Mixed Veg) + 1 Multigrain Roti',
    region: ['East India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Milk/Ghee used in gravy
        contains_dairy: true,
        is_spicy: false,
        renal_safe: false,      // Sweet potato/Plantain/Drumstick often used
        protein_rich: false
    }
  },
  {
    id: 'ei_ln_5',
    name: 'Posto (Poppy Seed) Bora (Baked) + Red Rice + Biulir Dal',
    region: ['East India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: false, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Poppy seeds = High Phosphorus
        protein_rich: true
    }
  },
  // NEW ADDITION: North East Influence
  {
    id: 'ei_ln_6',
    name: 'Bamboo Shoot Curry (Sour) + Steam Rice',
    region: ['East India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: false,      // Bamboo shoots = High Potassium
        protein_rich: false
    }
  },

  // 3. DINNER (East India - Light)
  {
    id: 'ei_dn_1',
    name: 'Potoler (Pointed Gourd) Dorma - Steamed + 1 Phulka',
    region: ['East India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Paneer/Chenna stuffing
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'ei_dn_2',
    name: 'Vegetable Stew (Bengali Style) with 1 Slice Multigrain Toast',
    region: ['East India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Butter/Milk often added
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ei_dn_3',
    name: 'Chhanar Dalna (Homemade Paneer/Chenna) - No Potato',
    region: ['East India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Chenna is Dairy
        contains_dairy: true,
        is_spicy: true,         // Garam masala used
        renal_safe: true,
        protein_rich: true
    }
  },
  // NEW ADDITION: Bihar Influence (Healthy Dinner)
  {
    id: 'ei_dn_4',
    name: 'Litti (Baked Whole Wheat Balls) + Baingan Chokha (No Ghee Dip)',
    region: ['East India'],
    slots: ['Dinner', 'Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,         // If Ghee dip avoided
        contains_dairy: false,
        is_spicy: true,         // Chokha has green chillies
        renal_safe: true,
        protein_rich: true      // Sattu stuffing
    }
  },

  // 4. SNACKS (East India)
  {
    id: 'ei_sn_1',
    name: 'Jhal Muri (No Oil, extra Sprouts)',
    region: ['East India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // 'Jhal' means spicy
        renal_safe: false,      // Sprouts/Coconut slices = High Potassium
        protein_rich: true
    }
  },
  {
    id: 'ei_sn_2',
    name: 'Sattu Drink (Savory with Jeera and Black Salt)',
    region: ['East India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Sattu is generally okay
        protein_rich: true
    }
  },
  {
    id: 'ei_sn_3',
    name: 'Baked Nimki (Whole Wheat - 2 pieces)',
    region: ['East India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: false, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: false,        // Ghee in dough
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'ei_sn_4',
    name: 'Ghugni (Yellow Peas Curry) - Small Bowl',
    region: ['East India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Spicy curry
        renal_safe: false,      // Dried peas = High Phosphorus/Potassium
        protein_rich: true
    }
  },

  /// ==========================================
  // REGION 8: NORTH INDIA DATABASE (7-Day Variety)
  // ==========================================

  // 1. BREAKFAST (North India)
  {
    id: 'ni_bf_1',
    name: 'Missi Roti (Wheat + Besan) with Plain Curd',
    region: ['North India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Curd
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,       // Besan/Wheat generally okay
        protein_rich: true      // Besan adds protein
    }
  },
  {
    id: 'ni_bf_2',
    name: 'Vegetable Daliya (Broken Wheat) with Moong Dal',
    region: ['North India'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true      // Moong dal
    }
  },
  {
    id: 'ni_bf_3',
    name: 'Paneer Bhurji (Low Fat) with 1 Multigrain Phulka',
    region: ['North India'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Paneer
        contains_dairy: true,
        is_spicy: true,         // Green chillies
        renal_safe: true,       // Paneer is lower phosphorus than dal
        protein_rich: true
    }
  },
  {
    id: 'ni_bf_4',
    name: 'Moong Dal Chilla with Mint-Coriander Chutney',
    region: ['North India'],
    slots: ['Breakfast', 'Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Moong is safest dal
        protein_rich: true
    }
  },
  {
    id: 'ni_bf_5',
    name: 'Stuffed Gobi/Mooli Paratha (Tandoori/Dry) + 1 cup Curd',
    region: ['North India'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: false, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: false,        // Curd
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,       // Cauliflower/Radish are okay leached
        protein_rich: false
    }
  },

  // 2. LUNCH (North India)
  {
    id: 'ni_ln_1',
    name: 'Baingan Bharta + 2 Multigrain Rotis + Boondi Raita',
    region: ['North India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Raita
        contains_dairy: true,
        is_spicy: true,         // Bharta is spicy
        renal_safe: true,       // Eggplant is excellent for renal
        protein_rich: false
    }
  },
  {
    id: 'ni_ln_2',
    name: 'Sarson Ka Saag (No Makhan) + 1 small Makki Roti',
    region: ['North India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Saag usually cooked with Ghee
        contains_dairy: true,
        is_spicy: false,
        renal_safe: false,      // Mustard Greens = High Potassium
        protein_rich: false
    }
  },
  {
    id: 'ni_ln_3',
    name: 'Rajma (Kidney Beans) + Brown Rice + Cucumber Salad',
    region: ['North India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Rajma masala
        renal_safe: false,      // Kidney Beans = High Phosphorus/Potassium
        protein_rich: true
    }
  },
  {
    id: 'ni_ln_4',
    name: 'Lauki (Bottle Gourd) Kofta Curry (Steamed) + 1 Phulka',
    region: ['North India'],
    slots: ['Lunch', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Kofta often uses paneer/khoya binding
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,       // Lauki is safest
        protein_rich: false
    }
  },
  {
    id: 'ni_ln_5',
    name: 'Yellow Moong Dal Tadka + 1 Multigrain Roti + Bhindi Do Pyaza',
    region: ['North India'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Ghee tadka
        contains_dairy: true,
        is_spicy: true,         // Bhindi Do Pyaza is spicy
        renal_safe: true,
        protein_rich: true
    }
  },
  // NEW ADDITION: Home-style Chicken Curry
  {
    id: 'ni_ln_6',
    name: 'Chicken Curry (Home Style/Low Oil) + 2 Phulka',
    region: ['North India'],
    slots: ['Lunch', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: false, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: true,
        protein_rich: true
    }
  },

  // 3. DINNER (North India - Light)
  {
    id: 'ni_dn_1',
    name: 'Mix Veg Soup + 1 Besan Chilla',
    region: ['North India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'ni_dn_2',
    name: 'Tinda (Apple Gourd) Sabzi + 1 Oat-Wheat Phulka',
    region: ['North India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Tinda is excellent for renal
        protein_rich: false
    }
  },
  {
    id: 'ni_dn_3',
    name: 'Paneer Tikka (Grilled - 4 pieces) + Salad',
    region: ['North India'],
    slots: ['Dinner', 'Snack'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Paneer/Curd marinade
        contains_dairy: true,
        is_spicy: true,         // Marinade is spicy
        renal_safe: true,
        protein_rich: true
    }
  },
  // NEW ADDITION: Soya Pulao
  {
    id: 'ni_dn_4',
    name: 'Nutrela (Soya Chunks) Pulao with Raita',
    region: ['North India'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Raita
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },

  // 4. SNACKS (North India)
  {
    id: 'ni_sn_1',
    name: 'Roasted Makhana (Fox Nuts) with Black Pepper',
    region: ['North India', 'General'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Low sodium/potassium usually
        protein_rich: false
    }
  },
  {
    id: 'ni_sn_2',
    name: 'Spiced Buttermilk (Chaas) with Roasted Jeera',
    region: ['North India', 'General'],
    slots: ['Snack'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Dairy
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'ni_sn_3',
    name: 'Boiled Kala Chana (Black Chickpeas) Chaat',
    region: ['North India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,         // Chaat masala/chillies
        renal_safe: false,      // Black Chana = High Potassium
        protein_rich: true
    }
  },
  {
    id: 'ni_sn_4',
    name: 'Shakarkandi (Sweet Potato) Chaat - Steamed',
    region: ['North India'],
    slots: ['Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: true,
        renal_safe: false,      // Sweet potato = High Potassium
        protein_rich: false
    }
  },

  // ==========================================
  // REGION 9: GENERAL INDIAN / PAN-INDIA DATABASE
  // ==========================================

  // 1. BREAKFAST (General)
  {
    id: 'gen_bf_1',
    name: 'Masala Oats with Sautéed Vegetables',
    region: ['General'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,         // Usually oil based
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Oats are moderate, veggies depend but generally ok
        protein_rich: false
    }
    // Beta-glucan in oats is clinically proven to improve insulin response.
  },
  {
    id: 'gen_bf_2',
    name: 'Vegetable Poha with extra Peas and Carrots',
    region: ['General'],
    slots: ['Breakfast'],
    tags: { 
        texture: 'Soft', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Leached peas/carrots are ok
        protein_rich: false
    }
  },
  {
    id: 'gen_bf_3',
    name: 'Multigrain Porridge (Dalia/Lapsi) - Savory',
    region: ['General'],
    slots: ['Breakfast', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Often cooked with Ghee
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },
  {
    id: 'gen_bf_4',
    name: 'Sprouted Moong Salad with Lemon & Chaat Masala',
    region: ['General'],
    slots: ['Breakfast', 'Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: false,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Sprouts = High Potassium
        protein_rich: true
    }
  },

  // 2. LUNCH (General)
  {
    id: 'gen_ln_1',
    name: 'Quinoa Dal Khichdi with Spinach',
    region: ['General'],
    slots: ['Lunch', 'Dinner'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Ghee
        contains_dairy: true,
        is_spicy: false,
        renal_safe: false,      // Spinach = High Potassium
        protein_rich: true      // Quinoa + Dal
    }
    // Quinoa is a complete protein and has a much lower GI than white rice.
  },
  {
    id: 'gen_ln_2',
    name: '2 Phulka + Mixed Vegetable Sabzi + Boiled Dal',
    region: ['General'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Medium', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,         // Assuming oil for sabzi
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true      // Dal
    }
  },
  {
    id: 'gen_ln_3',
    name: 'Grilled Chicken/Paneer Salad with Chickpeas',
    region: ['General'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: false,             // Chicken option
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Chicken/Paneer
        contains_dairy: true,   // Paneer
        is_spicy: false,
        renal_safe: true,       // Meat proteins often lower K than legumes
        protein_rich: true
    }
  },
  {
    id: 'gen_ln_4',
    name: 'Millet Curd Rice with Grilled Vegetables',
    region: ['General'],
    slots: ['Lunch'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Curd
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: false
    }
  },

  // 3. DINNER (General - Light)
  {
    id: 'gen_dn_1',
    name: 'Clear Vegetable Soup + 1 slice Multigrain Bread',
    region: ['General'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Leached veggies in soup
        protein_rich: false
    }
  },
  {
    id: 'gen_dn_2',
    name: 'Stir-fried Tofu/Paneer with Broccoli and Bell Peppers',
    region: ['General'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Regular', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Paneer listed
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,
        protein_rich: true
    }
  },
  {
    id: 'gen_dn_3',
    name: 'Steamed Sprouts with Black Salt and Jeera',
    region: ['General'],
    slots: ['Dinner', 'Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Sprouts = High Potassium
        protein_rich: true
    }
  },
  // NEW ADDITION: Comfort Meal
  {
    id: 'gen_dn_4',
    name: 'Tomato & Basil Soup + Grilled Mushroom on Toast',
    region: ['General'],
    slots: ['Dinner'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: false, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Tomato = High Potassium
        protein_rich: false
    }
  },

  // 4. SNACKS (General)
  {
    id: 'gen_sn_1',
    name: 'Roasted Pumpkin Seeds & Sunflower Seeds (1 tbsp)',
    region: ['General'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Seeds = High Phos/Potassium
        protein_rich: true
    }
    // Rich in Magnesium, which helps in glucose metabolism.
  },
  {
    id: 'gen_sn_2',
    name: '1 Small Apple / Pear with Cinnamon powder',
    region: ['General'],
    slots: ['Snack'],
    tags: { 
        texture: 'Crunchy', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: true,       // Apple/Pear low K
        protein_rich: false
    }
    // Cinnamon helps improve insulin sensitivity.
  },
  {
    id: 'gen_sn_3',
    name: 'Greek Yogurt / Thick Curd with Flax Seeds',
    region: ['General'],
    slots: ['Snack'],
    tags: { 
        texture: 'Soft', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: false,        // Dairy
        contains_dairy: true,
        is_spicy: false,
        renal_safe: true,       // Yogurt better than milk
        protein_rich: true
    }
  },
  // NEW ADDITION: Smoothie
  {
    id: 'gen_sn_4',
    name: 'Green Smoothie (Spinach + Cucumber + Lemon + Ginger)',
    region: ['General'],
    slots: ['Snack', 'Breakfast'],
    tags: { 
        texture: 'Liquid', 
        gi: 'Low', 
        veg: true, 
        gluten_free: true, 
        weight_loss_friendly: true, 
        elderly_friendly: true,
        // NEW FLAGS
        is_vegan: true,
        contains_dairy: false,
        is_spicy: false,
        renal_safe: false,      // Raw Spinach = Extreme Oxalate/Potassium
        protein_rich: false
    }
  }
];