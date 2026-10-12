// // components/RoutineTimeline.tsx
// import React from 'react';
// import { RoutineItem } from '../lib/insights';
// import { 
//   Sun, 
//   Moon, 
//   Coffee, 
//   Utensils, 
//   Footprints, // For Walking
//   Apple,      // For Snack
//   Soup,       // For Dinner
//   ArrowUp,    // For Upright
//   Clock
// } from 'lucide-react';

// interface Props {
//   routine: RoutineItem[];
// }

// export default function RoutineTimeline({ routine }: Props) {
    
//   // Map string IDs from logic to Lucide Components
//   const getIcon = (iconName: string) => {
//     switch (iconName) {
//       case 'WakeUp': return <Sun className="text-orange-500" />;
//       case 'Sun': return <Sun className="text-amber-500" />;
//       case 'Breakfast': return <Coffee className="text-rose-500" />; // Morning fuel
//       case 'Lunch': return <Utensils className="text-emerald-600" />;
//       case 'Walk': return <Footprints className="text-blue-500" />;
//       case 'Snack': return <Apple className="text-red-500" />;
//       case 'Dinner': return <Soup className="text-indigo-500" />;
//       case 'Upright': return <ArrowUp className="text-cyan-500" />;
//       case 'Moon': return <Moon className="text-slate-400" />;
//       default: return <Clock className="text-gray-400" />;
//     }
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
//       <div className="flex items-center gap-3 mb-8">
//         <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
//            <Clock size={24} />
//         </div>
//         <h3 className="text-xl font-bold text-slate-900">
//           Suggested Daily Rhythm
//         </h3>
//       </div>
      
//       <div className="relative">
//         {/* Vertical Line */}
//         <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100"></div>
        
//         <div className="space-y-8">
//           {routine.map((item, idx) => (
//             <div key={idx} className="relative pl-16 group">
              
//               {/* Timeline Dot */}
//               <div className="absolute left-1.5 top-0 w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm z-10 group-hover:border-blue-300 group-hover:shadow-md transition-all">
//                  {getIcon(item.icon)}
//               </div>
              
//               <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
//                 <span className="font-bold text-slate-900 text-lg">
//                     {item.time}
//                 </span>
//                 <span className="text-slate-600 font-medium text-base">
//                     {item.activity}
//                 </span>
//               </div>
              
//               <p className="text-slate-500 text-sm mt-2 bg-slate-50 p-3 rounded-lg inline-block border border-slate-100">
//                 {item.note}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






//=======================18/08/26 - Review 1 ==================================


// 'use client';

// import React from 'react';
// import { RoutineItem } from '../lib/insights';
// import { Clock, Sun, Moon, Zap, Droplet } from 'lucide-react';
// import { motion } from 'framer-motion';

// export default function RoutineTimeline({ routine }: { routine: RoutineItem[] }) {
  
//   // Helper to pick icons based on timing/context
//   const getIcon = (item: RoutineItem) => {
//     const text = item.activity.toLowerCase();
//     if (text.includes('sleep') || text.includes('bed')) return Moon;
//     if (text.includes('water') || text.includes('drink')) return Droplet;
//     if (text.includes('walk') || text.includes('exercise')) return Zap;
//     if (text.includes('sun')) return Sun;
//     return Clock;
//   };

//   return (
//     <div className="relative pl-4 md:pl-0">
      
//       {/* The Spine (Vertical Line) */}
//       <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-px bg-brand-100 -translate-x-1/2 hidden md:block" />
//       <div className="absolute left-0 top-4 bottom-4 w-px bg-brand-100 block md:hidden" />

//       <div className="space-y-12 py-4">
//         {routine.map((item, index) => {
//           const Icon = getIcon(item);
//           const isEven = index % 2 === 0;

//           return (
//             <motion.div 
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//               className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${
//                 isEven ? 'md:flex-row-reverse' : ''
//               }`}
//             >
              
//               {/* Content Card */}
//               <div className="flex-1 w-full md:w-auto pl-8 md:pl-0">
//                 <div className={`bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative
//                    ${isEven ? 'md:mr-12 text-left' : 'md:ml-12 text-left'}
//                 `}>
//                    {/* Mobile Connector Dot */}
//                    <div className="absolute left-[-33px] top-6 w-3 h-3 rounded-full bg-brand-200 border-2 border-white shadow-sm md:hidden" />
                   
