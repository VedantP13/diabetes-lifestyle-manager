// 'use client';

// import { useState, useEffect } from 'react';
// import Questionnaire from '../components/Questionnaire';
// import { generateWeeklyPlan, UserProfile, DailyPlan, getAlternativeDish } from '../lib/generator';
// import {
//   determinePhenotype,
//   generateHabitAudit,
//   generateDailyRoutine,
//   PhenotypeResult,
//   RoutineItem,
//   AuditItem
// } from '../lib/insights';
// import { MealSlot } from '../data/dishes';
// import { questionnaire } from '../data/questions';

// // NEW: Import components
// import { Icons } from '../components/Icons';
// import PhenotypeCard from '../components/PhenotypeCard';
// import HabitAudit from '../components/HabitAudit';
// import ClinicalFocus from '../components/ClinicalFocus';
// import RoutineTimeline from '../components/RoutineTimeline';
// import MealGrid from '../components/MealGrid';

// import { generateTransformationReport } from '../lib/insights-engine';
// import { TransformationReport } from '../lib/types/report-types';
// import { TransformationSection } from '../components/Report/TransformationSection';

// import { ReportTabs } from '../components/Report/ReportTabs';

// const STORAGE_KEY = 'diabetes-lifestyle-data';

// export default function Home() {
//   const [view, setView] = useState<'intro' | 'survey' | 'report'>('intro');

//   // Data States
//   const [plan, setPlan] = useState<DailyPlan[]>([]);
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [phenotype, setPhenotype] = useState<PhenotypeResult | null>(null);
//   const [routine, setRoutine] = useState<RoutineItem[]>([]);
//   const [audit, setAudit] = useState<AuditItem[]>([]);

//   // UI State
//   const [selectedDay, setSelectedDay] = useState<number>(0);
//   const [hasSavedData, setHasSavedData] = useState<boolean>(false);

//   const [transformationReport, setTransformationReport] = useState<TransformationReport | null>(null);

//   // --- PERSISTENCE LOGIC ---
//   useEffect(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) setHasSavedData(true);
//   }, []);

//   useEffect(() => {
//     // Check if we have the new report before saving
//     if (view === 'report' && userProfile && plan.length > 0) {
//       const dataToSave = {
//         userProfile,
//         plan,
//         phenotype,
//         routine,
//         audit,
//         transformationReport, // <--- ADD THIS
//         timestamp: new Date().getTime()
//       };
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
//       setHasSavedData(true);
//     }
//   }, [userProfile, plan, phenotype, routine, audit, transformationReport, view]); // <--- ADD TO DEPENDENCIES

//   const handleResume = () => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) {
//       try {
//         const parsed = JSON.parse(saved);
//         setUserProfile(parsed.userProfile);
//         setPlan(parsed.plan);
//         setPhenotype(parsed.phenotype);
//         setRoutine(parsed.routine);
//         setAudit(parsed.audit);

//         if (parsed.transformationReport) {
//             setTransformationReport(parsed.transformationReport);
//         }

//         setView('report');
//       } catch (e) {
//         console.error("Failed to parse saved data", e);
//         localStorage.removeItem(STORAGE_KEY);
//         setHasSavedData(false);
//       }
//     }
//   };

//   const handleReset = () => {
//     localStorage.removeItem(STORAGE_KEY);
//     setHasSavedData(false);
//     setPlan([]);
//     setUserProfile(null);
//     setTransformationReport(null); 
//     setView('intro');
//     setSelectedDay(0);
//   };

//   const handleSurveyComplete = (answers: any) => {
//     // 1. Calculations
//     const heightM = (parseFloat(answers.height_cm) || 160) / 100;
//     const weightKg = parseFloat(answers.weight_kg) || 60;
//     const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

//     // 2. Flags
//     const dietType = answers.diet_type || '';
//     const isVeg = dietType.includes('Vegetarian') || dietType === 'Vegan';
//     const diabetesType = answers.diabetes_type || 'None';
//     const isDiabetic = !['None / Healthy', 'Not sure', 'None'].includes(diabetesType);

//     // 3. Condition List
//     const conditions = [];
//     if (isDiabetic) conditions.push('Diabetic');
//     if (answers.has_bp === 'Yes') conditions.push('High BP');
//     if (answers.has_cholesterol === 'Yes') conditions.push('High Cholesterol');
//     if (answers.has_kidney_issue === 'Yes') conditions.push('Kidney Issue');
//     if (answers.has_heart_issue === 'Yes') conditions.push('Heart Issue');

//     if (answers.snoring_history && (
//       answers.snoring_history.includes('Yes') ||
//       answers.snoring_history.includes('diagnosed') ||
//       answers.snoring_history.includes('Apnea')
//     )) {
//       conditions.push('Sleep Apnea Risk');
//     }

//     // 4. Digestive Profile
//     const digestiveIssues = [];
//     if (answers.bloating === 'Often' || answers.bloating === 'Almost always') digestiveIssues.push('Bloating');
//     if (answers.bowel_movement === 'Often constipated') digestiveIssues.push('Constipation');
//     if (['Often', 'Almost daily', 'Sometimes (after spicy food)'].includes(answers.acidity_issues)) {
//       digestiveIssues.push('Acidity');
//     }

//     // 5. Build Profile
//     const profile: UserProfile = {
//       age: parseInt(answers.age) || 30,
//       gender: answers.gender || 'Other',
//       region: answers.state || 'Other (India)',
//       height: parseFloat(answers.height_cm),
//       weight: parseFloat(answers.weight_kg),
//       bmi: bmi,
//       conditions: conditions,
//       diabetesType: diabetesType,
//       labValues: {
//         hba1c: answers.lab_hba1c,
//         fbs: answers.lab_fbs,
//         pp: answers.lab_pp
//       },
//       activityLevel: answers.daily_walking_minutes || '< 15 mins',
//       sleepHours: answers.sleep_hours || '6–7 hours',
//       stressLevel: answers.overall_stress || 'Moderate',
//       dietType: dietType,
//       isVegetarian: isVeg,
//       cookingOil: answers.oil_type || 'Refined',
//       digestiveIssues: digestiveIssues,
//       dinnerTime: answers.dinner_time,
//       breakfastTime: answers.breakfast_time,
//       waterIntake: answers.daily_hydration,
//       mealSequencing: answers.meal_sequencing,
//       sunlightExposure: (answers.morning_sun === 'Yes, almost daily' || answers.midday_sun === 'Yes, daily (20+ mins)') ? 'Good' : 'Low',

//       // --- NEW MAPPINGS (Add these lines) ---
//       // 1. Shift Work Logic: If they didn't see the question (e.g. Homemaker), default to Standard Day
//       workSchedule: answers.work_schedule || 'Standard Day Shift',

//       // 2. Eating Habits
//       eatingSpeed: answers.eating_speed,       // 'Very Fast', 'Moderate', etc.
//       distractedEating: answers.distracted_eating, // 'Yes, almost every meal', etc.

