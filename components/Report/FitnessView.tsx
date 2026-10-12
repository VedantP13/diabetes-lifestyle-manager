//=======================18/08/26 - Review 1 ==================================


// import React from 'react';
// import { FitnessPlan } from '../../lib/fitness-engine';
// import { 
//   Activity, 
//   Dumbbell, 
//   HeartPulse, 
//   Footprints, 
//   Lightning,
//   CheckCircle2,
//   Flower2 // For Yoga
// } from 'lucide-react';

// interface Props {
//   plan: FitnessPlan;
// }

// export const FitnessView: React.FC<Props> = ({ plan }) => {
//   return (
//     <div className="space-y-8 animate-fadeIn">

//       {/* 1. CARDIO CARD (Hero) */}
//       <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
//         <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
//           <HeartPulse size={150} />
//         </div>

//         <div className="relative z-10">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
//               <Footprints size={24} className="text-white" />
//             </div>
//             <h3 className="text-sm font-bold uppercase tracking-wider text-blue-100">Your Cardio Prescription</h3>
//           </div>

//           <h2 className="text-3xl font-bold mb-2">{plan.cardio.type}</h2>
//           <p className="text-blue-100 text-lg mb-6 max-w-xl">
//             {plan.cardio.protocol}
//           </p>

//           <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
//             <Activity size={16} />
//             <span className="text-sm font-medium">Target: {plan.cardio.focus}</span>
//           </div>
//         </div>
//       </div>

//       {/* 2. STRENGTH & YOGA GRID (Mixed Layout) */}
//       <div className="grid lg:grid-cols-2 gap-8">

//         {/* LEFT COLUMN: STRENGTH */}
//         <div>
//            <div className="flex items-center gap-2 mb-6">
//               <Dumbbell className="text-gray-400" size={24} />
//               <h3 className="text-xl font-bold text-gray-800">
//                 Strength (Glucose Sponge)
//               </h3>
//            </div>

//            <div className="space-y-4">
//               {plan.strength.exercises.map((ex, i) => (
//                 <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
//                   <div className="flex justify-between items-start mb-2">
//                     <h4 className="font-bold text-gray-900">{ex.name}</h4>
//                     <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase">
//                       {ex.tags[0]}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mb-3 leading-snug">
//                     {ex.instructions}
//                   </p>
//                   <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
//                      <span className="flex items-center gap-1"><CheckCircle2 size={12}/> {ex.duration}</span>
//                      <span>•</span>
//                      <span>{ex.frequency}</span>
//                   </div>
//                 </div>
//               ))}
//            </div>
//         </div>

//         {/* RIGHT COLUMN: YOGA & NEAT */}
//         <div className="space-y-8">

//            {/* YOGA SECTION */}
//            <div>
//               <div className="flex items-center gap-2 mb-6">
//                   <Flower2 className="text-rose-400" size={24} />
//                   <h3 className="text-xl font-bold text-gray-800">
//                     Yoga & Recovery
//                   </h3>
//               </div>

//               <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6">
//                   {plan.yoga.asanas.map((asana, i) => (
//                     <div key={i} className={`mb-6 last:mb-0 ${i !== plan.yoga.asanas.length - 1 ? 'border-b border-rose-200/50 pb-6' : ''}`}>
//                        <div className="flex justify-between items-start mb-2">
//                           <h4 className="font-bold text-rose-900">{asana.name}</h4>
//                           <span className="text-[10px] font-bold text-rose-600 bg-white px-2 py-1 rounded-md border border-rose-100">
//                             {asana.tags[0]}
//                           </span>
//                        </div>
//                        <p className="text-sm text-gray-600 mb-2 italic">
//                          "{asana.instructions}"
//                        </p>
//                        <span className="text-xs text-rose-700 font-medium bg-rose-100/50 px-2 py-1 rounded inline-block">
//                           Time: {asana.duration}
//                        </span>
//                     </div>
//                   ))}
//               </div>
//            </div>

//            {/* NEAT SECTION */}
//            <div>
//               <div className="flex items-center gap-2 mb-4">
//                   <Lightning className="text-amber-400" size={24} />
//                   <h3 className="text-lg font-bold text-gray-800">
//                     Lifestyle Hack
//                   </h3>
//               </div>
//               <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
//                   <h4 className="font-bold text-amber-900 mb-1">{plan.neat.title}</h4>
//                   <p className="text-gray-600 text-sm leading-relaxed">{plan.neat.description}</p>
//               </div>
//            </div>

//         </div>
//       </div>
//     </div>
//   );
// };










//======================= Working before 7/10/26 ==================================


// import React from 'react';
// import { FitnessPlan } from '../../lib/fitness-engine';

// interface Props {
//   plan: FitnessPlan;
// }

