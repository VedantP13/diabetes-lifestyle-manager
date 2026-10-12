//before UI

// import React, { useState } from 'react';
// import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, FileText } from 'lucide-react';

// // --- Types ---
// interface Question {
//   id: string;
//   label: string;
//   // UPDATE: Add 'file' to this list
//   type: 'text' | 'textarea' | 'select' | 'radio' | 'number' | 'time' | 'file'; 
//   inputType?: 'text' | 'number'; 
//   options?: string[];
//   required?: boolean;
//   placeholder?: string;
//   dependsOn?: {
//     id: string;
//     values: (string | number | boolean)[];
//   };
// }

// interface Section {
//   id: string;
//   title: string;
//   description?: string;
//   dependsOn?: {
//     id: string;
//     values: (string | number | boolean)[];
//   };
//   questions: Question[];
// }

// interface QuestionnaireProps {
//   data: Section[];
//   onComplete: (answers: Record<string, any>) => void;
// }

// const Questionnaire: React.FC<QuestionnaireProps> = ({ data, onComplete }) => {
//   const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, any>>({});
//   const [error, setError] = useState<string | null>(null);
  
//   const currentSection = data[currentSectionIndex];
//   const isLastSection = currentSectionIndex === data.length - 1;

//   // --- Helper: Check Visibility (Section & Question) ---
//   const isDependentVisible = (dependency?: { id: string; values: any[] }) => {
//     if (!dependency) return true;
//     const dependencyAnswer = answers[dependency.id];
//     return dependency.values.includes(dependencyAnswer);
//   };

//   // Check if the *entire section* should be visible (e.g., Female Health)
//   // If not, we skip it automatically in the UI logic below
  
//   const isQuestionVisible = (question: Question) => {
//     return isDependentVisible(question.dependsOn);
//   };

//   // --- Validation Logic ---
//   const validateSection = () => {
//     const visibleQuestions = currentSection.questions.filter(isQuestionVisible);
    
//     const missingFields = visibleQuestions.filter((q) => {
//       if (!q.required) return false;
//       const value = answers[q.id];
//       // Check for empty string, null, or undefined (allow 0 for numbers)
//       return value === undefined || value === null || value === '';
//     });

//     if (missingFields.length > 0) {
//       setError(`Please complete: ${missingFields.map(q => q.label).join(', ')}`);
//       return false;
//     }
//     return true;
//   };

//   const handleInputChange = (questionId: string, value: any) => {
//     if (error) setError(null);
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: value,
//     }));
//   };

//   // --- Navigation Logic ---
//   // We need to skip hidden sections when clicking Next/Back
//   const getNextValidSectionIndex = (currentIndex: number, direction: 'next' | 'back') => {
//     let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
//     // Loop until we find a visible section or hit the bounds
//     while (nextIndex >= 0 && nextIndex < data.length) {
//       const section = data[nextIndex];
//       if (isDependentVisible(section.dependsOn)) {
//         return nextIndex;
//       }
//       nextIndex = direction === 'next' ? nextIndex + 1 : nextIndex - 1;
//     }
//     return nextIndex; // Returns out-of-bounds if none found (handled in caller)
//   };

//   const handleNext = () => {
//     if (validateSection()) {
//       const nextIndex = getNextValidSectionIndex(currentSectionIndex, 'next');
//       if (nextIndex < data.length) {
//         setCurrentSectionIndex(nextIndex);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       } else {
//         // If nextIndex is out of bounds, we are effectively at the end
//         // But usually, the "Submit" button handles the final step.
//       }
//     }
//   };

//   const handleBack = () => {
//     setError(null);
//     const prevIndex = getNextValidSectionIndex(currentSectionIndex, 'back');
//     if (prevIndex >= 0) {
//       setCurrentSectionIndex(prevIndex);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleSubmit = () => {
//     if (validateSection()) {
//       onComplete(answers);
//     }
//   };

//   // Filter visible questions for rendering
//   const visibleQuestions = currentSection.questions.filter(isQuestionVisible);

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      
//       {/* 1. Header & Progress Stepper */}
//       <div className="bg-gray-50 border-b border-gray-200 p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">Application Questionnaire</h2>
        
//         <div className="flex items-center justify-between relative mb-12 px-6 md:px-20">
//             <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
//             <div 
//                 className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-600 transition-all duration-300 z-0"
//                 style={{ width: `${(currentSectionIndex / (data.length - 1)) * 100}%` }}
//             ></div>

//             {data.map((section, index) => {
//               // Only render step dots for VISIBLE sections to avoid confusing the user
//               // However, simpler approach for stepper is just showing all, or we accept a slight visual mismatch for skipped sections.
//               // For robustness, let's just show all for now.
              
//               const isActive = index === currentSectionIndex;
//               const isCompleted = index < currentSectionIndex;

//               return (
//                 <div 
//                   key={section.id} 
//                   className="relative z-10 flex flex-col items-center group cursor-pointer" 
//                   // Disable clicking ahead, only allow back or current
//                   onClick={() => {
//                      if(index < currentSectionIndex && isDependentVisible(section.dependsOn)) {
//                          setCurrentSectionIndex(index);
//                      }
//                   }}
//                 >
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200 
//                     ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 
//                       isCompleted ? 'bg-green-500 text-white' : 'bg-white text-gray-500 border-2 border-gray-300'}`}>
//                     {isCompleted ? <CheckCircle size={16} /> : index + 1}
//                   </div>
                  
//                   <span className={`hidden md:block absolute top-10 text-xs font-medium text-center w-32 left-1/2 transform -translate-x-1/2 
//                     ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
//                     {/* Truncate long titles for stepper */}
//                     {section.title.length > 15 ? section.title.substring(0, 12) + '...' : section.title}
//                   </span>
//                 </div>
//               );
//             })}
//         </div>
//       </div>

//       {/* 2. Section Content */}
//       <div className="p-8 min-h-[400px]">
//         <div className="mb-6 border-b border-gray-100 pb-4">
//             <h3 className="text-xl font-bold text-gray-900">{currentSection.title}</h3>
//             {currentSection.description && (
//                 <p className="text-gray-500 mt-1 text-sm">{currentSection.description}</p>
//             )}
//         </div>

//         <div className="space-y-6">
//             {visibleQuestions.map((q) => (
//                 <div key={q.id} className="flex flex-col space-y-2 animate-fadeIn">
//                     <label className="text-sm font-medium text-gray-700">
//                         {q.label} {q.required && <span className="text-red-500">*</span>}
//                     </label>

//                     {/* RENDER LOGIC FOR DIFFERENT INPUT TYPES */}
                    
//                     {q.type === 'text' && (
//                         <input
//                             type={q.inputType || 'text'}
//                             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all w-full"
//                             value={answers[q.id] || ''}
//                             onChange={(e) => handleInputChange(q.id, e.target.value)}
//                             placeholder={q.placeholder || "Type here..."}
//                         />
//                     )}

