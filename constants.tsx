
import { Chapter, Scenario, Badge } from './types';

// --- DATA: BADGES ---
export const BADGES: Badge[] = [
  { id: 'initiate', title: 'Initiate', description: 'Complete your first chapter.', icon: 'Flag' },
  { id: 'bronze_driver', title: 'Bronze Driver', description: 'Complete 5 chapters.', icon: 'Award' },
  { id: 'silver_driver', title: 'Silver Driver', description: 'Complete 25 chapters.', icon: 'Star' },
  { id: 'gold_driver', title: 'Gold Driver', description: 'Complete all 50 chapters.', icon: 'Trophy' },
  { id: 'perfectionist', title: 'Perfectionist', description: 'Achieve a perfect 100 score in any chapter.', icon: 'CheckCircle' },
  { id: 'hat_trick', title: 'Hat Trick', description: 'Achieve 3 perfect scores.', icon: 'Zap' },
  { id: 'ace', title: 'Ace', description: 'Achieve 10 perfect scores.', icon: 'Target' },
  { id: 'legend', title: 'Legend', description: 'Achieve 20 perfect scores.', icon: 'Crown' },
  { id: 'point_collector', title: 'Point Collector', description: 'Reach a total score of 500.', icon: 'Plus' },
  { id: 'high_scorer', title: 'High Scorer', description: 'Reach a total score of 2000.', icon: 'TrendingUp' },
  { id: 'elite_scorer', title: 'Elite Scorer', description: 'Reach a total score of 4000.', icon: 'Activity' },
  { id: 'guardian', title: 'Guardian', description: 'Score 100 in Chapter 2: Pedestrian Priority.', icon: 'Shield' },
  { id: 'storm_master', title: 'Storm Master', description: 'Score 100 in Chapter 5: Weather Adaptation.', icon: 'CloudRain' },
  { id: 'night_owl', title: 'Night Owl', description: 'Score 100 in Chapter 6: Night Operations.', icon: 'Moon' },
  { id: 'highway_star', title: 'Highway Star', description: 'Score 100 in Chapter 7: Highway Discipline.', icon: 'Truck' },
  { id: 'city_slicker', title: 'City Slicker', description: 'Score 100 in Chapter 8: Urban Congestion.', icon: 'Building' },
  { id: 'zen_master', title: 'Zen Master', description: 'Score 100 in Chapter 18: Emotional Control.', icon: 'Smile' },
  { id: 'mechanic', title: 'Mechanic', description: 'Score 100 in Chapter 20: Vehicle Maintenance.', icon: 'Wrench' },
  { id: 'consistent', title: 'Consistent', description: 'Maintain an average score of 90+ after 5 chapters.', icon: 'BarChart' },
  { id: 'driveaware_champion', title: 'DriveAware Champion', description: 'Complete the entire course with >4800 points.', icon: 'Medal' }
];

// --- DATA: CHAPTER TOPICS ---

