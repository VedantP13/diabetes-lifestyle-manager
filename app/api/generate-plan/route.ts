// // app/api/generate-plan/route.ts
// import { NextResponse } from 'next/server';
// import { GoogleGenAI } from '@google/genai';

// // Initialize the Google Gen AI SDK
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// // Helper to retry on 503 (Server Busy) errors
// async function generateWithRetry(config: any, maxRetries = 3) {
//   let attempt = 0;
//   let delay = 1500; 

//   while (attempt < maxRetries) {
//     try {
//       return await ai.models.generateContent(config);
//     } catch (error: any) {
//       attempt++;
//       if (error?.status === 503 && attempt < maxRetries) {
//         console.warn(`[AI Engine] API busy. Retrying attempt ${attempt} in ${delay}ms...`);
//         await new Promise(resolve => setTimeout(resolve, delay));
//         delay *= 2; 
//       } else {
//         throw error;
//       }
//     }
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { answers } = await request.json();

//     if (!answers || Object.keys(answers).length === 0) {
//       return NextResponse.json({ error: 'No user data provided' }, { status: 400 });
//     }

//     // 1. Construct the System Prompt with Strict Lifestyle Boundaries
//     const systemInstruction = `
//       You are an expert Holistic Lifestyle and Nutrition Coach specializing in Indian wellness traditions, habit optimization, and metabolic balance.
//       Your task is to analyze the user's lifestyle and daily habits to generate a personalized, 7-day routine and diet guide.
      
//       CRITICAL SAFETY BOUNDARIES:
//       - DO NOT provide any medical advice, clinical diagnoses, treatment plans, or health assessments.
//       - NEVER suggest, mention, recommend, or talk about medicines, pharmaceutical drugs, insulin dosages, or medical supplements. 
//       - Focus entirely on non-clinical lifestyle practices: meal timing, food sequencing, whole-food Indian meal choices, physical movement habits, sleep hygiene, and stress-reduction techniques.
//       - Always frame suggestions around daily habit adjustments rather than medical treatments.

//       User Data:
//       ${JSON.stringify(answers, null, 2)}
      
//       INSTRUCTIONS:
//       1. Calculate their BMI based on height and weight.
//       2. Identify their lifestyle/metabolic archetype (e.g., "High-Stress Sedentary Professional", "Irregular Meal Timing Routine").
//       3. Generate a culturally appropriate, 7-day Indian meal guide matching their vegetarian/non-vegetarian preferences with balanced fiber and protein.
//       4. Create a daily habit routine timeline optimizing for circadian rhythm and their stated wake/sleep schedule.
//       5. Perform a habit audit highlighting 3 lifestyle habits from their answers and suggesting easy behavioral swaps.
      
//       YOU MUST RETURN EXACTLY THIS JSON STRUCTURE AND NOTHING ELSE:
//       {
//         "userProfile": {
//           "age": [number],
//           "gender": "[string]",
//           "region": "[string, e.g., 'Maharashtra']",
//           "bmi": [number],
//           "diabetesType": "[string]",
//           "dietType": "[string]",
//           "isVegetarian": [boolean],
//           "conditions": ["[string]"],
//           "stressLevel": "[string]", 
//           "digestiveIssues": ["[string]"],
//           "activityLevel": "[string]"
//         },
//         "phenotype": {
//           "type": "[string, e.g., 'Sedentary & Late-Night Snacker']",
//           "description": "[1-2 sentences focusing purely on lifestyle patterns]",
//           "focusAreas": ["[string]", "[string]", "[string]"]
//         },
//         "plan": [
//           // Array of exactly 7 objects representing Day 1 to Day 7
//           {
//             "day": 1,
//             "breakfast": { "id": "b1", "name": "[Dish Name]", "calories": [num], "protein": [num], "carbs": [num], "fat": [num], "fiber": [num], "type": "veg or non-veg" },
//             "lunch": { "id": "l1", "name": "[Dish Name]", "calories": [num], "protein": [num], "carbs": [num], "fat": [num], "fiber": [num], "type": "veg or non-veg" },
//             "snack": { "id": "s1", "name": "[Dish Name]", "calories": [num], "protein": [num], "carbs": [num], "fat": [num], "fiber": [num], "type": "veg or non-veg" },
//             "dinner": { "id": "d1", "name": "[Dish Name]", "calories": [num], "protein": [num], "carbs": [num], "fat": [num], "fiber": [num], "type": "veg or non-veg" }
//           }
//         ],
//         "routine": [
//           // Array of 4-6 key daily lifestyle routine events
//           { "time": "07:00 AM", "activity": "[string]", "reason": "[string]", "category": "Morning" },
//           { "time": "01:00 PM", "activity": "[string]", "reason": "[string]", "category": "Afternoon" }
//         ],
//         "audit": [
//           // Array of 3 lifestyle habit audits based on their actual inputs
//           { "habit": "[Everyday habit they mentioned]", "impact": "[How it impacts daily energy or metabolic wellness]", "suggestion": "[Behavioral practice change]", "type": "Warning" }
//         ],
//         "transformationReport": {
//           "summary": "[A warm, encouraging paragraph summarizing their new daily routine and habit goals]",
//           "keyMetrics": ["[string]", "[string]", "[string]"]
//         }
//       }
//     `;

