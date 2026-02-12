
import React, { useEffect, useState } from 'react';
import { getStoredUser, getChapterStatus } from '../utils/storage';
import { UserProfile, ChapterResult } from '../types';
import { CHAPTERS, BADGES } from '../constants';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  ChartOptions
} from 'chart.js';
import { Line, Radar, Doughnut, Bar } from 'react-chartjs-2';
import { Info, TrendingUp, Award, Layers, Shield, Trophy, Star, Zap, Crown, Target, CheckCircle, Flag, CloudRain, Moon, Truck, Building, Smile, Wrench, BarChart as BarChartIcon, Medal, Plus, Activity, Brain } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title, 
  Tooltip, 
  Legend, 
  Filler
);

const IconMap: Record<string, any> = {
  Flag, Award, Star, Trophy, CheckCircle, Zap, Target, Crown, Plus, TrendingUp, Activity, Shield, CloudRain, Moon, Truck, Building, Smile, Wrench, BarChart: BarChartIcon, Medal
};

// Map chapters to analytical categories
const getCategoryForChapter = (chapterId: number): string => {
  if ([1, 17, 18, 38, 39, 43, 49, 50].includes(chapterId)) return 'Cognitive'; // Mental state, foundations
  if ([2, 10, 11, 12, 21].includes(chapterId)) return 'Vulnerable Users'; // Pedestrians, cyclists, kids
  if ([3, 8, 25, 26, 30].includes(chapterId)) return 'Urban/Traffic'; // City driving
  if ([4, 7, 14, 15, 24].includes(chapterId)) return 'High Speed'; // Highway, speed
  if ([5, 6, 9, 29].includes(chapterId)) return 'Environment'; // Weather, rural, night
  if ([13, 27, 28, 44, 45].includes(chapterId)) return 'Technical'; // Parking, reversing, mirrors
  return 'General Safety';
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

  // --- ANALYTICS DATA PREPARATION ---

  // 1. Trend Data (Line Chart)
  const sortedResults = [...user.chapterResults].sort((a, b) => a.chapterId - b.chapterId);
  const trendLabels = sortedResults.map(r => `Ch ${r.chapterId}`);
  const trendData = sortedResults.map(r => r.score);
  
  // 2. Category Performance (Radar Chart)
  const categoryScores: Record<string, number[]> = {};
  sortedResults.forEach(r => {
    const cat = getCategoryForChapter(r.chapterId);
    if (!categoryScores[cat]) categoryScores[cat] = [];
    categoryScores[cat].push(r.score);
  });
  
  const radarLabels = Object.keys(categoryScores);
  const radarData = radarLabels.map(cat => {
    const scores = categoryScores[cat];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  });

  // Default radar data if empty
  const finalRadarLabels = radarLabels.length > 0 ? radarLabels : ['Cognitive', 'Urban', 'Highway', 'Env', 'Tech'];
  const finalRadarData = radarData.length > 0 ? radarData : [0, 0, 0, 0, 0];

  // 3. Distribution (Doughnut)
  const distribution = {
    perfect: sortedResults.filter(r => r.score === 100).length,
    excellent: sortedResults.filter(r => r.score >= 90 && r.score < 100).length,
    good: sortedResults.filter(r => r.score >= 80 && r.score < 90).length,
    average: sortedResults.filter(r => r.score < 80).length
  };

  // --- CHART OPTIONS & CONFIGS ---

  const commonOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#9ca3af', font: { family: 'Inter' } }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        titleColor: '#fff',
        bodyColor: '#ccc',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        ticks: { color: '#6b7280' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      x: {
        ticks: { color: '#6b7280' },
        grid: { display: false }
      }
    }
  };

  const lineChartData = {
    labels: trendLabels,
    datasets: [
      {
        label: 'Score Trajectory',
        data: trendData,
        borderColor: '#3b82f6', // Blue-500
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#1d4ed8',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1d4ed8',
      }
    ]
  };

  const radarChartData = {
    labels: finalRadarLabels,
    datasets: [
      {
        label: 'Skill Proficiency',
        data: finalRadarData,
        backgroundColor: 'rgba(168, 85, 247, 0.2)', // Purple-500
        borderColor: '#a855f7',
        pointBackgroundColor: '#a855f7',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#a855f7',
      }
    ]
  };

  const radarOptions: ChartOptions<'radar'> = {
    ...commonOptions,
    scales: {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.1)' },
        grid: { color: 'rgba(255,255,255,0.05)' },
        pointLabels: { color: '#e5e7eb', font: { size: 12, weight: 'bold' } },
        ticks: { display: false, backdropColor: 'transparent' },
        suggestedMin: 0,
        suggestedMax: 100,
      }
    }
  };

  const doughnutChartData = {
    labels: ['Perfect (100)', 'Excellent (90-99)', 'Good (80-89)', 'Needs Focus (<80)'],
    datasets: [
      {
        data: [distribution.perfect, distribution.excellent, distribution.good, distribution.average],
        backgroundColor: [
          '#ec4899', // Pink-500
          '#3b82f6', // Blue-500
          '#a855f7', // Purple-500
          '#6b7280', // Gray-500
        ],
        borderWidth: 0,
      }
    ]
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { position: 'right', labels: { color: '#e5e7eb', padding: 20 } }
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-5xl font-bold mb-2 tracking-tight">{user.name}</h1>
            <p className="text-gray-400 flex items-center gap-2">
              <Brain size={16} /> Cognitive Driver Profile
            </p>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Total XP</div>
            <div className="text-4xl font-bold gradient-text">{user.totalScore.toLocaleString()}</div>
          </div>
        </header>

        {/* --- KPI CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
            <Layers className="text-blue-400 mb-4" size={28} />
            <div className="text-4xl font-bold text-white mb-1">{completedCount}<span className="text-lg text-gray-500">/50</span></div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Chapters</p>
          </div>
          
          <div className="glass p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/10 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
            <Activity className="text-purple-400 mb-4" size={28} />
            <div className="text-4xl font-bold text-white mb-1">{averageScore}</div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Avg Score</p>
          </div>

          <div className="glass p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-pink-500/10 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
            <Trophy className="text-pink-400 mb-4" size={28} />
            <div className="text-4xl font-bold text-white mb-1">{distribution.perfect}</div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Perfect Runs</p>
          </div>

          <div className="glass p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-green-500/10 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
            <TrendingUp className="text-green-400 mb-4" size={28} />
            <div className="text-4xl font-bold text-white mb-1">{progressPercent}%</div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Completion</p>
          </div>
        </div>

        {/* --- ANALYTICS DASHBOARD --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Main Line Chart */}
          <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border border-white/5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Performance Trajectory</h3>
              <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/5">Real-time</div>
            </div>
            <div className="h-[300px] w-full">
              {completedCount > 0 ? (
                <Line options={commonOptions} data={lineChartData} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-600">Complete chapters to see trends</div>
              )}
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="glass p-8 rounded-[2.5rem] border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6">Score Distribution</h3>
            <div className="h-[300px] w-full relative">
               {completedCount > 0 ? (
                <>
                  <Doughnut options={doughnutOptions} data={doughnutChartData} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{completedCount}</div>
                      <div className="text-xs text-gray-500 uppercase">Runs</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-600">No data</div>
              )}
            </div>
          </div>

          {/* Radar Chart */}
          <div className="lg:col-span-1 glass p-8 rounded-[2.5rem] border border-white/5">
             <h3 className="text-xl font-bold text-white mb-6">Ethical Profile</h3>
             <div className="h-[300px] w-full">
                {completedCount > 0 ? (
                  <Radar options={radarOptions} data={radarChartData} />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-600">Awaiting data</div>
                )}
             </div>
          </div>

          {/* Heatmap-style grid (simplified as block grid) */}
          <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border border-white/5">
             <h3 className="text-xl font-bold text-white mb-6">Chapter Matrix</h3>
             <div className="flex flex-wrap gap-2">
                {Array.from({ length: 50 }).map((_, i) => {
                  const id = i + 1;
                  const result = user.chapterResults.find(r => r.chapterId === id);
                  const status = getChapterStatus(id);
                  
                  let bgColor = 'bg-white/[0.03] text-gray-700 border-transparent';
                  if (status === 'LOCKED') bgColor = 'bg-black/40 text-gray-800 border-white/[0.02]';
                  if (result) {
                    if (result.score === 100) bgColor = 'bg-pink-500 text-black font-bold shadow-[0_0_10px_rgba(236,72,153,0.4)]';
                    else if (result.score >= 90) bgColor = 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]';
                    else if (result.score >= 80) bgColor = 'bg-purple-500/50 text-white';
                    else bgColor = 'bg-gray-700 text-gray-300';
                  } else if (status === 'UNLOCKED') {
                    bgColor = 'bg-white/10 text-white border-white/20 animate-pulse';
                  }

                  return (
                    <div 
                      key={id}
                      title={`Chapter ${id}: ${result ? result.score : (status === 'LOCKED' ? 'Locked' : 'Next')}`}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs border ${bgColor} transition-all duration-300 hover:scale-110 cursor-default`}
                    >
                      {id}
                    </div>
                  );
                })}
             </div>
             <div className="mt-4 flex gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-500"></div> Perfect</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Excellent</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500/50"></div> Good</span>
             </div>
          </div>

        </div>

        {/* --- BADGES --- */}
        <div className="mb-20">
           <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
             <Award className="text-yellow-500" />
             Achievements
           </h3>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {BADGES.map((badge) => {
                const isUnlocked = user.badges?.includes(badge.id);
                const IconComponent = IconMap[badge.icon] || Award;
                
                return (
                  <div 
                    key={badge.id}
                    className={`p-6 rounded-[2rem] border text-center transition-all duration-500 group relative overflow-hidden
                      ${isUnlocked 
                        ? 'glass border-yellow-500/30 bg-yellow-500/5 shadow-[0_0_20px_rgba(234,179,8,0.1)]' 
                        : 'bg-white/[0.02] border-white/5 opacity-40 grayscale hover:opacity-60'}
                    `}
                  >
                    {isUnlocked && <div className="absolute inset-0 bg-yellow-500/10 blur-xl rounded-full opacity-50"></div>}
                    
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10
                      ${isUnlocked ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black shadow-lg shadow-orange-500/20' : 'bg-white/10 text-gray-500'}`}>
                      <IconComponent size={24} />
                    </div>
                    <h4 className={`font-bold mb-2 relative z-10 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{badge.title}</h4>
                    <p className="text-xs text-gray-500 leading-tight relative z-10">{badge.description}</p>
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
