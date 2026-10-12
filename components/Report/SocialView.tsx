
//=======================18/08/26 - Review 1 ==================================

// import React from 'react';
// import { SocialProtocol } from '../../lib/social-engine';
// import { 
//   UtensilsCrossed, 
//   ThumbsUp, 
//   ThumbsDown, 
//   RefreshCw, 
//   Martini, 
//   Briefcase 
// } from 'lucide-react';

// interface Props {
//   protocol: SocialProtocol;
// }

// export const SocialView: React.FC<Props> = ({ protocol }) => {
//   const { restaurant, alcoholStrategy, travelHack } = protocol;

//   return (
//     <div className="space-y-6 animate-fadeIn">
      
//       {/* 1. THE RESTAURANT DECODER */}
//       <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
//         <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
//           <div>
//              <h3 className="text-sm font-bold opacity-70 uppercase tracking-widest mb-1">Dining Out Guide</h3>
//              <h2 className="text-2xl font-bold">{restaurant.cuisineName}</h2>
//           </div>
//           <UtensilsCrossed className="text-slate-600" size={40} />
//         </div>

//         <div className="grid md:grid-cols-2">
//           {/* Green List */}
//           <div className="p-6 bg-emerald-50/30 border-b md:border-b-0 md:border-r border-gray-100">
//             <div className="flex items-center gap-2 mb-4 text-emerald-700">
//               <ThumbsUp size={20} />
//               <h4 className="font-bold uppercase tracking-wide text-sm">Order This</h4>
//             </div>
//             <ul className="space-y-3">
//               {restaurant.greenList.map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
//                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Red List */}
//           <div className="p-6 bg-rose-50/30">
//             <div className="flex items-center gap-2 mb-4 text-rose-700">
//               <ThumbsDown size={20} />
//               <h4 className="font-bold uppercase tracking-wide text-sm">Avoid This</h4>
//             </div>
//             <ul className="space-y-3">
//               {restaurant.redList.map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
//                   <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* The Smart Swap Footer */}
//         <div className="bg-blue-50 p-4 flex items-start gap-3 border-t border-blue-100">
//            <RefreshCw className="text-blue-600 shrink-0 mt-1" size={20} />
//            <div>
//              <span className="block text-xs font-bold text-blue-500 uppercase mb-1">Pro Tip</span>
//              <p className="text-sm text-blue-900 font-medium">{restaurant.smartSwap}</p>
//            </div>
//         </div>
//       </div>

//       {/* 2. PARTY & TRAVEL CARDS */}
//       <div className="grid md:grid-cols-2 gap-6">
        
//         {/* Alcohol / Social Drink */}
//         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
//            <div className="flex items-center gap-3 mb-4 text-purple-600">
//              <div className="p-2 bg-purple-50 rounded-lg">
//                <Martini size={24} />
//              </div>
//              <h3 className="font-bold text-gray-900">Social Protocol</h3>
//            </div>
//            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
//              {alcoholStrategy}
//            </p>
//         </div>

//         {/* Work / Travel Hack */}
//         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
//            <div className="flex items-center gap-3 mb-4 text-amber-600">
//              <div className="p-2 bg-amber-50 rounded-lg">
//                <Briefcase size={24} />
//              </div>
//              <h3 className="font-bold text-gray-900">Work & Travel</h3>
//            </div>
//            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
//              {travelHack}
//            </p>
//         </div>

//       </div>

//     </div>
//   );
// };










//======================= before 11/10/26 ==================================

// import React from 'react';
// import { SocialProtocol } from '../../lib/social-engine';
// import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

// interface Props {
//   protocol: SocialProtocol;
// }

// export const SocialView: React.FC<Props> = ({ protocol }) => {
//   const { restaurant, alcoholStrategy, travelHack } = protocol;

//   return (
//     <div className="animate-fadeIn">
      
//       {/* 1. SECTION HEADER (Perfectly matched with previous tabs) */}
//       <div className="mb-10 border-b border-gray-200 pb-5">
//         <h2 className="text-4xl font-heading font-extrabold text-teal-900 tracking-tight mb-2">
//           Social & Travel Guide
//         </h2>
//         <p className="text-gray-500 text-base">
//           Smart strategies to protect your metabolism while enjoying life
//         </p>
//       </div>

//       {/* 2. THE DINING OUT GUIDE */}
//       <div className="mb-12">
//         {/* Clean Subheader - NO ICON */}
//         <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
//           Dining Out: {restaurant.cuisineName}
//         </h3>
        
