
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS, BADGES } from '../constants';
import { getStoredUser, initUser, completeChapter, getChapterStatus } from '../utils/storage';
import { UserProfile, Chapter, Scenario } from '../types';
import { Lock, Check, Play, Clock, ArrowRight, RefreshCw, LogOut, Award } from 'lucide-react';

// --- SUB-COMPONENT: TRAINING ENGINE ---

const Engine: React.FC<{ chapter: Chapter, onComplete: () => void, onExit: () => void }> = ({ chapter, onComplete, onExit }) => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [active, setActive] = useState(true);
  const [feedback, setFeedback] = useState<{ text: string, score: number } | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const timerRef = useRef<number | null>(null);

  const currentScenario = chapter.scenarios[scenarioIndex];

  useEffect(() => {
    if (active && !feedback && !isFinished) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleOption(0, "Time expired. Indecision is dangerous.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [scenarioIndex, feedback, isFinished, active]);

  const handleOption = (score: number, feedbackText: string) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTotalScore(prev => prev + score);
    setFeedback({ text: feedbackText, score });
  };

  const next = () => {
    setFeedback(null);
    setTimeLeft(60);
    if (scenarioIndex < 9) {
      setScenarioIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      const newBadges = completeChapter(chapter.id, totalScore);
      setEarnedBadges(newBadges);
    }
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-8 md:p-12 rounded-[3rem] max-w-2xl w-full">
          <h2 className="text-4xl font-bold mb-2">Chapter Complete</h2>
          <p className="text-gray-500 mb-10 text-lg">{chapter.title}</p>
          
          <div className="text-7xl font-bold gradient-text mb-4">{totalScore}<span className="text-2xl text-gray-500">/100</span></div>
          <p className="text-gray-400 mb-8">
            {totalScore > 80 ? "Excellent awareness demonstrated." : "Good effort. Continue to refine your instincts."}
          </p>

          {earnedBadges.length > 0 && (
            <div className="mb-10 bg-white/5 p-6 rounded-2xl border border-yellow-500/30">
              <h4 className="text-yellow-400 font-bold mb-4 flex items-center justify-center gap-2">
                <Award size={20} /> Badge Unlocked!
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {earnedBadges.map(id => {
                  const badge = BADGES.find(b => b.id === id);
                  return (
                    <div key={id} className="bg-black/40 px-4 py-2 rounded-full border border-white/10 text-sm font-bold text-white flex items-center gap-2">
                       <span>{badge?.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button onClick={onComplete} className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all text-lg">
              Continue to Next Chapter
            </button>
            <button onClick={onExit} className="w-full py-5 bg-transparent border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all text-lg">
              Return to Menu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">{chapter.title}</h2>
          <span className="text-gray-500 text-sm font-mono">Scenario {scenarioIndex + 1} / 10</span>
        </div>
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
            <circle cx="32" cy="32" r="28" stroke={timeLeft < 10 ? '#ef4444' : '#3b82f6'} strokeWidth="4" fill="none" strokeDasharray={175} strokeDashoffset={175 - (175 * timeLeft) / 60} className="transition-all duration-1000 linear" />
          </svg>
          <span className="absolute text-sm font-mono font-bold">{timeLeft}</span>
        </div>
      </div>

      <AnimatePresence mode='wait'>
        {!feedback ? (
          <motion.div
            key="scenario"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass p-10 rounded-[2.5rem]"
          >
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-10">
              {currentScenario.text}
            </p>
            <div className="grid grid-cols-1 gap-4">
              {currentScenario.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOption(opt.score, opt.feedback)}
                  className="p-6 text-left bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 rounded-2xl transition-all group"
                >
                  <span className="text-lg text-gray-300 group-hover:text-white transition-colors">{opt.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-10 rounded-[2.5rem] border-t-4 border-blue-500"
          >
            <div className="mb-6">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Impact Analysis</span>
              <h3 className="text-2xl font-bold mt-2 text-white">{feedback.text}</h3>
            </div>
            <div className="flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-2xl w-fit">
              <span className="text-gray-400 text-sm">Score Gained</span>
              <span className="text-2xl font-bold text-white">+{feedback.score}</span>
            </div>
            <button onClick={next} className="px-10 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2">
              Next Scenario <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const Training: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    setUser(getStoredUser());
  }, [activeChapterId]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    const u = initUser(nameInput);
    setUser(u);
  };

  const startChapter = (id: number) => {
    const status = getChapterStatus(id);
    if (status !== 'LOCKED') {
      setActiveChapterId(id);
    }
  };

  if (!user?.isLoggedIn) {
    return (
      <div className="pt-32 flex items-center justify-center px-6 min-h-screen">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-12 rounded-[3rem] w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center">Driver Identity</h2>
          <form onSubmit={handleStart} className="space-y-6">
            <div>
              <input 
                type="text" 
                placeholder="Enter Name" 
                required value={nameInput} onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500/50 transition-all text-white text-lg"
              />
            </div>
            <button type="submit" className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all text-lg shadow-xl">
              Initialize
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (activeChapterId) {
    const chapter = CHAPTERS.find(c => c.id === activeChapterId);
    if (!chapter) return null;
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen bg-black">
        <Engine 
          chapter={chapter} 
          onComplete={() => setActiveChapterId(null)} 
          onExit={() => setActiveChapterId(null)} 
        />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Training Chapters</h1>
          <p className="text-gray-400">Progressive awareness training. Unlock chapters sequentially.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CHAPTERS.map((chapter) => {
            const status = getChapterStatus(chapter.id);
            return (
              <motion.button
                key={chapter.id}
                whileHover={status !== 'LOCKED' ? { y: -5 } : {}}
                onClick={() => startChapter(chapter.id)}
                disabled={status === 'LOCKED'}
                className={`p-8 rounded-[2rem] text-left border transition-all relative overflow-hidden group
                  ${status === 'LOCKED' ? 'bg-white/[0.02] border-white/5 opacity-50 cursor-not-allowed' : 'glass border-white/10 hover:border-blue-500/30 cursor-pointer'}
                `}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-mono font-bold text-gray-500 uppercase">Chapter {chapter.id.toString().padStart(2, '0')}</span>
                  {status === 'LOCKED' && <Lock size={16} className="text-gray-600" />}
                  {status === 'COMPLETED' && <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"><Check size={14} className="text-black" /></div>}
                  {status === 'UNLOCKED' && <Play size={16} className="text-blue-500" />}
                </div>
                
                <h3 className={`text-xl font-bold mb-2 ${status === 'LOCKED' ? 'text-gray-500' : 'text-white'}`}>{chapter.title}</h3>
                <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                  {status === 'COMPLETED' && <div className="h-full w-full bg-green-500/50"></div>}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Training;


