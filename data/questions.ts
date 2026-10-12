// data/questions.ts


//===============4/10/26================
// data/questions.ts

export type QuestionType = 'text' | 'number' | 'select' | 'radio' | 'textarea' | 'time' | 'file' | 'checkbox' | 'info';

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  required?: boolean;
  options?: string[];
  unitOptions?: string[];
  placeholder?: string;
  dependsOn?: {
    id: string;
    values: (string | number | boolean)[];
  };
}

export interface Section {
  id: string;
  title: string;
  description?: string; 
  dependsOn?: {
    id: string;
    values: (string | number | boolean)[];
  };
  questions: Question[];
}

export const questionnaire: Section[] = [
  // --- 1. BASIC PROFILE ---
  {
    id: "section_1",
    title: "1. Let's start with the basics",
    description: "Help us understand your general profile so we can personalize your experience.",
    questions: [
      { id: "age", label: "How old are you? (in years)", type: "number", placeholder: "e.g., 35", required: true },
      { id: "gender", label: "How do you identify?", type: "radio", options: ["Male", "Female", "Other"], required: true },
      {
        id: "state",
        label: "Which Indian state or region do you currently live in?",
        type: "select", // KEPT AS SELECT: Too many options for radio tiles
        options: [
          "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
          "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
          "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
          "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
          "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
          "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
          "West Bengal", "Other Indian State/UT", "Outside India"
        ],
        required: true
      },
      { id: "diet_type", label: "What type of diet do you typically follow?", type: "radio", options: ["Vegetarian (no eggs)", "Eggetarian (Vegetarian + Eggs)", "Non-vegetarian", "Vegan"], required: true },
      { 
        id: "height", 
        label: "What is your height?", 
        type: "number", 
        unitOptions: ["cm", "ft"], // Renders the toggle
        placeholder: "e.g., 165 or 5.8", 
        required: true 
      },
      { 
        id: "weight", 
        label: "What is your current weight?", 
        type: "number", 
        unitOptions: ["kg", "lbs"], // Renders the toggle
        placeholder: "e.g., 70", 
        required: true 
      }
    ]
  },

// --- 2. DIABETES & MEDICAL HISTORY ---
  {
    id: "section_2",
    title: "2. Clinical & Medical History",
    description: "This helps us understand your body's specific metabolic needs.",
    questions: [
      {
        id: "has_lab_report",
        label: "Do you have recent blood test reports handy?",
        type: "radio",
        options: ["Yes, I have them", "No, I don't know my values right now"],
        required: true
      },

      {
        id: "lab_report_file",
        label: "Upload your lab report (Optional)",
        type: "file",
        dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
      },
      {
        id: "no_report_disclaimer",
        label: "Tip: We highly recommend getting a routine blood test for accurate clinical tracking. Without reports, your plan will focus purely on general lifestyle and dietary improvements.",
        type: "info",
        dependsOn: { id: "has_lab_report", values: ["No, I don't know my values right now"] }
      },
      {
        id: "no_report_ack",
        label: "Acknowledgment",
        type: "checkbox",
        options: ["I understand, let's proceed"],
        dependsOn: { id: "has_lab_report", values: ["No, I don't know my values right now"] },
        required: true
      },
      {
        id: "diabetes_type",
        label: "What is your current diabetes diagnosis?",
        type: "radio",
        options: ["None / I do not have diabetes", "Pre-diabetes", "Type 2 diabetes", "Type 1 diabetes", "Gestational diabetes"],
        dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] },
        required: true
      },
      {
        id: "years_since_diagnosis",
        label: "How many years has it been since you were diagnosed?",
        type: "number",
        placeholder: "e.g., 2",
        dependsOn: { id: "diabetes_type", values: ["Type 2 diabetes", "Type 1 diabetes", "Pre-diabetes", "Gestational diabetes"] }
      },
      {
        id: "life_event_trigger",
        label: "Did a major life event happen 1 to 2 years before your diagnosis or weight gain?",
        type: "radio",
        options: [
          "No, life was relatively stable",
          "Yes, grief or loss of a loved one",
          "Yes, financial crisis or job loss",
          "Yes, major accident or surgery",
          "Yes, marriage or childbirth",
          "Yes, heavy caregiving duties"
        ],
        dependsOn: { id: "diabetes_type", values: ["Type 2 diabetes", "Type 1 diabetes", "Pre-diabetes", "Gestational diabetes"] }
      },
      {
        id: "family_history",
        label: "Is there a history of diabetes in your immediate family?",
        type: "radio",
        options: ["No family history", "One parent or sibling", "Multiple immediate family members"],
        required: true
      },
      {
        id: "current_medications",
        label: "Are you currently on any diabetes treatments? (Select all that apply)",
        type: "checkbox",
        options: [
          "None",
          "Diet & Lifestyle only",
          "Tablets (Allopathic)",
          "Insulin injections",
          "Ayurveda",
          "Yoga & Naturopathy",
          "Unani",
          "Siddha",
          "Homoeopathy",
          "Other"
        ],
        dependsOn: { id: "diabetes_type", values: ["Type 2 diabetes", "Type 1 diabetes", "Pre-diabetes", "Gestational diabetes"] }
      },
      { id: "has_bp", label: "Do you experience Blood Pressure issues?", type: "radio", options: ["Yes, High BP", "Yes, Low BP", "No, it's normal", "Not sure, need to get checked"], required: true },
      { id: "has_cholesterol", label: "Do you have High Cholesterol?", type: "radio", options: ["Yes", "No", "Not sure, need to get checked"], required: true },
      { id: "has_heart_issue", label: "Do you have any diagnosed Heart conditions?", type: "radio", options: ["Yes", "No", "Not sure, need to get checked"], required: true },
      { id: "has_thyroid", label: "Do you have Thyroid issues?", type: "radio", options: ["Yes, Hypothyroidism (Underactive)", "Yes, Hyperthyroidism (Overactive)", "No", "Not sure, need to get checked"], required: true },
      {
        id: "report_date",
        label: "How recent are your lab results?",
        type: "radio",
        options: ["Recent (Within the last 3 months)", "Older (3 to 12 months ago)"],
        dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] },
        required: true
      },
      {
        id: "lab_hba1c",
        label: "What is your HbA1c? (%)",
        type: "number",
        placeholder: "e.g., 6.5",
        dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] },
        required: true
      },
      {
        id: "lab_fbs",
        label: "Fasting Blood Sugar (FBS) in mg/dL",
        type: "number",
        placeholder: "e.g., 110",
        dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
      },
      {
        id: "lab_pp",
        label: "Post-Meal Blood Sugar (PP) in mg/dL",
        type: "number",
        placeholder: "e.g., 160",
        dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
      },
      {
        id: "lab_vit_d3",
        label: "Vitamin D3 in ng/mL (Optional)",
        type: "number",
        placeholder: "e.g., 30",
        dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
      },
      {
        id: "lab_vit_b12",
        label: "Vitamin B12 in pg/mL (Optional)",
        type: "number",
        placeholder: "e.g., 400",
        dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
      },
      {
        id: "vitamin_d_supplement",
        label: "Are you currently taking Vitamin D supplements?",
        type: "radio",
        options: ["Yes, as prescribed by my doctor", "Yes, occasionally", "No, I am not"]
      }
    ]
  },

  // --- 3. FEMALE HORMONAL HEALTH ---
  {
    id: "section_3",
    title: "3. Female Hormonal Health",
    description: "Hormonal shifts strongly influence metabolism, weight, and blood sugar levels.",
    dependsOn: { id: "gender", values: ["Female"] },
    questions: [
      {
        id: "menstrual_status",
        label: "Which of the following best describes your current menstrual cycle?",
        type: "radio",
        options: [
          "Regular periods",
          "Irregular / Missed periods",
          "Perimenopause (Transitioning phase)",
          "Menopause (No periods for 12+ months)",
          "Hysterectomy (Uterus removed)"
        ]
      },
      {
        id: "pcos_history",
        label: "Have you ever been diagnosed with PCOS or PCOD?",
        type: "radio",
        options: ["Yes", "No"]
      },
      {
        id: "menopause_symptoms",
        label: "Do you frequently experience hot flashes, night sweats, or severe mood swings?",
        type: "radio",
        options: ["Yes, quite frequently", "Sometimes", "No / Not applicable"],
        dependsOn: {
          id: "menstrual_status",
          values: ["Perimenopause (Transitioning phase)", "Menopause (No periods for 12+ months)", "Hysterectomy (Uterus removed)"]
        }
      }
    ]
  },
  
  // --- 4. DIGESTION & GUT HEALTH ---
  {
    id: "section_4",
    title: "4. Digestion & Gut Health",
    description: "Your gut health provides vital clues about inflammation, insulin sensitivity, and how well you absorb nutrients.",
    questions: [
      {
        id: "acidity_issues",
        label: "Do you frequently experience acidity, heartburn, or sour burps?",
        type: "radio",
        options: ["No", "Only after eating spicy or heavy food", "Often", "Almost every day"]
      },
      {
        id: "bloating_gas",
        label: "Do you feel bloated or unusually heavy after eating?",
        type: "radio",
        options: ["Rarely", "Sometimes", "Often in the evenings", "Almost after every meal"]
      },
      {
        id: "bowel_movement",
        label: "How would you describe your typical daily bowel movements?",
        type: "radio",
        options: [
          "Regular and comfortable",
          "Hard and constipated",
          "Often loose or watery",
          "It constantly switches between hard and loose"
        ]
      }
    ]
  },

  // --- 5. KITCHEN FACILITIES & PREP ---
  {
    id: "section_5",
    title: "5. Kitchen & Food Preparation",
    description: "Healthy eating starts in the kitchen. Tell us about how your meals are made and prepared.",
    questions: [
      {
        id: "who_cooks",
        label: "Who is primarily responsible for preparing your meals?",
        type: "radio",
        options: [
          "I cook for myself",
          "A family member cooks",
          "We have a cook or maid",
          "I eat at a mess or canteen",
          "I usually order in or eat at restaurants"
        ]
      },
      {
        id: "kitchen_type",
        label: "What kind of kitchen setup do you have access to?",
        type: "radio",
        options: [
          "Fully equipped kitchen",
          "Basic kitchen setup",
          "Just a microwave or kettle",
          "No kitchen access"
        ],
        dependsOn: { id: "who_cooks", values: ["I cook for myself", "A family member cooks"] }
      },
      {
        id: "cooking_time",
        label: "On a typical weekday, how much time is spent on cooking?",
        type: "radio",
        options: ["Under 10 minutes", "10 to 20 minutes", "20 to 40 minutes", "More than 40 minutes"],
        dependsOn: { id: "who_cooks", values: ["I cook for myself", "A family member cooks"] }
      },
      {
        id: "oil_base",
        label: "Which cooking oils are most frequently used for your meals? (Select all that apply)",
        type: "checkbox",
        options: [
          "Sunflower oil",
          "Groundnut oil",
          "Sesame oil",
          "Coconut oil",
          "Mustard oil",
          "Olive oil",
          "A mix of different oils"
        ],
        dependsOn: { id: "who_cooks", values: ["I cook for myself", "A family member cooks", "We have a cook or maid"] }
      },
      {
        id: "oil_processing",
        label: "Are the oils you use cold-pressed (kachi ghani) or refined?",
        type: "radio",
        options: ["Cold-pressed (Unrefined)", "Refined"],
        dependsOn: {
          id: "oil_base",
          values: ["Sunflower oil", "Groundnut oil", "Sesame oil", "Coconut oil", "Mustard oil", "Olive oil", "A mix of different oils"]
        }
      },
      {
        id: "cook_legumes",
        label: "Do you regularly cook whole legumes like rajma, chana, or whole dals?",
        type: "radio",
        options: ["Yes", "No"]
      },
      {
        id: "soak_grains",
        label: "How do you prepare these legumes before cooking?",
        type: "radio",
        options: [
          "I soak them overnight",
          "I soak them for a short time (1 to 2 hours)",
          "I cook them directly in a pressure cooker"
        ],
        dependsOn: { id: "cook_legumes", values: ["Yes"] }
      },
      {
        id: "consume_nuts",
        label: "Do you eat nuts and seeds like cashews, peanuts, walnuts, or chia seeds?",
        type: "radio",
        options: ["Yes", "No"]
      },
      {
        id: "nuts_prep",
        label: "How do you usually consume these nuts and seeds?",
        type: "radio",
        options: [
          "Raw and dry",
          "Dry roasted",
          "Roasted and salted",
          "Soaked in water"
        ],
        dependsOn: { id: "consume_nuts", values: ["Yes"] }
      },
      {
        id: "eat_almonds",
        label: "Do you specifically eat almonds?",
        type: "radio",
        options: ["Yes", "No"]
      },
      {
        id: "soak_almonds",
        label: "Do you soak your almonds in water before eating them?",
        type: "radio",
        options: ["Yes", "No"],
        dependsOn: { id: "eat_almonds", values: ["Yes"] }
      },
      {
        id: "peel_almonds",
        label: "Do you peel the skin off the soaked almonds before eating?",
        type: "radio",
        options: ["Yes", "No"],
        dependsOn: { id: "soak_almonds", values: ["Yes"] }
      }
    ]
  },

  // --- 6. FOOD PRACTICES & EATING OUT ---
  {
    id: "section_6",
    title: "6. Food Choices & Routine",
    description: "Let's map out your typical daily food choices, beverages, and meal schedule.",
    questions: [
      {
        id: "breakfast_time_actual",
        label: "What time do you usually eat breakfast?",
        type: "radio",
        options: [
          "Before 8:00 AM",
          "8:00 AM to 9:00 AM",
          "9:00 AM to 10:00 AM",
          "After 10:00 AM",
          "I usually skip breakfast"
        ]
      },
      {
        id: "lunch_time_actual",
        label: "What time do you usually eat lunch?",
        type: "radio",
        options: [
          "Before 1:00 PM",
          "1:00 PM to 2:00 PM",
          "2:00 PM to 3:00 PM",
          "After 3:00 PM"
        ]
      },
      {
        id: "dinner_time_actual",
        label: "What time do you usually eat dinner?",
        type: "radio",
        options: [
          "Before 7:00 PM",
          "7:00 PM to 8:00 PM",
          "8:00 PM to 9:00 PM",
          "9:00 PM to 10:00 PM",
          "After 10:00 PM"
        ]
      },
      {
        id: "high_carb_freq",
        label: "How often do you eat carbohydrate-rich foods like rice, roti, bread, or potatoes?",
        type: "radio",
        options: [
          "With every single meal",
          "Once or twice a day",
          "Rarely"
        ]
      },
      {
        id: "greens_intake",
        label: "How often do you include leafy greens or fresh vegetables in your meals?",
        type: "radio",
        options: [
          "Daily",
          "A few times a week",
          "Rarely"
        ]
      },
      {
        id: "veggie_storage",
        label: "How long do you usually store vegetables in the fridge before cooking them?",
        type: "radio",
        options: [
          "I buy and cook fresh daily",
          "2 to 3 days",
          "4 to 6 days",
          "More than a week"
        ]
      },
      {
        id: "hotel_freq",
        label: "How often do you take or order hotel/restaurant food?",
        type: "radio",
        options: [
          "Rarely or on special occasions",
          "Once a week",
          "2 to 3 times a week",
          "Daily or almost daily"
        ]
      },
      {
        id: "fried_general",
        label: "When eating out, do you often order oily or deep-fried items?",
        type: "radio",
        options: ["No, I usually avoid them", "Sometimes", "Yes, almost always"]
      },
      {
        id: "cold_drinks_carbonated",
        label: "How often do you consume cold carbonated drinks or sodas?",
        type: "radio",
        options: ["Never", "Occasionally", "A few times a week", "Daily"]
      },
      {
        id: "cold_drinks_juices",
        label: "How often do you consume fresh or packaged fruit juices?",
        type: "radio",
        options: ["Never", "Occasionally", "A few times a week", "Daily"]
      },
      {
        id: "hot_beverage_freq",
        label: "How many cups of tea or coffee do you drink in a day?",
        type: "radio",
        options: [
          "None",
          "1 to 2 cups",
          "3 cups",
          "More than 3 cups"
        ]
      },
      {
        id: "hot_beverage_exact",
        label: "Please enter the exact number of cups you drink daily:",
        type: "number",
        placeholder: "e.g., 5",
        dependsOn: { id: "hot_beverage_freq", values: ["More than 3 cups"] }
      },
      {
        id: "post_meal_caffeine",
        label: "Do you drink tea or coffee immediately after your meals?",
        type: "radio",
        options: ["No, never", "Sometimes", "Yes, it is a habit"]
      },
      {
        id: "bakery_snacks",
        label: "How often do you eat biscuits, cookies, or bakery items?",
        type: "radio",
        options: ["Never", "Occasionally", "Daily with tea or coffee"]
      },
      {
        id: "dessert_habit",
        label: "Do you usually order a sweet or dessert after your meal?",
        type: "radio",
        options: ["No", "Sometimes", "Yes, always"]
      }
    ]
  },

  // --- 7. EATING HABITS & HYDRATION ---
  {
    id: "section_7",
    title: "7. Eating Habits & Hydration",
    description: "The way you eat and hydrate strongly influences your blood sugar spikes and digestion.",
    questions: [
      {
        id: "meal_sequencing",
        label: "How do you usually start your main meals?",
        type: "radio",
        options: [
          "I eat salad or veggies first",
          "I start with protein like dal, egg, or paneer",
          "I mix everything together",
          "I start with the starchy part like rice or roti"
        ]
      },
      {
        id: "eating_speed",
        label: "How quickly do you usually finish your main meals?",
        type: "radio",
        options: [
          "Very fast (Under 10 minutes)",
          "Moderate pace (15 to 20 minutes)",
          "Slow and relaxed (More than 20 minutes)"
        ]
      },
      {
        id: "chewing_habit",
        label: "Do you consciously chew your food thoroughly?",
        type: "radio",
        options: [
          "Yes, I take my time",
          "Sometimes",
          "No, I tend to swallow or gulp quickly"
        ]
      },
      {
        id: "distracted_eating",
        label: "Do you typically watch TV, work on a laptop, or scroll on your phone while eating?",
        type: "radio",
        options: [
          "No, never",
          "Sometimes",
          "Yes, almost every meal"
        ]
      },
      {
        id: "satiety_cue",
        label: "When do you usually decide to stop eating?",
        type: "radio",
        options: [
          "When I feel light or about 80 percent full",
          "When I feel completely stuffed",
          "I tend to overeat until I feel heavy"
        ]
      },
      {
        id: "fruit_habit",
        label: "When do you typically eat fruits?",
        type: "radio",
        options: [
          "With my main meal",
          "As a mid-meal snack",
          "Immediately after a meal",
          "I rarely eat fruits"
        ]
      },
      {
        id: "fruit_portion",
        label: "What is your usual fruit portion size?",
        type: "radio",
        options: ["1 small piece or a handful", "1 large fruit or a medium bowl", "A very large bowl or multiple fruits"],
        dependsOn: { id: "fruit_habit", values: ["With my main meal", "As a mid-meal snack", "Immediately after a meal"] }
      },
      {
        id: "water_temperature", 
        label: "What temperature of water do you prefer drinking throughout the day?",
        type: "radio",
        options: [
          "Warm or hot water",
          "Room temperature / Matka water",
          "Chilled water from the fridge"
        ]
      },
      {
        id: "daily_hydration",
        label: "Total daily water intake (approximate)?",
        type: "radio",
        options: [
          "Low (Less than 1.5 Liters / 6 glasses)",
          "Average (1.5 to 2.5 Liters / 6-10 glasses)",
          "High (More than 2.5 Liters / 10+ glasses)"
        ]
      },
      {
        id: "snacking_freq",
        label: "How often do you snack between meals?",
        type: "radio",
        options: [
          "Rarely",
          "Sometimes when hungry",
          "Frequently as a habit",
          "I graze or munch all day"
        ]
      },
      {
        id: "snack_choices",
        label: "What do you usually reach for when you snack? (Select all that apply)",
        type: "checkbox",
        options: [
          "Fruits, nuts, or seeds",
          "Biscuits, cookies, or rusk",
          "Fried snacks like chips or namkeen",
          "Chocolates or sweets",
          "Other"
        ],
        dependsOn: { id: "snacking_freq", values: ["Sometimes when hungry", "Frequently as a habit", "I graze or munch all day"] }
      }
    ]
  },