//                    <span className="inline-block px-2 py-1 rounded bg-brand-50 text-brand-700 text-[10px] font-bold uppercase tracking-wider mb-2">
//                      {item.time}
//                    </span>
//                    <h4 className="text-gray-900 font-bold leading-tight">
//                      {item.activity}
//                    </h4>
//                 </div>
//               </div>

//               {/* Center Icon (Desktop) */}
//               <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-canvas-50 shadow-sm z-10 text-brand-600">
//                 <Icon size={18} />
//               </div>

//               {/* Spacer for the other side */}
//               <div className="flex-1 hidden md:block" />

//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }






//======================= before7/10/26 ==================================

  // 'use client';

  // import React from 'react';
  // import { RoutineItem } from '../lib/insights';
  // import { Clock, Sun, Moon, Zap, Droplet, Utensils, Coffee } from 'lucide-react';
  // import { motion } from 'framer-motion';

  // export default function RoutineTimeline({ routine }: { routine: RoutineItem[] }) {
    
  //   // Smarter Icon Mapper
  //   const getIcon = (item: RoutineItem) => {
  //     const text = item.activity.toLowerCase();
  //     if (text.includes('sleep') || text.includes('wind') || text.includes('bed')) return Moon;
  //     if (text.includes('water') || text.includes('hydrate')) return Droplet;
  //     if (text.includes('walk') || text.includes('exercise')) return Zap;
  //     if (text.includes('sun') || text.includes('light')) return Sun;
  //     if (text.includes('breakfast') || text.includes('lunch') || text.includes('dinner')) return Utensils;
  //     if (text.includes('snack')) return Coffee;
  //     return Clock;
  //   };

  //   return (
  //     <div className="animate-fadeIn">
        
  //       {/* 1. SECTION HEADER (Perfectly matched with Analysis & Movement tabs) */}
  //       <div className="mb-12 border-b border-gray-200 pb-5">
  //         <h2 className="text-4xl font-heading font-extrabold text-teal-900 tracking-tight mb-2">
  //           Circadian Routine
  //         </h2>
  //         <p className="text-gray-500 text-base">
  //           Your daily schedule optimized for your body clock and metabolism
  //         </p>
  //       </div>

  //       {/* 2. THE TIMELINE */}
  //       <div className="relative pl-6 md:pl-0 mt-8">
          
  //         {/* The Spine (Vertical Line) */}
  //         <div className="absolute left-[34px] md:left-1/2 top-4 bottom-4 w-0.5 bg-gray-100 -translate-x-1/2 hidden md:block" />
  //         <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-gray-100 block md:hidden" />

  //         <div className="space-y-8 md:space-y-12 py-4">
  //           {routine.map((item, index) => {
  //             const Icon = getIcon(item);
  //             const isEven = index % 2 === 0;

  //             return (
  //               <motion.div 
  //                 key={index}
  //                 initial={{ opacity: 0, y: 20 }}
  //                 whileInView={{ opacity: 1, y: 0 }}
  //                 viewport={{ once: true, margin: "-50px" }}
  //                 transition={{ duration: 0.4, delay: index * 0.05 }}
  //                 className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${
  //                   isEven ? 'md:flex-row-reverse' : ''
  //                 }`}
  //               >
                  
  //                 {/* Content Card */}
  //                 <div className="flex-1 w-full md:w-auto pl-6 md:pl-0">
  //                   <div className={`bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative
  //                     ${isEven ? 'md:mr-14 text-left' : 'md:ml-14 text-left'}
  //                   `}>
  //                     {/* Mobile Connector Dot */}
  //                     <div className="absolute left-[-29px] top-8 w-3 h-3 rounded-full bg-teal-500 border-[3px] border-white shadow-sm md:hidden" />
                      
  //                     <div className="mb-3">
  //                       <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-100">
  //                         {item.time}
  //                       </span>
  //                     </div>
                      
  //                     <h4 className="text-xl font-bold text-gray-900 leading-tight mb-2">
  //                       {item.activity}
  //                     </h4>
                      
  //                     {/* RENDER THE MISSING NOTE! */}
  //                     {item.note && (
  //                       <p className="text-sm text-gray-600 leading-relaxed font-medium">
  //                         {item.note}
  //                       </p>
  //                     )}
  //                   </div>
  //                 </div>

  //                 {/* Center Icon (Desktop) */}
  //                 <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm z-10 text-teal-600">
  //                   <Icon size={20} strokeWidth={2.5} />
  //                 </div>

  //                 {/* Spacer for the other side */}
  //                 <div className="flex-1 hidden md:block" />

  //               </motion.div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }











