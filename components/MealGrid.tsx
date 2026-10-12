// // import React from 'react';
// // import { DailyPlan, Meal } from '../lib/generator';
// // import { Icons } from './Icons';

// // interface Props {
// //   plan: DailyPlan[];
// //   selectedDay: number;
// //   setSelectedDay: (day: number) => void;
// //   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
// // }

// // export default function MealGrid({ plan, selectedDay, setSelectedDay, onSwap }: Props) {
// //   // Safety check: if plan is empty or selectedDay is out of bounds
// //   if (!plan || !plan[selectedDay]) {
// //     return null;
// //   }

// //   const currentDayData = plan[selectedDay];

// //   // Define slots explicitly so TypeScript knows these keys return a 'Meal' object
// //   const slots = ['breakfast', 'lunch', 'snack', 'dinner'] as const;

// //   return (
// //     <div className="mb-8">
// //       <h3 className="text-2xl font-bold text-slate-900 mb-6">Weekly Meal Guide</h3>

// //       {/* Day Tabs */}
// //       <div className="flex overflow-x-auto gap-2 mb-6 pb-2 no-scrollbar">
// //         {plan.map((_, index) => (
// //           <button
// //             key={index}
// //             onClick={() => setSelectedDay(index)}
// //             className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
// //               selectedDay === index 
// //               ? 'bg-slate-900 text-white shadow-lg' 
// //               : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
// //             }`}
// //           >
// //             Day {index + 1}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Grid */}
// //       <div className="grid md:grid-cols-2 gap-6">
// //         {slots.map((slot) => {
// //           // Explicitly access the property. TS now knows this is a 'Meal'
// //           const meal = currentDayData[slot]; 

// //           // Fix for "possibly undefined": If data is missing for some reason, don't render card
// //           if (!meal) return null;

// //           const slotName = slot.charAt(0).toUpperCase() + slot.slice(1);

// //           const styles = {
// //             breakfast: 'bg-orange-50/50 border-orange-100 hover:border-orange-200',
// //             lunch: 'bg-green-50/50 border-green-100 hover:border-green-200',
// //             snack: 'bg-yellow-50/50 border-yellow-100 hover:border-yellow-200',
// //             dinner: 'bg-indigo-50/50 border-indigo-100 hover:border-indigo-200'
// //           };

// //           const badgeStyles = {
// //             breakfast: 'text-orange-700 bg-orange-100',
// //             lunch: 'text-green-700 bg-green-100',
// //             snack: 'text-yellow-700 bg-yellow-100',
// //             dinner: 'text-indigo-700 bg-indigo-100'
// //           };

// //           return (
// //             <div key={slot} className={`p-6 rounded-3xl border transition-all relative group ${styles[slot]}`}>
// //               <div className="flex justify-between items-start mb-3">
// //                 <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${badgeStyles[slot]}`}>
// //                   {slotName === 'Snack' ? 'Evening Snack' : slotName}
// //                 </span>
// //                 <button 
// //                   onClick={() => onSwap(slot)}
// //                   title="See alternative option"
// //                   className="p-2 bg-white rounded-full shadow-sm hover:shadow text-slate-400 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100"
// //                 >
// //                   <Icons.Refresh />
// //                 </button>
// //               </div>

// //               <h4 className="text-xl font-bold text-slate-800 mb-2">{meal.name}</h4>
// //               <p className="text-slate-600 text-sm mb-4 leading-relaxed">{meal.description}</p>

// //               <div className="flex flex-wrap gap-2">
// //                 {meal.tags?.map((tag: string) => (
// //                   <span key={tag} className="text-[10px] font-medium bg-white px-2.5 py-1 rounded-md border border-slate-100 text-slate-500 shadow-sm">
// //                     {tag}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }












// //BEST UI

// // import React from 'react';
// // import { DailyPlan } from '../lib/generator';
// // import { 
// //   Coffee, 
// //   Sun, 
// //   Sunset, 
// //   Moon, 
// //   RefreshCw, 
// //   Leaf,
// //   Dumbbell,
// //   Heart,
// //   Circle,
// //   Triangle
// // } from 'lucide-react';

// // interface MealGridProps {
// //   plan: DailyPlan[];
// //   selectedDay: number;
// //   setSelectedDay: (day: number) => void;
// //   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
// // }

// // const MealGrid: React.FC<MealGridProps> = ({ plan, selectedDay, setSelectedDay, onSwap }) => {
// //   if (!plan || plan.length === 0) return null;

// //   const currentDay = plan[selectedDay];

// //   // --- 1. SMART TAG LOGIC ---
// //   const getSmartTags = (meal: any) => {
// //     const tags = [];
// //     const text = (meal.name + ' ' + meal.description).toLowerCase();

// //     // Protein Logic
// //     if (text.includes('chicken') || text.includes('egg') || text.includes('paneer') || text.includes('dal') || text.includes('fish') || text.includes('soya')) {
// //       tags.push({ label: 'High Protein', icon: Dumbbell, color: 'text-blue-600 bg-blue-50' });
// //     }

// //     // Fiber/Gut Logic
// //     if (text.includes('oats') || text.includes('salad') || text.includes('methi') || text.includes('palak') || text.includes('vegetable') || text.includes('fiber')) {
// //       tags.push({ label: 'High Fiber', icon: Leaf, color: 'text-emerald-600 bg-emerald-50' });
// //     }

// //     // Heart Health
// //     if (text.includes('walnut') || text.includes('flax') || text.includes('fish') || text.includes('olive')) {
// //       tags.push({ label: 'Heart Safe', icon: Heart, color: 'text-rose-600 bg-rose-50' });
// //     }

// //     // Default Tag
// //     if (tags.length === 0) {
// //       tags.push({ label: 'Balanced', icon: Leaf, color: 'text-slate-600 bg-slate-50' });
// //     }

// //     return tags.slice(0, 2); 
// //   };

// //   // --- 2. DIET TYPE DETECTOR (Veg/Non-Veg) ---
// //   const getDietType = (meal: any) => {
// //     const text = (meal.name + ' ' + meal.description).toLowerCase();
// //     const isNonVeg = text.includes('chicken') || text.includes('egg') || text.includes('fish') || text.includes('mutton') || text.includes('prawn') || text.includes('non-veg');

// //     if (isNonVeg) {
// //       return { label: 'Non-Veg', icon: Triangle, color: 'text-red-600 border-red-600' };
// //     }
// //     return { label: 'Veg', icon: Circle, color: 'text-green-600 border-green-600' };
// //   };

// //   // --- 3. PREP TIME ESTIMATOR ---
// //   const getPrepTime = (slot: string) => {
// //     switch(slot) {
// //       case 'Breakfast': return '10-15 mins';
// //       case 'Lunch': return '25-30 mins';
// //       case 'Snack': return '2 mins';
// //       case 'Dinner': return '20 mins';
// //       default: return '15 mins';
// //     }
// //   };

// //   // Helper to render the meal card
// //   const renderMealCard = (slot: string, meal: any, icon: React.ReactNode, colorClass: string) => {
// //     const smartTags = getSmartTags(meal);
// //     const diet = getDietType(meal);
// //     const DietIcon = diet.icon;
// //     const prepTime = getPrepTime(slot);

// //     return (
// //       <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col h-full">

// //         {/* Left Accent Bar */}
// //         <div className={`absolute left-0 top-0 bottom-0 w-1 ${colorClass}`}></div>

// //         {/* Header: Slot Name + Swap */}
// //         <div className="flex justify-between items-start mb-3">
// //           <div className="flex items-center gap-2">
// //             <div className={`p-1.5 rounded-lg ${colorClass.replace('bg-', 'bg-opacity-10 text-')}`}>
// //               {icon}
// //             </div>
// //             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
// //               {slot} • {prepTime}
// //             </span>
// //           </div>

// //           <button 
// //             onClick={() => onSwap(slot.toLowerCase() as any)}
// //             className="text-slate-300 hover:text-blue-600 transition-colors p-1"
// //             title="Swap this meal"
// //           >
// //             <RefreshCw size={14} />
// //           </button>
// //         </div>

// //         {/* Meal Name */}
// //         <h4 className="font-bold text-slate-800 text-lg mb-1 leading-tight group-hover:text-blue-700 transition-colors">
// //           {meal.name}
// //         </h4>

// //         {/* Description */}
// //         <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
// //           {meal.description}
// //         </p>

// //         {/* Footer: Tags + Veg/Non-Veg Badge */}
// //         <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">

// //           {/* Smart Benefit Tags */}
// //           <div className="flex gap-2">
// //             {smartTags.map((tag, i) => {
// //               const TagIcon = tag.icon;
// //               return (
// //                 <div key={i} className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase ${tag.color}`}>
// //                    <TagIcon size={10} />
// //                    {tag.label}
// //                 </div>
// //               );
// //             })}
// //           </div>

// //           {/* Veg/Non-Veg Indicator */}
// //           <div className={`flex items-center justify-center w-5 h-5 border-2 rounded-sm ${diet.color} p-[2px]`}>
// //              <DietIcon size={10} fill="currentColor" />
// //           </div>

// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="animate-fadeIn">

// //       {/* 1. DAY SELECTOR (Cleaned Up) */}
// //       <div className="mb-8 overflow-x-auto no-scrollbar pb-2">
// //         <div className="flex gap-3 min-w-max">
// //           {plan.map((day, index) => {
// //             const isActive = selectedDay === index;
// //             const dayLabel = index === 0 ? "Today" : index === 1 ? "Tomorrow" : `Day ${index + 1}`;

