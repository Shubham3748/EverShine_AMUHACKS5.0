
import { UserProfile, ContactMessage, DecisionHistory } from '../types';

const USER_KEY = 'driveaware_user';
const CONTACT_KEY = 'driveaware_contacts';

export const getStoredUser = (): UserProfile | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveUser = (user: UserProfile) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const logoutUser = () => {
  const user = getStoredUser();
  if (user) {
    user.isLoggedIn = false;
    saveUser(user);
  }
};

export const updateScores = (impacts: { patience: number, empathy: number, riskAwareness: number, ruleRespect: number }, decision: DecisionHistory) => {
  const user = getStoredUser();
  if (!user) return;

  user.scores.patience = Math.max(0, Math.min(100, user.scores.patience + impacts.patience));
  user.scores.empathy = Math.max(0, Math.min(100, user.scores.empathy + impacts.empathy));
  user.scores.riskAwareness = Math.max(0, Math.min(100, user.scores.riskAwareness + impacts.riskAwareness));
  user.scores.ruleRespect = Math.max(0, Math.min(100, user.scores.ruleRespect + impacts.ruleRespect));
  
  user.scenariosCompleted += 1;
  user.decisions.unshift(decision);
  if (user.decisions.length > 20) user.decisions.pop();

  saveUser(user);
};

export const saveContactMessage = (msg: ContactMessage) => {
  const messages = JSON.parse(localStorage.getItem(CONTACT_KEY) || '[]');
  messages.push(msg);
  localStorage.setItem(CONTACT_KEY, JSON.stringify(messages));
};

export const getDriverLevel = (avgScore: number) => {
  if (avgScore < 40) return "Learner Driver";
  if (avgScore < 60) return "Awareness Level";
  if (avgScore < 85) return "Responsible Driver";
  return "Community Protector";
};