//======================= 7/10/26 ==================================
'use client';

import React, { useState, useEffect } from 'react';
import { RoutineItem, generateDailyRoutine, ShiftMode } from '../lib/insights';
import { UserProfile } from '../lib/generator';
import { Clock, Sun, Moon, Zap, Droplet, Utensils, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

// NEW: We receive userProfile to dynamically recalculate the times when the user toggles their shift.
export default function RoutineTimeline({ routine: initialRoutine, userProfile }: { routine: RoutineItem[], userProfile?: UserProfile }) {
  const [shiftMode, setShiftMode] = useState<ShiftMode>('auto');
  const [activeRoutine, setActiveRoutine] = useState<RoutineItem[]>(initialRoutine);

  // Recalculate the timeline instantly when they click a toggle button
  useEffect(() => {
    if (userProfile && shiftMode !== 'auto') {
      setActiveRoutine(generateDailyRoutine(userProfile, shiftMode));
    } else {
      setActiveRoutine(initialRoutine);
    }
  }, [shiftMode, userProfile, initialRoutine]);
  
  // Smarter Icon Mapper
  const getIcon = (item: RoutineItem) => {
    const text = item.activity.toLowerCase();
    if (text.includes('sleep') || text.includes('wind') || text.includes('bed')) return Moon;
    if (text.includes('water') || text.includes('hydrate') || text.includes('wake')) return Droplet;
    if (text.includes('walk') || text.includes('exercise')) return Zap;
    if (text.includes('sun') || text.includes('light')) return Sun;
    if (text.includes('meal') || text.includes('dinner') || text.includes('breakfast')) return Utensils;
    if (text.includes('snack')) return Coffee;
    return Clock;
  };

  // Determine active button for styling
  const currentShift = shiftMode === 'auto' 
    ? (userProfile?.workSchedule?.includes('Night') ? 'night' : 'standard') 
    : shiftMode;

  return (
    <div className="animate-fadeIn">
      
      {/* 1. SECTION HEADER WITH SHIFT TOGGLE */}
      <div className="mb-12 border-b border-slate-100 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight mb-2">
            Circadian Routine
          </h2>
          <p className="text-slate-500 font-medium text-base">
            Your daily schedule optimized for your body clock.
          </p>
        </div>

        {/* The Shift Adjuster UI */}
        {userProfile && (
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center shrink-0 shadow-inner">
            <button
              onClick={() => setShiftMode('standard')}
              className={`flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentShift === 'standard'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              Normal Day
            </button>
            <button
              onClick={() => setShiftMode('late')}
              className={`flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentShift === 'late'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              Late Start
            </button>
            <button
              onClick={() => setShiftMode('night')}
              className={`flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentShift === 'night'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              Night Shift
            </button>
          </div>
        )}
      </div>

      {/* 2. THE TIMELINE */}
      <div className="relative pl-6 md:pl-0 mt-8">
        
        {/* The Spine (Vertical Line) */}
        <div className="absolute left-[34px] md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-100 -translate-x-1/2 hidden md:block" />
        <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-slate-100 block md:hidden" />

        <div className="space-y-8 md:space-y-12 py-4">
          {activeRoutine.map((item, index) => {
            const Icon = getIcon(item);
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={`${shiftMode}-${index}`} // Key change forces animation to replay on toggle
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                
                {/* Content Card */}
                <div className="flex-1 w-full md:w-auto pl-6 md:pl-0">
                  <div className={`bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative
                     ${isEven ? 'md:mr-14 text-left' : 'md:ml-14 text-left md:text-right'}
                  `}>
                     {/* Mobile Connector Dot */}
                     <div className="absolute left-[-29px] top-8 w-3 h-3 rounded-full bg-teal-500 border-[3px] border-white shadow-sm md:hidden" />
                     
                     <div className="mb-3">
                       <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide text-teal-700 bg-teal-50 border border-teal-100">
                         {item.time}
                       </span>
                     </div>
                     
                     <h4 className="text-[17px] font-bold text-slate-900 leading-tight mb-2">
                       {item.activity}
                     </h4>
                     
                     {item.note && (
                       <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                         {item.note}
                       </p>
                     )}
                  </div>
                </div>

                {/* Center Icon (Desktop) */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm z-10 text-teal-600">
                  <Icon size={20} strokeWidth={2.5} />
                </div>

                {/* Spacer for the other side */}
                <div className="flex-1 hidden md:block" />

              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}