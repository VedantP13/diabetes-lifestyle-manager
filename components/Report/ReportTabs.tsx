// import React, { useState } from 'react';
// import { 
//   LayoutDashboard, 
//   Utensils, 
//   Clock, 
//   Dumbbell, 
//   ChefHat,
//   Users,
//   Leaf // Added for Kitchen Pharmacy
// } from 'lucide-react';

// // Import the sub-components
// import { TransformationSection } from './TransformationSection';
// import MealGrid from '../MealGrid';
// import RoutineTimeline from '../RoutineTimeline';
// import HabitAudit from '../HabitAudit'; 
// import { FitnessView } from './FitnessView';
// import { SocialView } from './SocialView';
// import { RemedyView } from './RemedyView'; // Added RemedyView

// // Import Logic & Types
// import { TransformationReport } from '../../lib/types/report-types';
// import { DailyPlan, UserProfile } from '../../lib/generator';
// import { RoutineItem, AuditItem } from '../../lib/insights';
// import { generateFitnessPlan } from '../../lib/fitness-engine';
// import { generateSocialProtocol } from '../../lib/social-engine';
// import { generateKitchenPharmacy } from '../../lib/remedy-engine'; // Added Remedy Logic

// interface Props {
//   report: TransformationReport | null;
//   plan: DailyPlan[];
//   routine: RoutineItem[];
//   audit: AuditItem[];
//   userProfile: UserProfile;
//   // Meal Grid Props
//   selectedDay: number;
//   setSelectedDay: (day: number) => void;
//   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
// }

// // Updated type to include all 6 tabs
// type TabID = 'analysis' | 'meals' | 'routine' | 'fitness' | 'social' | 'naturals';

// export const ReportTabs: React.FC<Props> = ({ 
//   report, 
//   plan, 
//   routine, 
//   audit,
//   userProfile,
//   selectedDay,
//   setSelectedDay,
//   onSwap
// }) => {
//   const [activeTab, setActiveTab] = useState<TabID>('analysis');

//   // Generate Data for all Dynamic Tabs
//   // (These are lightweight functions, safe to run on render)
//   const fitnessPlan = generateFitnessPlan(userProfile);
//   const socialProtocol = generateSocialProtocol(userProfile);
//   const remedies = generateKitchenPharmacy(userProfile);

//   // Tab Configuration
//   const tabs = [
//     { id: 'analysis', label: 'Analysis', icon: LayoutDashboard },
//     { id: 'meals', label: 'Meal Plan', icon: Utensils },
//     { id: 'routine', label: 'Routine', icon: Clock },
//     { id: 'fitness', label: 'Movement', icon: Dumbbell },
//     { id: 'naturals', label: 'Naturals', icon: Leaf }, // Kitchen Pharmacy
//     { id: 'social', label: 'Social', icon: Users },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* 1. STICKY NAVIGATION BAR */}
//       <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm px-4 pt-4 pb-0">
//         <div className="max-w-5xl mx-auto">
//           {/* Mobile-Friendly Horizontal Scroll */}
//           <div className="flex overflow-x-auto no-scrollbar gap-4 md:gap-10 pb-2">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;

//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id as TabID)}
//                   className={`flex flex-col items-center gap-2 pb-3 px-3 min-w-[70px] md:min-w-[80px] transition-all relative shrink-0
//                     ${isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
//                 >
//                   <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
//                   <span className={`text-[10px] md:text-xs font-bold tracking-wide uppercase ${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
//                     {tab.label}
//                   </span>

//                   {/* Active Indicator Line */}
//                   {isActive && (
//                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* 2. DYNAMIC CONTENT AREA */}
//       <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn">

//         {/* VIEW A: ANALYSIS */}
//         {activeTab === 'analysis' && (
//           <div className="space-y-8">
//             <TransformationSection report={report} />

//             <div className="mt-12 pt-12 border-t border-gray-200">
//                <div className="flex items-center gap-2 mb-6">
//                   <ChefHat className="text-gray-400" size={24} />
//                   <h3 className="text-xl font-bold text-gray-800">Kitchen & Habit Audit</h3>
//                </div>
//                <HabitAudit audit={audit} />
//             </div>
//           </div>
//         )}

//         {/* VIEW B: MEAL PLAN */}
//         {activeTab === 'meals' && (
//           <div>
//             <MealGrid 
//               plan={plan}
//               selectedDay={selectedDay}
//               setSelectedDay={setSelectedDay}
//               onSwap={onSwap}
//             />
//           </div>
//         )}

//         {/* VIEW C: ROUTINE */}
//         {activeTab === 'routine' && (
//           <div>
//             <RoutineTimeline routine={routine} />
//           </div>
//         )}

//         {/* VIEW D: FITNESS */}
//         {activeTab === 'fitness' && (
//           <div>
//             <FitnessView plan={fitnessPlan} />
//           </div>
//         )}

//         {/* VIEW E: NATURALS (Kitchen Pharmacy) */}
//         {activeTab === 'naturals' && (
//           <div>
//             <RemedyView remedies={remedies} />
//           </div>
//         )}

//         {/* VIEW F: SOCIAL */}
//         {activeTab === 'social' && (
//           <div>
//              <SocialView protocol={socialProtocol} />
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };






//--------------------------------------------------






//after UI but only few tabs

// 'use client';

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Sparkles, Clock, ShieldCheck, Utensils } from 'lucide-react';

// // Sub-components
// import { InsightCard } from './InsightCard'; 
// import MealGrid from '../MealGrid';
// import RoutineTimeline from '../RoutineTimeline';
// import HabitAudit from '../HabitAudit';

// // Types
// import { DailyPlan, UserProfile } from '../../lib/generator';
// import { RoutineItem, AuditItem } from '../../lib/insights';
// import { TransformationReport } from '../../lib/types/report-types';

// interface ReportTabsProps {
//   report: TransformationReport | null;
//   plan: DailyPlan[];
//   routine: RoutineItem[];
//   audit: AuditItem[];
//   userProfile: UserProfile;
//   selectedDay: number;
//   setSelectedDay: (day: number) => void;
//   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
// }