// --- 8. DAILY ROUTINE & WORKLOAD ---
  {
    id: "section_8",
    title: "8. Daily Routine & Workload",
    description: "Your daily energy expenditure and stress levels at work significantly impact your glucose management.",
    questions: [
      {
        id: "occupation_role",
        label: "Which of the following best describes your typical daily role?",
        type: "radio",
        options: [
          "I work at an office desk",
          "I work from home",
          "My work involves physical movement or field visits",
          "I manage the house (Homemaker)",
          "I am retired",
          "I am a student"
        ]
      },
      {
        id: "stress_work",
        label: "How would you describe your current work environment?",
        type: "radio",
        options: ["Very relaxed", "Generally manageable", "Quite stressful", "Overwhelming / High Pressure"],
        dependsOn: {
          id: "occupation_role",
          values: ["I work at an office desk", "I work from home", "My work involves physical movement or field visits"]
        }
      },
      {
        id: "stress_home",
        label: "How stressful is managing the household on a daily basis?",
        type: "radio",
        options: ["Very relaxed", "Manageable", "Quite stressful", "Overwhelming"],
        dependsOn: { id: "occupation_role", values: ["I manage the house (Homemaker)"] }
      },
      {
        id: "homemaker_stress_source",
        label: "What contributes most to your household stress? (Select all that apply)",
        type: "checkbox",
        options: [
          "Heavy caregiving duties (children, elderly, or sick family members)",
          "Lack of domestic help or shared household responsibilities",
          "Financial constraints managing the household budget",
          "Constant mental load (planning meals, chores, and schedules)",
          "Lack of personal time or identity outside the home"
        ],
        dependsOn: { id: "stress_home", values: ["Quite stressful", "Overwhelming"] }
      },
      {
        id: "stress_student",
        label: "How would you rate your current academic stress levels?",
        type: "radio",
        options: ["Very relaxed", "Manageable", "Quite stressful", "Overwhelming"],
        dependsOn: { id: "occupation_role", values: ["I am a student"] }
      },
      {
        id: "stress_retired",
        label: "How would you rate your typical daily stress levels?",
        type: "radio",
        options: ["Very relaxed", "Manageable", "Quite stressful", "Overwhelming"],
        dependsOn: { id: "occupation_role", values: ["I am retired"] }
      },
      {
        id: "work_schedule",
        label: "What are your usual working hours?",
        type: "radio",
        options: [
          "Standard daytime hours",
          "Early morning shift",
          "Night shift",
          "My shifts change frequently (Rotating shifts)"
        ],
        dependsOn: {
          id: "occupation_role",
          values: ["I work at an office desk", "I work from home", "My work involves physical movement or field visits"]
        }
      },
      {
        id: "commute_method",
        label: "How do you usually travel to work or college?",
        type: "radio",
        options: [
          "I drive a car or ride a bike",
          "I take public transport (Train, Bus, Metro)",
          "I walk or cycle",
          "I use an office cab or school bus"
        ],
        dependsOn: {
          id: "occupation_role",
          values: ["I work at an office desk", "My work involves physical movement or field visits", "I am a student"]
        }
      }
    ]
  },

  // --- 9. SLEEP & RECOVERY ---
  {
    id: "section_9",
    title: "9. Sleep & Recovery",
    description: "Poor sleep is a direct trigger for insulin resistance. Let's look at your rest patterns.",
    questions: [
      {
        id: "bed_time",
        label: "What time do you usually go to bed?",
        type: "radio",
        options: [
          "Before 9 PM",
          "Between 9 PM and 10 PM",
          "Between 10 PM and 11 PM",
          "Between 11 PM and 12 AM",
          "Late night (After 12 AM)"
        ]
      },
      {
        id: "sleep_hours",
        label: "How many hours of actual sleep do you usually get?",
        type: "radio",
        options: ["Less than 5 hours", "5 to 6 hours", "6 to 7 hours", "7 to 8 hours", "More than 8 hours"]
      },
      {
        id: "sleep_quality",
        label: "How do you feel when you wake up in the morning?",
        type: "radio",
        options: [
          "Yes, completely refreshed",
          "I feel okay / Neutral",
          "No, I still feel tired",
          "I struggle to sleep well throughout the night"
        ]
      },
      {
        id: "wake_method",
        label: "Do you wake up naturally or do you rely on an alarm?",
        type: "radio",
        options: ["I wake up naturally", "I need an alarm clock to wake up"]
      },
      {
        id: "snoring_history",
        label: "Have you been told that you snore loudly?",
        type: "radio",
        options: ["Yes", "No"]
      },
      {
        id: "screen_use",
        label: "Do you use a mobile, laptop, or watch TV in the 30 minutes before sleep?",
        type: "radio",
        options: ["Rarely", "Sometimes", "Often", "Almost every night"]
      },
      {
        id: "racing_thoughts",
        label: "Do you find yourself worrying about tomorrow's tasks while trying to fall asleep?",
        type: "radio",
        options: ["Rarely", "Sometimes", "Almost every night"]
      },
      {
        id: "daytime_sleepiness",
        label: "Do you experience significant sleepiness or sluggishness during the day?",
        type: "radio",
        options: ["No, I stay energetic", "Only after lunch (Post-meal dip)", "Yes, throughout the day"]
      }
    ]
  },

  // --- 10. MOVEMENT & SUNLIGHT ---
  {
    id: "section_10",
    title: "10. Movement & Sunlight",
    description: "Physical activity and Vitamin D are highly effective at improving insulin resistance.",
    questions: [
      {
        id: "daily_activity",
        label: "How much dedicated walking or exercise do you do daily?",
        type: "radio",
        options: [
          "None",
          "Very light (Under 15 minutes)",
          "Light walking (15 to 30 minutes)",
          "Moderate walking (30 to 45 minutes)",
          "Active and intense (More than 45 minutes)"
        ]
      },
      {
        id: "walking_pace",
        label: "How would you describe your usual walking pace?",
        type: "radio",
        options: [
          "Casual strolling",
          "Brisk walking",
          "Fast jogging"
        ],
        dependsOn: {
          id: "daily_activity",
          values: [
            "Light walking (15 to 30 minutes)",
            "Moderate walking (30 to 45 minutes)",
            "Active and intense (More than 45 minutes)"
          ]
        }
      },
      {
        id: "practice_yoga",
        label: "Do you practice Yoga?",
        type: "radio",
        options: ["Yes", "No"]
      },
      {
        id: "yoga_frequency",
        label: "How often do you practice Yoga?",
        type: "radio",
        options: ["Daily", "A few times a week", "Rarely"],
        dependsOn: { id: "practice_yoga", values: ["Yes"] }
      },
      {
        id: "go_to_gym",
        label: "Do you go to a gym or lift weights?",
        type: "radio",
        options: ["Yes", "No"]
      },
      {
        id: "gym_frequency",
        label: "How often do you go to the gym or lift weights?",
        type: "radio",
        options: ["Daily", "A few times a week", "Rarely"],
        dependsOn: { id: "go_to_gym", values: ["Yes"] }
      },
      {
        id: "inactivity_reason",
        label: "What is the main reason that keeps you from being physically active?",
        type: "radio",
        options: [
          "I have physical pain or limitations",
          "My workload is too high",
          "I feel lazy or lack motivation",
          "I do not have enough time"
        ],
        dependsOn: { id: "daily_activity", values: ["None"] }
      },
      {
        id: "physical_limitations",
        label: "Could you specify the physical issue that stops you?",
        type: "radio",
        options: [
          "Knee or joint pain",
          "Back pain",
          "Foot pain or numbness",
          "Shortness of breath",
          "Other"
        ],
        dependsOn: { id: "inactivity_reason", values: ["I have physical pain or limitations"] }
      },
      {
        id: "other_limitation_details",
        label: "Please briefly describe your physical limitation:",
        type: "text",
        dependsOn: { id: "physical_limitations", values: ["Other"] }
      },
      {
        id: "sunlight_exposure",
        label: "Do you get a chance to expose yourself to direct sunlight everyday?",
        type: "radio",
        options: [
          "Yes, almost daily",
          "A few times a week",
          "Rarely",
          "No, I stay indoors"
        ]
      }
    ]
  },

