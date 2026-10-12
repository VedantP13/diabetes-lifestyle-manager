// import React from 'react';
// import { 
//   DominoInsight, 
//   KitchenInsight, 
//   PhysiologicalInsight, 
//   FitnessInsight 
// } from '../../lib/types/report-types';
// import { 
//   ArrowRight, 
//   AlertCircle, 
//   ChefHat, 
//   Activity, 
//   Link2, 
//   Dumbbell 
// } from 'lucide-react';

// // --- SUB-COMPONENT 1: THE DOMINO LAYOUT ---
// const DominoLayout = ({ data }: { data: DominoInsight }) => (
//   <div className="relative">
//     <div className="flex items-center gap-2 mb-4 text-rose-600">
//       <Link2 size={18} />
//       <span className="text-xs font-bold uppercase tracking-widest">Chain Reaction</span>
//     </div>
    
//     <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center mb-6">
//       {/* Trigger */}
//       <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
//         <span className="block text-xs text-rose-400 font-bold mb-1">TRIGGER</span>
//         <p className="font-semibold text-rose-900">{data.trigger}</p>
//       </div>

//       {/* Arrow Visual */}
//       <div className="hidden md:flex justify-center text-rose-300">
//         <ArrowRight size={24} />
//       </div>

//       {/* Consequence */}
//       <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
//         <span className="block text-xs text-rose-400 font-bold mb-1">CONSEQUENCE</span>
//         <p className="font-semibold text-rose-900">{data.consequence}</p>
//       </div>
//     </div>

//     <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
//       <h4 className="font-bold text-gray-800 text-sm mb-1 flex items-center gap-2">
//         <span className="w-2 h-2 rounded-full bg-rose-500"></span>
//         The Fix
//       </h4>
//       <p className="text-gray-600 text-sm">{data.microFix}</p>
//     </div>
//   </div>
// );

// // --- SUB-COMPONENT 2: THE KITCHEN LAYOUT ---
// const KitchenLayout = ({ data }: { data: KitchenInsight }) => (
//   <div>
//     <div className="flex items-center gap-2 mb-4 text-amber-600">
//       <ChefHat size={18} />
//       <span className="text-xs font-bold uppercase tracking-widest">Environment Hack</span>
//     </div>

//     <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100">
//       <div className="mb-4 pb-4 border-b border-amber-200/50">
//         <h4 className="font-bold text-gray-900 mb-1">{data.problem}</h4>
//         <p className="text-sm text-amber-800/80">{data.impact}</p>
//       </div>
      
//       <div>
//         <span className="text-xs font-bold text-amber-600 uppercase mb-2 block">Protocol</span>
//         <p className="text-gray-800 font-medium bg-white p-3 rounded-lg border border-amber-100 shadow-sm">
//           {data.protocol}
//         </p>
//       </div>
//     </div>
//   </div>
// );

// // --- SUB-COMPONENT 3: THE PHYSIOLOGY LAYOUT ---
// const PhysioLayout = ({ data }: { data: PhysiologicalInsight }) => (
//   <div>
//     <div className="flex items-center gap-2 mb-4 text-blue-600">
//       <Activity size={18} />
//       <span className="text-xs font-bold uppercase tracking-widest">Body Logic</span>
//     </div>

//     <h3 className="text-lg font-bold text-gray-900 mb-3">{data.title}</h3>
    
//     <div className="prose prose-sm text-gray-600 mb-4">
//       <p>{data.explanation}</p>
//     </div>

//     <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
//       <div className="bg-blue-600 text-white rounded-full p-1 mt-0.5">
//          <ArrowRight size={12} />
//       </div>
//       <div>
//         <span className="block text-xs font-bold text-blue-700 uppercase mb-1">Adjustment</span>
//         <p className="text-sm text-blue-900 font-medium">{data.adjustment}</p>
//       </div>
//     </div>
//   </div>
// );

// // --- SUB-COMPONENT 4: THE FITNESS LAYOUT (NEW) ---
// const FitnessLayout = ({ data }: { data: FitnessInsight }) => (
//   <div>
//     <div className="flex items-center justify-between mb-4">
//       <div className="flex items-center gap-2 text-teal-600">
//         <Dumbbell size={18} />
//         <span className="text-xs font-bold uppercase tracking-widest">Movement Protocol</span>
//       </div>
//       {/* Intensity Badge */}
//       <span className={`text-[10px] font-bold px-2 py-1 rounded-full border uppercase
//         ${data.intensity === 'Low' ? 'bg-green-50 text-green-600 border-green-200' : 
//           data.intensity === 'Moderate' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 
//           'bg-orange-50 text-orange-600 border-orange-200'}`}>
//         {data.intensity} Impact
//       </span>
//     </div>