//                     {/* NEW: Handle Number Type */}
//                     {q.type === 'number' && (
//                         <input
//                             type="number"
//                             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all w-full"
//                             value={answers[q.id] || ''}
//                             onChange={(e) => handleInputChange(q.id, e.target.value)}
//                             placeholder={q.placeholder || "0"}
//                         />
//                     )}

//                     {q.type === 'textarea' && (
//                         <textarea
//                             rows={3}
//                             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all w-full"
//                             value={answers[q.id] || ''}
//                             onChange={(e) => handleInputChange(q.id, e.target.value)}
//                             placeholder={q.placeholder || "Type here..."}
//                         />
//                     )}

//                     {q.type === 'select' && (
//                         <select
//                             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white w-full"
//                             value={answers[q.id] || ''}
//                             onChange={(e) => handleInputChange(q.id, e.target.value)}
//                         >
//                             <option value="" disabled>Select an option</option>
//                             {q.options?.map((opt) => (
//                                 <option key={opt} value={opt}>{opt}</option>
//                             ))}
//                         </select>
//                     )}
                    
//                     {q.type === 'radio' && (
//                         <div className="flex flex-wrap gap-3">
//                             {q.options?.map((opt) => (
//                                 <label key={opt} className={`flex items-center space-x-2 cursor-pointer px-4 py-2 border rounded-lg transition-colors
//                                     ${answers[q.id] === opt ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200' : 'border-gray-200 hover:bg-gray-50'}`}>
//                                     <input
//                                         type="radio"
//                                         name={q.id}
//                                         value={opt}
//                                         checked={answers[q.id] === opt}
//                                         onChange={(e) => handleInputChange(q.id, e.target.value)}
//                                         className="text-blue-600 focus:ring-blue-500 h-4 w-4"
//                                     />
//                                     <span className="text-gray-700 text-sm">{opt}</span>
//                                 </label>
//                             ))}
//                         </div>
//                     )}

//                     {/* NEW: Collapsible iOS-Style Time Picker */}
//                     {q.type === 'time' && (
//                         <div>
//                             {(() => {
//                                 const val = answers[q.id] || "10:00 PM";
//                                 const [timePart, period] = val.includes(' ') ? val.split(' ') : ["10:00", "PM"];
//                                 const [hour, minute] = timePart.split(':');
                                
//                                 // We use a unique ID for the toggle state of this specific question
//                                 const isOpen = (answers[`${q.id}_open`] === true);

//                                 const togglePicker = () => {
//                                     handleInputChange(`${q.id}_open`, !isOpen);
//                                 };

//                                 const updateTime = (newHour: string, newMinute: string, newPeriod: string) => {
//                                     handleInputChange(q.id, `${newHour}:${newMinute} ${newPeriod}`);
//                                 };

//                                 return (
//                                     <div className="relative">
//                                         {/* 1. Input Trigger Box */}
//                                         <div 
//                                             onClick={togglePicker}
//                                             className={`w-full px-4 py-3 border rounded-lg cursor-pointer flex justify-between items-center transition-all
//                                                 ${isOpen ? 'ring-2 ring-blue-500 border-blue-500 bg-white' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
//                                         >
//                                             <span className="text-gray-800 font-medium tracking-wide text-lg">
//                                                 {val}
//                                             </span>
//                                             <span className="text-gray-400 text-xs">▼</span>
//                                         </div>

//                                         {/* 2. Expandable Scroll Picker */}
//                                         {isOpen && (
//                                             <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-4 animate-fadeIn z-20 relative">
//                                                 <div className="flex justify-center items-center gap-4 text-gray-800">
                                                    
//                                                     {/* Hours */}
//                                                     <div className="flex flex-col items-center">
//                                                         <span className="text-xs text-gray-400 mb-2">HR</span>
//                                                         <div className="h-32 overflow-y-auto w-12 text-center no-scrollbar snap-y snap-mandatory border-y border-gray-100">
//                                                             {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => {
//                                                                 const hStr = h.toString();
//                                                                 const isSelected = hStr === hour;
//                                                                 return (
//                                                                     <div 
//                                                                         key={h} 
//                                                                         onClick={() => updateTime(hStr, minute, period)}
//                                                                         className={`py-2 snap-center cursor-pointer transition-colors ${isSelected ? 'text-blue-600 font-bold text-xl' : 'text-gray-300 text-sm'}`}
//                                                                     >
//                                                                         {h}
//                                                                     </div>
//                                                                 );
//                                                             })}
//                                                         </div>
//                                                     </div>

//                                                     <span className="text-xl font-bold text-gray-300 pb-4">:</span>

//                                                     {/* Minutes */}
//                                                     <div className="flex flex-col items-center">
//                                                         <span className="text-xs text-gray-400 mb-2">MIN</span>
//                                                         <div className="h-32 overflow-y-auto w-12 text-center no-scrollbar snap-y snap-mandatory border-y border-gray-100">
//                                                             {['00', '15', '30', '45'].map((m) => {
//                                                                 const isSelected = m === minute;
//                                                                 return (
//                                                                     <div 
//                                                                         key={m} 
//                                                                         onClick={() => updateTime(hour, m, period)}
//                                                                         className={`py-2 snap-center cursor-pointer transition-colors ${isSelected ? 'text-blue-600 font-bold text-xl' : 'text-gray-300 text-sm'}`}
//                                                                     >
//                                                                         {m}
//                                                                     </div>
//                                                                 );
//                                                             })}
//                                                         </div>
//                                                     </div>

//                                                     {/* AM/PM */}
//                                                     <div className="flex flex-col gap-2 ml-2">
//                                                         {['AM', 'PM'].map((p) => (
//                                                             <button
//                                                                 key={p}
//                                                                 onClick={() => updateTime(hour, minute, p)}
//                                                                 className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${period === p ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
//                                                             >
//                                                                 {p}
//                                                             </button>
//                                                         ))}
//                                                     </div>
//                                                 </div>
                                                
//                                                 {/* Done Button */}
//                                                 <button 
//                                                     onClick={togglePicker}
//                                                     className="w-full mt-4 py-2 bg-gray-50 text-blue-600 font-bold text-sm rounded-lg hover:bg-gray-100 transition-colors"
//                                                 >
//                                                     Done
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 );
//                             })()}
//                         </div>
//                     )}

//                     {/* NEW: File Upload with Preview */}
//                     {q.type === 'file' && (
//                         <div className="mt-2">
//                             <label className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-50 transition-colors">
//                                 <FileText size={24} className="text-blue-500 mb-2" />
//                                 <span className="mt-2 text-base leading-normal text-gray-600">
//                                     {answers[q.id] ? "Change File" : "Select Report Photo"}
//                                 </span>
//                                 <input 
//                                     type='file' 
//                                     className="hidden" 
//                                     accept="image/*" // Restrict to images for easier preview
//                                     onChange={(e) => {
//                                         if (e.target.files && e.target.files[0]) {
//                                             const file = e.target.files[0];
//                                             // Save the file object
//                                             handleInputChange(q.id, file);
                                            