// export const FitnessView: React.FC<Props> = ({ plan }) => {
//   return (
//     <div className="animate-fadeIn">

//       {/* 1. SECTION HEADER (Perfect match with Analysis Tab) */}
//       <div className="mb-10 border-b border-gray-200 pb-5">
//         <h2 className="text-4xl font-heading font-extrabold text-teal-900 tracking-tight mb-2">
//           Daily Movement Plan
//         </h2>
//         <p className="text-gray-500 text-base">
//           Simple, effective exercises customized for your body and joint health
//         </p>
//       </div>

//       {/* 2. THE WALKING PLAN (Replaced the loud blue banner with a clean, soft layout) */}
//       <div className="bg-teal-50/70 border border-teal-100 rounded-3xl p-6 md:p-8 mb-12">
//         <div className="mb-3">
//           <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-700 bg-teal-100 border border-teal-200">
//             Primary Goal: {plan.cardio.focus}
//           </span>
//         </div>
//         <h3 className="text-2xl font-bold text-teal-900 mb-2">{plan.cardio.type}</h3>
//         <p className="text-teal-800/80 text-base md:text-lg leading-relaxed max-w-3xl font-medium">
//           {plan.cardio.protocol}
//         </p>
//       </div>

//       {/* 3. GRID LAYOUT FOR EXERCISES */}
//       <div className="grid lg:grid-cols-2 gap-10">

//         {/* LEFT COLUMN: STRENGTH */}
//         <div>
//            {/* Clean Header - NO ICON */}
//            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
//              Simple Muscle Building
//            </h3>

//            <div className="space-y-4">
//               {plan.strength.exercises.map((ex, i) => (
//                 <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//                   <div className="flex justify-between items-start mb-3 gap-4">
//                     <h4 className="font-bold text-gray-900 text-lg leading-tight">{ex.name}</h4>
//                     <span className="shrink-0 text-xs font-semibold text-indigo-700 bg-indigo-100 border border-indigo-200 px-3 py-1 rounded-lg">
//                       {ex.tags[0]}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-5 leading-relaxed">
//                     {ex.instructions}
//                   </p>
//                   <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 pt-4 border-t border-gray-50">
//                      <span className="text-indigo-600">{ex.duration}</span>
//                      <span>•</span>
//                      <span>{ex.frequency}</span>
//                   </div>
//                 </div>
//               ))}
//            </div>
//         </div>

//         {/* RIGHT COLUMN: YOGA & HABITS */}
//         <div className="space-y-10">

//            {/* STRETCHING SECTION */}
//            <div>
//               <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
//                 Stretching & Relaxation
//               </h3>

//               <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6">
//                   {plan.yoga.asanas.map((asana, i) => (
//                     <div key={i} className={`mb-6 last:mb-0 ${i !== plan.yoga.asanas.length - 1 ? 'border-b border-rose-100/70 pb-6' : ''}`}>
//                        <div className="flex justify-between items-start mb-3 gap-4">
//                           <h4 className="font-bold text-gray-900 text-lg leading-tight">{asana.name}</h4>
//                           <span className="shrink-0 text-xs font-semibold text-rose-700 bg-rose-100 border border-rose-200 px-3 py-1 rounded-lg">
//                             {asana.tags[0]}
//                           </span>
//                        </div>
//                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
//                           {asana.instructions}
//                        </p>
//                        <div className="text-xs font-semibold text-gray-500">
//                           <span className="text-rose-600">Hold for:</span> {asana.duration}
//                        </div>
//                     </div>
//                   ))}
//               </div>
//            </div>

//            {/* DAILY HABIT SECTION */}
//            <div>
//               <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
//                 Small Daily Habit
//               </h3>
//               <div className="bg-amber-50/70 border border-amber-100 rounded-3xl p-6 relative overflow-hidden">
//                   <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
//                   <h4 className="font-bold text-gray-900 text-lg mb-2">{plan.neat.title}</h4>
//                   <p className="text-gray-700 text-sm leading-relaxed font-medium">{plan.neat.description}</p>
//               </div>
//            </div>

//         </div>
//       </div>
//     </div>
//   );
// };








//======================= 7/10/26  ==================================

// import React from 'react';
// import { FitnessPlan } from '../../lib/fitness-engine';
// import { Lightning, Clock } from '@phosphor-icons/react';

// interface Props {
//   plan: FitnessPlan;
// }

// export const FitnessView: React.FC<Props> = ({ plan }) => {
//   return (
//     <div className="animate-fadeIn">

//       {/* 1. SECTION HEADER */}
//       <div className="mb-10 border-b border-slate-100 pb-5">
//         <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight mb-2">
//           Daily Movement Plan
//         </h2>
//         <p className="text-slate-500 font-medium text-base">
//           Simple, effective exercises customized for your body.
//         </p>
//       </div>