const CHAPTER_TOPICS: Record<number, string[]> = {
  1: [ // Foundations
    "a pedestrian glancing at their phone near a crosswalk",
    "a tailgater pressing you while the light turns yellow",
    "traffic halting suddenly on the freeway",
    "a cyclist wobbling slightly in your lane",
    "heavy rain reducing visibility to near zero",
    "missing your exit on a busy highway",
    "a ball rolling into the street from a driveway",
    "your phone buzzing with an 'urgent' work message",
    "realizing you just microslept for a second",
    "a car cutting you off without signaling"
  ],
  2: [ // Pedestrian Priority
    "a runner approaching a crosswalk from your blind side",
    "a pedestrian crossing against the signal",
    "an elderly person crossing very slowly as the light changes",
    "children playing tag on the sidewalk near the curb",
    "a pedestrian stepping out from behind a parked truck",
    "making a right turn while a pedestrian starts crossing",
    "eye contact ambiguity at a four-way stop with a walker",
    "a pedestrian walking on the shoulder of a rural road",
    "a puddle splashing risk near a bus stop",
    "a distracted teenager walking into traffic"
  ],
  3: [ // Intersection Ethics
    "a four-way stop where two cars arrive simultaneously",
    "entering an intersection that isn't fully clear (blocking the box)",
    "turning left while the oncoming car is speeding up",
    "a traffic light malfunctioning and flashing red",
    "a cyclist waiting to turn left at a busy junction",
    "a driver running a red light cross-traffic",
    "a U-turn opportunity at a busy intersection",
    "turning right on red where visibility is poor",
    "an emergency vehicle approaching a red intersection",
    "pedestrians starting to cross as your light turns green"
  ],
  4: [ // Speed & Consequence
    "a sudden drop in speed limit entering a small town",
    "keeping up with traffic that is flowing 15mph over the limit",
    "approaching a sharp curve with an advisory speed sign",
    "a school zone speed limit indicator flashing",
    "a long straight road tempting you to speed up",
    "speeding up to pass a truck before a lane merge",
    "descending a steep hill where gravity increases speed",
    "driving through a construction zone with no workers visible",
    "a tailgater pushing you to go faster",
    "variable speed limits changing due to congestion"
  ],
  5: [ // Weather Adaptation
    "hitting a patch of black ice on a bridge",
    "dense fog reducing visibility to 10 feet",
    "sun glare blinding you during morning commute",
    "strong crosswinds pushing your car sideways",
    "hail starting to fall suddenly on the highway",
    "slush accumulation in the center of the lane",
    "hydroplaning on standing water",
    "wipers failing during a heavy downpour",
    "driving into a dust storm",
    "snow covering lane markers completely"
  ],
  6: [ // Night Operations
    "oncoming headlights blinding you with high beams",
    "a cyclist riding without lights or reflectors",
    "judging distance of a car with one headlight out",
    "animals eyes reflecting in the distance",
    "drowsiness setting in on a dark road",
    "dashboard lights being too bright and affecting night vision",
    "a pedestrian wearing all black crossing the street",
    "rain at night creating mirror-like reflections",
    "navigating an unlit rural road",
    "checking mirrors while headlights glare from behind"
  ],
  7: [ // Highway Discipline
    "merging onto a highway where traffic is dense",
    "a car camping in the left passing lane",
    "missing a frantic exit maneuver by another driver",
    "trucks creating significant wind buffeting",
    "highway hypnosis setting in on a long drive",
    "debris on the highway requiring a sudden lane change",
    "a breakdown on the shoulder with people standing nearby",
    "motorcycles lane splitting in heavy traffic",
    "emergency braking wave propagating back",
    "using the carpool lane without a passenger"
  ],
  8: [ // Urban Congestion
    "gridlock blocking an intersection",
    "a delivery truck double-parked blocking a lane",
    "cyclists weaving through stopped cars",
    "passengers alighting from a taxi in traffic",
    "aggressive merging in bumper-to-bumper traffic",
    "emergency vehicles navigating gridlock",
    "pedestrians jaywalking through stopped cars",
    "drivers honking in frustration",
    "scooters zooming in blind spots",
    "navigating a complex one-way system"
  ],
  9: [ // Rural Hazards
    "a slow-moving tractor blocking the lane",
    "unmarked gravel roads with loose surfaces",
    "wildlife crossing signs in a wooded area",
    "blind corners on narrow country lanes",
    "lack of cell signal in case of emergency",
    "hidden driveways obscured by hedges",
    "narrow bridges allowing only one car",
    "mud on the road from farming equipment",
    "soft shoulders that can pull the car in",
    "horse riders on the road"
  ],
  10: [ // Cyclist Safety
    "overtaking a cyclist on a narrow road",
    "a cyclist signaling a left turn",
    "opening your door after parking (dooring risk)",
    "cyclists riding two abreast",
    "a bike lane ending suddenly",
    "turning right across a bike lane (right hook)",
    "a cyclist swerving to avoid a pothole",
    "sharing the road with a child on a bike",
    "e-bikes moving faster than expected",
    "cyclist in your blind spot at a light"
  ],
};

const getProceduralTopics = (theme: string, chapterId: number): string[] => {
  const bases = [
    `a critical situation involving ${theme.toLowerCase()}`,
    `an unexpected event related to ${theme.toLowerCase()}`,
    `a misunderstanding of ${theme.toLowerCase()} rules`,
    `pressure from others regarding ${theme.toLowerCase()}`,
    `a mechanical issue affecting ${theme.toLowerCase()}`,
    `a visibility problem complicating ${theme.toLowerCase()}`,
    `distraction occurring during ${theme.toLowerCase()}`,
    `an aggressive driver challenging your ${theme.toLowerCase()}`,
    `a vulnerable road user affecting ${theme.toLowerCase()}`,
    `a split-second decision regarding ${theme.toLowerCase()}`
  ];
  return bases;
};