//       // 3. Nutrient Absorption
//       postMealCaffeine: answers.post_meal_caffeine, // 'Yes, it's a habit'

//       // 4. Hormonal Health (Safely handle undefined for Males)
//       pcosStatus: answers.gender === 'Female' ? answers.pcos_history : 'No',
//       menopauseStatus: answers.gender === 'Female' ? answers.menstrual_status : undefined,

//       // 5. Fitness Details
//       strengthTraining: answers.strength_training, // 'No, never', 'Yes, regularly'

//       occupation_role: answers.occupation_role,         // Maps from Question ID: occupation_role
//       physical_limitations: answers.physical_limitations, // Maps from Question ID: physical_limitations
//       walking_pace: answers.walking_pace,               // Maps from Question ID: walking_pace
//       energy_levels: answers.energy_levels, // Maps from Question ID: energy_levels
//     };

//     // 6. Generate Data
//     const weeklyPlan = generateWeeklyPlan(profile);
//     const calculatedPhenotype = determinePhenotype(profile); // Keep for legacy or remove if fully replacing
//     const calculatedRoutine = generateDailyRoutine(profile);
//     const calculatedAudit = generateHabitAudit(profile);     // Keep for legacy or remove

//     // --- NEW ENGINE CALL ---
//     const newReport = generateTransformationReport(profile);
//     setTransformationReport(newReport);
//     // -----------------------

//     setUserProfile(profile);
//     setPlan(weeklyPlan);
//     setPhenotype(calculatedPhenotype);
//     setRoutine(calculatedRoutine);
//     setAudit(calculatedAudit);
//     setView('report');
//   };

//   const handleSwap = (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => {
//     if (!userProfile) return;
//     const currentDayPlan = plan[selectedDay];
//     const currentDish = currentDayPlan[slot];
//     const slotKey = (slot.charAt(0).toUpperCase() + slot.slice(1)) as MealSlot;
//     const newDish = getAlternativeDish(slotKey, userProfile, currentDish.id, plan);
//     const updatedPlan = [...plan];
//     updatedPlan[selectedDay] = { ...updatedPlan[selectedDay], [slot]: newDish };
//     setPlan(updatedPlan);
//   };

//   return (
//     <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">

//       {/* VIEW 1: INTRO */}
//       {view === 'intro' && (
//         <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gradient-to-br from-blue-50 to-white">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
//             Diabetes Lifestyle <span className="text-blue-600">Planner</span>
//           </h1>
//           <p className="text-lg text-slate-600 max-w-lg mb-8 leading-relaxed">
//             Create a personalized lifestyle routine and meal guide tailored to your needs.
//             <br /><span className="text-sm text-slate-400 mt-2 block">(Not medical advice. For educational purposes only.)</span>
//           </p>

//           <div className="flex flex-col gap-4 w-full max-w-xs">
//             <button
//               onClick={() => setView('survey')}
//               className="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl transition-all transform hover:-translate-y-1"
//             >
//               {hasSavedData ? 'Start New Plan' : 'Create My Plan'}
//             </button>

//             {hasSavedData && (
//               <button
//                 onClick={handleResume}
//                 className="flex items-center justify-center gap-2 px-10 py-3 bg-white text-slate-600 border border-slate-200 font-semibold rounded-full shadow-sm hover:bg-slate-50 transition-all"
//               >
//                 <Icons.History /> Resume Previous
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* VIEW 2: QUESTIONNAIRE */}
//       {view === 'survey' && (
//         <div className="py-12 px-4 bg-slate-50">
//           <Questionnaire data={questionnaire} onComplete={handleSurveyComplete} />
//         </div>
//       )}

//       {/* VIEW 3: THE REPORT */}
//       {view === 'report' && plan.length > 0 && userProfile && phenotype && (
//         <div className="min-h-screen bg-slate-50"> 
//         {/* Note: Removed max-w wrapper here because Tabs handle their own width */}

//           {/* HEADER (Keep this visible always) */}
//           <div className="bg-white border-b border-gray-100 pt-12 pb-8 px-4 text-center">
//              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
//                 Lifestyle & Wellness Guide
//              </div>
//              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
//                 {userProfile.name ? `${userProfile.name}'s` : 'Your'} Wellness Profile
//              </h2>
//              <p className="text-slate-500 font-medium">
//                 Customized for {userProfile.region} Diet • BMI {userProfile.bmi}
//              </p>
//           </div>

//           {/* --- THE NEW TABBED INTERFACE --- */}
//           <ReportTabs 
//             report={transformationReport} 
//             plan={plan}
//             routine={routine}
//             audit={audit}
//             userProfile={userProfile}
//             selectedDay={selectedDay}
//             setSelectedDay={setSelectedDay}
//             onSwap={handleSwap}
//           />
//           {/* ------------------------------- */}

//           <div className="text-center pt-12 pb-24 bg-slate-50">
//              <button
//                 onClick={handleReset}
//                 className="text-slate-400 font-semibold hover:text-red-500 transition-colors text-sm"
//              >
//                 Start New Assessment
//              </button>
//           </div>

//           {/* DISCLAIMER FOOTER */}
//           <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-3 text-center text-[10px] text-slate-400 z-50">
//              <p className="max-w-4xl mx-auto">
//                 <strong>Disclaimer:</strong> Not medical advice. For educational purposes only.
//              </p>
//           </div>

//         </div>
//       )}
//     </main>
//   );
// }
















//===================Working=========================

// 'use client';

// import { useState, useEffect } from 'react';
// import { RefreshCw, History, ArrowRight } from 'lucide-react';
// import Questionnaire from '../components/Questionnaire';
// import { generateWeeklyPlan, UserProfile, DailyPlan, getAlternativeDish } from '../lib/generator';
// import {
//   determinePhenotype,
//   generateHabitAudit,
//   generateDailyRoutine,
//   PhenotypeResult,
//   RoutineItem,
//   AuditItem
// } from '../lib/insights';
// import { MealSlot } from '../data/dishes';
// import { questionnaire } from '../data/questions';

// import { HeroIllustration } from '../components/HeroIllustration';
// import { generateTransformationReport } from '../lib/insights-engine';
// import { TransformationReport } from '../lib/types/report-types';
// import { ReportTabs } from '../components/Report/ReportTabs';

// const STORAGE_KEY = 'diabetes-lifestyle-data';