//       {/* 2. THE MICRO-SNACK PLAN */}
//       <div className="bg-teal-50 border border-teal-100 rounded-[32px] p-6 md:p-8 mb-12 shadow-sm">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
//             <Lightning size={20} weight="fill" />
//           </div>
//           <h3 className="text-2xl font-bold text-teal-950">{plan.microSnacks.title}</h3>
//         </div>

//         <p className="text-teal-800 text-sm md:text-base leading-relaxed font-medium mb-6">
//           {plan.microSnacks.protocol}
//         </p>

//         <div className="bg-white rounded-[20px] p-5 shadow-sm border border-teal-100/50">
//            <div className="flex items-center gap-2 mb-4">
//              <Clock size={18} weight="bold" className="text-teal-600" />
//              <span className="font-bold text-slate-800 text-sm uppercase tracking-wider">When: {plan.microSnacks.timing}</span>
//            </div>
//            <ul className="space-y-3">
//              {plan.microSnacks.options.map((opt, i) => (
//                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
//                  <span className="text-teal-500 font-black mt-0.5">•</span>
//                  <span className="leading-relaxed">{opt}</span>
//                </li>
//              ))}
//            </ul>
//         </div>
//       </div>

//       {/* 3. GRID LAYOUT FOR EXERCISES */}
//       <div className="grid lg:grid-cols-2 gap-8 md:gap-10">

//         {/* LEFT COLUMN: STRENGTH */}
//         <div>
//            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
//              Simple Muscle Building
//            </h3>

//            <div className="space-y-4">
//               {plan.strength.exercises.map((ex, i) => (
//                 <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 hover:border-indigo-100 transition-colors">
//                   <div className="flex justify-between items-start mb-3 gap-4">
//                     <h4 className="font-bold text-slate-900 text-lg leading-tight">{ex.name}</h4>
//                     <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg">
//                       {ex.tags[0]}
//                     </span>
//                   </div>
//                   <p className="text-[13px] text-slate-600 mb-5 leading-relaxed font-medium">
//                     {ex.instructions}
//                   </p>
//                   <div className="flex items-center gap-2 text-xs font-bold text-slate-400 pt-4 border-t border-slate-50 uppercase tracking-wider">
//                      <span className="text-indigo-500">{ex.duration}</span>
//                      <span>•</span>
//                      <span>{ex.frequency}</span>
//                   </div>
//                 </div>
//               ))}
//            </div>
//         </div>

//         {/* RIGHT COLUMN: YOGA & HABITS */}
//         <div className="space-y-10">

//            {/* STRETCHING SECTION */}
//            <div>
//               <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
//                 Stretching & Relaxation
//               </h3>

//               <div className="bg-rose-50/50 border border-rose-100 rounded-[32px] p-6">
//                   {plan.yoga.asanas.map((asana, i) => (
//                     <div key={i} className={`mb-6 last:mb-0 ${i !== plan.yoga.asanas.length - 1 ? 'border-b border-rose-100/70 pb-6' : ''}`}>
//                        <div className="flex justify-between items-start mb-3 gap-4">
//                           <h4 className="font-bold text-slate-900 text-lg leading-tight">{asana.name}</h4>
//                           <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase text-rose-700 bg-rose-100/50 border border-rose-200 px-3 py-1.5 rounded-lg">
//                             {asana.tags[0]}
//                           </span>
//                        </div>
//                        <p className="text-[13px] text-slate-600 mb-4 leading-relaxed font-medium">
//                           {asana.instructions}
//                        </p>
//                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
//                           <span className="text-rose-500">Hold for:</span> {asana.duration}
//                        </div>
//                     </div>
//                   ))}
//               </div>
//            </div>

//            {/* DAILY HABIT SECTION */}
//            <div>
//               <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
//                 Small Daily Habit
//               </h3>
//               <div className="bg-amber-50/70 border border-amber-100 rounded-[24px] p-6 relative overflow-hidden">
//                   <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
//                   <h4 className="font-bold text-slate-900 text-lg mb-2">{plan.neat.title}</h4>
//                   <p className="text-slate-700 text-[13px] leading-relaxed font-medium">{plan.neat.description}</p>
//               </div>
//            </div>

//         </div>
//       </div>
//     </div>
//   );
// };








//======================= 11/10/26  ==================================

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { FitnessPlan } from '../../lib/fitness-engine';
// import { UserProfile } from '../../lib/generator';
// import { computeAQI, isUnsafeOutdoors, chooseMovementMode } from '@/lib/naqi';
// import { Lightning, Clock, Thermometer, Wind, WarningCircle, HouseLine, Moon } from '@phosphor-icons/react';

// interface Props {
//   plan: FitnessPlan;
//   userProfile: UserProfile;
//   isSleepDeprived?: boolean; // NEW PROP
// }