//     <div className="mb-4">
//       <h3 className="text-lg font-bold text-gray-900 mb-1">{data.strategy}</h3>
//       <h4 className="text-sm font-medium text-teal-600">{data.title}</h4>
//     </div>

//     <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100 mb-4">
//       <p className="text-sm text-gray-600 leading-relaxed italic">
//         "{data.science}"
//       </p>
//     </div>

//     <div>
//       <span className="text-xs font-bold text-gray-400 uppercase mb-2 block">Your Daily Micro-Habit</span>
//       <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
//         <div className="min-w-[4px] h-full min-h-[40px] bg-teal-500 rounded-full"></div>
//         <p className="text-gray-800 font-medium text-sm">
//           {data.dailyAction}
//         </p>
//       </div>
//     </div>
//   </div>
// );

// // --- MAIN WRAPPER ---
// export const InsightCard = ({ data }: { data: DominoInsight | KitchenInsight | PhysiologicalInsight | FitnessInsight }) => {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
//       {data.type === 'domino_effect' && <DominoLayout data={data as DominoInsight} />}
//       {data.type === 'kitchen_hack' && <KitchenLayout data={data as KitchenInsight} />}
//       {data.type === 'physiological_link' && <PhysioLayout data={data as PhysiologicalInsight} />}
//       {data.type === 'fitness_protocol' && <FitnessLayout data={data as FitnessInsight} />}
//     </div>
//   );
// };








//=======================18/08/26 - Review 1 ==================================


// 'use client';

// import React from 'react';
// import { 
//   DominoInsight, 
//   KitchenInsight, 
//   PhysiologicalInsight, 
//   FitnessInsight 
// } from '../../lib/types/report-types';
// import { Lightbulb, Zap, Utensils, Activity, ArrowRight } from 'lucide-react';

// // Original Union Type
// type Insight = DominoInsight | KitchenInsight | PhysiologicalInsight | FitnessInsight;

// // UI Interface - We force these fields to exist for rendering purposes
// // This handles cases where the strict type definition might differ from actual runtime data
// interface DisplayInsight {
//   type: string;
//   title: string;
//   explanation?: string; // made optional to be safe
//   description?: string; // fallback
//   dailyAction?: string;
// }

// export const InsightCard = ({ insight }: { insight: Insight }) => {
  
//   // Cast to our Display interface to access fields safely
//   const data = insight as unknown as DisplayInsight;
  
//   // Dynamic Styling based on Insight Type
//   const getStyle = (type: string) => {
//     switch (type) {
//       case 'domino':
//         return {
//           bg: 'bg-indigo-50',
//           border: 'border-indigo-100',
//           iconBg: 'bg-indigo-100',
//           iconColor: 'text-indigo-600',
//           icon: Zap,
//           label: 'Habit Domino'
//         };
//       case 'kitchen':
//         return {
//           bg: 'bg-amber-50',
//           border: 'border-amber-100',
//           iconBg: 'bg-amber-100',
//           iconColor: 'text-amber-600',
//           icon: Utensils,
//           label: 'Kitchen Lab'
//         };
//       case 'physiology':
//         return {
//           bg: 'bg-teal-50',
//           border: 'border-teal-100',
//           iconBg: 'bg-teal-100',
//           iconColor: 'text-teal-700',
//           icon: Activity,
//           label: 'Body Science'
//         };
//       default:
//         return {
//           bg: 'bg-gray-50',
//           border: 'border-gray-200',
//           iconBg: 'bg-white',
//           iconColor: 'text-gray-600',
//           icon: Lightbulb,
//           label: 'Insight'
//         };
//     }
//   };

//   const style = getStyle(data.type);
//   const Icon = style.icon;

//   // Fallback for content (check explanation OR description)
//   const content = data.explanation || data.description || "No description available.";

//   return (
//     <div className={`relative overflow-hidden rounded-3xl border-2 ${style.border} ${style.bg} p-6 transition-all duration-300 hover:shadow-lg group`}>
      