//                                             // Create a preview URL
//                                             const reader = new FileReader();
//                                             reader.onloadend = () => {
//                                                 handleInputChange(`${q.id}_preview`, reader.result);
//                                             };
//                                             reader.readAsDataURL(file);
//                                         }
//                                     }}
//                                 />
//                             </label>

//                             {/* PREVIEW AREA */}
//                             {answers[`${q.id}_preview`] && (
//                                 <div className="mt-4 relative bg-gray-100 p-2 rounded-lg border border-gray-200">
//                                     <p className="text-xs text-gray-500 mb-2 text-center">Preview (Make sure text is clear)</p>
//                                     <img 
//                                         src={answers[`${q.id}_preview`]} 
//                                         alt="Report Preview" 
//                                         className="max-h-64 mx-auto rounded-md object-contain"
//                                     />
//                                     <p className="text-xs text-green-600 mt-2 text-center font-semibold">
//                                         {answers[q.id].name}
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//       </div>

//       {/* 3. Footer */}
//       <div className="bg-gray-50 px-8 py-5 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
//         <div className="flex-1 order-2 md:order-1 w-full">
//           {error && (
//             <div className="flex items-center text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg border border-red-100 animate-pulse">
//               <AlertCircle size={16} className="mr-2 flex-shrink-0" />
//               {error}
//             </div>
//           )}
//         </div>

//         <div className="flex space-x-4 order-1 md:order-2 w-full md:w-auto justify-end">
//             <button
//                 onClick={handleBack}
//                 disabled={currentSectionIndex === 0}
//                 className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors
//                     ${currentSectionIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200'}`}
//             >
//                 <ChevronLeft size={16} className="mr-2" /> Back
//             </button>

//             {isLastSection ? (
//                 <button onClick={handleSubmit} className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 shadow-sm active:scale-95">
//                     Generate Report <FileText size={16} className="ml-2" />
//                 </button>
//             ) : (
//                 <button onClick={handleNext} className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm active:scale-95">
//                     Next Step <ChevronRight size={16} className="ml-2" />
//                 </button>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Questionnaire;





//==============================Working=====================================



// 'use client';

// import React, { useState, useRef } from 'react';
// import { ChevronRight, ChevronLeft, CheckCircle2, AlertCircle, FileText, UploadCloud, Clock, Info } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// // --- Types ---
// interface Question {
//   id: string;
//   label: string;
//   type: 'text' | 'textarea' | 'select' | 'radio' | 'number' | 'time' | 'file' | 'checkbox' | 'info'; 
//   inputType?: 'text' | 'number'; 
//   options?: string[];
//   required?: boolean;
//   placeholder?: string;
//   dependsOn?: {
//     id: string;
//     values: (string | number | boolean)[];
//   };
// }

// interface Section {
//   id: string;
//   title: string;
//   description?: string;
//   dependsOn?: {
//     id: string;
//     values: (string | number | boolean)[];
//   };
//   questions: Question[];
// }

// interface QuestionnaireProps {
//   data: Section[];
//   onComplete: (answers: Record<string, any>) => void;
// }

// const Questionnaire: React.FC<QuestionnaireProps> = ({ data, onComplete }) => {
//   const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
//   const [answers, setAnswers] = useState<Record<string, any>>({});
//   const [error, setError] = useState<string | null>(null);
//   const topRef = useRef<HTMLDivElement>(null);

//   const currentSection = data[currentSectionIndex];
//   const isLastSection = currentSectionIndex === data.length - 1;

//   // --- Helper: Check Visibility ---
//   const isDependentVisible = (dependency?: { id: string; values: any[] }) => {
//     if (!dependency) return true;
//     const dependencyAnswer = answers[dependency.id];
    
//     if (Array.isArray(dependencyAnswer)) {
//       return dependencyAnswer.some(val => dependency.values.includes(val));
//     }
    
//     return dependency.values.includes(dependencyAnswer);
//   };

//   const isQuestionVisible = (question: Question) => {
//     return isDependentVisible(question.dependsOn);
//   };

//   // --- Validation ---
//   const validateSection = () => {
//     const visibleQuestions = currentSection.questions.filter(isQuestionVisible);
//     const missingFields = visibleQuestions.filter((q) => {
//       if (!q.required || q.type === 'info') return false; 
      
//       const value = answers[q.id];
      
//       if (Array.isArray(value)) {
//         return value.length === 0;
//       }
      
//       return value === undefined || value === null || value === '';
//     });

//     if (missingFields.length > 0) {
//       setError(`Please complete: ${missingFields.map(q => q.label).join(', ')}`);
//       return false;
//     }
//     return true;
//   };

//   const handleInputChange = (questionId: string, value: any) => {
//     if (error) setError(null);
//     setAnswers((prev) => ({ ...prev, [questionId]: value }));
//   };

//   // --- UPDATED: Smart Checkbox Handler ---
//   const handleCheckboxChange = (questionId: string, option: string) => {
//     if (error) setError(null);
//     setAnswers((prev) => {
//       const currentSelected = prev[questionId] || [];
      
//       // Helper function to dynamically check if an option should be exclusive
//       const isExclusiveOption = (opt: string) => {
//         // Matches "None", "None, my life is relatively stable", "None of these", etc.
//         return opt.startsWith("None") || opt === "Diet & Lifestyle only";
//       };

//       const clickedExclusive = isExclusiveOption(option);

//       // Case A: User clicked an exclusive option ("None...")
//       if (clickedExclusive) {
//         if (currentSelected.includes(option)) {
//           return { ...prev, [questionId]: [] }; // Toggle off if already selected
//         } else {
//           return { ...prev, [questionId]: [option] }; // Select ONLY this exclusive option
//         }
//       }

//       // Case B: User clicked a normal option (e.g., 'Financial toxicity')
//       // First, remove any exclusive options if they were previously selected
//       let newSelected = currentSelected.filter((item: string) => !isExclusiveOption(item));

//       if (newSelected.includes(option)) {
//         // Toggle off the normal option
//         newSelected = newSelected.filter((item: string) => item !== option);
//       } else {
//         // Add the normal option
//         newSelected = [...newSelected, option];
//       }

//       return { ...prev, [questionId]: newSelected };
//     });
//   };

//   // --- Navigation ---
//   const getNextValidSectionIndex = (currentIndex: number, direction: 'next' | 'back') => {
//     let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
//     while (nextIndex >= 0 && nextIndex < data.length) {
//       const section = data[nextIndex];
//       if (isDependentVisible(section.dependsOn)) return nextIndex;
//       nextIndex = direction === 'next' ? nextIndex + 1 : nextIndex - 1;
//     }
//     return nextIndex;
//   };

//   const handleNext = () => {
//     if (validateSection()) {
//       const nextIndex = getNextValidSectionIndex(currentSectionIndex, 'next');
//       if (nextIndex < data.length) {
//         setCurrentSectionIndex(nextIndex);
//         topRef.current?.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   };

//   const handleBack = () => {
//     setError(null);
//     const prevIndex = getNextValidSectionIndex(currentSectionIndex, 'back');
//     if (prevIndex >= 0) {
//       setCurrentSectionIndex(prevIndex);
//       topRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleSubmit = () => {
//     if (validateSection()) {
//       onComplete(answers);
//     }
//   };