// type TabKey = 'analysis' | 'meals' | 'routine' | 'habits';

// export const ReportTabs: React.FC<ReportTabsProps> = ({
//   report,
//   plan,
//   routine,
//   audit,
//   userProfile,
//   selectedDay,
//   setSelectedDay,
//   onSwap,
// }) => {
//   const [activeTab, setActiveTab] = useState<TabKey>('analysis');

//   const tabs: { id: TabKey; label: string; icon: React.ElementType }[] = [
//     { id: 'analysis', label: 'Analysis', icon: Sparkles },
//     { id: 'meals', label: 'Meal Plan', icon: Utensils },
//     { id: 'routine', label: 'Schedule', icon: Clock },
//     { id: 'habits', label: 'Audit', icon: ShieldCheck },
//   ];

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8">

//       {/* 1. FLOATING TAB CONTROLLER */}
//       <div className="sticky top-24 z-40 mb-10 flex justify-center">
//         <div className="bg-white p-1.5 rounded-full border border-gray-200 shadow-xl shadow-brand-900/5 flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full">
//           {tabs.map((tab) => {
//             const isActive = activeTab === tab.id;
//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 select-none whitespace-nowrap
//                   ${isActive ? 'text-white' : 'text-gray-500 hover:text-brand-600'}`}
//               >
//                 {isActive && (
//                   <motion.div
//                     layoutId="activeTab"
//                     className="absolute inset-0 bg-brand-700 rounded-full shadow-md"
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   />
//                 )}
//                 <span className="relative z-10 flex items-center gap-2">
//                   <tab.icon size={16} className={isActive ? 'text-brand-200' : 'text-current'} />
//                   {tab.label}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* 2. CONTENT AREA */}
//       <div className="min-h-[600px]">
//         <AnimatePresence mode='wait'>
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.3 }}
//           >

//             {/* --- TAB 1: ANALYSIS --- */}
//             {activeTab === 'analysis' && report && (
//               <div className="space-y-8 animate-fadeIn">
//                 <div className="text-center mb-8">
//                   <h3 className="text-3xl font-heading font-bold text-brand-950">Metabolic Blueprint</h3>
//                   <p className="text-gray-500">Your physiological breakdown and core strategy.</p>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                    {report.insights.map((insight, idx) => (
//                       <InsightCard key={idx} insight={insight} />
//                    ))}
//                 </div>
//               </div>
//             )}

//             {/* --- TAB 2: MEALS --- */}
//             {activeTab === 'meals' && (
//                <div className="space-y-8">
//                   {/* MealGrid Component - Removed userProfile prop to fix error */}
//                   <MealGrid 
//                     plan={plan}
//                     selectedDay={selectedDay}
//                     setSelectedDay={setSelectedDay}
//                     onSwap={onSwap} 
//                   />
//                </div>
//             )}

//             {/* --- TAB 3: ROUTINE --- */}
//             {activeTab === 'routine' && (
//               <div className="max-w-3xl mx-auto">
//                  <RoutineTimeline routine={routine} />
//               </div>
//             )}

//             {/* --- TAB 4: HABITS --- */}
//             {activeTab === 'habits' && (
//               <div className="max-w-4xl mx-auto">
//                  <HabitAudit audit={audit} />
//               </div>
//             )}

//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };




// import React, { useState } from 'react';
// import { 
//   LayoutDashboard, 
//   Utensils, 
//   Clock, 
//   Dumbbell, 
//   ChefHat,
//   Users,
//   Leaf // Added for Kitchen Pharmacy
// } from 'lucide-react';

// // Import the sub-components
// import { TransformationSection } from './TransformationSection';
// import MealGrid from '../MealGrid';
// import RoutineTimeline from '../RoutineTimeline';
// import HabitAudit from '../HabitAudit'; 
// import { FitnessView } from './FitnessView';
// import { SocialView } from './SocialView';
// import { RemedyView } from './RemedyView'; // Added RemedyView

// // Import Logic & Types
// import { TransformationReport } from '../../lib/types/report-types';
// import { DailyPlan, UserProfile } from '../../lib/generator';
// import { RoutineItem, AuditItem } from '../../lib/insights';
// import { generateFitnessPlan } from '../../lib/fitness-engine';
// import { generateSocialProtocol } from '../../lib/social-engine';
// import { generateKitchenPharmacy } from '../../lib/remedy-engine'; // Added Remedy Logic

// interface Props {
//   report: TransformationReport | null;
//   plan: DailyPlan[];
//   routine: RoutineItem[];
//   audit: AuditItem[];
//   userProfile: UserProfile;
//   // Meal Grid Props
//   selectedDay: number;
//   setSelectedDay: (day: number) => void;
//   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
// }

// // Updated type to include all 6 tabs
// type TabID = 'analysis' | 'meals' | 'routine' | 'fitness' | 'social' | 'naturals';

// export const ReportTabs: React.FC<Props> = ({ 
//   report, 
//   plan, 
//   routine, 
//   audit,
//   userProfile,
//   selectedDay,
//   setSelectedDay,
//   onSwap
// }) => {
//   const [activeTab, setActiveTab] = useState<TabID>('analysis');

//   // Generate Data for all Dynamic Tabs
//   // (These are lightweight functions, safe to run on render)
//   const fitnessPlan = generateFitnessPlan(userProfile);
//   const socialProtocol = generateSocialProtocol(userProfile);
//   const remedies = generateKitchenPharmacy(userProfile);

//   // Tab Configuration
//   const tabs = [
//     { id: 'analysis', label: 'Analysis', icon: LayoutDashboard },
//     { id: 'meals', label: 'Meal Plan', icon: Utensils },
//     { id: 'routine', label: 'Routine', icon: Clock },
//     { id: 'fitness', label: 'Movement', icon: Dumbbell },
//     { id: 'naturals', label: 'Naturals', icon: Leaf }, // Kitchen Pharmacy
//     { id: 'social', label: 'Social', icon: Users },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* 1. STICKY NAVIGATION BAR */}
//       <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm px-4 pt-4 pb-0">
//         <div className="max-w-5xl mx-auto">
//           {/* Mobile-Friendly Horizontal Scroll */}
//           <div className="flex overflow-x-auto no-scrollbar gap-4 md:gap-10 pb-2">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;

