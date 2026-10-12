import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

export async function POST(req: Request) {
    try {
        const { prompt, slot, userProfile } = await req.json();
        const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });

        const sysPrompt = `
      You are a clinical diabetes nutritionist. A user wants to swap their ${slot} with a custom request: "${prompt}".
      
      User Profile: 
      - Region: ${userProfile.region}
      - Diet: ${userProfile.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
      - Conditions: ${userProfile.conditions.join(', ')}
      - Digestion: ${userProfile.digestiveIssues?.join(', ') || 'None'}

      CRITICAL SAFETY RULES:
      - If they have a Kidney Issue, ingredients MUST be low in potassium and phosphorus.
      - If they have Acidity, the dish MUST NOT be spicy or highly acidic.
      - Must remain diabetes-friendly (Low or Medium GI).

      Return ONLY a raw, valid JSON object matching this exact structure (no markdown formatting, no backticks, no intro text):
      {
        "id": "ai_custom_${Date.now()}",
        "name": "Creative but descriptive dish name",
        "description": "Short explanation of the dish and why it fits their specific constraints.",
        "tags": ["Custom", "Diabetes-Friendly"],
        "gi": "Low",
        "macros": { "calories": 350, "protein": 15, "carbs": 30, "fat": 12, "fiber": 8 }
      }
    `;

        const t0 = Date.now();

        const result = await model.generateContent(sysPrompt);
        let text = result.response.text();

        // Clean markdown blocks if the AI accidentally includes them
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // 2. Calculate elapsed time
        const ms = Date.now() - t0;
        const u = result.response.usageMetadata;

        // 3. Update the route label to match the feature
        console.log('METRIC ' + JSON.stringify({
            route: 'smart_swap',
            ms: ms,
            inTok: u?.promptTokenCount,
            outTok: u?.candidatesTokenCount
        }));

        const meal = JSON.parse(text);
        return NextResponse.json({ meal });
    } catch (error) {
        console.error('Smart Swap Error:', error);
        return NextResponse.json({ error: 'Failed to generate swap' }, { status: 500 });
    }
}