// export const FitnessView: React.FC<Props> = ({ plan, userProfile, isSleepDeprived }) => {
//   const [envData, setEnvData] = useState({ temp: 0, aqi: 0, isHighRisk: false, loading: true });

//   useEffect(() => {
//     // Fallback coordinates if the user denies location access
//     const getFallbackCoordinates = (region: string) => {
//       const r = region.toLowerCase();
//       if (r.includes('delhi')) return { lat: 28.6139, lon: 77.2090 };
//       if (r.includes('maharashtra') || r.includes('mumbai')) return { lat: 19.0760, lon: 72.8777 };
//       if (r.includes('tamil nadu') || r.includes('vellore') || r.includes('chennai')) return { lat: 12.9165, lon: 79.1325 };
//       return { lat: 20.5937, lon: 78.9629 };
//     };

//     const fetchEnvironmentalData = async (lat: number, lon: number) => {
//       try {
//         // Fetch Temp, PM2.5, and PM10 to calculate the Indian NAQI
//         const [weatherRes, aqiRes] = await Promise.all([
//           fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`),
//           fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5`)
//         ]);

//         const weatherData = await weatherRes.json();
//         const aqiData = await aqiRes.json();

//         const temp = weatherData.current?.temperature_2m || 30;
//         const pm25 = aqiData.current?.pm2_5 || 15;
//         const pm10 = aqiData.current?.pm10 || 30;

//         // Indian CPCB NAQI Calculation Logic
//         const calcNAQI = (cp: number, bp: number[][]) => {
//           for (const [bplo, bphi, ilo, ihi] of bp) {
//             if (cp <= bphi) {
//               return Math.round(((ihi - ilo) / (bphi - bplo)) * (Math.max(cp, bplo) - bplo) + ilo);
//             }
//           }
//           return 500;
//         };

//         // CPCB Breakpoints: [Concentration Low, Concentration High, Index Low, Index High]
//         const pm25AQI = calcNAQI(pm25, [
//           [0, 30, 0, 50], [31, 60, 51, 100], [61, 90, 101, 200],
//           [91, 120, 201, 300], [121, 250, 301, 400], [251, 9999, 401, 500]
//         ]);

//         const pm10AQI = calcNAQI(pm10, [
//           [0, 50, 0, 50], [51, 100, 51, 100], [101, 250, 101, 200],
//           [251, 350, 201, 300], [351, 430, 301, 400], [431, 9999, 401, 500]
//         ]);

//         // Overall AQI is the maximum of the individual pollutant sub-indices
//         const indianAQI = Math.max(pm25AQI, pm10AQI);

//         // Indian Clinical Safety Thresholds: Temp > 35°C or Indian AQI > 200 (Poor/Severe)
//         const isHighRisk = temp > 35 || indianAQI > 200;

//         setEnvData({ temp, aqi: indianAQI, isHighRisk, loading: false });
//       } catch (error) {
//         console.error("API Error", error);
//         setEnvData({ temp: 30, aqi: 50, isHighRisk: false, loading: false });
//       }
//     };

//     // Attempt to get hyper-local device coordinates first
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           fetchEnvironmentalData(position.coords.latitude, position.coords.longitude);
//         },
//         (error) => {
//           console.warn("Location denied or unavailable. Using state fallback.", error);
//           const fallback = getFallbackCoordinates(userProfile.region);
//           fetchEnvironmentalData(fallback.lat, fallback.lon);
//         },
//         { timeout: 5000 } // Don't hang forever if GPS is searching
//       );
//     } else {
//       const fallback = getFallbackCoordinates(userProfile.region);
//       fetchEnvironmentalData(fallback.lat, fallback.lon);
//     }
//   }, [userProfile.region]);

//   // NEW: HIERARCHICAL PIVOT LOGIC (Sleep overrides Environment)
//   let activeCardio = plan.microSnacks;

//   if (isSleepDeprived) {
//     activeCardio = {
//       title: "Parasympathetic Recovery Walk",
//       focus: "Recovery", // <-- ADD THIS LINE
//       protocol: "Your sleep debt has placed your body in a high-stress state. High-intensity cardio will only elevate cortisol further and impair insulin sensitivity. Swap today's workout for a 15-minute gentle stroll and box breathing.",
//       timing: "Morning or Post-Lunch",
//       options: plan.microSnacks.options
//     };
//   } else if (envData.isHighRisk) {
//     activeCardio = {
//       title: "Indoor Metabolic Circuit",
//       focus: "Indoor Cardio", // <-- ADD THIS LINE
//       protocol: "Outdoor movement is currently contraindicated due to environmental risks. Perform a 20-minute indoor circuit: 5 mins brisk on-the-spot marching, 10 mins seated resistance band work, and 5 mins standing wall push-ups.",
//       timing: "Flexible (Indoor, AC/Fan environment recommended)",
//       options: plan.microSnacks.options
//     };
//   }

