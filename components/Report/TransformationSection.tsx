// import React from 'react';
// import { TransformationReport } from '../../lib/types/report-types';
// import { ArchetypeCard } from './ArchetypeCard';
// import { InsightCard } from './InsightCard'; // The switch-case component we built
// import { Sparkles, Layers } from 'lucide-react';

// interface Props {
//   report: TransformationReport | null;
// }

// export const TransformationSection: React.FC<Props> = ({ report }) => {
//   // 1. Safety Guard
//   if (!report) {
//     return null;
//   }

//   return (
//     <section className="animate-fadeIn">
      
//       {/* A. Section Header */}
//       <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
//         <div className="bg-blue-600 p-2 rounded-lg text-white">
//           <Sparkles size={20} />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             Lifestyle Transformation Blueprint
//           </h2>
//           <p className="text-gray-500 text-sm">
//             Based on your metabolic archetype and daily habits
//           </p>
//         </div>
//       </div>

//       {/* B. The Hero Card (Archetype) */}
//       <div className="mb-12">
//         <ArchetypeCard data={report.archetype} />
//       </div>

//       {/* C. The Insight Grid (Strategic Adjustments) */}
//       <div>
//         <div className="flex items-center gap-2 mb-6">
//           <Layers className="text-gray-400" size={20} />
//           <h3 className="text-xl font-bold text-gray-800">
//             Strategic Micro-Adjustments
//           </h3>
//         </div>

//         {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {report.insights.map((insight) => (
//             <InsightCard key={insight.id} data={insight} />
//           ))}
//         </div>
//       </div>

//     </section>
//   );
// };





//=======================18/08/26 - Review 1 ==================================

// import React from 'react';
// import { TransformationReport } from '../../lib/types/report-types';
// import { ArchetypeCard } from './ArchetypeCard';
// import { InsightCard } from './InsightCard'; 
// import { Sparkles, Layers } from 'lucide-react';

// interface Props {
//   report: TransformationReport | null;
// }

// export const TransformationSection: React.FC<Props> = ({ report }) => {
//   if (!report) return null;

//   return (
//     <section className="animate-fadeIn">
      
//       {/* A. Section Header */}
//       <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
//         <div className="bg-blue-600 p-2 rounded-lg text-white">
//           <Sparkles size={20} />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             Lifestyle Transformation Blueprint
//           </h2>
//           <p className="text-gray-500 text-sm">
//             Based on your metabolic archetype and daily habits
//           </p>
//         </div>
//       </div>

//       {/* B. The Hero Card (Archetype) */}
//       <div className="mb-12">
//         {/* Ensure ArchetypeCard expects 'data' or change this too */}
//         <ArchetypeCard data={report.archetype} />
//       </div>

//       {/* C. The Insight Grid */}
//       <div>
//         <div className="flex items-center gap-2 mb-6">
//           <Layers className="text-gray-400" size={20} />
//           <h3 className="text-xl font-bold text-gray-800">
//             Strategic Micro-Adjustments
//           </h3>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {report.insights.map((insight) => (
//             /* FIX: Changed 'data={insight}' to 'insight={insight}' to match your component definition */
//             <InsightCard key={insight.id} insight={insight} />
//           ))}
//         </div>
//       </div>

//     </section>
//   );
// };
















//======================================================================================

// import React from 'react';
// import { TransformationReport } from '../../lib/types/report-types';
// import { ArchetypeCard } from './ArchetypeCard';
// import { InsightCard } from './InsightCard'; 

// interface Props {
//   report: TransformationReport | null;
// }

// export const TransformationSection: React.FC<Props> = ({ report }) => {
//   if (!report) return null;

//   return (
//     <section className="animate-fadeIn">
      
//       {/* A. Section Header */}
//       <div className="mb-10 border-b border-gray-200 pb-5">
//         <h2 className="text-4xl font-heading font-extrabold text-teal-900 tracking-tight mb-2">
//           Lifestyle Transformation Blueprint
//         </h2>
//         <p className="text-gray-500 text-base">
//           Based on your metabolic archetype and daily habits
//         </p>
//       </div>

//       {/* B. The Hero Card (Archetype) */}
//       <div className="mb-14">
//         <ArchetypeCard data={report.archetype} />
//       </div>

//       {/* C. The Insight Grid */}
//       <div>
//         {/* MATCHED STYLING: No icon, 3xl bold text, with matching gray subtitle */}
//         <div className="mb-8">
//           <h3 className="text-3xl font-heading font-bold text-gray-900 tracking-tight mb-1">
//             Strategic Micro-Adjustments
//           </h3>
//           <p className="text-gray-500 text-base">
//             High-impact daily actions based on your questionnaire
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {(report.insights || []).map((insight: any) => (
//             <InsightCard key={insight.id} insight={insight} />
//           ))}
//         </div>
//       </div>

//     </section>
//   );
// };











//======================5/10/26=========================

'use client';

import React from 'react';
import { TransformationReport } from '../../lib/types/report-types';
import { PhenotypeResult } from '../../lib/insights';
import { ArchetypeCard } from './ArchetypeCard';
import { InsightCard } from './InsightCard'; 

interface Props {
  report: TransformationReport | null;
  phenotype: PhenotypeResult | null; // Accept phenotype explicitly
}

export default function TransformationSection({ report, phenotype }: Props) {
  return (
    <div className="space-y-8 w-full">
       {/* 1. Render the Premium Blueprint Card */}
       {phenotype && <ArchetypeCard phenotype={phenotype} />}
       
       {/* 2. Render the Grid of Insights */}
       {report?.insights && report.insights.length > 0 && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {report.insights.map((insight: any) => (
             <InsightCard key={insight.id} insight={insight} />
           ))}
         </div>
       )}
    </div>
  );
}