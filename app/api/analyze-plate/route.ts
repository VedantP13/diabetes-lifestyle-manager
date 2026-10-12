import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

export async function POST(req: Request) {
    try {
        const { image, userProfile } = await req.json();

        // Clean the base64 string to remove the data URL prefix
        const base64Data = image.split(',')[1];

        // Vision tasks strictly require gemini-1.5-flash (or pro)
        const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });

        const prompt = `
      You are a clinical diabetes nutritionist. Analyze this food plate photo.
      
      User Profile Constraints:
      - Region/Cuisine: ${userProfile.region}
      - Conditions: ${userProfile.conditions.join(', ')}
      - Diet: ${userProfile.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}

      Evaluate the plate for:
      1. Identified food items.
      2. Estimated Glycemic impact (Low, Moderate, High).
      3. Practical corrective coaching (e.g., portion adjustments, sequence changes like fiber first).

      Return ONLY a raw JSON object (no markdown, no backticks) matching this exact format:
      {
        "recognizedItems": ["String", "String"],
        "glycemicRisk": "Low" | "Moderate" | "High",
        "estimatedCarbs": Number,
        "estimatedProtein": Number,
        "feedback": "Encouraging, highly clinical, concise correction or validation.",
        "actionTip": "Quick actionable sequencing or portion tip for this specific meal."
      }
    `;

        const t0 = Date.now();

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: 'image/jpeg' // Assuming jpeg for standard camera captures
                },
            },
        ]);

        // 2. Calculate elapsed time
        const ms = Date.now() - t0; 
        const u = result.response.usageMetadata;
        
        // 3. Update the route label to match the feature
        console.log('METRIC ' + JSON.stringify({ 
            route: 'plate_scan', 
            ms: ms, 
            inTok: u?.promptTokenCount, 
            outTok: u?.candidatesTokenCount 
        }));
        
        let text = result.response.text();
        // Clean potential markdown blocks
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return NextResponse.json(JSON.parse(text));
    } catch (error) {
        console.error('Plate Scanner Error:', error);
        return NextResponse.json({ error: 'Failed to analyze plate.' }, { status: 500 });
    }
}