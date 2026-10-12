import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

export async function POST(req: Request) {
  try {
    const { history, userProfile, todaysPlan } = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });

    // 1. Establish strict context and guardrails
    const systemInstruction = `
      You are the user's personal Metabolic Guide embedded in their lifestyle app. 
      You are speaking directly to them. 
      
      USER CONTEXT:
      - Region: ${userProfile.region}
      - Diet: ${userProfile.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
      - Medical Conditions: ${userProfile.conditions.join(', ')}
      - Digestive Issues: ${userProfile.digestiveIssues?.join(', ') || 'None'}
      - Today's Routine: 
        Breakfast: ${todaysPlan.breakfast.name}
        Lunch: ${todaysPlan.lunch.name}
        Dinner: ${todaysPlan.dinner.name}

      RULES:
      1. Be warm, concise, and professional.
      2. Keep answers under 3 paragraphs. Use bullet points for readability.
      3. Do NOT provide medical diagnosis. Stick strictly to dietary, habit, and lifestyle advice.
      4. If they ask about eating out, give specific Indian cuisine examples safe for their conditions.
    `;

    // 2. Format history for Gemini's Chat interface
    const chatHistory = history.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        { role: 'model', parts: [{ text: 'Understood. I will act as their context-aware guide.' }] },
        ...chatHistory
      ]
    });

    const t0 = Date.now();

    // 3. Send the latest user message
    const latestMessage = history[history.length - 1].content;
    const result = await chat.sendMessage(latestMessage);
    const text = result.response.text();

    // 2. Calculate elapsed time
        const ms = Date.now() - t0; 
        const u = result.response.usageMetadata;
        
        // 3. Update the route label to match the feature
        console.log('METRIC ' + JSON.stringify({ 
            route: 'chat', 
            ms: ms, 
            inTok: u?.promptTokenCount, 
            outTok: u?.candidatesTokenCount 
        }));

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}