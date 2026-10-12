// import React from 'react';
// import { Remedy } from '../../lib/remedy-engine';
// import { 
//   Coffee, 
//   Moon, 
//   Sun, 
//   Utensils, 
//   AlertTriangle,
//   Leaf 
// } from 'lucide-react';

// interface Props {
//   remedies: Remedy[];
// }

// export const RemedyView: React.FC<Props> = ({ remedies }) => {
  
//   const getIcon = (timing: string) => {
//     switch(timing) {
//       case 'Morning': return <Sun className="text-amber-500" />;
//       case 'Pre-Sleep': return <Moon className="text-indigo-500" />;
//       case 'With Meal': return <Utensils className="text-orange-500" />;
//       default: return <Coffee className="text-emerald-500" />;
//     }
//   };

//   return (
//     <div className="animate-fadeIn space-y-6">
//       <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-start gap-4">
//         <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
//            <Leaf size={24} />
//         </div>
//         <div>
//           <h3 className="text-lg font-bold text-emerald-900">Your Kitchen Pharmacy</h3>
//           <p className="text-emerald-800/80 text-sm leading-relaxed">
//             These natural remedies are curated based on your specific combination of conditions (e.g., Diabetes + Acidity). 
//             Always consult your doctor before starting new supplements.
//           </p>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         {remedies.map((item) => (
//           <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
//             {/* Tag Badge */}
//             <div className="absolute top-0 right-0 bg-gray-50 px-3 py-1 rounded-bl-xl border-b border-l border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
//               {item.tags[0]}
//             </div>

//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-gray-50 rounded-lg border border-gray-100">
//                 {getIcon(item.timing)}
//               </div>
//               <div>
//                 <span className="text-xs font-bold text-gray-400 uppercase">{item.timing} Protocol</span>
//                 <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
//               </div>
//             </div>

//             <div className="space-y-4">
//               {/* Ingredients */}
//               <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-50">
//                 <h4 className="text-xs font-bold text-blue-800 uppercase mb-2">You Need</h4>
//                 <ul className="space-y-1">
//                   {item.ingredients.map((ing, i) => (
//                     <li key={i} className="text-sm text-blue-900 font-medium flex items-center gap-2">
//                       <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
//                       {ing}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Instructions */}
//               <div>
//                 <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">How to Make</h4>
//                 <p className="text-sm text-gray-700 leading-relaxed">
//                   {item.preparation}
//                 </p>
//               </div>

//               {/* Benefits */}
//               <div className="pt-3 border-t border-gray-100">
//                  <p className="text-xs text-emerald-700 font-medium flex gap-2">
//                    <Leaf size={14} className="shrink-0" />
//                    {item.benefits}
//                  </p>
//               </div>

//               {/* Caution if exists */}
//               {item.caution && (
//                 <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg mt-2">
//                   <AlertTriangle size={14} className="shrink-0 mt-0.5" />
//                   {item.caution}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


//-------------------4/10/26--------------------

import React from 'react';
import { Remedy } from '../../lib/remedy-engine';
import { 
  Coffee, 
  Moon, 
  Sun, 
  Utensils, 
  AlertTriangle,
  CheckCircle2 
} from 'lucide-react';

interface Props {
  remedies: Remedy[];
}

export const RemedyView: React.FC<Props> = ({ remedies }) => {
  
  // Icon and Color Mapping for timings
  const getIcon = (timing: string) => {
    switch(timing) {
      case 'Morning': return <Sun size={20} className="text-amber-600" />;
      case 'Pre-Sleep': return <Moon size={20} className="text-indigo-600" />;
      case 'With Meal': return <Utensils size={20} className="text-orange-600" />;
      default: return <Coffee size={20} className="text-emerald-600" />;
    }
  };

  const getIconBg = (timing: string) => {
    switch(timing) {
      case 'Morning': return 'bg-amber-100';
      case 'Pre-Sleep': return 'bg-indigo-100';
      case 'With Meal': return 'bg-orange-100';
      default: return 'bg-emerald-100';
    }
  };

  return (
    <div className="animate-fadeIn">
      
      {/* 1. SECTION HEADER (Perfect match with Analysis & Movement tabs) */}
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h2 className="text-4xl font-heading font-extrabold text-teal-900 tracking-tight mb-2">
          Natural Remedies
        </h2>
        <p className="text-gray-500 text-base">
          Simple, food-based protocols curated for your specific health goals
        </p>
      </div>

      {/* 2. MEDICAL DISCLAIMER */}
      <div className="mb-10 bg-amber-50/70 border border-amber-100 rounded-2xl p-5 md:p-6 flex gap-3 md:gap-4 items-start shadow-sm">
         <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={22} />
         <p className="text-amber-800 text-sm md:text-base font-medium leading-relaxed">
           These kitchen remedies are based on your clinical profile. Always consult your doctor before starting any new daily routine, especially if you are on medication.
         </p>
      </div>

      {/* 3. REMEDIES GRID */}
      <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
        {remedies.map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            
            {/* Card Header & Tag */}
            <div className="flex justify-between items-start mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${getIconBg(item.timing)}`}>
                  {getIcon(item.timing)}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    {item.timing}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{item.title}</h3>
                </div>
              </div>
              <span className="shrink-0 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-lg">
                {item.tags[0]}
              </span>
            </div>

            {/* Content Block */}
            <div className="space-y-6 flex-grow">
              
              {/* Ingredients */}
              <div className="bg-slate-50/70 border border-slate-100 p-5 md:p-6 rounded-2xl">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">You Need</h4>
                <ul className="space-y-2.5">
                  {item.ingredients.map((ing, i) => (
                    <li key={i} className="text-sm text-slate-700 font-semibold flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0"></span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="px-1">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">How to Make It</h4>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  {item.preparation}
                </p>
              </div>
            </div>

            {/* Footer (Benefits & Caution) */}
            <div className="pt-6 mt-6 border-t border-gray-100 space-y-3">
               <p className="text-sm text-emerald-700 font-semibold flex gap-3 items-start leading-snug">
                 <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                 <span>{item.benefits}</span>
               </p>

               {item.caution && (
                 <div className="flex items-start gap-3 text-xs text-rose-700 bg-rose-50 border border-rose-100 p-4 rounded-xl mt-4 font-semibold leading-relaxed">
                   <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                   <span>{item.caution}</span>
                 </div>
               )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};