// //             return (
// //               <button
// //                 key={index}
// //                 onClick={() => setSelectedDay(index)}
// //                 className={`
// //                   flex flex-col items-start p-3 rounded-xl border transition-all min-w-[100px] md:min-w-[120px]
// //                   ${isActive 
// //                     ? 'bg-blue-600 border-blue-600 text-white shadow-lg ring-2 ring-blue-100' 
// //                     : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:bg-blue-50'
// //                   }
// //                 `}
// //               >
// //                 <span className={`text-[10px] font-bold uppercase mb-1 ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
// //                   {dayLabel}
// //                 </span>
// //                 <span className="text-sm md:text-lg font-bold">
// //                   {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index % 7]}
// //                 </span>
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* 2. MEAL GRID DISPLAY */}
// //       <div className="grid md:grid-cols-2 gap-4 md:gap-6">
// //         {renderMealCard('Breakfast', currentDay.breakfast, <Coffee size={18} />, 'bg-amber-500')}
// //         {renderMealCard('Lunch', currentDay.lunch, <Sun size={18} />, 'bg-orange-500')}
// //         {renderMealCard('Snack', currentDay.snack, <Sunset size={18} />, 'bg-rose-500')}
// //         {renderMealCard('Dinner', currentDay.dinner, <Moon size={18} />, 'bg-indigo-500')}
// //       </div>

// //     </div>
// //   );
// // };

// // export default MealGrid;













// //ok ok

// // 'use client';

// // import React from 'react';
// // import { RefreshCw, ChefHat, Sun, Sunset, Moon, Coffee } from 'lucide-react';
// // import { DailyPlan, UserProfile } from '../lib/generator';
// // import { motion } from 'framer-motion';

// // interface MealGridProps {
// //   plan: DailyPlan[];
// //   selectedDay: number;
// //   userProfile: UserProfile;
// //   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
// // }

// // export default function MealGrid({ plan, selectedDay, userProfile, onSwap }: MealGridProps) {
// //   const dayPlan = plan[selectedDay];

// //   if (!dayPlan) return null;

// //   const MealCard = ({ 
// //     slot, 
// //     icon: Icon, 
// //     data, 
// //     time 
// //   }: { 
// //     slot: 'breakfast' | 'lunch' | 'snack' | 'dinner'; 
// //     icon: any; 
// //     data: any; 
// //     time: string;
// //   }) => (
// //     <motion.div 
// //       initial={{ opacity: 0, y: 10 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
// //     >
// //       {/* Accent Top Bar */}
// //       <div className={`h-1.5 w-full ${
// //         slot === 'breakfast' ? 'bg-amber-400' :
// //         slot === 'lunch' ? 'bg-brand-500' :
// //         slot === 'snack' ? 'bg-rose-400' : 'bg-indigo-500'
// //       }`} />

// //       <div className="p-6">
// //         {/* Header */}
// //         <div className="flex justify-between items-start mb-4">
// //           <div className="flex items-center gap-3">
// //              <div className={`p-2.5 rounded-xl ${
// //                slot === 'breakfast' ? 'bg-amber-50 text-amber-600' :
// //                slot === 'lunch' ? 'bg-brand-50 text-brand-600' :
// //                slot === 'snack' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
// //              }`}>
// //                <Icon size={20} strokeWidth={2.5} />
// //              </div>
// //              <div>
// //                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">{slot}</h4>
// //                <span className="text-xs font-bold text-gray-900">{time}</span>
// //              </div>
// //           </div>

// //           <button 
// //             onClick={() => onSwap(slot)}
// //             className="text-gray-300 hover:text-brand-600 transition-colors p-2 hover:bg-brand-50 rounded-full"
// //             title="Swap Dish"
// //           >
// //             <RefreshCw size={16} />
// //           </button>
// //         </div>

// //         {/* Content */}
// //         <div className="mb-4">
// //            <h3 className="text-lg font-heading font-bold text-gray-900 leading-tight mb-2 group-hover:text-brand-700 transition-colors">
// //              {data.name}
// //            </h3>
// //            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
// //              {data.description || "A balanced, nutrient-dense option tailored to your profile."}
// //            </p>
// //         </div>

// //         {/* Footer / Macros */}
// //         <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
// //            {/* Veg/Non-Veg Badge */}
// //            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
// //              data.type === 'Veg' 
// //                ? 'bg-green-50 text-green-700 border-green-100' 
// //                : 'bg-red-50 text-red-700 border-red-100'
// //            }`}>
// //              {data.type}
// //            </span>

// //            {/* Fake Macro Tags for Visual Completeness (Dynamic data would go here) */}
// //            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-500 border border-gray-100">
// //              ~400 Kcal
// //            </span>
// //         </div>
// //       </div>
// //     </motion.div>
// //   );

// //   return (
// //     <div className="grid md:grid-cols-2 gap-6 animate-slideUp">
// //       <MealCard 
// //         slot="breakfast" 
// //         icon={Coffee} 
// //         data={dayPlan.breakfast} 
// //         time={userProfile.breakfastTime || "8:00 AM"} 
// //       />
// //       <MealCard 
// //         slot="lunch" 
// //         icon={Sun} 
// //         data={dayPlan.lunch} 
// //         time="1:00 PM" 
// //       />
// //       <MealCard 
// //         slot="snack" 
// //         icon={Sunset} 
// //         data={dayPlan.snack} 
// //         time="5:00 PM" 
// //       />
// //       <MealCard 
// //         slot="dinner" 
// //         icon={Moon} 
// //         data={dayPlan.dinner} 
// //         time={userProfile.dinnerTime || "8:00 PM"} 
// //       />
// //     </div>
// //   );
// // }







// 'use client';

// import React from 'react';
// import { DailyPlan } from '../lib/generator';
// import {
//   Coffee,
//   Sun,
//   Sunset,
//   Moon,
//   RefreshCw,
//   Leaf,
//   Dumbbell,
//   Heart,
//   Circle,
//   Triangle,
//   Clock,
//   Flame
// } from 'lucide-react';

// interface MealGridProps {
//   plan: DailyPlan[];
//   selectedDay: number;
//   setSelectedDay: (day: number) => void;
//   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
// }

// const MealGrid: React.FC<MealGridProps> = ({ plan, selectedDay, setSelectedDay, onSwap }) => {
//   if (!plan || plan.length === 0) return null;

//   const currentDay = plan[selectedDay];

//   // --- HELPERS ---
//   const getSmartTags = (meal: any) => {
//     const text = (meal.name + ' ' + meal.description).toLowerCase();
//     const tags = [];
//     if (text.includes('chicken') || text.includes('egg') || text.includes('dal') || text.includes('paneer'))
//       tags.push({ label: 'High Protein', icon: Dumbbell });
//     if (text.includes('salad') || text.includes('oats') || text.includes('vegetable'))
//       tags.push({ label: 'Rich Fiber', icon: Leaf });
//     if (text.includes('walnut') || text.includes('fish') || text.includes('olive'))
//       tags.push({ label: 'Healthy Fats', icon: Heart });
//     return tags.slice(0, 2);
//   };

//   const getDietType = (meal: any) => {
//     const text = (meal.name + ' ' + meal.description).toLowerCase();
//     const isNonVeg = text.includes('chicken') || text.includes('egg') || text.includes('fish') || text.includes('mutton');
//     return isNonVeg
//       ? { label: 'Non-Veg', icon: Triangle, color: 'text-rose-500 border-rose-100 bg-rose-50' }
//       : { label: 'Veg', icon: Circle, color: 'text-emerald-600 border-emerald-100 bg-emerald-50' };
//   };

//   const getPrepTime = (slot: string) => {
//     switch (slot) {
//       case 'Breakfast': return '15 min';
//       case 'Lunch': return '30 min';
//       case 'Snack': return '5 min';
//       case 'Dinner': return '25 min';
//       default: return '15 min';
//     }
//   };

//   // --- THEME SYSTEM ---
//   const getTheme = (slot: string) => {
//     switch (slot) {
//       case 'Breakfast':
//         return {
//           bg: 'bg-orange-50',
//           border: 'border-orange-100',
//           textMain: 'text-orange-900',
//           textSub: 'text-orange-700',
//           iconColor: 'text-orange-500',
//         };
//       case 'Lunch':
//         return {
//           bg: 'bg-teal-50',
//           border: 'border-teal-100',
//           textMain: 'text-teal-900',
//           textSub: 'text-teal-700',
//           iconColor: 'text-teal-600',
//         };
//       case 'Snack':
//         return {
//           bg: 'bg-rose-50',
//           border: 'border-rose-100',
//           textMain: 'text-rose-900',
//           textSub: 'text-rose-700',
//           iconColor: 'text-rose-500',
//         };
//       case 'Dinner':
//         return {
//           bg: 'bg-indigo-50',
//           border: 'border-indigo-100',
//           textMain: 'text-indigo-900',
//           textSub: 'text-indigo-700',
//           iconColor: 'text-indigo-500',
//         };
//       default:
//         return { bg: 'bg-gray-50', border: 'border-gray-200', textMain: 'text-gray-900', textSub: 'text-gray-600', iconColor: 'text-gray-500' };
//     }
//   };

//   const renderMealCard = (slot: string, meal: any, Icon: React.ElementType) => {
//     const tags = getSmartTags(meal);
//     const diet = getDietType(meal);
//     const DietIcon = diet.icon;
//     const prepTime = getPrepTime(slot);
//     const theme = getTheme(slot);

//     return (
//       <div className={`group flex flex-col md:flex-row bg-white rounded-[2rem] border ${theme.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full`}>

//         {/* LEFT PANEL: Visual Identity */}
//         <div className={`${theme.bg} w-full md:w-[35%] p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 md:gap-6`}>

//           {/* Time Badge */}
//           <div className="order-2 md:order-1 flex items-center gap-1.5 bg-white/60 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
//             <Clock size={12} className={theme.textSub} />
//             <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.textSub}`}>
//               {prepTime}
//             </span>
//           </div>