//     // 2. Call the AI with strictly enforced JSON output
//     const response = await generateWithRetry({
//       model: 'gemini-3.5-flash-lite',
//       contents: [
//         {
//           role: 'user',
//           parts: [{ text: systemInstruction }]
//         }
//       ],
//       config: {
//         responseMimeType: "application/json",
//         temperature: 0.2,
//       }
//     });

//     const text = response?.text || "{}";
//     const result = JSON.parse(text);

//     return NextResponse.json(result);

//   } catch (error) {
//     console.error('Error generating AI plan:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate lifestyle plan. Servers might be overloaded.' }, 
//       { status: 500 }
//     );
//   }
// }


// app/api/generate-plan/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateWithRetry(config: any, maxRetries = 3) {
  let attempt = 0;
  let delay = 1500; 

  while (attempt < maxRetries) {
    try {
      return await ai.models.generateContent(config);
    } catch (error: any) {
      attempt++;
      if (error?.status === 503 && attempt < maxRetries) {
        console.warn(`[AI Engine] API busy. Retrying attempt ${attempt} in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; 
      } else {
        throw error;
      }
    }
  }
}

export async function POST(request: Request) {
  try {
    const { profile } = await request.json();

    if (!profile) {
      return NextResponse.json({ error: 'No user profile provided' }, { status: 400 });
    }

    const systemInstruction = `
      You are an expert Holistic Lifestyle and Nutrition Coach specializing in Indian wellness traditions, habit optimization, and metabolic balance.
      Your task is to analyze the user's complete clinical and lifestyle profile to generate a personalized, 7-day routine and diet guide.
      
      CRITICAL SAFETY BOUNDARIES:
      - DO NOT provide any medical advice, clinical diagnoses, treatment plans, or health assessments.
      - NEVER suggest, mention, recommend, or talk about medicines, pharmaceutical drugs, insulin dosages, or medical supplements. 
      - Focus entirely on non-clinical lifestyle practices.

      User Profile Data:
      ${JSON.stringify(profile, null, 2)}
      
      INSTRUCTIONS:
      1. Identify their lifestyle/metabolic archetype (e.g., "High-Stress Sedentary Professional").
      2. Generate a culturally appropriate, 7-day Indian meal guide matching their vegetarian/non-vegetarian preferences with balanced fiber and protein.
      3. Create a daily habit routine timeline optimizing for circadian rhythm and their stated wake/sleep schedule.
      4. Perform a habit audit highlighting 3 lifestyle habits from their answers and suggesting easy behavioral swaps.
      5. CHRONONUTRITION SEQUENCING: For every meal, provide a "sequence" array of exactly 3 practical steps detailing the order of consumption to minimize glucose spikes (Step 1: Fiber/Veggies, Step 2: Protein/Fats, Step 3: Carbohydrates).
      
      YOU MUST RETURN EXACTLY THIS JSON STRUCTURE AND NOTHING ELSE (DO NOT INCLUDE userProfile):
      {
        "phenotype": {
          "type": "[string, e.g., 'Sedentary & Late-Night Snacker']",
          "description": "[1-2 sentences focusing purely on lifestyle patterns]",
          "focusAreas": ["[string]", "[string]", "[string]"]
        },
        "plan": [
          {
            "day": 1,
            "breakfast": { "id": "b1", "name": "[Dish Name]", "calories": [num], "protein": [num], "carbs": [num], "fat": [num], "fiber": [num], "type": "veg or non-veg", "sequence": ["[string]", "[string]", "[string]"] },
            "lunch": { "id": "l1", "name": "[Dish Name]", "calories": [num], "protein": [num], "carbs": [num], "fat": [num], "fiber": [num], "type": "veg or non-veg", "sequence": ["[string]", "[string]", "[string]"] },
            "snack": { "id": "s1", "name": "[Dish Name]", "calories": [num], "protein": [num], "carbs": [num], "fat": [num], "fiber": [num], "type": "veg or non-veg", "sequence": ["[string]", "[string]", "[string]"] },
            "dinner": { "id": "d1", "name": "[Dish Name]", "calories": [num], "protein": [num], "carbs": [num], "fat": [num], "fiber": [num], "type": "veg or non-veg", "sequence": ["[string]", "[string]", "[string]"] }
          }
        ],
        "routine": [
          { "time": "07:00 AM", "activity": "[string]", "reason": "[string]", "category": "Morning" }
        ],
        "audit": [
          { "habit": "[Everyday habit they mentioned]", "impact": "[How it impacts daily energy or metabolic wellness]", "suggestion": "[Behavioral practice change]", "type": "Warning" }
        ],
        "transformationReport": {
          "summary": "[A warm, encouraging paragraph summarizing their new daily routine and habit goals]",
          "keyMetrics": ["[string]", "[string]", "[string]"]
        }
      }
    `;

    const t0 = Date.now();
    
    const response = await generateWithRetry({
      model: 'gemini-3.5-flash-lite',
      contents: [{ role: 'user', parts: [{ text: systemInstruction }] }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      }
    });

    const ms = Date.now() - t0;
    const u = response?.usageMetadata;
    
    console.log('METRIC ' + JSON.stringify({
        route: 'generate_plan',
        ms: ms,
        inTok: u?.promptTokenCount,
        outTok: u?.candidatesTokenCount
    }));

    const text = response?.text || "{}";
    const result = JSON.parse(text);

    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate lifestyle plan.' }, 
      { status: 500 }
    );
  }
}