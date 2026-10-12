//=======================18/08/26 - Review 1 ==================================


// import React from 'react';
// import { AuditItem } from '../lib/insights';
// import { Icons } from './Icons';

// interface Props {
//   audit: AuditItem[];
// }

// export default function HabitAudit({ audit }: Props) {
//   return (
//     <div className="grid sm:grid-cols-2 gap-4">
//       {audit.map((item, idx) => (
//         <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
//           <div>
//             <div className="flex justify-between items-start mb-2">
//               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
//               {item.status === 'Good' ? <Icons.Check /> : <Icons.Alert />}
//             </div>
//             <h4 className="font-bold text-slate-800 mb-1">{item.message}</h4>
//           </div>
//           {item.fix && (
//             <div className="mt-4 text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100 font-medium">
//               Suggestion: {item.fix}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


import React from 'react';
import { AuditItem } from '../lib/insights';
import { CheckCircle2, AlertTriangle, AlertCircle, Lightbulb } from 'lucide-react';

interface Props {
  audit: AuditItem[];
}

export default function HabitAudit({ audit }: Props) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {audit.map((item, idx) => {
        const isGood = item.status === 'Good';
        const isCritical = item.status === 'Critical';

        // Strict Brand Color Theme
        const theme = {
          bg: isGood ? 'bg-emerald-50/50' : (isCritical ? 'bg-rose-50/50' : 'bg-amber-50/50'),
          border: isGood ? 'border-emerald-100' : (isCritical ? 'border-rose-100' : 'border-amber-100'),
          text: isGood ? 'text-emerald-700' : (isCritical ? 'text-rose-700' : 'text-amber-700'),
          icon: isGood ? CheckCircle2 : (isCritical ? AlertTriangle : AlertCircle)
        };

        const Icon = theme.icon;

        return (
          <div key={idx} className={`p-6 rounded-3xl shadow-sm border ${theme.bg} ${theme.border} flex flex-col justify-between transition-all hover:shadow-md`}>
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${theme.text} bg-white px-3 py-1 rounded-full shadow-sm`}>
                  {item.category}
                </span>
                <Icon className={theme.text} size={20} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{item.message}</h4>
            </div>
            
            {item.fix && (
              <div className="mt-4 pt-4 border-t border-black/5">
                 {/* Fully color-matched, vertically centered Lightbulb suggestion */}
                 <p className={`text-sm font-semibold ${theme.text} flex items-center gap-2`}>
                   <Lightbulb size={18} className="shrink-0" />
                   <span>{item.fix}</span>
                 </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}