//           {/* Main Icon & Slot Name */}
//           <div className="order-1 md:order-2 flex items-center md:flex-col gap-3 md:gap-4">
//             <div className="p-3 bg-white/50 rounded-2xl shadow-sm backdrop-blur-md">
//               <Icon size={32} className={theme.iconColor} strokeWidth={1.5} />
//             </div>
//             <span className={`text-lg font-bold tracking-tight ${theme.textMain}`}>
//               {slot}
//             </span>
//           </div>
//         </div>

//         {/* RIGHT PANEL: Details */}
//         <div className="flex-1 p-5 md:p-6 flex flex-col justify-between bg-white relative">

//           {/* Veg/Non-Veg Badge */}
//           <div className="absolute top-5 right-5">
//             <div className={`flex items-center justify-center w-6 h-6 border rounded-lg ${diet.color} shadow-sm`}>
//               <DietIcon size={12} fill="currentColor" />
//             </div>
//           </div>

//           {/* Meal Info */}
//           <div className="pr-8 mb-4">
//             <h3 className="text-xl font-heading font-bold text-gray-800 leading-snug mb-2 group-hover:text-brand-700 transition-colors">
//               {meal.name}
//             </h3>
//             <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">
//               {meal.description}
//             </p>

//             {/* --- NEW MACRO DISPLAY --- */}
//             {meal.macros && (
//               <div className="flex gap-4 mt-4 text-xs font-semibold border-t border-gray-50 pt-3">
//                 <div className="flex flex-col">
//                   <span className="text-gray-400 text-[9px] uppercase tracking-wider">Cals</span>
//                   <span className="text-gray-700">{meal.macros.calories}</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-gray-400 text-[9px] uppercase tracking-wider">Net Carbs</span>
//                   <span className="text-blue-600">{meal.macros.carbs}g</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-gray-400 text-[9px] uppercase tracking-wider">Protein</span>
//                   <span className="text-rose-600">{meal.macros.protein}g</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-gray-400 text-[9px] uppercase tracking-wider">Fiber</span>
//                   <span className="text-emerald-600">{meal.macros.fiber}g</span>
//                 </div>
//               </div>
//             )}
//             {/* ------------------------- */}
//           </div>

//           {/* Bottom Actions Row */}
//           <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
//             <div className="flex flex-wrap gap-2">
//               {tags.length > 0 ? tags.map((t, i) => (
//                 <div key={i} className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${theme.textSub} ${theme.bg} border ${theme.border} px-2.5 py-1.5 rounded-lg`}>
//                   <t.icon size={12} className="currentColor" />
//                   {t.label}
//                 </div>
//               )) : (
//                 <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase ${theme.textSub} ${theme.bg} border ${theme.border} px-2.5 py-1.5 rounded-lg`}>
//                   <Flame size={12} className="currentColor" />
//                   Balanced
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={() => onSwap(slot.toLowerCase() as any)}
//               className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-brand-600 px-3 py-1.5 rounded-lg transition-colors"
//             >
//               <RefreshCw size={14} strokeWidth={2.5} />
//               <span>Swap</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="animate-fadeIn w-full max-w-6xl mx-auto pt-2">

//       {/* DAY SELECTOR - IMPROVED */}
//       <div className="mb-10 w-full overflow-hidden">
//         <div className="flex justify-center w-full">
//           <div className="flex gap-3 overflow-x-auto no-scrollbar p-4 max-w-full">
//             {plan.map((day, index) => {
//               const isActive = selectedDay === index;
//               return (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedDay(index)}
//                   className={`
//                     flex-shrink-0 flex flex-col items-center justify-center 
//                     w-24 h-14 rounded-xl border transition-all duration-300
//                     ${isActive
//                       ? 'bg-teal-700 border-teal-700 text-white shadow-md shadow-teal-200/50 scale-105 z-10'
//                       : 'bg-white border-gray-100 text-gray-400 hover:border-teal-200 hover:text-teal-600 hover:bg-gray-50'
//                     }
//                     `}
//                 >
//                   <span className={`text-[9px] font-bold uppercase leading-none mb-1 ${isActive ? 'text-teal-100' : 'text-gray-400'}`}>
//                     {index === 0 ? "Today" : `Day ${index + 1}`}
//                   </span>
//                   <span className="text-base font-bold font-heading leading-none">
//                     {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index % 7]}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* MEAL GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {renderMealCard('Breakfast', currentDay.breakfast, Coffee)}
//         {renderMealCard('Lunch', currentDay.lunch, Sun)}
//         {renderMealCard('Snack', currentDay.snack, Sunset)}
//         {renderMealCard('Dinner', currentDay.dinner, Moon)}
//       </div>

//     </div>
//   );
// };

// export default MealGrid;




//------------------------4/10/26--------------------------


// 'use client';

// import React from 'react';
// import { DailyPlan } from '../lib/generator';
// import {
//   Coffee,
//   Sun,
//   Sunset,
//   Moon,
//   RefreshCw,
//   Leaf,
//   Dumbbell,
//   Heart,
//   Circle,
//   Triangle,
//   Clock,
//   CheckCircle2
// } from 'lucide-react';

// interface MealGridProps {
//   plan: DailyPlan[];
//   selectedDay: number;
//   setSelectedDay: (day: number) => void;
//   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
// }

// const MealGrid: React.FC<MealGridProps> = ({ plan, selectedDay, setSelectedDay, onSwap }) => {
//   if (!plan || plan.length === 0) return null;

//   const currentDay = plan[selectedDay];

//   // --- HELPERS (Simple, everyday language) ---
//   const getSmartTags = (meal: any) => {
//     const text = (meal.name + ' ' + meal.description).toLowerCase();
//     const tags = [];
//     if (text.includes('chicken') || text.includes('egg') || text.includes('dal') || text.includes('paneer'))
//       tags.push({ label: 'Protein', icon: Dumbbell });
//     if (text.includes('salad') || text.includes('oats') || text.includes('vegetable') || text.includes('millet'))
//       tags.push({ label: 'Fiber', icon: Leaf });
//     if (text.includes('walnut') || text.includes('fish') || text.includes('olive') || text.includes('seed'))
//       tags.push({ label: 'Good Fats', icon: Heart });
//     return tags.slice(0, 2);
//   };

//   const getDietType = (meal: any) => {
//     const text = (meal.name + ' ' + meal.description).toLowerCase();
//     const isNonVeg = text.includes('chicken') || text.includes('egg') || text.includes('fish') || text.includes('mutton');
//     return isNonVeg
//       ? { label: 'Non-Veg', icon: Triangle, color: 'text-rose-600 border-rose-600' }
//       : { label: 'Veg', icon: Circle, color: 'text-emerald-600 border-emerald-600' };
//   };

//   const getPrepTime = (slot: string) => {
//     switch (slot) {
//       case 'Breakfast': return '15 min';
//       case 'Lunch': return '30 min';
//       case 'Snack': return '5 min';
//       case 'Dinner': return '25 min';
//       default: return '15 min';
//     }
//   };

//   // --- THEME SYSTEM ---
//   const getTheme = (slot: string) => {
//     switch (slot) {
//       case 'Breakfast':
//         return { bg: 'bg-orange-50', border: 'border-orange-100', textMain: 'text-orange-900', textSub: 'text-orange-700', iconColor: 'text-orange-500' };
//       case 'Lunch':
//         return { bg: 'bg-teal-50', border: 'border-teal-100', textMain: 'text-teal-900', textSub: 'text-teal-700', iconColor: 'text-teal-600' };
//       case 'Snack':
//         return { bg: 'bg-rose-50', border: 'border-rose-100', textMain: 'text-rose-900', textSub: 'text-rose-700', iconColor: 'text-rose-500' };
//       case 'Dinner':
//         return { bg: 'bg-indigo-50', border: 'border-indigo-100', textMain: 'text-indigo-900', textSub: 'text-indigo-700', iconColor: 'text-indigo-500' };
//       default:
//         return { bg: 'bg-gray-50', border: 'border-gray-200', textMain: 'text-gray-900', textSub: 'text-gray-600', iconColor: 'text-gray-500' };
//     }
//   };

//   const renderMealCard = (slot: string, meal: any, Icon: React.ElementType) => {
//     const tags = getSmartTags(meal);
//     const diet = getDietType(meal);
//     const DietIcon = diet.icon;
//     const prepTime = getPrepTime(slot);
//     const theme = getTheme(slot);

//     return (
//       <div className={`group flex flex-col md:flex-row bg-white rounded-[2rem] border ${theme.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full`}>

//         {/* LEFT PANEL: Visual Identity */}
//         <div className={`${theme.bg} w-full md:w-[35%] p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 md:gap-6`}>
//           <div className="order-2 md:order-1 flex items-center gap-1.5 bg-white/60 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
//             <Clock size={12} className={theme.textSub} />
//             <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.textSub}`}>
//               {prepTime}
//             </span>
//           </div>
//           <div className="order-1 md:order-2 flex items-center md:flex-col gap-3 md:gap-4">
//             <div className="p-3 bg-white/50 rounded-2xl shadow-sm backdrop-blur-md">
//               <Icon size={32} className={theme.iconColor} strokeWidth={1.5} />
//             </div>
//             <span className={`text-lg font-bold tracking-tight ${theme.textMain}`}>
//               {slot}
//             </span>
//           </div>
//         </div>

//         {/* RIGHT PANEL: Details */}
//         <div className="flex-1 p-6 flex flex-col justify-between bg-white relative">

//           {/* Veg/Non-Veg Badge (Preserved exactly as requested) */}
//           <div className="absolute top-6 right-6">
//             <div className={`flex items-center justify-center w-5 h-5 border-[1.5px] rounded-sm ${diet.color}`}>
//               <DietIcon size={10} fill="currentColor" />
//             </div>
//           </div>

