// import React from 'react';
// import { LifestyleArchetype } from '../../lib/types/report-types';
// import { Brain, Zap, Moon, Shield } from 'lucide-react';

// interface Props {
//   data: LifestyleArchetype;
// }

// // 1. Color Mapping System (Upgraded with dynamic Strategy Box backgrounds)
// const THEME_STYLES = {
//   slate: {
//     bg: 'bg-slate-50',
//     border: 'border-slate-200',
//     text: 'text-slate-900',
//     accent: 'bg-slate-800 text-white',
//     icon: 'text-slate-500',
//     tag: 'bg-slate-100 text-slate-600 border-slate-200',
//     strategyBg: 'bg-slate-100/70 border-slate-200' // Tinted to match slate theme
//   },
//   rose: {
//     bg: 'bg-rose-50',
//     border: 'border-rose-200',
//     text: 'text-rose-900',
//     accent: 'bg-rose-600 text-white',
//     icon: 'text-rose-500',
//     tag: 'bg-rose-100 text-rose-700 border-rose-200',
//     strategyBg: 'bg-rose-100/70 border-rose-200'
//   },
//   amber: {
//     bg: 'bg-amber-50',
//     border: 'border-amber-200',
//     text: 'text-amber-900',
//     accent: 'bg-amber-500 text-white',
//     icon: 'text-amber-600',
//     tag: 'bg-amber-100 text-amber-800 border-amber-200',
//     strategyBg: 'bg-amber-100/70 border-amber-200'
//   },
//   emerald: {
//     bg: 'bg-emerald-50',
//     border: 'border-emerald-200',
//     text: 'text-emerald-900',
//     accent: 'bg-emerald-600 text-white',
//     icon: 'text-emerald-600',
//     tag: 'bg-emerald-100 text-emerald-700 border-emerald-200',
//     strategyBg: 'bg-emerald-100/70 border-emerald-200'
//   },
//   blue: {
//     bg: 'bg-blue-50',
//     border: 'border-blue-200',
//     text: 'text-blue-900',
//     accent: 'bg-blue-600 text-white',
//     icon: 'text-blue-600',
//     tag: 'bg-blue-100 text-blue-700 border-blue-200',
//     strategyBg: 'bg-blue-100/70 border-blue-200'
//   }
// };

// const getIcon = (id: string) => {
//   switch (id) {
//     case 'twilight_warrior': return <Moon size={28} />;
//     case 'emotional_grazer': return <Zap size={28} />;
//     case 'outsourced_eater': return <Shield size={28} />;
//     default: return <Brain size={28} />;
//   }
// };

// export const ArchetypeCard: React.FC<Props> = ({ data }) => {
//   const theme = THEME_STYLES[data.colorTheme] || THEME_STYLES.slate;
//   const Icon = getIcon(data.id);

//   return (
//     <div className={`w-full rounded-3xl p-6 md:p-8 border ${theme.bg} ${theme.border} shadow-sm mb-12`}>
//       <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        
//         {/* Left: Identity Badge */}
//         <div className="flex-shrink-0">
//           <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center ${theme.accent} shadow-md`}>
//             {Icon}
//           </div>
//         </div>

//         {/* Right: Content */}
//         <div className="flex-1 space-y-5">
//           <div>
//             <div className="mb-3">
//               {/* Removed uppercase and tracking to make it read naturally */}
//               <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold border ${theme.border} bg-white ${theme.icon}`}>
//                 Your Metabolic Profile
//               </span>
//             </div>
//             <h2 className={`text-2xl md:text-3xl font-heading font-extrabold ${theme.text} mb-3 tracking-tight`}>
//               {data.title}
//             </h2>
//             <p className="text-gray-600 text-base md:text-lg leading-relaxed">
//               {data.narrative}
//             </p>
//           </div>

