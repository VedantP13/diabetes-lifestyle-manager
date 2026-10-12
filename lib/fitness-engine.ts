//=======================18/08/26 - Review 1 ==================================

// import { UserProfile } from './generator';

// export interface Exercise {
//   name: string;
//   duration: string;
//   frequency: string;
//   intensity: 'Low' | 'Medium' | 'High';
//   videoUrl?: string;
//   instructions: string;
//   tags: string[];
// }

// export interface FitnessPlan {
//   cardio: {
//     type: string;
//     protocol: string;
//     focus: string;
//   };
//   strength: {
//     focus: string;
//     exercises: Exercise[];
//   };
//   // NEW: Yoga Section
//   yoga: {
//     focus: string;
//     asanas: Exercise[]; 
//   };
//   neat: {
//     title: string;
//     description: string;
//   };
// }

// export function generateFitnessPlan(profile: UserProfile): FitnessPlan {
  
//   // --- 1. CARDIO LOGIC ---
//   let cardioProtocol = {
//     type: "Brisk Walking",
//     protocol: "30 mins daily, continuous",
//     focus: "Cardiovascular Health"
//   };

//   if (profile.conditions.includes('Diabetic')) {
//     cardioProtocol = {
//       type: "Post-Prandial Walking",
//       protocol: "10-15 mins immediately after Breakfast, Lunch, and Dinner",
//       focus: "Blunting Glucose Spikes"
//     };
//   } else if (profile.activityLevel.includes('< 15')) {
//     cardioProtocol = {
//       type: "Accumulated Steps",
//       protocol: "5 mins of walking every hour (Set an alarm)",
//       focus: "Breaking Sedentary Time"
//     };
//   }

//   // --- 2. STRENGTH LOGIC ---
//   const exercises: Exercise[] = [];
  
//   // Safety Flags
//   const hasKneePain = profile.physical_limitations?.includes('Knee');
//   const hasBackPain = profile.physical_limitations?.includes('Back');
//   const isSenior = profile.age > 60;
//   const isObese = profile.bmi > 30; // NEW: BMI Check

//   // Exercise A: Leg Compound
//   if (hasKneePain || isObese) {
//     // Obese users also benefit from low impact to save joints
//     exercises.push({
//       name: "Seated Leg Extensions",
//       duration: "3 sets of 12 reps",
//       frequency: "3x / week",
//       intensity: "Low",
//       instructions: "Sit on a chair. Straighten one leg fully, squeeze thigh hard for 2s, lower slowly. No pressure on knees.",
//       tags: ["Joint-Safe", "Quads"]
//     });
//   } else if (isSenior) {
//     exercises.push({
//       name: "Chair Sit-to-Stands",
//       duration: "3 sets of 10 reps",
//       frequency: "3x / week",
//       intensity: "Medium",
//       instructions: "Sit on a chair. Stand up without using hands if possible. Sit back down slowly.",
//       tags: ["Functional", "Legs"]
//     });
//   } else {
//     exercises.push({
//       name: "Bodyweight Squats",
//       duration: "3 sets of 15 reps",
//       frequency: "3x / week",
//       intensity: "Medium",
//       instructions: "Keep chest up, sink hips back like sitting in a chair. Keep weight on heels.",
//       tags: ["Compound", "Glutes"]
//     });
//   }

//   // Exercise B: Push/Upper Body
//   exercises.push({
//     name: "Wall/Incline Pushups",
//     duration: "3 sets of 10 reps",
//     frequency: "3x / week",
//     intensity: "Medium",
//     instructions: "Place hands on a wall or kitchen counter. Lower chest towards it, push back. Easier than floor pushups.",
//     tags: ["Upper Body", "Chest"]
//   });