// --- 11. EMOTIONAL WELL-BEING & CHRONIC STRESS ---
  {
    id: "section_11",
    title: "11. Emotional Well-being",
    description: "Chronic stress keeps cortisol elevated 24/7, which directly drives insulin resistance. Let's check in on your mental load.",
    questions: [
      {
        id: "chronic_stressors",
        label: "Do any of the following chronic, long-term stressors currently apply to your life? (Select all that apply)",
        type: "checkbox",
        options: [
          "None, my life is relatively stable",
          "Financial toxicity (Living paycheck to paycheck or severe debt)",
          "Caregiver burnout (Primary care for an ailing parent or special-needs child)",
          "History of childhood trauma or Adverse Childhood Experiences (ACEs)",
          "Toxic or high-conflict relationships",
          "Ongoing grief or unresolved trauma"
        ]
      },
      {
        id: "physical_stress_signs",
        label: "Do you frequently notice physical signs of stress (e.g., clenching your jaw, tense shoulders, or shallow breathing)?",
        type: "radio",
        options: [
          "Rarely",
          "Sometimes, during busy days",
          "Often, my body feels tense most of the time"
        ]
      },
      {
        id: "mental_calm",
        label: "Do you find it hard to calm your mind and stop worrying at the end of the day?",
        type: "radio",
        options: [
          "No, I relax easily",
          "Sometimes",
          "Yes, my mind keeps racing",
          "I rarely feel relaxed"
        ]
      },
      {
        id: "emotional_eating_trigger",
        label: "Do you tend to eat more snacks or sweets when you are stressed or emotional?",
        type: "radio",
        options: ["No", "Sometimes", "Yes, almost always"]
      },
      {
        id: "coping_mechanisms",
        label: "When you are highly stressed, what do you usually turn to? (Select all that apply)",
        type: "checkbox",
        options: [
          "Talking to a friend or partner",
          "Mindless scrolling on social media or TV",
          "Eating comfort food",
          "Exercising or going for a walk",
          "Isolating myself / Sleeping",
          "Smoking or drinking alcohol"
        ]
      },
      {
        id: "social_support",
        label: "When you feel low or stressed, do you have a strong support system?",
        type: "radio",
        options: [
          "Yes, I have strong support",
          "Sometimes",
          "No, I mostly keep to myself"
        ]
      },
      {
        id: "laugh_loudly",
        label: "How often do you get the opportunity to laugh out loud or experience genuine joy?",
        type: "radio",
        options: [
          "Daily",
          "A few times a week",
          "Rarely",
          "I can't remember the last time"
        ]
      }
    ]
  },
];





//=================================working================================

// export type QuestionType = 'text' | 'number' | 'select' | 'radio' | 'textarea' | 'time' | 'file' | 'checkbox' | 'info';

// export interface Question {
//   id: string;
//   label: string;
//   type: QuestionType;
//   required?: boolean;
//   options?: string[];
//   placeholder?: string;
//   dependsOn?: {
//     id: string;
//     values: (string | number | boolean)[];
//   };
// }

// export interface Section {
//   id: string;
//   title: string;
//   description?: string; 
//   dependsOn?: {
//     id: string;
//     values: (string | number | boolean)[];
//   };
//   questions: Question[];
// }

// export const questionnaire: Section[] = [
//   // --- 1. BASIC PROFILE ---
//   {
//     id: "section_1",
//     title: "1. Let's start with the basics",
//     description: "Help us understand your general profile so we can personalize your experience.",
//     questions: [
//       { id: "age", label: "How old are you? (in years)", type: "number", placeholder: "e.g., 35", required: true },
//       { id: "gender", label: "How do you identify?", type: "radio", options: ["Male", "Female", "Other"], required: true },
//       {
//         id: "state",
//         label: "Which Indian state or region do you currently live in?",
//         type: "select",
//         options: [
//           "Andhra Pradesh",
//           "Arunachal Pradesh",
//           "Assam",
//           "Bihar",
//           "Chhattisgarh",
//           "Delhi",
//           "Goa",
//           "Gujarat",
//           "Haryana",
//           "Himachal Pradesh",
//           "Jammu & Kashmir",
//           "Jharkhand",
//           "Karnataka",
//           "Kerala",
//           "Madhya Pradesh",
//           "Maharashtra",
//           "Manipur",
//           "Meghalaya",
//           "Mizoram",
//           "Nagaland",
//           "Odisha",
//           "Puducherry",
//           "Punjab",
//           "Rajasthan",
//           "Sikkim",
//           "Tamil Nadu",
//           "Telangana",
//           "Tripura",
//           "Uttar Pradesh",
//           "Uttarakhand",
//           "West Bengal",
//           "Other Indian State/UT",
//           "Outside India"
//         ],
//         required: true
//       },
//       { id: "diet_type", label: "What type of diet do you typically follow?", type: "radio", options: ["Vegetarian (no eggs)", "Eggetarian (Vegetarian + Eggs)", "Non-vegetarian", "Vegan"], required: true },
//       { id: "height_cm", label: "What is your height? (in cm)", type: "number", placeholder: "e.g., 165", required: true },
//       { id: "weight_kg", label: "What is your current weight? (in kg)", type: "number", placeholder: "e.g., 70", required: true }
//     ]
//   },

//   // --- 2. DIABETES & MEDICAL HISTORY ---
//   {
//     id: "section_2",
//     title: "2. Clinical & Medical History",
//     description: "This helps us understand your body's specific metabolic needs.",
//     questions: [
//       // Lab reports check
//       {
//         id: "has_lab_report",
//         label: "Do you have recent blood test reports handy?",
//         type: "radio",
//         options: ["Yes, I have them", "No, I don't know my values right now"],
//         required: true
//       },

//       // Disclaimer if they don't have reports
//       {
//         id: "no_report_disclaimer",
//         label: "Tip: We highly recommend getting a routine blood test for accurate clinical tracking. Without reports, your plan will focus purely on general lifestyle and dietary improvements.",
//         type: "info",
//         dependsOn: { id: "has_lab_report", values: ["No, I don't know my values right now"] }
//       },
//       // Acknowledgment for the disclaimer (Changed to checkbox for better UI flow)
//       {
//         id: "no_report_ack",
//         label: "Acknowledgment",
//         type: "checkbox",
//         options: ["I understand, let's proceed"],
//         dependsOn: { id: "has_lab_report", values: ["No, I don't know my values right now"] },
//         required: true
//       },

//       // Diabetes Type (Reordered to put "None" at the top for better UX)
//       {
//         id: "diabetes_type",
//         label: "What is your current diabetes diagnosis?",
//         type: "select",
//         options: ["None / I do not have diabetes", "Pre-diabetes", "Type 2 diabetes", "Type 1 diabetes", "Gestational diabetes"],
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] },
//         required: true
//       },

//       {
//         id: "years_since_diagnosis",
//         label: "How many years has it been since you were diagnosed?",
//         type: "number",
//         placeholder: "e.g., 2",
//         dependsOn: { id: "diabetes_type", values: ["Type 2 diabetes", "Type 1 diabetes", "Pre-diabetes", "Gestational diabetes"] }
//       },

//       {
//         id: "life_event_trigger",
//         label: "Did a major life event happen 1 to 2 years before your diagnosis or weight gain?",
//         type: "select",
//         options: [
//           "No, life was relatively stable",
//           "Yes, grief or loss of a loved one",
//           "Yes, financial crisis or job loss",
//           "Yes, major accident or surgery",
//           "Yes, marriage or childbirth",
//           "Yes, heavy caregiving duties"
//         ],
//         dependsOn: { id: "diabetes_type", values: ["Type 2 diabetes", "Type 1 diabetes", "Pre-diabetes", "Gestational diabetes"] }
//       },

//       // Updated Family History for clearer clinical grouping
//       {
//         id: "family_history",
//         label: "Is there a history of diabetes in your immediate family?",
//         type: "radio",
//         options: ["No family history", "One parent or sibling", "Multiple immediate family members"],
//         required: true
//       },

//       // Treatments
//       {
//         id: "current_medications",
//         label: "Are you currently on any diabetes treatments? (Select all that apply)",
//         type: "checkbox",
//         options: [
//           "None",
//           "Diet & Lifestyle only",
//           "Tablets (Allopathic)",
//           "Insulin injections",
//           "Ayurveda",
//           "Yoga & Naturopathy",
//           "Unani",
//           "Siddha",
//           "Homoeopathy",
//           "Other"
//         ],
//         dependsOn: { id: "diabetes_type", values: ["Type 2 diabetes", "Type 1 diabetes", "Pre-diabetes", "Gestational diabetes"] }
//       },

//       // --- Comorbidities ---
//       { id: "has_bp", label: "Do you experience Blood Pressure issues?", type: "radio", options: ["Yes, High BP", "Yes, Low BP", "No, it's normal", "Not sure, need to get checked"], required: true },
//       { id: "has_cholesterol", label: "Do you have High Cholesterol?", type: "radio", options: ["Yes", "No", "Not sure, need to get checked"], required: true },
//       { id: "has_heart_issue", label: "Do you have any diagnosed Heart conditions?", type: "radio", options: ["Yes", "No", "Not sure, need to get checked"], required: true },
//       { id: "has_thyroid", label: "Do you have Thyroid issues?", type: "radio", options: ["Yes, Hypothyroidism (Underactive)", "Yes, Hyperthyroidism (Overactive)", "No", "Not sure, need to get checked"], required: true },

//       // --- LAB REPORTS MANUAL ENTRY ---
//       {
//         id: "report_date",
//         label: "How recent are your lab results?",
//         type: "radio",
//         options: ["Recent (Within the last 3 months)", "Older (3 to 12 months ago)"],
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] },
//         required: true
//       },
//       {
//         id: "lab_hba1c",
//         label: "What is your HbA1c? (%)",
//         type: "number",
//         placeholder: "e.g., 6.5",
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] },
//         required: true
//       },
//       {
//         id: "lab_fbs",
//         label: "Fasting Blood Sugar (FBS) in mg/dL",
//         type: "number",
//         placeholder: "e.g., 110",
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
//       },
//       {
//         id: "lab_pp",
//         label: "Post-Meal Blood Sugar (PP) in mg/dL",
//         type: "number",
//         placeholder: "e.g., 160",
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
//       },
//       {
//         id: "lab_vit_d3",
//         label: "Vitamin D3 in ng/mL (Optional)",
//         type: "number",
//         placeholder: "e.g., 30",
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
//       },
//       {
//         id: "lab_vit_b12",
//         label: "Vitamin B12 in pg/mL (Optional)",
//         type: "number",
//         placeholder: "e.g., 400",
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
//       },
//       {
//         id: "vitamin_d_supplement",
//         label: "Are you currently taking Vitamin D supplements?",
//         type: "radio",
//         options: ["Yes, as prescribed by my doctor", "Yes, occasionally", "No, I am not"]
//       }
//     ]
//   },

//   // --- 3. FEMALE HORMONAL HEALTH ---
//   {
//     id: "section_3",
//     title: "3. Female Hormonal Health",
//     description: "Hormonal shifts strongly influence metabolism, weight, and blood sugar levels.",
//     dependsOn: { id: "gender", values: ["Female"] },
//     questions: [
//       {
//         id: "menstrual_status",
//         label: "Which of the following best describes your current menstrual cycle?",
//         type: "select",
//         options: [
//           "Regular periods",
//           "Irregular / Missed periods",
//           "Perimenopause (Transitioning phase)",
//           "Menopause (No periods for 12+ months)",
//           "Hysterectomy (Uterus removed)"
//         ]
//       },
//       {
//         id: "pcos_history",
//         label: "Have you ever been diagnosed with PCOS or PCOD?",
//         type: "radio",
//         options: ["Yes", "No"]
//       },
//       {
//         id: "menopause_symptoms",
//         label: "Do you frequently experience hot flashes, night sweats, or severe mood swings?",
//         type: "radio",
//         options: ["Yes, quite frequently", "Sometimes", "No / Not applicable"],
//         dependsOn: {
//           id: "menstrual_status",
//           values: ["Perimenopause (Transitioning phase)", "Menopause (No periods for 12+ months)", "Hysterectomy (Uterus removed)"]
//         }
//       }
//     ]
//   },
  
//   // --- 4. DIGESTION & GUT HEALTH ---
//   // (Moved up: Clinical symptoms logically follow medical history)
//   {
//     id: "section_4",
//     title: "4. Digestion & Gut Health",
//     description: "Your gut health provides vital clues about inflammation, insulin sensitivity, and how well you absorb nutrients.",
//     questions: [
//       {
//         id: "acidity_issues",
//         label: "Do you frequently experience acidity, heartburn, or sour burps?",
//         type: "radio",
//         options: ["No", "Only after eating spicy or heavy food", "Often", "Almost every day"]
//       },
//       {
//         id: "bloating_gas",
//         label: "Do you feel bloated or unusually heavy after eating?",
//         type: "radio",
//         options: ["Rarely", "Sometimes", "Often in the evenings", "Almost after every meal"]
//       },
//       {
//         id: "bowel_movement",
//         label: "How would you describe your typical daily bowel movements?",
//         type: "select",
//         options: [
//           "Regular and comfortable",
//           "Hard and constipated",
//           "Often loose or watery",
//           "It constantly switches between hard and loose"
//         ]
//       }
//     ]
//   },