//       {/* Background Decor */}
//       <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white opacity-50 blur-2xl group-hover:scale-150 transition-transform duration-700" />

//       <div className="relative z-10">
//         {/* Header */}
//         <div className="flex items-start justify-between mb-4">
//            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${style.iconBg} w-fit`}>
//               <Icon size={14} className={style.iconColor} />
//               <span className={`text-[10px] font-bold uppercase tracking-wider ${style.iconColor}`}>
//                 {style.label}
//               </span>
//            </div>
//         </div>

//         {/* Content */}
//         <h4 className="text-xl font-heading font-bold text-gray-900 mb-2 leading-tight">
//           {data.title}
//         </h4>
        
//         <p className="text-gray-600 text-sm leading-relaxed mb-6">
//           {content}
//         </p>

//         {/* Action Footer */}
//         {data.dailyAction && (
//           <div className="mt-auto pt-4 border-t border-black/5">
//              <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400">
//                    <ArrowRight size={14} />
//                 </div>
//                 <div>
//                    <p className="text-[10px] font-bold uppercase text-gray-400">Daily Action</p>
//                    <p className="text-sm font-bold text-gray-800">{data.dailyAction}</p>
//                 </div>
//              </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


'use client';

import React from 'react';
import { 
  DominoInsight, 
  KitchenInsight, 
  PhysiologicalInsight, 
  FitnessInsight 
} from '../../lib/types/report-types';
import { Lightbulb, Zap, Utensils, Activity, ArrowRight } from 'lucide-react';

type Insight = DominoInsight | KitchenInsight | PhysiologicalInsight | FitnessInsight;

interface DisplayInsight {
  type: string;
  title: string;
  consequence?: string;
  impact?: string;
  explanation?: string;
  science?: string;
  description?: string;
  microFix?: string;
  protocol?: string;
  adjustment?: string;
  dailyAction?: string;
}

export const InsightCard = ({ insight }: { insight: Insight }) => {
  const data = insight as unknown as DisplayInsight;

  const getStyle = (type: string) => {
    switch (type) {
      case 'domino_effect':
        return { bg: 'bg-indigo-50', border: 'border-indigo-100', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-700', icon: Zap, label: 'Habit Domino' };
      case 'kitchen_hack':
        return { bg: 'bg-amber-50', border: 'border-amber-100', iconBg: 'bg-amber-100', iconColor: 'text-amber-700', icon: Utensils, label: 'Kitchen Lab' };
      case 'physiological_link':
        return { bg: 'bg-teal-50', border: 'border-teal-100', iconBg: 'bg-teal-100', iconColor: 'text-teal-700', icon: Activity, label: 'Body Science' };
      case 'fitness_protocol':
        return { bg: 'bg-rose-50', border: 'border-rose-100', iconBg: 'bg-rose-100', iconColor: 'text-rose-700', icon: Activity, label: 'Movement Strategy' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', iconBg: 'bg-white', iconColor: 'text-gray-700', icon: Lightbulb, label: 'Insight' };
    }
  };

  const style = getStyle(data.type);
  const Icon = style.icon;

  const content = data.consequence || data.impact || data.explanation || data.science || data.description || "No description available.";
  const actionText = data.microFix || data.protocol || data.adjustment || data.dailyAction;

  return (
    <div className={`relative overflow-hidden rounded-3xl border-2 ${style.border} ${style.bg} p-6 transition-all duration-300 hover:shadow-lg group flex flex-col h-full`}>
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white opacity-50 blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
           <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${style.iconBg} w-fit`}>
              <Icon size={14} className={style.iconColor} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${style.iconColor}`}>
                {style.label}
              </span>
           </div>
        </div>

        <h4 className="text-xl font-heading font-bold text-gray-900 mb-2 leading-tight">
          {data.title}
        </h4>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {content}
        </p>

        {actionText && (
          <div className="mt-auto pt-4 border-t border-black/5">
             <div className="flex items-start gap-3">
                <div className={`w-8 h-8 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm ${style.iconColor}`}>
                   <ArrowRight size={14} />
                </div>
                <div className="pt-0.5">
                   <p className="text-[10px] font-bold uppercase text-gray-400 mb-0.5">Daily Action</p>
                   {/* CHANGED: Removed font-bold text-gray-800, added font-medium and style.iconColor */}
                   <p className={`text-sm font-medium leading-tight ${style.iconColor}`}>{actionText}</p>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};