//           {/* Meal Info (Macros completely removed for a cleaner look) */}
//           <div className="pr-8 mb-4">
//             <h3 className="text-xl font-heading font-bold text-gray-900 leading-snug mb-2 group-hover:text-brand-700 transition-colors">
//               {meal.name}
//             </h3>
//             <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">
//               {meal.description}
//             </p>
//           </div>

//           {/* Bottom Actions Row */}
//           <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
//             <div className="flex flex-wrap gap-2">
//               {tags.length > 0 ? tags.map((t, i) => (
//                 <div key={i} className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${theme.textSub} ${theme.bg} px-2.5 py-1.5 rounded-lg`}>
//                   <t.icon size={12} className="currentColor" />
//                   {t.label}
//                 </div>
//               )) : (
//                 <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${theme.textSub} ${theme.bg} px-2.5 py-1.5 rounded-lg`}>
//                   <CheckCircle2 size={12} className="currentColor" />
//                   Healthy Option
//                 </div>
//               )}
//             </div>

//             {/* Premium Swap Button */}
//             <button
//               onClick={() => onSwap(slot.toLowerCase() as any)}
//               className={`flex items-center gap-1.5 text-xs font-bold ${theme.textMain} bg-white hover:${theme.bg} border border-gray-200 hover:${theme.border} shadow-sm px-4 py-2 rounded-xl transition-all duration-200 active:scale-95`}
//             >
//               <RefreshCw size={14} strokeWidth={2.5} />
//               <span>Swap</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="animate-fadeIn w-full">

//       {/* 1. SECTION HEADER (Simplified Language) */}
//       <div className="mb-8 border-b border-gray-200 pb-5">
//         <h2 className="text-4xl font-heading font-extrabold text-teal-900 tracking-tight mb-2">
//           Daily Meal Plan
//         </h2>
//         <p className="text-gray-500 text-base">
//           Simple, healthy meals to keep your blood sugar steady
//         </p>
//       </div>

//       {/* 2. DAY SELECTOR */}
//       <div className="mb-10 w-full overflow-hidden">
//         <div className="flex justify-center w-full">
//           <div className="flex gap-3 overflow-x-auto no-scrollbar p-2 max-w-full">
//             {plan.map((day, index) => {
//               const isActive = selectedDay === index;
//               return (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedDay(index)}
//                   className={`
//                     flex-shrink-0 flex flex-col items-center justify-center 
//                     w-24 h-14 rounded-xl border transition-all duration-300
//                     ${isActive
//                       ? 'bg-teal-800 border-teal-800 text-white shadow-md shadow-teal-900/20 scale-105 z-10'
//                       : 'bg-white border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50'
//                     }
//                   `}
//                 >
//                   <span className={`text-[9px] font-bold uppercase tracking-widest leading-none mb-1 ${isActive ? 'text-teal-200' : 'text-gray-400'}`}>
//                     {index === 0 ? "Today" : `Day ${index + 1}`}
//                   </span>
//                   <span className="text-base font-bold font-heading leading-none">
//                     {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index % 7]}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* 3. MEAL GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {renderMealCard('Breakfast', currentDay.breakfast, Coffee)}
//         {renderMealCard('Lunch', currentDay.lunch, Sun)}
//         {renderMealCard('Snack', currentDay.snack, Sunset)}
//         {renderMealCard('Dinner', currentDay.dinner, Moon)}
//       </div>

//     </div>
//   );
// };

// export default MealGrid;







//------------------------5/10/26--------------------------

// 'use client';

// import React from 'react';
// import { calculateSpikeRisk, DailyPlan, UserProfile } from '../lib/generator';
// import {
//   Coffee,
//   Sun,
//   CloudSun,
//   Moon,
//   ArrowsClockwise,
//   Plant,
//   Barbell,
//   Heartbeat,
//   Circle,
//   Triangle,
//   Clock,
//   CheckCircle,
//   TrendUp,
//   Lightning,
//   Person,
//   Sparkle
// } from '@phosphor-icons/react';

// interface MealGridProps {
//   plan: DailyPlan[];
//   selectedDay: number;
//   setSelectedDay: (day: number) => void;
//   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
//   userProfile: UserProfile;
// }

// const MealGrid: React.FC<MealGridProps> = ({ plan, selectedDay, setSelectedDay, onSwap, userProfile }) => {
//   if (!plan || plan.length === 0) return null;

//   const currentDay = plan[selectedDay];

//   // --- HELPERS ---
//   const getSmartTags = (meal: any) => {
//     const text = (meal.name + ' ' + meal.description).toLowerCase();
//     const tags = [];
//     if (text.includes('chicken') || text.includes('egg') || text.includes('dal') || text.includes('paneer'))
//       tags.push({ label: 'Protein', icon: Barbell });
//     if (text.includes('salad') || text.includes('oats') || text.includes('vegetable') || text.includes('millet'))
//       tags.push({ label: 'Fiber', icon: Plant });
//     if (text.includes('walnut') || text.includes('fish') || text.includes('olive') || text.includes('seed'))
//       tags.push({ label: 'Good Fats', icon: Heartbeat });
//     return tags.slice(0, 2);
//   };

//   const getDietType = (meal: any) => {
//     const text = (meal.name + ' ' + meal.description).toLowerCase();
//     const isNonVeg = text.includes('chicken') || text.includes('egg') || text.includes('fish') || text.includes('mutton');
//     return isNonVeg
//       ? { label: 'Non-Veg', icon: Triangle, color: 'text-rose-600 border-rose-600' }
//       : { label: 'Veg', icon: Circle, color: 'text-emerald-500 border-emerald-500' };
//   };

//   const getPrepTime = (slot: string) => {
//     switch (slot) {
//       case 'Breakfast': return '15m prep';
//       case 'Lunch': return '30m prep';
//       case 'Snack': return '5m prep';
//       case 'Dinner': return '25m prep';
//       default: return '15m prep';
//     }
//   };

//   // --- PREMIUM THEME SYSTEM ---
//   const getTheme = (slot: string) => {
//     switch (slot) {
//       case 'Breakfast':
//         return { bg: 'bg-orange-50', textMain: 'text-orange-500' };
//       case 'Lunch':
//         return { bg: 'bg-teal-50', textMain: 'text-teal-500' };
//       case 'Snack':
//         return { bg: 'bg-rose-50', textMain: 'text-rose-500' };
//       case 'Dinner':
//         return { bg: 'bg-indigo-50', textMain: 'text-indigo-500' };
//       default:
//         return { bg: 'bg-slate-50', textMain: 'text-slate-500' };
//     }
//   };

//   const renderMealCard = (slot: string, meal: any, Icon: React.ElementType) => {
//     const tags = getSmartTags(meal);
//     const diet = getDietType(meal);
//     const DietIcon = diet.icon;
//     const prepTime = getPrepTime(slot);
//     const theme = getTheme(slot);


//     // Pass the slot string so the engine can give time-specific advice
//     const spikeRisk = calculateSpikeRisk(meal.gi, slot, userProfile);

//     return (
//       <div className="group bg-white rounded-[32px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col gap-5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 h-full">

//         {/* Top Row: Icon, Title, and Diet Badge */}
//         <div className="flex justify-between items-start">
//           <div className="flex items-center gap-4">
//             <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center ${theme.bg} ${theme.textMain}`}>
//               <Icon size={28} weight="duotone" />
//             </div>
//             <div>
//               <h3 className="text-xl font-bold tracking-tight text-slate-900">{slot}</h3>
//               <div className="flex items-center gap-1.5 mt-0.5">
//                 <Clock size={14} weight="bold" className="text-slate-400" />
//                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{prepTime}</span>
//               </div>
//             </div>
//           </div>

//           <div className={`flex items-center justify-center w-5 h-5 border-[1.5px] rounded-sm mt-1 ${diet.color}`}>
//             <DietIcon size={10} weight="fill" fill="currentColor" />
//           </div>
//         </div>

//         {/* Meal Details */}
//         <div className="px-1 flex-grow">
//           <h4 className="text-lg font-bold text-slate-800 leading-snug mb-1.5 group-hover:text-teal-700 transition-colors">
//             {meal.name}
//           </h4>
//           <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 mb-4">
//             {meal.description}
//           </p>

//           {/* NEW: Minimal Illustrative Spike Risk Indicator */}
//           {/* NEW: Explicit & Clear Spike Risk Indicator */}
//           <div className="pt-4 border-t border-slate-50 mt-2">

//             <div className="mb-2">
//               <div className="flex items-center gap-1.5 mb-1">
//                 <TrendUp size={16} weight="bold" className={spikeRisk.color} />
//                 <span className={`text-[11px] font-bold uppercase tracking-widest ${spikeRisk.color}`}>
//                   {spikeRisk.title}
//                 </span>
//               </div>

//               {/* Clear Text Factors instead of vague icons */}
//               <p className="text-[12px] text-slate-400 font-medium ml-5">
//                 Factors: {spikeRisk.factors}
//               </p>
//             </div>

//             {/* The Fix / Action */}
//             {spikeRisk.level !== 'Low' && (
//               <div className="flex items-start gap-2 mt-2">
//                 <Sparkle size={16} weight="fill" className="text-teal-500 shrink-0 mt-0.5" />
//                 <p className="text-[13px] font-medium text-slate-600 leading-snug">
//                   {spikeRisk.action}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Actions Row */}
//         <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
//           <div className="flex flex-wrap gap-2">
//             {tags.length > 0 ? tags.map((t, i) => (
//               <div key={i} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
//                 <t.icon size={14} weight="duotone" className="text-slate-400" />
//                 {t.label}
//               </div>
//             )) : (
//               <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1.5 rounded-xl">
//                 <CheckCircle size={14} weight="fill" className="currentColor" />
//                 Healthy Option
//               </div>
//             )}
//           </div>