//           {/* Strategy Box: Dynamic Background & Natural Font */}
//           <div className={`rounded-2xl p-5 md:p-6 border ${theme.strategyBg} shadow-sm relative overflow-hidden`}>
//             <div className={`absolute top-0 left-0 w-1 h-full ${theme.accent}`}></div>
//             {/* Standard sentence-case bold font, perfectly matching the theme's icon color */}
//             <h4 className={`text-sm font-bold mb-1.5 ${theme.icon}`}>
//               Core Strategy
//             </h4>
//             <p className={`text-base font-semibold ${theme.text} leading-snug`}>
//               {data.coreStrategy}
//             </p>
//           </div>

//           {/* Tags */}
//           <div className="flex flex-wrap gap-2 pt-1">
//             {data.focusTags.map(tag => (
//               <span key={tag} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${theme.tag}`}>
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




//=====================5/10/26============================
// 'use client';

// import React from 'react';
// import { PhenotypeResult } from '../../lib/insights';
// // Swapped 'Activity' for 'Heartbeat' to ensure compatibility
// import { Moon, Lightning, Brain, Heartbeat } from '@phosphor-icons/react';

// // CORRECT INTERFACE: We pass phenotype directly, not the whole report
// interface Props {
//   phenotype: PhenotypeResult | null;
// }

// export const ArchetypeCard: React.FC<Props> = ({ phenotype }) => {
//   if (!phenotype) return null;

//   const getPhenotypeIcon = () => {
//     const type = phenotype.type.toLowerCase();
//     if (type.includes('twilight') || type.includes('night') || type.includes('sleep')) return Moon;
//     if (type.includes('stress') || type.includes('cortisol')) return Brain;
//     if (type.includes('energy') || type.includes('sugar')) return Lightning;
//     return Heartbeat; 
//   };

//   const Icon = getPhenotypeIcon();

//   return (
//     <div className="w-full">
//       <div className="mb-6">
//         <h3 className="text-2xl font-heading font-black text-slate-900 tracking-tight mb-1">
//           Your Blueprint
//         </h3>
//         <p className="text-slate-500 font-medium text-sm">
//           Based on your clinical data and daily habits.
//         </p>
//       </div>

//       {/* Changed rounded-[32px] to rounded-4xl */}
//       <div className="bg-white rounded-4xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
//         <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        
//         <div className="relative z-10">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md">
//               <Icon size={28} weight="duotone" />
//             </div>
//             <div>
//               <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg mb-1.5 inline-block">
//                 Metabolic Profile
//               </span>
//               <h4 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">
//                 {phenotype.type}
//               </h4>
//             </div>
//           </div>

//           <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed mb-6">
//             {phenotype.description}
//           </p>

//           <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mt-6">
//             <div className="flex items-center gap-2 mb-2">
//               {/* Fallback color if undefined */}
//               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phenotype.color || '#14b8a6' }}></div>
//               <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">
//                 Core Strategy
//               </h5>
//             </div>
//             {/* Using phenotype.strategy (string) instead of .map to prevent the implicit 'any' error */}
//             <p className="text-sm font-bold text-slate-700 leading-relaxed">
//               {phenotype.strategy}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };









//========================================6/10/26==============================================

// 'use client';

// import React from 'react';
// import { PhenotypeResult } from '../../lib/insights';
// import { Moon, Lightning, Brain, Heartbeat } from '@phosphor-icons/react';

// interface Props {
//   phenotype: PhenotypeResult | null;
// }

// export const ArchetypeCard: React.FC<Props> = ({ phenotype }) => {
//   if (!phenotype) return null;

//   const getPhenotypeIcon = () => {
//     const type = phenotype.type.toLowerCase();
//     if (type.includes('twilight') || type.includes('night') || type.includes('sleep')) return Moon;
//     if (type.includes('stress') || type.includes('cortisol')) return Brain;
//     if (type.includes('energy') || type.includes('sugar')) return Lightning;
//     return Heartbeat; 
//   };

//   const Icon = getPhenotypeIcon();