//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id as TabID)}
//                   className={`flex flex-col items-center gap-2 pb-3 px-3 min-w-[70px] md:min-w-[80px] transition-all relative shrink-0
//                     ${isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
//                 >
//                   <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
//                   <span className={`text-[10px] md:text-xs font-bold tracking-wide uppercase ${isActive ? 'text-blue-700' : 'text-gray-500'}`}>
//                     {tab.label}
//                   </span>

//                   {/* Active Indicator Line */}
//                   {isActive && (
//                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* 2. DYNAMIC CONTENT AREA */}
//       <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fadeIn">

//         {/* VIEW A: ANALYSIS */}
//         {activeTab === 'analysis' && (
//           <div className="space-y-8">
//             <TransformationSection report={report} />

//             <div className="mt-12 pt-12 border-t border-gray-200">
//                <div className="flex items-center gap-2 mb-6">
//                   <ChefHat className="text-gray-400" size={24} />
//                   <h3 className="text-xl font-bold text-gray-800">Kitchen & Habit Audit</h3>
//                </div>
//                <HabitAudit audit={audit} />
//             </div>
//           </div>
//         )}

//         {/* VIEW B: MEAL PLAN */}
//         {activeTab === 'meals' && (
//           <div>
//             <MealGrid 
//               plan={plan}
//               selectedDay={selectedDay}
//               setSelectedDay={setSelectedDay}
//               onSwap={onSwap}
//             />
//           </div>
//         )}

//         {/* VIEW C: ROUTINE */}
//         {activeTab === 'routine' && (
//           <div>
//             <RoutineTimeline routine={routine} />
//           </div>
//         )}

//         {/* VIEW D: FITNESS */}
//         {activeTab === 'fitness' && (
//           <div>
//             <FitnessView plan={fitnessPlan} />
//           </div>
//         )}

//         {/* VIEW E: NATURALS (Kitchen Pharmacy) */}
//         {activeTab === 'naturals' && (
//           <div>
//             <RemedyView remedies={remedies} />
//           </div>
//         )}

//         {/* VIEW F: SOCIAL */}
//         {activeTab === 'social' && (
//           <div>
//              <SocialView protocol={socialProtocol} />
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };



//-----------------------------------------------------------------------------


//after UI

// 'use client';

// import React, { useState } from 'react';
// import { 
//   LayoutDashboard, 
//   Utensils, 
//   Clock, 
//   Dumbbell, 
//   Users,
//   Leaf,
//   ChefHat
// } from 'lucide-react';

// // --- COMPONENT IMPORTS ---
// import { TransformationSection } from './TransformationSection';
// import { FitnessView } from './FitnessView';
// import { SocialView } from './SocialView';
// import { RemedyView } from './RemedyView';
// import MealGrid from '../MealGrid';
// import RoutineTimeline from '../RoutineTimeline';
// import HabitAudit from '../HabitAudit'; 

// // --- TYPES & LOGIC ---
// import { TransformationReport } from '../../lib/types/report-types';
// import { DailyPlan, UserProfile } from '../../lib/generator';
// import { RoutineItem, AuditItem } from '../../lib/insights';
// import { generateFitnessPlan } from '../../lib/fitness-engine';
// import { generateSocialProtocol } from '../../lib/social-engine';
// import { generateKitchenPharmacy } from '../../lib/remedy-engine';

// interface Props {
//   report: TransformationReport | null;
//   plan: DailyPlan[];
//   routine: RoutineItem[];
//   audit: AuditItem[];
//   userProfile: UserProfile;
//   selectedDay: number;
//   setSelectedDay: (day: number) => void;
//   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
// }

// type TabID = 'analysis' | 'meals' | 'routine' | 'fitness' | 'social' | 'naturals';

// export const ReportTabs: React.FC<Props> = ({ 
//   report, 
//   plan, 
//   routine, 
//   audit,
//   userProfile,
//   selectedDay,
//   setSelectedDay,
//   onSwap
// }) => {
//   const [activeTab, setActiveTab] = useState<TabID>('analysis');

//   // --- DATA GENERATION ---
//   const fitnessPlan = generateFitnessPlan(userProfile);
//   const socialProtocol = generateSocialProtocol(userProfile);
//   const remedies = generateKitchenPharmacy(userProfile);

//   // --- CONFIGURATION ---
//   const tabs = [
//     { id: 'analysis', label: 'Analysis', icon: LayoutDashboard },
//     { id: 'meals', label: 'Meal Plan', icon: Utensils },
//     { id: 'routine', label: 'Routine', icon: Clock },
//     { id: 'fitness', label: 'Movement', icon: Dumbbell },
//     { id: 'naturals', label: 'Naturals', icon: Leaf },
//     { id: 'social', label: 'Social', icon: Users },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50/50">

//       {/* 1. PROFESSIONAL STICKY HEADER */}
//       <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
//         <div className="max-w-6xl mx-auto px-3 md:px-6">

//           {/* Scrollable Container */}
//           <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-4 md:justify-center">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;

//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id as TabID)}
//                   className={`
//                     group relative flex items-center justify-center transition-all duration-300 ease-out 
//                     px-5 py-2.5 rounded-xl min-w-[80px] md:min-w-fit outline-none select-none

//                     /* LAYOUT: Vertical on Mobile, Horizontal on Desktop */
//                     flex-col md:flex-row gap-1.5 md:gap-2.5

