
import { UserProfile, ChapterResult, ContactMessage } from '../types';

const USER_KEY = 'driveaware_premium_user';
const MESSAGES_KEY = 'driveaware_messages';

export const getStoredUser = (): UserProfile | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveUser = (user: UserProfile) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const initUser = (name: string): UserProfile => {
  const newUser: UserProfile = {
    name,
    isLoggedIn: true,
    currentChapter: 1,
    totalScore: 0,
    chapterResults: [],
    badges: []
  };
  saveUser(newUser);
  return newUser;
};

export const logoutUser = () => {
  const user = getStoredUser();
  if (user) {
    user.isLoggedIn = false;
    saveUser(user);
  }
};

// Check conditions and return ONLY new badges
const checkForNewBadges = (user: UserProfile, lastChapterId: number, lastScore: number): string[] => {
  const newBadges: string[] = [];
  const totalChapters = user.chapterResults.length;
  const perfectScores = user.chapterResults.filter(r => r.score === 100).length;
  const currentTotalScore = user.totalScore;

  // Helper to add if not exists
  const award = (id: string) => {
    if (!user.badges.includes(id)) {
      newBadges.push(id);
      user.badges.push(id);
    }
  };

  // 1. Completion Badges
  if (totalChapters >= 1) award('initiate');
  if (totalChapters >= 5) award('bronze_driver');
  if (totalChapters >= 25) award('silver_driver');
  if (totalChapters >= 50) award('gold_driver');

  // 2. Score Streaks/Counts
  if (perfectScores >= 1) award('perfectionist');
  if (perfectScores >= 3) award('hat_trick');
  if (perfectScores >= 10) award('ace');
  if (perfectScores >= 20) award('legend');

  // 3. Point Thresholds
  if (currentTotalScore >= 500) award('point_collector');
  if (currentTotalScore >= 2000) award('high_scorer');
  if (currentTotalScore >= 4000) award('elite_scorer');
  if (currentTotalScore >= 4800 && totalChapters === 50) award('driveaware_champion');

  // 4. Specific Chapters (Perfect Scores)
  if (lastScore === 100) {
    if (lastChapterId === 2) award('guardian');
    if (lastChapterId === 5) award('storm_master');
    if (lastChapterId === 6) award('night_owl');
    if (lastChapterId === 7) award('highway_star');
    if (lastChapterId === 8) award('city_slicker');
    if (lastChapterId === 18) award('zen_master');
    if (lastChapterId === 20) award('mechanic');
  }

  // 5. Average Consistency
  if (totalChapters >= 5) {
    const avg = currentTotalScore / totalChapters;
    if (avg >= 90) award('consistent');
  }

  return newBadges;
};

export const completeChapter = (chapterId: number, score: number): string[] => {
  const user = getStoredUser();
  if (!user) return [];

  // Check if already completed
  const existingIndex = user.chapterResults.findIndex(r => r.chapterId === chapterId);
  
  if (existingIndex !== -1) {
    // Update score if better
    if (score > user.chapterResults[existingIndex].score) {
      user.totalScore += (score - user.chapterResults[existingIndex].score);
      user.chapterResults[existingIndex].score = score;
    }
  } else {
    // New completion
    user.chapterResults.push({
      chapterId,
      score,
      completedAt: new Date().toISOString()
    });
    user.totalScore += score;
    
    // Unlock next chapter
    if (chapterId === user.currentChapter) {
      user.currentChapter += 1;
    }
  }

  const newBadges = checkForNewBadges(user, chapterId, score);
  
  saveUser(user);
  return newBadges;
};

export const getChapterStatus = (chapterId: number): 'LOCKED' | 'UNLOCKED' | 'COMPLETED' => {
  const user = getStoredUser();
  if (!user) return 'LOCKED';

  const isCompleted = user.chapterResults.some(r => r.chapterId === chapterId);
  if (isCompleted) return 'COMPLETED';
  
  if (chapterId <= user.currentChapter) return 'UNLOCKED';
  
  return 'LOCKED';
};

export const saveContactMessage = (message: ContactMessage) => {
  const messages = JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
  messages.push(message);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};