//   // --- 5. KITCHEN FACILITIES & PREP ---
//   // (Combined old Kitchen and Soaking/Prep sections)
//   {
//     id: "section_5",
//     title: "5. Kitchen & Food Preparation",
//     description: "Healthy eating starts in the kitchen. Tell us about how your meals are made and prepared.",
//     questions: [
//       {
//         id: "who_cooks",
//         label: "Who is primarily responsible for preparing your meals?",
//         type: "select",
//         options: [
//           "I cook for myself",
//           "A family member cooks",
//           "We have a cook or maid",
//           "I eat at a mess or canteen",
//           "I usually order in or eat at restaurants"
//         ]
//       },
//       {
//         id: "kitchen_type",
//         label: "What kind of kitchen setup do you have access to?",
//         type: "select",
//         options: [
//           "Fully equipped kitchen",
//           "Basic kitchen setup",
//           "Just a microwave or kettle",
//           "No kitchen access"
//         ],
//         dependsOn: { id: "who_cooks", values: ["I cook for myself", "A family member cooks"] }
//       },
//       {
//         id: "cooking_time",
//         label: "On a typical weekday, how much time is spent on cooking?",
//         type: "select",
//         options: ["Under 10 minutes", "10 to 20 minutes", "20 to 40 minutes", "More than 40 minutes"],
//         dependsOn: { id: "who_cooks", values: ["I cook for myself", "A family member cooks"] }
//       },
//       // CHANGED: From 'select' to 'checkbox' to allow multiple oil selections
//       {
//         id: "oil_base",
//         label: "Which cooking oils are most frequently used for your meals? (Select all that apply)",
//         type: "checkbox",
//         options: [
//           "Sunflower oil",
//           "Groundnut oil",
//           "Sesame oil",
//           "Coconut oil",
//           "Mustard oil",
//           "Olive oil",
//           "A mix of different oils"
//         ],
//         dependsOn: { id: "who_cooks", values: ["I cook for myself", "A family member cooks", "We have a cook or maid"] }
//       },
//       {
//         id: "oil_processing",
//         label: "Are the oils you use cold-pressed (kachi ghani) or refined?",
//         type: "radio",
//         options: ["Cold-pressed (Unrefined)", "Refined"],
//         dependsOn: {
//           id: "oil_base",
//           values: ["Sunflower oil", "Groundnut oil", "Sesame oil", "Coconut oil", "Mustard oil", "Olive oil", "A mix of different oils"]
//         }
//       },
//       {
//         id: "cook_legumes",
//         label: "Do you regularly cook whole legumes like rajma, chana, or whole dals?",
//         type: "radio",
//         options: ["Yes", "No"]
//       },
//       {
//         id: "soak_grains",
//         label: "How do you prepare these legumes before cooking?",
//         type: "select",
//         options: [
//           "I soak them overnight",
//           "I soak them for a short time (1 to 2 hours)",
//           "I cook them directly in a pressure cooker"
//         ],
//         dependsOn: { id: "cook_legumes", values: ["Yes"] }
//       },
//       {
//         id: "consume_nuts",
//         label: "Do you eat nuts and seeds like cashews, peanuts, walnuts, or chia seeds?",
//         type: "radio",
//         options: ["Yes", "No"]
//       },
//       {
//         id: "nuts_prep",
//         label: "How do you usually consume these nuts and seeds?",
//         type: "select",
//         options: [
//           "Raw and dry",
//           "Dry roasted",
//           "Roasted and salted",
//           "Soaked in water"
//         ],
//         dependsOn: { id: "consume_nuts", values: ["Yes"] }
//       },
//       {
//         id: "eat_almonds",
//         label: "Do you specifically eat almonds?",
//         type: "radio",
//         options: ["Yes", "No"]
//       },
//       {
//         id: "soak_almonds",
//         label: "Do you soak your almonds in water before eating them?",
//         type: "radio",
//         options: ["Yes", "No"],
//         dependsOn: { id: "eat_almonds", values: ["Yes"] }
//       },
//       {
//         id: "peel_almonds",
//         label: "Do you peel the skin off the soaked almonds before eating?",
//         type: "radio",
//         options: ["Yes", "No"],
//         dependsOn: { id: "soak_almonds", values: ["Yes"] }
//       }
//     ]
//   },

//   // --- 6. FOOD PRACTICES & EATING OUT ---
//   // (Combined old Food Routine and Eating Out Patterns)
//   {
//     id: "section_6",
//     title: "6. Food Choices & Routine",
//     description: "Let's map out your typical daily food choices, beverages, and meal schedule.",
//     questions: [
//       {
//         id: "breakfast_time_actual",
//         label: "What time do you usually eat breakfast?",
//         type: "select",
//         options: [
//           "Before 8:00 AM",
//           "8:00 AM to 9:00 AM",
//           "9:00 AM to 10:00 AM",
//           "After 10:00 AM",
//           "I usually skip breakfast"
//         ]
//       },
//       {
//         id: "lunch_time_actual",
//         label: "What time do you usually eat lunch?",
//         type: "select",
//         options: [
//           "Before 1:00 PM",
//           "1:00 PM to 2:00 PM",
//           "2:00 PM to 3:00 PM",
//           "After 3:00 PM"
//         ]
//       },
//       {
//         id: "dinner_time_actual",
//         label: "What time do you usually eat dinner?",
//         type: "select",
//         options: [
//           "Before 7:00 PM",
//           "7:00 PM to 8:00 PM",
//           "8:00 PM to 9:00 PM",
//           "9:00 PM to 10:00 PM",
//           "After 10:00 PM"
//         ]
//       },
//       {
//         id: "high_carb_freq",
//         label: "How often do you eat carbohydrate-rich foods like rice, roti, bread, or potatoes?",
//         type: "select",
//         options: [
//           "With every single meal",
//           "Once or twice a day",
//           "Rarely"
//         ]
//       },
//       {
//         id: "greens_intake",
//         label: "How often do you include leafy greens or fresh vegetables in your meals?",
//         type: "select",
//         options: [
//           "Daily",
//           "A few times a week",
//           "Rarely"
//         ]
//       },
//       {
//         id: "veggie_storage",
//         label: "How long do you usually store vegetables in the fridge before cooking them?",
//         type: "select",
//         options: [
//           "I buy and cook fresh daily",
//           "2 to 3 days",
//           "4 to 6 days",
//           "More than a week"
//         ]
//       },
//       {
//         id: "hotel_freq",
//         label: "How often do you take or order hotel/restaurant food?",
//         type: "select",
//         options: [
//           "Rarely or on special occasions",
//           "Once a week",
//           "2 to 3 times a week",
//           "Daily or almost daily"
//         ]
//       },
//       {
//         id: "fried_general",
//         label: "When eating out, do you often order oily or deep-fried items?",
//         type: "radio",
//         options: ["No, I usually avoid them", "Sometimes", "Yes, almost always"]
//       },
//       {
//         id: "cold_drinks_carbonated",
//         label: "How often do you consume cold carbonated drinks or sodas?",
//         type: "select",
//         options: ["Never", "Occasionally", "A few times a week", "Daily"]
//       },
//       {
//         id: "cold_drinks_juices",
//         label: "How often do you consume fresh or packaged fruit juices?",
//         type: "select",
//         options: ["Never", "Occasionally", "A few times a week", "Daily"]
//       },
//       {
//         id: "hot_beverage_freq",
//         label: "How many cups of tea or coffee do you drink in a day?",
//         type: "select",
//         options: [
//           "None",
//           "1 to 2 cups",
//           "3 cups",
//           "More than 3 cups"
//         ]
//       },
//       {
//         id: "hot_beverage_exact",
//         label: "Please enter the exact number of cups you drink daily:",
//         type: "number",
//         placeholder: "e.g., 5",
//         dependsOn: { id: "hot_beverage_freq", values: ["More than 3 cups"] }
//       },
//       {
//         id: "post_meal_caffeine",
//         label: "Do you drink tea or coffee immediately after your meals?",
//         type: "radio",
//         options: ["No, never", "Sometimes", "Yes, it is a habit"]
//       },
//       {
//         id: "bakery_snacks",
//         label: "How often do you eat biscuits, cookies, or bakery items?",
//         type: "select",
//         options: ["Never", "Occasionally", "Daily with tea or coffee"]
//       },
//       {
//         id: "dessert_habit",
//         label: "Do you usually order a sweet or dessert after your meal?",
//         type: "radio",
//         options: ["No", "Sometimes", "Yes, always"]
//       }
//     ]
//   },

//   // --- 7. EATING HABITS & HYDRATION ---
//   // (Combined Mindful Eating, Meal Sequencing, and Hydration for a seamless food flow)
//   {
//     id: "section_7",
//     title: "7. Eating Habits & Hydration",
//     description: "The way you eat and hydrate strongly influences your blood sugar spikes and digestion.",
//     questions: [
//       {
//         id: "meal_sequencing",
//         label: "How do you usually start your main meals?",
//         type: "select",
//         options: [
//           "I eat salad or veggies first",
//           "I start with protein like dal, egg, or paneer",
//           "I mix everything together",
//           "I start with the starchy part like rice or roti"
//         ]
//       },
//       {
//         id: "eating_speed",
//         label: "How quickly do you usually finish your main meals?",
//         type: "select",
//         options: [
//           "Very fast (Under 10 minutes)",
//           "Moderate pace (15 to 20 minutes)",
//           "Slow and relaxed (More than 20 minutes)"
//         ]
//       },
//       {
//         id: "chewing_habit",
//         label: "Do you consciously chew your food thoroughly?",
//         type: "radio",
//         options: [
//           "Yes, I take my time",
//           "Sometimes",
//           "No, I tend to swallow or gulp quickly"
//         ]
//       },
//       {
//         id: "distracted_eating",
//         label: "Do you typically watch TV, work on a laptop, or scroll on your phone while eating?",
//         type: "radio",
//         options: [
//           "No, never",
//           "Sometimes",
//           "Yes, almost every meal"
//         ]
//       },
//       {
//         id: "satiety_cue",
//         label: "When do you usually decide to stop eating?",
//         type: "select",
//         options: [
//           "When I feel light or about 80 percent full",
//           "When I feel completely stuffed",
//           "I tend to overeat until I feel heavy"
//         ]
//       },
//       {
//         id: "fruit_habit",
//         label: "When do you typically eat fruits?",
//         type: "select",
//         options: [
//           "With my main meal",
//           "As a mid-meal snack",
//           "Immediately after a meal",
//           "I rarely eat fruits"
//         ]
//       },
//       {
//         id: "fruit_portion",
//         label: "What is your usual fruit portion size?",
//         type: "select",
//         options: ["1 small piece or a handful", "1 large fruit or a medium bowl", "A very large bowl or multiple fruits"],
//         dependsOn: { id: "fruit_habit", values: ["With my main meal", "As a mid-meal snack", "Immediately after a meal"] }
//       },
//       {
//         id: "water_temperature", // Replaced duplicate water question with temperature context
//         label: "What temperature of water do you prefer drinking throughout the day?",
//         type: "select",
//         options: [
//           "Warm or hot water",
//           "Room temperature / Matka water",
//           "Chilled water from the fridge"
//         ]
//       },
//       {
//         id: "daily_hydration",
//         label: "Total daily water intake (approximate)?",
//         type: "select",
//         options: [
//           "Low (Less than 1.5 Liters / 6 glasses)",
//           "Average (1.5 to 2.5 Liters / 6-10 glasses)",
//           "High (More than 2.5 Liters / 10+ glasses)"
//         ]
//       },
//       {
//         id: "snacking_freq",
//         label: "How often do you snack between meals?",
//         type: "select",
//         options: [
//           "Rarely",
//           "Sometimes when hungry",
//           "Frequently as a habit",
//           "I graze or munch all day"
//         ]
//       },
//       {
//         id: "snack_choices",
//         label: "What do you usually reach for when you snack? (Select all that apply)",
//         type: "checkbox",
//         options: [
//           "Fruits, nuts, or seeds",
//           "Biscuits, cookies, or rusk",
//           "Fried snacks like chips or namkeen",
//           "Chocolates or sweets",
//           "Other"
//         ],
//         dependsOn: { id: "snacking_freq", values: ["Sometimes when hungry", "Frequently as a habit", "I graze or munch all day"] }
//       }
//     ]
//   },

// // --- 8. DAILY ROUTINE & WORKLOAD ---
//   {
//     id: "section_8",
//     title: "8. Daily Routine & Workload",
//     description: "Your daily energy expenditure and stress levels at work significantly impact your glucose management.",
//     questions: [
//       {
//         id: "occupation_role",
//         label: "Which of the following best describes your typical daily role?",
//         type: "select",
//         options: [
//           "I work at an office desk",
//           "I work from home",
//           "My work involves physical movement or field visits",
//           "I manage the house (Homemaker)",
//           "I am retired",
//           "I am a student"
//         ]
//       },