//         <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
//           <div className="grid md:grid-cols-2">
            
//             {/* Safe List (Left) */}
//             <div className="p-6 md:p-8 bg-emerald-50/50 border-b md:border-b-0 md:border-r border-gray-100">
//               <div className="mb-5">
//                 <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-100 border border-emerald-200">
//                   Safe Choices (Order This)
//                 </span>
//               </div>
//               <ul className="space-y-4">
//                 {restaurant.greenList.map((item, i) => (
//                   <li key={i} className="flex items-start gap-3 text-gray-700 font-medium leading-relaxed">
//                     <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Trigger List (Right) */}
//             <div className="p-6 md:p-8 bg-rose-50/50">
//               <div className="mb-5">
//                 <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-100 border border-rose-200">
//                   Spike Triggers (Avoid This)
//                 </span>
//               </div>
//               <ul className="space-y-4">
//                 {restaurant.redList.map((item, i) => (
//                   <li key={i} className="flex items-start gap-3 text-gray-700 font-medium leading-relaxed">
//                     <XCircle className="text-rose-500 shrink-0 mt-0.5" size={18} />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* The Smart Swap Footer */}
//           <div className="bg-blue-50/50 p-6 md:p-8 flex items-start gap-4 border-t border-blue-100">
//              <div className="p-2 bg-blue-100 rounded-full shrink-0">
//                <Lightbulb className="text-blue-600" size={20} />
//              </div>
//              <div>
//                <h4 className="text-sm font-bold text-blue-900 mb-1">Smart Strategy</h4>
//                <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
//                  {restaurant.smartSwap}
//                </p>
//              </div>
//           </div>
//         </div>
//       </div>

//       {/* 3. LIFESTYLE CARDS (Side-by-side grid, consistent styling) */}
//       <div className="grid lg:grid-cols-2 gap-10">
        
//         {/* Social / Events */}
//         <div>
//            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
//              Social Events & Parties
//            </h3>
//            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
//               <p className="text-gray-600 text-base leading-relaxed font-medium">
//                 {alcoholStrategy}
//               </p>
//            </div>
//         </div>

//         {/* Work / Travel */}
//         <div>
//            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6 tracking-tight">
//              Work & Travel Hacks
//            </h3>
//            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 h-full">
//               <p className="text-gray-600 text-base leading-relaxed font-medium">
//                 {travelHack}
//               </p>
//            </div>
//         </div>

//       </div>

//     </div>
//   );
// };


































//======================= 11/10/26 ==================================

'use client';

import React from 'react';
import { SocialProtocol } from '../../lib/social-engine';
import { 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  ShieldCheck, 
  ChatCircleText, 
  Timer, 
  Drop,
  Carrot,
  AirplaneTilt,
  Wine
} from '@phosphor-icons/react';

interface Props {
  protocol: SocialProtocol;
}