//                     /* VISUALS: Opaque & White when active, Subtle Gray when inactive */
//                     ${isActive 
//                       ? 'bg-teal-600 text-white shadow-md ring-2 ring-teal-600 ring-offset-2 scale-[1.02]' 
//                       : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'
//                     }
//                   `}
//                 >
//                   {/* Icon */}
//                   <Icon 
//                     size={20} 
//                     strokeWidth={isActive ? 2.5 : 2}
//                     // Color inherits from parent text color automatically
//                     className="transition-transform duration-300" 
//                   />

//                   {/* Label */}
//                   <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase whitespace-nowrap">
//                     {tab.label}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* 2. DYNAMIC CONTENT AREA */}
//       <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-[85vh]">

//         {/* VIEW A: ANALYSIS */}
//         {activeTab === 'analysis' && (
//           <div className="space-y-14 animate-fadeIn"> {/* Increased spacing between sections */}
//             <TransformationSection report={report} />

//             {/* Kitchen & Habit Audit - Now seamlessly integrated into the page layout */}
//             <div>
//                <div className="mb-8">
//                   <h3 className="text-3xl font-heading font-bold text-gray-900 tracking-tight mb-1">
//                     Kitchen & Habit Audit
//                   </h3>
//                   <p className="text-gray-500 text-base">
//                     Daily corrections for better health
//                   </p>
//                </div>
//                <HabitAudit audit={audit} />
//             </div>
//           </div>
//         )}

//         {/* VIEW B: MEAL PLAN */}
//         {activeTab === 'meals' && (
//           <div className="animate-fadeIn">
//             <MealGrid 
//               plan={plan}
//               selectedDay={selectedDay}
//               setSelectedDay={setSelectedDay}
//               onSwap={onSwap}
//             />
//           </div>
//         )}

//         {/* VIEW C: ROUTINE */}
//         {activeTab === 'routine' && (
//           <div className="animate-fadeIn">
//             <RoutineTimeline routine={routine} />
//           </div>
//         )}

//         {/* VIEW D: FITNESS */}
//         {activeTab === 'fitness' && (
//           <div className="animate-fadeIn">
//             <FitnessView plan={fitnessPlan} />
//           </div>
//         )}

//         {/* VIEW E: NATURALS */}
//         {activeTab === 'naturals' && (
//           <div className="animate-fadeIn">
//             <RemedyView remedies={remedies} />
//           </div>
//         )}

//         {/* VIEW F: SOCIAL */}
//         {activeTab === 'social' && (
//           <div className="animate-fadeIn">
//              <SocialView protocol={socialProtocol} />
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };





//--------------------------------------------------4/10/26--------------------------------------

// 'use client';

// import React, { useState } from 'react';
// import { 
//   SquaresFour, 
//   ForkKnife, 
//   Clock, 
//   Barbell, 
//   Leaf, 
//   Users 
// } from '@phosphor-icons/react';

// // --- COMPONENT IMPORTS ---
// import { TransformationSection } from './TransformationSection';
// import { FitnessView } from './FitnessView';
// import { SocialView } from './SocialView';
// import { RemedyView } from './RemedyView';
// import MealGrid from '../MealGrid';
// import RoutineTimeline from '../RoutineTimeline';
// import HabitAudit from '../HabitAudit'; 

// // --- TYPES & LOGIC ---
// import { TransformationReport } from '../../lib/types/report-types';
// import { DailyPlan, UserProfile } from '../../lib/generator';
// import { RoutineItem, AuditItem } from '../../lib/insights';
// import { generateFitnessPlan } from '../../lib/fitness-engine';
// import { generateSocialProtocol } from '../../lib/social-engine';
// import { generateKitchenPharmacy } from '../../lib/remedy-engine';

// interface Props {
//   report: TransformationReport | null;
//   plan: DailyPlan[];
//   routine: RoutineItem[];
//   audit: AuditItem[];
//   userProfile: UserProfile;
//   selectedDay: number;
//   setSelectedDay: (day: number) => void;
//   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
// }

// type TabID = 'analysis' | 'meals' | 'routine' | 'fitness' | 'naturals' | 'social';

// export const ReportTabs: React.FC<Props> = ({ 
//   report, 
//   plan, 
//   routine, 
//   audit,
//   userProfile,
//   selectedDay,
//   setSelectedDay,
//   onSwap
// }) => {
//   const [activeTab, setActiveTab] = useState<TabID>('analysis');

//   // --- DATA GENERATION ---
//   const fitnessPlan = generateFitnessPlan(userProfile);
//   const socialProtocol = generateSocialProtocol(userProfile);
//   const remedies = generateKitchenPharmacy(userProfile);

//   // --- CONFIGURATION ---
//   const tabs = [
//     { id: 'analysis', label: 'Analysis', icon: SquaresFour },
//     { id: 'meals', label: 'Meals', icon: ForkKnife },
//     { id: 'routine', label: 'Routine', icon: Clock },
//     { id: 'fitness', label: 'Fitness', icon: Barbell },
//     { id: 'naturals', label: 'Naturals', icon: Leaf },
//     { id: 'social', label: 'Social', icon: Users },
//   ] as const;

//   return (
//     <div className="min-h-screen bg-slate-50/50 pb-28 md:pb-0">

//       {/* 1. DESKTOP STICKY HEADER (Hidden on Mobile) */}
//       <div className="hidden md:block sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm transition-all">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="flex items-center justify-center gap-2 py-3">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;

//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id as TabID)}
//                   className={`
//                     flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ease-out font-bold text-sm tracking-wide
//                     ${isActive 
//                       ? 'bg-teal-600 text-white shadow-md ring-2 ring-teal-600/20 scale-105' 
//                       : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900'
//                     }
//                   `}
//                 >
//                   <Icon 
//                     size={20} 
//                     weight={isActive ? "fill" : "regular"} 
//                     className="transition-transform duration-300"
//                   />
//                   <span>{tab.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* 2. DYNAMIC CONTENT AREA */}
//       <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-[85vh]">