//   // Exercise C: Core/Stability
//   if (hasBackPain || isObese) {
//     exercises.push({
//       name: "Bird-Dog Hold",
//       duration: "10 reps per side",
//       frequency: "Daily",
//       intensity: "Low",
//       instructions: "On hands and knees, extend opposite arm and leg. Keep spine neutral. Do not arch back.",
//       tags: ["Core", "Back-Safe"]
//     });
//   } else {
//     exercises.push({
//       name: "Forearm Plank",
//       duration: "3 rounds of 30 seconds",
//       frequency: "Daily",
//       intensity: "High",
//       instructions: "Hold a straight line from head to heels. Squeeze glutes. Do not let hips sag.",
//       tags: ["Core", "Stability"]
//     });
//   }

//   // --- 3. YOGA LOGIC (NEW) ---
//   const yogaPoses: Exercise[] = [];
//   const isHighStress = profile.stressLevel.includes('High') || profile.stressLevel.includes('Constant');
//   const hasBP = profile.conditions.includes('High BP');

//   // Pose 1: The Diabetes Specialist (Mandukasana or similar)
//   if (hasBackPain || isObese || profile.digestiveIssues?.includes('Bloating')) {
//     // Gentler option for back pain/obesity
//     yogaPoses.push({
//       name: "Vakrasana (Seated Twist)",
//       duration: "Hold 30s per side",
//       frequency: "Daily",
//       intensity: "Low",
//       instructions: "Sit with legs stretched. Twist torso gently to one side. Massages the pancreas and improves digestion.",
//       tags: ["Digestion", "Pancreas"]
//     });
//   } else {
//     // The Gold Standard for Diabetes
//     yogaPoses.push({
//       name: "Mandukasana (Frog Pose)",
//       duration: "3 rounds of 10 breaths",
//       frequency: "Daily (Empty Stomach)",
//       intensity: "Medium",
//       instructions: "Sit in Vajrasana. Make fists, place on belly button. Exhale and bend forward. Presses pancreas to stimulate insulin.",
//       tags: ["Diabetes-Specific", "Advanced"]
//     });
//   }

//   // Pose 2: The Stress/BP Specialist
//   if (isHighStress || profile.sleepHours.includes('<')) {
//     yogaPoses.push({
//       name: "Viparita Karani (Legs Up Wall)",
//       duration: "5-10 mins before bed",
//       frequency: "Nightly",
//       intensity: "Low",
//       instructions: "Lie on floor, butt close to wall, legs straight up the wall. Closes the 'stress loop' and lowers cortisol.",
//       tags: ["Cortisol-Lowering", "Sleep"]
//     });
//   } else if (hasBP) {
//     yogaPoses.push({
//       name: "Shavasana (Corpse Pose) with Breath Focus",
//       duration: "5 mins",
//       frequency: "Post-Workout",
//       intensity: "Low",
//       instructions: "Lie flat. Focus purely on long exhales. Actively relaxes the nervous system.",
//       tags: ["BP-Control", "Relaxation"]
//     });
//   } else {
//     // General metabolic booster
//     yogaPoses.push({
//       name: "Surya Namaskar (Sun Salutation) - Slow Pace",
//       duration: "3-5 rounds",
//       frequency: "Morning",
//       intensity: "Medium",
//       instructions: "The classic 12-step flow. Perform slowly to focus on stretch and breath, not cardio.",
//       tags: ["Metabolism", "Flexibility"]
//     });
//   }

//   // --- 4. NEAT LOGIC ---
//   let neatStrategy = {
//     title: "Take the Stairs",
//     description: "Skip the elevator for anything less than 3 floors."
//   };

//   if (profile.occupation_role?.includes('Desk')) {
//     neatStrategy = {
//       title: "The 'Printer' Walk",
//       description: "Force movement: Drink water from a small glass so you have to refill it often. Walk to colleagues instead of emailing."
//     };
//   } else if (profile.occupation_role?.includes('Homemaker')) {
//     neatStrategy = {
//       title: "Kitchen Dancing",
//       description: "Put on music while cooking. Constant micro-movements burn more calories than a gym session over the day."
//     };
//   }

