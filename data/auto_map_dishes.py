import json
import difflib
import re

# 1. Load the Open-Source Nutritional Database
with open('master_food_database.json', 'r', encoding='utf-8') as f:
    food_db = json.load(f)

with open('dishes_data.json', 'r', encoding='utf-8') as f:
    app_dishes = json.load(f)

verified_names = [item['food_name'] for item in food_db]
name_to_code = {item['food_name']: item['food_code'] for item in food_db}

def clean_dish_name(name):
    # Remove anything inside parentheses, e.g., "Idli (No Chutney)" -> "Idli"
    name = re.sub(r'\(.*?\)', '', name)
    return name.strip()

print("Starting Interactive Mapping...")
print("If the script isn't sure, it will ask you for help.\n")

for dish in app_dishes:
    original_name = dish['name']
    cleaned_name = clean_dish_name(original_name)
    
    # We changed this to an array to support combo meals
    dish['food_codes'] = [] 
    dish['AI_MATCHED_NAMES'] = []
    
    # Split combo meals by "+" or "with"
    components = re.split(r'\s*\+\s*|\s+with\s+', cleaned_name, flags=re.IGNORECASE)
    
    for comp in components:
        comp = comp.strip()
        if not comp: continue
        
        # STRICT Match (80% similarity required)
        matches = difflib.get_close_matches(comp, verified_names, n=5, cutoff=0.8)
        
        if matches:
            best_match = matches[0]
            dish['food_codes'].append(name_to_code[best_match])
            dish['AI_MATCHED_NAMES'].append(best_match)
        else:
            # INTERACTIVE FALLBACK: Ask you in the terminal
            print(f"\n⚠️  No exact match for part of: '{original_name}'")
            print(f"Specifically looking for: '{comp}'")
            search_term = input("Enter a keyword to search the database (or press Enter to skip): ").strip()
            
            if search_term:
                # Loose search based on your keyword
                search_matches = [name for name in verified_names if search_term.lower() in name.lower()]
                if search_matches:
                    print("Found these options:")
                    for i, sm in enumerate(search_matches[:5]): # show top 5
                        print(f"  [{i}] {sm}")
                    
                    choice = input("Enter the number of the best match (or press Enter to skip): ").strip()
                    if choice.isdigit() and int(choice) < len(search_matches[:5]):
                        selected_match = search_matches[int(choice)]
                        dish['food_codes'].append(name_to_code[selected_match])
                        dish['AI_MATCHED_NAMES'].append(selected_match)
                else:
                    print("No matches found for that keyword. Skipping.")

# Clean up old key if it exists
for dish in app_dishes:
    if 'food_code' in dish:
        del dish['food_code']

# Save the mapped data
with open('dishes_mapped.json', 'w', encoding='utf-8') as f:
    json.dump(app_dishes, f, indent=4)

print("\nSuccess! Check dishes_mapped.json for your highly accurate mapping.")