// // --- DEV TOOL: DUMMY DATA FOR INSTANT TESTING ---
// const DUMMY_ANSWERS = {
//   age: "45",
//   gender: "Male",
//   state: "Maharashtra",
//   height_cm: "170",
//   weight_kg: "85",
//   diet_type: "Vegetarian (no eggs)",
//   diabetes_type: "Type 2 diabetes",
//   has_bp: "Yes",
//   has_cholesterol: "Yes",
//   snoring_history: "Yes",
//   bloating: "Often",
//   acidity_issues: "Often",
//   lab_hba1c: "7.8",
//   daily_walking_minutes: "< 15 mins",
//   sleep_hours: "< 5 hours",
//   overall_stress: "High",
//   oil_type: "Refined Sunflower Oil",
//   dinner_time: "10:30 PM",
//   breakfast_time: "9:00 AM",
//   daily_hydration: "Low (Less than 1.5 Liters)",
//   meal_sequencing: "I mix everything together",
//   morning_sun: "No",
//   work_schedule: "Standard Day Shift",
//   eating_speed: "Very Fast (Under 10 mins)",
//   distracted_eating: "Yes, almost every meal",
//   post_meal_caffeine: "Yes, it's a habit",
//   strength_training: "No, never",
//   occupation_role: "I work at an office desk",
//   physical_limitations: "Knee or joint pain",
//   walking_pace: "Casual strolling",
// };
// // ------------------------------------------------



// export default function Home() {
//   const [view, setView] = useState<'intro' | 'survey' | 'report'>('intro');

//   // Data States
//   const [plan, setPlan] = useState<DailyPlan[]>([]);
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [phenotype, setPhenotype] = useState<PhenotypeResult | null>(null);
//   const [routine, setRoutine] = useState<RoutineItem[]>([]);
//   const [audit, setAudit] = useState<AuditItem[]>([]);

//   // UI State
//   const [selectedDay, setSelectedDay] = useState<number>(0);
//   const [hasSavedData, setHasSavedData] = useState<boolean>(false);

//   const [transformationReport, setTransformationReport] = useState<TransformationReport | null>(null);

//   // --- PERSISTENCE LOGIC ---
//   useEffect(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) setHasSavedData(true);
//   }, []);

//   useEffect(() => {
//     if (view === 'report' && userProfile && plan.length > 0) {
//       const dataToSave = {
//         userProfile,
//         plan,
//         phenotype,
//         routine,
//         audit,
//         transformationReport,
//         timestamp: new Date().getTime()
//       };
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
//       setHasSavedData(true);
//     }
//   }, [userProfile, plan, phenotype, routine, audit, transformationReport, view]);

//   const handleResume = () => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) {
//       try {
//         const parsed = JSON.parse(saved);
//         setUserProfile(parsed.userProfile);
//         setPlan(parsed.plan);
//         setPhenotype(parsed.phenotype);
//         setRoutine(parsed.routine);
//         setAudit(parsed.audit);

//         if (parsed.transformationReport) {
//           setTransformationReport(parsed.transformationReport);
//         }

//         setView('report');
//       } catch (e) {
//         console.error("Failed to parse saved data", e);
//         localStorage.removeItem(STORAGE_KEY);
//         setHasSavedData(false);
//       }
//     }
//   };

//   const handleReset = () => {
//     localStorage.removeItem(STORAGE_KEY);
//     setHasSavedData(false);
//     setPlan([]);
//     setUserProfile(null);
//     setTransformationReport(null);
//     setView('intro');
//     setSelectedDay(0);
//   };

//   const handleSurveyComplete = (answers: any) => {
//     // 1. Calculations
//     const heightM = (parseFloat(answers.height_cm) || 160) / 100;
//     const weightKg = parseFloat(answers.weight_kg) || 60;
//     const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

//     // 2. Flags
//     const dietType = answers.diet_type || '';
//     const isVeg = dietType.includes('Vegetarian') || dietType === 'Vegan';
//     const diabetesType = answers.diabetes_type || 'None';
//     const isDiabetic = !['None / Healthy', 'Not sure', 'None'].includes(diabetesType);

//     // 3. Condition List
//     const conditions = [];
//     if (isDiabetic) conditions.push('Diabetic');
//     if (answers.has_bp === 'Yes') conditions.push('High BP');
//     if (answers.has_cholesterol === 'Yes') conditions.push('High Cholesterol');
//     if (answers.has_kidney_issue === 'Yes') conditions.push('Kidney Issue');
//     if (answers.has_heart_issue === 'Yes') conditions.push('Heart Issue');

//     if (answers.snoring_history && (
//       answers.snoring_history.includes('Yes') ||
//       answers.snoring_history.includes('diagnosed') ||
//       answers.snoring_history.includes('Apnea')
//     )) {
//       conditions.push('Sleep Apnea Risk');
//     }

//     // 4. Digestive Profile
//     const digestiveIssues = [];
//     if (answers.bloating === 'Often' || answers.bloating === 'Almost always') digestiveIssues.push('Bloating');
//     if (answers.bowel_movement === 'Often constipated') digestiveIssues.push('Constipation');
//     if (['Often', 'Almost daily', 'Sometimes (after spicy food)'].includes(answers.acidity_issues)) {
//       digestiveIssues.push('Acidity');
//     }

//     // 5. Build Profile
//     const profile: UserProfile = {
//       age: parseInt(answers.age) || 30,
//       gender: answers.gender || 'Other',
//       region: answers.state || 'Other (India)',
//       height: parseFloat(answers.height_cm),
//       weight: parseFloat(answers.weight_kg),
//       bmi: bmi,
//       conditions: conditions,
//       diabetesType: diabetesType,
//       labValues: {
//         hba1c: answers.lab_hba1c,
//         fbs: answers.lab_fbs,
//         pp: answers.lab_pp
//       },
//       activityLevel: answers.daily_walking_minutes || '< 15 mins',
//       sleepHours: answers.sleep_hours || '6–7 hours',
//       stressLevel: answers.overall_stress || 'Moderate',
//       dietType: dietType,
//       isVegetarian: isVeg,
//       cookingOil: answers.oil_type || 'Refined',
//       digestiveIssues: digestiveIssues,
//       dinnerTime: answers.dinner_time,
//       breakfastTime: answers.breakfast_time,
//       waterIntake: answers.daily_hydration,
//       mealSequencing: answers.meal_sequencing,
//       sunlightExposure: (answers.morning_sun === 'Yes, almost daily' || answers.midday_sun === 'Yes, daily (20+ mins)') ? 'Good' : 'Low',

//       workSchedule: answers.work_schedule || 'Standard Day Shift',
//       eatingSpeed: answers.eating_speed,
//       distractedEating: answers.distracted_eating,
//       postMealCaffeine: answers.post_meal_caffeine,
//       pcosStatus: answers.gender === 'Female' ? answers.pcos_history : 'No',
//       menopauseStatus: answers.gender === 'Female' ? answers.menstrual_status : undefined,
//       strengthTraining: answers.strength_training,
//       occupation_role: answers.occupation_role,
//       physical_limitations: answers.physical_limitations,
//       walking_pace: answers.walking_pace,
//       energy_levels: answers.energy_levels,
//     };

//     const weeklyPlan = generateWeeklyPlan(profile);
//     const calculatedPhenotype = determinePhenotype(profile);
//     const calculatedRoutine = generateDailyRoutine(profile);
//     const calculatedAudit = generateHabitAudit(profile);
//     const newReport = generateTransformationReport(profile);

