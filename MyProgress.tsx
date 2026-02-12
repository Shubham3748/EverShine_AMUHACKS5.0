
import React, { useEffect, useState } from 'react';
import { getStoredUser, getChapterStatus } from '../utils/storage';
import { UserProfile } from '../types';
import { CHAPTERS, BADGES } from '../constants';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { Info, TrendingUp, Award, Layers, Shield, Trophy, Star, Zap, Crown, Target, CheckCircle, Flag, CloudRain, Moon, Truck, Building, Smile, Wrench, BarChart as BarChartIcon, Medal, Plus, Activity } from 'lucide-react';

const IconMap: Record<string, any> = {
  Flag, Award, Star, Trophy, CheckCircle, Zap, Target, Crown, Plus, TrendingUp, Activity, Shield, CloudRain, Moon, Truck, Building, Smile, Wrench, BarChart: BarChartIcon, Medal
};

const MyProgress: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  if (!user?.isLoggedIn) {
    return (
      <div className="pt-40 text-center px-6 min-h-screen">
        <div className="max-w-md mx-auto">
          <Info className="text-blue-500/50 mx-auto mb-8" size={64} />
          <h2 className="text-4xl font-bold mb-6">No Data</h2>
          <p className="text-xl text-gray-500 mb-12">Initialize training to track your growth.</p>
        </div>
      </div>
    );
  }

  const completedCount = user.chapterResults.length;
  const averageScore = completedCount > 0 ? Math.round(user.totalScore / completedCount) : 0;
  const progressPercent = Math.round((completedCount / 50) * 100);

  const chartData = user.chapterResults.map(r => ({
    chapter: r.chapterId,
    score: r.score
  }));

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">{user.name}</h1>
          <p className="text-gray-400">Personal Growth Tracker</p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass p-10 rounded-[2.5rem] border-t-4 border-blue-500">
            <Layers className="text-blue-400 mb-6" size={32} />
            <div className="text-5xl font-bold text-white mb-2">{completedCount}<span className="text-xl text-gray-500">/50</span></div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Chapters Completed</p>
          </div>
          
          <div className="glass p-10 rounded-[2.5rem] border-t-4 border-purple-500">
            <Award className="text-purple-400 mb-6" size={32} />
            <div className="text-5xl font-bold text-white mb-2">{averageScore}</div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Average Score</p>
          </div>

          <div className="glass p-10 rounded-[2.5rem] border-t-4 border-green-500">
            <TrendingUp className="text-green-400 mb-6" size={32} />
            <div className="text-5xl font-bold text-white mb-2">{progressPercent}%</div>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Overall Completion</p>
          </div>
        </div>

        {/* Badges Section */}
        <div className="mb-20">
           <h3 className="text-3xl font-bold mb-8">Achievements</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {BADGES.map((badge) => {
                const isUnlocked = user.badges?.includes(badge.id);
                const IconComponent = IconMap[badge.icon] || Award;
                
                return (
                  <div 
                    key={badge.id}
                    className={`p-6 rounded-[2rem] border text-center transition-all duration-500
                      ${isUnlocked 
                        ? 'glass border-yellow-500/30 bg-yellow-500/5 shadow-[0_0_20px_rgba(234,179,8,0.1)]' 
                        : 'bg-white/[0.02] border-white/5 opacity-40 grayscale'}
                    `}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 
                      ${isUnlocked ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black' : 'bg-white/10 text-gray-500'}`}>
                      <IconComponent size={24} />
                    </div>
                    <h4 className={`font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{badge.title}</h4>
                    <p className="text-xs text-gray-500 leading-tight">{badge.description}</p>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Chart */}
        <div className="glass p-12 rounded-[3rem] mb-12">
          <h3 className="text-2xl font-bold mb-8">Improvement Trend</h3>
          <div className="h-[300px] w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="chapter" stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  />
                  <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-600">No session data available</div>
            )}
          </div>
        </div>

        {/* Map */}
        <div>
          <h3 className="text-2xl font-bold mb-8">Journey Map</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 50 }).map((_, i) => {
              const id = i + 1;
              const status = getChapterStatus(id);
              return (
                <div 
                  key={id}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold border transition-colors
                    ${status === 'COMPLETED' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 
                      status === 'UNLOCKED' ? 'bg-white/10 border-white/20 text-white' : 
                      'bg-black border-white/5 text-gray-700'}
                  `}
                >
                  {id}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;