//       // --- Stress Branching based on Occupation ---
//       {
//         id: "stress_work",
//         label: "How would you describe your current work environment?",
//         type: "radio",
//         options: ["Very relaxed", "Generally manageable", "Quite stressful", "Overwhelming / High Pressure"],
//         dependsOn: {
//           id: "occupation_role",
//           values: ["I work at an office desk", "I work from home", "My work involves physical movement or field visits"]
//         }
//       },
//       {
//         id: "stress_home",
//         label: "How stressful is managing the household on a daily basis?",
//         type: "radio",
//         options: ["Very relaxed", "Manageable", "Quite stressful", "Overwhelming"],
//         dependsOn: { id: "occupation_role", values: ["I manage the house (Homemaker)"] }
//       },
//       // NEW: Branch specifically for Homemaker Stress
//       {
//         id: "homemaker_stress_source",
//         label: "What contributes most to your household stress? (Select all that apply)",
//         type: "checkbox",
//         options: [
//           "Heavy caregiving duties (children, elderly, or sick family members)",
//           "Lack of domestic help or shared household responsibilities",
//           "Financial constraints managing the household budget",
//           "Constant mental load (planning meals, chores, and schedules)",
//           "Lack of personal time or identity outside the home"
//         ],
//         dependsOn: { id: "stress_home", values: ["Quite stressful", "Overwhelming"] }
//       },
//       {
//         id: "stress_student",
//         label: "How would you rate your current academic stress levels?",
//         type: "radio",
//         options: ["Very relaxed", "Manageable", "Quite stressful", "Overwhelming"],
//         dependsOn: { id: "occupation_role", values: ["I am a student"] }
//       },
//       {
//         id: "stress_retired",
//         label: "How would you rate your typical daily stress levels?",
//         type: "radio",
//         options: ["Very relaxed", "Manageable", "Quite stressful", "Overwhelming"],
//         dependsOn: { id: "occupation_role", values: ["I am retired"] }
//       },

//       // --- Shift Branching ---
//       {
//         id: "work_schedule",
//         label: "What are your usual working hours?",
//         type: "select",
//         options: [
//           "Standard daytime hours",
//           "Early morning shift",
//           "Night shift",
//           "My shifts change frequently (Rotating shifts)"
//         ],
//         dependsOn: {
//           id: "occupation_role",
//           values: ["I work at an office desk", "I work from home", "My work involves physical movement or field visits"]
//         }
//       },

//       // --- Commute Branching ---
//       {
//         id: "commute_method",
//         label: "How do you usually travel to work or college?",
//         type: "select",
//         options: [
//           "I drive a car or ride a bike",
//           "I take public transport (Train, Bus, Metro)",
//           "I walk or cycle",
//           "I use an office cab or school bus"
//         ],
//         dependsOn: {
//           id: "occupation_role",
//           values: ["I work at an office desk", "My work involves physical movement or field visits", "I am a student"]
//         }
//       }
//     ]
//   },

//   // --- 9. SLEEP & RECOVERY ---
//   // (Moved towards the end to group Recovery and Mental well-being)
//   {
//     id: "section_9",
//     title: "9. Sleep & Recovery",
//     description: "Poor sleep is a direct trigger for insulin resistance. Let's look at your rest patterns.",
//     questions: [
//       {
//         id: "bed_time",
//         label: "What time do you usually go to bed?",
//         type: "select",
//         options: [
//           "Before 9 PM", // Added early sleeper option
//           "Between 9 PM and 10 PM",
//           "Between 10 PM and 11 PM",
//           "Between 11 PM and 12 AM",
//           "Late night (After 12 AM)"
//         ]
//       },
//       {
//         id: "sleep_hours",
//         label: "How many hours of actual sleep do you usually get?",
//         type: "select",
//         options: ["Less than 5 hours", "5 to 6 hours", "6 to 7 hours", "7 to 8 hours", "More than 8 hours"]
//       },
//       {
//         id: "sleep_quality",
//         label: "How do you feel when you wake up in the morning?",
//         type: "radio",
//         options: [
//           "Yes, completely refreshed",
//           "I feel okay / Neutral",
//           "No, I still feel tired",
//           "I struggle to sleep well throughout the night"
//         ]
//       },
//       {
//         id: "wake_method",
//         label: "Do you wake up naturally or do you rely on an alarm?",
//         type: "radio",
//         options: ["I wake up naturally", "I need an alarm clock to wake up"]
//       },
//       {
//         id: "snoring_history",
//         label: "Have you been told that you snore loudly?",
//         type: "radio",
//         options: ["Yes", "No"]
//       },
//       {
//         id: "screen_use",
//         label: "Do you use a mobile, laptop, or watch TV in the 30 minutes before sleep?",
//         type: "radio",
//         options: ["Rarely", "Sometimes", "Often", "Almost every night"]
//       },
//       {
//         id: "racing_thoughts",
//         label: "Do you find yourself worrying about tomorrow's tasks while trying to fall asleep?",
//         type: "radio",
//         options: ["Rarely", "Sometimes", "Almost every night"]
//       },
//       {
//         id: "daytime_sleepiness",
//         label: "Do you experience significant sleepiness or sluggishness during the day?",
//         type: "radio",
//         options: ["No, I stay energetic", "Only after lunch (Post-meal dip)", "Yes, throughout the day"]
//       }
//     ]
//   },

//   // --- 10. MOVEMENT & SUNLIGHT ---
//   // (Physical activity and environmental factors)
//   {
//     id: "section_10",
//     title: "10. Movement & Sunlight",
//     description: "Physical activity and Vitamin D are highly effective at improving insulin resistance.",
//     questions: [
//       {
//         id: "daily_activity",
//         label: "How much dedicated walking or exercise do you do daily?",
//         type: "select",
//         options: [
//           "None",
//           "Very light (Under 15 minutes)", // Added lower threshold for inclusivity
//           "Light walking (15 to 30 minutes)",
//           "Moderate walking (30 to 45 minutes)",
//           "Active and intense (More than 45 minutes)"
//         ]
//       },
//       {
//         id: "walking_pace",
//         label: "How would you describe your usual walking pace?",
//         type: "select",
//         options: [
//           "Casual strolling",
//           "Brisk walking",
//           "Fast jogging"
//         ],
//         dependsOn: {
//           id: "daily_activity",
//           values: [
//             "Light walking (15 to 30 minutes)",
//             "Moderate walking (30 to 45 minutes)",
//             "Active and intense (More than 45 minutes)"
//           ]
//         }
//       },
//       {
//         id: "practice_yoga",
//         label: "Do you practice Yoga?",
//         type: "radio",
//         options: ["Yes", "No"]
//       },
//       {
//         id: "yoga_frequency",
//         label: "How often do you practice Yoga?",
//         type: "select",
//         options: ["Daily", "A few times a week", "Rarely"],
//         dependsOn: { id: "practice_yoga", values: ["Yes"] }
//       },
//       {
//         id: "go_to_gym",
//         label: "Do you go to a gym or lift weights?",
//         type: "radio",
//         options: ["Yes", "No"]
//       },
//       {
//         id: "gym_frequency",
//         label: "How often do you go to the gym or lift weights?",
//         type: "select",
//         options: ["Daily", "A few times a week", "Rarely"],
//         dependsOn: { id: "go_to_gym", values: ["Yes"] }
//       },
//       {
//         id: "inactivity_reason",
//         label: "What is the main reason that keeps you from being physically active?",
//         type: "select",
//         options: [
//           "I have physical pain or limitations",
//           "My workload is too high",
//           "I feel lazy or lack motivation",
//           "I do not have enough time"
//         ],
//         dependsOn: { id: "daily_activity", values: ["None"] }
//       },
//       {
//         id: "physical_limitations",
//         label: "Could you specify the physical issue that stops you?",
//         type: "select",
//         options: [
//           "Knee or joint pain",
//           "Back pain",
//           "Foot pain or numbness",
//           "Shortness of breath",
//           "Other"
//         ],
//         dependsOn: { id: "inactivity_reason", values: ["I have physical pain or limitations"] }
//       },
//       {
//         id: "other_limitation_details",
//         label: "Please briefly describe your physical limitation:",
//         type: "text",
//         dependsOn: { id: "physical_limitations", values: ["Other"] }
//       },
//       {
//         id: "sunlight_exposure",
//         label: "Do you get a chance to expose yourself to direct sunlight everyday?",
//         type: "radio",
//         options: [
//           "Yes, almost daily",
//           "A few times a week",
//           "Rarely",
//           "No, I stay indoors"
//         ]
//       }
//     ]
//   },

// // --- 11. EMOTIONAL WELL-BEING & CHRONIC STRESS ---
//   {
//     id: "section_11",
//     title: "11. Emotional Well-being",
//     description: "Chronic stress keeps cortisol elevated 24/7, which directly drives insulin resistance. Let's check in on your mental load.",
//     questions: [
//       {
//         id: "chronic_stressors",
//         label: "Do any of the following chronic, long-term stressors currently apply to your life? (Select all that apply)",
//         type: "checkbox",
//         options: [
//           "None, my life is relatively stable",
//           "Financial toxicity (Living paycheck to paycheck or severe debt)",
//           "Caregiver burnout (Primary care for an ailing parent or special-needs child)",
//           "History of childhood trauma or Adverse Childhood Experiences (ACEs)",
//           "Toxic or high-conflict relationships",
//           "Ongoing grief or unresolved trauma"
//         ]
//       },
//       {
//         id: "physical_stress_signs",
//         label: "Do you frequently notice physical signs of stress (e.g., clenching your jaw, tense shoulders, or shallow breathing)?",
//         type: "radio",
//         options: [
//           "Rarely",
//           "Sometimes, during busy days",
//           "Often, my body feels tense most of the time"
//         ]
//       },
//       {
//         id: "mental_calm",
//         label: "Do you find it hard to calm your mind and stop worrying at the end of the day?",
//         type: "radio",
//         options: [
//           "No, I relax easily",
//           "Sometimes",
//           "Yes, my mind keeps racing",
//           "I rarely feel relaxed"
//         ]
//       },
//       {
//         id: "emotional_eating_trigger",
//         label: "Do you tend to eat more snacks or sweets when you are stressed or emotional?",
//         type: "radio",
//         options: ["No", "Sometimes", "Yes, almost always"]
//       },
//       {
//         id: "coping_mechanisms",
//         label: "When you are highly stressed, what do you usually turn to? (Select all that apply)",
//         type: "checkbox",
//         options: [
//           "Talking to a friend or partner",
//           "Mindless scrolling on social media or TV",
//           "Eating comfort food",
//           "Exercising or going for a walk",
//           "Isolating myself / Sleeping",
//           "Smoking or drinking alcohol"
//         ]
//       },
//       {
//         id: "social_support",
//         label: "When you feel low or stressed, do you have a strong support system?",
//         type: "radio",
//         options: [
//           "Yes, I have strong support",
//           "Sometimes",
//           "No, I mostly keep to myself"
//         ]
//       },
//       {
//         id: "laugh_loudly",
//         label: "How often do you get the opportunity to laugh out loud or experience genuine joy?",
//         type: "select",
//         options: [
//           "Daily",
//           "A few times a week",
//           "Rarely",
//           "I can't remember the last time"
//         ]
//       }
//     ]
//   },
// ];





//==================Working Till here=====================


































//   // --- 12. SUBSTANCES & HIDDEN STRESSORS ---
//   // (New Section: Targets liver stress, microbiome disruptors, and insulin-blocking meds)
//   {
//     id: "section_12",
//     title: "12. Substances & Hidden Stressors",
//     description: "Certain habits, medications, and environmental factors silently force your liver to work harder, impacting your blood sugar.",
//     questions: [
//       {
//         id: "alcohol_consumption",
//         label: "How often do you consume alcohol?",
//         type: "select",
//         options: [
//           "Never",
//           "Rarely (A few times a year)",
//           "Socially (1-2 times a week)",
//           "Regularly (Almost daily)"
//         ]
//       },
//       {
//         id: "tobacco_vape",
//         label: "Do you currently smoke, vape, or consume tobacco products?",
//         type: "radio",
//         options: [
//           "No, I do not",
//           "Yes, I smoke cigarettes or vape",
//           "Yes, I chew tobacco",
//           "I am a former smoker/tobacco user"
//         ]
//       },
//       {
//         id: "hidden_medications",
//         label: "Are you currently taking any of these specific medications? (Select all that apply)",
//         type: "checkbox",
//         options: [
//           "None of these",
//           "Corticosteroids (e.g., Prednisone for asthma/inflammation)",
//           "Psychiatric medications (e.g., Antidepressants, SSRIs)",
//           "Statins (Cholesterol medication)",
//           "Beta-blockers (Blood pressure medication)",
//           "Frequent antibiotics (More than twice a year)"
//         ]
//       },
//       {
//         id: "plastic_usage",
//         label: "How often do you microwave food in plastic containers or drink hot beverages from plastic cups?",
//         type: "radio",
//         options: [
//           "Rarely / I mostly use glass or steel",
//           "Sometimes",
//           "Often / Daily"
//         ]
//       }
//     ]
//   }
// ];




//==============UPDATED (13/5)==============

// // data/questions.ts

// // 1. Added 'checkbox' for MSQ and 'info' for the disclaimer
// export type QuestionType = 'text' | 'number' | 'select' | 'radio' | 'textarea' | 'time' | 'file' | 'checkbox' | 'info';

// export interface Question {
//   id: string;
//   label: string;
//   type: QuestionType;
//   required?: boolean;
//   options?: string[];
//   placeholder?: string;
//   dependsOn?: {
//     id: string;
//     values: (string | number | boolean)[];
//   };
// }

// export interface Section {
//   id: string;
//   title: string;
//   dependsOn?: {
//     id: string;
//     values: (string | number | boolean)[];
//   };
//   questions: Question[];
// }

// export const questionnaire: Section[] = [
//   // --- 1. BASIC PROFILE ---
//   {
//     id: "section_1",
//     title: "1. Basic Profile",
//     questions: [
//       { id: "age", label: "Your age (years)", type: "number", required: true },
//       { id: "gender", label: "Gender", type: "radio", options: ["Male", "Female", "Other"], required: true },
//       {
//         id: "state",
//         label: "Which state/residence do you currently live in?",
//         type: "select",
//         options: [
//           "Andhra Pradesh / Telangana",
//           "Karnataka",
//           "Kerala",
//           "Tamil Nadu",
//           "Maharashtra",
//           "Gujarat",
//           "Delhi / Punjab / UP / North India",
//           "West Bengal / East India",
//           "Other (General Indian Diet)",
//           "Outside India"
//         ],
//         required: true
//       },
//       { id: "diet_type", label: "What type of diet do you follow?", type: "radio", options: ["Vegetarian (no eggs)", "Vegetarian (eggs allowed)", "Non-vegetarian", "Vegan"], required: true },
//       { id: "height_cm", label: "Height (cm)", type: "number", required: true },
//       { id: "weight_kg", label: "Weight (kg)", type: "number", required: true }
//     ]
//   },

