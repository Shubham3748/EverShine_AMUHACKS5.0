
export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  scores: {
    patience: number;
    empathy: number;
    riskAwareness: number;
    ruleRespect: number;
  };
  scenariosCompleted: number;
  decisions: DecisionHistory[];
}

export interface DecisionHistory {
  scenarioId: number;
  scenarioTitle: string;
  choice: string;
  impacts: {
    patience: number;
    empathy: number;
    riskAwareness: number;
    ruleRespect: number;
  };
  timestamp: string;
}

export interface Scenario {
  id: number;
  title: string;
  description: string;
  options: ScenarioOption[];
}

export interface ScenarioOption {
  text: string;
  feedback: string;
  impacts: {
    patience: number;
    empathy: number;
    riskAwareness: number;
    ruleRespect: number;
  };
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  date: string;
}