//         {/* VIEW A: ANALYSIS */}
//         {activeTab === 'analysis' && (
//           <div className="space-y-14 animate-fadeIn">
//             <TransformationSection report={report} />
//             <div>
//                <div className="mb-8 border-b border-gray-200 pb-5">
//                   <h3 className="text-4xl font-heading font-extrabold text-teal-900 tracking-tight mb-2">
//                     Kitchen & Habit Audit
//                   </h3>
//                   <p className="text-gray-500 text-base">
//                     Daily corrections for better metabolic health
//                   </p>
//                </div>
//                <HabitAudit audit={audit} />
//             </div>
//           </div>
//         )}

//         {/* VIEW B: MEAL PLAN */}
//         {activeTab === 'meals' && (
//           <div className="animate-fadeIn">
//             <MealGrid 
//               plan={plan}
//               selectedDay={selectedDay}
//               setSelectedDay={setSelectedDay}
//               onSwap={onSwap}
//             />
//           </div>
//         )}

//         {/* VIEW C: ROUTINE */}
//         {activeTab === 'routine' && (
//           <div className="animate-fadeIn">
//             <RoutineTimeline routine={routine} />
//           </div>
//         )}

//         {/* VIEW D: FITNESS */}
//         {activeTab === 'fitness' && (
//           <div className="animate-fadeIn">
//             <FitnessView plan={fitnessPlan} />
//           </div>
//         )}

//         {/* VIEW E: NATURALS */}
//         {activeTab === 'naturals' && (
//           <div className="animate-fadeIn">
//             <RemedyView remedies={remedies} />
//           </div>
//         )}

//         {/* VIEW F: SOCIAL */}
//         {activeTab === 'social' && (
//           <div className="animate-fadeIn">
//              <SocialView protocol={socialProtocol} />
//           </div>
//         )}

//       </div>

//       {/* 3. MOBILE BOTTOM NAVIGATION BAR (Material 3 + iOS Frosted Glass) */}
//       <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
//         {/* pb-6 adds padding for the iPhone home indicator line */}
//         <div className="flex items-center justify-between px-1 pt-2 pb-6">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;
//             const isActive = activeTab === tab.id;

//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id as TabID)}
//                 style={{ WebkitTapHighlightColor: 'transparent' }}
//                 className="flex flex-col items-center justify-center w-full outline-none group"
//               >
//                 {/* Modern Pill - Only wraps the icon */}
//                 <div className={`
//                   flex items-center justify-center w-[3.5rem] h-[2rem] rounded-full transition-all duration-300 ease-out
//                   ${isActive ? 'bg-teal-100 text-teal-700' : 'bg-transparent text-gray-400 group-hover:text-gray-600'}
//                 `}>
//                   <Icon 
//                     size={24} 
//                     weight={isActive ? "fill" : "regular"} 
//                     className={`transition-transform duration-300 ${isActive ? 'scale-105' : ''}`}
//                   />
//                 </div>

//                 {/* Text Label - Sits independently below the pill */}
//                 <span className={`mt-1 text-[10px] tracking-wide transition-colors duration-300 ${isActive ? 'text-teal-900 font-bold' : 'text-gray-500 font-medium'}`}>
//                   {tab.label}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </nav>

//     </div>
//   );
// };













// ----------------------------5/10/26----------------------------------

// 'use client';

// import React, { useState } from 'react';
// import {
//   SquaresFour,
//   ForkKnife,
//   Clock,
//   Barbell,
//   Leaf,
//   Users,
//   Heartbeat,
//   ArrowDown,
//   Moon
// } from '@phosphor-icons/react';

// import TransformationSection from './TransformationSection';
// import { FitnessView } from './FitnessView';
// import { SocialView } from './SocialView';
// import { RemedyView } from './RemedyView';
// import MealGrid from '../MealGrid';
// import RoutineTimeline from '../RoutineTimeline';
// import HabitAudit from '../HabitAudit';

// import { TransformationReport } from '../../lib/types/report-types';
// import { DailyPlan, UserProfile } from '../../lib/generator';
// import { RoutineItem, AuditItem, PhenotypeResult } from '../../lib/insights';
// import { generateFitnessPlan } from '../../lib/fitness-engine';
// import { generateSocialProtocol } from '../../lib/social-engine';
// import { generateKitchenPharmacy } from '../../lib/remedy-engine';
// import { getElasticHabit } from '../../lib/habit-engine';

// interface Props {
//   report: TransformationReport | null;
//   phenotype: PhenotypeResult | null;
//   plan: DailyPlan[];
//   routine: RoutineItem[];
//   audit: AuditItem[];
//   userProfile: UserProfile;
//   selectedDay: number;
//   setSelectedDay: (day: number) => void;
//   onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
//   onCustomSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner', customMeal: any) => void;
// }

// type TabID = 'analysis' | 'meals' | 'routine' | 'fitness' | 'naturals' | 'social';

// export const ReportTabs: React.FC<Props> = ({
//   report, phenotype, plan, routine, audit, userProfile, selectedDay, setSelectedDay, onSwap, onCustomSwap
// }) => {
//   const [activeTab, setActiveTab] = useState<TabID>('analysis');

//   // State to track which goals are checked off
//   const [checkedGoals, setCheckedGoals] = useState<Record<number, boolean>>({});
  
//   // ELASTIC ENGINE DEV TOOL: State to simulate user burnout
//   const [simulateBurnout, setSimulateBurnout] = useState(false);

//   const fitnessPlan = generateFitnessPlan(userProfile);
//   const socialProtocol = generateSocialProtocol(userProfile);
//   const remedies = generateKitchenPharmacy(userProfile);

//   const tabs = [
//     { id: 'analysis', label: 'Analysis', icon: SquaresFour },
//     { id: 'meals', label: 'Meals', icon: ForkKnife },
//     { id: 'routine', label: 'Routine', icon: Clock },
//     { id: 'fitness', label: 'Fitness', icon: Barbell },
//     { id: 'naturals', label: 'Naturals', icon: Leaf },
//     { id: 'social', label: 'Social', icon: Users },
//   ] as const;