//   // --- 2. DIABETES & MEDICAL HISTORY ---
//   {
//     id: "section_2",
//     title: "2. Diabetes & Medical History",
//     questions: [
//       // Moved to top: Lab reports check
//       {
//         id: "has_lab_report",
//         label: "Do you have recent blood test reports available?",
//         type: "radio",
//         options: ["Yes, I have them", "No, I don't know my values"],
//         required: true
//       },

//       // Disclaimer if they don't have reports
//       {
//         id: "no_report_disclaimer",
//         label: "We highly recommend getting a blood test done for accurate clinical tracking. Without reports, the generated plan will strictly focus on general lifestyle and dietary improvements.",
//         type: "info",
//         dependsOn: { id: "has_lab_report", values: ["No, I don't know my values"] }
//       },
//       // Acknowledgment for the disclaimer to ensure they read it
//       {
//         id: "no_report_ack",
//         label: "Acknowledge to proceed",
//         type: "radio",
//         options: ["I understand"],
//         dependsOn: { id: "has_lab_report", values: ["No, I don't know my values"] },
//         required: true
//       },

//       // Diabetes Type (Only asked if they have reports)
//       {
//         id: "diabetes_type",
//         label: "Type of diabetes (as diagnosed by your doctor)",
//         type: "select",
//         options: ["Type 2 diabetes", "Type 1 diabetes", "Pre-diabetes", "Gestational", "None / Healthy"],
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] },
//         required: true
//       },

//       {
//         id: "years_since_diagnosis",
//         label: "How long ago were you diagnosed? (years)",
//         type: "number",
//         dependsOn: { id: "diabetes_type", values: ["Type 2 diabetes", "Type 1 diabetes", "Pre-diabetes", "Gestational"] }
//       },

//       {
//         id: "life_event_trigger",
//         label: "Did a major life event happen in the 1 to 2 years before your diagnosis or weight gain?",
//         type: "select",
//         options: [
//           "No, life was relatively stable",
//           "Yes, grief or loss of a loved one",
//           "Yes, financial crisis or job loss",
//           "Yes, major accident or surgery",
//           "Yes, marriage or childbirth", // Added as requested
//           "Yes, heavy caregiving duties"
//         ],
//         dependsOn: { id: "diabetes_type", values: ["Type 2 diabetes", "Type 1 diabetes", "Pre-diabetes", "Gestational"] }
//       },

//       // Updated Family History
//       {
//         id: "family_history",
//         label: "Family history of diabetes?",
//         type: "radio",
//         options: ["No parent diabetic", "One parent diabetic", "Both parents diabetic"],
//         required: true
//       },

//       // Updated Treatments (MSQ / Checkbox)
//       {
//         id: "current_medications",
//         label: "Current diabetes treatment (Select all that apply)",
//         type: "checkbox",
//         options: [
//           "None",
//           "Diet & Lifestyle only",
//           "Tablets (Allopathic)",
//           "Insulin injections",
//           "Ayurveda",
//           "Yoga & Naturopathy",
//           "Unani",
//           "Siddha",
//           "Homoeopathy",
//           "Other"
//         ],
//         dependsOn: { id: "diabetes_type", values: ["Type 2 diabetes", "Type 1 diabetes", "Pre-diabetes", "Gestational"] }
//       },

//       // --- Comorbidities (Updated to remove 'Not Sure' & include Thyroid/Low BP) ---
//       { id: "has_bp", label: "Do you have Blood Pressure issues?", type: "radio", options: ["Yes, High BP", "Yes, Low BP", "No", "Need to get checked"], required: true },
//       { id: "has_cholesterol", label: "Do you have High Cholesterol?", type: "radio", options: ["Yes", "No", "Need to get checked"], required: true },
//       { id: "has_heart_issue", label: "Do you have Heart disease?", type: "radio", options: ["Yes", "No", "Need to get checked"], required: true },
//       { id: "has_thyroid", label: "Do you have Thyroid issues?", type: "radio", options: ["Yes, Hypothyroidism (Underactive)", "Yes, Hyperthyroidism (Overactive)", "No", "Need to get checked"], required: true },

//       // --- LAB REPORTS MANUAL ENTRY ---
//       {
//         id: "report_date",
//         label: "How recent are these results?",
//         type: "select",
//         options: ["Recent (< 3 months)", "Old (3-12 months)"],
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] },
//         required: true
//       },
//       {
//         id: "lab_hba1c",
//         label: "HbA1c (%)",
//         type: "number",
//         placeholder: "e.g. 6.5",
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] },
//         required: true
//       },
//       {
//         id: "lab_fbs",
//         label: "Fasting Sugar (FBS) - mg/dL",
//         type: "number",
//         placeholder: "e.g. 110",
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
//       },
//       {
//         id: "lab_pp",
//         label: "Post-Meal Sugar (PP) - mg/dL",
//         type: "number",
//         placeholder: "e.g. 160",
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
//       },
//       {
//         id: "lab_vit_d3",
//         label: "Vitamin D3 (ng/mL) - Optional",
//         type: "number",
//         placeholder: "e.g. 30",
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
//       },
//       {
//         id: "lab_vit_b12",
//         label: "Vitamin B12 (pg/mL) - Optional",
//         type: "number",
//         placeholder: "e.g. 400",
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
//       },

//       {
//         id: "vitamin_d_supplement",
//         label: "Do you currently take Vitamin D supplements?",
//         type: "radio",
//         options: ["Yes, prescribed", "Yes, occasionally", "No"]
//       }
//     ]
//   },

//   // --- 3. FEMALE HORMONAL HEALTH ---
//   {
//     id: "section_3",
//     title: "3. Female Hormonal Health",
//     dependsOn: { id: "gender", values: ["Female"] },
//     questions: [
//       {
//         id: "menstrual_status",
//         label: "Which best describes your current menstrual cycle?",
//         type: "select",
//         options: [
//           "Regular periods",
//           "Irregular / Missed periods",
//           "Perimenopause (Transition phase)",
//           "Menopause (No periods for 12+ months)",
//           "Hysterectomy (Uterus removed)"
//         ]
//       },
//       {
//         id: "pcos_history",
//         label: "Have you ever been diagnosed with PCOS or PCOD?",
//         type: "radio",
//         options: ["Yes", "No"] // Removed "Not sure"
//       },
//       {
//         id: "menopause_symptoms",
//         label: "Do you experience hot flashes, night sweats, or severe mood swings?",
//         type: "radio",
//         options: ["Yes, frequently", "Sometimes", "No / Not applicable"],
//         dependsOn: {
//           id: "menstrual_status",
//           values: ["Perimenopause (Transition phase)", "Menopause (No periods for 12+ months)", "Hysterectomy (Uterus removed)"]
//         }
//       }
//     ]
//   },

//   // --- 4. WORK & LIFESTYLE LOAD ---
//   {
//     id: "section_4",
//     title: "4. Work & Lifestyle Load",
//     questions: [
//       {
//         id: "occupation_role",
//         label: "Which of these best describes your typical day?",
//         type: "select",
//         options: [
//           "I work at an office desk",
//           "I work from home",
//           "My work involves physical movement or field visits",
//           "I manage the house (Homemaker)",
//           "I am retired",
//           "I am a student"
//         ]
//       },

//       // --- Stress Branching based on Occupation ---
//       {
//         id: "stress_work",
//         label: "How stressful is your work environment?",
//         type: "radio",
//         options: ["Very relaxed", "Manageable", "Quite stressful", "Overwhelming"],
//         dependsOn: {
//           id: "occupation_role",
//           values: ["I work at an office desk", "I work from home", "My work involves physical movement or field visits"]
//         }
//       },
//       {
//         id: "stress_home",
//         label: "How stressful is managing the household on a daily basis?",
//         type: "radio",
//         options: ["Very relaxed", "Manageable", "Quite stressful", "Overwhelming"],
//         dependsOn: { id: "occupation_role", values: ["I manage the house (Homemaker)"] }
//       },
//       {
//         id: "stress_student",
//         label: "How stressful are your studies or exams right now?",
//         type: "radio",
//         options: ["Very relaxed", "Manageable", "Quite stressful", "Overwhelming"],
//         dependsOn: { id: "occupation_role", values: ["I am a student"] }
//       },
//       {
//         id: "stress_retired",
//         label: "How would you rate your daily stress levels?",
//         type: "radio",
//         options: ["Very relaxed", "Manageable", "Quite stressful", "Overwhelming"],
//         dependsOn: { id: "occupation_role", values: ["I am retired"] }
//       },

//       // --- Shift Branching ---
//       {
//         id: "work_schedule",
//         label: "What are your usual working hours?",
//         type: "select",
//         options: [
//           "Standard daytime hours",
//           "Early morning shift",
//           "Night shift",
//           "My shifts change frequently"
//         ],
//         dependsOn: {
//           id: "occupation_role",
//           values: ["I work at an office desk", "I work from home", "My work involves physical movement or field visits"]
//         }
//       },

//       // --- Commute Branching ---
//       {
//         id: "commute_method",
//         label: "How do you usually travel to work or college?",
//         type: "select",
//         options: [
//           "I drive a car or ride a bike",
//           "I take public transport like a train or bus",
//           "I walk or cycle",
//           "I use an office cab or school bus"
//         ],
//         dependsOn: {
//           id: "occupation_role",
//           values: ["I work at an office desk", "My work involves physical movement or field visits", "I am a student"]
//         }
//       }
//     ]
//   },

//   // --- 5. KITCHEN FACILITIES ---
//   {
//     id: "section_5",
//     title: "5. Kitchen Facilities",
//     questions: [
//       {
//         id: "who_cooks",
//         label: "Who usually prepares your meals?",
//         type: "select",
//         options: [
//           "I cook for myself",
//           "A family member cooks",
//           "We have a cook or maid",
//           "I eat at a mess or canteen",
//           "I usually order in or eat at restaurants"
//         ]
//       },
//       {
//         id: "kitchen_type",
//         label: "What kind of kitchen setup do you have?",
//         type: "select",
//         options: [
//           "Fully equipped kitchen",
//           "Basic kitchen setup",
//           "Just a microwave or kettle",
//           "No kitchen access"
//         ],
//         dependsOn: { id: "who_cooks", values: ["I cook for myself", "A family member cooks"] }
//       },
//       {
//         id: "cooking_time",
//         label: "How much time is usually spent cooking on a weekday?",
//         type: "select",
//         options: ["Under 10 minutes", "10 to 20 minutes", "20 to 40 minutes", "More than 40 minutes"],
//         dependsOn: { id: "who_cooks", values: ["I cook for myself", "A family member cooks"] }
//       },
//       {
//         id: "oil_base",
//         label: "Which cooking oil is mostly used for your meals?",
//         type: "select",
//         options: [
//           "Sunflower oil",
//           "Groundnut oil",
//           "Sesame oil",
//           "Coconut oil",
//           "Mustard oil",
//           "Olive oil",
//           "A mix of different oils"
//         ], // Removed "I am not sure"
//         dependsOn: { id: "who_cooks", values: ["I cook for myself", "A family member cooks", "We have a cook or maid"] }
//       },
//       {
//         id: "oil_processing",
//         label: "Is the oil you use cold-pressed (kachi ghani) or refined?",
//         type: "radio",
//         options: ["Cold-pressed (Unrefined)", "Refined"], // Removed "I am not sure"
//         dependsOn: {
//           id: "oil_base",
//           values: ["Sunflower oil", "Groundnut oil", "Sesame oil", "Coconut oil", "Mustard oil", "Olive oil", "A mix of different oils"]
//         }
//       }
//     ]
//   },

//   // --- 6. SLEEP QUALITY ---
//   {
//     id: "section_6",
//     title: "6. Sleep Quality",
//     questions: [
//       {
//         id: "bed_time",
//         label: "What time do you usually go to bed?",
//         type: "select",
//         options: [
//           "Between 9 PM and 10 PM",
//           "Between 10 PM and 11 PM",
//           "Between 11 PM and 12 AM",
//           "Late night (After 12 AM)"
//         ]
//       },
//       {
//         id: "sleep_hours",
//         label: "How many hours of sleep do you usually get?",
//         type: "select",
//         options: ["Less than 5 hours", "5 to 6 hours", "6 to 7 hours", "7 to 8 hours", "More than 8 hours"]
//       },
//       {
//         id: "sleep_quality",
//         label: "Do you wake up feeling refreshed?",
//         type: "radio",
//         options: [
//           "Yes, completely refreshed",
//           "I feel okay",
//           "No, I still feel tired",
//           "I struggle to sleep well"
//         ]
//       },
//       {
//         id: "wake_method",
//         label: "Do you usually wake up naturally or do you rely on an alarm?",
//         type: "radio",
//         options: ["I wake up naturally", "I need an alarm clock"]
//       },
//       {
//         id: "snoring_history",
//         label: "Do you snore loudly during your sleep?",
//         type: "radio",
//         options: ["Yes", "No"] // Removed "I am not sure"
//       },
//       {
//         id: "screen_use",
//         label: "Do you use your mobile, laptop, or watch TV right before falling asleep?",
//         type: "radio",
//         options: ["Rarely", "Sometimes", "Often", "Almost every night"]
//       },
//       {
//         id: "racing_thoughts",
//         label: "As you try to sleep, how often do you find yourself worrying about the next day's tasks?",
//         type: "radio",
//         options: ["Rarely", "Sometimes", "Almost every night"]
//       },
//       {
//         id: "daytime_sleepiness",
//         label: "Do you often feel sleepy or sluggish during the daytime?",
//         type: "radio",
//         options: ["No, I stay energetic", "Only after lunch", "Yes, throughout the day"]
//       }
//     ]
//   },