export const SocialView: React.FC<Props> = ({ protocol }) => {
  const { restaurant, alcoholStrategy, travelHack } = protocol;

  return (
    <div className="animate-fadeIn pb-12 w-full">
      
      {/* 1. SECTION HEADER */}
      <div className="mb-10 border-b border-slate-100 pb-5">
        <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight mb-2">
          Social & Travel Tips
        </h2>
        <p className="text-slate-500 font-medium text-base">
          Simple ways to stay healthy while enjoying your life.
        </p>
      </div>

      {/* 2. ENHANCED PRE-OUTING PREP CARD (From Previous Step) */}
      <div className="mb-10 bg-white rounded-[32px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50/80 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 shadow-sm">
              <ShieldCheck size={26} weight="duotone" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1.5">
                Before You Go Out
              </h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-lg">
                Having a quick snack 30 minutes before eating out helps keep your blood sugar stable. Try to do this before leaving the house:
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-2 sm:ml-16">
            <div className="group flex items-center gap-3.5 p-4 rounded-[20px] bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-sm transition-all">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                <Drop size={16} weight="fill" />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Drink 1 glass of water with 1 tbsp Apple Cider Vinegar
              </span>
            </div>

            <div className="group flex items-center gap-3.5 p-4 rounded-[20px] bg-slate-50 hover:bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-sm transition-all">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                <Carrot size={16} weight="fill" />
              </div>
              <span className="text-sm font-semibold text-slate-700">
                Eat a quick protein snack (like an egg) or raw cucumber
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. THE DINING OUT GUIDE */}
      <div className="mb-12">
        <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
          Eating Out: {restaurant.cuisineName}
        </h3>
        
        <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="grid md:grid-cols-2">
            
            {/* Safe List */}
            <div className="p-6 md:p-8 bg-emerald-50/30 border-b md:border-b-0 md:border-r border-slate-100">
              <div className="mb-5">
                <span className="inline-block px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/50 border border-emerald-200/50 shadow-sm">
                  Enjoy These (Safe)
                </span>
              </div>
              <ul className="space-y-4">
                {restaurant.greenList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
                    <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={20} weight="fill" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trigger List */}
            <div className="p-6 md:p-8 bg-rose-50/30">
              <div className="mb-5">
                <span className="inline-block px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100/50 border border-rose-200/50 shadow-sm">
                  Skip These (Triggers)
                </span>
              </div>
              <ul className="space-y-4">
                {restaurant.redList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
                    <XCircle className="text-rose-400 shrink-0 mt-0.5" size={20} weight="fill" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Smart Swap Footer */}
          <div className="bg-slate-900 p-6 md:p-8 flex items-start gap-4">
             <div className="p-2.5 bg-slate-800 rounded-2xl shrink-0 border border-slate-700 shadow-inner">
               <Lightbulb className="text-amber-400" size={22} weight="duotone" />
             </div>
             <div>
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pro Tip</h4>
               <p className="text-sm md:text-base text-white font-medium leading-relaxed">
                 {restaurant.smartSwap}
               </p>
             </div>
          </div>
        </div>
      </div>

      {/* 4. RECOVERY TIMELINE (Simplified) */}
      <div className="mb-12">
        <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
          Quick Recovery Steps
        </h3>
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <p className="text-slate-500 font-medium mb-8 text-sm md:text-base">
            If you ate a bit more than planned, don't worry. Follow these quick steps to help your body balance your blood sugar.
          </p>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-100 before:via-slate-200 before:to-slate-100">
            
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-50 text-indigo-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                <Timer size={18} weight="bold" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 hover:bg-indigo-50/30 p-5 rounded-[24px] border border-slate-100 transition-colors">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1.5 block">Within 30 Mins</span>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">Take a 10-15 minute walk to help your muscles use up the extra sugar.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-50 text-blue-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                <Drop size={18} weight="bold" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 hover:bg-blue-50/30 p-5 rounded-[24px] border border-slate-100 transition-colors">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1.5 block">Before Sleep</span>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">Drink a large glass of water before bed to stay hydrated and flush out extra sugar.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 5. LIFESTYLE CARDS */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Say No Politely */}
        <div>
           <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
             How to Say No to Food
           </h3>
           <div className="bg-amber-50/50 p-6 md:p-8 rounded-[32px] shadow-sm border border-amber-100 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <ChatCircleText size={20} weight="fill" />
                </div>
                <span className="text-sm font-bold text-amber-900">Easy ways to decline food politely.</span>
              </div>
              <div className="space-y-4 flex-grow">
                <div className="bg-white p-5 rounded-[20px] border border-amber-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative">
                  <div className="absolute left-6 -top-2 w-4 h-4 bg-white border-t border-l border-amber-100 rotate-45"></div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">For The Persistent Host</span>
                  <p className="text-sm text-slate-800 font-medium leading-relaxed">"Everything looks incredible! I’m saving space for dinner, but I’d love to take a small piece home for later."</p>
                </div>
                <div className="bg-white p-5 rounded-[20px] border border-amber-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative">
                  <div className="absolute left-6 -top-2 w-4 h-4 bg-white border-t border-l border-amber-100 rotate-45"></div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">For The Office Party</span>
                  <p className="text-sm text-slate-800 font-medium leading-relaxed">"I actually just had a heavy meal before coming in, but I’m going to grab a coffee and join you guys!"</p>
                </div>
              </div>
           </div>
        </div>

        {/* Work / Travel Tips */}
        <div>
           <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6 tracking-tight">
             Travel & Drink Tips
           </h3>
           <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-full flex flex-col">
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                  <AirplaneTilt size={20} weight="fill" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">On The Go</h4>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed">
                    {travelHack}
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100 my-2"></div>
              
              <div className="flex items-start gap-4 mt-6">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                  <Wine size={20} weight="fill" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Drinks</h4>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed">
                    {alcoholStrategy}
                  </p>
                </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};