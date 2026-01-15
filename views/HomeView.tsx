
import React, { useState, useEffect } from 'react';

interface HomeViewProps {
  onQuickStart: () => void;
  onOpenReports: () => void;
  weeklyGoal: number;
}

interface Challenge {
  id: string;
  type: 'DISTANCE' | 'TIME' | 'PACE';
  targetValue: number;
  currentValue: number;
  title: string;
  deadline: string;
}

const HomeView: React.FC<HomeViewProps> = ({ onQuickStart, onOpenReports, weeklyGoal }) => {
  const [greeting, setGreeting] = useState('你好');
  const [progressValue, setProgressValue] = useState(0);
  const [isCreatingChallenge, setIsCreatingChallenge] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: 'default-1', type: 'DISTANCE', targetValue: 50, currentValue: 24.8, title: '月度半马突破', deadline: '剩余 12 天' }
  ]);

  // 表单状态
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    type: 'DISTANCE' as 'DISTANCE' | 'TIME' | 'PACE',
    target: 5
  });

  const currentDistance = 24.8;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('早上好');
    else if (hour < 18) setGreeting('下午好');
    else setGreeting('晚上好');

    const calculatedProgress = Math.min(Math.round((currentDistance / weeklyGoal) * 100), 100);
    const timer = setTimeout(() => setProgressValue(calculatedProgress), 500);
    return () => clearTimeout(timer);
  }, [weeklyGoal]);

  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressValue / 100) * circumference;
  const remaining = Math.max(0, weeklyGoal - currentDistance).toFixed(1);

  const handleCreateChallenge = () => {
    if (!newChallenge.title) return;
    const challenge: Challenge = {
      id: Date.now().toString(),
      type: newChallenge.type,
      targetValue: newChallenge.target,
      currentValue: 0,
      title: newChallenge.title,
      deadline: '刚刚发起'
    };
    setChallenges([challenge, ...challenges]);
    setIsCreatingChallenge(false);
    setNewChallenge({ title: '', type: 'DISTANCE', target: 5 });
  };

  return (
    <div className="flex flex-col space-y-6 pb-24 animate-in fade-in duration-500 overflow-y-auto max-h-screen no-scrollbar">
      {/* Header */}
      <header className="flex items-center p-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full bg-cover border-2 border-primary/20 shadow-inner" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBIJ5xcZGGfZQJS7xGbIoysGOqfsHRi7KtJaaNK72v0x-trft,sizes=192x192")' }}></div>
          <div>
            <p className="text-[#9c5e49] text-[10px] font-black uppercase tracking-widest leading-none mb-1">RUNNERS HUB</p>
            <h2 className="text-xl font-black tracking-tight">{greeting}, Alex!</h2>
          </div>
        </div>
        <button className="relative size-10 flex items-center justify-center rounded-full bg-white dark:bg-[#25282c] shadow-sm border border-[#f4eae7] dark:border-none active:scale-90 transition-all">
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">notifications</span>
          <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-primary ring-2 ring-white dark:ring-[#25282c]"></span>
        </button>
      </header>

      {/* Quick Start Card */}
      <div className="px-4">
        <button 
          onClick={onQuickStart}
          className="group relative w-full h-24 bg-primary text-white rounded-3xl flex items-center justify-between px-6 shadow-xl shadow-primary/30 active:scale-[0.97] transition-all overflow-hidden"
        >
          <div className="flex items-center gap-4 z-10">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">play_arrow</span>
            </div>
            <div className="text-left">
              <span className="text-xl font-black tracking-tight block">快速开始</span>
              <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">记录今天的运动</span>
            </div>
          </div>
          <span className="material-symbols-outlined opacity-50 z-10 group-hover:translate-x-1 transition-transform">chevron_right</span>
        </button>
      </div>

      {/* Challenge Section */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">挑战广场</h3>
          <button 
            onClick={() => setIsCreatingChallenge(true)}
            className="flex items-center gap-1 text-primary text-[10px] font-black uppercase bg-primary/5 px-3 py-1.5 rounded-full"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            发起挑战
          </button>
        </div>

        <div className="space-y-3">
          {challenges.map(challenge => (
            <div key={challenge.id} className="bg-white dark:bg-[#25282c] p-5 rounded-3xl shadow-sm border border-black/5 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-black text-lg group-hover:text-primary transition-colors">{challenge.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{challenge.deadline}</p>
                </div>
                <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">
                    {challenge.type === 'DISTANCE' ? 'route' : challenge.type === 'TIME' ? 'timer' : 'speed'}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase">
                  <span>进度: {challenge.currentValue} / {challenge.targetValue}</span>
                  <span>{Math.round((challenge.currentValue / challenge.targetValue) * 100)}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(244,89,37,0.3)]"
                    style={{ width: `${Math.min((challenge.currentValue / challenge.targetValue) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">本周目标</h3>
          <button onClick={onOpenReports} className="text-primary text-[10px] font-black uppercase tracking-widest">详细报表</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="row-span-2 bg-white dark:bg-[#25282c] rounded-3xl p-6 shadow-sm border border-[#f4eae7] dark:border-none flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
              <p className="text-[#9c5e49] text-[10px] font-black uppercase tracking-widest mb-1">完成度</p>
              <p className="text-3xl font-black tabular-nums">{progressValue}%</p>
            </div>
            <div className="relative size-32 my-4">
              <svg className="size-full -rotate-90">
                <circle cx="64" cy="64" r={radius} fill="transparent" stroke="currentColor" className="text-gray-100 dark:text-zinc-800" strokeWidth="8" />
                <circle cx="64" cy="64" r={radius} fill="transparent" stroke="currentColor" className="text-primary transition-all duration-1000 ease-out" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-[10px] text-center text-[#9c5e49] font-bold leading-tight px-2">还差 {remaining} km<br/>达成 {weeklyGoal}km 目标</p>
          </div>

          <div className="bg-white dark:bg-[#25282c] rounded-3xl p-5 shadow-sm border border-[#f4eae7] dark:border-none flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary"><span className="material-symbols-outlined text-lg">route</span></div>
              <p className="text-[#9c5e49] text-[10px] font-black uppercase tracking-widest">总距离</p>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-black tabular-nums tracking-tighter">{currentDistance}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase">KILOMETERS</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#25282c] rounded-3xl p-5 shadow-sm border border-[#f4eae7] dark:border-none flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-500"><span className="material-symbols-outlined text-lg">timer</span></div>
              <p className="text-[#9c5e49] text-[10px] font-black uppercase tracking-widest">总时长</p>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-black tabular-nums tracking-tighter">3:12:45</p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Creation Dialog */}
      {isCreatingChallenge && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsCreatingChallenge(false)}></div>
          <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-sm rounded-[32px] p-8 z-10 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-2xl font-black">自定义挑战</h4>
              <button onClick={() => setIsCreatingChallenge(false)} className="size-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">挑战名称</label>
                <input 
                  type="text" 
                  value={newChallenge.title} 
                  onChange={e => setNewChallenge({...newChallenge, title: e.target.value})}
                  placeholder="例如：周末5公里突破"
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl p-4 font-bold text-lg focus:ring-2 ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">挑战类型</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'DISTANCE', icon: 'route', label: '距离' },
                    { id: 'TIME', icon: 'timer', label: '时间' },
                    { id: 'PACE', icon: 'speed', label: '配速' }
                  ].map(t => (
                    <button 
                      key={t.id}
                      onClick={() => setNewChallenge({...newChallenge, type: t.id as any})}
                      className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${newChallenge.type === t.id ? 'border-primary bg-primary/5 text-primary' : 'border-transparent bg-gray-50 dark:bg-white/5 text-gray-400'}`}
                    >
                      <span className="material-symbols-outlined">{t.icon}</span>
                      <span className="text-[10px] font-black">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  目标数值 ({newChallenge.type === 'DISTANCE' ? 'KM' : newChallenge.type === 'TIME' ? 'MIN' : 'MIN/KM'})
                </label>
                <input 
                  type="number" 
                  value={newChallenge.target} 
                  onChange={e => setNewChallenge({...newChallenge, target: parseInt(e.target.value) || 0})}
                  className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl p-4 font-black text-3xl focus:ring-2 ring-primary/20 transition-all text-center"
                />
              </div>

              <button 
                onClick={handleCreateChallenge}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black shadow-lg shadow-primary/20 active:scale-95 transition-all mt-4"
              >
                立即发起挑战
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