//   // --- 7. DIGESTION & GUT HEALTH ---
//   {
//     id: "section_7",
//     title: "7. Digestion & Gut Health",
//     questions: [
//       {
//         id: "acidity_issues",
//         label: "Do you frequently experience acidity, heartburn, or sour burps?",
//         type: "radio",
//         options: ["No", "Only after eating spicy or heavy food", "Often", "Almost every day"]
//       },
//       {
//         id: "bloating_gas",
//         label: "Do you feel bloated or unusually heavy after eating?",
//         type: "radio",
//         options: ["Rarely", "Sometimes", "Often in the evenings", "Almost after every meal"]
//       },
//       {
//         id: "bowel_movement",
//         label: "How would you describe your daily bowel movements?",
//         type: "select",
//         options: [
//           "Regular and comfortable",
//           "Hard and constipated",
//           "Often loose or watery",
//           "It constantly switches between hard and loose"
//         ]
//       }
//     ]
//   },

//   // --- 8. MINDFUL EATING & HABITS ---
//   {
//     id: "section_8",
//     title: "8. Eating Style and Mindfulness",
//     questions: [
//       {
//         id: "eating_speed",
//         label: "How quickly do you usually finish your main meals?",
//         type: "select",
//         options: [
//           "Very fast (Under 10 minutes)",
//           "Moderate pace (15 to 20 minutes)",
//           "Slow and relaxed (More than 20 minutes)"
//         ]
//       },
//       {
//         id: "distracted_eating",
//         label: "Do you watch TV or use your phone while eating?",
//         type: "radio",
//         options: [
//           "No, never",
//           "Sometimes",
//           "Yes, almost every meal"
//         ]
//       },
//       {
//         id: "satiety_cue",
//         label: "When do you usually stop eating?",
//         type: "select",
//         options: [
//           "When I feel light or about 80 percent full",
//           "When I feel completely stuffed",
//           "I tend to overeat until I feel heavy"
//         ]
//       },
//       {
//         id: "chewing_habit",
//         label: "Do you chew your food thoroughly?",
//         type: "radio",
//         options: [
//           "Yes, I take my time",
//           "Sometimes",
//           "No, I tend to swallow or gulp quickly"
//         ]
//       },
//       {
//         id: "water_during_meals",
//         label: "Do you drink water while having your meals?",
//         type: "select",
//         options: [
//           "No, I avoid water during meals",
//           "I take a few sips if needed",
//           "Yes, I drink a glass or more"
//         ]
//       }
//     ]
//   },

//   // --- 9. FOOD PRACTICES & MEAL TIMINGS ---
//   {
//     id: "section_9",
//     title: "9. Food Practices and Routine",
//     questions: [
//       {
//         id: "breakfast_time_actual",
//         label: "What time do you usually eat breakfast?",
//         type: "select",
//         options: [
//           "Before 8:00 AM",
//           "8:00 AM to 9:00 AM",
//           "9:00 AM to 10:00 AM",
//           "After 10:00 AM",
//           "I usually skip breakfast"
//         ]
//       },
//       {
//         id: "lunch_time_actual",
//         label: "What time do you usually eat lunch?",
//         type: "select",
//         options: [
//           "Before 1:00 PM",
//           "1:00 PM to 2:00 PM",
//           "2:00 PM to 3:00 PM",
//           "After 3:00 PM"
//         ]
//       },
//       {
//         id: "dinner_time_actual",
//         label: "What time do you usually eat dinner?",
//         type: "select",
//         options: [
//           "Before 7:00 PM",
//           "7:00 PM to 8:00 PM",
//           "8:00 PM to 9:00 PM",
//           "9:00 PM to 10:00 PM",
//           "After 10:00 PM"
//         ]
//       },
//       {
//         id: "high_carb_freq",
//         label: "How often do you eat carbohydrate-rich foods like rice, roti, bread, or potatoes?",
//         type: "select",
//         options: [
//           "With every single meal",
//           "Once or twice a day",
//           "Rarely"
//         ]
//       },
//       {
//         id: "greens_intake",
//         label: "How often do you include leafy greens or fresh vegetables in your meals?",
//         type: "select",
//         options: [
//           "Daily",
//           "A few times a week",
//           "Rarely"
//         ]
//       },
//       {
//         id: "veggie_storage",
//         label: "How long do you usually store vegetables in the fridge before cooking them?",
//         type: "select",
//         options: [
//           "I buy and cook fresh daily",
//           "2 to 3 days",
//           "4 to 6 days",
//           "More than a week"
//         ]
//       },
//       {
//         id: "cold_drinks_carbonated",
//         label: "How often do you consume cold carbonated drinks or sodas?",
//         type: "select",
//         options: ["Never", "Occasionally", "A few times a week", "Daily"]
//       },
//       {
//         id: "cold_drinks_juices",
//         label: "How often do you consume fresh or packaged fruit juices?",
//         type: "select",
//         options: ["Never", "Occasionally", "A few times a week", "Daily"]
//       },
//       {
//         id: "hot_beverage_freq",
//         label: "How many cups of tea or coffee do you drink in a day?",
//         type: "select",
//         options: [
//           "None",
//           "1 to 2 cups",
//           "3 cups",
//           "More than 3 cups"
//         ]
//       },
//       {
//         id: "hot_beverage_exact",
//         label: "Please enter the exact number of cups you drink daily:",
//         type: "number",
//         dependsOn: { id: "hot_beverage_freq", values: ["More than 3 cups"] }
//       },
//       {
//         id: "bakery_snacks",
//         label: "How often do you eat biscuits, cookies, or bakery items?",
//         type: "select",
//         options: ["Never", "Occasionally", "Daily with tea or coffee"]
//       }
//     ]
//   },

//   // --- 10. SOAKING & PREP ---
//   {
//     id: "section_10",
//     title: "10. Soaking and Preparation Habits",
//     questions: [
//       {
//         id: "cook_legumes",
//         label: "Do you regularly cook whole legumes like rajma, chana, or whole dals?",
//         type: "radio",
//         options: ["Yes", "No"]
//       },
//       {
//         id: "soak_grains",
//         label: "How do you prepare these legumes before cooking?",
//         type: "select",
//         options: [
//           "I soak them overnight",
//           "I soak them for a short time (1 to 2 hours)",
//           "I cook them directly in a pressure cooker"
//         ],
//         dependsOn: { id: "cook_legumes", values: ["Yes"] }
//       },
//       {
//         id: "consume_nuts",
//         label: "Do you eat nuts and seeds like cashews, peanuts, walnuts, or chia seeds?",
//         type: "radio",
//         options: ["Yes", "No"]
//       },
//       {
//         id: "nuts_prep",
//         label: "How do you usually consume these nuts and seeds?",
//         type: "select",
//         options: [
//           "Raw and dry",
//           "Dry roasted",
//           "Roasted and salted",
//           "Soaked in water"
//         ],
//         dependsOn: { id: "consume_nuts", values: ["Yes"] }
//       },
//       {
//         id: "eat_almonds",
//         label: "Do you specifically eat almonds?",
//         type: "radio",
//         options: ["Yes", "No"]
//       },
//       {
//         id: "soak_almonds",
//         label: "Do you soak your almonds in water before eating them?",
//         type: "radio",
//         options: ["Yes", "No"],
//         dependsOn: { id: "eat_almonds", values: ["Yes"] }
//       },
//       {
//         id: "peel_almonds",
//         label: "Do you peel the skin off the soaked almonds before eating?",
//         type: "radio",
//         options: ["Yes", "No"],
//         dependsOn: { id: "soak_almonds", values: ["Yes"] }
//       }
//     ]
//   },

//   // --- 11. MOVEMENT & FITNESS ---
//   {
//     id: "section_11",
//     title: "11. Movement and Fitness",
//     questions: [
//       {
//         id: "daily_activity",
//         label: "How much dedicated walking or exercise do you do daily?",
//         type: "select",
//         options: [
//           "None",
//           "Light walking (15 to 30 minutes)",
//           "Moderate walking (30 to 45 minutes)",
//           "Active and intense (More than 45 minutes)"
//         ]
//       },
//       {
//         id: "walking_pace",
//         label: "How would you describe your usual walking pace?",
//         type: "select",
//         options: [
//           "Casual strolling",
//           "Brisk walking",
//           "Fast jogging"
//         ],
//         dependsOn: {
//           id: "daily_activity",
//           values: [
//             "Light walking (15 to 30 minutes)",
//             "Moderate walking (30 to 45 minutes)",
//             "Active and intense (More than 45 minutes)"
//           ]
//         }
//       },
//       {
//         id: "practice_yoga",
//         label: "Do you practice Yoga?",
//         type: "radio",
//         options: ["Yes", "No"]
//       },
//       {
//         id: "yoga_frequency",
//         label: "How often do you practice Yoga?",
//         type: "select",
//         options: ["Daily", "A few times a week", "Rarely"],
//         dependsOn: { id: "practice_yoga", values: ["Yes"] }
//       },
//       {
//         id: "go_to_gym",
//         label: "Do you go to a gym or lift weights?",
//         type: "radio",
//         options: ["Yes", "No"]
//       },
//       {
//         id: "gym_frequency",
//         label: "How often do you go to the gym or lift weights?",
//         type: "select",
//         options: ["Daily", "A few times a week", "Rarely"],
//         dependsOn: { id: "go_to_gym", values: ["Yes"] }
//       },
//       {
//         id: "inactivity_reason",
//         label: "What is the main reason that keeps you from being physically active?",
//         type: "select",
//         options: [
//           "I have physical pain or limitations",
//           "My workload is too high",
//           "I feel lazy or lack motivation",
//           "I do not have enough time"
//         ],
//         dependsOn: { id: "daily_activity", values: ["None"] }
//       },
//       {
//         id: "physical_limitations",
//         label: "Could you specify the physical issue that stops you?",
//         type: "select",
//         options: [
//           "Knee or joint pain",
//           "Back pain",
//           "Foot pain or numbness",
//           "Shortness of breath",
//           "Other"
//         ],
//         dependsOn: { id: "inactivity_reason", values: ["I have physical pain or limitations"] }
//       },
//       {
//         id: "other_limitation_details",
//         label: "Please briefly describe your physical limitation:",
//         type: "text",
//         dependsOn: { id: "physical_limitations", values: ["Other"] }
//       }
//     ]
//   },

//   // --- 12. SOCIAL & EMOTIONAL SUPPORT ---
//   {
//     id: "section_12",
//     title: "12. Social Connection",
//     questions: [
//       {
//         id: "social_support",
//         label: "When you feel low or stressed, do you have someone to console you?",
//         type: "radio",
//         options: [
//           "Yes, I have strong support",
//           "Sometimes",
//           "No, I mostly keep to myself"
//         ]
//       },
//       {
//         id: "laugh_loudly",
//         label: "How often do you get the opportunity to laugh loudly and genuinely?",
//         type: "select",
//         options: [
//           "Daily",
//           "A few times a week",
//           "Rarely",
//           "I can't remember the last time"
//         ]
//       }
//     ]
//   },

//   // --- 13. STRESS & MENTAL LOAD ---
//   {
//     id: "section_13",
//     title: "13. Stress and Mental Load",
//     questions: [
//       {
//         id: "work_pressure",
//         label: "Does your work or daily routine cause you significant mental stress?",
//         type: "radio",
//         options: [
//           "No, I feel secure and relaxed",
//           "Sometimes, during deadlines or busy days",
//           "Often, it is high pressure",
//           "I feel constant burnout or anxiety"
//         ]
//       },
//       {
//         id: "home_environment",
//         label: "Is your home environment currently a source of stress?",
//         type: "radio",
//         options: [
//           "No, it is my safe space",
//           "Occasionally stressful",
//           "Frequently tense",
//           "Constant conflict or stress"
//         ]
//       },
//       {
//         id: "mental_calm",
//         label: "Do you find it hard to calm your mind and stop worrying at the end of the day?",
//         type: "radio",
//         options: [
//           "No, I relax easily",
//           "Sometimes",
//           "Yes, my mind keeps racing",
//           "I rarely feel relaxed"
//         ]
//       },
//       {
//         id: "emotional_eating_trigger",
//         label: "Do you tend to eat more snacks when you are stressed?",
//         type: "radio",
//         options: ["No", "Sometimes", "Yes, often"]
//       }
//     ]
//   },

//   // --- 14. EATING OUT PATTERNS ---
//   {
//     id: "section_14",
//     title: "14. Eating Out Patterns",
//     questions: [
//       {
//         id: "hotel_freq",
//         label: "How often do you take or order hotel food?",
//         type: "select",
//         options: [
//           "Rarely or on special occasions",
//           "Once a week",
//           "2 to 3 times a week",
//           "Daily or almost daily"
//         ]
//       },
//       {
//         id: "fried_general",
//         label: "When eating out, do you often order oily or deep-fried items?",
//         type: "radio",
//         options: ["No, I usually avoid them", "Sometimes", "Yes, almost always"]
//       },
//       {
//         id: "post_meal_caffeine",
//         label: "Do you drink tea or coffee immediately after your meals?",
//         type: "radio",
//         options: ["No, never", "Sometimes", "Yes, it is a habit"]
//       },
//       {
//         id: "dessert_habit",
//         label: "Do you usually order a sweet or dessert after your meal?",
//         type: "radio",
//         options: ["No", "Sometimes", "Yes, always"]
//       }
//     ]
//   },