//   const visibleQuestions = currentSection.questions.filter(isQuestionVisible);

//   return (
//     <div ref={topRef} className="w-full max-w-5xl mx-auto px-4 py-8">
      
//       {/* 1. PROGRESS STEPPER */}
//       <div className="mb-12">
//         <div className="flex items-center justify-between relative px-4">
//             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10" />
            
//             <motion.div 
//                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-600 rounded-full -z-10" 
//                initial={{ width: '0%' }}
//                animate={{ width: `${(currentSectionIndex / (data.length - 1)) * 100}%` }}
//                transition={{ duration: 0.5, ease: "easeInOut" }}
//             />

//             {data.map((section, index) => {
//                const isActive = index === currentSectionIndex;
//                const isCompleted = index < currentSectionIndex;
               
//                return (
//                   <div key={section.id} className="relative group">
//                      <motion.div 
//                         className={`w-8 h-8 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 z-10 box-content
//                            ${isActive 
//                               ? 'bg-brand-600 border-white shadow-lg scale-110' 
//                               : isCompleted 
//                                  ? 'bg-brand-600 border-brand-600' 
//                                  : 'bg-white border-gray-300 text-gray-400'
//                         }`}
//                      >
//                         {isCompleted ? (
//                            <CheckCircle2 size={16} className="text-white" />
//                         ) : (
//                            <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
//                               {index + 1}
//                            </span>
//                         )}
//                      </motion.div>
                     
//                      {/* The floating tooltip div has been completely removed from here! */}
//                   </div>
//                );
//             })}
//         </div>
//       </div>

//       {/* 2. MAIN CARD */}
//       <div className="bg-white rounded-[2rem] shadow-2xl border-t border-brand-100 min-h-[500px] flex flex-col relative overflow-hidden">
         
//          <div className="p-8 md:p-14">
//             <div className="mb-8 text-center md:text-left border-b border-gray-100 pb-8">
//                <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3 tracking-tight">
//                   {currentSection.title}
//                </h2>
//                {currentSection.description && (
//                   <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">{currentSection.description}</p>
//                )}
//             </div>

//             <div className="flex flex-col">
//                {visibleQuestions.map((q) => (
//                   <motion.div 
//                      key={q.id}
//                      initial={{ opacity: 0, y: 10 }}
//                      animate={{ opacity: 1, y: 0 }}
//                      transition={{ duration: 0.4 }}
//                      className="flex flex-col py-10 border-b border-gray-100 last:border-0"
//                   >
//                      {/* Standard Label (Hidden for 'info' type) */}
//                      {q.type !== 'info' && (
//                        <label className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-start gap-1">
//                           {q.label}
//                           {q.required && <span className="text-red-500 text-lg leading-none mt-0.5">*</span>}
//                        </label>
//                      )}

//                      {/* --- INPUT TYPES --- */}

//                      {/* INFO / DISCLAIMER BLOCK */}
//                      {q.type === 'info' && (
//                         <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4">
//                            <AlertCircle className="text-amber-600 shrink-0 mt-1" size={24} />
//                            <p className="text-amber-900 font-semibold text-lg leading-relaxed">{q.label}</p>
//                         </div>
//                      )}
                     
//                      {/* 1. TEXT / NUMBER */}
//                      {(q.type === 'text' || q.type === 'number') && (
//                         <input
//                            type={q.inputType || (q.type === 'number' ? 'number' : 'text')}
//                            className="w-full bg-gray-100 border border-gray-200 text-gray-900 text-lg px-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all placeholder:text-gray-400 font-medium"
//                            value={answers[q.id] || ''}
//                            onChange={(e) => handleInputChange(q.id, e.target.value)}
//                            placeholder={q.placeholder || "Type your answer..."}
//                         />
//                      )}

//                      {/* 2. TEXTAREA */}
//                      {q.type === 'textarea' && (
//                         <textarea
//                            rows={4}
//                            className="w-full bg-gray-100 border border-gray-200 text-gray-900 text-lg px-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all placeholder:text-gray-400 resize-none font-medium"
//                            value={answers[q.id] || ''}
//                            onChange={(e) => handleInputChange(q.id, e.target.value)}
//                            placeholder={q.placeholder || "Please verify details..."}
//                         />
//                      )}

//                      {/* 3. SELECT */}
//                      {q.type === 'select' && (
//                         <div className="relative">
//                            <select
//                               className="w-full appearance-none bg-gray-100 border border-gray-200 text-gray-900 text-lg px-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all cursor-pointer font-medium"
//                               value={answers[q.id] || ''}
//                               onChange={(e) => handleInputChange(q.id, e.target.value)}
//                            >
//                               <option value="" disabled>Select an option</option>
//                               {q.options?.map((opt) => (
//                                  <option key={opt} value={opt}>{opt}</option>
//                               ))}
//                            </select>
//                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
//                               <ChevronRight className="rotate-90" size={20} />
//                            </div>
//                         </div>
//                      )}

//                      {/* 4. RADIO TILES (Single Select) */}
//                      {q.type === 'radio' && (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                            {q.options?.map((opt) => {
//                               const isSelected = answers[q.id] === opt;
//                               return (
//                                  <button
//                                     key={opt}
//                                     onClick={() => handleInputChange(q.id, opt)}
//                                     className={`relative px-6 py-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group
//                                        ${isSelected 
//                                           ? 'bg-brand-700 border-brand-700 text-white shadow-lg transform -translate-y-0.5' 
//                                           : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200 hover:border-gray-300'
//                                        }`}
//                                  >
//                                     <span className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-gray-700'}`}>{opt}</span>
//                                     {isSelected && <CheckCircle2 size={24} className="text-brand-200" />}
//                                  </button>
//                               );
//                            })}
//                         </div>
//                      )}

//                      {/* 5. CHECKBOX TILES (Multi Select) */}
//                      {q.type === 'checkbox' && (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                            {q.options?.map((opt) => {
//                               const isSelected = (answers[q.id] || []).includes(opt);
//                               return (
//                                  <button
//                                     key={opt}
//                                     onClick={() => handleCheckboxChange(q.id, opt)}
//                                     className={`relative px-6 py-5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between group
//                                        ${isSelected 
//                                           ? 'bg-brand-700 border-brand-700 text-white shadow-lg transform -translate-y-0.5' 
//                                           : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200 hover:border-gray-300'
//                                        }`}
//                                  >
//                                     <span className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-gray-700'}`}>{opt}</span>
//                                     {isSelected && <CheckCircle2 size={24} className="text-brand-200" />}
//                                  </button>
//                               );
//                            })}
//                         </div>
//                      )}

//                      {/* 6. TIME PICKER */}
//                      {q.type === 'time' && (
//                         <div>
//                            {(() => {
//                               const val = answers[q.id] || "10:00 PM";
//                               const isOpen = (answers[`${q.id}_open`] === true);

