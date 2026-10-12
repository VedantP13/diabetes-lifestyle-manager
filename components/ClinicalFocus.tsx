import React from 'react';
import { Icons } from './Icons';

interface Props {
  conditions: string[];
}

export default function ClinicalFocus({ conditions }: Props) {
  return (
    <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-md h-full">
      <h4 className="font-bold mb-3 flex items-center gap-2">
        <Icons.Info /> Wellness Goals
      </h4>
      <ul className="space-y-2 text-sm text-slate-200">
        {conditions.length > 0 ? conditions.map(c => (
          <li key={c} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> 
            {c === 'Diabetic' ? 'Blood Sugar Control' : 
             c === 'High BP' ? 'Blood Pressure Management' : 
             c === 'High Cholesterol' ? 'Heart Health' : c}
          </li>
        )) : (
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Preventive Health
          </li>
        )}
      </ul>
    </div>
  );
}