//   return {
//     cardio: cardioProtocol,
//     strength: {
//       focus: "Glucose Uptake (Muscle Building)",
//       exercises
//     },
//     yoga: {
//       focus: isHighStress ? "Stress Reduction" : "Metabolic Activation",
//       asanas: yogaPoses
//     },
//     neat: neatStrategy
//   };
// }








//======================= working before 7/10/26  ==================================

// import { UserProfile } from './generator';

// export interface Exercise {
//   name: string;
//   duration: string;
//   frequency: string;
//   intensity: 'Low' | 'Medium' | 'High';
//   videoUrl?: string;
//   instructions: string;
//   tags: string[];
// }

// export interface FitnessPlan {
//   cardio: {
//     type: string;
//     protocol: string;
//     focus: string;
//   };
//   strength: {
//     focus: string;
//     exercises: Exercise[];
//   };
//   yoga: {
//     focus: string;
//     asanas: Exercise[]; 
//   };
//   neat: {
//     title: string;
//     description: string;
//   };
// }

// export function generateFitnessPlan(profile: UserProfile): FitnessPlan {
  
//   // --- 1. WALKING LOGIC (Simplified Language) ---
//   let cardioProtocol = {
//     type: "Daily Walking",
//     protocol: "Walk at a comfortable pace for 30 minutes straight.",
//     focus: "Heart Health & Stamina"
//   };

//   if ((profile.conditions || []).includes('Diabetic')) {
//     cardioProtocol = {
//       type: "The After-Meal Walk",
//       protocol: "Walk for 10 to 15 minutes immediately after you finish Breakfast, Lunch, and Dinner.",
//       focus: "Lowering Blood Sugar"
//     };
//   } else if ((profile.activityLevel || '').includes('< 15')) {
//     cardioProtocol = {
//       type: "Frequent Short Walks",
//       protocol: "Walk for 5 minutes every single hour. Set an alarm on your phone to remind you.",
//       focus: "Breaking the Sitting Cycle"
//     };
//   }

//   // --- 2. STRENGTH LOGIC ---
//   const exercises: Exercise[] = [];
  
//   const hasKneePain = profile.physical_limitations?.includes('Knee');
//   const hasBackPain = profile.physical_limitations?.includes('Back');
//   const isSenior = profile.age > 60;
//   const isObese = profile.bmi > 30;

//   // Exercise A: Legs
//   if (hasKneePain || isObese) {
//     exercises.push({
//       name: "Seated Leg Extensions",
//       duration: "3 sets of 12 reps",
//       frequency: "3 days a week",
//       intensity: "Low",
//       instructions: "Sit on a chair. Straighten one leg fully, squeeze your thigh hard for 2 seconds, and lower it slowly. This protects your knees.",
//       tags: ["Joint-Safe", "Legs"]
//     });
//   } else if (isSenior) {
//     exercises.push({
//       name: "Chair Sit-to-Stands",
//       duration: "3 sets of 10 reps",
//       frequency: "3 days a week",
//       intensity: "Medium",
//       instructions: "Sit on a chair. Stand up without using your hands if possible. Sit back down slowly and with control.",
//       tags: ["Mobility", "Legs"]
//     });
//   } else {
//     exercises.push({
//       name: "Bodyweight Squats",
//       duration: "3 sets of 15 reps",
//       frequency: "3 days a week",
//       intensity: "Medium",
//       instructions: "Keep your chest up and sink your hips back as if you are sitting in a chair. Keep your weight on your heels.",
//       tags: ["Full Body", "Legs"]
//     });
//   }

//   // Exercise B: Upper Body
//   exercises.push({
//     name: "Wall or Counter Pushups",
//     duration: "3 sets of 10 reps",
//     frequency: "3 days a week",
//     intensity: "Medium",
//     instructions: "Place your hands on a wall or kitchen counter. Lower your chest towards it, then push back. This is much safer than floor pushups.",
//     tags: ["Upper Body", "Chest"]
//   });