//           <button
//             onClick={() => onSwap(slot.toLowerCase() as any)}
//             className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-teal-700 hover:bg-teal-50 bg-white border border-slate-200 px-4 py-2 rounded-xl transition-all duration-200 active:scale-95"
//           >
//             <ArrowsClockwise size={16} weight="bold" />
//             <span>Swap</span>
//           </button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="animate-fadeIn w-full">

//       {/* 1. HEADER */}
//       <div className="mb-8">
//         <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight mb-2">
//           Daily Meals
//         </h2>
//         <p className="text-slate-500 font-medium text-base">
//           Metabolically balanced meals optimized for your routine.
//         </p>
//       </div>

//       {/* 2. PREMIUM DAY SELECTOR */}
//       <div className="mb-10 w-full overflow-hidden">
//         <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 pt-1 px-1 -mx-1">
//           {plan.map((day, index) => {
//             const isActive = selectedDay === index;
//             return (
//               <button
//                 key={index}
//                 onClick={() => setSelectedDay(index)}
//                 className={`
//                   flex-shrink-0 flex flex-col items-center justify-center 
//                   w-20 h-[5.5rem] rounded-[24px] transition-all duration-300
//                   ${isActive
//                     ? 'bg-slate-900 text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] scale-105 z-10'
//                     : 'bg-white border border-slate-100 text-slate-500 shadow-sm hover:border-slate-300 hover:bg-slate-50'
//                   }
//                 `}
//               >
//                 <span className={`text-[10px] font-bold uppercase tracking-widest leading-none mb-2 ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
//                   {index === 0 ? "Today" : `Day ${index + 1}`}
//                 </span>
//                 <span className={`text-xl font-black tracking-tight leading-none ${isActive ? 'text-white' : 'text-slate-800'}`}>
//                   {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index % 7]}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* 3. MEAL GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {renderMealCard('Breakfast', currentDay.breakfast, Coffee)}
//         {renderMealCard('Lunch', currentDay.lunch, Sun)}
//         {renderMealCard('Snack', currentDay.snack, CloudSun)}
//         {renderMealCard('Dinner', currentDay.dinner, Moon)}
//       </div>

//     </div>
//   );
// };

// export default MealGrid;







//=======================6/10/26========================

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { calculateSpikeRisk, DailyPlan, UserProfile, Meal } from '../lib/generator';
// import {
//   Coffee, Sun, CloudSun, Moon, ArrowsClockwise, Plant, Barbell, 
//   Heartbeat, Circle, Triangle, Clock, TrendUp, Sparkle,
//   CookingPot, X, MagicWand, Camera, WarningCircle, CheckCircle 
// } from '@phosphor-icons/react';

// import ReactMarkdown from 'react-markdown';

// interface MealGridProps {
//   plan: DailyPlan[];
//   selectedDay: number;
//   setSelectedDay: (day: number) => void;
//   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
//   onCustomSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner', meal: Meal) => void;
//   userProfile: UserProfile;
// }