//   return (
//     <div className="animate-fadeIn">

//       {/* SECTION HEADER */}
//       <div className="mb-10 border-b border-slate-100 pb-5">
//         <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight mb-2">
//           Daily Movement Plan
//         </h2>
//         <p className="text-slate-500 font-medium text-base">
//           Simple, effective exercises customized for your body and environment.
//         </p>
//       </div>

//       {/* NEW: SLEEP DEBT WARNING BANNER */}
//       {isSleepDeprived && (
//         <div className="mb-6 p-4 rounded-2xl border bg-indigo-50 border-indigo-200 flex items-center justify-between shadow-sm">
//           <div className="flex items-center gap-3">
//             <Moon size={24} weight="duotone" className="text-indigo-600 shrink-0" />
//             <div>
//               <h4 className="font-bold text-indigo-900 text-sm">Rest Day Activated</h4>
//               <p className="text-indigo-800 text-xs font-medium mt-0.5">Strength training is counterproductive under acute sleep deprivation. Focus entirely on recovery.</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ENVIRONMENTAL CONTEXT BANNER */}
//       {!envData.loading && !isSleepDeprived && (
//         <div className={`mb-6 p-4 rounded-2xl border flex items-center justify-between shadow-sm transition-all
//           ${envData.isHighRisk ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-100'}`}
//         >
//           <div className="flex items-center gap-4 md:gap-8">
//             <div className="flex items-center gap-2">
//               <Thermometer size={24} weight="duotone" className={envData.isHighRisk && envData.temp > 35 ? 'text-rose-600' : 'text-emerald-600'} />
//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Local Temp</p>
//                 <p className={`font-black text-lg ${envData.isHighRisk && envData.temp > 35 ? 'text-rose-700' : 'text-slate-800'}`}>{envData.temp}°C</p>
//               </div>
//             </div>
//             <div className="w-px h-8 bg-slate-200"></div>
//             <div className="flex items-center gap-2">
//               <Wind size={24} weight="duotone" className={envData.isHighRisk && envData.aqi > 150 ? 'text-rose-600' : 'text-emerald-600'} />
//               <div>
//                 <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Air Quality</p>
//                 <p className={`font-black text-lg ${envData.isHighRisk && envData.aqi > 150 ? 'text-rose-700' : 'text-slate-800'}`}>AQI {envData.aqi}</p>
//               </div>
//             </div>
//           </div>

//           {envData.isHighRisk && (
//             <div className="hidden md:flex items-center gap-2 bg-rose-100 px-3 py-1.5 rounded-lg">
//               <WarningCircle size={16} weight="fill" className="text-rose-600" />
//               <span className="text-xs font-bold text-rose-800">Routine Pivoted to Indoor Safety</span>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ADAPTIVE MICRO-SNACK PLAN */}
//       <div className={`border rounded-[32px] p-6 md:p-8 mb-12 shadow-sm transition-colors
//         ${isSleepDeprived ? 'bg-indigo-50 border-indigo-200' : envData.isHighRisk ? 'bg-rose-50/50 border-rose-200' : 'bg-teal-50 border-teal-100'}`}
//       >
//         <div className="flex items-center gap-3 mb-4">
//           <div className={`w-10 h-10 rounded-full flex items-center justify-center 
//             ${isSleepDeprived ? 'bg-indigo-100 text-indigo-600' : envData.isHighRisk ? 'bg-rose-100 text-rose-600' : 'bg-teal-100 text-teal-600'}`}>
//             {isSleepDeprived ? <Moon size={20} weight="fill" /> : envData.isHighRisk ? <HouseLine size={20} weight="fill" /> : <Lightning size={20} weight="fill" />}
//           </div>
//           <h3 className={`text-2xl font-bold ${isSleepDeprived ? 'text-indigo-950' : envData.isHighRisk ? 'text-rose-950' : 'text-teal-950'}`}>
//             {activeCardio.title}
//           </h3>
//         </div>

//         <p className={`text-sm md:text-base leading-relaxed font-medium mb-6 ${isSleepDeprived ? 'text-indigo-900' : envData.isHighRisk ? 'text-rose-900' : 'text-teal-800'}`}>
//           {activeCardio.protocol}
//         </p>

//         <div className={`bg-white rounded-[20px] p-5 shadow-sm border ${isSleepDeprived ? 'border-indigo-100' : envData.isHighRisk ? 'border-rose-100' : 'border-teal-100/50'}`}>
//           <div className="flex items-center gap-2 mb-4">
//             <Clock size={18} weight="bold" className={isSleepDeprived ? 'text-indigo-600' : envData.isHighRisk ? 'text-rose-600' : 'text-teal-600'} />
//             <span className="font-bold text-slate-800 text-sm uppercase tracking-wider">When: {activeCardio.timing}</span>
//           </div>

