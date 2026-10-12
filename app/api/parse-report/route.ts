// app/api/parse-report/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper function to retry the API call if the server is busy (503 error)
async function generateWithRetry(config: any, maxRetries = 3) {
  let attempt = 0;
  let delay = 1000; // Start with a 1 second delay

  while (attempt < maxRetries) {
    try {
      return await ai.models.generateContent(config);
    } catch (error: any) {
      attempt++;
      // If it's a 503 High Demand error and we haven't maxed out retries, wait and try again
      if (error?.status === 503 && attempt < maxRetries) {
        console.warn(`Google API busy (503). Retrying attempt ${attempt} in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff: 1s, then 2s, etc.
      } else {
        throw error; // Throw the error if it's not a 503 or we ran out of retries
      }
    }
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = file.type;

    const prompt = `
      You are a highly precise medical data extraction AI. 
      Analyze the provided image or PDF. 
      
      First, verify if this document is an actual blood test / clinical laboratory report. 
      If it is NOT a blood test report (e.g., it is a prescription, bill, random photo, or completely blurry/unreadable), return EXACTLY this JSON and nothing else:
      { "isValidReport": false, "error": "This document does not appear to be a readable blood test report. Please upload a clear lab report." }

      If it IS a valid blood test report, extract the following values if they exist. Return the values as numbers. If a value is missing, return null.
      Return EXACTLY this JSON format and nothing else:
      {
        "isValidReport": true,
        "extractedData": {
          "lab_hba1c": [Extract HbA1c percentage],
          "lab_fbs": [Extract Fasting Blood Sugar / Glucose in mg/dL],
          "lab_pp": [Extract Post-Prandial / Post-Meal Blood Sugar in mg/dL],
          "lab_vit_d3": [Extract Vitamin D / 25-OH Vitamin D in ng/mL],
          "lab_vit_b12": [Extract Vitamin B12 in pg/mL]
        }
      }
    `;

    const t0 = Date.now();
    
    // Use our new retry wrapper instead of calling it directly
    const response = await generateWithRetry({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            { inlineData: { data: buffer.toString('base64'), mimeType } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
      }
    });

    const ms = Date.now() - t0;
    const u = response?.usageMetadata;
    
    console.log('METRIC ' + JSON.stringify({
        route: 'parse_report',
        ms: ms,
        inTok: u?.promptTokenCount,
        outTok: u?.candidatesTokenCount
    }));

    const text = response?.text || "{}";
    const result = JSON.parse(text);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error parsing report:', error);
    return NextResponse.json({ error: 'Servers are currently experiencing high demand. Please try uploading again in a few moments.' }, { status: 500 });
  }
}