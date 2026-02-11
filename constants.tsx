
import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "The Late Commuter",
    description: "You are 10 minutes late for an important meeting. A slow vehicle is ahead on a single-lane road where overtaking is technically legal but visibility is limited. What do you do?",
    options: [
      {
        text: "Wait until visibility is perfectly clear",
        feedback: "You prioritized safety over punctuality. This shows strong patience and risk awareness.",
        impacts: { patience: 10, empathy: 5, riskAwareness: 10, ruleRespect: 5 }
      },
      {
        text: "Take a calculated risk and overtake now",
        feedback: "Saving time isn't worth a potential head-on collision. This choice increased risk unnecessarily.",
        impacts: { patience: -10, empathy: -5, riskAwareness: -15, ruleRespect: -5 }
      },
      {
        text: "Honk to encourage them to speed up",
        feedback: "Pressuring others causes anxiety and leads to mistakes. Patience and empathy are key here.",
        impacts: { patience: -15, empathy: -15, riskAwareness: -5, ruleRespect: -5 }
      },
      {
        text: "Follow closely to show your frustration",
        feedback: "Tailgating is dangerous and aggressive. It significantly lowers your ethical score.",
        impacts: { patience: -20, empathy: -15, riskAwareness: -20, ruleRespect: -10 }
      }
    ]
  },
  {
    id: 2,
    title: "The Pedestrian Dilemma",
    description: "It is raining heavily. You see a pedestrian waiting to cross at a non-signalized crossing. There is a car close behind you. How do you respond?",
    options: [
      {
        text: "Slow down gently and stop",
        feedback: "Excellent empathy. You protected a vulnerable road user in poor conditions.",
        impacts: { patience: 5, empathy: 15, riskAwareness: 5, ruleRespect: 10 }
      },
      {
        text: "Keep driving to avoid being rear-ended",
        feedback: "While avoiding a rear-end collision is important, pedestrians always have priority. Balance is needed.",
        impacts: { patience: 0, empathy: -10, riskAwareness: 5, ruleRespect: -5 }
      },
      {
        text: "Speed up to clear the area faster",
        feedback: "Speeding in rain near pedestrians is highly dangerous due to splashing and reduced control.",
        impacts: { patience: -5, empathy: -15, riskAwareness: -15, ruleRespect: -10 }
      },
      {
        text: "Flash lights to signal them to cross",
        feedback: "Warning: Flashing lights can be misinterpreted by other drivers. Stopping safely is better.",
        impacts: { patience: 5, empathy: 10, riskAwareness: -5, ruleRespect: 5 }
      }
    ]
  },
  {
    id: 3,
    title: "Emergency Response",
    description: "An ambulance with sirens is approaching from behind in heavy traffic. There is no clear shoulder, but you could pull onto a sidewalk or block an intersection.",
    options: [
      {
        text: "Move carefully to create a corridor",
        feedback: "Good response. You prioritized an emergency without creating new hazards.",
        impacts: { patience: 5, empathy: 10, riskAwareness: 10, ruleRespect: 10 }
      },
      {
        text: "Wait until you find a safe opening",
        feedback: "Seconds count for ambulances. Being overly cautious can be as harmful as being reckless.",
        impacts: { patience: 5, empathy: -5, riskAwareness: 5, ruleRespect: 5 }
      },
      {
        text: "Speed up to get out of the way",
        feedback: "Speeding ahead of an emergency vehicle often blocks them further up the road.",
        impacts: { patience: -5, empathy: -5, riskAwareness: -10, ruleRespect: -5 }
      },
      {
        text: "Pull onto the sidewalk immediately",
        feedback: "Mounting sidewalks endangers pedestrians. Ethics require protecting all lives.",
        impacts: { patience: -10, empathy: -10, riskAwareness: -20, ruleRespect: -15 }
      }
    ]
  },
  {
    id: 4,
    title: "The Narrow Gap",
    description: "A delivery truck is double-parked, leaving a narrow gap. A cyclist is entering the gap from the other side. Do you go through first?",
    options: [
      {
        text: "Wait for the cyclist to pass",
        feedback: "Cyclists are vulnerable. Giving them space is a hallmark of an ethical driver.",
        impacts: { patience: 10, empathy: 15, riskAwareness: 10, ruleRespect: 10 }
      },
      {
        text: "Nudge forward to claim the space",
        feedback: "Aggressive positioning intimidates smaller road users. Lowered empathy score.",
        impacts: { patience: -10, empathy: -15, riskAwareness: -10, ruleRespect: -5 }
      },
      {
        text: "Drive through quickly before they arrive",
        feedback: "Speeding through narrow gaps is high risk. Slow down and observe.",
        impacts: { patience: -5, empathy: -10, riskAwareness: -15, ruleRespect: -5 }
      },
      {
        text: "Honk to warn the cyclist to stop",
        feedback: "The horn is for emergencies, not for demanding right of way.",
        impacts: { patience: -15, empathy: -15, riskAwareness: -5, ruleRespect: -5 }
      }
    ]
  },
  {
    id: 5,
    title: "Yellow Light Logic",
    description: "The traffic light turns yellow as you are 20 meters away at 50km/h. You could make it through if you floor it.",
    options: [
      {
        text: "Brake firmly and stop",
        feedback: "Yellow means stop if safe. You respected the rules and reduced risk.",
        impacts: { patience: 10, empathy: 5, riskAwareness: 10, ruleRespect: 15 }
      },
      {
        text: "Maintain speed and cross",
        feedback: "Indecision is dangerous. If you couldn't stop safely, crossing is the legal requirement.",
        impacts: { patience: 0, empathy: 0, riskAwareness: 5, ruleRespect: 5 }
      },
      {
        text: "Accelerate to beat the red",
        feedback: "Speeding up at intersections is a leading cause of severe accidents.",
        impacts: { patience: -15, empathy: -5, riskAwareness: -20, ruleRespect: -15 }
      },
      {
        text: "Stop suddenly without checking behind",
        feedback: "Stopping too hard can cause rear-end collisions. Awareness includes those behind you.",
        impacts: { patience: 5, empathy: -5, riskAwareness: -10, ruleRespect: 5 }
      }
    ]
  },
  {
    id: 6,
    title: "Residential Quiet",
    description: "It is 2 AM. The residential street is empty. You reach a stop sign. No one is around.",
    options: [
      {
        text: "Full stop for 3 seconds",
        feedback: "Integrity is doing the right thing when no one is watching. Perfect rule respect.",
        impacts: { patience: 5, empathy: 5, riskAwareness: 5, ruleRespect: 20 }
      },
      {
        text: "Rolling stop (slow down then go)",
        feedback: "Convenience shouldn't override safety protocols. Habit building is key.",
        impacts: { patience: 0, empathy: 0, riskAwareness: -5, ruleRespect: -10 }
      },
      {
        text: "Drive through without stopping",
        feedback: "Complete disregard for safety rules. This builds dangerous habits.",
        impacts: { patience: -10, empathy: -5, riskAwareness: -15, ruleRespect: -20 }
      },
      {
        text: "Turn off lights to stay stealthy",
        feedback: "Extremely dangerous. Lights are for visibility, not just seeing.",
        impacts: { patience: -5, empathy: -10, riskAwareness: -30, ruleRespect: -25 }
      }
    ]
  },
  {
    id: 7,
    title: "Merging Manners",
    description: "Traffic is merging from two lanes into one. A driver is trying to squeeze in ahead of you without using a blinker.",
    options: [
      {
        text: "Let them in anyway",
        feedback: "Being the bigger person prevents 'road rage' cycles. High empathy and patience.",
        impacts: { patience: 15, empathy: 15, riskAwareness: 10, ruleRespect: 5 }
      },
      {
        text: "Close the gap to block them",
        feedback: "Defensive driving is about safety, not 'teaching lessons'. This escalates risk.",
        impacts: { patience: -15, empathy: -15, riskAwareness: -15, ruleRespect: -5 }
      },
      {
        text: "Honk while letting them in",
        feedback: "Passive-aggressive behavior still contributes to a toxic road environment.",
        impacts: { patience: -5, empathy: -10, riskAwareness: -5, ruleRespect: 5 }
      },
      {
        text: "Match their speed to stay side-by-side",
        feedback: "This is a recipe for a collision. Never compete for space on the road.",
        impacts: { patience: -20, empathy: -20, riskAwareness: -25, ruleRespect: -10 }
      }
    ]
  },
  {
    id: 8,
    title: "The Distraction",
    description: "Your phone pings with a message while you are cruising on a highway. It might be the update you were waiting for.",
    options: [
      {
        text: "Ignore it until you reach your destination",
        feedback: "Total focus is required. You prioritized lives over a notification.",
        impacts: { patience: 15, empathy: 10, riskAwareness: 20, ruleRespect: 20 }
      },
      {
        text: "Ask a passenger to read it",
        feedback: "Good delegation. You kept your eyes on the road.",
        impacts: { patience: 5, empathy: 5, riskAwareness: 10, ruleRespect: 10 }
      },
      {
        text: "Quick glance at the screen",
        feedback: "A split second is all it takes for a disaster. Never look away.",
        impacts: { patience: -10, empathy: -5, riskAwareness: -20, ruleRespect: -15 }
      },
      {
        text: "Reply using voice-to-text",
        feedback: "Cognitive distraction is real. Mental focus is just as important as visual focus.",
        impacts: { patience: -5, empathy: 0, riskAwareness: -10, ruleRespect: -5 }
      }
    ]
  },
  {
    id: 9,
    title: "High Beam Courtesy",
    description: "You are driving on a dark rural road with high beams. An oncoming car appears in the distance.",
    options: [
      {
        text: "Switch to low beams immediately",
        feedback: "Blinding others is dangerous for everyone. You showed great empathy.",
        impacts: { patience: 5, empathy: 15, riskAwareness: 10, ruleRespect: 10 }
      },
      {
        text: "Wait until they are closer",
        feedback: "Late switching still causes temporary blindness for the other driver.",
        impacts: { patience: -5, empathy: -5, riskAwareness: -5, ruleRespect: 0 }
      },
      {
        text: "Keep high beams on if they don't dim",
        feedback: "Two blind drivers are worse than one. Lead by example.",
        impacts: { patience: -10, empathy: -15, riskAwareness: -20, ruleRespect: -5 }
      },
      {
        text: "Flash them to 'remind' them",
        feedback: "Aggressive flashing can cause accidents. Just dim your own lights.",
        impacts: { patience: -10, empathy: -10, riskAwareness: -10, ruleRespect: -5 }
      }
    ]
  },
  {
    id: 10,
    title: "Parking Spot Conflict",
    description: "You've been waiting for a parking spot for 5 minutes. As someone leaves, another car zips in from the other direction.",
    options: [
      {
        text: "Drive away and find another spot",
        feedback: "Superior emotional control. You avoided a pointless confrontation.",
        impacts: { patience: 20, empathy: 10, riskAwareness: 10, ruleRespect: 5 }
      },
      {
        text: "Roll down window and explain calmly",
        feedback: "Communication is okay, but be prepared for them not to care. Keep it brief.",
        impacts: { patience: 5, empathy: 5, riskAwareness: 5, ruleRespect: 5 }
      },
      {
        text: "Block them in and argue",
        feedback: "Escalating conflicts in parking lots often leads to violence or damage.",
        impacts: { patience: -25, empathy: -20, riskAwareness: -15, ruleRespect: -10 }
      },
      {
        text: "Honk continuously",
        feedback: "Noise pollution and aggression don't solve problems. Practice restraint.",
        impacts: { patience: -20, empathy: -15, riskAwareness: -5, ruleRespect: -5 }
      }
    ]
  }
];