//           {!envData.isHighRisk && !isSleepDeprived && (
//             <ul className="space-y-3">
//               {activeCardio.options?.map((opt, i) => (
//                 <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
//                   <span className="text-teal-500 font-black mt-0.5">•</span>
//                   <span className="leading-relaxed">{opt}</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* GRID LAYOUT FOR EXERCISES */}
//       <div className="grid lg:grid-cols-2 gap-8 md:gap-10">

//         {/* LEFT COLUMN: STRENGTH (Hidden if sleep deprived) */}
//         {!isSleepDeprived && (
//           <div>
//             <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
//               Simple Muscle Building
//             </h3>

//             <div className="space-y-4">
//               {plan.strength.exercises.map((ex, i) => (
//                 <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 hover:border-indigo-100 transition-colors">
//                   <div className="flex justify-between items-start mb-3 gap-4">
//                     <h4 className="font-bold text-slate-900 text-lg leading-tight">{ex.name}</h4>
//                     <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg">
//                       {ex.tags[0]}
//                     </span>
//                   </div>
//                   <p className="text-[13px] text-slate-600 mb-5 leading-relaxed font-medium">
//                     {ex.instructions}
//                   </p>
//                   <div className="flex items-center gap-2 text-xs font-bold text-slate-400 pt-4 border-t border-slate-50 uppercase tracking-wider">
//                     <span className="text-indigo-500">{ex.duration}</span>
//                     <span>•</span>
//                     <span>{ex.frequency}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* RIGHT COLUMN: YOGA & HABITS (Spans full width if strength is hidden) */}
//         <div className={`space-y-10 ${isSleepDeprived ? 'lg:col-span-2 grid md:grid-cols-2 gap-8 space-y-0' : ''}`}>

//           {/* STRETCHING SECTION */}
//           <div>
//             <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
//               Stretching & Relaxation
//             </h3>

//             <div className="bg-rose-50/50 border border-rose-100 rounded-[32px] p-6 h-full">
//               {plan.yoga.asanas.map((asana, i) => (
//                 <div key={i} className={`mb-6 last:mb-0 ${i !== plan.yoga.asanas.length - 1 ? 'border-b border-rose-100/70 pb-6' : ''}`}>
//                   <div className="flex justify-between items-start mb-3 gap-4">
//                     <h4 className="font-bold text-slate-900 text-lg leading-tight">{asana.name}</h4>
//                     <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase text-rose-700 bg-rose-100/50 border border-rose-200 px-3 py-1.5 rounded-lg">
//                       {asana.tags[0]}
//                     </span>
//                   </div>
//                   <p className="text-[13px] text-slate-600 mb-4 leading-relaxed font-medium">
//                     {asana.instructions}
//                   </p>
//                   <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
//                     <span className="text-rose-500">Hold for:</span> {asana.duration}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* DAILY HABIT SECTION */}
//           <div>
//             <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
//               Small Daily Habit
//             </h3>
//             <div className="bg-amber-50/70 border border-amber-100 rounded-[24px] p-6 relative overflow-hidden h-full">
//               <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
//               <h4 className="font-bold text-slate-900 text-lg mb-2">{plan.neat.title}</h4>
//               <p className="text-slate-700 text-[13px] leading-relaxed font-medium">{plan.neat.description}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };












//======================= 12/10/26  ==================================


'use client';

import React, { useState, useEffect } from 'react';
import { FitnessPlan } from '../../lib/fitness-engine';
import { UserProfile } from '../../lib/generator';
import { computeAQI, isUnsafeOutdoors, chooseMovementMode } from '@/lib/naqi';
import { Lightning, Clock, Thermometer, Wind, WarningCircle, HouseLine, Moon } from '@phosphor-icons/react';

interface Props {
  plan: FitnessPlan;
  userProfile: UserProfile;
  isSleepDeprived?: boolean; // NEW PROP
}