//   // --- 15. MEAL TIMING & HABITS ---
//   {
//     id: "section_15",
//     title: "15. Meal Timing and Habits",
//     questions: [
//       {
//         id: "meal_sequencing",
//         label: "How do you usually start your main meals?",
//         type: "select",
//         options: [
//           "I eat salad or veggies first",
//           "I start with protein like dal, egg, or paneer",
//           "I mix everything together",
//           "I start with the starchy part like rice or roti"
//         ]
//       },
//       {
//         id: "fruit_habit",
//         label: "When do you typically eat fruits?",
//         type: "select",
//         options: [
//           "With my main meal",
//           "As a mid-meal snack",
//           "Immediately after a meal",
//           "I rarely eat fruits"
//         ]
//       },
//       {
//         id: "fruit_portion",
//         label: "Since you eat whole fruits, what is your usual portion size?",
//         type: "select",
//         options: ["1 small piece or a handful", "1 large fruit or a medium bowl", "A very large bowl or multiple fruits"],
//         dependsOn: { id: "fruit_habit", values: ["With my main meal", "As a mid-meal snack", "Immediately after a meal"] }
//       },
//       {
//         id: "fruit_juice",
//         label: "Do you drink fruit juices?",
//         type: "select",
//         options: [
//           "No, I prefer whole fruits",
//           "Yes, without added sugar",
//           "Yes, with added sugar"
//         ]
//       },
//       {
//         id: "water_habit",
//         label: "Do you drink water during your meals?",
//         type: "select",
//         options: [
//           "No, only sips if needed",
//           "Yes, about 1 glass",
//           "Yes, 2 or more glasses"
//         ]
//       },
//       {
//         id: "daily_hydration",
//         label: "Total daily water intake (approximate)?",
//         type: "select",
//         options: [
//           "Low (Less than 6 glasses)",
//           "Average (6 to 10 glasses)",
//           "High (More than 10 glasses)"
//         ]
//       },
//       {
//         id: "snacking_freq",
//         label: "How often do you snack between meals?",
//         type: "select",
//         options: [
//           "Rarely",
//           "Sometimes when hungry",
//           "Frequently as a habit",
//           "I graze or munch all day"
//         ]
//       },
//       {
//         id: "snack_choices",
//         label: "What do you usually reach for when you snack? (Select all that apply)",
//         type: "checkbox",
//         options: [
//           "Fruits, nuts, or seeds",
//           "Biscuits, cookies, or rusk",
//           "Fried snacks like chips or namkeen",
//           "Chocolates or sweets",
//           "Other"
//         ],
//         dependsOn: { id: "snacking_freq", values: ["Sometimes when hungry", "Frequently as a habit", "I graze or munch all day"] }
//       },
//       // Appended from previous steps to maintain options instead of clocks
//       {
//         id: "breakfast_time_actual",
//         label: "What time do you usually eat breakfast?",
//         type: "select",
//         options: [
//           "Before 8:00 AM",
//           "8:00 AM to 9:00 AM",
//           "9:00 AM to 10:00 AM",
//           "After 10:00 AM",
//           "I usually skip breakfast"
//         ]
//       },
//       {
//         id: "lunch_time_actual",
//         label: "What time do you usually eat lunch?",
//         type: "select",
//         options: [
//           "Before 1:00 PM",
//           "1:00 PM to 2:00 PM",
//           "2:00 PM to 3:00 PM",
//           "After 3:00 PM"
//         ]
//       },
//       {
//         id: "dinner_time_actual",
//         label: "What time do you usually eat dinner?",
//         type: "select",
//         options: [
//           "Before 7:00 PM",
//           "7:00 PM to 8:00 PM",
//           "8:00 PM to 9:00 PM",
//           "9:00 PM to 10:00 PM",
//           "After 10:00 PM"
//         ]
//       }
//     ]
//   },

//   // --- 16. SUNLIGHT & DAILY ROUTINE ---
//   {
//     id: "section_16",
//     title: "16. Sunlight and Daily Routine",
//     questions: [
//       {
//         id: "sunlight_exposure",
//         label: "Do you get a chance to expose yourself to sunlight everyday?",
//         type: "radio",
//         options: [
//           "Yes, almost daily",
//           "A few times a week",
//           "Rarely",
//           "No, I stay indoors"
//         ]
//       }
//     ]
//   }
// ];





















//==============/=====================/==========================/==========================


// --------------------OLDEST--------------------

// export type QuestionType = 'text' | 'number' | 'select' | 'radio' | 'time';

// export interface Question {
//   id: string;
//   label: string;
//   type: QuestionType;
//   required?: boolean;
//   options?: string[];
//   dependsOn?: {
//     id: string;
//     values: (string | number | boolean)[];
//   };
// }

// export interface Section {
//   id: string;
//   title: string;
//   questions: Question[];
//   dependsOn?: {
//     id: string;
//     values: (string | number | boolean)[];
//   };
// }

// export const questionnaire: Section[] = [

//   // --- 1. BASIC PROFILE ---
//   {
//     id: "section_1",
//     title: "1. Basic Profile",
//     questions: [
//       { id: "age", label: "Your age (years)", type: "number", required: true },
//       { id: "gender", label: "Gender", type: "radio", options: ["Male", "Female", "Other"], required: true },
//       {
//         id: "state",
//         label: "Which state do you live in?",
//         type: "select",
//         options: ["Tamil Nadu","Kerala","Karnataka","Andhra Pradesh","Telangana","Maharashtra","Gujarat","West Bengal","Delhi","Other"]
//       },
//       { id: "diet_type", label: "What type of diet do you follow?", type: "radio", options: ["Vegetarian (no eggs)", "Vegetarian (eggs allowed)", "Non-vegetarian", "Vegan"], required: true },
//       { id: "height_cm", label: "Height (cm)", type: "number", required: true },
//       { id: "weight_kg", label: "Weight (kg)", type: "number", required: true }
//     ]
//   },

//   // --- 2. MEDICAL & REPORTS (REORDERED) ---
//   {
//     id: "section_2",
//     title: "2. Medical & Blood Reports",
//     questions: [

//       {
//         id: "has_lab_report",
//         label: "Do you have recent blood test reports available?",
//         type: "radio",
//         options: ["Yes, I have them", "No"]
//       },

//       {
//         id: "report_prompt",
//         label: "We recommend getting a blood test for accurate guidance. Proceeding will give only lifestyle suggestions.",
//         type: "text",
//         dependsOn: { id: "has_lab_report", values: ["No"] }
//       },

//       {
//         id: "diabetes_type",
//         label: "Type of diabetes (as told by your doctor)",
//         type: "select",
//         options: ["Type 2 diabetes","Type 1 diabetes","Pre-diabetes","Gestational","None"],
//         dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] }
//       },

//       {
//         id: "years_since_diagnosis",
//         label: "How long ago were you diagnosed? (years)",
//         type: "number"
//       },

//       {
//         id: "family_history",
//         label: "Family history of diabetes?",
//         type: "select",
//         options: ["No parent diabetic","One parent diabetic","Both parents diabetic"]
//       },

//       // CONDITIONS
//       { id: "has_bp", label: "Do you have High Blood Pressure?", type: "radio", options: ["Yes","No"] },
//       { id: "has_low_bp", label: "Do you have Low Blood Pressure?", type: "radio", options: ["Yes","No"] },
//       { id: "has_cholesterol", label: "Do you have High Cholesterol?", type: "radio", options: ["Yes","No"] },
//       { id: "has_thyroid", label: "Do you have Thyroid problems?", type: "radio", options: ["Yes","No"] },
//       { id: "has_kidney_issue", label: "Do you have Kidney issues?", type: "radio", options: ["Yes","No"] },

//       // MEDICATION (MSQ LOGIC READY)
//       {
//         id: "current_medications",
//         label: "Current treatment methods you follow:",
//         type: "select",
//         options: [
//           "None",
//           "Diet control",
//           "Lifestyle changes",
//           "Tablets (Allopathy)",
//           "Insulin",
//           "Ayurveda",
//           "Homeopathy",
//           "Unani",
//           "Siddha",
//           "Yoga & Naturopathy"
//         ]
//       },

//       // LAB VALUES (EXPANDED BACK)
//       { id: "lab_hba1c", label: "HbA1c (%)", type: "number", dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] } },
//       { id: "lab_fbs", label: "Fasting Blood Sugar (mg/dL)", type: "number", dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] } },
//       { id: "lab_pp", label: "Post Meal Blood Sugar (mg/dL)", type: "number", dependsOn: { id: "has_lab_report", values: ["Yes, I have them"] } },

//       { id: "lab_triglycerides", label: "Triglycerides (mg/dL)", type: "number" },
//       { id: "lab_ldl", label: "LDL (bad cholesterol)", type: "number" },
//       { id: "lab_hdl", label: "HDL (good cholesterol)", type: "number" },
//       { id: "lab_b12", label: "Vitamin B12", type: "number" },
//       { id: "lab_vitd", label: "Vitamin D3", type: "number" },
//       { id: "lab_creatinine", label: "Serum creatinine", type: "number" }
//     ]
//   },

//   // --- 3. WORK ---
//   {
//     id: "section_3",
//     title: "3. Work",
//     questions: [
//       {
//         id: "occupation",
//         label: "Your daily role?",
//         type: "select",
//         options: ["Office job","Work from home","Field work","Homemaker","Student","Retired"]
//       },
//       {
//         id: "work_hours",
//         label: "Daily occupied hours?",
//         type: "select",
//         options: ["< 8","8–10","10–12","> 12"]
//       },
//       {
//         id: "work_stress",
//         label: "Stress level in work?",
//         type: "select",
//         options: ["Low","Moderate","High","Very high"]
//       }
//     ]
//   },

//   // --- 4. SLEEP ---
//   {
//     id: "section_4",
//     title: "4. Sleep",
//     questions: [
//       { id: "bed_time", label: "What time do you go to bed?", type: "select", options: ["9-10","10-11","11-12","Late night"] },
//       { id: "wake_alarm", label: "Do you use alarm to wake up?", type: "radio", options: ["Yes","No"] },
//       { id: "day_sleepy", label: "Do you feel sleepy during daytime?", type: "radio", options: ["Yes","No"] },
//       { id: "next_day_thoughts", label: "Do you think about next day tasks while sleeping?", type: "radio", options: ["Yes","No"] },
//       { id: "screen_use", label: "Do you use mobile/TV/laptop before sleep?", type: "radio", options: ["Yes","No"] }
//     ]
//   },

//   // --- 5. KITCHEN + FOOD HABITS ---
//   {
//     id: "section_5",
//     title: "5. Food & Kitchen",
//     questions: [
//       { id: "who_cooks", label: "Who cooks for you?", type: "select", options: ["Self","Family","Cook","Mess/Hotel"] },
//       { id: "hotel_food", label: "How often do you eat outside food?", type: "select", options: ["Rarely","Weekly","2-3 times/week","Daily"] },
//       { id: "fried_food", label: "Do you eat oily/deep fried food?", type: "select", options: ["Rarely","Sometimes","Often"] },
//       { id: "fruit_intake", label: "Do you eat fruits daily?", type: "radio", options: ["Yes","No"] },
//       { id: "fruit_qty", label: "How many fruits per day?", type: "number", dependsOn: { id: "fruit_intake", values: ["Yes"] } },
//       { id: "water_meal", label: "Do you drink water during meals?", type: "radio", options: ["Yes","No"] },
//       { id: "snacking", label: "Do you snack frequently?", type: "radio", options: ["Yes","No"] }
//     ]
//   },

//   // --- 6. DIGESTION ---
//   {
//     id: "section_6",
//     title: "6. Digestion",
//     questions: [
//       { id: "acidity", label: "Do you have acidity?", type: "radio", options: ["Yes","No"] },
//       { id: "bloating", label: "Do you feel bloated?", type: "radio", options: ["Yes","No"] }
//     ]
//   },

//   // --- 7. SOAKING ---
//   {
//     id: "section_7",
//     title: "7. Soaking Habits",
//     questions: [
//       { id: "eat_legumes", label: "Do you eat legumes (chana, rajma)?", type: "radio", options: ["Yes","No"] },
//       { id: "soak_legumes", label: "Do you soak them?", type: "radio", options: ["Yes","No"], dependsOn: { id: "eat_legumes", values: ["Yes"] } },
//       { id: "eat_almonds", label: "Do you eat almonds?", type: "radio", options: ["Yes","No"] },
//       { id: "soak_almonds", label: "Do you soak almonds?", type: "radio", options: ["Yes","No"], dependsOn: { id: "eat_almonds", values: ["Yes"] } }
//     ]
//   },

//   // --- 8. PHYSICAL ACTIVITY ---
//   {
//     id: "section_8",
//     title: "8. Physical Activity",
//     questions: [
//       { id: "walk", label: "Do you walk daily?", type: "radio", options: ["Yes","No"] },
//       { id: "walk_time", label: "Walking duration?", type: "select", options: ["<15","15-30","30-45",">45"], dependsOn: { id: "walk", values: ["Yes"] } },
//       { id: "gym", label: "Do you go to gym/yoga?", type: "radio", options: ["Yes","No"] },
//       { id: "activity_block", label: "What stops you from being active?", type: "select", options: ["No issue","Pain","Workload","Laziness"] }
//     ]
//   },

//   // --- 9. SOCIAL ---
//   {
//     id: "section_9",
//     title: "9. Social",
//     questions: [
//       { id: "support", label: "Do you have someone to console you?", type: "radio", options: ["Yes","No"] },
//       { id: "laugh", label: "How often do you laugh loudly?", type: "select", options: ["Daily","Few times/week","Rarely"] }
//     ]
//   },

//   // --- 10. STRESS ---
//   {
//     id: "section_10",
//     title: "10. Stress",
//     questions: [
//       { id: "stress_level", label: "Overall stress level?", type: "select", options: ["Low","Moderate","High"] },
//       { id: "stress_eating", label: "Do you eat more snacks when stressed?", type: "radio", options: ["Yes","No"] },
//       { id: "life_event", label: "Major life event before issue?", type: "select", options: ["No","Loss","Financial","Marriage/Child","Health issue"] }
//     ]
//   },

//   // --- 11. SUNLIGHT ---
//   {
//     id: "section_11",
//     title: "11. Sunlight",
//     questions: [
//       { id: "sunlight", label: "Do you get sunlight daily?", type: "radio", options: ["Yes","No"] },
//       { id: "vitd", label: "Do you take Vitamin D supplements?", type: "radio", options: ["Yes","No"] }
//     ]
//   }

// ];