//                               const togglePicker = () => handleInputChange(`${q.id}_open`, !isOpen);
                              
//                               const [timePart, period] = val.includes(' ') ? val.split(' ') : ["10:00", "PM"];
//                               const [hour, minute] = timePart.split(':');

//                               const updateTime = (h: string, m: string, p: string) => {
//                                  handleInputChange(q.id, `${h}:${m} ${p}`);
//                               };

//                               return (
//                                  <div className="relative max-w-xs">
//                                     <button 
//                                        onClick={togglePicker}
//                                        className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl border transition-all
//                                           ${isOpen ? 'border-brand-500 ring-2 ring-brand-100 bg-white' : 'bg-gray-100 border-gray-200 hover:bg-gray-200'}`}
//                                     >
//                                        <div className="flex items-center gap-3">
//                                           <Clock size={20} className="text-brand-600" />
//                                           <span className="text-xl font-heading font-bold text-gray-900">{val}</span>
//                                        </div>
//                                        <ChevronRight size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
//                                     </button>

//                                     <AnimatePresence>
//                                        {isOpen && (
//                                           <motion.div 
//                                              initial={{ opacity: 0, y: 10 }}
//                                              animate={{ opacity: 1, y: 0 }}
//                                              exit={{ opacity: 0, y: 10 }}
//                                              className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 overflow-hidden"
//                                           >
//                                              <div className="flex h-56">
//                                                 <div className="flex-1 overflow-y-auto no-scrollbar snap-y snap-mandatory py-20 border-r border-gray-50">
//                                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
//                                                       <div 
//                                                          key={h} 
//                                                          onClick={() => updateTime(h.toString(), minute, period)}
//                                                          className={`h-12 flex items-center justify-center snap-center cursor-pointer transition-colors
//                                                             ${h.toString() === hour ? 'text-3xl font-bold text-brand-600' : 'text-gray-300 hover:text-gray-500'}`}
//                                                       >
//                                                          {h}
//                                                       </div>
//                                                    ))}
//                                                 </div>

//                                                 <div className="flex-1 overflow-y-auto no-scrollbar snap-y snap-mandatory py-20 border-r border-gray-50">
//                                                    {['00', '15', '30', '45'].map((m) => (
//                                                       <div 
//                                                          key={m} 
//                                                          onClick={() => updateTime(hour, m, period)}
//                                                          className={`h-12 flex items-center justify-center snap-center cursor-pointer transition-colors
//                                                             ${m === minute ? 'text-3xl font-bold text-brand-600' : 'text-gray-300 hover:text-gray-500'}`}
//                                                       >
//                                                          {m}
//                                                       </div>
//                                                    ))}
//                                                 </div>

//                                                 <div className="w-20 flex flex-col items-center justify-center gap-3 bg-gray-50">
//                                                    {['AM', 'PM'].map((p) => (
//                                                       <button
//                                                          key={p}
//                                                          onClick={() => updateTime(hour, minute, p)}
//                                                          className={`text-sm font-bold px-3 py-1.5 rounded-lg transition-all ${period === p ? 'bg-brand-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-200'}`}
//                                                       >
//                                                          {p}
//                                                       </button>
//                                                    ))}
//                                                 </div>
//                                              </div>
                                             
//                                              <button 
//                                                 onClick={togglePicker}
//                                                 className="w-full py-4 bg-gray-50 text-brand-700 font-bold text-sm hover:bg-brand-50 transition-colors border-t border-gray-100"
//                                              >
//                                                 Done
//                                              </button>
//                                           </motion.div>
//                                        )}
//                                     </AnimatePresence>
//                                  </div>
//                               );
//                            })()}
//                         </div>
//                      )}

//                      {/* 7. FILE UPLOAD */}
//                      {q.type === 'file' && (
//                         <div className="mt-2">
//                            <label className="relative flex flex-col items-center justify-center w-full h-56 rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 hover:border-brand-400 transition-all group overflow-hidden">
                              
//                               {answers[`${q.id}_preview`] ? (
//                                  <div className="relative w-full h-full p-6">
//                                     <img 
//                                        src={answers[`${q.id}_preview`]} 
//                                        alt="Preview" 
//                                        className="w-full h-full object-contain"
//                                     />
//                                     <div className="absolute inset-0 bg-brand-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
//                                        <span className="bg-white text-brand-900 px-6 py-3 rounded-full font-bold text-sm shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
//                                           Replace Image
//                                        </span>
//                                     </div>
//                                  </div>
//                               ) : (
//                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                     <div className="w-16 h-16 mb-4 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center group-hover:scale-110 group-hover:border-brand-200 transition-all">
//                                        <UploadCloud className="w-7 h-7 text-brand-500" />
//                                     </div>
//                                     <p className="mb-2 text-lg text-gray-700 font-bold">Upload Report</p>
//                                     <p className="text-sm text-gray-400">SVG, PNG, JPG or PDF</p>
//                                  </div>
//                               )}
                              
//                               <input 
//                                  type='file' 
//                                  className="hidden" 
//                                  accept="image/*"
//                                  onChange={(e) => {
//                                     if (e.target.files && e.target.files[0]) {
//                                        const file = e.target.files[0];
//                                        handleInputChange(q.id, file);
//                                        const reader = new FileReader();
//                                        reader.onloadend = () => handleInputChange(`${q.id}_preview`, reader.result);
//                                        reader.readAsDataURL(file);
//                                     }
//                                  }}
//                               />
//                            </label>
//                         </div>
//                      )}

//                   </motion.div>
//                ))}
//             </div>
//          </div>

//          {/* 3. FOOTER */}
//          <div className="bg-gray-50/80 backdrop-blur-sm p-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
//              <div className="flex-1 w-full md:w-auto min-h-[24px]">
//                <AnimatePresence>
//                   {error && (
//                      <motion.div 
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0 }}
//                         className="flex items-center text-red-600 text-sm font-bold bg-red-50 px-4 py-3 rounded-xl border border-red-100 shadow-sm"
//                      >
//                         <AlertCircle size={18} className="mr-2 shrink-0" />
//                         {error}
//                      </motion.div>
//                   )}
//                </AnimatePresence>
//              </div>

//              <div className="flex gap-4 w-full md:w-auto">
//                <button
//                   onClick={handleBack}
//                   disabled={currentSectionIndex === 0}
//                   className={`flex items-center justify-center px-8 py-4 rounded-full font-bold transition-all w-full md:w-auto
//                      ${currentSectionIndex === 0 
//                         ? 'text-gray-300 cursor-not-allowed' 
//                         : 'text-gray-600 hover:bg-white hover:shadow-sm hover:text-brand-700'}`}
//                >
//                   Back
//                </button>

//                {isLastSection ? (
//                   <button 
//                      onClick={handleSubmit} 
//                      className="flex items-center justify-center gap-2 px-10 py-4 bg-accent-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-accent-600 hover:-translate-y-1 transition-all active:scale-95 w-full md:w-auto"
//                   >
//                      Generate Report <FileText size={18} />
//                   </button>
//                ) : (
//                   <button 
//                      onClick={handleNext} 
//                      className="flex items-center justify-center gap-2 px-10 py-4 bg-brand-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-brand-800 hover:-translate-y-1 transition-all active:scale-95 w-full md:w-auto"
//                   >
//                      Next Step <ChevronRight size={18} />
//                   </button>
//                )}
//              </div>
//          </div>