const generateScenario = (chapterId: number, index: number, topic: string): Scenario => {
  return {
    id: `ch-${chapterId}-sc-${index + 1}`,
    text: `Scenario ${index + 1}: You encounter ${topic}. The situation is developing rapidly. What is your immediate ethical response?`,
    options: [
      {
        text: `Prioritize safety and yield/slow down immediately.`,
        score: 10,
        feedback: "Correct. De-escalation and safety are the primary ethical duties."
      },
      {
        text: `Maintain your course and assume others will react.`,
        score: 5,
        feedback: "Risky. Relying on others to ensure safety is a failure of defensive driving."
      },
      {
        text: `Aggressively assert your position to resolve the ambiguity.`,
        score: 0,
        feedback: "Dangerous. Aggression increases the likelihood of conflict and collision."
      },
      {
        text: `Hesitate and wait for the situation to clear itself.`,
        score: 3,
        feedback: "Indecisive. Hesitation can be unpredictable to other drivers."
      }
    ].sort(() => Math.random() - 0.5) // Shuffle options slightly
  };
};

const CHAPTER_TITLES = [
  "Foundations of Awareness", "Pedestrian Priority", "Intersection Ethics", "Speed & Consequence", "Weather Adaptation",
  "Night Operations", "Highway Discipline", "Urban Congestion", "Rural Hazards", "Cyclist Safety",
  "Emergency Vehicles", "School Zones", "Parking Etiquette", "Merge Dynamics", "Overtaking Protocol",
  "Distraction Management", "Fatigue Recognition", "Emotional Control", "Road Rage De-escalation", "Vehicle Maintenance",
  "Passenger Management", "Cargo Safety", "Towing Ethics", "Heavy Traffic Zen", "Signal Discipline",
  "Roundabout Logic", "Blind Spot Awareness", "Reversing Safety", "Wildlife Encounters", "Construction Zones",
  "Accident Response", "First Aid Basics", "Legal Obligations", "Insurance Integrity", "Environmental Impact",
  "Fuel Efficiency", "Noise Pollution", "Community Respect", "Defensive Mindset", "Anticipatory Driving",
  "Gap Estimation", "Braking Physics", "Reaction Time", "Spatial Awareness", "Mirror Usage",
  "Headlight Courtesy", "Horn Ethics", "Music & Focus", "Digital Discipline", "Mastery of Instinct"
];

const EXTRA_TOPICS: Record<number, string[]> = {
  11: ["an ambulance approaching from behind", "a fire truck crossing an intersection", "pulling over on a narrow road", "emergency sirens heard but not seen", "blocking a driveway during an emergency", "following an ambulance to get through traffic", "emergency vehicle stopped on shoulder", "police car with lights off", "yielding to a funeral procession", "civilian car waving a white cloth"],
  12: ["20mph zone start time", "crossing guard holding a stop sign", "school bus with flashing red lights", "parents double parking", "kids running between cars", "distracted parents driving", "ball rolling into street", "teenagers on phones crossing", "school zone ending sign", "waiting for a bus to unload"],
  13: ["taking up two spots", "hitting a door while opening", "parking in a handicap spot 'for a minute'", "blocking a driveway", "parking too close to a corner", "leaving a dog in the car", "dinging a car and leaving", "parking in a fire lane", "backing out of a busy spot", "stealing a spot someone was waiting for"],
  16: ["phone falling under the seat", "eating a messy burger while driving", "changing playlist on screen", "passengers arguing loudly", "pet jumping into lap", "dropped cigarette", "insect flying in car", "makeup application", "looking at a crash scene", "GPS rerouting suddenly"],
  18: ["being cut off aggressively", "running late for an interview", "receiving bad news call", "crying child in back seat", "being honked at for waiting", "stuck in unmoving traffic", "tailgater flashing lights", "missing a green light", "getting lost", "spilling hot coffee"]
};

const ALL_TOPICS = { ...CHAPTER_TOPICS, ...EXTRA_TOPICS };

export const CHAPTERS: Chapter[] = CHAPTER_TITLES.map((title, index) => {
  const id = index + 1;
  const topics = ALL_TOPICS[id] || getProceduralTopics(title, id);
  
  return {
    id: id,
    title: title,
    theme: title,
    scenarios: topics.map((topic, i) => generateScenario(id, i, topic))
  };
});