//   // Exercise C: Core
//   if (hasBackPain || isObese) {
//     exercises.push({
//       name: "Bird-Dog Hold",
//       duration: "10 reps per side",
//       frequency: "Daily",
//       intensity: "Low",
//       instructions: "On your hands and knees, extend your opposite arm and leg. Keep your back flat. Do not arch.",
//       tags: ["Core", "Back-Safe"]
//     });
//   } else {
//     exercises.push({
//       name: "Forearm Plank",
//       duration: "3 rounds of 30 seconds",
//       frequency: "Daily",
//       intensity: "High",
//       instructions: "Hold a straight line from your head to your heels. Squeeze your stomach and bottom. Don't let your hips sag.",
//       tags: ["Core", "Stability"]
//     });
//   }

//   // --- 3. YOGA LOGIC ---
//   const yogaPoses: Exercise[] = [];
  
//   // Safely fallback to an empty string if the AI forgets stressLevel
//   const isHighStress = (profile.stressLevel || '').includes('High') || (profile.stressLevel || '').includes('Constant');
  
//   // Safely fallback to an empty array if the AI forgets conditions
//   const hasBP = (profile.conditions || []).includes('High BP');

//   if (hasBackPain || isObese || profile.digestiveIssues?.includes('Bloating')) {
//     yogaPoses.push({
//       name: "Seated Gentle Twist",
//       duration: "Hold 30 seconds per side",
//       frequency: "Daily",
//       intensity: "Low",
//       instructions: "Sit with your legs stretched out. Twist your upper body gently to one side. This gently massages your stomach and improves digestion.",
//       tags: ["Digestion", "Gentle"]
//     });
//   } else {
//     yogaPoses.push({
//       name: "Frog Pose (Mandukasana)",
//       duration: "3 rounds of 10 breaths",
//       frequency: "Daily (Empty Stomach)",
//       intensity: "Medium",
//       instructions: "Sit on your heels. Make fists and place them on your belly button. Breathe out and bend forward. This directly stimulates your pancreas.",
//       tags: ["Blood Sugar", "Focus"]
//     });
//   }

//   if (isHighStress || profile.sleepHours.includes('<')) {
//     yogaPoses.push({
//       name: "Legs Up The Wall",
//       duration: "5 to 10 minutes before bed",
//       frequency: "Every Night",
//       intensity: "Low",
//       instructions: "Lie on the floor with your bottom close to the wall, legs straight up the wall. This instantly calms your nervous system for deep sleep.",
//       tags: ["Sleep", "Calming"]
//     });
//   } else if (hasBP) {
//     yogaPoses.push({
//       name: "Resting Breath Focus",
//       duration: "5 minutes",
//       frequency: "After workouts",
//       intensity: "Low",
//       instructions: "Lie flat on your back. Focus entirely on making your exhales longer than your inhales. This actively lowers blood pressure.",
//       tags: ["Blood Pressure", "Relaxing"]
//     });
//   } else {
//     yogaPoses.push({
//       name: "Slow Sun Salutation",
//       duration: "3 to 5 rounds",
//       frequency: "Morning",
//       intensity: "Medium",
//       instructions: "Perform the classic 12-step flow very slowly. Focus entirely on the deep stretch and your breathing, not on getting your heart rate up.",
//       tags: ["Energy", "Flexibility"]
//     });
//   }

//   // --- 4. DAILY HABITS ---
//   let neatStrategy = {
//     title: "Take the Stairs",
//     description: "Skip the elevator for anything less than 3 floors."
//   };

//   if (profile.occupation_role?.includes('Desk')) {
//     neatStrategy = {
//       title: "The 'Printer' Walk",
//       description: "Drink water from a small glass so you have to stand up and refill it often. Walk over to talk to colleagues instead of sending an email."
//     };
//   } else if (profile.occupation_role?.includes('Homemaker')) {
//     neatStrategy = {
//       title: "Kitchen Dancing",
//       description: "Put on your favorite music while cooking or cleaning. These constant, small movements burn more energy over the day than a heavy gym session."
//     };
//   }

