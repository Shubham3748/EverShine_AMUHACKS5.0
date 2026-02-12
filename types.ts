

export interface ScenarioOption {
  text: string;
  score: number;
  feedback: string;
}

export interface Scenario {
  id: string;
  text: string;
  options: ScenarioOption[];
}

export interface Chapter {
  id: number;
  title: string;
  theme: string;
  scenarios: Scenario[];
}

export interface ChapterResult {
  chapterId: number;
  score: number;
  completedAt: string;
}

export interface UserProfile {
  name: string;
  isLoggedIn: boolean;
  currentChapter: number;
  totalScore: number;
  chapterResults: ChapterResult[];
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  date: string;
}