//   // --- CHECKLIST LOGIC ---
//   const displayedGoals = audit?.slice(0, 3) || [];
//   const totalGoals = displayedGoals.length;
//   const completedGoals = Object.values(checkedGoals).filter(Boolean).length;
//   const progressPercentage = totalGoals === 0 ? 0 : (completedGoals / totalGoals) * 100;

//   const toggleGoal = (idx: number) => {
//     setCheckedGoals(prev => ({
//       ...prev,
//       [idx]: !prev[idx]
//     }));
//   };

//   return (
//     <div className="w-full">

//       {/* 1. DESKTOP STICKY HEADER */}
//       <div className="hidden md:block sticky top-0 z-40 bg-white/80 backdrop-blur-2xl shadow-sm border-b border-slate-100 rounded-b-3xl mb-8">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="flex items-center justify-center gap-2 py-4">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               const isActive = activeTab === tab.id;

//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id as TabID)}
//                   className={`
//                     flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all duration-300 font-bold text-sm tracking-wide
//                     ${isActive
//                       ? 'bg-slate-900 text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] scale-105'
//                       : 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900'
//                     }
//                   `}
//                 >
//                   <Icon size={20} weight={isActive ? "fill" : "duotone"} className="transition-transform duration-300" />
//                   <span>{tab.label}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* 2. DYNAMIC CONTENT AREA */}
//       <div className="w-full p-4 md:p-8 min-h-[85vh]">

//         {/* VIEW A: ANALYSIS & DAILY TRACKER */}
//         {activeTab === 'analysis' && (
//           <div className="space-y-8 animate-fadeIn pb-12">

//             {/* INTERACTIVE DAILY CHECKLIST */}
//             <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
              
//               <div className="mb-6 flex items-end justify-between">
//                 <div>
//                   <h3 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
//                     Today's Goals
//                   </h3>
//                   <p className="text-sm text-slate-500 font-medium mt-1">
//                     Daily tasks for better health.
//                   </p>
//                 </div>