export const FitnessView: React.FC<Props> = ({ plan, userProfile, isSleepDeprived }) => {
  const [envData, setEnvData] = useState({ temp: 0, aqi: 0, isHighRisk: false, loading: true });

  useEffect(() => {
    // Fallback coordinates if the user denies location access
    const getFallbackCoordinates = (region: string) => {
      const r = region.toLowerCase();
      if (r.includes('delhi')) return { lat: 28.6139, lon: 77.2090 };
      if (r.includes('maharashtra') || r.includes('mumbai')) return { lat: 19.0760, lon: 72.8777 };
      if (r.includes('tamil nadu') || r.includes('vellore') || r.includes('chennai')) return { lat: 12.9165, lon: 79.1325 };
      return { lat: 20.5937, lon: 78.9629 };
    };

    const fetchEnvironmentalData = async (lat: number, lon: number) => {
      try {
        // Fetch Temp, PM2.5, and PM10 to calculate the Indian NAQI
        const [weatherRes, aqiRes] = await Promise.all([
          fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`),
          fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5`)
        ]);

        const weatherData = await weatherRes.json();
        const aqiData = await aqiRes.json();

        const temp = weatherData.current?.temperature_2m || 30;
        const pm25 = aqiData.current?.pm2_5 || 15;
        const pm10 = aqiData.current?.pm10 || 30;

        const indianAQI = computeAQI(pm25, pm10);
        const isHighRisk = isUnsafeOutdoors(temp, indianAQI);

        setEnvData({ temp, aqi: indianAQI, isHighRisk, loading: false });
      } catch (error) {
        console.error("API Error", error);
        setEnvData({ temp: 30, aqi: 50, isHighRisk: false, loading: false });
      }
    };

    // Attempt to get hyper-local device coordinates first
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchEnvironmentalData(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.warn("Location denied or unavailable. Using state fallback.", error);
          const fallback = getFallbackCoordinates(userProfile.region);
          fetchEnvironmentalData(fallback.lat, fallback.lon);
        },
        { timeout: 5000 } // Don't hang forever if GPS is searching
      );
    } else {
      const fallback = getFallbackCoordinates(userProfile.region);
      fetchEnvironmentalData(fallback.lat, fallback.lon);
    }
  }, [userProfile.region]);

  // NEW: HIERARCHICAL PIVOT LOGIC (Sleep overrides Environment)
  let activeCardio = plan.microSnacks;

  const mode = chooseMovementMode(isSleepDeprived ?? false, envData.isHighRisk);

  if (mode === 'recovery') {
    activeCardio = {
      title: "Parasympathetic Recovery Walk",
      focus: "Recovery", // <-- ADD THIS LINE
      protocol: "Your sleep debt has placed your body in a high-stress state. High-intensity cardio will only elevate cortisol further and impair insulin sensitivity. Swap today's workout for a 15-minute gentle stroll and box breathing.",
      timing: "Morning or Post-Lunch",
      options: plan.microSnacks.options
    };
  } else if (mode === 'indoor') {
    activeCardio = {
      title: "Indoor Metabolic Circuit",
      focus: "Indoor Cardio", // <-- ADD THIS LINE
      protocol: "Outdoor movement is currently contraindicated due to environmental risks. Perform a 20-minute indoor circuit: 5 mins brisk on-the-spot marching, 10 mins seated resistance band work, and 5 mins standing wall push-ups.",
      timing: "Flexible (Indoor, AC/Fan environment recommended)",
      options: plan.microSnacks.options
    };
  }

  return (
    <div className="animate-fadeIn">

      {/* SECTION HEADER */}
      <div className="mb-10 border-b border-slate-100 pb-5">
        <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight mb-2">
          Daily Movement Plan
        </h2>
        <p className="text-slate-500 font-medium text-base">
          Simple, effective exercises customized for your body and environment.
        </p>
      </div>

      {/* NEW: SLEEP DEBT WARNING BANNER */}
      {isSleepDeprived && (
        <div className="mb-6 p-4 rounded-2xl border bg-indigo-50 border-indigo-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Moon size={24} weight="duotone" className="text-indigo-600 shrink-0" />
            <div>
              <h4 className="font-bold text-indigo-900 text-sm">Rest Day Activated</h4>
              <p className="text-indigo-800 text-xs font-medium mt-0.5">Strength training is counterproductive under acute sleep deprivation. Focus entirely on recovery.</p>
            </div>
          </div>
        </div>
      )}

      {/* ENVIRONMENTAL CONTEXT BANNER */}
      {!envData.loading && !isSleepDeprived && (
        <div className={`mb-6 p-4 rounded-2xl border flex items-center justify-between shadow-sm transition-all
          ${envData.isHighRisk ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-100'}`}
        >
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <Thermometer size={24} weight="duotone" className={envData.isHighRisk && envData.temp > 35 ? 'text-rose-600' : 'text-emerald-600'} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Local Temp</p>
                <p className={`font-black text-lg ${envData.isHighRisk && envData.temp > 35 ? 'text-rose-700' : 'text-slate-800'}`}>{envData.temp}°C</p>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <Wind size={24} weight="duotone" className={envData.isHighRisk && envData.aqi > 150 ? 'text-rose-600' : 'text-emerald-600'} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Air Quality</p>
                <p className={`font-black text-lg ${envData.isHighRisk && envData.aqi > 150 ? 'text-rose-700' : 'text-slate-800'}`}>AQI {envData.aqi}</p>
              </div>
            </div>
          </div>

          {envData.isHighRisk && (
            <div className="hidden md:flex items-center gap-2 bg-rose-100 px-3 py-1.5 rounded-lg">
              <WarningCircle size={16} weight="fill" className="text-rose-600" />
              <span className="text-xs font-bold text-rose-800">Routine Pivoted to Indoor Safety</span>
            </div>
          )}
        </div>
      )}

      {/* ADAPTIVE MICRO-SNACK PLAN */}
      <div className={`border rounded-[32px] p-6 md:p-8 mb-12 shadow-sm transition-colors
        ${isSleepDeprived ? 'bg-indigo-50 border-indigo-200' : envData.isHighRisk ? 'bg-rose-50/50 border-rose-200' : 'bg-teal-50 border-teal-100'}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center
            ${isSleepDeprived ? 'bg-indigo-100 text-indigo-600' : envData.isHighRisk ? 'bg-rose-100 text-rose-600' : 'bg-teal-100 text-teal-600'}`}>
            {isSleepDeprived ? <Moon size={20} weight="fill" /> : envData.isHighRisk ? <HouseLine size={20} weight="fill" /> : <Lightning size={20} weight="fill" />}
          </div>
          <h3 className={`text-2xl font-bold ${isSleepDeprived ? 'text-indigo-950' : envData.isHighRisk ? 'text-rose-950' : 'text-teal-950'}`}>
            {activeCardio.title}
          </h3>
        </div>

        <p className={`text-sm md:text-base leading-relaxed font-medium mb-6 ${isSleepDeprived ? 'text-indigo-900' : envData.isHighRisk ? 'text-rose-900' : 'text-teal-800'}`}>
          {activeCardio.protocol}
        </p>

        <div className={`bg-white rounded-[20px] p-5 shadow-sm border ${isSleepDeprived ? 'border-indigo-100' : envData.isHighRisk ? 'border-rose-100' : 'border-teal-100/50'}`}>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} weight="bold" className={isSleepDeprived ? 'text-indigo-600' : envData.isHighRisk ? 'text-rose-600' : 'text-teal-600'} />
            <span className="font-bold text-slate-800 text-sm uppercase tracking-wider">When: {activeCardio.timing}</span>
          </div>

          {!envData.isHighRisk && !isSleepDeprived && (
            <ul className="space-y-3">
              {activeCardio.options?.map((opt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                  <span className="text-teal-500 font-black mt-0.5">•</span>
                  <span className="leading-relaxed">{opt}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* GRID LAYOUT FOR EXERCISES */}
      <div className="grid lg:grid-cols-2 gap-8 md:gap-10">

        {/* LEFT COLUMN: STRENGTH (Hidden if sleep deprived) */}
        {!isSleepDeprived && (
          <div>
            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
              Simple Muscle Building
            </h3>

            <div className="space-y-4">
              {plan.strength.exercises.map((ex, i) => (
                <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 hover:border-indigo-100 transition-colors">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h4 className="font-bold text-slate-900 text-lg leading-tight">{ex.name}</h4>
                    <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg">
                      {ex.tags[0]}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-600 mb-5 leading-relaxed font-medium">
                    {ex.instructions}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 pt-4 border-t border-slate-50 uppercase tracking-wider">
                    <span className="text-indigo-500">{ex.duration}</span>
                    <span>•</span>
                    <span>{ex.frequency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: YOGA & HABITS (Spans full width if strength is hidden) */}
        <div className={`space-y-10 ${isSleepDeprived ? 'lg:col-span-2 grid md:grid-cols-2 gap-8 space-y-0' : ''}`}>

          {/* STRETCHING SECTION */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
              Stretching & Relaxation
            </h3>

            <div className="bg-rose-50/50 border border-rose-100 rounded-[32px] p-6 h-full">
              {plan.yoga.asanas.map((asana, i) => (
                <div key={i} className={`mb-6 last:mb-0 ${i !== plan.yoga.asanas.length - 1 ? 'border-b border-rose-100/70 pb-6' : ''}`}>
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h4 className="font-bold text-slate-900 text-lg leading-tight">{asana.name}</h4>
                    <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase text-rose-700 bg-rose-100/50 border border-rose-200 px-3 py-1.5 rounded-lg">
                      {asana.tags[0]}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-600 mb-4 leading-relaxed font-medium">
                    {asana.instructions}
                  </p>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span className="text-rose-500">Hold for:</span> {asana.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DAILY HABIT SECTION */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
              Small Daily Habit
            </h3>
            <div className="bg-amber-50/70 border border-amber-100 rounded-[24px] p-6 relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400"></div>
              <h4 className="font-bold text-slate-900 text-lg mb-2">{plan.neat.title}</h4>
              <p className="text-slate-700 text-[13px] leading-relaxed font-medium">{plan.neat.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
