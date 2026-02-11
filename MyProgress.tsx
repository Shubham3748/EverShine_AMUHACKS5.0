
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getStoredUser, getDriverLevel } from '../utils/storage';
import { UserProfile } from '../types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { Shield, Award, MapPin, Activity } from 'lucide-react';

const MetricBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="mb-8 last:mb-0">
    <div className="flex justify-between items-center mb-3">
      <span className="text-sm font-semibold text-gray-400">{label}</span>
      <span className="text-sm font-bold text-white">{value}%</span>
    </div>
    <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color} rounded-full`}
      ></motion.div>
    </div>
  </div>
);

const MyProgress: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  if (!user?.isLoggedIn) {
    return (
      <div className="pt-40 text-center">
        <h2 className="text-3xl font-bold mb-4">No Data Available</h2>
        <p className="text-gray-400">Please complete at least one training session to see your progress.</p>
        <a href="/#/training" className="mt-8 inline-block px-8 py-3 bg-white text-black font-bold rounded-full">Start Training</a>
      </div>
    );
  }

  const avgScore = (user.scores.patience + user.scores.empathy + user.scores.riskAwareness + user.scores.ruleRespect) / 4;
  
  const chartData = [
    { name: 'Patience', value: user.scores.patience, color: '#3b82f6' },
    { name: 'Empathy', value: user.scores.empathy, color: '#8b5cf6' },
    { name: 'Risk', value: user.scores.riskAwareness, color: '#ec4899' },
    { name: 'Rules', value: user.scores.ruleRespect, color: '#10b981' },
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 glass p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white/10 shadow-2xl">
              {user.name[0]}
            </div>
            <div className="text-center md:text-left">
              <span className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2 block">Driver Profile</span>
              <h1 className="text-4xl font-bold mb-3">{user.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300 flex items-center gap-2">
                  <Shield size={12} /> {getDriverLevel(avgScore)}
                </span>
                <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300 flex items-center gap-2">
                  <Activity size={12} /> {user.scenariosCompleted} Scenarios
                </span>
              </div>
            </div>
          </div>
          <div className="glass p-10 rounded-[3rem] flex flex-col items-center justify-center text-center">
            <span className="text-gray-500 uppercase tracking-widest text-[10px] mb-2 font-bold">Overall Rating</span>
            <div className="text-6xl font-bold gradient-text mb-2">{Math.round(avgScore)}</div>
            <p className="text-sm text-gray-400">Excellent performance. Keep building your habits.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detailed Metrics */}
          <div className="glass p-10 rounded-[3rem]">
            <h3 className="text-2xl font-bold mb-10">Metric Breakdown</h3>
            <MetricBar label="Patience" value={user.scores.patience} color="bg-blue-500" />
            <MetricBar label="Empathy" value={user.scores.empathy} color="bg-purple-500" />
            <MetricBar label="Risk Awareness" value={user.scores.riskAwareness} color="bg-pink-500" />
            <MetricBar label="Rule Respect" value={user.scores.ruleRespect} color="bg-green-500" />
          </div>

          {/* Decision Chart */}
          <div className="glass p-10 rounded-[3rem] flex flex-col">
            <h3 className="text-2xl font-bold mb-10">Comparative Analysis</h3>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Decisions */}
        <div className="mt-8 glass p-10 rounded-[3rem]">
          <h3 className="text-2xl font-bold mb-8">Recent Ethical Decisions</h3>
          <div className="space-y-4">
            {user.decisions.length > 0 ? (
              user.decisions.map((dec, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/5 rounded-2xl gap-4 border border-white/5 hover:border-white/10 transition-colors">
                  <div>
                    <h4 className="font-bold text-white mb-1">{dec.scenarioTitle}</h4>
                    <p className="text-sm text-gray-400 italic">"{dec.choice}"</p>
                  </div>
                  <div className="flex gap-2">
                    {/* Fixed type errors: cast 'val' to 'number' for comparison logic in map */}
                    {Object.entries(dec.impacts).map(([key, val], idx) => (val as number) !== 0 && (
                      <span key={idx} className={`text-[10px] px-2 py-1 rounded-md font-bold ${(val as number) > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {key.substring(0, 1).toUpperCase()}: {(val as number) > 0 ? `+${val}` : val}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-10">No decision history yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;