//                 {/* Progress Indicator */}
//                 <div className="w-12 h-12 rounded-full border-4 border-slate-50 flex items-center justify-center relative shrink-0">
//                   <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
//                     <path
//                       className="text-teal-500 transition-all duration-500 ease-out"
//                       strokeDasharray={`${progressPercentage}, 100`}
//                       d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                       fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
//                     />
//                   </svg>
//                   <span className="text-xs font-bold text-slate-700">
//                     {completedGoals}/{totalGoals}
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 {displayedGoals.map((item: any, idx: number) => {
//                   const baseText = item.fix || item.message || "Complete this health task.";
//                   const isChecked = !!checkedGoals[idx];
                  
//                   // ELASTIC ENGINE: In production, this would read from actual user data. 
//                   // For now, it defaults to 0 misses (normal target mode).
//                   const userMisses = 0; 
//                   const userStreak = 0;
//                   const elasticHabit = getElasticHabit(baseText, userMisses, userStreak);

//                   return (
//                     <div key={idx} className="relative group">
//                       <label className={`
//                         flex items-start gap-4 p-4 rounded-[20px] border transition-all cursor-pointer shadow-sm
//                         ${elasticHabit.isScaledDown 
//                           ? 'bg-blue-50/50 border-blue-100' 
//                           : 'bg-white border-slate-100 hover:border-teal-200 hover:shadow-md'}
//                       `}>
//                         <div className="relative flex items-center justify-center shrink-0 mt-0.5">
//                           <input
//                             type="checkbox"
//                             checked={isChecked}
//                             onChange={() => toggleGoal(idx)}
//                             className={`peer appearance-none w-7 h-7 border-[2px] border-slate-200 rounded-full transition-all cursor-pointer ${
//                               elasticHabit.isScaledDown ? 'checked:bg-blue-500 checked:border-blue-500' : 'checked:bg-teal-500 checked:border-teal-500'
//                             }`}
//                           />
//                           <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
                        
//                         <div className="flex-1">
//                           {elasticHabit.isScaledDown && !isChecked && (
//                             <div className="flex items-center gap-1 mb-1.5">
//                               <Heartbeat size={14} weight="fill" className="text-blue-500" />
//                               <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
//                                 Scaled Down for You
//                               </span>
//                             </div>
//                           )}

//                           <p className={`text-[14px] font-semibold leading-snug transition-all duration-300 ${
//                             isChecked ? 'text-slate-400 line-through' : (elasticHabit.isScaledDown ? 'text-blue-950' : 'text-slate-800')
//                           }`}>
//                             {elasticHabit.currentText}
//                           </p>
//                         </div>
//                       </label>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             <TransformationSection report={report} phenotype={phenotype} />

            

//             <div className="mt-8">
//               <div className="mb-6">
//                 <h3 className="text-2xl font-heading font-black text-slate-900 tracking-tight mb-1">
//                   Metabolic Audit
//                 </h3>
//                 <p className="text-slate-500 font-medium text-sm">
//                   Why we assigned these daily goals.
//                 </p>
//               </div>
//               <HabitAudit audit={audit} />
//             </div>
//           </div>
//         )}

//         {/* OTHER VIEWS */}
//         {activeTab === 'meals' && (
//           <div className="animate-fadeIn">
//             <MealGrid
//               plan={plan}
//               selectedDay={selectedDay}
//               setSelectedDay={setSelectedDay}
//               onSwap={onSwap}
//               onCustomSwap={onCustomSwap} 
//               userProfile={userProfile} 
//             />
//           </div>
//         )}

//         {activeTab === 'routine' && (
//           <div className="animate-fadeIn">
//             <RoutineTimeline routine={routine} userProfile={userProfile} />
//           </div>
//         )}

//         {/* VIEW D: FITNESS */}
//         {activeTab === 'fitness' && (
//           <div className="animate-fadeIn">
//             <FitnessView 
//                plan={fitnessPlan} 
//                userProfile={userProfile} 
//             />
//           </div>
//         )}

//         {activeTab === 'naturals' && (
//           <div className="animate-fadeIn">
//             <RemedyView remedies={remedies} />
//           </div>
//         )}

//         {activeTab === 'social' && (
//           <div className="animate-fadeIn">
//             <SocialView protocol={socialProtocol} />
//           </div>
//         )}

//       </div>

//       {/* 3. PREMIUM MOBILE BOTTOM NAVIGATION BAR */}
//       <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-2xl border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.06)]">
//         <div className="flex items-center justify-between px-2 pt-3 pb-8">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;
//             const isActive = activeTab === tab.id;

//             return (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id as TabID)}
//                 style={{ WebkitTapHighlightColor: 'transparent' }}
//                 className="flex flex-col items-center justify-center w-full outline-none group"
//               >
//                 <div className={`
//                   flex items-center justify-center w-14 h-9 rounded-2xl transition-all duration-300 ease-out
//                   ${isActive ? 'bg-teal-50 text-teal-600' : 'bg-transparent text-slate-400 group-hover:text-slate-600'}
//                 `}>
//                   <Icon
//                     size={24}
//                     weight={isActive ? "fill" : "duotone"}
//                     className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
//                   />
//                 </div>

//                 <span className={`mt-1.5 text-[10px] tracking-wide transition-colors duration-300 ${isActive ? 'text-teal-700 font-bold' : 'text-slate-500 font-medium'}`}>
//                   {tab.label}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </nav>

//     </div>
//   );
// };





//====================================11-10-26==================================

'use client';

import React, { useState } from 'react';
import {
  SquaresFour,
  ForkKnife,
  Clock,
  Barbell,
  Leaf,
  Users,
  Heartbeat,
  ArrowDown,
  Moon
} from '@phosphor-icons/react';

import TransformationSection from './TransformationSection';
import { FitnessView } from './FitnessView';
import { SocialView } from './SocialView';
import { RemedyView } from './RemedyView';
import MealGrid from '../MealGrid';
import RoutineTimeline from '../RoutineTimeline';
import HabitAudit from '../HabitAudit';

import { TransformationReport } from '../../lib/types/report-types';
import { DailyPlan, UserProfile } from '../../lib/generator';
import { RoutineItem, AuditItem, PhenotypeResult } from '../../lib/insights';
import { generateFitnessPlan } from '../../lib/fitness-engine';
import { generateSocialProtocol } from '../../lib/social-engine';
import { generateKitchenPharmacy } from '../../lib/remedy-engine';
import { getElasticHabit } from '../../lib/habit-engine';

interface Props {
  report: TransformationReport | null;
  phenotype: PhenotypeResult | null;
  plan: DailyPlan[];
  routine: RoutineItem[];
  audit: AuditItem[];
  userProfile: UserProfile;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  onSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
  onCustomSwap: (slot: 'breakfast' | 'lunch' | 'snack' | 'dinner', customMeal: any) => void;
}

type TabID = 'analysis' | 'meals' | 'routine' | 'fitness' | 'naturals' | 'social';

export const ReportTabs: React.FC<Props> = ({
  report, phenotype, plan, routine, audit, userProfile, selectedDay, setSelectedDay, onSwap, onCustomSwap
}) => {
  const [activeTab, setActiveTab] = useState<TabID>('analysis');

  // State to track which goals are checked off
  const [checkedGoals, setCheckedGoals] = useState<Record<number, boolean>>({});
  
  // NEW: Sleep Debt Tracker State
  const [sleepHours, setSleepHours] = useState<number | null>(null);
  const isSleepDeprived = sleepHours !== null && sleepHours < 6;
  
  // ELASTIC ENGINE DEV TOOL: State to simulate user burnout
  const [simulateBurnout, setSimulateBurnout] = useState(false);

  const fitnessPlan = generateFitnessPlan(userProfile);
  const socialProtocol = generateSocialProtocol(userProfile);
  const remedies = generateKitchenPharmacy(userProfile);

  const tabs = [
    { id: 'analysis', label: 'Analysis', icon: SquaresFour },
    { id: 'meals', label: 'Meals', icon: ForkKnife },
    { id: 'routine', label: 'Routine', icon: Clock },
    { id: 'fitness', label: 'Fitness', icon: Barbell },
    { id: 'naturals', label: 'Naturals', icon: Leaf },
    { id: 'social', label: 'Social', icon: Users },
  ] as const;

  // --- CHECKLIST LOGIC ---
  const displayedGoals = audit?.slice(0, 3) || [];
  const totalGoals = displayedGoals.length;
  const completedGoals = Object.values(checkedGoals).filter(Boolean).length;
  const progressPercentage = totalGoals === 0 ? 0 : (completedGoals / totalGoals) * 100;

  const toggleGoal = (idx: number) => {
    setCheckedGoals(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="w-full">

      {/* 1. DESKTOP STICKY HEADER */}
      <div className="hidden md:block sticky top-0 z-40 bg-white/80 backdrop-blur-2xl shadow-sm border-b border-slate-100 rounded-b-3xl mb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabID)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all duration-300 font-bold text-sm tracking-wide
                    ${isActive
                      ? 'bg-slate-900 text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] scale-105'
                      : 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <Icon size={20} weight={isActive ? "fill" : "duotone"} className="transition-transform duration-300" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC CONTENT AREA */}
      <div className="w-full p-4 md:p-8 min-h-[85vh]">

        {/* ENHANCED: MORNING CHECK-IN WIDGET */}
{sleepHours === null && (
  <div className="mb-8 relative overflow-hidden rounded-[32px] p-6 md:p-8 shadow-[0_16px_40px_rgba(30,27,75,0.4)] text-white bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-800/50 animate-slideUp">
    
    {/* Decorative background glow */}
    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
      
      {/* Left side: Icon & Text */}
      <div className="flex items-center gap-5">
        <div className="p-4 bg-white/5 backdrop-blur-md rounded-[20px] border border-white/10 shadow-inner">
          <Moon size={32} weight="duotone" className="text-indigo-300 drop-shadow-[0_0_12px_rgba(165,180,252,0.5)]" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-1">
            Morning Check-In
          </h3>
          <p className="text-indigo-200/90 text-sm md:text-base font-medium">
            How many hours of sleep did you get last night?
          </p>
        </div>
      </div>
      
      {/* Right side: Interactive Buttons */}
      <div className="flex flex-row w-full md:w-auto justify-between md:justify-end gap-2 md:gap-3">
        {[4, 5, 6, 7, 8].map(h => (
          <button
            key={h}
            onClick={() => setSleepHours(h)}
            className="group relative flex-1 md:flex-none w-auto md:w-16 h-14 md:h-16 rounded-[20px] bg-white/5 hover:bg-indigo-500/30 border border-white/10 hover:border-indigo-400/50 font-bold text-xl md:text-2xl transition-all duration-300 ease-out active:scale-95 flex items-center justify-center text-indigo-100 hover:text-white"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-[20px] bg-indigo-400/0 group-hover:bg-indigo-400/20 blur-md transition-all duration-300 -z-10"></div>
            
            {h}{h === 8 ? '+' : ''}
          </button>
        ))}
      </div>
      
    </div>
  </div>
)}

        {/* VIEW A: ANALYSIS & DAILY TRACKER */}
        {activeTab === 'analysis' && (
          <div className="space-y-8 animate-fadeIn pb-12">

            {/* INTERACTIVE DAILY CHECKLIST */}
            <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
              
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-heading font-black text-slate-900 tracking-tight">
                    Today's Goals
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    Daily tasks for better health.
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="w-12 h-12 rounded-full border-4 border-slate-50 flex items-center justify-center relative shrink-0">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-teal-500 transition-all duration-500 ease-out"
                      strokeDasharray={`${progressPercentage}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-xs font-bold text-slate-700">
                    {completedGoals}/{totalGoals}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {displayedGoals.map((item: any, idx: number) => {
                  const baseText = item.fix || item.message || "Complete this health task.";
                  const isChecked = !!checkedGoals[idx];
                  
                  // ELASTIC ENGINE: In production, this would read from actual user data. 
                  // For now, it defaults to 0 misses (normal target mode).
                  const userMisses = 0; 
                  const userStreak = 0;
                  const elasticHabit = getElasticHabit(baseText, userMisses, userStreak);

                  return (
                    <div key={idx} className="relative group">
                      <label className={`
                        flex items-start gap-4 p-4 rounded-[20px] border transition-all cursor-pointer shadow-sm
                        ${elasticHabit.isScaledDown 
                          ? 'bg-blue-50/50 border-blue-100' 
                          : 'bg-white border-slate-100 hover:border-teal-200 hover:shadow-md'}
                      `}>
                        <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleGoal(idx)}
                            className={`peer appearance-none w-7 h-7 border-[2px] border-slate-200 rounded-full transition-all cursor-pointer ${
                              elasticHabit.isScaledDown ? 'checked:bg-blue-500 checked:border-blue-500' : 'checked:bg-teal-500 checked:border-teal-500'
                            }`}
                          />
                          <svg className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        
                        <div className="flex-1">
                          {elasticHabit.isScaledDown && !isChecked && (
                            <div className="flex items-center gap-1 mb-1.5">
                              <Heartbeat size={14} weight="fill" className="text-blue-500" />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                                Scaled Down for You
                              </span>
                            </div>
                          )}

                          <p className={`text-[14px] font-semibold leading-snug transition-all duration-300 ${
                            isChecked ? 'text-slate-400 line-through' : (elasticHabit.isScaledDown ? 'text-blue-950' : 'text-slate-800')
                          }`}>
                            {elasticHabit.currentText}
                          </p>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <TransformationSection report={report} phenotype={phenotype} />

            <div className="mt-8">
              <div className="mb-6">
                <h3 className="text-2xl font-heading font-black text-slate-900 tracking-tight mb-1">
                  Metabolic Audit
                </h3>
                <p className="text-slate-500 font-medium text-sm">
                  Why we assigned these daily goals.
                </p>
              </div>
              <HabitAudit audit={audit} />
            </div>
          </div>
        )}

        {/* OTHER VIEWS */}
        {activeTab === 'meals' && (
          <div className="animate-fadeIn">
            <MealGrid
              plan={plan}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              onSwap={onSwap}
              onCustomSwap={onCustomSwap} 
              userProfile={userProfile} 
              isSleepDeprived={isSleepDeprived}
            />
          </div>
        )}

        {activeTab === 'routine' && (
          <div className="animate-fadeIn">
            <RoutineTimeline routine={routine} userProfile={userProfile} />
          </div>
        )}

        {/* VIEW D: FITNESS */}
        {activeTab === 'fitness' && (
          <div className="animate-fadeIn">
            <FitnessView 
               plan={fitnessPlan} 
               userProfile={userProfile} 
               isSleepDeprived={isSleepDeprived}
            />
          </div>
        )}

        {activeTab === 'naturals' && (
          <div className="animate-fadeIn">
            <RemedyView remedies={remedies} />
          </div>
        )}

        {activeTab === 'social' && (
          <div className="animate-fadeIn">
            <SocialView protocol={socialProtocol} />
          </div>
        )}

      </div>

      {/* 3. PREMIUM MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-2xl border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between px-2 pt-3 pb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabID)}
                style={{ WebkitTapHighlightColor: 'transparent' }}
                className="flex flex-col items-center justify-center w-full outline-none group"
              >
                <div className={`
                  flex items-center justify-center w-14 h-9 rounded-2xl transition-all duration-300 ease-out
                  ${isActive ? 'bg-teal-50 text-teal-600' : 'bg-transparent text-slate-400 group-hover:text-slate-600'}
                `}>
                  <Icon
                    size={24}
                    weight={isActive ? "fill" : "duotone"}
                    className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
                  />
                </div>

                <span className={`mt-1.5 text-[10px] tracking-wide transition-colors duration-300 ${isActive ? 'text-teal-700 font-bold' : 'text-slate-500 font-medium'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
};