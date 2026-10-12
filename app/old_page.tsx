'use client';

import { useState } from 'react';
import Questionnaire from '../components/Questionnaire';
import { generateDailyPlan, UserProfile } from '../lib/generator';
// Import the robust questions we created
import { questionnaire } from '../data/questions';

export default function Home() {
  const [view, setView] = useState<'intro' | 'survey' | 'report'>('intro');
  const [plan, setPlan] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // LOGIC: Convert raw answers into a Medical Profile
  const handleSurveyComplete = (answers: any) => {
    
    // 1. Calculate BMI
    const heightM = (parseFloat(answers.height_cm) || 160) / 100;
    const weightKg = parseFloat(answers.weight_kg) || 60;
    const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

    // 2. Logic to detect vegetarianism
    const dietType = answers.diet_type || '';
    const isVeg = dietType.includes('Vegetarian') || dietType === 'Vegan';

    // 3. Logic to detect diabetes status
    const diabetesType = answers.diabetes_type || 'None';
    const isDiabetic = !['None / Healthy', 'Not sure', 'None'].includes(diabetesType);

    // 4. Build Condition List from separate questions
    const conditions = [];
    if (isDiabetic) conditions.push('Diabetic');
    if (answers.has_bp === 'Yes') conditions.push('High BP');
    if (answers.has_cholesterol === 'Yes') conditions.push('High Cholesterol');
    if (answers.has_kidney_issue === 'Yes') conditions.push('Kidney Issue');
    if (answers.has_heart_issue === 'Yes') conditions.push('Heart Issue');
    
    // NEW: Map Snoring to Apnea Risk (Updated to catch "Diagnosed" option)
    if (answers.snoring_history && (
        answers.snoring_history.includes('Yes') || 
        answers.snoring_history.includes('diagnosed') || 
        answers.snoring_history.includes('Apnea')
    )) {
        conditions.push('Sleep Apnea Risk');
    }

    // 5. Build Digestive Profile
    const digestiveIssues = [];
    if (answers.bloating === 'Often' || answers.bloating === 'Almost always') digestiveIssues.push('Bloating');
    if (answers.bowel_movement === 'Often constipated') digestiveIssues.push('Constipation');
    
    // NEW: Map Acidity (Updated to include triggers like spicy food)
    if (['Often', 'Almost daily', 'Sometimes (after spicy food)'].includes(answers.acidity_issues)) {
        digestiveIssues.push('Acidity');
    }

    // 6. Map Answers to the "Expert" Profile
    const profile: UserProfile = {
      // Basic
      age: parseInt(answers.age) || 30,
      gender: answers.gender || 'Other',
      region: answers.state || 'Other (India)',
      height: parseFloat(answers.height_cm),
      weight: parseFloat(answers.weight_kg),
      bmi: bmi,
      
      // Medical
      conditions: conditions,
      diabetesType: diabetesType,
      labValues: {
        hba1c: answers.lab_hba1c,
        fbs: answers.lab_fbs,     // FIX: Changed 'fasting' to 'fbs'
        pp: answers.lab_pp        // FIX: Already correct, but ensures match
      },

      // Lifestyle
      activityLevel: answers.daily_walking_minutes || '< 15 mins',
      sleepHours: answers.sleep_hours || '6–7 hours',
      stressLevel: answers.overall_stress || 'Moderate',
      
      // Diet & Kitchen
      dietType: dietType,
      isVegetarian: isVeg,
      cookingOil: answers.oil_type || 'Refined',
      
      // Digestion
      digestiveIssues: digestiveIssues,

      // --- NEW FIELDS MAPPING ---
      dinnerTime: answers.dinner_time,
      breakfastTime: answers.breakfast_time,
      waterIntake: answers.daily_hydration,
      mealSequencing: answers.meal_sequencing,
      // FIX: Combine Morning and Midday sun into one logic string
      sunlightExposure: (answers.morning_sun === 'Yes, almost daily' || answers.midday_sun === 'Yes, daily (20+ mins)') 
        ? 'Good' 
        : 'Low'
    };

    // 7. Generate the Smart Plan
    const generatedPlan = generateDailyPlan(profile);
    
    // 8. Save and Show Report
    setUserProfile(profile);
    setPlan(generatedPlan);
    setView('report');
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* VIEW 1: INTRO SCREEN */}
      {view === 'intro' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Diabetes Lifestyle Manager</h1>
          <p className="text-lg text-gray-600 max-w-lg mb-8">
            Get a personalized, region-specific meal plan based on your comprehensive health profile.
          </p>
          <button 
            onClick={() => setView('survey')}
            className="px-8 py-4 bg-blue-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all"
          >
            Start Assessment
          </button>
        </div>
      )}

      {/* VIEW 2: QUESTIONNAIRE */}
      {view === 'survey' && (
        <div className="py-12 px-4">
          <Questionnaire 
            data={questionnaire} 
            onComplete={handleSurveyComplete} 
          />
        </div>
      )}

      {/* VIEW 3: THE REPORT */}
      {view === 'report' && plan && userProfile && (
        <div className="max-w-4xl mx-auto py-12 px-6">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {userProfile.conditions.includes('Diabetic') 
                ? 'Diabetes Management Plan' 
                : 'Prevention & Wellness Plan'}
            </h2>
            
            <div className="inline-flex flex-wrap justify-center gap-3 mt-4 text-sm font-semibold text-gray-500">
                <span className="bg-white px-3 py-1 rounded-full shadow-sm border">{userProfile.region}</span>
                <span className="bg-white px-3 py-1 rounded-full shadow-sm border">BMI: {userProfile.bmi}</span>
                {userProfile.conditions.includes('High BP') && <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full shadow-sm border border-red-100">Hypertension</span>}
                {userProfile.conditions.includes('Kidney Issue') && <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full shadow-sm border border-orange-100">Renal Care</span>}
            </div>
          </div>

          {/* Meal Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Recommended Daily Menu</h3>
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* Breakfast */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <span className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Breakfast</span>
                <span className="text-lg font-medium text-blue-900">{plan.breakfast.name}</span>
                <p className="text-sm text-blue-700 mt-1">{plan.breakfast.description}</p>
              </div>

              {/* Lunch */}
              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <span className="block text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Lunch</span>
                <span className="text-lg font-medium text-green-900">{plan.lunch.name}</span>
                <p className="text-sm text-green-700 mt-1">{plan.lunch.description}</p>
              </div>

              {/* Snack */}
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <span className="block text-xs font-bold text-yellow-600 uppercase tracking-wider mb-1">Evening Snack</span>
                <span className="text-lg font-medium text-yellow-900">{plan.snack.name}</span>
                <p className="text-sm text-yellow-700 mt-1">{plan.snack.description}</p>
              </div>

              {/* Dinner */}
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                <span className="block text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Dinner</span>
                <span className="text-lg font-medium text-purple-900">{plan.dinner.name}</span>
                <p className="text-sm text-purple-700 mt-1">{plan.dinner.description}</p>
              </div>
            </div>
          </div>

          {/* INSIGHTS SECTION (NEW) */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Clinical Notes */}
            <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
                <h4 className="text-xl font-bold mb-4 flex items-center">
                    🩺 Clinical Focus
                </h4>
                <ul className="space-y-3">
                    {plan.clinicalNotes.map((note: string, i: number) => (
                        <li key={i} className="flex items-start text-blue-100 text-sm">
                            <span className="mr-2">•</span>
                            {note}
                        </li>
                    ))}
                    {plan.clinicalNotes.length === 0 && (
                        <li className="text-blue-200">No specific clinical concerns identified. Focus on general wellness.</li>
                    )}
                </ul>
            </div>

            {/* Lifestyle Tips */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    🌱 Smart Lifestyle Habits
                </h4>
                <ul className="space-y-3">
                    {plan.lifestyleTips.map((tip: string, i: number) => (
                        <li key={i} className="flex items-start text-gray-600 text-sm bg-gray-50 p-2 rounded-lg">
                            <span className="mr-2">💡</span>
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>
          </div>
            
          <button 
            onClick={() => setView('intro')}
            className="mt-12 w-full py-4 border-2 border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-50 hover:text-gray-800 transition-colors"
          >
            Start Over
          </button>
        </div>
      )}
    </main>
  );
}