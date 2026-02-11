
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SCENARIOS } from '../constants';
import { getStoredUser, saveUser, updateScores, getDriverLevel } from '../utils/storage';
import { UserProfile, Scenario, ScenarioOption } from '../types';
import { ShieldCheck, Clock, AlertCircle } from 'lucide-react';

const Training: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ScenarioOption | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const stored = getStoredUser();
    setUser(stored);
  }, []);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    
    const newUser: UserProfile = {
      name: nameInput,
      email: "",
      isLoggedIn: true,
      scores: { patience: 50, empathy: 50, riskAwareness: 50, ruleRespect: 50 },
      scenariosCompleted: 0,
      decisions: []
    };
    saveUser(newUser);
    setUser(newUser);
  };

  const handleSelect = (option: ScenarioOption) => {
    setSelectedOption(option);
    setShowFeedback(true);
    
    const currentScenario = SCENARIOS[currentScenarioIndex];
    updateScores(option.impacts, {
      scenarioId: currentScenario.id,
      scenarioTitle: currentScenario.title,
      choice: option.text,
      impacts: option.impacts,
      timestamp: new Date().toISOString()
    });
    
    const updated = getStoredUser();
    setUser(updated);
  };

  const nextScenario = () => {
    if (currentScenarioIndex < SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setShowFeedback(false);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  if (!user?.isLoggedIn) {
    return (
      <div className="pt-40 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-12 rounded-[3rem] w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-8">Begin Training</h2>
          <form onSubmit={handleStart} className="space-y-6">
            <input 
              type="text" 
              placeholder="Enter your name" 
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-blue-500 transition-colors"
            />
            <button type="submit" className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors">
              Start Session
            </button>
          </form>
          <p className="mt-8 text-xs text-gray-500">Your progress will be stored locally on this device.</p>
        </motion.div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="pt-40 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass p-16 rounded-[4rem] text-center max-w-2xl">
          <ShieldCheck className="text-green-500 mx-auto mb-8" size={64} />
          <h2 className="text-4xl font-bold mb-4">Session Complete</h2>
          <p className="text-gray-400 mb-8 text-lg">You've completed all scenarios for this module. Your ethical profile has been updated.</p>
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="p-4 bg-white/5 rounded-2xl">
              <span className="text-xs text-gray-500 block uppercase">Level</span>
              <span className="font-bold text-blue-400">
                {getDriverLevel((user.scores.patience + user.scores.empathy + user.scores.riskAwareness + user.scores.ruleRespect) / 4)}
              </span>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl">
              <span className="text-xs text-gray-500 block uppercase">Completed</span>
              <span className="font-bold text-white">{user.scenariosCompleted} Scenarios</span>
            </div>
          </div>
          <a href="/#/progress" className="inline-block px-12 py-4 bg-white text-black font-bold rounded-full">
            View My Progress
          </a>
        </motion.div>
      </div>
    );
  }

  const scenario = SCENARIOS[currentScenarioIndex];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <span className="font-bold text-blue-400">{currentScenarioIndex + 1}</span>
            </div>
            <h1 className="text-xl font-bold">Scenario {scenario.id}</h1>
          </div>
          <div className="text-sm text-gray-500">
            {currentScenarioIndex + 1} of {SCENARIOS.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 h-2 rounded-full mb-12 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentScenarioIndex + 1) / SCENARIOS.length) * 100}%` }}
            className="h-full bg-blue-500"
          ></motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="glass p-12 rounded-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <AlertCircle className="text-white/10" size={100} />
                </div>
                <h2 className="text-3xl font-bold mb-6 pr-20">{scenario.title}</h2>
                <p className="text-xl text-gray-300 leading-relaxed">{scenario.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenario.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(option)}
                    className="p-8 glass hover:bg-white/5 text-left rounded-3xl border-2 border-transparent hover:border-blue-500/50 transition-all group"
                  >
                    <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                      <span className="text-xs font-bold">{String.fromCharCode(65 + idx)}</span>
                    </div>
                    <span className="text-lg font-medium">{option.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-12 rounded-[3rem] border-2 border-blue-500/30 text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Ethical Impact</h2>
              <div className="p-8 bg-blue-500/5 rounded-3xl mb-12 italic text-gray-300 text-lg">
                "{selectedOption?.feedback}"
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                {Object.entries(selectedOption?.impacts || {}).map(([key, val], i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-2xl">
                    <span className="text-[10px] text-gray-500 block uppercase tracking-widest mb-1">{key.replace(/([A-Z])/g, ' $1')}</span>
                    {/* Fixed type error: cast 'val' to number for binary comparison operators */}
                    <span className={`text-xl font-bold ${(val as number) > 0 ? 'text-green-400' : (val as number) < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                      {(val as number) > 0 ? `+${val}` : val}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={nextScenario}
                className="px-16 py-5 bg-white text-black font-bold rounded-full text-xl hover:bg-gray-200 transition-all"
              >
                {currentScenarioIndex < SCENARIOS.length - 1 ? 'Next Scenario' : 'Complete Session'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Training;