//     setTransformationReport(newReport);
//     setUserProfile(profile);
//     setPlan(weeklyPlan);
//     setPhenotype(calculatedPhenotype);
//     setRoutine(calculatedRoutine);
//     setAudit(calculatedAudit);
//     setView('report');
//   };

//   const handleSwap = (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => {
//     if (!userProfile) return;
//     const currentDayPlan = plan[selectedDay];
//     const currentDish = currentDayPlan[slot];
//     const slotKey = (slot.charAt(0).toUpperCase() + slot.slice(1)) as MealSlot;
//     const newDish = getAlternativeDish(slotKey, userProfile, currentDish.id, plan);
//     const updatedPlan = [...plan];
//     updatedPlan[selectedDay] = { ...updatedPlan[selectedDay], [slot]: newDish };
//     setPlan(updatedPlan);
//   };

//   return (
//     <main className="min-h-screen bg-canvas-50 text-brand-950 font-body pb-16">

//       {/* VIEW 1: INTRO */}
//       {view === 'intro' && (
//         <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-brand-50/30 via-white to-white">
//           <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

//             {/* Left Column: Content */}
//             <div className="text-center md:text-left space-y-8 animate-slideUp">
//               <div>
//                 {/* NEW TAG STYLE: Clean, Bordered, Premium */}
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-200 bg-white shadow-sm mb-8">
//                   <span className="relative flex h-2 w-2">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
//                   </span>
//                   <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
//                     Healthy Habits & Routine
//                   </span>
//                 </div>

//                 <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-brand-950 tracking-tight leading-[1.1]">
//                   Diabetes <br /> Lifestyle <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-500">Planner</span>
//                 </h1>
//               </div>

//               <p className="text-lg md:text-xl text-canvas-600 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
//                 A simple, daily routine guide tailored to your habits, regional diet, and personal wellness goals.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
//                 <button
//                   onClick={() => setView('survey')}
//                   className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 text-white text-lg font-bold rounded-full shadow-float hover:bg-brand-700 hover:scale-105 transition-all active:scale-95"
//                 >
//                   Start Assessment <ArrowRight size={20} />
//                 </button>

//                 {/* --- NEW DEV BUTTON --- */}
//                 <button
//                   onClick={() => handleSurveyComplete(DUMMY_ANSWERS)}
//                   className="flex items-center justify-center gap-2 px-6 py-4 bg-amber-400 text-amber-950 text-sm font-bold rounded-full shadow-sm hover:bg-amber-500 transition-all active:scale-95"
//                 >
//                   🚀 DEV: Fast Forward
//                 </button>
//                 {/* ---------------------- */}

//                 {hasSavedData && (
//                   <button
//                     onClick={handleResume}
//                     className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-700 border border-brand-200 font-semibold rounded-full shadow-soft hover:bg-brand-50 transition-all active:scale-95"
//                   >
//                     <History size={20} /> Resume Profile
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Right Column: New Illustration */}
//             <div className="hidden md:flex justify-center items-center relative">
//               <HeroIllustration />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* VIEW 2: QUESTIONNAIRE */}
//       {view === 'survey' && (
//         <div className="py-12 px-4 bg-canvas-50">
//           <Questionnaire data={questionnaire} onComplete={handleSurveyComplete} />
//         </div>
//       )}

//       {/* VIEW 3: THE REPORT */}
//       {view === 'report' && plan.length > 0 && userProfile && phenotype && (
//         <div className="min-h-screen bg-slate-50/30">

//           {/* HEADER - COMPACT & SLEEK [Teal Theme] */}
//           {/* Reduced vertical padding (py-6) and optimized for single-line on desktop */}
//           <div className="bg-teal-900 border-b border-teal-800 py-6 px-4 relative z-10 shadow-sm">
//             <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">

//               {/* Left: Primary Title */}
//               <h2 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight text-center md:text-left">
//                 {userProfile.name ? `${userProfile.name}'s` : 'Your'} Transformation Plan
//               </h2>

//               {/* Right: Contextual Details (Single line on Desktop) */}
//               <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-5 text-sm md:text-base font-medium text-teal-100/90">
//                 <span className="hidden md:inline text-teal-600/50 text-lg">|</span>

//                 <span className="opacity-90">{userProfile.region} Region</span>

//                 <span className="w-1 h-1 rounded-full bg-teal-600"></span>

//                 <span className={userProfile.bmi > 25 ? 'text-amber-300 font-bold' : 'text-emerald-300 font-bold'}>
//                    BMI {userProfile.bmi}
//                 </span>

//                 <span className="w-1 h-1 rounded-full bg-teal-600"></span>

//                 <button 
//                   onClick={handleReset}
//                   className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-400 hover:text-white transition-colors bg-teal-800/50 px-3 py-1.5 rounded-full border border-teal-700 hover:border-teal-500"
//                 >
//                   <RefreshCw size={12} strokeWidth={2.5} /> Restart
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* --- TABBED INTERFACE --- */}
//           {/* Now integrated closer to the header */}
//           <ReportTabs
//             report={transformationReport}
//             plan={plan}
//             routine={routine}
//             audit={audit}
//             userProfile={userProfile}
//             selectedDay={selectedDay}
//             setSelectedDay={setSelectedDay}
//             onSwap={handleSwap}
//           />

//           {/* Footer Note */}
//           <div className="text-center pt-20 pb-32 px-4">
//              <p className="text-xs text-gray-400 max-w-lg mx-auto leading-relaxed">
//                This plan is generated based on your inputs and general wellness guidelines. 
//                Always consult a healthcare professional before making significant changes to your diet or lifestyle.
//              </p>
//           </div>

//         </div>
//       )}
//     </main>
//   );
// }






//====================================5/10/26==========================================

// 'use client';

// import { useState, useEffect } from 'react';
// import { RefreshCw, History, ArrowRight } from 'lucide-react';
// import Questionnaire from '../components/Questionnaire';
// import { generateWeeklyPlan, UserProfile, DailyPlan, getAlternativeDish } from '../lib/generator';
// import {
//   determinePhenotype,
//   generateHabitAudit,
//   generateDailyRoutine,
//   PhenotypeResult,
//   RoutineItem,
//   AuditItem
// } from '../lib/insights';
// import { MealSlot } from '../data/dishes';
// import { questionnaire } from '../data/questions';

// import { HeroIllustration } from '../components/HeroIllustration';
// import { generateTransformationReport } from '../lib/insights-engine';
// import { TransformationReport } from '../lib/types/report-types';
// import { ReportTabs } from '../components/Report/ReportTabs';

// const STORAGE_KEY = 'diabetes-lifestyle-data';