//   return {
//     cardio: cardioProtocol,
//     strength: {
//       focus: "Building Muscle Safely",
//       exercises
//     },
//     yoga: {
//       focus: isHighStress ? "Stress Reduction" : "Flexibility & Energy",
//       asanas: yogaPoses
//     },
//     neat: neatStrategy
//   };
// }













//======================= 7/10/26  ==================================

import { UserProfile } from './generator';

export interface Exercise {
  name: string;
  duration: string;
  frequency: string;
  intensity: 'Low' | 'Medium' | 'High';
  videoUrl?: string;
  instructions: string;
  tags: string[];
}

export interface FitnessPlan {
  microSnacks: {
    title: string;
    protocol: string;
    timing: string;
    focus: string;
    options: string[];
  };
  strength: {
    focus: string;
    exercises: Exercise[];
  };
  yoga: {
    focus: string;
    asanas: Exercise[]; 
  };
  neat: {
    title: string;
    description: string;
  };
}

export function generateFitnessPlan(profile: UserProfile): FitnessPlan {
  
  // --- 1. POST-MEAL EXERCISE SNACKS (Micro-dosed Fitness) ---
  let microSnacks = {
    title: "Post-Meal Exercise Snacks",
    protocol: "Do just 3 minutes of movement after your heaviest meals. Your muscles will act like a sponge, soaking up the sugar from your food before it enters your bloodstream.",
    timing: "10-15 minutes after eating",
    focus: "Blunting Glucose Spikes",
    options: [
      "Walk briskly inside your house or office.",
      "Do 30 to 50 calf raises while standing near a wall or counter.",
      "Do 3 minutes of seated air-punches and marching."
    ]
  };

  // Adjust for joint pain
  if (profile.physical_limitations?.includes('Knee') || profile.bmi > 30) {
     microSnacks.protocol = "Do 3 minutes of seated movement after meals. You do not need to stand or put pressure on your knees to lower your blood sugar.";
     microSnacks.options = [
       "Seated arm punches (1 minute fast).",
       "Seated knee lifts (1 minute).",
       "Torso twists in your chair (1 minute)."
     ];
  }

  // --- 2. STRENGTH LOGIC ---
  const exercises: Exercise[] = [];
  
  const hasKneePain = profile.physical_limitations?.includes('Knee');
  const hasBackPain = profile.physical_limitations?.includes('Back');
  const isSenior = profile.age > 60;
  const isObese = profile.bmi > 30;

  if (hasKneePain || isObese) {
    exercises.push({
      name: "Seated Leg Extensions",
      duration: "3 sets of 12 reps",
      frequency: "3 days a week",
      intensity: "Low",
      instructions: "Sit on a chair. Straighten one leg fully, squeeze your thigh hard for 2 seconds, and lower it slowly. This protects your knees.",
      tags: ["Joint-Safe", "Legs"]
    });
  } else if (isSenior) {
    exercises.push({
      name: "Chair Sit-to-Stands",
      duration: "3 sets of 10 reps",
      frequency: "3 days a week",
      intensity: "Medium",
      instructions: "Sit on a chair. Stand up without using your hands if possible. Sit back down slowly and with control.",
      tags: ["Mobility", "Legs"]
    });
  } else {
    exercises.push({
      name: "Bodyweight Squats",
      duration: "3 sets of 15 reps",
      frequency: "3 days a week",
      intensity: "Medium",
      instructions: "Keep your chest up and sink your hips back as if you are sitting in a chair. Keep your weight on your heels.",
      tags: ["Full Body", "Legs"]
    });
  }

  exercises.push({
    name: "Wall or Counter Pushups",
    duration: "3 sets of 10 reps",
    frequency: "3 days a week",
    intensity: "Medium",
    instructions: "Place your hands on a wall or kitchen counter. Lower your chest towards it, then push back. This is much safer than floor pushups.",
    tags: ["Upper Body", "Chest"]
  });

  if (hasBackPain || isObese) {
    exercises.push({
      name: "Bird-Dog Hold",
      duration: "10 reps per side",
      frequency: "Daily",
      intensity: "Low",
      instructions: "On your hands and knees, extend your opposite arm and leg. Keep your back flat. Do not arch.",
      tags: ["Core", "Back-Safe"]
    });
  } else {
    exercises.push({
      name: "Forearm Plank",
      duration: "3 rounds of 30 seconds",
      frequency: "Daily",
      intensity: "High",
      instructions: "Hold a straight line from your head to your heels. Squeeze your stomach and bottom. Don't let your hips sag.",
      tags: ["Core", "Stability"]
    });
  }

  // --- 3. YOGA LOGIC ---
  const yogaPoses: Exercise[] = [];
  const isHighStress = (profile.stressLevel || '').includes('High') || (profile.stressLevel || '').includes('Constant');
  const hasBP = (profile.conditions || []).includes('High BP');

  if (hasBackPain || isObese || profile.digestiveIssues?.includes('Bloating')) {
    yogaPoses.push({
      name: "Seated Gentle Twist",
      duration: "Hold 30 seconds per side",
      frequency: "Daily",
      intensity: "Low",
      instructions: "Sit with your legs stretched out. Twist your upper body gently to one side. This gently massages your stomach and improves digestion.",
      tags: ["Digestion", "Gentle"]
    });
  } else {
    yogaPoses.push({
      name: "Frog Pose (Mandukasana)",
      duration: "3 rounds of 10 breaths",
      frequency: "Daily (Empty Stomach)",
      intensity: "Medium",
      instructions: "Sit on your heels. Make fists and place them on your belly button. Breathe out and bend forward. This directly stimulates your pancreas.",
      tags: ["Blood Sugar", "Focus"]
    });
  }

  if (isHighStress || profile.sleepHours.includes('<')) {
    yogaPoses.push({
      name: "Legs Up The Wall",
      duration: "5 to 10 minutes before bed",
      frequency: "Every Night",
      intensity: "Low",
      instructions: "Lie on the floor with your bottom close to the wall, legs straight up the wall. This instantly calms your nervous system for deep sleep.",
      tags: ["Sleep", "Calming"]
    });
  } else if (hasBP) {
    yogaPoses.push({
      name: "Resting Breath Focus",
      duration: "5 minutes",
      frequency: "After workouts",
      intensity: "Low",
      instructions: "Lie flat on your back. Focus entirely on making your exhales longer than your inhales. This actively lowers blood pressure.",
      tags: ["Blood Pressure", "Relaxing"]
    });
  } else {
    yogaPoses.push({
      name: "Slow Sun Salutation",
      duration: "3 to 5 rounds",
      frequency: "Morning",
      intensity: "Medium",
      instructions: "Perform the classic 12-step flow very slowly. Focus entirely on the deep stretch and your breathing, not on getting your heart rate up.",
      tags: ["Energy", "Flexibility"]
    });
  }

  // --- 4. DAILY HABITS ---
  let neatStrategy = {
    title: "Take the Stairs",
    description: "Skip the elevator for anything less than 3 floors."
  };

  if (profile.occupation_role?.includes('Desk')) {
    neatStrategy = {
      title: "The 'Printer' Walk",
      description: "Drink water from a small glass so you have to stand up and refill it often. Walk over to talk to colleagues instead of sending an email."
    };
  } else if (profile.occupation_role?.includes('Homemaker')) {
    neatStrategy = {
      title: "Kitchen Dancing",
      description: "Put on your favorite music while cooking or cleaning. Constant, small movements burn more energy over the day than a heavy gym session."
    };
  }

  return {
    microSnacks,
    strength: {
      focus: "Building Muscle Safely",
      exercises
    },
    yoga: {
      focus: isHighStress ? "Stress Reduction" : "Flexibility & Energy",
      asanas: yogaPoses
    },
    neat: neatStrategy
  };
}