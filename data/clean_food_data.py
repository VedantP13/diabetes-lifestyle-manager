import pandas as pd

# 1. Load the datasets
print("Loading datasets...")
df_recipes = pd.read_excel('INDB.xlsx') 
df_raw = pd.read_excel('ifct2017_compositions.xlsx') 

# 2. Clean the Cooked Recipes Dataset
print("Cleaning recipe data...")
# Added 'freesugar_g' for diabetes tracking
recipe_columns = [
    'food_code', 'food_name', 'energy_kcal', 
    'protein_g', 'carb_g', 'fat_g', 'fibre_g', 'freesugar_g'
]
clean_recipes = df_recipes[recipe_columns].copy()
clean_recipes['data_source'] = 'INDB Open Source'


# 3. Clean the Raw Ingredients Dataset
print("Cleaning raw ingredient data...")
# IFCT 2017 standard tags
raw_column_mapping = {
    'code': 'food_code',
    'name': 'food_name',
    'enerc': 'energy_kcal',
    'protcnt': 'protein_g',
    'choavldf': 'carb_g', # Note: This is 'Available Carbohydrate' (Net Carbs)
    'fatce': 'fat_g',
    'fibtg': 'fibre_g'
}

# Only select columns that actually exist in the raw dataset to prevent errors
available_raw_cols = [col for col in raw_column_mapping.keys() if col in df_raw.columns]
clean_raw = df_raw[available_raw_cols].copy()

# Rename to match standard columns
clean_raw.rename(columns=raw_column_mapping, inplace=True)

# Diabetes Logic: Handle Free Sugars for raw ingredients
# If the raw dataset has a sugar column (like 'sugar' or 'fsugar'), use it.
# Otherwise, default to 0.0 for raw, unprocessed ingredients.
if 'fsugar' in df_raw.columns:
    clean_raw['freesugar_g'] = df_raw['fsugar']
elif 'sugar' in df_raw.columns:
    clean_raw['freesugar_g'] = df_raw['sugar']
else:
    clean_raw['freesugar_g'] = 0.0

clean_raw['data_source'] = 'ICMR-NIN IFCT 2017'


# 4. Merge the two datasets
print("Merging datasets...")
# Stack them together
master_food_db = pd.concat([clean_raw, clean_recipes], ignore_index=True)

# 5. Data Validation / Cleaning (Ensure no NaN values break the app math)
# Fill any missing numerical values with 0.0
numeric_cols = ['energy_kcal', 'protein_g', 'carb_g', 'fat_g', 'fibre_g', 'freesugar_g']
master_food_db[numeric_cols] = master_food_db[numeric_cols].fillna(0.0)

# Round all numbers to 2 decimal places for clean UI display
master_food_db[numeric_cols] = master_food_db[numeric_cols].round(2)

# 6. Export to CSV
print("Exporting to CSV...")
master_food_db.to_csv('master_food_database.csv', index=False)
print("Success! Saved as master_food_database.csv")

# 7. Export to JSON for Next.js Native Import
print("Exporting to JSON...")
master_food_db.to_json('master_food_database.json', orient='records', indent=4)
print("Success! Saved as master_food_database.json")