// // --- DEV TOOL: DUMMY DATA FOR INSTANT TESTING ---
// const DUMMY_ANSWERS = {
//   age: "45",
//   gender: "Male",
//   state: "Maharashtra",
//   height_cm: "170",
//   weight_kg: "85",
//   diet_type: "Vegetarian (no eggs)",
//   diabetes_type: "Type 2 diabetes",
//   has_bp: "Yes",
//   has_cholesterol: "Yes",
//   snoring_history: "Yes",
//   bloating: "Often",
//   acidity_issues: "Often",
//   lab_hba1c: "7.8",
//   daily_walking_minutes: "< 15 mins",
//   sleep_hours: "< 5 hours",
//   overall_stress: "High",
//   oil_type: "Refined Sunflower Oil",
//   dinner_time: "10:30 PM",
//   breakfast_time: "9:00 AM",
//   daily_hydration: "Low (Less than 1.5 Liters)",
//   meal_sequencing: "I mix everything together",
//   morning_sun: "No",
//   work_schedule: "Standard Day Shift",
//   eating_speed: "Very Fast (Under 10 mins)",
//   distracted_eating: "Yes, almost every meal",
//   post_meal_caffeine: "Yes, it's a habit",
//   strength_training: "No, never",
//   occupation_role: "I work at an office desk",
//   physical_limitations: "Knee or joint pain",
//   walking_pace: "Casual strolling",
// };
// // ------------------------------------------------

// export default function Home() {
//   // Added 'loading' to the view states
//   const [view, setView] = useState<'intro' | 'survey' | 'loading' | 'report'>('intro');

//   // Data States
//   const [plan, setPlan] = useState<DailyPlan[]>([]);
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [phenotype, setPhenotype] = useState<PhenotypeResult | null>(null);
//   const [routine, setRoutine] = useState<RoutineItem[]>([]);
//   const [audit, setAudit] = useState<AuditItem[]>([]);

//   // UI State
//   const [selectedDay, setSelectedDay] = useState<number>(0);
//   const [hasSavedData, setHasSavedData] = useState<boolean>(false);
//   const [transformationReport, setTransformationReport] = useState<TransformationReport | null>(null);

//   // --- PERSISTENCE LOGIC ---
//   useEffect(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) setHasSavedData(true);
//   }, []);

//   useEffect(() => {
//     if (view === 'report' && userProfile && plan.length > 0) {
//       const dataToSave = {
//         userProfile,
//         plan,
//         phenotype,
//         routine,
//         audit,
//         transformationReport,
//         timestamp: new Date().getTime()
//       };
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
//       setHasSavedData(true);
//     }
//   }, [userProfile, plan, phenotype, routine, audit, transformationReport, view]);

//   const handleResume = () => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) {
//       try {
//         const parsed = JSON.parse(saved);
//         setUserProfile(parsed.userProfile);
//         setPlan(parsed.plan);
//         setPhenotype(parsed.phenotype);
//         setRoutine(parsed.routine);
//         setAudit(parsed.audit);
//         if (parsed.transformationReport) {
//           setTransformationReport(parsed.transformationReport);
//         }
//         setView('report');
//       } catch (e) {
//         console.error("Failed to parse saved data", e);
//         localStorage.removeItem(STORAGE_KEY);
//         setHasSavedData(false);
//       }
//     }
//   };

//   const handleReset = () => {
//     localStorage.removeItem(STORAGE_KEY);
//     setHasSavedData(false);
//     setPlan([]);
//     setUserProfile(null);
//     setTransformationReport(null);
//     setView('intro');
//     setSelectedDay(0);
//   };

//   // --- AI API CALL & FALLBACK LOGIC ---
//   const handleSurveyComplete = async (answers: any) => {
//     // 1. Immediately show the gorgeous loading screen
//     setView('loading');

//     try {
//       // 2. Send the answers to our new AI Engine
//       const response = await fetch('/api/generate-plan', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ answers })
//       });

//       if (!response.ok) throw new Error('AI Generation failed or timed out.');

//       const aiData = await response.json();

//       // 3. Set the AI-generated data
//       setUserProfile(aiData.userProfile);
//       setPlan(aiData.plan);
//       setPhenotype(aiData.phenotype);
//       setRoutine(aiData.routine);
//       setAudit(aiData.audit);
//       setTransformationReport(aiData.transformationReport);

//       setView('report');
//     } catch (error) {
//       console.warn("Falling back to local engine due to AI error:", error);
//       // 4. Fallback to the local calculation engine if API fails
//       runLocalFallbackEngine(answers);
//     }
//   };

//   // Your original deterministic logic preserved safely as a fallback
//   const runLocalFallbackEngine = (answers: any) => {
//     const heightM = (parseFloat(answers.height_cm) || 160) / 100;
//     const weightKg = parseFloat(answers.weight_kg) || 60;
//     const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

//     const dietType = answers.diet_type || '';
//     const isVeg = dietType.includes('Vegetarian') || dietType === 'Vegan';
//     const diabetesType = answers.diabetes_type || 'None';
//     const isDiabetic = !['None / Healthy', 'Not sure', 'None'].includes(diabetesType);

//     const conditions = [];
//     if (isDiabetic) conditions.push('Diabetic');
//     if (answers.has_bp === 'Yes') conditions.push('High BP');
//     if (answers.has_cholesterol === 'Yes') conditions.push('High Cholesterol');
//     if (answers.has_kidney_issue === 'Yes') conditions.push('Kidney Issue');
//     if (answers.has_heart_issue === 'Yes') conditions.push('Heart Issue');

//     if (answers.snoring_history && (
//       answers.snoring_history.includes('Yes') ||
//       answers.snoring_history.includes('diagnosed') ||
//       answers.snoring_history.includes('Apnea')
//     )) {
//       conditions.push('Sleep Apnea Risk');
//     }

//     const digestiveIssues = [];
//     if (answers.bloating === 'Often' || answers.bloating === 'Almost always') digestiveIssues.push('Bloating');
//     if (answers.bowel_movement === 'Often constipated') digestiveIssues.push('Constipation');
//     if (['Often', 'Almost daily', 'Sometimes (after spicy food)'].includes(answers.acidity_issues)) {
//       digestiveIssues.push('Acidity');
//     }