// const MealGrid: React.FC<MealGridProps> = ({ plan, selectedDay, setSelectedDay, onSwap, onCustomSwap, userProfile }) => {
//   // 1. Mount State for Portals (prevents hydration mismatch)
//   const [isMounted, setIsMounted] = useState(false);
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const [recipeModal, setRecipeModal] = useState<{ isOpen: boolean; meal: Meal | null; content: string; isLoading: boolean }>({
//     isOpen: false, meal: null, content: '', isLoading: false
//   });
  
//   const [aiModal, setAiModal] = useState({ isOpen: false, slot: '', input: '', isLoading: false });

//   const [scannerModal, setScannerModal] = useState<{
//     isOpen: boolean;
//     imagePreview: string | null;
//     isLoading: boolean;
//     result: any | null;
//   }>({ isOpen: false, imagePreview: null, isLoading: false, result: null });

//   if (!plan || plan.length === 0) return null;
//   const currentDay = plan[selectedDay];

//   // --- HELPERS ---
//   const getSmartTags = (meal: any) => {
//     const text = (meal.name + ' ' + meal.description).toLowerCase();
//     const tags = [];
//     if (text.includes('chicken') || text.includes('egg') || text.includes('dal') || text.includes('paneer'))
//       tags.push({ label: 'Protein', icon: Barbell });
//     if (text.includes('salad') || text.includes('oats') || text.includes('vegetable') || text.includes('millet'))
//       tags.push({ label: 'Fiber', icon: Plant });
//     if (text.includes('walnut') || text.includes('fish') || text.includes('olive') || text.includes('seed'))
//       tags.push({ label: 'Good Fats', icon: Heartbeat });
//     return tags.slice(0, 2);
//   };

//   const getDietType = (meal: any) => {
//     const text = (meal.name + ' ' + meal.description).toLowerCase();
//     const isNonVeg = text.includes('chicken') || text.includes('egg') || text.includes('fish') || text.includes('mutton');
//     return isNonVeg
//       ? { label: 'Non-Veg', icon: Triangle, color: 'text-rose-600 border-rose-600' }
//       : { label: 'Veg', icon: Circle, color: 'text-emerald-500 border-emerald-500' };
//   };

//   const getPrepTime = (slot: string) => {
//     switch (slot) {
//       case 'Breakfast': return '15m prep';
//       case 'Lunch': return '30m prep';
//       case 'Snack': return '5m prep';
//       case 'Dinner': return '25m prep';
//       default: return '15m prep';
//     }
//   };

//   const getTheme = (slot: string) => {
//     switch (slot) {
//       case 'Breakfast': return { bg: 'bg-orange-50', textMain: 'text-orange-500' };
//       case 'Lunch': return { bg: 'bg-teal-50', textMain: 'text-teal-500' };
//       case 'Snack': return { bg: 'bg-rose-50', textMain: 'text-rose-500' };
//       case 'Dinner': return { bg: 'bg-indigo-50', textMain: 'text-indigo-500' };
//       default: return { bg: 'bg-slate-50', textMain: 'text-slate-500' };
//     }
//   };

//   const handleViewRecipe = async (meal: Meal) => {
//     setRecipeModal({ isOpen: true, meal, content: '', isLoading: true });
//     try {
//       const res = await fetch('/api/generate-recipe', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ mealName: meal.name, userProfile })
//       });
//       const data = await res.json();
//       setRecipeModal({ isOpen: true, meal, content: data.recipe, isLoading: false });
//     } catch (e) {
//       setRecipeModal({ isOpen: true, meal, content: 'Failed to load recipe.', isLoading: false });
//     }
//   };

//   const executeAiSwap = async () => {
//     if (!aiModal.input.trim()) return;
//     setAiModal({ ...aiModal, isLoading: true });
//     try {
//       const res = await fetch('/api/smart-swap', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt: aiModal.input, slot: aiModal.slot, userProfile })
//       });
//       const data = await res.json();
//       if (data.meal) {
//         onCustomSwap(aiModal.slot.toLowerCase() as any, data.meal);
//       }
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setAiModal({ isOpen: false, slot: '', input: '', isLoading: false });
//     }
//   };

//   const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64Image = reader.result as string;
//       setScannerModal({ isOpen: true, imagePreview: base64Image, isLoading: true, result: null });

//       try {
//         const res = await fetch('/api/analyze-plate', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ image: base64Image, userProfile })
//         });
//         const data = await res.json();
//         setScannerModal(prev => ({ ...prev, isLoading: false, result: data }));
//       } catch (error) {
//         setScannerModal(prev => ({ ...prev, isLoading: false, result: { error: 'Failed to scan plate.' } }));
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const renderMealCard = (slot: string, meal: any, Icon: React.ElementType) => {
//     const tags = getSmartTags(meal);
//     const diet = getDietType(meal);
//     const DietIcon = diet.icon;
//     const theme = getTheme(slot);
//     const spikeRisk = calculateSpikeRisk(meal.gi, slot, userProfile, meal.name);

//     return (
//       <div className="group bg-white rounded-[32px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col h-full hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300">
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center gap-4">
//             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme.bg} ${theme.textMain}`}>
//               <Icon size={24} weight="duotone" />
//             </div>
//             <div>
//               <h3 className="text-lg font-bold text-slate-900">{slot}</h3>
//               <div className="flex items-center gap-1 mt-0.5 text-slate-400">
//                 <Clock size={12} weight="bold" />
//                 <span className="text-[10px] font-bold uppercase tracking-wider">{getPrepTime(slot)}</span>
//               </div>
//             </div>
//           </div>
//           <div className={`flex items-center justify-center w-5 h-5 border-[1.5px] rounded-sm ${diet.color}`}>
//             <DietIcon size={10} weight="fill" fill="currentColor" />
//           </div>
//         </div>

//         <div className="px-1 flex-grow">
//           <h4 className="text-[17px] font-bold text-slate-800 leading-snug mb-1.5 group-hover:text-teal-700 transition-colors">
//             {meal.name}
//           </h4>
//           <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-4">
//             {meal.description}
//           </p>

//           <div className="bg-slate-50/80 rounded-2xl p-4 mb-4 border border-slate-100/50">
//             <div className="flex items-center gap-2 mb-1.5">
//               <TrendUp size={16} className={spikeRisk.color} />
//               <span className={`text-[11px] font-semibold uppercase tracking-wider ${spikeRisk.color}`}>
//                 {spikeRisk.title}
//               </span>
//             </div>
//             <p className="text-[11px] text-slate-400 font-medium ml-6 mb-2.5">
//               Factors: {spikeRisk.factors}
//             </p>
//             {spikeRisk.level !== 'Low' && (
//               <div className="flex items-start gap-2 ml-6">
//                 <Sparkle size={14} weight="fill" className="text-teal-500 shrink-0 mt-0.5" />
//                 <p className="text-[12px] font-medium text-slate-600 leading-relaxed">
//                   {spikeRisk.action}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* NEW: CHRONONUTRITION SEQUENCING UI */}
//           {meal.sequence && meal.sequence.length > 0 && (
//             <div className="mb-4">
//               <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
//                 <Clock size={12} weight="bold" />
//                 Optimal Eating Sequence
//               </h5>
//               <div className="space-y-2.5">
//                 {meal.sequence.map((step: string, idx: number) => {
//                   // Determine icon/color based on sequence index (1: Fiber, 2: Protein, 3: Carbs)
//                   const isFirst = idx === 0;
//                   const isSecond = idx === 1;
//                   return (
//                     <div key={idx} className="flex items-start gap-2.5">
//                       <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black shrink-0 mt-0.5 border
//                         ${isFirst ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
//                           isSecond ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 
//                           'bg-amber-50 text-amber-600 border-amber-200'}`}
//                       >
//                         {idx + 1}
//                       </span>
//                       <span className="text-[12px] font-medium text-slate-700 leading-snug">
//                         {step}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {tags.length > 0 && (
//             <div className="flex flex-wrap gap-2 mb-2 pt-2 border-t border-slate-100">
//               {tags.map((t, i) => (
//                 <div key={i} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
//                   <t.icon size={14} weight="duotone" className="text-slate-400" />
//                   {t.label}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
//           <button
//             onClick={() => handleViewRecipe(meal)}
//             className="flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:bg-teal-50 px-3 py-2 rounded-xl transition-all"
//           >
//             <CookingPot size={16} weight="bold" />
//             <span>Recipe</span>
//           </button>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setAiModal({ isOpen: true, slot, input: '', isLoading: false })}
//               className="flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:bg-violet-50 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-violet-100"
//             >
//               <MagicWand size={16} weight="bold" />
//               <span>Ask AI</span>
//             </button>

//             <button
//               onClick={() => onSwap(slot.toLowerCase() as any)}
//               className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 px-3 py-2 rounded-xl transition-all"
//             >
//               <ArrowsClockwise size={16} weight="bold" />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="animate-fadeIn w-full relative">
      
//       {/* HEADER */}
//       <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
//         <div>
//           <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight mb-2">
//             Daily Meals
//           </h2>
//           <p className="text-slate-500 font-medium text-base">
//             Metabolically balanced meals optimized for your routine.
//           </p>
//         </div>
        
//         {/* Camera Trigger */}
//         <label className="flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl cursor-pointer hover:bg-slate-800 transition-all shadow-md active:scale-95 shrink-0">
//           <Camera size={20} weight="fill" />
//           <span className="text-sm font-bold tracking-wide">Scan Plate</span>
//           <input 
//             type="file" 
//             accept="image/*" 
//             capture="environment" 
//             onChange={handleImageCapture} 
//             className="hidden" 
//           />
//         </label>
//       </div>

//       {/* DAY SELECTOR */}
//       <div className="mb-10 w-full overflow-hidden">
//         <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 pt-1 px-1 -mx-1">
//           {plan.map((day, index) => {
//             const isActive = selectedDay === index;
//             return (
//               <button
//                 key={index}
//                 onClick={() => setSelectedDay(index)}
//                 className={`
//                   flex-shrink-0 flex flex-col items-center justify-center 
//                   w-20 h-[5.5rem] rounded-[24px] transition-all duration-300
//                   ${isActive
//                     ? 'bg-slate-900 text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] scale-105 z-10'
//                     : 'bg-white border border-slate-100 text-slate-500 shadow-sm hover:border-slate-300 hover:bg-slate-50'
//                   }
//                 `}
//               >
//                 <span className={`text-[10px] font-bold uppercase tracking-widest leading-none mb-2 ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
//                   {index === 0 ? "Today" : `Day ${index + 1}`}
//                 </span>
//                 <span className={`text-xl font-black tracking-tight leading-none ${isActive ? 'text-white' : 'text-slate-800'}`}>
//                   {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index % 7]}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {renderMealCard('Breakfast', currentDay.breakfast, Coffee)}
//         {renderMealCard('Lunch', currentDay.lunch, Sun)}
//         {renderMealCard('Snack', currentDay.snack, CloudSun)}
//         {renderMealCard('Dinner', currentDay.dinner, Moon)}
//       </div>

//       {/* PORTALS: Using React createPortal to render absolutely on top of everything */}
      
//       {/* 1. RECIPE MODAL */}
//       {isMounted && recipeModal.isOpen && createPortal(
//         <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
//           <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slideUp sm:animate-fadeIn">
            
//             <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
//               <h3 className="text-xl font-bold text-slate-800 pr-4">
//                 {recipeModal.meal?.name}
//               </h3>
//               <button onClick={() => setRecipeModal({ ...recipeModal, isOpen: false })} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 shrink-0 transition-colors">
//                 <X size={20} weight="bold" />
//               </button>
//             </div>
            
//             {/* Added pb-12 so text doesn't hit the bottom edge */}
//             <div className="p-6 pb-12 overflow-y-auto custom-scrollbar">
//               {recipeModal.isLoading ? (
//                 <div className="flex flex-col items-center justify-center py-10 space-y-4">
//                   <CookingPot size={40} className="text-teal-500 animate-bounce" weight="duotone" />
//                   <p className="text-sm font-semibold text-slate-500 animate-pulse">Consulting AI Chef...</p>
//                 </div>
//               ) : (
//                 <div className="text-slate-600 font-medium leading-relaxed">
//                   <ReactMarkdown
//                     components={{
//                       strong: ({ node, ...props }: any) => (
//                         <span className="block text-base font-black text-slate-900 mt-6 mb-2 tracking-tight" {...props} />
//                       ),
//                       ul: ({ node, ...props }: any) => (
//                         <ul className="space-y-2 mb-4" {...props} />
//                       ),
//                       ol: ({ node, ...props }: any) => (
//                         <ol className="space-y-3 list-decimal list-inside mb-4" {...props} />
//                       ),
//                       li: ({ node, className, children, ...props }: any) => (
//                         <li className="flex items-start gap-2 text-sm" {...props}>
//                           {!className?.includes('task-list') && <span className="text-teal-500 mt-0.5 shrink-0">•</span>}
//                           <span className="flex-1">{children}</span>
//                         </li>
//                       ),
//                       p: ({ node, ...props }: any) => (
//                         <div className="text-sm mb-2" {...props} />
//                       )
//                     }}
//                   >
//                     {recipeModal.content}
//                   </ReactMarkdown>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>,
//         document.body
//       )}

//       {/* 2. AI SMART SWAP MODAL */}
//       {isMounted && aiModal.isOpen && createPortal(
//         <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
//           <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md p-6 pb-12 sm:pb-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-slideUp sm:animate-fadeIn">
//             <div className="flex items-center justify-between shrink-0">
//               <div className="flex items-center gap-2">
//                 <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
//                   <MagicWand size={20} weight="duotone" />
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-800">Smart Swap</h3>
//               </div>
//               <button onClick={() => setAiModal({ ...aiModal, isOpen: false })} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
//                 <X size={20} weight="bold" />
//               </button>
//             </div>
            
//             <p className="text-sm text-slate-500 font-medium">
//               What do you want for {aiModal.slot}? Tell AI your cravings or what ingredients you have.
//             </p>

//             <textarea 
//               value={aiModal.input}
//               onChange={(e) => setAiModal({ ...aiModal, input: e.target.value })}
//               placeholder="e.g. I only have 10 mins and some paneer..."
//               className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none h-28"
//             />

//             <button 
//               onClick={executeAiSwap}
//               disabled={aiModal.isLoading || !aiModal.input.trim()}
//               className="w-full py-3.5 rounded-xl bg-violet-600 text-white font-bold text-sm shadow-md hover:bg-violet-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-2"
//             >
//               {aiModal.isLoading ? (
//                 <>
//                   <MagicWand size={18} className="animate-spin" />
//                   Crafting Custom Meal...
//                 </>
//               ) : (
//                 'Generate Meal'
//               )}
//             </button>
//           </div>
//         </div>,
//         document.body
//       )}

//       {/* 3. PLATE SCANNER MODAL */}
//       {isMounted && scannerModal.isOpen && createPortal(
//         <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
//           <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slideUp sm:animate-fadeIn">
            
//             <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50 shrink-0">
//               <div className="flex items-center gap-2">
//                 <Camera size={24} weight="duotone" className="text-teal-600" />
//                 <h3 className="text-lg font-bold text-slate-800">Plate Analysis</h3>
//               </div>
//               <button onClick={() => setScannerModal({ isOpen: false, imagePreview: null, isLoading: false, result: null })} className="p-2 bg-white rounded-full text-slate-500 shadow-sm hover:bg-slate-100 transition-colors">
//                 <X size={18} weight="bold" />
//               </button>
//             </div>

//             <div className="overflow-y-auto p-6 pb-12 custom-scrollbar">
//               {/* Image Preview */}
//               {scannerModal.imagePreview && (
//                 <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 border border-slate-200 shadow-sm relative shrink-0">
//                   <img src={scannerModal.imagePreview} alt="Captured Plate" className="w-full h-full object-cover" />
//                   {scannerModal.isLoading && (
//                     <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center backdrop-blur-sm">
//                       <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-2"></div>
//                       <span className="text-white font-bold text-sm tracking-widest uppercase mt-2">Analyzing...</span>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Results */}
//               {scannerModal.result && !scannerModal.isLoading && (
//                 <div className="space-y-5 animate-slideUp">
//                   {scannerModal.result.error ? (
//                     <p className="text-rose-500 text-center font-medium">{scannerModal.result.error}</p>
//                   ) : (
//                     <>
//                       <div className="flex flex-wrap gap-2">
//                         {scannerModal.result.recognizedItems?.map((item: string, i: number) => (
//                           <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 font-bold text-xs rounded-full border border-slate-200">
//                             {item}
//                           </span>
//                         ))}
//                       </div>

//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
//                           <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Est. Carbs</span>
//                           <span className="text-2xl font-black text-slate-800">{scannerModal.result.estimatedCarbs}g</span>
//                         </div>
//                         <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
//                           <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Est. Protein</span>
//                           <span className="text-2xl font-black text-slate-800">{scannerModal.result.estimatedProtein}g</span>
//                         </div>
//                       </div>

//                       <div className={`p-4 rounded-2xl flex items-start gap-3 border ${
//                         scannerModal.result.glycemicRisk === 'High' ? 'bg-rose-50 border-rose-100' :
//                         scannerModal.result.glycemicRisk === 'Moderate' ? 'bg-amber-50 border-amber-100' :
//                         'bg-emerald-50 border-emerald-100'
//                       }`}>
//                         {scannerModal.result.glycemicRisk === 'High' ? (
//                           <WarningCircle size={24} weight="fill" className="text-rose-500 shrink-0 mt-0.5" />
//                         ) : (
//                           <CheckCircle size={24} weight="fill" className="text-emerald-500 shrink-0 mt-0.5" />
//                         )}
//                         <div>
//                           <h4 className={`text-sm font-bold mb-1 ${
//                             scannerModal.result.glycemicRisk === 'High' ? 'text-rose-800' :
//                             scannerModal.result.glycemicRisk === 'Moderate' ? 'text-amber-800' :
//                             'text-emerald-800'
//                           }`}>
//                             {scannerModal.result.glycemicRisk} Spike Risk
//                           </h4>
//                           <p className="text-sm font-medium text-slate-700 leading-relaxed">
//                             {scannerModal.result.feedback}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 flex items-start gap-3">
//                         <Sparkle size={20} weight="fill" className="text-teal-600 shrink-0 mt-0.5" />
//                         <div>
//                           <h4 className="text-sm font-bold text-teal-900 mb-1">Action Tip</h4>
//                           <p className="text-sm font-medium text-teal-800 leading-relaxed">
//                             {scannerModal.result.actionTip}
//                           </p>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>,
//         document.body
//       )}

//     </div>
//   );
// };

// export default MealGrid;







//=======================11/10/26========================

'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { calculateSpikeRisk, DailyPlan, UserProfile, Meal } from '../lib/generator';
import {
  Coffee, Sun, CloudSun, Moon, ArrowsClockwise, Plant, Barbell, 
  Heartbeat, Circle, Triangle, Clock, TrendUp, Sparkle,
  CookingPot, X, MagicWand, Camera, WarningCircle, CheckCircle 
} from '@phosphor-icons/react';

import ReactMarkdown from 'react-markdown';

interface MealGridProps {
  plan: DailyPlan[];
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
  onCustomSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner', meal: Meal) => void;
  userProfile: UserProfile;
  isSleepDeprived?: boolean; 
}

const MealGrid: React.FC<MealGridProps> = ({ plan, selectedDay, setSelectedDay, onSwap, onCustomSwap, userProfile, isSleepDeprived }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [recipeModal, setRecipeModal] = useState<{ isOpen: boolean; meal: Meal | null; content: string; isLoading: boolean }>({
    isOpen: false, meal: null, content: '', isLoading: false
  });
  
  const [aiModal, setAiModal] = useState({ isOpen: false, slot: '', input: '', isLoading: false });

  const [scannerModal, setScannerModal] = useState<{
    isOpen: boolean;
    imagePreview: string | null;
    isLoading: boolean;
    result: any | null;
  }>({ isOpen: false, imagePreview: null, isLoading: false, result: null });

  if (!plan || plan.length === 0) return null;
  const currentDay = plan[selectedDay];

  const isVegan = userProfile?.dietType === 'Vegan';
  const isVeg = userProfile?.isVegetarian;
  const hasKidney = userProfile?.conditions?.includes('Kidney Issue');
  const hasAcidity = userProfile?.digestiveIssues?.includes('Acidity') || userProfile?.digestiveIssues?.includes('GERD');
  
  // Kidney profiles keep their planned (renal-safe) breakfast; no protein-load pivot
  const useRecoveryBreakfast = isSleepDeprived && !hasKidney;
  const recoveryProtein = isVegan ? 'Tofu, sprouts or roasted nuts'
    : isVeg ? 'Paneer, curd or sprouts'
    : 'Eggs, paneer or curd';

  const activeBreakfast = useRecoveryBreakfast ? {
    ...currentDay.breakfast,
    name: "Cortisol-Stabilizing Protein Load",
    description: "Sleep debt (<6 hrs) causes severe morning insulin resistance. We have temporarily pivoted your breakfast to a zero-carb, high-fat/protein profile to prevent a cortisol-driven glucose spike.",
    sequence: [
      hasAcidity ? "Hydration: 500ml plain water" : "Hydration: 500ml water + ACV",
      "Fiber: Greens or cucumber",
      `Protein & Fats: ${recoveryProtein}`
    ],
    macros: undefined,
    gi: "Low"
  } : currentDay.breakfast;

  const getSmartTags = (meal: any) => {
    const text = (meal.name + ' ' + meal.description).toLowerCase();
    const tags = [];
    if (text.includes('chicken') || text.includes('egg') || text.includes('dal') || text.includes('paneer'))
      tags.push({ label: 'Protein', icon: Barbell });
    if (text.includes('salad') || text.includes('oats') || text.includes('vegetable') || text.includes('millet'))
      tags.push({ label: 'Fiber', icon: Plant });
    if (text.includes('walnut') || text.includes('fish') || text.includes('olive') || text.includes('seed'))
      tags.push({ label: 'Good Fats', icon: Heartbeat });
    return tags.slice(0, 2);
  };

  const getDietType = (meal: any) => {
    const text = (meal.name + ' ' + meal.description).toLowerCase();
    const isNonVeg = text.includes('chicken') || text.includes('egg') || text.includes('fish') || text.includes('mutton');
    return isNonVeg
      ? { label: 'Non-Veg', icon: Triangle, color: 'text-rose-600 border-rose-600' }
      : { label: 'Veg', icon: Circle, color: 'text-emerald-500 border-emerald-500' };
  };

  const getPrepTime = (slot: string) => {
    switch (slot) {
      case 'Breakfast': return '15m prep';
      case 'Lunch': return '30m prep';
      case 'Snack': return '5m prep';
      case 'Dinner': return '25m prep';
      default: return '15m prep';
    }
  };

  const getTheme = (slot: string) => {
    switch (slot) {
      case 'Breakfast': return { bg: 'bg-orange-50', textMain: 'text-orange-500' };
      case 'Lunch': return { bg: 'bg-teal-50', textMain: 'text-teal-500' };
      case 'Snack': return { bg: 'bg-rose-50', textMain: 'text-rose-500' };
      case 'Dinner': return { bg: 'bg-indigo-50', textMain: 'text-indigo-500' };
      default: return { bg: 'bg-slate-50', textMain: 'text-slate-500' };
    }
  };

  const handleViewRecipe = async (meal: Meal) => {
    setRecipeModal({ isOpen: true, meal, content: '', isLoading: true });
    try {
      const res = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mealName: meal.name, userProfile })
      });
      const data = await res.json();
      setRecipeModal({ isOpen: true, meal, content: data.recipe, isLoading: false });
    } catch (e) {
      setRecipeModal({ isOpen: true, meal, content: 'Failed to load recipe.', isLoading: false });
    }
  };

  const executeAiSwap = async () => {
    if (!aiModal.input.trim()) return;
    setAiModal({ ...aiModal, isLoading: true });
    try {
      const res = await fetch('/api/smart-swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiModal.input, slot: aiModal.slot, userProfile })
      });
      const data = await res.json();
      if (data.meal) {
        onCustomSwap(aiModal.slot.toLowerCase() as any, data.meal);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAiModal({ isOpen: false, slot: '', input: '', isLoading: false });
    }
  };

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setScannerModal({ isOpen: true, imagePreview: base64Image, isLoading: true, result: null });

      try {
        const res = await fetch('/api/analyze-plate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image, userProfile })
        });
        const data = await res.json();
        setScannerModal(prev => ({ ...prev, isLoading: false, result: data }));
      } catch (error) {
        setScannerModal(prev => ({ ...prev, isLoading: false, result: { error: 'Failed to scan plate.' } }));
      }
    };
    reader.readAsDataURL(file);
  };

  const renderMealCard = (slot: string, meal: any, Icon: React.ElementType) => {
    const tags = getSmartTags(meal);
    const diet = getDietType(meal);
    const DietIcon = diet.icon;
    const theme = getTheme(slot);
    const spikeRisk = calculateSpikeRisk(meal.gi, slot, userProfile, meal.name);

    return (
      <div className="group bg-white rounded-[32px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col h-full hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme.bg} ${theme.textMain}`}>
              <Icon size={24} weight="duotone" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{slot}</h3>
              <div className="flex items-center gap-1 mt-0.5 text-slate-400">
                <Clock size={12} weight="bold" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{getPrepTime(slot)}</span>
              </div>
            </div>
          </div>
          <div className={`flex items-center justify-center w-5 h-5 border-[1.5px] rounded-sm ${diet.color}`}>
            <DietIcon fill="currentColor" size={10} weight="fill" />
          </div>
        </div>

        <div className="px-1 flex-grow">
          <h4 className="text-[17px] font-bold text-slate-800 leading-snug mb-1.5 group-hover:text-teal-700 transition-colors">
            {meal.name}
          </h4>
          <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-4">
            {meal.description}
          </p>

          <div className="bg-slate-50/80 rounded-2xl p-4 mb-4 border border-slate-100/50">
            <div className="flex items-center gap-2 mb-1.5">
              <TrendUp className={spikeRisk.color} size={16} />
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${spikeRisk.color}`}>
                {spikeRisk.title}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium ml-6 mb-2.5">
              Factors: {spikeRisk.factors}
            </p>
            {spikeRisk.level !== 'Low' && (
              <div className="flex items-start gap-2 ml-6">
                <Sparkle className="text-teal-500 shrink-0 mt-0.5" size={14} weight="fill" />
                <p className="text-[12px] font-medium text-slate-600 leading-relaxed">
                  {spikeRisk.action}
                </p>
              </div>
            )}
          </div>

          {meal.sequence && meal.sequence.length > 0 && (
            <div className="mb-4">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                <Clock size={12} weight="bold" />
                Optimal Eating Sequence
              </h5>
              <div className="space-y-2.5">
                {meal.sequence.map((step: string, idx: number) => {
                  const isFirst = idx === 0;
                  const isSecond = idx === 1;
                  return (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black shrink-0 mt-0.5 border
                        ${isFirst ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                          isSecond ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 
                          'bg-amber-50 text-amber-600 border-amber-200'}`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-[12px] font-medium text-slate-700 leading-snug">
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 pt-2 border-t border-slate-100">
              {tags.map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                  <t.icon size={14} weight="duotone" className="text-slate-400" />
                  {t.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <button
            onClick={() => handleViewRecipe(meal)}
            className="flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:bg-teal-50 px-3 py-2 rounded-xl transition-all"
          >
            <CookingPot size={16} weight="bold" />
            <span>Recipe</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAiModal({ isOpen: true, slot, input: '', isLoading: false })}
              className="flex items-center gap-1.5 text-xs font-bold text-violet-600 hover:bg-violet-50 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-violet-100"
            >
              <MagicWand size={16} weight="bold" />
              <span>Ask AI</span>
            </button>

            <button
              onClick={() => onSwap(slot.toLowerCase() as any)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 px-3 py-2 rounded-xl transition-all"
            >
              <ArrowsClockwise size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fadeIn w-full relative">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight mb-2">
            Daily Meals
          </h2>
          <p className="text-slate-500 font-medium text-base">
            Metabolically balanced meals optimized for your routine.
          </p>
        </div>
        
        <label className="flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl cursor-pointer hover:bg-slate-800 transition-all shadow-md active:scale-95 shrink-0">
          <Camera size={20} weight="fill" />
          <span className="text-sm font-bold tracking-wide">Scan Plate</span>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            onChange={handleImageCapture} 
            className="hidden" 
          />
        </label>
      </div>

      <div className="mb-10 w-full overflow-hidden">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 pt-1 px-1 -mx-1">
          {plan.map((day, index) => {
            const isActive = selectedDay === index;
            return (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`
                  flex-shrink-0 flex flex-col items-center justify-center 
                  w-20 h-[5.5rem] rounded-[24px] transition-all duration-300
                  ${isActive
                    ? 'bg-slate-900 text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] scale-105 z-10'
                    : 'bg-white border border-slate-100 text-slate-500 shadow-sm hover:border-slate-300 hover:bg-slate-50'
                  }
                `}
              >
                <span className={`text-[10px] font-bold uppercase tracking-widest leading-none mb-2 ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
                  {index === 0 ? "Today" : `Day ${index + 1}`}
                </span>
                <span className={`text-xl font-black tracking-tight leading-none ${isActive ? 'text-white' : 'text-slate-800'}`}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index % 7]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderMealCard('Breakfast', activeBreakfast, Coffee)}
        {renderMealCard('Lunch', currentDay.lunch, Sun)}
        {renderMealCard('Snack', currentDay.snack, CloudSun)}
        {renderMealCard('Dinner', currentDay.dinner, Moon)}
      </div>

      {isMounted && recipeModal.isOpen && createPortal(
        <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slideUp sm:animate-fadeIn">
            
            <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
              <h3 className="text-xl font-bold text-slate-800 pr-4">
                {recipeModal.meal?.name}
              </h3>
              <button onClick={() => setRecipeModal({ ...recipeModal, isOpen: false })} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 shrink-0 transition-colors">
                <X size={20} weight="bold" />
              </button>
            </div>
            
            <div className="p-6 pb-12 overflow-y-auto custom-scrollbar">
              {recipeModal.isLoading ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <CookingPot className="text-teal-500 animate-bounce" size={40} weight="duotone" />
                  <p className="text-sm font-semibold text-slate-500 animate-pulse">Consulting AI Chef...</p>
                </div>
              ) : (
                <div className="text-slate-600 font-medium leading-relaxed">
                  <ReactMarkdown
                    components={{
                      strong: ({ node, ...props }: any) => (
                        <span className="block text-base font-black text-slate-900 mt-6 mb-2 tracking-tight" {...props} />
                      ),
                      ul: ({ node, ...props }: any) => (
                        <ul className="space-y-2 mb-4" {...props} />
                      ),
                      ol: ({ node, ...props }: any) => (
                        <ol className="space-y-3 list-decimal list-inside mb-4" {...props} />
                      ),
                      li: ({ node, className, children, ...props }: any) => (
                        <li className="flex items-start gap-2 text-sm" {...props}>
                          {!className?.includes('task-list') && <span className="text-teal-500 mt-0.5 shrink-0">•</span>}
                          <span className="flex-1">{children}</span>
                        </li>
                      ),
                      p: ({ node, ...props }: any) => (
                        <div className="text-sm mb-2" {...props} />
                      )
                    }}
                  >
                    {recipeModal.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {isMounted && aiModal.isOpen && createPortal(
        <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md p-6 pb-12 sm:pb-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-slideUp sm:animate-fadeIn">
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  <MagicWand size={20} weight="duotone" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Smart Swap</h3>
              </div>
              <button onClick={() => setAiModal({ ...aiModal, isOpen: false })} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                <X size={20} weight="bold" />
              </button>
            </div>
            
            <p className="text-sm text-slate-500 font-medium">
              What do you want for {aiModal.slot}? Tell AI your cravings or what ingredients you have.
            </p>

            <textarea 
              value={aiModal.input}
              onChange={(e) => setAiModal({ ...aiModal, input: e.target.value })}
              placeholder="e.g. I only have 10 mins and some paneer..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none h-28"
            />

            <button 
              onClick={executeAiSwap}
              disabled={aiModal.isLoading || !aiModal.input.trim()}
              className="w-full py-3.5 rounded-xl bg-violet-600 text-white font-bold text-sm shadow-md hover:bg-violet-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {aiModal.isLoading ? (
                <>
                  <MagicWand className="animate-spin" size={18} />
                  Crafting Custom Meal...
                </>
              ) : (
                'Generate Meal'
              )}
            </button>
          </div>
        </div>,
        document.body
      )}

      {isMounted && scannerModal.isOpen && createPortal(
        <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slideUp sm:animate-fadeIn">
            
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <Camera className="text-teal-600" size={24} weight="duotone" />
                <h3 className="text-lg font-bold text-slate-800">Plate Analysis</h3>
              </div>
              <button onClick={() => setScannerModal({ isOpen: false, imagePreview: null, isLoading: false, result: null })} className="p-2 bg-white rounded-full text-slate-500 shadow-sm hover:bg-slate-100 transition-colors">
                <X size={18} weight="bold" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 pb-12 custom-scrollbar">
              {scannerModal.imagePreview && (
                <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 border border-slate-200 shadow-sm relative shrink-0">
                  <img src={scannerModal.imagePreview} alt="Captured Plate" className="w-full h-full object-cover" />
                  {scannerModal.isLoading && (
                    <div className="absolute inset-0 bg-slate-900/40 flex flex-col items-center justify-center backdrop-blur-sm">
                      <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-white font-bold text-sm tracking-widest uppercase mt-2">Analyzing...</span>
                    </div>
                  )}
                </div>
              )}

              {scannerModal.result && !scannerModal.isLoading && (
                <div className="space-y-5 animate-slideUp">
                  {scannerModal.result.error ? (
                    <p className="text-rose-500 text-center font-medium">{scannerModal.result.error}</p>
                  ) : (
                    <>
                      <div className="flex flex-wrap gap-2">
                        {scannerModal.result.recognizedItems?.map((item: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 font-bold text-xs rounded-full border border-slate-200">
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Est. Carbs</span>
                          <span className="text-2xl font-black text-slate-800">{scannerModal.result.estimatedCarbs}g</span>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Est. Protein</span>
                          <span className="text-2xl font-black text-slate-800">{scannerModal.result.estimatedProtein}g</span>
                        </div>
                      </div>

                      <div className={`p-4 rounded-2xl flex items-start gap-3 border ${
                        scannerModal.result.glycemicRisk === 'High' ? 'bg-rose-50 border-rose-100' :
                        scannerModal.result.glycemicRisk === 'Moderate' ? 'bg-amber-50 border-amber-100' :
                        'bg-emerald-50 border-emerald-100'
                      }`}>
                        {scannerModal.result.glycemicRisk === 'High' ? (
                          <WarningCircle className="text-rose-500 shrink-0 mt-0.5" size={24} weight="fill" />
                        ) : (
                          <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={24} weight="fill" />
                        )}
                        <div>
                          <h4 className={`text-sm font-bold mb-1 ${
                            scannerModal.result.glycemicRisk === 'High' ? 'text-rose-800' :
                            scannerModal.result.glycemicRisk === 'Moderate' ? 'text-amber-800' :
                            'text-emerald-800'
                          }`}>
                            {scannerModal.result.glycemicRisk} Spike Risk
                          </h4>
                          <p className="text-sm font-medium text-slate-700 leading-relaxed">
                            {scannerModal.result.feedback}
                          </p>
                        </div>
                      </div>

                      <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 flex items-start gap-3">
                        <Sparkle className="text-teal-600 shrink-0 mt-0.5" size={20} weight="fill" />
                        <div>
                          <h4 className="text-sm font-bold text-teal-900 mb-1">Action Tip</h4>
                          <p className="text-sm font-medium text-teal-800 leading-relaxed">
                            {scannerModal.result.actionTip}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default MealGrid;