//       </div>
//     </div>
//   );
// };

// export default Questionnaire;





//==============================4/10/26=====================================

'use client';

import React, { useState, useMemo } from 'react';
import { 
  CaretRight, 
  CaretLeft, 
  CheckCircle, 
  WarningCircle, 
  CloudArrowUp, 
  Clock, 
  Info,
  Circle,
  Square,
  CheckSquare,
  CaretDown,
  FileText
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Question {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'number' | 'time' | 'file' | 'checkbox' | 'info'; 
  inputType?: 'text' | 'number'; 
  options?: string[];
  unitOptions?: string[];
  required?: boolean;
  placeholder?: string;
  dependsOn?: {
    id: string;
    values: (string | number | boolean)[];
  };
}

interface Section {
  id: string;
  title: string;
  description?: string;
  dependsOn?: {
    id: string;
    values: (string | number | boolean)[];
  };
  questions: Question[];
}

interface QuestionnaireProps {
  data: Section[];
  onComplete: (answers: Record<string, any>) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ data, onComplete }) => {
  // 1. FLATTEN THE DATA
  const allQuestions = useMemo(() => {
    return data.flatMap((section, sectionIdx) => 
      section.questions.map(q => ({
        ...q,
        sectionId: section.id,
        sectionTitle: section.title,
        sectionDescription: section.description,
        sectionIndex: sectionIdx + 1,
        totalSections: data.length
      }))
    );
  }, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false); // NEW STATE FOR OCR LOADING
  const [selectedUnits, setSelectedUnits] = useState<Record<string, string>>({});

  const currentQ = allQuestions[currentIndex];
  const isLastQuestion = currentIndex === allQuestions.length - 1;

  // --- Visibility Logic ---
  const isDependentVisible = (dependency: Question['dependsOn'], currentAnswers: Record<string, any>) => {
    if (!dependency) return true;
    const dependencyAnswer = currentAnswers[dependency.id];
    
    if (Array.isArray(dependencyAnswer)) {
      return dependencyAnswer.some(val => dependency.values.includes(val));
    }
    return dependency.values.includes(dependencyAnswer);
  };

  const getNextValidIndex = (startIndex: number, direction: 'next' | 'back', currentAnswers: Record<string, any>) => {
    let nextIdx = startIndex + (direction === 'next' ? 1 : -1);
    while (nextIdx >= 0 && nextIdx < allQuestions.length) {
      const q = allQuestions[nextIdx];
      const section = data.find(s => s.id === q.sectionId);
      const sectionVisible = isDependentVisible(section?.dependsOn, currentAnswers);
      const questionVisible = isDependentVisible(q.dependsOn, currentAnswers);
      
      if (sectionVisible && questionVisible) return nextIdx;
      nextIdx += (direction === 'next' ? 1 : -1);
    }
    return nextIdx;
  };

  // --- Validation ---
  const validateCurrentQuestion = () => {
    if (!currentQ.required || currentQ.type === 'info') return true;
    
    const value = answers[currentQ.id];
    if (Array.isArray(value) && value.length === 0) {
      setError("Please select at least one option.");
      return false;
    }
    if (value === undefined || value === null || value === '') {
      setError("This field is required.");
      return false;
    }
    return true;
  };

  // --- Handlers ---
  const handleInputChange = (value: any) => {
    if (error) setError(null);
    
    const updates: Record<string, any> = { [currentQ.id]: value };
    // Automatically save the active unit alongside the value so the AI backend gets both
    if (currentQ.unitOptions) {
       updates[`${currentQ.id}_unit`] = selectedUnits[currentQ.id] || currentQ.unitOptions[0];
    }
    
    setAnswers(prev => ({ ...prev, ...updates }));
  };

  const handleUnitChange = (newUnit: string) => {
     const oldUnit = selectedUnits[currentQ.id] || currentQ.unitOptions![0];
     if (oldUnit === newUnit) return;

     setSelectedUnits(prev => ({ ...prev, [currentQ.id]: newUnit }));
     
     // Auto-convert existing values smoothly
     const currentValue = answers[currentQ.id];
     if (currentValue) {
        let num = parseFloat(currentValue);
        if (!isNaN(num)) {
           let converted = num;
           if (oldUnit === 'kg' && newUnit === 'lbs') converted = num * 2.20462;
           else if (oldUnit === 'lbs' && newUnit === 'kg') converted = num / 2.20462;
           else if (oldUnit === 'cm' && newUnit === 'ft') converted = num / 30.48;
           else if (oldUnit === 'ft' && newUnit === 'cm') converted = num * 30.48;
           
           converted = Math.round(converted * 10) / 10; // Round to 1 decimal place
           
           setAnswers(prev => ({ 
             ...prev, 
             [currentQ.id]: converted.toString(),
             [`${currentQ.id}_unit`]: newUnit
           }));
        }
     } else {
        // If no value is typed yet, just save their unit preference
        setAnswers(prev => ({ ...prev, [`${currentQ.id}_unit`]: newUnit }));
     }
  };

  const handleRadioSelect = (option: string) => {
    if (error) setError(null);
    const newAnswers = { ...answers, [currentQ.id]: option };
    setAnswers(newAnswers);
    
    setTimeout(() => {
      const nextIdx = getNextValidIndex(currentIndex, 'next', newAnswers);
      if (nextIdx < allQuestions.length) {
        setCurrentIndex(nextIdx);
      } else {
        onComplete(newAnswers);
      }
    }, 600); 
  };

  const handleCheckboxChange = (option: string) => {
    if (error) setError(null);
    setAnswers((prev) => {
      const currentSelected = prev[currentQ.id] || [];
      const isExclusive = option.startsWith("None") || option === "Diet & Lifestyle only";
      
      if (isExclusive) {
        return currentSelected.includes(option) ? { ...prev, [currentQ.id]: [] } : { ...prev, [currentQ.id]: [option] }; 
      }

      let newSelected = currentSelected.filter((item: string) => !item.startsWith("None") && item !== "Diet & Lifestyle only");
      if (newSelected.includes(option)) {
        newSelected = newSelected.filter((item: string) => item !== option);
      } else {
        newSelected = [...newSelected, option];
      }

      return { ...prev, [currentQ.id]: newSelected };
    });
  };

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      const nextIdx = getNextValidIndex(currentIndex, 'next', answers);
      if (nextIdx < allQuestions.length) {
        setCurrentIndex(nextIdx);
      } else {
        onComplete(answers);
      }
    }
  };

  const handleBack = () => {
    setError(null);
    const prevIdx = getNextValidIndex(currentIndex, 'back', answers);
    if (prevIdx >= 0) setCurrentIndex(prevIdx);
  };

  // --- Progress ---
  const progressPercentage = ((currentIndex + 1) / allQuestions.length) * 100;

  // --- Reusable Input Style for Deep Fields ---
  const deepInputClasses = "w-full bg-slate-50 border border-slate-200 shadow-[inset_0_3px_6px_rgba(0,0,0,0.06)] text-slate-900 text-lg font-bold px-6 py-4 rounded-2xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-teal-500/15 focus:border-teal-500 transition-all placeholder:text-slate-300 placeholder:font-medium";

  return (
    <div className="w-full min-h-screen bg-white md:bg-slate-50 flex flex-col relative pb-32">
      
      {/* 1. TOP PROGRESS BAR */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl pt-safe shadow-sm">
        <div className="h-1.5 w-full bg-slate-100 relative">
           <motion.div 
             className="absolute left-0 top-0 bottom-0 bg-teal-500 rounded-r-full"
             initial={{ width: 0 }}
             animate={{ width: `${progressPercentage}%` }}
             transition={{ duration: 0.4, ease: "easeInOut" }}
           />
        </div>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
               {currentQ.sectionTitle}
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN ONE-QUESTION FOCUS AREA */}
      <div className="flex-1 w-full max-w-2xl mx-auto px-6 py-8 md:py-16 flex flex-col justify-center min-h-[60vh]">
        <AnimatePresence mode="wait">
           <motion.div 
              key={currentQ.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full"
           >
              
              {/* Question Label */}
              {currentQ.type !== 'info' ? (
                <div className="mb-8">
                   <h1 className="text-2xl md:text-3xl font-heading font-bold text-slate-800 leading-snug mb-2">
                      {currentQ.label}
                      {currentQ.required && <span className="text-rose-500 ml-1.5">*</span>}
                   </h1>
                   {currentQ.type === 'checkbox' && (
                     <p className="text-slate-400 font-medium text-sm mt-1">Select all that apply</p>
                   )}
                </div>
              ) : (
                <div className="mb-8 text-center max-w-lg mx-auto px-2">
                   <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Info size={28} weight="fill" className="text-blue-500" />
                   </div>
                   <p className="text-lg text-slate-600 font-medium leading-relaxed">
                      {currentQ.label}
                   </p>
                </div>
              )}

              {/* --- INPUT TYPES --- */}
              <div className="w-full">
                
                {/* TEXT / NUMBER (Deep Input with Auto-Conversion Unit Toggle) */}
                {(currentQ.type === 'text' || currentQ.type === 'number') && (
                   <div className="relative w-full">
                      <input
                         type={currentQ.inputType || (currentQ.type === 'number' ? 'number' : 'text')}
                         // Add extra padding on the right if a toggle switch is present
                         className={`${deepInputClasses} ${currentQ.unitOptions ? 'pr-32' : ''}`}
                         value={answers[currentQ.id] || ''}
                         onChange={(e) => handleInputChange(e.target.value)}
                         placeholder={currentQ.placeholder || "Type your answer..."}
                         autoFocus
                      />
                      
                      {/* Floating Segmented Toggle Switch */}
                      {currentQ.unitOptions && (
                         <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center bg-slate-200/70 p-1 rounded-xl">
                            {currentQ.unitOptions.map((unit: string) => { // <-- Add ": string" here
                               const isActive = (selectedUnits[currentQ.id] || currentQ.unitOptions![0]) === unit;
                               return (
                                 <button
                                   key={unit}
                                   onClick={() => handleUnitChange(unit)}
                                   className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all outline-none ${isActive ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                                 >
                                   {unit}
                                 </button>
                               )
                            })}
                         </div>
                      )}
                   </div>
                )}

                {/* TEXTAREA (Deep Input) */}
                {currentQ.type === 'textarea' && (
                   <textarea
                      rows={4}
                      className={`${deepInputClasses} resize-none`}
                      value={answers[currentQ.id] || ''}
                      onChange={(e) => handleInputChange(e.target.value)}
                      placeholder={currentQ.placeholder || "Provide details..."}
                      autoFocus
                   />
                )}

                {/* SELECT (Deep Input) */}
                {currentQ.type === 'select' && (
                   <div className="relative group">
                      <select
                         className={`${deepInputClasses} appearance-none cursor-pointer`}
                         value={answers[currentQ.id] || ''}
                         onChange={(e) => handleInputChange(e.target.value)}
                      >
                         <option value="" disabled>Select an option...</option>
                         {currentQ.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                         ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                         <CaretDown weight="bold" size={20} />
                      </div>
                   </div>
                )}

                {/* RADIO TILES (Tactile 3D Buttons) */}
                {currentQ.type === 'radio' && (
                   <div className="flex flex-col gap-4">
                      {currentQ.options?.map((opt) => {
                         const isSelected = answers[currentQ.id] === opt;
                         return (
                            <button
                               key={opt}
                               onClick={() => handleRadioSelect(opt)}
                               className={`relative px-6 py-4 rounded-2xl border-2 text-left transition-all duration-150 flex items-center gap-4 group outline-none w-full
                                  ${isSelected 
                                     ? 'bg-teal-50 border-teal-500 border-b-[4px] shadow-sm translate-y-[2px] z-10' 
                                     : 'bg-white border-slate-200 border-b-[4px] hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 shadow-sm'
                                  }`}
                            >
                               <div className="shrink-0 transition-transform duration-200">
                                 {isSelected ? (
                                   <CheckCircle size={26} weight="fill" className="text-teal-600" />
                                 ) : (
                                   <Circle size={26} weight="regular" className="text-slate-300 group-hover:text-slate-400" />
                                 )}
                               </div>
                               <span className={`font-bold text-lg leading-snug transition-colors ${isSelected ? 'text-teal-900' : 'text-slate-700'}`}>
                                 {opt}
                               </span>
                            </button>
                         );
                      })}
                   </div>
                )}

                {/* CHECKBOX TILES (Tactile 3D Buttons) */}
                {currentQ.type === 'checkbox' && (
                   <div className="flex flex-col gap-4">
                      {currentQ.options?.map((opt) => {
                         const isSelected = (answers[currentQ.id] || []).includes(opt);
                         return (
                            <button
                               key={opt}
                               onClick={() => handleCheckboxChange(opt)}
                               className={`relative px-6 py-4 rounded-2xl border-2 text-left transition-all duration-150 flex items-center gap-4 group outline-none w-full
                                  ${isSelected 
                                     ? 'bg-teal-50 border-teal-500 border-b-[4px] shadow-sm translate-y-[2px] z-10' 
                                     : 'bg-white border-slate-200 border-b-[4px] hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 shadow-sm'
                                  }`}
                            >
                               <div className="shrink-0 transition-transform duration-200">
                                 {isSelected ? (
                                   <CheckSquare size={26} weight="fill" className="text-teal-600" />
                                 ) : (
                                   <Square size={26} weight="regular" className="text-slate-300 group-hover:text-slate-400" />
                                 )}
                               </div>
                               <span className={`font-bold text-lg leading-snug transition-colors ${isSelected ? 'text-teal-900' : 'text-slate-700'}`}>
                                 {opt}
                               </span>
                            </button>
                         );
                      })}
                   </div>
                )}

                {/* TIME PICKER (Deep Input) */}
                {currentQ.type === 'time' && (
                   <div className="relative w-full group">
                       <input
                          type="time"
                          className={`${deepInputClasses} cursor-pointer`}
                          value={answers[currentQ.id] || ''}
                          onChange={(e) => handleInputChange(e.target.value)}
                       />
                       <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                          <Clock weight="fill" size={24} />
                       </div>
                   </div>
                )}

                {/* FILE UPLOAD (Intelligent OCR) */}
                {currentQ.type === 'file' && (
                   <div className="w-full">
                      {/* Explicit Instruction Banner */}
                      <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-2xl mb-4 flex items-start gap-3">
                         <Info className="text-blue-600 shrink-0 mt-0.5" size={20} weight="fill" />
                         <p className="text-blue-900 font-medium text-sm leading-relaxed">
                            Upload a clear photo or PDF of your <strong>Blood Test Report</strong>. We will automatically extract your HbA1c, Fasting Sugar, and Vitamin levels to save you time.
                         </p>
                      </div>

                      <label className={`relative flex flex-col items-center justify-center w-full h-64 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-100 shadow-[inset_0_3px_6px_rgba(0,0,0,0.06)] cursor-pointer hover:bg-slate-50 hover:border-teal-400 transition-all group overflow-hidden ${isParsing ? 'pointer-events-none opacity-80' : ''}`}>
                         
                         {/* Loading Overlay */}
                         {isParsing && (
                            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                               <div className="w-12 h-12 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin mb-4"></div>
                               <p className="text-teal-700 font-bold text-lg animate-pulse">Reading Lab Report...</p>
                               <p className="text-slate-500 text-sm font-medium">Extracting your biomarkers</p>
                            </div>
                         )}

                         {answers[`${currentQ.id}_preview`] && !isParsing ? (
                            <div className="relative w-full h-full p-6 flex items-center justify-center">
                               {/* Check if it's a PDF or an Image */}
                               {(answers[`${currentQ.id}_preview`] as string).startsWith('data:application/pdf') ? (
                                  <div className="flex flex-col items-center justify-center text-center">
                                     <FileText size={56} weight="duotone" className="text-teal-600 mb-3" />
                                     <span className="text-slate-700 font-bold text-lg">PDF Document Attached</span>
                                     <span className="text-slate-400 text-sm mt-1">{answers[currentQ.id]?.name}</span>
                                  </div>
                               ) : (
                                  <img src={answers[`${currentQ.id}_preview`]} alt="Preview" className="w-full h-full object-contain" />
                               )}
                               
                               <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm rounded-3xl">
                                  <span className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
                                     Replace Document
                                  </span>
                               </div>
                            </div>
                         ) : !isParsing && (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                               <div className="w-16 h-16 mb-4 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:scale-110 group-hover:border-teal-200 transition-all">
                                  <CloudArrowUp size={28} weight="regular" className="text-teal-600" />
                               </div>
                               <p className="mb-1 text-lg text-slate-700 font-bold">Tap to Upload Report</p>
                               <p className="text-sm text-slate-400 font-medium">Clear photos (JPG, PNG) or PDFs</p>
                            </div>
                         )}
                         
                         <input 
                            type='file' 
                            className="hidden" 
                            accept="image/*,application/pdf"
                            onChange={async (e) => {
                               if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  
                                  // Set preview
                                  const reader = new FileReader();
                                  reader.onloadend = () => setAnswers(prev => ({ ...prev, [`${currentQ.id}_preview`]: reader.result }));
                                  reader.readAsDataURL(file);

                                  // Start Parsing
                                  setIsParsing(true);
                                  setError(null);
                                  
                                  try {
                                     const formData = new FormData();
                                     formData.append('file', file);
                                     
                                     const response = await fetch('/api/parse-report', {
                                        method: 'POST',
                                        body: formData
                                     });
                                     
                                     const result = await response.json();
                                     
                                     if (!response.ok || !result.isValidReport) {
                                        setError(result.error || "Failed to read report. Please upload a clearer image.");
                                        // Clear the preview on failure so they try again
                                        setAnswers(prev => ({ ...prev, [`${currentQ.id}_preview`]: null }));
                                     } else {
                                        // Success! Auto-fill the extracted data into our main answers state
                                        const extracted = result.extractedData;
                                        setAnswers(prev => {
                                           const updated = { ...prev };
                                           if (extracted.lab_hba1c) updated['lab_hba1c'] = extracted.lab_hba1c;
                                           if (extracted.lab_fbs) updated['lab_fbs'] = extracted.lab_fbs;
                                           if (extracted.lab_pp) updated['lab_pp'] = extracted.lab_pp;
                                           if (extracted.lab_vit_d3) updated['lab_vit_d3'] = extracted.lab_vit_d3;
                                           if (extracted.lab_vit_b12) updated['lab_vit_b12'] = extracted.lab_vit_b12;
                                           // Also mark the file itself as successfully saved
                                           updated[currentQ.id] = file;
                                           return updated;
                                        });
                                     }
                                  } catch (err) {
                                     setError("Network error while reading the report.");
                                     setAnswers(prev => ({ ...prev, [`${currentQ.id}_preview`]: null }));
                                  } finally {
                                     setIsParsing(false);
                                  }
                               }
                            }}
                         />
                      </label>
                   </div>
                )}
              </div>
           </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. STICKY BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-100 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
           
           <div className="flex-1 w-full flex justify-center md:justify-start min-h-[32px]">
             <AnimatePresence>
                {error && (
                   <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center text-rose-700 text-xs font-bold bg-rose-50 px-3 py-2 rounded-lg border border-rose-100 shadow-sm"
                   >
                      <WarningCircle size={16} weight="fill" className="mr-1.5 shrink-0" />
                      <span>{error}</span>
                   </motion.div>
                )}
             </AnimatePresence>
           </div>

           <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
             <button
                onClick={handleBack}
                disabled={currentIndex === 0}
                className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-6 h-12 rounded-full font-bold transition-all outline-none
                   ${currentIndex === 0 
                      ? 'text-slate-300 cursor-not-allowed bg-slate-50' 
                      : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95 shadow-sm'}`}
             >
                <CaretLeft size={18} weight="bold" /> Back
             </button>

             {(currentQ.type !== 'radio' || error || isLastQuestion) && (
               <button 
                  onClick={handleNext} 
                  className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-8 h-12 bg-teal-600 text-white rounded-full font-bold text-base shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all active:scale-95 outline-none"
               >
                  {isLastQuestion || (currentQ.type === 'info' && currentIndex === allQuestions.length - 1) ? (
                    <>Finish <CheckCircle size={18} weight="bold" /></>
                  ) : (
                    <>Next <CaretRight size={18} weight="bold" /></>
                  )}
               </button>
             )}
           </div>
        </div>
      </div>

    </div>
  );
};

export default Questionnaire;