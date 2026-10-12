import React from 'react';
import { PhenotypeResult } from '../lib/insights';
import { Icons } from './Icons';

interface Props {
  phenotype: PhenotypeResult;
}

export default function PhenotypeCard({ phenotype }: Props) {
  const borderColor = 
    phenotype.color === 'red' ? 'border-red-400' : 
    phenotype.color === 'orange' ? 'border-orange-400' : 
    phenotype.color === 'blue' ? 'border-blue-400' : 'border-green-400';

  return (
    <div className={`col-span-1 lg:col-span-1 bg-white p-8 rounded-3xl shadow-xl border-t-8 ${borderColor}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icons.Brain />
        <span className="font-bold text-slate-500 uppercase tracking-wider text-xs">Lifestyle Analysis</span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{phenotype.type}</h3>
      <p className="text-slate-600 mb-6 leading-relaxed text-sm">{phenotype.description}</p>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
        <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Key Adjustment</span>
        <span className="font-semibold text-slate-800 text-sm">{phenotype.strategy}</span>
      </div>
    </div>
  );
}