//   return (
//     <div className="w-full">
//       <div className="mb-6">
//         <h3 className="text-2xl font-heading font-black text-slate-900 tracking-tight mb-1">
//           Your Blueprint
//         </h3>
//         <p className="text-slate-500 font-medium text-sm">
//           Based on your clinical data and daily habits.
//         </p>
//       </div>

//       <div className="bg-white rounded-4xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden relative">
//         <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        
//         <div className="relative z-10">
          
//           {/* Stripped away the pill background, using clean tracked-out typography */}
//           <div className="flex items-start gap-4 mb-2">
//             <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md shrink-0">
//               <Icon size={28} weight="duotone" />
//             </div>
//             <div className="pt-1">
//               <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">
//                 Metabolic Profile
//               </p>
//               <h4 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
//                 {phenotype.type}
//               </h4>
//             </div>
//           </div>

//           <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed mt-5">
//             {phenotype.description}
//           </p>

//           {/* Core Strategy: Replaced the heavy gray box and dot with an elegant left-border layout */}
//           <div className="mt-6 pt-5 border-t border-slate-100">
//             <h5 className="text-[10px] font-bold uppercase tracking-widest text-teal-600 mb-3">
//               Core Strategy
//             </h5>
//             <div className="border-l-2 border-teal-500 pl-4">
//               {/* Lowered font-weight to medium for much better readability */}
//               <p className="text-sm font-medium text-slate-700 leading-relaxed">
//                 {phenotype.strategy}
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };





//=================================9/10/26=======================================

'use client';

import React from 'react';
import { PhenotypeResult } from '../../lib/insights';
import { Moon, Lightning, Brain, Heartbeat } from '@phosphor-icons/react';

interface Props {
  phenotype: PhenotypeResult | null;
}

export const ArchetypeCard: React.FC<Props> = ({ phenotype }) => {
  if (!phenotype) return null;

  const getPhenotypeIcon = () => {
    const type = phenotype.type.toLowerCase();

    if (
      type.includes('twilight') ||
      type.includes('night') ||
      type.includes('sleep')
    )
      return Moon;

    if (type.includes('stress') || type.includes('cortisol'))
      return Brain;

    if (type.includes('energy') || type.includes('sugar'))
      return Lightning;

    return Heartbeat;
  };

  const Icon = getPhenotypeIcon();

  return (
    <section className="w-full">
      {/* Section heading */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-heading font-black tracking-tight text-slate-900">
            Your Blueprint
          </h3>
          <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500">
            Based on your clinical data and daily habits.
          </p>
        </div>
        {/* <span className="hidden sm:inline-flex items-center rounded-md bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600 border border-slate-200">
          Live Assessment
        </span> */}
      </div>

      {/* Blueprint card */}
      <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">

        <div className="p-6 sm:p-9">

          {/* Profile header */}
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="flex shrink-0 text-teal-600">
              <Icon size={44} weight="duotone" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1.5">
                <span className="inline-flex items-center rounded-md bg-teal-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-teal-700 border border-teal-100">
                  Metabolic Profile
                </span>
              </div>

              <h4 className="max-w-2xl text-2xl font-black leading-[1.15] tracking-[-0.035em] text-slate-900 sm:text-[28px]">
                {phenotype.type}
              </h4>
            </div>
          </div>

          {/* Clinical insight */}
          <div className="mt-6 sm:mt-8">
            <p className="max-w-3xl text-[15px] font-medium leading-[1.85] text-slate-600 sm:text-base">
              {phenotype.description}
            </p>
          </div>

          {/* Strategy panel */}
          <div className="mt-8">
            <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5 sm:p-7">

              <h5 className="mb-2.5 text-lg font-bold tracking-tight text-teal-950">
                Core Strategy
              </h5>

              <p className="text-sm font-medium leading-[1.85] text-slate-700 sm:text-[15px]">
                {phenotype.strategy}
              </p>

            </div>
          </div>

        </div>
      </article>
    </section>
  );
};