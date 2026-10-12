import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

export async function POST(req: Request) {
  try {
    const { mealName, userProfile } = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });   

    const prompt = `
      You are a specialized clinical nutritionist and chef.
      Provide a highly concise, authentic recipe for: "${mealName}".
      
      User Constraints:
      - Region/Cuisine Preference: ${userProfile.region}
      - Diet: ${userProfile.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
      - Medical Conditions: ${userProfile.conditions.join(', ')}
      - Digestive Issues: ${userProfile.digestiveIssues?.join(', ') || 'None'}

      Format strictly using Markdown:
      **Ingredients** (Use exact measurements, swap contraindicated ingredients safely)
      - ...
      
      **Instructions** (Keep it under 4 short steps)
      1. ...
      2. ...
      3. ...
      Do not include intro or outro text. Keep it completely factual, brief, and optimized for mobile reading.
    `;

    const t0 = Date.now();

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // 2. Calculate elapsed time
    const ms = Date.now() - t0;
    const u = result.response.usageMetadata;
    
    // 3. Update the route label to match the feature
    console.log('METRIC ' + JSON.stringify({ 
        route: 'generate_recipe', 
        ms: ms,
        inTok: u?.promptTokenCount, 
        outTok: u?.candidatesTokenCount
    }));

    return NextResponse.json({ recipe: text });
  } catch (error) {
    console.error('Error generating recipe:', error);
    return NextResponse.json(
      { recipe: 'Unable to generate recipe at this time. Please check your connection.' },
      { status: 500 }
    );
  }
}