//     const profile: UserProfile = {
//       age: parseInt(answers.age) || 30,
//       gender: answers.gender || 'Other',
//       region: answers.state || 'Other (India)',
//       height: parseFloat(answers.height_cm),
//       weight: parseFloat(answers.weight_kg),
//       bmi: bmi,
//       conditions: conditions,
//       diabetesType: diabetesType,
//       labValues: {
//         hba1c: answers.lab_hba1c,
//         fbs: answers.lab_fbs,
//         pp: answers.lab_pp
//       },
//       activityLevel: answers.daily_walking_minutes || '< 15 mins',
//       sleepHours: answers.sleep_hours || '6–7 hours',
//       stressLevel: answers.overall_stress || 'Moderate',
//       dietType: dietType,
//       isVegetarian: isVeg,
//       cookingOil: answers.oil_type || 'Refined',
//       digestiveIssues: digestiveIssues,
//       dinnerTime: answers.dinner_time,
//       breakfastTime: answers.breakfast_time,
//       waterIntake: answers.daily_hydration,
//       mealSequencing: answers.meal_sequencing,
//       sunlightExposure: (answers.morning_sun === 'Yes, almost daily' || answers.midday_sun === 'Yes, daily (20+ mins)') ? 'Good' : 'Low',
//       workSchedule: answers.work_schedule || 'Standard Day Shift',
//       eatingSpeed: answers.eating_speed,
//       distractedEating: answers.distracted_eating,
//       postMealCaffeine: answers.post_meal_caffeine,
//       pcosStatus: answers.gender === 'Female' ? answers.pcos_history : 'No',
//       menopauseStatus: answers.gender === 'Female' ? answers.menstrual_status : undefined,
//       strengthTraining: answers.strength_training,
//       occupation_role: answers.occupation_role,
//       physical_limitations: answers.physical_limitations,
//       walking_pace: answers.walking_pace,
//       energy_levels: answers.energy_levels,
//     };

//     setTransformationReport(generateTransformationReport(profile));
//     setUserProfile(profile);
//     setPlan(generateWeeklyPlan(profile));
//     setPhenotype(determinePhenotype(profile));
//     setRoutine(generateDailyRoutine(profile));
//     setAudit(generateHabitAudit(profile));
//     setView('report');
//   };

//   const handleSwap = (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => {
//     if (!userProfile) return;
//     const currentDayPlan = plan[selectedDay];
//     const currentDish = currentDayPlan[slot];
//     const slotKey = (slot.charAt(0).toUpperCase() + slot.slice(1)) as MealSlot;
//     const newDish = getAlternativeDish(slotKey, userProfile, currentDish.id, plan);
//     const updatedPlan = [...plan];
//     updatedPlan[selectedDay] = { ...updatedPlan[selectedDay], [slot]: newDish };
//     setPlan(updatedPlan);
//   };

//   return (
//     <main className="min-h-screen bg-canvas-50 text-brand-950 font-body pb-16">

//       {/* VIEW 1: INTRO */}
//       {view === 'intro' && (
//         <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-brand-50/30 via-white to-white">
//           <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
//             <div className="text-center md:text-left space-y-8 animate-slideUp">
//               <div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-200 bg-white shadow-sm mb-8">
//                   <span className="relative flex h-2 w-2">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
//                   </span>
//                   <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
//                     Healthy Habits & Routine
//                   </span>
//                 </div>
//                 <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-brand-950 tracking-tight leading-[1.1]">
//                   Diabetes <br /> Lifestyle <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-500">Planner</span>
//                 </h1>
//               </div>

//               <p className="text-lg md:text-xl text-canvas-600 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
//                 A simple, daily routine guide tailored to your habits, regional diet, and personal wellness goals.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
//                 <button
//                   onClick={() => setView('survey')}
//                   className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 text-white text-lg font-bold rounded-full shadow-float hover:bg-brand-700 hover:scale-105 transition-all active:scale-95"
//                 >
//                   Start Assessment <ArrowRight size={20} />
//                 </button>

//                 <button
//                   onClick={() => handleSurveyComplete(DUMMY_ANSWERS)}
//                   className="flex items-center justify-center gap-2 px-6 py-4 bg-amber-400 text-amber-950 text-sm font-bold rounded-full shadow-sm hover:bg-amber-500 transition-all active:scale-95"
//                 >
//                   🚀 DEV: Fast Forward
//                 </button>

//                 {hasSavedData && (
//                   <button
//                     onClick={handleResume}
//                     className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-700 border border-brand-200 font-semibold rounded-full shadow-soft hover:bg-brand-50 transition-all active:scale-95"
//                   >
//                     <History size={20} /> Resume Profile
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="hidden md:flex justify-center items-center relative">
//               <HeroIllustration />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* VIEW 2: QUESTIONNAIRE */}
//       {view === 'survey' && (
//         <div className="py-12 px-4 bg-canvas-50">
//           <Questionnaire data={questionnaire} onComplete={handleSurveyComplete} />
//         </div>
//       )}

//       {/* VIEW 3: LOADING SCREEN */}
//       {view === 'loading' && (
//         <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-brand-50/30 via-white to-white">
//           <div className="relative w-24 h-24 mb-10">
//              <div className="absolute inset-0 border-4 border-teal-100 rounded-full"></div>
//              <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent animate-spin"></div>
//           </div>
//           <h2 className="text-3xl font-heading font-extrabold text-brand-950 mb-4 animate-pulse text-center">
//             Analyzing your metabolic profile...
//           </h2>
//           <p className="text-lg text-canvas-600 font-medium max-w-md text-center">
//             Our AI is evaluating your clinical history and daily habits to build your custom, medically-aligned transformation plan.
//           </p>
//         </div>
//       )}

//       {/* VIEW 4: THE REPORT */}
//       {view === 'report' && plan.length > 0 && userProfile && phenotype && (
//         <div className="min-h-screen bg-slate-50/30">
//           <div className="bg-teal-900 border-b border-teal-800 py-6 px-4 relative z-10 shadow-sm">
//             <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
//               <h2 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight text-center md:text-left">
//                 {userProfile.name ? `${userProfile.name}'s` : 'Your'} Transformation Plan
//               </h2>
//               <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-5 text-sm md:text-base font-medium text-teal-100/90">
//                 <span className="hidden md:inline text-teal-600/50 text-lg">|</span>
//                 <span className="opacity-90">{userProfile.region} Region</span>
//                 <span className="w-1 h-1 rounded-full bg-teal-600"></span>
//                 <span className={userProfile.bmi > 25 ? 'text-amber-300 font-bold' : 'text-emerald-300 font-bold'}>
//                    BMI {userProfile.bmi}
//                 </span>
//                 <span className="w-1 h-1 rounded-full bg-teal-600"></span>
//                 <button 
//                   onClick={handleReset}
//                   className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-400 hover:text-white transition-colors bg-teal-800/50 px-3 py-1.5 rounded-full border border-teal-700 hover:border-teal-500"
//                 >
//                   <RefreshCw size={12} strokeWidth={2.5} /> Restart
//                 </button>
//               </div>
//             </div>
//           </div>

//           <ReportTabs
//             report={transformationReport}
//             plan={plan}
//             routine={routine}
//             audit={audit}
//             userProfile={userProfile}
//             selectedDay={selectedDay}
//             setSelectedDay={setSelectedDay}
//             onSwap={handleSwap}
//           />

//           <div className="text-center pt-20 pb-32 px-4">
//              <p className="text-xs text-gray-400 max-w-lg mx-auto leading-relaxed">
//                This plan is generated based on your inputs and general wellness guidelines. 
//                Always consult a healthcare professional before making significant changes to your diet or lifestyle.
//              </p>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }










//=========================some changes 5/10/26========================

'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, History, ArrowRight } from 'lucide-react';
import Questionnaire from '../components/Questionnaire';
import { generateWeeklyPlan, UserProfile, DailyPlan, getAlternativeDish } from '../lib/generator';
import {
  determinePhenotype,
  generateHabitAudit,
  generateDailyRoutine,
  PhenotypeResult,
  RoutineItem,
  AuditItem
} from '../lib/insights';
import { MealSlot } from '../data/dishes';
import { questionnaire } from '../data/questions';

import { HeroIllustration } from '../components/HeroIllustration';
import { generateTransformationReport } from '../lib/insights-engine';
import { TransformationReport } from '../lib/types/report-types';
import { ReportTabs } from '../components/Report/ReportTabs';

import { ArrowUUpLeft, MapPin, Heartbeat } from '@phosphor-icons/react';

import { MetabolicCompanion } from '../components/MetabolicCompanion';

const STORAGE_KEY = 'diabetes-lifestyle-data';

// --- DEV TOOL: DUMMY DATA FOR INSTANT TESTING ---
const DUMMY_ANSWERS = {
  age: "45",
  gender: "Male",
  state: "Maharashtra",
  height_cm: "170",
  weight_kg: "85",
  diet_type: "Vegetarian (no eggs)",
  diabetes_type: "Type 2 diabetes",
  has_bp: "Yes",
  has_cholesterol: "Yes",
  snoring_history: "Yes",
  bloating: "Often",
  acidity_issues: "Often",
  lab_hba1c: "7.8",
  daily_walking_minutes: "< 15 mins",
  sleep_hours: "< 5 hours",
  overall_stress: "High",
  oil_type: "Refined Sunflower Oil",
  dinner_time: "10:30 PM",
  breakfast_time: "9:00 AM",
  daily_hydration: "Low (Less than 1.5 Liters)",
  meal_sequencing: "I mix everything together",
  morning_sun: "No",
  work_schedule: "Standard Day Shift",
  eating_speed: "Very Fast (Under 10 mins)",
  distracted_eating: "Yes, almost every meal",
  post_meal_caffeine: "Yes, it's a habit",
  strength_training: "No, never",
  occupation_role: "I work at an office desk",
  physical_limitations: "Knee or joint pain",
  walking_pace: "Casual strolling",
};

// --- EXTRACTED: Local Profile Builder (100% Crash-Proof) ---
function buildProfileLocally(answers: any): UserProfile {
  const heightM = (parseFloat(answers.height_cm) || 160) / 100;
  const weightKg = parseFloat(answers.weight_kg) || 60;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  const dietType = answers.diet_type || '';
  const isVeg = dietType.includes('Vegetarian') || dietType === 'Vegan';
  const diabetesType = answers.diabetes_type || 'None';
  const isDiabetic = !['None / Healthy', 'Not sure', 'None'].includes(diabetesType);

  const conditions = [];
  if (isDiabetic) conditions.push('Diabetic');
  if (answers.has_bp === 'Yes') conditions.push('High BP');
  if (answers.has_cholesterol === 'Yes') conditions.push('High Cholesterol');
  if (answers.has_kidney_issue === 'Yes') conditions.push('Kidney Issue');
  if (answers.has_heart_issue === 'Yes') conditions.push('Heart Issue');

  if (answers.snoring_history && (
    answers.snoring_history.includes('Yes') ||
    answers.snoring_history.includes('diagnosed') ||
    answers.snoring_history.includes('Apnea')
  )) {
    conditions.push('Sleep Apnea Risk');
  }

  const digestiveIssues = [];
  if (answers.bloating === 'Often' || answers.bloating === 'Almost always') digestiveIssues.push('Bloating');
  if (answers.bowel_movement === 'Often constipated') digestiveIssues.push('Constipation');
  if (['Often', 'Almost daily', 'Sometimes (after spicy food)'].includes(answers.acidity_issues)) {
    digestiveIssues.push('Acidity');
  }

  return {
    age: parseInt(answers.age) || 30,
    gender: answers.gender || 'Other',
    region: answers.state || 'Other (India)',
    height: parseFloat(answers.height_cm),
    weight: parseFloat(answers.weight_kg),
    bmi: bmi,
    conditions: conditions,
    diabetesType: diabetesType,
    labValues: {
      hba1c: answers.lab_hba1c,
      fbs: answers.lab_fbs,
      pp: answers.lab_pp
    },
    activityLevel: answers.daily_walking_minutes || '< 15 mins',
    sleepHours: answers.sleep_hours || '6–7 hours',
    stressLevel: answers.overall_stress || 'Moderate',
    dietType: dietType,
    isVegetarian: isVeg,
    cookingOil: answers.oil_type || 'Refined',
    digestiveIssues: digestiveIssues,
    dinnerTime: answers.dinner_time,
    breakfastTime: answers.breakfast_time,
    waterIntake: answers.daily_hydration,
    mealSequencing: answers.meal_sequencing,
    sunlightExposure: (answers.morning_sun === 'Yes, almost daily' || answers.midday_sun === 'Yes, daily (20+ mins)') ? 'Good' : 'Low',
    workSchedule: answers.work_schedule || 'Standard Day Shift',
    eatingSpeed: answers.eating_speed,
    distractedEating: answers.distracted_eating,
    postMealCaffeine: answers.post_meal_caffeine,
    pcosStatus: answers.gender === 'Female' ? answers.pcos_history : 'No',
    menopauseStatus: answers.gender === 'Female' ? answers.menstrual_status : undefined,
    strengthTraining: answers.strength_training,
    occupation_role: answers.occupation_role,
    physical_limitations: answers.physical_limitations,
    walking_pace: answers.walking_pace,
    energy_levels: answers.energy_levels,
  };
}

export default function Home() {
  const [view, setView] = useState<'intro' | 'survey' | 'loading' | 'report'>('intro');

  // Data States
  const [plan, setPlan] = useState<DailyPlan[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [phenotype, setPhenotype] = useState<PhenotypeResult | null>(null);
  const [routine, setRoutine] = useState<RoutineItem[]>([]);
  const [audit, setAudit] = useState<AuditItem[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [hasSavedData, setHasSavedData] = useState<boolean>(false);
  const [transformationReport, setTransformationReport] = useState<TransformationReport | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setHasSavedData(true);
  }, []);

  useEffect(() => {
    if (view === 'report' && userProfile && plan.length > 0) {
      const dataToSave = { userProfile, plan, phenotype, routine, audit, transformationReport, timestamp: new Date().getTime() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      setHasSavedData(true);
    }
  }, [userProfile, plan, phenotype, routine, audit, transformationReport, view]);

  const handleResume = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserProfile(parsed.userProfile);
        setPlan(parsed.plan);
        setPhenotype(parsed.phenotype);
        setRoutine(parsed.routine);
        setAudit(parsed.audit);
        if (parsed.transformationReport) setTransformationReport(parsed.transformationReport);
        setView('report');
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
        setHasSavedData(false);
      }
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedData(false);
    setPlan([]);
    setUserProfile(null);
    setTransformationReport(null);
    setView('intro');
    setSelectedDay(0);
  };

  const handleSurveyComplete = async (answers: any) => {
    setView('loading');

    // 1. Build the perfect profile locally
    const completeProfile = buildProfileLocally(answers);
    setUserProfile(completeProfile);

    // 2. ALWAYS generate these structural reports locally (100% crash-proof!)
    setTransformationReport(generateTransformationReport(completeProfile));
    setPhenotype(determinePhenotype(completeProfile));
    setRoutine(generateDailyRoutine(completeProfile));
    setAudit(generateHabitAudit(completeProfile));

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: completeProfile })
      });

      if (!response.ok) throw new Error('AI Generation failed');

      const aiData = await response.json();

      // 3. ONLY take the dynamic 7-Day Meal Plan from the AI
      setPlan(aiData.plan);

      setView('report');
    } catch (error) {
      console.warn("Falling back to local engines due to AI error:", error);
      setPlan(generateWeeklyPlan(completeProfile));
      setView('report');
    }
  };

  const handleSwap = (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => {
    if (!userProfile) return;
    const currentDayPlan = plan[selectedDay];
    const currentDish = currentDayPlan[slot];
    const slotKey = (slot.charAt(0).toUpperCase() + slot.slice(1)) as MealSlot;
    const newDish = getAlternativeDish(slotKey, userProfile, currentDish.id, plan);
    const updatedPlan = [...plan];
    updatedPlan[selectedDay] = { ...updatedPlan[selectedDay], [slot]: newDish };
    setPlan(updatedPlan);
  };

  // NEW: Handle Custom AI Swap
  const handleCustomSwap = (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner', customMeal: any) => {
    const updatedPlan = [...plan];
    updatedPlan[selectedDay] = { ...updatedPlan[selectedDay], [slot]: customMeal };
    setPlan(updatedPlan);
  };

  return (
    <main className="min-h-screen bg-canvas-50 text-brand-950 font-body pb-16">
      {view === 'intro' && (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-brand-50/30 via-white to-white">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="text-center md:text-left space-y-8 animate-slideUp">
              <div>
                {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-200 bg-white shadow-sm mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                    Healthy Habits & Routine
                  </span>
                </div> */}
                <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-brand-950 tracking-tight leading-[1.1]">
                  Diabetes <br /> Lifestyle <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-teal-500">Planner</span>
                </h1>
              </div>
              <p className="text-lg md:text-xl text-canvas-600 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
                A simple, daily routine guide tailored to your habits, regional diet, and personal wellness goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <button onClick={() => setView('survey')} className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 text-white text-lg font-bold rounded-full shadow-float hover:bg-brand-700 hover:scale-105 transition-all active:scale-95">
                  Start Assessment <ArrowRight size={20} />
                </button>
                <button onClick={() => handleSurveyComplete(DUMMY_ANSWERS)} className="flex items-center justify-center gap-2 px-6 py-4 bg-amber-400 text-amber-950 text-sm font-bold rounded-full shadow-sm hover:bg-amber-500 transition-all active:scale-95">
                  Demo Data
                </button>
                {hasSavedData && (
                  <button onClick={handleResume} className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-700 border border-brand-200 font-semibold rounded-full shadow-soft hover:bg-brand-50 transition-all active:scale-95">
                    <History size={20} /> Resume Profile
                  </button>
                )}
              </div>
            </div>
            {/* Hero Illustration - Visible on Mobile & Desktop */}
            <div className="flex justify-center items-center relative order-first md:order-last h-[300px] sm:h-[400px] md:h-auto w-full mt-4 md:mt-0">
              <div className="scale-50 sm:scale-75 md:scale-100 origin-center transition-transform">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'survey' && (
        <div className="py-12 px-4 bg-canvas-50">
          <Questionnaire data={questionnaire} onComplete={handleSurveyComplete} />
        </div>
      )}

      {view === 'loading' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-brand-50/30 via-white to-white">
          <div className="relative w-24 h-24 mb-10">
            <div className="absolute inset-0 border-4 border-teal-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-brand-950 mb-4 animate-pulse text-center">
            Analyzing your metabolic profile...
          </h2>
          <p className="text-lg text-canvas-600 font-medium max-w-md text-center">
            Our AI is evaluating your clinical history and daily habits to build your custom, medically-aligned transformation plan.
          </p>
        </div>
      )}

      {/* VIEW 4: THE REPORT */}
      {view === 'report' && plan.length > 0 && userProfile && phenotype && (
        <div className="min-h-screen bg-slate-50 pb-24">

          {/* MODERN APP HEADER */}
          <div className="bg-white pt-safe-top pb-6 px-6 rounded-b-5xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] relative z-20">
            <div className="max-w-3xl mx-auto pt-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-teal-600 font-bold text-xs uppercase tracking-widest mb-1.5">
                    Your Blueprint
                  </p>
                  <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight leading-none">
                    {userProfile.name ? `${userProfile.name}'s` : 'Action'} Plan
                  </h2>
                </div>

                {/* Sleek Restart Button */}
                <button
                  onClick={handleReset}
                  className="w-12 h-12 bg-slate-50 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full flex items-center justify-center transition-all active:scale-95"
                  aria-label="Restart Assessment"
                >
                  <ArrowUUpLeft weight="bold" size={22} />
                </button>
              </div>

              {/* PREMIUM APP BADGES */}
              <div className="flex items-center gap-3 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                  <MapPin size={16} weight="duotone" className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-600 tracking-wide">{userProfile.region}</span>
                </div>

                <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border shadow-sm
                  ${userProfile.bmi > 25 ? 'bg-amber-50/50 border-amber-100' : 'bg-emerald-50/50 border-emerald-100'}`}
                >
                  <Heartbeat size={16} weight="duotone" className={userProfile.bmi > 25 ? 'text-amber-500' : 'text-emerald-500'} />
                  <span className={`text-xs font-bold tracking-wide ${userProfile.bmi > 25 ? 'text-amber-700' : 'text-emerald-700'}`}>
                    BMI {userProfile.bmi}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="max-w-3xl mx-auto mt-6 relative">
            <ReportTabs
              report={transformationReport}
              phenotype={phenotype}
              plan={plan}
              routine={routine}
              audit={audit}
              userProfile={userProfile}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              onSwap={handleSwap}
              onCustomSwap={handleCustomSwap}
            />
          </div>

          {/* ADD THE CHAT WIDGET HERE */}
          <MetabolicCompanion userProfile={userProfile} plan={plan} />

          {/* FOOTER */}
          <div className="text-center pt-12 pb-10 px-6">
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-medium">
              This plan is generated based on your inputs and general wellness guidelines. Always consult a healthcare professional before making significant medical changes.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}